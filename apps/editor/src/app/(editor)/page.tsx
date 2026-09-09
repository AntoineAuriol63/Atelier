import { redirect } from "next/navigation";
import { getStore, ensureSampleSite } from "@/lib/site";
import { authEnabled, getSessionUser } from "@/lib/auth";
import { Dashboard } from "@/components/Dashboard";
import { publicUrl } from "@/lib/published";

export const dynamic = "force-dynamic";

/** Tableau de bord : les sites du compte. Sans connexion configurée (mode fichier), tous les sites. */
export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/connexion");
  const owner = authEnabled() ? user.email : undefined;
  let sites: Awaited<ReturnType<ReturnType<typeof getStore>["listSites"]>>;
  try { await ensureSampleSite(owner); sites = await getStore().listSites(owner); }
  catch (e) {
    return <main style={{ padding: 48, fontFamily: "var(--font-plex-sans), system-ui", color: "#ddd", maxWidth: 640 }}><h1 style={{ fontSize: 18, marginBottom: 8 }}>Le dépôt des sites répond par une erreur</h1><p style={{ color: "#aaa", fontSize: 14 }}>{e instanceof Error ? e.message : String(e)}</p><p style={{ color: "#aaa", fontSize: 14 }}>Voir <code>docs/supabase.md</code>, puis rechargez.</p></main>;
  }
  const withUrls = await Promise.all(sites.map(async (s) => ({ ...s, url: s.publishedVersion !== null ? await publicUrl({ id: s.id, settings: { subdomain: s.subdomain ?? undefined } } as Parameters<typeof publicUrl>[0]) : null })));
  return <Dashboard sites={withUrls} user={authEnabled() ? user.email : null} />;
}
