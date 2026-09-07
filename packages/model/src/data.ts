import type { Database, Id, Page, Site } from "./types";
import type { NodeLocation } from "./tree";

/** D'où un nœud tire ses données : l'entrée d'un modèle de page, ou l'élément répété d'une vue (7.3). */
export type DataSource = { source: "entry" | "item"; database: Database; /** identifiant de la vue, pour `item` */ via?: Id };

/** La base dont cette page est le modèle (D24), et son motif d'adresse. */
export function templateOf(site: Site, pageId: Id): { database: Database; slugPattern: string } | undefined {
  for (const db of site.databases) for (const t of db.pageTemplates ?? []) if (t.page === pageId) return { database: db, slugPattern: t.slugPattern };
  return undefined;
}

/** Source de données disponible pour un nœud : la vue la plus proche qui le contient, sinon l'entrée du modèle de page. */
export function dataSourceFor(site: Site, index: Map<Id, NodeLocation>, page: Page, nodeId: Id): DataSource | undefined {
  let cur = index.get(nodeId);
  while (cur) {
    if (cur.node.type === "collection") {
      const db = site.databases.find((d) => d.id === cur!.node.props.database);
      if (db) return { source: "item", database: db, via: cur.node.id };
    }
    cur = cur.parent ? index.get(cur.parent.id) : undefined;
  }
  const t = templateOf(site, page.id);
  return t ? { source: "entry", database: t.database } : undefined;
}

/** Adresse d'une entrée d'après le modèle de page de sa base ; `undefined` sans modèle. */
export function entryPath(db: Database, entry: { values: Record<string, unknown> }): string | undefined {
  const t = db.pageTemplates?.[0];
  if (!t) return undefined;
  return t.slugPattern.replace(/\{(\w+)\}/g, (_, f: string) => String(entry.values[f] ?? ""));
}
