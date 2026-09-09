import { blankSite, newId, restaurantEntries, restaurantSite, sampleEntries, sampleSite } from "@atelier/model";
import { getStore } from "@/lib/store";
import { authEnabled, getSessionUser } from "@/lib/auth";

/** `POST { name, template: "blank" | "sample" | "restaurant" }` crée un site pour le compte connecté. */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Connexion requise" }, { status: 401 });
  let body: { name?: unknown; template?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "Corps JSON invalide" }, { status: 400 }); }
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  if (!name) return Response.json({ error: "Nom manquant" }, { status: 400 });
  const id = `site_${newId().replace(/[^A-Za-z0-9]/g, "").slice(0, 10).toLowerCase()}`;
  const store = getStore();
  const owner = authEnabled() ? user.email : undefined;
  try {
    const example = body.template === "sample" ? { site: sampleSite, entries: sampleEntries } : body.template === "restaurant" ? { site: restaurantSite, entries: restaurantEntries } : null;
    if (example) {
      // L'exemple prend un nouvel identifiant ; ses identifiants internes restent stables (ils ne se croisent pas entre sites).
      const site = { ...structuredClone(example.site), id, name, settings: { ...structuredClone(example.site.settings), subdomain: undefined } };
      await store.create(site, owner);
      await store.upsertEntries(id, structuredClone(example.entries));
    } else {
      await store.create(blankSite(id, name), owner);
    }
    return Response.json({ id });
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : "Création impossible" }, { status: 500 }); }
}
