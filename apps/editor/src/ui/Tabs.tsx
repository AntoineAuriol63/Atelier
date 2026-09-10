"use client";

import { useRef, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "./cx";

export type Tab = { id: string; label: string; icon?: LucideIcon; disabled?: boolean; hint?: string };

/**
 * Onglets compacts. Un seul arrêt de tabulation (tabindex tournant), flèches ← → et Début / Fin pour passer de l'un à l'autre.
 * `variant="pill"` sert aux segments de la barre (modes, largeurs) : ce sont des choix exclusifs, exposés comme un groupe radio.
 */
export function Tabs({ tabs, value, onChange, variant = "underline", className, label }: { tabs: Tab[]; value: string; onChange: (id: string) => void; variant?: "underline" | "pill"; className?: string; /** Nom du groupe pour les lecteurs d'écran. */ label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const enabled = tabs.filter((t) => !t.disabled);
  const focusable = enabled.some((t) => t.id === value) ? value : enabled[0]?.id;
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) || !enabled.length) return;
    e.preventDefault();
    const i = enabled.findIndex((t) => t.id === value);
    const next = e.key === "Home" ? 0 : e.key === "End" ? enabled.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + enabled.length) % enabled.length;
    const id = enabled[next]!.id;
    onChange(id);
    root.current?.querySelector<HTMLElement>(`[data-tab="${CSS.escape(id)}"]`)?.focus();
  };
  const pill = variant === "pill";
  return (
    <div ref={root} role={pill ? "radiogroup" : "tablist"} aria-label={label} onKeyDown={onKey} className={cx("flex items-stretch min-w-0", pill ? "gap-0.5 rounded-sm bg-surface p-0.5" : "border-b border-line overflow-hidden", className)}>
      {tabs.map((t) => {
        const active = t.id === value;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            data-tab={t.id}
            role={pill ? "radio" : "tab"}
            type="button"
            aria-selected={pill ? undefined : active}
            aria-checked={pill ? active : undefined}
            tabIndex={t.id === focusable ? 0 : -1}
            disabled={t.disabled}
            title={t.hint}
            onClick={() => onChange(t.id)}
            className={cx(
              "inline-flex items-center gap-1.5 whitespace-nowrap select-none disabled:opacity-40 disabled:cursor-not-allowed",
              pill
                ? cx("h-6 px-2.5 rounded-xs text-xs", active ? "bg-raised text-ink shadow-sm" : "text-muted hover:text-ink")
                : cx("h-8 px-2 text-xs -mb-px border-b-2 min-w-0", active ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"),
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
