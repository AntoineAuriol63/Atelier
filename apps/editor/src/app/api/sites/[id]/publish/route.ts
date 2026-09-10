import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";
import { invalidatePublished, publicUrl } from "@/lib/published";

/** `GET` : version publiée, historique, adresse. `POST { label? }` : publie le document courant et ses entrées (D36) ; `POST { contentOnly: true }` : ne republie que les entrées, sous la version en ligne. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  const store = getStore();
  try {
    const [published, publications, stored] = await Promise.all([store.published(id), store.publications(id), store.get(id)]);
    return Response.json({ publishedVersion: published?.version ?? null, publishedAt: published?.publishedAt ?? null, publications, url: stored ? await publicUrl(stored.site) : null, version: stored?.version ?? null, sitesDomain: process.env.ATELIER_SITES_DOMAIN ?? null, publishedEntries: Object.fromEntries((published?.entries ?? []).map((e) => [e.id, e.updatedAt])) });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 500 }); }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: { label?: unknown; contentOnly?: unknown } = {};
  try { body = await req.json(); } catch { /* sans corps : sans étiquette */ }
  const contentOnly = body.contentOnly === true;
  const denied = await guardSite(id, contentOnly ? "writer" : "editor");
  if (denied) return denied;
  try {
    const meta = contentOnly ? await getStore().publishEntries(id) : await getStore().publish(id, typeof body.label === "string" && body.label.trim() ? body.label.trim() : undefined);
    invalidatePublished(id);
    const stored = await getStore().get(id);
    return Response.json({ ...meta, url: stored ? await publicUrl(stored.site) : null });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Publication impossible" }, { status: 500 }); }
}
