import type { Asset, Binding, ComponentDef, Database, Entry, Field, LinkTarget, Locale, Node, Page, Site, ViewConfig, ClassMap } from "@atelier/model";
import { getPath } from "@atelier/model";

/** Fournit les entrées d'une base pour une vue. Synchrone en v0 (données préchargées). */
export type DataProvider = {
  entries(database: Database, view: ViewConfig, ctx: RenderContext): Entry[];
  entry?(database: Database, id: string): Entry | undefined;
};

export type RenderContext = {
  site: Site;
  page: Page;
  locale: Locale;
  data: DataProvider;
  params: Record<string, string>;
  entry?: Entry;
  item?: Entry;
  props?: Record<string, unknown>;
  slots?: Record<string, Node[]>;
  state?: Record<string, unknown>;
  editor?: boolean;
  /** Vrai quand l'hôte hydrate le HTML avec React (aperçu) : les scripts (interactions, formulaires) ne sont pas émis dans le HTML, l'hôte les injecte après hydratation pour ne pas créer d'écart entre le HTML serveur et le DOM. */
  deferScripts?: boolean;
  /** Vrai sous un lien : un lien imbriqué se rend alors en span (le HTML interdit a > a). */
  inLink?: boolean;
  assets: Map<string, Asset>;
  /** Préfixe des URLs (ex. "/preview") */
  basePath?: string;
  /** Classes lisibles (export) à la place des classes techniques `n-<id>` / `s-<id>`. */
  classes?: ClassMap;
  /** Classes supplémentaires par nœud (variantes d'une instance sur la racine du composant). */
  extraClass?: Record<string, string>;
};

export function localized<T>(value: unknown, ctx: RenderContext): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) return value as T;
  const rec = value as Record<string, T>;
  return rec[ctx.locale] ?? rec[ctx.site.settings.defaultLocale] ?? Object.values(rec)[0];
}

export function findDatabase(site: Site, id: string): Database | undefined {
  return site.databases.find((d) => d.id === id);
}

export function findComponent(site: Site, id: string): ComponentDef | undefined {
  return site.components.find((c) => c.id === id);
}

export function entryUrl(site: Site, database: Database, entry: Entry, basePath = ""): string {
  const tpl = database.pageTemplates?.[0];
  if (!tpl) return "#";
  const path = tpl.slugPattern.replace(/\{(\w+)\}/g, (_, f: string) => String(entry.values[f] ?? ""));
  return basePath + path;
}

export function resolveHref(target: LinkTarget | undefined, ctx: RenderContext): string {
  if (!target) return "#";
  const base = ctx.basePath ?? "";
  switch (target.kind) {
    case "url": return target.url;
    case "page": {
      const p = ctx.site.pages.find((p) => p.id === target.page);
      if (!p) return "#";
      return base + (p.path === "/" ? "/" : p.path) + (target.anchor ? `#${target.anchor}` : "");
    }
    case "entry": {
      const db = findDatabase(ctx.site, target.database);
      const e = db ? ctx.data.entry?.(db, target.entry) : undefined;
      return db && e ? entryUrl(ctx.site, db, e, base) : "#";
    }
    case "asset": return ctx.assets.get(target.asset)?.url ?? "#";
    case "email": return `mailto:${target.to}`;
    case "phone": return `tel:${target.number}`;
    case "anchor": return `#${target.node}`;
  }
}

function fieldOf(db: Database | undefined, name: string): Field | undefined {
  return db?.fields.find((f) => f.name === name);
}

/** Valeur brute d'une liaison, puis mise en forme minimale (libellé d'un choix, transformations). */
export function resolveBinding(binding: Binding, ctx: RenderContext): unknown {
  let value: unknown;
  const fromEntry = (entry: Entry | undefined) => {
    if (!entry) return undefined;
    const db = findDatabase(ctx.site, entry.database);
    if (binding.path === "$url") return db ? entryUrl(ctx.site, db, entry, ctx.basePath) : "#";
    if (binding.path === "$id") return entry.id;
    const head = binding.path.split(".")[0]!;
    const raw = getPath(entry.values, binding.path);
    const field = fieldOf(db, head);
    if (field?.type === "select" && typeof raw === "string") {
      const opt = field.options?.find((o) => o.value === raw);
      return opt ? localized<string>(opt.label, ctx) ?? raw : raw;
    }
    if (field?.localized) return localized(raw, ctx);
    return raw;
  };
  switch (binding.source) {
    case "item": value = fromEntry(ctx.item); break;
    case "entry": value = fromEntry(ctx.entry); break;
    case "prop": value = getPath(ctx.props ?? {}, binding.path); break;
    case "page": value = binding.path === "name" ? localized(ctx.page.name, ctx) : getPath(ctx.page, binding.path); break;
    case "site": value = getPath(ctx.site, binding.path); break;
    case "param": value = ctx.params[binding.path]; break;
    case "state": value = getPath(ctx.state ?? {}, binding.path); break;
  }
  const t = binding.transform;
  if (t && value !== undefined && value !== null) {
    if (t.kind === "truncate" && typeof value === "string") value = value.length > t.length ? value.slice(0, t.length - 1) + "…" : value;
    if (t.kind === "date") { const d = new Date(String(value)); if (!isNaN(d.getTime())) value = d.toLocaleDateString(ctx.locale, { dateStyle: t.format === "short" ? "short" : "long" } as Intl.DateTimeFormatOptions); }
    if (t.kind === "number" && typeof value === "number") value = value.toLocaleString(ctx.locale);
  }
  return value;
}

/** Fournisseur de données en mémoire (tests, éditeur sans persistance). */
export function memoryData(entries: Entry[]): DataProvider {
  const byId = new Map(entries.map((e) => [e.id, e]));
  return {
    entry: (_db, id) => byId.get(id),
    entries(db, view, ctx) {
      let list = entries.filter((e) => e.database === db.id && e.status === "published");
      if (view.filter) list = list.filter((e) => matches(view.filter!, e, ctx));
      for (const s of [...(view.sort ?? [])].reverse()) {
        list = [...list].sort((a, b) => {
          const va = a.values[s.field] as string | number | undefined, vb = b.values[s.field] as string | number | undefined;
          const r = va === vb ? 0 : va === undefined ? 1 : vb === undefined ? -1 : va < vb ? -1 : 1;
          return s.dir === "desc" ? -r : r;
        });
      }
      if (view.limit) list = list.slice(0, view.limit);
      return list;
    },
  };
}

type FilterExpr = NonNullable<ViewConfig["filter"]>;

function filterValue(v: unknown, ctx: RenderContext): unknown {
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("param" in o) return ctx.params[String(o.param)];
    if ("page" in o && o.page === "entry") return ctx.entry?.id;
    if ("state" in o) return ctx.state?.[String(o.state)];
  }
  return v;
}

export function matches(f: FilterExpr, e: Entry, ctx: RenderContext): boolean {
  if ("and" in f) return f.and.every((x) => matches(x, e, ctx));
  if ("or" in f) return f.or.some((x) => matches(x, e, ctx));
  const actual = e.values[f.field];
  const expected = filterValue(f.value, ctx);
  switch (f.op) {
    case "eq": return actual === expected;
    case "ne": return actual !== expected;
    case "gt": return (actual as number) > (expected as number);
    case "gte": return (actual as number) >= (expected as number);
    case "lt": return (actual as number) < (expected as number);
    case "lte": return (actual as number) <= (expected as number);
    case "contains": return Array.isArray(actual) ? actual.includes(expected) : String(actual ?? "").toLowerCase().includes(String(expected ?? "").toLowerCase());
    case "in": return Array.isArray(expected) && expected.includes(actual);
    case "isEmpty": return actual === undefined || actual === null || actual === "" || (Array.isArray(actual) && actual.length === 0);
    case "isNotEmpty": return !(actual === undefined || actual === null || actual === "" || (Array.isArray(actual) && actual.length === 0));
  }
}

/** Trouve la page et l'entrée correspondant à un chemin d'URL (pages statiques puis modèles). */
export function matchPath(site: Site, data: DataProvider, path: string): { page: Page; entry?: Entry; params: Record<string, string> } | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  const staticPage = site.pages.find((p) => p.kind === "static" && p.path === clean);
  if (staticPage) return { page: staticPage, params: {} };
  for (const db of site.databases) {
    for (const tpl of db.pageTemplates ?? []) {
      const page = site.pages.find((p) => p.id === tpl.page);
      if (!page) continue;
      const keys: string[] = [];
      const re = new RegExp("^" + tpl.slugPattern.replace(/\{(\w+)\}/g, (_, k: string) => { keys.push(k); return "([^/]+)"; }) + "$");
      const m = clean.match(re);
      if (!m) continue;
      const params: Record<string, string> = {};
      keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]!); });
      const dummyCtx = { site, page, locale: site.settings.defaultLocale, data, params, assets: new Map() } as RenderContext;
      const entry = data.entries(db, { layout: "list", filter: { and: keys.map((k) => ({ field: k, op: "eq" as const, value: params[k] })) }, limit: 1 }, dummyCtx)[0];
      if (entry) return { page, entry, params };
    }
  }
  return undefined;
}
