"use client";

import { Film, Play, X } from "lucide-react";
import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { animationById, describeTrigger, duplicateQuickTriggers, isPresetIntact, planRemoveTriggerWithAnimation } from "@atelier/model";
import { Badge, Hint, IconButton, Section } from "@/ui";
import { QuickAnimations } from "../animation/QuickAnimations";
import { ContinuousEffects } from "../animation/ContinuousEffects";

type Commit = (op: Op, opts?: CommitOptions) => void;

/**
 * Animations d'un élément en mode Design (section 8.4, cadrage `docs/cadrage-animation.md` § 4.3) : les trois choix rapides, la liste
 * des déclencheurs en lecture seule (« Jouer », « Ouvrir dans le mode Animation », retirer) et le compteur d'un texte.
 * Les réglages des déclencheurs et la composition (pistes, images-clés) se font dans le mode Animation.
 */
export function AnimationsPanel({ site, node, commit, onPlay, onOpenAnimation, onTestOnSite }: { site: Site; node: Node; commit: Commit; onPlay?: (triggerId: string) => void; onOpenAnimation?: (triggerId?: string) => void; onTestOnSite?: () => void }) {
  const triggers = node.triggers ?? [];
  const duplicates = duplicateQuickTriggers(site, node);
  return (
    <Section title="Animations" defaultOpen={triggers.length > 0} hint="Choisissez une apparition, une réaction au survol ou un mouvement continu. Le mode Animation règle les déclencheurs et compose des lignes de temps sur plusieurs éléments.">
      <QuickAnimations site={site} node={node} commit={commit} onPlay={onPlay} onOpenAnimation={onOpenAnimation ? () => onOpenAnimation() : undefined} onTestOnSite={onTestOnSite} />
      {triggers.length ? (
        <ul className="flex flex-col gap-1 pt-2" aria-label="Déclencheurs de l'élément">
          {triggers.map((t) => {
            const a = animationById(site, t.animation);
            const custom = a && !(a.preset && isPresetIntact(a));
            return (
              <li key={t.id} className="flex items-center gap-1 rounded-sm border border-line bg-surface/60 px-2 py-1">
                {onOpenAnimation && a
                  ? <button type="button" className="flex-1 min-w-0 min-h-7 text-left text-xs text-ink truncate rounded-xs hover:text-accent" title={`Modifier dans le mode Animation · ${describeTrigger(t, site)}`} onClick={() => onOpenAnimation(t.id)}>{describeTrigger(t, site)}</button>
                  : <span className="flex-1 min-w-0 text-xs text-ink truncate" title={describeTrigger(t, site)}>{describeTrigger(t, site)}</span>}
                {custom ? <Badge title="Composée ou retouchée dans le mode Animation">personnalisée</Badge> : null}
                {duplicates.has(t.id) ? <Badge tone="warning" title="Une autre animation de la même famille (apparition, survol, continu) est déjà posée sur cet élément : les deux se jouent.">en double</Badge> : null}
                {onPlay && a ? <IconButton size="sm" label="Jouer dans le canevas" icon={Play} onClick={() => onPlay(t.id)} /> : null}
                {onOpenAnimation && a ? <IconButton size="sm" label="Ouvrir dans le mode Animation" icon={Film} onClick={() => onOpenAnimation(t.id)} /> : null}
                <IconButton size="sm" label="Retirer l'animation" icon={X} onClick={() => commit({ op: "batch", ops: planRemoveTriggerWithAnimation(site, node, t.id), label: "Retirer l'animation" }, { label: "Retirer l'animation" })} />
              </li>
            );
          })}
        </ul>
      ) : null}
      {node.type === "text" ? <div className="pt-2"><ContinuousEffects node={node} commit={commit} only={["countUp"]} hint={false} /></div> : null}
      {triggers.length ? <Hint>Quand, délai, rejouer, retour au départ de la souris… se règlent dans le mode Animation.</Hint> : null}
    </Section>
  );
}
