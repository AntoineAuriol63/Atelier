"use client";

import type { ReactNode } from "react";
import type { StyleSource } from "@atelier/model";
import { SourceDot } from "./SourceDot";
import { cx } from "../cx";
import { Tooltip } from "../Tooltip";

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
    <Tooltip text={onScrub ? `${hint ?? label}. Glisser horizontalement pour ajuster, Maj pour aller dix fois plus vite.` : (hint ?? label)} side="left">
    <span
      className={cx("text-xs text-muted truncate select-none", onScrub && "cursor-ew-resize hover:text-ink", wide ? "w-[76px] shrink-0" : "")}
      onPointerDown={startScrub}
    >{label}</span>
    </Tooltip>
  );
  return (
    <div data-prop={prop ?? label} className={cx("grid items-center gap-1.5 rounded-xs", wide ? "grid-cols-[16px_1fr]" : "grid-cols-[16px_80px_1fr]", className)}>
      <SourceDot source={source} title={sourceTitle} onReset={onReset} />
      {wide ? null : labelEl}
      <div className="min-w-0 flex items-center gap-1">{wide ? labelEl : null}{children}</div>
    </div>
  );
}
