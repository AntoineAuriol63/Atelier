// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { insideAnimationTool, isEditableTarget, undoTarget } from "../src/lib/keys";

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

  it("dans l'outil Animation, Suppr et les flèches ne touchent pas à l'élément sélectionné", () => {
    document.body.innerHTML = `<div data-animation-drawer=""><button id="in">piste</button></div><div id="out"><button id="b">ok</button></div>`;
    expect(insideAnimationTool(document.getElementById("in"))).toBe(true);
    expect(insideAnimationTool(document.getElementById("b"))).toBe(false);
    expect(insideAnimationTool(null)).toBe(false);
  });
});

describe("⌘Z parti d'un champ de saisie", () => {
  it("va au champ tant qu'il a une frappe à annuler, sinon au document ; jamais au navigateur (Safari rouvrirait l'onglet fermé)", () => {
    document.body.innerHTML = `<input id="i"><button id="b">ok</button>`;
    const key = (target: Element, key = "z", shiftKey = false) => ({ key, metaKey: true, ctrlKey: false, shiftKey, target });
    const i = document.getElementById("i")!, b = document.getElementById("b")!;
    expect(undoTarget(key(i), () => true)).toBe("field");
    expect(undoTarget(key(i), () => false)).toBe("document");
    expect(undoTarget(key(i), () => { throw new Error("pas de queryCommandEnabled"); })).toBe("document");
    // Hors d'un champ, le document ; une autre touche, rien.
    expect(undoTarget(key(b), () => true)).toBe("document");
    expect(undoTarget(key(i, "x"), () => true)).toBeNull();
    expect(undoTarget({ key: "z", metaKey: false, ctrlKey: false, shiftKey: false, target: i }, () => true)).toBeNull();
    // ⌘⇧Z (rétablir) suit la même règle, avec ce que le champ peut rétablir.
    expect(undoTarget(key(i, "z", true), (cmd) => cmd === "redo")).toBe("field");
    expect(undoTarget(key(i, "z", true), (cmd) => cmd === "undo")).toBe("document");
  });
});
