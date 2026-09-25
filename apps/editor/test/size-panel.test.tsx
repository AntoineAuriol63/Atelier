// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { StyleValue } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { SizePanel } from "../src/components/design/SizePanel";
import { LayoutPanel } from "../src/components/design/LayoutPanel";
import type { StyleApi } from "../src/components/design/useStyle";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** 25 septembre 2026 (questions d'Antoine sur le héros) : une largeur se tape directement ; « Étendre » partage à égalité ; on dit d'où vient la largeur. */
function fakeStyle(values: Record<string, StyleValue | undefined> = {}) {
  const calls: [string, StyleValue | undefined][] = [];
  const api = {
    resolved: {}, get: () => undefined, value: (p: string) => values[p], source: () => undefined,
    set: (p: string, v: StyleValue | undefined) => { calls.push([p, v]); values[p] = v; }, reset: () => {}, scrub: () => () => {}, title: () => "",
    bp: "base", target: { kind: "node", id: "x" }, bpName: () => "Base",
  } as unknown as StyleApi;
  return { api, calls };
}
const roots: { unmount: () => void }[] = [];
afterEach(() => { act(() => { roots.splice(0).forEach((r) => r.unmount()); }); document.body.innerHTML = ""; });
function mount(el: React.ReactElement) {
  const host = document.createElement("div"); document.body.appendChild(host);
  const root = createRoot(host); roots.push(root);
  act(() => { root.render(el); });
  return host;
}
const typeAndEnter = (input: HTMLInputElement, v: string) => act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!; setter.call(input, v); input.dispatchEvent(new Event("input", { bubbles: true })); input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); });

describe("Dimensions", () => {
  it("la largeur se tape directement, même en « Auto » ; les fractions et Ajustée / Remplit remplissent ou vident le même champ", () => {
    const { api, calls } = fakeStyle();
    const host = mount(createElement(SizePanel, { site: sampleSite, style: api }));
    const input = host.querySelector<HTMLInputElement>('[data-prop="width"] input')!;
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe("auto");
    typeAndEnter(input, "40%");
    expect(calls).toContainEqual(["width", "40%"]);
    act(() => { [...host.querySelectorAll("button")].find((b) => b.textContent === "½")!.click(); });
    expect(calls[calls.length - 1]).toEqual(["width", "50%"]);
    act(() => { [...host.querySelectorAll("button")].find((b) => b.textContent === "Ajustée")!.click(); });
    expect(calls[calls.length - 1]).toEqual(["width", "fit-content"]);
    // Le champ de hauteur aussi.
    expect(host.querySelector('[data-prop="height"] input')).toBeTruthy();
  });

  it("dit d'où vient la largeur quand le parent est une grille ou une ligne, avec un bouton vers le parent", () => {
    const { api } = fakeStyle();
    const selected: string[] = [];
    const host = mount(createElement(SizePanel, { site: sampleSite, style: api, placement: { kind: "grid", parentId: "hero", parentLabel: "Héros", index: 0, count: 2, template: "1.1fr 1fr", tracks: 2, grow: false }, onSelectNode: (id: string) => selected.push(id) }));
    expect(host.textContent).toContain("Largeur décidée par « Héros » : colonne 1 sur 2 (1.1fr 1fr).");
    act(() => { [...host.querySelectorAll("button")].find((b) => (b.textContent ?? "").includes("Régler « Héros »"))!.click(); });
    expect(selected).toEqual(["hero"]);
    // Sans placement, pas de phrase.
    const plain = mount(createElement(SizePanel, { site: sampleSite, style: fakeStyle().api }));
    expect(plain.textContent).not.toContain("Largeur décidée");
  });
});

describe("Place dans son parent", () => {
  it("« Étendre » partage la ligne à égalité (base de largeur nulle) ; « Fixe » rend la largeur au contenu", () => {
    const { api, calls } = fakeStyle();
    const node = sampleSite.pages[0]!.root.children![0]!;
    const host = mount(createElement(LayoutPanel, { site: sampleSite, node, style: api, parentDisplay: "flex", parentDirection: "row", leaf: true }));
    const open = host.querySelector<HTMLButtonElement>('[data-section="Place dans son parent"] button[aria-expanded]')!;
    if (open.getAttribute("aria-expanded") !== "true") act(() => { open.click(); });
    act(() => { [...host.querySelectorAll("button")].find((b) => b.textContent === "Étendre")!.click(); });
    expect(calls).toContainEqual(["flexGrow", "1"]);
    expect(calls).toContainEqual(["flexBasis", "0%"]);
    act(() => { [...host.querySelectorAll("button")].find((b) => b.textContent === "Fixe")!.click(); });
    expect(calls).toContainEqual(["flexGrow", "0"]);
    expect(calls).toContainEqual(["flexBasis", undefined]);
  });
});
