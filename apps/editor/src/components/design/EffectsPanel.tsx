"use client";

import type { CommitOptions, Node, Op, Site } from "@atelier/model";
import { Hint, NumberInput, Section, Select, TextInput } from "@/ui";
import { PropRow } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

const EASINGS = [{ value: "ease", label: "Naturel" }, { value: "linear", label: "Linéaire" }, { value: "ease-in", label: "Entrée" }, { value: "ease-out", label: "Sortie" }, { value: "ease-in-out", label: "Entrée-sortie" }, { value: "cubic-bezier(.2,.8,.2,1)", label: "Doux" }];
const CURSORS = [{ value: "auto", label: "Auto" }, { value: "pointer", label: "Main" }, { value: "default", label: "Flèche" }, { value: "text", label: "Texte" }, { value: "move", label: "Déplacer" }, { value: "not-allowed", label: "Interdit" }, { value: "grab", label: "Saisir" }, { value: "zoom-in", label: "Zoom" }];

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }

/** Décompose une transformation simple (rotate/scale/translate) ; sinon, on édite le texte brut. */
function parseTransform(v: string | undefined): { rotate: number; scale: number; x: number; y: number; raw: boolean } {
  const out = { rotate: 0, scale: 1, x: 0, y: 0, raw: false };
  if (!v || v === "none") return out;
  let rest = v;
  const take = (re: RegExp, fn: (m: RegExpMatchArray) => void) => { const m = rest.match(re); if (m) { fn(m); rest = rest.replace(m[0], ""); } };
  take(/rotate\((-?[\d.]+)deg\)/, (m) => { out.rotate = Number(m[1]); });
  take(/scale\((-?[\d.]+)\)/, (m) => { out.scale = Number(m[1]); });
  take(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/, (m) => { out.x = Number(m[1]); out.y = Number(m[2]); });
  if (rest.trim()) out.raw = true;
  return out;
}
function composeTransform(t: { rotate: number; scale: number; x: number; y: number }): string | undefined {
  const parts: string[] = [];
  if (t.x || t.y) parts.push(`translate(${t.x}px, ${t.y}px)`);
  if (t.rotate) parts.push(`rotate(${t.rotate}deg)`);
  if (t.scale !== 1) parts.push(`scale(${t.scale})`);
  return parts.length ? parts.join(" ") : undefined;
}
type Filter = { blur: number; brightness: number; contrast: number; saturate: number; grayscale: number; raw: boolean };
function parseFilter(v: string | undefined): Filter {
  const out: Filter = { blur: 0, brightness: 100, contrast: 100, saturate: 100, grayscale: 0, raw: false };
  if (!v || v === "none") return out;
  let rest = v;
  const take = (re: RegExp, fn: (m: RegExpMatchArray) => void) => { const m = rest.match(re); if (m) { fn(m); rest = rest.replace(m[0], ""); } };
  take(/blur\((\d*\.?\d+)px\)/, (m) => { out.blur = Number(m[1]); });
  take(/brightness\((\d*\.?\d+)%\)/, (m) => { out.brightness = Number(m[1]); });
  take(/contrast\((\d*\.?\d+)%\)/, (m) => { out.contrast = Number(m[1]); });
  take(/saturate\((\d*\.?\d+)%\)/, (m) => { out.saturate = Number(m[1]); });
  take(/grayscale\((\d*\.?\d+)%\)/, (m) => { out.grayscale = Number(m[1]); });
  if (rest.trim()) out.raw = true;
  return out;
}
function composeFilter(f: Filter): string | undefined {
  const parts: string[] = [];
  if (f.blur) parts.push(`blur(${f.blur}px)`);
  if (f.brightness !== 100) parts.push(`brightness(${f.brightness}%)`);
  if (f.contrast !== 100) parts.push(`contrast(${f.contrast}%)`);
  if (f.saturate !== 100) parts.push(`saturate(${f.saturate}%)`);
  if (f.grayscale) parts.push(`grayscale(${f.grayscale}%)`);
  return parts.length ? parts.join(" ") : undefined;
}
function parseTransition(v: string | undefined): { prop: string; ms: number; easing: string } {
  const m = v?.match(/^([\w-]+)\s+([\d.]+)(ms|s)\s*([\w-]+(?:\([^)]*\))?)?$/);
  if (!m) return { prop: "all", ms: 200, easing: "ease" };
  return { prop: m[1]!, ms: m[3] === "s" ? Number(m[2]) * 1000 : Number(m[2]), easing: m[4] ?? "ease" };
}

export function EffectsPanel({ style, node, commit }: { site: Site; style: StyleApi; node?: Node; commit?: (op: Op, opts?: CommitOptions) => void }) {
  const s = style;
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide}>{children}</PropRow>
  );
  const tf = parseTransform(str(s.value("transform")));
  const setTf = (patch: Partial<typeof tf>) => s.set("transform", composeTransform({ ...tf, ...patch }));
  const tr = parseTransition(str(s.value("transition")));
  const hasTransition = s.value("transition") !== undefined;
  const setTr = (patch: Partial<typeof tr>) => { const n = { ...tr, ...patch }; s.set("transition", `${n.prop} ${n.ms}ms ${n.easing}`, false); };

  return (
    <Section title="Effets" defaultOpen={false} hint="Transformations (rotation, échelle, décalage), transitions, filtres et curseur.">
      {tf.raw ? (
        row("transform", "Transform.", <TextInput mono className="flex-1" value={str(s.value("transform")) ?? ""} onValueChange={(v) => s.set("transform", v || undefined)} />)
      ) : (
        <>
          {row("transform", "Rotation", <NumberInput className="w-20" unit="°" step={5} value={tf.rotate} onValueChange={(n) => setTf({ rotate: n === "" ? 0 : n })} />)}
          {row("transform", "Échelle", <NumberInput className="w-20" step={0.05} min={0} value={tf.scale} onValueChange={(n) => setTf({ scale: n === "" ? 1 : n })} />)}
          {row("transform", "Décalage", <div className="flex gap-1 flex-1"><NumberInput className="flex-1" unit="x" value={tf.x} onValueChange={(n) => setTf({ x: n === "" ? 0 : n })} /><NumberInput className="flex-1" unit="y" value={tf.y} onValueChange={(n) => setTf({ y: n === "" ? 0 : n })} /></div>)}
        </>
      )}
      <div className="h-px bg-line my-1" />
      {row("transition", "Transition", (
        <div className="flex items-center gap-1 flex-1">
          <Select className="w-[84px]" value={hasTransition ? tr.prop : ""} placeholder="Aucune" options={[{ value: "all", label: "Tout" }, { value: "opacity", label: "Opacité" }, { value: "transform", label: "Transform." }, { value: "color", label: "Couleur" }, { value: "background-color", label: "Fond" }]} onValueChange={(v) => (v ? setTr({ prop: v }) : s.set("transition", undefined, false))} />
          {hasTransition ? <NumberInput className="w-[70px]" unit="ms" min={0} step={50} value={tr.ms} onValueChange={(n) => setTr({ ms: n === "" ? 200 : n })} /> : null}
          {hasTransition ? <Select className="flex-1" value={tr.easing} options={EASINGS} onValueChange={(v) => setTr({ easing: v })} /> : null}
        </div>
      ))}
      {(() => {
        const fl = parseFilter(str(s.value("filter")));
        const setFl = (patch: Partial<typeof fl>) => s.set("filter", composeFilter({ ...fl, ...patch }));
        if (fl.raw) return row("filter", "Filtre", <TextInput mono className="flex-1" value={str(s.value("filter")) ?? ""} onValueChange={(v) => s.set("filter", v || undefined)} />);
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
      {row("cursor", "Curseur", <Select className="flex-1" value={str(s.value("cursor")) ?? ""} placeholder="Auto" options={CURSORS} onValueChange={(v) => s.set("cursor", v || undefined, false)} />)}
      <Hint>Pour animer un changement au survol (couleur, taille…), réglez une transition ici : elle s&apos;applique au passage d&apos;un état à l&apos;autre. Les apparitions au défilement se règlent dans « Interactions ».</Hint>
      {node && commit ? (
        <>
          <div className="h-px bg-line my-1" />
          <PropRow label="Parallaxe" sourceTitle="Propriété de l'élément (props.parallax)" source={typeof node.props.parallax === "number" ? { kind: "local" } : undefined} onReset={typeof node.props.parallax === "number" ? () => commit({ op: "node.set", id: node.id, path: "props.parallax", value: undefined }, { label: "Parallaxe" }) : undefined}><NumberInput className="w-24" step={0.05} min={-1} max={1} value={typeof node.props.parallax === "number" ? node.props.parallax : ""} placeholder="aucune" onValueChange={(n) => commit({ op: "node.set", id: node.id, path: "props.parallax", value: n === "" || n === 0 ? undefined : n }, { coalesceKey: `parallax:${node.id}`, label: "Parallaxe" })} /></PropRow>
          {node.type === "box" ? <PropRow label="Bandeau" sourceTitle="Propriété de l'élément (props.marquee)" source={typeof node.props.marquee === "number" ? { kind: "local" } : undefined} onReset={typeof node.props.marquee === "number" ? () => commit({ op: "node.set", id: node.id, path: "props.marquee", value: undefined }, { label: "Bandeau défilant" }) : undefined}><NumberInput className="w-24" unit="s" step={1} min={2} value={typeof node.props.marquee === "number" ? node.props.marquee : ""} placeholder="non" onValueChange={(n) => commit({ op: "node.set", id: node.id, path: "props.marquee", value: n === "" || n === 0 ? undefined : n }, { coalesceKey: `marquee:${node.id}`, label: "Bandeau défilant" })} /></PropRow> : null}
          <Hint>Parallaxe : l&apos;élément se déplace moins vite (0,1 léger, 0,3 marqué) ou plus vite (négatif) que la page au défilement. Bandeau : le contenu de la boîte défile en continu vers la gauche, en N secondes par tour, et s&apos;arrête au survol. Les deux se jouent sur le site publié et dans l&apos;aperçu « Voir », pas dans l&apos;éditeur.</Hint>
        </>
      ) : null}
    </Section>
  );
}