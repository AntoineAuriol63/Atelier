import { describe, it, expect } from "vitest";
import { assetMap, matchPath, memoryData, type RenderContext } from "@atelier/renderer";
import { sampleEntries, sampleSite } from "@atelier/model";
import { htmlDocument } from "../src/lib/html-document";
import { publishedHeaders } from "../src/lib/published";

const ctxFor = (path: string): RenderContext => {
  const data = memoryData(sampleEntries);
  const m = matchPath(sampleSite, data, path)!;
  return { site: sampleSite, page: m.page, entry: m.entry, params: m.params, locale: "fr", data, assets: assetMap(sampleSite), basePath: "" };
};

/** Lighthouse du 23 septembre sur le site publié : la feuille Google Fonts bloquait le premier rendu (2,1 s estimées sur mobile). */
describe("document HTML d'une page publiée · vitesse", () => {
  it("les polices se chargent sans bloquer le rendu : préconnexion, feuille appliquée après chargement, repli sans script", () => {
    const html = htmlDocument(ctxFor("/"), { path: "/", isEntry: false, css: { inline: "" } });
    expect(html).toContain('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    const fonts = html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/)?.[0] ?? "";
    expect(fonts).toContain('media="print"');
    expect(fonts).toContain("onload=\"this.media='all'\"");
    expect(html).toMatch(/<noscript><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*><\/noscript>/);
  });
  it("les en-têtes du site publié laissent le CDN garder la page une minute et la resservir pendant qu'elle se régénère", () => {
    const h = publishedHeaders(42);
    expect(h["content-type"]).toBe("text/html; charset=utf-8");
    expect(h["cache-control"]).toBe("public, max-age=0, s-maxage=60, stale-while-revalidate=600");
    expect(h["x-atelier-version"]).toBe("42");
  });
});
