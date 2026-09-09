/** Un chemin interne sûr pour une redirection : commence par un seul `/`, sans `//`, `\\` ni schéma. Sinon `/`. */
export function safePath(input: string | null | undefined): string {
  if (!input || !input.startsWith("/") || input.startsWith("//") || /[\\\r\n]/.test(input) || /^\/[^/]*:/.test(input.split("?")[0]!)) return "/";
  return input;
}
