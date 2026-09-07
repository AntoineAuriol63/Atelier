import { loadCurrentSite } from "@/lib/site";
import { EditorShellClient } from "@/components/EditorShellClient";

export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const { site, version } = await loadCurrentSite();
  return <EditorShellClient initialSite={site} initialVersion={version} />;
}
