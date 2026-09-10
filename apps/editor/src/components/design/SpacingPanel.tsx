"use client";

import type { Site } from "@atelier/model";
import { Hint, Section } from "@/ui";
import { BoxModel } from "@/ui/controls";
import type { StyleApi } from "./useStyle";

export function SpacingPanel({ site, style, defaultOpen = true }: { site: Site; style: StyleApi; defaultOpen?: boolean }) {
  return (
    <Section title="Espacement" defaultOpen={defaultOpen} hint="Marge : espace autour de l'élément. Remplissage : espace entre son bord et son contenu.">
      <BoxModel site={site} get={style.get} set={style.set} />
      <Hint>Nombre en pixels, valeur avec unité, « auto », ou une valeur du thème comme <span className="font-mono">space.4</span>. Couleur du chiffre : blanc posé ici, ambre hérité d&apos;une taille d&apos;écran plus large, violet venu d&apos;un style partagé, gris = valeur par défaut.</Hint>
    </Section>
  );
}
