import { describe, it, expect } from "vitest";
import { createHistory, commit, undo, redo, canUndo, canRedo, findNode, sampleSite, schema } from "../src";

const site = sampleSite;
const titleOf = (s: typeof site) => (findNode(s, "hero_h1")!.node.props.content as { fr: { v: string }[] }).fr[0]!.v;

describe("historique", () => {
  it("annule et rétablit une modification", () => {
    let h = createHistory();
    const c = commit(site, h, { op: "node.set", id: "hero_h1", path: "props.content.fr.0.v", value: "A" });
    expect(titleOf(c.site)).toBe("A");
    expect(canUndo(c.history)).toBe(true);
    const u = undo(c.site, c.history)!;
    expect(titleOf(u.site)).toBe("Des images qui restent, longtemps après.");
    expect(u.applied.op === "node.set" && u.applied.value).toBe("Des images qui restent, longtemps après.");
    expect(canRedo(u.history)).toBe(true);
    const r = redo(u.site, u.history)!;
    expect(titleOf(r.site)).toBe("A");
    expect(canRedo(r.history)).toBe(false);
    h = r.history; void h;
  });

  it("regroupe les frappes successives en une seule entrée", () => {
    let s = site, h = createHistory();
    for (const [i, v] of ["D", "De", "Des", "Des "].entries()) {
      const c = commit(s, h, { op: "node.set", id: "hero_h1", path: "props.content.fr.0.v", value: v }, { coalesceKey: "text:hero_h1", now: 1000 + i * 100 });
      s = c.site; h = c.history;
    }
    expect(h.undo.length).toBe(1);
    const u = undo(s, h)!;
    expect(titleOf(u.site)).toBe("Des images qui restent, longtemps après.");
  });

  it("ne regroupe pas au-delà de la fenêtre ni avec une autre clé", () => {
    let s = site, h = createHistory();
    let c = commit(s, h, { op: "node.set", id: "hero_h1", path: "props.content.fr.0.v", value: "A" }, { coalesceKey: "t", now: 0 });
    s = c.site; h = c.history;
    c = commit(s, h, { op: "node.set", id: "hero_h1", path: "props.content.fr.0.v", value: "AB" }, { coalesceKey: "t", now: 5000 });
    s = c.site; h = c.history;
    c = commit(s, h, { op: "node.set", id: "hero_h1", path: "name", value: "X" }, { coalesceKey: "t", now: 5100 });
    expect(c.history.undo.length).toBe(3);
  });

  it("un nouveau commit vide la pile de rétablissement", () => {
    const c1 = commit(site, createHistory(), { op: "node.set", id: "hero_h1", path: "name", value: "A" });
    const u = undo(c1.site, c1.history)!;
    const c2 = commit(u.site, u.history, { op: "node.set", id: "hero_h1", path: "name", value: "B" });
    expect(canRedo(c2.history)).toBe(false);
  });

  it("annule une suppression puis un déplacement dans l'ordre", () => {
    const c1 = commit(site, createHistory(), { op: "node.remove", id: "hero_p" });
    const c2 = commit(c1.site, c1.history, { op: "node.move", id: "hero_eyebrow", to: { parent: "hero_txt", index: 2 } });
    const u1 = undo(c2.site, c2.history)!;
    expect(findNode(u1.site, "hero_eyebrow")!.index).toBe(0);
    const u2 = undo(u1.site, u1.history)!;
    expect(findNode(u2.site, "hero_p")!.index).toBe(2);
    expect(u2.site).toEqual(site);
  });

  it("respecte la limite d'entrées", () => {
    let s = site, h = createHistory(3);
    for (let i = 0; i < 5; i++) { const c = commit(s, h, { op: "node.set", id: "hero_h1", path: "name", value: String(i) }); s = c.site; h = c.history; }
    expect(h.undo.length).toBe(3);
  });

  it("le schéma d'opération valide et rejette", () => {
    expect(schema.op.safeParse({ op: "node.set", id: "hero_h1", path: "name", value: "x" }).success).toBe(true);
    expect(schema.op.safeParse({ op: "node.move", id: "hero_h1", to: { parent: "x", index: -1 } }).success).toBe(false);
    expect(schema.op.safeParse({ op: "batch", ops: [{ op: "node.remove", id: "abc" }] }).success).toBe(true);
    expect(schema.op.safeParse({ op: "nope" }).success).toBe(false);
  });
});
