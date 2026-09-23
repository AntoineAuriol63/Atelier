import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { blankSite, sampleEntries, sampleSite, type Entry } from "@atelier/model";
import { FileSiteStore } from "@/lib/store/file-store";
import { SupabaseSiteStore } from "@/lib/store/supabase-store";
import type { SiteStore } from "@/lib/store/types";

/**
 * Le contrat d'un dépôt, exécuté contre chaque implémentation : le dépôt fichier toujours, Supabase quand
 * SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont présents (un site d'essai est créé puis supprimé).
 */
function contract(name: string, make: () => Promise<{ store: SiteStore; cleanup: () => Promise<void> }>, enabled: boolean) {
  const d = enabled ? describe : describe.skip;
  d(`contrat du dépôt · ${name}`, () => {
    let store: SiteStore; let cleanup: () => Promise<void>;
    const id = `site_test${Date.now().toString(36)}`;
    beforeAll(async () => { ({ store, cleanup } = await make()); });
    afterAll(async () => { await cleanup(); });

    it("crée, lit, liste avec propriétaire", async () => {
      const site = { ...blankSite(id, "Contrat"), id };
      await store.create(site, "proprio@exemple.fr");
      const got = await store.get(id);
      expect(got?.site.name).toBe("Contrat");
      expect(got?.version).toBe(0);
      expect((await store.owner(id))?.owner).toBe("proprio@exemple.fr");
      expect((await store.listSites("proprio@exemple.fr")).some((s) => s.id === id)).toBe(true);
      expect((await store.listSites("autre@exemple.fr")).some((s) => s.id === id)).toBe(false);
    });
    it("applique un changement, refuse un conflit, journalise", async () => {
      const r1 = await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Contrat 2" }], baseVersion: 0, author: "test" });
      expect(r1.ok && r1.version).toBe(1);
      const r2 = await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Perdu" }], baseVersion: 0, author: "test" });
      expect(r2.ok).toBe(false);
      expect((await store.get(id))?.site.name).toBe("Contrat 2");
      expect((await store.changes(id, 0)).map((c) => c.version)).toEqual([1]);
    });
    it("ajoute, remplace et supprime des entrées, sans en perdre", async () => {
      const mk = (n: number): Entry => ({ id: `e_${n}`, database: "db_x", status: "draft", values: { title: `T${n}` }, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" });
      await store.upsertEntries(id, [mk(1), mk(2)]);
      await store.upsertEntries(id, [{ ...mk(2), values: { title: "T2 bis" } }, mk(3)]);
      const all = await store.entries(id);
      expect(all.map((e) => e.id).sort()).toEqual(["e_1", "e_2", "e_3"]);
      expect(all.find((e) => e.id === "e_2")?.values.title).toBe("T2 bis");
      await store.deleteEntries(id, ["e_1"]);
      expect((await store.entries(id)).map((e) => e.id).sort()).toEqual(["e_2", "e_3"]);
    });
    it("publie, liste, restaure, et retrouve par sous-domaine", async () => {
      // Avant toute publication, le sous-domaine dérivé de l'identifiant répond déjà.
      expect(await store.findBySubdomain(id.replace(/_/g, "-"))).toBe(id);
      const p = await store.publish(id, "première");
      expect(p.version).toBe(1);
      const pub = await store.published(id);
      expect(pub?.site.name).toBe("Contrat 2");
      expect(pub?.entries.length).toBe(2);
      await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Contrat 3" }], baseVersion: 1, author: "test" });
      await store.publish(id, "seconde");
      expect((await store.publications(id)).map((x) => x.version)).toEqual([2, 1]);
      await store.restore(id, 1);
      expect((await store.published(id))?.version).toBe(1);
      expect(await store.findBySubdomain(id.replace(/_/g, "-"))).toBe(id);
      expect(await store.findBySubdomain("n'importe,quoi")).toBeNull();
    });
    it("points de reprise : un par jour au plus, trente gardés, lisibles, et le journal compacté au-delà du nombre gardé", async () => {
      const t0 = new Date("2026-09-23T10:00:00.000Z").getTime();
      // La version courante (2) est déjà figée par la publication « seconde » : rien à prendre.
      expect(await store.checkpoint(id, { now: t0 })).toBeNull();
      await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Contrat 4" }], baseVersion: 2, author: "test" });
      const c1 = await store.checkpoint(id, { now: t0 });
      expect(c1?.version).toBe(3);
      // Même jour, même après un changement : pas de second point ; le lendemain sans changement : rien non plus.
      await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Contrat 5" }], baseVersion: 3, author: "test" });
      expect(await store.checkpoint(id, { now: t0 + 3_600_000 })).toBeNull();
      const c2 = await store.checkpoint(id, { now: t0 + 25 * 3_600_000 });
      expect(c2?.version).toBe(4);
      expect(await store.checkpoint(id, { now: t0 + 50 * 3_600_000 })).toBeNull();
      // La liste va du plus récent au plus ancien et chaque instantané se relit ; une publication aussi ; une version inconnue : null.
      expect((await store.checkpoints(id)).map((c) => c.version)).toEqual([4, 3]);
      expect((await store.snapshot(id, 3))?.site.name).toBe("Contrat 4");
      expect((await store.snapshot(id, 4))?.site.name).toBe("Contrat 5");
      expect((await store.snapshot(id, 1))?.site.name).toBe("Contrat 2");
      expect((await store.snapshot(id, 1))?.kind).toBe("publish");
      expect(await store.snapshot(id, 999)).toBeNull();
      // Trente gardés : un de plus et le plus ancien s'en va (journées successives).
      for (let i = 0; i < 30; i++) {
        const v = (await store.get(id))!.version;
        await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: `Contrat ${6 + i}` }], baseVersion: v, author: "test" });
        await store.checkpoint(id, { now: t0 + (2 + i) * 24 * 3_600_000 });
      }
      const list = await store.checkpoints(id);
      expect(list.length).toBe(30);
      expect(list.some((c) => c.version === 3)).toBe(false);
      // Le journal ne garde que les `keepChanges` derniers lots (ici 5) une fois un instantané pris au-delà.
      await store.appendChange(id, { ops: [{ op: "site.set", path: "name", value: "Contrat fin" }], baseVersion: (await store.get(id))!.version, author: "test" });
      await store.checkpoint(id, { now: t0 + 40 * 24 * 3_600_000, keepChanges: 5 });
      const changes = await store.changes(id, 0);
      expect(changes.length).toBeLessThanOrEqual(5);
      expect(changes[changes.length - 1]!.version).toBe((await store.get(id))!.version);
      // Le nom courant est bien celui du dernier changement, et la publication 1 est toujours là.
      expect((await store.get(id))?.site.name).toBe("Contrat fin");
      expect((await store.publications(id)).some((p) => p.version === 1)).toBe(true);
    });
    it("publie les contenus seuls sous la version en ligne", async () => {
      const before = await store.published(id);
      await store.upsertEntries(id, [{ id: "e_9", database: "db_x", status: "published", values: { title: "T9" }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
      const meta = await store.publishEntries(id);
      expect(meta.version).toBe(before!.version);
      const after = await store.published(id);
      expect(after!.version).toBe(before!.version);
      expect(after!.site.name).toBe(before!.site.name);
      expect(after!.entries.some((e) => e.id === "e_9")).toBe(true);
    });
    it("partage un site : membres, rôle, liste par compte, connexion des invités", async () => {
      await store.setMember(id, { email: "Invite@Exemple.fr", role: "writer" });
      expect(await store.members(id)).toEqual([{ email: "invite@exemple.fr", role: "writer" }]);
      await store.setMember(id, { email: "invite@exemple.fr", role: "editor" });
      expect((await store.members(id))[0]?.role).toBe("editor");
      expect((await store.listSites("invite@exemple.fr")).find((s) => s.id === id)?.role).toBe("editor");
      expect((await store.listSites("proprio@exemple.fr")).find((s) => s.id === id)?.role).toBe("owner");
      expect(await store.isMember("invite@exemple.fr")).toBe(true);
      expect(await store.isMember("inconnu@exemple.fr")).toBe(false);
      await store.removeMember(id, "invite@exemple.fr");
      expect(await store.members(id)).toEqual([]);
      expect((await store.listSites("invite@exemple.fr")).some((s) => s.id === id)).toBe(false);
    });
    it("compte une limite de débit", async () => {
      const key = `test:${id}`;
      let ok = 0; for (let i = 0; i < 4; i++) if (await store.rateLimit(key, 60, 3)) ok++;
      expect(ok).toBe(3);
    });
    it("refuse de publier un document invalide", async () => {
      await store.appendChange(id, { ops: [{ op: "site.set", path: "settings.locales", value: 42 }], baseVersion: (await store.get(id))!.version, author: "test" });
      await expect(store.publish(id)).rejects.toThrow(/invalide/);
    });
    it("supprime le site", async () => {
      await store.delete(id);
      expect(await store.get(id)).toBeNull();
    });
  });
}

contract("fichiers", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "atelier-"));
  return { store: new FileSiteStore(dir), cleanup: () => rm(dir, { recursive: true, force: true }) };
}, true);

const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
contract("supabase", async () => ({ store: new SupabaseSiteStore(url!, key!), cleanup: async () => {} }), !!url && !!key);

// Le site d'exemple lui-même doit passer la validation qui garde la publication.
describe("site d'exemple", () => {
  it("est prêt à être publié", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "atelier-"));
    const store = new FileSiteStore(dir);
    await store.create(sampleSite);
    await store.upsertEntries(sampleSite.id, sampleEntries);
    await expect(store.publish(sampleSite.id)).resolves.toMatchObject({ version: 0 });
    await rm(dir, { recursive: true, force: true });
  });
});
