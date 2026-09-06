import type { Id, Node, Op, RootOwner, Site } from "./types";
import { indexSite, canHaveChildren } from "./tree";
import { getPath, setPath } from "./path";

export class OpError extends Error {
  constructor(message: string, public readonly op: Op) { super(message); }
}

type Located = { owner: RootOwner; parent: Node | null; index: number; node: Node };

/** Remplace un nœud (par id) dans une racine, en copiant seulement le chemin jusqu'à lui. */
function replaceInRoot(root: Node, id: Id, replacer: (n: Node) => Node | null): Node | null {
  if (root.id === id) return replacer(root);
  let changed = false;
  let children = root.children;
  if (children) {
    const next: Node[] = [];
    for (const c of children) {
      const r = replaceInRoot(c, id, replacer);
      if (r !== c) changed = true;
      if (r !== null) next.push(r);
    }
    if (changed) children = next;
  }
  // Emplacements d'instance
  let props = root.props;
  if (root.type === "instance") {
    const slots = (root.props as { slots?: Record<string, Node[]> }).slots;
    if (slots) {
      let slotsChanged = false;
      const nextSlots: Record<string, Node[]> = {};
      for (const [name, list] of Object.entries(slots)) {
        const nextList: Node[] = [];
        let listChanged = false;
        for (const c of list) {
          const r = replaceInRoot(c, id, replacer);
          if (r !== c) listChanged = true;
          if (r !== null) nextList.push(r);
        }
        nextSlots[name] = listChanged ? nextList : list;
        if (listChanged) slotsChanged = true;
      }
      if (slotsChanged) { props = { ...props, slots: nextSlots }; changed = true; }
    }
  }
  return changed ? { ...root, children, props } : root;
}

function withRoot(site: Site, owner: RootOwner, fn: (root: Node) => Node): Site {
  if ("page" in owner) {
    return { ...site, pages: site.pages.map((p) => (p.id === owner.page ? { ...p, root: fn(p.root) } : p)) };
  }
  return { ...site, components: site.components.map((c) => (c.id === owner.component ? { ...c, root: fn(c.root) } : c)) };
}

function locate(site: Site, id: Id, op: Op): Located {
  const loc = indexSite(site).get(id);
  if (!loc) throw new OpError(`Nœud introuvable : ${id}`, op);
  return { owner: loc.owner, parent: loc.parent, index: loc.index, node: loc.node };
}

function insertChild(parent: Node, index: number, node: Node): Node {
  const children = [...(parent.children ?? [])];
  const i = Math.max(0, Math.min(index, children.length));
  children.splice(i, 0, node);
  return { ...parent, children };
}

function removeChild(parent: Node, id: Id): Node {
  return { ...parent, children: (parent.children ?? []).filter((c) => c.id !== id) };
}

/**
 * Applique une opération et retourne le nouveau site (immutabilité par copie sur écriture)
 * ainsi que l'opération complétée de son état précédent (`prev`), prête à être inversée.
 */
export function applyOp(site: Site, op: Op): { site: Site; op: Op } {
  switch (op.op) {
    case "batch": {
      let cur = site;
      const applied: Op[] = [];
      for (const sub of op.ops) {
        const r = applyOp(cur, sub);
        cur = r.site;
        applied.push(r.op);
      }
      return { site: cur, op: { ...op, ops: applied } };
    }

    case "node.insert": {
      const parentLoc = locate(site, op.parent, op);
      if (!canHaveChildren(parentLoc.node)) throw new OpError(`Le nœud ${op.parent} (${parentLoc.node.type}) n'accepte pas d'enfants`, op);
      const idx = indexSite(site);
      if (idx.has(op.node.id)) throw new OpError(`Identifiant déjà présent : ${op.node.id}`, op);
      const next = withRoot(site, parentLoc.owner, (root) => replaceInRoot(root, op.parent, (p) => insertChild(p, op.index, op.node))!);
      return { site: next, op };
    }

    case "node.remove": {
      const loc = locate(site, op.id, op);
      if (!loc.parent) throw new OpError(`Impossible de supprimer une racine : ${op.id}`, op);
      const prev = { parent: loc.parent.id, index: loc.index, node: loc.node };
      const next = withRoot(site, loc.owner, (root) => replaceInRoot(root, loc.parent!.id, (p) => removeChild(p, op.id))!);
      return { site: next, op: { ...op, prev } };
    }

    case "node.move": {
      const loc = locate(site, op.id, op);
      if (!loc.parent) throw new OpError(`Impossible de déplacer une racine : ${op.id}`, op);
      const target = locate(site, op.to.parent, op);
      if (!canHaveChildren(target.node)) throw new OpError(`Le nœud ${op.to.parent} n'accepte pas d'enfants`, op);
      // Interdit de déplacer un nœud dans sa propre descendance.
      const descendants = new Set<Id>();
      const stack = [loc.node];
      while (stack.length) { const n = stack.pop()!; descendants.add(n.id); n.children?.forEach((c) => stack.push(c)); }
      if (descendants.has(op.to.parent)) throw new OpError(`Déplacement dans sa propre descendance : ${op.id}`, op);
      if (!("page" in loc.owner ? "page" in target.owner && loc.owner.page === target.owner.page : "component" in target.owner && loc.owner.component === target.owner.component)) {
        throw new OpError(`Déplacement entre deux racines différentes non pris en charge`, op);
      }
      const prev = { parent: loc.parent.id, index: loc.index };
      const sameParent = prev.parent === op.to.parent;
      const next = withRoot(site, loc.owner, (root) => {
        const removed = replaceInRoot(root, prev.parent, (p) => removeChild(p, op.id))!;
        return replaceInRoot(removed, op.to.parent, (p) => insertChild(p, op.to.index, loc.node))!;
      });
      void sameParent;
      return { site: next, op: { ...op, prev } };
    }

    case "node.set": {
      const loc = locate(site, op.id, op);
      if (op.path === "id" || op.path === "type" || op.path === "children" || op.path.startsWith("children.")) {
        throw new OpError(`Chemin non modifiable par node.set : ${op.path}`, op);
      }
      const prev = getPath(loc.node, op.path);
      // `null` sur un champ de premier niveau optionnel (name, style, bindings…) vaut retrait : le JSON ne transporte pas undefined.
      const value = op.value === null && !op.path.startsWith("props.") ? undefined : op.value;
      const next = withRoot(site, loc.owner, (root) => replaceInRoot(root, op.id, (n) => setPath(n, op.path, value))!);
      return { site: next, op: { ...op, prev } };
    }

    case "node.replace": {
      const loc = locate(site, op.id, op);
      if (op.node.id !== op.id) throw new OpError(`node.replace doit conserver l'identifiant ${op.id}`, op);
      const next = withRoot(site, loc.owner, (root) => replaceInRoot(root, op.id, () => op.node)!);
      return { site: next, op: { ...op, prev: loc.node } };
    }

    case "site.set": {
      const head = op.path.split(".")[0];
      if (head === "schemaVersion" || head === "id") throw new OpError(`Chemin non modifiable : ${op.path}`, op);
      const prev = getPath(site, op.path);
      return { site: setPath(site, op.path, op.value), op: { ...op, prev } };
    }
  }
}

/** Inverse d'une opération appliquée (elle doit porter son `prev`). */
export function invertOp(op: Op): Op {
  switch (op.op) {
    case "batch":
      return { op: "batch", ops: [...op.ops].reverse().map(invertOp), label: op.label };
    case "node.insert":
      return { op: "node.remove", id: op.node.id, prev: { parent: op.parent, index: op.index, node: op.node } };
    case "node.remove":
      if (!op.prev) throw new OpError("node.remove sans prev : inversion impossible", op);
      return { op: "node.insert", parent: op.prev.parent, index: op.prev.index, node: op.prev.node };
    case "node.move":
      if (!op.prev) throw new OpError("node.move sans prev : inversion impossible", op);
      return { op: "node.move", id: op.id, to: op.prev, prev: op.to };
    case "node.set":
      return { op: "node.set", id: op.id, path: op.path, value: op.prev, prev: op.value };
    case "node.replace":
      if (!op.prev) throw new OpError("node.replace sans prev : inversion impossible", op);
      return { op: "node.replace", id: op.id, node: op.prev, prev: op.node };
    case "site.set":
      return { op: "site.set", path: op.path, value: op.prev, prev: op.value };
  }
}

export function applyOps(site: Site, ops: Op[]): { site: Site; ops: Op[] } {
  const applied: Op[] = [];
  let cur = site;
  for (const op of ops) {
    const r = applyOp(cur, op);
    cur = r.site;
    applied.push(r.op);
  }
  return { site: cur, ops: applied };
}
