import { getCurrentSite } from "@/lib/site";
import { EditorShell } from "@/components/EditorShell";

export default function EditorPage() {
  const site = getCurrentSite();
  return <EditorShell site={site} />;
}
