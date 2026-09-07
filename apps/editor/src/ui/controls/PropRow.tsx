"use client";

import type { ReactNode } from "react";
import type { StyleSource } from "@atelier/model";
import { SourceDot } from "./SourceDot";
import { cx } from "../cx";

/** Ligne d'un panneau de style : pastille d'origine, libellé, contrôle. */
export function PropRow({ label, source, sourceTitle, onReset, children, className, wide, onScrub, hint, prop }: { label: string; source?: StyleSource; sourceTitle: string; onReset?: () => void; children: ReactNode; className?: string; wide?: boolean; onScrub?: (totalDelta: number, big: boolean) => void; hint?: string; prop?: string }) {
  const startScrub = (e: React.PointerEvent) => {
    if (!onScrub || e.button !== 0) return;
    e.preventDefault();
    // Delta cumulé depuis le début du glissement : le récepteur part de la valeur d'origine, sans dérive.
    const start = e.clientX;
    const onMove = (ev: PointerEvent) => { onScrub(ev.clientX - start, ev.shiftKey); };
    const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); document.body.style.cursor = ""; };
    document.body.style.cursor = "ew-resize";
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
  };
  const labelEl = (
    <span
      className={cx("text-xs text-muted truncate select-none", onScrub && "cursor-ew-resize hover:text-ink", wide ? "w-[68px] shrink-0" : "")}
      title={onScrub ? `${hint ?? label}. Glisser horizontalement pour ajuster (Maj : ×10).` : (hint ?? label)}
      onPointerDown={startScrub}
    >{label}</span>
  );
  return (
    <div data-prop={prop ?? label} className={cx("grid items-center gap-1.5 rounded-xs", wide ? "grid-cols-[12px_1fr]" : "grid-cols-[12px_72px_1fr]", className)}>
      <SourceDot source={source} title={sourceTitle} onReset={onReset} />
      {wide ? null : labelEl}
      <div className="min-w-0 flex items-center gap-1">{wide ? labelEl : null}{children}</div>
    </div>
  );
}
