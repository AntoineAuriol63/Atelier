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

/** Intitulé en capitales espacées (le seul du système : même taille, même interlettrage partout). */
export function Eyebrow({ children, className, as: Tag = "span", title }: { children: ReactNode; className?: string; as?: "span" | "div" | "h2" | "h3" | "h4"; title?: string }) {
  return <Tag className={cx("m-0 text-2xs uppercase tracking-[0.12em] text-dim font-medium", className)} title={title}>{children}</Tag>;
}

/** En-tête de panneau ou de zone : titre en capitales espacées. */
export function PanelHeading({ children, actions, className, as: Tag = "h2" }: { children: ReactNode; actions?: ReactNode; className?: string; /** Niveau de titre : la structure du document suit les zones de l'éditeur. */ as?: "h2" | "h3" | "span" }) {
  return (
    <div className={cx("flex items-center justify-between px-3 h-9 shrink-0 border-b border-line", className)}>
      <Eyebrow as={Tag}>{children}</Eyebrow>
      {actions}
    </div>
  );
}

// L'ouverture d'une section est mémorisée par titre (et gardée d'une session à l'autre) : elle survit aux changements de sélection.
const openState = new Map<string, boolean>();
const OPEN_KEY = "atelier:sections";
try { const saved = JSON.parse(localStorage.getItem(OPEN_KEY) ?? "{}") as Record<string, boolean>; Object.entries(saved).forEach(([k, v]) => openState.set(k, v)); } catch { /* pas de stockage */ }
function remember(title: string, open: boolean) {
  openState.set(title, open);
  try { localStorage.setItem(OPEN_KEY, JSON.stringify(Object.fromEntries(openState))); } catch { /* pas de stockage */ }
}

/** Section repliable d'un panneau. `defaultOpen` ne sert qu'à la première rencontre : ensuite, la section garde l'état où on l'a laissée. */
export function Section({ title, children, defaultOpen = true, actions, className, hint, forceOpen }: { title: string; children: ReactNode; defaultOpen?: boolean; actions?: ReactNode; className?: string; hint?: string; forceOpen?: number }) {
  const [open, setOpenState] = useState(() => openState.get(title) ?? defaultOpen);
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => setOpenState((o) => { const next = typeof v === "function" ? v(o) : v; remember(title, next); return next; });
  const [prevForce, setPrevForce] = useState(forceOpen);
  if (forceOpen !== prevForce) { setPrevForce(forceOpen); if (forceOpen) setOpen(true); }
  useEffect(() => {
    const onReveal = (e: Event) => { if ((e as CustomEvent<string>).detail === title) setOpenState(() => { remember(title, true); return true; }); };
    window.addEventListener("atelier:reveal-section", onReveal);
    return () => window.removeEventListener("atelier:reveal-section", onReveal);
  }, [title]);
  return (
    <section className={cx("border-b border-line", className)} data-section={title}>
      <div className="flex items-center h-9 pr-2 bg-panel">
        <h3 className="contents m-0 text-xs font-medium"><button type="button" onClick={() => setOpen((o) => !o)} className="flex-1 flex items-center gap-2 h-full pl-3 text-xs font-medium text-ink hover:bg-hover/80 rounded-sm" aria-expanded={open}>
          <ChevronRight size={12} className={cx("text-dim transition-transform", open && "rotate-90")} aria-hidden />
          {title}
          {hint ? <Tooltip text={hint}><span className="inline-flex" tabIndex={-1}><Info size={11} className="text-dim ml-0.5" aria-hidden /></span></Tooltip> : null}
        </button></h3>
        {actions}
      </div>
      {open ? <div className="px-3 pb-4 pt-1 flex flex-col gap-2.5">{hint ? <p className="text-xs text-dim leading-snug -mt-1">{hint}</p> : null}{children}</div> : null}
    </section>
  );
}
