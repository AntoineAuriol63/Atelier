# Observation · séance P1 (Nathalie, débutante) · vague 2

Codage indépendant, fait de zéro sur la trace réextraite (lignes 💬 et 🧠), avec la grille du protocole (sections 8 et 9), les addendums 1 et 2 et la fiche de lecture du site. La première version de ce codage n'a pas été lue.

Conventions de lecture :
- **N° d'action** = compte du participant, reconstitué appel par appel et vérifié contre ses annonces (29, 35, 20 puis 30, 26, « [24] » et « Étape 10 », 38) : une loupe (loupe + attente + capture) compte 1 ; un lot « capture, attente, capture » compte 3 ; `resize_window` et `tabs_context` ne comptent pas. **#n** = numéro d'appel d'outil de la trace.
- **Horodatage** = temps de séance de la trace (mm:ss). Heure UTC ≈ temps de séance + 07:40:49 (calage sur les 9 entrées du journal, écart ≤ 1 s) ; donnée entre parenthèses pour les modifications.
- Les lignes 🧠 sont citées comme pensée à voix haute, avec la réserve de l'addendum 2 §13 (pensée restituée, partielle, parfois résumée).
- Captures : les numéros renvoient aux fichiers de `traces/captures-p1/`.

---

## 1. Résumé de la séance

- P1 (Opus 5) a passé les cinq missions dans l'ordre T1, T2, T3, T5, T4 : 23 min 20 de trace, 155 appels d'outils, 158 actions comptées, 83 captures, une seule aide (niveau 1, en T3). Aucune action interdite.
- T1 : dès l'action 6, elle ouvre seule la section « Animation » du panneau du titre et choisit « Fondu ». Le lancement « quand le titre entre dans l'écran » était proposé d'office. Réussite complète en 10 actions ; ni le triangle ▷ ni l'Aperçu ne lui ont montré l'effet.
- T2 : elle regarde d'abord la page comme une visiteuse. Elle ne trouve pas le lancement « au chargement de la page » posé sur la liste parente « Plats » : le panneau de la photo cliquée affiche « Aucune ». Elle ajoute un « Fondu en montant » à l'entrée dans l'écran sur la photo du modèle de carte, puis déclare terminé. Statut retenu : échec.
- T3 : elle ralentit le titre en 5 actions (« Lente », 1 120 ms). Elle ne trouve aucun réglage pour faire partir les boutons « après ». Elle sort aussitôt du mode Animation (mots inconnus, bouton affiché invisible), se déclare bloquée à 20 et abandonne à 30. Réussite partielle.
- T5 : elle retire la pulsation sans toucher au zoom d'arrivée et ajoute « Soulever » au survol du bon bouton. Vérification dans « Tester sur le site ». Réussite complète en 26 actions.
- T4 : elle pose quatre apparitions séparées, sans ordre, sans répétition ni dépassement. Elle se perd dans le composant « Chiffre clé » et abandonne à 38 sans s'être déclarée bloquée. Échec.
- Ses récits du visiteur sont exacts (6 à 7 sur 8, aucun écart matériel). Le défaut des captures en retard (addendum 2 §12) lui a coûté 3 actions (deux loupes, une capture de contrôle) et n'explique aucun de ses arrêts.

---

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut : C** (réussite complète). **Accord** avec le préparateur.
- R1 : le titre « Une cuisine de… » [rh_about_h2] porte l'animation « Fondu », images-clés opacité 0 → 1, ce qui est une arrivée visible.
- R2 : lancement `on=inView` (à l'arrivée à l'écran), une seule fois.
- R3 : 700 ms.
- R4 : aucun mouvement permanent.
- R5 : une seule entrée au journal (07:42:22 v1 « Apparition · Fondu »).
- La visite du préparateur confirme le fondu à l'entrée. Elle note un « éclair o=1 avant départ » : un défaut de rendu possible, sans effet sur les critères et non imputable au participant.

**Mode de fin** : terminé déclaré (03:21). **Aides** : aucune.

**Métriques 9.2**
- Actions totales : **29** (appels #1 à #27 : 27 appels, dont 23 comptés).
- Temps : 2 min 53 (00:28 → 03:21).
- Actions perdues à cause du défaut des captures en retard : **1** (loupe #8 sans effet, captures 007 et 008 identiques au pixel).
- Coût de la perception discontinue (PERC, limite propre au dispositif, hors défaut 12) : environ 8 actions, soit la seconde capture et l'attente du ▷ (#17) et la seconde descente dans l'Aperçu (#23 à #25).
- Première action pertinente : **6** (#9, ouverture de la section « Animation », capture 010 : Apparition, Au survol, En continu, tous sur « Aucune »). Si l'on compte l'en-tête « Animation » replié visible sur 007, ce serait 3.
- Actions jusqu'à la réussite : **10** (#13, « Fondu »).
- Captures et loupes : 13 captures (dont 3 doubles dans des lots) et 3 loupes, dont 2 opérantes (005, 015) et 1 sans effet (#8) ; 3 attentes.
- FP : 0. HES : 1 (L1-05, 5 actions). ERR : 0. COLL-D : 0 ; COLL-ND : 0. RATE : 0.
- VERIF : oui, rang **17** (#18 Aperçu, descente jusqu'au titre en 19). VERIF-E : oui, rang **11** (lecture de la phrase), puis 13 (▷).
- VOC : « ms », « survol » (déclarés en réponse T1-SEQ et T1-b).
- SEQ : **5**.

**Concordance du récit (9.4)** : **7/8**, écart matériel **non**.
- Quoi **2** : « le titre « Une cuisine de produits, servie sans chichi. » », seul élément animé.
- Quand **2** : « Quand il descend dans la page et que le titre arrive à l'écran, celui-ci apparaît doucement, en fondu, à vitesse normale. » Le site porte `on=inView`.
- Comment **2** : « en fondu », pour une animation « Fondu ».
- Combien **1** : le nombre de fois est exact (« La phrase disait « une seule fois », donc je pense que s'il remonte et redescend, ça ne recommence pas. »), mais la durée reste vague (« à vitesse normale », pour 700 ms).
- Matrice : réussite comprise.

**Mesures propres**
- Première action pertinente : 6.
- VERIF avant « J'ai terminé » : oui (17), précédée de VERIF-E (11).
- Moment de lancement : « à l'entrée dans l'écran », proposé d'office par le choix « Apparition », non choisi. T1-b : « je ne l'ai pas choisi, c'était déjà comme ça ».

### T2 · Ce que voit vraiment le client (position 2)

**Statut : E** (échec). **Désaccord partiel** avec le préparateur, qui proposait « P discutable, E possible ».
- État de départ : les N = 3 cartes arrivent par la liste « Plats » [rh_dishes_list], lancement `on=load`, « enfants ».
- Site final : cet état est inchangé ; s'y ajoute « Image » [rh_dishes_img], la photo du modèle de carte, « Fondu en montant » 700 ms, `on=inView`, une fois. La visite du préparateur montre les trois photos qui arrivent à l'entrée, tandis que noms, prix et descriptions restent immobiles.
- R1/R2 : le mouvement d'arrivée de chaque carte (5.0 : « l'élément part d'au moins l'un de ces états ») se lance toujours à l'ouverture de la page. À l'arrivée à l'écran, seule la photo, un élément contenu, bouge ; la carte, elle, ne part d'aucun état.
- C'est l'exemple d'échec de la section 5 : « cartes toujours lancées à l'ouverture de la page ». C'est aussi l'analogue de l'échec T1 « mouvement posé seulement sur un autre élément ».
- R4 rempli : « Cette saison » et « Quelques plats signature » sont inchangés. R5 rempli.
- Hésitation : en lecture souple (une carte « porte » le mouvement de sa photo), le statut serait P, avec les critères R1 à R3 remplis sur les photos. Je retiens E selon la définition opérationnelle de 5.0. Avec P, la gravité de L2-02 passerait de 4 à 3.

**Mode de fin** : terminé déclaré (07:34), avec réserve : « Je ne suis pas sûre que ce soit exactement ce qu'on avait promis à Aurèle » (T2-R). **Aides** : aucune.

**Métriques 9.2**
- Actions totales : **35** (appels #28 à #58 : 31 appels, dont 29 comptés ; le « 58 appels » de la fiche est le numéro du dernier appel).
- Temps : 3 min 20 (04:14 → 07:34).
- Actions perdues à cause du défaut des captures en retard : **0**. Coût PERC : 1 capture de contrôle (#58).
- Première action pertinente : **19** (#44, section « Animation » de la photo du plat, capture 045). La photo appartient à la carte visée ; l'animation des cartes elles-mêmes, portée par « Plats », n'a jamais été affichée.
- Actions jusqu'à la réussite : **non atteint**.
- Captures et loupes : 18 captures (dont 6 dans 3 lots), 0 loupe ; 3 attentes.
- FP : **1**, 4 actions perdues. HES : 0. ERR : 0. COLL-D : 0 ; COLL-ND : 0. RATE : **1**.
- VERIF : oui, rang **2** (Aperçu, jusqu'aux plats en 9 à 11), puis rang 31 (« Tester sur le site »). VERIF-E : rang 30.
- VOC : « base de données », « champ » (en fin de tâche) ; « Texte alt. » (déclaratif, débriefing).
- SEQ : **4**.

**Concordance du récit (9.4)** : **6/8**, écart matériel **non**.
- Quoi **1** : « le titre apparaît en montant doucement » et « les photos des trois plats arrivent en fondu, en montant un peu ». Il omet le surtitre « Cette saison » (fondu à l'entrée) et le mouvement des cartes au chargement. « Les noms des plats, les prix et les petites descriptions ne bougent pas » est exact pour une visiteuse qui descend (visite du préparateur).
- Quand **2** : « Quand il arrive à « Quelques plats signature », le titre apparaît […] Ensuite, les photos […] arrivent », conforme à `inView` (titre avec retard de 100 ms, photos plus bas).
- Comment **2** : « fondu en montant », conforme au site.
- Combien **1** : « une seule fois » est exact ; « à vitesse normale » reste vague (600 et 700 ms).
- Matrice : échec lucide au sens de la matrice. Elle décrit exactement ce qu'elle a produit, mais croyait avoir répondu à la demande.

**Mesures propres**
- Diagnostic T2-a : **faux**. « D'après moi, avant, il n'y avait tout simplement aucun effet sur les plats. » Il ne désigne pas le lancement à l'ouverture de la page.
- VERIF avant la première modification : **oui** (rang 2 ; première modification à 29).
- Modifications collatérales présentes à la fin : aucune.

### T3 · Donner du rythme à l'accueil (position 3)

**Statut : P** (réussite partielle, aide de niveau 1 seulement). **Accord** avec le préparateur.
- R1 rempli : grand titre `on=load`, « Fondu en montant » 1 120 ms, dans l'intervalle 900 à 4 000 ms.
- R2 non rempli : les deux boutons sont toujours `on=load`, sans retard, 500 ms.
- R3 rempli : paragraphe `on=load`, 500 ms.
- R4 rempli : une seule entrée au journal (07:49:58 v1 « Apparition · lente »).

**Mode de fin** : abandon (ABD, 12:50, action 30). **Aides** : 1, de niveau 1, à l'action 20 (11:26), conforme à 4.4.

**Métriques 9.2**
- Actions totales : **30** (appels #59 à #91 : 33 appels, dont 30 comptés).
- Temps : 4 min 13 (08:37 → 12:50), dont l'échange d'aide de 11:19 à 11:55.
- Actions perdues à cause du défaut des captures en retard : **1** (loupe #64 sans effet, 063 et 064 identiques). Les actions 21 à 30, qui fondent l'abandon, n'ont pas été touchées par ce défaut.
- Première action pertinente : **2** (#62, titre sélectionné ; capture 063 avec « Fondu en montant »).
- Actions jusqu'à la réussite (statut P) : **5** (#65, « Lente »).
- Captures et loupes : 15 captures, 1 loupe (sans effet).
- FP : **3**, 14 actions perdues (4 + 6 + 4). HES : 1 (verbal, action 12). ERR : 1, récupérée seule. COLL-D : 0 ; COLL-ND : 0. RATE : **1** (« Départ 0 ms », 074).
- VERIF : **non**. VERIF-E : rang **6** (phrase « … 1 120 ms »).
- VOC : « image-clé », « opacité », « échelle » (dits pendant la tâche) ; « décalage », « piste », « préréglage », « aller-retour », « cible » (vus en 074, déclarés en D-FIN-5).
- SEQ : **2**.

**Concordance du récit (9.4)** : **6/8**, écart matériel **non**.
- Quoi **1** : le grand titre, « Réserver une table », et « Voir la carte » (« je suppose qu'il fait pareil ») sont cités ; le paragraphe (fondu 500 ms au chargement) est omis (« Le reste de la page est comme avant »).
- Quand **2** : « Dès que la page se charge […] les deux boutons partent en même temps que le titre », conforme à trois lancements `on=load` sans retard.
- Comment **2** : « arrive en montant », pour « Fondu en montant ».
- Combien **1** : les durées sont exactes (« un peu plus d'une seconde », pour 1 120 ms ; « en 500 ms », pour 500 ms), le nombre de fois n'est pas dit.
- Matrice : échec lucide.

**Mesures propres**
- R1 : vrai à l'action 5, sans aide à ce moment-là.
- R2 : jamais vrai. Aide de niveau 1 à 20.
- Estimation T3-a : « une demi-seconde, à peu près ». La fin réelle des boutons est à 500 ms (retard 0 + 500) : **juste**.
- T3-b : jugement sur l'étiquette « Lente » et le chiffre de la phrase, sans vérification visuelle.

### T5 · Calmer la pastille, réveiller le bouton (position 4)

**Statut : C** (réussite complète). **Accord** avec le préparateur.
- S1 rempli : la pulsation `on=load delay=800` est retirée (07:55:16 v1 « En continu · aucun »).
- S2 rempli : zoom `on=load delay=300`, 500 ms, soit 800 ms au total, dans l'intervalle 200 à 1 500 ms, jamais retiré.
- S3 entier : « Réserver une table » [rh_hero_b1] a `on=hover reverseOnLeave`, « Soulever », translateY 0 → −4 px (au moins 2 px), 250 ms (au plus 800 ms), une seule fois par passage (07:55:59 v2).
- S4 rempli : rien d'autre au journal.
- Réserve : la confirmation « comme un visiteur » n'a pas été faite sur le site de P1 mais sur celui de P3, de configuration identique (note du préparateur). Correction : P1 a survolé le bouton dans la page de « Tester sur le site » (116, adresse `/preview/…?voir=rh_hero_b1`), pas « dans l'éditeur ».

**Mode de fin** : terminé déclaré (15:49). **Aides** : aucune.

**Métriques 9.2**
- Actions totales : **26** (appels #92 à #117 : 26 appels, dont 24 comptés).
- Temps : 2 min 04 (13:45 → 15:49).
- Actions perdues à cause du défaut des captures en retard : **0**.
- Première action pertinente : **4** (#97, « Pastille » sélectionnée ; 098 : « 2 animations », Zoom et Pulsation). La capture 096 montrait l'écriture sélectionnée, section « Animation » repliée.
- Actions jusqu'à la réussite : **18** (#111, « Soulever »). S1 est rempli dès l'action 8.
- Captures et loupes : 14 captures (dont 2 dans un lot), 0 loupe ; 1 attente, 1 survol.
- FP : 0. HES : 0. ERR : **2**, récupérées seules toutes les deux. COLL-D : 0 ; COLL-ND : 0. RATE : 0.
- VERIF : oui, rang **20** (« Tester sur le site », survol du bouton en 22, deux captures de la pastille). VERIF-E : rang **9**.
- VOC : aucun nouveau. « Survol », déjà compté en T1, est deviné ici grâce à la phrase « puis retour quand la souris part » (112).
- SEQ : **6**.

**Concordance du récit (9.4)** : **7/8**, écart matériel **non**.
- Quoi **2** : la pastille et le bouton, rien de plus.
- Quand **2** : « arrive sur la photo avec un zoom, peu après l'ouverture » (retard 300 ms) ; « Quand le visiteur passe la souris sur « Réserver une table », le bouton monte un tout petit peu, et il redescend quand la souris s'en va. »
- Comment **2** : zoom ; montée légère et retour.
- Combien **1** : le nombre de fois est exact (« Ensuite, elle reste tranquille : elle ne pulse plus »), la durée n'est pas dite dans le récit (« 250 ms » n'apparaît qu'en T5-b).
- Matrice : réussite comprise.

**Mesures propres**
- S1 à l'action 8, S2 conservé, S3 entier à l'action 18.
- S2 jamais perdu au journal.
- T5-a affirme l'arrêt, et S1 est rempli : pas de MM.
- Confusion entre le bouton du héros et celui de l'en-tête : non.

### T4 · La maison racontée comme une scène (position 5)

**Statut : E** (échec). **Accord** avec le préparateur.
- Profil de critères :
  - C1 **rempli** : photo glissée depuis la gauche (−40 px et opacité), titre en fondu en montant, paragraphe en fondu, zoom sur les trois chiffres ;
  - C2 **non rempli** : quatre déclencheurs `inView` séparés ;
  - C3 **non rempli** : départs simultanés si la section entre d'un coup ;
  - C3b **non rempli** : les trois instances du composant partent ensemble ;
  - C4 **non rempli** : la fin est à 700 ms, pour 1 800 à 3 000 ms demandés ;
  - C5 **non rempli** : photo et titre conformes, mais pas de dépassement sur les chiffres (courbe `cubic-bezier(.22,1,.36,1)`) ;
  - C6 **non rempli** : « une seule fois ».
- C3 non rempli suffit à l'échec.

**Mode de fin** : abandon (ABD, 20:23, action 38). **Aides** : aucune, faute de blocage déclaré (voir PERS, L4-12).

**Métriques 9.2**
- Actions totales : **38** (appels #118 à #155 : 38 appels, dont 36 comptés).
- Temps : 3 min 43 (16:40 → 20:23).
- Actions perdues à cause du défaut des captures en retard : **1** (capture de contrôle #136 après un titre absent sur 135).
- Première action pertinente : **4** (#123, section « Animation » de la photo ; 124 : « Apparition : Aucune »).
- Actions jusqu'à la réussite : **non atteint**.
- Captures et loupes : 19 captures (dont 2 dans un lot), 0 loupe ; 1 attente.
- FP : 0. HES : **3** (actions 11, 30 et 31 à 34). ERR : **1**, non récupérée (portée du réglage sur le composant). COLL-D : 0 ; COLL-ND : 0. RATE : **1** (« Ouvrir dans le mode Animation », 149).
- VERIF : oui, rang **35** (« Tester sur le site », 155-2). VERIF-E : rang **11**.
- VOC : « composant », « instance » (pendant la tâche) ; « propriété du composant » (déclaratif, débriefing).
- SEQ : **1**.

**Concordance du récit (9.4)** : **7/8**, écart matériel **non**.
- Quoi **2** : photo, titre, paragraphe et « les trois chiffres (12, 38 et 14) ».
- Quand **1** : « Quand le visiteur descend jusqu'à « La maison », tout arrive d'un coup, en même temps. » C'est exact si la section entre d'un coup (hypothèse de calcul de la section 5, et ce que montre 155-2). Elle ne dit pas que chaque élément part à sa propre entrée dans l'écran, ce qui peut étaler les départs en défilement lent. Je ne le compte pas comme un écart d'ordre.
- Comment **2** : « la photo glisse depuis la gauche en devenant nette » ; « le titre monte un peu en apparaissant » ; « le paragraphe apparaît en fondu » ; « apparaissent avec un zoom ». Tout est conforme.
- Combien **2** : « Chaque effet dure 700 ms » est exact ; « Si le visiteur remonte puis redescend, rien ne recommence » est exact.
- Matrice : échec lucide.

**Mesures propres**
- Structure de lancement : lancements séparés à l'entrée dans l'écran de chaque élément, dont un déclencheur sur la racine du composant « Chiffre clé » qui vaut pour chaque instance. Aucun retard, aucun événement commun.
- T4-a : **cohérente** avec la structure enregistrée. « je choisirais sans doute « Rapide », mais je sais bien que ça ne le fait pas arriver plus tôt » ; « le paragraphe est déjà à zéro, alors je ne vois pas comment le faire partir plus tôt que ça ». Pas de MM.

---

## 3. Lignes de codage

Colonnes du format 8.5. Séance : P1 pour toutes les lignes. « — » dans la colonne Gravité signale un code sans gravité (VERIF, DEC, codes du dispositif, affect verbal).

### T1 (position 1)

| ID | Tâche | Pos. | Action / appel | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L1-01 | T1 | 1 | 5 / #8 | 01:04 | Découvrir | PERC | — | panneau de droite du titre, section « Animation » repliée en bas (007) | 🧠 « Le zoom n'a rien changé » ; 007 et 008 identiques au pixel | PERC | Loupe sans effet : captures en retard d'une image (add. 2 §12). 1 action perdue. A1 : artefact. Les loupes #5 (005) et #15 (015) ont fonctionné. |
| L1-02 | T1 | 1 | 11–12 / #14–#15 | 01:37–02:10 | Vérifier | VERIF-E | — | phrase sous « Rapide · Nor… · Lente » : « Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois. » ; badge « 1 animation » (014, loupe 015) | 🧠 « Je vérifie que l'animation « Fondu » est bien appliquée à l'apparition, avec un badge « 1 animation » et le statut « Enregistré ». » | aucun | Première vérification (dans l'éditeur). |
| L1-03 | T1 | 1 | 13–16 / #16–#17 | 02:10–02:25 | Vérifier | VERIF-E ; PERC | — | triangle ▷ à droite de la liste « Fondu » (014) | 🧠 « Le titre reste identique sur les deux captures, donc je ne peux pas confirmer si l'effet « Fondu » s'est produit. » ; 017-1 = 017-2 | PERC (PERS possible, non codé : voir section 6) | Capture 3 s après le clic, pour un fondu de 700 ms. A1 : un humain aurait vu le fondu ; la phrase donne l'information, et elle l'a utilisée. |
| L1-04 | T1 | 1 | 17–22 / #18–#22 | 02:25–02:53 | Vérifier | VERIF | — | bouton « Aperçu » en haut à droite ; page du site sous une barre d'onglets « Atelier (éditeur) · Maison Aurèle » ; titre déjà en place (022-1) | 🧠 « Le site s'affiche dans un nouvel onglet comme le verrait un visiteur. » | PERC | Rang 17 ; elle descend jusqu'au titre. Le présente elle-même comme la vue du visiteur. |
| L1-05 | T1 | 1 | 23–27 / #23–#25 | 02:53–03:12 | Vérifier | HES | 2 | page Aperçu, section La maison (025-1 et 025-2 identiques à 022-2) | 🧠 « Je remonte en haut de la page pour refaire la descente et mieux observer l'effet. » | PERC | 5 actions sans modification. Le fondu, lancé « une seule fois », ne rejoue pas. A1 : oui ; la phrase donne l'information → artefact probable. |
| L1-06 | T1 | 1 | 29 / #27 | 03:21 | Vérifier | FRU (verbal) | — | éditeur, « Apparition : Fondu », « Enregistré · v1 » | 💬 « Ce qui m'embête, c'est de n'avoir jamais vu l'effet de mes propres yeux, ni avec le petit triangle ni dans l'Aperçu. » | PERC | Elle conclut sur la phrase : « Je fais confiance à la phrase. » |
| L1-07 | T1 | 1 | après tâche (T1-SEQ) | 03:38 | Régler | VOC « ms » | 2 | phrase « … fondu en 700 ms, une seule fois. » (014) | 💬 « Il y avait aussi « 700 ms » dans la phrase, et ça ne me dit rien. » | aucun | Dit en réponse. Mot non compris sans effet sur le résultat. En T3-a, elle en déduit « des morceaux de seconde ». Compté une fois pour la séance. |
| L1-08 | T1 | 1 | après tâche (T1-b) | 04:04 | Découvrir | VOC « survol » | 2 | ligne « Au survol : Aucun » (010, 014) | 💬 « Je ne m'attendais pas à voir « Au survol », que je ne comprends pas » | aucun | Sans effet en T1. En T5, deviné et confirmé par la phrase « puis retour quand la souris part » (112). Compté une fois. |
| L1-09 | T1 | 1 | après tâche (T1-b) | 04:04 | Lancer | MM (déclaratif) | 0 | section « Animation » : pas de choix du moment de lancement ; la phrase dit « entre dans l'écran » (014) | 💬 « Ça tombait bien, puisque c'est ce que voulait Aurèle, mais je ne l'ai pas choisi, c'était déjà comme ça. » | aucun | Attente « tout seul ou au clic » contredite. Ici favorable : moment correct par défaut. Utile pour QR1 (le moment n'a pas été décidé). |

### T2 (position 2)

| ID | Tâche | Pos. | Action / appel | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L2-01 | T2 | 2 | 2–11 / #31–#36 | 04:31–05:00 | Vérifier | VERIF | — | « Aperçu », section « Quelques plats signature », trois cartes déjà en place (036-2) | 🧠 « J'ai localisé les trois plats (salade, thé, café) dans l'Aperçu, déjà positionnés comme indiqué par Aurèle, mais sans pouvoir confirmer le mouvement en continu. » | PERC | Rang 2, avant toute modification. Constat juste : un humain aurait vu la même chose. « Salade, thé, café » correspond aux photos (036-2) : pas HALL. |
| L2-02 | T2 | 2 | 18 / #43 | 05:23 | Découvrir | RATE | 4 | fil d'Ariane en haut du panneau : « À la carte › Contenu › Plats › Carte plat › Image » (043 ; aussi 045, 055) | capture 043 ; T2-a : « Il y avait une petite ligne en haut du panneau, « Plats › Carte plat › Boîte… », mais je n'ai pas compris à quoi elle servait. » | aucun | « Plats » menait à la liste qui porte le lancement « Au chargement de la page » (fiche, état de départ). Premier événement de la chaîne qui mène à l'échec avec « terminé » déclaré, d'où la gravité 4 (8.3). Hésitation : la gravité 4 serait aussi défendable sur L2-03 ; elle tomberait à 3 avec un statut P. |
| L2-03 | T2 | 2 | 19–20 / #44–#45 | 05:32–06:02 | Découvrir | MM | 3 | section « Animation » de « Image » : « Apparition Aucune », « Au survol Aucun », « En continu Aucun » (045) ; rien n'indique un mouvement porté par un parent | 🧠 « La photo n'a aucun effet d'animation configuré, ce qui explique pourquoi rien ne bouge malgré ce qu'on avait promis à Aurèle. » | aucun | Explication contredite par le site (« Plats » `on=load`). Coût propre : les actions 21 à 35 visent une fausse cause (≥ 10). Première action pertinente de la tâche (19). |
| L2-04 | T2 | 2 | 21–24 / #46–#49 | 06:02–06:41 | Découvrir | FP | 2 | titre « Quelques plats signature » (« Fondu en montant »), puis nom « Œuf parfait, crème de lentilles du Puy » (« Aucune ») | 🧠 « Je vais vérifier si l'effet se trouve plutôt sur le nom du plat en cliquant sur « Œuf parfait, crème de lentilles du Puy ». » | aucun | 4 actions. Le détour par le titre lui sert aussi de modèle (« Fondu en montant » réutilisé) : 2 actions perdues seulement si on l'exclut. Gravité 2 dans les deux cas (une FP n'entre pas au niveau 1). |
| L2-05 | T2 | 2 | 30 / #55 | 07:06 | Vérifier | VERIF-E | — | « Apparition : Fondu en montant », phrase « Quand « Image » entre dans l'écran : fondu en montant en 700 ms, une seule fois. », « 1 animation », « Enregistré · v1 » (055) | 🧠 « L'effet « fondu en montant » est bien appliqué à l'image et enregistré. » | aucun | Modification à 29 (07:47:41 UTC). |
| L2-06 | T2 | 2 | 31–35 / #56–#58 | 07:06–07:34 | Vérifier | VERIF ; FRU (verbal) ; SAT (verbal) | — | lien « Tester sur le site » ; page sous le bandeau « Test de l'animation : l'élément arrive à l'écran comme pour un visiteur… » ; 057-1 noire, 057-2 photos pâles et textes nets, 058 tout en place | 🧠 « écran noir puis plats semi-transparents avec le titre « Quelques plats signature » manquant, ce qui m'inquiète un peu » ; 💬 « Cette fois, tout est là. » | PERC | Rang 31. Description attestée par 057-2 et 058 (pas HALL). 1 capture de plus (#58) liée à la perception discontinue. |
| L2-07 | T2 | 2 | 35 / #58 | 07:34 | Choisir | DEC | — | les trois cartes (058) | 💬 « J'ai mis sur la photo le même effet que sur le titre, et ça s'applique aux trois plats. » | aucun | Comprend, sans l'avoir cherché, que régler la photo d'une carte vaut pour les trois (site : « Image » du modèle de carte). |
| L2-08 | T2 | 2 | 35 (dit) ; mots vus en 18 et 24 | 07:34 | Découvrir | VOC « base de données », « champ » | 2 | « Cette image est liée à un champ de base de données (image). » (043) ; bandeau bleu au clic sur le nom du plat (cité en T2-SEQ) | 💬 « Ce qui reste flou pour moi, ce sont les histoires de « base de données » et de « champ » : je ne sais pas si ça joue. » | aucun | Évitement : « je préfère ne pas y toucher pour l'instant » (🧠 #43). Sans effet sur le site. |
| L2-09 | T2 | 2 | T2-a (déclaratif) | 08:12 | Découvrir | MM-V | 3 | — | 💬 « D'après moi, avant, il n'y avait tout simplement aucun effet sur les plats. » | aucun | État de départ : « Plats » `on=load`. Diagnostic faux ; même méprise que L2-03, exprimée en réponse. |

### T3 (position 3)

| ID | Tâche | Pos. | Action / appel | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L3-01 | T3 | 3 | 4 / #64 | 09:01 | Régler | PERC | — | boutons « Rapide · Nor… · Lente » du grand titre (063) | 🧠 « La loupe n'a rien changé, donc je clique sur le bouton « Lente » » ; 063 = 064 | PERC | Captures en retard d'une image : 1 action perdue. Aucune conséquence : R1 rempli à l'action 5 (07:49:58). |
| L3-02 | T3 | 3 | 6 / #66 | 09:13 | Vérifier | VERIF-E | — | phrase « Au chargement de la page : fondu en montant en 1 120 ms. » (066) | 🧠 « La vitesse est passée à 1 120 ms (mode « Lente ») et le paramètre est bien enregistré. » | aucun | Seule vérification de la tâche ; ni ▷ ni test (T3-b). |
| L3-03 | T3 | 3 | 7–10 / #67–#70 ; REC-S à 11 (#71) | 09:22–09:46 | Découvrir | ERR ; REC-S | 2 | clic sur « Réserver une table » dans la page : panneau « Texte », section « Animation » à « Aucune » (070) | 🧠 « j'ai peut-être sélectionné uniquement le texte du bouton plutôt que le bouton entier » | aucun | Intention annoncée : « afficher son réglage d'animation » (le bouton). Récupérée seule par « Réserver une table » dans le fil d'Ariane (072). |
| L3-04 | T3 | 3 | 12 / #72 | 09:46–10:03 | Composer | MM ; HES | 4 | section « Animation » du lien : Apparition « Fondu en montant », « Rapide · Nor… · Lente », phrase « Au chargement de la page : fondu en montant en 500 ms. », Au survol, En continu, « Tester sur le site », « Ouvrir dans le mode Animation » ; aucun champ de moment de départ (072) | 🧠 « Je n'y trouve pas d'option « après le précédent » comme dans PowerPoint, donc j'essaie « Ouvrir dans le mode Animation » pour voir plus de réglages. » | aucun | Origine de la chaîne : R2 non rempli → blocage → abandon. |
| L3-05 | T3 | 3 | 13–15 / #73–#75 | 10:03–10:35 | Composer | VOC « image-clé », « opacité », « échelle » ; FRU (verbal) | 2 | mode Animation : « IMAGE-CLÉ À 0 MS », « Opacité », « Décalage », « Échelle », « PISTE · RÉSERVER UNE TABLE », « Remplir avec : un préréglage… » ; bouton affiché comme un cadre pointillé, tête de lecture « 0 / 500 ms » (074) | 🧠 « Je tombe sur un panneau d'animation rempli de termes techniques (image-clé, opacité, échelle...) et le bouton « Réserver une table » a disparu, remplacé par un cadre en pointillés. » | aucun | 💬 #80 : « rempli de mots que je ne comprends pas et faisait disparaître le bouton ». Retour par « Écriture » (076), conforme à la fiche (« je ferme »). A1 non : état de départ affiché de façon statique, qu'un humain verrait aussi. |
| L3-06 | T3 | 3 | 14 / #74 | 10:05 | Composer | RATE | 3 | champ « Départ 0 ms » de la piste ; liste « Une fois » (074) | capture 074 ; T4-a : « Je me souviens d'y avoir vu « Départ 0 ms ». » | aucun | Accès probable au départ retardé des boutons, jamais utilisé. L'effet de ce champ n'est pas observable dans la séance (prudence). Coût propre : 16 actions jusqu'à l'abandon. |
| L3-07 | T3 | 3 | 17–20 / #77–#80 | 10:51–11:19 | Composer | FP | 2 | liste « Fondu en montant » du bouton (078), refermée en recliquant l'option cochée (080) | 🧠 « C'est bien la même liste d'effets qu'avant, avec « Fondu en montant » déjà coché, sans indication sur l'ordre ou le mot « après ». » | aucun | 4 actions ; journal inchangé. |
| L3-08 | T3 | 3 | 20 / #80 ; AIDE-1 (segment 9) | 11:19 ; aide 11:26 | Composer | BLOC ; AIDE-1 | 3 | — | 💬 « Je suis bloquée. » | aucun | Conforme à la fiche : 8 actions sans progrès (13 à 20). Relance de niveau 1 mot pour mot. Coût propre : les 10 actions suivantes sans progrès. |
| L3-09 | T3 | 3 | entre 20 et 21 (segment 10) | 11:50 | Composer | MOD (technique) | — | — | « (Consigne technique du dispositif : la mission continue. Reprenez-la là où vous en êtes, seule, comme avant ; votre compte d'actions reprend à 21.) » | MOD | Hors script mais prévu par l'addendum 2 §11, sans information sur l'interface ni sur le but. A6 : L3-10 à L3-12 sont formellement « contaminés ». |
| L3-10 | T3 | 3 | 21–26 / #82–#87 | 11:59–12:24 | Composer | FP | 2 | « Boutons » dans le fil d'Ariane : panneau « Boutons · Boîte », Apparition « Aucune » (084) ; liste ouverte (086 : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté), refermée sur « Aucune » | 🧠 « Les deux boutons sont désormais groupés, avec un panneau « Boutons · Boîte » simplifié (mise en forme rapide, animation, pas d'ordre visible). » | MOD en amont | 6 actions (la 21 est la capture de reprise). Suit le plan donné en réponse à la relance. |
| L3-11 | T3 | 3 | 27–30 / #88–#91 | 12:24–12:50 | Composer | FP | 2 | panneau du grand titre défilé jusqu'en bas : « lettre par lettre », « Au survol », « En continu », « Tester sur le site », « Ouvrir dans le mode Animation » (091) | 💬 « Toujours rien qui dise « après », « puis » ou « ensuite ». » | MOD en amont | 4 actions. Défilement justifié par un panneau visiblement coupé (🧠 #89), conforme à la fiche. |
| L3-12 | T3 | 3 | 30 / #91 | 12:50 | Composer | FRU (agacement 4) ; ABD | 4 | — | 💬 « J'abandonne, je demanderai à mon neveu. » | aucun | Règle d'abandon respectée : 10 actions sans progrès après l'aide (21 à 30). |
| L3-13 | T3 | 3 | 30 | 12:50 | — | MM (règle 9.1, statut P avec ABD) | 0 | — | 💬 « Le grand titre est réglé sur « Lente » (fondu en montant, 1 120 ms au lieu de 500), c'est enregistré. » | aucun | MM de forme, imposé par 9.1. Elle sait exactement ce qui est atteint (R1) et ce qui ne l'est pas (R2) : aucune ignorance du résultat. |

### T5 (position 4)

| ID | Tâche | Pos. | Action / appel | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L5-01 | T5 | 4 | 2–3 / #95–#96 ; REC-S à 4 (#97) | 13:56–14:08 | Retirer | ERR ; REC-S | 2 | clic sur la pastille : panneau « Texte « Bib Gourmand » », section « Animation » repliée (096) | 🧠 « Je n'ai encore attrapé que le texte, mais le fil d'ariane m'indique que « Pastille » (le terme d'Aurèle) est le bon niveau. » | aucun | Intention : « vérifier son réglage d'animation » (la pastille). Récupération immédiate par le fil d'Ariane, grâce à T3 (T5-SEQ). |
| L5-02 | T5 | 4 | 9 / #102 | 14:31 | Vérifier | VERIF-E | — | « Pastille · 1 animation », Apparition « Zoom », phrase « Au chargement de la page, après 300 ms : zoom en 500 ms. » (102 ; état d'avant : 098) | 🧠 « « En continu » est bien désactivé, l'apparition en zoom reste active, et c'est enregistré : la pastille est réglée. » | aucun | S1 rempli à l'action 8 (07:55:16). |
| L5-03 | T5 | 4 | 10–11 / #103–#104 ; REC-S à 12 (#105) | 14:38–14:47 | Découvrir | ERR ; REC-S | 2 | clic sur « Réserver une table » : « Texte « Réserver une table » » (104) | 🧠 « C'est bien « Texte « Réserver une table » » qui est sélectionné. » | aucun | Intention : « sélectionner l'élément ». Récupérée seule. S3 rempli à l'action 18 (07:55:59). |
| L5-04 | T5 | 4 | 20–26 / #113–#117 | 15:21–15:49 | Vérifier | VERIF | — | « Tester sur le site » ; page avec le bouton survolé, légèrement plus haut que « Voir la carte » (116, comparée à 114) ; pastille identique sur 117-1 et 117-2 | 💬 « Elle a l'air de ne plus bouger, mais je ne vois pas le mouvement en continu, donc je le dis avec prudence. » | PERC | Rang 20. Soulèvement d'environ 2 px visible en comparant 114 et 116 : perception attestée, dite « semble ». Zoom d'arrivée non vu (page déjà ouverte), dit comme tel. |

### T4 (position 5)

| ID | Tâche | Pos. | Action / appel | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L4-01 | T4 | 5 | 11 / #130 | 17:31–17:39 | Lancer | HES | 3 | phrase « Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, une seule fois. » ; rien pour « à chaque passage » (130) | 🧠 « Je note que le paramètre « une seule fois » sur l'animation « Glissé depuis la gauche » contredit la demande d'Aurèle de la répéter à chaque fois, mais je ne trouve pas encore où le modifier » | aucun | Verbalise son incertitude. C6 jamais rempli (critère non rempli, d'où 3). VERIF-E au même rang. Modification à 10 (07:58:15). |
| L4-02 | T4 | 5 | 15 / #134 | 17:52 (07:58:41) | Choisir | PERS | — | liste « Apparition » du titre, option cliquée sans capture de la liste ouverte (#133 @724,400 puis #134 @703,308) | trace #133–#134 ; journal « Apparition · Fondu en montant » | PERS | Contraire à « lit tous les libellés, lentement ». Clic de mémoire (positions vues en T2). Résultat conforme à l'intention. |
| L4-03 | T4 | 5 | 16–17 / #135–#136 | 17:55–18:11 | Choisir | PERC | — | aperçu d'édition : titre absent entre « LA MAISON » et le paragraphe (135), revenu sur 136 | 🧠 « celui-ci a disparu de la page — je reprends une capture pour vérifier s'il réapparaît, peut-être à cause de l'effet en cours » | PERC | A1 : captures en retard d'une image probable. Après les quatre autres choix d'effet de la séance (014, 055, 130, 141), l'élément est visible 2 à 5 s après le clic ; un humain aurait vu un fondu de 700 ms. 1 action perdue. Frayeur déclarée en T4-SEQ. |
| L4-04 | T4 | 5 | 21 / #140 | 18:23 (07:59:11) | Choisir | PERS | — | liste « Apparition » du paragraphe, option cliquée sans capture (#139 puis #140) | trace #139–#140 ; journal « Apparition · Fondu » | PERS | Même écart que L4-02, sans conséquence. |
| L4-05 | T4 | 5 | 22 / #141 | 18:35 | Composer | HALL (incertain) | — | panneau du paragraphe : « Fondu », « lettre par lettre » ; pas de « les enfants un à un » (141) | 🧠 « j'ai repéré l'option « les enfants un à un » qui correspond à l'apparition l'un après l'autre » | HALL ? | L'option n'est pas sur 141 ; elle était visible en T5 (098) et le sera sur 149. Pensée restituée et peut-être résumée : souvenir probable. Aucune conclusion n'en dépend (A8). |
| L4-06 | T4 | 5 | 23–24 / #142–#143 | 18:35–18:50 | Choisir | VOC « composant », « instance » | 2 | panneau « Texte « 12 » » : « Propriété du composant », « chaque instance donne la sienne » ; bandeau « Ce texte vient de la base de données (champ value) : il se modifie dans la base, pas dans la page. » (143) | 🧠 « Je vois des termes comme « composant » et « instance » que je ne comprends pas, donc je préfère ne rien toucher. » | aucun | Évitement, puis remontée par le fil d'Ariane « Chiffre clé » (25). Clic sur le « 12 » annoncé comme première étape : pas codé ERR. |
| L4-07 | T4 | 5 | 25–26 / #144–#145 | 18:50–19:09 | Composer | MM | 3 | panneau « Chiffre clé · Boîte », Apparition « Aucune » ; le fil d'Ariane s'arrête à « Chiffre clé », sans bloc qui contiendrait les trois chiffres (145) | 🧠 « Seul le « 12 » avec sa légende est sélectionné, pas les trois chiffres, et l'animation est sur « Aucune ». » | aucun | Attente formulée à 22 (appliquer « les enfants un à un » aux trois chiffres) contredite par 145. Sur 149 elle comprend que l'option viserait « le mauvais contenu ». C3b non rempli par ce chemin (3). |
| L4-08 | T4 | 5 | 29 / #148 | 19:14 (08:00:03) | Choisir | ERR (non récupérée) | 2 | liste « Apparition » de « Chiffre clé » → « Zoom » ; 149 : seul le « 12 » entouré, phrase « Quand « Chiffre clé » entre dans l'écran : zoom en 700 ms, une seule fois. » | 🧠 « Je passe maintenant au « 38 » pour appliquer le même traitement. » ; journal « Apparition · Zoom » [node.set rk_root:triggers] | aucun | Intention (🧠 #145) : « traiter chaque chiffre séparément ». Le site pose le zoom sur le composant, valable pour chaque instance. Remarqué sans correction à 34 et 38 (« le 14 bouge alors que je n'y ai pas touché »). Pas COLL : les trois chiffres sont visés. |
| L4-09 | T4 | 5 | 30 / #149 | 19:18–19:38 | Composer | HES ; RATE | 4 | panneau « Chiffre clé » : Apparition « Zoom », « Rapide · Nor… · Lente », « les enfants un à un », « Au survol », « En continu », « Tester sur le site », « Ouvrir dans le mode Animation » (149) | 🧠 « … mais ne gère ni l'ordre, ni la répétition, ni le dépassement-retour. » | aucun (A2 : l'évitement du mode Animation suit la fiche) | Origine de C3 non rempli (échec), et raison principale de l'abandon. Liste d'effets sans dépassement (C5) ; aucun réglage de durée totale (C4). RATE : « Ouvrir dans le mode Animation » est lisible, et elle y avait vu « Départ » et « Une fois » en T3 (074). |
| L4-10 | T4 | 5 | 31–34 / #150–#153 | 19:38–20:04 | Choisir | HES ; FRU (verbal) | 2 | clic sur « 38 » : panneau « Texte « 12 » », « 12 » et « 38 » entourés (151) ; « Chiffre clé · 1 animation » avec « 12 » et « 38 » entourés (153) | 🧠 « Je ne parviens pas à savoir si le réglage « Zoom, 1 animation » s'applique au « 12 », au « 38 » ou aux deux, ce qui m'embrouille. » | aucun | 4 actions. 151 atteste le libellé « Texte « 12 » » après le clic sur « 38 » : pas HALL, et pas le retard de capture (l'état d'avant était « Chiffre clé »). |
| L4-11 | T4 | 5 | 35–38 / #154–#155 | 20:04–20:23 | Vérifier | VERIF | — | « Tester sur le site » : 155-1 tout en place ; 155-2 photo décalée à gauche et transparente, titre, paragraphe, 12, 38 et 14 pâles en même temps | 💬 « Je suppose donc que tout arrive au même moment, pas dans l'ordre. » | PERC | Rang 35. Supposition dite comme telle et attestée par 155-2. |
| L4-12 | T4 | 5 | 38 | 20:23 | Composer | FRU (agacement 4) ; ABD ; PERS | 4 | — | 💬 « J'abandonne, je demanderai à mon neveu. » | PERS | La fiche prévoit « je suis bloquée » après 8 actions sans progrès (31 à 38, le dernier progrès étant la capture 149) : elle abandonne sans blocage déclaré, donc sans aide. L'écart suit les problèmes (L4-01, L4-07, L4-09), il ne les cause pas. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués **déclaratif**. Ils illustrent ou corroborent, sans fonder de problème (11.4).

| Moment | Code | Étape | Citation (déclaratif) | Remarque |
|---|---|---|---|---|
| T1-SEQ | SAT | Découvrir | « Trouver l'endroit a été facile. » | Corrobore la première action pertinente à 6. |
| T1-SEQ | FRU | Vérifier | « Je ne mets pas plus parce que je n'ai pas réussi à voir le résultat. » | Lié à PERC (L1-03 à L1-05). |
| T1-SEQ | FRU | Régler | « J'aurais préféré des secondes. » | Préférence ; voir VOC « ms ». |
| T1-b | SAT | Régler | « Il y avait aussi Rapide, Normale, Lente, ce qui est plus simple que des secondes. » | |
| T2-SEQ | SAT | Choisir | « Mettre l'effet, c'était facile, puisque c'est la même liste que la première fois. » | |
| T2-SEQ | FRU | Découvrir | « Le difficile, c'était de comprendre pourquoi Aurèle ne voyait rien bouger. » | Corrobore L2-03. |
| T2-SEQ | FRU | Découvrir | « Ça m'a fait peur, je ne voulais pas y toucher. » | Bandeau « base de données ». |
| T2-SEQ | SAT | Vérifier | « Au moins, « Tester sur le site » m'a montré quelque chose, contrairement à la première fois. » | |
| T3-SEQ | SAT | Régler | « Ralentir le titre, c'était facile : j'ai cliqué sur le titre, puis sur « Lente », et c'était fait. » | |
| T3-SEQ | FRU | Composer | « Il n'y a ni « après », ni « ensuite », ni aucun réglage d'ordre, alors que dans PowerPoint c'est un choix tout bête. » | Corrobore L3-04. |
| T3-SEQ | FRU | Composer | « J'ai eu peur d'avoir abîmé quelque chose. » | Mode Animation (L3-05). |
| T3-SEQ | FRU | Découvrir | « En plus, cliquer sur le bouton ne sélectionnait que son écriture. » | Corrobore L3-03. |
| T3-b | FRU | Régler | « Et s'il fallait encore plus lent que « Lente », je n'ai pas vu comment faire sans passer par l'écran compliqué. » | |
| T5-SEQ | SAT | Retirer | « Ça s'est bien passé. » | |
| T5-SEQ | FRU | Découvrir | « Il y a aussi ce piège où cliquer sur la pastille ou sur le bouton sélectionne seulement l'écriture. » | Corrobore L5-01 et L5-03. |
| T4-SEQ | SAT | Choisir | « Mettre un effet sur chaque élément, j'y suis arrivée. » | |
| T4-SEQ | FRU | Composer | « Mais c'était la partie facile, et ce n'est pas du tout ce qu'Aurèle demandait. » | |
| T4-SEQ | FRU | Composer | « En plus, avec les chiffres, je me suis complètement perdue. » | Corrobore L4-07 à L4-10. |
| T4-SEQ | FRU | Choisir | « Et le titre qui disparaît de la page juste après avoir choisi l'effet m'a fait une belle peur. » | Repose sur un artefact probable (L4-03). |
| D-FIN-1 | SAT | Choisir | « J'y suis arrivée, et j'étais plutôt fière. » | |
| D-FIN-1 | FRU | Composer | « Mais dès qu'on me demandait un ordre (ceci, puis cela), une attente, ou que ça recommence, je ne trouvais plus rien. » | |
| D-FIN-1 | FRU | Vérifier | « je n'ai quasiment jamais vu les effets de mes propres yeux : je devais faire confiance aux petites phrases. » | |
| D-FIN-2 | SAT | Choisir | « Les trois lignes « Apparition », « Au survol », « En continu », avec leurs listes d'effets. » | |
| D-FIN-2 | SAT | Vérifier | « C'est ce qui m'a le plus aidée à savoir ce que j'avais fait. » | Les phrases de résumé. |
| D-FIN-2 | SAT | Régler | « « Rapide / Normale / Lente », plutôt que des chiffres. » | |
| D-FIN-2 | SAT | Vérifier | « « Tester sur le site », qui m'a enfin montré quelque chose qui arrive. » | Aussi : le badge « n animations » et « Enregistré », « qui rassurent ». |
| D-FIN-3 | FRU | Composer | « Ne pas pouvoir dire l'ordre, l'attente ou le « à chaque fois ». » | |
| D-FIN-3 | FRU | Découvrir | « Il faut deviner qu'on doit passer par la petite ligne tout en haut. » | Sélection de l'écriture. |
| D-FIN-3 | FRU | Composer | « J'ai cru avoir cassé quelque chose. » | Mode Animation. |
| D-FIN-3 | FRU | Composer | « je clique sur le 38, on me parle du 12, deux sont entourés, et le 14 bouge sans que j'y aie touché. » | |
| D-FIN-3 | FRU | Régler | « Les « ms » : je ne sais toujours pas combien de temps ça fait vraiment. » | |
| D-FIN-3 | FRU | Choisir | « Chaque fois, j'ai eu un petit coup de stress avant de comprendre que ça revenait. » | Photos et titre absents : artefact probable (section 6). |
| D-FIN-4 | VAL− | Composer | « aller dans le « mode Animation » : trop de mots inconnus, et j'ai eu peur de casser » | |
| D-FIN-4 | VAL− | Composer | « promettre à Aurèle une scène dans un ordre précis ou qui recommence : je ne saurais pas le faire » | |
| D-FIN-6 | VAL+ | Choisir | « Ça ferait plus soigné, et je saurais le faire seule maintenant. » | Pour l'épicerie. |
| D-FIN-6 | VAL− | — (général) | « Mais ce n'est pas ce qui fait vendre mes lentilles du Puy. » | |
| D-FIN-6 | VAL− | Composer | « Pour ce qui est des « petites scènes » avec un ordre, qui recommencent, ce n'est pas pour moi » | |
| D-FIN-6 | VAL− | — (général) | « moins ça bouge, mieux c'est, chez moi. » | |
| D-FIN-6 | VAL+ | Choisir, Régler | « Pour Aurèle, je veux bien faire les petits réglages simples. » | |
| D-FIN-7 | VAL+ | Vérifier | « Pour la première fois, je voyais que ce que j'avais réglé servait à quelque chose. » | T2, « Tester sur le site ». |
| D-FIN-7 | VAL+ (et SAT) | Retirer | « Là, je me suis sentie capable. » | T5. |
| D-FIN-7 | VAL− | Composer | « Je me suis dit « ce n'est pas pour moi ». » | T3, mode Animation. |
| D-FIN-7 | VAL− | Composer | « j'ai compris que je ne savais même plus ce que je réglais. » | T4, chiffres. |
| D-FIN-7 | VAL− | Vérifier | « on règle quelque chose sans être sûre que ça marche. » | T1. |
| D-FIN-8 | VAL− | Composer | « Ne pas pouvoir faire ce qui me paraît le plus simple, « après le précédent », comme dans PowerPoint. » | Obstacles cités aussi : peur de casser, vocabulaire, résultat invisible, pièges de sélection. |
| D-FIN-8 | VAL− | — (général) | « Si une demande d'Aurèle me prend une soirée pour finir par « j'abandonne », je ne recommencerai pas. » | |
| D-FIN-10 | VAL+ | Vérifier | « Les petites phrases et « Tester sur le site », en revanche, gardez-les : c'est ce qui m'a donné confiance. » | |

**VOC déclarés seulement au débriefing** (D-FIN-5, sans gravité, non comptés par tâche) :
- « décalage », « piste », « préréglage », « aller-retour », « cible » (mode Animation, vus en 074) ;
- « propriété du composant » (143) ;
- « Texte alt. » (« aucune idée », vu en 043 et 124).

Mots devinés de façon compatible, donc non codés : « Boîte », « En boucle », « Au chargement de la page », « Après 300 ms », « Les enfants un à un » (compréhension partielle, mais raisonnement juste sur 149).

**Note QR3 (D-FIN-9, déclaratif)** : pour savoir ce que verront les clients, elle recommanderait l'Aperçu en descendant, « Tester sur le site », la lecture de la phrase et la vérification de « l'élément entier ». Elle reste prudente : « je ne suis pas certaine à cent pour cent ».

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

Du plus grave au moins grave.

**PC-1 · Pas de moyen de faire partir un élément « après » un autre ni de fixer un ordre dans la section « Animation » du panneau ; ces réglages ne sont que dans le mode Animation.**
- Endroit : section « Animation » du panneau de droite (072, 091, 149) ; accès « Ouvrir dans le mode Animation » ; dans le mode, « Départ 0 ms » (074). La phrase affiche « après 300 ms » quand un retard existe (098), sans champ pour le régler.
- Étape : Composer (T3, boutons après le titre ; T4, ordre de la scène).
- Cause apparente : le panneau simple ne propose que l'effet et la vitesse ; l'attente « après le précédent » (modèle PowerPoint) ne trouve aucun équivalent visible.
- Gravité maximale : **4** (abandon en T3 ; échec et abandon en T4).
- Lignes : L3-04, L3-06, L3-07, L3-08, L3-10, L3-11, L3-12, L4-09, L4-12.
- A1 perception : non, l'absence du réglage se voit sur des captures lisibles.
- A2 connaissance et persona : aucun CONN. L'évitement du mode Animation suit la fiche (« referme aussitôt »), ce n'est pas un PERS. Le PERS de L4-12 (abandon sans blocage déclaré) survient après le problème et ne l'écarte pas.
- A6 modérateur : la MOD technique de T3 (L3-09) survient après l'action 20 ; L3-10 à L3-12 sont formellement contaminés, mais le problème est établi avant (L3-04 à L3-08) et, en T4, sans aucune MOD.
- A8 perception affirmée : aucun HALL sur ces passages.

**PC-2 · Le clic dans la page prend l'élément le plus intérieur (écriture, image) ; sa section « Animation » affiche « Aucune » sans signaler le mouvement porté par un parent.**
- Endroit : aperçu d'édition, puis en-tête du panneau (« Texte « … » », « Image ») et section « Animation » à « Aucune » (045, 070, 096, 104) ; parade par le fil d'Ariane en haut du panneau (043, 072).
- Étape : Découvrir (T2, T3, T5) et Retirer (T5).
- Cause apparente : la sélection par défaut descend dans l'élément, et aucun signe n'indique qu'un ancêtre (bouton, pastille, liste « Plats ») porte une animation.
- Gravité maximale : **4** (T2 : diagnostic faux, correction sur le mauvais élément, « terminé » déclaré, échec). Ailleurs, gravité 2 (erreurs récupérées seule).
- Lignes : L2-02, L2-03, L2-04, L2-09 (déclaratif), L3-03, L5-01, L5-03.
- A1 perception : non, la capture 045 montre « Aucune » en toutes lettres. La parade (« Plats » dans le fil d'Ariane) était visible, mais sans aucune indication de ce qu'elle mène à un mouvement.
- A2 connaissance et persona : aucun CONN ni PERS. La récupération rapide en T5 vient de l'apprentissage fait en T3 dans la séance.
- A6 modérateur : aucune MOD avant ces lignes.
- A8 perception affirmée : aucun HALL.
- À noter pour l'analyse d'ordre (A7) : T2 est ici en position 2.

**PC-3 · Le mode Animation fait fuir une débutante : vocabulaire technique, et élément sélectionné montré invisible (état de départ à « 0 / 500 ms »).**
- Endroit : mode Animation, ouvert depuis « Ouvrir dans le mode Animation » (074).
- Étape : Composer.
- Cause apparente : le panneau présente images-clés, opacité, décalage, échelle, piste et préréglage, et le canevas montre le bouton comme un cadre pointillé ; elle croit avoir cassé le site et ressort aussitôt.
- Gravité maximale : **3** (RATE sur « Départ », seul accès au but, jamais repris : ni en T3 ni en T4).
- Lignes : L3-05, L3-06 ; corroboration déclarative D-FIN-3, D-FIN-4, D-FIN-7.
- A1 perception : non. L'état affiché est statique, un humain aurait vu le même cadre vide.
- A2 connaissance et persona : les mots en cause figurent dans la liste « vocabulaire inconnu » de la fiche. Le comportement (fermer aussitôt) suit la fiche, ce n'est pas un PERS : le problème vaut pour ce public, sans être généralisable aux designers.
- A6 modérateur : aucune MOD avant l'action 13.
- A8 perception affirmée : aucun HALL.

**PC-4 · Répétition « à chaque passage » introuvable là où elle regarde (la phrase dit « une seule fois »).**
- Endroit : phrase de résumé et section « Animation » (130, 149) ; la liste « Une fois » n'existe que dans le mode Animation (074).
- Étape : Lancer.
- Cause apparente : aucun choix « une seule fois / à chaque fois » dans le panneau simple.
- Gravité maximale : **3** (C6 non rempli).
- Lignes : L4-01, L4-09 (en partie).
- A1 : non. A2 : aucun CONN ni PERS. A6 : aucune MOD. A8 : aucun HALL.
- Pourrait être fusionné avec PC-1 si l'on considère « réglages de lancement et de rythme absents du panneau simple » comme une seule cause ; l'étape diffère (Lancer, et non Composer), d'où la séparation.

**PC-5 · Composant « Chiffre clé » : portée du réglage non dite, libellé trompeur, groupe des trois chiffres inaccessible.**
- Endroit : chiffres de La maison dans l'aperçu d'édition ; panneaux « Texte « 12 » » (143, 151) et « Chiffre clé · Boîte » (145, 149, 153) ; fil d'Ariane réduit à « Chiffre clé ».
- Étape : Choisir et Composer.
- Cause apparente : un réglage posé sur une instance vaut pour les trois sans que le panneau le dise ; le clic sur « 38 » affiche « Texte « 12 » » et entoure deux chiffres ; aucun bloc parent des trois chiffres n'est proposé pour « les enfants un à un » ; les mots « composant » et « instance » ne lui parlent pas.
- Gravité maximale : **3** (L4-07, C3b).
- Lignes : L4-06, L4-07, L4-08, L4-10.
- A1 : non (151 et 153 lisibles). A2 : mots de la liste inconnue ; aucun PERS ni CONN. A6 : aucune MOD.
- A8 : L4-05 (HALL incertain sur « les enfants un à un ») précède L4-07. L'attente de L4-07 porte sur une option réellement présente (098, 149), et la contradiction se lit sur 145 : la conclusion ne repose pas sur le HALL.

**PC-6 · Vérifier sans voir : le ▷ et l'Aperçu ne montrent pas l'arrivée ; elle s'en remet à la phrase.** (signal faible probable)
- Endroit : triangle ▷ à droite de la liste d'effets (014) ; onglet Aperçu (022-1, 025).
- Étape : Vérifier.
- Cause apparente : l'effet est terminé au moment de la capture ; « une seule fois » ne rejoue pas à la redescente.
- Gravité maximale : 2 (L1-05).
- Lignes : L1-03, L1-04, L1-05, L1-06.
- A1 : **oui**. Un humain aurait vu le fondu, et l'interface offre une autre représentation, la phrase, qu'elle a utilisée : **artefact probable**. « Tester sur le site » lui a ensuite montré des effets en cours (T2, T4).
- A2 : aucun CONN ; PERS possible sur l'icône ▷ (non codé). A6 : aucune MOD. A8 : aucun HALL.

**PC-7 · Éléments qui semblent disparaître dans l'éditeur** (photos à la première capture de T2, T3 et T5 ; titre juste après le choix de l'effet en T4). (signal faible probable)
- Endroit : aperçu d'édition (030, 061, 135).
- Étape : Découvrir et Choisir.
- Gravité maximale : 1 (1 action, L4-03).
- Lignes : L4-03 ; déclaratifs T4-SEQ et D-FIN-3.
- A1 : **oui**. Captures en retard d'une image (add. 2 §12) : l'élément réapparaît à la capture suivante et, après les autres choix d'effet, il est visible 2 à 5 s après le clic. **Artefact probable.**
- A8 : pas de HALL, car les captures montrent bien l'absence.

**PC-8 · « ms » non compris.** (signal faible : déclaratif, sans comportement associé)
- Endroit : phrases de résumé (014, 066).
- Étape : Régler.
- Gravité : 2.
- Ligne : L1-07. A1 : non. A2 : mot de la liste inconnue ; sans effet sur ses estimations (T3-a juste).

---

## 6. Écarts au protocole et au dispositif

**MOD**
- Segment 10 (T3, 11:50) : consigne technique de reprise après l'aide (L3-09). Hors script, mais prévue par l'addendum 2 §11 et sans information sur l'interface ou le but. Contamination formelle de L3-10 à L3-12 (A6).
- Segment 1 : phrase « Je vais maintenant vous poser quelques questions avant de commencer. Répondez à chacune, dans l'ordre, sous son identifiant. », absente de 4.3.D. Procédurale (addendum 1 §7), avant les tâches, sans effet.
- Enveloppes du canal sur chaque message (« The coordinator sent a message while you were working: », « Address this before completing your current task. ») : texte du dispositif, pas du modérateur ; non codé MOD, signalé.
- Tout le reste est conforme au mot près : A, B et C (accord au féminin correct, contrairement au pilote), D-1 à D-5, consignes T1 à T5, transitions E, fins G, relance de niveau 1 après « Je suis bloquée », H, D-FIN-1 à 10, I.
- Aucune relance « Pouvez-vous m'en dire un peu plus ? », aucune aide sans blocage, aucun commentaire.
- La phrase « Pensez à dire ce que vous cherchez avant d'agir » n'a jamais été dite alors que la pensée manque sur plusieurs enchaînements. Impossible par construction (addendum 1 §8), donc non codé.

**HORS** : aucun. Les 4 appels `javascript_tool` sont les loupes autorisées (#5, #8, #15, #64) ; aucune retouche de l'éditeur pendant les questions.

**PERS**
- L4-02 et L4-04 : option cliquée dans une liste sans l'avoir lue (contraire à « lit tous les libellés, lentement »), sans conséquence.
- L4-12 : abandon sans « je suis bloquée » après 8 actions sans progrès, d'où aucune aide en T4.
- Non codé, signalé : clic sur l'icône ▷ sans texte en T1 (#16). Les libellés du panneau avaient été lus (🧠 #14) et le symbole de lecture est courant ; cas limite.
- Vérifiés conformes :
  - blocage T3 à 8 actions sans progrès ;
  - abandon T3 après 10 actions sans progrès suivant l'aide ;
  - défilement de panneau seulement quand il est coupé (124, 🧠 #89) ;
  - sortie immédiate du mode Animation ;
  - agrandissement des petits textes ;
  - pas de clic droit ni de double-clic.

**CONN** : aucun codé.
- Signalé : 🧠 #72 « qui se déclenche au chargement de la page » (famille de « déclencheur », mot de la liste inconnue). La ligne est une pensée restituée, possiblement reformulée par le modèle, et le mot n'a pas d'effet : non retenu.
- Les mots de la liste inconnue employés ailleurs (composant, instance, image-clé, opacité, échelle, décalage, piste, préréglage, aller-retour) avaient tous été lus à l'écran (074, 143).
- La référence PowerPoint « après la précédente » est dans la fiche.

**PERC**
- L1-01, L1-03, L1-04, L1-05, L1-06, L2-01, L2-06, L3-01, L4-03, L4-11, L5-04.

**HALL**
- L4-05 (incertain) : aucune conclusion n'en dépend.
- Vérifiés et attestés par les captures : « salade, thé, café » (036-2) ; écran noir puis photos pâles (057-1, 057-2) ; bouton « disparu » en mode Animation (074) ; titre disparu (135) ; bouton soulevé (116, par comparaison à 114) ; « 38 » donnant « Texte « 12 » » (151) ; tout pâle en même temps (155-2).

**Défaut des captures en retard d'une image (addendum 2 §12), test A1**
- Actions perdues : **3 sur 158** (T1 #8 loupe, T3 #64 loupe, T4 #136 capture de contrôle).
- Les deux loupes sans effet correspondent à des paires de captures identiques au pixel (007 = 008, 063 = 064). Les loupes #5 et #15 ont fonctionné.
- Aucun « double clic » ni clic répété n'est attribuable au défaut.
- Effets sans coût en actions : photos absentes à la première capture de T2 (030) et T3 (061), et d'après la pensée en T5 (094, non ouverte). À l'origine de frayeurs déclarées (D-FIN-3), artefact probable (PC-7).
- Aucun arrêt n'est lié au défaut : l'abandon de T3 repose sur les actions 21 à 30, non touchées ; celui de T4 n'est pas un arrêt au budget.
- La perception discontinue (PERC, propre à tout le dispositif) a coûté environ 9 actions de plus (T1 : environ 8 ; T2 : 1), toutes sur l'étape Vérifier.

**Pensée à voix haute partielle (addendum 2 §13)**
- Enchaînements sans aucune ligne 💬 ni 🧠 : #16–#17, #32–#33, #37–#41, #50–#55, #86–#89, #106–#107, #136–#139.
- Points d'étape « toutes les 10 actions » (règle 6) : présents seulement en T3 (20, 30) et T4 (38, plus « Étape 10 » sans agacement) ; absents en T1, T2 et T5.
- Conséquence probable : VOC, MM et HES verbales sous-estimés, surtout en T1, T2 et T5. Plusieurs lignes 🧠 sont visiblement résumées (troisième personne implicite, vocabulaire plus technique que la persona), d'où la prudence sur CONN et HALL.

**Limites de ma lecture**
- 37 captures ouvertes : 005, 007, 010, 014, 015, 022-1, 030, 036-2, 043, 045, 055, 057-1, 057-2, 058, 066, 072, 074, 084, 086, 091, 096, 098, 112, 116, 130, 135, 141, 143, 145, 149, 151, 153, 155-2, 124 ; 114, 061 et 136 par recadrage (`observations/crops-p1/`).
- En complément, une comparaison automatique au pixel de toutes les paires consécutives des 83 captures a servi à repérer les captures identiques ; elle ne remplace pas une lecture visuelle.
- Statut T2 : jugement entre E (retenu) et P (lecture souple), argumenté en section 2.
- RATE « Départ 0 ms » (L3-06) et accès au mode Animation (L4-09) : il est probable que ces réglages menaient au but, mais leur effet n'est observé ni dans la séance ni dans la fiche.
- T5 : confirmation « comme un visiteur » faite sur le site de P3, de configuration identique, et non sur celui de P1.
- T1 : l'« éclair o=1 avant départ » relevé par le préparateur (titre visible un instant avant le fondu) est un possible défaut de rendu, hors codage du participant ; à signaler au chercheur.
- Réponse à la relance de T3 : P1 attribue « après 100 ms » au titre de La maison, alors que c'était le titre « Quelques plats signature » en T2 (fiche). Souvenir inexact, déclaratif, non codé.
- Horodatages UTC reconstitués (± 1 s). Aucune capture illisible hors loupes inopérantes ; le texte de 800 × 500 est resté lisible pour tous les endroits cités.
