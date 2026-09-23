import type { Op, Site } from "./types";

/** Les parties d'un site qu'une reprise de version remplace : tout sauf l'identité du document. */
const PARTS = ["name", "settings", "theme", "sharedStyles", "components", "codeComponents", "databases", "pages", "assets", "redirects", "animations"] as const satisfies readonly (keyof Site)[];

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Ramener le document de travail à un instantané (23 septembre 2026) : une opération `site.set` par partie qui diffère.
 * Le journal, le verrou de version et « annuler » restent vrais : reprendre une version est un changement comme un autre.
 */
export function planReplaceSite(current: Site, target: Site): Op[] {
  const ops: Op[] = [];
  for (const key of PARTS) {
    if (same(current[key], target[key])) continue;
    ops.push({ op: "site.set", path: key, value: structuredClone(target[key]), prev: structuredClone(current[key]) });
  }
  return ops;
}
