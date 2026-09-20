import { describe, it, expect } from "vitest";
import type { Node, Site } from "@atelier/model";
import { applyOps, findNode, planAppearanceDelay, planAppearanceStart, planGroupAppearance, planQuickAnimation, sampleSite } from "@atelier/model";
import { sceneContainerFor, sceneOf, sceneSentence } from "../src/lib/scene";

/**
 * Vague 4 des tests simulés, PR1 et N-5 : composer une scène élément par élément sans jamais la voir entière ; « personne ne m'a dit
 * en tout votre scène dure tant » ; une scène livrée fausse (les chiffres partis avec la photo) sans qu'aucun écran le dise.
 */
const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const about = (): Node => ({ ...box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils"), box("stats", "Chiffres", [box("c1", "Années"), box("c2", "Couverts"), box("c3", "Producteurs")])]), props: { tag: "section" } });
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [box("hero", "Héros", [text("title", "Bonjour", "h1")]), about()] } }] };
const node = (site: Site, id: string): Node => findNode(site, id)!.node;
const run = (site: Site, ops: ReturnType<typeof planQuickAnimation>) => applyOps(site, ops).site;
const quick = (site: Site, id: string, preset: string) => run(site, planQuickAnimation(site, node(site, id), "Apparition", preset));

/** La scène enchaînée : photo, puis titre après la photo, puis paragraphe après le titre, puis les trois chiffres un à un après le paragraphe. */
function chained(): Site {
  let s = quick(base, "photo", "slide-right");
  s = quick(s, "hh2", "fade-up"); s = run(s, planAppearanceStart(s, "hh2", { kind: "after", node: "photo" }));
  s = quick(s, "pp2", "fade"); s = run(s, planAppearanceStart(s, "pp2", { kind: "after", node: "hh2" }));
  s = run(s, planGroupAppearance(s, "c1", "rise-bounce")); s = run(s, planAppearanceStart(s, "stats", { kind: "after", node: "pp2" }));
  return s;
}
/** La scène de P5 : chaque élément sur sa propre entrée à l'écran, des délais à la main, le paragraphe oublié, les chiffres à 0. */
function separate(): Site {
  let s = quick(base, "photo", "slide-right");
  s = quick(s, "hh2", "fade-up"); s = run(s, planAppearanceDelay(s, "hh2", 600));
  s = run(s, planGroupAppearance(s, "c1", "rise-bounce"));
  return s;
}

describe("la scène d'une section, en une vue", () => {
  it("une chaîne : un seul lancement, les éléments dans l'ordre avec leur départ et leur fin, la durée totale", () => {
    const sc = sceneOf(chained(), "about")!;
    expect(sc.launches).toHaveLength(1);
    expect(sc.separate).toBe(false);
    expect(sc.entries.map((e) => e.id)).toEqual(["photo", "hh2", "pp2", "stats"]);
    const starts = sc.entries.map((e) => e.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    expect(sc.entries[0]!.start).toBe(0);
    expect(sc.entries[3]!.count).toBe(3);
    // Le total compte le dernier chiffre (échelonnés de 100 ms) : au-delà de la fin de la piste du groupe.
    expect(sc.total).toBe(Math.max(...sc.entries.map((e) => e.end)));
    expect(sc.total).toBeGreaterThan(sc.entries[3]!.start + 800);
    expect(sc.warnings).toEqual([]);
    expect(sc.still).toEqual([]);
    const sentence = sceneSentence(sc);
    // Les textes sans nom se désignent par leur extrait, comme partout dans l'éditeur : « Titre 2 « Une cuisine » ».
    expect(sentence).toMatch(/^Quand « Photo » entre dans l'écran : « Photo », puis Titre 2 « Une cuisine », puis Paragraphe « Aurèle et Nils », puis les 3 éléments de « Chiffres » un à un/);
    expect(sentence).toMatch(/tout est fini à [\d\s ,]+ (ms|s)/);
  });

  it("des lancements séparés : chacun sur son entrée à l'écran, un élément parti avant celui qui le précède, un élément qui ne bouge pas", () => {
    const sc = sceneOf(separate(), "about")!;
    expect(sc.launches).toHaveLength(3);
    expect(sc.separate).toBe(true);
    expect(sc.entries.map((e) => e.id)).toEqual(["photo", "hh2", "stats"]);
    expect(sc.still.map((e) => e.id)).toEqual(["pp2"]);
    expect(sc.warnings.some((w) => w.includes("« Chiffres » part avant Titre 2 « Une cuisine »"))).toBe(true);
    expect(sc.warnings.some((w) => /3 lancements séparés/.test(w))).toBe(true);
    expect(sceneSentence(sc)).toMatch(/3 lancements séparés/);
  });

  it("moins de deux éléments animés : pas de scène ; et depuis un élément, la section qui porte sa scène", () => {
    expect(sceneOf(base, "about")).toBeUndefined();
    expect(sceneOf(quick(base, "photo", "fade"), "about")).toBeUndefined();
    const s = chained();
    expect(sceneContainerFor(s, "hh2")).toBe("about");
    expect(sceneContainerFor(s, "c2")).toBe("about");
    expect(sceneContainerFor(s, "title")).toBeUndefined();
  });
});
