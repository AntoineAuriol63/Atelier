"use client";

import { cx } from "./cx";

/** Un oui / non : une vraie case à cocher, stylée. Pour un choix exclusif entre plusieurs valeurs, voir `Segmented`. */
export function Toggle({ checked, onChange, label, title, className, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; title?: string; className?: string; disabled?: boolean }) {
  return (
    <label className={cx("inline-flex items-center gap-1.5 h-7 text-xs select-none", disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer text-muted hover:text-ink", checked && !disabled && "text-ink", className)} title={title}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} className="h-3.5 w-3.5 accent-[var(--color-accent)]" />
      {label}
    </label>
  );
}
