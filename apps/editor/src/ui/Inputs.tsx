"use client";

import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "./cx";

const FIELD = "w-full h-7 px-2 rounded-sm bg-surface text-ink border border-line placeholder:text-dim hover:border-line-strong focus:border-accent focus:outline-none text-sm";

/** Champ texte contrôlé qui ne perd pas la frappe quand la valeur externe change pendant la saisie. */
export function TextInput({ value, onValueChange, mono, className, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & { value: string; onValueChange: (v: string) => void; mono?: boolean }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); if (!focused) setLocal(value); }
  return (
    <input
      type="text"
      value={local}
      className={cx(FIELD, mono && "font-mono", className)}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
      onChange={(e) => { setLocal(e.target.value); onValueChange(e.target.value); }}
      {...rest}
    />
  );
}

export function TextArea({ value, onValueChange, className, ...rest }: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & { value: string; onValueChange: (v: string) => void }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); if (!focused) setLocal(value); }
  return (
    <textarea
      value={local}
      rows={4}
      className={cx(FIELD, "h-auto py-1.5 resize-y leading-snug", className)}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
      onChange={(e) => { setLocal(e.target.value); onValueChange(e.target.value); }}
      {...rest}
    />
  );
}

export type SelectOption = { value: string; label: string };

export function Select({ value, options, onValueChange, className, placeholder }: { value: string; options: SelectOption[]; onValueChange: (v: string) => void; className?: string; placeholder?: string }) {
  return (
    <div className={cx("relative", className)}>
      <select value={value} onChange={(e) => onValueChange(e.target.value)} className={cx(FIELD, "appearance-none pr-6")}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={13} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-dim" aria-hidden />
    </div>
  );
}

/**
 * Champ numérique avec unité. La valeur est validée à la fin de la saisie (Entrée ou sortie du champ),
 * jamais à chaque frappe, pour pouvoir effacer et retaper. Flèches haut/bas : ±pas (Maj : ×10). Échap : annule.
 */
export function NumberInput({ value, onValueChange, unit, min, max, step = 1, className, placeholder, title }: { value: number | ""; onValueChange: (v: number | "") => void; unit?: string; min?: number; max?: number; step?: number; className?: string; placeholder?: string; title?: string }) {
  const [draft, setDraft] = useState(value === "" ? "" : String(value));
  const [focused, setFocused] = useState(false);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); if (!focused) setDraft(value === "" ? "" : String(value)); }
  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));
  const commit = () => {
    const t = draft.trim().replace(",", ".");
    if (t === "") { onValueChange(""); return; }
    const n = Number(t);
    if (!Number.isFinite(n)) { setDraft(value === "" ? "" : String(value)); return; }
    const c = clamp(n);
    setDraft(String(c));
    if (c !== value) onValueChange(c);
  };
  return (
    <div className={cx("relative", className)} title={title}>
      <input
        type="text"
        inputMode="decimal"
        value={draft}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); commit(); }}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { commit(); (e.target as HTMLInputElement).blur(); }
          if (e.key === "Escape") { setDraft(value === "" ? "" : String(value)); (e.target as HTMLInputElement).blur(); }
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const base = Number(draft) || (typeof value === "number" ? value : 0);
            const c = clamp(base + (e.key === "ArrowUp" ? 1 : -1) * step * (e.shiftKey ? 10 : 1));
            setDraft(String(c)); onValueChange(c);
          }
        }}
        className={cx(FIELD, "font-mono tabular-nums pr-7")}
      />
      {unit ? <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-2xs text-dim">{unit}</span> : null}
    </div>
  );
}
