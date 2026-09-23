"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Entry, Site } from "@atelier/model";
import { serialize, isEmptyText } from "./preview/serialize";
import { isAtelierMessage, type BlockPresetInfo, type EditMode, type FromPreview, type ToPreview } from "@/lib/preview-protocol";
import { animationHost, applyScrub, type ScrubAt } from "@/lib/scrub";
import { revealForTest } from "@/lib/test-on-site";
import { playOptions } from "@/lib/play";
import { pickSelection, climbSelection } from "@/lib/selection";
import { ANIMATION_PLAY_SCRIPT, FORM_SCRIPT, INTERACTION_SCRIPT, RenderPage, applyInstantStates, assetMap, fontsHref, matchPath, memoryData, siteCss, type RenderContext } from "@atelier/renderer";

type Props = { initialSite: Site; entries: Entry[]; path: string; mode?: string; editor: boolean };

const ACCENT = "var(--atelier-ui-accent, #6aa6ff)";

/** Empêche une valeur CSS de fermer la balise style de l’aperçu. */
export const safeStyleText = (css: string) => css.replace(/</g, "\\3c ");

/** Feuille de la page seule, recalculée uniquement quand le site ou la page change. */
function PageCss({ site, pageId }: { site: Site; pageId: string }) {
  const css = useMemo(() => siteCss(site, { pageId }), [site, pageId]);
  return <style dangerouslySetInnerHTML={{ __html: safeStyleText(css) }} />;
}


/**
 * Aperçu vivant : rendu côté serveur au premier chargement, puis mis à jour par l'éditeur
 * (message `atelier:site`) sans rechargement. En mode éditeur, gère la sélection, le glisser,
 * l'édition du texte (simple en Design, riche en Écriture), les barres flottantes et le menu « / ».
 * En outil Animation : sélection seulement, et l'état de l'animation ouverte à la tête de lecture (`lib/scrub.ts`).
 */
export function LivePreview({ initialSite, entries, path, mode, editor }: Props) {
  const [site, setSite] = useState(initialSite);
  // Outil Animation : dernier instant montré, reposé après chaque rendu (les éléments ont pu être recréés, les pistes modifiées).
  const lastScrub = useRef<ScrubAt | null>(null);
  // Outil Animation : repère des éléments de la piste active (fonction posée par l'effet de l'éditeur, qui tient la couche d'interface).
  // Après chaque rendu, l'état d'arrivée des apparitions est posé sans transition : sinon un élément qui reçoit une apparition disparaîtrait de l'aperçu.
  useEffect(() => { if (editor) { applyInstantStates(document); if (lastScrub.current) applyScrub(document, lastScrub.current); } });
  // Aperçu hors éditeur : les scripts du site (interactions, formulaires) sont injectés après l'hydratation, pas dans le HTML serveur.
  useEffect(() => {
    if (editor) return;
    const scripts = [INTERACTION_SCRIPT, FORM_SCRIPT].map((code) => { const el = document.createElement("script"); el.textContent = code; document.body.appendChild(el); return el; });
    // « Tester sur le site » (?voir=id) : une fois les scripts en place, l'élément arrive à l'écran comme pour un visiteur.
    const voir = new URLSearchParams(window.location.search).get("voir");
    const timer = voir ? window.setTimeout(() => revealForTest(document, voir), 400) : 0;
    return () => { window.clearTimeout(timer); scripts.forEach((el) => el.remove()); };
  }, [editor]);
  // Dans l'éditeur, seul l'outil de lecture d'une animation (« Jouer ») est injecté : le script du site ne tourne pas.
  useEffect(() => {
    if (!editor) return;
    const el = document.createElement("script"); el.textContent = ANIMATION_PLAY_SCRIPT; document.body.appendChild(el);
    return () => el.remove();
  }, [editor]);
  const [entriesState, setEntriesState] = useState(entries);
  const [modeState, setModeState] = useState(mode ?? initialSite.theme.defaultMode);
  const data = useMemo(() => memoryData(entriesState), [entriesState]);
  const assets = useMemo(() => assetMap(site), [site]);
  const selectedId = useRef<string | null>(null);

  // Après chaque rendu du site, on remet le surlignage sur l'élément sélectionné (il a pu être recréé).
  useEffect(() => {
    if (!editor) return;
    const box = (el: HTMLElement) => (el.hasAttribute("data-instance") && el.firstElementChild instanceof HTMLElement ? el.firstElementChild : el);
    document.querySelectorAll<HTMLElement>("[data-node][data-selected]").forEach((el) => { box(el).style.outline = ""; el.removeAttribute("data-selected"); });
    const el = selectedId.current ? document.querySelector<HTMLElement>(`[data-node="${selectedId.current}"]`) : null;
    if (el) { box(el).style.outline = `2px solid ${ACCENT}`; box(el).style.outlineOffset = "-1px"; el.setAttribute("data-selected", ""); }
  }, [site, editor]);

  useEffect(() => {
    if (!editor) return;
    let hovered: HTMLElement | null = null;
    let barHover: HTMLElement | null = null;
    const send = (msg: FromPreview) => parent.postMessage(msg, window.location.origin);
    let pages: { path: string; name: string }[] = [];
    let containers = new Set<string>();
    let links = new Set<string>();       // blocs atomiques pour le dépôt : liens et boutons (contenu en ligne seulement) et, en mode Écriture, les vues de base de données (leur carte est un modèle répété)
    let textNodes = new Set<string>();
    let compounds = new Set<string>();   // éléments qu'un clic désigne d'abord (bouton, carte, occurrence, pastille) : `pickSelection`
    let editMode: EditMode = "design";
    let blocks: BlockPresetInfo[] = [];
    let editing: HTMLElement | null = null;
    let press: { x: number; y: number; el: HTMLElement } | null = null;
    // Fantôme : copie du bloc qui suit le curseur pendant le glissement (comme Notion).
    let ghost: { el: HTMLElement; dx: number; dy: number } | null = null;
    let dragging = false;
    let suppressClick = false;   // le clic qui suit un relâchement de glissement ne doit pas changer la sélection
    let target: { id: string; position: "before" | "after" | "inside" } | null = null;

    const selectedEl = () => (selectedId.current ? document.querySelector<HTMLElement>(`[data-node="${selectedId.current}"]`) : null);
    const nodeOf = (t: EventTarget | null) => (t instanceof Element ? (t.closest("[data-node]") as HTMLElement | null) : null);
    /** L'élément qu'un clic désigne : le bouton, la carte, l'occurrence ou la pastille autour du texte cliqué, puis, dedans, un niveau plus bas (`pickSelection`). */
    const chainOf = (from: Element | null): HTMLElement[] => { const chain: HTMLElement[] = []; for (let cur = nodeOf(from); cur; cur = cur.parentElement ? nodeOf(cur.parentElement) : null) chain.push(cur); return chain; };
    const pickedOf = (t: EventTarget | null): HTMLElement | null => {
      const chain = chainOf(t instanceof Element ? t : null);
      if (!chain.length) return null;
      const id = pickSelection(chain.map(idOf), compounds, selectedId.current, chainOf(selectedEl()).map(idOf));
      return chain.find((c) => idOf(c) === id) ?? chain[0]!;
    };
    /** L'élément qui dessine la boîte d'un nœud : pour une occurrence de composant (enveloppe sans boîte), la racine rendue du composant. */
    const boxOf = (el: HTMLElement): HTMLElement => (el.hasAttribute("data-instance") && el.firstElementChild instanceof HTMLElement ? el.firstElementChild : el);
    const idOf = (el: HTMLElement) => el.getAttribute("data-node")!;
    const isRoot = (el: HTMLElement) => idOf(el) === document.querySelector(".at-page > [data-node]")?.getAttribute("data-node");
    const outline = (el: HTMLElement | null, kind: "selected" | "hover") => { if (!el) return; const b = boxOf(el); b.style.outline = kind === "selected" ? `2px solid ${ACCENT}` : `1px dashed ${ACCENT}`; b.style.outlineOffset = "-1px"; };
    const clear = (el: HTMLElement | null) => { if (el && idOf(el) !== selectedId.current && el !== editing) boxOf(el).style.outline = ""; };
    const select = (el: HTMLElement | null, notify: boolean) => {
      const prev = selectedEl();
      if (prev) { boxOf(prev).style.outline = ""; prev.removeAttribute("data-selected"); }
      selectedId.current = el ? idOf(el) : null;
      if (el) { outline(el, "selected"); el.setAttribute("data-selected", ""); }
      if (notify) send({ type: "atelier:select", id: selectedId.current });
    };

    // ---------------------------------------------------------------- calques d'interface (dans l'aperçu)
    const layer = (css: string) => { const d = document.createElement("div"); d.setAttribute("data-atelier-ui", ""); d.style.cssText = css; document.body.appendChild(d); return d; };
    // Les couleurs de l'interface viennent de l'éditeur (même origine) : un seul système de design, pas de copie.
    try {
      const pcs = getComputedStyle(parent.document.documentElement);
      // Les jetons de l'éditeur sont posés sous un préfixe à part : `--color-ink`, `--color-accent`… sont aussi les noms des jetons du thème du site, et une valeur en ligne sur <html> les écraserait.
      for (const v of ["panel", "surface", "raised", "hover", "line", "line-strong", "ink", "muted", "dim", "accent", "accent-soft", "accent-ink", "danger"]) { const val = pcs.getPropertyValue(`--color-${v}`); if (val) document.documentElement.style.setProperty(`--atelier-ui-${v}`, val); }
    } catch { /* aperçu ouvert hors de l'éditeur */ }
    const UI = "font:13px/1.4 system-ui,sans-serif;color:var(--atelier-ui-ink,#e8e8ec);pointer-events:auto;z-index:2147483647;position:absolute;box-sizing:border-box;transform-origin:top left";
    // L'aperçu est souvent réduit à l'échelle : l'interface dans l'aperçu compense pour garder sa vraie taille à l'écran.
    let uiScale = 1;
    const applyUiScale = () => { [blockBar, selBar, slashMenu, grip].forEach((l) => { l.style.transform = `scale(${uiScale})`; }); };
    const indicator = layer("position:absolute;pointer-events:none;z-index:2147483647;display:none;background:var(--atelier-ui-accent,#6aa6ff);border-radius:2px;box-shadow:0 0 0 1px #fff");
    const gridLayer = layer("position:absolute;left:0;top:0;right:0;pointer-events:none;z-index:2147483646;display:none");
    gridLayer.setAttribute("data-atelier-grid", "");
    const blockBar = layer(`${UI};display:none;background:var(--atelier-ui-panel,#1a1b1f);border:1px solid var(--atelier-ui-line-strong,#3a3b42);border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.4);padding:2px;gap:2px;align-items:center`);
    const selBar = layer(`${UI};display:none;background:var(--atelier-ui-panel,#1a1b1f);border:1px solid var(--atelier-ui-line-strong,#3a3b42);border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.4);padding:2px;gap:2px;align-items:center`);
    const slashMenu = layer(`${UI};display:none;background:var(--atelier-ui-panel,#1a1b1f);border:1px solid var(--atelier-ui-line-strong,#3a3b42);border-radius:6px;box-shadow:0 12px 32px rgba(0,0,0,.5);min-width:240px;max-height:280px;overflow:auto;padding:4px`);
    // Poignée à gauche du bloc, comme dans Notion : « + » pour insérer, « ⋮⋮ » pour glisser.
    const grip = layer(`${UI};display:none;flex-direction:column;gap:1px;background:transparent`);
    const BTN = "background:none;border:0;color:var(--atelier-ui-muted,#c9cad0);font:inherit;font-weight:600;height:28px;min-width:28px;padding:0 8px;border-radius:5px;cursor:pointer";
    const style = document.createElement("style");
    style.textContent = `[data-atelier-ui] button:hover{background:var(--atelier-ui-hover,#2a2b30);color:var(--atelier-ui-ink,#fff)}[data-atelier-ui] select,[data-atelier-ui] input{background:var(--atelier-ui-surface,#232428);color:var(--atelier-ui-ink,#e8e8ec);border:1px solid var(--atelier-ui-line-strong,#3a3b42);border-radius:5px;height:28px;font:inherit;padding:0 6px}[data-atelier-ui] input:focus{outline:none;border-color:var(--atelier-ui-accent,#6aa6ff)}[data-atelier-ui] .on{background:var(--atelier-ui-accent-soft,rgba(106,166,255,.18));color:var(--atelier-ui-accent,#6aa6ff)}[data-atelier-ui] .item{display:flex;gap:8px;align-items:center;height:32px;padding:0 10px;border-radius:5px;cursor:pointer;white-space:nowrap}[data-atelier-ui] .item.cur{background:var(--atelier-ui-accent-soft,rgba(106,166,255,.18))}[data-atelier-ui] .grp{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--atelier-ui-dim,#8b8c95);padding:8px 10px 2px}`;
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
    const startGhost = (el: HTMLElement, x: number, y: number) => {
      const r = el.getBoundingClientRect();
      const clone = el.cloneNode(true) as HTMLElement;
      // Hors de son contexte, la copie perdrait police, couleur et tailles héritées : on fige les styles calculés de chaque élément.
      const src = [el, ...el.querySelectorAll<HTMLElement>("*")];
      const dst = [clone, ...clone.querySelectorAll<HTMLElement>("*")];
      src.forEach((o, i) => {
        const c = dst[i]; if (!c) return;
        const cs = getComputedStyle(o);
        let css = "";
        for (let k = 0; k < cs.length; k++) { const prop = cs[k]!; css += `${prop}:${cs.getPropertyValue(prop)};`; }
        c.style.cssText = css;
      });
      clone.removeAttribute("data-node");
      clone.querySelectorAll("[data-node]").forEach((n) => n.removeAttribute("data-node"));
      clone.querySelectorAll("[data-selected], [contenteditable]").forEach((n) => { n.removeAttribute("data-selected"); n.removeAttribute("contenteditable"); });
      clone.setAttribute("data-atelier-ui", "");
      clone.style.cssText += `;position:absolute;left:${r.left + window.scrollX}px;top:${r.top + window.scrollY}px;width:${r.width}px;height:${r.height}px;margin:0;opacity:.55;pointer-events:none;z-index:2147483647;box-shadow:0 12px 32px rgba(0,0,0,.25);outline:none;transform:none;transition:none;box-sizing:border-box`;
      document.body.appendChild(clone);
      ghost = { el: clone, dx: x - r.left, dy: y - r.top };
    };
    const moveGhost = (x: number, y: number) => { if (!ghost) return; ghost.el.style.left = `${x - ghost.dx + window.scrollX}px`; ghost.el.style.top = `${y - ghost.dy + window.scrollY}px`; };
    const endGhost = () => { ghost?.el.remove(); ghost = null; };
    /** Un conteneur range-t-il ses enfants en ligne (flex en ligne, grille à plusieurs colonnes) ? */
    const isHorizontal = (container: HTMLElement) => {
      const cs = getComputedStyle(container);
      return (cs.display.includes("flex") && !cs.flexDirection.startsWith("column")) || (cs.display.includes("grid") && cs.gridTemplateColumns.split(" ").length > 1);
    };
    const showIndicator = (el: HTMLElement, position: "before" | "after" | "inside", axis: "x" | "y" = "y") => {
      const r = el.getBoundingClientRect();
      const sx = window.scrollX, sy = window.scrollY;
      indicator.style.display = "block";
      if (position === "inside") indicator.style.cssText += `;background:rgba(31,95,139,.12);box-shadow:inset 0 0 0 2px #1F5F8B;left:${r.left + sx}px;top:${r.top + sy}px;width:${r.width}px;height:${r.height}px`;
      else if (axis === "x") indicator.style.cssText += `;background:#1F5F8B;box-shadow:0 0 0 1px #fff;left:${(position === "before" ? r.left : r.right) + sx - 2}px;top:${r.top + sy}px;width:4px;height:${r.height}px`;
      else indicator.style.cssText += `;background:#1F5F8B;box-shadow:0 0 0 1px #fff;left:${r.left + sx}px;top:${(position === "before" ? r.top : r.bottom) + sy - 2}px;width:${r.width}px;height:4px`;
    };
    const hideIndicator = () => { indicator.style.display = "none"; };

    // ---------------------------------------------------------------- barre de bloc (mode Écriture, au survol)
    const TEXT_TYPES: [string, string][] = [["p", "Paragraphe"], ["h1", "Titre 1"], ["h2", "Titre 2"], ["h3", "Titre 3"], ["blockquote", "Citation"]];
    let barEl: HTMLElement | null = null;
    const placeBar = (bar: HTMLElement, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      bar.style.display = "flex";
      const w = bar.offsetWidth * uiScale, h = 34 * uiScale;
      bar.style.left = `${Math.max(4, Math.min(r.right - w, window.innerWidth - w - 4)) + window.scrollX}px`;
      bar.style.top = `${Math.max(2, r.top - h) + window.scrollY}px`;
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
        sel.addEventListener("change", () => send({ type: "atelier:set-tag", id, tag: sel.value }));
        blockBar.appendChild(sel);
        const align = getComputedStyle(el).textAlign;
        // Icônes d'alignement (mêmes tracés que Lucide align-left / align-center / align-right).
        const ICON = {
          left: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`,
          center: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/></svg>`,
          right: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>`,
        };
        ([["left", "Aligner à gauche"], ["center", "Centrer"], ["right", "Aligner à droite"]] as const).forEach(([v, t]) => {
          const x = b("", t, () => send({ type: "atelier:set-style", id, prop: "textAlign", value: (v === "left" && align !== "left") || v !== "left" ? v : undefined }), (align === v || (v === "left" && align === "start")) ? "on" : "");
          x.innerHTML = ICON[v];
          x.style.display = "inline-flex"; x.style.alignItems = "center"; x.style.justifyContent = "center";
        });
      }
      b("Style", "Régler le style en détail (mode Design)", () => send({ type: "atelier:style-in-context", id }));
      const plusBtn = b("", "Insérer un bloc après (menu /)", () => openSlash(el, true));
      plusBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
      plusBtn.style.display = "inline-flex"; plusBtn.style.alignItems = "center"; plusBtn.style.justifyContent = "center";
      const trash = b("", "Supprimer le bloc", () => send({ type: "atelier:remove", id }));
      trash.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
      trash.style.display = "inline-flex"; trash.style.alignItems = "center"; trash.style.justifyContent = "center";
      barEl = el;
      placeBar(blockBar, el);
      // poignée gauche
      grip.innerHTML = "";
      const g = (label: string, title: string, cursor: string) => { const x = document.createElement("button"); x.textContent = label; x.title = title; x.style.cssText = BTN + `;height:20px;min-width:20px;padding:0;font-size:13px;background:var(--atelier-ui-panel,#1a1b1f);border:1px solid var(--atelier-ui-line-strong,#3a3b42);color:#9c9da6;cursor:${cursor}`; x.addEventListener("mousedown", (e) => e.preventDefault()); grip.appendChild(x); return x; };
      const plus = g("+", "Insérer un bloc après (ou tapez / dans un texte)", "pointer");
      plus.style.height = "24px"; plus.style.minWidth = "24px";
      plus.addEventListener("click", (e) => { e.stopPropagation(); openSlash(el, true); });
      const handle = g("⋮⋮", "Glisser pour déplacer le bloc", "grab");
      handle.style.height = "24px"; handle.style.minWidth = "24px";
      handle.addEventListener("mousedown", (e) => { e.preventDefault(); e.stopPropagation(); if (editing) endEdit(true); select(el, true); press = { x: e.clientX, y: e.clientY, el }; });
      const r = el.getBoundingClientRect();
      grip.style.display = "flex";
      // À gauche du bloc s'il y a la place, sinon à l'intérieur de son bord gauche.
      const gw = 28 * uiScale;
      grip.style.left = `${(r.left >= gw + 6 ? r.left - gw : r.left + 4) + window.scrollX}px`;
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
      if (linkRange) return;
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
      const link = document.createElement("button"); link.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`; link.style.display = "inline-flex"; link.style.alignItems = "center"; link.title = "Lien (⌘K) : adresse, ou /page du site"; link.style.cssText = BTN; link.addEventListener("mousedown", (e) => e.preventDefault()); link.addEventListener("click", (e) => { e.stopPropagation(); makeLink(); }); selBar.appendChild(link);
      const r = range.getBoundingClientRect();
      selBar.style.display = "flex";
      const w = selBar.offsetWidth * uiScale;
      selBar.style.left = `${Math.max(4, r.left + r.width / 2 - w / 2) + window.scrollX}px`;
      selBar.style.top = `${Math.max(2, r.top - 38 * uiScale) + window.scrollY}px`;
    };
    let linkRange: Range | null = null;
    /** Le lien se saisit dans la barre de sélection : un champ, les pages du site en suggestion, Entrée pour poser, Échap pour laisser. */
    const makeLink = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      linkRange = sel.getRangeAt(0).cloneRange();
      const current = (sel.anchorNode?.parentElement?.closest("a") as HTMLAnchorElement | null)?.getAttribute("href") ?? "";
      selBar.innerHTML = "";
      const input = document.createElement("input");
      input.type = "text"; input.value = current; input.placeholder = "https://… ou /page-du-site"; input.style.cssText = "width:240px"; input.setAttribute("list", "atelier-pages");
      const list = document.createElement("datalist"); list.id = "atelier-pages";
      pages.forEach((p) => { const o = document.createElement("option"); o.value = p.path; o.label = p.name; list.appendChild(o); });
      const apply = () => {
        const url = input.value.trim();
        const s2 = window.getSelection(); s2?.removeAllRanges(); if (linkRange) s2?.addRange(linkRange);
        if (!url) document.execCommand("unlink");
        else {
          document.execCommand("createLink", false, url);
          const a = window.getSelection()?.anchorNode?.parentElement?.closest("a");
          if (a) a.setAttribute("data-link", JSON.stringify({ kind: "url", url }));
        }
        linkRange = null; renderSelBar();
      };
      const cancel = () => { const s2 = window.getSelection(); s2?.removeAllRanges(); if (linkRange) s2?.addRange(linkRange); linkRange = null; renderSelBar(); };
      input.addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); apply(); } if (e.key === "Escape") { e.preventDefault(); cancel(); } });
      input.addEventListener("mousedown", (e) => e.stopPropagation());
      const ok = document.createElement("button"); ok.textContent = current ? "Modifier" : "Poser le lien"; ok.style.cssText = BTN; ok.addEventListener("mousedown", (e) => e.preventDefault()); ok.addEventListener("click", (e) => { e.stopPropagation(); apply(); });
      selBar.append(input, list, ok);
      if (current) { const rm = document.createElement("button"); rm.textContent = "Retirer"; rm.style.cssText = BTN; rm.addEventListener("mousedown", (e) => e.preventDefault()); rm.addEventListener("click", (e) => { e.stopPropagation(); input.value = ""; apply(); }); selBar.appendChild(rm); }
      selBar.style.display = "flex";
      input.focus(); input.select();
    };

    // ---------------------------------------------------------------- menu « / »
    let slash: { el: HTMLElement; query: string; cursor: number; after: boolean; typed?: boolean } | null = null;
    // Classement : libellé qui commence par la recherche > libellé qui la contient > groupe ou mot-clé.
    const filtered = () => {
      const q = slash?.query.toLowerCase().trim() ?? "";
      if (!q) return blocks;
      const rank = (b: BlockPresetInfo) => {
        const label = b.label.toLowerCase();
        if (label.startsWith(q)) return 0;
        if (label.includes(q)) return 1;
        if (`${b.group} ${b.keywords ?? ""}`.toLowerCase().includes(q)) return 2;
        return -1;
      };
      return blocks.map((b, i) => ({ b, i, r: rank(b) })).filter((x) => x.r >= 0).sort((a, c) => a.r - c.r || a.i - c.i).map((x) => x.b);
    };
    const renderSlash = () => {
      if (!slash) { slashMenu.style.display = "none"; return; }
      const list = filtered();
      slashMenu.innerHTML = `<div class="grp">${slash.query ? `Recherche : ${slash.query}` : "Insérer un bloc — tapez pour filtrer"}</div>`;
      let lastGroup = "";
      list.forEach((b, i) => {
        if (!slash!.query && b.group !== lastGroup) { lastGroup = b.group; const g = document.createElement("div"); g.className = "grp"; g.textContent = b.group; slashMenu.appendChild(g); }
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
    const openSlash = (el: HTMLElement, after: boolean, typed = false) => { slash = { el, query: "", cursor: 0, after, typed }; renderSlash(); };
    /** Retire le « / » tapé juste avant le caret (quand un bloc est choisi). */
    const removeTypedSlash = () => { const sel = document.getSelection(); if (!sel || !sel.isCollapsed) return; sel.modify("extend", "backward", "character"); if (sel.toString() === "/") document.execCommand("delete"); else sel.collapseToEnd(); };
    const closeSlash = () => { slash = null; renderSlash(); };
    const pickSlash = (b: BlockPresetInfo) => {
      if (!slash) return;
      const el = slash.el;
      if (slash.typed) removeTypedSlash();
      const replace = !slash.after && textNodes.has(idOf(el)) && isEmptyText(el);
      closeSlash();
      if (editing === el) endEdit(!replace);
      send({ type: "atelier:slash", id: idOf(el), preset: b.id, replace });
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
      if (content) send({ type: "atelier:text", id: idOf(el), content });
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
      send({ type: "atelier:split", id, before: beforeContent, after: afterContent });
    };
    const caretAtStart = (el: HTMLElement) => { const sel = window.getSelection(); if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return false; const r = document.createRange(); r.selectNodeContents(el); r.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset); return r.toString().length === 0; };

    // ---------------------------------------------------------------- dépôt d'un bloc depuis la palette
    /**
     * Cible d'un dépôt à la position (x, y). Sur un enfant : avant ou après lui. Sur l'espace vide d'un conteneur :
     * la place la plus proche parmi ses enfants (ou dedans s'il est vide) ; ses bords, sur 8 px, visent avant ou après
     * le conteneur lui-même. La place actuelle de l'élément déplacé ne compte pas comme cible.
     */
    const targetAt = (x: number, y: number, exclude?: HTMLElement | null): { el: HTMLElement; id: string; position: "before" | "after" | "inside"; axis: "x" | "y" } | null => {
      const under = document.elementFromPoint(x, y);
      let el = nodeOf(under);
      while (el && exclude && (el === exclude || exclude.contains(el))) el = nodeOf(el.parentElement);
      if (!el) return null;
      // À l'intérieur d'un bouton ou d'un lien, la cible est le bouton lui-même : on dépose avant ou après lui.
      let cur: HTMLElement | null = el;
      while (cur) { if (links.has(idOf(cur))) { el = cur; break; } cur = nodeOf(cur.parentElement); }
      const id = idOf(el);
      const r = el.getBoundingClientRect();
      const kids = [...el.children].filter((c): c is HTMLElement => c instanceof HTMLElement && c.hasAttribute("data-node") && c !== exclude);
      const isSame = (child: HTMLElement, position: "before" | "after") => {
        if (!exclude || exclude.parentElement !== el) return false;
        const sib = [...el.children].filter((c) => c instanceof HTMLElement && c.hasAttribute("data-node")) as HTMLElement[];
        const i = sib.indexOf(exclude);
        return (position === "before" && sib[i + 1] === child) || (position === "after" && sib[i - 1] === child);
      };
      const parentNode = nodeOf(el.parentElement);
      const parentHorizontal = !!parentNode && containers.has(idOf(parentNode)) && isHorizontal(parentNode);
      if (containers.has(id) && !isRoot(el) && !links.has(id)) {
        const edge = 8;
        if (parentHorizontal) {
          if (x < r.left + edge) return { el, id, position: "before", axis: "x" };
          if (x > r.right - edge) return { el, id, position: "after", axis: "x" };
        } else {
          if (y < r.top + edge) return { el, id, position: "before", axis: "y" };
          if (y > r.bottom - edge) return { el, id, position: "after", axis: "y" };
        }
      }
      if (containers.has(id) && !links.has(id)) {
        if (!kids.length) return isRoot(el) ? null : { el, id, position: "inside", axis: "y" };
        const horizontal = isHorizontal(el);
        let best: { child: HTMLElement; position: "before" | "after"; d: number } | null = null;
        // L'élément déplacé entre dans la comparaison : s'il est le plus proche du curseur, la cible est sa propre place.
        let dSelf = Infinity;
        if (exclude && exclude.parentElement === el) {
          const er = exclude.getBoundingClientRect();
          const dx = x < er.left ? er.left - x : x > er.right ? x - er.right : 0;
          const dy = y < er.top ? er.top - y : y > er.bottom ? y - er.bottom : 0;
          dSelf = Math.hypot(dx, dy);
        }
        for (const child of kids) {
          const cr = child.getBoundingClientRect();
          const dx = x < cr.left ? cr.left - x : x > cr.right ? x - cr.right : 0;
          const dy = y < cr.top ? cr.top - y : y > cr.bottom ? y - cr.bottom : 0;
          const d = Math.hypot(dx, dy);
          const position: "before" | "after" = horizontal && dy < cr.height ? (x < cr.left + cr.width / 2 ? "before" : "after") : (y < cr.top + cr.height / 2 ? "before" : "after");
          if (!best || d < best.d) best = { child, position, d };
        }
        if (!best || best.d >= dSelf || isSame(best.child, best.position)) return null;
        return { el: best.child, id: idOf(best.child), position: best.position, axis: horizontal ? "x" : "y" };
      }
      // Feuille : la moitié gauche/droite décide dans une rangée, la moitié haute/basse sinon.
      const position: "before" | "after" = parentHorizontal ? (x < r.left + r.width / 2 ? "before" : "after") : ((y - r.top) / r.height < 0.5 ? "before" : "after");
      if (isSame(el, position)) return null;
      return { el, id, position, axis: parentHorizontal ? "x" : "y" };
    };
    const isBlockDrag = (e: DragEvent) => !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("text/atelier-block");
    const onDragOver = (e: DragEvent) => { if (!isBlockDrag(e)) return; e.preventDefault(); e.dataTransfer!.dropEffect = "copy"; const t = targetAt(e.clientX, e.clientY); if (!t) { hideIndicator(); return; } showIndicator(t.el, t.position, t.axis); };
    const onDragLeave = (e: DragEvent) => { if (!e.relatedTarget) hideIndicator(); };
    const onDrop = (e: DragEvent) => { if (!isBlockDrag(e)) return; e.preventDefault(); hideIndicator(); const preset = e.dataTransfer!.getData("text/atelier-block"); const t = targetAt(e.clientX, e.clientY); if (preset && t) send({ type: "atelier:drop-block", preset, target: t.id, position: t.position }); };

    // ---------------------------------------------------------------- souris
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      if (editing) { if (el !== editing) endEdit(true); else return; }
      if (!el || e.button !== 0) return;
      // Mode Écriture : cliquer un texte y place directement le curseur (sauf le texte d'un bouton ou d'une étiquette : le premier clic désigne l'élément entier).
      if (editMode === "write" && textNodes.has(idOf(el)) && pickedOf(e.target) === el) { startEdit(el); return; }
      // Outil Animation : l'aperçu montre un instant, on y sélectionne seulement (aucun déplacement sur le canevas en v1, cadrage § 4.1).
      if (editMode === "animate") return;
      // Glisser l'élément sélectionné ; un bouton, une carte ou une pastille sélectionnés se glissent aussi en appuyant sur ce qu'ils contiennent.
      const sel = selectedEl();
      if (sel && !isRoot(sel) && (sel === el || (compounds.has(idOf(sel)) && sel.contains(el)))) press = { x: e.clientX, y: e.clientY, el: sel };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (press && !dragging && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 5) {
        dragging = true;
        document.body.style.userSelect = "none";
        document.body.classList.add("atelier-dragging");
        boxOf(press.el).style.opacity = "0.3";
        hideBlockBar();
        startGhost(boxOf(press.el), press.x, press.y);
      }
      if (dragging && press) {
        moveGhost(e.clientX, e.clientY);
        // Au-dessus de sa propre place : aucune cible, relâcher ne change rien.
        const under = document.elementFromPoint(e.clientX, e.clientY);
        if (under && press.el.contains(under)) { target = null; hideIndicator(); return; }
        const t = targetAt(e.clientX, e.clientY, press.el);
        if (!t) { target = null; hideIndicator(); return; }
        target = { id: t.id, position: t.position };
        showIndicator(t.el, t.position, t.axis);
        return;
      }
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      // Le pointillé entoure ce qu'un clic sélectionnerait (le bouton, pas le texte qu'il contient) ; la barre de bloc suit le bloc survolé.
      const picked = pickedOf(e.target);
      if (picked !== hovered) { clear(hovered); hovered = picked; if (picked && idOf(picked) !== selectedId.current && picked !== editing) outline(picked, "hover"); }
      if (el !== barHover) {
        barHover = el;
        if (editMode === "write" && el && !isRoot(el)) {
          // En route vers la poignée, on passe souvent sur le parent : on garde la barre du bloc courant.
          const keep = barEl && el !== barEl && el.contains(barEl) && nearBar(e.clientX, e.clientY);
          if (!keep) renderBlockBar(el);
        }
      }
    };
    const cancelDrag = () => {
      if (!press) return;
      endGhost();
      boxOf(press.el).style.opacity = "";
      document.body.style.userSelect = "";
      document.body.classList.remove("atelier-dragging");
      hideIndicator();
      target = null;
      press = null;
      dragging = false;
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    };
    const onMouseUp = () => {
      if (dragging && press) {
        endGhost();
        boxOf(press.el).style.opacity = "";
        document.body.style.userSelect = "";
        document.body.classList.remove("atelier-dragging");
        hideIndicator();
        if (target) send({ type: "atelier:move", id: idOf(press.el), target: target.id, position: target.position });
        target = null;
        dragging = false;
        suppressClick = true;
        window.setTimeout(() => { suppressClick = false; }, 0);
      } else dragging = false;
      press = null;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      e.preventDefault();
      if (suppressClick || dragging || editing) return;
      // Une image vide, même dans un bouton ou une carte, s'ouvre directement sur la bibliothèque.
      const deepest = nodeOf(e.target);
      let el = deepest?.getAttribute("data-empty") === "image" ? deepest : pickedOf(e.target);
      if (!el) return;
      // ⌥-clic : un niveau au-dessus (le bloc qui contient), et encore au-dessus à chaque ⌥-clic (lot 7, désigner un bloc intermédiaire).
      if (e.altKey) { const chain = chainOf(e.target instanceof Element ? e.target : null); const id = climbSelection(chain.map(idOf), idOf(el), selectedId.current); el = chain.find((c) => idOf(c) === id) ?? el; }
      select(el, true);
      // Une image vide s'ouvre sur la bibliothèque : on choisit ou on importe sans passer par le panneau.
      if (el.getAttribute("data-empty") === "image") send({ type: "atelier:pick-image", id: idOf(el) });
    };
    const onDblClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-atelier-ui]")) return;
      const el = nodeOf(e.target);
      if (!el || !textNodes.has(idOf(el)) || editMode === "animate") return;
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
      // Échap pendant un glissement : on annule, l'élément reste où il était.
      if (dragging && e.key === "Escape") { e.preventDefault(); cancelDrag(); return; }
      if (slash) {
        if (e.key === "Escape") { e.preventDefault(); closeSlash(); return; }
        if (e.key === "Enter") { e.preventDefault(); const b = filtered()[slash.cursor]; if (b) pickSlash(b); return; }
        if (e.key === "ArrowDown") { e.preventDefault(); slash.cursor = Math.min(filtered().length - 1, slash.cursor + 1); renderSlash(); return; }
        if (e.key === "ArrowUp") { e.preventDefault(); slash.cursor = Math.max(0, slash.cursor - 1); renderSlash(); return; }
        if (e.key === "Backspace") { if (!slash.query) { const typed = slash.typed; closeSlash(); if (!typed) e.preventDefault(); return; } e.preventDefault(); slash.query = slash.query.slice(0, -1); slash.cursor = 0; renderSlash(); return; }
        if (e.key.length === 1 && !meta) { e.preventDefault(); slash.query += e.key; slash.cursor = 0; renderSlash(); return; }
        return;
      }
      if (editing) {
        // Échap termine l’édition en gardant le texte (⌘Z pour revenir en arrière) : perdre un paragraphe sur une touche serait trop cruel.
        if (e.key === "Escape") { e.preventDefault(); endEdit(true); return; }
        // Annuler pendant la frappe : d'abord la frappe (navigateur), puis, s'il n'y a plus rien, l'opération précédente d'Atelier.
        if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
          let native = false; try { native = document.queryCommandEnabled("undo"); } catch { native = false; }
          if (!native) { e.preventDefault(); endEdit(true); send({ type: "atelier:key", key: "z", metaKey: e.metaKey, ctrlKey: e.ctrlKey, shiftKey: false, altKey: false }); }
          return;
        }
        if (meta && e.key.toLowerCase() === "b") { e.preventDefault(); document.execCommand("bold"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "i") { e.preventDefault(); document.execCommand("italic"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "u") { e.preventDefault(); document.execCommand("underline"); renderSelBar(); return; }
        if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); makeLink(); return; }
        // Le « / » s'écrit vraiment dans le texte (il reste si on referme le menu avec Échap) ; il est retiré quand un bloc est choisi.
        if (e.key === "/" && editMode === "write" && !meta) { openSlash(editing, false, true); return; }
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (editMode === "write") splitAtCaret(editing); else endEdit(true); return; }
        if (e.key === "Backspace" && editMode === "write" && isEmptyText(editing) && caretAtStart(editing)) { e.preventDefault(); const el = editing; editing = null; el.contentEditable = "false"; el.innerHTML = el.getAttribute("data-original-html") ?? el.innerHTML; el.removeAttribute("data-original-html"); send({ type: "atelier:merge-prev", id: idOf(el) }); return; }
        return;
      }
      if (FORWARDED.has(e.key) || (meta && ["z", "d", "c", "x", "v", "k"].includes(e.key.toLowerCase())) || (e.ctrlKey && e.key.toLowerCase() === "g")) {
        e.preventDefault();
        send({ type: "atelier:key", key: e.key, metaKey: e.metaKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey });
      }
    };
    const onFocusOut = (e: FocusEvent) => { if (linkRange) return; if (editing && e.target === editing && !(e.relatedTarget as Element | null)?.closest?.("[data-atelier-ui]")) window.setTimeout(() => { if (editing === e.target) endEdit(true); }, 0); };
    const onSelectionChange = () => { renderSelBar(); };

    // ---------------------------------------------------------------- messages de l'éditeur
    const onMessage = (e: MessageEvent) => {
      if (!isAtelierMessage(e)) return;
      const m = e.data as ToPreview;
      if (m?.type === "atelier:site" && m.site) {
        setSite(m.site);

        if (m.containers) containers = new Set(m.containers);
        if (m.pages) pages = m.pages;
        if ((m as { links?: string[] }).links) links = new Set((m as { links?: string[] }).links);
        if (m.textNodes) textNodes = new Set(m.textNodes);
        if (m.compounds) compounds = new Set(m.compounds);
        if (m.blocks) blocks = m.blocks;
        if (m.editMode) editMode = m.editMode;
      }
      if (m?.type === "atelier:entries" && Array.isArray((m as { entries?: Entry[] }).entries)) setEntriesState((m as { entries: Entry[] }).entries);
      if (m?.type === "atelier:editmode" && m.editMode) { editMode = m.editMode; if (editing) endEdit(true); hideBlockBar(); clear(hovered); hovered = null; }
      if (m?.type === "atelier:zoom") { const z = Number((m as { scale?: number }).scale); uiScale = z > 0 && z < 1 ? Math.min(1 / z, 2.2) : 1; applyUiScale(); }
      if (m?.type === "atelier:mode" && m.mode) setModeState(m.mode);
      if (m?.type === "atelier:scrub") { lastScrub.current = { id: m.id, trigger: m.trigger, time: m.time }; applyScrub(document, lastScrub.current); }
      if (m?.type === "atelier:scrub-stop") { lastScrub.current = null; applyScrub(document, null); }
      if (m?.type === "atelier:play") {
        // Rejoue une fois l'animation d'un déclencheur sur ses cibles (API Web Animations, via l'outil partagé avec le site), même si le CSS de l'éditeur laisse les animations à l'arrêt.
        const el = animationHost(document, m.id) as HTMLElement | null;
        let triggers: { i: string; loop: number | "infinite" }[] = [];
        try { triggers = JSON.parse(el?.getAttribute("data-anim") ?? "[]"); } catch { triggers = []; }
        const a = triggers.find((r) => r.i === m.trigger);
        const play = (window as unknown as { __atelierPlay?: (host: HTMLElement, trigger: unknown, extra: Record<string, unknown>) => unknown }).__atelierPlay;
        if (el && a && play) play(el, a, playOptions(a));
      }
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
    send({ type: "atelier:ready" });
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
  // Dans l'éditeur, une page par entrée sans entrée publiée se dessine quand même : `/__template/<page>` la rend sans entrée, les textes liés montrent leur repli.
  const templateOnly = editor ? path.match(/^\/__template\/([^/]+)$/)?.[1] : undefined;
  const templatePage = templateOnly ? site.pages.find((p) => p.id === templateOnly) : undefined;
  const match = templatePage ? { page: templatePage, entry: undefined, params: {} } : matchPath(site, data, path);
  if (!match) return <p style={{ padding: 24, fontFamily: "system-ui", color: "#777" }}>{editor ? "Chargement de la page…" : `Page introuvable : ${path}`}</p>;
  const ctx: RenderContext = { site, page: match.page, entry: match.entry, params: match.params, locale: site.settings.defaultLocale, data, assets, basePath: `/preview/${site.id}`, editor, deferScripts: !editor };
  const fonts = fontsHref(site.theme);
  return (
    <>
      {fonts ? <link rel="stylesheet" href={fonts} /> : null}
      <PageCss site={site} pageId={match.page.id} />
      {editor ? <style dangerouslySetInnerHTML={{ __html: EDITOR_CSS }} /> : null}
      <RenderPage ctx={ctx} mode={modeState} />
    </>
  );
}
