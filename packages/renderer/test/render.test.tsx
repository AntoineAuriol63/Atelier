import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { sampleSite, sampleEntries, classMap, restaurantSite, restaurantEntries, type ComponentDef, type Node, type Site } from "@atelier/model";
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
    expect(html).toContain('class="n-vb v-style-primaire n-vi1"');
    expect(html).toContain('class="n-vb v-style-secondaire n-vi2"');
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
    expect(home).toContain('class="n-rh_root v-fond-transparent n-rp_home_hdr"');
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

describe("animations (section 8.4, lignes de temps et déclencheurs)", () => {
  type Tr = import("@atelier/model").Trigger; type An = import("@atelier/model").Animation; type Tk = import("@atelier/model").Track;
  const tk = (id: string, keyframes: Tk["keyframes"], extra: Partial<Tk> = {}): Tk => ({ id, target: { trigger: true }, keyframes, ...extra });
  const an = (id: string, tracks: Tk[], extra: Partial<An> = {}): An => ({ id, name: id, duration: Math.max(...tracks.flatMap((t) => t.keyframes.map((k) => k.at))), tracks, ...extra });
  const tr = (id: string, on: Tr["on"], animation: string, extra: Partial<Tr> = {}): Tr => ({ id, on, animation, ...extra });
  const fade = (id: string, extra: Partial<Tk> = {}) => tk(id, [{ at: 0, style: { opacity: "0" } }, { at: 500, style: { opacity: "1" } }], extra);
  const page = (children: Node[], animations: An[], pageExtra: Partial<Site["pages"][number]> = {}): Site => ({ ...sampleSite, animations, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children }, ...pageExtra }] });
  const html = (site: Site, editor = false) => renderToStaticMarkup(createElement(RenderPage, { ctx: { ...ctxOf(site, site.pages[0]!), editor } }));
  const text = (id: string, v: string, extra: Partial<Node> = {}): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } }, ...extra });

  it("images-clés en ms → %, courbe par segment sur l'image qui l'ouvre, propriété animation par déclencheur, pause jusqu'à l'écran, survol", () => {
    const float = an("an_f", [tk("t_f", [{ at: 0, style: { transform: "translateY(0)" } }, { at: 1500, style: { transform: "translateY(-10px)" }, easing: "ease-in-out" }, { at: 3000, style: { transform: "translateY(0)" }, easing: "ease-in-out" }])], { loop: "infinite" });
    const up = an("an_u", [tk("t_u", [{ at: 0, style: { opacity: "0", transform: "translateY(28px)" } }, { at: 700, style: { opacity: "1", transform: "none" }, easing: "cubic-bezier(.22,1,.36,1)" }])]);
    const grow = an("an_g", [tk("t_g", [{ at: 0, style: { transform: "scale(1)" } }, { at: 250, style: { transform: "scale(1.06)" }, easing: "ease-out" }])]);
    const site = page([text("a1", "Bonjour", { triggers: [tr("r1", "load", "an_f", { pauseOnHover: true }), tr("r2", "inView", "an_u", { delay: 100 }), tr("r3", "hover", "an_g")] })], [float, up, grow]);
    const css = siteCss(site);
    expect(css).toContain("@keyframes at-an_f-t_f{0%{transform:translateY(0);animation-timing-function:ease-in-out}50%{transform:translateY(-10px);animation-timing-function:ease-in-out}100%{transform:translateY(0)}}");
    expect(css).toContain("@keyframes at-an_u-t_u{0%{opacity:0;transform:translateY(28px);animation-timing-function:cubic-bezier(.22,1,.36,1)}100%{opacity:1;transform:none}}");
    expect(css).toContain(".n-a1{animation:at-an_f-t_f 3000ms ease 0ms infinite normal both,at-an_u-t_u 700ms ease 100ms 1 normal both;animation-play-state:running,paused}");
    expect(css).toContain(".n-a1:hover{animation-play-state:paused,paused}");
    expect(css).toContain(".n-a1:hover{animation:at-an_g-t_g 250ms ease 0ms 1 normal both}");
    const h = html(site);
    expect(h).toContain('data-anim="');
    expect(h).toMatch(/&quot;i&quot;:&quot;r2&quot;,&quot;t&quot;:&quot;inView&quot;/);
    expect(h).toMatch(/&quot;tr&quot;:\[\{/);
    expect(h).toContain("<noscript>");
    expect(h).toContain("__atelierPlay");
  });
  it("une animation lancée par deux déclencheurs : images-clés émises une fois ; aller-retour et répétitions", () => {
    const sway = an("an_s", [tk("t_s", [{ at: 0, style: { transform: "rotate(-3deg)" } }, { at: 2000, style: { transform: "rotate(3deg)" } }])], { loop: 3, alternate: true });
    const site = page([{ id: "b1", type: "box", props: {}, triggers: [tr("r1", "load", "an_s")] }, { id: "b2", type: "box", props: {}, triggers: [tr("r2", "load", "an_s", { delay: 50 })] }], [sway]);
    const css = siteCss(site);
    expect(css.match(/@keyframes at-an_s-t_s/g)).toHaveLength(1);
    expect(css).toContain(".n-b1{animation:at-an_s-t_s 2000ms ease 0ms 3 alternate both;animation-play-state:running}");
    expect(css).toContain(".n-b2{animation:at-an_s-t_s 2000ms ease 50ms 3 alternate both;animation-play-state:running}");
  });
  it("une piste qui commence plus tard : durée = portée, délai = début + délai du déclencheur ; une piste à une seule image n'est pas rendue", () => {
    const a = an("an_l", [tk("t_l", [{ at: 200, style: { opacity: "0" } }, { at: 600, style: { opacity: "1" } }]), tk("t_1", [{ at: 0, style: { opacity: "0" } }])]);
    const site = page([{ id: "b", type: "box", props: {}, triggers: [tr("r1", "load", "an_l", { delay: 100 })] }], [a]);
    const css = siteCss(site);
    expect(css).toContain(".n-b{animation:at-an_l-t_l 400ms ease 300ms 1 normal both;animation-play-state:running}");
    expect(css).not.toContain("at-an_l-t_1");
  });
  it("déclencheurs de page : la racine porte l'animation", () => {
    const site = page([text("a", "x")], [an("an_p", [fade("t_p")])], { triggers: [tr("r_page", "load", "an_p")] });
    expect(siteCss(site)).toContain(".n-r{animation:at-an_p-t_p 500ms ease 0ms 1 normal both;animation-play-state:running}");
    expect(html(site)).toMatch(/class="n-r" data-anim="/);
  });
  it("cible « ses enfants » : règle sur les enfants, décalage en calc(), enfants marqués et numérotés", () => {
    const a = an("an_c", [fade("t_c", { target: { trigger: true, children: true }, stagger: { each: 80 } })]);
    const site = page([{ id: "p", type: "box", props: {}, triggers: [tr("r1", "load", "an_c", { delay: 100 })], children: [text("a", "A"), text("b", "B"), text("c", "C")] }], [a]);
    const css = siteCss(site);
    expect(css).toContain(".n-p>*{animation:at-an_c-t_c 500ms ease 100ms 1 normal both;animation-play-state:running;animation-delay:calc(100ms + var(--at-i,0)*80ms)}");
    expect(css).not.toMatch(/\.n-p\{animation/);
    const h = html(site);
    expect(h).toContain('class="n-b" data-anim-target="" style="--at-i:1;--at-n:3"');
    expect(h).toMatch(/&quot;tg&quot;:&quot;children&quot;[^\]]*&quot;st&quot;:\[80,&quot;start&quot;\]/);
  });
  it("décalage depuis la fin ou le centre : expressions CSS", () => {
    const a = an("an_e", [fade("t_e", { target: { trigger: true, children: true }, stagger: { each: 50, from: "end" } })]);
    const b = an("an_m", [fade("t_m", { target: { trigger: true, children: true }, stagger: { each: 20, from: "center" } })]);
    const site = page([{ id: "p", type: "box", props: {}, triggers: [tr("r1", "load", "an_e"), tr("r2", "hover", "an_m")], children: [text("a", "A")] }], [a, b]);
    const css = siteCss(site);
    expect(css).toContain("animation-delay:calc(0ms + (var(--at-n,1) - 1 - var(--at-i,0))*50ms)");
    expect(css).toContain(".n-p:hover>*{animation:at-an_m-t_m 500ms ease 0ms 1 normal both;animation-delay:calc(0ms + abs(var(--at-i,0) - (var(--at-n,1) - 1)/2)*20ms)}");
  });
  it("cible « un autre élément » : règle sur la cible, survol par :has(), cible marquée", () => {
    const a = an("an_n", [fade("t_n", { target: { node: "panel" } })]);
    const site = page([{ id: "btn", type: "box", props: {}, triggers: [tr("r1", "load", "an_n"), tr("r2", "hover", "an_n")] }, { id: "panel", type: "box", props: {} }], [a]);
    const css = siteCss(site);
    expect(css).toContain(".n-panel{animation:at-an_n-t_n 500ms ease 0ms 1 normal both;animation-play-state:running}");
    expect(css).toContain(".at-page:has(.n-btn:hover) .n-panel{animation:at-an_n-t_n 500ms ease 0ms 1 normal both}");
    expect(css).not.toContain(".n-btn{animation");
    const h = html(site);
    expect(h).toContain('class="n-panel" data-anim-target=""');
    expect(h).toMatch(/&quot;tg&quot;:\{&quot;s&quot;:&quot;\.n-panel&quot;\}/);
  });
  it("cible « sélecteur » : rien en CSS, tout par le script", () => {
    const a = an("an_q", [fade("t_q", { target: { selector: ".x" } })]);
    const site = page([{ id: "btn", type: "box", props: {}, triggers: [tr("r1", "load", "an_q")] }], [a]);
    expect(siteCss(site)).not.toContain(".x{animation");
    expect(siteCss(site)).not.toContain(".n-btn{animation");
    expect(html(site)).toMatch(/&quot;tg&quot;:\{&quot;s&quot;:&quot;\.x&quot;\}.*?&quot;js&quot;:1/);
  });
  it("découpage en lettres : mots et lettres en spans, espaces dehors, marques gardées, accessibilité", () => {
    const a = an("an_w", [fade("t_w", { target: { trigger: true, split: "letters" }, stagger: { each: 30 } })]);
    const site = page([{ id: "t", type: "text", props: { tag: "h1", content: { fr: [{ t: "text", v: "Bon " }, { t: "text", v: "jour", marks: ["bold"] }, { t: "text", v: " à toi" }] } }, triggers: [tr("r1", "inView", "an_w")] }], [a]);
    const h = html(site);
    expect(h).toContain('aria-label="Bon jour à toi"');
    expect((h.match(/class="at-piece"/g) ?? []).length).toBe(11);
    expect((h.match(/class="at-word"/g) ?? []).length).toBe(4);
    expect(h).toContain('<span class="at-word"><span class="at-piece" data-anim-target="" aria-hidden="true" style="--at-i:0;--at-n:11">B</span>');
    expect(h).toContain("<strong>");
    const css = siteCss(site);
    expect(css).toContain(".n-t .at-piece{animation:at-an_w-t_w 500ms ease 0ms 1 normal both;animation-play-state:paused;animation-delay:calc(0ms + var(--at-i,0)*30ms)}");
    expect(css).toContain(".at-page .at-piece,.at-page .at-word{display:inline-block}");
    expect(h).toMatch(/&quot;tg&quot;:&quot;pieces&quot;/);
  });
  it("découpage en mots ; le plus fin l'emporte ; un texte lié riche ne se découpe pas ; une piste `node` découpe aussi", () => {
    const words = an("an_1", [fade("t_1", { target: { trigger: true, split: "words" } })]);
    const letters = an("an_2", [fade("t_2", { target: { node: "t", split: "letters" } })]);
    const s1 = page([text("t", "Un deux trois", { triggers: [tr("r1", "load", "an_1")] })], [words]);
    expect((html(s1).match(/class="at-piece"/g) ?? []).length).toBe(3);
    expect(html(s1)).not.toContain("at-word"); expect(html(s1)).not.toContain("aria-label");
    const s2 = page([text("t", "Un deux", { triggers: [tr("r1", "load", "an_1")] }), { id: "o", type: "box", props: {}, triggers: [tr("r2", "click", "an_2")] }], [words, letters]);
    expect((html(s2).match(/class="at-piece"/g) ?? []).length).toBe(6);
    const bound: Node = { id: "t", type: "text", props: { tag: "div" }, bindings: { content: { source: "entry", path: "body" } }, triggers: [tr("r1", "load", "an_1")] };
    expect(html(page([bound], [words]))).not.toContain('class="at-piece"');
  });
  it("survol qui revient et clic qui bascule : joués par le script, pas de règle :hover ; ressort en linear() par segment", () => {
    const a = an("an_r", [fade("t_r")]);
    const sp = an("an_sp", [tk("t_sp", [{ at: 0, style: { opacity: "0" } }, { at: 600, style: { opacity: "1" }, easing: "spring(170, 26)" }])]);
    const site = page([{ id: "b", type: "box", props: {}, triggers: [tr("r1", "hover", "an_r", { reverseOnLeave: true }), tr("r2", "click", "an_r", { toggle: true }), tr("r3", "load", "an_sp")] }], [a, sp]);
    const css = siteCss(site);
    expect(css).not.toContain(".n-b:hover{animation");
    expect(css).toMatch(/@keyframes at-an_sp-t_sp\{0%\{opacity:0;animation-timing-function:linear\(0(,-?[0-9.]+)+,1\)\}100%\{opacity:1\}\}/);
    const h = html(site);
    expect(h).toMatch(/&quot;i&quot;:&quot;r1&quot;.*?&quot;rv&quot;:1/);
    expect(h).toMatch(/&quot;i&quot;:&quot;r2&quot;.*?&quot;tog&quot;:1/);
    expect(h).toMatch(/&quot;e&quot;:&quot;linear\(0,/);
  });
  it("dans l'éditeur, l'enveloppe d'une instance visée comme enfant est marquée elle aussi, et la racine du composant porte le rang", () => {
    const cmp: ComponentDef = { id: "cmp", name: "Carte", scope: "site", props: [], root: { id: "cmp_root", type: "box", props: {} } };
    const a = an("an_i", [fade("t_i", { target: { trigger: true, children: true }, stagger: { each: 50 } })]);
    const site: Site = { ...page([{ id: "p", type: "box", props: {}, triggers: [tr("r1", "load", "an_i")], children: [{ id: "i1", type: "instance", props: { component: "cmp" } }, { id: "i2", type: "instance", props: { component: "cmp" } }] }], [a]), components: [cmp] };
    const h = html(site, true);
    expect(h).toContain('<div data-node="i2" data-instance="cmp" data-anim-target="" style="display:contents">');
    expect(h).toContain('class="n-cmp_root n-i2" data-node="cmp_root" data-anim-target="" style="--at-i:1;--at-n:2"');
    expect(html(site)).toContain('class="n-cmp_root n-i1" data-anim-target="" style="--at-i:0;--at-n:2"');
  });
  it("une occurrence de composant peut apparaître : sa racine rendue porte sa classe et ses déclencheurs, et une piste d'un autre élément peut la viser", () => {
    const cmp: ComponentDef = { id: "cmp", name: "Chiffre", scope: "site", props: [], root: { id: "cmp_root", type: "box", props: {}, children: [text("cmp_v", "12")] } };
    const own = an("an_o", [fade("t_o")]);
    const other = an("an_b", [fade("t_b", { target: { node: "in2" } })]);
    const site: Site = { ...page([{ id: "hst", type: "box", props: {}, triggers: [tr("r2", "load", "an_b")] }, { id: "in1", type: "instance", props: { component: "cmp" }, triggers: [tr("r1", "inView", "an_o")] }, { id: "in2", type: "instance", props: { component: "cmp" } }], [own, other]), components: [cmp] };
    const h = html(site);
    expect(h).toMatch(/class="n-cmp_root n-in1" data-anim="[^"]*&quot;i&quot;:&quot;r1&quot;/);
    expect(h).toContain('class="n-cmp_root n-in2" data-anim-target=""');
    const css = siteCss(site);
    expect(css).toContain(".n-cmp_root.n-in1{animation:at-an_o-t_o 500ms ease 0ms 1 normal both;animation-play-state:paused}");
    expect(css).toContain(".n-in2{animation:at-an_b-t_b 500ms ease 0ms 1 normal both;animation-play-state:running}");
    // Dans l'éditeur, l'enveloppe garde l'identifiant d'édition ; la racine porte la classe et les déclencheurs.
    expect(html(site, true)).toMatch(/<div data-node="in1" data-instance="cmp" style="display:contents"><div class="n-cmp_root n-in1" data-node="cmp_root" data-anim="/);
  });
  it("occurrence de composant : son style et ses animations l'emportent sur ceux de la racine, sans les effacer", () => {
    const cmp: ComponentDef = { id: "cmp", name: "Chiffre", scope: "site", props: [], root: { id: "cmp_root", type: "box", props: {}, style: { base: { background: "white" } }, triggers: [tr("r_l", "load", "an_l")] } };
    const loopA = an("an_l", [tk("t_l", [{ at: 0, style: { transform: "scale(1)" } }, { at: 1600, style: { transform: "scale(1.05)" } }])], { loop: "infinite" });
    const site: Site = { ...page([{ id: "in1", type: "instance", props: { component: "cmp" }, style: { base: { background: "red" } }, triggers: [tr("r1", "inView", "an_o")] }], [loopA, an("an_o", [fade("t_o")])]), components: [cmp] };
    const css = siteCss(site);
    expect(css).toContain(".n-cmp_root.n-in1{background:red}");
    expect(css).toContain(".n-cmp_root.n-in1{animation:at-an_l-t_l 1600ms ease 0ms infinite normal both,at-an_o-t_o 500ms ease 0ms 1 normal both;animation-play-state:running,paused}");
    expect(css).toContain(".n-cmp_root{animation:at-an_l-t_l 1600ms ease 0ms infinite normal both;animation-play-state:running}");
  });
  it("un élément placé dans l'emplacement d'une occurrence, visé par une piste, est marqué comme cible ; le script est émis", () => {
    const cmp: ComponentDef = { id: "cmp", name: "Carte", scope: "site", props: [], root: { id: "cmp_root", type: "box", props: {}, children: [{ id: "cmp_slot", type: "slot", props: { name: "default" }, children: [] }] } };
    const seq = an("an_s", [fade("t_t"), fade("t_p", { target: { node: "s_par" }, start: { after: "t_t" } })]);
    const site: Site = { ...page([{ id: "in1", type: "instance", props: { component: "cmp", slots: { default: [text("s_ttl", "Titre", { triggers: [tr("r1", "inView", "an_s")] }), text("s_par", "Texte")] } } }], [seq]), components: [cmp] };
    const h = html(site);
    expect(h).toContain('class="n-s_par" data-anim-target=""');
    expect(h).toContain("<script>");
  });
  it("les règles éditeur, réduire les animations et sans script couvrent les cibles ; bandeau inchangé", () => {
    const site = page([text("t", "x", { triggers: [tr("r1", "load", "an_z")] })], [an("an_z", [fade("t_z")])]);
    const css = siteCss(site);
    expect(css).toContain(".at-page[data-editor] [data-anim],.at-page[data-editor] [data-anim-target]{animation:none!important}");
    expect(css).toMatch(/prefers-reduced-motion:reduce\)\{[^}]*\.at-page \[data-anim\],\.at-page \[data-anim-target\]\{animation:none!important\}/);
    expect(html(site)).toContain("<noscript><style>.at-page [data-anim],.at-page [data-anim-target]{animation:none!important}</style></noscript>");
    const band = (marquee: unknown) => ({ ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [{ id: "b1", type: "box" as const, props: { tag: "div", marquee }, children: [text("t", "x")] }] } }] });
    const h1 = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxOf(band(28), band(28).pages[0]!) }));
    expect(h1).toContain('data-marquee="left"'); expect(h1).toContain("--at-marquee:28s");
    const s2 = band({ duration: 12, direction: "up", pauseOnHover: true }); const h2 = renderToStaticMarkup(createElement(RenderPage, { ctx: ctxOf(s2, s2.pages[0]!) }));
    expect(h2).toContain('data-marquee="up"'); expect(h2).toContain("data-marquee-pause");
  });
});
