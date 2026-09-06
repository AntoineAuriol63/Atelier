"use client";

import { useEffect, useMemo, useState } from "react";
import type { Entry, Site } from "@atelier/model";
import { RenderPage, assetMap, matchPath, memoryData, siteCss, type RenderContext } from "@atelier/renderer";

type Props = { initialSite: Site; entries: Entry[]; path: string; mode?: string; editor: boolean };

/**
 * Aperçu vivant : rendu côté serveur au premier chargement, puis mis à jour par l'éditeur
 * (message `atelier:site`) sans rechargement. En mode éditeur, gère la sélection au clic.
 */
export function LivePreview({ initialSite, entries, path, mode, editor }: Props) {
  const [site, setSite] = useState(initialSite);
  const [modeState, setModeState] = useState(mode ?? initialSite.theme.defaultMode);
  const data = useMemo(() => memoryData(entries), [entries]);

  useEffect(() => {
    if (!editor) return;
    let selected: HTMLElement | null = null;
    let hovered: HTMLElement | null = null;
    const nodeOf = (t: EventTarget | null) => (t instanceof Element ? (t.closest("[data-node]") as HTMLElement | null) : null);
    const outline = (el: HTMLElement | null, kind: "selected" | "hover") => { if (!el) return; el.style.outline = kind === "selected" ? "2px solid #1F5F8B" : "1px dashed #1F5F8B"; el.style.outlineOffset = "-1px"; };
    const clear = (el: HTMLElement | null) => { if (el && el !== selected) el.style.outline = ""; };
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      const el = nodeOf(e.target);
      if (!el) return;
      if (selected) selected.style.outline = "";
      selected = el; outline(el, "selected");
      parent.postMessage({ type: "atelier:select", id: el.getAttribute("data-node") }, "*");
    };
    const onOver = (e: MouseEvent) => { const el = nodeOf(e.target); if (el !== hovered) { clear(hovered); hovered = el; if (el && el !== selected) outline(el, "hover"); } };
    const onOut = (e: MouseEvent) => { if (!nodeOf(e.relatedTarget)) { clear(hovered); hovered = null; } };
    const onMessage = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string | null; mode?: string; site?: Site };
      if (m?.type === "atelier:site" && m.site) setSite(m.site);
      if (m?.type === "atelier:mode" && m.mode) setModeState(m.mode);
      if (m?.type === "atelier:highlight") {
        if (selected) selected.style.outline = "";
        selected = m.id ? document.querySelector<HTMLElement>(`[data-node="${m.id}"]`) : null;
        if (selected) { outline(selected, "selected"); selected.scrollIntoView({ block: "nearest" }); }
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("message", onMessage);
    parent.postMessage({ type: "atelier:ready" }, "*");
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("message", onMessage);
    };
  }, [editor]);

  const match = matchPath(site, data, path);
  if (!match) return <p style={{ padding: 24, fontFamily: "system-ui" }}>Page introuvable : {path}</p>;
  const ctx: RenderContext = { site, page: match.page, entry: match.entry, params: match.params, locale: site.settings.defaultLocale, data, assets: assetMap(site), basePath: "/preview", editor };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss(site) }} />
      <RenderPage ctx={ctx} mode={modeState} />
    </>
  );
}
