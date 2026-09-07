import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { applyOps, type Change, type Entry, type Site } from "@atelier/model";
import type { ChangeInput, ChangeResult, PublicationMeta, Published, SiteStore, SiteSummary, StoredSite } from "./types";

/**
 * Dépôt Supabase (Postgres). Schéma : supabase/schema.sql.
 * Utilise la clé de service côté serveur uniquement ; le client n'accède jamais à Supabase directement.
 */
export class SupabaseSiteStore implements SiteStore {
  private client: SupabaseClient;
  constructor(url: string, serviceKey: string) {
    this.client = createClient(url, serviceKey, { auth: { persistSession: false } });
  }

  /** La colonne `owner` (bloc « comptes » du schéma) peut manquer sur un projet créé avant : on s'en passe alors, sans propriétaire. */
  private ownerColumn: boolean | null = null;
  private isUndefinedColumn(e: { code?: string; message: string } | null) { return !!e && (e.code === "42703" || /column .* does not exist/.test(e.message)); }

  async get(id: string): Promise<StoredSite | null> {
    if (this.ownerColumn !== false) {
      const r = await this.client.from("sites").select("document, version, owner").eq("id", id).maybeSingle();
      if (!r.error) { this.ownerColumn = true; return r.data ? { site: r.data.document as Site, version: r.data.version as number, owner: (r.data.owner as string | null) ?? null } : null; }
      if (!this.isUndefinedColumn(r.error)) throw r.error;
      this.ownerColumn = false;
    }
    const { data, error } = await this.client.from("sites").select("document, version").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? { site: data.document as Site, version: data.version as number, owner: null } : null;
  }

  async create(site: Site, owner?: string): Promise<StoredSite> {
    const row: Record<string, unknown> = { id: site.id, name: site.name, document: site, version: 0 };
    if (this.ownerColumn !== false) row.owner = owner ?? null;
    let { error } = await this.client.from("sites").insert(row);
    if (error && this.isUndefinedColumn(error) && "owner" in row) { this.ownerColumn = false; delete row.owner; ({ error } = await this.client.from("sites").insert(row)); }
    if (error) throw new Error(error.message);
    return { site, version: 0, owner: this.ownerColumn === false ? null : owner ?? null };
  }

  async listSites(owner?: string): Promise<SiteSummary[]> {
    const cols = (withOwner: boolean) => `id, name, version, updated_at, published_version, subdomain${withOwner ? ", owner" : ""}`;
    let q = this.client.from("sites").select(cols(this.ownerColumn !== false)).order("updated_at", { ascending: false });
    if (owner && this.ownerColumn !== false) q = q.or(`owner.eq.${owner},owner.is.null`);
    let { data, error } = await q;
    if (error && this.isUndefinedColumn(error) && this.ownerColumn !== false) { this.ownerColumn = false; ({ data, error } = await this.client.from("sites").select(cols(false)).order("updated_at", { ascending: false })); }
    if (error) this.missingColumn(error);
    return ((data ?? []) as unknown as Record<string, unknown>[]).map((r) => ({ id: r.id as string, name: r.name as string, version: r.version as number, updatedAt: r.updated_at as string, publishedVersion: (r.published_version as number | null) ?? null, subdomain: (r.subdomain as string | null) ?? null, owner: (r.owner as string | null) ?? null }));
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from("sites").delete().eq("id", id);
    if (error) throw new Error(error.message);
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

  private missingColumn(e: { message: string }): never {
    if (/published_version|subdomain|owner|column/.test(e.message)) throw new Error(`${e.message} — exécutez les blocs « publication » et « comptes » de supabase/schema.sql`);
    throw new Error(e.message);
  }
  async publish(id: string, label?: string): Promise<PublicationMeta> {
    const current = await this.get(id);
    if (!current) throw new Error(`Site introuvable : ${id}`);
    const entries = await this.entries(id);
    const createdAt = new Date().toISOString();
    const snap = await this.client.from("snapshots").upsert({ site_id: id, version: current.version, document: { site: current.site, entries }, kind: "publish", label: label ?? null, created_at: createdAt }, { onConflict: "site_id,version" });
    if (snap.error) throw new Error(snap.error.message);
    // Le sous-domaine enregistré est toujours celui qui répond (réglé, sinon dérivé de l'identifiant), pour que la recherche par hôte soit directe.
    const sub = current.site.settings.subdomain ?? id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const up = await this.client.from("sites").update({ published_version: current.version, subdomain: sub }).eq("id", id);
    if (up.error) this.missingColumn(up.error);
    return { version: current.version, label, createdAt };
  }
  async publications(id: string): Promise<PublicationMeta[]> {
    const { data, error } = await this.client.from("snapshots").select("version, label, created_at").eq("site_id", id).eq("kind", "publish").order("version", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({ version: r.version as number, label: (r.label as string | null) ?? undefined, createdAt: r.created_at as string }));
  }
  async published(id: string): Promise<Published | null> {
    const site = await this.client.from("sites").select("published_version").eq("id", id).maybeSingle();
    if (site.error) this.missingColumn(site.error);
    const version = site.data?.published_version as number | null | undefined;
    if (version === null || version === undefined) return null;
    const { data, error } = await this.client.from("snapshots").select("document, created_at").eq("site_id", id).eq("version", version).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    const doc = data.document as { site: Site; entries?: Entry[] };
    return { site: doc.site, entries: doc.entries ?? [], version, publishedAt: data.created_at as string };
  }
  async restore(id: string, version: number): Promise<PublicationMeta> {
    const { data, error } = await this.client.from("snapshots").select("version, label, created_at").eq("site_id", id).eq("version", version).eq("kind", "publish").maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error(`Version ${version} introuvable`);
    const up = await this.client.from("sites").update({ published_version: version }).eq("id", id);
    if (up.error) this.missingColumn(up.error);
    return { version, label: (data.label as string | null) ?? undefined, createdAt: data.created_at as string };
  }
  async findBySubdomain(sub: string): Promise<string | null> {
    // Un sous-domaine dérivé de l'identifiant (`site_marie` → `site-marie`) répond aussi.
    const guess = sub.replace(/-/g, "_");
    const { data, error } = await this.client.from("sites").select("id").or(`subdomain.eq.${sub},id.eq.${sub},id.ilike.${guess}`).limit(1).maybeSingle();
    if (error) this.missingColumn(error);
    return (data?.id as string | undefined) ?? null;
  }
}
