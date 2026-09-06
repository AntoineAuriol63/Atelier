"use client";

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
  set: (prop: string, v: StyleValue | undefined, coalesce?: boolean) => void;
  reset: (prop: string) => void;
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
    const set = (prop: string, v: StyleValue | undefined, coalesce = true) => {
      const key = target.kind === "node" ? target.node.id : `shared:${target.id}`;
      const opts: CommitOptions = { coalesceKey: coalesce ? `style:${key}:${bp}:${state ?? ""}:${prop}` : undefined, label: `${prop} (${where})` };
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
      title: (p) => sourceLabel(resolved[p]?.source, bpName, styleName, STATE_LABEL),
    };
  }, [site, target, bp, state, commit]);
}
