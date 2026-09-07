import { describe, it, expect } from "vitest";
import { applyOp, canInsertUnder, findNode, indexSite, planDrop, planExitBox, planInsert, planMove, sampleSite } from "../src";

const idx = indexSite(sampleSite);
const home = sampleSite.pages[0]!.root;

describe("planMove", () => {
  it("dépose avant un frère plus haut", () => {
    // hero_p (index 2) avant hero_eyebrow (index 0)
    const r = planMove(idx, "hero_p", "hero_eyebrow", "before");
    expect(r).toEqual({ ok: true, to: { parent: "hero_txt", index: 0 } });
  });
  it("dépose après un frère plus bas, en tenant compte du retrait", () => {
    // hero_eyebrow (0) après hero_p (2) → index 2 après retrait
    const r = planMove(idx, "hero_eyebrow", "hero_p", "after");
    expect(r).toEqual({ ok: true, to: { parent: "hero_txt", index: 2 } });
    const { site } = applyOp(sampleSite, { op: "node.move", id: "hero_eyebrow", to: (r as { to: { parent: string; index: number } }).to });
    expect(findNode(site, "hero_txt")!.node.children!.map((c) => c.id).slice(0, 3)).toEqual(["hero_h1", "hero_p", "hero_eyebrow"]);
  });
  it("dépose dedans à la fin", () => {
    const r = planMove(idx, "hero_img", "hero_txt", "inside");
    expect(r).toEqual({ ok: true, to: { parent: "hero_txt", index: 4 } });
  });
  it("refuse dans soi-même, dans sa descendance, dans un non-conteneur", () => {
    expect(planMove(idx, "hero", "hero", "inside").ok).toBe(false);
    expect(planMove(idx, "hero", "hero_txt", "inside").ok).toBe(false);
    expect(planMove(idx, "hero_p", "hero_h1", "inside").ok).toBe(false);
  });
  it("refuse la racine, l'élément répété et le voisinage d'un élément répété", () => {
    expect(planMove(idx, "home", "hero", "after").ok).toBe(false);
    expect(planMove(idx, "work_item", "hero", "after").ok).toBe(false);
    expect(planMove(idx, "hero_p", "work_item", "after").ok).toBe(false);
  });
  it("refuse entre une page et un composant", () => {
    expect(planMove(idx, "hero_p", "hdr_nav", "inside").ok).toBe(false);
  });
});

describe("planInsert", () => {
  it("sans sélection : à la fin de la racine", () => {
    expect(planInsert(idx, home, null)).toEqual({ parent: "home", index: home.children!.length });
  });
  it("conteneur sélectionné : dedans à la fin ; feuille sélectionnée : après", () => {
    expect(planInsert(idx, home, "hero_txt")).toEqual({ parent: "hero_txt", index: 4 });
    expect(planInsert(idx, home, "hero_p")).toEqual({ parent: "hero_txt", index: 3 });
    expect(planInsert(idx, home, "hero_p", "before")).toEqual({ parent: "hero_txt", index: 2 });
  });
  it("collection sélectionnée : après, jamais dedans", () => {
    expect(planInsert(idx, home, "work_list")).toEqual({ parent: "work", index: 2 });
  });
});

describe("planDrop", () => {
  it("avant, après, dedans, et sur la racine", () => {
    expect(planDrop(idx, "hero_p", "before")).toEqual({ ok: true, to: { parent: "hero_txt", index: 2 } });
    expect(planDrop(idx, "hero_p", "after")).toEqual({ ok: true, to: { parent: "hero_txt", index: 3 } });
    expect(planDrop(idx, "hero_txt", "inside")).toEqual({ ok: true, to: { parent: "hero_txt", index: 4 } });
    expect(planDrop(idx, "home", "after")).toEqual({ ok: true, to: { parent: "home", index: home.children!.length } });
    expect(planDrop(idx, "hero_h1", "inside").ok).toBe(false);
    expect(planDrop(idx, "work_item", "after").ok).toBe(false);
  });
});

describe("lien dans un lien", () => {
  it("refuse de déplacer, déposer ou insérer un lien sous un lien", () => {
    // hero_b2 est un lien ; hero_b1 aussi (contient un span)
    expect(planMove(idx, "hero_b2", "hero_b1", "inside").ok).toBe(false);
    expect(planMove(idx, "hero_b2", "hero_b1_t", "after").ok).toBe(false);   // à côté du span, donc dans le lien
    expect(planDrop(idx, "hero_b1", "inside", { id: "x1", type: "link", props: {} }).ok).toBe(false);
    expect(planDrop(idx, "hero_b1", "inside", { id: "x2", type: "text", props: {} }).ok).toBe(true);
    expect(canInsertUnder(idx, "hero_b1", { id: "x3", type: "box", props: {}, children: [{ id: "x4", type: "link", props: {} }] }).ok).toBe(false);
    expect(canInsertUnder(idx, "hero_txt", { id: "x5", type: "link", props: {} }).ok).toBe(true);
  });
});

describe("contenu d'un lien", () => {
  it("un bouton n'accueille que texte, image ou icône", () => {
    expect(planMove(idx, "hero_txt", "hero_b1", "inside").ok).toBe(false);
    expect(planDrop(idx, "hero_b1", "inside", { id: "s1", type: "box", props: {} }).ok).toBe(false);
    expect(planDrop(idx, "hero_b1", "inside", { id: "i1", type: "image", props: {} }).ok).toBe(true);
    expect(planDrop(idx, "hero_b1_t", "after", { id: "s2", type: "box", props: {} }).ok).toBe(false);
    expect(canInsertUnder(idx, "hero_b1", { id: "d1", type: "divider", props: {} }).ok).toBe(false);
  });
});

describe("planExitBox", () => {
  const empty = { id: "t_empty", type: "text" as const, props: { tag: "p", content: { fr: [{ t: "text" as const, v: "" }] } } };
  it("sort d'une boîte imbriquée : après elle, dans son parent", () => {
    const n = findNode(sampleSite, "hero_txt")!.node.children!.length;
    const { site } = applyOp(sampleSite, { op: "node.insert", parent: "hero_txt", index: n, node: empty });
    const idx2 = indexSite(site);
    const heroTxt = idx2.get("hero_txt")!;
    expect(planExitBox(idx2, "t_empty")).toEqual({ ok: true, to: { parent: heroTxt.parent!.id, index: heroTxt.index + 1 }, box: "hero_txt" });
  });
  it("refuse si le texte n'est pas le dernier, et refuse de quitter une région de la page", () => {
    const { site } = applyOp(sampleSite, { op: "node.insert", parent: "hero_txt", index: 0, node: empty });
    expect(planExitBox(indexSite(site), "t_empty").ok).toBe(false);
    const region = home.children!.find((c) => c.type === "box")!;
    const { site: s2 } = applyOp(sampleSite, { op: "node.insert", parent: region.id, index: (region.children ?? []).length, node: empty });
    expect(planExitBox(indexSite(s2), "t_empty").ok).toBe(false);
  });
});
