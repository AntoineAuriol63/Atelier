/** En production, l'application refuse de tourner en mode dégradé : sans Supabase on perdrait les données, sans connexion on exposerait l'éditeur. */
export const isProduction = () => process.env.NODE_ENV === "production";

export function productionMisconfiguration(): string | null {
  if (!isProduction()) return null;
  const missing = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].filter((k) => !process.env[k]);
  if (missing.length) return `Variables manquantes en production : ${missing.join(", ")}`;
  if (process.env.ATELIER_AUTH === "off") return "ATELIER_AUTH=off est interdit en production";
  if (process.env.ATELIER_STORE === "file") return "ATELIER_STORE=file est interdit en production";
  if (!(process.env.ATELIER_ALLOWED_EMAILS ?? "").trim()) return "ATELIER_ALLOWED_EMAILS doit lister les adresses autorisées en production";
  return null;
}

/** Lève une erreur claire au premier usage du dépôt ou de la connexion en production mal configurée. */
export function assertProduction(): void {
  const problem = productionMisconfiguration();
  if (problem) throw new Error(`Configuration refusée : ${problem} (voir docs/mise-en-ligne.md)`);
}

/** Le repli `/s/<sous-domaine>/` sur le domaine de l'éditeur n'existe qu'en développement, ou si on l'autorise explicitement (jamais avec des sites de clients). */
export const pathFallbackAllowed = () => !isProduction() || process.env.ATELIER_ALLOW_PATH_FALLBACK === "1";
