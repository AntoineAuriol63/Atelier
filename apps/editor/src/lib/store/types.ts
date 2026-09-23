import type { Change, Entry, Op, Site } from "@atelier/model";

export type StoredSite = { site: Site; version: number; owner?: string | null };
export type SiteSummary = { id: string; name: string; version: number; updatedAt: string; publishedVersion: number | null; subdomain: string | null; owner: string | null; /** Rôle du compte demandé sur ce site (`listSites(user)`), absent sans compte. */ role?: "owner" | "editor" | "writer" };
/** Personne invitée sur un site (D51) : éditeur (tout sauf partage et suppression) ou rédacteur (contenu seulement). */
export type Member = { email: string; role: "editor" | "writer" };

export type PublicationMeta = { version: number; label?: string; createdAt: string };
/** Ce que sert le site publié : l'instantané désigné, jamais le document de travail. */
export type Published = { site: Site; entries: Entry[]; version: number; publishedAt: string };

/** Un instantané du document : une publication (kind « publish ») ou un point de reprise automatique (kind « auto »). */
export type SnapshotMeta = { version: number; createdAt: string; kind: "auto" | "publish"; label?: string };
export type Snapshot = SnapshotMeta & { site: Site; entries: Entry[] };
/** Réglages d'un point de reprise : l'heure (tests), le nombre de points gardés, le nombre de lots gardés dans le journal. */
export type CheckpointOptions = { now?: number; keep?: number; keepChanges?: number };
export const CHECKPOINT_DEFAULTS = { keep: 30, keepChanges: 500, minIntervalMs: 24 * 3_600_000 } as const;

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
  /** Propriétaire d'un site sans charger son document ; `undefined` si le site n'existe pas. */
  owner(id: string): Promise<{ owner: string | null } | undefined>;
  create(site: Site, owner?: string): Promise<StoredSite>;
  /** Sites d'un compte : les siens et ceux où il est invité (les sites sans propriétaire sont visibles de tous), ou tous si `user` absent. */
  listSites(user?: string): Promise<SiteSummary[]>;
  members(id: string): Promise<Member[]>;
  setMember(id: string, member: Member): Promise<void>;
  removeMember(id: string, email: string): Promise<void>;
  /** Vrai si cette adresse est invitée sur au moins un site (elle peut alors se connecter sans figurer dans la liste d'Atelier). */
  isMember(email: string): Promise<boolean>;
  delete(id: string): Promise<void>;
  /** Applique les opérations si `baseVersion` est la version courante ; sinon conflit. */
  appendChange(id: string, change: ChangeInput): Promise<ChangeResult>;
  changes(id: string, sinceVersion: number): Promise<Change[]>;
  entries(id: string): Promise<Entry[]>;
  /** Ajoute ou remplace des entrées (par identifiant). */
  upsertEntries(id: string, entries: Entry[]): Promise<void>;
  deleteEntries(id: string, ids: string[]): Promise<void>;
  /** Fige le document courant et ses entrées en un instantané, qui devient la version publiée (D36). */
  publish(id: string, label?: string): Promise<PublicationMeta>;
  /** Publication du contenu seul : remplace les entrées de la version publiée par les entrées courantes, sans toucher au document en ligne. */
  publishEntries(id: string): Promise<PublicationMeta>;
  publications(id: string): Promise<PublicationMeta[]>;
  published(id: string): Promise<Published | null>;
  /** Désigne un instantané existant comme version publiée (retour arrière). */
  restore(id: string, version: number): Promise<PublicationMeta>;
  /**
   * Point de reprise automatique (23 septembre 2026) : fige le document courant si aucun instantané ne porte déjà cette version
   * et si le dernier point date de plus d'un jour ; garde les `keep` derniers points ; compacte le journal au-delà de `keepChanges`
   * lots (jamais au-delà du dernier instantané). Rend `null` quand rien n'est pris.
   */
  checkpoint(id: string, opts?: CheckpointOptions): Promise<SnapshotMeta | null>;
  /** Les points de reprise, du plus récent au plus ancien. */
  checkpoints(id: string): Promise<SnapshotMeta[]>;
  /** Un instantané complet, publication ou point de reprise ; `null` s'il n'existe pas. */
  snapshot(id: string, version: number): Promise<Snapshot | null>;
  /** Compte un événement pour une clé et dit s'il reste sous le plafond dans la fenêtre (partagé entre instances). */
  rateLimit(key: string, windowSeconds: number, max: number): Promise<boolean>;
  /** Identifiant du site qui répond à ce sous-domaine (ou identifiant nu), `null` sinon. */
  findBySubdomain(sub: string): Promise<string | null>;
}
