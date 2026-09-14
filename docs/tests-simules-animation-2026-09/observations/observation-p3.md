# Observation · séance P3 (Karim, débutant) · deuxième vague

Observateur indépendant. Sources lues : protocole (version observateur), addendums 1 et 2, trace brute `trace-p3.md`, fiche de lecture `fiche-lecture-p3.md`, 40 captures (liste en fin de §6). Aucun autre fichier, aucun outil de navigateur.

Conventions de ce document :
- **N° d'action** : « [n] » = compte annoncé par le participant ; le second nombre est mon recompte selon la règle technique 4 (chaque appel `computer` = 1, loupe = 1, capture de la loupe = 1 ; `resize_window`, `tabs_context` et l'appel refusé #67 non comptés). « — » = action non annoncée.
- **Appel** : numéro d'appel d'outil « #n » du dispositif (= nom de la capture).
- **Horodatage** : temps de séance de la trace (mm:ss) ; journal du site en UTC (le décalage est constant : 00:00 de séance = 07:07:27 UTC, vérifié sur les 9 entrées du journal).
- Positions dans les captures en pixels de capture (≈ 800 × 500), relevées à ± 3 px sur agrandissement local des captures.
- Gravité « — » = code sans gravité (VERIF, DEC, SAT, FRU, VAL, codes du dispositif).

---

## 1. Résumé de la séance

- Séance de 21 min 22 s (134 appels d'outils, 65 captures), ordre T1, T5, T2, T3, T4 ; aucune aide demandée ni donnée.
- T1 (C, 9 actions) et T5 (C, 25 actions) : choix tout prêts trouvés directement dans la rubrique « Animation » du panneau (« Fondu en montant » à l'entrée dans l'écran ; boucle « En continu » retirée, « Soulever » au survol).
- Le clic dans l'aperçu sélectionne le texte ou l'image intérieurs ; il faut remonter par le fil en haut du panneau (coût de 2 à 9 actions en T5 et T3).
- T2 (E, budget à 41 actions, aucune modification) : diagnostic juste et vérification dans l'Aperçu (atteint par erreur via « Tester sur le site »), mais six clics sur le fil manquent « Carte plat ».
- T3 (P, abandon à 21) : titre ralenti par « Lente » (R1) ; pour les boutons « après », écran du mode Animation, « Départ » repéré mais non utilisé, « Rotation continue » appliquée par erreur puis annulée.
- T4 (E, 34 actions, terminé) : quatre apparitions séparées posées depuis le panneau simple ; profil C1 seul.
- Récits lucides, sans écart matériel (3 à 7 sur 8) ; dispositif en cause par endroits (loupe sans effet visible, captures en retard en T5, pointage imprécis) et écarts à la persona (lecture de libellés longs, agrandissements, pas de demande d'aide en T2).

---

## 2. Par tâche (ordre de passage)

### 2.1 T1 · Premier élément qui bouge (position 1)

**Statut : C** (réussite complète). **Accord** avec le statut proposé par le préparateur.
- Site enregistré : titre « Une cuisine de produits, servie sans chichi. » [rh_about_h2], déclencheur `on=inView`, « Fondu en montant » 700 ms, images-clés opacité 0 → 1 et `translateY(28px)` → `none`, une seule fois. Journal : 07:08:35 v1 « Apparition · Fondu en montant ».
- R1 ✓ (opacité 0 ≤ 0,5 ; décalage 28 px ≥ 8 px) ; R2 ✓ (entrée du titre dans l'écran) ; R3 ✓ (700 ms) ; R4 ✓ ; R5 ✓ (aucun autre ajout). Visite du préparateur : arrive à l'entrée. Signalé au chercheur, hors codage : la note du préparateur mentionne un « éclair o=1 avant départ », constat de la visite que le participant n'a pas pu voir ; il ne change aucun critère.

**Mode de fin** : terminé déclaré (« J'ai terminé. », 01:23). **Aides** : aucune.

**Métriques (9.2)**
| Métrique | Valeur |
|---|---|
| Actions totales | 9 (compte du participant = recompte) ; 11 appels d'outils (#1 à #11, dont ToolSearch et `resize_window`) |
| Temps | ≈ 0 min 59 s (00:24 → 01:23) |
| Première action pertinente | **2** (#4, clic sur le titre ; la capture 005 montre la rubrique « Animation » du titre sélectionné, repliée). Lecture stricte : 4 (#6, rubrique dépliée « Apparition / Au survol / En continu », capture 007 décrite par le participant et visible en 011) |
| Actions jusqu'à la réussite | 8 (#10, choix « Fondu en montant » ; journal 07:08:35) |
| Captures / loupes | 5 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 0 |
| ERR (non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 |
| VERIF / VERIF-E | VERIF : non. VERIF-E : oui, rang 9 (#11, lecture de la phrase de résumé) |
| VOC | « survol » (en cours de tâche, L1) ; « ms » (déclaratif, réponse T1-R, §4) |
| SEQ | 6 |

**Concordance du récit (9.4)** — récit T1-R : « Ben, un visiteur qui arrive sur la page et qui descend avec la molette, à un moment il va arriver à la partie "La maison", et là le titre "Une cuisine de produits, servie sans chichi." il va apparaître en fondu, en montant un peu, une seule fois. »
| Dimension | Score | Justification |
|---|---|---|
| Quoi | 2 | « juste ce titre-là » ; site : seul le titre bouge |
| Quand | 1 | « à un moment il va arriver à la partie "La maison" » : compatible avec `on=inView` du titre, mais rapporté à la partie et non au titre (2 défendable) |
| Comment | 2 | « en fondu, en montant un peu » = fade-up, 28 px |
| Combien | 1 | nombre de fois exact (« une seule fois ») ; durée non exprimée comme durée (« "700" … ça doit être la vitesse, mais je sais pas trop ce que ça veut dire ce sigle ») |
| **Total** | **6/8** | **Écart matériel : non** |

**Mesures propres** : première action pertinente 2 (4 en lecture stricte) ; VERIF avant « J'ai terminé » : non (VERIF-E seulement) ; moment de lancement : à l'entrée du titre dans l'écran, valeur déjà proposée par le choix « Apparition », sans aucune action du participant sur le moment (phrase lue en 011 : « Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois. »).

### 2.2 T5 · Calmer la pastille, réveiller le bouton (position 2)

**Statut : C**. **Accord** avec le préparateur.
- Site : pastille [rh_hero_badge] ne garde que le déclencheur `on=load delay=300` « Zoom » 500 ms (opacité 0 → 1, `scale(0.92)` → `none`) ; déclencheur de pulsation en boucle retiré. Bouton « Réserver une table » du héros [rh_hero_b1] : `on=hover reverseOnLeave`, « Soulever » 250 ms, `translateY(0)` → `translateY(-4px)`. Journal : 07:11:08 v1 « En continu · aucun » ; 07:11:41 v2 « Au survol · Soulever ». Rien d'autre.
- S1 ✓ (plus de mouvement répété ; visite : pastille stable 3,5 s après l'arrivée) ; S2 ✓ (arrivée visible au chargement, durée totale 300 + 500 = 800 ms ; jamais perdue dans le journal) ; S3 ✓ entier (−4 px en 250 ms, retour quand la souris part, pas de répétition ; confirmé par la visite) ; S4 ✓.

**Mode de fin** : terminé déclaré (04:37). **Aides** : aucune.

**Métriques**
| Métrique | Valeur |
|---|---|
| Actions totales | 25 (annoncé en fin de tâche ; les numéros intermédiaires annoncés s'arrêtent à [17], mais le recompte donne bien 25) ; 23 appels d'outils (#12 à #34, dont 3 lots « loupe + capture » et 1 `resize_window`) |
| Temps | ≈ 2 min 12 s (02:25 → 04:37) |
| Première action pertinente | **8** (#19, clic sur « Pastille » dans le fil ; son effet n'apparaît qu'en 021, la capture 020 étant en retard ; lecture strictement mécanique : 10, la loupe #21 suivie de 021) |
| Actions jusqu'à la réussite | 24 (#33, « Soulever » ; S1 et S2 dès 14, #24) |
| Captures / loupes | 13 / 3 (#18, #21, #28) |
| FP (actions perdues) | 1 (4 : actions 4 à 7) — L6 |
| HES | 2 — L7, L8 |
| ERR (non récupérées) | 2 (0) — L4, L11 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 — L5 |
| VERIF / VERIF-E | VERIF : non. VERIF-E : oui, rang 15 (#25) |
| VOC | aucun nouveau (« survol » déjà compté en T1) |
| SEQ | 5 |

**Concordance du récit** — T5-R : « Pour le bouton "Réserver une table" : tant que personne touche à rien, il bouge pas, mais dès que le visiteur passe sa souris dessus avec l'ordinateur, il va se soulever un peu, et redescendre quand la souris s'en va. » (et pour la pastille : « quand le visiteur ouvre la page, elle va toujours faire son petit zoom pour arriver, mais après elle va rester tranquille »)
| Dimension | Score | Justification |
|---|---|---|
| Quoi | 2 | pastille et bouton, rien d'autre ; site identique |
| Quand | 2 | pastille à l'ouverture de la page ; bouton au passage de la souris, retour au départ de la souris |
| Comment | 2 | « petit zoom » ; « se soulever un peu » |
| Combien | 1 | nombre de fois exact (pastille une fois, bouton à chaque passage) ; durées absentes du récit (« 250 ms » n'apparaît qu'en T5-b) |
| **Total** | **7/8** | **Écart matériel : non** |

**Mesures propres** : S1 ✓ (action 14), S2 ✓ (jamais perdue), S3 ✓ entier (action 24), S4 ✓ ; S1 rempli et T5-a affirme l'arrêt (« Non, elle bougera plus en permanence. ») : concordant ; aucune confusion entre le bouton du héros et celui de l'en-tête (journal : rh_hero_b1).

### 2.3 T2 · Ce que voit vraiment le client (position 3)

**Statut : E** (échec). **Accord** avec le préparateur.
- Site final = état de départ (version 0, journal vide) : « Cette saison » `on=inView` fondu 600 ms ; « Quelques plats signature » `on=inView delay=100` fondu en montant 600 ms ; liste « Plats » `on=load`, cible « enfants », fondu en montant 600 ms. Aucune carte ne remplit R1 et R2 à la fois (cartes toujours lancées à l'ouverture de la page).
- Aucune modification n'a été faite avant ni après la 40e action (dépassement d'une action, voir §6) : sans effet sur le statut.

**Mode de fin** : BUD (budget atteint ; le participant s'arrête de lui-même à 41 et le modérateur dit la phrase prévue). **Aides** : aucune (aucun « Je suis bloqué »).

**Métriques**
| Métrique | Valeur |
|---|---|
| Actions totales | 41 (annoncé = recompte ; annoncé [36] pour la 39e action, puis corrigé à [41]) ; 43 appels d'outils (#35 à #77, dont `resize_window` #35, `tabs_context` #58, appel refusé #67) |
| Temps | ≈ 5 min 17 s (05:38 → 10:55) |
| Première action pertinente | **18** (#52, annoncé [14] ; la capture 053 montre le panneau « Plats » avec « Animation · Apparition : Fondu en montant », qui porte le mouvement des cartes). Si l'on compte le titre « Quelques plats signature » (visé par R4) : 6 (#41 → 042, décrite par le participant) |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 20 (+ 1 image de l'action « zoom » #49, identique à 048) / 1 loupe (#48) + 1 « zoom » (#49) |
| FP (actions perdues) | 0 (0) : la visite dans l'Aperçu sert la consigne (« Regardez ce qu'elle voit vraiment ») ; la recherche de « Carte plat » n'est pas démontrablement sans issue (voir §6, limites) |
| HES | 1 — L16 |
| ERR (non récupérées) | 8 (2 non récupérées à la fin : L14, la carte n'est jamais sélectionnée ; L27, sélection laissée sur « À la carte » ; L17 et L24 sont des clics sans effet) — L14, L15, L17, L18, L21, L24, L25, L27 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 0 (voir §6 : aucun accès menant au changement de moment de lancement n'est identifiable avec certitude dans les captures) |
| VERIF / VERIF-E | VERIF : oui, rang 23 (#57 → #64) ; VERIF-E : non codé |
| VOC | aucun |
| SEQ | 2 |

**Concordance du récit** — T2-R : « Donc si quelqu'un descend la page normalement, il va tomber sur les trois plats déjà là, immobiles, exactement comme ce que décrivait la dame du restaurant. » (et : « les plats vont continuer à apparaître d'un coup dès que la page s'ouvre, pas quand on scrolle jusqu'à eux » ; « Le titre juste au-dessus, lui, va toujours bien bouger en arrivant à l'écran »)
| Dimension | Score | Justification |
|---|---|---|
| Quoi | 1 | plats et titre ; omet le surtitre « Cette saison » (omission, pas erreur) |
| Quand | 2 | plats à l'ouverture de la page, titre à l'arrivée à l'écran : exact |
| Comment | 1 | titre « bien bouger » (vague) ; plats « apparaître d'un coup » ambigu (tout de suite ou tous ensemble) alors que le site les fait arriver un à un en fondu en montant (0 défendable) |
| Combien | 0 | ni durée ni nombre de fois |
| **Total** | **4/8** | **Écart matériel : non** |

**Mesures propres**
- Diagnostic (T2-a) : **juste** : il désigne le lancement « Au chargement de la page » et l'animation « déjà finie depuis longtemps » quand Aurèle arrive. Formulé dès l'action 21 (#55) à partir de la phrase de résumé de « Plats » comparée à celle du titre. A2 : ce diagnostic repose sur la lecture de phrases longues, hors persona (PERS) : **possiblement surestimé**.
- VERIF avant la première modification : oui (rang 23) ; aucune modification ensuite.
- Modifications collatérales dans le site final : aucune.

### 2.4 T3 · Donner du rythme à l'accueil (position 4)

**Statut : P** (réussite partielle : R1 rempli, R2 non rempli). **Accord** avec le préparateur, avec une réserve : la fiche ne mentionne **aucune visite comme un visiteur** pour confirmer ce statut partiel, que la section 5.0 exige pour toute réussite complète ou partielle ; à compléter.
- Site : titre [rh_hero_h1] `on=load` fondu en montant **1 120 ms** ; paragraphe `on=load` fondu 500 ms ; boutons « Réserver une table » et « Voir la carte » `on=load` fondu en montant 500 ms, retard 0. Journal : 07:19:43 v1 « Apparition · lente » ; 07:21:20 v2 « Remplir la piste · Rotation continue » ; 07:21:46 v3 même libellé (annulation, état final identique au départ pour le bouton).
- R1 ✓ (1 120 ms, entre 900 et 4 000) ; R2 ✗ (départ des boutons 0 ms < 80 % de 1 120 = 896 ms) ; R3 ✓ ; R4 ✓.

**Mode de fin** : ABD (« J'abandonne. », 14:50). **Aides** : aucune.
Règle 9.1 (« C ou P avec ABD ⇒ MM ») : **non appliquée**, et c'est une hésitation à arbitrer. La définition opérationnelle de MM n'est pas remplie : le participant savait avoir obtenu la moitié « titre » et pas la moitié « boutons » (« je garde ce que j'ai déjà fait pour le titre puisque ça marche »). L'application mécanique de 9.1 produirait un MM contredit par la trace.

**Métriques**
| Métrique | Valeur |
|---|---|
| Actions totales | 21 (annoncé = recompte) ; 22 appels d'outils (#78 à #99, dont `resize_window`) |
| Temps | ≈ 2 min 58 s (11:52 → 14:50) |
| Première action pertinente | **2** (#80 → 081 : « Apparition Fondu en montant », « Rapide / Nor… / Lente », « Au chargement de la page : fondu en montant en 500 ms. ») |
| Actions jusqu'à la réussite (P) | 4 (#82, « Lente » ; journal 07:19:43) |
| Captures / loupes | 11 / 0 |
| FP (actions perdues) | 1 (5 : actions 12 à 16) — L35 |
| HES | 0 |
| ERR (non récupérées) | 2 (0) — L31, L36 |
| COLL-D / COLL-ND | 0 / 0 (la modification v2 porte sur le bouton, élément visé, et est annulée) |
| RATE | 1 — L32 |
| VERIF / VERIF-E | VERIF : non (T3-b : « pas besoin d'aller vérifier en vrai sur le site en scrollant »). VERIF-E : oui, rang 5 (#83) |
| VOC | « image-clé » (L33), « décalage », « cible », « piste » (L37) |
| SEQ | 2 |

**Concordance du récit** — T3-R : « Du coup ça sera pas exactement ce qu'elle demandait, le titre sera plus doux mais les boutons vont probablement apparaître pendant que le titre arrive encore, pas après. » (et : « le grand titre … va arriver plus lentement qu'avant » ; boutons « ils vont arriver comme avant, en même temps que le début de la page en gros »)
| Dimension | Score | Justification |
|---|---|---|
| Quoi | 1 | titre et boutons ; omet le paragraphe, qui bouge aussi (omission) |
| Quand | 1 | boutons « en même temps que le début de la page en gros », « pendant que le titre arrive encore » : compatible (fin des boutons à 500 ms, du titre à 1 120 ms) mais vague ; moment du titre implicite |
| Comment | 1 | « plus doux », « apparaître » : vague mais compatible |
| Combien | 0 | aucune durée chiffrée ni nombre de fois |
| **Total** | **3/8** | **Écart matériel : non** |

**Mesures propres**
- R1 : vrai à l'action 4, sans aide. R2 : jamais vrai.
- Estimation T3-a : **« ne sait pas »**. Il déclare ne pas pouvoir donner un temps (« je peux pas vous donner un temps correct »). Son indication « même pas une seconde » est compatible avec la fin réelle des boutons (500 ms), mais n'est pas cotable à ± 30 %.

### 2.5 T4 · La maison racontée comme une scène (position 5)

**Statut : E**. **Accord** avec le préparateur.
- Site : photo `on=inView` « Glissé depuis la gauche » 700 ms (`translateX(-40px)`) ; titre `on=inView` fondu en montant 700 ms (`translateY(28px)`) ; paragraphe `on=inView` fondu 700 ms ; composant « Chiffre clé » › « Texte « 12 » » [rk_value] `on=inView` « Glissé depuis la droite » 700 ms (`translateX(40px)`), valant pour chaque instance ; courbe `cubic-bezier(.22,1,.36,1)` partout ; une seule fois partout. Journal : v1 07:24:18, v2 07:24:32, v3 07:24:47, v4 07:25:40.
- **Profil de critères** : C1 ✓ (six éléments avec arrivée visible, les trois chiffres par le composant) ; C2 ✗ (quatre déclencheurs séparés) ; C3 ✗ (départs simultanés à section entrée d'un coup) ; C3b ✗ ; C4 ✗ (fin à 700 ms) ; C5 ✗ (photo ✓ 40 px, titre ✓, paragraphe ✓, chiffres sans dépassement) ; C6 ✗ (une seule fois).

**Mode de fin** : terminé déclaré, avec réserves explicites sur l'ordre, le minutage et la répétition (19:25). **Aides** : aucune.

**Métriques**
| Métrique | Valeur |
|---|---|
| Actions totales | 34 (annoncé = recompte) ; 35 appels d'outils (#100 à #134, dont `resize_window`) |
| Temps | ≈ 3 min 47 s (15:38 → 19:25) |
| Première action pertinente | **4** (#104, clic sur la photo ; capture 105, décrite par le participant : « "Photo de la salle" sélectionnée directement, avec "Animation" en bas »). Lecture stricte : 6 (#106 → 107, « Apparition : Aucune ») |
| Actions jusqu'à la réussite | non atteint |
| Captures / loupes | 16 / 0 |
| FP (actions perdues) | 0 (0) |
| HES | 2 — L43, L45 |
| ERR (non récupérées) | 3 (3 : deux clics sans effet sur le fil, un choix erroné non remarqué) — L43 (×2), L44 |
| COLL-D / COLL-ND | 0 / 0 attestée ; 1 COLL-ND **conditionnelle** (L46), à confirmer |
| RATE | 1 — L42 |
| VERIF / VERIF-E | VERIF : non. VERIF-E : oui, rang 11 (#111) |
| VOC | aucun nouveau en cours de tâche |
| SEQ | 3 |

**Concordance du récit** — T4-R : « Alors, un visiteur qui arrive sur "La maison" : la photo va glisser depuis la gauche, le titre "Une cuisine de produits, servie sans chichi" va monter en fondu, le paragraphe en dessous va apparaître en fondu, et les trois chiffres "12, 38, 14" vont aussi bouger en arrivant, un genre de glissé. » (et : « Ça se peut très bien que tout arrive en même temps ou presque, dès qu'on tombe sur cette partie de la page » ; « je pense que ça va jouer qu'une seule fois »)
| Dimension | Score | Justification |
|---|---|---|
| Quoi | 2 | photo, titre, paragraphe, trois chiffres ; rien de plus (sous réserve de L46) |
| Quand | 1 | « dès qu'on tombe sur cette partie », « tout arrive en même temps ou presque » : compatible avec des lancements séparés sans retard, mais présenté comme incertain ; aucune affirmation d'ordre fausse |
| Comment | 1 | photo, titre, paragraphe exacts ; chiffres « un genre de glissé » (direction absente) : vague (2 défendable) |
| Combien | 1 | « une seule fois » exact ; durée absente |
| **Total** | **5/8** | **Écart matériel : non** |

**Mesures propres**
- Profil : C1 seul.
- Structure de lancement : **lancements séparés** (quatre déclencheurs « entre dans l'écran », sans retard), dont un posé dans le composant « Chiffre clé ».
- T4-a : **non cohérente avec la structure enregistrée** (« "Départ" avec un nombre en "ms", peut-être qu'il faut baisser ce nombre-là »). Aucun départ n'est réglé, tous sont à 0, et les éléments ne sont pas réunis dans une même animation. Réponse formulée comme une supposition. Codée MM-V déclaratif (§4).

---

## 3. Lignes de codage

Séance P3 pour toutes les lignes. « Disp. » = codes du dispositif sur le passage.

| L | Séance | Tâche | Pos. | N° action (annoncé / recompte) | Appel | Horodatage | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L1 | P3 | T1 | 1 | [5] / 5 | #7 | 00:58 | Choisir | VOC « survol » | 2 | ligne « Au survol : Aucun » de la rubrique « Animation » du panneau de droite (visible en 011) | « "Au survol" je capte pas trop ce mot, je le saute. » | — | Sans effet sur T1. En T5 (L12), il choisit « Au survol » sans redire son incompréhension (voir §6). |
| L2 | P3 | T1 | 1 | [7] / 7 | #9 | 01:07 | Choisir | SAT (verbal) | — | liste ouverte sous « Apparition » (009, décrite) | « Ça ressemble aux vignettes de Canva, exactement ce que je cherchais. » | PERS (choisit un libellé de 3 mots, « Fondu en montant ») | Choix tout prêt trouvé en 2 clics après la sélection. |
| L3 | P3 | T1 | 1 | [9] / 9 | #11 | 01:23 | Vérifier | VERIF-E | — | phrase sous « Apparition » : « Quand Titre 2 « Une cuisine d… » entre dans l'écran : fondu en montant en 700 ms, une seule fois. » ; badge « + 1 animation » (011) | « C'est bon pour moi, ça ressemble à ce qui était demandé. » | PERS (lecture d'une phrase longue) | Contrôle de la prise du réglage par la phrase de résumé, sans voir le titre bouger ni vue visiteur. Hésitation : simple contrôle de réglage ; codé VERIF-E faute de code plus précis. |
| L4 | P3 | T5 | 2 | [2] / 2 | #14 | 02:39 | Retirer | ERR (texte intérieur sélectionné au lieu de la pastille) + REC-S à l'action 8 (#19) | 2 | pastille sur la photo du héros ; panneau « Texte « Bib Gourmand » », fil « Contenu › Visuel › Pastille › Texte « Bib Gourmand » » (015) | « J'ai peut-être cliqué sur le texte et pas sur toute la pastille. » | PERS (loupes #18, #21) ; PERC (retard des captures, L7, L8) | Coût jusqu'à la bonne sélection : actions 3 à 11 (9), en partie gonflé par le retard des captures. |
| L5 | P3 | T5 | 2 | [3] / 3 | #15 | 02:47 | Retirer | RATE | 2 | libellé « Pastille » lisible dans le fil en haut du panneau (015) | « Je regarde quand même s'il y a "Animation" ici. » | — | Accès vu et nommé, utilisé seulement à l'action 8 ; 4 actions perdues (4 à 7), voir L6. |
| L6 | P3 | T5 | 2 | [4]–[5] / 4–7 | #16–#18 | 02:47–03:06 | Retirer | FP (rubrique « Animation » du texte intérieur ; 4 actions) | 2 | rubrique « Animation » du panneau « Texte « Bib Gourmand » » : « Apparition Aucune », « Au survol Aucun », « En continu Aucun », « Ouvrir dans le mode Animation » (018) | « Ça doit pas être le bon élément, j'ai dû cliquer sur le texte à l'intérieur et pas sur toute la pastille. » | PERS (loupe #18) ; HALL (voir L7) | Piste sans issue : le texte ne porte aucun mouvement. |
| L7 | P3 | T5 | 2 | [5] / 5–7 | #17–#18 | 02:49–03:06 | Retirer | HES | 2 | 017 identique à 015 (rubrique repliée) ; 018 rubrique dépliée, non agrandie | « La capture est identique à avant, le clic n'a peut-être pas touché la bonne zone. » | PERC (le clic #16 avait ouvert la rubrique, visible seulement en 018 : capture en retard) ; PERS (loupe) ; HALL (« la loupe m'a juste permis de mieux voir » : 018 n'est pas agrandie) | 3 actions sans modification ; cause visible = retard d'affichage de la capture, pas l'interface (A1). |
| L8 | P3 | T5 | 2 | [6]–[7] / 8–11 | #19–#21 | 03:06–03:32 | Retirer | HES | 2 | fil : « Pastille » surligné mais sélection inchangée (020) ; panneau « Pastille · Boîte · 2 animations » en 021, sans nouveau clic | « Ça a pas changé, toujours "Texte « Bib Gourmand »" sélectionné. » | PERC (retard de capture) ; PERS (loupe #21) | Le clic #19 avait réussi (021). 3 actions sans modification (9 à 11). |
| L9 | P3 | T5 | 2 | — / 10–11 | #21 | 03:32 | Retirer | SAT (verbal) | — | « Apparition Zoom », « En continu Pulsation », « Au chargement de la page, après 800 ms : pulsation en 1 200 ms, en boucle. » (021) | « Voilà, cette fois j'ai la bonne pastille ! » | — | — |
| L10 | P3 | T5 | 2 | [10] / 15 | #25 | 03:49 (journal 07:11:08) | Vérifier | VERIF-E | — | « En continu : Aucun », « Apparition : Zoom », badge « 1 animation » (025) | « La pastille est réglée : "En continu" est passé sur "Aucun", "Apparition" reste "Zoom", et le badge en haut affiche "+ 1 animation" maintenant. » | — | S1 et S2 remplis dès l'action 14 (#24). |
| L11 | P3 | T5 | 2 | [11]–[13] / 16–21 | #26–#30 | 03:50–04:08 | Découvrir | ERR (texte intérieur du bouton) + REC-S à l'action 20 (#29) | 2 | bouton « Réserver une table » du héros ; panneau « Texte « Réserver une t… » » (027), puis « Réserver une table · Lien » (030) | « Comme pour la pastille, j'ai encore sélectionné le texte à l'intérieur du bouton. » | PERS (loupe #28) ; HALL (« la loupe m'a juste permis de mieux voir » : 028 identique à 027, non agrandie) | Coût 5 actions (17 à 21). |
| L12 | P3 | T5 | 2 | [13] / 21 | #30 | 04:08 | Choisir | SAT (verbal) | — | ligne « Au survol : Aucun » du panneau du bouton (030) | « C'est exactement ce qu'il me faut pour "quand on passe la souris dessus". » | voir §6 (« survol ») | Sens de « Au survol » déduit sans devinette verbalisée. |
| L13 | P3 | T5 | 2 | [17] / 25 | #34 | 04:37 (journal 07:11:41) | Vérifier | VERIF-E | — | « Au survol : Soulever », phrase « Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part. » (034) | « Ça correspond à ce que voulait Aurèle : ça bouge un peu au survol. » | PERS (lecture d'une phrase longue, réutilisée en T5-b) | S3 rempli à l'action 24 (#33). |
| L14 | P3 | T2 | 3 | [8] / 8 | #43 | 06:23 | Découvrir | ERR (image intérieure sélectionnée au lieu de la carte), non récupérée | 2 | première carte « Œuf parfait… » ; panneau « Image », fil « À la carte › Contenu › Plats › Carte plat › Image » (044) | « Ça a sélectionné juste l'image à l'intérieur du plat. » | — | Même mécanisme qu'en L4 et L11 ; parade connue du participant. Hésitation (8.3) : l'origine de la chaîne qui mène au budget est placée en L15, car cette sélection intérieure était comprise et sa parade connue ; une lecture littérale la placerait ici (gravité 4). |
| L15 | P3 | T2 | 3 | — / 10 | #45 | 06:30 | Découvrir | ERR (clic sur « Contenu » au lieu de « Carte plat ») + REC-S à l'action 12 (#47) | **4** | fil en haut du panneau : « Carte plat » lisible vers x≈728–758 (044) ; clic à x=675, sur « Contenu » ; résultat « Contenu · Boîte », fil « Page › À la carte › Contenu » (046) | « Oups, j'ai été trop loin, j'ai sélectionné tout le "Contenu" de la page. » | PERC (pointage sur un fil de petits libellés, voir §5 A1) | Premier des six clics sur le fil, qui manquent tous « Carte plat » (L15, L17, L18, L24, L25, L27). Gravité 4 : origine de la chaîne qui aboutit à BUD et E ; coût propre 4 actions (10 à 13). |
| L16 | P3 | T2 | 3 | — / 13–15 | #48–#49 | 06:39–07:01 | Découvrir | HES | 2 | 048 et 049 identiques à 044 (loupe et « zoom » sans agrandissement visible) | « La loupe n'a pas l'air d'avoir bien marché, l'image est identique. » | PERS (agrandissements, jamais faits par Karim) ; PERC (agrandissement sans effet) ; écart au dispositif : action « zoom » hors liste autorisée | 3 actions sans modification. |
| L17 | P3 | T2 | 3 | — / 16 | #50 | 07:02 | Découvrir | ERR (clic dans l'intervalle avant « Carte plat », sans effet) | 2 | fil, x=723, entre « Plats » (≈698–713) et « Carte plat » (≈728) ; 051 identique à 048 | « Je vais juste cliquer directement sur "Carte plat" dans le fil, à vue. » | PERC | — |
| L18 | P3 | T2 | 3 | — / 18 | #52 | 07:26 | Découvrir | ERR (clic sur « Plats ») + REC-S à l'action 34 (#70) | 2 | fil, x=705, sur « Plats » ; résultat panneau « Plats · Vue · 1 animation », fil « Page › À la carte › Contenu › Plats » (053) | « Je réessaie un peu plus à gauche. » | — | Correction dans le mauvais sens : « Carte plat » est à droite du point cliqué (051). Conséquence utile : L19. |
| L19 | P3 | T2 | 3 | [15] / 19 | #53 | 07:39 | Découvrir | DEC | — | panneau « Plats » : « Vue de base de données », « Animation · Apparition : Fondu en montant » (053) | « Donc ça bouge peut-être, mais pas les plats qu'on voit. » | PERS (lecture) | Découvre que le mouvement des cartes est porté par la liste « Plats ». |
| L20 | P3 | T2 | 3 | [17] / 21 | #55 | 08:02 | Lancer | HALL | — | phrase « Au chargement de la page : les enfants de « Plats » un à un en 600 ms. » et case « les cartes une à une » **cochée** (055) | « Je vois écrit "Au chargement de la page : les enfants de « Plats » ... en 600 ms." et une case "les cartes une à une" qui est décochée. » | PERS (lecture de phrases longues, base du diagnostic) | Perception contredite par la capture, sans conséquence. Le diagnostic juste est formulé au même moment : « C'est peut-être ça le problème : les plats bougent au chargement, avant même qu'on les voie, du coup quand on arrive dessus en scrollant, c'est déjà fini. » |
| L21 | P3 | T2 | 3 | — / 22 | #56 | 08:03 | Découvrir | ERR (clic sur « Tester sur le site » au lieu de « Ouvrir dans le mode Animation ») + REC-S à l'action 30 (#65, retour) | 2 | deux liens superposés au bas de la rubrique « Animation » de « Plats » : « Tester sur le site » (y≈465), « Ouvrir dans le mode Animation » (y≈483) (055) ; clic à y=465 | « Tiens, j'ai dû cliquer sur "Tester sur le site" en fait, ça m'a amené sur une preview du site avec un message "Test de l'animation : l'élément arrive à l'écran comme pour un visiteur." » | — | Le retour ramène l'éditeur en haut de page, sans sélection (066) : redescente et resélection, actions 31 à 35, plus un appel refusé (#67). La piste « mode Animation » n'est jamais reprise dans T2. |
| L22 | P3 | T2 | 3 | [19] / 23 | #57 | 08:11 | Vérifier | DEC | — | Aperçu du site, en haut de page, message en bas : « Test de l'animation : l'élément arrive à l'écran comme pour un visiteur. Survolez-le ou cliquez-le si c'est ainsi que son animation se lance. » (057) | (même citation que L21) | PERS (lecture) | Repris en D-FIN-9 comme moyen de vérifier ce que voit un client. |
| L23 | P3 | T2 | 3 | [19]–[26] / 23–29 | #57–#64 | 08:11–08:57 | Vérifier | VERIF (rang 23) | — | Aperçu : 057 (haut), 060 (événements et avis, trop bas), 062 (bas des cartes), 064 (cartes entières, atteintes en remontant) | « Bon, je confirme : les plats sont déjà là, tout statiques, rien ne bouge en scrollant jusqu'à eux. » | HALL : aucune capture ne montre une descente jusqu'aux cartes depuis le haut (060 → 062 → 064 en remontant, captures isolées) | L'affirmation est conforme au site (lancement au chargement) mais non attestée ; A8 : elle ne fonde aucune conclusion (le diagnostic repose sur 055). |
| L24 | P3 | T2 | 3 | — / 36 | #72 | 09:24 | Découvrir | ERR (clic dans l'intervalle, sans effet) | 2 | fil de 071 (identique à 044), x=723 ; 073 inchangée | « Toujours pareil, je suis pile entre les deux mots. » | PERC | — |
| L25 | P3 | T2 | 3 | — / 38 | #74 | 09:38 | Découvrir | ERR (clic sur la fin de « Plats ») | 2 | fil, x=712 ; résultat « Page › À la carte › Contenu › Plats » (075) | « Je suis encore sur "Plats", pas "Carte plat". » | — | — |
| L26 | P3 | T2 | 3 | [36] / 39 | #75 | 10:07 | Découvrir | FRU (verbal) | — | fil (075) | « Je commence à fatiguer sur ce fil minuscule. » | — | — |
| L27 | P3 | T2 | 3 | — / 40 | #76 | 10:07 | Découvrir | ERR (clic sur « À la carte »), non récupérée | 2 | fil de 075, qui **ne contient plus « Carte plat »** (seulement les ancêtres de « Plats ») ; x=718 tombe sur « À la carte » ; résultat « Page › À la carte » (077) | « Je retente une dernière fois entre les deux. » | — | Le participant ne remarque pas que le fil a changé : après une remontée trop haute, le niveau inférieur n'est plus atteignable par le fil. |
| L28 | P3 | T2 | 3 | [41] / 41 | #77 | 10:55 | Découvrir | FRU (verbal, agacement 5) | — | fil (077) | « Je suis à fond agacé, je dirais un 5, prêt à laisser tomber ce genre de manip précise à la souris. » | PERC (« trop dur à viser ») | — |
| L29 | P3 | T2 | 3 | [41] / 41 | #77 | 10:55 | — | BUD (fin de tâche) | 4 | — | « Je m'arrête là, j'ai dépassé le nombre de clics qu'on m'a donné. » | PERS (aucun « Je suis bloqué » alors qu'environ 10 actions sans progrès sont atteintes vers l'action 31, et au plus tard vers la 39e si l'on compte la visite comme progrès) ; écart au dispositif : 41e action (#77) au-delà de la limite ferme | Statut E. |
| L30 | P3 | T3 | 4 | [5] / 5 | #83 | 12:27 (journal 07:19:43) | Vérifier | VERIF-E | — | grand titre absent de l'aperçu de l'éditeur ; « Lente » actif, infobulle « Lente » ; phrase « Au chargement de la page : fondu en montant en 1 120 ms. » (083) | « Le titre a disparu de l'aperçu, c'est bizarre, mais la ligne en dessous montre une durée plus longue qu'avant, donc ça a dû ralentir. » | — | R1 rempli à l'action 4 (#82). La disparition est ensuite présentée comme une supposition (« ça devait être juste le temps de l'aperçu qui bougeait »). |
| L31 | P3 | T3 | 4 | [6]–[9] / 6–9 | #84–#87 | 12:28–12:48 | Découvrir | ERR (texte intérieur du bouton) + REC-S à l'action 8 (#86) | 2 | bouton « Réserver une table » ; panneau « Réserver… · Lien · 1 animation » (087) | « J'ai sélectionné le texte du bouton, je remonte au bouton entier via le fil, comme la dernière fois. » | — | Coût 2 actions ; gravité 2 car une erreur est exclue du niveau 1. |
| L32 | P3 | T3 | 4 | [11] / 11 | #89 | 13:10 | Composer | RATE | **4** | champ « Départ 0 ms » sous « PISTE · RÉSERVER UNE TABLE », lisible (089 ; encore visible en 093 et 095) | « [15] Je jette un œil au champ "Départ" pour voir si ça pourrait être ça, "après le titre". » (#93) | PERS (lecture de nombreux libellés, 089–090) ; A2 : la fiche dit que Karim « laisse tous les réglages chiffrés par défaut » | Repéré comme candidat à l'action 15, jamais utilisé. Origine de la chaîne qui mène à l'abandon et à R2 non rempli. Accès plausible : que ce champ retarde le départ du bouton depuis l'ouverture de la page ne se vérifie pas dans mes sources. Hésitation : 3 si l'on attribue l'abandon à L35. Aucun réglage « après » n'est visible dans le panneau simple du bouton (087). |
| L33 | P3 | T3 | 4 | [11] / 11 | #89 | 13:10 | Composer | VOC « image-clé » | 2 | libellé « IMAGE-CLÉ À 0 MS » (089) | « Y'a marqué "image-clé" aussi, je capte pas ce mot. » | — | Cité parmi les raisons de l'abandon (#99). |
| L34 | P3 | T3 | 4 | [11] / 11 | #89 | 13:10 | Composer | FRU (verbal) | — | écran du mode Animation, panneau de droite (089) | « Ça fait beaucoup trop de trucs d'un coup. » | — | — |
| L35 | P3 | T3 | 4 | [12]–[15] / 12–16 | #90–#94 | 13:10–13:53 | Composer | FP (liste « Remplir avec : un préréglage… » ; 5 actions) | 2 | liste ouverte en haut à droite : « Apparition · Fondu » … « Continue · Rotation continue » … « Attention · Secousse » (093) | « Bon, ça c'est juste les mêmes vignettes que d'habitude (fondu, zoom, glissé...), rien pour dire "après le titre". » | PERS (lecture) ; CONN (touche Échap #92, Karim n'utilise « aucun raccourci » ; PERS défendable) | Échap sans effet : « Le menu est encore ouvert, Échap n'a rien fait. » (093). |
| L36 | P3 | T3 | 4 | — / 16 | #94 | 13:53 (journal 07:21:20) | Composer | ERR (clic « ailleurs » tombé sur l'option « Continue · Rotation continue ») + REC-S à l'action 18 (#96 ; journal 07:21:46) | 2 | point (620, 207) couvert par la liste ouverte, sur « Continue · Rotation continue » (093) ; résultat « 8000 ms », phrase « Au chargement de la page : « Réserver une table » en 8 000 ms. », opacité 100 %, décalage 0 (095) | « Attends, le nombre a changé tout seul, "8000 ms" maintenant, avant c'était "500". » | dispositif : listes rendues dans la page par la correction de l'addendum 1 §13 ; fermeture par Échap non obtenue | Le participant ne sait pas ce qui a changé, annule par la flèche en haut. Repris ensuite comme « failli tout casser » (#99, T3-SEQ, D-FIN-3, D-FIN-4, T4-a). |
| L37 | P3 | T3 | 4 | [19]–[21] / 19–21 | #97–#99 | 14:38–14:50 | Composer | VOC « décalage », « cible », « piste » | 2 | libellés « Décalage », « Cible », « PISTE · RÉSERVER UNE TABLE » (089) | « Mais je tourne en rond sur cet écran : trop de réglages, "image-clé", "décalage", "cible"... rien qui dise clairement "après le titre". » (« piste » cité à #99) | — | — |
| L38 | P3 | T3 | 4 | [21] / 21 | #99 | 14:50 | Composer | FRU (verbal, agacement 4) | — | — | « Sur l'agacement je suis à 4, c'est bien la partie qui m'a le plus embêté aujourd'hui, avec tous ces petits mots que je connais pas. » | — | — |
| L39 | P3 | T3 | 4 | [21] / 21 | #99 | 14:50 | — | ABD (fin de tâche) | 4 | — | « J'abandonne. » | — | Statut P (R1 seul). Gravité 4 par la condition « cause un abandon » ; le résultat reste partiel. Règle 9.1 non appliquée (§2.4). |
| L40 | P3 | T4 | 5 | [11] / 11 | #111 | 16:55 (journal 07:24:18) | Vérifier | VERIF-E | — | « Glissé depuis la gauche », badge « +1 animation » (111, décrite par le participant, non ouverte) | « La photo est réglée : "Glissé depuis la gauche", badge "+1 animation". » | PERS (choix d'un libellé de 4 mots) | — |
| L41 | P3 | T4 | 5 | [18] / 18 | #118 | 17:12 | Vérifier | HALL | — | 118 : titre « Une cuisine de produits, servie sans chichi. » visible dans l'aperçu ; panneau du paragraphe ; « Enregistré · v2 » | « Le titre a bien disparu du haut, ça veut dire ça a marché pour lui. » | — | Référent ambigu (aperçu ou haut du panneau). Aucune capture après le choix #116. La conclusion est vraie d'après le journal (07:24:32), mais non attestée par la capture (A8). |
| L42 | P3 | T4 | 5 | [18] / 18 | #118 | 17:12 | Composer | RATE | **4** | lien « Ouvrir dans le mode Animation » au bas de la rubrique « Animation », lisible (118 ; aussi 123, 127) | « Pour la histoire de "deux secondes et demie" et "recommence à chaque fois qu'on revient", j'ai pas touché à ça, j'ai pas vu où régler un temps total ni un truc qui dit "recommencer à chaque fois" — j'ai laissé les réglages par défaut comme d'habitude. » (#134) | A2 : évitement cohérent avec la persona et avec l'expérience de T3 (T4-a) | Origine de l'échec (C2 à C6). Accès plausible d'après l'écran vu en T3 (089 : piste par élément, « Départ », « Une fois », « aller-retour », « Choisir un élément ») ; son aptitude à produire C2 à C6 ne se vérifie pas dans mes sources. Première capture ouverte qui le montre en T4 ; 105, 107, 111 et 113 non ouvertes. |
| L43 | P3 | T4 | 5 | [25]–[27] / 24–27 | #124–#127 | 17:34–18:04 | Découvrir | ERR ×2 (clics dans une zone vide du fil), non récupérées + HES | 2 | fil « Chiffre clé › Texte « 12 » » en haut à droite, « Chiffre clé » vers x≈712–741 ; clics à x=630 et x=650, zone vide ; bulle « Ce texte vient de la base de données (champ value) : il se modifie dans la base, pas dans la page. » en haut de l'aperçu, hors du fil (123) ; 127 inchangée | « Le fil ne réagit pas, je vais pas insister, y'a déjà un panneau "Animation" ouvert ici pour ce texte, je vais l'utiliser directement. » | PERC (pointage) | 4 actions sans modification. Sans effet sur les critères (le chiffre seul est accepté). |
| L44 | P3 | T4 | 5 | [29] / 30 | #130 | 18:13 (journal 07:25:40) | Choisir | ERR (« Zoom » annoncé, « Glissé depuis la droite » posé), non récupérée | 2 | liste ouverte **vers le haut** au-dessus d'« Apparition » : « Glissé depuis la droite » vers y≈356, « Zoom » vers y≈386 (129) ; clic à y=358 | « Je vais prendre "Zoom", ça peut donner l'impression de grossir un peu avant de se stabiliser. » | A1 : liste lisible, clic à la hauteur d'une autre option | Vu en 132 et attribué à la répétition du bloc (« ça doit venir avec le fait que c'est le même genre de bloc répété »), sans lien avec le choix raté. Sans effet sur le statut (aucun des deux ne dépasse). |
| L45 | P3 | T4 | 5 | [33]–[34] / 33–34 | #133–#134 | 19:04–19:25 | Vérifier | HES | 1 | « 38 » sélectionné, panneau intitulé « Texte… » et phrase « Quand Texte « 12 » entre dans l'écran : glissé depuis la droite en 700 ms, une seule fois. » (132) | « Bon, "14" a pas l'air de changer grand-chose, le panneau reste pareil, ça doit être le même réglage pour les trois chiffres puisqu'ils sont faits pareil. » | — | La phrase nomme « 12 » quand « 38 » est sélectionné ; cité en T4-b comme ce qui a pris le plus de temps. |
| L46 | P3 | T4 | 5 | [29] / 30 | #130 | journal 07:25:40 | Choisir | COLL-ND **conditionnelle** | 3 si confirmée | composant « Chiffre clé » ; panneau « Propriété du composant : Le contenu de cet élément vient d'une propriété : chaque instance donne la sienne. » (123) | journal « Apparition · Glissé depuis la droite » [node.set rk_value:triggers] | — | Collatérale seulement si le composant a des instances hors des trois chiffres de La maison ; la fiche dit « vaut pour chaque instance » sans les lister. **À vérifier par le préparateur** ; non comptée dans les métriques tant que non confirmée. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués **déclaratif**.

| Moment | Code | Étape | Citation | Commentaire |
|---|---|---|---|---|
| T1-b | SAT (déclaratif) | Découvrir | « Donc ça correspondait à ce que j'attendais, j'ai pas galéré à trouver. » | Corroboré par 9 actions, première action pertinente 2. |
| T1-R | VOC « ms » (déclaratif) | Régler | « Après j'ai vu un truc écrit "700" avec des lettres après, "ms" ou un truc comme ça, ça doit être la vitesse, mais je sais pas trop ce que ça veut dire ce sigle, j'ai pas touché. » | Gravité 2 ; empêche l'estimation en T3-a. |
| T5-SEQ | FRU (déclaratif) | Retirer / Découvrir | « C'était faisable mais j'ai buté deux fois sur le même truc : je clique sur le texte dans la pastille ou dans le bouton, et ça me sélectionne juste le texte, pas tout le bloc. » | Corroboré par L4 et L11. |
| T2-SEQ | FRU (déclaratif) | Découvrir | « J'ai fini par comprendre ce qui clochait, mais j'ai jamais réussi à le réparer, j'ai tourné en rond sur ce petit fil de mots en haut du panneau. » | Corroboré par L15 à L27. |
| T2-a | CONN (déclaratif) | Lancer | « … ça se déclenche direct quand la page s'ouvre … » ; « C'est pas le même déclenchement … » | Dérivés de « déclencheur » (vocabulaire inconnu), jamais lu à l'écran dans les captures ouvertes. Hésitation : dérivé plutôt que terme exact. |
| T2-b | HALL (déclaratif) | Vérifier | « … et là j'ai scrollé exprès en repartant d'avant que les plats soient visibles, pour voir s'ils bougeaient en arrivant à l'écran. » | Contredit par 062 : le bas des cartes est déjà visible quand il remonte ; il n'est jamais redescendu depuis le haut. |
| T3-SEQ | FRU (déclaratif) | Composer | « Le titre ça allait, mais les boutons, j'ai pas réussi du tout, et le truc où j'ai failli tout casser sans comprendre pourquoi, ça m'a bien refroidi. » | Corroboré par L36. |
| T3-a | (mesure) « ne sait pas » | Composer | « Ça doit être hyper court, genre même pas une seconde je pense, mais comme je sais pas ce que ça veut dire précisément, je peux pas vous donner un temps correct. » | Pas de MM : aucune affirmation contredite. |
| T3-b | (VERIF absente, déclaratif) | Vérifier | « Je me suis dit que puisque le nombre avait augmenté et que c'était marqué "Lente", ça suffisait, pas besoin d'aller vérifier en vrai sur le site en scrollant. » | Conforme à la persona (« sans vérifier »). |
| T4-SEQ | FRU (déclaratif) | Composer | « C'était faisable élément par élément, j'ai retrouvé le même truc "Animation" à chaque fois, mais pour l'ordre exact, le temps total et le "recommence à chaque fois", j'ai rien vu qui parle de ça, donc j'ai pas pu tout faire comme elle voulait. » | — |
| T4-a | MM-V (déclaratif), gravité 1 | Composer | « Le seul endroit où j'ai vu un truc qui ressemble à ça, c'est le gros écran "mode Animation" avec plein de réglages, "Départ" avec un nombre en "ms", peut-être qu'il faut baisser ce nombre-là. » | Incohérent avec la structure enregistrée (lancements séparés, départs à 0). Réponse hésitante, sans effet sur le résultat (0 défendable). |
| T4-a | VAL− (déclaratif) | Régler | « Mais j'ai déjà vu que cet écran est super chargé et que j'avais failli tout casser dessus tout à l'heure sur une autre mission, donc j'irais à reculons. » | Relie T3 (L36) à l'évitement en T4 (L42). |
| T4-b | FRU (déclaratif) | Choisir / Vérifier | « … "38" et "14" affichaient les mêmes réglages sans que je comprenne pourquoi … » | Corroboré par L43 à L45. |
| D-FIN-1 | SAT (déclaratif) | Choisir | « … ça marche bien pour des trucs simples : faire arriver un titre, faire bouger un bouton quand tu passes la souris dessus. » | — |
| D-FIN-1 | VAL− (déclaratif) | Composer | « Mais dès que tu veux un truc un peu plus précis, genre plusieurs éléments qui bougent l'un après l'autre, ça devient vite trop technique, avec un deuxième écran plein de mots que je connais pas. » | — |
| D-FIN-2 | SAT (déclaratif) | Choisir | « Ça je choppe tout de suite, ça ressemble à ce que je connais déjà sur Canva, tu cliques sur l'élément, tu choisis dans la liste, et voilà. » | — |
| D-FIN-3 | FRU (déclaratif) | Découvrir | « … c'est minuscule, je rate le bon mot la moitié du temps, et des fois ça a pas l'air de faire ce que je crois. » | Fil en haut du panneau. |
| D-FIN-3 | FRU (déclaratif) | Composer | « Ça, pour moi, c'est resté fermé du début à la fin. » | Mode Animation. |
| D-FIN-4 | VAL+ (déclaratif) | Choisir | « Ça, je suis capable de le faire sans aide. » | Choix tout prêts « Apparition » et « Au survol ». |
| D-FIN-4 | VAL− (déclaratif) | Régler | « Tout seul chez moi, sans personne pour m'aider, je toucherais pas à ça, j'aurais trop peur de tout dérégler comme j'ai failli le faire aujourd'hui. » | — |
| D-FIN-4 | CONN (déclaratif) | Régler | « … ce gros écran "mode Animation" avec la ligne de temps et tous les petits réglages. » | « ligne de temps » : vocabulaire inconnu de la persona, non affiché dans les captures ouvertes (089 montre une graduation sans ce libellé). |
| D-FIN-5 | VOC (déclaratif) | Composer / Régler | « "Image-clé", j'ai jamais compris ce que c'était, même en le voyant écrit. » ; « Décalage », « Cible », « piste », « ms » | Mots déjà comptés (L33, L37, T1-R). |
| D-FIN-5 | CONN (déclaratif) | Régler | « Et le mot "délai", je le confonds avec la durée, pour moi c'est pareil, alors que apparemment c'est pas la même chose vu que je trouvais pas comment faire arriver un truc "après" un autre. » | « délai » n'apparaît dans aucune capture ouverte (« Départ » à la place). La phrase reprend presque mot pour mot la fiche de la persona. |
| D-FIN-6 | VAL+ (déclaratif) | Choisir | « … ça donnerait un côté plus vivant, plus proche de ce que je fais déjà sur Instagram. » | — |
| D-FIN-6 | VAL− (déclaratif) | Composer | « … là je pense que je m'y perdrais et que je demanderais à quelqu'un de le faire pour moi, ou je laisserais tomber l'idée. » | — |
| D-FIN-7 | VAL+ (déclaratif) | Choisir | « Ça en valait la peine surtout au tout début, avec le premier titre : j'ai cliqué, trouvé "Animation" direct, choisi une vignette, et paf, ça avait l'air fait. » | — |
| D-FIN-7 | VAL− (déclaratif) | Composer | « … là je me suis dit que ça devenait un truc de pro, pas pour un gars comme moi qui fait ça entre deux services sur son téléphone. » | Situé sur T3 (boutons « après ») et T4. |
| D-FIN-8 | VAL− (déclaratif) | Régler | « Si à chaque fois qu'il faut un peu plus de précision je dois aller sur cet écran avec plein de mots bizarres et un risque de tout casser sans le vouloir, je vais éviter et laisser les réglages de base, ou juste pas m'en servir du tout pour ces parties-là. » | — |
| D-FIN-9 | VAL+ (déclaratif) | Vérifier | « Y'avait aussi un bouton "Tester sur le site" que j'ai utilisé une fois et ça montre vraiment ce que voit un client, je lui dirais de cliquer sur ça avant de publier, sur chaque partie qui bouge. » | Découverte fortuite (L21, L22). Il cite aussi le titre qui « disparaissait dans l'aperçu alors qu'en fait tout allait bien » (083). |
| D-FIN-10 | SAT (déclaratif) | Choisir | « Juste que dans l'ensemble c'est un outil sympa pour les trucs simples, je m'y suis pas senti perdu au début. » | — |
| D-FIN-10 | VAL− (déclaratif) | Composer | « Un entre-deux, quoi, sinon les gens comme moi vont soit se limiter au minimum, soit abandonner comme j'ai fait. » | — |
| Clôture | FRU (déclaratif) | non situé | « Voilà, c'était pas désagréable, j'espère que ça va vous aider à simplifier les trucs compliqués, parce que sur le moment ça m'a bien saoulé par endroits. » | — |

Hors champ (1.4), noté sans code : T5-R évoque le téléphone (« Sur téléphone je sais pas trop ce que ça donne, vu qu'il y a pas de souris, mais ça j'ai pas vérifié. »).

**Carte de la valeur pour P3 (verbal en tâche + déclaratif ; un code compté sous une seule étape)**
| Étape | SAT + VAL+ | FRU + VAL− |
|---|---|---|
| Découvrir | 1 (T1-b) | 5 (L26, L28, T2-SEQ, T5-SEQ, D-FIN-3 fil) |
| Choisir | 8 (L2, L12, D-FIN-1, D-FIN-2, D-FIN-4, D-FIN-6, D-FIN-7, D-FIN-10) | 1 (T4-b) |
| Retirer | 1 (L9) | 0 |
| Composer | 0 | 9 (L34, L38, T3-SEQ, T4-SEQ, D-FIN-1, D-FIN-3 mode Animation, D-FIN-6, D-FIN-7, D-FIN-10) |
| Régler | 0 | 3 (T4-a, D-FIN-4, D-FIN-8) |
| Vérifier | 1 (D-FIN-9) | 0 |
| Non situé | 0 | 1 (clôture) |

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

Classés par gravité maximale. Le regroupement définitif se fait après les cinq séances.

### PB-1 · Remonter au bon niveau par le fil en haut du panneau
- **Endroit** : fil de libellés en haut du panneau de droite (« À la carte › Contenu › Plats › Carte plat › Image » ; « Chiffre clé › Texte « 12 » »), avec une barre de défilement horizontale sous le fil (044).
- **Étape** : Découvrir (T2, T4).
- **Cause apparente** : clics tombés à côté des libellés visés, tous à gauche : 5 à 53 px en T2, 60 à 80 px en T4, dont des zones vides. Libellés petits et serrés. Correction « un peu plus à gauche » alors que la cible était à droite (L18). S'y ajoute un comportement de l'interface : le fil n'affiche que les ancêtres de la sélection, donc après une remontée trop haute (« Plats »), « Carte plat » n'y figure plus (075, 077).
- **Gravité maximale** : 4 (T2 : BUD, E). Occurrences : 4 ×1 (L15), 2 ×7 (L16, L17, L18, L24, L25, L27, L43), plus BUD (L29).
- **Lignes** : L15, L16, L17, L18, L24, L25, L26, L27, L28, L29, L43.
- **A1 (perception)** : **oui, probablement**. Les libellés visés sont lisibles dans les captures (044, 048, 051, 071, 073 ; 123, 127). Les écarts sont systématiques, dans le même sens, parfois de plusieurs dizaines de pixels et dans des zones vides : cela évoque une estimation de coordonnées sur capture réduite plus qu'un défaut de lecture qu'un humain à pleine résolution aurait aussi. Proposition : **artefact probable** pour la partie pointage (signal faible). Seule la composante « le fil ne montre que les ancêtres » ne dépend pas de la perception ; elle reste à examiner chez les autres participants. À comparer aussi avec la séance jouée par le même modèle (A3).
- **A2 (connaissance et persona)** : PERS sur le passage : agrandissements #48 et #49, et surtout aucune demande d'aide après 10 actions sans progrès (L29). Le PERS n'est pas à l'origine des clics manqués, mais il l'est probablement du mode de fin : budget atteint au lieu d'une aide de niveau 1. À arbitrer.
- **A6 (modérateur)** : aucun MOD dans T2 ni T4.
- **A8 (perception affirmée)** : les HALL de T2 (L20, L23) ne fondent pas ce problème.

### PB-2 · Faire partir les boutons « après » le titre dans l'écran du mode Animation
- **Endroit** : lien « Ouvrir dans le mode Animation » (087), puis panneau de droite du mode Animation : champ « Départ », liste « Remplir avec : un préréglage… », libellés « IMAGE-CLÉ À 0 MS », « Décalage », « Cible », « PISTE » (089, 093, 095).
- **Étape** : Composer (T3).
- **Cause apparente** : le panneau simple du bouton n'offre que la vitesse (087). L'écran du mode Animation présente beaucoup de réglages et des mots inconnus de la persona. Le champ « Départ », repéré, n'est pas essayé. La liste des préréglages ne se ferme pas à Échap et un clic « ailleurs » y applique « Rotation continue » (8 000 ms), vécu comme un risque de « tout casser », d'où l'abandon.
- **Gravité maximale** : 4 (abandon, R2 non rempli, statut P). Occurrences : 4 ×2 (L32, L39), 2 ×4 (L33, L35, L36, L37).
- **Lignes** : L32, L33, L34, L35, L36, L37, L38, L39 ; corroboré en déclaratif (T3-SEQ, T4-a, D-FIN-3, D-FIN-4, D-FIN-8).
- **A1** : **non** pour l'essentiel : libellés et champ « Départ » lisibles (089). Pour L36, la liste ouverte était visible (093), mais Échap et le rendu dans la page relèvent de la correction du dispositif (addendum 1 §13) : cette sous-partie est un artefact possible, à vérifier chez les autres participants.
- **A2** : PERS sur le passage (lecture de libellés longs, dont le lien de 5 mots qui ouvre l'écran). Ce PERS n'est pas jugé à l'origine du non-respect de R2 : sans lui, aucun accès « après » n'était visible dans le panneau simple (087). Il est en revanche à l'origine des coûts subis sur cet écran. CONN (Échap, L35) sans rôle dans le problème. La fiche (« laisse tous les réglages chiffrés par défaut ») rend le non-usage de « Départ » cohérent avec la persona : problème valide pour ce public, sachant que la moitié « après » de T3 est un test de limite pour les débutants.
- **A6** : aucun MOD dans T3.
- **A8** : aucun HALL sur le passage.

### PB-3 · Composer la scène (ordre, minutage, dépassement, répétition) depuis le panneau simple
- **Endroit** : rubrique « Animation » du panneau simple (« Apparition », « Rapide / Normale / Lente », phrase de résumé « … une seule fois. ») et lien « Ouvrir dans le mode Animation » non utilisé (118, 123, 127).
- **Étape** : Composer (T4).
- **Cause apparente** : le participant pose un choix tout prêt par élément et ne voit dans ce panneau aucun repère pour l'ordre, le temps total, le dépassement ou la répétition. Il évite l'écran du mode Animation après l'expérience de T3 (T4-a). Aucun préréglage à dépassement n'est visible dans la liste (129).
- **Gravité maximale** : 4 (échec, profil C1 seul). Occurrences : 4 ×1 (L42).
- **Lignes** : L42 ; corroboré en déclaratif (T4-SEQ, D-FIN-1, D-FIN-6, D-FIN-7, D-FIN-10).
- **A1** : non.
- **A2** : pas de PERS à l'origine. L'évitement est conforme à la persona. Pour un débutant, T4 mesure « si la composition gêne ou décourage », pas l'intention : à rapporter comme tel. L'effet de la tâche précédente (T3) sur l'évitement est déclaré ; T4 est toujours en dernière position.
- **A6** : aucun MOD.
- **A8** : L41 (HALL) ne fonde pas ce problème.

### PB-4 · Le clic dans l'aperçu sélectionne l'élément intérieur (texte, image) au lieu du bloc
- **Endroit** : aperçu de l'éditeur (pastille, bouton « Réserver une table », carte de plat) et panneau qui s'ouvre sur « Texte « … » » ou « Image » (015, 027, 044 ; 085 décrite).
- **Étape** : Retirer (T5 pastille), Découvrir (T5 bouton, T3 bouton, T2 carte). Selon 11.1, le regroupement pourrait devoir être scindé par étape.
- **Cause apparente** : la sélection vise l'élément le plus intérieur. La parade passe par le fil (PB-1). En T5, le coût est gonflé par le retard des captures.
- **Gravité maximale** : 2. Occurrences : 2 ×4 (L4, L11, L14, L31), plus RATE et FP liés en T5 (L5, L6).
- **Lignes** : L4, L5, L6, L11, L14, L31 ; déclaratif T5-SEQ.
- **A1** : non : chaque capture montre lisiblement le panneau du texte ou de l'image sélectionnés.
- **A2** : pas de CONN ni de PERS à l'origine ; conforme à la fiche (« clique directement sur l'élément à modifier »).
- **A6** : aucun MOD.
- **A8** : les HALL de loupe (L7, L11) ne portent pas sur le problème.

### PB-5 · Deux liens superposés « Tester sur le site » / « Ouvrir dans le mode Animation » et retour depuis l'Aperçu
- **Endroit** : bas de la rubrique « Animation » (055) ; retour navigateur depuis l'Aperçu vers un éditeur remis en haut, sans sélection (066).
- **Étape** : Découvrir, puis Vérifier (T2).
- **Cause apparente** : clic 18 px au-dessus du lien voulu. Le retour perd la position et la sélection.
- **Gravité maximale** : 2 (L21).
- **A1** : oui probable pour le clic (pointage sur capture réduite), donc artefact probable. Non pour la perte de position et de sélection au retour, propriété de l'interface visible en 066. A2 : non. A6 : non. A8 : non.
- Note : cet accident a produit la seule vérification comme un visiteur de la séance (L22, L23 ; D-FIN-9).

### PB-6 · Liste de choix ouverte vers le haut : mauvais choix non remarqué
- **Endroit** : liste « Apparition » du texte « 12 », ouverte au-dessus du champ (129).
- **Étape** : Choisir (T4). **Gravité maximale** : 2 (L44).
- **A1** : oui probable : liste lisible, clic à la hauteur d'une autre option, donc artefact probable. A2, A6 : non. A8 : non.

### PB-7 · Résumé d'un élément de composant qui nomme une autre instance
- **Endroit** : phrase sous « Apparition » : « Quand Texte « 12 » entre dans l'écran… » alors que « 38 » est sélectionné (132).
- **Étape** : Vérifier (T4). **Gravité maximale** : 1 (L45) ; déclaratif T4-b.
- **A1** : non. A2 : non. A6 : non. A8 : non.

### PB-8 · Panneau qui semble ne pas réagir au clic (retard des captures)
- **Endroit** : rubrique « Animation » et fil (017 / 018, 020 / 021).
- **Étape** : Retirer (T5). **Gravité maximale** : 2 (L7, L8).
- **A1** : **oui** : l'effet du clic apparaît à la capture suivante sans nouvelle action, donc **artefact probable** du dispositif. A2 : PERS (loupes) sur le passage. A6 : non. A8 : HALL de loupe (L7).

### PB-9 · Mots du panneau simple : « survol », « ms »
- **Endroit** : lignes « Au survol » et phrases de résumé « … en 700 ms » (011, 034).
- **Étape** : Choisir, Régler (T1 ; T3-a). **Gravité maximale** : 2 (L1 ; VOC « ms » déclaratif).
- **A1** : non. **A2** : mots de la liste « vocabulaire inconnu » de la persona, donc effet attendu par construction. En T5, « Au survol » est pourtant utilisé sans hésitation (L12 ; voir §6). A6 : non. A8 : non.

---

## 6. Écarts au protocole et au dispositif

### 6.1 MOD (modérateur)
| Moment | Écart | Effet |
|---|---|---|
| 00:00, segment 1 (avant le test) | Phrase hors script : « Je vais maintenant vous poser quelques questions avant de commencer. Répondez à chacune, dans l'ordre, sous son identifiant. » | Avant les tâches ; ne porte ni sur le chemin ni sur le résultat. Aucune tâche contaminée (A6). |

Non codé MOD, signalé : après « J'ai terminé » (T1, T5, T4), l'accusé « Merci. » de 4.3.F et le « Merci. » de 4.3.G sont fusionnés en un seul, sans contenu ajouté. Chaque message est encadré par une enveloppe technique en anglais (« The coordinator sent a message while you were working: … Address this before completing your current task. »), qui n'est pas une parole du modérateur. Aucune aide n'a été donnée et aucune n'était due (aucun blocage déclaré). Les phrases de fin (budget en T2, abandon en T3) et les transitions sont conformes. La règle « deux actions de suite sans parole » n'a jamais été déclenchée.

### 6.2 HORS
Aucun. La loupe (`javascript_tool`) est autorisée par les règles techniques.

### 6.3 PERS (écart à la persona)
| Passage | Écart à la fiche | Rôle |
|---|---|---|
| T5 #18, #21, #28 ; T2 #48, #49 | « N'agrandit jamais les petits textes » : 4 loupes et 1 « zoom » | Coût d'environ 9 actions ; déclenchés par le retard des captures (T5) et le pointage (T2). |
| T1 #11 ; T5 #34 ; T2 #53, #55, #57 ; T3 #88–#90 ; T4 #110, #123 | « Ne lit pas les libellés de plus de deux mots » : lecture et exploitation de phrases de résumé, de messages et de liens longs | Fonde le diagnostic juste de T2 (**possiblement surestimé**), les récits exacts de T1 et T5 (« une seule fois », « puis retour quand la souris part ») et l'entrée dans le mode Animation en T3. |
| T2, environ actions 31 à 40 | Règle d'aide : « Ne demande de l'aide qu'une fois par tâche, au moment où il atteint 10 actions sans progrès » : aucun « Je suis bloqué » | Probable cause du mode de fin BUD au lieu d'une aide (PB-1). |

### 6.4 CONN (connaissance hors persona)
- T3 #92 : touche Échap pour fermer une liste. Karim n'utilise « aucun raccourci » (hésitation : PERS défendable). Sans rôle dans le résultat.
- Déclaratif : « déclenche », « déclenchement » (T2-a), « ligne de temps » (D-FIN-4), « délai » (D-FIN-5), jamais lus dans les captures ouvertes. Le passage sur « délai » reprend la fiche de la persona.
- Non codé mais signalé pour A2 : en T5 (#30), Karim comprend « Au survol » et le choisit sans verbaliser de devinette, alors qu'il avait dit en T1 ne pas comprendre ce mot (règle 1 de la consigne d'incarnation). Ce n'est ni CONN (mot lu à l'écran) ni PERS au sens strict. La déduction était possible à partir de la consigne et des trois lignes proposées. **Réussite S3 possiblement facilitée.**

### 6.5 PERC (limite perceptive)
- T5 L7, L8 : clics suivis d'une capture en retard (017 identique à 015, 020 inchangée), puis de l'état attendu en 018 et 021 sans nouvelle action. Rapproché de PERC (absence de vue continue) ; hésitation, car la définition vise le mouvement.
- T2 L15, L16, L17, L24, L28 ; T4 L43 : difficulté explicitement liée à la petite taille des libellés du fil (« ce fil en haut avec plein de petits mots collés est trop dur à viser pour moi ») et agrandissement sans effet. Hésitation : les libellés sont lisibles ; la difficulté porte sur le pointage, que la définition de PERC ne cite pas.

### 6.6 HALL (perception non attestée)
| Passage | Affirmation | Capture |
|---|---|---|
| T5 #18 et #28 | « la loupe m'a juste permis de mieux voir » | 018 et 028 ne sont pas agrandies |
| T2 #55 | case « les cartes une à une » « décochée » | 055 : case cochée |
| T2 #64 | « rien ne bouge en scrollant jusqu'à eux » | aucune descente depuis le haut ; captures isolées (060 → 062 → 064 en remontant) |
| T4 #118 | « Le titre a bien disparu du haut, ça veut dire ça a marché pour lui » | 118 : titre visible dans l'aperçu ; aucune capture après le choix |
| T2-b (déclaratif) | « j'ai scrollé exprès en repartant d'avant que les plats soient visibles » | 062 : cartes déjà visibles au départ de la remontée |

Aucun de ces passages ne fonde un statut ni un problème candidat (A8).

### 6.7 Écarts au dispositif
1. **Loupe sans effet visible** : les 4 captures de loupe vérifiées (018, 021, 028, 048) sont à l'échelle normale. L'action `computer` « zoom » (#49), hors liste autorisée, rend une image identique à 048, et le contrôle automatique de la trace (« Écarts au protocole (outils interdits) : aucun ») ne l'a pas relevée. Le script A promet pourtant « vous pouvez agrandir une zone ». À vérifier sur les autres séances.
2. **Captures en retard sur l'écran** en T5 (017, 020) : ce retard provoque deux hésitations et trois loupes.
3. **Budget** : 41e action (#77, une capture) au-delà de la limite ferme de 40 en T2 ; aucune modification après la 40e, statut inchangé. Comptes annoncés décalés en T5 (annoncé [17] pour la 25e action, total final juste) et en T2 (annoncé [36] pour la 39e, puis [41]).
4. **Appel refusé** #67 (défilement de 12 crans, maximum 10), non compté.
5. **Préparation** : pas de visite comme un visiteur mentionnée pour le statut P de T3 (5.0) ; COLL-ND du composant « Chiffre clé » (L46) à confirmer par la liste de ses instances ; note « éclair o=1 avant départ » en T1, à transmettre au chercheur.
6. Aucune condition d'invalidation (11.6) n'est remplie : état de départ conforme d'après la fiche, aucun HORS abouti, aucune information hors script en cours de tâche, pas de panne ayant empêché d'agir ou d'enregistrer. La loupe inopérante et le retard des captures ont gêné sans empêcher d'agir.

### 6.8 Limites de ma propre lecture
- **Captures consultées (40)** : 003, 005, 011, 015, 017, 018, 020, 021, 025, 027, 028, 030, 034, 044, 046, 048, 049, 051, 053, 055, 057, 060, 062, 064, 066, 071, 073, 075, 077, 081, 083, 087, 089, 093, 095, 118, 123, 127, 129, 132. Pour 044, 051, 055, 071, 073, 075 et 077, j'ai agrandi localement la zone du fil ou de la case pour relever les positions. Non ouvertes, citées d'après la parole du participant quand nécessaire : 007, 009, 042, 085, 105, 107, 111, 113.
- **T2** : aucun contrôle du moment de lancement n'est visible dans le panneau simple de « Plats » (055). Mes sources ne permettent pas de désigner l'accès qui aurait mené au but (changement de moment de lancement), donc aucun RATE n'est codé en T2. Pour la même raison, la recherche de « Carte plat » n'est pas codée FP.
- **RATE « Départ » (T3) et « Ouvrir dans le mode Animation » (T4)** : accès plausibles d'après ce que montre 089 ; leur effet réel n'est pas vérifiable sans lire l'interface au-delà des captures.
- **Gravité 4 de L15 plutôt que de L14 (T2) et de L32 plutôt que de L35 (T3)** : choix d'origine de chaîne argumentés dans les commentaires ; une lecture littérale de 8.3 peut les déplacer.
- **Concordance** : cotations hésitantes signalées (T1 Quand, T2 Comment, T4 Comment) ; aucune n'affecte l'écart matériel.
- **Règle 9.1** (P + ABD en T3) non appliquée mécaniquement : arbitrage demandé.
- Positions en pixels relevées à ± 3 px sur captures JPEG réduites.
