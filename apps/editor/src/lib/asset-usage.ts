import type { Entry, Node, Site, StyleProps, StyleSet } from "@atelier/model";

export type AssetUsage =
  | { kind: "image" | "background"; pageId?: string; componentId?: string; nodeId: string; label: string }
  | { kind: "seo" | "favicon"; pageId?: string; label: string }
  | { kind: "entry"; entryId: string; database: string; field: string; label: string };

function imagesInStyle(style: StyleSet | undefined): string[] {
  const out: string[] = [];
  const scan = (props?: StyleProps) => { for (const v of Object.values(props ?? {})) if (v && typeof v === "object" && "image" in v && typeof v.image === "string") out.push(v.image); };
  scan(style?.base);
  Object.values(style?.breakpoints ?? {}).forEach(scan);
  Object.values(style?.states ?? {}).forEach(scan);
  Object.values(style?.stateBreakpoints ?? {}).forEach((bps) => Object.values(bps).forEach(scan));
  return out;
}

/** Où chaque ressource sert : éléments image, fonds, référencement, favicon, champs d'entrées. */
export function assetUsages(site: Site, entries: Entry[]): Map<string, AssetUsage[]> {
  const map = new Map<string, AssetUsage[]>();
  const add = (id: unknown, u: AssetUsage) => { if (typeof id !== "string" || !id) return; const l = map.get(id) ?? []; l.push(u); map.set(id, l); };
  const locale = site.settings.defaultLocale;
  const walk = (n: Node, where: { pageId?: string; componentId?: string; label: string }) => {
    if (n.type === "image") add(n.props.asset, { kind: "image", ...where, nodeId: n.id, label: where.label });
    for (const id of imagesInStyle(n.style)) add(id, { kind: "background", ...where, nodeId: n.id, label: where.label });
    n.children?.forEach((c) => walk(c, where));
  };
  for (const p of site.pages) { walk(p.root, { pageId: p.id, label: p.name[locale] ?? p.path }); add(p.seo?.image, { kind: "seo", pageId: p.id, label: `Image sociale · ${p.name[locale] ?? p.path}` }); }
  for (const c of site.components) walk(c.root, { componentId: c.id, label: `Composant ${c.name}` });
  add(site.settings.seo.image, { kind: "seo", label: "Image sociale du site" });
  add(site.settings.seo.favicon, { kind: "favicon", label: "Favicon du site" });
  for (const e of entries) {
    const db = site.databases.find((d) => d.id === e.database);
    if (!db) continue;
    const title = String(e.values[db.titleField] ?? "") || "Sans titre";
    for (const f of db.fields) {
      const v = e.values[f.name];
      if (f.type === "image") add(v, { kind: "entry", entryId: e.id, database: db.id, field: f.name, label: `${db.name[locale] ?? db.slug} · ${title}` });
      if (f.type === "gallery" && Array.isArray(v)) v.forEach((id) => add(id, { kind: "entry", entryId: e.id, database: db.id, field: f.name, label: `${db.name[locale] ?? db.slug} · ${title} (galerie)` }));
    }
  }
  return map;
}
