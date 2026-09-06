const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

/** Identifiant court, stable, sûr pour une classe CSS après préfixe (12 caractères). */
export function newId(size = 12): string {
  const bytes = new Uint8Array(size);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < size; i++) out += ALPHABET[bytes[i]! & 63];
  // Une classe CSS ne peut pas commencer par un chiffre ou un tiret.
  if (/^[0-9-]/.test(out)) out = "n" + out.slice(1);
  return out;
}

export const ID_PATTERN = /^[A-Za-z_][A-Za-z0-9_-]{2,31}$/;

export function isValidId(id: unknown): id is string {
  return typeof id === "string" && ID_PATTERN.test(id);
}
