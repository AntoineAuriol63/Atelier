"use client";

import { isDraggingValue } from "@/ui/controls/useDragValue";

import { useMemo } from "react";
import type { CommitOptions, Node, Op, ResolvedStyle, ResolvedValue, Site, StyleSource, StyleValue } from "@atelier/model";
import { BASE, resolveNodeStyle, resolveSharedStyle, sharedStylePath, stylePath } from "@atelier/model";
import { sourceLabel } from "@/ui/controls";

/** Ce que les panneaux modifient : un nœud, ou un style partagé édité seul. */
export type StyleTarget = { kind: "node"; node: Node } | { kind: "shared"; id: string };

export type StyleApi = {
  resolved: ResolvedStyle;
  get: (prop: string) => ResolvedValue | undefined;
  value: (prop: string) => StyleValue | undefined;
  source: (prop: string) => StyleSource | undefined;
  /** Pose la propriété au point de rupture actif (et à l'état actif). `undefined` retire la surcharge locale. */
  set: (prop: string, v: StyleValue | undefined, coalesce?: boolean, coalesceWindowMs?: number) => void;
  reset: (prop: string) => void;
  /** Fait varier une valeur numérique (glissement sur le libellé). */
  scrub: (prop: string, defaultUnit?: string) => (delta: number, big: boolean) => void;
  title: (prop: string) => string;
  bp: string;
  state?: string;
  target: StyleTarget;
  bpName: (id: string) => string;
};

export const STATE_LABEL: Record<string, string> = { hover: "Survol", active: "Actif", focus: "Focus", current: "Page courante", open: "Ouvert" };

export function useStyle(site: Site, target: StyleTarget, bp: string, state: string | undefined, commit: (op: Op, opts?: CommitOptions) => void): StyleApi {
  return useMemo(() => {
    const bpName = (id: string) => (id === BASE ? "Base" : site.settings.breakpoints.find((b) => b.id === id)?.name ?? id);
    const styleName = (id: string) => site.sharedStyles.find((s) => s.id === id)?.name ?? id;
    const resolved = target.kind === "node" ? resolveNodeStyle(site, target.node, bp, state) : resolveSharedStyle(site, target.id, bp, state);
    const where = `${bpName(bp)}${state ? ` · ${STATE_LABEL[state] ?? state}` : ""}`;
    const set = (prop: string, v: StyleValue | undefined, coalesce = true, coalesceWindowMs: number | undefined = isDraggingValue() ? 120_000 : undefined) => {
      const key = target.kind === "node" ? target.node.id : `shared:${target.id}`;
      const opts: CommitOptions = { coalesceKey: coalesce ? `style:${key}:${bp}:${state ?? ""}:${prop}` : undefined, label: `${prop} (${where})`, coalesceWindowMs };
      if (target.kind === "node") commit({ op: "node.set", id: target.node.id, path: stylePath(bp, prop, state), value: v }, opts);
      else { const path = sharedStylePath(site, target.id, bp, prop, state); if (path) commit({ op: "site.set", path, value: v }, opts); }
    };
    return {
      resolved, bp, state, target, bpName,
      get: (p) => resolved[p],
      value: (p) => resolved[p]?.value,
      source: (p) => resolved[p]?.source,
      set,
      reset: (p) => set(p, undefined, false),
      scrub: (p, defaultUnit = "px") => {
        // Valeur de départ figée au début du glissement ; une valeur du thème est d'abord résolue (ex. space.10 → 4rem).
        let cur: StyleValue | undefined = resolved[p]?.value;
        if (typeof cur === "object" && cur && "token" in cur) {
          const [g, n] = cur.token.split(".") as [keyof Site["theme"]["tokens"], string];
          const raw = site.theme.tokens[g]?.[n];
          cur = typeof raw === "string" ? raw : raw ? raw[site.theme.defaultMode] ?? Object.values(raw)[0] : undefined;
        }
        const m = typeof cur === "string" ? cur.trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i) : typeof cur === "number" ? [null, String(cur), ""] : null;
        const n0 = m ? Number(m[1]) : 0;
        const unit = m ? (m[2] ?? "") : defaultUnit;
        const step = unit === "rem" || unit === "em" ? 0.05 : 1;
        return (totalDelta, big) => {
          const next = Math.round((n0 + totalDelta * step * (big ? 10 : 1)) * 100) / 100;
          // Un glissement entier = une seule entrée d'annulation, quelle que soit sa durée.
          set(p, `${next}${unit}`, true, 60_000);
        };
      },
      title: (p) => sourceLabel(resolved[p]?.source, bpName, styleName, STATE_LABEL),
    };
  }, [site, target, bp, state, commit]);
}
