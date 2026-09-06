"use client";

import type { Node, Site } from "@atelier/model";
import { BASE, overridesByBreakpoint } from "@atelier/model";
import { Badge, Hint, Section } from "@/ui";
import { cx } from "@/ui/cx";

export function ResponsivePanel({ site, node, activeBp, onGoTo }: { site: Site; node: Node; activeBp: string; onGoTo: (bp: string) => void }) {
  const overrides = overridesByBreakpoint(site, node);
  const rows = [{ id: BASE, name: "Base", label: "au-delà de " + Math.max(...site.settings.breakpoints.map((b) => b.maxWidth)) + " px" }, ...[...site.settings.breakpoints].sort((a, b) => b.maxWidth - a.maxWidth).map((b) => ({ id: b.id, name: b.name, label: `jusqu'à ${b.maxWidth} px` }))];
  return (
    <Section title="Responsive" defaultOpen={false}>
      <ul className="flex flex-col gap-0.5">
        {rows.map((r) => {
          const props = overrides[r.id] ?? [];
          const active = r.id === activeBp;
          return (
            <li key={r.id}>
              <button type="button" onClick={() => onGoTo(r.id)} className={cx("w-full flex items-center gap-2 h-7 px-2 rounded-sm text-left text-xs", active ? "bg-accent-soft text-ink" : "hover:bg-hover text-ink")} title={props.length ? `Surcharges : ${props.join(", ")}` : "Aucune surcharge"}>
                <span className={cx("w-1.5 h-1.5 rounded-full", active ? "bg-accent" : "bg-line-strong")} />
                <span className="w-20 shrink-0">{r.name}</span>
                <span className="text-dim font-mono text-2xs flex-1 truncate">{r.label}</span>
                {props.length ? <Badge tone={active ? "accent" : "neutral"}>{props.length}</Badge> : null}
              </button>
            </li>
          );
        })}
      </ul>
      <Hint>Les réglages se posent sur le point actif, celui de la largeur d&apos;aperçu, et descendent vers les plus étroits. Cliquer un point règle l&apos;aperçu à sa largeur.</Hint>
    </Section>
  );
}
