import { describe, it, expect } from "vitest";
import { migrate, SCHEMA_VERSION, sampleSite } from "../src";

describe("migration de schéma", () => {
  it("laisse un document à jour tel quel", () => {
    expect(migrate(sampleSite)).toBe(sampleSite);
    expect(SCHEMA_VERSION).toBe(1);
  });
  it("refuse une version plus récente que le code, et un document illisible", () => {
    expect(() => migrate({ ...sampleSite, schemaVersion: 99 })).toThrow(/plus récente/);
    expect(() => migrate(null)).toThrow();
  });
});
