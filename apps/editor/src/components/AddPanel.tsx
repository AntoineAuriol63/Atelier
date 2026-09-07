"use client";

import { createElement } from "react";
import type { Site } from "@atelier/model";
import { allPresets, type BlockPreset } from "@/lib/blocks";
import { Hint, PanelHeading } from "@/ui";

export function AddPanel({ site, target, onAdd, onDragBlock }: { site: Site; target: string; onAdd: (preset: BlockPreset) => void; onDragBlock?: (presetId: string | null) => void }) {
  const all = allPresets(site);
  const groups = ["Sections", "Structure", "Contenu", "Données", "Composants"] as const;
  return (
    <div className="pb-4">
      <div className="px-3 pt-2 pb-1"><Hint>{target} Ou glissez un bloc directement dans l&apos;aperçu ou dans les calques.</Hint></div>
      {groups.map((g) => {
        const items = all.filter((b) => b.group === g);
        if (!items.length) return null;
        return (
          <div key={g}>
            <PanelHeading>{g}</PanelHeading>
            <ul className="px-2 grid grid-cols-2 gap-1">
              {items.map((b) => (
                <li key={b.id}>
                  <button type="button" onClick={() => onAdd(b)} title={`${b.description}. Cliquer pour ajouter, ou glisser vers l'aperçu ou les calques.`} draggable onDragStart={(e) => { e.dataTransfer.setData("text/atelier-block", b.id); e.dataTransfer.effectAllowed = "copy"; onDragBlock?.(b.id); }} onDragEnd={() => onDragBlock?.(null)} className="w-full flex flex-col items-start gap-1 p-2 rounded-sm bg-surface border border-line hover:border-accent hover:bg-hover text-left cursor-grab active:cursor-grabbing">
                    {createElement(b.icon, { size: 15, strokeWidth: 1.75, className: "text-muted", "aria-hidden": true })}
                    <span className="text-xs text-ink">{b.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
