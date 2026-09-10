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
/** Un lien ou un bouton n'accueille que du contenu en ligne : texte, image, icône. */
const LINK_CHILDREN = new Set<Node["type"]>(["text", "image", "icon"]);
function linkChildCheck(index: Map<Id, NodeLocation>, parentId: Id, node: Node): { ok: false; reason: string } | null {
  const parent = index.get(parentId)?.node;
  if (parent?.type === "link" && !LINK_CHILDREN.has(node.type)) return { ok: false, reason: "Un bouton ou un lien ne peut contenir que du texte, une image ou une icône" };
  return null;
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
  const linkCheck = (parentId: Id) => (containsLink(drag.node) && hasLinkAncestor(index, parentId) ? { ok: false as const, reason: "Un lien ne peut pas être placé dans un autre lien" } : linkChildCheck(index, parentId, drag.node));

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
export function planInsert(index: Map<Id, NodeLocation>, root: Node, selectedId: Id | null, mode: "auto" | "inside" | "after" | "before" = "auto", node?: Node): Placement {
  const sel = selectedId ? index.get(selectedId) : undefined;
  const isSection = (n: Node | undefined) => !!n && n.type === "box" && n.props.tag === "section";
  const isFooter = (n: Node | undefined) => !!n && n.type === "instance" && /pied de page|footer/i.test(n.name ?? "");
  if (!sel) {
    // Sans sélection : à la fin de la page, mais avant le pied de page.
    const kids = root.children ?? [];
    return { parent: root.id, index: isFooter(kids[kids.length - 1]) ? kids.length - 1 : kids.length };
  }
  const container = CONTAINER_TYPES.has(sel.node.type) && sel.node.type !== "collection";
  // Une section est une bande de la page : elle se pose au niveau de la page, après la région qui contient la sélection.
  if (isSection(node) && sel.parent) {
    let region = sel;
    while (region.parent && region.parent.id !== root.id) region = index.get(region.parent.id)!;
    if (region.parent) return { parent: root.id, index: isFooter(region.node) ? region.index : region.index + 1 };
  }
  // Rien ne se pose dans un lien, ni dans le pied de page : après, à côté.
  const besides = sel.node.type === "link" || isFooter(sel.node);
  if ((mode === "inside" || mode === "auto") && container && !besides) return { parent: sel.node.id, index: (sel.node.children ?? []).length };
  if (!sel.parent || sel.parent.type === "collection") return { parent: sel.node.id, index: (sel.node.children ?? []).length };
  return { parent: sel.parent.id, index: mode === "before" || isFooter(sel.node) ? sel.index : sel.index + 1 };
}

/** Où insérer un NOUVEAU nœud déposé sur `targetId` (glisser depuis la palette). */
export function planDrop(index: Map<Id, NodeLocation>, targetId: Id, position: DropPosition, node?: Node): { ok: true; to: Placement } | { ok: false; reason: string } {
  const target = index.get(targetId);
  if (!target) return { ok: false, reason: "Cible introuvable" };
  const linkCheck = (parentId: Id) => (node && containsLink(node) && hasLinkAncestor(index, parentId) ? { ok: false as const, reason: "Un lien ne peut pas être placé dans un autre lien" } : node ? linkChildCheck(index, parentId, node) : null);
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
  const lc = linkChildCheck(index, parentId, node);
  if (lc) return lc;
  return { ok: true };
}

/** Sortie d'une boîte au clavier (mode Écriture) : un texte vide, dernier enfant de sa boîte, va juste après elle. Les boîtes de premier niveau d'une page (ses régions) ne se quittent pas. */
export function planExitBox(index: Map<Id, NodeLocation>, textId: Id): { ok: true; to: Placement; box: Id } | { ok: false; reason: string } {
  const loc = index.get(textId);
  if (!loc || loc.node.type !== "text") return { ok: false, reason: "Pas un texte" };
  const box = loc.parent;
  if (!box || box.type !== "box") return { ok: false, reason: "Pas dans une boîte" };
  if (loc.index !== (box.children ?? []).length - 1) return { ok: false, reason: "Pas le dernier de la boîte" };
  const boxLoc = index.get(box.id);
  if (!boxLoc?.parent) return { ok: false, reason: "Boîte racine" };
  if (!index.get(boxLoc.parent.id)?.parent) return { ok: false, reason: "Une région de la page ne se quitte pas" };
  return { ok: true, to: { parent: boxLoc.parent.id, index: boxLoc.index + 1 }, box: box.id };
}
