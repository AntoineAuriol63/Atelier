// Vérifie la connexion Supabase et le schéma d'Atelier.
// Usage : node --env-file=apps/editor/.env.local scripts/check-supabase.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante (apps/editor/.env.local)."); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });
let ok = true;
const check = (label, pass, detail = "") => { console.log(`${pass ? "✓" : "✗"} ${label}${detail ? " — " + detail : ""}`); if (!pass) ok = false; };

for (const table of ["sites", "changes", "entries", "snapshots"]) {
  const { error } = await sb.from(table).select("*", { count: "exact", head: true });
  check(`table ${table}`, !error, error?.message);
}
{
  const id = "check_" + Date.now().toString(36);
  const doc = { schemaVersion: 1, id, name: "check" };
  const ins = await sb.from("sites").insert({ id, name: "check", document: doc, version: 0 });
  check("insertion d'un site de test", !ins.error, ins.error?.message);
  const rpc = await sb.rpc("commit_change", { p_site_id: id, p_base_version: 0, p_document: { ...doc, name: "check2" }, p_ops: [{ op: "site.set", path: "name", value: "check2" }], p_author: "check", p_label: null });
  check("fonction commit_change", !rpc.error && rpc.data?.ok === true && rpc.data?.version === 1, rpc.error?.message ?? JSON.stringify(rpc.data));
  const conflict = await sb.rpc("commit_change", { p_site_id: id, p_base_version: 0, p_document: doc, p_ops: [], p_author: "check", p_label: null });
  check("détection de conflit", !conflict.error && conflict.data?.ok === false, conflict.error?.message ?? JSON.stringify(conflict.data));
  // Compactage révisé (23 septembre 2026) : trois lots, un instantané au dernier, `keep` = 1 ; l'ancienne règle vidait le journal,
  // la nouvelle garde le dernier lot (jamais moins que `keep`, jamais au-delà d'un instantané).
  const c2 = await sb.rpc("commit_change", { p_site_id: id, p_base_version: 1, p_document: { ...doc, name: "check3" }, p_ops: [{ op: "site.set", path: "name", value: "check3" }], p_author: "check", p_label: null });
  const c3 = await sb.rpc("commit_change", { p_site_id: id, p_base_version: 2, p_document: { ...doc, name: "check4" }, p_ops: [{ op: "site.set", path: "name", value: "check4" }], p_author: "check", p_label: null });
  const snap = await sb.from("snapshots").insert({ site_id: id, version: 3, document: { site: doc, entries: [] }, kind: "auto" });
  const compact = await sb.rpc("compact_changes", { p_site_id: id, p_keep: 1 });
  const left = await sb.from("changes").select("version").eq("site_id", id);
  const kept = (left.data ?? []).map((r) => r.version);
  const revised = !c2.error && !c3.error && !snap.error && !compact.error && !left.error && kept.length === 1 && kept[0] === 3;
  check("compactage révisé (compact_changes garde les `keep` derniers lots)", revised, compact.error?.message ?? snap.error?.message ?? left.error?.message ?? (kept.length === 0 ? "ancienne règle : journal vidé jusqu'à l'instantané → relancer le bloc « compactage » de supabase/schema.sql" : `lots restants : ${JSON.stringify(kept)}`));
  const del = await sb.from("sites").delete().eq("id", id);
  check("nettoyage du site de test", !del.error, del.error?.message);
}
{
  // Publication (M6) : colonnes ajoutées après le premier schéma.
  const cols = await sb.from("sites").select("published_version, subdomain", { head: true, count: "exact" });
  check("colonnes de publication (sites.published_version, sites.subdomain)", !cols.error, cols.error ? cols.error.message + " → exécuter le bloc « publication » de supabase/schema.sql" : "");
  const owner = await sb.from("sites").select("owner", { head: true, count: "exact" });
  check("colonne des comptes (sites.owner)", !owner.error, owner.error ? owner.error.message + " → exécuter le bloc « comptes » de supabase/schema.sql" : "");
  const rl = await sb.rpc("rate_limit_hit", { p_key: "check", p_window_seconds: 60, p_max: 1000 });
  check("limite de débit (rate_limits, rate_limit_hit)", !rl.error, rl.error ? rl.error.message + " → exécuter le bloc « limite de débit » de supabase/schema.sql" : "");
  const members = await sb.from("site_members").select("site_id").limit(1);
  check("partage (site_members)", !members.error, members.error ? members.error.message + " → exécuter le bloc « partage » de supabase/schema.sql" : "");
  const bucket = await sb.storage.getBucket("assets");
  check("seau de fichiers « assets »", !bucket.error, bucket.error ? "créé automatiquement au premier import" : "");
  if (bucket.error) ok = true && ok;
}
console.log(ok ? "\nSupabase est prêt pour Atelier." : "\nCorrige les points ci-dessus, puis relance.");
process.exit(ok ? 0 : 1);
