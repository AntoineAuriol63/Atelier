import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";
import { invalidatePublished } from "@/lib/published";

/** `POST { version }` : remet en ligne un instantané publié précédemment (retour arrière, D36). */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "editor");
  if (denied) return denied;
  let body: { version?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  if (typeof body.version !== "number") return Response.json({ error: "version manquante" }, { status: 400 });
  try {
    const meta = await getStore().restore(id, body.version);
    invalidatePublished(id);
    return Response.json(meta);
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Retour arrière impossible" }, { status: 500 }); }
}
