# Observation · séance P3 (vague 3)

Codage indépendant à partir du protocole remis à l'observateur, de l'addendum 3, de la trace `traces3/trace-p3.md`, des captures `shots3/p3-t*/` (36 ouvertes sur 54, liste en section 6) et de la fiche `fiches3/fiche-lecture-p3.md`.

Conventions : « [n] » = compte d'actions annoncé par le participant (remis à zéro à chaque mission) ; « #n » = appel d'outil numéroté sur la séance ; horodatage = temps de la trace (mm:ss depuis le début de la séance), suivi entre parenthèses de l'heure UTC du `log.jsonl`, sur la même horloge que le journal du site. Les numéros de capture sont ceux du dossier de la mission (`p3-t2/007` = capture 007 de T2). Les lignes de codage sont numérotées L01 à L35 (section 3).

## 1. Résumé de la séance

P3 (Karim, débutant pressé, joué par Sonnet 5), vague 3 : séance reprise de zéro sur une nouvelle instance après l'invalidation de la première T1 (addendum 3, point 8) ; ordre T1, T5, T2, T3, T4 ; 46 min 10 s ; 106 actions (160 appels d'outils, dont 54 ouvertures de capture) ; aucune loupe, aucun blocage déclaré, aucune aide, aucune action interdite.
Statuts lus dans le site : T1 C (9 actions), T5 C (15), T2 E (27, site inchangé), T3 C (17), T4 E (abandon à 38).
Chemin constant : clic sur l'élément, section « Animation » du panneau de droite, choix dans les listes toutes prêtes ; réglages chiffrés laissés par défaut. Aucune vérification, ni comme visiteur ni dans l'éditeur, sur les cinq tâches (« Aperçu » et « Tester sur le site » visibles, jamais utilisés).
T2 : la cause (cartes animées par « Plats », au chargement de la page) est écrite dans le panneau de la carte mais n'est pas lue ; il choisit trois fois « Avec « Plats » » (aucune opération), prend le changement d'aspect du lien « Régler sur « Plats » » pour une confirmation, quitte deux fois le panneau « Plats » qui porte le réglage, déclare terminé et récite un résultat faux (échec ignoré).
T4 : enchaîne photo, titre et paragraphe par « après … », anime un seul des trois chiffres, puis abandonne devant la répétition élément par élément et faute de savoir où régler le temps total ; son récit se trompe sur la répétition. Agacement maximal déclaré : 4 (T4).

## 2. Par tâche (ordre de passage)

### T1 · position 1 (reprise ; découverte à froid)

**Statut : C.** Accord avec le préparateur (C).
- R1 : « Fondu », opacité 0 → 1. R2 : déclencheur `on=inView` posé sur le titre lui-même, une seule fois. R3 : 700 ms, retard 0. R4 : aucun mouvement permanent. R5 : une seule entrée au journal (v1 « Apparition · Fondu », 12:22:31). Visite du préparateur : o = 0 avant l'entrée, fondu après l'entrée, sans éclair.
- Réserve : T1 est la reprise d'une tâche invalidée (addendum 3, point 8) ; toute la séance a été reprise, et non la seule tâche comme le prévoit 11.6 (écart assumé par l'addendum). La tâche garde sa valeur de découverte à froid (11.6).

**Mode de fin** : terminé déclaré (05:57). **Aides** : aucune.

| Métrique | Valeur |
|---|---|
| Actions totales | 9 (compte du participant) ; 14 appels d'outils (#1 à #14 : 9 commandes, 5 ouvertures de capture) |
| Actions perdues (défauts du dispositif) | 0 |
| Première action pertinente | [2] : clic sur le titre ; la capture 002 montre la section « Animation », repliée, dans le panneau du titre. Lecture plus stricte (réglages visibles) : [4], capture 003 |
| Actions jusqu'à la réussite | [8] (clic sur « Fondu », journal v1 12:22:31) |
| Captures / loupes | 5 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 0 |
| ERR (non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E (rang) | aucune / aucune. La capture [9] sert à lire la valeur « Fondu » dans le panneau, pas à regarder le titre ; le bouton ▷ à droite d'« Apparition » n'est pas utilisé ; T1-R : « j'ai pas vérifié en faisant défiler la page moi-même » |
| VOC | « Au survol » (1re occurrence de la séance, L02) |
| SEQ | 6 |
| Durée (secondaire) | 4 min 37 s (01:20 → 05:57) |

**Concordance du récit (T1-R)** : « quand quelqu'un scrolle et qu'il arrive à cet endroit de la page, le titre va apparaître en fondu, genre progressivement, au lieu d'être déjà affiché direct comme avant. »

| Dimension | Score | Récit et site |
|---|---|---|
| Quoi | 2 | le titre seul ; site : seul le titre porte un mouvement |
| Quand | 2 | « quand … il arrive à cet endroit de la page » ; site : `on=inView` sur le titre |
| Comment | 2 | « en fondu, genre progressivement » ; site : preset `fade` |
| Combien | 0 | ni durée ni nombre de fois (site : 700 ms, une fois) |

Total 6/8 ; écart matériel : non. Matrice : réussite comprise (le participant ajoute qu'il ne peut « pas garantir à 100 % »).

**Mesures propres** : première action pertinente [2] ; VERIF avant « J'ai terminé » : non ; moment de lancement choisi : aucun choix observé. La valeur par défaut « Démarre : quand il entre dans l'écran » (capture 005) est restée, non lue (« un truc « Démarre » avec écrit un peu de texte que je lis pas en entier ») : R2 est rempli par le réglage par défaut, pas par une décision du participant.

### T5 · position 2

**Statut : C.** Accord avec le préparateur (C).
- S1 : le déclencheur « Pulsation » en boucle est retiré (journal v1 « En continu · aucun », 12:30:49) ; visite : pastille immobile sur 4 s après l'arrivée.
- S2 : arrivée « Zoom » conservée et jamais perdue au journal (opacité 0 → 1, échelle 0,92 → 1, 500 ms après 300 ms : 800 ms au total).
- S3 entier : « Soulever » au passage de la souris sur `rh_hero_b1` (journal v2 « Au survol · Soulever », 12:32:01) ; −4 px en 250 ms, retour quand la souris part, sans répétition (visite).
- S4 : aucune autre entrée au journal.

**Mode de fin** : terminé déclaré (14:32). **Aides** : aucune.

| Métrique | Valeur |
|---|---|
| Actions totales | 15 ; 23 appels d'outils (#15 à #37 : 15 commandes, 8 ouvertures de capture) |
| Actions perdues (dispositif) | 0 |
| Première action pertinente | [2] : clic sur la pastille ; capture 002 : « Apparition : Zoom », « En continu : Pulsation », « +2 animations » |
| Actions jusqu'à la réussite | [14] (S1 vrai dès [6], S3 à [14]) |
| Captures / loupes | 8 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 1 ([11]–[12], « Au survol », gravité 1, L07) |
| ERR (non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E (rang) | aucune / aucune. « Tester sur le site » est visible dans les captures 002, 004 et 008, non utilisé ; T5-a : « je me fie juste à ce que le panneau affichait » |
| VOC | « Au survol » déjà compté en T1 ; ici compris par élimination, choix juste |
| SEQ | 5 |
| Durée (secondaire) | 3 min 07 s (11:25 → 14:32) |

**Concordance du récit (T5-R)** : « La pastille Bib Gourmand va toujours arriver avec son petit zoom quand la page se charge, mais après elle va rester tranquille, elle bougera plus tout le temps comme avant. Et le bouton « Réserver une table », quand quelqu'un passe la souris dessus, il devrait se soulever un peu, un petit mouvement, pour donner envie de cliquer. »

| Dimension | Score | Récit et site |
|---|---|---|
| Quoi | 2 | la pastille et le bouton, rien d'autre ; site : `rh_hero_badge` et `rh_hero_b1` seuls |
| Quand | 2 | « quand la page se charge » (site `on=load`, retard 300 ms) ; « quand quelqu'un passe la souris dessus » (site `on=hover`) |
| Comment | 2 | « son petit zoom » (preset `zoom`) ; « se soulever un peu » (preset `lift`, −4 px) |
| Combien | 1 | nombre de fois juste pour la pastille (arrive puis « va rester tranquille ») ; aucune durée |

Total 7/8 ; écart matériel : non. Matrice : réussite comprise.

**Mesures propres** : S1 oui ; S2 oui, jamais perdu au journal ; S3 entier oui ; S4 oui. T5-a (« elle bougera plus tout le temps », appuyé sur le compteur « +2 animations » → « +1 animation », attesté par les captures 002 et 004) est conforme au site : pas de situation « S1 non rempli alors que T5-a affirme l'arrêt ». T5-b (« je pense qu'il redescend à sa place normale, ça me paraît logique ») est conforme au site, sans vérification : la phrase « … soulever en 250 ms, puis retour quand la souris part. » visible dans la capture 008 n'a pas été lue. Aucune confusion entre le bouton du héros et celui de l'en-tête (clic 224 243 ; fil d'Ariane « … Boutons › Réserver une table » ; journal `rh_hero_b1`).

### T2 · position 3

**Statut : E.** Accord avec le préparateur (E).
- Site final version 0, journal vide : le déclencheur `on=load` de « Plats » (enfants ensemble, fondu en montant, 600 ms) est inchangé ; aucune carte ne remplit R2. Visite : surtitre et titre arrivent à l'entrée ; les trois cartes sont déjà à o = 1, sans transformation, à l'arrivée.
- Mention « non enregistré » (5.0) : applicable à la lettre, puisque le participant a agi et que rien n'est enregistré. La cause observée n'est pas une panne : les trois choix « Avec « Plats » » correspondent à l'état déjà en vigueur et ne produisent aucune opération (fiche), et les autres tâches de la séance enregistrent normalement.

**Mode de fin** : terminé déclaré (27:13), avec un doute exprimé sur la 3e carte. **Aides** : aucune (aucun blocage déclaré).

| Métrique | Valeur |
|---|---|
| Actions totales | 27 ; 41 appels d'outils (#38 à #78 : 27 commandes, 14 ouvertures de capture) |
| Actions perdues (dispositif) | 0 |
| Première action pertinente | [6] : clic sur la photo de la 1re carte ; capture 004 : « Apparition : Fondu en montant » et la phrase « Arrive avec « Plats » … Au chargement de la page … » |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 14 / 0 |
| FP (actions perdues) | 2 (16) : FP n° 1 [8]–[11], 4 actions (L10) ; FP n° 2 [14]–[25], 12 actions (L14) |
| HES | 2 ([6]–[7], L09 ; [25]–[27], L16) |
| ERR (non récupérées) | 1 (1) : [20], « Image » sélectionnée au lieu de la carte (L15) |
| MM | 1 en tâche ([14]–[19], L13) ; 2 MM-V déclaratifs (T2-R, L19 ; T2-a, L20) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 2 ([13], capture 007, L11 ; [27], capture 014, L17) |
| VERIF / VERIF-E (rang) | aucune / aucune. Les défilements [2] et [4] se font dans la vue d'édition pour trouver les cartes (« Faut continuer à descendre pour voir les plats eux-mêmes »), sans les présenter comme la vue du visiteur ni guetter un mouvement ; T2-b : « Je suis pas allé sur le site pour vérifier avec mes propres yeux » |
| VOC | « Base », « Filtre », « Tri », « Limite » (L12) |
| SEQ | 3 |
| Durée (secondaire) | 8 min 04 s (19:09 → 27:13) |

**Concordance du récit (T2-R)** : « Normalement, quand quelqu'un descend jusqu'aux plats, les trois cartes devraient arriver avec un petit effet, comme le titre juste au-dessus, un genre de fondu qui monte. »

| Dimension | Score | Récit et site |
|---|---|---|
| Quoi | 1 | les trois cartes et le titre ; le surtitre « Cette saison », qui bouge aussi, n'est pas cité ; rien en trop |
| Quand | 0 | faux : « quand quelqu'un descend jusqu'aux plats ». Site : cartes lancées au chargement de la page (`on=load` sur « Plats »), terminées avant l'arrivée du visiteur (visite : o = 1 à l'arrivée) |
| Comment | 2 | « un genre de fondu qui monte » ; site : preset `fade-up` |
| Combien | 0 | ni durée ni nombre de fois |

Total 3/8 ; écart matériel : **oui** (Quand) → MM-V (L19). Matrice : **échec ignoré**, nuancé par le doute déclaré sur la 3e carte et par « de toute façon j'ai rien vérifié en vrai ».

**Mesures propres**
- Diagnostic T2-a : **faux** (accord avec le préparateur) : « chaque plat avait son propre réglage d'animation tout seul dans son coin, séparé du bloc général « Plats », au lieu d'être relié avec lui ». Il ne désigne pas le moment de lancement ; l'état de départ ne comporte qu'un déclencheur, sur « Plats », au chargement.
- VERIF avant la première modification : non (aucune modification enregistrée de toute la tâche).
- Modifications collatérales encore présentes à la fin : aucune.

### T3 · position 4

**Statut : C.** Accord avec le préparateur (C).
- R1 : titre `on=load`, fondu en montant en 1 120 ms (≥ 900, ≤ 4 000), départ à o = 0 et +28 px (journal v1 « Apparition · lente », 12:48:23).
- R2 : chaque bouton est devenu une piste de l'animation du titre, `start: after` le titre, de 1 120 à 1 620 ms (départ ≥ 80 % × 1 120 = 896 ms ; fin ≤ 6 000 ms) ; « Réserver une table » dès v2 (12:49:19), « Voir la carte » à v3 (12:50:08). Visite : boutons à o = 0 jusqu'à ~1 150 ms, o = 1 vers ~1 700 ms.
- R3 : paragraphe inchangé (fondu 500 ms au chargement). R4 : rien ajouté ailleurs (trois entrées au journal, titre et boutons).
- Réserve pour le test d'artefact : les deux choix décisifs pour R2 portent sur un libellé de plus de deux mots, cité en entier (PERS, L22). La fiche ne prévoit pas ce cas en A2 ; je signale une réussite possiblement surestimée pour cette persona, sans l'appliquer au statut.

**Mode de fin** : terminé déclaré (32:37). **Aides** : aucune.

| Métrique | Valeur |
|---|---|
| Actions totales | 17 ; 26 appels d'outils (#79 à #104 : 17 commandes, 9 ouvertures de capture) |
| Actions perdues (dispositif) | 0 |
| Première action pertinente | [2] : clic sur le grand titre ; capture 002 : « Apparition : Fondu en montant », « Vitesse », « Sur mesure : 500 ms », « Démarre : dès l'ouverture de la page » |
| Actions jusqu'à la réussite | [16] (v3) |
| Captures / loupes | 9 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 0 |
| ERR (non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E (rang) | aucune / aucune (« « Enregistré · v3 » en haut confirme que c'est pris en compte » : contrôle de l'enregistrement, pas du rendu) |
| VOC | aucun en tâche (« ms » et le chiffre affiché : déclaratif, T3-a, T3-b, D-FIN-5) |
| SEQ | 6 |
| Durée (secondaire) | 2 min 51 s (29:46 → 32:37) |

**Concordance du récit (T3-R)** : « Le grand titre va arriver plus doucement, moins d'un coup que avant. Et les deux boutons, « Réserver une table » et « Voir la carte », vont attendre que le titre soit arrivé pour apparaître à leur tour, juste après. »

| Dimension | Score | Récit et site |
|---|---|---|
| Quoi | 1 | titre et deux boutons ; le paragraphe, qui bouge aussi au chargement, n'est pas cité ; rien en trop |
| Quand | 1 | ordre exact (boutons après le titre : `start: after`) ; lancement à l'ouverture de la page non dit |
| Comment | 1 | « plus doucement », « apparaître » : vague mais compatible avec le fondu en montant |
| Combien | 0 | ni durée ni nombre de fois dans le récit (l'estimation vient à T3-a) |

Total 3/8 ; écart matériel : non (omissions seulement). Matrice : réussite comprise.

**Mesures propres**
- R1 vrai à [4] (v1), sans aide ; R2 vrai à [16] (v3), sans aide (« Réserver une table » conforme dès [10], v2).
- T3-a : « une seconde et demie, deux secondes en tout » contre 1 620 ms enregistrés (~1 700 ms à la visite) : **juste** (écart ≤ 30 % aux deux bornes) ; estimation dite « au pif ». Accord avec le préparateur.
- T3-b : jugé sur « Lente » surligné et sur « le petit chiffre » passé de 500 à 1 120 (capture 003 : « … fondu en montant en 1 120 ms. »), « qu'est-ce que ça représente exactement ce chiffre, ça je sais pas ».

### T4 · position 5

**Statut : E.** La fiche ne propose aucun statut pour T4 ; je code E d'après le site enregistré.
- C1 non : photo, titre, paragraphe et chiffre « 12 » (`rh_stat1`, « Années ») bougent ; « 38 » et « 14 » n'ont aucun mouvement.
- C2 non : la chaîne photo → titre → paragraphe part de l'entrée à l'écran de la photo (`rh_about_img`, `on=inView`) ; « 12 » part de sa propre entrée à l'écran ; aucun lancement par la section.
- C3 non : en supposant que la section entre d'un coup (règle de T4), « 12 » part à 0 ms, avant le paragraphe (1 400 ms).
- C3b non : un seul chiffre bouge.
- C4 formellement rempli : fin du dernier mouvement à 2 100 ms (paragraphe) dans cette hypothèse ; peu significatif, puisque deux chiffres ne bougent pas.
- C5 non : photo `translateX(40px)` (≥ 16 px), titre `translateY(28px)` (≥ 8 px) et paragraphe en fondu conformes ; « 12 » suit une courbe à dépassement `cubic-bezier(.34,1.56,.64,1)` ; « 38 » et « 14 » : rien.
- C6 non : la chaîne photo, titre, paragraphe se rejoue à chaque passage (`once=false`, visite : rejouée au retour) ; « 12 » une seule fois.
- Profil de critères : C4 seul, formellement. Échec parce que C1 et C3 ne sont pas remplis.

**Mode de fin** : abandon (ABD) à [38] (42:22), deux actions avant le budget. **Aides** : aucune.

| Métrique | Valeur |
|---|---|
| Actions totales | 38 ; 56 appels d'outils (#105 à #160 : 38 commandes, 18 ouvertures de capture) |
| Actions perdues (dispositif) | 0 |
| Première action pertinente | [3] : clic sur la photo ; capture 002 : section « Animation » repliée au bas du panneau « Photo de la salle ». Lecture plus stricte : [5] (capture 003, « Apparition : Aucune », non ouverte par moi) |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 18 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 1 ([38], L32) |
| ERR (non récupérées) | 0 (0) |
| MM | 1 en tâche ([31]–[32], L29) ; 1 MM-V déclaratif (T4-R, L35) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 (aucun accès menant au but n'est établi par une capture : voir section 6) |
| VERIF / VERIF-E (rang) | aucune / aucune (« Tester sur le site » visible dans la capture 018, non utilisé) |
| VOC | « Composant » (L31) |
| DEC | 1 ([16], « Rejouer », L25) |
| SEQ | 2 |
| Durée (secondaire) | 8 min 01 s (34:21 → 42:22) |

**Concordance du récit (T4-R)** : « Alors, la photo devrait arriver par le côté, ensuite le titre en montant juste après, ensuite le paragraphe en fondu juste après le titre […] Et le truc de rejouer à chaque passage, je l'ai fait que sur le titre et le paragraphe, pas sur la photo ni sur les chiffres. »

| Dimension | Score | Récit et site |
|---|---|---|
| Quoi | 2 | photo, titre, paragraphe, « 12 » ; « 38 » et « 14 » « bougeront pas » : exact |
| Quand | 1 | ordre photo → titre → paragraphe exact (`start: after`) ; « 12 » « va sûrement arriver n'importe quand, pas dans l'ordre » (site : à sa propre entrée à l'écran) : vague mais compatible ; lancement de la scène non dit |
| Comment | 2 | « par le côté », « en montant », « en fondu », « l'effet qui rebondit » : exacts |
| Combien | 0 | aucune durée ; nombre de fois en partie faux : répétition dite absente sur la photo, alors que le journal (v4 « Apparition · à chaque passage », `node.set rh_about_img:triggers`) et le site la portent sur le déclencheur de la photo, qui rejoue toute la chaîne |

Total 5/8 ; écart matériel : **oui** (nombre de fois pour la photo) → MM-V (L35). Matrice : échec ignoré au sens mécanique ; le participant est par ailleurs lucide sur l'inachèvement (« la petite mise en scène qu'elle voulait, elle s'arrête en plein milieu »).

**Mesures propres**
- Profil de critères : voir ci-dessus (C4 seul, formellement).
- Structure de lancement : lancements séparés. Une chaîne « après » (photo → titre → paragraphe) lancée par l'entrée à l'écran de la photo, rejouée à chaque passage ; « 12 » lancé seul à son entrée à l'écran, une fois ; aucun retard réglé.
- T4-a : **cohérente** avec la structure enregistrée (accord avec le préparateur) : « sur « Démarre » je changerais « après Titre 2 » pour prendre plutôt « en même temps que Titre 2 » » ; l'option figure bien dans la liste vue à [29] (capture 014 : « en même temps que Titre 2 « Une cuisine de… » »).
- T4-b : « le fait de devoir refaire la même chose encore et encore pour chaque truc ».

## 3. Lignes de codage (format 8.5)

Gravité « — » : code sans gravité (affect, DEC, dispositif). Les codes du dispositif ont été recherchés sur chaque passage de gravité 2 ou plus (8.4.8) ; « aucun » signifie recherché et non trouvé. Les lignes marquées « déclaratif » viennent des réponses aux questions.

| Ligne | Séance | Tâche | Pos. | Action | Appel | Horodatage | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L01 | P3 | T1 | 1 | [2]–[3] | #3–#5 | 03:06–03:28 (12:20:53–12:20:57) | Découvrir | SAT (verbal) | — | panneau de droite « Titre 2 « Une cuisine de… » », section « Animation » repliée en bas (capture 002) | « « Animation » — je connais ce mot, c'est exactement ce que je cherche, comme sur Canva. » | aucun | expression positive sur ce qu'il vient de trouver, au premier clic sur l'élément |
| L02 | P3 | T1 | 1 | [5] | #7–#8 | 03:34–04:19 (12:21:21) | Découvrir | VOC « Au survol » | 2 | section « Animation » dépliée : « Apparition », « Au survol », « En continu », chacun à « Aucune » ou « Aucun » (capture 003) | « « Au survol », je sais pas ce que ça veut dire, je connais pas ce mot. » | aucun (mot de sa liste « vocabulaire inconnu » : attendu) | sans effet en T1 ; gravité 2 par définition (mot non compris sans effet sur le résultat final) ; revient en T5 (L07), non recompté |
| L03 | P3 | T1 | 1 | [7]–[8] | #10–#12 | 04:25–04:44 (12:22:12–12:22:31) | Choisir | PERS | — | liste ouverte sous « Apparition » : « Fondu », « Fondu en montant », … « Zoom avec rebond » (capture 004) | « Je connais « Fondu » et « Zoom », les autres j'ai la flemme de tout lire. » | PERS | il énumère d'abord neuf libellés, dont six de trois mots ou plus, puis dit ne pas les lire ; sans effet : choisit « Fondu » (un mot) |
| L04 | P3 | T1 | 1 | [9] | #13–#14 | 04:48–05:57 (12:22:35) | Choisir | SAT (verbal) | — | « Apparition : Fondu », « +1 animation », puis « Vitesse », « Démarre : quand il entre dans l'écran », « Délai », « Rejouer » (capture 005) | « Ça a marché comme sur Canva en fait, plus simple que je pensais. » | aucun | journal v1 « Apparition · Fondu » 12:22:31 ; le moment de lancement par défaut n'est pas lu |
| L05 | P3 | T1 | 1 | [9] | — | 05:57 | Vérifier | Fin : terminé déclaré | 0 | — | « J'ai terminé. » | aucun | statut C ; ni VERIF ni VERIF-E ; conforme à la fiche (tâche terminée dès qu'un changement ressemble à la demande) |
| L06 | P3 | T5 | 2 | [7] | #24–#25 | 13:08–13:18 (12:30:54) | Retirer | SAT (verbal) | — | panneau « Pastille » : « En continu : Aucun », « Apparition : Zoom » conservée, « +1 animation » (capture 004) | « Parfait, ça dit maintenant « En continu : Aucun », et il reste « Apparition : Zoom » comme avant, avec « +1 animation » au lieu de « +2 » en haut. » | aucun | journal v1 « En continu · aucun » 12:30:49 ; retrait fait en 5 actions après la capture de départ |
| L07 | P3 | T5 | 2 | [11]–[12] | #30–#32 | 13:45–13:56 (12:31:31–12:31:42) | Lancer | HES (verbalisation) ; VOC « Au survol » (rappel, non recompté) | 1 | panneau « Réserver une table · Lien », section « Animation » : « Apparition : Aucune », « Au survol : Aucun », « En continu : Aucun » (capture 006) | « « Au survol », je comprends pas ce mot exactement, « survol » ça me dit rien. » | aucun ; PERC non (aucune infobulle cherchée, conforme à « ne survole pas pour comprendre ») | choix par élimination (« c'est le seul des trois qui reste »), juste : v2 « Au survol · Soulever » ; 0 action perdue |
| L08 | P3 | T5 | 2 | [15] | #36–#37 | 14:20–14:32 (12:32:07) | Vérifier | Fin : terminé déclaré | 0 | « Au survol : Soulever », phrase « Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part. », lien « Tester sur le site » (capture 008) | « Ça ressemble à ce qu'elle a demandé. » | aucun | statut C ; phrase et lien non utilisés (T5-b : « une petite phrase écrite en dessous du réglage que j'ai pas vraiment lue ») |
| L09 | P3 | T2 | 3 | [6]–[7] | #46–#48 | 20:26–21:09 (12:38:13–12:38:18) | Lancer | HES (verbalisation d'incertitude) | 4 | panneau « Carte plat » : « Apparition : Fondu en montant » ; phrase « Arrive avec « Plats » : l'effet choisi ici vaut pour tous ses éléments. Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms. » ; lien « Régler sur « Plats » » ; bouton « Aperçu » en haut à droite (capture 004) | « Je comprends pas, mais bon, je vais quand même cliquer dessus pour voir. » | aucun ; PERS non (ne pas lire une phrase longue est conforme à la fiche) ; PERC non (texte lisible) | premier événement de la chaîne qui mène à l'échec (8.3, dernier alinéa) ; la cause est écrite dans la capture, mais seulement dans une phrase ; aucune vérification avant. Hésitation : MM-V sur « Ça devrait donc déjà bouger » écarté, les cartes bougent bien, au chargement |
| L10 | P3 | T2 | 3 | [8]–[11] | #49–#54 | 21:11–22:27 (12:38:57–12:39:37) | Lancer | FP n° 1 (4 actions) | 2 | liste sous « Apparition » de la carte : « Avec « Plats » » en tête, « ✓ Fondu en montant » (capture 005) ; valeur inchangée après le choix (capture 006) | « « Avec Plats », ça parle direct des plats, ça doit être lié à ce que je cherche. » ; journal : aucune entrée | aucun | option déjà en vigueur, aucune opération (fiche) ; piste close par un changement de direction à [12] ; ERR non codée (aucun résultat précis annoncé). Je ne peux pas établir qu'un autre effet choisi sur la carte aurait mené au but : la piste est codée sur l'option choisie |
| L11 | P3 | T2 | 3 | [12]–[13] | #55–#57 | 22:28–24:23 (12:40:15–12:40:20) | Lancer | RATE n° 1 | 3 | panneau « Plats · Vue · +1 animation » : « Vue de base de données » (Base, Filtre, Tri, Limite, Si vide), « Mise en forme rapide », puis au bas « Animation » avec « Apparition : Fondu en montant » et « Vitesse » ; la ligne « Démarre » est sous le bas du panneau (capture 007) | « Bon, ce panneau-là a l'air compliqué, y a trop de trucs que je comprends pas. » | PERS : lecture et clic sur le libellé de trois mots « Régler sur « Plats » » à [12], favorable ; PERS non pour le départ du panneau (conforme) | l'accès (section Animation de l'élément qui porte le mouvement) est visible et lisible ; la commande décisive « Démarre » demande de faire défiler le panneau : hésitation RATE assumée ; coût propre : les 14 actions restantes, d'où 3 (4 si l'on tenait ce passage pour l'origine) |
| L12 | P3 | T2 | 3 | [13] | #56–#57 | 22:33–24:23 (12:40:20) | Lancer | VOC « Base », « Filtre », « Tri », « Limite » | 2 | section « Vue de base de données » du panneau « Plats » (capture 007) | « Le panneau a changé, c'est plus le plat mais « Plats » tout seul, avec plein de réglages que je connais pas (Base, Filtre, Tri, Limite...) et tout en bas « Animation » avec encore « Fondu en montant » écrit. » | aucun | « filtre » est dans son vocabulaire connu (sens photo), ici un réglage de données ; contribue au départ du panneau (L11) |
| L13 | P3 | T2 | 3 | [14]–[19] | #58–#66 | 24:25–25:13 (12:42:12–12:42:52) | Vérifier | MM | 3 | lien « Régler sur « Plats » » : texte simple avant le choix (captures 004, 008), aspect de bouton après (captures 006, 010) | « [19] fait, ça a marché pareil, le bouton est devenu plein comme pour le premier. » ; journal : aucune entrée | HALL non (le changement d'aspect est visible dans 006 et 010) | le changement d'aspect du lien est pris pour la preuve que « Avec « Plats » » a pris effet ; première formulation à [15] (« pas en bouton comme pour le premier après que je l'ai changé ») ; entretient FP n° 2 (12 actions) |
| L14 | P3 | T2 | 3 | [14]–[25] | #58–#75 | 24:25–26:51 (12:42:12–12:44:07) | Lancer | FP n° 2 (12 actions) | 3 | listes sous « Apparition » de la 2e carte (captures 008 et 010) puis de l'« Image » de la 3e (captures 011 à 013), option « Avec « Plats » » | « Donc celui-là a le même souci. » ; journal : aucune entrée | PERS examiné (abandon après « 2 fausses pistes consécutives ») : non retenu, le participant croit la première piste réussie (L13) | même geste répété sur deux éléments ; piste close par un changement de direction à [26] |
| L15 | P3 | T2 | 3 | [20]–[21] | #67–#69 | 25:15–25:54 (12:43:02–12:43:08) | Découvrir | ERR (mauvais élément), non récupérée | 2 | clic sur la photo de la 3e carte → panneau « Image », fil d'Ariane « … Plats › Carte plat › Image » (capture 011) | « Cette fois le panneau montre « Image » et pas « Carte plat », je suis peut-être descendu plus profond dans le détail, mais je vois quand même « Animation » avec « Apparition : Fondu en montant » pareil que les autres. » | aucun | remarquée, non corrigée ; le préparateur note une descente d'un niveau au clic sur une carte voisine du même modèle ; hésitation ERR ou MM (la cible annoncée, « la photo du troisième plat », est littéralement atteinte) ; coût propre [22]–[25], 4 actions |
| L16 | P3 | T2 | 3 | [25]–[27] | #74–#78 | 26:20–27:13 (12:44:07–12:44:44) | Vérifier | HES (verbalisation ; 3 actions sans modification ni endroit nouveau) | 2 | « Apparition : Fondu en montant », lien « Régler sur « Plats » » en texte simple (capture 013) ; retour au panneau « Plats » déjà vu (capture 014) | « On dirait que ça n'a rien changé pour celle-là. » | aucun | coût propre 2 à 3 actions, sans reprise (le passage débouche sur la fin) : les conditions du niveau 1 ne sont pas toutes remplies |
| L17 | P3 | T2 | 3 | [27] | #77–#78 | 26:58–27:13 (12:44:44) | Lancer | RATE n° 2 | 2 | même panneau « Plats », section « Animation » au bas (capture 014) | « Ça m'a ramené sur le même panneau « Plats » que j'ai déjà vu, avec plein de réglages de base de données que je comprends pas, et « Animation » avec « Fondu en montant » toujours pareil. » | aucun | seconde occasion, même accès que L11 ; coût propre nul mais sans reprise ; la conséquence finale est portée par L09 et L18 |
| L18 | P3 | T2 | 3 | [27] | — | 27:13 | Vérifier | Fin : terminé déclaré sur un résultat en échec | 4 | — | « J'ai terminé. » | aucun | précédé de « le troisième j'suis pas sûr à 100% que ça ait pris comme les deux autres » : il juge au moins deux cartes corrigées ; site v0 ; condition propre du niveau 4, distincte de l'échec attribué à L09 |
| L19 | P3 | T2 | 3 | T2-R | — | 28:34 | Lancer | MM-V (déclaratif, récit) | 3 | — | « Normalement, quand quelqu'un descend jusqu'aux plats, les trois cartes devraient arriver avec un petit effet, comme le titre juste au-dessus, un genre de fondu qui monte. » | aucun | site : cartes lancées au chargement de la page ; visite : déjà à o = 1 à l'arrivée ; écart matériel (Quand) |
| L20 | P3 | T2 | 3 | T2-a | — | 29:15 | Lancer | MM-V (déclaratif, diagnostic faux) | 3 | — | « Ce que j'ai compris, c'est que chaque plat avait son propre réglage d'animation tout seul dans son coin, séparé du bloc général « Plats », au lieu d'être relié avec lui. » | aucun | état de départ : un seul déclencheur, sur « Plats », `on=load` ; aucune animation propre aux cartes |
| L21 | P3 | T3 | 4 | [3]–[4] | #82–#84 | 30:23–30:36 (12:48:10–12:48:23) | Régler | SAT (verbal) | — | panneau « Titre 1 », section « Animation » : « Apparition : Fondu en montant », « Vitesse » Rapide · Normale · Lente, « Sur mesure : 500 ms », « Démarre : dès l'ouverture de la page » (capture 002) | « « Vitesse », je connais ce mot, c'est exactement ce qu'il me faut pour « plus lentement ». » | aucun | v1 « Apparition · lente » 12:48:23 ; capture 003 : « … fondu en montant en 1 120 ms. » |
| L22 | P3 | T3 | 4 | [7]–[10] et [13]–[16] | #88–#93 et #97–#102 | 30:57–31:38 et 31:54–32:20 (12:48:44–12:50:08) | Composer | PERS | — | champ « Démarre : dès l'ouverture de la page » ; liste de onze options, dont « après Titre 1 « Le goût de l'Auvergne... » » (capture 005) | « La liste montre plein de choix, et j'en vois un qui dit « après Titre 1 « Le goût de l'Auvergne... » » — « après » je comprends, et « Titre 1 » ça doit être le grand titre que je viens de faire. » | PERS | lecture et choix d'un libellé de plus de deux mots, deux fois (et lecture de « dès l'ouverture de la page » à [7]) ; écart atténué s'il ne lit que le début (« après », « Titre 1 ») ; ce passage est à l'origine de R2 : à signaler au test d'artefact (réussite possiblement surestimée) |
| L23 | P3 | T3 | 4 | [9] | #91–#92 | 31:19–31:31 (12:49:05) | Composer | SAT (verbal) | — | liste « Démarre » du bouton « Réserver une table » (capture 005) | « C'est exactement ça qu'il me faut. » | PERS (L22) | v2 « Apparition · démarre après Titre 1 … » 12:49:19 |
| L24 | P3 | T3 | 4 | [17] | #103–#104 | 32:26–32:37 (12:50:12) | Vérifier | Fin : terminé déclaré | 0 | panneau « Voir la carte » : « Démarre : après Titre 1 « Le goût de l'Auvergne... » », phrase « Au chargement de la page : Titre 1 … en 1 120 ms, puis « Réserver une table » … de 1 120 à 1 620 ms et « Voir la carte » … de 1 120 à 1 620 ms. », « Enregistré · v3 » (capture 009) | « Ça correspond à ce qu'elle a demandé. » | aucun | statut C ; ni VERIF ni VERIF-E |
| L25 | P3 | T4 | 5 | [16] | #127–#128 | 37:51–38:08 (12:55:38) | Lancer | DEC | — | panneau « Titre 2 » après le choix « Fondu en montant » : « Vitesse », « Démarre : quand il entre dans l'écran », « Délai : 0 ms », « Rejouer : une seule fois · à chaque passage » (capture 008) | « « Rejouer », ça doit être pour que ça recommence, comme elle veut. » | PERS (L26) | possibilité utile rencontrée alors qu'il cherchait « Démarre », comprise, utilisée à [21] |
| L26 | P3 | T4 | 5 | [8]–[37] | #115–#158 | 36:46–41:24 (12:54:32–12:59:10) | Choisir, Lancer, Composer | PERS | — | listes sous « Apparition » (capture 017 ; captures 004 et 007 non ouvertes, lues d'après la trace, les coordonnées et le journal), listes « Démarre » (captures 009, 014), boutons « Rejouer » (captures 008, 010, 015) | « Je vois « après « Photo de la salle » », exactement ce qu'il faut. » | PERS | choix de libellés de trois mots ou plus : « Glissé depuis la droite » [9], « Fondu en montant » [15], « après « Photo de la salle » » [19], « à chaque passage » [21] et [32], « après Titre 2 « Une cuisine de… » » [30], « Montée avec rebond » [37] ; lecture de « quand il entre dans l'écran » [16] ; tous les progrès de T4 passent par ces lectures |
| L27 | P3 | T4 | 5 | [18]–[19] | #130–#132 | 38:15–38:24 (12:56:02–12:56:12) | Composer | SAT (verbal) | — | liste « Démarre » du titre : « après « Photo de la salle » » (capture 009) | « Je vois « après « Photo de la salle » », exactement ce qu'il faut. » | PERS (L26) | v3 12:56:11 |
| L28 | P3 | T4 | 5 | [30] | #148 | 40:02–40:12 (12:57:49) | Composer | FRU (verbal, agacement 4) | — | — | « Agacement : 4, ça devient long et je sens que je vais pas avoir le temps de tout faire nickel. » | aucun | progression déclarée : 2 à [10], 3 à [20] (non codés FRU : bilans demandés par la règle 6, sous 4) |
| L29 | P3 | T4 | 5 | [31]–[32] | #149–#151 | 40:14–40:40 (12:58:01–12:58:26) | Lancer | MM | 1 | panneau « Paragraphe » : « Rejouer » déjà sur « à chaque passage » ; phrase « Quand « Photo de la salle » entre dans l'écran : … » (capture 015) | « [31] Je fais une capture pour vérifier le paragraphe et régler « Rejouer ». » ; journal : aucune entrée pour [32] | HALL non | attente (« Rejouer » à régler) contredite par la capture suivante ; la répétition posée à [21] depuis le panneau du titre porte sur le déclencheur de la photo (v4 « Apparition · à chaque passage », `node.set rh_about_img:triggers`), donc sur toute la chaîne ; clic [32] sans effet (1 action) ; ancrage comportemental de L35 |
| L30 | P3 | T4 | 5 | [32]–[33] | #151–#152 | 40:46 (12:58:34) | Composer | FRU (verbal) | — | — | « Bon, il me reste les trois chiffres et je sens que je vais pas avoir le temps de tout finir proprement. » | aucun | spontané, hors bilan des 10 actions |
| L31 | P3 | T4 | 5 | [34] | #153–#154 | 40:52–41:06 (12:58:39) | Découvrir | VOC « Composant » | 2 | panneau du chiffre « 12 » : « Composant · Modifier le composant » ; section « Composant · Chiffre clé » (« Une instance affiche le composant avec ses propres valeurs… », « 3 instances dans le site ») (capture 016) | « Ce panneau est différent, marqué « Composant · Chiffre clé » avec des trucs que je comprends pas trop, mais je vois « Animation » pareil en bas. » | aucun (mot de sa liste inconnue : attendu) | sans effet : passe à « Animation » ; D-FIN-5 confirme « Composant » et « instance » |
| L32 | P3 | T4 | 5 | [38] | #159–#160 | 42:09–42:22 (12:59:55) | Composer | HES (verbalisation) | 4 | panneau du chiffre « 12 » : « Apparition : Montée avec rebond », « Vitesse », « Démarre : quand il entre dans l'écran », « Délai : 0 ms », « Rejouer », phrase « Quand « Années » entre dans l'écran : montée avec rebond en 800 ms, une seule fois. », « Tester sur le site », « Ouvrir dans le mode Animation » (capture 018) | « Et j'ai jamais réglé un truc pour la histoire des deux secondes et demie, je sais même pas où chercher ça. » | PERS examiné (voir L34) ; PERC non | événement d'origine de l'abandon, avec la répétition élément par élément (L28, L30, L33) ; aucun accès à un « temps total » n'est lisible dans une capture : pas de RATE |
| L33 | P3 | T4 | 5 | [38] | — | 42:22 | Composer | FRU (verbal) | — | — | « Ça fait vraiment trop d'étapes qui se répètent, je commence à plus m'en sortir. » | aucun | — |
| L34 | P3 | T4 | 5 | [38] | — | 42:22 | Composer | ABD | 4 | — | « J'abandonne. » | PERS possible : abandon hors des trois règles écrites de la fiche (aide à 10 actions sans progrès, 2 fausses pistes consécutives, écran de plus de 8 réglages sans choix tout prêt) ; fiche : patience « faible » | 38 actions, avec un progrès visible à chaque élément jusque-là ; sans cet écart, budget atteint deux actions plus tard et même échec (C1 impossible en 2 actions) |
| L35 | P3 | T4 | 5 | T4-R | — | 43:51 | Lancer | MM-V (déclaratif, récit) | 3 | — | « Et le truc de rejouer à chaque passage, je l'ai fait que sur le titre et le paragraphe, pas sur la photo ni sur les chiffres. » | aucun | journal v4 sur `rh_about_img` ; site : `once=false` sur le déclencheur de la photo ; visite : scène rejouée au retour ; écart matériel (nombre de fois) |

Non codés comme événements, par choix de définition : les défilements de T2 [2] et [4] (navigation nécessaire) ; les clics qui visaient une modification restée sans opération (T2 [10]–[11], [18]–[19], [24]–[25] ; T4 [31]–[32]), qui répondent à la lettre à la HES « structurelle » (2 actions sans modification) mais portent déjà FP ou MM, les exemples de la définition visant des actions passives ; le réglage « à chaque passage » de T4 [21], dont le résultat dépasse l'intention sans la contredire (le titre se rejoue bien) et qui est traité en L29 et L35.

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués « déclaratif ». Les MM-V tirés des réponses (T2-R, T2-a, T4-R) sont en section 3 (L19, L20, L35) ; T1-R, T3-R, T3-a, T4-a, T5-R, T5-a et T5-b ne portent pas de MM-V.

| Réponse | Code | Étape | Citation | Remarque |
|---|---|---|---|---|
| D-5 | VAL+ (déclaratif, a priori) | — (avant le test) | « Ça fait plus vivant, plus pro, ça attire l'œil direct. » | opinion générale avant toute mission |
| D-5 | VAL− (déclaratif, a priori) | — (avant le test) | « Après si y en a trop ou que ça rame, ça devient relou. » | réserve conditionnelle |
| T1-SEQ | SAT (déclaratif) | Découvrir | « C'était plutôt facile, j'ai trouvé assez vite, ça a marché à peu près comme je pensais. » | note 6 |
| T1-b | SAT (déclaratif) | Choisir | « Mais bon, ça a fait la même chose au final, j'ai choisi et c'est parti. » | attente déclarée de vignettes « avec une image comme sur Canva », trouvé « juste du texte » : écart d'attente sans effet sur le comportement, non codé MM |
| T5-SEQ | FRU (déclaratif) | Lancer | « Ça allait, mais le mot « survol » je comprenais pas ce que ça voulait dire, j'ai dû deviner par élimination avec les autres choix. » | note 5 ; corrobore L02, L07 |
| T2-SEQ | FRU (déclaratif) | Lancer | « C'était plus dur que les autres fois, y avait déjà des trucs réglés bizarrement, et j'étais pas sûr de comprendre pourquoi ça marchait pas alors que ça avait l'air configuré. » | note 3 ; corrobore L09 |
| T3-SEQ | SAT (déclaratif) | Régler et Composer | « Ça s'est bien passé, j'ai trouvé « Vitesse » direct pour ralentir le titre, et pour les boutons y avait un choix tout fait « après Titre 1 » qui correspondait exactement à ce qu'elle voulait. » | note 6 ; compté une fois par étape |
| T3-R | VAL+ (déclaratif, faible) | Composer | « Ça devrait faire un truc plus posé, moins tout qui saute en même temps, comme elle voulait. » | relie le résultat au souhait de la cliente |
| T4-SEQ | FRU (déclaratif) | Composer | « C'était clairement la plus dure des missions, j'ai pas réussi à aller au bout, y avait trop d'éléments à faire un par un avec les mêmes réglages à répéter. » | note 2 |
| T4-b | FRU (déclaratif) | Composer | « Clairement le fait de devoir refaire la même chose encore et encore pour chaque truc : cliquer dessus, ouvrir Animation, choisir l'apparition, choisir démarre, parfois rejouer... et recommencer pour l'élément suivant. » | corrobore L28, L30, L32–L34 |
| D-FIN-1 | SAT (déclaratif) | Choisir | « Je dirais que ça ressemble à Canva pour un site, et que pour un truc simple ça marche bien, tu cliques sur le truc, tu choisis un effet dans une liste, c'est vite fait. » | — |
| D-FIN-1 | VAL− (déclaratif) | Composer | « Mais dès que tu veux un truc un peu plus élaboré avec plusieurs éléments qui bougent l'un après l'autre, ça devient super long, faut refaire la même manip encore et encore pour chaque truc, et à la fin j'ai lâché l'affaire. » | — |
| D-FIN-2 | SAT (déclaratif) | Découvrir, Régler, Composer | « Le plus clair c'était quand y avait un mot que je connaissais direct, genre « Vitesse » ou « Animation », et surtout quand y avait un choix tout prêt qui disait exactement ce que je voulais, genre « après Titre 1 ». » | compté une fois par étape |
| D-FIN-3 | FRU (déclaratif) | Lancer | « Le plus le mot « survol », j'ai jamais su ce que ça voulait dire. » | — |
| D-FIN-3 | FRU (déclaratif) | Lancer | « Et sinon la mission avec les plats, où c'était déjà réglé sur un truc mais que ça marchait pas quand même, ça j'ai pas compris pourquoi. » | — |
| D-FIN-3 | FRU (déclaratif) | Composer | « Ça, c'était vraiment pénible. » | vise la répétition, le temps total introuvable et la répétition « sur tout d'un coup » (phrase précédente) |
| D-FIN-4 | VAL+ (déclaratif) | Choisir, Régler | « Ça, je le referais seul sans problème. » | vise « prendre un effet dans la liste … ou changer la vitesse » |
| D-FIN-4 | VAL− (déclaratif) | Régler | « Par contre, je toucherais pas aux trucs avec des chiffres et des « ms », je comprends pas ce que ça représente. » | — |
| D-FIN-4 | VAL− (déclaratif) | Composer | « Et je me lancerais pas dans un truc avec plusieurs éléments qui doivent s'enchaîner comme la dernière mission, ça prend trop de temps pour ce que ça rapporte, surtout que je suis pas souvent sur ordinateur. » | — |
| D-FIN-4 | VAL− (déclaratif) | Lancer | « Et si un truc est censé déjà marché mais que ça marche pas, comme les plats, je saurais pas quoi faire, je laisserais tomber ou j'appellerais quelqu'un. » | — |
| D-FIN-6 | VAL+ (déclaratif) | Choisir | « Pour un truc simple, genre faire arriver mon titre ou ma photo un peu mieux, ouais je pourrais le faire moi-même sur mon site, c'était pas si compliqué une fois que j'avais compris le principe. » | — |
| D-FIN-6 | VAL− (déclaratif) | Composer | « Mais pour un truc plus poussé avec plusieurs éléments qui s'enchaînent, non, je perdrais pas mon temps là-dedans, j'ai un camion à faire tourner. » | — |
| D-FIN-6 | VAL− (déclaratif) | hors champ (mobile, 1.4) | « Et vu que moi je bosse plutôt depuis mon téléphone d'habitude, là j'étais sur un ordinateur, donc j'sais même pas si tout ça c'est faisable pareil sur mobile. » | exploratoire |
| D-FIN-7 | VAL+ (déclaratif) | Découvrir | « Ça valait le coup au tout début, la toute première fois où j'ai cliqué sur le titre et que direct y avait « Animation » puis une liste de choix, ça ressemblait à Canva comme je pensais, ça m'a mis en confiance. » | moment de valeur situé : T1 |
| D-FIN-7 | SAT (déclaratif) | Composer | « Et aussi la mission avec les boutons, où y avait le choix « après Titre 1 » tout prêt, ça c'était satisfaisant. » | moment situé : T3 |
| D-FIN-7 | VAL− (déclaratif) | Composer | « Le contraire, clairement à la dernière mission, quand j'ai vu qu'il me restait deux chiffres entiers à refaire pareil et que j'avais toujours pas trouvé où mettre le temps total, là je me suis dit que ça servait à rien de continuer. » | moment situé : T4, [38] |
| D-FIN-8 | VAL− (déclaratif) | Composer | « Le fait que ça devient long et répétitif dès qu'il y a plusieurs éléments à faire bouger ensemble. » | — |
| D-FIN-8 | VAL− (déclaratif) | Lancer, Régler | « Des mots que je comprends pas, genre « survol » ou les trucs en « ms », si personne peut me les expliquer je reste bloqué. » | — |
| D-FIN-8 | VAL− (déclaratif) | Lancer | « Et le coup des plats où c'était censé être réglé mais que ça marchait pas, si ça arrive sans que je comprenne pourquoi, ça me découragerait vite. » | — |
| D-FIN-8 | VAL− (déclaratif) | hors champ (mobile, 1.4) | « Et bon, moi je fais tout depuis mon téléphone d'habitude, si c'est pas aussi simple sur mobile, ça peut clairement m'arrêter. » | exploratoire |

**Autres éléments déclaratifs, sans code d'affect**
- VOC déclaratifs (D-FIN-5) : « survol » (déjà codé en tâche, L02), « Délai » et « ms » (« aucune idée de ce que ça représente, j'ai jamais touché » ; voir aussi T3-b sur le chiffre 500 → 1 120), « Composant » (déjà codé, L31) et « instance » (« ça me parle pas du tout, j'ai zappé » ; visible dans les captures 016 et 018).
- Vérification : T2-b (« je me suis fié à ce qu'on m'a dit dans la consigne ») et D-FIN-9 (« Y avait un bouton « Aperçu » en haut et un lien « Tester sur le site » des fois dans les panneaux, je les ai jamais utilisés en fait, j'ai juste réglé les trucs et je me suis arrêté, mais je pense que c'est fait pour ça. ») : il connaît la voie de vérification sans l'avoir prise ; corrobore l'absence de VERIF sur les cinq tâches.
- D-FIN-10 : suggestion (« pouvoir faire le réglage une fois pour plusieurs trucs d'un coup, genre les trois chiffres en même temps »), non codée ; corrobore les FRU et VAL− de l'étape Composer.

**Carte de la valeur de la séance** (verbal en tâche / déclaratif)

| Étape | SAT + VAL+ | FRU + VAL− |
|---|---|---|
| Découvrir | 1 / 3 | 0 / 0 |
| Choisir | 1 / 4 | 0 / 0 |
| Lancer | 0 / 0 | 0 / 7 |
| Régler | 1 / 3 | 0 / 2 |
| Composer | 2 / 4 | 3 / 8 |
| Vérifier | 0 / 0 | 0 / 0 |
| Retirer | 1 / 0 | 0 / 0 |
| A priori (D-5) et hors champ (mobile) | — / 1 | — / 3 |

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

Regroupement des événements de gravité 1 ou plus par endroit, étape et cause apparente, pour cette seule séance. Le statut final (retenu ou signal faible) se décidera après le regroupement des cinq séances ; j'indique seulement si la condition 11.2.2 est déjà atteinte chez P3 (gravité ≥ 3).

### PB-1 · Mouvement hérité de « Plats » : le moment de lancement ne se voit ni ne se change depuis la carte (gravité 4)
- **Endroit** : panneau « Carte plat » (et panneau « Image » de la carte), section « Animation » : liste sous « Apparition » avec « Avec « Plats » » en tête, phrase « Arrive avec « Plats » : l'effet choisi ici vaut pour tous ses éléments. Au chargement de la page : … », lien « Régler sur « Plats » » (captures T2 004, 005, 006, 010, 011, 013).
- **Étape** : Lancer (et Vérifier pour la lecture du signal).
- **Cause apparente** : le moment qui explique le symptôme n'apparaît que dans une phrase ; la seule commande proposée sur la carte est la liste d'effets, où « Avec « Plats » » (déjà en vigueur) ne produit aucune opération, alors que le lien « Régler sur « Plats » » change d'aspect (texte → bouton), ce que le participant prend pour une confirmation. Aucune vérification comme visiteur n'a précédé (bouton « Aperçu » visible en haut à droite dans toutes les captures, non utilisé ; non codé RATE, car il aurait montré le symptôme sans donner accès au réglage).
- **Lignes** : L09 (4), L10 (2), L13 (3), L14 (3), L16 (2), L18 (4), L19 (3, déclaratif), L20 (3, déclaratif). Occurrences : 2 au niveau 4, 4 au niveau 3 (dont 2 déclaratives), 2 au niveau 2.
- **Test d'artefact** :
  - A1 perception : non. Rien ne dépend d'un mouvement vu en continu ni d'une infobulle ; la phrase, les valeurs et le changement d'aspect du lien sont lisibles dans les captures à 800 × 500.
  - A2 connaissance et persona : aucun CONN. Ne pas lire la phrase est conforme à la fiche (libellés de plus de deux mots non lus) : ce n'est pas un PERS, mais le problème touche précisément les personnes qui ne lisent pas les phrases. La règle « abandon après 2 fausses pistes consécutives » a été examinée (L14) et n'est pas retenue.
  - A6 modérateur : aucun MOD dans T2 (consigne et questions conformes au script).
  - A8 perception affirmée : aucun HALL (le changement d'aspect du lien est attesté par les captures 006 et 010).
  - Statut provisoire : problème d'interface ; gravité ≥ 3 chez P3 (condition 11.2.2 atteinte). Position de T2 : 3 (A7 à examiner avec les autres séances).

### PB-2 · Composition élément par élément, sans réglage d'ensemble trouvé (gravité 4)
- **Endroit** : section « Animation » du panneau de chaque élément de « La maison » (« Apparition », « Démarre », « Rejouer », « Vitesse », « Délai ») ; aucun endroit de « temps total » vu (captures T4 005, 008, 010, 011, 015, 016, 018).
- **Étape** : Composer.
- **Cause apparente** : chaque élément demande de le sélectionner, déplier « Animation », choisir l'apparition, puis « Démarre » et « Rejouer » (photo 8 actions, titre 12, paragraphe 10, captures comprises ; le chiffre « 12 » est laissé à 6 actions, sans « Démarre » ni « Rejouer ») ; après 38 actions, 4 éléments sur 6 sont animés, dont un seul des trois chiffres ; le participant ne trouve ni moyen de régler plusieurs éléments d'un coup ni où régler la durée totale.
- **Lignes** : L32 (4), L34 (4) ; affect sans gravité : L28, L30, L33 ; corroboration déclarative : T4-SEQ, T4-b, D-FIN-1, D-FIN-3, D-FIN-7, D-FIN-8, D-FIN-10.
- **Test d'artefact** :
  - A1 perception : non (difficulté de procédure et de repérage, sans lien avec la perception du mouvement).
  - A2 connaissance et persona : PERS possible sur le mode de fin seulement (L34 : abandon hors des règles écrites) ; sans lui, budget atteint deux actions plus tard et même échec : problème non écarté. Le PERS de lecture des libellés longs (L26) a favorisé le progrès, il n'est pas à l'origine du problème. Aucun CONN.
  - A6 modérateur : aucun MOD.
  - A8 : aucun HALL.
  - Statut provisoire : problème d'interface pour un débutant sur une tâche dont le public principal est designer (T4 mesure ici si la composition décourage) ; gravité ≥ 3 chez P3. Limite : je ne peux pas dire, avec les sources autorisées, ce qu'offraient « Ouvrir dans le mode Animation », l'onglet « Animation » ou « Modifier le composant », visibles mais non explorés.

### PB-3 · Réglage du moment de « Plats » hors de vue, sous la « Vue de base de données » (gravité 3)
- **Endroit** : panneau « Plats · Vue » : section « Vue de base de données » (Base, Filtre, Tri, Limite, Si vide), puis « Mise en forme rapide », puis au bas « Animation » (« Apparition », « Vitesse ») ; la ligne « Démarre » est sous le bas du panneau (captures T2 007 et 014).
- **Étape** : Lancer.
- **Cause apparente** : l'endroit qui porte le réglage à changer est atteint deux fois, mais la section « Animation » arrive après une longue section de réglages de données inconnus du participant ; il juge le panneau « compliqué » et repart, sans faire défiler.
- **Lignes** : L11 (3), L12 (2), L17 (2).
- **Test d'artefact** :
  - A1 perception : non. La capture réduite montre le même champ que l'écran réel ; il fallait faire défiler dans les deux cas ; les libellés visibles sont lisibles.
  - A2 : aucun CONN ; quitter un écran chargé est conforme à la fiche (pas de PERS) ; la lecture de « Régler sur « Plats » » (trois mots) a mené au bon panneau.
  - A6 : aucun MOD. A8 : aucun HALL.
  - Statut provisoire : problème d'interface, à confirmer, parce que les deux RATE reposent sur la section visible et non sur la commande décisive (hésitation notée en L11) ; gravité 3 chez P3.

### PB-4 · « Rejouer » partagé par l'enchaînement, compris comme un réglage de l'élément (gravité 3)
- **Endroit** : ligne « Rejouer : une seule fois · à chaque passage » dans les panneaux du titre et du paragraphe liés « après » à la photo, avec la phrase « Quand « Photo de la salle » entre dans l'écran : … » (captures T4 010, 011, 015) ; dans le panneau de la photo, cette ligne n'a jamais été à l'écran (capture 005 : « Animation » au bas, panneau non défilé).
- **Étape** : Lancer (nombre de fois).
- **Cause apparente** : réglée depuis le panneau du titre, la répétition s'applique au déclencheur de la photo, donc à toute la chaîne ; le panneau du paragraphe l'affiche ensuite déjà active ; le participant croit l'avoir posée élément par élément et se trompe dans son récit.
- **Lignes** : L29 (1), L35 (3, déclaratif).
- **Test d'artefact** :
  - A1 perception : non. L'état partagé est visible sans mouvement (« à chaque passage » déjà sélectionné, phrase qui nomme la photo, capture 015) ; seule une visite comme visiteur aurait montré la photo rejouée, et elle n'a pas été faite.
  - A2 : aucun CONN ; aucun PERS à l'origine (la lecture de « à chaque passage » est un PERS favorable, L26).
  - A6 : aucun MOD. A8 : aucun HALL.
  - Statut provisoire : problème d'interface fondé sur un écart matériel du récit, avec un ancrage comportemental faible (1 action, L29) ; gravité 3 chez P3.

### PB-5 · Sélection dans une liste de cartes répétées (gravité 2)
- **Endroit** : canevas, 3e carte de « Quelques plats signature » ; panneau « Image » au lieu de « Carte plat » (capture T2 011).
- **Étape** : Découvrir. **Cause apparente** : un clic sur une carte voisine du même modèle, alors qu'une carte est sélectionnée, sélectionne l'image intérieure (constat du préparateur).
- **Lignes** : L15 (2).
- **Test d'artefact** : A1 non (fil d'Ariane et titre du panneau lisibles) ; A2 aucun CONN ni PERS ; A6 aucun MOD ; A8 aucun HALL. Statut provisoire : signal faible pour cette séance (gravité 2, un participant).

### PB-6 · Libellé « Au survol » non compris (gravité 2)
- **Endroit** : ligne « Au survol » de la section « Animation » (captures T1 003, T5 006).
- **Étape** : Découvrir (T1, sans effet) et Lancer (T5, choix par élimination) ; même endroit et même cause, étapes différentes : regroupement à confirmer au sens strict de 11.1.
- **Cause apparente** : mot absent du vocabulaire du participant ; aucun autre indice lu sur le sens.
- **Lignes** : L02 (2), L07 (1) ; corroboration déclarative : T5-SEQ, D-FIN-3, D-FIN-5, D-FIN-8.
- **Test d'artefact** : A1 non (aucune infobulle cherchée, conforme à la fiche) ; A2 : « survol » figure dans sa liste « vocabulaire inconnu », le comportement est donc celui attendu de la persona (ni CONN ni PERS) ; A6 aucun MOD ; A8 aucun HALL. Statut provisoire : signal faible pour cette séance (gravité 2).

### PB-7 · Panneau « Composant · Chiffre clé » (gravité 2)
- **Endroit** : en-tête « Composant · Modifier le composant » et section « Composant · Chiffre clé » du chiffre « 12 » (capture T4 016). **Étape** : Découvrir.
- **Cause apparente** : mots « Composant » et « instance » inconnus du participant, affichés avant la section « Animation ».
- **Lignes** : L31 (2) ; D-FIN-5.
- **Test d'artefact** : A1 non ; A2 : mot de sa liste inconnue, comportement attendu ; A6 aucun MOD ; A8 aucun HALL. Statut provisoire : signal faible (gravité 2, sans effet sur le résultat).

## 6. Écarts au protocole et au dispositif

### MOD
Aucun code MOD au sens de 8.2. Toutes les paroles du modérateur relevées dans la trace appartiennent au script : 4.3.A à C, D, E, consignes mot pour mot (vérifiées contre la section 5 pour T1, T5, T2, T3 et T4), G, F pour l'abandon, H, questions de la section 7, I. Écarts de procédure notés, sans code :
1. Message d'ouverture (00:00) : un cadrage hors script précède 4.3.A (« l'utilisateur … a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient ») et les « Règles techniques de la séance » (addendum 3, point 11). Il donne le but général de l'étude, pas les hypothèses ; aucun effet identifiable.
2. 4.3.D : D-1 à D-5 posées en un seul message, sans « Merci. » entre elles, avec une phrase ajoutée (« Je vais maintenant vous poser quelques questions avant de commencer. Répondez à chacune, dans l'ordre, sous son identifiant. ») ; questions après tâche groupées par deux (SEQ et R, puis a et b) ; débriefing groupé par trois, trois et quatre.
3. Chaque message du modérateur est encadré de formules du dispositif, hors script et en anglais (« The coordinator sent a message while you were working: », « Address this before completing your current task. »).
4. T4 [25]–[26] (#141, #142) : deux actions de suite sans parole entre elles (l'annonce « [26] Je clique direct sur « Fondu » » suit le clic : 39:36 contre 39:32). La relance « Pensez à dire ce que vous cherchez avant d'agir. » n'a pas été dite, le dispositif ne permettant pas d'intervenir pendant une mission. Omission non codée MOD (la définition vise une parole hors script, une aide sans blocage ou une relance non prévue).
5. Aucune relance « Pouvez-vous m'en dire un peu plus ? », aucune aide, aucun blocage : A6 est négatif pour les cinq tâches.

### HORS
Aucun. En-tête de la trace : « Écarts au protocole (outils ou commandes interdits) : aucun » ; la trace ne contient que des commandes de test (106) et des ouvertures de capture (54).

### PERS
- Lecture et choix de libellés de plus de deux mots (fiche : « Ne lit pas les libellés de plus de deux mots ») : L03 (T1, sans effet), L11 (T2, « Régler sur « Plats » », favorable), L22 (T3, à l'origine de R2), L25 et L26 (T4, à l'origine de tous les progrès). Écart récurrent, atténué si l'on admet un repérage des premiers mots ; il va dans le sens d'une surestimation de la réussite de T3 et des progrès de T4.
- Abandon de T4 hors des trois règles écrites (L34), dans le sens d'une moindre persévérance ; effet limité au mode de fin.
- Examinés et non retenus : règle des « 2 fausses pistes consécutives » en T2 (L14 : le participant croit la première piste réussie) ; départ du panneau « Plats » (L11, conforme à la fiche).
- Conformités relevées : aucune loupe (« N'agrandit jamais les petits textes »), aucun survol, réglages chiffrés laissés par défaut (« Délai » jamais touché ; « Lente » est un choix tout prêt), fin dès qu'un changement ressemble à la demande (T1, T5, T3), bilan d'agacement toutes les 10 actions (T5 [10] ; T2 [10] et [20] ; T3 [10] ; T4 [10], [20] et [30]). Hésitation de comptage à T4 [9]–[10] (« attends, laisse-moi vérifier »), sans conséquence : 38 actions annoncées pour 38 commandes.

### CONN
Aucun. Vérifiés : « scroll » (02:32) relève de son vocabulaire connu (« scroller ») ; « l'effet avec rebond », annoncé à T4 [36] avant l'ouverture de la liste, avait été vu dans une liste précédente (T1 capture 004) ; « Aperçu », « Tester sur le site », « Composant », « instance » et « en même temps que Titre 2 », cités dans les réponses, sont visibles dans des captures (T5 002, 004, 008 ; T4 014, 016, 018) ; le passage de « +2 animations » à « +1 animation » cité en T5-a est attesté (T5 002, 004).

### PERC
Aucun. Le participant n'invoque jamais l'absence de mouvement continu comme une difficulté (« Sur la capture elle est immobile bien sûr, c'est figé », T5 12:15, simple remarque) ; tous les textes utiles étaient lisibles à 800 × 500.

### HALL
Aucun codé. Deux détails de couleur ne sont pas attestés à cette résolution, sans conséquence sur aucune conclusion : « un lien bleu « Ouvrir dans le mode Animation » » (T1 04:19 ; capture 003 : lien gris clair avec icône) et « avant c'était juste écrit en bleu dans le texte » (T2 22:27 ; capture 004 : texte gris clair). Le changement d'aspect du lien, de texte en bouton, est attesté (captures 006, 010).

### Dispositif
- Séance conforme aux contrôles de l'addendum 3 (points 9 à 11) : captures 800 × 500 nettes, clics reçus sur les éléments visés (journal et site final : `rh_about_h2`, `rh_hero_badge`, `rh_hero_b1`, `rh_hero_h1`, `rh_hero_b2`, `rh_about_img`, `rh_about_p`, `rh_stat1`), aucune action perdue à cause du dispositif.
- Infobulles laissées par le pointeur après un clic (T1 005 « À gauche », T3 003 « Lente », T4 011 « à chaque passage ») et barre flottante du canevas (« Paragraphe », « Style ») posée sur la pastille et sur le bouton (T5 002, 008) : aucun effet observé.
- T1 est une reprise (addendum 3, point 8) : toute la séance a été reprise, et non la seule tâche prévue par 11.6 ; T5, T2, T3 et T4 portent l'apprentissage de cette nouvelle instance, comme dans l'ordre de passage prévu.

### Limites de ma lecture
- Captures ouvertes (36 sur 54) : T1 001 à 005 ; T5 002, 004, 006, 007, 008 ; T2 003 à 008 et 010 à 014 ; T3 002, 003, 005, 009 ; T4 002, 005, 008 à 011 et 014 à 018. Non ouvertes : T5 001, 003, 005 ; T2 001, 002, 009 ; T3 001, 004, 006, 007, 008 ; T4 001, 003, 004, 006, 007, 012, 013. Leur contenu est pris dans la parole du participant, recoupée par les coordonnées du `log.jsonl` et par le journal.
- La ligne « Démarre » du panneau « Plats » n'apparaît dans aucune capture : les RATE de T2 reposent sur la section visible, pas sur la commande décisive.
- Je ne peux pas établir, avec les seules sources autorisées, où mènent « Ouvrir dans le mode Animation », l'onglet « Animation » et « Modifier le composant » : aucun RATE n'est codé sur ces accès en T4. Je ne sais pas non plus si un autre effet choisi sur une carte, en T2, aurait créé un mouvement propre lancé à l'arrivée (L10).
- T4 : sans statut proposé par le préparateur, le E est ma seule lecture ; C3 et C4 sont calculés dans l'hypothèse du protocole (section entrant d'un coup), la fiche ne rapportant pour T4 que « rejouée au retour ».
- Première action pertinente : deux lectures possibles en T1 et T4 (section « Animation » repliée, ou réglages visibles) ; j'ai retenu la première en donnant l'autre.
- Horloges : écarts d'au plus 1,2 s entre l'heure du journal et celle du clic dans le `log.jsonl` (par exemple T5 v2 à 12:32:01 contre un clic journalisé à 12:32:02.116), sans effet sur l'attribution.
- Trace sans blocs 🧠 (participant joué par Sonnet 5) : la pensée à voix haute est entièrement écrite (💬), sans incertitude de restitution.
- Gravités ou codes hésitants, expliqués dans les commentaires : L09 (origine de la chaîne de T2), L11 (3 ou 4), L15 (ERR ou MM), L16 et L17 (coût propre sans reprise), L22 et L26 (portée du PERS).
- Transparence : au tout début, avant les lectures, j'ai lancé une commande en lecture seule (comptage des lignes des fichiers autorisés et liste du dossier `shots3/`), hors navigateur ; aucune autre commande, aucun outil de navigateur.

