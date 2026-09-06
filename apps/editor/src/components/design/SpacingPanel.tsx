"use client";

import type { Site } from "@atelier/model";
import { Hint, Section } from "@/ui";
import { BoxModel } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

export function SpacingPanel({ site, style }: { site: Site; style: StyleApi }) {
  return (
    <Section title="Espacement">
      <BoxModel site={site} get={style.get} set={style.set} />
      <Hint>Nombre en pixels, valeur avec unité, « auto », ou un jeton comme <span className="font-mono">space.4</span>. Couleur du texte : bleu posé ici, ambre hérité, violet style partagé.</Hint>
    </Section>
  );
}
