// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Op, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planAppearanceDelay, planAppearanceDetail, planQuickAnimation, sampleSite } from "@atelier/model";
import { QuickAnimations } from "../src/components/animation/QuickAnimations";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [text("hh2", "Une cuisine", "h2"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts"), box("c3", "Producteurs")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const run = (site: Site, ops: Op[]) => applyOps(site, ops).site;

function mount(site: Site, id: string) {
  const ops: Op[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(QuickAnimations, { site, node: node(site, id), commit: (op) => { ops.push(op); } })); });
  const applied = () => ops.reduce((s, op) => applyOps(s, [op]).site, site);
  const setNumber = (input: HTMLInputElement, v: string) => act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!; setter.call(input, v); input.dispatchEvent(new Event("input", { bubbles: true })); input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); });
  return { host, ops, applied, setNumber, text: () => host.textContent ?? "" };
}

/** Vague 4, N1 : « survol, c'est un avion » ; « les enfants de « Plats » » ; « ms » sans secondes dans le champ Délai ; « Lente » donne 1 120 ms sans qu'on puisse taper 400. */
describe("un mot par mot (lot 8, temps 4)", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("la ligne du survol s'appelle « Quand la souris passe dessus »", () => {
    const m = mount(base, "hh2");
    expect(m.text()).toContain("Quand la souris passe dessus");
    expect(m.text()).not.toContain("Au survol");
  });

  it("un groupe : « les 3 éléments un à un », jamais « les enfants »", () => {
    let s = run(base, planQuickAnimation(base, node(base, "stats"), "Apparition", "fade-up"));
    s = run(s, planAppearanceDetail(s, "stats", "children"));
    const m = mount(s, "stats");
    expect(m.text()).toContain("les 3 éléments un à un");
    expect(m.text()).toContain("les 3 éléments de « Chiffres » un à un");
    expect(m.text()).not.toContain("enfants");
  });

  it("la durée d'une apparition se tape en millisecondes à côté de Rapide / Normale / Lente", () => {
    const s = run(base, planQuickAnimation(base, node(base, "hh2"), "Apparition", "fade-up"));
    const m = mount(s, "hh2");
    const input = [...m.host.querySelectorAll<HTMLInputElement>("input")].find((i) => i.getAttribute("aria-label") === "Durée de l'apparition");
    expect(input).toBeTruthy();
    expect(Number(input!.value)).toBe(appearanceOf(s, "hh2")!.end - appearanceOf(s, "hh2")!.start);
    m.setNumber(input!, "400");
    const ap = appearanceOf(m.applied(), "hh2")!;
    expect(ap.end - ap.start).toBe(400);
  });

  it("un délai au-delà d'une seconde se lit aussi en secondes", () => {
    let s = run(base, planQuickAnimation(base, node(base, "hh2"), "Apparition", "fade-up"));
    s = run(s, planAppearanceDelay(s, "hh2", 1200));
    expect(mount(s, "hh2").text()).toContain("(1,2 s)");
  });
});
