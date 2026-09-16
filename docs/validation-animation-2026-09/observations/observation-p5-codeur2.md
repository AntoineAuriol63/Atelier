# Observation P5 (codeur 2) — vague 3

Séance : Élodie Nguyen (intégratrice web, WordPress/Elementor Pro), ordre T1-T3-T2-T5-T4. Codage indépendant, à partir du protocole remis à l'observateur, de l'addendum 3, de la trace brute (`traces3/trace-p5.md`), de 40 captures choisies dans `shots3/p5-t1,t3,t2,t5,t4/` et de la fiche de lecture (`fiches3/fiche-lecture-p5.md`). Cette séance est elle-même une reprise : la première tentative de T1 de P5 a été invalidée par une mise en veille de la machine (addendum 3, point 12) ; conformément à 11.6, la présente trace est la reprise unique, avec une nouvelle instance, et T1 y conserve sa valeur de découverte à froid. Je n'ai pas codé `p5-t1-invalide/`.

---

## 1. Résumé de la séance

Élodie termine quatre missions sur cinq sans aucune aide (T1, T3, T2, T5 toutes statut C) et échoue la cinquième par épuisement du budget d'actions (T4, statut E, 38 actions). Elle ne demande jamais d'aide et ne se déclare jamais bloquée. Le fil rouge de toute la séance, répété dans chaque bilan de tâche et en tête du débriefing, est qu'elle ne parvient jamais à constater qu'une animation s'est jouée dans l'éditeur (bouton lecture sans retour visible, « Tester sur le site » qui n'affiche que l'état final) : elle travaille « en aveugle » et le dit. Deux découvertes fortuites marquantes soutiennent sa progression : le lien « Régler sur « Plats » » qui lui fait diagnostiquer seule la panne de T2, et le réglage « démarre après tel élément » qui remplace avantageusement ses délais manuels et se propage automatiquement aux éléments enchaînés en T4. L'échec de T4 tient à deux causes distinctes : un coût d'accès élevé aux réglages (9 actions avant de toucher le premier menu, pour un seul des quatre éléments) et une impossibilité, malgré trois tentatives, de sélectionner le groupe des trois chiffres clés. Un écart matériel notable apparaît dans le récit de T3 (un élément non animé est décrit comme animé), à mettre en regard d'une tâche par ailleurs réussie sans accroc technique.

---

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut.** C (réussite complète, aucune aide). Site enregistré v1 : `rh_about_h2` porte un déclencheur `on=inView`, « Fondu en montant », 700 ms, une seule fois ; aucune autre modification dans le journal. Vérifié contre 5.0/T1 : R1 (opacité 0→1 + translateY 28px, seuil ≥8 px atteint) ; R2 (trigger inView) ; R3 (700 ms ∈ [200, 2500]) ; R4 (aucun mouvement permanent) ; R5 (seul `rh_about_h2` touché). Les cinq critères de réussite complète sont remplis. **Accord** avec le statut C proposé par le préparateur.

**Mode de fin.** Terminé déclaré (« J'ai terminé », 04:04). **Aides.** Aucune (jamais « bloquée »).

**Métriques (9.2).**
- Actions totales : 19 (compte participante, cohérent avec le compte du dispositif) — 29 appels d'outils de la tâche (▶ #1 à #29 : 19 commandes + 10 ouvertures d'image, qui ne comptent pas comme action selon la légende de la trace).
- Actions perdues à cause du dispositif : 0.
- Première action pertinente : action [4] (#6, 01:20) — clic sur la rubrique « Animation » du panneau, qui révèle le sélecteur Apparition/Au survol/En continu pour le titre visé (capture 003-capture.png). J'hésite avec l'action [2] (clic sur le titre, #3) : cette dernière ne fait qu'ouvrir un panneau générique (Texte, Données, Mise en forme rapide, Animation comme simple libellé non déplié, capture 002-capture.png) sans contenu concernant le mouvement ; je retiens donc [4].
- Actions jusqu'à la réussite : action [8] (#12, 01:49) — le choix de « Fondu en montant » crée en une fois l'effet avec ses valeurs par défaut (Normale/700 ms, « quand il entre dans l'écran », délai 0, une seule fois), qui remplissent aussitôt R1 à R5. Les actions suivantes (9 à 19) ne modifient plus rien, seulement de la vérification.
- Captures et loupes : 10 captures, 0 loupe.
- FP : 0 (aucune action perdue). HES : 1 (voir lignes de codage, gravité 2). ERR : 0. COLL : 0 (COLL-D et COLL-ND). RATE : 0.
- VERIF : 1 occurrence (VERIF, pas VERIF-E), rang = action [16] (#24, « Tester sur le site »).
- VOC : « Netteté » (effet non essayé), « canevas » (bulle du bouton lecture).
- SEQ : 6/7 (« trois clics et c'était fait […] je n'ai pas réussi à voir le résultat bouger »).

**Concordance du récit (9.4, réponse T1-R, 04:51).** Quoi = 2 (seul le titre est décrit comme bougeant, rien en trop). Quand = 2 (« quand il arrive au niveau de la partie « La maison » » = arrivée à l'écran, exact). Comment = 2 (« il monte un peu en apparaissant, en fondu » = fondu en montant, exact). Combien = 2 (« 700 millisecondes […] une seule fois », les deux exacts). **Total 8/8, aucun écart matériel.** Elle marque elle-même la limite épistémique de son récit (« je dis ça parce que c'est ce que l'outil m'a affiché, pas parce que je l'ai constaté »), ce qui ne change pas la cotation (le récit reste exact) mais illustre sa prudence.

**Mesures propres T1.** Première action pertinente : voir ci-dessus. VERIF présent avant « J'ai terminé » : oui (action [16]). Moment de lancement choisi : « quand il entre dans l'écran » — repris tel quel du défaut, jamais changé.

---

### T3 · Donner du rythme à l'accueil (position 2)

**Statut.** C (réussite complète, aucune aide). Site v5 : titre `rh_hero_h1` toujours au chargement, 1 120 ms ; `rh_hero_b1` 1 200→1 700 ms ; `rh_hero_b2` 1 350→1 850 ms ; paragraphe inchangé. Vérifié contre 5.0/T3 : R1 (durée hors retard 1 120 ms ∈ [900, 4000]) ; R2 (fin du titre = 0+1120=1120 ; 80 % = 896 ; départs boutons 1200 et 1350 ≥ 896 ; fins 1700 et 1850 ≤ 6000) pour les deux boutons ; R3 (paragraphe toujours animé au chargement, inchangé) ; R4 (rien ajouté sur surtitre/photo/pastille, journal ne montre que titre + 2 boutons). Les quatre critères sont remplis. **Accord** avec le statut C proposé.

**Mode de fin.** Terminé déclaré (09:04). **Aides.** Aucune.

**Métriques (9.2).**
- Actions totales : 23 (compte participante) — 33 appels d'outils (#30 à #62 : 23 commandes + 10 images).
- Actions perdues au dispositif : 0.
- Première action pertinente : action [2] (#32, 05:48) — le clic sur le grand titre affiche directement ses réglages déjà renseignés (Fondu en montant, « Sur mesure : 500 ms », « dès l'ouverture de la page »), visibles dès la capture suivante (002-capture.png) : contrairement à T1, la rubrique n'a pas besoin d'être dépliée puisque l'élément a déjà une animation.
- Actions jusqu'à la réussite : action [16] (#51, key Enter, 07:32) — validation du délai du second bouton (1 350 ms), dernier des quatre réglages requis (R1 à R4 tous remplis à cet instant).
- Captures et loupes : 10 captures, 0 loupe.
- FP : 0. HES : 1 (gravité 2, ne pas voir la séquence jouer). ERR : 0. COLL : 0. RATE : 0.
- VERIF : 1 (action [20], #57, « Tester sur le site »).
- VOC : aucun mot nouveau (liste des effets déjà rencontrée en T1).
- SEQ : 6/7.

**Concordance du récit (T3-R, 10:00).** Quoi = **0**. Elle décrit avec exactitude le titre et les deux boutons, mais ajoute : « le petit intitulé au-dessus et le paragraphe arrivent aussi, je n'y ai pas touché ». Le paragraphe est exact (animé, inchangé). Mais « le petit intitulé au-dessus » ne peut désigner que le surtitre « Bistronomie · Clermont-Ferrand », qui **ne porte aucun mouvement**, ni à l'état de départ ni dans le site final (5.0/T3 : « surtitre : aucun mouvement » ; R4 rempli = rien ajouté). C'est une affirmation fausse, non une simple omission : selon 9.4, un élément « en trop » disqualifie du score 2, et une erreur disqualifie du score 1 (« une partie, sans erreur ») ; j'applique donc 0 au sens strict, en notant mon hésitation — 4 des 5 éléments cités sont corrects, mais la règle telle qu'écrite ne prévoit pas de score intermédiaire pour un faux positif isolé. Quand = 2 (ordre correct : titre puis boutons, « une fois le titre bien en place »). Comment = 2 (« monte en apparaissant » / « de la même façon », exact). Combien = 1 (durée du titre « un peu plus d'une seconde » exacte à ±50 %, mais le nombre de répétitions n'est pas abordé dans T3-R). **Total 5/8, écart matériel oui** (codé MM-V, gravité 3, ligne de codage n°12). C'est le résultat le plus significatif de cette tâche pour QR3 : une tâche par ailleurs sans accroc technique produit un récit visiteur partiellement halluciné.

**Mesures propres T3.** R1 : rempli à l'action [4] (#35, choix « Lente », 06:04). R2 : rempli au bouton 1 à l'action [10] (#43) puis au bouton 2 à l'action [16] (#51) — aucune aide en cause. Estimation T3-a (10:32) : « un peu moins de deux secondes […] disons deux secondes », contre 1 850 ms réels (≈1 890 ms à la visite du préparateur) : écart d'environ +6 à +8 %, **juste** (seuil ±30 %), obtenue par lecture du champ et non par chronométrage (elle le précise elle-même).

---

### T2 · Ce que voit vraiment le client (position 3)

**Statut.** C (réussite complète, aucune aide). Site v1 : seul le déclencheur de `rh_dishes_list` change (`load` → `inView`), effet et durée (600 ms) inchangés ; surtitre et titre de la section intacts. Vérifié contre 5.0/T2 : R1 (les 3 cartes, via le groupe, ont un mouvement d'arrivée visible) ; R2 (déclenché à l'arrivée à l'écran) ; R3 (600 ms ∈ [200, 2500]) ; R4 (surtitre « Cette saison » et titre « Quelques plats signature » toujours animés à l'arrivée à l'écran, inchangés) ; R5 (rien ajouté hors de la section, lien « Toute la carte » non touché). Les cinq critères sont remplis. **Accord** avec le statut C proposé.

**Mode de fin.** Terminé déclaré (14:19). **Aides.** Aucune.

**Métriques (9.2).**
- Actions totales : 20 (compte participante) — 31 appels d'outils (#63 à #93 : 20 commandes + 11 images, la loupe comprise).
- Actions perdues au dispositif : 0.
- Première action pertinente : action [6] (#71, 11:34) — clic sur la première carte de plat, dont la capture suivante (004-capture.png) montre un début de réglage Animation (« Fondu en montant », description tronquée, lien « Régler sur « Plats » »).
- Actions jusqu'à la réussite : action [16] (#85, 13:09) — choix de « quand il entre dans l'écran » sur le groupe « Plats », seule modification du journal (v1), qui suffit à remplir R1 à R5 d'un coup.
- Captures et loupes : 10 captures, 1 loupe (agrandissement du texte « Arrive avec « Plats » … », confirmé par 005-loupe.png).
- FP : 0. HES : 1 (gravité 1, fil d'Ariane, voir ci-dessous). ERR : 0. COLL : 0. RATE : 0.
- VERIF : 2 occurrences de nature différente — VERIF-E au rang de l'action [2] (#65, défilement de l'aperçu d'édition jusqu'aux plats, explicitement présenté comme « voir ce qu'Aurèle voit »louer mais réalisé dans la vue d'édition, pas hors outils) ; VERIF au rang de l'action [17] (#88, « Tester sur le site »).
- VOC : aucun mot nouveau signalé pendant la tâche.
- SEQ : 6/7.

**Concordance du récit (T2-R, 16:51).** Quoi = 1 : les trois cartes sont décrites avec exactitude (« montent en apparaissant, en fondu […] les trois ensemble »), mais le récit omet que le surtitre « Cette saison » et le titre « Quelques plats signature » bougent eux aussi (R4) — omission, pas erreur, donc pas d'écart matériel, mais pas non plus la totalité des éléments qui bougent. Quand = 2 (« à ce moment-là, et seulement à ce moment-là » = arrivée à l'écran, exact). Comment = 2 (fondu + montée, exact). Combien = 2 (« six dixièmes de seconde » = 600 ms exact ; « ça ne se rejoue pas » = une seule fois, exact). **Total 7/8, aucun écart matériel** (l'omission des éléments déjà animés ne compte pas comme faux selon 9.4).

**Mesures propres T2.** Diagnostic (réponse T2-a, 17:30) : « l'animation existait, mais elle était réglée pour partir à l'ouverture de la page […] au moment où la page se charge, les cartes […] apparaissent dans une zone que personne ne regarde » — désigne explicitement le moment de lancement comme cause : coté **juste**. VERIF avant la première modification : oui (VERIF-E à l'action [2], avant toute modification à l'action [16]). Modifications collatérales dans le site final : aucune.

---

### T5 · Calmer la pastille, réveiller le bouton (position 4)

**Statut.** C (réussite complète, aucune aide). Site v2 : `rh_hero_badge` — le déclencheur « en continu » passe de Pulsation à Aucun (arrivée Zoom 300/500 ms inchangée) ; `rh_hero_b1` gagne un déclencheur au survol, « Soulever », 250 ms, avec retour. Vérifié contre 5.0/T5 : S1 (aucun mouvement rejoué en boucle) ; S2 (arrivée conservée, 300+500=800 ms total ∈ [200, 1500]) ; S3 entier (translateY(-4px), ≥2 px, 250 ms ≤ 800 ms, retour au départ de la souris, pas de répétition — ce n'est pas un S3 « à moitié » car il y a un déplacement réel, pas seulement couleur/ombre) ; S4 (seuls `rh_hero_badge` et `rh_hero_b1` touchés, ni « Voir la carte » ni le bouton de l'en-tête). Les quatre critères sont remplis intégralement. **Accord** avec le statut C proposé.

**Mode de fin.** Terminé déclaré (74:57 — horodatage décalé par l'interruption réseau, voir section 6). **Aides.** Aucune.

**Métriques (9.2).**
- Actions totales : 23 (compte participante, continu malgré l'interruption) — 35 appels d'outils (#94 à #128 : 23 commandes + 12 images).
- Actions perdues au dispositif : **0**. L'incident du point 13 de l'addendum 3 (coupure réseau après l'action [3]) n'a coûté aucune action : « Rien n'a changé à l'écran […] Reprenez où vous en étiez, votre compte d'actions continue », et l'action [4] annoncée avant la coupure est bien la première exécutée à la reprise (71:44).
- Première action pertinente : action [2] (#96, 19:37) — clic sur la pastille, dont la capture suivante (002-capture.png) montre directement le panneau Animation complet (Apparition Zoom + En continu Pulsation), l'élément ayant déjà ses deux animations d'origine.
- Actions jusqu'à la réussite : action [15] (#114, 73:07) — choix de « Soulever » sur le bouton, dernier des deux réglages requis (S1 rempli dès l'action [7]/#102, S3 rempli ici).
- Captures et loupes : 12 captures, 0 loupe.
- FP : 0. HES : 0. ERR : 0. COLL : 0. RATE : 0.
- VERIF : 2 occurrences, la première au rang de l'action [19] (#121, survol du bouton sur « Tester sur le site », capture 010-capture.png).
- VOC : aucun mot nouveau signalé pendant la tâche (« les enfants un à un » apparaît à l'écran, capture 002, grisé, mais n'est commenté qu'au débriefing, voir section 4).
- SEQ : **7/7** — la seule tâche notée au maximum.

**Concordance du récit (T5-R, 75:51).** Quoi = 2 (pastille et bouton, rien en trop). Quand = 2 (« trois dixièmes de seconde après l'ouverture » / « quand le visiteur passe la souris », exacts). Comment = 2 (« petit zoom » / « se soulève », exacts). Combien = 2 (« une demi-seconde » = 500 ms exact ; « un quart de seconde » = 250 ms exact ; « elle se tient tranquille » / « redescend quand la souris s'en va », comportements exacts). **Total 8/8, aucun écart matériel.** C'est le seul récit de la séance fondé sur une observation oculaire réelle et revendiquée comme telle (« pour une fois, je ne raconte pas ce que l'outil m'a écrit »).

**Mesures propres T5.** S1 : rempli à l'action [7] (#102, 71:59). S2 : jamais perdu (aucune modification sur l'Apparition). S3 : rempli à l'action [15]. T5-a (« non, elle ne bougera plus ») s'appuie sur le réglage ET sur une comparaison de deux captures à 1 s d'intervalle (action [21], 74:15) : cohérent avec S1 réellement rempli. Aucune confusion entre le bouton du héros et celui de l'en-tête (elle vérifie explicitement que « Voir la carte » ne bouge pas, T5-b).

---

### T4 · La maison racontée comme une scène (position 5)

**Statut.** E (échec). Site v6 : photo (glissé depuis la gauche, 0→700 ms, rejoue à chaque passage), titre (`start: after` photo, 700→1400 ms), paragraphe (`start: after` titre, 1400→2100 ms) ; **aucune animation sur les trois chiffres**. Vérifié contre 5.0/T4 : C1 non rempli (3 éléments animés sur 6 — les chiffres restent immobiles) ; C3 non évaluable/non rempli (pas de départ pour « le premier chiffre »). La règle « Échec : C1 ou C3 non rempli » s'applique déjà sur ce seul constat, quels que soient C2/C4/C5/C6. Profil des critères remplis : C4 (fin à 2 100 ms ∈ [1800, 3000]) et C6 (rejeu confirmé à l'identique au retour, 141/827/1541 ms) ; C2, C3, C3b, C5 non remplis (C5 non évaluable en l'absence de mouvement sur les chiffres). **Accord** avec le statut E proposé par le préparateur.

**Mode de fin.** Budget — auto-déclaré par la participante (« FIN : budget, ACTIONS : 38 ») avant la limite ferme de 40 actions ; le modérateur clôt avec la phrase scriptée pour la 40e action alors que seules 38 ont été faites (voir MOD, section 6). **Aides.** Aucune (jamais « bloquée » au sens du protocole, malgré 6 actions consécutives sans progrès en fin de tâche — sous le seuil persona de 15).

**Métriques (9.2).**
- Actions totales : 38 (compte participante) — 55 appels d'outils (#129 à #183 : 38 commandes + 17 images).
- Actions perdues au dispositif : 0.
- Première action pertinente : action [6] (#137, 77:40) — clic pour déplier la rubrique Animation de la photo ; la capture suivante (004-capture.png) montre la rubrique en cours d'ouverture avec « Apparition : Aucune », premier contenu concernant le mouvement de l'élément visé. (Comme en T1, la photo n'ayant initialement aucune animation, il faut un clic de dépliage explicite, contrairement à T3/T5 où l'existant s'affichait directement.)
- Actions jusqu'à la réussite : **non atteint** (statut E, C1/C3 jamais remplis).
- Captures et loupes : 17 captures, 0 loupe.
- FP : 1 (chasse au groupe « Chiffres », actions [35]-[38], non résolue, gravité liée 4 — voir codage). Actions perdues dans cette piste : 4 (actions 35 à 38).
- HES : 3 occurrences codées (photo, gravité 2 ; titre et paragraphe, gravité 1 chacune — voir hésitation de codage en section 3).
- ERR : 1, **non récupérée** (clic sur le fil d'Ariane « Chiffres » → atterrit sur « Contenu »), gravité 4 (origine de l'échec).
- COLL : 0.
- RATE : 0.
- VERIF : **0**. Elle n'atteint jamais « Tester sur le site » dans cette tâche (budget épuisé avant).
- VOC : « composant » / « instance » (vu à l'écran, capture 015-capture.png, dès l'action [33] ; non commenté à voix haute avant le débriefing D-FIN-5).
- SEQ : **3/7** (« la seule mission que je n'ai pas finie »).

**Concordance du récit (T4-R, 85:11).** Quoi = 2 : elle cite correctement photo, titre, paragraphe comme animés et déclare explicitement que « les trois chiffres […] sont déjà là, immobiles, exactement comme avant » — aucun élément en trop, aucune erreur, y compris sur son propre échec. Quand = 2 (ordre photo < titre < paragraphe, exact). Comment = 2 (« entre par la gauche » / « monte en apparaissant » / « se dévoile en fondu », tous exacts). Combien = 2 (« sept dixièmes de seconde » = 700 ms exact ; « à peu près deux secondes en tout » ≈ 2 100 ms, dans la marge ; « ça recommence à chaque fois que le visiteur revient » = C6, exact). **Total 8/8, aucun écart matériel.** C'est le résultat le plus intéressant de la matrice réussite × compréhension pour cette participante : un **échec lucide**, pas un échec ignoré — elle décrit fidèlement un résultat inachevé plutôt que de se rassurer à tort.

**Mesures propres T4.** Profil de critères : C4, C6 remplis ; C1, C2, C3, C3b, C5 non remplis. Structure de lancement : un seul événement pour les trois éléments réalisés (`start: after`, enchaînement en cascade), jamais étendue aux chiffres. T4-a (85:48) : « je passerais [Démarre] sur « en même temps que Titre 2 », et je lui mettrais un petit délai [...] ce qui suit se recale tout seul » — cohérent avec la structure réellement enregistrée (mécanisme `start: after` / propagation), avec une réserve honnête sur un point non vérifié (délai disponible avec « en même temps que »). Codé **cohérent**, pas de MM.

---

## 3. Lignes de codage (format 8.5)

Séance = P5 pour toutes les lignes. Codes dispositif recherchés systématiquement sur tout passage de gravité ≥ 2 (règle 8.4.8) ; « — » signifie qu'aucun n'a été trouvé.

| # | Tâche | Pos. | N° action | Horodatage | Étape | Code | Gravité | Endroit de l'interface | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | T1 | 1 | [6] | 01:48 | Choisir | VOC | 2 | Menu déroulant « Apparition », capture 004-capture.png | « (« Netteté », aucune idée de ce que c'est, je n'y touche pas.) » | — | Mot confirmé à l'écran (liste : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite/gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond) ; sans effet sur le résultat (évité). |
| 2 | T1 | 1 | [8] | 02:10 | Choisir/Lancer | DEC | — | Panneau Animation, capture 005-capture.png | « « Démarre : quand il entre dans l'écran » déjà posé par défaut. […] je n'ai eu qu'un choix à faire. » | — | Découverte non cherchée d'une valeur par défaut déjà correcte pour la tâche. |
| 3 | T1 | 1 | [8] | 02:10 | Choisir | SAT | — | Panneau Animation | « Là je suis contente, c'est aussi rapide qu'Elementor. » | — | — |
| 4 | T1 | 1 | [12]-[15] | 02:31-03:14 | Vérifier | HES | 2 | Bouton lecture à côté du menu Apparition, captures 007 et 008 identiques | « Je ne peux pas dire si ça a joué […] Même image, le titre est net et en place. » | PERC | 2 clics sur le bouton « Jouer dans le canevas » sans différence visible entre les deux captures (confirmé par ma lecture des images) ; 4 actions consommées sans nouvelle information. |
| 5 | T1 | 1 | [12] / T1-b | 02:57 / 05:17 | Vérifier | VOC | 2 | Bulle « Jouer dans le canevas », capture 007-capture.png | T1-b (déclaratif) : « « canevas » […] Ce n'est pas un mot que j'emploie. » | — | Mot visible dès l'action [12] mais non-compréhension explicitée seulement à la question T1-b. |
| 6 | T1 | 1 | [16] | 03:15-03:39 | Vérifier | VERIF | — | Onglet « Tester sur le site », capture 009-capture.png | « Un nouvel onglet s'est ouvert sur le vrai site, cadré direct sur la section « La maison ». Le titre est bien là, net, lisible. » | — | Vue hors outils d'édition, jusqu'à l'élément visé. |
| 7 | T3 | 2 | [3] | 06:04 | Régler | FRU | — | Panneau Animation du grand titre, capture 002-capture.png | Bilan tâche (09:04) : « chaque élément affichait « Sur mesure : 500 ms » sans qu'aucun des boutons […] ne soit allumé. Je ne sais pas d'où sort ce 500 […] et ça me met un doute. » | — | Purement déclaratif (pas de comportement associé, aucune action perdue) → signal faible, non retenu seul (11.2.1). |
| 8 | T3 | 2 | [11]/[17] | 07:08 / 07:56 | Régler | SAT | — | Résumé sous le champ Délai, captures 005 et 007 | « Cette phrase qui donne le début et la fin, c'est vraiment pratique, je n'ai pas à calculer dans ma tête. » | — | — |
| 9 | T3 | 2 | [20]-[22] | 08:13-08:41 | Vérifier | HES | 2 | Onglet « Tester sur le site », capture 009-capture.png | « La séquence dure moins de deux secondes […] je vois le résultat, pas le mouvement. » | PERC | 3 actions ([20]-[22]) pour une vérification qui n'apporte pas la confirmation recherchée. |
| 10 | T3 | 2 | [20] | 08:13 | Vérifier | VERIF | — | Onglet « Tester sur le site » | Idem #9 | — | Même action que la ligne 9 (règle 8.4.4, un événement porte plusieurs codes). |
| 11 | T3 | 2 | bilan tâche | 09:04 | Vérifier | FRU | — | — | « toujours pas moyen de voir la séquence se jouer […] j'ai dû me fier aux chiffres. » | — | — |
| 12 | T3 | 2 | T3-R (déclaratif) | 10:00 | Vérifier | MM-V | 3 | Récit visiteur | « le petit intitulé au-dessus et le paragraphe arrivent aussi » | — | Écart matériel : le surtitre « Bistronomie · Clermont-Ferrand » ne porte aucun mouvement (état de départ et R4, confirmé par le journal T3 qui ne touche que titre + 2 boutons). Voir concordance du récit ci-dessus. |
| 13 | T3 | 2 | T3-R/T3-b | 10:00-10:46 | Régler | FRU | — | — | « si quelqu'un remet le titre en rapide […], les boutons continueront d'attendre 1,2 seconde dans le vide […] c'est un vrai risque. » | — | Critique lucide de sa propre méthode (délais absolus posés à la main), avant même la découverte de « démarre après » en T2. |
| 14 | T2 | 3 | [2]-[5] | 11:01-11:14 | Découvrir | VERIF-E | — | Aperçu défilé dans l'éditeur | « Je dois d'abord voir ce qu'Aurèle voit. Je descends dans la page jusqu'à la partie des plats. » | — | Vue de visiteur revendiquée mais réalisée dans la vue d'édition, pas hors outils : VERIF-E, non VERIF. |
| 15 | T2 | 3 | [8]-[9] | 12:03-12:15 | Découvrir | DEC | — | Loupe sur le texte d'Apparition, 005-loupe.png ; lien « Régler sur « Plats » » | « Là je comprends. […] le lien « Régler sur « Plats » » [...] j'espérais [...] emmener directement. » | — | Sans ce lien, elle indique qu'elle « aurait tourné en rond ». |
| 16 | T2 | 3 | [14] | 13:08 | Régler | SAT | — | Menu déroulant « Démarre » du groupe Plats, capture 008-capture.png | « Tiens, ça, c'est mieux qu'Elementor : l'enchaînement entre éléments existe pour de vrai. » | — | Liste confirmée par capture : « après Titre 2 […] », « en même temps que […] ». |
| 17 | T2 | 3 | [17]-[18] | 13:34-13:53 | Vérifier | VERIF | — | Onglet « Tester sur le site », capture 010-capture.png | « La page de test s'ouvre cadrée sur les plats : les trois cartes sont complètes et bien en place. » | — | — |
| 18 | T2 | 3 | bilan tâche | 14:19 | Vérifier | HES | 1 | Fil d'Ariane du panneau, capture 011-capture.png | « en haut du panneau c'est marqué « Page > À la carte > Contenu > Plats » alors que je suis sur la page d'accueil. J'ai cru une seconde que j'avais changé de page. » | — | Confusion immédiatement dissipée, aucune action perdue ; confirmé visible sur la capture 011. |
| 19 | T2 | 3 | T2-a (déclaratif) | 17:30 | Régler | MM | 3 | — | « la valeur par défaut a l'air d'être « dès l'ouverture de la page ». […] Je mettrais « quand il entre dans l'écran » par défaut. » | — | **Contredit sa propre observation de T1-b** (05:17) : « « Démarre : quand il entre dans l'écran » déjà posé par défaut » — c'est bien ce qu'elle a constaté quand ELLE a créé une animation neuve. Les valeurs « dès l'ouverture de la page » vues en T2/T3/T5 proviennent de contenus préexistants du site de test (états de départ du protocole), non d'un défaut de l'outil pour une animation nouvellement créée. Recommandation à ne pas relayer telle quelle (11.4 : le comportement observé en T1 prime sur la généralisation déclarée en T2). |
| 20 | T5 | 4 | [3]-[7] | 19:53-72:16 | Découvrir/Retirer | DEC | — | Badge « + 2 animations » → « + 1 animation », captures 002 et 004 | « le badge […] m'a confirmé tout de suite qu'il y avait deux choses dessus, donc que je pouvais en enlever une sans toucher à l'autre. » | — | — |
| 21 | T5 | 4 | [11] | 72:47-74:57 | Découvrir/Choisir | SAT | — | Rubrique Animation à 3 lignes, capture 007-capture.png | « « n'arrête pas de bouger » c'était forcément […] la ligne « En continu », et j'y suis allée directement. » | — | — |
| 22 | T5 | 4 | [18]-[19] | 73:44-74:08 | Vérifier | VERIF | — | Survol du bouton sur « Tester sur le site », capture 010-capture.png | « Ça y est, je vois enfin un effet ! Le bouton […] n'est plus aligné avec « Voir la carte » […] remonté de deux ou trois pixels. » | — | Seule vérification de la séance fondée sur une observation directe revendiquée comme telle ; décalage réel confirmé par le journal (translateY(-4px)) et la visite du préparateur, bien que 4 px soit difficile à confirmer à l'œil sur une capture réduite (limite de ma propre lecture, section 6). |
| 23 | T5 | 4 | [20]-[21] | 74:09-74:31 | Vérifier | VERIF | — | Comparaison à 1 s d'intervalle, captures 010/011 | « Ce n'est pas une preuve absolue […] mais c'est un bon indice que la pulsation est bien coupée. » | — | Prudence épistémique explicite, conforme à la règle 5 de l'incarnation (jamais affirmé comme un fait sans réserve). |
| 24 | T4 | 5 | [1]-[10] | 76:50-78:16 | Découvrir | HES | 2 | Sélection puis dépliage puis défilement du panneau pour la photo | « 9 actions pour juste arriver au premier réglage, agacement 2. » | — | Hésitation de codage : chaque action ouvre un état nouveau (pas de stricte immobilité), mais aucune ne constitue un « progrès » au sens de la définition de persona (3.8 : un choix concernant le mouvement) avant l'action [10]. Je retiens HES pour ne pas perdre cette donnée, en signalant le doute. |
| 25 | T4 | 5 | [17]-[19] | 79:16-79:34 | Découvrir | HES | 1 | Sélection du titre, même parcours raccourci | « je clique directement sur « Fondu en montant » pour gagner du temps. » | — | Coût moindre que pour la photo (apprentissage intra-séance). |
| 26 | T4 | 5 | [26]-[29] | 81:01-81:24 | Découvrir | HES | 1 | Sélection du paragraphe, même parcours | « Le paragraphe est sélectionné, panneau au même endroit que pour le titre. » | — | Idem, coût réduit par répétition du schéma. |
| 27 | T4 | 5 | [24]/[25] | 80:29-81:00 | Composer | DEC/SAT | — | Menu « Démarre » du titre, capture 012-capture.png | « Très bon point : le rejeu « à chaque passage » s'est mis tout seul sur le titre, puisqu'il suit la photo. Je n'ai pas eu à le répéter. » | — | Propagation automatique confirmée par le journal (v2 « à chaque passage » posé une seule fois, hérité par les pistes suivantes). |
| 28 | T4 | 5 | [35] | 82:39-83:04 | Composer | ERR | **4** | Fil d'Ariane, capture 016-capture.png | « Raté, j'ai cliqué sur « Contenu », qui est toute la section, pas sur le groupe des chiffres. » | — | Origine de la chaîne d'échec (règle 8.3 : la conséquence finale — l'échec de C1/C3 — est attribuée à cet événement d'origine). Non récupérée. Le clic visait « Chiffres », visible dans le fil d'Ariane de la capture 015 (lecture exacte du libellé non garantie à cette résolution, voir section 6) ; le résultat affiché correspond à « Contenu », le conteneur du titre + paragraphe + chiffres (pas la photo). |
| 29 | T4 | 5 | [37]-[38] | 83:05-84:02 | Composer | FP | 1 | Clic entre deux chiffres dans l'aperçu, capture 017-capture.png | « Je retombe sur le chiffre « 12 » tout seul, pas sur leur groupe. […] Je m'arrête là. » | — | Suite de la même piste que la ligne 28 (même but inatteignable) ; se termine non par un changement de cap mais par l'épuisement du budget. ERR n°28 non récupérée en fin de tâche. |
| 30 | T4 | 5 | [33] / D-FIN-5 | 82:13-82:18 / 86:32 | Composer | VOC | 2 | Panneau « Composant · Chiffre clé », capture 015-capture.png | D-FIN-5 (déclaratif) : « « Composant » et « instance » […] je n'ai pas compris ce que je modifiais […] c'est justement pour ça que je n'ai pas osé y toucher. » | — | Texte exact confirmé à l'écran (« Une instance affiche le composant avec ses propres valeurs. Modifier le composant change toutes les instances. » + « 3 instances dans le site ») dès l'action [33], mais non commenté à voix haute avant le débriefing : mots traversés sans verbalisation pendant qu'elle était concentrée sur le problème de sélection. |
| 31 | T4 | 5 | [38] | 84:02 | Composer | FRU | — | — | « Agacement : 4. Je suis bloquée par le temps, pas par l'outil. » | — | Seuil de la définition FRU (agacement déclaré 4 ou 5) atteint. |
| 32 | T4 | 5 | [38] | 84:02 | Composer | BUD | 4 | — | « FIN : budget, ACTIONS : 38 » | — | Mode de fin ; gravité 4 par la règle 8.3 (« arrêt au budget »), même cause que la ligne 28. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués **déclaratif**.

| Code | Étape | Citation | Repère |
|---|---|---|---|
| SAT | Vérifier | T1-SEQ (6/7) : « poser l'effet était facile, vraiment : trois clics et c'était fait. » | 04:51 |
| SAT | Régler | T2-SEQ (6/7) : « Trouver la panne a été plus rapide que je ne le craignais. » | 16:51 |
| SAT | Vérifier | T5-SEQ (7/7) : « Rien à redire : j'ai su où aller sans chercher […] j'ai pu contrôler le résultat moi-même. » | 75:51 |
| SAT | Choisir | D-FIN-2 : « La découpe en trois lignes […] correspond exactement aux trois questions que me pose un client. » | 87:01 |
| SAT | Choisir | D-FIN-7 : « le moment où je me suis dit que ça valait le coup, c'est la toute première mission […] Trois clics, fini. » | 88:59 |
| SAT | Composer | D-FIN-7 : « quand j'ai ouvert le menu « Démarre » sur les plats […] Là je me suis dit : ils ont compris le vrai problème. » | 88:59 |
| FRU | Vérifier | D-FIN-3 : « Le plus dérouté, c'est de ne jamais voir le mouvement. » | 86:19 |
| FRU | Vérifier | D-FIN-7 : « Un outil d'animation où je ne peux pas voir l'animation, sur le coup ça m'a paru absurde. » | 88:59 |
| FRU | Composer | D-FIN-7 : « j'ai cliqué trois fois d'affilée sur les chiffres sans jamais attraper leur groupe […] j'étais à quatre sur cinq d'agacement. » | 88:59 |
| FRU | Vérifier | D-FIN-8 : « Une seule chose vraiment : ne pas voir ce que je fabrique. Tout le reste, je m'y ferais en une semaine. » | 88:14 |
| FRU | Composer | T4-SEQ (3/7) : « C'est l'accumulation qui coince […] sept ou huit gestes par élément. » | 85:11 |
| VAL+ | — | D-FIN-1 : « pour les animations, l'outil tient la route, on peut faire nos sites d'artisans dedans sans regretter Elementor. » | 87:01 |
| VAL+ | — | D-FIN-6 : « ça remplacerait sans problème ce que je fais aujourd'hui sur 80 % de nos sites […] au moins aussi rapide qu'Elementor, et par endroits plus intelligent. » | 88:00 |
| VAL+ | Régler | D-FIN-6 : « une phrase qui dit « quand Plats entre dans l'écran, fondu en montant en 600 ms » vaut mieux qu'une capture d'écran de réglages que le collègue m'envoie sur WhatsApp. » | 88:00 |
| VAL− | Composer | D-FIN-6 : « Là où ça ne rentre pas encore, c'est sur les sites où le client paie pour du soigné […] Tant que je travaille en aveugle, je ne facturerai pas ce genre de travail dans cet outil. » | 88:00 |
| VAL− | Composer | D-FIN-4 : « Ce que je ne ferais pas seule […] une scène en quatre temps […] Pas parce que c'est trop compliqué à régler, mais parce que je ne peux pas la regarder. » | 88:00 |

---

## 5. Problèmes candidats pour cette séance

Regroupement provisoire (11.1), avec première réponse au test d'artefact de 11.3 pour A1, A2, A6, A8. Ces réponses sont fondées sur cette seule séance ; la condition « au moins 2 participants » de 11.2 ne peut être vérifiée qu'au niveau de la synthèse inter-participants.

### PC-1 · Sélection impossible du groupe des trois chiffres (arborescence de blocs absente)
Lignes de codage 28-29. Trois tentatives distinctes échouent (clic direct → instance seule ; fil d'Ariane « Chiffres » → « Contenu » ; clic entre deux éléments → instance seule), cause directe de l'échec de T4 (C1/C3 non remplis).
- **A1 (perception).** Non : le problème ne dépend pas de la perception continue du mouvement ni de la résolution d'écran, c'est un problème de ciblage/hiérarchie de sélection, identique pour un utilisateur voyant l'écran en continu. → passe à A2.
- **A2 (connaissance/persona).** Aucun code CONN ni PERS sur ce passage : elle utilise le fil d'Ariane et le clic direct, deux gestes attendus de son profil (comparaison explicite et légitime à Elementor et à une logique de calque/colonne). Ne disqualifie pas.
- **A6 (modérateur).** Aucun MOD ne précède ce passage dans T4.
- **A8 (perception affirmée).** Aucun HALL : les trois échecs sont chacun confirmés par une capture citée (015, 016, 017).
- **Statut : problème d'interface**, retenu, gravité 4 (cause un échec). Cause apparente : pas d'équivalent visible d'un panneau de calques/arborescence permettant de choisir explicitement le niveau (élément, groupe, section) à sélectionner.

### PC-2 · Aucun moyen de constater qu'une animation s'est jouée dans l'éditeur
Lignes de codage 4, 9 (HES+PERC) et le thème déclaratif dominant de D-FIN-3/7/10. Le bouton lecture (« Jouer dans le canevas ») ne produit aucune différence visible entre deux captures prises immédiatement après deux clics successifs (T1) ; « Tester sur le site » n'ouvre systématiquement que l'état final, jamais un instant intermédiaire (T1, T3, T2, T5).
- **A1 (perception).** Oui, le problème disparaîtrait largement avec une perception continue du mouvement — mais ceci demande une mise en garde méthodologique de ma part : **le dispositif de cette étude lui-même** impose à la participante de ne voir que des photographies fixes (règle 5 de l'incarnation, rappelée dans les règles techniques de la séance). Un vrai visiteur qui défile une vraie page verrait le mouvement se jouer sans aucun problème pour les animations liées au défilement — cette part de la plainte est largement un artefact de l'étude, pas de l'outil. En revanche, le sous-problème du **bouton lecture spécifiquement destiné à prévisualiser sans défiler** (« Jouer dans le canevas ») reste posé même en tenant compte de cette réserve : rien dans les deux captures prises (007 et 008, à 5 s d'intervalle l'une de l'autre selon l'horodatage) ne montre un état intermédiaire, un indicateur de lecture, ou une confirmation quelconque — je ne peux pas trancher si le clic n'a produit aucun effet ou si l'effet (700 ms) s'est simplement terminé avant la capture. L'interface n'offre par ailleurs aucune autre représentation visible (pas d'indicateur d'état, pas de minuteur) qui confirmerait sans ambiguïté qu'une lecture a eu lieu. → **problème d'interface amplifié par le dispositif**, retenu avec une gravité réduite d'un niveau (gravité brute 3, rapportée à 2), et la part « scroll naturel non simulable » séparée comme limite de couverture de l'étude plutôt que comme défaut d'Atelier.
- **A2.** Aucun CONN/PERS : elle applique son attente légitime (Elementor rejoue l'animation dans l'éditeur), documentée dans sa fiche.
- **A6.** Aucun MOD ne précède ces passages.
- **A8.** Aucun HALL : au contraire, elle signale systématiquement l'incertitude (« je suppose », « je ne peux pas dire »), jamais une perception affirmée à tort.
- **Statut : problème d'interface amplifié par le dispositif** pour le sous-problème du bouton lecture ; **à confirmer avec des utilisateurs réels** (mention obligatoire, 11.7). Le grief plus large « je ne vois jamais le scroll jouer » relève pour l'essentiel d'une limite de couverture de cette étude simulée, à rappeler dans le rapport (section 10 retirée, mais utile en 1.4).

### PC-3 · Coût d'accès élevé aux réglages d'animation (rubrique repliée, en bas de chaque panneau)
Lignes de codage 24-26. 9 des 38 actions de T4 sont consommées avant qu'elle touche le premier menu utile, pour un seul des quatre éléments réglés ; le schéma se répète (en s'accélérant par apprentissage) pour le titre et le paragraphe.
- **A1.** Non : c'est un problème de profondeur de navigation (nombre de clics/défilements), indépendant de la perception du mouvement. → A2.
- **A2.** Aucun CONN/PERS : parcours attendu (sélectionner puis chercher les réglages à droite).
- **A6.** Aucun MOD.
- **A8.** Aucun HALL (coût mesuré directement sur des actions comptées, pas sur une perception).
- **Statut : problème d'interface**, retenu, gravité 2 pour l'occurrence isolée la plus coûteuse (photo, sous le seuil de 10 actions), mais désigné par la participante elle-même comme la première cause de l'épuisement du budget de T4 (T4-b : « c'est là que le budget part »), donc à lire en cumul sur la tâche plutôt qu'occurrence par occurrence.

### Signal faible SF-1 · « Sur mesure : NNN ms » affiché sans qu'aucun bouton Rapide/Normale/Lente ne soit actif
Ligne de codage 7 ; même motif visible sur les captures T2 (007, carte « Plats », « Sur mesure : 600 ms ») et T5 (002, pastille, « Sur mesure : 500 ms » et « Sur mesure : 1 200 ms »). Purement déclaratif dans cette séance (« ça me met un doute » sans détour ni action perdue) : ne remplit pas la condition 11.2.1 (« observé dans le comportement »). Listé en signal faible, à surveiller si d'autres participants en font un problème comportemental.

### Signal faible SF-2 · Fil d'Ariane « Page > À la carte > Contenu > Plats » sur la page d'accueil
Ligne de codage 18, gravité 1, résolue seule en une capture. Le segment « À la carte » désigne le nom interne de la section (repris de la consigne T2), homonyme proche de la page « La carte » listée dans la colonne de gauche. Confirmé par la fiche du préparateur indépendamment de mon propre examen des captures.

---

## 6. Écarts au protocole et au dispositif

**MOD.** Un écart relevé : à la fin de T4, la participante s'arrête et déclare elle-même « FIN : budget, ACTIONS : 38 » (règle technique propre au dispositif simulé, pas une parole du modérateur), et le message suivant du coordinateur reprend la phrase scriptée pour la 40ᵉ action (« Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. ») alors que seules 38 actions ont été faites, pas 40 (4.3.F). Gravité/portée réduites : la phrase est neutre, ne donne aucune indication sur le chemin ou le résultat, et fait suite à un auto-arrêt motivé et explicite de la participante (« je n'ai plus que deux actions, ce qui ne suffit pas […] je ne vais pas laisser un menu ouvert à moitié réglé »). Je le signale par prudence plutôt que par certitude qu'il s'agit d'un vrai écart du modérateur au sens de 8.2 ; il n'affecte pas le statut (lu sur le site, indépendamment du mode de fin) et ne justifie pas une invalidation au sens de 11.6.

**HORS.** Aucun. Confirmé par l'en-tête de la trace (« Écarts au protocole (outils ou commandes interdits) : aucun ») et par ma propre relecture : seules les commandes `capture`, `loupe`, `click`, `double`, `hover`, `scroll`, `type`, `key`, `wait` apparaissent, jamais de tentative de lecture de code, de documentation ou d'inspection.

**PERS.** Aucune violation nette identifiée. Deux points notés sans les coder en PERS : (a) le trait de fiche « annule beaucoup » ne se manifeste jamais (aucun `cmd+z` dans toute la trace), mais aucune situation ne l'appelait clairement (aucune erreur nécessitant un retour arrière) — absence de manifestation, pas un écart observé ; (b) elle recourt à « Tester sur le site » (vue séparée) dans quatre tâches sur cinq alors que sa fiche indique qu'elle « vérifie […] rarement dans une vue séparée » — comportement compréhensible comme adaptation au fait que l'éditeur ne lui donne jamais de confirmation (voir PC-2), donc pas coté comme un écart à la persona.

**CONN.** Aucun trouvé. Elle reste dans son vocabulaire documenté et signale correctement comme non compris les mots de sa liste « vocabulaire inconnu » qu'elle rencontre (« instance » y figure explicitement ; « composant », proche, est traité de la même façon).

**PERC.** Deux occurrences codées (lignes 4 et 9), détaillées en PC-2.

**HALL.** Aucune trouvée. Point notable et plutôt rare : sur toute la séance, elle qualifie systématiquement d'hypothèse ce qu'elle n'a pas vu directement (« je suppose que… », « je ne peux pas dire si… », « ce n'est pas une preuve absolue »), conformément à la règle 5 de la consigne d'incarnation — comportement exemplaire de ce point de vue précis, à mettre au crédit de la fidélité de ce participant simulé plutôt qu'à celui de l'outil.

**Limites de ma propre lecture.**
- Le texte exact du fil d'Ariane dans les captures 015 et 016 de T4 (segment contenant « Chiffres ») n'est pas parfaitement lisible à la résolution à laquelle j'ai pu examiner l'image (capture 800×500, aucune loupe prise à ce moment par la participante) ; je me suis appuyée sur la citation de la participante et sur la note indépendante du préparateur (« le fil d'Ariane l'a menée à « Contenu », capture 016 ») pour confirmer le fait comportemental (atterrissage sur « Contenu »), sans pouvoir vérifier au pixel près pourquoi le clic n'a pas atteint « Chiffres ».
- Le décalage de 4 px du bouton au survol (T5, ligne 22) est documenté dans le journal (`translateY(-4px)`) et confirmé par la visite instrumentée du préparateur, mais je ne peux pas moi-même le distinguer avec certitude visuelle entre les captures 009 et 010 à l'échelle où je les ai examinées.
- Je n'ai ouvert que 40 des 60 images disponibles pour cette séance (choisies pour couvrir chaque affirmation contestable ou centrale), pas la totalité ; les captures 001, 002, 003, 006 de T1, 001, 006, 008, 010 de T3, 001, 002, 003, 009 de T2, 001, 005 de T5, et 001, 002, 003, 007, 008, 009, 013 de T4 n'ont pas été examinées directement par moi, seulement lues via la trace et la fiche.
- Conformément à la consigne, je n'ai pas consulté `p5-t1-invalide/`, ni le protocole complet avec hypothèses, ni les autres participants ou vagues.
