import type { Animation, Node, Page, Site, Track, TrackTarget, Trigger } from "@atelier/model";
import { animationById, animationUsages, indexSite, resolveTrackTarget } from "@atelier/model";
import { nodeLabel } from "@/components/node-icons";

/** L'animation ouverte dans la ligne de temps : elle se joue depuis un hôte (l'élément qui porte le déclencheur). */
export type OpenTimeline = { animationId: string; hostId: string; triggerId: string } | null;

/**
 * Le déclencheur d'une animation ouverte : sur l'hôte lui-même, ou sur la page dont l'hôte est la racine (déclencheur de page).
 * `page` est rendu pour un déclencheur de page.
 */
export function openTrigger(site: Site, open: OpenTimeline): { trigger: Trigger; page?: Page } | undefined {
  if (!open) return undefined;
  const own = indexSite(site).get(open.hostId)?.node.triggers?.find((t) => t.id === open.triggerId);
  if (own) return { trigger: own };
  const page = site.pages.find((p) => p.root.id === open.hostId);
  const onPage = page?.triggers?.find((t) => t.id === open.triggerId);
  return page && onPage ? { trigger: onPage, page } : undefined;
}

/**
 * L'animation ouverte reste-t-elle jouable ? L'hôte existe encore et porte ce déclencheur (ou sa page, s'il en est la racine), qui lance toujours cette animation.
 * Sinon `null` : après annuler, retirer le déclencheur ou supprimer l'élément, la ligne de temps se referme d'elle-même.
 */
export function validOpenTimeline(site: Site, open: OpenTimeline): OpenTimeline {
  if (!open || !animationById(site, open.animationId)) return null;
  return openTrigger(site, open)?.trigger.animation === open.animationId ? open : null;
}

/** Les éléments qui portent au moins un déclencheur sous une racine (éclair dans les calques) ; la racine aussi si sa page en porte. */
export function triggerHosts(root: Node, page?: Pick<Page, "triggers">): Set<string> {
  const out = new Set<string>();
  const visit = (n: Node) => { if (n.triggers?.length) out.add(n.id); n.children?.forEach(visit); };
  visit(root);
  if (page?.triggers?.length) out.add(root.id);
  return out;
}

/** Graduations de la règle : un pas lisible (100, 250, 500 ms, 1 s…), au plus douze intervalles. */
export function rulerTicks(length: number): number[] {
  if (length <= 0) return [0];
  const steps = [100, 250, 500, 1000, 2000, 5000, 10000, 30000, 60000];
  const step = steps.find((s) => length / s <= 12) ?? 60000;
  const out: number[] = [];
  for (let t = 0; t <= length; t += step) out.push(t);
  return out;
}

/** « 0,42 s » */
export const formatTime = (ms: number): string => `${(ms / 1000).toFixed(2).replace(".", ",")} s`;

/** Nom d'une piste d'après sa cible résolue depuis l'hôte : « Carte », « Titre · lettres », « Carte · enfants », « .x ». */
export function trackLabel(track: Track, hostId: string, site: Site): string {
  const r = resolveTrackTarget(track.target, hostId);
  if ("selector" in r) return r.selector;
  const n = indexSite(site).get(r.node)?.node;
  const base = n ? nodeLabel(n) : r.node;
  return r.children ? `${base} · enfants` : r.split === "letters" ? `${base} · lettres` : r.split === "words" ? `${base} · mots` : base;
}

/** Les éléments qu'une animation touche depuis un hôte (pour marquer les calques). */
export function animatedNodes(a: Animation, hostId: string): Set<string> {
  const out = new Set<string>();
  for (const t of a.tracks) { const r = resolveTrackTarget(t.target, hostId); if (!("selector" in r)) out.add(r.node); }
  return out;
}

/** Temps aligné sur une grille (10 ms par défaut), jamais avant 0 : les images-clés se posent et se glissent sur ce pas. */
export const snapTime = (ms: number, step = 10): number => Math.max(0, Math.round(ms / step) * step);

export type TargetKind = "element" | "children" | "words" | "letters";
/** Forme de la cible d'une piste : l'élément, ses enfants, ses mots, ses lettres, ou un sélecteur libre. */
export function targetKindOf(target: TrackTarget): TargetKind | "selector" {
  if ("selector" in target) return "selector";
  return target.split ?? (target.children ? "children" : "element");
}
/** Formes proposées pour un élément : ses enfants s'il en a (ou les cartes d'une vue), ses mots et lettres pour un texte. */
export function targetKindOptions(node: Node | undefined): { value: TargetKind; label: string }[] {
  const out: { value: TargetKind; label: string }[] = [{ value: "element", label: "L'élément" }];
  if (node && (node.children?.length || node.type === "collection")) out.push({ value: "children", label: "Ses enfants, un à un" });
  if (node?.type === "text") out.push({ value: "words", label: "Ses mots" }, { value: "letters", label: "Ses lettres" });
  return out;
}
/** Peut-on ajouter une piste pour `nodeId` à l'animation jouée depuis `hostId` ? Même page (ou même composant) que l'hôte, et pas déjà une piste sur l'élément seul. */
export function canAddTrack(site: Site, animation: Animation, hostId: string, nodeId: string | undefined): { ok: true } | { ok: false; reason: string } {
  if (!nodeId) return { ok: false, reason: "Sélectionnez un élément dans l'aperçu ou dans les calques" };
  const index = indexSite(site);
  const ownerKey = (id: string) => { const o = index.get(id)?.owner; return o ? ("page" in o ? `p:${o.page}` : `c:${o.component}`) : undefined; };
  if (!index.get(nodeId) || ownerKey(nodeId) !== ownerKey(hostId)) return { ok: false, reason: "Choisissez un élément de la même page que l'animation" };
  const taken = animation.tracks.some((t) => { const r = resolveTrackTarget(t.target, hostId); return !("selector" in r) && r.node === nodeId && !r.children && !r.split; });
  if (taken) { const n = index.get(nodeId)!.node; return { ok: false, reason: `« ${nodeLabel(n)} » a déjà sa piste` }; }
  return { ok: true };
}

/**
 * Libellé d'une animation dans une liste : « Fondu en montant · Titre · Accueil (+2) », « Barre · page Accueil », « … · inutilisée ».
 * Les animations issues des préréglages portent souvent le même nom : l'élément et la page qui les lancent les distinguent.
 */
export function animationLabel(site: Site, a: Animation): string {
  const uses = animationUsages(site, a.id);
  const first = uses[0];
  if (!first) return `${a.name} · inutilisée`;
  const locale = site.settings.defaultLocale;
  const pageName = (id: string) => { const p = site.pages.find((x) => x.id === id); return p ? p.name[locale] ?? p.path : undefined; };
  const more = uses.length > 1 ? ` (+${uses.length - 1})` : "";
  if (first.page) return `${a.name} · page ${pageName(first.page.id)}${more}`;
  const where = pageName(first.owner) ?? `composant ${site.components.find((c) => c.id === first.owner)?.name ?? first.owner}`;
  return `${a.name} · ${first.node ? nodeLabel(first.node) : "?"} · ${where}${more}`;
}

/** « Animation 3 » : le premier nom libre. */
export function nextAnimationName(site: Pick<Site, "animations">): string {
  let n = site.animations.length + 1;
  while (site.animations.some((a) => a.name === `Animation ${n}`)) n += 1;
  return `Animation ${n}`;
}
