"use client";

import { Trash2 } from "lucide-react";
import type { Animation, Node, Op, Site, Track } from "@atelier/model";
import { ANIMATION_PRESETS, STAGGER_FROM_LABELS, planFillTrackFromPreset, planRemoveTrack, planShiftKeyframes, planUpdateTrack, trackSpan, withTargetKind } from "@atelier/model";
import { Hint, IconButton, NumberInput, PanelHeading, Select } from "@/ui";
import { formatMs, quoteLabel, snapTime, targetKindOf, targetKindOptions, trackLabel, type TargetKind } from "@/lib/timeline";
import { nodeLabel } from "../node-icons";

/** Préréglages proposés pour remplir une piste (leurs images-clés seulement : répétitions et déclencheur restent ceux de l'animation). */
const FILL_PRESETS = ANIMATION_PRESETS.filter((p) => p.id !== "custom").map((p) => ({ value: p.id, label: `${p.group} · ${p.label}` }));

/** Réglages de la piste : ce qu'elle vise (l'élément, ses enfants, ses mots, ses lettres), le décalage par rang, la retirer. */
export function TrackSettings({ site, getSite, animation, track, node, hostId, run, onRemoved }: { site: Site; getSite: () => Site; animation: Animation; track: Track; node: Node | undefined; hostId: string; run: (ops: Op[], label: string, coalesceKey?: string) => void; onRemoved: () => void }) {
  const kind = targetKindOf(track.target);
  const multi = kind === "children" || kind === "words" || kind === "letters";
  const setKind = (k: TargetKind) => run(planUpdateTrack(getSite(), animation.id, track.id, { target: withTargetKind(track.target, k), ...(k === "element" ? { stagger: undefined } : {}) }), "Cible de la piste");
  return (
    <section className="flex flex-col gap-1.5" aria-label="Piste">
      <PanelHeading className="px-0" actions={<IconButton size="sm" tone="danger" label="Retirer la piste" icon={Trash2} onClick={() => { run(planRemoveTrack(getSite(), animation.id, track.id), "Retirer la piste"); onRemoved(); }} />}>{`Piste · ${trackLabel(track, hostId, site)}`}</PanelHeading>
      {kind === "selector" ? <Hint>Sélecteur libre : {"selector" in track.target ? track.target.selector : ""}</Hint> : (
        <div className="grid grid-cols-[80px_1fr] items-center gap-1.5">
          <span className="text-xs text-muted" title="Temps de la première image-clé : changer le départ décale toute la piste">Départ</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <NumberInput className="w-[110px]" unit="ms" min={0} step={10} value={trackSpan(track).start} onValueChange={(n) => { if (n === "") return; const d = snapTime(n) - trackSpan(track).start; if (d) run(planShiftKeyframes(getSite(), animation.id, track.keyframes.map((k) => ({ track: track.id, at: k.at })), d), "Décaler la piste"); }} />
            {/* Une piste enchaînée dit à quoi elle est rattachée ; changer son départ change son délai après l'autre, et elle suit sa référence. */}
            {track.start ? (() => { const ref = animation.tracks.find((t) => t.id === ("after" in track.start! ? track.start!.after : track.start!.with)); const gap = track.start!.gap ?? 0; return ref ? <span className="text-2xs text-muted truncate" title="Cette piste suit une autre piste : changer son départ change son délai après elle, et elle se replace quand l'autre change">{`${"after" in track.start! ? "après" : "avec"} ${quoteLabel(trackLabel(ref, hostId, site))}${gap ? ` · délai ${formatMs(gap)}` : ""}`}</span> : null; })() : null}
          </div>
          <span className="text-xs text-muted" title="Ce que la piste anime : l'élément lui-même, ses enfants un à un, ses mots ou ses lettres">Cible</span>
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
      <div className="grid grid-cols-[80px_1fr] items-center gap-1.5">
        <span className="text-xs text-muted" title="Remplace les images-clés de la piste par celles d'un préréglage, à partir de son départ">Remplir avec</span>
        <Select value="" placeholder="un préréglage…" options={FILL_PRESETS} onValueChange={(v) => { const preset = ANIMATION_PRESETS.find((p) => p.id === v); if (preset) run(planFillTrackFromPreset(getSite(), animation.id, track.id, preset), `Remplir la piste · ${preset.label}`); }} />
      </div>
      {node && node.id !== hostId && node.triggers?.length ? <span className="text-2xs text-warning" title="Ses propres déclencheurs se jouent en plus de cette ligne de temps">« {nodeLabel(node)} » a aussi ses propres animations ({node.triggers.map((t) => site.animations.find((a) => a.id === t.animation)?.name ?? "?").join(", ")}) : elles se joueront en plus.</span> : null}
      {track.keyframes.length < 2 ? <Hint>Une piste se joue à partir de deux images-clés : « Remplir avec » un préréglage, ou placez la tête plus loin et réglez une propriété.</Hint> : null}
    </section>
  );
}

