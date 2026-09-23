/**
 * Deuxième site d'exemple (D10, revue point 15) : un restaurant, d'une nature différente de la vitrine de photographe.
 * Carte en base de données, événements avec page par entrée, réservation par formulaire, composants avec propriétés et variantes,
 * apparitions au défilement, questions dépliables, ancres. Sert de gabarit « Exemple restaurant » à la création d'un site.
 */
import type { Entry, Inline, Node, Site, StyleProps } from "./types";
import { planHiddenAtLoad, toggleInteraction, type RevealKind } from "./interactions";
import { animationFromPreset, presetById } from "./animations";
import type { Animation } from "./types";

const fr = (text: string): Record<string, Inline[]> => ({ fr: [{ t: "text", v: text }] });
const T = (id: string, tag: string, content: string, extra: Partial<Node> = {}): Node => ({ id, type: "text", props: { tag, content: fr(content) }, ...extra });
const B = (id: string, name: string | undefined, tag: string, base: StyleProps, children: Node[], extra: Partial<Node> = {}): Node => ({ id, type: "box", name, props: { tag }, style: { ...(extra.style ?? {}), base: { ...base, ...(extra.style?.base ?? {}) } }, children, ...(({ style: _s, ...rest }) => rest)(extra) });
const IMG = (id: string, asset: string, ratio: string, extra: Partial<Node> = {}): Node => ({ id, type: "image", props: { asset, alt: { fr: "" }, fit: "cover", ratio }, ...extra });
const BTN = (id: string, label: string, href: Node["props"]["href"], shared = "rs_button", extra: Partial<Node> = {}): Node => ({ id, type: "link", name: label, props: { tag: "a", href }, style: { shared: [shared] }, children: [T(`${id}_t`, "span", label)], ...extra });
const bind = (id: string, tag: string, field: string, source: "item" | "entry" = "item", extra: Partial<Node> = {}): Node => ({ id, type: "text", props: { tag, content: fr(field) }, bindings: { content: { source, path: field } }, ...extra });
/** Apparition : état de départ dans le style, interaction à l'entrée dans l'écran. */
const RESTAURANT_ANIMATIONS: Animation[] = [];
const reveal = (node: Node, kind: RevealKind, delay = 0, duration = 800): Node => {
  const animation = animationFromPreset(presetById(kind)!, { id: `an_${node.id}`, duration, trackId: `tk_${node.id}` });
  RESTAURANT_ANIMATIONS.push(animation);
  return { ...node, triggers: [...(node.triggers ?? []), { id: `ix_${node.id}`, on: "inView", animation: animation.id, ...(delay ? { delay } : {}) }] };
};
const tok = (t: string) => ({ token: t });
const section = (id: string, name: string, base: StyleProps, children: Node[], extra: Partial<Node> = {}): Node => B(id, name, "section", base, children, { ...extra, style: { shared: ["rs_section"], ...(extra.style ?? {}) } });
const container = (id: string, base: StyleProps, children: Node[], extra: Partial<Node> = {}): Node => B(id, "Contenu", "div", base, children, { ...extra, style: { shared: ["rs_container"], ...(extra.style ?? {}) } });

const header: Node = {
  id: "rh_root", type: "box", name: "En-tête", props: { tag: "header" },
  style: { base: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: tok("space.5"), paddingTop: tok("space.4"), paddingBottom: tok("space.4"), paddingLeft: tok("space.6"), paddingRight: tok("space.6"), position: "sticky", top: "0", zIndex: "20", backdropFilter: "blur(12px)", transition: "background .3s ease, border-color .3s ease" }, breakpoints: { mobile: { paddingLeft: tok("space.4"), paddingRight: tok("space.4") } } },
  children: [
    { id: "rh_logo", type: "link", name: "Logo", props: { tag: "a", href: { kind: "page", page: "rp_home" } }, style: { base: { fontFamily: tok("font.display"), fontSize: tok("fontSize.lg"), fontWeight: "600", textDecoration: "none", letterSpacing: "0.02em" } }, children: [T("rh_logo_t", "span", "Maison Aurèle")] },
    { id: "rh_nav", type: "box", name: "Navigation", props: { tag: "nav" }, style: { base: { display: "flex", alignItems: "center", gap: tok("space.5"), fontSize: tok("fontSize.sm") }, breakpoints: { mobile: { display: "none" } } }, children: [
      { id: "rh_n1", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_carte" } }, style: { shared: ["rs_navlink"] }, children: [T("rh_n1_t", "span", "La carte")] },
      { id: "rh_n2", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_events" } }, style: { shared: ["rs_navlink"] }, children: [T("rh_n2_t", "span", "Événements")] },
      { id: "rh_n3", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_about" } }, style: { shared: ["rs_navlink"] }, children: [T("rh_n3_t", "span", "La maison")] },
    ] },
    BTN("rh_cta", "Réserver", { kind: "page", page: "rp_reserve" }, "rs_button", { style: { shared: ["rs_button"], base: { paddingTop: tok("space.2"), paddingBottom: tok("space.2") } } }),
  ],
};

const footer: Node = {
  id: "rf_root", type: "box", name: "Pied de page", props: { tag: "footer" },
  style: { shared: ["rs_section"], base: { borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: tok("color.line"), background: tok("color.surface") } },
  children: [container("rf_in", { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: tok("space.8") }, [
    B("rf_c1", "Adresse", "div", { display: "flex", flexDirection: "column", gap: tok("space.3") }, [
      T("rf_brand", "p", "Maison Aurèle", { style: { base: { fontFamily: tok("font.display"), fontSize: tok("fontSize.xl") } } }),
      T("rf_addr", "p", "14 rue des Gras, 63000 Clermont-Ferrand", { style: { shared: ["rs_muted"] } }),
      T("rf_tel", "p", "04 73 00 00 00 · bonjour@maisonaurele.fr", { style: { shared: ["rs_muted"] } }),
    ]),
    B("rf_c2", "Horaires", "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [
      T("rf_h_t", "p", "Horaires", { style: { shared: ["rs_eyebrow"] } }),
      T("rf_h1", "p", "Mardi – samedi, 12h – 14h"), T("rf_h2", "p", "Jeudi – samedi, 19h – 22h30"), T("rf_h3", "p", "Fermé dimanche et lundi", { style: { shared: ["rs_muted"] } }),
    ]),
    B("rf_c3", "Liens", "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [
      T("rf_l_t", "p", "Explorer", { style: { shared: ["rs_eyebrow"] } }),
      { id: "rf_l1", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_carte" } }, style: { shared: ["rs_navlink"] }, children: [T("rf_l1_t", "span", "La carte")] },
      { id: "rf_l2", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_events" } }, style: { shared: ["rs_navlink"] }, children: [T("rf_l2_t", "span", "Événements")] },
      { id: "rf_l3", type: "link", props: { tag: "a", href: { kind: "page", page: "rp_reserve" } }, style: { shared: ["rs_navlink"] }, children: [T("rf_l3_t", "span", "Réserver une table")] },
    ]),
  ], { style: { breakpoints: { mobile: { gridTemplateColumns: "1fr" } } } })],
};

/** Témoignage : propriétés citation, auteur, rôle. */
const testimonial: Node = {
  id: "rt_root", type: "box", name: "Témoignage", props: { tag: "figure" },
  style: { shared: ["rs_card"], base: { display: "flex", flexDirection: "column", gap: tok("space.4"), padding: "2rem", margin: "0", position: "relative" } },
  children: [
    T("rt_mark", "span", "“", { style: { base: { fontFamily: tok("font.display"), fontSize: "4rem", lineHeight: "0.6", color: tok("color.accent"), opacity: "0.6" } } }),
    { id: "rt_quote", type: "text", props: { tag: "blockquote", content: fr("Une cuisine qui raconte le pays.") }, bindings: { content: { source: "prop", path: "quote" } }, style: { base: { borderLeftWidth: "0", paddingLeft: "0", maxWidth: "none", fontSize: tok("fontSize.lg") } } },
    B("rt_who", undefined, "figcaption", { display: "flex", flexDirection: "column", gap: "0.1rem" }, [
      { id: "rt_author", type: "text", props: { tag: "span", content: fr("Camille") }, bindings: { content: { source: "prop", path: "author" } }, style: { base: { fontWeight: "600" } } },
      { id: "rt_role", type: "text", props: { tag: "span", content: fr("Cliente") }, bindings: { content: { source: "prop", path: "role" } }, style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } },
    ]),
  ],
};

/** Chiffre clé : valeur et libellé. */
const stat: Node = {
  id: "rk_root", type: "box", name: "Chiffre clé", props: { tag: "div" },
  style: { base: { display: "flex", flexDirection: "column", gap: tok("space.1") } },
  children: [
    { id: "rk_value", type: "text", props: { tag: "span", countUp: true, content: fr("12") }, bindings: { content: { source: "prop", path: "value" } }, style: { base: { fontFamily: tok("font.display"), fontSize: tok("fontSize.3xl"), lineHeight: "1", color: tok("color.accent") } } },
    { id: "rk_label", type: "text", props: { tag: "span", content: fr("années") }, bindings: { content: { source: "prop", path: "label" } }, style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } },
  ],
};

/** Bandeau de réservation : titre et texte, variante de ton. */
const banner: Node = {
  id: "rb_root", type: "box", name: "Bandeau réservation", props: { tag: "section" },
  style: { shared: ["rs_section"], base: { background: tok("color.accent"), color: tok("color.accentInk"), textAlign: "center", transition: "background .4s ease, color .4s ease" } },
  children: [container("rb_in", { display: "flex", flexDirection: "column", alignItems: "center", gap: tok("space.4"), maxWidth: tok("width.narrow") }, [
    { id: "rb_title", type: "text", props: { tag: "h2", content: fr("Une table pour ce soir ?") }, bindings: { content: { source: "prop", path: "title" } }, style: { base: { color: "inherit" } } },
    { id: "rb_text", type: "text", props: { tag: "p", content: fr("Réservez en deux minutes.") }, bindings: { content: { source: "prop", path: "text" } }, style: { base: { opacity: "0.85" } } },
    BTN("rb_cta", "Réserver une table", { kind: "page", page: "rp_reserve" }, "rs_button_inverse"),
  ])],
};

const dishItem = (idp: string, withImage: boolean): Node => ({
  id: `${idp}_item`, type: "item", name: "Carte plat", props: {},
  style: { shared: ["rs_card"], base: { display: "flex", flexDirection: "column", gap: tok("space.3"), padding: withImage ? "0" : "1.25rem 1.5rem", overflow: "hidden" } },
  children: [
    ...(withImage ? [{ id: `${idp}_img`, type: "image" as const, props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 3" }, bindings: { asset: { source: "item" as const, path: "image" } }, style: { base: { transition: "transform .6s cubic-bezier(.22,1,.36,1)" }, states: { hover: { transform: "scale(1.04)" } } } }] : []),
    B(`${idp}_body`, undefined, "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), padding: withImage ? "1.25rem 1.5rem 1.5rem" : "0" }, [
      B(`${idp}_row`, undefined, "div", { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: tok("space.4") }, [
        bind(`${idp}_name`, "h3", "name", "item", { style: { base: { fontSize: tok("fontSize.lg") } } }),
        { id: `${idp}_price`, type: "text", props: { tag: "span", content: { fr: [{ t: "bind", binding: { source: "item", path: "price" } }, { t: "text", v: " €" }] } }, style: { base: { fontFamily: tok("font.display"), fontSize: tok("fontSize.lg"), color: tok("color.accent"), whiteSpace: "nowrap" } } },
      ]),
      bind(`${idp}_desc`, "p", "description", "item", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } }),
    ]),
  ],
});
const dishes = (idp: string, filter: { field: string; op: "eq" | "contains"; value: unknown } | undefined, layout: "gallery" | "list", limit?: number, columns = 3): Node => ({
  id: `${idp}_list`, type: "collection", name: "Plats", props: { database: "rdb_plats", view: { layout, filter: filter ? { and: [filter] } : undefined, sort: [{ field: "position", dir: "asc" }], limit, columns: layout === "gallery" ? { base: columns, tablet: 2, small: 1 } : { base: 2, tablet: 1 } } },
  style: { base: { gap: tok("space.5") } },
  children: [dishItem(idp, layout === "gallery")],
});

const eventItem = (idp: string): Node => ({
  id: `${idp}_item`, type: "item", name: "Carte événement", props: {},
  style: { shared: ["rs_card"], base: { display: "flex", flexDirection: "column", overflow: "hidden" } },
  children: [
    { id: `${idp}_link`, type: "link", props: { tag: "a", href: { kind: "page", page: "rp_event" } }, bindings: { href: { source: "item", path: "$url" } }, style: { base: { textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" } }, children: [
      { id: `${idp}_img`, type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "16 / 10" }, bindings: { asset: { source: "item", path: "image" } }, style: { base: { transition: "transform .6s cubic-bezier(.22,1,.36,1)" }, states: { hover: { transform: "scale(1.04)" } } } },
      B(`${idp}_body`, undefined, "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), padding: "1.25rem 1.5rem 1.5rem" }, [
        bind(`${idp}_date`, "p", "dateLabel", "item", { style: { shared: ["rs_eyebrow"] } }),
        bind(`${idp}_title`, "h3", "title", "item", { style: { base: { fontSize: tok("fontSize.xl") } } }),
        bind(`${idp}_desc`, "p", "description", "item", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } }),
        { id: `${idp}_price`, type: "text", props: { tag: "span", content: { fr: [{ t: "bind", binding: { source: "item", path: "price" } }, { t: "text", v: " € par personne" }] } }, style: { base: { color: tok("color.accent"), fontWeight: "600", fontSize: tok("fontSize.sm") } } },
      ]),
    ] },
  ],
});

const faq = (id: string, q: string, a: string): Node => B(id, `Question · ${q.slice(0, 24)}`, "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), paddingTop: tok("space.4"), paddingBottom: tok("space.4"), borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: tok("color.line") }, [
  T(`${id}_q`, "h3", q, { name: "Question", style: { base: { fontSize: tok("fontSize.lg"), cursor: "pointer", display: "flex", justifyContent: "space-between", gap: tok("space.4"), transition: "color .2s" }, states: { hover: { color: tok("color.accent") } } }, interactions: [toggleInteraction("click", { node: `${id}_a` }, "toggle", `ix_${id}`)] }),
  hiddenAtLoad(T(`${id}_a`, "p", a, { name: "Réponse", style: { shared: ["rs_muted"] } })),
]);
/** Masqué tant qu'on ne clique pas la question. */
function hiddenAtLoad(node: Node): Node {
  const op = planHiddenAtLoad(node, true)[0]!;
  return { ...node, interactions: (op as { value: Node["interactions"] }).value };
}

export const restaurantSite: Site = {
  schemaVersion: 3,
  id: "site_aurele",
  name: "Maison Aurèle",
  settings: {
    defaultLocale: "fr", locales: ["fr"],
    breakpoints: [{ id: "tablet", name: "Tablette", maxWidth: 991 }, { id: "mobile", name: "Mobile", maxWidth: 767 }, { id: "small", name: "Petit mobile", maxWidth: 479 }],
    layoutGrid: { columns: 12, gutter: tok("space.5"), margin: tok("space.6"), maxWidth: tok("width.content"), byBreakpoint: { tablet: { columns: 8 }, mobile: { columns: 4, margin: tok("space.4") }, small: { columns: 4 } } },
    seo: { titleSuffix: { fr: " · Maison Aurèle" }, description: { fr: "Restaurant bistronomique à Clermont-Ferrand : une carte courte, des produits d'Auvergne, des soirées à thème." } },
  },
  theme: {
    tokens: {
      color: {
        bg: { light: "#FAF6EF", dark: "#141110" }, surface: { light: "#FFFFFF", dark: "#1E1A17" }, ink: { light: "#1E1913", dark: "#F3EBDD" },
        muted: { light: "#6F675C", dark: "#A89F91" }, line: { light: "#E8E0D2", dark: "#2E2823" }, accent: { light: "#B5702A", dark: "#D9A05B" }, accentInk: { light: "#FFFFFF", dark: "#1A1410" },
      },
      font: { display: "'Fraunces', Georgia, serif", body: "'Manrope', system-ui, sans-serif" },
      fontSize: { xs: "0.78rem", sm: "0.9rem", md: "1rem", lg: "1.2rem", xl: "1.6rem", "2xl": "clamp(2rem, 1.3rem + 2.4vw, 2.8rem)", "3xl": "clamp(2.6rem, 1.4rem + 4.2vw, 4.4rem)" },
      lineHeight: { tight: "1.05", normal: "1.6", loose: "1.8" },
      space: { 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.5rem", 6: "2rem", 8: "3rem", 10: "4rem", 12: "6rem", 16: "8rem" },
      radius: { sm: "4px", md: "10px", lg: "18px", full: "999px" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,.08)", md: "0 18px 40px rgba(0,0,0,.18)" },
      width: { content: "74rem", narrow: "42rem" },
    },
    modes: [{ id: "dark", name: "Sombre" }, { id: "light", name: "Clair" }],
    defaultMode: "dark",
    typeDefaults: {
      body: { fontFamily: tok("font.body"), fontSize: tok("fontSize.md"), lineHeight: tok("lineHeight.normal"), color: tok("color.ink"), background: tok("color.bg") },
      h1: { fontFamily: tok("font.display"), fontSize: tok("fontSize.3xl"), lineHeight: tok("lineHeight.tight"), fontWeight: "500", letterSpacing: "-0.02em" },
      h2: { fontFamily: tok("font.display"), fontSize: tok("fontSize.2xl"), lineHeight: tok("lineHeight.tight"), fontWeight: "500", letterSpacing: "-0.01em" },
      h3: { fontFamily: tok("font.display"), fontSize: tok("fontSize.xl"), lineHeight: tok("lineHeight.tight"), fontWeight: "500" },
      p: { maxWidth: "62ch" },
      blockquote: { fontFamily: tok("font.display"), fontSize: tok("fontSize.xl"), lineHeight: "1.3", fontStyle: "italic", maxWidth: "40ch", paddingLeft: tok("space.5"), borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: tok("color.accent"), margin: "0" },
      a: { color: "inherit" },
      image: { display: "block", width: "100%", height: "auto" },
    },
    fonts: [
      { family: "Fraunces", provider: "google", weights: [500, 600], fallback: "Georgia, serif" },
      { family: "Manrope", provider: "google", weights: [400, 500, 600], fallback: "system-ui, sans-serif" },
    ],
  },
  sharedStyles: [
    { id: "rs_section", name: "Section", style: { base: { paddingTop: tok("space.12"), paddingBottom: tok("space.12"), paddingLeft: tok("space.6"), paddingRight: tok("space.6") }, breakpoints: { mobile: { paddingTop: tok("space.8"), paddingBottom: tok("space.8"), paddingLeft: tok("space.4"), paddingRight: tok("space.4") } } } },
    { id: "rs_container", name: "Conteneur", style: { base: { width: "100%", maxWidth: tok("width.content"), marginLeft: "auto", marginRight: "auto" } } },
    { id: "rs_button", name: "Bouton", style: { base: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: tok("space.2"), paddingTop: tok("space.3"), paddingBottom: tok("space.3"), paddingLeft: tok("space.6"), paddingRight: tok("space.6"), background: tok("color.accent"), color: tok("color.accentInk"), borderRadius: tok("radius.full"), textDecoration: "none", fontWeight: "600", fontSize: tok("fontSize.sm"), letterSpacing: "0.02em", transition: "transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, opacity .2s" }, states: { hover: { transform: "translateY(-2px)", boxShadow: tok("shadow.md") }, active: { transform: "translateY(0)" } } } },
    { id: "rs_button_secondary", name: "Bouton / secondaire", extends: "rs_button", style: { base: { background: "transparent", color: tok("color.ink"), borderWidth: "1px", borderStyle: "solid", borderColor: tok("color.line") }, states: { hover: { borderColor: tok("color.accent"), color: tok("color.accent") } } } },
    { id: "rs_button_inverse", name: "Bouton / inversé", extends: "rs_button", style: { base: { background: tok("color.bg"), color: tok("color.ink") } } },
    { id: "rs_navlink", name: "Lien de navigation", style: { base: { textDecoration: "none", color: tok("color.muted"), transition: "color .2s" }, states: { hover: { color: tok("color.ink") }, current: { color: tok("color.accent") } } } },
    { id: "rs_eyebrow", name: "Surtitre", style: { base: { fontSize: tok("fontSize.xs"), letterSpacing: "0.18em", textTransform: "uppercase", color: tok("color.accent"), fontWeight: "600" } } },
    { id: "rs_muted", name: "Texte atténué", style: { base: { color: tok("color.muted") } } },
    { id: "rs_card", name: "Carte", style: { base: { background: tok("color.surface"), borderWidth: "1px", borderStyle: "solid", borderColor: tok("color.line"), borderRadius: tok("radius.lg"), transition: "transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .3s" }, states: { hover: { transform: "translateY(-6px)", boxShadow: tok("shadow.md"), borderColor: tok("color.accent") } } } },
    { id: "rs_badge", name: "Étiquette", style: { base: { display: "inline-flex", alignItems: "center", gap: tok("space.1"), fontSize: tok("fontSize.xs"), paddingTop: "0.2rem", paddingBottom: "0.2rem", paddingLeft: tok("space.3"), paddingRight: tok("space.3"), borderRadius: tok("radius.full"), borderWidth: "1px", borderStyle: "solid", borderColor: tok("color.line"), color: tok("color.muted") } } },
  ],
  components: [
    { id: "rcmp_header", name: "En-tête", scope: "site", props: [], variants: [{ name: "fond", values: ["transparent", "plein"], default: "transparent" }], variantStyles: { "fond:plein": { rh_root: { base: { background: tok("color.surface"), borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: tok("color.line") } } } }, root: header },
    { id: "rcmp_footer", name: "Pied de page", scope: "site", props: [], root: footer },
    { id: "rcmp_testimonial", name: "Témoignage", scope: "site", props: [{ name: "quote", label: { fr: "Citation" }, type: "text", default: "Une cuisine qui raconte le pays." }, { name: "author", label: { fr: "Auteur" }, type: "text", default: "Camille" }, { name: "role", label: { fr: "Rôle" }, type: "text", default: "Cliente" }], root: testimonial },
    { id: "rcmp_stat", name: "Chiffre clé", scope: "site", props: [{ name: "value", label: { fr: "Valeur" }, type: "text", default: "12" }, { name: "label", label: { fr: "Libellé" }, type: "text", default: "années" }], root: stat },
    { id: "rcmp_banner", name: "Bandeau réservation", scope: "site", props: [{ name: "title", label: { fr: "Titre" }, type: "text", default: "Une table pour ce soir ?" }, { name: "text", label: { fr: "Texte" }, type: "text", default: "Réservez en deux minutes, nous vous confirmons par email." }], variants: [{ name: "ton", values: ["accent", "sombre"], default: "accent" }], variantStyles: { "ton:sombre": { rb_root: { base: { background: tok("color.surface"), color: tok("color.ink") } } } }, root: banner },
  ],
  codeComponents: [],
  databases: [
    {
      id: "rdb_plats", name: { fr: "Plats" }, slug: "plats", titleField: "name",
      fields: [
        { name: "name", label: { fr: "Nom" }, type: "text", required: true },
        { name: "description", label: { fr: "Description" }, type: "text" },
        { name: "price", label: { fr: "Prix (€)" }, type: "number", required: true },
        { name: "category", label: { fr: "Catégorie" }, type: "select", required: true, options: [{ value: "entrees", label: { fr: "Entrées" } }, { value: "plats", label: { fr: "Plats" } }, { value: "desserts", label: { fr: "Desserts" } }, { value: "boissons", label: { fr: "Boissons" } }] },
        { name: "tags", label: { fr: "Étiquettes" }, type: "multiSelect", options: [{ value: "signature", label: { fr: "Signature" } }, { value: "vegetarien", label: { fr: "Végétarien" } }, { value: "sans-gluten", label: { fr: "Sans gluten" } }] },
        { name: "image", label: { fr: "Photo" }, type: "image" },
        { name: "available", label: { fr: "Disponible" }, type: "boolean" },
        { name: "position", label: { fr: "Ordre" }, type: "position" },
      ],
    },
    {
      id: "rdb_events", name: { fr: "Événements" }, slug: "evenements", titleField: "title", slugField: "slug", structuredDataType: "Event",
      pageTemplates: [{ page: "rp_event", slugPattern: "/evenements/{slug}" }],
      fields: [
        { name: "title", label: { fr: "Titre" }, type: "text", required: true },
        { name: "slug", label: { fr: "Adresse" }, type: "text", required: true },
        { name: "date", label: { fr: "Date" }, type: "date", required: true },
        { name: "dateLabel", label: { fr: "Date affichée" }, type: "text" },
        { name: "description", label: { fr: "Résumé" }, type: "text" },
        { name: "body", label: { fr: "Programme" }, type: "richtext" },
        { name: "image", label: { fr: "Photo" }, type: "image" },
        { name: "price", label: { fr: "Prix par personne (€)" }, type: "number" },
        { name: "seats", label: { fr: "Places" }, type: "number" },
        { name: "position", label: { fr: "Ordre" }, type: "position" },
      ],
    },
  ],
  animations: RESTAURANT_ANIMATIONS,
  pages: [
    {
      id: "rp_home", name: { fr: "Accueil" }, path: "/", kind: "static",
      seo: { title: { fr: "Restaurant bistronomique à Clermont-Ferrand" } },
      root: B("rp_home_root", "Page", "div", {}, [
        { id: "rp_home_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header" } },
        section("rh_hero", "Héros", { paddingTop: tok("space.10"), paddingBottom: tok("space.16") }, [container("rh_hero_in", { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: tok("space.10"), alignItems: "center" }, [
          B("rh_hero_txt", "Texte", "div", { display: "flex", flexDirection: "column", gap: tok("space.5"), alignItems: "flex-start" }, [
            reveal(T("rh_hero_eyebrow", "p", "Bistronomie · Clermont-Ferrand", { style: { shared: ["rs_eyebrow"] } }), "fade-up", 0),
            reveal(T("rh_hero_h1", "h1", "Le goût de l'Auvergne, sans cérémonie."), "fade-up", 120),
            reveal(T("rh_hero_p", "p", "Une carte courte qui change avec les saisons, des producteurs à moins de cinquante kilomètres, et une salle où l'on reste longtemps. Le soir, du jeudi au samedi.", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.lg") } } }), "fade-up", 240),
            reveal(B("rh_hero_cta", "Boutons", "div", { display: "flex", gap: tok("space.3"), flexWrap: "wrap" }, [
              BTN("rh_hero_b1", "Réserver une table", { kind: "page", page: "rp_reserve" }),
              BTN("rh_hero_b2", "Voir la carte", { kind: "anchor", node: "carte" }, "rs_button_secondary"),
            ]), "fade-up", 360),
          ]),
          reveal(B("rh_hero_visual", "Visuel", "div", { position: "relative" }, [
            IMG("rh_hero_img", "ras_hero", "4 / 5", { name: "Photo", props: { asset: "ras_hero", alt: { fr: "" }, priority: true, fit: "cover", ratio: "4 / 5", parallax: 0.15 }, style: { base: { borderRadius: tok("radius.lg"), overflow: "hidden", boxShadow: tok("shadow.md") } } }),
            B("rh_hero_badge", "Pastille", "div", { position: "absolute", left: "-1.5rem", bottom: "2rem", background: tok("color.surface"), borderRadius: tok("radius.md"), padding: "1rem 1.25rem", boxShadow: tok("shadow.md"), display: "flex", flexDirection: "column", gap: "0.1rem" }, [
              T("rh_hero_badge_v", "span", "Bib Gourmand", { style: { base: { fontFamily: tok("font.display"), fontSize: tok("fontSize.lg") } } }),
              T("rh_hero_badge_l", "span", "Guide 2026", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.xs") } } }),
            ], { style: { breakpoints: { mobile: { left: "1rem", bottom: "1rem" } } } }),
          ]), "zoom", 200, 1000),
        ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })]),
        B("rh_band", "Bandeau", "div", { display: "flex", gap: tok("space.10"), paddingTop: tok("space.4"), paddingBottom: tok("space.4"), borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: tok("color.line"), borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: tok("color.line"), whiteSpace: "nowrap" },
          ["Produits d'Auvergne", "Carte courte, saisonnière", "Vins nature et bières locales", "Cuisine ouverte sur la salle", "Ouvert du mardi au samedi", "Bib Gourmand 2026"].map((t, i) => T(`rh_band_${i + 1}`, "p", `${t}  ·`, { style: { shared: ["rs_eyebrow"] } })),
          { props: { tag: "div", marquee: { duration: 28, pauseOnHover: true } } }),
        section("rh_about", "La maison", { background: tok("color.surface") }, [container("rh_about_in", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: tok("space.10"), alignItems: "center" }, [
          reveal(IMG("rh_about_img", "ras_salle", "3 / 4", { name: "Photo de la salle", style: { base: { borderRadius: tok("radius.lg"), overflow: "hidden" } } }), "slide-right"),
          B("rh_about_txt", "Texte", "div", { display: "flex", flexDirection: "column", gap: tok("space.5") }, [
            reveal(T("rh_about_eyebrow", "p", "La maison", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
            reveal(T("rh_about_h2", "h2", "Une cuisine de produits, servie sans chichi."), "fade-up", 100),
            reveal(T("rh_about_p", "p", "Aurèle et Nils ont ouvert la maison en 2014 dans une ancienne quincaillerie. Depuis, la carte se réécrit chaque saison avec les mêmes producteurs : la ferme des Combrailles pour l'agneau, le maraîcher de Lempdes pour les légumes, la fromagerie du Puy pour le saint-nectaire.", { style: { shared: ["rs_muted"] } }), "fade-up", 200),
            reveal(B("rh_stats", "Chiffres", "div", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: tok("space.6"), paddingTop: tok("space.4"), borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: tok("color.line") }, [
              { id: "rh_stat1", type: "instance", name: "Années", props: { component: "rcmp_stat", values: { value: "12", label: "années de service" } } },
              { id: "rh_stat2", type: "instance", name: "Couverts", props: { component: "rcmp_stat", values: { value: "38", label: "couverts par service" } } },
              { id: "rh_stat3", type: "instance", name: "Producteurs", props: { component: "rcmp_stat", values: { value: "14", label: "producteurs partenaires" } } },
            ]), "fade-up", 300),
          ]),
        ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })]),
        section("rh_menu", "À la carte", {}, [container("rh_menu_in", { display: "flex", flexDirection: "column", gap: tok("space.8") }, [
          reveal(B("rh_menu_head", "Titre de section", "div", { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: tok("space.5"), flexWrap: "wrap" }, [
            B("rh_menu_head_txt", undefined, "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [T("rh_menu_eyebrow", "p", "Cette saison", { style: { shared: ["rs_eyebrow"] } }), T("rh_menu_h2", "h2", "Quelques plats signature")]),
            BTN("rh_menu_more", "Toute la carte", { kind: "page", page: "rp_carte" }, "rs_button_secondary"),
          ]), "fade-up"),
          reveal(dishes("rh_dishes", { field: "tags", op: "contains", value: "signature" }, "gallery", 3), "fade-up", 150),
        ])], { props: { tag: "section", anchor: "carte" } }),
        section("rh_events", "Événements", { background: tok("color.surface") }, [container("rh_events_in", { display: "flex", flexDirection: "column", gap: tok("space.8") }, [
          reveal(B("rh_events_head", "Titre de section", "div", { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: tok("space.5"), flexWrap: "wrap" }, [
            B("rh_events_head_txt", undefined, "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [T("rh_events_eyebrow", "p", "Prochainement", { style: { shared: ["rs_eyebrow"] } }), T("rh_events_h2", "h2", "Les soirées de la maison")]),
            BTN("rh_events_more", "Tous les événements", { kind: "page", page: "rp_events" }, "rs_button_secondary"),
          ]), "fade-up"),
          reveal({ id: "rh_ev_list", type: "collection", name: "Événements", props: { database: "rdb_events", view: { layout: "carousel", sort: [{ field: "date", dir: "asc" }], autoplay: 4, columns: { base: 3, tablet: 2, small: 1 } } }, style: { base: { gap: tok("space.5") } }, children: [eventItem("rh_ev")] }, "fade-up", 150),
        ])]),
        section("rh_voices", "Témoignages", {}, [container("rh_voices_in", { display: "flex", flexDirection: "column", gap: tok("space.8") }, [
          reveal(B("rh_voices_head", "Titre de section", "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), alignItems: "center", textAlign: "center" }, [T("rh_voices_eyebrow", "p", "Ils en parlent", { style: { shared: ["rs_eyebrow"] } }), T("rh_voices_h2", "h2", "Ce que disent les habitués")]), "fade-up"),
          B("rh_voices_grid", "Grille", "div", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: tok("space.5") }, [
            reveal({ id: "rh_v1", type: "instance", name: "Témoignage 1", props: { component: "rcmp_testimonial", values: { quote: "On vient pour l'agneau des Combrailles, on reste pour la tarte aux myrtilles. Et pour Nils, qui raconte chaque assiette.", author: "Camille R.", role: "Habituée depuis 2016" } } }, "fade-up", 0),
            reveal({ id: "rh_v2", type: "instance", name: "Témoignage 2", props: { component: "rcmp_testimonial", values: { quote: "La soirée truffe de décembre est devenue notre rituel de fin d'année. Réservez tôt, ça part en deux jours.", author: "Julien et Sarah", role: "Clients" } } }, "fade-up", 120),
            reveal({ id: "rh_v3", type: "instance", name: "Témoignage 3", props: { component: "rcmp_testimonial", values: { quote: "Le menu du midi à 24 € est le meilleur rapport plaisir-prix de la ville, sans discussion.", author: "Léa M.", role: "Journaliste, La Montagne" } } }, "fade-up", 240),
          ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } }),
        ])]),
        { id: "rp_home_banner", type: "instance", name: "Bandeau réservation", props: { component: "rcmp_banner" } },
        { id: "rp_home_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_carte", name: { fr: "La carte" }, path: "/la-carte", kind: "static",
      seo: { description: { fr: "Entrées, plats, desserts et boissons de la saison à la Maison Aurèle." } },
      root: B("rp_carte_root", "Page", "div", {}, [
        { id: "rp_carte_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("rc_hero", "Titre", { paddingBottom: tok("space.6") }, [container("rc_hero_in", { display: "flex", flexDirection: "column", gap: tok("space.4"), alignItems: "flex-start" }, [
          reveal(T("rc_eyebrow", "p", "Saison d'automne", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
          reveal(T("rc_h1", "h1", "La carte"), "fade-up", 100),
          reveal(T("rc_p", "p", "Elle change toutes les six semaines. Le midi, du mardi au samedi, formule entrée-plat ou plat-dessert à 24 €.", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.lg") } } }), "fade-up", 200),
          reveal(B("rc_anchors", "Ancres", "nav", { display: "flex", gap: tok("space.2"), flexWrap: "wrap", paddingTop: tok("space.2") }, [
            { id: "rc_a1", type: "link", props: { tag: "a", href: { kind: "anchor", node: "entrees" } }, style: { shared: ["rs_badge"], base: { textDecoration: "none", transition: "color .2s, border-color .2s" }, states: { hover: { color: tok("color.accent"), borderColor: tok("color.accent") } } }, children: [T("rc_a1_t", "span", "Entrées")] },
            { id: "rc_a2", type: "link", props: { tag: "a", href: { kind: "anchor", node: "plats" } }, style: { shared: ["rs_badge"], base: { textDecoration: "none", transition: "color .2s, border-color .2s" }, states: { hover: { color: tok("color.accent"), borderColor: tok("color.accent") } } }, children: [T("rc_a2_t", "span", "Plats")] },
            { id: "rc_a3", type: "link", props: { tag: "a", href: { kind: "anchor", node: "desserts" } }, style: { shared: ["rs_badge"], base: { textDecoration: "none", transition: "color .2s, border-color .2s" }, states: { hover: { color: tok("color.accent"), borderColor: tok("color.accent") } } }, children: [T("rc_a3_t", "span", "Desserts")] },
            { id: "rc_a4", type: "link", props: { tag: "a", href: { kind: "anchor", node: "boissons" } }, style: { shared: ["rs_badge"], base: { textDecoration: "none", transition: "color .2s, border-color .2s" }, states: { hover: { color: tok("color.accent"), borderColor: tok("color.accent") } } }, children: [T("rc_a4_t", "span", "Boissons")] },
          ]), "fade-up", 300),
        ])]),
        ...([["entrees", "Entrées", "Pour commencer"], ["plats", "Plats", "Le cœur de la carte"], ["desserts", "Desserts", "Pour finir"], ["boissons", "Boissons", "Vins d'Auvergne et environs"]] as const).map(([cat, title, sub], i) =>
          section(`rc_${cat}`, title, { paddingTop: tok("space.8"), paddingBottom: tok("space.8"), ...(i % 2 ? { background: tok("color.surface") } : {}) }, [container(`rc_${cat}_in`, { display: "grid", gridTemplateColumns: "1fr 2fr", gap: tok("space.8") }, [
            reveal(B(`rc_${cat}_head`, "Titre", "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), position: "sticky", top: "6rem", alignSelf: "start" }, [T(`rc_${cat}_h2`, "h2", title), T(`rc_${cat}_sub`, "p", sub, { style: { shared: ["rs_muted"] } })]), "slide-right"),
            reveal(dishes(`rc_${cat}_d`, { field: "category", op: "eq", value: cat }, "list"), "fade-up", 120),
          ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })], { props: { tag: "section", anchor: cat } })),
        { id: "rp_carte_banner", type: "instance", name: "Bandeau réservation", props: { component: "rcmp_banner", variant: { ton: "sombre" }, values: { title: "Envie de goûter ?", text: "Le midi sans réservation, le soir il vaut mieux." } } },
        { id: "rp_carte_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_events", name: { fr: "Événements" }, path: "/evenements", kind: "static",
      seo: { description: { fr: "Soirées à thème, accords mets-vins, ateliers : le programme de la Maison Aurèle." } },
      root: B("rp_events_root", "Page", "div", {}, [
        { id: "rp_events_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("re_hero", "Titre", { paddingBottom: tok("space.6") }, [container("re_hero_in", { display: "flex", flexDirection: "column", gap: tok("space.4") }, [
          reveal(T("re_eyebrow", "p", "Le programme", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
          reveal(T("re_h1", "h1", "Les soirées de la maison"), "fade-up", 100),
          reveal(T("re_p", "p", "Une fois par mois, la salle change de visage : un producteur, un vigneron, un thème. Places limitées, réservation obligatoire.", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.lg") } } }), "fade-up", 200),
        ])]),
        section("re_list_s", "Liste", { paddingTop: tok("space.4") }, [container("re_list_in", {}, [
          reveal({ id: "re_list", type: "collection", name: "Tous les événements", props: { database: "rdb_events", view: { layout: "gallery", sort: [{ field: "date", dir: "asc" }], columns: { base: 2, small: 1 } } }, style: { base: { gap: tok("space.6") } }, children: [eventItem("re_ev")] }, "fade-up", 100),
        ])]),
        { id: "rp_events_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_event", name: { fr: "Événement" }, path: "/evenements/{slug}", kind: "template",
      seo: { title: { fr: "{title}" } },
      root: B("rp_event_root", "Page", "div", {}, [
        { id: "rp_event_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("rev_hero", "En-tête de l'événement", { paddingBottom: tok("space.8") }, [container("rev_hero_in", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: tok("space.10"), alignItems: "center" }, [
          B("rev_txt", "Texte", "div", { display: "flex", flexDirection: "column", gap: tok("space.4"), alignItems: "flex-start" }, [
            reveal(bind("rev_date", "p", "dateLabel", "entry", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
            reveal(bind("rev_h1", "h1", "title", "entry"), "fade-up", 100),
            reveal(bind("rev_desc", "p", "description", "entry", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.lg") } } }), "fade-up", 200),
            reveal(B("rev_meta", "Détails", "div", { display: "flex", gap: tok("space.3"), flexWrap: "wrap" }, [
              { id: "rev_price", type: "text", props: { tag: "span", content: { fr: [{ t: "bind", binding: { source: "entry", path: "price" } }, { t: "text", v: " € par personne" }] } }, style: { shared: ["rs_badge"] } },
              { id: "rev_seats", type: "text", props: { tag: "span", content: { fr: [{ t: "bind", binding: { source: "entry", path: "seats" } }, { t: "text", v: " places" }] } }, style: { shared: ["rs_badge"] } },
            ]), "fade-up", 300),
            reveal(BTN("rev_cta", "Réserver pour cette soirée", { kind: "page", page: "rp_reserve" }), "fade-up", 400),
          ]),
          reveal({ id: "rev_img", type: "image", name: "Photo", props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 5" }, bindings: { asset: { source: "entry", path: "image" } }, style: { base: { borderRadius: tok("radius.lg"), overflow: "hidden", boxShadow: tok("shadow.md") } } }, "zoom", 150, 1000),
        ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })]),
        section("rev_body_s", "Programme", { background: tok("color.surface") }, [container("rev_body_in", { maxWidth: tok("width.narrow"), display: "flex", flexDirection: "column", gap: tok("space.5") }, [
          reveal(T("rev_body_h2", "h2", "Le programme"), "fade-up"),
          reveal({ id: "rev_body", type: "text", name: "Programme", props: { tag: "div", content: fr("Programme de la soirée") }, bindings: { content: { source: "entry", path: "body" } }, style: { base: { display: "flex", flexDirection: "column", gap: tok("space.3") } } }, "fade-up", 100),
          reveal(BTN("rev_back", "Tous les événements", { kind: "page", page: "rp_events" }, "rs_button_secondary"), "fade-up", 200),
        ])]),
        { id: "rp_event_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_reserve", name: { fr: "Réserver" }, path: "/reserver", kind: "static",
      seo: { description: { fr: "Réservez une table à la Maison Aurèle, à Clermont-Ferrand." } },
      root: B("rp_reserve_root", "Page", "div", {}, [
        { id: "rp_reserve_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("rr_s", "Réservation", {}, [container("rr_in", { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: tok("space.10"), alignItems: "start" }, [
          B("rr_txt", "Texte", "div", { display: "flex", flexDirection: "column", gap: tok("space.4"), position: "sticky", top: "6rem" }, [
            reveal(T("rr_eyebrow", "p", "Réserver", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
            reveal(T("rr_h1", "h1", "Une table pour vous."), "fade-up", 100),
            reveal(T("rr_p", "p", "Nous confirmons chaque demande par email dans la journée. Pour plus de huit personnes, ou pour privatiser la salle, appelez-nous au 04 73 00 00 00.", { style: { shared: ["rs_muted"] } }), "fade-up", 200),
            reveal(B("rr_hours", "Horaires", "div", { display: "flex", flexDirection: "column", gap: tok("space.2"), paddingTop: tok("space.4"), borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: tok("color.line") }, [
              T("rr_h_t", "p", "Services", { style: { shared: ["rs_eyebrow"] } }), T("rr_h1l", "p", "Midi · mardi – samedi · 12h – 14h"), T("rr_h2l", "p", "Soir · jeudi – samedi · 19h – 22h30"),
            ]), "fade-up", 300),
          ]),
          reveal({
            id: "rr_form", type: "form", name: "Formulaire de réservation", props: { formId: "form_reservation", successMessage: { fr: "Merci ! Votre demande est bien reçue, nous vous confirmons par email dans la journée." }, notifyTo: "" },
            style: { shared: ["rs_card"], base: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: tok("space.4"), padding: "2rem" }, breakpoints: { small: { gridTemplateColumns: "1fr" } }, states: { hover: { transform: "none", boxShadow: "none", borderColor: tok("color.line") } } },
            children: [
              { id: "rr_f_name", type: "field", props: { fieldType: "text", name: "name", label: { fr: "Votre nom" }, required: true } },
              { id: "rr_f_email", type: "field", props: { fieldType: "email", name: "email", label: { fr: "Votre email" }, required: true } },
              { id: "rr_f_phone", type: "field", props: { fieldType: "tel", name: "phone", label: { fr: "Téléphone" } } },
              { id: "rr_f_date", type: "field", props: { fieldType: "date", name: "date", label: { fr: "Date" }, required: true } },
              { id: "rr_f_service", type: "field", props: { fieldType: "select", name: "service", label: { fr: "Service" }, required: true, options: [{ value: "midi", label: { fr: "Midi" } }, { value: "soir", label: { fr: "Soir" } }] } },
              { id: "rr_f_people", type: "field", props: { fieldType: "select", name: "people", label: { fr: "Personnes" }, required: true, options: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ value: String(n), label: { fr: String(n) } })) } },
              { id: "rr_f_msg", type: "field", props: { fieldType: "textarea", name: "message", label: { fr: "Allergies, occasion, demande particulière" } }, style: { base: { gridColumn: "1 / -1" } } },
              { id: "rr_f_submit", type: "link", name: "Envoyer", props: { tag: "button", type: "submit" }, style: { shared: ["rs_button"], base: { gridColumn: "1 / -1", justifySelf: "start" } }, children: [T("rr_f_submit_t", "span", "Demander une table")] },
            ],
          }, "fade-up", 200),
        ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })]),
        { id: "rp_reserve_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_about", name: { fr: "La maison" }, path: "/la-maison", kind: "static",
      seo: { description: { fr: "L'histoire, l'équipe et les questions fréquentes de la Maison Aurèle." } },
      root: B("rp_about_root", "Page", "div", {}, [
        { id: "rp_about_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("ra_story", "Histoire", {}, [container("ra_story_in", { display: "grid", gridTemplateColumns: "1fr 1fr", gap: tok("space.10"), alignItems: "center" }, [
          B("ra_story_txt", "Texte", "div", { display: "flex", flexDirection: "column", gap: tok("space.4") }, [
            reveal(T("ra_eyebrow", "p", "Depuis 2014", { style: { shared: ["rs_eyebrow"] } }), "fade-up"),
            reveal(T("ra_h1", "h1", "Une ancienne quincaillerie, deux cuisiniers, un quartier."), "fade-up", 100),
            reveal(T("ra_p1", "p", "Aurèle a grandi à Besse, Nils à Copenhague. Ils se sont rencontrés dans une cuisine lyonnaise et ont voulu un endroit à eux : petit, ouvert sur la rue, où l'on cuisine ce que les voisins produisent.", { style: { shared: ["rs_muted"] } }), "fade-up", 200),
            reveal(T("ra_p2", "p", "La carte tient sur une page. Elle change quand les producteurs le décident, pas quand le calendrier le dit.", { style: { shared: ["rs_muted"] } }), "fade-up", 300),
          ]),
          reveal(IMG("ra_img", "ras_equipe", "4 / 5", { name: "Photo de l'équipe", props: { asset: "ras_equipe", alt: { fr: "" }, fit: "cover", ratio: "4 / 5", priority: true }, style: { base: { borderRadius: tok("radius.lg"), overflow: "hidden" } } }), "slide-left", 100),
        ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr" } } } })]),
        section("ra_team", "Équipe", { background: tok("color.surface") }, [container("ra_team_in", { display: "flex", flexDirection: "column", gap: tok("space.8") }, [
          reveal(B("ra_team_head", "Titre de section", "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [T("ra_team_eyebrow", "p", "L'équipe", { style: { shared: ["rs_eyebrow"] } }), T("ra_team_h2", "h2", "Ceux qui font la maison")]), "fade-up"),
          B("ra_team_grid", "Grille", "div", { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: tok("space.5") }, [
            ...([["ra_t1", "ras_t1", "Aurèle Vidal", "Cheffe, Besse"], ["ra_t2", "ras_t2", "Nils Sørensen", "Chef, Copenhague"], ["ra_t3", "ras_t3", "Inès Bakhti", "Salle et cave"]] as const).map(([id, asset, name, role], i) =>
              reveal(B(id, name, "div", { display: "flex", flexDirection: "column", gap: tok("space.3") }, [
                IMG(`${id}_img`, asset, "1 / 1", { style: { base: { borderRadius: tok("radius.lg"), overflow: "hidden", transition: "transform .5s cubic-bezier(.22,1,.36,1)" }, states: { hover: { transform: "rotate(-1.5deg) scale(1.02)" } } } }),
                T(`${id}_name`, "h3", name), T(`${id}_role`, "p", role, { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } }),
              ]), "fade-up", i * 120)),
          ], { style: { breakpoints: { tablet: { gridTemplateColumns: "1fr 1fr" }, small: { gridTemplateColumns: "1fr" } } } }),
        ])]),
        section("ra_faq", "Questions fréquentes", {}, [container("ra_faq_in", { maxWidth: tok("width.narrow"), display: "flex", flexDirection: "column", gap: tok("space.6") }, [
          reveal(B("ra_faq_head", "Titre de section", "div", { display: "flex", flexDirection: "column", gap: tok("space.2") }, [T("ra_faq_eyebrow", "p", "Pratique", { style: { shared: ["rs_eyebrow"] } }), T("ra_faq_h2", "h2", "Questions fréquentes"), T("ra_faq_hint", "p", "Cliquez sur une question pour lire la réponse.", { style: { shared: ["rs_muted"], base: { fontSize: tok("fontSize.sm") } } })]), "fade-up"),
          reveal(B("ra_faq_list", "Questions", "div", { display: "flex", flexDirection: "column" }, [
            faq("ra_q1", "Faut-il réserver le midi ?", "Non, le midi nous gardons toujours quelques tables sans réservation. Le soir, en revanche, la salle est pleine dès le jeudi : réservez."),
            faq("ra_q2", "Proposez-vous des plats végétariens ?", "Toujours au moins une entrée, un plat et un dessert végétariens, marqués sur la carte. Prévenez-nous pour les régimes sans gluten ou les allergies, tout est fait maison."),
            faq("ra_q3", "Peut-on privatiser la salle ?", "Oui, à partir de vingt personnes, le soir du mardi au mercredi ou le dimanche midi. Écrivez-nous depuis la page Réserver."),
            faq("ra_q4", "Y a-t-il un parking ?", "Le parking des Salins est à quatre minutes à pied ; le tram A s'arrête à Gaillard, juste au bout de la rue."),
          ]), "fade-up", 100),
        ])]),
        { id: "rp_about_banner", type: "instance", name: "Bandeau réservation", props: { component: "rcmp_banner", values: { title: "Venez voir la salle.", text: "Ouvert du mardi au samedi. On vous garde une table." } } },
        { id: "rp_about_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
    {
      id: "rp_404", name: { fr: "Page introuvable" }, path: "/404", kind: "static", seo: { index: false },
      root: B("rp_404_root", "Page", "div", {}, [
        { id: "rp_404_hdr", type: "instance", name: "En-tête", props: { component: "rcmp_header", variant: { fond: "plein" } } },
        section("r404_s", "Contenu principal", { minHeight: "60vh", display: "flex", alignItems: "center" }, [container("r404_in", { display: "flex", flexDirection: "column", gap: tok("space.4"), alignItems: "flex-start", maxWidth: tok("width.narrow") }, [
          T("r404_h1", "h1", "Cette table n'existe pas."), T("r404_p", "p", "L'adresse a changé, ou le lien était erroné. La carte, elle, est toujours là.", { style: { shared: ["rs_muted"] } }),
          BTN("r404_cta", "Retour à l'accueil", { kind: "page", page: "rp_home" }),
        ])]),
        { id: "rp_404_ftr", type: "instance", name: "Pied de page", props: { component: "rcmp_footer" } },
      ]),
    },
  ],
  assets: [
    { id: "ras_hero", kind: "image", url: "https://picsum.photos/id/292/1200/1500", width: 1200, height: 1500, name: "Assiette du soir", alt: { fr: "Une assiette dressée, lumière du soir" } },
    { id: "ras_salle", kind: "image", url: "https://picsum.photos/id/326/1200/1600", width: 1200, height: 1600, name: "La salle", alt: { fr: "La salle du restaurant" } },
    { id: "ras_equipe", kind: "image", url: "https://picsum.photos/id/312/1200/1500", width: 1200, height: 1500, name: "L'équipe en cuisine", alt: { fr: "L'équipe en cuisine, pendant le service" } },
    { id: "ras_t1", kind: "image", url: "https://picsum.photos/id/338/1000/1000", width: 1000, height: 1000, name: "Aurèle", alt: { fr: "Aurèle, en cuisine" } },
    { id: "ras_t2", kind: "image", url: "https://picsum.photos/id/342/1000/1000", width: 1000, height: 1000, name: "Nils", alt: { fr: "Nils, en salle" } },
    { id: "ras_t3", kind: "image", url: "https://picsum.photos/id/349/1000/1000", width: 1000, height: 1000, name: "Inès", alt: { fr: "Inès, à la cave" } },
    { id: "ras_d1", kind: "image", url: "https://picsum.photos/id/365/1200/900", width: 1200, height: 900, name: "Agneau des Combrailles", alt: { fr: "Agneau des Combrailles dans son jus" } },
    { id: "ras_d2", kind: "image", url: "https://picsum.photos/id/429/1200/900", width: 1200, height: 900, name: "Truite de Besse", alt: { fr: "Truite de Besse, beurre blanc" } },
    { id: "ras_d3", kind: "image", url: "https://picsum.photos/id/431/1200/900", width: 1200, height: 900, name: "Tarte aux myrtilles", alt: { fr: "Tarte aux myrtilles sauvages" } },
    { id: "ras_d4", kind: "image", url: "https://picsum.photos/id/488/1200/900", width: 1200, height: 900, name: "Légumes rôtis", alt: { fr: "Légumes rôtis au four" } },
    { id: "ras_e1", kind: "image", url: "https://picsum.photos/id/493/1200/750", width: 1200, height: 750, name: "Soirée truffe", alt: { fr: "Une table dressée pour la soirée truffe" } },
    { id: "ras_e2", kind: "image", url: "https://picsum.photos/id/674/1200/750", width: 1200, height: 750, name: "Accords vins", alt: { fr: "Verres alignés pour les accords vins" } },
    { id: "ras_e3", kind: "image", url: "https://picsum.photos/id/835/1200/750", width: 1200, height: 750, name: "Atelier pain" },
    { id: "ras_e4", kind: "image", url: "https://picsum.photos/id/1080/1200/750", width: 1200, height: 750, name: "Brunch des producteurs" },
  ],
  redirects: [{ from: "/carte", to: "/la-carte", permanent: true }, { from: "/menu", to: "/la-carte", permanent: true }],
};

const now = "2026-09-09T12:00:00.000Z";
const dish = (n: number, values: Entry["values"]): Entry => ({ id: `rd_${n}`, database: "rdb_plats", status: "published", values: { available: true, position: n, ...values }, createdAt: now, updatedAt: now });
const ev = (n: number, values: Entry["values"]): Entry => ({ id: `re_${n}`, database: "rdb_events", status: "published", values: { position: n, ...values }, createdAt: now, updatedAt: now });
const para = (id: string, text: string) => ({ id, type: "text", props: { tag: "p", content: fr(text) } });

/** Entrées d'exemple : la carte et les événements (hors document). */
export const restaurantEntries: Entry[] = [
  dish(1, { name: "Œuf parfait, crème de lentilles du Puy", description: "Lentilles vertes AOP, lard paysan fumé, jaune coulant.", price: 11, category: "entrees", tags: ["signature"], image: "ras_d4" }),
  dish(2, { name: "Betteraves rôties, chèvre frais, noisettes", description: "Betteraves de Lempdes, chèvre de la ferme de Lastic.", price: 10, category: "entrees", tags: ["vegetarien", "sans-gluten"] }),
  dish(3, { name: "Truite de Besse en gravlax", description: "Marinée 36 heures, crème d'aneth, pain de seigle toasté.", price: 13, category: "entrees", image: "ras_d2" }),
  dish(4, { name: "Agneau des Combrailles, jus corsé", description: "Épaule confite douze heures, purée de pommes de terre au beurre demi-sel.", price: 26, category: "plats", tags: ["signature"], image: "ras_d1" }),
  dish(5, { name: "Truffade revisitée, salade d'herbes", description: "Pommes de terre, tome fraîche de Cantal, ail des ours.", price: 19, category: "plats", tags: ["vegetarien", "signature"], image: "ras_d3" }),
  dish(6, { name: "Lieu jaune, beurre blanc au cidre", description: "Pêche de ligne, poireaux fondants, cidre de la Limagne.", price: 27, category: "plats", tags: ["sans-gluten"] }),
  dish(7, { name: "Volaille fermière, morilles et vin jaune", description: "Suprême rôti, cuisse en croquette, jus aux morilles.", price: 24, category: "plats" }),
  dish(8, { name: "Tarte aux myrtilles sauvages", description: "Myrtilles du Sancy, pâte sablée au sarrasin, crème crue.", price: 9, category: "desserts", tags: ["signature", "vegetarien"], image: "ras_d3" }),
  dish(9, { name: "Saint-nectaire fermier, pain aux noix", description: "Affiné 8 semaines à Besse, confiture de figues.", price: 8, category: "desserts", tags: ["vegetarien"] }),
  dish(10, { name: "Mousse au chocolat, fleur de sel", description: "Chocolat 70 %, huile d'olive, sel de Guérande.", price: 8, category: "desserts", tags: ["vegetarien", "sans-gluten"] }),
  dish(11, { name: "Côtes d'Auvergne, Chanturgue rouge", description: "Gamay sur terres volcaniques, domaine Sauvat. Le verre.", price: 6, category: "boissons" }),
  dish(12, { name: "Saint-Pourçain blanc", description: "Tressallier et chardonnay, domaine Grosbot-Barbara. Le verre.", price: 6, category: "boissons" }),
  dish(13, { name: "Bière ambrée de la brasserie du Mont-Dore", description: "33 cl, brassée à 1 050 mètres.", price: 5, category: "boissons" }),
  dish(14, { name: "Eau de Châteldon", description: "Pétillante naturelle, 75 cl.", price: 5, category: "boissons" }),
  ev(1, { title: "Soirée truffe d'hiver", slug: "soiree-truffe", date: "2026-12-11", dateLabel: "Vendredi 11 décembre · 19h30", description: "Cinq services autour de la truffe de Bourgogne, avec Marc Delorme, trufficulteur.", price: 85, seats: 30, image: "ras_e1", body: [para("re1_b1", "Marc Delorme cultive la truffe depuis vingt ans sur les coteaux de Montluçon. Il apporte sa récolte du matin et raconte l'année."), para("re1_b2", "Au menu : œuf parfait à la truffe, risotto de petit épeautre, volaille fermière en croûte, brie truffé, et une glace vanille-truffe qu'il faut goûter pour y croire."), para("re1_b3", "Accords en vins d'Auvergne proposés par Inès, en supplément.")] }),
  ev(2, { title: "Accords mets et vins volcaniques", slug: "accords-vins-volcaniques", date: "2026-10-16", dateLabel: "Vendredi 16 octobre · 19h30", description: "Quatre plats, quatre vins des Côtes d'Auvergne, avec le vigneron Pierre Goigoux.", price: 65, seats: 28, image: "ras_e2", body: [para("re2_b1", "Pierre Goigoux cultive dix hectares à Châteaugay, sur des sols de pouzzolane. Il vient avec quatre cuvées, dont une qui n'est pas encore en bouteille."), para("re2_b2", "Nils construit le menu autour des vins, pas l'inverse : c'est la règle de la soirée.")] }),
  ev(3, { title: "Atelier pain au levain", slug: "atelier-pain", date: "2026-11-07", dateLabel: "Samedi 7 novembre · 9h – 13h", description: "Une matinée en cuisine avec Aurèle : levain, façonnage, cuisson. On repart avec sa miche.", price: 70, seats: 10, image: "ras_e3", body: [para("re3_b1", "Dix places, pas plus : chacun pétrit, façonne et enfourne. Aurèle partage le levain de la maison, né en 2014."), para("re3_b2", "La matinée se termine par un déjeuner à table, pain compris évidemment.")] }),
  ev(4, { title: "Brunch des producteurs", slug: "brunch-producteurs", date: "2026-10-04", dateLabel: "Dimanche 4 octobre · 11h – 15h", description: "Les quatorze producteurs de la maison en salle et dans la cour, un buffet, un marché.", price: 32, seats: 60, image: "ras_e4", body: [para("re4_b1", "Une fois par an, la cour devient un marché. On mange debout ou assis, on achète direct aux producteurs, les enfants sont les bienvenus.")] }),
];
