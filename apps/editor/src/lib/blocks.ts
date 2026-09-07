import { Columns2, FormInput, Image, LayoutGrid, Link, List, Minus, MousePointerClick, Puzzle, Quote, Square, SquareDashed, Type, type LucideIcon } from "lucide-react";
import type { Inline, Node, Site, StyleProps } from "@atelier/model";
import { layoutGridAt, newId } from "@atelier/model";

export type BlockPreset = { id: string; label: string; description: string; /** Autres mots sous lesquels on cherche ce bloc (menu / et palette). */ keywords?: string; icon: LucideIcon; group: "Sections" | "Structure" | "Contenu" | "Données" | "Composants"; make: (site: Site) => Node };

const fr = (site: Site, text: string): Record<string, Inline[]> => ({ [site.settings.defaultLocale]: [{ t: "text", v: text }] });
const text = (site: Site, tag: string, content: string, name?: string): Node => ({ id: newId(), type: "text", name, props: { tag, content: fr(site, content) } });
const shared = (site: Site, name: string): string[] => { const s = site.sharedStyles.find((x) => x.name === name); return s ? [s.id] : []; };

export const BLOCKS: BlockPreset[] = [
  { id: "section", label: "Section", description: "Bande pleine largeur avec marges intérieures", keywords: "section bande fond", icon: SquareDashed, group: "Structure", make: (site) => ({ id: newId(), type: "box", name: "Section", props: { tag: "section" }, style: { shared: shared(site, "Section"), base: { display: "flex", flexDirection: "column", gap: { token: "space.5" } } }, children: [text(site, "h2", "Titre de la section"), text(site, "p", "Un paragraphe pour présenter cette section.")] }) },
  { id: "box", label: "Boîte", description: "Conteneur vide, en colonne", keywords: "div conteneur groupe boîte", icon: Square, group: "Structure", make: () => ({ id: newId(), type: "box", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [] }) },
  { id: "columns", label: "Colonnes", description: "Deux colonnes égales, une seule sur mobile", keywords: "colonnes grille deux côte à côte", icon: Columns2, group: "Structure", make: (site) => ({ id: newId(), type: "box", name: "Colonnes", props: { tag: "div" }, style: { base: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: layoutGridAt(site, "base").gutter }, breakpoints: { mobile: { gridTemplateColumns: "1fr" } } }, children: [
    { id: newId(), type: "box", name: "Colonne 1", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [text(site, "p", "Première colonne.")] },
    { id: newId(), type: "box", name: "Colonne 2", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [text(site, "p", "Deuxième colonne.")] },
  ] }) },
  { id: "heading", label: "Titre", description: "Titre de niveau 2", keywords: "titre h2 h3 h4 heading", icon: Type, group: "Contenu", make: (site) => text(site, "h2", "Nouveau titre") },
  { id: "paragraph", label: "Paragraphe", description: "Bloc de texte", keywords: "texte p paragraphe", icon: Type, group: "Contenu", make: (site) => text(site, "p", "Nouveau paragraphe. Cliquez pour modifier le texte.") },
  { id: "quote", label: "Citation", description: "Texte en exergue (balise blockquote)", keywords: "citation blockquote témoignage exergue avis", icon: Quote, group: "Contenu", make: (site) => text(site, "blockquote", "Une phrase à mettre en avant, ou le mot d’un client.") },
  { id: "image", label: "Image", description: "Image à choisir dans les ressources", keywords: "image photo visuel illustration", icon: Image, group: "Contenu", make: () => ({ id: newId(), type: "image", props: { asset: null, alt: { fr: "" }, fit: "cover", ratio: "3 / 2" }, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } }) },
  { id: "button", label: "Bouton", description: "Lien stylé en bouton", keywords: "bouton cta lien action", icon: MousePointerClick, group: "Contenu", make: (site) => ({ id: newId(), type: "link", name: "Bouton", props: { tag: "a", href: { kind: "url", url: "#" } }, style: { shared: shared(site, "Bouton"), base: { alignSelf: "flex-start" } }, children: [text(site, "span", "Cliquez ici")] }) },
  { id: "link", label: "Lien", description: "Lien texte", keywords: "lien url ancre", icon: Link, group: "Contenu", make: (site) => ({ id: newId(), type: "link", props: { tag: "a", href: { kind: "url", url: "#" } }, children: [text(site, "span", "Lien")] }) },
  { id: "list", label: "Liste", description: "Liste à puces", keywords: "liste puces ul étapes", icon: List, group: "Contenu", make: (site) => ({ id: newId(), type: "list", props: { ordered: false }, children: [1, 2, 3].map((i) => ({ id: newId(), type: "listItem", props: {}, children: [text(site, "span", `Élément ${i}`)] })) }) },
  { id: "divider", label: "Séparateur", description: "Trait entre deux blocs : horizontal dans une colonne, vertical dans une rangée", keywords: "séparateur hr ligne trait", icon: Minus, group: "Contenu", make: () => ({ id: newId(), type: "divider", props: {} }) },
  { id: "collection", label: "Vue de base de données", description: "Grille des entrées d'une base", keywords: "base de données galerie collection projets articles vue", icon: LayoutGrid, group: "Données", make: (site) => {
    const db = site.databases[0];
    const itemId = newId();
    return { id: newId(), type: "collection", name: db ? `Vue · ${db.name[site.settings.defaultLocale] ?? db.slug}` : "Vue", props: { database: db?.id ?? "", view: { layout: "gallery", sort: [], columns: { base: 3, tablet: 2, small: 1 } } },
      style: { base: { gap: { token: "space.5" } } },
      children: [{ id: itemId, type: "item", name: "Carte", props: {}, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.3" } } }, children: [
        { id: newId(), type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 5" }, bindings: db ? { asset: { source: "item", path: "cover" }, alt: { source: "item", path: db.titleField } } : undefined, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } },
        { id: newId(), type: "text", props: { tag: "h3", content: { [site.settings.defaultLocale]: db ? [{ t: "bind", binding: { source: "item", path: db.titleField } }] : [{ t: "text", v: "Titre" }] } } },
      ] }] };
  } },
  { id: "form", label: "Formulaire", description: "Nom, email, message et bouton d'envoi", keywords: "formulaire contact email envoi", icon: FormInput, group: "Données", make: (site) => ({ id: newId(), type: "form", name: "Formulaire", props: { formId: newId(), successMessage: { fr: "Merci, votre message est bien envoyé." } }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [
    { id: newId(), type: "field", props: { fieldType: "text", name: "name", label: { fr: "Votre nom" }, required: true } },
    { id: newId(), type: "field", props: { fieldType: "email", name: "email", label: { fr: "Votre email" }, required: true } },
    { id: newId(), type: "field", props: { fieldType: "textarea", name: "message", label: { fr: "Votre message" }, required: true } },
    { id: newId(), type: "link", props: { tag: "button", type: "submit" }, style: { shared: shared(site, "Bouton"), base: { alignSelf: "flex-start" } }, children: [text(site, "span", "Envoyer")] },
  ] }) },
];

const section = (site: Site, name: string, children: Node[], base: Record<string, unknown> = {}, mobile?: StyleProps): Node => ({ id: newId(), type: "box", name, props: { tag: "section" }, style: { shared: shared(site, "Section"), base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto", ...base }, ...(mobile ? { breakpoints: { mobile } } : {}) }, children });
const button = (site: Site, label: string, secondary = false): Node => ({ id: newId(), type: "link", name: label, props: { tag: "a", href: { kind: "url", url: "#" } }, style: { shared: shared(site, secondary ? "Bouton / secondaire" : "Bouton") }, children: [text(site, "span", label)] });
const image = (ratio: string): Node => ({ id: newId(), type: "image", props: { asset: null, alt: { fr: "" }, fit: "cover", ratio }, style: { base: { borderRadius: { token: "radius.lg" }, overflow: "hidden" } } });

/** Modèles de sections prêts à insérer : des blocs ordinaires, entièrement modifiables. */
export const SECTIONS: BlockPreset[] = [
  { id: "sec-hero", label: "Héros", description: "Surtitre, grand titre, texte et deux boutons, avec une image", keywords: "héros hero bannière accueil", icon: LayoutGrid, group: "Sections", make: (site) => section(site, "Héros", [
    { id: newId(), type: "box", name: "Texte", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, alignItems: "flex-start" } }, children: [
      text(site, "p", "Surtitre", "Surtitre"), text(site, "h1", "Un titre qui donne envie de lire la suite"), text(site, "p", "Une ou deux phrases pour dire ce que vous faites, pour qui, et ce qui vous distingue."),
      { id: newId(), type: "box", props: { tag: "div" }, style: { base: { display: "flex", gap: { token: "space.3" }, flexWrap: "wrap" } }, children: [button(site, "Action principale"), button(site, "En savoir plus", true)] },
    ] },
    image("4 / 5"),
  ], { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: { token: "space.10" }, alignItems: "center" }, { gridTemplateColumns: "1fr", gap: { token: "space.6" } }) },
  { id: "sec-text-image", label: "Texte et image", description: "Un titre et un paragraphe à côté d'une image", keywords: "texte image média présentation", icon: Columns2, group: "Sections", make: (site) => section(site, "Texte et image", [
    { id: newId(), type: "box", name: "Texte", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [text(site, "h2", "Un titre de section"), text(site, "p", "Un paragraphe qui développe une idée, un service, une étape.")] },
    image("4 / 3"),
  ], { display: "grid", gridTemplateColumns: "1fr 1fr", gap: { token: "space.8" }, alignItems: "center" }, { gridTemplateColumns: "1fr", gap: { token: "space.5" } }) },
  { id: "sec-features", label: "Trois points forts", description: "Trois colonnes avec titre et texte", keywords: "points forts avantages services trois colonnes", icon: Columns2, group: "Sections", make: (site) => section(site, "Points forts", [
    text(site, "h2", "Pourquoi nous choisir"),
    { id: newId(), type: "box", name: "Colonnes", props: { tag: "div" }, style: { base: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { token: "space.6" } }, breakpoints: { mobile: { gridTemplateColumns: "1fr" } } }, children: [1, 2, 3].map((i) => ({ id: newId(), type: "box" as const, name: `Point ${i}`, props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.3" } } }, children: [text(site, "h3", `Point fort ${i}`), text(site, "p", "Une phrase qui explique ce point en termes concrets.")] })) },
  ]) },
  { id: "sec-cta", label: "Appel à l'action", description: "Un titre, une phrase et un bouton, sur fond de surface", keywords: "appel à l’action cta bouton contact", icon: MousePointerClick, group: "Sections", make: (site) => section(site, "Appel à l'action", [
    text(site, "h2", "Un projet, une question ?"), text(site, "p", "Écrivez-nous, nous répondons vite."), button(site, "Nous contacter"),
  ], { alignItems: "flex-start", background: { token: "color.surface" }, borderRadius: { token: "radius.lg" } }) },
  { id: "sec-faq", label: "Questions fréquentes", description: "Trois questions et leurs réponses", keywords: "faq questions réponses", icon: List, group: "Sections", make: (site) => section(site, "Questions fréquentes", [
    text(site, "h2", "Questions fréquentes"),
    ...[1, 2, 3].map((i) => ({ id: newId(), type: "box" as const, name: `Question ${i}`, props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.2" }, paddingTop: { token: "space.4" }, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: { token: "color.line" } } }, children: [text(site, "h3", `Question ${i} ?`), text(site, "p", "La réponse, claire et courte.")] })),
  ], { maxWidth: { token: "width.narrow" } }) },
];

/** Un préréglage par composant du site. */
/** Tout ce qui peut s'insérer : sections, blocs, composants du site. */
export function allPresets(site: Site): BlockPreset[] {
  return [...SECTIONS, ...BLOCKS, ...componentPresets(site)];
}

export function componentPresets(site: Site): BlockPreset[] {
  return site.components.map((c) => ({ id: `cmp:${c.id}`, label: c.name, description: c.description ?? "Composant du site", icon: Puzzle, group: "Composants", make: () => ({ id: newId(), type: "instance", name: c.name, props: { component: c.id } }) }));
}
