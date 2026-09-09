import type { ComponentDef, Id, Node, Op, Site, StyleSet } from "./types";
import { cloneWithNewIds, roots, walk, type NodeLocation } from "./tree";
import { newId } from "./ids";
import { slugify } from "./naming";
import { BASE, cascadeChain, resolveNodeStyle, stylePath, type ResolvedStyle } from "./style";

/** Surcharges locales d'une instance (section 6 du modèle). */
export type Overrides = Record<Id, { props?: Record<string, unknown>; style?: Node["style"]; hidden?: Record<string, boolean> }>;

export function applyOverrides(root: Node, overrides: Overrides | undefined): Node {
  if (!overrides || Object.keys(overrides).length === 0) return root;
  const rec = (n: Node): Node => {
    const o = overrides[n.id];
    const next: Node = o ? { ...n, props: { ...n.props, ...(o.props ?? {}) }, style: o.style ?? n.style, hidden: o.hidden ?? n.hidden } : n;
    return n.children ? { ...next, children: n.children.map(rec) } : next;
  };
  return rec(root);
}

// ---------------------------------------------------------------- variantes

/** Clé d'une valeur de variante dans `variantStyles` : `axe:valeur`. Les axes se combinent, chaque valeur a ses styles. */
export const variantKey = (axis: string, value: string) => `${axis}:${value}`;
export function parseVariantKey(key: string): { axis: string; value: string } {
  const i = key.indexOf(":");
  return i < 0 ? { axis: key, value: "" } : { axis: key.slice(0, i), value: key.slice(i + 1) };
}
/** Classe posée sur la racine d'une instance pour une valeur de variante. */
export const variantClass = (axis: string, value: string) => `v-${slugify(axis) || "axe"}-${slugify(value) || "valeur"}`;

/** Valeur effective de chaque axe pour une instance (choix de l'instance, sinon défaut de l'axe). */
export function instanceVariant(cmp: ComponentDef, instance: Node): Record<string, string> {
  const chosen = (instance.props.variant ?? {}) as Record<string, string>;
  const out: Record<string, string> = {};
  for (const axis of cmp.variants ?? []) {
    const v = chosen[axis.name];
    out[axis.name] = v && axis.values.includes(v) ? v : axis.default;
  }
  return out;
}

export function variantClasses(cmp: ComponentDef, instance: Node): string {
  return Object.entries(instanceVariant(cmp, instance)).map(([a, v]) => variantClass(a, v)).join(" ");
}

/** Chemin `site.set` d'une propriété de style d'un nœud pour une variante d'un composant. */
export function variantStylePath(site: Site, componentId: Id, key: string, nodeId: Id, bp: string, prop: string, state?: string): string | undefined {
  const i = site.components.findIndex((c) => c.id === componentId);
  if (i < 0) return undefined;
  return `components.${i}.variantStyles.${key}.${nodeId}.${stylePath(bp, prop, state).slice("style.".length)}`;
}

function propsAt(style: Omit<StyleSet, "shared"> | undefined, bp: string, state?: string) {
  if (!style) return undefined;
  if (state) return bp === BASE ? style.states?.[state] : style.stateBreakpoints?.[state]?.[bp];
  return bp === BASE ? style.base : style.breakpoints?.[bp];
}

/** Style résolu d'un nœud sous une variante : le style normal devient hérité, la variante pose par-dessus. */
export function resolveVariantStyle(site: Site, node: Node, variant: StyleSet | undefined, bp: string, state?: string): ResolvedStyle {
  const out = resolveNodeStyle(site, node, bp, state);
  for (const p of Object.keys(out)) {
    const src = out[p]!.source;
    if (src.kind === "local") out[p] = { value: out[p]!.value, source: { kind: "inherited", breakpoint: bp } };
  }
  const chain = cascadeChain(site.settings.breakpoints, bp);
  for (const b of chain) {
    const props = propsAt(variant, b);
    if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp && !state ? { kind: "local" } : { kind: "inherited", breakpoint: b, fromState: state ? null : undefined } };
  }
  if (state) for (const b of chain) {
    const props = propsAt(variant, b, state);
    if (props) for (const [p, v] of Object.entries(props)) out[p] = { value: v, source: b === bp ? { kind: "local" } : { kind: "inherited", breakpoint: b } };
  }
  return out;
}

/** Fusionne deux jeux de style (le second par-dessus), point par point et état par état. */
export function mergeStyleSet(a: StyleSet | undefined, b: Omit<StyleSet, "shared"> | undefined): StyleSet | undefined {
  if (!b) return a;
  const mergeMaps = <T extends Record<string, Record<string, unknown>>>(x: T | undefined, y: T | undefined): T | undefined => {
    if (!x && !y) return undefined;
    const out: Record<string, Record<string, unknown>> = { ...(x ?? {}) };
    for (const [k, v] of Object.entries(y ?? {}) as [string, Record<string, unknown>][]) out[k] = { ...(out[k] ?? {}), ...v };
    return out as T;
  };
  const stateBreakpoints: StyleSet["stateBreakpoints"] = a?.stateBreakpoints || b.stateBreakpoints ? { ...(a?.stateBreakpoints ?? {}) } : undefined;
  if (stateBreakpoints) for (const [st, byBp] of Object.entries(b.stateBreakpoints ?? {})) stateBreakpoints[st] = mergeMaps(stateBreakpoints[st], byBp) ?? {};
  return {
    ...(a ?? {}),
    base: { ...(a?.base ?? {}), ...(b.base ?? {}) },
    breakpoints: mergeMaps(a?.breakpoints, b.breakpoints),
    states: mergeMaps(a?.states, b.states),
    stateBreakpoints,
  };
}

// ---------------------------------------------------------------- usages

export function componentUsages(site: Site, componentId: Id): { instance: Node; owner: string }[] {
  const out: { instance: Node; owner: string }[] = [];
  for (const { owner, root } of roots(site)) {
    walk(root, (n) => { if (n.type === "instance" && n.props.component === componentId) out.push({ instance: n, owner: "page" in owner ? owner.page : owner.component }); });
  }
  return out;
}

// ---------------------------------------------------------------- créer, détacher, supprimer

export type ComponentPlan = { ok: true; ops: Op[]; label: string; select?: Id; component?: ComponentDef } | { ok: false; reason: string };

/** Fait de l'élément sélectionné un composant du site et le remplace par une instance. */
export function planMakeComponent(site: Site, loc: NodeLocation, name: string, makeId: () => Id = newId): ComponentPlan {
  const node = loc.node;
  if (!loc.parent) return { ok: false, reason: "La racine d'une page ne peut pas devenir un composant : sélectionnez une section." };
  if (node.type === "instance") return { ok: false, reason: "Cet élément est déjà une instance de composant." };
  if (node.type === "slot") return { ok: false, reason: "Un emplacement ne peut pas devenir un composant." };
  const clean = name.trim();
  if (!clean) return { ok: false, reason: "Donnez un nom au composant." };
  const component: ComponentDef = { id: `cmp_${makeId()}`, name: clean, props: [], root: { ...node, name: node.name ?? clean }, scope: "site" };
  const instance: Node = { id: makeId(), type: "instance", name: clean, props: { component: component.id } };
  // D'abord retirer le sous-arbre de la page (identifiants uniques), ensuite l'ajouter au site.
  const ops: Op[] = [
    { op: "node.remove", id: node.id },
    { op: "node.insert", parent: loc.parent.id, index: loc.index, node: instance },
    { op: "site.set", path: "components", value: [...site.components, component] },
  ];
  return { ok: true, ops, label: `Créer le composant « ${clean} »`, select: instance.id, component };
}

/** Remplace une instance par une copie indépendante de son rendu (propriétés et emplacements résolus). */
export function planDetach(site: Site, loc: NodeLocation, makeId: () => Id = newId): ComponentPlan {
  const inst = loc.node;
  if (inst.type !== "instance") return { ok: false, reason: "Seule une instance de composant se détache." };
  const cmp = site.components.find((c) => c.id === inst.props.component);
  if (!cmp) return { ok: false, reason: "Composant introuvable." };
  const values = (inst.props.values ?? {}) as Record<string, unknown>;
  const props: Record<string, unknown> = {};
  for (const p of cmp.props) props[p.name] = values[p.name] ?? p.default;
  const slots = (inst.props.slots ?? {}) as Record<string, Node[]>;
  const locale = site.settings.defaultLocale;
  const resolve = (n: Node): Node | Node[] => {
    if (n.type === "slot") { const provided = slots[String(n.props.name ?? "default")]; return (provided ?? n.children ?? []).flatMap((c) => resolve(c)); }
    let next: Node = { ...n };
    if (n.bindings) {
      const rest: NonNullable<Node["bindings"]> = {};
      const nextProps = { ...n.props };
      for (const [key, b] of Object.entries(n.bindings)) {
        if (b.source !== "prop") { rest[key] = b; continue; }
        const v = props[b.path];
        if (key === "content") nextProps.content = { [locale]: [{ t: "text", v: v === undefined || v === null ? "" : String(v) }] };
        else if (v !== undefined) nextProps[key] = v;
      }
      next = { ...next, props: nextProps, bindings: Object.keys(rest).length ? rest : undefined };
    }
    if (n.children) next = { ...next, children: n.children.flatMap((c) => resolve(c)) };
    return next;
  };
  // Les styles de la variante choisie s'incorporent au style de chaque nœud : la copie garde son apparence.
  const keys = Object.entries(instanceVariant(cmp, inst)).map(([a, v]) => variantKey(a, v));
  const withVariant = (n: Node): Node => {
    let style = n.style;
    for (const k of keys) style = mergeStyleSet(style, cmp.variantStyles?.[k]?.[n.id]);
    return { ...n, style, children: n.children?.map(withVariant) };
  };
  const withOverrides = withVariant(applyOverrides(cmp.root, inst.props.overrides as Overrides | undefined));
  const resolved = resolve(withOverrides);
  const single = Array.isArray(resolved) ? { ...withOverrides, children: resolved } : resolved;
  const { node: copy } = cloneWithNewIds({ ...single, name: inst.name ?? single.name, style: { ...(single.style ?? {}), shared: [...(single.style?.shared ?? []), ...(inst.style?.shared ?? [])] } }, makeId);
  if (!loc.parent) return { ok: false, reason: "Cette instance est une racine." };
  return { ok: true, ops: [{ op: "node.remove", id: inst.id }, { op: "node.insert", parent: loc.parent.id, index: loc.index, node: copy }], label: `Détacher « ${cmp.name} »`, select: copy.id };
}

export function planDeleteComponent(site: Site, componentId: Id): ComponentPlan {
  const cmp = site.components.find((c) => c.id === componentId);
  if (!cmp) return { ok: false, reason: "Composant introuvable." };
  const n = componentUsages(site, componentId).length;
  if (n) return { ok: false, reason: `Ce composant est utilisé ${n} fois : détachez ou supprimez ses instances d'abord.` };
  return { ok: true, ops: [{ op: "site.set", path: "components", value: site.components.filter((c) => c.id !== componentId) }], label: `Supprimer le composant « ${cmp.name} »` };
}
