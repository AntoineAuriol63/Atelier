import path from "node:path";
import { sampleSite, sampleEntries } from "@atelier/model";
import type { SiteStore, StoredSite } from "./types";
import { FileSiteStore } from "./file-store";
import { SupabaseSiteStore } from "./supabase-store";

export type { SiteStore, StoredSite, ChangeInput, ChangeResult } from "./types";

declare global {
  var __atelierStore: { key: string; store: SiteStore } | undefined;
}

/**
 * Supabase si configuré (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY), sinon fichiers dans `.atelier-data/`.
 * Le dépôt est mis en cache par configuration : un rechargement de `.env.local` en développement bascule sans redémarrage.
 */
export function getStore(): SiteStore {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dir = process.env.ATELIER_DATA_DIR ?? path.resolve(process.cwd(), "../../.atelier-data");
  const cacheKey = url && key ? `supabase:${url}` : `file:${dir}`;
  if (globalThis.__atelierStore?.key === cacheKey) return globalThis.__atelierStore.store;
  const store = url && key ? new SupabaseSiteStore(url, key) : new FileSiteStore(dir);
  globalThis.__atelierStore = { key: cacheKey, store };
  return store;
}

export function storeKind(): "supabase" | "file" {
  return process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "file";
}

/** Identifiant du site courant (v0 : un seul site, celui de l'exemple). */
export const CURRENT_SITE_ID = sampleSite.id;

/** Charge le site courant ; le crée depuis l'exemple s'il n'existe pas encore (amorçage de développement). */
export async function loadCurrentSite(): Promise<StoredSite & { entries: Awaited<ReturnType<SiteStore["entries"]>> }> {
  const store = getStore();
  let stored = await store.get(CURRENT_SITE_ID);
  if (!stored) {
    // Deux requêtes peuvent amorcer en même temps (éditeur et aperçu) : la seconde relit simplement.
    try {
      stored = await store.create(sampleSite);
      await store.setEntries(CURRENT_SITE_ID, sampleEntries);
    } catch {
      stored = await store.get(CURRENT_SITE_ID);
      if (!stored) throw new Error("Impossible d'amorcer le site courant");
    }
  }
  const entries = await store.entries(CURRENT_SITE_ID);
  return { ...stored, entries };
}
