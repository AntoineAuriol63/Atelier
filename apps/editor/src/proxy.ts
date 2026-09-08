import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/** Ce qui reste public : les sites publiés, les envois de formulaires, les fichiers servis, la connexion. */
const PUBLIC = [/^\/s\//, /^\/api\/forms\//, /^\/api\/sites\/[^/]+\/assets\//, /^\/connexion/, /^\/auth\//, /^\/favicon/];
/** Adresses autorisées, lues à chaque requête (le fichier .env.local peut changer sans redémarrage en développement). */
const allowed = () => (process.env.ATELIER_ALLOWED_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

/**
 * 1. `<sous-domaine>.<domaine d'Atelier>` est réécrit vers `/s/<sous-domaine>/…` (sites publiés, publics).
 * 2. Le reste (éditeur, aperçu, API) demande un compte connecté quand Supabase Auth est configuré.
 */
export async function proxy(req: NextRequest) {
  const root = process.env.ATELIER_SITES_DOMAIN ?? "localhost:3000";
  const host = (req.headers.get("host") ?? "").toLowerCase();
  const path = req.nextUrl.pathname;
  if (host !== root && host.endsWith(`.${root}`)) {
    const sub = host.slice(0, -(root.length + 1));
    if (sub && !sub.includes(".") && sub !== "www" && !path.startsWith("/api/") && !path.startsWith("/_next/") && !path.startsWith("/s/")) {
      const url = req.nextUrl.clone();
      url.pathname = `/s/${sub}${path === "/" ? "" : path}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || PUBLIC.some((re) => re.test(path))) return NextResponse.next();
  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => { list.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); },
    },
  });
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  const list = allowed();
  const ok = !!email && (list.length === 0 || list.includes(email));
  if (ok) return res;
  if (path.startsWith("/api/")) return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  const to = req.nextUrl.clone();
  to.pathname = "/connexion"; to.search = "";
  to.searchParams.set("suite", path + req.nextUrl.search);
  if (email) to.searchParams.set("erreur", "non-autorise");
  return NextResponse.redirect(to);
}

export const config = { matcher: ["/((?!_next/|favicon.ico).*)"] };
