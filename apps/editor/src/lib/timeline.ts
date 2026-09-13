import type { Animation, Site, Track } from "@atelier/model";
import { indexSite, resolveTrackTarget } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

/** Graduations de la règle : un pas lisible (100, 250, 500 ms, 1 s…), au plus douze intervalles. */
export function rulerTicks(length: number): number[] {
  if (length <= 0) return [0];
  const steps = [100, 250, 500, 1000, 2000, 5000, 10000, 30000, 60000];
  const step = steps.find((s) => length / s <= 12) ?? 60000;
  const out: number[] = [];
  for (let t = 0; t <= length; t += step) out.push(t);
  return out;
}

/** « 0,42 s » */
export const formatTime = (ms: number): string => `${(ms / 1000).toFixed(2).replace(".", ",")} s`;

/** Nom d'une piste d'après sa cible résolue depuis l'hôte : « Carte », « Titre · lettres », « Carte · enfants », « .x ». */
export function trackLabel(track: Track, hostId: string, site: Site): string {
  const r = resolveTrackTarget(track.target, hostId);
  if ("selector" in r) return r.selector;
  const n = indexSite(site).get(r.node)?.node;
  const base = n ? nodeLabel(n) : r.node;
  return r.children ? `${base} · enfants` : r.split === "letters" ? `${base} · lettres` : r.split === "words" ? `${base} · mots` : base;
}

/** Les éléments qu'une animation touche depuis un hôte (pour marquer les calques). */
export function animatedNodes(a: Animation, hostId: string): Set<string> {
  const out = new Set<string>();
  for (const t of a.tracks) { const r = resolveTrackTarget(t.target, hostId); if (!("selector" in r)) out.add(r.node); }
  return out;
}

/** « Animation 3 » : le premier nom libre. */
export function nextAnimationName(site: Pick<Site, "animations">): string {
  let n = site.animations.length + 1;
  while (site.animations.some((a) => a.name === `Animation ${n}`)) n += 1;
  return `Animation ${n}`;
}
