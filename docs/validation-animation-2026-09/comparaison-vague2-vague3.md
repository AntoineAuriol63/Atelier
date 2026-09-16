# Comparaison avant / après · vagues 2 et 3 de l'étude « Faire bouger un site »

Rapport de comparaison rédigé après les deux synthèses, conformément à `docs/plan-usage-animation-2026-09.md` § 5. Vague 2 : 14 septembre 2026, version `fc1764d`. Vague 3 : 15–16 septembre 2026, version `08a6d1e` (lots 0 à 5 et revue de code). Mêmes personas, mêmes missions, mêmes critères de réussite (protocole v1.0 § 5), même ordre de passage (P3, P1, P5, P2, P4) et même ordre des tâches.

**Tout est simulé.** Cinq agents d'un même modèle par vague, deux vagues. Aucun résultat n'est « confirmé » : les formulations retenues sont « compatible avec les données de ces deux vagues » ou « non établi ». Les effectifs sont donnés en nombre de participants ou d'occurrences, jamais en pourcentage, sauf pour le seul critère dont le seuil est lui-même une proportion (H3, et le volet « 23 récits sur 25 » de N1, donné en effectif).

Abréviations de source : **S2** = `UT/synthese.md` ; **S3** = `UT/synthese3.md` ; **add2**, **add3** = `UT/addendum-2.md`, `UT/addendum-3.md` ; **c2** = `UT/constats-preparateur.md` ; **c3** = `UT/constats3-preparateur.md` ; **f3-pN** = `UT/fiches3/fiche-lecture-pN.md` ; **f2-pN** = `UT/fiches/fiche-lecture-pN.md` ; **obs3-pN** = `UT/observations3/observation-pN.md` ; **plan § 1** = section 1 du plan (critères pré-enregistrés).

---

## 1. Verdict en dix lignes

1. **Ce qui a franchement progressé** : dire « après tel élément » sans quitter le panneau. T3 passe de 1 réussite complète sur 5 à 4 sur 5, dont 3 obtenues sans jamais ouvrir le mode Animation, sans aucune aide, et avec 0 fausse piste contre 6 en vague 2 (S2 § 3 et § 4.1 ; S3 § 3 et § 4.1).
2. **Deuxième progrès net** : plus aucune aide demandée ni donnée en 25 tâches (contre 3 aides en vague 2), 17 tâches finies sur déclaration « terminé » contre 12, et 6 fins au budget contre 10 (S2 § 4.1 ; S3 § 11.1 et § 3).
3. **Troisième progrès, mesuré hors comportement** : l'« éclair » avant l'apparition a disparu de toutes les visites instrumentées (5 visites de T1 sur 5 le montraient en vague 2 ; aucune en vague 3) ; et la sélection du texte ou de l'image contenus tombe de 5 participants à 1 (c2 pt 1 ; f3-p1..p5 ; S2 PR10 ; c3 pt 4).
4. **Ce qui n'a pas bougé** : T4. Échec chez 5 sur 5 dans les deux vagues, 0 réussite complète, 0 réussite partielle, aucun participant n'obtenant l'ordre demandé (C3) ni l'échelonnement des chiffres (C3b) dans aucune des deux vagues.
5. **Ce qui n'a pas bougé non plus** : atteindre un bloc intermédiaire. Le conteneur des trois chiffres reste inatteignable au clic comme par le fil d'Ariane (c3 pt 13), et c'est ce qui clôt T4 chez P5 en vague 3 comme chez P2 en vague 2.
6. **Ce qui a empiré, premier point** : les récits. 5 récits sur 25 en écart matériel avec le site enregistré en vague 3, contre 1 sur 25 en vague 2 — donc N1 manqué. La comparaison est fragile : une lecture stricte des trois cas limites arbitrés en vague 2 en aurait donné 4 sur 25 (S2 § 4.3 ; S3 § 4.3).
7. **Ce qui a empiré, deuxième point** : changer le moment d'une animation existante. Le problème passe de gravité 2 chez 2 designers (PR12) à gravité 4 chez 3 participants et 2 échecs de T2 (P-2). La cause a changé de place : le réglage marche en un clic depuis le panneau de droite (P2, P5) et reste introuvable depuis le mode Animation (P1, P4).
8. **Ce qui a empiré, troisième point** : en T4, 14 des 30 éléments visés bougent en vague 3 contre 24 sur 30 en vague 2, et C1 (« tous les éléments bougent ») tombe de 3 participants sur 5 à 0 sur 5. La correction de la sélection (lot 5) a supprimé le raccourci involontaire par lequel trois participants animaient les trois chiffres d'un coup sans le savoir.
9. **Un défaut grave est apparu parce qu'on l'a rendu visible** : la double validation d'un champ chiffré (Entrée déclenche deux opérations identiques) ; elle coûte un abandon et corrompt une piste. Elle existait dans le code en vague 2 mais le dispositif n'envoyait pas la touche : PR13 avait été classé « artefact du dispositif » et rien n'avait été corrigé dans le produit (plan § 4, lot 0 ; c3 pts 1, 8, 10).
10. **Au total** : la version corrigée est meilleure pour l'usage simple et pour le rythme (T1, T3, T5, et T2 en partie) et n'est pas meilleure pour la mise en scène (T4), où elle est même en retrait sur la couverture des éléments. Trois critères pré-enregistrés sur huit sont atteints. Verdict compatible avec les données de ces deux vagues, à confirmer avec de vraies personnes et un vrai navigateur.

---

## 2. Tableau des critères pré-enregistrés

Les critères sont recopiés de `plan § 1` sans reformulation. « Atteint » exige que **tous** les volets d'une ligne soient satisfaits.

| # | Critère (texte pré-enregistré) | Vague 2 | Vague 3 (mesuré) | Verdict | Lecture |
|---|---|---|---|---|---|
| **U1** | « Les boutons après le titre » (T3) : réussite complète chez **au moins 4 sur 5**, sans aide de niveau 2 ou 3 ; et au moins 3 de ces réussites **sans ouvrir le mode Animation** | 1 sur 5 (en mode Animation) | **4 sur 5** (P2, P3, P4, P5 ; P1 en réussite partielle), **aucune aide dans la vague** ; **3** de ces 4 sans ouvrir le mode Animation (P2, P3, P5) | **atteint** | C'est le seul critère d'usage pleinement atteint. Trois participants passent par le libellé tout prêt « démarre après Titre 1 » dans la rubrique Animation du panneau (journaux : f3-p2 T3 v2-v3, f3-p3 T3 v2-v3), P5 par deux délais chiffrés dans la même rubrique (f3-p5 T3), P4 seul par la ligne de temps puis le champ « Délai » (f3-p4 T3). Les observateurs de P2 et P5 attestent que le mode Animation n'a **jamais** été ouvert de toute leur séance (obs3-p2 § 132 et 292, obs3-p5 § 234) ; pour P3, le chemin est décrit comme constant par le panneau de droite et aucun accès au mode n'est codé (obs3-p3 § 1 et § 434). |
| **U2** | La scène de « La maison » (T4) : réussite complète ou partielle chez **au moins 2 designers sur 3** ; au moins 1 réussite complète sur 5 | 0 partielle, 0 complète | **0 partielle, 0 complète** (P2 E, P4 E, P5 E ; P1 E, P3 E) | **manqué** | Inchangé au niveau du statut, et **en retrait sur le détail** : éléments visés effectivement animés, 14 sur 30 en vague 3 contre 24 sur 30 en vague 2 ; C1 rempli 0 fois contre 3 (f3-p1..p5 T4 ; f2-p1, f2-p3, f2-p5 T4). Voir § 6, point « régression C1 ». |
| **U3** | « Les plats ne bougent pas » (T2) : réussite complète chez **au moins 4 sur 5** ; cause identifiée (T2-a) par au moins 4 sur 5 ; aucun déclencheur en double ni réglage perdu (« une à une ») dans le journal chez au moins 4 sur 5 | 2 sur 5 ; 3 sur 5 ; 3 sur 5 | **3 sur 5** (P1, P2, P5) ; **4 sur 5** (P1, P2, P4, P5 justes ; P3 faux) ; **4 sur 5** (seule P1 laisse un déclencheur en double) | **manqué** (2 volets sur 3 atteints) | Les deux volets atteints le sont franchement ; le premier volet manque d'une unité. Détail du 3ᵉ volet : P1 pose un `inView` sur le modèle de carte tout en laissant en place le `load` de la liste (f3-p1 T2, c3 pt 6) ; P2 et P5 changent le déclencheur en **une seule opération** (f3-p2 T2 v1, f3-p5 T2 v1) ; P3 n'écrit rien (journal vide) ; P4 ajoute puis retire deux pistes et rend le site à son état de départ. **Réserve** : le volet « réglage perdu (« une à une ») » est atteint en partie parce que la correction du lot 0 a supprimé la mention « un à un » de l'état de départ (le panneau y lit désormais « les enfants de « Plats » ensemble », f3-p1..p5 T2) : il n'y a plus de réglage à perdre. |
| **U4** | Rejouer à chaque passage, arrivée qui dépasse (T4) : critère C6 rempli par **au moins 3 sur 5** ; au moins un chiffre avec dépassement (partie « chiffres » de C5) chez au moins 3 sur 5 | 0 et 0 | **C6 : 2 sur 5** (P2, P5) ; **chiffre avec dépassement : 1 sur 5** (P3) | **manqué** | Progression réelle mais sous le seuil sur les deux volets. Le réglage « Rejouer : à chaque passage » est **trouvé et posé par 3 participants** (P2, P3, P5, tous depuis la rubrique du panneau de droite, S3 P-10), mais le préparateur ne retient C6 que chez P2 et P5 : chez P3, `once=false` porte bien la chaîne principale, tandis que le chiffre « Années » garde une animation séparée « une seule fois » (f3-p3 T4). Le dépassement existe désormais en préréglage (« Montée avec rebond », lot 3) : P3 l'applique à « Années » et la visite mesure y 28 → −2,7 → 0 px, soit un dépassement réel (f3-p3 T4). Les quatre autres n'atteignent aucun chiffre. |
| **U5** | Débutants et mode Animation (T3, T4) : **aucun abandon** dont l'événement d'origine est dans le mode Animation | 2 (les deux débutants) | **1 abandon** dont l'événement d'origine est dans le mode Animation (P1-T3) ; second abandon de la vague (P3-T4) d'origine étrangère au mode | **manqué** | Divisé par deux, pas supprimé. L'origine de l'abandon de P1 est double et entièrement située dans le mode Animation : le canevas montre le bouton à la tête de lecture, donc invisible, et elle le croit supprimé (P-6, f3-p1 T3, capture 011) ; son Ctrl+Z n'annule ensuite que le doublon de validation (P-3). L'abandon de P3 en T4 tient à la répétition élément par élément depuis le panneau de droite (P-1, obs3-p3 L32), hors du mode. |
| **U6** | Désigner ce qui bouge (toutes) : sélection du texte ou de l'image contenus au lieu de l'élément voulu chez **au plus 2 participants** | 5 sur 5 | **1 participant** (P3, T2 : un clic sur la 3ᵉ carte sélectionne l'« Image » intérieure) | **atteint** | Le résultat est cohérent avec la correction annoncée (lot 5 : premier clic sur l'élément composé, descente au clic suivant) et avec le seul défaut résiduel décrit par le préparateur : cliquer une carte voisine du même modèle alors qu'une carte est sélectionnée descend d'un niveau (c3 pt 4 ; obs3-p3 L15 et § 381 ; f3-p3 T2). En vague 2, le même problème comptait 14 occurrences de gravité 2 et 2 de gravité 1 chez les cinq participants (S2 PR10). **À ne pas confondre** avec le problème voisin qui subsiste : atteindre un **bloc intermédiaire** (P-7, 3 participants) ne relève pas du texte ou de l'image contenus. |
| **N1** | À ne pas casser : T1 et T5 réussies par **5 sur 5** ; titre ralenti (T3-R1) par 5 sur 5 ; au moins 23 récits sur 25 sans écart matériel | 5, 5, 5 ; 24 | **T1 : 5 sur 5** ; **T5 : 5 sur 5** ; **T3-R1 : 5 sur 5** ; **20 récits sur 25 sans écart matériel** | **manqué** (3 volets sur 4 atteints) | Rien n'est cassé sur les tâches simples : T1 et T5 restent en réussite complète chez les cinq, R1 de T3 est rempli chez les cinq (durées 1 120 à 1 500 ms, f3-p1..p5 T3). Le volet récits échoue : 3 échecs ignorés (P3-T2, P3-T4, P4-T4) et 2 réussites non comprises (P1-T2, P5-T3) (S3 § 4.3). Les deux doubles codages de la vague 3 confirment les 5 verdicts sans en ajouter ni en retirer (S3 § 5.1). |
| **N2** | Le site joue ce que l'éditeur annonce : aucun « éclair » (élément visible avant son apparition) dans les visites instrumentées ; aucune phrase de résumé contredite par le site | éclair dans 5 visites sur 5 | **éclair : 0 visite** ; **phrase de résumé contredite : 1 cas attesté** (P1-T5) | **manqué** (volet « éclair » atteint, volet « phrase de résumé » manqué) | Le volet mesuré en vague 2 est atteint sans réserve : toutes les visites instrumentées de la vague 3 relèvent l'élément à opacité 0 **avant** son entrée (f3-p1 T1 et T2, f3-p2 T1 et T2, f3-p3 T1 « pas d'éclair », f3-p4 T1, f3-p5 T1 et T2). Le second volet achoppe sur un cas : sur la pastille de P1, la pulsation en attente impose `scale(1)` et masque le `scale(0.92 → 1)` du zoom, de sorte que la phrase « Au chargement de la page, après 300 ms : zoom en 500 ms » n'est jouée qu'en opacité (f3-p1 T5 ; c3 pt 7). Le préparateur juge ce défaut « probablement présent dès l'état de départ et en vague 2 (même site) ; à vérifier » : ce n'est donc pas une régression, c'est un défaut que N2 attrape et que la vague 2 n'avait pas mesuré. **Arbitrage signalé** : une lecture plus indulgente (l'arrivée reste visible en opacité, seule la composante de taille manque) conclurait « atteint » ; j'ai retenu la lecture littérale du critère. |

**Compte** : 3 atteints (U1, U6, et le volet « éclair » de N2 si on le lit seul), 5 manqués (U2, U3, U4, U5, N1, N2), 0 non mesurable.

**Critère atteint grâce à un artefact du dispositif** : aucun des trois n'est obtenu par un artefact. Une réserve de dispositif joue en revanche **en défaveur** de U2 et de U4 : le budget de 40 actions compte les captures (17 captures sur 40 chez P1 en T2, 17 sur 40 chez P4, 17 sur 38 chez P5, S3 B14) et les listes déroulantes rendues dans la page coûtent à P2 17 de ses 44 actions de T4 (S3 S-1). Et une réserve joue **en faveur** de U3, volet « une à une » : voir la note du tableau.

---

## 3. Statuts par mission, avant / après

### 3.1 Les 25 statuts de chaque vague

C = réussite complète, P = partielle, E = échec. Cellule : statut · mode de fin.

| | T1 v2 → v3 | T2 v2 → v3 | T3 v2 → v3 | T4 v2 → v3 | T5 v2 → v3 |
|---|---|---|---|---|---|
| **P1** (débutante) | C terminé → **C terminé** | E terminé → **C budget** | P abandon (aide 1) → **P abandon** | E abandon → **E budget** | C terminé → **C terminé (40ᵉ action)** |
| **P2** (designer) | C terminé → **C terminé** | C budget → **C terminé** | P budget → **C terminé** | E budget (aides 1 et 2) → **E budget dépassé (44)** | C terminé → **C terminé** |
| **P3** (débutant) | C terminé → **C terminé** (reprise après INV) | E budget → **E terminé déclaré** | P abandon → **C terminé** | E terminé → **E abandon (38)** | C terminé → **C terminé** |
| **P4** (designer) | C terminé → **C terminé** | E budget → **E budget** | C terminé → **C terminé** | E budget → **E budget** | C budget → **C terminé** |
| **P5** (designer) | C terminé → **C terminé** (reprise après INV) | C budget → **C terminé** | P budget → **C terminé** | E budget → **E budget (38)** | C terminé → **C terminé** |

Sources : S2 § 3 ; S3 § 3. Deux tâches de la vague 3 sont invalidées et exclues du dénominateur (premières T1 de P3 et de P5, add3 pts 8 et 12) ; leurs reprises conservent la valeur de découverte à froid (11.6).

### 3.2 Totaux par mission

| Mission | Vague 2 (C · P · E) | Vague 3 (C · P · E) | Mouvement |
|---|---|---|---|
| T1 | 5 · 0 · 0 | 5 · 0 · 0 | stable |
| T2 | 2 · 0 · 3 | 3 · 0 · 2 | +1 réussite |
| T3 | 1 · 4 · 0 | 4 · 1 · 0 | **+3 réussites** |
| T4 | 0 · 0 · 5 | 0 · 0 · 5 | stable |
| T5 | 5 · 0 · 0 | 5 · 0 · 0 | stable |
| **Total** | **13 · 4 · 8** | **17 · 1 · 7** | **+4 réussites complètes** |

### 3.3 Totaux par public

| | Vague 2 | Vague 3 |
|---|---|---|
| Débutants (P1, P3), 10 tâches | 4 C · 2 P · 4 E | **6 C · 1 P · 3 E** |
| Designers (P2, P4, P5), 15 tâches | 9 C · 2 P · 4 E | **11 C · 0 P · 4 E** |
| Réussites complètes T1 · T2 · T3 · T4 · T5, débutants | 2 · 0 · 0 · 0 · 2 | **2 · 1 · 1 · 0 · 2** |
| Réussites complètes T1 · T2 · T3 · T4 · T5, designers | 3 · 2 · 1 · 0 · 3 | **3 · 2 · 3 · 0 · 3** |

### 3.4 Lecture prudente

- Les gains portent sur **deux missions et deux publics** : T3 (+3) et T2 (+1). Ils vont dans le sens des lots livrés (lot 1 pour T3, lot 2 pour T2), ce qui rend l'explication plausible sans l'établir : le chemin emprunté est chaque fois celui que le lot a créé (« démarre après » dans la rubrique pour T3, encart d'héritage et lien « Régler sur « Plats » » pour T2 ; f3-p2, f3-p3, f3-p5 ; S3 § 10).
- **Cinq participants par vague.** Un statut qui bascule pèse une unité sur cinq ; +3 sur T3 est le plus gros mouvement observable et reste, à cet effectif, un signal, pas une mesure de fréquence. Les deux vagues emploient des agents d'un même modèle (B4 en vague 2, B4 en vague 3) : « 4 sur 5 » signifie « convergence de cinq agents », pas « fréquent chez de vrais utilisateurs ».
- **Deux statuts stables cachent des mouvements contraires.** T4 reste 0 · 0 · 5 mais perd du terrain sur le détail (§ 2, U2). T5 reste 5 · 5 mais la seule façon dont l'arrivée de la pastille se voit, chez la participante qui garde la pulsation, est l'opacité (c3 pt 7).
- **Le public débutant progresse davantage que le public designer en proportion de ses tâches** (4 → 6 réussites sur 10, contre 9 → 11 sur 15), mais il porte aussi les deux abandons et deux des trois échecs ignorés de la vague 3. La lecture « les débutants s'en sortent mieux » serait fausse : ils réussissent plus et se trompent plus souvent sans le savoir.
- **Aucune vague ne produit de réussite en T4.** Deux vagues de cinq participants n'établissent pas qu'aucun designer réel n'y parviendrait ; elles établissent que, dans ces conditions de budget et de dispositif, dix passages n'ont produit ni réussite complète ni réussite partielle.

---

## 4. Métriques comparées

### 4.1 Tableau d'ensemble

| Mesure | Vague 2 | Vague 3 | Comparable ? |
|---|---|---|---|
| Statuts (C · P · E) | 13 · 4 · 8 | 17 · 1 · 7 | oui |
| Modes de fin | 12 terminé, 10 budget, 3 abandons | **17 terminé, 6 budget, 2 abandons** | oui |
| Aides données | 3 (niveau 1 ×2, niveau 2 ×1, dont une hors conditions) | **0** | oui |
| Blocages déclarés | 3 | **0** | oui |
| Écarts matériels des récits | 1 sur 25 (4 sur 25 en lecture stricte des cas limites) | **5 sur 25** | fragile, voir § 4.3 |
| Modifications collatérales dans un site final | 0 (après arbitrage) | **0** (5 COLL apparues, toutes remarquées et retirées) | oui |
| Tâches avec vérification en conditions de visiteur | 10 sur 25 | **11 sur 25** | oui |
| VERIF en T1 avant « J'ai terminé » | 2 sur 5 | **3 sur 5** | oui |
| Fausses pistes en T3 (occurrences, actions perdues) | 6 FP, 26 actions | **0 FP** | oui |
| Fausses pistes en T2 | 5 FP, 46 actions | 6 FP, ≈ 40 actions | oui |
| Fausses pistes en T4 | 2 FP, 15 actions | 2 FP, ≈ 10 actions | fragile (listes déroulantes) |
| Actions par tâche | deux régimes de comptage distincts | un régime unique | **non**, voir § 4.2 |

### 4.2 SEQ (difficulté déclarée, 1 très difficile à 7 très facile)

| | T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|---|
| Vague 2, valeurs (P3·P1·P5·P2·P4) | 6·5·6·6·5 | 2·4·2·3·2 | 2·2·2·3·6 | 3·1·2·1·2 | 5·6·6·5·5 |
| Vague 2, médiane | 6 | 2 | 2 | 2 | 5 |
| Vague 3, valeurs (P1·P2·P3·P4·P5) | 3·6·6·6·6 | 2·4·3·3·6 | 2·6·6·5·6 | 3·2·2·2·3 | 5·6·5·6·7 |
| Vague 3, médiane | **6** | **3** | **6** | **2** | **6** |

Le mouvement le plus net est **T3 : 2 → 6**, cohérent avec les statuts et avec l'absence de fausse piste. T4 est la seule mission dont la difficulté déclarée ne bouge pas (médiane 2 dans les deux vagues), ce qui est compatible avec le maintien de l'échec chez 5 sur 5. Réserve commune aux deux vagues : le SEQ est une mesure déclarative exposée à la complaisance (B3), lisible en comparaison interne, pas en valeur absolue.

### 4.3 Écarts matériels des récits : pourquoi la comparaison est fragile

- Vague 2 : **1 sur 25**, et ce seul écart (P2-T4) est un récit **contaminé** par une aide de niveau 2 donnée hors conditions (S2 § 3.2 et § 4.3). Trois cas limites (P4-T2, P5-T4, P1-T2) ont été **arbitrés sans écart** ; en les cotant en écart, la vague 2 en aurait 4 sur 25 (S2 § 8, ligne H3, lecture de sensibilité fournie par la synthèse elle-même).
- Vague 3 : **5 sur 25**, tous relevés sans aide ni parole hors script (A6 négatif dans les 25 tâches, S3 § 2), et les 10 récits doublement codés reçoivent le même verdict des deux codeurs (S3 § 5.1).
- **Conclusion prudente** : entre « 4 contre 5 » et « 1 contre 5 », l'écart réel entre les deux vagues n'est pas établi. Ce qui est établi, et compatible avec les données des deux vagues, c'est la **nature** des écarts : en vague 2, un seul, contaminé, chez un participant aidé ; en vague 3, trois échecs ignorés portés par les deux participants qui n'ont jamais regardé la page en conditions de visiteur (P3, P4), et deux réussites non comprises (S3 § 11.4).

### 4.4 Différences de dispositif qui interdisent ou fragilisent une comparaison

| Différence | Vague 2 | Vague 3 | Effet sur la comparaison |
|---|---|---|---|
| **Captures en retard d'une image** | P3, P1, P5 touchés ; P2 et P4 en capture double (add2 pt 12) | supprimé : le navigateur de test attend le rendu (add3 pt 11) | **Les comptes d'actions des deux vagues ne se comparent pas.** En vague 2 les actions de P3, P1 et P5 sont gonflées par des captures redondantes (32 à 38 actions perdues sur 162 chez P5) ; en vague 3 tous sont au même régime. Toute lecture « il faut moins d'actions qu'avant » est **hors de portée**. |
| **Budget de 40 actions, captures comprises** | identique | identique | Le budget pèse également sur les deux vagues, mais plus lourdement sur T4 en vague 3, où la composition enchaînée demande un aller-retour par élément. Les fins au budget de T4 restent en partie un artefact de protocole dans les deux vagues (B14). |
| **Listes déroulantes rendues dans la page** | présent (add1 pt 13, add2 pt 4), effet mineur (S2 S4) | présent, **effet lourd** : 17 des 44 actions de P2 en T4, 2 erreurs non récupérées de P4 en T4 (S3 S-1 ; c3 pts 14 et 20) | Toute comparaison du **coût de T4** entre les deux vagues est fragile. Les occurrences concernées sont retirées des problèmes d'interface de la vague 3, mais elles ont consommé le budget qui manque pour atteindre les chiffres. |
| **Nom de la touche Entrée** | « Return », non transmise : PR13 lu comme « Entrée ne valide pas » | « Enter », transmise (add3 pt 5) | **La comparaison de PR13 est impossible telle quelle.** La correction du dispositif a rendu observable un défaut produit (double validation) que la vague 2 ne pouvait pas voir. |
| **Loupe** | inopérante chez P3 et P5 (add2 pt 12) | vrai agrandissement (add3 pt 11) | La lisibilité des petits libellés en vague 2 est sous-estimée ; les comparaisons de RATE et de HES sur de petits éléments sont à éviter. |
| **Pensée à voix haute partielle chez les participants joués par Opus** | P1, P4, P5 (add2 pts 13 et 14) | P1 et P4 (S3 § 2 ; P5 complète en vague 3) | Les comptes de VOC, MM, HES et d'affect verbal sont sous-estimés dans les deux vagues, un peu moins en vague 3. Les inventaires d'affect des observateurs n'ont pas la même granularité d'un participant à l'autre (7 codes positifs chez P1 contre 21 chez P3 et P5, S3 § 4.4) : **les totaux d'affect ne se comparent pas entre les deux vagues**, ni entre participants. |
| **Navigateur** | navigateur intégré à l'application | Chrome sans fenêtre piloté par le protocole DevTools, écran 1 440 × 900, captures 800 × 500 (add3 pt 11) | Change la fiabilité des clics et la lisibilité, pas le produit. Aucune des deux vagues ne permet de voir une animation se jouer : le grief le plus répété reste structurellement invérifiable dans les deux. |
| **Incidents propres à la vague 3** | — | 3 incidents : fenêtre réduite (T1 de P3 invalidée), mise en veille (T1 de P5 invalidée), coupure réseau (T5 de P5, 0 action perdue) (add3 pts 8, 12, 13) | Deux séances sont des reprises complètes, ce qui excède ce que 11.6 prévoit (reprise de la tâche). La valeur de découverte à froid de T1 chez P3 et P5 est à lire avec cette réserve ; elle porte sur H1, pas sur les critères U/N. |
| **Changement de version en cours de vague 3** | — | `6a7b359` → `08a6d1e` avant toute séance valide (add3 pt 10) | Sans effet : les cinq séances valides sont sur la même version. |

### 4.5 Mesures propres aux missions, avant / après

| Mesure | Vague 2 | Vague 3 |
|---|---|---|
| T2 · diagnostic juste (T2-a) | 3 sur 5 | **4 sur 5** |
| T2 · déclencheur des cartes changé en une seule opération | 0 sur 5 | **2 sur 5** (P2, P5) |
| T3 · R1 « titre plus lent » sans aide | 5 sur 5 | 5 sur 5 |
| T3 · R2 « boutons après le titre », les deux boutons, sans aide | 1 sur 5 | **4 sur 5** |
| T3 · estimation T3-a juste | 3 sur 5 | **5 sur 5** (f3-p1 « juste au point milieu », f3-p2, f3-p3, f3-p4, f3-p5) |
| T4 · éléments visés effectivement animés (sur 30) | 24 | **14** |
| T4 · C1 · C2 · C3 · C3b · C4 · C5 · C6 remplis (sur 5) | 3 · 1 · 0 · 0 · 0 · 0 · 0 | **0 · 1 · 0 · 0 · 3 · 0 · 2** |
| T4 · structure à événement unique | 1 sur 5 (P4) | **4 sur 5** produisent une chaîne à un seul événement (P1, P2, P3, P5 sur la photo ; P4 sur la section) ; 3 sur 5 par « démarre après » (S3 H7) |
| T5 · S1, S2, S3, S4 remplis | 5 sur 5 | 5 sur 5 |

Le tableau de T4 est le point le plus instructif de la comparaison : **la composition s'est déplacée, elle ne s'est pas améliorée**. Ce qui manquait en vague 2 (un événement unique, un minutage tenu, une répétition à chaque passage) est désormais atteint par une partie des participants ; ce qui était atteint par accident en vague 2 (tous les éléments qui bougent) ne l'est plus par personne.

---

## 5. Les problèmes de la vague 2 en vague 3

Verdicts : **disparu** (aucune occurrence et une cause corrigée attestée), **diminué**, **inchangé**, **aggravé**, **non revu** (aucune occurrence, mais l'exposition n'est pas établie). *Une absence d'occurrence chez cinq participants simulés n'est pas une disparition.*

### 5.1 PR1 à PR14

| # | Problème de la vague 2 (gravité, participants) | Verdict | Preuve |
|---|---|---|---|
| **PR1** · Faire partir un élément « après » un autre : rien dans la rubrique « Animation » du panneau (g4, 4) | **disparu dans sa forme** | « Démarre : après <élément> » et « Délai » sont dans la rubrique Animation du panneau ; 4 réussites complètes en T3 dont 3 sans ouvrir le mode Animation ; U1 atteint ; 0 fausse piste en T3 (S3 § 4.1). **Résidu** : P5 n'ouvre pas le menu « Démarre » en T3 et pose deux délais à la main (RATE g1, obs3-p5 L[8]–[10]) ; et le doublon de vocabulaire « Départ » / « Délai » devient un problème propre (P-11). |
| **PR2** · Le mode Animation fait reculer (g4, 4, bloquant chez les 2 débutants) | **diminué en étendue, inchangé sur sa facette la plus grave** | Étendue : 2 participants sur 5 entrent dans le mode en vague 3 (P1, P4) ; P2, P3 et P5 ne l'ouvrent jamais (obs3-p2, obs3-p3, obs3-p5), donc l'exposition n'est pas comparable. Facette « élément montré comme un cadre vide » : **toujours là et plus coûteuse**, elle est l'origine de l'abandon de P1 en T3 (P-6, g4, f3-p1 T3 capture 011). Facette « mots inconnus, écran chargé » : réduite à un signal faible (S-4, P1, g2, 4 actions perdues, « j'ai tout annulé »), et le même écran est le **premier moment de valeur** de P4 (S3 § 9.2). |
| **PR3** · Une carte affiche « Apparition · Aucune » alors qu'elle est animée par sa liste (g4, 2) | **disparu, remplacé par un problème voisin** | « Aucune » a disparu : la carte affiche « Arrive avec « Plats » … Au chargement de la page … » et le lien « Régler sur « Plats » » (f3-p3 T2, f3-p1 T2). P2 et P5 s'en servent pour diagnostiquer et corriger en une opération (S3 § 10). **Mais** le choix « Avec « Plats » » de la liste n'écrit rien alors que l'écran laisse croire le contraire : P3 le répète trois fois, déclare terminé, récite un résultat faux (P-4, g4, c3 pt 3). |
| **PR4** · La liste « Animations du site » emmène sur l'animation homonyme d'une autre page (g4, 1) | **non revu** | Aucune occurrence. L'inventaire porte désormais un intitulé de page (« ANIMATIONS DU SITE / SUR CETTE PAGE · ACCUEIL », obs3-p1 T2-02). Exposition faible : un seul participant y était allé en vague 2, avec la mention « possible effet d'ordre ». **Voisin nouveau** : la liste de **choix** d'animation contient quatre lignes identiques « Du site · Fondu en montant · Plats · La carte » et la ligne de la page en cours y manque (S-5, P1, 6 actions perdues). |
| **PR5** · En mode Animation, cliquer un autre élément laisse ouverte l'animation précédente (g3, 3 designers) | **non revu** | Aucune occurrence. Le geste corrigé est attesté en usage réussi : P1 emploie « + L'ajouter à cette animation » puis « Départ » et le cite comme le bon moment de sa séance (obs3-p1 T4-02 ; S3 § 10). **Mais l'exposition est très réduite** : les trois designers qui portaient le problème en vague 2 n'ont pas ouvert le mode en vague 3 (P2, P5 jamais ; P4 y compose seul). Une absence d'occurrence chez ces cinq participants ne vaut pas disparition. |
| **PR6** · Aucun bloc des trois chiffres n'est atteint (g3, 2) | **inchangé** | P5 voit le segment « Chiffres » dans le fil, le manque d'un clic, et le segment disparaît quand la sélection change ; trois tentatives, 6 actions, fin de mission (P-7, obs3-p5 T4). P4 clique entre deux chiffres et attrape « 12 » seul (obs3-p4 T4, capture 010). Le préparateur établit que le conteneur n'est atteignable ni au clic dans la page ni par le fil une fois la sélection changée (c3 pt 13). Comme en vague 2, la part du dispositif est signalée : segments de ≈ 6 px dans une capture 800 × 500, écart de visée ≈ 57 px → gravité ramenée de 4 à 3 (S3 § 5.2). **À confirmer avec des utilisateurs réels.** |
| **PR7** · Aucun participant ne trouve comment faire rejouer la scène à chaque passage (g3, 2) | **diminué** | 3 participants sur 5 trouvent « Rejouer : à chaque passage », écrit en toutes lettres dans la rubrique du panneau de droite (P2, P3, P5 ; S3 P-10). C6 rempli par 2 (f3-p2, f3-p5 T4) contre 0 en vague 2. **Résidu** : depuis la ligne de temps, la liste Une fois / 2 fois / 3 fois / En boucle est lue comme le réglage « chaque fois qu'on revient » et le bon choix n'y figure pas (P1, P4 ; c3 pt 9). |
| **PR8** · Aucun choix tout prêt ne dépasse sa place ; la courbe « Ressort » n'est trouvée par personne (g3, 2) | **diminué** | Les préréglages « Montée avec rebond » et « Zoom avec rebond » existent (lot 3), sont reconnus sans jargon (« "Montée avec rebond", c'est mon overshoot, écrit en français, je l'ai reconnu au premier coup d'œil », P4, D-FIN-2) et sont posés par P3 sur un chiffre avec dépassement mesuré à la visite (f3-p3 T4). **Résidu** : 1 sur 5 seulement en pose un sur un chiffre, faute d'atteindre les chiffres (U4 manqué). |
| **PR9** · Composer une scène piste par piste coûte 7 à 12 actions par élément (g3, 1) | **inchangé en coût, très étendu en portée** | Le coût par élément est du même ordre : P1 dépense 12 actions pour la photo, 8 pour le titre, 12 pour le paragraphe ; P5 parle de « sept ou huit gestes par élément » ; P4 de « quatre réglages dans quatre endroits » (S3 P-1 ; c3 pt 22). Mais il concerne désormais **5 participants sur 5** au lieu d'un, et devient le premier problème de la vague — parce que PR1 ne bloque plus en amont : les participants arrivent tous jusqu'à la composition et butent tous sur son coût. Aucun ne remplit C1. |
| **PR10** · Un clic sur un bouton, une pastille ou une carte sélectionne le texte ou l'image qu'ils contiennent (g2, 5) | **diminué fortement** | 16 occurrences chez 5 participants en vague 2 ; **1 occurrence chez 1 participant** en vague 3, et elle correspond exactement au seul défaut résiduel décrit par le préparateur (carte voisine du même modèle, c3 pt 4). U6 atteint. |
| **PR11** · La portée d'un réglage posé dans le composant n'est pas dite ; le panneau nomme « Texte « 12 » » quand on clique « 38 » (g2, 3) | **diminué** | Aucune erreur de nommage d'occurrence n'est rapportée en vague 3, et **aucune modification collatérale ne subsiste dans aucun des 25 sites finaux** (S3 § 4.1) — alors qu'en vague 2 trois participants modifiaient les trois chiffres à leur insu (c2 pt 4). **Résidu déclaratif** : P5 n'ose pas toucher un composant (« je n'ai pas compris ce que je modifiais … c'est justement pour ça que je n'ai pas osé y toucher », P-8). **Mécanisme voisin non traité** : une animation posée sur le **modèle d'une collection** n'est signalée que sur la première occurrence (cadre bleu sur une seule carte), d'où la réussite non comprise de P1-T2 (c3 pt 6). |
| **PR12** · Changer le moment de lancement d'une animation existante : non trouvé, contournements coûteux (g2, 2 designers) | **aggravé** | Devient P-2, gravité 4, 3 participants, **2 échecs de T2** (P3, P4). P4 énonce la cause exacte à la 30ᵉ action et échoue à la 40ᵉ : « je sais exactement ce qui cloche mais je ne trouve pas où changer le "quand" d'une animation déjà créée ». Cause déplacée : depuis le panneau de droite le réglage marche en un clic (P2, P5, une seule opération) ; depuis le mode Animation, le moment est affiché comme un constat et le menu est dans une rubrique repliée, en bas, dans une ligne à déplier (c3 pt 15). La correction a créé **deux entrées qui n'offrent ni les mêmes réglages ni les mêmes mots** (S3 § 11.2). |
| **PR13** · Une valeur validée par Entrée n'est enregistrée qu'au changement de champ (g2, 2 designers) | **requalifié : artefact du dispositif, et vrai défaut découvert derrière** | Le plan (lot 0) a établi que l'écart venait du nom de la touche envoyée par l'outil et n'a rien changé au produit. Avec « Enter », la vague 3 montre que **le code valide deux fois** : `NumberInput` appelle `commit()` puis `blur()`, et `onBlur` rappelle `commit()` dans le même rendu (c3 pts 1, 8, 10). Conséquences : le premier Ctrl+Z ne défait rien (origine de l'abandon de P1 en T3), une piste est corrompue (700 saisi, 1 400 obtenu, images-clés réduites à une), un compteur de tête de lecture faux (« 4 500 / 1 500 ms »). → voir § 6, P-3. |
| **PR14** · La vitesse active ne se distingue pas (g1, 2 designers) | **diminué** | L'option active est encadrée, les libellés ne sont plus tronqués et une durée réglée à la main s'affiche « Sur mesure : NNN ms » (lot 0). Aucune occurrence de « je n'arrive pas à voir laquelle est active » en vague 3. **Résidu** : P5 s'étonne qu'aucun bouton ne soit allumé à l'état de départ et y voit un doute sur ce qu'un collègue aurait réglé (S-6) ; le signal est écarté faute de comportement associé, et les valeurs en cause viennent de la préparation des tâches (c3 pt 11). |

### 5.2 Les constats techniques du préparateur de la vague 2

| # | Constat de la vague 2 | Verdict | Preuve |
|---|---|---|---|
| **1** | Éclair avant l'apparition à l'entrée dans l'écran (5 visites sur 5) | **disparu** | Aucune visite instrumentée de la vague 3 ne le montre ; l'élément est à opacité 0 avant son entrée dans les 8 visites lues (f3-p1 T1 et T2, f3-p2 T1 et T2, f3-p3 T1, f3-p4 T1, f3-p5 T1 et T2). Volet « éclair » de N2 atteint. |
| **2** | Phrase de résumé « un à un » sans échelonnement réel | **disparu** | L'état de départ de T2 affiche « les enfants de « Plats » ensemble » dans les cinq copies (f3-p1..p5 T2). |
| **3** | Survol sans retour composé : rien ne dit ce qui se passe à la sortie | **inchangé** | P4 pose un survol sur mesure (échelle 1,05) sans `reverseOnLeave` ; la visite montre un retour immédiat non animé ; la phrase de résumé s'arrête à « en 150 ms » et la case « aller-retour » est grisée sans explication (f3-p4 T5 ; c3 pt 18 ; S-10). |
| **4** | Composant partagé modifié sans avertissement lisible | **diminué** | Aucune modification collatérale dans aucun site final ; aucun cas de « le 14 bouge alors que je n'y ai pas touché ». Reste un refus d'agir déclaré (P5, P-8) et le mécanisme voisin non traité du **modèle de collection** (c3 pt 6). |
| **5** | Changer le « Quand » d'une animation existante (découvrabilité) | **aggravé** | Voir PR12 / P-2. |
| **6** | Rejouer à chaque passage (découvrabilité) | **diminué** | Voir PR7 / P-10. |
| **7** | Enfants l'un après l'autre avec décalage (découvrabilité) | **non revu au but** | La case « les cartes une à une » est repérée par P5 en T2 (non cochée, non demandée) et réclamée par P3 pour T4 (S3 recommandation 2), mais **aucun participant n'a eu l'occasion de l'appliquer à un groupe en T4**, faute d'atteindre les chiffres (PR6 / P-7). Le constat n'est ni levé ni infirmé. |
| **8** | Ressort / dépassement (découvrabilité et manque de préréglage) | **diminué** | Voir PR8. |
| **9** | Délai absent du panneau simple par conception | **disparu** | Voir PR1 et U1. |
| **10** | Entrée dans un champ chiffré, « à vérifier » | **tranché, dans l'autre sens** | Voir PR13 et § 6, P-3. |

### 5.3 Les constats exploratoires de la vague 2 directement re-mesurables

| Constat de la vague 2 (S2 § 11) | Vague 3 |
|---|---|
| 1 · Le moment de lancement n'est jamais **décidé** en T1 (5 sur 5 l'obtiennent d'office) | **inchangé** : « quand il entre dans l'écran » reste la valeur par défaut, acceptée sans être cherchée par P2, P3, P4 et P5 (S3 § 10). La compréhension du moment n'est toujours pas mesurée en T1 (S3 H2). |
| 2 · Réussites non sues (3) et échecs déclarés terminés (2) | **persiste, déplacé** : 2 réussites non sues en vague 3 (P1-T2 statut C fini au budget, P1-T3 statut P fini par abandon) et 2 échecs déclarés terminés (P3-T2, et P3-T4 par abandon assumé), dont un porte le seul site **inchangé** de la vague. |
| 7 · Défauts techniques invisibles aux participants (éclair, « un à un ») | **remplacé** : l'éclair et le « un à un » sont corrigés, mais deux nouveaux défauts sont invisibles aux participants dans les mêmes conditions — le zoom masqué de la pastille (c3 pt 7) et les pistes vides de P4 (c3 pt 21). |
| 8 · Retirer puis remettre une apparition décoche « une à une » | **non revu** : personne n'a repris ce chemin de correction en vague 3 ; le réglage n'existe plus dans l'état de départ. |
| 10 · Valeur déclarée pour le simple, par personne pour la mise en scène | **inchangé** : « je me lancerais pas dans un truc avec plusieurs éléments qui doivent s'enchaîner comme la dernière mission » (P3, D-FIN-4) ; « je ne facturerais pas non plus une animation que je n'ai pas vue tourner » (P4, D-FIN-4). |

---

## 6. Problèmes nouveaux de la vague 3

Classés par gravité, puis par nombre de participants. La colonne « cause » distingue **régression** (le produit fait maintenant quelque chose de faux qu'il ne faisait pas), **effet de bord d'une correction** (le lot a créé ou déplacé le problème), **défaut préexistant rendu visible** (il était là, la vague 2 ne pouvait pas le voir) et **artefact du dispositif**.

| # | Problème | Gravité, participants | Cause établie | Preuve |
|---|---|---|---|---|
| **P-3** | Un champ chiffré validé par Entrée s'applique deux fois : le premier Ctrl+Z ne défait rien, et une piste peut être corrompue | **4**, fait attesté chez 3 (P1, P4, P5), conséquence chez 1 (P1) | **défaut préexistant rendu visible** par la correction du dispositif (touche `Enter`) | Cause vérifiée dans le code : `NumberInput`, Entrée appelle `commit()` puis `blur()`, et `onBlur` rappelle `commit()` dans le même rendu, deux opérations identiques à 50 ms (c3 pt 1). Journal de P1-T3 : v1/v2 puis v3/v4 identiques, v5 = Ctrl+Z qui n'annule que le doublon (f3-p1 T3). Journal de P1-T4 : « 700 » saisi, « 1400 » affiché, images-clés du titre réduites à une seule (c3 pt 8). P4 : 14 versions pour 7 changements en T1 (f3-p4 T1). **Origine directe d'un abandon.** |
| **P-2** | Le moment de lancement d'une animation existante ne se règle pas là où il est écrit | **4**, 3 participants (P1, P3, P4), 2 échecs de T2 | **effet de bord d'une correction** : les lots 1 et 2 ont doté la rubrique du panneau de droite de « Démarre », sans l'apporter au mode Animation | c3 pt 15 ; S3 P-2 ; captures 013 et 014 de P4 strictement identiques (la phrase de résumé n'est pas cliquable). Aggravation de PR12. |
| **P-4** | Sur une carte qui hérite du mouvement de sa liste, le choix proposé ne produit aucune opération et l'écran laisse croire le contraire | **4**, 1 participant (P3), échec total et diagnostic faux | **effet de bord d'une correction** : l'option « Avec « Plats » » introduite par le lot 2 pour remplacer « Aucune » | La liste montre « Fondu en montant » coché alors que « Avec « Plats » » est l'état en vigueur ; la choisir n'écrit rien (c3 pt 3). Site final en **version 0, journal vide** (f3-p3 T2) alors que le participant a agi 27 fois et déclaré terminé. |
| **P-5** | Une animation héritée d'un ancêtre n'est signalée nulle part sur l'élément qu'elle fait bouger, dans le mode Animation | **4**, 1 participant (P4), fausse piste de 14 actions | **correction partielle** : l'encart d'héritage n'a été ajouté qu'à une des deux entrées | La rubrique « Animations lancées par Carte plat » est vide alors que la carte bouge (obs3-p4, T2 action 8). Contrepoint : l'avertissement « "Plats" a aussi ses propres animations : elles se jouent en plus » lui évite un double fondu et est cité deux fois comme un point fort. |
| **P-6** | En mode Animation, un élément dont la piste démarre après la tête de lecture disparaît du canevas et passe pour supprimé | **4**, 1 participante (P1), **abandon** | **défaut connu non traité** : facette de PR2 en vague 2, promue en problème propre ; le lot 4 a corrigé l'état d'**ouverture**, pas l'état à la tête de lecture | « Le bouton « Réserver une table » a disparu […] je crains d'avoir cassé quelque chose », puis « J'ai abîmé le bouton du site d'Aurèle […] J'abandonne. » (P1, T3 [20]–[27]) ; capture 011 : étiquette bleue, cadre vide, « INSTANT 500 MS », « Opacité 0 % » ; c3 pt 2. Les captures de P4 montrent le même comportement, interprété correctement et sans coût. |
| **P-11** | Deux mots pour faire attendre un élément (« Départ » d'une piste, « Délai » d'un déclencheur), à deux endroits, dont l'un est enterré | **3**, 1 participant (P4) | **effet de bord d'une correction** : le lot 1 a ajouté « Délai » à la rubrique du panneau sans retirer ni relier « Départ » de la ligne de temps | « toujours enterré tout en bas, il faut défiler deux fois et déplier deux rubriques pour un simple chiffre » (P4, T3 action 20) ; c3 pts 19 et 23. P4 emploie « Délai » en T3 et « Départ » en T4 sans que rien n'explique lequel s'applique quand. |
| **P-8** | Sur un élément « technique », la rubrique Animation est placée après une longue section de réglages inconnus, et le participant repart | **3**, 2 participants (P3, P5) | **effet de bord d'une correction** : le lien « Régler sur « Plats » » du lot 2 ouvre l'inspecteur de la liste **en haut** (vue de base de données) | c3 pt 3 ; P3 traverse deux fois le panneau « Plats » sans jamais défiler jusqu'à « Démarre ». Nuance : P2 et P5 atteignent le même panneau par le même lien et y trouvent le réglage sans difficulté — le problème est l'ordre des sections, pas l'accès. |
| **P-12** | Une piste ajoutée mais jamais remplie ne se distingue pas d'une piste qui porte un mouvement | **3**, 1 participant (P4), 1 écart matériel | **défaut du produit**, occurrence déclenchée par un **artefact du dispositif** (le clic est tombé au-dessus d'une liste rendue dans la page) | Pistes `1400ms {}` et `1800ms {}` dans le site final (f3-p4 T4) ; rien dans la ligne de temps ni dans la phrase de résumé ne les signale (c3 pt 21) ; récit : « à une seconde quatre, le paragraphe se dévoile à son tour ». |
| **P-13** | « ms » sans équivalent en secondes : une contrainte chiffrée de la consigne devient invérifiable | **3**, 2 débutants (P1, P3) | **problème préexistant promu** : signal faible en vague 2 (S2 S12, déclaratif), retenu en vague 3 parce qu'il empêche de vérifier « deux secondes et demie » | « Pour les deux secondes et demie, je ne sais pas si « 2 100 ms » les respecte, puisque je ne sais pas ce que valent ces « ms » » (P1, T4 [40]). Circonscrit aux débutants : les trois designers calculent juste. |
| **P-9** | Le déclencheur au passage de la souris n'est pas nommé dans les mots des débutants, et « À la souris » est compris comme le survol | **3**, 2 débutants (P1, P3) | **nouveau dans ses effets** ; le mot « survol » figurait déjà en vague 2 comme signal faible (S2 S12) | P1 choisit « À la souris », pose une animation, l'annule : 10 actions perdues (obs3-p1 T5-04). Atténuation : la phrase de résumé lui permet de se rattraper seule, statut final C. |
| **P-14** | Deux croix de même dessin : l'une referme le panneau, l'autre supprime l'animation | **2**, 2 participants (P4, P1) | **nouveau** | « Deux croix identiques pour deux actions opposées, c'est le genre de détail qui fait supprimer une animation par erreur un jour » (P4, T5 action 8) ; c3 pt 17. |
| **S-5** | La liste de choix d'animation contient des lignes strictement identiques en double et la ligne de la page en cours y manque | signal faible, 1 participante (P1), 6 actions perdues | **effet de bord probable** du rangement par page (lot 2) ; non établi | Quatre lignes « Du site · Fondu en montant · Plats · La carte » dans la capture 016 ; la ligne « Plats · Accueil », présente dans l'inventaire du panneau, manque dans cette liste (obs3-p1 T2-09). |
| **Régression C1** | En T4, aucun participant ne fait bouger les six éléments, contre 3 sur 5 en vague 2 | — (mesure de critère, pas problème codé) | **effet de bord d'une correction** : le lot 5 a supprimé le raccourci involontaire | En vague 2, P1, P3 et P5 posaient un effet **dans le composant « Chiffre clé »**, ce qui animait les trois chiffres d'un coup sans qu'ils le sachent (f2-p1, f2-p3, f2-p5 T4 ; c2 pt 4) : C1 rempli par accident. En vague 3, un clic sélectionne l'occurrence (plan § 4, lot 5), le raccourci n'existe plus, et le conteneur « Chiffres » n'est pas sélectionnable (c3 pt 13) : 14 éléments animés sur 30 contre 24. **La correction a rendu l'écran plus honnête et le résultat moins complet.** |

**Ce qui n'est pas imputable au produit et doit être retranché** : les erreurs de clic dans les listes déroulantes (S-1), qui coûtent 17 des 44 actions de P2 en T4 et deux erreurs non récupérées à P4 ; l'impossibilité de voir une animation se jouer (S-2), qui produit 16 des 84 codes négatifs de la vague ; et la lisibilité des segments du fil d'Ariane à 800 × 500 (part de dispositif dans P-7). Ces trois points sont **hors de portée** des deux vagues et doivent être repris dans un vrai navigateur, avec des personnes qui voient l'écran.

---

## 7. Ce qui reste à faire

Classé par effet attendu sur les **critères manqués**, avec la nature du travail : **défaut à corriger** (le produit fait quelque chose de faux), **fonction présente mais non trouvée** (découvrabilité), **fonction absente** (manque), **question ouverte** (ne peut être tranchée qu'avec de vraies personnes ou un vrai navigateur).

### 7.1 Pour U2 et U4 (la scène de « La maison »), les deux critères les plus loin du seuil

| Rang | Travail | Nature | Effet attendu |
|---|---|---|---|
| 1 | **Rendre un bloc intermédiaire désignable** : atteindre le conteneur des trois chiffres au clic dans la page (ou par une vue de structure), et annoncer le niveau visé **avant** le clic | fonction absente | C'est le verrou de C1, C3b et de la partie « chiffres » de C5. Il clôt T4 chez P5, coûte les chiffres à P4, et il est le seul problème inchangé entre les deux vagues (PR6 → P-7). Sans lui, U2 et U4 restent hors d'atteinte quel que soit le reste. |
| 2 | **Réduire le nombre de gestes par élément** : appliquer un effet à plusieurs éléments sélectionnés, dupliquer une piste avec son réglage, ou échelonner un groupe (la case « les cartes une à une » existe déjà pour une liste et est reconnue) | fonction absente | Traite P-1 (5 participants sur 5, 5 échecs). Le coût par élément est le même qu'en vague 2 ; ce qui a changé, c'est que tout le monde y arrive et bute dessus. **Réserve** : l'effet sur l'abandon n'est pas établi, le budget de 40 actions y contribue (question ouverte, § 7.4). |
| 3 | **Amener « Rejouer : à chaque passage » et le dépassement là où on les cherche depuis la ligne de temps** | fonction présente mais non trouvée | Traite le résidu de PR7 (P-10) : le réglage existe et est trouvé par 3 sur 5 dans le panneau, jamais par les 2 qui passent par la ligne de temps. Fait passer C6 de 2 vers 4 sur 5 sans rien inventer. |
| 4 | **Écrire les durées en secondes à côté des millisecondes** et donner un repère de ce qu'est « lent » | fonction absente | Traite P-13. Rend vérifiable la contrainte « deux secondes et demie » de C4, aujourd'hui invérifiable pour les deux débutants. |

### 7.2 Pour U3 (« Les plats ne bougent pas ») et U5 (aucun abandon né du mode Animation)

| Rang | Travail | Nature | Effet attendu |
|---|---|---|---|
| 1 | **Corriger la double validation des champs chiffrés** et garantir qu'un Ctrl+Z défait le geste perçu | défaut à corriger | Cause vérifiée dans le code (c3 pts 1, 8, 10). C'est l'unique correction de cette liste dont l'effet est certain : elle supprime une corruption de piste, un compteur faux et **l'un des deux abandons de la vague** (U5). |
| 2 | **Ne jamais laisser une absence à la tête de lecture passer pour une suppression** dans le canevas du mode Animation (étiquette, silhouette, mention « n'a pas encore commencé ») | fonction absente | Traite P-6, origine de l'abandon de P1, seul abandon né dans le mode Animation : c'est le second verrou de U5. |
| 3 | **Faire que « Avec « Plats » » écrive une opération ou ne soit pas proposé**, et que l'écran ne change pas d'aspect quand rien n'a été enregistré | défaut à corriger | Traite P-4 : un site en version 0 après 27 actions et une mission déclarée terminée. C'est l'un des deux échecs qui manquent à U3. |
| 4 | **Rendre la phrase de résumé actionnable, ou ramener le menu « Quand » à côté de la durée dans le mode Animation** | fonction présente mais non trouvée | Traite P-2, l'autre échec qui manque à U3, et la seule aggravation nette par rapport à la vague 2. |
| 5 | **Aligner les deux entrées** (panneau de droite et mode Animation) sur les mêmes réglages et les mêmes mots : « Démarre », « Rejouer », héritage, et un seul mot pour l'attente (« Départ » / « Délai ») | fonction présente mais non trouvée, en partie fonction absente | Traite P-2, P-5, P-10 et P-11 à la racine. C'est le constat structurel de la vague 3 : « les trois participants qui ont réussi T2 ou rempli C6 sont passés par la première entrée ; les deux qui ont échoué en T2 et manqué C6 sont passés par la seconde » (S3 § 11.2). |

### 7.3 Pour N1 (récits sans écart matériel) et N2 (le site joue ce qu'on annonce)

| Rang | Travail | Nature | Effet attendu |
|---|---|---|---|
| 1 | **Signaler une piste vide** dans la ligne de temps et dans la phrase de résumé | fonction absente | Traite P-12, l'un des 3 échecs ignorés de la vague. |
| 2 | **Signaler sur un élément qu'une animation d'un ancêtre ou d'un modèle de collection le fait bouger**, dans les deux entrées et dans le canevas | fonction absente dans le mode Animation et pour le modèle de collection ; découvrabilité ailleurs | Traite P-5 et la réussite non comprise de P1-T2. L'encart existe et suffit dans le panneau de droite : il faut le porter aux deux autres endroits. |
| 3 | **Ne pas laisser une animation en attente masquer une composante d'une autre animation du même élément** (pastille de T5 : la pulsation impose `scale(1)` pendant son retard et masque le zoom) | défaut à corriger | Seul volet de N2 encore manqué. Le préparateur le juge probablement présent dès l'état de départ, donc **à vérifier d'abord** : il ne s'agit peut-être pas d'une régression (c3 pt 7). |
| 4 | **Dire ce qui se passe à la sortie du survol** quand l'animation est composée à la main (« aller-retour » grisé sans explication) | fonction absente | Constat 3 de la vague 2, inchangé, et seul point de T5 où l'éditeur n'annonce pas ce que fera le site. |
| 5 | **Distinguer les deux croix (fermer / supprimer)** ; **retirer les doublons de la liste de choix d'animation** et y faire figurer la page en cours | défaut à corriger | Traite P-14 et S-5 : coût faible, risque de perte de travail réel signalé par un designer. |

### 7.4 Questions qui ne peuvent être tranchées qu'avec de vraies personnes ou un vrai navigateur

1. **Le coût réel d'une scène à six éléments sans budget d'actions.** Le nombre de gestes par élément est attesté par les captures ; son effet sur l'abandon ne l'est pas. P-1 est un plancher (T4 est toujours en position 5, après l'apprentissage de quatre missions).
2. **Le choix dans une liste déroulante** : placement, sens d'ouverture, densité, hauteur des lignes. L'environnement de test ne rend pas les listes comme l'éditeur livré (add3 pt 2 ; c3 pts 14 et 20). Aucune conclusion des deux vagues ne porte là-dessus.
3. **Tout ce qui touche à voir le mouvement** : aucune des deux vagues n'a permis à un participant de voir une animation se jouer. La prévisualisation, l'utilité du bouton de lecture, la qualité perçue d'un mouvement (trop rapide, trop lent, désagréable) et la confiance d'un intégrateur dans ce qu'il livre restent hors de portée.
4. **La visée du fil d'Ariane et des petits libellés** à la souris : c'est ce qui décide de la gravité de P-7 (et, en vague 2, de l'échec le plus lourd de l'étude).
5. **Si de vrais débutants trouvent la rubrique Animation aussi vite** : les deux vagues donnent T1 en réussite complète chez 5 sur 5, avec les réserves B1 et B12 dans les deux (sujet connu des agents, personas écrites par le même auteur).
6. **Les seuils d'abandon et l'utilité d'une aide** : 3 aides en vague 2, 0 en vague 3, aucun blocage déclaré en vague 3 en 25 tâches. L'échelle d'aide n'a pas été exercée ; on ne sait rien de ce que produirait une orientation au bon moment.
7. **Une vérification technique suffit, sans utilisateurs**, pour deux points : l'existence d'un bloc regroupant les trois chiffres (P-7) et le masquage du zoom par une seconde animation en attente (N2, c3 pt 7).

---

## 8. Limites de la comparaison

### 8.1 Ce que deux vagues de cinq participants simulés ne peuvent pas établir

- **Aucune fréquence.** Dix séances au total, cinq agents d'un même modèle par vague. « 4 sur 5 » décrit une convergence d'agents, pas une proportion d'utilisateurs. Un problème vu chez un seul participant dans une vague et chez personne dans l'autre n'a pas « disparu » : il n'a pas été revu.
- **Aucune causalité entre un lot et un résultat.** La version a changé sur seize points de correction plus une refonte de l'enchaînement (plan § 3 et § 4). Que T3 passe de 1 à 4 réussites en même temps que le lot 1 est **compatible** avec l'hypothèse que le lot 1 en est la cause, et le chemin emprunté par les participants est bien celui que le lot a créé ; ce n'est pas une démonstration, et aucun plan d'expérience ne permettait de l'isoler.
- **Aucune mesure de la valeur perçue.** Les inventaires d'affect n'ont pas la même granularité entre observateurs ni entre vagues (73 codes positifs et 116 négatifs en vague 2, 78 et 84 en vague 3, avec des conventions de comptage différentes) : **je n'ai pas comparé ces totaux**, et la carte de la valeur de chaque vague se lit à l'intérieur de sa vague.
- **Aucun jugement sur le mouvement lui-même.** Les deux vagues sont aveugles à ce qui fait la qualité d'une animation.
- **Aucune conclusion sur l'aide.** L'échelle d'aide a été exercée trois fois en vague 2 (dont une hors conditions) et zéro fois en vague 3.

### 8.2 Différences de dispositif entre les deux vagues

Résumées au § 4.4. Les trois qui pèsent le plus sur ce rapport :

1. **Le comptage des actions** n'est pas le même : deux régimes en vague 2 (captures en retard pour P3, P1, P5 ; capture double pour P2, P4), un seul en vague 3 (capture qui attend le rendu, 1 action). **Aucune comparaison d'actions entre vagues n'est faite dans ce rapport**, et les comparaisons de fins au budget sont à lire avec cette réserve.
2. **Les listes déroulantes rendues dans la page** existaient dans les deux vagues mais n'ont eu un effet lourd qu'en vague 3, et précisément sur T4 : le coût de la mission la plus décisive pour U2 et U4 est donc en partie artefactuel des deux côtés, davantage du côté de la vague 3.
3. **La touche Entrée** : PR13 de la vague 2 était un artefact du dispositif, et sa correction a rendu visible un défaut produit plus grave. Deux vagues peuvent ainsi diverger sur un problème sans que le produit ait changé.

À quoi s'ajoutent, propres à la vague 3 : trois incidents (add3 pts 8, 12, 13), deux séances reprises **entièrement** alors que 11.6 ne prévoit la reprise que de la tâche, et des questions posées par blocs dans les cinq séances (sans information sur le chemin ni le résultat : A6 négatif dans les 25 tâches).

### 8.3 Fiabilité inégale des mesures que je compare

Les deux vagues signalent le même défaut de méthode : l'accord entre codeurs est **total sur les statuts, les récits et les chaînes causales majeures**, et **en deçà du seuil de 8.4.10 sur le codage des événements** (vague 2 : 38 sur 50 pour P3, 20 sur 56 pour P5 ; vague 3 : environ la moitié des événements appariés sur P3). L'addendum de précision des définitions et le recodage prévus n'ont eu lieu dans aucune des deux vagues.

Conséquence pour ce rapport : **je compare les statuts, les critères lus dans le site, les écarts matériels des récits, les diagnostics, les modes de fin, les aides et les profils de critères de T4** — toutes mesures sur lesquelles les codeurs s'accordent. Je **ne compare pas** les comptes de HES, de FP, de RATE, de VOC ni les gravités d'origine de chaîne, qui ne sont des ordres de grandeur ni dans une vague ni dans l'autre. Les rares fois où je cite un compte de fausses pistes (T3 : 6 → 0), c'est parce que l'écart dépasse largement la marge de désaccord et qu'il est corroboré par le statut et par le SEQ.

### 8.4 Endroits où j'ai dû arbitrer

1. **N2, volet « phrase de résumé »** : j'ai retenu la lecture littérale et coté le cas de la pastille de P1 comme une contradiction (« zoom » annoncé, opacité seule jouée). Une lecture indulgente conclurait « atteint ». Le critère bascule sur ce seul cas ; je le signale plutôt que de le trancher en silence.
2. **U4, volet C6** : trois participants ont **trouvé et posé** « Rejouer : à chaque passage », mais le préparateur ne retient C6 que chez deux (chez P3, un chiffre garde une animation séparée « une seule fois »). J'ai retenu la lecture du critère (2 sur 5) et rapporté les deux chiffres.
3. **U6** : j'ai appliqué le critère à la lettre (« le texte ou l'image contenus »), ce qui donne 1 participant. Une lecture élargie à « on n'attrape pas le niveau voulu » donnerait 3 participants et ferait basculer le critère. Le critère pré-enregistré ne dit pas cela, et je ne le reformule pas ; mais le lecteur doit savoir que la famille de problèmes n'a pas disparu, elle s'est déplacée vers les blocs intermédiaires.
4. **U5** : les deux problèmes retenus comme origine de l'abandon de P1 (P-6 et P-3) sont tous deux situés dans le mode Animation ; l'imputation ne change donc pas le verdict. Pour l'abandon de P3 en T4, j'ai suivi les deux codeurs, qui l'imputent à la répétition élément par élément depuis le panneau de droite.
5. **Écarts matériels (N1)** : j'ai rapporté les deux lectures de la vague 2 (1 sur 25 après arbitrage, 4 sur 25 en lecture stricte des cas limites) plutôt que de comparer 1 à 5 comme si les deux vagues avaient coté à l'identique.
6. **« Régression C1 »** : j'ai rattaché la chute de 24 à 14 éléments animés en T4 à la correction de la sélection, sur la base des sites finaux des deux vagues et de la description du lot 5. C'est une reconstitution cohérente avec les fiches, pas une mesure ; une autre part revient au coût de la composition enchaînée, que je ne peux pas séparer.
7. **PR9 → P-1** : j'ai écrit « inchangé en coût, très étendu en portée » plutôt que « aggravé », parce que le coût par élément mesuré est du même ordre dans les deux vagues et que l'extension de 1 à 5 participants s'explique par la levée de PR1 en amont, non par une dégradation.
