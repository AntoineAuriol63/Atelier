"use client";

import { Film } from "lucide-react";
import type { CommitOptions, Node, Op, QuickGroup, Site } from "@atelier/model";
import { ANIMATION_PRESETS, planQuickAnimation, planQuickDetail, quickAnimation } from "@atelier/model";
import { Button, Field, FieldGroup, Select, Toggle } from "@/ui";

type Commit = (op: Op, opts?: CommitOptions) => void;

const QUICK: { group: QuickGroup; label: string; none: string; hint: string }[] = [
  { group: "Apparition", label: "Apparition", none: "Aucune", hint: "L'élément arrive quand il entre dans l'écran" },
  { group: "Survol", label: "Au survol", none: "Aucun", hint: "Réagit à la souris et revient quand elle part" },
  { group: "Continue", label: "En continu", none: "Aucun", hint: "En boucle dès le chargement" },
];

/**
 * Préréglages en un geste (cadrage § 4.2 et § 4.3), en Écriture comme en Design : trois choix sur l'élément seul (apparition, survol,
 * continu) et, pour une apparition, « lettre par lettre » (texte) ou « les enfants un à un » (boîte à plusieurs enfants, vue).
 * Une animation retouchée dans le mode Animation s'affiche « Personnalisée » : choisir un préréglage la remplace.
 */
export function QuickAnimations({ site, node, commit, onOpenAnimation }: { site: Site; node: Node; commit: Commit; onOpenAnimation?: () => void }) {
  const run = (ops: Op[], label: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label }); };
  const appear = quickAnimation(site, node, "Apparition");
  const canLetters = node.type === "text";
  const canChildren = node.type === "collection" || (node.children?.length ?? 0) > 1;
  return (
    <FieldGroup>
      {QUICK.map(({ group, label, none, hint }) => {
        const q = quickAnimation(site, node, group);
        const options = [{ value: "", label: none }, ...(q && !q.intact ? [{ value: "custom", label: `Personnalisée (${q.preset.label})` }] : []), ...ANIMATION_PRESETS.filter((p) => p.group === group).map((p) => ({ value: p.id, label: p.label }))];
        return (
          <Field key={group} label={label} hint={q && !q.intact ? `${hint}. Retouchée dans le mode Animation : choisir un préréglage la remplace.` : hint}>
            <Select value={q ? (q.intact ? q.preset.id : "custom") : ""} options={options} onValueChange={(v) => { if (v !== "custom") run(planQuickAnimation(site, node, group, v), v ? `${label} · ${ANIMATION_PRESETS.find((p) => p.id === v)?.label ?? v}` : `${label} · ${none.toLowerCase()}`); }} />
          </Field>
        );
      })}
      {appear && (canLetters || canChildren) ? (
        <Field label="" hint="Faire arriver l'élément d'un bloc, ou ses morceaux un à un">
          {canLetters
            ? <Toggle checked={appear.detail === "letters"} label="lettre par lettre" onChange={(b) => run(planQuickDetail(site, node, "Apparition", b ? "letters" : "one"), b ? "Apparition lettre par lettre" : "Apparition d'un bloc")} />
            : <Toggle checked={appear.detail === "children"} label={node.type === "collection" ? "les cartes une à une" : "les enfants un à un"} onChange={(b) => run(planQuickDetail(site, node, "Apparition", b ? "children" : "one"), b ? "Apparition enfant par enfant" : "Apparition d'un bloc")} />}
        </Field>
      ) : null}
      {onOpenAnimation ? <Button size="sm" variant="ghost" icon={Film} className="self-start" onClick={onOpenAnimation}>Ouvrir dans le mode Animation</Button> : null}
    </FieldGroup>
  );
}
