import { describe, it, expect } from "vitest";
import { applyOps, findNode, sampleSite, type Op } from "@atelier/model";
import { rebasePending } from "@/lib/rebase";

/**
 * Conflit de version : le serveur a reçu d'autres changements pendant que l'éditeur en gardait en attente.
 * `rebasePending` repose les opérations en attente sur le document du serveur ; si l'une d'elles n'a plus de sens
 * (l'élément visé a disparu), rien n'est reposé et la raison est dite.
 */
describe("reposer les opérations en attente sur le document du serveur", () => {
  const remote = applyOps(sampleSite, [{ op: "node.set", id: "nav_2", path: "name", value: "Modifié ailleurs" }]).site;

  it("des changements sur d'autres éléments se combinent : le résultat porte les deux", () => {
    const pending: Op[] = [{ op: "node.set", id: "nav_1", path: "name", value: "Modifié ici" }];
    const r = rebasePending(remote, pending);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(findNode(r.site, "nav_1")?.node.name).toBe("Modifié ici");
    expect(findNode(r.site, "nav_2")?.node.name).toBe("Modifié ailleurs");
    expect(r.ops).toHaveLength(1);
    // Les opérations reposées portent leur `prev` lu dans le document du serveur : elles restent inversibles.
    expect(r.ops[0]).toMatchObject({ op: "node.set", id: "nav_1", path: "name", value: "Modifié ici" });
  });

  it("une opération sur un élément supprimé ailleurs ne se repose pas, et rien d'autre non plus", () => {
    const removed = applyOps(sampleSite, [{ op: "node.remove", id: "nav_1" }]).site;
    const pending: Op[] = [
      { op: "node.set", id: "nav_2", path: "name", value: "Encore là" },
      { op: "node.set", id: "nav_1", path: "name", value: "Disparu" },
    ];
    const r = rebasePending(removed, pending);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.reason).toMatch(/nav_1|introuvable|supprimé/i);
  });

  it("sans opération en attente, le document du serveur est adopté tel quel", () => {
    const r = rebasePending(remote, []);
    expect(r).toEqual({ ok: true, site: remote, ops: [] });
  });
});
