# Observation · séance P4 (Julien Ferrand, designer motion) · vague 3

Observateur : codage a posteriori, à partir du protocole remis à l'observateur (§ 3, 4.3, 4.4, 5, 8, 9, 11), de l'addendum 3, de la trace `traces3/trace-p4.md`, des captures `shots3/p4-t*/` (28 images ouvertes) et de la fiche `fiches3/fiche-lecture-p4.md`. Version testée : `08a6d1e`. Ordre des tâches : T1, T2, T5, T3, T4.

---

## 1. Résumé de la séance

P4 ouvre le mode « Animation » de la barre du haut dès la deuxième action de la séance et ne le quitte plus : il compose à la main, en chiffres, dans la ligne de temps, et ignore les préréglages jusqu'à la dernière mission. Trois tâches sont menées à terme sur déclaration « J'ai terminé » (T1, T5, T3), deux s'arrêtent au budget de 40 actions (T2, T4). Aucun blocage n'est déclaré de toute la séance, donc aucune aide n'est demandée ni donnée : les cinq statuts se lisent sans correction d'aide. Le site enregistré donne C pour T1, T5 et T3, E pour T2 et T4. En T2, le diagnostic est juste et complet dès la 30e action, mais la correction n'aboutit pas : le menu qui commande le déclencheur est à deux replis et deux défilements de la phrase qui l'énonce, et la dernière action (un pari à l'aveugle) ne change rien. En T4, quatre pistes sur six éléments sont posées, deux d'entre elles restent vides et le récit du visiteur affirme un mouvement de paragraphe que le site ne porte pas : c'est le seul écart matériel de la séance. Le participant ne regarde jamais le site en conditions de visiteur (lien « Tester sur le site » visible et jamais cliqué) ; toutes ses vérifications se font dans la vue d'édition, conformément à sa fiche.

---

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut : C.** Accord avec le statut proposé par le préparateur.
Lecture du site final (v14) : `rh_about_h2` porte un déclencheur `on=inView`, animation sur mesure 600 ms, images-clés 0 ms `{opacity:0, translate(0,20px)}` → 600 ms `{opacity:1, transform:none}`.
- R1 : opacité de départ 0 ≤ 0,5 **et** décalage 20 px ≥ 8 px, retour à l'état normal → rempli.
- R2 : `inView` sur le titre lui-même → rempli.
- R3 : durée totale = 0 + 600 = 600 ms ∈ [200 ; 2 500] → rempli.
- R4 : aucun mouvement permanent → rempli.
- R5 : le journal ne contient que les 14 versions de cette seule animation → rempli.
Aucune aide → statut C (et non C-A).

**Mode de fin** : terminé déclaré (« FIN : terminé », 05:39). **Aides** : aucune (aucun niveau).

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 36 (compte du participant) ; 47 appels d'outils, dont 11 ouvertures d'image (👁, non comptées) |
| Actions perdues au dispositif | 1 (action 10, commande `triple` rejetée) |
| Première action pertinente | rang 2 (clic sur le titre visé ; la capture 002 qui suit montre la rubrique repliée « Animation » de ce titre). Confirmation non ambiguë au rang 4 (capture 003 : « Animations lancées par Titre 2 », « Quand : À l'entrée dans l'écran ») |
| Actions jusqu'à la réussite | 32 (v11/v12 : le décalage vertical de la clé de fin passe à 0 ; avant cela le titre finissait 20 px trop bas, cas d'échec de la section 5) |
| Captures / loupes | 11 captures, 0 loupe |
| FP et actions perdues en FP | 0 FP, 0 action |
| HES | 0 |
| ERR (dont non récupérées) | 1 ERR (action 24), 0 non récupérée |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 2 (gravité 0 et 1, voir lignes de codage) |
| VERIF / VERIF-E | VERIF : absent. VERIF-E : présent, premier rang 36 (vérifications de réglage antérieures aux rangs 14, 23, 29) |
| VOC | « aller-retour » ; « Courbe : Naturel (par défaut) » |
| SEQ | 6 |
| Temps | 00:39 → 05:39 (≈ 5 min ; métrique secondaire, non interprétée) |

**Concordance du récit (9.4)** — T1-R comparé au site v14.
- **Quoi = 2** : seul le titre bouge, aucun élément en trop. Confirmé : « le titre "Une cuisine de produits, servie sans chichi." … il monte d'une vingtaine de pixels en apparaissant ».
- **Quand = 2** : « Quand la partie "La maison" entre dans l'écran ». Le déclencheur enregistré est `inView` **sur le titre**, pas sur la section. Je cote 2 parce que le mécanisme (entrée à l'écran au défilement) est exact et parce que le critère R2 du protocole traite explicitement « le titre ou un bloc qui le contient » comme équivalents ; la nuance est notée, et le participant la soulève lui-même (« je ne sais pas à quel moment exact ça se déclenche — dès que le premier pixel du titre touche le bas de l'écran, ou quand il est au milieu ? »).
- **Comment = 2** : « il monte d'une vingtaine de pixels en apparaissant » = `translateY 20px` + `opacity 0→1`.
- **Combien = 2** : « en six dixièmes de seconde » = 600 ms ; « Une seule fois, il ne rejoue pas si on remonte » = `une seule fois`.
- **Total : 8 / 8. Écart matériel : non.**

**Mesures propres T1**
- Actions jusqu'à la première action pertinente : 2.
- Code VERIF avant « J'ai terminé » : **non** (VERIF-E seulement). Déclaré : « je n'ai pas regardé le résultat en conditions de visiteur, je n'ai vu que les chiffres, donc je suppose ».
- Moment de lancement choisi : **à l'entrée dans l'écran** — non choisi activement, accepté tel que proposé par défaut dans le formulaire (capture 003).

---

### T2 · Ce que voit vraiment le client (position 2)

**Statut : E** (échec), mode de fin **budget**. Accord avec le statut proposé par le préparateur.
Lecture du site final (v4) : identique à l'état de départ pour le critère visé. `rh_dishes_list` porte toujours `on=load`.
- R1 : la liste « Plats » porte bien un mouvement d'arrivée visible sur ses enfants (fade-up 600 ms) → rempli.
- R2 : **non rempli** — déclencheur resté `load`.
Condition d'échec de la section 5 : « aucune carte ne remplit à la fois R1 et R2 (notamment : cartes toujours lancées à l'ouverture de la page) » → **E**. Les deux pistes ajoutées par erreur (v1, v2) ont été retirées (v3, v4) : aucune collatérale ne subsiste. N = 3 cartes (capture 013 : « Œuf parfait », « Agneau des Combrailles », « Truffade revisitée »).

**Mode de fin** : budget atteint à la 40e action (BUD). **Aides** : aucune — le participant n'a jamais déclaré de blocage, malgré un agacement déclaré à 3.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; 57 appels d'outils dont 17 ouvertures d'image |
| Actions perdues au dispositif | 0 attestée (réserve ci-dessous sur l'action 40) |
| Première action pertinente | rang 6 (clic sur la première carte de plat ; capture 004 au rang 8 : « Animations lancées par Carte plat », vide) |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 17 captures, 0 loupe |
| FP et actions perdues en FP | **2 FP, 16 actions perdues** (FP1 : actions 13–26, 14 actions ; FP2 : actions 31–32, 2 actions) |
| HES | 1 (action 32) |
| ERR (dont non récupérées) | 1 ERR (action 40), **non récupérée** |
| COLL-D / COLL-ND | 2 COLL-D (v1, v2) / 0 COLL-ND |
| RATE | 2 (rubrique « Animations lancées par… », gravité 3 ; lien « Tester sur le site », gravité 1) |
| VERIF / VERIF-E | VERIF : absent (déclaré en T2-b : « je ne suis jamais allé voir le site en conditions de visiteur »). VERIF-E : premier rang 8 |
| VOC | « Ses enfants, un à un » ; « Décalage » (sens temporel) |
| SEQ | 3 |
| Temps | 07:21 → 15:52 (≈ 8,5 min) |

**Réserve de lecture sur l'action 40.** L'action est `key ArrowUp Enter`. La syntaxe documentée du navigateur de test est « `key Touche` … ou une combinaison comme `cmd+z` » ; je ne peux pas établir depuis la trace si les deux touches ont bien été envoyées. Le journal n'enregistre rien. Une explication suffisante existe sans invoquer le dispositif : la capture **p4-t5/008** montre que « Au chargement » est **la première ligne** du menu « Quand », donc qu'une flèche haut ne pouvait rien sélectionner. Le participant en fait lui-même le constat à 20:36, en mission suivante. Je retiens donc 0 action perdue au dispositif, en signalant l'incertitude.

**Concordance du récit (9.4)** — T2-R comparé au site v4.
Le récit est donné en **deux branches explicitement conditionnelles** (« Deux réponses, parce que je ne sais pas laquelle est vraie … tout ce qui suit est une supposition »). La branche « si mon changement n'est pas passé » décrit exactement le site.
- **Quoi = 1** : titre et plats décrits sans erreur ; le surtitre « Cette saison » (qui bouge aussi) est omis. La branche 1 (cartes qui apparaissent en montant à l'entrée) est contrefactuelle mais signalée comme telle.
- **Quand = 1** : vague mais compatible — il ne tranche pas entre les deux moments pour les plats, mais le vrai (« au chargement de la page, donc dans le vide ») est énoncé précisément et le titre est exact.
- **Comment = 2** : « fondu en montant » de 600 ms, courbe douce en sortie — exact (T2-a).
- **Combien = 1** : durée 600 ms exacte (T2-a) ; le nombre de fois n'est pas énoncé dans T2-R.
- **Total : 5 / 8. Écart matériel : non** — aucune affirmation fausse : la seule proposition fausse est présentée comme une hypothèse. Pas de MM-V.

**Mesures propres T2**
- **Diagnostic (T2-a) : juste.** Il désigne le moment de lancement et sa conséquence : « Le problème tenait à un seul mot : elle était réglée sur "au chargement de la page" au lieu de "à l'entrée dans l'écran" … Quand il descend enfin jusqu'aux plats, il n'y a plus rien à voir ». Il ajoute un second défaut réel : « le décalage entre enfants est sur "aucun" » (attesté capture 013 : champ « Décalage : aucun ms »).
- **Code VERIF avant la première modification : non.** La première modification (v1) a lieu à l'action 15 ; aucune vue visiteur n'a été ouverte avant, ni après.
- **Modifications collatérales encore présentes dans le site final : aucune** (v3 et v4 les retirent ; capture 012 : seule la piste du titre subsiste).

---

### T5 · Calmer la pastille, réveiller le bouton (position 3)

**Statut : C.** Accord avec le statut proposé par le préparateur.
Lecture du site final (v7) :
- **S1 rempli** : le déclencheur `vd1lkjF_CIbb` (pulsation, `loop`) est retiré (journal v1). Il ne reste sur la pastille que le zoom `on=load delay=300`, joué une fois.
- **S2 rempli** : arrivée conservée intacte, `scale 0.92→1` + `opacity 0→1`, durée totale = 300 + 500 = 800 ms ∈ [200 ; 1 500].
- **S3 rempli entièrement** : `rh_hero_b1` (bouton du **héros**, fil d'Ariane « Héros > Contenu > Texte > Boutons > Réserver une table », capture 011) porte un déclencheur `on=hover`, image-clé à 150 ms `scale(1.05)` — soit +5 % ≥ 2 %, atteint en 150 ms ≤ 800 ms, « Une fois » donc sans répétition, et la visite du préparateur atteste le retour à l'état normal quand la souris quitte. Le critère S3 exige que l'élément « revienne à son état normal », **sans exiger que ce retour soit animé** : un retour immédiat le remplit. Je n'ai donc pas de motif de coter S3 « à moitié ».
- **S4 rempli** : rien d'autre modifié ; aucune confusion avec le bouton « Réserver » de l'en-tête.
Aucune aide → **C**.

**Mode de fin** : terminé déclaré (23:42). **Aides** : aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 33 ; 46 appels d'outils dont 13 ouvertures d'image |
| Actions perdues au dispositif | 0 |
| Première action pertinente | rang 2 (clic sur la pastille ; capture 002 au rang 4 : « Au chargement · Zoom · +300 ms » et « Au chargement · Pulsation · +800 ms ») |
| Actions jusqu'à la réussite | 28 (v6/v7 : l'image-clé `scale 1.05` à 150 ms rend S3 vrai ; S1 l'était depuis l'action 9, S2 depuis le départ) |
| Captures / loupes | 13 captures, 0 loupe |
| FP et actions perdues en FP | 0 FP |
| HES | 1 (actions 31–33) |
| ERR (dont non récupérées) | 1 ERR (action 7), 0 non récupérée (REC-S à l'action 9) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 (lien « Tester sur le site », gravité 1) |
| VERIF / VERIF-E | VERIF : absent. VERIF-E : premier rang 4 ; tentative explicite de vérification au rang 32 (survol dans le canevas, sans effet) |
| VOC | aucun nouveau mot (« aller-retour » déjà compté en T1) |
| SEQ | 6 |
| Temps | 17:47 → 23:42 (≈ 6 min) |

**Concordance du récit (9.4)** — T5-R comparé au site v7.
- **Quoi = 2** : la pastille (zoom d'arrivée, plus rien ensuite) et le bouton « Réserver une table » au survol — exactement les deux éléments animés, aucun en trop.
- **Quand = 2** : « trois dixièmes de seconde après le chargement » = `on=load delay=300` ; « quand il passe sur "Réserver une table" » = `on=hover`.
- **Comment = 2** : « son petit zoom » = préréglage `zoom` ; « le bouton grossit de cinq pour cent » = `scale(1.05)`.
- **Combien = 1** : nombre de fois exact pour les deux (« ensuite, elle ne bouge plus ») ; durée exacte pour le bouton (« un dixième et demi de seconde » = 150 ms) mais non énoncée pour la pastille (500 ms de mouvement, il ne cite que le retard de 300 ms) → un des deux exact.
- **Total : 7 / 8. Écart matériel : non.**

**Mesures propres T5**
- **S1, S2, S3 : les trois remplis, séparément.**
- **S2 perdu en cours de tâche puis rétabli : non.** Le journal ne montre qu'un seul retrait (v1), celui de la pulsation ; l'arrivée n'a jamais été menacée.
- **S1 non rempli alors que T5-a affirme l'arrêt : sans objet.** T5-a affirme l'arrêt et **S1 est effectivement rempli** : la réponse est juste, et elle est argumentée sur deux sources (la liste des animations après suppression, et la rubrique « Effets continus » vérifiée à l'action 11 : « parallaxe aucune, bandeau non », capture 006). Le participant borne lui-même sa certitude (« je n'ai fait que lire sa fiche »).
- **Confusion entre le bouton du héros et celui de l'en-tête : aucune.**
- **T5-b** : « Aucune idée » + énumération des trois comportements possibles à la sortie du survol. Le rendu réel (retour immédiat non animé) correspond à sa deuxième hypothèse. Aucune affirmation fausse → pas de MM.

---

### T3 · Donner du rythme à l'accueil (position 4)

**Statut : C.** Accord avec le statut proposé par le préparateur.
Lecture du site final (v6) :
- **R1 rempli** : `rh_hero_h1` toujours `on=load`, durée du mouvement 1 200 ms ∈ [900 ; 4 000] (soit 2,4 × la valeur de départ).
- **R2 rempli** : fin du titre = retard 0 + durée 1 200 = 1 200 ms ; seuil à 80 % = 960 ms. Bouton 1 : départ 1 200 ≥ 960, fin 1 700 ≤ 6 000. Bouton 2 : départ 1 320 ≥ 960, fin 1 820 ≤ 6 000. Les deux boutons conservent leur `fade-up` de 500 ms.
- **R3 rempli** : le paragraphe garde son fondu 500 ms au chargement, inchangé.
- **R4 rempli** : rien ajouté sur le surtitre, la photo, la pastille, ni hors du héros (journal : 6 versions, 3 changements, tous dans le héros).
Aucune aide → **C**.

**Mode de fin** : terminé déclaré (32:07). **Aides** : aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 36 ; 51 appels d'outils dont 15 ouvertures d'image |
| Actions perdues au dispositif | 0 |
| Première action pertinente | rang 2 (clic sur le grand titre ; capture 002 au rang 4 : « Au chargement · Fondu en montant » sur le titre) |
| Actions jusqu'à la réussite | 33 (v5/v6, délai du second bouton ; R1 était acquis dès l'action 9) |
| Captures / loupes | 14 captures, **1 loupe** (seule loupe de la séance) |
| FP et actions perdues en FP | 0 FP |
| HES | 1 (actions 10–11) |
| ERR (dont non récupérées) | 1 ERR (action 27), 0 non récupérée (REC-S actions 29–30) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 (lien « Tester sur le site », gravité 1) |
| VERIF / VERIF-E | VERIF : absent (« je n'ai pas vu le résultat bouger … Je livre sur la foi des chiffres »). VERIF-E : premier rang 10, approfondi au rang 11 (loupe sur les deux losanges) |
| VOC | « Doux (sortie) » |
| SEQ | 5 |
| Temps | 25:39 → 32:07 (≈ 6,5 min) |

**Concordance du récit (9.4)** — T3-R comparé au site v6.
- **Quoi = 2** : titre, paragraphe, deux boutons — les quatre éléments animés, aucun en trop.
- **Quand = 2** : « La page se charge » pour tous ; ordre exact (titre et paragraphe ensemble, puis « Réserver une table » à 1,2 s, puis « Voir la carte » « un dixième plus tard »).
- **Comment = 2** : « monte et apparaît », « avec un freinage à l'arrivée » (courbe `cubic-bezier(.22,1,.36,1)` conservée), boutons qui montent.
- **Combien = 1** : durées exactes (1 200 ms pour le titre, « une demi-seconde » pour les boutons) ; le nombre de fois (« une seule fois ») n'est pas énoncé.
- **Total : 7 / 8. Écart matériel : non.**

**Mesures propres T3**
- **R1 : rempli à l'action 9** (journal v1/v2, 10:20:33), **aide de niveau 0**.
- **R2 : rempli à l'action 33** (journal v5/v6, 10:24:43 ; la moitié bouton 1 était acquise à l'action 23), **aide de niveau 0**.
- **Estimation T3-a : juste.** « Un peu moins de deux secondes … 1 820 ms … Disons 1,8 seconde » contre 1 820 ms enregistrés (≈ 1 810 ms à la visite) : écart nul, très en deçà des 30 %. Le calcul est explicité (« le deuxième bouton démarre à 1320 ms et son fondu dure 500 ms »).
- **T3-b** : « Je ne l'ai pas jugé, je l'ai calculé. » Seule vérification à l'œil : la loupe sur les images-clés après allongement de la durée.
- **Effet d'ordre à signaler (A7)** : T3 est en position 4 chez P4 ; il retrouve le champ « Délai » en s'appuyant explicitement sur T2 (« Je sais où est ce réglage maintenant : tout en bas, dans la rubrique "Animations lancées par…" »). Le coût de navigation mesuré ici est donc un **plancher**.

---

### T4 · La maison racontée comme une scène (position 5)

**Statut : E** (échec), mode de fin **budget**. Accord avec le statut proposé par le préparateur.
Lecture du site final (v15) : une animation unique sur la section `rh_about`, déclencheur `on=inView`, durée 2 500 ms, quatre pistes.
- **C1 non rempli** : 2 éléments visés sur 6 portent un mouvement (photo : `translateX(-40px)` → normal, 0–700 ms ; titre : `opacity 0→1`, 700–1 400 ms). Le paragraphe et « Années » ont une **piste vide** (une seule image-clé sans propriété : `1400ms {}` et `1800ms {}`). Les deux autres chiffres n'ont pas de piste.
- **C2** : les deux mouvements existants partent bien du même événement (entrée de la section). Non évaluable sur six éléments. Je le note « rempli pour les mouvements présents ».
- **C3 non rempli** : il n'y a pas de départ de mouvement pour le paragraphe ni pour le premier chiffre (pistes vides), donc l'ordre à quatre temps n'existe pas dans le site.
- **C3b non rempli** : un seul chiffre a une piste, et elle est vide.
- **C4 non rempli** : fin du dernier mouvement réel à 1 400 ms, en deçà de la borne basse de 1 800 ms.
- **C5 non rempli** : photo conforme (décalage horizontal 40 px ≥ 16 px) ; **titre non conforme** (fondu simple, `transform` absent du 0 ms — pas de décalage vertical de départ) ; paragraphe et chiffres sans mouvement.
- **C6 non rempli** : « une seule fois ».
Règle d'échec : « C1 ou C3 non rempli » → **E**. Aucune aide.

**Profil de critères** : C2 (partiel, sur les mouvements présents) ; **C1, C3, C3b, C4, C5, C6 non remplis**.

**Mode de fin** : budget atteint à la 40e action (BUD). **Aides** : aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; 50 appels d'outils dont 10 ouvertures d'image |
| Actions perdues au dispositif | **2 attestées** (actions 33 et 34 : ouverture du menu de préréglages et clic tombé hors de la liste, sans effet au journal) ; **1 action détournée** (action 25 : préréglage voisin appliqué). Voir le test d'artefact PB7 |
| Première action pertinente | rang **13** au sens strict (première piste posée sur un élément visé, capture 005 au rang 14) ; rang 5 au sens large (sélection de la section qui porte la scène, capture 003 au rang 6) |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 10 captures, 0 loupe |
| FP et actions perdues en FP | 0 FP — le parcours est direct de bout en bout |
| HES | 0 |
| ERR (dont non récupérées) | **3 ERR (actions 25, 34, 36), les 3 non récupérées** |
| COLL-D / COLL-ND | 0 / 0 (le surtitre « La maison » n'est pas touché ; la piste « Années » vide porte sur un élément visé, ce n'est pas une collatérale — c'est un résidu sans effet) |
| RATE | 1 (menu de répétition « Une fois », gravité 3) |
| VERIF / VERIF-E | VERIF : absent. VERIF-E : rangs 14, 20, 26, 29, 37 (captures de contrôle après chaque piste) — **mais aucune capture entre les actions 33 et 35**, d'où l'ERR 2 non détectée |
| VOC | aucun nouveau mot en tâche |
| SEQ | 2 (la plus basse de la séance) |
| Temps | 34:27 → 43:13 (≈ 8,8 min) |

**Concordance du récit (9.4)** — T4-R comparé au site v15.
- **Quoi = 0** : il annonce trois éléments qui bougent (photo, titre, **paragraphe**) alors que deux bougent. « Puis, à une seconde quatre, le paragraphe se dévoile à son tour. » — **la piste du paragraphe est vide** (fiche : « pistes du paragraphe et du chiffre jamais remplies (une image-clé vide) » ; journal : aucun « Remplir la piste » pour `rh_about_p` ; capture 009 : « PISTE · PARAGRAPHE … Remplir avec : un préréglage… », image-clé à 0 ms sans propriété). Un élément en trop → 0.
- **Quand = 1** : « Quand la partie "La maison" entre dans l'écran » est exact, et l'ordre des deux mouvements réels est exact ; mais le récit place un départ de paragraphe qui n'existe pas.
- **Comment = 1** : photo « glisse depuis la gauche » exact ; titre « il apparaît seulement, il ne s'élève pas, alors qu'Aurèle avait demandé qu'il monte » exact et lucide ; paragraphe « se dévoile » faux.
- **Combien = 2** : « la scène s'arrête donc au bout d'environ deux secondes » contre 1 400 ms réels → écart de 43 %, dans la tolérance de ± 50 % ; « la scène ne se joue qu'une fois » exact.
- **Total : 4 / 8. Écart matériel : OUI** — affirmation fausse sur « Quoi ». Codé **MM-V, gravité 3**.
  - Phrase du récit : « Puis, à une seconde quatre, le paragraphe se dévoile à son tour. »
  - Fait du site qui la contredit : piste `HiROplj29sJ4` → `rh_about_p`, images-clés : `1400ms {}` — aucune propriété animée ; le résumé de l'outil lui-même (capture 010) ne mentionne que la photo et le titre.
  - Le reste du récit est d'une exactitude remarquable, y compris sur ses propres manques (« les trois chiffres … restent posés là, immobiles … c'est précisément le morceau le plus demandé et le plus visible, et c'est celui qui manque »).

**Mesures propres T4**
- **Profil de critères** : voir ci-dessus (C2 partiel ; C1, C3, C3b, C4, C5, C6 non remplis).
- **Structure de lancement** : **un seul événement**. Une animation unique posée sur la section « La maison », déclencheur `on=inView`, quatre pistes décalées par leur champ « Départ » (0 / 700 / 1 400 / 1 800). C'est exactement la structure que la consigne appelle ; l'échec ne porte pas sur la structure.
- **T4-a : cohérente avec la structure enregistrée.** « je clique sur la piste "Paragraphe". En dessous s'affiche son champ "Départ", qui est à 1400. Je double-clique dedans, je tape 1100, Entrée. » — description exacte du panneau (capture 009) et de la valeur enregistrée. Pas de code MM.
- **T4-b** : « La navigation, pas le réglage. » Les deux incidents qu'il cite sont attestés (préréglage voisin : capture 008 « (fondu) » ; niveau de sélection : capture 010, cadre autour du seul « 12 »).

---

## 3. Lignes de codage (format 8.5)

Colonnes : Séance | Tâche | Pos. | N° action | Horodatage | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif sur le passage | Commentaire

| Séance | T | Pos | Act. | H | Étape | Code | G | Endroit | Trace | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P4 | T1 | 1 | 3 | 00:58 | Découvrir | RATE | 0 | rubrique repliée « Animation », bas du panneau de droite (et onglet « Animation » de la barre du haut) | capture `p4-t1/002-capture.png` ; « deux portes possibles » (T1-a) | — | Deux accès visibles au même moment ; il prend l'onglet du haut et atteint le but. Aucune conséquence observable → gravité 0. |
| P4 | T1 | 1 | 5 | 01:30 | Découvrir | SAT | 0 | bloc « Quand : À l'entrée dans l'écran » / « Animation : Nouvelle animation (à composer) » / « Ajouter » | capture 003 ; « Voilà qui est plus sérieux. » | — | Satisfaction sur le formulaire d'entrée et sur l'existence d'un « à composer ». |
| P4 | T1 | 1 | 7 | 01:48 | Découvrir | SAT | 0 | ligne de temps : « 1000 ms », règle 250/500/750/1000, boutons de lecture | capture 004 ; « Là on parle » | — | Confirmé en D-FIN-7 comme premier moment de valeur de la séance. |
| P4 | T1 | 1 | 7 | 01:48 | Régler | VOC | 1 | case « aller-retour » à droite du menu « Une fois » | capture 004 ; « une case "aller-retour" — leur yoyo, j'imagine » | — | Mot de sa liste « vocabulaire inconnu ». Il devine, ne l'utilise pas. D-FIN-5 : « je n'ai pas compris pourquoi elle était grisée ». Aucun effet sur le résultat. |
| P4 | T1 | 1 | 8 | 01:49 | Choisir | HES | 1 | deux boutons voisins « ⊕ Choisir un élément » et « + Ajouter "Titre 2 Une cuisine de…" » | capture 004 ; T1-b « Deux boutons se disputaient le travail … J'ai pris le deuxième au jugé » | — | Hésitation **déclarée après coup**, non verbalisée avant l'action : je cote 1 (au plus 2 actions, reprise immédiate) et je signale que la preuve comportementale est faible (il clique juste du premier coup). Le texte d'aide affiché à la même capture explique la différence ; il ne le lit pas, conformément à sa fiche. |
| P4 | T1 | 1 | 10 | 02:17 | Régler | HORS | 1 | — | appel #15, `b.mjs triple 768 472` → « erreur : action inconnue : triple » | HORS | Commande hors du répertoire autorisé, rejetée. 1 action perdue, comptée par le participant. **Écart de dispositif**, non une tentative de lecture de code ou de documentation — j'hésite sur le code (HORS est défini pour le code/la doc/l'inspection) et je le retiens sur consigne, en le qualifiant. |
| P4 | T1 | 1 | 24 | 04:05 | Régler | ERR | 2 | règle de temps graduée 100–600, bord droit | `click 786 140` → capture 009 « 590 / 600 ms », « INSTANT 590 MS » ; « mon clic sur la règle m'a donné 590 ms au lieu de 600 : il n'y a pas d'aimantation » | PERC (non retenu : le compteur est lisible) | Intention annoncée : « tout à droite … quelque chose comme 600 ». Résultat 590. Hésitation entre gravité 1 (coût 2 actions) et 2 : je retiens **2** (erreur récupérée seule ; 3 actions de correction, 33–35). La valeur 590 remplissait déjà les critères : la correction est une exigence propre au participant. |
| P4 | T1 | 1 | 29 | 04:48 | Régler | VOC | 1 | menu « Courbe : Naturel (par défaut) » | capture 010 ; « leur easing » ; T1-b « "Naturel (par défaut)", ça ne me dit rien du tout » | — | D-FIN-5 : « "Naturel", ça ne veut rien dire pour moi. Naturel selon qui ? ». Aucun effet sur le résultat de T1. |
| P4 | T1 | 1 | 35 | 05:10 | Régler | REC-S | — | champ « Temps » de l'image-clé de fin | journal v13/v14 « Déplacer l'image-clé » (09:58:50) | — | Récupération seule de l'ERR de l'action 24. |
| P4 | T1 | 1 | 36 | 05:15 | Vérifier | VERIF-E | 0 | panneau ANIMATION : phrase de résumé + ligne de temps | capture 011 ; « Je photographie pour vérifier l'ensemble avant de tester » | PERC | Vérification dans la seule vue d'édition. |
| P4 | T1 | 1 | 36 | 05:39 | Vérifier | RATE | 1 | lien « Tester sur le site ⧉ » sous la phrase de résumé | capture 011 (lien lisible, ligne 84 px) | PERC | Accès à la vue visiteur, visible et lisible, jamais utilisé de toute la séance. Conforme à la fiche persona (« vérifie peu en conditions de visiteur ») → voir test A2. |
| P4 | T1 | 1 | 36 | 05:39 | Vérifier | SAT | 0 | — | « un fondu montant discret, c'est exactement ce qu'Aurèle demande » | — | |
| P4 | T2 | 2 | 8 | 08:41 | Découvrir | RATE | 3 | rubrique « Animations lancées par Carte plat », vide | capture `p4-t2/004-capture.png` ; « la rubrique "Animations lancées par Carte plat" est vide : rien n'est attaché à cette carte » | — | La rubrique vide sur la carte lui fait conclure que rien n'anime les plats, alors qu'une animation d'un ancêtre les fait bouger. Origine de FP1. **Voir aussi PB10.** |
| P4 | T2 | 2 | 10 | 08:58 | Lancer | RATE | 3 | rubrique « ANIMATIONS LANCÉES PAR TITRE 2 "QUELQUES PLATS…" » avec sa ligne repliée « › À l'entrée dans l'écran · Fondu en mon… » | capture 005 | — | C'est exactement l'accès qu'il utilisera à l'action 35 sur « Plats » pour atteindre le menu « Quand ». Visible et lisible ici ; il ne l'emploie pas, et 25 actions s'écoulent. **Réserve** : ce qui est lisible à l'action 10 est la ligne **repliée**, pas le menu « Quand » lui-même ; et son clic à l'action 11 (sur le libellé de la ligne) a chargé le bloc ANIMATION en haut du panneau au lieu de déplier les réglages — l'interface lui a donc enseigné le mauvais geste. |
| P4 | T2 | 2 | 12 | 09:27 | Découvrir | RATE | 2 | texte « Comment lire cet écran : … Pour un effet tout prêt, un délai ou "après tel élément", la rubrique Animation de l'élément suffit. » | capture 006 (texte lisible, ligne ~218 px) | — | Le texte nomme la rubrique où se trouve le réglage cherché. Non lu (« je ne lis jamais les textes d'aide », T1-a ; fiche persona). |
| P4 | T2 | 2 | 13–26 | 09:28–12:24 | Composer | FP | 4 | animation du titre « Quelques plats signature » : boutons « Choisir un élément », menu « Cible », corbeilles de piste | 14 actions ; « je suis parti du principe que rien n'avait été fait sur les plats, et j'ai commencé à leur bricoler une animation dans celle du titre » (T2-b) | — | **Fausse piste de 14 actions**, close par le retrait des deux pistes. Par 8.3, la conséquence finale (budget atteint, échec) est attribuée à l'événement d'origine de la chaîne → gravité 4. **J'écris mon hésitation** : l'échec est surdéterminé (FP1 + coût de recherche du « quand ») ; si l'on tenait l'enfouissement du « quand » pour l'origine, c'est lui qui porterait la gravité 4. |
| P4 | T2 | 2 | 15 | 09:49 | Choisir | COLL-D | 2 | piste « Carte plat » ajoutée dans l'animation du titre | journal v1 « Ajouter une piste · Carte plat » (10:03:29) ; capture 008 | — | Modification d'une animation que la consigne demande de ne pas casser. Remarquée et retirée (action 26). |
| P4 | T2 | 2 | 18 | 10:22 | Choisir | VOC | 2 | menu « Cible » : « ✓ L'élément » / « Ses enfants, un à un » | capture 009 ; « Deux options seulement … C'est leur échelonnement. Mais sur une carte, ses enfants c'est la photo, le nom, le prix » | — | Terme de sa liste inconnue (« échelonnement »), traduit correctement. Ce qui lui échappe n'est pas le mot mais **son référent** : « enfants » de quoi. Coût ≈ 7 actions (15–21). D-FIN-5 : « je suis tombé dans le piège du niveau — les enfants de quoi ? ». |
| P4 | T2 | 2 | 19 | 11:06 | Choisir | FRU | 0 | — | « je perds du temps à cause d'une piste posée sur le mauvais niveau » (agacement 2) | — | |
| P4 | T2 | 2 | 21 | 11:13 | Choisir | COLL-D | 2 | piste « Plats » ajoutée dans l'animation du titre | journal v2 « Ajouter une piste · Plats » (10:04:53) ; capture 010 | — | Remarquée et retirée (action 23). |
| P4 | T2 | 2 | 22 | 11:58 | Choisir | DEC | 0 | avertissement « "Plats" a aussi ses propres animations (Fondu en montant) : elles se jouent en plus. » sous la piste | capture 010 (texte lisible, ligne ~331 px) ; « Attention, une phrase importante vient d'apparaître » | — | **Découverte fortuite déterminante** : elle réoriente la mission et évite un double fondu. Citée deux fois au débriefing (T2-b, D-FIN-2). Point fort du produit. |
| P4 | T2 | 2 | 23 / 26 | 11:59 / 12:24 | Composer | REC-S | — | icônes de corbeille de « PISTE · PLATS » et « PISTE · CARTE PLAT » | journal v3 et v4 « Retirer la piste » ; capture 012 (seule la piste du titre subsiste) | — | Les deux collatérales sont récupérées seules ; aucune ne subsiste dans le site final. |
| P4 | T2 | 2 | 30 | 13:33 | Lancer | SAT | 0 | phrase de résumé « Au chargement de la page : les enfants de "Plats" en ensemble (fondu en montant) en 600 ms. » | capture 013 ; « Là je tiens le coupable. » | — | Second moment de valeur cité en D-FIN-7. |
| P4 | T2 | 2 | 31–32 | 13:34–13:38 | Lancer | FP | 2 | la phrase de résumé elle-même, sous le champ du nom de l'animation | `click 600 73` ; captures 013 et 014 **strictement identiques** ; « Rien, ce n'est pas cliquable. C'est une phrase, pas un réglage. » | — | 2 actions perdues. Le passage est la preuve directe de PB1 : l'endroit où le « quand » est **lu** n'est pas l'endroit où il se **règle**. |
| P4 | T2 | 2 | 32 | 14:06 | Lancer | HES | 3 | panneau ANIMATION, haut du panneau de droite | « je sais exactement ce qui cloche mais je ne trouve pas où changer le "quand" d'une animation déjà créée — agacement 3 » | — | Verbalisation d'incertitude. La recherche qui suit coûte 7 actions de plus (33–39). |
| P4 | T2 | 2 | 32 | 14:06 | Lancer | FRU | 0 | — | agacement déclaré 3 ; T2-SEQ « ne pas trouver un interrupteur que l'outil m'affichait en toutes lettres à trois centimètres de là » | — | Agacement 3 : sous le seuil automatique de 4, mais expression négative spontanée → FRU retenu. |
| P4 | T2 | 2 | 35–38 | 14:21–15:28 | Lancer | — | 3 | rubrique repliée « Animations lancées par "Plats" » (bas de panneau) puis ligne « Au chargement · Fondu en montant » dépliée, menu « Quand » + champ « Délai » | captures 015, 016, 017 ; « Il fallait donc descendre tout en bas du panneau et déplier une rubrique … alors que la ligne de temps de cette même animation était affichée en haut de l'écran depuis le début » | — | Coût propre de la chaîne « quand » : 9 actions (31–39). Événement ultérieur dans la chaîne → gravité par coût propre (3). |
| P4 | T2 | 2 | 40 | 15:35 | Lancer | ERR | 3 | menu « Quand » ouvert (rendu dans la page) | `key ArrowUp Enter` ; aucun changement au journal ; **capture `p4-t5/008-capture.png`** montre que « Au chargement » est la première ligne du menu | (dispositif : syntaxe à deux touches non documentée, effet indécidable) | Intention annoncée : « en pariant que "À l'entrée dans l'écran" est juste au-dessus de "Au chargement" ». Le pari est faux. **Non récupérée** (budget). Le participant ne l'affirme pas réussi (« je finis à l'aveugle ») → pas de MM. |
| P4 | T2 | 2 | 40 | 15:52 | — | BUD | 4 | — | « FIN : budget / ACTIONS : 40 » | — | Mode de fin. |
| P4 | T2 | 2 | — | 17:26 | Vérifier | RATE | 1 | lien « Tester sur le site ⧉ » (captures 006, 010, 013) | T2-b « Il y avait un lien "Tester sur le site", je ne l'ai pas cliqué. » | PERC | Déclaratif corroboré par l'absence de toute action vers une vue visiteur. Conforme à la persona. |
| P4 | T5 | 3 | 4 | 18:27 | Retirer | SAT | 0 | liste « ANIMATIONS LANCÉES PAR "PASTILLE" » : « Au chargement · Zoom · +300 ms » / « Au chargement · Pulsation · +800 ms » | capture `p4-t5/002-capture.png` ; « Tout est dit dans le panneau » | — | T5-SEQ : « j'ai su en trois secondes laquelle supprimer ». |
| P4 | T5 | 3 | 6 | 18:58 | Retirer | VERIF-E | 0 | résumé « Au chargement de la page, après 800 ms : pulsation en 1200 ms, en boucle. » + menu « En boucle » | capture 003 ; « Confirmé noir sur blanc » | PERC | Vérification avant suppression, dans la vue d'édition seulement. |
| P4 | T5 | 3 | 7 | 18:59 | Retirer | ERR | 2 | croix « ✕ » en haut à droite du bloc ANIMATION (786, 60) | `click 786 60` → capture 004 : les deux lignes subsistent, indicateur « Enregistré v0 » inchangé ; « cette croix-là ne supprime pas, elle referme le panneau » | — | Intention annoncée : « Je clique sur la croix … pour supprimer la pulsation ». Résultat contraire. Récupérée seule à l'action 9 (croix de la liste). 2 actions perdues ; gravité 2 car « erreur récupérée seul ». |
| P4 | T5 | 3 | 8 | 19:16 | Retirer | FRU | 0 | deux croix de même dessin | « Deux croix identiques pour deux actions opposées, c'est le genre de détail qui fait supprimer une animation par erreur un jour. » | — | |
| P4 | T5 | 3 | 9 | 19:17 | Retirer | REC-S | — | croix « ✕ » au bout de la ligne « Pulsation » de la liste (783, 213) | journal v1 « Retirer le déclencheur » (10:12:57) ; capture 005 : ne reste que « Au chargement · Zoom · +300 ms » | — | |
| P4 | T5 | 3 | 11–12 | 19:36–20:01 | Vérifier | VERIF-E | 0 | rubrique « Effets continus » : « Parallaxe : aucune », « Bandeau : non » | capture 006 ; « "continu" c'est précisément le mot du problème » | PERC | Vérification volontaire d'un second mécanisme possible de mouvement permanent. Comportement fondant la justesse de T5-a. |
| P4 | T5 | 3 | 16 | 20:36 | Lancer | DEC | 0 | menu « Quand » ouvert : « Au chargement / À l'entrée dans l'écran / Au survol / Au clic / Au défilement / À la souris » | capture 008 | — | Il en déduit, hors mission, que sa dernière manœuvre de T2 n'a rien pu changer (« Au chargement est la première ligne, il n'y a rien au-dessus »). Report d'information entre deux missions, sans effet (T2 close). |
| P4 | T5 | 3 | 29 | 22:41 | Régler | VERIF-E | 0 | « IMAGE-CLÉ À 150 MS », Échelle 1.05, résumé « Au survol de "Réserver une table" : … en 150 ms » | capture 011 | PERC | |
| P4 | T5 | 3 | 31–33 | 22:48–23:42 | Vérifier | HES | 2 | canevas de l'éditeur, bouton « Réserver une table » | 3 actions consécutives sans modification (capture, `hover 72 306`, capture) ; captures 012 et 013 montrent le bouton inchangé ; « rien ne me dit ce qui se passe quand la souris quitte le bouton » | **PERC** | Verbalisation d'incertitude + trois actions sans modification. **Limite de lecture** : je ne peux pas établir si la commande `hover` du navigateur de test produit un véritable état de survol dans la page ; la conclusion « le canevas ne joue pas les survols » repose sur cette seule capture. |
| P4 | T5 | 3 | 33 | 23:42 | Vérifier | RATE | 1 | lien « Tester sur le site ⧉ » (capture 011) | « je ne vais pas y passer la journée » | PERC | |
| P4 | T3 | 4 | 6 | 26:39 | Régler | VOC | 1 | menu « Courbe : Doux (sortie) » | capture `p4-t3/003-capture.png` ; « avec une courbe douce en sortie » ; D-FIN-5 « c'est un ease-out … Mais je ne suis sûr de rien » | — | Deviné juste ; aucun effet sur le résultat. |
| P4 | T3 | 4 | 10–11 | 26:59–27:35 | Vérifier | HES | 1 | compteur « 2 880 / 1 200 ms » à droite des boutons de lecture | capture 004 (« INSTANT 2880 MS ») ; « je remarque un truc bizarre, le compteur indique "2880 / 1200 ms", la tête de lecture est partie au-delà de la fin » | — | Anomalie affichée : la tête de lecture est au-delà de la durée après changement de durée. 2 actions (capture + loupe), reprise immédiate. |
| P4 | T3 | 4 | 11 | 27:35 | Vérifier | VERIF-E | 0 | piste « Titre 1 "Le goû… » agrandie : deux losanges aux extrémités | `loupe 700 150` → `005-loupe.png` ; « la loupe est formelle : les deux losanges sont bien aux deux extrémités » | — | Seule loupe de la séance ; seule vérification à l'œil revendiquée (T3-b). |
| P4 | T3 | 4 | 20 | 29:14 | Régler | FRU | 0 | rubrique « Animations lancées par "Réserver une table" », champ « Délai » | « toujours enterré tout en bas, il faut défiler deux fois et déplier deux rubriques pour un simple chiffre » (agacement 2) | — | |
| P4 | T3 | 4 | 27 | 30:12 | Régler | ERR | 2 | ligne « Au chargement · Fondu en montant » de « Voir la carte », dans la rubrique dépliée | `click 676 347` → capture 012 : le bloc ANIMATION est chargé en haut et le panneau est revenu en haut de liste ; « Mon clic a ouvert l'animation en haut du panneau et m'a renvoyé en haut de la liste » | — | Intention annoncée : « Je déplie cette ligne pour atteindre son délai ». Récupérée seule (actions 29–30, 3 actions). « Ça m'a coûté trois manipulations pour rien. » |
| P4 | T3 | 4 | 30 | 30:51 | Régler | REC-S | — | même rubrique, après `scroll 690 400 down 12` | capture 013 : « Quand : Au chargement » et « Délai : 0 ms » | — | |
| P4 | T3 | 4 | 36 | 32:07 | Vérifier | RATE | 1 | lien « Tester sur le site ⧉ » | « je n'ai pas vu le résultat bouger … Je livre sur la foi des chiffres. » | PERC | |
| P4 | T4 | 5 | 8 | 36:33 | Lancer | RATE | 3 | menu de répétition « Une fois », à droite du champ de durée | capture `p4-t4/004-capture.png`, puis 008 et 010 (visible et lisible à chaque capture de la ligne de temps) | — | Le critère C6 (« la scène recommence chaque fois que le visiteur revient ») se règle par ce menu, affiché en permanence. Jamais ouvert. T4-R : « Je n'ai pas touché à ce réglage, je n'ai même pas cherché où il se trouve. » **Cause un critère non rempli → gravité 3.** |
| P4 | T4 | 5 | 16 | 37:38 | Choisir | SAT | 0 | liste de préréglages : « Apparition · Glissé depuis la gauche », « Apparition · Montée avec rebond », familles « Survol », « Continue », « Attention » | capture 006 ; « Bonne liste … voilà mon dépassement pour les chiffres » | — | Adoption des préréglages par un profil qui les qualifie de « gadgets » (fiche persona). Confirmé en D-FIN-2. |
| P4 | T4 | 5 | 25 | 39:06 | Choisir | ERR | 3 | liste de préréglages rendue en surimpression, ancrée sur le champ « Remplir avec » de la piste du titre | `click 700 40` ; annonce « Je choisis "Apparition · Fondu en montant", pour qu'il arrive en s'élevant » ; journal v9 « Remplir la piste · **Fondu** » ; capture 008 : résumé « … Titre 2 "Une cuisine de…" **(fondu)** de 700 à 1 400 ms » | **artefact de rendu, voir PB7** | **Non récupérée** (« je n'ai plus le budget pour revenir dessus »). Cause C5 non rempli pour le titre. Mesure : le champ « Remplir avec » de la photo est à y = 312 (capture 005), celui du titre à y = 328 (capture 007) ; la liste s'ancre par son bas sur le champ, donc décalée de 16 px ≈ une ligne. |
| P4 | T4 | 5 | 34 | 41:34 | Choisir | ERR | 3 | même liste, ancrée sur le champ « Remplir avec » de la piste du paragraphe (y = 353, capture 009) | `click 700 40` ; annonce « Je choisis "Apparition · Fondu" pour qu'il se dévoile simplement » ; **aucune entrée au journal** ; site v15 : piste `HiROplj29sJ4` → `1400ms {}` | **artefact de rendu (PB7) ; HALL ; PERC** | **Non récupérée et non détectée** : aucune capture n'est prise entre les actions 33 et 35. Décalage calculé : 41 px, soit un clic au-dessus de la première ligne de la liste → aucune sélection. **Origine du seul écart matériel du récit.** Sur ce passage, je relève un code **HALL** au sens de 8.2 (« affirme qu'un mouvement a eu lieu sans le présenter comme une supposition », T4-R : « le paragraphe se dévoile à son tour ») ; j'écris mon hésitation : il s'agit d'une affirmation sur un réglage qu'il croit avoir posé, non d'une perception visuelle, et le fait est indépendamment attesté par le journal — la règle A8 ne doit donc pas écarter le constat. |
| P4 | T4 | 5 | 36 | 41:46 | Choisir | ERR | 3 | canevas, espace entre les chiffres « 12 » et « 38 » | `click 355 325` ; annonce « Je désigne le bloc des trois chiffres » ; capture 010 : badge « ◆ Années », cadre autour du seul « 12 », piste nommée « Années » | — | **Non récupérée** (3 actions restantes). Cause C1, C3b et C5 non remplis pour les chiffres. « Rien à l'écran ne me disait, au moment de cliquer, quel niveau j'allais attraper — c'est le même problème qu'avec les cartes de plats » (T4-b). |
| P4 | T4 | 5 | 37 | 42:33 | Choisir | FRU | 0 | — | « Raté : je n'ai pas attrapé le bloc des trois chiffres mais seulement le premier … il ne me reste que trois actions » | — | |
| P4 | T4 | 5 | 40 | 43:13 | — | BUD | 4 | — | « FIN : budget / ACTIONS : 40 » | — | Mode de fin. Statut E. |
| P4 | T4 | 5 | 1–40 | 34:27–43:13 | Composer | PERS | 0 | — | aucune déclaration d'agacement sur 40 actions (règle 6 de 3.2, respectée en T1, T2, T3, T5) | **PERS** | Écart à la consigne d'incarnation. Sans effet sur les mesures comportementales ; prive l'analyse d'un point d'agacement sur la mission la plus coûteuse. |
| P4 | T4 | 5 | — | 44:29 | Vérifier | MM-V | 3 | — | T4-R « Puis, à une seconde quatre, le paragraphe se dévoile à son tour. » contre piste `1400ms {}` (aucune propriété) | HALL, PERC | **Écart matériel** ; unique de la séance. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués « déclaratif » ; codés séparément des comportements (8.4, règle 6).

**SAT (déclaratif)**
- T1-b, étape Découvrir : « Ça m'a plu que le déclencheur par défaut soit déjà le bon, et que "à composer" existe : beaucoup d'outils ne vous proposent qu'une liste d'effets. »
- T2-b, étape Lancer : « cette phrase en français dit exactement ce que fait l'animation, et c'est elle qui m'a donné le diagnostic en une lecture. »
- T5-SEQ, étape Retirer : « Les deux animations de la pastille étaient nommées en clair … j'ai su en trois secondes laquelle supprimer. »
- D-FIN-2, étape Découvrir : « Le modèle. "Un élément lance, un ou plusieurs éléments bougent." … ça se comprend en trente secondes sans lire l'aide. »
- D-FIN-2, étape Choisir : « "Montée avec rebond", c'est mon overshoot, écrit en français, je l'ai reconnu au premier coup d'œil. »
- D-FIN-7, étape Découvrir : « au moment où j'ai cliqué sur "Ajouter" et où une ligne de temps s'est dépliée … je me suis dit : d'accord, ces gens-là ont déjà fait du motion. »

**FRU (déclaratif)**
- T2-SEQ (note 3), étape Lancer : « Ce n'est pas la complexité qui m'a eu, c'est de ne pas trouver un interrupteur que l'outil m'affichait en toutes lettres à trois centimètres de là. »
- T3-SEQ (note 5), étape Régler : « la moitié de mes manipulations ont servi à naviguer, pas à régler … C'est ce genre de friction qui fait qu'un de mes juniors abandonne et me rappelle. »
- T4-SEQ (note 2), étape Composer : « c'est le coût de chaque geste : une piste, c'est quatre réglages dans quatre endroits … Un de mes juniors n'aurait jamais fini. »
- D-FIN-3, étape Lancer : « on ne règle pas le "quand" là où on le lit … Ça m'a coûté dix manipulations et la mission. »
- D-FIN-3, étape Régler : « deux mots pour la même idée, à deux endroits … Rien ne dit lequel sert quand. »
- D-FIN-3, étape Choisir : « on ne sait jamais quel niveau on attrape … À chaque fois il faut aller lire le fil d'Ariane après coup. »
- D-FIN-3, étape Vérifier : « le canevas ne joue rien … J'ai passé deux heures à faire bouger des choses sans jamais voir quoi que ce soit bouger. »
- D-FIN-7, étape Lancer : « Savoir exactement quoi faire et ne pas trouver l'interrupteur, c'est le pire moment qu'on puisse me faire vivre dans un logiciel — je tolère la complexité, pas l'impuissance. »
- D-FIN-7, étape Composer : « Échouer parce que l'outil ne sait pas faire, je l'accepte. Échouer parce que chaque réglage coûte six clics, non. »

**VAL+ (déclaratif)**
- D-FIN-4, étape Régler : « tout ce qui est une entrée simple … c'est même plus direct que dans Webflow parce que je tape mes millisecondes au lieu de tirer des poignées. »
- D-FIN-4, étape Découvrir : « si un client me dit "ça ne bouge pas", je sélectionne l'élément, je lis la phrase de résumé, et j'ai la réponse. C'est le point fort de l'outil. »
- D-FIN-6, étape Découvrir : « Si cet outil tient ses promesses, je les bascule dessus, et mes juniors font les entrées simples eux-mêmes après une demi-journée de prise en main. Ça, c'est de l'argent et du temps. »
- D-FIN-6, étape Découvrir : « la reprise de sites faits par d'autres … j'ai diagnostiqué une animation cassée en lisant une phrase … ça deviendrait un argument commercial à soi seul. »
- D-FIN-2, étape Choisir : « les petits avertissements … Sans cette phrase, je posais un deuxième fondu par-dessus un premier et je livrais une page qui clignote. C'est de l'attention au vrai travail. »

**VAL− (déclaratif)**
- T4-R, étape Composer : « ce que je laisse est une belle moitié de scène … Ce n'est pas livrable en l'état pour une réouverture. »
- D-FIN-4, étape Composer : « Ce que je ne ferais pas : une scène. Pas parce que c'est impossible … mais parce que le coût en manipulations est trop élevé pour ce que je facture sur ces clients-là. »
- D-FIN-4, étape Vérifier : « je ne facturerais pas non plus une animation que je n'ai pas vue tourner. »
- D-FIN-6, étape Composer : « Ce qu'il ne remplacera pas aujourd'hui, c'est moi … Il manque deux choses : de quoi dessiner ma propre courbe, et de quoi manipuler la ligne de temps à la souris. »
- D-FIN-8, étape Composer : « le prix du geste … Tant que je ne peux pas attraper une piste et la décaler, ou étirer sa durée, je ne construirai pas de scène là-dedans. C'est ça, et rien d'autre, qui déciderait. »
- D-FIN-4, étape Découvrir : « je ne laisserais pas un junior seul dessus le premier jour … le "quand" qu'on ne peut pas changer là où il est écrit, le "Départ" qui n'est pas le "Délai", et la croix qui ferme au lieu de supprimer. »
- T3-R, étape Régler (réserve métier, pas sur l'outil) : « deux secondes avant de voir le bouton "Réserver", c'est long pour un site de restaurant. »

**VOC (déclaratif, D-FIN-5)** — mots dont il n'était pas sûr : « image-clé » (compris = keyframe, jugé meilleur que le sien) ; « Courbe » / « Naturel (par défaut) » / « Doux (sortie) » / « Entrée-sortie » (deviné = easing, « "Naturel", ça ne veut rien dire pour moi ») ; « aller-retour » (deviné = yoyo, incompréhension du grisé) ; « Ses enfants, un à un » (reconnu = stagger, piège du niveau) ; **« Décalage »** (« il désigne deux choses complètement différentes dans le même panneau … des pixels et des millisecondes, à quinze pixels d'écart ») ; « Netteté » et « Bandeau » (devinés, jamais ouverts).

---

## 5. Problèmes candidats pour cette séance

Regroupement provisoire selon 11.1 (même endroit d'interface, même étape, même cause apparente). Pour chacun : première réponse au test d'artefact 11.3, questions A1, A2, A6, A8.

### PB1 · Le moment de lancement d'une animation existante ne se règle pas là où il est affiché
**Étape** : Lancer. **Tâche** : T2 (position 2). **Gravité : 4** (échec de la tâche, budget atteint).
**Endroit** : la phrase de résumé sous le champ du nom de l'animation (« Au chargement de la page : les enfants de "Plats" en ensemble (fondu en montant) en 600 ms. », capture 013) ; le menu « Quand » se trouve dans la ligne dépliée de la rubrique repliée « Animations lancées par "Plats" », en bas du panneau (capture 017).
**Lignes** : FP a31–32 ; HES a32 ; RATE a10 et a12 ; chaîne a31–39 (9 actions) ; ERR a40 ; BUD.
- **A1 (perception)** : **Non.** Rien ne tient à la perception du mouvement, à une infobulle absente ni à la résolution : les captures 013 et 014 sont strictement identiques et parfaitement lisibles, et le menu de la capture 017 l'est aussi. → on passe à A2.
- **A2 (connaissance, persona)** : aucun **CONN**. Aucun **PERS** : la règle d'abandon de la fiche (10 actions sans moyen de régler en chiffres) n'a pas été atteinte — la recherche a duré 8 actions. Une propriété de la persona atténue en partie : « jamais les textes d'aide », alors que le texte « Comment lire cet écran » (capture 006) nomme la rubrique. À signaler, sans écarter le problème.
- **A6 (modérateur)** : aucun code MOD dans la tâche → non contaminé.
- **A8 (perception affirmée)** : la conclusion ne repose sur aucun passage HALL.
→ **Statut provisoire : problème d'interface.**

### PB2 · Coût en gestes d'une piste dans une scène
**Étape** : Composer. **Tâches** : T4 (position 5), et en écho T3. **Gravité : 4** (budget atteint, échec de T4).
**Endroit** : pour chaque piste, quatre réglages en quatre emplacements du panneau (« Choisir un élément » puis clic dans le canevas ; champ « Départ » ; menu « Cible » ; menu « Remplir avec ») — captures 005, 007, 009. Aucune manipulation à la souris dans la ligne de temps.
**Lignes** : 40 actions pour 4 pistes dont 2 vides ; T4-SEQ 2 ; FRU a37 ; VAL− D-FIN-8 ; T4-b.
- **A1** : **Non.**
- **A2** : pas de CONN ; **PERS** relevé sur la tâche (pas de point d'agacement) mais sans rapport causal avec le problème → non écarté.
- **A6** : aucun MOD.
- **A8** : pas de HALL.
→ **Statut provisoire : problème d'interface, partiellement amplifié par le dispositif.** La part « nombre de réglages distincts par piste » est attestée par les captures et indépendante du dispositif. La part « budget épuisé » l'est moins : chaque capture coûte 1 action au participant, ce qu'un utilisateur réel ne paie pas. Mention obligatoire « à confirmer avec des utilisateurs réels ».

### PB3 · Le niveau d'élément attrapé par un clic n'est annoncé qu'après le clic ; « ses enfants » change de sens selon le niveau
**Étape** : Choisir. **Tâches** : T2 (a15, a17–21), T4 (a36). **Gravité : 3.**
**Endroit** : canevas (aucun retour avant le clic) ; fil d'Ariane du panneau, lisible après coup (« Page > À la carte > Contenu > Plats > Carte plat », capture 004 ; « ◆ Années », capture 010) ; menu « Cible » à deux entrées (capture 009).
**Lignes** : VOC a18 (g2) ; ERR a36 (g3) ; contribution à FP1.
- **A1** : **Non** — pas une question de perception du mouvement ; l'information manquante est temporelle (avant le clic), pas visuelle.
- **A2** : pas de CONN ; pas de PERS.
- **A6** : aucun MOD.
- **A8** : pas de HALL.
→ **Statut provisoire : problème d'interface.** **Réserve à porter au rapport** : les clics sont faits par coordonnées sur une capture de 800 × 500 pour un écran de 1 440 × 900, et le participant ne perçoit aucun survol continu de pré-sélection ; à confirmer avec des utilisateurs réels.

### PB4 · Deux mots pour retarder : « Départ » (piste) et « Délai » (déclencheur), à deux endroits
**Étape** : Régler / Composer. **Tâches** : T3 (« Délai », a21, a31) et T4 (« Départ », a21, a30, a38). **Gravité : 1.**
**Lignes** : T4-a, D-FIN-3, D-FIN-10 — **aucune erreur observée** : il emploie le bon champ dans chaque contexte.
- **A1** : Non. **A2** : rien. **A6** : rien. **A8** : rien.
→ **Statut provisoire : problème d'interface, mais essentiellement déclaratif chez P4** — la condition 1 de 11.2 (« observé dans le comportement ») n'est pas remplie pour cette séance. **Candidat "signal faible"**, à confronter aux autres séances.

### PB5 · Le champ « Délai » est à deux replis et deux défilements ; déplier une autre ligne recharge le panneau et renvoie en haut
**Étape** : Régler. **Tâches** : T3 (a16–20, a27–30), T2 (a33–38). **Gravité : 3.**
**Endroit** : rubrique repliée « Animations lancées par "…" » en bas du panneau ; ligne à déplier à l'intérieur ; champ « Délai » (captures 009 T3, 012 T3, 017 T2).
**Lignes** : ERR a27 (g2, récupérée) ; 6 actions de navigation en T3 ; 6 actions en T2.
- **A1** : Non. **A2** : rien. **A6** : rien. **A8** : rien. **A7 (ordre)** : T3 en position 4 chez P4, avec apprentissage de T2 → le coût mesuré est un plancher ; mention « possible effet d'ordre » en sens inverse (le problème serait plus coûteux en position précoce).
→ **Statut provisoire : problème d'interface.**

### PB6 · Deux croix de même dessin : l'une referme le bloc, l'autre supprime l'animation
**Étape** : Retirer. **Tâche** : T5 (a7–a9). **Gravité : 2** (ERR récupérée seule, 2 actions).
**Endroit** : croix en haut à droite du bloc ANIMATION (capture 003, 786×60) ; croix au bout de chaque ligne de la liste « Animations lancées par… » (capture 004, 778×187 et 778×213).
- **A1** : **Non** — les deux croix sont lisibles ; le défaut est l'identité de forme pour deux effets opposés, attestée par les deux captures. **Nuance** : le participant dit la croix de suppression « juste au-dessus » alors qu'elle est en dessous dans l'état de la capture 004 ; sa description spatiale est imprécise, le fait ne l'est pas.
- **A2 / A6 / A8** : rien.
→ **Statut provisoire : problème d'interface.**

### PB7 · La liste de préréglages, rendue en surimpression, s'ancre sur le champ qui l'ouvre
**Étape** : Choisir. **Tâche** : T4 (a25, a34). **Gravité observée : 3** (deux critères non remplis, et l'unique écart matériel du récit).
**Endroit** : liste de 21 lignes d'environ 15 px dans la capture (« un préréglage… » + 20 entrées réparties en « Apparition », « Survol », « Continue », « Attention »), affichée par-dessus la page et la barre du haut (capture 006).
**Fait mesuré** : la liste s'ancre par son bas sur le champ « Remplir avec ». Photo : champ à y = 312 (capture 005) → « Glissé depuis la gauche » à y = 85, clic juste. Titre : champ à y = 328 (capture 007) → liste décalée de 16 px ≈ une ligne, `click 700 40` donne « Fondu » au lieu de « Fondu en montant » (journal v9, capture 008). Paragraphe : champ à y = 353 (capture 009) → décalage de 41 px, `click 700 40` tombe **au-dessus** de la liste, aucune sélection (aucune entrée au journal).
- **A1 (perception)** : **Oui, en partie.** Le problème disparaîtrait si le participant avait repris une capture du menu ouvert avant de cliquer (1 action), ou vu l'écran à pleine résolution. Et l'interface offre par ailleurs une autre représentation visible qu'il n'a pas utilisée : la phrase de résumé dit « (fondu) » (capture 008) — il la lit et constate l'erreur sur le titre, mais ne refait pas le contrôle pour le paragraphe. → **artefact probable**, non retenu, à lister en signal faible.
- **Addendum 3, point 2** : les listes déroulantes de la copie de test sont **rendues dans la page par une adaptation du dispositif** ; leur placement et leur taille ne sont pas ceux de l'éditeur livré. La géométrie ci-dessus explique intégralement les deux erreurs. **La part d'artefact est donc dominante.**
- **A2** : pas de CONN ; pas de PERS (aller vite et ne pas vérifier est conforme à la fiche).
- **A6** : aucun MOD. **A8** : le passage porte un code HALL (voir lignes de codage), mais le fait est établi par le journal, pas par la parole du participant.
→ **Statut provisoire : artefact du dispositif (probable).** Seule part potentiellement imputable à l'interface : la densité de la liste (20 entrées sans séparation forte entre familles) — **à confirmer avec des utilisateurs réels, sur l'éditeur livré**. C'est le point de cette séance où je recommande le plus de prudence.

### PB8 · Aucune vérification en conditions de visiteur n'a lieu de toute la séance ; le canevas ne restitue ni le survol ni la répétition
**Étape** : Vérifier. **Tâches** : les cinq. **Gravité : 3** (contribue à l'écart matériel de T4 et laisse la dernière manœuvre de T2 non contrôlée).
**Lignes** : RATE « Tester sur le site » en T1, T2, T3, T5 ; HES a31–33 en T5 ; capture 013 (survol sans effet) ; T2-b, T3-b, D-FIN-3, D-FIN-9.
- **A1 (perception)** : **Oui.** Le problème disparaîtrait si le participant voyait le mouvement en continu. **Et** l'interface offre une autre représentation visible qu'il n'a pas utilisée : le lien « Tester sur le site », lisible sur presque toutes les captures, et la phrase de résumé. → **artefact probable, non retenu, listé en signal faible.**
- **A2** : **PERS non**, mais la fiche persona prescrit précisément ce comportement (« Va vite et vérifie peu en conditions de visiteur — "je sais ce que ça va faire" »). Le non-recours à la vue visiteur est donc une propriété de la persona autant qu'un fait d'interface.
- **A6 / A8** : rien. **Limite** : je ne peux pas établir si la commande `hover` produit un véritable état de survol dans la page ; par ailleurs les captures 007 et 008 de T4 montrent que le canevas **restitue bien l'état des images-clés à la position de la tête de lecture** (le titre disparaît quand la tête est à 0 ms) — l'affirmation générale « le canevas ne joue rien » est donc plus large que ce que les captures attestent.
→ **Statut provisoire : signal faible / à confirmer avec des utilisateurs réels.**

### PB9 · Rien n'indique, en sélectionnant un élément, qu'une animation d'un ancêtre le fait bouger
**Étape** : Découvrir. **Tâche** : T2. **Gravité : 4** (origine de FP1, 14 actions perdues, chaîne menant au budget).
**Endroit** : rubrique « Animations lancées par Carte plat », **vide** alors que la carte bouge (capture 004) ; l'information n'apparaît qu'après avoir posé une piste sur le parent (avertissement, capture 010).
- **A1** : Non. **A2** : rien. **A6** : rien. **A8** : rien.
→ **Statut provisoire : problème d'interface.** Contrepoint à porter au rapport : l'avertissement de l'action 22 est cité deux fois par le participant comme un point fort (« C'est de l'attention au vrai travail »).

### PB10 · Absence d'aimantation de la tête de lecture sur la fin et les graduations
**Étape** : Régler. **Tâche** : T1 (a24). **Gravité : 2.**
- **A1** : **Non** — le compteur « 590 / 600 ms » est lisible (capture 009) et l'interface offre le champ « Temps » pour rattraper, que le participant utilise. **A2 / A6 / A8** : rien.
→ **Statut provisoire : problème d'interface, mineur.**

### PB11 · Compteur de tête de lecture au-delà de la durée après changement de durée
**Étape** : Régler. **Tâche** : T3 (a10). **Gravité : 1** (1 vérification à la loupe).
**Endroit** : « 2 880 / 1 200 ms » à droite des boutons de lecture, « INSTANT 2880 MS » (capture 004).
- **A1** : Non (lisible). **A2 / A6 / A8** : rien.
→ **Statut provisoire : problème d'interface, mineur.** Je n'ai pas d'explication depuis la trace : la tête de lecture n'a jamais été déplacée en T3.

### PB12 · « Décalage » désigne deux choses dans le même panneau (pixels et millisecondes)
**Étape** : Régler / Composer. **Tâches** : T2 (capture 013 : « Décalage : aucun ms » pour l'échelonnement ; capture 013 : « Décalage 0 / 8 » en pixels dans « Mouvement »). **Gravité : 1.**
**Lignes** : uniquement déclaratives (D-FIN-5, D-FIN-10) ; **aucune erreur observée**.
- **A1 / A2 / A6 / A8** : rien.
→ **Signal faible** (condition 1 de 11.2 non remplie chez P4) — mais les deux sens sont co-visibles sur la capture 013, ce qui rend le constat vérifiable indépendamment de la parole.

### PB13 · Pas de réglage visible de la sortie de survol ni du seuil de déclenchement à l'entrée dans l'écran
**Étape** : Lancer / Régler. **Tâches** : T5 (T5-b), T1 (T1-R). **Gravité : 1** (aucune conséquence sur les statuts ; S3 est rempli).
**Lignes** : HES a31–33 T5 ; case « aller-retour » grisée (captures 004 T1, 011 T5) ; T1-R « je ne sais pas à quel moment exact ça se déclenche ».
- **A1** : **Oui, en partie** pour la sortie de survol (il ne peut pas la constater) ; **Non** pour le seuil (aucun libellé de seuil n'apparaît sur aucune capture examinée). **A2** : rien.
→ **Signal faible pour la sortie de survol ; problème d'interface candidat pour l'absence de seuil**, à confronter aux autres séances.

---

## 6. Écarts au protocole et au dispositif

**MOD — écart du modérateur : aucun relevé.** J'ai comparé chaque « MESSAGE REÇU » au script 4.3 : accueil A–C, questions D-1 à D-5, transitions E (première tâche et suivantes), phrases de fin de tâche (40e action : « Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. » en T2 et T4), enchaînement G (« Merci. J'ai quelques questions sur cette mission. »), questions T*-SEQ, T*-R, T*-a, T*-b de la section 5, transition H, questions D-FIN-1 à D-FIN-10, clôture I. Aucune parole hors répertoire, aucun commentaire d'action, aucune relance non prévue, aucune aide (aucune n'était due : le participant n'a jamais déclaré de blocage).

**HORS — actions hors répertoire : 2.**
1. **T1, action 10** : `b.mjs triple 768 472`, rejetée (« action inconnue : triple »). Signalée dans l'en-tête de la trace. Coût : 1 action, comptée par le participant. Écart de dispositif, sans effet sur l'état du site.
2. **Après la clôture (48:45)** : le participant sort de son rôle et écrit un « Rapport de séance — participant P4 », destiné à l'agent qui l'a lancé. Ce passage est **hors séance**. Conformément à la consigne reçue, je le code comme écart et **je n'en tire aucun fait**. J'ai vérifié chacun de ses dix points contre la fiche de lecture et les captures : ce sont des reformulations de ses paroles de séance, sans élément nouveau, et son point 1 (« Coût constaté : ~10 actions et l'échec de M2 ») coïncide avec ma mesure (9 actions, 31–39). Aucune conclusion de ce rapport n'est reprise dans les sections 3 à 5 ci-dessus.

**PERS — écart à la persona : 1.** T4, 40 actions sans aucune déclaration d'agacement, alors que la règle 6 de 3.2 (« toutes les 10 actions ») est respectée en T1 (a9, a19, a29), T2 (a10, a19, a32), T5 (a10, a19) et T3 (a10, a20). Gravité 0 ; prive l'analyse du point d'agacement de la mission la plus coûteuse. Par ailleurs, aucun « Je suis bloqué » de toute la séance : conforme aux seuils de la fiche (jamais atteints), donc **non** un écart.

**CONN — connaissance hors persona : aucune relevée.** Tous les termes anglais employés (stagger, overshoot, yoyo, ease-out, scroll into view, page load, hover) figurent dans sa liste « vocabulaire connu ». Sa règle « hésiter une fois à voix haute avant de deviner » face à un terme français est appliquée (« aller-retour — leur yoyo, j'imagine » ; « Courbe … leur easing »). Deux passages que j'ai examinés et **écartés** comme CONN : (a) T2 a30, le diagnostic tiré d'une seule phrase de résumé — inférence de métier documentée dans sa fiche (Webflow, « page load ») ; (b) T5 a16, la déduction rétrospective sur T2 — attestée par la capture 008, non par une connaissance externe. **À noter** : cette déduction constitue un report d'information entre deux missions supposées indépendantes ; elle est restée sans effet (T2 était close).

**PERC — limites perceptives : nombreuses et structurantes.** T1-R (« je n'ai vu que les chiffres, donc je suppose ») ; T2-b (« je ne vois l'écran que par photos fixes, donc un mouvement de six dixièmes de seconde, je ne l'aurais pas attrapé ») ; T3-b (« Je n'ai rien vu bouger de toute la mission ») ; T5 a32–33 (survol sans effet constatable) ; D-FIN-10 (« travailler par photos fixes pour juger du mouvement, c'est un exercice un peu cruel »). Ces codes portent sur la plupart des passages de gravité ≥ 2 de l'étape Vérifier, et fondent le classement de PB8 en artefact probable.

**HALL — perception non attestée : 1 passage.** T4-R, « le paragraphe se dévoile à son tour », pour une piste vide. J'écris mon hésitation : la définition de 8.2 couvre l'affirmation d'un mouvement non présentée comme une supposition, mais il s'agit ici d'une affirmation sur un **réglage qu'il croit avoir posé** (action 34, non contrôlée par capture), non d'une perception visuelle. Le fait est établi par le journal et par la capture 009, indépendamment de sa parole : la règle A8 ne doit donc pas conduire à écarter le constat PB7, qui ne repose pas sur ce passage.

**Adaptations du dispositif ayant pesé sur le codage (addendum 3).**
- **Point 2 — listes déroulantes rendues dans la page** : effet direct et mesurable en T4 (PB7), et présent dans toutes les captures de menu (T2-009, T5-008, T4-006). Placement et taille non représentatifs de l'éditeur livré. **C'est la limite la plus lourde de cette séance.**
- **Point 11 — capture simple, loupe = vrai agrandissement** : confirmé (`005-loupe.png` de T3 est un agrandissement net). Aucun retard d'image observé.
- **Point 11 — onglet simulé pour les pages « dans un nouvel onglet »** : non sollicité, le participant n'a jamais cliqué « Tester sur le site ».
- **Point 5 — reprise après aide, aides graduées** : sans objet (aucune aide).
- Les incidents des points 8, 12 et 13 concernent P3, P5 et l'observateur de P1 : **aucun n'affecte la séance de P4**.

**Limites de ma propre lecture.**
1. Je n'ai pas pu établir si la commande `key ArrowUp Enter` (T2, action 40) envoie effectivement deux touches ; une explication suffisante existe sans le dispositif (capture T5-008), mais l'incertitude demeure.
2. Je n'ai pas pu établir si la commande `hover` produit un véritable état de survol dans la page ; la conclusion « le canevas ne joue pas les survols » repose sur la seule capture T5-013.
3. Je n'ai ouvert que 28 des 65 captures de la séance, choisies sur les passages de gravité ≥ 2 ; une erreur non repérée dans les 37 autres reste possible.
4. Les temps horodatés de la trace (48:45 de séance) et ceux du journal du site (09:55 → 10:36 UTC) ne sont pas dans la même échelle ; je les ai croisés par l'ordre des versions, pas par l'heure.
5. Le mode de fin « budget » de T2 et T4 est un artefact de protocole (limite de 40 actions) autant qu'un résultat : les deux statuts E doivent être lus avec cette réserve, d'autant que chaque capture coûte une action.
6. Les cotations de concordance « Combien » en T2, T3 et T5 reposent sur un point de règle mécanique (le nombre de fois non énoncé vaut « un seul des deux exact ») qui pénalise des récits par ailleurs très exacts ; je le signale pour l'arbitrage éventuel en double codage.
