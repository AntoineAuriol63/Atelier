import type { Id, Inline, Node, Op, Site } from "./types";
import type { NodeLocation } from "./tree";
import { newId } from "./ids";
import { planExitBox, canInsertUnder } from "./move";

/** Ce qu'un geste d'écriture demande à l'éditeur : des opérations, une étiquette d'historique, la sélection et l'édition à reprendre. */
export type TextPlan = { ops: Op[]; label: string; select?: Id | null; edit?: { id: Id; caret: "start" | "end" | "all" } };

const isBlank = (c: Inline[]) => c.every((s) => s.t === "break" || (s.t === "text" && !s.v));
const emptyParagraph = (locale: string, makeId: () => Id): Node => ({ id: makeId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: "" }] } } });

/**
 * Entrée dans un texte, curseur entre `before` et `after` (mode Écriture, règles à la Notion) :
 * dans un lien, on valide seulement ; en début de texte, un bloc vide apparaît au-dessus ; sur un élément de liste vide,
 * on sort de la liste ; sur un paragraphe vide dernier de sa boîte, on sort de la boîte ; sinon le texte se coupe en deux.
 */
export function planSplit(index: Map<Id, NodeLocation>, id: Id, before: Inline[], after: Inline[], locale: string, makeId: () => Id = newId): TextPlan | null {
  const loc = index.get(id);
  if (!loc || !loc.parent || loc.node.type !== "text") return null;
  const contentPath = `props.content.${locale}`;
  if (loc.parent.type === "link") {
    const merged = [...before, ...after];
    const current = (loc.node.props.content as Record<string, Inline[]> | undefined)?.[locale];
    return JSON.stringify(current) === JSON.stringify(merged) ? null : { ops: [{ op: "node.set", id, path: contentPath, value: merged }], label: "Modifier le texte" };
  }
  const tag = typeof loc.node.props.tag === "string" && loc.node.props.tag === "p" ? "p" : loc.parent.type === "listItem" ? String(loc.node.props.tag ?? "span") : "p";
  if (isBlank(before) && !isBlank(after)) {
    const empty = emptyParagraph(locale, makeId);
    if (loc.parent.type === "listItem") {
      const li = index.get(loc.parent.id)!;
      return { ops: [{ op: "node.insert", parent: li.parent!.id, index: li.index, node: { id: makeId(), type: "listItem", props: {}, children: [empty] } }], label: "Nouveau bloc", edit: { id, caret: "start" } };
    }
    return { ops: [{ op: "node.insert", parent: loc.parent.id, index: loc.index, node: empty }], label: "Nouveau bloc", edit: { id, caret: "start" } };
  }
  if (loc.parent.type === "listItem" && isBlank(before) && isBlank(after)) {
    const li = index.get(loc.parent.id)!;
    const list = index.get(li.parent!.id)!;
    if (!list.parent) return null;
    const para = emptyParagraph(locale, makeId);
    const ops: Op[] = [{ op: "node.remove", id: li.node.id }];
    const rest = (list.node.children ?? []).slice(li.index + 1);
    rest.forEach((n) => ops.push({ op: "node.remove", id: n.id }));
    ops.push({ op: "node.insert", parent: list.parent.id, index: list.index + 1, node: para });
    if (rest.length) ops.push({ op: "node.insert", parent: list.parent.id, index: list.index + 2, node: { id: makeId(), type: "list", props: { ...list.node.props }, style: list.node.style, children: rest } });
    if (li.index === 0) ops.push({ op: "node.remove", id: list.node.id });
    return { ops, label: "Sortir de la liste", select: para.id, edit: { id: para.id, caret: "start" } };
  }
  if (isBlank(before) && isBlank(after) && loc.parent.type === "box") {
    const ex = planExitBox(index, id);
    if (ex.ok && canInsertUnder(index, ex.to.parent, loc.node).ok) return { ops: [{ op: "node.move", id, to: ex.to }], label: "Sortir de la boîte", select: id, edit: { id, caret: "start" } };
  }
  const next: Node = { id: makeId(), type: "text", props: { tag, content: { [locale]: after } } };
  const ops: Op[] = [{ op: "node.set", id, path: contentPath, value: before }];
  if (loc.parent.type === "listItem") {
    const li = index.get(loc.parent.id)!;
    ops.push({ op: "node.insert", parent: li.parent!.id, index: li.index + 1, node: { id: makeId(), type: "listItem", props: {}, children: [next] } });
  } else ops.push({ op: "node.insert", parent: loc.parent.id, index: loc.index + 1, node: next });
  return { ops, label: "Nouveau bloc", select: next.id, edit: { id: next.id, caret: "start" } };
}

/** Retour arrière dans un bloc vide : on le retire et on reprend l'édition à la fin du texte précédent. */
export function planMergePrev(index: Map<Id, NodeLocation>, id: Id): TextPlan | null {
  const loc = index.get(id);
  if (!loc || !loc.parent) return null;
  const container = loc.parent.type === "listItem" ? index.get(loc.parent.id)! : loc;
  const siblings = container.parent?.children ?? [];
  const prev = siblings[container.index - 1];
  const lastText = (n: Node | undefined): Node | undefined => { if (!n) return undefined; if (n.type === "text") return n; for (let i = (n.children ?? []).length - 1; i >= 0; i--) { const t = lastText(n.children![i]); if (t) return t; } return undefined; };
  const prevText = lastText(prev);
  return { ops: [{ op: "node.remove", id: container.node.id }], label: "Supprimer le bloc vide", select: prevText ? prevText.id : container.parent?.id ?? null, edit: prevText ? { id: prevText.id, caret: "end" } : undefined };
}

/** Un modèle qui apporte un h1 alors que la page en a déjà un : son titre devient h2 (une page, un seul h1). */
export function fitHeadings(pageRoot: Node, node: Node): Node {
  const hasH1 = (n: Node): boolean => (n.type === "text" && n.props.tag === "h1") || (n.children ?? []).some(hasH1);
  if (!hasH1(pageRoot) || !hasH1(node)) return node;
  const demote = (n: Node): Node => ({ ...n, props: n.type === "text" && n.props.tag === "h1" ? { ...n.props, tag: "h2" } : n.props, children: n.children?.map(demote) });
  return demote(node);
}

/** Menu « / » : insère un bloc après le texte courant, ou à sa place s'il est vide. */
export function planSlashInsert(site: Site, index: Map<Id, NodeLocation>, id: Id, node: Node, label: string, replace: boolean): TextPlan | { error: string } | null {
  const loc = index.get(id);
  if (!loc || !loc.parent) return null;
  const ok = canInsertUnder(index, loc.parent.id, node);
  if (!ok.ok) return { error: ok.reason };
  const ops: Op[] = [];
  if (replace) ops.push({ op: "node.remove", id });
  ops.push({ op: "node.insert", parent: loc.parent.id, index: replace ? loc.index : loc.index + 1, node });
  return { ops, label: `Insérer ${label}`, select: node.id, edit: node.type === "text" ? { id: node.id, caret: "all" } : undefined };
}
