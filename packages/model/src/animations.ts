import type { Animation, Id, Keyframe, Node, Op, Page, Site, Stagger, SplitMode, StyleProps, Track, TrackTarget, Trigger, TriggerOn } from "./types";
import { newId } from "./ids";

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
const appear = (id: string, label: string, from: StyleProps): AnimationPreset => ({ id, label, group: "Apparition", on: "inView", duration: 700, keyframes: [{ at: 0, style: from }, { at: 700, style: rest, easing: SOFT }] });
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
const withTrack = (site: Site, animationId: Id, trackId: Id, fn: (t: Track) => Track): Op[] => {
  const a = animationById(site, animationId);
  if (!a) return [];
  const tracks = a.tracks.map((t) => (t.id === trackId ? fn(t) : t));
  const end = Math.max(0, ...tracks.map((t) => trackSpan(t).end));
  return planUpdateAnimation(site, animationId, { tracks, duration: Math.max(a.duration, end) });
};
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
  const a = animationById(site, animationId);
  if (!a) return [];
  return planUpdateAnimation(site, animationId, { tracks: [...a.tracks, track], duration: Math.max(a.duration, trackSpan(track).end) });
}
export function planRemoveTrack(site: Site, animationId: Id, trackId: Id): Op[] {
  const a = animationById(site, animationId);
  if (!a) return [];
  return planUpdateAnimation(site, animationId, { tracks: a.tracks.filter((t) => t.id !== trackId) });
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
/** Courbe CSS d'un run : un ressort devient `linear(…)` échantillonné sur sa durée ; le reste passe tel quel (`ease` par défaut). */
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
