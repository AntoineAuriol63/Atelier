"use client";

import { useEffect, useRef, useState } from "react";
import { Diamond, X } from "lucide-react";
import type { Site, StyleValue } from "@atelier/model";
import { tokenOptions, tokenValue } from "@/lib/css-value";
import { cx } from "../cx";

const FIELD = "h-7 rounded-sm bg-surface text-ink border border-line hover:border-line-strong focus-within:border-accent";

function toHex(css: string | undefined): string {
  if (!css) return "#000000";
  const m = css.trim().match(/^#([0-9a-f]{3,8})$/i);
  if (!m) return "#000000";
  const h = m[1]!;
  if (h.length === 3 || h.length === 4) return "#" + h.slice(0, 3).split("").map((c) => c + c).join("");
  return "#" + h.slice(0, 6);
}

/**
 * Couleur : pastille cliquable (sélecteur natif), champ texte libre (hex, rgb, nom, transparent),
 * et jetons de couleur du thème avec leur valeur dans chaque mode.
 */
export function ColorInput({ value, onChange, site, className, placeholder = "aucune", mode }: { value: StyleValue | undefined; onChange: (v: StyleValue | undefined) => void; site: Site; className?: string; placeholder?: string; mode?: string }) {
  const token = typeof value === "object" && value && "token" in value ? value.token : undefined;
  const text = token ? "" : typeof value === "string" ? value : "";
  const resolved = token ? tokenValue(site, token) : text;
  const [draft, setDraft] = useState(text);
  const [prev, setPrev] = useState(text);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  if (text !== prev) { setPrev(text); if (!focused) setDraft(text); }
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const commit = () => { const t = draft.trim(); const v = t ? t : undefined; if (v !== value) onChange(v); };
  const tokens = tokenOptions(site, "color");
  const currentMode = mode ?? site.theme.defaultMode;
  const modeValue = (t: string) => {
    const [g, n] = t.split(".") as ["color", string];
    const raw = site.theme.tokens[g]?.[n];
    return typeof raw === "string" ? raw : raw?.[currentMode] ?? Object.values(raw ?? {})[0] ?? "";
  };

  return (
    <div ref={root} className={cx("relative", className)}>
      <div className={cx(FIELD, "flex items-center gap-1 pl-1 pr-0.5")}>
        <label className="relative w-5 h-5 shrink-0 rounded-xs border border-line-strong overflow-hidden cursor-pointer" title="Choisir une couleur" style={{ background: resolved && resolved !== "transparent" ? resolved : "repeating-conic-gradient(#666 0 25%, #999 0 50%) 0 0 / 8px 8px" }}>
          <input type="color" value={toHex(resolved)} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" aria-label="Sélecteur de couleur" />
        </label>
        {token ? (
          <>
            <Diamond size={11} className="text-accent shrink-0" aria-hidden />
            <span className="flex-1 min-w-0 truncate text-xs font-mono" title={`Valeur du thème ${token} = ${resolved}`}>{token.split(".").slice(1).join(".")}</span>
            <button type="button" aria-label="Remplacer par une valeur libre" onClick={() => { onChange(resolved || undefined); }} className="w-5 h-5 inline-flex items-center justify-center rounded-xs text-dim hover:text-ink hover:bg-hover"><X size={11} /></button>
          </>
        ) : (
          <input
            type="text"
            value={draft}
            placeholder={placeholder}
            spellCheck={false}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); commit(); }}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { commit(); (e.target as HTMLInputElement).blur(); } if (e.key === "Escape") { setDraft(text); (e.target as HTMLInputElement).blur(); } }}
            className="min-w-0 flex-1 h-full bg-transparent px-1 text-xs font-mono placeholder:text-dim focus:outline-none"
          />
        )}
        <button type="button" onClick={() => setOpen((o) => !o)} title="Couleurs du thème" aria-label="Couleurs du thème" aria-expanded={open} className={cx("w-5 h-5 inline-flex items-center justify-center rounded-xs hover:bg-hover", open ? "text-accent" : "text-dim hover:text-accent")}>
          <Diamond size={11} />
        </button>
      </div>
      {open ? (
        <div role="listbox" className="absolute z-20 right-0 top-8 w-56 max-h-64 overflow-auto rounded-sm bg-raised border border-line-strong shadow-xl py-1">
          {tokens.map((t) => (
            <button key={t.token} type="button" role="option" aria-selected={t.token === token} onClick={() => { onChange({ token: t.token }); setOpen(false); }} className={cx("w-full flex items-center gap-2 px-2 h-7 text-xs text-left hover:bg-hover", t.token === token && "bg-accent-soft")}>
              <span className="w-4 h-4 rounded-xs border border-line-strong shrink-0" style={{ background: modeValue(t.token) }} />
              <span className="flex-1 truncate">{t.label}</span>
              <span className="font-mono text-2xs text-dim">{modeValue(t.token)}</span>
            </button>
          ))}
          {value !== undefined ? <button type="button" onClick={() => { onChange(undefined); setOpen(false); }} className="w-full px-2 h-7 text-xs text-left text-muted hover:bg-hover border-t border-line mt-1">Retirer la couleur</button> : null}
        </div>
      ) : null}
    </div>
  );
}
