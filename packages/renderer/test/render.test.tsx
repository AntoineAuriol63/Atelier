import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { sampleSite, sampleEntries } from "@atelier/model";
import { RenderPage, siteCss, styleSetCss, collectionViewCss, memoryData, matchPath, assetMap, pageTitle, type RenderContext } from "../src";

const data = memoryData(sampleEntries);
function ctxFor(path: string): RenderContext {
  const m = matchPath(sampleSite, data, path);
  if (!m) throw new Error("page introuvable " + path);
  return { site: sampleSite, page: m.page, entry: m.entry, params: m.params, locale: "fr", data, assets: assetMap(sampleSite), basePath: "" };
}

describe("vue de collection", () => {
  const bps = sampleSite.settings.breakpoints;
  it("émet la grille et ses colonnes par point de rupture", () => {
    const css = collectionViewCss(".n-c", { layout: "gallery", columns: { base: 3, tablet: 2, small: 1 } }, bps);
    expect(css).toContain(".n-c{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}");
    expect(css).toContain("@media (max-width:991px){.n-c{grid-template-columns:repeat(2,minmax(0,1fr))}}");
    expect(css).toContain("@media (max-width:479px){.n-c{grid-template-columns:repeat(1,minmax(0,1fr))}}");
  });
  it("liste en colonne, défilement horizontal avec accroche", () => {
    expect(collectionViewCss(".n-c", { layout: "list" }, bps)).toContain("flex-direction:column");
    expect(collectionViewCss(".n-c", { layout: "carousel", columns: { base: 2 } }, bps)).toContain("scroll-snap-type:x mandatory");
  });
  it("filtre, trie et limite les entrées publiées", () => {
    const ctx = ctxFor("/");
    const db = sampleSite.databases[0]!;
    const mariages = data.entries(db, { layout: "list", filter: { field: "category", op: "eq", value: "mariage" }, sort: [{ field: "year", dir: "desc" }], limit: 1 }, ctx);
    expect(mariages.length).toBe(1);
    expect(mariages[0]!.values.category).toBe("mariage");
    const empty = data.entries(db, { layout: "list", filter: { and: [{ field: "category", op: "eq", value: "mariage" }, { field: "cover", op: "isEmpty" }] } }, ctx);
    expect(empty.length).toBe(0);
  });
});

describe("image", () => {
  it("émet un srcset à partir des déclinaisons, l'original en repli", () => {
    const site = structuredClone(sampleSite);
    const a = site.assets.find((x) => x.id === "as_hero")!;
    a.variants = [{ width: 480, url: "/w480.webp", format: "webp" }, { width: 960, url: "/w960.webp", format: "webp" }];
    const m = matchPath(site, data, "/")!;
    const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: "fr", data, assets: assetMap(site), basePath: "" };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('srcSet="/w480.webp 480w, /w960.webp 960w, https://picsum.photos/id/1027/1200/1500 1200w"');
    expect(html).toContain('sizes="(max-width: 1152px) 100vw, 1152px"');
  });
});

describe("séparateur", () => {
  const bps = sampleSite.settings.breakpoints;
  it("est vertical dans une rangée et redevient horizontal quand la rangée s'empile", () => {
    const css = styleSetCss(".n-row", { base: { display: "flex", flexDirection: "row" }, breakpoints: { mobile: { flexDirection: "column" } } }, bps);
    expect(css).toContain(".n-row>hr{width:0;");
    expect(css).toMatch(/@media \(max-width:767px\)\{[^}]*\}\.n-row>hr\{width:100%;/);
  });
  it("suit une grille à plusieurs colonnes", () => {
    expect(styleSetCss(".n-g", { base: { display: "grid", gridTemplateColumns: "1fr 1fr" }, breakpoints: { mobile: { gridTemplateColumns: "1fr" } } }, bps)).toContain(".n-g>hr{width:0;");
    expect(styleSetCss(".n-g", { base: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)" } }, bps)).toContain(".n-g>hr{width:0;");
    expect(styleSetCss(".n-c", { base: { display: "flex", flexDirection: "column" } }, bps)).not.toContain(">hr");
  });
});

describe("css", () => {
  const css = siteCss(sampleSite);
  it("émet les jetons du thème et le mode sombre", () => {
    expect(css).toContain("--color-accent:#8A5A2B");
    expect(css).toContain('[data-mode="dark"]{');
    expect(css).toContain("--color-accent:#D6A26B");
  });
  it("émet les styles partagés avec héritage", () => {
    expect(css).toMatch(/\.s-st_button_secondary\{[^}]*display:inline-flex[^}]*background:transparent/);
  });
  it("émet les points de rupture en cascade descendante", () => {
    const i991 = css.indexOf("@media (max-width:991px){.n-hero{");
    const iMobile = css.indexOf("@media (max-width:767px){.s-st_section{");
    expect(i991).toBeGreaterThan(-1);
    expect(iMobile).toBeGreaterThan(-1);
  });
  it("émet les états", () => {
    expect(css).toContain(".s-st_button:hover,.s-st_button[data-force-state~=\"hover\"]{opacity:0.85}");
  });
});

describe("rendu", () => {
  it("rend la page d'accueil avec en-tête, héros et collection", () => {
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxFor("/") }));
    expect(html).toContain("<header");
    expect(html).toContain("Des images qui restent, longtemps après.");
    expect(html).toContain('href="/galeries"');
    // 6 cartes de projets (limite de la vue), liens vers les pages dynamiques
    expect(html.match(/class="n-work_item"/g)?.length).toBe(6);
    expect(html).toContain('href="/projets/lea-et-tom"');
    // libellé du choix, pas la valeur brute
    expect(html).toContain("Mariage");
    expect(html).toContain('src="https://picsum.photos/id/1011/1200/1500"');
  });
  it("rend une page de modèle avec l'entrée résolue", () => {
    const ctx = ctxFor("/projets/chaine-des-puys");
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain("Chaîne des Puys, aube d&#x27;octobre");
    expect(html).toContain("Paysage");
    expect(pageTitle(ctx)).toBe("Chaîne des Puys, aube d'octobre · Marie Lambert");
  });
  it("rend le formulaire de contact", () => {
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxFor("/contact") }));
    expect(html).toContain("<form");
    expect(html).toContain('name="email"');
    expect(html).toContain("<textarea");
    expect(html).toContain('type="submit"');
  });
  it("marque le lien de la page courante", () => {
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxFor("/a-propos") }));
    expect(html).toContain('aria-current="page"');
  });
  it("retourne undefined pour un chemin inconnu", () => {
    expect(matchPath(sampleSite, data, "/nope")).toBeUndefined();
  });
});
