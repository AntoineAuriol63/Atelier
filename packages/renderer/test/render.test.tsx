import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { sampleSite, sampleEntries, classMap, restaurantSite, restaurantEntries, type Site } from "@atelier/model";
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
    expect(home).toContain("data-anim=");
    expect(home).toContain("IntersectionObserver");
  });
});

describe("mouvements : parallaxe, compteur, bandeau, carrousel auto", () => {
  it("émet les attributs et le script, et double le contenu d'un bandeau sans identifiant d'édition", () => {
    const site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "mr", type: "box" as const, props: { tag: "div" }, children: [
      { id: "mi", type: "image" as const, props: { asset: "as_hero", parallax: 0.3 } },
      { id: "mc", type: "text" as const, props: { tag: "span", countUp: true, content: { fr: [{ t: "text" as const, v: "12 ans" }] } } },
      { id: "mm", type: "box" as const, props: { tag: "div", marquee: 18 }, children: [{ id: "mm1", type: "text" as const, props: { tag: "span", content: { fr: [{ t: "text" as const, v: "Ouvert ce soir" }] } } }] },
      { id: "mv", type: "collection" as const, props: { database: "db_projets", view: { layout: "carousel" as const, autoplay: 4, columns: { base: 2 } } }, children: [{ id: "mvi", type: "item" as const, props: {}, children: [] }] },
    ] } }] };
    const ctx: RenderContext = { ...ctxFor("/"), site, page: site.pages[0]!, editor: true };
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx }));
    expect(html).toContain('data-parallax="0.3"');
    expect(html).toContain('data-countup=""');
    expect(html).toContain('data-autoplay="4"');
    expect((html.match(/Ouvert ce soir/g) ?? []).length).toBe(2);
    expect((html.match(/data-node="mm1"/g) ?? []).length).toBe(1);
    const pub = renderToStaticMarkup(createElement(RenderPage, { ctx: { ...ctx, editor: false } }));
    expect(pub).toContain("data-parallax");
    expect(pub).toContain("requestAnimationFrame");
    expect(siteCss(site)).toContain("@keyframes at-marquee");
  });
});

describe("placement des blocs", () => {
  it("pose une section avant le pied de page et jamais dans une section ou un lien", async () => {
    const { planInsert, indexSite } = await import("@atelier/model");
    const footer = { id: "f", type: "instance" as const, name: "Pied de page", props: { component: "cmp_footer" } };
    const deep = { id: "d1", type: "text" as const, props: { tag: "p" } };
    const main = { id: "m1", type: "box" as const, props: { tag: "main" }, children: [deep] };
    const sec = { id: "s1", type: "box" as const, props: { tag: "section" }, children: [] };
    const link = { id: "l1", type: "link" as const, props: { tag: "a", href: { kind: "url" as const, url: "#" } }, children: [] };
    const root = { id: "r", type: "box" as const, props: {}, children: [main, sec, link, footer] };
    const site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }] };
    const index = indexSite(site);
    const newSection = { id: "n", type: "box" as const, props: { tag: "section" } };
    expect(planInsert(index, root, null, "auto", newSection)).toEqual({ parent: "r", index: 3 });
    expect(planInsert(index, root, "s1", "auto", newSection)).toEqual({ parent: "r", index: 2 });
    // Depuis un élément profond (ou la région <main>), la section se pose après la région de page qui le contient.
    expect(planInsert(index, root, "d1", "auto", newSection)).toEqual({ parent: "r", index: 1 });
    expect(planInsert(index, root, "m1", "auto", newSection)).toEqual({ parent: "r", index: 1 });
    expect(planInsert(index, root, "s1", "auto", { id: "t", type: "text" as const, props: { tag: "p" } })).toEqual({ parent: "s1", index: 0 });
    expect(planInsert(index, root, "l1", "auto", link)).toEqual({ parent: "r", index: 3 });
    expect(planInsert(index, root, "f", "auto", newSection)).toEqual({ parent: "r", index: 3 });
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

const ctxOf = (site: Site, page: Site["pages"][number]): RenderContext => ({ site, page, params: {}, locale: "fr", data, assets: assetMap(site), basePath: "" });

describe("animations (section 8.4)", () => {
  it("images-clés en ligne, propriété animation par déclencheur, pause jusqu'à l'écran, survol, données pour le script", async () => {
    const { runFromPreset, presetById } = await import("@atelier/model");
    const load = runFromPreset(presetById("float")!, { id: "r1", pauseOnHover: true });
    const view = runFromPreset(presetById("fade-up")!, { id: "r2", delay: 100 });
    const hover = runFromPreset(presetById("grow")!, { id: "r3" });
    const node = { id: "a1", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "Bonjour" }] } }, animations: [load, view, hover] };
    const site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [node] } }] };
    const css = siteCss(site);
    expect(css).toContain("@keyframes ak-r1{0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}}");
    expect(css).toContain("@keyframes ak-r2{0%{opacity:0;transform:translateY(28px)}100%{opacity:1;transform:none;filter:none}}");
    expect(css).toMatch(/\.n-a1\{animation:ak-r1 3000ms ease-in-out 0ms infinite normal both,ak-r2 700ms cubic-bezier\(\.22,1,\.36,1\) 100ms 1 normal both;animation-play-state:running,paused\}/);
    expect(css).toContain(".n-a1:hover{animation-play-state:paused,paused}");
    expect(css).toContain(".n-a1:hover{animation:ak-r3 250ms ease-out 0ms 1 normal forwards}");
    expect(css).toContain(".at-page[data-editor] [data-anim]{animation:none!important}");
    const html = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxOf(site, site.pages[0]!) }));
    expect(html).toContain('data-anim="');
    expect(html).toContain("&quot;t&quot;:&quot;inView&quot;");
    expect(html).toContain("<noscript>");
    expect(html).toContain("__atelierPlay");
  });
  it("bibliothèque du site : images-clés émises une fois, run qui y renvoie", () => {
    const site = { ...sampleSite, animations: [{ id: "lib1", name: "Toupie", keyframes: [{ at: 0, style: { transform: "rotate(0deg)" } }, { at: 100, style: { transform: "rotate(360deg)" } }] }],
      pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [{ id: "a2", type: "box" as const, props: { tag: "div" }, animations: [{ id: "r9", animation: "lib1", trigger: "load" as const, duration: 8000, easing: "linear", iterations: "infinite" as const }] }] } }] };
    const css = siteCss(site);
    expect(css.match(/@keyframes an-lib1/g)).toHaveLength(1);
    expect(css).toContain(".n-a2{animation:an-lib1 8000ms linear 0ms infinite normal both;animation-play-state:running}");
  });
  it("bandeau défilant : sens, pause au survol, ancienne forme numérique", () => {
    const band = (marquee: unknown) => ({ ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [{ id: "b1", type: "box" as const, props: { tag: "div", marquee }, children: [{ id: "t", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "x" }] } } }] }] } }] });
    const h1 = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxOf(band(28), band(28).pages[0]!) }));
    expect(h1).toContain('data-marquee="left"'); expect(h1).toContain("--at-marquee:28s"); expect(h1).not.toContain("data-marquee-pause");
    const s2 = band({ duration: 12, direction: "up", pauseOnHover: true }); const h2 = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxOf(s2, s2.pages[0]!) }));
    expect(h2).toContain('data-marquee="up"'); expect(h2).toContain("data-marquee-pause"); expect(h2).toContain("--at-marquee:12s");
    expect(siteCss(band(1))).toContain("@keyframes at-marquee-up");
  });
});
