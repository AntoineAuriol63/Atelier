"use client";

import { useMemo, useRef, useState } from "react";
import { canRedo, canUndo, commit as commitOp, createHistory, redo as redoOp, undo as undoOp, type CommitOptions, type History, type Op, type Site } from "@atelier/model";

export type SyncStatus = "saved" | "saving" | "conflict" | "error";

type Doc = { site: Site; history: History };

/**
 * Document en cours d'édition : état local immédiat (optimiste), historique d'annulation,
 * et envoi séquentiel des opérations au journal du serveur.
 * L'état de référence vit dans un ref pour que deux commits d'un même événement s'enchaînent
 * sans dépendre du rendu ; les fonctions ci-dessous ne sont appelées que depuis des gestionnaires d'événements.
 */
export function useDocument(initialSite: Site, initialVersion: number) {
  const initialDoc = useMemo<Doc>(() => ({ site: initialSite, history: createHistory() }), [initialSite]);
  const docRef = useRef<Doc>(initialDoc);
  const [doc, setDoc] = useState<Doc>(initialDoc);
  const [status, setStatus] = useState<SyncStatus>("saved");
  const [error, setError] = useState<string | undefined>();
  const [version, setVersion] = useState(initialVersion);
  const pending = useRef<Op[]>([]);
  const inflight = useRef(false);
  const versionRef = useRef(initialVersion);
  const blocked = useRef(false);

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
        blocked.current = true;
        setStatus("conflict");
        setError("Le site a été modifié ailleurs. Rechargez la page pour continuer.");
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string; issues?: string[] };
        blocked.current = true;
        setStatus("error");
        setError(`${body.error ?? `Erreur ${res.status}`}${body.issues?.length ? ` (${body.issues.join(" ; ")})` : ""}. Vos dernières modifications ne sont pas enregistrées : rechargez la page.`);
        return;
      }
      const body = (await res.json()) as { version: number };
      versionRef.current = body.version;
      setVersion(body.version);
      setError(undefined);
      setStatus(pending.current.length ? "saving" : "saved");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Erreur réseau");
    } finally {
      inflight.current = false;
      if (pending.current.length) void flush();
    }
  }

  function apply(next: Doc, applied: Op) {
    docRef.current = next;
    if (process.env.NODE_ENV !== "production") (globalThis as unknown as { __atelierDoc?: Doc }).__atelierDoc = next;
    setDoc(next);
    pending.current.push(applied);
    setStatus("saving");
    void flush();
  }

  function commit(op: Op, opts?: CommitOptions) {
    if (blocked.current) return;
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

  return { site: doc.site, history: doc.history, version, status, error, commit, undo, redo, canUndo: canUndo(doc.history), canRedo: canRedo(doc.history) };
}
