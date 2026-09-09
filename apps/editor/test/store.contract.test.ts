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
      await store.appendChange(id, { ops: [{ op: "site.set", path: "settings.locales", value: 42 }], baseVersion: 2, author: "test" });
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
