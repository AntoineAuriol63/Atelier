"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { AlertTriangle, CheckCircle2, Command as CommandIcon, Database as DatabaseIcon, ExternalLink, Info, FileText, Grid3x3, Layers, Moon, Palette, Plus, Redo2, Sun, Undo2, UploadCloud } from "lucide-react";
import type { DropPosition, Entry, Node, Page, Site } from "@atelier/model";
import { BASE, breakpointForWidth, canInsertUnder, planExitBox, cloneWithNewIds, dataSourceFor, entryPath, indexSite, layoutGridAt, newId, planDrop, planInsert, planMove, stylePath, templateOf } from "@atelier/model";
import type { Op } from "@atelier/model";
import { valueToCss } from "@atelier/renderer";
import type { Inline } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/product";
import type { BlockPreset } from "@/lib/blocks";
import { Badge, Button, Hint, IconButton, NumberInput, Panel, PanelHeading, Separator, Tabs, TreeRow, type DropIndicator, Select } from "@/ui";
import { NodeInspector } from "./NodeInspector";
import { AddPanel } from "./AddPanel";
import { ThemePanel } from "./ThemePanel";
import { PagesPanel } from "./PagesPanel";
import { CommandPalette, type Command } from "./CommandPalette";
import { allPresets } from "@/lib/blocks";
import { ImagesIcon, MediaLibraryProvider, openMediaLibrary } from "@/components/MediaLibrary";
import type { AssetUsage } from "@/lib/asset-usage";
import { PublishDialog } from "@/components/PublishDialog";
import { DataPanel } from "@/components/data/DataPanel";
import { DatabaseTable } from "@/components/data/DatabaseTable";
import { useEntries } from "@/lib/use-entries";
import { findForms, formDatabase, formDatabaseId } from "@/lib/forms";
import { nodeIcon, nodeLabel } from "./node-icons";

const PRESETS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: 1280 },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];
const MODES = [{ id: "write", label: "Écriture", hint: "Écrire et organiser le contenu, comme dans un document" }, { id: "design", label: "Design", hint: "Régler la disposition et le style de chaque élément" }, { id: "code", label: "Code", hint: "Bientôt" }];
type EditMode = "write" | "design";
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

export function EditorShell({ initialSite, initialVersion, initialEntries }: { initialSite: Site; initialVersion: number; initialEntries: Entry[] }) {
  const doc = useDocument(initialSite, initialVersion);
  const site = doc.site;
  // La page ouverte est mémorisée par site : au rechargement, on revient où l'on était.
  const pageKey = `atelier:page:${site.id}`;
  const [pageId, setPageIdState] = useState(() => { try { const saved = localStorage.getItem(pageKey); return site.pages.some((p) => p.id === saved) ? saved! : site.pages[0]!.id; } catch { return site.pages[0]!.id; } });
  const setPageId = useCallback((id: string) => { setPageIdState(id); try { localStorage.setItem(pageKey, id); } catch {} }, [pageKey]);
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
  const [notice, setNotice] = useState<{ text: string; tone: "danger" | "success" | "info" } | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(() => { try { return (localStorage.getItem("atelier:editmode") as EditMode) || "design"; } catch { return "design"; } });
  const switchMode = useCallback((m: EditMode) => { setEditMode(m); try { localStorage.setItem("atelier:editmode", m); } catch {} }, []);
  const [showGrid, setShowGrid] = useState<boolean>(() => { try { return localStorage.getItem("atelier:grid") === "1"; } catch { return false; } });
  const toggleGrid = useCallback(() => setShowGrid((g) => { try { localStorage.setItem("atelier:grid", g ? "0" : "1"); } catch {} return !g; }), []);
  const [previewState, setPreviewState] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const dragBlock = useRef<string | null>(null);
  const clipboard = useRef<Node | null>(null);
  const activeBpRef = useRef<string>(BASE);
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

  void previewKey;
  const post = useCallback((msg: unknown) => frame.current?.contentWindow?.postMessage(msg, window.location.origin), []);

  const notify = useCallback((text: string, tone: "danger" | "success" | "info" = "danger") => {
    setNotice({ text, tone });
    window.setTimeout(() => setNotice((n) => (n?.text === text ? null : n)), tone === "danger" ? 4000 : 3500);
  }, []);

  /** Entrées des bases (hors document) et base ouverte en vue tableur. */
  const ents = useEntries(initialSite.id, initialEntries, notify);
  const [dbOpen, setDbOpen] = useState<string | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const formForOpen = useMemo(() => (dbOpen ? findForms(site).find((f) => formDatabaseId(f.formId) === dbOpen) : undefined), [dbOpen, site]);
  // Modèle de page : l'aperçu se fait avec une entrée au choix (publiée, pour que l'adresse existe).
  const template = useMemo(() => templateOf(site, page.id), [site, page.id]);
  const [previewEntryByPage, setPreviewEntryByPage] = useState<Record<string, string>>({});
  const templateEntries = useMemo(() => (template ? ents.entries.filter((e) => e.database === template.database.id && e.status === "published") : []), [template, ents.entries]);
  const previewEntry = templateEntries.find((e) => e.id === previewEntryByPage[page.id]) ?? templateEntries[0];
  const previewBase = `/preview/${site.id}`;
  const previewPath = template && previewEntry ? `${previewBase}${entryPath(template.database, previewEntry) ?? ""}` : page.kind === "template" ? `${previewBase}/__template/${page.id}` : `${previewBase}${page.path === "/" ? "" : page.path}`;
  const dataSource = useMemo(() => (selected ? dataSourceFor(site, index, page, selected) : undefined), [site, index, page, selected]);

  /** Supprimer une base : ses entrées partent (sans retour), ses pages modèles redeviennent fixes, ses vues restent à reconfigurer. */
  const deleteDatabase = useCallback((dbId: string) => {
    const db = site.databases.find((d) => d.id === dbId);
    if (!db) return;
    const name = db.name[locale] ?? db.slug;
    const entryIds = ents.entries.filter((e) => e.database === dbId).map((e) => e.id);
    const views: string[] = [];
    const visit = (n: Node) => { if (n.type === "collection" && n.props.database === dbId) views.push(n.id); n.children?.forEach(visit); };
    site.pages.forEach((p) => visit(p.root)); site.components.forEach((c) => visit(c.root));
    const templates = (db.pageTemplates ?? []).map((t) => t.page);
    const lines = [`Supprimer la base « ${name} » ?`, ""];
    if (entryIds.length) lines.push(`• ${entryIds.length} entrée${entryIds.length > 1 ? "s" : ""} supprimée${entryIds.length > 1 ? "s" : ""}, sans retour possible.`);
    if (views.length) lines.push(`• ${views.length} vue${views.length > 1 ? "s" : ""} de base de données à reconfigurer.`);
    if (templates.length) lines.push(`• ${templates.length} page${templates.length > 1 ? "s" : ""} par entrée supprimée${templates.length > 1 ? "s" : ""} (⌘Z les ramène).`);
    if (!window.confirm(lines.join("\n"))) return;
    const ops: Op[] = [{ op: "site.set", path: "databases", value: site.databases.filter((d) => d.id !== dbId) }];
    const remaining = site.pages.filter((p) => !templates.includes(p.id));
    if (templates.length && remaining.length) ops.push({ op: "site.set", path: "pages", value: remaining });
    if (templates.includes(page.id) && remaining[0]) { setPageId(remaining[0].id); select(null); setFrameReady(false); }
    doc.commit(ops.length === 1 ? ops[0]! : { op: "batch", ops, label: `Supprimer la base ${name}` }, { label: `Supprimer la base ${name}` });
    ents.removeMany(entryIds);
    setDbOpen(null);
    notify(`Base « ${name} » supprimée${entryIds.length ? ` avec ${entryIds.length} entrée${entryIds.length > 1 ? "s" : ""}` : ""}.`, "info");
  }, [site, locale, ents, doc, notify, page.id, setPageId, select]);

  const goToUsage = useCallback((u: AssetUsage) => {
    if (u.kind === "entry") { setDbOpen(u.database); return; }
    if ("pageId" in u && u.pageId && u.pageId !== pageId) { setPageId(u.pageId); setFrameReady(false); }
    if ("nodeId" in u && u.nodeId) window.setTimeout(() => select(u.nodeId), 50);
  }, [pageId, setPageId, select]);

  // --- déplacement (calques et canvas) et insertion
  const moveNode = useCallback((id: string, targetId: string, position: DropPosition) => {
    const r = planMove(index, id, targetId, position);
    if (!r.ok) { notify(r.reason); return; }
    // Déposer à la même place : rien à faire, et rien dans l'historique.
    const loc = index.get(id);
    if (loc?.parent && loc.parent.id === r.to.parent && loc.index === r.to.index) { select(id); return; }
    doc.commit({ op: "node.move", id, to: r.to }, { label: "Déplacer" });
    select(id);
  }, [index, doc, notify, select]);

  /** Un modèle qui apporte un h1 alors que la page en a déjà un : son titre devient h2 (une page, un seul h1). */
  const fitHeadings = useCallback((node: Node): Node => {
    const hasH1 = (n: Node): boolean => (n.type === "text" && n.props.tag === "h1") || (n.children ?? []).some(hasH1);
    if (!hasH1(page.root) || !hasH1(node)) return node;
    const demote = (n: Node): Node => ({ ...n, props: n.type === "text" && n.props.tag === "h1" ? { ...n.props, tag: "h2" } : n.props, children: n.children?.map(demote) });
    return demote(node);
  }, [page.root]);
  const addBlock = useCallback((preset: BlockPreset) => {
    const node = fitHeadings(preset.make(site));
    const to = planInsert(index, page.root, selected);
    const ok = canInsertUnder(index, to.parent, node);
    if (!ok.ok) { notify(ok.reason); return; }
    doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node }, { label: `Ajouter ${preset.label}` });
    setOpenMap((m) => ({ ...m, [to.parent]: true }));
    select(node.id);
  }, [site, index, page.root, selected, doc, select, notify, fitHeadings]);

  const presetById = useCallback((id: string) => allPresets(site).find((b) => b.id === id), [site]);
  const dropBlock = useCallback((presetId: string, targetId: string, position: DropPosition) => {
    const preset = presetById(presetId);
    if (!preset) return;
    const node = fitHeadings(preset.make(site));
    const r = planDrop(index, targetId, position, node);
    if (!r.ok) { notify(r.reason); return; }
    doc.commit({ op: "node.insert", parent: r.to.parent, index: r.to.index, node }, { label: `Ajouter ${preset.label}` });
    setOpenMap((m) => ({ ...m, [r.to.parent]: true }));
    select(node.id);
  }, [presetById, index, site, doc, notify, select, fitHeadings]);

  /** Contenu modifié directement dans l'aperçu (texte et marques sérialisés par le canvas). */
  const setNodeContent = useCallback((id: string, content: Inline[]) => {
    const loc = index.get(id);
    if (!loc || loc.node.type !== "text") return;
    const current = (loc.node.props.content as Record<string, Inline[]> | undefined)?.[locale];
    if (JSON.stringify(current) === JSON.stringify(content)) return;
    doc.commit({ op: "node.set", id, path: `props.content.${locale}`, value: content }, { label: "Modifier le texte" });
  }, [index, doc, locale]);
  /** Entrée dans un texte : le bloc est coupé au curseur, la suite part dans un nouveau bloc du même type (un titre donne un paragraphe). */
  const splitNode = useCallback((id: string, before: Inline[], after: Inline[]) => {
    const loc = index.get(id);
    if (!loc || !loc.parent || loc.node.type !== "text") return;
    const isBlank = (c: Inline[]) => c.every((s) => s.t === "break" || (s.t === "text" && !s.v));
    // Dans un lien ou un bouton, Entrée ne crée rien : on valide simplement le texte.
    if (loc.parent.type === "link") { setNodeContent(id, [...before, ...after]); return; }
    const tag = typeof loc.node.props.tag === "string" && loc.node.props.tag === "p" ? "p" : loc.parent.type === "listItem" ? String(loc.node.props.tag ?? "span") : "p";
    // Curseur au début d'un texte non vide : un bloc vide apparaît au-dessus, le texte reste où il est (comme Notion).
    if (isBlank(before) && !isBlank(after)) {
      const empty: Node = { id: newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: "" }] } } };
      if (loc.parent.type === "listItem") { const li = index.get(loc.parent.id)!; doc.commit({ op: "node.insert", parent: li.parent!.id, index: li.index, node: { id: newId(), type: "listItem", props: {}, children: [empty] } }, { label: "Nouveau bloc" }); }
      else doc.commit({ op: "node.insert", parent: loc.parent.id, index: loc.index, node: empty }, { label: "Nouveau bloc" });
      window.setTimeout(() => post({ type: "atelier:edit-text", id, caret: "start" }), 30);
      return;
    }
    // Entrée sur un élément de liste vide : on sort de la liste, un paragraphe apparaît juste après elle (comme Notion).
    if (loc.parent.type === "listItem" && isBlank(before) && isBlank(after)) {
      const li = index.get(loc.parent.id)!;
      const list = index.get(li.parent!.id)!;
      if (!list.parent) return;
      const para: Node = { id: newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: "" }] } } };
      const ops: Op[] = [{ op: "node.remove", id: li.node.id }];
      // Les éléments qui suivaient repartent dans une seconde liste, après le paragraphe.
      const rest = (list.node.children ?? []).slice(li.index + 1);
      rest.forEach((n) => ops.push({ op: "node.remove", id: n.id }));
      ops.push({ op: "node.insert", parent: list.parent.id, index: list.index + 1, node: para });
      if (rest.length) ops.push({ op: "node.insert", parent: list.parent.id, index: list.index + 2, node: { id: newId(), type: "list", props: { ...list.node.props }, style: list.node.style, children: rest } });
      if (li.index === 0) ops.push({ op: "node.remove", id: list.node.id });
      doc.commit({ op: "batch", ops, label: "Sortir de la liste" });
      select(para.id);
      window.setTimeout(() => post({ type: "atelier:edit-text", id: para.id, caret: "start" }), 30);
      return;
    }
    // Entrée sur un paragraphe vide, dernier de sa boîte : on sort de la boîte, le paragraphe se retrouve juste après elle.
    if (isBlank(before) && isBlank(after) && loc.parent.type === "box") {
      const ex = planExitBox(index, id);
      if (ex.ok && canInsertUnder(index, ex.to.parent, loc.node).ok) {
        doc.commit({ op: "node.move", id, to: ex.to }, { label: "Sortir de la boîte" });
        select(id);
        window.setTimeout(() => post({ type: "atelier:edit-text", id, caret: "start" }), 30);
        return;
      }
    }
    const next: Node = { id: newId(), type: "text", props: { tag, content: { [locale]: after } } };
    const ops: Op[] = [{ op: "node.set", id, path: `props.content.${locale}`, value: before }];
    if (loc.parent.type === "listItem") {
      // Dans une liste : nouvel élément de liste après celui-ci.
      const li = index.get(loc.parent.id)!;
      const item: Node = { id: newId(), type: "listItem", props: {}, children: [next] };
      ops.push({ op: "node.insert", parent: li.parent!.id, index: li.index + 1, node: item });
    } else ops.push({ op: "node.insert", parent: loc.parent.id, index: loc.index + 1, node: next });
    doc.commit({ op: "batch", ops, label: "Nouveau bloc" });
    select(next.id);
    window.setTimeout(() => post({ type: "atelier:edit-text", id: next.id, caret: "start" }), 30);
  }, [index, doc, locale, select, post, setNodeContent]);
  /** Retour arrière dans un bloc vide : on le retire et on reprend l'édition du texte précédent. */
  const mergePrev = useCallback((id: string) => {
    const loc = index.get(id);
    if (!loc || !loc.parent) return;
    const container = loc.parent.type === "listItem" ? index.get(loc.parent.id)! : loc;
    const siblings = container.parent?.children ?? [];
    const prev = siblings[container.index - 1];
    const findLastText = (n: Node | undefined): Node | undefined => { if (!n) return undefined; if (n.type === "text") return n; for (let i = (n.children ?? []).length - 1; i >= 0; i--) { const t = findLastText(n.children![i]); if (t) return t; } return undefined; };
    const prevText = findLastText(prev);
    doc.commit({ op: "node.remove", id: container.node.id }, { label: "Supprimer le bloc vide" });
    if (prevText) { select(prevText.id); window.setTimeout(() => post({ type: "atelier:edit-text", id: prevText.id, caret: "end" }), 30); }
    else select(container.parent?.id ?? null);
  }, [index, doc, select, post]);
  /** Menu « / » : insère le bloc après le texte courant, ou à sa place s'il est vide. */
  const slashInsert = useCallback((id: string, presetId: string, replace: boolean) => {
    const preset = presetById(presetId);
    const loc = index.get(id);
    if (!preset || !loc || !loc.parent) return;
    const node = fitHeadings(preset.make(site));
    const ok = canInsertUnder(index, loc.parent.id, node);
    if (!ok.ok) { notify(ok.reason); return; }
    const ops: Op[] = [];
    if (replace) ops.push({ op: "node.remove", id });
    ops.push({ op: "node.insert", parent: loc.parent.id, index: replace ? loc.index : loc.index + 1, node });
    doc.commit({ op: "batch", ops, label: `Insérer ${preset.label}` });
    select(node.id);
    if (node.type === "text") window.setTimeout(() => post({ type: "atelier:edit-text", id: node.id, caret: "all" }), 30);
  }, [presetById, index, site, doc, select, post, notify, fitHeadings]);
  const dropBlockAfter = slashInsert;
  void dropBlockAfter;

  const textNodeIds = useMemo(() => [...index.values()].filter((l) => l.node.type === "text" && !l.node.bindings?.content && !((l.node.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).some((seg) => seg.t === "bind")).map((l) => l.node.id), [index, locale]);
  const blockInfos = useMemo(() => allPresets(site).map((b) => ({ id: b.id, label: b.label, group: b.group, keywords: `${b.description} ${b.keywords ?? ""}` })), [site]);

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
      if (e.origin !== window.location.origin) return;
      const m = e.data as { type?: string; id?: string; target?: string; position?: DropPosition };
      if (m?.type === "atelier:select" && m.id) {
        select(m.id);
        const n = index.get(m.id)?.node;
        const boundPath = n && n.type === "text" ? (n.bindings?.content?.path ?? ((n.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).find((seg): seg is Extract<Inline, { t: "bind" }> => seg.t === "bind")?.binding.path) : undefined;
        if (n && boundPath) {
          const dbName = (() => { const e = index.get(m.id); let cur = e?.parent ?? null; while (cur) { if (cur.type === "collection") return site.databases.find((d) => d.id === cur!.props.database)?.name[locale]; cur = index.get(cur.id)?.parent ?? null; } return site.databases.find((d) => d.pageTemplates?.some((t) => t.page === page.id))?.name[locale]; })();
          notify(`Ce texte vient de la base de données${dbName ? ` « ${dbName} »` : ""} (champ ${boundPath}) : il se modifie dans la base, pas dans la page.`, "info");
        }
      }
      if (m?.type === "atelier:ready") setFrameReady(true);
      if (m?.type === "atelier:move" && m.id && m.target && m.position) moveNode(m.id, m.target, m.position);
      const d = m as { type?: string; preset?: string; target?: string; position?: DropPosition; content?: Inline[]; before?: Inline[]; after?: Inline[]; id?: string; replace?: boolean; prop?: string; value?: unknown; tag?: string };
      if (d?.type === "atelier:drop-block" && d.preset && d.target && d.position) dropBlock(d.preset, d.target, d.position);
      if (d?.type === "atelier:text" && d.id && Array.isArray(d.content)) setNodeContent(d.id, d.content);
      if (d?.type === "atelier:split" && d.id && d.before && d.after) splitNode(d.id, d.before, d.after);
      if (d?.type === "atelier:merge-prev" && d.id) mergePrev(d.id);
      if (d?.type === "atelier:slash" && d.id && d.preset) slashInsert(d.id, d.preset, !!d.replace);
      if (d?.type === "atelier:style-in-context" && d.id) { switchMode("design"); select(d.id); }
      if (d?.type === "atelier:set-style" && d.id && d.prop) doc.commit({ op: "node.set", id: d.id, path: stylePath(activeBpRef.current, d.prop), value: d.value }, { label: `${d.prop}` });
      if (d?.type === "atelier:set-tag" && d.id && d.tag) doc.commit({ op: "node.set", id: d.id, path: "props.tag", value: d.tag }, { label: "Type de bloc" });
      if (d?.type === "atelier:pick-image" && d.id) { const target = d.id; select(target); openMediaLibrary({ value: (index.get(target)?.node.props.asset as string | null) ?? null, onPick: (assetId) => doc.commit({ op: "node.set", id: target, path: "props.asset", value: assetId }, { label: "Changer l'image" }) }); }
      if (d?.type === "atelier:remove" && d.id) { const loc = index.get(d.id); if (loc?.parent) { doc.commit({ op: "node.remove", id: d.id }, { label: "Supprimer" }); select(loc.parent.id); } }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [moveNode, select, dropBlock, setNodeContent, splitNode, mergePrev, slashInsert, switchMode, doc, index, site, locale, page.id, notify]);

  useEffect(() => { if (frameReady) post({ type: "atelier:site", site, containers: [...index.values()].filter((l) => ["box", "list", "listItem", "link", "form", "item", "slot"].includes(l.node.type)).map((l) => l.node.id), links: [...index.values()].filter((l) => l.node.type === "link" || (editMode === "write" && l.node.type === "collection")).map((l) => l.node.id), textNodes: textNodeIds, editMode, blocks: blockInfos }); }, [site, index, textNodeIds, frameReady, post, editMode, blockInfos]);
  // Les entrées voyagent à part, et seulement celles des bases que la page utilise (vues et modèle) : le message ne pèse plus le site entier.
  const pageDatabases = useMemo(() => {
    const ids = new Set<string>();
    const visit = (n: Node) => { if (n.type === "collection" && typeof n.props.database === "string") ids.add(n.props.database); n.children?.forEach(visit); };
    visit(page.root); site.components.forEach((c) => visit(c.root));
    const t = templateOf(site, page.id); if (t) ids.add(t.database.id);
    return ids;
  }, [site, page]);
  const pageEntries = useMemo(() => ents.entries.filter((e) => pageDatabases.has(e.database)), [ents.entries, pageDatabases]);
  useEffect(() => { if (frameReady) post({ type: "atelier:entries", entries: pageEntries }); }, [pageEntries, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:editmode", editMode }); }, [editMode, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:mode", mode }); }, [mode, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:highlight", id: selected }); }, [selected, frameReady, post]);
  useEffect(() => { if (frameReady) post({ type: "atelier:state", id: selected, state: previewState }); }, [selected, previewState, frameReady, site, post]);
  // Grille de mise en page : recalculée au point de rupture actif.
  const activeBpForGrid = useMemo(() => breakpointForWidth(site.settings.breakpoints, customWidth ?? (PRESETS.find((x) => x.id === preset)?.width ?? 1280)), [site.settings.breakpoints, customWidth, preset]);
  useEffect(() => {
    if (!frameReady) return;
    const g = layoutGridAt(site, activeBpForGrid);
    // La grille est un guide de mise en page : elle n'a pas sa place pendant qu'on écrit.
    post({ type: "atelier:grid", show: showGrid && editMode === "design", columns: g.columns, gutter: valueToCss(g.gutter), margin: valueToCss(g.margin), maxWidth: g.maxWidth ? valueToCss(g.maxWidth) : "none" });
  }, [site, activeBpForGrid, showGrid, frameReady, post, editMode]);

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
      if (e.key === "Enter") {
        e.preventDefault();
        if (editMode !== "write") { setEditing(loc.node.id); return; }
        // En Écriture, Entrée sur un texte sélectionné reprend la frappe à la fin.
        if (loc.node.type === "text") { post({ type: "atelier:edit-text", id: loc.node.id, caret: "end" }); return; }
        const para: Node = { id: newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: "" }] } } };
        // Une boîte sélectionnée s'ouvre : le paragraphe va dedans, en dernier. Une feuille (image, bouton, vue…) : juste après elle.
        const inside = loc.node.type === "box" && canInsertUnder(index, loc.node.id, para).ok;
        const to = inside ? { parent: loc.node.id, index: (loc.node.children ?? []).length } : loc.parent && canInsertUnder(index, loc.parent.id, para).ok ? { parent: loc.parent.id, index: loc.index + 1 } : null;
        if (!to) { notify("Impossible d'ajouter un paragraphe ici"); return; }
        doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node: para }, { label: "Nouveau bloc" });
        select(para.id);
        window.setTimeout(() => post({ type: "atelier:edit-text", id: para.id, caret: "start" }), 30);
      }
    };
    const onWindowKey = (e: KeyboardEvent) => onKey(e);
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return; const m = e.data as { type?: string; key?: string; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }; if (m?.type === "atelier:key" && m.key) onKey({ key: m.key, metaKey: !!m.metaKey, ctrlKey: !!m.ctrlKey, shiftKey: !!m.shiftKey, altKey: !!m.altKey, preventDefault() {}, fromPreview: true }); };
    window.addEventListener("keydown", onWindowKey);
    window.addEventListener("message", onMsg);
    return () => { window.removeEventListener("keydown", onWindowKey); window.removeEventListener("message", onMsg); };
  }, [doc, selected, index, openMap, select, paletteOpen, page.root, notify, toggleGrid, editMode, post, locale]);

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
  // L'interface dessinée dans l'aperçu (barres, poignée, menu) compense l'échelle pour garder sa taille réelle.
  useEffect(() => { if (frameReady) post({ type: "atelier:zoom", scale }); }, [scale, frameReady, post]);
  const activeBp = useMemo(() => breakpointForWidth(site.settings.breakpoints, effective), [site.settings.breakpoints, effective]);
  useEffect(() => { activeBpRef.current = activeBp; }, [activeBp]);
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
      { id: "mode:write", group: "Affichage", label: "Mode Écriture", run: () => switchMode("write") },
      { id: "mode:design", group: "Affichage", label: "Mode Design", run: () => switchMode("design") },
      { id: "grid", group: "Affichage", label: showGrid ? "Masquer la grille de mise en page" : "Afficher la grille de mise en page", keys: "⌃G", icon: Grid3x3, run: toggleGrid },
      ...site.theme.modes.map((m) => ({ id: `mode:${m.id}`, group: "Affichage", label: `Aperçu en mode ${m.name.toLowerCase()}`, icon: m.id === "dark" ? Moon : Sun, run: () => setMode(m.id) })),
      ...PRESETS.map((p) => ({ id: `width:${p.id}`, group: "Affichage", label: `Largeur ${p.label.toLowerCase()}`, run: () => { setPreset(p.id); setCustomWidth(null); } })),
      ...[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "data", label: "Données", icon: DatabaseIcon }, { id: "theme", label: "Thème", icon: Palette }].map((t) => ({ id: `tab:${t.id}`, group: "Panneaux", label: `Afficher ${t.label}`, icon: t.icon, run: () => setLeftTab(t.id) })),
      ...site.pages.map((p) => ({ id: `page:${p.id}`, group: "Pages", label: `Aller à ${p.name[locale] ?? p.path}`, icon: FileText, keywords: p.path, run: () => { setPageId(p.id); select(null); setFrameReady(false); } })),
      { id: "newpage", group: "Pages", label: "Nouvelle page…", icon: Plus, run: () => setLeftTab("pages") },
      { id: "media", group: "Affichage", label: "Images du site…", icon: ImagesIcon, keywords: "médias bibliothèque photos", run: () => openMediaLibrary() },
      ...site.databases.map((d) => ({ id: `db:${d.id}`, group: "Données", label: `Ouvrir la base ${d.name[locale] ?? d.slug}`, icon: DatabaseIcon, keywords: "base données tableau entrées", run: () => setDbOpen(d.id) })),
      ...allPresets(site).map((b) => ({ id: `add:${b.id}`, group: "Ajouter un bloc", label: b.label, icon: b.icon, keywords: `${b.description} ${b.keywords ?? ""}`, run: () => addBlock(b) })),
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
  }, [doc, site, locale, page.root, previewPath, selected, index, select, addBlock, showGrid, toggleGrid, switchMode, setPageId]);
  const setOpen = useCallback((id: string, open: boolean) => setOpenMap((m) => ({ ...m, [id]: open })), []);
  const rename = useCallback((id: string, name: string | null | undefined) => {
    setEditing(null);
    if (name === undefined) return;
    const cur = index.get(id)?.node.name;
    if ((name ?? undefined) === cur) return;
    doc.commit({ op: "node.set", id, path: "name", value: name ?? undefined }, { label: "Renommer" });
  }, [index, doc]);

  return (
    <MediaLibraryProvider site={site} entries={ents.entries} commit={doc.commit} saveEntry={ents.save} onGoTo={goToUsage}>
    <div className="h-full grid grid-rows-[40px_1fr] grid-cols-[300px_1fr_340px]">
      <header className="col-span-3 flex items-center gap-2 px-3 border-b border-line bg-panel">
        <Link href="/" className="font-semibold text-base tracking-tight text-ink hover:text-accent" title="Retour à vos sites">{PRODUCT_NAME}</Link>
        <Separator vertical />
        <span className="text-sm text-muted truncate max-w-[200px]" title={site.name}>{site.name}</span>
        <span className="text-dim">/</span>
        <span className="text-sm text-ink truncate max-w-[160px]">{page.name[locale]}</span>
        {page.kind === "template" ? <Badge tone="accent" title="Cette page s'affiche une fois par entrée de sa base">page par entrée</Badge> : null}
        {template ? (
          <div className="flex items-center gap-1 ml-2" title="Modèle de page : quelle entrée afficher dans l'aperçu">
            <span className="text-2xs uppercase tracking-[0.12em] text-dim">Entrée</span>
            {templateEntries.length ? <Select className="max-w-[220px]" value={previewEntry?.id ?? ""} options={templateEntries.map((e) => ({ value: e.id, label: String(e.values[template.database.titleField] ?? "") || "Sans titre" }))} onValueChange={(id) => { setPreviewEntryByPage((m) => ({ ...m, [page.id]: id })); select(null); setFrameReady(false); }} /> : <Badge tone="warning" title="Sans entrée publiée, la page s'affiche avec ses textes de repli">Aucune entrée publiée dans {template.database.name[locale] ?? template.database.slug}</Badge>}
          </div>
        ) : null}
        <div className="ml-4"><Tabs variant="pill" tabs={MODES.map((m) => ({ ...m, disabled: m.id === "code" }))} value={editMode} onChange={(m) => switchMode(m as EditMode)} /></div>

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
          <IconButton label="Images du site" icon={ImagesIcon} onClick={() => openMediaLibrary()} />
          <IconButton label="Palette de commandes (⌘K)" icon={CommandIcon} onClick={() => setPaletteOpen(true)} />
          <Button variant="ghost" icon={ExternalLink} onClick={() => window.open(previewPath, "_blank")}>Aperçu</Button>
          <Button variant="primary" icon={UploadCloud} onClick={() => setPublishOpen(true)} title="Publier le site, voir l'historique, revenir en arrière">Publier</Button>
        </div>
      </header>

      <Panel side="left">
        <Tabs tabs={[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "data", label: "Données", icon: DatabaseIcon }, { id: "theme", label: "Thème", icon: Palette }]} value={leftTab} onChange={setLeftTab} className="px-1 shrink-0" />
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
          ) : leftTab === "data" ? (
            <DataPanel site={site} entries={ents.entries} commit={doc.commit} onOpen={setDbOpen} />
          ) : leftTab === "add" ? (
            <AddPanel site={site} target={insertTarget} onAdd={addBlock} onDragBlock={(id) => { dragBlock.current = id; if (!id) setDrop(null); }} />
          ) : (
            <ThemePanel site={site} commit={doc.commit} />
          )}
        </div>
      </Panel>

      <main ref={canvas} className="relative min-w-0 overflow-auto bg-app flex justify-center items-start p-2">
        {(doc.error || notice) ? (
          <div role="status" className={`fixed top-14 left-1/2 -translate-x-1/2 z-[60] max-w-[560px] flex items-center gap-2 rounded-md border px-3.5 py-2.5 text-sm font-medium shadow-2xl animate-[atelier-toast_.25s_ease-out] ${notice?.tone === "success" ? "bg-success text-white border-success" : notice?.tone === "info" ? "bg-accent text-accent-ink border-accent" : "bg-danger text-white border-danger"}`}>
            {notice?.tone === "success" ? <CheckCircle2 size={16} aria-hidden /> : notice?.tone === "info" ? <Info size={16} aria-hidden /> : <AlertTriangle size={16} aria-hidden />}
            <span>{notice?.text ?? doc.error}</span>
            {!notice && doc.blocked ? <button type="button" onClick={() => window.location.reload()} className="ml-2 h-7 px-2.5 rounded-sm bg-white/15 hover:bg-white/25 text-sm font-medium">Recharger</button> : null}
          </div>
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
          <div className="flex-1 overflow-auto"><NodeInspector key={selectedLoc.node.id} site={site} loc={selectedLoc} dataSource={dataSource} activeBp={activeBp} mode={mode} editMode={editMode} onSwitchMode={switchMode} onGoToBreakpoint={goToBreakpoint} onPreviewState={setPreviewState} onEditInPreview={() => post({ type: "atelier:edit-text", id: selectedLoc.node.id })} onEnterComponent={(id) => { setEditingComponent(id); setLeftTab("layers"); select(site.components.find((c) => c.id === id)?.root.id ?? null); }} commit={doc.commit} onDeleted={() => select(selectedLoc.parent?.id ?? null)} /></div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            <PanelHeading className="px-0">Sélection</PanelHeading>
            <Hint>Cliquez un élément dans l&apos;aperçu ou dans les calques. Flèches pour naviguer, Entrée pour renommer, ⌘D pour dupliquer, Suppr pour supprimer, glisser pour déplacer.</Hint>
          </div>
        )}
      </Panel>
      {paletteOpen ? <CommandPalette open onClose={() => setPaletteOpen(false)} commands={commands} /> : null}
      {dbOpen && site.databases.some((d) => d.id === dbOpen) ? <DatabaseTable site={site} db={site.databases.find((d) => d.id === dbOpen)!} entries={ents.entries} save={ents.save} saveMany={ents.saveMany} remove={ents.remove} commit={doc.commit} onClose={() => setDbOpen(null)} saving={ents.saving} onDeleteDatabase={() => deleteDatabase(dbOpen)} notify={notify} /> : null}
      {dbOpen && formForOpen ? <DatabaseTable site={site} db={formDatabase(site, formForOpen)} entries={ents.entries} save={ents.save} remove={ents.remove} commit={doc.commit} onClose={() => setDbOpen(null)} saving={ents.saving} readOnly /> : null}
      {publishOpen ? <PublishDialog site={site} version={doc.version} dirty={doc.status !== "saved" && !doc.blocked} broken={doc.blocked} commit={doc.commit} onClose={() => setPublishOpen(false)} notify={notify} /> : null}

    </div>
    </MediaLibraryProvider>
  );
}
