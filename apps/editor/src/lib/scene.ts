import type { Site, Trigger } from "@atelier/model";
import { appearanceOf, indexSite, inheritedAppearance, siblingGroup, walk } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";
import { formatDuration, quoteLabel } from "./timeline";

/** Un élément de la scène : son départ et sa fin depuis le lancement qui le porte, et le nombre de ses enfants quand ils partent un à un. */
export type SceneEntry = { id: string; label: string; start: number; end: number; launch: string; count?: number };
/** Un lancement : l'élément qui porte le déclencheur et ce qu'il fait partir. */
export type SceneLaunch = { key: string; hostId: string; hostLabel: string; trigger: Trigger; entries: SceneEntry[]; end: number };
export type Scene = {
  sectionId: string; sectionLabel: string;
  /** Dans l'ordre du document. */
  entries: SceneEntry[];
  launches: SceneLaunch[];
  /** Fin du dernier mouvement, depuis le lancement. */
  total: number;
  /** Plusieurs lancements : les départs ne se comptent pas depuis le même moment. */
  separate: boolean;
  warnings: string[];
  /** Les éléments de la section (feuilles et groupes) qui ne bougent pas. */
  still: { id: string; label: string }[];
};

/** Deux départs sont distincts au-delà de cet écart (critère C3 des tests d'usage). */
const ORDER_TOLERANCE = 80;

/**
 * La scène d'une section (lot 8, vague 4 PR1 et N-5) : tout ce qui bouge dedans, avec le départ et la fin de chacun depuis son lancement,
 * la durée totale, les lancements séparés, les éléments partis avant celui qui les précède dans la page, et ce qui ne bouge pas.
 * Aucune scène en dessous de deux éléments animés.
 */
export function sceneOf(site: Site, sectionId: string): Scene | undefined {
  const index = indexSite(site);
  const section = index.get(sectionId)?.node;
  if (!section?.children?.length) return undefined;
  const label = (id: string) => { const n = index.get(id)?.node; return n ? nodeLabel(n) : id; };
  const entries: SceneEntry[] = [];
  const still: { id: string; label: string }[] = [];
  const launches = new Map<string, SceneLaunch>();
  walk(section, (n) => {
    if (n.id === sectionId) return;
    const ap = appearanceOf(site, n.id);
    if (ap) {
      const delay = ap.trigger.delay ?? 0;
      const key = `${ap.hostId}:${ap.trigger.id}`;
      const entry: SceneEntry = { id: n.id, label: label(n.id), start: delay + ap.start, end: delay + ap.end, launch: key, ...(ap.detail === "children" ? { count: n.type === "collection" ? undefined : n.children?.length } : {}) };
      entries.push(entry);
      const l = launches.get(key) ?? { key, hostId: ap.hostId, hostLabel: ap.page ? "la page" : label(ap.hostId), trigger: ap.trigger, entries: [], end: 0 };
      l.entries.push(entry); l.end = Math.max(l.end, entry.end);
      launches.set(key, l);
      // Un groupe qui fait partir ses enfants : les enfants sont dits par lui.
      if (ap.detail === "children") return false;
      return;
    }
    if (inheritedAppearance(site, n.id)) return false;
    // Une feuille ou un groupe de voisins qui ne bouge pas se signale ; un simple conteneur, non.
    const first = n.children?.[0];
    const group = first ? siblingGroup(site, first.id) : undefined;
    if (!n.children?.length) still.push({ id: n.id, label: label(n.id) });
    else if (group?.groupId === n.id && !n.children.some((c) => appearanceOf(site, c.id))) { still.push({ id: n.id, label: label(n.id) }); return false; }
  });
  if (entries.length < 2) return undefined;
  const list = [...launches.values()];
  const separate = list.length > 1;
  const warnings: string[] = [];
  for (let i = 1; i < entries.length; i++) {
    const prev = entries[i - 1]!, cur = entries[i]!;
    if (cur.start + ORDER_TOLERANCE <= prev.start) warnings.push(`${quoteLabel(cur.label)} part avant ${quoteLabel(prev.label)}, qui le précède dans la page.`);
  }
  if (separate) warnings.push(`${list.length} lancements séparés : chaque délai se compte depuis l'entrée à l'écran de son propre élément, pas depuis le début de la scène. Pour une seule scène, faites démarrer chaque élément « après » le précédent, ou « quand ${quoteLabel(label(sectionId))} entre dans l'écran ».`);
  return { sectionId, sectionLabel: label(sectionId), entries, launches: list, total: Math.max(...entries.map((e) => e.end)), separate, warnings, still };
}

/** La scène en une phrase : ce qui la lance, chaque élément dans l'ordre de départ, et quand tout est fini. */
export function sceneSentence(scene: Scene): string {
  const sorted = [...scene.entries].sort((a, b) => a.start - b.start);
  const part = (e: SceneEntry) => (e.count ? `les ${e.count} éléments de ${quoteLabel(e.label)} un à un` : quoteLabel(e.label));
  const seq = sorted.map((e, i) => (i === 0 ? part(e) : `${e.start >= sorted[i - 1]!.end - 1 ? ", puis " : ", "}${part(e)}`)).join("");
  const end = `tout est fini à ${formatDuration(scene.total)}`;
  if (scene.separate) return `${scene.launches.length} lancements séparés (${scene.launches.map((l) => quoteLabel(l.hostLabel)).join(", ")}) : ${seq} ; ${end} après le dernier lancement.`;
  const l = scene.launches[0]!;
  const when = l.trigger.on === "load" ? "Au chargement de la page" : `Quand ${quoteLabel(l.hostLabel)} entre dans l'écran`;
  const replay = l.trigger.on === "inView" ? (l.trigger.once === false ? ", à chaque passage" : ", une seule fois") : "";
  return `${when} : ${seq} ; ${end}${replay}.`;
}

/** Depuis un élément : la section (ou la région) qui contient une scène d'au moins deux éléments, s'il y en a une. */
export function sceneContainerFor(site: Site, nodeId: string): string | undefined {
  const index = indexSite(site);
  // Les régions de la page : les sections, et les blocs de premier niveau ; jamais la racine elle-même.
  for (let p = index.get(nodeId)?.parent ? index.get(index.get(nodeId)!.parent!.id) : undefined; p?.parent; p = index.get(p.parent.id)) {
    const grand = index.get(p.parent.id);
    const isRegion = p.node.props.tag === "section" || !grand?.parent;
    if (isRegion && sceneOf(site, p.node.id)) return p.node.id;
  }
  return undefined;
}
