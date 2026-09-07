import { serverSupabase, authEnabled, emailAllowed } from "@/lib/auth";

/** Envoie le lien de connexion par email (Supabase Auth, lien magique), après vérification des adresses autorisées. */
export async function POST(req: Request) {
  if (!authEnabled()) return Response.json({ error: "La connexion n'est pas configurée" }, { status: 400 });
  let body: { email?: unknown; suite?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps invalide" }, { status: 400 }); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Adresse email invalide" }, { status: 400 });
  if (!emailAllowed(email)) return Response.json({ error: "Cette adresse n'est pas autorisée sur cet Atelier." }, { status: 403 });
  const origin = new URL(req.url).origin;
  const suite = typeof body.suite === "string" && body.suite.startsWith("/") ? body.suite : "/";
  const supabase = await serverSupabase();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback?suite=${encodeURIComponent(suite)}` } });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
