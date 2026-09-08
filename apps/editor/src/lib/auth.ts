import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type SessionUser = { email: string };

/** La connexion est active dès que l'URL et la clé publique Supabase sont connues du navigateur. Sans elles (mode fichier, essais) : accès libre. */
export const authEnabled = () => process.env.ATELIER_AUTH !== "off" && !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Adresses autorisées à se connecter (`ATELIER_ALLOWED_EMAILS`, séparées par des virgules) ; vide = toutes. */
export function emailAllowed(email: string): boolean {
  const list = (process.env.ATELIER_ALLOWED_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return list.length === 0 || list.includes(email.toLowerCase());
}

/** Client Supabase côté serveur, lié aux cookies de la requête (composants serveur, routes). */
export async function serverSupabase() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* composant serveur : lecture seule, le proxy rafraîchit */ } },
    },
  });
}

/** L'utilisateur connecté, ou `null`. Sans connexion active : un utilisateur local anonyme. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!authEnabled()) return { email: "local" };
  const { data } = await (await serverSupabase()).auth.getUser();
  const email = data.user?.email;
  return email && emailAllowed(email) ? { email } : null;
}

/** Un site est accessible à son propriétaire, et à tous quand il n'en a pas (sites d'avant les comptes). */
export function canAccess(owner: string | null | undefined, user: SessionUser | null): boolean {
  if (!authEnabled()) return true;
  if (!user) return false;
  return !owner || owner === user.email;
}
