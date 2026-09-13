"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Diamond, Pause, Play, Plus, Repeat, SkipBack, Snail, Trash2, X } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Site, Track } from "@atelier/model";
import { STAGGER_FROM_LABELS, animationLength, describeAnimation, indexSite, keyframeAt, newId, planAddTrack, planRemoveKeyframes, planRemoveTrack, planSetKeyframeEasing, planShiftKeyframes, planUpdateAnimation, planUpdateTrack, resolveTrackTarget, shiftDelta, trackSpan, trackTargetFor, withTargetKind } from "@atelier/model";
import { Badge, Button, Hint, IconButton, NumberInput, PanelHeading, Select, TextInput, Toggle } from "@/ui";
import { canAddTrack, formatTime, rulerTicks, snapTime, targetKindOf, targetKindOptions, trackLabel, type TargetKind } from "@/lib/timeline";
import { AppearancePanel, EffectsPanel, SizePanel, SpacingPanel, TypographyPanel, useKeyframeStyle } from "../design";
import { nodeLabel } from "../node-icons";
import { EasingField } from "./EasingField";

type Commit = (op: Op, opts?: CommitOptions) => void;
type Key = { track: string; at: number };
const keyOf = (k: Key) => `${k.track}@${k.at}`;
const parseKey = (s: string): Key => { const i = s.lastIndexOf("@"); return { track: s.slice(0, i), at: Number(s.slice(i + 1)) }; };
const LOOPS = [{ value: "1", label: "Une fois" }, { value: "2", label: "2 fois" }, { value: "3", label: "3 fois" }, { value: "infinite", label: "En boucle" }];

export type TimelineProps = {
  site: Site; getSite: () => Site; animation: Animation; hostId: string;
  /** Élément sélectionné dans l'aperçu ou les calques (pour « Ajouter une piste » et pour suivre la piste de l'élément). */
  selected: Node | null;
  bp: string; mode?: string;
  commit: Commit; scrub: (t: number | null) => void; onClose: () => void; onSelect: (id: string) => void;
};

/**
 * Lecteur et ligne de temps d'une animation (cadrage § 4.1, étages 2 et 3) : lecture, boucle, ralenti, tête de lecture glissable ;
 * une ligne par piste avec ses images-clés (clic : sélectionner et s'y placer ; ⇧-clic : ajouter à la sélection ; glisser : déplacer ;
 * ⌥-glisser : dupliquer ; Suppr : retirer ; clic sur la portée : toute la piste) ; réglages de la piste (cible, décalage) ; puis l'image-clé
 * à la tête de lecture (courbe du segment, dupliquer, supprimer) et les panneaux Design en mode image-clé.
 */
export function Timeline({ site, getSite, animation, hostId, selected, bp, mode, commit, scrub, onClose, onSelect }: TimelineProps) {
  const length = Math.max(1, animationLength(animation));
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(animation.loop === "infinite");
  const [slow, setSlow] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [drag, setDrag] = useState<{ startX: number; width: number; delta: number; duplicate: boolean } | null>(null);
  // Piste choisie à la main (clic sur son nom, sur une image-clé) ; elle cède la place à la piste de l'élément dès qu'on en sélectionne un autre.
  const [picked, setPicked] = useState<{ track: string; forNode: string | null } | null>(null);
  const scrubRef = useRef(scrub);
  const rail = useRef<HTMLDivElement>(null);
  // Toujours la dernière fonction de l'éditeur, sans relancer les effets qui la lisent (la ref se met à jour après le rendu, pas pendant).
  useEffect(() => { scrubRef.current = scrub; });

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
  const pickedTrack = picked && (picked.forNode === (selected?.id ?? null) || !byNode) ? animation.tracks.find((t) => t.id === picked.track) : undefined;
  const track = pickedTrack ?? byNode ?? animation.tracks[0];
  const at = snapTime(playhead);

  const run = (ops: Op[], label: string, coalesceKey?: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const pause = () => { setPlaying(false); setPlayhead((p) => snapTime(p)); };
  const pct = (t: number) => `${(t / length) * 100}%`;
  const seek = (clientX: number) => { const r = rail.current?.getBoundingClientRect(); if (!r || r.width <= 0) return; setPlayhead(snapTime(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * length)); };
  const capture = (e: React.PointerEvent) => { try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* pointeur déjà relâché */ } };
  const onRailDown = (e: React.PointerEvent) => { pause(); capture(e); seek(e.clientX); };
  const onRailMove = (e: React.PointerEvent) => { if (e.buttons & 1) seek(e.clientX); };
  const pick = (t: Track) => { setPicked({ track: t.id, forNode: selected?.id ?? null }); };

  // --- images-clés : sélection, glisser (⌥ duplique), suppression
  const keys = [...selection].map(parseKey).filter((k) => animation.tracks.some((t) => t.id === k.track && keyframeAt(t, k.at)));
  const dragDelta = drag ? shiftDelta(keys, drag.delta) : 0;
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
  const tracksEnd = Math.max(0, ...animation.tracks.map((t) => trackSpan(t).end));
  const canAdd = canAddTrack(site, animation, hostId, selected?.id);
  const addTrack = () => {
    if (!selected || !canAdd.ok) return;
    const t: Track = { id: newId(), target: trackTargetFor(hostId, selected.id), keyframes: [{ at: 0, style: {} }] };
    run(planAddTrack(getSite(), animation.id, t), `Ajouter une piste · ${nodeLabel(selected)}`);
    setPicked({ track: t.id, forNode: selected.id });
  };

  const ticks = rulerTicks(length);
  const kfHere = track ? keyframeAt(track, at) : undefined;
  const sorted = track ? [...track.keyframes].sort((a, b) => a.at - b.at) : [];
  const prevKf = kfHere ? [...sorted].reverse().find((k) => k.at < at) : undefined;
  const trackNode = track ? nodeOfTrack(track) : undefined;

  return (
    <section className="flex flex-col gap-2" aria-label="Ligne de temps">
      <div className="flex items-center gap-1">
        <TextInput className="flex-1" value={animation.name} aria-label="Nom de l'animation" onValueChange={(v) => update({ name: v || animation.name }, "Renommer l'animation", `anim-name:${animation.id}`)} />
        <Badge title={describeAnimation(animation)}>{formatTime(length)}</Badge>
        <IconButton size="sm" label="Fermer la ligne de temps" icon={X} onClick={onClose} />
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5">
        <NumberInput className="w-[92px]" unit="ms" min={Math.max(100, tracksEnd)} step={100} value={animation.duration} title="Durée de la ligne de temps (au moins la dernière image-clé)" onValueChange={(n) => update({ duration: Math.max(n === "" ? 0 : n, tracksEnd, 100) }, "Durée de l'animation", `anim-dur:${animation.id}`)} />
        <Select value={String(animation.loop ?? 1)} options={LOOPS} onValueChange={(v) => update({ loop: v === "1" ? undefined : v === "infinite" ? "infinite" : Number(v), ...(v === "1" ? { alternate: undefined } : {}) }, "Répétitions")} />
        <Toggle checked={!!animation.alternate} disabled={!animation.loop || animation.loop === 1} label="aller-retour" title="En boucle : rejoue à l'envers une fois sur deux" onChange={(b) => update({ alternate: b || undefined }, "Aller-retour")} />
      </div>
      <div className="flex items-center gap-1">
        <IconButton size="sm" label="Revenir au début" icon={SkipBack} onClick={() => { setPlaying(false); setPlayhead(0); }} />
        <IconButton size="sm" label={playing ? "Pause" : "Lecture"} icon={playing ? Pause : Play} active={playing} onClick={() => { if (playing) pause(); else { if (playhead >= length) setPlayhead(0); setPlaying(true); } }} />
        <IconButton size="sm" label="Lire en boucle" icon={Repeat} active={loop} onClick={() => setLoop((l) => !l)} />
        <IconButton size="sm" label="Ralenti (vitesse ½)" icon={Snail} active={slow} onClick={() => setSlow((s) => !s)} />
        <span className="ml-auto text-xs tabular-nums text-muted" aria-live="off">{formatTime(playhead)} / {formatTime(length)}</span>
      </div>

      <div className="grid grid-cols-[96px_1fr] gap-x-2 text-xs" onKeyDown={onTimelineKey}>
        <span />
        <div ref={rail} className="relative h-5 border-b border-line cursor-ew-resize select-none" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead)} tabIndex={0} onPointerDown={onRailDown} onPointerMove={onRailMove}
          onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); setPlayhead((p) => Math.min(length, snapTime(p) + (e.shiftKey ? 100 : 10))); } if (e.key === "ArrowLeft") { e.preventDefault(); setPlayhead((p) => Math.max(0, snapTime(p) - (e.shiftKey ? 100 : 10))); } if (e.key === " ") { e.preventDefault(); if (playing) pause(); else setPlaying(true); } }}>
          {ticks.map((t) => <span key={t} className="absolute top-0 text-2xs text-dim -translate-x-1/2" style={{ left: pct(t) }}>{t >= 1000 ? `${(t / 1000).toString().replace(".", ",")}s` : t}</span>)}
          <span className="absolute top-0 bottom-0 w-px bg-accent" style={{ left: pct(playhead) }} aria-hidden />
        </div>
        {animation.tracks.map((t) => {
          const active = t.id === track?.id;
          const span = trackSpan(t);
          return (
            <TrackRow key={t.id} active={active} label={trackLabel(t, hostId, site)} onLabelClick={() => { pick(t); const n = nodeOfTrack(t); if (n) onSelect(n.id); }}>
              <div className={`relative h-7 border-b border-line/60 ${active ? "bg-accent-soft/20" : ""}`} onPointerDown={(e) => { pick(t); onRailDown(e); }} onPointerMove={onRailMove}>
                {t.keyframes.length > 1 ? (
                  <button type="button" tabIndex={-1} title="Sélectionner toutes les images-clés de la piste" aria-label={`Toutes les images-clés de ${trackLabel(t, hostId, site)}`} className="absolute top-1/2 -translate-y-1/2 h-3 group"
                    style={{ left: pct(span.start), width: `calc(${pct(span.end)} - ${pct(span.start)})` }}
                    onPointerDown={(e) => { e.stopPropagation(); pause(); pick(t); setSelection(new Set(t.keyframes.map((k) => keyOf({ track: t.id, at: k.at })))); }}>
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
            </TrackRow>
          );
        })}
        <span />
        <div className="flex items-center gap-1 pt-1">
          <Button size="sm" icon={Plus} disabled={!canAdd.ok} onClick={addTrack} title={canAdd.ok ? "Animer aussi l'élément sélectionné dans cette ligne de temps" : canAdd.reason}>{canAdd.ok && selected ? `Ajouter « ${nodeLabel(selected)} »` : "Ajouter un élément"}</Button>
          {!canAdd.ok ? <span className="text-2xs text-dim truncate" title={canAdd.reason}>{canAdd.reason}</span> : null}
        </div>
      </div>

      {track ? <TrackSettings key={track.id} site={site} getSite={getSite} animation={animation} track={track} node={trackNode} hostId={hostId} run={run} onRemoved={() => { setPicked(null); setSelection(new Set()); }} /> : null}

      {track && !playing ? (
        <section className="flex flex-col gap-2" aria-label="Image-clé">
          <PanelHeading className="px-0" actions={kfHere ? (
            <div className="flex items-center gap-0.5">
              <IconButton size="sm" label="Dupliquer l'image-clé un peu plus loin" icon={Copy} onClick={() => { let d = 100; while (keyframeAt(track, at + d)) d += 100; run(planShiftKeyframes(getSite(), animation.id, [{ track: track.id, at }], d, { duplicate: true }), "Dupliquer l'image-clé"); setPlayhead(at + d); setSelection(new Set([keyOf({ track: track.id, at: at + d })])); }} />
              <IconButton size="sm" label="Supprimer l'image-clé" icon={Trash2} onClick={() => { run(planRemoveKeyframes(getSite(), animation.id, [{ track: track.id, at }]), "Retirer l'image-clé"); setSelection(new Set()); }} />
            </div>
          ) : undefined}>{kfHere ? `◆ Image-clé à ${at} ms` : `Instant ${at} ms`}</PanelHeading>
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
    </section>
  );
}

function TrackRow({ label, active, onLabelClick, children }: { label: string; active: boolean; onLabelClick: () => void; children: React.ReactNode }) {
  return (
    <>
      <button type="button" className={`text-left text-xs truncate h-7 ${active ? "text-accent font-medium" : "text-muted hover:text-accent"}`} title={label} aria-current={active || undefined} onClick={onLabelClick}>{label}</button>
      {children}
    </>
  );
}

/** Réglages de la piste : ce qu'elle vise (l'élément, ses enfants, ses mots, ses lettres), le décalage par rang, la retirer. */
function TrackSettings({ site, getSite, animation, track, node, hostId, run, onRemoved }: { site: Site; getSite: () => Site; animation: Animation; track: Track; node: Node | undefined; hostId: string; run: (ops: Op[], label: string, coalesceKey?: string) => void; onRemoved: () => void }) {
  const kind = targetKindOf(track.target);
  const multi = kind === "children" || kind === "words" || kind === "letters";
  const setKind = (k: TargetKind) => run(planUpdateTrack(getSite(), animation.id, track.id, { target: withTargetKind(track.target, k), ...(k === "element" ? { stagger: undefined } : {}) }), "Cible de la piste");
  return (
    <section className="flex flex-col gap-1.5" aria-label="Piste">
      <PanelHeading className="px-0" actions={<IconButton size="sm" tone="danger" label="Retirer la piste" icon={Trash2} onClick={() => { run(planRemoveTrack(getSite(), animation.id, track.id), "Retirer la piste"); onRemoved(); }} />}>{`Piste · ${trackLabel(track, hostId, site)}`}</PanelHeading>
      {kind === "selector" ? <Hint>Sélecteur libre : {"selector" in track.target ? track.target.selector : ""}</Hint> : (
        <div className="grid grid-cols-[80px_1fr] items-center gap-1.5">
          <span className="text-xs text-muted">Anime</span>
          <Select value={kind} options={targetKindOptions(node)} onValueChange={(v) => setKind(v as TargetKind)} />
          {multi ? (
            <>
              <span className="text-xs text-muted" title="Chaque élément part un peu plus tard que le précédent">Décalage</span>
              <div className="flex items-center gap-1">
                <NumberInput className="w-[88px]" unit="ms" min={0} step={10} value={track.stagger?.each ?? ""} placeholder="aucun" onValueChange={(n) => run(planUpdateTrack(getSite(), animation.id, track.id, { stagger: n === "" || n === 0 ? undefined : { each: n, ...(track.stagger?.from ? { from: track.stagger.from } : {}) } }), "Décalage de la piste", `stagger:${animation.id}:${track.id}`)} />
                {track.stagger ? <Select className="flex-1" value={track.stagger.from ?? "start"} options={Object.entries(STAGGER_FROM_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => run(planUpdateTrack(getSite(), animation.id, track.id, { stagger: { each: track.stagger!.each, ...(v === "start" ? {} : { from: v as "end" | "center" }) } }), "Décalage de la piste")} /> : null}
              </div>
            </>
          ) : null}
        </div>
      )}
      {track.keyframes.length < 2 ? <Hint>Une piste se joue à partir de deux images-clés : placez la tête plus loin et réglez une propriété.</Hint> : null}
    </section>
  );
}

/** Les panneaux Design de l'élément de la piste, en mode image-clé : ils lisent l'instant et écrivent dans l'image-clé. */
function KeyframePanels({ site, getSite, node, bp, mode, animationId, track, at, commit }: { site: Site; getSite: () => Site; node: Node; bp: string; mode?: string; animationId: string; track: Track; at: number; commit: Commit }) {
  const style = useKeyframeStyle(site, getSite, node, bp, animationId, track, at, commit);
  return (
    <div className="flex flex-col -mx-3 border-t border-line">
      <EffectsPanel site={site} style={style} defaultOpen />
      <AppearancePanel site={site} style={style} mode={mode} defaultOpen />
      <SizePanel site={site} style={style} defaultOpen={false} />
      <SpacingPanel site={site} style={style} defaultOpen={false} />
      {node.type === "text" || node.type === "link" ? <TypographyPanel site={site} style={style} mode={mode} defaultOpen={false} /> : null}
    </div>
  );
}
