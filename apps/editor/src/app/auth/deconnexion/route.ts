import { NextResponse } from "next/server";
import { serverSupabase, authEnabled } from "@/lib/auth";

export async function POST(req: Request) {
  if (authEnabled()) await (await serverSupabase()).auth.signOut();
  return NextResponse.redirect(new URL("/connexion", new URL(req.url).origin), { status: 303 });
}
