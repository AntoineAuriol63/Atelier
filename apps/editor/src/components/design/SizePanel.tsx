"use client";

import type { Site, StyleValue } from "@atelier/model";
import { Button, Hint, Section, TextInput } from "@/ui";
import { PropRow, Segmented, UnitInput, TokenSelect } from "@/ui/controls";
import type { StyleApi } from "./useStyle";
import { placementSentence, type Placement } from "@/lib/placement";

const KW = ["auto", "none", "min-content", "max-content", "fit-content"];

type Mode = "auto" | "hug" | "fill" | "fixed";
function modeOf(v: StyleValue | undefined): Mode {
  if (v === undefined || v === "auto") return "auto";
  if (v === "fit-content" || v === "max-content" || v === "min-content") return "hug";
  if (v === "100%") return "fill";
  return "fixed";
}

export function SizePanel({ site, style, defaultOpen = true, placement, onSelectNode }: { site: Site; style: StyleApi; defaultOpen?: boolean; /** D'où vient la largeur : la grille ou la ligne du parent (voir `lib/placement.ts`). */ placement?: Placement; onSelectNode?: (id: string) => void }) {
  const s = style;
  // La valeur se tape directement, quel que soit le mode (25 septembre 2026 : le champ n'apparaissait qu'en « Fixe », personne ne le trouvait) ;
  // Ajustée et Remplit posent leur mot-clé, les fractions leur pourcentage, tout dans le même champ.
  const dim = (prop: "width" | "height", label: string) => {
    const v = s.value(prop);
    const mode = modeOf(v);
    return (
      <PropRow key={prop} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={mode === "fixed" ? s.scrub(prop) : undefined} wide>
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <Segmented className="shrink-0" size="sm" value={mode === "hug" || mode === "fill" ? mode : undefined} options={[{ value: "hug", label: "Ajustée" }, { value: "fill", label: "Remplit" }]} onChange={(m) => {
            if (!m) s.set(prop, undefined, false);
            else if (m === "hug") s.set(prop, "fit-content", false);
            else if (m === "fill") s.set(prop, "100%", false);
          }} />
          <UnitInput prop={prop} className="flex-1 min-w-[72px]" site={site} tokenGroup="width" keywords={KW} value={mode === "hug" || mode === "fill" ? undefined : v} placeholder="auto" onChange={(x) => s.set(prop, x)} />
        </div>
      </PropRow>
    );
  };
  const len = (prop: string, label: string) => (
    <PropRow key={prop} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={s.scrub(prop)}>
      <UnitInput prop={prop} className="flex-1" site={site} tokenGroup="width" keywords={KW} value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="aucune" />
    </PropRow>
  );
  return (
    <Section title="Dimensions" defaultOpen={defaultOpen} hint="Auto : le navigateur décide (une boîte prend toute la largeur disponible, une hauteur suit son contenu). Ajustée : juste la taille du contenu. Remplit : toute la place du parent. Ou une valeur tapée dans le champ (px, %, rem, vw, jeton du thème).">
      {dim("width", "Largeur")}
      {placement ? (
        <div className="flex flex-col gap-1 pl-[18px]" data-placement="">
          <p className="m-0 text-2xs text-muted leading-snug">{placementSentence(placement, modeOf(s.value("width")) !== "auto")}</p>
          {onSelectNode ? <Button size="sm" variant="ghost" className="self-start" onClick={() => { onSelectNode(placement.parentId); window.setTimeout(() => window.dispatchEvent(new CustomEvent("atelier:reveal-section", { detail: "Disposition" })), 30); }} title="Sélectionne le parent et ouvre sa rubrique Disposition (colonnes, sens, écart)">Régler {`« ${placement.parentLabel} »`}</Button> : null}
        </div>
      ) : null}
      <div className="grid grid-cols-[12px_84px_1fr] items-center gap-1.5">
        <span /><span className="text-xs text-dim">Fractions</span>
        <div className="flex gap-0.5">
          {[["25%", "¼"], ["33.333%", "⅓"], ["50%", "½"], ["66.667%", "⅔"], ["75%", "¾"], ["100%", "1"]].map(([v, l]) => (
            <button key={v} type="button" onClick={() => s.set("width", v, false)} title={`Largeur : ${l} du parent`} className={`h-5 min-w-6 px-1 rounded-xs text-2xs border ${s.value("width") === v ? "border-accent text-accent" : "border-line text-muted hover:text-ink hover:bg-hover"}`}>{l}</button>
          ))}
        </div>
      </div>
      {dim("height", "Hauteur")}
      {len("minWidth", "Largeur min.")}
      {len("maxWidth", "Largeur max.")}
      {len("minHeight", "Hauteur min.")}
      {len("maxHeight", "Hauteur max.")}
      <PropRow label="Ratio" source={s.source("aspectRatio")} sourceTitle={s.title("aspectRatio")} onReset={() => s.reset("aspectRatio")}>
        <div className="flex items-center gap-1 flex-1 min-w-0"><TextInput mono className="flex-1 min-w-0" value={typeof s.value("aspectRatio") === "string" ? String(s.value("aspectRatio")) : ""} placeholder="16 / 9" onValueChange={(v) => s.set("aspectRatio", v || undefined)} /><TokenSelect site={site} onPick={(t) => s.set("aspectRatio", t)} /></div>
      </PropRow>
      <Hint>La pastille bleue devant un réglage le remet à zéro (retour à auto).</Hint>
    </Section>
  );
}
