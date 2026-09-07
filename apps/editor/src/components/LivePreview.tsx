"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Entry, Inline, LinkTarget, Mark, Site } from "@atelier/model";
import { RenderPage, assetMap, fontsHref, matchPath, memoryData, siteCss, type RenderContext } from "@atelier/renderer";

type Props = { initialSite: Site; entries: Entry[]; path: string; mode?: string; editor: boolean };

type BlockPresetInfo = { id: string; label: string; group: string; keywords?: string };
type EditMode = "write" | "design";

const ACCENT = "#1F5F8B";

/** Sérialise le DOM d'un texte édité en contenu en ligne (marques et liens). */
function serialize(root: HTMLElement): Inline[] {
  const out: Inline[] = [];
  const push = (seg: Inline) => {
    const last = out[out.length - 1];
    if (seg.t === "text" && last && last.t === "text" && JSON.stringify(last.marks ?? []) === JSON.stringify(seg.marks ?? [])) { last.v += seg.v; return; }
    out.push(seg);
  };
  const walk = (node: Node, marks: Mark[], first: { v: boolean }) => {
    if (node.nodeType === Node.TEXT_NODE) { const v = node.textContent ?? ""; if (v) push({ t: "text", v, marks: marks.length ? [...marks] : undefined }); return; }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === "BR") { push({ t: "break" }); return; }
    if (tag === "A") {
      const raw = el.getAttribute("data-link");
      let href: LinkTarget = { kind: "url", url: el.getAttribute("href") ?? "#" };
      try { if (raw) href = JSON.parse(raw) as LinkTarget; } catch { /* lien saisi à la main */ }
      const children: Inline[] = [];
      const sub: Inline[] = [];
      const saved = out.length;
      el.childNodes.forEach((c) => walk(c, marks, first));
      children.push(...out.splice(saved));
      void sub;
      out.push({ t: "link", href, newTab: el.getAttribute("target") === "_blank" || undefined, children });
      return;
    }
    const mark = tag === "B" || tag === "STRONG" ? "bold" : tag === "I" || tag === "EM" ? "italic" : tag === "U" ? "underline" : tag === "S" || tag === "STRIKE" || tag === "DEL" ? "strike" : tag === "CODE" ? "code" : null;
    if ((tag === "DIV" || tag === "P") && !first.v) push({ t: "break" });
    first.v = false;
    const next: Mark[] = mark && !marks.includes(mark) ? [...marks, mark] : marks;
    el.childNodes.forEach((c) => walk(c, next, first));
  };
  root.childNodes.forEach((c) => walk(c, [], { v: true }));
  return out.length ? out : [{ t: "text", v: "" }];
}

function isEmptyText(el: HTMLElement): boolean {
  return (el.innerText ?? "").replace(/​/g, "").trim() === "";
}

/**
 * Aperçu vivant : rendu côté serveur au premier chargement, puis mis à jour par l'éditeur
 * (message `atelier:site`) sans rechargement. En mode éditeur, gère la sélection, le glisser,
 * l'édition du texte (simple en Design, riche en Écriture), les barres flottantes et le menu « / ».
 */
export function LivePreview({ initialSite, entries, path, mode, editor }: Props) {
  const [site, setSite] = useState(initialSite);
  const [modeState, setModeState] = useState(mode ?? initialSite.theme.defaultMode);
  const data = useMemo(() => memoryData(entries), [entries]);
  const selectedId = useRef<string | null>(null);

  // Après chaque rendu du site, on remet le surlignage sur l'élément sélectionné (il a pu être recréé).
  useEffect(() => {
    if (!editor) return;
    document.querySelectorAll<HTMLElement>("[data-node][data-selected]").forEach((el) => { el.style.outline = ""; el.removeAttribute("data-selected"); });
    const el = selectedId.current ? document.querySelector<HTMLElement>(`[data-node="${selectedId.current}"]`) : null;
    if (el) { el.style.outline = `2px solid ${ACCENT}`; el.style.outlineOffset = "-1px"; el.setAttribute("data-selected", ""); }
  }, [site, editor]);

  useEffect(() => {
    if (!editor) return;
    let hovered: HTMLElement | null = null;
    let containers = new Set<string>();
    let textNodes = new Set<string>();
    let editMode: EditMode = "design";
    let blocks: BlockPresetInfo[] = [];
    let editing: HTMLElement | null = null;
    let press: { x: number; y: number; el: HTMLElement } | null = null;
    let dragging = false;
    let target: { id: string; position: "before" | "after" | "inside" } | null = null;

    const selectedEl = () => (selectedId.current ? document.querySelector<HTMLElement>(`[data-node="${selectedId.current}"]`) : null);
    const nodeOf = (t: EventTarget | null) => (t instanceof Element ? (t.closest("[data-node]") as HTMLElement | null) : null);
    const idOf = (el: HTMLElement) => el.getAttribute("data-node")!;
    const isRoot = (el: HTMLElement) => idOf(el) === document.querySelector(".at-page > [data-node]")?.getAttribute("data-node");
    const outline = (el: HTMLElement | null, kind: "selected" | "hover") => { if (!el) return; el.style.outline = kind === "selected" ? `2px solid ${ACCENT}` : `1px dashed ${ACCENT}`; el.style.outlineOffset = "-1px"; };
    const clear = (el: HTMLElement | null) => { if (el && idOf(el) !== selectedId.current && el !== editing) el.style.outline = ""; };
    const select = (el: HTMLElement | null, notify: boolean) => {
      const prev = selectedEl();
      if (prev) { prev.style.outline = ""; prev.removeAttribute("data-selected"); }
      selectedId.current = el ? idOf(el) : null;
      if (el) { outline(el, "selected"); el.setAttribute("data-selected", ""); }
      if (notify) parent.postMessage({ type: "atelier:select", id: selectedId.current }, "*");
    };

    // ---------------------------------------------------------------- calques d'interface (dans l'aperçu)
    const layer = (css: string) => { const d = document.createElement("div"); d.setAttribute("data-atelier-ui", ""); d.style.cssText = css; document.body.appendChild(d); return d; };
    const UI = "font:12px/1.4 system-ui,sans-serif;color:#e8e8ec;pointer-events:auto;z-index:2147483647;position:absolute;box-sizing:border-box";
    const indicator = layer("position:absolute;pointer-events:none;z-index:2147483647;display:none;background:#1F5F8B;border-radius:2px;box-shadow:0 0 0 1px #fff");
    const gridLayer = layer("position:absolute;left:0;top:0;right:0;pointer-events:none;z-index:2147483646;display:none");
    gridLayer.setAttribute("data-atelier-grid", "");
    const blockBar = layer(`${UI};display:none;background:#1a1b1f;border:1px solid #3a3b42;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.4);padding:2px;gap:2px;align-items:center`);
    const selBar = layer(`${UI};display:none;background:#1a1b1f;border:1px solid #3a3b42;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.4);padding:2px;gap:2px;align-items:center`);
    const slashMenu = layer(`${UI};display:none;background:#1a1b1f;border:1px solid #3a3b42;border-radius:6px;box-shadow:0 12px 32px rgba(0,0,0,.5);min-width:240px;max-height:280px;overflow:auto;padding:4px`);
    // Poignée à gauche du bloc, comme dans Notion : « + » pour insérer, « ⋮⋮ » pour glisser.
    const grip = layer(`${UI};display:none;flex-direction:column;gap:1px;background:transparent`);
    const BTN = "background:none;border:0;color:#c9cad0;font:inherit;font-weight:600;height:24px;min-width:24px;padding:0 6px;border-radius:4px;cursor:pointer";
    const style = document.createElement("style");
    style.textContent = `[data-atelier-ui] button:hover{background:#2a2b30;color:#fff}[data-atelier-ui] select{background:#232428;color:#e8e8ec;border:1px solid #3a3b42;border-radius:4px;height:24px;font:inherit;padding:0 4px}[data-atelier-ui] .on{background:rgba(106,166,255,.18);color:#6aa6ff}[data-atelier-ui] .item{display:flex;gap:8px;align-items:center;height:28px;padding:0 8px;border-radius:4px;cursor:pointer;white-space:nowrap}[data-atelier-ui] .item.cur{background:rgba(106,166,255,.18)}[data-atelier-ui] .grp{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#6c6d76;padding:6px 8px 2px}`;
    document.head.appendChild(style);

    const sizeGrid = () => { gridLayer.style.height = `${Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)}px`; };
    const gridObserver = new ResizeObserver(sizeGrid);
    gridObserver.observe(document.documentElement);
    const renderGrid = (g: { show: boolean; columns: number; gutter: string; margin: string; maxWidth: string }) => {
      if (!g.show) { gridLayer.style.display = "none"; return; }
      gridLayer.style.display = "block";
      sizeGrid();
      const cols = Array.from({ length: g.columns }, () => `<div style="background:rgba(31,95,139,.07);box-shadow:inset 1px 0 rgba(31,95,139,.35), inset -1px 0 rgba(31,95,139,.35)"></div>`).join("");
      gridLayer.innerHTML = `<div style="max-width:${g.maxWidth};margin:0 auto;padding:0 ${g.margin};height:100%;box-sizing:border-box"><div style="display:grid;grid-template-columns:repeat(${g.columns},1fr);gap:${g.gutter};height:100%">${cols}</div></div>`;
    };
    const showIndicator = (el: HTMLElement, position: "before" | "after" | "inside") => {
      const r = el.getBoundingClientRect();
      const sx = window.scrollX, sy = window.scrollY;
      indicator.style.display = "block";
      if (position === "inside") indicator.style.cssText += `;background:rgba(31,95,139,.12);box-shadow:inset 0 0 0 2px #1F5F8B;left:${r.left + sx}px;top:${r.top + sy}px;width:${r.width}px;height:${r.height}px`;
      else indicator.style.cssText += `;background:#1F5F8B;box-shadow:0 0 0 1px #fff;left:${r.left + sx}px;top:${(position === "before" ? r.top : r.bottom) + sy - 2}px;width:${r.width}px;height:4px`;
    };
    const hideIndicator = () => { indicator.style.display = "none"; };

    // ---------------------------------------------------------------- barre de bloc (mode Écriture, au survol)
    const TEXT_TYPES: [string, string][] = [["p", "Paragraphe"], ["h1", "Titre 1"], ["h2", "Titre 2"], ["h3", "Titre 3"], ["blockquote", "Citation"]];
    let barEl: HTMLElement | null = null;
    const placeBar = (bar: HTMLElement, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      bar.style.display = "flex";
      const w = bar.offsetWidth;
      bar.style.left = `${Math.max(4, Math.min(r.right - w, window.innerWidth - w - 4)) + window.scrollX}px`;
      bar.style.top = `${r.top + window.scrollY - 30}px`;
    };
    const renderBlockBar = (el: HTMLElement) => {
      const id = idOf(el);
      const isText = textNodes.has(id);
      const tag = el.tagName.toLowerCase();
      blockBar.innerHTML = "";
      const b = (label: string, title: string, onClick: () => void, cls = "") => { const x = document.createElement("button"); x.textContent = label; x.title = title; x.className = cls; x.style.cssText = BTN; x.addEventListener("mousedown", (e) => e.preventDefault()); x.addEventListener("click", (e) => { e.stopPropagation(); onClick(); }); blockBar.appendChild(x); return x; };
      if (isText) {
        const sel = document.createElement("select");
        sel.title = "Type de bloc";
        TEXT_TYPES.forEach(([v, l]) => { const o = document.createElement("option"); o.value = v; o.textContent = l; if (v === tag) o.selected = true; sel.appendChild(o); });
        sel.addEventListener("mousedown", (e) => e.stopPropagation());
        sel.addEventListener("change", () => parent.postMessage({ type: "atelier:set-tag", id, tag: sel.value }, "*"));
        blockBar.appendChild(sel);
        const align = getComputedStyle(el).textAlign;
        [["left", "⯇", "Aligner à gauche"], ["center", "≡", "Centrer"], ["right", "⯈", "Aligner à droite"]].forEach(([v, l, t]) => b(l!, t!, () => parent.postMessage({ type: "atelier:set-style", id, prop: "textAlign", value: (v === "left" && align !== "left") || v !== "left" ? v : undefined }, "*"), (align === v || (v === "left" && align === "start")) ? "on" : ""));
      }
      b("Style", "Régler le style en détail (mode Design)", () => parent.postMessage({ type: "atelier:style-in-context", id }, "*"));
      b("＋", "Insérer un bloc après (menu /)", () => openSlash(el, true));
      b("🗑", "Supprimer le bloc", () => parent.postMessage({ type: "atelier:remove", id }, "*"));
      barEl = el;
      placeBar(blockBar, el);
      // poignée gauche
      grip.innerHTML = "";
      const g = (label: string, title: string, cursor: string) => { const x = document.createElement("button"); x.textContent = label; x.title = title; x.style.cssText = BTN + `;height:20px;min-width:20px;padding:0;font-size:13px;background:#1a1b1f;border:1px solid #3a3b42;color:#9c9da6;cursor:${cursor}`; x.addEventListener("mousedown", (e) => e.preventDefault()); grip.appendChild(x); return x; };
      const plus = g("+", "Insérer un bloc après (ou tapez / dans un texte)", "pointer");
      plus.addEventListener("click", (e) => { e.stopPropagation(); openSlash(el, true); });
      const handle = g("⋮⋮", "Glisser pour déplacer le bloc", "grab");
      handle.addEventListener("mousedown", (e) => { e.preventDefault(); e.stopPropagation(); if (editing) endEdit(true); select(el, true); press = { x: e.clientX, y: e.clientY, el }; });
      const r = el.getBoundingClientRect();
      grip.style.display = "flex";
      // À gauche du bloc s'il y a la place, sinon à l'intérieur de son bord gauche.
      grip.style.left = `${(r.left >= 30 ? r.left - 24 : r.left + 4) + window.scrollX}px`;
      grip.style.top = `${r.top + window.scrollY}px`;
    };
    const hideBlockBar = () => { blockBar.style.display = "none"; grip.style.display = "none"; barEl = null; };
    /** Vrai si la souris est dans la zone du bloc courant élargie vers la poignée (à gauche) et la barre (au-dessus). */
    const nearBar = (x: number, y: number) => {
      if (!barEl || !barEl.isConnected) return false;
      const r = barEl.getBoundingClientRect();
      return x >= r.left - 40 && x <= r.right && y >= r.top - 36 && y <= r.bottom;
    };

    // ---------------------------------------------------------------- barre de sélection (texte riche)
    const renderSelBar = () => {
      const sel = window.getSelection();
      if (!editing || !sel || sel.isCollapsed || sel.rangeCount === 0) { selBar.style.display = "none"; return; }
      const range = sel.getRangeAt(0);
      if (!editing.contains(range.commonAncestorContainer)) { selBar.style.display = "none"; return; }
      selBar.innerHTML = "";
      const b = (label: string, title: string, cmd: string, css = "") => { const x = document.createElement("button"); x.innerHTML = label; x.title = title; x.style.cssText = BTN + css; x.className = document.queryCommandState(cmd) ? "on" : ""; x.addEventListener("mousedown", (e) => e.preventDefault()); x.addEventListener("click", (e) => { e.stopPropagation(); document.execCommand(cmd); renderSelBar(); }); selBar.appendChild(x); };
      b("B", "Gras (⌘B)", "bold");
      b("I", "Italique (⌘I)", "italic", ";font-style:italic");
      b("U", "Souligné (⌘U)", "underline", ";text-decoration:underline");
      b("S", "Barré", "strikeThrough", ";text-decoration:line-through");
      const link = document.createElement("button"); link.textContent = "🔗"; link.title = "Lien (⌘K) : adresse, ou /page du site"; link.style.cssText = BTN; link.addEventListener("mousedown", (e) => e.preventDefault()); link.addEventListener("click", (e) => { e.stopPropagation(); makeLink(); }); selBar.appendChild(link);
      const r = range.getBoundingClientRect();
      selBar.style.display = "flex";
      const w = selBar.offsetWidth;
      selBar.style.left = `${Math.max(4, r.left + r.width / 2 - w / 2) + window.scrollX}px`;
      selBar.style.top = `${r.top + window.scrollY - 34}px`;
    };
    const makeLink = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const current = (sel.anchorNode?.parentElement?.closest("a") as HTMLAnchorElement | null)?.getAttribute("href") ?? "";
      const url = window.prompt("Adresse du lien (https://…, ou un chemin du site comme /contact). Vide pour retirer le lien.", current);
      if (url === null) return;
      if (!url.trim()) { document.execCommand("unlink"); return; }
      document.execCommand("createLink", false, url.trim());
      const a = sel.anchorNode?.parentElement?.closest("a");
      if (a) a.setAttribute("data-link", JSON.stringify(url.startsWith("/") ? { kind: "url", url } : { kind: "url", url: url.trim() }));
      renderSelBar();
    };

    // ---------------------------------------------------------------- menu « / »
    let slash: { el: HTMLElement; query: string; cursor: number; after: boolean } | null = null;
    const filtered = () => { const q = slash?.query.toLowerCase() ?? ""; return blocks.filter((b) => !q || `${b.label} ${b.group} ${b.keywords ?? ""}`.toLowerCase().includes(q)); };
    const renderSlash = () => {
      if (!slash) { slashMenu.style.display = "none"; return; }
      const list = filtered();
      slashMenu.innerHTML = `<div class="grp">${slash.query ? `Recherche : ${slash.query}` : "Insérer un bloc — tapez pour filtrer"}</div>`;
      let lastGroup = "";
      list.forEach((b, i) => {
        if (b.group !== lastGroup) { lastGroup = b.group; const g = document.createElement("div"); g.className = "grp"; g.textContent = b.group; slashMenu.appendChild(g); }
        const it = document.createElement("div"); it.className = "item" + (i === slash!.cursor ? " cur" : ""); it.textContent = b.label;
        it.addEventListener("mousedown", (e) => { e.preventDefault(); pickSlash(b); });
        slashMenu.appendChild(it);
      });
      if (!list.length) { const n = document.createElement("div"); n.className = "grp"; n.textContent = "Aucun bloc ne correspond"; slashMenu.appendChild(n); }
      const r = slash.el.getBoundingClientRect();
      slashMenu.style.display = "block";
      slashMenu.style.left = `${r.left + window.scrollX}px`;
      slashMenu.style.top = `${r.bottom + window.scrollY + 4}px`;
      slashMenu.querySelector(".cur")?.scrollIntoView({ block: "nearest" });
    };
    const openSlash = (el: HTMLElement, after: boolean) => { slash = { el, query: "", cursor: 0, after }; renderSlash(); };
    const closeSlash = () => { slash = null; renderSlash(); };
    const pickSlash = (b: BlockPresetInfo) => {
      if (!slash) return;
      const el = slash.el;
      const replace = !slash.after && textNodes.has(idOf(el)) && isEmptyText(el);
      closeSlash();
      if (editing === el) endEdit(!replace);
      parent.postMessage({ type: "atelier:slash", id: idOf(el), preset: b.id, replace }, "*");
    };

    // ---------------------------------------------------------------- édition du texte
    const placeCaret = (el: HTMLElement, where: "start" | "end") => {
      const range = document.createRange(); range.selectNodeContents(el); range.collapse(where === "start");
      const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(range);
    };
    const startEdit = (el: HTMLElement, caret?: "start" | "end" | "all") => {
      if (editing === el) return;
      if (editing) endEdit(true);
      editing = el;
      el.setAttribute("data-original-html", el.innerHTML);
      el.contentEditable = "true";
      el.style.outline = `2px solid ${ACCENT}`;
      el.style.outlineOffset = "-1px";
      el.focus({ preventScroll: true });
      if (caret === "all") { const range = document.createRange(); range.selectNodeContents(el); const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(range); }
      else if (caret) placeCaret(el, caret);
      try { document.execCommand("styleWithCSS", false, "false"); } catch { /* ancien navigateur */ }
      select(el, true);
    };
    const endEdit = (commit: boolean) => {
      if (!editing) return;
      const el = editing; editing = null;
      closeSlash();
      selBar.style.display = "none";
      el.contentEditable = "false";
      if (idOf(el) !== selectedId.current) el.style.outline = "";
      const content = commit ? serialize(el) : null;
      // Le DOM édité par le navigateur n'est pas celui que React connaît : on le remet tel quel, React remontera le texte avec le nouveau contenu.
      el.innerHTML = el.getAttribute("data-original-html") ?? el.innerHTML;
      el.removeAttribute("data-original-html");
      if (content) parent.postMessage({ type: "atelier:text", id: idOf(el), content }, "*");
    };
    /** Coupe le bloc au curseur : le contenu après le curseur part dans un nouveau bloc. */
    const splitAtCaret = (el: HTMLElement) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const before = document.createRange(); before.selectNodeContents(el); before.setEnd(range.startContainer, range.startOffset);
      const after = document.createRange(); after.selectNodeContents(el); after.setStart(range.endContainer, range.endOffset);
      const b = document.createElement("div"); b.appendChild(before.cloneContents());
      const a = document.createElement("div"); a.appendChild(after.cloneContents());
      const id = idOf(el);
      const beforeContent = serialize(b), afterContent = serialize(a);
      editing = null; el.contentEditable = "false"; selBar.style.display = "none";
      el.innerHTML = el.getAttribute("data-original-html") ?? el.innerHTML;
      el.removeAttribute("data-original-html");
      parent.postMessage({ type: "atelier:split", id, before: beforeContent, after: afterContent }, "*");
    };
    const caretAtStart = (el: HTMLElement) => { const sel = window.getSelection(); if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return false; const r = document.createRange(); r.selectNodeContents(el); r.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset); return r.toString().length === 0; };

    // ---------------------------------------------------------------- dépôt d'un bloc depuis la palette
    const targetAt = (x: number, y: number, exclude?: HTMLElement | null) => {
      const under = document.elementFromPoint(x, y);
      let el = nodeOf(under);
      while (el && exclude && (el === exclude || exclude.contains(el))) el = nodeOf(el.parentElement);
      if (!el) return null;
      const id = idOf(el);
      const r = el.getBoundingClientRect();
      const ry = (y - r.top) / r.height;
      const canInside = containers.has(id);
      const position: "before" | "after" | "inside" = canInside ? (ry < 0.25 ? "before" : ry > 0.75 ? "after" : "inside") : (ry < 0.5 ? "before" : "after");
      return { el, id, position };
    };
    const isBlockDrag = (e: DragEvent) => !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("text/atelier-block");
    const onDragOver = (e: DragEvent) => { if (!isBlockDrag(e)) return; e.preventDefault(); e.dataTransfer!.dropEffect = "copy"; const t = targetAt(e.clientX, e.clientY); if (!t) { hideIndicator(); return; } showIndicator(t.el, t.position); };
    const onDragLeave = (e: DragEvent) => { if (!e.relatedTarget) hideIndicator(); };
    const onDrop = (e: DragEvent) => { if (!isBlockDrag(e)) return; e.preventDefault(); hideIndicator(); const preset = e.dataTransfer!.getData("text/atelier-block"); const t = targetAt(e.clientX, e.clientY); if (preset && t) parent.postMessage({ type: "atelier:drop-block", preset, target: t.id, position: t.position }, "*"); };

    // ---------------------------------------------------------------- souris
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      if (editing) { if (el !== editing) endEdit(true); else return; }
      if (!el || e.button !== 0) return;
      // Mode Écriture : cliquer un texte y place directement le curseur.
      if (editMode === "write" && textNodes.has(idOf(el))) { startEdit(el); return; }
      if (idOf(el) === selectedId.current && !isRoot(el)) press = { x: e.clientX, y: e.clientY, el };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (press && !dragging && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 5) {
        dragging = true;
        document.body.style.userSelect = "none";
        document.body.classList.add("atelier-dragging");
        press.el.style.opacity = "0.5";
        hideBlockBar();
      }
      if (dragging && press) {
        const t = targetAt(e.clientX, e.clientY, press.el);
        if (!t) { target = null; hideIndicator(); return; }
        target = { id: t.id, position: t.position };
        showIndicator(t.el, t.position);
        return;
      }
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      if (el !== hovered) {
        clear(hovered); hovered = el;
        if (el && idOf(el) !== selectedId.current && el !== editing) outline(el, "hover");
        if (editMode === "write" && el && !isRoot(el)) {
          // En route vers la poignée, on passe souvent sur le parent : on garde la barre du bloc courant.
          const keep = barEl && el !== barEl && el.contains(barEl) && nearBar(e.clientX, e.clientY);
          if (!keep) renderBlockBar(el);
        }
      }
    };
    const onMouseUp = () => {
      if (dragging && press) {
        press.el.style.opacity = "";
        document.body.style.userSelect = "";
        document.body.classList.remove("atelier-dragging");
        hideIndicator();
        if (target) parent.postMessage({ type: "atelier:move", id: idOf(press.el), target: target.id, position: target.position }, "*");
        target = null;
        window.setTimeout(() => { dragging = false; }, 0);
      } else dragging = false;
      press = null;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      e.preventDefault();
      if (dragging || editing) return;
      const el = nodeOf(e.target);
      if (!el) return;
      select(el, true);
    };
    const onDblClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      if (!el || !textNodes.has(idOf(el))) return;
      e.preventDefault();
      startEdit(el, "all");
    };
    const onOut = (e: MouseEvent) => { if (!nodeOf(e.relatedTarget) && !(e.relatedTarget as Element | null)?.closest?.("[data-atelier-ui]")) { clear(hovered); hovered = null; } };
    // Sortir du cadre ne cache rien : la poignée doit rester atteignable même en bordure.
    const onLeaveDoc = () => { /* volontairement vide */ };

    // ---------------------------------------------------------------- clavier
    const FORWARDED = new Set(["Backspace", "Delete", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"]);
    const onKeyDown = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (slash) {
        if (e.key === "Escape") { e.preventDefault(); closeSlash(); return; }
        if (e.key === "Enter") { e.preventDefault(); const b = filtered()[slash.cursor]; if (b) pickSlash(b); return; }
        if (e.key === "ArrowDown") { e.preventDefault(); slash.cursor = Math.min(filtered().length - 1, slash.cursor + 1); renderSlash(); return; }
        if (e.key === "ArrowUp") { e.preventDefault(); slash.cursor = Math.max(0, slash.cursor - 1); renderSlash(); return; }
        if (e.key === "Backspace") { e.preventDefault(); if (!slash.query) closeSlash(); else { slash.query = slash.query.slice(0, -1); slash.cursor = 0; renderSlash(); } return; }
        if (e.key.length === 1 && !meta) { e.preventDefault(); slash.query += e.key; slash.cursor = 0; renderSlash(); return; }
        return;
      }
      if (editing) {
        if (e.key === "Escape") { e.preventDefault(); endEdit(false); return; }
        // Annuler pendant la frappe : d'abord la frappe (navigateur), puis, s'il n'y a plus rien, l'opération précédente d'Atelier.
        if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
          let native = false; try { native = document.queryCommandEnabled("undo"); } catch { native = false; }
          if (!native) { e.preventDefault(); endEdit(true); parent.postMessage({ type: "atelier:key", key: "z", metaKey: e.metaKey, ctrlKey: e.ctrlKey, shiftKey: false, altKey: false }, "*"); }
          return;
        }
        if (meta && e.key.toLowerCase() === "b") { e.preventDefault(); document.execCommand("bold"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "i") { e.preventDefault(); document.execCommand("italic"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "u") { e.preventDefault(); document.execCommand("underline"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); makeLink(); return; }
        if (e.key === "/" && editMode === "write" && !meta) { e.preventDefault(); openSlash(editing, false); return; }
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (editMode === "write") splitAtCaret(editing); else endEdit(true); return; }
        if (e.key === "Backspace" && editMode === "write" && isEmptyText(editing) && caretAtStart(editing)) { e.preventDefault(); const el = editing; editing = null; el.contentEditable = "false"; el.innerHTML = el.getAttribute("data-original-html") ?? el.innerHTML; el.removeAttribute("data-original-html"); parent.postMessage({ type: "atelier:merge-prev", id: idOf(el) }, "*"); return; }
        return;
      }
      if (FORWARDED.has(e.key) || (meta && ["z", "d", "c", "x", "v", "k"].includes(e.key.toLowerCase())) || (e.ctrlKey && e.key.toLowerCase() === "g")) {
        e.preventDefault();
        parent.postMessage({ type: "atelier:key", key: e.key, metaKey: e.metaKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey }, "*");
      }
    };
    const onFocusOut = (e: FocusEvent) => { if (editing && e.target === editing && !(e.relatedTarget as Element | null)?.closest?.("[data-atelier-ui]")) window.setTimeout(() => { if (editing === e.target) endEdit(true); }, 0); };
    const onSelectionChange = () => { renderSelBar(); };

    // ---------------------------------------------------------------- messages de l'éditeur
    const onMessage = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string | null; mode?: string; site?: Site; containers?: string[]; textNodes?: string[]; editMode?: EditMode; blocks?: BlockPresetInfo[]; caret?: "start" | "end" | "all"; state?: string | null };
      if (m?.type === "atelier:site" && m.site) {
        setSite(m.site);
        if (m.containers) containers = new Set(m.containers);
        if (m.textNodes) textNodes = new Set(m.textNodes);
        if (m.blocks) blocks = m.blocks;
        if (m.editMode) editMode = m.editMode;
      }
      if (m?.type === "atelier:editmode" && m.editMode) { editMode = m.editMode; if (editing) endEdit(true); hideBlockBar(); }
      if (m?.type === "atelier:mode" && m.mode) setModeState(m.mode);
      if (m?.type === "atelier:grid") renderGrid(m as unknown as { show: boolean; columns: number; gutter: string; margin: string; maxWidth: string });
      if (m?.type === "atelier:highlight") {
        const el = m.id ? document.querySelector<HTMLElement>(`[data-node="${m.id}"]`) : null;
        if (editing && el !== editing) endEdit(true);
        select(el, false);
        el?.scrollIntoView({ block: "nearest" });
      }
      if (m?.type === "atelier:state") {
        document.querySelectorAll<HTMLElement>("[data-force-state]").forEach((el) => el.removeAttribute("data-force-state"));
        const el = m.id && m.state ? document.querySelector<HTMLElement>(`[data-node="${m.id}"]`) : null;
        if (el && m.state) el.setAttribute("data-force-state", m.state);
      }
      if (m?.type === "atelier:edit-text" && m.id) {
        // L'élément peut n'exister qu'après le prochain rendu : on réessaie brièvement.
        let tries = 0;
        const tryEdit = () => { const el = document.querySelector<HTMLElement>(`[data-node="${m.id}"]`); if (el) startEdit(el, m.caret ?? "end"); else if (tries++ < 20) window.setTimeout(tryEdit, 30); };
        tryEdit();
      }
    };

    document.addEventListener("dblclick", onDblClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusout", onFocusOut, true);
    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("drop", onDrop);
    document.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    window.addEventListener("message", onMessage);
    parent.postMessage({ type: "atelier:ready" }, "*");
    return () => {
      document.removeEventListener("dblclick", onDblClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusout", onFocusOut, true);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("drop", onDrop);
      document.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      window.removeEventListener("message", onMessage);
      gridObserver.disconnect();
      [indicator, gridLayer, blockBar, selBar, slashMenu, grip, style].forEach((n) => n.remove());
    };
  }, [editor]);

  // Curseurs d'éditeur, et repère visible pour un conteneur vide (sinon il n'a aucune taille et on ne peut rien y déposer).
  const EDITOR_CSS = `.at-page, .at-page * { cursor: default !important; } .at-page [contenteditable="true"] { cursor: text !important; } body.atelier-dragging, body.atelier-dragging .at-page * { cursor: grabbing !important; }
  .at-page :where(div, section, main, header, footer, nav, article, aside, ul, ol, li, a, form)[data-node]:empty { min-height: 40px; min-width: 40px; outline: 1px dashed rgba(31,95,139,.55); outline-offset: -1px; background: repeating-linear-gradient(45deg, transparent 0 8px, rgba(31,95,139,.06) 8px 9px); }
  .at-page [contenteditable]:empty::before { content: "Tapez du texte, ou / pour insérer un bloc"; color: #9a9a9a; pointer-events: none; }`;
  const match = matchPath(site, data, path);
  if (!match) return <p style={{ padding: 24, fontFamily: "system-ui", color: "#777" }}>{editor ? "Chargement de la page…" : `Page introuvable : ${path}`}</p>;
  const ctx: RenderContext = { site, page: match.page, entry: match.entry, params: match.params, locale: site.settings.defaultLocale, data, assets: assetMap(site), basePath: "/preview", editor };
  const fonts = fontsHref(site.theme);
  return (
    <>
      {fonts ? <link rel="stylesheet" href={fonts} /> : null}
      <style dangerouslySetInnerHTML={{ __html: siteCss(site) }} />
      {editor ? <style dangerouslySetInnerHTML={{ __html: EDITOR_CSS }} /> : null}
      <RenderPage ctx={ctx} mode={modeState} />
    </>
  );
}
