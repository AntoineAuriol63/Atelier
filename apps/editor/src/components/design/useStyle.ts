"use client";

import { useMemo } from "react";
import type { CommitOptions, Node, Op, ResolvedStyle, ResolvedValue, Site, StyleSource, StyleValue } from "@atelier/model";
import { BASE, resolveNodeStyle, stylePath } from "@atelier/model";
import { sourceLabel } from "@/ui/controls";

export type StyleApi = {
  resolved: ResolvedStyle;
  get: (prop: string) => ResolvedValue | undefined;
  value: (prop: string) => StyleValue | undefined;
  source: (prop: string) => StyleSource | undefined;
  /** Pose la propriété au point de rupture actif. `undefined` retire la surcharge locale. */
  set: (prop: string, v: StyleValue | undefined, coalesce?: boolean) => void;
  reset: (prop: string) => void;
  title: (prop: string) => string;
  bp: string;
  bpName: (id: string) => string;
};

export function useStyle(site: Site, node: Node, bp: string, commit: (op: Op, opts?: CommitOptions) => void): StyleApi {
  return useMemo(() => {
    const resolved = resolveNodeStyle(site, node, bp);
    const bpName = (id: string) => (id === BASE ? "Base" : site.settings.breakpoints.find((b) => b.id === id)?.name ?? id);
    const styleName = (id: string) => site.sharedStyles.find((s) => s.id === id)?.name ?? id;
    const set = (prop: string, v: StyleValue | undefined, coalesce = true) =>
      commit({ op: "node.set", id: node.id, path: stylePath(bp, prop), value: v }, { coalesceKey: coalesce ? `style:${node.id}:${bp}:${prop}` : undefined, label: `${prop} (${bpName(bp)})` });
    return {
      resolved, bp, bpName,
      get: (p) => resolved[p],
      value: (p) => resolved[p]?.value,
      source: (p) => resolved[p]?.source,
      set,
      reset: (p) => set(p, undefined, false),
      title: (p) => sourceLabel(resolved[p]?.source, bpName, styleName),
    };
  }, [site, node, bp, commit]);
}
