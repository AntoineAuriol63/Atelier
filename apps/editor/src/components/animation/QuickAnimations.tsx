"use client";

import { Fragment, useEffect, useRef } from "react";
import { ExternalLink, Film, Play } from "lucide-react";
import type { CommitOptions, Node, Op, QuickGroup, Site } from "@atelier/model";
import { ANIMATION_PRESETS, animationLength, planQuickAnimation, planQuickDetail, planQuickSpeed, quickAnimation, quickSpeed, type QuickSpeed } from "@atelier/model";
import { Button, Field, FieldGroup, IconButton, Select, Toggle } from "@/ui";
import { Segmented } from "@/ui/controls";
import { formatMs, summarizeAnimation } from "@/lib/timeline";

type Commit = (op: Op, opts?: CommitOptions) => void;
const SPEEDS = [{ value: "fast", label: "Rapide" }, { value: "normal", label: "Normale" }, { value: "slow", label: "Lente" }];

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
export function QuickAnimations({ site, node, commit, onOpenAnimation, onPlay, onTestOnSite }: { site: Site; node: Node; commit: Commit; onOpenAnimation?: () => void; onPlay?: (triggerId: string) => void; onTestOnSite?: () => void }) {
  // Aperçu immédiat : après un choix, l'animation de la famille est jouée une fois dans l'aperçu (cadrage : « on doit voir ce qu'on règle »).
  const pending = useRef<QuickGroup | null>(null);
  const playRef = useRef(onPlay);
  useEffect(() => { playRef.current = onPlay; });
  useEffect(() => {
    const group = pending.current;
    const q = group ? quickAnimation(site, node, group) : undefined;
    if (!q) return;
    pending.current = null;
    // L'éditeur envoie le site à l'aperçu dans son propre effet, après celui-ci : on laisse passer ce message avant de jouer.
    const timer = window.setTimeout(() => playRef.current?.(q.trigger.id), 120);
    return () => window.clearTimeout(timer);
  }, [site, node]);
  const run = (ops: Op[], label: string, group?: QuickGroup) => { if (!ops.length) return; if (group) pending.current = group; commit({ op: "batch", ops, label }, { label }); };
  const appear = quickAnimation(site, node, "Apparition");
  const canLetters = node.type === "text";
  const canChildren = node.type === "collection" || (node.children?.length ?? 0) > 1;
  return (
    <FieldGroup>
      {QUICK.map(({ group, label, none, hint }) => {
        const q = quickAnimation(site, node, group);
        const options = [{ value: "", label: none }, ...(q && !q.intact ? [{ value: "custom", label: `Personnalisée (${q.preset.label})` }] : []), ...ANIMATION_PRESETS.filter((p) => p.group === group).map((p) => ({ value: p.id, label: p.label }))];
        return (
          <Fragment key={group}>
            <Field label={label} hint={q && !q.intact ? `${hint}. Retouchée dans le mode Animation : choisir un préréglage la remplace.` : hint}>
              <div className="flex items-center gap-1 min-w-0">
                <Select className="flex-1 min-w-0" value={q ? (q.intact ? q.preset.id : "custom") : ""} options={options} onValueChange={(v) => { if (v !== "custom") run(planQuickAnimation(site, node, group, v), v ? `${label} · ${ANIMATION_PRESETS.find((p) => p.id === v)?.label ?? v}` : `${label} · ${none.toLowerCase()}`, v ? group : undefined); }} />
                {q && onPlay ? <IconButton size="sm" label={`Jouer : ${q.preset.label}`} icon={Play} onClick={() => onPlay(q.trigger.id)} /> : null}
              </div>
            </Field>
            {/* Vitesse (audit n°5 · R1) : rapide, normale ou lente, sans quitter le préréglage. */}
            {/* Pas de <label> autour : un clic dans la marge activerait le premier bouton. Une vitesse réglée à la main se dit (tests simulés, PR14). */}
            {q ? (
              <div className="grid grid-cols-[88px_1fr] items-center gap-2" title="Vitesse de l'animation, par rapport au préréglage">
                <span className="text-xs text-muted truncate">Vitesse</span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <Segmented size="sm" required label={`Vitesse · ${label}`} className="w-full" value={quickSpeed(q) === "custom" ? undefined : quickSpeed(q)} options={SPEEDS} onChange={(v) => { if (v) run(planQuickSpeed(site, node, group, v as QuickSpeed), `${label} · ${SPEEDS.find((o) => o.value === v)?.label.toLowerCase()}`, group); }} />
                  {quickSpeed(q) === "custom" ? <span className="text-2xs text-muted">Sur mesure : {formatMs(animationLength(q.animation))}</span> : null}
                </div>
              </div>
            ) : null}
            {q ? <Field label=""><p className="text-2xs text-muted leading-snug" data-anim-summary="">{summarizeAnimation(site, q.trigger, node.id)}</p></Field> : null}
            {/* Le détail d'une apparition se règle juste sous elle, pas sous le dernier choix. */}
            {group === "Apparition" && appear && (canLetters || canChildren) ? (
              <Field label="" hint="Faire arriver l'élément d'un bloc, ou ses morceaux un à un">
                {canLetters
                  ? <Toggle checked={appear.detail === "letters"} label="lettre par lettre" onChange={(b) => run(planQuickDetail(site, node, "Apparition", b ? "letters" : "one"), b ? "Apparition lettre par lettre" : "Apparition d'un bloc", "Apparition")} />
                  : <Toggle checked={appear.detail === "children"} label={node.type === "collection" ? "les cartes une à une" : "les enfants un à un"} onChange={(b) => run(planQuickDetail(site, node, "Apparition", b ? "children" : "one"), b ? "Apparition enfant par enfant" : "Apparition d'un bloc", "Apparition")} />}
              </Field>
            ) : null}
          </Fragment>
        );
      })}
      <div className="flex flex-wrap items-center gap-1">
        {/* Le canevas joue l'animation ; le vrai déclenchement (entrée dans l'écran, survol) se vérifie sur le site (audit n°5 · R4). */}
        {onTestOnSite && node.triggers?.length ? <Button size="sm" variant="ghost" icon={ExternalLink} onClick={onTestOnSite} title="Ouvre l'onglet Aperçu : l'élément arrive à l'écran et ses animations se jouent comme pour un visiteur">Tester sur le site</Button> : null}
        {onOpenAnimation ? <Button size="sm" variant="ghost" icon={Film} onClick={onOpenAnimation}>Ouvrir dans le mode Animation</Button> : null}
      </div>
    </FieldGroup>
  );
}
