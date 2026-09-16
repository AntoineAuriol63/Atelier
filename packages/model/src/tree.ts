import type { Id, Node, RootOwner, Site } from "./types";
import { CONTAINER_TYPES } from "./types";

export type NodeLocation = {
  node: Node;
  parent: Node | null;
  index: number;
  owner: RootOwner;
  depth: number;
};

/** Parcours en profondeur d'un arbre. Retourner `false` arrête la descente sous ce nœud. */
export function walk(root: Node, visit: (node: Node, parent: Node | null, index: number, depth: number) => void | false): void {
  const rec = (node: Node, parent: Node | null, index: number, depth: number) => {
    if (visit(node, parent, index, depth) === false) return;
    node.children?.forEach((child, i) => rec(child, node, i, depth + 1));
    // Les emplacements d'une instance contiennent aussi des nœuds.
    if (node.type === "instance") {
      const slots = (node.props as { slots?: Record<string, Node[]> }).slots;
      if (slots) for (const list of Object.values(slots)) list.forEach((child, i) => rec(child, node, i, depth + 1));
    }
  };
  rec(root, null, 0, 0);
}

/** Toutes les racines d'un site (pages puis composants). */
export function roots(site: Site): { owner: RootOwner; root: Node }[] {
  return [
    ...site.pages.map((p) => ({ owner: { page: p.id } as RootOwner, root: p.root })),
    ...site.components.map((c) => ({ owner: { component: c.id } as RootOwner, root: c.root })),
  ];
}

/** Index id → emplacement pour tout le site. À recalculer après chaque opération. */
export function indexSite(site: Site): Map<Id, NodeLocation> {
  const map = new Map<Id, NodeLocation>();
  for (const { owner, root } of roots(site)) {
    walk(root, (node, parent, index, depth) => {
      map.set(node.id, { node, parent, index, owner, depth });
    });
  }
  return map;
}

export function findNode(site: Site, id: Id): NodeLocation | undefined {
  return indexSite(site).get(id);
}

export function canHaveChildren(node: Node): boolean {
  return CONTAINER_TYPES.has(node.type);
}

/** Copie profonde d'un nœud avec de nouveaux identifiants (duplication). */
export function cloneWithNewIds(node: Node, makeId: () => Id): { node: Node; mapping: Map<Id, Id> } {
  const mapping = new Map<Id, Id>();
  const rec = (n: Node): Node => {
    const id = makeId();
    mapping.set(n.id, id);
    const copy: Node = { ...structuredClone(n), id };
    // Les déclencheurs de la copie sont les siens (même animation lancée, autre identifiant : deux réglages indépendants).
    if (copy.triggers) copy.triggers = copy.triggers.map((t) => ({ ...t, id: makeId() }));
    if (n.children) copy.children = n.children.map(rec);
    return copy;
  };
  // Les interactions qui visent un nœud du sous-arbre copié suivent la copie (une question dupliquée ouvre sa propre réponse).
  const retarget = (n: Node): void => {
    for (const ix of n.interactions ?? []) for (const a of ix.actions) { if (!("target" in a)) continue; const t = a.target as { node?: Id } | undefined; if (t?.node && mapping.has(t.node)) t.node = mapping.get(t.node)!; }
    n.children?.forEach(retarget);
  };
  const clone = rec(node);
  retarget(clone);
  return { node: clone, mapping };
}

/** Liste plate des identifiants d'un sous-arbre. */
export function collectIds(root: Node): Id[] {
  const ids: Id[] = [];
  walk(root, (n) => { ids.push(n.id); });
  return ids;
}
