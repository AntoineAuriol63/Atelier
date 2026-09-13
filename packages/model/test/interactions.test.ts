import { describe, it, expect } from "vitest";
import { animationById, applyOps, describeInteraction, describeTrigger, planQuickAnimation, planUpdateTrigger, quickAnimation, sampleSite, toggleInteraction, type Node, type Site } from "../src";

describe("apparitions", () => {
  const node: Node = { id: "n", type: "box", props: { tag: "div" }, style: { base: { padding: "1rem" } } };
  const withNode = (): Site => ({ ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box" as const, props: {}, children: [node] } }] });
  it("pose une animation d'apparition sans toucher au style, la remplace sans doublon, puis la retire proprement", () => {
    const site = withNode();
    const { site: s1 } = applyOps(site, planQuickAnimation(site, node, "Apparition", "fade-up"));
    const n1 = s1.pages[0]!.root.children![0]!;
    const { site: s1b } = applyOps(s1, planUpdateTrigger(n1, n1.triggers![0]!.id, { delay: 120 }));
    const n1b = s1b.pages[0]!.root.children![0]!;
    expect(n1b.style?.base).toEqual({ padding: "1rem" });
    expect(quickAnimation(s1b, n1b, "Apparition")).toMatchObject({ preset: { id: "fade-up" }, trigger: { on: "inView", delay: 120 }, animation: { duration: 700 } });
    expect(s1b.animations).toHaveLength(sampleSite.animations.length + 1);
    const { site: s2 } = applyOps(s1b, planQuickAnimation(s1b, n1b, "Apparition", "blur"));
    const n2 = s2.pages[0]!.root.children![0]!;
    expect(n2.triggers).toHaveLength(1);
    expect(animationById(s2, n2.triggers![0]!.animation)?.preset).toBe("blur");
    expect(s2.animations).toHaveLength(sampleSite.animations.length + 1);
    const { site: s3 } = applyOps(s2, planQuickAnimation(s2, n2, "Apparition", ""));
    const n3 = s3.pages[0]!.root.children![0]!;
    expect(n3.style?.base).toEqual({ padding: "1rem" });
    expect(n3.triggers).toBeUndefined();
    expect(s3.animations).toHaveLength(sampleSite.animations.length);
  });
  it("décrit une interaction et un déclencheur en français", () => {
    expect(describeInteraction(toggleInteraction("click", { node: "x" }), () => "Réponse")).toBe("Au clic : afficher ou masquer Réponse");
    const site = withNode();
    const { site: s1 } = applyOps(site, planQuickAnimation(site, node, "Apparition", "zoom"));
    expect(describeTrigger(s1.pages[0]!.root.children![0]!.triggers![0]!, s1)).toBe("À l'entrée dans l'écran · Zoom");
  });
});
