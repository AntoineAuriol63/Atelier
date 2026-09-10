import type { AnimationDef, AnimationRun, Id, Keyframe, Node, Op, Site, StyleProps } from "./types";
import { newId } from "./ids";

/** Courbes proposées dans l'interface (la valeur est du CSS). */
export const ANIM_EASINGS: { value: string; label: string }[] = [
  { value: "cubic-bezier(.22,1,.36,1)", label: "Doux (sortie)" }, { value: "ease-out", label: "Sortie" }, { value: "ease-in-out", label: "Entrée-sortie" }, { value: "ease-in", label: "Entrée" },
  { value: "linear", label: "Linéaire" }, { value: "cubic-bezier(.34,1.56,.64,1)", label: "Rebond" }, { value: "steps(4)", label: "Par paliers" },
];
export const TRIGGER_LABELS: Record<AnimationRun["trigger"], string> = { load: "Au chargement", inView: "À l'entrée dans l'écran", hover: "Au survol", click: "Au clic", scroll: "Au défilement" };
export const DIRECTION_LABELS: Record<NonNullable<AnimationRun["direction"]>, string> = { normal: "Normal", reverse: "À l'envers", alternate: "Aller-retour", "alternate-reverse": "Retour-aller" };
export const FILL_LABELS: Record<NonNullable<AnimationRun["fill"]>, string> = { none: "Revient à l'état de repos", forwards: "Reste sur la dernière étape", backwards: "Commence sur la première étape", both: "Première étape avant, dernière après" };

export type AnimationPreset = {
  id: string; label: string; group: "Apparition" | "Continue" | "Attention";
  keyframes: Keyframe[];
  trigger: AnimationRun["trigger"]; duration: number; easing?: string; iterations?: number | "infinite"; direction?: AnimationRun["direction"]; fill?: AnimationRun["fill"];
};
const rest: StyleProps = { opacity: "1", transform: "none", filter: "none" };
const appear = (id: string, label: string, from: StyleProps): AnimationPreset => ({ id, label, group: "Apparition", keyframes: [{ at: 0, style: from }, { at: 100, style: rest }], trigger: "inView", duration: 700, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
/** Animations prêtes à l'emploi : apparitions (jouées à l'entrée dans l'écran), continues (en boucle dès le chargement), attention (au clic ou au survol). */
export const ANIMATION_PRESETS: AnimationPreset[] = [
  appear("fade", "Fondu", { opacity: "0" }),
  appear("fade-up", "Fondu en montant", { opacity: "0", transform: "translateY(28px)" }),
  appear("fade-down", "Fondu en descendant", { opacity: "0", transform: "translateY(-28px)" }),
  appear("slide-left", "Glissé depuis la droite", { opacity: "0", transform: "translateX(40px)" }),
  appear("slide-right", "Glissé depuis la gauche", { opacity: "0", transform: "translateX(-40px)" }),
  appear("zoom", "Zoom", { opacity: "0", transform: "scale(0.92)" }),
  appear("blur", "Netteté", { opacity: "0", filter: "blur(12px)" }),
  { id: "float", label: "Flottement", group: "Continue", keyframes: [{ at: 0, style: { transform: "translateY(0)" } }, { at: 50, style: { transform: "translateY(-10px)" } }, { at: 100, style: { transform: "translateY(0)" } }], trigger: "load", duration: 3000, easing: "ease-in-out", iterations: "infinite" },
  { id: "pulse", label: "Pulsation", group: "Continue", keyframes: [{ at: 0, style: { transform: "scale(1)" } }, { at: 50, style: { transform: "scale(1.05)" } }, { at: 100, style: { transform: "scale(1)" } }], trigger: "load", duration: 1600, easing: "ease-in-out", iterations: "infinite" },
  { id: "spin", label: "Rotation continue", group: "Continue", keyframes: [{ at: 0, style: { transform: "rotate(0deg)" } }, { at: 100, style: { transform: "rotate(360deg)" } }], trigger: "load", duration: 8000, easing: "linear", iterations: "infinite" },
  { id: "blink", label: "Clignotement", group: "Continue", keyframes: [{ at: 0, style: { opacity: "1" } }, { at: 50, style: { opacity: "0.3" } }, { at: 100, style: { opacity: "1" } }], trigger: "load", duration: 1400, easing: "ease-in-out", iterations: "infinite" },
  { id: "sway", label: "Balancement", group: "Continue", keyframes: [{ at: 0, style: { transform: "rotate(-3deg)" } }, { at: 100, style: { transform: "rotate(3deg)" } }], trigger: "load", duration: 2000, easing: "ease-in-out", iterations: "infinite", direction: "alternate" },
  { id: "shake", label: "Secousse", group: "Attention", keyframes: [{ at: 0, style: { transform: "translateX(0)" } }, { at: 25, style: { transform: "translateX(-6px)" } }, { at: 75, style: { transform: "translateX(6px)" } }, { at: 100, style: { transform: "translateX(0)" } }], trigger: "click", duration: 400, easing: "ease-in-out" },
  { id: "bounce", label: "Rebond", group: "Attention", keyframes: [{ at: 0, style: { transform: "translateY(0)" } }, { at: 40, style: { transform: "translateY(-14px)" } }, { at: 70, style: { transform: "translateY(0)" } }, { at: 85, style: { transform: "translateY(-6px)" } }, { at: 100, style: { transform: "translateY(0)" } }], trigger: "click", duration: 600, easing: "ease-out" },
  { id: "grow", label: "Grossissement", group: "Attention", keyframes: [{ at: 0, style: { transform: "scale(1)" } }, { at: 100, style: { transform: "scale(1.06)" } }], trigger: "hover", duration: 250, easing: "ease-out", fill: "forwards" },
  { id: "custom", label: "Personnalisée (deux étapes vides)", group: "Attention", keyframes: [{ at: 0, style: {} }, { at: 100, style: {} }], trigger: "load", duration: 1000, easing: "ease-in-out" },
];
export const presetById = (id: string | undefined): AnimationPreset | undefined => ANIMATION_PRESETS.find((p) => p.id === id);

/** Construit un run à partir d'un préréglage (étapes recopiées en ligne : le nœud ne dépend de rien). */
export function runFromPreset(preset: AnimationPreset, overrides: Partial<AnimationRun> = {}): AnimationRun {
  const { id: _id, label: _l, group: _g, keyframes, ...rest2 } = preset;
  return { id: newId(), animation: { keyframes: structuredClone(keyframes) }, preset: preset.id, ...rest2, ...overrides };
}

/** Les étapes d'un run, qu'elles soient en ligne ou dans la bibliothèque du site. */
export function keyframesOf(run: AnimationRun, site: Pick<Site, "animations">): Keyframe[] {
  if (typeof run.animation === "string") return site.animations?.find((a) => a.id === run.animation)?.keyframes ?? [];
  return run.animation.keyframes;
}

export function planAddAnimation(node: Node, run: AnimationRun): Op[] {
  return [{ op: "node.set", id: node.id, path: "animations", value: [...(node.animations ?? []), run] }];
}
export function planUpdateAnimation(node: Node, id: Id, patch: Partial<AnimationRun>): Op[] {
  const list = (node.animations ?? []).map((r) => (r.id === id ? { ...r, ...patch } : r));
  return [{ op: "node.set", id: node.id, path: "animations", value: list }];
}
export function planRemoveAnimation(node: Node, id: Id): Op[] {
  const list = (node.animations ?? []).filter((r) => r.id !== id);
  return [{ op: "node.set", id: node.id, path: "animations", value: list.length ? list : undefined }];
}
/** Copie les étapes en ligne d'un run dans la bibliothèque du site et fait pointer le run dessus. */
export function planSaveToLibrary(site: Site, node: Node, runId: Id, name: string): Op[] {
  const run = (node.animations ?? []).find((r) => r.id === runId);
  if (!run || typeof run.animation === "string") return [];
  const def: AnimationDef = { id: newId(), name, keyframes: structuredClone(run.animation.keyframes) };
  return [
    { op: "site.set", path: "animations", value: [...(site.animations ?? []), def] },
    ...planUpdateAnimation(node, runId, { animation: def.id }),
  ];
}
/** Détache un run de la bibliothèque : ses étapes redeviennent propres au nœud. */
export function planDetachFromLibrary(site: Site, node: Node, runId: Id): Op[] {
  const run = (node.animations ?? []).find((r) => r.id === runId);
  if (!run || typeof run.animation !== "string") return [];
  return planUpdateAnimation(node, runId, { animation: { keyframes: structuredClone(keyframesOf(run, site)) } });
}
/** Où une animation de la bibliothèque sert (pages et composants). */
export function animationUsages(site: Site, id: Id): { node: Node; owner: string }[] {
  const out: { node: Node; owner: string }[] = [];
  const visit = (n: Node, owner: string) => { if (n.animations?.some((r) => r.animation === id)) out.push({ node: n, owner }); n.children?.forEach((c) => visit(c, owner)); };
  site.pages.forEach((p) => visit(p.root, p.id));
  site.components.forEach((c) => visit(c.root, c.id));
  return out;
}

export function describeAnimation(run: AnimationRun, site: Pick<Site, "animations">): string {
  const preset = presetById(run.preset);
  const name = typeof run.animation === "string" ? (site.animations?.find((a) => a.id === run.animation)?.name ?? "Animation") : preset?.label ?? "Personnalisée";
  const loop = run.iterations === "infinite" ? " · en boucle" : run.iterations && run.iterations > 1 ? ` · ×${run.iterations}` : "";
  return `${name} · ${TRIGGER_LABELS[run.trigger].toLowerCase()}${run.trigger === "scroll" ? "" : ` · ${run.duration} ms`}${loop}`;
}
