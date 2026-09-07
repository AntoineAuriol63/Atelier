import { notFound, redirect } from "next/navigation";
import { loadSite } from "@/lib/site";
import { canAccess, getSessionUser } from "@/lib/auth";
import { EditorShellClient } from "@/components/EditorShellClient";

export const dynamic = "force-dynamic";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect(`/connexion?suite=${encodeURIComponent(`/sites/${id}`)}`);
  const loaded = await loadSite(id);
  if (!loaded || !canAccess(loaded.owner, user)) notFound();
  return <EditorShellClient initialSite={loaded.site} initialVersion={loaded.version} initialEntries={loaded.entries} />;
}
