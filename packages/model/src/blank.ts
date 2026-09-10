import type { Node, Site } from "./types";
import { sampleSite } from "./sample";
import { newId } from "./ids";

/** Un site vierge : le thème et les styles partagés de l'exemple, un en-tête et un pied de page minimaux, une page d'accueil. */
export function blankSite(id: string, name: string): Site {
  const locale = "fr";
  const text = (tag: string, content: string, extra: Partial<Node> = {}): Node => ({ id: newId(), type: "text", props: { tag, content: { [locale]: [{ t: "text", v: content }] } }, ...extra });
  const homeId = newId();
  const header: Node = { id: newId(), type: "box", name: "En-tête", props: { tag: "header" }, style: { base: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: { token: "space.5" }, paddingBottom: { token: "space.5" }, paddingLeft: { token: "space.6" }, paddingRight: { token: "space.6" } } }, children: [
    { id: newId(), type: "link", name: "Logo", props: { tag: "a", href: { kind: "page", page: homeId } }, style: { base: { fontFamily: { token: "font.display" }, fontSize: { token: "fontSize.lg" }, textDecoration: "none" } }, children: [text("span", name)] },
    { id: newId(), type: "box", name: "Navigation", props: { tag: "nav" }, style: { base: { display: "flex", gap: { token: "space.5" }, fontSize: { token: "fontSize.sm" } } }, children: [] },
  ] };
  const footer: Node = { id: newId(), type: "box", name: "Pied de page", props: { tag: "footer" }, style: { shared: ["st_section"], base: { display: "flex", justifyContent: "space-between", fontSize: { token: "fontSize.sm" }, color: { token: "color.muted" } } }, children: [text("p", `© ${new Date().getFullYear()} ${name}`)] };
  const headerCmp = { id: newId(), name: "En-tête", scope: "site" as const, props: [], root: header };
  const footerCmp = { id: newId(), name: "Pied de page", scope: "site" as const, props: [], root: footer };
  return {
    schemaVersion: 2,
    id,
    name,
    settings: { ...structuredClone(sampleSite.settings), subdomain: undefined, seo: { titleSuffix: { [locale]: ` · ${name}` } } },
    theme: structuredClone(sampleSite.theme),
    sharedStyles: [
      ...structuredClone(sampleSite.sharedStyles),
      // Deux styles que tout site finit par demander : la carte qui se soulève au survol, l'étiquette.
      { id: "st_card", name: "Carte", style: { base: { background: { token: "color.surface" }, borderWidth: "1px", borderStyle: "solid", borderColor: { token: "color.line" }, borderRadius: { token: "radius.lg" }, overflow: "hidden", transition: "transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .3s" }, states: { hover: { transform: "translateY(-6px)", boxShadow: { token: "shadow.md" }, borderColor: { token: "color.accent" } } } } },
      { id: "st_badge", name: "Étiquette", style: { base: { display: "inline-flex", alignItems: "center", gap: { token: "space.1" }, fontSize: { token: "fontSize.xs" }, paddingTop: "0.2rem", paddingBottom: "0.2rem", paddingLeft: { token: "space.3" }, paddingRight: { token: "space.3" }, borderRadius: { token: "radius.full" }, borderWidth: "1px", borderStyle: "solid", borderColor: { token: "color.line" }, color: { token: "color.muted" } } } },
    ],
    components: [headerCmp, footerCmp],
    codeComponents: [],
    databases: [],
    pages: [{
      id: homeId, name: { [locale]: "Accueil" }, path: "/", kind: "static",
      root: { id: newId(), type: "box", name: "Page", props: { tag: "div" }, children: [
        { id: newId(), type: "instance", name: "En-tête", props: { component: headerCmp.id } },
        { id: newId(), type: "box", name: "Contenu principal", props: { tag: "main" }, style: { shared: ["st_section"], base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } }, children: [
          text("h1", `Bienvenue chez ${name}`),
          text("p", "Cliquez sur ce texte pour écrire, ou tapez « / » pour ajouter un bloc."),
        ] },
        { id: newId(), type: "instance", name: "Pied de page", props: { component: footerCmp.id } },
      ] },
    }],
    assets: [],
    redirects: [],
  };
}
