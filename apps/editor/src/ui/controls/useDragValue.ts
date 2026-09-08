"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Régler une valeur numérique en glissant horizontalement sur le champ lui-même, à la manière de Figma :
 * un clic sans mouvement met le curseur dans le champ pour taper ; dès quelques pixels de mouvement, la valeur suit la souris
 * (un pixel = un pas, Maj = dix fois plus vite), sans passer par l'édition. Le pas dépend de l'unité (`stepFor`).
 */
let dragging = false;
/** Vrai pendant un glissement sur un champ : les changements successifs se fusionnent en une seule étape d'historique, quelle que soit la durée. */
export const isDraggingValue = () => dragging;

export function stepFor(unit: string): number {
  if (unit === "rem" || unit === "em") return 0.25;
  if (unit === "") return 0.1;
  return 1;
}

export function startDragValue(e: ReactPointerEvent<HTMLElement>, opts: { from: number; step?: number; onChange: (n: number) => void; onStart?: () => void; onEnd?: (moved: boolean) => void }): void {
  if (e.button !== 0) return;
  const target = e.currentTarget;
  const x0 = e.clientX;
  const step = opts.step ?? 1;
  let moved = false;
  const onMove = (ev: PointerEvent) => {
    const d = ev.clientX - x0;
    if (!moved) { if (Math.abs(d) < 3) return; moved = true; target.blur(); window.getSelection()?.removeAllRanges(); document.body.style.cursor = "ew-resize"; document.body.style.userSelect = "none"; dragging = true; opts.onStart?.(); }
    ev.preventDefault();
    // La valeur avance par pas entiers de l'unité : pas de centièmes, personne n'en veut.
    const raw = opts.from + d * step * (ev.shiftKey ? 10 : 1);
    const n = Math.round(Math.round(raw / step) * step * 1000) / 1000;
    opts.onChange(n);
  };
  const onUp = () => {
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
    document.body.style.cursor = ""; document.body.style.userSelect = "";
    dragging = false;
    opts.onEnd?.(moved);
  };
  window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); window.addEventListener("pointercancel", onUp);
}
