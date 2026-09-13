/** « ⌘ » sur Mac, « Ctrl » ailleurs : les raccourcis affichés suivent le clavier de l'utilisateur. */
export function mod(): string {
  if (typeof navigator === "undefined") return "⌘";
  return /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl+";
}

/**
 * La touche est-elle partie d'un champ de saisie (champ, zone de texte, liste, contenu éditable) ? On regarde la **cible** de
 * l'événement et pas seulement l'élément actif : un champ qui se quitte lui-même sur Entrée (valider un nombre) laisse `body`
 * actif quand l'écouteur de la fenêtre reçoit la touche, qui déclenchait alors les raccourcis de l'éditeur (renommer le calque).
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || typeof (target as Element).closest !== "function") return false;
  const el = target as HTMLElement;
  if (el.closest("input, textarea, select")) return true;
  return !!el.closest("[contenteditable='true'], [contenteditable='']") || el.isContentEditable === true;
}
