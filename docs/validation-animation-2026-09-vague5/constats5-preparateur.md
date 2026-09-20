# Constats du préparateur · vague 5 (version 17505d3, lot 8), T4 seule

Relevés pendant la modération, dans le site enregistré, le journal, les visites instrumentées et le code. Une seule mission, en première position : les participants n'ont pas l'apprentissage des quatre missions précédentes qu'avaient ceux des vagues 2 à 4.

## Ce que le lot 8 a changé, tel que vu

1. **Les aides existent et sont trouvées, mais aucune ne règle l'ordre.** Quatre participants sur cinq ont utilisé au moins une fonction du lot 8 sans l'avoir cherchée : « Pareil pour les 2 suivants » (P1, sur les chiffres ; vu par P2), la liste « Éléments de la scène » avec « les 3 un à un » (P4, P5), la vue « Scène » (P1 : « la seule chose qui m'ait dit la vérité » ; P2 : « Voir la scène » trouvé). Résultat : **six éléments animés chez 3 sur 5** (P1, P3, P5 ; 30 éléments sur 30 possibles chez ces trois), contre 24 sur 30 pour les cinq de la vague 4. Le groupe des chiffres, cause n° 1 des échecs de la vague 4, est réglé d'un coup par P1, P4 et P5. **Mais l'ordre (C3) n'est atteint par personne** : les départs restent à 0 chez P1, P3, P4, P5 ; seule P2 a enchaîné deux éléments par « démarre après ».
2. **La vue « Scène » diagnostique et ne répare pas.** P1 et P2 l'ont lue et y ont vu le problème (« trois barres commencent au même endroit ») ; toutes deux la décrivent comme en lecture seule (« il ne sert qu'à regarder, je n'ai pas vu comment déplacer une barre » ; « que pour lire l'état, pas pour agir »). L'avertissement orange (« faites démarrer chaque élément après le précédent ») a été lu par P1 et P2 ; P1 est allée jusqu'à la liste « Démarre » à la 40e action, P2 l'a appliqué à un élément.
3. **« Ses voisins » comprise comme un doublon du menu du dessus** (P3 : « proposait exactement les mêmes choix… je voyais pas la différence », a cherché là l'ordre et le rejeu et n'a rien trouvé). Le champ propose un effet pour le groupe ; il ne dit ni « un à un » dans son libellé de choix, ni ne propose l'ordre ou le rejeu. P1 a préféré « Pareil pour… » depuis le premier chiffre (résultat équivalent).
4. **Le mot « Départ » de la piste est le réglage central et le moins visible** (P5 : visible dès le début et lu à voix haute à la 17e action selon les captures, jamais utilisé, puis rogné par la liste des éléments ; elle dit l'avoir « découvert » à la 39e ; P4 : « trois centimètres pour les réglages »). La liste « Éléments de la scène » ajoutée au lot 8 aggrave la concurrence de hauteur dans la colonne (P4 : « ligne de temps, liste des dix éléments et réglages de piste se partagent la même hauteur »). Ouverte par défaut tant que l'animation a moins de deux pistes, elle reste ouverte ensuite.

## Défauts d'interface vérifiés

5. **La scène collante grandit avec la phrase de résumé** (P4 : « la phrase de résumé en haut grossit d'une ligne à chaque piste ajoutée et pousse toute la liste vers le bas… j'ai créé une piste parasite »). Même racine que le constat 24 de la vague 4 : le bloc `sticky` de `Timeline.tsx` contient la phrase de résumé, dont la hauteur dépend du nombre de pistes. Le lot 8 a ajouté une phrase (« L'aperçu montre l'instant de la tête de lecture… ») et la liste des éléments sous ce bloc. À corriger : phrase de résumé tronquée à deux lignes (dépliable), ou hors du bloc collant.
6. **Les barres de la ligne de temps ne se tirent pas, la règle si** (P5 : a tiré une barre, la tête de lecture a bougé ; P4 : « j'essaierais d'attraper la barre… non testé »). `onPointerDown` d'une rangée de piste appelle `pick(t)` puis `onRailDown` (déplace la tête). Affordance fausse : les barres ressemblent à des blocs déplaçables.
7. **L'aperçu « se vide » à chaque effet posé en mode Animation** (P5 : trois fois, « j'ai cru que j'avais cassé quelque chose », « à corriger en priorité »). Sur une animation neuve, la tête de lecture est à 0 ; une piste qu'on vient de remplir montre alors son élément à son état de départ (opacité 0 : invisible), et rien ne dit pourquoi. Constat 2 de la vague 3 et P-6, toujours là ; en Écriture, `applyInstantStates` pose l'état d'arrivée. Piste : après « Remplir avec », placer la tête de lecture à la fin de la piste remplie.
8. **Boutons « Ajouter » identiques** dans la liste des éléments et « Ajouter « La maison » » juste au-dessus (P4 : la piste parasite vient de là).
9. **Durée par défaut d'une animation vide à 1 000 ms, sans alerte** (P5 : « tout ce que j'empilais rentrait de force là-dedans ») ; la scène de P4 et P5 fait 1 000 ms.
10. **« n'a pas encore d'images-clés »** (P5 : « m'inquiète pour rien… dites n'a pas encore d'effet »).
11. **Aucun participant n'a vu la scène se jouer** (5 sur 5) ; P5 a vu un instant par accident en tirant la barre ; boutons de lecture « petits et sans texte » (P5), pas de barre d'espace (P4). Artefact A1 pour « voir bouger », pas pour le libellé du bouton ni pour la barre d'espace (le rail a bien Espace au clavier, mais seulement quand il a le focus).
12. **« ms » et « Délai » toujours opaques pour la débutante** (P1 : « dans PowerPoint j'écrivais 0,5 seconde » ; « délai, c'est une date limite ») ; le « (1 s) » à côté de 1 040 ms est le seul chiffre qu'elle ait compris.

## Comparaison des profils T4 (vague 4 → vague 5, sans apprentissage des missions précédentes)

| | v4 (position 5) | v5 (position 1) |
|---|---|---|
| Éléments animés sur 30 | 24 | **26** (P1 6, P2 3, P3 6, P4 2 remplies + 2 vides, P5 6) |
| C1 tous bougent | 1 sur 5 | **3 sur 5** (P1, P3, P5) |
| C2 un seul événement | 3 sur 5 | 2 sur 5 (P4 sur la section, P5 sur la photo) |
| C3 ordre principal | 1 sur 5 | **0 sur 5** |
| C3b chiffres échelonnés | 1 sur 5 | **3 sur 5** (P1, P4 préparé mais vide, P5 ; P4 ne compte pas → 2 sur 5 stricts) |
| C4 minutage | 4 sur 5 | 0 sur 5 (tout finit vers 1 000 ms) |
| C5 manières | 1 sur 5 | 3 sur 5 (P1, P5 ; P3 sans montée du titre) |
| C6 rejoue | 2 sur 5 | 3 sur 5 (P4, P5 ; P1 chiffres seuls ; P2 photo et titre) |
| Statut | E × 5 | E × 5 |
| Fin | budget × 5 | budget × 5 |

Lecture : la vague 5 a levé la cause n° 1 (désigner le groupe) et donné une vue qui dit la vérité, mais le geste « après le précédent » reste à faire élément par élément dans une liste, et la scène ne se règle pas depuis la vue qui la montre. C3 est resté à zéro, et C4 a baissé parce que personne n'a eu le temps de régler les durées après avoir posé les six effets.
