import type { PublicationMeta, SnapshotMeta } from "@/lib/store/types";

export type HistoryRow = { version: number; kind: "publish" | "checkpoint"; createdAt: string; label?: string; title: string; live: boolean };

/**
 * L'historique lisible (23 septembre 2026) : les publications et les points de reprise dans une même liste, du plus récent au plus
 * ancien. Le numéro de version reste la clé technique ; ce qu'on lit, c'est la sorte, la date et la note.
 */
export function historyRows(publications: PublicationMeta[], checkpoints: Pick<SnapshotMeta, "version" | "createdAt">[], publishedVersion: number | null): HistoryRow[] {
  const rows = new Map<number, HistoryRow>();
  for (const c of checkpoints) rows.set(c.version, { version: c.version, kind: "checkpoint", createdAt: c.createdAt, title: "Point de reprise", live: false });
  // Une publication de même version prime : c'est le même document, mais elle a été voulue.
  for (const p of publications) rows.set(p.version, { version: p.version, kind: "publish", createdAt: p.createdAt, label: p.label, title: p.label ? `Publication · ${p.label}` : "Publication", live: p.version === publishedVersion });
  return [...rows.values()].sort((a, b) => b.version - a.version);
}

const STATUS_LABEL: Record<string, string> = { saved: "Enregistré", saving: "Enregistrement…", offline: "Hors ligne", conflict: "Conflit", error: "Erreur" };

/** Le badge d'enregistrement : l'heure du dernier envoi réussi plutôt qu'un compteur de versions. */
export function savedLabel(status: string, savedAt: number | null, now = Date.now()): string {
  void now;
  const base = STATUS_LABEL[status] ?? status;
  if (status !== "saved" || !savedAt) return base;
  return `${base} à ${new Date(savedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}
