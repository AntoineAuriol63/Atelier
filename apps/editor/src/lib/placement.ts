import type { NodeLocation, Site } from "@atelier/model";
import { resolveNodeStyle } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

/**
 * D'où vient la largeur d'un élément (25 septembre 2026, question d'Antoine sur le héros : « aucune largeur définie, et pourtant pas la même
 * taille ») : de la grille de son parent (la colonne et le gabarit) ou de la ligne de son parent (son contenu, plus sa part d'espace libre s'il
 * s'étend). En colonne ou en bloc, la largeur est celle du parent : rien à dire.
 */
export type Placement = {
  kind: "grid" | "row";
  parentId: string;
  parentLabel: string;
  /** Rang parmi les enfants du parent, et leur nombre. */
  index: number;
  count: number;
  /** Grille : le gabarit des colonnes et leur nombre. */
  template?: string;
  tracks?: number;
  /** Ligne : l'élément prend sa part de l'espace libre (« Étendre »). */
  grow: boolean;
};

/** Le nombre de colonnes d'un gabarit `grid-template-columns` (les `repeat(n, …)` comptent n). */
export function gridTrackCount(template: string): number {
  let t = template.trim();
  if (!t) return 0;
  let n = 0;
  t = t.replace(/repeat\(\s*(\d+)\s*,([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_m, k: string) => { n += Number(k); return " "; });
  return n + t.split(/\s+/).filter((x) => x && !/^\[.*\]$/.test(x)).length;
}

export function placementOf(site: Site, loc: NodeLocation, bp: string): Placement | undefined {
  const parent = loc.parent;
  if (!parent) return undefined;
  const ps = resolveNodeStyle(site, parent, bp);
  const display = ps.display?.value as string | undefined;
  const siblings = parent.children ?? [];
  const index = Math.max(0, siblings.findIndex((c) => c.id === loc.node.id));
  const base = { parentId: parent.id, parentLabel: nodeLabel(parent), index, count: siblings.length };
  if (display === "grid") {
    const template = String(ps.gridTemplateColumns?.value ?? "").trim();
    return { kind: "grid", ...base, template, tracks: gridTrackCount(template), grow: false };
  }
  if (display === "flex" || display === "inline-flex") {
    const dir = (ps.flexDirection?.value as string | undefined) ?? "row";
    if (dir.startsWith("column")) return undefined;
    const own = resolveNodeStyle(site, loc.node, bp);
    const grow = Number(own.flexGrow?.value ?? 0) > 0;
    return { kind: "row", ...base, grow };
  }
  return undefined;
}

const q = (s: string) => `« ${s} »`;
const voisins = (n: number) => (n === 1 ? "1 voisin" : `${n} voisins`);

/** La phrase qui dit d'où vient la largeur ; `ownWidth` : l'élément a une largeur réglée. */
export function placementSentence(p: Placement, ownWidth: boolean): string {
  if (p.kind === "grid") {
    const col = p.tracks ? `colonne ${(p.index % p.tracks) + 1} sur ${p.tracks}` : "colonne automatique";
    const tpl = p.template ? ` (${p.template})` : "";
    return ownWidth ? `Dans la ${col} de ${q(p.parentLabel)}${tpl} ; sa largeur réglée ci-dessus s'applique dedans.` : `Largeur décidée par ${q(p.parentLabel)} : ${col}${tpl}.`;
  }
  const head = `Dans la ligne ${q(p.parentLabel)}, avec ${voisins(p.count - 1)}`;
  if (ownWidth) return `${head} ; sa largeur réglée ci-dessus s'applique.`;
  return p.grow ? `${head} : la largeur de son contenu, plus sa part de l'espace libre.` : `${head} : la largeur de son contenu. « Étendre », dans Place dans son parent, lui donne une part égale de la ligne.`;
}
