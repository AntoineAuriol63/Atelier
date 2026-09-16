"use client";

import type { Trigger, TriggerOn } from "@atelier/model";
import { TRIGGER_LABELS } from "@atelier/model";
import { Field, Hint, NumberInput, Select, Toggle } from "@/ui";

/** Ce que la page peut déclencher : son chargement, son défilement, la souris. */
export const PAGE_ONS: TriggerOn[] = ["load", "scroll", "pointer"];

/** Réglages d'un déclencheur : quand, délai, rejouer, retour, bascule, pause au survol ; plage du défilement et axe de la souris. */
export function TriggerSettings({ trigger: t, pageLevel, onUpdate }: { trigger: Trigger; pageLevel?: boolean; onUpdate: (patch: Partial<Trigger>, label: string, coalesceKey?: string) => void }) {
  const ons = (pageLevel ? PAGE_ONS : (Object.keys(TRIGGER_LABELS) as TriggerOn[])).map((value) => ({ value, label: TRIGGER_LABELS[value] }));
  const [lo, hi] = t.range ?? [0, 1];
  const pct = (v: number) => Math.round(v * 100);
  const setRange = (a: number, b: number) => onUpdate({ range: a === 0 && b === 1 ? undefined : [Math.min(a, b), Math.max(a, b)] }, "Plage du défilement", `tr-range:${t.id}`);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-2 gap-1">
        <Field label="Quand" inline={false}><Select value={t.on} options={ons} onValueChange={(v) => onUpdate({ on: v as TriggerOn }, "Déclencheur")} /></Field>
        {t.on !== "scroll" && t.on !== "pointer" ? <Field label="Délai" inline={false}><NumberInput unit="ms" step={50} min={0} value={t.delay ?? 0} onValueChange={(v) => onUpdate({ delay: v || undefined }, "Délai", `tr-dl:${t.id}`)} /></Field> : null}
        {t.on === "inView" ? <Field label="Rejouer" inline={false}><Toggle checked={t.once === false} label={t.once === false ? "à chaque passage" : "une seule fois"} onChange={(b) => onUpdate({ once: b ? false : undefined }, "Rejouer")} /></Field> : null}
        {t.on === "hover" ? <Field label="Au départ" inline={false}><Toggle checked={!!t.reverseOnLeave} label={t.reverseOnLeave ? "revient en arrière" : "se coupe"} onChange={(b) => onUpdate({ reverseOnLeave: b || undefined }, "Au départ de la souris")} /></Field> : null}
        {t.on === "click" ? <Field label="Clic suivant" inline={false}><Toggle checked={!!t.toggle} label={t.toggle ? "revient en arrière" : "rejoue"} onChange={(b) => onUpdate({ toggle: b || undefined }, "Clic suivant")} /></Field> : null}
        {t.on === "pointer" ? <Field label="Axe" inline={false}><Select value={t.axis ?? "y"} options={[{ value: "y", label: "Vertical (haut → bas)" }, { value: "x", label: "Horizontal (gauche → droite)" }]} onValueChange={(v) => onUpdate({ axis: v === "y" ? undefined : "x" }, "Axe de la souris")} /></Field> : null}
        {t.on === "load" || t.on === "inView" ? <Field label="Au survol" inline={false}><Toggle checked={!!t.pauseOnHover} label={t.pauseOnHover ? "en pause" : "continue"} onChange={(b) => onUpdate({ pauseOnHover: b || undefined }, "Pause au survol")} /></Field> : null}
      </div>
      {t.on === "scroll" ? (
        <>
          <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-1">
            <span className="text-xs text-muted">De</span><NumberInput unit="%" step={5} min={0} max={100} value={pct(lo)} onValueChange={(v) => setRange((v === "" ? 0 : v) / 100, hi)} />
            <span className="text-xs text-muted">à</span><NumberInput unit="%" step={5} min={0} max={100} value={pct(hi)} onValueChange={(v) => setRange(lo, (v === "" ? 100 : v) / 100)} />
          </div>
          <Hint>{pageLevel ? "0 % : haut de la page ; 100 % : bas de la page." : "0 % : l'élément entre par le bas de l'écran ; 100 % : il sort par le haut."} La ligne de temps se déroule entre ces deux positions.</Hint>
        </>
      ) : null}
      {t.on === "pointer" ? <Hint>La position de la souris dans la fenêtre parcourt la ligne de temps, du bord {t.axis === "x" ? "gauche au bord droit" : "haut au bord bas"}.</Hint> : null}
    </div>
  );
}

