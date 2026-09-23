import type { Appearance, Site } from "@atelier/model";
import { appearanceOf, indexSite, inheritedAppearance, trackSpan } from "@atelier/model";
import { sceneElements, type SceneElement } from "./timeline";

/**
 * L'outil Animation recentré (24 septembre 2026) : la scène d'une section, une ligne par élément dans l'ordre de la page.
 * Le geste de base est celui d'Antoine : un élément, ses images-clés sur la ligne de temps, l'apparence réglée à chaque image-clé ;
 * les autres éléments sont là, en barres, pour voir et régler l'ordre. Tout est exprimé en temps de scène (délai du déclencheur compris).
 */
export type SceneBar = { start: number; end: number; hostId: string; triggerId: string; animationId: string; trackId: string; launch: string; preset?: string };
export type SceneKeyframe = { at: number; sceneAt: number; easing?: string };
export type SceneRow = SceneElement & {
  selected: boolean;
  /** L'élément bouge : sa barre, du départ à la fin de son mouvement. */
  bar?: SceneBar;
  /** Les images-clés de l'élément sélectionné, en temps de scène. */
  keyframes?: SceneKeyframe[];
  /** L'élément arrive avec un bloc qui le contient (une liste, un groupe) : ni immobile, ni porteur d'une barre. */
  withGroup?: string;
  /** Rien ne le fait bouger. */
  still: boolean;
};
export type SceneView = {
  sectionId: string; sectionLabel: string; rows: SceneRow[]; total: number;
  /** Les lancements distincts (un seul quand la scène est enchaînée). */
  launches: string[];
  /** Le temps de scène `t` traduit en instant de l'animation de l'élément sélectionné (pour montrer cet instant dans l'aperçu). */
  scrub: (t: number) => { hostId: string; triggerId: string; time: number } | undefined;
  selected?: Appearance;
};

/** La section d'un élément : lui-même s'il est une région (section ou bloc de premier niveau) avec des enfants, sinon la région qui le contient. */
export function sceneRootFor(site: Site, nodeId: string): string | undefined {
  const index = indexSite(site);
  const loc = index.get(nodeId);
  if (!loc) return undefined;
  const region = (l: typeof loc) => { const grand = l.parent ? index.get(l.parent.id) : undefined; return !!l.parent && (l.node.props.tag === "section" || !grand?.parent); };
  if (loc.node.children?.length && region(loc)) return loc.node.id;
  for (let p = loc.parent ? index.get(loc.parent.id) : undefined; p; p = p.parent ? index.get(p.parent.id) : undefined) if (region(p)) return p.node.id;
  return undefined;
}

export function sceneView(site: Site, selectedId: string | undefined): SceneView | undefined {
  if (!selectedId) return undefined;
  const sectionId = sceneRootFor(site, selectedId);
  if (!sectionId) return undefined;
  const index = indexSite(site);
  const section = index.get(sectionId)!.node;
  const elements = sceneElements(site, sectionId);
  const launches = new Set<string>();
  let total = 0;
  const rows: SceneRow[] = elements.map((e) => {
    const ap = appearanceOf(site, e.id);
    const selected = e.id === selectedId;
    if (ap) {
      const delay = ap.trigger.delay ?? 0;
      const launch = `${ap.hostId}:${ap.trigger.id}`;
      launches.add(launch);
      total = Math.max(total, delay + ap.end);
      const bar: SceneBar = { start: delay + ap.start, end: delay + ap.end, hostId: ap.hostId, triggerId: ap.trigger.id, animationId: ap.animation.id, trackId: ap.track.id, launch, ...(ap.preset ? { preset: ap.preset.id } : {}) };
      const keyframes = selected ? [...ap.track.keyframes].sort((a, b) => a.at - b.at).map((k) => ({ at: k.at, sceneAt: delay + k.at, ...(k.easing ? { easing: k.easing } : {}) })) : undefined;
      return { ...e, selected, bar, ...(keyframes ? { keyframes } : {}), still: false };
    }
    const inh = inheritedAppearance(site, e.id);
    if (inh) return { ...e, selected, withGroup: inh.carrierId, still: false };
    return { ...e, selected, still: true };
  });
  const sel = appearanceOf(site, selectedId);
  const scrub = (t: number) => {
    if (!sel) return undefined;
    const delay = sel.trigger.delay ?? 0;
    return { hostId: sel.hostId, triggerId: sel.trigger.id, time: Math.max(0, t - delay) };
  };
  void trackSpan;
  return { sectionId, sectionLabel: section.name ?? sectionId, rows, total, launches: [...launches], scrub, ...(sel ? { selected: sel } : {}) };
}
