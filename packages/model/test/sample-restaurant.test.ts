import { describe, it, expect } from "vitest";
import { classMap, indexSite, restaurantEntries, restaurantSite, validateSite, walk } from "../src";

describe("site d'exemple : restaurant", () => {
  it("est un document valide aux identifiants uniques", () => {
    const v = validateSite(restaurantSite);
    expect(v.ok, v.ok ? "" : v.errors.slice(0, 5).join(" ; ")).toBe(true);
    const seen = new Set<string>();
    for (const p of restaurantSite.pages) walk(p.root, (n) => { expect(seen.has(n.id), `identifiant en double : ${n.id}`).toBe(false); seen.add(n.id); });
    for (const c of restaurantSite.components) walk(c.root, (n) => { expect(seen.has(n.id), `identifiant en double : ${n.id}`).toBe(false); seen.add(n.id); });
  });
  it("relie les entrées à ses bases et les liens à ses pages", () => {
    const dbs = new Set(restaurantSite.databases.map((d) => d.id));
    for (const e of restaurantEntries) expect(dbs.has(e.database)).toBe(true);
    const pages = new Set(restaurantSite.pages.map((p) => p.id));
    const assets = new Set(restaurantSite.assets.map((a) => a.id));
    const index = indexSite(restaurantSite);
    for (const loc of index.values()) {
      const n = loc.node;
      const href = n.props.href as { kind: string; page?: string } | undefined;
      if (href?.kind === "page") expect(pages.has(href.page!), `page inconnue ${href.page}`).toBe(true);
      if (n.type === "image" && typeof n.props.asset === "string") expect(assets.has(n.props.asset), `média inconnu ${n.props.asset}`).toBe(true);
      if (n.type === "instance") expect(restaurantSite.components.some((c) => c.id === n.props.component)).toBe(true);
      for (const ix of n.interactions ?? []) for (const a of ix.actions) if ("target" in a && "node" in a.target) expect(index.has(a.target.node), `cible inconnue ${a.target.node}`).toBe(true);
    }
    const m = classMap(restaurantSite);
    expect(m.node.get("rh_hero")).toBe("heros");
  });
});
