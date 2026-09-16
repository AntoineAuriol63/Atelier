import type { Animation, Asset, Breakpoint, ClassMap, ComponentDef, Node, SharedStyle, Site, StyleProps, StyleSet, StyleValue, Theme, Track, Trigger, ViewConfig } from "@atelier/model";
import { animationById, easingCss, parseVariantKey, resolveTrackTarget, trackSpan, variantClass, walk } from "@atelier/model";

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
  out.push(`html{scroll-behavior:smooth}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}.at-page{margin:0;min-height:100%}:where(.at-page *,.at-page *::before,.at-page *::after){box-sizing:border-box}:where(.at-page h1,.at-page h2,.at-page h3,.at-page h4,.at-page h5,.at-page h6,.at-page p,.at-page ul,.at-page ol,.at-page blockquote,.at-page figure){margin:0}:where(.at-page ul,.at-page ol){padding-left:1.25em}:where(.at-page img,.at-page video){max-width:100%}:where(.at-page hr){border:0;border-top:1px solid var(--color-line,#ddd);width:100%;height:0;margin:0;flex:none}:where(.at-page button){font:inherit;cursor:pointer;border:0;background:none}:where(.at-page input,.at-page textarea,.at-page select){font:inherit}:where(.at-page input:not([type=checkbox]):not([type=radio]),.at-page textarea,.at-page select){width:100%;padding:.55em .75em;border:1px solid var(--color-line,#ddd);border-radius:var(--radius-sm,3px);background:var(--color-surface,#fff);color:inherit}:where(.at-page [data-form-success]){color:var(--color-accent,inherit);font-weight:500}:where(.at-page [data-form-error]){color:#b42318}.at-page [data-ix-hidden]{display:none!important}.at-page [data-marquee]{overflow:hidden}.at-page [data-marquee] .at-marquee-track{display:flex;width:max-content;gap:inherit;animation:at-marquee-left var(--at-marquee,20s) linear infinite}.at-page [data-marquee="right"] .at-marquee-track{animation-name:at-marquee-right}.at-page [data-marquee="up"] .at-marquee-track,.at-page [data-marquee="down"] .at-marquee-track{flex-direction:column;width:auto;height:max-content}.at-page [data-marquee="up"]{max-height:var(--at-marquee-height,12rem)}.at-page [data-marquee="down"]{max-height:var(--at-marquee-height,12rem)}.at-page [data-marquee="up"] .at-marquee-track{animation-name:at-marquee-up}.at-page [data-marquee="down"] .at-marquee-track{animation-name:at-marquee-down}.at-page [data-marquee] .at-marquee-copy{display:contents}.at-page [data-marquee-pause]:hover .at-marquee-track{animation-play-state:paused}@keyframes at-marquee-left{to{transform:translateX(-50%)}}@keyframes at-marquee-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}@keyframes at-marquee-up{to{transform:translateY(-50%)}}@keyframes at-marquee-down{from{transform:translateY(-50%)}to{transform:translateY(0)}}.at-page .at-piece,.at-page .at-word{display:inline-block}.at-page .at-word{white-space:nowrap}.at-page[data-editor] [data-anim],.at-page[data-editor] [data-anim-target]{animation:none!important}@media (prefers-reduced-motion:reduce){.at-page [data-marquee] .at-marquee-track,.at-page [data-anim],.at-page [data-anim-target]{animation:none!important}}`);
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

/** Nom CSS des images-clés d'une piste d'une animation. */
export const trackKeyframesName = (animationId: string, trackId: string) => `at-${animationId}-${trackId}`;
const pct = (x: number) => String(Number(x.toFixed(2)));
/** Bloc `@keyframes` d'une piste : positions en % de sa portée, courbe d'un segment posée sur l'image qui l'ouvre. Vide sous deux images-clés. */
export function trackKeyframesCss(animation: Animation, track: Track, assets?: Map<string, Asset>): string {
  if (track.keyframes.length < 2) return "";
  const kfs = [...track.keyframes].sort((a, b) => a.at - b.at);
  const { start, end } = trackSpan(track);
  const span = end - start || 1;
  const blocks = kfs.map((k, i) => {
    const next = kfs[i + 1];
    const tf = next?.easing ? `animation-timing-function:${easingCss(next.easing, next.at - k.at)}` : "";
    return `${pct(((k.at - start) / span) * 100)}%{${[declarations(k.style, assets), tf].filter(Boolean).join(";")}}`;
  });
  return `@keyframes ${trackKeyframesName(animation.id, track.id)}{${blocks.join("")}}`;
}
type Entry = { trigger: Trigger; animation: Animation; track: Track; base: number; tsel: string; hsel: string; multi: boolean };
/** Propriétés qu'une piste anime. */
export const trackProps = (t: Pick<Track, "keyframes">): Set<string> => new Set(t.keyframes.flatMap((k) => Object.keys(k.style)));
/**
 * Remplissage d'une piste parmi celles qui visent la même cible : `both` d'ordinaire (en attendant, l'élément montre la première image ;
 * après, il garde la dernière). Une piste en retard dont toutes les propriétés sont déjà animées par d'autres pistes de la cible remplit
 * seulement vers l'avant : sinon son état de départ écraserait les autres pendant l'attente (une pulsation en attente cachait un zoom).
 * Une piste qui possède au moins une propriété à elle (l'opacité d'une apparition) garde son état de départ.
 */
export function trackFill(track: Track, delay: number, siblings: Track[]): "both" | "forwards" {
  if (delay <= 0) return "both";
  const mine = [...trackProps(track)];
  if (!mine.length) return "both";
  const covered = new Set(siblings.filter((o) => o !== track).flatMap((o) => [...trackProps(o)]));
  return mine.every((p) => covered.has(p)) ? "forwards" : "both";
}
/** Valeur `animation` d'une piste lancée par un déclencheur : portée, courbe de base, délai (déclencheur + début de portée), répétitions, sens, remplissage (voir `trackFill`). */
export function trackAnimationValue(e: Entry, fill: "both" | "forwards" = "both"): string {
  const { start, end } = trackSpan(e.track);
  const it = e.animation.loop === "infinite" ? "infinite" : String(e.animation.loop ?? 1);
  return `${trackKeyframesName(e.animation.id, e.track.id)} ${end - start}ms ease ${e.base}ms ${it} ${e.animation.alternate ? "alternate" : "normal"} ${fill}`;
}
/** Délai CSS d'une piste : fixe, ou en `calc()` avec le rang de l'élément (`--at-i` parmi `--at-n`) quand plusieurs éléments sont décalés. */
export function trackDelayCss(e: Entry): string {
  const dl = `${e.base}ms`;
  const st = e.track.stagger;
  if (!st || !e.multi) return dl;
  if (st.from === "end") return `calc(${dl} + (var(--at-n,1) - 1 - var(--at-i,0))*${st.each}ms)`;
  if (st.from === "center") return `calc(${dl} + abs(var(--at-i,0) - (var(--at-n,1) - 1)/2)*${st.each}ms)`;
  return `calc(${dl} + var(--at-i,0)*${st.each}ms)`;
}
/** Les animations CSS lancées par les déclencheurs d'un nœud : une entrée par piste, avec sa cible résolue (`tsel`) et la cible au survol (`hsel`). */
export function nodeAnimationEntries(node: Node, sel: string, site: Pick<Site, "animations">, selOf: (id: string) => string = (id) => `.n-${id}`, triggers: Trigger[] = node.triggers ?? []): Entry[] {
  const entries: Entry[] = [];
  for (const trigger of triggers) {
    const animation = animationById(site, trigger.animation);
    if (!animation) continue;
    for (const track of animation.tracks) {
      if (track.keyframes.length < 2) continue;
      const r = resolveTrackTarget(track.target, node.id);
      if ("selector" in r) continue;
      const own = r.node === node.id;
      const baseSel = own ? sel : selOf(r.node);
      const tsel = r.children ? `${baseSel}>*` : r.split ? `${baseSel} .at-piece` : baseSel;
      const hsel = own ? (r.children ? `${sel}:hover>*` : r.split ? `${sel}:hover .at-piece` : `${sel}:hover`) : `.at-page:has(${sel}:hover) ${tsel}`;
      entries.push({ trigger, animation, track, base: (trigger.delay ?? 0) + trackSpan(track).start, tsel, hsel, multi: !!(r.children || r.split) });
    }
  }
  return entries;
}
/**
 * Règles `animation` (section 8.4) : une seule règle par cible, quels que soient les éléments qui lancent ses animations (sinon la dernière
 * règle écraserait les autres : une boucle effacerait l'état de départ d'une apparition lancée par un autre élément). Chargement en cours,
 * entrée dans l'écran en pause jusqu'au script, survol sans retour (`:hover`, ou `:has()` pour une autre cible), pause au survol.
 * `instanceRoots` associe la classe d'une occurrence de composant à celle de la racine de son composant : l'occurrence reçoit
 * `.racine.occurrence` avec les animations de la racine puis les siennes.
 */
export function animationRulesCss(entries: Entry[], instanceRoots: Map<string, string> = new Map()): string {
  const out: string[] = [];
  const groups = (list: Entry[], key: (e: Entry) => string) => { const m = new Map<string, Entry[]>(); for (const e of list) m.set(key(e), [...(m.get(key(e)) ?? []), e]); return m; };
  const delays = (list: Entry[]) => (list.some((e) => e.track.stagger && e.multi) ? `;animation-delay:${list.map(trackDelayCss).join(",")}` : "");
  const css = groups(entries.filter((e) => e.trigger.on === "load" || e.trigger.on === "inView"), (e) => e.tsel);
  for (const [t, own] of css) {
    const rootSel = instanceRoots.get(t);
    const list = rootSel ? [...(css.get(rootSel) ?? []), ...own] : own;
    const values = list.map((e) => trackAnimationValue(e, trackFill(e.track, e.base, list.map((x) => x.track))));
    out.push(`${rootSel ? `${rootSel}${t}` : t}{animation:${values.join(",")};animation-play-state:${list.map((e) => (e.trigger.on === "inView" ? "paused" : "running")).join(",")}${delays(list)}}`);
    if (list.some((e) => e.trigger.pauseOnHover && e.trigger.on === "load")) out.push(`${own[0]!.hsel}{animation-play-state:${list.map((e) => (e.trigger.pauseOnHover || e.trigger.on === "inView" ? "paused" : "running")).join(",")}}`);
  }
  for (const [, list] of groups(entries.filter((e) => e.trigger.on === "hover" && !e.trigger.reverseOnLeave), (e) => e.hsel)) {
    out.push(`${list[0]!.hsel}{animation:${list.map((e) => trackAnimationValue(e, trackFill(e.track, e.base, list.map((x) => x.track)))).join(",")}${delays(list)}}`);
  }
  return out.join("\n");
}
/** Animations lancées par les déclencheurs d'un seul nœud (voir `animationRulesCss` ; `siteCss` regroupe celles de tout le site). */
export function nodeAnimationsCss(node: Node, sel: string, site: Pick<Site, "animations">, _assets?: Map<string, Asset>, selOf: (id: string) => string = (id) => `.n-${id}`, triggers: Trigger[] = node.triggers ?? []): string {
  return triggers.length ? animationRulesCss(nodeAnimationEntries(node, sel, site, selOf, triggers)) : "";
}

/** CSS d'un nœud : son style (sur `o.selector` s'il est donné), la vue d'une collection et, sauf `o.animations === false`, ses animations. */
export function nodeCss(node: Node, breakpoints: Breakpoint[], assets?: Map<string, Asset>, classes?: ClassMap, site?: Pick<Site, "animations">, extraTriggers: Trigger[] = [], o: { animations?: boolean; selector?: string } = {}): string {
  const { shared: _shared, ...rest } = node.style ?? {};
  void _shared;
  const cls = `.${classes?.node.get(node.id) ?? `n-${node.id}`}`;
  const sel = o.selector ?? cls;
  const own = styleSetCss(sel, node.style ? rest : undefined, breakpoints, assets, node.hidden);
  const anim = o.animations === false ? "" : nodeAnimationsCss(node, cls, site ?? { animations: [] }, assets, (id) => `.${classes?.node.get(id) ?? `n-${id}`}`, [...(node.triggers ?? []), ...extraTriggers]);
  if (node.type !== "collection") return [own, anim].filter(Boolean).join("\n");
  return [collectionViewCss(sel, node.props.view as ViewConfig | undefined, breakpoints), own, anim].filter(Boolean).join("\n");
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
  const roots: { root: Node; triggers?: Trigger[] }[] = [...pages.map((p) => ({ root: p.root, triggers: p.triggers })), ...site.components.map((c) => ({ root: c.root }))];
  // Images-clés de chaque piste de chaque animation du site, une fois chacune.
  for (const a of site.animations) for (const t of a.tracks) { const k = trackKeyframesCss(a, t, assets); if (k) out.push(k); }
  const selOf = (id: string) => `.${opts.classes?.node.get(id) ?? `n-${id}`}`;
  // Les animations de tout le site sont regroupées par cible et émises à la fin (voir `animationRulesCss`).
  const entries: Entry[] = [];
  const instanceRoots = new Map<string, string>();
  const visit = (n: Node, extra: Trigger[] = []) => {
    // Une occurrence de composant n'a pas d'élément propre : la racine rendue du composant porte sa classe, son style l'emporte sur celui de la racine.
    const cmp = n.type === "instance" ? site.components.find((c) => c.id === n.props.component) : undefined;
    if (cmp) instanceRoots.set(selOf(n.id), selOf(cmp.root.id));
    const css = nodeCss(n, site.settings.breakpoints, assets, opts.classes, site, extra, { animations: false, selector: cmp ? `${selOf(cmp.root.id)}${selOf(n.id)}` : undefined });
    if (css) out.push(css);
    entries.push(...nodeAnimationEntries(n, selOf(n.id), site, selOf, [...(n.triggers ?? []), ...extra]));
  };
  for (const { root, triggers } of roots) {
    walk(root, (n) => {
      // Les déclencheurs de page sont portés par la racine.
      visit(n, n === root ? triggers ?? [] : []);
      // Contenu vide d'une collection
      const view = n.type === "collection" ? (n.props as { view?: { empty?: Node[] } }).view : undefined;
      view?.empty?.forEach((e) => walk(e, (m) => visit(m)));
    });
  }
  for (const c of site.components) { const v = variantCss(c, site.settings.breakpoints, assets, opts.classes); if (v) out.push(v); }
  out.push(animationRulesCss(entries, instanceRoots));
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
