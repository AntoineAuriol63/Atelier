// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { CanvasBar, type CanvasBarProps } from "../src/components/CanvasBar";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * La barre du canevas (23 septembre 2026) : tout ce qui règle la vue de l'aperçu quitte la barre du haut et vit au-dessus du canevas,
 * où il rétrécit avec lui au lieu de pousser « Publier » hors de l'écran.
 */
function mount(over: Partial<CanvasBarProps> = {}) {
  const calls: string[] = [];
  const props: CanvasBarProps = {
    presets: [{ id: "base", label: "Bureau", width: 1280 }, { id: "tablet", label: "Tablette", width: 900 }, { id: "mobile", label: "Mobile", width: 390 }],
    preset: "base", customWidth: null, onPreset: (id) => calls.push(`preset:${id}`), onCustomWidth: (w) => calls.push(`width:${w}`),
    effective: 1280, minWidth: 320, maxWidth: 4000, breakpoint: "Tous les écrans", scale: 1,
    editMode: "design", showGrid: false, onToggleGrid: () => calls.push("grid"),
    compare: false, onCompare: () => calls.push("compare"),
    modes: [{ id: "light", name: "Clair" }, { id: "dark", name: "Sombre" }], mode: "light", onMode: (m) => calls.push(`mode:${m}`),
    focus: false, onFocus: () => calls.push("focus"),
    ...over,
  };
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(CanvasBar, props)); });
  const button = (label: string) => [...host.querySelectorAll<HTMLButtonElement>("button")].find((b) => (b.getAttribute("aria-label") ?? b.textContent ?? "").includes(label));
  return { host, calls, button, text: () => host.textContent ?? "" };
}

describe("barre du canevas", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("en Design : la largeur, la taille d'écran modifiée, la grille, la comparaison, clair/sombre et la concentration", () => {
    const m = mount();
    expect(m.host.querySelector("[data-canvas-bar]")).toBeTruthy();
    expect(m.text()).toMatch(/Vous modifiez :\s*Tous les écrans/);
    act(() => { m.button("grille")!.click(); });
    act(() => { m.button("Comparer")!.click(); });
    act(() => { m.button("sombre")!.click(); });
    act(() => { m.button("concentration")!.click(); });
    expect(m.calls).toEqual(["grid", "compare", "mode:dark", "focus"]);
    const select = m.host.querySelector<HTMLSelectElement>("select")!;
    expect(select.value).toBe("base");
  });

  it("en Écriture : ni taille d'écran modifiée, ni grille, ni comparaison ; la largeur, clair/sombre et la concentration restent", () => {
    const m = mount({ editMode: "write" });
    expect(m.text()).not.toContain("Vous modifiez");
    expect(m.button("grille")).toBeUndefined();
    expect(m.button("Comparer")).toBeUndefined();
    expect(m.host.querySelector("select")).toBeTruthy();
    expect(m.button("sombre")).toBeTruthy();
    expect(m.button("concentration")).toBeTruthy();
  });

  it("dit la réduction quand l'aperçu ne tient pas, et la largeur libre quand elle est saisie", () => {
    const m = mount({ scale: 0.5, customWidth: 1000, effective: 1000 });
    expect(m.text()).toContain("50 %");
    expect(m.host.querySelector<HTMLSelectElement>("select")!.value).toBe("");
  });

  it("une page par entrée : le choix de l'entrée affichée est dans la barre du canevas", () => {
    const m = mount({ entries: [{ id: "e1", label: "Léa et Tom" }, { id: "e2", label: "Nina" }], entry: "e2", onEntry: () => {} });
    const selects = [...m.host.querySelectorAll<HTMLSelectElement>("select")];
    expect(selects.some((s) => s.value === "e2")).toBe(true);
    expect(m.text()).toContain("Entrée");
  });
});
