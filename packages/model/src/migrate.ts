import type { Site } from "./types";
import { REVEAL_FROM, type RevealKind } from "./interactions";
import { presetById, runFromPreset } from "./animations";

/** Version du modèle de document. Toute évolution l'incrémente et ajoute une étape ci-dessous. */
export const SCHEMA_VERSION = 2;

type Step = (doc: Record<string, unknown>) => Record<string, unknown>;
type AnyNode = { style?: { base?: Record<string, unknown> }; interactions?: { id: string; trigger: { kind: string; options?: Record<string, unknown> }; actions: { kind: string; transition?: { duration?: number; delay?: number; easing?: string } }[] }[]; animations?: unknown[]; props?: Record<string, unknown>; children?: AnyNode[] };

/** 1 → 2 : les apparitions (interaction `inView` + état de départ dans le style) deviennent des animations ; `marquee: nombre` devient `{ duration }`. */
function toAnimations(n: AnyNode): void {
  const list = n.interactions ?? [];
  const reveal = list.find((i) => i.trigger.kind === "inView" && typeof i.trigger.options?.reveal === "string");
  if (reveal) {
    const kind = reveal.trigger.options!.reveal as RevealKind;
    const preset = presetById(kind);
    const tr = reveal.actions.find((a) => a.kind === "setStyle")?.transition;
    if (preset) {
      n.animations = [...(n.animations ?? []), runFromPreset(preset, { id: reveal.id, duration: tr?.duration ?? 700, delay: tr?.delay ?? 0, easing: tr?.easing ?? preset.easing, once: reveal.trigger.options?.once !== false })];
      if (n.style?.base) { for (const k of Object.keys(REVEAL_FROM[kind] ?? {})) delete n.style.base[k]; if (!Object.keys(n.style.base).length) delete n.style.base; }
    }
    const rest = list.filter((i) => i !== reveal);
    if (rest.length) n.interactions = rest; else delete n.interactions;
  }
  if (n.props && typeof n.props.marquee === "number") n.props.marquee = { duration: n.props.marquee };
  n.children?.forEach(toAnimations);
}

/** Étapes de migration, indexées par la version qu'elles font quitter (1 → 2, 2 → 3…). */
const STEPS: Record<number, Step> = {
  1: (doc) => {
    const d = structuredClone(doc) as Record<string, unknown> & { pages?: { root: AnyNode }[]; components?: { root: AnyNode }[] };
    d.pages?.forEach((p) => toAnimations(p.root));
    d.components?.forEach((c) => toAnimations(c.root));
    return d;
  },
};

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
