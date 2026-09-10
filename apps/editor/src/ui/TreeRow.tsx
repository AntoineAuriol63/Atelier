"use client";

import { useState, type DragEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cx } from "./cx";

export type DropIndicator = "before" | "after" | "inside" | null;
/** Refus de dépôt : indicateur rouge et raison en infobulle. */
export type DropRefusal = string | null;

export function TreeRow({ id, depth, label, meta, icon: Icon, selected, open, hasChildren, onToggle, onSelect, dimmed, editing, onRename, onEditStart, drop, refusal, draggable, trailing, onDragStart, onDragOver, onDragLeave, onDrop }: {
  id: string; depth: number; label: string; meta?: string; icon: LucideIcon; selected: boolean; open: boolean; hasChildren: boolean;
  onToggle: () => void; onSelect: () => void; dimmed?: boolean;
  editing?: boolean; onRename?: (name: string | null) => void; onEditStart?: () => void;
  drop?: DropIndicator; refusal?: DropRefusal; draggable?: boolean; trailing?: React.ReactNode;
  onDragStart?: (e: DragEvent) => void; onDragOver?: (e: DragEvent) => void; onDragLeave?: (e: DragEvent) => void; onDrop?: (e: DragEvent) => void;
}) {
  const [draft, setDraft] = useState(label);
  return (
    <div
      role="treeitem"
      data-row-id={id}
      title={drop && refusal ? refusal : undefined}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      aria-expanded={hasChildren ? open : undefined}
      onClick={onSelect}
      onDoubleClick={onEditStart}
      draggable={draggable && !editing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cx(
        "relative group flex items-center h-[26px] pr-2 text-sm select-none cursor-default focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2",
        selected ? "bg-accent-soft text-ink" : "hover:bg-hover text-ink",
        dimmed && "opacity-60",
        drop === "inside" && (refusal ? "shadow-[inset_0_0_0_1.5px_var(--color-danger)]" : "shadow-[inset_0_0_0_1.5px_var(--color-accent)]"),
      )}
      style={{ paddingLeft: 4 + depth * 14 }}
    >
      {drop === "before" || drop === "after" ? (
        <span aria-hidden className={cx("absolute left-0 right-0 h-0.5 pointer-events-none", refusal ? "bg-danger" : "bg-accent", drop === "before" ? "top-0" : "bottom-0")} style={{ left: 4 + depth * 14 }} />
      ) : null}
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
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => { if (e.key === "Enter") onRename?.(draft.trim() || null); if (e.key === "Escape") onRename?.(undefined as unknown as null); e.stopPropagation(); }}
          onBlur={() => onRename?.(draft.trim() || null)}
          className="flex-1 min-w-0 h-5 px-1 rounded-xs bg-surface border border-accent text-sm text-ink"
        />
      ) : (
        <span className="truncate">{label}</span>
      )}
      {meta && !editing ? <span className="ml-auto pl-2 text-2xs text-dim font-mono truncate max-w-[40%]">{meta}</span> : null}
      {trailing}
    </div>
  );
}
