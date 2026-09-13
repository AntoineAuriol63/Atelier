import { describe, it, expect } from "vitest";
import type { Animation, Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { animatedNodes, canAddTrack, formatTime, nextAnimationName, rulerTicks, snapTime, targetKindOf, targetKindOptions, trackLabel, triggerHosts, validOpenTimeline } from "../src/lib/timeline";

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
  it("liste les éléments qui portent un déclencheur, pour l'éclair des calques", () => {
    const tree: Node = { ...root, triggers: [{ id: "g0", on: "load", animation: "an_2" }], children: [{ ...root.children![0]!, triggers: [{ id: "g1", on: "inView", animation: "an_1" }] }, root.children![1]!] };
    expect([...triggerHosts(tree)].sort()).toEqual(["card", "root"]);
    expect(triggerHosts(root).size).toBe(0);
  });
  it("garde l'animation ouverte tant que son déclencheur existe encore sur l'hôte et la lance toujours", () => {
    const withTrigger: Site = { ...site, pages: [{ ...site.pages[0]!, root: { ...root, children: [{ ...root.children![0]!, triggers: [{ id: "g1", on: "inView", animation: "an_1" }] }, root.children![1]!] } }] };
    const open = { animationId: "an_1", hostId: "card", triggerId: "g1" };
    expect(validOpenTimeline(withTrigger, open)).toBe(open);
    expect(validOpenTimeline(withTrigger, null)).toBeNull();
    expect(validOpenTimeline(site, open)).toBeNull();
    expect(validOpenTimeline(withTrigger, { ...open, animationId: "an_2" })).toBeNull();
    expect(validOpenTimeline({ ...withTrigger, animations: [site.animations[1]!] }, open)).toBeNull();
    expect(validOpenTimeline(withTrigger, { ...open, hostId: "ailleurs" })).toBeNull();
  });
  it("aligne un temps sur une grille de 10 ms, jamais avant 0", () => {
    expect(snapTime(423)).toBe(420);
    expect(snapTime(426)).toBe(430);
    expect(snapTime(-40)).toBe(0);
    expect(snapTime(437, 50)).toBe(450);
  });
  it("formes de cible d'une piste : l'élément, ses enfants s'il en a, ses mots ou lettres pour un texte", () => {
    expect(targetKindOf({ trigger: true })).toBe("element");
    expect(targetKindOf({ node: "x", children: true })).toBe("children");
    expect(targetKindOf({ node: "x", split: "letters" })).toBe("letters");
    expect(targetKindOf({ selector: ".x" })).toBe("selector");
    expect(targetKindOptions(root.children![0]).map((o) => o.value)).toEqual(["element", "children"]);
    expect(targetKindOptions(root.children![1]).map((o) => o.value)).toEqual(["element", "words", "letters"]);
    expect(targetKindOptions(undefined).map((o) => o.value)).toEqual(["element"]);
  });
  it("ajouter une piste : un élément de la même page que l'hôte, pas encore animé tel quel", () => {
    const other: Site = { ...site, pages: [...site.pages, { ...site.pages[0]!, id: "pg_2", path: "/autre", root: { id: "root2", type: "box", props: {}, children: [text("far")] } }] };
    const a: Animation = { id: "an_x", name: "X", duration: 600, tracks: [{ id: "t1", target: { trigger: true }, keyframes: [] }] };
    expect(canAddTrack(other, a, "card", "txt_b")).toEqual({ ok: true });
    expect(canAddTrack(other, a, "card", "card")).toEqual({ ok: false, reason: "« Carte » a déjà sa piste" });
    expect(canAddTrack(other, a, "card", "far")).toEqual({ ok: false, reason: "Choisissez un élément de la même page que l'animation" });
    expect(canAddTrack(other, a, "card", undefined)).toEqual({ ok: false, reason: "Sélectionnez un élément dans l'aperçu ou dans les calques" });
  });
});
