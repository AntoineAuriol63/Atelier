import type { Id, Node, Site } from "./types";

/** Classes lisibles d'un site : une par nœud et par style partagé, déduites des noms sans rien imposer à la création. */
export type ClassMap = { node: Map<Id, string>; shared: Map<Id, string> };

export function slugify(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Sorte d'un nœud sans nom, en un mot : title, text, image, button, link, list, item, box, section… */
export function kindOf(node: Node): string {
  const tag = typeof node.props.tag === "string" ? node.props.tag : "";
  switch (node.type) {
    case "text": return /^h[1-6]$/.test(tag) ? "title" : tag === "blockquote" ? "quote" : tag === "span" ? "label" : "text";
    case "box": return tag && tag !== "div" ? tag : "box";
    case "link": return tag === "button" ? "button" : "link";
    case "list": return "list";
    case "listItem": return "item";
    case "collection": return "view";
    case "item": return "card";
    case "instance": return "component";
    default: return node.type;
  }
}

/**
 * Calcule les classes lisibles.
 * - Un conteneur nommé prend son nom (`heros`) ; en cas de doublon dans le site, il se préfixe de l'ancêtre nommé le plus
 *   proche (`derniers-projets-texte`), puis se numérote.
 * - Une feuille sans nom prend `<ancêtre nommé>-<sorte>` (`heros-title`), numérotée parmi ses voisins de même sorte (`heros-text-2`).
 * - La racine d'une page s'appelle `page`, celle d'un composant porte le nom du composant.
 * Un nom saisi à la main prime toujours. L'identifiant technique reste en `data-node`.
 */
export function classMap(site: Site): ClassMap {
  const node = new Map<Id, string>();
  const shared = new Map<Id, string>();
  const taken = new Set<string>();
  const unique = (candidates: string[]) => {
    for (const c of candidates) if (c && !taken.has(c)) { taken.add(c); return c; }
    const base = candidates[0] || "element";
    let n = 2; while (taken.has(`${base}-${n}`)) n++;
    taken.add(`${base}-${n}`); return `${base}-${n}`;
  };
  for (const s of site.sharedStyles) shared.set(s.id, unique([slugify(s.name) || "style"]));
  const walk = (n: Node, scope: string, siblings: Node[]) => {
    // Une instance ne produit pas d'élément propre : la racine rendue du composant porte la classe du composant et la sienne.
    let cls: string;
    if (n.name) {
      const slug = slugify(n.name) || kindOf(n);
      cls = unique([slug, scope ? `${scope}-${slug}` : ""]);
    } else {
      const kind = kindOf(n);
      const same = siblings.filter((s) => !s.name && kindOf(s) === kind);
      const i = same.indexOf(n);
      const base = `${scope ? scope + "-" : ""}${kind}`;
      cls = unique([i > 0 ? `${base}-${i + 1}` : base]);
    }
    node.set(n.id, cls);
    if (n.type === "instance") return;
    const nextScope = n.name ? cls : scope;
    (n.children ?? []).forEach((c) => walk(c, nextScope, n.children ?? []));
  };
  const root = (n: Node, cls: string) => {
    node.set(n.id, unique([cls]));
    (n.children ?? []).forEach((c) => walk(c, "", n.children ?? []));
  };
  for (const c of site.components) {
    const cls = unique([slugify(c.name) || "component"]);
    node.set(c.root.id, cls);
    (c.root.children ?? []).forEach((ch) => walk(ch, cls, c.root.children ?? []));
  }
  for (const p of site.pages) root(p.root, "page");
  return { node, shared };
}
