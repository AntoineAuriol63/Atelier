"use client";

import { useState } from "react";
import { Link2, Unlink2 } from "lucide-react";
import type { ResolvedValue, Site, StyleValue } from "@atelier/model";
import { parseInput, shortLabel, tokenValue } from "@/lib/css-value";
import { cx } from "../cx";
import { startDragValue, stepFor } from "./useDragValue";

const SIDES = ["Top", "Right", "Bottom", "Left"] as const;
type Side = (typeof SIDES)[number];

const SOURCE_TEXT: Record<string, string> = { local: "text-ink", inherited: "text-warning", shared: "text-violet-400", default: "text-dim" };

function Cell({ value, site, onCommit, title, className }: { value: ResolvedValue | undefined; site: Site; onCommit: (v: StyleValue | undefined, coalesce?: boolean) => void; title: string; className?: string }) {
  // Une valeur du thème (ex. space.12) s'affiche par ce qu'elle vaut (6rem), jamais par son nom, pour ne pas la confondre avec des pixels.
  const raw = value?.value;
  const isToken = typeof raw === "object" && raw !== null && "token" in raw;
  const text = isToken ? (tokenValue(site, (raw as { token: string }).token) ?? "") : (shortLabel(raw, site).split(" · ")[0] ?? "");
  const [draft, setDraft] = useState(text);
  const [prev, setPrev] = useState(text);
  const [focused, setFocused] = useState(false);
  if (text !== prev) { setPrev(text); if (!focused) setDraft(text); }
  const tone = value ? SOURCE_TEXT[value.source.kind] : "text-dim";
  return (
    <input
      type="text"
      inputMode="decimal"
      value={draft}
      placeholder="0"
      title={isToken ? `${title} · valeur du thème ${(raw as { token: string }).token} = ${text}` : title}
      aria-label={title}
      onFocus={() => setFocused(true)}
      onPointerDown={(e) => {
        if (focused) return;
        const m = text.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
        if (text && !m) return; // auto, mot-clé : rien à glisser
        const from = m ? Number(m[1]) : 0, unit = m ? m[2] || "px" : "px";
        startDragValue(e, { from, step: stepFor(unit), onChange: (n) => onCommit(`${n}${unit}`, true) });
      }}
      onBlur={() => { setFocused(false); onCommit(parseInput(draft, "px", ["auto"])); }}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") { setDraft(text); (e.target as HTMLInputElement).blur(); } }}
      className={cx("w-12 h-5 text-center text-[11px] font-mono tabular-nums bg-transparent rounded-xs border border-transparent hover:border-line-strong focus:border-accent focus:bg-surface focus:outline-none", !focused && "cursor-ew-resize", tone, isToken && "underline decoration-dotted underline-offset-2", className)}
    />
  );
}

function LinkToggle({ linked, onToggle, what }: { linked: boolean; onToggle: () => void; what: string }) {
  return (
    <button type="button" onClick={onToggle} aria-label={`Lier les quatre ${what}`} title={linked ? `${what} liés : une valeur pour les quatre côtés` : `Lier les quatre ${what} (une seule valeur pour tous les côtés)`} className={cx("w-4 h-4 inline-flex items-center justify-center rounded-xs", linked ? "text-accent" : "text-dim hover:text-ink")}>
      {linked ? <Link2 size={11} /> : <Unlink2 size={11} />}
    </button>
  );
}

/** Schéma de la boîte : marges à l'extérieur, remplissage à l'intérieur, une case par côté. */
export function BoxModel({ site, get, set }: { site: Site; get: (prop: string) => ResolvedValue | undefined; set: (prop: string, v: StyleValue | undefined, coalesce?: boolean) => void }) {
  const [linked, setLinked] = useState<{ margin: boolean; padding: boolean }>({ margin: false, padding: false });
  const commit = (kind: "margin" | "padding", side: Side) => (v: StyleValue | undefined, coalesce?: boolean) => {
    if (linked[kind]) SIDES.forEach((s) => set(`${kind}${s}`, v, coalesce));
    else set(`${kind}${side}`, v, coalesce);
  };
  const toggle = (kind: "margin" | "padding") => setLinked((l) => ({ ...l, [kind]: !l[kind] }));
  return (
    <div className="relative rounded-sm border border-dashed border-line-strong px-2 pt-4 pb-2" style={{ background: "repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,.02) 6px 7px)" }}>
      <span className="absolute top-1 left-2 text-2xs uppercase tracking-wider text-dim">Marge</span>
      <div className="absolute top-0.5 right-1"><LinkToggle linked={linked.margin} onToggle={() => toggle("margin")} what="marges" /></div>
      <div className="grid grid-cols-[44px_1fr_44px] grid-rows-[20px_1fr_20px] items-center justify-items-center gap-y-1">
        <div /><Cell site={site} value={get("marginTop")} onCommit={commit("margin", "Top")} title="Marge haute" /><div />
        <Cell site={site} value={get("marginLeft")} onCommit={commit("margin", "Left")} title="Marge gauche" />
        <div className="relative w-full rounded-sm border border-line-strong bg-surface px-2 pt-4 pb-2">
          <span className="absolute top-1 left-2 text-2xs uppercase tracking-wider text-dim">Remplissage</span>
          <div className="absolute top-0.5 right-1"><LinkToggle linked={linked.padding} onToggle={() => toggle("padding")} what="remplissages" /></div>
          <div className="grid grid-cols-[44px_1fr_44px] grid-rows-[20px_28px_20px] items-center justify-items-center gap-y-1">
            <div /><Cell site={site} value={get("paddingTop")} onCommit={commit("padding", "Top")} title="Remplissage haut" /><div />
            <Cell site={site} value={get("paddingLeft")} onCommit={commit("padding", "Left")} title="Remplissage gauche" />
            <div className="w-full h-full min-h-6 rounded-xs bg-accent-soft border border-accent/30" />
            <Cell site={site} value={get("paddingRight")} onCommit={commit("padding", "Right")} title="Remplissage droit" />
            <div /><Cell site={site} value={get("paddingBottom")} onCommit={commit("padding", "Bottom")} title="Remplissage bas" /><div />
          </div>
        </div>
        <Cell site={site} value={get("marginRight")} onCommit={commit("margin", "Right")} title="Marge droite" />
        <div /><Cell site={site} value={get("marginBottom")} onCommit={commit("margin", "Bottom")} title="Marge basse" /><div />
      </div>
    </div>
  );
}
