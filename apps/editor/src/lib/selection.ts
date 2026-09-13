import type { Site } from "@atelier/model";
import { indexSite } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

/** Chemin de la racine (de la page ou du composant) jusqu'à un élément : le fil d'Ariane de la sélection, pour remonter vers un conteneur. */
export function selectionPath(site: Site, id: string): { id: string; label: string }[] {
  const index = indexSite(site);
  const out: { id: string; label: string }[] = [];
  let cur = index.get(id);
  while (cur) {
    out.unshift({ id: cur.node.id, label: nodeLabel(cur.node) });
    cur = cur.parent ? index.get(cur.parent.id) : undefined;
  }
  return out;
}
