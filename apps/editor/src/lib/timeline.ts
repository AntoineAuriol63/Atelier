import type { Animation, Node, Page, Site, Track, TrackTarget, Trigger } from "@atelier/model";
import { animationById, animationLength, animationUsages, indexSite, isPresetIntact, presetById, resolveTrackTarget, siblingGroup, trackPresetMatch, trackSpan } from "@atelier/model";
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

/**
 * Graduations de la règle : un pas lisible (50, 100, 250, 500 ms, 1 s…). Sans largeur connue, au plus douze intervalles dans la part
 * visible (`zoom` : la règle est `zoom` fois plus large que le panneau) ; avec `railPx`, la largeur visible de la règle, au moins 36 px entre deux repères.
 */
export function rulerTicks(length: number, zoom = 1, railPx?: number): number[] {
  if (length <= 0) return [0];
  const steps = [50, 100, 250, 500, 1000, 2000, 5000, 10000, 30000, 60000];
  const visible = length / Math.max(1, zoom);
  const allowed = railPx ? Math.max(2, Math.floor(railPx / 36)) : 12;
  const step = steps.find((s) => (s >= 100 || zoom > 1 ? visible / s <= allowed : false)) ?? 60000;
  const out: number[] = [];
  for (let t = 0; t <= length; t += step) out.push(t);
  return out;
}

/** Nombre de millisecondes groupé à la française, sans unité : « 1 000 » (espace fine insécable). Pour la règle et le compteur. */
export const tickLabel = (ms: number): string => Math.round(ms).toLocaleString("fr-FR").replace(/[\u202f\u00a0 ]/g, "\u202f");
/** « 1 250 ms » : la ligne de temps parle en millisecondes, comme ses champs. */
export const formatMs = (ms: number): string => `${tickLabel(ms)} ms`;

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

/** Niveaux de zoom de la ligne de temps. */
export const ZOOM_LEVELS = [1, 1.5, 2, 3, 4, 6, 8];
/** Cran de zoom suivant (`dir` 1) ou précédent (-1), borné aux niveaux proposés. */
export function nextZoom(current: number, dir: 1 | -1): number {
  if (dir > 0) return ZOOM_LEVELS.find((z) => z > current + 1e-6) ?? ZOOM_LEVELS[ZOOM_LEVELS.length - 1]!;
  return [...ZOOM_LEVELS].reverse().find((z) => z < current - 1e-6) ?? ZOOM_LEVELS[0]!;
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

/** Un libellé d'élément entre guillemets, sauf s'il en porte déjà (« Titre 1 « Bonjour » »). */
export const quoteLabel = (label: string) => (label.includes("«") ? label : `« ${label} »`);
const quoted = quoteLabel;

/**
 * Ce qui va se passer sur le site, en une phrase (audit n°5 · R2) : quand, ce qui bouge et à quel moment, combien de fois.
 * « Quand « Colonne » entre dans l'écran : Titre 1 « Bonjour » en 700 ms, Paragraphe « Texte » de 150 à 850 ms…, une seule fois. »
 * Au défilement et à la souris, les moments sont des parts du parcours (%), pas des durées.
 */
export function summarizeAnimation(site: Site, trigger: Trigger, hostId: string, pageLevel = false): string {
  const index = indexSite(site);
  const hostNode = index.get(hostId)?.node;
  const host = pageLevel ? "la page" : quoted(hostNode ? nodeLabel(hostNode) : hostId);
  const [lo, hi] = (trigger.range ?? [0, 1]).map((v) => Math.round(v * 100));
  const when = {
    load: "Au chargement de la page",
    inView: `Quand ${host} entre dans l'écran`,
    hover: `Quand la souris passe sur ${host}`,
    click: `Au clic sur ${host}`,
    scroll: pageLevel ? `Pendant le défilement de la page (de ${lo} à ${hi} %)` : `Pendant que ${host} traverse l'écran (de ${lo} à ${hi} %)`,
    pointer: `Quand la souris se déplace ${trigger.axis === "x" ? "de gauche à droite" : "de haut en bas"} dans la fenêtre`,
  }[trigger.on];
  const positional = trigger.on === "scroll" || trigger.on === "pointer";
  const delay = trigger.delay && !positional ? `, après ${formatMs(trigger.delay)}` : "";
  const a = animationById(site, trigger.animation);
  const tracks = (a?.tracks ?? []).filter((t) => t.keyframes.length >= 2).sort((x, y) => trackSpan(x).start - trackSpan(y).start);
  if (!a || !tracks.length) return `${when}${delay} : rien ne bouge encore.`;
  // Une piste sans images-clés ne bouge pas : on le dit, pour qu'on la remplisse (vague 3, § 6.10).
  const empties = a.tracks.filter((t) => t.keyframes.length < 2).map((t) => { const r = resolveTrackTarget(t.target, hostId); if ("selector" in r) return quoted(r.selector); const n = index.get(r.node)?.node; return quoted(n ? nodeLabel(n) : r.node); });
  const missing = empties.length ? ` ${empties.join(", ")} ${empties.length > 1 ? "n'ont" : "n'a"} pas encore d'effet.` : "";
  const length = Math.max(1, animationLength(a));
  const moment = (t: Track) => {
    const { start, end } = trackSpan(t);
    if (positional) return `de ${Math.round((start / length) * 100)} à ${Math.round((end / length) * 100)} % du parcours`;
    return start === 0 ? `en ${formatDuration(end)}` : `de ${tickLabel(start)} à ${formatDuration(end)}`;
  };
  const subject = (t: Track) => {
    const r = resolveTrackTarget(t.target, hostId);
    if ("selector" in r) return quoted(r.selector);
    const n = index.get(r.node)?.node;
    const base = quoted(n ? nodeLabel(n) : r.node);
    const from = t.stagger?.from === "end" ? ", depuis la fin" : t.stagger?.from === "center" ? ", depuis le centre" : "";
    const each = t.stagger ? ` (tous les ${formatMs(t.stagger.each)}${from})` : "";
    // Sans décalage, les enfants partent ensemble (constat 2 des tests simulés) : « un à un » ne se dit qu'avec un décalage réel.
    // Les enfants se disent par leur nombre (vague 4, N1 : « les enfants de « Plats » » n'est pas un mot du métier) ; une vue dit ses cartes.
    if (r.children) { const count = n?.type === "collection" ? undefined : n?.children?.length; const kids = n?.type === "collection" ? `les cartes de ${base}` : count ? `les ${count} éléments de ${base}` : `les éléments de ${base}`; return t.stagger?.each ? `${kids} ${n?.type === "collection" ? "une à une" : "un à un"}${each}` : `${kids} ensemble`; }
    if (r.split) return `${r.split === "letters" ? "les lettres" : "les mots"} de ${base}${each}`;
    return base;
  };
  // Un préréglage posé sur l'élément lui-même se dit par son nom : « fondu en montant en 700 ms ».
  const preset = presetById(a.preset);
  const only = tracks.length === 1 ? tracks[0]! : undefined;
  const onHost = !!only && "trigger" in only.target && !only.target.children && !only.target.split;
  const lower = (label: string) => `${label.charAt(0).toLowerCase()}${label.slice(1)}`;
  // Dans un enchaînement, chaque élément dit son effet quand c'est un préréglage, et « puis » marque celui qui part après la fin du précédent.
  const effect = (t: Track) => { const m = positional ? undefined : trackPresetMatch(t); return m ? ` (${lower(m.preset.label)})` : ""; };
  const what = only && onHost && preset && isPresetIntact(a) && !positional
    ? `${lower(preset.label)} ${moment(only)}`
    : tracks.map((t, i) => {
      const part = `${subject(t)}${effect(t)} ${moment(t)}`;
      if (i === 0) return part;
      const sequential = !positional && trackSpan(t).start >= trackSpan(tracks[i - 1]!).end - 1;
      return `${sequential ? ", puis " : i === tracks.length - 1 ? " et " : ", "}${part}`;
    }).join("");
  const after = trigger.on === "inView" ? (trigger.once === false ? "à chaque passage" : "une seule fois")
    : trigger.on === "hover" ? (trigger.reverseOnLeave ? "puis retour quand la souris part" : "et reste ainsi quand la souris part")
    : trigger.on === "click" && trigger.toggle ? "un clic sur deux la rembobine"
    : a.loop === "infinite" ? `en boucle${a.alternate ? ", en aller-retour" : ""}`
    : typeof a.loop === "number" && a.loop > 1 ? `${a.loop} fois${a.alternate ? ", en aller-retour" : ""}` : "";
  return `${when}${delay} : ${what}${after ? `, ${after}` : ""}.${missing}`;
}
/** « 1 500 ms (1,5 s) » : au-delà d'une seconde, la durée se lit aussi en secondes (vague 3, § 6.10). */
export function formatDuration(ms: number): string {
  if (ms < 1000) return formatMs(ms);
  const s = Math.round(ms / 100) / 10;
  return `${formatMs(ms)} (${String(s).replace(".", ",")} s)`;
}

/** Nom d'une nouvelle animation : d'après ce qui la lance (« Animation · Texte », puis « Animation · Texte 2 »), sinon « Animation 3 », le premier libre. */
export function nextAnimationName(site: Pick<Site, "animations">, hostLabel?: string): string {
  const taken = (name: string) => site.animations.some((a) => a.name === name);
  if (hostLabel) {
    const base = `Animation · ${hostLabel}`;
    if (!taken(base)) return base;
    let i = 2;
    while (taken(`${base} ${i}`)) i += 1;
    return `${base} ${i}`;
  }
  let n = site.animations.length + 1;
  while (site.animations.some((a) => a.name === `Animation ${n}`)) n += 1;
  return `Animation ${n}`;
}

/** Un élément de la scène, pour l'ajouter en piste sans viser dans la page : son nom, sa profondeur, et le nombre de ses enfants quand ils forment un groupe. */
export type SceneElement = { id: string; depth: number; label: string; count?: number };

/**
 * Les éléments de la scène d'une animation (lot 8, vague 4 PR2 : « il n'y a pas de liste de calques à côté de la ligne de temps ») : ceux du
 * bloc qui lance l'animation s'il en contient, sinon ceux de la section (ou du bloc nommé) qui le contient. Quatre niveaux, quarante au plus.
 */
export function sceneElements(site: Site, hostId: string): SceneElement[] {
  const index = indexSite(site);
  const loc = index.get(hostId);
  if (!loc) return [];
  let root: Node | undefined = loc.node.children?.length ? loc.node : undefined;
  // Sans enfants : la section qui contient l'élément (ou la région de premier niveau de la page, sinon la racine).
  for (let p = root ? undefined : (loc.parent ? index.get(loc.parent.id) : undefined); p && !root; p = p.parent ? index.get(p.parent.id) : undefined) {
    const grand = p.parent ? index.get(p.parent.id) : undefined;
    if (p.node.props.tag === "section" || !grand?.parent || !p.parent) root = p.node;
  }
  if (!root) return [];
  const out: SceneElement[] = [];
  const visit = (n: Node, depth: number) => {
    for (const c of n.children ?? []) {
      if (out.length >= 40) return;
      const first = c.children?.[0];
      const g = first ? siblingGroup(site, first.id) : undefined;
      out.push({ id: c.id, depth, label: nodeLabel(c), ...(g && g.groupId === c.id ? { count: g.members.length } : {}) });
      if (depth < 3) visit(c, depth + 1);
    }
  };
  visit(root, 0);
  return out;
}
