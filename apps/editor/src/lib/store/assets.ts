import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Stockage des fichiers (images…) : le document ne garde que des adresses. */
export interface AssetStorage {
  /** Écrit un fichier sous `siteId/key` et rend son adresse publique. */
  put(siteId: string, key: string, bytes: Buffer, mime: string): Promise<string>;
}

const SITE_ID = /^[A-Za-z0-9_-]{1,64}$/;
const KEY = /^[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_.-]+)*$/;
function check(siteId: string, key: string) {
  if (!SITE_ID.test(siteId) || !KEY.test(key) || key.split("/").some((seg) => seg === "." || seg === "..")) throw new Error("Chemin de fichier invalide");
}

/** Développement : `<dir>/assets/<site>/<clé>`, servi par `GET /api/sites/:id/assets/<clé>`. */
export class FileAssetStorage implements AssetStorage {
  constructor(private dir: string) {}
  filePath(siteId: string, key: string) {
    check(siteId, key);
    const base = path.resolve(this.dir, "assets");
    const full = path.resolve(base, siteId, key);
    if (!full.startsWith(base + path.sep)) throw new Error("Chemin de fichier invalide");
    return full;
  }
  async put(siteId: string, key: string, bytes: Buffer): Promise<string> {
    const f = this.filePath(siteId, key);
    await mkdir(path.dirname(f), { recursive: true });
    await writeFile(f, bytes);
    return `/api/sites/${siteId}/assets/${key}`;
  }
  async read(siteId: string, key: string): Promise<Buffer | null> {
    try { return await readFile(this.filePath(siteId, key)); } catch { return null; }
  }
}

/** Supabase Storage, seau public `assets` (voir supabase/schema.sql). */
export class SupabaseAssetStorage implements AssetStorage {
  private client: SupabaseClient;
  constructor(url: string, serviceKey: string) { this.client = createClient(url, serviceKey, { auth: { persistSession: false } }); }
  async put(siteId: string, key: string, bytes: Buffer, mime: string): Promise<string> {
    check(siteId, key);
    const p = `${siteId}/${key}`;
    const opts = { contentType: mime, upsert: true, cacheControl: "31536000" };
    let { error } = await this.client.storage.from("assets").upload(p, bytes, opts);
    // Seau absent (schéma exécuté avant son ajout) : on le crée, une fois.
    if (error && /bucket not found/i.test(error.message)) {
      const created = await this.client.storage.createBucket("assets", { public: true, fileSizeLimit: 52428800 });
      if (created.error && !/already exists/i.test(created.error.message)) throw new Error(`Stockage : ${created.error.message}`);
      ({ error } = await this.client.storage.from("assets").upload(p, bytes, opts));
    }
    if (error) throw new Error(`Stockage : ${error.message}`);
    return this.client.storage.from("assets").getPublicUrl(p).data.publicUrl;
  }
}
