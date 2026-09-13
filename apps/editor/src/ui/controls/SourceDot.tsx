"use client";

import type { StyleSource } from "@atelier/model";
import { cx } from "../cx";
import { Tooltip } from "../Tooltip";

export const SOURCE_COLOR: Record<StyleSource["kind"], string> = { local: "bg-accent", inherited: "bg-warning", shared: "bg-violet-400", default: "bg-line-strong", keyframe: "bg-accent", rest: "bg-line-strong" };

export function sourceLabel(source: StyleSource | undefined, bpName: (id: string) => string, styleName: (id: string) => string, stateLabel: Record<string, string> = {}): string {
  if (!source) return "Non défini";
  switch (source.kind) {
    case "local": return "Posé ici. Cliquer pour réinitialiser.";
    case "inherited":
      if (source.fromState === null) return `Hérité de l'état normal (${bpName(source.breakpoint)})`;
      return `Hérité de ${bpName(source.breakpoint)}${source.fromState ? ` · ${stateLabel[source.fromState] ?? source.fromState}` : ""}`;
    case "shared": return `Vient du style partagé « ${styleName(source.style)} »${source.breakpoint !== "base" ? ` (${bpName(source.breakpoint)})` : ""}${source.state ? ` · ${stateLabel[source.state] ?? source.state}` : ""}`;
    case "default": return `Valeur par défaut du thème pour ${source.from}`;
    case "keyframe": return source.exact ? `Image-clé à ${source.at} ms. Cliquer pour retirer la propriété de l'image-clé.` : `Tenu depuis l'image-clé à ${source.at} ms : régler la valeur pose une image-clé ici.`;
    case "rest": return `État de repos (${sourceLabel(source.of, bpName, styleName, stateLabel).replace(/\. Cliquer pour réinitialiser\.$/, "")}) : régler la valeur pose une image-clé ici.`;
  }
}

/** Glyphe par origine, lisible sans la couleur : ● posé ici · ◐ hérité · ◆ style partagé · ○ défaut ; en mode image-clé : ◆ image-clé · ◇ tenu depuis une image-clé · ○ repos. */
export const SOURCE_GLYPH: Record<StyleSource["kind"], string> = { local: "●", inherited: "◐", shared: "◆", default: "○", keyframe: "◆", rest: "○" };
const SOURCE_TEXT_COLOR: Record<StyleSource["kind"], string> = { local: "text-accent", inherited: "text-warning", shared: "text-violet-300", default: "text-dim", keyframe: "text-accent", rest: "text-dim" };

/** Pastille d'origine d'une valeur : forme et couleur (● posé ici · ◐ hérité · ◆ style partagé · ○ défaut). Toujours focalisable pour lire l'explication ; cliquable seulement quand la valeur est posée ici (ou sur l'image-clé ouverte). */
export function SourceDot({ source, title, onReset }: { source: StyleSource | undefined; title: string; onReset?: () => void }) {
  const kind = source?.kind;
  const local = kind === "local" || (source?.kind === "keyframe" && source.exact);
  return (
    <Tooltip text={title} side="left">
    <button
      type="button"
      aria-label={title}
      aria-disabled={!local || undefined}
      onClick={local ? onReset : undefined}
      className={cx("w-5 h-5 -ml-1 shrink-0 inline-flex items-center justify-center rounded-full text-[11px] leading-none", local ? "cursor-pointer hover:ring-2 hover:ring-accent/40" : "cursor-default", kind ? SOURCE_TEXT_COLOR[kind] : "text-dim")}
    >
      <span aria-hidden>{source?.kind === "keyframe" && !source.exact ? "◇" : kind ? SOURCE_GLYPH[kind] : "○"}</span>
    </button>
    </Tooltip>
  );
}
