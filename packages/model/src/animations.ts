import type { Animation, Id, Keyframe, Node, Op, Page, Site, Stagger, SplitMode, StyleProps, Track, TrackStart, TrackTarget, Trigger, TriggerOn } from "./types";
import { newId } from "./ids";
import { resolveNodeStyle, type ResolvedStyle } from "./style";
import { indexSite, type NodeLocation } from "./tree";

/** Courbes proposées dans l'interface (la valeur est du CSS). */
export const ANIM_EASINGS: { value: string; label: string }[] = [
  { value: "cubic-bezier(.22,1,.36,1)", label: "Doux (sortie)" }, { value: "ease-out", label: "Sortie" }, { value: "ease-in-out", label: "Entrée-sortie" }, { value: "ease-in", label: "Entrée" },
  { value: "linear", label: "Linéaire" }, { value: "cubic-bezier(.34,1.56,.64,1)", label: "Rebond" }, { value: "steps(4)", label: "Par paliers" },
];
export const TRIGGER_LABELS: Record<TriggerOn, string> = { load: "Au chargement", inView: "À l'entrée dans l'écran", hover: "Au survol", click: "Au clic", scroll: "Au défilement", pointer: "À la souris" };

/** Préréglage : une animation complète à cible relative, et le déclencheur qui va avec. */
export type AnimationPreset = {
  id: string; label: string; group: "Apparition" | "Survol" | "Continue" | "Attention";
  on: TriggerOn; duration: number; keyframes: Keyframe[]; loop?: number | "infinite"; alternate?: boolean; trigger?: Partial<Trigger>;
};
const SOFT = "cubic-bezier(.22,1,.36,1)";
const rest: StyleProps = { opacity: "1", transform: "none", filter: "none" };
const appear = (id: string, label: string, from: StyleProps, easing = SOFT, duration = 700): AnimationPreset => ({ id, label, group: "Apparition", on: "inView", duration, keyframes: [{ at: 0, style: from }, { at: duration, style: rest, easing }] });
/** Courbe qui dépasse la valeur d'arrivée puis revient s'y poser (tests simulés, PR8 : « un tout petit peu trop loin avant de revenir »). */
export const OVERSHOOT = "cubic-bezier(.34,1.56,.64,1)";
const loop = (id: string, label: string, duration: number, keyframes: [number, StyleProps][], easing = "ease-in-out", alternate?: boolean): AnimationPreset => ({ id, label, group: "Continue", on: "load", duration, loop: "infinite", alternate, keyframes: keyframes.map(([pct, style], i) => ({ at: Math.round((pct / 100) * duration), style, ...(i ? { easing } : {}) })) });
/** Animations prêtes à l'emploi : apparitions (à l'entrée dans l'écran), survol, continues (en boucle dès le chargement), attention (au clic). */
export const ANIMATION_PRESETS: AnimationPreset[] = [
  appear("fade", "Fondu", { opacity: "0" }),
  appear("fade-up", "Fondu en montant", { opacity: "0", transform: "translateY(28px)" }),
  appear("fade-down", "Fondu en descendant", { opacity: "0", transform: "translateY(-28px)" }),
  appear("slide-left", "Glissé depuis la droite", { opacity: "0", transform: "translateX(40px)" }),
  appear("slide-right", "Glissé depuis la gauche", { opacity: "0", transform: "translateX(-40px)" }),
  appear("zoom", "Zoom", { opacity: "0", transform: "scale(0.92)" }),
  appear("blur", "Netteté", { opacity: "0", filter: "blur(12px)" }),
  appear("rise-bounce", "Montée avec rebond", { opacity: "0", transform: "translateY(28px)" }, OVERSHOOT, 800),
  appear("zoom-bounce", "Zoom avec rebond", { opacity: "0", transform: "scale(0.85)" }, OVERSHOOT, 800),
  { id: "grow", label: "Grossir", group: "Survol", on: "hover", duration: 250, keyframes: [{ at: 0, style: { transform: "scale(1)" } }, { at: 250, style: { transform: "scale(1.06)" }, easing: "ease-out" }], trigger: { reverseOnLeave: true } },
  { id: "lift", label: "Soulever", group: "Survol", on: "hover", duration: 250, keyframes: [{ at: 0, style: { transform: "translateY(0)" } }, { at: 250, style: { transform: "translateY(-4px)" }, easing: "ease-out" }], trigger: { reverseOnLeave: true } },
  { id: "brighten", label: "Éclaircir", group: "Survol", on: "hover", duration: 200, keyframes: [{ at: 0, style: { filter: "brightness(1)" } }, { at: 200, style: { filter: "brightness(1.15)" }, easing: "ease-out" }], trigger: { reverseOnLeave: true } },
  loop("float", "Flottement", 3000, [[0, { transform: "translateY(0)" }], [50, { transform: "translateY(-10px)" }], [100, { transform: "translateY(0)" }]]),
  loop("pulse", "Pulsation", 1600, [[0, { transform: "scale(1)" }], [50, { transform: "scale(1.05)" }], [100, { transform: "scale(1)" }]]),
  loop("spin", "Rotation continue", 8000, [[0, { transform: "rotate(0deg)" }], [100, { transform: "rotate(360deg)" }]], "linear"),
  loop("blink", "Clignotement", 1400, [[0, { opacity: "1" }], [50, { opacity: "0.3" }], [100, { opacity: "1" }]]),
  loop("sway", "Balancement", 2000, [[0, { transform: "rotate(-3deg)" }], [100, { transform: "rotate(3deg)" }]], "ease-in-out", true),
  { id: "shake", label: "Secousse", group: "Attention", on: "click", duration: 400, keyframes: [{ at: 0, style: { transform: "translateX(0)" } }, { at: 100, style: { transform: "translateX(-6px)" }, easing: "ease-in-out" }, { at: 300, style: { transform: "translateX(6px)" }, easing: "ease-in-out" }, { at: 400, style: { transform: "translateX(0)" }, easing: "ease-in-out" }] },
  { id: "bounce", label: "Rebond", group: "Attention", on: "click", duration: 600, keyframes: [{ at: 0, style: { transform: "translateY(0)" } }, { at: 240, style: { transform: "translateY(-14px)" }, easing: "ease-out" }, { at: 420, style: { transform: "translateY(0)" }, easing: "ease-in" }, { at: 510, style: { transform: "translateY(-6px)" }, easing: "ease-out" }, { at: 600, style: { transform: "translateY(0)" }, easing: "ease-in" }] },
  { id: "custom", label: "Vide (à composer)", group: "Attention", on: "load", duration: 600, keyframes: [{ at: 0, style: {} }, { at: 600, style: {}, easing: "ease-in-out" }] },
];
export const presetById = (id: string | undefined): AnimationPreset | undefined => ANIMATION_PRESETS.find((p) => p.id === id);

/** Une animation à partir d'un préréglage ; `duration` met les images-clés à l'échelle ; la piste vise l'élément du déclencheur (`target` pour ses enfants, ses lettres…). */
export function animationFromPreset(preset: AnimationPreset, overrides: Partial<Omit<Animation, "tracks">> & { target?: TrackTarget; stagger?: Stagger; trackId?: Id } = {}): Animation {
  const { target, stagger, trackId, ...rest2 } = overrides;
  const scale = overrides.duration && preset.duration ? overrides.duration / preset.duration : 1;
  const keyframes = preset.keyframes.map((k) => ({ ...k, at: Math.round(k.at * scale), style: structuredClone(k.style) }));
  const base: Animation = { id: newId(), name: preset.label, duration: preset.duration, preset: preset.id, tracks: [] };
  if (preset.loop) base.loop = preset.loop;
  if (preset.alternate) base.alternate = true;
  const merged = { ...base, ...Object.fromEntries(Object.entries(rest2).filter(([, v]) => v !== undefined)) } as Animation;
  merged.tracks = [{ id: trackId ?? newId(), target: target ?? { trigger: true }, ...(stagger ? { stagger } : {}), keyframes }];
  return merged;
}
/** Le déclencheur qui va avec un préréglage. */
export function triggerFromPreset(preset: AnimationPreset, animationId: Id, overrides: Partial<Trigger> = {}): Trigger {
  const t: Trigger = { id: newId(), on: preset.on, animation: animationId, ...preset.trigger };
  for (const [k, v] of Object.entries(overrides)) if (v !== undefined) (t as unknown as Record<string, unknown>)[k] = v;
  return t;
}

export const animationById = (site: Pick<Site, "animations">, id: Id): Animation | undefined => site.animations.find((a) => a.id === id);

// ---------------------------------------------------------------- déclencheurs (sur un nœud)

export function planAddTrigger(node: Node, trigger: Trigger): Op[] {
  return [{ op: "node.set", id: node.id, path: "triggers", value: [...(node.triggers ?? []), trigger] }];
}
export function planUpdateTrigger(node: Node, id: Id, patch: Partial<Trigger>): Op[] {
  return [{ op: "node.set", id: node.id, path: "triggers", value: (node.triggers ?? []).map((t) => (t.id === id ? { ...t, ...patch } : t)) }];
}
export function planRemoveTrigger(node: Node, id: Id): Op[] {
  const list = (node.triggers ?? []).filter((t) => t.id !== id);
  return [{ op: "node.set", id: node.id, path: "triggers", value: list.length ? list : undefined }];
}
/**
 * Pose un préréglage sur un élément : l'animation dans le site, le déclencheur sur l'élément. `replaceTriggerId` remplace un
 * déclencheur existant (et retire son animation si plus rien d'autre ne l'utilise).
 */
export function planApplyPreset(site: Site, node: Node, preset: AnimationPreset, o: { animationId?: Id; triggerId?: Id; replaceTriggerId?: Id; target?: TrackTarget; stagger?: Stagger; duration?: number; trigger?: Partial<Trigger> } = {}): Op[] {
  const animation = animationFromPreset(preset, { id: o.animationId, duration: o.duration, target: o.target, stagger: o.stagger });
  const trigger = triggerFromPreset(preset, animation.id, { ...(o.triggerId ? { id: o.triggerId } : {}), ...o.trigger });
  const old = o.replaceTriggerId ? (node.triggers ?? []).find((t) => t.id === o.replaceTriggerId) : undefined;
  const others = (node.triggers ?? []).filter((t) => t.id !== o.replaceTriggerId);
  const orphan = old && animationUsages(site, old.animation).length <= 1 ? old.animation : undefined;
  return [
    { op: "site.set", path: "animations", value: [...site.animations.filter((a) => a.id !== orphan && a.id !== animation.id), animation] },
    { op: "node.set", id: node.id, path: "triggers", value: [...others, trigger] },
  ];
}

/**
 * « Animer cet élément » (audit n°5 · R3) : le cas le plus courant en un geste. Un déclencheur à l'entrée dans l'écran sur l'élément,
 * une animation vide nommée d'après lui, et une piste sur l'élément lui-même (image-clé de repos à 0 ms), prête à remplir ou à régler.
 */
export function planAnimateElement(site: Site, node: Node, o: { name: string; on?: TriggerOn; animationId?: Id; triggerId?: Id; trackId?: Id }): Op[] {
  const animation: Animation = { id: o.animationId ?? newId(), name: o.name, duration: 1000, tracks: [{ id: o.trackId ?? newId(), target: { trigger: true }, keyframes: [{ at: 0, style: {} }] }] };
  return [...planAddAnimation(site, animation), ...planAddTrigger(node, { id: o.triggerId ?? newId(), on: o.on ?? "inView", animation: animation.id })];
}
/** Retire un déclencheur et, si plus rien ne la lance, son animation. */
export function planRemoveTriggerWithAnimation(site: Site, node: Node, triggerId: Id): Op[] {
  const t = (node.triggers ?? []).find((x) => x.id === triggerId);
  if (!t) return [];
  const ops = planRemoveTrigger(node, triggerId);
  if (animationUsages(site, t.animation).length <= 1) ops.push({ op: "site.set", path: "animations", value: site.animations.filter((a) => a.id !== t.animation) });
  return ops;
}

// ---------------------------------------------------------------- déclencheurs de page (portés par la racine au rendu)

const pageTriggersOp = (site: Site, pageId: Id, fn: (list: Trigger[]) => Trigger[]): Op[] => {
  const i = site.pages.findIndex((p) => p.id === pageId);
  if (i < 0) return [];
  const list = fn(site.pages[i]!.triggers ?? []);
  return [{ op: "site.set", path: `pages.${i}.triggers`, value: list.length ? list : undefined }];
};
export function planAddPageTrigger(site: Site, pageId: Id, trigger: Trigger): Op[] {
  return pageTriggersOp(site, pageId, (list) => [...list, trigger]);
}
export function planUpdatePageTrigger(site: Site, pageId: Id, id: Id, patch: Partial<Trigger>): Op[] {
  return pageTriggersOp(site, pageId, (list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
}
/** Retire un déclencheur de page et, si plus rien ne la lance, son animation. */
export function planRemovePageTriggerWithAnimation(site: Site, pageId: Id, id: Id): Op[] {
  const t = site.pages.find((p) => p.id === pageId)?.triggers?.find((x) => x.id === id);
  if (!t) return [];
  const ops = pageTriggersOp(site, pageId, (list) => list.filter((x) => x.id !== id));
  if (animationUsages(site, t.animation).length <= 1) ops.push({ op: "site.set", path: "animations", value: site.animations.filter((a) => a.id !== t.animation) });
  return ops;
}

// ---------------------------------------------------------------- choix rapides (cadrage § 4.2 et § 4.3)

const sameStyle = (a: StyleProps, b: StyleProps) => { const keys = new Set([...Object.keys(a), ...Object.keys(b)]); return [...keys].every((k) => JSON.stringify(a[k]) === JSON.stringify(b[k])); };
/**
 * L'animation est-elle encore son préréglage ? Une seule piste à cible relative (l'élément, ses enfants ou ses morceaux, décalage libre),
 * les images-clés du préréglage aux mêmes proportions (mise à l'échelle permise), mêmes styles, courbes, répétitions et aller-retour.
 * Retouchée à la main dans le mode Animation, elle devient « personnalisée » ; annuler la retouche la rend à son préréglage.
 */
export function isPresetIntact(a: Animation): boolean {
  const p = presetById(a.preset);
  const t = a.tracks[0];
  if (!p || a.tracks.length !== 1 || !t || !("trigger" in t.target)) return false;
  if ((a.loop ?? 1) !== (p.loop ?? 1) || !!a.alternate !== !!p.alternate) return false;
  const kfs = [...t.keyframes].sort((x, y) => x.at - y.at);
  if (kfs.length !== p.keyframes.length) return false;
  const scale = p.duration ? (kfs[kfs.length - 1]?.at ?? 0) / p.duration : 1;
  return kfs.every((k, i) => { const q = p.keyframes[i]!; return Math.abs(k.at - Math.round(q.at * scale)) <= 1 && sameStyle(k.style, q.style) && (k.easing ?? undefined) === (q.easing ?? undefined); });
}
/** Une animation qui fait bouger autre chose que l'élément qui la lance (une suite, une scène). */
export const isSequence = (a: Animation): boolean => a.tracks.some((t) => !("trigger" in t.target));
export type QuickGroup = AnimationPreset["group"];
export type QuickDetail = "one" | "letters" | "children";
/** Le choix rapide d'une famille (apparition, survol, continu…) posé sur un élément : son déclencheur, son préréglage, s'il est intact, et son détail. */
export function quickAnimation(site: Site, node: Node, group: QuickGroup): { trigger: Trigger; animation: Animation; preset: AnimationPreset; intact: boolean; detail: QuickDetail } | undefined {
  for (const trigger of node.triggers ?? []) {
    const animation = animationById(site, trigger.animation);
    const preset = presetById(animation?.preset);
    if (!animation || !preset || preset.group !== group) continue;
    // Une suite (des pistes d'autres éléments dans l'animation) n'est pas un choix rapide : la remplacer effacerait leur apparition.
    if (isSequence(animation)) continue;
    const target = animation.tracks[0]?.target;
    const detail: QuickDetail = target && !("selector" in target) && target.split ? "letters" : target && !("selector" in target) && target.children ? "children" : "one";
    return { trigger, animation, preset, intact: isPresetIntact(animation), detail };
  }
  return undefined;
}
/** Déclencheurs qui répètent une famille de choix rapide déjà présente sur l'élément (le premier compte, les suivants se jouent en plus). */
export function duplicateQuickTriggers(site: Site, node: Node): Set<Id> {
  const seen = new Set<string>();
  const out = new Set<Id>();
  for (const t of node.triggers ?? []) {
    const a = animationById(site, t.animation);
    const group = a && !isSequence(a) ? presetById(a.preset)?.group : undefined;
    if (!group || group === "Attention") continue;
    if (seen.has(group)) out.add(t.id); else seen.add(group);
  }
  return out;
}
/** Vitesses proposées pour un choix rapide, en facteur de la durée du préréglage. */
export const QUICK_SPEEDS = { fast: 0.6, normal: 1, slow: 1.6 } as const;
export type QuickSpeed = keyof typeof QUICK_SPEEDS;
/** Vitesse d'un choix rapide : rapide, normale ou lente d'après sa longueur rapportée au préréglage ; « custom » si elle a été réglée à la main. */
export function quickSpeed(q: { animation: Animation; preset: AnimationPreset }): QuickSpeed | "custom" {
  const ratio = q.preset.duration ? animationLength(q.animation) / q.preset.duration : 1;
  const found = (Object.entries(QUICK_SPEEDS) as [QuickSpeed, number][]).find(([, f]) => Math.abs(ratio - f) < 0.05);
  return found ? found[0] : "custom";
}
/** Règle la vitesse d'un choix rapide (met son animation à l'échelle, qui reste son préréglage). */
export function planQuickSpeed(site: Site, node: Node, group: QuickGroup, speed: QuickSpeed): Op[] {
  const q = quickAnimation(site, node, group);
  return q ? planScaleAnimation(site, q.animation.id, q.preset.duration * QUICK_SPEEDS[speed]) : [];
}
/** Pose (ou remplace, ou retire avec `""`) le préréglage d'une famille sur l'élément seul ; le détail (lettres, enfants) et le délai sont gardés. */
export function planQuickAnimation(site: Site, node: Node, group: QuickGroup, presetId: string): Op[] {
  const current = quickAnimation(site, node, group);
  if (!presetId) return current ? planRemoveTriggerWithAnimation(site, node, current.trigger.id) : [];
  const preset = presetById(presetId);
  if (!preset || preset.group !== group) return [];
  const track = current?.animation.tracks[0];
  const relative = track && "trigger" in track.target ? track : undefined;
  // La vitesse choisie suit le changement de préréglage (même facteur de durée).
  const factor = current && current.preset.duration ? animationLength(current.animation) / current.preset.duration : 1;
  return planApplyPreset(site, node, preset, { replaceTriggerId: current?.trigger.id, triggerId: current?.trigger.id, target: relative?.target, stagger: relative?.stagger, duration: Math.abs(factor - 1) > 0.01 ? Math.round(preset.duration * factor) : undefined, trigger: current?.trigger.delay ? { delay: current.trigger.delay } : undefined });
}
/** Détail d'un choix rapide : d'un bloc, lettre par lettre (30 ms), ou enfant par enfant (100 ms). La ligne de temps n'est pas touchée. */
export function planQuickDetail(site: Site, node: Node, group: QuickGroup, detail: QuickDetail): Op[] {
  const current = quickAnimation(site, node, group);
  const track = current?.animation.tracks[0];
  if (!current || !track) return [];
  const target = withTargetKind(track.target, detail === "one" ? "element" : detail);
  return planUpdateTrack(site, current.animation.id, track.id, { target, stagger: detail === "letters" ? { each: 30 } : detail === "children" ? { each: 100 } : undefined });
}

// ---------------------------------------------------------------- animations (dans le site)

export function planAddAnimation(site: Site, animation: Animation): Op[] {
  return [{ op: "site.set", path: "animations", value: [...site.animations, animation] }];
}
export function planUpdateAnimation(site: Site, id: Id, patch: Partial<Animation>): Op[] {
  return [{ op: "site.set", path: "animations", value: site.animations.map((a) => (a.id === id ? { ...a, ...patch } : a)) }];
}
/** Retire une animation et tous les déclencheurs qui la lançaient (éléments des pages et des composants, pages). */
export function planRemoveAnimation(site: Site, id: Id): Op[] {
  const ops: Op[] = [];
  for (const u of animationUsages(site, id)) {
    if (u.node) ops.push(...planRemoveTrigger(u.node, u.trigger.id));
    else if (u.page) { const i = site.pages.indexOf(u.page); const list = (u.page.triggers ?? []).filter((t) => t.id !== u.trigger.id); ops.push({ op: "site.set", path: `pages.${i}.triggers`, value: list.length ? list : undefined }); }
  }
  ops.push({ op: "site.set", path: "animations", value: site.animations.filter((a) => a.id !== id) });
  return ops;
}
/** Où une animation est lancée : déclencheurs des éléments (pages, composants) et des pages. */
export function animationUsages(site: Site, id: Id): { node?: Node; page?: Page; trigger: Trigger; owner: string }[] {
  const out: { node?: Node; page?: Page; trigger: Trigger; owner: string }[] = [];
  const visit = (n: Node, owner: string) => { for (const t of n.triggers ?? []) if (t.animation === id) out.push({ node: n, trigger: t, owner }); n.children?.forEach((c) => visit(c, owner)); };
  site.pages.forEach((p) => { for (const t of p.triggers ?? []) if (t.animation === id) out.push({ page: p, trigger: t, owner: p.id }); visit(p.root, p.id); });
  site.components.forEach((c) => visit(c.root, c.id));
  return out;
}

// ---------------------------------------------------------------- pistes et images-clés

/** Longueur effective d'une animation : sa durée, ou la fin de sa piste la plus longue si elle dépasse. */
export const animationLength = (a: Animation): number => Math.max(a.duration, ...a.tracks.map((t) => trackSpan(t).end));
/** Portée d'une piste : de sa première à sa dernière image-clé. */
export function trackSpan(track: Track): { start: number; end: number } {
  const ats = track.keyframes.map((k) => k.at);
  return ats.length ? { start: Math.min(...ats), end: Math.max(...ats) } : { start: 0, end: 0 };
}
export const keyframeAt = (track: Track, at: number): Keyframe | undefined => track.keyframes.find((k) => k.at === at);
const withTrack = (site: Site, animationId: Id, trackId: Id, fn: (t: Track) => Track): Op[] => planTracks(site, animationId, (tracks) => tracks.map((t) => (t.id === trackId ? fn(t) : t)));
/** Pose une image-clé à `at` (créée si absente, fusionnée sinon) ; la durée de l'animation s'allonge si besoin. */
export function planSetKeyframe(site: Site, animationId: Id, trackId: Id, at: number, style: StyleProps, easing?: string): Op[] {
  return withTrack(site, animationId, trackId, (t) => {
    const cur = keyframeAt(t, at);
    const e = easing ?? cur?.easing;
    const next: Keyframe = { at, style: { ...(cur?.style ?? {}), ...style }, ...(e ? { easing: e } : {}) };
    return { ...t, keyframes: [...t.keyframes.filter((k) => k.at !== at), next].sort((a, b) => a.at - b.at) };
  });
}
export function planRemoveKeyframe(site: Site, animationId: Id, trackId: Id, at: number): Op[] {
  return withTrack(site, animationId, trackId, (t) => ({ ...t, keyframes: t.keyframes.filter((k) => k.at !== at) }));
}
export function planMoveKeyframe(site: Site, animationId: Id, trackId: Id, from: number, to: number): Op[] {
  return withTrack(site, animationId, trackId, (t) => ({ ...t, keyframes: t.keyframes.filter((k) => k.at !== to).map((k) => (k.at === from ? { ...k, at: to } : k)).sort((a, b) => a.at - b.at) }));
}
export function planAddTrack(site: Site, animationId: Id, track: Track): Op[] {
  return planTracks(site, animationId, (tracks) => [...tracks, track], { fixed: new Set([track.id]) });
}
/** Retire une piste ; celles qui la suivaient prennent son départ (son `start`, ou son temps de départ), en gardant leur écart. */
export function planRemoveTrack(site: Site, animationId: Id, trackId: Id): Op[] {
  const a = animationById(site, animationId);
  const gone = a?.tracks.find((t) => t.id === trackId);
  if (!a || !gone) return [];
  const goneStart = trackSpan(gone).start;
  const fixed = new Set<Id>();
  const tracks = a.tracks.filter((t) => t.id !== trackId).map((t) => {
    if (!t.start || startRef(t.start) !== trackId) return t;
    fixed.add(t.id);
    const gap = t.start.gap ?? 0;
    if (gone.start) return { ...t, start: startOf(gone.start, startRef(gone.start), gap) };
    const { start: _s, ...rest } = t; void _s;
    return shiftTrackTo(rest, goneStart + gap);
  });
  return planTracks(site, animationId, () => tracks, { fixed });
}

// ---------------------------------------------------------------- édition (mode Animation, cadrage § 4.1)

/**
 * Style d'un élément à l'instant `at` d'une piste, pour les panneaux Design en mode image-clé : l'état de repos (source `rest`),
 * recouvert, propriété par propriété, par l'image-clé posée à `at` (`exact`), sinon par la dernière image-clé d'avant qui la règle ;
 * avant la portée de la piste, par la première image-clé (remplissage `both`). Les valeurs entre deux images-clés ne sont pas
 * interpolées : l'aperçu montre l'état exact, le panneau dit d'où vient la valeur.
 */
export function keyframeStyleAt(site: Site, node: Node, bp: string, track: Track, at: number): ResolvedStyle {
  const out: ResolvedStyle = {};
  for (const [p, r] of Object.entries(resolveNodeStyle(site, node, bp))) out[p] = { value: r.value, source: { kind: "rest", of: r.source } };
  const kfs = [...track.keyframes].sort((a, b) => a.at - b.at);
  const first = kfs[0];
  const props = new Set(kfs.flatMap((k) => Object.keys(k.style)));
  for (const p of props) {
    const exact = kfs.find((k) => k.at === at && k.style[p] !== undefined);
    const held = exact ?? [...kfs].reverse().find((k) => k.at <= at && k.style[p] !== undefined) ?? (first && at < first.at && first.style[p] !== undefined ? first : undefined);
    if (held) out[p] = { value: held.style[p]!, source: { kind: "keyframe", at: held.at, exact: held.at === at } };
  }
  return out;
}
/** Retire une propriété de l'image-clé à `at` (l'image-clé reste, vide elle vaut l'état de repos). */
export function planUnsetKeyframeProp(site: Site, animationId: Id, trackId: Id, at: number, prop: string): Op[] {
  const t = animationById(site, animationId)?.tracks.find((x) => x.id === trackId);
  const k = t ? keyframeAt(t, at) : undefined;
  if (!k || k.style[prop] === undefined) return [];
  return withTrack(site, animationId, trackId, (tr) => ({ ...tr, keyframes: tr.keyframes.map((x) => { if (x.at !== at) return x; const style = { ...x.style }; delete style[prop]; return { ...x, style }; }) }));
}
/** Courbe pour atteindre l'image-clé à `at` depuis la précédente ; `undefined` revient à la courbe par défaut (`ease`). */
export function planSetKeyframeEasing(site: Site, animationId: Id, trackId: Id, at: number, easing: string | undefined): Op[] {
  return withTrack(site, animationId, trackId, (tr) => ({ ...tr, keyframes: tr.keyframes.map((x) => { if (x.at !== at) return x; const { easing: _old, ...rest2 } = x; void _old; return easing ? { ...rest2, easing } : rest2; }) }));
}
/** Retire un groupe d'images-clés, sur une ou plusieurs pistes, en une seule opération. */
export function planRemoveKeyframes(site: Site, animationId: Id, keys: { track: Id; at: number }[]): Op[] {
  const a = animationById(site, animationId);
  if (!a || !keys.length) return [];
  return planTracks(site, animationId, (tracks) => tracks.map((t) => { const gone = new Set(keys.filter((k) => k.track === t.id).map((k) => k.at)); return gone.size ? { ...t, keyframes: t.keyframes.filter((k) => !gone.has(k.at)) } : t; }));
}
/** Décalage réellement applicable à un groupe d'images-clés : aucune ne passe avant 0. */
export const shiftDelta = (keys: { at: number }[], delta: number): number => (keys.length ? Math.max(delta, -Math.min(...keys.map((k) => k.at))) : 0);
/**
 * Déplace (ou duplique, `duplicate`) un groupe d'images-clés de `delta` ms, borné pour qu'aucune ne passe avant 0.
 * Une image-clé déplacée remplace celle qui occupait déjà sa place d'arrivée ; la durée s'allonge si besoin.
 */
export function planShiftKeyframes(site: Site, animationId: Id, keys: { track: Id; at: number }[], delta: number, o: { duplicate?: boolean } = {}): Op[] {
  const a = animationById(site, animationId);
  const d = shiftDelta(keys, delta);
  if (!a || !keys.length || d === 0) return [];
  const tracks = a.tracks.map((t) => {
    const moving = new Set(keys.filter((k) => k.track === t.id).map((k) => k.at));
    if (!moving.size) return t;
    const moved = t.keyframes.filter((k) => moving.has(k.at)).map((k) => ({ ...structuredClone(k), at: k.at + d }));
    const arrivals = new Set(moved.map((k) => k.at));
    const kept = t.keyframes.filter((k) => (o.duplicate || !moving.has(k.at)) && !arrivals.has(k.at));
    return { ...t, keyframes: [...kept, ...moved].sort((x, y) => x.at - y.at) };
  });
  return planTracks(site, animationId, () => tracks);
}
/**
 * Vitesse d'une animation (audit n°5 · R1) : changer sa durée met toutes ses pistes à l'échelle, images-clés et décalages compris,
 * à partir de sa longueur réelle ; le délai du déclencheur ne bouge pas. Sans piste, la durée est seulement la longueur de la ligne de temps.
 */
export function planScaleAnimation(site: Site, animationId: Id, duration: number): Op[] {
  const a = animationById(site, animationId);
  if (!a || !(duration > 0)) return [];
  const length = animationLength(a);
  const target = Math.round(duration);
  if (!a.tracks.length || !length) return planUpdateAnimation(site, animationId, { duration: target });
  const f = target / length;
  const tracks = a.tracks.map((t) => {
    const byAt = new Map<number, Keyframe>();
    for (const k of [...t.keyframes].sort((x, y) => x.at - y.at)) byAt.set(Math.round(k.at * f), { ...k, at: Math.round(k.at * f) });
    return { ...t, keyframes: [...byAt.values()], ...(t.stagger ? { stagger: { ...t.stagger, each: Math.round(t.stagger.each * f) } } : {}) };
  });
  // Les écarts des pistes enchaînées suivent l'échelle (ils sont recalculés d'après les nouveaux temps).
  return planTracks(site, animationId, () => tracks, { patch: { duration: target } });
}
/** Remplit une piste avec les images-clés d'un préréglage, posées à partir du départ de la piste (sa cible et son décalage restent). */
export function planFillTrackFromPreset(site: Site, animationId: Id, trackId: Id, preset: AnimationPreset): Op[] {
  const track = animationById(site, animationId)?.tracks.find((t) => t.id === trackId);
  if (!track) return [];
  const start = trackSpan(track).start;
  return withTrack(site, animationId, trackId, (t) => ({ ...t, keyframes: preset.keyframes.map((k) => ({ ...k, at: start + k.at, style: structuredClone(k.style) })) }));
}
/** Reprend une piste pour un autre élément (lot 7) : mêmes images-clés, décalage et courbes ; la copie vise l'élément et part après la piste d'origine (ou selon `start`). */
export function planDuplicateTrack(site: Site, animationId: Id, trackId: Id, nodeId: Id, o: { trackId?: Id; start?: TrackStart } = {}): Op[] {
  const a = animationById(site, animationId);
  const src = a?.tracks.find((t) => t.id === trackId);
  if (!a || !src) return [];
  const hostId = animationHost(site, animationId) ?? "";
  const kind = "selector" in src.target ? "element" : src.target.split ?? (src.target.children ? "children" : "element");
  const copy: Track = { id: o.trackId ?? newId(), target: withTargetKind(trackTargetFor(hostId, nodeId), kind), ...(src.stagger ? { stagger: src.stagger } : {}), keyframes: [...src.keyframes].sort((x, y) => x.at - y.at).map((k) => ({ ...k, style: structuredClone(k.style) })), start: o.start ?? { after: trackId } };
  return planTracks(site, animationId, (tracks) => [...tracks, copy]);
}
/** Règle une piste (cible, décalage) ; une clé à `undefined` est retirée. */
export function planUpdateTrack(site: Site, animationId: Id, trackId: Id, patch: Partial<Pick<Track, "target" | "stagger">>): Op[] {
  return withTrack(site, animationId, trackId, (t) => {
    const next = { ...t, ...patch } as Track & Record<string, unknown>;
    for (const [k, v] of Object.entries(patch)) if (v === undefined) delete next[k];
    return next;
  });
}
/** Cible d'une nouvelle piste depuis l'hôte du déclencheur : relative pour l'hôte lui-même (animation réutilisable), sinon l'élément. */
export const trackTargetFor = (hostId: Id, nodeId: Id): TrackTarget => (hostId === nodeId ? { trigger: true } : { node: nodeId });
/** Même élément visé, autre forme : lui-même, ses enfants, ses mots ou ses lettres. Un sélecteur reste tel quel. */
export function withTargetKind(target: TrackTarget, kind: "element" | "children" | "words" | "letters"): TrackTarget {
  if ("selector" in target) return target;
  const base: TrackTarget = "trigger" in target ? { trigger: true } : { node: target.node };
  if (kind === "children") return { ...base, children: true };
  if (kind === "words" || kind === "letters") return { ...base, split: kind };
  return base;
}

// ---------------------------------------------------------------- enchaînement des pistes (start)

/** L'identifiant de la piste à laquelle se rattache un départ. */
export const startRef = (s: TrackStart): Id => ("after" in s ? s.after : s.with);
/** Un départ du même genre (`after` ou `with`) vers `ref`, avec l'écart `gap` (arrondi, jamais négatif, omis s'il est nul). */
export function startOf(kind: TrackStart | "after" | "with", ref: Id, gap = 0): TrackStart {
  const g = Math.max(0, Math.round(gap));
  const after = kind === "after" || (typeof kind === "object" && "after" in kind);
  return after ? { after: ref, ...(g ? { gap: g } : {}) } : { with: ref, ...(g ? { gap: g } : {}) };
}
/** La piste déplacée pour que sa première image-clé soit à `at`. */
export function shiftTrackTo<T extends Pick<Track, "keyframes">>(t: T, at: number): T {
  const d = Math.round(at) - (t.keyframes.length ? Math.min(...t.keyframes.map((k) => k.at)) : 0);
  return d ? { ...t, keyframes: t.keyframes.map((k) => ({ ...k, at: Math.max(0, k.at + d) })) } : t;
}

const plainText = (node: Node, locale: string): string => {
  const content = (node.props.content as Record<string, unknown[]> | undefined)?.[locale] ?? [];
  const rec = (list: unknown[]): string => list.map((x) => { const seg = x as { t: string; v?: string; children?: unknown[] }; return seg.t === "text" ? seg.v ?? "" : seg.t === "link" ? rec(seg.children ?? []) : " "; }).join("");
  return rec(content);
};

/**
 * Fin d'une piste : sa dernière image-clé, plus le décalage du dernier enfant, mot ou lettre quand elle en vise plusieurs.
 * Pour une vue sans limite, le nombre de cartes n'est pas connu du modèle : une seule est comptée.
 */
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
  else { const words = plainText(n, site.settings.defaultLocale).split(/\s+/).filter(Boolean); count = r.split === "letters" ? words.reduce((sum, w) => sum + [...w].length, 0) : words.length; }
  const maxRank = track.stagger?.from === "center" ? (count - 1) / 2 : count - 1;
  return end + each * Math.max(0, maxRank);
}

/** L'élément qui lance une animation (le premier déclencheur, ou la racine de sa page) : pour résoudre ses cibles relatives. */
export const animationHost = (site: Site, animationId: Id): Id | undefined => { const u = animationUsages(site, animationId)[0]; return u?.node?.id ?? u?.page?.root.id; };

/**
 * Replace les pistes enchaînées d'une animation (`start`) : première image-clé = fin (`after`) ou départ (`with`) de la piste référencée,
 * plus l'écart. Une piste sans `start`, rattachée à une piste absente ou prise dans un cycle garde ses temps.
 */
export function layoutTracks(site: Site, animation: Pick<Animation, "id" | "tracks">, hostId: Id = animationHost(site, animation.id) ?? "", index: Map<Id, NodeLocation> = indexSite(site)): Track[] {
  const byId = new Map(animation.tracks.map((t) => [t.id, t]));
  const refOf = (t: Track) => (t.start ? byId.get(startRef(t.start)) : undefined);
  const inCycle = (t: Track) => { let cur = refOf(t); for (let i = 0; cur && i <= animation.tracks.length; i++) { if (cur === t) return true; cur = refOf(cur); } return false; };
  const placed = new Map<Id, Track>();
  const place = (t: Track): Track => {
    const done = placed.get(t.id);
    if (done) return done;
    const ref = refOf(t);
    if (!ref || !t.start || !t.keyframes.length || inCycle(t)) { placed.set(t.id, t); return t; }
    const r = place(ref);
    const base = "after" in t.start ? trackEnd(site, r, hostId, index) : trackSpan(r).start;
    const next = shiftTrackTo(t, Math.max(0, base + (t.start.gap ?? 0)));
    placed.set(t.id, next);
    return next;
  };
  return animation.tracks.map(place);
}

/**
 * Remplace les pistes d'une animation par `fn`, puis replace les pistes enchaînées. Une piste enchaînée que `fn` a modifiée garde le départ
 * qu'on lui a donné : son écart change d'autant (jamais sous 0), sauf pour les pistes de `fixed`, dont l'écart est déjà le bon. La durée
 * s'allonge si besoin (`patch.duration` fixe la durée voulue).
 */
export function planTracks(site: Site, animationId: Id, fn: (tracks: Track[]) => Track[], o: { fixed?: Set<Id>; patch?: Partial<Animation> } = {}): Op[] {
  const a = animationById(site, animationId);
  if (!a) return [];
  const index = indexSite(site);
  const hostId = animationHost(site, animationId) ?? "";
  const original = new Map(a.tracks.map((t) => [t.id, t]));
  const edited = fn(a.tracks);
  const byId = new Map(edited.map((t) => [t.id, t]));
  const rebased = edited.map((t) => {
    if (!t.start || original.get(t.id) === t || o.fixed?.has(t.id) || !t.keyframes.length) return t;
    const ref = byId.get(startRef(t.start));
    if (!ref) return t;
    const expected = ("after" in t.start ? trackEnd(site, ref, hostId, index) : trackSpan(ref).start) + (t.start.gap ?? 0);
    const d = trackSpan(t).start - expected;
    return d ? { ...t, start: startOf(t.start, startRef(t.start), (t.start.gap ?? 0) + d) } : t;
  });
  const tracks = layoutTracks(site, { id: a.id, tracks: rebased }, hostId, index);
  const end = Math.max(0, ...tracks.map((t) => trackSpan(t).end));
  return planUpdateAnimation(site, animationId, { ...o.patch, tracks, duration: Math.max(o.patch?.duration ?? a.duration, end) });
}

// ---------------------------------------------------------------- cibles et décalage

/** Cible d'une piste ramenée à un élément concret, par rapport à l'élément qui porte le déclencheur. */
export function resolveTrackTarget(target: TrackTarget, triggerNode: Id): { node: Id; children?: true; split?: SplitMode } | { selector: string } {
  if ("selector" in target) return { selector: target.selector };
  const base = "trigger" in target ? triggerNode : target.node;
  return { node: base, ...(target.children ? { children: true as const } : {}), ...(target.split ? { split: target.split } : {}) };
}
export type TrackTargetKind = "element" | "children" | "pieces" | "selector";
export function trackTargetKind(target: TrackTarget): TrackTargetKind {
  if ("selector" in target) return "selector";
  if (target.split) return "pieces";
  if (target.children) return "children";
  return "element";
}
export const STAGGER_FROM_LABELS: Record<NonNullable<Stagger["from"]>, string> = { start: "Depuis le début", end: "Depuis la fin", center: "Depuis le centre" };
export const SPLIT_LABELS: Record<SplitMode, string> = { words: "Par mots", letters: "Par lettres" };
/** Rang d'un élément parmi `n` pour le décalage : son ordre depuis le début, depuis la fin, ou sa distance au centre. */
export function staggerRank(i: number, n: number, from: Stagger["from"]): number {
  if (from === "end") return n - 1 - i;
  if (from === "center") return Math.abs(i - (n - 1) / 2);
  return i;
}
/** Délai effectif (ms) du i-ième élément parmi n : le délai de base plus le rang × `each`. */
export function staggerDelay(stagger: Stagger | undefined, delay: number, i: number, n: number): number {
  return delay + (stagger ? staggerRank(i, n, stagger.from) * stagger.each : 0);
}

// ---------------------------------------------------------------- ressorts

/** Lit `spring(raideur, amortissement)` ; `null` pour toute autre courbe. */
export function parseSpring(easing: string | undefined): { stiffness: number; damping: number } | null {
  const m = easing?.match(/^spring\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  return m ? { stiffness: Number(m[1]), damping: Number(m[2]) } : null;
}
export const springEasing = (stiffness: number, damping: number): string => `spring(${stiffness}, ${damping})`;
/** Position (0 → 1) d'un ressort de masse 1 lâché à 0 sans vitesse, à l'instant `t` (secondes). */
export function springAt(stiffness: number, damping: number, t: number): number {
  const w0 = Math.sqrt(stiffness);
  if (!(w0 > 0)) return 1;
  const z = damping / (2 * w0);
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
  if (z === 1) return 1 - (1 + w0 * t) * Math.exp(-w0 * t);
  const s1 = -w0 * (z - Math.sqrt(z * z - 1)), s2 = -w0 * (z + Math.sqrt(z * z - 1));
  const A = s2 / (s1 - s2), B = -1 - A;
  return 1 + A * Math.exp(s1 * t) + B * Math.exp(s2 * t);
}
/** Temps de stabilisation (ms) : après lui, le ressort reste à moins de 0,1 % de sa cible. Borné entre 100 ms et 10 s. */
export function springDuration(stiffness: number, damping: number): number {
  if (!(stiffness > 0)) return 300;
  let last = 0;
  for (let t = 0; t <= 10; t += 0.004) if (Math.abs(springAt(stiffness, damping, t) - 1) > 0.001) last = t;
  return Math.min(10000, Math.max(100, Math.ceil((last * 1000) / 10) * 10));
}
/** `n` positions du ressort réparties sur `duration` ms, de 0 à exactement 1. */
export function springSamples(stiffness: number, damping: number, duration: number, n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(i === 0 ? 0 : i === n - 1 ? 1 : Math.round(springAt(stiffness, damping, (duration / 1000) * (i / (n - 1))) * 10000) / 10000);
  return out;
}
/** Courbe CSS d'un segment : un ressort devient `linear(…)` échantillonné sur sa durée ; le reste passe tel quel (`ease` par défaut). */
export function easingCss(easing: string | undefined, duration: number): string {
  const sp = parseSpring(easing);
  if (!sp) return easing ?? "ease";
  const n = Math.min(120, Math.max(24, Math.round(duration / 12)));
  return `linear(${springSamples(sp.stiffness, sp.damping, duration, n).join(",")})`;
}

const fmtMs = (ms: number) => `${ms.toLocaleString("fr-FR").replace(/[\u202f\u00a0 ]/g, "\u202f")} ms`;
/** « Arrivée du héros · 2 pistes · 1 200 ms · en boucle » */
export function describeAnimation(a: Animation): string {
  const n = a.tracks.length;
  const loopTxt = a.loop === "infinite" ? " · en boucle" : a.loop && a.loop > 1 ? ` · ×${a.loop}` : "";
  return `${a.name} · ${n} piste${n > 1 ? "s" : ""} · ${fmtMs(animationLength(a))}${loopTxt}`;
}
/** « À l'entrée dans l'écran · Arrivée du héros · +100 ms » */
export function describeTrigger(t: Trigger, site: Pick<Site, "animations">): string {
  const a = animationById(site, t.animation);
  const extra = [t.delay ? `+${t.delay} ms` : "", t.on === "hover" && t.reverseOnLeave ? "revient au départ de la souris" : "", t.on === "click" && t.toggle ? "bascule à chaque clic" : "", t.on === "inView" && t.once === false ? "à chaque passage" : ""].filter(Boolean);
  return [TRIGGER_LABELS[t.on], a?.name ?? "animation manquante", ...extra].join(" · ");
}
