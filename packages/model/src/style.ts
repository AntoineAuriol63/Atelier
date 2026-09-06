import type { Breakpoint, Node, SharedStyle, Site, StyleProps, StyleSet, StyleValue } from "./types";

export type StyleSource =
  | { kind: "local" }                                  // posé sur ce nœud, à ce point de rupture
  | { kind: "inherited"; breakpoint: string }           // posé sur ce nœud, à un point plus large (ou la base)
  | { kind: "shared"; style: string; breakpoint: string }   // vient d'un style partagé
  | { kind: "default"; from: string };                  // valeur par défaut du thème (typeDefaults)

export type ResolvedValue = { value: StyleValue; source: StyleSource };
export type ResolvedStyle = Record<string, ResolvedValue>;

export const BASE = "base";

/** Chaîne de cascade jusqu'à `bp` : base, puis les points plus larges, puis `bp` lui-même. */
export function cascadeChain(breakpoints: Breakpoint[], bp: string): string[] {
  if (bp === BASE) return [BASE];
  const desc = [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
  const idx = desc.findIndex((b) => b.id === bp);
  if (idx < 0) return [BASE];
  return [BASE, ...desc.slice(0, idx + 1).map((b) => b.id)];
}

/** Point de rupture actif pour une largeur donnée : le plus étroit dont le seuil couvre la largeur. */
export function breakpointForWidth(breakpoints: Breakpoint[], width: number): string {
  const asc = [...breakpoints].sort((a, b) => a.maxWidth - b.maxWidth);
  return asc.find((b) => width <= b.maxWidth)?.id ?? BASE;
}

function propsAt(style: Omit<StyleSet, "shared"> | undefined, bp: string): StyleProps | undefined {
  if (!style) return undefined;
  return bp === BASE ? style.base : style.breakpoints?.[bp];
}

function resolveShared(site: Site, id: string, depth = 0): Omit<StyleSet, "shared"> | undefined {
  const s: SharedStyle | undefined = site.sharedStyles.find((x) => x.id === id);
  if (!s) return undefined;
  if (!s.extends || depth > 5) return s.style;
  const parent = resolveShared(site, s.extends, depth + 1);
  if (!parent) return s.style;
  const merge = (a?: Record<string, StyleProps>, b?: Record<string, StyleProps>) => {
    const out: Record<string, StyleProps> = {};
    for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) out[k] = { ...(a?.[k] ?? {}), ...(b?.[k] ?? {}) };
    return out;
  };
  return { base: { ...(parent.base ?? {}), ...(s.style.base ?? {}) }, breakpoints: merge(parent.breakpoints, s.style.breakpoints), states: merge(parent.states, s.style.states) };
}

/** Clé des valeurs par défaut du thème pour un nœud : sa balise, sinon son type. */
export function typeDefaultKey(node: Node): string | undefined {
  const tag = typeof node.props.tag === "string" ? node.props.tag : undefined;
  if (node.type === "text" || node.type === "link") return tag;
  if (node.type === "image") return "image";
  return undefined;
}

/**
 * Valeur effective de chaque propriété de style d'un nœud au point de rupture `bp`, avec sa source.
 * Ordre, du plus faible au plus fort : défauts du thème → styles partagés (dans l'ordre, chacun en cascade)
 * → nœud en cascade (base, points plus larges, `bp`).
 */
export function resolveNodeStyle(site: Site, node: Node, bp: string): ResolvedStyle {
  const out: ResolvedStyle = {};
  const chain = cascadeChain(site.settings.breakpoints, bp);
  const key = typeDefaultKey(node);
  const defaults = key ? site.theme.typeDefaults[key] : undefined;
  if (defaults) for (const [p, v] of Object.entries(defaults)) out[p] = { value: v, source: { kind: "default", from: key! } };
  for (const id of node.style?.shared ?? []) {
    const st = resolveShared(site, id);
    if (!st) continue;
    for (const b of chain) {
      const props = propsAt(st, b);
      if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: { kind: "shared", style: id, breakpoint: b } };
    }
  }
  const local = node.style;
  for (const b of chain) {
    const props = propsAt(local, b);
    if (!props) continue;
    for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp ? { kind: "local" } : { kind: "inherited", breakpoint: b } };
  }
  return out;
}

/** Chemin d'opération pour poser une propriété de style au point `bp`. */
export function stylePath(bp: string, prop: string, state?: string): string {
  if (state) return bp === BASE ? `style.states.${state}.${prop}` : `style.stateBreakpoints.${state}.${bp}.${prop}`;
  return bp === BASE ? `style.base.${prop}` : `style.breakpoints.${bp}.${prop}`;
}

/** Nombre de propriétés posées sur le nœud à chaque point de rupture (pour la section Responsive). */
export function overridesByBreakpoint(site: Site, node: Node): Record<string, string[]> {
  const out: Record<string, string[]> = { [BASE]: Object.keys(node.style?.base ?? {}) };
  for (const b of site.settings.breakpoints) out[b.id] = Object.keys(node.style?.breakpoints?.[b.id] ?? {});
  return out;
}
