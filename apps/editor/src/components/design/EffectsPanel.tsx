"use client";

import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { Hint, NumberInput, Section, Select, TextInput } from "@/ui";
import { PropRow, TokenSelect } from "@/ui/controls";
import type { StyleApi } from "./useStyle";
import { composeFilter, composeTransform, parseFilter, parseTransform } from "@/lib/effects-css";
import { ContinuousEffects } from "../animation/ContinuousEffects";

const EASINGS = [{ value: "ease", label: "Naturel" }, { value: "linear", label: "Linéaire" }, { value: "ease-in", label: "Entrée" }, { value: "ease-out", label: "Sortie" }, { value: "ease-in-out", label: "Entrée-sortie" }, { value: "cubic-bezier(.2,.8,.2,1)", label: "Doux" }];
const CURSORS = [{ value: "auto", label: "Auto" }, { value: "pointer", label: "Main" }, { value: "default", label: "Flèche" }, { value: "text", label: "Texte" }, { value: "move", label: "Déplacer" }, { value: "not-allowed", label: "Interdit" }, { value: "grab", label: "Saisir" }, { value: "zoom-in", label: "Zoom" }];

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }

function parseTransition(v: string | undefined): { prop: string; ms: number; easing: string } {
  const m = v?.match(/^([\w-]+)\s+([\d.]+)(ms|s)\s*([\w-]+(?:\([^)]*\))?)?$/);
  if (!m) return { prop: "all", ms: 200, easing: "ease" };
  return { prop: m[1]!, ms: m[3] === "s" ? Number(m[2]) * 1000 : Number(m[2]), easing: m[4] ?? "ease" };
}

export function EffectsPanel({ site, style, node, commit, defaultOpen = false }: { site: Site; style: StyleApi; node?: Node; commit?: (op: Op, opts?: CommitOptions) => void; defaultOpen?: boolean }) {
  // En mode image-clé, seules les propriétés qui s'animent restent : transformations et filtres (ni transition, ni curseur, ni parallaxe).
  const animating = !!style.keyframe;
  const s = style;
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide}>{children}</PropRow>
  );
  const tf = parseTransform(str(s.value("transform")));
  const setTf = (patch: Partial<typeof tf>) => s.set("transform", composeTransform({ ...tf, ...patch }, animating ? "none" : undefined));
  const tr = parseTransition(str(s.value("transition")));
  const hasTransition = s.value("transition") !== undefined;
  const setTr = (patch: Partial<typeof tr>) => { const n = { ...tr, ...patch }; s.set("transition", `${n.prop} ${n.ms}ms ${n.easing}`, false); };

  return (
    <Section title="Effets" defaultOpen={defaultOpen} hint={animating ? "Transformations (rotation, échelle, décalage) et filtres à cet instant de l'animation." : "Transformations (rotation, échelle, décalage), transitions, filtres et curseur."}>
      {tf.raw ? (
        row("transform", "Transform.", <div className="flex items-center gap-1 flex-1 min-w-0"><TextInput mono className="flex-1 min-w-0" value={str(s.value("transform")) ?? ""} onValueChange={(v) => s.set("transform", v || undefined)} /><TokenSelect site={site} onPick={(t) => s.set("transform", t)} /></div>)
      ) : (
        <>
          {row("transform", "Rotation", <NumberInput className="w-20" unit="°" step={5} value={tf.rotate} onValueChange={(n) => setTf({ rotate: n === "" ? 0 : n })} />)}
          {row("transform", "Échelle", <NumberInput className="w-20" step={0.05} min={0} value={tf.scale} onValueChange={(n) => setTf({ scale: n === "" ? 1 : n })} />)}
          {row("transform", "Décalage", <div className="flex gap-1 flex-1"><NumberInput className="flex-1" unit="x" value={tf.x} onValueChange={(n) => setTf({ x: n === "" ? 0 : n })} /><NumberInput className="flex-1" unit="y" value={tf.y} onValueChange={(n) => setTf({ y: n === "" ? 0 : n })} /></div>)}
        </>
      )}
      <div className="h-px bg-line my-1" />
      {animating ? null : row("transition", "Transition", (
        <div className="flex items-center gap-1 flex-1">
          <Select className="w-[84px]" value={hasTransition ? tr.prop : ""} placeholder="Aucune" options={[{ value: "all", label: "Tout" }, { value: "opacity", label: "Opacité" }, { value: "transform", label: "Transform." }, { value: "color", label: "Couleur" }, { value: "background-color", label: "Fond" }]} onValueChange={(v) => (v ? setTr({ prop: v }) : s.set("transition", undefined, false))} />
          {hasTransition ? <NumberInput className="w-[70px]" unit="ms" min={0} step={50} value={tr.ms} onValueChange={(n) => setTr({ ms: n === "" ? 200 : n })} /> : null}
          {hasTransition ? <Select className="flex-1" value={tr.easing} options={EASINGS} onValueChange={(v) => setTr({ easing: v })} /> : null}
        </div>
      ))}
      {(() => {
        const fl = parseFilter(str(s.value("filter")));
        const setFl = (patch: Partial<typeof fl>) => s.set("filter", composeFilter({ ...fl, ...patch }, animating ? "none" : undefined));
        if (fl.raw) return row("filter", "Filtre", <div className="flex items-center gap-1 flex-1 min-w-0"><TextInput mono className="flex-1 min-w-0" value={str(s.value("filter")) ?? ""} onValueChange={(v) => s.set("filter", v || undefined)} /><TokenSelect site={site} onPick={(t) => s.set("filter", t)} /></div>);
        return (
          <>
            {row("filter", "Flou", <NumberInput className="w-20" unit="px" min={0} step={1} value={fl.blur} onValueChange={(n) => setFl({ blur: n === "" ? 0 : n })} />)}
            {row("filter", "Luminosité", <NumberInput className="w-20" unit="%" min={0} max={300} step={5} value={fl.brightness} onValueChange={(n) => setFl({ brightness: n === "" ? 100 : n })} />)}
            {row("filter", "Contraste", <NumberInput className="w-20" unit="%" min={0} max={300} step={5} value={fl.contrast} onValueChange={(n) => setFl({ contrast: n === "" ? 100 : n })} />)}
            {row("filter", "Saturation", <NumberInput className="w-20" unit="%" min={0} max={300} step={5} value={fl.saturate} onValueChange={(n) => setFl({ saturate: n === "" ? 100 : n })} />)}
            {row("filter", "Noir et blanc", <NumberInput className="w-20" unit="%" min={0} max={100} step={10} value={fl.grayscale} onValueChange={(n) => setFl({ grayscale: n === "" ? 0 : n })} />)}
          </>
        );
      })()}
      {animating ? null : row("cursor", "Curseur", <Select className="flex-1" value={str(s.value("cursor")) ?? ""} placeholder="Auto" options={CURSORS} onValueChange={(v) => s.set("cursor", v || undefined, false)} />)}
      {animating ? null : <Hint>Pour animer un changement au survol (couleur, taille…), réglez une transition ici : elle s&apos;applique au passage d&apos;un état à l&apos;autre. Les apparitions et les animations se règlent dans la section Animations et dans l&apos;outil Animation.</Hint>}
      {node && commit && !animating ? (
        <>
          <div className="h-px bg-line my-1" />
          <ContinuousEffects node={node} commit={commit} only={["parallax", "marquee"]} />
        </>
      ) : null}
    </Section>
  );
}