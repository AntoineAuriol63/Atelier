import type { Animation, Site, StyleProps, Track, TrackTarget, Trigger } from "./types";
import { REVEAL_FROM, REVEAL_LABEL, type RevealKind } from "./interactions";
import { presetById } from "./animations";

/** Version du modèle de document. Toute évolution l'incrémente et ajoute une étape ci-dessous. */
export const SCHEMA_VERSION = 3;

type Step = (doc: Record<string, unknown>) => Record<string, unknown>;
/** Forme des animations de la version 2 (« runs » sur le nœud), lue par la migration 2 → 3. */
type LegacyKeyframe = { at: number; style: StyleProps };
type LegacyRun = { id: string; animation: string | { keyframes: LegacyKeyframe[] }; preset?: string; trigger: "load" | "inView" | "hover" | "click" | "scroll"; duration: number; delay?: number; easing?: string; iterations?: number | "infinite"; direction?: string; once?: boolean; pauseOnHover?: boolean; range?: [number, number]; target?: { self?: true; children?: true; node?: string; selector?: string }; split?: "words" | "letters"; stagger?: { each: number; from?: "start" | "end" | "center" }; reverseOnLeave?: boolean; toggle?: boolean };
type LegacyDef = { id: string; name: string; keyframes: LegacyKeyframe[] };
type AnyNode = { style?: { base?: Record<string, unknown> }; interactions?: { id: string; trigger: { kind: string; options?: Record<string, unknown> }; actions: { kind: string; transition?: { duration?: number; delay?: number; easing?: string } }[] }[]; animations?: LegacyRun[]; triggers?: Trigger[]; props?: Record<string, unknown>; children?: AnyNode[] };
const REST: StyleProps = { opacity: "1", transform: "none", filter: "none" };

/** 1 → 2 : les apparitions (interaction `inView` + état de départ dans le style) deviennent des runs ; `marquee: nombre` devient `{ duration }`. */
function toRuns(n: AnyNode): void {
  const list = n.interactions ?? [];
  const reveal = list.find((i) => i.trigger.kind === "inView" && typeof i.trigger.options?.reveal === "string");
  if (reveal) {
    const kind = reveal.trigger.options!.reveal as RevealKind;
    const from = REVEAL_FROM[kind];
    const tr = reveal.actions.find((a) => a.kind === "setStyle")?.transition;
    if (from) {
      n.animations = [...(n.animations ?? []), { id: reveal.id, animation: { keyframes: [{ at: 0, style: from }, { at: 100, style: REST }] }, preset: kind, trigger: "inView", duration: tr?.duration ?? 700, delay: tr?.delay ?? 0, easing: tr?.easing ?? "cubic-bezier(.22,1,.36,1)", once: reveal.trigger.options?.once !== false }];
      if (n.style?.base) { for (const k of Object.keys(from)) delete n.style.base[k]; if (!Object.keys(n.style.base).length) delete n.style.base; }
    }
    const rest = list.filter((i) => i !== reveal);
    if (rest.length) n.interactions = rest; else delete n.interactions;
  }
  if (n.props && typeof n.props.marquee === "number") n.props.marquee = { duration: n.props.marquee };
  n.children?.forEach(toRuns);
}

/** 2 → 3 : chaque run devient une animation du site (ligne de temps en ms) et un déclencheur sur le nœud. */
function toTriggers(n: AnyNode, defs: LegacyDef[], out: Animation[], counter: { n: number }): void {
  for (const run of n.animations ?? []) {
    const def = typeof run.animation === "string" ? defs.find((d) => d.id === run.animation) : undefined;
    const kfs = typeof run.animation === "string" ? (def?.keyframes ?? []) : run.animation.keyframes;
    const target: TrackTarget = run.split ? { trigger: true, split: run.split } : run.target?.children ? { trigger: true, children: true } : run.target?.node ? { node: run.target.node } : run.target?.selector ? { selector: run.target.selector } : { trigger: true };
    const track: Track = { id: `tk_${run.id}`, target, ...(run.stagger ? { stagger: run.stagger } : {}), keyframes: kfs.map((k, i) => ({ at: Math.round((k.at / 100) * run.duration), style: structuredClone(k.style), ...(i && run.easing ? { easing: run.easing } : {}) })) };
    counter.n += 1;
    const name = def?.name ?? presetById(run.preset)?.label ?? (run.preset && run.preset in REVEAL_LABEL ? REVEAL_LABEL[run.preset as RevealKind] : undefined) ?? `Animation ${counter.n}`;
    // Un élément copié en version 2 gardait l'identifiant de son run : chaque animation reçoit un identifiant libre.
    let id = `an_${run.id}`;
    for (let k = 2; out.some((a) => a.id === id); k++) id = `an_${run.id}_${k}`;
    const animation: Animation = { id, name, duration: run.duration, tracks: [track], ...(run.preset ? { preset: run.preset } : {}), ...(run.iterations && run.iterations !== 1 ? { loop: run.iterations } : {}), ...(run.direction?.startsWith("alternate") ? { alternate: true } : {}) };
    out.push(animation);
    const trigger: Trigger = { id: run.id, on: run.trigger, animation: animation.id, ...(run.delay ? { delay: run.delay } : {}), ...(run.once === false ? { once: false } : {}), ...(run.reverseOnLeave ? { reverseOnLeave: true } : {}), ...(run.toggle ? { toggle: true } : {}), ...(run.range ? { range: run.range } : {}), ...(run.pauseOnHover ? { pauseOnHover: true } : {}) };
    n.triggers = [...(n.triggers ?? []), trigger];
  }
  delete n.animations;
  n.children?.forEach((c) => toTriggers(c, defs, out, counter));
}

/** Étapes de migration, indexées par la version qu'elles font quitter (1 → 2, 2 → 3…). */
const STEPS: Record<number, Step> = {
  1: (doc) => {
    const d = structuredClone(doc) as Record<string, unknown> & { pages?: { root: AnyNode }[]; components?: { root: AnyNode }[] };
    d.pages?.forEach((p) => toRuns(p.root));
    d.components?.forEach((c) => toRuns(c.root));
    return d;
  },
  2: (doc) => {
    const d = structuredClone(doc) as Record<string, unknown> & { pages?: { root: AnyNode }[]; components?: { root: AnyNode }[]; animations?: unknown[] };
    const defs = (d.animations ?? []) as LegacyDef[];
    const out: Animation[] = [];
    const counter = { n: 0 };
    d.pages?.forEach((p) => toTriggers(p.root, defs, out, counter));
    d.components?.forEach((c) => toTriggers(c.root, defs, out, counter));
    d.animations = out;
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
  return repairAnimations(doc as unknown as Site);
}

/**
 * Réparation à la lecture (sans changer de version) : des animations de même identifiant (documents convertis avant le 16 septembre 2026,
 * après copie d'un élément). Des doubles identiques n'en gardent qu'un ; des doubles différents sont renommés, les déclencheurs restant
 * sur le premier (on ne peut pas savoir lequel ils visaient). Rien à réparer : le document est rendu tel quel.
 */
export function repairAnimations(site: Site): Site {
  const list = site.animations;
  if (!Array.isArray(list) || new Set(list.map((a) => a.id)).size === list.length) return site;
  const seen = new Map<string, Animation>();
  const out: Animation[] = [];
  const taken = new Set(list.map((a) => a.id));
  for (const a of list) {
    const first = seen.get(a.id);
    if (!first) { seen.set(a.id, a); out.push(a); continue; }
    if (JSON.stringify(first) === JSON.stringify(a)) continue;
    let id = `${a.id}_2`;
    for (let k = 3; taken.has(id); k++) id = `${a.id}_${k}`;
    taken.add(id);
    out.push({ ...a, id });
  }
  return { ...site, animations: out };
}
