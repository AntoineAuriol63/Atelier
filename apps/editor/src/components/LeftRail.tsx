"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Tooltip } from "@/ui";

export type RailItem = { id: string; label: string; icon: LucideIcon; disabled?: boolean; hint?: string };
export type RailTool = { id: string; label: string; icon: LucideIcon; onClick: () => void };

/**
 * Le rail d'icônes à gauche (23 septembre 2026, chantier 2) : une icône par panneau (Pages, Calques, Ajouter, Données, Thème),
 * l'icône active replie le panneau, et en bas les outils du site (images, palette, réglages). Il libère la barre du haut et donne
 * une place stable à ce qui n'en avait pas.
 */
export function LeftRail({ items, active, onSelect, onCollapse, tools, style }: { items: RailItem[]; active: string | null; onSelect: (id: string) => void; onCollapse: () => void; tools?: RailTool[]; style?: CSSProperties }) {
  const btn = (pressed: boolean) => `grid place-items-center h-9 w-9 rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${pressed ? "bg-accent-soft text-accent ring-1 ring-inset ring-accent" : "text-muted hover:bg-hover hover:text-ink"}`;
  return (
    <nav style={style} className="flex flex-col items-center gap-1 py-2 border-r border-line bg-panel min-h-0" aria-label="Panneaux" data-rail="">
      {items.map((it) => {
        const pressed = it.id === active;
        return (
          <Tooltip key={it.id} text={it.hint ?? it.label}>
            <button type="button" aria-label={it.label} aria-pressed={pressed} disabled={it.disabled} className={btn(pressed)} onClick={() => (pressed ? onCollapse() : onSelect(it.id))}>
              <it.icon size={17} strokeWidth={1.75} aria-hidden />
            </button>
          </Tooltip>
        );
      })}
      {tools?.length ? (
        <div className="mt-auto flex flex-col items-center gap-1 pt-2 border-t border-line" data-rail-tools="">
          {tools.map((t) => (
            <Tooltip key={t.id} text={t.label}>
              <button type="button" aria-label={t.label} className={btn(false)} onClick={t.onClick}>
                <t.icon size={17} strokeWidth={1.75} aria-hidden />
              </button>
            </Tooltip>
          ))}
        </div>
      ) : null}
    </nav>
  );
}
