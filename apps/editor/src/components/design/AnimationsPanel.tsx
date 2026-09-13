"use client";

import { Film, Play, X } from "lucide-react";
import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { animationById, describeTrigger, isPresetIntact, planRemoveTriggerWithAnimation } from "@atelier/model";
import { Badge, Field, Hint, IconButton, Section, Toggle } from "@/ui";
import { QuickAnimations } from "../animation/QuickAnimations";

type Commit = (op: Op, opts?: CommitOptions) => void;

/**
 * Animations d'un élément en mode Design (section 8.4, cadrage `docs/cadrage-animation.md` § 4.3) : les trois choix rapides, la liste
 * des déclencheurs en lecture seule (« Jouer », « Ouvrir dans le mode Animation », retirer) et le compteur d'un texte.
 * Les réglages des déclencheurs et la composition (pistes, images-clés) se font dans le mode Animation.
 */
export function AnimationsPanel({ site, node, commit, onPlay, onOpenAnimation }: { site: Site; node: Node; commit: Commit; onPlay?: (triggerId: string) => void; onOpenAnimation?: (triggerId?: string) => void }) {
  const triggers = node.triggers ?? [];
  return (
    <Section title="Animations" defaultOpen={triggers.length > 0} hint="Choisissez une apparition, une réaction au survol ou un mouvement continu. Le mode Animation règle les déclencheurs et compose des lignes de temps sur plusieurs éléments.">
      <QuickAnimations site={site} node={node} commit={commit} onOpenAnimation={onOpenAnimation ? () => onOpenAnimation() : undefined} />
      {triggers.length ? (
        <ul className="flex flex-col gap-1 pt-2" aria-label="Déclencheurs de l'élément">
          {triggers.map((t) => {
            const a = animationById(site, t.animation);
            const custom = a && !(a.preset && isPresetIntact(a));
            return (
              <li key={t.id} className="flex items-center gap-1 rounded-sm border border-line bg-surface/60 px-2 py-1">
                <span className="flex-1 min-w-0 text-xs text-ink truncate" title={describeTrigger(t, site)}>{describeTrigger(t, site)}</span>
                {custom ? <Badge title="Composée ou retouchée dans le mode Animation">personnalisée</Badge> : null}
                {onPlay && a ? <IconButton size="sm" label="Jouer dans l'aperçu" icon={Play} onClick={() => onPlay(t.id)} /> : null}
                {onOpenAnimation && a ? <IconButton size="sm" label="Ouvrir dans le mode Animation" icon={Film} onClick={() => onOpenAnimation(t.id)} /> : null}
                <IconButton size="sm" label="Retirer l'animation" icon={X} onClick={() => commit({ op: "batch", ops: planRemoveTriggerWithAnimation(site, node, t.id), label: "Retirer l'animation" }, { label: "Retirer l'animation" })} />
              </li>
            );
          })}
        </ul>
      ) : null}
      {node.type === "text" ? <Field label="Compteur" hint="Le nombre du texte défile de 0 à sa valeur quand il entre dans l'écran (« 12 ans » compte jusqu'à 12)"><Toggle checked={!!node.props.countUp} label={node.props.countUp ? "animé" : "fixe"} onChange={(b) => commit({ op: "node.set", id: node.id, path: "props.countUp", value: b || undefined }, { label: b ? "Compteur animé" : "Compteur fixe" })} /></Field> : null}
      {triggers.length ? <Hint>Quand, délai, rejouer, retour au départ de la souris… se règlent dans le mode Animation.</Hint> : null}
    </Section>
  );
}
