/** Plafonds des corps de requête, avec un message en français plutôt qu'un 413 muet de la plateforme (4,5 Mo par requête chez Vercel). */
export const LIMITS = {
  changesBytes: 2_000_000,
  entriesBytes: 4_000_000,
  entriesCount: 2_000,
  formBytes: 64_000,
  assetFileBytes: 12_000_000,
  assetTotalBytes: 20_000_000,
  assetFiles: 4,
} as const;

const mo = (n: number) => `${Math.round(n / 100_000) / 10} Mo`;

/** Réponse à renvoyer si la requête annonce un corps trop gros, sinon `null`. */
export function tooLarge(req: Request, maxBytes: number, what = "L'envoi"): Response | null {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(len) && len > maxBytes) return Response.json({ error: `${what} dépasse ${mo(maxBytes)} (${mo(len)}). Réduisez ou découpez.` }, { status: 413 });
  return null;
}
