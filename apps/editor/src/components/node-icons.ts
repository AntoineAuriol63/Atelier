import { Square, Type, Image, Link, List, ListOrdered, Minus, LayoutGrid, Puzzle, FormInput, TextCursorInput, Film, Sparkles, Code2, Brackets, Boxes, PanelTop, type LucideIcon } from "lucide-react";
import type { Node, NodeType } from "@atelier/model";

export const TYPE_ICON: Record<NodeType, LucideIcon> = {
  box: Square, text: Type, list: List, listItem: ListOrdered, image: Image, video: Film, link: Link, icon: Sparkles, divider: Minus,
  embed: Code2, form: FormInput, field: TextCursorInput, collection: LayoutGrid, item: Boxes, instance: Puzzle, slot: Brackets, code: Code2,
};

export const TYPE_LABEL: Record<NodeType, string> = {
  box: "Boîte", text: "Texte", list: "Liste", listItem: "Élément de liste", image: "Image", video: "Vidéo", link: "Lien", icon: "Icône", divider: "Séparateur",
  embed: "Intégration", form: "Formulaire", field: "Champ", collection: "Collection", item: "Élément répété", instance: "Composant", slot: "Emplacement", code: "Composant code",
};

export function nodeIcon(n: Node): LucideIcon {
  if (n.type === "box" && ["header", "footer", "nav"].includes(String(n.props.tag))) return PanelTop;
  return TYPE_ICON[n.type] ?? Square;
}

export function nodeLabel(n: Node): string {
  if (n.name) return n.name;
  const tag = typeof n.props.tag === "string" ? n.props.tag : undefined;
  if (n.type === "text" && tag) return tag === "p" ? "Paragraphe" : tag.startsWith("h") ? `Titre ${tag.slice(1)}` : TYPE_LABEL.text;
  if (n.type === "box" && tag && tag !== "div") return { section: "Section", header: "En-tête", footer: "Pied de page", nav: "Navigation", main: "Contenu principal", article: "Article", aside: "Aparté", figure: "Figure" }[tag] ?? TYPE_LABEL.box;
  return TYPE_LABEL[n.type] ?? n.type;
}
