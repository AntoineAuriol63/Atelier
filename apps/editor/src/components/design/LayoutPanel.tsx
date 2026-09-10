"use client";

import { AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, AlignVerticalJustifyStart, AlignVerticalSpaceAround, AlignVerticalSpaceBetween, ArrowDown, ArrowRight, Baseline, EyeOff, LayoutGrid, Rows3, Square, StretchHorizontal, StretchVertical, WrapText } from "lucide-react";
import type { Node, Site } from "@atelier/model";
import { Button, NumberInput, Section, TextInput } from "@/ui";
import { layoutGridAt } from "@atelier/model";
import { PropRow, Segmented, UnitInput } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

const DISPLAY = [
  { value: "block", label: "Bloc", icon: Square },
  { value: "flex", label: "Flexible (éléments alignés)", icon: Rows3, rotate: 90 },
  { value: "grid", label: "Grille", icon: LayoutGrid },
  { value: "inline-block", label: "En ligne" },
  { value: "none", label: "Masqué", icon: EyeOff },
];
// Répartition le long de l'axe principal, avec les icônes de l'axe réel (horizontal ou vertical).
const JUSTIFY_H = [
  { value: "flex-start", label: "À gauche", icon: AlignHorizontalJustifyStart },
  { value: "center", label: "Centré", icon: AlignHorizontalJustifyCenter },
  { value: "flex-end", label: "À droite", icon: AlignHorizontalJustifyEnd },
  { value: "space-between", label: "Espacés, aux bords", icon: AlignHorizontalSpaceBetween },
  { value: "space-around", label: "Espacés, avec marges", icon: AlignHorizontalSpaceAround },
];
const JUSTIFY_V = [
  { value: "flex-start", label: "En haut", icon: AlignVerticalJustifyStart },
  { value: "center", label: "Centré", icon: AlignVerticalJustifyCenter },
  { value: "flex-end", label: "En bas", icon: AlignVerticalJustifyEnd },
  { value: "space-between", label: "Espacés, aux bords", icon: AlignVerticalSpaceBetween },
  { value: "space-around", label: "Espacés, avec marges", icon: AlignVerticalSpaceAround },
];
// Alignement sur l'axe secondaire.
const ALIGN_V = [
  { value: "flex-start", label: "En haut", icon: AlignVerticalJustifyStart },
  { value: "center", label: "Centré", icon: AlignVerticalJustifyCenter },
  { value: "flex-end", label: "En bas", icon: AlignVerticalJustifyEnd },
  { value: "stretch", label: "Étirés sur la hauteur", icon: StretchVertical },
  { value: "baseline", label: "Sur la ligne de base du texte", icon: Baseline },
];
const ALIGN_H = [
  { value: "flex-start", label: "À gauche", icon: AlignHorizontalJustifyStart },
  { value: "center", label: "Centrés", icon: AlignHorizontalJustifyCenter },
  { value: "flex-end", label: "À droite", icon: AlignHorizontalJustifyEnd },
  { value: "stretch", label: "Étirés sur la largeur", icon: StretchHorizontal },
];
const POSITION = [
  { value: "static", label: "Normal" }, { value: "relative", label: "Relatif" }, { value: "absolute", label: "Absolu" }, { value: "fixed", label: "Fixe" }, { value: "sticky", label: "Collant" },
];
const OVERFLOW = [{ value: "visible", label: "Visible" }, { value: "hidden", label: "Masqué" }, { value: "auto", label: "Défiler" }];
const LENGTH_KW = ["auto"];

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }

export function LayoutPanel({ site, style, parentDisplay, parentDirection, leaf }: { site: Site; style: StyleApi; node: Node; parentDisplay?: string; parentDirection?: string; leaf?: boolean }) {
  const s = style;
  const display = str(s.value("display")) ?? "block";
  const isFlex = display === "flex" || display === "inline-flex";
  const isGrid = display === "grid";
  const dir = str(s.value("flexDirection")) ?? "row";
  const position = str(s.value("position")) ?? "static";
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide}>{children}</PropRow>
  );
  const seg = (prop: string, label: string, options: typeof DISPLAY, wide = true) => row(prop, label, <Segmented className="flex-1" value={str(s.value(prop))} options={options} onChange={(v) => s.set(prop, v, false)} />, wide);
  const len = (prop: string, label: string, kw = LENGTH_KW) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={s.scrub(prop)}>
      <UnitInput prop={prop} className="flex-1" site={site} tokenGroup="space" keywords={kw} value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="0" />
    </PropRow>
  );

  return (
    <>
      {leaf ? null : (
      <Section title="Disposition" hint="Comment les éléments contenus dans celui-ci se rangent : en colonne, en ligne ou en grille, et comment ils s'alignent.">
        {seg("display", "Affichage", DISPLAY)}
        {isFlex ? (
          <>
            {row("flexDirection", "Sens", (
              <div className="flex items-center gap-1 flex-1">
                <Segmented value={dir} options={[{ value: "row", label: "En ligne", icon: ArrowRight }, { value: "column", label: "En colonne", icon: ArrowDown }]} onChange={(v) => s.set("flexDirection", v, false)} />
                <Segmented value={str(s.value("flexWrap"))} options={[{ value: "wrap", label: "Retour à la ligne", icon: WrapText }]} onChange={(v) => s.set("flexWrap", v, false)} />
              </div>
            ), true)}
            {dir === "column" ? seg("justifyContent", "Vertical", JUSTIFY_V) : seg("justifyContent", "Horizontal", JUSTIFY_H)}
            {dir === "column" ? seg("alignItems", "Horizontal", ALIGN_H) : seg("alignItems", "Vertical", ALIGN_V)}
            {len("gap", "Écart")}
          </>
        ) : null}
        {isGrid ? (
          <>
            {row("gridTemplateColumns", "Colonnes", (
              <div className="flex items-center gap-1 flex-1">
                <TextInput mono className="flex-1" value={str(s.value("gridTemplateColumns")) ?? ""} placeholder="1fr 1fr" onValueChange={(v) => s.set("gridTemplateColumns", v || undefined)} />
                <NumberInput className="w-14" min={1} max={12} value={(() => { const m = str(s.value("gridTemplateColumns"))?.match(/^repeat\((\d+), 1fr\)$/); return m ? Number(m[1]) : ""; })()} onValueChange={(n) => s.set("gridTemplateColumns", n === "" ? undefined : `repeat(${n}, 1fr)`, false)} title="Nombre de colonnes égales" />
              </div>
            ))}
            {row("gridTemplateRows", "Lignes", <TextInput mono className="flex-1" value={str(s.value("gridTemplateRows")) ?? ""} placeholder="auto" onValueChange={(v) => s.set("gridTemplateRows", v || undefined)} />)}
            <div className="pl-[18px]"><Button size="sm" onClick={() => { const g = layoutGridAt(site, s.bp); s.set("gridTemplateColumns", `repeat(${g.columns}, 1fr)`, false); s.set("gap", g.gutter, false); }} title="Reprend le nombre de colonnes et la gouttière de la grille de mise en page (onglet Thème) pour cette taille d'écran">Calquer sur la grille du site</Button></div>
            {len("gap", "Écart")}
            {seg("justifyItems", "Horizontal", [{ value: "start", label: "À gauche", icon: AlignHorizontalJustifyStart }, { value: "center", label: "Centrés", icon: AlignHorizontalJustifyCenter }, { value: "end", label: "À droite", icon: AlignHorizontalJustifyEnd }, { value: "stretch", label: "Étirés", icon: StretchHorizontal }])}
            {seg("alignItems", "Vertical", ALIGN_V.slice(0, 4))}
          </>
        ) : null}
      </Section>
      )}
      {leaf ? (
        <Section title="Affichage" defaultOpen={false} hint="Masquer cet élément sur cette taille d'écran, ou changer sa nature d'affichage.">
          {seg("display", "Affichage", DISPLAY.filter((d) => d.value !== "flex" && d.value !== "grid"))}
        </Section>
      ) : null}

      {parentDisplay === "flex" || parentDisplay === "grid" ? (
        <Section title="Place dans son parent" defaultOpen={false} hint="Le parent de cet élément range ses enfants en ligne, en colonne ou en grille. Ici, vous réglez comment cet élément-ci s'y comporte.">
          {parentDisplay === "flex" ? (
            <>
              {seg("flexGrow", "Espace libre", [{ value: "1", label: "Étendre" }, { value: "0", label: "Fixe" }])}
              {seg("flexShrink", "Si ça manque", [{ value: "1", label: "Rétrécir" }, { value: "0", label: "Rigide" }])}
              {seg("alignSelf", "Aligner", [{ value: "auto", label: "Idem" }, ...(parentDirection === "column" ? ALIGN_H : ALIGN_V.slice(0, 4))])}
            </>
          ) : (
            <>
              {row("gridColumn", "Colonne", <TextInput mono className="flex-1" value={str(s.value("gridColumn")) ?? ""} placeholder="auto" onValueChange={(v) => s.set("gridColumn", v || undefined)} />)}
              {row("gridRow", "Ligne", <TextInput mono className="flex-1" value={str(s.value("gridRow")) ?? ""} placeholder="auto" onValueChange={(v) => s.set("gridRow", v || undefined)} />)}
            </>
          )}
          {row("order", "Ordre", <NumberInput className="w-20" value={typeof s.value("order") === "string" ? Number(s.value("order")) : ""} onValueChange={(n) => s.set("order", n === "" ? undefined : String(n))} />)}
        </Section>
      ) : null}

      <Section title="Position et débordement" defaultOpen={false} hint="Position dans le flux : normal, ou décalé, fixé à l'écran, collant au défilement. Débordement : ce qui dépasse est visible, coupé ou défilable.">
        {seg("position", "Position", POSITION)}
        {position !== "static" ? (
          <div className="grid grid-cols-2 gap-1.5">
            {len("top", "Haut")}{len("right", "Droite")}{len("bottom", "Bas")}{len("left", "Gauche")}
          </div>
        ) : null}
        {position !== "static" ? row("zIndex", "Calque", <NumberInput className="w-20" value={typeof s.value("zIndex") === "string" ? Number(s.value("zIndex")) : ""} onValueChange={(n) => s.set("zIndex", n === "" ? undefined : String(n))} />) : null}
        {seg("overflow", "Débordement", OVERFLOW)}
      </Section>
    </>
  );
}
