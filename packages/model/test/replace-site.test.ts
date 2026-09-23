import { describe, it, expect } from "vitest";
import { applyOps, invertOp, planReplaceSite, restaurantSite, sampleSite, type Site } from "../src";

/**
 * Reprendre une version (23 septembre 2026) : ramener le document de travail à un instantané passe par des opérations ordinaires,
 * une par partie du site qui diffère, pour que le journal, le verrou de version et « annuler » restent vrais.
 */
describe("planReplaceSite", () => {
  it("rien à faire quand les documents sont les mêmes", () => {
    expect(planReplaceSite(sampleSite, structuredClone(sampleSite))).toEqual([]);
  });

  it("une opération par partie qui diffère, jamais sur l'identifiant ni la version de schéma", () => {
    const target: Site = { ...structuredClone(sampleSite), name: "Autre nom", redirects: [{ from: "/a", to: "/b", permanent: true }] };
    const ops = planReplaceSite(sampleSite, target);
    expect(ops.map((o) => (o as { path: string }).path).sort()).toEqual(["name", "redirects"]);
    expect(ops.every((o) => o.op === "site.set")).toBe(true);
  });

  it("appliquer les opérations rend exactement l'instantané ; les inverser rend le document de départ", () => {
    const target: Site = { ...structuredClone(restaurantSite), id: sampleSite.id };
    const ops = planReplaceSite(sampleSite, target);
    const after = applyOps(sampleSite, ops);
    expect(after.site).toEqual(target);
    const back = applyOps(after.site, after.ops.map(invertOp).reverse());
    expect(back.site).toEqual(sampleSite);
  });
});
