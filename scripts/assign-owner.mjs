// Donne un propriétaire aux sites qui n'en ont pas (créés avant les comptes).
// Usage : node --env-file=apps/editor/.env.local scripts/assign-owner.mjs adresse@exemple.fr
import { createClient } from "@supabase/supabase-js";

const email = (process.argv[2] ?? "").trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { console.error("Usage : node --env-file=apps/editor/.env.local scripts/assign-owner.mjs adresse@exemple.fr"); process.exit(1); }
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY manquent"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });
const { data, error } = await sb.from("sites").update({ owner: email }).is("owner", null).select("id, name");
if (error) { console.error("Échec :", error.message); process.exit(1); }
console.log(`${data.length} site(s) attribué(s) à ${email} :`, data.map((s) => `${s.name} (${s.id})`).join(", ") || "aucun");
