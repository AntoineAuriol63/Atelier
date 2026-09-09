import type { Site } from "./types";

/** Version du modèle de document. Toute évolution l'incrémente et ajoute une étape ci-dessous. */
export const SCHEMA_VERSION = 1;

type Step = (doc: Record<string, unknown>) => Record<string, unknown>;
/** Étapes de migration, indexées par la version qu'elles font quitter (1 → 2, 2 → 3…). Aucune pour l'instant. */
const STEPS: Record<number, Step> = {};

/**
 * Point de passage obligé de toute lecture d'un document (dépôt, instantané publié) : ramène un document d'une
 * version antérieure à la version courante, refuse une version plus récente que le code.
 */
export function migrate(input: unknown): Site {
  if (!input || typeof input !== "object") throw new Error("Document illisible");
  let doc = input as Record<string, unknown>;
  let version = typeof doc.schemaVersion === "number" ? doc.schemaVersion : 1;
  if (version > SCHEMA_VERSION) throw new Error(`Document en version ${version}, plus récente que ce que ce code sait lire (${SCHEMA_VERSION}) : mettez l'application à jour`);
  while (version < SCHEMA_VERSION) {
    const step = STEPS[version];
    if (!step) throw new Error(`Aucune migration de la version ${version} vers ${version + 1}`);
    doc = { ...step(doc), schemaVersion: version + 1 };
    version += 1;
  }
  return doc as unknown as Site;
}
