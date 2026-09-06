import type { Op, Site } from "./types";
import { applyOp, invertOp } from "./ops";

/**
 * Historique d'annulation. Pur : chaque fonction retourne un nouvel historique.
 * Les opérations enregistrées portent leur `prev`, donc s'inversent sans relire l'état.
 */
export type HistoryEntry = {
  op: Op;
  label?: string;
  at: number;
  /** Deux commits consécutifs avec la même clé, dans la fenêtre, fusionnent en une seule entrée. */
  coalesceKey?: string;
};

export type History = { undo: HistoryEntry[]; redo: HistoryEntry[]; limit: number };

export type CommitOptions = { label?: string; coalesceKey?: string; now?: number; coalesceWindowMs?: number };

export function createHistory(limit = 200): History {
  return { undo: [], redo: [], limit };
}

function canCoalesce(last: HistoryEntry | undefined, op: Op, opts: CommitOptions): boolean {
  if (!last || !opts.coalesceKey || last.coalesceKey !== opts.coalesceKey) return false;
  const now = opts.now ?? Date.now();
  if (now - last.at > (opts.coalesceWindowMs ?? 1000)) return false;
  return last.op.op === "node.set" && op.op === "node.set" && last.op.id === op.id && last.op.path === op.path
    || last.op.op === "site.set" && op.op === "site.set" && last.op.path === op.path;
}

/** Applique une opération, l'enregistre, vide la pile de rétablissement. */
export function commit(site: Site, history: History, op: Op, opts: CommitOptions = {}): { site: Site; history: History; applied: Op } {
  const r = applyOp(site, op);
  const now = opts.now ?? Date.now();
  const last = history.undo[history.undo.length - 1];
  let undo: HistoryEntry[];
  if (canCoalesce(last, r.op, opts)) {
    // On garde le `prev` de la première frappe et la valeur de la dernière.
    const merged: Op = r.op.op === "node.set" && last!.op.op === "node.set"
      ? { ...r.op, prev: last!.op.prev }
      : r.op.op === "site.set" && last!.op.op === "site.set" ? { ...r.op, prev: last!.op.prev } : r.op;
    undo = [...history.undo.slice(0, -1), { ...last!, op: merged, at: now }];
  } else {
    undo = [...history.undo, { op: r.op, label: opts.label, at: now, coalesceKey: opts.coalesceKey }];
    if (undo.length > history.limit) undo = undo.slice(undo.length - history.limit);
  }
  return { site: r.site, history: { ...history, undo, redo: [] }, applied: r.op };
}

/** Annule la dernière entrée. Retourne l'opération réellement appliquée (l'inverse), à journaliser. */
export function undo(site: Site, history: History): { site: Site; history: History; applied: Op } | null {
  const entry = history.undo[history.undo.length - 1];
  if (!entry) return null;
  const r = applyOp(site, invertOp(entry.op));
  return {
    site: r.site,
    history: { ...history, undo: history.undo.slice(0, -1), redo: [...history.redo, entry] },
    applied: r.op,
  };
}

/** Rétablit la dernière entrée annulée. */
export function redo(site: Site, history: History): { site: Site; history: History; applied: Op } | null {
  const entry = history.redo[history.redo.length - 1];
  if (!entry) return null;
  const r = applyOp(site, entry.op);
  return {
    site: r.site,
    history: { ...history, redo: history.redo.slice(0, -1), undo: [...history.undo, { ...entry, op: r.op }] },
    applied: r.op,
  };
}

export function canUndo(h: History): boolean { return h.undo.length > 0; }
export function canRedo(h: History): boolean { return h.redo.length > 0; }
