"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, FileText, Layers, Moon, Plus, Redo2, Sun, Undo2, UploadCloud } from "lucide-react";
import type { Node, Page, Site } from "@atelier/model";
import { indexSite } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import { PRODUCT_NAME } from "@/lib/product";
import { Badge, Button, Hint, IconButton, Panel, PanelHeading, Separator, Tabs, TreeRow } from "@/ui";
import { NodeInspector } from "./NodeInspector";
import { nodeIcon, nodeLabel } from "./node-icons";

const WIDTHS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: null },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];

const MODES = [
  { id: "write", label: "Écriture", hint: "Bientôt" },
  { id: "design", label: "Design" },
  { id: "code", label: "Code", hint: "Bientôt" },
];

function Layer({ node, depth, selected, onSelect, openMap, setOpen }: { node: Node; depth: number; selected: string | null; onSelect: (id: string) => void; openMap: Record<string, boolean>; setOpen: (id: string, open: boolean) => void }) {
  const kids = node.children ?? [];
  const open = openMap[node.id] ?? depth < 2;
  return (
    <div role="group">
      <TreeRow
        depth={depth}
        label={nodeLabel(node)}
        meta={node.type === "instance" ? "composant" : undefined}
        icon={nodeIcon(node)}
        selected={selected === node.id}
        open={open}
        hasChildren={kids.length > 0}
        onToggle={() => setOpen(node.id, !open)}
        onSelect={() => onSelect(node.id)}
        dimmed={node.hidden?.base === true}
      />
      {open && kids.map((k) => <Layer key={k.id} node={k} depth={depth + 1} selected={selected} onSelect={onSelect} openMap={openMap} setOpen={setOpen} />)}
    </div>
  );
}

const STATUS: Record<string, { label: string; tone: "success" | "neutral" | "danger" | "warning" }> = {
  saved: { label: "Enregistré", tone: "success" },
  saving: { label: "Enregistrement…", tone: "neutral" },
  conflict: { label: "Conflit", tone: "danger" },
  error: { label: "Erreur", tone: "danger" },
};

export function EditorShell({ initialSite, initialVersion }: { initialSite: Site; initialVersion: number }) {
  const doc = useDocument(initialSite, initialVersion);
  const site = doc.site;
  const [pageId, setPageId] = useState(site.pages[0]!.id);
  const [leftTab, setLeftTab] = useState("layers");
  const [width, setWidth] = useState<string>("base");
  const [mode, setMode] = useState(site.theme.defaultMode);
  const [selected, setSelected] = useState<string | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const frame = useRef<HTMLIFrameElement>(null);
  const page: Page = site.pages.find((p) => p.id === pageId) ?? site.pages[0]!;
  const index = useMemo(() => indexSite(site), [site]);
  const selectedLoc = selected ? index.get(selected) : undefined;
  const locale = site.settings.defaultLocale;

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

  useEffect(() => { if (frameReady) post({ type: "atelier:site", site }); }, [site, frameReady]);
  useEffect(() => { if (frameReady) post({ type: "atelier:mode", mode }); }, [mode, frameReady]);
  useEffect(() => { if (frameReady) post({ type: "atelier:highlight", id: selected }); }, [selected, frameReady]);

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
  const status = STATUS[doc.status] ?? STATUS.saved!;

  return (
    <div className="h-full grid grid-rows-[40px_1fr] grid-cols-[264px_1fr_300px]">
      {/* Barre supérieure */}
      <header className="col-span-3 flex items-center gap-2 px-3 border-b border-line bg-panel">
        <span className="font-semibold text-base tracking-tight text-ink">{PRODUCT_NAME}</span>
        <Separator vertical />
        <span className="text-sm text-muted truncate max-w-[200px]" title={site.name}>{site.name}</span>
        <span className="text-dim">/</span>
        <span className="text-sm text-ink truncate max-w-[160px]">{page.name[locale]}</span>

        <div className="ml-4">
          <Tabs variant="pill" tabs={MODES.map((m) => ({ ...m, disabled: m.id !== "design" }))} value="design" onChange={() => {}} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Tabs variant="pill" tabs={WIDTHS.map((x) => ({ id: x.id, label: x.label }))} value={width} onChange={setWidth} />
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            <IconButton label="Annuler (⌘Z)" icon={Undo2} disabled={!doc.canUndo} onClick={doc.undo} />
            <IconButton label="Rétablir (⇧⌘Z)" icon={Redo2} disabled={!doc.canRedo} onClick={doc.redo} />
          </div>
          <Badge tone={status.tone} title={doc.error ?? `Version ${doc.version}`}>{status.label} · v{doc.version}</Badge>
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            {site.theme.modes.map((m) => (
              <IconButton key={m.id} label={`Aperçu en mode ${m.name.toLowerCase()}`} icon={m.id === "dark" ? Moon : Sun} active={mode === m.id} onClick={() => setMode(m.id)} />
            ))}
          </div>
          <Separator vertical />
          <Button variant="ghost" icon={ExternalLink} onClick={() => window.open(previewPath, "_blank")}>Aperçu</Button>
          <Button variant="primary" icon={UploadCloud} disabled title="Publication : jalon M6">Publier</Button>
        </div>
      </header>

      {/* Panneau gauche */}
      <Panel side="left">
        <Tabs
          tabs={[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }]}
          value={leftTab}
          onChange={setLeftTab}
          className="px-1 shrink-0"
        />
        <div className="flex-1 overflow-auto py-1">
          {leftTab === "pages" ? (
            <ul>
              {site.pages.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => { setPageId(p.id); setSelected(null); setFrameReady(false); setLeftTab("layers"); }}
                    className={`w-full flex items-center gap-2 h-[28px] px-3 text-sm text-left ${p.id === pageId ? "bg-accent-soft text-ink" : "text-ink hover:bg-hover"}`}
                  >
                    <FileText size={13} className={p.id === pageId ? "text-accent" : "text-muted"} aria-hidden />
                    <span className="truncate">{p.name[locale]}</span>
                    <span className="ml-auto font-mono text-2xs text-dim truncate max-w-[45%]">{p.kind === "template" ? "modèle" : p.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : leftTab === "layers" ? (
            <div role="tree">
              <Layer node={page.root} depth={0} selected={selected} onSelect={setSelected} openMap={openMap} setOpen={(id, open) => setOpenMap((m) => ({ ...m, [id]: open }))} />
            </div>
          ) : (
            <div className="px-3 py-2 flex flex-col gap-2">
              <PanelHeading className="px-0">Ajouter un bloc</PanelHeading>
              <Hint>La palette d&apos;insertion arrive au jalon M2 : boîte, texte, image, lien, liste, colonnes, section, vue de base de données, formulaire, composant.</Hint>
            </div>
          )}
        </div>
      </Panel>

      {/* Canvas */}
      <main className="relative overflow-auto bg-app flex justify-center items-start p-5">
        {doc.error ? <div className="fixed top-12 left-1/2 -translate-x-1/2 z-10 rounded-sm bg-danger-soft text-danger border border-danger/40 px-3 py-1.5 text-xs shadow-lg">{doc.error}</div> : null}
        <div className="flex flex-col items-center gap-1.5" style={{ width: w ? `${w}px` : "100%", maxWidth: "100%" }}>
          <div className="self-start text-2xs text-dim font-mono">{w ? `${w} px` : "largeur du panneau"} · {page.path}</div>
          <iframe
            ref={frame}
            key={previewPath}
            src={`${previewPath}?editor=1&mode=${mode}`}
            title="Aperçu"
            className="bg-white rounded-xs shadow-[0_0_0_1px_var(--color-line-strong),0_12px_40px_rgba(0,0,0,.45)]"
            style={{ width: "100%", height: "calc(100vh - 40px - 40px - 18px)" }}
          />
        </div>
      </main>

      {/* Panneau droit */}
      <Panel side="right">
        {selectedLoc ? (
          <div className="flex-1 overflow-auto">
            <NodeInspector key={selectedLoc.node.id} site={site} loc={selectedLoc} commit={doc.commit} onDeleted={() => setSelected(null)} />
          </div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            <PanelHeading className="px-0">Sélection</PanelHeading>
            <Hint>Cliquez un élément dans l&apos;aperçu ou dans les calques pour voir et modifier ses réglages.</Hint>
          </div>
        )}
      </Panel>
    </div>
  );
}
