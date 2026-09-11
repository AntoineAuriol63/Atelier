/**
 * Site d'exemple : vitrine d'une photographe (site de recette de la v0, D10).
 * Sert de fixture aux tests, au moteur de rendu et à l'éditeur tant qu'il n'y a pas de persistance.
 */
import type { Entry, Inline, Node, Site } from "./types";

const fr = (text: string): Record<string, Inline[]> => ({ fr: [{ t: "text", v: text }] });

function text(id: string, tag: string, content: string, extra: Partial<Node> = {}): Node {
  return { id, type: "text", name: extra.name, props: { tag, content: fr(content) }, ...extra };
}

function bindText(id: string, tag: string, field: string, source: "item" | "entry" = "item", extra: Partial<Node> = {}): Node {
  return { id, type: "text", props: { tag, content: { fr: [{ t: "bind", binding: { source, path: field } }] } }, ...extra };
}

const button = (id: string, label: string, href: Node["props"]["href"], variant: "st_button" | "st_button_secondary" = "st_button"): Node => ({
  id, type: "link", name: label, props: { tag: "a", href }, style: { shared: [variant] },
  children: [text(`${id}_t`, "span", label)],
});

export const sampleSite: Site = {
  schemaVersion: 3,
  id: "site_marie",
  name: "Marie Lambert, photographe",
  settings: {
    defaultLocale: "fr",
    locales: ["fr"],
    breakpoints: [
      { id: "tablet", name: "Tablette", maxWidth: 991 },
      { id: "mobile", name: "Mobile", maxWidth: 767 },
      { id: "small", name: "Petit mobile", maxWidth: 479 },
    ],
    layoutGrid: { columns: 12, gutter: { token: "space.5" }, margin: { token: "space.6" }, maxWidth: { token: "width.content" }, byBreakpoint: { tablet: { columns: 8 }, mobile: { columns: 4, margin: { token: "space.4" } }, small: { columns: 4 } } },
    seo: { titleSuffix: { fr: " · Marie Lambert" }, description: { fr: "Photographe de portrait et de mariage à Clermont-Ferrand." } },
  },
  theme: {
    tokens: {
      color: {
        bg: { light: "#FBFAF7", dark: "#141413" },
        surface: { light: "#FFFFFF", dark: "#1D1C1A" },
        ink: { light: "#1B1A17", dark: "#EDEAE3" },
        muted: { light: "#6B665C", dark: "#A39D91" },
        line: { light: "#E4E0D6", dark: "#2E2C28" },
        accent: { light: "#8A5A2B", dark: "#D6A26B" },
        accentInk: { light: "#FFFFFF", dark: "#1B1A17" },
      },
      font: { display: "'Cormorant Garamond', Georgia, serif", body: "'Work Sans', system-ui, sans-serif" },
      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.25rem", xl: "1.75rem", "2xl": "clamp(2rem, 1.2rem + 2.6vw, 2.5rem)", "3xl": "clamp(2.5rem, 1.4rem + 3.8vw, 3.75rem)" },
      lineHeight: { tight: "1.1", normal: "1.55", loose: "1.8" },
      space: { 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.5rem", 6: "2rem", 8: "3rem", 10: "4rem", 12: "6rem", 16: "8rem" },
      radius: { sm: "3px", md: "6px", lg: "12px", full: "999px" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,.06)", md: "0 8px 24px rgba(0,0,0,.10)" },
      width: { content: "72rem", narrow: "44rem" },
    },
    modes: [{ id: "light", name: "Clair" }, { id: "dark", name: "Sombre" }],
    defaultMode: "light",
    typeDefaults: {
      body: { fontFamily: { token: "font.body" }, fontSize: { token: "fontSize.md" }, lineHeight: { token: "lineHeight.normal" }, color: { token: "color.ink" }, background: { token: "color.bg" } },
      h1: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.3xl" }, lineHeight: { token: "lineHeight.tight" }, fontWeight: "500", letterSpacing: "-0.01em" },
      h2: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.2xl" }, lineHeight: { token: "lineHeight.tight" }, fontWeight: "500" },
      h3: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.xl" }, lineHeight: { token: "lineHeight.tight" }, fontWeight: "500" },
      p: { maxWidth: "65ch" },
      blockquote: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.xl" }, lineHeight: { token: "lineHeight.tight" }, fontStyle: "italic", maxWidth: "40ch", paddingLeft: { token: "space.5" }, borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: { token: "color.accent" }, margin: "0" },
      a: { color: "inherit" },
      image: { display: "block", width: "100%", height: "auto" },
    },
    fonts: [
      { family: "Cormorant Garamond", provider: "google", weights: [500, 600], fallback: "Georgia, serif" },
      { family: "Work Sans", provider: "google", weights: [400, 500], fallback: "system-ui, sans-serif" },
    ],
  },
  sharedStyles: [
    { id: "st_section", name: "Section", style: { base: { paddingTop: { token: "space.12" }, paddingBottom: { token: "space.12" }, paddingLeft: { token: "space.6" }, paddingRight: { token: "space.6" } }, breakpoints: { mobile: { paddingTop: { token: "space.8" }, paddingBottom: { token: "space.8" }, paddingLeft: { token: "space.4" }, paddingRight: { token: "space.4" } } } } },
    { id: "st_container", name: "Conteneur", style: { base: { width: "100%", maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } } },
    { id: "st_button", name: "Bouton", style: { base: { display: "inline-flex", alignItems: "center", gap: { token: "space.2" }, paddingTop: { token: "space.3" }, paddingBottom: { token: "space.3" }, paddingLeft: { token: "space.5" }, paddingRight: { token: "space.5" }, background: { token: "color.accent" }, color: { token: "color.accentInk" }, borderRadius: { token: "radius.full" }, textDecoration: "none", fontWeight: "500", fontSize: { token: "fontSize.sm" }, transition: "opacity .15s" }, states: { hover: { opacity: "0.85" } } } },
    { id: "st_button_secondary", name: "Bouton / secondaire", extends: "st_button", style: { base: { background: "transparent", color: { token: "color.ink" }, borderWidth: "1px", borderStyle: "solid", borderColor: { token: "color.line" } } } },
    { id: "st_eyebrow", name: "Surtitre", style: { base: { fontSize: { token: "fontSize.xs" }, letterSpacing: "0.12em", textTransform: "uppercase", color: { token: "color.muted" } } } },
    { id: "st_muted", name: "Texte atténué", style: { base: { color: { token: "color.muted" } } } },
  ],
  components: [
    {
      id: "cmp_header", name: "En-tête", scope: "site", props: [],
      root: {
        id: "hdr", type: "box", name: "En-tête", props: { tag: "header" },
        style: { base: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: { token: "space.5" }, paddingBottom: { token: "space.5" }, paddingLeft: { token: "space.6" }, paddingRight: { token: "space.6" } } },
        children: [
          { id: "hdr_logo", type: "link", name: "Logo", props: { tag: "a", href: { kind: "page", page: "p_home" } }, style: { base: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.lg" }, textDecoration: "none" } }, children: [text("hdr_logo_t", "span", "Marie Lambert")] },
          { id: "hdr_nav", type: "box", name: "Navigation", props: { tag: "nav" }, style: { base: { display: "flex", gap: { token: "space.5" }, fontSize: { token: "fontSize.sm" } }, breakpoints: { mobile: { gap: { token: "space.3" } } } },
            children: [
              { id: "nav_1", type: "link", props: { tag: "a", href: { kind: "page", page: "p_galeries" } }, style: { base: { textDecoration: "none" }, states: { hover: { color: { token: "color.accent" } } } }, children: [text("nav_1_t", "span", "Galeries")] },
              { id: "nav_2", type: "link", props: { tag: "a", href: { kind: "page", page: "p_apropos" } }, style: { base: { textDecoration: "none" }, states: { hover: { color: { token: "color.accent" } } } }, children: [text("nav_2_t", "span", "À propos")] },
              { id: "nav_3", type: "link", props: { tag: "a", href: { kind: "page", page: "p_contact" } }, style: { base: { textDecoration: "none" }, states: { hover: { color: { token: "color.accent" } } } }, children: [text("nav_3_t", "span", "Contact")] },
            ] },
        ],
      },
    },
    {
      id: "cmp_footer", name: "Pied de page", scope: "site", props: [],
      root: {
        id: "ftr", type: "box", name: "Pied de page", props: { tag: "footer" },
        style: { shared: ["st_section"], base: { borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: { token: "color.line" }, display: "flex", justifyContent: "space-between", gap: { token: "space.4" }, fontSize: { token: "fontSize.sm" }, color: { token: "color.muted" } }, breakpoints: { mobile: { flexDirection: "column" } } },
        children: [
          text("ftr_1", "p", "© 2026 Marie Lambert · Clermont-Ferrand"),
          { id: "ftr_2", type: "link", props: { tag: "a", href: { kind: "email", to: "bonjour@marielambert.fr" } }, children: [text("ftr_2_t", "span", "bonjour@marielambert.fr")] },
        ],
      },
    },
  ],
  codeComponents: [],
  databases: [
    {
      id: "db_projets", name: { fr: "Projets" }, slug: "projets", titleField: "title", slugField: "slug",
      pageTemplates: [{ page: "p_projet", slugPattern: "/projets/{slug}" }],
      fields: [
        { name: "title", label: { fr: "Titre" }, type: "text", required: true },
        { name: "slug", label: { fr: "Adresse" }, type: "text", required: true },
        { name: "category", label: { fr: "Catégorie" }, type: "select", options: [{ value: "portrait", label: { fr: "Portrait" } }, { value: "mariage", label: { fr: "Mariage" } }, { value: "paysage", label: { fr: "Paysage" } }] },
        { name: "year", label: { fr: "Année" }, type: "number" },
        { name: "cover", label: { fr: "Image de couverture" }, type: "image" },
        { name: "excerpt", label: { fr: "Résumé" }, type: "text" },
        { name: "body", label: { fr: "Texte" }, type: "richtext" },
        { name: "gallery", label: { fr: "Galerie" }, type: "gallery" },
        { name: "position", label: { fr: "Ordre" }, type: "position" },
      ],
    },
  ],
  animations: [],
  pages: [
    {
      id: "p_home", name: { fr: "Accueil" }, path: "/", kind: "static",
      seo: { title: { fr: "Photographe de portrait et de mariage" } },
      root: {
        id: "home", type: "box", name: "Page", props: { tag: "div" },
        children: [
          { id: "home_hdr", type: "instance", name: "En-tête", props: { component: "cmp_header" } },
          {
            id: "hero", type: "box", name: "Héros", props: { tag: "section" },
            style: { shared: ["st_section"], base: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: { token: "space.10" }, alignItems: "center", maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" }, breakpoints: { tablet: { gridTemplateColumns: "1fr", gap: { token: "space.6" } } } },
            children: [
              { id: "hero_txt", type: "box", name: "Texte", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, alignItems: "flex-start" } },
                children: [
                  text("hero_eyebrow", "p", "Portrait · Mariage · Paysage", { style: { shared: ["st_eyebrow"] } }),
                  text("hero_h1", "h1", "Des images qui restent, longtemps après."),
                  text("hero_p", "p", "Je photographie les gens comme ils sont, dans la lumière qu'il y a. Basée à Clermont-Ferrand, je me déplace partout en Auvergne et au-delà.", { style: { shared: ["st_muted"], base: { fontSize: { token: "fontSize.lg" } } } }),
                  { id: "hero_cta", type: "box", props: { tag: "div" }, style: { base: { display: "flex", gap: { token: "space.3" }, flexWrap: "wrap" } },
                    children: [button("hero_b1", "Voir les galeries", { kind: "page", page: "p_galeries" }), button("hero_b2", "Me contacter", { kind: "page", page: "p_contact" }, "st_button_secondary")] },
                ] },
              { id: "hero_img", type: "image", name: "Photo", props: { asset: "as_hero", alt: { fr: "Portrait en lumière naturelle" }, fit: "cover", ratio: "4 / 5" }, style: { base: { borderRadius: { token: "radius.lg" }, overflow: "hidden" } } },
            ],
          },
          {
            id: "work", type: "box", name: "Derniers projets", props: { tag: "section" },
            style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.6" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } },
            children: [
              { id: "work_head", type: "box", props: { tag: "div" }, style: { base: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: { token: "space.4" } } },
                children: [text("work_h2", "h2", "Derniers projets"), { id: "work_more", type: "link", props: { tag: "a", href: { kind: "page", page: "p_galeries" } }, style: { base: { fontSize: { token: "fontSize.sm" } } }, children: [text("work_more_t", "span", "Toutes les galeries")] }] },
              {
                id: "work_list", type: "collection", name: "Galerie des projets",
                props: { database: "db_projets", view: { layout: "gallery", sort: [{ field: "position", dir: "asc" }], limit: 6, columns: { base: 3, tablet: 2, small: 1 } } },
                style: { base: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { token: "space.5" } }, breakpoints: { tablet: { gridTemplateColumns: "repeat(2, 1fr)" }, small: { gridTemplateColumns: "1fr" } } },
                children: [
                  { id: "work_item", type: "item", name: "Carte projet", props: {},
                    style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.3" } } },
                    children: [
                      { id: "work_item_link", type: "link", props: { tag: "a", href: { kind: "page", page: "p_projet" } }, bindings: { href: { source: "item", path: "$url" } }, style: { base: { textDecoration: "none", display: "flex", flexDirection: "column", gap: { token: "space.3" } } },
                        children: [
                          { id: "work_item_img", type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 5" }, bindings: { asset: { source: "item", path: "cover" }, alt: { source: "item", path: "title" } }, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } },
                          bindText("work_item_title", "h3", "title"),
                          bindText("work_item_cat", "p", "category", "item", { style: { shared: ["st_eyebrow"] } }),
                        ] },
                    ] },
                ],
              },
            ],
          },
          {
            id: "cta", type: "box", name: "Appel à contact", props: { tag: "section" },
            style: { shared: ["st_section"], base: { background: { token: "color.surface" }, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: { token: "color.line" } } },
            children: [
              { id: "cta_in", type: "box", props: { tag: "div" }, style: { shared: ["st_container"], base: { display: "flex", flexDirection: "column", gap: { token: "space.4" }, alignItems: "flex-start", maxWidth: { token: "width.narrow" } } },
                children: [text("cta_h2", "h2", "Un projet, une date, une envie ?"), text("cta_p", "p", "Racontez-moi ce que vous imaginez. Je réponds sous 48 heures.", { style: { shared: ["st_muted"] } }), button("cta_b", "Écrire à Marie", { kind: "page", page: "p_contact" })] },
            ],
          },
          { id: "home_ftr", type: "instance", name: "Pied de page", props: { component: "cmp_footer" } },
        ],
      },
    },
    {
      id: "p_galeries", name: { fr: "Galeries" }, path: "/galeries", kind: "static",
      root: { id: "gal", type: "box", props: { tag: "div" }, children: [
        { id: "gal_hdr", type: "instance", props: { component: "cmp_header" } },
        { id: "gal_main", type: "box", props: { tag: "main" }, style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.6" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } },
          children: [
            text("gal_h1", "h1", "Galeries"),
            { id: "gal_list", type: "collection", props: { database: "db_projets", view: { layout: "gallery", sort: [{ field: "position", dir: "asc" }], columns: { base: 3, tablet: 2, small: 1 } } },
              style: { base: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { token: "space.5" } }, breakpoints: { tablet: { gridTemplateColumns: "repeat(2, 1fr)" }, small: { gridTemplateColumns: "1fr" } } },
              children: [{ id: "gal_item", type: "item", props: {}, children: [
                { id: "gal_item_link", type: "link", props: { tag: "a", href: { kind: "page", page: "p_projet" } }, bindings: { href: { source: "item", path: "$url" } }, style: { base: { textDecoration: "none", display: "flex", flexDirection: "column", gap: { token: "space.3" } } }, children: [
                  { id: "gal_item_img", type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 5" }, bindings: { asset: { source: "item", path: "cover" }, alt: { source: "item", path: "title" } }, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } },
                  bindText("gal_item_title", "h3", "title"),
                ] },
              ] }] },
          ] },
        { id: "gal_ftr", type: "instance", props: { component: "cmp_footer" } },
      ] },
    },
    {
      id: "p_projet", name: { fr: "Projet" }, path: "/projets/{slug}", kind: "template",
      seo: { title: { fr: "{title}" } },
      root: { id: "prj", type: "box", props: { tag: "div" }, children: [
        { id: "prj_hdr", type: "instance", props: { component: "cmp_header" } },
        { id: "prj_main", type: "box", props: { tag: "main" }, style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.6" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } },
          children: [
            bindText("prj_cat", "p", "category", "entry", { style: { shared: ["st_eyebrow"] } }),
            bindText("prj_h1", "h1", "title", "entry"),
            bindText("prj_excerpt", "p", "excerpt", "entry", { style: { shared: ["st_muted"], base: { fontSize: { token: "fontSize.lg" } } } }),
            { id: "prj_cover", type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "3 / 2" }, bindings: { asset: { source: "entry", path: "cover" }, alt: { source: "entry", path: "title" } }, style: { base: { borderRadius: { token: "radius.lg" }, overflow: "hidden" } } },
          ] },
        { id: "prj_ftr", type: "instance", props: { component: "cmp_footer" } },
      ] },
    },
    {
      id: "p_apropos", name: { fr: "À propos" }, path: "/a-propos", kind: "static",
      root: { id: "abt", type: "box", props: { tag: "div" }, children: [
        { id: "abt_hdr", type: "instance", props: { component: "cmp_header" } },
        { id: "abt_main", type: "box", props: { tag: "main" }, style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, maxWidth: { token: "width.narrow" }, marginLeft: "auto", marginRight: "auto" } },
          children: [
            text("abt_h1", "h1", "À propos"),
            text("abt_p1", "p", "J'ai commencé la photographie avec un argentique hérité de mon grand-père. Quinze ans plus tard, je travaille toujours avec la même idée : une image juste vaut mieux qu'une image parfaite."),
            text("abt_p2", "p", "Je photographie des portraits, des mariages et des paysages d'Auvergne. Mes tirages sont réalisés sur papier baryté dans un atelier à Clermont-Ferrand."),
          ] },
        { id: "abt_ftr", type: "instance", props: { component: "cmp_footer" } },
      ] },
    },
    {
      id: "p_contact", name: { fr: "Contact" }, path: "/contact", kind: "static",
      root: { id: "ctc", type: "box", props: { tag: "div" }, children: [
        { id: "ctc_hdr", type: "instance", props: { component: "cmp_header" } },
        { id: "ctc_main", type: "box", props: { tag: "main" }, style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, maxWidth: { token: "width.narrow" }, marginLeft: "auto", marginRight: "auto" } },
          children: [
            text("ctc_h1", "h1", "Contact"),
            text("ctc_p", "p", "Dites-moi ce que vous imaginez, la date si vous l'avez, et le lieu. Je réponds sous 48 heures.", { style: { shared: ["st_muted"] } }),
            { id: "ctc_form", type: "form", name: "Formulaire de contact", props: { formId: "form_contact", successMessage: { fr: "Merci, votre message est bien envoyé." } },
              style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } },
              children: [
                { id: "f_name", type: "field", props: { fieldType: "text", name: "name", label: { fr: "Votre nom" }, required: true } },
                { id: "f_email", type: "field", props: { fieldType: "email", name: "email", label: { fr: "Votre email" }, required: true } },
                { id: "f_msg", type: "field", props: { fieldType: "textarea", name: "message", label: { fr: "Votre message" }, required: true } },
                { id: "f_submit", type: "link", props: { tag: "button", type: "submit" }, style: { shared: ["st_button"], base: { alignSelf: "flex-start" } }, children: [text("f_submit_t", "span", "Envoyer")] },
              ] },
          ] },
        { id: "ctc_ftr", type: "instance", props: { component: "cmp_footer" } },
      ] },
    },
  ],
  assets: [
    { id: "as_hero", kind: "image", url: "https://picsum.photos/id/1027/1200/1500", width: 1200, height: 1500, name: "Portrait en lumière naturelle", alt: { fr: "Portrait en lumière naturelle" } },
    { id: "as_p1", kind: "image", url: "https://picsum.photos/id/1011/1200/1500", width: 1200, height: 1500, name: "Léa et Tom" },
    { id: "as_p2", kind: "image", url: "https://picsum.photos/id/1035/1200/1500", width: 1200, height: 1500, name: "Sous la pluie" },
    { id: "as_p3", kind: "image", url: "https://picsum.photos/id/1040/1200/1500", width: 1200, height: 1500, name: "Chaîne des Puys" },
    { id: "as_p4", kind: "image", url: "https://picsum.photos/id/1043/1200/1500", width: 1200, height: 1500, name: "Atelier" },
    { id: "as_p5", kind: "image", url: "https://picsum.photos/id/1050/1200/1500", width: 1200, height: 1500, name: "Portrait studio" },
    { id: "as_p6", kind: "image", url: "https://picsum.photos/id/1062/1200/1500", width: 1200, height: 1500, name: "Soirée" },
  ],
  redirects: [],
};

const now = "2026-09-06T12:00:00.000Z";
const entry = (id: string, values: Entry["values"]): Entry => ({ id, database: "db_projets", status: "published", values, createdAt: now, updatedAt: now });

/** Entrées d'exemple de la base « Projets » (elles vivent hors du document). */
export const sampleEntries: Entry[] = [
  entry("e_1", { title: "Léa et Tom, un mariage sous la pluie", slug: "lea-et-tom", category: "mariage", year: 2026, cover: "as_p1", excerpt: "Une journée entière de pluie, et pas une seule photo triste.", position: 1 }),
  entry("e_2", { title: "Portraits d'artisans du Puy-de-Dôme", slug: "artisans", category: "portrait", year: 2025, cover: "as_p2", excerpt: "Douze ateliers, douze visages, une lumière de fin d'après-midi.", position: 2 }),
  entry("e_3", { title: "Chaîne des Puys, aube d'octobre", slug: "chaine-des-puys", category: "paysage", year: 2025, cover: "as_p3", excerpt: "Trois matins à attendre que le brouillard se lève.", position: 3 }),
  entry("e_4", { title: "Anaïs, portrait de studio", slug: "anais", category: "portrait", year: 2026, cover: "as_p4", excerpt: "Une seule source de lumière et beaucoup de silence.", position: 4 }),
  entry("e_5", { title: "Sarah et Mehdi, à la ferme", slug: "sarah-et-mehdi", category: "mariage", year: 2025, cover: "as_p5", excerpt: "Un mariage de famille, au milieu des chèvres.", position: 5 }),
  entry("e_6", { title: "Lac Pavin en hiver", slug: "lac-pavin", category: "paysage", year: 2024, cover: "as_p6", excerpt: "Le lac gelé, et le bruit de la glace qui travaille.", position: 6 }),
];
