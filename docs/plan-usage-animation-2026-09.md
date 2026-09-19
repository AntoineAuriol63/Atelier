# Plan · corriger le parcours d'animation par l'usage (septembre 2026)

Suite des tests utilisateurs simulés du 14 septembre (`docs/tests-simules-animation-2026-09.md`). Décidé avec Antoine le 14 septembre 2026 : l'« après » se fait en **enchaînant dans une même animation** (solution A) ; la validation se fait **par un nouveau test simulé** (vraies personnes plus tard).

Ce document est écrit **avant** toute conception. Les critères de la section 1 ne changent plus : si un lot ne les atteint pas, on revoit la conception, pas le critère.

---

## 1. Critères de réussite (pré-enregistrés)

Mesurés par le test simulé de validation (section 5), avec les **mêmes missions, les mêmes critères de réussite** (protocole v1.0, § 5, lus dans le site enregistré et par visite instrumentée) et les mêmes personas que la vague 2. Référence : vague 2 du 14 septembre (version `fc1764d`).

| # | Usage | Critère | Vague 2 | Vague 3 (mesuré) | Verdict |
|---|---|---|---|---|---|
| U1 | « Les boutons après le titre » (T3) | réussite complète chez **au moins 4 sur 5**, sans aide de niveau 2 ou 3 ; et au moins 3 de ces réussites **sans ouvrir le mode Animation** | 1 sur 5 (en mode Animation) | 4 sur 5 sans aide, dont 3 sans ouvrir le mode Animation | **atteint** |
| U2 | La scène de « La maison » (T4) | réussite complète ou partielle chez **au moins 2 designers sur 3** ; au moins 1 réussite complète sur 5 | 0 partielle, 0 complète | 0 partielle, 0 complète | manqué |
| U3 | « Les plats ne bougent pas » (T2) | réussite complète chez **au moins 4 sur 5** ; cause identifiée (T2-a) par au moins 4 sur 5 ; aucun déclencheur en double ni réglage perdu (« une à une ») dans le journal chez au moins 4 sur 5 | 2 sur 5 ; 3 sur 5 ; 3 sur 5 | 3 sur 5 ; 4 sur 5 ; 4 sur 5 | manqué (2 volets sur 3) |
| U4 | Rejouer à chaque passage, arrivée qui dépasse (T4) | critère C6 rempli par **au moins 3 sur 5** ; au moins un chiffre avec dépassement (partie « chiffres » de C5) chez au moins 3 sur 5 | 0 et 0 | C6 chez 2 sur 5 ; dépassement chez 1 sur 5 | manqué |
| U5 | Débutants et mode Animation (T3, T4) | **aucun abandon** dont l'événement d'origine est dans le mode Animation | 2 (les deux débutants) | 1 abandon (P1-T3) | manqué |
| U6 | Désigner ce qui bouge (toutes) | sélection du texte ou de l'image contenus au lieu de l'élément voulu chez **au plus 2 participants** | 5 sur 5 | 1 participant | **atteint** |
| **N1** | À ne pas casser | T1 et T5 réussies par **5 sur 5** ; titre ralenti (T3-R1) par 5 sur 5 ; au moins 23 récits sur 25 sans écart matériel | 5, 5, 5 ; 24 | 5, 5, 5 ; 20 récits sur 25 | manqué (3 volets sur 4) |
| **N2** | Le site joue ce que l'éditeur annonce | aucun « éclair » (élément visible avant son apparition) dans les visites instrumentées ; aucune phrase de résumé contredite par le site | éclair dans 5 visites sur 5 | 0 éclair ; 1 phrase de résumé contredite | manqué (volet « éclair » atteint) |


**Vague 4** (16 et 17 septembre, `99fb42a`, lot 7) : U1 atteint (5 sur 5, 4 sans le mode Animation) ; U2 manqué (0 et 0) ; U3 atteint (5 sur 5 ; diagnostic 5 sur 5 ; journal sain 5 sur 5) ; U4 manqué (C6 chez 2, dépassement chez 5) ; U5 atteint (0 abandon) ; U6 atteint (0 participant) ; N1 manqué (5, 5, 5 ; 21 récits sur 25) ; N2 atteint (0 éclair, 0 phrase contredite). **5 atteints sur 8.** Détail : `docs/validation-animation-2026-09-vague4.md` § 2.

Règles de lecture : un critère est **atteint**, **manqué** ou **non mesurable** (données manquantes, invalidation) ; aucune reformulation après coup. Tout résultat est « simulé » et reste à confirmer avec de vraies personnes. Les deux fins au budget amplifiées par le dispositif en vague 2 sont corrigées par la règle de la capture double pour tous (section 5) ; ce changement est signalé dans le rapport de comparaison.

---

## 2. Principes de conception

1. **Garder ce qui marche** (rapport § 8) : le choix tout prêt qui pose d'office « quand il entre dans l'écran », la vitesse Rapide · Normale · Lente, la phrase de résumé, le retrait d'une boucle sans toucher à l'arrivée, le survol qui revient.
2. **Régler là où l'on pose l'effet.** Ce que 4 sur 5 ont cherché à côté de l'effet (après, attendre, quand, rejouer) se règle dans la rubrique « Animation » de l'élément, sans changer de mode.
3. **Une seule vérité.** Le panneau et la ligne de temps montrent la même chose : un « après » posé dans le panneau est un départ dans la ligne de temps de la même animation, et une attente est ce départ, pas un second délai caché (R5).
4. **Dire vrai sur l'élément sélectionné.** Un élément animé par un autre le dit (« Arrive avec « Plats » ») au lieu d'afficher « Aucune ».
5. **Les mots d'usage d'abord.** Pas de nouveau mot de structure dans le panneau ; « piste », « image-clé » restent au mode Animation, expliqués là.
6. **Pas de changement de modèle sans nécessité.** L'enchaînement utilise les pistes à cible d'élément qui existent déjà (§ 8.4) ; toute évolution du schéma passe par `docs/document-model.md` d'abord.

---

## 3. Lots

Chaque lot : tests d'abord, code, parcours vérifié dans l'éditeur par de vrais clics et sur le site publié, documents (`fonctionnel.md`, feuille de route), commit.

| Lot | Contenu | Problèmes | Critères visés |
|---|---|---|---|
| **0 · Défauts** ✅ | éclair avant l'apparition ; apparition et boucle sur le même élément ; phrase « un à un » sans décalage ; vitesse active lisible ; Entrée dans un champ chiffré ; « Tester sur le site » | constats 1, 2, 10 ; PR13, PR14, S15 | N2 |
| **1 · Enchaîner** ✅ | « Arrive : quand il entre dans l'écran · au chargement · après « … » · en même temps que « … » », attente, dans la rubrique « Animation » ; vitesse d'un élément enchaîné qui décale les suivants ; retrait qui referme l'enchaînement ; phrase de résumé de l'enchaînement. **Mini-test simulé T3 puis T4** (2 participants) avant de poursuivre | PR1, PR9 | U1, U2 |
| **2 · Animation existante** ✅ | « Arrive avec « Plats » » sur un élément animé par un parent, et lien vers lui ; changer le moment et « une seule fois / à chaque passage » là où on les lit, sans doublon ni perte du détail ; inventaire qui dit la page | PR3, PR12, PR7, PR4, perte de « une à une » | U3, U4 |
| **3 · Dépasser, échelonner** ✅ | apparitions tout prêtes qui dépassent leur place ; enchaîner les éléments répétés (« les enfants un à un » repérable sur le bloc qui les contient) | PR8, PR6 | U2, U4 |
| **4 · Mode Animation abordable** ✅ | ouverture sur l'état visible ; ce que règle chaque zone dit à l'arrivée, y compris depuis le panneau (constat 11 : l'encart « Comment ça marche » n'y est pas montré) ; cliquer un autre élément fait choisir entre ouvrir son animation et l'ajouter | PR2, PR5, R10 | U5 |
| **5 · Désigner et composants** ✅ | un clic désigne l'élément (bouton, carte, occurrence de composant), un double-clic va dedans ; portée d'un réglage de composant dite | PR10, PR11, S1 | U6 |
| **6 · Validation** ✅ | test simulé complet (section 5), rapport avant / après | — | tous |

---

## 4. Journal des lots

### Lot 0 · défauts (14 septembre)
- **Éclair** (constat 1) : le script retirait l'animation CSS en pause dès le chargement, ce qui rendait l'élément visible jusqu'à son entrée dans l'écran. Il ne la retire plus qu'à l'entrée, dans la même tâche que le lancement des pistes. Vérifié : titre « Quelques plats signature » à opacité 0 avant son entrée (les visites de la vague 2 mesuraient 1). 4 tests du script.
- **Apparition et boucle sur le même élément** (trouvé en écrivant les tests) : la boucle au chargement s'arrêtait à l'entrée dans l'écran, l'animation CSS commune étant retirée ; elle est reprise au même temps par le script. À chaque passage, la sortie rend la main au CSS (état de départ) ; une apparition « une seule fois » ne se rejoue plus quand une autre du même élément se rejoue.
- **Phrase « un à un »** (constat 2) : sans décalage, « les enfants de « Plats » ensemble ».
- **Vitesse** (PR14) : dans l'état de départ de T3, la durée du titre (500 ms) ne correspondait à aucune des trois vitesses, **aucune option n'était donc active** ; les participants ne pouvaient pas la voir. L'option active est désormais encadrée, les libellés ne sont plus tronqués (la ligne prend toute la largeur), et une durée réglée à la main s'affiche « Sur mesure : 500 ms ». La ligne n'est plus un `<label>` (un clic dans la marge pouvait activer « Rapide »).
- **Entrée dans un champ chiffré** (PR13, constat 10) : **artefact du dispositif**. La touche « Return » de l'outil de navigateur envoie une touche vide ; « Enter » valide et quitte le champ, comme le dit le code. Correction du dispositif pour la validation : les consignes d'outil des participants nomment la touche « Enter ».
- **« Tester sur le site » ouvert en haut de page** (S15) : l'Aperçu attend 400 ms, place l'élément sous l'écran, puis le fait défiler 700 ms plus tard ; une capture prise dans cette seconde montre le haut de la page. Cause probable : moment de la capture ; pas de changement.
- **Encart « Comment ça marche »** (constat 11) : reporté au lot 4, avec l'arrivée dans le mode Animation.

### Lot 1 · enchaîner (14 septembre)
- **Modèle** (`packages/model/src/appearance.ts`, 18 tests) : lecture de l'apparition d'un élément où qu'elle soit (sur lui, ou piste d'une animation lancée par un autre élément de la page), de son préréglage (décalé et mis à l'échelle), de sa vitesse, de ce qui la fait démarrer (lui-même, après, en même temps, avec l'élément qui lance) et de son délai ; réglages qui gardent l'enchaînement (ce qui part avec ou après un élément suit ses changements ; retirer referme). Pas de changement de schéma.
- **Rubrique « Animation »** (Écriture et Design) : Apparition · Vitesse · **Démarre** · **Délai** · **Rejouer** · phrase de résumé · détail. Phrase des enchaînements : « Au chargement de la page : Titre 1 « … » (fondu en montant) en 1 120 ms, puis « Réserver une table » (fondu en montant) de 1 120 à 1 620 ms et « Voir la carte » … ».
- **Vérifié dans l'éditeur** sur l'état de départ de T3 (panneau du navigateur masqué : sélection et choix déclenchés dans la page, pas à la souris) : « Réserver une table » démarre après le titre, « Voir la carte » en même temps, titre passé en « Lente » : boutons de 1 120 à 1 620 ms. Sur le site : titre `1.12s`, boutons `animation-delay: 1.12s`, remplissage `both` (cachés jusqu'à leur départ). Critères R1 à R4 de T3 remplis par cette configuration.
- **Reste pour U2** (scène de T4) : les trois chiffres sont des occurrences du composant « Chiffre clé » ; un clic sélectionne le texte du composant, pas l'occurrence, et une occurrence ne peut pas porter d'animation au rendu (lots 3 et 5).

### Lots 2 à 5 (15 septembre)
- **Lot 2 · animation existante** : « Avec « Plats » » et la phrase de ce qui fait arriver l'élément, au lieu d'« Aucune », avec « Régler sur « Plats » » (`inheritedAppearance`, 3 tests) ; le moment se change par « Démarre » sans perdre « une à une » ; « une à une » n'est plus coché quand les cartes partent ensemble (état de départ de T2) ; « Animations du site » rangées par page, changement de page signalé.
- **Lot 3 · dépasser, échelonner** : « Montée avec rebond », « Zoom avec rebond » ; une occurrence de composant peut apparaître et être visée par une piste (rendu : la racine du composant porte la classe, les déclencheurs et la marque de l'occurrence ; 1 test, 4 attentes de classes mises à jour) ; « Démarre : quand « La maison » entre dans l'écran » (`within`, 1 test) pour lancer toute une scène par sa section.
- **Lot 4 · mode Animation** : apparition ouverte sur son état visible ; « Comment lire cet écran » sous la scène ; élément sélectionné hors de l'animation ouverte : « Voir ses animations » ou « L'ajouter à cette animation ».
- **Lot 5 · désigner et composants** : sélection des éléments composés au premier clic, descente au clic suivant (`compoundIds`, `pickSelection`, 2 tests) ; avertissement de portée dans un composant.
- **Vérifié dans l'éditeur** (événements déclenchés dans la page, panneau masqué) : T2, un clic sur la photo d'une carte sélectionne « Carte plat », qui affiche « Avec « Plats » » et « Arrive avec « Plats » : Au chargement de la page… » ; « Régler sur « Plats » » montre « Démarre : dès l'ouverture de la page ». T4, un clic sur « 38 » sélectionne l'occurrence « Couverts » ; la scène complète composée depuis la rubrique (photo lancée par « La maison », titre, paragraphe, trois chiffres « Zoom avec rebond » l'un après l'autre, tout en « Rapide », « à chaque passage ») : « Quand « La maison » entre dans l'écran : … puis « Producteurs » (zoom avec rebond) de 2 220 à 2 700 ms, à chaque passage. » Sur le site : un seul déclencheur à l'entrée dans l'écran sur la section, `once: false`, six pistes de 0 à 2 700 ms, courbe `cubic-bezier(.34,1.56,.64,1)` sur les chiffres, racines d'occurrence `n-rk_root n-rh_stat2` en pause avec leur délai. Cette configuration remplit C1 à C6 de T4.

### Revue de code et corrections (15 septembre)
- **Revue** (agent, `git diff 321215c 6a7b359`, 16 défauts établis en rejouant les scénarios sur le vrai code) : gestes qui détruisaient une scène (poser un effet sur la section, « Aucune » puis un effet sur le titre, retirer le déclencheur, supprimer l'élément qui lance), enchaînement déduit des positions (retirer un élément « en même temps » avançait la suite ; régler un élément en déplaçait d'autres ; « en même temps que » + délai impossible à régler), élément enchaîné avec sa propre boucle (éclair puis boucle arrêtée), rejeu de toutes les occurrences d'un composant, déclencheur « au chargement » pour une section, réordonnancement sans retour, style et animations d'occurrence écrasés par la racine, éléments d'emplacement invisibles, sélection (pioche, contour d'occurrence, survol, voisins, image vide), libellés trompeurs, classes d'export.
- **Correction de fond** : l'enchaînement est **enregistré** dans le modèle (`Track.start` : `after` / `with` + `gap`, spécification § 8.4) et les temps en découlent (`layoutTracks`, `planTracks`) ; `appearance.ts` réécrit sur cette base ; suppression sûre (`planRemoveNode`, `planForgetNodes`), détachement qui reporte les animations. Rendu : règles `animation` réunies par cible sur tout le site, occurrences de composant en `.racine.occurrence`, script qui ne retire du CSS que les noms qu'il joue, pistes limitées à leur occurrence dans un composant, emplacements parcourus. Éditeur : sélection affinée, « + N » et croix protégée sur les suites, départ enchaîné affiché dans la ligne de temps, sélection gardée sur l'élément enchaîné, effet d'une carte réglé sur sa liste.
- **Tests** : 20 ajoutés (modèle 14, rendu 5, éditeur 1) et 4 réécrits (script du site, sélection), plus des attentes de classes mises à jour ; `npm test`, `typecheck`, `lint` au vert. Non vérifié dans le navigateur : la fenêtre de l'application était réduite (addendum 3, point 8).
- **Limites restantes** : fin d'une vue sans limite (une carte comptée) ; texte d'un composant dont l'occurrence apparaît (« Aucune ») ; suite lancée par plusieurs déclencheurs (non proposée comme point de départ).

### Lot 6 · validation (15 et 16 septembre)

- **Vague 3 menée** sur `08a6d1e` : mêmes personas, mêmes missions, mêmes critères, même ordre de passage (P3, P1, P5, P2, P4) ; cinq séances complètes, cinq observateurs indépendants, doubles codages de P3 et P5, synthèse à l'aveugle, puis comparaison avant / après. Rapport : `docs/validation-animation-2026-09.md` ; pièces dans `docs/validation-animation-2026-09/`.
- **Dispositif réellement employé** (addendum 3) : le navigateur intégré à l'application s'est révélé inutilisable dès que sa fenêtre n'est pas au premier plan (document caché, captures déformées, clics décalés : T1 de P3 invalidée). Les séances sont passées sur un **Chrome sans fenêtre** piloté par le protocole DevTools, écran 1 440 × 900, captures 800 × 500. Conséquence : la capture attend le rendu, donc **capture simple** pour tous au lieu de la capture double prévue, et la loupe agrandit réellement. Deux autres incidents : une mise en veille de la machine (T1 de P5 invalidée, séance reprise de zéro) et une coupure réseau pendant T5 de P5 (reprise sur place avec une note technique neutre).
- **Résultat** : 3 critères atteints sur 8 (U1, U6, et le volet « éclair » de N2). T3 passe de 1 à 4 réussites complètes, T2 de 2 à 3, T1 et T5 restent à 5 sur 5, aucune aide donnée en 25 missions. T4 reste en échec chez 5 sur 5, avec une **couverture en retrait** (14 éléments animés sur 30 contre 24) : le lot 5 a supprimé le raccourci involontaire par lequel trois participants animaient les trois chiffres en réglant le composant sans le savoir.
- **Défaut rendu visible** : la touche Entrée, non transmise en vague 2 (PR13 classé artefact), l'est en vague 3 ; elle révèle que `NumberInput` valide deux fois (Entrée appelle `commit()` puis `blur()`, qui rappelle `commit()`). Un Ctrl+Z n'annule alors que le doublon, une piste peut être corrompue, et un abandon en découle.
- **Suite** : lot 7 décrit dans `docs/validation-animation-2026-09.md` § 6 — d'abord les défauts (double validation, choix sans effet, croix identiques, zoom masqué), puis l'alignement du mode Animation sur la rubrique du panneau, puis ce qui manque pour U2 et U4 (désigner un bloc intermédiaire, réduire le nombre de gestes par élément).

---


### Lot 7 · validation, vague 4 (16 et 17 septembre)

- **Vague 4 menée** sur `99fb42a` (lot 7 complet) : mêmes personas, missions, critères et ordre de passage ; cinq séances en parallèle (un onglet par participant), sept codages (cinq observateurs, doubles codages de P3 et P5), synthèse à l'aveugle, comparaison vague 3 / vague 4. Rapport : `docs/validation-animation-2026-09-vague4.md` ; pièces dans `docs/validation-animation-2026-09-vague4/`.
- **Résultat** : **5 critères atteints sur 8** (U1, U3, U5, U6, N2 ; 3 en vague 3). 20 réussites complètes, 0 partielle, 5 échecs ; T2 et T3 passent à 5 sur 5 ; aucune aide, aucun abandon, aucune collatérale. T4 reste en échec chez 5 sur 5 (U2, U4 manqués), avec une couverture en hausse (24 éléments animés sur 30 contre 14) ; N1 manqué de deux récits (21 sur 25).
- **Ce qui commande T4** : désigner le groupe des chiffres (4 sur 5 n'y arrivent pas ; ⌥-clic non découvert) et voir la scène entière (aucune vue, aucune durée totale). Les trois aides du lot 7 pour composer n'ont été trouvées par personne.
- **Défauts nouveaux, corrigés le 19 septembre (`dd29bcb`)** : la scène collante de la ligne de temps recouvrait les réglages de la piste dès cinq pistes ; les interrupteurs du déclencheur se lisaient à l'envers ; le triangle « Jouer » n'avait pas de mot.
- **Suite** : lot 8 décrit dans `docs/validation-animation-2026-09-vague4.md` § 6 (désigner le groupe depuis un enfant, vue d'ensemble de la scène, faire découvrir ce qui existe, un mot par mot).

## 5. Test simulé de validation

- Même protocole v1.0 (missions, critères, grille, hypothèses), mêmes personas, même ordre des tâches et même ordre de passage que la vague 2 ; nouvelles instances, nouvelles copies du site, sur la version livrée par les lots 0 à 5.
- Corrections du dispositif, décidées ici : **capture double pour les cinq participants** (une capture double compte une action) ; loupe à règle unique ; onglet simulé pour l'Aperçu ; aides et reprises comme en vague 2.
- Observateurs sans les hypothèses ni les critères de la section 1 ; synthèse à l'aveugle ; puis comparaison avant / après sur les critères U1 à U6, N1 et N2, et sur les problèmes PR1 à PR14.
- Si un critère est manqué : le rapport dit lequel, pourquoi (codage), et le lot est repris avant toute autre fonctionnalité.

**Ce qui s'est réellement passé** (15 et 16 septembre) : voir le journal du lot 6. Le dispositif a changé en cours de route (navigateur de test sans fenêtre, donc capture simple au lieu de la capture double prévue), trois incidents sont consignés dans l'addendum 3, et deux missions ont été invalidées puis reprises. Cinq critères sur huit sont manqués : le lot 7 les reprend avant toute autre fonctionnalité, conformément à cette règle.
