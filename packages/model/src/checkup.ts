import type { Id, Inline, LinkTarget, Localized, Node, Page, Site } from "./types";
import { NOT_FOUND_PATH } from "./redirects";
import { walk } from "./tree";

/**
 * Bilan avant publication (23 septembre 2026) : ce que le document seul permet de vérifier, sans mesure externe.
 * Chaque constat porte un niveau (« à corriger » : le site publié sera fautif ; « à regarder » : il sera moins bon qu'il pourrait),
 * une phrase, et la page ou l'élément en cause pour y aller d'un clic. Rien ne bloque la publication.
 */
export type FindingLevel = "fix" | "look";
export type FindingRule =
  | "image-alt" | "image-external" | "image-priority"
  | "page-title" | "page-description" | "page-title-duplicate" | "page-h1"
  | "link-missing-page" | "fonts-weight" | "anim-load-below"
  | "settings-subdomain" | "settings-favicon" | "settings-share-image";
export type Finding = { rule: FindingRule; level: FindingLevel; message: string; pageId?: Id; nodeId?: Id };

/** Au-delà de ce nombre de fichiers demandés à Google Fonts, le premier affichage attend trop. */
export const MAX_FONT_FILES = 5;

const loc = (v: Localized<string> | undefined, locale: string): string => (v?.[locale] ?? (v ? Object.values(v)[0] : undefined) ?? "").trim();
const quote = (s: string) => `« ${s} »`;

/** Les pages qui comptent pour le référencement : indexées, et pas la page d'erreur. */
const indexed = (p: Page) => p.seo?.index !== false && p.path !== NOT_FOUND_PATH;

function links(node: Node): LinkTarget[] {
  const out: LinkTarget[] = [];
  if (node.type === "link" && !node.bindings?.href && node.props.href && typeof node.props.href === "object") out.push(node.props.href as LinkTarget);
  const content = node.props.content as Localized<Inline[]> | undefined;
  const rec = (list: Inline[] | undefined) => { for (const seg of list ?? []) if (seg.t === "link") { out.push(seg.href); rec(seg.children); } };
  if (content && typeof content === "object") for (const list of Object.values(content)) rec(list);
  return out;
}

/** Le premier écran d'une page : son premier bloc de niveau 1 qui n'est ni un en-tête ni une navigation (ni un composant, en général l'en-tête). */
function firstScreen(root: Node): Node | undefined {
  return root.children?.find((c) => !(c.type === "instance" || (c.type === "box" && ["header", "nav"].includes(String(c.props.tag)))));
}

export function checkup(site: Site): Finding[] {
  const out: Finding[] = [];
  const locale = site.settings.defaultLocale;
  const pageIds = new Set(site.pages.map((p) => p.id));
  const assets = new Map(site.assets.map((a) => [a.id, a]));
  const externalSeen = new Set<Id>();
  const titles = new Map<string, Page[]>();

  for (const page of site.pages) {
    const pageName = quote(loc(page.name, locale) || page.path);
    const title = loc(page.seo?.title, locale) || loc(page.name, locale);
    if (indexed(page)) {
      if (!title) out.push({ rule: "page-title", level: "fix", message: `La page ${pageName} n'a pas de titre : les moteurs et les onglets afficheront son adresse.`, pageId: page.id });
      else titles.set(title, [...(titles.get(title) ?? []), page]);
      if (!loc(page.seo?.description, locale) && !loc(site.settings.seo.description, locale)) out.push({ rule: "page-description", level: "look", message: `La page ${pageName} n'a pas de description : les moteurs en inventeront une à partir du texte.`, pageId: page.id });
    }

    let h1 = 0; let firstImage: Node | undefined;
    const first = firstScreen(page.root);
    const top = new Map<Id, Node>();
    walk(page.root, (node, parent) => {
      const owner = parent === page.root || parent === null ? node : top.get(parent.id)!;
      top.set(node.id, owner);
      if (node.type === "text" && node.props.tag === "h1") h1++;
      if (node.type === "image") {
        firstImage ??= node;
        const bound = !!node.bindings?.asset;
        const asset = typeof node.props.asset === "string" ? assets.get(node.props.asset) : undefined;
        if (!bound && !node.bindings?.alt && !loc(node.props.alt as Localized<string> | undefined, locale) && !loc(asset?.alt, locale)) {
          out.push({ rule: "image-alt", level: "fix", message: `Une image de la page ${pageName} n'a pas de texte alternatif : rien pour les lecteurs d'écran ni pour les moteurs.`, pageId: page.id, nodeId: node.id });
        }
        if (asset && asset.kind === "image" && !asset.variants?.length && !externalSeen.has(asset.id)) {
          externalSeen.add(asset.id);
          out.push({ rule: "image-external", level: "look", message: `L'image ${quote(asset.name ?? asset.url.replace(/^https?:\/\//, "").slice(0, 40))} n'a pas de déclinaisons : elle sera servie en taille réelle sur tous les écrans. Importez-la dans la bibliothèque pour qu'Atelier la décline.`, pageId: page.id, nodeId: node.id });
        }
      }
      for (const href of links(node)) {
        if (href.kind === "page" && !pageIds.has(href.page)) out.push({ rule: "link-missing-page", level: "fix", message: `Un lien de la page ${pageName} mène vers une page qui n'existe plus : il donnera une page introuvable.`, pageId: page.id, nodeId: node.id });
      }
      if (node.triggers?.some((t) => t.on === "load") && first && owner !== first) {
        out.push({ rule: "anim-load-below", level: "look", message: `Sur la page ${pageName}, une animation part « au chargement » sur un élément sous le premier écran : elle sera déjà finie quand on y arrivera. « Quand il entre dans l'écran » convient mieux.`, pageId: page.id, nodeId: node.id });
      }
    });
    if (indexed(page) && h1 !== 1) out.push({ rule: "page-h1", level: "fix", message: h1 === 0 ? `La page ${pageName} n'a pas de titre de niveau 1 : les moteurs et les lecteurs d'écran ne sauront pas de quoi elle parle.` : `La page ${pageName} a ${h1} titres de niveau 1 : un seul dit de quoi elle parle, les autres passent en niveau 2.`, pageId: page.id });
    if (firstImage && !firstImage.props.priority && !firstImage.bindings?.asset && top.get(firstImage.id) === first) {
      out.push({ rule: "image-priority", level: "look", message: `La première image de la page ${pageName} n'est pas marquée prioritaire : le navigateur la chargera après le reste. Cochez « Prioritaire » dans ses réglages.`, pageId: page.id, nodeId: firstImage.id });
    }
  }
  for (const [title, pages] of titles) if (pages.length > 1) for (const p of pages) out.push({ rule: "page-title-duplicate", level: "look", message: `${pages.length} pages portent le titre ${quote(title)} : les moteurs les confondront. Donnez à chacune le sien dans ses réglages.`, pageId: p.id });

  const files = site.theme.fonts.filter((f) => f.provider === "google").reduce((n, f) => n + (f.weights?.length || 1), 0);
  if (files > MAX_FONT_FILES) out.push({ rule: "fonts-weight", level: "look", message: `${files} fichiers de police sont demandés à Google (familles et graisses) : le texte attendra. Au-delà de ${MAX_FONT_FILES}, retirez des graisses ou une famille dans le thème.` });

  if (!site.settings.subdomain) out.push({ rule: "settings-subdomain", level: "look", message: "Le site n'a pas d'adresse choisie : elle sera dérivée de son identifiant. Choisissez un sous-domaine dans les réglages du site." });
  if (!site.settings.seo.favicon) out.push({ rule: "settings-favicon", level: "look", message: "Le site n'a pas d'icône : l'onglet du navigateur restera vide. Ajoutez un favicon dans les réglages du site." });
  if (!site.settings.seo.image) out.push({ rule: "settings-share-image", level: "look", message: "Le site n'a pas d'image de partage : un lien envoyé sur les réseaux s'affichera sans visuel. Ajoutez-en une dans les réglages du site." });
  return out;
}

/** Les comptes par niveau et la phrase du bouton : « 2 points à corriger, 1 à regarder », « 1 point à regarder », « Rien à signaler ». */
export function checkupSummary(findings: Finding[]): { fix: number; look: number; sentence: string } {
  const fix = findings.filter((f) => f.level === "fix").length;
  const look = findings.length - fix;
  const parts: string[] = [];
  if (fix) parts.push(`${fix} point${fix > 1 ? "s" : ""} à corriger`);
  if (look) parts.push(fix ? `${look} à regarder` : `${look} point${look > 1 ? "s" : ""} à regarder`);
  return { fix, look, sentence: parts.length ? parts.join(", ") : "Rien à signaler" };
}
