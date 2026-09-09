import { mkdir, readFile, writeFile, appendFile, rename, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { applyOps, migrate, validateSite, type Change, type Entry, type Site } from "@atelier/model";
import type { ChangeInput, ChangeResult, Member, PublicationMeta, Published, SiteStore, SiteSummary, StoredSite } from "./types";

type Publication = PublicationMeta & { site: Site; entries: Entry[] };
type FileDoc = { site: Site; version: number; entries: Entry[]; publications?: Publication[]; publishedVersion?: number; owner?: string | null; members?: Member[]; updatedAt?: string };

/**
 * Dépôt sur fichiers JSON : `<dir>/sites/<id>.json` (document courant) et `<dir>/sites/<id>.changes.jsonl` (journal).
 * Un seul processus à la fois ; les écritures d'un même site sont sérialisées.
 */
export class FileSiteStore implements SiteStore {
  private locks = new Map<string, Promise<unknown>>();
  constructor(private dir: string) {}

  private file(id: string) { return path.join(this.dir, "sites", `${id}.json`); }
  private journal(id: string) { return path.join(this.dir, "sites", `${id}.changes.jsonl`); }

  private async read(id: string): Promise<FileDoc | null> {
    const f = this.file(id);
    if (!existsSync(f)) return null;
    const d = JSON.parse(await readFile(f, "utf8")) as FileDoc;
    return { ...d, site: migrate(d.site) };
  }

  private async write(id: string, doc: FileDoc) {
    doc = { ...doc, updatedAt: new Date().toISOString() };
    await mkdir(path.dirname(this.file(id)), { recursive: true });
    const tmp = this.file(id) + ".tmp";
    await writeFile(tmp, JSON.stringify(doc), "utf8");
    await rename(tmp, this.file(id));
  }

  private serialize<T>(id: string, fn: () => Promise<T>): Promise<T> {
    const prev = this.locks.get(id) ?? Promise.resolve();
    const next = prev.then(fn, fn);
    this.locks.set(id, next.catch(() => undefined));
    return next;
  }

  async get(id: string): Promise<StoredSite | null> {
    const d = await this.read(id);
    return d ? { site: d.site, version: d.version, owner: d.owner ?? null } : null;
  }

  async create(site: Site, owner?: string): Promise<StoredSite> {
    return this.serialize(site.id, async () => {
      await this.write(site.id, { site, version: 0, entries: [], owner: owner ?? null, updatedAt: new Date().toISOString() });
      return { site, version: 0, owner: owner ?? null };
    });
  }

  async listSites(user?: string): Promise<SiteSummary[]> {
    const dir = path.join(this.dir, "sites");
    if (!existsSync(dir)) return [];
    const out: SiteSummary[] = [];
    for (const f of await readdir(dir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const d = JSON.parse(await readFile(path.join(dir, f), "utf8")) as FileDoc;
        const member = user ? (d.members ?? []).find((m) => m.email.toLowerCase() === user.toLowerCase()) : undefined;
        if (user && d.owner && d.owner !== user && !member) continue;
        const role: SiteSummary["role"] = !user ? undefined : member ? member.role : "owner";
        out.push({ id: d.site.id, name: d.site.name, version: d.version, updatedAt: d.updatedAt ?? "", publishedVersion: d.publishedVersion ?? null, subdomain: d.site.settings.subdomain ?? null, owner: d.owner ?? null, role });
      } catch { /* fichier temporaire */ }
    }
    return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async delete(id: string): Promise<void> {
    await this.serialize(id, async () => {
      await rm(this.file(id), { force: true });
      await rm(this.journal(id), { force: true });
    });
  }

  async appendChange(id: string, change: ChangeInput): Promise<ChangeResult> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      if (d.version !== change.baseVersion) return { ok: false, conflict: true, version: d.version };
      const r = applyOps(d.site, change.ops);
      const version = d.version + 1;
      const rec: Change = { id: `${id}:${version}`, ops: r.ops, author: change.author, at: new Date().toISOString(), label: change.label, version };
      await this.write(id, { ...d, site: r.site, version });
      await appendFile(this.journal(id), JSON.stringify(rec) + "\n", "utf8");
      return { ok: true, version, ops: r.ops };
    });
  }

  async changes(id: string, sinceVersion: number): Promise<Change[]> {
    const f = this.journal(id);
    if (!existsSync(f)) return [];
    const lines = (await readFile(f, "utf8")).split("\n").filter(Boolean);
    return lines.map((l) => JSON.parse(l) as Change).filter((c) => c.version > sinceVersion);
  }

  async entries(id: string): Promise<Entry[]> {
    return (await this.read(id))?.entries ?? [];
  }

  private async setEntries(id: string, entries: Entry[]): Promise<void> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      await this.write(id, { ...d, entries });
    });
  }
  async owner(id: string): Promise<{ owner: string | null } | undefined> {
    const d = await this.read(id);
    return d ? { owner: d.owner ?? null } : undefined;
  }
  /** Lecture, calcul et écriture sous le même verrou : deux envois simultanés ne s'écrasent pas. */
  async upsertEntries(id: string, entries: Entry[]): Promise<void> {
    await this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      const byId = new Map(d.entries.map((e) => [e.id, e]));
      for (const e of entries) byId.set(e.id, e);
      await this.write(id, { ...d, entries: [...byId.values()] });
    });
  }
  async deleteEntries(id: string, ids: string[]): Promise<void> {
    await this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) return;
      await this.write(id, { ...d, entries: d.entries.filter((e) => !ids.includes(e.id)) });
    });
  }

  async publish(id: string, label?: string): Promise<PublicationMeta> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      const valid = validateSite(d.site);
      if (!valid.ok) throw new Error(`Document invalide, publication refusée : ${valid.errors.slice(0, 3).join(" ; ")}`);
      const meta: PublicationMeta = { version: d.version, label, createdAt: new Date().toISOString() };
      const publications = [...(d.publications ?? []).filter((p) => p.version !== d.version), { ...meta, site: d.site, entries: d.entries }];
      await this.write(id, { ...d, publications, publishedVersion: d.version });
      return meta;
    });
  }
  async publishEntries(id: string): Promise<PublicationMeta> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      const p = d.publications?.find((x) => x.version === d.publishedVersion);
      if (!p) throw new Error("Publiez d'abord le site une première fois.");
      await this.write(id, { ...d, publications: d.publications!.map((x) => (x.version === p.version ? { ...x, entries: d.entries } : x)) });
      return { version: p.version, label: p.label, createdAt: p.createdAt };
    });
  }
  async members(id: string): Promise<Member[]> { return (await this.read(id))?.members ?? []; }
  async setMember(id: string, member: Member): Promise<void> {
    await this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      const email = member.email.toLowerCase();
      await this.write(id, { ...d, members: [...(d.members ?? []).filter((m) => m.email.toLowerCase() !== email), { email, role: member.role }] });
    });
  }
  async removeMember(id: string, email: string): Promise<void> {
    await this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) return;
      await this.write(id, { ...d, members: (d.members ?? []).filter((m) => m.email.toLowerCase() !== email.toLowerCase()) });
    });
  }
  async isMember(email: string): Promise<boolean> {
    return (await this.listSites()).length > 0 && (await Promise.all((await this.listSites()).map((s) => this.members(s.id)))).some((ms) => ms.some((m) => m.email.toLowerCase() === email.toLowerCase()));
  }
  async publications(id: string): Promise<PublicationMeta[]> {
    const d = await this.read(id);
    return (d?.publications ?? []).map(({ version, label, createdAt }) => ({ version, label, createdAt })).sort((a, b) => b.version - a.version);
  }
  async published(id: string): Promise<Published | null> {
    const d = await this.read(id);
    const p = d?.publications?.find((x) => x.version === d.publishedVersion);
    return p ? { site: p.site, entries: p.entries, version: p.version, publishedAt: p.createdAt } : null;
  }
  async restore(id: string, version: number): Promise<PublicationMeta> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      const p = d?.publications?.find((x) => x.version === version);
      if (!d || !p) throw new Error(`Version ${version} introuvable`);
      await this.write(id, { ...d, publishedVersion: version });
      return { version: p.version, label: p.label, createdAt: p.createdAt };
    });
  }
  private hits = new Map<string, number[]>();
  /** Mémoire du processus : suffisant pour un seul serveur de développement ; nettoyée à chaque appel. */
  async rateLimit(key: string, windowSeconds: number, max: number): Promise<boolean> {
    const now = Date.now();
    const list = (this.hits.get(key) ?? []).filter((t) => now - t < windowSeconds * 1000);
    list.push(now); this.hits.set(key, list);
    for (const [k, v] of this.hits) if (!v.some((t) => now - t < windowSeconds * 1000)) this.hits.delete(k);
    return list.length <= max;
  }
  async findBySubdomain(sub: string): Promise<string | null> {
    const dir = path.join(this.dir, "sites");
    if (!existsSync(dir)) return null;
    for (const f of await readdir(dir)) {
      if (!f.endsWith(".json")) continue;
      const id = f.slice(0, -5);
      if (!/^[a-z0-9-]{1,63}$/.test(sub)) return null;
      if (id === sub || id.toLowerCase().replace(/[^a-z0-9-]/g, "-") === sub) return id;
      try { const d = JSON.parse(await readFile(path.join(dir, f), "utf8")) as FileDoc; if (d.site?.settings?.subdomain === sub) return id; } catch { /* fichier temporaire ou partiel */ }
    }
    return null;
  }
}
