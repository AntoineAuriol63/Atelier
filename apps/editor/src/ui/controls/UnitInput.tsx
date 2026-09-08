"use client";

import { useState } from "react";
import { Diamond, X } from "lucide-react";
import type { Site, StyleValue, Theme } from "@atelier/model";
import { LENGTH_UNITS, parseInput, parseValue, tokenOptions, tokenValue } from "@/lib/css-value";
import { cx } from "../cx";
import { startDragValue } from "./useDragValue";

const FIELD = "h-7 rounded-sm bg-surface text-ink border border-line hover:border-line-strong focus-within:border-accent";

/**
 * Champ de longueur CSS : nombre + unité, mot-clé, ou jeton du thème.
 * Validation à la fin de la saisie ; flèches ±1 (Maj ±10) ; glisser horizontalement sur l'unité pour ajuster.
 */
export function UnitInput({ value, onChange, site, tokenGroup, keywords = [], placeholder, defaultUnit = "px", className, muted, compact }: {
  value: StyleValue | undefined; onChange: (v: StyleValue | undefined) => void; site: Site; tokenGroup?: keyof Theme["tokens"];
  keywords?: string[]; placeholder?: string; defaultUnit?: string; className?: string; muted?: boolean; compact?: boolean;
}) {
  const parsed = parseValue(value);
  const text = parsed.kind === "number" ? String(parsed.n) : parsed.kind === "keyword" ? parsed.keyword : parsed.kind === "raw" ? parsed.raw : "";
  const [draft, setDraft] = useState(text);
  const [prev, setPrev] = useState(text);
  const [focused, setFocused] = useState(false);
  const [editingToken, setEditingToken] = useState(false);
  if (text !== prev) { setPrev(text); if (!focused) setDraft(text); }
  if (editingToken && parsed.kind !== "token") setEditingToken(false);
  const unit = parsed.kind === "number" ? parsed.unit || (parsed.n === 0 ? "" : "") : "";
  const commit = () => { const v = parseInput(draft, defaultUnit, keywords); if (JSON.stringify(v) !== JSON.stringify(value)) onChange(v); };
  const step = (dir: number, big: boolean) => {
    const base = parsed.kind === "number" ? parsed : { kind: "number" as const, n: Number(draft) || 0, unit: defaultUnit };
    const n = Math.round((base.n + dir * (big ? 10 : 1)) * 100) / 100;
    onChange(`${n}${base.unit || (n === 0 ? "" : defaultUnit)}`);
  };
  /** Glisser sur le champ (nombre ou vide) règle la valeur ; un simple clic met le curseur pour taper. */
  const scrub = (e: React.PointerEvent<HTMLElement>) => {
    if (focused || (parsed.kind !== "number" && draft !== "")) return;
    const n0 = parsed.kind === "number" ? parsed.n : 0;
    const u = parsed.kind === "number" ? parsed.unit || (parsed.n === 0 ? defaultUnit : "") : defaultUnit;
    startDragValue(e, { from: n0, step: u === "rem" || u === "em" ? 0.05 : u === "%" || u === "vw" || u === "vh" ? 0.5 : 1, onChange: (n) => onChange(`${n}${u}`) });
  };
  const tokens = tokenGroup ? tokenOptions(site, tokenGroup) : [];

  if (parsed.kind === "token" && !editingToken) {
    const resolved = tokenValue(site, parsed.token);
    return (
      <div className={cx(FIELD, "flex items-center gap-1 pl-1.5 pr-0.5 cursor-text", className)} title={`Valeur du thème ${parsed.token}${resolved ? ` = ${resolved}` : ""}. Cliquer pour saisir une autre valeur.`} onClick={() => { setEditingToken(true); setDraft(""); }}>
        <Diamond size={11} className="text-accent shrink-0" aria-hidden />
        <span className="flex-1 min-w-0 truncate text-xs font-mono">{parsed.token.split(".").slice(1).join(".")}<span className="text-dim"> · {resolved}</span></span>
        <button type="button" aria-label="Remplacer par une valeur libre" title="Saisir une valeur" onClick={(e) => { e.stopPropagation(); setEditingToken(true); setDraft(""); }} className="w-5 h-5 inline-flex items-center justify-center rounded-xs text-dim hover:text-ink hover:bg-hover"><X size={11} /></button>
      </div>
    );
  }
  return (
    <div className={cx(FIELD, "flex items-center", className)}>
      <input
        type="text"
        inputMode="decimal"
        value={draft}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onPointerDown={scrub}
        title={focused ? undefined : "Glisser horizontalement pour ajuster (Maj : dix fois plus vite), cliquer pour saisir"}
        autoFocus={editingToken}
        onBlur={() => { setFocused(false); commit(); if (editingToken && !draft.trim()) setEditingToken(false); }}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { commit(); (e.target as HTMLInputElement).blur(); }
          if (e.key === "Escape") { setDraft(text); (e.target as HTMLInputElement).blur(); }
          if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); step(e.key === "ArrowUp" ? 1 : -1, e.shiftKey); }
        }}
        className={cx("min-w-0 flex-1 h-full bg-transparent pl-2 pr-1 text-xs font-mono tabular-nums placeholder:text-dim focus:outline-none", !focused && (parsed.kind === "number" || draft === "") && "cursor-ew-resize", muted && !focused && "text-muted", compact && "pl-1.5")}
      />
      {parsed.kind === "number" || draft === "" ? (
        <select
          aria-label="Unité"
          value={unit}
          onChange={(e) => { const u = e.target.value; const n = parsed.kind === "number" ? parsed.n : Number(draft) || 0; onChange(`${n}${u}`); }}
          className="h-full bg-transparent text-2xs text-dim pr-0.5 focus:outline-none cursor-ew-resize appearance-none text-right w-[30px]"
          title="Unité. Pour ajuster la valeur à la souris, glisser sur le libellé de la propriété (ou Alt + glisser ici)."
        >
          <option value="">—</option>
          {LENGTH_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      ) : null}
      {tokens.length ? (
        <select aria-label="Valeurs du thème" value="" onChange={(e) => { if (e.target.value) onChange({ token: e.target.value }); }} className="h-full w-5 bg-transparent text-dim appearance-none text-center text-[10px] focus:outline-none hover:text-accent cursor-pointer" title="Utiliser une valeur du thème (réglée dans l'onglet Thème, réutilisée partout)">
          <option value="">◇</option>
          {tokens.map((t) => <option key={t.token} value={t.token}>{t.label} · {t.value}</option>)}
        </select>
      ) : null}
    </div>
  );
}
