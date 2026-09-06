import { loadCurrentSite } from "@/lib/site";
import { EditorShell } from "@/components/EditorShell";

export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const { site, version } = await loadCurrentSite();
  return <EditorShell initialSite={site} initialVersion={version} />;
}
