# Plan · corriger le parcours d'animation par l'usage (septembre 2026)

Suite des tests utilisateurs simulés du 14 septembre (`docs/tests-simules-animation-2026-09.md`). Décidé avec Antoine le 14 septembre 2026 : l'« après » se fait en **enchaînant dans une même animation** (solution A) ; la validation se fait **par un nouveau test simulé** (vraies personnes plus tard).

Ce document est écrit **avant** toute conception. Les critères de la section 1 ne changent plus : si un lot ne les atteint pas, on revoit la conception, pas le critère.

---

## 1. Critères de réussite (pré-enregistrés)

Mesurés par le test simulé de validation (section 5), avec les **mêmes missions, les mêmes critères de réussite** (protocole v1.0, § 5, lus dans le site enregistré et par visite instrumentée) et les mêmes personas que la vague 2. Référence : vague 2 du 14 septembre (version `fc1764d`).

| # | Usage | Critère | Vague 2 |
|---|---|---|---|
| U1 | « Les boutons après le titre » (T3) | réussite complète chez **au moins 4 sur 5**, sans aide de niveau 2 ou 3 ; et au moins 3 de ces réussites **sans ouvrir le mode Animation** | 1 sur 5 (en mode Animation) |
| U2 | La scène de « La maison » (T4) | réussite complète ou partielle chez **au moins 2 designers sur 3** ; au moins 1 réussite complète sur 5 | 0 partielle, 0 complète |
| U3 | « Les plats ne bougent pas » (T2) | réussite complète chez **au moins 4 sur 5** ; cause identifiée (T2-a) par au moins 4 sur 5 ; aucun déclencheur en double ni réglage perdu (« une à une ») dans le journal chez au moins 4 sur 5 | 2 sur 5 ; 3 sur 5 ; 3 sur 5 |
| U4 | Rejouer à chaque passage, arrivée qui dépasse (T4) | critère C6 rempli par **au moins 3 sur 5** ; au moins un chiffre avec dépassement (partie « chiffres » de C5) chez au moins 3 sur 5 | 0 et 0 |
| U5 | Débutants et mode Animation (T3, T4) | **aucun abandon** dont l'événement d'origine est dans le mode Animation | 2 (les deux débutants) |
| U6 | Désigner ce qui bouge (toutes) | sélection du texte ou de l'image contenus au lieu de l'élément voulu chez **au plus 2 participants** | 5 sur 5 |
| **N1** | À ne pas casser | T1 et T5 réussies par **5 sur 5** ; titre ralenti (T3-R1) par 5 sur 5 ; au moins 23 récits sur 25 sans écart matériel | 5, 5, 5 ; 24 |
| **N2** | Le site joue ce que l'éditeur annonce | aucun « éclair » (élément visible avant son apparition) dans les visites instrumentées ; aucune phrase de résumé contredite par le site | éclair dans 5 visites sur 5 |

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
| **6 · Validation** | test simulé complet (section 5), rapport avant / après | — | tous |

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

## 5. Test simulé de validation

- Même protocole v1.0 (missions, critères, grille, hypothèses), mêmes personas, même ordre des tâches et même ordre de passage que la vague 2 ; nouvelles instances, nouvelles copies du site, sur la version livrée par les lots 0 à 5.
- Corrections du dispositif, décidées ici : **capture double pour les cinq participants** (une capture double compte une action) ; loupe à règle unique ; onglet simulé pour l'Aperçu ; aides et reprises comme en vague 2.
- Observateurs sans les hypothèses ni les critères de la section 1 ; synthèse à l'aveugle ; puis comparaison avant / après sur les critères U1 à U6, N1 et N2, et sur les problèmes PR1 à PR14.
- Si un critère est manqué : le rapport dit lequel, pourquoi (codage), et le lot est repris avant toute autre fonctionnalité.
