import type { Asset, Breakpoint, Node, SharedStyle, Site, StyleProps, StyleSet, StyleValue, Theme } from "@atelier/model";
import { walk } from "@atelier/model";

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
  const selectorFor: Record<string, string> = { body: ".at-page", image: ".at-page img", a: ".at-page a" };
  for (const [key, props] of Object.entries(theme.typeDefaults)) {
    const sel = selectorFor[key] ?? `.at-page ${key}`;
    out.push(`${sel}{${declarations(props)}}`);
  }
  // Base minimale, indépendante de tout reset externe.
  out.push(`.at-page{margin:0;min-height:100%}.at-page *,.at-page *::before,.at-page *::after{box-sizing:border-box}.at-page h1,.at-page h2,.at-page h3,.at-page h4,.at-page p,.at-page ul,.at-page ol{margin:0}.at-page ul,.at-page ol{padding-left:1.25em}.at-page img,.at-page video{max-width:100%}.at-page button{font:inherit;cursor:pointer;border:0;background:none}.at-page input,.at-page textarea,.at-page select{font:inherit}`);
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

/** Règles CSS d'un jeu de styles pour un sélecteur, points de rupture en cascade descendante. */
export function styleSetCss(selector: string, style: Omit<StyleSet, "shared"> | undefined, breakpoints: Breakpoint[], assets?: Map<string, Asset>, hidden?: Record<string, boolean>): string {
  if (!style && !hidden) return "";
  const out: string[] = [];
  const base = declarations(style?.base, assets);
  if (base) out.push(`${selector}{${base}}`);
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

export function sharedStylesCss(site: Site, assets?: Map<string, Asset>): string {
  const byId = new Map(site.sharedStyles.map((s) => [s.id, s]));
  const resolve = (s: SharedStyle, depth = 0): Omit<StyleSet, "shared"> => {
    if (!s.extends || depth > 5) return s.style;
    const parent = byId.get(s.extends);
    return parent ? mergeStyle(resolve(parent, depth + 1), s.style) : s.style;
  };
  return site.sharedStyles.map((s) => styleSetCss(`.s-${s.id}`, resolve(s), site.settings.breakpoints, assets)).filter(Boolean).join("\n");
}

export function nodeCss(node: Node, breakpoints: Breakpoint[], assets?: Map<string, Asset>): string {
  const { shared: _shared, ...rest } = node.style ?? {};
  void _shared;
  return styleSetCss(`.n-${node.id}`, node.style ? rest : undefined, breakpoints, assets, node.hidden);
}

export function assetMap(site: Site): Map<string, Asset> {
  return new Map(site.assets.map((a) => [a.id, a]));
}

/** CSS complet d'un site : thème, styles partagés, tous les nœuds des pages et des composants. */
export function siteCss(site: Site): string {
  const assets = assetMap(site);
  const out: string[] = [themeCss(site.theme), sharedStylesCss(site, assets)];
  const roots = [...site.pages.map((p) => p.root), ...site.components.map((c) => c.root)];
  for (const root of roots) {
    walk(root, (n) => {
      const css = nodeCss(n, site.settings.breakpoints, assets);
      if (css) out.push(css);
      // Contenu vide d'une collection
      const view = n.type === "collection" ? (n.props as { view?: { empty?: Node[] } }).view : undefined;
      view?.empty?.forEach((e) => walk(e, (m) => { const c = nodeCss(m, site.settings.breakpoints, assets); if (c) out.push(c); }));
    });
  }
  return out.filter(Boolean).join("\n");
}

export function nodeClassName(node: Node, extra?: string): string {
  const shared = (node.style?.shared ?? []).map((id) => `s-${id}`);
  return [...shared, `n-${node.id}`, extra].filter(Boolean).join(" ");
}
