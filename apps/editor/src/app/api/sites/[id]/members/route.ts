import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Partage d'un site (propriétaire seulement) : `GET` liste, `PUT { email, role }` invite ou change le rôle, `DELETE { email }` retire. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "owner");
  if (denied) return denied;
  return Response.json({ members: await getStore().members(id) });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "owner");
  if (denied) return denied;
  let body: { email?: unknown; role?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps invalide" }, { status: 400 }); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email)) return Response.json({ error: "Adresse email invalide" }, { status: 400 });
  if (body.role !== "editor" && body.role !== "writer") return Response.json({ error: "Rôle inconnu" }, { status: 400 });
  const owner = (await getStore().owner(id))?.owner;
  if (owner && owner.toLowerCase() === email) return Response.json({ error: "Cette adresse est déjà propriétaire du site" }, { status: 400 });
  try { await getStore().setMember(id, { email, role: body.role }); return Response.json({ members: await getStore().members(id) }); }
  catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Partage impossible" }, { status: 500 }); }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "owner");
  if (denied) return denied;
  let body: { email?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps invalide" }, { status: 400 }); }
  if (typeof body.email !== "string") return Response.json({ error: "Adresse manquante" }, { status: 400 });
  await getStore().removeMember(id, body.email);
  return Response.json({ members: await getStore().members(id) });
}
