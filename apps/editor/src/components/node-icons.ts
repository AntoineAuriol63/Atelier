import { Square, Type, Image, Link, List, ListOrdered, Minus, LayoutGrid, Puzzle, FormInput, TextCursorInput, Film, Sparkles, Code2, Brackets, Boxes, PanelTop, type LucideIcon } from "lucide-react";
import type { Node, NodeType } from "@atelier/model";

export const TYPE_ICON: Record<NodeType, LucideIcon> = {
  box: Square, text: Type, list: List, listItem: ListOrdered, image: Image, video: Film, link: Link, icon: Sparkles, divider: Minus,
  embed: Code2, form: FormInput, field: TextCursorInput, collection: LayoutGrid, item: Boxes, instance: Puzzle, slot: Brackets, code: Code2,
};

export const TYPE_LABEL: Record<NodeType, string> = {
  box: "Boîte", text: "Texte", list: "Liste", listItem: "Élément de liste", image: "Image", video: "Vidéo", link: "Lien", icon: "Icône", divider: "Séparateur",
  embed: "Intégration", form: "Formulaire", field: "Champ", collection: "Vue", item: "Carte", instance: "Composant", slot: "Emplacement", code: "Composant code",
};

export function nodeIcon(n: Node): LucideIcon {
  if (n.type === "box" && ["header", "footer", "nav"].includes(String(n.props.tag))) return PanelTop;
  return TYPE_ICON[n.type] ?? Square;
}

/** Début du texte d'un nœud (première langue), pour distinguer deux paragraphes sans nom : « Une cuisine de saison… ». */
function textExcerpt(n: Node, max = 22): string {
  const content = n.props.content as Record<string, unknown[]> | undefined;
  const first = content ? Object.values(content)[0] : undefined;
  const flat = (list: unknown[] | undefined): string => (list ?? []).map((seg) => { const x = seg as { t?: string; v?: string; children?: unknown[] }; return x.t === "text" ? x.v ?? "" : x.t === "break" ? " " : x.children ? flat(x.children) : ""; }).join("");
  const text = flat(first).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  // Couper entre deux mots : la limite tombe sur une espace (le mot est entier), sinon au dernier mot complet.
  const whole = text[max] === " " || cut.lastIndexOf(" ") <= max / 2 ? cut : cut.slice(0, cut.lastIndexOf(" "));
  return `${whole.replace(/[\s,;:.]+$/, "")}…`;
}

/** Nom d'un nœud pour l'interface : son nom s'il en a un, sinon son type (et, pour un texte, un extrait de son contenu). */
export function nodeLabel(n: Node): string {
  if (n.name) return n.name;
  const tag = typeof n.props.tag === "string" ? n.props.tag : undefined;
  if (n.type === "field") { const label = (n.props.label as Record<string, string> | undefined); const first = label ? Object.values(label)[0] : undefined; return first || `Champ ${String(n.props.name ?? "")}`.trim(); }
  if (n.type === "text" && tag) { const base = tag === "p" ? "Paragraphe" : tag.startsWith("h") ? `Titre ${tag.slice(1)}` : TYPE_LABEL.text; const ex = textExcerpt(n); return ex ? `${base} « ${ex} »` : base; }
  if (n.type === "box" && tag && tag !== "div") return { section: "Section", header: "En-tête", footer: "Pied de page", nav: "Navigation", main: "Contenu principal", article: "Article", aside: "Aparté", figure: "Figure" }[tag] ?? TYPE_LABEL.box;
  return TYPE_LABEL[n.type] ?? n.type;
}
