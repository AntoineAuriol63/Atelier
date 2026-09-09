import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  const store = getStore();
  const stored = await store.get(id);
  if (!stored) return Response.json({ error: "Site introuvable" }, { status: 404 });
  const entries = await store.entries(id);
  return Response.json({ site: stored.site, version: stored.version, entries });
}

/** Supprime un site (propriétaire seulement). Sans retour possible. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "owner");
  if (denied) return denied;
  const store = getStore();
  try { await store.delete(id); return Response.json({ ok: true }); }
  catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Suppression impossible" }, { status: 500 }); }
}
