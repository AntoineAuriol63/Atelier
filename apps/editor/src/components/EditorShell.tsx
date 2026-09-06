"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Node, Page, Site } from "@atelier/model";
import { indexSite } from "@atelier/model";

const WIDTHS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: null },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];

function nodeLabel(n: Node): string {
  if (n.name) return n.name;
  const tag = typeof n.props.tag === "string" ? n.props.tag : undefined;
  const t: Record<string, string> = { box: "Boîte", text: "Texte", image: "Image", link: "Lien", collection: "Collection", item: "Élément", instance: "Composant", form: "Formulaire", field: "Champ", list: "Liste", listItem: "Élément", divider: "Séparateur", video: "Vidéo", icon: "Icône", embed: "Intégration", slot: "Emplacement", code: "Code" };
  if (n.type === "text" && tag) return tag.toUpperCase();
  return t[n.type] ?? n.type;
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

export function EditorShell({ site }: { site: Site }) {
  const [pageId, setPageId] = useState(site.pages[0]!.id);
  const [width, setWidth] = useState<string>("base");
  const [mode, setMode] = useState(site.theme.defaultMode);
  const [selected, setSelected] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const page: Page = site.pages.find((p) => p.id === pageId) ?? site.pages[0]!;
  const index = useMemo(() => indexSite(site), [site]);
  const selectedNode = selected ? index.get(selected)?.node : undefined;

  // Une page de modèle se prévisualise avec sa première entrée.
  const previewPath = page.kind === "template" ? "/preview/projets/lea-et-tom" : `/preview${page.path === "/" ? "" : page.path}`;

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string };
      if (m?.type === "atelier:select" && m.id) setSelected(m.id);
      if (m?.type === "atelier:ready") frame.current?.contentWindow?.postMessage({ type: "atelier:mode", mode }, "*");
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [mode]);

  useEffect(() => { frame.current?.contentWindow?.postMessage({ type: "atelier:highlight", id: selected }, "*"); }, [selected]);
  useEffect(() => { frame.current?.contentWindow?.postMessage({ type: "atelier:mode", mode }, "*"); }, [mode]);

  const w = WIDTHS.find((x) => x.id === width)?.width ?? null;

  return (
    <div className="h-full grid grid-rows-[44px_1fr] grid-cols-[260px_1fr_300px]">
      <header className="col-span-3 flex items-center gap-4 px-4 border-b border-neutral-200 bg-white text-sm">
        <span className="font-semibold tracking-tight">Atelier</span>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-600">{site.name}</span>
        <span className="text-neutral-300 text-xs ml-1">v0 · fondations</span>
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
              <button onClick={() => { setPageId(p.id); setSelected(null); }} className={`w-full text-left px-2 py-1 rounded text-[13px] ${p.id === pageId ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
                {p.name[site.settings.defaultLocale]} <span className={`font-mono text-[10px] ${p.id === pageId ? "text-neutral-400" : "text-neutral-400"}`}>{p.path}</span>
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
        {selectedNode ? (
          <div className="px-3 pb-4 space-y-3">
            <div>
              <div className="font-medium">{nodeLabel(selectedNode)}</div>
              <div className="text-neutral-400 font-mono text-[11px]">{selectedNode.type} · {selectedNode.id}</div>
            </div>
            {selectedNode.style?.shared?.length ? (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Styles partagés</div>
                <div className="flex flex-wrap gap-1">{selectedNode.style.shared.map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-100 text-[11px]">{site.sharedStyles.find((x) => x.id === s)?.name ?? s}</span>)}</div>
              </div>
            ) : null}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Style local</div>
              <pre className="text-[11px] bg-neutral-50 rounded p-2 overflow-auto max-h-64 whitespace-pre-wrap">{JSON.stringify({ base: selectedNode.style?.base ?? {}, breakpoints: selectedNode.style?.breakpoints ?? {}, states: selectedNode.style?.states ?? {} }, null, 1)}</pre>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Propriétés</div>
              <pre className="text-[11px] bg-neutral-50 rounded p-2 overflow-auto max-h-48 whitespace-pre-wrap">{JSON.stringify(selectedNode.props, null, 1)}</pre>
            </div>
          </div>
        ) : (
          <p className="px-3 py-2 text-neutral-400 text-[13px]">Cliquez un élément dans l&apos;aperçu ou un calque.</p>
        )}
      </aside>
    </div>
  );
}
