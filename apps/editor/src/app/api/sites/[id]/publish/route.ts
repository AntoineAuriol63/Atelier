import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";
import { invalidatePublished, publicUrl } from "@/lib/published";

/** `GET` : version publiée, historique, adresse. `POST { label? }` : publie le document courant et ses entrées (D36). */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id);
  if (denied) return denied;
  const store = getStore();
  try {
    const [published, publications, stored] = await Promise.all([store.published(id), store.publications(id), store.get(id)]);
    return Response.json({ publishedVersion: published?.version ?? null, publishedAt: published?.publishedAt ?? null, publications, url: stored ? publicUrl(stored.site) : null, version: stored?.version ?? null });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 500 }); }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id);
  if (denied) return denied;
  let body: { label?: unknown } = {};
  try { body = await req.json(); } catch { /* sans corps : sans étiquette */ }
  try {
    const meta = await getStore().publish(id, typeof body.label === "string" && body.label.trim() ? body.label.trim() : undefined);
    invalidatePublished(id);
    const stored = await getStore().get(id);
    return Response.json({ ...meta, url: stored ? publicUrl(stored.site) : null });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Publication impossible" }, { status: 500 }); }
}
