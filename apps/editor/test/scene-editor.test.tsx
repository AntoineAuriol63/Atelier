// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Op, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planAppearanceDelay, planGroupAppearance, planQuickAnimation, sampleSite } from "@atelier/model";
import { SceneEditor } from "../src/components/animation/SceneEditor";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * Le tiroir Animation recentré (24 septembre 2026, lot 1) : la scène de la section à gauche, une ligne par élément ; les images-clés de
 * l'élément sélectionné sur sa ligne ; à droite ses réglages (Apparition, Vitesse, Démarre, Délai) et l'image-clé à la tête de lecture.
 */
const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts"), box("c3", "Producteurs")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const run = (site: Site, ops: Op[]) => applyOps(site, ops).site;
function animated(): Site {
  let s = run(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "slide-right"));
  s = run(s, planQuickAnimation(s, node(s, "hh2"), "Apparition", "fade-up")); s = run(s, planAppearanceDelay(s, "hh2", 600));
  s = run(s, planGroupAppearance(s, "c1", "rise-bounce"));
  return s;
}

function mount(site: Site, selectedId: string | null) {
  const ops: Op[] = []; const selected: string[] = []; const scrubs: (number | null)[] = []; const plays: string[] = [];
  let current = site;
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  const render = (s: Site, sel: string | null) => createElement(SceneEditor, { site: s, getSite: () => current, selectedId: sel, bp: "base", commit: (op) => { ops.push(op); current = applyOps(current, [op]).site; }, onSelect: (id) => selected.push(id), scrub: (t) => scrubs.push(t), onPlay: (triggerId, hostId) => plays.push(`${hostId}:${triggerId}`), onClose: () => {} });
  act(() => { root.render(render(site, selectedId)); });
  return { host, ops, selected, scrubs, plays, text: () => host.textContent ?? "", buttons: () => [...host.querySelectorAll<HTMLButtonElement>("button")], rerender: (s: Site, sel: string | null) => act(() => { current = s; root.render(render(s, sel)); }), current: () => current };
}

describe("tiroir Animation : la scène", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("une ligne par élément de la section dans l'ordre de la page, une barre pour ceux qui bougent, « Faire apparaître » pour les autres", () => {
    const m = mount(animated(), "hh2");
    expect(m.host.querySelector("[data-scene-editor]")).toBeTruthy();
    expect(m.text()).toContain("La maison");
    const rows = [...m.host.querySelectorAll("[data-scene-row]")].map((r) => r.getAttribute("data-scene-row"));
    expect(rows).toEqual(["photo", "hh2", "pp2", "stats", "c1", "c2", "c3"]);
    expect(m.host.querySelector('[data-scene-row="photo"] [data-scene-bar]')).toBeTruthy();
    expect(m.host.querySelector('[data-scene-row="pp2"] [data-scene-bar]')).toBeNull();
    expect(m.host.querySelector('[data-scene-row="pp2"]')!.textContent).toContain("Faire apparaître");
    expect(m.host.querySelector('[data-scene-row="c1"]')!.textContent).toContain("avec");
  });

  it("l'élément sélectionné montre ses images-clés ; cliquer une autre ligne la sélectionne", () => {
    const m = mount(animated(), "hh2");
    expect(m.host.querySelectorAll('[data-scene-row="hh2"] [data-scene-kf]').length).toBe(2);
    expect(m.host.querySelectorAll('[data-scene-row="photo"] [data-scene-kf]').length).toBe(0);
    act(() => { m.host.querySelector<HTMLElement>('[data-scene-row="photo"] [data-scene-name]')!.click(); });
    expect(m.selected).toEqual(["photo"]);
  });

  it("« Faire apparaître » sur une ligne immobile crée son apparition, après l'élément qui la précède", () => {
    const m = mount(animated(), "hh2");
    const b = [...m.host.querySelectorAll<HTMLButtonElement>('[data-scene-row="pp2"] button')].find((x) => (x.textContent ?? "").includes("Faire apparaître"))!;
    act(() => { b.click(); });
    const ap = appearanceOf(m.current(), "pp2");
    expect(ap).toBeTruthy();
    expect(ap!.begin).toEqual({ kind: "after", node: "hh2" });
    expect(m.selected).toContain("pp2");
  });

  it("la tête de lecture se pose en cliquant la règle et montre cet instant dans l'aperçu ; « + » y pose une image-clé", () => {
    const m = mount(animated(), "hh2");
    const rail = m.host.querySelector<HTMLElement>("[data-scene-rail]")!;
    rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    // À 50 % d'une scène de 1 300 ms (arrondie à 10 ms).
    act(() => { rail.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: 500, button: 0 })); });
    expect(m.scrubs[m.scrubs.length - 1]).toBe(650);
    const add = m.buttons().find((b) => (b.getAttribute("aria-label") ?? "").includes("Ajouter une image-clé"))!;
    act(() => { add.click(); });
    const ap = appearanceOf(m.current(), "hh2")!;
    expect(ap.track.keyframes.map((k) => k.at)).toContain(650);
  });

  it("à droite : les réglages de l'élément (Apparition, Vitesse, Démarre, Délai) et l'image-clé à la tête de lecture", () => {
    const m = mount(animated(), "hh2");
    expect(m.text()).toContain("Apparition");
    expect(m.text()).toContain("Démarre");
    expect(m.text()).toContain("Délai");
    expect(m.host.querySelector("[data-scene-keyframe]")).toBeTruthy();
    expect(m.text()).toMatch(/Image-clé à/);
  });

  it("« Lire » joue chaque lancement de la scène dans l'aperçu", () => {
    const m = mount(animated(), "hh2");
    act(() => { m.buttons().find((b) => (b.textContent ?? "").trim() === "Lire")!.click(); });
    expect(m.plays.length).toBeGreaterThanOrEqual(2);
  });

  it("sans élément sélectionné : une invitation, pas de scène", () => {
    const m = mount(animated(), null);
    expect(m.host.querySelector("[data-scene-row]")).toBeNull();
    expect(m.text()).toMatch(/Sélectionnez un élément/);
  });

});

/** Lot 2 : les barres et les losanges se tirent. Le rail mesure 1 000 px pour une scène de 1 300 ms ; un déplacement se lit en ms, arrondi à 10. */
describe("tiroir Animation : tirer", () => {
  beforeEach(() => { document.body.innerHTML = ""; });
  const railOf = (host: HTMLElement) => { const rail = host.querySelector<HTMLElement>("[data-scene-rail]")!; rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect; return rail; };
  const drag = (el: Element, from: number, to: number) => {
    act(() => { el.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: from, button: 0 })); });
    act(() => { window.dispatchEvent(new MouseEvent("pointermove", { clientX: to })); });
    act(() => { window.dispatchEvent(new MouseEvent("pointerup", { clientX: to })); });
  };

  it("tirer une barre change le départ de l'élément (son délai après ce qui le lance)", () => {
    const m = mount(animated(), "hh2"); railOf(m.host);
    drag(m.host.querySelector('[data-scene-row="photo"] [data-scene-bar]')!, 100, 200);
    expect(appearanceOf(m.current(), "photo")!.delay).toBe(130);
    expect(m.ops.length).toBe(1);
  });

  it("tirer le bord droit d'une barre change la durée", () => {
    const m = mount(animated(), "hh2"); railOf(m.host);
    drag(m.host.querySelector('[data-scene-row="hh2"] [data-scene-bar-end]')!, 500, 600);
    const ap = appearanceOf(m.current(), "hh2")!;
    expect(ap.end - ap.start).toBe(830);
  });

  it("tirer un losange déplace l'image-clé ; un simple clic place la tête de lecture sans rien changer", () => {
    const m = mount(animated(), "hh2"); railOf(m.host);
    const last = [...m.host.querySelectorAll('[data-scene-row="hh2"] [data-scene-kf]')].pop()!;
    drag(last, 900, 800);
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 1170]);
    const first = m.host.querySelector('[data-scene-row="hh2"] [data-scene-kf]')!;
    const before = m.ops.length;
    drag(first, 400, 402);
    expect(m.ops.length).toBe(before);
    expect(m.scrubs[m.scrubs.length - 1]).toBe(600);
  });
});
