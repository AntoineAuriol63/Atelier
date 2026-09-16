import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { applyOps, planAppearanceDetail, planQuickAnimation, sampleSite } from "@atelier/model";
import { appearanceOptions, arrivesWith } from "../src/lib/appearance-options";

const text = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } } });
const card = (id: string): Node => ({ id, type: "box", name: "Carte", props: {}, children: [text(`${id}_t`, "Plat")] });
const list: Node = { id: "plats", type: "box", name: "Plats", props: {}, children: [card("c1"), card("c2")] };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [list, text("free", "Libre")] } }] };
const node = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };

describe("choix d'apparition d'un élément", () => {
  it("sans apparition : « Aucune » choisie, puis les préréglages", () => {
    const o = appearanceOptions(base, "free");
    expect(o.value).toBe("");
    expect(o.options[0]).toEqual({ value: "", label: "Aucune" });
    expect(o.options.some((x) => x.value === "fade-up")).toBe(true);
    expect(o.options.every((x) => !x.disabled)).toBe(true);
  });
  it("une carte qui arrive avec sa liste : le premier choix le dit, avec l'effet, et ne se choisit pas (il n'écrirait rien)", () => {
    let site = applyOps(base, planQuickAnimation(base, node(base, "plats"), "Apparition", "fade-up")).site;
    site = applyOps(site, planAppearanceDetail(site, "plats", "children")).site;
    const o = appearanceOptions(site, "c2");
    expect(o.value).toBe("");
    expect(o.options[0]).toEqual({ value: "", label: "Avec « Plats » · Fondu en montant", disabled: true });
    expect(o.applyTo).toBe("plats");
    const inner = appearanceOptions(site, "c2_t");
    expect(inner.options[0]!.label).toBe("Avec « Plats » · Fondu en montant");
    expect(inner.applyTo).toBe("plats");
  });
  it("un élément dans un bloc qui arrive d'un seul tenant : « Avec « Carte » », non choisissable, et un préréglage s'applique à lui-même", () => {
    const site = applyOps(base, planQuickAnimation(base, node(base, "c1"), "Apparition", "zoom")).site;
    const o = appearanceOptions(site, "c1_t");
    expect(o.options[0]).toEqual({ value: "", label: "Avec « Carte » · Zoom", disabled: true });
    expect(o.applyTo).toBe("c1_t");
  });
  it("avec sa propre apparition : le préréglage est choisi et « Aucune » reste possible", () => {
    const site = applyOps(base, planQuickAnimation(base, node(base, "free"), "Apparition", "blur")).site;
    const o = appearanceOptions(site, "free");
    expect(o.value).toBe("blur");
    expect(o.options[0]).toEqual({ value: "", label: "Aucune" });
  });
});

describe("« arrive avec » dans le mode Animation", () => {
  it("dit d'où vient une apparition qui n'est pas la sienne, et rien quand elle est la sienne ou absente", () => {
    let site = applyOps(base, planQuickAnimation(base, node(base, "plats"), "Apparition", "fade-up")).site;
    site = applyOps(site, planAppearanceDetail(site, "plats", "children")).site;
    expect(arrivesWith(site, "c2")).toMatchObject({ hostId: "plats", label: "Arrive avec « Plats » · Fondu en montant" });
    expect(arrivesWith(site, "plats")).toBeUndefined();
    expect(arrivesWith(base, "free")).toBeUndefined();
    // Un élément animé dans l'animation d'un autre (piste à cible absolue) : c'est cet autre qui lance.
    const scene = applyOps(base, planQuickAnimation(base, node(base, "free"), "Apparition", "zoom")).site;
    const withTrack: Site = { ...scene, animations: scene.animations.map((a) => ({ ...a, tracks: [...a.tracks, { id: "tk_c1", target: { node: "c1" }, keyframes: [{ at: 200, style: { opacity: "0" } }, { at: 700, style: { opacity: "1" } }] }] })) };
    expect(arrivesWith(withTrack, "c1")).toMatchObject({ hostId: "free", label: "Arrive avec Paragraphe « Libre »" });
  });
});
