import type { Id, Node, RootOwner } from "./types";
import type { NodeLocation } from "./tree";
import { CONTAINER_TYPES } from "./types";

export type DropPosition = "before" | "after" | "inside";
export type Placement = { parent: Id; index: number };

/** Types qu'on ne déplace jamais seuls : ils n'ont de sens que dans leur parent. */
const PINNED_TYPES = new Set<Node["type"]>(["item", "slot"]);

function sameOwner(a: RootOwner, b: RootOwner): boolean {
  return "page" in a ? "page" in b && a.page === b.page : "component" in b && a.component === b.component;
}

/** Le HTML interdit un lien dans un lien : on refuse de placer un `link` sous un ancêtre `link`. */
function hasLinkAncestor(index: Map<Id, NodeLocation>, parentId: Id): boolean {
  let cur = index.get(parentId);
  while (cur) { if (cur.node.type === "link") return true; cur = cur.parent ? index.get(cur.parent.id) : undefined; }
  return false;
}
function containsLink(node: Node): boolean {
  if (node.type === "link") return true;
  return (node.children ?? []).some(containsLink);
}

function isDescendant(ancestor: Node, id: Id): boolean {
  const stack = [ancestor];
  while (stack.length) {
    const n = stack.pop()!;
    if (n.id === id) return true;
    n.children?.forEach((c) => stack.push(c));
  }
  return false;
}

/**
 * Calcule où déposer `dragId` par rapport à `targetId`, ou explique pourquoi c'est impossible.
 * L'index retourné est celui à utiliser dans `node.move` (après retrait du nœud de sa position d'origine).
 */
export function planMove(index: Map<Id, NodeLocation>, dragId: Id, targetId: Id, position: DropPosition): { ok: true; to: Placement } | { ok: false; reason: string } {
  const drag = index.get(dragId), target = index.get(targetId);
  if (!drag || !target) return { ok: false, reason: "Élément introuvable" };
  if (dragId === targetId) return { ok: false, reason: "Un élément ne se dépose pas sur lui-même" };
  if (!drag.parent) return { ok: false, reason: "La racine de la page ne se déplace pas" };
  if (PINNED_TYPES.has(drag.node.type)) return { ok: false, reason: "Cet élément reste dans son parent" };
  if (!sameOwner(drag.owner, target.owner)) return { ok: false, reason: "Impossible de déplacer entre une page et un composant" };
  if (isDescendant(drag.node, targetId)) return { ok: false, reason: "Impossible de déposer un élément dans lui-même" };
  const linkCheck = (parentId: Id) => (containsLink(drag.node) && hasLinkAncestor(index, parentId) ? { ok: false as const, reason: "Un lien ne peut pas être placé dans un autre lien" } : null);

  if (position === "inside") {
    if (!CONTAINER_TYPES.has(target.node.type)) return { ok: false, reason: `Un ${target.node.type} n'accepte pas d'enfants` };
    if (target.node.type === "collection") return { ok: false, reason: "Une collection ne contient que son élément répété" };
    const lc = linkCheck(targetId); if (lc) return lc;
    const count = (target.node.children ?? []).filter((c) => c.id !== dragId).length;
    return { ok: true, to: { parent: targetId, index: count } };
  }
  if (!target.parent) return { ok: false, reason: "Impossible de déposer à côté de la racine" };
  if (target.parent.type === "collection") return { ok: false, reason: "Une collection ne contient que son élément répété" };
  const lc2 = linkCheck(target.parent.id); if (lc2) return lc2;
  const siblings = target.parent.children ?? [];
  const targetIdx = siblings.findIndex((c) => c.id === targetId);
  let idx = position === "before" ? targetIdx : targetIdx + 1;
  // Si le nœud déplacé est déjà dans ce parent avant la cible, son retrait décale la cible d'un cran.
  if (drag.parent.id === target.parent.id && drag.index < targetIdx) idx -= 1;
  return { ok: true, to: { parent: target.parent.id, index: idx } };
}

/**
 * Où insérer un nouveau bloc par rapport à la sélection : dans le conteneur sélectionné (à la fin),
 * sinon juste après l'élément sélectionné, sinon à la fin de la racine.
 */
export function planInsert(index: Map<Id, NodeLocation>, root: Node, selectedId: Id | null, mode: "auto" | "inside" | "after" | "before" = "auto"): Placement {
  const sel = selectedId ? index.get(selectedId) : undefined;
  if (!sel) return { parent: root.id, index: (root.children ?? []).length };
  const container = CONTAINER_TYPES.has(sel.node.type) && sel.node.type !== "collection";
  if ((mode === "inside" || mode === "auto") && container) return { parent: sel.node.id, index: (sel.node.children ?? []).length };
  if (!sel.parent || sel.parent.type === "collection") return { parent: sel.node.id, index: (sel.node.children ?? []).length };
  return { parent: sel.parent.id, index: mode === "before" ? sel.index : sel.index + 1 };
}

/** Où insérer un NOUVEAU nœud déposé sur `targetId` (glisser depuis la palette). */
export function planDrop(index: Map<Id, NodeLocation>, targetId: Id, position: DropPosition, node?: Node): { ok: true; to: Placement } | { ok: false; reason: string } {
  const target = index.get(targetId);
  if (!target) return { ok: false, reason: "Cible introuvable" };
  const linkCheck = (parentId: Id) => (node && containsLink(node) && hasLinkAncestor(index, parentId) ? { ok: false as const, reason: "Un lien ne peut pas être placé dans un autre lien" } : null);
  if (position === "inside") {
    if (!CONTAINER_TYPES.has(target.node.type)) return { ok: false, reason: `Un ${target.node.type} n'accepte pas d'enfants` };
    if (target.node.type === "collection") return { ok: false, reason: "Une collection ne contient que son élément répété" };
    const lc = linkCheck(targetId); if (lc) return lc;
    return { ok: true, to: { parent: targetId, index: (target.node.children ?? []).length } };
  }
  if (!target.parent) return { ok: true, to: { parent: targetId, index: position === "before" ? 0 : (target.node.children ?? []).length } };
  if (target.parent.type === "collection") return { ok: false, reason: "Une collection ne contient que son élément répété" };
  const lc = linkCheck(target.parent.id); if (lc) return lc;
  return { ok: true, to: { parent: target.parent.id, index: position === "before" ? target.index : target.index + 1 } };
}

/** Un nouveau nœud peut-il être inséré sous ce parent ? (même règle du lien dans un lien) */
export function canInsertUnder(index: Map<Id, NodeLocation>, parentId: Id, node: Node): { ok: true } | { ok: false; reason: string } {
  if (containsLink(node) && hasLinkAncestor(index, parentId)) return { ok: false, reason: "Un lien ne peut pas être placé dans un autre lien" };
  return { ok: true };
}
