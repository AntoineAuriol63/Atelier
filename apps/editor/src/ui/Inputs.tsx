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

/** Champ numérique avec unité affichée. Glissement et jetons arrivent avec les panneaux Design (M3). */
export function NumberInput({ value, onValueChange, unit, min, max, step = 1, className, placeholder }: { value: number | ""; onValueChange: (v: number | "") => void; unit?: string; min?: number; max?: number; step?: number; className?: string; placeholder?: string }) {
  return (
    <div className={cx("relative", className)}>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={(e) => onValueChange(e.target.value === "" ? "" : Number(e.target.value))}
        className={cx(FIELD, "font-mono tabular-nums pr-7 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none")}
      />
      {unit ? <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-2xs text-dim">{unit}</span> : null}
    </div>
  );
}
