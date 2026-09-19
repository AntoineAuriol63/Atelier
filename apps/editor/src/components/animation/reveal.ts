/**
 * La scène collante en haut de la ligne de temps (nom, lecteur, règle, pistes) grandit d'une rangée par piste et recouvre ce qui
 * est passé dessous quand le panneau est défilé : l'en-tête « Piste » et son champ « Départ » disparaissaient (vague 4 des tests
 * simulés, P2). Ramène `section` juste sous `stage` : la marge de défilement vaut la hauteur de la scène, et `scrollIntoView`
 * (« nearest ») ne bouge que si les réglages sont cachés.
 */
export function revealBelowStage(section: HTMLElement | null, stage: HTMLElement | null): void {
  if (!section) return;
  if (stage) section.style.scrollMarginTop = `${stage.offsetHeight + 8}px`;
  section.scrollIntoView({ block: "nearest" });
}
