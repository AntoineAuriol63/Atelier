import type { Id, Interaction, Node, Op, StyleProps, Target } from "./types";
import { newId } from "./ids";

/** Effets d'apparition prêts à l'emploi (D31) : état de départ posé sur le nœud, arrivée jouée quand il entre dans l'écran. */
export type RevealKind = "fade" | "fade-up" | "fade-down" | "slide-left" | "slide-right" | "zoom" | "blur";
export const REVEAL_LABEL: Record<RevealKind, string> = { fade: "Fondu", "fade-up": "Fondu en montant", "fade-down": "Fondu en descendant", "slide-left": "Glissé depuis la droite", "slide-right": "Glissé depuis la gauche", zoom: "Zoom", blur: "Netteté" };
export const REVEAL_FROM: Record<RevealKind, StyleProps> = {
  fade: { opacity: "0" },
  "fade-up": { opacity: "0", transform: "translateY(28px)" },
  "fade-down": { opacity: "0", transform: "translateY(-28px)" },
  "slide-left": { opacity: "0", transform: "translateX(40px)" },
  "slide-right": { opacity: "0", transform: "translateX(-40px)" },
  zoom: { opacity: "0", transform: "scale(0.92)" },
  blur: { opacity: "0", filter: "blur(12px)" },
};
const REVEAL_TO: StyleProps = { opacity: "1", transform: "none", filter: "none" };
export const EASINGS: { value: string; label: string }[] = [
  { value: "cubic-bezier(.22,1,.36,1)", label: "Doux (sortie)" }, { value: "ease-out", label: "Sortie" }, { value: "ease-in-out", label: "Entrée-sortie" }, { value: "linear", label: "Linéaire" }, { value: "cubic-bezier(.34,1.56,.64,1)", label: "Rebond" },
];

export type RevealOptions = { kind: RevealKind; duration?: number; delay?: number; easing?: string; repeat?: boolean };

/** Une apparition : interaction `inView` dont on reconnaît la sorte par `trigger.options.reveal`. */
export function revealInteraction(o: RevealOptions, id: Id = newId()): Interaction {
  return { id, trigger: { kind: "inView", options: { reveal: o.kind, once: !o.repeat } }, actions: [{ kind: "setStyle", target: { self: true }, style: REVEAL_TO, transition: { duration: o.duration ?? 700, delay: o.delay ?? 0, easing: o.easing ?? "cubic-bezier(.22,1,.36,1)" } }] };
}
export function revealOf(node: Node): { interaction: Interaction; options: RevealOptions } | undefined {
  const ix = (node.interactions ?? []).find((i) => i.trigger.kind === "inView" && typeof i.trigger.options?.reveal === "string");
  if (!ix) return undefined;
  const a = ix.actions.find((x) => x.kind === "setStyle");
  const tr = a && "transition" in a ? a.transition : undefined;
  return { interaction: ix, options: { kind: ix.trigger.options!.reveal as RevealKind, duration: tr?.duration, delay: tr?.delay, easing: tr?.easing, repeat: ix.trigger.options?.once === false } };
}

/** Pose (ou remplace) l'apparition d'un nœud : état de départ dans le style de base, interaction `inView`. */
export function planReveal(node: Node, o: RevealOptions): Op[] {
  const current = revealOf(node);
  const base = { ...(node.style?.base ?? {}) };
  // Retire l'état de départ précédent avant de poser le nouveau.
  if (current) for (const k of Object.keys(REVEAL_FROM[current.options.kind])) delete base[k];
  Object.assign(base, REVEAL_FROM[o.kind]);
  const others = (node.interactions ?? []).filter((i) => i.id !== current?.interaction.id);
  return [
    { op: "node.set", id: node.id, path: "style.base", value: base },
    { op: "node.set", id: node.id, path: "interactions", value: [...others, revealInteraction(o, current?.interaction.id)] },
  ];
}
export function planRemoveReveal(node: Node): Op[] {
  const current = revealOf(node);
  if (!current) return [];
  const base = { ...(node.style?.base ?? {}) };
  for (const k of Object.keys(REVEAL_FROM[current.options.kind])) delete base[k];
  const rest = (node.interactions ?? []).filter((i) => i.id !== current.interaction.id);
  return [
    { op: "node.set", id: node.id, path: "style.base", value: Object.keys(base).length ? base : undefined },
    { op: "node.set", id: node.id, path: "interactions", value: rest.length ? rest : undefined },
  ];
}

/** Autres interactions simples : au clic ou au survol, afficher/masquer une cible, changer sa variante, aller quelque part. */
export function toggleInteraction(trigger: "click" | "hover", target: Target, mode: "toggle" | "show" | "hide" = "toggle", id: Id = newId()): Interaction {
  return { id, trigger: { kind: trigger }, actions: [{ kind: mode, target, transition: { duration: 250, easing: "ease-out" } }] };
}
export function variantInteraction(trigger: "click" | "hover", target: Target, variant: Record<string, string>, id: Id = newId()): Interaction {
  return { id, trigger: { kind: trigger }, actions: [{ kind: "setVariant", target, variant, transition: { duration: 300, easing: "ease-out" } }] };
}

/** Élément masqué au chargement (à révéler par une interaction « afficher ») : interaction `load` → `hide` sur lui-même. */
export function hiddenAtLoad(node: Node): Interaction | undefined {
  return (node.interactions ?? []).find((i) => i.trigger.kind === "load" && i.actions.some((a) => a.kind === "hide" && "self" in a.target));
}
export function planHiddenAtLoad(node: Node, hidden: boolean): Op[] {
  const cur = hiddenAtLoad(node);
  if (hidden === !!cur) return [];
  const rest = (node.interactions ?? []).filter((i) => i.id !== cur?.id);
  const list = hidden ? [{ id: `ix_hide_${node.id}`, trigger: { kind: "load" as const }, actions: [{ kind: "hide" as const, target: { self: true as const } }] }, ...rest] : rest;
  return [{ op: "node.set", id: node.id, path: "interactions", value: list.length ? list : undefined }];
}

export const TRIGGER_LABEL: Record<Interaction["trigger"]["kind"], string> = { click: "Au clic", hover: "Au survol", inView: "À l'apparition dans l'écran", scroll: "Au défilement", load: "Au chargement", change: "Au changement" };
export function describeInteraction(ix: Interaction, nameOf: (id: Id) => string): string {
  const reveal = ix.trigger.kind === "inView" && typeof ix.trigger.options?.reveal === "string" ? REVEAL_LABEL[ix.trigger.options.reveal as RevealKind] : undefined;
  if (reveal) return `Apparition · ${reveal}`;
  if (ix.trigger.kind === "load" && ix.actions.every((a) => a.kind === "hide" && "self" in a.target)) return "Masqué au chargement";
  const tgt = (t: Target) => ("self" in t ? "cet élément" : "node" in t ? nameOf(t.node) : "component" in t ? nameOf(t.component) : t.selector);
  const acts = ix.actions.map((a) => {
    switch (a.kind) {
      case "toggle": return `afficher ou masquer ${tgt(a.target)}`;
      case "show": return `afficher ${tgt(a.target)}`;
      case "hide": return `masquer ${tgt(a.target)}`;
      case "setVariant": return `${tgt(a.target)} → ${Object.entries(a.variant).map(([k, v]) => `${k} ${v}`).join(", ")}`;
      case "setStyle": return `changer le style de ${tgt(a.target)}`;
      case "navigate": return "aller à une page";
      case "scrollTo": return `défiler jusqu'à ${tgt(a.target)}`;
      default: return a.kind;
    }
  });
  return `${TRIGGER_LABEL[ix.trigger.kind]} : ${acts.join(", ")}`;
}
