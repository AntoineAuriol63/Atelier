import path from "node:path";
import { sampleSite, sampleEntries } from "@atelier/model";
import type { SiteStore, StoredSite } from "./types";
import { FileSiteStore } from "./file-store";
import { SupabaseSiteStore } from "./supabase-store";

export type { SiteStore, StoredSite, ChangeInput, ChangeResult } from "./types";

declare global {
  var __atelierStore: SiteStore | undefined;
}

/** Supabase si configuré (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY), sinon fichiers dans `.atelier-data/`. */
export function getStore(): SiteStore {
  if (globalThis.__atelierStore) return globalThis.__atelierStore;
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const store = url && key
    ? new SupabaseSiteStore(url, key)
    : new FileSiteStore(process.env.ATELIER_DATA_DIR ?? path.resolve(process.cwd(), "../../.atelier-data"));
  globalThis.__atelierStore = store;
  return store;
}

/** Identifiant du site courant (v0 : un seul site, celui de l'exemple). */
export const CURRENT_SITE_ID = sampleSite.id;

/** Charge le site courant ; le crée depuis l'exemple s'il n'existe pas encore (amorçage de développement). */
export async function loadCurrentSite(): Promise<StoredSite & { entries: Awaited<ReturnType<SiteStore["entries"]>> }> {
  const store = getStore();
  let stored = await store.get(CURRENT_SITE_ID);
  if (!stored) {
    stored = await store.create(sampleSite);
    await store.setEntries(CURRENT_SITE_ID, sampleEntries);
  }
  const entries = await store.entries(CURRENT_SITE_ID);
  return { ...stored, entries };
}
