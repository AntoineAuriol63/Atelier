import { NextResponse, type NextRequest } from "next/server";

/** `<sous-domaine>.<domaine d'Atelier>` est réécrit vers `/s/<sous-domaine>/…` ; l'éditeur et l'API restent sur le domaine nu. */
export function proxy(req: NextRequest) {
  const root = process.env.ATELIER_SITES_DOMAIN ?? "localhost:3000";
  const host = (req.headers.get("host") ?? "").toLowerCase();
  if (host === root || !host.endsWith(`.${root}`)) return NextResponse.next();
  const sub = host.slice(0, -(root.length + 1));
  if (!sub || sub.includes(".") || sub === "www") return NextResponse.next();
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/") || url.pathname.startsWith("/s/")) return NextResponse.next();
  url.pathname = `/s/${sub}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next/|favicon.ico).*)"] };
