import { applyOp, type Op, type Site } from "@atelier/model";

export type Rebase = { ok: true; site: Site; ops: Op[] } | { ok: false; reason: string };

/**
 * Conflit de version : le serveur a enregistré d'autres changements pendant que l'éditeur en gardait en attente.
 * Repose les opérations en attente sur le document du serveur, dans l'ordre. Tout ou rien : si une opération n'a plus de
 * sens sur ce document (l'élément visé a disparu, le parent n'existe plus), rien n'est reposé et la raison est rendue,
 * pour que l'éditeur se fige avec ses changements intacts au lieu d'en enregistrer une partie.
 * Les opérations rendues portent leur `prev` lu dans le document du serveur : elles restent inversibles et journalisables.
 */
export function rebasePending(remote: Site, pending: Op[]): Rebase {
  const ops: Op[] = [];
  let site = remote;
  for (const op of pending) {
    try {
      const r = applyOp(site, op);
      site = r.site;
      ops.push(r.op);
    } catch (e) {
      const what = "id" in op ? ` (élément ${op.id})` : "";
      return { ok: false, reason: `${e instanceof Error ? e.message : "opération refusée"}${what}` };
    }
  }
  return { ok: true, site, ops };
}
