import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverSupabase, emailAllowed } from "@/lib/auth";
import { safePath } from "@/lib/safe-path";

/** Retour du lien magique : échange le code contre une session (cookies), puis renvoie vers l'éditeur. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const jar = await cookies();
  const suite = jar.get("atelier_suite")?.value ?? url.searchParams.get("suite") ?? "/";
  const supabase = await serverSupabase();
  const fail = (msg: string) => NextResponse.redirect(new URL(`/connexion?erreur=${encodeURIComponent(msg)}`, url.origin));
  const result = code ? await supabase.auth.exchangeCodeForSession(code) : tokenHash && type ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as "magiclink" | "email" }) : null;
  if (!result) return fail("lien-invalide");
  // Le lien a été demandé depuis un autre navigateur (ou une autre session) : la clé temporaire n'est pas là.
  if (result.error) return fail(/code (challenge|verifier)/i.test(result.error.message) ? "autre-navigateur" : result.error.message);
  jar.delete("atelier_suite");
  const email = result.data.user?.email ?? "";
  if (!emailAllowed(email)) { await supabase.auth.signOut(); return fail("non-autorise"); }
  return NextResponse.redirect(new URL(safePath(suite), url.origin));
}
