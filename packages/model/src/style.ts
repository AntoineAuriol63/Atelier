import type { Breakpoint, LayoutGrid, Node, SharedStyle, Site, StyleProps, StyleSet, StyleValue } from "./types";

export type StyleSource =
  | { kind: "local" }                                                          // posé ici (ce nœud, ce point, cet état)
  | { kind: "inherited"; breakpoint: string; fromState?: string | null }        // posé sur ce nœud à un point plus large ; `fromState: null` = vient de l'état normal
  | { kind: "shared"; style: string; breakpoint: string; state?: string }       // vient d'un style partagé
  | { kind: "default"; from: string };                                         // valeur par défaut du thème (typeDefaults)

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

function propsAt(style: Omit<StyleSet, "shared"> | undefined, bp: string, state?: string): StyleProps | undefined {
  if (!style) return undefined;
  if (state) return bp === BASE ? style.states?.[state] : style.stateBreakpoints?.[state]?.[bp];
  return bp === BASE ? style.base : style.breakpoints?.[bp];
}

/** Jeu de styles d'un style partagé, héritage (`extends`) résolu. */
export function resolveSharedStyleSet(site: Site, id: string, depth = 0): Omit<StyleSet, "shared"> | undefined {
  return resolveShared(site, id, depth);
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
  const mergeDeep = (a?: Record<string, Record<string, StyleProps>>, b?: Record<string, Record<string, StyleProps>>) => {
    const out: Record<string, Record<string, StyleProps>> = {};
    for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) out[k] = merge(a?.[k], b?.[k]);
    return out;
  };
  return { base: { ...(parent.base ?? {}), ...(s.style.base ?? {}) }, breakpoints: merge(parent.breakpoints, s.style.breakpoints), states: merge(parent.states, s.style.states), stateBreakpoints: mergeDeep(parent.stateBreakpoints, s.style.stateBreakpoints) };
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
 * → nœud en cascade (base, points plus larges, `bp`). Avec `state`, les valeurs de l'état se superposent
 * (styles partagés puis nœud) ; les valeurs de l'état normal sont alors marquées héritées (`fromState: null`).
 */
export function resolveNodeStyle(site: Site, node: Node, bp: string, state?: string): ResolvedStyle {
  const out: ResolvedStyle = {};
  const chain = cascadeChain(site.settings.breakpoints, bp);
  const key = typeDefaultKey(node);
  const defaults = key ? site.theme.typeDefaults[key] : undefined;
  if (defaults) for (const [p, v] of Object.entries(defaults)) out[p] = { value: v, source: { kind: "default", from: key! } };
  const sharedSets = (node.style?.shared ?? []).map((id) => ({ id, st: resolveShared(site, id) })).filter((x) => x.st) as { id: string; st: Omit<StyleSet, "shared"> }[];
  for (const { id, st } of sharedSets) {
    for (const b of chain) {
      const props = propsAt(st, b);
      if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: { kind: "shared", style: id, breakpoint: b } };
    }
  }
  for (const b of chain) {
    const props = propsAt(node.style, b);
    if (!props) continue;
    for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp ? { kind: "local" } : { kind: "inherited", breakpoint: b } };
  }
  if (!state) return out;
  // En mode état : tout ce qui précède vient de l'état normal.
  for (const p of Object.keys(out)) {
    const src = out[p]!.source;
    if (src.kind === "local") out[p] = { value: out[p]!.value, source: { kind: "inherited", breakpoint: bp, fromState: null } };
    else if (src.kind === "inherited") out[p] = { value: out[p]!.value, source: { ...src, fromState: null } };
  }
  for (const { id, st } of sharedSets) {
    for (const b of chain) {
      const props = propsAt(st, b, state);
      if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: { kind: "shared", style: id, breakpoint: b, state } };
    }
  }
  for (const b of chain) {
    const props = propsAt(node.style, b, state);
    if (!props) continue;
    for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp ? { kind: "local" } : { kind: "inherited", breakpoint: b, fromState: state } };
  }
  return out;
}

/** Même résolution pour un style partagé édité seul (héritage `extends` inclus, sans nœud). */
export function resolveSharedStyle(site: Site, id: string, bp: string, state?: string): ResolvedStyle {
  const out: ResolvedStyle = {};
  const st = resolveShared(site, id);
  if (!st) return out;
  const own = site.sharedStyles.find((x) => x.id === id)?.style;
  const chain = cascadeChain(site.settings.breakpoints, bp);
  const ownHas = (b: string, p: string, s?: string) => propsAt(own, b, s)?.[p] !== undefined;
  for (const b of chain) {
    const props = propsAt(st, b);
    if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp && ownHas(b, p) && !state ? { kind: "local" } : { kind: "inherited", breakpoint: b, ...(state ? { fromState: null } : {}) } };
  }
  if (!state) return out;
  for (const b of chain) {
    const props = propsAt(st, b, state);
    if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp && ownHas(b, p, state) ? { kind: "local" } : { kind: "inherited", breakpoint: b, fromState: state } };
  }
  return out;
}

/** Chemin d'opération (`site.set`) pour poser une propriété d'un style partagé. */
export function sharedStylePath(site: Site, id: string, bp: string, prop: string, state?: string): string | undefined {
  const i = site.sharedStyles.findIndex((s) => s.id === id);
  if (i < 0) return undefined;
  return `sharedStyles.${i}.${stylePath(bp, prop, state)}`;
}

/** Nœuds qui utilisent un style partagé (pages et composants). */
export function sharedStyleUsages(site: Site, id: string): { node: Node; owner: string }[] {
  const out: { node: Node; owner: string }[] = [];
  const visit = (n: Node, owner: string) => { if (n.style?.shared?.includes(id)) out.push({ node: n, owner }); n.children?.forEach((c) => visit(c, owner)); };
  site.pages.forEach((p) => visit(p.root, p.id));
  site.components.forEach((c) => visit(c.root, c.id));
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

export type ResolvedLayoutGrid = { columns: number; gutter: StyleValue; margin: StyleValue; maxWidth?: StyleValue };

/** Grille par défaut d'un site qui n'en définit pas : 12 colonnes, puis 8 et 4 sur les tailles plus étroites. */
export function defaultLayoutGrid(site: Site): LayoutGrid {
  const bps = [...site.settings.breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
  const byBreakpoint: LayoutGrid["byBreakpoint"] = {};
  bps.forEach((b, i) => { byBreakpoint[b.id] = { columns: i === 0 ? 8 : 4 }; });
  return { columns: 12, gutter: "24px", margin: "24px", maxWidth: site.theme.tokens.width?.content ? { token: "width.content" } : "1200px", byBreakpoint };
}

/** Grille effective à un point de rupture (cascade descendante, comme les styles). */
export function layoutGridAt(site: Site, bp: string): ResolvedLayoutGrid {
  const g = site.settings.layoutGrid ?? defaultLayoutGrid(site);
  let out: ResolvedLayoutGrid = { columns: g.columns, gutter: g.gutter, margin: g.margin, maxWidth: g.maxWidth };
  for (const b of cascadeChain(site.settings.breakpoints, bp)) {
    if (b === BASE) continue;
    const o = g.byBreakpoint?.[b];
    if (o) out = { ...out, ...(o.columns ? { columns: o.columns } : {}), ...(o.gutter !== undefined ? { gutter: o.gutter } : {}), ...(o.margin !== undefined ? { margin: o.margin } : {}) };
  }
  return out;
}
