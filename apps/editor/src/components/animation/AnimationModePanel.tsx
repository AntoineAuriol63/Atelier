"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Page, Site, Trigger, TriggerOn } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationById, animationFromPreset, animationUsages, describeAnimation, describeTrigger, newId, planAddAnimation, planAddPageTrigger, planAddTrigger, planRemovePageTriggerWithAnimation, planRemoveTriggerWithAnimation, planUpdatePageTrigger, planUpdateTrigger, presetById, triggerFromPreset } from "@atelier/model";
import { Button, Eyebrow, Field, Hint, IconButton, NumberInput, PanelHeading, Select, Toggle } from "@/ui";
import { nextAnimationName, openTrigger, type OpenTimeline } from "@/lib/timeline";
import { Timeline } from "./Timeline";
import { ContinuousEffects } from "./ContinuousEffects";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;
/** Ce que la page peut déclencher : son chargement, son défilement, la souris. */
const PAGE_ONS: TriggerOn[] = ["load", "scroll", "pointer"];

type Props = {
  site: Site; node: Node | null; commit: Commit;
  /** Page ouverte : ses déclencheurs (chargement, défilement, souris) sont portés par sa racine. */
  page: Page;
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
 * Panneau du mode Animation (cadrage § 4.1), à la place de l'inspecteur : les déclencheurs de l'élément sélectionné et ses effets continus,
 * les déclencheurs de la page (sans sélection ou sur sa racine), la bibliothèque, puis la ligne de temps de l'animation ouverte
 * (`Timeline` : pistes, images-clés, tête de lecture, édition par les panneaux Design).
 */
export function AnimationModePanel({ site, node, commit, page, getSite, bp, mode, open, onOpen, scrub, onSelect }: Props) {
  const anim = open ? animationById(site, open.animationId) : undefined;
  const opened = openTrigger(site, open);
  const run = (ops: Op[], label: string, coalesceKey?: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const onPageRoot = !node || node.id === page.root.id;
  const pageName = page.name[site.settings.defaultLocale] ?? page.path;

  return (
    <div className="flex flex-col gap-3 p-3">
      {node ? (
        <section className="flex flex-col gap-2" aria-label="Déclencheurs de l'élément">
          <PanelHeading className="px-0">{`Déclencheurs · ${nodeLabel(node)}`}</PanelHeading>
          <TriggerList site={site} triggers={node.triggers ?? []} hostId={node.id} open={open} onOpen={onOpen}
            onUpdate={(t, patch, label, key) => run(planUpdateTrigger(node, t.id, patch), label, key)}
            onRemove={(t) => { run(planRemoveTriggerWithAnimation(site, node, t.id), "Retirer le déclencheur"); if (open?.triggerId === t.id) onOpen(null); }} />
          <AddTrigger site={site} ons={Object.keys(TRIGGER_LABELS) as TriggerOn[]}
            onAdd={(ops, trigger, label) => { run([...ops, ...planAddTrigger(node, trigger)], label); onOpen({ animationId: trigger.animation, hostId: node.id, triggerId: trigger.id }); }} />
        </section>
      ) : <Hint>Sélectionnez un élément dans l&apos;aperçu ou dans les calques pour voir ce qui le déclenche, ou ouvrez une animation du site ci-dessous.</Hint>}

      {node ? (
        <section className="flex flex-col gap-1.5" aria-label="Effets continus">
          <PanelHeading className="px-0">Effets continus</PanelHeading>
          <ContinuousEffects node={node} commit={commit} />
        </section>
      ) : null}

      {onPageRoot ? (
        <section className="flex flex-col gap-2" aria-label="Déclencheurs de la page">
          <PanelHeading className="px-0">{`Page · ${pageName}`}</PanelHeading>
          <TriggerList site={site} triggers={page.triggers ?? []} hostId={page.root.id} pageLevel open={open} onOpen={onOpen}
            onUpdate={(t, patch, label, key) => run(planUpdatePageTrigger(getSite(), page.id, t.id, patch), label, key)}
            onRemove={(t) => { run(planRemovePageTriggerWithAnimation(site, page.id, t.id), "Retirer le déclencheur de la page"); if (open?.triggerId === t.id) onOpen(null); }} />
          <AddTrigger site={site} ons={PAGE_ONS} defaultOn="scroll"
            onAdd={(ops, trigger, label) => { run([...ops, ...planAddPageTrigger(site, page.id, trigger)], label); onOpen({ animationId: trigger.animation, hostId: page.root.id, triggerId: trigger.id }); }} />
          {!page.triggers?.length ? <Hint>Au défilement de la page, la progression de haut en bas parcourt la ligne de temps : ajoutez ensuite les éléments à animer (une barre de progression, un fond…).</Hint> : null}
        </section>
      ) : null}

      {!node && site.animations.length ? (
        <section className="flex flex-col gap-1" aria-label="Animations du site">
          <PanelHeading className="px-0">Animations du site</PanelHeading>
          <ul className="flex flex-col gap-1">
            {site.animations.map((a) => {
              const u = animationUsages(site, a.id)[0];
              const hostId = u?.node?.id ?? u?.page?.root.id;
              return <li key={a.id}><button type="button" disabled={!hostId} title={hostId ? describeAnimation(a) : "Aucun déclencheur ne la lance : ajoutez-en un sur un élément"} className="w-full text-left text-xs truncate rounded-sm px-1.5 py-1 hover:bg-surface disabled:opacity-50" onClick={() => u && hostId && onOpen({ animationId: a.id, hostId, triggerId: u.trigger.id })}>{describeAnimation(a)}</button></li>;
            })}
          </ul>
        </section>
      ) : null}

      {anim && open && opened ? <Timeline key={`${open.triggerId}:${anim.id}`} site={site} getSite={getSite} animation={anim} hostId={open.hostId} trigger={opened.trigger} pageLevel={!!opened.page} selected={node} bp={bp} mode={mode} commit={commit} scrub={scrub} onClose={() => onOpen(null)} onSelect={onSelect} /> : null}
    </div>
  );
}

/** Liste des déclencheurs d'un élément ou d'une page ; le déclencheur ouvert montre ses réglages. */
function TriggerList({ site, triggers, hostId, pageLevel, open, onOpen, onUpdate, onRemove }: { site: Site; triggers: Trigger[]; hostId: string; pageLevel?: boolean; open: OpenTimeline; onOpen: (o: OpenTimeline) => void; onUpdate: (t: Trigger, patch: Partial<Trigger>, label: string, coalesceKey?: string) => void; onRemove: (t: Trigger) => void }) {
  if (!triggers.length) return null;
  return (
    <ul className="flex flex-col gap-1">
      {triggers.map((t) => {
        const active = open?.triggerId === t.id;
        return (
          <li key={t.id} className={`flex flex-col gap-1.5 rounded-sm border p-1.5 ${active ? "border-accent bg-accent-soft/40" : "border-line bg-surface/60"}`}>
            <div className="flex items-center gap-1">
              <button type="button" className="flex-1 min-w-0 text-left text-xs truncate hover:text-accent" title={describeTrigger(t, site)} onClick={() => onOpen(active ? null : { animationId: t.animation, hostId, triggerId: t.id })} aria-pressed={active}>{describeTrigger(t, site)}</button>
              <IconButton size="sm" label="Retirer le déclencheur" icon={X} onClick={() => onRemove(t)} />
            </div>
            {active ? <TriggerSettings trigger={t} pageLevel={pageLevel} onUpdate={(patch, label, key) => onUpdate(t, patch, label, key)} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

/** Réglages d'un déclencheur : quand, délai, rejouer, retour, bascule, pause au survol ; plage du défilement et axe de la souris. */
function TriggerSettings({ trigger: t, pageLevel, onUpdate }: { trigger: Trigger; pageLevel?: boolean; onUpdate: (patch: Partial<Trigger>, label: string, coalesceKey?: string) => void }) {
  const ons = (pageLevel ? PAGE_ONS : (Object.keys(TRIGGER_LABELS) as TriggerOn[])).map((value) => ({ value, label: TRIGGER_LABELS[value] }));
  const [lo, hi] = t.range ?? [0, 1];
  const pct = (v: number) => Math.round(v * 100);
  const setRange = (a: number, b: number) => onUpdate({ range: a === 0 && b === 1 ? undefined : [Math.min(a, b), Math.max(a, b)] }, "Plage du défilement", `tr-range:${t.id}`);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-2 gap-1">
        <Field label="Quand" inline={false}><Select value={t.on} options={ons} onValueChange={(v) => onUpdate({ on: v as TriggerOn }, "Déclencheur")} /></Field>
        {t.on !== "scroll" && t.on !== "pointer" ? <Field label="Délai" inline={false}><NumberInput unit="ms" step={50} min={0} value={t.delay ?? 0} onValueChange={(v) => onUpdate({ delay: v || undefined }, "Délai", `tr-dl:${t.id}`)} /></Field> : null}
        {t.on === "inView" ? <Field label="Rejouer" inline={false}><Toggle checked={t.once === false} label={t.once === false ? "à chaque passage" : "une seule fois"} onChange={(b) => onUpdate({ once: b ? false : undefined }, "Rejouer")} /></Field> : null}
        {t.on === "hover" ? <Field label="Au départ" inline={false}><Toggle checked={!!t.reverseOnLeave} label={t.reverseOnLeave ? "revient en arrière" : "se coupe"} onChange={(b) => onUpdate({ reverseOnLeave: b || undefined }, "Au départ de la souris")} /></Field> : null}
        {t.on === "click" ? <Field label="Clic suivant" inline={false}><Toggle checked={!!t.toggle} label={t.toggle ? "revient en arrière" : "rejoue"} onChange={(b) => onUpdate({ toggle: b || undefined }, "Clic suivant")} /></Field> : null}
        {t.on === "pointer" ? <Field label="Axe" inline={false}><Select value={t.axis ?? "y"} options={[{ value: "y", label: "Vertical (haut → bas)" }, { value: "x", label: "Horizontal (gauche → droite)" }]} onValueChange={(v) => onUpdate({ axis: v === "y" ? undefined : "x" }, "Axe de la souris")} /></Field> : null}
        {t.on === "load" || t.on === "inView" ? <Field label="Au survol" inline={false}><Toggle checked={!!t.pauseOnHover} label={t.pauseOnHover ? "en pause" : "continue"} onChange={(b) => onUpdate({ pauseOnHover: b || undefined }, "Pause au survol")} /></Field> : null}
      </div>
      {t.on === "scroll" ? (
        <>
          <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-1">
            <span className="text-xs text-muted">De</span><NumberInput unit="%" step={5} min={0} max={100} value={pct(lo)} onValueChange={(v) => setRange((v === "" ? 0 : v) / 100, hi)} />
            <span className="text-xs text-muted">à</span><NumberInput unit="%" step={5} min={0} max={100} value={pct(hi)} onValueChange={(v) => setRange(lo, (v === "" ? 100 : v) / 100)} />
          </div>
          <Hint>{pageLevel ? "0 % : haut de la page ; 100 % : bas de la page." : "0 % : l'élément entre par le bas de l'écran ; 100 % : il sort par le haut."} La ligne de temps se déroule entre ces deux positions.</Hint>
        </>
      ) : null}
      {t.on === "pointer" ? <Hint>La position de la souris dans la fenêtre parcourt la ligne de temps, du bord {t.axis === "x" ? "gauche au bord droit" : "haut au bord bas"}.</Hint> : null}
    </div>
  );
}

/** Ajouter un déclencheur : quand, puis quoi (un préréglage, une animation du site, ou une animation vide à composer). */
function AddTrigger({ site, ons, defaultOn = "inView", onAdd }: { site: Site; ons: TriggerOn[]; defaultOn?: TriggerOn; onAdd: (animationOps: Op[], trigger: Trigger, label: string) => void }) {
  const [on, setOn] = useState<TriggerOn>(defaultOn);
  const [what, setWhat] = useState(ons.includes("inView") ? "preset:fade-up" : "new");
  const options = [
    ...ANIMATION_PRESETS.map((p) => ({ value: `preset:${p.id}`, label: `${p.group} · ${p.label}` })),
    ...site.animations.map((a) => ({ value: `anim:${a.id}`, label: `Du site · ${a.name}` })),
    { value: "new", label: "Nouvelle animation vide" },
  ];
  const add = () => {
    if (what.startsWith("preset:")) {
      const preset = presetById(what.slice(7)); if (!preset) return;
      const a = animationFromPreset(preset);
      onAdd(planAddAnimation(site, a), triggerFromPreset(preset, a.id, { on }), `Animation · ${preset.label}`);
    } else if (what.startsWith("anim:")) {
      onAdd([], { id: newId(), on, animation: what.slice(5) }, "Ajouter un déclencheur");
    } else {
      const a: Animation = { id: newId(), name: nextAnimationName(site), duration: 1000, tracks: [{ id: newId(), target: { trigger: true }, keyframes: [{ at: 0, style: {} }, { at: 1000, style: {}, easing: "ease-in-out" }] }] };
      onAdd(planAddAnimation(site, a), { id: newId(), on, animation: a.id }, "Nouvelle animation");
    }
  };
  return (
    <div className="flex flex-col gap-1 rounded-sm border border-dashed border-line p-1.5">
      <Eyebrow as="span">Ajouter un déclencheur</Eyebrow>
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <span className="text-xs text-muted">Quand</span><Select value={on} options={ons.map((value) => ({ value, label: TRIGGER_LABELS[value] }))} onValueChange={(v) => setOn(v as TriggerOn)} />
        <span className="text-xs text-muted">Jouer</span><Select value={what} options={options} onValueChange={setWhat} />
      </div>
      <Button size="sm" icon={Plus} onClick={add} className="self-end">Ajouter</Button>
    </div>
  );
}

