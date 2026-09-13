# Audit n°4 : ergonomie, UX et UI des animations

Audit du 13 septembre 2026, mené par l'agent (Claude) après la livraison du mode Animation (`docs/cadrage-animation.md`) et de ses suites (`docs/audit-animation-2026-09.md`). Objet : vérifier l'usage du **panneau Animation** et des sections Animation d'Écriture et de Design.

**Méthode.** Évaluation heuristique (les dix heuristiques de Nielsen, gravité de 0 à 4), parcours cognitifs sur six tâches, revue d'interface au regard du système de design de l'éditeur (`src/ui`, jetons de `globals.css`), contrôles d'accessibilité (WCAG 2.2 : contraste, taille des cibles, noms accessibles, clavier). Mesures prises dans le navigateur intégré, sur une copie des données fichiers de Maison Aurèle, à 1440 × 900, 1280 × 800 et 1024 × 768 : captures, dimensions des éléments, contraste calculé sur les couleurs réelles, position des réglages dans le panneau, gestes comptés.

**Limites.** Aucun utilisateur réel ; la fluidité de la lecture (60 images/s) n'a pas été observée ; captures à résolution réduite (800 px de large). Les gravités sont un jugement d'expert à confronter à un essai d'Antoine.

## Verdict

**Le modèle d'interaction tient.** Créer, nommer, composer sur plusieurs éléments et voir l'état exact à chaque instant se fait sans code ni impasse, et l'accessibilité de base est saine (contrastes conformes, focus visible, presque tous les contrôles nommés). **Ce qui freine l'usage est surtout spatial** : le canevas rétrécit fortement dès qu'une ligne de temps est ouverte, les propriétés qu'on anime le plus sont loin sous la ligne de temps, et l'entrée pour modifier une animation existante se voit mal. Un **défaut de l'éditeur** a aussi été trouvé : Entrée dans un champ numérique renomme le calque sélectionné.

| Gravité | Nombre | Points |
|---|---|---|
| 3 · majeur | 6 | E1 à E6 |
| 2 · moyen | 10 | M1 à M10 |
| 1 · mineur | 7 | m1 à m7 |

## Mesures clés

| Mesure | Valeur |
|---|---|
| Largeur du canevas, ligne de temps ouverte (panneau à 440 px) | 700 px à 1440 (aperçu à 52 %) · 540 px à 1280 (39 %) · **284 px à 1024 (19 %)** |
| Hauteur du panneau, animation d'une piste ouverte | 1 787 px pour 820 px visibles (2,2 écrans) |
| Distance du haut de la ligne de temps aux réglages (1024 × 768) | image-clé 381 px · échelle 588 px · décalage 630 px · flou 691 px · **opacité 1 152 px** |
| Section Animations en Design | 12e section sur 16, à 1 423 px du haut (panneau de 1 941 px) |
| Section Animation en Écriture | 4e section, à 679 px, après une aide de 5 lignes |
| Cibles de moins de 24 px (ligne de temps d'une animation à 3 pistes) | 38 sur 82 contrôles : losanges 18 × 18, portée 12 px de haut, pastilles de source 20 × 20, case 14 × 14 |
| Ligne de déclencheur (seule entrée pour ouvrir une animation) | 289 × **17 px**, texte sans icône |
| Rail de la ligne de temps | 311 px quelle que soit la durée : 2,6 ms/px pour 800 ms, 26 ms/px pour un préréglage de 8 s |
| Contraste des textes mesurés | 0 texte sous 4,5:1 (tailles 11 et 12 px) |
| Contrôles sans nom accessible | 2 (champs Bordure et Ombre d'Apparence) |
| Gestes pour composer « Arrivée du héros » (3 éléments décalés) | 13 : ajouter, nommer, 3 × (choisir + cliquer), 3 × remplir, 2 × départ |

## Parcours

1. **Débutant, apparition en Écriture** : sélectionner, descendre à la section Animation (679 px), choisir. 3 gestes et un défilement ; **aucun aperçu** de l'effet choisi (E5).
2. **Créer et composer** (« le titre monte, puis le texte, puis les boutons ») : 13 gestes, sans impasse. Nom prêt à taper, pioche sans perte de sélection, remplissage par préréglage : fluide. Frictions : canevas étroit (E1), réglages fins loin (E4), pioche peu signalée dans l'aperçu (M5).
3. **Retoucher une animation existante** (le Fondu en montant du titre) : il faut deviner que la ligne de texte du déclencheur s'ouvre au clic (E3) ; décaler son départ de 20 ms la fait passer « Personnalisée » partout (M1).
4. **Animation au défilement de la page** : la section Page n'apparaît que sans sélection ou sur la racine (M7) ; ensuite, même parcours que 2.
5. **Retrouver une animation dans la bibliothèque** : 59 entrées sans recherche, la partie qui distingue les homonymes est tronquée (M8).
6. **Au clavier seul** : tête de lecture (flèches, Espace), temps exact d'une image-clé et départ d'une piste au clavier ; mais pas de déplacement d'image-clé aux flèches, et des libellés ambigus pour un lecteur d'écran (M3).

## Points majeurs (gravité 3)

**E1 · Le canevas devient trop étroit avec une ligne de temps ouverte** *(flexibilité, visibilité)*. Panneau gauche 300 px + panneau droit 440 px : il reste 540 px à 1280 (aperçu à 39 %) et 284 px à 1024 (19 %, illisible) ; à 1024 la barre du haut déborde et coupe « Publier ». Or on anime pour voir.
→ En mode Animation, replier le panneau gauche par défaut (les calques restent accessibles par le fil d'Ariane et la pioche) ; sous 1280 px, passer la ligne de temps en bandeau bas redimensionnable ; poignée pour élargir ou réduire le panneau droit.

**E2 · Entrée dans un champ numérique renomme le calque sélectionné** *(défaut, prévention des erreurs)*. **Corrigé le 13 septembre.** Reproduit avec de vraies frappes : taper « 20 » dans Départ puis Entrée valide la valeur, puis le champ perd le focus et la même touche atteint le raccourci global « Entrée = renommer » : la ligne du calque passe en renommage et prend le focus ; la frappe suivante renomme le calque. Cause : `NumberInput` (et `UnitInput`) quittent le champ sur Entrée, puis l'écouteur clavier de `EditorShell` voit `document.body` actif. Touche tout l'éditeur en Design et en Animation.
→ Dans `EditorShell`, ignorer une touche dont la **cible** est un champ (`input`, `textarea`, `select`, contenu éditable), et pas seulement l'élément actif ; ou `stopPropagation` sur Entrée dans les champs qui se quittent eux-mêmes. Test à écrire.

**E3 · Ouvrir une animation existante se devine** *(visibilité, reconnaissance)*. **Corrigé le 13 septembre.** La seule entrée est la ligne de texte du déclencheur, 17 px de haut, sans icône ni libellé d'action ; l'état ouvert se lit à une bordure accentuée.
→ Ligne de 28 px au moins, icône « Modifier la ligne de temps » (crayon ou chevron) et libellé au survol ; même comportement en Design (où l'icône Film existe déjà).

**E4 · Les propriétés qu'on anime le plus sont loin, et la ligne de temps sort de l'écran pendant qu'on les règle** *(efficacité, charge mémoire)*. À 1024 × 768 : décalage à 630 px, opacité à 1 152 px sous le haut de la ligne de temps (Apparence commence par le fond, la bordure, l'arrondi, l'ombre). En défilant jusqu'à elles, on perd de vue la tête de lecture et les images-clés.
→ En mode image-clé, une section **Mouvement** en tête (opacité, décalage X/Y, échelle, rotation, flou), les panneaux Design complets ensuite ; **lecteur et rail collants** en haut du panneau pendant le défilement.

**E5 · Les choix rapides ne montrent pas ce qu'ils font** *(visibilité de l'état du système)*. **Corrigé le 13 septembre.** Choisir « Zoom » ou « Netteté » en Écriture ne joue rien dans l'aperçu (l'éditeur montre l'état d'arrivée) ; Écriture n'a pas de « Jouer ». Le débutant choisit à l'aveugle, contrairement à la référence retenue (Framer, aperçu immédiat).
→ Jouer une fois l'animation dans l'aperçu à chaque choix rapide ; bouton « Jouer » à côté des trois choix, en Écriture comme en Design.

**E6 · Les sections Animation sont en bas des inspecteurs** *(efficacité, découvrabilité)*. Design : 12e section sur 16, à 1 423 px ; Écriture : après la mise en forme et son aide. C'était déjà le point 10 de l'audit n°2 pour les apparitions.
→ Remonter Animations juste après Effets en Design (ou l'ouvrir en tête quand l'élément a des déclencheurs) ; en Écriture, placer Animation avant l'aide de mise en forme, et raccourcir celle-ci.

## Points moyens (gravité 2)

**M1 · « Personnalisée » se déclenche trop vite, sans retour possible.** Décaler le départ d'une piste de 20 ms suffit à perdre le préréglage (la position absolue des images-clés compte) ; ni Écriture ni Design ne disent ce qui a changé. → Ignorer un décalage uniforme dans `isPresetIntact` (ou convertir le départ d'une piste unique en délai du déclencheur) ; action « Revenir au préréglage ».

**M2 · « lettre par lettre » est séparée de l'Apparition qu'elle règle.** **Corrigé le 13 septembre.** La case apparaît sous « En continu », sans libellé de ligne. → La placer sur la ligne Apparition, ou en sous-ligne indentée juste dessous.

**M3 · Clavier et lecteur d'écran.** Les losanges ne se déplacent pas aux flèches (seul le champ « Temps » le permet) ; ils s'annoncent « Image-clé à 0 ms » sans la piste ; la tête de lecture n'a pas d'`aria-valuetext` (valeur brute en ms) ; la ligne de temps n'a pas de structure (liste ou grille) ; 2 champs d'Apparence sans nom. → Flèches ±10 ms (Maj ±100) sur les images-clés sélectionnées ; « Titre 1, image-clé à 0 ms » ; `aria-valuetext="0,40 s"` ; `role="list"` par piste ; nommer les champs.

**M4 · Cibles petites.** 38 cibles sous 24 px dans une ligne de temps à 3 pistes : losanges 18 × 18, portée 12 px de haut, pastilles 20 × 20. Denses sur une piste de 28 px de haut, faciles à manquer au trackpad. → Zone de clic de 24 px autour des losanges (le dessin peut rester à 10 px), portée de 20 px de haut, pistes de 32 px.

**M5 · La pioche est peu signalée dans l'aperçu.** Curseur inchangé (le CSS de l'éditeur force `cursor: default`) ; l'élément sélectionné garde son contour plein, ce qui laisse croire qu'il est visé ; à 700 px le bandeau tient sur deux lignes et couvre la navigation du site. → Curseur viseur, surbrillance « prenable » au survol, contour de la sélection atténué pendant la pioche, bandeau d'une ligne en bas du canevas.

**M6 · La ligne de temps ne se zoome pas.** Rail fixe de 311 px : 26 ms par pixel sur un préréglage de 8 s, impossible de viser au glisser ; colonne des pistes fixe à 96 px qui tronque les noms ; derniers repères de la règle (« 800 », « 1s ») coupés au bord. → Zoom horizontal (⌘ molette, « Ajuster »), défilement horizontal, colonne des pistes redimensionnable, marge à droite du rail.

**M7 · Les déclencheurs de page disparaissent dès qu'on sélectionne un élément.** Il faut penser à Échap pour les retrouver. → Section Page toujours présente, repliée, en bas du panneau.

**M8 · La bibliothèque ne passe pas l'échelle.** 59 entrées sans recherche ni regroupement, la partie qui distingue (élément, page) est tronquée à droite ; une animation inutilisée ne s'ouvre pas et ne se supprime pas ici. → Champ de recherche, regroupement par page, libellé sur deux lignes (nom, puis élément · page), actions « Ajouter un déclencheur » et « Supprimer » sur une animation inutilisée.

**M9 · Nom par défaut peu parlant.** **Corrigé le 13 septembre.** « Animation 60 » (compteur du site). → « Animation · Texte » d'après l'élément qui la lance.

**M10 · Unités mélangées.** **Corrigé le 13 septembre.** « 820 ms » à côté de « 0,82 s », règle en ms qui finit par « 1s », compteur en secondes. → Une seule unité dans la ligne de temps (ms, avec « 1 000 » pour la seconde), les secondes seulement dans le compteur de lecture.

## Points mineurs (gravité 1)

- **m1** Titres en capitales sur des noms longs (« PISTE · TITRE 1 « LE GOÛT DE L'AUVERGNE… » ») : moins lisibles, retour à la ligne. → Capitales pour la catégorie, nom en casse normale.
- **m2** Fil d'Ariane : premier élément coupé net au bord gauche (« …ros »). → Dégradé ou « … » cliquable en tête.
- **m3** Gestes de la ligne de temps (⇧-clic, ⌥-glisser, Suppr, clic sur la portée) décrits seulement dans l'infobulle des losanges. → Ligne d'aide repliable sous le rail, ou « ? » ouvrant les raccourcis.
- **m4** *(corrigé le 13 septembre : « Cible », « compter jusqu'au nombre », aide sur « aller-retour »)* Libellés : « Anime » (verbe seul), compteur « fixe / animé » qui décrit l'état au lieu de l'action, « aller-retour » grisé sans raison visible. → « Cible », « Compter jusqu'au nombre », info-bulle « Choisissez d'abord des répétitions ».
- **m5** Guide « Composer cette animation » en un paragraphe numéroté ; lecteur et règle actifs sans piste. → Liste à puces, lecteur grisé tant qu'il n'y a rien à jouer.
- **m6** En Design, la ligne de déclencheur est tronquée au profit des badges et de trois icônes : le nom de l'animation disparaît. → Nom sur sa propre ligne, actions au survol.
- **m7** « Ouvrir dans le mode Animation » deux fois (bouton de section et icône par ligne). → Garder l'icône par ligne et un lien discret.

## Ce qui marche

- **Créer** : « Nouvelle animation (à composer) » par défaut, ligne de temps en haut, nom sélectionné.
- **Composer** : pioche sans perte de sélection, « Remplir avec », départ en ms ; aperçu exact à la tête de lecture, cadre de la piste active.
- **Régler** : pastilles ◆ ◇ ○ lisibles, ressort avec aperçu et calage, annulation fiable (chaque geste a un libellé clair dans l'historique).
- **Accessibilité de base** : contrastes conformes sur tous les textes mesurés, focus visible global (`:focus-visible`), noms accessibles sur la quasi-totalité des contrôles, tête de lecture pilotable au clavier.
- **Cohérence** : vocabulaire français stable (déclencheur, animation, piste, image-clé), mêmes primitives que le reste de l'éditeur.

## Priorités proposées

| Ordre | Points | Effort estimé |
|---|---|---|
| 1 | **E2** (défaut clavier, tout l'éditeur) | moins d'une heure, avec test |
| 2 | **E3**, **E5**, **M2**, **M9**, **M10**, m4 | une demi-journée |
| 3 | **E4** (section Mouvement, lecteur collant), **E6** | une journée |
| 4 | **E1** (espace du canevas), **M6** (zoom de la ligne de temps) | une à deux journées |
| 5 | **M1**, **M3**, **M4**, **M5**, **M7**, **M8**, mineurs restants | au fil de l'eau |
