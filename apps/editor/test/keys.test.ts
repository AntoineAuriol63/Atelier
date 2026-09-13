// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { isEditableTarget } from "../src/lib/keys";

describe("raccourcis de l'éditeur", () => {
  it("une touche partie d'un champ appartient au champ, même s'il s'est quitté entre-temps (Entrée qui valide un nombre)", () => {
    document.body.innerHTML = `<input id="i"><textarea id="t"></textarea><select id="s"></select><div id="e" contenteditable="true"><span id="in">x</span></div><button id="b">ok</button><div id="d"></div>`;
    const $ = (id: string) => document.getElementById(id);
    expect(isEditableTarget($("i"))).toBe(true);
    expect(isEditableTarget($("t"))).toBe(true);
    expect(isEditableTarget($("s"))).toBe(true);
    expect(isEditableTarget($("in"))).toBe(true);
    expect(isEditableTarget($("b"))).toBe(false);
    expect(isEditableTarget($("d"))).toBe(false);
    expect(isEditableTarget(document.body)).toBe(false);
    expect(isEditableTarget(null)).toBe(false);
    expect(isEditableTarget(window)).toBe(false);
  });

  it("Entrée validée dans un champ qui se quitte lui-même : l'écouteur de la fenêtre voit encore le champ comme cible", () => {
    document.body.innerHTML = `<input id="n">`;
    const input = document.getElementById("n") as HTMLInputElement;
    input.focus();
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") input.blur(); });
    let seen: { editable: boolean; activeIsBody: boolean } | null = null;
    const onWindow = (e: KeyboardEvent) => { seen = { editable: isEditableTarget(e.target), activeIsBody: document.activeElement === document.body }; };
    window.addEventListener("keydown", onWindow);
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    window.removeEventListener("keydown", onWindow);
    expect(seen).toEqual({ editable: true, activeIsBody: true });
  });
});
