import { memoryData, entryUrl } from "@atelier/renderer";
import { getPublished, getSiteIdBySub, publicUrl } from "@/lib/published";

/** Plan du site (D38) : pages fixes indexables, plus une adresse par entrée publiée des modèles de page. */
export async function GET(_req: Request, { params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const id = await getSiteIdBySub(sub);
  const pub = id ? await getPublished(id) : null;
  if (!pub) return new Response("Introuvable", { status: 404 });
  const base = publicUrl(pub.site);
  const urls: { loc: string; lastmod?: string }[] = [];
  for (const p of pub.site.pages) if (p.kind === "static" && p.seo?.index !== false) urls.push({ loc: `${base}${p.path === "/" ? "" : p.path}`, lastmod: pub.publishedAt });
  const data = memoryData(pub.entries);
  for (const db of pub.site.databases) {
    if (!db.pageTemplates?.length) continue;
    const page = pub.site.pages.find((p) => p.id === db.pageTemplates![0]!.page);
    if (!page || page.seo?.index === false) continue;
    for (const e of data.entries(db, { layout: "list" }, { site: pub.site, page, locale: pub.site.settings.defaultLocale, data, params: {}, assets: new Map() })) urls.push({ loc: `${base}${entryUrl(pub.site, db, e)}`, lastmod: e.updatedAt });
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
