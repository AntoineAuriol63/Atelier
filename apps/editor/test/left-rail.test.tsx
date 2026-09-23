// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { FileText, Images, Layers, Plus } from "lucide-react";
import { LeftRail } from "../src/components/LeftRail";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** Le rail d'icônes à gauche (23 septembre 2026, chantier 2) : un panneau par icône, l'icône active replie le panneau, les outils du site en bas. */
function mount(active: string | null) {
  const calls: string[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => {
    createRoot(host).render(createElement(LeftRail, {
      items: [{ id: "pages", label: "Pages", icon: FileText }, { id: "layers", label: "Calques", icon: Layers }, { id: "add", label: "Ajouter", icon: Plus }],
      active, onSelect: (id) => calls.push(`select:${id}`), onCollapse: () => calls.push("collapse"),
      tools: [{ id: "media", label: "Images du site", icon: Images, onClick: () => calls.push("media") }],
    }));
  });
  const button = (label: string) => [...host.querySelectorAll<HTMLButtonElement>("button")].find((b) => (b.getAttribute("aria-label") ?? "").includes(label))!;
  return { host, calls, button };
}

describe("rail de gauche", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("une icône par panneau, l'active enfoncée ; une autre icône ouvre son panneau, l'active replie le panneau", () => {
    const m = mount("layers");
    expect(m.button("Calques").getAttribute("aria-pressed")).toBe("true");
    expect(m.button("Pages").getAttribute("aria-pressed")).toBe("false");
    act(() => { m.button("Pages").click(); });
    act(() => { m.button("Calques").click(); });
    expect(m.calls).toEqual(["select:pages", "collapse"]);
  });

  it("panneau replié : aucune icône enfoncée, chaque icône rouvre son panneau", () => {
    const m = mount(null);
    expect([...m.host.querySelectorAll("[aria-pressed=true]")]).toHaveLength(0);
    act(() => { m.button("Ajouter").click(); });
    expect(m.calls).toEqual(["select:add"]);
  });

  it("les outils du site en bas : un clic lance l'outil sans toucher au panneau", () => {
    const m = mount("pages");
    act(() => { m.button("Images du site").click(); });
    expect(m.calls).toEqual(["media"]);
    expect(m.host.querySelector("[data-rail-tools]")).toBeTruthy();
  });

  it("l'infobulle d'une icône s'ouvre à sa droite, jamais hors de la fenêtre (le rail est collé au bord gauche)", () => {
    vi.useFakeTimers();
    const m = mount("pages");
    // Le clavier montre l'infobulle comme la souris : prendre le focus suffit.
    act(() => { m.button("Ajouter").focus(); });
    act(() => { vi.advanceTimersByTime(200); });
    const tip = document.querySelector<HTMLElement>("[role=tooltip]");
    expect(tip).toBeTruthy();
    expect(tip!.getAttribute("data-side")).toBe("right");
    vi.useRealTimers();
  });
});
