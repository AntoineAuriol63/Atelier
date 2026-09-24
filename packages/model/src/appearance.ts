import type { Animation, Id, Node, Op, Page, RootOwner, Site, Track, TrackStart, Trigger, TriggerOn } from "./types";
import { newId } from "./ids";
import { applyOps } from "./ops";
import { indexSite, walk, type NodeLocation } from "./tree";
import {
  ANIMATION_PRESETS, QUICK_SPEEDS, animationById, animationUsages, planAddTrigger, planQuickAnimation, planRemoveAnimation, planRemoveTrack,
  planRemoveTrigger, planRemoveTriggerWithAnimation, planTracks, planUpdatePageTrigger, planUpdateTrigger, presetById, resolveTrackTarget,
  shiftTrackTo, startOf, startRef, trackEnd, trackSpan, withTargetKind,
  type AnimationPreset, type QuickDetail, type QuickGroup, type QuickSpeed,
} from "./animations";

/**
 * Apparition d'un élément (tests simulés du 14 septembre 2026 ; `docs/plan-usage-animation-2026-09.md`).
 *
 * Ce que les participants cherchaient à côté de l'effet (« après le titre », un délai, rejouer) se règle depuis l'élément, et s'écrit
 * dans le modèle (§ 8.4) : un élément qui « démarre après » un autre devient une piste de l'animation qui lance cet autre, rattachée à
 * sa piste par `start`. Les temps des images-clés en découlent, ce qui garde une seule vérité entre la rubrique et la ligne de temps.
 */

/** Ce qui fait démarrer l'apparition d'un élément. */
export type AppearanceBegin =
  /** l'élément se lance lui-même (son déclencheur) */
  | { kind: "own"; on: "load" | "inView" }
  /** dans l'animation lancée par un autre élément (ou la page), sans être rattaché à une autre piste */
  | { kind: "host"; hostId: Id; on: TriggerOn }
  /** à la fin de l'apparition d'un autre élément */
  | { kind: "after"; node: Id }
  /** au départ de l'apparition d'un autre élément */
  | { kind: "with"; node: Id }
  /** quand un bloc qui le contient (la section) entre dans l'écran : l'animation est lancée par ce bloc */
  | { kind: "within"; node: Id };

export type Appearance = {
  nodeId: Id;
  /** Élément dont le déclencheur lance l'apparition (racine de la page pour un déclencheur de page). */
  hostId: Id;
  page?: Page;
  trigger: Trigger;
  animation: Animation;
  track: Track;
  /** L'élément lance lui-même son apparition. */
  own: boolean;
  /** Préréglage d'apparition reconnu sur la piste (décalé et mis à l'échelle permis). */
  preset?: AnimationPreset;
  /** Préréglage d'origine d'une apparition retouchée (« Personnalisée (Fondu) »). */
  origin?: AnimationPreset;
  /** Longueur de la piste rapportée à celle du préréglage. */
  factor: number;
  speed: QuickSpeed | "custom";
  detail: QuickDetail;
  /** Départ et fin dans la ligne de temps de l'animation (la fin compte le décalage des enfants ou des lettres). */
  start: number;
  end: number;
  begin: AppearanceBegin;
  /** Attente après ce qui fait démarrer : l'écart d'une piste rattachée ; sinon le délai du déclencheur plus le départ de la piste. */
  delay: number;
};

const APPEAR_ONS = new Set<TriggerOn>(["load", "inView"]);
const sameStyle = (a: Record<string, unknown>, b: Record<string, unknown>) => { const keys = new Set([...Object.keys(a), ...Object.keys(b)]); return [...keys].every((k) => JSON.stringify(a[k]) === JSON.stringify(b[k])); };
const sortedKeyframes = (t: Pick<Track, "keyframes">) => [...t.keyframes].sort((x, y) => x.at - y.at);
const moves = (t: Track) => t.keyframes.length >= 2;

/** Le préréglage d'une famille que suit une piste, où qu'elle commence et quelle que soit sa longueur ; `factor` : longueur / longueur du préréglage. */
export function trackPresetMatch(track: Pick<Track, "keyframes">, group: QuickGroup = "Apparition"): { preset: AnimationPreset; factor: number } | undefined {
  const kfs = sortedKeyframes(track);
  if (kfs.length < 2) return undefined;
  const start = kfs[0]!.at;
  const len = kfs[kfs.length - 1]!.at - start;
  if (len <= 0) return undefined;
  for (const p of ANIMATION_PRESETS) {
    if (p.group !== group || p.keyframes.length !== kfs.length || !p.duration) continue;
    const factor = len / p.duration;
    const same = kfs.every((k, i) => { const q = p.keyframes[i]!; return Math.abs(k.at - start - Math.round(q.at * factor)) <= 1 && sameStyle(k.style, q.style) && (k.easing ?? undefined) === (q.easing ?? undefined); });
    if (same) return { preset: p, factor: Math.round(factor * 1000) / 1000 };
  }
  return undefined;
}

type Launch = { hostId: Id; page?: Page; trigger: Trigger };
const ownerKey = (o: RootOwner) => ("page" in o ? `p:${o.page}` : `c:${o.component}`);
/** L'animation d'un déclencheur, si elle peut porter des apparitions : au chargement ou à l'entrée dans l'écran, sans boucle, pas un préréglage d'une autre famille. */
function appearanceAnimation(site: Site, t: Trigger): Animation | undefined {
  if (!APPEAR_ONS.has(t.on)) return undefined;
  const a = animationById(site, t.animation);
  if (!a || a.loop === "infinite" || (typeof a.loop === "number" && a.loop > 1)) return undefined;
  const group = presetById(a.preset)?.group;
  return group && group !== "Apparition" ? undefined : a;
}
const speedOf = (factor: number): QuickSpeed | "custom" => (Object.entries(QUICK_SPEEDS) as [QuickSpeed, number][]).find(([, f]) => Math.abs(factor - f) < 0.05)?.[0] ?? "custom";

// Lectures mises en cache par document : le site est remplacé, jamais modifié en place, à chaque opération.
type Cache = { index: Map<Id, NodeLocation>; appearances: Map<Id, Appearance | null>; launches: Map<string, Launch[]> };
const caches = new WeakMap<Site, Cache>();
function cacheOf(site: Site): Cache {
  let c = caches.get(site);
  if (!c) { c = { index: indexSite(site), appearances: new Map(), launches: new Map() }; caches.set(site, c); }
  return c;
}
/** Les déclencheurs d'une page (la page, puis ses éléments dans l'ordre du document) ou d'un composant. */
function launches(site: Site, owner: RootOwner): Launch[] {
  const c = cacheOf(site);
  const key = ownerKey(owner);
  const hit = c.launches.get(key);
  if (hit) return hit;
  const out: Launch[] = [];
  const visit = (root: Node) => walk(root, (n) => { for (const t of n.triggers ?? []) out.push({ hostId: n.id, trigger: t }); });
  if ("page" in owner) {
    const page = site.pages.find((p) => p.id === owner.page);
    if (page) { for (const t of page.triggers ?? []) out.push({ hostId: page.root.id, page, trigger: t }); visit(page.root); }
  } else {
    const cmp = site.components.find((x) => x.id === owner.component);
    if (cmp) visit(cmp.root);
  }
  c.launches.set(key, out);
  return out;
}

/** L'apparition d'un élément : sur lui-même d'abord (choix rapide, puis piste reconnue), sinon dans l'animation d'un autre élément de la même page. */
export function appearanceOf(site: Site, nodeId: Id, _index?: Map<Id, NodeLocation>): Appearance | undefined {
  const c = cacheOf(site);
  if (c.appearances.has(nodeId)) return c.appearances.get(nodeId) ?? undefined;
  const found = computeAppearance(site, nodeId, c.index);
  c.appearances.set(nodeId, found ?? null);
  return found;
}
function computeAppearance(site: Site, nodeId: Id, index: Map<Id, NodeLocation>): Appearance | undefined {
  const loc = index.get(nodeId);
  if (!loc) return undefined;
  type Candidate = { launch: Launch; animation: Animation; track: Track; own: boolean; score: number };
  const found: Candidate[] = [];
  for (const t of loc.node.triggers ?? []) {
    const a = appearanceAnimation(site, t);
    if (!a) continue;
    for (const track of a.tracks) if (moves(track) && "trigger" in track.target) found.push({ launch: { hostId: nodeId, trigger: t }, animation: a, track, own: true, score: presetById(a.preset)?.group === "Apparition" ? 0 : trackPresetMatch(track) ? 1 : 3 });
  }
  for (const l of launches(site, loc.owner)) {
    if (!l.page && l.hostId === nodeId) continue;
    const a = appearanceAnimation(site, l.trigger);
    if (!a) continue;
    for (const track of a.tracks) if (moves(track) && "node" in track.target && track.target.node === nodeId) found.push({ launch: l, animation: a, track, own: false, score: trackPresetMatch(track) ? 2 : 4 });
  }
  const best = found.sort((x, y) => x.score - y.score)[0];
  if (!best) return undefined;
  const { launch, animation, track, own } = best;
  const match = trackPresetMatch(track);
  const origin = match?.preset ?? (own ? presetById(animation.preset) : undefined);
  const start = trackSpan(track).start;
  const end = trackEnd(site, track, launch.hostId, index);
  const target = track.target;
  // « Un à un » seulement avec un décalage réel : des enfants visés sans décalage partent ensemble (constat 2 des tests simulés).
  const detail: QuickDetail = !("selector" in target) && target.split ? "letters" : !("selector" in target) && target.children && track.stagger?.each ? "children" : "one";
  const factor = match ? match.factor : origin && origin.duration ? Math.round(((trackSpan(track).end - start) / origin.duration) * 1000) / 1000 : 1;
  // Ce qui le fait démarrer : la piste à laquelle il est rattaché (`start`), sinon lui-même, sinon l'élément qui lance l'animation.
  const ref = track.start ? animation.tracks.find((u) => u.id === startRef(track.start!)) : undefined;
  const refNode = ref && !("selector" in ref.target) ? resolveTrackTarget(ref.target, launch.hostId) : undefined;
  let begin: AppearanceBegin;
  let delay: number;
  if (track.start && refNode && "node" in refNode && refNode.node !== nodeId) {
    begin = "after" in track.start ? { kind: "after", node: refNode.node } : { kind: "with", node: refNode.node };
    delay = track.start.gap ?? 0;
  } else {
    begin = own ? { kind: "own", on: launch.trigger.on as "load" | "inView" } : { kind: "host", hostId: launch.hostId, on: launch.trigger.on };
    delay = (launch.trigger.delay ?? 0) + start;
  }
  return { nodeId, hostId: launch.hostId, ...(launch.page ? { page: launch.page } : {}), trigger: launch.trigger, animation, track, own, ...(match ? { preset: match.preset } : {}), ...(origin ? { origin } : {}), factor, speed: match ? speedOf(match.factor) : "custom", detail, start, end, begin, delay };
}

/** Les éléments après lesquels (ou avec lesquels) un élément peut démarrer : ceux de la même animation par ordre de départ, puis ceux de la page dans l'ordre du document. */
export function appearanceAnchors(site: Site, nodeId: Id): Id[] {
  const { index } = cacheOf(site);
  const loc = index.get(nodeId);
  if (!loc) return [];
  const out: Id[] = [];
  const add = (id: Id) => { if (id !== nodeId && !out.includes(id)) out.push(id); };
  const cur = appearanceOf(site, nodeId);
  if (cur) {
    const tracks = cur.animation.tracks.filter((u) => moves(u) && !("selector" in u.target));
    [...tracks].sort((x, y) => trackSpan(x).start - trackSpan(y).start || tracks.indexOf(x) - tracks.indexOf(y)).forEach((u) => add((resolveTrackTarget(u.target, cur.hostId) as { node: Id }).node));
  }
  const root = "page" in loc.owner ? site.pages.find((p) => p.id === (loc.owner as { page: Id }).page)?.root : site.components.find((x) => x.id === (loc.owner as { component: Id }).component)?.root;
  if (root) walk(root, (n) => { if (n.id !== nodeId && !out.includes(n.id) && appearanceOf(site, n.id)) out.push(n.id); });
  // Une animation lancée par plusieurs déclencheurs ne reçoit pas de suite : chaque déclencheur la rejouerait.
  return out.filter((id) => { const ap = appearanceOf(site, id)!; return ap.animation.id === cur?.animation.id || animationUsages(site, ap.animation.id).length <= 1; });
}

// ---------------------------------------------------------------- réglages

/** Opérations enchaînées sur une copie de travail : chaque étape se calcule sur le document déjà modifié. */
class Plan {
  ops: Op[] = [];
  constructor(public site: Site) {}
  push(ops: Op[]) { if (!ops.length) return; this.site = applyOps(this.site, ops).site; this.ops.push(...ops); }
}
const stripStart = (t: Track): Track => { const { start: _s, ...rest } = t; void _s; return rest; };
const toNodeTarget = (t: Track, id: Id): Track => ("trigger" in t.target ? { ...t, target: { node: id, ...(t.target.children ? { children: true as const } : {}), ...(t.target.split ? { split: t.target.split } : {}) } } : t);
function triggerPatch(site: Site, cur: Appearance, patch: Partial<Trigger>): Op[] {
  if (cur.page) return planUpdatePageTrigger(site, cur.page.id, cur.trigger.id, patch);
  const host = indexSite(site).get(cur.hostId)?.node;
  return host ? planUpdateTrigger(host, cur.trigger.id, patch) : [];
}
/** Remplace la piste d'un élément (ce qui la suit est replacé d'après son `start`). */
function planTrack(site: Site, cur: Appearance, fn: (t: Track) => Track): Op[] {
  return planTracks(site, cur.animation.id, (tracks) => tracks.map((t) => (t.id === cur.track.id ? fn(t) : t)), { fixed: new Set([cur.track.id]) });
}
/** Retire la piste d'un élément ; ce qui la suivait se raccroche à ce qui la précédait. Une animation où plus rien ne bouge part avec ses déclencheurs. */
function planDropTrack(site: Site, cur: Appearance): Op[] {
  const a = animationById(site, cur.animation.id);
  if (!a) return [];
  if (!a.tracks.some((t) => t.id !== cur.track.id && moves(t))) return planRemoveAnimation(site, a.id);
  return planRemoveTrack(site, a.id, cur.track.id);
}
/** Ajoute des pistes à une animation, avec des identifiants libres (et les rattachements entre elles suivis). */
function planAppendTracks(site: Site, animationId: Id, group: Track[]): Op[] {
  const into = animationById(site, animationId);
  if (!into) return [];
  const taken = new Set(into.tracks.map((t) => t.id));
  const remap = new Map<Id, Id>();
  for (const t of group) if (taken.has(t.id)) remap.set(t.id, newId());
  const renamed = group.map((t) => ({ ...t, id: remap.get(t.id) ?? t.id, ...(t.start ? { start: startOf(t.start, remap.get(startRef(t.start)) ?? startRef(t.start), t.start.gap ?? 0) } : {}) }));
  return planTracks(site, animationId, (tracks) => [...tracks, ...renamed], { fixed: new Set(renamed.map((t) => t.id)) });
}
/**
 * Les pistes d'une animation qu'un élément lançait lui-même, prêtes à partir ailleurs : ses pistes relatives visent l'élément, sa propre piste
 * reçoit `head`, et une piste qui n'était rattachée à rien se rattache à elle au même écart.
 */
function carryGroup(cur: Appearance, head: TrackStart | undefined): Track[] {
  return cur.animation.tracks.map((t) => {
    const u = toNodeTarget(t, cur.nodeId);
    if (t.id === cur.track.id) return head ? { ...u, start: head } : shiftTrackTo(stripStart(u), 0);
    return u.start ? u : { ...u, start: startOf("with", cur.track.id, trackSpan(t).start - cur.start) };
  });
}

/** Faire démarrer l'apparition d'un élément : par lui-même (chargement, entrée dans l'écran), après ou avec un autre élément, ou avec un bloc qui le contient. */
export function planAppearanceStart(site: Site, nodeId: Id, begin: AppearanceBegin): Op[] {
  const index = indexSite(site);
  const loc = index.get(nodeId);
  const cur = appearanceOf(site, nodeId);
  if (!loc || !cur || begin.kind === "host") return [];
  if (begin.kind === "within") return planWithin(site, cur, loc, begin.node);
  const plan = new Plan(site);
  if (begin.kind === "own") {
    if (cur.own) {
      // Il lance déjà son animation : il repart de son début, sans rattachement ; le moment de lancement suit le choix.
      if (cur.begin.kind !== "own") plan.push(planTrack(plan.site, cur, (t) => shiftTrackTo(stripStart(t), 0)));
      if (cur.trigger.on !== begin.on) plan.push(triggerPatch(plan.site, cur, { on: begin.on, ...(begin.on === "inView" ? {} : { once: undefined }) }));
      return plan.ops;
    }
    // Il reprend son propre déclencheur, avec sa piste ramenée à 0 (effet, vitesse et détail gardés) ; ce qui le suivait se raccroche.
    plan.push(planDropTrack(plan.site, cur));
    const target = withTargetKind({ trigger: true }, "selector" in cur.track.target ? "element" : cur.track.target.split ?? (cur.track.target.children ? "children" : "element"));
    const keyframes = sortedKeyframes(cur.track).map((k) => ({ ...k, at: k.at - cur.start, style: structuredClone(k.style) }));
    const animation: Animation = { id: newId(), name: cur.preset?.label ?? cur.animation.name, duration: Math.max(1, keyframes[keyframes.length - 1]!.at), ...(cur.preset ? { preset: cur.preset.id } : {}), tracks: [{ id: newId(), target, ...(cur.track.stagger ? { stagger: cur.track.stagger } : {}), keyframes }] };
    plan.push([{ op: "site.set", path: "animations", value: [...plan.site.animations, animation] }]);
    plan.push(planAddTrigger(indexSite(plan.site).get(nodeId)!.node, { id: newId(), on: begin.on, animation: animation.id }));
    return plan.ops;
  }
  if (begin.node === nodeId) return [];
  const anchorLoc = index.get(begin.node);
  const target = appearanceOf(site, begin.node);
  if (!anchorLoc || !target || ownerKey(anchorLoc.owner) !== ownerKey(loc.owner)) return [];
  const rel = startOf(begin.kind, target.track.id, 0);
  if (target.animation.id === cur.animation.id) {
    // Même animation : réordonner. Si la référence suit (de proche en proche) cet élément, celle qui s'y rattachait prend sa place d'abord : pas de cycle.
    return planTracks(site, cur.animation.id, (tracks) => {
      const byId = new Map(tracks.map((t) => [t.id, t]));
      let link = byId.get(target.track.id);
      let last: Track | undefined;
      for (let i = 0; link && link.id !== cur.track.id && i <= tracks.length; i++) { last = link; link = link.start ? byId.get(startRef(link.start)) : undefined; }
      const hands = link?.id === cur.track.id ? last : undefined;
      return tracks.map((t) => {
        if (t.id === cur.track.id) return { ...t, start: rel };
        if (hands && t.id === hands.id) return cur.track.start ? { ...t, start: startOf(cur.track.start, startRef(cur.track.start), t.start?.gap ?? 0) } : shiftTrackTo(stripStart(t), cur.start + (t.start?.gap ?? 0));
        return t;
      });
    }, { fixed: new Set([cur.track.id]) });
  }
  if (animationUsages(site, target.animation.id).length > 1) return [];
  let group: Track[];
  if (cur.own && animationUsages(site, cur.animation.id).length <= 1) {
    // L'élément lançait sa propre animation : elle part entière, sa suite reste derrière lui.
    group = carryGroup(cur, rel);
    plan.push(planRemoveTrigger(loc.node, cur.trigger.id));
    plan.push([{ op: "site.set", path: "animations", value: plan.site.animations.filter((a) => a.id !== cur.animation.id) }]);
  } else {
    group = [{ ...toNodeTarget(cur.track, nodeId), start: rel }];
    plan.push(cur.own ? planDropOwnTrack(plan.site, cur, loc.node) : planDropTrack(plan.site, cur));
  }
  plan.push(planAppendTracks(plan.site, target.animation.id, group));
  return plan.ops;
}
/** Retire la piste qu'un élément lance lui-même, en gardant son déclencheur si l'animation fait encore bouger d'autres éléments. */
function planDropOwnTrack(site: Site, cur: Appearance, node: Node): Op[] {
  const a = animationById(site, cur.animation.id);
  if (a && !a.tracks.some((t) => t.id !== cur.track.id && moves(t))) return planRemoveTriggerWithAnimation(site, node, cur.trigger.id);
  const plan = new Plan(site);
  plan.push(planRemoveTrack(site, cur.animation.id, cur.track.id));
  // D'autres éléments bougent encore et l'hôte, lui, ne bouge plus : l'animation passe à celui qui part ensuite, qui la lance lui-même
  // (24 septembre 2026). Une animation lancée par la page, ou partagée entre plusieurs hôtes, reste où elle est.
  if (a && !cur.page && animationUsages(site, a.id).length <= 1) plan.push(planRehost(plan.site, a.id, node, cur.trigger));
  return plan.ops;
}

/** Donne l'animation à l'élément dont la piste part en premier : sa piste devient relative, le déclencheur de `from` lui est recopié. */
function planRehost(site: Site, animationId: Id, from: Node, trigger: Trigger): Op[] {
  const a = animationById(site, animationId);
  if (!a) return [];
  const heads = a.tracks.filter((t) => "node" in t.target && moves(t)).sort((x, y) => trackSpan(x).start - trackSpan(y).start || Number(!!x.start) - Number(!!y.start));
  const head = heads[0];
  if (!head) return [];
  const heirNode = indexSite(site).get((head.target as { node: Id }).node)?.node;
  if (!heirNode || heirNode.id === from.id) return [];
  const plan = new Plan(site);
  plan.push(planTracks(site, a.id, (tracks) => tracks.map((t) => (t.id === head.id ? { ...stripStart(t), target: withTargetKind({ trigger: true }, (t.target as { split?: "words" | "letters" }).split ?? ((t.target as { children?: true }).children ? "children" : "element")) } : t)), { fixed: new Set([head.id]) }));
  plan.push(planRemoveTrigger(indexSite(plan.site).get(from.id)!.node, trigger.id));
  const { id: _old, ...rest } = trigger; void _old;
  plan.push(planAddTrigger(indexSite(plan.site).get(heirNode.id)!.node, { ...rest, id: newId() }));
  return plan.ops;
}

/** Délai d'une apparition : l'écart après ce qui la fait démarrer ; pour un élément qui part en premier, son départ (le délai du déclencheur est replié dans la ligne de temps : un seul délai). */
export function planAppearanceDelay(site: Site, nodeId: Id, ms: number): Op[] {
  const cur = appearanceOf(site, nodeId);
  const want = Math.max(0, Math.round(ms));
  if (!cur || want === cur.delay) return [];
  if (cur.track.start && cur.begin.kind !== "own" && cur.begin.kind !== "host") return planTrack(site, cur, (t) => ({ ...t, start: startOf(t.start!, startRef(t.start!), want) }));
  const plan = new Plan(site);
  let triggerDelay = cur.trigger.delay ?? 0;
  if (triggerDelay && animationUsages(site, cur.animation.id).length <= 1) {
    const d = triggerDelay;
    plan.push(planTracks(site, cur.animation.id, (tracks) => tracks.map((t) => shiftTrackTo(t, trackSpan(t).start + d)), { fixed: new Set(cur.animation.tracks.map((t) => t.id)) }));
    plan.push(triggerPatch(plan.site, cur, { delay: undefined }));
    triggerDelay = 0;
  }
  const now = appearanceOf(plan.site, nodeId)!;
  plan.push(planTrack(plan.site, now, (t) => shiftTrackTo(t, Math.max(0, want - triggerDelay))));
  return plan.ops;
}

/** Vitesse d'une apparition (Rapide · Normale · Lente, par rapport à son préréglage) : sa piste seule change d'échelle, ce qui la suit est replacé. */
export function planAppearanceSpeed(site: Site, nodeId: Id, speed: QuickSpeed): Op[] {
  const cur = appearanceOf(site, nodeId);
  const base = cur?.preset ?? cur?.origin;
  if (!cur || !base) return [];
  const s = cur.start;
  const len = trackSpan(cur.track).end - s;
  const want = Math.round(base.duration * QUICK_SPEEDS[speed]);
  if (!len || want === len) return [];
  const f = want / len;
  return planTrack(site, cur, (t) => ({ ...t, keyframes: sortedKeyframes(t).map((k) => ({ ...k, at: s + Math.round((k.at - s) * f) })), ...(t.stagger ? { stagger: { ...t.stagger, each: Math.round(t.stagger.each * f) } } : {}) }));
}

/** Durée d'une apparition en millisecondes (lot 8 : « Lente » donnait 1 120 ms sans qu'on puisse taper 400) : la piste est mise à cette longueur depuis son départ, décalage compris ; ce qui suit se replace. */
export function planAppearanceDuration(site: Site, nodeId: Id, ms: number): Op[] {
  const cur = appearanceOf(site, nodeId);
  if (!cur) return [];
  const s = cur.start;
  const len = trackSpan(cur.track).end - s;
  const want = Math.max(50, Math.round(ms));
  if (!len || want === len) return [];
  const f = want / len;
  return planTrack(site, cur, (t) => ({ ...t, keyframes: sortedKeyframes(t).map((k) => ({ ...k, at: s + Math.round((k.at - s) * f) })), ...(t.stagger ? { stagger: { ...t.stagger, each: Math.round(t.stagger.each * f) } } : {}) }));
}

/**
 * Effet d'une apparition : un préréglage (départ, rattachement et vitesse gardés), ou « » pour la retirer (ce qui la suivait se raccroche).
 * Sans apparition : sur un élément qui lance une suite sans bouger lui-même, sa piste s'ajoute au départ de la suite ; sinon, un choix rapide.
 */
export function planAppearancePreset(site: Site, nodeId: Id, presetId: string): Op[] {
  const loc = indexSite(site).get(nodeId);
  if (!loc) return [];
  const cur = appearanceOf(site, nodeId);
  if (!presetId) return cur ? (cur.own ? planDropOwnTrack(site, cur, loc.node) : planDropTrack(site, cur)) : [];
  const preset = presetById(presetId);
  if (!preset || preset.group !== "Apparition") return [];
  if (!cur) {
    const sequence = (loc.node.triggers ?? []).map((t) => ({ t, a: appearanceAnimation(site, t) })).find(({ a }) => a && a.tracks.some(moves));
    if (sequence?.a) {
      const own: Track = { id: newId(), target: { trigger: true }, keyframes: preset.keyframes.map((k) => ({ ...k, style: structuredClone(k.style) })) };
      return planTracks(site, sequence.a.id, (tracks) => [own, ...tracks], { fixed: new Set([own.id]) });
    }
    return planQuickAnimation(site, loc.node, "Apparition", presetId);
  }
  const f = cur.preset || cur.origin ? cur.factor : 1;
  const ops = planTrack(site, cur, (t) => ({ ...t, keyframes: preset.keyframes.map((k) => ({ ...k, at: cur.start + Math.round(k.at * f), style: structuredClone(k.style) })) }));
  // Le nom et le préréglage d'origine d'une animation à une seule piste suivent le choix.
  if (!cur.own || cur.animation.tracks.length > 1) return ops;
  const after = applyOps(site, ops).site;
  const a = animationById(after, cur.animation.id)!;
  return [...ops, { op: "site.set", path: "animations", value: after.animations.map((x) => (x.id === a.id ? { ...a, preset: preset.id, ...(a.name === (cur.origin?.label ?? cur.preset?.label) ? { name: preset.label } : {}) } : x)) }];
}

/** Rejouer à chaque passage (ou une seule fois) : se règle sur ce qui lance l'apparition, pour toute la scène. */
export function planAppearanceReplay(site: Site, nodeId: Id, everyPass: boolean): Op[] {
  const cur = appearanceOf(site, nodeId);
  if (!cur || cur.trigger.on !== "inView" || (cur.trigger.once === false) === everyPass) return [];
  return triggerPatch(site, cur, { once: everyPass ? false : undefined });
}

/** D'un bloc, lettre par lettre (30 ms) ou enfant par enfant (100 ms) ; ce qui vient après attend le dernier morceau. */
export function planAppearanceDetail(site: Site, nodeId: Id, detail: QuickDetail): Op[] {
  const cur = appearanceOf(site, nodeId);
  if (!cur || (cur.detail === detail && !(detail === "one" && visesChildren(cur)))) return [];
  return planTrack(site, cur, (t) => {
    const next: Track = { ...t, target: withTargetKind(t.target, detail === "one" ? "element" : detail) };
    if (detail === "letters") next.stagger = { each: 30 };
    else if (detail === "children") next.stagger = { each: 100 };
    else delete next.stagger;
    return next;
  });
}

/** Un élément sans apparition propre qui arrive avec un autre : un parent qui fait arriver ses enfants (la carte d'une liste), ou un bloc qui arrive d'un seul tenant. */
export type InheritedAppearance = {
  /** L'élément qui porte l'apparition (la liste, le bloc). */
  carrierId: Id;
  /** Ce qui bouge et contient l'élément : l'enfant de la liste (la carte), ou le bloc lui-même. */
  moverId: Id;
  appearance: Appearance;
  viaChildren: boolean;
};
const visesChildren = (ap: Appearance) => !("selector" in ap.track.target) && !!ap.track.target.children;
export function inheritedAppearance(site: Site, nodeId: Id, _index?: Map<Id, NodeLocation>): InheritedAppearance | undefined {
  const { index } = cacheOf(site);
  const start = index.get(nodeId);
  if (!start || appearanceOf(site, nodeId)) return undefined;
  for (let cur: NodeLocation | undefined = start; cur; cur = cur.parent ? index.get(cur.parent.id) : undefined) {
    if (cur !== start) {
      const own = appearanceOf(site, cur.node.id);
      if (own && !visesChildren(own)) return { carrierId: cur.node.id, moverId: cur.node.id, appearance: own, viaChildren: false };
    }
    const parent = cur.parent ? index.get(cur.parent.id) : undefined;
    const byParent = parent ? appearanceOf(site, parent.node.id) : undefined;
    if (parent && byParent && visesChildren(byParent)) return { carrierId: parent.node.id, moverId: cur.node.id, appearance: byParent, viaChildren: true };
  }
  return undefined;
}

/** Les blocs qui contiennent l'élément et peuvent lancer sa scène : sections et blocs nommés, du plus proche au plus lointain (trois au plus, sans la racine). */
export function appearanceStartOptions(site: Site, nodeId: Id): Id[] {
  const { index } = cacheOf(site);
  const out: Id[] = [];
  for (let cur = index.get(nodeId); cur?.parent && out.length < 3; cur = index.get(cur.parent.id)) {
    const p = index.get(cur.parent.id);
    if (!p?.parent) break;
    if (p.node.props.tag === "section" || p.node.name) out.push(p.node.id);
  }
  return out;
}

/** Faire démarrer une apparition (et sa suite, si l'élément lançait sa propre animation) quand un bloc qui le contient entre dans l'écran. */
function planWithin(site: Site, cur: Appearance, loc: NodeLocation, ancestorId: Id): Op[] {
  const index = indexSite(site);
  let isAncestor = false;
  for (let p = loc.parent ? index.get(loc.parent.id) : undefined; p; p = p.parent ? index.get(p.parent.id) : undefined) if (p.node.id === ancestorId) { isAncestor = true; break; }
  if (!isAncestor || (cur.begin.kind === "host" && cur.hostId === ancestorId)) return [];
  const plan = new Plan(site);
  const carries = cur.own && animationUsages(site, cur.animation.id).length <= 1;
  const group = carries ? carryGroup(cur, undefined) : [shiftTrackTo(stripStart(toNodeTarget(cur.track, cur.nodeId)), 0)];
  // Toujours à l'entrée dans l'écran du bloc : c'est ce que dit le choix ; « rejouer à chaque passage » est gardé.
  const once = cur.trigger.on === "inView" ? cur.trigger.once : undefined;
  if (carries) {
    plan.push(planRemoveTrigger(loc.node, cur.trigger.id));
    plan.push([{ op: "site.set", path: "animations", value: plan.site.animations.filter((a) => a.id !== cur.animation.id) }]);
  } else plan.push(cur.own ? planDropOwnTrack(plan.site, cur, loc.node) : planDropTrack(plan.site, cur));
  const ancestor = indexSite(plan.site).get(ancestorId)!.node;
  // Le bloc lance déjà une apparition à l'entrée dans l'écran : l'élément la rejoint, au départ ; sinon le bloc reçoit un déclencheur et l'animation.
  const existing = (ancestor.triggers ?? []).find((t) => t.on === "inView" && appearanceAnimation(plan.site, t) && animationUsages(plan.site, t.animation).length <= 1);
  if (existing) { plan.push(planAppendTracks(plan.site, existing.animation, group)); return plan.ops; }
  const animation: Animation = { id: newId(), name: `Scène · ${ancestor.name ?? cur.animation.name}`, duration: 1, tracks: [] };
  plan.push([{ op: "site.set", path: "animations", value: [...plan.site.animations, animation] }]);
  plan.push(planAddTrigger(ancestor, { id: newId(), on: "inView", animation: animation.id, ...(once === false ? { once: false } : {}) }));
  plan.push(planAppendTracks(plan.site, animation.id, group));
  return plan.ops;
}

/**
 * Faire pareil pour les voisins qui suivent (lot 7, réduire les gestes) : chaque voisin sans apparition propre reçoit une copie de la piste
 * de l'élément dans la même animation, rattachée « avec » le précédent plus `gap` ms : ils partent l'un après l'autre. L'élément lançait sa
 * propre animation : elle reste la sienne (les voisins la rejoignent) ; il était dans une scène : les voisins rejoignent la scène derrière lui.
 */
export function planAppearanceCascade(site: Site, nodeId: Id, gap = 120): Op[] {
  const index = indexSite(site);
  const cur = appearanceOf(site, nodeId);
  const loc = index.get(nodeId);
  if (!cur || !loc?.parent) return [];
  const siblings = loc.parent.children ?? [];
  const after = siblings.slice(siblings.indexOf(loc.node) + 1).filter((n) => !appearanceOf(site, n.id));
  if (!after.length) return [];
  if (animationUsages(site, cur.animation.id).length > 1) return [];
  const source = toNodeTarget(cur.track, nodeId);
  let prev = cur.track.id;
  const group: Track[] = after.map((n) => {
    const t: Track = { id: newId(), target: withTargetKind({ node: n.id }, "selector" in source.target ? "element" : source.target.split ?? (source.target.children ? "children" : "element")), ...(cur.track.stagger ? { stagger: cur.track.stagger } : {}), keyframes: sortedKeyframes(cur.track).map((k) => ({ ...k, style: structuredClone(k.style) })), start: startOf("with", prev, gap) };
    prev = t.id;
    return t;
  });
  return planAppendTracks(site, cur.animation.id, group);
}

// ---------------------------------------------------------------- groupe de voisins (lot 8)

/** Un élément et ses voisins du même genre : occurrences d'un même composant, cartes d'une vue, ou enfants de même type d'un bloc nommé. */
export type SiblingGroup = { groupId: Id; members: Id[]; kind: "instances" | "cards" | "children" };

/**
 * Le groupe que forme un élément avec ses voisins (les trois chiffres sous « Chiffres », les cartes d'une liste) : c'est lui qu'on règle pour
 * les faire arriver un à un. Aucun groupe si l'élément n'a pas au moins un voisin du même genre, ou si son parent est une racine.
 */
export function siblingGroup(site: Site, nodeId: Id): SiblingGroup | undefined {
  const { index } = cacheOf(site);
  const loc = index.get(nodeId);
  if (!loc?.parent || !index.get(loc.parent.id)?.parent) return undefined;
  const parent = loc.parent;
  const kids = parent.children ?? [];
  const me = loc.node;
  let members: Node[];
  let kind: SiblingGroup["kind"];
  if (parent.type === "collection") { members = kids; kind = "cards"; }
  else if (me.type === "instance") { members = kids.filter((k) => k.type === "instance" && k.props.component === me.props.component); kind = "instances"; }
  else if (parent.name || parent.props.tag === "section") { members = kids.filter((k) => k.type === me.type); kind = "children"; }
  else return undefined;
  if (members.length < 2 || members.length !== kids.length) return undefined;
  return { groupId: parent.id, members: members.map((k) => k.id), kind };
}

/**
 * Depuis un enfant, faire arriver tout son groupe un à un avec un préréglage : les apparitions propres des membres sont retirées, le groupe
 * reçoit l'effet sur ses enfants, échelonnés. Un préréglage vide retire l'apparition du groupe.
 */
export function planGroupAppearance(site: Site, childId: Id, presetId: string): Op[] {
  const g = siblingGroup(site, childId);
  if (!g) return [];
  const plan = new Plan(site);
  if (!presetId) { plan.push(planAppearancePreset(plan.site, g.groupId, "")); return plan.ops; }
  for (const id of g.members) { const ap = appearanceOf(plan.site, id); if (ap?.own) plan.push(planAppearancePreset(plan.site, id, "")); }
  plan.push(planAppearancePreset(plan.site, g.groupId, presetId));
  plan.push(planAppearanceDetail(plan.site, g.groupId, "children"));
  return plan.ops;
}

/**
 * Enchaîner une section dans l'ordre de la page (lot 9, vague 5 : la scène se voyait sans se régler) : chaque élément animé démarre
 * « après » celui qui le précède, tous dans un seul lancement, celui du premier ; « à chaque passage » est gardé si l'un l'avait.
 * Rien à écrire si la section est déjà enchaînée ainsi, ou si moins de deux éléments bougent.
 */
export function planChainInOrder(site: Site, sectionId: Id): Op[] {
  const { index } = cacheOf(site);
  const section = index.get(sectionId)?.node;
  if (!section?.children?.length) return [];
  const ids: Id[] = [];
  walk(section, (n) => {
    if (n.id === sectionId) return;
    const ap = appearanceOf(site, n.id);
    if (ap) { ids.push(n.id); return ap.detail === "children" ? false : undefined; }
    if (inheritedAppearance(site, n.id)) return false;
  });
  if (ids.length < 2) return [];
  const aps = ids.map((id) => appearanceOf(site, id)!);
  // Un élément déjà rattaché (« après » ou « avec ») à un élément qui le précède garde son rattachement : les voisins échelonnés restent échelonnés.
  const attached = (ap: Appearance, i: number) => (ap.begin.kind === "after" || ap.begin.kind === "with") && ids.slice(0, i).includes(ap.begin.node);
  const chained = aps.every((ap, i) => (i === 0 ? ap.own : attached(ap, i) && ap.trigger.id === aps[0]!.trigger.id));
  if (chained) return [];
  const every = aps.some((ap) => ap.trigger.on === "inView" && ap.trigger.once === false);
  const plan = new Plan(site);
  // Ce qui suit un élément rattaché reste derrière lui : le prochain à enchaîner part après le dernier élément de ce bloc.
  let prev = ids[0]!;
  for (let i = 1; i < ids.length; i++) {
    const ap = appearanceOf(plan.site, ids[i]!)!;
    if (!attached(ap, i)) plan.push(planAppearanceStart(plan.site, ids[i]!, { kind: "after", node: prev }));
    prev = ids[i]!;
  }
  if (every) plan.push(planAppearanceReplay(plan.site, ids[0]!, true));
  return plan.ops;
}

// ---------------------------------------------------------------- suppression d'éléments

/**
 * Avant de supprimer des éléments : leurs pistes quittent les animations des autres éléments (ce qui les suivait se raccroche), et une suite
 * qu'un élément supprimé lançait est reprise par le premier élément restant de cette suite (sa piste devient la sienne, le déclencheur passe sur lui).
 */
export function planForgetNodes(site: Site, removed: Set<Id>): Op[] {
  const plan = new Plan(site);
  for (const a of site.animations) {
    for (const t of a.tracks) if ("node" in t.target && removed.has(t.target.node)) plan.push(planRemoveTrack(plan.site, a.id, t.id));
  }
  const index = indexSite(plan.site);
  for (const id of removed) {
    const node = index.get(id)?.node;
    for (const trig of node?.triggers ?? []) {
      const a = animationById(plan.site, trig.animation);
      if (!a || animationUsages(plan.site, a.id).length > 1) continue;
      const survivors = a.tracks.filter((t) => "node" in t.target && !removed.has(t.target.node) && moves(t));
      if (!survivors.length) continue;
      // Sa propre piste part d'abord : la suite se raccroche à son départ.
      for (const own of a.tracks.filter((t) => "trigger" in t.target)) plan.push(planRemoveTrack(plan.site, a.id, own.id));
      const now = animationById(plan.site, a.id)!;
      const heads = now.tracks.filter((t) => "node" in t.target && !removed.has(t.target.node) && moves(t)).sort((x, y) => trackSpan(x).start - trackSpan(y).start || Number(!!x.start) - Number(!!y.start));
      const head = heads[0]!;
      const heir = (head.target as { node: Id }).node;
      const heirNode = indexSite(plan.site).get(heir)?.node;
      if (!heirNode) continue;
      plan.push(planTracks(plan.site, a.id, (tracks) => tracks.map((t) => (t.id === head.id ? { ...stripStart(t), target: withTargetKind({ trigger: true }, (t.target as { split?: "words" | "letters" }).split ?? ((t.target as { children?: true }).children ? "children" : "element")) } : t)), { fixed: new Set([head.id]) }));
      const { id: _old, ...rest } = trig; void _old;
      plan.push(planAddTrigger(heirNode, { ...rest, id: newId() }));
    }
  }
  return plan.ops;
}

/** Supprimer un élément sans laisser de pistes orphelines ni de suite sans déclencheur (voir `planForgetNodes`). */
export function planRemoveNode(site: Site, id: Id): Op[] {
  const loc = indexSite(site).get(id);
  if (!loc) return [];
  const ids = new Set<Id>();
  walk(loc.node, (n) => { ids.add(n.id); });
  return [...planForgetNodes(site, ids), { op: "node.remove", id }];
}
