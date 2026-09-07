"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Entry, Site } from "@atelier/model";
import { RenderPage, assetMap, fontsHref, matchPath, memoryData, siteCss, type RenderContext } from "@atelier/renderer";

type Props = { initialSite: Site; entries: Entry[]; path: string; mode?: string; editor: boolean };

/**
 * Aperçu vivant : rendu côté serveur au premier chargement, puis mis à jour par l'éditeur
 * (message `atelier:site`) sans rechargement. En mode éditeur, gère la sélection au clic.
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
    if (el) { el.style.outline = "2px solid #1F5F8B"; el.style.outlineOffset = "-1px"; el.setAttribute("data-selected", ""); }
  }, [site, editor]);

  useEffect(() => {
    if (!editor) return;
    let hovered: HTMLElement | null = null;
    const selectedEl = () => (selectedId.current ? document.querySelector<HTMLElement>(`[data-node="${selectedId.current}"]`) : null);
    let containers = new Set<string>();
    let textNodes = new Set<string>();
    let editing: HTMLElement | null = null;
    // Glisser depuis le canvas
    let press: { x: number; y: number; el: HTMLElement } | null = null;
    let dragging = false;
    let target: { id: string; position: "before" | "after" | "inside" } | null = null;
    const indicator = document.createElement("div");
    indicator.style.cssText = "position:absolute;pointer-events:none;z-index:2147483647;display:none;background:#1F5F8B;border-radius:2px;box-shadow:0 0 0 1px #fff";
    document.body.appendChild(indicator);

    const nodeOf = (t: EventTarget | null) => (t instanceof Element ? (t.closest("[data-node]") as HTMLElement | null) : null);
    const outline = (el: HTMLElement | null, kind: "selected" | "hover") => { if (!el) return; el.style.outline = kind === "selected" ? "2px solid #1F5F8B" : "1px dashed #1F5F8B"; el.style.outlineOffset = "-1px"; };
    const clear = (el: HTMLElement | null) => { if (el && el.getAttribute("data-node") !== selectedId.current) el.style.outline = ""; };
    const select = (el: HTMLElement | null, notify: boolean) => {
      const prev = selectedEl();
      if (prev) { prev.style.outline = ""; prev.removeAttribute("data-selected"); }
      selectedId.current = el?.getAttribute("data-node") ?? null;
      if (el) { outline(el, "selected"); el.setAttribute("data-selected", ""); }
      if (notify) parent.postMessage({ type: "atelier:select", id: selectedId.current }, "*");
    };
    const showIndicator = (el: HTMLElement, position: "before" | "after" | "inside") => {
      const r = el.getBoundingClientRect();
      const sx = window.scrollX, sy = window.scrollY;
      indicator.style.display = "block";
      if (position === "inside") {
        indicator.style.cssText += `;background:rgba(31,95,139,.12);box-shadow:inset 0 0 0 2px #1F5F8B;left:${r.left + sx}px;top:${r.top + sy}px;width:${r.width}px;height:${r.height}px`;
      } else {
        indicator.style.cssText += `;background:#1F5F8B;box-shadow:0 0 0 1px #fff;left:${r.left + sx}px;top:${(position === "before" ? r.top : r.bottom) + sy - 2}px;width:${r.width}px;height:4px`;
      }
    };
    const hideIndicator = () => { indicator.style.display = "none"; };

    // --- édition du texte en place (double-clic sur un texte simple)
    const endEdit = (commit: boolean) => {
      if (!editing) return;
      const el = editing; editing = null;
      el.contentEditable = "false";
      el.style.outline = "";
      if (commit) parent.postMessage({ type: "atelier:text", id: el.getAttribute("data-node"), text: el.innerText }, "*");
      else el.innerText = el.getAttribute("data-original-text") ?? el.innerText;
      el.removeAttribute("data-original-text");
    };
    const onDblClick = (e: MouseEvent) => {
      const el = nodeOf(e.target);
      if (!el) return;
      const id = el.getAttribute("data-node")!;
      if (!textNodes.has(id)) return;
      e.preventDefault();
      endEdit(true);
      editing = el;
      el.setAttribute("data-original-text", el.innerText);
      el.contentEditable = "plaintext-only";
      el.style.outline = "2px solid #e7b458";
      el.focus();
      const range = document.createRange(); range.selectNodeContents(el);
      const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(range);
    };
    const FORWARDED = new Set(["Backspace", "Delete", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"]);
    const onKeyDown = (e: KeyboardEvent) => {
      if (editing) {
        if (e.key === "Escape") { e.preventDefault(); endEdit(false); }
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); endEdit(true); }
        return;
      }
      // Hors édition, l'aperçu n'a pas de clavier propre : les touches de l'éditeur sont transmises au parent.
      const meta = e.metaKey || e.ctrlKey;
      if (FORWARDED.has(e.key) || (meta && ["z", "d", "c", "x", "v", "k"].includes(e.key.toLowerCase()))) {
        e.preventDefault();
        parent.postMessage({ type: "atelier:key", key: e.key, metaKey: e.metaKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey }, "*");
      }
    };
    const onFocusOut = (e: FocusEvent) => { if (editing && e.target === editing) endEdit(true); };

    // --- dépôt d'un bloc glissé depuis la palette
    const targetAt = (x: number, y: number, exclude?: HTMLElement | null) => {
      const under = document.elementFromPoint(x, y);
      let el = nodeOf(under);
      while (el && exclude && (el === exclude || exclude.contains(el))) el = nodeOf(el.parentElement);
      if (!el) return null;
      const id = el.getAttribute("data-node")!;
      const r = el.getBoundingClientRect();
      const ry = (y - r.top) / r.height;
      const canInside = containers.has(id);
      const position: "before" | "after" | "inside" = canInside ? (ry < 0.25 ? "before" : ry > 0.75 ? "after" : "inside") : (ry < 0.5 ? "before" : "after");
      return { el, id, position };
    };
    const isBlockDrag = (e: DragEvent) => !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("text/atelier-block");
    const onDragOver = (e: DragEvent) => {
      if (!isBlockDrag(e)) return;
      e.preventDefault();
      e.dataTransfer!.dropEffect = "copy";
      const t = targetAt(e.clientX, e.clientY);
      if (!t) { hideIndicator(); return; }
      showIndicator(t.el, t.position);
    };
    const onDragLeave = (e: DragEvent) => { if (!e.relatedTarget) hideIndicator(); };
    const onDrop = (e: DragEvent) => {
      if (!isBlockDrag(e)) return;
      e.preventDefault();
      hideIndicator();
      const preset = e.dataTransfer!.getData("text/atelier-block");
      const t = targetAt(e.clientX, e.clientY);
      if (preset && t) parent.postMessage({ type: "atelier:drop-block", preset, target: t.id, position: t.position }, "*");
    };

    const onMouseDown = (e: MouseEvent) => {
      const el = nodeOf(e.target);
      if (editing) { if (el !== editing) endEdit(true); return; }
      if (!el || e.button !== 0) return;
      // On ne glisse que l'élément déjà sélectionné, jamais la racine.
      const isRoot = el.getAttribute("data-node") === document.querySelector(".at-page > [data-node]")?.getAttribute("data-node");
      if (el.getAttribute("data-node") === selectedId.current && !isRoot) press = { x: e.clientX, y: e.clientY, el };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (press && !dragging && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 5) {
        dragging = true;
        document.body.style.userSelect = "none";
        document.body.classList.add("atelier-dragging");
        press.el.style.opacity = "0.5";
      }
      if (dragging && press) {
        const under = document.elementFromPoint(e.clientX, e.clientY);
        let el = nodeOf(under);
        while (el && (el === press.el || press.el.contains(el))) el = nodeOf(el.parentElement);
        if (!el) { target = null; hideIndicator(); return; }
        const id = el.getAttribute("data-node")!;
        const r = el.getBoundingClientRect();
        const y = (e.clientY - r.top) / r.height;
        const canInside = containers.has(id);
        const position = canInside ? (y < 0.25 ? "before" : y > 0.75 ? "after" : "inside") : (y < 0.5 ? "before" : "after");
        target = { id, position };
        showIndicator(el, position);
        return;
      }
      const el = nodeOf(e.target);
      if (el !== hovered) { clear(hovered); hovered = el; if (el && el.getAttribute("data-node") !== selectedId.current) outline(el, "hover"); }
    };
    const onMouseUp = () => {
      if (dragging && press) {
        press.el.style.opacity = "";
        document.body.style.userSelect = "";
        document.body.classList.remove("atelier-dragging");
        hideIndicator();
        if (target) parent.postMessage({ type: "atelier:move", id: press.el.getAttribute("data-node"), target: target.id, position: target.position }, "*");
        target = null;
        // Empêcher le clic qui suit de changer la sélection.
        window.setTimeout(() => { dragging = false; }, 0);
      } else {
        dragging = false;
      }
      press = null;
    };
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      if (dragging || editing) return;
      const el = nodeOf(e.target);
      if (!el) return;
      select(el, true);
    };
    const onOut = (e: MouseEvent) => { if (!nodeOf(e.relatedTarget)) { clear(hovered); hovered = null; } };
    const onMessage = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string | null; mode?: string; site?: Site; containers?: string[] };
      if (m?.type === "atelier:site" && m.site) { setSite(m.site); if (m.containers) containers = new Set(m.containers); const tn = (m as { textNodes?: string[] }).textNodes; if (tn) textNodes = new Set(tn); }
      if (m?.type === "atelier:edit-text" && m.id) { const el = document.querySelector<HTMLElement>(`[data-node="${m.id}"]`); if (el) onDblClick({ target: el, preventDefault() {} } as unknown as MouseEvent); }
      if (m?.type === "atelier:mode" && m.mode) setModeState(m.mode);
      if (m?.type === "atelier:state") {
        document.querySelectorAll<HTMLElement>("[data-force-state]").forEach((el) => el.removeAttribute("data-force-state"));
        const st = (m as { state?: string | null }).state;
        const el = m.id && st ? document.querySelector<HTMLElement>(`[data-node="${m.id}"]`) : null;
        if (el && st) el.setAttribute("data-force-state", st);
      }
      if (m?.type === "atelier:highlight") {
        const el = m.id ? document.querySelector<HTMLElement>(`[data-node="${m.id}"]`) : null;
        select(el, false);
        el?.scrollIntoView({ block: "nearest" });
      }
    };
    document.addEventListener("dblclick", onDblClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusout", onFocusOut, true);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("drop", onDrop);
    document.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("message", onMessage);
    parent.postMessage({ type: "atelier:ready" }, "*");
    return () => {
      document.removeEventListener("dblclick", onDblClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusout", onFocusOut, true);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("drop", onDrop);
      document.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("message", onMessage);
      indicator.remove();
    };
  }, [editor]);

  // Curseurs d'éditeur, et repère visible pour un conteneur vide (sinon il n'a aucune taille et on ne peut rien y déposer).
  const EDITOR_CSS = `.at-page, .at-page * { cursor: default !important; } .at-page [contenteditable="plaintext-only"] { cursor: text !important; } body.atelier-dragging, body.atelier-dragging .at-page * { cursor: grabbing !important; }
  .at-page :where(div, section, main, header, footer, nav, article, aside, ul, ol, li, a, form)[data-node]:empty { min-height: 40px; min-width: 40px; outline: 1px dashed rgba(31,95,139,.55); outline-offset: -1px; background: repeating-linear-gradient(45deg, transparent 0 8px, rgba(31,95,139,.06) 8px 9px); }`;
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
