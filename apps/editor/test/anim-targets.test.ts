import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { animationTargetOptions, targetFromValue, targetValue } from "../src/lib/anim-targets";

const text = (id: string, extra: Partial<Node> = {}): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: id }] } }, ...extra });
const root: Node = { id: "root", type: "box", props: {}, children: [
  { id: "card", type: "box", name: "Carte", props: {}, children: [text("inner")] },
  text("txt_b"),
  text("txt_c"),
  { id: "coll", type: "collection", props: { database: "x" }, children: [{ id: "item", type: "item", props: {} }] },
] };
const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }] };
const find = (id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; dfs(root); return out!; };

describe("cibles d'une animation", () => {
  it("propose l'élément, ses enfants s'il en a, les éléments nommés, les voisins, et un sélecteur libre", () => {
    const forB = animationTargetOptions(site, root, find("txt_b"));
    expect(forB.map((o) => o.value)).toEqual(["self", "node:card", "node:txt_c", "node:coll", "selector"]);
    expect(forB.find((o) => o.value === "node:card")?.label).toBe("Carte");
    expect(forB.find((o) => o.value === "node:txt_c")?.label).toBe("Paragraphe (voisin)");
    const forCard = animationTargetOptions(site, root, find("card"));
    expect(forCard.map((o) => o.value)).toContain("children");
    expect(forCard.map((o) => o.value)).not.toContain("node:card");
    expect(animationTargetOptions(site, root, find("coll")).map((o) => o.value)).toContain("children");
    expect(animationTargetOptions(site, root, find("inner")).map((o) => o.value)).toEqual(["self", "node:card", "selector"]);
  });
  it("va et vient entre la valeur du sélecteur et la cible du modèle", () => {
    expect(targetValue({})).toBe("self");
    expect(targetValue({ target: { self: true } })).toBe("self");
    expect(targetValue({ target: { children: true } })).toBe("children");
    expect(targetValue({ target: { node: "card" } })).toBe("node:card");
    expect(targetValue({ target: { selector: ".x" } })).toBe("selector");
    expect(targetFromValue("self")).toBeUndefined();
    expect(targetFromValue("children")).toEqual({ children: true });
    expect(targetFromValue("node:card")).toEqual({ node: "card" });
    expect(targetFromValue("selector", { selector: ".x" })).toEqual({ selector: ".x" });
    expect(targetFromValue("selector")).toEqual({ selector: "" });
  });
});
