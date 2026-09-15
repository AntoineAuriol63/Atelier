import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { nodeLabel } from "../src/components/node-icons";
import { compoundIds, pickSelection, selectionPath } from "../src/lib/selection";

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

describe("un clic désigne ce qu'on veut faire bouger (tests simulés, PR10)", () => {
  const span = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "span", content: { fr: [{ t: "text", v }] } } });
  const button: Node = { id: "btn", type: "link", props: { tag: "a" }, children: [span("btn_t", "Réserver une table")] };
  const badge: Node = { id: "badge", type: "box", name: "Pastille", props: {}, children: [span("badge_v", "Bib Gourmand"), span("badge_l", "Guide 2026")] };
  const group: Node = { id: "head", type: "box", name: "Titre de section", props: {}, children: [para("eyebrow", "Cette saison"), { ...para("h2", "Plats"), props: { tag: "h2", content: { fr: [{ t: "text", v: "Plats" }] } } }] };
  const card: Node = { id: "card", type: "item", props: {}, children: [{ id: "card_img", type: "image", props: {} }, { id: "card_body", type: "box", props: {}, children: [span("card_name", "Truffade")] }] };
  const occurrence: Node = { id: "stat", type: "instance", props: { component: "cmp_stat" } };
  const root: Node = { id: "root", type: "box", props: {}, children: [button, badge, group, { id: "list", type: "collection", props: {}, children: [card] }, occurrence] };
  const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }] };

  it("éléments composés : boutons et liens, cartes, occurrences de composant, blocs nommés faits de textes ou d'images ; en Écriture, seulement les étiquettes (textes en ligne)", () => {
    expect(compoundIds(site, "design").filter((id) => ["btn", "badge", "head", "card", "stat", "card_body", "list"].includes(id)).sort()).toEqual(["badge", "btn", "card", "head", "stat"]);
    expect(compoundIds(site, "write").filter((id) => ["btn", "badge", "head", "card", "stat"].includes(id)).sort()).toEqual(["badge", "btn", "card", "stat"]);
  });
  it("le premier clic prend le composé le plus extérieur ; cliquer dedans une fois qu'il est sélectionné descend d'un niveau", () => {
    const compounds = new Set(["btn", "card", "badge", "link2"]);
    expect(pickSelection(["btn_t", "btn", "root"], compounds, null)).toBe("btn");
    expect(pickSelection(["btn_t", "btn", "root"], compounds, "btn")).toBe("btn_t");
    expect(pickSelection(["btn_t", "btn", "root"], compounds, "btn_t")).toBe("btn_t");
    // Une carte d'événement : carte, puis son lien, puis l'image.
    expect(pickSelection(["img", "link2", "card", "root"], compounds, null)).toBe("card");
    expect(pickSelection(["img", "link2", "card", "root"], compounds, "card")).toBe("link2");
    expect(pickSelection(["img", "link2", "card", "root"], compounds, "link2")).toBe("img");
    // Sans composé autour, l'élément cliqué ; une sélection ailleurs ne change rien.
    expect(pickSelection(["para", "root"], compounds, "btn")).toBe("para");
    expect(pickSelection(["badge_v", "badge", "root"], compounds, "btn", ["btn", "root"])).toBe("badge");
    // Entré dans la pastille : cliquer l'autre étiquette la sélectionne directement.
    expect(pickSelection(["badge_v", "badge", "root"], compounds, "badge_l", ["badge_l", "badge", "root"])).toBe("badge_v");
  });
  it("en mode Animation, un bloc nommé fait de textes n'est pas un composé : son titre se pioche directement", () => {
    expect(compoundIds(site, "animate").includes("badge")).toBe(false);
    expect(compoundIds(site, "animate").includes("btn")).toBe(true);
  });
});
