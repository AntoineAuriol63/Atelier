import type { DropPosition, Entry, Inline, Site } from "@atelier/model";

export type EditMode = "write" | "design" | "animate";

/** Ce que l'éditeur (parent) envoie à l'aperçu (iframe). Une seule origine : la nôtre. */
export type ToPreview =
  /** « Jouer » : rejoue une fois l'animation du déclencheur `trigger` porté par l'élément `id`. */
  | { type: "atelier:play"; id: string; trigger: string }
  /** Mode Animation : montre l'état à `time` ms de la ligne de temps du déclencheur `trigger` porté par l'élément `id` (pistes jouées en pause). */
  | { type: "atelier:scrub"; id: string; trigger: string; time: number }
  | { type: "atelier:scrub-stop" }
  /** Mode Animation : éléments de la piste active, à repérer d'un contour pointillé et de son nom (`ids` vide : aucun). */
  | { type: "atelier:anim-targets"; ids: string[]; label?: string }
  | { type: "atelier:site"; site: Site; containers: string[]; links: string[]; textNodes: string[]; compounds?: string[]; editMode: EditMode; blocks: BlockPresetInfo[]; pages: { path: string; name: string }[] }
  | { type: "atelier:entries"; entries: Entry[] }
  | { type: "atelier:mode"; mode: string }
  | { type: "atelier:editmode"; editMode: EditMode }
  | { type: "atelier:highlight"; id: string | null }
  | { type: "atelier:state"; id: string | null; state: string | null }
  | { type: "atelier:grid"; show: boolean; columns: number; gutter: string; margin: string; maxWidth: string }
  | { type: "atelier:zoom"; scale: number }
  | { type: "atelier:edit-text"; id: string; caret?: "start" | "end" | "all" };

/** Ce que l'aperçu renvoie à l'éditeur. */
export type FromPreview =
  | { type: "atelier:ready" }
  | { type: "atelier:select"; id: string | null }
  | { type: "atelier:move"; id: string; target: string; position: DropPosition }
  | { type: "atelier:drop-block"; preset: string; target: string; position: DropPosition }
  | { type: "atelier:key"; key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean }
  | { type: "atelier:text"; id: string; content: Inline[] }
  | { type: "atelier:split"; id: string; before: Inline[]; after: Inline[] }
  | { type: "atelier:merge-prev"; id: string }
  | { type: "atelier:slash"; id: string; preset: string; replace: boolean }
  | { type: "atelier:style-in-context"; id: string }
  | { type: "atelier:set-style"; id: string; prop: string; value: unknown }
  | { type: "atelier:set-tag"; id: string; tag: string }
  | { type: "atelier:remove"; id: string }
  | { type: "atelier:pick-image"; id: string };

export type BlockPresetInfo = { id: string; label: string; group: string; keywords?: string };

/** Un message est de chez nous s'il vient de notre origine et porte un type `atelier:`. */
export function isAtelierMessage(e: MessageEvent): boolean {
  return e.origin === window.location.origin && !!e.data && typeof e.data === "object" && typeof (e.data as { type?: unknown }).type === "string" && (e.data as { type: string }).type.startsWith("atelier:");
}
