import path from "node:path";
import { sampleSite, sampleEntries } from "@atelier/model";
import type { SiteStore, StoredSite } from "./types";
import { FileSiteStore } from "./file-store";
import { SupabaseSiteStore } from "./supabase-store";
import { FileAssetStorage, SupabaseAssetStorage, type AssetStorage } from "./assets";
import { assertProduction } from "@/lib/env";

export type { SiteStore, StoredSite, SiteSummary, ChangeInput, ChangeResult, PublicationMeta, Published } from "./types";
export type { AssetStorage } from "./assets";
export { FileAssetStorage } from "./assets";

/** À incrémenter quand l'interface `SiteStore` change. */
const STORE_VERSION = 9;

declare global {
  var __atelierStore: { key: string; store: SiteStore } | undefined;
}

/**
 * Supabase si configuré (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY), sinon fichiers dans `.atelier-data/`.
 * Le dépôt est mis en cache par configuration : un rechargement de `.env.local` en développement bascule sans redémarrage.
 */
/** `ATELIER_STORE=file` force le mode fichier même si Supabase est configuré (essais, exercices). */
const forcedFile = () => process.env.ATELIER_STORE === "file";

export function getStore(): SiteStore {
  assertProduction();
  const url = forcedFile() ? undefined : process.env.SUPABASE_URL, key = forcedFile() ? undefined : process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dir = process.env.ATELIER_DATA_DIR ?? path.resolve(process.cwd(), "../../.atelier-data");
  // La version fait partie de la clé : en développement, un dépôt gardé en mémoire par un ancien module ne survit pas à un changement de son interface.
  const cacheKey = `${STORE_VERSION}:${url && key ? `supabase:${url}` : `file:${dir}`}`;
  if (globalThis.__atelierStore?.key === cacheKey) return globalThis.__atelierStore.store;
  const store = url && key ? new SupabaseSiteStore(url, key) : new FileSiteStore(dir);
  globalThis.__atelierStore = { key: cacheKey, store };
  return store;
}

/** Stockage des fichiers, même règle de configuration que le dépôt. */
export function getAssetStorage(): AssetStorage {
  const url = forcedFile() ? undefined : process.env.SUPABASE_URL, key = forcedFile() ? undefined : process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dir = process.env.ATELIER_DATA_DIR ?? path.resolve(process.cwd(), "../../.atelier-data");
  return url && key ? new SupabaseAssetStorage(url, key) : new FileAssetStorage(dir);
}

export function storeKind(): "supabase" | "file" {
  return !forcedFile() && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "file";
}

/** Charge un site et ses entrées ; `null` s'il n'existe pas. */
export async function loadSite(id: string): Promise<(StoredSite & { entries: Awaited<ReturnType<SiteStore["entries"]>> }) | null> {
  const store = getStore();
  const stored = await store.get(id);
  if (!stored) return null;
  const entries = await store.entries(id);
  return { ...stored, entries };
}

/** Amorçage de développement : sans aucun site, l'exemple de la photographe est créé pour le propriétaire. */
export async function ensureSampleSite(owner?: string): Promise<void> {
  const store = getStore();
  if ((await store.listSites(owner)).length) return;
  try { await store.create(sampleSite, owner); await store.upsertEntries(sampleSite.id, sampleEntries); } catch { /* créé entre-temps */ }
}
