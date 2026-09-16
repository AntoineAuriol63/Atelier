# Observation · P1 · Nathalie Besson (débutante) · vague 3

Codage par l'observateur, d'après le protocole remis à l'observateur (§ 3, 4.3, 4.4, 5, 8, 9, 11), l'addendum 3, la trace `traces3/trace-p1.md`, les captures `shots3/p1-t1` à `p1-t5` et la fiche de lecture `fiches3/fiche-lecture-p1.md`.

Repères de lecture utilisés dans tout le document :
- **n° d'action** = compte de la participante (remis à zéro à chaque mission) ; **n° d'appel** = numéro « ▶ #n » de la trace, continu sur la séance.
- Correspondance des bornes : T1 = appels #1–#48 (31 actions) ; T2 = #49–#110 (40) ; T3 = #111–#149 (27) ; T5 = #150–#210 (40) ; T4 = #211–#267 (40). Les 178 commandes du navigateur de test correspondent exactement aux 178 actions déclarées ; les 89 ouvertures d'image (👁) ne comptent pas.
- 43 captures ouvertes par l'observateur (limite indicative de 40 légèrement dépassée pour vérifier les affirmations de T2 et T3).
- Les lignes 🧠 sont de la pensée restituée, partielle : toute citation 🧠 est signalée comme telle et l'incertitude est portée en commentaire.

---

## 1. Résumé de la séance

P1 a passé les cinq missions dans l'ordre T1, T2, T3, T5, T4, sans jamais dire « je suis bloquée » : **aucune aide n'a été donnée, à aucun niveau**. Elle a trouvé seule l'onglet « Animation », l'encadré « Comment ça marche », puis, dans chaque mission, l'accès au mouvement de l'élément visé entre la 5e et la 13e action. Elle a produit un résultat conforme aux critères dans trois missions sur cinq (T1, T2, T5 : réussite complète), un résultat partiel en T3 et un échec en T4. Deux missions se terminent au budget de 40 actions (T2, T4), une par abandon (T3), deux par « J'ai terminé » (T1, T5). Le moteur de sa compréhension a été la phrase de résumé en français en haut du panneau : elle lui doit le diagnostic juste de T2, la correction de son erreur « À la souris » en T5 et la mise en ordre de T4. Trois obstacles reviennent : le grand panneau détaillé, qui s'ouvre d'office et ne propose aucun contrôle du moment de lancement ; la disparition, dans le canevas, de tout élément dont la piste démarre après la tête de lecture, qu'elle a prise pour une casse et qui a causé l'abandon de T3 ; et un Ctrl+Z qui ne défait pas ce qu'elle vient de faire (validations en double dans le journal). Elle n'a jamais vu une animation se jouer : toutes ses vérifications se font par lecture de la phrase de résumé ou par comparaison de deux captures. Un seul écart matériel de récit, en T2, où elle croit n'avoir corrigé qu'un plat sur trois alors que le site en corrige trois : c'est une **réussite non comprise**.

---

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut.** Site final v3 : déclencheur `k1HK9mHVAggi · on=inView` sur `rh_about_h2`, animation « Fondu » preset `fade`, 700 ms, une seule fois, images-clés `0ms {opacity:0}` → `700ms {opacity:1}`.
- R1 mouvement d'arrivée visible : opacité de départ 0 ≤ 0,5 → **rempli**.
- R2 lancé à l'arrivée à l'écran du titre : `on=inView` sur le titre lui-même → **rempli**.
- R3 durée totale = retard 0 + 700 ms = 700 ms ∈ [200 ; 2 500] → **rempli**.
- R4 aucun mouvement permanent sur le titre → **rempli**.
- R5 animations du site 41 → 42 : une seule ajoutée, dans La maison → **rempli**.
→ Réussite complète, aucune aide → **statut C**. **Accord avec le statut proposé par le préparateur (C)** : les cinq critères sont lus directement dans le site enregistré et la visite confirme o = 0 avant l'entrée puis 0 → 1 en ~670 ms.

**Mode de fin.** Terminé déclaré (« J'ai terminé », 11:02). **Aides reçues** : aucune (niveau 0). Aucun BLOC.

**Métriques (9.2).**
| Métrique | Valeur |
|---|---|
| Actions totales | 31 (compte participante) ; appels #1–#48, dont 17 ouvertures d'image |
| Actions perdues au dispositif | ≈ 3 (actions 29, 30, 31 : remonter, redescendre, capturer pour tenter de voir le fondu) ; + 3 loupes, dont une part relève de l'habitude de la persona |
| Première action pertinente | **7** (clic sur le titre → capture 005 : bloc « ANIMATIONS LANCÉES PAR TITRE 2 « UNE CUISINE DE… » ») |
| Actions jusqu'à la réussite | **22** (clic « + Ajouter » → journal 13:13:58 v3 « Animation · Fondu ») |
| Captures / loupes | 14 / 3 |
| FP et actions perdues | 1 FP, 4 actions (actions 10–13 : bouton bleu « Animer « Titre 2 » » → grand panneau → Ctrl+Z) |
| HES | 1 (actions 29–31) |
| ERR (dont non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 3 (voir lignes T1-04, T1-06, T1-09) |
| VERIF / VERIF-E | **VERIF**, premier rang **25** (clic « Aperçu » → onglet du site sans outils d'édition, descente jusqu'à La maison), avant « J'ai terminé » |
| Mots VOC (premières occurrences de la séance) | survol, défilement, images-clés, ligne de temps, canevas, calques, ms, opacité, décalage, piste, préréglage, « à composer » (12) |
| SEQ | 3 |

**Concordance du récit (9.4).** Récit T1-R comparé au site v3.
| Dimension | Note | Justification |
|---|---|---|
| Quoi | 2 | « le titre … apparaît en fondu » et « Le reste de la page ne bouge pas » : exact, rien en trop (une seule animation ajoutée au site). |
| Quand | 2 | « Quand il arrive à la partie « La maison » » = `on=inView` : exact. |
| Comment | 2 | « en fondu » = preset `fade` : exact. |
| Combien | 1 | Nombre de fois exact (« une seule fois » = `une fois`) ; durée non donnée (« Combien de temps dure le fondu, je ne peux pas vous le dire »). |
| **Total** | **7/8** | |
**Écart matériel : non.** Aucune affirmation fausse sur Quoi, Quand ni le nombre de fois ; la seule lacune est une omission assumée sur la durée.

**Mesures propres (section 5).** Première action pertinente = 7. Code VERIF avant « J'ai terminé » = **oui** (rang 25). Moment de lancement choisi = « À l'entrée dans l'écran » (capture 011 : l'option était déjà cochée avant son clic).

---

### T2 · Ce que voit vraiment le client (position 2)

**Statut.** Site final v1 : le déclencheur d'origine `nK9JEd39KM11 · on=load` sur « Plats » (enfants) subsiste ; ajout d'un déclencheur `yIZkP0Q8dZs8 · on=inView` sur **« Carte plat » `rh_dishes_item`** (modèle de carte de la collection), « Fondu en montant » 700 ms, une seule fois.
- R1 chacune des cartes porte un mouvement d'arrivée visible : le déclencheur est posé sur le modèle de carte, donc sur les trois cartes ; la visite du préparateur montre les 3 cartes à o = 0 (+28 px) avant l'entrée → **rempli**.
- R2 lancé à l'arrivée à l'écran des cartes : `on=inView` → **rempli** (visite : départ ~450 ms après le défilement, mouvement visible à l'arrivée).
- R3 durée totale 700 ms ∈ [200 ; 2 500] → **rempli**.
- R4 « Cette saison » et « Quelques plats signature » conservent leur arrivée `inView` (inchangés) → **rempli**.
- R5 animations 44 → 45 : une seule ajoutée, dans À la carte → **rempli**.
→ Réussite complète, aucune aide → **statut C**. **Accord avec le statut proposé (C)**, avec deux réserves à porter au rapport : (a) l'animation d'origine « au chargement » n'a pas été retirée, si bien que les cartes portent deux animations ; aucun critère de la section 5 ne l'interdit et la visite montre que le mouvement se voit bien à l'arrivée ; (b) la participante ignore avoir réussi — 9.1 impose alors le code **MM** (statut C avec mode de fin « budget »).

**Mode de fin.** **BUD** (40e action atteinte ; le modérateur a prononcé la phrase prévue). **Aides** : aucune. Aucun BLOC.

**Métriques (9.2).**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; appels #49–#110 (17 captures, 5 loupes, 10 clics, 8 défilements) |
| Actions perdues au dispositif | 0 identifiée ; 5 loupes rendues nécessaires par la capture 800 × 500 d'un écran 1 440 × 900 |
| Première action pertinente | **13** (clic sur la ligne « Fondu en montant · Plats · Accueil » → capture 007 : panneau de l'animation des plats). La ligne était déjà lisible au rang 12 (loupe 006) |
| Actions jusqu'à la réussite | **37** (clic « + Ajouter » → journal 13:28:56 v1 « Animation · Fondu en montant ») |
| Captures / loupes | 17 / 5 |
| FP et actions perdues | 2 FP, 8 actions : FP1 actions 18–19 (re-clic sur l'onglet « Animation » : capture 010 strictement identique à 009) ; FP2 actions 29–34 (défilement de la liste « Du site » à la recherche d'une ligne « Plats · Accueil ») |
| HES | 2 (actions 17–22 ; actions 29–34) |
| ERR (dont non récupérées) | 0 (0) |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 (action 29 : le préréglage « Apparition · Fondu en montant » est lisible en haut de la liste, capture 015 ; elle défile vers le bas et ne le prend qu'au rang 35) |
| VERIF / VERIF-E | **VERIF**, premier rang **2** (clic « Aperçu » puis descente jusqu'aux plats, captures 002 et 003), donc **avant** la première modification (rang 37) |
| Mots VOC nouveaux | « les enfants de « Plats » », « Ses enfants, un à un », cible, courbe, « Doux (sortie) », losanges (6) |
| SEQ | 2 |

**Concordance du récit (9.4).** Récit T2-R comparé au site v1.
| Dimension | Note | Justification |
|---|---|---|
| Quoi | **0** | « Les deux autres, l'agneau et la truffade, seront toujours déjà là, immobiles » : **faux**, le déclencheur porte sur le modèle de carte et la visite montre les trois cartes arriver. |
| Quand | 1 | Pour la carte qu'elle croit avoir traitée, « au moment où il apparaît à l'écran » est exact, mais aussitôt remis en doute (« je ne sais pas s'il va le refaire, se mélanger ou rien faire du tout ») : vague mais compatible. |
| Comment | 2 | « fondu en montant » : exact. |
| Combien | 1 | « une seule fois » exact ; durée non donnée. |
| **Total** | **4/8** | |
**Écart matériel : OUI** (affirmation fausse sur « Quoi ») → **MM-V, gravité 3**. Case de la matrice 9.3 : **réussite non comprise**.

**Mesures propres (section 5).** Diagnostic T2-a : **juste** — il désigne le moment de lancement et sa conséquence (« réglé « au chargement de la page » … Quand Aurèle descendait jusqu'à eux, c'était fini depuis longtemps »), compris par la lecture de la phrase de résumé (loupe 008 : « Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms »). VERIF avant la première modification : **oui**. Modifications collatérales encore présentes dans le site final : **aucune**.

---

### T3 · Donner du rythme à l'accueil (position 3)

**Statut.** Site final v5 : titre `rh_hero_h1` `on=load`, « Fondu en montant » **1 500 ms** ; « Réserver une table » `rh_hero_b1` `on=load`, piste **1 500 → 2 000 ms** ; « Voir la carte » inchangé (0 → 500 ms) ; paragraphe inchangé (fondu 500 ms, `on=load`).
- R1 titre encore animé au chargement, durée 1 500 ms ∈ [900 ; 4 000] → **rempli**.
- R2 fin du titre = 0 + 1 500 = 1 500 ms ; seuil 80 % = 1 200 ms. « Réserver une table » part à 1 500 ≥ 1 200 et finit à 2 000 ≤ 6 000 → conforme. « Voir la carte » part à 0 → non conforme. → **R2 rempli pour un seul des deux boutons**.
- R3 paragraphe toujours animé au chargement → **rempli**.
- R4 animations 45 → 45, rien d'ajouté sur le surtitre, la photo, la pastille ni hors du héros → **rempli**.
→ Cas de réussite partielle explicitement prévu (« R1 rempli et R2 rempli pour un seul des deux boutons »), aucune aide → **statut P**. **Accord avec le statut proposé (P)**. Comme en T2, statut P avec mode de fin abandon → **MM** (9.1) : elle ne sait pas avoir obtenu ce qu'elle voulait sur le premier bouton.

**Mode de fin.** **ABD** (« J'abandonne », 33:13), déclenché conformément à la règle d'abandon de la fiche (« Abandonne aussi immédiatement si elle pense avoir abîmé le site et qu'un Ctrl+Z ne le remet pas comme avant »). **Aides** : aucune (elle n'a jamais dit « je suis bloquée »).

**Métriques (9.2).**
| Métrique | Valeur |
|---|---|
| Actions totales | 27 ; appels #111–#149 |
| Actions perdues au dispositif | 0 identifiée ; 2 loupes |
| Première action pertinente | **5** (clic sur la ligne « Fondu en montant · Titre 1 « Le goût de l'Auvergne… » · Accueil » → capture 004) |
| Actions jusqu'à la réussite | **13** pour la première configuration de réussite partielle (R1 seul ; journal 13:35:10 v1/v2 « Durée de l'animation ») ; **24** pour la configuration finale R1 + un bouton (journal 13:38:05 v3/v4 « Décaler la piste ») |
| Captures / loupes | 10 / 2 |
| FP et actions perdues | 0 |
| HES | 1 (actions 14–15) |
| ERR (dont non récupérées) | 0 (0) — les deux discordances majeures relèvent de MM, voir lignes T3-04 et T3-06 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 (action 25 : « INSTANT 500 MS » et « 500 / 2 000 ms » sont lisibles dans la capture 011 et expliquent la disparition ; non exploités) |
| VERIF / VERIF-E | **Aucun VERIF** ; **VERIF-E** à partir du rang 25 (vérification dans la seule vue d'édition). Aperçu non ouvert : « je n'ai pas osé aller voir dans l'aperçu » |
| Mots VOC nouveaux | « Départ », « Instant » (2) |
| SEQ | 2 |

**Concordance du récit (9.4).** Récit T3-R comparé au site v5.
| Dimension | Note | Justification |
|---|---|---|
| Quoi | 2 | Les quatre éléments animés sont nommés, aucun en trop. La crainte sur « Réserver une table » est formulée comme un doute (« j'ai peur que », « je n'en sais rien »), pas comme une affirmation. Cotation discutable, à arbitrer en cas de double codage. |
| Quand | 2 | « le grand titre arrive » à l'ouverture, « Voir la carte … en même temps que le titre, pas après », « peut-être qu'il arrive simplement plus tard » : tous compatibles avec le site. |
| Comment | 2 | « en fondu en montant » pour le titre : exact ; « comme avant » pour les autres : exact. |
| Combien | 1 | Durée du titre exacte (1 500 ms, donnée en ms) ; nombre de fois non énoncé. |
| **Total** | **7/8** | |
**Écart matériel : non** — aucune affirmation fausse ; le seul point litigieux est explicitement présenté comme une crainte.

**Mesures propres (section 5).** R1 : rempli, sans aide, vrai au journal à 13:35:10 (action 13). R2 : rempli pour « Réserver une table » seulement, sans aide, vrai à 13:38:05 (action 24). Estimation T3-a : « peut-être deux ou trois secondes ? C'est vraiment au hasard » contre une fin réelle à 2 000 ms (≈ 2 190 ms à la visite) : le point milieu (2,5 s) est à +25 %, donc **juste** au sens du seuil ±30 %, mais la borne haute de sa fourchette est à +50 % et elle qualifie elle-même sa réponse de hasard — à rapporter comme « juste, mais donnée pour un hasard ».

---

### T5 · Calmer la pastille, réveiller le bouton (position 4)

**Statut.** Site final v4 : pastille `rh_hero_badge` — (a) zoom inchangé (`on=load delay=300`, 500 ms) ; (b) « Pulsation » `on=load delay=800`, 1 200 ms, **répétitions ramenées à une fois** (résumé sans « en boucle », capture 006). Bouton `rh_hero_b1` : déclencheur `nmugnerdq5Au · on=hover reverseOnLeave`, « Soulever » 250 ms, `translateY(0)` → `translateY(-4px)`.
- S1 aucun mouvement ne se joue plus d'une fois par ouverture : un unique battement subsiste après l'arrivée, cas explicitement accepté et noté → **rempli**.
- S2 arrivée conservée : zoom 0,92 → 1 et opacité 0 → 1, durée totale 300 + 500 = 800 ms ∈ [200 ; 1 500] → **rempli**.
- S3 bouton du héros au passage de la souris : −4 px ≥ 2 px, atteint en 250 ms ≤ 800 ms, retour à la sortie (`reverseOnLeave`), pas de répétition → **rempli entièrement**.
- S4 animations 43 → 44, rien d'autre changé dans l'accueil → **rempli**.
→ **statut C**, aucune aide. **Accord avec le statut proposé (C)**. La visite du préparateur confirme les trois points (o 0 → 1 entre ~340 et ~1 040 ms ; un seul battement scale 1 → 1,049 → 1 ; −4 px en ~145 ms au survol avec retour).

**Mode de fin.** Terminé déclaré — mais à la 40e action exactement, donc simultanément au budget. À rapporter comme « terminé déclaré, au budget ». **Aides** : aucune.

**Métriques (9.2).**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; appels #150–#210 (19 captures, 2 loupes, 17 clics, 1 survol, 1 touche) |
| Actions perdues au dispositif | ≈ 2 (actions 39–40 : le survol puis une capture, pour détecter un décalage de 2 à 3 px qu'un œil humain verrait d'un coup) |
| Première action pertinente | **5** (clic sur la ligne « Pulsation · Pastille · Accueil » → capture 004) |
| Actions jusqu'à la réussite | **35** (clic « + Ajouter » du survol → journal 13:50:50 v4). S1 atteint dès l'action 9 (journal 13:44:55 v1 « Répétitions ») |
| Captures / loupes | 19 / 2 |
| FP et actions perdues | 1 FP, 10 actions (actions 17–26 : « À la souris » choisi, animation ajoutée, résumé lu, Ctrl+Z) |
| HES | 0 |
| ERR (dont non récupérées) | 1 (0) — action 17, récupérée seule (REC-S) aux actions 26 et 30 |
| COLL-D / COLL-ND | 0 / 0 |
| RATE | 1 (action 16 : « Au survol » est lisible une ligne au-dessus de « À la souris » dans la capture 009 ; retenue seulement au rang 30) |
| VERIF / VERIF-E | **VERIF**, premier rang **37** (Aperçu, puis survol réel du bouton et comparaison des captures 020 et 021), avant « J'ai terminé » |
| Mots VOC nouveaux | « À la souris », « aller-retour », « Effets continus », « Entrée-sortie » (4) |
| SEQ | 5 |

**Concordance du récit (9.4).** Récit T5-R comparé au site v4.
| Dimension | Note | Justification |
|---|---|---|
| Quoi | 2 | Pastille (zoom conservé + pulsation) et bouton au survol : exact, rien en trop, rien d'oublié. |
| Quand | 2 | « quand on ouvre la page », « après 800 ms », « quand le visiteur passe la souris » : exact. |
| Comment | 2 | « zoom », « pulsation », « se soulève … redescend quand la souris s'en va » : exact. |
| Combien | 2 | « 250 ms » et « après 800 ms » exacts ; « une seule fois » exact. |
| **Total** | **8/8** | |
**Écart matériel : non.** Sa réserve sur l'effet possible du Ctrl+Z sur « Une fois » est présentée comme un doute ; le journal montre que le Ctrl+Z n'a touché que le déclencheur du bouton.

**Mesures propres (section 5).** S1 rempli (avec un battement unique, noté) ; S2 rempli ; S3 rempli entièrement. S2 n'a jamais été perdu en cours de tâche (le journal ne montre aucune opération sur le zoom). Aucune confusion entre le bouton du héros et celui de l'en-tête : le fil d'Ariane des captures 008, 009 et 019 indique « Page > Héros > Contenu > Texte > Boutons > Réserver une table ». Cohérence T5-a / S1 : elle répond « je pense que non » alors que S1 est rempli → **pas de MM**, mais un doute résiduel sur « Effets continus », rubrique jamais ouverte.

---

### T4 · La maison racontée comme une scène (position 5)

**Statut.** Site final v10 : une seule animation, déclenchée par `nQ4luqD93c8l · on=inView` sur **« Photo de la salle »** — photo « Glissé depuis la gauche » 0 → 700 ms (`translateX(-40px)`), titre « Fondu en montant » 700 → 1 400 ms (`translateY(28px)`), paragraphe « Fondu » 1 400 → 2 100 ms ; décalages absolus, sans `start` ; une seule fois. Les trois chiffres ne portent rien.
- C1 les six éléments visés bougent : 3 sur 6 → **non**.
- C2 un seul événement, l'arrivée à l'écran de la section : les trois mouvements partent bien d'un même déclencheur, mais ce déclencheur est **la photo**, pas la section, et les six éléments ne sont pas couverts → **non**.
- C3 photo < titre < paragraphe < premier chiffre : aucun chiffre ne part → **non**.
- C3b trois chiffres échelonnés → **non**.
- C4 fin du dernier mouvement à 2 100 ms ∈ [1 800 ; 3 000] → **oui**.
- C5 photo `translateX` 40 px ≥ 16 px ✔, titre `translateY` 28 px ≥ 8 px ✔, paragraphe fondu ✔, mais aucun chiffre ne suit une courbe à dépassement → **non**.
- C6 « une seule fois » → **non**.
→ C1 et C3 non remplis, et cinq critères non remplis parmi C2, C3b, C4, C5, C6 → **échec, statut E**. **Accord avec le statut proposé (E)**. **Profil de critères : C4 seul rempli.**

**Mode de fin.** **BUD** (40e action). **Aides** : aucune.

**Métriques (9.2).**
| Métrique | Valeur |
|---|---|
| Actions totales | 40 ; appels #211–#267 (17 captures, 15 clics, 5 touches, 2 saisies, 1 défilement, **aucune loupe**) |
| Actions perdues au dispositif | 0 identifiée |
| Première action pertinente | **5** (clic sur la photo de la salle → capture 003 : bloc « LANCER UNE ANIMATION DEPUIS « PHOTO DE LA SALLE » ») |
| Actions jusqu'à la réussite | **non atteint** (statut E) |
| Captures / loupes | 17 / 0 |
| FP et actions perdues | 0 |
| HES | 0 |
| ERR (dont non récupérées) | 1 (0) — action 24 : « 700 » saisi, « 1400 » affiché (capture 011), piste du titre réduite à une seule image-clé (journal v4 puis v5) ; récupérée seule par Ctrl+Z (action 26, journal v6) |
| COLL-D / COLL-ND | 0 / 0 (animations 41 → 42 : une seule ajoutée ; rien sur le surtitre « La maison ») |
| RATE | 1 (action 40 : la barre de transport avec « ▷ » est visible dans la capture 017 ; jamais utilisée alors qu'elle déclare ne pas pouvoir juger le minutage) |
| VERIF / VERIF-E | **Aucun VERIF** ; **VERIF-E** dès le rang 12 (relecture systématique de la phrase de résumé et du canevas). Aperçu non ouvert, faute de budget |
| Mots VOC nouveaux | « Remplir avec », « Netteté » (2) |
| SEQ | 3 |

**Concordance du récit (9.4).** Récit T4-R comparé au site v10.
| Dimension | Note | Justification |
|---|---|---|
| Quoi | 2 | Photo, titre, paragraphe bougent ; « Les trois chiffres … sont déjà là et ne bougent pas » : exact, rien en trop. |
| Quand | 2 | « quand la photo du bol arrive à l'écran » : exact (le déclencheur est bien l'entrée de la photo) ; ordre photo → titre → paragraphe : exact. |
| Comment | 2 | « glisse depuis la gauche », « en s'élevant », « en fondu » : exact. |
| Combien | 2 | « 2 100 ms » exact ; « une seule fois : si le visiteur remonte puis revient, la scène ne recommence pas » exact. |
| **Total** | **8/8** | |
**Écart matériel : non.** Récit intégralement conforme au site, y compris sur l'échec par rapport à la consigne, qu'elle énonce elle-même (« ce qui est le contraire de ce qu'Aurèle demandait »). Case de la matrice 9.3 : **échec lucide**.

**Mesures propres (section 5).** Profil de critères : **C4 seul**. Structure de lancement : **un seul événement** (déclencheur `inView` sur la photo) avec des **départs absolus en ms**, sans enchaînement `start`. T4-a : elle décrit rouvrir la scène, retrouver la case « Départ » du paragraphe à 1 400, mettre 1 200, relire la phrase, et note que le paragraphe partirait alors avant la fin du titre → **cohérente avec la structure enregistrée**, pas de MM.

---

## 3. Lignes de codage (format 8.5)

Colonnes : Tâche · Position | Action (compte) / appel | Horodatage | Étape (9.5) | Code | Gravité (8.3) | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire.

### T1 (position 1)

| Réf | Act./appel | H. | Étape | Code | Gr. | Endroit | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| T1-01 | 4 / #6 | 02:57 | Découvrir | VOC | 2 | Encadré « Comment ça marche » en haut du panneau de droite (loupe 003) | 🧠 « le texte est trop petit pour être lu clairement » ; T1-b : « un encadré d'explications plein de mots que je ne connais pas : survol, défilement, images-clés, ligne de temps, canevas, calques » | PERC | Six mots de sa liste « vocabulaire inconnu » dans le premier texte qu'elle lit ; sans effet sur le résultat final → gravité 2. |
| T1-02 | 2–7 / #3–#11 | 02:31–03:48 | Découvrir | — | 0 | Onglet « Animation » dans la barre du haut | 🧠 « Je clique sur « Animation », en espérant y trouver une liste d'effets comme dans PowerPoint » | — | Découverte immédiate du mot connu ; conforme à ses attentes a priori. Aucun problème. |
| T1-03 | 9 / #14 | 04:09 | Découvrir | PERC | 1 | Panneau de droite après sélection du titre | 🧠 « Je vais agrandir cette zone pour mieux lire les propositions » | PERC | Capture 800 × 500 pour un écran 1 440 × 900 : le panneau n'est lisible qu'à la loupe. |
| T1-04 | 9 / #15 | 04:13 | Choisir | **RATE** | 2 | Loupe 006 : lignes « Quand : À l'entrée dans l'écran », « Animation : Nouvelle animation (à composer) » et « + Ajouter », sous le bouton bleu « Animer « Titre 2 » » | image 006-loupe | — | Le chemin qu'elle finira par prendre (actions 14–22) est lisible ici ; elle clique sur le bouton bleu. |
| T1-05 | 10–13 / #16–#21 | 04:35–06:01 | Découvrir | **FP** | 2 | Bouton bleu « Animer « Titre 2 » » → panneau détaillé (« ANIMATION », « 1000 ms », « PISTE », « Départ », « Cible », « Remplir avec », « IMAGE-CLÉ À 0 MS », « Opacité », « Décalage ») | 🧠 « Ce panneau d'animation est trop complexe … je ne trouve pas de croix pour le fermer » ; journal 13:10:46 v1 puis 13:11:45 v2 (annulation) | — | 4 actions perdues. Hésitation de codage FP / ERR : le clic crée bien une animation (v1), mais vide (« rien ne bouge encore ») ; j'ai retenu FP parce que la piste est abandonnée par un retour. Récupération seule (Ctrl+Z, action 12) : REC-S. |
| T1-06 | 12 / #19 | 05:35 | Retirer | **RATE** | 1 | Croix « ✕ » à droite de l'en-tête « ANIMATION » (capture 007) | 🧠 « je ne trouve pas de croix pour le fermer » | — | La croix est présente et visible dans la capture 007 ; elle ne la voit qu'à la fin de la séance (D-FIN-3 : « Il y avait juste une petite croix »). Gravité 1 : coût ≤ 2 actions, reprise immédiate. |
| T1-07 | 14–17 / #22–#27 | 06:01–06:38 | Choisir | VOC | 2 | Liste déroulante « Animation », premier élément « Nouvelle animation (à composer) » (capture 009) | T1-b : « La liste d'effets existait, mais elle était cachée dans une petite liste où il était écrit « Nouvelle animation (à composer) » » | — | Le libellé fermé ne dit pas qu'il contient les effets ; elle l'ouvre « parce que le mot « Animation » était à côté ». |
| T1-08 | 18–20 / #28–#31 | 06:59–07:24 | Lancer | VOC | 2 | Liste « Quand » : « Au chargement / À l'entrée dans l'écran / Au survol / Au clic / Au défilement / À la souris » (capture 011) | T1-b : « rien ne disait « quand on descend », j'ai dû deviner que c'était « À l'entrée dans l'écran » » | — | Devinette réussie ; « survol » et « défilement » restent incompris. L'option était déjà cochée : son clic ne change rien (aucune entrée au journal). |
| T1-09 | 24 / #38 | 08:32 | Vérifier | **RATE** | 2 | Barre de transport du panneau : « ◁| ▷ ⇄ » et « 700 / 700 ms » (loupe 014) | image 014-loupe ; 🧠 « je préfère éviter la petite croix et le lien « Tester sur le site » par prudence » | PERC | Un bouton de lecture « ▷ » est visible et lisible ; elle ne l'utilise jamais, ici ni ailleurs, alors qu'elle déplorera toute la séance de n'avoir « jamais vu l'effet se jouer ». Elle écarte explicitement « Tester sur le site », pas « ▷ » (jamais mentionné). |
| T1-10 | 25–28 / #39–#44 | 08:57–09:31 | Vérifier | **VERIF** | — | Onglet « Maison Aurèle » du navigateur simulé, adresse `…/preview/site_ut3_p1_t1` (capture 016) | 🧠 « Je clique plutôt sur « Aperçu » … pour voir le rendu comme un visiteur » | — | Code neutre. Vérification visiteur réelle, avant « J'ai terminé ». |
| T1-11 | 29–31 / #45–#48 | 10:03–11:02 | Vérifier | **HES** | 2 | Aperçu, section « La maison » | 💬 « C'est exactement la même image que tout à l'heure » (captures 016 et 017 strictement identiques) | **PERC** | 3 actions dépensées à remonter et redescendre pour tenter de voir le fondu. La capture attend le rendu : l'état final est toujours photographié. Sa prudence est exemplaire (« je ne peux pas dire s'il a eu lieu ») : pas de HALL. |
| T1-12 | 31 / #47 | 11:02 | Régler | VOC | 2 | Champ « 700 ms » et phrase de résumé « fondu en 700 ms » | 💬 « je ne sais pas ce que veut dire « 700 ms » : si c'est trop lent ou trop rapide, je ne saurais pas le régler » | — | Mot lu à l'écran, non compris ; sans effet sur le résultat de T1 mais coûte la dimension « Combien » du récit. |
| T1-13 | 31 / #47 | 11:02 | Découvrir | FRU | — | Panneau détaillé | 💬 « le grand panneau plein de chiffres … m'a fait peur : la première fois, j'ai tout annulé » | — | Comportement associé attesté (T1-05). |

### T2 (position 2)

| Réf | Act./appel | H. | Étape | Code | Gr. | Endroit | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| T2-01 | 2–6 / #51–#57 | 13:49–14:26 | Vérifier | **VERIF** | — | Aperçu, section « Cette saison » avec les trois plats (capture 003) | 🧠 « Pour voir le site comme Aurèle, je clique sur « Aperçu » » | PERC | Vérification visiteur **avant toute modification** (rang 2). Elle constate l'immobilité mais ne peut rien conclure sur le mouvement : « je ne peux pas juger si le titre a bougé depuis l'image seule ». |
| T2-02 | 12 / #66 | 15:43 | Découvrir | PERC | 1 | Liste « ANIMATIONS DU SITE / SUR CETTE PAGE · ACCUEIL » (loupe 006) | 🧠 « un panneau « Animations du site » difficile à lire » | PERC | La ligne « Fondu en montant · Plats · Accueil » n'est lisible qu'à la loupe. |
| T2-03 | 13–15 / #67–#71 | 15:58–16:44 | Découvrir | — | 0 | Phrase de résumé « Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms » (loupe 008) | 🧠 « Je comprends : les plats se fondent au chargement de la page, pas à l'entrée dans l'écran » | — | **Point fort de l'outil** : le diagnostic, cœur de la mission, est obtenu en 3 actions par la seule lecture de cette phrase. |
| T2-04 | 13–22 / #67–#82 | 15:58–18:56 | Lancer | **MANQUE DE CONTRÔLE (codé HES)** | **3** | Panneau de l'animation existante : en-tête « ANIMATION », « Fondu en montant », « 600 ms », « Une fois », « PISTE · PLATS · ENFANTS », « Départ », « Cible », « Décalage », « Remplir avec » — **aucun contrôle « Quand »** (captures 007, 009, 010, 012) | 🧠 « je n'ai toujours pas trouvé où déclencher l'animation à l'entrée dans l'écran plutôt qu'au chargement » ; fin de tâche : « je n'ai pas trouvé comment changer ce moment directement » | — | 10 actions (13 à 22) consacrées à chercher un réglage absent du panneau. Gravité 3 (≥ 10 actions). Conséquence dans le site : l'animation « au chargement » subsiste et une seconde animation est créée à côté. |
| T2-05 | 16–17 / #72–#74 | 17:14–17:25 | Découvrir | — | 1 | Après clic sur la photo du plat : bouton « + Ajouter « Carte plat » » (capture 009) | 🧠 « aucune option pour modifier le moment ne s'y trouve, et je crains que fermer ce panneau efface l'animation des plats » | — | La crainte de détruire en fermant revient (cf. T1-06). |
| T2-06 | 18–19 / #75–#77 | 17:42–17:54 | Découvrir | **FP** | 1 | Onglet « Animation » de la barre du haut, déjà actif | 🧠 « Rien n'a bougé, le clic sur « Animation » n'a eu aucun effet » (captures 009 et 010 identiques) | — | 2 actions. Hésitation de gravité 1 / 2 : le barème réserve le niveau 1 aux passages « sans fausse piste » ; j'ai retenu 1 au titre du coût (≤ 2 actions) et je le signale. Le re-clic sur l'onglet actif ne referme pas le panneau détaillé. |
| T2-07 | 20 / #79 | 18:14 | Découvrir | VOC | 2 | Encadré « Comment lire cet écran : chaque ligne (une piste) est un élément qui bouge ; ses losanges (des images-clés) … « Départ » dit quand il part. Pour un effet tout prêt, un délai ou « après tel élément », la rubrique Animation de l'élément suffit. » (loupe 011) | 🧠 « Ce panneau reste confus (pistes, losanges, rubrique introuvable) » | PERC | Quatre mots inconnus dans la phrase d'aide ; mais c'est elle qui la débloque trois actions plus tard (T2-08). |
| T2-08 | 21–23 / #80–#85 | 18:44–19:26 | Lancer | — | 0 | Ligne « Animations lancées par « Carte plat » » en bas du panneau (capture 012), puis bloc « LANCER UNE ANIMATION DEPUIS « CARTE PLAT » » avec « Quand : À l'entrée dans l'écran » (captures 013, 014) | 🧠 « Je repère la ligne « Animations lancées par « Carte plat » », qui semble correspondre à la rubrique Animation de l'élément » | — | Rétablissement seul, guidé par l'encadré d'aide. |
| T2-09 | 29–34 / #92–#99 | 20:48–22:15 | Choisir | **FP + RATE** | 2 | Liste déroulante « Animation » : bloc « Préréglage · … » puis bloc « Du site · … », avec **quatre lignes identiques « Du site · Fondu en montant · Plats · La carte »** (captures 015, 016, 017) | 💬 « Cette longue liste avec quatre fois la même ligne « Plats · La carte » m'a complètement perdue » | — | 6 actions perdues à chercher une ligne « Plats · Accueil » absente de cette liste (elle figure pourtant dans la liste « Animations du site » du panneau, loupe 006). RATE : le préréglage « Apparition · Fondu en montant » était lisible en haut de la même liste dès le rang 28. Les quatre doublons sont attestés dans la capture 016. |
| T2-10 | 35–38 / #101–#106 | 22:24–22:58 | Choisir | — | 0 | « Préréglage · Apparition · Fondu en montant » puis « + Ajouter » | journal 13:28:56 v1 « Animation · Fondu en montant » | — | Le geste « choisir puis Ajouter » en deux temps est relevé par elle dès T1-b (« choisir le fondu ne fait rien tant qu'on n'a pas cliqué « Ajouter » »). |
| T2-11 | 39–40 / #107–#110 | 23:14–24:03 | Vérifier | **MM-V** | **3** | Canevas : **seule la première carte de plat porte un cadre bleu** (loupe 022) ; en-tête du panneau « Carte plat » (loupe 021) | 💬 « je vois que seul le premier plat, celui de la salade, a un cadre bleu autour de lui. La tasse de thé et le café n'ont rien. » | — | La capture atteste ce qu'elle décrit (**pas de HALL**) ; c'est son inférence qui est fausse : le déclencheur porte sur `rh_dishes_item`, modèle de la collection, donc sur les trois cartes. Écart matériel du récit (9.4) → gravité 3. Cause apparente : le canevas ne montre pas qu'une animation posée sur la carte-modèle vaut pour toutes ses occurrences. |
| T2-12 | 40 / #110 | 24:03 | Vérifier | **MM** | 3 | — | Fin de tâche : « j'ai ajouté un fondu … sur le premier plat seulement, je crois » alors que le statut lu dans le site est C | — | Application de 9.1 : statut C avec mode de fin BUD → MM. Elle ignore avoir réussi. |
| T2-13 | 40 / #110 | 24:03 | Choisir | FRU | — | Liste « Du site » | 💬 « m'a complètement perdue » | — | Comportement associé attesté (T2-09). |

### T3 (position 3)

| Réf | Act./appel | H. | Étape | Code | Gr. | Endroit | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| T3-01 | 4–5 / #116–#118 | 26:52–27:22 | Découvrir | — | 0 | Liste « SUR CETTE PAGE · ACCUEIL » : quatre lignes (Titre 1, Paragraphe, Réserver une table, Voir la carte) (loupe 003) | 🧠 « Je vois que le titre et les deux boutons ont chacun leur propre animation fondu en montant » | PERC | Accès direct, sans détour : effet d'apprentissage des positions 1 et 2. |
| T3-02 | 7–13 / #121–#128 | 28:07–29:00 | Régler | VOC | 2 | Champ « 500 » suivi de « ms » dans le panneau (capture 004) | T3-b : « j'ai triplé le chiffre, de 500 à 1500, sans savoir ce que ça représente » | — | La valeur est choisie par un rapport, faute d'unité intelligible. Résultat conforme à R1 par chance autant que par raisonnement. |
| T3-03 | 14–15 / #129–#132 | 29:06–29:34 | Régler | **HES** | 1 | Barre de transport : « **4 500 / 1 500 ms** » (loupe 007), puis « INSTANT 4500 MS » (capture 008) | 🧠 « un 4500 inattendu à côté du 1500 saisi » | — | Compteur incohérent attesté par deux captures. Elle le remarque et passe outre : coût ≤ 2 actions. Journal : deux entrées « Durée de l'animation » à la même seconde (13:35:10 v1 et v2), valeur identique → validation en double. |
| T3-04 | 20–25 / #139–#146 | 31:18–32:07 | Régler | **MM** | **4** | Canevas : à la place du bouton « Réserver une table », **une étiquette bleue et un cadre en pointillés vide** (capture 011) ; panneau : « de 1 500 à 2 000 ms », « INSTANT 500 MS », « Opacité 0 % » | 🧠 « Le bouton « Réserver une table » a disparu … je crains d'avoir cassé quelque chose » | — | Attente formulée (« je m'attends à ce que la phrase du haut mentionne un départ plus tardif ») contredite par la capture. **Origine de la chaîne qui mène à l'abandon** → gravité 4 (8.3). Le réglage est pourtant correct dans le modèle : la piste démarre à 1 500 ms et la tête de lecture est à 500 ms. |
| T3-05 | 25 / #145 | 32:01 | Vérifier | **RATE** | 2 | Mentions « 500 / 2 000 ms » et « INSTANT 500 MS » dans le panneau (capture 011) | image 011-capture | — | L'information qui explique la disparition est présente et lisible ; elle ne l'exploite pas. Atténuation : elle est rédigée dans un vocabulaire (« instant », tête de lecture) qui ne figure pas dans ses mots connus, et rien ne relie explicitement cette valeur au cadre vide. |
| T3-06 | 26–27 / #147–#149 | 32:37–33:13 | Régler | **MM** | **4** | Indicateur « Enregistré · v4 » puis « v5 » en haut à droite ; reste de l'écran inchangé (captures 011 et 012 identiques au numéro de version près) | 💬 « Rien n'est revenu … Seul le petit numéro à côté de « Enregistré » a changé en haut. Donc Ctrl+Z ne remet pas le bouton, et c'est enregistré en plus. » | — | Attente explicite (« en espérant voir le bouton réapparaître ») contredite par la capture. Journal : v3 et v4 « Décaler la piste » à la même seconde (13:38:05), puis v5 = le Ctrl+Z, qui n'annule que le doublon. Par 8.3 la conséquence finale est imputée à T3-04 ; je maintiens néanmoins la gravité 4 ici, car cet événement remplit à lui seul la condition « cause un abandon » (c'est la clause exacte de la règle d'abandon de la fiche). |
| T3-07 | 27 / #149 | 33:13 | Régler | **ABD** | **4** | — | 💬 « J'ai abîmé le bouton du site d'Aurèle, je ne touche plus à rien. J'abandonne. » | — | Mode de fin. Conforme à la règle d'abandon de la persona : pas de PERS. |
| T3-08 | 27 / #149 | 33:13 | Vérifier | **VERIF-E** | — | Vue d'édition seule | T3-R : « je n'ai pas osé aller voir dans l'aperçu » | PERC | Aucune vérification visiteur : la peur d'aggraver l'emporte. |
| T3-09 | — (déclaratif) | 35:31 | Composer | VOC | 2 | Réglages du bouton | T3-SEQ : « rien ne ressemblait à « Après la précédente » » | — | Absence d'un libellé d'enchaînement relatif ; comportement associé : elle calcule le départ en ms à la main (action 22). |
| T3-10 | 27 / #149 | 33:13 | Régler | FRU | — | — | 💬 « J'ai abîmé le bouton du site d'Aurèle » | — | Frustration maximale de la séance ; agacement chiffré non donné (voir § 6). |

### T5 (position 4)

| Réf | Act./appel | H. | Étape | Code | Gr. | Endroit | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| T5-01 | 4–5 / #155–#157 | 37:16–37:38 | Retirer | — | 0 | Lignes « Zoom · Pastille · Accueil » et « Pulsation · Pastille · Accueil » (loupe 003) | 🧠 « Je repère « Pulsation · Pastille · Accueil » comme étant l'animation en boucle qui pose problème » | PERC, (CONN ?) | Les deux animations sont bien séparées dans la liste, ce qui rend la tâche lisible. Réserve : rien dans la ligne ne dit que « Pulsation » est celle qui boucle ; l'inférence est plausible en français courant, mais je la signale comme CONN limite (§ 6). |
| T5-02 | 7–9 / #160–#163 | 38:23–38:44 | Retirer | — | 0 | Liste de répétitions « Une fois / 2 fois / 3 fois / En boucle » (capture 005), phrase « Au chargement de la page, après 800 ms : pulsation en 1 200 ms, en boucle » (capture 004) | 🧠 « Je vais ouvrir cette liste pour la remettre sur « Une fois » » ; journal 13:44:55 v1 « Répétitions » | — | **Point fort** : S1 obtenu en 9 actions, sans rien supprimer. La phrase de résumé perd la mention « en boucle » (capture 006) et lui sert de confirmation. |
| T5-03 | 16 / #174 | 40:15 | Lancer | **RATE** | **3** | Liste « Quand » : « Au survol » (ligne du dessus) et « À la souris » (ligne du dessous), toutes deux lisibles (capture 009) | image 009-capture | — | L'accès qui mènera au but est visible à l'action 16 ; retenu seulement à l'action 30. |
| T5-04 | 17–26 / #175–#191 | 40:23–42:48 | Lancer | **ERR + FP** | **3** | Case « Quand : À la souris » puis phrase de résumé « **Quand la souris se déplace de haut en bas dans la fenêtre** : « Réserver une table » de 0 à 100 % du parcours » (loupe 014) | 🧠 « Je sélectionne « À la souris » puisqu'Aurèle veut une animation au passage de la souris » ; journal 13:47:49 v2 puis 13:48:45 v3 (annulation) | — | Résultat contradictoire avec l'intention annoncée → ERR. Piste de 10 actions → gravité 3 (hésitation avec le niveau 2 « erreur récupérée seul » : j'ai retenu le niveau le plus élevé, comme l'impose 8.3). |
| T5-05 | 17 / #175 | 40:23 | Lancer | **VOC** | 3 | Libellés « À la souris » et « Au survol » | D-FIN-5 : « « À la souris » : j'ai compris « quand on passe la souris dessus », et c'était faux » ; « « Survol » : aucune idée au départ » | — | Mot inconnu (« survol ») et mot connu mais trompeur (« à la souris ») : l'effet obtenu contredit son interprétation, définition exacte de VOC. |
| T5-06 | 25–26 / #187–#191 | 42:15–42:48 | Lancer | **REC-S** | — | Phrase de résumé en haut du panneau (loupe 014) | 🧠 « Ce réglage déplacerait le bouton au survol de toute la fenêtre … J'annule avec Ctrl+Z » | — | Récupération seule, entièrement due à la phrase de résumé. Ici le Ctrl+Z **fonctionne** (capture 015 : « Quand » et « Animation » revenus à vide, version v3), contrairement à T3-06. |
| T5-07 | 28–35 / #192–#204 | 43:08–44:54 | Lancer | — | 0 | « Au survol » puis « Préréglage · Survol · Soulever » puis « + Ajouter » ; résumé « Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part » (capture 019) | 🧠 « C'est la phrase « puis retour quand la souris part » qui m'a confirmé que c'était le bon » ; journal 13:50:50 v4 | — | S3 rempli. |
| T5-08 | 37–40 / #205–#210 | 45:06–46:03 | Vérifier | **VERIF** | — | Aperçu, bouton orange « Réserver une table » (captures 020 puis 021) | 💬 « il me semble que le bouton orange … est un tout petit peu plus haut qu'avant : son texte n'est plus tout à fait à la même hauteur que « Voir la carte » » | **PERC** | **Vérification attestée** : la comparaison des captures 020 et 021 montre bien un décalage de l'ordre de 2 à 3 px. Elle présente l'observation comme une supposition prudente → **pas de HALL**. Seule vérification visiteur concluante de toute la séance, et elle a coûté ses deux dernières actions. |
| T5-09 | — (déclaratif) | 48:14 | Régler | VOC | 2 | Liste de répétitions dans le contexte d'un déclencheur au survol | T5-b : « la petite liste disait aussi « Une fois » … je me demande si le bouton ne se soulèvera que la première fois qu'on passe dessus » | — | « Une fois » lu comme « une fois par visite » ; l'effet réel (rejoué à chaque survol) contredit cette lecture. Sans effet sur le résultat → gravité 2. |
| T5-10 | — (déclaratif) | 48:14 | Retirer | — | 1 | Ligne « Effets continus » en bas du panneau (captures 012, 015) | T5-a : « il y avait une ligne « Effets continus » que je n'ai jamais ouverte : « continus », ça veut dire « en permanence » » | — | Rubrique aperçue, jamais ouverte, laissant un doute résiduel sur S1 alors que S1 est rempli. |

### T4 (position 5)

| Réf | Act./appel | H. | Étape | Code | Gr. | Endroit | Trace citée | Disp. | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| T4-01 | 5–12 / #217–#228 | 49:43–51:32 | Choisir | — | 0 | Bloc « LANCER UNE ANIMATION DEPUIS « PHOTO DE LA SALLE » », liste « Animation », « + Ajouter » | journal 13:57:22 v1 « Animation · Glissé depuis la gauche » | — | 12 actions pour le premier élément ; chemin désormais maîtrisé. Le déclencheur retenu est **la photo**, pas la section : C2 échoue sans qu'elle s'en aperçoive (aucun libellé « la section » n'apparaît dans les captures lues). |
| T4-02 | 13–20 / #229–#240 | 51:47–53:30 | Composer | — | 0 | Bouton « + L'ajouter à cette animation », puis liste « Remplir avec » (captures 007, 008, 009) | T4-SEQ : « J'ai quand même fini par comprendre comment faire venir les choses l'une après l'autre : « L'ajouter à cette animation », puis « Départ », avec la phrase qui dit « puis ». Ça, c'était bien. » | — | **Point fort** : l'enchaînement est compris sans aide, par des libellés en toutes lettres. |
| T4-03 | 21–25 / #241–#246 | 53:55–54:37 | Composer | **ERR** | **2** | Case « Départ » de la piste du titre : **« 1400 » affiché après la saisie de « 700 »** ; durée totale passée à 1 400 ms ; piste du titre réduite à un seul losange (capture 011) | 🧠 « « Départ » affiche 1400 au lieu de 700 » ; journal 14:00:30 v4 et v5 « Décaler la piste » (même seconde) | — | Validation appliquée deux fois : v4 place le titre à 700 → 1 400, v5 le décale de nouveau et écrase ses images-clés. Coût 3 actions → gravité 2. Récupérée seule. |
| T4-04 | 26–27 / #247–#249 | 55:04–55:23 | Composer | **REC-S + MM** | 2 | Après Ctrl+Z : « Départ : 700 » mais le **titre est absent du canevas**, remplacé par une étiquette et un cadre vide (capture 012) | 🧠 « en espérant retrouver le titre avec son fondu en montant et « Départ : 0 » » ; puis « même si le titre apparaît vide dans la page pour l'instant, sans doute parce qu'il n'a pas encore atteint ce point de la règle » | — | L'attente formulée (« Départ : 0 ») est contredite par la capture → MM, gravité 2. **Deuxième occurrence du phénomène qui a fait abandonner T3**, cette fois correctement interprétée par elle : la répétition lui a servi d'apprentissage, l'interface ne l'explique toujours pas. Ici le Ctrl+Z fonctionne (journal v6). |
| T4-05 | 28–39 / #250–#265 | 55:52–58:36 | Composer | — | 0 | Même séquence pour le paragraphe ; « Départ : 1400 » validé sans surprise cette fois (capture 016 puis 017) | journal 14:02:30 v7 à 14:04:39 v10 | — | Le doublement de la validation ne se reproduit pas visiblement (v9 et v10 identiques). |
| T4-06 | 40 / #266 | 59:03 | Composer | **VOC** | **3** | Liste de répétitions « Une fois / 2 fois / 3 fois / En boucle » | 💬 « Dans la petite liste, j'avais seulement vu « Une fois », « 2 fois », « 3 fois » et « En boucle », et aucun ne dit « chaque fois qu'on revient » » | — | **C6 non rempli** : aucun libellé lisible dans les captures examinées ne propose de rejouer à chaque arrivée à l'écran. Un critère de la consigne est donc inatteignable pour elle → gravité 3 (« cause un critère non rempli »). Réserve d'observation : je ne peux pas exclure qu'un tel réglage existe ailleurs dans le panneau. |
| T4-07 | 40 / #266 | 59:03 | Régler | **VOC** | **3** | Affichage « 2 100 ms » | 💬 « Pour les deux secondes et demie, je ne sais pas si « 2 100 ms » les respecte, puisque je ne sais pas ce que valent ces « ms » » | — | La contrainte chiffrée de la consigne (« deux secondes et demie ») est invérifiable pour elle. C4 est rempli, mais sans qu'elle puisse le savoir. |
| T4-08 | 40 / #267 | 59:03 | Vérifier | **RATE** | 2 | Barre de transport « ◁| ▷ ⇄ » et règle graduée 0–2 000 (capture 017) | image 017-capture | PERC | Deuxième occurrence de la même occasion manquée qu'en T1-09. |
| T4-09 | 40 / #267 | 59:03 | Composer | **BUD** | **4** | — | 💬 « Je m'arrête, j'ai atteint la limite » ; FIN : budget | — | Mode de fin. Deux exigences de la consigne (chiffres, rejeu) jamais abordées. |
| T4-10 | — (déclaratif) | 61:27 | Composer | FRU | — | — | T4-b : « C'est une dizaine de petits gestes par élément, et j'en avais quatre à faire … il faut calculer soi-même quand chacun part, avec des chiffres dont je ne connais pas l'unité » | — | Comportement associé attesté : 12 actions pour la photo, 8 pour le titre (plus 3 de réparation), 12 pour le paragraphe. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués **déclaratif** ; sans gravité (8.2). Étape au sens 9.5.

| Code | Étape | Citation | Source |
|---|---|---|---|
| **SAT** | Choisir | « quand j'ai ouvert la liste d'effets et vu « Apparition · Fondu » : je me suis dit « ah, comme dans PowerPoint, je vais y arriver » » | D-FIN-7 |
| **SAT** | Découvrir / Vérifier | « quand j'ai lu « Au chargement de la page » pour les plats et compris pourquoi Aurèle ne les voyait pas bouger : j'étais assez fière » | D-FIN-7 |
| **SAT** | Lancer / Vérifier | « la phrase en haut du grand panneau, qui dit en français ce qui va se passer … C'est elle qui m'a sauvée plusieurs fois. » | D-FIN-2 |
| **SAT** | Composer | « « L'ajouter à cette animation », puis « Départ », avec la phrase qui dit « puis ». Ça, c'était bien. » | T4-SEQ |
| **SAT** | Retirer | « La pastille, ça a été assez facile : j'ai retrouvé la petite liste avec « Une fois » » | T5-SEQ |
| **FRU** | Découvrir | « Le grand panneau. Il s'ouvre tout seul dès qu'on clique sur « Animer » ou « Ajouter » … je ne savais pas comment le fermer. » | D-FIN-3 |
| **FRU** | Vérifier | « ne jamais voir l'effet se jouer … Un Ctrl+Z qui ne remet pas comme avant, c'est ce qui fait le plus peur. » | D-FIN-3 |
| **FRU** | Régler | « Les chiffres en « ms » au lieu de secondes, et des chiffres qui changent tout seuls : j'ai tapé 700 et j'ai eu 1400, j'ai vu « 4 500 sur 1 500 ». » | D-FIN-3 |
| **FRU** | Choisir | « la liste interminable avec quatre fois la même ligne « Plats · La carte » » | D-FIN-3 |
| **FRU** | Régler | « La peur de casser, d'abord. Des choses disparaissent de la page, un Ctrl+Z ne remet pas toujours comme avant, et c'est marqué « Enregistré » tout de suite, sans que j'aie rien demandé. » | D-FIN-8 |
| **FRU** | (séance) | « c'était fatigant … je n'ai jamais vu une seule animation se jouer » | D-FIN-10 |
| **VAL+** | Choisir / Lancer | « un petit fondu sur la photo des produits de saison, ou un bouton pour les paniers de Noël qui se soulève quand on passe dessus, ça donne envie » | D-FIN-6 |
| **VAL+** | Vérifier | « gardez la phrase qui résume, c'est la meilleure chose de l'outil » | D-FIN-10 |
| **VAL−** | Régler | « Mon métier, c'est la boutique, je n'ai pas des soirées entières pour régler des « ms ». » | D-FIN-6 |
| **VAL−** | Composer | « Les scènes où tout arrive dans l'ordre, ce n'est pas pour moi : je laisserais ça à quelqu'un qui s'y connaît. » | D-FIN-6 |
| **VAL−** | Composer / Régler | « Je ne toucherais pas à « Départ », à cause des éléments qui disparaissent … Et je ne me lancerais pas dans une scène avec plusieurs choses qui se suivent, surtout pas la veille d'une réouverture. » | D-FIN-4 |
| **VAL−** | (ensemble) | « je ne confierais pas la réouverture d'Aurèle à ce que j'ai fait sans qu'il repasse derrière moi » | D-FIN-1 |
| **VAL−** | Vérifier | « je ne suis pas sûre que ce que j'ai laissé corresponde à ce qu'Aurèle voulait, ça m'ennuie pour elle » | D-FIN-10 |

**Vocabulaire déclaré non sûr (D-FIN-5), au-delà des VOC relevés en tâche** : « Préréglage », « Titre 1 / Titre 2 », « À composer », « tête de lecture », « échelle », « flou », « Héros », « Enregistré · v1, v2 ». Total distinct sur la séance : ≈ 26 mots relevés en tâche, ≈ 34 avec le débriefing.

**Réponses aux questions, points saillants** : T1-SEQ 3 · T2-SEQ 2 · T3-SEQ 2 · T5-SEQ 5 · T4-SEQ 3. Réponse D-FIN-9 (comment être sûre de ce que verront les clients) : elle recommande l'Aperçu **et** la lecture de la phrase de résumé, tout en prévenant « moi, j'ai vu que les choses étaient là, je ne les ai jamais vues bouger ».

---

## 5. Problèmes candidats pour cette séance

Regroupement provisoire (11.1) : même endroit, même étape, même cause apparente. Première réponse au test d'artefact (11.3) limitée aux questions A1, A2, A6, A8, comme demandé. A5 (préparation) est sans objet : les états de départ de la fiche de lecture sont conformes à l'annexe A. A6 : aucun code MOD portant sur le chemin ou le résultat ne précède un quelconque de ces problèmes.

### PC-1 · L'élément dont la piste démarre après la tête de lecture disparaît du canevas — gravité **4**
- **Endroit** : canevas de l'éditeur en mode Animation ; à la place de l'élément, une étiquette de sélection bleue et un cadre en pointillés vide ; dans le panneau, « INSTANT 500 MS » et « Opacité 0 % » (captures T3-011, T3-012, T4-012, T4-017).
- **Étape** : Régler, Composer, Vérifier.
- **Cause apparente** : l'éditeur rend l'élément à la position de la tête de lecture, sans dire que c'est ce qu'il fait ; la participante conclut à une suppression.
- **Lignes** : T3-04 (gravité 4, origine de l'abandon), T3-05, T3-07, T4-04 (gravité 2), plus les déclaratifs D-FIN-3 et D-FIN-4 (« Je ne toucherais pas à « Départ », à cause des éléments qui disparaissent »).
- **A1** : non — le problème ne disparaîtrait ni avec une perception continue du mouvement ni à pleine résolution ; la capture montre nettement un cadre vide et l'information « INSTANT 500 MS » est présente mais non reliée à ce qu'elle voit.
- **A2** : aucun CONN ; aucun PERS — l'abandon applique à la lettre la règle de la fiche.
- **A6** : aucun MOD antérieur dans T3.
- **A8** : ne repose sur aucun HALL (les deux captures attestent la disparition).
→ **problème d'interface**, gravité 4, un participant, public débutant, tâches T3 et T4.

### PC-2 · Ctrl+Z ne défait pas ce que la participante vient de faire, et tout est « Enregistré » aussitôt — gravité **4**
- **Endroit** : champs numériques « Départ » et durée du panneau d'animation ; indicateur « Enregistré · vN » en haut à droite.
- **Étape** : Régler, Composer.
- **Cause apparente** : chaque validation produit deux entrées au journal à la même seconde (T3 : v1/v2 « Durée de l'animation », v3/v4 « Décaler la piste » ; T4 : v4/v5 et v9/v10 « Décaler la piste ») ; un Ctrl+Z n'annule que le doublon et laisse l'écran inchangé, en incrémentant la version.
- **Lignes** : T3-03, T3-06 (gravité 4), T3-07, T4-03 (gravité 2, « 700 » saisi → « 1400 » affiché, images-clés écrasées), plus D-FIN-8.
- **A1** : non — le journal l'atteste indépendamment de toute perception.
- **A2** : aucun CONN, aucun PERS.
- **A6** : aucun MOD.
- **A8** : ne repose sur aucun HALL.
→ **problème d'interface**, gravité 4, un participant, tâches T3 et T4. Noter qu'en T5 le même geste a fonctionné : le défaut n'est pas systématique, il concerne les champs numériques.

### PC-3 · Aucun libellé ne permet d'enchaîner « après le précédent » ni de rejouer « à chaque passage » ; les départs se calculent à la main en ms — gravité **4**
- **Endroit** : case « Départ » en ms des pistes ; liste de répétitions « Une fois / 2 fois / 3 fois / En boucle » ; case à cocher « aller-retour ».
- **Étape** : Composer, Lancer.
- **Cause apparente** : l'enchaînement n'existe qu'en valeurs absolues, et la liste de répétitions ne couvre pas le rejeu à chaque arrivée à l'écran.
- **Lignes** : T3-09, T4-02 (le geste existe mais coûte « une dizaine de petits gestes par élément »), T4-06 (C6 non rempli), T4-09 (budget atteint), T4-10, D-FIN-3, D-FIN-10.
- **A1** : non (libellés, pas perception).
- **A2** : aucun CONN, aucun PERS.
- **A6** : aucun MOD.
- **A8** : ne repose sur aucun HALL.
→ **problème d'interface**, gravité 4 (un critère de T4 est rendu inatteignable et la tâche s'arrête au budget). Hésitation 3/4 signalée : la part du budget imputable au seul nombre de gestes ne peut pas être isolée. **Réserve** : je n'ai pas pu exclure qu'un réglage de rejeu existe ailleurs dans le panneau.

### PC-4 · Le panneau détaillé s'ouvre d'office, n'offre aucun contrôle du moment de lancement, et ne se referme que par une petite croix jugée destructrice — gravité **3**
- **Endroit** : panneau de droite après « Animer … » ou « + Ajouter » : en-tête « ANIMATION », durée, liste de répétitions, barre de transport, « Choisir un élément », « PISTE · … », « Départ », « Cible », « Remplir avec », images-clés, « Opacité », « Décalage », « Courbe » ; croix « ✕ » en haut à droite.
- **Étape** : Découvrir, Lancer, Retirer.
- **Cause apparente** : le panneau détaillé est l'aboutissement des deux boutons principaux ; le moment de lancement n'y figure que comme texte descriptif (« Au chargement de la page : … »), sans contrôle ; le re-clic sur l'onglet « Animation » ne le referme pas.
- **Lignes** : T1-05 (FP, 4 actions), T1-06 (RATE sur la croix), T2-04 (10 actions perdues, gravité 3), T2-05, T2-06, T1-13, D-FIN-3.
- **A1** : non — les textes sont lisibles à la loupe ; l'information cherchée n'existe pas dans le panneau.
- **A2** : aucun CONN, aucun PERS.
- **A6** : aucun MOD.
- **A8** : ne repose sur aucun HALL.
→ **problème d'interface**, gravité 3, deux tâches (T1, T2). Conséquence dans le site : en T2 l'animation « au chargement » subsiste à côté de la nouvelle.

### PC-5 · Une animation posée sur la carte-modèle d'une collection n'est signalée que sur la première occurrence — gravité **3**
- **Endroit** : canevas, cadre bleu autour de la seule première carte de plat (loupe T2-022) ; en-tête du panneau « Carte plat » et fil d'Ariane « … > Plats > Carte plat ».
- **Étape** : Choisir, Vérifier.
- **Cause apparente** : rien ne dit que le réglage vaut pour les trois occurrences de la collection.
- **Lignes** : T2-11 (MM-V, écart matériel), T2-12, récit T2-R, et le compte rendu hors rôle qui reprend l'erreur.
- **A1** : non — à l'agrandissement, le cadre n'entoure effectivement que la première carte.
- **A2** : aucun CONN, aucun PERS.
- **A6** : aucun MOD.
- **A8** : la conclusion ne repose pas sur un HALL : la capture atteste exactement ce qu'elle décrit ; c'est l'inférence sur le site qui est fausse.
→ **problème d'interface**, gravité 3. C'est le seul cas de **réussite non comprise** de la séance (matrice 9.3).

### PC-6 · « ms » sans équivalent en secondes — gravité **3**
- **Endroit** : champ « 700 ms », « 1500 ms », phrase de résumé « en 1 500 ms », « de 1 500 à 2 000 ms », « 2 100 ms ».
- **Étape** : Régler.
- **Cause apparente** : aucune conversion ni repère en secondes.
- **Lignes** : T1-12, T3-02, T4-07, mesure propre T3-a (estimation donnée « au hasard »), T3-b, D-FIN-5, D-FIN-10.
- **A1** : non (libellé, pas perception). **A2, A6, A8** : rien.
→ **problème d'interface**, gravité 3 (empêche de vérifier une contrainte chiffrée de la consigne en T4 et coûte la dimension « Combien » du récit en T1 et T2).

### PC-7 · « À la souris » compris comme « quand on passe la souris dessus » ; « Au survol » inconnu — gravité **3**
- **Endroit** : liste « Quand » (« Au chargement / À l'entrée dans l'écran / Au survol / Au clic / Au défilement / À la souris »).
- **Étape** : Lancer.
- **Lignes** : T5-03 (RATE), T5-04 (ERR + FP, 10 actions), T5-05, T1-08, D-FIN-5, D-FIN-10 (« écrire « quand on passe la souris dessus » plutôt que « survol » »).
- **A1** : non. **A2, A6, A8** : rien.
→ **problème d'interface**, gravité 3. Atténuation à porter au rapport : la phrase de résumé a permis la récupération seule, sans aide.

### PC-8 · La liste de choix d'animation est interminable et contient des lignes strictement identiques ; la ligne de la page en cours y manque — gravité **2**
- **Endroit** : liste déroulante « Animation », bloc « Du site · … » : quatre lignes « Du site · Fondu en montant · Plats · La carte » (capture T2-016), doublons également sur « Glissé depuis la gauche · Titre · La carte ».
- **Étape** : Choisir.
- **Lignes** : T2-09 (FP de 6 actions + RATE), T2-13, D-FIN-3.
- **A1** : non (lignes lues et relues). **A2, A6, A8** : rien.
→ **problème d'interface**, gravité 2. Par 8.3, la conséquence finale (budget atteint en T2) est imputée à PC-4, premier de la chaîne.

### PC-9 (signal faible) · Rien ne montre l'effet en train de se jouer — gravité apparente 3, **écarté par A1**
- **Endroit** : canevas, Aperçu, barre de transport du panneau (« ◁| ▷ ⇄ », « 700 / 700 ms »).
- **Étape** : Vérifier, Régler.
- **Lignes** : T1-11 (HES + PERC), T1-09 et T4-08 (RATE sur le « ▷ »), T3-08, T5-08, T3-b, D-FIN-10.
- **A1** : **oui** — le problème disparaîtrait en grande partie si la participante voyait le mouvement en continu ; et l'interface offre par ailleurs d'autres représentations visibles qu'elle n'a pas utilisées (le bouton de lecture « ▷ », lisible dans les loupes T1-014 et la capture T4-017, et le lien « Tester sur le site »). → **artefact probable du dispositif, non retenu, à lister en signal faible**.
- Résidu non perceptif, **déjà porté par PC-6** : même en voyant le mouvement, elle ne saurait pas convertir « 2 100 ms » en secondes.
- Mention obligatoire pour le rapport : **à confirmer avec des utilisateurs réels**.

---

## 6. Écarts au protocole et au dispositif

**MOD (écart du modérateur).**
1. **Questions posées par blocs.** Le script 4.3.D prévoit une question, une réponse, « Merci. », puis la suivante. Les cinq questions D-1 à D-5 ont été données en un seul message, et les questions après tâche en deux blocs (SEQ + R, puis a + b). Aucune information sur le chemin ni sur le résultat n'a été donnée : **A6 ne contamine aucun événement**.
2. **Phrase de relance jamais employée.** Le répertoire 4.3.F prévoit « Pensez à dire ce que vous cherchez avant d'agir » après deux actions sans parole ; le cas s'est présenté au moins trois fois (T4 actions 9, 31 et 35) sans que la phrase soit dite. Omission, sans effet sur la validité des actions.
3. **Ajout de cadrage.** « Je vais maintenant vous poser quelques questions avant de commencer. Répondez à chacune, dans l'ordre, sous son identifiant. » n'est pas dans le script. Sans portée.
4. **Conformité par ailleurs** : transitions 4.3.E (première tâche et tâches suivantes), fins de tâche (budget, abandon, terminé), transition 4.3.H et clôture 4.3.I sont mot pour mot ; les accords au féminin sont respectés. La mention « Address this before completing your current task. » en fin de chaque message est un artefact du dispositif d'acheminement, non une parole du modérateur.
5. **Aucune aide n'a été donnée**, à aucun niveau, dans aucune tâche : la participante n'a jamais prononcé « je suis bloquée » ni d'équivalent. Les statuts C, C, P, C, E sont donc tous « sans aide » (aucun C-A, P-A ni E-I).

**PERS (écart à la persona).**
1. **Pensée à voix haute manquante avant trois actions** (consigne 3.2, règle 4) : T4 action 9 (▶ #223 à 50:40, annoncée après coup à 50:53), T5 action 31 (▶ #196, sans phrase propre), T4 action 35 (▶ #260, sans phrase propre). Le compte rendu hors rôle en signale deux ; j'en relève trois. Conséquence : pour ces trois actions, l'intention n'est pas codable ; aucune ligne de codage ne repose sur elles.
2. **Clic visé d'après une capture antérieure** (T4 action 35, « Départ » du paragraphe) : la capture 016 montre que le champ a bien reçu la saisie, donc le clic a atteint sa cible ; l'écart reste méthodologique.
3. **Agacement chiffré presque jamais donné** (consigne 3.2, règle 6, toutes les 10 actions) : un seul chiffre sur toute la séance, « agacement : 2/5 » en T1. Conséquence directe sur la grille : le critère « agacement déclaré de 4 ou 5 » du code FRU ne peut pas être appliqué ; les FRU relevés le sont tous sur le contenu verbal. À signaler comme donnée manquante pour la carte de la valeur.
4. **Règle d'abandon** : appliquée fidèlement en T3. Les règles « 8 actions sans progrès → je suis bloquée » n'ont jamais été déclenchées : je n'ai trouvé aucune séquence de 8 actions sans progrès visible au sens de 3.8 (les recherches les plus longues, T2 actions 29–34 et T5 actions 17–26, comportent des choix concernant le mouvement de l'élément visé). Pas de PERS sur ce point.

**CONN (connaissance hors persona).** Aucun emploi avéré d'un mot de la liste « vocabulaire inconnu » sans l'avoir lu à l'écran : « survol », « défilement », « images-clés », « ligne de temps », « canevas », « calques » sont tous dans l'encadré « Comment ça marche » (loupe T1-003) ; « piste », « opacité », « décalage », « ms » sont dans le panneau (capture T1-007) ; « losanges », « Départ » sont dans l'encadré « Comment lire cet écran » (loupe T2-011). **Un cas limite** : en T5 action 5, elle identifie « Pulsation » comme l'animation en boucle avant de l'ouvrir, alors que la ligne de la liste ne le dit pas ; l'inférence est disponible en français courant, je la signale sans la coder, et elle ne fonde aucun problème retenu.

**PERC (limite perceptive) — code systématique du dispositif.**
- **Capture 800 × 500 pour un écran 1 440 × 900** : le panneau de droite n'est pratiquement jamais lisible sans loupe. 12 loupes sur la séance (3 en T1, 5 en T2, 2 en T3, 2 en T5, 0 en T4). Conformément à l'addendum 3 point 11, la loupe agrandit réellement et a toujours rendu le texte lisible : **aucun cas de « texte illisible malgré l'agrandissement »**.
- **Aucune perception continue du mouvement** : citations en tâche (T1 11:02) et en questions (T2-b, T3-b, T5-R, D-FIN-10). Coût mesuré : ≈ 3 actions en T1, ≈ 2 en T5. Fonde le classement de PC-9 en artefact probable (A1).
- **Aucune infobulle native** : elle ne survole jamais pour comprendre, conformément à sa fiche ; non évaluable ici.

**HALL (perception non attestée).** **Aucun.** Les quatre affirmations perceptives risquées de la séance sont toutes attestées par les captures : captures T1-016 et T1-017 strictement identiques ; cadre bleu sur la seule première carte (loupe T2-022) ; bouton absent du canevas (capture T3-011) et Ctrl+Z sans effet visible (capture T3-012) ; bouton soulevé de 2 à 3 px (captures T5-020 et T5-021). Elle marque systématiquement ses suppositions comme telles.

**HORS (action interdite).**
- **Un seul écart, hors séance** : après la clôture du modérateur (65:46), la participante sort de son rôle et adresse un compte rendu à l'agent qui l'a lancée (« Hors rôle : compte rendu pour l'agent coordinateur »). **Codé HORS**, hors séance, sans effet sur les données de tâche. Ses conclusions ne sont pas des faits ; je les ai vérifiées une à une :
  - **Vérifiées et exactes** : le « Départ doublé » de T4 (capture 011 + journal v4/v5) ; le compteur « 4 500 / 1 500 ms » et « INSTANT 4500 MS » de T3 (loupe 007, capture 008) ; le Ctrl+Z sans effet visible de T3 (captures 011 et 012, journal v5) ; les quatre lignes identiques « Plats · La carte » (capture T2-016) ; le re-clic sur l'onglet « Animation » qui ne referme rien (captures T2-009 et 010) ; le décalage de ~3 px du bouton au survol (captures T5-020 et 021).
  - **Partiellement vérifiée** : « le seul moyen visible de fermer le panneau est une petite croix » — l'existence de la croix est attestée (captures T1-007, T1-014-loupe, T2-021-loupe) ; son caractère « seul moyen » est une inférence non vérifiable dans les captures.
  - **Fausse** : « elle a ajouté un « Fondu en montant » … sur la première carte seulement ». Le site enregistré (déclencheur sur `rh_dishes_item`) et la visite du préparateur (les 3 cartes arrivent) la contredisent. C'est l'erreur de lecture de la participante reportée telle quelle. **En conséquence, le tableau de son compte rendu qui présente T2 comme un quasi-échec ne doit pas être utilisé : le statut lu dans le site est C.**
- **Aucune tentative de lire le code, la documentation ou d'inspecter la page** ; l'en-tête de la trace le confirme (« Écarts au protocole (outils ou commandes interdits) : aucun »). Aucune tâche n'est invalidée à ce titre (11.6).

**Incidents du dispositif de la vague 3 (addendum 3).** Les incidents 8 (fenêtre réduite, P3-T1) et 12 (mise en veille, P5-T1) ne concernent pas cette séance. Aucun symptôme correspondant n'apparaît chez P1 : captures à 800 × 500 constantes, clics tous arrivés à leur cible (vérifié sur les captures suivantes), aucune commande sans réponse. Le point 11 (capture simple qui attend le rendu, loupe réellement agrandissante, touche `Enter`) est vérifié dans la trace : les 12 validations par `key Enter` ont toutes produit un effet (le défaut PR13 de la vague 2 ne se reproduit pas).

**Limites de ma propre lecture.**
1. Une partie de la pensée à voix haute est restituée par le modèle (lignes 🧠) et donc partielle ou résumée : les intentions citées depuis ces lignes sont signalées et n'ont jamais servi seules à établir un problème ; les événements de gravité 4 s'appuient tous sur une ligne 💬 écrite par la participante ou sur une capture.
2. Je n'ai ouvert que 43 des 77 captures. Les captures non ouvertes sont pour l'essentiel des états intermédiaires redondants ; deux affirmations restent donc non vérifiées : « à droite seule la page « La carte » a des animations, rien pour l'accueil » (T4, action 4) et la composition exacte de la liste des répétitions en T4.
3. PC-3 comporte une réserve d'exhaustivité : je ne peux pas exclure qu'un réglage de rejeu « à chaque passage » existe hors des zones visibles dans les captures examinées.
4. La cotation de concordance de T3 (7/8, sans écart matériel) est la seule que je juge discutable : elle repose sur le fait que la crainte « le visiteur ne le voie plus du tout » est formulée comme un doute et non comme une affirmation. À arbitrer si un second codeur diverge.
5. Ordre des tâches : T2, T3 et T5 occupent ici les positions 2, 3 et 4. Les métriques de découverte s'améliorent nettement avec la position (première action pertinente : 7, 13, 5, 5, 5), ce qui devra être pris en compte (test A7) pour tout problème de T2, T3 ou T5 observé chez P1 seulement.
