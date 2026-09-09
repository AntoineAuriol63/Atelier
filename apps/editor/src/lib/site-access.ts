import { atLeast, type Role } from "@atelier/model";
import { getStore } from "@/lib/store";
import { authEnabled, getSessionUser, type SessionUser } from "@/lib/auth";

/** Rôle du compte sur un site : propriétaire, invité (éditeur ou rédacteur), ou rien. Sans connexion configurée : propriétaire. `undefined` si le site n'existe pas. */
export async function siteRole(id: string, user: SessionUser | null): Promise<Role | null | undefined> {
  const meta = await getStore().owner(id);
  if (!meta) return undefined;
  if (!authEnabled()) return "owner";
  if (!user) return null;
  // Un site sans propriétaire (créé avant les comptes) n'est accessible à personne tant qu'on ne lui en a pas donné un (`scripts/assign-owner.mjs`).
  if (meta.owner && meta.owner.toLowerCase() === user.email.toLowerCase()) return "owner";
  const m = (await getStore().members(id)).find((x) => x.email.toLowerCase() === user.email.toLowerCase());
  return m?.role ?? null;
}

/** Vérifie que le compte connecté a au moins ce rôle sur le site ; rend la réponse d'erreur à renvoyer sinon, et le rôle sinon. */
export async function guardSite(id: string, min: Role = "editor"): Promise<Response | null> {
  return (await guardRole(id, min)).denied;
}
export async function guardRole(id: string, min: Role = "editor"): Promise<{ denied: Response | null; role: Role | null }> {
  const user = await getSessionUser();
  if (!user) return { denied: Response.json({ error: "Connexion requise" }, { status: 401 }), role: null };
  const role = await siteRole(id, user);
  if (role === undefined) return { denied: Response.json({ error: "Site introuvable" }, { status: 404 }), role: null };
  if (!atLeast(role, min)) return { denied: Response.json({ error: role ? "Votre rôle sur ce site ne le permet pas" : "Accès refusé" }, { status: 403 }), role };
  return { denied: null, role };
}
