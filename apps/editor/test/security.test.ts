import { describe, expect, it } from "vitest";
import { privateAddress } from "../src/lib/safe-fetch";
import { safeStyleText } from "../src/components/LivePreview";
import { toCsv } from "../src/lib/csv";

describe("frontières de sécurité", () => {
  it("refuse les destinations réseau non publiques", () => {
    for (const ip of ["127.0.0.1", "10.0.0.4", "172.16.2.1", "192.168.1.1", "169.254.169.254", "::1", "fd00::1", "::ffff:127.0.0.1"]) {
      expect(privateAddress(ip), ip).toBe(true);
    }
    expect(privateAddress("8.8.8.8")).toBe(false);
    expect(privateAddress("2606:4700:4700::1111")).toBe(false);
  });

  it("empêche une valeur CSS de fermer la balise style", () => {
    expect(safeStyleText("color:red;</style><script>alert(1)</script>")).not.toContain("</style");
  });

  it("neutralise les formules dans un export CSV", () => {
    const db = { id: "db", name: { fr: "Test" }, slug: "test", fields: [{ id: "f", name: "nom", label: { fr: "Nom" }, type: "text" }] };
    const entry = { id: "e", database: "db", status: "draft" as const, values: { nom: "=1+1" }, createdAt: "", updatedAt: "" };
    expect(toCsv(db as never, [entry], "fr")).toContain("'=1+1");
  });
});
