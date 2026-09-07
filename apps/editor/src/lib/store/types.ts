import type { Change, Entry, Op, Site } from "@atelier/model";

export type StoredSite = { site: Site; version: number };

export type PublicationMeta = { version: number; label?: string; createdAt: string };
/** Ce que sert le site publié : l'instantané désigné, jamais le document de travail. */
export type Published = { site: Site; entries: Entry[]; version: number; publishedAt: string };

export type ChangeInput = { ops: Op[]; baseVersion: number; author: string; label?: string };

export type ChangeResult =
  | { ok: true; version: number; ops: Op[] }
  | { ok: false; conflict: true; version: number };

/**
 * Dépôt d'un site : document courant versionné + journal d'opérations (D57).
 * Une implémentation fichier pour le développement, une implémentation Supabase pour la production.
 */
export interface SiteStore {
  get(id: string): Promise<StoredSite | null>;
  create(site: Site): Promise<StoredSite>;
  /** Applique les opérations si `baseVersion` est la version courante ; sinon conflit. */
  appendChange(id: string, change: ChangeInput): Promise<ChangeResult>;
  changes(id: string, sinceVersion: number): Promise<Change[]>;
  entries(id: string): Promise<Entry[]>;
  setEntries(id: string, entries: Entry[]): Promise<void>;
  /** Ajoute ou remplace des entrées (par identifiant). */
  upsertEntries(id: string, entries: Entry[]): Promise<void>;
  deleteEntries(id: string, ids: string[]): Promise<void>;
  /** Fige le document courant et ses entrées en un instantané, qui devient la version publiée (D36). */
  publish(id: string, label?: string): Promise<PublicationMeta>;
  publications(id: string): Promise<PublicationMeta[]>;
  published(id: string): Promise<Published | null>;
  /** Désigne un instantané existant comme version publiée (retour arrière). */
  restore(id: string, version: number): Promise<PublicationMeta>;
  /** Identifiant du site qui répond à ce sous-domaine (ou identifiant nu), `null` sinon. */
  findBySubdomain(sub: string): Promise<string | null>;
}
