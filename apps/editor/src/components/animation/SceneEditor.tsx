"use client";

import { createElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Diamond, ExternalLink, Link2, Pause, Play, Plus, SkipBack, SlidersHorizontal, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationUsages, appearanceOf, applyOps, indexSite, keyframeAt, newId, planAddTrigger, planAppearanceStart, planChainInOrder, planQuickAnimation, planAppearanceDelay, planAppearanceDuration, planAppearancePreset, planRemoveKeyframes, planRemoveTriggerWithAnimation, planSetKeyframe, planSetKeyframeEasing, planShiftKeyframes, planUpdateTrigger, trackPresetMatch } from "@atelier/model";
import { Badge, Button, Eyebrow, Hint, IconButton, Select } from "@/ui";
import { formatMs, quoteLabel, rulerTicks, snapTime, summarizeAnimation, tickLabel } from "@/lib/timeline";
import { sceneView, type SceneLaunch, type SceneRow } from "@/lib/scene-view";
import { nodeIcon, nodeLabel } from "../node-icons";
import { QuickAnimations } from "./QuickAnimations";
import { KeyframePanels } from "./KeyframePanels";
import { EasingField } from "./EasingField";
import { TriggerSettings } from "./TriggerSettings";

type Commit = (op: Op, opts?: CommitOptions) => void;

export type SceneEditorProps = {
  site: Site; getSite: () => Site; selectedId: string | null; bp: string; mode?: string; commit: Commit;
  onSelect: (id: string) => void;
  /** Montre un instant dans l'aperçu : le temps de scène, et l'instant de l'animation de l'élément sélectionné (`null` : repos). */
  scrub: (sceneTime: number | null, at?: { hostId: string; triggerId: string; time: number }) => void;
  /** Joue un lancement (déclencheur d'un hôte) dans l'aperçu. */
  onPlay: (triggerId: string, hostId: string) => void;
  onTestOnSite?: (nodeId?: string) => void;
  /** Survol d'un nom d'élément dans l'outil : le montrer dans l'aperçu (`null` : ne plus rien montrer). */
  onHover?: (id: string | null) => void;
  onClose: () => void;
};

/**
 * Le tiroir Animation recentré (24 septembre 2026, décision d'Antoine) : la scène de la section, une ligne par élément dans l'ordre de la
 * page ; une barre par élément qui bouge ; les images-clés de l'élément sélectionné sur sa ligne, qu'on pose au « + » ou en réglant une
 * propriété à la tête de lecture ; à droite, ses réglages en mots (Apparition, Vitesse, Démarre, Délai) et l'image-clé à cet instant.
 * Ni animation nommée, ni piste, ni pioche : le modèle est le même, il ne se montre plus.
 */
export function SceneEditor({ site, getSite, selectedId, bp, mode, commit, onSelect, scrub, onPlay, onTestOnSite, onHover, onClose }: SceneEditorProps) {
  const view = useMemo(() => sceneView(site, selectedId ?? undefined), [site, selectedId]);
  // La règle laisse de la marge après la fin (au moins 1 s, et 30 % de plus que la scène, au demi-seconde) : on peut tirer au-delà.
  // Elle se zoome (boutons, ⌘ ou ⌃ + molette) : la scène s'élargit et défile de côté, les noms restent en place.
  const length = Math.max(1000, Math.ceil(((view?.total ?? 0) * 1.3 + 200) / 500) * 500);
  const [zoom, setZoom] = useState(1);
  const scroller = useRef<HTMLDivElement>(null);
  // Le zoom est continu et doux (molette : un facteur par cran ; boutons : ×1,25), et garde sous la souris l'instant qu'elle survolait.
  const zoomAnchor = useRef<{ t: number; x: number } | null>(null);
  const clampZoom = (z: number) => Math.round(Math.max(1, Math.min(8, z)) * 100) / 100;
  useLayoutEffect(() => {
    const a = zoomAnchor.current; const sc = scroller.current;
    if (!a || !sc) return;
    zoomAnchor.current = null;
    sc.scrollLeft = (a.t / length) * sc.scrollWidth - a.x;
  }, [zoom, length]);
  const [playhead, setPlayhead] = useState<number | null>(null);
  // La pastille « Ajouter un état » suit la souris sur la ligne de l'élément sélectionné ; l'état se fixe là où l'on clique.
  const [hoverT, setHoverT] = useState<number | null>(null);
  // Lecture : l'aperçu joue chaque lancement, et la tête de lecture court sur la règle au même rythme ; « Pause » l'arrête où elle est.
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const playheadRef = useRef<number | null>(null);
  useEffect(() => { playheadRef.current = playhead; }, [playhead]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  // La liste des éléments à ajouter est une liste maison : une liste native ne dit pas quel choix est survolé, et le survol montre l'élément dans l'aperçu.
  // La liste est rendue hors de la zone qui défile (sinon elle y est rognée), ancrée au bouton : au-dessus s'il y a la place, sinon en dessous.
  const [addPos, setAddPos] = useState<{ left: number; top?: number; bottom?: number; maxHeight: number } | null>(null);
  const addOpen = addPos !== null;
  const setAddOpen = (open: boolean | ((o: boolean) => boolean), btn?: HTMLElement | null) => {
    const next = typeof open === "function" ? open(addOpen) : open;
    if (!next) { setAddPos(null); return; }
    const r = btn?.getBoundingClientRect();
    if (!r) { setAddPos({ left: 0, top: 0, maxHeight: 320 }); return; }
    const above = r.top - 8, below = window.innerHeight - r.bottom - 8;
    setAddPos(above >= 160 || above >= below ? { left: r.left, bottom: window.innerHeight - r.top + 4, maxHeight: Math.max(80, Math.min(320, above)) } : { left: r.left, top: r.bottom + 4, maxHeight: Math.max(80, Math.min(320, below)) });
  };
  const addRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!addOpen) return;
    const off = (e: PointerEvent) => { if (!addRef.current?.contains(e.target as globalThis.Node)) { setAddPos(null); onHover?.(null); } };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setAddPos(null); onHover?.(null); } };
    window.addEventListener("pointerdown", off); window.addEventListener("keydown", key);
    return () => { window.removeEventListener("pointerdown", off); window.removeEventListener("keydown", key); };
  }, [addOpen, onHover]);
  const rail = useRef<HTMLDivElement>(null);
  const run = (ops: Op[], label: string, coalesceKey?: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const index = useMemo(() => indexSite(site), [site]);
  const nodeOf = (id: string): Node | undefined => index.get(id)?.node;
  const selected = selectedId ? nodeOf(selectedId) : undefined;
  const ap = view?.selected;
  // La tête de lecture se pose en cliquant ou glissant la règle ; l'aperçu montre cet instant pour l'élément sélectionné.
  const place = (t: number | null) => { setPlayhead(t); scrub(t, t === null || !view ? undefined : view.scrub(t)); };
  const timeAt = (clientX: number) => { const r = rail.current?.getBoundingClientRect(); if (!r || r.width <= 0) return 0; return snapTime(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * length); };
  // ⌘ ou ⌃ + molette : un écouteur natif, non passif. React pose les siens en passif, où preventDefault est ignoré : le navigateur
  // zoomait la page entière au lieu de la règle. Un cran de molette classique (Δ = 100) fait ×1,28 ; un trackpad, des pas plus fins.
  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const r = sc.getBoundingClientRect(); const rr = rail.current?.getBoundingClientRect();
      const t = rr && rr.width > 0 ? Math.max(0, Math.min(1, (e.clientX - rr.left) / rr.width)) * length : 0;
      zoomAnchor.current = { t, x: e.clientX - r.left };
      setZoom((z) => clampZoom(z * Math.exp(-e.deltaY * 0.0025)));
    };
    sc.addEventListener("wheel", onWheel, { passive: false });
    return () => sc.removeEventListener("wheel", onWheel);
  }, [length, view]);
  const zoomBy = (f: number) => { const sc = scroller.current; if (sc) zoomAnchor.current = { t: ((sc.scrollLeft + sc.clientWidth / 2) / Math.max(1, sc.scrollWidth)) * length, x: sc.clientWidth / 2 }; setZoom((z) => clampZoom(z * f)); };
  useEffect(() => () => scrub(null), [scrub]);
  // À la sélection d'un élément qui bouge, la tête de lecture se pose à la fin de son mouvement : l'image-clé d'arrivée est sous la main.
  const lastSel = useRef<string | null>(null);
  useEffect(() => {
    if (lastSel.current === selectedId) return;
    lastSel.current = selectedId;
    const end = ap ? (ap.trigger.delay ?? 0) + ap.end : null;
    setPlayhead(end);
    scrub(end, end === null || !view ? undefined : view.scrub(end));
  }, [selectedId, ap, view, scrub]);
  const pct = (ms: number) => `${Math.round((ms / length) * 1000) / 10}%`;
  // Tirer une barre (départ), son bord droit (durée) ou un losange (image-clé) : le geste se voit pendant, s'enregistre au relâcher, en ms arrondis à 10.
  // Une barre tirée emmène ses losanges : toute l'animation de l'élément se déplace d'un bloc sur la scène (les états gardent leurs écarts).
  const [drag, setDrag] = useState<{ kind: "move" | "end" | "kf"; id: string; at?: number; dx: number } | null>(null);
  // Un glisser se termine par un clic (la souris est encore sur la barre) : ce clic-là n'ajoute pas d'état.
  const dragged = useRef(false);
  const pxToMs = (dx: number) => { const r = rail.current?.getBoundingClientRect(); return r && r.width > 0 ? (dx / r.width) * length : 0; };
  const startDrag = (e: React.PointerEvent, kind: "move" | "end" | "kf", id: string, kfAt?: number) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const startX = e.clientX;
    setDrag({ kind, id, at: kfAt, dx: 0 });
    const move = (ev: PointerEvent) => setDrag((d) => (d ? { ...d, dx: ev.clientX - startX } : d));
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
      setDrag(null);
      dragged.current = Math.abs(ev.clientX - startX) > 3;
      const delta = Math.round(pxToMs(ev.clientX - startX) / 10) * 10;
      // Un clic sans glisser sur la barre d'un autre élément : on passe à lui (sa ligne, ses réglages à droite).
      if (Math.abs(delta) < 10) { if (kind === "move" && id !== selectedId) onSelect(id); return; }
      const current = getSite();
      const cur = appearanceOf(current, id);
      if (!cur) return;
      if (kind === "move") run(planAppearanceDelay(current, id, Math.max(0, cur.delay + delta)), `Départ de ${quoteLabel(nodeLabel(nodeOf(id)!))}`);
      else if (kind === "end") run(planAppearanceDuration(current, id, Math.max(50, cur.end - cur.start + delta)), `Durée de ${quoteLabel(nodeLabel(nodeOf(id)!))}`);
      else if (kfAt !== undefined) { run(planShiftKeyframes(current, cur.animation.id, [{ track: cur.track.id, at: kfAt }], delta), "Déplacer l'état"); if (playhead !== null) place(Math.max(0, playhead + delta)); }
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };
  const shift = (kind: "move" | "end" | "kf", id: string, kfAt?: number) => (drag && drag.kind === kind && drag.id === id && (kind !== "kf" || drag.at === kfAt) ? drag.dx : 0);
  // Glisser une ligne (sa case du nom) sur un autre lancement : l'élément démarre après le dernier élément de ce lancement. Le lancement visé
  // se lit sous la souris dans la colonne des noms ; un clic sans glisser reste un clic (sélection : le clic ne suit un dépôt que si la souris
  // est relâchée sur la case de départ, c'est-à-dire quand rien n'a été déposé).
  const names = useRef<HTMLDivElement>(null);
  const [rowDrag, setRowDrag] = useState<{ id: string; from: string; over: string | null } | null>(null);
  const startRowDrag = (e: React.PointerEvent, id: string, from: string) => {
    if (e.button !== 0 || (e.target as Element).closest("[data-scene-new-state],[data-scene-remove-line]")) return;
    const startY = e.clientY;
    let moved = false, over: string | null = null;
    const launchAt = (y: number) => {
      for (const el of names.current?.querySelectorAll<HTMLElement>("[data-scene-name-cell],[data-scene-launch]") ?? []) {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && y >= r.top && y < r.bottom) return el.dataset.sceneLaunch ?? el.dataset.sceneLaunchOf ?? null;
      }
      return null;
    };
    const move = (ev: PointerEvent) => {
      if (!moved && Math.abs(ev.clientY - startY) < 4) return;
      moved = true; over = launchAt(ev.clientY);
      setRowDrag({ id, from, over });
    };
    const up = () => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
      setRowDrag(null);
      if (!moved || !over || over === from) return;
      const target = view?.launches.find((l) => l.id === over);
      const current = getSite();
      const last = target ? [...target.rows].reverse().find((r) => r !== id && appearanceOf(current, r)) : undefined;
      if (!last) return;
      run(planAppearanceStart(current, id, { kind: "after", node: last }), `${quoteLabel(nodeLabel(nodeOf(id)!))} démarre après ${quoteLabel(nodeLabel(nodeOf(last)!))}`);
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };
  const at = playhead !== null && ap ? view!.scrub(playhead)!.time : null;
  const kfHere = at !== null && ap ? keyframeAt(ap.track, at) : undefined;
  const prevKf = at !== null && ap ? [...ap.track.keyframes].filter((k) => k.at < at).sort((a, b) => b.at - a.at)[0] : undefined;

  if (!view || !selected) {
    return <div className="h-full grid place-items-center p-6 text-center" data-scene-editor="" data-scene-empty=""><Hint>Sélectionnez un élément dans l&apos;aperçu ou les calques : sa section s&apos;affiche ici, avec chaque élément sur sa ligne et ce qui le fait bouger.</Hint></div>;
  }

  // « Faire apparaître » : l'effet par défaut, après l'élément animé qui précède dans la page.
  const appear = (row: SceneRow, i: number) => {
    const n = nodeOf(row.id); if (!n) return;
    const prev = [...view.rows.slice(0, i)].reverse().find((r) => r.bar);
    let s = getSite();
    const ops = planQuickAnimation(s, n, "Apparition", "fade-up");
    s = applyOps(s, ops).site;
    const chain = prev ? planAppearanceStart(s, row.id, { kind: "after", node: prev.id }) : [];
    run([...ops, ...chain], `Faire apparaître ${quoteLabel(nodeLabel(n))}`);
    onSelect(row.id);
  };
  const playAll = () => { for (const l of view.launches) onPlay(l.triggerId, l.hostId); };
  const total = view.total;
  const startPlay = () => {
    cancelAnimationFrame(raf.current);
    setPlaying(true); setPlayhead(0); scrub(null); playAll();
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      if (t >= total) { setPlayhead(total); setPlaying(false); return; }
      setPlayhead(t);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const pausePlay = () => { cancelAnimationFrame(raf.current); setPlaying(false); place(snapTime(playheadRef.current ?? 0)); };
  // Réutiliser l'animation d'un autre élément (le clic d'un bouton sur d'autres boutons) : un déclencheur de plus, même animation, même quand.
  // Les apparitions préréglées ne s'y trouvent pas : elles se choisissent dans « Apparition ». Restent le clic, le survol, et tout ce qui est composé à la main.
  const reusable = site.animations.filter((a) => a.id !== ap?.animation.id && a.tracks.length && a.tracks.every((t) => "trigger" in t.target)).map((a) => ({ a, u: animationUsages(site, a.id).find((x) => x.node && x.node.id !== selected.id) })).filter((x) => x.u && !(selected.triggers ?? []).some((t) => t.animation === x.a.id) && !((x.u!.trigger.on === "inView" || x.u!.trigger.on === "load") && trackPresetMatch(x.a.tracks[0]!)));
  const presetLabel = (id?: string) => ANIMATION_PRESETS.find((p) => p.id === id)?.label;
  // La scène ne montre que ce qui bouge, plus l'élément sélectionné (retour d'Antoine : tout afficher était illisible) ; le reste s'ajoute par son nom.
  const visible = view.rows.filter((r) => r.bar || r.selected);
  const addable = view.rows.filter((r) => r.still && !r.selected);
  // Plusieurs lancements : les lignes sont groupées sous un séparateur qui dit ce qui les lance ; un seul lancement, rien ne le sépare.
  const grouped = view.launches.length > 1;
  const launchOf = (id: string) => view.launches.find((l) => l.rows.includes(id));
  type Item = { kind: "launch"; launch: SceneLaunch } | { kind: "still" } | { kind: "row"; row: SceneRow; launch?: SceneLaunch };
  // La section elle-même, immobile mais sélectionnée, reste en tête : c'est le parent de tout ce qui suit, pas un élément « qui ne bouge pas encore ».
  const rootStill = visible.filter((r) => !launchOf(r.id) && r.id === view.sectionId);
  const stillRows = visible.filter((r) => !launchOf(r.id) && r.id !== view.sectionId);
  const items: Item[] = grouped
    ? [...rootStill.map((row): Item => ({ kind: "row", row })), ...view.launches.flatMap((launch): Item[] => [{ kind: "launch", launch }, ...visible.filter((r) => launch.rows.includes(r.id)).map((row): Item => ({ kind: "row", row, launch }))]), ...(stillRows.length ? [{ kind: "still" } as Item] : []), ...stillRows.map((row): Item => ({ kind: "row", row }))]
    : visible.map((row): Item => ({ kind: "row", row }));
  const STILL_LABEL = "Ne bouge pas encore";
  const chainAll = () => run(planChainInOrder(getSite(), view.sectionId), `Enchaîner la scène de ${quoteLabel(view.sectionLabel)}`);
  // Retirer la ligne de temps de l'élément : son apparition s'en va, ce qui la suivait se raccroche, la ligne disparaît de la scène.
  const removeLine = () => { if (!ap) return; run(planAppearancePreset(getSite(), selected.id, ""), `Ne plus animer ${quoteLabel(nodeLabel(selected))}`); };
  const addKeyframe = () => { if (ap && at !== null) run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, at, {}), `État ajouté à ${at} ms`); };
  // Un clic n'importe où sur la ligne de l'élément sélectionné (barre comprise) pose un état à cet instant ; sur un état déjà là, la tête de lecture s'y pose.
  const addKeyframeAtScene = (sceneT: number) => {
    if (!ap) return;
    const delay = ap.trigger.delay ?? 0;
    const near = ap.track.keyframes.find((k) => Math.abs(k.at + delay - sceneT) < 20);
    if (near) { place(near.at + delay); return; }
    const at2 = Math.max(0, sceneT - delay);
    run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, at2, {}), `État ajouté à ${at2} ms`);
    place(sceneT);
  };
  const laneClick = (e: React.MouseEvent) => {
    if (dragged.current) { dragged.current = false; return; }
    if ((e.target as Element).closest("[data-scene-kf],[data-scene-ghost],[data-scene-bar-end]")) return;
    addKeyframeAtScene(timeAt(e.clientX));
  };
  // « Ajouter un état », toujours à côté du nom : à la tête de lecture si elle est libre ; sinon à mi-chemin du prochain état, ou 200 ms après le dernier.
  const addKeyframeAnywhere = () => {
    if (!ap) return;
    const kfs = [...ap.track.keyframes].map((k) => k.at).sort((a, b) => a - b);
    const cur = at ?? kfs[kfs.length - 1] ?? 0;
    let where = cur;
    if (at === null || kfs.includes(cur)) { const next = kfs.find((k) => k > cur); where = next !== undefined ? snapTime((cur + next) / 2) : cur + 200; }
    run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, where, {}), `État ajouté à ${where} ms`);
    place(where + (ap.trigger.delay ?? 0));
  };
  // Retirer une image-clé ; s'il n'en restait qu'une, plus rien ne bouge : l'apparition entière s'en va et l'élément redevient immobile.
  const removeKeyframe = (kfAt: number) => {
    if (!ap) return;
    const current = getSite();
    if (ap.track.keyframes.length <= 2) { run(planQuickAnimation(current, selected, "Apparition", ""), `Ne plus faire bouger ${quoteLabel(nodeLabel(selected))}`); return; }
    run(planRemoveKeyframes(current, ap.animation.id, [{ track: ap.track.id, at: kfAt }]), "Retirer l'état");
  };
  // Ce que l'élément lance lui-même hors de son apparition (survol, clic, défilement, souris) : ses réglages fins et le retrait.
  const others = (selected.triggers ?? []).filter((t) => t.id !== ap?.trigger.id && t.on !== "load" && t.on !== "inView");

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_360px] h-full min-h-0 min-w-0" data-scene-editor="" data-scene-zoom={String(zoom)}>
      {/* Colonne de la scène : à requêtes de conteneur, les noms et le libellé « Tester sur le site » se resserrent quand la place manque. */}
      <div className="@container flex flex-col min-h-0 min-w-0 border-r border-line">
        {/* L'en-tête se resserre avec la colonne (le nom se tronque, la durée se cache) et ne déborde jamais sur la colonne de droite. */}
        <div className="flex items-center gap-2 px-3 h-9 shrink-0 border-b border-line min-w-0 overflow-hidden">
          <Eyebrow as="span" className="shrink-0 hidden @[420px]:inline">Scène</Eyebrow>
          <span className="text-sm font-medium truncate min-w-[40px] max-w-[180px]" title={view.sectionLabel}>{view.sectionLabel}</span>
          <span className="hidden @[640px]:contents"><Badge title="Fin du dernier mouvement">{formatMs(view.total)}</Badge></span>
          {grouped ? <span className="hidden @[520px]:contents"><Badge tone="warning" className="shrink-0" title="Chaque lancement compte son temps depuis sa propre entrée à l'écran ; « Tout enchaîner » les réunit, ou glissez une ligne sous un autre lancement">{view.launches.length} lancements</Badge></span> : null}
          <span className="mx-1 h-4 w-px bg-line shrink-0" aria-hidden />
          <span className="hidden @[480px]:contents"><IconButton size="sm" className="shrink-0" label="Revenir au début" icon={SkipBack} onClick={() => { cancelAnimationFrame(raf.current); setPlaying(false); place(0); }} /></span>
          <Button size="sm" className="shrink-0" variant={playing ? "default" : "primary"} icon={playing ? Pause : Play} title={playing ? "Arrête la lecture ici" : "Joue la scène dans l'aperçu, la tête de lecture suit"} onClick={() => (playing ? pausePlay() : startPlay())}>{playing ? "Pause" : "Lire"}</Button>
          {onTestOnSite ? <Button size="sm" className="shrink-0" variant="ghost" icon={ExternalLink} aria-label="Tester sur le site" onClick={() => onTestOnSite(ap && !ap.page ? ap.hostId : selected.id)} title="Ouvre l'onglet Aperçu : la section arrive à l'écran comme pour un visiteur"><span className="hidden @[640px]:inline">Tester sur le site</span></Button> : null}
          <span className="ml-auto text-xs tabular-nums text-muted whitespace-nowrap hidden @[560px]:inline">{playhead !== null ? `${tickLabel(playhead)} ms` : ""}</span>
          <IconButton size="sm" className="ml-auto @[560px]:ml-0 shrink-0" label="Fermer l'outil Animation" icon={X} onClick={onClose} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-[150px_minmax(0,1fr)] @[720px]:grid-cols-[220px_minmax(0,1fr)] px-3 pt-2">
            {/* Une seule grille : chaque ligne fait 40 px des deux côtés, un filet la traverse, la sélection la teinte d'un bord à l'autre. */}
            <div ref={names} className="flex flex-col bg-surface/50 border-r border-line rounded-l-md overflow-hidden">
              <div className="h-6 shrink-0 border-b border-line-strong flex items-end px-2 pb-1"><Eyebrow as="span">Éléments</Eyebrow></div>
              {items.map((it) => it.kind === "still" ? (
                <div key="still" data-scene-still-sep="" className="h-6 shrink-0 flex items-center px-2 border-b border-line/60 text-2xs font-medium text-muted bg-surface">{STILL_LABEL}</div>
              ) : it.kind === "launch" ? (
                <div key={it.launch.id} data-scene-launch={it.launch.id} data-drop-target={rowDrag && rowDrag.over === it.launch.id && rowDrag.from !== it.launch.id ? "" : undefined} title={it.launch.label}
                  className={`h-6 shrink-0 flex items-center px-2 border-b border-line/60 text-2xs font-medium truncate ${rowDrag && rowDrag.over === it.launch.id && rowDrag.from !== it.launch.id ? "bg-accent-soft text-accent" : "bg-surface text-muted"}`}>{it.launch.short}</div>
              ) : (
                // Toute la case du nom sélectionne l'élément (le texte reste un bouton pour le clavier ; son clic remonte à la case, une seule sélection) ;
                // glissée vers le haut ou le bas, elle rejoint un autre lancement.
                <div key={it.row.id} data-scene-name-cell={it.row.id} data-scene-launch-of={it.launch?.id} className={`group h-10 flex items-center border-b border-line/60 border-l-2 pl-2 ${it.row.selected ? "border-l-accent bg-accent-soft/25" : "border-l-transparent cursor-pointer hover:bg-surface"} ${rowDrag?.id === it.row.id ? "opacity-50" : ""} ${rowDrag && it.launch && rowDrag.over === it.launch.id && rowDrag.from !== it.launch.id ? "bg-accent-soft/40" : ""}`}
                  title={it.row.selected ? undefined : `Sélectionner ${quoteLabel(it.row.label)}`} onClick={it.row.selected ? undefined : () => onSelect(it.row.id)} onMouseEnter={() => onHover?.(it.row.id)} onMouseLeave={() => onHover?.(null)}
                  onPointerDown={grouped && it.row.bar && it.launch ? (e) => startRowDrag(e, it.row.id, it.launch!.id) : undefined}>
                  <button type="button" data-scene-name="" data-scene-name-of={it.row.id} className={`flex items-center gap-1.5 min-w-0 pr-2 text-left text-xs truncate ${it.row.selected ? "text-ink font-medium" : it.row.still ? "text-dim group-hover:text-ink" : "text-ink group-hover:text-accent"}`} style={{ paddingLeft: it.row.depth * 12 }}>
                    <span className="truncate">{it.row.label}</span>{it.row.count ? <span className="text-muted shrink-0">×{it.row.count}</span> : null}
                  </button>
                  {it.row.selected && it.row.bar ? <span className="ml-auto mr-1 flex items-center shrink-0"><IconButton size="sm" className="h-6 w-6 text-muted" data-scene-new-state="" label="Ajouter un état (image-clé)" icon={Plus} title="Ajoute un état de l'élément : à la tête de lecture, ou juste après le dernier état si elle est déjà sur l'un d'eux" onClick={addKeyframeAnywhere} /><IconButton size="sm" className="h-6 w-6 text-muted" data-scene-remove-line="" label="Ne plus animer cet élément" icon={Trash2} tone="danger" title="Retire l'animation de cet élément seulement ; ce qui démarrait après lui se raccroche" onClick={removeLine} /></span> : null}
                </div>
              ))}
            </div>
            {/* La règle et les pistes : zoomées, elles s'élargissent et défilent de côté (⌘ + molette, ou les boutons de l'en-tête). */}
            <div ref={scroller} className="min-w-0 overflow-x-auto overflow-y-hidden" data-scene-scroll="">
              {/* Une petite marge à gauche : le « 0 » et le premier losange se voient en entier, rien n'invite à défiler vers la gauche. */}
              <div data-scene-lanes="" className="box-border pl-4 pr-4" style={{ width: `${zoom * 100}%` }}>
                <div ref={rail} data-scene-rail="" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead ?? 0)} tabIndex={0}
                  className="relative h-6 border-b border-line-strong cursor-ew-resize select-none text-2xs text-dim"
                  onPointerDown={(e) => { if (e.button !== 0) return; place(timeAt(e.clientX)); (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); }}
                  onPointerMove={(e) => { if (e.buttons & 1) place(timeAt(e.clientX)); }}
                  onKeyDown={(e) => { const cur = playhead ?? 0; if (e.key === "ArrowRight") { e.preventDefault(); place(Math.min(length, cur + (e.shiftKey ? 100 : 10))); } if (e.key === "ArrowLeft") { e.preventDefault(); place(Math.max(0, cur - (e.shiftKey ? 100 : 10))); } }}>
                  {rulerTicks(length, zoom).filter((t) => t < length).map((t) => (
                    <span key={t} className="absolute top-0 bottom-0" style={{ left: pct(t) }} aria-hidden>
                      <span className="absolute top-0.5 -translate-x-1/2 tabular-nums">{tickLabel(t)}</span>
                      <span className="absolute bottom-0 h-1.5 w-px bg-line-strong" />
                    </span>
                  ))}
                  {playhead !== null ? <span className="absolute -bottom-px -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-accent" style={{ left: pct(playhead) }} aria-hidden /> : null}
                </div>
                <ul aria-label={`Scène de ${quoteLabel(view.sectionLabel)}`} className="relative">
                  {rulerTicks(length, zoom).filter((t) => t > 0 && t < length).map((t) => <span key={t} className="pointer-events-none absolute top-0 bottom-0 w-px bg-line/60" style={{ left: pct(t) }} aria-hidden />)}
                  {items.map((it) => { if (it.kind === "still") return <li key="still" aria-label={STILL_LABEL} className="h-6 border-b border-line/60 bg-surface/40" />; if (it.kind === "launch") return <li key={it.launch.id} data-scene-launch-lane={it.launch.id} className={`h-6 border-b border-line/60 flex items-center overflow-hidden ${rowDrag && rowDrag.over === it.launch.id && rowDrag.from !== it.launch.id ? "bg-accent-soft/40" : "bg-surface/40"}`}><span className="sticky left-0 px-2 text-2xs text-muted whitespace-nowrap">{it.launch.label}</span></li>; const row = it.row; const i = view.rows.indexOf(row); return (
                    <li key={row.id} data-scene-row={row.id} data-scene-launch-of={launchOf(row.id)?.id} data-still={row.still || undefined} className={`relative h-10 border-b border-line/60 ${row.selected ? "bg-accent-soft/25" : ""} ${row.selected && row.bar ? "cursor-copy" : ""}`} title={row.selected && row.bar ? "Cliquer sur la ligne ajoute un état à cet instant" : undefined}
                      onMouseMove={row.selected && row.bar ? (e) => setHoverT(timeAt(e.clientX)) : undefined} onMouseLeave={row.selected ? () => setHoverT(null) : undefined}
                      onClick={row.selected ? (row.bar ? laneClick : undefined) : () => onSelect(row.id)}>
                  {row.bar ? (
                    <div data-scene-bar="" className={`absolute top-[7px] h-[18px] rounded-md border text-2xs leading-none flex items-center px-2 whitespace-nowrap cursor-grab active:cursor-grabbing transition-[box-shadow] ${row.selected ? "bg-gradient-to-b from-accent to-accent/85 text-accent-ink border-accent/90 shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_1px_2px_rgba(0,0,0,.35)]" : "bg-accent/20 border-accent/40 text-ink hover:bg-accent/30"}`}
                      style={{ left: `calc(${pct(row.bar.start)} + ${shift("move", row.id)}px)`, width: `max(6px, calc(${pct(row.bar.end)} - ${pct(row.bar.start)} + ${shift("end", row.id)}px))` }} title={`${tickLabel(row.bar.start)} → ${tickLabel(row.bar.end)} ms · glisser : départ ; bord droit : durée`}
                      onPointerDown={(e) => startDrag(e, "move", row.id)}>
                      <span className="truncate">{row.keyframes ? "" : presetLabel(row.bar.preset) ?? "Mouvement"}</span>
                      <span data-scene-bar-end="" role="presentation" className="absolute top-0 bottom-0 -right-1 w-2.5 cursor-ew-resize" onPointerDown={(e) => startDrag(e, "end", row.id)} />
                    </div>
                  ) : row.withGroup ? (
                    // Il arrive avec le bloc qui le porte (sa section en fondu, sa liste…) ; il peut quand même recevoir sa propre animation.
                    <span className="absolute top-[7px] left-0 flex items-center gap-2 whitespace-nowrap">
                      <span className="text-2xs text-muted leading-[18px]" title={`${quoteLabel(row.label)} n'a pas d'animation à lui : il arrive avec ${quoteLabel(nodeLabel(nodeOf(row.withGroup)!))}, qui bouge`}>Arrive avec {quoteLabel(nodeLabel(nodeOf(row.withGroup)!))}</span>
                      <button type="button" className="h-[18px] px-2 rounded-md border border-dashed border-accent/60 text-2xs text-accent hover:bg-accent-soft" onClick={() => appear(row, i)} title="Sa propre animation, en plus : un fondu en montant après l'élément qui précède ; l'effet se change ensuite à droite">+ Faire apparaître</button>
                    </span>
                  ) : (
                    <button type="button" className="absolute top-[7px] left-0 h-[18px] px-2 rounded-md border border-dashed border-accent/60 text-2xs text-accent hover:bg-accent-soft" onClick={() => appear(row, i)} title="Un fondu en montant, après l'élément qui précède ; l'effet se change ensuite à droite">+ Faire apparaître</button>
                  )}
                  {row.keyframes?.map((k) => (
                    <button key={k.at} type="button" data-scene-kf={k.at} aria-label={`État à ${tickLabel(k.sceneAt)} ms`} aria-pressed={at === k.at} title={`${k.sceneAt} ms${k.easing ? ` · ${k.easing}` : ""}`}
                      className={`absolute top-4 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full cursor-grab active:cursor-grabbing drop-shadow-[0_1px_1px_rgba(0,0,0,.6)] transition-transform hover:scale-125 ${at === k.at ? "text-warning" : "text-panel hover:text-warning"}`} style={{ left: `calc(${pct(k.sceneAt)} + ${shift("kf", row.id, k.at) + shift("move", row.id)}px)` }} onPointerDown={(e) => { place(k.sceneAt); startDrag(e, "kf", row.id, k.at); }} onKeyDown={(e) => { if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); e.stopPropagation(); removeKeyframe(k.at); } }}>
                      <Diamond size={11} fill="currentColor" strokeWidth={at === k.at ? 2 : 1.5} className={at === k.at ? "stroke-accent-ink/60" : "stroke-accent-ink/70"} aria-hidden />
                    </button>
                  ))}
                  {row.selected && ap && hoverT !== null && !playing && !drag && !ap.track.keyframes.some((k) => Math.abs(k.at + (ap.trigger.delay ?? 0) - hoverT) < 20) ? (<>
                    {/* Le repère sur la barre dit où l'état se posera ; la petite pastille dessous ne cache aucun losange. */}
                    <span className="pointer-events-none absolute top-0 bottom-0 w-px bg-ink/40" style={{ left: pct(hoverT) }} aria-hidden />
                    <span className="pointer-events-none absolute top-4 -translate-x-1/2 -translate-y-1/2 text-ink" style={{ left: pct(hoverT) }} aria-hidden><Diamond size={10} strokeWidth={2} /></span>
                    <button type="button" data-scene-ghost="" aria-label="Ajouter un état (une image-clé)"
                      className="group absolute top-[27px] -translate-x-1/2 z-10 flex items-center gap-1 h-3 pl-1 pr-1.5 rounded-full border border-line-strong bg-panel text-ink text-[10px] font-medium leading-none whitespace-nowrap shadow-[0_2px_6px_rgba(0,0,0,.4)] transition-[transform,background-color,color,border-color] duration-150 ease-out motion-reduce:transition-none hover:scale-110 hover:bg-ink hover:text-panel hover:border-ink active:scale-95" style={{ left: pct(hoverT) }}
                      onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); const at2 = Math.max(0, hoverT - (ap.trigger.delay ?? 0)); run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, at2, {}), `État ajouté à ${at2} ms`); place(hoverT); }}><Plus size={9} strokeWidth={2.5} aria-hidden /><span>État</span><span className="tabular-nums opacity-70">{tickLabel(hoverT)} ms</span></button>
                  </>) : null}
                      {playhead !== null ? <span className="absolute top-0 bottom-0 w-px bg-accent/80 pointer-events-none" style={{ left: pct(playhead) }} aria-hidden /> : null}
                    </li>
                  ); })}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 pb-2">
          {grouped ? <Button size="sm" variant="ghost" icon={Link2} data-scene-chain="" onClick={chainAll} title="Chaque élément démarre après celui qui le précède dans la page, dans un seul lancement : le premier. Ou glissez une ligne sous un autre lancement.">Tout enchaîner</Button> : null}
          {addable.length ? (
            <div ref={addRef} className="relative" data-scene-add="">
              <button type="button" aria-haspopup="listbox" aria-expanded={addOpen} className="h-7 px-2 rounded-sm border border-dashed border-accent/60 text-xs text-accent hover:bg-accent-soft" onClick={(e) => setAddOpen((o) => !o, e.currentTarget)}>+ Ajouter un élément à la scène…</button>
              {addOpen && addPos ? createPortal(
                <ul role="listbox" aria-label="Éléments de la section qui ne bougent pas" data-scene-add-list="" className="fixed z-[90] w-72 overflow-auto rounded-md border border-line bg-raised shadow-xl py-1" style={{ left: addPos.left, top: addPos.top, bottom: addPos.bottom, maxHeight: addPos.maxHeight }}
                  onPointerDown={(e) => e.stopPropagation()}>
                  {addable.map((r) => (
                    <li key={r.id}>
                      <button type="button" role="option" aria-selected={false} data-scene-add-item={r.id} className="w-full text-left text-xs h-7 px-2 truncate hover:bg-accent-soft hover:text-accent" style={{ paddingLeft: 8 + r.depth * 12 }}
                        onMouseEnter={() => onHover?.(r.id)} onMouseLeave={() => onHover?.(null)}
                        onClick={() => { setAddOpen(false); onHover?.(null); appear(r, view.rows.indexOf(r)); }}>
                        {r.label}{r.count ? <span className="text-muted"> ×{r.count}</span> : null}
                      </button>
                    </li>
                  ))}
                </ul>, document.body) : null}
            </div>
          ) : null}
            <span className="ml-auto flex items-center gap-0.5">
              <IconButton size="sm" label="Dézoomer la ligne de temps (⌘ + molette)" icon={ZoomOut} disabled={zoom <= 1} onClick={() => zoomBy(1 / 1.25)} />
              <button type="button" className="h-7 min-w-9 px-1 rounded-sm text-2xs tabular-nums text-muted hover:text-ink hover:bg-hover disabled:opacity-40" disabled={zoom === 1} title="Ajuster : toute la règle dans la largeur" onClick={() => setZoom(1)}>{zoom === 1 ? "×1" : `×${zoom.toFixed(2).replace(/\.?0+$/, "").replace(".", ",")}`}</button>
              <IconButton size="sm" label="Zoomer la ligne de temps (⌘ + molette)" icon={ZoomIn} disabled={zoom >= 8} onClick={() => zoomBy(1.25)} />
            </span>
          </div>
          {playhead !== null ? <span className="pointer-events-none absolute" aria-hidden /> : null}
        </div>
      </div>

      {/* La colonne de droite du tiroir, de la largeur de l'inspecteur : le temps de l'élément sélectionné. L'effet (fondu, zoom…) et la vitesse
          se choisissent dans l'inspecteur, rubrique Animation ; ici, quand il part, ses états, et la ligne elle-même. */}
      {/* Colonne de droite : l'élément sélectionné, et deux blocs à lui, « Son animation » (quand elle part, son délai, si elle rejoue) puis « Son état »
          à la tête de lecture, sous un en-tête collant teinté du même jaune que le losange actif sur la ligne. La scène, elle, se règle à gauche.
          Jamais « ligne de temps » ici : le mot désignerait la scène entière. Aucune marge négative : rien ne déborde de côté. */}
      <div className="flex flex-col min-h-0 overflow-y-auto overflow-x-hidden" data-scene-side="">
        <div className="flex items-center gap-2 px-3 h-10 shrink-0 border-b border-line bg-panel min-w-0">
          {createElement(nodeIcon(selected), { size: 14, className: "text-accent shrink-0", "aria-hidden": true })}
          <h2 className="m-0 text-sm font-medium truncate" data-scene-element="" title={nodeLabel(selected)}>{nodeLabel(selected)}</h2>
        </div>
        <section className="flex flex-col gap-3 p-3" data-scene-line="" aria-label="Son animation">
          <div className="flex flex-col gap-1 min-w-0">
            <Eyebrow as="h3">Son animation</Eyebrow>
            {ap ? (
              <div className="flex items-center gap-2 text-xs text-muted min-w-0">
                <span className="truncate" title={`Effet : ${ap.preset?.label ?? (ap.origin ? `${ap.origin.label} retouché` : "composé à la main")}`}>Effet : {ap.preset?.label ?? (ap.origin ? `${ap.origin.label} retouché` : "composé à la main")}{ap.speed !== "custom" ? ` · ${ap.speed === "fast" ? "rapide" : ap.speed === "slow" ? "lente" : "normale"}` : ""}</span>
                <button type="button" className="ml-auto shrink-0 inline-flex items-center gap-1 text-accent hover:underline" title="L'effet et la vitesse se choisissent dans l'inspecteur, à droite de l'aperçu, rubrique Animation" onClick={() => { for (const t of ["Animations", "Animation"]) window.dispatchEvent(new CustomEvent("atelier:reveal-section", { detail: t })); window.setTimeout(() => document.querySelector('[data-section="Animations"], [data-section="Animation"]')?.scrollIntoView({ block: "start" }), 60); }}><SlidersHorizontal size={12} aria-hidden />Changer l&apos;effet</button>
              </div>
            ) : null}
          </div>
          <QuickAnimations site={site} node={selected} commit={commit} onPlay={(triggerId, hostId) => onPlay(triggerId, hostId ?? selected.id)} onTestOnSite={onTestOnSite} onSelectNode={onSelect} variant={ap ? "timing" : "full"} />
          {reusable.length ? (
            <div className="flex flex-col gap-1 min-w-0">
              <Eyebrow as="span">Comme un autre élément</Eyebrow>
              <Select value="" placeholder="Réutiliser une animation du site…" options={reusable.map(({ a, u }) => ({ value: a.id, label: `${a.name} · ${nodeLabel(u!.node!)} · ${TRIGGER_LABELS[u!.trigger.on].toLowerCase()}` }))}
                onValueChange={(v) => { const r = reusable.find((x) => x.a.id === v); if (!r) return; run(planAddTrigger(selected, { id: newId(), on: r.u!.trigger.on, animation: r.a.id, ...(r.u!.trigger.once === false ? { once: false } : {}), ...(r.u!.trigger.reverseOnLeave ? { reverseOnLeave: true } : {}) }), `Réutiliser « ${r.a.name} »`); }} />
              <Hint>La même animation, partagée : la retoucher sur un élément la change pour tous.</Hint>
            </div>
          ) : null}
          {others.length ? (
            <div className="flex flex-col gap-2 border-t border-line pt-3" data-scene-triggers="">
              <Eyebrow as="h3">Déclencheurs</Eyebrow>
              {others.map((t) => (
                <div key={t.id} className="flex flex-col gap-1.5 rounded-sm border border-line p-2 min-w-0">
                  <div className="flex items-start gap-1">
                    <span className="flex-1 min-w-0 text-xs text-ink leading-snug">{summarizeAnimation(site, t, selected.id)}</span>
                    <IconButton size="sm" label={`Retirer « ${TRIGGER_LABELS[t.on]} »`} icon={Trash2} onClick={() => run(planRemoveTriggerWithAnimation(getSite(), selected, t.id), "Retirer le déclencheur")} />
                  </div>
                  <TriggerSettings trigger={t} onUpdate={(patch, label, key) => run(planUpdateTrigger(selected, t.id, patch), label, key)} />
                </div>
              ))}
            </div>
          ) : null}
          {ap ? <Button size="sm" variant="ghost" icon={Trash2} className="self-start text-danger" data-scene-remove-line="" onClick={removeLine} title="Retire l'animation de cet élément seulement : il ne bouge plus, ce qui démarrait après lui se raccroche ; le reste de la scène ne change pas">Ne plus animer {quoteLabel(nodeLabel(selected))}</Button> : null}
        </section>
        <section className="flex flex-col border-t-2 border-line-strong" aria-label="Son état" data-scene-keyframe="" data-state={!ap ? "none" : at === null ? "off" : kfHere ? "on" : "between"}>
          <div className={`sticky top-0 z-10 flex items-center gap-2 px-3 h-11 border-b border-line ${kfHere ? "bg-[color-mix(in_oklab,var(--color-warning)_14%,var(--color-panel))]" : "bg-surface"}`}>
            <Diamond size={12} fill={kfHere ? "currentColor" : "none"} strokeWidth={2} className={`shrink-0 ${kfHere ? "text-warning" : "text-dim"}`} aria-hidden />
            <div className="flex flex-col flex-1 min-w-0 leading-tight">
              <h2 className="m-0 text-xs font-medium truncate" data-scene-state-heading="">{!ap || at === null ? "Son état" : kfHere ? `Son état à ${tickLabel(playhead!)} ms` : `Instant ${tickLabel(playhead!)} ms`}</h2>
              <span className="text-2xs text-muted truncate">{!ap ? "Il ne bouge pas encore" : at === null ? "Cliquez la règle ou un losange pour choisir un instant" : kfHere ? "L'élément à cet instant" : "Aucun état ici : réglez une propriété, il s'ajoute"}</span>
            </div>
            {ap ? (
              <div className="flex items-center gap-0.5 shrink-0">
                <Button size="sm" variant="ghost" icon={Plus} aria-label="Ajouter un état ici (une image-clé)" title={at === null ? "Cliquez d'abord la règle pour choisir l'instant" : kfHere ? "L'état est déjà fixé à cet instant" : `Enregistre l'état de l'élément à ${tickLabel(playhead!)} ms (une image-clé)`} disabled={at === null || !!kfHere} onClick={addKeyframe}>Ajouter un état</Button>
                <IconButton size="sm" label="Supprimer l'état (image-clé)" icon={Trash2} tone="danger" disabled={!kfHere} onClick={() => kfHere && removeKeyframe(at!)} />
              </div>
            ) : null}
          </div>
          {!ap ? (
            <div className="p-3"><Hint>Faites d&apos;abord apparaître {quoteLabel(nodeLabel(selected))} : choisissez une Apparition ci-dessus, ou « + Faire apparaître » sur sa ligne. Ses états s&apos;ajouteront ici.</Hint></div>
          ) : at === null ? (
            <div className="p-3"><Hint>Cliquez la règle ou un losange pour vous placer à un instant : ce qui se règle ici y ajoute un état de l&apos;élément (une image-clé).</Hint></div>
          ) : (<>
            {kfHere && prevKf ? (
              <div className="grid grid-cols-[80px_1fr] items-start gap-1.5 px-3 py-2">
                <span className="text-xs text-muted pt-1.5" title="Courbe pour atteindre cette image-clé depuis la précédente">Courbe</span>
                <EasingField value={kfHere.easing} segment={at - prevKf.at} onChange={(e) => run(planSetKeyframeEasing(getSite(), ap.animation.id, ap.track.id, at, e), "Courbe du segment", `kf-ease:${ap.animation.id}:${ap.track.id}:${at}`)} />
              </div>
            ) : null}
            <KeyframePanels site={site} getSite={getSite} node={selected} bp={bp} mode={mode} animationId={ap.animation.id} track={ap.track} at={at} commit={commit} />
          </>)}
        </section>
      </div>
    </div>
  );
}
