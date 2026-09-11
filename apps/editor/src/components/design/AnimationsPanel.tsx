"use client";

import { useState } from "react";
import { BookmarkPlus, Play, Plus, Sparkles, Unlink2, X } from "lucide-react";
import type { AnimationRun, CommitOptions, Keyframe, Node, Op, Site, StyleProps } from "@atelier/model";
import { ANIMATION_PRESETS, ANIM_EASINGS, DIRECTION_LABELS, FILL_LABELS, SPLIT_LABELS, STAGGER_FROM_LABELS, TRIGGER_LABELS, animationTargetKind, animationUsages, describeAnimation, indexSite, keyframesOf, parseSpring, springDuration, springEasing, springSamples, planAddAnimation, planDetachFromLibrary, planRemoveAnimation, planReveal, planSaveToLibrary, planUpdateAnimation, presetById, revealOf, runFromPreset } from "@atelier/model";
import { Button, Field, FieldGroup, Hint, IconButton, NumberInput, Section, Select, TextInput, Toggle, Eyebrow } from "@/ui";
import { animationTargetOptions, targetFromValue, targetValue } from "@/lib/anim-targets";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Les réglages d'une étape lisibles dans le mini-éditeur : opacité, décalage, échelle, rotation, flou. Le reste passe par « Autre CSS ». */
function readStep(style: StyleProps): { opacity: number | ""; x: number; y: number; scale: number; rotate: number; blur: number; other: string } {
  const t = String(style.transform ?? "");
  const num = (re: RegExp, d: number) => { const m = t.match(re); return m ? Number(m[1]) : d; };
  const other = Object.entries(style).filter(([k]) => !["opacity", "transform", "filter"].includes(k)).map(([k, v]) => `${k}: ${typeof v === "object" ? `{${(v as { token: string }).token}}` : String(v)}`).join("; ");
  const blur = String(style.filter ?? "").match(/blur\((-?[\d.]+)px\)/);
  return { opacity: style.opacity === undefined ? "" : Number(style.opacity), x: num(/translateX\((-?[\d.]+)px\)/, 0) || num(/translate\((-?[\d.]+)px/, 0), y: num(/translateY\((-?[\d.]+)px\)/, 0), scale: num(/scale\((-?[\d.]+)\)/, 1), rotate: num(/rotate\((-?[\d.]+)deg\)/, 0), blur: blur ? Number(blur[1]) : 0, other };
}
function writeStep(s: ReturnType<typeof readStep>): StyleProps {
  const out: StyleProps = {};
  if (s.opacity !== "") out.opacity = String(s.opacity);
  const parts: string[] = [];
  if (s.x) parts.push(`translateX(${s.x}px)`); if (s.y) parts.push(`translateY(${s.y}px)`); if (s.scale !== 1) parts.push(`scale(${s.scale})`); if (s.rotate) parts.push(`rotate(${s.rotate}deg)`);
  out.transform = parts.length ? parts.join(" ") : "none";
  if (s.blur) out.filter = `blur(${s.blur}px)`; else if (s.opacity !== "" || parts.length) out.filter = "none";
  for (const decl of s.other.split(";")) { const i = decl.indexOf(":"); if (i > 0) { const k = decl.slice(0, i).trim(); const v = decl.slice(i + 1).trim(); const tok = v.match(/^\{([\w.-]+)\}$/); if (k) out[k] = tok ? { token: tok[1]! } : v; } }
  return out;
}

function StepEditor({ step, onChange, onRemove, canRemove }: { step: Keyframe; onChange: (k: Keyframe) => void; onRemove: () => void; canRemove: boolean }) {
  const s = readStep(step.style);
  const set = (patch: Partial<ReturnType<typeof readStep>>) => onChange({ ...step, style: writeStep({ ...s, ...patch }) });
  const n = (v: number | "") => (v === "" ? 0 : v);
  return (
    <li className="flex flex-col gap-1 p-2 rounded-sm bg-surface border border-line">
      <div className="flex items-center gap-1">
        <NumberInput className="w-16" unit="%" min={0} max={100} value={step.at} onValueChange={(v) => onChange({ ...step, at: n(v) })} />
        <span className="text-xs text-muted flex-1">de l&apos;animation</span>
        {canRemove ? <IconButton size="sm" label="Retirer cette étape" icon={X} onClick={onRemove} /> : null}
      </div>
      <div className="grid grid-cols-3 gap-1">
        <Field label="Opacité"><NumberInput step={0.1} min={0} max={1} value={s.opacity} placeholder="—" onValueChange={(v) => set({ opacity: v })} /></Field>
        <Field label="Échelle"><NumberInput step={0.05} min={0} value={s.scale} onValueChange={(v) => set({ scale: v === "" ? 1 : v })} /></Field>
        <Field label="Rotation"><NumberInput unit="°" step={5} value={s.rotate} onValueChange={(v) => set({ rotate: n(v) })} /></Field>
        <Field label="X"><NumberInput unit="px" step={2} value={s.x} onValueChange={(v) => set({ x: n(v) })} /></Field>
        <Field label="Y"><NumberInput unit="px" step={2} value={s.y} onValueChange={(v) => set({ y: n(v) })} /></Field>
        <Field label="Flou"><NumberInput unit="px" step={1} min={0} value={s.blur} onValueChange={(v) => set({ blur: n(v) })} /></Field>
      </div>
      <Field label="Autre CSS" hint="Toute autre propriété, en CSS : « background: {color.accent}; letter-spacing: .2em »"><TextInput mono value={s.other} placeholder="color: red" onValueChange={(v) => set({ other: v })} /></Field>
    </li>
  );
}

/** Raideur et amortissement d'un ressort, avec la courbe qui en résulte (position de 0 à 1 sur la durée du run). */
function SpringFields({ run, onChange }: { run: AnimationRun; onChange: (stiffness: number, damping: number) => void }) {
  const sp = parseSpring(run.easing) ?? { stiffness: 170, damping: 26 };
  const pts = springSamples(sp.stiffness, sp.damping, run.duration, 48);
  const max = Math.max(1.05, ...pts);
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 96},${28 - (v / max) * 24}`).join(" ");
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-2">
      <span className="text-xs text-muted">Ressort</span>
      <div className="flex items-center gap-1">
        <NumberInput className="w-16" title="Raideur : plus elle est haute, plus le ressort est vif" min={1} max={1000} step={10} value={sp.stiffness} onValueChange={(v) => onChange(v === "" ? 170 : v, sp.damping)} />
        <NumberInput className="w-16" title="Amortissement : bas, ça rebondit ; haut, ça s'arrête net" min={0} max={200} step={1} value={sp.damping} onValueChange={(v) => onChange(sp.stiffness, v === "" ? 26 : v)} />
        <svg width="96" height="30" viewBox="0 0 96 30" aria-hidden className="shrink-0 rounded-sm border border-line bg-surface">
          <line x1="0" x2="96" y1={28 - (1 / max) * 24} y2={28 - (1 / max) * 24} stroke="currentColor" strokeOpacity=".2" strokeDasharray="2 2" />
          <polyline points={path} fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
        </svg>
      </div>
    </div>
  );
}

/** Animations d'un élément (section 8.4) : préréglages, déclencheur, réglages, étapes, bibliothèque du site, aperçu à la demande. */
export function AnimationsPanel({ site, node, pageRoot, commit, onPlay }: { site: Site; node: Node; pageRoot: Node; commit: Commit; onPlay?: (runId: string) => void }) {
  const runs = node.animations ?? [];
  const [open, setOpen] = useState<string | null>(runs.length === 1 ? runs[0]!.id : null);
  const [preset, setPreset] = useState("fade-up");
  const [libName, setLibName] = useState("");
  const index = indexSite(site);
  const parentKids = index.get(node.id)?.parent?.children ?? [];
  const reveal = revealOf(node);
  const update = (id: string, patch: Partial<AnimationRun>, label: string, coalesceKey?: string) => commit({ op: "batch", ops: planUpdateAnimation(node, id, patch), label }, { label, coalesceKey });
  const add = () => {
    const p = presetById(preset); if (!p) return;
    const run = runFromPreset(p);
    commit({ op: "batch", ops: planAddAnimation(node, run), label: `Animation · ${p.label}` }, { label: `Animation · ${p.label}` });
    setOpen(run.id);
  };
  const targetOptions = animationTargetOptions(site, pageRoot, node);
  const libraryOptions = (site.animations ?? []).map((a) => ({ value: `lib:${a.id}`, label: `Bibliothèque · ${a.name}` }));
  const presetOptions = [...ANIMATION_PRESETS.map((p) => ({ value: p.id, label: `${p.group} · ${p.label}` })), ...libraryOptions];
  const addFromChoice = () => {
    if (preset.startsWith("lib:")) {
      const def = site.animations?.find((a) => a.id === preset.slice(4)); if (!def) return;
      const run: AnimationRun = { id: crypto.randomUUID().slice(0, 12), animation: def.id, trigger: "load", duration: 1000, easing: "ease-in-out" };
      commit({ op: "batch", ops: planAddAnimation(node, run), label: `Animation · ${def.name}` }, { label: `Animation · ${def.name}` }); setOpen(run.id); return;
    }
    add();
  };
  return (
    <Section title="Animations" defaultOpen={runs.length > 0} hint="Des étapes (images-clés) jouées par un déclencheur : chargement, entrée dans l'écran, survol, clic, défilement ; sur l'élément, ses enfants, un autre élément ou les lettres d'un texte. L'éditeur montre l'état de repos ; « Jouer » rejoue l'animation une fois dans l'aperçu ; le site publié et l'export les jouent pour de bon.">
      {runs.length ? (
        <ul className="flex flex-col gap-1">
          {runs.map((run) => {
            const kf = keyframesOf(run, site);
            const inLibrary = typeof run.animation === "string";
            const isOpen = open === run.id;
            return (
              <li key={run.id} className="flex flex-col gap-1.5 rounded-sm border border-line bg-surface/60 p-1.5">
                <div className="flex items-center gap-1">
                  <Sparkles size={12} className="text-accent shrink-0" aria-hidden />
                  <button type="button" className="flex-1 min-w-0 text-left text-xs truncate hover:text-accent" onClick={() => setOpen(isOpen ? null : run.id)} aria-expanded={isOpen} title={describeAnimation(run, site)}>{describeAnimation(run, site)}</button>
                  {onPlay ? <IconButton size="sm" label="Jouer dans l'aperçu" icon={Play} onClick={() => onPlay(run.id)} /> : null}
                  <IconButton size="sm" label="Retirer l'animation" icon={X} onClick={() => commit({ op: "batch", ops: planRemoveAnimation(node, run.id), label: "Retirer l'animation" }, { label: "Retirer l'animation" })} />
                </div>
                {isOpen ? (
                  <FieldGroup>
                    <Field label="Déclencheur"><Select value={run.trigger} options={Object.entries(TRIGGER_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(run.id, { trigger: v as AnimationRun["trigger"] }, "Déclencheur")} /></Field>
                    {!run.split ? <Field label="Cible" hint="Ce que l'animation anime : cet élément, ses enfants (chacun décalé), un autre élément de la page (un bouton qui fait bouger un panneau), ou un sélecteur CSS"><Select value={targetValue(run)} options={targetOptions.some((o) => o.value === targetValue(run)) ? targetOptions : [...targetOptions, { value: targetValue(run), label: "Élément introuvable" }]} onValueChange={(v) => update(run.id, { target: targetFromValue(v, run.target), stagger: v === "children" ? run.stagger : undefined }, "Cible")} /></Field> : null}
                    {run.target && "selector" in run.target ? <Field label="Sélecteur" hint="Joué par le script du site, pas dans l'éditeur"><TextInput mono value={run.target.selector} placeholder=".ma-classe" onValueChange={(v) => update(run.id, { target: { selector: v } }, "Sélecteur", `anim-sel:${run.id}`)} /></Field> : null}
                    {node.type === "text" ? <Field label="Découper" hint="Chaque mot ou chaque lettre devient un morceau animé, chacun décalé"><Select value={run.split ?? ""} options={[{ value: "", label: "Non" }, ...Object.entries(SPLIT_LABELS).map(([value, label]) => ({ value, label }))]} onValueChange={(v) => update(run.id, { split: (v || undefined) as AnimationRun["split"], target: v ? undefined : run.target, stagger: v ? (run.stagger ?? { each: v === "letters" ? 30 : 80 }) : undefined }, "Découper")} /></Field> : null}
                    {animationTargetKind(run) === "children" || animationTargetKind(run) === "pieces" ? <Field label="Décalage" hint="Délai en plus pour chaque élément suivant, compté depuis le début, la fin ou le centre"><div className="flex items-center gap-1"><NumberInput className="w-20" unit="ms" step={10} min={0} value={run.stagger?.each ?? 0} onValueChange={(v) => update(run.id, { stagger: v && v > 0 ? { each: v, from: run.stagger?.from } : undefined }, "Décalage", `anim-st:${run.id}`)} /><Select className="flex-1" value={run.stagger?.from ?? "start"} options={Object.entries(STAGGER_FROM_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(run.id, { stagger: { each: run.stagger?.each ?? 80, from: v as NonNullable<AnimationRun["stagger"]>["from"] } }, "Décalage")} /></div></Field> : null}
                    {run.trigger !== "scroll" ? <Field label="Durée"><NumberInput unit="ms" step={50} min={0} value={run.duration} onValueChange={(v) => update(run.id, { duration: v === "" ? 0 : v }, "Durée", `anim-d:${run.id}`)} /></Field> : null}
                    {run.trigger !== "scroll" ? <Field label="Délai"><NumberInput unit="ms" step={50} min={0} value={run.delay ?? 0} onValueChange={(v) => update(run.id, { delay: v === "" ? 0 : v }, "Délai", `anim-dl:${run.id}`)} /></Field> : null}
                    {run.trigger !== "scroll" ? <Field label="Courbe" hint="Ressort : la durée se règle d'elle-même sur le temps de stabilisation ; un amortissement faible fait rebondir"><Select value={parseSpring(run.easing) ? "spring" : run.easing ?? "ease"} options={[...(ANIM_EASINGS.some((e) => e.value === (run.easing ?? "ease")) || parseSpring(run.easing) ? ANIM_EASINGS : [...ANIM_EASINGS, { value: run.easing ?? "ease", label: run.easing ?? "ease" }]), { value: "spring", label: "Ressort" }]} onValueChange={(v) => update(run.id, v === "spring" ? { easing: springEasing(170, 26), duration: springDuration(170, 26) } : { easing: v }, "Courbe")} /></Field> : null}
                    {run.trigger !== "scroll" && parseSpring(run.easing) ? <SpringFields run={run} onChange={(stiffness, damping) => update(run.id, { easing: springEasing(stiffness, damping), duration: springDuration(stiffness, damping) }, "Ressort", `anim-spring:${run.id}`)} /> : null}
                    {run.trigger !== "scroll" && run.trigger !== "hover" ? <Field label="Répétitions" hint="Vide ou 1 : une fois. « En boucle » : sans fin."><div className="flex items-center gap-1"><NumberInput className="w-16" min={1} step={1} value={run.iterations === "infinite" ? "" : run.iterations ?? 1} placeholder="∞" onValueChange={(v) => update(run.id, { iterations: v === "" ? "infinite" : v }, "Répétitions")} /><Toggle checked={run.iterations === "infinite"} label="en boucle" onChange={(b) => update(run.id, { iterations: b ? "infinite" : 1 }, "Répétitions")} /></div></Field> : null}
                    {run.trigger !== "scroll" ? <Field label="Sens"><Select value={run.direction ?? "normal"} options={Object.entries(DIRECTION_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(run.id, { direction: v as AnimationRun["direction"] }, "Sens")} /></Field> : null}
                    {run.trigger !== "scroll" ? <Field label="À la fin" hint="Où l'élément reste quand l'animation est finie"><Select value={run.fill ?? "both"} options={Object.entries(FILL_LABELS).map(([value, label]) => ({ value, label }))} onValueChange={(v) => update(run.id, { fill: v as AnimationRun["fill"] }, "Remplissage")} /></Field> : null}
                    {run.trigger === "hover" ? <Field label="Au départ" hint="Quand la souris quitte l'élément : l'animation revient en arrière, ou se coupe net"><Toggle checked={!!run.reverseOnLeave} label={run.reverseOnLeave ? "revient en arrière" : "se coupe"} onChange={(b) => update(run.id, { reverseOnLeave: b || undefined }, "Au départ de la souris")} /></Field> : null}
                    {run.trigger === "click" ? <Field label="Clic suivant" hint="Un clic joue ; le suivant revient en arrière (bascule), ou rejoue depuis le début"><Toggle checked={!!run.toggle} label={run.toggle ? "revient en arrière" : "rejoue"} onChange={(b) => update(run.id, { toggle: b || undefined }, "Clic suivant")} /></Field> : null}
                    {run.trigger === "inView" ? <Field label="Rejouer" hint="À chaque retour dans l'écran, au lieu d'une seule fois"><Toggle checked={run.once === false} label={run.once === false ? "à chaque passage" : "une seule fois"} onChange={(b) => update(run.id, { once: !b }, "Rejouer")} /></Field> : null}
                    {run.trigger === "scroll" ? <Field label="Plage" hint="Part de la traversée de l'écran pendant laquelle l'animation va du début à la fin : 0 = l'élément entre par le bas, 1 = il sort par le haut"><div className="flex items-center gap-1"><NumberInput className="w-16" step={0.05} min={0} max={1} value={run.range?.[0] ?? 0} onValueChange={(v) => update(run.id, { range: [v === "" ? 0 : v, run.range?.[1] ?? 1] }, "Plage")} /><span className="text-xs text-muted">à</span><NumberInput className="w-16" step={0.05} min={0} max={1} value={run.range?.[1] ?? 1} onValueChange={(v) => update(run.id, { range: [run.range?.[0] ?? 0, v === "" ? 1 : v] }, "Plage")} /></div></Field> : null}
                    {run.trigger !== "hover" ? <Field label="Au survol"><Toggle checked={!!run.pauseOnHover} label={run.pauseOnHover ? "en pause" : "continue"} onChange={(b) => update(run.id, { pauseOnHover: b || undefined }, "Pause au survol")} /></Field> : null}
                    {run.trigger === "inView" && reveal?.run.id === run.id && parentKids.length > 1 ? <Field label="En cascade" hint="La même apparition sur les voisins qui suivent, chacun décalé de 100 ms de plus"><Button size="sm" variant="ghost" icon={Sparkles} onClick={() => { const after = parentKids.slice(parentKids.indexOf(node) + 1); const ops = after.flatMap((n, i) => planReveal(n, { ...reveal.options, delay: (reveal.options.delay ?? 0) + 100 * (i + 1) })); if (ops.length) commit({ op: "batch", ops, label: "Apparition en cascade" }, { label: "Apparition en cascade" }); }}>Décaler les voisins</Button></Field> : null}
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex items-center gap-1"><Eyebrow as="span">Étapes</Eyebrow><span className="flex-1" />{inLibrary ? <span className="text-2xs text-dim">de la bibliothèque « {site.animations?.find((a) => a.id === run.animation)?.name} »</span> : null}</div>
                      {inLibrary ? (
                        <div className="flex items-center gap-1"><Hint>Les étapes se règlent dans Thème → Animations, pour tous les usages.</Hint><Button size="sm" variant="ghost" icon={Unlink2} onClick={() => commit({ op: "batch", ops: planDetachFromLibrary(site, node, run.id), label: "Détacher de la bibliothèque" }, { label: "Détacher de la bibliothèque" })}>Détacher</Button></div>
                      ) : (
                        <>
                          <ul className="flex flex-col gap-1">
                            {kf.map((k, i) => <StepEditor key={i} step={k} canRemove={kf.length > 2} onChange={(nk) => update(run.id, { animation: { keyframes: kf.map((x, j) => (j === i ? nk : x)).sort((a, b) => a.at - b.at) } }, "Étape", `anim-kf:${run.id}:${i}`)} onRemove={() => update(run.id, { animation: { keyframes: kf.filter((_, j) => j !== i) } }, "Retirer une étape")} />)}
                          </ul>
                          <div className="flex items-center gap-1">
                            <Button size="sm" icon={Plus} onClick={() => { const last = kf[kf.length - 1]!; const prev = kf[kf.length - 2]; const at = prev ? Math.round((prev.at + last.at) / 2) : 50; update(run.id, { animation: { keyframes: [...kf.slice(0, -1), { at, style: { ...prev?.style } }, last].sort((a, b) => a.at - b.at) } }, "Ajouter une étape"); }}>Étape</Button>
                            <span className="flex-1" />
                            <TextInput className="w-28" value={libName} placeholder="Nom…" onValueChange={setLibName} />
                            <Button size="sm" icon={BookmarkPlus} disabled={!libName.trim()} title="Garder ces étapes dans la bibliothèque du site pour les réutiliser ailleurs" onClick={() => { commit({ op: "batch", ops: planSaveToLibrary(site, node, run.id, libName.trim()), label: "Enregistrer l'animation" }, { label: "Enregistrer l'animation" }); setLibName(""); }}>Enregistrer</Button>
                          </div>
                        </>
                      )}
                    </div>
                  </FieldGroup>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="flex items-center gap-1">
        <Select className="flex-1" value={preset} options={presetOptions} onValueChange={setPreset} />
        <Button size="sm" icon={Plus} onClick={addFromChoice}>Ajouter</Button>
      </div>
      {node.type === "text" ? <Field label="Compteur" hint="Le nombre du texte défile de 0 à sa valeur quand il entre dans l'écran (« 12 ans » compte jusqu'à 12)"><Toggle checked={!!node.props.countUp} label={node.props.countUp ? "animé" : "fixe"} onChange={(b) => commit({ op: "node.set", id: node.id, path: "props.countUp", value: b || undefined }, { label: b ? "Compteur animé" : "Compteur fixe" })} /></Field> : null}
      {!runs.length ? <Hint>Apparition : l&apos;élément arrive quand il entre dans l&apos;écran. Continue : flottement, pulsation, rotation… en boucle. Attention : secousse ou rebond au clic, grossissement au survol. « Personnalisée » : vos propres étapes.</Hint> : null}
      {(site.animations ?? []).some((a) => animationUsages(site, a.id).length === 0) ? null : null}
    </Section>
  );
}
