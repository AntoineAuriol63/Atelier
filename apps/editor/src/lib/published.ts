import { unstable_cache, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import type { Site } from "@atelier/model";
import { getStore, type Published } from "@/lib/store";
import { pathFallbackAllowed } from "@/lib/env";

/** Domaine sous lequel les sites publiés répondent (`<sous-domaine>.<domaine>`). En développement : localhost:3000. */
export const SITES_DOMAIN = process.env.ATELIER_SITES_DOMAIN ?? "localhost:3000";
export const subdomainOf = (site: Site) => site.settings.subdomain ?? site.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
/**
 * Adresse publique d'un site : `https://<sous-domaine>.<domaine>` si `ATELIER_SITES_DOMAIN` est réglé, sinon le chemin de repli
 * `/s/<sous-domaine>` derrière l'origine de la requête en cours (déploiement sans domaine de sites, développement).
 */
export async function publicUrl(site: Pick<Site, "id" | "settings">): Promise<string> {
  const sub = subdomainOf(site as Site);
  const domain = process.env.ATELIER_SITES_DOMAIN;
  if (domain) return `${domain.startsWith("localhost") ? "http" : "https"}://${sub}.${domain}`;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}/s/${sub}`;
}

/** Instantané publié d'un site, mis en cache et régénéré à la demande (D35) par l'étiquette `site:<id>`. */
export const getPublished = (siteId: string): Promise<Published | null> => unstable_cache(async () => getStore().published(siteId), ["published", siteId], { tags: [`site:${siteId}`] })();
const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
export const getSiteIdBySub = (sub: string): Promise<string | null> => (SUBDOMAIN.test(sub) ? unstable_cache(async () => getStore().findBySubdomain(sub), ["site-by-sub", sub], { tags: ["sites-index"] })() : Promise.resolve(null));

/** Le site publié ne se sert que derrière son sous-domaine ; le repli `/s/…` sur le domaine de l'éditeur est réservé au développement. */
export async function servedFromSitesDomain(): Promise<boolean> {
  const host = (await headers()).get("host") ?? "";
  return host.endsWith(`.${SITES_DOMAIN}`);
}

export function invalidatePublished(siteId: string) {
  revalidateTag(`site:${siteId}`, { expire: 0 });
  revalidateTag("sites-index", { expire: 0 });
}

/** Préfixe des liens : vide derrière un sous-domaine, `/s/<sous-domaine>` en repli par chemin. */
export async function basePathFor(sub: string): Promise<string> {
  return (await servedFromSitesDomain()) ? "" : `/s/${sub}`;
}

/** Vrai si cette requête a le droit d'être servie : sous-domaine, ou repli autorisé. */
export async function canServeHere(): Promise<boolean> {
  return (await servedFromSitesDomain()) || pathFallbackAllowed();
}
