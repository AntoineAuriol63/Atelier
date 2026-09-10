"use client";

import { createElement, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";
import { Kbd } from "@/ui";
import { cx } from "@/ui/cx";

export type Command = { id: string; label: string; group: string; icon?: LucideIcon; keys?: string; run: () => void; keywords?: string };

function score(cmd: Command, q: string): number {
  if (!q) return 1;
  const hay = `${cmd.label} ${cmd.group} ${cmd.keywords ?? ""}`.toLowerCase();
  const i = hay.indexOf(q);
  if (i < 0) {
    // toutes les lettres dans l'ordre
    let j = 0; for (const ch of hay) if (ch === q[j]) j++;
    return j === q.length ? 0.2 : 0;
  }
  return i === 0 ? 3 : cmd.label.toLowerCase().startsWith(q) ? 2.5 : 1;
}

/** Palette de commandes (⌘K) : toute action de l'éditeur, par son nom, quel que soit le mode. */
export function CommandPalette({ open, onClose, commands }: { open: boolean; onClose: () => void; commands: Command[] }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return commands.map((c) => ({ c, s: score(c, needle) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 40).map((x) => x.c);
  }, [commands, q]);
  // Monté uniquement quand elle est ouverte : l'état repart de zéro à chaque ouverture.
  useEffect(() => { input.current?.focus(); }, []);
  if (!open) return null;
  const run = (c: Command) => { onClose(); c.run(); };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-black/50" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Palette de commandes" className="w-[560px] max-w-[92vw] rounded-md bg-panel border border-line-strong shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-3 h-11 border-b border-line">
          <Search size={15} className="text-dim" />
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); setCursor(0); }}
            placeholder="Que voulez-vous faire ? Ajouter un titre, aller à Contact, passer en sombre…"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-dim"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(list.length - 1, c + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
              if (e.key === "Enter" && list[cursor]) { e.preventDefault(); run(list[cursor]!); }
              if (e.key === "Escape") onClose();
            }}
          />
          <Kbd>Échap</Kbd>
        </div>
        <ul role="listbox" className="max-h-[50vh] overflow-auto py-1">
          {list.length === 0 ? <li className="px-3 py-4 text-sm text-dim">Aucune commande ne correspond.</li> : null}
          {list.map((c, i) => {
            const prevGroup = list[i - 1]?.group;
            return (
              <li key={c.id}>
                {c.group !== prevGroup ? <div className="px-3 pt-2 pb-1 text-2xs uppercase tracking-[0.12em] text-dim">{c.group}</div> : null}
                <button type="button" role="option" aria-selected={i === cursor} onMouseEnter={() => setCursor(i)} onClick={() => run(c)} className={cx("w-full flex items-center gap-2 px-3 h-8 text-sm text-left", i === cursor ? "bg-accent-soft text-ink" : "text-ink hover:bg-hover")}>
                  {c.icon ? createElement(c.icon, { size: 14, className: "text-muted shrink-0", "aria-hidden": true }) : <span className="w-3.5" />}
                  <span className="flex-1 truncate">{c.label}</span>
                  {c.keys ? <Kbd>{c.keys}</Kbd> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
