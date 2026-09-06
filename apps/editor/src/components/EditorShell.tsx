"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Node, Page, Site } from "@atelier/model";
import { indexSite } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import { NodeInspector } from "./NodeInspector";

const WIDTHS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: null },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];

const TYPE_LABEL: Record<string, string> = { box: "Boîte", text: "Texte", image: "Image", link: "Lien", collection: "Collection", item: "Élément", instance: "Composant", form: "Formulaire", field: "Champ", list: "Liste", listItem: "Élément", divider: "Séparateur", video: "Vidéo", icon: "Icône", embed: "Intégration", slot: "Emplacement", code: "Code" };

export function nodeLabel(n: Node): string {
  if (n.name) return n.name;
  const tag = typeof n.props.tag === "string" ? n.props.tag : undefined;
  if (n.type === "text" && tag) return tag.toUpperCase();
  return TYPE_LABEL[n.type] ?? n.type;
}

function Layer({ node, depth, selected, onSelect }: { node: Node; depth: number; selected: string | null; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(depth < 2);
  const kids = node.children ?? [];
  const isSel = selected === node.id;
  return (
    <div>
      <div
        className={`flex items-center gap-1 pr-2 py-[3px] text-[12.5px] rounded cursor-default select-none ${isSel ? "bg-sky-100 text-sky-900" : "hover:bg-neutral-100"}`}
        style={{ paddingLeft: 6 + depth * 12 }}
        onClick={() => onSelect(node.id)}
      >
        <button className="w-4 text-neutral-400 text-[10px]" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} aria-label={open ? "Replier" : "Déplier"}>
          {kids.length ? (open ? "▾" : "▸") : ""}
        </button>
        <span className="text-neutral-400 font-mono text-[10px] w-9 shrink-0">{node.type}</span>
        <span className="truncate">{nodeLabel(node)}</span>
      </div>
      {open && kids.map((k) => <Layer key={k.id} node={k} depth={depth + 1} selected={selected} onSelect={onSelect} />)}
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = { saved: "Enregistré", saving: "Enregistrement…", conflict: "Conflit", error: "Erreur" };

export function EditorShell({ initialSite, initialVersion }: { initialSite: Site; initialVersion: number }) {
  const doc = useDocument(initialSite, initialVersion);
  const site = doc.site;
  const [pageId, setPageId] = useState(site.pages[0]!.id);
  const [width, setWidth] = useState<string>("base");
  const [mode, setMode] = useState(site.theme.defaultMode);
  const [selected, setSelected] = useState<string | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const page: Page = site.pages.find((p) => p.id === pageId) ?? site.pages[0]!;
  const index = useMemo(() => indexSite(site), [site]);
  const selectedLoc = selected ? index.get(selected) : undefined;

  const previewPath = page.kind === "template" ? "/preview/projets/lea-et-tom" : `/preview${page.path === "/" ? "" : page.path}`;
  const post = (msg: unknown) => frame.current?.contentWindow?.postMessage(msg, "*");

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string };
      if (m?.type === "atelier:select" && m.id) setSelected(m.id);
      if (m?.type === "atelier:ready") setFrameReady(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // L'aperçu reçoit le site courant dès qu'il est prêt et à chaque modification.
  useEffect(() => { if (frameReady) post({ type: "atelier:site", site }); }, [site, frameReady]);
  useEffect(() => { if (frameReady) post({ type: "atelier:mode", mode }); }, [mode, frameReady]);
  useEffect(() => { if (frameReady) post({ type: "atelier:highlight", id: selected }); }, [selected, frameReady]);

  // Raccourcis : Cmd/Ctrl+Z annule, Cmd/Ctrl+Maj+Z rétablit.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return;
      e.preventDefault();
      if (e.shiftKey) doc.redo(); else doc.undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc]);

  const w = WIDTHS.find((x) => x.id === width)?.width ?? null;

  return (
    <div className="h-full grid grid-rows-[44px_1fr] grid-cols-[260px_1fr_320px]">
      <header className="col-span-3 flex items-center gap-3 px-4 border-b border-neutral-200 bg-white text-sm">
        <span className="font-semibold tracking-tight">Atelier</span>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-600 truncate max-w-[220px]">{site.name}</span>
        <div className="flex items-center gap-1 border-l border-neutral-200 pl-3">
          <button className="btn" disabled={!doc.canUndo} onClick={doc.undo} title="Annuler (⌘Z)">↶ Annuler</button>
          <button className="btn" disabled={!doc.canRedo} onClick={doc.redo} title="Rétablir (⇧⌘Z)">↷ Rétablir</button>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${doc.status === "saved" ? "text-emerald-700 bg-emerald-50" : doc.status === "saving" ? "text-neutral-500 bg-neutral-100" : "text-red-700 bg-red-50"}`} title={doc.error}>
          {STATUS_LABEL[doc.status]} · v{doc.version}
        </span>
        <div className="ml-auto flex items-center gap-1">
          {["Écriture", "Design", "Code"].map((m, i) => (
            <button key={m} className={`px-3 py-1 rounded text-xs ${i === 1 ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`} title="Modes : bientôt">{m}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 border-l border-neutral-200 pl-3">
          {WIDTHS.map((x) => (
            <button key={x.id} onClick={() => setWidth(x.id)} className={`px-2 py-1 rounded text-xs ${width === x.id ? "bg-neutral-200" : "text-neutral-500 hover:bg-neutral-100"}`}>{x.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 border-l border-neutral-200 pl-3">
          {site.theme.modes.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)} className={`px-2 py-1 rounded text-xs ${mode === m.id ? "bg-neutral-200" : "text-neutral-500 hover:bg-neutral-100"}`}>{m.name}</button>
          ))}
        </div>
      </header>

      <aside className="border-r border-neutral-200 bg-white overflow-auto text-sm">
        <div className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-wider text-neutral-400">Pages</div>
        <ul className="px-2">
          {site.pages.map((p) => (
            <li key={p.id}>
              <button onClick={() => { setPageId(p.id); setSelected(null); setFrameReady(false); }} className={`w-full text-left px-2 py-1 rounded text-[13px] ${p.id === pageId ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
                {p.name[site.settings.defaultLocale]} <span className="font-mono text-[10px] text-neutral-400">{p.path}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-wider text-neutral-400">Calques</div>
        <div className="px-1 pb-4">
          <Layer node={page.root} depth={0} selected={selected} onSelect={setSelected} />
        </div>
      </aside>

      <main className="overflow-auto bg-neutral-200/70 flex justify-center items-start p-6">
        {doc.error ? <div className="fixed top-14 left-1/2 -translate-x-1/2 z-10 bg-red-50 text-red-800 border border-red-200 rounded px-3 py-2 text-xs shadow">{doc.error}</div> : null}
        <iframe
          ref={frame}
          key={previewPath}
          src={`${previewPath}?editor=1&mode=${mode}`}
          title="Aperçu"
          className="bg-white shadow-lg rounded-sm border border-neutral-300"
          style={{ width: w ? `${w}px` : "100%", flex: "0 0 auto", height: "calc(100vh - 44px - 48px)", maxWidth: "100%" }}
        />
      </main>

      <aside className="border-l border-neutral-200 bg-white overflow-auto text-sm">
        <div className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-wider text-neutral-400">Sélection</div>
        {selectedLoc ? (
          <NodeInspector key={selectedLoc.node.id} site={site} loc={selectedLoc} commit={doc.commit} onDeleted={() => setSelected(null)} />
        ) : (
          <p className="px-3 py-2 text-neutral-400 text-[13px]">Cliquez un élément dans l&apos;aperçu ou un calque.</p>
        )}
      </aside>
    </div>
  );
}
