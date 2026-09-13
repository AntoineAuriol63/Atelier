"use client";

import { ANIM_EASINGS, parseSpring, springDuration, springEasing, springSamples } from "@atelier/model";
import { Button, NumberInput, Select } from "@/ui";

const DEFAULT_SPRING = { stiffness: 170, damping: 26 };

/**
 * Courbe d'un segment (cadrage § 4.1) : pour atteindre cette image-clé depuis la précédente. Courbes CSS usuelles, « Naturel » (défaut,
 * `ease`), une courbe venue d'ailleurs gardée telle quelle, ou un ressort (raideur, amortissement) avec l'aperçu de sa réponse.
 * `segment` : durée du segment en ms ; `onFitSpring` cale le segment sur le temps de stabilisation du ressort.
 */
export function EasingField({ value, segment, onChange, onFitSpring }: { value: string | undefined; segment: number; onChange: (easing: string | undefined) => void; onFitSpring?: (duration: number) => void }) {
  const spring = parseSpring(value);
  const known = !value || spring || ANIM_EASINGS.some((e) => e.value === value);
  const options = [{ value: "", label: "Naturel (par défaut)" }, ...ANIM_EASINGS, ...(known ? [] : [{ value: value!, label: `Personnalisée · ${value}` }]), { value: "spring", label: "Ressort" }];
  const settle = spring ? springDuration(spring.stiffness, spring.damping) : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <Select value={spring ? "spring" : value ?? ""} options={options} onValueChange={(v) => onChange(v === "spring" ? springEasing(DEFAULT_SPRING.stiffness, DEFAULT_SPRING.damping) : v || undefined)} />
      {spring ? (
        <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
          <div className="grid grid-cols-2 gap-1">
            <NumberInput title="Raideur : plus elle est forte, plus le ressort part vite" unit="raid." min={1} max={1000} step={10} value={spring.stiffness} onValueChange={(n) => onChange(springEasing(n === "" ? DEFAULT_SPRING.stiffness : n, spring.damping))} />
            <NumberInput title="Amortissement : faible, le ressort rebondit ; fort, il se pose sans dépasser" unit="amort." min={1} max={200} step={1} value={spring.damping} onValueChange={(n) => onChange(springEasing(spring.stiffness, n === "" ? DEFAULT_SPRING.damping : n))} />
          </div>
          <SpringCurve stiffness={spring.stiffness} damping={spring.damping} duration={segment} />
          <span className="col-span-2 text-2xs text-muted">
            Se stabilise en {settle} ms ; ce segment dure {segment} ms{settle > segment + 20 ? " : le ressort sera coupé avant de se poser." : "."}
            {onFitSpring && Math.abs(settle - segment) > 20 ? <Button size="sm" variant="ghost" className="ml-1 h-5 px-1.5" onClick={() => onFitSpring(settle)}>Caler le segment</Button> : null}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/** Réponse du ressort sur la durée du segment : dépasser la ligne du haut, c'est rebondir. */
function SpringCurve({ stiffness, damping, duration }: { stiffness: number; damping: number; duration: number }) {
  const pts = springSamples(stiffness, damping, Math.max(50, duration), 40);
  const max = Math.max(1.2, ...pts);
  const w = 72, h = 40;
  const y = (v: number) => h - 4 - (v / max) * (h - 8);
  const d = pts.map((v, i) => `${i ? "L" : "M"}${((i / (pts.length - 1)) * w).toFixed(1)},${y(v).toFixed(1)}`).join("");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Aperçu du ressort" className="rounded-xs bg-surface border border-line">
      <line x1={0} x2={w} y1={y(1)} y2={y(1)} stroke="var(--color-line-strong)" strokeDasharray="2 2" />
      <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth={1.5} />
    </svg>
  );
}
