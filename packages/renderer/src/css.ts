import type { Asset, Breakpoint, ClassMap, ComponentDef, Node, SharedStyle, Site, StyleProps, StyleSet, StyleValue, Theme, ViewConfig } from "@atelier/model";
import { parseVariantKey, variantClass, walk } from "@atelier/model";

// ---------------------------------------------------------------- valeurs

export function tokenVar(path: string): string {
  return "--" + path.replace(/\./g, "-");
}

export function valueToCss(v: StyleValue, assets?: Map<string, Asset>): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if ("token" in v) return `var(${tokenVar(v.token)})`;
  if ("calc" in v) return `calc(${v.calc.replace(/\{([\w.]+)\}/g, (_, t: string) => `var(${tokenVar(t)})`)})`;
  if ("image" in v) {
    const url = assets?.get(v.image)?.url ?? "";
    const parts = [`url("${url}")`];
    if (v.position) parts.push(v.position);
    if (v.size) parts.push("/ " + v.size);
    if (v.repeat) parts.push(v.repeat);
    else parts.push("no-repeat");
    return parts.join(" ");
  }
  if ("gradient" in v) {
    const g = v.gradient;
    const stops = g.stops.map((s) => `${valueToCss(s.color, assets)} ${s.at}`).join(", ");
    return g.type === "linear" ? `linear-gradient(${g.angle ?? 180}deg, ${stops})` : `radial-gradient(circle, ${stops})`;
  }
  return "";
}

export function propToCss(name: string): string {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

export function declarations(props: StyleProps | undefined, assets?: Map<string, Asset>): string {
  if (!props) return "";
  return Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${propToCss(k)}:${valueToCss(v, assets)}`)
    .join(";");
}

// ---------------------------------------------------------------- thème

export function themeCss(theme: Theme): string {
  const out: string[] = [];
  const groups = Object.entries(theme.tokens) as [string, Record<string, string | Record<string, string>>][];
  const byMode = new Map<string, string[]>();
  for (const m of theme.modes) byMode.set(m.id, []);
  const root: string[] = [];
  for (const [group, tokens] of groups) {
    for (const [name, value] of Object.entries(tokens)) {
      const varName = tokenVar(`${group}.${name}`);
      if (typeof value === "string") root.push(`${varName}:${value}`);
      else {
        const def = value[theme.defaultMode] ?? Object.values(value)[0] ?? "";
        root.push(`${varName}:${def}`);
        for (const [mode, v] of Object.entries(value)) byMode.get(mode)?.push(`${varName}:${v}`);
      }
    }
  }
  out.push(`:root{${root.join(";")}}`);
  for (const [mode, decls] of byMode) {
    if (mode === theme.defaultMode || decls.length === 0) continue;
    out.push(`[data-mode="${mode}"]{${decls.join(";")}}`);
  }
  // Les défauts du thème sont enveloppés dans :where() : spécificité nulle, un réglage d'élément ou de style partagé gagne toujours.
  const selectorFor: Record<string, string> = { body: ".at-page", image: ".at-page img", a: ".at-page a" };
  for (const [key, props] of Object.entries(theme.typeDefaults)) {
    const sel = selectorFor[key] ?? `.at-page ${key}`;
    out.push(key === "body" ? `${sel}{${declarations(props)}}` : `:where(${sel}){${declarations(props)}}`);
  }
  // Base minimale, indépendante de tout reset externe.
  // Base des éléments en `:where()` (spécificité nulle) : un style posé sur un nœud (`.n-<id>`) ou partagé gagne toujours, même sur un bouton ou un champ.
  out.push(`.at-page{margin:0;min-height:100%}:where(.at-page *,.at-page *::before,.at-page *::after){box-sizing:border-box}:where(.at-page h1,.at-page h2,.at-page h3,.at-page h4,.at-page h5,.at-page h6,.at-page p,.at-page ul,.at-page ol,.at-page blockquote,.at-page figure){margin:0}:where(.at-page ul,.at-page ol){padding-left:1.25em}:where(.at-page img,.at-page video){max-width:100%}:where(.at-page hr){border:0;border-top:1px solid var(--color-line,#ddd);width:100%;height:0;margin:0;flex:none}:where(.at-page button){font:inherit;cursor:pointer;border:0;background:none}:where(.at-page input,.at-page textarea,.at-page select){font:inherit}:where(.at-page input:not([type=checkbox]):not([type=radio]),.at-page textarea,.at-page select){width:100%;padding:.55em .75em;border:1px solid var(--color-line,#ddd);border-radius:var(--radius-sm,3px);background:var(--color-surface,#fff);color:inherit}:where(.at-page [data-form-success]){color:var(--color-accent,inherit);font-weight:500}:where(.at-page [data-form-error]){color:#b42318}.at-page [data-ix-hidden]{display:none!important}`);
  return out.join("\n");
}

export function fontsHref(theme: Theme): string | null {
  const google = theme.fonts.filter((f) => f.provider === "google");
  if (google.length === 0) return null;
  const families = google.map((f) => {
    const weights = (f.weights ?? [400]).sort((a, b) => a - b).join(";");
    return `family=${encodeURIComponent(f.family).replace(/%20/g, "+")}:wght@${weights}`;
  });
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

// ---------------------------------------------------------------- règles

const STATE_SELECTOR: Record<string, string> = {
  hover: ":hover",
  focus: ":focus-visible",
  active: ":active",
  disabled: ":disabled",
  current: '[aria-current="page"]',
};

/** Sélecteur d'un état : pseudo-classe (ou attribut data-state), plus l'état forcé par l'éditeur. */
function stateRule(selector: string, state: string): string {
  const pseudo = STATE_SELECTOR[state] ?? `[data-state~="${state}"]`;
  return `${selector}${pseudo},${selector}[data-force-state~="${state}"]`;
}

const DIVIDER_VERTICAL = "width:0;height:auto;min-height:1em;align-self:stretch;border-top:0;border-left:1px solid var(--color-line,#ddd)";
const DIVIDER_HORIZONTAL = "width:100%;height:0;min-height:0;align-self:auto;border-left:0;border-top:1px solid var(--color-line,#ddd)";

/** Vrai si ces propriétés disposent les enfants côte à côte : flex en ligne, ou grille à plusieurs colonnes. */
export function isRow(props: StyleProps): boolean {
  const display = typeof props.display === "string" ? props.display : "";
  if (display === "flex" || display === "inline-flex") {
    const dir = typeof props.flexDirection === "string" ? props.flexDirection : "row";
    return dir === "row" || dir === "row-reverse";
  }
  if (display === "grid" || display === "inline-grid") {
    if (props.gridAutoFlow === "column") return true;
    const cols = typeof props.gridTemplateColumns === "string" ? props.gridTemplateColumns.trim() : "";
    if (!cols || cols === "none") return false;
    if (/repeat\(\s*(auto-fit|auto-fill|[2-9]|\d{2,})/.test(cols)) return true;
    return cols.split(/\s+(?![^(]*\))/).length > 1;
  }
  return false;
}

/** Règles CSS d'un jeu de styles pour un sélecteur, points de rupture en cascade descendante. */
export function styleSetCss(selector: string, style: Omit<StyleSet, "shared"> | undefined, breakpoints: Breakpoint[], assets?: Map<string, Asset>, hidden?: Record<string, boolean>): string {
  if (!style && !hidden) return "";
  const out: string[] = [];
  const base = declarations(style?.base, assets);
  if (base) out.push(`${selector}{${base}}`);
  // Un séparateur suit son conteneur : trait vertical dans une rangée, horizontal dans une colonne. Décidé par point de rupture, comme la disposition.
  let effective: StyleProps = { ...(style?.base ?? {}) };
  let orientation = isRow(effective);
  if (orientation) out.push(`${selector}>hr{${DIVIDER_VERTICAL}}`);
  const bpRules = new Map<string, string>();
  for (const bp of [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth)) {
    effective = { ...effective, ...(style?.breakpoints?.[bp.id] ?? {}) };
    const now = isRow(effective);
    if (now !== orientation) { bpRules.set(bp.id, `${selector}>hr{${now ? DIVIDER_VERTICAL : DIVIDER_HORIZONTAL}}`); orientation = now; }
  }
  for (const [state, props] of Object.entries(style?.states ?? {})) {
    const d = declarations(props, assets);
    if (d) out.push(`${stateRule(selector, state)}{${d}}`);
  }
  const ordered = [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
  for (const bp of ordered) {
    const rules: string[] = [];
    const d = declarations(style?.breakpoints?.[bp.id], assets);
    if (d) rules.push(`${selector}{${d}}`);
    if (hidden?.[bp.id]) rules.push(`${selector}{display:none}`);
    const hr = bpRules.get(bp.id);
    if (hr) rules.push(hr);
    for (const [state, byBp] of Object.entries(style?.stateBreakpoints ?? {})) {
      const ds = declarations(byBp[bp.id], assets);
      if (ds) rules.push(`${stateRule(selector, state)}{${ds}}`);
    }
    if (rules.length) out.push(`@media (max-width:${bp.maxWidth}px){${rules.join("")}}`);
  }
  if (hidden?.base) out.push(`${selector}{display:none}`);
  return out.join("\n");
}

function mergeStyle(parent: Omit<StyleSet, "shared"> | undefined, child: Omit<StyleSet, "shared">): Omit<StyleSet, "shared"> {
  if (!parent) return child;
  const mergeBp = (a?: Record<string, StyleProps>, b?: Record<string, StyleProps>) => {
    if (!a && !b) return undefined;
    const out: Record<string, StyleProps> = {};
    for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) out[k] = { ...(a?.[k] ?? {}), ...(b?.[k] ?? {}) };
    return out;
  };
  return {
    base: { ...(parent.base ?? {}), ...(child.base ?? {}) },
    breakpoints: mergeBp(parent.breakpoints, child.breakpoints),
    states: mergeBp(parent.states, child.states),
    stateBreakpoints: child.stateBreakpoints ?? parent.stateBreakpoints,
  };
}

export function sharedStylesCss(site: Site, assets?: Map<string, Asset>, classes?: ClassMap): string {
  const byId = new Map(site.sharedStyles.map((s) => [s.id, s]));
  const resolve = (s: SharedStyle, depth = 0): Omit<StyleSet, "shared"> => {
    if (!s.extends || depth > 5) return s.style;
    const parent = byId.get(s.extends);
    return parent ? mergeStyle(resolve(parent, depth + 1), s.style) : s.style;
  };
  return site.sharedStyles.map((s) => styleSetCss(`.${classes?.shared.get(s.id) ?? `s-${s.id}`}`, resolve(s), site.settings.breakpoints, assets)).filter(Boolean).join("\n");
}

/**
 * CSS d'une vue de collection : la disposition et les colonnes par point de rupture viennent de la vue (7.2),
 * émises avant le style du nœud pour qu'un réglage posé à la main garde le dernier mot.
 */
export function collectionViewCss(selector: string, view: ViewConfig | undefined, breakpoints: Breakpoint[]): string {
  const layout = view?.layout ?? "list";
  const cols: Record<string, number | undefined> = view?.columns ?? {};
  const out: string[] = [];
  const grid = (n: number) => `grid-template-columns:repeat(${Math.max(1, Math.round(n))},minmax(0,1fr))`;
  const slide = (n: number) => `${selector}>*{flex:0 0 calc(100% / ${Math.max(1, Math.round(n))});scroll-snap-align:start}`;
  if (layout === "gallery" || layout === "table") out.push(`${selector}{display:grid;${grid(cols.base ?? 3)}}`);
  else if (layout === "carousel") out.push(`${selector}{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}${slide(cols.base ?? 1)}`);
  else out.push(`${selector}{display:flex;flex-direction:column}`);
  for (const bp of [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth)) {
    const n = cols[bp.id];
    if (n === undefined) continue;
    if (layout === "gallery" || layout === "table") out.push(`@media (max-width:${bp.maxWidth}px){${selector}{${grid(n)}}}`);
    else if (layout === "carousel") out.push(`@media (max-width:${bp.maxWidth}px){${slide(n)}}`);
  }
  return out.join("\n");
}

export function nodeCss(node: Node, breakpoints: Breakpoint[], assets?: Map<string, Asset>, classes?: ClassMap): string {
  const { shared: _shared, ...rest } = node.style ?? {};
  void _shared;
  const sel = `.${classes?.node.get(node.id) ?? `n-${node.id}`}`;
  const own = styleSetCss(sel, node.style ? rest : undefined, breakpoints, assets, node.hidden);
  if (node.type !== "collection") return own;
  return [collectionViewCss(sel, node.props.view as ViewConfig | undefined, breakpoints), own].filter(Boolean).join("\n");
}

export function assetMap(site: Site): Map<string, Asset> {
  return new Map(site.assets.map((a) => [a.id, a]));
}

/** CSS d'un site : thème, styles partagés, nœuds des pages (ou d'une seule page avec `pageId`) et des composants. */
export function siteCss(site: Site, opts: { pageId?: string; classes?: ClassMap } = {}): string {
  const assets = assetMap(site);
  const out: string[] = [themeCss(site.theme), sharedStylesCss(site, assets, opts.classes)];
  // Une page ne reçoit que son CSS (et celui des composants) : le reste du site n'a rien à faire dans sa réponse.
  const pages = opts.pageId ? site.pages.filter((p) => p.id === opts.pageId) : site.pages;
  const roots = [...pages.map((p) => p.root), ...site.components.map((c) => c.root)];
  for (const root of roots) {
    walk(root, (n) => {
      const css = nodeCss(n, site.settings.breakpoints, assets, opts.classes);
      if (css) out.push(css);
      // Contenu vide d'une collection
      const view = n.type === "collection" ? (n.props as { view?: { empty?: Node[] } }).view : undefined;
      view?.empty?.forEach((e) => walk(e, (m) => { const c = nodeCss(m, site.settings.breakpoints, assets, opts.classes); if (c) out.push(c); }));
    });
  }
  for (const c of site.components) { const v = variantCss(c, site.settings.breakpoints, assets, opts.classes); if (v) out.push(v); }
  return out.filter(Boolean).join("\n");
}

/** Styles des variantes d'un composant : `.racine.v-axe-valeur .nœud { … }` (la racine elle-même : `.racine.v-axe-valeur`). */
export function variantCss(cmp: ComponentDef, breakpoints: Breakpoint[], assets?: Map<string, Asset>, classes?: ClassMap): string {
  const out: string[] = [];
  const sel = (id: string) => `.${classes?.node.get(id) ?? `n-${id}`}`;
  for (const [key, byNode] of Object.entries(cmp.variantStyles ?? {})) {
    const { axis, value } = parseVariantKey(key);
    const rootSel = `${sel(cmp.root.id)}.${variantClass(axis, value)}`;
    for (const [nodeId, set] of Object.entries(byNode)) {
      const css = styleSetCss(nodeId === cmp.root.id ? rootSel : `${rootSel} ${sel(nodeId)}`, set, breakpoints, assets);
      if (css) out.push(css);
    }
  }
  return out.join("\n");
}

export function nodeClassName(node: Node, extra?: string, classes?: ClassMap): string {
  const shared = (node.style?.shared ?? []).map((id) => classes?.shared.get(id) ?? `s-${id}`);
  return [...shared, classes?.node.get(node.id) ?? `n-${node.id}`, extra].filter(Boolean).join(" ");
}
