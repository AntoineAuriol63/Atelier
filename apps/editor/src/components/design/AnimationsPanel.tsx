"use client";

import { Film, Play, X } from "lucide-react";
import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { animationById, appearanceOf, describeTrigger, inheritedAppearance, duplicateQuickTriggers, isPresetIntact, isSequence, planAppearancePreset, planRemoveTriggerWithAnimation } from "@atelier/model";
import { Badge, Button, Hint, IconButton, Section } from "@/ui";
import { QuickAnimations } from "../animation/QuickAnimations";
import { ContinuousEffects } from "../animation/ContinuousEffects";

type Commit = (op: Op, opts?: CommitOptions) => void;

/**
 * Animations d'un élément en mode Design (section 8.4, cadrage `docs/cadrage-animation.md` § 4.3) : les trois choix rapides, la liste
 * des déclencheurs en lecture seule (« Jouer », « Ouvrir la ligne de temps », retirer) et le compteur d'un texte.
 * Les réglages des déclencheurs et la composition (pistes, images-clés) se font dans l'outil Animation (tiroir sous le canevas).
 */
export function AnimationsPanel({ site, node, commit, onPlay, onOpenAnimation, onTestOnSite, onSelectNode }: { site: Site; node: Node; commit: Commit; onPlay?: (triggerId: string, hostId?: string) => void; onOpenAnimation?: (triggerId?: string) => void; onTestOnSite?: (nodeId?: string) => void; onSelectNode?: (id: string) => void }) {
  const triggers = node.triggers ?? [];
  const duplicates = duplicateQuickTriggers(site, node);
  return (
    <Section title="Animations" defaultOpen={triggers.length > 0 || !!appearanceOf(site, node.id) || !!inheritedAppearance(site, node.id)} hint="Choisissez une apparition, une réaction au survol ou un mouvement continu. L'outil Animation règle les déclencheurs et compose des lignes de temps sur plusieurs éléments.">
      <QuickAnimations site={site} node={node} commit={commit} onPlay={onPlay} onOpenAnimation={onOpenAnimation ? () => onOpenAnimation() : undefined} onTestOnSite={onTestOnSite} onSelectNode={onSelectNode} />
      {triggers.length ? (
        <ul className="flex flex-col gap-1 pt-2" aria-label="Déclencheurs de l'élément">
          {triggers.map((t) => {
            const a = animationById(site, t.animation);
            const custom = a && !(a.preset && isPresetIntact(a));
            // Une suite fait aussi apparaître d'autres éléments : la croix ne retire que ce qui concerne cet élément, jamais leur apparition.
            const others = a && isSequence(a) ? a.tracks.filter((k) => !("trigger" in k.target)).length : 0;
            const ownTrack = a?.tracks.some((k) => "trigger" in k.target && k.keyframes.length >= 2);
            return (
              <li key={t.id} className="flex items-center gap-1 rounded-sm border border-line bg-surface/60 px-2 py-1">
                {onOpenAnimation && a
                  ? <button type="button" className="flex-1 min-w-0 min-h-7 py-1 text-left text-xs text-ink leading-snug rounded-xs hover:text-accent" title={`Modifier dans l'outil Animation · ${describeTrigger(t, site)}`} onClick={() => onOpenAnimation(t.id)}>{describeTrigger(t, site)}</button>
                  : <span className="flex-1 min-w-0 text-xs text-ink truncate" title={describeTrigger(t, site)}>{describeTrigger(t, site)}</span>}
                {custom ? <Badge title="Composée ou retouchée dans l'outil Animation">personnalisée</Badge> : null}
                {duplicates.has(t.id) ? <Badge tone="warning" title="Une autre animation de la même famille (apparition, survol, continu) est déjà posée sur cet élément : les deux se jouent.">en double</Badge> : null}
                {onPlay && a ? <Button size="sm" variant="ghost" icon={Play} title="Joue cette animation dans l'aperçu" onClick={() => onPlay(t.id)}>Voir l&apos;effet</Button> : null}
                {onOpenAnimation && a ? <IconButton size="sm" label="Ouvrir la ligne de temps" icon={Film} onClick={() => onOpenAnimation(t.id)} /> : null}
                {others ? <Badge title={`Cette animation fait aussi bouger ${others} autre${others > 1 ? "s" : ""} élément${others > 1 ? "s" : ""}`}>{`+ ${others}`}</Badge> : null}
                {!others
                  ? <IconButton size="sm" label="Retirer l'animation" icon={X} onClick={() => commit({ op: "batch", ops: planRemoveTriggerWithAnimation(site, node, t.id), label: "Retirer l'animation" }, { label: "Retirer l'animation" })} />
                  : ownTrack
                    ? <IconButton size="sm" label="Retirer l'apparition de cet élément (la suite reste)" icon={X} onClick={() => commit({ op: "batch", ops: planAppearancePreset(site, node.id, ""), label: "Retirer l'apparition" }, { label: "Retirer l'apparition" })} />
                    : null}
              </li>
            );
          })}
        </ul>
      ) : null}
      {node.type === "text" ? <div className="pt-2"><ContinuousEffects node={node} commit={commit} only={["countUp"]} hint={false} /></div> : null}
      {triggers.length ? <Hint>Retour au départ de la souris, bascule au clic, défilement… se règlent dans l&apos;outil Animation.</Hint> : null}
    </Section>
  );
}
