"use client";

import type { Site } from "@atelier/model";
import { Section, TextInput } from "@/ui";
import { PropRow, UnitInput } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

const KW = ["auto", "none", "min-content", "max-content", "fit-content"];

export function SizePanel({ site, style }: { site: Site; style: StyleApi }) {
  const s = style;
  const len = (prop: string, label: string) => (
    <PropRow key={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)}>
      <UnitInput className="flex-1" site={site} tokenGroup="width" keywords={KW} value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="auto" />
    </PropRow>
  );
  return (
    <Section title="Dimensions">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
        {len("width", "Largeur")}{len("height", "Hauteur")}
        {len("minWidth", "Min. larg.")}{len("minHeight", "Min. haut.")}
        {len("maxWidth", "Max. larg.")}{len("maxHeight", "Max. haut.")}
      </div>
      <PropRow label="Ratio" source={s.source("aspectRatio")} sourceTitle={s.title("aspectRatio")} onReset={() => s.reset("aspectRatio")}>
        <TextInput mono className="flex-1" value={typeof s.value("aspectRatio") === "string" ? String(s.value("aspectRatio")) : ""} placeholder="16 / 9" onValueChange={(v) => s.set("aspectRatio", v || undefined)} />
      </PropRow>
    </Section>
  );
}
