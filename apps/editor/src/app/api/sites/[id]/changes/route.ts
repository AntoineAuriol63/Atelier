import { LIMITS, tooLarge } from "@/lib/limits";
import { guardSite } from "@/lib/site-access";
import { schema, type Op } from "@atelier/model";
import { getStore } from "@/lib/store";

/** Journal des changements d'un site. GET ?since=<version> ; POST { ops, baseVersion, label? }. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id);
  if (denied) return denied;
  const since = Number(new URL(req.url).searchParams.get("since") ?? "0");
  const changes = await getStore().changes(id, Number.isFinite(since) ? since : 0);
  return Response.json({ changes });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id);
  if (denied) return denied;
  const big = tooLarge(req, LIMITS.changesBytes, "Cette modification");
  if (big) return big;
  let body: { ops?: unknown; baseVersion?: unknown; label?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  if (!Array.isArray(body.ops) || body.ops.length === 0) return Response.json({ error: "ops manquantes" }, { status: 400 });
  if (typeof body.baseVersion !== "number") return Response.json({ error: "baseVersion manquante" }, { status: 400 });
  const ops: Op[] = [];
  for (const [i, raw] of body.ops.entries()) {
    const r = schema.op.safeParse(raw);
    if (!r.success) return Response.json({ error: `Opération ${i} invalide`, issues: r.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`) }, { status: 400 });
    ops.push(r.data as Op);
  }
  try {
    // Pas d'authentification en v0 : un seul auteur.
    const result = await getStore().appendChange(id, { ops, baseVersion: body.baseVersion, author: "local", label: typeof body.label === "string" ? body.label : undefined });
    if (!result.ok) return Response.json({ error: "Conflit de version", version: result.version }, { status: 409 });
    return Response.json({ version: result.version });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 422 });
  }
}
