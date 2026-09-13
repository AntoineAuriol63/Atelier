"use client";

import { useEffect, useRef, useState } from "react";
import { Diamond, Pause, Play, Plus, Repeat, SkipBack, Snail, X } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Site, Trigger, TriggerOn } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationById, animationLength, animationUsages, describeAnimation, describeTrigger, newId, planAddAnimation, planAddTrigger, planApplyPreset, planRemoveTrigger, planUpdateAnimation, planUpdateTrigger, presetById } from "@atelier/model";
import { Badge, Button, Field, Hint, IconButton, NumberInput, PanelHeading, Select, TextInput, Toggle, Eyebrow } from "@/ui";
import { formatTime, nextAnimationName, rulerTicks, trackLabel, type OpenTimeline } from "@/lib/timeline";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;

type Props = {
  site: Site; node: Node | null; commit: Commit;
  open: OpenTimeline; onOpen: (o: OpenTimeline) => void;
  /** Montre l'état à `time` ms dans l'aperçu (`null` : revenir au repos). */
  scrub: (time: number | null) => void;
  onSelect: (id: string) => void;
};

/**
 * Panneau du mode Animation (cadrage § 4.1), à la place de l'inspecteur : les déclencheurs de l'élément sélectionné,
 * puis le lecteur et la ligne de temps de l'animation ouverte (pistes, images-clés, tête de lecture). L'édition des images-clés
 * par les panneaux Design arrive à l'étape suivante.
 */
export function AnimationModePanel({ site, node, commit, open, onOpen, scrub, onSelect }: Props) {
  const anim = open ? animationById(site, open.animationId) : undefined;
  const [on, setOn] = useState<TriggerOn>("inView");
  const [what, setWhat] = useState("preset:fade-up");
  const triggers = node?.triggers ?? [];

  const addTrigger = () => {
    if (!node) return;
    const triggerId = newId();
    let ops: Op[]; let animationId: string; let label: string;
    if (what.startsWith("preset:")) {
      const preset = presetById(what.slice(7)); if (!preset) return;
      animationId = newId(); label = `Animation · ${preset.label}`;
      ops = planApplyPreset(site, node, preset, { animationId, triggerId, trigger: { on } });
    } else if (what.startsWith("anim:")) {
      animationId = what.slice(5); label = "Ajouter un déclencheur";
      ops = planAddTrigger(node, { id: triggerId, on, animation: animationId });
    } else {
      animationId = newId(); label = "Nouvelle animation";
      const a: Animation = { id: animationId, name: nextAnimationName(site), duration: 600, tracks: [{ id: newId(), target: { trigger: true }, keyframes: [{ at: 0, style: {} }, { at: 600, style: {}, easing: "ease-in-out" }] }] };
      ops = [...planAddAnimation(site, a), ...planAddTrigger(node, { id: triggerId, on, animation: animationId })];
    }
    commit({ op: "batch", ops, label }, { label });
    onOpen({ animationId, hostId: node.id, triggerId });
  };
  const removeTrigger = (t: Trigger) => {
    if (!node) return;
    const ops = planRemoveTrigger(node, t.id);
    if (animationUsages(site, t.animation).length <= 1) ops.push({ op: "site.set", path: "animations", value: site.animations.filter((a) => a.id !== t.animation) });
    commit({ op: "batch", ops, label: "Retirer le déclencheur" }, { label: "Retirer le déclencheur" });
    if (open?.triggerId === t.id) onOpen(null);
  };
  const update = (t: Trigger, patch: Partial<Trigger>, label: string, coalesceKey?: string) => { if (node) commit({ op: "batch", ops: planUpdateTrigger(node, t.id, patch), label }, { label, coalesceKey }); };
  const whatOptions = [
    ...ANIMATION_PRESETS.map((p) => ({ value: `preset:${p.id}`, label: `${p.group} · ${p.label}` })),
    ...site.animations.map((a) => ({ value: `anim:${a.id}`, label: `Du site · ${a.name}` })),
    { value: "new", label: "Nouvelle animation vide" },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <section className="flex flex-col gap-2">
        <PanelHeading className="px-0">{node ? `Déclencheurs · ${nodeLabel(node)}` : "Déclencheurs"}</PanelHeading>
        {!node ? <Hint>Sélectionnez un élément dans l&apos;aperçu ou dans les calques pour voir ce qui le déclenche, ou ouvrez une animation du site ci-dessous.</Hint> : null}
        {triggers.length ? (
          <ul className="flex flex-col gap-1">
            {triggers.map((t) => {
              const active = open?.triggerId === t.id;
              return (
                <li key={t.id} className={`flex flex-col gap-1.5 rounded-sm border p-1.5 ${active ? "border-accent bg-accent-soft/40" : "border-line bg-surface/60"}`}>
                  <div className="flex items-center gap-1">
                    <button type="button" className="flex-1 min-w-0 text-left text-xs truncate hover:text-accent" title={describeTrigger(t, site)} onClick={() => onOpen(active ? null : { animationId: t.animation, hostId: node!.id, triggerId: t.id })} aria-pressed={active}>{describeTrigger(t, site)}</button>
                    <IconButton size="sm" label="Retirer le déclencheur" icon={X} onClick={() => removeTrigger(t)} />
                  </div>
                  {active ? (
                    <div className="grid grid-cols-2 gap-1">
                      <Field label="Quand" inline={false}><Select value={t.on} options={Object.entries(TRIGGER_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(t, { on: v as TriggerOn }, "Déclencheur")} /></Field>
                      {t.on !== "scroll" && t.on !== "pointer" ? <Field label="Délai" inline={false}><NumberInput unit="ms" step={50} min={0} value={t.delay ?? 0} onValueChange={(v) => update(t, { delay: v || undefined }, "Délai", `tr-dl:${t.id}`)} /></Field> : null}
                      {t.on === "inView" ? <Field label="Rejouer" inline={false}><Toggle checked={t.once === false} label={t.once === false ? "à chaque passage" : "une seule fois"} onChange={(b) => update(t, { once: b ? false : undefined }, "Rejouer")} /></Field> : null}
                      {t.on === "hover" ? <Field label="Au départ" inline={false}><Toggle checked={!!t.reverseOnLeave} label={t.reverseOnLeave ? "revient en arrière" : "se coupe"} onChange={(b) => update(t, { reverseOnLeave: b || undefined }, "Au départ de la souris")} /></Field> : null}
                      {t.on === "click" ? <Field label="Clic suivant" inline={false}><Toggle checked={!!t.toggle} label={t.toggle ? "revient en arrière" : "rejoue"} onChange={(b) => update(t, { toggle: b || undefined }, "Clic suivant")} /></Field> : null}
                      {t.on === "pointer" ? <Field label="Axe" inline={false}><Select value={t.axis ?? "y"} options={[{ value: "y", label: "Vertical" }, { value: "x", label: "Horizontal" }]} onValueChange={(v) => update(t, { axis: v as "x" | "y" }, "Axe")} /></Field> : null}
                      {t.on === "scroll" ? <Field label="Plage" inline={false}><div className="flex items-center gap-1"><NumberInput className="w-14" step={0.05} min={0} max={1} value={t.range?.[0] ?? 0} onValueChange={(v) => update(t, { range: [v === "" ? 0 : v, t.range?.[1] ?? 1] }, "Plage")} /><span className="text-xs text-muted">à</span><NumberInput className="w-14" step={0.05} min={0} max={1} value={t.range?.[1] ?? 1} onValueChange={(v) => update(t, { range: [t.range?.[0] ?? 0, v === "" ? 1 : v] }, "Plage")} /></div></Field> : null}
                      {t.on === "load" || t.on === "inView" ? <Field label="Au survol" inline={false}><Toggle checked={!!t.pauseOnHover} label={t.pauseOnHover ? "en pause" : "continue"} onChange={(b) => update(t, { pauseOnHover: b || undefined }, "Pause au survol")} /></Field> : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
        {node ? (
          <div className="flex flex-col gap-1 rounded-sm border border-dashed border-line p-1.5">
            <Eyebrow as="span">Ajouter un déclencheur</Eyebrow>
            <div className="grid grid-cols-[auto_1fr] items-center gap-1">
              <span className="text-xs text-muted">Quand</span><Select value={on} options={Object.entries(TRIGGER_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => setOn(v as TriggerOn)} />
              <span className="text-xs text-muted">Jouer</span><Select value={what} options={whatOptions} onValueChange={setWhat} />
            </div>
            <Button size="sm" icon={Plus} onClick={addTrigger} className="self-end">Ajouter</Button>
          </div>
        ) : null}
        {!node && site.animations.length ? (
          <ul className="flex flex-col gap-1">
            {site.animations.map((a) => { const u = animationUsages(site, a.id)[0]; return <li key={a.id}><button type="button" disabled={!u?.node} title={u?.node ? describeAnimation(a) : "Aucun déclencheur ne la lance : ajoutez-en un sur un élément"} className="w-full text-left text-xs truncate rounded-sm px-1.5 py-1 hover:bg-surface disabled:opacity-50" onClick={() => u?.node && onOpen({ animationId: a.id, hostId: u.node.id, triggerId: u.trigger.id })}>{describeAnimation(a)}</button></li>; })}
          </ul>
        ) : null}
      </section>
      {anim && open ? <Timeline key={`${open.triggerId}:${anim.id}`} site={site} animation={anim} hostId={open.hostId} commit={commit} scrub={scrub} onClose={() => onOpen(null)} onSelect={onSelect} /> : null}
    </div>
  );
}

/** Lecteur et ligne de temps d'une animation : lecture, boucle, ralenti, tête de lecture glissable, une ligne par piste avec ses images-clés. */
function Timeline({ site, animation, hostId, commit, scrub, onClose, onSelect }: { site: Site; animation: Animation; hostId: string; commit: Commit; scrub: (t: number | null) => void; onClose: () => void; onSelect: (id: string) => void }) {
  const length = Math.max(1, animationLength(animation));
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(animation.loop === "infinite");
  const [slow, setSlow] = useState(false);
  const [selected, setSelected] = useState<{ track: string; at: number } | null>(null);
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

  const seek = (clientX: number) => { const r = rail.current?.getBoundingClientRect(); if (!r || r.width <= 0) return; setPlayhead(Math.round(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * length)); };
  const onPointerDown = (e: React.PointerEvent) => { setPlaying(false); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); seek(e.clientX); };
  const onPointerMove = (e: React.PointerEvent) => { if (e.buttons & 1) seek(e.clientX); };
  const ticks = rulerTicks(length);
  const pct = (t: number) => `${(t / length) * 100}%`;
  const rename = (v: string) => commit({ op: "batch", ops: planUpdateAnimation(site, animation.id, { name: v || animation.name }), label: "Renommer l'animation" }, { label: "Renommer l'animation", coalesceKey: `anim-name:${animation.id}` });
  const selectedKf = selected ? animation.tracks.find((t) => t.id === selected.track)?.keyframes.find((k) => k.at === selected.at) : undefined;

  return (
    <section className="flex flex-col gap-2" aria-label="Ligne de temps">
      <div className="flex items-center gap-1">
        <TextInput className="flex-1" value={animation.name} aria-label="Nom de l'animation" onValueChange={rename} />
        <Badge title={describeAnimation(animation)}>{formatTime(length)}</Badge>
        <IconButton size="sm" label="Fermer la ligne de temps" icon={X} onClick={onClose} />
      </div>
      <div className="flex items-center gap-1">
        <IconButton size="sm" label="Revenir au début" icon={SkipBack} onClick={() => { setPlaying(false); setPlayhead(0); }} />
        <IconButton size="sm" label={playing ? "Pause" : "Lecture"} icon={playing ? Pause : Play} active={playing} onClick={() => { if (!playing && playhead >= length) setPlayhead(0); setPlaying((p) => !p); }} />
        <IconButton size="sm" label="En boucle" icon={Repeat} active={loop} onClick={() => setLoop((l) => !l)} />
        <IconButton size="sm" label="Ralenti (vitesse ½)" icon={Snail} active={slow} onClick={() => setSlow((s) => !s)} />
        <span className="ml-auto text-xs tabular-nums text-muted" aria-live="off">{formatTime(playhead)} / {formatTime(length)}</span>
      </div>
      <div className="grid grid-cols-[96px_1fr] gap-x-2 text-xs">
        <span />
        <div ref={rail} className="relative h-5 border-b border-line cursor-ew-resize select-none" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead)} tabIndex={0} onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onKeyDown={(e) => { if (e.key === "ArrowRight") setPlayhead((p) => Math.min(length, p + (e.shiftKey ? 100 : 10))); if (e.key === "ArrowLeft") setPlayhead((p) => Math.max(0, p - (e.shiftKey ? 100 : 10))); if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); } }}>
          {ticks.map((t) => <span key={t} className="absolute top-0 text-2xs text-dim -translate-x-1/2" style={{ left: pct(t) }}>{t >= 1000 ? `${(t / 1000).toString().replace(".", ",")}s` : t}</span>)}
          <span className="absolute top-0 bottom-0 w-px bg-accent" style={{ left: pct(playhead) }} aria-hidden />
        </div>
        {animation.tracks.map((track) => (
          <TrackRow key={track.id} label={trackLabel(track, hostId, site)} onLabelClick={() => { const r = track.target; if ("selector" in r) return; onSelect("trigger" in r ? hostId : r.node); }}>
            <div className="relative h-6 border-b border-line/60" onPointerDown={onPointerDown} onPointerMove={onPointerMove}>
              <span className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-line-strong" style={{ left: pct(Math.min(...track.keyframes.map((k) => k.at))), width: `calc(${pct(Math.max(...track.keyframes.map((k) => k.at)))} - ${pct(Math.min(...track.keyframes.map((k) => k.at)))})` }} aria-hidden />
              {track.keyframes.map((k) => {
                const isSel = selected?.track === track.id && selected.at === k.at;
                return <button key={k.at} type="button" title={`${k.at} ms${k.easing ? ` · ${k.easing}` : ""}`} aria-label={`Image-clé à ${k.at} ms`} aria-pressed={isSel} className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-0.5 rounded-xs ${isSel ? "text-accent" : "text-ink hover:text-accent"}`} style={{ left: pct(k.at) }} onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setSelected({ track: track.id, at: k.at }); setPlaying(false); setPlayhead(k.at); }}><Diamond size={10} fill="currentColor" /></button>;
              })}
              <span className="absolute top-0 bottom-0 w-px bg-accent/70 pointer-events-none" style={{ left: pct(playhead) }} aria-hidden />
            </div>
          </TrackRow>
        ))}
      </div>
      {selectedKf ? <Hint>Image-clé à {selectedKf.at} ms{selectedKf.easing ? `, courbe ${selectedKf.easing}` : ""} : {Object.keys(selectedKf.style).length ? Object.entries(selectedKf.style).map(([k, v]) => `${k} : ${typeof v === "object" ? `{${(v as { token: string }).token}}` : String(v)}`).join(" · ") : "état de repos"}. Le réglage par les panneaux Design arrive à l&apos;étape suivante.</Hint> : <Hint>Glissez la tête de lecture ou lancez la lecture : l&apos;aperçu montre l&apos;état exact à cet instant. Cliquez une image-clé pour la voir.</Hint>}
    </section>
  );
}

function TrackRow({ label, onLabelClick, children }: { label: string; onLabelClick: () => void; children: React.ReactNode }) {
  return (
    <>
      <button type="button" className="text-left text-xs truncate text-muted hover:text-accent h-6" title={label} onClick={onLabelClick}>{label}</button>
      {children}
    </>
  );
}
