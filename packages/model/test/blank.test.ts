import { describe, it, expect } from "vitest";
import { blankSite, validateSite } from "../src";

describe("site vierge", () => {
  it("est valide et a une page d'accueil avec en-tête et pied de page", () => {
    const site = blankSite("site_test", "Boulangerie Martin");
    const r = validateSite(site);
    expect(r.ok ? [] : r.errors).toEqual([]);
    expect(site.pages[0]!.path).toBe("/");
    expect(site.pages[0]!.root.children!.map((c) => c.type)).toEqual(["instance", "box", "instance"]);
    expect(site.components.length).toBe(2);
  });
});
