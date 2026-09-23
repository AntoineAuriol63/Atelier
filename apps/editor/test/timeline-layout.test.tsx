// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Op, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planAddTrack, planQuickAnimation, sampleSite } from "@atelier/model";
import { Timeline } from "../src/components/animation/Timeline";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class { observe() {} disconnect() {} unobserve() {} };

const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;

/** La scène de P4 et P5 en vague 5 : une animation sur la photo avec une piste vide pour le titre. */
function scene(): Site {
  let s = applyOps(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "fade")).site;
  const ap = appearanceOf(s, "photo")!;
  s = applyOps(s, planAddTrack(s, ap.animation.id, { id: "tk_h2", target: { node: "hh2" }, keyframes: [{ at: 0, style: {} }] })).site;
  return s;
}

function mount(site: Site, selectedId: string) {
  let current = site;
  const host = document.createElement("div");
  document.body.appendChild(host);
  const ap = appearanceOf(site, "photo")!;
  const commit = (op: Op) => { current = applyOps(current, [op]).site; render(); };
  const root = createRoot(host);
  const render = () => act(() => {
    const a = current.animations.find((x) => x.id === ap.animation.id)!;
    root.render(createElement(Timeline, { site: current, getSite: () => current, animation: a, hostId: "photo", trigger: ap.trigger, selected: node(current, selectedId), bp: "base", commit, scrub: () => {}, onClose: () => {}, onSelect: () => {}, onTestOnSite: () => {} }));
  });
  render();
  return { host, get site() { return current; }, text: () => host.textContent ?? "" };
}

/** Vague 5 : le champ « Départ » rogné sous la liste des éléments (P4, P5) ; l'élément qu'on vient d'animer disparaît de l'aperçu (P5) ; « Ajouter » identiques (P4) ; « images-clés » (P5). */
describe("ligne de temps : la place des réglages, la tête de lecture, les mots (lot 9)", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("les réglages de la piste active viennent avant la liste des éléments de la scène", () => {
    const m = mount(scene(), "hh2");
    const settings = m.host.querySelector("section[aria-label=\"Piste\"]");
    const list = m.host.querySelector("[data-scene-elements]");
    expect(settings).toBeTruthy(); expect(list).toBeTruthy();
    expect(settings!.compareDocumentPosition(list!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("remplir une piste place la tête de lecture à sa fin : l'élément reste visible", () => {
    const m = mount(scene(), "hh2");
    const select = [...m.host.querySelectorAll<HTMLSelectElement>("select")].find((s) => [...s.options].some((o) => /Fondu en montant/.test(o.textContent ?? "")));
    expect(select).toBeTruthy();
    act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!; setter.call(select, "fade-up"); select!.dispatchEvent(new Event("change", { bubbles: true })); });
    expect(m.site.animations[0]!.tracks.find((t) => t.id === "tk_h2")!.keyframes.length).toBeGreaterThan(1);
    expect(m.text()).toMatch(/700 \/ [\d\s ]+ms/);
  });

  it("une piste vide se dit sans effet, et la piste de l'élément qui lance la scène ne s'ajoute pas sous le même mot que les autres", () => {
    const m = mount(scene(), "photo");
    expect(m.text()).toContain("n'a pas encore d'effet");
    expect(m.text()).not.toContain("pas encore d'images-clés");
    const adds = [...m.host.querySelectorAll<HTMLButtonElement>("button")].map((b) => (b.textContent ?? "").trim()).filter((t) => /^Ajouter/.test(t));
    expect(adds.every((t) => t === "Ajouter")).toBe(true);
  });
});
