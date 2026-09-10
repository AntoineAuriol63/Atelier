// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { applyInstantStates } from "@atelier/renderer";

describe("état d'arrivée dans l'éditeur", () => {
  it("pose les styles d'arrivée et masque les éléments « au chargement », sans transition", () => {
    document.body.innerHTML = `<div class="at-page" data-editor="">
      <h1 data-ix='[{"t":"inView","o":{"reveal":"fade-up","once":true},"a":[{"k":"style","css":"opacity:1;transform:none","tr":"800ms ease 0ms"}]}]'>Titre</h1>
      <p class="n-rep" data-ix='[{"t":"load","a":[{"k":"hide"}]}]'>Réponse</p>
      <button data-ix='[{"t":"click","a":[{"k":"toggle","s":".n-rep"}]}]'>Question</button>
    </div>`;
    applyInstantStates(document);
    const h1 = document.querySelector("h1")!;
    expect(h1.style.opacity).toBe("1");
    expect(h1.style.transition).toBe("none");
    expect(document.querySelector(".n-rep")!.hasAttribute("data-ix-hidden")).toBe(true);
  });
});
