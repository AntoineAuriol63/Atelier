"use client";

import { createElement, useRef, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../cx";
import { Tooltip } from "../Tooltip";

export type SegmentOption = { value: string; label: string; icon?: LucideIcon; rotate?: number };

/**
 * Groupe de boutons exclusifs (radio). Un seul arrêt de tabulation, flèches pour changer d'option.
 * Par défaut, cliquer l'option active la retire (réinitialisation) ; `required` interdit ce vide.
 */
export function Segmented({ value, options, onChange, className, size = "md", label, required }: { value: string | undefined; options: SegmentOption[]; onChange: (v: string | undefined) => void; className?: string; size?: "sm" | "md"; /** Nom du groupe pour les lecteurs d'écran. */ label?: string; /** Une option reste toujours choisie. */ required?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const focusable = options.some((o) => o.value === value) ? value : options[0]?.value;
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key) || !options.length) return;
    e.preventDefault();
    const i = options.findIndex((o) => o.value === value);
    const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
    const next = e.key === "Home" ? 0 : e.key === "End" ? options.length - 1 : i < 0 ? 0 : (i + (fwd ? 1 : -1) + options.length) % options.length;
    const v = options[next]!.value;
    onChange(v);
    root.current?.querySelector<HTMLElement>(`[data-option="${CSS.escape(v)}"]`)?.focus();
  };
  return (
    <div ref={root} role="radiogroup" aria-label={label} onKeyDown={onKey} className={cx("inline-flex items-stretch rounded-sm bg-surface border border-line p-0.5 gap-0.5 min-w-0 max-w-full", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Tooltip key={o.value} text={o.label}>
          <button
            type="button"
            role="radio"
            data-option={o.value}
            aria-checked={active}
            aria-label={o.label}
            tabIndex={o.value === focusable ? 0 : -1}
            onClick={() => onChange(active && !required ? undefined : o.value)}
            className={cx("flex-1 min-w-0 inline-flex items-center justify-center rounded-xs text-xs whitespace-nowrap overflow-hidden", size === "sm" ? "h-5 px-1" : "h-6 px-1.5", active ? "bg-raised text-ink font-medium shadow-sm ring-1 ring-inset ring-line-strong" : "text-muted hover:text-ink hover:bg-hover")}
          >
            {o.icon ? createElement(o.icon, { size: 13, strokeWidth: 1.75, "aria-hidden": true, style: o.rotate ? { transform: `rotate(${o.rotate}deg)` } : undefined }) : <span className="truncate">{o.label}</span>}
          </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
