import { unstable_cache, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import type { Site } from "@atelier/model";
import { getStore, type Published } from "@/lib/store";

/** Domaine sous lequel les sites publiés répondent (`<sous-domaine>.<domaine>`). En développement : localhost:3000. */
export const SITES_DOMAIN = process.env.ATELIER_SITES_DOMAIN ?? "localhost:3000";
export const subdomainOf = (site: Site) => site.settings.subdomain ?? site.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
/** Adresse publique d'un site : sous-domaine si le domaine d'Atelier est configuré, sinon le chemin de repli `/s/<sous-domaine>`. */
export function publicUrl(site: Site): string {
  const sub = subdomainOf(site);
  const https = !SITES_DOMAIN.startsWith("localhost");
  return `${https ? "https" : "http"}://${sub}.${SITES_DOMAIN}`;
}

/** Instantané publié d'un site, mis en cache et régénéré à la demande (D35) par l'étiquette `site:<id>`. */
export const getPublished = (siteId: string): Promise<Published | null> => unstable_cache(async () => getStore().published(siteId), ["published", siteId], { tags: [`site:${siteId}`] })();
export const getSiteIdBySub = (sub: string): Promise<string | null> => unstable_cache(async () => getStore().findBySubdomain(sub), ["site-by-sub", sub], { tags: ["sites-index"] })();

export function invalidatePublished(siteId: string) {
  revalidateTag(`site:${siteId}`, { expire: 0 });
  revalidateTag("sites-index", { expire: 0 });
}

/** Préfixe des liens : vide derrière un sous-domaine, `/s/<sous-domaine>` en repli par chemin. */
export async function basePathFor(sub: string): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "";
  return host.endsWith(`.${SITES_DOMAIN}`) ? "" : `/s/${sub}`;
}
