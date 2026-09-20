// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Node, Op, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, restaurantSite } from "@atelier/model";
import { QuickAnimations } from "../src/components/animation/QuickAnimations";
import { InstancePanel } from "../src/components/design/ComponentPanels";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const node = (site: Site, id: string): Node => findNode(site, id)!.node;

function mountQuick(site: Site, id: string) {
  const ops: Op[] = [];
  const selected: string[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(QuickAnimations, { site, node: node(site, id), commit: (op) => { ops.push(op); }, onSelectNode: (n) => { selected.push(n); } })); });
  const applied = () => ops.reduce((s, op) => applyOps(s, [op]).site, site);
  return { host, ops, selected, applied, text: () => host.textContent ?? "" };
}

/**
 * Vague 4 des tests simulés, PR2 : le groupe des trois chiffres n'est atteint par personne ; le clic donne un chiffre, l'écran d'occurrence
 * de composant fait fuir. Depuis un chiffre, la rubrique Animation propose le groupe et l'applique.
 */
describe("choix rapides · le groupe depuis un enfant", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("sur un chiffre : le groupe est nommé, ses membres comptés, et un effet choisi ici fait arriver les trois un à un", () => {
    const m = mountQuick(restaurantSite, "rh_stat1");
    expect(m.text()).toContain("groupe « Chiffres »");
    expect(m.text()).toMatch(/3 éléments|les 3/);
    const select = [...m.host.querySelectorAll<HTMLSelectElement>("select")].find((s) => [...s.options].some((o) => o.textContent === "Chacun à part"));
    expect(select).toBeTruthy();
    act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!; setter.call(select, "rise-bounce"); select!.dispatchEvent(new Event("change", { bubbles: true })); });
    const s = m.applied();
    const ap = appearanceOf(s, "rh_stats");
    expect(ap?.preset?.id).toBe("rise-bounce");
    expect(ap?.detail).toBe("children");
    expect(appearanceOf(s, "rh_stat1")).toBeUndefined();
  });

  it("un bouton mène au groupe pour le régler", () => {
    const m = mountQuick(restaurantSite, "rh_stat2");
    const b = [...m.host.querySelectorAll<HTMLButtonElement>("button")].find((x) => (x.textContent ?? "").includes("Régler sur « Chiffres »"));
    expect(b).toBeTruthy();
    act(() => { b!.click(); });
    expect(m.selected).toEqual(["rh_stats"]);
  });

  it("sur un élément sans voisins du même genre : rien de tel", () => {
    const m = mountQuick(restaurantSite, "rh_about_h2");
    expect(m.text()).not.toContain("groupe «");
  });
});

describe("occurrence d'un composant : dire d'abord ce qu'on peut faire ici", () => {
  beforeEach(() => { document.body.innerHTML = ""; });
  it("l'aide de la section commence par ce qui est propre à l'occurrence, l'avertissement vient après", () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    act(() => { createRoot(host).render(createElement(InstancePanel, { site: restaurantSite, node: node(restaurantSite, "rh_stat1"), commit: () => {} })); });
    const text = host.textContent ?? "";
    expect(text).toContain("Cette occurrence a ses propres valeurs, ses propres animations");
    expect(text.indexOf("Cette occurrence")).toBeLessThan(text.indexOf("composant change"));
    expect(text).not.toContain("Modifier le composant change toutes ses instances.");
  });
});
