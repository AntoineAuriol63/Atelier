import { getStore } from "@/lib/store";
import { authEnabled, getSessionUser } from "@/lib/auth";

const VALID = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/** Disponibilité d'un sous-domaine : `?sub=monsite&site=<id>` (le site lui-même ne compte pas comme occupant). */
export async function GET(req: Request) {
  if (authEnabled() && !(await getSessionUser())) return Response.json({ error: "Connexion requise" }, { status: 401 });
  const url = new URL(req.url);
  const sub = (url.searchParams.get("sub") ?? "").toLowerCase();
  const self = url.searchParams.get("site");
  if (!VALID.test(sub)) return Response.json({ sub, valid: false, available: false, reason: "Lettres, chiffres et tirets, sans commencer ni finir par un tiret." });
  try {
    const owner = await getStore().findBySubdomain(sub);
    const available = !owner || owner === self;
    return Response.json({ sub, valid: true, available, reason: available ? null : "Déjà pris par un autre site." });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Erreur" }, { status: 500 }); }
}
