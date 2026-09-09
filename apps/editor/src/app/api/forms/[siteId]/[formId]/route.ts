import { newId, type Entry, type Node } from "@atelier/model";
import { getStore } from "@/lib/store";
import { LIMITS, tooLarge } from "@/lib/limits";
import { findForms, formDatabaseId } from "@/lib/forms";
import { sendMail } from "@/lib/mail";
import { safePath } from "@/lib/safe-path";

const MAX_LEN = 5000;
type FieldSpec = { name: string; type: string; required: boolean; label: string; options?: string[] };
function fieldsOf(form: Node, locale: string): FieldSpec[] {
  const out: FieldSpec[] = [];
  const visit = (n: Node) => {
    if (n.type === "field") out.push({ name: String(n.props.name ?? n.id), type: String(n.props.fieldType ?? "text"), required: !!n.props.required, label: (n.props.label as Record<string, string> | undefined)?.[locale] ?? String(n.props.name ?? ""), options: (n.props.options as { value: string }[] | undefined)?.map((o) => o.value) });
    n.children?.forEach(visit);
  };
  visit(form);
  return out;
}

/** Réception d'un envoi de formulaire (D47) : validation, piège à robots, enregistrement comme entrée, notification. */
export async function POST(req: Request, { params }: { params: Promise<{ siteId: string; formId: string }> }) {
  const { siteId, formId } = await params;
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const reply = (status: number, body: Record<string, unknown>, redirectTo?: string) => {
    if (wantsJson || !redirectTo) return Response.json(body, { status });
    return new Response(null, { status: 303, headers: { location: redirectTo } });
  };
  const big = tooLarge(req, LIMITS.formBytes, "Ce message");
  if (big) return reply(413, { error: "Message trop long." });
  let data: Record<string, string>;
  try {
    const ct = req.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) data = Object.fromEntries(Object.entries((await req.json()) as Record<string, unknown>).map(([k, v]) => [k, String(v ?? "")]));
    else { const fd = await req.formData(); data = {}; fd.forEach((v, k) => { data[k] = typeof v === "string" ? v : v.name; }); }
  } catch { return reply(400, { error: "Envoi illisible" }); }
  // Le document seul : les entrées n'ont rien à faire ici.
  const loaded = await getStore().get(siteId);
  if (!loaded) return reply(404, { error: "Site introuvable" });
  const { site } = loaded;
  const form = findForms(site).find((f) => f.formId === formId);
  if (!form) return reply(404, { error: "Formulaire introuvable" });
  const locale = site.settings.defaultLocale;
  const referer = req.headers.get("referer");
  // Retour sans script : uniquement vers la page d'origine si elle est sur la même origine que l'appel.
  const back = (() => { try { if (!referer) return undefined; const u = new URL(referer); if (u.origin !== new URL(req.url).origin) return undefined; u.searchParams.set("envoye", formId); return safePath(u.pathname + u.search) + `#f-${form.node.id}`; } catch { return undefined; } })();
  // Piège à robots : on répond comme si tout allait bien, sans rien garder.
  if (data._hp) return reply(200, { ok: true }, back);
  // Dix envois par minute et par adresse, comptés dans le dépôt (donc partagés entre instances). L'adresse vient de la plateforme.
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  let allowed = true;
  try { allowed = await getStore().rateLimit(`form:${siteId}:${formId}:${ip}`, 60, 10); } catch (e) { console.warn(`[formulaire] limite de débit indisponible : ${e instanceof Error ? e.message : e}`); }
  if (!allowed) return reply(429, { error: "Trop d'envois d'affilée, réessayez dans une minute." });
  const values: Record<string, unknown> = {};
  for (const f of fieldsOf(form.node, locale)) {
    const raw = (data[f.name] ?? "").trim();
    if (f.type === "checkbox") { values[f.name] = raw !== "" && raw !== "false" && raw !== "off"; continue; }
    if (f.required && !raw) return reply(400, { error: `Le champ « ${f.label} » est obligatoire.` });
    if (raw.length > MAX_LEN) return reply(400, { error: `Le champ « ${f.label} » est trop long.` });
    if (f.type === "email" && raw && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return reply(400, { error: `L'adresse email « ${raw} » n'est pas valide.` });
    if (f.type === "number" && raw) { const n = Number(raw); if (!Number.isFinite(n)) return reply(400, { error: `« ${f.label} » doit être un nombre.` }); values[f.name] = n; continue; }
    if (f.type === "select" && raw && f.options && !f.options.includes(raw)) return reply(400, { error: `Choix inconnu pour « ${f.label} ».` });
    if (raw) values[f.name] = raw;
  }
  values._page = (data._page ?? "").slice(0, 300);
  const now = new Date().toISOString();
  const entry: Entry = { id: newId(), database: formDatabaseId(formId), status: "draft", values, createdAt: now, updatedAt: now };
  try { await getStore().upsertEntries(siteId, [entry]); } catch (e) { return reply(500, { error: e instanceof Error ? e.message : "Enregistrement impossible" }); }
  const siteName = site.name ?? "Atelier";
  const lines = fieldsOf(form.node, locale).map((f) => `${f.label} : ${values[f.name] === undefined ? "—" : String(values[f.name])}`);
  const mail = await sendMail({ subject: `[${siteName}] Nouveau message · ${form.node.name ?? form.where}`, text: [...lines, "", `Page : ${values._page || "?"}`, `Reçu le ${now}`].join("\n"), replyTo: typeof values.email === "string" ? values.email : undefined });
  if (!mail.sent && mail.error) console.warn(`[formulaire ${formId}] ${mail.error}`);
  return reply(200, { ok: true, message: (form.node.props.successMessage as Record<string, string> | undefined)?.[locale] ?? "Merci, votre message est bien envoyé.", notified: mail.sent }, back);
}
