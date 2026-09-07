"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronRight, Info } from "lucide-react";
import { Tooltip } from "./Tooltip";
import { cx } from "./cx";

/** Colonne latérale. */
export function Panel({ children, side, className }: { children: ReactNode; side: "left" | "right"; className?: string }) {
  return (
    <aside className={cx("flex flex-col min-h-0 min-w-0 overflow-x-hidden bg-panel", side === "left" ? "border-r border-line" : "border-l border-line", className)}>
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
export function Section({ title, children, defaultOpen = true, actions, className, hint, forceOpen }: { title: string; children: ReactNode; defaultOpen?: boolean; actions?: ReactNode; className?: string; hint?: string; forceOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const [prevForce, setPrevForce] = useState(forceOpen);
  if (forceOpen !== prevForce) { setPrevForce(forceOpen); if (forceOpen) setOpen(true); }
  useEffect(() => {
    const onReveal = (e: Event) => { if ((e as CustomEvent<string>).detail === title) setOpen(true); };
    window.addEventListener("atelier:reveal-section", onReveal);
    return () => window.removeEventListener("atelier:reveal-section", onReveal);
  }, [title]);
  return (
    <section className={cx("border-b border-line", className)} data-section={title}>
      <div className="flex items-center h-8 pr-2">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex-1 flex items-center gap-1.5 h-full pl-2 text-xs font-medium text-ink hover:bg-hover/60" aria-expanded={open}>
          <ChevronRight size={12} className={cx("text-dim transition-transform", open && "rotate-90")} aria-hidden />
          {title}
          {hint ? <Tooltip text={hint}><span className="inline-flex" tabIndex={-1}><Info size={11} className="text-dim ml-0.5" aria-hidden /></span></Tooltip> : null}
        </button>
        {actions}
      </div>
      {open ? <div className="px-3 pb-3 flex flex-col gap-2">{hint ? <p className="text-xs text-dim leading-snug -mt-1">{hint}</p> : null}{children}</div> : null}
    </section>
  );
}
