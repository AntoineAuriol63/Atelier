// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { revealBelowStage } from "../src/components/animation/reveal";

/**
 * Vague 4 des tests simulés (P2, T4) : la scène collante en haut de la ligne de temps grandit d'une rangée par piste ; quand le
 * panneau est un peu défilé, elle recouvre l'en-tête « Piste » et le champ « Départ », que la participante n'a jamais retrouvés.
 * Quand la piste change, ses réglages sont ramenés sous la scène.
 */
describe("réglages de la piste ramenés sous la scène collante", () => {
  it("pose une marge de défilement de la hauteur de la scène et fait défiler jusqu'aux réglages", () => {
    const stage = document.createElement("div");
    Object.defineProperty(stage, "offsetHeight", { value: 264 });
    const section = document.createElement("section");
    const scroll = vi.fn();
    section.scrollIntoView = scroll;
    revealBelowStage(section, stage);
    expect(section.style.scrollMarginTop).toBe("272px");
    expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
  });
  it("sans scène ni section, ne fait rien", () => {
    const section = document.createElement("section");
    const scroll = vi.fn();
    section.scrollIntoView = scroll;
    revealBelowStage(section, null);
    expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
    expect(section.style.scrollMarginTop).toBe("");
    expect(() => revealBelowStage(null, null)).not.toThrow();
  });
});
