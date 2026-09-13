import type { Id, Interaction, Node, Op, StyleProps, Target } from "./types";
import { newId } from "./ids";

/** Apparitions de l'ancien format (D31, interactions `inView` → `reveal`) : ce qu'il faut pour les convertir en animations (migration 1 → 2 → 3). Les apparitions se posent aujourd'hui par les choix rapides (`planQuickAnimation`). */
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
