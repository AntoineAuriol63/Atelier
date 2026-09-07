"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { Command as CommandIcon, ExternalLink, FileText, Grid3x3, Layers, Moon, Palette, Plus, Redo2, Sun, Undo2, UploadCloud } from "lucide-react";
import type { DropPosition, Node, Page, Site } from "@atelier/model";
import { BASE, breakpointForWidth, canInsertUnder, cloneWithNewIds, indexSite, layoutGridAt, newId, planDrop, planInsert, planMove } from "@atelier/model";
import { valueToCss } from "@atelier/renderer";
import type { Inline } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import { PRODUCT_NAME } from "@/lib/product";
import type { BlockPreset } from "@/lib/blocks";
import { Badge, Button, Hint, IconButton, NumberInput, Panel, PanelHeading, Separator, Tabs, TreeRow, type DropIndicator } from "@/ui";
import { NodeInspector } from "./NodeInspector";
import { AddPanel } from "./AddPanel";
import { ThemePanel } from "./ThemePanel";
import { PagesPanel } from "./PagesPanel";
import { CommandPalette, type Command } from "./CommandPalette";
import { BLOCKS, componentPresets } from "@/lib/blocks";
import { nodeIcon, nodeLabel } from "./node-icons";

const PRESETS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: 1280 },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];
const MODES = [{ id: "write", label: "Écriture", hint: "Bientôt" }, { id: "design", label: "Design" }, { id: "code", label: "Code", hint: "Bientôt" }];
const MIN_WIDTH = 320;
const MAX_WIDTH = 4000;

type DropState = { id: string; position: DropPosition } | null;

function dropPositionFor(e: DragEvent, canInside: boolean): DropPosition {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const y = (e.clientY - r.top) / r.height;
  if (canInside) return y < 0.25 ? "before" : y > 0.75 ? "after" : "inside";
  return y < 0.5 ? "before" : "after";
}

function Layer(p: {
  node: Node; depth: number; selected: string | null; onSelect: (id: string) => void; onEnterComponent?: (componentId: string) => void;
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
        trailing={node.type === "instance" && p.onEnterComponent ? <button type="button" onClick={(e) => { e.stopPropagation(); p.onEnterComponent!(String(node.props.component)); }} className="h-5 px-1.5 rounded-xs text-2xs text-accent hover:bg-accent-soft opacity-0 group-hover:opacity-100" title="Ouvrir le composant pour modifier son contenu">Ouvrir</button> : undefined}
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
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showGrid, setShowGrid] = useState<boolean>(() => { try { return localStorage.getItem("atelier:grid") === "1"; } catch { return false; } });
  const toggleGrid = useCallback(() => setShowGrid((g) => { try { localStorage.setItem("atelier:grid", g ? "0" : "1"); } catch {} return !g; }), []);
  const [previewState, setPreviewState] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const dragBlock = useRef<string | null>(null);
  const clipboard = useRef<Node | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const canvas = useRef<HTMLElement>(null);
  const page: Page = site.pages.find((p) => p.id === pageId) ?? site.pages[0]!;
  const previewKey = `${page.id}:${page.path}`;
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
  void previewKey;
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
    const ok = canInsertUnder(index, to.parent, node);
    if (!ok.ok) { notify(ok.reason); return; }
    doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node }, { label: `Ajouter ${preset.label}` });
    setOpenMap((m) => ({ ...m, [to.parent]: true }));
    select(node.id);
  }, [site, index, page.root, selected, doc, select, notify]);

  const presetById = useCallback((id: string) => [...BLOCKS, ...componentPresets(site)].find((b) => b.id === id), [site]);
  const dropBlock = useCallback((presetId: string, targetId: string, position: DropPosition) => {
    const preset = presetById(presetId);
    if (!preset) return;
    const node = preset.make(site);
    const r = planDrop(index, targetId, position, node);
    if (!r.ok) { notify(r.reason); return; }
    doc.commit({ op: "node.insert", parent: r.to.parent, index: r.to.index, node }, { label: `Ajouter ${preset.label}` });
    setOpenMap((m) => ({ ...m, [r.to.parent]: true }));
    select(node.id);
  }, [presetById, index, site, doc, notify, select]);

  /** Texte modifié directement dans l'aperçu (texte simple, sans mise en forme). */
  const setNodeText = useCallback((id: string, text: string) => {
    const loc = index.get(id);
    if (!loc || loc.node.type !== "text") return;
    const value: Inline[] = text.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) as Inline[];
    doc.commit({ op: "node.set", id, path: `props.content.${locale}`, value }, { label: "Modifier le texte" });
  }, [index, doc, locale]);

  const textNodeIds = useMemo(() => [...index.values()].filter((l) => l.node.type === "text" && !l.node.bindings?.content && !((l.node.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).some((seg) => (seg.t !== "text" && seg.t !== "break") || (seg.t === "text" && seg.marks?.length))).map((l) => l.node.id), [index, locale]);

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
      const d = m as { type?: string; preset?: string; target?: string; position?: DropPosition; text?: string; id?: string };
      if (d?.type === "atelier:drop-block" && d.preset && d.target && d.position) dropBlock(d.preset, d.target, d.position);
      if (d?.type === "atelier:text" && d.id && typeof d.text === "string") setNodeText(d.id, d.text);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [moveNode, select, dropBlock, setNodeText]);

  useEffect(() => { if (frameReady) post({ type: "atelier:site", site, containers: [...index.values()].filter((l) => ["box", "list", "listItem", "link", "form", "item", "slot"].includes(l.node.type)).map((l) => l.node.id), textNodes: textNodeIds }); }, [site, index, textNodeIds, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:mode", mode }); }, [mode, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:highlight", id: selected }); }, [selected, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:state", id: selected, state: previewState }); }, [selected, previewState, frameReady, site, post]);
  // Grille de mise en page : recalculée au point de rupture actif.
  const activeBpForGrid = useMemo(() => breakpointForWidth(site.settings.breakpoints, customWidth ?? (PRESETS.find((x) => x.id === preset)?.width ?? 1280)), [site.settings.breakpoints, customWidth, preset]);
  useEffect(() => {
    if (!frameReady) return;
    const g = layoutGridAt(site, activeBpForGrid);
    post({ type: "atelier:grid", show: showGrid, columns: g.columns, gutter: valueToCss(g.gutter), margin: valueToCss(g.margin), maxWidth: g.maxWidth ? valueToCss(g.maxWidth) : "none" });
  }, [site, activeBpForGrid, showGrid, frameReady, post]);

  // --- raccourcis clavier (fenêtre et aperçu)
  const [editingComponent, setEditingComponent] = useState<string | null>(null);
  const treeRoot = editingComponent ? site.components.find((c) => c.id === editingComponent)?.root ?? page.root : page.root;
  useEffect(() => {
    type KeyLike = { key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey?: boolean; preventDefault: () => void; fromPreview?: boolean };
    const onKey = (e: KeyLike) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); return; }
      if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "g") { e.preventDefault(); toggleGrid(); return; }
      if (paletteOpen) return;
      if (meta && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) doc.redo(); else doc.undo(); return; }
      if (!e.fromPreview && isTyping()) return;
      const loc = selected ? index.get(selected) : undefined;
      if (e.key === "Escape") { select(null); return; }
      if (!loc) return;
      if (meta && e.key.toLowerCase() === "c") { e.preventDefault(); clipboard.current = structuredClone(loc.node); void navigator.clipboard?.writeText(JSON.stringify(loc.node)).catch(() => {}); notify("Copié", "success"); return; }
      if (meta && e.key.toLowerCase() === "x") { e.preventDefault(); if (!loc.parent) return; clipboard.current = structuredClone(loc.node); doc.commit({ op: "node.remove", id: loc.node.id }, { label: "Couper" }); select(loc.parent.id); return; }
      if (meta && e.key.toLowerCase() === "v") { e.preventDefault(); if (!clipboard.current) return; const { node: copy } = cloneWithNewIds(clipboard.current, newId); const to = planInsert(index, page.root, loc.node.id, "after"); const ok = canInsertUnder(index, to.parent, copy); if (!ok.ok) { notify(ok.reason); return; } doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node: copy }, { label: "Coller" }); select(copy.id); return; }
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
    const onWindowKey = (e: KeyboardEvent) => onKey(e);
    const onMsg = (e: MessageEvent) => { const m = e.data as { type?: string; key?: string; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }; if (m?.type === "atelier:key" && m.key) onKey({ key: m.key, metaKey: !!m.metaKey, ctrlKey: !!m.ctrlKey, shiftKey: !!m.shiftKey, altKey: !!m.altKey, preventDefault() {}, fromPreview: true }); };
    window.addEventListener("keydown", onWindowKey);
    window.addEventListener("message", onMsg);
    return () => { window.removeEventListener("keydown", onWindowKey); window.removeEventListener("message", onMsg); };
  }, [doc, selected, index, openMap, select, paletteOpen, page.root, notify, toggleGrid]);

  // --- largeur de l'aperçu : préréglage, valeur libre, poignée, point de rupture actif
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round((entries[0]?.contentRect.width ?? el.getBoundingClientRect().width) - 16);
      if (w >= 100) setMeasured(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const presetWidth = PRESETS.find((x) => x.id === preset)?.width ?? null;
  const width = customWidth ?? presetWidth;
  const effective = width ?? (measured || 1280);
  // Au-delà de la zone visible, le cadre garde sa vraie largeur et est réduit à l'échelle pour tenir.
  const scale = measured > 0 && effective > measured ? measured / effective : 1;
  const frameHeight = `calc((100vh - 40px - 16px) / ${scale})`;
  const activeBp = useMemo(() => breakpointForWidth(site.settings.breakpoints, effective), [site.settings.breakpoints, effective]);
  const breakpoint = activeBp === BASE ? "Base" : site.settings.breakpoints.find((b) => b.id === activeBp)?.name ?? activeBp;
  const goToBreakpoint = useCallback((bp: string) => {
    if (bp === BASE) { setPreset("base"); setCustomWidth(null); return; }
    const b = site.settings.breakpoints.find((x) => x.id === bp);
    if (b) setCustomWidth(b.maxWidth);
  }, [site.settings.breakpoints]);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX, startW = effective, startScale = scale;
    const onMove = (ev: PointerEvent) => setCustomWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, Math.round(startW + ((ev.clientX - startX) * 2) / startScale))));
    const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const status = STATUS[doc.status] ?? STATUS.saved!;
  const commands = useMemo<Command[]>(() => {
    const cmds: Command[] = [
      { id: "undo", group: "Édition", label: "Annuler", keys: "⌘Z", icon: Undo2, run: doc.undo },
      { id: "redo", group: "Édition", label: "Rétablir", keys: "⇧⌘Z", icon: Redo2, run: doc.redo },
      { id: "preview", group: "Affichage", label: "Ouvrir l'aperçu dans un nouvel onglet", icon: ExternalLink, run: () => window.open(previewPath, "_blank") },
      { id: "grid", group: "Affichage", label: showGrid ? "Masquer la grille de mise en page" : "Afficher la grille de mise en page", keys: "⌃G", icon: Grid3x3, run: toggleGrid },
      ...site.theme.modes.map((m) => ({ id: `mode:${m.id}`, group: "Affichage", label: `Aperçu en mode ${m.name.toLowerCase()}`, icon: m.id === "dark" ? Moon : Sun, run: () => setMode(m.id) })),
      ...PRESETS.map((p) => ({ id: `width:${p.id}`, group: "Affichage", label: `Largeur ${p.label.toLowerCase()}`, run: () => { setPreset(p.id); setCustomWidth(null); } })),
      ...[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "theme", label: "Thème", icon: Palette }].map((t) => ({ id: `tab:${t.id}`, group: "Panneaux", label: `Afficher ${t.label}`, icon: t.icon, run: () => setLeftTab(t.id) })),
      ...site.pages.map((p) => ({ id: `page:${p.id}`, group: "Pages", label: `Aller à ${p.name[locale] ?? p.path}`, icon: FileText, keywords: p.path, run: () => { setPageId(p.id); select(null); setFrameReady(false); } })),
      { id: "newpage", group: "Pages", label: "Nouvelle page…", icon: Plus, run: () => setLeftTab("pages") },
      ...[...BLOCKS, ...componentPresets(site)].map((b) => ({ id: `add:${b.id}`, group: "Ajouter un bloc", label: b.label, icon: b.icon, keywords: b.description, run: () => addBlock(b) })),
    ];
    if (selected && index.get(selected)?.parent) {
      cmds.push({ id: "dup", group: "Édition", label: "Dupliquer la sélection", keys: "⌘D", run: () => { const loc = index.get(selected)!; const { node: copy } = cloneWithNewIds(loc.node, newId); doc.commit({ op: "node.insert", parent: loc.parent!.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); select(copy.id); } });
      cmds.push({ id: "del", group: "Édition", label: "Supprimer la sélection", keys: "⌫", run: () => { const loc = index.get(selected)!; doc.commit({ op: "node.remove", id: selected }, { label: "Supprimer" }); select(loc.parent!.id); } });
    }
    const seen = new Set<string>();
    const nodes: Command[] = [];
    const visit = (n: Node) => { const label = nodeLabel(n); if (!seen.has(n.id)) { seen.add(n.id); nodes.push({ id: `sel:${n.id}`, group: "Sélectionner un calque", label, icon: nodeIcon(n), keywords: n.type, run: () => select(n.id) }); } n.children?.forEach(visit); };
    visit(page.root);
    return [...cmds, ...nodes.slice(0, 80)];
  }, [doc, site, locale, page.root, previewPath, selected, index, select, addBlock, showGrid, toggleGrid]);
  const setOpen = useCallback((id: string, open: boolean) => setOpenMap((m) => ({ ...m, [id]: open })), []);
  const rename = useCallback((id: string, name: string | null | undefined) => {
    setEditing(null);
    if (name === undefined) return;
    const cur = index.get(id)?.node.name;
    if ((name ?? undefined) === cur) return;
    doc.commit({ op: "node.set", id, path: "name", value: name ?? undefined }, { label: "Renommer" });
  }, [index, doc]);

  return (
    <div className="h-full grid grid-rows-[40px_1fr] grid-cols-[300px_1fr_340px]">
      <header className="col-span-3 flex items-center gap-2 px-3 border-b border-line bg-panel">
        <span className="font-semibold text-base tracking-tight text-ink">{PRODUCT_NAME}</span>
        <Separator vertical />
        <span className="text-sm text-muted truncate max-w-[200px]" title={site.name}>{site.name}</span>
        <span className="text-dim">/</span>
        <span className="text-sm text-ink truncate max-w-[160px]">{page.name[locale]}</span>
        <div className="ml-4"><Tabs variant="pill" tabs={MODES.map((m) => ({ ...m, disabled: m.id !== "design" }))} value="design" onChange={() => {}} /></div>

        <div className="ml-auto flex items-center gap-2">
          <Tabs variant="pill" tabs={PRESETS.map((x) => ({ id: x.id, label: x.label }))} value={customWidth === null ? preset : ""} onChange={(id) => { setPreset(id); setCustomWidth(null); }} />
          <NumberInput className="w-[92px]" unit="px" min={MIN_WIDTH} max={MAX_WIDTH} step={10} title="Largeur de l'aperçu (320 à 4000 px)" value={Math.round(effective) || ""} onValueChange={(v) => setCustomWidth(v === "" ? null : v)} />
          <Badge tone="accent" title="Point de rupture actif : les réglages de style se posent dessus">{breakpoint}</Badge>
          {scale < 1 ? <Badge title="Aperçu réduit pour tenir dans la zone">{Math.round(scale * 100)} %</Badge> : null}
          <IconButton label={showGrid ? "Masquer la grille de mise en page (⌃G)" : "Afficher la grille de mise en page (⌃G)"} icon={Grid3x3} active={showGrid} onClick={toggleGrid} />
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
          <IconButton label="Palette de commandes (⌘K)" icon={CommandIcon} onClick={() => setPaletteOpen(true)} />
          <Button variant="ghost" icon={ExternalLink} onClick={() => window.open(previewPath, "_blank")}>Aperçu</Button>
          <Button variant="primary" icon={UploadCloud} disabled title="Publication : jalon M6">Publier</Button>
        </div>
      </header>

      <Panel side="left">
        <Tabs tabs={[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "theme", label: "Thème", icon: Palette }]} value={leftTab} onChange={setLeftTab} className="px-1 shrink-0" />
        <div className="flex-1 overflow-auto py-1" onDragOver={(e) => { if (dragId.current || dragBlock.current) e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); setDrop(null); }}>
          {leftTab === "pages" ? (
            <PagesPanel site={site} pageId={pageId} commit={doc.commit} onOpen={(id) => { setPageId(id); select(null); setFrameReady(false); }} />
          ) : leftTab === "layers" ? (
            <div role="tree" onDragEnd={() => { dragId.current = null; setDrop(null); }}>
              {editingComponent ? (
                <div className="mx-2 mb-1 px-2 py-1.5 rounded-sm bg-violet-400/15 text-violet-300 text-xs flex items-center gap-2">
                  <span className="flex-1 truncate">Composant <strong className="font-medium">{site.components.find((c) => c.id === editingComponent)?.name}</strong> : toutes ses copies changent.</span>
                  <button type="button" onClick={() => { setEditingComponent(null); select(null); }} className="h-5 px-1.5 rounded-xs bg-panel text-ink hover:bg-hover whitespace-nowrap">Retour à la page</button>
                </div>
              ) : null}
              <Layer
                node={treeRoot} depth={0} selected={selected} onSelect={select} onEnterComponent={(id) => { setEditingComponent(id); setLeftTab("layers"); select(site.components.find((c) => c.id === id)?.root.id ?? null); }}
                openMap={openMap} setOpen={setOpen}
                editing={editing} onEditStart={setEditing} onRename={rename}
                drop={drop}
                onDragStart={(id) => { dragId.current = id; select(id); }}
                onDragOver={(id, position) => { if ((dragId.current && dragId.current !== id) || dragBlock.current) setDrop((d) => (d?.id === id && d.position === position ? d : { id, position })); }}
                onDragEnd={() => { dragId.current = null; dragBlock.current = null; setDrop(null); }}
                onDropOn={(id, position) => { if (dragId.current) moveNode(dragId.current, id, position); else if (dragBlock.current) dropBlock(dragBlock.current, id, position); }}
              />
            </div>
          ) : leftTab === "add" ? (
            <AddPanel site={site} target={insertTarget} onAdd={addBlock} onDragBlock={(id) => { dragBlock.current = id; if (!id) setDrop(null); }} />
          ) : (
            <ThemePanel site={site} commit={doc.commit} />
          )}
        </div>
      </Panel>

      <main ref={canvas} className="relative min-w-0 overflow-auto bg-app flex justify-center items-start p-2">
        {(doc.error || notice) ? (
          <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-10 rounded-sm border px-3 py-1.5 text-xs shadow-lg ${notice?.tone === "success" ? "bg-success-soft text-success border-success/40" : "bg-danger-soft text-danger border-danger/40"}`}>{notice?.text ?? doc.error}</div>
        ) : null}
        <div className="relative flex flex-col gap-1.5" style={{ width: width ? `${Math.min(width, measured || width)}px` : "100%", maxWidth: "100%" }}>
          <div style={{ width: "100%", height: `calc(${frameHeight} * ${scale})`, overflow: "visible", marginTop: 0 }}>
            <div style={{ width: `${effective || measured}px`, height: frameHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <iframe ref={frame} key={previewPath} src={`${previewPath}?editor=1&mode=${mode}`} title="Aperçu" className="bg-white rounded-xs shadow-[0_0_0_1px_var(--color-line-strong),0_12px_40px_rgba(0,0,0,.45)]" style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
          <div role="separator" aria-label="Redimensionner l'aperçu" title="Glisser pour changer la largeur" onPointerDown={startResize} className="absolute top-0 -right-2.5 w-2.5 h-full cursor-col-resize group">
            <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-1 h-12 rounded-full bg-line-strong group-hover:bg-accent" />
          </div>
        </div>
      </main>

      <Panel side="right">
        {selectedLoc ? (
          <div className="flex-1 overflow-auto"><NodeInspector key={selectedLoc.node.id} site={site} loc={selectedLoc} activeBp={activeBp} mode={mode} onGoToBreakpoint={goToBreakpoint} onPreviewState={setPreviewState} onEditInPreview={() => post({ type: "atelier:edit-text", id: selectedLoc.node.id })} onEnterComponent={(id) => { setEditingComponent(id); setLeftTab("layers"); select(site.components.find((c) => c.id === id)?.root.id ?? null); }} commit={doc.commit} onDeleted={() => select(selectedLoc.parent?.id ?? null)} /></div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            <PanelHeading className="px-0">Sélection</PanelHeading>
            <Hint>Cliquez un élément dans l&apos;aperçu ou dans les calques. Flèches pour naviguer, Entrée pour renommer, ⌘D pour dupliquer, Suppr pour supprimer, glisser pour déplacer.</Hint>
          </div>
        )}
      </Panel>
      {paletteOpen ? <CommandPalette open onClose={() => setPaletteOpen(false)} commands={commands} /> : null}
    </div>
  );
}
