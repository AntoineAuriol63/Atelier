// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Site } from "@atelier/model";
import { applyOps, planQuickAnimation, sampleSite } from "@atelier/model";
import { QuickAnimations } from "../src/components/animation/QuickAnimations";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const text = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } } });
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [text("titre", "Bonjour"), text("bouton", "Réserver")] } }] };
const node = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };

function mount(site: Site, id: string) {
  const played: string[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(QuickAnimations, { site, node: node(site, id), commit: () => {}, onPlay: (t) => { played.push(t); } })); });
  const buttons = [...host.querySelectorAll<HTMLButtonElement>("button")];
  return { host, played, buttons };
}

/**
 * Vague 4 des tests simulés : le triangle « Jouer » à côté des choix rapides est un dessin sans mot, jamais cliqué par les
 * débutantes (« un dessin tout seul, sur le site d'une amie, ça ne se clique pas »). Le bouton porte un mot : « Voir l'effet ».
 */
describe("choix rapides · voir l'effet", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("sans animation, aucun bouton « Voir l'effet »", () => {
    const m = mount(base, "titre");
    expect(m.buttons.filter((b) => /Voir l'effet/.test(b.textContent ?? ""))).toHaveLength(0);
  });

  it("une apparition posée : un bouton lisible « Voir l'effet » qui joue le déclencheur", () => {
    const site = applyOps(base, planQuickAnimation(base, node(base, "titre"), "Apparition", "fade-up")).site;
    const m = mount(site, "titre");
    const see = m.buttons.filter((b) => (b.textContent ?? "").trim() === "Voir l'effet");
    expect(see).toHaveLength(1);
    expect(see[0]!.title).toMatch(/aperçu/i);
    act(() => { see[0]!.click(); });
    expect(m.played).toEqual([node(site, "titre").triggers![0]!.id]);
    // Plus de bouton réduit à une icône « Jouer ».
    expect(m.buttons.some((b) => /^Jouer/.test(b.getAttribute("aria-label") ?? ""))).toBe(false);
  });

  it("un effet au survol : le même mot, pour le même geste", () => {
    const site = applyOps(base, planQuickAnimation(base, node(base, "bouton"), "Survol", "lift")).site;
    const m = mount(site, "bouton");
    expect(m.buttons.filter((b) => (b.textContent ?? "").trim() === "Voir l'effet")).toHaveLength(1);
  });
});
