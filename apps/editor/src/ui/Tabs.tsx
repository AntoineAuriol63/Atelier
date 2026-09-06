"use client";

import type { LucideIcon } from "lucide-react";
import { cx } from "./cx";

export type Tab = { id: string; label: string; icon?: LucideIcon; disabled?: boolean; hint?: string };

/** Onglets compacts. `variant="pill"` pour les segments de la barre (modes, largeurs). */
export function Tabs({ tabs, value, onChange, variant = "underline", className }: { tabs: Tab[]; value: string; onChange: (id: string) => void; variant?: "underline" | "pill"; className?: string }) {
  return (
    <div role="tablist" className={cx("flex items-stretch", variant === "pill" ? "gap-0.5 rounded-sm bg-surface p-0.5" : "border-b border-line", className)}>
      {tabs.map((t) => {
        const active = t.id === value;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={t.disabled}
            title={t.hint}
            onClick={() => onChange(t.id)}
            className={cx(
              "inline-flex items-center gap-1.5 whitespace-nowrap select-none disabled:opacity-40 disabled:pointer-events-none",
              variant === "pill"
                ? cx("h-6 px-2.5 rounded-xs text-xs", active ? "bg-raised text-ink shadow-sm" : "text-muted hover:text-ink")
                : cx("h-8 px-3 text-xs -mb-px border-b-2", active ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"),
            )}
          >
            {Icon ? <Icon size={13} strokeWidth={1.75} aria-hidden /> : null}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
