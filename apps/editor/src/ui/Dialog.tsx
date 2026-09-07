"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./cx";

/** Boîte de dialogue modale de l'éditeur : Échap ou clic sur le voile pour fermer. */
export function Dialog({ open, onClose, title, children, actions, width = 760, className }: { open: boolean; onClose: () => void; title: string; children: ReactNode; actions?: ReactNode; width?: number; className?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} data-atelier-ui>
      <div role="dialog" aria-modal="true" aria-label={title} className={cx("bg-panel border border-line-strong rounded-md shadow-2xl flex flex-col min-h-0", className)} style={{ width, maxWidth: "100%", maxHeight: "85vh" }}>
        <header className="flex items-center gap-2 h-10 px-3 border-b border-line shrink-0">
          <span className="text-sm font-medium text-ink flex-1 truncate">{title}</span>
          {actions}
          <IconButton label="Fermer (Échap)" icon={X} size="sm" onClick={onClose} />
        </header>
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
