import { getStore } from "@/lib/store";
import { canAccess, getSessionUser } from "@/lib/auth";

/** Vérifie que le compte connecté peut agir sur ce site ; rend la réponse d'erreur à renvoyer sinon. */
export async function guardSite(id: string): Promise<Response | null> {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Connexion requise" }, { status: 401 });
  // Le propriétaire seul : on ne charge pas le document pour vérifier un droit.
  const meta = await getStore().owner(id);
  if (!meta) return Response.json({ error: "Site introuvable" }, { status: 404 });
  if (!canAccess(meta.owner, user)) return Response.json({ error: "Accès refusé" }, { status: 403 });
  return null;
}
