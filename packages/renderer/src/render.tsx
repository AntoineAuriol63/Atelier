import type { ComponentDef, Inline, Mark, Node, Overrides, Page, Site, ViewConfig } from "@atelier/model";
import { animationById, applyOverrides, resolveTrackTarget, variantClasses, walk } from "@atelier/model";
import { createElement, Fragment, type ReactNode } from "react";
import { nodeClassName } from "./css";
import { INTERACTION_SCRIPT, animationsAttr, hasInteractions, hasMotion, interactionsAttr, marqueeOf } from "./interactions";
import { findComponent, findDatabase, localized, resolveBinding, resolveHref, type AnimTargets, type RenderContext } from "./context";

const BOX_TAGS = new Set(["div", "section", "header", "footer", "nav", "article", "aside", "main", "figure", "figcaption", "span"]);
const TEXT_TAGS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "span", "label", "div", "figcaption", "li"]);

/** Clé React d'un enfant : un texte change de clé quand son contenu change, donc il se remonte proprement après une édition en place. */
function keyOf(c: Node): string {
  if (c.type !== "text") return c.id;
  const str = JSON.stringify(c.props.content ?? "");
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return `${c.id}:${(h >>> 0).toString(36)}`;
}

function tagOf(node: Node, allowed: Set<string>, fallback: string): string {
  const t = node.props.tag;
  return typeof t === "string" && allowed.has(t) ? t : fallback;
}

function attrs(node: Node, ctx: RenderContext, extra: Record<string, unknown> = {}) {
  const a: Record<string, unknown> = { className: nodeClassName(node, ctx.extraClass?.[node.id], ctx.classes), ...extra };
  if (ctx.editor) a["data-node"] = node.id;
  const ix = interactionsAttr(node, ctx);
  if (ix) a["data-ix"] = ix;
  // Effets de mouvement joués par le script du site (parallaxe, compteur), sans effet dans l'éditeur.
  if (typeof node.props.parallax === "number" && node.props.parallax !== 0) a["data-parallax"] = String(node.props.parallax);
  // Racine du composant d'une instance : elle joue aussi les animations de l'instance (l'instance elle-même n'a pas d'élément rendu).
  const inst = ctx.instanceRoot?.rootId === node.id ? ctx.instanceRoot.instance : undefined;
  const own = animationsAttr(node, ctx);
  const ofInstance = inst ? animationsAttr(inst, ctx) : undefined;
  const anim = own && ofInstance ? JSON.stringify([...(JSON.parse(own) as unknown[]), ...(JSON.parse(ofInstance) as unknown[])]) : own ?? ofInstance;
  if (anim) a["data-anim"] = anim;
  // Cible d'une animation portée par un autre élément (section 8.4) : marquée, et numérotée pour le décalage.
  const mark = ctx.animChild?.of === node.id ? ctx.animChild : undefined;
  if (mark || ctx.animTargets?.targets.has(node.id) || (inst && ctx.animTargets?.targets.has(inst.id))) a["data-anim-target"] = "";
  if (mark) a.style = { ...((extra.style as Record<string, unknown> | undefined) ?? {}), "--at-i": mark.i, "--at-n": mark.n };
  if (node.props.countUp) a["data-countup"] = "";
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
      case "link": return createElement("a", { key, href: resolveHref(seg.href, ctx), target: seg.newTab ? "_blank" : undefined, rel: seg.newTab ? "noopener" : undefined, "data-link": ctx.editor ? JSON.stringify(seg.href) : undefined }, renderInline(seg.children, ctx, key));
      case "bind": {
        const v = resolveBinding(seg.binding, ctx);
        return wrapMarks(v === undefined || v === null ? "" : String(v), seg.marks, key);
      }
      case "text": return wrapMarks(seg.v, seg.marks, key);
    }
  });
}

const MARK_TAG: Record<Exclude<Mark, object>, string> = { bold: "strong", italic: "em", underline: "u", strike: "s", code: "code" };

function wrapMarks(text: ReactNode, marks: Mark[] | undefined, key: string): ReactNode {
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

// ---------------------------------------------------------------- texte découpé (section 8.4)

/** Découpage le plus fin demandé par les pistes qui visent un texte : lettres, mots, ou rien. */
export function splitOf(node: Node, ctx: RenderContext): "words" | "letters" | undefined {
  return ctx.animTargets?.split.get(node.id);
}
let segmenter: { segment: (s: string) => Iterable<{ segment: string }> } | null | undefined;
function graphemes(word: string): string[] {
  if (segmenter === undefined) { try { segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" }); } catch { segmenter = null; } }
  return segmenter ? Array.from(segmenter.segment(word), (g) => g.segment) : Array.from(word);
}
/** Texte brut d'un contenu en ligne (pour `aria-label` d'un texte découpé en lettres). */
export function plainText(list: Inline[] | undefined, ctx: RenderContext): string {
  return (list ?? []).map((seg) => {
    switch (seg.t) {
      case "break": return "\n";
      case "link": return plainText(seg.children, ctx);
      case "bind": { const v = resolveBinding(seg.binding, ctx); return v === undefined || v === null ? "" : String(v); }
      case "text": return seg.v;
    }
  }).join("");
}
function countPieces(list: Inline[] | undefined, ctx: RenderContext, mode: "words" | "letters"): number {
  let n = 0;
  for (const seg of list ?? []) {
    if (seg.t === "break") continue;
    if (seg.t === "link") { n += countPieces(seg.children, ctx, mode); continue; }
    const text = seg.t === "bind" ? String(resolveBinding(seg.binding, ctx) ?? "") : seg.v;
    for (const w of text.split(/\s+/)) if (w) n += mode === "letters" ? graphemes(w).length : 1;
  }
  return n;
}
/** Rend un contenu en ligne en morceaux animables : un span par mot, ou par lettre (dans un span par mot), les espaces restant dehors. */
function renderSplit(list: Inline[] | undefined, ctx: RenderContext, mode: "words" | "letters", counter: { i: number }, n: number, keyPrefix = "i"): ReactNode {
  if (!list) return null;
  const piece = (text: string, key: string) => createElement("span", { key, className: "at-piece", "data-anim-target": "", "aria-hidden": mode === "letters" ? true : undefined, style: { "--at-i": counter.i++, "--at-n": n } }, text);
  const words = (text: string, key: string): ReactNode[] => text.split(/(\s+)/).map((part, j) => {
    const k = `${key}w${j}`;
    if (!part) return null;
    if (/^\s+$/.test(part)) return part;
    if (mode === "words") return piece(part, k);
    return createElement("span", { key: k, className: "at-word" }, graphemes(part).map((g, gi) => piece(g, `${k}g${gi}`)));
  });
  return list.map((seg, i) => {
    const key = `${keyPrefix}${i}`;
    switch (seg.t) {
      case "break": return createElement("br", { key });
      case "link": return createElement("a", { key, href: resolveHref(seg.href, ctx), target: seg.newTab ? "_blank" : undefined, rel: seg.newTab ? "noopener" : undefined, "data-link": ctx.editor ? JSON.stringify(seg.href) : undefined }, renderSplit(seg.children, ctx, mode, counter, n, key));
      case "bind": { const v = resolveBinding(seg.binding, ctx); return wrapMarks(words(v === undefined || v === null ? "" : String(v), key), seg.marks, key); }
      case "text": return wrapMarks(words(seg.v, key), seg.marks, key);
    }
  });
}

/** Ce que visent les animations de la page (déclencheurs des éléments, des composants et de la page) : cibles d'un autre élément, parents dont les enfants sont animés, textes découpés. */
export function collectAnimTargets(site: Site, page: Page): AnimTargets {
  const out: AnimTargets = { targets: new Set(), children: new Set(), split: new Map() };
  const take = (host: string, triggers: import("@atelier/model").Trigger[] | undefined) => {
    for (const t of triggers ?? []) for (const track of animationById(site, t.animation)?.tracks ?? []) {
      const r = resolveTrackTarget(track.target, host);
      if ("selector" in r) continue;
      if (r.children) out.children.add(r.node);
      else if (r.split) { const cur = out.split.get(r.node); if (r.split === "letters" || !cur) out.split.set(r.node, r.split); }
      else if (r.node !== host) out.targets.add(r.node);
    }
  };
  // `walk` parcourt aussi les emplacements des occurrences : un élément animé placé dans un emplacement est une cible comme un autre.
  const visit = (root: Node) => walk(root, (n) => { take(n.id, n.triggers); });
  take(page.root.id, page.triggers);
  visit(page.root);
  site.components.forEach((c) => visit(c.root));
  return out;
}

// ---------------------------------------------------------------- nœuds

export function RenderNode({ node, ctx }: { node: Node; ctx: RenderContext }): ReactNode {
  // Une animation qui vise « ses enfants » : chaque enfant est numéroté (décalage) et marqué comme cible.
  const staggerKids = !!ctx.animTargets?.children.has(node.id);
  const kidCtx = (c: Node, i: number, n: number): RenderContext => (staggerKids ? { ...ctx, animChild: { of: c.id, i, n } } : ctx);
  const children = () => node.children?.map((c, i, all) => createElement(RenderNode, { key: keyOf(c), node: c, ctx: kidCtx(c, i, all.length) }));

  switch (node.type) {
    case "box": {
      // Bandeau défilant : les enfants sont rendus deux fois dans une piste animée en CSS, la copie sans identifiant d'édition.
      const mq = marqueeOf(node);
      if (mq) {
        const copy = (node.children ?? []).map((c) => createElement(RenderNode, { key: `${keyOf(c)}-copie`, node: c, ctx: { ...ctx, editor: false } }));
        return createElement(tagOf(node, BOX_TAGS, "div"), attrs(node, ctx, { "data-marquee": mq.direction ?? "left", "data-marquee-pause": mq.pauseOnHover ? "" : undefined, style: { "--at-marquee": `${mq.duration}s` } }),
          createElement("div", { className: "at-marquee-track" }, children(), createElement("div", { className: "at-marquee-copy", "aria-hidden": true }, copy)));
      }
      return createElement(tagOf(node, BOX_TAGS, "div"), attrs(node, ctx), children());
    }
    case "text": {
      const bound = node.bindings?.content ? resolveBinding(node.bindings.content, ctx) : undefined;
      // Un champ « texte long » est une suite de nœuds : ils se rendent dans une boîte, avec la classe du texte lié.
      if (Array.isArray(bound)) return createElement("div", attrs(node, ctx, { "data-richtext": true }), (bound as Node[]).map((c) => createElement(RenderNode, { key: c.id, node: c, ctx })));
      const split = splitOf(node, ctx);
      const inlines = bound !== undefined && bound !== null ? [{ t: "text" as const, v: String(bound) }] : localized<Inline[]>(node.props.content, ctx);
      if (split && inlines?.length) {
        // Texte découpé (section 8.4) : mots ou lettres en spans ; en lettres, le texte complet passe en aria-label.
        const n = countPieces(inlines, ctx, split);
        return createElement(tagOf(node, TEXT_TAGS, "p"), attrs(node, ctx, split === "letters" ? { "aria-label": plainText(inlines, ctx) } : {}), renderSplit(inlines, ctx, split, { i: 0 }, n));
      }
      const content = bound !== undefined && bound !== null ? String(bound) : renderInline(inlines, ctx);
      return createElement(tagOf(node, TEXT_TAGS, "p"), attrs(node, ctx), content);
    }
    case "list":
      return createElement(node.props.ordered ? "ol" : "ul", attrs(node, ctx), children());
    case "listItem":
      return createElement("li", attrs(node, ctx), children());
    case "image": {
      const assetId = (node.bindings?.asset ? resolveBinding(node.bindings.asset, ctx) : node.props.asset) as string | undefined;
      const asset = assetId ? ctx.assets.get(assetId) : undefined;
      // Texte alternatif : lié, sinon celui de l'élément, sinon celui porté par la ressource.
      const alt = node.bindings?.alt ? String(resolveBinding(node.bindings.alt, ctx) ?? "") : localized<string>(node.props.alt, ctx) || localized<string>(asset?.alt, ctx) || "";
      const style: Record<string, string> = {};
      if (node.props.ratio) style.aspectRatio = String(node.props.ratio);
      if (node.props.fit) style.objectFit = String(node.props.fit);
      if (!asset) {
        return createElement("div", attrs(node, ctx, { style: { ...style, background: "var(--color-line, #ddd)", display: "grid", placeItems: "center", color: "var(--color-muted, #777)", fontSize: ".8rem" }, "data-empty": "image" }), ctx.editor ? "Image" : null);
      }
      // Déclinaisons optimisées (D37) : le navigateur choisit la taille, l'original reste le repli.
      const candidates = [...(asset.variants ?? []), ...(asset.width ? [{ width: asset.width, url: asset.url }] : [])].sort((a, b) => a.width - b.width);
      const srcSet = candidates.length > 1 ? candidates.map((c) => `${c.url} ${c.width}w`).join(", ") : undefined;
      const sizes = srcSet ? (typeof node.props.sizes === "string" ? node.props.sizes : "(max-width: 1152px) 100vw, 1152px") : undefined;
      return createElement("img", attrs(node, ctx, { src: asset.url, srcSet, sizes, alt, width: asset.width, height: asset.height, loading: node.props.priority ? "eager" : "lazy", fetchPriority: node.props.priority ? "high" : undefined, decoding: "async", style }));
    }
    case "video": {
      const asset = node.props.asset ? ctx.assets.get(String(node.props.asset)) : undefined;
      const src = asset?.url ?? (node.props.url as string | undefined);
      return createElement("video", attrs(node, ctx, { src, autoPlay: !!node.props.autoplay, loop: !!node.props.loop, muted: !!node.props.muted, controls: node.props.controls !== false, playsInline: true }));
    }
    case "link": {
      const tag = node.props.tag === "button" ? "button" : "a";
      if (ctx.inLink) return createElement("span", attrs(node, ctx, { "data-nested-link": "" }), children());
      const inner: RenderContext = { ...ctx, inLink: true };
      const kids = () => node.children?.map((c) => createElement(RenderNode, { key: keyOf(c), node: c, ctx: inner }));
      if (tag === "button") return createElement("button", attrs(node, ctx, { type: node.props.type === "submit" ? "submit" : "button" }), kids());
      const href = node.bindings?.href ? String(resolveBinding(node.bindings.href, ctx) ?? "#") : resolveHref(node.props.href as Parameters<typeof resolveHref>[0], ctx);
      const current = !ctx.editor && (node.props.href as { kind?: string; page?: string } | undefined)?.kind === "page" && (node.props.href as { page: string }).page === ctx.page.id;
      return createElement("a", attrs(node, ctx, { href, target: node.props.newTab ? "_blank" : undefined, rel: node.props.newTab ? "noopener" : undefined, "aria-current": current ? "page" : undefined }), kids());
    }
    case "icon":
      return createElement("span", attrs(node, ctx, { "aria-hidden": true, dangerouslySetInnerHTML: !ctx.editor && node.props.svg ? { __html: String(node.props.svg) } : undefined }), !ctx.editor && node.props.svg ? undefined : "◆");
    case "divider":
      return createElement("hr", attrs(node, ctx));
    case "embed":
      return ctx.editor
        ? createElement("div", attrs(node, ctx, { "data-embed-placeholder": "" }), "Code intégré — visible sur le site publié")
        : createElement("div", attrs(node, ctx, { dangerouslySetInnerHTML: { __html: String(node.props.html ?? "") } }));
    case "form": {
      const formId = String(node.props.formId ?? node.id);
      const success = localized<string>(node.props.successMessage, ctx) ?? "Merci, votre message est bien envoyé.";
      return createElement("form", attrs(node, ctx, { method: "post", action: formAction(node, ctx), "data-form": formId, noValidate: false }),
        // Piège à robots : un champ que personne ne voit ; rempli, l'envoi est ignoré en silence.
        createElement("input", { type: "text", name: "_hp", tabIndex: -1, autoComplete: "off", "aria-hidden": true, style: { position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 } }),
        createElement("input", { type: "hidden", name: "_page", value: ctx.page.path }),
        children(),
        createElement("p", { "data-form-success": "", hidden: true, role: "status" }, success),
        createElement("p", { "data-form-error": "", hidden: true, role: "alert" }),
      );
    }
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
      if (entries.length === 0 && view.empty) return createElement("div", attrs(node, ctx), view.empty.map((c) => createElement(RenderNode, { key: keyOf(c), node: c, ctx })));
      const autoplay = view.layout === "carousel" && view.autoplay ? { "data-autoplay": String(view.autoplay) } : {};
      return createElement("div", attrs(node, ctx, { "data-layout": view.layout, ...autoplay }), entries.map((e, i) => createElement(RenderNode, { key: e.id, node: item, ctx: { ...kidCtx(item, i, entries.length), item: e } })));
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
      return createElement(Fragment, null, list.map((c) => createElement(RenderNode, { key: keyOf(c), node: c, ctx })));
    }
    case "code":
      return createElement("div", attrs(node, ctx, { "data-code": String(node.props.component) }), ctx.editor ? `Composant code : ${String(node.props.component)}` : null);
  }
}

function renderInstance(node: Node, cmp: ComponentDef, ctx: RenderContext): ReactNode {
  const values = (node.props.values ?? {}) as Record<string, unknown>;
  const props: Record<string, unknown> = {};
  for (const p of cmp.props) props[p.name] = values[p.name] ?? p.default;
  const root = applyOverrides(cmp.root, node.props.overrides as Overrides | undefined);
  // Les classes de variante sur la racine portent les styles `variantStyles` (voir `variantCss`).
  const vc = cmp.variants?.length ? variantClasses(cmp, node) : "";
  // Si l'instance est l'enfant visé par une animation du parent, c'est la racine du composant (l'élément rendu) qui porte la marque.
  const animChild = ctx.animChild?.of === node.id ? { ...ctx.animChild, of: root.id } : ctx.animChild;
  // La racine porte aussi la classe de l'instance : ses styles, ses animations et les pistes qui la visent s'y appliquent.
  const rootClass = [vc, ctx.classes?.node.get(node.id) ?? `n-${node.id}`].filter(Boolean).join(" ");
  const inner: RenderContext = { ...ctx, props, slots: node.props.slots as Record<string, Node[]> | undefined, extraClass: { ...(ctx.extraClass ?? {}), [root.id]: rootClass }, animChild, instanceRoot: { rootId: root.id, instance: node } };
  // Le nœud racine du composant porte aussi la classe de l'instance pour permettre des styles locaux.
  const rootWithInstanceClass: Node = { ...root, style: { ...(root.style ?? {}), shared: [...(root.style?.shared ?? []), ...(node.style?.shared ?? [])] } };
  const el = createElement(RenderNode, { node: rootWithInstanceClass, ctx: inner });
  // Dans l'éditeur, l'enveloppe (sans boîte) est l'enfant direct : elle porte aussi la marque de cible pour que les règles « rien dans l'éditeur » la couvrent.
  return ctx.editor ? createElement("div", { "data-node": node.id, "data-instance": cmp.id, "data-anim-target": ctx.animChild?.of === node.id ? "" : undefined, style: { display: "contents" } }, el) : el;
}

// ---------------------------------------------------------------- page

/** Où un formulaire envoie : son service d'envoi s'il en a un (`props.endpoint`, Formspree ou autre), sinon la route d'Atelier, absolue si l'hôte l'a demandé. */
export function formAction(node: Node, ctx: RenderContext): string {
  const endpoint = typeof node.props.endpoint === "string" ? node.props.endpoint.trim() : "";
  if (endpoint) return endpoint;
  return `${ctx.formsOrigin ?? ""}/api/forms/${ctx.site.id}/${String(node.props.formId ?? node.id)}`;
}

/** Script des formulaires (D47) : envoi sans rechargement, message de succès ou d'erreur en place ; sans script, le serveur redirige avec `?envoye=`. */
export const FORM_SCRIPT = `(function(){var q=new URLSearchParams(location.search).get("envoye");document.querySelectorAll("form[data-form]").forEach(function(f){var ok=f.querySelector("[data-form-success]"),ko=f.querySelector("[data-form-error]");function show(el,msg){if(!el)return;if(msg)el.textContent=msg;el.hidden=false;}if(q&&q===f.getAttribute("data-form")){show(ok);f.querySelectorAll("input:not([type=hidden]),textarea,select,button").forEach(function(c){c.hidden=true;});}f.addEventListener("submit",function(e){if(!f.checkValidity())return;e.preventDefault();var b=f.querySelector("button[type=submit]");if(b){b.disabled=true;}if(ko)ko.hidden=true;fetch(f.action,{method:"POST",headers:{accept:"application/json"},body:new FormData(f)}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});}).then(function(x){if(x.ok){f.querySelectorAll("input:not([type=hidden]),textarea,select,button").forEach(function(c){c.hidden=true;});show(ok);}else{show(ko,(x.j&&x.j.error)||"L'envoi a échoué, réessayez.");if(b)b.disabled=false;}}).catch(function(){show(ko,"Pas de connexion, réessayez.");if(b)b.disabled=false;});});});})();`;

function hasForm(n: Node): boolean { return n.type === "form" || (n.children ?? []).some(hasForm); }

export function RenderPage({ ctx: given, mode }: { ctx: RenderContext; mode?: string }): ReactNode {
  const page: Page = given.page;
  const ctx: RenderContext = given.animTargets ? given : { ...given, animTargets: collectAnimTargets(given.site, page) };
  // Les déclencheurs de page sont portés par la racine.
  const root: Node = page.triggers?.length ? { ...page.root, triggers: [...(page.root.triggers ?? []), ...page.triggers] } : page.root;
  const withForm = hasForm(page.root) || ctx.site.components.some((c) => hasForm(c.root));
  const withIx = hasInteractions(page.root) || ctx.site.components.some((c) => hasInteractions(c.root)) || hasMotion(root) || ctx.site.components.some((c) => hasMotion(c.root));
  return createElement("div", { className: "at-page", "data-mode": mode ?? ctx.site.theme.defaultMode, lang: ctx.locale, "data-editor": ctx.editor ? "" : undefined },
    createElement(RenderNode, { node: root, ctx }),
    withForm && !ctx.editor && !ctx.deferScripts ? createElement("script", { dangerouslySetInnerHTML: { __html: FORM_SCRIPT } }) : null,
    // Dans l'éditeur, pas de script (React ne l'exécuterait pas au rendu suivant) : `applyInstantStates` pose l'état d'arrivée après chaque rendu.
    withIx && !ctx.editor && !ctx.deferScripts ? createElement("script", { dangerouslySetInnerHTML: { __html: INTERACTION_SCRIPT } }) : null,
    // Sans script, les animations attendant l'écran ou le défilement ne se joueraient jamais : l'élément reste à son état de repos.
    withIx && !ctx.editor ? createElement("noscript", { dangerouslySetInnerHTML: { __html: "<style>.at-page [data-anim],.at-page [data-anim-target]{animation:none!important}</style>" } }) : null,
  );
}

/** Titre de la page (SEO), avec composition {champ} pour les modèles. */
export function pageTitle(ctx: RenderContext): string {
  const site: Site = ctx.site;
  const raw = localized<string>(ctx.page.seo?.title, ctx) ?? localized<string>(ctx.page.name, ctx) ?? "";
  const composed = raw.replace(/\{(\w+)\}/g, (_, f: string) => String(resolveBinding({ source: "entry", path: f }, ctx) ?? ""));
  return composed + (localized<string>(site.settings.seo.titleSuffix, ctx) ?? "");
}
