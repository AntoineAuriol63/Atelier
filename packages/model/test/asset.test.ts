import { describe, it, expect } from "vitest";
import { schema } from "../src";

describe("asset", () => {
  it("accepte un nom et des déclinaisons optimisées", () => {
    const a = { id: "as_x", kind: "image", url: "/o.jpg", width: 3000, height: 2000, name: "Plage.jpg", mime: "image/jpeg", variants: [{ width: 480, height: 320, url: "/w480.webp", format: "webp" }, { width: 1600, url: "/w1600.webp", format: "webp" }] };
    expect(schema.asset.safeParse(a).success).toBe(true);
    expect(schema.asset.safeParse({ ...a, variants: [{ url: "/x" }] }).success).toBe(false);
  });
});
