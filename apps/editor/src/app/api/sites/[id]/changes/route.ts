import { getSessionUser } from "@/lib/auth";
import { LIMITS, tooLarge } from "@/lib/limits";
import { guardRole, guardSite } from "@/lib/site-access";
import { opAllowedForWriter, schema, type Op } from "@atelier/model";
import { getStore } from "@/lib/store";

// Point de reprise automatique (23 septembre 2026) : au plus une vérification par site et par heure dans ce processus ; le dépôt
// décide ensuite (un point par jour au plus, trente gardés, journal compacté). Une erreur ici n'empêche jamais l'enregistrement.
const lastCheck = new Map<string, number>();
async function maybeCheckpoint(id: string): Promise<void> {
  const now = Date.now();
  if (now - (lastCheck.get(id) ?? 0) < 3_600_000) return;
  lastCheck.set(id, now);
  try { await getStore().checkpoint(id); } catch (e) { console.warn(`[point de reprise ${id}] ${e instanceof Error ? e.message : e}`); }
}

/** Journal des changements d'un site. GET ?since=<version> ; POST { ops, baseVersion, label? }. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "writer");
  if (denied) return denied;
  const since = Number(new URL(req.url).searchParams.get("since") ?? "0");
  const changes = await getStore().changes(id, Number.isFinite(since) ? since : 0);
  return Response.json({ changes });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { denied, role } = await guardRole(id, "writer");
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
  // Un rédacteur écrit le contenu ; l'apparence et le site restent aux éditeurs (frontière Écriture/Design).
  if (role === "writer" && !ops.every(opAllowedForWriter)) return Response.json({ error: "En tant que rédacteur, vous pouvez modifier les contenus, pas la mise en forme ni les réglages du site." }, { status: 403 });
  try {
    const author = (await getSessionUser())?.email ?? "local";
    const result = await getStore().appendChange(id, { ops, baseVersion: body.baseVersion, author, label: typeof body.label === "string" ? body.label : undefined });
    if (!result.ok) return Response.json({ error: "Conflit de version", version: result.version }, { status: 409 });
    void maybeCheckpoint(id);
    return Response.json({ version: result.version });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 422 });
  }
}
