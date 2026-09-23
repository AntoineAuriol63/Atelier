"use client";

import type { Scene } from "@/lib/scene";
import { sceneSentence } from "@/lib/scene";
import { formatDuration, quoteLabel, tickLabel } from "@/lib/timeline";

/**
 * La scène d'une section en une vue (lot 8, vague 4 PR1) : chaque élément sur une même règle, son départ et sa fin, la durée totale,
 * la phrase qui dit l'ordre, ce qui part avant son tour, ce qui ne bouge pas. Lecture seule : chaque élément se règle sur lui-même.
 */
export function SceneOverview({ scene, onSelectNode, onChain }: { scene: Scene; onSelectNode?: (id: string) => void; /** Enchaîner la scène dans l'ordre de la page (lot 9) ; absent quand elle l'est déjà. */ onChain?: () => void }) {
  const total = Math.max(1, scene.total);
  const pct = (ms: number) => `${Math.round((ms / total) * 1000) / 10}%`;
  return (
    <div className="flex flex-col gap-1.5" data-scene="">
      <p className="text-2xs text-muted leading-snug" data-scene-sentence="">{sceneSentence(scene)}</p>
      <ul className="flex flex-col gap-0.5" aria-label={`Scène de ${quoteLabel(scene.sectionLabel)}`}>
        {scene.entries.map((e) => (
          <li key={e.id} data-scene-row={e.id} className="grid grid-cols-[96px_1fr_auto] items-center gap-1.5 text-2xs">
            {onSelectNode ? <button type="button" className="truncate text-left text-ink hover:text-accent" title={`Régler ${quoteLabel(e.label)}`} onClick={() => onSelectNode(e.id)}>{e.label}{e.count ? ` ×${e.count}` : ""}</button> : <span className="truncate text-ink">{e.label}{e.count ? ` ×${e.count}` : ""}</span>}
            <span className="relative h-2.5 rounded-xs bg-surface" aria-hidden>
              <span className="absolute top-0 bottom-0 rounded-xs bg-accent/70" style={{ left: pct(e.start), width: pct(Math.max(40, e.end - e.start)) }} />
            </span>
            <span className="tabular-nums text-muted whitespace-nowrap">{tickLabel(e.start)} → {tickLabel(e.end)} ms</span>
          </li>
        ))}
      </ul>
      <p className="text-2xs text-ink">Tout est fini à <strong className="font-medium">{formatDuration(scene.total)}</strong>{scene.separate ? " après le dernier lancement" : ""}.</p>
      {scene.warnings.map((w) => <p key={w} className="text-2xs text-warning leading-snug" role="status">{w}</p>)}
      {onChain ? <button type="button" className="self-start h-7 px-2 rounded-sm border border-accent text-xs font-medium text-accent hover:bg-accent-soft" title="Chaque élément démarre après celui qui le précède dans la page, dans un seul lancement ; chaque départ se règle ensuite à part" onClick={onChain}>Enchaîner dans cet ordre</button> : null}
      {scene.still.length ? <p className="text-2xs text-muted leading-snug">{scene.still.map((s) => `${quoteLabel(s.label)} ne bouge pas`).join(" · ")}.</p> : null}
    </div>
  );
}
