/** « ⌘ » sur Mac, « Ctrl » ailleurs : les raccourcis affichés suivent le clavier de l'utilisateur. */
export function mod(): string {
  if (typeof navigator === "undefined") return "⌘";
  return /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl+";
}
