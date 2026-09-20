// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Site } from "@atelier/model";
import { applyOps, findNode, planAppearanceDelay, planGroupAppearance, planQuickAnimation, sampleSite } from "@atelier/model";
import { QuickAnimations } from "../src/components/animation/QuickAnimations";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts"), box("c3", "Producteurs")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const run = (site: Site, ops: ReturnType<typeof planQuickAnimation>) => applyOps(site, ops).site;
function separate(): Site {
  let s = run(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "slide-right"));
  s = run(s, planQuickAnimation(s, node(s, "hh2"), "Apparition", "fade-up")); s = run(s, planAppearanceDelay(s, "hh2", 600));
  s = run(s, planGroupAppearance(s, "c1", "rise-bounce"));
  return s;
}

function mount(site: Site, id: string) {
  const selected: string[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(QuickAnimations, { site, node: node(site, id), commit: () => {}, onSelectNode: (n) => { selected.push(n); } })); });
  return { host, selected, text: () => host.textContent ?? "" };
}

describe("rubrique Animation d'une section : la scène entière", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("sur la section : chaque élément avec son départ et sa fin, le total, ce qui ne bouge pas, et l'avertissement d'ordre", () => {
    const m = mount(separate(), "about");
    const scene = m.host.querySelector("[data-scene]");
    expect(scene).toBeTruthy();
    const rows = [...scene!.querySelectorAll("[data-scene-row]")].map((r) => r.getAttribute("data-scene-row"));
    expect(rows).toEqual(["photo", "hh2", "stats"]);
    expect(m.text()).toMatch(/tout est fini à/);
    expect(m.text()).toContain("« Chiffres » part avant Titre 2 « Une cuisine »");
    expect(m.text()).toContain("Paragraphe « Aurèle et Nils » ne bouge pas");
    expect(m.text()).toMatch(/3 lancements séparés/);
  });

  it("sur un élément de la scène : un lien vers la section, pour voir la scène entière", () => {
    const m = mount(separate(), "hh2");
    const b = [...m.host.querySelectorAll<HTMLButtonElement>("button")].find((x) => (x.textContent ?? "").includes("Voir la scène de « La maison »"));
    expect(b).toBeTruthy();
    act(() => { b!.click(); });
    expect(m.selected).toEqual(["about"]);
  });

  it("sans scène (un seul élément animé), rien de tel", () => {
    const s = run(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "fade"));
    expect(mount(s, "about").host.querySelector("[data-scene]")).toBeNull();
    expect(mount(s, "photo").text()).not.toContain("Voir la scène");
  });
});
