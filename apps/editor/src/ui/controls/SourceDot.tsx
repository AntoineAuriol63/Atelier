"use client";

import type { StyleSource } from "@atelier/model";
import { cx } from "../cx";
import { Tooltip } from "../Tooltip";

export const SOURCE_COLOR: Record<StyleSource["kind"], string> = { local: "bg-accent", inherited: "bg-warning", shared: "bg-violet-400", default: "bg-line-strong" };

export function sourceLabel(source: StyleSource | undefined, bpName: (id: string) => string, styleName: (id: string) => string, stateLabel: Record<string, string> = {}): string {
  if (!source) return "Non défini";
  switch (source.kind) {
    case "local": return "Posé ici. Cliquer pour réinitialiser.";
    case "inherited":
      if (source.fromState === null) return `Hérité de l'état normal (${bpName(source.breakpoint)})`;
      return `Hérité de ${bpName(source.breakpoint)}${source.fromState ? ` · ${stateLabel[source.fromState] ?? source.fromState}` : ""}`;
    case "shared": return `Vient du style partagé « ${styleName(source.style)} »${source.breakpoint !== "base" ? ` (${bpName(source.breakpoint)})` : ""}${source.state ? ` · ${stateLabel[source.state] ?? source.state}` : ""}`;
    case "default": return `Valeur par défaut du thème pour ${source.from}`;
  }
}

/** Pastille d'origine d'une valeur : bleu posé ici · ambre hérité · violet style partagé · gris défaut. */
export function SourceDot({ source, title, onReset }: { source: StyleSource | undefined; title: string; onReset?: () => void }) {
  const kind = source?.kind;
  const local = kind === "local";
  return (
    <Tooltip text={title} side="left">
    <button
      type="button"
      aria-label={title}
      disabled={!local}
      onClick={local ? onReset : undefined}
      className={cx("w-3 h-3 shrink-0 inline-flex items-center justify-center rounded-full", local ? "cursor-pointer hover:ring-2 hover:ring-accent/40" : "cursor-default")}
    >
      <span className={cx("block rounded-full", kind ? "w-1.5 h-1.5" : "w-1.5 h-1.5 border border-line-strong", kind && SOURCE_COLOR[kind])} />
    </button>
    </Tooltip>
  );
}
