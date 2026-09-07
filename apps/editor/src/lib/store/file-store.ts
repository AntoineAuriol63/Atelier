import { mkdir, readFile, writeFile, appendFile, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { applyOps, type Change, type Entry, type Site } from "@atelier/model";
import type { ChangeInput, ChangeResult, SiteStore, StoredSite } from "./types";

type FileDoc = { site: Site; version: number; entries: Entry[] };

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
    return JSON.parse(await readFile(f, "utf8")) as FileDoc;
  }

  private async write(id: string, doc: FileDoc) {
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
    return d ? { site: d.site, version: d.version } : null;
  }

  async create(site: Site): Promise<StoredSite> {
    return this.serialize(site.id, async () => {
      await this.write(site.id, { site, version: 0, entries: [] });
      return { site, version: 0 };
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

  async setEntries(id: string, entries: Entry[]): Promise<void> {
    return this.serialize(id, async () => {
      const d = await this.read(id);
      if (!d) throw new Error(`Site introuvable : ${id}`);
      await this.write(id, { ...d, entries });
    });
  }
  async upsertEntries(id: string, entries: Entry[]): Promise<void> {
    const cur = await this.entries(id);
    const byId = new Map(cur.map((e) => [e.id, e]));
    for (const e of entries) byId.set(e.id, e);
    await this.setEntries(id, [...byId.values()]);
  }
  async deleteEntries(id: string, ids: string[]): Promise<void> {
    const cur = await this.entries(id);
    await this.setEntries(id, cur.filter((e) => !ids.includes(e.id)));
  }
}
