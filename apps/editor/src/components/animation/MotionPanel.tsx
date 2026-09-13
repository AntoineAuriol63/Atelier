"use client";

import type { Site } from "@atelier/model";
import { Hint, NumberInput, Section, TextInput } from "@/ui";
import { PropRow } from "@/ui/controls";
import { composeFilter, composeTransform, parseFilter, parseTransform } from "@/lib/effects-css";
import type { StyleApi } from "../design";

const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);

/**
 * Mouvement (mode Animation, audit n°4 · E4) : en tête des réglages d'une image-clé, les propriétés qu'on anime presque toujours,
 * opacité, décalage, échelle, rotation et flou, avant les panneaux Design complets. Même interface de style que ces panneaux
 * (mode image-clé : lecture à l'instant, écriture dans l'image-clé, retour au neutre écrit « none »).
 */
export function MotionPanel({ style }: { site: Site; style: StyleApi }) {
  const s = style;
  const row = (prop: string, label: string, children: React.ReactNode, onScrub?: (d: number, big: boolean) => void) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={onScrub}>{children}</PropRow>
  );
  const opacityRaw = str(s.value("opacity"));
  const opacity = opacityRaw !== undefined && Number.isFinite(Number(opacityRaw)) ? Math.round(Number(opacityRaw) * 100) : "";
  const tf = parseTransform(str(s.value("transform")));
  const setTf = (patch: Partial<typeof tf>) => s.set("transform", composeTransform({ ...tf, ...patch }, "none"));
  const fl = parseFilter(str(s.value("filter")));
  return (
    <Section title="Mouvement" hint="Les propriétés qu'on anime le plus, à cet instant de l'animation. Tout le reste est dans les sections suivantes.">
      {row("opacity", "Opacité", (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <input type="range" min={0} max={100} value={opacity === "" ? 100 : opacity} aria-label="Opacité" className="flex-1 min-w-0 accent-[var(--color-accent)]" onChange={(e) => s.set("opacity", String(Number(e.target.value) / 100))} />
          <NumberInput className="w-[68px]" unit="%" min={0} max={100} value={opacity} placeholder="100" onValueChange={(n) => s.set("opacity", n === "" ? undefined : String(n / 100))} />
        </div>
      ))}
      {tf.raw ? (
        row("transform", "Transform.", <TextInput mono className="flex-1 min-w-0" aria-label="Transformation" value={str(s.value("transform")) ?? ""} onValueChange={(v) => s.set("transform", v || undefined)} />)
      ) : (
        <>
          {row("transform", "Décalage", <div className="flex gap-1 flex-1"><NumberInput className="flex-1" unit="x" value={tf.x} title="Décalage horizontal (px)" onValueChange={(n) => setTf({ x: n === "" ? 0 : n })} /><NumberInput className="flex-1" unit="y" value={tf.y} title="Décalage vertical (px)" onValueChange={(n) => setTf({ y: n === "" ? 0 : n })} /></div>)}
          {row("transform", "Échelle", <NumberInput className="w-20" step={0.05} min={0} value={tf.scale} onValueChange={(n) => setTf({ scale: n === "" ? 1 : n })} />)}
          {row("transform", "Rotation", <NumberInput className="w-20" unit="°" step={5} value={tf.rotate} onValueChange={(n) => setTf({ rotate: n === "" ? 0 : n })} />)}
        </>
      )}
      {fl.raw
        ? row("filter", "Filtre", <TextInput mono className="flex-1 min-w-0" aria-label="Filtre" value={str(s.value("filter")) ?? ""} onValueChange={(v) => s.set("filter", v || undefined)} />)
        : row("filter", "Flou", <NumberInput className="w-20" unit="px" min={0} step={1} value={fl.blur} onValueChange={(n) => s.set("filter", composeFilter({ ...fl, blur: n === "" ? 0 : n }, "none"))} />)}
      <Hint>Les autres filtres (luminosité, contraste…) sont dans Effets, les couleurs et bordures dans Apparence.</Hint>
    </Section>
  );
}
