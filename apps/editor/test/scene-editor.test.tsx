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
  const ops: Op[] = []; const selected: string[] = []; const scrubs: (number | null)[] = []; const plays: string[] = []; const hovers: (string | null)[] = [];
  let current = site;
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  const render = (s: Site, sel: string | null) => createElement(SceneEditor, { site: s, getSite: () => current, selectedId: sel, bp: "base", commit: (op) => { ops.push(op); current = applyOps(current, [op]).site; }, onSelect: (id) => selected.push(id), scrub: (t) => scrubs.push(t), onPlay: (triggerId, hostId) => plays.push(`${hostId}:${triggerId}`), onHover: (id) => hovers.push(id), onClose: () => {} });
  act(() => { root.render(render(site, selectedId)); });
  return { host, ops, selected, scrubs, plays, hovers, text: () => host.textContent ?? "", buttons: () => [...host.querySelectorAll<HTMLButtonElement>("button")], rerender: (s: Site, sel: string | null) => act(() => { current = s; root.render(render(s, sel)); }), current: () => current };
}

describe("tiroir Animation : la scène", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("seuls les éléments qui bougent ont une ligne, dans l'ordre de la page ; les autres s'ajoutent par « Ajouter un élément »", () => {
    const m = mount(animated(), "hh2");
    expect(m.host.querySelector("[data-scene-editor]")).toBeTruthy();
    expect(m.text()).toContain("La maison");
    const rows = [...m.host.querySelectorAll("[data-scene-row]")].map((r) => r.getAttribute("data-scene-row"));
    expect(rows).toEqual(["photo", "hh2", "stats"]);
    expect(m.host.querySelector('[data-scene-row="photo"] [data-scene-bar]')).toBeTruthy();
    act(() => { m.host.querySelector<HTMLButtonElement>("[data-scene-add] > button")!.click(); });
    // La liste est rendue hors de la zone qui défile (sinon elle y est rognée) : on la cherche dans le document.
    expect([...document.querySelectorAll("[data-scene-add-item]")].map((b) => b.getAttribute("data-scene-add-item"))).toEqual(["pp2"]);
    // Échap referme la liste (et la retire du document, qui est partagé entre les tests).
    act(() => { window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })); });
    expect(document.querySelector("[data-scene-add-item]")).toBeNull();
  });

  it("dans la liste des éléments à ajouter, survoler un nom le montre dans l'aperçu (cadre en pointillé) ; sortir l'efface", () => {
    const m = mount(animated(), "hh2");
    act(() => { m.host.querySelector<HTMLButtonElement>("[data-scene-add] > button")!.click(); });
    const item = document.querySelector<HTMLElement>('[data-scene-add-item="pp2"]')!;
    act(() => { item.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); });
    act(() => { item.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })); });
    expect(m.hovers).toEqual(["pp2", null]);
    act(() => { window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })); });
  });

  it("l'élément sélectionné a sa ligne même s'il ne bouge pas encore, avec « Faire apparaître »", () => {
    const m = mount(animated(), "pp2");
    const rows = [...m.host.querySelectorAll("[data-scene-row]")].map((r) => r.getAttribute("data-scene-row"));
    expect(rows).toEqual(["photo", "hh2", "pp2", "stats"]);
    expect(m.host.querySelector('[data-scene-row="pp2"]')!.textContent).toContain("Faire apparaître");
  });

  it("l'élément sélectionné montre ses images-clés ; cliquer une autre ligne la sélectionne", () => {
    const m = mount(animated(), "hh2");
    expect(m.host.querySelectorAll('[data-scene-row="hh2"] [data-scene-kf]').length).toBe(2);
    expect(m.host.querySelectorAll('[data-scene-row="photo"] [data-scene-kf]').length).toBe(0);
    act(() => { m.host.querySelector<HTMLElement>('[data-scene-name-of="photo"]')!.click(); });
    expect(m.selected).toEqual(["photo"]);
  });

  it("« Ajouter un élément » crée son apparition, après l'élément qui le précède dans la page", () => {
    const m = mount(animated(), "hh2");
    act(() => { m.host.querySelector<HTMLButtonElement>("[data-scene-add] > button")!.click(); });
    act(() => { document.querySelector<HTMLElement>('[data-scene-add-item="pp2"]')!.click(); });
    const ap = appearanceOf(m.current(), "pp2");
    expect(ap).toBeTruthy();
    expect(ap!.begin).toEqual({ kind: "after", node: "hh2" });
    expect(m.selected).toContain("pp2");
  });

  it("la tête de lecture se pose en cliquant la règle et montre cet instant dans l'aperçu ; « + » y pose une image-clé", () => {
    const m = mount(animated(), "hh2");
    const rail = m.host.querySelector<HTMLElement>("[data-scene-rail]")!;
    rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    // La règle laisse de la marge après la fin : une scène de 1 300 ms se règle sur 2 000 ms ; à 50 %, 1 000 ms.
    expect(rail.getAttribute("aria-valuemax")).toBe("2000");
    act(() => { rail.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: 500, button: 0 })); });
    expect(m.scrubs[m.scrubs.length - 1]).toBe(1000);
    const add = m.buttons().find((b) => (b.getAttribute("aria-label") ?? "").includes("Fixer l'état ici"))!;
    expect(add.textContent).toContain("Fixer l'état");
    act(() => { add.click(); });
    const ap = appearanceOf(m.current(), "hh2")!;
    expect(ap.track.keyframes.map((k) => k.at)).toContain(1000);
  });

  it("la règle se zoome (boutons, ⌘ + molette) : la scène s'élargit et défile, la marge après la fin permet de tirer au-delà", () => {
    const m = mount(animated(), "hh2");
    const editor = m.host.querySelector("[data-scene-editor]")!;
    expect(editor.getAttribute("data-scene-zoom")).toBe("1");
    // Progressif : un bouton fait ×1,25 ; la molette (⌘ ou ⌃) un facteur doux, continu.
    act(() => { m.buttons().find((b) => (b.getAttribute("aria-label") ?? "").startsWith("Zoomer"))!.click(); });
    expect(editor.getAttribute("data-scene-zoom")).toBe("1.25");
    expect(m.host.querySelector<HTMLElement>("[data-scene-lanes]")!.style.width).toBe("125%");
    const lanes = m.host.querySelector<HTMLElement>("[data-scene-scroll]")!;
    const wheel = (deltaY: number) => { const ev = new WheelEvent("wheel", { bubbles: true, cancelable: true }); Object.defineProperty(ev, "deltaY", { value: deltaY }); Object.defineProperty(ev, "ctrlKey", { value: true }); lanes.dispatchEvent(ev); };
    // Un cran de molette (Δ = 100) fait ×1,28 ; le zoom ne descend pas sous ×1 ; l'événement est consommé (le navigateur ne zoome pas la page).
    act(() => { wheel(100); });
    expect(editor.getAttribute("data-scene-zoom")).toBe("1");
    act(() => { wheel(-100); });
    expect(Number(editor.getAttribute("data-scene-zoom"))).toBeCloseTo(1.28, 2);
    act(() => { wheel(-100); });
    expect(Number(editor.getAttribute("data-scene-zoom"))).toBeCloseTo(1.64, 2);
    const ev = new WheelEvent("wheel", { bubbles: true, cancelable: true }); Object.defineProperty(ev, "deltaY", { value: -100 }); Object.defineProperty(ev, "ctrlKey", { value: true });
    act(() => { lanes.dispatchEvent(ev); });
    expect(ev.defaultPrevented).toBe(true);
  });

  it("l'état de l'élément a sa place fixe à droite : « Fixer l'état ici » et « Supprimer » toujours présents, l'un ou l'autre actif ; « Lire » ne perd pas la tête de lecture", () => {
    const m = mount(animated(), "hh2");
    // À l'ouverture, la tête de lecture est à la fin du mouvement (1 300 ms), sur une image-clé : Supprimer actif, Ajouter inactif.
    const add = () => m.host.querySelector<HTMLButtonElement>('[data-scene-keyframe] [aria-label="Fixer l\'état ici (une image-clé)"]')!;
    const del = () => m.host.querySelector<HTMLButtonElement>('[data-scene-keyframe] [aria-label="Supprimer cet état (image-clé)"]')!;
    expect(add().disabled).toBe(true);
    expect(del().disabled).toBe(false);
    act(() => { m.buttons().find((b) => (b.textContent ?? "").trim() === "Lire")!.click(); });
    expect(m.text()).toMatch(/État fixé à 1\u202f300 ms/);
    expect(m.scrubs[m.scrubs.length - 1]).toBeNull();
    const rail = m.host.querySelector<HTMLElement>("[data-scene-rail]")!;
    rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    act(() => { rail.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: 250, button: 0 })); });
    expect(add().disabled).toBe(false);
    expect(del().disabled).toBe(true);
  });

  it("« Fixer un nouvel état » à côté du nom : toujours là ; à la tête de lecture si elle est libre, sinon juste après le dernier état", () => {
    const m = mount(animated(), "hh2");
    const btn = () => m.host.querySelector<HTMLButtonElement>('[data-scene-name-of="hh2"] ~ [aria-label="Fixer un nouvel état (image-clé)"], [data-scene-new-state]')!;
    expect(btn()).toBeTruthy();
    // La tête de lecture est sur le dernier état (1 300 ms) : le nouvel état va 200 ms plus loin, et la tête de lecture s'y place.
    act(() => { btn().click(); });
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 1300, 1500]);
    expect(m.scrubs[m.scrubs.length - 1]).toBe(1500);
    m.rerender(m.current(), "hh2");
    // Entre deux états (700 ms, libre) : le nouvel état se pose là. La règle fait maintenant 2 500 ms (scène de 1 500 ms plus la marge) : 28 % = 700 ms.
    const rail = m.host.querySelector<HTMLElement>("[data-scene-rail]")!;
    rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    act(() => { rail.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: 280, button: 0 })); });
    act(() => { btn().click(); });
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 700, 1300, 1500]);
    // Sur un état qui en a un après lui (700 → 1 300) : le nouveau se pose à mi-chemin.
    m.rerender(m.current(), "hh2");
    act(() => { btn().click(); });
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 700, 1000, 1300, 1500]);
  });

  it("un élément qui ne bouge pas encore : l'encart dit qu'il faut d'abord le faire apparaître", () => {
    const m = mount(animated(), "pp2");
    expect(m.host.querySelector("[data-scene-keyframe]")!.textContent).toMatch(/Faites d'abord apparaître/);
  });

  it("un état fixé (image-clé) se retire par son bouton « Supprimer » ou par Suppr sur son losange", () => {
    const m = mount(animated(), "hh2"); 
    const rail = m.host.querySelector<HTMLElement>("[data-scene-rail]")!;
    rail.getBoundingClientRect = () => ({ left: 0, width: 1000, top: 0, height: 20, right: 1000, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    act(() => { rail.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, clientX: 500, button: 0 })); });
    act(() => { m.buttons().find((b) => (b.getAttribute("aria-label") ?? "").includes("Fixer l'état ici"))!.click(); });
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 1000, 1300]);
    m.rerender(m.current(), "hh2");
    const del = m.buttons().find((b) => (b.getAttribute("aria-label") ?? "").includes("Supprimer cet état"))!;
    expect(del).toBeTruthy();
    act(() => { del.click(); });
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 1300]);
    m.rerender(m.current(), "hh2");
    const last = [...m.host.querySelectorAll<HTMLElement>('[data-scene-row="hh2"] [data-scene-kf]')].pop()!;
    act(() => { last.dispatchEvent(new KeyboardEvent("keydown", { key: "Delete", bubbles: true })); });
    // Il ne resterait qu'une image-clé, donc aucun mouvement : l'apparition est retirée, l'élément redevient immobile et le dit.
    expect(appearanceOf(m.current(), "hh2")).toBeUndefined();
    m.rerender(m.current(), "hh2");
    expect(m.host.querySelector('[data-scene-row="hh2"]')!.textContent).toContain("Faire apparaître");
  });

  it("à droite : les réglages de l'élément (Apparition, Vitesse, Démarre, Délai) et l'image-clé à la tête de lecture", () => {
    const m = mount(animated(), "hh2");
    expect(m.text()).toContain("Apparition");
    expect(m.text()).toContain("Démarre");
    expect(m.text()).toContain("Délai");
    expect(m.host.querySelector("[data-scene-keyframe]")).toBeTruthy();
    expect(m.text()).toMatch(/État fixé à/);
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

/** Lot 2 : les barres et les losanges se tirent. Le rail mesure 1 000 px pour une règle de 2 000 ms (scène de 1 300 ms plus la marge) : 100 px = 200 ms. */
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
    expect(appearanceOf(m.current(), "photo")!.delay).toBe(200);
    expect(m.ops.length).toBe(1);
  });

  it("tirer le bord droit d'une barre change la durée", () => {
    const m = mount(animated(), "hh2"); railOf(m.host);
    drag(m.host.querySelector('[data-scene-row="hh2"] [data-scene-bar-end]')!, 500, 600);
    const ap = appearanceOf(m.current(), "hh2")!;
    expect(ap.end - ap.start).toBe(900);
  });

  it("tirer un losange déplace l'image-clé ; un simple clic place la tête de lecture sans rien changer", () => {
    const m = mount(animated(), "hh2"); railOf(m.host);
    const last = [...m.host.querySelectorAll('[data-scene-row="hh2"] [data-scene-kf]')].pop()!;
    drag(last, 900, 800);
    expect(appearanceOf(m.current(), "hh2")!.track.keyframes.map((k) => k.at)).toEqual([600, 1100]);
    const first = m.host.querySelector('[data-scene-row="hh2"] [data-scene-kf]')!;
    const before = m.ops.length;
    drag(first, 400, 402);
    expect(m.ops.length).toBe(before);
    expect(m.scrubs[m.scrubs.length - 1]).toBe(600);
  });

});

/** Lot 3 : le survol et le clic de l'élément se règlent dans le tiroir (retour au départ, bascule, pause…), et se retirent. */
describe("tiroir Animation : déclencheurs de l'élément", () => {
  beforeEach(() => { document.body.innerHTML = ""; });
  it("un survol posé sur l'élément apparaît dans « Déclencheurs » avec ses réglages, et un bouton le retire", () => {
    let s = animated();
    s = run(s, planQuickAnimation(s, node(s, "hh2"), "Survol", "grow"));
    const m = mount(s, "hh2");
    const section = m.host.querySelector("[data-scene-triggers]")!;
    expect(section).toBeTruthy();
    expect(section.textContent).toContain("Quand la souris passe dessus");
    expect(section.textContent).toContain("revient en arrière");
    const remove = [...section.querySelectorAll<HTMLButtonElement>("button")].find((b) => (b.getAttribute("aria-label") ?? "").includes("Retirer"))!;
    act(() => { remove.click(); });
    expect((findNode(m.current(), "hh2")!.node.triggers ?? []).some((t) => t.on === "hover")).toBe(false);
  });
  it("sans survol ni clic, pas de section", () => {
    const m = mount(animated(), "hh2");
    expect(m.host.querySelector("[data-scene-triggers]")).toBeNull();
  });
});
