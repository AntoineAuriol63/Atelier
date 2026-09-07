import { describe, it, expect } from "vitest";
import { schema, sampleEntries } from "../src";

describe("entry", () => {
  it("valide les entrées d'exemple et refuse un statut inconnu", () => {
    for (const e of sampleEntries) expect(schema.entry.safeParse(e).success).toBe(true);
    expect(schema.entry.safeParse({ ...sampleEntries[0], status: "archived" }).success).toBe(false);
  });
});
