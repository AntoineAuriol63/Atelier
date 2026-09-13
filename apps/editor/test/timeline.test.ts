import { describe, it, expect } from "vitest";
import type { Animation, Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { animatedNodes, formatTime, nextAnimationName, rulerTicks, trackLabel } from "../src/lib/timeline";

const text = (id: string, name?: string): Node => ({ id, type: "text", name, props: { tag: "p", content: { fr: [{ t: "text", v: id }] } } });
const root: Node = { id: "root", type: "box", props: {}, children: [{ id: "card", type: "box", name: "Carte", props: {}, children: [text("inner")] }, text("txt_b", "Titre")] };
const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }], animations: [{ id: "an_1", name: "Arrivée", duration: 1000, tracks: [{ id: "t1", target: { trigger: true }, keyframes: [] }, { id: "t2", target: { node: "txt_b", split: "letters" }, keyframes: [] }, { id: "t3", target: { trigger: true, children: true }, keyframes: [] }, { id: "t4", target: { selector: ".x" }, keyframes: [] }] }, { id: "an_2", name: "Animation 2", duration: 500, tracks: [] }] };

describe("ligne de temps", () => {
  it("les graduations suivent la longueur : pas lisible, jamais plus d'une vingtaine", () => {
    expect(rulerTicks(600)).toEqual([0, 100, 200, 300, 400, 500, 600]);
    expect(rulerTicks(3000).length).toBeLessThanOrEqual(21);
    expect(rulerTicks(3000)[1]).toBe(250);
    expect(rulerTicks(12000)[1]).toBe(1000);
    expect(rulerTicks(0)).toEqual([0]);
  });
  it("formate un temps en secondes à la française", () => {
    expect(formatTime(0)).toBe("0,00 s");
    expect(formatTime(420)).toBe("0,42 s");
    expect(formatTime(1250)).toBe("1,25 s");
  });
  it("nomme la piste d'après sa cible résolue", () => {
    const a = site.animations[0]!;
    expect(trackLabel(a.tracks[0]!, "card", site)).toBe("Carte");
    expect(trackLabel(a.tracks[1]!, "card", site)).toBe("Titre · lettres");
    expect(trackLabel(a.tracks[2]!, "card", site)).toBe("Carte · enfants");
    expect(trackLabel(a.tracks[3]!, "card", site)).toBe(".x");
  });
  it("liste les éléments qu'une animation touche depuis un hôte, pour marquer les calques", () => {
    const a = site.animations[0]!;
    expect([...animatedNodes(a, "card")].sort()).toEqual(["card", "txt_b"]);
  });
  it("propose un nom libre pour une nouvelle animation", () => {
    expect(nextAnimationName(site)).toBe("Animation 3");
    expect(nextAnimationName({ ...site, animations: [] })).toBe("Animation 1");
  });
});
