// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Trigger } from "@atelier/model";
import { TriggerSettings } from "../src/components/animation/TriggerSettings";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * Vague 4 des tests simulés : les interrupteurs du déclencheur portaient un libellé qui décrivait l'état courant (« une seule fois »
 * décoché, « se coupe » décoché) et se lisaient à l'envers. Un interrupteur dit ce que coche la case, toujours le même mot.
 */
function mount(trigger: Trigger) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => { createRoot(host).render(createElement(TriggerSettings, { trigger, onUpdate: () => {} })); });
  const toggles = [...host.querySelectorAll<HTMLLabelElement>("label")].filter((l) => l.querySelector("input[type=checkbox]")).map((l) => ({ text: l.textContent?.trim(), checked: l.querySelector("input")!.checked }));
  const fields = [...host.querySelectorAll<HTMLElement>("[data-field-label], label, span")].map((e) => e.textContent?.trim()).filter(Boolean);
  return { toggles, text: host.textContent ?? "", fields };
}

describe("réglages d'un déclencheur · libellés des interrupteurs", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("« Rejouer » : la case dit « à chaque passage », cochée ou non", () => {
    const off = mount({ id: "t", on: "inView", animation: "a" });
    expect(off.toggles.find((t) => t.text === "à chaque passage")).toEqual({ text: "à chaque passage", checked: false });
    expect(off.text).not.toContain("une seule fois");
    const on = mount({ id: "t", on: "inView", animation: "a", once: false });
    expect(on.toggles.find((t) => t.text === "à chaque passage")).toEqual({ text: "à chaque passage", checked: true });
  });

  it("au survol : la case dit « revient en arrière » sous « Quand la souris part », cochée ou non ; « se coupe » n'apparaît plus", () => {
    const off = mount({ id: "t", on: "hover", animation: "a" });
    expect(off.toggles.find((t) => t.text === "revient en arrière")).toEqual({ text: "revient en arrière", checked: false });
    expect(off.text).not.toContain("se coupe");
    expect(off.text).toContain("Quand la souris part");
    const on = mount({ id: "t", on: "hover", animation: "a", reverseOnLeave: true });
    expect(on.toggles.find((t) => t.text === "revient en arrière")).toEqual({ text: "revient en arrière", checked: true });
  });

  it("au clic : la case dit « revient en arrière » sous « Clic suivant », cochée ou non", () => {
    const off = mount({ id: "t", on: "click", animation: "a" });
    expect(off.toggles.find((t) => t.text === "revient en arrière")).toEqual({ text: "revient en arrière", checked: false });
    const on = mount({ id: "t", on: "click", animation: "a", toggle: true });
    expect(on.toggles.find((t) => t.text === "revient en arrière")).toEqual({ text: "revient en arrière", checked: true });
  });

  it("pause au survol : la case dit « en pause au survol », cochée ou non", () => {
    const off = mount({ id: "t", on: "load", animation: "a" });
    expect(off.toggles.find((t) => t.text === "en pause au survol")).toEqual({ text: "en pause au survol", checked: false });
    expect(off.text).not.toContain("continue");
  });
});
