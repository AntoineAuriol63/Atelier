# Observation · P4 (Julien, designer motion) · vague 5 · T4 en position 1

Sources lues : protocole observateur (sections 3, 4.3, 4.4, 5, 8, 9, 11), addendum 5, trace-p4.md, les 19 captures de `shots5/p4-t4/` (aucune loupe n'existe : le participant n'en a pas fait), `log.jsonl`, fiche-lecture-p4.md. La trace ne contient aucune ligne 🧠 : toute la pensée à voix haute est écrite (💬), il n'y a donc pas d'incertitude de restitution à signaler sur ce point.

Correspondance des numérotations : le compte du participant « [n] » correspond à l'appel d'outil #(n+1) jusqu'à [37] = #55 ; le participant saute ensuite le numéro [38] ([39] = #57, [40] = #58). Les horodatages relatifs de la trace (mm:ss) et ceux du journal (UTC) coïncident à la seconde près (par exemple [10] #16 à 02:26 ↔ v1 à 09:20:21 UTC).

---

## 1. Résumé de la séance

P4 passe la seule mission de la vague, T4, en première position, sans aucune aide et sans jamais se déclarer bloqué. En 9 actions il sélectionne la section « La maison » (après un clic tombé sur la photo, corrigé par le fil d'Ariane), trouve « Quand : À l'entrée dans l'écran » et crée une animation par « + Ajouter ». Il obtient alors un panneau avec une règle de temps, un champ « 1000 ms », une case « à chaque passage » et une liste « Éléments de la scène (10) » comprenant « Chiffres · 3 éléments » et « les 3 un à un ». Il ajoute quatre pistes (photo, titre, paragraphe, « les 3 un à un » sur les chiffres), remplit les deux premières avec un préréglage (« Glissé depuis la gauche », « Fondu en montant »), coche « à chaque passage », et crée par erreur puis retire une piste sur la section entière. Le budget est atteint (39 actions réelles, 40 dans son compte) avant qu'il ait décalé un seul départ, changé la durée, rempli le paragraphe ou donné un rebond aux chiffres : le site enregistré fait bouger la photo et le titre ensemble en 700 ms, à chaque passage, le reste est immobile. Statut : échec, budget. Son récit du visiteur est exactement conforme au site (8/8), il attribue l'échec à la mise en page du panneau qui se décale à chaque piste ajoutée, et juge le modèle « juste » (SEQ 4).

---

## 2. La tâche T4 (position 1)

### Statut (9.1) et accord avec le préparateur

Lecture du site final (fiche) contre les critères de la section 5 :

| Critère | Lecture | Rempli |
|---|---|---|
| C1 tous bougent | photo (opacité 0, translateX −40 px → normal) et titre (opacité 0, translateY 28 px → normal) portent une arrivée visible ; paragraphe et « Chiffres » : image-clé à 0 ms vide, aucune image d'arrivée ; visite du préparateur : « paragraphe et chiffres immobiles » | non (2 sur 6) |
| C2 un seul événement | un seul déclencheur `on=inView` sur `rh_about` (la section), une seule animation à quatre pistes | oui |
| C3 ordre principal | les quatre pistes ont Départ 0 ms ; paragraphe et chiffres ne bougent pas | non |
| C3b chiffres échelonnés | piste « Chiffres » (enfants) avec `stagger each 100` mais sans image-clé : aucun mouvement, donc aucun départ distinct observable | non |
| C4 minutage | fin du dernier mouvement à 700 ms (site), 880 ms mesurés par la visite ; en tout cas < 1 800 ms | non |
| C5 manières | photo : décalage horizontal 40 px ≥ 16 ✓ ; titre : vers le bas 28 px ≥ 8 ✓ ; paragraphe : aucun mouvement ✗ ; chiffres : aucune courbe à dépassement ✗ | partiel (2 sur 4) |
| C6 répétition | `once=false`, résumé de l'outil « à chaque passage » | oui |

C1 et C3 non remplis → **Échec (E)**. Profil : C2 ✓, C6 ✓, C5 partiel (photo, titre), C1 ✗, C3 ✗, C3b ✗, C4 ✗. **Accord avec le statut proposé par le préparateur (E, BUD)**, pour la même raison.

### Mode de fin, aides

- Mode de fin : **BUD** (budget atteint). Le modérateur a arrêté la mission à 09:02 après l'annonce « ACTIONS : 40 » ; le compte réel des actions du dispositif est de 39 (voir métriques et section 6).
- Aides : **aucune** (ni BLOC, ni AIDE-1/2/3). Le participant n'a jamais dit être bloqué.

### Métriques (9.2)

| Métrique | Valeur |
|---|---|
| Actions totales (compte du participant) | 40 annoncées, avec un saut de [37] à [39] : 39 numéros réellement attribués |
| Actions totales (dispositif, log.jsonl) | 39 : 17 clics, 3 défilements, 19 captures |
| Appels d'outils de la tâche | 58 (#2 à #59), dont 19 ouvertures d'image (👁, non comptées) |
| Actions perdues à cause des défauts du dispositif | 0 action perdue par défaut technique (toutes les captures sont rendues, les listes déroulantes sont visibles dans la page : captures 011 et 016). 1 action de budget non consommée par l'erreur de compte du participant (arrêt à 39 actions réelles). |
| Première action pertinente | [6] (#10, 01:49) : la capture 004 qui suit montre « Animer « Photo de la salle » » et « Lancer une animation depuis « Photo de la salle » », la photo étant un élément visé |
| Actions jusqu'à la réussite | non atteint |
| Temps | consigne à 00:58, dernière parole de la mission à 08:05 ; actions horodatées de 09:18:59 à 09:25:43 UTC (6 min 44 s) ; secondaire |
| Captures / loupes | 19 / 0 |
| FP / actions perdues en FP | 0 / 0 |
| HES | 3 (une de gravité 2 : [14]–[19] ; deux de gravité 1 : [31], [37]) |
| ERR / non récupérées | 2 / 0 |
| COLL-D / COLL-ND | 1 (piste vide « La maison » sur la section, v4, remarquée et retirée v5 ; aucun mouvement effectif) / 0 |
| RATE | 2 (champ « Départ » de la piste, champ « 1000 ms » de l'animation ; voir réserve dans les lignes) |
| Aides (niveau max / nombre) | aucune / 0 |
| VERIF / VERIF-E, rang de la première | VERIF : aucune (le bouton « Tester sur le site » est visible dès la capture 006 et n'est jamais utilisé) ; VERIF-E : oui, première à [24] (#36, 05:05, lecture de la phrase de résumé) |
| Mots VOC | aucun |
| SEQ | 4 |

### Concordance du récit T4-R (9.4)

Comparé au site enregistré (photo et titre : à l'entrée de la section, ensemble, 700 ms, glissé depuis la gauche / fondu en montant, à chaque passage ; paragraphe et chiffres immobiles).

| Dimension | Score | Phrase du récit | Fait du site |
|---|---|---|---|
| Quoi | 2 | « la photo de la salle glisse depuis la gauche […] et le titre « Une cuisine de produits » apparaît en montant » ; « Le paragraphe et les trois chiffres, eux, ne bougent pas du tout. » | pistes photo et titre remplies ; pistes paragraphe et Chiffres sans image-clé (confirmé par la visite) |
| Quand | 2 | « la section « La maison » entre dans l'écran, et deux choses partent en même temps » | déclencheur inView sur la section ; Départ 0 ms sur les deux pistes |
| Comment | 2 | « glisse depuis la gauche en 700 ms » ; « apparaît en montant » | translateX(−40px)→none ; translateY(28px)→none, opacité 0→1 |
| Combien | 2 | « en 700 ms » ; « j'ai coché « à chaque passage », donc s'il remonte et redescend, ça se rejouera » | 700 ms (880 mesurés à la visite, dans ± 50 %) ; once=false |

**Total : 8/8. Écart matériel : non.** Il précise lui-même ne pas avoir vérifié en conditions de visiteur. Case de la matrice réussite × compréhension : **échec lucide**.

### Mesures propres (section 5)

- Profil de critères : C2, C6 remplis ; C5 partiel (photo, titre) ; C1, C3, C3b, C4 non remplis.
- Structure de lancement : **un seul événement** (un déclencheur « À l'entrée dans l'écran » sur la section, une animation « Animation · La maison » à quatre pistes). Aucun lancement séparé.
- T4-a : **cohérente avec la structure enregistrée** (« je clique sur la piste « Paragraphe » dans la ligne de temps, et en dessous j'ai un bloc « PISTE · … » avec un champ « Départ » en millisecondes ») ; il ajoute que la piste est vide et qu'il faudrait d'abord lui donner un mouvement, ce qui est exact. Pas de MM.
- T4-b (déclaratif) : le repérage à l'écran (résumé qui grandit, colonne étroite, boutons « Ajouter » identiques).

### Fonctions du lot 8 : trouvées ou non (d'après les captures seulement)

- Liste « Éléments de la scène (10) » : **vue et utilisée** (capture 006 ; pistes ajoutées à [12], [30], [36], [39]).
- « les 3 un à un » à droite de « Chiffres · 3 éléments » : **vu à [11]** (capture 006) et **utilisé à [39]** (journal v10 « Ajouter une piste · les enfants de Chiffres »).
- Champs de durée en ms : **vus** (« 1000 ms » en 006 ; « Délai 0 ms » ; « Départ 0 ms » en 007 ; « Temps 0 ms » en 010), **jamais modifiés**.
- Phrase de résumé en haut du panneau (« Quand « La maison » entre dans l'écran : … ») : **lue et utilisée** comme retour d'état à [24], [35], [40] ; la mention « n'a pas encore d'images-clés » est lue à [40].
- Champ « Ses voisins » sur un chiffre : **n'apparaît sur aucune capture** (aucun chiffre n'a été sélectionné).
- Lien « Voir la scène de « La maison » » : **n'apparaît sur aucune capture** ; le participant est arrivé au panneau de composition de la section directement par « + Ajouter » sur la section (capture 005 → 006).
- « Pareil pour … » : **n'apparaît sur aucune capture**.
- Avertissements « part avant », « lancements séparés » : **n'apparaissent sur aucune capture** (les seuls textes de la phrase de résumé vus sont « rien ne bouge encore », « une seule fois », « à chaque passage », « n'a pas encore d'images-clés »).
- Bouton « Tester sur le site » : visible dès 006, jamais utilisé ; le participant le nomme après coup (T4-R).

---

## 3. Lignes de codage (format 8.5)

Séance P4, tâche T4, position 1 sur toutes les lignes. « N° action » = compte du participant [n] puis appel d'outil #. Horodatage = temps de la trace (UTC du journal quand une entrée existe).

| N° action | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|
| [1] #2 | 01:12 | Découvrir | SAT | — | barre du haut : « Écriture, Design, Animation, Code » (capture 001) | « Il y a un mode Animation dédié, bon point. » | — | spontané pendant la tâche |
| [2] #4 | 01:14–01:29 | Découvrir | MM | 0 | onglet « Animation » ; panneau de droite avec « Comment ça marche », « Lancer une animation depuis la page », « Animations du site » (capture 002) | « je m'attends à trouver une timeline » | — | attente contredite par 002 (pas de ligne de temps à ce niveau) ; aucun coût, il descend vers la section. Gravité 0. |
| [6] #10 | 01:49 (09:19:45) | Lancer | ERR | 1 | canevas : la photo de la section La maison (clic à 200,300 sur la capture 003) | « Je clique dans un espace vide de la section pour sélectionner la section entière » ; capture 004 : fil d'Ariane « Page › La maison › Contenu › Photo de la salle » | — | le point cliqué est sur la photo, pas dans un vide ; résultat contraire à l'intention annoncée. Récupéré seul en 2 actions. |
| [8] #13 | 02:10 | Lancer | REC-S | — | fil d'Ariane en haut du panneau, entrée « La maison » (capture 004) | capture 005 : « Page › La maison », « Lancer une animation depuis « La maison » » | — | — |
| [9] #14 | 02:25 | Lancer | SAT | — | « Quand : À l'entrée dans l'écran », « Animation : Nouvelle animation (à composer) » (capture 005) | « C'est exactement mon déclencheur. » | — | déclencheur trouvé en 9 actions sans aide ; agacement 2 déclaré |
| [10] #16 | 02:26 (09:20:21) | Lancer | — | — | bouton « + Ajouter » (capture 005) | journal v1 « Nouvelle animation » [node.set rh_about:triggers] | — | jalon : déclencheur posé sur la section (C2) ; aucun code d'événement |
| [11] #17 | 02:50 | Composer | SAT | — | panneau « ANIMATION Animation · La maison », règle 0–1000, boutons de lecture, « Éléments de la scène (10) » (capture 006) | « Là on parle. C'est une composition, pas un gadget. » | — | — |
| [11] #17 | 02:50 | Composer | DEC | — | ligne « Chiffres · 3 éléments  + Ajouter  les 3 un à un » dans la liste (capture 006) | « et même « Chiffres · 3 éléments » avec « les 3 un à un » » | — | repéré sans le chercher, utilisé à [39] |
| [11] #17 | 02:50 | Régler | RATE | 2 | champ « 1000 ms » à gauche de « Une fois », sous « Rejouer » (capture 006, visible sur toutes les captures suivantes) | « un champ 1 000 ms » ; site final : `duration=1000` | — | accès vu, nommé, jamais utilisé ; C4 non rempli. Hésitation : ce n'est pas une méconnaissance mais un ordre de travail (poser toutes les pistes, régler ensuite) ; gravité 2 et non 3 parce que la cause directe du critère manquant est l'épuisement du budget. |
| [13] #20 | 03:04 | Régler | SAT | — | bloc « PISTE · PHOTO DE LA SALLE », « Départ 0 ms », « Cible » (capture 007) | « Des champs numériques, parfait. » | — | — |
| [13] #20 | 03:04 | Régler | RATE | 2 | champ « Départ » du bloc de piste (captures 007, 010, 012, 013) | site final : les quatre pistes à 0 ms | — | même réserve que la ligne RATE précédente ; C3 non rempli. Le participant dit à [35] « il faudra que je décale les départs » : accès connu, remis à plus tard. |
| [14]–[19] #22–#29 | 03:06–03:47 | Régler | HES | 2 | bas de la colonne de droite, sous la liste dépliée : bande d'environ 75 px sur 500 (captures 008, 009) ; le haut du panneau (résumé, réglages, règle, liste) ne défile pas | « J'ai sauté un bout, je remonte un peu. » ; « il me reste trois centimètres en bas pour les réglages de piste. Je replie la liste. » | — | 6 actions (2 défilements, 3 captures, 1 clic de repli) avant que les réglages de piste soient lisibles (capture 010). Hésitation HES/exploration : chaque défilement révèle du contenu nouveau, mais la verbalisation dit une incertitude sur la position. Cause visible dans les captures : la zone de réglages est la seule qui défile. |
| [17] #26 | 03:36 | Régler | FRU | — | idem | « Le panneau est terriblement à l'étroit » | — | spontané |
| [19] #29 | 04:01 | Régler | — | — | « Remplir avec : un préréglage… », « IMAGE-CLÉ À 0 MS », « Temps 0 ms », « Mouvement », « Opacité » (capture 010) | « Donc j'ai bien des images-clés posées dans le temps. » | PERS | lecture juste ; « image-clé » figure dans le vocabulaire inconnu de la fiche (connu en anglais seulement) et le participant ne marque pas l'hésitation prévue par sa règle. Pas de VOC : le mot est compris. |
| [20] #31 | 04:03 | Choisir | — | — | liste « Remplir avec » (capture 010 → 011) | « normalement c'est un préréglage qui me pose les deux clés, je les corrigerai après » | PERS | le mot « préréglage » est lu (capture 010) : pas de CONN. Écart à la manière d'explorer de la fiche (« ignore les choix tout prêts ») assumé et motivé ; voir section 6. |
| [21] #32 | 04:20 | Choisir | DEC | — | entrée « Apparition · Montée avec rebond » dans la liste « Remplir avec » (capture 011) | « Je note « Montée avec rebond », ce sera mon overshoot pour les chiffres. » | — | jamais appliqué avant la fin du budget |
| [22] #34 | 04:22 (09:22:18) | Choisir | — | — | entrée « Apparition · Glissé depuis la gauche » (y = 417 en capture 011) | journal v3 « Remplir la piste · Glissé depuis la gauche » | — | jalon : photo remplie (C5 photo) ; pas de capture entre #34 et #35 |
| [23] #35 | 04:32 (09:22:27) | Composer | ERR + COLL-D | 2 | ligne « + Ajouter « La maison » » située juste au-dessus de « Éléments de la scène (10) » ; résultat : bloc « PISTE · LA MAISON » et ligne « La maison » sur la règle (capture 012) | journal v4 « Ajouter une piste · La maison » ; « Aïe. Mon clic n'a pas replié la liste : il a créé une piste « La maison » » | PERC | clic à (566,287) sans nouvelle capture : en 010 cette ordonnée portait le triangle de la liste ; après v3 la phrase de résumé est passée de 1 ligne (« rien ne bouge encore », 010) à 2 lignes (013) et a poussé la liste d'un cran. L'état intermédiaire n'a pas de capture : l'explication « passée sur deux lignes » est une inférence du participant, cohérente avec 010 → 013. Coût : 5 actions ([23], [24], [25], [26], [28]). COLL-D au sens large : piste sans image-clé sur la section (non visée), remarquée et retirée. Origine : problème PC1 (et PC3 : les deux « Ajouter » ont la même forme). |
| [24] #36 | 05:05 | Composer | FRU | — | idem | « Ça, c'est pénible. » | PERC | spontané |
| [24] #36 | 05:05 | Vérifier | VERIF-E | — | phrase de résumé en haut du panneau (capture 012 : « « Photo de la salle » (glissé depuis la gauche) en 700 ms, une seule fois ») | « la phrase me confirme : « Photo de la salle » glissé depuis la gauche en 700 ms » | — | première vérification, dans l'éditeur seulement. Il explique aussi la disparition de la photo du canevas par la tête de lecture à 0 (capture 012 : zone de la photo vide) : lecture correcte, pas HALL. |
| [25] #38 | 05:08 (09:23:03) | Composer | REC-S | — | corbeille en haut à droite du bloc « PISTE · LA MAISON » (capture 012 ; infobulle « Retirer la piste » en 013) | journal v5 « Retirer la piste » | — | la piste parasite disparaît de la règle (capture 013) |
| [27] #41 | 05:36 (09:23:31) | Lancer | — | — | case « à chaque passage » sous « Rejouer » (décochée en 013, cochée en 014) | journal v6 « Rejouer » ; « Au passage, la case « Rejouer : à chaque passage » est décochée, et la cliente veut que ça rejoue » | — | jalon : C6 rempli ; libellé compris sans hésitation |
| [28] #42 | 05:42 | Composer | — | — | triangle « ▸ Éléments de la scène (10) » (y = 296 en 013) | « Je rouvre la liste des éléments pour ajouter les trois pistes suivantes. » | — | coût du repli/dépli imposé par le manque de hauteur (PC2) ; deuxième clic enchaîné sans capture, cette fois réussi (014) |
| [31] #46 | 06:13–06:34 | Composer | HES | 1 | liste « Éléments de la scène » (capture 014 → 015 : la ligne « Contenu » passe de y = 308 à 334) | « Je vérifie que la liste n'a pas bougé sous ma souris. » ; « je dois recapturer à chaque fois pour ne pas cliquer à côté. Ça, c'est un vrai défaut. » | PERC | capture de repérage motivée par le décalage ; incertitude verbalisée sur la cible suivante. Le décalage a deux causes visibles : la phrase de résumé passe de 2 à 3 lignes (+10 px) et la règle gagne une ligne « Titre 2 » (+16 px) ; le participant n'en nomme que la première. Aussi FRU (« un vrai défaut »). |
| [35] #52 | 07:19 | Vérifier | VERIF-E | — | phrase de résumé (« … en 700 ms et Titre 2 … en 700 ms, à chaque passage ») et règle avec deux losanges à 0 (capture 017) | « Les deux pistes commencent bien à 0 sur la règle. » | — | lecture juste (site : Départ 0 ms sur les deux) ; il en déduit correctement qu'« il faudra que je décale les départs » |
| [37] #55 | 07:26–07:38 | Composer | HES | 1 | liste « Éléments de la scène » (capture 017 → 018 : « Contenu » de y = 334 à 359) | « Je recapture pour retrouver la ligne des chiffres, qui a sûrement encore glissé. » | PERC | même mécanisme qu'à [31] (résumé 3 → 4 lignes, règle + 1 ligne) |
| [39] #57 | 07:42 (09:25:37) | Composer | MM | 1 | « les 3 un à un » à droite de « Chiffres · 3 éléments » (y = 440 en 018) ; résultat : ligne « Chiffres · enfants » sur la règle, étiquette « ◆ Chiffres · enfants » sur le canevas (capture 019) | « pour les faire arriver l'un après l'autre » ; capture 019, résumé : « « Chiffres » n'ont pas encore d'images-clés » | — | journal v10 « Ajouter une piste · les enfants de Chiffres ». La piste existe (stagger 100 ms dans le site) mais sans mouvement ; le participant lit aussitôt le résumé et le comprend. Le réglage de l'écart entre enfants n'apparaît sur aucune capture (le bas du panneau est coupé en 019). Hésitation MM/simple lecture : gravité 1. |
| [40] #58 | 08:05 | Vérifier | VERIF-E | — | phrase de résumé sur 4 lignes ; règle à quatre lignes, tous les losanges à 0 ; champ « 1000 ms » (capture 019) | « le résumé dit que le paragraphe et les chiffres n'ont pas encore d'images-clés — donc pour l'instant ils ne bougent pas » | — | état final lu correctement ; base du récit T4-R |
| [40] | 08:05 | Composer | FRU | — | colonne de droite entière | « Sur un panneau de cette taille, ça c'est inacceptable » ; agacement 3 | PERC | agacement < 4 : FRU au titre de l'expression négative spontanée |
| [40] | 08:05 | Composer | VAL− | — | — | « il m'a coûté deux fois trop de gestes pour arriver à mi-chemin » | — | pendant la tâche |
| [40] → 09:02 | 09:02 | — | BUD | 4 | — | « FIN : budget / ACTIONS : 40 » ; modérateur : « Nous allons nous arrêter là pour cette mission. » | — | arrêt au budget → échec. Attribution : la chaîne PC1 (5 + 2 actions) et PC2 (6 actions) coûtent 13 actions environ ; le travail restant (quatre départs, durée, deux remplissages, courbe des chiffres) dépassait de toute façon les 27 actions qu'il aurait eues. La gravité 4 n'est donc pas reportée entièrement sur PC1 (voir section 5). |

Passages de gravité ≥ 2 relus pour les codes du dispositif (règle 8.4.8) : [14]–[19] (aucun), [23] (PERC), [11] et [13] RATE (aucun), BUD (PERC indirect : coût des captures).

---

## 4. Codes déclaratifs (marqués « déclaratif »)

| Code | Étape | Citation | Source |
|---|---|---|---|
| SAT | Composer | « Le modèle est juste, c'est ça qui me fait mettre 4 et pas 2 » | T4-SEQ |
| FRU | Composer | « la moitié de mes actions sont des captures pour re-repérer un bouton que je venais de voir » | T4-SEQ |
| VAL− | Vérifier | « En l'état je ne le montre pas à la cliente, c'est un quart du travail. » | T4-R |
| SAT | Régler | « c'est le seul endroit où votre outil m'a tout de suite donné ce que j'attends : un chiffre, pas un curseur mou » | T4-a |
| FRU | Composer | « Le repérage à l'écran, très largement. […] le fait de retrouver où cliquer. » | T4-b |
| VAL− | Composer | « la composition est bonne mais elle est servie dans un tiroir » | T4-b |
| VAL+ | Composer | « Si le reste suit, je peux imaginer y mettre mes juniors. » | D-FIN-1 |
| VAL− | — | « je ne suis pas sorti de là convaincu, je suis sorti intéressé » | D-FIN-1 |
| SAT | Lancer | « Ce chemin-là, je l'ai fait en neuf gestes sans lire une ligne d'aide, ce qui veut dire qu'il est bien fichu. » | D-FIN-2 |
| VAL+ | Lancer | « Un junior à qui je montre ça une fois le refait. » | D-FIN-2 |
| SAT | Vérifier | « C'est elle qui m'a appris que mes deux pistes partaient en même temps et que deux autres étaient vides. » (la phrase de résumé) | D-FIN-2 |
| SAT | Régler | « les champs sont des vrais chiffres : ms partout, échelle, rotation, flou. Pas de « doux / moyen / rapide ». » | D-FIN-2 |
| FRU | Composer | « avoir une cible qui se déplace après chaque action, c'est disqualifiant » | D-FIN-3 |
| FRU | Régler | « Là je les voyais, mais dans une bande de deux centimètres de haut. » | D-FIN-3 |
| FRU | Composer | « les boutons « Ajouter ». […] Rien ne les distingue à l'œil. » | D-FIN-3 |
| FRU | Composer | « une piste unique pour trois objets, ce n'est pas ce que mon œil d'After Effects attend. Là-dessus je reste sur ma faim. » | D-FIN-3 |
| VAL− | Régler | « Un rebond dont je ne peux pas régler l'amplitude ni le retour, je ne peux pas le vendre. » (conditionnel : il n'a pas cherché la courbe) | D-FIN-10 |
| VAL− | Composer | « Si la valeur est cachée ou imposée, c'est un gadget de plus. » (écart entre enfants ; conditionnel) | D-FIN-10 |
| VAL+ | — | « Les libellés en français sont compréhensibles […] ça évitera à mes juniors de deviner. » | D-FIN-10 |
| VAL− | — | « Un outil de motion, ça se juge au nombre de gestes pour caler un timing. Le vôtre est bon sur le fond et mauvais sur ce compte-là. » | D-FIN-10 |
| FRU | Vérifier | « juger un outil d'animation sans avoir vu une seule animation se jouer, c'est un peu frustrant » | D-FIN-10 (porte sur la séance et le dispositif autant que sur l'outil) |

Aucune de ces opinions ne fonde un problème seule ; celles qui concernent PC1 à PC4 corroborent des comportements codés en section 3.

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

### PC1 · La mise en page de la colonne Animation se décale sous le pointeur à chaque piste ajoutée ou remplie

- **Endroit** : colonne de droite ; bloc du haut (phrase de résumé, « Quand / Délai », « Rejouer », durée, règle) et liste « Éléments de la scène » en dessous. Sur les captures : « Contenu » à y = 308 (014), 334 (015), 359 (018) ; la phrase de résumé passe de 1 ligne (010) à 2 (013), 3 (015), 4 (018) et la règle gagne une ligne par piste.
- **Étape** : Composer.
- **Cause apparente** : le contenu au-dessus de la liste grandit (résumé, lignes de la règle) et pousse les cibles suivantes vers le bas ; le participant enchaîne parfois deux clics sans nouvelle capture.
- **Gravité maximale** : 2 (ERR [23] récupérée seule, 5 actions ; plus 2 captures de repérage). Hésitation 2/3 : le coût cumulé de la chaîne est de 7 actions, sous le seuil de 10 ; le participant, lui, en fait la cause de l'arrêt au budget (gravité 4 dans son récit), ce que je ne retiens pas parce que le travail restant dépassait le budget de toute façon.
- **Lignes** : ERR+COLL-D [23], FRU [24], REC-S [25], HES [31], HES [37], FRU [40] ; déclaratif T4-SEQ, T4-b, D-FIN-1, D-FIN-3.
- **Test d'artefact (première réponse)** : A1 : oui en grande partie ; un utilisateur qui voit l'écran en continu voit la liste descendre et vise la nouvelle position, et les deux captures de repérage disparaissent. L'interface n'offre aucune autre représentation qui évite le décalage. → **problème d'interface amplifié par le dispositif**, à retenir avec gravité réduite d'un niveau (1), « à confirmer avec des utilisateurs réels ». Réserve : le décalage se produit à l'instant du clic précédent ; un utilisateur rapide qui recliquerait au même endroit subirait la même erreur. A2 : aucun CONN ni PERS à l'origine (le double clic sans capture est une économie de budget, pas un écart de persona). A6 : aucun MOD avant. A8 : aucun HALL ; l'inférence « passée sur deux lignes » n'est pas attestée par capture mais n'est pas une perception affirmée, et 013 la confirme après coup.

### PC2 · Les réglages de la piste n'ont qu'une bande d'environ 75 px (sur 500) sous la liste dépliée

- **Endroit** : bas de la colonne de droite, sous « Éléments de la scène (10) » dépliée (captures 008, 009 : seule cette bande défile ; le bloc du haut et la liste restent fixes).
- **Étape** : Régler.
- **Cause apparente** : le bloc du haut (résumé, réglages, règle, boutons, liste dépliée) ne défile pas et occupe presque toute la hauteur ; il faut replier la liste pour lire les réglages, puis la rouvrir pour ajouter une piste.
- **Gravité maximale** : 2 (HES de 6 actions [14]–[19] ; repli [18], dépli [28], et le clic [23] visait ce dépli).
- **Lignes** : HES [14]–[19], FRU [17], [28] ; déclaratif T4-b, D-FIN-3 (« une bande de deux centimètres de haut »).
- **Test d'artefact** : A1 : non ; la hauteur est la même à pleine résolution (environ 135 px sur 900) et il n'y a ni mouvement ni infobulle en cause. A2 : rien. A6 : rien. A8 : rien. → **problème d'interface**, un seul participant à gravité 2 : retenu seulement si un autre participant le montre.

### PC3 · Deux commandes « Ajouter » de même forme : « + Ajouter « La maison » » au-dessus de la liste, « + Ajouter » sur chaque ligne

- **Endroit** : capture 010 (« + Ajouter « La maison » » à y = 270 ; en dessous les « + Ajouter » alignés à droite de chaque élément dans 006, 014).
- **Étape** : Composer.
- **Cause apparente** : même libellé et même icône pour une commande qui crée une piste sur la section entière et pour celles qui créent une piste par élément ; combinée à PC1, elle transforme un clic décalé en piste sur le mauvais élément.
- **Gravité maximale** : 2 (même événement que l'ERR [23] ; cause conjointe).
- **Lignes** : ERR+COLL-D [23] ; déclaratif T4-b, D-FIN-3, rapport de fin.
- **Test d'artefact** : A1 : non pour la ressemblance elle-même (visible à pleine résolution), oui pour le clic décalé (PC1). Le comportement n'atteste que l'effet combiné ; la ressemblance seule est un **signal faible** en attendant les autres séances. A2, A6, A8 : rien.

### PC4 · « les 3 un à un » produit une piste unique « Chiffres · enfants » vide, sans que l'écart entre enfants soit visible

- **Endroit** : règle (ligne « Chiffres · enfants », capture 019) ; phrase de résumé « « Chiffres » n'ont pas encore d'images-clés ».
- **Étape** : Composer.
- **Cause apparente** : la commande crée la piste mais pas le mouvement ; le réglage de l'écart (stagger 100 ms dans le site) est en dessous de la zone capturée.
- **Gravité maximale** : 1 (MM [39], lu et compris aussitôt ; pas de coût mesurable, budget épuisé).
- **Lignes** : MM [39], DEC [11] ; déclaratif D-FIN-3, D-FIN-10.
- **Test d'artefact** : A1 : partiellement (un défilement aurait peut-être montré le réglage ; aucune capture ne le prouve). A2 : l'attente « une piste par objet » vient de la persona After Effects, ce n'est pas un écart. → **signal faible** ; à examiner chez les autres designers.

### PC5 · Coût en gestes de la composition avec le budget de 40 actions

- **Endroit** : ensemble du panneau de composition.
- **Étape** : Composer / Régler.
- **Cause apparente** : 39 actions pour poser le déclencheur, quatre pistes, deux remplissages et le rejeu, au rythme d'une capture après chaque geste ; les réglages de départ et de durée, vus dès [11] et [13], sont remis à plus tard (RATE) et jamais faits.
- **Gravité maximale** : 2 (RATE ×2) ; le BUD (4) n'est imputé à aucun endroit précis.
- **Lignes** : RATE [11], RATE [13], BUD.
- **Test d'artefact** : A1 : oui en partie (les 19 captures sont le coût du dispositif ; un utilisateur réel ne « recapture » pas). A2 : l'ordre de travail (tout poser, régler ensuite) est un choix verbalisé, conforme à une habitude de calques ; pas de PERS. → **artefact probable pour la part « captures », signal faible pour le nombre de gestes**, à ne pas retenir seul.

Constats positifs (pas des problèmes, utiles à la note de résultat) : le chemin section → « Quand : À l'entrée dans l'écran » → « + Ajouter » → panneau de composition parcouru en 9 actions sans aide ; la phrase de résumé lue trois fois comme retour d'état (VERIF-E), et exacte ; « à chaque passage » et « les 3 un à un » compris sans hésitation ; concordance 8/8.

---

## 6. Écarts au protocole et au dispositif, limites de lecture

**MOD (modérateur).**
- Les questions après la tâche sont posées deux par deux dans un même message (T4-SEQ et T4-R ; T4-a et T4-b), puis D-FIN-1, D-FIN-2 et D-FIN-3 ensemble, alors que le script prévoit une question, une réponse, « Merci. ». Aucune relance. Aucun effet sur la tâche (postérieur à la fin) : pas de contamination au sens A6.
- Chaque message du modérateur est suivi de la ligne « Address this before completing your current task. », qui n'est pas une phrase du script (appendice du dispositif, pas une parole de Camille).
- Arrêt de la mission à l'annonce « ACTIONS : 40 » conformément à l'addendum 5 (point 7), alors que le dispositif compte 39 actions (le participant saute [38]). Pas un MOD (règle de la vague), mais une action de budget perdue à signaler.
- Le script E et la consigne T4 sont conformes mot pour mot.

**HORS.** L'appel #1 (lecture de `prompt5-p4.md`) est marqué « écart » par l'en-tête automatique de la trace. C'est la consigne d'incarnation du participant, lue avant la mission sur instruction du lanceur, pas le code, la documentation ni la page. Je ne le code pas HORS ; la tâche n'est pas invalidée.

**PERS.**
- [20]–[22], [32]–[34] : usage délibéré des préréglages (« Remplir avec ») alors que la fiche dit qu'il « ignore les choix tout prêts ». L'écart est verbalisé (« je les corrigerai après »). Conséquence pour A2 : les deux seuls mouvements enregistrés (C5 photo et titre) viennent de cet écart ; cette part du résultat est « possiblement surestimée » pour la persona.
- [19] : « image-clé » (vocabulaire inconnu de la fiche, connu en anglais) lu sans l'hésitation prévue.
- Sur toute la tâche : aucun clic droit, double-clic, appui sur Espace ni glisser-déposer, habitudes listées dans la fiche ; il le reconnaît en D-FIN-10 (« je ne l'ai pas essayé »). Conséquence : on ne sait pas si la lecture au clavier ou le glissement des pistes fonctionne, et aucune tentative de voir la scène jouer n'a eu lieu.
- Point d'étape toutes les 10 actions fait à [9], [19] et [40], manqué à [30].
- Conformes à la fiche : recherche immédiate de champs numériques, lecture en diagonale (pavé « Comment ça marche » non lu), pas de vérification visiteur, aucune déclaration de blocage (il a trouvé les champs en ms avant la 10e action).

**CONN.** Aucun relevé : « stagger », « overshoot », « scroll into view », « timeline », « préréglage » (lu en 010), « tête de lecture » (lu en 006), « images-clés » (lu en 010) sont soit dans son vocabulaire connu, soit lus à l'écran avant emploi. Aucune anticipation d'emplacement sans indice visible : le fil d'Ariane [8], le « + Ajouter » [10], la corbeille [25] sont visibles sur la capture précédente.

**PERC.** Les passages [23], [24], [31], [37], [40] : le coût du décalage de mise en page est amplifié par la perception par captures (voir PC1). D-FIN-10 : frustration de n'avoir vu aucune animation se jouer, liée à l'arrêt au budget et au dispositif (pas de mouvement continu).

**HALL.** Aucun. Toutes les descriptions vérifiées correspondent aux captures (002, 004, 005, 006, 007, 010, 011, 012, 013, 014, 015, 017, 018, 019). Une inférence non attestée par capture : « la phrase de résumé en haut est passée sur deux lignes » ([24]) décrit un état entre #34 et #35 qui n'a pas été capturé ; elle est cohérente avec 010 (1 ligne) et 013 (2 lignes) et présentée comme une explication, pas comme une vision. À [31], la cause du décalage est attribuée au seul résumé alors que la règle gagne aussi une ligne : lecture partielle, pas fausse.

**Limites de ma lecture.**
- Aucune loupe : les petits textes sont lus sur les captures 800 × 500 ; la phrase de résumé et les libellés de liste sont lisibles, mais le libellé « Départ » en capture 010 est à demi caché sous le bloc fixe, et le bas du panneau (réglages de la piste « Chiffres · enfants », réglage d'écart entre enfants) n'apparaît sur aucune capture.
- Pas de capture entre #34 et #35 ni entre #41 et #42 : la position exacte des cibles au moment de ces clics est reconstituée à partir des captures voisines.
- Le compte du participant (40) et celui du dispositif (39) diffèrent d'une unité ; j'utilise les deux dans les métriques.
- Aucun bloc 🧠 : pas d'incertitude de restitution sur la pensée à voix haute.
- Les valeurs de la visite du préparateur (880 ms) diffèrent du site (700 ms) ; aucune conséquence sur les critères ni sur la concordance.
