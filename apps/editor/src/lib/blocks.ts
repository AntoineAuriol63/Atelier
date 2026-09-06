import { Columns2, FormInput, Image, LayoutGrid, Link, List, Minus, MousePointerClick, Puzzle, Square, SquareDashed, Type, type LucideIcon } from "lucide-react";
import type { Inline, Node, Site } from "@atelier/model";
import { newId } from "@atelier/model";

export type BlockPreset = { id: string; label: string; description: string; icon: LucideIcon; group: "Structure" | "Contenu" | "Données" | "Composants"; make: (site: Site) => Node };

const fr = (site: Site, text: string): Record<string, Inline[]> => ({ [site.settings.defaultLocale]: [{ t: "text", v: text }] });
const text = (site: Site, tag: string, content: string, name?: string): Node => ({ id: newId(), type: "text", name, props: { tag, content: fr(site, content) } });
const shared = (site: Site, name: string): string[] => { const s = site.sharedStyles.find((x) => x.name === name); return s ? [s.id] : []; };

export const BLOCKS: BlockPreset[] = [
  { id: "section", label: "Section", description: "Bande pleine largeur avec marges intérieures", icon: SquareDashed, group: "Structure", make: (site) => ({ id: newId(), type: "box", name: "Section", props: { tag: "section" }, style: { shared: shared(site, "Section"), base: { display: "flex", flexDirection: "column", gap: { token: "space.5" } } }, children: [text(site, "h2", "Titre de la section"), text(site, "p", "Un paragraphe pour présenter cette section.")] }) },
  { id: "box", label: "Boîte", description: "Conteneur vide, en colonne", icon: Square, group: "Structure", make: () => ({ id: newId(), type: "box", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [] }) },
  { id: "columns", label: "Colonnes", description: "Deux colonnes égales, une seule sur mobile", icon: Columns2, group: "Structure", make: (site) => ({ id: newId(), type: "box", name: "Colonnes", props: { tag: "div" }, style: { base: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: { token: "space.6" } }, breakpoints: { mobile: { gridTemplateColumns: "1fr" } } }, children: [
    { id: newId(), type: "box", name: "Colonne 1", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [text(site, "p", "Première colonne.")] },
    { id: newId(), type: "box", name: "Colonne 2", props: { tag: "div" }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [text(site, "p", "Deuxième colonne.")] },
  ] }) },
  { id: "heading", label: "Titre", description: "Titre de niveau 2", icon: Type, group: "Contenu", make: (site) => text(site, "h2", "Nouveau titre") },
  { id: "paragraph", label: "Paragraphe", description: "Bloc de texte", icon: Type, group: "Contenu", make: (site) => text(site, "p", "Nouveau paragraphe. Cliquez pour modifier le texte.") },
  { id: "image", label: "Image", description: "Image à choisir dans les ressources", icon: Image, group: "Contenu", make: () => ({ id: newId(), type: "image", props: { asset: null, alt: { fr: "" }, fit: "cover", ratio: "3 / 2" }, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } }) },
  { id: "button", label: "Bouton", description: "Lien stylé en bouton", icon: MousePointerClick, group: "Contenu", make: (site) => ({ id: newId(), type: "link", name: "Bouton", props: { tag: "a", href: { kind: "url", url: "#" } }, style: { shared: shared(site, "Bouton") }, children: [text(site, "span", "Cliquez ici")] }) },
  { id: "link", label: "Lien", description: "Lien texte", icon: Link, group: "Contenu", make: (site) => ({ id: newId(), type: "link", props: { tag: "a", href: { kind: "url", url: "#" } }, children: [text(site, "span", "Lien")] }) },
  { id: "list", label: "Liste", description: "Liste à puces", icon: List, group: "Contenu", make: (site) => ({ id: newId(), type: "list", props: { ordered: false }, children: [1, 2, 3].map((i) => ({ id: newId(), type: "listItem", props: {}, children: [text(site, "span", `Élément ${i}`)] })) }) },
  { id: "divider", label: "Séparateur", description: "Ligne horizontale", icon: Minus, group: "Contenu", make: () => ({ id: newId(), type: "divider", props: {}, style: { base: { borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: { token: "color.line" }, borderBottomWidth: "0" } } }) },
  { id: "collection", label: "Vue de base de données", description: "Grille des entrées d'une base", icon: LayoutGrid, group: "Données", make: (site) => {
    const db = site.databases[0];
    const itemId = newId();
    return { id: newId(), type: "collection", name: db ? `Vue · ${db.name[site.settings.defaultLocale] ?? db.slug}` : "Vue", props: { database: db?.id ?? "", view: { layout: "gallery", sort: [], columns: { base: 3, tablet: 2, small: 1 } } },
      style: { base: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { token: "space.5" } }, breakpoints: { tablet: { gridTemplateColumns: "repeat(2, 1fr)" }, small: { gridTemplateColumns: "1fr" } } },
      children: [{ id: itemId, type: "item", name: "Carte", props: {}, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.3" } } }, children: [
        { id: newId(), type: "image", props: { alt: { fr: "" }, fit: "cover", ratio: "4 / 5" }, bindings: db ? { asset: { source: "item", path: "cover" }, alt: { source: "item", path: db.titleField } } : undefined, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } },
        { id: newId(), type: "text", props: { tag: "h3", content: { [site.settings.defaultLocale]: db ? [{ t: "bind", binding: { source: "item", path: db.titleField } }] : [{ t: "text", v: "Titre" }] } } },
      ] }] };
  } },
  { id: "form", label: "Formulaire", description: "Nom, email, message et bouton d'envoi", icon: FormInput, group: "Données", make: (site) => ({ id: newId(), type: "form", name: "Formulaire", props: { formId: newId(), successMessage: { fr: "Merci, votre message est bien envoyé." } }, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.4" } } }, children: [
    { id: newId(), type: "field", props: { fieldType: "text", name: "name", label: { fr: "Votre nom" }, required: true } },
    { id: newId(), type: "field", props: { fieldType: "email", name: "email", label: { fr: "Votre email" }, required: true } },
    { id: newId(), type: "field", props: { fieldType: "textarea", name: "message", label: { fr: "Votre message" }, required: true } },
    { id: newId(), type: "link", props: { tag: "button", type: "submit" }, style: { shared: shared(site, "Bouton"), base: { alignSelf: "flex-start" } }, children: [text(site, "span", "Envoyer")] },
  ] }) },
];

/** Un préréglage par composant du site. */
export function componentPresets(site: Site): BlockPreset[] {
  return site.components.map((c) => ({ id: `cmp:${c.id}`, label: c.name, description: c.description ?? "Composant du site", icon: Puzzle, group: "Composants", make: () => ({ id: newId(), type: "instance", name: c.name, props: { component: c.id } }) }));
}
