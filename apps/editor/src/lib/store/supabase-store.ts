import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { applyOps, type Change, type Entry, type Site } from "@atelier/model";
import type { ChangeInput, ChangeResult, SiteStore, StoredSite } from "./types";

/**
 * Dépôt Supabase (Postgres). Schéma : supabase/schema.sql.
 * Utilise la clé de service côté serveur uniquement ; le client n'accède jamais à Supabase directement.
 */
export class SupabaseSiteStore implements SiteStore {
  private client: SupabaseClient;
  constructor(url: string, serviceKey: string) {
    this.client = createClient(url, serviceKey, { auth: { persistSession: false } });
  }

  async get(id: string): Promise<StoredSite | null> {
    const { data, error } = await this.client.from("sites").select("document, version").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? { site: data.document as Site, version: data.version as number } : null;
  }

  async create(site: Site): Promise<StoredSite> {
    const { error } = await this.client.from("sites").insert({ id: site.id, name: site.name, document: site, version: 0 });
    if (error) throw error;
    return { site, version: 0 };
  }

  async appendChange(id: string, change: ChangeInput): Promise<ChangeResult> {
    const current = await this.get(id);
    if (!current) throw new Error(`Site introuvable : ${id}`);
    if (current.version !== change.baseVersion) return { ok: false, conflict: true, version: current.version };
    const r = applyOps(current.site, change.ops);
    const { data, error } = await this.client.rpc("commit_change", {
      p_site_id: id,
      p_base_version: change.baseVersion,
      p_document: r.site,
      p_ops: r.ops,
      p_author: change.author,
      p_label: change.label ?? null,
    });
    if (error) throw error;
    const res = data as { ok: boolean; version: number };
    if (!res.ok) return { ok: false, conflict: true, version: res.version };
    return { ok: true, version: res.version, ops: r.ops };
  }

  async changes(id: string, sinceVersion: number): Promise<Change[]> {
    const { data, error } = await this.client.from("changes").select("version, ops, author, label, created_at").eq("site_id", id).gt("version", sinceVersion).order("version");
    if (error) throw error;
    return (data ?? []).map((c) => ({ id: `${id}:${c.version}`, version: c.version, ops: c.ops, author: c.author, label: c.label ?? undefined, at: c.created_at }));
  }

  async entries(id: string): Promise<Entry[]> {
    const { data, error } = await this.client.from("entries").select("id, database_id, status, values, created_at, updated_at").eq("site_id", id);
    if (error) throw error;
    return (data ?? []).map((e) => ({ id: e.id, database: e.database_id, status: e.status, values: e.values, createdAt: e.created_at, updatedAt: e.updated_at }));
  }

  async setEntries(id: string, entries: Entry[]): Promise<void> {
    const rows = entries.map((e) => ({ id: e.id, site_id: id, database_id: e.database, status: e.status, values: e.values, created_at: e.createdAt, updated_at: e.updatedAt }));
    const { error } = await this.client.from("entries").upsert(rows);
    if (error) throw error;
  }
  async upsertEntries(id: string, entries: Entry[]): Promise<void> { await this.setEntries(id, entries); }
  async deleteEntries(id: string, ids: string[]): Promise<void> {
    if (!ids.length) return;
    const { error } = await this.client.from("entries").delete().eq("site_id", id).in("id", ids);
    if (error) throw new Error(error.message);
  }
}
