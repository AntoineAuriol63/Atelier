import type { ComponentDef, Inline, Mark, Node, Page, Site, ViewConfig } from "@atelier/model";
import { createElement, Fragment, type ReactNode } from "react";
import { nodeClassName } from "./css";
import { findComponent, findDatabase, localized, resolveBinding, resolveHref, type RenderContext } from "./context";

const BOX_TAGS = new Set(["div", "section", "header", "footer", "nav", "article", "aside", "main", "figure", "figcaption", "span"]);
const TEXT_TAGS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "span", "label", "div", "figcaption", "li"]);

function tagOf(node: Node, allowed: Set<string>, fallback: string): string {
  const t = node.props.tag;
  return typeof t === "string" && allowed.has(t) ? t : fallback;
}

function attrs(node: Node, ctx: RenderContext, extra: Record<string, unknown> = {}) {
  const a: Record<string, unknown> = { className: nodeClassName(node), ...extra };
  if (ctx.editor) a["data-node"] = node.id;
  if (node.props.anchor) a.id = String(node.props.anchor);
  return a;
}

// ---------------------------------------------------------------- texte

export function renderInline(list: Inline[] | undefined, ctx: RenderContext, keyPrefix = "i"): ReactNode {
  if (!list) return null;
  return list.map((seg, i) => {
    const key = `${keyPrefix}${i}`;
    switch (seg.t) {
      case "break": return createElement("br", { key });
      case "link": return createElement("a", { key, href: resolveHref(seg.href, ctx), target: seg.newTab ? "_blank" : undefined, rel: seg.newTab ? "noopener" : undefined }, renderInline(seg.children, ctx, key));
      case "bind": {
        const v = resolveBinding(seg.binding, ctx);
        return wrapMarks(v === undefined || v === null ? "" : String(v), seg.marks, key);
      }
      case "text": return wrapMarks(seg.v, seg.marks, key);
    }
  });
}

const MARK_TAG: Record<Exclude<Mark, object>, string> = { bold: "strong", italic: "em", underline: "u", strike: "s", code: "code" };

function wrapMarks(text: string, marks: Mark[] | undefined, key: string): ReactNode {
  let el: ReactNode = text;
  for (const m of marks ?? []) {
    if (typeof m === "string") {
      el = createElement(MARK_TAG[m], { key }, el);
    } else if ("color" in m) {
      el = createElement("span", { key, style: { color: typeof m.color === "string" ? m.color : undefined } }, el);
    }
  }
  return createElement(Fragment, { key }, el);
}

// ---------------------------------------------------------------- nœuds

export function RenderNode({ node, ctx }: { node: Node; ctx: RenderContext }): ReactNode {
  const children = () => node.children?.map((c) => createElement(RenderNode, { key: c.id, node: c, ctx }));

  switch (node.type) {
    case "box": {
      return createElement(tagOf(node, BOX_TAGS, "div"), attrs(node, ctx), children());
    }
    case "text": {
      const bound = node.bindings?.content ? resolveBinding(node.bindings.content, ctx) : undefined;
      const content = bound !== undefined ? String(bound ?? "") : renderInline(localized<Inline[]>(node.props.content, ctx), ctx);
      return createElement(tagOf(node, TEXT_TAGS, "p"), attrs(node, ctx), content);
    }
    case "list":
      return createElement(node.props.ordered ? "ol" : "ul", attrs(node, ctx), children());
    case "listItem":
      return createElement("li", attrs(node, ctx), children());
    case "image": {
      const assetId = (node.bindings?.asset ? resolveBinding(node.bindings.asset, ctx) : node.props.asset) as string | undefined;
      const asset = assetId ? ctx.assets.get(assetId) : undefined;
      const alt = node.bindings?.alt ? String(resolveBinding(node.bindings.alt, ctx) ?? "") : localized<string>(node.props.alt, ctx) ?? "";
      const style: Record<string, string> = {};
      if (node.props.ratio) style.aspectRatio = String(node.props.ratio);
      if (node.props.fit) style.objectFit = String(node.props.fit);
      if (!asset) {
        return createElement("div", attrs(node, ctx, { style: { ...style, background: "var(--color-line, #ddd)", display: "grid", placeItems: "center", color: "var(--color-muted, #777)", fontSize: ".8rem" }, "data-empty": "image" }), ctx.editor ? "Image" : null);
      }
      return createElement("img", attrs(node, ctx, { src: asset.url, alt, width: asset.width, height: asset.height, loading: node.props.priority ? "eager" : "lazy", decoding: "async", style }));
    }
    case "video": {
      const asset = node.props.asset ? ctx.assets.get(String(node.props.asset)) : undefined;
      const src = asset?.url ?? (node.props.url as string | undefined);
      return createElement("video", attrs(node, ctx, { src, autoPlay: !!node.props.autoplay, loop: !!node.props.loop, muted: !!node.props.muted, controls: node.props.controls !== false, playsInline: true }));
    }
    case "link": {
      const tag = node.props.tag === "button" ? "button" : "a";
      if (tag === "button") return createElement("button", attrs(node, ctx, { type: node.props.type === "submit" ? "submit" : "button" }), children());
      const href = node.bindings?.href ? String(resolveBinding(node.bindings.href, ctx) ?? "#") : resolveHref(node.props.href as Parameters<typeof resolveHref>[0], ctx);
      const current = !ctx.editor && (node.props.href as { kind?: string; page?: string } | undefined)?.kind === "page" && (node.props.href as { page: string }).page === ctx.page.id;
      return createElement("a", attrs(node, ctx, { href, target: node.props.newTab ? "_blank" : undefined, rel: node.props.newTab ? "noopener" : undefined, "aria-current": current ? "page" : undefined }), children());
    }
    case "icon":
      return createElement("span", attrs(node, ctx, { "aria-hidden": true, dangerouslySetInnerHTML: node.props.svg ? { __html: String(node.props.svg) } : undefined }), node.props.svg ? undefined : "◆");
    case "divider":
      return createElement("hr", attrs(node, ctx));
    case "embed":
      return createElement("div", attrs(node, ctx, { dangerouslySetInnerHTML: { __html: String(node.props.html ?? "") } }));
    case "form":
      return createElement("form", attrs(node, ctx, { method: "post", action: `${ctx.basePath ?? ""}/api/forms/${String(node.props.formId ?? node.id)}`, "data-form": String(node.props.formId ?? node.id) }), children());
    case "field": {
      const type = String(node.props.fieldType ?? "text");
      const name = String(node.props.name ?? node.id);
      const label = localized<string>(node.props.label, ctx);
      const id = `f-${node.id}`;
      const common = { id, name, required: !!node.props.required, placeholder: localized<string>(node.props.placeholder, ctx) };
      let control: ReactNode;
      if (type === "textarea") control = createElement("textarea", { ...common, rows: 5 });
      else if (type === "select") control = createElement("select", common, ((node.props.options as { value: string; label: unknown }[] | undefined) ?? []).map((o) => createElement("option", { key: o.value, value: o.value }, localized<string>(o.label, ctx))));
      else if (type === "checkbox") control = createElement("input", { ...common, type: "checkbox" });
      else control = createElement("input", { ...common, type });
      return createElement("div", attrs(node, ctx, { style: { display: "flex", flexDirection: "column", gap: ".35rem" } }), label ? createElement("label", { htmlFor: id }, label) : null, control);
    }
    case "collection": {
      const db = findDatabase(ctx.site, String(node.props.database));
      const view = (node.props.view ?? { layout: "list" }) as ViewConfig;
      const item = node.children?.find((c) => c.type === "item");
      if (!db || !item) return createElement("div", attrs(node, ctx), ctx.editor ? "Collection non configurée" : null);
      const entries = ctx.data.entries(db, view, ctx);
      if (entries.length === 0 && view.empty) return createElement("div", attrs(node, ctx), view.empty.map((c) => createElement(RenderNode, { key: c.id, node: c, ctx })));
      return createElement("div", attrs(node, ctx, { "data-layout": view.layout }), entries.map((e) => createElement(RenderNode, { key: e.id, node: item, ctx: { ...ctx, item: e } })));
    }
    case "item":
      return createElement("div", attrs(node, ctx), children());
    case "instance": {
      const cmp = findComponent(ctx.site, String(node.props.component));
      if (!cmp) return createElement("div", attrs(node, ctx), ctx.editor ? "Composant introuvable" : null);
      return renderInstance(node, cmp, ctx);
    }
    case "slot": {
      const name = String(node.props.name ?? "default");
      const provided = ctx.slots?.[name];
      const list = provided ?? node.children ?? [];
      return createElement(Fragment, null, list.map((c) => createElement(RenderNode, { key: c.id, node: c, ctx })));
    }
    case "code":
      return createElement("div", attrs(node, ctx, { "data-code": String(node.props.component) }), ctx.editor ? `Composant code : ${String(node.props.component)}` : null);
  }
}

type Overrides = NonNullable<{ overrides?: Record<string, { props?: Record<string, unknown>; style?: Node["style"]; hidden?: Record<string, boolean> }> }["overrides"]>;

function applyOverrides(root: Node, overrides: Overrides | undefined): Node {
  if (!overrides || Object.keys(overrides).length === 0) return root;
  const rec = (n: Node): Node => {
    const o = overrides[n.id];
    const next: Node = o ? { ...n, props: { ...n.props, ...(o.props ?? {}) }, style: o.style ?? n.style, hidden: o.hidden ?? n.hidden } : n;
    return n.children ? { ...next, children: n.children.map(rec) } : next;
  };
  return rec(root);
}

function renderInstance(node: Node, cmp: ComponentDef, ctx: RenderContext): ReactNode {
  const values = (node.props.values ?? {}) as Record<string, unknown>;
  const props: Record<string, unknown> = {};
  for (const p of cmp.props) props[p.name] = values[p.name] ?? p.default;
  const root = applyOverrides(cmp.root, node.props.overrides as Overrides | undefined);
  const inner: RenderContext = { ...ctx, props, slots: node.props.slots as Record<string, Node[]> | undefined };
  // Le nœud racine du composant porte aussi la classe de l'instance pour permettre des styles locaux.
  const rootWithInstanceClass: Node = { ...root, style: { ...(root.style ?? {}), shared: [...(root.style?.shared ?? []), ...(node.style?.shared ?? [])] } };
  const el = createElement(RenderNode, { node: rootWithInstanceClass, ctx: inner });
  return ctx.editor ? createElement("div", { "data-node": node.id, "data-instance": cmp.id, style: { display: "contents" } }, el) : el;
}

// ---------------------------------------------------------------- page

export function RenderPage({ ctx, mode }: { ctx: RenderContext; mode?: string }): ReactNode {
  const page: Page = ctx.page;
  return createElement("div", { className: "at-page", "data-mode": mode ?? ctx.site.theme.defaultMode, lang: ctx.locale }, createElement(RenderNode, { node: page.root, ctx }));
}

/** Titre de la page (SEO), avec composition {champ} pour les modèles. */
export function pageTitle(ctx: RenderContext): string {
  const site: Site = ctx.site;
  const raw = localized<string>(ctx.page.seo?.title, ctx) ?? localized<string>(ctx.page.name, ctx) ?? "";
  const composed = raw.replace(/\{(\w+)\}/g, (_, f: string) => String(resolveBinding({ source: "entry", path: f }, ctx) ?? ""));
  return composed + (localized<string>(site.settings.seo.titleSuffix, ctx) ?? "");
}
