import { matchRedirect, NOT_FOUND_PATH } from "@atelier/model";
import { assetMap, matchPath, memoryData, siteCss, type RenderContext } from "@atelier/renderer";
import { basePathFor, canServeHere, getPublished, getSiteIdBySub, publicUrl } from "@/lib/published";
import { escapeHtml, htmlDocument } from "@/lib/html-document";

const HTML = { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" };
const plain = (title: string, text: string, status: number) =>
  new Response(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title></head><body style="margin:0;padding:48px;font-family:system-ui;color:#666"><h1 style="font-size:20px">${escapeHtml(title)}</h1><p>${escapeHtml(text)}</p></body></html>`, { status, headers: HTML });

/**
 * Site publié : document HTML complet rendu à la demande depuis l'instantané publié (même fonction que l'export).
 * Redirections (D39), page « introuvable » à `/404` servie en 404, code head et fin de body tels quels (D40).
 */
export async function GET(_req: Request, { params }: { params: Promise<{ sub: string; path?: string[] }> }) {
  const { sub, path } = await params;
  if (!(await canServeHere())) return plain("Introuvable", "", 404);
  const id = await getSiteIdBySub(sub);
  if (!id) return plain("Site introuvable", "Aucun site ne répond à cette adresse.", 404);
  const pub = await getPublished(id);
  if (!pub) return plain("Ce site n'est pas encore publié.", "Ouvrez l'éditeur et cliquez « Publier ».", 404);
  const site = pub.site;
  const urlPath = "/" + (path ?? []).map(decodeURIComponent).join("/");
  const basePath = await basePathFor(sub);
  const redirect = matchRedirect(site, urlPath);
  if (redirect) {
    const to = /^https?:\/\//.test(redirect.to) ? redirect.to : basePath + redirect.to;
    return new Response(null, { status: redirect.permanent ? 301 : 302, headers: { location: to, "cache-control": "no-cache" } });
  }
  const data = memoryData(pub.entries);
  let m = matchPath(site, data, urlPath);
  let status = 200;
  if (!m) {
    const notFound = site.pages.find((p) => p.kind === "static" && p.path === NOT_FOUND_PATH);
    if (!notFound) return plain("Page introuvable", "Cette adresse ne correspond à aucune page du site.", 404);
    m = { page: notFound, params: {} }; status = 404;
  }
  const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: site.settings.defaultLocale, data, assets: assetMap(site), basePath };
  const html = htmlDocument(ctx, { path: urlPath, isEntry: !!m.entry, base: publicUrl(site), css: { inline: siteCss(site, { pageId: m.page.id }) }, noindex: status === 404 });
  return new Response(html, { status, headers: { ...HTML, "x-atelier-version": String(pub.version) } });
}
