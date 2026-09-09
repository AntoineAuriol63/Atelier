import { describe, it, expect } from "vitest";
import { applyOps, describeInteraction, planRemoveReveal, planReveal, revealOf, sampleSite, toggleInteraction, type Node } from "../src";

describe("apparitions", () => {
  const node: Node = { id: "n", type: "box", props: { tag: "div" }, style: { base: { padding: "1rem" } } };
  it("pose l'état de départ et l'interaction, puis les retire proprement", () => {
    const site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [node] } }] };
    const { site: s1 } = applyOps(site, planReveal(node, { kind: "fade-up", delay: 120 }));
    const n1 = s1.pages[0]!.root.children![0]!;
    expect(n1.style?.base).toEqual({ padding: "1rem", opacity: "0", transform: "translateY(28px)" });
    expect(revealOf(n1)?.options).toMatchObject({ kind: "fade-up", delay: 120, duration: 700 });
    // Changer de sorte remplace l'état de départ sans laisser de trace
    const { site: s2 } = applyOps(s1, planReveal(n1, { kind: "blur" }));
    const n2 = s2.pages[0]!.root.children![0]!;
    expect(n2.style?.base).toEqual({ padding: "1rem", opacity: "0", filter: "blur(12px)" });
    expect(n2.interactions).toHaveLength(1);
    const { site: s3 } = applyOps(s2, planRemoveReveal(n2));
    const n3 = s3.pages[0]!.root.children![0]!;
    expect(n3.style?.base).toEqual({ padding: "1rem" });
    expect(n3.interactions).toBeUndefined();
  });
  it("décrit une interaction en français", () => {
    expect(describeInteraction(toggleInteraction("click", { node: "x" }), () => "Réponse")).toBe("Au clic : afficher ou masquer Réponse");
    const { site } = applyOps({ ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [node] } }] }, planReveal(node, { kind: "zoom" }));
    expect(describeInteraction(site.pages[0]!.root.children![0]!.interactions![0]!, () => "")).toBe("Apparition · Zoom");
  });
});
