"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Node, Site, StyleValue } from "@atelier/model";
import { BASE, overridesByBreakpoint } from "@atelier/model";
import { Badge, Hint, Section } from "@/ui";
import { cx } from "@/ui/cx";

function show(v: StyleValue | undefined): string {
  if (v === undefined) return "";
  if (typeof v === "object" && v && "token" in v) return `◇ ${v.token.split(".").pop()}`;
  return typeof v === "string" ? v : String(v);
}

export function ResponsivePanel({ site, node, activeBp, onGoTo, onReveal }: { site: Site; node: Node; activeBp: string; onGoTo: (bp: string) => void; onReveal: (bp: string, prop: string) => void }) {
  const overrides = overridesByBreakpoint(site, node);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const rows = [{ id: BASE, name: "Base", label: "au-delà de " + Math.max(...site.settings.breakpoints.map((b) => b.maxWidth)) + " px" }, ...[...site.settings.breakpoints].sort((a, b) => b.maxWidth - a.maxWidth).map((b) => ({ id: b.id, name: b.name, label: `jusqu'à ${b.maxWidth} px` }))];
  const valueAt = (bp: string, prop: string) => (bp === BASE ? node.style?.base?.[prop] : node.style?.breakpoints?.[bp]?.[prop]);
  return (
    <Section title="Responsive" defaultOpen={false} hint="Ce qui est réglé sur cet élément pour chaque taille d'écran. Un réglage posé sur une taille vaut aussi pour les tailles plus petites, sauf si elles le redéfinissent.">
      <ul className="flex flex-col gap-0.5">
        {rows.map((r) => {
          const props = overrides[r.id] ?? [];
          const active = r.id === activeBp;
          const isOpen = open[r.id] ?? false;
          return (
            <li key={r.id}>
              <div className={cx("flex items-center gap-1 h-7 pr-1 rounded-sm text-xs", active ? "bg-accent-soft text-ink" : "text-ink hover:bg-hover")}>
                <button type="button" onClick={() => setOpen((o) => ({ ...o, [r.id]: !isOpen }))} className={cx("w-5 h-5 inline-flex items-center justify-center text-dim", !props.length && "invisible")} aria-label={isOpen ? "Replier" : "Voir les réglages"}>
                  <ChevronRight size={11} className={cx("transition-transform", isOpen && "rotate-90")} />
                </button>
                <button type="button" onClick={() => onGoTo(r.id)} className="flex-1 flex items-center gap-2 text-left h-full" title="Régler l'aperçu à cette taille">
                  <span className={cx("w-1.5 h-1.5 rounded-full", active ? "bg-accent" : "bg-line-strong")} />
                  <span className="w-20 shrink-0">{r.name}</span>
                  <span className="text-dim font-mono text-2xs flex-1 truncate">{r.label}</span>
                </button>
                {props.length ? <Badge tone={active ? "accent" : "neutral"}>{props.length}</Badge> : <span className="text-2xs text-dim pr-1">—</span>}
              </div>
              {isOpen && props.length ? (
                <ul className="pl-7 pr-1 py-1 flex flex-col gap-0.5">
                  {props.map((p) => (
                    <li key={p}>
                      <button type="button" onClick={() => onReveal(r.id, p)} className="w-full flex items-center gap-2 h-6 px-1.5 rounded-xs text-2xs hover:bg-hover text-left" title="Aller à ce réglage">
                        <span className="font-mono text-muted flex-1 truncate">{p}</span>
                        <span className="font-mono text-ink truncate max-w-[45%]">{show(valueAt(r.id, p))}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
      <Hint>Cliquer une taille règle l&apos;aperçu dessus ; déplier une taille liste ses réglages, cliquer l&apos;un d&apos;eux y mène.</Hint>
    </Section>
  );
}
