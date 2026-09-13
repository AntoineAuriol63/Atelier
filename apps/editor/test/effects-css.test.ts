import { describe, it, expect } from "vitest";
import { composeFilter, composeTransform, parseFilter, parseTransform } from "../src/lib/effects-css";

describe("transformations et filtres des panneaux Effets", () => {
  it("décompose et recompose une transformation simple ; une transformation inconnue reste du texte brut", () => {
    expect(parseTransform("translate(4px, -8px) rotate(15deg) scale(1.1)")).toEqual({ rotate: 15, scale: 1.1, x: 4, y: -8, raw: false });
    expect(parseTransform("none")).toEqual({ rotate: 0, scale: 1, x: 0, y: 0, raw: false });
    // Les préréglages écrivent translateX / translateY : ils se règlent avec les mêmes champs.
    expect(parseTransform("translateY(28px)")).toEqual({ rotate: 0, scale: 1, x: 0, y: 28, raw: false });
    expect(parseTransform("translateX(-40px) scale(0.92)")).toEqual({ rotate: 0, scale: 0.92, x: -40, y: 0, raw: false });
    expect(parseTransform("translateY(0)")).toMatchObject({ y: 0, raw: false });
    expect(parseTransform("skewX(10deg)").raw).toBe(true);
    expect(composeTransform({ rotate: 15, scale: 1.1, x: 4, y: -8 })).toBe("translate(4px, -8px) rotate(15deg) scale(1.1)");
  });
  it("revenir à l'identité retire la valeur du style, mais la pose en « none » sur une image-clé (sinon l'image-clé serait sautée)", () => {
    expect(composeTransform({ rotate: 0, scale: 1, x: 0, y: 0 })).toBeUndefined();
    expect(composeTransform({ rotate: 0, scale: 1, x: 0, y: 0 }, "none")).toBe("none");
    expect(composeFilter({ ...parseFilter(undefined) })).toBeUndefined();
    expect(composeFilter({ ...parseFilter(undefined) }, "none")).toBe("none");
    expect(composeFilter({ ...parseFilter("blur(4px) brightness(120%)") })).toBe("blur(4px) brightness(120%)");
  });
});
