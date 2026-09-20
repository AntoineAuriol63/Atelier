// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planQuickAnimation, sampleSite } from "@atelier/model";
import { QuickAnimations } from "../src/components/animation/QuickAnimations";
import { Timeline } from "../src/components/animation/Timeline";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
// La ligne de temps mesure sa règle : le DOM simulé n'a pas d'observateur de taille.
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class { observe() {} disconnect() {} unobserve() {} };

const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const withPhoto = applyOps(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "fade")).site;

function mountQuick(site: Site, id: string) {
  const tested: (string | undefined)[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(QuickAnimations, { site, node: node(site, id), commit: () => {}, onTestOnSite: (n) => { tested.push(n); } })); });
  const buttons = () => [...host.querySelectorAll<HTMLButtonElement>("button")];
  return { host, tested, buttons, text: () => host.textContent ?? "" };
}

/** Vague 4 : trois aides du lot 7 n'ont été trouvées par personne ; « Tester sur le site » n'existait pas avant la première animation. */
describe("faire découvrir ce qui existe (lot 8, temps 3)", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("« Pareil pour… » nomme les éléments qui suivent, dit ce qu'il copie, et vient juste sous l'effet", () => {
    const m = mountQuick(withPhoto, "photo");
    const b = m.buttons().find((x) => /^Pareil pour /.test(x.textContent ?? ""));
    expect(b).toBeTruthy();
    expect(b!.textContent).toContain("Titre 2 « Une cuisine »");
    expect(b!.textContent).toContain("« Chiffres »");
    expect(b!.title).toMatch(/même effet/);
    expect(b!.title).toMatch(/120 ms/);
    // Avant la ligne « Démarre » : pas repoussé hors de vue par les réglages et la phrase de résumé.
    const start = [...m.host.querySelectorAll("span")].find((s) => s.textContent === "Démarre");
    expect(start).toBeTruthy();
    expect(b!.compareDocumentPosition(start!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("« Tester sur le site » existe avant toute animation", () => {
    const m = mountQuick(base, "hh2");
    const b = m.buttons().find((x) => (x.textContent ?? "").includes("Tester sur le site"));
    expect(b).toBeTruthy();
    act(() => { b!.click(); });
    expect(m.tested).toEqual([undefined]);
  });

  it("la ligne de temps dit que l'aperçu suit la tête de lecture, et « Tester sur le site » y est un bouton", () => {
    const ap = appearanceOf(withPhoto, "photo")!;
    const host = document.createElement("div");
    document.body.appendChild(host);
    act(() => {
      createRoot(host).render(createElement(Timeline, {
        site: withPhoto, getSite: () => withPhoto, animation: ap.animation, hostId: "photo", trigger: ap.trigger, selected: node(withPhoto, "photo"), bp: "base",
        commit: () => {}, scrub: () => {}, onClose: () => {}, onSelect: () => {}, onTestOnSite: () => {},
      }));
    });
    expect(host.textContent).toMatch(/L'aperçu montre l'instant de la tête de lecture/);
    const b = [...host.querySelectorAll<HTMLButtonElement>("button")].find((x) => (x.textContent ?? "").includes("Tester sur le site"));
    expect(b).toBeTruthy();
    expect(b!.closest("p")).toBeNull();
  });
});
