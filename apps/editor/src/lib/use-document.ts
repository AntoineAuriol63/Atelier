"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { canRedo, canUndo, commit as commitOp, createHistory, migrate, opAllowedForWriter, redo as redoOp, undo as undoOp, type CommitOptions, type History, type Op, type Role, type Site } from "@atelier/model";
import { rebasePending } from "./rebase";

export type SyncStatus = "saved" | "saving" | "offline" | "conflict" | "error";

type Doc = { site: Site; history: History };

/**
 * Document en cours d'édition : état local immédiat (optimiste), historique d'annulation,
 * et envoi séquentiel des opérations au journal du serveur.
 * L'état de référence vit dans un ref pour que deux commits d'un même événement s'enchaînent
 * sans dépendre du rendu ; les fonctions ci-dessous ne sont appelées que depuis des gestionnaires d'événements.
 *
 * Quatre sortes d'incidents, quatre réponses :
 * - coupure réseau : rien n'est perdu, le lot repart en tête de file, nouvel essai à délai croissant (`retryNow` force l'essai) ;
 * - refus du serveur pour une raison de rôle (403) : l'opération est annulée localement, le document est remis dans son état
 *   enregistré, l'éditeur reste utilisable ;
 * - conflit de version (409, le site a été modifié ailleurs) : le document du serveur est relu et les opérations en attente
 *   sont reposées dessus (`rebasePending`) puis renvoyées ; l'annulation repart de zéro et `onMerged` prévient. Si une
 *   opération n'a plus de sens sur ce document (l'élément visé a disparu), ou si le renvoi est encore en conflit,
 *   l'éditeur est figé (`blocked`) avec ses changements intacts ;
 * - erreur serveur : l'éditeur est figé ; `copyPending` met les opérations non enregistrées dans le presse-papiers avant de recharger.
 */
export function useDocument(initialSite: Site, initialVersion: number, options: { role?: Role; onRefused?: (message: string) => void; onMerged?: (message: string) => void } = {}) {
  const initialDoc = useMemo<Doc>(() => ({ site: initialSite, history: createHistory() }), [initialSite]);
  const docRef = useRef<Doc>(initialDoc);
  const [doc, setDoc] = useState<Doc>(initialDoc);
  const [status, setStatus] = useState<SyncStatus>("saved");
  const [error, setError] = useState<string | undefined>();
  const [version, setVersion] = useState(initialVersion);
  const [retryAt, setRetryAt] = useState<number | null>(null);
  const pending = useRef<Op[]>([]);
  const inflight = useRef(false);
  const versionRef = useRef(initialVersion);
  const blocked = useRef(false);
  const retries = useRef(0);
  const retryTimer = useRef<number | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Quitter la page avec des opérations en attente perdrait du travail : le navigateur demande confirmation.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => { if (pending.current.length || inflight.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  function setLocal(next: Doc) {
    docRef.current = next;
    if (process.env.NODE_ENV !== "production") (globalThis as unknown as { __atelierDoc?: Doc }).__atelierDoc = next;
    setDoc(next);
  }

  /** Remet le document dans son état enregistré (après un refus du serveur) ; l'historique local repart de zéro. */
  async function resetFromServer(): Promise<boolean> {
    try {
      const res = await fetch(`/api/sites/${initialSite.id}`);
      if (!res.ok) return false;
      const body = (await res.json()) as { site: Site; version: number };
      pending.current = [];
      versionRef.current = body.version;
      setVersion(body.version);
      setLocal({ site: migrate(body.site), history: createHistory() });
      return true;
    } catch { return false; }
  }

  /** Fige l'éditeur avec ses opérations en attente intactes (conflit insoluble ou erreur serveur). */
  function freeze(ops: Op[], kind: "conflict" | "error", message: string) {
    pending.current = [...ops, ...pending.current];
    blocked.current = true; setIsBlocked(true);
    setStatus(kind);
    setError(message);
  }

  /**
   * Conflit de version : relit le document du serveur, y repose les opérations en attente et les renvoie une fois.
   * Rend vrai si le renvoi a abouti ; sinon l'éditeur est figé.
   */
  async function mergeAndResend(ops: Op[]): Promise<boolean> {
    const stuck = "Le site a été modifié ailleurs. Copiez vos changements si besoin, puis rechargez la page.";
    let remote: { site: Site; version: number };
    try {
      const res = await fetch(`/api/sites/${initialSite.id}`);
      if (!res.ok) { freeze(ops, "conflict", stuck); return false; }
      remote = (await res.json()) as { site: Site; version: number };
    } catch { freeze(ops, "conflict", stuck); return false; }
    const all = [...ops, ...pending.current];
    const r = rebasePending(migrate(remote.site), all);
    if (!r.ok) { freeze(ops, "conflict", `Le site a été modifié ailleurs et l'un de vos changements ne s'y applique plus (${r.reason}). Copiez vos changements si besoin, puis rechargez la page.`); return false; }
    const res = await fetch(`/api/sites/${initialSite.id}/changes`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ ops: r.ops, baseVersion: remote.version }),
    });
    if (!res.ok) { freeze(ops, "conflict", stuck); return false; }
    const body = (await res.json()) as { version: number };
    // Le document reposé devient l'état de référence ; l'historique local portait sur un document qui n'existe plus.
    pending.current = [];
    versionRef.current = body.version;
    setVersion(body.version);
    setLocal({ site: r.site, history: createHistory() });
    setError(undefined);
    setStatus("saved");
    optionsRef.current.onMerged?.("Le site a été modifié ailleurs : vos changements ont été reposés par-dessus et enregistrés. L'annulation repart de zéro.");
    return true;
  }

  async function flush(): Promise<void> {
    if (inflight.current || blocked.current || pending.current.length === 0) return;
    inflight.current = true;
    const ops = pending.current;
    pending.current = [];
    try {
      const res = await fetch(`/api/sites/${initialSite.id}/changes`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ ops, baseVersion: versionRef.current }),
      });
      if (res.status === 409) {
        await mergeAndResend(ops);
        return;
      }
      if (res.status === 403) {
        // Refus de rôle : on annule localement au lieu de figer l'éditeur.
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        const ok = await resetFromServer();
        setStatus(ok ? "saved" : "error");
        optionsRef.current.onRefused?.(`${body.error ?? "Cette modification n'est pas permise avec votre rôle."} ${ok ? "Le site a été remis dans son état enregistré." : "Rechargez la page."}`);
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string; issues?: string[] };
        freeze(ops, "error", `${body.error ?? `Erreur ${res.status}`}${body.issues?.length ? ` (${body.issues.join(" ; ")})` : ""}. Vos dernières modifications ne sont pas enregistrées : copiez-les si besoin, puis rechargez la page.`);
        return;
      }
      const body = (await res.json()) as { version: number };
      versionRef.current = body.version;
      retries.current = 0;
      setRetryAt(null);
      setVersion(body.version);
      setError(undefined);
      setStatus(pending.current.length ? "saving" : "saved");
    } catch {
      // Incident réseau : rien n'est perdu. Le lot repart en tête de file et on réessaie avec un délai croissant.
      pending.current = [...ops, ...pending.current];
      retries.current += 1;
      const delay = Math.min(30_000, 2_000 * 2 ** (retries.current - 1));
      setStatus("offline");
      setError("Connexion perdue : vos modifications sont gardées ici, nouvel essai automatique.");
      setRetryAt(Date.now() + delay);
      inflight.current = false;
      if (retryTimer.current) window.clearTimeout(retryTimer.current);
      retryTimer.current = window.setTimeout(() => { retryTimer.current = null; void flush(); }, delay);
      return;
    } finally {
      inflight.current = false;
      if (pending.current.length && !blocked.current && !retryTimer.current) void flush();
    }
  }

  /** Réessayer sans attendre le délai (bouton « Réessayer maintenant »). */
  function retryNow() {
    if (retryTimer.current) { window.clearTimeout(retryTimer.current); retryTimer.current = null; }
    setRetryAt(null);
    void flush();
  }

  /** Copie les opérations non enregistrées (JSON) : à coller dans un ticket ou à garder avant de recharger. */
  async function copyPending(): Promise<number> {
    const ops = pending.current;
    try { await navigator.clipboard.writeText(JSON.stringify({ site: initialSite.id, baseVersion: versionRef.current, ops }, null, 2)); } catch { /* presse-papiers refusé : rien à faire */ }
    return ops.length;
  }

  function apply(next: Doc, applied: Op) {
    setLocal(next);
    pending.current.push(applied);
    setStatus((s) => (s === "offline" ? s : "saving"));
    void flush();
  }

  function commit(op: Op, opts?: CommitOptions) {
    if (blocked.current) return;
    // Un rédacteur ne touche ni aux réglages du site ni à la mise en forme : refusé ici, sans aller-retour serveur.
    if (optionsRef.current.role === "writer" && !opAllowedForWriter(op)) {
      optionsRef.current.onRefused?.("En tant que rédacteur, vous pouvez modifier les contenus, pas la mise en forme ni les réglages du site.");
      return;
    }
    try {
      const r = commitOp(docRef.current.site, docRef.current.history, op, opts);
      apply({ site: r.site, history: r.history }, r.applied);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Opération refusée");
    }
  }

  function undo() {
    if (blocked.current) return;
    const r = undoOp(docRef.current.site, docRef.current.history);
    if (r) apply({ site: r.site, history: r.history }, r.applied);
  }

  function redo() {
    if (blocked.current) return;
    const r = redoOp(docRef.current.site, docRef.current.history);
    if (r) apply({ site: r.site, history: r.history }, r.applied);
  }

  /** Le document tel qu'il est après la dernière opération, sans attendre le rendu : pour les aides qui réécrivent un tableau entier (animations). */
  const getSite = () => docRef.current.site;

  return { site: doc.site, history: doc.history, version, status, error, retryAt, blocked: isBlocked, commit, getSite, undo, redo, retryNow, copyPending, canUndo: canUndo(doc.history), canRedo: canRedo(doc.history) };
}
