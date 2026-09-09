import type { Redirect, Site } from "./types";

/**
 * Redirections (D39) : `from` est un chemin exact (`/ancienne-page`) ou un préfixe avec `/*` (`/blog/*`) ; `to` est un chemin,
 * une adresse complète, et peut reprendre le reste capturé avec `*` (`/actualites/*`). La première règle qui correspond gagne.
 */
export function matchRedirect(site: Pick<Site, "redirects">, path: string): { to: string; permanent: boolean } | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  for (const r of site.redirects) {
    const from = r.from.replace(/\/+$/, "") || "/";
    if (from.endsWith("/*")) {
      const prefix = from.slice(0, -1);
      if (clean === prefix.slice(0, -1) || clean.startsWith(prefix)) return { to: r.to.replace("*", clean.slice(prefix.length)), permanent: r.permanent };
    } else if (from === clean) return { to: r.to.replace("*", ""), permanent: r.permanent };
  }
  return undefined;
}

export function validRedirect(r: Redirect): string | undefined {
  if (!r.from.startsWith("/")) return "L'adresse de départ commence par /";
  if (!/^(\/|https?:\/\/)/.test(r.to)) return "La destination est un chemin (/…) ou une adresse complète (https://…)";
  if (r.from === r.to) return "Une redirection vers elle-même boucle";
  return undefined;
}

/** Adresse conventionnelle de la page « introuvable » (servie en 404, exportée en `404.html`). */
export const NOT_FOUND_PATH = "/404";
