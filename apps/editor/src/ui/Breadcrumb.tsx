"use client";

import { ChevronRight } from "lucide-react";
import { cx } from "./cx";

/**
 * Fil d'Ariane : un chemin cliquable, du plus large au plus précis (« Accueil › Héros › Colonne › Titre »). Le dernier élément est
 * l'élément courant ; les précédents permettent de remonter d'un geste vers un conteneur. Défile horizontalement s'il est long,
 * en gardant la fin visible.
 */
export function Breadcrumb({ items, onSelect, label, className }: { items: { id: string; label: string }[]; onSelect: (id: string) => void; label: string; className?: string }) {
  if (!items.length) return null;
  return (
    <nav aria-label={label} className={cx("flex items-center h-8 px-2 border-b border-line overflow-x-auto whitespace-nowrap text-xs [direction:rtl]", className)}>
      {/* Sens inversé pour que le défilement démarre sur la fin du chemin ; le contenu garde l'ordre de lecture. */}
      <ol className="flex items-center gap-0.5 [direction:ltr]">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.id} className="flex items-center gap-0.5 min-w-0">
              {i ? <ChevronRight size={11} className="text-dim shrink-0" aria-hidden /> : null}
              <button type="button" onClick={() => onSelect(it.id)} aria-current={last ? "location" : undefined} title={last ? it.label : `Sélectionner ${it.label}`}
                className={cx("h-6 px-1.5 rounded-xs max-w-[180px] truncate", last ? "text-ink font-medium" : "text-muted hover:text-ink hover:bg-hover")}>{it.label}</button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
