"use client";

import { useMemo } from "react";
import type { CommitOptions, Node, Op, Site, StyleValue, Track } from "@atelier/model";
import { BASE, keyframeStyleAt, planSetKeyframe, planUnsetKeyframeProp } from "@atelier/model";
import { isDraggingValue } from "@/ui/controls/useDragValue";
import { sourceLabel } from "@/ui/controls";
import { throttle, type StyleApi } from "./useStyle";

/**
 * Les panneaux Design en mode image-clé (cadrage § 4.1) : même interface que `useStyle`, mais les valeurs se lisent à l'instant `at`
 * de la piste (`keyframeStyleAt` : image-clé posée là ◆, tenue depuis une autre ◇, ou état de repos ○) et chaque réglage pose ou
 * complète l'image-clé à cet instant. Aucun bouton « enregistrer » : se placer à un temps, régler, l'image-clé existe.
 * Les écritures partent du document courant (`getSite`) : deux réglages dans le même instant (marges liées) ne s'écrasent pas.
 */
export function useKeyframeStyle(site: Site, getSite: () => Site, node: Node, bp: string, animationId: string, track: Track, at: number, commit: (op: Op, opts?: CommitOptions) => void): StyleApi {
  return useMemo(() => {
    const bpName = (id: string) => (id === BASE ? "Base" : site.settings.breakpoints.find((b) => b.id === id)?.name ?? id);
    const styleName = (id: string) => site.sharedStyles.find((s) => s.id === id)?.name ?? id;
    const resolved = keyframeStyleAt(site, node, bp, track, at);
    const set = (prop: string, v: StyleValue | undefined, coalesce = true, coalesceWindowMs: number | undefined = isDraggingValue() ? 120_000 : undefined) => {
      const key = `kf:${animationId}:${track.id}:${at}:${prop}`;
      if (isDraggingValue() && throttle(key, () => set(prop, v, coalesce, coalesceWindowMs))) return;
      const current = getSite();
      const ops = v === undefined ? planUnsetKeyframeProp(current, animationId, track.id, at, prop) : planSetKeyframe(current, animationId, track.id, at, { [prop]: v });
      if (!ops.length) return;
      const label = `${prop} (image-clé à ${at} ms)`;
      commit({ op: "batch", ops, label }, { label, coalesceKey: coalesce ? key : undefined, coalesceWindowMs });
    };
    return {
      resolved, bp, target: { kind: "node", node }, bpName, keyframe: { at },
      get: (p) => resolved[p],
      value: (p) => resolved[p]?.value,
      source: (p) => resolved[p]?.source,
      set,
      reset: (p) => set(p, undefined, false),
      scrub: (p, defaultUnit = "px") => {
        let cur: StyleValue | undefined = resolved[p]?.value;
        if (typeof cur === "object" && cur && "token" in cur) {
          const [g, n] = cur.token.split(".") as [keyof Site["theme"]["tokens"], string];
          const raw = site.theme.tokens[g]?.[n];
          cur = typeof raw === "string" ? raw : raw ? raw[site.theme.defaultMode] ?? Object.values(raw)[0] : undefined;
        }
        const m = typeof cur === "string" ? cur.trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i) : typeof cur === "number" ? [null, String(cur), ""] : null;
        const n0 = m ? Number(m[1]) : 0;
        const unit = m ? (m[2] ?? "") : defaultUnit;
        const step = unit === "rem" || unit === "em" ? 0.05 : p === "opacity" ? 0.01 : 1;
        return (totalDelta, big) => set(p, `${Math.round((n0 + totalDelta * step * (big ? 10 : 1)) * 100) / 100}${unit}`, true, 60_000);
      },
      title: (p) => sourceLabel(resolved[p]?.source, bpName, styleName),
    };
  }, [site, getSite, node, bp, animationId, track, at, commit]);
}
