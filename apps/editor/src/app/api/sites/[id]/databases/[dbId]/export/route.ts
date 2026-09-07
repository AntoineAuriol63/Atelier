import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";
import { toCsv } from "@/lib/csv";
import { findForms, formDatabase, formDatabaseId } from "@/lib/forms";

/** Export CSV d'une base (ou des messages d'un formulaire, `frm_<formId>`), en pièce jointe. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string; dbId: string }> }) {
  const { id, dbId } = await params;
  const denied = await guardSite(id);
  if (denied) return denied;
  const store = getStore();
  const stored = await store.get(id);
  if (!stored) return new Response("Site introuvable", { status: 404 });
  const site = stored.site;
  const form = findForms(site).find((f) => formDatabaseId(f.formId) === dbId);
  const db = site.databases.find((d) => d.id === dbId) ?? (form ? formDatabase(site, form) : undefined);
  if (!db) return new Response("Base introuvable", { status: 404 });
  const entries = (await store.entries(id)).filter((e) => e.database === db.id);
  const posField = db.fields.find((f) => f.type === "position")?.name;
  const rows = posField ? [...entries].sort((a, b) => Number(a.values[posField] ?? 0) - Number(b.values[posField] ?? 0)) : [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const name = `${db.slug}-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(toCsv(db, rows, site.settings.defaultLocale), { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${name}"`, "cache-control": "no-store" } });
}
