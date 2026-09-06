"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cx } from "./cx";

export function TreeRow({ depth, label, meta, icon: Icon, selected, open, hasChildren, onToggle, onSelect, onDoubleClick, dimmed }: {
  depth: number; label: string; meta?: string; icon: LucideIcon; selected: boolean; open: boolean; hasChildren: boolean;
  onToggle: () => void; onSelect: () => void; onDoubleClick?: () => void; dimmed?: boolean;
}) {
  return (
    <div
      role="treeitem"
      aria-selected={selected}
      aria-expanded={hasChildren ? open : undefined}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      className={cx("group flex items-center h-[26px] pr-2 text-sm select-none cursor-default", selected ? "bg-accent-soft text-ink" : "hover:bg-hover text-ink", dimmed && "opacity-60")}
      style={{ paddingLeft: 4 + depth * 14 }}
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={cx("w-4 h-4 mr-0.5 inline-flex items-center justify-center rounded-xs text-dim hover:text-ink", !hasChildren && "invisible")}
        aria-label={open ? "Replier" : "Déplier"}
      >
        <ChevronRight size={11} className={cx("transition-transform", open && "rotate-90")} aria-hidden />
      </button>
      <Icon size={13} strokeWidth={1.75} className={cx("mr-1.5 shrink-0", selected ? "text-accent" : "text-muted")} aria-hidden />
      <span className="truncate">{label}</span>
      {meta ? <span className="ml-auto pl-2 text-2xs text-dim font-mono truncate max-w-[40%]">{meta}</span> : null}
    </div>
  );
}
