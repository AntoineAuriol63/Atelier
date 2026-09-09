import { notFound, redirect } from "next/navigation";
import { loadSite } from "@/lib/site";
import { getSessionUser } from "@/lib/auth";
import { siteRole } from "@/lib/site-access";
import { EditorShellClient } from "@/components/EditorShellClient";

export const dynamic = "force-dynamic";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect(`/connexion?suite=${encodeURIComponent(`/sites/${id}`)}`);
  const role = await siteRole(id, user);
  if (!role) notFound();
  const loaded = await loadSite(id);
  if (!loaded) notFound();
  return <EditorShellClient initialSite={loaded.site} initialVersion={loaded.version} initialEntries={loaded.entries} role={role} />;
}
