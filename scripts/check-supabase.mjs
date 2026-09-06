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
  const del = await sb.from("sites").delete().eq("id", id);
  check("nettoyage du site de test", !del.error, del.error?.message);
}
console.log(ok ? "\nSupabase est prêt pour Atelier." : "\nCorrige les points ci-dessus, puis relance.");
process.exit(ok ? 0 : 1);
