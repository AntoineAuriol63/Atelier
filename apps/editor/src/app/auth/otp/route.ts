import { cookies } from "next/headers";
import { safePath } from "@/lib/safe-path";
import { isProduction } from "@/lib/env";
import { serverSupabase, authEnabled, canSignIn } from "@/lib/auth";

/** Envoie le lien de connexion par email (Supabase Auth, lien magique), après vérification des adresses autorisées. */
export async function POST(req: Request) {
  if (!authEnabled()) return Response.json({ error: "La connexion n'est pas configurée" }, { status: 400 });
  let body: { email?: unknown; suite?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps invalide" }, { status: 400 }); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Adresse email invalide" }, { status: 400 });
  if (!(await canSignIn(email))) return Response.json({ error: "Cette adresse n'est pas autorisée sur cet Atelier." }, { status: 403 });
  const origin = new URL(req.url).origin;
  const suite = safePath(typeof body.suite === "string" ? body.suite : "/");
  const supabase = await serverSupabase();
  // L'adresse de retour reste exactement celle déclarée dans Supabase ; la page à rouvrir voyage dans un cookie court.
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback` } });
  if (error) {
    const msg = /rate limit/i.test(error.message) ? "Trop d'emails envoyés pour l'instant : l'envoi intégré de Supabase est limité à quelques messages par heure. Réessayez dans une heure, ou branchez un service d'envoi (docs/supabase.md)."
      : /timeout|timed out|gateway/i.test(error.message) ? "Le service d'envoi d'emails ne répond pas : vérifiez le réglage SMTP dans Supabase (hôte, port 587, identifiants), puis réessayez."
      : /smtp|mail/i.test(error.message) ? `Envoi de l'email refusé par le service : ${error.message}` : error.message;
    return Response.json({ error: msg }, { status: /rate limit/i.test(error.message) ? 429 : 500 });
  }
  (await cookies()).set("atelier_suite", suite, { path: "/", maxAge: 900, httpOnly: true, sameSite: "lax", secure: isProduction() });
  return Response.json({ ok: true });
}
