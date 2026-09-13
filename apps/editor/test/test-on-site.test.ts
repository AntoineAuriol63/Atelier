// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { revealForTest, testOnSiteUrl } from "../src/lib/test-on-site";

describe("tester une animation sur le site (audit n°5 · R4)", () => {
  const calls: { top: number; behavior?: string }[] = [];
  beforeEach(() => {
    vi.useFakeTimers();
    calls.length = 0;
    (window as unknown as { innerHeight: number }).innerHeight = 800;
    window.scrollTo = ((o: ScrollToOptions) => { calls.push({ top: Math.round(o.top ?? 0), behavior: o.behavior }); }) as typeof window.scrollTo;
    document.body.innerHTML = `<div class="at-page"><section class="n-haut">Haut</section><section class="n-bas">Bas</section></div>`;
    const rect = (top: number, height: number) => () => ({ top, height, bottom: top + height, left: 0, right: 100, width: 100, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;
    document.querySelector<HTMLElement>(".n-haut")!.getBoundingClientRect = rect(100, 300);
    document.querySelector<HTMLElement>(".n-bas")!.getBoundingClientRect = rect(2000, 100);
  });
  afterEach(() => { vi.useRealTimers(); });

  it("l'adresse de l'onglet Aperçu porte l'élément à montrer", () => {
    expect(testOnSiteUrl("/preview/s1/la-carte", "n_42")).toBe("/preview/s1/la-carte?voir=n_42");
    expect(testOnSiteUrl("/preview/s1", undefined)).toBe("/preview/s1");
  });

  it("un élément plus bas dans la page : placé juste sous l'écran, puis amené au centre en défilant, pour que son animation se joue sous les yeux", () => {
    expect(revealForTest(document, "bas", { delay: 600 })).toBe(true);
    expect(calls).toEqual([{ top: 1160, behavior: "auto" }]);
    vi.advanceTimersByTime(600);
    expect(calls[1]).toEqual({ top: 1650, behavior: "smooth" });
    expect(document.querySelector("[data-atelier-test]")?.textContent).toContain("Survolez-le ou cliquez-le");
  });

  it("un élément déjà visible au chargement : pas de défilement, seulement le bandeau ; un élément introuvable : rien", () => {
    expect(revealForTest(document, "haut")).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(calls).toEqual([]);
    expect(document.querySelector("[data-atelier-test]")).not.toBeNull();
    expect(revealForTest(document, "absent")).toBe(false);
  });
});
