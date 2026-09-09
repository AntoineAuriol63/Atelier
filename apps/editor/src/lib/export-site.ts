import { createElement } from "react";
// La variante « edge » évite l'alias react-server de Next, qui interdit `react-dom/server` dans une route.
import { renderToStaticMarkup } from "react-dom/server.edge";
import type { Asset, Entry, Site } from "@atelier/model";
import { classMap, slugify, type ClassMap } from "@atelier/model";
import { RenderPage, assetMap, entryUrl, fontsHref, localized, memoryData, pageTitle, siteCss, type RenderContext } from "@atelier/renderer";
import { FileAssetStorage, getAssetStorage } from "@/lib/store";
import type { ZipEntry } from "@/lib/zip";

export type ExportSource = { site: Site; entries: Entry[]; version: number | null; publishedAt: string | null };
export type ExportResult = { files: ZipEntry[]; pages: number; assets: number; external: string[] };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const MIME_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif", "image/gif": "gif", "image/svg+xml": "svg", "video/mp4": "mp4", "application/pdf": "pdf" };
/** Extension d'un fichier : d'après son contenu (signature), sinon le type déclaré, sinon l'adresse. */
function extOf(bytes: Uint8Array, url: string, mime?: string): string {
  const head = Array.from(bytes.subarray(0, 12)).map((b) => b.toString(16).padStart(2, "0")).join("");
  const ascii = String.fromCharCode(...bytes.subarray(0, 12));
  if (head.startsWith("ffd8ff")) return "jpg";
  if (head.startsWith("89504e47")) return "png";
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return "webp";
  if (ascii.startsWith("GIF8")) return "gif";
  if (ascii.slice(4, 12) === "ftypavif") return "avif";
  if (ascii.slice(4, 8) === "ftyp") return "mp4";
  if (ascii.startsWith("%PDF")) return "pdf";
  if (mime && MIME_EXT[mime]) return MIME_EXT[mime]!;
  const m = /\.([a-z0-9]{2,5})(?:[?#]|$)/i.exec(url);
  return m ? m[1]!.toLowerCase() : "bin";
}

/** Lit les octets d'un média : stockage local s'il est servi par cet Atelier, sinon téléchargement. `null` si inaccessible. */
async function fetchAsset(siteId: string, url: string): Promise<Uint8Array | null> {
  try {
    const local = new RegExp(`^/api/sites/${siteId}/assets/(.+)$`).exec(url);
    const storage = getAssetStorage();
    if (local && storage instanceof FileAssetStorage) { const b = await storage.read(siteId, decodeURIComponent(local[1]!)); return b ? new Uint8Array(b) : null; }
    if (!/^https?:\/\//.test(url)) return null;
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch { return null; }
}

/** Copie les médias dans `assets/` sous un nom lisible et réécrit leurs adresses dans une copie du site. */
async function bundleAssets(site: Site): Promise<{ site: Site; files: ZipEntry[]; external: string[] }> {
  const files: ZipEntry[] = []; const external: string[] = []; const taken = new Set<string>();
  const unique = (base: string, ext: string) => { let n = base, i = 2; while (taken.has(`${n}.${ext}`)) n = `${base}-${i++}`; taken.add(`${n}.${ext}`); return `${n}.${ext}`; };
  const assets: Asset[] = [];
  for (const a of site.assets) {
    const base = slugify((a.name ?? a.id).replace(/\.[a-z0-9]+$/i, "")) || a.id;
    const bytes = await fetchAsset(site.id, a.url);
    if (!bytes) { external.push(a.url); assets.push(a); continue; }
    const main = unique(base, extOf(bytes, a.url, a.mime));
    files.push({ path: `assets/${main}`, data: bytes });
    const variants = [];
    for (const v of a.variants ?? []) {
      const vb = await fetchAsset(site.id, v.url);
      if (!vb) continue;
      const name = unique(`${base}-${v.width}`, v.format || extOf(vb, v.url));
      files.push({ path: `assets/${name}`, data: vb });
      variants.push({ ...v, url: `/assets/${name}` });
    }
    assets.push({ ...a, url: `/assets/${main}`, variants: variants.length ? variants : undefined });
  }
  return { site: { ...site, assets }, files, external };
}

function htmlDocument(ctx: RenderContext, urlPath: string, isEntry: boolean): string {
  const { site, page } = ctx;
  const title = pageTitle(ctx);
  const description = localized<string>(page.seo?.description, ctx) ?? localized<string>(site.settings.seo.description, ctx);
  const imageId = page.seo?.image ?? site.settings.seo.image;
  const image = imageId ? ctx.assets.get(imageId) : undefined;
  const faviconId = site.settings.seo.favicon;
  const favicon = faviconId ? ctx.assets.get(faviconId) : undefined;
  const fonts = fontsHref(site.theme);
  const dark = site.theme.modes.some((m) => m.id === "dark");
  const head = [
    `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<meta name="generator" content="Atelier">`,
    `<title>${esc(title)}</title>`,
    description ? `<meta name="description" content="${esc(description)}">` : "",
    `<meta name="color-scheme" content="${dark ? "light dark" : "light"}">`,
    page.seo?.index === false ? `<meta name="robots" content="noindex, follow">` : "",
    page.seo?.canonical ? `<link rel="canonical" href="${esc(page.seo.canonical)}">` : "",
    `<meta property="og:title" content="${esc(title)}">`, description ? `<meta property="og:description" content="${esc(description)}">` : "",
    `<meta property="og:type" content="${isEntry ? "article" : "website"}">`, `<meta property="og:site_name" content="${esc(site.name)}">`,
    image ? `<meta property="og:image" content="${esc(image.url)}">` : "",
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">`,
    favicon ? `<link rel="icon" href="${esc(favicon.url)}">` : "",
    fonts ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(fonts)}">` : "",
    `<link rel="stylesheet" href="/styles.css">`,
    site.settings.head ?? "",
  ].filter(Boolean).join("\n    ");
  const body = renderToStaticMarkup(createElement(RenderPage, { ctx, mode: site.theme.defaultMode }));
  void urlPath;
  return `<!doctype html>\n<html lang="${esc(ctx.locale)}">\n  <head>\n    ${head}\n  </head>\n  <body>\n    ${body}\n    ${site.settings.bodyEnd ?? ""}\n  </body>\n</html>\n`;
}

const fileFor = (urlPath: string) => (urlPath === "/" ? "index.html" : `${urlPath.replace(/^\/|\/$/g, "")}/index.html`);

/** Construit les fichiers de l'export statique : une page HTML par adresse, une feuille de style aux classes lisibles, les médias, les données. */
export async function buildExport(src: ExportSource): Promise<ExportResult> {
  const bundled = await bundleAssets(src.site);
  const site = bundled.site;
  const classes: ClassMap = classMap(site);
  const data = memoryData(src.entries);
  const assets = assetMap(site);
  const locale = site.settings.defaultLocale;
  const files: ZipEntry[] = [...bundled.files];
  let pages = 0;
  const add = (ctx: RenderContext, urlPath: string, isEntry: boolean) => { files.push({ path: fileFor(urlPath), data: htmlDocument(ctx, urlPath, isEntry) }); pages++; };
  for (const page of site.pages) if (page.kind === "static") add({ site, page, locale, data, params: {}, assets, basePath: "", classes }, page.path, false);
  for (const db of site.databases) {
    for (const tpl of db.pageTemplates ?? []) {
      const page = site.pages.find((p) => p.id === tpl.page);
      if (!page) continue;
      const keys = [...tpl.slugPattern.matchAll(/\{(\w+)\}/g)].map((m) => m[1]!);
      for (const entry of data.entries(db, { layout: "list" }, { site, page, locale, data, params: {}, assets })) {
        const params: Record<string, string> = {}; keys.forEach((k) => { params[k] = String(entry.values[k] ?? ""); });
        add({ site, page, entry, params, locale, data, assets, basePath: "", classes }, entryUrl(site, db, entry), true);
      }
    }
  }
  files.push({ path: "styles.css", data: siteCss(site, { classes }) });
  for (const db of site.databases) files.push({ path: `data/${db.slug}.json`, data: JSON.stringify(src.entries.filter((e) => e.database === db.id), null, 2) });
  files.push({ path: "atelier/site.json", data: JSON.stringify(src.site, null, 2) });
  files.push({ path: "atelier/entries.json", data: JSON.stringify(src.entries, null, 2) });
  if (site.redirects.length) files.push({ path: "_redirects", data: site.redirects.map((r) => `${r.from} ${r.to} ${r.permanent ? 301 : 302}`).join("\n") + "\n" });
  files.push({ path: "README.md", data: readme(site, src, pages, bundled.files.length, bundled.external) });
  return { files, pages, assets: bundled.files.length, external: bundled.external };
}

function readme(site: Site, src: ExportSource, pages: number, assetCount: number, external: string[]): string {
  const forms = JSON.stringify(site).includes('"type":"form"');
  return `# ${site.name} — export Atelier

${src.version !== null ? `Version publiée ${src.version}${src.publishedAt ? ` (${src.publishedAt.slice(0, 10)})` : ""}.` : "Version de travail (le site n'avait pas encore été publié)."}
${pages} page${pages > 1 ? "s" : ""} HTML, ${assetCount} fichier${assetCount > 1 ? "s" : ""} média.

## Contenu

- \`index.html\`, \`<chemin>/index.html\` : une page par adresse du site, y compris une page par entrée des modèles de page. Le HTML est complet (titre, description, Open Graph, polices) et ne dépend d'aucun script.
- \`styles.css\` : toute la feuille de style. Les classes portent les noms des calques : un conteneur nommé « Héros » devient \`.heros\`, son titre \`.heros-title\`, son deuxième paragraphe \`.heros-text-2\`. Les styles partagés gardent leur nom (\`.bouton\`). Renommer un calque dans Atelier renomme la classe.
- \`assets/\` : les médias et leurs déclinaisons (\`photo.jpg\`, \`photo-800.webp\`…), nommés d'après leur nom dans la bibliothèque.
- \`data/<base>.json\` : les entrées de chaque base de données, telles que publiées.
- \`atelier/site.json\`, \`atelier/entries.json\` : le document source, pour revenir dans Atelier ou construire autre chose à partir du modèle.
${site.redirects.length ? "- `_redirects` : les redirections, au format Netlify/Cloudflare Pages.\n" : ""}
## Mettre en ligne

Les liens sont absolus depuis la racine (\`/galeries\`, \`/styles.css\`) : déposez le contenu de cette archive à la racine d'un hébergement statique (Netlify, Cloudflare Pages, Vercel, GitHub Pages, un serveur nginx…). Ouvrir \`index.html\` directement depuis le disque ne résoudra pas ces chemins.
${forms ? "\n## Formulaires\n\nLes formulaires envoient vers `/api/forms/…`, une route d'Atelier. Hébergé ailleurs, remplacez l'attribut `action` par votre propre service (Formspree, Netlify Forms, une fonction maison) ou gardez le site publié par Atelier pour cette partie.\n" : ""}${external.length ? `\n## Médias externes conservés tels quels\n\n${external.map((u) => `- ${u}`).join("\n")}\n` : ""}`;
}
