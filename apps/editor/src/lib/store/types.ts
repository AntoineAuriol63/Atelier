import type { Change, Entry, Op, Site } from "@atelier/model";

export type StoredSite = { site: Site; version: number };

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
}
