// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { restaurantSite, sampleSite, type Finding, type Site } from "@atelier/model";
import { CheckupSection } from "../src/components/CheckupSection";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function mount(site: Site) {
  const gone: Finding[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(CheckupSection, { site, onGoTo: (f) => { gone.push(f); } })); });
  return { host, gone, text: () => host.textContent ?? "", buttons: () => [...host.querySelectorAll<HTMLButtonElement>("button")] };
}

/** Le bilan dans la fenêtre Publier (23 septembre 2026) : les comptes, la liste repliée derrière eux, chaque constat mène à sa cible. */
describe("bilan avant publication dans la fenêtre Publier", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("dit les comptes en une phrase et n'ouvre la liste qu'à la demande", () => {
    const site = structuredClone(restaurantSite);
    delete site.assets.find((a) => a.id === "ras_t1")!.alt;
    const m = mount(site);
    expect(m.text()).toMatch(/1 point à corriger, \d+ à regarder/);
    expect(m.host.querySelector("[data-checkup-list]")).toBeNull();
    const open = m.buttons().find((b) => (b.textContent ?? "").includes("Voir le détail"));
    expect(open).toBeTruthy();
    act(() => { open!.click(); });
    const items = [...m.host.querySelectorAll("[data-checkup-item]")];
    expect(items.length).toBeGreaterThan(1);
    // À corriger d'abord, avec le nom de l'élément ; à regarder ensuite.
    expect(items[0]!.getAttribute("data-checkup-item")).toBe("fix");
    expect(items[0]!.textContent).toContain("texte alternatif");
    expect(items[0]!.textContent).toContain("Aurèle");
  });

  it("cliquer un constat mène à sa page et son élément ; un constat de réglages mène aux réglages du site", () => {
    const m = mount(sampleSite);
    act(() => { m.buttons().find((b) => (b.textContent ?? "").includes("Voir le détail"))!.click(); });
    const first = m.host.querySelector<HTMLElement>("[data-checkup-item] button")!;
    act(() => { first.click(); });
    expect(m.gone[0]).toMatchObject({ rule: "image-external", pageId: "p_home", nodeId: "hero_img" });
    const settings = [...m.host.querySelectorAll<HTMLButtonElement>("[data-checkup-item=look] button")].find((b) => (b.textContent ?? "").includes("Réglages du site"));
    expect(settings).toBeTruthy();
    act(() => { settings!.click(); });
    expect(m.gone[1]!.rule.startsWith("settings-")).toBe(true);
  });

  it("rien à signaler : une phrase, pas de bouton", () => {
    const site = structuredClone(sampleSite);
    site.settings.subdomain = "marie"; site.settings.seo.favicon = "as_hero"; site.settings.seo.image = "as_hero";
    for (const a of site.assets) a.variants = [{ width: 800, url: a.url, format: "webp" }];
    const m = mount(site);
    expect(m.text()).toContain("Rien à signaler");
    expect(m.buttons()).toHaveLength(0);
  });
});
