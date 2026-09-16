import { describe, it, expect } from "vitest";
import { migrate, SCHEMA_VERSION, sampleSite, schema, type Node, type Site } from "../src";

describe("migration de schéma", () => {
  it("laisse un document à jour tel quel", () => {
    expect(migrate(sampleSite)).toBe(sampleSite);
    expect(SCHEMA_VERSION).toBe(3);
  });
  it("refuse une version plus récente que le code, et un document illisible", () => {
    expect(() => migrate({ ...sampleSite, schemaVersion: 99 })).toThrow(/plus récente/);
    expect(() => migrate(null)).toThrow();
  });
});

describe("migration 2 → 3 et réparation : identifiants d'animation uniques", () => {
  const legacyRun = (id: string) => ({ id, animation: { keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 100, style: { opacity: "1" } }] }, preset: "fade", trigger: "inView", duration: 700 });
  const findNode = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };
  it("deux éléments copiés qui gardaient le même run reçoivent deux animations distinctes, chacune lancée par son élément", () => {
    const old = structuredClone(sampleSite) as unknown as Record<string, unknown> & { schemaVersion: number; pages: { root: Node }[]; animations?: unknown[] };
    old.schemaVersion = 2; old.animations = [];
    const h1 = findNode(old as unknown as Site, "hero_h1"), p = findNode(old as unknown as Site, "hero_p");
    (h1 as unknown as { animations: unknown[] }).animations = [legacyRun("ixdup")];
    (p as unknown as { animations: unknown[] }).animations = [legacyRun("ixdup")];
    const site = migrate(old);
    const ids = site.animations.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    const a1 = findNode(site, "hero_h1").triggers![0]!.animation, a2 = findNode(site, "hero_p").triggers![0]!.animation;
    expect(a1).not.toBe(a2);
    expect(site.animations.some((a) => a.id === a1) && site.animations.some((a) => a.id === a2)).toBe(true);
    expect(schema.site.safeParse(site).success).toBe(true);
  });
  it("un document déjà en version 3 avec des animations en double identiques n'en garde qu'une ; des doubles différents sont renommés", () => {
    const a = { id: "an_x", name: "Fondu", duration: 700, tracks: [{ id: "t1", target: { trigger: true as const }, keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 700, style: { opacity: "1" } }] }] };
    const same: Site = { ...sampleSite, animations: [a, structuredClone(a)] };
    const fixed = migrate(same);
    expect(fixed.animations.filter((x) => x.id === "an_x")).toHaveLength(1);
    const other: Site = { ...sampleSite, animations: [a, { ...structuredClone(a), name: "Autre", duration: 900 }] };
    const fixed2 = migrate(other);
    expect(fixed2.animations).toHaveLength(2);
    expect(new Set(fixed2.animations.map((x) => x.id)).size).toBe(2);
    expect(fixed2.animations[0]!.id).toBe("an_x");
    // Rien à réparer : le document est rendu tel quel (même objet).
    expect(migrate(sampleSite)).toBe(sampleSite);
  });
});
