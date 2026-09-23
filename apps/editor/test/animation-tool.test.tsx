// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planQuickAnimation, sampleSite } from "@atelier/model";
import { AnimationModePanel } from "../src/components/animation/AnimationModePanel";
import type { OpenTimeline } from "../src/lib/timeline";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * L'outil Animation (23 septembre 2026, chantier 3) : plus un mode, un tiroir sous le canevas. À gauche, ce que l'élément et la page lancent ;
 * à droite, la ligne de temps de l'animation ouverte, elle-même en deux colonnes (scène et pistes ; réglages de la piste et de l'image-clé).
 */
const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [{ id: "sec", type: "box", name: "Section", props: { tag: "section" }, children: [text("ttl", "Bonjour", "h2"), text("par", "Un texte")] }] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;

function mount(site: Site, selected: string, open: OpenTimeline) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => {
    createRoot(host).render(createElement(AnimationModePanel, { site, node: node(site, selected), commit: () => {}, page: site.pages[0]!, getSite: () => site, bp: "base", open, onOpen: () => {}, scrub: () => {}, onSelect: () => {} }));
  });
  return { host, text: () => host.textContent ?? "" };
}

describe("outil Animation", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("sans animation ouverte : les déclencheurs à gauche, une invitation à droite", () => {
    const m = mount(base, "ttl", null);
    expect(m.host.querySelector("[data-animation-tool]")).toBeTruthy();
    expect(m.text()).toContain("Animations lancées par Titre 2 « Bonjour »");
    expect(m.host.querySelector("[data-timeline-stage]")).toBeNull();
    expect(m.host.querySelector("[data-animation-empty]")).toBeTruthy();
  });

  it("animation ouverte : la ligne de temps à droite, en deux colonnes (scène et pistes ; réglages)", () => {
    const site = applyOps(base, planQuickAnimation(base, node(base, "ttl"), "Apparition", "fade-up")).site;
    const ap = appearanceOf(site, "ttl")!;
    const m = mount(site, "ttl", { animationId: ap.animation.id, hostId: ap.hostId, triggerId: ap.trigger.id });
    const stage = m.host.querySelector("[data-timeline-stage]");
    const settings = m.host.querySelector("[data-timeline-settings]");
    expect(stage).toBeTruthy();
    expect(settings).toBeTruthy();
    expect(stage!.parentElement).toBe(settings!.parentElement);
    expect(stage!.querySelector("[data-anim-name]")).toBeTruthy();
    expect(m.host.querySelector("[data-animation-empty]")).toBeNull();
  });
});
