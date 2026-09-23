"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Diamond, ExternalLink, Play, Plus, SkipBack, Trash2, X } from "lucide-react";
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
  const length = Math.max(100, view?.total ?? 0);
  const [playhead, setPlayhead] = useState<number | null>(null);
  // La liste des éléments à ajouter est une liste maison : une liste native ne dit pas quel choix est survolé, et le survol montre l'élément dans l'aperçu.
  const [addOpen, setAddOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!addOpen) return;
    const off = (e: PointerEvent) => { if (!addRef.current?.contains(e.target as globalThis.Node)) { setAddOpen(false); onHover?.(null); } };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setAddOpen(false); onHover?.(null); } };
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
      else if (kfAt !== undefined) { run(planShiftKeyframes(current, cur.animation.id, [{ track: cur.track.id, at: kfAt }], delta), "Déplacer l'image-clé"); if (playhead !== null) place(Math.max(0, playhead + delta)); }
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
  // Réutiliser l'animation d'un autre élément (le clic d'un bouton sur d'autres boutons) : un déclencheur de plus, même animation, même quand.
  // Les apparitions préréglées ne s'y trouvent pas : elles se choisissent dans « Apparition ». Restent le clic, le survol, et tout ce qui est composé à la main.
  const reusable = site.animations.filter((a) => a.id !== ap?.animation.id && a.tracks.length && a.tracks.every((t) => "trigger" in t.target)).map((a) => ({ a, u: animationUsages(site, a.id).find((x) => x.node && x.node.id !== selected.id) })).filter((x) => x.u && !(selected.triggers ?? []).some((t) => t.animation === x.a.id) && !((x.u!.trigger.on === "inView" || x.u!.trigger.on === "load") && trackPresetMatch(x.a.tracks[0]!)));
  const presetLabel = (id?: string) => ANIMATION_PRESETS.find((p) => p.id === id)?.label;
  // La scène ne montre que ce qui bouge, plus l'élément sélectionné (retour d'Antoine : tout afficher était illisible) ; le reste s'ajoute par son nom.
  const visible = view.rows.filter((r) => r.bar || r.selected);
  const addable = view.rows.filter((r) => r.still && !r.selected);
  const addKeyframe = () => { if (ap && at !== null) run(planSetKeyframe(getSite(), ap.animation.id, ap.track.id, at, {}), `Image-clé à ${at} ms`); };
  // Retirer une image-clé ; s'il n'en restait qu'une, plus rien ne bouge : l'apparition entière s'en va et l'élément redevient immobile.
  const removeKeyframe = (kfAt: number) => {
    if (!ap) return;
    const current = getSite();
    if (ap.track.keyframes.length <= 2) { run(planQuickAnimation(current, selected, "Apparition", ""), `Ne plus faire bouger ${quoteLabel(nodeLabel(selected))}`); return; }
    run(planRemoveKeyframes(current, ap.animation.id, [{ track: ap.track.id, at: kfAt }]), "Retirer l'image-clé");
  };
  // Ce que l'élément lance lui-même hors de son apparition (survol, clic, défilement, souris) : ses réglages fins et le retrait.
  const others = (selected.triggers ?? []).filter((t) => t.id !== ap?.trigger.id && t.on !== "load" && t.on !== "inView");

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_360px] h-full min-h-0 min-w-0" data-scene-editor="">
      <div className="flex flex-col min-h-0 min-w-0 border-r border-line">
        <div className="flex items-center gap-2 px-3 h-9 shrink-0 border-b border-line">
          <Eyebrow as="span">Scène</Eyebrow>
          <span className="text-sm font-medium truncate">{view.sectionLabel}</span>
          <Badge title="Fin du dernier mouvement">{formatMs(view.total)}</Badge>
          {view.launches.length > 1 ? <Badge tone="warning" title="Chaque lancement compte son temps depuis sa propre entrée à l'écran ; « Démarre après » un autre élément les réunit">{view.launches.length} lancements</Badge> : null}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden />
          <IconButton size="sm" label="Revenir au début" icon={SkipBack} onClick={() => place(0)} />
          <Button size="sm" variant="primary" icon={Play} title="Joue la scène dans l'aperçu" onClick={() => { place(null); playAll(); }}>Lire</Button>
          {onTestOnSite ? <Button size="sm" variant="ghost" icon={ExternalLink} onClick={() => onTestOnSite(ap && !ap.page ? ap.hostId : selected.id)} title="Ouvre l'onglet Aperçu : la section arrive à l'écran comme pour un visiteur">Tester sur le site</Button> : null}
          <span className="ml-auto text-xs tabular-nums text-muted">{playhead !== null ? `${tickLabel(playhead)} ms` : ""}</span>
          <IconButton size="sm" label="Fermer l'outil Animation" icon={X} onClick={onClose} />
        </div>
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="grid grid-cols-[220px_minmax(0,1fr)] items-end px-3 pt-2">
            <span />
            <div ref={rail} data-scene-rail="" role="slider" aria-label="Tête de lecture" aria-valuemin={0} aria-valuemax={length} aria-valuenow={Math.round(playhead ?? 0)} tabIndex={0}
              className="relative h-5 border-b border-line cursor-ew-resize select-none text-2xs text-dim"
              onPointerDown={(e) => { if (e.button !== 0) return; place(timeAt(e.clientX)); (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); }}
              onPointerMove={(e) => { if (e.buttons & 1) place(timeAt(e.clientX)); }}
              onKeyDown={(e) => { const cur = playhead ?? 0; if (e.key === "ArrowRight") { e.preventDefault(); place(Math.min(length, cur + (e.shiftKey ? 100 : 10))); } if (e.key === "ArrowLeft") { e.preventDefault(); place(Math.max(0, cur - (e.shiftKey ? 100 : 10))); } }}>
              {rulerTicks(length).map((t) => <span key={t} className="absolute top-0 -translate-x-1/2 tabular-nums" style={{ left: pct(t) }}>{tickLabel(t)}</span>)}
            </div>
          </div>
          <ul className="px-3 pb-2" aria-label={`Scène de ${quoteLabel(view.sectionLabel)}`}>
            {visible.map((row) => { const i = view.rows.indexOf(row); return (
              <li key={row.id} data-scene-row={row.id} data-still={row.still || undefined} className={`grid grid-cols-[220px_minmax(0,1fr)] items-center h-8 border-b border-line/60 ${row.selected ? "bg-accent-soft/40" : ""}`}>
                <button type="button" data-scene-name="" className={`flex items-center gap-1.5 min-w-0 pr-2 text-left text-xs truncate ${row.selected ? "text-accent font-medium" : row.still ? "text-dim hover:text-ink" : "text-ink hover:text-accent"}`} style={{ paddingLeft: row.depth * 12 }} title={`Sélectionner ${quoteLabel(row.label)}`} onClick={() => onSelect(row.id)} onMouseEnter={() => onHover?.(row.id)} onMouseLeave={() => onHover?.(null)}>
                  <span className="truncate">{row.label}</span>{row.count ? <span className="text-muted shrink-0">×{row.count}</span> : null}
                </button>
                <div className="relative h-8 min-w-0">
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
                    <button key={k.at} type="button" data-scene-kf={k.at} aria-label={`Image-clé à ${tickLabel(k.sceneAt)} ms`} aria-pressed={at === k.at} title={`${k.sceneAt} ms${k.easing ? ` · ${k.easing}` : ""}`}
                      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-xs cursor-grab active:cursor-grabbing ${at === k.at ? "text-warning" : "text-accent-ink hover:text-warning"}`} style={{ left: `calc(${pct(k.sceneAt)} + ${shift("kf", row.id, k.at)}px)` }} onPointerDown={(e) => { place(k.sceneAt); startDrag(e, "kf", row.id, k.at); }} onKeyDown={(e) => { if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); e.stopPropagation(); removeKeyframe(k.at); } }}>
                      <Diamond size={11} fill="currentColor" aria-hidden />
                    </button>
                  ))}
                  {row.selected && ap && playhead !== null && !kfHere ? (
                    <button type="button" aria-label="Ajouter une image-clé ici" title="Pose une image-clé à la tête de lecture ; régler une propriété à droite en pose une aussi" className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 px-1.5 rounded-full border border-dashed border-accent bg-panel text-2xs text-accent whitespace-nowrap hover:bg-accent-soft" style={{ left: pct(playhead) }} onClick={addKeyframe}>+ image-clé</button>
                  ) : null}
                </div>
              </li>
            ); })}
          </ul>
          {addable.length ? (
            <div ref={addRef} className="relative px-3 pb-3" data-scene-add="">
              <button type="button" aria-haspopup="listbox" aria-expanded={addOpen} className="h-7 px-2 rounded-sm border border-dashed border-accent/60 text-xs text-accent hover:bg-accent-soft" onClick={() => setAddOpen((o) => !o)}>+ Ajouter un élément à la scène…</button>
              {addOpen ? (
                <ul role="listbox" aria-label="Éléments de la section qui ne bougent pas" className="absolute left-3 bottom-full mb-1 z-40 max-h-64 w-72 overflow-auto rounded-md border border-line bg-raised shadow-xl py-1">
                  {addable.map((r) => (
                    <li key={r.id}>
                      <button type="button" role="option" aria-selected={false} data-scene-add-item={r.id} className="w-full text-left text-xs h-7 px-2 truncate hover:bg-accent-soft hover:text-accent" style={{ paddingLeft: 8 + r.depth * 12 }}
                        onMouseEnter={() => onHover?.(r.id)} onMouseLeave={() => onHover?.(null)}
                        onClick={() => { setAddOpen(false); onHover?.(null); appear(r, view.rows.indexOf(r)); }}>
                        {r.label}{r.count ? <span className="text-muted"> ×{r.count}</span> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
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
        {ap ? (
          <section className="flex flex-col gap-2 border-t border-line pt-3" aria-label="Image-clé" data-scene-keyframe="">
            {at === null ? <Hint>Cliquez la règle ou un losange pour vous placer à un instant : ce qui se règle ici s&apos;y enregistre en image-clé.</Hint> : (<>
              <PanelHeading className="px-0" actions={kfHere ? <IconButton size="sm" label="Supprimer l'image-clé" icon={Trash2} tone="danger" onClick={() => removeKeyframe(at)} /> : <Button size="sm" variant="ghost" icon={Plus} onClick={addKeyframe}>Image-clé ici</Button>}>
                {kfHere ? `◆ Image-clé à ${tickLabel(playhead!)} ms` : `Instant ${tickLabel(playhead!)} ms`}
              </PanelHeading>
              {kfHere && prevKf ? (
                <div className="grid grid-cols-[80px_1fr] items-start gap-1.5">
                  <span className="text-xs text-muted pt-1.5" title="Courbe pour atteindre cette image-clé depuis la précédente">Courbe</span>
                  <EasingField value={kfHere.easing} segment={at - prevKf.at} onChange={(e) => run(planSetKeyframeEasing(getSite(), ap.animation.id, ap.track.id, at, e), "Courbe du segment", `kf-ease:${ap.animation.id}:${ap.track.id}:${at}`)} />
                </div>
              ) : null}
              {!kfHere ? <Hint>Aucune image-clé ici : réglez une propriété ci-dessous, elle se crée.</Hint> : null}
              <KeyframePanels site={site} getSite={getSite} node={selected} bp={bp} mode={mode} animationId={ap.animation.id} track={ap.track} at={at} commit={commit} />
            </>)}
          </section>
        ) : null}
      </div>
    </div>
  );
}
