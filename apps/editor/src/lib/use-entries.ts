"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Entry } from "@atelier/model";

/**
 * Entrées des bases du site côté éditeur : état optimiste, envois en série (`PUT` / `DELETE /api/sites/:id/entries`).
 * Hors du journal du document : pas d'annulation (v0). Une erreur serveur est signalée par `onError`, l'état local reste.
 */
export function useEntries(siteId: string, initial: Entry[], onError?: (message: string) => void) {
  const [entries, setEntries] = useState<Entry[]>(initial);
  const [pending, setPending] = useState(0);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const errorRef = useRef(onError);
  useEffect(() => { errorRef.current = onError; }, [onError]);
  const run = useCallback((task: () => Promise<void>) => {
    setPending((n) => n + 1);
    queue.current = queue.current.then(task).catch((e: unknown) => errorRef.current?.(e instanceof Error ? e.message : "Enregistrement impossible")).finally(() => setPending((n) => n - 1));
  }, []);
  const call = useCallback(async (method: "PUT" | "DELETE", body: unknown) => {
    const res = await fetch(`/api/sites/${siteId}/entries`, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) { const b = (await res.json().catch(() => ({}))) as { error?: string; issues?: string[] }; throw new Error([b.error ?? `Erreur ${res.status}`, ...(b.issues ?? [])].join(" · ")); }
  }, [siteId]);
  /** Ajoute ou remplace une entrée ; `updatedAt` est posé ici. */
  const save = useCallback((e: Entry) => {
    const next: Entry = { ...e, updatedAt: new Date().toISOString() };
    setEntries((list) => (list.some((x) => x.id === next.id) ? list.map((x) => (x.id === next.id ? next : x)) : [...list, next]));
    run(() => call("PUT", { entries: [next] }));
  }, [run, call]);
  const remove = useCallback((id: string) => {
    setEntries((list) => list.filter((x) => x.id !== id));
    run(() => call("DELETE", { ids: [id] }));
  }, [run, call]);
  return { entries, save, remove, saving: pending > 0 };
}
