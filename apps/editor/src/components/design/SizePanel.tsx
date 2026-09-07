"use client";

import type { Site } from "@atelier/model";
import { Section, TextInput } from "@/ui";
import { PropRow, UnitInput } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

const KW = ["auto", "none", "min-content", "max-content", "fit-content"];

export function SizePanel({ site, style }: { site: Site; style: StyleApi }) {
  const s = style;
  const len = (prop: string, label: string) => (
    <PropRow key={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} onScrub={s.scrub(prop)}>
      <UnitInput className="flex-1" site={site} tokenGroup="width" keywords={KW} value={s.value(prop)} onChange={(v) => s.set(prop, v)} placeholder="auto" />
    </PropRow>
  );
  return (
    <Section title="Dimensions" hint="Taille de l'élément. Vide = automatique : l'élément prend la place que lui donne son contenu ou son parent.">
      {len("width", "Largeur")}
      {len("height", "Hauteur")}
      {len("minWidth", "Larg. min.")}
      {len("maxWidth", "Larg. max.")}
      {len("minHeight", "Haut. min.")}
      {len("maxHeight", "Haut. max.")}
      <PropRow label="Ratio" source={s.source("aspectRatio")} sourceTitle={s.title("aspectRatio")} onReset={() => s.reset("aspectRatio")}>
        <TextInput mono className="flex-1" value={typeof s.value("aspectRatio") === "string" ? String(s.value("aspectRatio")) : ""} placeholder="16 / 9" onValueChange={(v) => s.set("aspectRatio", v || undefined)} />
      </PropRow>
    </Section>
  );
}
