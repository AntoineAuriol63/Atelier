// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { NumberInput } from "../src/ui/Inputs";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** Un champ chiffré monté dans un DOM simulé, avec ses appels enregistrés (vague 3 des tests simulés, § 5.3 : Entrée validait deux fois). */
function mount(value: number | "" = 500) {
  const calls: (number | "")[] = [];
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);
  act(() => { root.render(createElement(NumberInput, { value, unit: "ms", onValueChange: (v) => calls.push(v) })); });
  const input = host.querySelector("input")!;
  const type = (text: string) => act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!; setter.call(input, text); input.dispatchEvent(new Event("input", { bubbles: true })); });
  const key = (k: string) => act(() => { input.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })); });
  const focus = () => act(() => { input.focus(); });
  const blur = () => act(() => { input.blur(); });
  return { calls, input, type, key, focus, blur, unmount: () => act(() => root.unmount()) };
}

describe("champ chiffré", () => {
  beforeEach(() => { document.body.innerHTML = ""; });
  it("une saisie validée par Entrée produit une seule valeur, même si le champ perd ensuite le focus", () => {
    const f = mount(500);
    f.focus(); f.type("1500"); f.key("Enter"); f.blur();
    expect(f.calls).toEqual([1500]);
    f.unmount();
  });
  it("quitter le champ après une saisie la valide une fois ; Échap l'abandonne", () => {
    const f = mount(500);
    f.focus(); f.type("900"); f.blur();
    expect(f.calls).toEqual([900]);
    f.focus(); f.type("4000"); f.key("Escape"); f.blur();
    expect(f.calls).toEqual([900]);
    expect(f.input.value).toBe("500");
    f.unmount();
  });
});
