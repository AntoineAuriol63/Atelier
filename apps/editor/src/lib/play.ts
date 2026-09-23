/**
 * Options de « Voir l'effet » dans l'aperçu de l'éditeur (API Web Animations, outil partagé avec le site).
 * `fill: backwards` : pendant le délai d'une piste (délai du déclencheur, « démarre après », décalage), la cible est tenue à son
 * état de départ, comme sur le site ; à la fin, elle revient à l'état de repos que l'éditeur pose lui-même (`applyInstantStates`).
 * Avec `none`, l'élément restait visible pendant le délai puis clignotait : le délai semblait ne pas exister.
 */
export function playOptions(a: { loop?: number | "infinite" }): { iterations: number; fill: "backwards" } {
  return { iterations: a.loop === "infinite" ? 3 : a.loop ?? 1, fill: "backwards" };
}
