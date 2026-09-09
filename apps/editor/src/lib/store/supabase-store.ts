import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { applyOps, migrate, validateSite, type Change, type Entry, type Site } from "@atelier/model";
import type { ChangeInput, ChangeResult, Member, PublicationMeta, Published, SiteStore, SiteSummary, StoredSite } from "./types";
import { isProduction } from "@/lib/env";

const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

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
  private isUndefinedColumn(e: { code?: string; message: string } | null) {
    const missing = !!e && (e.code === "42703" || /column .* does not exist/.test(e.message));
    // En production, se passer de la colonne des propriétaires reviendrait à ouvrir tous les sites : on refuse.
    if (missing && isProduction()) throw new Error("La colonne sites.owner manque : exécutez le bloc « comptes » de supabase/schema.sql");
    return missing;
  }

  async get(id: string): Promise<StoredSite | null> {
    if (this.ownerColumn !== false) {
      const r = await this.client.from("sites").select("document, version, owner").eq("id", id).maybeSingle();
      if (!r.error) { this.ownerColumn = true; return r.data ? { site: migrate(r.data.document), version: r.data.version as number, owner: (r.data.owner as string | null) ?? null } : null; }
      if (!this.isUndefinedColumn(r.error)) throw r.error;
      this.ownerColumn = false;
    }
    const { data, error } = await this.client.from("sites").select("document, version").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? { site: migrate(data.document), version: data.version as number, owner: null } : null;
  }

  async create(site: Site, owner?: string): Promise<StoredSite> {
    const row: Record<string, unknown> = { id: site.id, name: site.name, document: site, version: 0 };
    if (this.ownerColumn !== false) row.owner = owner ?? null;
    let { error } = await this.client.from("sites").insert(row);
    if (error && this.isUndefinedColumn(error) && "owner" in row) { this.ownerColumn = false; delete row.owner; ({ error } = await this.client.from("sites").insert(row)); }
    if (error) throw new Error(error.message);
    return { site, version: 0, owner: this.ownerColumn === false ? null : owner ?? null };
  }

  async listSites(user?: string): Promise<SiteSummary[]> {
    const cols = (withOwner: boolean) => `id, name, version, updated_at, published_version, subdomain${withOwner ? ", owner" : ""}`;
    // Sites où le compte est invité (table du bloc « partage »), pour les lister avec les siens.
    const memberships = user ? await this.membershipsOf(user) : new Map<string, Member["role"]>();
    let q = this.client.from("sites").select(cols(this.ownerColumn !== false)).order("updated_at", { ascending: false });
    if (user && this.ownerColumn !== false) q = memberships.size ? q.or(`owner.eq.${user},id.in.(${[...memberships.keys()].join(",")})`) : q.eq("owner", user);
    let { data, error } = await q;
    if (error && this.isUndefinedColumn(error) && this.ownerColumn !== false) { this.ownerColumn = false; ({ data, error } = await this.client.from("sites").select(cols(false)).order("updated_at", { ascending: false })); }
    if (error) this.missingColumn(error);
    return ((data ?? []) as unknown as Record<string, unknown>[]).map((r) => {
      const id = r.id as string;
      const role: SiteSummary["role"] = !user ? undefined : memberships.get(id) ?? "owner";
      return { id, name: r.name as string, version: r.version as number, updatedAt: r.updated_at as string, publishedVersion: (r.published_version as number | null) ?? null, subdomain: (r.subdomain as string | null) ?? null, owner: (r.owner as string | null) ?? null, role };
    });
  }

  /** La table `site_members` (bloc « partage ») peut manquer : sans elle, personne n'est invité. En production, on exige le bloc. */
  private membersTable: boolean | null = null;
  private isUndefinedTable(e: { code?: string; message: string } | null) {
    const missing = !!e && (e.code === "42P01" || /relation .* does not exist/.test(e.message));
    if (missing && isProduction()) throw new Error("La table site_members manque : exécutez le bloc « partage » de supabase/schema.sql");
    return missing;
  }
  private async membershipsOf(email: string): Promise<Map<string, Member["role"]>> {
    if (this.membersTable === false) return new Map();
    const r = await this.client.from("site_members").select("site_id, role").eq("email", email.toLowerCase());
    if (r.error) { if (this.isUndefinedTable(r.error)) { this.membersTable = false; return new Map(); } throw new Error(r.error.message); }
    this.membersTable = true;
    return new Map((r.data ?? []).map((m) => [m.site_id as string, m.role as Member["role"]]));
  }
  async members(id: string): Promise<Member[]> {
    if (this.membersTable === false) return [];
    const r = await this.client.from("site_members").select("email, role").eq("site_id", id).order("email");
    if (r.error) { if (this.isUndefinedTable(r.error)) { this.membersTable = false; return []; } throw new Error(r.error.message); }
    this.membersTable = true;
    return (r.data ?? []).map((m) => ({ email: m.email as string, role: m.role as Member["role"] }));
  }
  async setMember(id: string, member: Member): Promise<void> {
    const r = await this.client.from("site_members").upsert({ site_id: id, email: member.email.toLowerCase(), role: member.role }, { onConflict: "site_id,email" });
    if (r.error) throw new Error(this.isUndefinedTable(r.error) ? "Le partage demande le bloc « partage » de supabase/schema.sql" : r.error.message);
  }
  async removeMember(id: string, email: string): Promise<void> {
    const r = await this.client.from("site_members").delete().eq("site_id", id).eq("email", email.toLowerCase());
    if (r.error && !this.isUndefinedTable(r.error)) throw new Error(r.error.message);
  }
  async isMember(email: string): Promise<boolean> { return (await this.membershipsOf(email)).size > 0; }

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

  /** PostgREST tronque à 1 000 lignes sans erreur : toute lecture de liste se fait par tranches jusqu'à épuisement. */
  private async paged<T>(page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>): Promise<T[]> {
    const size = 1000;
    const out: T[] = [];
    for (let from = 0; ; from += size) {
      const { data, error } = await page(from, from + size - 1);
      if (error) throw new Error(error.message);
      out.push(...(data ?? []));
      if (!data || data.length < size) return out;
    }
  }

  async owner(id: string): Promise<{ owner: string | null } | undefined> {
    if (this.ownerColumn === false) { const r = await this.client.from("sites").select("id").eq("id", id).maybeSingle(); if (r.error) throw new Error(r.error.message); return r.data ? { owner: null } : undefined; }
    const r = await this.client.from("sites").select("owner").eq("id", id).maybeSingle();
    if (r.error) { if (this.isUndefinedColumn(r.error)) { this.ownerColumn = false; return this.owner(id); } throw new Error(r.error.message); }
    this.ownerColumn = true;
    return r.data ? { owner: (r.data.owner as string | null) ?? null } : undefined;
  }

  async changes(id: string, sinceVersion: number): Promise<Change[]> {
    const rows = await this.paged<{ version: number; ops: Change["ops"]; author: string; label: string | null; created_at: string }>((from, to) => this.client.from("changes").select("version, ops, author, label, created_at").eq("site_id", id).gt("version", sinceVersion).order("version").range(from, to));
    return rows.map((c) => ({ id: `${id}:${c.version}`, version: c.version, ops: c.ops, author: c.author, label: c.label ?? undefined, at: c.created_at }));
  }

  async entries(id: string): Promise<Entry[]> {
    const rows = await this.paged<{ id: string; database_id: string; status: Entry["status"]; values: Entry["values"]; created_at: string; updated_at: string }>((from, to) => this.client.from("entries").select("id, database_id, status, values, created_at, updated_at").eq("site_id", id).order("created_at").order("id").range(from, to));
    return rows.map((e) => ({ id: e.id, database: e.database_id, status: e.status, values: e.values, createdAt: e.created_at, updatedAt: e.updated_at }));
  }

  async upsertEntries(id: string, entries: Entry[]): Promise<void> {
    const rows = entries.map((e) => ({ id: e.id, site_id: id, database_id: e.database, status: e.status, values: e.values, created_at: e.createdAt, updated_at: e.updatedAt }));
    const { error } = await this.client.from("entries").upsert(rows);
    if (error) throw error;
  }
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
    // On ne met jamais en ligne un document invalide : mieux vaut refuser que servir une page qui casse.
    const valid = validateSite(current.site);
    if (!valid.ok) throw new Error(`Document invalide, publication refusée : ${valid.errors.slice(0, 3).join(" ; ")}`);
    const entries = await this.entries(id);
    const createdAt = new Date().toISOString();
    const snap = await this.client.from("snapshots").upsert({ site_id: id, version: current.version, document: { site: current.site, entries }, kind: "publish", label: label ?? null, created_at: createdAt }, { onConflict: "site_id,version" });
    if (snap.error) throw new Error(snap.error.message);
    // Le sous-domaine enregistré est toujours celui qui répond (réglé, sinon dérivé de l'identifiant), pour que la recherche par hôte soit directe.
    const sub = current.site.settings.subdomain ?? id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const up = await this.client.from("sites").update({ published_version: current.version, subdomain: sub }).eq("id", id);
    if (up.error) this.missingColumn(up.error);
    // L'instantané rend le compactage du journal sûr ; et on ne garde que les vingt dernières publications.
    await this.client.rpc("compact_changes", { p_site_id: id, p_keep: 500 });
    const old = await this.client.from("snapshots").select("version").eq("site_id", id).eq("kind", "publish").order("version", { ascending: false }).range(20, 20 + 999);
    const stale = (old.data ?? []).map((r) => r.version as number).filter((v) => v !== current.version);
    if (stale.length) await this.client.from("snapshots").delete().eq("site_id", id).in("version", stale);
    return { version: current.version, label, createdAt };
  }
  async publishEntries(id: string): Promise<PublicationMeta> {
    const pub = await this.published(id);
    if (!pub) throw new Error("Publiez d'abord le site une première fois.");
    const entries = await this.entries(id);
    const up = await this.client.from("snapshots").update({ document: { site: pub.site, entries } }).eq("site_id", id).eq("version", pub.version);
    if (up.error) throw new Error(up.error.message);
    const meta = (await this.publications(id)).find((p) => p.version === pub.version);
    return meta ?? { version: pub.version, createdAt: pub.publishedAt };
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
    const doc = data.document as { site: unknown; entries?: Entry[] };
    return { site: migrate(doc.site), entries: doc.entries ?? [], version, publishedAt: data.created_at as string };
  }
  async restore(id: string, version: number): Promise<PublicationMeta> {
    const { data, error } = await this.client.from("snapshots").select("version, label, created_at").eq("site_id", id).eq("version", version).eq("kind", "publish").maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error(`Version ${version} introuvable`);
    const up = await this.client.from("sites").update({ published_version: version }).eq("id", id);
    if (up.error) this.missingColumn(up.error);
    return { version, label: (data.label as string | null) ?? undefined, createdAt: data.created_at as string };
  }
  async rateLimit(key: string, windowSeconds: number, max: number): Promise<boolean> {
    const { data, error } = await this.client.rpc("rate_limit_hit", { p_key: key, p_window_seconds: windowSeconds, p_max: max });
    if (error) { if (/rate_limit_hit|does not exist/.test(error.message)) throw new Error("Fonction rate_limit_hit absente : exécutez le bloc « limite de débit » de supabase/schema.sql"); throw new Error(error.message); }
    return data !== false;
  }
  async findBySubdomain(sub: string): Promise<string | null> {
    // Le sous-domaine vient de l'hôte de la requête : validé, puis comparé par égalité, jamais interpolé dans un filtre.
    if (!SUBDOMAIN.test(sub)) return null;
    const bySub = await this.client.from("sites").select("id").eq("subdomain", sub).limit(1).maybeSingle();
    if (bySub.error) this.missingColumn(bySub.error);
    if (bySub.data?.id) return bySub.data.id as string;
    const byId = await this.client.from("sites").select("id").eq("id", sub).limit(1).maybeSingle();
    if (byId.error) throw new Error(byId.error.message);
    return (byId.data?.id as string | undefined) ?? null;
  }
}
