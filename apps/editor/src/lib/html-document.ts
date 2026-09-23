import { createElement } from "react";
// La variante « edge » évite l'alias react-server de Next, qui interdit `react-dom/server` dans une route.
import { renderToStaticMarkup } from "react-dom/server.edge";
import { RenderPage, fontsHref, localized, pageTitle, type RenderContext } from "@atelier/renderer";

export type HtmlDocumentOptions = {
  /** Adresse demandée (`/`, `/galeries`…), pour la canonique. */
  path: string;
  isEntry: boolean;
  /** Origine publique du site (`https://marie.exemple.fr`) : canonique, Open Graph et image absolues. Absente à l'export. */
  base?: string;
  /** Feuille de style : liée (`/styles.css` à l'export) ou en ligne (site publié). */
  css: { href: string } | { inline: string };
  /** Page servie en erreur : pas d'indexation. */
  noindex?: boolean;
};

export const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/**
 * Document HTML complet d'une page : tête (titre, description, robots, canonique, Open Graph, Twitter, favicon, polices, `color-scheme`),
 * code head du site tel quel (D40), corps rendu par le moteur, code de fin de body tel quel. Même fonction pour le site publié et l'export.
 */
export function htmlDocument(ctx: RenderContext, opts: HtmlDocumentOptions): string {
  const { site, page } = ctx;
  const esc = escapeHtml;
  const abs = (url: string) => (opts.base && url.startsWith("/") ? opts.base + url : url);
  const title = pageTitle(ctx);
  const description = localized<string>(page.seo?.description, ctx) ?? localized<string>(site.settings.seo.description, ctx);
  const imageId = page.seo?.image ?? site.settings.seo.image;
  const image = imageId ? ctx.assets.get(imageId) : undefined;
  const faviconId = site.settings.seo.favicon;
  const favicon = faviconId ? ctx.assets.get(faviconId) : undefined;
  const fonts = fontsHref(site.theme);
  const dark = site.theme.modes.some((m) => m.id === "dark");
  const canonical = page.seo?.canonical ?? (opts.base ? `${opts.base}${opts.path === "/" ? "" : opts.path}` : undefined);
  const noindex = opts.noindex || page.seo?.index === false;
  const head = [
    `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<meta name="generator" content="Atelier">`,
    `<title>${esc(title)}</title>`,
    description ? `<meta name="description" content="${esc(description)}">` : "",
    `<meta name="color-scheme" content="${dark ? "light dark" : "light"}">`,
    `<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow"}">`,
    canonical ? `<link rel="canonical" href="${esc(canonical)}">` : "",
    `<meta property="og:title" content="${esc(title)}">`, description ? `<meta property="og:description" content="${esc(description)}">` : "",
    `<meta property="og:type" content="${opts.isEntry ? "article" : "website"}">`, `<meta property="og:site_name" content="${esc(site.name)}">`,
    `<meta property="og:locale" content="${esc(ctx.locale)}">`,
    canonical ? `<meta property="og:url" content="${esc(canonical)}">` : "",
    image ? `<meta property="og:image" content="${esc(abs(image.url))}">${image.width ? `<meta property="og:image:width" content="${image.width}">` : ""}${image.height ? `<meta property="og:image:height" content="${image.height}">` : ""}` : "",
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">`,
    favicon ? `<link rel="icon" href="${esc(favicon.url)}">` : "",
    // Les polices ne bloquent pas le premier rendu (Lighthouse, 23 septembre : 2,1 s de gain estimé sur mobile) : la feuille est demandée
    // comme feuille d'impression puis appliquée une fois chargée ; sans script, elle se charge comme avant.
    fonts ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(fonts)}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${esc(fonts)}"></noscript>` : "",
    "href" in opts.css ? `<link rel="stylesheet" href="${esc(opts.css.href)}">` : `<style>${opts.css.inline}</style>`,
    site.settings.head?.trim() ?? "",
  ].filter(Boolean).join("\n    ");
  const body = renderToStaticMarkup(createElement(RenderPage, { ctx, mode: site.theme.defaultMode }));
  return `<!doctype html>\n<html lang="${esc(ctx.locale)}">\n  <head>\n    ${head}\n  </head>\n  <body style="margin:0">\n    ${body}\n    ${site.settings.bodyEnd?.trim() ?? ""}\n  </body>\n</html>\n`;
}
