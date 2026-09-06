"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./cx";

/** Colonne latérale. */
export function Panel({ children, side, className }: { children: ReactNode; side: "left" | "right"; className?: string }) {
  return (
    <aside className={cx("flex flex-col min-h-0 bg-panel", side === "left" ? "border-r border-line" : "border-l border-line", className)}>
      {children}
    </aside>
  );
}

/** En-tête de panneau ou de zone : titre en capitales espacées. */
export function PanelHeading({ children, actions, className }: { children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <div className={cx("flex items-center justify-between px-3 h-8 shrink-0", className)}>
      <span className="text-2xs uppercase tracking-[0.12em] text-dim font-medium">{children}</span>
      {actions}
    </div>
  );
}

/** Section repliable d'un panneau. */
export function Section({ title, children, defaultOpen = true, actions, className }: { title: string; children: ReactNode; defaultOpen?: boolean; actions?: ReactNode; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={cx("border-b border-line", className)}>
      <div className="flex items-center h-8 pr-2">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex-1 flex items-center gap-1.5 h-full pl-2 text-xs font-medium text-ink hover:bg-hover/60" aria-expanded={open}>
          <ChevronRight size={12} className={cx("text-dim transition-transform", open && "rotate-90")} aria-hidden />
          {title}
        </button>
        {actions}
      </div>
      {open ? <div className="px-3 pb-3 flex flex-col gap-2">{children}</div> : null}
    </section>
  );
}
