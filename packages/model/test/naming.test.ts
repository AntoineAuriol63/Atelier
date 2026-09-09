import { describe, it, expect } from "vitest";
import { classMap, kindOf, sampleSite } from "../src";

describe("classes lisibles", () => {
  const m = classMap(sampleSite);
  it("nomme les conteneurs d'après leur nom et les feuilles d'après leur sorte, sous le conteneur", () => {
    expect(m.node.get("home")).toBe("page");
    expect(m.node.get("hero")).toBe("heros");
    expect(m.node.get("hero_txt")).toBe("texte");
    expect(m.node.get("hero_h1")).toBe("texte-title");
    expect(m.node.get("hero_p")).toBe("texte-text-2");
    expect(m.node.get("hdr")).toBe("en-tete");
    expect(m.node.get("hdr_nav")).toBe("navigation");
  });
  it("numérote les voisins de même sorte et reste unique dans tout le site", () => {
    const all = [...m.node.values()];
    expect(new Set(all).size).toBe(all.length);
    expect([...m.node.values()].some((c) => /-2$/.test(c))).toBe(true);
  });
  it("nomme les styles partagés d'après leur nom", () => {
    expect(m.shared.get("st_button")).toBe("bouton");
    expect(m.shared.get("st_button_secondary")).toBe("bouton-secondaire");
  });
  it("connaît la sorte d'un nœud", () => {
    expect(kindOf({ id: "x", type: "text", props: { tag: "h2" } })).toBe("title");
    expect(kindOf({ id: "x", type: "link", props: { tag: "button" } })).toBe("button");
  });
});
