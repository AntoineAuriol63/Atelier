"use client";

import { AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, AlignVerticalJustifyStart, ArrowDown, ArrowRight, EyeOff, LayoutGrid, Rows3, Square, StretchVertical, WrapText } from "lucide-react";
import type { Node, Site } from "@atelier/model";
import { NumberInput, Section, TextInput } from "@/ui";
import { PropRow, Segmented, UnitInput } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

const DISPLAY = [
  { value: "block", label: "Bloc", icon: Square },
  { value: "flex", label: "Flexible (éléments alignés)", icon: Rows3, rotate: 90 },
  { value: "grid", label: "Grille", icon: LayoutGrid },
  { value: "inline-block", label: "En ligne" },
  { value: "none", label: "Masqué", icon: EyeOff },
];
const JUSTIFY = [
  { value: "flex-start", label: "Début", icon: AlignHorizontalJustifyStart },
  { value: "center", label: "Centre", icon: AlignHorizontalJustifyCenter },
  { value: "flex-end", label: "Fin", icon: AlignHorizontalJustifyEnd },
  { value: "space-between", label: "Espacé entre", icon: AlignHorizontalSpaceBetween },
  { value: "space-around", label: "Espacé autour", icon: AlignHorizontalSpaceAround },
];
const ALIGN = [
  { value: "flex-start", label: "Début", icon: AlignVerticalJustifyStart },
  { value: "center", label: "Centre", icon: AlignVerticalJustifyCenter },
  { value: "flex-end", label: "Fin", icon: AlignVerticalJustifyEnd },
  { value: "stretch", label: "Étirer", icon: StretchVertical },
  { value: "baseline", label: "Ligne de base" },
];
const POSITION = [
  { value: "static", label: "Normal" }, { value: "relative", label: "Relatif" }, { value: "absolute", label: "Absolu" }, { value: "fixed", label: "Fixe" }, { value: "sticky", label: "Collant" },
];
const OVERFLOW = [{ value: "visible", label: "Visible" }, { value: "hidden", label: "Masqué" }, { value: "auto", label: "Défiler" }];
const LENGTH_KW = ["auto"];

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }

export function LayoutPanel({ site, style, parentDisplay }: { site: Site; style: StyleApi; node: Node; parentDisplay?: string }) {
  const s = style;
  const display = str(s.value("display")) ?? "block";
  const isFlex = display === "flex" || display === "inline-flex";
  const isGrid = display === "grid";
  const dir = str(s.value("flexDirection")) ?? "row";
  const position = str(s.value("position")) ?? "static";
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide}>{children}</PropRow>
  );
  const seg = (prop: string, label: string, options: typeof DISPLAY, wide = true) => row(prop, label, <Segmented className="flex-1" value={str(s.value(prop))} options={options} onChange={(v) => s.set(prop, v, false)} />, wide);
  const len = (prop: string, label: string, kw = LENGTH_KW) => row(prop, label, <UnitInput className="flex-1" site={site} tokenGroup="space" keywords={kw} value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="0" />);

  return (
    <>
      <Section title="Disposition">
        {seg("display", "Affichage", DISPLAY)}
        {isFlex ? (
          <>
            {row("flexDirection", "Sens", (
              <div className="flex items-center gap-1 flex-1">
                <Segmented value={dir} options={[{ value: "row", label: "En ligne", icon: ArrowRight }, { value: "column", label: "En colonne", icon: ArrowDown }]} onChange={(v) => s.set("flexDirection", v, false)} />
                <Segmented value={str(s.value("flexWrap"))} options={[{ value: "wrap", label: "Retour à la ligne", icon: WrapText }]} onChange={(v) => s.set("flexWrap", v, false)} />
              </div>
            ), true)}
            {seg("justifyContent", dir === "column" ? "Vertical" : "Horizontal", JUSTIFY)}
            {seg("alignItems", dir === "column" ? "Horizontal" : "Vertical", ALIGN)}
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
            {len("gap", "Écart")}
            {seg("justifyItems", "Horizontal", [{ value: "start", label: "Début", icon: AlignHorizontalJustifyStart }, { value: "center", label: "Centre", icon: AlignHorizontalJustifyCenter }, { value: "end", label: "Fin", icon: AlignHorizontalJustifyEnd }, { value: "stretch", label: "Étirer" }])}
            {seg("alignItems", "Vertical", ALIGN)}
          </>
        ) : null}
      </Section>

      {parentDisplay === "flex" || parentDisplay === "grid" ? (
        <Section title="Dans le parent" defaultOpen={false}>
          {parentDisplay === "flex" ? (
            <>
              {row("flexGrow", "Grandir", <NumberInput className="w-20" min={0} value={typeof s.value("flexGrow") === "string" ? Number(s.value("flexGrow")) : ""} onValueChange={(n) => s.set("flexGrow", n === "" ? undefined : String(n))} />)}
              {row("flexShrink", "Rétrécir", <NumberInput className="w-20" min={0} value={typeof s.value("flexShrink") === "string" ? Number(s.value("flexShrink")) : ""} onValueChange={(n) => s.set("flexShrink", n === "" ? undefined : String(n))} />)}
              {len("flexBasis", "Base")}
              {seg("alignSelf", "Aligner", [{ value: "auto", label: "Auto" }, ...ALIGN.slice(0, 4)])}
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

      <Section title="Position et débordement" defaultOpen={false}>
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
