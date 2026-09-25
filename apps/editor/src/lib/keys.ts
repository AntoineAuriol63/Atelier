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

/**
 * Vrai quand la touche part de l'outil Animation (tiroir sous le canevas) : Suppr, les flèches et Entrée y appartiennent à la ligne
 * de temps (images-clés, tête de lecture), jamais à l'élément sélectionné (constat d'Antoine, 23 septembre 2026 : Suppr effaçait l'élément
 * et fermait l'outil).
 */
export function insideAnimationTool(target: EventTarget | null): boolean {
  const el = target as Element | null;
  return !!el && typeof el.closest === "function" && !!el.closest("[data-animation-drawer]");
}

/**
 * ⌘Z (ou ⌘⇧Z) : à qui va la touche ? Partie d'un champ de saisie, au champ tant qu'il a une frappe à annuler (ou à rétablir), sinon au
 * document d'Atelier ; hors d'un champ, toujours au document. Jamais au navigateur : Safari, quand la page ne consomme pas ⌘Z, rouvre
 * le dernier onglet fermé (constat d'Antoine, 25 septembre 2026 : « ça revient à mon onglet précédent »). `null` : pas une touche d'annulation.
 * `canField(cmd)` dit si le champ a quelque chose à annuler ou à rétablir (voir `FieldUndo`).
 */
export function undoTarget(e: { key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; target?: EventTarget | null }, canField: (cmd: "undo" | "redo") => boolean): "field" | "document" | null {
  if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return null;
  if (!isEditableTarget(e.target ?? null)) return "document";
  try { return canField(e.shiftKey ? "redo" : "undo") ? "field" : "document"; } catch { return "document"; }
}

/** La valeur d'un champ, pour savoir s'il a changé depuis qu'on y est entré. */
export function fieldValue(el: Element | null): string {
  if (!el) return "";
  const h = el as HTMLInputElement;
  return typeof h.value === "string" ? h.value : (el.textContent ?? "");
}

/**
 * Ce qu'un champ peut annuler ou rétablir, sans demander au navigateur (`queryCommandEnabled` dit « oui » à tort dans Chrome) : le champ a
 * quelque chose à annuler s'il a changé depuis qu'on y est entré ; quelque chose à rétablir si le dernier ⌘Z y a été laissé au navigateur.
 */
export class FieldUndo {
  private el: Element | null = null;
  private value = "";
  private nativeUndo = false;
  /** À l'entrée dans un champ. */
  enter(el: Element | null) { this.el = el; this.value = fieldValue(el); this.nativeUndo = false; }
  /** Le champ actif peut-il annuler (il a changé) ou rétablir (le dernier ⌘Z lui a été laissé) ? */
  can(cmd: "undo" | "redo", active: Element | null): boolean {
    if (!active || active !== this.el) return false;
    return cmd === "undo" ? fieldValue(active) !== this.value : this.nativeUndo;
  }
  /** La touche a été laissée au champ. */
  left(cmd: "undo" | "redo") { this.nativeUndo = cmd === "undo"; }
}
