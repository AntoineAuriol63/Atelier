"use client";

import { Play, X } from "lucide-react";
import type { AnimationPreset, CommitOptions, Node, Op, Site, Trigger } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationById, animationUsages, describeTrigger, planApplyPreset, planRemoveTrigger, planUpdateTrigger, presetById } from "@atelier/model";
import { Field, FieldGroup, Hint, IconButton, NumberInput, Section, Select, Toggle } from "@/ui";

type Commit = (op: Op, opts?: CommitOptions) => void;
type Group = AnimationPreset["group"];
const QUICK: { group: Group; label: string; hint: string }[] = [
  { group: "Apparition", label: "Apparition", hint: "L'élément arrive quand il entre dans l'écran" },
  { group: "Survol", label: "Au survol", hint: "Réagit à la souris et revient quand elle part" },
  { group: "Continue", label: "En continu", hint: "En boucle dès le chargement" },
];

/**
 * Animations d'un élément (section 8.4, cadrage `docs/cadrage-animation.md` § 4.3) : ses déclencheurs, avec « Jouer » et leurs réglages,
 * et trois choix rapides (apparition, survol, continu) qui posent un préréglage sur l'élément seul. La composition fine se fait dans le mode Animation.
 */
export function AnimationsPanel({ site, node, commit, onPlay }: { site: Site; node: Node; pageRoot?: Node; commit: Commit; onPlay?: (triggerId: string) => void }) {
  const triggers = node.triggers ?? [];
  const presetOf = (t: Trigger) => presetById(animationById(site, t.animation)?.preset);
  const quickTrigger = (group: Group) => triggers.find((t) => presetOf(t)?.group === group);
  const removeTrigger = (t: Trigger, label: string) => {
    const ops = planRemoveTrigger(node, t.id);
    if (animationUsages(site, t.animation).length <= 1) ops.push({ op: "site.set", path: "animations", value: site.animations.filter((a) => a.id !== t.animation) });
    commit({ op: "batch", ops, label }, { label });
  };
  const setQuick = (group: Group, presetId: string) => {
    const current = quickTrigger(group);
    if (!presetId) { if (current) removeTrigger(current, "Retirer l'animation"); return; }
    const preset = presetById(presetId); if (!preset) return;
    const cur = current ? animationById(site, current.animation)?.tracks[0] : undefined;
    const ops = planApplyPreset(site, node, preset, { replaceTriggerId: current?.id, target: cur?.target, stagger: cur?.stagger, trigger: current ? { delay: current.delay } : undefined });
    commit({ op: "batch", ops, label: `Animation · ${preset.label}` }, { label: `Animation · ${preset.label}` });
  };
  const update = (t: Trigger, patch: Partial<Trigger>, label: string, coalesceKey?: string) => commit({ op: "batch", ops: planUpdateTrigger(node, t.id, patch), label }, { label, coalesceKey });
  const appear = quickTrigger("Apparition");
  const appearTrack = appear ? animationById(site, appear.animation)?.tracks[0] : undefined;
  const setAppearMode = (mode: "one" | "letters" | "children") => {
    if (!appear) return;
    const preset = presetOf(appear); if (!preset) return;
    const target = mode === "letters" ? { trigger: true as const, split: "letters" as const } : mode === "children" ? { trigger: true as const, children: true as const } : { trigger: true as const };
    const stagger = mode === "letters" ? { each: 30 } : mode === "children" ? { each: 100 } : undefined;
    commit({ op: "batch", ops: planApplyPreset(site, node, preset, { replaceTriggerId: appear.id, target, stagger, trigger: { delay: appear.delay } }), label: "Apparition" }, { label: "Apparition" });
  };
  const appearMode = appearTrack && "split" in appearTrack.target && appearTrack.target.split ? "letters" : appearTrack && "children" in appearTrack.target && appearTrack.target.children ? "children" : "one";
  return (
    <Section title="Animations" defaultOpen={triggers.length > 0} hint="Choisissez une apparition, une réaction au survol ou un mouvement continu. Le mode Animation permet de composer des lignes de temps sur plusieurs éléments.">
      <FieldGroup>
        {QUICK.map(({ group, label, hint }) => {
          const current = quickTrigger(group);
          return <Field key={group} label={label} hint={hint}><Select value={current ? presetOf(current)?.id ?? "" : ""} options={[{ value: "", label: "Aucune" }, ...ANIMATION_PRESETS.filter((p) => p.group === group).map((p) => ({ value: p.id, label: p.label }))]} onValueChange={(v) => setQuick(group, v)} /></Field>;
        })}
        {appear && (node.type === "text" || (node.children?.length ?? 0) > 1 || node.type === "collection") ? (
          <Field label="Détail" hint="Faire arriver l'élément d'un bloc, ou ses lettres / ses enfants un à un">
            <Select value={appearMode} options={[{ value: "one", label: "D'un bloc" }, ...(node.type === "text" ? [{ value: "letters", label: "Lettre par lettre" }] : []), ...(node.type !== "text" ? [{ value: "children", label: node.type === "collection" ? "Carte par carte" : "Enfant par enfant" }] : [])]} onValueChange={(v) => setAppearMode(v as "one" | "letters" | "children")} />
          </Field>
        ) : null}
      </FieldGroup>
      {triggers.length ? (
        <ul className="flex flex-col gap-2 pt-2">
          {triggers.map((t) => {
            const a = animationById(site, t.animation);
            return (
              <li key={t.id} className="flex flex-col gap-2.5 rounded-md border border-line-strong bg-surface p-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="flex-1 min-w-0 text-sm font-medium text-ink truncate" title={describeTrigger(t, site)}>{describeTrigger(t, site)}</span>
                  {onPlay && a ? <IconButton size="sm" label="Jouer dans l'aperçu" icon={Play} onClick={() => onPlay(t.id)} /> : null}
                  <IconButton size="sm" label="Retirer l'animation" icon={X} onClick={() => removeTrigger(t, "Retirer l'animation")} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Quand" inline={false}><Select value={t.on} options={Object.entries(TRIGGER_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(t, { on: v as Trigger["on"] }, "Déclencheur")} /></Field>
                  {t.on !== "scroll" && t.on !== "pointer" ? <Field label="Délai" inline={false}><NumberInput unit="ms" step={50} min={0} value={t.delay ?? 0} onValueChange={(v) => update(t, { delay: v || undefined }, "Délai", `tr-dl:${t.id}`)} /></Field> : null}
                  {t.on === "inView" ? <Field label="Rejouer" inline={false}><Toggle checked={t.once === false} label={t.once === false ? "à chaque passage" : "une seule fois"} onChange={(b) => update(t, { once: b ? false : undefined }, "Rejouer")} /></Field> : null}
                  {t.on === "hover" ? <Field label="Au départ" inline={false}><Toggle checked={!!t.reverseOnLeave} label={t.reverseOnLeave ? "revient en arrière" : "se coupe"} onChange={(b) => update(t, { reverseOnLeave: b || undefined }, "Au départ de la souris")} /></Field> : null}
                  {t.on === "click" ? <Field label="Clic suivant" inline={false}><Toggle checked={!!t.toggle} label={t.toggle ? "revient en arrière" : "rejoue"} onChange={(b) => update(t, { toggle: b || undefined }, "Clic suivant")} /></Field> : null}
                  {t.on === "pointer" ? <Field label="Axe" inline={false}><Select value={t.axis ?? "y"} options={[{ value: "y", label: "Vertical" }, { value: "x", label: "Horizontal" }]} onValueChange={(v) => update(t, { axis: v as "x" | "y" }, "Axe")} /></Field> : null}
                  {t.on === "load" || t.on === "inView" ? <Field label="Au survol" inline={false}><Toggle checked={!!t.pauseOnHover} label={t.pauseOnHover ? "en pause" : "continue"} onChange={(b) => update(t, { pauseOnHover: b || undefined }, "Pause au survol")} /></Field> : null}
                </div>
                {t.on === "scroll" ? <Field label="Plage" hint="Part de la traversée de l'écran pendant laquelle la ligne de temps se déroule : 0 = l'élément entre par le bas, 1 = il sort par le haut"><div className="flex items-center gap-1"><NumberInput className="w-16" step={0.05} min={0} max={1} value={t.range?.[0] ?? 0} onValueChange={(v) => update(t, { range: [v === "" ? 0 : v, t.range?.[1] ?? 1] }, "Plage")} /><span className="text-xs text-muted">à</span><NumberInput className="w-16" step={0.05} min={0} max={1} value={t.range?.[1] ?? 1} onValueChange={(v) => update(t, { range: [t.range?.[0] ?? 0, v === "" ? 1 : v] }, "Plage")} /></div></Field> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
      {node.type === "text" ? <Field label="Compteur" hint="Le nombre du texte défile de 0 à sa valeur quand il entre dans l'écran (« 12 ans » compte jusqu'à 12)"><Toggle checked={!!node.props.countUp} label={node.props.countUp ? "animé" : "fixe"} onChange={(b) => commit({ op: "node.set", id: node.id, path: "props.countUp", value: b || undefined }, { label: b ? "Compteur animé" : "Compteur fixe" })} /></Field> : null}
      {!triggers.length ? <Hint>Les animations composées (plusieurs éléments, images-clés, ligne de temps) se règlent dans le mode Animation.</Hint> : null}
    </Section>
  );
}
