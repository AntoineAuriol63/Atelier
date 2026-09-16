# Synthèse · vague 3 de l'étude « Faire bouger un site » (Atelier)

Analyse de la seule vague 3 (15–16 septembre 2026, version `08a6d1e`), à l'aveugle vis-à-vis des vagues précédentes et de tout plan de correction. Protocole v1.0 gelé, addendum 3. Sources : `observations3/observation-p1..p5`, les doubles codages `observation-p3-codeur2` et `observation-p5-codeur2`, les fiches `fiches3/fiche-lecture-p1..p5`, les traces `traces3/`, et `constats3-preparateur.md` (utilisé seulement pour qualifier la cause d'un problème déjà retenu sur les observations).

---

## 1. Résumé exécutif

Cinq participants simulés (2 débutants, 3 designers), 25 tâches, aucune aide demandée ni donnée. Les tâches simples réussissent : T1 (premier élément qui bouge) et T5 (retirer un mouvement permanent, poser un survol) sont en réussite complète chez 5 participants sur 5, sans aide. La composition échoue partout : T4 est en échec chez 5 sur 5, aucun ne fait bouger les six éléments demandés, et les cinq finissent au budget ou abandonnent. T2 partage les publics : le diagnostic est juste chez 4 sur 5, mais 2 sur 5 ne parviennent pas à changer le moment de lancement d'une animation existante. Le site enregistré et le récit divergent matériellement dans 5 récits sur 25 : 3 « échecs ignorés » (P3-T2, P3-T4, P4-T4) et 2 « réussites non comprises » (P1-T2, P5-T3). Deux points forts reviennent chez les cinq : les phrases de résumé en français et les choix tout prêts nommés en clair. L'étude ne peut rien dire de la qualité perçue du mouvement (aucun participant n'a jamais vu une animation se jouer), ni du mobile, des effets continus, de l'accessibilité ou de la publication (1.4) ; avec 5 agents d'un même modèle, « observé chez 4 sur 5 » ne veut pas dire « fréquent chez de vrais utilisateurs ».

---

## 2. Participants et déroulé

| | Persona | Public | Modèle | Ordre des tâches | Conditions du dispositif | Pensée à voix haute | Aides | Incidents |
|---|---|---|---|---|---|---|---|---|
| **P1** | Nathalie Besson, 56 ans, épicerie fine | débutante | Opus 5 | T1, T2, T3, T5, T4 | Chrome sans fenêtre, écran 1 440 × 900, captures 800 × 500, loupe réelle, capture simple qui attend le rendu ; listes déroulantes rendues dans la page ; onglet simulé pour l'aperçu | **partielle** (lignes 🧠 restituées par le modèle ; toutes signalées par l'observateur) | aucune (aucun « je suis bloquée ») | observateur relancé après la coupure réseau du 16/09 (addendum 3, pt 13) ; agacement chiffré donné une seule fois sur la séance (donnée manquante) |
| **P2** | Claire Morvan, 39 ans, designer graphique | designer | Sonnet 5 | T1, T3, T5, T2, T4 | idem | complète (💬) | aucune | budget de T4 dépassé de 4 actions (44 au lieu de 40), par 4 actions non comptées ; phrase de fin de tâche prononcée en retard (MOD, gravité 0) |
| **P3** | Karim Haddad, 34 ans, food truck | débutant | Sonnet 5 | T1, T5, T2, T3, T4 | idem | complète (💬) | aucune | **T1 de la 1re instance invalidée** (fenêtre réduite, clics à des coordonnées fausses, addendum 3 pt 8) ; **séance reprise de zéro** sur `08a6d1e` — écart à 11.6, qui ne prévoit la reprise que de la tâche |
| **P4** | Julien Ferrand, 46 ans, DA motion | designer | Opus 5 | T1, T2, T5, T3, T4 | idem | **partielle** (🧠) | aucune | 1 commande hors répertoire rejetée (`triple`), 1 action perdue ; aucun agacement déclaré en T4 (PERS, donnée manquante) |
| **P5** | Élodie Nguyen, 28 ans, intégratrice | designer | Opus 5 | T1, T3, T2, T5, T4 | idem | complète (💬 ; aucune ligne 🧠 dans la trace) | aucune | **T1 de la 1re instance invalidée** (mise en veille de la machine, addendum 3 pt 12), séance reprise de zéro ; **coupure réseau en T5** (pt 13), reprise sur place, 0 action perdue, ~48 min d'interruption ; phrase de fin prononcée à 38 actions (MOD) |

Communs aux cinq : version `08a6d1e` pour toutes les séances valides (le changement de version du pt 10 précède toute séance valide, donc la vague est homogène) ; questions posées par blocs au lieu d'une par une (écart de procédure sans information sur le chemin ni le résultat : **A6 est négatif dans les 25 tâches**) ; aucune action interdite pendant les séances (deux sorties de rôle après clôture, codées HORS, hors séance, dont les conclusions ne sont pas reprises — celle de P1 contient une affirmation fausse sur T2, celle de P5 deux affirmations non conformes).

---

## 3. Statuts par tâche (9.1)

Statut lu dans le site enregistré, jamais dans la déclaration. Aucune aide de niveau 1, 2 ou 3 n'a été donnée dans la vague : **aucun statut C-A, P-A ni E-I**, et les seuils qui mentionnent « sans aide de niveau 2 ou 3 » sont satisfaits par construction.

| | T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|---|
| **P1** (déb.) | pos 1 · **C** · terminé | pos 2 · **C** · budget | pos 3 · **P** · abandon | pos 5 · **E** · budget | pos 4 · **C** · terminé (à la 40e action) |
| **P2** (des.) | pos 1 · **C** · terminé | pos 4 · **C** · terminé | pos 2 · **C** · terminé | pos 5 · **E** · budget dépassé (44) | pos 3 · **C** · terminé |
| **P3** (déb.) | pos 1 · **C** · terminé (reprise après INV) | pos 3 · **E** · terminé déclaré | pos 4 · **C** · terminé | pos 5 · **E** · abandon (38) | pos 2 · **C** · terminé |
| **P4** (des.) | pos 1 · **C** · terminé | pos 2 · **E** · budget | pos 4 · **C** · terminé | pos 5 · **E** · budget | pos 3 · **C** · terminé |
| **P5** (des.) | pos 1 · **C** · terminé (reprise après INV) | pos 3 · **C** · terminé | pos 2 · **C** · terminé | pos 5 · **E** · budget (arrêt à 38) | pos 4 · **C** · terminé |

**Total : 17 C, 1 P, 7 E sur 25 tâches** (0 C-A, 0 P-A, 0 E-I). Deux tâches INV (les premières T1 de P3 et de P5) sont exclues du dénominateur ; leurs reprises conservent la valeur de découverte à froid (11.6).

### Arbitrages

Préparateur, observateur et second codeur sont d'accord sur les 25 statuts. Les arbitrages portent sur ce que le statut signifie, sur un statut non proposé, et sur les points signalés :

- **P3-T4** — aucun statut proposé par le préparateur ; les deux codeurs lisent **E** indépendamment dans le site (C1 non : « 38 » et « 14 » sans mouvement ; C3 non) → **E** retenu (fiche-lecture-p3 T4 ; observation-p3 § T4 ; observation-p3-codeur2 § T4).
- **P1-T2 (réussite que la participante ne comprend pas comme telle)** → **C**, mode de fin budget. Le déclencheur `inView` est posé sur `rh_dishes_item`, modèle de la collection, donc sur les trois cartes, et la visite du préparateur montre les trois arriver ; sa croyance (« seul le premier plat a un cadre bleu ») n'est pas un critère de statut (9.1) et son compte rendu hors rôle, qui présente T2 en quasi-échec, est écarté (HORS). Statut C avec mode de fin BUD ⇒ **MM** imposé par 9.1, et écart matériel du récit ⇒ case **réussite non comprise** (fiche-lecture-p1 T2 ; observation-p1 T2-11, T2-12).
- **P2-T4 (budget dépassé, 44 actions)** → **E**, mode de fin « budget dépassé ». Le statut n'en dépend pas : 2 éléments sur 6, C1 et C3 jamais remplis à aucun instant. Les 4 actions hors budget viennent de 4 actions non comptées par la participante (deux défilements, deux loupes), pas du modérateur ; la dernière (v6, « démarre après « Photo de la salle » ») est enregistrée hors budget. Conséquence : la métrique « actions totales » de P2-T4 n'est pas comparable aux tâches arrêtées à 40 (observation-p2 § 6 ; fiche-lecture-p2 T4).
- **P4-T2 (diagnostic juste, correction non enregistrée)** → **E**, mode de fin budget. Le déclencheur de `rh_dishes_list` est resté sur `load` : site final équivalent à l'état de départ pour le critère visé, cas d'échec nommé en section 5. Le diagnostic juste et détaillé ne change pas le statut (9.1) ; il est rapporté à part comme le résultat le plus parlant de la tâche : **comprendre sans pouvoir agir** (fiche-lecture-p4 T2 ; observation-p4 PB1).
- **P4-T4 (pistes ajoutées mais laissées sans mouvement)** → **E**. Les pistes du paragraphe et de « Années » n'ont qu'une image-clé vide (`1400ms {}`, `1800ms {}`) : elles ne comptent pas comme mouvement (C1 : 2 sur 6), et ce ne sont pas des collatérales puisqu'elles visent des éléments de la consigne. Le récit affirme « le paragraphe se dévoile à son tour » : **seul écart matériel de la séance**, MM-V gravité 3, case échec ignoré (fiche-lecture-p4 T4 ; observation-p4 § T4 ; constats3 pt 21).
- **P1-T3** → **P** (R1 rempli, R2 rempli pour un seul des deux boutons : cas de réussite partielle explicitement prévu), mode de fin abandon ⇒ **MM** (9.1) : elle ignore avoir obtenu ce qu'elle voulait sur le premier bouton (fiche-lecture-p1 T3).
- **P1-T5** → **C** ; mode de fin « terminé déclaré », prononcé exactement à la 40e action, donc simultanément au budget : pas de MM, mais à lire comme « terminé au budget » (observation-p1 T5).
- **P5-T4** → **E** ; la participante s'arrête d'elle-même à 38 actions en le justifiant ; aucun critère manquant n'était atteignable en 2 actions. Le modérateur a prononcé la phrase de la 40e action à 38 : écart postérieur à la dernière action, sans contamination (observation-p5 § 6 ; observation-p5-codeur2 § 6).
- **P3-T2** → **E** ; site en version 0, journal vide, mention « non enregistré » de 5.0 applicable à la lettre : il a agi et rien n'est enregistré. Ce n'est pas une panne : les trois choix « Avec « Plats » » correspondent à l'état déjà en vigueur et ne produisent aucune opération (fiche-lecture-p3 T2 ; constats3 pt 3).

---

## 4. Métriques agrégées (9.3)

### 4.1 Par tâche

| Tâche | Positions | Statuts | Actions (médiane, étendue) | Actions jusqu'à la réussite (médiane) | SEQ (médiane, étendue) | FP (nombre, actions perdues) | Aides | COLL-ND |
|---|---|---|---|---|---|---|---|---|
| **T1** | 1 (toutes) | C×5 | 31 (9–36) | 10 (8–32) | 6 (3–6) | 1 FP, 4 actions | 0 | 0 |
| **T2** | 2, 2, 3, 3, 4 | C×3, E×2 | 33 (20–40) | 23 (15–37) sur les 3 réussites | 3 (2–6) | 6 FP, ≈ 40 actions | 0 | 0 |
| **T3** | 2, 2, 3, 4, 4 | C×4, P×1 | 25 (17–36) | 19 (16–33) | 6 (2–6) | 0 | 0 | 0 |
| **T5** | 2, 3, 3, 4, 4 | C×5 | 24 (15–40) | 15 (14–35) | 6 (5–7) | 1 FP, 10 actions | 0 | 0 |
| **T4** | 5 (toutes) | E×5 | 40 (38–44) | non atteint ×5 | 2 (2–3) | 2 FP, ≈ 10 actions | 0 | 0 |

Aucune modification collatérale ne subsiste dans aucun site final des 25 tâches : les 5 COLL relevées (P2-T4, P4-T2 ×2, et leurs récupérations) ont toutes été remarquées et retirées par leur auteur.

### 4.2 Par public

| | Débutants (P1, P3) | Designers (P2, P4, P5) |
|---|---|---|
| Statuts | 6 C, 1 P, 3 E sur 10 | 11 C, 4 E sur 15 |
| T1 | C, C | C, C, C |
| T2 | C (P1), E (P3) | C (P2), E (P4), C (P5) |
| T3 | P (P1), C (P3) | C, C, C |
| T5 | C, C | C, C, C |
| T4 | E, E | E, E, E |
| SEQ médiane T1 / T2 / T3 / T5 / T4 | 4,5 / 2,5 / 4 / 5 / 2,5 | 6 / 4 / 6 / 6 / 2 |
| Première action pertinente en T1 (lecture large / stricte) | 7 et 2 / 7 et 4 | 2, 2, 2 / 5, 4, 4 |
| VOC distincts sur la séance | ≈ 26 (P1), 6 (P3) | 1 (P2), 5 (P4), 4 (P5) |
| Aides | 0 | 0 |
| VERIF (vue visiteur) sur 5 tâches | 3 (P1), 0 (P3) | 4 (P2), 0 (P4), 4 (P5) |
| Agacement maximal déclaré | 2 (P1, une seule mesure donnée) ; 4 (P3) | 5 (P2), 3 (P4, aucun en T4), 4 (P5) |

**VERIF** : 11 tâches sur 25 comportent une vérification en conditions de visiteur. Deux participants n'en font jamais (P3 et P4) ; l'un applique sa fiche (« termine dès qu'un changement ressemble à la demande »), l'autre aussi (« je sais ce que ça va faire »).

### 4.3 Matrice réussite × compréhension (9.3)

25 récits comparés au site enregistré ; **5 écarts matériels**.

| | Pas d'écart matériel | Écart matériel |
|---|---|---|
| **C ou C-A** (17) | **réussite comprise : 15** | **réussite non comprise : 2** |
| **P, P-A, E, E-I** (8) | **échec lucide : 5** | **échec ignoré : 3** |

- **Échecs ignorés** (le participant croit le visiteur servi alors qu'il ne l'est pas) : **P3-T2** (« quand quelqu'un descend jusqu'aux plats, les trois cartes devraient arriver avec un petit effet » ; site en version 0, cartes lancées au chargement, déjà à o = 1 à l'arrivée) ; **P3-T4** (« le truc de rejouer à chaque passage, je l'ai fait que sur le titre et le paragraphe, pas sur la photo » ; le journal pose `once=false` sur le déclencheur de la photo, qui rejoue toute la chaîne) ; **P4-T4** (« à une seconde quatre, le paragraphe se dévoile à son tour » ; piste vide).
- **Réussites non comprises** : **P1-T2** (« les deux autres, l'agneau et la truffade, seront toujours déjà là, immobiles » ; les trois cartes arrivent) ; **P5-T3** (« le petit intitulé au-dessus […] arrive aussi » ; le surtitre ne porte aucun mouvement, ni au départ ni à la fin).
- **Réussites ignorées au sens du mode de fin** (9.1 : statut C ou P avec fin en budget ou abandon ⇒ MM) : **P1-T2** (C, budget) et **P1-T3** (P, abandon). P1 termine donc deux tâches sur cinq sans savoir qu'elle a obtenu ce qu'elle visait.
- Note : les trois écarts matériels d'échec sont portés par les deux participants qui n'ont jamais regardé la page en conditions de visiteur (P3, P4) et par eux seuls pour deux d'entre eux ; constat exploratoire, non testable à n = 5 (§ 11).

### 4.4 Codes d'affect et de valeur (détail en § 9)

78 codes positifs (SAT + VAL+) et 84 codes négatifs (FRU + VAL−) sur les cinq séances, déclaratif et comportemental confondus. Convention de comptage : un code portant deux étapes est attribué à la première citée ; les inventaires d'affect des cinq observateurs n'ont pas la même granularité (7 codes positifs chez P1 contre 21 chez P3 et P5), ce qui rend ces totaux comparables entre étapes mais **pas entre participants**.

---

## 5. Accord entre codeurs (P3 et P5 en double codage)

### 5.1 Ce qui converge

- **Les statuts** : accord total sur les 10 tâches doublement codées (P3 : C, C, E, C, E ; P5 : C, C, C, C, E), y compris sur les deux T4 pour lesquelles la fiche ne proposait pas de statut (P3) ou sur les critères desquelles les deux codeurs ont recalculé indépendamment.
- **Les verdicts d'écart matériel** : accord sur les 10 récits (P3 : écart en T2 et en T4 ; P5 : écart en T3 seulement), donc accord sur les cases de la matrice 9.3, qui est la mesure centrale de QR3.
- **Les mesures propres** : diagnostic T2-a de P3 faux chez les deux ; estimations T3-a justes chez les deux (P3 comme P5) ; S1, S2, S3 remplis séparément chez les deux pour P5-T5 ; aucune confusion bouton du héros / bouton de l'en-tête chez les deux.
- **Les deux chaînes de gravité 4** de chaque séance : pour P3, l'échec de T2 déclaré terminé (gravité 4 chez les deux) et l'abandon de T4 sur la répétition élément par élément (gravité 4 chez les deux) ; pour P5, l'échec de T4 sur la sélection du groupe des chiffres (gravité 4 chez les deux).
- **Les codes du dispositif** : aucun HALL, aucun CONN, aucun HORS en séance, chez les deux codeurs, pour les deux séances.

### 5.2 Ce qui diverge

| Point | Observateur | Second codeur | Arbitrage |
|---|---|---|---|
| P3-T2, cotation du récit | 3/8 (Quoi 1) | 2/8 (Quoi 0) | **3/8** : les éléments qu'il nomme bougent bien (au chargement), aucun en trop ; la faute porte sur « Quand », déjà cotée 0. Écart matériel dans les deux cas. |
| P3-T3, cotation du récit | 3/8 | 6/8 | **3/8** : le paragraphe, qui bouge, n'est pas cité (Quoi = 1, pas 2) ; le moment de lancement n'est pas dit (Quand = 1) ; T3-R ne contient ni durée ni nombre de fois, et T3-a est une autre question, pas une relance (Combien = 0). Sans effet : pas d'écart matériel dans les deux lectures. |
| P3-T4, cotation | 5/8 | 6/8 | Sans effet : écart matériel OUI dans les deux. |
| P3, événement d'origine de l'échec de T2 | HES gravité 4 à [6]–[7] | RATE gravité 4 aux mêmes actions | Même endroit, même gravité, même conséquence ; **codes différents**. Signalé, sans effet. |
| P3, nombre de fausses pistes en T2 | 2 FP (4 et 12 actions) | 4 FP (≈ 15 actions) | Différence de granularité, même total d'actions perdues. |
| P3, VOC « Au survol » | gravité 2 | gravité 1 | **2** (mot non compris, sans effet sur le résultat, barème 8.3). Sans effet sur la rétention. |
| P3, écarts à la persona | PERS relevé 5 fois (lecture de libellés de plus de deux mots, à l'origine de R2 en T3 et de tous les progrès de T4) | aucun PERS de ce type | **Retenu comme relevé par l'observateur** : la réussite de T3 et les progrès de T4 de P3 sont « possiblement surestimés » (A2, B1). |
| P5-T1 et T4, première action pertinente | rang 2 et rang 4 (lecture large) | rang 4 et rang 6 (lecture stricte) | **Les deux lectures sont rapportées** ; elles font basculer H1 (§ 8). |
| P5-T4, événement d'origine | FP gravité 4 ([33]–[38]) + ERR gravité 2 + RATE gravité 3 | ERR gravité 4 ([35]) + FP gravité 1, aucun RATE | Même cause, même gravité maximale, attribution différente. Sans effet sur le statut ni sur la gravité du problème. |
| P5-T4, test d'artefact sur la sélection du groupe | « problème d'interface **amplifié par le dispositif** », gravité 4 → 3 | « problème d'interface », gravité 4 | **Amplifié par le dispositif, gravité 3**, mention « à confirmer avec des utilisateurs réels » : le segment « Chiffres » était visible et lisible (mesuré à ≈ 57 px de capture de l'endroit cliqué), ce qu'une pleine résolution aurait facilité ; le résidu d'interface (aucun clic dans la page ne sélectionne un bloc intermédiaire) est confirmé par le préparateur (constats3 pt 13). |

### 5.3 Ce que vaut cet accord

L'accord est **total sur les résultats** (statuts, récits, diagnostics, chaînes causales majeures) et **partiel sur le codage des événements** : sur P3, l'observateur pose 35 lignes contre 23 au second codeur, et j'estime à environ la moitié la part des événements portant le même code au même endroit (± 2 actions) avec la même gravité — soit **en deçà du seuil de 80 % fixé en 8.4.10**, qui aurait dû déclencher un addendum de précision des définitions et un recodage des cinq séances pour les codes en cause (FP, HES, RATE, ERR). Conséquences pour ce rapport : **les comptes de FP, HES et RATE ne sont pas fiables** et ne sont utilisés ici que comme ordres de grandeur ; les statuts, les critères lus dans le site, les concordances de récit et les gravités maximales des chaînes le sont. Enfin, les deux codeurs sont des modèles proches (Opus 5 et Sonnet 5), et B9 prévoit qu'un tel accord **surestime** la fiabilité : le fait qu'ils divergent malgré cela sur les codes d'événements est un signal à prendre au sérieux, pas une anomalie isolée.

---

## 6. Problèmes retenus (11.1 à 11.3), par priorité (11.2)

Rappels valables pour les quatorze fiches : **A4** (consigne comprise autrement que l'intention par ≥ 2 participants) est **négatif partout** — aucun passage de parole avant action ne montre un participant redéfinissant la mission. **A5** : les états de départ lus dans les cinq fiches sont conformes à l'annexe A pour les 25 tâches ; mais l'**environnement** de test ne l'est pas sur deux points déclarés (addendum 3, pt 2 : listes déroulantes rendues dans la page, vérifié dans la CSS de la copie de test, constats3 pt 14 ; et pt 11 : aucune perception continue du mouvement, captures fixes). A5 est donc répondu explicitement dans chaque fiche concernée. **A6** est négatif partout (aucune aide, aucune parole hors script portant sur le chemin ou le résultat). **A8** : chaque problème indique s'il repose sur un passage HALL — un seul HALL avéré dans la vague (P2, reconstruction au débriefing sur le sens d'ouverture des listes) et un contesté (P4-T4).

---

### P-1 · Composer une scène oblige à refaire tout le parcours pour chaque élément ; rien ne permet de régler plusieurs éléments à la fois — **gravité 4**

- **Étape** : Composer. **Tâche** : T4 (position 5 chez les cinq). **Publics** : les deux ; public principal de T4 : designers.
- **Participants : 5 sur 5.** Occurrences : gravité 4 chez 5 (4 budgets — P1, P2, P4, P5 — et 1 abandon — P3) ; gravité 3 en appui chez P4 (coût de piste) ; codes FRU associés chez 5 sur 5.
- **Observé** : P1 dépense 12 actions pour la photo, 8 pour le titre, 12 pour le paragraphe, et n'atteint jamais les chiffres ; P3 abandonne à 38 actions avec 4 éléments sur 6 ; P4 pose 4 pistes en 40 actions, dont 2 restent vides ; P5 s'arrête à 38 avec 3 sur 6 ; P2 s'arrête à 44 avec 2 sur 6. **Aucun des cinq ne remplit C1.**
- **Citations** : « Ça fait vraiment trop d'étapes qui se répètent, je commence à plus m'en sortir » (P3, T4 [38], abandon). « C'est le coût de chaque geste : une piste, c'est quatre réglages dans quatre endroits […] Un de mes juniors n'aurait jamais fini » (P4, T4-SEQ, note 2). « sept ou huit gestes par élément […] C'est l'accumulation qui coince » (P5, T4-SEQ).
- **A1** non (procédure et nombre de gestes, sans rapport avec la perception). **A2** : aucun CONN ; un PERS possible chez P3 (abandon hors de ses trois règles écrites) — sans lui, le budget était atteint deux actions plus tard avec le même échec, le problème n'est donc pas écarté ; PERS chez P4 (aucun agacement déclaré en T4), sans rapport causal. **A3** : comportement identique chez des personas opposées — retenu parce qu'une cause est citée dans les captures (parcours panneau par élément, aucun réglage multiple visible). **A4** non. **A5** : états de départ conformes ; part du dispositif à retrancher : chaque capture coûte une action (B14) et P2 perd 17 de ses 44 actions dans les listes déroulantes (artefact, voir S-1). **A6** non. **A7** : T4 est toujours en position 5, donc mesurée **après** l'apprentissage de quatre missions : le coût rapporté est un **plancher**. **A8** non.
- **Cause qualifiée** (constats3 pts 22 et 24, confirmant l'observation) : « chaque piste se règle en quatre endroits différents — élément, départ, cible, préréglage — et il faut recommencer intégralement le parcours pour chacune » ; les barres de la ligne de temps ne se déplacent pas à la souris.
- **À confirmer avec des utilisateurs réels** (amplification par le budget d'actions et par le coût des captures).

### P-2 · Le moment de lancement d'une animation existante ne se règle pas là où il est écrit — **gravité 4**

- **Étape** : Lancer. **Tâche** : T2 (positions 2, 2 et 3). **Publics** : les deux (public principal de T2 : les deux).
- **Participants : 3 sur 5** (P1 débutante, P3 débutant, P4 designer). Occurrences : gravité 4 chez P4 (échec, budget) et chez P3 (échec déclaré terminé) ; gravité 3 chez P1 (10 actions perdues à chercher un réglage absent du panneau, puis contournement par une seconde animation).
- **Observé** : chez P4, la phrase « Au chargement de la page : les enfants de « Plats » en ensemble (fondu en montant) en 600 ms » donne le diagnostic en une lecture, mais elle n'est pas cliquable (captures 013 et 014 strictement identiques) ; le menu « Quand » est dans la rubrique repliée « Animations lancées par « Plats » », en bas du panneau, dans une ligne à déplier : 9 actions de recherche, puis un pari à l'aveugle qui ne change rien. Chez P1, le panneau détaillé n'offre aucun contrôle du moment : 10 actions (13 à 22), puis elle crée une seconde animation à côté, l'ancienne subsistant. Chez P3, le moment n'est visible que dans une phrase du panneau de la carte, jamais lue.
- **Citations** : « je sais exactement ce qui cloche mais je ne trouve pas où changer le "quand" d'une animation déjà créée » (P4, T2 action 32). « ne pas trouver un interrupteur que l'outil m'affichait en toutes lettres à trois centimètres de là » (P4, T2-SEQ).
- **A1** non (captures parfaitement lisibles, information absente et non imperceptible). **A2** : aucun CONN ; aucun PERS à l'origine — atténuation à signaler, la fiche de P4 prévoit qu'il ne lit jamais les textes d'aide, et le texte « Comment lire cet écran » nomme la rubrique. **A3** : les trois participants ont des styles opposés et une cause visible est citée → retenu. **A4** non. **A5** : état de départ conforme ; sans rapport avec les listes déroulantes ni avec la perception. **A6** non. **A7** : observé aux positions 2 (P1, P4) et 3 (P3) ; P5 réussit en position 3 et P2 en position 4 — l'ordre n'explique pas la différence, pas de mention d'effet d'ordre. **A8** non.
- **Cause qualifiée** (constats3 pt 15) : le mode Animation affiche le moment comme un constat, avec la durée, la ligne de temps et les courbes modifiables, tandis que le menu qui le commande est ailleurs, replié.
- **Résultat contraire à l'intention de conception, rapporté tel quel** : les deux participants qui ont réussi T2 (P2, P5) sont passés par la rubrique Animation du panneau de droite et l'encart « Arrive avec « Plats » » + le lien « Régler sur « Plats » », qui mènent au bon endroit en un clic ; les trois qui ont échoué ou peiné sont passés par le mode Animation (P1, P4) ou n'ont pas lu l'encart (P3). **Les deux entrées ne donnent pas accès aux mêmes réglages.**

### P-3 · Un champ numérique validé par Entrée s'applique deux fois : le premier Ctrl+Z ne défait rien, et une piste peut être corrompue — **gravité 4**

- **Étape** : Régler, Composer. **Tâches** : T3 et T4 (P1), T1 et T3 (P4), T3 (P5).
- **Participants : 3 sur 5** pour le fait (attesté au journal), **1 sur 5** pour la conséquence. Occurrences : gravité 4 chez P1 (T3, origine directe de l'abandon) ; gravité 2 chez P1 (T4, images-clés du titre écrasées) ; gravité 0 chez P4 (14 versions pour 7 changements en T1 ; doublons en T3) et chez P5 (T3, v2/v3 et v4/v5), sans conséquence observée.
- **Observé** : P1 saisit « 700 » dans « Départ » et lit « 1400 » (T4, capture 011) ; en T3, son Ctrl+Z n'annule que le doublon, l'écran ne change pas et le numéro de version augmente.
- **Citations** : « Rien n'est revenu […] Seul le petit numéro à côté de « Enregistré » a changé en haut. Donc Ctrl+Z ne remet pas le bouton, et c'est enregistré en plus. » (P1, T3 [26]–[27]). « La peur de casser, d'abord. Des choses disparaissent de la page, un Ctrl+Z ne remet pas toujours comme avant, et c'est marqué « Enregistré » tout de suite » (P1, D-FIN-8).
- **A1** non (le journal l'atteste indépendamment de toute perception). **A2** : aucun CONN ; l'abandon de P1 applique à la lettre sa règle de fiche, donc pas de PERS. **A3** non applicable (un seul participant en porte la conséquence). **A4** non. **A5** : conforme ; sans rapport avec les listes déroulantes ni la perception. **A6** non. **A8** non (captures et journal).
- **Cause qualifiée, vérifiée dans le code** (constats3 pts 1, 8 et 10) : `NumberInput` — Entrée appelle `commit()` puis `blur()`, et `onBlur` rappelle `commit()` dans le même rendu, d'où deux opérations identiques à 50 ms. Le pt 10 rattache à la même cause le compteur « 4 500 / 1 500 ms » de P1 (position de lecture mise à l'échelle deux fois) ; P4 observe la même anomalie une fois (« 2 880 / 1 200 ms », T3), sans explication dans sa trace.
- **Facette mineure du même endroit** : pas d'aimantation de la tête de lecture sur la fin ni sur les graduations (P4, T1, clic à 590 ms au lieu de 600, ERR gravité 2 récupérée seule).

### P-4 · Sur une carte qui hérite du mouvement de sa liste, le choix proposé ne produit aucune opération et l'écran laisse croire le contraire — **gravité 4**

- **Étape** : Lancer. **Tâche** : T2 (position 3). **Public** : débutant (1 participant) ; public principal de T2 : les deux.
- **Participant : 1 sur 5** (P3). Occurrences : gravité 4 ×2 (l'événement d'origine, puis « J'ai terminé » sur un échec total), gravité 3 ×2 (fausse piste de 12 actions ; diagnostic faux), gravité 2 ×2.
- **Observé** : la liste sous « Apparition » de la carte propose « Avec « Plats » » en tête, option **déjà en vigueur** ; la choisir n'écrit rien au journal, mais le lien « Régler sur « Plats » » passe de texte simple à bouton (captures 004 → 006, 010), ce que le participant prend pour la confirmation que son réglage a pris. Il répète le geste sur les trois cartes, déclare terminé, et récite un résultat faux.
- **Citations** : « [19] fait, ça a marché pareil, le bouton est devenu plein comme pour le premier » (P3, T2). « Ce que j'ai compris, c'est que chaque plat avait son propre réglage d'animation tout seul dans son coin, séparé du bloc général « Plats » » (P3, T2-a, diagnostic faux).
- **A1** non (phrase, valeurs et changement d'aspect lisibles à 800 × 500). **A2** : aucun CONN ; ne pas lire une phrase longue est conforme à sa fiche — ce n'est pas un PERS, et le problème touche précisément les personnes qui ne lisent pas les phrases. **A3** non applicable. **A4** non. **A5** : conforme. **A6** non. **A8** : le changement d'aspect du lien est attesté par les captures pour l'observateur ; le second codeur ne peut pas le confirmer à cette résolution et s'abstient de coder HALL — **divergence signalée** ; la conclusion ne dépend pas de ce détail, l'absence totale d'opération au journal suffit.
- **Cause qualifiée** (constats3 pt 3) : la liste montre « Fondu en montant » coché alors que « Avec « Plats » » est l'état en vigueur ; la choisir ne fait rien.

### P-5 · Une animation héritée d'un ancêtre n'est signalée nulle part sur l'élément qu'elle fait bouger (mode Animation) — **gravité 4**

- **Étape** : Découvrir. **Tâche** : T2 (position 2). **Public** : designer (1 participant) ; public principal de T2 : les deux.
- **Participant : 1 sur 5** (P4). Occurrence : gravité 4 (origine d'une fausse piste de 14 actions, chaîne menant au budget et à l'échec).
- **Observé** : la rubrique « Animations lancées par Carte plat » est **vide** alors que la carte bouge ; il en conclut que rien n'anime les plats et se met à leur « bricoler » une animation dans celle du titre. L'information n'apparaît qu'après coup, sous forme d'avertissement, une fois une piste posée sur le parent.
- **Citations** : « la rubrique "Animations lancées par Carte plat" est vide : rien n'est attaché à cette carte » (P4, T2 action 8). « je suis parti du principe que rien n'avait été fait sur les plats » (P4, T2-b).
- **A1** non. **A2**, **A4**, **A5**, **A6**, **A8** : rien à signaler ; état de départ conforme.
- **Contrepoint à porter au rapport** : l'avertissement « "Plats" a aussi ses propres animations (Fondu en montant) : elles se jouent en plus », découvert à l'action 22, est cité deux fois par le participant comme un point fort (« C'est de l'attention au vrai travail ») et lui évite un double fondu. Le même produit signale l'héritage dans une entrée (panneau de droite, encart « Arrive avec « Plats » ») et pas dans l'autre.
- **Voisin, même cause de fond, autre endroit** : chez P1 (T2), une animation posée sur la carte-modèle d'une collection n'est signalée que sur la première occurrence (cadre bleu sur une seule carte), d'où la **réussite non comprise** (gravité 3, constats3 pt 6).

### P-6 · En mode Animation, un élément dont la piste démarre après la tête de lecture disparaît du canevas et passe pour supprimé — **gravité 4**

- **Étape** : Régler, Composer, Vérifier. **Tâches** : T3 (position 3) et T4 (position 5). **Public** : débutante (1 participante).
- **Participante : 1 sur 5** (P1). Occurrences : gravité 4 (T3, origine de la chaîne qui mène à l'abandon), gravité 2 (T4, deuxième occurrence, cette fois correctement interprétée par elle).
- **Observé** : à la place du bouton « Réserver une table », une étiquette bleue et un cadre en pointillés vide ; dans le panneau, « INSTANT 500 MS » et « Opacité 0 % » (capture T3-011). Le réglage est pourtant correct dans le modèle.
- **Citations** : « Le bouton « Réserver une table » a disparu […] je crains d'avoir cassé quelque chose » (P1, T3 [20]–[25]). « J'ai abîmé le bouton du site d'Aurèle, je ne touche plus à rien. J'abandonne. » (P1, T3 [27]).
- **A1** non : le problème ne disparaîtrait ni avec une perception continue ni à pleine résolution ; l'information « INSTANT 500 MS » est présente mais rien ne la relie à ce qu'elle voit. **A2** : aucun CONN ; l'abandon applique sa règle de fiche à la lettre. **A3** non applicable. **A4** non. **A5** : conforme. **A6** non. **A8** non (deux captures attestent).
- **Cause qualifiée** (constats3 pt 2) : le canevas affiche les éléments à l'instant de la tête de lecture ; un élément qui démarre plus tard y est invisible, sans que rien ne le dise. Les captures de P4 (T4-007, T4-008) montrent le même comportement chez un designer, qui l'interprète correctement et sans coût.

### P-7 · On ne sait pas quel niveau on attrape en cliquant, et un bloc intermédiaire n'est pas sélectionnable dans la page — **gravité 3** (amplifié par le dispositif)

- **Étape** : Choisir, Composer. **Tâches** : T2 (positions 2 et 3) et T4 (position 5). **Publics** : les deux.
- **Participants : 3 sur 5** (P3, P4, P5). Occurrences : gravité 4 ramenée à 3 chez P5 (chaîne qui clôt T4 : trois tentatives, 6 actions, échec) ; gravité 3 chez P4 (T4, le clic entre deux chiffres attrape « 12 » seul, ERR non récupérée, C1/C3b/C5 non remplis pour les chiffres) ; gravité 2 chez P3 (T2, le clic sur la 3e carte sélectionne l'« Image » intérieure) et chez P4 (T2, VOC « ses enfants » selon le niveau, ≈ 7 actions).
- **Citations** : « Je voyais le mot « Chiffres » écrit dans ce chemin, je savais que c'était exactement ce que je voulais, et je n'ai pas réussi à mettre le doigt dessus » (P5, T4-b). « on ne sait jamais quel niveau on attrape […] À chaque fois il faut aller lire le fil d'Ariane après coup » (P4, D-FIN-3).
- **A1** : **oui en partie** pour P5 — les segments du fil d'Ariane font ≈ 6 px de haut dans une capture 800 × 500 et l'écart de visée mesuré est d'environ 57 px de capture ; l'interface n'offre, dans les captures, **aucune autre représentation visible de la structure de la page** → **problème d'interface amplifié par le dispositif, gravité réduite de 4 à 3**. Pour P3 et P4 la réponse est non (fil d'Ariane et titre de panneau lisibles ; l'information manquante est temporelle — avant le clic — pas visuelle). **A2** : ni CONN ni PERS. **A3** : trois personas opposées, causes citées dans les captures → retenu. **A4** non. **A5** : états de départ conformes ; part de dispositif isolée ci-dessus. **A6** non. **A7** : T2 en positions 2 et 3, T4 en 5 → pas de concentration sur les positions précoces. **A8** : la conclusion de P5 (« sélection d'un groupe impossible à viser ») est **écartée** ; seul le comportement observé est retenu.
- **Cause qualifiée** (constats3 pts 4 et 13, ce dernier reformulé après le codage) : un clic sur une carte voisine du même modèle descend d'un niveau ; le conteneur « Chiffres » n'est atteignable ni au clic dans la page ni par le fil d'Ariane une fois la sélection changée.
- **À confirmer avec des utilisateurs réels** (mention obligatoire : amplifié par le dispositif).

### P-8 · Sur un élément « technique », la rubrique Animation est placée après une longue section de réglages inconnus, et le participant repart — **gravité 3**

- **Étape** : Lancer, Découvrir. **Tâches** : T2 (position 3), T4 (position 5). **Publics** : les deux.
- **Participants : 2 sur 5** (P3, P5). Occurrences : gravité 3 chez P3 (deux passages par le panneau « Plats » sans jamais faire défiler jusqu'à « Démarre », contribution directe à l'échec) ; gravité 2 chez P3 (VOC « Base », « Filtre », « Tri », « Limite ») et chez P5 (VOC « composant », « instance » : « je n'ai pas osé y toucher »).
- **Citations** : « Bon, ce panneau-là a l'air compliqué, y a trop de trucs que je comprends pas » (P3, T2 [12]–[13]). « je n'ai pas compris ce que je modifiais quand je réglais celui sur lequel j'avais cliqué, et c'est justement pour ça que je n'ai pas osé y toucher » (P5, D-FIN-5).
- **A1** non (il fallait faire défiler dans les deux cas ; libellés lisibles). **A2** : quitter un écran chargé est conforme à la fiche de P3 (pas un PERS) ; aucun CONN. **A3** : deux personas opposées, cause citée. **A4** non. **A5** : conforme. **A6** non. **A8** non.
- **Nuance à porter au rapport** : P2 et P5 ont atteint le même panneau « Plats » par le même lien et y ont trouvé le réglage sans difficulté (T2 réussie). Le problème n'est donc pas l'inaccessibilité, mais l'ordre des sections et le vocabulaire qui précède.
- **Cause qualifiée** (constats3 pt 3) : « Régler sur « Plats » » ouvre l'inspecteur de la liste en haut (vue de base de données) ; la section Animation et son moment de lancement restent hors de vue.

### P-9 · Le déclencheur au passage de la souris n'est pas nommé dans les mots des débutants, et « À la souris » est compris comme le survol — **gravité 3**

- **Étape** : Lancer. **Tâches** : T5 (positions 2 et 4), T1. **Public : débutants seulement** (public principal de T5 : débutants). Aucun designer n'a été gêné.
- **Participants : 2 sur 5** (P1, P3). Occurrences : gravité 3 chez P1 (fausse piste de 10 actions : « À la souris » choisi, animation ajoutée puis annulée) ; gravité 3 (RATE : « Au survol » lisible une ligne au-dessus dès l'action 16, retenu à l'action 30) ; gravité 2 puis 1 chez P3 (mot non compris, choix juste par élimination).
- **Citations** : « « À la souris » : j'ai compris « quand on passe la souris dessus », et c'était faux » (P1, D-FIN-5). « « Au survol », je sais pas ce que ça veut dire, je connais pas ce mot » (P3, T1 [5]).
- **A1** non (libellés). **A2** : « survol » figure dans la liste « vocabulaire inconnu » des deux débutants — comportement attendu de la persona, donc ni CONN ni PERS ; le problème n'est pas écarté, il est **circonscrit au public débutant**. **A3** : deux styles opposés (lit tout / ne lit rien), cause citée dans la capture (les deux libellés voisins dans la liste « Quand »). **A4** non. **A5** : conforme. **A6** non. **A8** non.
- **Atténuation** : chez P1, la phrase de résumé (« Quand la souris se déplace de haut en bas dans la fenêtre… ») a permis la récupération seule, sans aide ; le résultat final est C.

### P-10 · Le rejeu « à chaque passage » n'existe pas dans la liste de répétitions de la ligne de temps — **gravité 3**

- **Étape** : Lancer. **Tâche** : T4 (position 5) ; facette en T5. **Publics** : les deux (public principal de T4 : designers ; un designer concerné).
- **Participants : 2 sur 5** (P1, P4). Occurrences : gravité 3 chez P1 (C6 non rempli, aucun libellé lisible ne propose de rejouer à chaque arrivée) ; gravité 3 chez P4 (RATE : le menu de répétition « Une fois » est affiché en permanence, jamais ouvert, C6 non rempli) ; gravité 2 chez P1 en T5 (« Une fois » lu comme « une fois par visite » pour un effet au survol).
- **Citations** : « j'avais seulement vu « Une fois », « 2 fois », « 3 fois » et « En boucle », et aucun ne dit « chaque fois qu'on revient » » (P1, T4 [40]). « Je n'ai pas touché à ce réglage, je n'ai même pas cherché où il se trouve » (P4, T4-R).
- **A1** non (libellés lisibles). **A2** : ni CONN ni PERS ; la fiche de P4 prévoit qu'il ignore les textes d'aide (atténuation). **A3** : une débutante et un designer, causes citées. **A4** non. **A5** : conforme. **A6** non. **A7** : T4 toujours en position 5. **A8** non.
- **Cause qualifiée** (constats3 pt 9) : la liste des répétitions (Une fois / 2 fois / 3 fois / En boucle) est lue comme le réglage « chaque fois qu'on revient » ; le choix « à chaque passage », qui appartient au déclencheur, n'apparaît pas dans ce parcours.
- **Résultat contraire à l'intention, rapporté tel quel** : les trois participants qui ont trouvé « Rejouer : à chaque passage » (P2, P3, P5) l'ont vu dans la rubrique Animation du panneau de droite, où il est écrit en toutes lettres ; P2 l'obtient « très tôt, sans détour » et c'est le seul critère qu'elle remplit en T4. **Même écart d'une entrée à l'autre que P-2.**

### P-11 · Deux mots pour faire attendre un élément (« Départ » d'une piste, « Délai » d'un déclencheur), à deux endroits, dont l'un est enterré — **gravité 3**

- **Étape** : Régler, Composer. **Tâches** : T3 (position 4), T2 (position 2), T4. **Public** : designer (1 participant) ; public principal de T3 : designers.
- **Participant : 1 sur 5** (P4). Occurrences : gravité 3 (6 actions de navigation en T3, 6 en T2 pour atteindre un simple chiffre) ; gravité 2 (ERR : déplier la ligne du second bouton recharge l'animation en haut du panneau et renvoie le défilement en haut, 3 actions perdues, récupérée seule) ; gravité 1 (déclaratif, deux mots pour la même idée — aucune erreur observée).
- **Citations** : « toujours enterré tout en bas, il faut défiler deux fois et déplier deux rubriques pour un simple chiffre » (P4, T3 action 20). « la moitié de mes manipulations ont servi à naviguer, pas à régler » (P4, T3-SEQ).
- **A1** non. **A2** : rien. **A4** non. **A5** : conforme. **A6** non. **A7** : T3 est en position 4 chez P4, qui retrouve le champ grâce à T2 — le coût mesuré est un **plancher**, mention « possible effet d'ordre » en sens inverse. **A8** non.
- **Cause qualifiée** (constats3 pts 19 et 23).
- **À confirmer avec des utilisateurs réels** (mention obligatoire : possible effet d'ordre).

### P-12 · Une piste ajoutée mais jamais remplie ne se distingue pas d'une piste qui porte un mouvement — **gravité 3**

- **Étape** : Composer. **Tâche** : T4 (position 5). **Public** : designer (1 participant).
- **Participant : 1 sur 5** (P4). Occurrence : gravité 3 (MM-V : seul écart matériel de sa séance ; C1 et C3 non remplis en partie de ce fait).
- **Observé** : deux pistes (paragraphe, « Années ») avec une seule image-clé vide ; ni la ligne de temps ni la phrase de résumé ne le signalent ; il croit avoir animé le paragraphe et le raconte.
- **Citation** : « Puis, à une seconde quatre, le paragraphe se dévoile à son tour » (P4, T4-R) — piste `1400ms {}`, aucune propriété.
- **A1** non (information textuelle, pas perceptive). **A2** : aucun CONN ni PERS. **A4** non. **A5** : **l'occurrence a été déclenchée par un artefact** — le clic qui devait remplir la piste est tombé au-dessus d'une liste déroulante rendue dans la page (addendum 3 pt 2 ; voir S-1) ; l'absence de signalement, elle, est attestée indépendamment (constats3 pt 21 : rien dans la ligne de temps ni dans la phrase de résumé ne signale une piste sans mouvement). **A6** non. **A8** : le passage porte un code HALL contesté par l'observateur lui-même — il s'agit d'une affirmation sur un réglage cru posé, non d'une perception ; le fait est établi par le journal, la règle A8 n'écarte donc pas le constat.
- **À confirmer avec des utilisateurs réels** (événement déclencheur artefactuel).

### P-13 · « ms » sans équivalent en secondes : une contrainte chiffrée de la consigne devient invérifiable — **gravité 3**

- **Étape** : Régler. **Tâches** : T1, T3, T4. **Public : débutants seulement** (les trois designers lisent les millisecondes sans difficulté et calculent juste).
- **Participants : 2 sur 5** (P1, P3). Occurrences : gravité 3 chez P1 (en T4, elle ne peut pas vérifier « deux secondes et demie » ; en T1 et T2, la dimension « Combien » du récit est perdue) ; gravité 2 chez P1 (T3 : « j'ai triplé le chiffre, de 500 à 1500, sans savoir ce que ça représente ») ; gravité 1–2 chez P3 (déclaratif, aucun effet sur le résultat).
- **Citations** : « Pour les deux secondes et demie, je ne sais pas si « 2 100 ms » les respecte, puisque je ne sais pas ce que valent ces « ms » » (P1, T4 [40]). « je toucherais pas aux trucs avec des chiffres et des « ms », je comprends pas ce que ça représente » (P3, D-FIN-4).
- **A1** non (libellé). **A2** : « ms » figure dans la liste « vocabulaire inconnu » des deux débutants — comportement attendu, ni CONN ni PERS. **A3** : deux styles opposés ; cause citée (le champ affiche « 700 ms », aucun équivalent). **A4** non. **A5** : conforme. **A6** non. **A8** non.
- **Circonscrit au public débutant** ; non généralisé aux designers.

### P-14 · Deux croix de même dessin : l'une referme le panneau, l'autre supprime l'animation — **gravité 2**

- **Étape** : Retirer. **Tâches** : T5 (position 3), T1 (position 1). **Publics** : les deux.
- **Participants : 2 sur 5** (P4, P1). Occurrences : gravité 2 chez P4 (ERR : clique la croix pour supprimer, elle referme ; récupérée seule, 2 actions) ; gravité 1 chez P1 (elle ne trouve pas comment fermer le panneau et craint que fermer efface l'animation ; la croix est pourtant visible dans la capture 007 et elle ne la reconnaît qu'au débriefing).
- **Citations** : « Deux croix identiques pour deux actions opposées, c'est le genre de détail qui fait supprimer une animation par erreur un jour » (P4, T5 action 8). « Il y avait juste une petite croix » (P1, D-FIN-3).
- **A1** non (les deux croix sont lisibles ; le défaut est l'identité de forme). **A2**, **A4**, **A5**, **A6**, **A8** : rien à signaler.
- **Cause qualifiée** (constats3 pt 17).

---

## 7. Signaux faibles (non retenus, avec la raison)

| Signal | Observé chez | Raison de la non-rétention |
|---|---|---|
| **S-1 · Les clics dans une liste déroulante tombent une ligne à côté, ou dans le champ voisin** | P2 (T4 : 17 actions sur 44, 6 ERR, budget dépassé, agacement 5/5 ; T2 : 1 ERR), P4 (T4 : 2 ERR non récupérées, deux critères perdus) | **Artefact du dispositif prépondérant (A5, strict)** : les listes déroulantes de la copie de test sont rendues dans la page par une adaptation déclarée (addendum 3 pt 2), vérifiée dans la CSS de la copie de test (`appearance: base-select`, mise en forme de `::picker(select)`, constats3 pt 14) ; leur placement, leur sens d'ouverture et leur taille ne sont pas ceux de l'éditeur livré. À 800 × 500 pour un écran de 1 440 × 900, une ligne mesure 15 px, soit 27 px réels : l'erreur d'une ligne n'est pas un geste humain. La géométrie mesurée par l'observateur de P4 (liste ancrée par son bas sur le champ : décalage de 16 px pour le titre, 41 px pour le paragraphe) explique intégralement ses deux erreurs. **Résidus à confirmer sur l'éditeur livré** : la densité de la liste (20 entrées d'environ 15 px sans séparation forte entre familles, qui vient du produit, constats3 pt 20) ; et le champ « Démarre » qui passe d'une à deux lignes selon la longueur de l'option choisie, ce qui décale le champ « Délai » sous lui (attesté par les captures 014 et 021 de P2, indépendamment du rendu). La description qu'en donne P2 au débriefing (« tantôt vers le bas, tantôt vers le haut ») est **écartée par A8** : les six ouvertures de liste capturées de sa séance s'ouvrent toutes vers le haut. |
| **S-2 · Aucune animation ne peut être vue en train de se jouer** | les 5 | **A1 : oui, artefact probable.** Le problème disparaîtrait avec une perception continue, et l'interface offre d'autres représentations visibles que les participants ont **utilisées** avec succès (phrases de résumé, durées chiffrées, badge « + N animations », lien « Tester sur le site ») : P2 obtient 7/8, 6/8 et 8/8 de concordance sans rien voir, P5 8/8 quatre fois sur cinq. **A5 (strict)** : le dispositif interdit la perception du mouvement par construction (captures fixes, addendum 3 pt 11) ; un visiteur réel verrait ces animations. Coût mesuré : ≈ 3 actions chez P1 en T1, 17 sur 33 chez P2 en T1, 4 chez P5 en T1. **Sous-cas non tranchable** : le bouton « Jouer dans le canevas » ne produit aucune différence entre deux captures consécutives (P5, captures 006/007/008 ; P2, capture 011) — on ne peut pas savoir si le clic n'a rien fait ou si l'animation de 700 ms s'est terminée avant la capture ; par ailleurs les captures 007 et 008 de P4-T4 montrent que le canevas **restitue bien** l'état des images-clés à la tête de lecture. **À confirmer avec des utilisateurs réels** ; c'est le seul point où l'étude est structurellement aveugle. |
| **S-3 · Rien ne dit quels éléments d'une page portent une animation sans les sélectionner un par un** | P5 (écart matériel de T3), en appui P2 et P3 (omissions dans les récits) | **A1 : oui** — voir la page se charger aurait montré que le surtitre ne bouge pas ; et l'interface offre le badge « + N animations », que P5 sait lire et utilise en T5. Artefact probable → signal faible. À reprendre avec de vrais utilisateurs : l'écart lui-même (un élément décrit comme animé alors qu'il ne l'est pas) reste un fait du site. |
| **S-4 · Le panneau détaillé du mode Animation s'ouvre d'office sur du jargon et une ligne de temps vide ; les choix tout prêts sont derrière « Nouvelle animation (à composer) »** | P1 (FP de 4 actions, VOC sur 6 mots inconnus dans le premier texte lu, gravité 2) | Un seul participant, gravité 2 : ni la condition « 2 participants » ni « gravité ≥ 3 » (11.2). **Résultat contraire à l'intention, à rapporter tel quel** : le même panneau est le premier moment de valeur de P4 (« Là on parle », « ces gens-là ont déjà fait du motion ») et la première peur de P1 (« Ce panneau est trop complexe […] j'ai tout annulé »). Cause décrite en constats3 pt 5. |
| **S-5 · La liste de choix d'animation contient des lignes strictement identiques en double et la ligne de la page en cours y manque** | P1 (T2, FP de 6 actions, quatre lignes « Du site · Fondu en montant · Plats · La carte », capture 016) | Un seul participant, gravité 2. Attesté par capture ; à surveiller. |
| **S-6 · « Sur mesure : NNN ms » affiché sans qu'aucun bouton Rapide / Normale / Lente soit allumé** | P5 (T3, répété au débriefing) | **Condition 11.2.1 non remplie** : opinion répétée sans comportement associé (elle clique « Lente » et n'a jamais cherché à saisir une durée). Les valeurs en cause viennent de la préparation des tâches (constats3 pt 11). |
| **S-7 · Fil d'Ariane « Page > À la carte > … » affiché sur la page d'accueil** | P5 (T2) | Gravité 1, dissipé en une capture, aucune action perdue (constats3 pt 12). |
| **S-8 · « Décalage » désigne deux choses dans le même panneau (pixels et millisecondes)** | P4 (déclaratif) | **Condition 11.2.1 non remplie** : aucune erreur observée, il emploie le bon champ dans chaque contexte. Les deux sens sont co-visibles sur la capture 013 (constats3 pt 25). |
| **S-9 · L'accès « Ouvrir dans le mode Animation » / l'onglet Animation n'est pas employé par ceux qui composent depuis le panneau de droite** | P2 (RATE gravité 2 en T4), P5 (jamais ouvert) | La clause « qui aurait mené au but » de la définition de RATE **n'est pas établie** : aucun observateur n'a pu constater le contenu de ce mode depuis les captures disponibles. Seule la visibilité de l'accès est attestée. |
| **S-10 · Pas de réglage visible de la sortie de survol ni du seuil de déclenchement à l'entrée dans l'écran** | P4 (T5, T1), P1 (T5, « Une fois » sur un survol) | Gravité 1 ; S3 est rempli chez les cinq, aucun critère perdu. La part « sortie de survol » relève d'A1 (il ne peut pas la constater). Constats3 pt 18. |
| **S-11 · L'indicateur « + n animation » disparaît du panneau d'un élément dont l'animation est pilotée par un autre** | P2 (T4) | Gravité 1, aucun coût observé : elle ne le remarque pas. Non artefactuel, à confronter à d'autres séances. |

---

## 8. Hypothèses H1 à H10

Seuils appliqués mécaniquement (11.5). Aucun sous-groupe choisi après coup ; aucune exclusion hors 11.3 et 11.6.

| | Statut | Chiffres qui le fondent | Réserve |
|---|---|---|---|
| **H1** · Découverte à froid (débutants ≥ 2 × designers en T1) | **Indéterminée** | Lecture large (celle des observateurs de séance) : médiane débutants 4,5 (P1 7, P3 2) contre 2 chez les designers (2, 2, 2) → rapport 2,25 ≥ 2, soit « confirmée ». Lecture stricte (celle des deux seconds codeurs) : médiane débutants 5,5 (7, 4) contre 4 (5, 4, 4) → rapport 1,375, soit « indéterminée ». | La mesure n'est pas stable : les deux séances doublement codées divergent sur ce point précis (P3 : 2 contre 4 ; P5 : 2 contre 4), et les deux lectures encadrent le seuil. La dispersion à l'intérieur du public débutant (7 contre 2) est plus grande que l'écart entre publics. Deux T1 sur cinq sont des reprises (P3, P5), qui conservent leur valeur de découverte à froid (11.6) mais n'ont pas la même instance. |
| **H2** · Confusion « à l'ouverture » / « quand on arrive dessus » (≥ 2 participants) | **Indéterminée** | **1 participant sur 5.** En T1, aucun des cinq ne laisse un mouvement lancé à l'ouverture sur le titre de La maison : les cinq sont en `inView` (fiches, R2 rempli 5 fois). En T2, le diagnostic est **juste chez 4 sur 5** (P1, P2, P4, P5) et **faux chez P3** seul. | Le seuil de 0 (infirmation) n'est pas atteint non plus. Hypothèse la plus exposée à B10 (personas écrites par le même auteur) : la réserve joue ici en faveur du résultat négatif, pas contre lui. À noter : le déclencheur `inView` était la **valeur par défaut** proposée sur tout effet nouvellement posé (P2, P3, P4, P5 l'acceptent sans le chercher) — la compréhension du moment n'est donc pas mesurée en T1. |
| **H3** · Écart entre ce que le participant croit et ce que vivra le visiteur (≥ 30 % des récits) | **Indéterminée** | **5 écarts matériels sur 25 récits, soit 20 %** (P1-T2, P3-T2, P3-T4, P4-T4, P5-T3). Seuils : ≥ 30 % confirmée, < 15 % infirmée. | Seule hypothèse dont le seuil est en proportion (autorisé). Les 5 écarts sont portés par 4 participants sur 5 (P2 n'en a aucun). Les deux doubles codages confirment les 5 verdicts sans en ajouter ni en retirer : le chiffre est stable. |
| **H4** · Vérification spontanée rare en T1 (≤ 2 participants) | **Indéterminée** | **3 participants sur 5** présentent un VERIF en T1 avant « j'ai terminé » : P1 (rang 25), P2 (rang 18), P5 (rang 16). P3 et P4 n'en présentent aucun de toute leur séance. Seuils : ≤ 2 confirmée, ≥ 4 infirmée, 3 indéterminée. | Accord des deux codeurs sur P3 (absent) et P5 (présent). Réserve B14 : chaque capture coûte une action, la vérification est donc légèrement pénalisée — ce qui devrait pousser vers la confirmation, et ne suffit pas. Réserve inverse pour P5 : sa fiche prévoit qu'elle vérifie rarement dans une vue séparée ; elle le fait quatre fois sur cinq, ce qui la rend **plus** vérificatrice que sa persona. |
| **H5** · La durée se trouve, le retard beaucoup moins | **Indéterminée** | **R1 « titre plus lent » : 5 participants sur 5**, sans aide (seuil : ≥ 4 ✔). **R2 « boutons après le titre » (les deux boutons) : 4 sur 5**, sans aide — seuil « au plus 3 » **non satisfait**. Condition d'infirmation (R2 ≥ R1) non remplie non plus : 4 < 5. | P1 est la seule à ne pas remplir R2 (un seul des deux boutons), et pour une raison étrangère au retard : elle a abandonné après avoir cru casser le site (P-6). Trois participants ont obtenu R2 par un libellé tout prêt (« démarre après Titre 1 »), un par un délai chiffré (P4), une par un décalage de piste calculé à la main (P1). Aucune aide dans la vague : la clause « sans aide de niveau 2 ou 3 » est satisfaite par construction. |
| **H6** · Les designers composent sans documentation (≥ 2 des 3 en réussite complète en T4) | **Infirmée** | **0 designer sur 3** en réussite complète : P2 E (2 éléments sur 6), P4 E (2 sur 6 plus 2 pistes vides), P5 E (3 sur 6). Aucun des deux débutants non plus (P1 E, P3 E). Seuil d'infirmation : 0 designer. | Résultat contraire à l'intention de conception annoncée, rapporté tel quel. Réserve **en faveur de l'hypothèse** : T4 est toujours en position 5, donc bénéficie de l'apprentissage des quatre missions précédentes (B5) — l'infirmation n'est donc pas due à un manque de familiarité. Réserve **contre** : le budget de 40 actions et le coût des captures (B14) pèsent sur une tâche à six éléments ; la part imputable au seul budget ne peut pas être isolée (voir P-1). P2 échoue en outre pour une cause largement artefactuelle (S-1). |
| **H7** · La séquence à événement unique n'est pas trouvée spontanément | **Indéterminée** | **0 participant sur 5 n'obtient C3** (le bon ordre de départ des quatre premiers éléments) : aucun n'a fait bouger un chiffre à la bonne place. Le seuil exige « au moins 2 participants avec le bon ordre ». | Donnée manquante qui empêche le calcul (11.5). **Constat exploratoire en sens contraire de la prémisse de l'hypothèse** : 4 participants sur 5 ont produit une structure à **un seul événement** (P1, P2, P5 sur la photo ; P4 sur la section) et 3 sur 5 ont utilisé l'enchaînement relatif « démarre après <élément> » (P2, P3, P5) plutôt que des retards calculés à la main ; seuls P1 et P4 ont saisi des départs absolus en millisecondes. |
| **H8** · Retrait partiel difficile quand un élément porte deux mouvements (≥ 2 participants) | **Infirmée** | **0 participant sur 5.** S1 et S2 sont remplis chez les cinq ; l'arrivée de la pastille n'a jamais été perdue en cours de tâche chez aucun (journaux vérifiés par les observateurs) ; aucun ne déclare l'arrêt à tort (T5-a conforme au site chez les cinq). Seuil d'infirmation : 0. | Deux chemins différents mènent au même résultat : trois participants suppriment le déclencheur de pulsation (P2, P3, P5), un le passe à « Aucun » via « En continu » et un ramène les répétitions à « une fois » (P1, un battement unique subsistant, cas explicitement accepté par S1). Le badge « + 2 animations » → « + 1 animation » sert de preuve de retrait à P2, P3 et P5. |
| **H9** · Le vocabulaire sépare les publics | **Infirmée** | Les deux débutants produisent bien ≥ 2 codes VOC distincts (P1 ≈ 26 en tâche, P3 6). Mais la **médiane des designers est 4** (P2 1, P4 5, P5 4), donc ≥ 2. Seuil d'infirmation : médiane designers ≥ 2. | Le vocabulaire ne sépare pas les publics ; il sépare les **mots**. Les débutants butent sur les mots du mouvement (« survol », « défilement », « images-clés », « ligne de temps », « ms », « opacité », « décalage »), les designers sur les **traductions françaises de termes qu'ils connaissent en anglais** (« aller-retour » pour yoyo, « Courbe : Naturel (par défaut) » pour easing, « Ses enfants, un à un » pour stagger) et sur des mots de structure (« composant », « instance », « canevas », « Netteté »). P2 est l'exception (1 seul mot) et sa fiche est la plus proche du vocabulaire affiché. |
| **H10** · La valeur apparaît au premier résultat visible et se perd au réglage | **Indéterminée** (rapportée comme indicative, comme le prévoit l'énoncé) | **Positifs (SAT + VAL+) : 78 codes.** « Choisir » ou « Vérifier » : 27 sur 78 — **pas une majorité** (Découvrir 21, Choisir 17, Vérifier 10, Composer 10, Régler 8, Retirer 6, Lancer 5, hors champ 1). **Négatifs (FRU + VAL−) : 84 codes.** « Régler » ou « Composer » : 43 sur 84 — **majorité de justesse** (Composer 31, Vérifier 16, Régler 12, Lancer 11, Choisir 5, Découvrir 3, Retirer 1, hors champ/séance 5). Les deux majorités sont requises : non. Aucune répartition n'est inversée : pas d'infirmation. | Les inventaires d'affect des cinq observateurs n'ont pas la même granularité (7 codes positifs chez P1, 21 chez P3 et P5) : la comparaison entre étapes est plus solide que le total. Convention : un code portant deux étapes est attribué à la première citée. Réserves B3 (complaisance : SAT et VAL+ probablement gonflés) et l'agacement chiffré presque absent chez P1 et absent en T4 chez P4, ce qui prive la carte de deux points de mesure. |

---

## 9. Carte de la valeur (H10, QR5)

### 9.1 Ensemble, par étape

| Étape | SAT + VAL+ (dont en tâche / déclaratif) | FRU + VAL− (dont en tâche / déclaratif) |
|---|---|---|
| Découvrir | **21** (8 / 13) | 3 (1 / 2) |
| Choisir | **17** (7 / 10) | 5 (3 / 2) |
| Lancer | 5 (1 / 4) | 11 (1 / 10) |
| Régler | 8 (4 / 4) | 12 (3 / 9) |
| Composer | 10 (4 / 6) | **31** (6 / 25) |
| Vérifier | 10 (2 / 8) | **16** (3 / 13) |
| Retirer | 6 (5 / 1) | 1 (1 / 0) |
| Hors étape (a priori, séance, hors champ) | 1 | 5 |
| **Total** | **78** (26 en tâche, 52 déclaratifs) | **84** (17 en tâche, 67 déclaratifs) |

Lecture : le **déclaratif domine massivement** des deux côtés (67 % des positifs, 80 % des négatifs) ; 11.4 impose de ne pas le laisser fonder seul un résultat. En comportement seul (codes verbalisés pendant la tâche), le positif se concentre sur **Découvrir, Choisir et Retirer** (20 des 26) et le négatif sur **Composer** (6 des 17), avec un reliquat réparti.

### 9.2 Par public

| Étape | Positifs débutants | Positifs designers | Négatifs débutants | Négatifs designers |
|---|---|---|---|---|
| Découvrir | 5 | 16 | 2 | 1 |
| Choisir | 7 | 10 | 2 | 3 |
| Lancer | 1 | 4 | 7 | 4 |
| Régler | 4 | 4 | 6 | 6 |
| Composer | 7 | 3 | 13 | 18 |
| Vérifier | 1 | 9 | 2 | 14 |
| Retirer | 2 | 4 | 0 | 1 |
| Hors étape | 1 | 0 | 5 | 0 |
| **Total** | **28** | **50** | **37** | **47** |

Trois faits se lisent directement :

- **La valeur apparaît à « Découvrir » chez les designers** (16 codes positifs sur 50), pas à « Vérifier » : trouver la rubrique Animation et comprendre le modèle « un élément lance, un ou plusieurs éléments bougent » est le moment cité. « au moment où j'ai cliqué sur "Ajouter" et où une ligne de temps s'est dépliée […] je me suis dit : d'accord, ces gens-là ont déjà fait du motion » (P4, D-FIN-7).
- **La valeur se perd à « Composer » chez les deux publics** (31 des 84 négatifs, 13 chez les débutants, 18 chez les designers), et c'est le seul endroit où les deux publics disent la même chose. « je me lancerais pas dans un truc avec plusieurs éléments qui doivent s'enchaîner comme la dernière mission, ça prend trop de temps pour ce que ça rapporte » (P3, D-FIN-4).
- **« Vérifier » est un poste négatif propre aux designers** (14 codes contre 2 chez les débutants), entièrement dû au fait de ne jamais voir le mouvement — donc largement artefactuel (S-2) — mais avec une conséquence économique déclarée constante : « je ne facturerais pas non plus une animation que je n'ai pas vue tourner » (P4, D-FIN-4) ; « Tant que je travaille en aveugle, je ne facturerai pas ce genre de travail dans cet outil » (P5, D-FIN-6). Le seul contre-exemple est la seule vérification concluante de la vague : « Ça y est, je vois enfin un effet ! » (P5, T5 [18]–[19], attesté par les captures 009 et 010).
- Les négatifs des débutants se répartissent en plus sur **Lancer** (7, tous chez P3) et **Régler** (6, dont 4 chez P1 : les « ms » et la peur de casser).

---

## 10. Ce qui fonctionne (à préserver)

| Ce qui a marché | Occurrences |
|---|---|
| **T1 en entier** : poser un premier mouvement d'arrivée sur un titre, à l'entrée dans l'écran, sans aide | **5 réussites complètes sur 5**, en 8 à 32 actions jusqu'au résultat ; SEQ médiane 6 ; une seule fausse piste dans les cinq séances |
| **T5 en entier** : retirer un mouvement permanent sans abîmer l'arrivée, et poser un effet au passage de la souris | **5 réussites complètes sur 5** ; S1, S2 et S3 remplis entièrement chez les cinq ; S2 jamais perdu en cours de tâche chez aucun ; H8 infirmée |
| **Le déclencheur « quand il entre dans l'écran » proposé par défaut** sur tout effet nouvellement posé | Accepté tel quel par P2, P3, P4 et P5 sans le chercher ; il porte à lui seul R2 de T1 chez quatre participants. « Ce que je n'avais pas prévu, c'est que le déclenchement était déjà réglé par défaut […] Ça m'a surprise en bien » (P2, T1-b) |
| **Les phrases de résumé en français sous les réglages** | Citées comme point fort par les 5 ; elles fondent le diagnostic juste de T2 chez P1, P2, P4 et P5, la récupération seule de P1 en T5, et la totalité du contrôle de P2 et P5. « gardez la phrase qui résume, c'est la meilleure chose de l'outil » (P1, D-FIN-10) ; « si un client me dit "ça ne bouge pas", je sélectionne l'élément, je lis la phrase de résumé, et j'ai la réponse » (P4, D-FIN-4) |
| **L'encart « Arrive avec « Plats » : l'effet choisi ici vaut pour tous ses éléments » et le lien « Régler sur « Plats » »** | Diagnostic complet et correction en un clic chez P2 et P5 (T2 en réussite complète, 23 et 15 actions). « Sans ce lien, j'aurais tourné en rond à cliquer sur les cartes une par une » (P5, T2 [9]) |
| **Le choix « démarre après <élément> »** | Trouvé et utilisé sans aide par P2 (T3, les deux boutons), P3 (T3 et T4) et P5 (T4) ; il porte R2 de T3 chez P2 et P3. « y avait un choix tout fait « après Titre 1 » qui correspondait exactement à ce qu'elle voulait » (P3, T3-SEQ). P5 note en plus que « à chaque passage » se propage aux pistes enchaînées, réglé une seule fois |
| **Le découpage « Apparition / Au survol / En continu » et le badge « + N animations »** | Servent de preuve de retrait en T5 à P2, P3 et P5 ; « ça correspond exactement aux trois questions que me pose un client » (P5, D-FIN-2) |
| **Les libellés de préréglages en français, sans jargon** | SAT chez P2, P3, P4 et P5 — y compris chez le seul participant dont la fiche prévoit qu'il méprise les choix tout prêts : « "Montée avec rebond", c'est mon overshoot, écrit en français, je l'ai reconnu au premier coup d'œil » (P4, D-FIN-2) |
| **L'avertissement « "Plats" a aussi ses propres animations : elles se jouent en plus »** | Une découverte fortuite déterminante (P4, T2 action 22), qui lui évite de livrer un double fondu : « Sans cette phrase, je posais un deuxième fondu par-dessus un premier et je livrais une page qui clignote » |
| **Le geste « L'ajouter à cette animation » puis « Départ »** | Compris sans aide par la participante la moins outillée : « J'ai quand même fini par comprendre comment faire venir les choses l'une après l'autre […] Ça, c'était bien » (P1, T4-SEQ) |

---

## 11. Constats exploratoires (hors hypothèses, sans vocabulaire de confirmation)

1. **Aucune aide n'a été demandée ni donnée dans les 25 tâches.** Aucun participant n'a prononcé « je suis bloqué(e) », y compris au plus fort de la difficulté (agacement 5/5 chez P2 en T4). L'échelle d'aide n'a donc pas été exercée : tous les statuts sont « sans aide », aucune mesure n'existe sur l'efficacité des orientations de niveau 2 et 3, et les seuils de H5 et H6 qui mentionnent l'aide sont satisfaits par construction.
2. **Le produit a deux entrées qui n'offrent ni les mêmes réglages ni les mêmes mots.** La rubrique Animation du panneau de droite propose « Rejouer : une seule fois / à chaque passage », « Démarre : après <élément> », l'encart d'héritage et le lien vers le groupe ; le mode Animation propose une ligne de temps, des images-clés, « Départ », « Cible », « Remplir avec » et une liste de répétitions (Une fois / 2 fois / 3 fois / En boucle). Les trois participants qui ont réussi T2 ou rempli C6 sont passés par la première ; les deux qui ont échoué en T2 et manqué C6 sont passés par la seconde. C'est le seul facteur qui distingue les réussites des échecs de T2 dans cette vague ; l'ordre des tâches, le public et le modèle ne les distinguent pas.
3. **Le déclencheur d'une scène a été posé sur le premier élément, pas sur la section, par 4 participants sur 5** (P1, P2, P3, P5 sur la photo ; seul P4, entré par le mode Animation, l'a posé sur la section). C2 échoue de ce fait sans qu'aucun ne le remarque, et tous décrivent pourtant le résultat comme « quand on arrive sur la partie La maison ».
4. **Les deux participants qui n'ont jamais regardé la page en conditions de visiteur portent 2 des 3 échecs ignorés** (P3-T2, P3-T4, P4-T4) ; les trois qui l'ont fait au moins une fois n'en portent aucun, et leurs deux écarts matériels sont des réussites non comprises. À examiner avec de vraies personnes : n = 5, et le comportement de vérification est prescrit par les fiches de persona.
5. **La rapidité sans vérification produit l'échec ignoré le plus net.** P3 termine T1 en 9 actions et T5 en 15 — les deux tâches les plus rapides de la vague, toutes deux en réussite complète — et déclare terminée une T2 dont le site n'a pas changé d'une ligne.
6. **Comprendre n'est pas pouvoir agir.** En T2, le diagnostic est juste chez 4 participants sur 5, alors que la tâche n'est réussie que par 3 ; P4 énonce la cause exacte à la 30e action et échoue à la 40e faute de trouver le réglage.
7. **Les débutants ne sont pas distancés là où on l'attendrait.** Ils obtiennent 5 réussites complètes sur 5 en T1 et T5, comme les designers ; l'écart apparaît sur le diagnostic (T2) et le rythme (T3), et disparaît en T4 où personne ne réussit.
8. **Le même écran produit des réactions opposées selon le public** (voir S-4) : premier moment de valeur pour le designer motion, première peur pour la débutante.
9. **Aucune loupe chez deux participants** (P3, P4), une seule chez P5, 18 chez P2, 12 chez P1 : la lecture des petits libellés dépend entièrement de la manière d'explorer prescrite, pas de la lisibilité réelle. Aucun cas de « texte illisible malgré l'agrandissement » n'a été relevé dans la vague.
10. **Deux sujets hors champ (1.4) reviennent spontanément** : le mobile (P3, trois fois : « moi je bosse plutôt depuis mon téléphone d'habitude » ; P5) et le rôle rédacteur (P5 : « est-ce qu'Aurèle peut changer son plat du jour toute seule »). Notés comme découvertes fortuites, non évaluables ici.

---

## 12. Recommandations (au plus 10, par effet attendu)

Ce sont des intentions, pas des maquettes. Chacune indique si elle relève de la **découvrabilité** (la fonction existe et n'est pas trouvée) ou d'un **manque**.

1. **Permettre de changer le moment de lancement là où il est écrit.** Rendre la phrase de résumé (et la ligne de la ligne de temps) actionnable, ou ramener le menu « Quand » au même endroit que la durée. → **Découvrabilité** (le réglage existe, à deux replis et deux défilements de l'endroit où il est lu). Traite **P-2** (g4, 3 participants, 2 échecs) et contribue à **P-8**.
2. **Réduire le nombre de gestes par élément dans une scène** : appliquer un effet à plusieurs éléments sélectionnés, dupliquer une piste avec son réglage, ou proposer un échelonnement pour un groupe (la case « les cartes une à une », déjà présente pour une liste, est reconnue et souhaitée par P5 et demandée par P3). → **Manque**. Traite **P-1** (g4, 5 participants, 5 échecs) et allège **P-7**.
3. **Corriger la double validation des champs numériques et garantir qu'un Ctrl+Z défait le geste perçu.** Cause vérifiée dans le code (`NumberInput`, constats3 pts 1, 8, 10). → **Manque** (défaut). Traite **P-3** (g4 : un abandon, une piste corrompue) et sa facette « compteur de tête de lecture ».
4. **Dire dans le canevas qu'un élément est montré à la tête de lecture** — et ne jamais laisser une absence passer pour une suppression (étiquette, silhouette, mention « n'a pas encore commencé »). → **Manque**. Traite **P-6** (g4, un abandon) et diminue la peur de casser, premier frein déclaré de la débutante.
5. **Aligner les deux entrées sur les mêmes réglages et les mêmes mots** : « Rejouer à chaque passage », « démarre après <élément> », le moment de lancement, l'héritage. → **Découvrabilité** avant tout. Traite **P-10** (g3, 2 participants, C6 perdu deux fois), renforce **P-2** et **P-5**.
6. **Rendre les blocs intermédiaires désignables** : atteindre un groupe au clic dans la page (ou par une vue de structure), et annoncer le niveau visé **avant** le clic, pas seulement dans le fil d'Ariane après coup. → **Manque**. Traite **P-7** (g3, 3 participants, un échec de T4).
7. **Signaler sur un élément qu'une animation d'un ancêtre ou d'un modèle le fait bouger**, dans les deux entrées, et dire qu'un réglage posé sur le modèle d'une collection vaut pour toutes ses occurrences. → **Manque** dans le mode Animation et dans le canevas ; **découvrabilité** ailleurs (l'encart existe dans le panneau de droite et il suffit à deux participants). Traite **P-5** (g4), **P-4** (g4) et la réussite non comprise de P1-T2.
8. **Écrire les durées en secondes à côté des millisecondes** (ou accepter les deux à la saisie), et donner un repère de ce qu'est « lent ». → **Manque**. Traite **P-13** (g3, les deux débutants) ; rend vérifiable une contrainte de commande (« deux secondes et demie »).
9. **Nommer le déclencheur de survol dans les mots des utilisateurs** (« quand on passe la souris dessus ») et lever l'ambiguïté avec « À la souris ». → **Manque de nommage**. Traite **P-9** (g3, les deux débutants, 10 actions perdues chez l'une).
10. **Distinguer les deux croix (fermer / supprimer) et signaler une piste vide.** → **Manque**. Traite **P-14** (g2, 2 participants) et **P-12** (g3, un écart matériel).

Non recommandé sur la base de cette vague, faute de pouvoir le trancher : tout changement sur les listes déroulantes et sur la prévisualisation du mouvement (voir S-1 et S-2) ; ces deux sujets doivent d'abord être réobservés dans un vrai navigateur et avec des personnes qui voient l'écran.

---

## 13. Limites et risques résiduels

### 13.1 Biais de la section 10, tels qu'ils se sont réalisés

- **B1 (connaissance générale du modèle)** — réalisé et mesuré : P3 lit et choisit cinq fois des libellés de plus de deux mots, contre sa fiche ; **tous ses progrès de T3 et de T4 passent par ces lectures** (PERS relevé par l'observateur, non relevé par le second codeur). Sa réussite de T3 est marquée **« possiblement surestimée »** (A2). Effet : la découvrabilité mesurée pour les débutants est probablement **surestimée**.
- **B2 (persévérance, absence de fatigue)** — réalisé : **aucun blocage déclaré en 25 tâches**, 4 T4 sur 5 finissant au budget. Les abandons réels seraient plus précoces et moins prévisibles ; l'abandon de P3 en T4 ne correspond littéralement à aucune de ses trois règles écrites (signalé par les deux codeurs). Effet : les abandons sont **sous-estimés**, la persévérance surestimée.
- **B3 (complaisance déclarative)** — réalisé : SEQ médiane de 6 sur T1, T3 et T5. À lire en comparaison interne (T4 : médiane 2, étendue 2–3), jamais en valeur absolue. H10 en dépend directement et est rapportée comme indicative.
- **B4 (modèle identique)** — réalisé : les cinq citent la phrase de résumé comme point fort, les cinq échouent T4, quatre posent le déclencheur de la scène sur la photo. « Observé chez 5 sur 5 » signifie ici « convergence de cinq agents d'un même modèle », pas « fréquent ».
- **B5 (ordre et apprentissage)** — réalisé : T4 toujours en position 5, donc son échec est mesuré **après** l'apprentissage — ce qui renforce l'infirmation de H6 et fait de P-1 un plancher. T1 toujours en première position. Pour T2, T3 et T5, les positions sont rapportées dans le tableau des statuts : les échecs de T2 sont en positions 2 et 3, les réussites en 2, 3 et 4 — l'ordre ne les distingue pas. Chez P1, la première action pertinente passe de 7 (position 1) à 5 (positions 3, 4, 5) : l'apprentissage intra-séance est net et rend les coûts de navigation mesurés tardivement optimistes (A7 appliqué à P-11).
- **B6 (perception par captures)** — réalisé massivement : aucun participant n'a jamais vu une animation se jouer, ce qui produit S-2 et 16 codes négatifs à l'étape Vérifier. Les difficultés de vérification sont **surestimées** ; à l'inverse, tout jugement de sensation (mouvement brusque, trop long, désagréable) est **invisible** pour cette étude.
- **B9 (observateur du même modèle)** — réalisé et mesurable : accord total sur les statuts et les récits, accord estimé à environ la moitié sur les codes d'événements, **en deçà du seuil de 80 % de 8.4.10**. Les comptes FP, HES et RATE de ce rapport sont des ordres de grandeur ; les statuts et les concordances sont solides.
- **B10 (auteur commun des personas et des hypothèses)** — H2 et H9 étaient les plus exposées : toutes deux sont ressorties **non confirmées** (indéterminée, infirmée), ce qui limite le risque de complaisance sur ce point.
- **B14 (le budget compte les captures)** — réalisé : P1 dépense 17 captures sur 40 actions en T2, P4 17 sur 40, P5 17 sur 38. Les modes de fin « budget » de T2 et T4 sont donc en partie un artefact de protocole, et P-1 doit être confirmé avec de vrais utilisateurs.
- **B15 / B16** — aucun HALL avéré en séance chez P1, P3, P4 et P5 ; un seul chez P2, au débriefing, sur le sens d'ouverture des listes, écarté par A8. Les cinq marquent leurs suppositions comme telles, conformément à la règle 5 de l'incarnation.

### 13.2 Incidents du dispositif et effet estimé sur chaque conclusion

| Incident | Effet estimé |
|---|---|
| **Pt 8 · T1 de P3 invalidée** (fenêtre réduite, clics à des coordonnées fausses) puis **séance entière reprise** alors que 11.6 ne prévoit la reprise que de la tâche | Aucune donnée de la tentative invalide n'est utilisée. La reprise conserve la valeur de découverte à froid pour T1 (11.6) ; les quatre autres tâches de P3 portent l'apprentissage de la nouvelle instance, comme dans l'ordre normal. Effet sur H1 : la première action pertinente de P3 (2, la plus basse de la vague) provient d'une instance qui n'avait vu l'outil qu'une fois, brièvement, dans une session inutilisable — la surestimation possible est signalée mais non mesurable. |
| **Pt 10 · changement de version avant toute séance valide** (`6a7b359` → `08a6d1e`, 16 défauts corrigés) | **Sans effet sur la comparabilité interne** : les cinq séances valides sont sur `08a6d1e`. Aucun résultat de ce rapport ne porte sur `6a7b359`. |
| **Pt 11 · nouveau navigateur de test** (Chrome sans fenêtre, capture simple qui attend le rendu, loupe réelle, touche `Enter`) | Positif et vérifié : les validations par `Enter` ont toutes produit un effet (P1 : 12 sur 12), la loupe a toujours rendu le texte lisible, aucun retard d'image. **Conséquence inattendue** : c'est précisément parce que la touche Entrée fonctionne que le défaut de double validation (P-3) est devenu observable ; ce problème n'aurait pas pu apparaître avec un dispositif qui ne transmet pas Entrée. |
| **Pt 2 · listes déroulantes rendues dans la page** (adaptation du dispositif, vérifiée dans la CSS de la copie de test) | **Effet lourd sur deux séances** : 17 des 44 actions de P2 en T4 et deux erreurs non récupérées de P4 en T4. Ces occurrences sont retirées des problèmes d'interface (S-1) ; elles gonflent artificiellement les coûts de P-1 chez P2 et sont à l'origine de l'occurrence de P-12. Toute conclusion sur le choix dans une liste est **hors de portée de cette vague**. |
| **Pt 12 · mise en veille de la machine pendant T1 de P5**, séance reprise de zéro | Aucune donnée de la tentative invalide utilisée ; même réserve que le pt 8 sur la valeur de découverte à froid (H1). |
| **Pt 13 · coupure réseau pendant T5 de P5**, reprise sur place avec une note technique neutre | **0 action perdue** (la 4e action annoncée a été ré-émise), ~48 minutes d'interruption dans une tâche qui en a duré 7 utiles. La note ne portait aucune indication sur la tâche ; l'observateur la code comme écart de dispositif, non comme parole du modérateur. Effet estimé : nul sur le statut (S1 était visé avant la coupure, dans la même phrase) ; la métrique « temps » de P5-T5 est inutilisable, ce qui est sans conséquence (métrique secondaire non interprétée). L'observateur de P1 a été relancé au même moment : son codage a été produit en deux temps, sans perte constatée. |
| **Écarts du modérateur** (questions par blocs dans les cinq séances ; phrase de la 40e action prononcée en retard chez P2, à 38 actions chez P5) | Aucune information sur le chemin ni sur le résultat : **A6 négatif dans les 25 tâches**, aucun événement contaminé, aucune invalidation. |
| **État de départ de T5** : pendant son retard, la pulsation impose `scale(1)` et masque la composante de taille du zoom d'arrivée (constats3 pt 7) | Les états de départ restent **conformes** (annexe A) et aucune tâche n'est invalidée : la composante d'opacité (0 → 1) suffit à rendre l'arrivée visible, S2 est lu dans le site enregistré et est rempli chez les cinq. À signaler tout de même : chez P1, seule participante à avoir conservé la pulsation, l'arrivée ne se voit qu'en opacité. |
| **Données manquantes** | Agacement chiffré donné une seule fois sur toute la séance de P1 et jamais en T4 chez P4 : le critère « agacement 4 ou 5 » du code FRU n'a pas pu être appliqué chez P1, et la montée de l'agacement dans la mission la plus coûteuse manque chez P4. La carte de la valeur en est appauvrie. P2 n'a appliqué la règle des 10 actions que 2 fois sur 5 missions. |

### 13.3 Ce que seule une étude avec de vraies personnes peut trancher

1. **Tout ce qui touche à voir le mouvement** : la prévisualisation dans le canevas, l'utilité réelle du bouton de lecture, la confiance qu'un intégrateur accorde à ce qu'il livre. Ici, personne n'a pu voir une animation se jouer : le grief le plus répété de la vague est structurellement invérifiable.
2. **Le choix dans une liste déroulante** : placement, sens d'ouverture, densité, hauteur des lignes. L'environnement de test ne rend pas les listes comme l'éditeur livré.
3. **Le coût réel d'une scène** : le budget de 40 actions et le fait que chaque capture consomme une action pèsent directement sur T4. Le nombre de gestes par élément est attesté par les captures, son effet sur l'abandon ne l'est pas.
4. **Les seuils d'abandon et la frustration** : aucun participant n'a demandé d'aide ; on ne sait rien de ce que produirait une orientation au bon moment, ni du point où une vraie personne renoncerait.
5. **La qualité perçue d'un mouvement** (trop rapide, trop lent, désagréable) et la sensation d'ensemble d'une page animée — hors de portée par construction.
6. **Les sujets hors champ (1.4)** que les participants ont soulevés d'eux-mêmes : mobile, rôle rédacteur, effets continus, publication.
7. **La généralité des convergences** : cinq agents d'un même modèle convergent pour des raisons qui peuvent tenir au modèle. Les problèmes retenus ici sont des **candidats à vérifier**, en priorité P-1, P-2 et P-7, qui portent à eux trois quatre des sept échecs de la vague.
