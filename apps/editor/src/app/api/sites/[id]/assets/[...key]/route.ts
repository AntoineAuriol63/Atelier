import { FileAssetStorage, getAssetStorage } from "@/lib/store";

const MIME: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif", svg: "image/svg+xml", tif: "image/tiff", heic: "image/heic" };

/** Sert un fichier du stockage sur fichiers (développement). En production, les adresses pointent directement sur Supabase Storage. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string; key: string[] }> }) {
  const { id, key } = await params;
  const storage = getAssetStorage();
  if (!(storage instanceof FileAssetStorage)) return new Response("Introuvable", { status: 404 });
  const k = key.join("/");
  let bytes: Buffer | null;
  try { bytes = await storage.read(id, k); } catch { return new Response("Chemin invalide", { status: 400 }); }
  if (!bytes) return new Response("Introuvable", { status: 404 });
  const ext = k.split(".").pop()?.toLowerCase() ?? "";
  return new Response(new Uint8Array(bytes), { headers: { "content-type": MIME[ext] ?? "application/octet-stream", "cache-control": "public, max-age=31536000, immutable" } });
}
