import { describe, it, expect } from "vitest";
import { dataSourceFor, entryPath, indexSite, sampleEntries, sampleSite, templateOf } from "../src";

const idx = indexSite(sampleSite);
const home = sampleSite.pages.find((p) => p.id === "p_home")!;
const projet = sampleSite.pages.find((p) => p.id === "p_projet")!;

describe("sources de données", () => {
  it("connaît le modèle de page d'une base", () => {
    expect(templateOf(sampleSite, "p_projet")?.database.id).toBe("db_projets");
    expect(templateOf(sampleSite, "p_home")).toBeUndefined();
  });
  it("un nœud dans une vue lit l'élément répété, un nœud d'un modèle lit l'entrée, ailleurs rien", () => {
    expect(dataSourceFor(sampleSite, idx, home, "work_item_title")).toMatchObject({ source: "item", database: { id: "db_projets" }, via: "work_list" });
    expect(dataSourceFor(sampleSite, idx, projet, "prj_excerpt")).toMatchObject({ source: "entry", database: { id: "db_projets" } });
    expect(dataSourceFor(sampleSite, idx, home, "hero_h1")).toBeUndefined();
  });
  it("calcule l'adresse d'une entrée", () => {
    expect(entryPath(sampleSite.databases[0]!, sampleEntries[0]!)).toBe("/projets/lea-et-tom");
  });
});
