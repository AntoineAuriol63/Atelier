"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Site, Trigger, TriggerOn } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationById, animationUsages, describeAnimation, describeTrigger, newId, planAddAnimation, planAddTrigger, planApplyPreset, planRemoveTrigger, planUpdateTrigger, presetById } from "@atelier/model";
import { Button, Field, Hint, IconButton, NumberInput, PanelHeading, Select, Toggle, Eyebrow } from "@/ui";
import { nextAnimationName, type OpenTimeline } from "@/lib/timeline";
import { Timeline } from "./Timeline";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;

type Props = {
  site: Site; node: Node | null; commit: Commit;
  /** Document courant, sans attendre le rendu (écritures d'images-clés successives). */
  getSite: () => Site;
  /** Point de rupture actif et mode clair/sombre de l'aperçu, pour les panneaux Design en mode image-clé. */
  bp: string; mode?: string;
  open: OpenTimeline; onOpen: (o: OpenTimeline) => void;
  /** Montre l'état à `time` ms dans l'aperçu (`null` : revenir au repos). */
  scrub: (time: number | null) => void;
  onSelect: (id: string) => void;
};

/**
 * Panneau du mode Animation (cadrage § 4.1), à la place de l'inspecteur : les déclencheurs de l'élément sélectionné,
 * puis le lecteur et la ligne de temps de l'animation ouverte (`Timeline` : pistes, images-clés, tête de lecture, édition par les panneaux Design).
 */
export function AnimationModePanel({ site, node, commit, getSite, bp, mode, open, onOpen, scrub, onSelect }: Props) {
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
      {anim && open ? <Timeline key={`${open.triggerId}:${anim.id}`} site={site} getSite={getSite} animation={anim} hostId={open.hostId} selected={node} bp={bp} mode={mode} commit={commit} scrub={scrub} onClose={() => onOpen(null)} onSelect={onSelect} /> : null}
    </div>
  );
}
