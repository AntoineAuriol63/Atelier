"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./cx";

// Pile des dialogues ouverts : Échap ne ferme que celui du dessus, quel que soit l'ordre d'enregistrement des écouteurs.
const stack: symbol[] = [];

/** Boîte de dialogue modale de l'éditeur : Échap ou clic sur le voile pour fermer. */
export function Dialog({ open, onClose, title, children, actions, footer, width = 760, className }: { open: boolean; onClose: () => void; title: string; children: ReactNode; /** Actions secondaires, dans l'en-tête. */ actions?: ReactNode; /** Pied du dialogue : l'action principale y va, à droite. */ footer?: ReactNode; width?: number; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const me = Symbol("dialog");
    stack.push(me);
    // Le focus entre dans le dialogue, y tourne (Tab), et revient d'où il venait à la fermeture.
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () => [...(box.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
    window.setTimeout(() => { const f = focusables(); (f.find((el) => el.autofocus) ?? f[0] ?? box.current)?.focus(); }, 0);
    const onKey = (e: KeyboardEvent) => {
      // Seul le dialogue le plus récent traite Échap : les autres écouteurs (dialogues en dessous) ne le voient pas.
      if (e.key === "Escape") { if (stack[stack.length - 1] !== me) return; e.stopImmediatePropagation(); onClose(); return; }
      if (e.key === "Tab") { const f = focusables(); if (!f.length) return; const i = f.indexOf(document.activeElement as HTMLElement); if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1]!.focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]!.focus(); } }
    };
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("keydown", onKey, true); const i = stack.indexOf(me); if (i >= 0) stack.splice(i, 1); previous?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} data-atelier-ui>
      <div ref={box} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={cx("bg-panel border border-line-strong rounded-md shadow-2xl flex flex-col min-h-0 ring-1 ring-black/40", className)} style={{ width, maxWidth: "100%", maxHeight: "min(90vh, 900px)" }}>
        <header className="flex items-center gap-2 min-h-11 px-4 border-b border-line shrink-0">
          <span className="text-base font-semibold text-ink flex-1 truncate">{title}</span>
          {actions}
          <IconButton label="Fermer (Échap)" icon={X} size="sm" onClick={onClose} />
        </header>
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
        {footer ? <footer className="flex items-center justify-end gap-2 px-4 min-h-14 border-t border-line shrink-0">{footer}</footer> : null}
      </div>
    </div>
  );
}
