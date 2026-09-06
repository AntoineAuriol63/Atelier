import { getStore } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = getStore();
  const stored = await store.get(id);
  if (!stored) return Response.json({ error: "Site introuvable" }, { status: 404 });
  const entries = await store.entries(id);
  return Response.json({ site: stored.site, version: stored.version, entries });
}
