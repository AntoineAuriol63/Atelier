"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { ExternalLink, FileText, Layers, Moon, Plus, Redo2, Sun, Undo2, UploadCloud } from "lucide-react";
import type { DropPosition, Node, Page, Site } from "@atelier/model";
import { cloneWithNewIds, indexSite, newId, planInsert, planMove } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import { PRODUCT_NAME } from "@/lib/product";
import type { BlockPreset } from "@/lib/blocks";
import { Badge, Button, Hint, IconButton, NumberInput, Panel, PanelHeading, Separator, Tabs, TreeRow, type DropIndicator } from "@/ui";
import { NodeInspector } from "./NodeInspector";
import { AddPanel } from "./AddPanel";
import { nodeIcon, nodeLabel } from "./node-icons";

const PRESETS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: null },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];
const MODES = [{ id: "write", label: "Écriture", hint: "Bientôt" }, { id: "design", label: "Design" }, { id: "code", label: "Code", hint: "Bientôt" }];
const MIN_WIDTH = 320;

type DropState = { id: string; position: DropPosition } | null;

function dropPositionFor(e: DragEvent, canInside: boolean): DropPosition {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const y = (e.clientY - r.top) / r.height;
  if (canInside) return y < 0.25 ? "before" : y > 0.75 ? "after" : "inside";
  return y < 0.5 ? "before" : "after";
}

function Layer(p: {
  node: Node; depth: number; selected: string | null; onSelect: (id: string) => void;
  openMap: Record<string, boolean>; setOpen: (id: string, open: boolean) => void;
  editing: string | null; onEditStart: (id: string) => void; onRename: (id: string, name: string | null | undefined) => void;
  drop: DropState; onDragStart: (id: string) => void; onDragOver: (id: string, pos: DropPosition) => void; onDragEnd: () => void; onDropOn: (id: string, pos: DropPosition) => void;
}) {
  const { node, depth } = p;
  const kids = node.children ?? [];
  const open = p.openMap[node.id] ?? depth < 2;
  const canInside = kids.length > 0 || ["box", "list", "listItem", "link", "form", "item", "slot"].includes(node.type);
  const indicator: DropIndicator = p.drop?.id === node.id ? p.drop.position : null;
  return (
    <div role="group">
      <TreeRow
        id={node.id}
        depth={depth}
        label={nodeLabel(node)}
        meta={node.type === "instance" ? "composant" : undefined}
        icon={nodeIcon(node)}
        selected={p.selected === node.id}
        open={open}
        hasChildren={kids.length > 0}
        onToggle={() => p.setOpen(node.id, !open)}
        onSelect={() => p.onSelect(node.id)}
        dimmed={node.hidden?.base === true}
        editing={p.editing === node.id}
        onEditStart={() => p.onEditStart(node.id)}
        onRename={(name) => p.onRename(node.id, name)}
        draggable={depth > 0}
        drop={indicator}
        onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", node.id); p.onDragStart(node.id); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = "move"; p.onDragOver(node.id, dropPositionFor(e, canInside)); }}
        onDragLeave={(e) => { e.stopPropagation(); }}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); p.onDropOn(node.id, dropPositionFor(e, canInside)); p.onDragEnd(); }}
      />
      {open && kids.map((k) => <Layer key={k.id} {...p} node={k} depth={depth + 1} />)}
    </div>
  );
}

const STATUS: Record<string, { label: string; tone: "success" | "neutral" | "danger" | "warning" }> = {
  saved: { label: "Enregistré", tone: "success" }, saving: { label: "Enregistrement…", tone: "neutral" },
  conflict: { label: "Conflit", tone: "danger" }, error: { label: "Erreur", tone: "danger" },
};

function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}

export function EditorShell({ initialSite, initialVersion }: { initialSite: Site; initialVersion: number }) {
  const doc = useDocument(initialSite, initialVersion);
  const site = doc.site;
  const [pageId, setPageId] = useState(site.pages[0]!.id);
  const [leftTab, setLeftTab] = useState("layers");
  const [preset, setPreset] = useState<string>("base");
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [measured, setMeasured] = useState<number>(0);
  const [mode, setMode] = useState(site.theme.defaultMode);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [drop, setDrop] = useState<DropState>(null);
  const [notice, setNotice] = useState<{ text: string; tone: "danger" | "success" } | null>(null);
  const dragId = useRef<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const canvas = useRef<HTMLElement>(null);
  const page: Page = site.pages.find((p) => p.id === pageId) ?? site.pages[0]!;
  const index = useMemo(() => indexSite(site), [site]);
  const selectedLoc = selected ? index.get(selected) : undefined;
  const locale = site.settings.defaultLocale;

  /** Sélectionne un nœud, ouvre ses ancêtres dans les calques et fait défiler jusqu'à lui. */
  const select = useCallback((id: string | null) => {
    setSelected(id);
    if (!id) return;
    const ancestors: string[] = [];
    let cur = index.get(id)?.parent ?? null;
    while (cur) { ancestors.push(cur.id); cur = index.get(cur.id)?.parent ?? null; }
    if (ancestors.length) setOpenMap((m) => { const n = { ...m }; ancestors.forEach((a) => { n[a] = true; }); return n; });
    window.requestAnimationFrame(() => document.querySelector(`[data-row-id="${id}"]`)?.scrollIntoView({ block: "nearest" }));
  }, [index]);

  const previewPath = page.kind === "template" ? "/preview/projets/lea-et-tom" : `/preview${page.path === "/" ? "" : page.path}`;
  const post = useCallback((msg: unknown) => frame.current?.contentWindow?.postMessage(msg, "*"), []);

  const notify = useCallback((text: string, tone: "danger" | "success" = "danger") => {
    setNotice({ text, tone });
    window.setTimeout(() => setNotice((n) => (n?.text === text ? null : n)), 2800);
  }, []);

  // --- déplacement (calques et canvas) et insertion
  const moveNode = useCallback((id: string, targetId: string, position: DropPosition) => {
    const r = planMove(index, id, targetId, position);
    if (!r.ok) { notify(r.reason); return; }
    doc.commit({ op: "node.move", id, to: r.to }, { label: "Déplacer" });
    select(id);
  }, [index, doc, notify, select]);

  const addBlock = useCallback((preset: BlockPreset) => {
    const node = preset.make(site);
    const to = planInsert(index, page.root, selected);
    doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node }, { label: `Ajouter ${preset.label}` });
    setOpenMap((m) => ({ ...m, [to.parent]: true }));
    select(node.id);
  }, [site, index, page.root, selected, doc, select]);

  const insertTarget = useMemo(() => {
    const to = planInsert(index, page.root, selected);
    const parent = index.get(to.parent)?.node;
    const sel = selected ? index.get(selected)?.node : undefined;
    if (!sel) return "Sera ajouté à la fin de la page.";
    if (parent && parent.id === sel.id) return `Sera ajouté dans « ${nodeLabel(sel)} ».`;
    return `Sera ajouté après « ${nodeLabel(sel)} ».`;
  }, [index, page.root, selected]);

  // --- messages de l'aperçu
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const m = e.data as { type?: string; id?: string; target?: string; position?: DropPosition };
      if (m?.type === "atelier:select" && m.id) select(m.id);
      if (m?.type === "atelier:ready") setFrameReady(true);
      if (m?.type === "atelier:move" && m.id && m.target && m.position) moveNode(m.id, m.target, m.position);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [moveNode, select]);

  useEffect(() => { if (frameReady) post({ type: "atelier:site", site, containers: [...index.values()].filter((l) => ["box", "list", "listItem", "link", "form", "item", "slot"].includes(l.node.type)).map((l) => l.node.id) }); }, [site, index, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:mode", mode }); }, [mode, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:highlight", id: selected }); }, [selected, frameReady, post]);

  // --- raccourcis clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) doc.redo(); else doc.undo(); return; }
      if (isTyping()) return;
      const loc = selected ? index.get(selected) : undefined;
      if (e.key === "Escape") { select(null); return; }
      if (!loc) return;
      if (meta && e.key.toLowerCase() === "d") { e.preventDefault(); if (!loc.parent) return; const { node: copy } = cloneWithNewIds(loc.node, newId); doc.commit({ op: "node.insert", parent: loc.parent.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); select(copy.id); return; }
      if ((e.key === "Backspace" || e.key === "Delete") && loc.parent) { e.preventDefault(); doc.commit({ op: "node.remove", id: loc.node.id }, { label: "Supprimer" }); select(loc.parent.id); return; }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const rows = [...document.querySelectorAll<HTMLElement>("[data-row-id]")].map((r) => r.dataset.rowId!);
        const i = rows.indexOf(loc.node.id);
        const next = rows[e.key === "ArrowUp" ? i - 1 : i + 1];
        if (next) select(next);
        return;
      }
      if (e.key === "ArrowLeft") { e.preventDefault(); const open = openMap[loc.node.id] ?? loc.depth < 2; if (open && loc.node.children?.length) setOpenMap((m) => ({ ...m, [loc.node.id]: false })); else if (loc.parent) select(loc.parent.id); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); const kids = loc.node.children ?? []; if (!kids.length) return; const open = openMap[loc.node.id] ?? loc.depth < 2; if (!open) setOpenMap((m) => ({ ...m, [loc.node.id]: true })); else select(kids[0]!.id); return; }
      if (e.key === "Enter") { e.preventDefault(); setEditing(loc.node.id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc, selected, index, openMap, select]);

  // --- largeur de l'aperçu : préréglage, valeur libre, poignée, point de rupture actif
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setMeasured(el.clientWidth - 40));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const presetWidth = PRESETS.find((x) => x.id === preset)?.width ?? null;
  const width = customWidth ?? presetWidth;
  const effective = width ?? measured;
  const breakpoint = useMemo(() => {
    const bps = [...site.settings.breakpoints].sort((a, b) => a.maxWidth - b.maxWidth);
    return bps.find((b) => effective <= b.maxWidth)?.name ?? "Base";
  }, [site.settings.breakpoints, effective]);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX, startW = effective;
    const max = (canvas.current?.clientWidth ?? 2000) - 40;
    const onMove = (ev: PointerEvent) => setCustomWidth(Math.max(MIN_WIDTH, Math.min(max, Math.round(startW + (ev.clientX - startX) * 2))));
    const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const status = STATUS[doc.status] ?? STATUS.saved!;
  const setOpen = useCallback((id: string, open: boolean) => setOpenMap((m) => ({ ...m, [id]: open })), []);
  const rename = useCallback((id: string, name: string | null | undefined) => {
    setEditing(null);
    if (name === undefined) return;
    const cur = index.get(id)?.node.name;
    if ((name ?? undefined) === cur) return;
    doc.commit({ op: "node.set", id, path: "name", value: name ?? undefined }, { label: "Renommer" });
  }, [index, doc]);

  return (
    <div className="h-full grid grid-rows-[40px_1fr] grid-cols-[264px_1fr_300px]">
      <header className="col-span-3 flex items-center gap-2 px-3 border-b border-line bg-panel">
        <span className="font-semibold text-base tracking-tight text-ink">{PRODUCT_NAME}</span>
        <Separator vertical />
        <span className="text-sm text-muted truncate max-w-[200px]" title={site.name}>{site.name}</span>
        <span className="text-dim">/</span>
        <span className="text-sm text-ink truncate max-w-[160px]">{page.name[locale]}</span>
        <div className="ml-4"><Tabs variant="pill" tabs={MODES.map((m) => ({ ...m, disabled: m.id !== "design" }))} value="design" onChange={() => {}} /></div>

        <div className="ml-auto flex items-center gap-2">
          <Tabs variant="pill" tabs={PRESETS.map((x) => ({ id: x.id, label: x.label }))} value={customWidth === null ? preset : ""} onChange={(id) => { setPreset(id); setCustomWidth(null); }} />
          <NumberInput className="w-[88px]" unit="px" min={MIN_WIDTH} value={Math.round(effective) || ""} onValueChange={(v) => setCustomWidth(v === "" ? null : Math.max(MIN_WIDTH, v))} />
          <Badge tone="accent" title="Point de rupture actif">{breakpoint}</Badge>
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            <IconButton label="Annuler (⌘Z)" icon={Undo2} disabled={!doc.canUndo} onClick={doc.undo} />
            <IconButton label="Rétablir (⇧⌘Z)" icon={Redo2} disabled={!doc.canRedo} onClick={doc.redo} />
          </div>
          <Badge tone={status.tone} title={doc.error ?? `Version ${doc.version}`}>{status.label} · v{doc.version}</Badge>
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            {site.theme.modes.map((m) => <IconButton key={m.id} label={`Aperçu en mode ${m.name.toLowerCase()}`} icon={m.id === "dark" ? Moon : Sun} active={mode === m.id} onClick={() => setMode(m.id)} />)}
          </div>
          <Separator vertical />
          <Button variant="ghost" icon={ExternalLink} onClick={() => window.open(previewPath, "_blank")}>Aperçu</Button>
          <Button variant="primary" icon={UploadCloud} disabled title="Publication : jalon M6">Publier</Button>
        </div>
      </header>

      <Panel side="left">
        <Tabs tabs={[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }]} value={leftTab} onChange={setLeftTab} className="px-1 shrink-0" />
        <div className="flex-1 overflow-auto py-1" onDragOver={(e) => { if (dragId.current) e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); setDrop(null); }}>
          {leftTab === "pages" ? (
            <ul>
              {site.pages.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => { setPageId(p.id); select(null); setFrameReady(false); setLeftTab("layers"); }} className={`w-full flex items-center gap-2 h-[28px] px-3 text-sm text-left ${p.id === pageId ? "bg-accent-soft text-ink" : "text-ink hover:bg-hover"}`}>
                    <FileText size={13} className={p.id === pageId ? "text-accent" : "text-muted"} aria-hidden />
                    <span className="truncate">{p.name[locale]}</span>
                    <span className="ml-auto font-mono text-2xs text-dim truncate max-w-[45%]">{p.kind === "template" ? "modèle" : p.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : leftTab === "layers" ? (
            <div role="tree" onDragEnd={() => { dragId.current = null; setDrop(null); }}>
              <Layer
                node={page.root} depth={0} selected={selected} onSelect={setSelected}
                openMap={openMap} setOpen={setOpen}
                editing={editing} onEditStart={setEditing} onRename={rename}
                drop={drop}
                onDragStart={(id) => { dragId.current = id; select(id); }}
                onDragOver={(id, position) => { if (dragId.current && dragId.current !== id) setDrop((d) => (d?.id === id && d.position === position ? d : { id, position })); }}
                onDragEnd={() => { dragId.current = null; setDrop(null); }}
                onDropOn={(id, position) => { if (dragId.current) moveNode(dragId.current, id, position); }}
              />
            </div>
          ) : (
            <AddPanel site={site} target={insertTarget} onAdd={addBlock} />
          )}
        </div>
      </Panel>

      <main ref={canvas} className="relative overflow-auto bg-app flex justify-center items-start p-5">
        {(doc.error || notice) ? (
          <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-10 rounded-sm border px-3 py-1.5 text-xs shadow-lg ${notice?.tone === "success" ? "bg-success-soft text-success border-success/40" : "bg-danger-soft text-danger border-danger/40"}`}>{notice?.text ?? doc.error}</div>
        ) : null}
        <div className="relative flex flex-col gap-1.5" style={{ width: width ? `${width}px` : "100%", maxWidth: "100%" }}>
          <div className="self-start text-2xs text-dim font-mono">{Math.round(effective)} px · {page.path}</div>
          <iframe ref={frame} key={previewPath} src={`${previewPath}?editor=1&mode=${mode}`} title="Aperçu" className="bg-white rounded-xs shadow-[0_0_0_1px_var(--color-line-strong),0_12px_40px_rgba(0,0,0,.45)]" style={{ width: "100%", height: "calc(100vh - 40px - 40px - 18px)" }} />
          <div role="separator" aria-label="Redimensionner l'aperçu" title="Glisser pour changer la largeur" onPointerDown={startResize} className="absolute top-[24px] -right-3 w-2.5 h-[calc(100%-24px)] cursor-col-resize group">
            <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-1 h-12 rounded-full bg-line-strong group-hover:bg-accent" />
          </div>
        </div>
      </main>

      <Panel side="right">
        {selectedLoc ? (
          <div className="flex-1 overflow-auto"><NodeInspector key={selectedLoc.node.id} site={site} loc={selectedLoc} commit={doc.commit} onDeleted={() => select(selectedLoc.parent?.id ?? null)} /></div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            <PanelHeading className="px-0">Sélection</PanelHeading>
            <Hint>Cliquez un élément dans l&apos;aperçu ou dans les calques. Flèches pour naviguer, Entrée pour renommer, ⌘D pour dupliquer, Suppr pour supprimer, glisser pour déplacer.</Hint>
          </div>
        )}
      </Panel>
    </div>
  );
}
