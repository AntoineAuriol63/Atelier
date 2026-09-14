import type { Animation, Id, Node, Op, Page, RootOwner, Site, Track, Trigger, TriggerOn } from "./types";
import { newId } from "./ids";
import { applyOps } from "./ops";
import { indexSite, walk, type NodeLocation } from "./tree";
import {
  ANIMATION_PRESETS, QUICK_SPEEDS, animationById, animationUsages, planAddTrigger, planRemoveAnimation, planRemoveTrigger, planRemoveTriggerWithAnimation,
  planQuickAnimation, planUpdatePageTrigger, planUpdateTrigger, presetById, resolveTrackTarget, trackSpan, withTargetKind,
  type AnimationPreset, type QuickDetail, type QuickGroup, type QuickSpeed,
} from "./animations";

/**
 * Apparition d'un élément (tests simulés du 14 septembre 2026, lot 1 ; `docs/plan-usage-animation-2026-09.md`).
 *
 * Ce que les participants cherchaient à côté de l'effet (« après le titre », un délai, rejouer) se règle depuis l'élément, et s'écrit
 * dans le modèle existant (§ 8.4) : un élément qui « démarre après » un autre devient une piste de l'animation qui lance cet autre,
 * placée à la fin de sa piste. Rien n'est stocké en plus : l'enchaînement se lit dans les départs et les fins des pistes, ce qui
 * garde une seule vérité entre la rubrique « Animation » et la ligne de temps.
 */

/** Ce qui fait démarrer l'apparition d'un élément. */
export type AppearanceBegin =
  /** l'élément se lance lui-même (son déclencheur) */
  | { kind: "own"; on: "load" | "inView" }
  /** premier d'une animation lancée par un autre élément, qui ne bouge pas lui-même (ou par la page) */
  | { kind: "host"; hostId: Id; on: TriggerOn }
  /** à la fin de l'apparition d'un autre élément */
  | { kind: "after"; node: Id }
  /** au départ de l'apparition d'un autre élément */
  | { kind: "with"; node: Id };

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
  /** Attente après ce qui fait démarrer (le délai du déclencheur compte quand l'élément part en premier). */
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

const plainText = (node: Node, locale: string): string => {
  const content = (node.props.content as Record<string, unknown[]> | undefined)?.[locale] ?? [];
  const rec = (list: unknown[]): string => list.map((s) => { const x = s as { t: string; v?: string; children?: unknown[] }; return x.t === "text" ? x.v ?? "" : x.t === "link" ? rec(x.children ?? []) : " "; }).join("");
  return rec(content);
};

/** Fin d'une piste : sa dernière image-clé, plus le décalage du dernier enfant, mot ou lettre quand elle en vise plusieurs. */
export function trackEnd(site: Site, track: Track, hostId: Id, index: Map<Id, NodeLocation> = indexSite(site)): number {
  const { end } = trackSpan(track);
  const each = track.stagger?.each ?? 0;
  if (!each) return end;
  const r = resolveTrackTarget(track.target, hostId);
  if ("selector" in r || (!r.children && !r.split)) return end;
  const n = index.get(r.node)?.node;
  if (!n) return end;
  let count = 1;
  if (r.children) count = n.type === "collection" ? ((n.props.view as { limit?: number } | undefined)?.limit ?? 1) : (n.children?.length ?? 1);
  else { const words = plainText(n, site.settings.defaultLocale).split(/\s+/).filter(Boolean); count = r.split === "letters" ? words.reduce((s, w) => s + [...w].length, 0) : words.length; }
  const maxRank = track.stagger?.from === "center" ? (count - 1) / 2 : count - 1;
  return end + each * Math.max(0, maxRank);
}

type Launch = { hostId: Id; page?: Page; trigger: Trigger };
const ownerKey = (o: RootOwner) => ("page" in o ? `p:${o.page}` : `c:${o.component}`);
/** Les déclencheurs d'une page (la page, puis ses éléments dans l'ordre du document) ou d'un composant. */
function launches(site: Site, owner: RootOwner): Launch[] {
  const out: Launch[] = [];
  const visit = (root: Node) => walk(root, (n) => { for (const t of n.triggers ?? []) out.push({ hostId: n.id, trigger: t }); });
  if ("page" in owner) {
    const page = site.pages.find((p) => p.id === owner.page);
    if (!page) return out;
    for (const t of page.triggers ?? []) out.push({ hostId: page.root.id, page, trigger: t });
    visit(page.root);
  } else {
    const cmp = site.components.find((c) => c.id === owner.component);
    if (cmp) visit(cmp.root);
  }
  return out;
}
/** L'animation d'un déclencheur, si elle peut porter des apparitions : au chargement ou à l'entrée dans l'écran, sans boucle, pas un préréglage d'une autre famille. */
function appearanceAnimation(site: Site, t: Trigger): Animation | undefined {
  if (!APPEAR_ONS.has(t.on)) return undefined;
  const a = animationById(site, t.animation);
  if (!a || a.loop === "infinite" || (typeof a.loop === "number" && a.loop > 1)) return undefined;
  const group = presetById(a.preset)?.group;
  return group && group !== "Apparition" ? undefined : a;
}
const speedOf = (factor: number): QuickSpeed | "custom" => (Object.entries(QUICK_SPEEDS) as [QuickSpeed, number][]).find(([, f]) => Math.abs(factor - f) < 0.05)?.[0] ?? "custom";

/** L'apparition d'un élément : sur lui-même d'abord (choix rapide, puis piste reconnue), sinon dans l'animation d'un autre élément de la même page. */
export function appearanceOf(site: Site, nodeId: Id, index: Map<Id, NodeLocation> = indexSite(site)): Appearance | undefined {
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
  const endOf = (t: Track) => trackEnd(site, t, launch.hostId, index);
  const end = endOf(track);
  const target = track.target;
  const detail: QuickDetail = !("selector" in target) && target.split ? "letters" : !("selector" in target) && target.children ? "children" : "one";
  const factor = match ? match.factor : origin && origin.duration ? Math.round(((trackSpan(track).end - start) / origin.duration) * 1000) / 1000 : 1;

  // Ce qui le fait démarrer, lu dans la ligne de temps : en même temps qu'une piste listée avant lui, sinon après la fin la plus proche.
  const nodeOf = (u: Track) => (resolveTrackTarget(u.target, launch.hostId) as { node: Id }).node;
  const others = animation.tracks.filter((u) => u !== track && moves(u) && !("selector" in u.target) && nodeOf(u) !== nodeId);
  const pos = (u: Track) => animation.tracks.indexOf(u);
  const exact = others.find((u) => pos(u) < pos(track) && Math.abs(trackSpan(u).start - start) <= 1);
  const prev = others.filter((u) => endOf(u) <= start + 1).sort((x, y) => endOf(y) - endOf(x) || pos(y) - pos(x))[0];
  const first = (launch.trigger.delay ?? 0) + start;
  let begin: AppearanceBegin;
  let delay: number;
  if (exact) { begin = { kind: "with", node: nodeOf(exact) }; delay = 0; }
  else if (prev) { begin = { kind: "after", node: nodeOf(prev) }; delay = Math.max(0, start - endOf(prev)); }
  else if (own) { begin = { kind: "own", on: launch.trigger.on as "load" | "inView" }; delay = first; }
  else {
    const w = others.filter((u) => trackSpan(u).start < start).sort((x, y) => trackSpan(y).start - trackSpan(x).start)[0];
    if (w) { begin = { kind: "with", node: nodeOf(w) }; delay = start - trackSpan(w).start; }
    else { begin = { kind: "host", hostId: launch.hostId, on: launch.trigger.on }; delay = first; }
  }
  return { nodeId, hostId: launch.hostId, ...(launch.page ? { page: launch.page } : {}), trigger: launch.trigger, animation, track, own, ...(match ? { preset: match.preset } : {}), ...(origin ? { origin } : {}), factor, speed: match ? speedOf(match.factor) : "custom", detail, start, end, begin, delay };
}

/** Les éléments après lesquels (ou avec lesquels) un élément peut démarrer : ceux de la même animation par ordre de départ, puis ceux de la page dans l'ordre du document. */
export function appearanceAnchors(site: Site, nodeId: Id): Id[] {
  const index = indexSite(site);
  const loc = index.get(nodeId);
  if (!loc) return [];
  const out: Id[] = [];
  const add = (id: Id) => { if (id !== nodeId && !out.includes(id)) out.push(id); };
  const cur = appearanceOf(site, nodeId, index);
  if (cur) {
    const tracks = cur.animation.tracks.filter((u) => moves(u) && !("selector" in u.target));
    [...tracks].sort((x, y) => trackSpan(x).start - trackSpan(y).start || tracks.indexOf(x) - tracks.indexOf(y)).forEach((u) => add((resolveTrackTarget(u.target, cur.hostId) as { node: Id }).node));
  }
  const root = "page" in loc.owner ? site.pages.find((p) => p.id === (loc.owner as { page: Id }).page)?.root : site.components.find((c) => c.id === (loc.owner as { component: Id }).component)?.root;
  if (root) walk(root, (n) => { if (n.id !== nodeId && !out.includes(n.id) && appearanceOf(site, n.id, index)) out.push(n.id); });
  return out;
}

// ---------------------------------------------------------------- réglages

/** Opérations enchaînées sur une copie de travail : chaque étape se calcule sur le document déjà modifié. */
class Plan {
  ops: Op[] = [];
  constructor(public site: Site) {}
  push(ops: Op[]) { if (!ops.length) return; this.site = applyOps(this.site, ops).site; this.ops.push(...ops); }
  setAnimation(next: Animation) { this.push([{ op: "site.set", path: "animations", value: this.site.animations.map((a) => (a.id === next.id ? next : a)) }]); }
}
const shiftTrack = (t: Track, d: number): Track => (d ? { ...t, keyframes: t.keyframes.map((k) => ({ ...k, at: Math.max(0, k.at + d) })) } : t);
const withTracks = (a: Animation, tracks: Track[]): Animation => ({ ...a, tracks, duration: Math.max(1, ...tracks.map((t) => trackSpan(t).end)) });
const anchorTime = (cur: Appearance) => (cur.begin.kind === "own" || cur.begin.kind === "host" ? 0 : cur.start - cur.delay);
function triggerPatch(site: Site, cur: Appearance, patch: Partial<Trigger>): Op[] {
  if (cur.page) return planUpdatePageTrigger(site, cur.page.id, cur.trigger.id, patch);
  const host = indexSite(site).get(cur.hostId)?.node;
  return host ? planUpdateTrigger(host, cur.trigger.id, patch) : [];
}
/**
 * Remplace la piste d'un élément et décale ce qui en dépend : ce qui partait en même temps que lui (piste listée après, même départ)
 * suit son départ, ce qui partait après sa fin suit sa fin.
 */
function replaceTrack(site: Site, cur: Appearance, next: Track): Animation {
  const a = animationById(site, cur.animation.id)!;
  const index = indexSite(site);
  const old = a.tracks.find((t) => t.id === cur.track.id)!;
  const i = a.tracks.indexOf(old);
  const s0 = trackSpan(old).start, e0 = trackEnd(site, old, cur.hostId, index);
  const s1 = trackSpan(next).start, e1 = trackEnd(site, next, cur.hostId, index);
  return withTracks(a, a.tracks.map((u, j) => {
    if (u === old) return next;
    const su = trackSpan(u).start;
    if (j > i && Math.abs(su - s0) <= 1) return shiftTrack(u, s1 - s0);
    return su >= e0 - 1 ? shiftTrack(u, e1 - e0) : u;
  }));
}
/** Retire la piste d'un élément de son animation ; ce qui partait après elle se rapproche d'autant (l'enchaînement se referme). Une animation où plus rien ne bouge part avec ses déclencheurs. */
function removeTrack(plan: Plan, cur: Appearance) {
  const a = animationById(plan.site, cur.animation.id)!;
  const old = a.tracks.find((t) => t.id === cur.track.id)!;
  const e = trackEnd(plan.site, old, cur.hostId);
  const cut = e - anchorTime(cur);
  const tracks = a.tracks.filter((t) => t !== old).map((u) => (trackSpan(u).start >= e - 1 ? shiftTrack(u, -cut) : u));
  if (!tracks.some(moves)) { plan.push(planRemoveAnimation(plan.site, a.id)); return; }
  plan.setAnimation(withTracks(a, tracks));
}

/** Faire démarrer l'apparition d'un élément : par lui-même (chargement, entrée dans l'écran), après un autre élément, ou en même temps. */
export function planAppearanceStart(site: Site, nodeId: Id, begin: AppearanceBegin): Op[] {
  const index = indexSite(site);
  const loc = index.get(nodeId);
  const cur = appearanceOf(site, nodeId, index);
  if (!loc || !cur || begin.kind === "host") return [];
  const plan = new Plan(site);
  if (begin.kind === "own") {
    if (cur.own) return cur.trigger.on === begin.on ? [] : triggerPatch(site, cur, { on: begin.on, ...(begin.on === "inView" ? {} : { once: undefined }) });
    // Il reprend son propre déclencheur, avec sa piste ramenée à 0 (effet, vitesse et détail gardés).
    removeTrack(plan, cur);
    const target = withTargetKind({ trigger: true }, "selector" in cur.track.target ? "element" : cur.track.target.split ?? (cur.track.target.children ? "children" : "element"));
    const keyframes = sortedKeyframes(cur.track).map((k) => ({ ...k, at: k.at - cur.start, style: structuredClone(k.style) }));
    const animation: Animation = { id: newId(), name: cur.preset?.label ?? cur.animation.name, duration: Math.max(1, keyframes[keyframes.length - 1]!.at), ...(cur.preset ? { preset: cur.preset.id } : {}), tracks: [{ id: newId(), target, ...(cur.track.stagger ? { stagger: cur.track.stagger } : {}), keyframes }] };
    plan.push([{ op: "site.set", path: "animations", value: [...plan.site.animations, animation] }]);
    plan.push(planAddTrigger(indexSite(plan.site).get(nodeId)!.node, { id: newId(), on: begin.on, animation: animation.id }));
    return plan.ops;
  }
  if (begin.node === nodeId) return [];
  const anchorLoc = index.get(begin.node);
  const target = appearanceOf(site, begin.node, index);
  if (!anchorLoc || !target || ownerKey(anchorLoc.owner) !== ownerKey(loc.owner)) return [];
  const sameAnimation = target.animation.id === cur.animation.id;
  let group: Track[];
  if (cur.own && !sameAnimation) {
    // L'élément lançait sa propre animation : elle part entière (ce qui le suivait reste derrière lui), ses pistes visent désormais l'élément.
    group = cur.animation.tracks.map((t) => ("trigger" in t.target ? { ...t, target: { node: nodeId, ...(t.target.children ? { children: true as const } : {}), ...(t.target.split ? { split: t.target.split } : {}) } } : t));
    plan.push(planRemoveTrigger(loc.node, cur.trigger.id));
    if (animationUsages(site, cur.animation.id).length <= 1) plan.push([{ op: "site.set", path: "animations", value: plan.site.animations.filter((a) => a.id !== cur.animation.id) }]);
  } else {
    group = [cur.track];
    removeTrack(plan, cur);
  }
  const into = animationById(plan.site, target.animation.id);
  const anchor = into?.tracks.find((t) => t.id === target.track.id);
  if (!into || !anchor) return [];
  const at = begin.kind === "after" ? trackEnd(plan.site, anchor, target.hostId) : trackSpan(anchor).start;
  const minStart = Math.min(...group.map((t) => trackSpan(t).start));
  const shift = Math.max(at - cur.start, -minStart);
  const taken = new Set(into.tracks.map((t) => t.id));
  const moved = group.map((t) => { const s = shiftTrack(t, shift); return taken.has(s.id) ? { ...s, id: newId() } : s; });
  plan.setAnimation(withTracks(into, [...into.tracks, ...moved]));
  return plan.ops;
}

/** Délai d'une apparition : attente après ce qui la fait démarrer. Quand l'élément part en premier, le délai de son déclencheur est replié dans la ligne de temps (un seul délai). */
export function planAppearanceDelay(site: Site, nodeId: Id, ms: number): Op[] {
  let cur = appearanceOf(site, nodeId);
  const want = Math.max(0, Math.round(ms));
  if (!cur || want === cur.delay) return [];
  const plan = new Plan(site);
  const first = cur.begin.kind === "own" || cur.begin.kind === "host";
  if (first && cur.trigger.delay && animationUsages(site, cur.animation.id).length <= 1) {
    const d = cur.trigger.delay;
    plan.setAnimation(withTracks(cur.animation, cur.animation.tracks.map((t) => shiftTrack(t, d))));
    plan.push(triggerPatch(plan.site, cur, { delay: undefined }));
    cur = appearanceOf(plan.site, nodeId)!;
  }
  const start = first ? Math.max(0, want - (cur.trigger.delay ?? 0)) : anchorTime(cur) + want;
  plan.setAnimation(replaceTrack(plan.site, cur, shiftTrack(cur.track, start - cur.start)));
  return plan.ops;
}

/** Vitesse d'une apparition (Rapide · Normale · Lente, par rapport à son préréglage) : sa piste seule change d'échelle, ce qui vient après elle suit. */
export function planAppearanceSpeed(site: Site, nodeId: Id, speed: QuickSpeed): Op[] {
  const cur = appearanceOf(site, nodeId);
  const base = cur?.preset ?? cur?.origin;
  if (!cur || !base) return [];
  const s = cur.start;
  const len = trackSpan(cur.track).end - s;
  const want = Math.round(base.duration * QUICK_SPEEDS[speed]);
  if (!len || want === len) return [];
  const f = want / len;
  const next: Track = { ...cur.track, keyframes: sortedKeyframes(cur.track).map((k) => ({ ...k, at: s + Math.round((k.at - s) * f) })), ...(cur.track.stagger ? { stagger: { ...cur.track.stagger, each: Math.round(cur.track.stagger.each * f) } } : {}) };
  const plan = new Plan(site);
  plan.setAnimation(replaceTrack(site, cur, next));
  return plan.ops;
}

/** Effet d'une apparition : un préréglage (départ et vitesse gardés), ou « » pour la retirer (l'enchaînement se referme). Sans apparition, pose un choix rapide sur l'élément. */
export function planAppearancePreset(site: Site, nodeId: Id, presetId: string): Op[] {
  const index = indexSite(site);
  const loc = index.get(nodeId);
  if (!loc) return [];
  const cur = appearanceOf(site, nodeId, index);
  if (!presetId) {
    if (!cur) return [];
    if (cur.own && !cur.animation.tracks.some((t) => t.id !== cur.track.id && moves(t))) return planRemoveTriggerWithAnimation(site, loc.node, cur.trigger.id);
    const plan = new Plan(site);
    removeTrack(plan, cur);
    return plan.ops;
  }
  const preset = presetById(presetId);
  if (!preset || preset.group !== "Apparition") return [];
  if (!cur) return planQuickAnimation(site, loc.node, "Apparition", presetId);
  const f = cur.preset || cur.origin ? cur.factor : 1;
  const next: Track = { ...cur.track, keyframes: preset.keyframes.map((k) => ({ ...k, at: cur.start + Math.round(k.at * f), style: structuredClone(k.style) })) };
  let animation = replaceTrack(site, cur, next);
  if (cur.own && "trigger" in cur.track.target) animation = { ...animation, preset: preset.id, ...(animation.name === (cur.origin?.label ?? cur.preset?.label) ? { name: preset.label } : {}) };
  const plan = new Plan(site);
  plan.setAnimation(animation);
  return plan.ops;
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
  if (!cur || cur.detail === detail) return [];
  const next: Track = { ...cur.track, target: withTargetKind(cur.track.target, detail === "one" ? "element" : detail) };
  if (detail === "letters") next.stagger = { each: 30 };
  else if (detail === "children") next.stagger = { each: 100 };
  else delete next.stagger;
  const plan = new Plan(site);
  plan.setAnimation(replaceTrack(site, cur, next));
  return plan.ops;
}
