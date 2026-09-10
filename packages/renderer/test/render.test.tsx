import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { sampleSite, sampleEntries, classMap, restaurantSite, restaurantEntries } from "@atelier/model";
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

describe("liaisons", () => {
  it("rend un champ texte long lié comme une suite de paragraphes", () => {
    const site = structuredClone(sampleSite);
    const page = site.pages.find((p) => p.id === "p_projet")!;
    const find = (n: typeof page.root): typeof page.root | undefined => (n.id === "prj_excerpt" ? n : (n.children ?? []).map(find).find(Boolean));
    const node = find(page.root)!;
    node.bindings = { content: { source: "entry", path: "body" } };
    const entries = structuredClone(sampleEntries);
    entries[0]!.values.body = [{ id: "rt1", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "Premier paragraphe riche" }] } } }, { id: "rt2", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "Second" }] } } }];
    const d = memoryData(entries);
    const m = matchPath(site, d, "/projets/lea-et-tom")!;
    const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: "fr", data: d, assets: assetMap(site), basePath: "" };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('<p class="n-rt1">Premier paragraphe riche</p><p class="n-rt2">Second</p>');
    expect(html).toMatch(/<div class="[^"]*n-prj_excerpt" data-richtext="true">/);
  });
});

describe("formulaire", () => {
  it("rend le piège à robots, la page d'origine, les messages, et le script hors éditeur", () => {
    const site = structuredClone(sampleSite);
    const contact = site.pages.find((p) => p.path === "/contact")!;
    const main = contact.root.children!.find((c) => c.type === "box")!;
    main.children!.push({ id: "frm1", type: "form", props: { formId: "frm_test", successMessage: { fr: "Bien reçu !" } }, children: [
      { id: "fld1", type: "field", props: { fieldType: "email", name: "email", label: { fr: "Email" }, required: true } },
      { id: "btn1", type: "link", props: { tag: "button", type: "submit" }, children: [{ id: "btn1t", type: "text", props: { tag: "span", content: { fr: [{ t: "text", v: "Envoyer" }] } } }] },
    ] });
    const m = matchPath(site, data, "/contact")!;
    const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: "fr", data, assets: assetMap(site), basePath: "" };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('action="/api/forms/site_marie/frm_test"');
    expect(html).toContain('name="_hp"');
    expect(html).toContain('name="_page" value="/contact"');
    expect(html).toContain('<p data-form-success="" hidden="" role="status">Bien reçu !</p>');
    expect(html).toContain('<button class="n-btn1" type="submit">');
    expect(html).toContain("<script>");
    const inEditor = renderToStaticMarkup(createElement(RenderPage, { ctx: { ...ctx, editor: true } }));
    expect(inEditor).not.toContain("<script>");
  });
});

describe("image", () => {
  it("prend le texte alternatif de la ressource quand l'élément n'en a pas", () => {
    const site = structuredClone(sampleSite);
    const home = site.pages[0]!;
    const find = (n: typeof home.root): typeof home.root | undefined => (n.id === "hero_img" ? n : (n.children ?? []).map(find).find(Boolean));
    const img = find(home.root)!;
    img.props = { ...img.props, alt: { fr: "" } };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx: { ...ctxFor("/"), site, assets: assetMap(site) } }));
    expect(html).toContain('alt="Portrait en lumière naturelle"');
  });
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

describe("classes lisibles (export)", () => {
  it("rend et style avec les noms déduits quand une carte de classes est fournie", () => {
    const classes = classMap(sampleSite);
    const ctx: RenderContext = { ...ctxFor("/"), classes };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('class="section heros"');
    expect(html).toContain('class="texte-title"');
    expect(html).not.toContain("n-hero");
    const css = siteCss(sampleSite, { classes });
    expect(css).toContain(".heros{");
    expect(css).toContain(".bouton{");
    expect(css).not.toContain(".n-hero{");
  });
});

describe("variantes de composant", () => {
  const cmp = { id: "cmp_v", name: "Bouton", scope: "site" as const, props: [], variants: [{ name: "style", values: ["primaire", "secondaire"], default: "primaire" }], root: { id: "vb", type: "box" as const, props: { tag: "div" }, children: [{ id: "vt", type: "text" as const, props: { tag: "span", content: { fr: [{ t: "text" as const, v: "ok" }] } } }] }, variantStyles: { "style:secondaire": { vb: { base: { background: "blue" } }, vt: { base: { color: "white" } } } } };
  const site = { ...sampleSite, components: [...sampleSite.components, cmp], pages: [{ ...sampleSite.pages[0]!, root: { id: "vr", type: "box" as const, props: { tag: "div" }, children: [{ id: "vi1", type: "instance" as const, props: { component: "cmp_v" } }, { id: "vi2", type: "instance" as const, props: { component: "cmp_v", variant: { style: "secondaire" } } }] } }] };
  it("pose la classe de variante sur la racine de l'instance et émet le CSS ciblé", () => {
    const ctx: RenderContext = { ...ctxFor("/"), site, page: site.pages[0]! };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('class="n-vb v-style-primaire"');
    expect(html).toContain('class="n-vb v-style-secondaire"');
    const css = siteCss(site);
    expect(css).toContain(".n-vb.v-style-secondaire{background:blue}");
    expect(css).toContain(".n-vb.v-style-secondaire .n-vt{color:white}");
  });
});

describe("base CSS", () => {
  it("ne prend jamais le pas sur le style d'un nœud (boutons et champs en :where)", () => {
    const css = siteCss(sampleSite);
    expect(css).toContain(":where(.at-page button){");
    expect(css).not.toMatch(/(^|\})\.at-page button\{/);
  });
});

describe("interactions (D31)", () => {
  it("émet data-ix avec les cibles résolues et le script, dans l'éditeur aussi", () => {
    const site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "ir", type: "box" as const, props: { tag: "div" }, children: [
      { id: "ia", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "Question" }] } }, interactions: [{ id: "ix1", trigger: { kind: "click" as const }, actions: [{ kind: "toggle" as const, target: { node: "ib" }, transition: { duration: 200, easing: "ease-out" } }] }] },
      { id: "ib", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "Réponse" }] } }, style: { base: { opacity: "0" } }, interactions: [{ id: "ix2", trigger: { kind: "inView" as const, options: { reveal: "fade", once: true } }, actions: [{ kind: "setStyle" as const, target: { self: true as const }, style: { opacity: "1" }, transition: { duration: 700, delay: 100, easing: "ease-out" } }] }] },
    ] } }] };
    const ctx: RenderContext = { ...ctxFor("/"), site, page: site.pages[0]! };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('data-ix="[{&quot;t&quot;:&quot;click&quot;,&quot;a&quot;:[{&quot;k&quot;:&quot;toggle&quot;,&quot;s&quot;:&quot;.n-ib&quot;,&quot;tr&quot;:&quot;200ms ease-out 0ms&quot;}]}]"');
    expect(html).toContain("&quot;css&quot;:&quot;opacity:1&quot;");
    expect(html).toContain("IntersectionObserver");
    const editor = renderToStaticMarkup(createElement(RenderPage, { ctx: { ...ctx, editor: true } }));
    expect(editor).toContain('data-editor=""');
    expect(editor).not.toContain("IntersectionObserver");
  });
});

describe("site d'exemple : restaurant", () => {
  it("rend chaque page, avec les entrées, les variantes et les interactions", () => {
    const data = memoryData(restaurantEntries);
    const assets = assetMap(restaurantSite);
    const css = siteCss(restaurantSite);
    expect(css).toContain(".n-rh_root.v-fond-plein{");
    for (const page of restaurantSite.pages) {
      const entry = page.kind === "template" ? restaurantEntries.find((e) => e.database === "rdb_events") : undefined;
      const ctx: RenderContext = { site: restaurantSite, page, entry, params: entry ? { slug: String(entry.values.slug) } : {}, locale: "fr", data, assets };
      const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
      expect(html.length).toBeGreaterThan(1500);
      expect(html).not.toContain("Composant introuvable");
    }
    const home = renderToStaticMarkup(createElement(RenderPage, { ctx: { site: restaurantSite, page: restaurantSite.pages[0]!, params: {}, locale: "fr", data, assets } }));
    expect(home).toContain("Agneau des Combrailles");
    expect(home).toContain("Brunch des producteurs");
    expect(home).toContain('class="n-rh_root v-fond-transparent"');
    expect(home).toContain("data-ix=");
    expect(home).toContain("IntersectionObserver");
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
  it("limité à une page : ses nœuds et les composants, pas les autres pages", () => {
    const home = siteCss(sampleSite, { pageId: "p_home" });
    expect(home).toContain(".n-hero{");
    expect(home).toContain(".n-hdr{");
    expect(home).not.toContain(".n-prj_main{");
    expect(home.length).toBeLessThan(css.length);
  });
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
