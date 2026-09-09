import { describe, it, expect } from "vitest";
import { applyOp, applyOps, invertOp, findNode, indexSite, sampleSite, validateSite, collectIds, newId, isValidId } from "../src";
import type { Node, Op } from "../src";

const site = sampleSite;

describe("schéma", () => {
  it("valide le site d'exemple", () => {
    const r = validateSite(site);
    if (!r.ok) console.error(r.errors);
    expect(r.ok).toBe(true);
  });
  it("rejette un nœud sans props", () => {
    const bad = structuredClone(site) as unknown as { pages: { root: { children: Node[] } }[] };
    delete (bad.pages[0]!.root.children[0] as Partial<Node>).props;
    expect(validateSite(bad).ok).toBe(false);
  });
  it("les identifiants générés sont valides et uniques", () => {
    const ids = new Set(Array.from({ length: 500 }, () => newId()));
    expect(ids.size).toBe(500);
    for (const id of ids) expect(isValidId(id)).toBe(true);
  });
  it("tous les identifiants du site sont uniques", () => {
    const all = [...site.pages.map((p) => p.root), ...site.components.map((c) => c.root)].flatMap(collectIds);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("opérations", () => {
  const newNode: Node = { id: "new_1", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "Bonjour" }] } } };

  it("insère puis inverse", () => {
    const { site: s1, op } = applyOp(site, { op: "node.insert", parent: "hero_txt", index: 1, node: newNode });
    expect(findNode(s1, "new_1")?.parent?.id).toBe("hero_txt");
    expect(findNode(s1, "new_1")?.index).toBe(1);
    expect(findNode(site, "new_1")).toBeUndefined(); // immutabilité
    const { site: s2 } = applyOp(s1, invertOp(op));
    expect(findNode(s2, "new_1")).toBeUndefined();
    expect(s2.pages[0]!.root).toEqual(site.pages[0]!.root);
  });

  it("supprime puis restaure au même index", () => {
    const before = findNode(site, "hero_p")!;
    const { site: s1, op } = applyOp(site, { op: "node.remove", id: "hero_p" });
    expect(findNode(s1, "hero_p")).toBeUndefined();
    const { site: s2 } = applyOp(s1, invertOp(op));
    const after = findNode(s2, "hero_p")!;
    expect(after.index).toBe(before.index);
    expect(after.node).toEqual(before.node);
  });

  it("déplace un nœud et l'inverse", () => {
    const { site: s1, op } = applyOp(site, { op: "node.move", id: "hero_eyebrow", to: { parent: "hero_txt", index: 3 } });
    expect(findNode(s1, "hero_eyebrow")?.index).toBe(3);
    const { site: s2 } = applyOp(s1, invertOp(op));
    expect(findNode(s2, "hero_eyebrow")?.index).toBe(0);
  });

  it("refuse de déplacer dans sa descendance", () => {
    expect(() => applyOp(site, { op: "node.move", id: "hero", to: { parent: "hero_txt", index: 0 } })).toThrow(/descendance/);
  });

  it("modifie une propriété par chemin et l'inverse", () => {
    const { site: s1, op } = applyOp(site, { op: "node.set", id: "hero_h1", path: "props.content.fr.0.v", value: "Nouveau titre" });
    const content = findNode(s1, "hero_h1")!.node.props.content as { fr: { v: string }[] };
    expect(content.fr[0]!.v).toBe("Nouveau titre");
    expect(op.op === "node.set" && op.prev).toBe("Des images qui restent, longtemps après.");
    const { site: s2 } = applyOp(s1, invertOp(op));
    expect(s2.pages[0]!.root).toEqual(site.pages[0]!.root);
  });

  it("pose un style à un point de rupture inexistant (création du chemin)", () => {
    const { site: s1 } = applyOp(site, { op: "node.set", id: "hero_h1", path: "style.breakpoints.mobile.fontSize", value: { token: "fontSize.2xl" } });
    expect(findNode(s1, "hero_h1")!.node.style?.breakpoints?.mobile?.fontSize).toEqual({ token: "fontSize.2xl" });
  });

  it("modifie le site (thème) et l'inverse", () => {
    const { site: s1, op } = applyOp(site, { op: "site.set", path: "theme.tokens.color.accent.light", value: "#000000" });
    expect((s1.theme.tokens.color.accent as Record<string, string>).light).toBe("#000000");
    const { site: s2 } = applyOp(s1, invertOp(op));
    expect(s2.theme).toEqual(site.theme);
  });

  it("un lot s'inverse dans l'ordre inverse", () => {
    const batch: Op = { op: "batch", label: "test", ops: [
      { op: "node.insert", parent: "hero_txt", index: 0, node: newNode },
      { op: "node.set", id: "new_1", path: "name", value: "Nouveau" },
      { op: "node.move", id: "new_1", to: { parent: "hero_cta", index: 0 } },
    ] };
    const { site: s1, op } = applyOp(site, batch);
    expect(findNode(s1, "new_1")?.parent?.id).toBe("hero_cta");
    const { site: s2 } = applyOp(s1, invertOp(op));
    expect(s2).toEqual(site);
  });

  it("opère aussi dans l'arbre d'un composant", () => {
    const { site: s1 } = applyOps(site, [{ op: "node.set", id: "hdr_logo_t", path: "props.content.fr.0.v", value: "M. L." }]);
    const loc = indexSite(s1).get("hdr_logo_t")!;
    expect("component" in loc.owner && loc.owner.component).toBe("cmp_header");
  });

  it("null sur un champ optionnel vaut retrait, mais reste une valeur dans props", () => {
    const { site: s1 } = applyOp(site, { op: "node.set", id: "hero_h1", path: "name", value: null });
    expect("name" in findNode(s1, "hero_h1")!.node).toBe(false);
    const { site: s2 } = applyOp(site, { op: "node.set", id: "hero_img", path: "props.asset", value: null });
    expect(findNode(s2, "hero_img")!.node.props.asset).toBeNull();
    expect(validateSite(s1).ok).toBe(true);
  });

  it("refuse un identifiant en double", () => {
    expect(() => applyOp(site, { op: "node.insert", parent: "hero_txt", index: 0, node: { ...newNode, id: "hero_p" } })).toThrow(/déjà présent/);
  });
});

describe("unicité des identifiants", () => {
  it("refuse une insertion dont un descendant porte un identifiant déjà présent", () => {
    const node = { id: "nouveau_1", type: "box" as const, props: {}, children: [{ id: "hero_h1", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "x" }] } } }] };
    expect(() => applyOp(sampleSite, { op: "node.insert", parent: "hero_txt", index: 0, node })).toThrow(/hero_h1/);
  });
  it("accepte un remplacement qui réutilise les identifiants du sous-arbre remplacé", () => {
    const loc = findNode(sampleSite, "hero_txt")!.node;
    expect(() => applyOp(sampleSite, { op: "node.replace", id: "hero_txt", node: { ...loc, name: "Texte 2" } })).not.toThrow();
  });
});
