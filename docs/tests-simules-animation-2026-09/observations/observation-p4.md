# Observation · séance P4 (Julien Ferrand, designer motion) · vague 2

Observateur indépendant. Sources lues : protocole remis à l'observateur (sections 1, 3, 4, 5, 6, 7, 8, 9, 11, annexe A), addendums 1 et 2, trace brute `trace-p4.md`, fiche de lecture `fiche-lecture-p4.md`, 30 captures (liste en section 6). Ordre des tâches : T1, T2, T5, T3, T4. Modèle du participant : Opus 5, règle de la capture double (addendum 2, points 12 et 14).

Conventions de ce document :
- « rang » = numéro d'action selon le compte du participant (capture double = 1 ; loupe + capture double = 1 ; lot « capture double, attente, capture double » = 3 ; `resize_window` et `tabs_context` non comptés) ; « #n » = numéro d'appel d'outil de la trace.
- Horodatage : temps de séance de la trace (mm:ss). Le journal est en UTC ; le décalage journal − trace vaut 09:02:14 (± 1 s), vérifié sur les 23 entrées du journal (ex. T1 v1 09:03:29 = #11 à 01:15 ; T4 v9 09:25:47 = #198 à 23:32).
- 🧠 = pensée restituée par le modèle, partielle ou résumée (addendum 2, point 13) : citée comme pensée à voix haute, avec cette réserve.

## 1. Résumé de la séance

P4 a passé les cinq missions en 26:42 de séance, sans aide, sans blocage déclaré ni abandon, sans aucune parole hors script du modérateur. Il a choisi partout la composition à la main (« Nouvelle animation (à composer) », pistes, champ « Départ », images-clés) plutôt que le bouton « Animer « … » », sauf en T4 où il a rempli les pistes par le menu « Remplir avec » (préréglages) pour économiser des actions. T1 (39 actions) et T3 (35 actions) sont réussies et terminées. T5 est réussie mais arrêtée au budget à l'action même qui la complète (rang 39 sur 40), sans vérification. T2 est un échec au budget sans aucune modification : P4 a suivi la liste « Animations du site » vers une animation « Fondu en montant · Plats · La carte », l'éditeur l'a emmené sur la page La carte, et il y a perdu 24 actions avant de revenir aux cartes de l'accueil. T4 est un échec au budget : trois éléments sur six composés (photo, titre, paragraphe) sous un seul déclencheur, ni chiffres, ni dépassement, ni rejeu. Ses récits du visiteur sont très fidèles au site enregistré quand il a agi (8/8, 7/8, 7/8, 8/8) et prudents quand il ne sait pas (T2 : 2/8 sans écart matériel). Il n'a vérifié comme un visiteur qu'en T2 (sur la mauvaise page d'abord) et en T3. Agacement déclaré maximal : 4 (fin de T2 et de T4).

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut : C (réussite complète).** Accord avec le statut proposé par le préparateur.
- R1 : images-clés 0 ms `opacity 0, translate(0px, 24px)` → 760 ms `opacity 1, none` : départ opacité ≤ 0,5 et décalage ≥ 8 px, retour à l'état normal. Rempli.
- R2 : déclencheur `on=inView` posé sur le titre lui-même, « une seule fois ». Rempli.
- R3 : mouvement de 760 ms dans une animation de 1 000 ms (240 ms immobiles en fin) ; durée totale 760 ou 1 000 ms selon la lecture, dans les deux cas entre 200 et 2 500 ms. Rempli.
- R4 : aucun mouvement permanent. R5 : rien d'autre dans le site (42 animations = 41 + 1). Remplis.
- Réserve de qualité, sans effet sur les critères : la visite du préparateur note un « éclair o=1 avant départ » (le titre se voit un instant avant de disparaître puis d'arriver).

**Mode de fin :** terminé déclaré (« J'ai terminé. », 04:29). **Aides :** aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 39 (compte du participant, rang final « [39] ») ; appels d'outils #4 à #42 = 39 appels comptés, plus #1 à #3 (chargement des outils, taille d'écran, onglets) non comptés |
| Temps | 00:32 (fin de consigne) → 04:29, soit environ 3 min 57 |
| Actions perdues à cause des défauts du dispositif | 1 probable (#42, rang 39 : nouvelle capture parce que le cadre du titre était vide à 383 ms de lecture, capture 041-2) |
| Première action pertinente | rang 6 (#9, clic sur le titre ; capture 010-2 : « Animer « Titre 2 » », « Quand : À l'entrée dans l'écran », « Nouvelle animation (à composer) ») |
| Actions jusqu'à la réussite | 29 au plus tard (#32, v6, dernière modification) ; les états v4 (rang 19) ou v5 (rang 25) remplissaient peut-être déjà les critères, non lus par la fiche |
| Captures et loupes | 16 captures doubles + 1 loupe (#19) = 17 des 39 actions |
| FP | 1 (touche Espace, 2 actions) |
| HES | 1 |
| ERR | 0 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E | pas de VERIF ; VERIF-E au rang 33 (#36, lecture dans la ligne de temps ; tentative par Espace au rang 31) |
| Mots VOC | « aller-retour », « Naturel (par défaut) » (tous deux déclaratifs, réponses T1) |
| SEQ | 5 |

**Concordance du récit (9.4) : 8/8, pas d'écart matériel.**
| Dimension | Score | Récit | Site |
|---|---|---|---|
| Quoi | 2 | « Quand le titre « Une cuisine de produits, servie sans chichi. » arrive à l'écran, il est d'abord invisible et un peu plus bas » | seul le titre porte un mouvement |
| Quand | 2 | « Quand le titre … arrive à l'écran » ; « avec un départ immédiat » | `on=inView`, pas de retard |
| Comment | 2 | « Il monte ensuite à sa place en apparaissant en fondu » | opacité 0 → 1, 24 px → 0 |
| Combien | 2 | « en 760 ms » ; « Ça ne se joue qu'une fois » | 760 ms, une seule fois |

Le participant signale lui-même, comme inconnue, la possibilité que le titre « apparaisse une fraction de seconde à sa place avant de disparaître » : c'est ce que la visite du préparateur a relevé. Non compté comme écart (doute exprimé, pas affirmation).

**Mesures propres :** première action pertinente au rang 6 ; pas de VERIF avant « J'ai terminé » (« Je ne vais pas le vérifier sur le site, je sais ce que ça va faire. », conforme à la fiche) ; moment de lancement choisi : à l'entrée dans l'écran du titre, une fois.

### T2 · Ce que voit vraiment le client (position 2)

**Statut : E (échec).** Accord avec le statut proposé. Site final en version 0, journal vide : la liste « Plats » de l'accueil garde son déclencheur `on=load` ; aucune carte ne remplit R1 et R2. R4 et R5 restent vrais (rien n'a été touché).

**Mode de fin :** budget atteint (BUD, rang 40, #82 ; phrase du modérateur conforme). **Aides :** aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 (compte du participant) ; appels #45 à #82 = 38 appels, dont 2 `tabs_context` non comptés (#54, #58) et 2 lots à 3 actions (#59, #64) |
| Temps | 05:42 → 10:08, environ 4 min 26 |
| Actions perdues à cause des défauts du dispositif | 3 possibles (#64, rangs 20 à 22 : nouvelle série de captures parce que le participant a lu la première image de la capture double #63, que la règle technique demandait d'ignorer) |
| Première action pertinente | rang 38 (#80 ; capture 081-2 : image d'une carte de plat de l'accueil sélectionnée, section « Animation » repliée dans le panneau). Si l'on retient ce que le participant croyait être l'élément visé : rang 6 (#50 ; capture 051-2, animation de la liste « Plats » de la page La carte) |
| Actions jusqu'à la réussite | non atteint |
| Captures, loupes, attentes | 20 captures doubles, 1 loupe (#55), 2 attentes |
| FP | 1 (page La carte), 24 actions perdues (rangs 6 à 24 et 31 à 35) |
| HES | 2 |
| ERR | 1, non récupérée (#80) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 (voir limites, section 6) |
| VERIF / VERIF-E | VERIF au rang 13 (#59, vue « Tester sur le site », mais sur la page La carte, élément non visé) ; VERIF sur l'élément visé aux rangs 27 à 30 (#69 à #72, accueil ouvert par le logo dans l'onglet de test) |
| Mots VOC | aucun |
| SEQ | 2 |

**Concordance du récit (9.4) : 2/8, pas d'écart matériel.** Le récit décrit surtout la page La carte, hors de la zone de la tâche ; la cotation porte sur la section À la carte de l'accueil.
| Dimension | Score | Récit | Site |
|---|---|---|---|
| Quoi | 1 | « Si Aurèle a raison, le titre bouge et les cartes sont là dès le départ, immobiles. » (précédé de « Je ne sais pas. ») | surtitre (fondu), titre (fondu en montant), cartes (fondu en montant au chargement) : le titre est cité, le surtitre omis, les cartes non affirmées |
| Quand | 1 | le titre bouge « quand je descends » (repris de la cliente) | titre `inView` : vague mais compatible ; rien sur le lancement au chargement des cartes |
| Comment | 0 | absent | — |
| Combien | 0 | absent | — |

Écart matériel : non, parce que l'énoncé sur les cartes est conditionnel et encadré par « Je ne sais pas ». Hésitation notée : lu comme une affirmation, « cartes … immobiles » serait un écart sur « Quoi » (les cartes portent un mouvement, joué au chargement).

**Mesures propres :** diagnostic T2-a noté **faux** (le participant « ne sait pas » ; son hypothèse jugée la plus probable, « Rien n'est posé sur les cartes de l'accueil », est contredite par le site ; la cause juste, « L'animation part au chargement de la page », n'apparaît qu'en quatrième et dernière hypothèse, sans preuve). Hésitation entre « faux » et « ne sait pas » : la grille n'a que juste, partiel, faux. VERIF avant la première modification : sans objet (aucune modification) ; une VERIF a bien eu lieu (rangs 13 puis 27 à 30). Modifications collatérales présentes à la fin : aucune.

### T5 · Calmer la pastille, réveiller le bouton (position 3)

**Statut : C (réussite complète).** Accord avec le statut proposé.
- S1 : la Pulsation passe de « En boucle » à « Une fois » (journal v1 « Répétitions ») ; visite : un seul battement 1,00 → 1,047 → 1,00, puis immobile. « Un unique battement après l'arrivée est accepté et noté » : rempli, **noté**.
- S2 : Zoom intact (opacité 0 → 1, taille 92 % → 100 %, retard 300 ms, 500 ms) : durée totale 800 ms. Rempli.
- S3 : bouton « Réserver une table » du héros, déclencheur `on=hover`, taille 1 → 1,05 en 245 ms (≥ 2 %, ≤ 800 ms) ; visite : tient pendant le survol, revient à la sortie (d'un coup), rejoue au survol suivant. Rempli entièrement.
- S4 : rien d'autre (44 animations = 43 + 1 ; en-tête et « Voir la carte » intacts). Rempli.
- Dernière modification (v5, 09:16:27 = #123) au rang 39 : pas de dépassement du budget (addendum 1, point 9).
- Réserve de lecture : la visite place la pulsation « entre 400 et 1 600 ms » alors que le site enregistré indique un retard de 800 ms ; sans effet sur S1 et S2, signalé.

**Mode de fin :** budget atteint (BUD, rang 40). Statut C avec fin BUD : le participant ne savait pas avoir atteint le résultat (« Je n'ai rien vérifié sur le site. ») : **MM codé** (9.1). **Aides :** aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; appels #85 à #124 = 40 appels comptés (plus #83, #84 non comptés) |
| Temps | 11:14 → 14:29, environ 3 min 15 |
| Actions perdues à cause des défauts du dispositif | 0 |
| Première action pertinente | rang 6 (#90, « Pastille » dans le fil d'Ariane ; capture 091-2 : « Au chargement · Zoom · +300 ms », « Au chargement · Pulsation · +800 ms ») |
| Actions jusqu'à la réussite | 39 (#123, v5 : durée 250 ms ; à v4, l'image-clé à 980 ms ne remplissait pas « en 800 ms au plus ») ; S1 et S2 dès le rang 12 (#96, v1) |
| Captures et loupes | 18 captures doubles, 0 loupe |
| FP | 0 |
| HES | 1 |
| ERR | 2, toutes deux récupérées seul (REC-S) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E | pas de VERIF ; VERIF-E au rang 13 (#97, phrase mise à jour lue), puis rangs 18-19 (« Effets continus » ouverts pour vérifier qu'aucun autre effet ne tourne) |
| Mots VOC | « Lire en boucle » (à côté du menu « Une fois ») |
| SEQ | 5 |

**Concordance du récit (9.4) : 7/8, pas d'écart matériel.**
| Dimension | Score | Récit | Site |
|---|---|---|---|
| Quoi | 2 | la pastille ; « Quand il passe la souris sur « Réserver une table », le bouton grossit légèrement » | pastille et bouton du héros, rien d'autre |
| Quand | 2 | « à peu près 300 ms après le chargement » ; « Vers 800 ms » ; au survol | `on=load` retard 300 ; `on=load` retard 800 ; `on=hover` |
| Comment | 2 | « arrive en zoom » ; « une seule pulsation » ; « grossit légèrement, de 5 % » | Zoom ; Pulsation ; scale 1,05 |
| Combien | 1 | « une seule pulsation de 1,2 seconde, puis elle ne bouge plus » ; « en un quart de seconde environ » ; nombre de fois du survol non affirmé (« Ça peut vouloir dire qu'il ne réagit qu'au premier survol de la visite. ») | durées exactes ; pastille une fois ; bouton à chaque survol |

**Mesures propres :** S1 oui (un battement, noté) ; S2 oui ; S3 oui (entier). S2 jamais perdu en cours de tâche (le Zoom n'apparaît pas au journal). S1 rempli et T5-a l'affirme avec réserve (« À mon avis, non, mais je n'en suis pas certain à 100 %. ») : pas de contradiction. Pas de confusion entre le bouton du héros et celui de l'en-tête (capture 107-2 : fil d'Ariane « … Boutons › Réserver une table » dans le héros).

### T3 · Donner du rythme à l'accueil (position 4)

**Statut : C (réussite complète).** Accord avec le statut proposé.
- R1 : titre `on=load`, fondu en montant, durée 1 400 ms (≥ 900, ≤ 4 000). Rempli.
- R2 : « Réserver une table » images-clés 1 400 → 1 900 ms, « Voir la carte » 1 500 → 2 000 ms ; départs ≥ 80 % de la fin du titre (1 120 ms), fins ≤ 6 000 ms ; visite conforme (élément caché avant le départ). Rempli pour les deux boutons.
- R3 : paragraphe inchangé (fondu 500 ms au chargement). R4 : rien d'ajouté. Remplis.

**Mode de fin :** terminé déclaré (« J'ai terminé. », 18:34). **Aides :** aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 35 (compte du participant) ; appels #127 à #159 = 33 appels, dont #127 refusé par l'outil (« requires a prior computer{action:"screenshot"} »), non compté par le participant, et 2 lots à plusieurs actions (#158 = 3, #159 = 2) |
| Temps | 15:43 → 18:34, environ 2 min 51 |
| Actions perdues à cause des défauts du dispositif | 0 action comptée ; 1 appel refusé sans effet (#127) |
| Première action pertinente | rang 3 (#130, clic sur le grand titre ; capture 131-2 : « Au chargement · Fondu en montant ») |
| Actions jusqu'à la réussite | 28 (#155, v3) ; R1 vrai dès le rang 9 (#136, v1) ; R2 vrai pour « Réserver une table » au rang 19 (#146, v2), pour les deux boutons au rang 28 |
| Captures, loupes, attentes | 14 captures doubles, 0 loupe, 2 attentes |
| FP | 0 |
| HES | 1 |
| ERR | 0 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E | VERIF au rang 30 (#157, « Tester sur le site », captures 158 et 159 : titre en cours d'arrivée, boutons absents, puis présents) |
| Mots VOC | aucun |
| SEQ | 6 |

**Concordance du récit (9.4) : 7/8, pas d'écart matériel.**
| Dimension | Score | Récit | Site |
|---|---|---|---|
| Quoi | 2 | grand titre, deux boutons ; « Le reste (le petit surtitre, le paragraphe, la photo, la pastille) fait ce qu'il faisait déjà » | titre, paragraphe, deux boutons bougent ; surtitre, photo, pastille immobiles : aucun élément en trop affirmé |
| Quand | 2 | « Le visiteur ouvre l'accueil » ; boutons « Quand le titre est en place, vers 1,4 seconde » ; « « Voir la carte » suit 100 ms plus tard » | `on=load` ; ordre et départs exacts |
| Comment | 2 | « apparaît en fondu en montant depuis un peu plus bas » ; boutons « en fondu en montant » | fondu en montant (28 px) |
| Combien | 1 | « sur 1,4 seconde » ; « en une demi-seconde » ; « de 1,5 à 2 secondes » ; nombre de fois non dit | durées exactes ; une seule fois (non énoncé) |

**Mesures propres :** R1 vrai au rang 9, R2 vrai au rang 28, sans aide (niveau d'aide 0 aux deux moments). Estimation T3-a : « Environ 2 secondes. » ; fin réelle des boutons : 2 000 ms → **juste** (écart 0 %).

### T4 · La maison racontée comme une scène (position 5)

**Statut : E (échec).** Pas de statut proposé dans la fiche (notes du préparateur vides) : statut établi par l'observateur d'après le site enregistré ; aucune visite requise pour un échec.
- Structure enregistrée : un seul déclencheur `on=inView` sur « Contenu » [rh_about_in] (bloc qui contient photo, texte et chiffres, capture 167-2), une animation de 1 700 ms « une seule fois », trois pistes : photo 0 → 700 ms (opacité 0, translateX −40 px) ; titre 500 → 1 200 ms (opacité 0, translateY 28 px) ; paragraphe 1 000 → 1 700 ms (opacité 0, flou 12 px).

**Profil de critères :**
| Critère | Rempli ? | Lecture |
|---|---|---|
| C1 · tous les éléments bougent | non | 3 éléments sur 6 ; les trois chiffres n'ont aucun mouvement |
| C2 · un seul événement | non évaluable pour six éléments ; oui pour les trois pistes posées | tout part de l'entrée de « Contenu » dans l'écran |
| C3 · ordre principal | non | photo (0) < titre (500) < paragraphe (1 000), écarts ≥ 80 ms, mais aucun chiffre |
| C3b · chiffres échelonnés | non | aucun chiffre animé |
| C4 · minutage | non | fin du dernier mouvement à 1 700 ms (< 1 800) |
| C5 · manières de bouger | non | photo (40 px horizontal), titre (28 px vers le bas), paragraphe conformes ; chiffres sans courbe à dépassement |
| C6 · répétition | non | « une seule fois » |

C1 et C3 non remplis : échec.

**Mode de fin :** budget atteint (BUD, rang 40). **Aides :** aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; appels #162 à #201 = 40 appels comptés (plus #160, #161 non comptés) |
| Temps | 19:30 → 23:56, environ 4 min 26 |
| Actions perdues à cause des défauts du dispositif | 0 au sens strict ; mais 17 des 40 actions sont des captures doubles (voir problème candidat PC-2) |
| Première action pertinente | rang 7 (#168, « + Ajouter », journal v1 « Nouvelle animation ») ; rang 5 défendable (#166 : capture 167-2 montre le déclencheur « À l'entrée dans l'écran » du bloc qui contient les éléments visés, qui n'est pas lui-même un élément visé) |
| Actions jusqu'à la réussite | non atteint |
| Captures et loupes | 17 captures doubles, 0 loupe |
| FP | 1 (menu « Une fois » pour le rejeu, 2 actions) |
| HES | 0 |
| ERR | 0 |
| COLL-D / COLL-ND | 0 / 0 (surtitre non touché) |
| RATE | 0 (voir limites, section 6, sur « Cible ») |
| VERIF / VERIF-E | pas de VERIF ; VERIF-E au rang 38 (#199, phrase et pistes relues : « La composition de 1700 ms confirme bien la cascade photo/titre/paragraphe attendue. ») |
| Mots VOC | aucun pendant la tâche (« Netteté » compris et confirmé par le site) |
| SEQ | 2 |

**Concordance du récit (9.4) : 8/8, pas d'écart matériel.**
| Dimension | Score | Récit | Site |
|---|---|---|---|
| Quoi | 2 | photo, titre, paragraphe ; « Les trois chiffres (12, 38, 14) ne font rien, faute de piste de ma part. » | trois pistes, chiffres et surtitre immobiles |
| Quand | 2 | « au moment où la section entre à l'écran » ; photo, puis titre « vers 0,5 seconde », paragraphe « entre 1 seconde et 1,7 seconde » | `on=inView` de « Contenu », départs 0 / 500 / 1 000 |
| Comment | 2 | « glisse depuis la gauche en apparaissant » ; « monter en fondu » ; « passe du flou au net » | translateX −40 ; translateY 28 ; flou 12 px + opacité |
| Combien | 2 | « en 0,7 seconde », « en place à 1,2 seconde », « entre 1 seconde et 1,7 seconde » ; « L'ensemble ne se joue qu'une fois. » | durées exactes ; une seule fois |

**Mesures propres :** profil ci-dessus ; structure de lancement : un seul événement (déclencheur sur « Contenu »), départs décalés par le champ « Départ » des pistes ; réponse T4-a (« Dans « Départ », je remplace 1000 par 700 ou 800, puis Tab. ») **cohérente** avec la structure enregistrée.

## 3. Lignes de codage (format 8.5)

« Rang / # » = compte du participant / numéro d'appel d'outil. Toutes les lignes sont de la séance P4. Les codes déclaratifs sont en section 4.

| Séance | Tâche | Position | Rang / # | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif sur le passage | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P4 | T1 | 1 | 15-16 / #18-#19 | 01:48-02:04 | Régler | HES | 1 | champ « Opacité » de la piste du titre ; canevas | 🧠 « le champ affiche « 0 % » et l'état « Enregistré · v2 », mais le titre reste pleinement visible sur le canvas, ce qui est inattendu » ; journal v3 « opacity (image-clé à 0 ms) » à 09:04:30 (= #20) | aucun ; 🧠 résumé | La saisie validée par Entrée (#17) n'est enregistrée qu'au changement de champ (#20), d'après le journal. Loupe pour lire les étiquettes x/y. 2 actions. |
| P4 | T1 | 1 | 15 et 22 / #18, #25 | 01:48, 02:53 | Régler | MM | 1 | canevas (titre) face à la tête de lecture | 🧠 « La tête de lecture est à 760ms, avec opacité à 0 et y à 24 mais le titre reste inchangé visuellement. » | aucun | Attente implicite (« inattendu ») : que le canevas montre l'état à la tête de lecture. Il ne le fait qu'après la première lecture (🧠 04:12 : « le canvas suit maintenant la tête de lecture »). Pas d'action perdue directe. |
| P4 | T1 | 1 | 25 / #28 | 03:00 | Régler | DEC | — | panneau de la piste, tête de lecture à 760 ms | journal v5 « opacity (image-clé à 760 ms) » ; T1-b « des clés qui se créent quand on déplace la tête de lecture et qu'on change une valeur » | aucun | Création d'image-clé par changement de valeur, comprise. |
| P4 | T1 | 1 | 31-32 / #34-#35 | 03:33-03:48 | Vérifier | FP + MM | 1 | touche Espace ; infobulle « Image-clé à 760 ms. Cliquer pour retirer la propriété de l'image-clé. » près de « Échelle » (capture 035-2) | 🧠 « je vais maintenant appuyer sur Espace pour lancer la lecture et voir le titre monter en fondu » ; 035-2 : tête toujours à 760 / 1 000 ms | aucun (habitude inscrite dans la fiche) | 2 actions. Journal inchangé après v6 : pas d'ERR, la crainte d'avoir ajouté l'échelle est infondée. |
| P4 | T1 | 1 | 33-35 / #36-#38 | 03:48-04:02 | Vérifier | MM ; VERIF-E (rang 33) | 1 | bouton lecture et bouton retour au début de la ligne de temps | 🧠 « La lecture a démarré depuis ma position actuelle (760 ms) plutôt que du début, donc je ne vois que la fin de l'animation. » | aucun | 1 action de plus (retour au début). Première vérification, dans l'éditeur. |
| P4 | T1 | 1 | 37-39 / #40-#42 | 04:12-04:29 | Vérifier | PERC | — | canevas pendant la lecture (041-2 : 383 / 1 000 ms, cadre du titre vide) | 🧠 « ce qui suggère un problème de synchronisation entre la capture et le canvas » ; 💬 « Je n'ai pas vu d'image intermédiaire » | PERC | 1 action (#42) imputable au dispositif. Pas de VERIF visiteur (« je sais ce que ça va faire », conforme à la fiche). |
| P4 | T2 | 2 | 2-5 / #46-#49 | 05:58-06:22 | Découvrir | MM | 4 (origine de la chaîne) | panneau « ANIMATIONS DU SITE » : « Fondu en montant · Plats · La carte » (×4), « Glissé depuis la gauche · Titre · La carte »…, au-dessous de « ANIMATIONS LANCÉES PAR LA PAGE · ACCUEIL » (047-2, 049-2) | 🧠 « la liste des animations sur "La carte" contient bien un "Fondu en montant · Plats", mais rien sur l'Accueil — les plats d'Aurèle sont donc au bon endroit » | A4 (la consigne ne nomme pas la page) ; A7 (tâche en position 2) | À #47, 🧠 « suggérant que je suis peut-être sur la page La carte plutôt que l'accueil » alors que 047-2 montre l'accueil. Les entrées de l'accueil ne figurent dans aucune des deux captures (liste coupée) : « rien sur l'Accueil » repose sur une liste partielle. Gravité 4 donnée à l'origine de la chaîne qui finit en échec au budget (8.3) ; hésitation : la donner à la FP suivante. |
| P4 | T2 | 2 | 6-24 et 31-35 / #50-#66, #73-#77 | 06:22-08:29 ; 09:03-09:22 | Découvrir, Vérifier | FP | 3 (coût propre : 24 actions) | clic sur « Fondu en montant · Plats · La carte » : l'éditeur passe sur la page La carte (051-2 : titre « La carte », fil d'Ariane « Page › Entrées › Contenu › Plats ») ; « Tester sur le site » ouvre `/la-carte` (057-2) ; retour : éditeur resté sur La carte en mode Animation, sans liste des pages (074-2), puis « Écriture », « Accueil » | 💬 « J'y ai perdu une trentaine d'actions » ; 🧠 #66 « le problème signalé par Aurèle vient peut-être d'une autre page » | PERC (#59-#66) ; PERS (non-abandon, ligne plus bas) | 19 actions sur La carte + 5 pour revenir à l'accueil dans l'éditeur. Changement de direction à #67 (logo). Le changement de page à #50 n'est pas relevé sur le moment (🧠 #51 : « L'éditeur montre que l'élément "Plats" est correctement configuré dans la section Entrées »). |
| P4 | T2 | 2 | 9-11 / #53-#56 | 06:43-07:05 | Vérifier | HES | 1 | lien bleu « Tester sur le site ↗ » en fin de phrase sous « ANIMATION » (053-2 identique à 051-2) | 🧠 « Je localise plus précisément le lien « Tester sur le site » sur l'agrandissement et reclique dessus, cette fois en visant le milieu du texte » | aucun | Premier clic à @690,85, sur le bord droit du lien, sans effet ; loupe, second clic. 2 actions. |
| P4 | T2 | 2 | 13-15 / #59 | 07:19-07:30 | Vérifier | VERIF (élément non visé) ; PERC | — | onglet « Maison Aurèle », `/la-carte`, bandeau « Test de l'animation : l'élément arrive à l'écran comme pour un visiteur. » (057-2) | 🧠 « La page "La carte" est déjà entièrement affichée dès la première capture, sans mouvement visible, donc je n'ai pas pu confirmer d'animation d'entrée. » | PERC | Vue visiteur, mais sur la page La carte. |
| P4 | T2 | 2 | 19-22 / #63-#64 | 07:54-08:13 | Vérifier | HES | 2 | page La carte, section « Desserts » encore sombre (063-2) | 🧠 « la section Desserts apparaît déjà sur la première capture, mais disparaît puis se recharge partiellement sur la seconde » | dispositif : lecture de la première image d'une capture double (règle technique 2) ; PERC | 3 actions (#64), imputables au dispositif et à l'écart à la règle technique, pas à l'interface. |
| P4 | T2 | 2 | 27-30 / #69-#72 | 08:36-09:03 | Vérifier | VERIF | — | onglet de test, accueil : cartes « Œuf parfait… », « Agneau des Combrailles… », « Truffade revisitée… » en place, titre de section hors écran (072-2) | 🧠 « J'ai localisé les trois plats mentionnés par Aurèle sur la page d'accueil (Œuf parfait, Agneau des Combrailles, Truffade revisitée) » | PERC | Deux défilements de 10 crans : l'arrivée du titre n'est jamais captée (T2-R : « Je suis descendu trop vite »). |
| P4 | T2 | 2 | 30 / #72 | 09:03 | Vérifier | MM-V | 2 | idem | 🧠 « mais aucune animation n'est prévue pour cette section » | HALL possible (affirmation non attestée par 072-2) ; PERC ; A1 ; A8 | Contredit par le site : trois déclencheurs dans la section, dont « Au chargement de la page : les enfants de « Plats » un à un en 600 ms ». Coût propre limité (il va quand même vérifier dans l'éditeur). Hésitation 1-2 ; 🧠 résumé, formulation non garantie. |
| P4 | T2 | 2 | 38 / #80 | 09:35 | Découvrir | ERR (non récupérée) | 2 | canevas de l'accueil, première carte ; fil d'Ariane « À la carte › Contenu › Plats › Carte plat › Image » (081-2) | 🧠 « J'ai sélectionné par erreur l'image de la carte au lieu de la carte entière, à cause d'un fil d'Ariane ambigu. » | aucun | Annoncé : la première carte ; obtenu : « Image ». Non récupérée faute de budget. Hésitation 1-2. |
| P4 | T2 | 2 | 32 environ / #75 | 09:14 | — | PERS | — | — | plus de 25 actions sans progrès visible (rangs 8 à 37) sans abandon | — | Fiche : « Abandonne à 25 actions sans progrès. » Hésitation : jusqu'au rang 24, le participant croit examiner le bon élément dans l'aperçu, mais défiler n'est pas un progrès (3.8). Sans effet sur le statut (E dans les deux cas). |
| P4 | T2 | 2 | 40 / #82 | 10:08 | Découvrir | BUD ; FRU (verbal) | 4 | section « Animation » repliée du panneau « Image » | 💬 « J'ai atteint les 40 actions et je m'arrête là, sans avoir vu l'effet de ce dernier clic. » ; 💬 « Agacement 4. » | aucun | Conséquence rattachée à la MM des rangs 2-5 et à la FP. |
| P4 | T5 | 3 | 4-6 / #88-#90 | 11:36-11:44 | Découvrir | ERR + REC-S | 2 | canevas : clic sur la pastille, sélection « Texte « Bib Gourmand » » (089-2), puis « Pastille » dans le fil d'Ariane (091-2) | 🧠 « J'ai sélectionné le texte « Bib Gourmand » au lieu de la pastille entière » | aucun | Récupérée seul, 2 actions. |
| P4 | T5 | 3 | 12-13 / #96-#97 | 12:12-12:24 | Retirer | VERIF-E | — | menu « Une fois » ; phrase « Au chargement de la page, après 800 ms : « Pastille » en 1 200 ms. » (097-2) | journal v1 « Répétitions » ; 🧠 « Le menu affiche bien « Une fois » et la phrase s'est mise à jour » | aucun | S1 rempli au rang 12. |
| P4 | T5 | 3 | 14-15 / #98-#99 | 12:24-12:34 | Retirer | HES | 1 | icône bleue « Lire en boucle » dans les commandes de lecture, à côté du menu « Une fois » (099-2) | 🧠 « Le tooltip « Lire en boucle » semble correspondre à la boucle de lecture de l'éditeur plutôt qu'au réglage global du site, ce qui crée une ambiguïté avec le menu « Une fois ». » | aucun | 2 actions. VOC « Lire en boucle » (un seul compte pour la séance). |
| P4 | T5 | 3 | 16-19 / #100-#103 | 12:34-12:48 | Retirer | VERIF-E | — | section « Effets continus » de la pastille | 🧠 « Les effets continus confirment aucun problème (pas de parallaxe, pas de bandeau) » | aucun | 4 actions de contrôle volontaire ; pas codé FP. |
| P4 | T5 | 3 | 20-22 / #104-#106 | 12:48-12:56 | Découvrir | ERR + REC-S | 2 | canevas : clic sur « Réserver une table », texte sélectionné ; fil d'Ariane « … Boutons › Réserver une table » (107-2) | 🧠 « J'ai encore sélectionné le texte au lieu du bouton « Réserver une table », c'est agaçant sur ce type d'élément. » | aucun | Même mécanisme que la ligne pastille ; 2 actions. |
| P4 | T5 | 3 | 36-39 / #120-#123 | 13:59-14:12 | Régler | DEC | — | champ de durée de l'animation (124-2 : « 250 ms », phrase « … en 245 ms ») | 💬 « Ma clé à 980 ms est donc passée à 245 ms avec la durée : les clés suivent la durée. » | aucun | Mise à l'échelle des clés comprise. |
| P4 | T5 | 3 | 40 / #124 | 14:29 | Vérifier | BUD | 4 (lettre de 8.3) | — | 💬 « J'ai atteint les 40 actions et je m'arrête là. » | aucun | Hésitation 4 / 1 : la conséquence observée se limite à l'absence de vérification ; statut C. |
| P4 | T5 | 3 | 40 / #124 | 14:29 | Vérifier | MM | 0 | compo « Au survol », menu « Une fois », case « aller-retour » (124-2) | 💬 « Je ne sais pas si le bouton revient à sa taille quand la souris part, ni si « Une fois » veut dire qu'il ne réagit qu'au premier survol. » | aucun | 9.1 : statut C avec fin BUD. Rien de faux n'est affirmé. |
| P4 | T3 | 4 | — / #127 | 15:52 | — | incident du dispositif | — | — | « left_click with `coordinate` requires a prior computer{action:"screenshot"} » | dispositif | Appel refusé par l'outil, sans effet, non compté. |
| P4 | T3 | 4 | 2-3 / #129-#130 | 15:58-16:04 | Découvrir | HALL (possible) | — | onglet « Animation » ; canevas | 🧠 « Le canvas se stabilise à 80 % avec le titre en haut à gauche, comme prévu. » | HALL possible ; 🧠 résumé | Aucune capture entre #129 et #130 ; clic juste (131-2) grâce au souvenir des tâches précédentes (pas CONN). Sans conséquence. |
| P4 | T3 | 4 | 11-14 / #138-#141 | 16:40-17:02 | Composer | HES | 1 | compo du titre restée ouverte après sélection du bouton, avec « + Ajouter « Réserver une table » » (139-2) | 🧠 « le panneau propose d'ajouter son animation à la compo du titre plutôt qu'à la sienne propre » | aucun | Fermeture de la compo pour voir l'animation propre du bouton (141-2). 2 actions. |
| P4 | T3 | 4 | 15-16 / #142-#143 | 17:02-17:12 | Régler | MM | 1 | chevron à gauche de la ligne « Au chargement · Fondu en montant » du bouton (141-2) | 🧠 « Je clique sur le chevron de cette ligne pour tenter d'accéder à ce réglage sans ouvrir la compo. » ; T3-SEQ « ça a ouvert la compo » | aucun | Aucune action perdue : « Départ » de la piste utilisé aussitôt. Le retard du déclencheur n'est jamais trouvé (T3-a : « je ne sais pas où il se règle »). |
| P4 | T3 | 4 | 30-35 / #157-#159 | 18:16-18:34 | Vérifier | VERIF ; PERC | — | « Tester sur le site », accueil (158-2 : titre et paragraphe en cours d'arrivée, boutons absents ; 158-4 : titre en place, boutons absents ; 159-2 : boutons présents) | 🧠 « Les captures confirment que le titre apparaît progressivement et que les boutons restent cachés en dessous pendant ce temps. » ; 💬 « Je n'ai vu que des images fixes, donc je ne peux pas juger la fluidité ni le stagger de 100 ms entre les deux boutons. » | PERC | Affirmation attestée par 158-2 et 158-4 : pas HALL. |
| P4 | T4 | 5 | 12-14 / #173-#175 ; 20-22 ; 31-33 | 20:59-21:11 ; 21:47-21:53 ; 22:53-23:00 | Choisir | PERS | — | menu « Remplir avec : un préréglage… » de chaque piste (182-2 : « Apparition · … », « Survol · … », « Continue · … », « Attention · … ») | 🧠 « Je laisse le préréglage poser les clés automatiquement plutôt que de faire les six pistes à la main. » | PERS | Fiche : « Ignore les choix tout prêts ». Écart motivé par le budget ; il réduit le coût, il n'est pas à l'origine d'un problème (A2). |
| P4 | T4 | 5 | 38 / #199 | 23:42 | Vérifier | VERIF-E | — | phrase de l'animation et pistes | 🧠 « La composition de 1700 ms confirme bien la cascade photo/titre/paragraphe attendue. » | aucun | Attesté par le journal (v9) et la fiche. |
| P4 | T4 | 5 | 39-40 / #200-#201 | 23:42-23:56 | Lancer | FP + MM | 1 (coût propre) | menu « Une fois » de l'animation : « Une fois », « 2 fois », « 3 fois », « En boucle » (201-2) | 🧠 « Je vais maintenant ouvrir le menu « Une fois » pour vérifier s'il existe une option de répétition à chaque passage. » ; 💬 « Rien qui ressemble à « rejouer chaque fois que la section revient à l'écran » » | aucun | C6 non rempli. L'endroit où se règle le rejeu n'est visible dans aucune capture ouverte : pas de RATE. |
| P4 | T4 | 5 | 1-40 / #162-#201 | 19:47-23:56 | Composer | BUD ; FRU (verbal) | 4 | ajout piste par piste : clic sur l'élément dans le canevas, « + Ajouter « … » », « Remplir avec », préréglage, « Départ » (triple clic, saisie, Tab), captures | 💬 « Six éléments à poser un par un, avec leurs clés et leurs départs, ça dépasse de loin ce qu'on peut faire en 40 gestes. » ; 💬 « Agacement 4. » | dispositif : 17 captures doubles sur 40 actions ; PERS (ligne ci-dessus) | Coût mesuré : 8 actions pour ouvrir le mode Animation, sélectionner « Contenu » et créer l'animation (rangs 1-8, dont 4 captures) ; photo 7 (rangs 9-15) ; titre 11 (16-26) ; paragraphe 12 (27-38). 🧠 rang 10 : « avec 10 actions déjà utilisées pour créer la composition sans aucune piste, la marge de manœuvre se resserre ». |

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués « déclaratif » ; ils illustrent, ils ne fondent aucun problème (11.4).

| Moment | Code | Étape | Citation (une phrase au plus) |
|---|---|---|---|
| T1-SEQ | SAT · déclaratif | Découvrir, Régler | « J'ai trouvé la timeline, les champs en ms, le trigger et l'auto-key sans chercher. » |
| T1-SEQ | FRU · déclaratif | Vérifier | « **Espace** ne lance pas la lecture. » |
| T1-SEQ | VOC · déclaratif (gravité 2, lettre de 8.3 : mot non compris sans effet sur le résultat) | Régler | « « Naturel (par défaut) », ça ne me dit pas ce que c'est en réalité. » |
| T1-b (repris en D-FIN-3 et D-FIN-5) | VOC · déclaratif (gravité 2, même raison) | Lancer, Régler | « Et je ne sais toujours pas ce que veut dire « aller-retour » ici. » |
| T2-SEQ | FRU · déclaratif | Découvrir, Vérifier | « J'ai tourné en rond une bonne vingtaine d'actions. » |
| T2-a | MM-V · déclaratif (sans gravité propre : hypothèse, pas récit R) | Vérifier | « **Rien n'est posé sur les cartes de l'accueil.** » (contredit par le site : déclencheur au chargement sur la liste « Plats ») |
| T5-SEQ | SAT · déclaratif | Retirer | « J'ai trouvé la boucle de la pastille en moins de dix gestes, et le hover existe comme trigger. » |
| T5-SEQ | VAL− · déclaratif | Choisir, Lancer | « Sur Webflow, j'aurais le même résultat en trois. » |
| T5-SEQ | VOC · déclaratif (même mot que la ligne de T5, compté une fois) | Retirer | « Il y a une icône « Lire en boucle » juste à côté du menu « Une fois / En boucle », et je ne suis pas sûr de ce que chacune commande. » |
| T3-SEQ | SAT · déclaratif | Régler, Composer | « C'est la mission où l'outil a fonctionné comme je l'attendais » |
| T3-SEQ | FRU · déclaratif | Composer | « Il a fallu ouvrir trois compos séparées, une par élément » |
| T4-SEQ | FRU · déclaratif | Composer | « Ce qui rend la mission difficile, c'est le nombre de gestes » |
| T4-SEQ | VAL− · déclaratif | Composer | « Sur After Effects ou Webflow, cette scène me prend dix minutes. » |
| T4-SEQ, D-FIN-8 | MM · déclaratif (non vérifiable par capture) | Composer | « **Aucune sélection multiple,** et pas de « enfants l'un après l'autre » que j'aurais pu utiliser pour les chiffres. » (l'addendum 1, point 3, atteste une cible « ses enfants » dans l'outil) |
| D-FIN-1 | VAL+ · déclaratif | Choisir, Retirer | « Pour un titre qui arrive ou une pastille qui boucle trop, c'est rapide. » |
| D-FIN-1 | VAL− · déclaratif | Composer | « À suivre, mais pas encore prêt pour nos juniors sur une home un peu ambitieuse. » |
| D-FIN-2 | SAT · déclaratif | Vérifier, Régler | « C'est la meilleure idée de l'outil » (la phrase au-dessus de la ligne de temps) |
| D-FIN-2 | SAT · déclaratif | Composer | « Il décale la piste et la compo s'allonge toute seule, exactement comme un offset de calque. » |
| D-FIN-2 | SAT · déclaratif | Lancer | « Au chargement, à l'entrée dans l'écran, au survol : ça se trouve tout de suite » |
| D-FIN-3 | FRU · déclaratif | Découvrir, Choisir | « On attrape le texte au lieu du bouton ou de la pastille » |
| D-FIN-3 | FRU · déclaratif | Vérifier | « Le canvas ne suivait pas toujours la tête de lecture, Espace ne lance pas la lecture » |
| D-FIN-3 | FRU · déclaratif | Découvrir | « une liste « Animations du site » qui m'a envoyé au mauvais endroit » |
| D-FIN-3 | FRU · déclaratif | Retirer | « Je n'ai jamais été sûr de ce que chacune commande. » (les deux « boucles ») |
| D-FIN-5 | VOC · déclaratif (gravité 0, hors sujet) | — | « « Vue de base de données », vu en passant : je ne sais pas ce que c'est » |
| D-FIN-6 | VAL+ · déclaratif | toutes | « Pour l'agence, ça pourrait remplacer Webflow sur les petits sites vitrines » |
| D-FIN-6 | VAL+ · déclaratif | Vérifier | « la phrase qui résume la compo aiderait mes juniors à ne pas faire n'importe quoi » |
| D-FIN-6 | VAL− · déclaratif | Composer | « je resterais sur Webflow tant que je n'ai pas vu ces réglages » |
| D-FIN-6 | VAL− · déclaratif | Vérifier | « je ne laisserais pas un restaurateur toucher aux animations tout seul » |
| D-FIN-7 (T1) | VAL+ · déclaratif | Régler | « Je me suis dit : « OK, ce n'est pas un jouet. » » |
| D-FIN-7 (T3) | VAL+ · déclaratif | Composer | « Là, je me suis dit que je pourrais former un junior là-dessus en une heure. » |
| D-FIN-7 (T2) | VAL− · déclaratif | Vérifier | « Je faisais défiler un aperçu en regardant des images figées, sur la mauvaise page, sans comprendre ce que voyait la cliente. » |
| D-FIN-7 (T4) | VAL− · déclaratif | Composer | « J'ai compté les gestes par élément et compris que je n'arriverais jamais aux chiffres » |
| D-FIN-8 | VAL− · déclaratif | Composer | « Si ces fonctions n'existent pas, je ne peux pas vendre de mise en scène. » |
| D-FIN-9 | VAL− · déclaratif | Vérifier | « ce qu'elle voit dans la page de travail n'est pas forcément ce que verront ses clients » |
| D-FIN-10 | SAT · déclaratif | Vérifier | « gardez-la, c'est la meilleure chose que j'ai vue » (la phrase de résumé) |
| D-FIN-10 | PERC · déclaratif | Vérifier | « voir l'écran uniquement par des images figées m'a beaucoup gêné pour juger le mouvement » |

Carte de la valeur de la séance (déclaratif et verbal) : SAT + VAL+ surtout à Régler, Lancer, Composer par « Départ » et à Vérifier par la phrase de résumé ; FRU + VAL− surtout à Composer (scène à plusieurs éléments), à Vérifier (images figées, mauvaise page) et à Découvrir (liste « Animations du site », sélection sur le canevas).

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

Classés par gravité maximale. Test d'artefact limité à A1, A2, A6, A8 (demandés), avec A4 et A7 quand ils s'imposent.

**PC-1 · La liste « Animations du site » mène à l'animation homonyme d'une autre page (T2).**
- Endroit : panneau « ANIMATIONS DU SITE » en mode Animation (entrées « effet · élément · page », quatre « Fondu en montant · Plats · La carte », captures 047-2 et 049-2) ; le clic sur une entrée fait passer l'éditeur sur la page La carte (051-2) ; noms homonymes « Plats » et « À la carte » dans le fil d'Ariane de l'accueil (081-2).
- Étape : Découvrir (et Vérifier).
- Cause apparente : le participant cherche « les plats » dans la liste de toutes les animations du site ; les entrées visibles sont celles de La carte, celles de l'accueil ne sont pas à l'écran ; l'entrée cliquée l'emmène sur l'autre page sans qu'il le relève ; les noms d'éléments se répètent d'une page à l'autre.
- Gravité maximale : 4 (origine de l'échec au budget de T2).
- Lignes : T2 rangs 2-5 (MM, 4), rangs 6-24 et 31-35 (FP, 3), rang 38 (ERR, 2), rang 40 (BUD, 4).
- A1 perception : non. Les libellés « · La carte » sont lisibles, l'erreur ne tient pas au mouvement.
- A2 connaissance et persona : pas de CONN. Un PERS (non-abandon après 25 actions sans progrès) prolonge la piste mais n'en est pas l'origine.
- A6 modérateur : aucun MOD.
- A8 perception affirmée : la chaîne ne repose sur aucun passage HALL (les observations sur La carte sont attestées par 061-2 et 063-2).
- À signaler : A4 possible (la consigne de T2 ne nomme pas la page d'accueil : « Quand je descends jusqu'aux plats ») ; à vérifier chez les autres participants avant d'imputer à l'interface. A7 : T2 est en position 2 chez P4, la plus précoce ; mention « possible effet d'ordre » si le problème ne se retrouve qu'en position 2.

**PC-2 · Une scène à plusieurs éléments se compose piste par piste, trop lentement pour le budget ; ni rejeu à chaque passage ni départs échelonnés trouvés (T4).**
- Endroit : panneau de l'animation de « Contenu » : « Choisir un élément » ou clic sur le canevas, « + Ajouter « … » », « Remplir avec : un préréglage… », champ « Départ » (169-2, 182-2, 187-2) ; menu « Une fois / 2 fois / 3 fois / En boucle » (201-2).
- Étape : Composer (et Lancer pour le rejeu).
- Cause apparente : 7 à 12 actions par élément ; aucun geste groupé trouvé ; le rejeu cherché dans le menu du nombre de fois, où il n'est pas.
- Gravité maximale : 4 (échec au budget, trois éléments sur six).
- Lignes : T4 rangs 1-40 (BUD, 4), rangs 39-40 (FP + MM, 1), PERS rangs 12-14, 20-22, 31-33.
- A1 perception : en partie oui. 17 des 40 actions sont des captures doubles, qu'un humain n'aurait pas à « payer » ; la lecture de l'écran après chaque ajout de piste (le panneau se décale) coûte des captures. Réponse provisoire : **problème d'interface amplifié par le dispositif** (le nombre de gestes de manipulation, hors captures, reste d'environ 23 pour trois éléments).
- A2 : PERS (préréglages utilisés contre la fiche) ; il réduit le coût, il n'est pas à l'origine du problème. Si la persona avait composé toutes les clés à la main, le coût aurait été plus élevé.
- A6 : aucun MOD. A8 : aucun passage HALL.
- Réserve : « Cible : L'élément » est visible et lisible dans les pistes (201-2), et l'addendum 1 atteste une cible « ses enfants » ; le participant ne l'a jamais ouverte (déclaratif D-FIN-5). Pas codé RATE : le moment d'en faire usage (les chiffres) n'a jamais été atteint, et la liste de ses choix n'apparaît dans aucune capture.

**PC-3 · Un clic sur un bouton ou une pastille sélectionne le texte ou l'image qu'ils contiennent (T5, T2).**
- Endroit : canevas ; fil d'Ariane en haut du panneau (089-2, 107-2, 081-2).
- Étape : Découvrir.
- Cause apparente : la cible du clic est l'enfant (texte, image), pas l'élément voulu ; remontée par le fil d'Ariane.
- Gravité maximale : 2 (trois ERR, deux récupérées seul, une non récupérée faute de budget).
- Lignes : T5 rangs 4-6 et 20-22 (ERR + REC-S) ; T2 rang 38 (ERR non récupérée).
- A1 : non (aucun mouvement en jeu, écran lisible). A2 : aucun CONN ni PERS. A6 : aucun MOD. A8 : aucun HALL.
- Retenable pour P4 seul ? Non (gravité 2, un seul participant) : à rapprocher des autres séances.

**PC-4 · Voir comme un visiteur que les cartes sont « déjà là » à partir d'images fixes (T2).**
- Endroit : onglet ouvert par « Tester sur le site » (072-2).
- Étape : Vérifier.
- Cause apparente : après défilement et capture, titre et cartes sont tous deux à l'état final ; le participant conclut qu'aucune animation n'existe dans la section.
- Gravité maximale : 2.
- Lignes : T2 rang 30 (MM-V, 2), rangs 13-15 et 19-22 (PERC, HES 2), rangs 27-30 (VERIF).
- A1 : **oui**. Un humain qui défile aurait vu le titre arriver et les cartes immobiles, ce que décrit la cliente ; l'interface offre une autre représentation, la phrase « Au chargement de la page : les enfants de « Plats » un à un en 600 ms » de la liste de l'accueil, que le participant n'a jamais ouverte → **artefact probable**, signal faible.
- A8 : la conclusion « aucune animation n'est prévue pour cette section » est un passage HALL possible ; toute conclusion qui en dépend est écartée.

**PC-5 · Lecture dans l'éditeur : Espace inopérant, lecture depuis la tête de lecture, canevas qui ne suit la tête de lecture qu'après une première lecture, saisie validée par Entrée non enregistrée avant le changement de champ (T1).**
- Endroit : commandes de lecture de la ligne de temps ; canevas ; champ « Opacité » (035-2, 041-2 ; journal v3 à #20).
- Étape : Régler, Vérifier.
- Gravité maximale : 1.
- Lignes : T1 rangs 15-16 (HES), 15 et 22 (MM), 31-32 (FP + MM), 33-35 (MM), 37-39 (PERC).
- A1 : non pour Espace, la lecture depuis la tête et la saisie ; oui pour l'état du canevas pendant la lecture (041-2), qui ne compte pas dans ce problème. A2 : Espace est une habitude inscrite dans la fiche (pas de PERS). A6 : aucun MOD. A8 : aucun HALL.
- Signal faible pour P4 (gravité 1, un participant).

**PC-6 · Deux « boucles » voisines et des lignes d'animation qui ne disent pas ce qui se répète (T5).**
- Endroit : icône « Lire en boucle » à côté du menu « Une fois » (099-2) ; lignes « Au chargement · Pulsation · +800 ms » (091-2).
- Étape : Retirer.
- Gravité maximale : 1 (HES, 2 actions ; VOC « Lire en boucle »).
- A1 : non (l'infobulle est apparue, 099-2). A2 : aucun. A6 : aucun. A8 : aucun. Signal faible.

**PC-7 · Compo ouverte qui reste active quand on sélectionne un autre élément ; chevron qui ouvre la compo au lieu de déplier (T3).**
- Endroit : panneau de l'animation du titre (139-2) ; chevron de la ligne d'animation (141-2).
- Étape : Composer, Régler.
- Gravité maximale : 1. A1 : non. A2, A6, A8 : aucun. Signal faible.

**PC-8 · Retour du survol non représenté (T5).**
- Endroit : compo « Au survol », menu « Une fois », case « aller-retour » (124-2).
- Étape : Lancer, Vérifier.
- Gravité : 0 dans le comportement (S3 rempli ; seulement une incertitude verbalisée à la fin et en T5-b). Surtout déclaratif : ne peut pas devenir un problème seul (11.4). Signal faible.

## 6. Écarts au protocole et au dispositif

**MOD (modérateur) : aucun.** Toutes les répliques sont celles du script (4.3.A à I, questions des tâches, phrase de budget), groupées comme le prévoit l'addendum 1 (point 7). Après « J'ai terminé », le « Merci. » de 4.3.F est fondu dans « Merci. J'ai quelques questions sur cette mission. » : conforme à l'usage de l'addendum, non codé. Aucune aide, aucune relance. Les lignes « Address this before completing your current task. » viennent de l'outil de message, pas du modérateur.

**HORS : aucun.** Les deux appels `javascript_tool` (#19, #55) sont des loupes autorisées ; la trace indique « Écarts au protocole (outils interdits) : aucun ».

**PERS**
- T2 : pas d'abandon après plus de 25 actions sans progrès visible (ligne de codage T2, rang 32 environ), avec hésitation sur la notion de progrès.
- T4 : usage des préréglages par « Remplir avec », contre « Ignore les choix tout prêts » (motivé à voix haute par le budget).
- Règle de la fiche « face à un terme français qu'il ne connaît qu'en anglais, il hésite une fois à voix haute » : non observée pour « image-clé » ni « aller-retour » pendant les tâches (🧠 01:27 cite « loop, aller-retour » sans hésitation). Réserve : pensée restituée partielle (addendum 2, points 13 et 14), l'absence d'hésitation n'est pas certaine.
- Consigne d'incarnation 3.2, règles 4 et 6 (hors fiche, donc non codées PERS) : l'agacement n'est donné qu'à la fin de T2 et de T4, pas toutes les 10 actions ; plusieurs suites d'actions sans pensée entre elles (#15-#17, #20-#22, #77-#78, #118-#123, #148-#149, #172-#173, #183-#186). La phrase « Pensez à dire ce que vous cherchez avant d'agir » ne pouvait pas être dite pendant l'action (addendum 1, point 8).
- Conforme à la fiche : composition à la main plutôt que « Animer « … » » en T1, T3, T5 ; Espace essayé ; survols ; vérification visiteur rare (« je sais ce que ça va faire »).

**CONN : aucun relevé.** Les emplacements anticipés sans capture (#129-#130, #163-#164, #172-#173, #183-#184) s'appuient sur des captures des tâches précédentes de la même séance. « Marquee », « offset de calque », « auto-key » relèvent des outils de la fiche (After Effects, Webflow) ou ne sont pas dans la liste « vocabulaire inconnu ».

**PERC**
- T1 rangs 37-39 (canevas vide à 383 ms de lecture, 041-2).
- T2 rangs 13-15, 19-22, 27-30 (images figées de l'onglet de test, arrivées non captées).
- T3 rangs 30-35 (fluidité et écart de 100 ms non jugeables).
- Déclaratif : T2-b, T3-b, D-FIN-10.

**HALL**
- T3 #129-#130 : « Le canvas se stabilise à 80 % … comme prévu » sans capture après le clic (possible ; 🧠 résumé).
- T2 #72 : « aucune animation n'est prévue pour cette section », non attesté par 072-2 et contredit par le site (possible ; 🧠 résumé). Conclusions qui en dépendent écartées (A8).
- Vérifiés non-HALL : T2 #61 (« En comparant les deux captures ») ; T3 #158 (158-2, 158-4) ; T4 #176 (translateX −40 confirmé par la fiche) ; T5 #99 (infobulle « Lire en boucle » visible, 099-2).

**Incidents et limites du dispositif sur cette séance**
- Point 12 de l'addendum 2 (captures en retard) : sans objet pour P4 (capture double). Actions perdues imputables au dispositif : T1 1 probable (#42) ; T2 3 possibles (#64, lecture de la première image d'une capture double, contre la règle technique) ; T3 un appel refusé (#127) non compté ; T5 et T4 0.
- Poids des captures dans le budget : T1 17/39, T2 21/40 (+ 2 attentes), T5 18/40, T3 14/35 (+ 2 attentes), T4 17/40. Trois tâches sur cinq finissent au budget ; en T5, le budget tombe à l'action suivante de la réussite.
- Pensée à voix haute surtout en 🧠 (résumée par le modèle) : VOC et MM probablement sous-estimés (addendum 2, point 13). Les citations 🧠 ne sont pas garanties mot pour mot.
- Fiche de lecture : notes du préparateur absentes pour T4 (statut E établi ici d'après le site enregistré ; aucune visite requise pour un échec). En T5, la visite place la pulsation entre 400 et 1 600 ms alors que le retard enregistré est de 800 ms (sans effet sur les critères, signalé). En T1, « éclair o=1 avant départ » relevé par la visite (qualité du rendu, hors critères).
- Consigne T2 : ne nomme pas la page de l'accueil (A4 à examiner avec les autres séances).

**Limites de ma propre lecture**
- 30 captures ouvertes, toutes secondes images de capture double sauf mention : 010, 035, 041 (T1) ; 047, 049, 051, 053, 057, 061, 063, 072, 074, 081 (T2) ; 089, 091, 097, 099, 107, 124 (T5) ; 131, 139, 141, 158-2, 158-4, 159 (T3) ; 167, 169, 182, 187, 201 (T4). Les autres passages sont codés d'après la trace, le journal et la fiche.
- Liste « Animations du site » : je n'ai pas vu sa fin ; je ne peux pas dire si les animations de l'accueil y figurent plus bas, ni donc coder un RATE.
- Menu « Cible » : la liste de ses choix n'apparaît dans aucune capture ouverte ; l'existence d'une cible « ses enfants » vient de l'addendum 1.
- Emplacement du réglage « rejouer à chaque passage » : non visible dans les captures ouvertes (167-2, 169-2, 201-2) ; pas de RATE possible pour C6.
- Première action pertinente de T2 et de T4 : deux lectures possibles, toutes deux données.
- Actions jusqu'à la réussite de T1 : les états intermédiaires v4 et v5 ne sont pas décrits par la fiche.
