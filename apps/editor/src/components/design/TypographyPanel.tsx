"use client";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Italic, Strikethrough, Underline } from "lucide-react";
import type { Site } from "@atelier/model";
import { Section, Select, Toggle } from "@/ui";
import { ColorInput, PropRow, Segmented, UnitInput } from "@/ui/controls";
import { tokenOptions } from "@/lib/css-value";
import type { StyleApi } from "./useStyle";

const WEIGHTS = [["300", "Fin"], ["400", "Normal"], ["500", "Moyen"], ["600", "Demi-gras"], ["700", "Gras"], ["800", "Très gras"]].map(([value, label]) => ({ value: value!, label: `${label} · ${value}` }));
const ALIGN = [{ value: "left", label: "Gauche", icon: AlignLeft }, { value: "center", label: "Centré", icon: AlignCenter }, { value: "right", label: "Droite", icon: AlignRight }, { value: "justify", label: "Justifié", icon: AlignJustify }];
const TRANSFORM = [{ value: "none", label: "Aa" }, { value: "uppercase", label: "AA" }, { value: "capitalize", label: "Aa Bb" }, { value: "lowercase", label: "aa" }];
const WRAP = [{ value: "wrap", label: "Normal" }, { value: "balance", label: "Équilibré" }, { value: "pretty", label: "Soigné" }, { value: "nowrap", label: "Sans retour" }];

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }

/** Propriétés numériques réglables en glissant sur leur libellé. */
const SCRUBBABLE = new Set(["lineHeight", "letterSpacing"]);

export function TypographyPanel({ site, style, mode, defaultOpen = true }: { site: Site; style: StyleApi; mode?: string; defaultOpen?: boolean }) {
  const s = style;
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide} onScrub={SCRUBBABLE.has(prop) ? s.scrub(prop) : undefined}>{children}</PropRow>
  );
  const fontTokens = tokenOptions(site, "font");
  const familyValue = (() => { const v = s.value("fontFamily"); if (typeof v === "object" && v && "token" in v) return `{${v.token}}`; return str(v) ?? ""; })();
  const families = [...fontTokens.map((t) => ({ value: `{${t.token}}`, label: `${t.label} · ${t.value.split(",")[0]?.replace(/['"]/g, "")}` })), ...site.theme.fonts.map((f) => ({ value: `'${f.family}', ${f.fallback}`, label: f.family })), { value: "system-ui, sans-serif", label: "Système" }, { value: "Georgia, serif", label: "Georgia" }, { value: "monospace", label: "Monospace" }];
  if (familyValue && !families.some((f) => f.value === familyValue)) families.unshift({ value: familyValue, label: familyValue });

  return (
    <Section title="Typographie" defaultOpen={defaultOpen} hint="Police, taille et alignement du texte de cet élément et de tout ce qu'il contient.">
      {row("fontFamily", "Police", <Select className="flex-1" value={familyValue} placeholder="Héritée" options={families} onValueChange={(v) => { const m = v.match(/^\{(.+)\}$/); s.set("fontFamily", !v ? undefined : m ? { token: m[1]! } : v, false); }} />)}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
        {(() => { const prop = "fontSize"; return <PropRow key={prop} label="Taille" source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={s.scrub(prop)}><UnitInput className="flex-1" site={site} tokenGroup="fontSize" value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="16" /></PropRow>; })()}
        {false && row("fontSize", "Taille", <UnitInput className="flex-1" site={site} tokenGroup="fontSize" value={s.value("fontSize")} onChange={(v) => s.set("fontSize", v)} placeholder="16" />)}
        {row("lineHeight", "Interligne", <UnitInput prop="lineHeight" className="flex-1" site={site} tokenGroup="lineHeight" defaultUnit="" keywords={["normal"]} value={s.value("lineHeight")} onChange={(v) => s.set("lineHeight", v)} placeholder="1.5" />)}
        {row("fontWeight", "Graisse", <Select className="flex-1" value={str(s.value("fontWeight")) ?? ""} placeholder="Héritée" options={WEIGHTS} onValueChange={(v) => s.set("fontWeight", v || undefined, false)} />)}
        {row("letterSpacing", "Espacement", <UnitInput prop="letterSpacing" step={0.01} className="flex-1" site={site} defaultUnit="em" keywords={["normal"]} value={s.value("letterSpacing")} onChange={(v) => s.set("letterSpacing", v)} placeholder="0" />)}
      </div>
      {row("color", "Couleur", <ColorInput className="flex-1" site={site} mode={mode} value={s.value("color")} onChange={(v) => s.set("color", v)} />)}
      {row("textAlign", "Alignement", <Segmented className="flex-1" value={str(s.value("textAlign"))} options={ALIGN} onChange={(v) => s.set("textAlign", v, false)} />, true)}
      {row("fontStyle", "Style", (
        <div className="flex items-center gap-1 flex-1">
          <Toggle checked={str(s.value("fontStyle")) === "italic"} label="Italique" onChange={(b) => s.set("fontStyle", b ? "italic" : undefined, false)} />
          <Segmented value={str(s.value("textDecoration"))} options={[{ value: "underline", label: "Souligné", icon: Underline }, { value: "line-through", label: "Barré", icon: Strikethrough }, { value: "none", label: "Aucune décoration" }]} onChange={(v) => s.set("textDecoration", v, false)} />
        </div>
      ), true)}
      {row("textTransform", "Casse", <Segmented className="flex-1" value={str(s.value("textTransform"))} options={TRANSFORM} onChange={(v) => s.set("textTransform", v, false)} />, true)}
      {row("textWrap", "Retour", <Segmented className="flex-1" size="sm" value={str(s.value("textWrap"))} options={WRAP} onChange={(v) => s.set("textWrap", v, false)} />, true)}
    </Section>
  );
}
