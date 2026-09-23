import { planReplaceSite } from "@atelier/model";
import { getSessionUser } from "@/lib/auth";
import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";

/**
 * `POST { version }` : reprend un instantané (publication ou point de reprise) comme version de travail (23 septembre 2026).
 * Le document courant est ramené à cet état par un changement ordinaire du journal : le verrou de version et « annuler » restent vrais.
 * Les entrées des bases ne bougent pas : elles vivent hors du document.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "editor");
  if (denied) return denied;
  let body: { version?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  if (typeof body.version !== "number") return Response.json({ error: "version manquante" }, { status: 400 });
  try {
    const store = getStore();
    const [snap, current] = await Promise.all([store.snapshot(id, body.version), store.get(id)]);
    if (!snap || !current) return Response.json({ error: "Version introuvable" }, { status: 404 });
    const ops = planReplaceSite(current.site, snap.site);
    if (!ops.length) return Response.json({ version: current.version, unchanged: true });
    const author = (await getSessionUser())?.email ?? "local";
    const label = snap.kind === "publish" ? `Reprendre la publication${snap.label ? ` « ${snap.label} »` : ""}` : "Reprendre un point de reprise";
    const result = await store.appendChange(id, { ops, baseVersion: current.version, author, label });
    if (!result.ok) return Response.json({ error: "Le site vient de changer : réessayez." }, { status: 409 });
    return Response.json({ version: result.version });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Reprise impossible" }, { status: 500 }); }
}
