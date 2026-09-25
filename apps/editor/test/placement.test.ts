import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { findNode, sampleSite } from "@atelier/model";
import { gridTrackCount, placementOf, placementSentence } from "../src/lib/placement";

/** 25 septembre 2026 : d'où vient la largeur d'un élément ? De la grille ou de la ligne de son parent, et rien ne le disait (question d'Antoine sur le héros). */
describe("la place d'un élément dans son parent", () => {
  it("compte les colonnes d'un gabarit de grille", () => {
    expect(gridTrackCount("1.1fr 1fr")).toBe(2);
    expect(gridTrackCount("repeat(3, 1fr)")).toBe(3);
    expect(gridTrackCount("repeat(2, minmax(0, 1fr)) 200px")).toBe(3);
    expect(gridTrackCount("")).toBe(0);
  });

  it("dans une grille : la colonne et le gabarit du parent ; la phrase le dit et nomme le parent", () => {
    const loc = findNode(sampleSite, "hero_txt")!;
    const p = placementOf(sampleSite, loc, "base")!;
    expect(p).toMatchObject({ kind: "grid", parentId: "hero", parentLabel: "Héros", index: 0, count: 2, template: "1.1fr 1fr", tracks: 2 });
    expect(placementSentence(p, false)).toBe("Largeur décidée par « Héros » : colonne 1 sur 2 (1.1fr 1fr).");
    expect(placementSentence(p, true)).toBe("Dans la colonne 1 sur 2 de « Héros » (1.1fr 1fr) ; sa largeur réglée ci-dessus s'applique dedans.");
    const img = placementOf(sampleSite, findNode(sampleSite, "hero_img")!, "base")!;
    expect(img).toMatchObject({ kind: "grid", index: 1 });
    expect(placementSentence(img, false)).toContain("colonne 2 sur 2");
  });

  it("dans une ligne : les voisins, le contenu, et la part d'espace libre si l'élément s'étend", () => {
    const row: Node = { id: "row", type: "box", name: "Colonnes", props: {}, style: { base: { display: "flex" } }, children: [
      { id: "a", type: "box", name: "A", props: {}, style: { base: { flexGrow: "1" } } },
      { id: "b", type: "box", name: "B", props: {} },
      { id: "c", type: "box", name: "C", props: {} },
    ] };
    const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [row] } }] };
    const a = placementOf(site, findNode(site, "a")!, "base")!;
    expect(a).toMatchObject({ kind: "row", parentLabel: "Colonnes", index: 0, count: 3, grow: true });
    expect(placementSentence(a, false)).toBe("Dans la ligne « Colonnes », avec 2 voisins : la largeur de son contenu, plus sa part de l'espace libre.");
    const b = placementOf(site, findNode(site, "b")!, "base")!;
    expect(b.grow).toBe(false);
    expect(placementSentence(b, false)).toBe("Dans la ligne « Colonnes », avec 2 voisins : la largeur de son contenu. « Étendre », dans Place dans son parent, lui donne une part égale de la ligne.");
    expect(placementSentence(b, true)).toBe("Dans la ligne « Colonnes », avec 2 voisins ; sa largeur réglée ci-dessus s'applique.");
    // Un parent en colonne ou en bloc : rien à dire, la largeur est celle du parent.
    expect(placementOf(sampleSite, findNode(sampleSite, "hero_h1")!, "base")).toBeUndefined();
    expect(placementOf(sampleSite, findNode(sampleSite, "hero")!, "base")).toBeUndefined();
  });
});
