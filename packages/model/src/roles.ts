import type { Op } from "./types";

/** Rôles sur un site (D50, D51) : le propriétaire fait tout, un éditeur tout sauf gérer le partage et supprimer le site, un rédacteur ne touche qu'au contenu. */
export type Role = "owner" | "editor" | "writer";
export const ROLE_RANK: Record<Role, number> = { writer: 1, editor: 2, owner: 3 };
export const ROLE_LABEL: Record<Role, string> = { owner: "Propriétaire", editor: "Éditeur", writer: "Rédacteur" };
export const atLeast = (role: Role | null | undefined, min: Role) => !!role && ROLE_RANK[role] >= ROLE_RANK[min];

/**
 * Frontière Écriture/Design appliquée aux droits : un rédacteur peut changer le contenu (textes, images, liens, structure des blocs, noms)
 * mais rien qui touche l'apparence (`style`, `hidden`) ni au site lui-même (`site.set` : thème, pages, composants, bases, réglages).
 */
export function opAllowedForWriter(op: Op): boolean {
  switch (op.op) {
    case "site.set": return false;
    case "node.set": return !/^(style|hidden)(\.|$)/.test(op.path);
    case "batch": return op.ops.every(opAllowedForWriter);
    // Insérer, déplacer, retirer ou remplacer un bloc : de l'écriture (un bloc pré-stylé reste dans les limites du thème).
    default: return true;
  }
}
