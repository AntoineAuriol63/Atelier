"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Copy, Crosshair, Diamond, ExternalLink, Pause, Play, Plus, Repeat, SkipBack, Snail, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Site, Track, Trigger } from "@atelier/model";
import { animationById, animationLength, describeAnimation, indexSite, keyframeAt, newId, planAddTrack, planDuplicateTrack, planScaleAnimation, planRemoveKeyframes, planSetKeyframeEasing, planShiftKeyframes, planUpdateAnimation, resolveTrackTarget, shiftDelta, trackSpan, trackTargetFor, withTargetKind } from "@atelier/model";
import { Badge, Button, Eyebrow, Hint, IconButton, NumberInput, PanelHeading, Select, TextInput, Toggle } from "@/ui";
import { canAddTrack, formatMs, nextZoom, quoteLabel, rulerTicks, sceneElements, summarizeAnimation, tickLabel, snapTime, trackLabel } from "@/lib/timeline";
import { nodeLabel } from "../node-icons";
import { EasingField } from "./EasingField";
import { KeyframePanels } from "./KeyframePanels";
import { TrackSettings } from "./TrackSettings";
import { revealBelowStage } from "./reveal";
import { TriggerSettings } from "./TriggerSettings";

type Commit = (op: Op, opts?: CommitOptions) => void;
type Key = { track: string; at: number };
const keyOf = (k: Key) => `${k.track}@${k.at}`;
const parseKey = (s: string): Key => { const i = s.lastIndexOf("@"); return { track: s.slice(0, i), at: Number(s.slice(i + 1)) }; };
const LOOPS = [{ value: "1", label: "Une fois" }, { value: "2", label: "2 fois" }, { value: "3", label: "3 fois" }, { value: "infinite", label: "En boucle" }];

export type TimelineProps = {
  site: Site; getSite: () => Site; animation: Animation; hostId: string;
  /** Le déclencheur qui lance l'animation ouverte, et s'il appartient à la page (défilement de la page). */
  trigger?: Trigger; pageLevel?: boolean;
  /** Élément sélectionné dans l'aperçu ou les calques (pour « Ajouter une piste » et pour suivre la piste de l'élément). */
  selected: Node | null;
  bp: string; mode?: string;
  commit: Commit; scrub: (t: number | null) => void; onClose: () => void; onSelect: (id: string) => void;
  /** Juste créée : le nom est mis en édition pour la nommer tout de suite. */
  focusName?: boolean;
  /** Mode « pioche » : le prochain élément cliqué dans l'aperçu, les calques ou le fil d'Ariane est remis à `handler` au lieu d'être sélectionné (`null` annule). */
  onPick?: (handler: ((id: string) => void) | null) => void;
  picking?: boolean;
  /** Montre dans l'aperçu les éléments de la piste active (contour pointillé et nom). */
  showTargets?: (ids: string[], label?: string) => void;
  /** « Tester sur le site » : l'onglet Aperçu, où l'élément qui lance l'animation arrive à l'écran. */
  onTestOnSite?: () => void;
  /** Montrer les animations d'un autre élément sélectionné (ferme ou remplace cette ligne de temps). */
  onOpenElement?: (nodeId: string) => void;
  /** Aide de lecture, sous la scène collante. */
  intro?: ReactNode;
  /** Règle le déclencheur qui lance l'animation ouverte (quand, délai, rejouer…), depuis la scène : les deux entrées disent la même chose. */
  onUpdateTrigger?: (patch: Partial<Trigger>, label: string, coalesceKey?: string) => void;
};

/**
 * Lecteur et ligne de temps d'une animation (cadrage § 4.1, étages 2 et 3) : lecture, boucle, ralenti, tête de lecture glissable ;
 * une ligne par piste avec ses images-clés (clic : sélectionner et s'y placer ; ⇧-clic : ajouter à la sélection ; glisser : déplacer ;
 * ⌥-glisser : dupliquer ; Suppr : retirer ; clic sur la portée : toute la piste) ; réglages de la piste (cible, décalage) ; puis l'image-clé
 * à la tête de lecture (courbe du segment, dupliquer, supprimer) et les panneaux Design en mode image-clé.
 */
export function Timeline({ site, getSite, animation, hostId, trigger, pageLevel, selected, bp, mode, commit, scrub, onClose, onSelect, focusName, onPick, picking, showTargets, onTestOnSite, onOpenElement, intro, onUpdateTrigger }: TimelineProps) {
  const length = Math.max(1, animationLength(animation));
  // Une apparition s'ouvre sur son état visible (audit n°5 · R10) : à 0 ms, l'élément est souvent invisible et l'on croit l'avoir fait disparaître.
  const [playhead, setPlayhead] = useState(() => ((trigger?.on === "load" || trigger?.on === "inView") && animation.tracks.some((t) => t.keyframes.length >= 2) ? length : 0));
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(animation.loop === "infinite");
  const [slow, setSlow] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [drag, setDrag] = useState<{ startX: number; width: number; delta: number; duplicate: boolean } | null>(null);
  // Piste choisie à la main (clic sur son nom, sur une image-clé) ; elle cède la place à la piste de l'élément dès qu'on en sélectionne un autre.
  const [picked, setPicked] = useState<{ track: string; forNode: string | null } | null>(null);
  const scrubRef = useRef(scrub);
  const pickRef = useRef(onPick);
  const targetsRef = useRef(showTargets);
  const rail = useRef<HTMLDivElement>(null);
  const scrollX = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  // Largeur visible de la règle, pour espacer les repères selon la place réelle (panneau redimensionnable).
  const [railPx, setRailPx] = useState(0);
  const root = useRef<HTMLElement>(null);
  // Réglages de la piste active : ramenés sous la scène collante quand la piste change (vague 4, P2 : « le champ Départ a disparu »).
  const settingsRef = useRef<HTMLDivElement>(null);
  const [pickMsg, setPickMsg] = useState<string | null>(null);
  // Liste des éléments de la scène (lot 8) : ouverte tant que l'animation a moins de deux pistes.
  const [listOpen, setListOpen] = useState(animation.tracks.length < 2);
  const [summaryOpen, setSummaryOpen] = useState(false);
  // Toujours les dernières fonctions de l'éditeur, sans relancer les effets qui les lisent (les refs se mettent à jour après le rendu, pas pendant).
  useEffect(() => { scrubRef.current = scrub; pickRef.current = onPick; targetsRef.current = showTargets; });
  // À l'ouverture : la ligne de temps vient à l'écran ; juste créée, son nom est prêt à être tapé.
  const focused = useRef(false);
  useEffect(() => {
    if (focused.current) return;
    focused.current = true;
    root.current?.scrollIntoView({ block: "nearest" });
    if (focusName) { const input = root.current?.querySelector<HTMLInputElement>("input[data-anim-name]"); input?.focus(); input?.select(); }
  }, [focusName]);
  // Zoom : ⌘ (ou Ctrl) + molette sur la règle ou les pistes ; écouteur non passif pour empêcher le zoom de la page.
  useEffect(() => {
    const el = scrollX.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { if (!(e.metaKey || e.ctrlKey)) return; e.preventDefault(); setZoom((z) => nextZoom(z, e.deltaY < 0 ? 1 : -1)); };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  useEffect(() => {
    const el = scrollX.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setRailPx(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Quitter la ligne de temps annule la pioche et retire le repère de l'aperçu.
  useEffect(() => () => { pickRef.current?.(null); targetsRef.current?.([]); }, []);

  // Lecture : la tête avance au rythme réel (ou au ralenti), boucle ou s'arrête à la fin.
  useEffect(() => {
    if (!playing) return;
    let raf = 0; let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) * (slow ? 0.5 : 1); last = now;
      setPlayhead((p) => { let n = p + dt; if (n >= length) { if (loop) n -= length; else { n = length; setPlaying(false); } } return n; });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, loop, slow, length]);
  // Chaque position de la tête est montrée dans l'aperçu ; fermer remet l'aperçu au repos.
  useEffect(() => { scrubRef.current(playhead); }, [playhead, animation]);
  useEffect(() => () => scrubRef.current(null), []);

  const index = useMemo(() => indexSite(site), [site]);
  const nodeOfTrack = (t: Track): Node | undefined => { const r = resolveTrackTarget(t.target, hostId); return "selector" in r ? undefined : index.get(r.node)?.node; };
  const byNode = selected ? animation.tracks.find((t) => nodeOfTrack(t)?.id === selected.id) : undefined;
  /** L'élément sélectionné, s'il n'est ni l'hôte ni visé par une piste de cette animation (ni l'enfant d'un élément dont les enfants sont animés). */
  const covered = !!selected && animation.tracks.some((t) => { const r = resolveTrackTarget(t.target, hostId); return !("selector" in r) && (r.node === selected.id || (!!r.children && index.get(selected.id)?.parent?.id === r.node)); });
  const outside = onOpenElement && selected && selected.id !== hostId && !covered && !picking ? selected : null;
  const pickedTrack = picked && (picked.forNode === (selected?.id ?? null) || !byNode) ? animation.tracks.find((t) => t.id === picked.track) : undefined;
  const track = pickedTrack ?? byNode ?? animation.tracks[0];
  const at = snapTime(playhead);

  const run = (ops: Op[], label: string, coalesceKey?: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const pause = () => { setPlaying(false); setPlayhead((p) => snapTime(p)); };
  const pct = (t: number) => `${(t / length) * 100}%`;
  /** Change le zoom en gardant la tête de lecture à l'écran. */
  const zoomTo = (z: number) => {
    setZoom(z);
    window.requestAnimationFrame(() => { const el = scrollX.current; if (el) el.scrollLeft = Math.max(0, (playhead / length) * el.scrollWidth - el.clientWidth / 2); });
  };
  const seek = (clientX: number) => { const r = rail.current?.getBoundingClientRect(); if (!r || r.width <= 0) return; setPlayhead(snapTime(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * length)); };
  const capture = (e: React.PointerEvent) => { try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* pointeur déjà relâché */ } };
  const onRailDown = (e: React.PointerEvent) => { pause(); capture(e); seek(e.clientX); };
  const onRailMove = (e: React.PointerEvent) => { if (e.buttons & 1) seek(e.clientX); };
  const pick = (t: Track) => { setPicked({ track: t.id, forNode: selected?.id ?? null }); };

  // --- images-clés : sélection, glisser (⌥ duplique), suppression
  const keys = [...selection].map(parseKey).filter((k) => animation.tracks.some((t) => t.id === k.track && keyframeAt(t, k.at)));
  const dragDelta = drag ? shiftDelta(keys, drag.delta) : 0;
  // Une barre de piste qu'on tire (vague 5 : les barres ressemblent à des blocs déplaçables, elles ne déplaçaient que la tête de lecture) suit le glissement de ses images-clés.
  const barShift = (t: Track) => (drag && !drag.duplicate && t.keyframes.length > 0 && t.keyframes.every((k) => selection.has(keyOf({ track: t.id, at: k.at }))) ? dragDelta : 0);
  const onKeyDown = (t: Track, k: number) => (e: React.PointerEvent) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    pause(); pick(t);
    const key = keyOf({ track: t.id, at: k });
    const next = new Set(selection);
    if (e.shiftKey) { if (next.has(key)) next.delete(key); else next.add(key); }
    else if (!next.has(key)) { next.clear(); next.add(key); }
    setSelection(next);
    setPlayhead(k);
    const r = rail.current?.getBoundingClientRect();
    if (r && next.has(key)) { capture(e); setDrag({ startX: e.clientX, width: r.width, delta: 0, duplicate: e.altKey }); }
  };
  // Le mouvement reste sur l'image-clé : la ligne de la piste ne doit pas déplacer la tête de lecture en même temps.
  const onKeyMove = (e: React.PointerEvent) => { e.stopPropagation(); if (!drag) return; setDrag({ ...drag, delta: Math.round(((e.clientX - drag.startX) / drag.width) * length / 10) * 10, duplicate: drag.duplicate || e.altKey }); };
  const onKeyUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!drag) return;
    const d = dragDelta;
    setDrag(null);
    if (!d) return;
    const label = drag.duplicate ? "Dupliquer les images-clés" : "Déplacer les images-clés";
    run(planShiftKeyframes(getSite(), animation.id, keys, d, { duplicate: drag.duplicate }), label);
    setSelection(new Set(keys.map((k) => keyOf({ track: k.track, at: k.at + d }))));
    setPlayhead((p) => Math.max(0, p + d));
  };
  const removeSelected = () => { if (!keys.length) return; run(planRemoveKeyframes(getSite(), animation.id, keys), keys.length > 1 ? "Retirer les images-clés" : "Retirer l'image-clé"); setSelection(new Set()); };
  const onTimelineKey = (e: React.KeyboardEvent) => {
    if ((e.key === "Delete" || e.key === "Backspace") && keys.length) { e.preventDefault(); e.stopPropagation(); removeSelected(); }
    if (e.key === "Escape" && selection.size) { e.stopPropagation(); setSelection(new Set()); }
  };

  // --- animation : nom, durée, répétitions
  const update = (patch: Partial<Animation>, label: string, coalesceKey?: string) => run(planUpdateAnimation(getSite(), animation.id, patch), label, coalesceKey);
  const canAdd = canAddTrack(site, animation, hostId, selected?.id);
  /** Ajoute une piste pour un élément (sélectionné, ou pris à la pioche) : elle devient la piste active. */
  const addTrackFor = (nodeId: string, kind?: "children") => {
    const current = getSite();
    const a = animationById(current, animation.id);
    if (!a) return;
    const ok = canAddTrack(current, a, hostId, nodeId);
    if (!ok.ok) { setPickMsg(ok.reason); return; }
    setPickMsg(null);
    const base = trackTargetFor(hostId, nodeId);
    // Un groupe (les trois chiffres) : sa piste vise ses enfants, échelonnés de 100 ms (lot 8).
    const t: Track = { id: newId(), target: kind === "children" ? withTargetKind(base, "children") : base, ...(kind === "children" ? { stagger: { each: 100 } } : {}), keyframes: [{ at: 0, style: {} }] };
    const n = indexSite(current).get(nodeId)?.node;
    run(planAddTrack(current, animation.id, t), `Ajouter une piste · ${kind === "children" ? "les enfants de " : ""}${n ? nodeLabel(n) : nodeId}`);
    setPicked({ track: t.id, forNode: selected?.id ?? null });
  };
  const addTrack = () => { if (selected && canAdd.ok) addTrackFor(selected.id); };
  const startPick = () => { setPickMsg(null); onPick?.((id) => addTrackFor(id)); };

  const ticks = rulerTicks(length, zoom, railPx || undefined);
  const kfHere = track ? keyframeAt(track, at) : undefined;
  const sorted = track ? [...track.keyframes].sort((a, b) => a.at - b.at) : [];
  const prevKf = kfHere ? [...sorted].reverse().find((k) => k.at < at) : undefined;
  const trackNode = track ? nodeOfTrack(track) : undefined;
  // Repère dans l'aperçu : les éléments de la piste active.
  const targetId = trackNode?.id;
  const targetLabel = track ? trackLabel(track, hostId, site) : undefined;
  useEffect(() => { targetsRef.current?.(targetId ? [targetId] : [], targetLabel); }, [targetId, targetLabel]);
  const trackId = track?.id;
  useEffect(() => { if (trackId) revealBelowStage(settingsRef.current, null); }, [trackId]);

  return (
    <section ref={root} className="grid grid-cols-[minmax(360px,1fr)_minmax(280px,380px)] h-full min-h-0 min-w-[640px]" aria-label="Ligne de temps" onKeyDown={(e) => { const t = e.target as HTMLElement; if (e.key === " " && !["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) && !t.isContentEditable) { e.preventDefault(); if (playing) pause(); else { if (playhead >= length) setPlayhead(0); setPlaying(true); } } }}>
      {/* Deux colonnes dans le tiroir (23 septembre 2026, chantier 3) : la scène (nom, lecteur, règle, pistes) à gauche, les réglages de la piste et de l'image-clé à droite. Chacune défile seule : plus de scène collante. */}
      <div className="@container flex flex-col min-h-0 min-w-0 border-r border-line" data-timeline-stage="">
      <div className="flex items-center gap-1 px-3 h-9 shrink-0 border-b border-line">
        <Eyebrow as="span">Animation</Eyebrow>
        <TextInput className="w-[180px] min-w-0" value={animation.name} aria-label="Nom de l'animation" data-anim-name="" title="Nom de l'animation (Entrée pour valider)" onValueChange={(v) => update({ name: v || animation.name }, "Renommer l'animation", `anim-name:${animation.id}`)} />
        <Badge title={describeAnimation(animation)}>{formatMs(length)}</Badge>
        <span className="mx-1 h-4 w-px bg-line" aria-hidden />
        <IconButton size="sm" label="Revenir au début" icon={SkipBack} onClick={() => { setPlaying(false); setPlayhead(0); }} />
        <Button size="sm" variant={playing ? "default" : "primary"} icon={playing ? Pause : Play} title={playing ? "Pause (Espace)" : "Joue la scène dans l'aperçu (Espace)"} onClick={() => { if (playing) pause(); else { if (playhead >= length) setPlayhead(0); setPlaying(true); } }}>{playing ? "Pause" : "Lire"}</Button>
        <IconButton size="sm" label="Lire en boucle" icon={Repeat} active={loop} onClick={() => setLoop((l) => !l)} />
        <IconButton size="sm" label="Ralenti (vitesse ½)" icon={Snail} active={slow} onClick={() => setSlow((s) => !s)} />
        <span className="mx-1 h-4 w-px bg-line" aria-hidden />
        <IconButton size="sm" label="Dézoomer la ligne de temps (⌘ + molette)" icon={ZoomOut} disabled={zoom <= 1} onClick={() => zoomTo(nextZoom(zoom, -1))} />
        <button type="button" className="h-7 min-w-9 px-1 rounded-sm text-2xs tabular-nums text-muted hover:text-ink hover:bg-hover disabled:opacity-40" disabled={zoom === 1} title="Ajuster : toute la ligne de temps dans la largeur" onClick={() => zoomTo(1)}>{zoom === 1 ? "×1" : `×${String(zoom).replace(".", ",")}`}</button>
        <IconButton size="sm" label="Zoomer la ligne de temps (⌘ + molette)" icon={ZoomIn} disabled={zoom >= 8} onClick={() => zoomTo(nextZoom(zoom, 1))} />
        <span className="ml-auto text-xs tabular-nums text-muted" aria-live="off">{tickLabel(playhead)} / {formatMs(length)}</span>
        <IconButton size="sm" label="Fermer la ligne de temps" icon={X} onClick={onClose} />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-3 py-2 flex text-xs" onKeyDown={onTimelineKey}>
        {/* Noms des pistes, alignés sur la règle et les lignes de droite. */}
        <div className="w-[104px] shrink-0 flex flex-col pr-2">
          <span className="h-5 shrink-0" aria-hidden />
          {animation.tracks.map((t) => {
            const active = t.id === track?.id;
            const label = trackLabel(t, hostId, site);
            return <button key={t.id} type="button" className={`h-7 shrink-0 text-left text-xs truncate ${active ? "text-accent font-medium" : "text-muted hover:text-accent"}`} title={label} aria-current={active || undefined} onClick={() => { pick(t); const n = nodeOfTrack(t); if (n) onSelect(n.id); }}>{label}</button>;
          })}
        </div>
        {/* Règle et pistes dans un même défilement horizontal : zoomée, la ligne de temps s'élargit et défile (⌘ + molette, ou les boutons du lecteur). */}
        <div ref={scrollX} className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden">
          <div className="relative px-2" style={{ width: `${zoom * 100}%`, minWidth: "100%" }}>
            <div ref={rail} className="relative h-5 border-b border-line cursor-ew-resize select-none" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead)} tabIndex={0} onPointerDown={onRailDown} onPointerMove={onRailMove}
              onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); setPlayhead((p) => Math.min(length, snapTime(p) + (e.shiftKey ? 100 : 10))); } if (e.key === "ArrowLeft") { e.preventDefault(); setPlayhead((p) => Math.max(0, snapTime(p) - (e.shiftKey ? 100 : 10))); } if (e.key === " ") { e.preventDefault(); if (playing) pause(); else setPlaying(true); } }}>
              {ticks.map((t) => <span key={t} className="absolute top-0 text-2xs text-dim -translate-x-1/2" style={{ left: pct(t) }}>{tickLabel(t)}</span>)}
              <span className="absolute top-0 bottom-0 w-px bg-accent" style={{ left: pct(playhead) }} aria-hidden />
            </div>
            {animation.tracks.map((t) => {
              const active = t.id === track?.id;
              const span = trackSpan(t);
              return (
                <div key={t.id} className={`relative h-7 border-b border-line/60 ${active ? "bg-accent-soft/20" : ""}`} onPointerDown={(e) => { pick(t); onRailDown(e); }} onPointerMove={onRailMove}>
                  {t.keyframes.length > 1 ? (
                    <button type="button" tabIndex={-1} title="Glisser pour décaler la piste dans le temps (clic : sélectionner ses images-clés)" aria-label={`Toutes les images-clés de ${trackLabel(t, hostId, site)}`} className="absolute top-1/2 -translate-y-1/2 h-3 group cursor-grab active:cursor-grabbing"
                      style={{ left: pct(barShift(t) + span.start), width: `calc(${pct(span.end)} - ${pct(span.start)})` }}
                      onPointerDown={(e) => { e.stopPropagation(); if (e.button !== 0) return; pause(); pick(t); setSelection(new Set(t.keyframes.map((k) => keyOf({ track: t.id, at: k.at })))); const r = rail.current?.getBoundingClientRect(); if (r && r.width > 0) { capture(e); setDrag({ startX: e.clientX, width: r.width, delta: 0, duplicate: false }); } }}
                      onPointerMove={onKeyMove} onPointerUp={onKeyUp} onPointerCancel={() => setDrag(null)}>
                      <span className="block h-0.5 w-full bg-line-strong group-hover:bg-accent/60" aria-hidden />
                    </button>
                  ) : null}
                  {t.keyframes.map((k) => {
                    const key = keyOf({ track: t.id, at: k.at });
                    const isSel = selection.has(key);
                    const shown = isSel && drag ? Math.max(0, k.at + dragDelta) : k.at;
                    return (
                      <button key={k.at} type="button" title={`${k.at} ms${k.easing ? ` · ${k.easing}` : ""} · ⇧-clic : ajouter à la sélection · glisser : déplacer · ⌥-glisser : dupliquer · Suppr : retirer`} aria-label={`Image-clé à ${k.at} ms`} aria-pressed={isSel}
                        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-xs cursor-grab active:cursor-grabbing ${isSel ? "text-accent" : "text-ink hover:text-accent"}`} style={{ left: pct(shown) }}
                        onPointerDown={onKeyDown(t, k.at)} onPointerMove={onKeyMove} onPointerUp={onKeyUp} onPointerCancel={() => setDrag(null)}>
                        <Diamond size={10} fill="currentColor" aria-hidden />
                      </button>
                    );
                  })}
                  {drag?.duplicate && dragDelta ? keys.filter((k) => k.track === t.id).map((k) => <span key={`ghost-${k.at}`} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 text-accent/40 pointer-events-none" style={{ left: pct(k.at) }} aria-hidden><Diamond size={10} fill="currentColor" /></span>) : null}
                  <span className="absolute top-0 bottom-0 w-px bg-accent/70 pointer-events-none" style={{ left: pct(playhead) }} aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="shrink-0 flex flex-wrap items-center gap-1 px-3 py-1.5 border-t border-line">
        {onTestOnSite ? <Button size="sm" variant="ghost" icon={ExternalLink} onClick={onTestOnSite} title="Ouvre l'onglet Aperçu : l'élément arrive à l'écran et l'animation se joue comme pour un visiteur">Tester sur le site</Button> : null}
        {onPick ? <Button size="sm" icon={Crosshair} active={picking} onClick={() => (picking ? onPick(null) : startPick())} title="Cliquez ensuite l'élément à animer dans l'aperçu, les calques ou le fil d'Ariane, sans changer la sélection">{picking ? "Cliquez un élément… (Échap)" : "Choisir un élément"}</Button> : null}
        {canAdd.ok && selected && !outside ? <Button size="sm" variant="ghost" icon={Plus} onClick={addTrack} title="Animer l'élément sélectionné dans cette ligne de temps">{`Une piste pour « ${nodeLabel(selected)} »`}</Button> : null}
        {pickMsg ? <span className="text-2xs text-warning truncate" title={pickMsg}>{pickMsg}</span> : null}
        <span className="ml-auto text-2xs text-muted leading-snug hidden @[720px]:inline" title="La tête de lecture pilote l'aperçu">L&apos;aperçu montre l&apos;instant de la tête de lecture.</span>
      </div>
      </div>
      <div className="flex flex-col gap-2 p-3 min-h-0 min-w-0 overflow-auto" data-timeline-settings="">
      {/* Le déclencheur et le rythme de l'animation en tête des réglages (23 septembre 2026) : la scène de gauche ne montre plus que les pistes. */}
      {/* Ce qui va se passer sur le site, en une phrase (audit n°5 · R2) : se relit à chaque réglage. */}
      {/* Deux lignes au plus dans le bloc collant (vague 5, P4 : une ligne de plus par piste décalait tout sous la souris) ; un clic déplie. */}
      {trigger ? (
        <p className={`-mt-1 text-xs text-muted leading-snug cursor-pointer ${summaryOpen ? "" : "line-clamp-2"}`} title={summaryOpen ? "Replier" : "Tout lire"} onClick={() => setSummaryOpen((o) => !o)}><span data-anim-summary="">{summarizeAnimation(site, trigger, hostId, pageLevel)}</span></p>
      ) : null}
      {/* Le déclencheur se règle ici aussi (vague 3, § 5.4) : quand, délai, rejouer, retour, bascule, comme dans la rubrique de l'élément. */}
      {trigger && onUpdateTrigger ? <TriggerSettings trigger={trigger} pageLevel={pageLevel} onUpdate={onUpdateTrigger} /> : null}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5">
        {/* Durée = vitesse (audit n°5 · R1) : la changer ralentit ou accélère toute l'animation, images-clés et décalages compris. */}
        <NumberInput className="w-[92px]" unit="ms" min={100} step={100} value={length} title="Durée : la changer ralentit ou accélère toute l'animation (images-clés et décalages suivent)" onValueChange={(n) => { if (n === "" || n === length) return; run(planScaleAnimation(getSite(), animation.id, Math.max(100, n)), "Durée de l'animation", `anim-dur:${animation.id}`); setPlayhead((p) => Math.round((p * Math.max(100, n)) / length)); }} />
        <Select value={String(animation.loop ?? 1)} options={LOOPS} onValueChange={(v) => update({ loop: v === "1" ? undefined : v === "infinite" ? "infinite" : Number(v), ...(v === "1" ? { alternate: undefined } : {}) }, "Répétitions")} />
        <Toggle checked={!!animation.alternate} disabled={!animation.loop || animation.loop === 1} label="aller-retour" title={!animation.loop || animation.loop === 1 ? "Choisissez d'abord des répétitions (2, 3 ou en boucle)" : "Rejoue à l'envers une fois sur deux"} onChange={(b) => update({ alternate: b || undefined }, "Aller-retour")} />
      </div>
      {/* Les réglages de la piste active avant la liste des éléments (vague 5 : le champ « Départ » était rogné sous elle). */}
      {track ? <div ref={settingsRef}><TrackSettings key={track.id} site={site} getSite={getSite} animation={animation} track={track} node={trackNode} hostId={hostId} run={run} onFilled={(end) => { pause(); setPlayhead(Math.min(end, Math.max(length, end))); }} onRemoved={() => { setPicked(null); setSelection(new Set()); }} /></div> : null}
      {/* Les éléments de la scène (lot 8, vague 4 PR2) : ajouter une piste par son nom, sans viser dans la page ; un groupe s'ajoute d'un coup, enfants un à un. */}
      {(() => {
        const list = sceneElements(site, hostId);
        if (!list.length) return null;
        const tracked = (id: string) => animation.tracks.some((t) => { const r = resolveTrackTarget(t.target, hostId); return !("selector" in r) && r.node === id; });
        return (
          <div className="flex flex-col gap-0.5" data-scene-elements="">
            <button type="button" className="self-start text-2xs text-muted hover:text-ink" aria-expanded={listOpen} onClick={() => setListOpen((o) => !o)}>{listOpen ? "▾" : "▸"} Éléments de la scène ({list.length})</button>
            {listOpen ? (
              <ul className="flex flex-col max-h-[40vh] overflow-y-auto rounded-sm border border-line bg-surface/60" aria-label="Éléments de la scène">
                {list.map((e) => (
                  <li key={e.id} className="flex items-center gap-1 h-7 pr-1 text-xs border-b border-line/60 last:border-b-0" style={{ paddingLeft: 6 + e.depth * 12 }}>
                    <span className="flex-1 min-w-0 truncate text-ink">{e.label}{e.count ? <span className="text-muted">{` · ${e.count} éléments`}</span> : null}</span>
                    {tracked(e.id) ? <Badge title="Cet élément a déjà sa piste">◆ piste</Badge> : (
                      <>
                        <Button size="sm" variant="ghost" icon={Plus} onClick={() => addTrackFor(e.id)} title={`Ajouter une piste pour ${quoteLabel(e.label)}`}>Ajouter</Button>
                        {e.count ? <Button size="sm" variant="ghost" onClick={() => addTrackFor(e.id, "children")} title={`Une seule piste pour ses ${e.count} éléments, qui partent l'un après l'autre (100 ms d'écart)`}>{`les ${e.count} un à un`}</Button> : null}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })()}
      {/* Un autre élément sélectionné (tests simulés, PR5) : on dit qu'il n'est pas dans cette animation et on laisse choisir entre ouvrir les siennes et l'ajouter ici. */}
      {outside ? (
        <div className="flex flex-col gap-1 rounded-sm border border-accent/50 bg-accent-soft/20 p-1.5" role="status">
          <span className="text-xs text-ink">{`« ${nodeLabel(outside).replace(/ « .*$/, "")} » n'est pas dans cette animation.`}</span>
          <div className="flex flex-wrap gap-1">
            <Button size="sm" onClick={() => onOpenElement!(outside.id)} title="Ferme cette ligne de temps et montre ce qui fait bouger l'élément sélectionné">Voir ses animations</Button>
            {canAdd.ok ? <Button size="sm" variant="ghost" icon={Plus} onClick={addTrack} title="Ajoute l'élément sélectionné comme piste de cette animation">L&apos;ajouter à cette animation</Button> : null}
            {canAdd.ok && track && track.keyframes.length >= 2 ? <Button size="sm" variant="ghost" icon={Copy} title={`Une piste pour ${quoteLabel(nodeLabel(outside))} avec les mêmes images-clés que « ${trackLabel(track, hostId, site)} », qui part après elle`} onClick={() => { const current = getSite(); const id = newId(); run(planDuplicateTrack(current, animation.id, track.id, outside.id, { trackId: id }), `Reprendre la piste pour ${nodeLabel(outside)}`); setPicked({ track: id, forNode: outside.id }); }}>{`Reprendre « ${trackLabel(track, hostId, site)} » pour lui`}</Button> : null}
          </div>
        </div>
      ) : null}
      {intro}
      {trigger?.on === "scroll" ? <Hint>{`Au défilement ${pageLevel ? "de la page" : "de l'élément"}, la position entre ${Math.round((trigger.range?.[0] ?? 0) * 100)} % et ${Math.round((trigger.range?.[1] ?? 1) * 100)} % parcourt cette ligne de temps : la tête de lecture montre l'état à chaque position.`}</Hint>
        : trigger?.on === "pointer" ? <Hint>{`La position ${trigger.axis === "x" ? "horizontale" : "verticale"} de la souris dans la fenêtre parcourt cette ligne de temps : la tête de lecture montre l'état à chaque position.`}</Hint> : null}

      {!animation.tracks.length ? (
        <Hint>
          <span className="block font-medium text-ink">Composer cette animation</span>
          1. Nommez-la ci-dessus. 2. « Choisir un élément », puis cliquez l&apos;élément à animer (l&apos;élément qui lance l&apos;animation compris). 3. Sur sa piste, « Remplir avec » un préréglage, ou placez la tête de lecture et réglez ses propriétés : les images-clés se créent.
        </Hint>
      ) : null}


      {track && !playing ? (
        <section className="flex flex-col gap-2" aria-label="Image-clé">
          <PanelHeading className="px-0" actions={kfHere ? (
            <div className="flex items-center gap-0.5">
              <IconButton size="sm" label="Dupliquer l'image-clé un peu plus loin" icon={Copy} onClick={() => { let d = 100; while (keyframeAt(track, at + d)) d += 100; run(planShiftKeyframes(getSite(), animation.id, [{ track: track.id, at }], d, { duplicate: true }), "Dupliquer l'image-clé"); setPlayhead(at + d); setSelection(new Set([keyOf({ track: track.id, at: at + d })])); }} />
              <IconButton size="sm" label="Supprimer l'image-clé" icon={Trash2} onClick={() => { run(planRemoveKeyframes(getSite(), animation.id, [{ track: track.id, at }]), "Retirer l'image-clé"); setSelection(new Set()); }} />
            </div>
          ) : undefined}>{kfHere ? `◆ Image-clé à ${at} ms` : `Instant ${at} ms`}</PanelHeading>
          {kfHere ? (
            <div className="grid grid-cols-[80px_1fr] items-center gap-1.5">
              <span className="text-xs text-muted" title="Temps exact de l'image-clé ; une image-clé déjà à ce temps est remplacée">Temps</span>
              <NumberInput className="w-[110px]" unit="ms" min={0} step={10} value={at} onValueChange={(n) => { if (n === "") return; const d = snapTime(n) - at; if (!d) return; run(planShiftKeyframes(getSite(), animation.id, [{ track: track.id, at }], d), "Déplacer l'image-clé"); setPlayhead(Math.max(0, at + d)); setSelection(new Set([keyOf({ track: track.id, at: Math.max(0, at + d) })])); }} />
            </div>
          ) : null}
          {kfHere && prevKf ? (
            <div className="grid grid-cols-[80px_1fr] items-start gap-1.5">
              <span className="text-xs text-muted pt-1.5" title="Courbe pour atteindre cette image-clé depuis la précédente">Courbe</span>
              <EasingField value={kfHere.easing} segment={at - prevKf.at}
                onChange={(e) => run(planSetKeyframeEasing(getSite(), animation.id, track.id, at, e), "Courbe du segment", `kf-ease:${animation.id}:${track.id}:${at}`)}
                onFitSpring={(dur) => { const d = prevKf.at + dur - at; const later = track.keyframes.filter((k) => k.at >= at).map((k) => ({ track: track.id, at: k.at })); run(planShiftKeyframes(getSite(), animation.id, later, d), "Caler le segment sur le ressort"); setPlayhead(at + d); setSelection(new Set([keyOf({ track: track.id, at: at + d })])); }} />
            </div>
          ) : null}
          {!kfHere ? <Hint>Aucune image-clé à cet instant sur « {trackLabel(track, hostId, site)} » : réglez une propriété ci-dessous, l&apos;image-clé se crée.</Hint> : !prevKf ? <Hint>Première image-clé de la piste : elle fixe l&apos;état de départ. Une image-clé vide vaut l&apos;état de repos.</Hint> : null}
          {trackNode ? <KeyframePanels site={site} getSite={getSite} node={trackNode} bp={bp} mode={mode} animationId={animation.id} track={track} at={at} commit={commit} /> : <Hint>Cette piste vise un sélecteur libre : ses images-clés se règlent pour l&apos;instant dans le code du site.</Hint>}
        </section>
      ) : track && playing ? <Hint>Lecture en cours : mettez en pause pour régler l&apos;image-clé à la tête de lecture.</Hint> : null}
      </div>
    </section>
  );
}
