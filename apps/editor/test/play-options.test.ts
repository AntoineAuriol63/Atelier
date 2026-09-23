import { describe, it, expect } from "vitest";
import { playOptions } from "../src/lib/play";

/**
 * « Voir l'effet » (23 septembre 2026, constat d'Antoine : « le délai ne marche pas ») : pendant le délai d'une piste, l'élément
 * doit être tenu à son état de départ (invisible pour une apparition), sinon il reste visible puis clignote. Après l'animation, il
 * revient à son état de repos, celui que l'éditeur pose lui-même : `fill: backwards`, jamais `none` ni `both`.
 */
describe("options de lecture dans l'éditeur", () => {
  it("tient l'état de départ pendant le délai, rend l'état de repos après", () => {
    expect(playOptions({ loop: 1 })).toEqual({ iterations: 1, fill: "backwards" });
  });
  it("une boucle infinie se joue trois fois, pas pour toujours", () => {
    expect(playOptions({ loop: "infinite" })).toEqual({ iterations: 3, fill: "backwards" });
    expect(playOptions({ loop: 4 })).toEqual({ iterations: 4, fill: "backwards" });
  });
});
