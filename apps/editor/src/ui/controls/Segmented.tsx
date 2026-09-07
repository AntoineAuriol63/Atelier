"use client";

import { createElement } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../cx";

export type SegmentOption = { value: string; label: string; icon?: LucideIcon; rotate?: number };

/** Groupe de boutons exclusifs. Cliquer l'option active la retire (réinitialisation). */
export function Segmented({ value, options, onChange, className, size = "md" }: { value: string | undefined; options: SegmentOption[]; onChange: (v: string | undefined) => void; className?: string; size?: "sm" | "md" }) {
  return (
    <div role="radiogroup" className={cx("inline-flex items-stretch rounded-sm bg-surface border border-line p-0.5 gap-0.5 min-w-0 max-w-full", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.label}
            aria-label={o.label}
            onClick={() => onChange(active ? undefined : o.value)}
            className={cx("flex-1 min-w-0 inline-flex items-center justify-center rounded-xs text-xs whitespace-nowrap overflow-hidden", size === "sm" ? "h-5 px-1" : "h-6 px-1.5", active ? "bg-raised text-ink shadow-sm" : "text-muted hover:text-ink hover:bg-hover")}
          >
            {o.icon ? createElement(o.icon, { size: 13, strokeWidth: 1.75, "aria-hidden": true, style: o.rotate ? { transform: `rotate(${o.rotate}deg)` } : undefined }) : o.label}
          </button>
        );
      })}
    </div>
  );
}
