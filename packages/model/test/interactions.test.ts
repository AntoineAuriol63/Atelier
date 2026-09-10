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

describe("duplication", () => {
  it("une question dupliquée vise sa propre réponse, pas l'originale", async () => {
    const { cloneWithNewIds } = await import("../src");
    type N = import("../src").Node;
    let i = 0;
    const answer = { id: "a", type: "text" as const, props: { tag: "p" }, interactions: [{ id: "ix1", trigger: { kind: "load" as const }, actions: [{ kind: "hide" as const, target: { self: true } }] }] };
    const question = { id: "q", type: "text" as const, props: { tag: "h3" }, interactions: [{ id: "ix2", trigger: { kind: "click" as const }, actions: [{ kind: "toggle" as const, target: { node: "a" } }] }] };
    const block = { id: "b", type: "box" as const, props: {}, children: [question, answer] } as unknown as N;
    const { node, mapping } = cloneWithNewIds(block, () => `n${i++}`);
    const q2 = node.children![0]!;
    const targetOf = (n: N) => (n.interactions![0]!.actions[0] as unknown as { target: { node: string } }).target.node;
    expect(targetOf(q2)).toBe(mapping.get("a"));
    expect(targetOf(question as unknown as N)).toBe("a");
  });
});
