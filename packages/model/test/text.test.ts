import { describe, it, expect } from "vitest";
import { applyOps, fitHeadings, indexSite, planMergePrev, planSlashInsert, planSplit, sampleSite, type Inline } from "../src";

const idx = indexSite(sampleSite);
const t = (v: string): Inline[] => [{ t: "text", v }];
let n = 0; const makeId = () => `t_${++n}`;

describe("Entrée dans un texte", () => {
  it("coupe le texte en deux et édite le nouveau bloc", () => {
    const plan = planSplit(idx, "hero_p", t("Je photographie"), t(" les gens"), "fr", makeId)!;
    expect(plan.ops.map((o) => o.op)).toEqual(["node.set", "node.insert"]);
    expect(plan.edit?.caret).toBe("start");
    const { site } = applyOps(sampleSite, plan.ops);
    const txt = indexSite(site).get("hero_txt")!.node.children!.map((c) => c.id);
    expect(txt.indexOf(plan.select!)).toBe(txt.indexOf("hero_p") + 1);
  });
  it("en début de texte, pose un bloc vide au-dessus et garde le curseur", () => {
    const plan = planSplit(idx, "hero_p", [], t("Je photographie"), "fr", makeId)!;
    expect(plan.ops).toHaveLength(1);
    expect(plan.edit).toEqual({ id: "hero_p", caret: "start" });
  });
  it("dans un bouton, valide seulement le texte", () => {
    const plan = planSplit(idx, "hero_b1_t", t("Voir"), t(" les galeries"), "fr", makeId);
    expect(plan?.ops.map((o) => o.op)).toEqual(["node.set"]);
    expect(planSplit(idx, "hero_b1_t", t("Voir les galeries"), [], "fr", makeId)).toBeNull();
  });
  it("sur un paragraphe vide dernier de sa boîte, sort de la boîte", () => {
    const { site } = applyOps(sampleSite, [{ op: "node.insert", parent: "hero_txt", index: 4, node: { id: "vide", type: "text", props: { tag: "p", content: { fr: t("") } } } }]);
    const plan = planSplit(indexSite(site), "vide", [], [], "fr", makeId)!;
    expect(plan.label).toBe("Sortir de la boîte");
    expect(plan.ops[0]).toMatchObject({ op: "node.move", id: "vide" });
  });
});

describe("Retour arrière et menu /", () => {
  it("retire le bloc vide et reprend à la fin du texte précédent", () => {
    const plan = planMergePrev(idx, "hero_p")!;
    expect(plan.ops).toEqual([{ op: "node.remove", id: "hero_p" }]);
    expect(plan.edit).toEqual({ id: "hero_h1", caret: "end" });
  });
  it("insère après le texte, ou à sa place, et refuse ce que le parent n'accepte pas", () => {
    const para = { id: makeId(), type: "text" as const, props: { tag: "p", content: { fr: t("x") } } };
    const ops = (r: ReturnType<typeof planSlashInsert>) => (r && "ops" in r ? r.ops.map((o) => o.op) : r);
    expect(ops(planSlashInsert(sampleSite, idx, "hero_p", para, "Paragraphe", false))).toEqual(["node.insert"]);
    expect(ops(planSlashInsert(sampleSite, idx, "hero_p", para, "Paragraphe", true))).toEqual(["node.remove", "node.insert"]);
    const box = { id: makeId(), type: "box" as const, props: {}, children: [] };
    expect(planSlashInsert(sampleSite, idx, "hero_b1_t", box, "Boîte", false)).toHaveProperty("error");
  });
  it("rétrograde un h1 apporté par un modèle quand la page en a déjà un", () => {
    const home = sampleSite.pages[0]!.root;
    const hero = { id: "x", type: "box" as const, props: {}, children: [{ id: "y", type: "text" as const, props: { tag: "h1", content: { fr: t("Titre") } } }] };
    expect(fitHeadings(home, hero).children![0]!.props.tag).toBe("h2");
  });
});
