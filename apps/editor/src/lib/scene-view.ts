import type { Appearance, Site } from "@atelier/model";
import { appearanceOf, indexSite, inheritedAppearance, trackSpan } from "@atelier/model";
import { sceneElements, whenLabel, whenShortLabel, type SceneElement } from "./timeline";
import { nodeLabel } from "@/components/node-icons";

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
/** Un lancement : un déclencheur sur un élément (ou la page), et les lignes qu'il fait partir, dans l'ordre de la page. */
export type SceneLaunch = { id: string; hostId: string; triggerId: string; /** « Quand « Photo » entre dans l'écran » */ label: string; /** « Entrée de « Photo » » */ short: string; rows: string[] };
export type SceneView = {
  sectionId: string; sectionLabel: string; rows: SceneRow[]; total: number;
  /** Les lancements distincts, dans l'ordre de leur première ligne (un seul quand la scène est enchaînée). */
  launches: SceneLaunch[];
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
  // La section elle-même (ou le bloc de premier niveau) a sa ligne quand elle bouge ou qu'on l'a sélectionnée : en tête, ses enfants en retrait.
  // Sans cela, une section qui apparaît en fondu n'avait aucune ligne, et rien à régler (retour d'Antoine, 24 septembre 2026).
  const own = appearanceOf(site, sectionId) || selectedId === sectionId;
  const elements: SceneElement[] = own ? [{ id: sectionId, depth: 0, label: nodeLabel(section) }, ...sceneElements(site, sectionId).map((e) => ({ ...e, depth: e.depth + 1 }))] : sceneElements(site, sectionId);
  const launches = new Map<string, SceneLaunch>();
  let total = 0;
  const rows: SceneRow[] = elements.map((e) => {
    const ap = appearanceOf(site, e.id);
    const selected = e.id === selectedId;
    if (ap) {
      const delay = ap.trigger.delay ?? 0;
      const launch = `${ap.hostId}:${ap.trigger.id}`;
      const l = launches.get(launch) ?? { id: launch, hostId: ap.hostId, triggerId: ap.trigger.id, label: whenLabel(site, ap.trigger, ap.hostId, !!ap.page), short: whenShortLabel(site, ap.trigger, ap.hostId, !!ap.page), rows: [] };
      l.rows.push(e.id); launches.set(launch, l);
      total = Math.max(total, delay + ap.end);
      const bar: SceneBar = { start: delay + ap.start, end: delay + ap.end, hostId: ap.hostId, triggerId: ap.trigger.id, animationId: ap.animation.id, trackId: ap.track.id, launch, ...(ap.preset ? { preset: ap.preset.id } : {}) };
      const keyframes = selected ? [...ap.track.keyframes].sort((a, b) => a.at - b.at).map((k) => ({ at: k.at, sceneAt: delay + k.at, ...(k.easing ? { easing: k.easing } : {}) })) : undefined;
      return { ...e, selected, bar, ...(keyframes ? { keyframes } : {}), still: false };
    }
    const inh = inheritedAppearance(site, e.id);
    if (inh) {
      // Il arrive avec le bloc qui le porte : même lancement que lui.
      const carrier = appearanceOf(site, inh.carrierId);
      if (carrier) launches.get(`${carrier.hostId}:${carrier.trigger.id}`)?.rows.push(e.id);
      return { ...e, selected, withGroup: inh.carrierId, still: false };
    }
    return { ...e, selected, still: true };
  });
  const sel = appearanceOf(site, selectedId);
  const scrub = (t: number) => {
    if (!sel) return undefined;
    const delay = sel.trigger.delay ?? 0;
    return { hostId: sel.hostId, triggerId: sel.trigger.id, time: Math.max(0, t - delay) };
  };
  void trackSpan;
  return { sectionId, sectionLabel: section.name ?? sectionId, rows, total, launches: [...launches.values()], scrub, ...(sel ? { selected: sel } : {}) };
}
