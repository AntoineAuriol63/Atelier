"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { AlertTriangle, CheckCircle2, Command as CommandIcon, Database as DatabaseIcon, ExternalLink, Info, FileText, Grid3x3, Layers, Moon, Palette, Plus, Puzzle, Redo2, Sparkles, Sun, Undo2, UploadCloud, X, Settings2, Maximize2, Minimize2, Columns2, PanelLeftClose, PanelLeftOpen, Zap } from "lucide-react";
import type { DropPosition, Entry, Node, Page, Site, StyleValue, Role } from "@atelier/model";
import { animationById, appearanceOf, planAppearancePreset, planRemoveNode, BASE, breakpointForWidth, canInsertUnder, cloneWithNewIds, dataSourceFor, entryPath, fitHeadings as fitHeadingsInPage, indexSite, layoutGridAt, newId, planDetach, planDrop, planInsert, planMakeComponent, planMergePrev, planMove, planSlashInsert, planSplit, stylePath, templateOf, type ComponentPlan, type TextPlan, ANIMATION_PRESETS } from "@atelier/model";
import type { Op } from "@atelier/model";
import { valueToCss } from "@atelier/renderer";
import type { Inline } from "@atelier/model";
import { useDocument } from "@/lib/use-document";
import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/product";
import { isEditableTarget, mod } from "@/lib/keys";
import type { BlockPreset } from "@/lib/blocks";
import { Badge, Breadcrumb, Button, Hint, IconButton, NumberInput, Panel, PanelHeading, Separator, Tabs, TreeRow, type DropIndicator, Select, ConfirmProvider, askConfirm, Eyebrow } from "@/ui";
import { NodeInspector } from "./NodeInspector";
import { AddPanel } from "./AddPanel";
import { ThemePanel } from "./ThemePanel";
import { PagesPanel } from "./PagesPanel";
import { CommandPalette, type Command } from "./CommandPalette";
import { allPresets } from "@/lib/blocks";
import { ImagesIcon, MediaLibraryProvider, openMediaLibrary } from "@/components/MediaLibrary";
import type { AssetUsage } from "@/lib/asset-usage";
import { isAtelierMessage, type EditMode, type FromPreview, type ToPreview } from "@/lib/preview-protocol";
import { animatedNodes, triggerHosts, validOpenTimeline, type OpenTimeline } from "@/lib/timeline";
import { compoundIds, selectionPath } from "@/lib/selection";
import { testOnSiteUrl } from "@/lib/test-on-site";
import { AnimationModePanel } from "./animation/AnimationModePanel";
import { PublishDialog } from "@/components/PublishDialog";
import { DataPanel } from "@/components/data/DataPanel";
import { DatabaseTable } from "@/components/data/DatabaseTable";
import { useEntries } from "@/lib/use-entries";
import { findForms, formDatabase, formDatabaseId } from "@/lib/forms";
import { uniqueFieldName } from "@/lib/forms";
import { nodeIcon, nodeLabel } from "./node-icons";

const PRESETS: { id: string; label: string; width: number | null }[] = [
  { id: "base", label: "Bureau", width: 1280 },
  { id: "tablet", label: "Tablette", width: 900 },
  { id: "mobile", label: "Mobile", width: 390 },
];
const MODES = [{ id: "write", label: "Écriture", hint: "Écrire et organiser le contenu, comme dans un document" }, { id: "design", label: "Design", hint: "Régler la disposition et le style de chaque élément" }, { id: "animate", label: "Animation", hint: "Déclencheurs et lignes de temps : voir l'état exact à chaque instant" }, { id: "code", label: "Code", hint: "Bientôt" }];
const MIN_WIDTH = 320;
const MAX_WIDTH = 4000;

type DropState = { id: string; position: DropPosition; refusal?: string | null } | null;

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
  /** Mode Animation : éléments animés par l'animation ouverte (point) et éléments qui portent un déclencheur (éclair). */
  marks?: { animated: Set<string>; triggers: Set<string> };
}) {
  const { node, depth } = p;
  const kids = node.children ?? [];
  const open = p.openMap[node.id] ?? depth < 2;
  const canInside = kids.length > 0 || ["box", "list", "listItem", "link", "form", "item", "slot"].includes(node.type);
  const indicator: DropIndicator = p.drop?.id === node.id ? p.drop.position : null;
  const refusal = p.drop?.id === node.id ? p.drop.refusal ?? null : null;
  const animated = !!p.marks?.animated.has(node.id);
  const triggered = !!p.marks?.triggers.has(node.id);
  const marks = animated || triggered ? (
    <span className={`${node.type === "instance" ? "ml-1" : "ml-auto"} flex items-center gap-1 pl-1 text-accent`}>
      {animated ? <span role="img" aria-label="Animé par l'animation ouverte" title="Animé par l'animation ouverte" className="w-1.5 h-1.5 rounded-full bg-accent" /> : null}
      {triggered ? <span role="img" aria-label="Porte un déclencheur" title="Porte un déclencheur" className="inline-flex"><Zap size={11} aria-hidden /></span> : null}
    </span>
  ) : null;
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
        refusal={refusal}
        trailing={<>{marks}{node.type === "instance" && p.onEnterComponent ? <button type="button" onClick={(e) => { e.stopPropagation(); p.onEnterComponent!(String(node.props.component)); }} className="h-5 px-1.5 rounded-xs text-2xs text-accent hover:bg-accent-soft opacity-60 group-hover:opacity-100 focus-visible:opacity-100" title="Ouvrir le composant pour modifier son contenu">Ouvrir</button> : null}</>}
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
  saved: { label: "Enregistré", tone: "success" }, saving: { label: "Enregistrement…", tone: "neutral" }, offline: { label: "Hors ligne", tone: "warning" },
  conflict: { label: "Conflit", tone: "danger" }, error: { label: "Erreur", tone: "danger" },
};
type Notice = { text: string; tone: "danger" | "success" | "info"; action?: { label: string; run: () => void } };
// Un seul message à la fois ; le minuteur d'effacement vit hors du composant (un seul éditeur par page).
let noticeTimer: number | null = null;

/** Compte à rebours vivant vers la prochaine tentative d'enregistrement. */
function RetryCountdown({ at }: { at: number }) {
  const [now, setNow] = useState(0);
  useEffect(() => { const t = window.setInterval(() => setNow(Date.now()), 500); return () => window.clearInterval(t); }, []);
  const s = now ? Math.max(0, Math.ceil((at - now) / 1000)) : null;
  return <span>{s === null ? "nouvel essai bientôt" : `nouvel essai dans ${s} s`}</span>;
}

function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}
/** Le focus est « dans l'espace de travail » : nulle part, sur l'arbre des calques ou sur l'aperçu. */
function focusInWorkspace(): boolean {
  const el = document.activeElement as HTMLElement | null;
  return !el || el === document.body || el.tagName === "IFRAME" || !!el.closest("[role=tree]");
}

export function EditorShell({ initialSite, initialVersion, initialEntries, role = "owner" }: { initialSite: Site; initialVersion: number; initialEntries: Entry[]; /** Rôle du compte sur ce site : un rédacteur reste en Écriture et ne touche ni au design ni aux réglages. */ role?: Role }) {
  const writer = role === "writer";
  const [notice, setNotice] = useState<Notice | null>(null);
  /** Message passager en haut de l'aperçu : fermable, avec une action facultative (« Annuler »). */
  const notify = useCallback((text: string, tone: "danger" | "success" | "info" = "danger", action?: Notice["action"]) => {
    setNotice({ text, tone, action });
    if (noticeTimer) window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => setNotice((n) => (n?.text === text ? null : n)), action ? 6000 : tone === "danger" ? 4000 : 3500);
  }, []);
  const doc = useDocument(initialSite, initialVersion, { role, onRefused: (m) => notify(m), onMerged: (m) => notify(m, "info") });
  const site = doc.site;
  // La page ouverte est mémorisée par site : au rechargement, on revient où l'on était.
  const pageKey = `atelier:page:${site.id}`;
  const [pageId, setPageIdState] = useState(() => { try { const saved = localStorage.getItem(pageKey); return site.pages.some((p) => p.id === saved) ? saved! : site.pages[0]!.id; } catch { return site.pages[0]!.id; } });
  const setPageId = useCallback((id: string) => { setPageIdState(id); try { localStorage.setItem(pageKey, id); } catch {} }, [pageKey]);
  const [leftTab, setLeftTab] = useState(() => { try { return (localStorage.getItem("atelier:editmode") || "write") === "write" ? "pages" : "layers"; } catch { return "pages"; } });
  const [preset, setPreset] = useState<string>("base");
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [measured, setMeasured] = useState<number>(0);
  const [mode, setMode] = useState(site.theme.defaultMode);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [drop, setDrop] = useState<DropState>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(() => { if (role === "writer") return "write"; try { return (localStorage.getItem("atelier:editmode") as EditMode) || "write"; } catch { return "design"; } });
  // Un rédacteur reste en Écriture (l'onglet Design est désactivé avec son explication).
  const switchMode = useCallback((m: EditMode) => { if (writer && m !== "write") return; setEditMode(m); setLeftTab((t) => (m === "write" && (t === "layers" || t === "theme") ? "pages" : t)); try { localStorage.setItem("atelier:editmode", m); } catch {} }, [writer]);
  const [showGrid, setShowGrid] = useState<boolean>(() => { try { return localStorage.getItem("atelier:grid") === "1"; } catch { return false; } });
  const toggleGrid = useCallback(() => setShowGrid((g) => { try { localStorage.setItem("atelier:grid", g ? "0" : "1"); } catch {} return !g; }), []);
  const [previewState, setPreviewState] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  // Panneau de gauche repliable par mode, replié par défaut en mode Animation : l'aperçu a besoin de place pour voir bouger, et les
  // calques restent joignables par le fil d'Ariane et la pioche (audit n°4 · E1). Choix mémorisé.
  const [leftHidden, setLeftHidden] = useState<Record<string, boolean>>(() => { try { return JSON.parse(localStorage.getItem("atelier:left-hidden") || "{}") as Record<string, boolean>; } catch { return {}; } });
  const leftCollapsed = leftHidden[editMode] ?? editMode === "animate";
  const toggleLeft = useCallback(() => setLeftHidden((m) => { const next = { ...m, [editMode]: !(m[editMode] ?? editMode === "animate") }; try { localStorage.setItem("atelier:left-hidden", JSON.stringify(next)); } catch {} return next; }), [editMode]);
  // Largeur du panneau Animation quand une ligne de temps est ouverte : poignée sur son bord, de 360 à 720 px, mémorisée.
  const [animPanelW, setAnimPanelW] = useState<number>(() => { try { const n = Number(localStorage.getItem("atelier:anim-panel-w")); return n >= 360 && n <= 720 ? n : 440; } catch { return 440; } });
  const showLeft = useCallback(() => setLeftHidden((m) => { const next = { ...m, [editMode]: false }; try { localStorage.setItem("atelier:left-hidden", JSON.stringify(next)); } catch {} return next; }), [editMode]);
  const saveAnimPanelW = (w: number) => { const c = Math.round(Math.min(720, Math.max(360, w))); setAnimPanelW(c); try { localStorage.setItem("atelier:anim-panel-w", String(c)); } catch {} };
  const [compareMode, setCompareMode] = useState(false);
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
  // Composant ouvert dans les calques (sélectionner un nœud d'un composant, depuis l'aperçu, l'ouvre ; un nœud de page referme).
  const [editingComponent, setEditingComponent] = useState<string | null>(null);
  const select = useCallback((id: string | null) => {
    setSelected(id);
    if (!id) return;
    const owner = index.get(id)?.owner;
    if (owner) setEditingComponent("component" in owner ? owner.component : null);
    const ancestors: string[] = [];
    let cur = index.get(id)?.parent ?? null;
    while (cur) { ancestors.push(cur.id); cur = index.get(cur.id)?.parent ?? null; }
    if (ancestors.length) setOpenMap((m) => { const n = { ...m }; ancestors.forEach((a) => { n[a] = true; }); return n; });
    window.requestAnimationFrame(() => document.querySelector(`[data-row-id="${id}"]`)?.scrollIntoView({ block: "nearest" }));
  }, [index]);

  void previewKey;
  const post = useCallback((msg: ToPreview) => frame.current?.contentWindow?.postMessage(msg, window.location.origin), []);

  // --- mode Animation : l'animation ouverte dans la ligne de temps, rattachée à la page où elle a été ouverte.
  // Elle se referme d'elle-même si l'on change de page ou si son déclencheur disparaît (annuler, retirer, supprimer l'élément).
  const [timeline, setTimeline] = useState<{ page: string; open: OpenTimeline }>({ page: "", open: null });
  const openTl = useMemo(() => (timeline.page === page.id ? validOpenTimeline(site, timeline.open) : null), [timeline, page.id, site]);
  /** Ouvre une animation (ou referme la ligne de temps) et sélectionne son hôte ; s'il est sur une autre page, on y va. */
  const openAnimation = useCallback((o: OpenTimeline) => {
    const owner = o ? index.get(o.hostId)?.owner : undefined;
    const target = owner && "page" in owner ? owner.page : page.id;
    if (target !== page.id) {
      setPageId(target); setFrameReady(false);
      // Changer de page en ouvrant une animation se dit (tests simulés, PR4 : le changement était passé inaperçu).
      const p = site.pages.find((x) => x.id === target);
      if (p) notify(`Page « ${p.name[site.settings.defaultLocale] ?? p.path} » : cette animation est lancée depuis cette page`, "info");
    }
    setTimeline({ page: target, open: o });
    if (o) select(o.hostId);
  }, [index, page.id, setPageId, select, site, notify]);
  /** « Animer cet élément » : passe en mode Animation sur l'élément, en ouvrant l'animation du déclencheur demandé (sinon du premier). */
  const animateNode = useCallback((node: Node, triggerId?: string) => {
    if (writer) return;
    const t = (node.triggers ?? []).find((x) => x.id === triggerId) ?? node.triggers?.[0];
    switchMode("animate");
    // Un élément enchaîné n'a pas de déclencheur à lui : on ouvre l'animation qui le fait apparaître.
    const ap = t ? undefined : appearanceOf(site, node.id);
    if (t) openAnimation({ animationId: t.animation, hostId: node.id, triggerId: t.id });
    else if (ap) { openAnimation({ animationId: ap.animation.id, hostId: ap.hostId, triggerId: ap.trigger.id }); select(node.id); }
    else select(node.id);
  }, [writer, switchMode, openAnimation, select, site]);
  // Pioche de la ligne de temps : le prochain élément cliqué (aperçu, calques, fil d'Ariane) devient une piste, sans changer la sélection.
  const pickRef = useRef<((id: string) => void) | null>(null);
  const [picking, setPicking] = useState(false);
  const selectedRef = useRef<string | null>(null);
  useEffect(() => { selectedRef.current = selected; }, [selected]);
  const setPick = useCallback((handler: ((id: string) => void) | null) => { pickRef.current = handler; setPicking(!!handler); }, []);
  /** Remet l'élément à la pioche s'il y en a une ; l'aperçu retrouve alors le contour de la sélection. Rend faux sinon. */
  const consumePick = useCallback((id: string) => {
    const handler = pickRef.current;
    if (!handler) return false;
    setPick(null);
    handler(id);
    post({ type: "atelier:highlight", id: selectedRef.current });
    return true;
  }, [setPick, post]);
  const selectOrPick = useCallback((id: string) => { if (!consumePick(id)) select(id); }, [consumePick, select]);
  // Repère de la piste active dans l'aperçu, reposé quand l'aperçu se recharge.
  const targetsRef = useRef<{ ids: string[]; label?: string }>({ ids: [] });
  const showTargets = useCallback((ids: string[], label?: string) => { targetsRef.current = { ids, label }; post({ type: "atelier:anim-targets", ids, label }); }, [post]);
  useEffect(() => { if (frameReady && targetsRef.current.ids.length) post({ type: "atelier:anim-targets", ...targetsRef.current }); }, [frameReady, post]);
  // L'aperçu montre l'instant de la tête de lecture ; la valeur est gardée pour la reposer quand l'aperçu se recharge.
  const scrubTime = useRef<number | null>(null);
  const scrub = useCallback((time: number | null) => {
    scrubTime.current = time;
    if (time === null || !openTl) post({ type: "atelier:scrub-stop" });
    else post({ type: "atelier:scrub", id: openTl.hostId, trigger: openTl.triggerId, time });
  }, [openTl, post]);
  useEffect(() => { if (frameReady && openTl && scrubTime.current !== null) post({ type: "atelier:scrub", id: openTl.hostId, trigger: openTl.triggerId, time: scrubTime.current }); }, [frameReady, openTl, post]);


  // Entrées de la version publiée (id → date) : le tableau compte ce qui est publié ici mais pas encore en ligne.
  const [publishedEntries, setPublishedEntries] = useState<Record<string, string> | undefined>(undefined);
  const loadPublished = useCallback(() => { void fetch(`/api/sites/${initialSite.id}/publish`).then(async (r) => { if (r.ok) { const b = (await r.json()) as { publishedEntries?: Record<string, string> }; setPublishedEntries(b.publishedEntries ?? {}); } }).catch(() => {}); }, [initialSite.id]);
  useEffect(() => { loadPublished(); }, [loadPublished]);
  /** Entrées des bases (hors document) et base ouverte en vue tableur. */
  const ents = useEntries(initialSite.id, initialEntries, notify);
  const [dbOpen, setDbOpen] = useState<string | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishTab, setPublishTab] = useState<"publish" | "settings">("publish");
  const formForOpen = useMemo(() => (dbOpen ? findForms(site).find((f) => formDatabaseId(f.formId) === dbOpen) : undefined), [dbOpen, site]);
  // Modèle de page : l'aperçu se fait avec une entrée au choix (publiée, pour que l'adresse existe).
  const template = useMemo(() => templateOf(site, page.id), [site, page.id]);
  const [previewEntryByPage, setPreviewEntryByPage] = useState<Record<string, string>>({});
  const templateEntries = useMemo(() => (template ? ents.entries.filter((e) => e.database === template.database.id && e.status === "published") : []), [template, ents.entries]);
  const previewEntry = templateEntries.find((e) => e.id === previewEntryByPage[page.id]) ?? templateEntries[0];
  const previewBase = `/preview/${site.id}`;
  const previewPath = template && previewEntry ? `${previewBase}${entryPath(template.database, previewEntry) ?? ""}` : page.kind === "template" ? `${previewBase}/__template/${page.id}` : `${previewBase}${page.path === "/" ? "" : page.path}`;
  /** « Tester sur le site » : l'onglet Aperçu, où l'élément arrive à l'écran comme pour un visiteur (audit n°5 · R4). */
  const testOnSite = useCallback((nodeId?: string) => { window.open(testOnSiteUrl(previewPath, nodeId), "_blank"); }, [previewPath]);
  const dataSource = useMemo(() => (selected ? dataSourceFor(site, index, page, selected) : undefined), [site, index, page, selected]);

  /** Supprimer une base : ses entrées partent (sans retour), ses pages modèles redeviennent fixes, ses vues restent à reconfigurer. */
  const deleteDatabase = useCallback(async (dbId: string) => {
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
    if (!(await askConfirm({ title: lines[0]!, consequences: lines.slice(2).map((l) => l.replace(/^• /, "")), action: "Supprimer la base", danger: true }))) return;
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

  const fitHeadings = useCallback((node: Node): Node => fitHeadingsInPage(page.root, node), [page.root]);
  const addBlock = useCallback((preset: BlockPreset) => {
    let node = fitHeadings(preset.make(site));
    const to = planInsert(index, page.root, selected, "auto", node);
    const ok = canInsertUnder(index, to.parent, node);
    if (!ok.ok) { notify(ok.reason); return; }
    if (node.type === "field") node = { ...node, props: { ...node.props, name: uniqueFieldName(index.get(to.parent)?.node.children ?? [], String(node.props.name ?? "champ")) } };
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
  /** Exécute un plan d'écriture du modèle : opérations, sélection, reprise de l'édition dans l'aperçu. */
  const runPlan = useCallback((plan: TextPlan | null) => {
    if (!plan) return;
    doc.commit(plan.ops.length === 1 ? plan.ops[0]! : { op: "batch", ops: plan.ops, label: plan.label }, { label: plan.label });
    if (plan.select !== undefined) select(plan.select);
    if (plan.edit) { const edit = plan.edit; window.setTimeout(() => post({ type: "atelier:edit-text", id: edit.id, caret: edit.caret }), 30); }
  }, [doc, select, post]);
  const splitNode = useCallback((id: string, before: Inline[], after: Inline[]) => runPlan(planSplit(index, id, before, after, locale)), [index, locale, runPlan]);
  /** Retour arrière dans un bloc vide : on le retire et on reprend l'édition du texte précédent. */
  const mergePrev = useCallback((id: string) => runPlan(planMergePrev(index, id)), [index, runPlan]);
  /** Menu « / » : insère le bloc après le texte courant, ou à sa place s'il est vide. */
  const slashInsert = useCallback((id: string, presetId: string, replace: boolean) => {
    const preset = presetById(presetId);
    if (!preset) return;
    const plan = planSlashInsert(site, index, id, fitHeadings(preset.make(site)), preset.label, replace);
    if (plan && "error" in plan) { notify(plan.error); return; }
    runPlan(plan);
  }, [presetById, index, site, notify, fitHeadings, runPlan]);

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
      if (!isAtelierMessage(e)) return;
      const m = e.data as FromPreview;
      if (m.type === "atelier:select" && m.id && pickRef.current) { consumePick(m.id); return; }
      if (m.type === "atelier:select" && m.id) {
        select(m.id);
        const n = index.get(m.id)?.node;
        const boundPath = n && n.type === "text" ? (n.bindings?.content?.path ?? ((n.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).find((seg): seg is Extract<Inline, { t: "bind" }> => seg.t === "bind")?.binding.path) : undefined;
        if (n && boundPath) {
          const dbName = (() => { const e = index.get(m.id); let cur = e?.parent ?? null; while (cur) { if (cur.type === "collection") return site.databases.find((d) => d.id === cur!.props.database)?.name[locale]; cur = index.get(cur.id)?.parent ?? null; } return site.databases.find((d) => d.pageTemplates?.some((t) => t.page === page.id))?.name[locale]; })();
          notify(`Ce texte vient de la base de données${dbName ? ` « ${dbName} »` : ""} (champ ${boundPath}) : il se modifie dans la base, pas dans la page.`, "info");
        }
      }
      if (m.type === "atelier:ready") setFrameReady(true);
      if (m.type === "atelier:move") moveNode(m.id, m.target, m.position);
      if (m.type === "atelier:drop-block") dropBlock(m.preset, m.target, m.position);
      if (m.type === "atelier:text" && Array.isArray(m.content)) setNodeContent(m.id, m.content);
      if (m.type === "atelier:split") splitNode(m.id, m.before, m.after);
      if (m.type === "atelier:merge-prev") mergePrev(m.id);
      if (m.type === "atelier:slash") slashInsert(m.id, m.preset, !!m.replace);
      if (m.type === "atelier:style-in-context") { switchMode("design"); select(m.id); }
      if (m.type === "atelier:set-style") doc.commit({ op: "node.set", id: m.id, path: stylePath(activeBpRef.current, m.prop), value: m.value as StyleValue | undefined }, { label: `${m.prop}` });
      if (m.type === "atelier:set-tag") doc.commit({ op: "node.set", id: m.id, path: "props.tag", value: m.tag }, { label: "Type de bloc" });
      if (m.type === "atelier:pick-image") { const target = m.id; select(target); openMediaLibrary({ value: (index.get(target)?.node.props.asset as string | null) ?? null, onPick: (assetId) => doc.commit({ op: "node.set", id: target, path: "props.asset", value: assetId }, { label: "Changer l'image" }) }); }
      if (m.type === "atelier:remove") { const loc = index.get(m.id); if (loc?.parent) { doc.commit({ op: "batch", ops: planRemoveNode(doc.site, m.id), label: "Supprimer" }, { label: "Supprimer" }); select(loc.parent.id); notify(`${nodeLabel(loc.node)} supprimé`, "info", { label: "Annuler", run: () => doc.undo() }); } }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [moveNode, select, dropBlock, setNodeContent, splitNode, mergePrev, slashInsert, switchMode, doc, index, site, locale, page.id, notify, consumePick]);

  useEffect(() => { if (frameReady) post({ type: "atelier:site", site, containers: [...index.values()].filter((l) => ["box", "list", "listItem", "link", "form", "item", "slot"].includes(l.node.type)).map((l) => l.node.id), links: [...index.values()].filter((l) => l.node.type === "link" || (editMode === "write" && l.node.type === "collection")).map((l) => l.node.id), textNodes: textNodeIds, compounds: compoundIds(site, editMode), editMode, blocks: blockInfos, pages: site.pages.filter((p) => p.kind === "static").map((p) => ({ path: p.path, name: p.name[locale] ?? p.path })) }); }, [site, index, textNodeIds, frameReady, post, editMode, blockInfos, locale]);
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
  // Navigation au clavier dans les calques : le focus suit la ligne sélectionnée tant qu'il est dans l'arbre.
  useEffect(() => {
    const active = document.activeElement as HTMLElement | null;
    if (!selected || !active?.closest("[role=tree]")) return;
    document.querySelector<HTMLElement>(`[role=treeitem][data-row-id="${CSS.escape(selected)}"]`)?.focus();
  }, [selected]);
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
  // Fil d'Ariane de la sélection, en haut du panneau de droite : remonter vers un conteneur d'un clic.
  const selectionTrail = useMemo(() => (selected ? selectionPath(site, selected) : []), [site, selected]);
  const treeRoot = editingComponent ? site.components.find((c) => c.id === editingComponent)?.root ?? page.root : page.root;
  const layerMarks = useMemo(() => {
    if (editMode !== "animate") return undefined;
    const anim = openTl ? animationById(site, openTl.animationId) : undefined;
    return { triggers: triggerHosts(treeRoot, treeRoot === page.root ? page : undefined), animated: anim && openTl ? animatedNodes(anim, openTl.hostId) : new Set<string>() };
  }, [editMode, treeRoot, openTl, site, page]);
  useEffect(() => {
    type KeyLike = { key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey?: boolean; preventDefault: () => void; fromPreview?: boolean; target?: EventTarget | null };
    const onKey = (e: KeyLike) => {
      const meta = e.metaKey || e.ctrlKey;
      // Dans un champ de saisie, le clavier appartient au champ : ⌘Z annule la frappe, pas le document ; ⌘K n'ouvre pas la palette.
      if (!e.fromPreview && (isTyping() || isEditableTarget(e.target ?? null))) return;
      if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); return; }
      if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "g") { e.preventDefault(); toggleGrid(); return; }
      if (paletteOpen) return;
      if (meta && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) doc.redo(); else doc.undo(); return; }
      const loc = selected ? index.get(selected) : undefined;
      if (e.key === "Escape") { if (pickRef.current) { setPick(null); return; } select(null); return; }
      if (!loc) return;
      // Supprimer, les flèches et Entrée ne pilotent les calques que depuis l'espace de travail (calques, aperçu, rien de focalisé) :
      // sur un bouton ou un onglet focalisé, ces touches gardent leur sens natif.
      if (!e.fromPreview && !focusInWorkspace() && !meta) return;
      if (meta && e.key.toLowerCase() === "c") { e.preventDefault(); clipboard.current = structuredClone(loc.node); void navigator.clipboard?.writeText(JSON.stringify(loc.node)).catch(() => {}); notify("Copié", "success"); return; }
      if (meta && e.key.toLowerCase() === "x") { e.preventDefault(); if (!loc.parent) return; clipboard.current = structuredClone(loc.node); doc.commit({ op: "batch", ops: planRemoveNode(doc.site, loc.node.id), label: "Couper" }, { label: "Couper" }); select(loc.parent.id); return; }
      if (meta && e.key.toLowerCase() === "v") { e.preventDefault(); if (!clipboard.current) return; const { node: copy } = cloneWithNewIds(clipboard.current, newId); const to = planInsert(index, page.root, loc.node.id, "after"); const ok = canInsertUnder(index, to.parent, copy); if (!ok.ok) { notify(ok.reason); return; } doc.commit({ op: "node.insert", parent: to.parent, index: to.index, node: copy }, { label: "Coller" }); select(copy.id); return; }
      if (meta && e.key.toLowerCase() === "d") { e.preventDefault(); if (!loc.parent) return; const { node: copy } = cloneWithNewIds(loc.node, newId); doc.commit({ op: "node.insert", parent: loc.parent.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); select(copy.id); return; }
      if ((e.key === "Backspace" || e.key === "Delete") && loc.parent) { e.preventDefault(); doc.commit({ op: "batch", ops: planRemoveNode(doc.site, loc.node.id), label: "Supprimer" }, { label: "Supprimer" }); select(loc.parent.id); notify(`${nodeLabel(loc.node)} supprimé`, "info", { label: "Annuler", run: () => doc.undo() }); return; }
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
    const onMsg = (e: MessageEvent) => { if (!isAtelierMessage(e)) return; const m = e.data as FromPreview; if (m.type === "atelier:key") onKey({ key: m.key, metaKey: m.metaKey, ctrlKey: m.ctrlKey, shiftKey: m.shiftKey, altKey: m.altKey, preventDefault() {}, fromPreview: true }); };
    window.addEventListener("keydown", onWindowKey);
    window.addEventListener("message", onMsg);
    return () => { window.removeEventListener("keydown", onWindowKey); window.removeEventListener("message", onMsg); };
  }, [doc, selected, index, openMap, select, paletteOpen, page.root, notify, toggleGrid, editMode, post, locale, setPick]);

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
  const breakpoint = activeBp === BASE ? "Tous les écrans" : site.settings.breakpoints.find((b) => b.id === activeBp)?.name ?? activeBp;
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
  const runComponentPlan = useCallback((plan: ComponentPlan) => {
    if (!plan.ok) { notify(plan.reason); return; }
    doc.commit({ op: "batch", ops: plan.ops, label: plan.label }, { label: plan.label });
    if (plan.component) notify(`Composant « ${plan.component.name} » créé : il apparaît dans Ajouter → Composants.`, "success");
    if (plan.select) select(plan.select);
  }, [doc, notify, select]);
  const makeComponent = useCallback((name: string) => { const loc = selected ? index.get(selected) : undefined; if (loc) runComponentPlan(planMakeComponent(site, loc, name)); }, [selected, index, site, runComponentPlan]);
  const detachInstance = useCallback(() => { const loc = selected ? index.get(selected) : undefined; if (loc) runComponentPlan(planDetach(site, loc)); }, [selected, index, site, runComponentPlan]);
  const commands = useMemo<Command[]>(() => {
    const cmds: Command[] = [
      { id: "undo", group: "Édition", label: "Annuler", keys: "⌘Z", icon: Undo2, run: doc.undo },
      { id: "redo", group: "Édition", label: "Rétablir", keys: "⇧⌘Z", icon: Redo2, run: doc.redo },
      ...(writer ? [] : [{ id: "settings", group: "Site", label: "Réglages du site… (adresse, référencement, 404, redirections, code, export, partage)", icon: Settings2, keywords: "réglages sous-domaine seo favicon redirection export partage", run: () => { setPublishTab("settings"); setPublishOpen(true); } }]),
      { id: "preview", group: "Affichage", label: "Ouvrir l'aperçu dans un nouvel onglet", icon: ExternalLink, run: () => window.open(previewPath, "_blank") },
      { id: "mode:write", group: "Affichage", label: "Mode Écriture", run: () => switchMode("write") },
      ...(writer ? [] : [{ id: "mode:design", group: "Affichage", label: "Mode Design", run: () => switchMode("design") }, { id: "mode:animate", group: "Affichage", label: "Mode Animation", icon: Zap, keywords: "animation ligne de temps déclencheur images-clés", run: () => switchMode("animate") }]),
      { id: "grid", group: "Affichage", label: showGrid ? "Masquer la grille de mise en page" : "Afficher la grille de mise en page", keys: "⌃G", icon: Grid3x3, run: toggleGrid },
      ...site.theme.modes.map((m) => ({ id: `mode:${m.id}`, group: "Affichage", label: `Aperçu en mode ${m.name.toLowerCase()}`, icon: m.id === "dark" ? Moon : Sun, run: () => setMode(m.id) })),
      ...PRESETS.map((p) => ({ id: `width:${p.id}`, group: "Affichage", label: `Largeur ${p.label.toLowerCase()}`, run: () => { setPreset(p.id); setCustomWidth(null); } })),
      ...[{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "data", label: "Données", icon: DatabaseIcon }, { id: "theme", label: "Thème", icon: Palette }].map((t) => ({ id: `tab:${t.id}`, group: "Panneaux", label: `Afficher ${t.label}`, icon: t.icon, run: () => { setLeftTab(t.id); showLeft(); } })),
      ...site.pages.map((p) => ({ id: `page:${p.id}`, group: "Pages", label: `Aller à ${p.name[locale] ?? p.path}`, icon: FileText, keywords: p.path, run: () => { setPageId(p.id); select(null); setFrameReady(false); } })),
      { id: "newpage", group: "Pages", label: "Nouvelle page…", icon: Plus, run: () => setLeftTab("pages") },
      { id: "media", group: "Affichage", label: "Images du site…", icon: ImagesIcon, keywords: "médias bibliothèque photos", run: () => openMediaLibrary() },
      ...site.databases.map((d) => ({ id: `db:${d.id}`, group: "Données", label: `Ouvrir la base ${d.name[locale] ?? d.slug}`, icon: DatabaseIcon, keywords: "base données tableau entrées", run: () => setDbOpen(d.id) })),
      ...allPresets(site).map((b) => ({ id: `add:${b.id}`, group: "Ajouter un bloc", label: b.label, icon: b.icon, keywords: `${b.description} ${b.keywords ?? ""}`, run: () => addBlock(b) })),
    ];
    if (selected && index.get(selected)?.parent) {
      cmds.push({ id: "dup", group: "Édition", label: "Dupliquer la sélection", keys: "⌘D", run: () => { const loc = index.get(selected)!; const { node: cloned } = cloneWithNewIds(loc.node, newId); const copy = cloned.type === "field" ? { ...cloned, props: { ...cloned.props, name: uniqueFieldName(loc.parent!.children ?? [], String(cloned.props.name ?? "champ")) } } : cloned; doc.commit({ op: "node.insert", parent: loc.parent!.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); select(copy.id); } });
      cmds.push({ id: "del", group: "Édition", label: "Supprimer la sélection", keys: "⌫", run: () => { const loc = index.get(selected)!; doc.commit({ op: "batch", ops: planRemoveNode(doc.site, selected), label: "Supprimer" }, { label: "Supprimer" }); select(loc.parent!.id); } });
      const sel = index.get(selected)!.node;
      if (!writer) cmds.push({ id: "animate-node", group: "Apparition", label: `Animer « ${nodeLabel(sel)} »…`, icon: Zap, keywords: "animation mode ligne de temps déclencheur images-clés animer cet élément", run: () => animateNode(sel) });
      for (const p of ANIMATION_PRESETS.filter((x) => x.group === "Apparition")) cmds.push({ id: `appear:${p.id}`, group: "Apparition", label: `Apparition · ${p.label}`, icon: Sparkles, keywords: "animation apparition défilement préréglage", run: () => doc.commit({ op: "batch", ops: planAppearancePreset(site, sel.id, p.id), label: `Apparition · ${p.label}` }, { label: `Apparition · ${p.label}` }) });
      if (sel.type === "instance") cmds.push({ id: "detach", group: "Édition", label: "Détacher l'instance du composant", icon: Puzzle, run: detachInstance });
      else cmds.push({ id: "makecmp", group: "Édition", label: `Faire de « ${nodeLabel(sel)} » un composant`, icon: Puzzle, keywords: "composant réutiliser", run: () => makeComponent(sel.name ?? nodeLabel(sel)) });
    }
    const seen = new Set<string>();
    const nodes: Command[] = [];
    const visit = (n: Node) => { const label = nodeLabel(n); if (!seen.has(n.id)) { seen.add(n.id); nodes.push({ id: `sel:${n.id}`, group: "Sélectionner un calque", label, icon: nodeIcon(n), keywords: n.type, run: () => select(n.id) }); } n.children?.forEach(visit); };
    visit(page.root);
    return [...cmds, ...nodes.slice(0, 80)];
  }, [doc, site, locale, page.root, previewPath, selected, index, select, addBlock, showGrid, toggleGrid, switchMode, setPageId, makeComponent, detachInstance, writer, animateNode, showLeft]);
  const setOpen = useCallback((id: string, open: boolean) => setOpenMap((m) => ({ ...m, [id]: open })), []);
  const rename = useCallback((id: string, name: string | null | undefined) => {
    setEditing(null);
    if (name === undefined) return;
    const cur = index.get(id)?.node.name;
    if ((name ?? undefined) === cur) return;
    doc.commit({ op: "node.set", id, path: "name", value: name ?? undefined }, { label: "Renommer" });
  }, [index, doc]);

  return (
    <ConfirmProvider><MediaLibraryProvider site={site} entries={ents.entries} commit={doc.commit} saveEntry={ents.save} onGoTo={goToUsage} readOnly={writer}>
    {/* En mode Animation, la colonne de droite s'élargit en poussant le canevas quand une ligne de temps est ouverte (cadrage § 4.1). */}
    <div className="h-full grid grid-rows-[48px_1fr]" style={{ gridTemplateColumns: focusMode ? "minmax(0,1fr)" : `${leftCollapsed ? "" : "300px "}minmax(0,1fr) ${editMode === "animate" && openTl ? animPanelW : 360}px` }}>
      <header className="flex items-center gap-2 px-3 border-b border-line bg-panel" style={{ gridColumn: "1 / -1" }}>
        <Link href="/" className="font-semibold text-base tracking-tight text-ink hover:text-accent" title="Retour à vos sites">{PRODUCT_NAME}</Link>
        <Separator vertical />
        {/* Sous 1440 px, la barre du haut garde l'essentiel : le nom du site, les images et la palette (⌘K) passent en retrait. */}
        <span className="hidden min-[1440px]:inline text-sm text-muted truncate max-w-[200px]" title={site.name}>{site.name}</span>
        <span className="hidden min-[1440px]:inline text-dim">/</span>
        <span className="text-sm text-ink truncate max-w-[160px]">{page.name[locale]}</span>
        {page.kind === "template" ? <Badge tone="accent" title="Cette page s'affiche une fois par entrée de sa base">page par entrée</Badge> : null}
        {template ? (
          <div className="flex items-center gap-1 ml-2" title="Modèle de page : quelle entrée afficher dans l'aperçu">
            <Eyebrow as="span">Entrée</Eyebrow>
            {templateEntries.length ? <Select className="max-w-[220px]" value={previewEntry?.id ?? ""} options={templateEntries.map((e) => ({ value: e.id, label: String(e.values[template.database.titleField] ?? "") || "Sans titre" }))} onValueChange={(id) => { setPreviewEntryByPage((m) => ({ ...m, [page.id]: id })); select(null); setFrameReady(false); }} /> : <Badge tone="warning" title="Sans entrée publiée, la page s'affiche avec ses textes de repli">Aucune entrée publiée dans {template.database.name[locale] ?? template.database.slug}</Badge>}
          </div>
        ) : null}
        <div className="ml-4"><Tabs variant="pill" label="Mode" tabs={MODES.map((m) => ({ ...m, disabled: m.id === "code" || (writer && m.id !== "write"), hint: writer && (m.id === "design" || m.id === "animate") ? "Réservé aux éditeurs du site" : m.hint }))} value={editMode} onChange={(m) => switchMode(m as EditMode)} /></div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden min-[1440px]:block"><Tabs variant="pill" label="Largeur de l'aperçu" tabs={PRESETS.map((x) => ({ id: x.id, label: x.label }))} value={customWidth === null ? preset : ""} onChange={(id) => { setPreset(id); setCustomWidth(null); }} /></div>
          <Select className="min-[1440px]:hidden w-[104px]" value={customWidth === null ? preset : ""} placeholder="Libre" options={PRESETS.map((x) => ({ value: x.id, label: x.label }))} onValueChange={(id) => { setPreset(id); setCustomWidth(null); }} />
          {/* Sous 1440 px : la largeur se règle à la poignée du canevas, qui rappelle aussi la taille d'écran active. */}
          <span className="hidden min-[1440px]:contents">{editMode === "design" ? <><NumberInput className="w-[92px]" unit="px" min={MIN_WIDTH} max={MAX_WIDTH} step={10} title="Largeur de l'aperçu (320 à 4000 px)" value={Math.round(effective) || ""} onValueChange={(v) => setCustomWidth(v === "" ? null : v)} />
          <Badge tone="accent" title="Taille d'écran active : les réglages de style se posent dessus">{breakpoint}</Badge></> : null}</span>
          {scale < 1 ? <span className="hidden min-[1440px]:contents"><Badge title="Aperçu réduit pour tenir dans la zone">{Math.round(scale * 100)} %</Badge></span> : null}
          <IconButton label={showGrid ? "Masquer la grille de mise en page (⌃G)" : "Afficher la grille de mise en page (⌃G)"} icon={Grid3x3} active={showGrid} onClick={toggleGrid} />
          {focusMode ? null : <IconButton label={leftCollapsed ? "Afficher le panneau de gauche (pages, calques, ajouter…)" : "Masquer le panneau de gauche"} icon={leftCollapsed ? PanelLeftOpen : PanelLeftClose} active={!leftCollapsed} onClick={toggleLeft} />}
          <IconButton label={focusMode ? "Quitter le mode concentration" : "Mode concentration : masquer les panneaux"} icon={focusMode ? Minimize2 : Maximize2} active={focusMode} onClick={() => setFocusMode((v) => !v)} />
          <span className="hidden min-[1440px]:contents">{editMode === "design" ? <IconButton label={compareMode ? "Quitter la comparaison responsive" : "Comparer avec le mobile"} icon={Columns2} active={compareMode} onClick={() => setCompareMode((v) => !v)} /> : null}</span>
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            <IconButton label={`Annuler (${mod()}Z)`} icon={Undo2} disabled={!doc.canUndo} onClick={doc.undo} />
            <IconButton label={`Rétablir (⇧${mod()}Z)`} icon={Redo2} disabled={!doc.canRedo} onClick={doc.redo} />
          </div>
          <Badge tone={status.tone} title={doc.error ?? `Version ${doc.version}`}>{status.label}<span className="hidden min-[1440px]:inline"> · v{doc.version}</span></Badge>
          <span className="hidden min-[1440px]:contents">
          <Separator vertical />
          <div className="flex items-center gap-0.5">
            {site.theme.modes.map((m) => <IconButton key={m.id} label={`Aperçu en mode ${m.name.toLowerCase()}`} icon={m.id === "dark" ? Moon : Sun} active={mode === m.id} onClick={() => setMode(m.id)} />)}
          </div>
          </span>
          <Separator vertical />
          {/* Sous 1440 px : images et palette restent au clavier (⌘K), la barre garde la publication. */}
          <span className="hidden min-[1440px]:contents">
            <IconButton label="Images du site" icon={ImagesIcon} onClick={() => openMediaLibrary()} />
            <IconButton label={`Palette de commandes (${mod()}K)`} icon={CommandIcon} onClick={() => setPaletteOpen(true)} />
          </span>
          <Button variant="ghost" icon={ExternalLink} title="Aperçu dans un nouvel onglet" aria-label="Aperçu dans un nouvel onglet" onClick={() => window.open(previewPath, "_blank")}><span className="hidden min-[1440px]:inline">Aperçu</span></Button>
          {writer ? null : <IconButton label="Réglages du site (adresse, référencement, redirections, export, partage)" icon={Settings2} onClick={() => { setPublishTab("settings"); setPublishOpen(true); }} />}
          <Button variant="primary" icon={UploadCloud} onClick={() => setPublishOpen(true)} title={writer ? "Publier les contenus (entrées des bases)" : "Publier le site, voir l'historique, revenir en arrière"}>{writer ? "Publier les contenus" : "Publier"}</Button>
        </div>
      </header>

      {focusMode || leftCollapsed ? null : <Panel side="left">
        <Tabs label="Panneau" tabs={editMode === "write" ? [{ id: "pages", label: "Pages", icon: FileText }, { id: "add", label: "Ajouter", icon: Plus }, { id: "data", label: "Données", icon: DatabaseIcon }] : [{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }, { id: "data", label: "Données", icon: DatabaseIcon }, { id: "theme", label: "Thème", icon: Palette }]} value={leftTab} onChange={setLeftTab} className="px-1 shrink-0" />
        <div className="flex-1 overflow-auto py-1" onDragOver={(e) => { if (dragId.current || dragBlock.current) e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); setDrop(null); }}>
          {leftTab === "pages" ? (
            <PagesPanel site={site} pageId={pageId} commit={doc.commit} readOnly={writer} onOpen={(id) => { setPageId(id); select(null); setFrameReady(false); }} />
          ) : leftTab === "layers" ? (
            <div role="tree" aria-label="Calques" onDragEnd={() => { dragId.current = null; setDrop(null); }} onFocus={(e) => { if (e.target !== e.currentTarget) return; const row = e.currentTarget.querySelector<HTMLElement>('[role=treeitem][aria-selected="true"]') ?? e.currentTarget.querySelector<HTMLElement>("[role=treeitem]"); row?.focus(); }} tabIndex={selected ? -1 : 0}>
              {editingComponent ? (
                <div className="mx-2 mb-1 px-2 py-1.5 rounded-sm bg-violet-400/15 text-violet-300 text-xs flex items-center gap-2">
                  <span className="flex-1 truncate">Composant <strong className="font-medium">{site.components.find((c) => c.id === editingComponent)?.name}</strong> : toutes ses copies changent.</span>
                  <button type="button" onClick={() => { setEditingComponent(null); select(null); }} className="h-5 px-1.5 rounded-xs bg-panel text-ink hover:bg-hover whitespace-nowrap">Retour à la page</button>
                </div>
              ) : null}
              <Layer
                node={treeRoot} depth={0} selected={selected} onSelect={selectOrPick} onEnterComponent={(id) => { setEditingComponent(id); setLeftTab("layers"); select(site.components.find((c) => c.id === id)?.root.id ?? null); }}
                openMap={openMap} setOpen={setOpen}
                editing={editing} onEditStart={setEditing} onRename={rename}
                drop={drop} marks={layerMarks}
                onDragStart={(id) => { dragId.current = id; select(id); }}
                onDragOver={(id, position) => {
                  if (!((dragId.current && dragId.current !== id) || dragBlock.current)) return;
                  // Le refus se voit pendant le glissement (indicateur rouge et raison), pas seulement après le dépôt.
                  let refusal: string | null = null;
                  if (dragId.current) { const r = planMove(index, dragId.current, id, position); if (!r.ok) refusal = r.reason; }
                  else if (dragBlock.current) { const preset = allPresets(site).find((b) => b.id === dragBlock.current); const r = preset ? planDrop(index, id, position, preset.make(site)) : null; if (r && !r.ok) refusal = r.reason; }
                  setDrop((d) => (d?.id === id && d.position === position && d.refusal === refusal ? d : { id, position, refusal }));
                }}
                onDragEnd={() => { dragId.current = null; dragBlock.current = null; setDrop(null); }}
                onDropOn={(id, position) => { if (dragId.current) moveNode(dragId.current, id, position); else if (dragBlock.current) dropBlock(dragBlock.current, id, position); }}
              />
            </div>
          ) : leftTab === "data" ? (
            <DataPanel site={site} entries={ents.entries} commit={doc.commit} onOpen={setDbOpen} readOnly={writer} />
          ) : leftTab === "add" ? (
            <AddPanel site={site} target={insertTarget} onAdd={addBlock} onDragBlock={(id) => { dragBlock.current = id; if (!id) setDrop(null); }} />
          ) : (
            <ThemePanel site={site} commit={doc.commit} />
          )}
        </div>
      </Panel>}

      <main ref={canvas} className="relative min-w-0 overflow-auto bg-app flex justify-center items-start p-3">
        {editMode === "design" ? <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 rounded-md border border-accent bg-panel/95 px-3 py-1.5 text-xs font-semibold text-accent shadow-lg backdrop-blur" title="Les styles ajoutés maintenant s’appliquent à cette taille d’écran">Vous modifiez : {breakpoint}</div> : null}
        {picking ? <div role="status" className="absolute top-3 left-1/2 -translate-x-1/2 z-30 rounded-md border border-accent bg-accent text-accent-ink px-3 py-1.5 text-xs font-semibold shadow-lg">Cliquez l&apos;élément à animer dans le canevas ou les calques · Échap pour annuler</div> : null}
        {doc.error ? (
          <div role="alert" className={`fixed top-14 left-1/2 -translate-x-1/2 z-[60] max-w-[640px] flex items-center gap-2 rounded-md border px-3.5 py-2.5 text-sm font-medium shadow-2xl ${doc.status === "offline" ? "bg-warning text-warning-ink border-warning" : "bg-danger text-danger-ink border-danger"}`}>
            <AlertTriangle size={16} aria-hidden />
            <span>{doc.error}{doc.status === "offline" && doc.retryAt ? <> · <RetryCountdown at={doc.retryAt} /></> : null}</span>
            {doc.status === "offline" ? <button type="button" onClick={doc.retryNow} className="ml-2 h-7 px-2.5 rounded-sm bg-black/15 hover:bg-black/25 text-sm font-medium whitespace-nowrap">Réessayer maintenant</button> : null}
            {doc.blocked ? <button type="button" onClick={() => void doc.copyPending().then((n) => notify(n ? `${n} opération${n > 1 ? "s" : ""} copiée${n > 1 ? "s" : ""} dans le presse-papiers.` : "Rien à copier : tout était enregistré.", "info"))} className="ml-2 h-7 px-2.5 rounded-sm bg-black/15 hover:bg-black/25 text-sm font-medium whitespace-nowrap">Copier mes changements</button> : null}
            {doc.blocked ? <button type="button" onClick={() => window.location.reload()} className="h-7 px-2.5 rounded-sm bg-black/15 hover:bg-black/25 text-sm font-medium">Recharger</button> : null}
          </div>
        ) : null}
        {/* Région live permanente : elle existe avant le message, pour que les lecteurs d'écran l'annoncent. */}
        <div role="status" aria-live="polite" className={`fixed ${doc.error ? "top-[6.5rem]" : "top-14"} left-1/2 -translate-x-1/2 z-[60] max-w-[560px]`}>
          {notice ? (
            <div className={`flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium shadow-2xl animate-[atelier-toast_.25s_ease-out] ${notice.tone === "success" ? "bg-success text-success-ink border-success" : notice.tone === "info" ? "bg-accent text-accent-ink border-accent" : "bg-danger text-danger-ink border-danger"}`}>
              {notice.tone === "success" ? <CheckCircle2 size={16} aria-hidden /> : notice.tone === "info" ? <Info size={16} aria-hidden /> : <AlertTriangle size={16} aria-hidden />}
              <span>{notice.text}</span>
              {notice.action ? <button type="button" onClick={() => { notice.action!.run(); setNotice(null); }} className="ml-1 h-7 px-2.5 rounded-sm bg-black/15 hover:bg-black/25 text-sm font-medium whitespace-nowrap">{notice.action.label}</button> : null}
              <button type="button" aria-label="Fermer le message" onClick={() => setNotice(null)} className="ml-1 h-7 w-7 grid place-items-center rounded-sm hover:bg-black/15"><X size={14} aria-hidden /></button>
            </div>
          ) : null}
        </div>
        <div className={compareMode ? "relative w-full grid grid-cols-[minmax(0,1fr)_390px] items-start gap-4" : "relative flex flex-col gap-1.5"} style={compareMode ? undefined : { width: width ? `${Math.min(width, measured || width)}px` : "100%", maxWidth: "100%" }}>
          <div style={{ width: "100%", height: `calc(${frameHeight} * ${scale})`, overflow: "visible", marginTop: 0 }}>
            <div style={{ width: `${effective || measured}px`, height: frameHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <iframe ref={frame} key={previewPath} src={`${previewPath}?editor=1&mode=${mode}`} title="Aperçu" className="bg-white rounded-xs shadow-[0_0_0_1px_var(--color-line-strong),0_12px_40px_rgba(0,0,0,.45)]" style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
          {compareMode ? <aside className="relative flex flex-col gap-2">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold text-accent">Comparaison mobile · 390 px</span><Badge>lecture seule</Badge></div>
            <iframe src={`${previewPath}?mode=${mode}`} title="Comparaison mobile" className="w-[390px] max-w-full bg-white rounded-xs shadow-[0_0_0_1px_var(--color-line-strong),0_12px_40px_rgba(0,0,0,.45)]" style={{ height: frameHeight }} />
          </aside> : null}
          {compareMode ? null : <div role="separator" aria-label="Redimensionner l'aperçu" title="Glisser pour changer la largeur" onPointerDown={startResize} className="absolute top-0 -right-2.5 w-2.5 h-full cursor-col-resize group">
            <div className="absolute top-1/2 -translate-y-1/2 left-0.5 w-1 h-12 rounded-full bg-line-strong group-hover:bg-accent" />
          </div>}
        </div>
      </main>

      {focusMode ? null : <Panel side="right" className="relative">
        {editMode === "animate" && openTl ? (
          <div role="separator" aria-orientation="vertical" aria-label="Largeur du panneau Animation (flèches pour ajuster)" aria-valuemin={360} aria-valuemax={720} aria-valuenow={animPanelW} tabIndex={0}
            className="absolute left-0 top-0 bottom-0 z-40 w-1.5 -translate-x-1/2 cursor-col-resize hover:bg-accent/40 focus-visible:bg-accent/60"
            title="Glisser pour élargir ou réduire le panneau Animation"
            onPointerDown={(e) => { e.preventDefault(); const startX = e.clientX, startW = animPanelW; const onMove = (ev: PointerEvent) => setAnimPanelW(Math.round(Math.min(720, Math.max(360, startW - (ev.clientX - startX))))); const onUp = (ev: PointerEvent) => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); saveAnimPanelW(startW - (ev.clientX - startX)); }; window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); }}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); saveAnimPanelW(animPanelW + (e.shiftKey ? 80 : 20)); } if (e.key === "ArrowRight") { e.preventDefault(); saveAnimPanelW(animPanelW - (e.shiftKey ? 80 : 20)); } }} />
        ) : null}
        {selectionTrail.length > 1 ? <Breadcrumb label="Chemin de la sélection" items={selectionTrail} onSelect={selectOrPick} className="shrink-0" /> : null}
        {editMode === "animate" ? (
          <div className="flex-1 overflow-auto"><AnimationModePanel site={site} node={selectedLoc?.node ?? null} commit={doc.commit} page={page} getSite={doc.getSite} bp={activeBp} mode={mode} open={openTl} onOpen={openAnimation} scrub={scrub} onSelect={select} onPick={setPick} picking={picking} showTargets={showTargets} onTestOnSite={testOnSite} /></div>
        ) : selectedLoc ? (
          <div className="flex-1 overflow-auto"><NodeInspector key={selectedLoc.node.id} onPlay={(id, trigger) => post({ type: "atelier:play", id, trigger })} site={site} loc={selectedLoc} dataSource={dataSource} activeBp={activeBp} mode={mode} editMode={editMode} onSwitchMode={switchMode} onOpenAnimation={writer ? undefined : (triggerId) => animateNode(selectedLoc.node, triggerId)} onTestOnSite={(id) => testOnSite(id ?? selectedLoc.node.id)} onSelectNode={(id) => select(id)} onGoToBreakpoint={goToBreakpoint} onPreviewState={setPreviewState} onEditInPreview={() => post({ type: "atelier:edit-text", id: selectedLoc.node.id })} onEnterComponent={(id) => { setEditingComponent(id); setLeftTab("layers"); select(site.components.find((c) => c.id === id)?.root.id ?? null); }} onMakeComponent={makeComponent} onDetach={detachInstance} notify={notify} commit={doc.commit} onDeleted={() => { select(selectedLoc.parent?.id ?? null); notify(`${nodeLabel(selectedLoc.node)} supprimé`, "info", { label: "Annuler", run: () => doc.undo() }); }} /></div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            <PanelHeading className="px-0">Sélection</PanelHeading>
            {editMode === "write" ? <Hint>Cliquez un texte pour écrire, tapez « / » pour ajouter un bloc, glissez la poignée ⋮⋮ pour déplacer. {mod()}Z annule.</Hint> : <Hint>Cliquez un élément dans l&apos;aperçu ou dans les calques. Flèches pour naviguer, Entrée pour renommer, {mod()}D pour dupliquer, Suppr pour supprimer, glisser pour déplacer.</Hint>}
          </div>
        )}
      </Panel>}
      {paletteOpen ? <CommandPalette open onClose={() => setPaletteOpen(false)} commands={commands} /> : null}
      {dbOpen && site.databases.some((d) => d.id === dbOpen) ? <DatabaseTable site={site} db={site.databases.find((d) => d.id === dbOpen)!} entries={ents.entries} save={ents.save} saveMany={ents.saveMany} remove={ents.remove} commit={doc.commit} onClose={() => setDbOpen(null)} canEditSchema={!writer} publishedEntries={publishedEntries} saving={ents.saving} onDeleteDatabase={() => void deleteDatabase(dbOpen)} notify={notify} /> : null}
      {dbOpen && formForOpen ? <DatabaseTable site={site} db={formDatabase(site, formForOpen)} entries={ents.entries} save={ents.save} remove={ents.remove} commit={doc.commit} onClose={() => setDbOpen(null)} saving={ents.saving} readOnly /> : null}
      {publishOpen ? <PublishDialog site={site} role={role} initialTab={publishTab} version={doc.version} dirty={doc.status !== "saved" && !doc.blocked} broken={doc.blocked} commit={doc.commit} onClose={() => { setPublishOpen(false); setPublishTab("publish"); loadPublished(); }} notify={notify} /> : null}

    </div>
    </MediaLibraryProvider></ConfirmProvider>
  );
}
