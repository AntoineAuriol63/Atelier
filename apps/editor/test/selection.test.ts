import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { nodeLabel } from "../src/components/node-icons";
import { selectionPath } from "../src/lib/selection";

const para = (id: string, v: string, name?: string): Node => ({ id, type: "text", name, props: { tag: "p", content: { fr: [{ t: "text", v }] } } });

describe("libellés et chemin de la sélection", () => {
  it("un texte sans nom montre un extrait de son contenu, pour distinguer les homonymes", () => {
    expect(nodeLabel(para("a", "Cette saison"))).toBe("Paragraphe « Cette saison »");
    expect(nodeLabel(para("b", "Une cuisine de saison, pensée avec les producteurs du Puy-de-Dôme"))).toBe("Paragraphe « Une cuisine de saison… »");
    expect(nodeLabel({ id: "h", type: "text", props: { tag: "h2", content: { fr: [{ t: "text", v: "La " }, { t: "link", href: { kind: "url", url: "#" }, children: [{ t: "text", v: "carte" }] }] } } } as Node)).toBe("Titre 2 « La carte »");
    expect(nodeLabel(para("c", "   "))).toBe("Paragraphe");
    expect(nodeLabel(para("d", "Peu importe", "Surtitre"))).toBe("Surtitre");
  });
  it("chemin de la racine à l'élément sélectionné, pour le fil d'Ariane", () => {
    const root: Node = { id: "root", type: "box", props: {}, children: [{ id: "hero", type: "box", name: "Héros", props: { tag: "section" }, children: [para("p1", "Bonjour")] }] };
    const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }] };
    expect(selectionPath(site, "p1").map((s) => [s.id, s.label])).toEqual([["root", "Boîte"], ["hero", "Héros"], ["p1", "Paragraphe « Bonjour »"]]);
    expect(selectionPath(site, "inconnu")).toEqual([]);
  });
});
