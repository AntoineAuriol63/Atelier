import type { Node, Site } from "@atelier/model";
import { indexSite } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

/** Chemin de la racine (de la page ou du composant) jusqu'à un élément : le fil d'Ariane de la sélection, pour remonter vers un conteneur. */
export function selectionPath(site: Site, id: string): { id: string; label: string }[] {
  const index = indexSite(site);
  const out: { id: string; label: string }[] = [];
  let cur = index.get(id);
  while (cur) {
    out.unshift({ id: cur.node.id, label: nodeLabel(cur.node) });
    cur = cur.parent ? index.get(cur.parent.id) : undefined;
  }
  return out;
}

const LEAVES = new Set(["text", "image", "icon", "video", "divider"]);
const isInlineText = (n: Node) => n.type === "text" && n.props.tag === "span";

/**
 * Éléments « composés », qu'un clic désigne d'abord plutôt que le texte ou l'image qu'ils contiennent (tests simulés du 14 septembre,
 * PR10 : 5 participants sur 5 ont sélectionné le texte d'un bouton ou l'image d'une carte en voulant l'élément entier) : boutons et
 * liens, cartes d'une vue, occurrences de composant, et blocs nommés faits seulement de textes et d'images (une pastille). En Écriture,
 * où un clic sur un texte y place le curseur, seuls les blocs nommés faits de textes en ligne (étiquettes) comptent parmi ces derniers.
 */
export function compoundIds(site: Site, editMode: "write" | "design" | "animate"): string[] {
  const out: string[] = [];
  for (const { node } of indexSite(site).values()) {
    if (node.type === "link" || node.type === "item" || node.type === "instance") out.push(node.id);
    else if (node.type === "box" && node.name && node.children?.length && node.children.every((c) => (editMode === "write" ? isInlineText(c) : LEAVES.has(c.type)))) out.push(node.id);
  }
  return out;
}

/**
 * Ce qu'un clic sélectionne, d'après la chaîne des éléments sous le pointeur (du plus profond à la racine) : le composé le plus
 * extérieur qui contient l'élément cliqué ; si l'on clique à l'intérieur de l'élément déjà sélectionné, le composé le plus extérieur
 * sous lui, sinon l'élément cliqué (on descend d'un niveau à chaque clic, comme dans un logiciel de dessin).
 */
export function pickSelection(chain: string[], compounds: Set<string>, selected: string | null): string {
  const inSelected = selected ? chain.indexOf(selected) : -1;
  const scope = inSelected >= 0 ? chain.slice(0, inSelected) : chain;
  return [...scope].reverse().find((id) => compounds.has(id)) ?? chain[0]!;
}
