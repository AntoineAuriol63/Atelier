import { NextResponse } from "next/server";
import { serverSupabase, emailAllowed } from "@/lib/auth";

/** Retour du lien magique : échange le code contre une session (cookies), puis renvoie vers l'éditeur. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const suite = url.searchParams.get("suite") ?? "/";
  const supabase = await serverSupabase();
  const fail = (msg: string) => NextResponse.redirect(new URL(`/connexion?erreur=${encodeURIComponent(msg)}`, url.origin));
  const result = code ? await supabase.auth.exchangeCodeForSession(code) : tokenHash && type ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as "magiclink" | "email" }) : null;
  if (!result) return fail("lien-invalide");
  if (result.error) return fail(result.error.message);
  const email = result.data.user?.email ?? "";
  if (!emailAllowed(email)) { await supabase.auth.signOut(); return fail("non-autorise"); }
  return NextResponse.redirect(new URL(suite.startsWith("/") ? suite : "/", url.origin));
}
