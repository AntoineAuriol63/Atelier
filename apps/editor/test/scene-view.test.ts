import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { appearanceOf, applyOps, findNode, planAppearanceDelay, planChainInOrder, planGroupAppearance, planQuickAnimation, sampleSite } from "@atelier/model";
import { sceneView, sceneRootFor } from "../src/lib/scene-view";

/**
 * L'outil Animation recentré (24 septembre 2026, décision d'Antoine) : une ligne par élément de la section, dans l'ordre de la page ;
 * une barre par élément qui bouge ; les images-clés de l'élément sélectionné sur sa ligne, en temps de scène.
 */
const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about: Node = { ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts"), box("c3", "Producteurs")])]), props: { tag: "section" } };
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [about, { ...box("cta", "Appel", [text("cta_t", "Réservez", "h2")]), props: { tag: "section" } }] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const run = (site: Site, ops: ReturnType<typeof planQuickAnimation>) => applyOps(site, ops).site;
function animated(): Site {
  let s = run(base, planQuickAnimation(base, node(base, "photo"), "Apparition", "slide-right"));
  s = run(s, planQuickAnimation(s, node(s, "hh2"), "Apparition", "fade-up")); s = run(s, planAppearanceDelay(s, "hh2", 600));
  s = run(s, planGroupAppearance(s, "c1", "rise-bounce"));
  return s;
}

describe("la section d'un élément", () => {
  it("un élément : sa section ; une section : elle-même ; un élément hors section : le bloc de premier niveau", () => {
    expect(sceneRootFor(base, "hh2")).toBe("about");
    expect(sceneRootFor(base, "c2")).toBe("about");
    expect(sceneRootFor(base, "about")).toBe("about");
    expect(sceneRootFor(base, "cta_t")).toBe("cta");
    expect(sceneRootFor(base, "root")).toBeUndefined();
  });
});

describe("sceneView", () => {
  it("une ligne par élément dans l'ordre de la page, une barre par élément qui bouge, rien pour ceux qui ne bougent pas", () => {
    const v = sceneView(animated(), "hh2")!;
    expect(v.sectionId).toBe("about");
    expect(v.rows.map((r) => r.id)).toEqual(["photo", "hh2", "pp2", "stats", "c1", "c2", "c3"]);
    const bar = (id: string) => v.rows.find((r) => r.id === id)!.bar;
    expect(bar("photo")).toMatchObject({ start: 0, end: 700 });
    expect(bar("hh2")).toMatchObject({ start: 600, end: 1300 });
    expect(bar("pp2")).toBeUndefined();
    expect(v.rows.find((r) => r.id === "pp2")!.still).toBe(true);
    // Le groupe porte la barre ; ses enfants arrivent avec lui, ils ne sont ni immobiles ni porteurs d'une barre à eux.
    expect(bar("stats")).toBeTruthy();
    expect(v.rows.find((r) => r.id === "c1")).toMatchObject({ still: false, withGroup: "stats" });
    expect(v.total).toBe(Math.max(...v.rows.filter((r) => r.bar).map((r) => r.bar!.end)));
  });

  it("l'élément sélectionné montre ses images-clés en temps de scène ; les autres seulement leur barre", () => {
    const s = animated();
    const v = sceneView(s, "hh2")!;
    const ap = appearanceOf(s, "hh2")!;
    const me = v.rows.find((r) => r.id === "hh2")!;
    expect(me.selected).toBe(true);
    expect(me.keyframes!.map((k) => k.sceneAt)).toEqual(ap.track.keyframes.map((k) => k.at + (ap.trigger.delay ?? 0)).sort((a, b) => a - b));
    expect(me.keyframes![0]!.sceneAt).toBe(600);
    expect(v.rows.find((r) => r.id === "photo")!.keyframes).toBeUndefined();
  });

  it("un temps de scène se traduit en instant de l'animation de l'élément sélectionné", () => {
    const v = sceneView(animated(), "hh2")!;
    // « Une cuisine » se lance lui-même : son délai de 600 ms est le départ de sa piste, le temps de scène et celui de l'animation coïncident.
    expect(v.scrub(600)).toMatchObject({ hostId: "hh2", time: 600 });
    expect(v.scrub(900)!.time).toBe(900);
    expect(v.scrub(100)!.time).toBe(100);
    expect(sceneView(animated(), "pp2")!.scrub(300)).toBeUndefined();
  });

  it("les lancements : un par déclencheur, dans l'ordre de la page, nommé par ce qui le lance, avec les lignes qu'il fait partir", () => {
    const s = animated();
    const v = sceneView(s, "hh2")!;
    expect(v.launches.map((l) => ({ hostId: l.hostId, rows: l.rows }))).toEqual([
      { hostId: "photo", rows: ["photo"] },
      { hostId: "hh2", rows: ["hh2"] },
      // Les enfants qui arrivent avec le groupe sont du lancement du groupe.
      { hostId: "stats", rows: ["stats", "c1", "c2", "c3"] },
    ]);
    expect(v.launches[0]!.label).toBe("Quand « Photo » entre dans l'écran");
    expect(v.launches[0]!.short).toBe("Entrée de « Photo »");
    expect(v.launches[1]!.label).toMatch(/^Quand .*Une cuisine.* entre dans l'écran$/);
    expect(v.launches[0]!.id).toBe(`photo:${appearanceOf(s, "photo")!.trigger.id}`);
    // Enchaînée dans l'ordre : un seul lancement, celui du premier, qui porte toutes les lignes.
    const chained = run(s, planChainInOrder(s, "about"));
    const one = sceneView(chained, "hh2")!;
    expect(one.launches.map((l) => ({ hostId: l.hostId, rows: l.rows }))).toEqual([{ hostId: "photo", rows: ["photo", "hh2", "stats", "c1", "c2", "c3"] }]);
  });

  it("la section elle-même a sa ligne quand elle bouge ou qu'elle est sélectionnée, en tête, ses enfants en retrait", () => {
    // Une section animée (un bloc de premier niveau qui apparaît en fondu) : sa ligne vient d'abord, avec sa barre, même si l'on a sélectionné un enfant.
    let s = animated();
    s = run(s, planQuickAnimation(s, node(s, "about"), "Apparition", "fade"));
    const v = sceneView(s, "hh2")!;
    expect(v.rows.map((r) => [r.id, r.depth])).toEqual([["about", 0], ["photo", 1], ["hh2", 1], ["pp2", 1], ["stats", 1], ["c1", 2], ["c2", 2], ["c3", 2]]);
    expect(v.rows[0]!.bar).toBeTruthy();
    expect(v.rows[0]!.label).toBe("La maison");
    // Sélectionnée, elle montre ses images-clés comme n'importe quel élément.
    const me = sceneView(s, "about")!;
    expect(me.rows[0]).toMatchObject({ id: "about", selected: true });
    expect(me.rows[0]!.keyframes!.length).toBeGreaterThanOrEqual(2);
    expect(me.selected).toBeTruthy();
    // Sélectionnée sans animation : sa ligne aussi (immobile, prête à « Faire apparaître ») ; ni sélectionnée ni animée : pas de ligne pour elle.
    const still = sceneView(animated(), "about")!;
    expect(still.rows[0]).toMatchObject({ id: "about", selected: true, still: true });
    expect(sceneView(animated(), "hh2")!.rows.map((r) => r.id)).toEqual(["photo", "hh2", "pp2", "stats", "c1", "c2", "c3"]);
  });

  it("sans élément sélectionné ni section, pas de scène ; un élément immobile seul dans sa section a quand même sa ligne", () => {
    expect(sceneView(base, undefined)).toBeUndefined();
    const v = sceneView(base, "cta_t")!;
    expect(v.rows.map((r) => r.id)).toEqual(["cta_t"]);
    expect(v.rows[0]!.still).toBe(true);
    expect(v.total).toBe(0);
  });
});
