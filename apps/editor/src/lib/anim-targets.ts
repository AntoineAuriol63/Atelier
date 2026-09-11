import type { AnimationRun, AnimationTarget, Node, Site } from "@atelier/model";
import { indexSite, walk } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

export type TargetOption = { value: string; label: string };

/**
 * Cibles possibles d'une animation portée par `node` (section 8.4), sous forme de choix pour un sélecteur :
 * l'élément lui-même, ses enfants (s'il en a, ou pour une vue ses cartes), les éléments nommés de la page et ses voisins
 * (`node:<id>`), et un sélecteur CSS libre.
 */
export function animationTargetOptions(site: Site, pageRoot: Node, node: Node): TargetOption[] {
  const index = indexSite(site);
  const out: TargetOption[] = [{ value: "self", label: "Cet élément" }];
  if ((node.children?.length ?? 0) > 0 || node.type === "collection") out.push({ value: "children", label: node.type === "collection" ? "Ses cartes" : "Ses enfants" });
  const siblings = index.get(node.id)?.parent?.children ?? [];
  walk(pageRoot, (n) => {
    if (n.id === node.id) return;
    const sibling = siblings.includes(n);
    if (n.name || sibling) out.push({ value: `node:${n.id}`, label: sibling && !n.name ? `${nodeLabel(n)} (voisin)` : (n.name ?? nodeLabel(n)) });
  });
  out.push({ value: "selector", label: "Un sélecteur CSS…" });
  return out;
}

/** Valeur de sélecteur correspondant à la cible d'un run. */
export function targetValue(run: Pick<AnimationRun, "target">): string {
  const t = run.target;
  if (!t || "self" in t) return "self";
  if ("children" in t) return "children";
  if ("node" in t) return `node:${t.node}`;
  return "selector";
}

/** Cible du modèle pour une valeur de sélecteur (`undefined` : l'élément lui-même, la valeur par défaut). */
export function targetFromValue(value: string, current?: AnimationTarget): AnimationTarget | undefined {
  if (value === "children") return { children: true };
  if (value.startsWith("node:")) return { node: value.slice(5) };
  if (value === "selector") return { selector: current && "selector" in current ? current.selector : "" };
  return undefined;
}
