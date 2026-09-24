"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Diamond, ExternalLink, Pause, Play, Plus, SkipBack, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationUsages, appearanceOf, applyOps, indexSite, keyframeAt, newId, planAddTrigger, planAppearanceStart, planQuickAnimation, planAppearanceDelay, planAppearanceDuration, planRemoveKeyframes, planRemoveTriggerWithAnimation, planSetKeyframe, planSetKeyframeEasing, planShiftKeyframes, planUpdateTrigger, trackPresetMatch } from "@atelier/model";
import { Badge, Button, Eyebrow, Hint, IconButton, PanelHeading, Select } from "@/ui";
import { formatMs, quoteLabel, rulerTicks, snapTime, summarizeAnimation, tickLabel } from "@/lib/timeline";
import { sceneView, type SceneRow } from "@/lib/scene-view";
import { nodeLabel } from "../node-icons";
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
  const [drag, setDrag] = useState<{ kind: "move" | "end" | "kf"; id: string; at?: number; dx: number } | null>(null);
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
      const delta = Math.round(pxToMs(ev.clientX - startX) / 10) * 10;
      if (Math.abs(delta) < 10) return;
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
  const playAll = () => { for (const l of view.launches) { const [hostId, triggerId] = l.split(":") as [string, string]; onPlay(triggerId, hostId); } };
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
  const addKeyframe = () => { if (ap && at !== null) run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, at, {}), `État fixé à ${at} ms`); };
  // « Fixer un nouvel état », toujours à côté du nom : à la tête de lecture si elle est libre ; sinon à mi-chemin du prochain état, ou 200 ms après le dernier.
  const addKeyframeAnywhere = () => {
    if (!ap) return;
    const kfs = [...ap.track.keyframes].map((k) => k.at).sort((a, b) => a - b);
    const cur = at ?? kfs[kfs.length - 1] ?? 0;
    let where = cur;
    if (at === null || kfs.includes(cur)) { const next = kfs.find((k) => k > cur); where = next !== undefined ? snapTime((cur + next) / 2) : cur + 200; }
    run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, where, {}), `État fixé à ${where} ms`);
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
      <div className="flex flex-col min-h-0 min-w-0 border-r border-line">
        <div className="flex items-center gap-2 px-3 h-9 shrink-0 border-b border-line">
          <Eyebrow as="span">Scène</Eyebrow>
          <span className="text-sm font-medium truncate max-w-[180px] shrink-0">{view.sectionLabel}</span>
          <Badge title="Fin du dernier mouvement">{formatMs(view.total)}</Badge>
          {view.launches.length > 1 ? <Badge tone="warning" title="Chaque lancement compte son temps depuis sa propre entrée à l'écran ; « Démarre après » un autre élément les réunit">{view.launches.length} lancements</Badge> : null}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden />
          <IconButton size="sm" label="Revenir au début" icon={SkipBack} onClick={() => { cancelAnimationFrame(raf.current); setPlaying(false); place(0); }} />
          <Button size="sm" variant={playing ? "default" : "primary"} icon={playing ? Pause : Play} title={playing ? "Arrête la lecture ici" : "Joue la scène dans l'aperçu, la tête de lecture suit"} onClick={() => (playing ? pausePlay() : startPlay())}>{playing ? "Pause" : "Lire"}</Button>
          {onTestOnSite ? <Button size="sm" variant="ghost" icon={ExternalLink} onClick={() => onTestOnSite(ap && !ap.page ? ap.hostId : selected.id)} title="Ouvre l'onglet Aperçu : la section arrive à l'écran comme pour un visiteur">Tester sur le site</Button> : null}
          <span className="ml-auto text-xs tabular-nums text-muted">{playhead !== null ? `${tickLabel(playhead)} ms` : ""}</span>
          <IconButton size="sm" label="Fermer l'outil Animation" icon={X} onClick={onClose} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-[220px_minmax(0,1fr)] px-3 pt-2">
            {/* Les noms, alignés sur les lignes de droite par une hauteur fixe. */}
            <div className="flex flex-col">
              <span className="h-5 shrink-0" aria-hidden />
              {visible.map((row) => (
                <div key={row.id} className={`h-8 flex items-center border-b border-line/60 ${row.selected ? "bg-accent-soft/40" : ""}`}>
                  <button type="button" data-scene-name="" data-scene-name-of={row.id} className={`flex items-center gap-1.5 min-w-0 pr-2 text-left text-xs truncate ${row.selected ? "text-accent font-medium" : row.still ? "text-dim hover:text-ink" : "text-ink hover:text-accent"}`} style={{ paddingLeft: row.depth * 12 }} title={`Sélectionner ${quoteLabel(row.label)}`} onClick={() => onSelect(row.id)} onMouseEnter={() => onHover?.(row.id)} onMouseLeave={() => onHover?.(null)}>
                    <span className="truncate">{row.label}</span>{row.count ? <span className="text-muted shrink-0">×{row.count}</span> : null}
                  </button>
                  {row.selected && row.bar ? <IconButton size="sm" className="ml-auto mr-1 shrink-0" data-scene-new-state="" label="Fixer un nouvel état (image-clé)" icon={Plus} title="Fixe un nouvel état de l'élément : à la tête de lecture, ou juste après le dernier état si elle est déjà sur l'un d'eux" onClick={addKeyframeAnywhere} /> : null}
                </div>
              ))}
            </div>
            {/* La règle et les pistes : zoomées, elles s'élargissent et défilent de côté (⌘ + molette, ou les boutons de l'en-tête). */}
            <div ref={scroller} className="min-w-0 overflow-x-auto overflow-y-hidden" data-scene-scroll="">
              {/* Une petite marge à gauche : le « 0 » et le premier losange se voient en entier, rien n'invite à défiler vers la gauche. */}
              <div data-scene-lanes="" className="box-border pl-4 pr-4" style={{ width: `${zoom * 100}%` }}>
                <div ref={rail} data-scene-rail="" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead ?? 0)} tabIndex={0}
                  className="relative h-5 border-b border-line cursor-ew-resize select-none text-2xs text-dim"
                  onPointerDown={(e) => { if (e.button !== 0) return; place(timeAt(e.clientX)); (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); }}
                  onPointerMove={(e) => { if (e.buttons & 1) place(timeAt(e.clientX)); }}
                  onKeyDown={(e) => { const cur = playhead ?? 0; if (e.key === "ArrowRight") { e.preventDefault(); place(Math.min(length, cur + (e.shiftKey ? 100 : 10))); } if (e.key === "ArrowLeft") { e.preventDefault(); place(Math.max(0, cur - (e.shiftKey ? 100 : 10))); } }}>
                  {rulerTicks(length, zoom).filter((t) => t < length).map((t) => <span key={t} className="absolute top-0 -translate-x-1/2 tabular-nums" style={{ left: pct(t) }}>{tickLabel(t)}</span>)}
                  {playhead !== null ? <span className="absolute top-0 bottom-0 w-px bg-accent" style={{ left: pct(playhead) }} aria-hidden /> : null}
                </div>
                <ul aria-label={`Scène de ${quoteLabel(view.sectionLabel)}`}>
                  {visible.map((row) => { const i = view.rows.indexOf(row); return (
                    <li key={row.id} data-scene-row={row.id} data-still={row.still || undefined} className={`relative h-8 border-b border-line/60 ${row.selected ? "bg-accent-soft/40" : ""}`}>
                  {row.bar ? (
                    <div data-scene-bar="" className={`absolute top-1.5 h-5 rounded-sm border text-2xs leading-none flex items-center px-1.5 whitespace-nowrap cursor-grab active:cursor-grabbing ${row.selected ? "bg-accent text-accent-ink border-accent" : "bg-accent/25 border-accent/50 text-ink"}`}
                      style={{ left: `calc(${pct(row.bar.start)} + ${shift("move", row.id)}px)`, width: `max(6px, calc(${pct(row.bar.end)} - ${pct(row.bar.start)} + ${shift("end", row.id)}px))` }} title={`${tickLabel(row.bar.start)} → ${tickLabel(row.bar.end)} ms · glisser : départ ; bord droit : durée`}
                      onPointerDown={(e) => startDrag(e, "move", row.id)}>
                      <span className="truncate">{row.keyframes ? "" : presetLabel(row.bar.preset) ?? "Mouvement"}</span>
                      <span data-scene-bar-end="" role="presentation" className="absolute top-0 bottom-0 -right-1 w-2.5 cursor-ew-resize" onPointerDown={(e) => startDrag(e, "end", row.id)} />
                    </div>
                  ) : row.withGroup ? (
                    <span className="absolute top-2 left-0 text-2xs text-muted">avec {quoteLabel(nodeLabel(nodeOf(row.withGroup)!))}</span>
                  ) : (
                    <button type="button" className="absolute top-1.5 left-0 h-5 px-2 rounded-sm border border-dashed border-accent/60 text-2xs text-accent hover:bg-accent-soft" onClick={() => appear(row, i)} title="Un fondu en montant, après l'élément qui précède ; l'effet se change ensuite à droite">+ Faire apparaître</button>
                  )}
                  {row.keyframes?.map((k) => (
                    <button key={k.at} type="button" data-scene-kf={k.at} aria-label={`État fixé à ${tickLabel(k.sceneAt)} ms`} aria-pressed={at === k.at} title={`${k.sceneAt} ms${k.easing ? ` · ${k.easing}` : ""}`}
                      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-xs cursor-grab active:cursor-grabbing ${at === k.at ? "text-warning" : "text-accent-ink hover:text-warning"}`} style={{ left: `calc(${pct(k.sceneAt)} + ${shift("kf", row.id, k.at)}px)` }} onPointerDown={(e) => { place(k.sceneAt); startDrag(e, "kf", row.id, k.at); }} onKeyDown={(e) => { if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); e.stopPropagation(); removeKeyframe(k.at); } }}>
                      <Diamond size={11} fill="currentColor" aria-hidden />
                    </button>
                  ))}
                  {row.selected && ap && playhead !== null && !kfHere && !playing ? (
                    <button type="button" aria-label="Fixer l'état ici (une image-clé)" title="Enregistre à quoi ressemble l'élément à cet instant : une image-clé. Régler une propriété à droite fait pareil." className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-5 px-1.5 rounded-full border border-dashed border-accent bg-panel text-2xs text-accent whitespace-nowrap shadow-md hover:bg-accent hover:text-accent-ink hover:border-solid" style={{ left: pct(playhead) }} onClick={addKeyframe}>+ Fixer l&apos;état ici</button>
                  ) : null}
                      {playhead !== null ? <span className="absolute top-0 bottom-0 w-px bg-accent/60 pointer-events-none" style={{ left: pct(playhead) }} aria-hidden /> : null}
                    </li>
                  ); })}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 pb-2">
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

      <div className="flex flex-col gap-3 p-3 min-h-0 overflow-auto">
        <PanelHeading className="px-0">{nodeLabel(selected)}</PanelHeading>
        <QuickAnimations site={site} node={selected} commit={commit} onPlay={(triggerId, hostId) => onPlay(triggerId, hostId ?? selected.id)} onTestOnSite={onTestOnSite} onSelectNode={onSelect} />
        {reusable.length ? (
          <div className="flex flex-col gap-1">
            <Eyebrow as="span">Comme un autre élément</Eyebrow>
            <Select value="" placeholder="Réutiliser une animation du site…" options={reusable.map(({ a, u }) => ({ value: a.id, label: `${a.name} · ${nodeLabel(u!.node!)} · ${TRIGGER_LABELS[u!.trigger.on].toLowerCase()}` }))}
              onValueChange={(v) => { const r = reusable.find((x) => x.a.id === v); if (!r) return; run(planAddTrigger(selected, { id: newId(), on: r.u!.trigger.on, animation: r.a.id, ...(r.u!.trigger.once === false ? { once: false } : {}), ...(r.u!.trigger.reverseOnLeave ? { reverseOnLeave: true } : {}) }), `Réutiliser « ${r.a.name} »`); }} />
            <Hint>La même animation, partagée : la retoucher sur un élément la change pour tous.</Hint>
          </div>
        ) : null}
        {others.length ? (
          <section className="flex flex-col gap-2 border-t border-line pt-3" aria-label="Déclencheurs" data-scene-triggers="">
            <Eyebrow as="span">Déclencheurs</Eyebrow>
            {others.map((t) => (
              <div key={t.id} className="flex flex-col gap-1.5 rounded-sm border border-line p-2">
                <div className="flex items-start gap-1">
                  <span className="flex-1 text-xs text-ink leading-snug">{summarizeAnimation(site, t, selected.id)}</span>
                  <IconButton size="sm" label={`Retirer « ${TRIGGER_LABELS[t.on]} »`} icon={Trash2} onClick={() => run(planRemoveTriggerWithAnimation(getSite(), selected, t.id), "Retirer le déclencheur")} />
                </div>
                <TriggerSettings trigger={t} onUpdate={(patch, label, key) => run(planUpdateTrigger(selected, t.id, patch), label, key)} />
              </div>
            ))}
          </section>
        ) : null}
        <section className="flex flex-col gap-2 border-t border-line pt-3" aria-label="État de l'élément" data-scene-keyframe="">
          {!ap ? (
            <Hint>Faites d&apos;abord apparaître {quoteLabel(nodeLabel(selected))} : choisissez une Apparition ci-dessus, ou « + Faire apparaître » sur sa ligne. Ses états se fixeront ici.</Hint>
          ) : (<>
            <PanelHeading className="px-0" actions={
              <div className="flex items-center gap-0.5">
                <Button size="sm" variant="ghost" icon={Plus} aria-label="Fixer l'état ici (une image-clé)" title={at === null ? "Cliquez d'abord la règle pour choisir l'instant" : kfHere ? "L'état est déjà fixé à cet instant" : `Enregistre l'état de l'élément à ${tickLabel(playhead!)} ms (une image-clé)`} disabled={at === null || !!kfHere} onClick={addKeyframe}>Fixer l&apos;état ici</Button>
                <IconButton size="sm" label="Supprimer cet état (image-clé)" icon={Trash2} tone="danger" disabled={!kfHere} onClick={() => kfHere && removeKeyframe(at!)} />
              </div>}>
              {at === null ? "État de l'élément" : kfHere ? `◆ État fixé à ${tickLabel(playhead!)} ms` : `Instant ${tickLabel(playhead!)} ms`}
            </PanelHeading>
            {at === null ? <Hint>Cliquez la règle ou un losange pour vous placer à un instant : ce qui se règle ici y fixe l&apos;état de l&apos;élément (une image-clé).</Hint> : (<>
              {kfHere && prevKf ? (
                <div className="grid grid-cols-[80px_1fr] items-start gap-1.5">
                  <span className="text-xs text-muted pt-1.5" title="Courbe pour atteindre cette image-clé depuis la précédente">Courbe</span>
                  <EasingField value={kfHere.easing} segment={at - prevKf.at} onChange={(e) => run(planSetKeyframeEasing(getSite(), ap.animation.id, ap.track.id, at, e), "Courbe du segment", `kf-ease:${ap.animation.id}:${ap.track.id}:${at}`)} />
                </div>
              ) : null}
              {!kfHere ? <Hint>Aucun état fixé à cet instant : « Fixer l&apos;état ici », ou réglez une propriété ci-dessous, il se fixe.</Hint> : null}
              <KeyframePanels site={site} getSite={getSite} node={selected} bp={bp} mode={mode} animationId={ap.animation.id} track={ap.track} at={at} commit={commit} />
            </>)}
          </>)}
        </section>
      </div>
    </div>
  );
}
