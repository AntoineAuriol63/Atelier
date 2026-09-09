import { LIMITS, tooLarge } from "@/lib/limits";
import { guardSite } from "@/lib/site-access";
import { schema, type Entry } from "@atelier/model";
import { getStore } from "@/lib/store";

/** Entrées des bases de données d'un site : `GET` liste, `PUT { entries }` ajoute ou remplace, `DELETE { ids }` supprime. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  return Response.json({ entries: await getStore().entries(id) });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  const big = tooLarge(req, LIMITS.entriesBytes, "Cet envoi d'entrées");
  if (big) return big;
  let body: { entries?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  if (!Array.isArray(body.entries) || body.entries.length === 0) return Response.json({ error: "entries manquantes" }, { status: 400 });
  if (body.entries.length > LIMITS.entriesCount) return Response.json({ error: `${LIMITS.entriesCount} entrées au plus par envoi (${body.entries.length} reçues) : découpez l'import.` }, { status: 413 });
  const entries: Entry[] = [];
  for (const [i, raw] of body.entries.entries()) {
    const r = schema.entry.safeParse(raw);
    if (!r.success) return Response.json({ error: `Entrée ${i} invalide`, issues: r.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`) }, { status: 400 });
    entries.push(r.data as Entry);
  }
  try { await getStore().upsertEntries(id, entries); } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 422 }); }
  return Response.json({ ok: true, count: entries.length });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  let body: { ids?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  const ids = Array.isArray(body.ids) ? body.ids.filter((x): x is string => typeof x === "string") : [];
  if (!ids.length) return Response.json({ error: "ids manquants" }, { status: 400 });
  try { await getStore().deleteEntries(id, ids); } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 422 }); }
  return Response.json({ ok: true, count: ids.length });
}
