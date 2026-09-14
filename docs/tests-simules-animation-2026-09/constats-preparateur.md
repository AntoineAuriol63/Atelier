# Constats du préparateur (hors codage des participants) · vérifiés dans le code ou par visite instrumentée

## Défauts probables d'Atelier

1. **Éclair avant l'apparition à l'entrée dans l'écran** (visites instrumentées de P3 T1, P1 T1, P4 T1, P5 T2, P2 T2) : avant le déclenchement, l'élément est à son état normal (opacité 1) ; quand 15 % de lui entre dans l'écran, l'animation part de son image-clé de départ (opacité 0, décalage) : le visiteur voit l'élément, le voit disparaître, puis revenir. Cause dans le code : `packages/renderer/src/interactions.ts` l. 169, le script met `animation: none` sur les cibles jusqu'à l'intersection (seuil 0,15), sans appliquer l'état de départ. Deux participants experts (P4, pilote et vague 2) ont anticipé ce risque sans pouvoir le vérifier.
2. **Phrase de résumé « un à un » sans échelonnement** : `apps/editor/src/lib/timeline.ts` l. 167 écrit « les enfants de « Plats » un à un » dès que la piste vise les enfants, même sans décalage (les cartes partent ensemble).
3. **Survol sans retour composé** (P4 T5) : une animation au survol faite à la main (sans « retour quand la souris part ») revient d'un coup à la sortie de la souris (CSS `:hover`, `packages/renderer/src/css.ts` l. 263 et 274) ; rien dans l'interface ne dit ce qui se passera à la sortie (P4 : « je ne sais pas »).
4. **Composant partagé modifié sans avertissement lisible** (P3, P1, P5 en T4) : une apparition posée sur un chiffre clé l'est dans le composant « Chiffre clé » et vaut pour les trois instances ; aucun des trois ne l'a compris sur le moment (P1 : « le 14 bouge alors que je n'y ai pas touché »).

## Fonctions présentes mais non trouvées (découvrabilité, pas absence)

5. **Changer le « Quand » d'une animation existante** : existe dans les réglages du déclencheur ouvert (mode Animation, `AnimationModePanel.tsx` l. 162) ; P5 ne l'a pas trouvé et a créé un doublon.
6. **Rejouer à chaque passage** : interrupteur « Rejouer · une seule fois / à chaque passage » dans les mêmes réglages (l. 164) ; P4 l'a cherché dans les répétitions de la ligne de temps (« Une fois / 2 fois / En boucle »), où il n'est pas.
7. **Enfants l'un après l'autre avec décalage** : « Cible · Ses enfants, un à un » et « Décalage » (ms) sur la piste (`Timeline.tsx` l. 343–349) ; P4 n'a pas ouvert le menu Cible ; dans le panneau simple, seule la case « les enfants un à un » (100 ms) existe.
8. **Ressort / dépassement** : courbe « Ressort » (raideur, amortissement) dans les réglages d'une image-clé (EasingField) ; aucun participant ne l'a trouvée ; aucun préréglage d'apparition à rebond dans la liste rapide (P5).
9. **Délai dans le panneau simple** : absent par conception (le panneau simple n'a que la vitesse) ; le délai se règle par « Départ » en mode Animation. Quatre participants sur cinq ont cherché un délai « à côté de l'effet ».

## À vérifier

10. **Entrée dans un champ chiffré** (P4 pilote et vague 2, P5) : « Entrée ne valide pas, il faut cliquer ailleurs ou Tab ». Le code de `NumberInput` valide à Entrée puis retire le focus (`apps/editor/src/ui/Inputs.tsx`) ; l'écart observé peut venir du retard des captures (P5) ou d'un autre champ ; non reproduit à ce stade.
