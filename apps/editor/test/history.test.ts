import { describe, it, expect } from "vitest";
import { historyRows, savedLabel } from "../src/lib/history";

/**
 * L'historique lisible (23 septembre 2026) : publications et points de reprise dans une même liste, du plus récent au plus ancien,
 * sans numéro de version brut ; et le badge d'enregistrement qui dit l'heure plutôt qu'un compteur.
 */
describe("historyRows", () => {
  const pubs = [{ version: 40, label: "Nouvelle galerie", createdAt: "2026-09-20T10:00:00.000Z" }, { version: 12, createdAt: "2026-09-10T10:00:00.000Z" }];
  const cps = [{ version: 55, createdAt: "2026-09-22T09:00:00.000Z" }, { version: 40, createdAt: "2026-09-20T10:00:00.000Z" }, { version: 30, createdAt: "2026-09-15T09:00:00.000Z" }];

  it("fusionne, trie du plus récent au plus ancien, marque la version en ligne, et une publication prime sur un point de reprise de même version", () => {
    const rows = historyRows(pubs, cps, 12);
    expect(rows.map((r) => [r.version, r.kind, r.live])).toEqual([[55, "checkpoint", false], [40, "publish", false], [30, "checkpoint", false], [12, "publish", true]]);
    expect(rows.find((r) => r.version === 40)!.label).toBe("Nouvelle galerie");
  });

  it("dit chaque ligne en mots : « Publication · Nouvelle galerie », « Point de reprise »", () => {
    const rows = historyRows(pubs, cps, 40);
    expect(rows.find((r) => r.version === 40)!.title).toBe("Publication · Nouvelle galerie");
    expect(rows.find((r) => r.version === 12)!.title).toBe("Publication");
    expect(rows.find((r) => r.version === 55)!.title).toBe("Point de reprise");
  });
});

describe("savedLabel", () => {
  const now = new Date("2026-09-23T14:32:10.000Z").getTime();
  it("enregistré à l'heure du dernier envoi, sans compteur", () => {
    expect(savedLabel("saved", now - 5 * 60_000, now)).toMatch(/^Enregistré à \d{2}:\d{2}$/);
    expect(savedLabel("saved", null, now)).toBe("Enregistré");
  });
  it("les autres états gardent leur mot", () => {
    expect(savedLabel("saving", now, now)).toBe("Enregistrement…");
    expect(savedLabel("offline", now, now)).toBe("Hors ligne");
    expect(savedLabel("conflict", now, now)).toBe("Conflit");
  });
});
