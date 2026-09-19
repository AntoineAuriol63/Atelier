# Observation codée · P3 (Karim Haddad) · vague 4

Codage indépendant (second codeur), à partir de la trace brute, des captures citées, du journal du site enregistré et de la fiche de lecture. Ordre de passage : T1, T5, T2, T3, T4.

## 1. Résumé de la séance

Karim (débutant pressé, référence Canva/CapCut) réussit complètement, sans aide, les quatre premières tâches (T1, T5, T2, T3), toutes en un seul passage direct sur l'élément visé, avec quelques hésitations mineures vite résolues. Le vocabulaire « image-clé » et « délai » lui reste opaque mais ne l'empêche pas d'agir. La tâche T4 (composition de scène, 6 éléments) est nettement plus coûteuse : il répète cinq fois le même geste, se trompe deux fois sur la ligne « après tel élément » dans un menu déroulant (une fois corrigée, une fois non), ne trouve pas comment régler les trois chiffres ensemble et finit par dépasser largement le budget de 40 actions réelles (79 selon le compte du dispositif, recoupé avec son propre correctif final) sans avoir terminé le troisième chiffre. Son récit du résultat, y compris pour la tâche inachevée, est remarquablement fidèle à ce qui est réellement enregistré, jusqu'à décrire correctement ses propres erreurs non corrigées (« échec lucide »). Deux problèmes de dispositif/interface ressortent nettement : un contrôle « Apparition » qui ne réagit pas au premier clic dans le panneau rapide (T1), et des lignes très rapprochées dans les menus « Démarre » qui provoquent des clics sur la ligne voisine (T4, une fois non récupérée).

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut.** Réussite complète (**C**). Site v4 : déclencheur `on=inView` sur le titre, une seule fois, piste `opacity 0→1` en 700 ms (cubic-bezier), rien d'autre modifié. R1 (arrivée visible via opacité) : rempli. R2 (lancé à l'entrée dans l'écran) : rempli. R3 (durée 700 ms, dans 200–2500) : rempli. R4 (pas de mouvement permanent) : rempli. R5 (rien hors de La maison) : rempli. **Accord avec le préparateur** (statut proposé C) : oui, mêmes critères, même lecture.

Une réserve sur le contenu exact du mouvement : la vignette cliquée d'après les captures est « Apparition · Fondu en montant » (011-capture.png, clic à 641,234, ligne estimée à 233 px), mais la piste enregistrée ne comporte aucun `transform` de départ (`{"opacity":"0"}` puis `{"opacity":"1","transform":"none","filter":"none"}`), et le résumé affiché dans le panneau (012-capture.png) dit lui-même « (fondu) », pas « (fondu en montant) ». Soit le clic a en réalité touché la ligne « Fondu » juste au-dessus, soit le préréglage « en montant » ne pose pas de décalage vertical dans ce chemin. Je ne peux pas trancher avec certitude sur la seule capture ; je le signale comme limite de lecture (section 6) plutôt que comme fait établi. Cela ne change pas le statut : R1 est de toute façon rempli par la seule variation d'opacité.

**Mode de fin.** Terminé déclaré (« J'ai terminé »). **Aides.** Aucune (jamais de « bloqué »).

**Métriques (9.2).**
- Actions totales : 29 appels d'outils (13 clics, 1 défilement, 15 captures ; #2 à #45, hors ouvertures d'image) ; compte du participant : 17 (il ne comptabilise pas systématiquement les captures de confirmation, cf. section 6).
- Actions perdues à cause du dispositif : aucune identifiée avec certitude (voir hésitation sur « Tester sur le site » plus bas, non attribuée formellement au dispositif).
- Première action pertinente : appel #7 (clic sur l'onglet « Animation » du panneau rapide, capture 003 qui affiche pour la première fois du contenu sur le mouvement du titre).
- Actions jusqu'à la réussite : appel #34 (clic sur la vignette « Fondu en montant »/« Fondu », dernière entrée du journal « v4 Déclencheur » suivant immédiatement dans le temps).
- Captures et agrandissements : 15 captures, 0 loupe.
- Fausses pistes : 1 (clics répétés sur « Apparition : Aucune » sans effet, bascule vers « Ouvrir dans le mode Animation »), coût ≈ 4 actions directes + détour complet par le mode Animation.
- Hésitations : 1 (les 2 clics sans effet sur « Aucune »).
- Erreurs : 0 récupérée avec certitude ; 1 suspectée mais non confirmée (voir réserve ci-dessus sur la vignette), non comptée faute de certitude.
- Collatérales : aucune.
- Occasions manquées (RATE) : aucune au sens strict (pas d'accès visible délaissé puis retrouvé plus tard).
- Vérification : aucun VERIF ni VERIF-E atteint ; 3 tentatives infructueuses de « Tester sur le site » (#37, #40, #43).
- Vocabulaire non compris : « délai » (02:45, « je comprends pas trop ») et « image-clé » (04:13, « ça me dit rien »).
- SEQ : 5.

**Concordance du récit (9.4).** T1-R : « au moment où il arrive à la hauteur du titre... le titre va apparaître en fondu... progressivement, pas d'un coup... 700 ms... j'ai pas pu le voir vraiment tourner en vrai, j'en suis pas sûr à 100 % ». Quoi = 2 (seul le titre, correctement isolé). Quand = 2 (exact : à l'arrivée à l'écran). Comment = 2 (« en fondu, progressivement » correspond exactement à la piste réellement enregistrée, opacité seule). Combien = 1 (durée juste à ± 50 % ; nombre de fois absent). **Total 7/8. Écart matériel : non.** Le doute explicitement verbalisé par le participant sur ce qu'il avance est une qualité épistémique notable (moins de MM-V potentiel).

**Mesures propres (T1).** Première action pertinente et absence de VERIF : voir ci-dessus. Moment de lancement choisi : à l'entrée dans l'écran (conforme à la demande).

### T5 · Calmer la pastille, réveiller le bouton (position 2)

**Statut.** Réussite complète (**S**). Site v2 : pulsation retirée (`En continu · aucun`), zoom d'arrivée inchangé (500 ms, retard 300 ms), « Réserver une table » avec survol « Soulever » 250 ms et retour (`reverseOnLeave`). S1 (plus de boucle) : rempli. S2 (arrivée conservée, 500 ms) : rempli. S3 (bouton réagit, décalage -4 px ≥ 2 px, ≤ 800 ms, retour) : rempli entièrement. S4 (rien d'autre touché) : rempli. **Accord avec le préparateur** (statut proposé C) : oui.

**Mode de fin.** Terminé déclaré. **Aides.** Aucune.

**Métriques.**
- Actions totales : 15 appels d'outils (7 clics, 8 captures ; #46 à #68) ; compte du participant : 9.
- Actions perdues au dispositif : aucune.
- Première action pertinente : appel #48 (clic direct sur la pastille).
- Actions jusqu'à la réussite : appel #66 (clic sur « Soulever », dernière modification du journal v2).
- Captures : 8, loupes : 0.
- Fausses pistes : 0. Hésitations : 0. Erreurs : 0. Collatérales : 0. Occasions manquées : 0.
- Vérification : aucun VERIF ni VERIF-E (le participant le dit lui-même en T5-b : « je l'ai pas vu bouger en vrai avec mes yeux, je me base sur ce que ça disait dans le panneau »).
- Vocabulaire non compris : aucun nouveau mot signalé dans cette tâche (« survol » est deviné correctement par élimination, sans le déclarer incompris — voir section 6, DEC potentiel).
- SEQ : 6.

**Concordance du récit.** T5-R + relances : Quoi = 2 (pastille + bouton, rien en trop). Quand = 2 (ouverture pour la pastille, survol pour le bouton, exacts). Comment = 2 (« en zoom », « se soulever... redescend » exacts). Combien = 1 (durée du bouton exacte « un quart de seconde » ≈ 250 ms ; durée de la pastille non rappelée, mais absence de boucle correctement affirmée). **Total 7/8. Écart matériel : non.**

**Mesures propres (T5).** S1, S2, S3 tous remplis séparément (voir statut). Pas de confusion entre le bouton du héros et celui de l'en-tête (clic direct sur le bon bouton, capture 006-capture.png confirmée).

### T2 · Ce que voit vraiment le client (position 3)

**Statut.** Réussite complète (**C**). Site v1 : déclencheur des cartes passé de `on=load` à `on=inView`, surtitre et titre intacts. R1–R5 tous remplis. **Accord avec le préparateur** (statut proposé C) : oui.

**Mode de fin.** Terminé déclaré. **Aides.** Aucune.

**Métriques.**
- Actions totales : 15 appels d'outils (5 clics, 2 défilements, 8 captures ; #69 à #91) ; compte du participant : 9.
- Première action pertinente : appel #77 (clic sur la première carte de plat).
- Actions jusqu'à la réussite : appel #89 (clic sur « quand il entre dans l'écran »), seule entrée du journal (v1).
- Captures : 8, loupes : 0.
- Fausses pistes : 1, mineure — clic manqué sur le lien « Régler sur « Plats » » (#80, atterrit sur « Au survol », capture 005 identique à 004), corrigé au clic suivant (#83). Coût : 2 actions.
- Hésitations : 0 distincte (l'échec du clic #80 est comptabilisé comme erreur, pas comme hésitation, car il y a bien un changement de sélection, juste le mauvais élément).
- Erreurs : 1, récupérée seule (REC-S) en une action.
- Collatérales : 0. Occasions manquées : 0.
- Vérification : aucun VERIF ni VERIF-E ; diagnostic fondé uniquement sur la lecture du panneau (« Au chargement de la page, les enfants... » lu textuellement), comme le participant le dit lui-même en T2-b.
- Vocabulaire : aucun nouveau mot signalé (« enfants » suscite une incompréhension partielle non déclarée comme telle — voir section 6).
- SEQ : 5.

**Concordance du récit.** T2-R : Quoi = 2 (les trois cartes, rien en trop). Quand = 2 (« pile quand on arrive dessus »). Comment = 2 (« elles montent en même temps qu'elles deviennent visibles »). Combien = 0 (ni durée ni nombre de fois mentionnés). **Total 6/8. Écart matériel : non** (aucune affirmation fausse, seulement des omissions).

**Mesures propres (T2).** Diagnostic T2-a jugé **juste** par le préparateur et confirmé par ma lecture : « l'animation des plats était réglée sur "dès l'ouverture de la page"... le temps qu'elle scrolle jusque-là, l'animation était déjà terminée » — désigne exactement le moment de lancement en cause. Modifications collatérales : aucune.

### T3 · Donner du rythme à l'accueil (position 4)

**Statut.** Ma lecture : réussite complète (**C**). Site v3 : titre en 1120 ms (dans 900–4000, R1 rempli) ; les deux boutons démarrent à 1120 ms (= fin du titre, ≥ 80 %) et finissent à 1620 ms (≤ 6000 ms, R2 rempli pour les deux boutons) ; paragraphe toujours animé au chargement, valeurs inchangées (R3 rempli) ; rien d'ajouté sur surtitre, photo, pastille, ni hors du héros (R4 rempli). **Le préparateur ne propose pas de statut explicite pour cette tâche dans la fiche** (seule une note SEQ/T3-R est présente, sans ligne « Statut proposé », à la différence de T1, T5 et T2) : je ne peux donc pas constater un accord ou un désaccord au sens strict, seulement donner ma propre lecture, qui conclut à une réussite complète sur les quatre critères.

**Mode de fin.** Terminé déclaré. **Aides.** Aucune.

**Métriques.**
- Actions totales : 17 appels d'outils (8 clics, 9 captures ; #92 à #117) ; compte du participant : 10.
- Première action pertinente : appel #94 (clic direct sur le grand titre).
- Actions jusqu'à la réussite : appel #115 (clic sur « après Titre 1... » pour le second bouton), dernière entrée du journal (v3).
- Captures : 9, loupes : 0.
- Fausses pistes : 0. Hésitations : 0. Erreurs : 0. Collatérales : 0. Occasions manquées : 0.
- Vérification : aucun VERIF ni VERIF-E ; le participant le confirme en T3-b (« j'ai pas vraiment vu le titre bouger en vrai, je me suis fié au bouton "Lente" »).
- Vocabulaire : aucun nouveau mot signalé.
- SEQ : 6.

**Concordance du récit.** T3-R : Quoi = 2 (titre + deux boutons). Quand = 2 (« juste après, pile quand le titre a fini »). Comment = 1 (« tout doucement » — vague mais compatible, cf. l'exemple donné par la grille elle-même). Combien = 1 (durée du titre juste, « un peu plus d'une seconde » ≈ 1120 ms ; durée des boutons non chiffrée dans le récit lui-même). **Total 6/8. Écart matériel : non.**

**Mesures propres (T3).** R1 et R2 tous deux remplis, sans aide. Estimation T3-a (« à peu près 1,6 seconde ») comparée à la fin réelle des boutons (1620 ms) : **juste**, écart ≈ 0 %.

### T4 · La maison racontée comme une scène (position 5)

**Statut.** Ma lecture : **échec (E)**, au sens strict de la section 5 : C1 (« les six éléments visés portent un mouvement d'arrivée visible ») n'est pas rempli, le troisième chiffre (« 14 ») n'ayant reçu aucune animation au moment de l'arrêt. Un critère C1 non rempli suffit à l'échec, indépendamment des autres critères. **Le préparateur ne propose pas non plus de statut explicite pour T4** dans la fiche (seules des notes descriptives) : même réserve que pour T3, ma lecture n'a rien à confirmer ou infirmer formellement, elle est simplement rapportée.

**Profil de critères** (rapporté quel que soit le statut, comme demandé en 5/T4) :
- C1 non rempli (5 éléments sur 6 animés ; « 14 » intact).
- C2 rempli pour les 5 éléments présents (même déclencheur `inView` sur la photo).
- C3 rempli (photo 0 ms < titre 700 ms < paragraphe 1400 ms < premier chiffre 2100 ms, écarts de 700 ms ≥ 80 ms).
- C3b **non rempli** : les deux chiffres présents (« 12 » et « 38 ») démarrent tous deux à 2100 ms, à 0 ms d'écart l'un de l'autre (les deux pistes ont `start={"after":"nm8KtINRpL2l"}`, c'est-à-dire toutes deux « après le paragraphe »).
- C4 rempli (fin du dernier mouvement à 2900 ms, dans 1800–3000).
- C5 rempli pour les éléments présents (photo : translateX -40px ≥ 16px ; titre : translateY 28px ≥ 8px ; paragraphe : flou puis net ; chiffres : courbe cubic-bezier(.34,1.56,.64,1), à dépassement).
- C6 rempli (`once=false`, « à chaque passage »).

**Mode de fin.** Budget atteint (**BUD**), après auto-correction du compte d'actions par le participant lui-même (voir section 6).

**Aides.** Aucune demandée (le participant ne s'est jamais déclaré « bloqué », malgré une tâche manifestement difficile — voir section 6, PERS potentiel).

**Métriques.**
- Actions totales : 79 appels d'outils (34 clics, 5 défilements, 40 captures ; #118 à #236), un compte qui recoupe exactement le compte final corrigé du participant lui-même (« ACTIONS : 79 ») après qu'il a réalisé son erreur de comptage. Budget de 40 actions du protocole largement dépassé (≈ 2×) avant l'arrêt.
- Première action pertinente : appel #123 (clic sur la photo).
- Actions jusqu'à la réussite : non applicable au sens strict (statut échec) ; dernière modification du journal à 16:56:19 (v11, tentative de correction du démarrage du second chiffre, restée incorrecte).
- Captures : 40, loupes : 0.
- Fausses pistes : au moins 2 identifiées avec certitude : (a) tentative de sélectionner le groupe « Chiffres » pour régler les trois chiffres ensemble (appels #189, #195, #201 : clics sur le fil d'Ariane et sur une flèche qui ne fait rien), abandonnée au profit d'un réglage un par un — coût ≈ 15 actions (captures comprises) ; (b) — voir aussi les erreurs de menu « Démarre » ci-dessous, à la limite entre erreur et fausse piste courte.
- Hésitations : plusieurs, dont la plus coûteuse est celle du groupe « Chiffres » (comptée surtout en FP ci-dessus).
- Erreurs : 2 sur le menu « Démarre » — (i) paragraphe réglé sur « après Photo de la salle » au lieu de « après Titre 2 » (appel #174), **récupérée seule** au coup suivant (appel #180, REC-S) ; (ii) second chiffre (« 38 ») réglé sur « après Paragraphe » au lieu de « après « Années » » (appel #231), **non récupérée** : le participant rouvre le menu (appel #234) mais la séance s'arrête au budget avant la correction (capture 040, dernière capture de la tâche, montre le menu encore ouvert). C'est cette seconde erreur qui, conjuguée à l'absence totale de réglage du troisième chiffre, cause l'échec C1/C3b.
- Collatérales : aucune (le surtitre « La maison », toléré, n'a pas été touché).
- Occasions manquées (RATE) : aucune caractérisée au sens strict de la définition (accès visible délaissé puis retrouvé) ; la difficulté porte plutôt sur l'absence d'un accès visible du tout pour le réglage groupé.
- Vérification : aucun VERIF ni VERIF-E.
- Vocabulaire : aucun nouveau mot signalé pendant l'action (au-delà de « image-clé » déjà relevé en T1) ; « composant » est rencontré à l'écran et employé sans confusion déclarée (voir section 6).
- SEQ : 2 (la plus basse des cinq tâches, en cohérence avec les faits observés).

**Concordance du récit.** T4-R, explicitement présenté par le participant comme partiel (« c'est pas complet, donc je vais dire ce que j'ai vu à l'écran, pas ce qui devrait se passer si j'avais fini ») : décrit correctement la photo (glissé depuis la gauche), le titre (montée légère), le paragraphe (dévoilement), la répétition à chaque passage, le premier chiffre (rebond, après le paragraphe), **et signale lui-même** que le second chiffre reste réglé pour démarrer « en même temps que le paragraphe » au lieu d'après le premier chiffre, et que le troisième chiffre est resté immobile faute de temps. Quoi = 2. Quand = 2 (ordre et l'erreur elle-même correctement rapportés). Comment = 2 (glissé, montée, dévoilement, rebond, tous corrects). Combien = 1 (répétition « à chaque passage » correcte ; durées non chiffrées). **Total 7/8. Écart matériel : non** — remarquable pour une tâche en échec : c'est un cas d'« échec lucide » au sens de la matrice 9.3, le participant ne se trompant sur aucun fait matériel, y compris sur ses propres erreurs.

**Mesures propres (T4).** Profil de critères : voir ci-dessus. Structure de lancement : un seul événement (déclencheur unique sur la photo, `inView`), conforme à C2 pour les éléments présents. Cohérence de T4-a : réponse jugée **cohérente avec la structure enregistrée** — « je cliquerais sur le paragraphe... "Démarre"... "après Titre 2" → "en même temps que Titre 2" » correspond exactement à une option réellement présente dans le menu observé (capture 021, 039). Pas de code MM sur cette réponse.

## 3. Lignes de codage (format 8.5)

| Tâche | Position | N° action (participant) / appel | Horodatage | Étape | Code | Gravité | Endroit (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|
| T1 | 1 | [5]/#10, [6]/#13 | 01:56–02:13 | Choisir | HES | 2 | Panneau rapide, ligne « Apparition : Aucune » du titre | « Ça n'a pas changé, rien ne s'est ouvert. Je clique encore une fois » ; captures 003/004/005 identiques | — | Deux clics au même endroit sans le moindre changement de capture ; bascule ensuite vers un autre chemin (voir FP). |
| T1 | 1 | [7]/#16 | 02:27 | Choisir | FP | 2 | Lien « Ouvrir dans le mode Animation » | « il y a un lien bleu... je clique dessus » | — | Fin de la fausse piste précédente : changement de direction vers le mode Animation complet, plus long mais fonctionnel. |
| T1 | 1 | [17]/— | 04:56 | Vérifier | HALL | 2 | Canevas, section La maison, titre sélectionné | « Le titre a disparu de l'aperçu » | HALL | La capture correspondante (012-capture.png) montre le titre parfaitement visible, non estompé, dans le canevas ; aucune disparition n'est attestée par l'image. |
| T1 | 1 | [14]–[16]/#37,#40,#43 | 04:59–05:52 | Vérifier | HES | 2 | Lien « Tester sur le site » sous le résumé de l'animation | « Ah, ça a ouvert une liste "Quand"... » ; « ça n'ouvre rien de nouveau mais tant pis » | PERC (absence de vue visiteur atteinte) | Trois clics visant le lien « Tester sur le site » ouvrent à chaque fois le menu « Quand » juste en dessous ; le participant abandonne la vérification. Cause précise (dispositif ou simple imprécision de clic) non tranchée avec certitude — voir section 6. |
| T1 | 1 | — | 06:56 | Vérifier | PERC | — (neutre) | déclaratif, question T1-R | « j'ai pas pu le voir vraiment tourner en vrai... j'en suis pas sûr à 100 % » | PERC | Le participant signale lui-même la limite perceptive, sans la présenter comme un fait acquis (bonne hygiène épistémique). |
| T5 | 2 | — | toute la tâche | — | — | 0 | — | — | — | Aucun événement de gravité ≥ 1 relevé : tâche directe, sans détour. |
| T2 | 3 | [5]/#80 | 12:45–13:02 | Régler | ERR | 2 | Lien « Régler sur « Plats » » au-dessus du champ « Au survol » | « Ça n'a pas changé, j'ai dû mal cliquer » | — | Clic à (655,290) tombe sur le champ voisin (capture 005 identique à 004) au lieu du lien ; corrigé au clic suivant à (655,269), 2 actions plus tard. |
| T2 | 3 | [6]/#83 | 13:02 | Régler | REC-S | — | idem | « je réessaie sur le texte bleu... un peu plus haut » | — | Récupération seule, sans aide, immédiate. |
| T3 | 4 | — | toute la tâche | — | — | 0 | — | — | — | Aucun événement de gravité ≥ 1 relevé. |
| T4 | 5 | [17]/#144–#150 | 22:40–23:15 | Composer | — | 0 | Panneau du titre, « Apparition : Aucune » puis liste de vignettes | « Je clique sur "Fondu en montant"... » | — | Séquence directe, sans erreur : mentionnée pour mémoire (référence de comparaison avec l'erreur suivante sur « Démarre »). |
| T4 | 5 | [21]/#174 | 25:44 | Composer | ERR | 3 | Menu déroulant « Démarre » du paragraphe | « Ah non, ça a mis "après « Photo de la salle »", c'est pas ce que je voulais » | — | Clic à (720,387) sélectionne la ligne voisine « après « Photo de la salle » » au lieu de « après Titre 2... » ; lignes très rapprochées dans la liste (capture 019/020). |
| T4 | 5 | [22]/#180 | 26:23 | Composer | REC-S | — | idem | « je vois "après Titre 2..." juste en dessous. Je clique dessus » | — | Récupérée seule, en 2 actions. |
| T4 | 5 | [25]–[30]/#189–#203 | 27:35–29:33 | Composer | FP | 4 | Fil d'Ariane du composant « Chiffre clé » (« 12 »), flèche à côté de « Composant » | « Je me suis trompé, j'ai sélectionné un truc trop large » ; « cette flèche fait rien » | — | Recherche infructueuse d'un moyen de régler les trois chiffres ensemble ; aucune option de ce type trouvée depuis le panneau rapide du conteneur (capture 025) ; abandon au profit d'un réglage élément par élément. Coût élevé (≈ 15 actions) directement responsable, avec l'erreur suivante, du dépassement de budget. |
| T4 | 5 | [39]–[40]/#228–#234 | 32:18–33:11 | Composer | ERR | 4 | Menu déroulant « Démarre » du chiffre « 38 » | « ça a pris "après Paragraphe" au lieu d'"après Années", du coup les deux chiffres démarrent en même temps » | — | Clic à (700,290) sélectionne « après Paragraphe... » au lieu de « après « Années » », juste en dessous dans la liste (capture 039) ; même schéma que l'erreur du paragraphe, mais liste encore plus dense (13 lignes visibles). |
| T4 | 5 | [40]/#234–#236 | 33:04–33:57 | Composer | ERR non récupérée | 4 | idem | « je m'arrête ici... je venais de rouvrir le menu "Démarre" pour corriger ça quand j'ai dépassé le budget » | — | Le menu est rouvert (capture 040) mais la correction n'a pas lieu avant l'arrêt ; cause directe de l'échec de C3b et donc du critère C1/statut final. |
| T4 | 5 | — | 33:57 | — | mode de fin BUD | 4 | — | « FIN : budget / ACTIONS : 79 » | — | Voir section 6 pour la question du comptage des actions. |

## 4. Codes déclaratifs (réponses et débriefing, « déclaratif »)

| Code | Tâche/étape | Citation | Commentaire |
|---|---|---|---|
| SAT (déclaratif) | T1, Choisir | D-FIN-2 : « quand je clique sur un élément et que je trouve direct "Animation" avec une liste de vignettes toutes prêtes... c'est exactement comme sur Canva » | Satisfaction rattachée explicitement au chemin qui a fonctionné en T1/T5. |
| SAT/VAL+ (déclaratif) | T1, Choisir | D-FIN-7 : « Ça valait le coup au tout début... quand j'ai trouvé la liste de vignettes façon Canva et que ça a marché du premier coup, je me suis dit "ah bah c'est facile en fait" » | — |
| FRU (déclaratif) | T4, Composer | T4-SEQ : « Un 2. C'était clairement la plus dure des quatre. Fallait refaire le même geste cinq fois de suite... plusieurs fois j'ai cliqué sur la mauvaise ligne » | Cohérent avec les codes ERR/FP comportementaux relevés en T4. |
| FRU (déclaratif) | T4, Composer | D-FIN-3 : « j'arrivais pas à cliquer sur la bonne ligne du premier coup, je me trompais souvent d'une ligne... essayer de régler plusieurs éléments pareils d'un coup... ça devient long et je m'embrouille » | — |
| FRU/VAL− (déclaratif) | T4, Composer | D-FIN-7 : « sur la dernière mission... je me suis dit que ça valait plus le coup, que j'aurais laissé tomber si c'était pas pour la séance » | — |
| VAL− (déclaratif) | T4, Composer | D-FIN-8 : « dès que ça sort du "je clique, je choisis une vignette, c'est fini", ça devient un truc de pro avec plein de menus et de mots que je connais pas... je laisse tomber et je fais sans » | — |
| VAL+ (déclaratif) | T1/T5, Choisir/Lancer | D-FIN-6 : « les trucs simples oui, ça pourrait me servir : faire arriver ma carte ou mes photos... ou faire bouger un bouton "commander"... ça je le ferais » | — |
| VAL− (déclaratif) | T4, Composer | D-FIN-6 : « tout ce qui est scène avec plusieurs trucs enchaînés dans l'ordre... ça j'utiliserais jamais, c'est trop long et trop compliqué » | — |
| VAL− (déclaratif) | T4, Composer | D-FIN-4 : « ce que je ferais pas, c'est essayer d'enchaîner plusieurs trucs dans un ordre précis... j'abandonnerais avant d'avoir fini » | — |
| VAL+ (déclaratif) | ensemble, Découvrir | D-FIN-10 : « pour un truc comme moi... c'est plus facile que ce que je craignais au début pour les trucs simples » | — |
| (insight hors grille, déclaratif) | T2, Vérifier | D-FIN-9 : « je lui dirais de vraiment aller voir la page comme un visiteur, en scrollant dessus pour de vrai, plutôt que de faire confiance au panneau de réglages » | Rejoint QR3 : le participant identifie lui-même, en fin de séance, l'écart entre lecture de panneau et vérification visiteur qu'il n'a pourtant jamais pratiquée pendant les tâches (aucun VERIF sur les 5). |

## 5. Problèmes candidats pour cette séance

**PC1 — Le contrôle « Apparition » du panneau rapide ne réagit pas au premier clic (T1).**
- Endroit : panneau rapide de droite, ligne « Apparition : Aucune », élément « Titre 2 « Une cuisine de… » ».
- Étape : Choisir.
- Cause apparente : absence de réaction du contrôle au clic pour cet élément à ce moment, contrastant avec les contrôles « Au survol » et « En continu » du même type de panneau, qui s'ouvrent normalement en un clic pour d'autres éléments en T5 (captures 003 et 007 de p3-t5).
- Gravité maximale : 3 (coût direct ≈ 4 actions, puis détour complet et bien plus long par le mode Animation pour obtenir le même résultat qu'un clic aurait dû permettre directement).
- Lignes de codage : HES (T1, [5]-[6]/#10,#13), FP (T1, [7]/#16).
- Test d'artefact (11.3) : A1 (perception) — non, ce n'est pas un problème de perception du mouvement ni de résolution d'image (le libellé « Aucune » est lisible et cliqué avec précision, capture 003) ; A2 (connaissance/persona) — aucun code CONN ni PERS à l'origine. Provisoirement : **problème d'interface**, à confirmer par la comparaison inter-participants (11.2.2 : un seul participant suffit à une gravité ≥ 3).

**PC2 — Aucun moyen trouvé, depuis le panneau rapide, pour régler plusieurs éléments similaires ensemble (T4).**
- Endroit : panneau du composant « Chiffre clé » (« 12 ») et fil d'Ariane « La maison › Contenu › Texte › Chiffres › Années » ; tentative sur une flèche à côté de « Composant ».
- Étape : Composer.
- Cause apparente : le panneau rapide du conteneur parent des trois chiffres n'expose pas d'option de type « les enfants un à un », alors qu'une option de cette nature existe et est utilisée sans mal ailleurs (T2, « Plats », via le mode Animation, capture 006 de p3-t2 : case « les cartes une à une ») ; rien dans le panneau rapide n'indique qu'il faille rouvrir le mode Animation pour la retrouver au niveau du conteneur « Chiffres ».
- Gravité maximale : 4 (contribue directement, avec l'erreur de menu « Démarre » non récupérée, à l'échec de la tâche et au dépassement du budget).
- Lignes de codage : FP (T4, [25]-[30]/#189-#203).
- Test d'artefact : A1 — non (pas un problème de perception, le fil d'Ariane et la flèche sont lisibles, capture 024-025-029) ; A2 — pas de CONN identifié ; un PERS est envisagé mais écarté (l'exploration par le fil d'Ariane est cohérente avec le style « clique sur le plus visible » de la persona, pas un écart). Provisoirement : **problème d'interface**, gravité la plus élevée de la séance.

**PC3 — Lignes rapprochées dans les listes/menus, favorisant le clic sur la ligne voisine (T4 surtout, et un analogue plus mineur en T1/T2).**
- Endroit : menu déroulant « Démarre » (options « après X » / « en même temps que X »), captures 019-021 et 038-039 de p3-t4 ; à un moindre degré, lien « Tester sur le site » collé au menu « Quand » (T1, captures 012-015) et lien « Régler sur « Plats » » collé au champ « Au survol » (T2, captures 004-006).
- Étape : Composer / Régler / Vérifier.
- Cause apparente : espacement visuel réduit entre lignes ou entre un lien et le contrôle suivant, dans une fenêtre de capture à 800×500 pour un écran annoncé à 1440×900 (voir réserve ci-dessous).
- Gravité maximale : 4, sur l'occurrence T4/« 38 » (erreur jamais corrigée avant la fin du budget, cause directe de l'échec de C3b) ; 2 sur les occurrences récupérées (T4/paragraphe, T2/« Régler sur Plats ») ; 2 sur l'échec de vérification en T1 (« Tester sur le site »).
- Lignes de codage : ERR (T4 [21]/#174, récupérée), ERR non récupérée (T4 [39]-[40]/#228-#234), ERR/REC-S (T2 [5]-[6]/#80,#83), HES (T1 [14]-[16]/#37,#40,#43).
- Test d'artefact : A1 — à nuancer. Le texte reste lisible sur les captures que j'ai ouvertes (à leur résolution native de 800×500, sans agrandissement), donc ce n'est pas un problème de lisibilité pure ; mais je n'ai pas pu vérifier l'espacement réel à l'échelle de l'écran annoncé (1440×900), et le participant n'a jamais utilisé la loupe (persona « n'agrandit jamais les petits textes »), ce qui limite ma capacité à trancher complètement le test A1. Je retiens provisoirement **problème d'interface**, avec la réserve explicite que l'ampleur exacte à l'échelle réelle de l'éditeur reste à confirmer (mention obligatoire « à confirmer avec des utilisateurs réels » au sens de 11.7).

## 6. Écarts au protocole et au dispositif

- **MOD.** Aucun écart relevé : toutes les répliques du modérateur, dans les cinq tâches et le débriefing, correspondent mot pour mot au script (transitions 4.3.E, relances absentes puisque non déclenchées, clôtures conformes).
- **HORS.** Aucun (le bandeau de synthèse de la trace le confirme : « Écarts au protocole (outils ou commandes interdits) : aucun »).
- **PERS.** Un cas à signaler avec réserve : en T4 ([25]/#186-#188, 27:35), le participant lit « composant » à l'écran (capture 024, panneau « Composant · Chiffre clé ») — mot explicitement classé « vocabulaire inconnu » dans sa fiche — et l'emploie sans exprimer la moindre incompréhension (« c'est un "composant" utilisé 3 fois, faut faire gaffe »), alors que la consigne d'incarnation (3.2.1) demande de signaler ne pas comprendre un tel mot rencontré à l'écran. Comme le mot est bien lu à l'écran, ceci ne remplit pas la définition stricte de CONN (qui exige que le mot n'ait *pas* été lu à l'écran) ; je le note comme un possible écart de fidélité à la persona (PERS), gravité 1 (aucune conséquence sur les actions), avec hésitation assumée. Par ailleurs, la règle d'abandon de la persona (« après 2 fausses pistes consécutives ») n'est jamais activée alors que T4 comporte une séquence longue de tentatives infructueuses ([25]-[30]) : je ne le retiens pas comme un écart, car la définition du « progrès visible » (3.8 du protocole) est satisfaite à chaque tentative (chaque clic porte sur le réglage d'un élément visé), ce qui neutralise légitimement la règle d'abandon.
- **CONN.** Aucun cas retenu au sens strict (voir ci-dessus, le seul candidat — « composant » — a été lu à l'écran, donc reclassé en PERS).
- **PERC.** Deux occurrences déclaratives explicites, cohérentes avec la limite structurelle du dispositif (pas de perception continue du mouvement) : T1-R (« j'ai pas pu le voir vraiment tourner en vrai, j'en suis pas sûr à 100 % ») et T5-b (« je l'ai pas vu bouger en vrai avec mes yeux, je me base sur ce que ça disait dans le panneau »). Dans les deux cas, le participant les présente lui-même comme des suppositions, ce qui limite le risque de HALL corrélé.
- **HALL.** Un cas retenu : T1, 04:56, « Le titre a disparu de l'aperçu », affirmé sans réserve alors que la capture correspondante (012-capture.png) montre le titre normalement visible dans le canevas, non estompé. Voir ligne de codage correspondante en section 3. Toute conclusion qui s'appuierait sur ce passage serait à écarter (règle A8) ; je ne l'ai utilisée dans aucune autre analyse de cette fiche.
- **Comptage des actions (limite de dispositif/protocole, hors nomenclature 8.2).** Le compte d'actions déclaré par le participant lui-même est systématiquement inférieur au compte d'appels d'outils du dispositif (T1 : 17 déclarées contre 29 réelles ; T5 : 9 contre 15 ; T2 : 9 contre 15 ; T3 : 10 contre 17), le participant ne comptant pas systématiquement les captures de confirmation qui suivent chaque clic. Ce n'est devenu visible qu'en T4, où le participant s'arrête de lui-même en réalisant l'erreur (« chaque capture d'écran compte comme une action à part entière... je me suis trompé dans mon compte ») et recalcule un total de 79, qui recoupe exactement mon propre compte des appels d'outils. Cela signifie que le budget réel de 40 actions a été dépassé d'environ le double avant l'arrêt de la tâche T4, alors que rien dans le script du modérateur (4.3.F, « 40e action atteinte ») n'indique que le compte est vérifié autrement que par la déclaration du participant. C'est une limite du dispositif de cette vague à signaler au chercheur, distincte des codes MOD/HORS (le modérateur n'a rien dit hors script, le dépassement tient au mode de comptage lui-même).
- **Limites de ma propre lecture.** (a) Je n'ai pas pu établir avec certitude si la vignette cliquée en T1 était « Fondu » ou « Fondu en montant » (écart d'un pixel de rangée entre mon estimation et la position réelle du clic) — signalé en section 2/T1 plutôt qu'affirmé. (b) Je n'ai pas ouvert toutes les captures de T4 (au plus 40 captures au total sur la séance, réparties entre les cinq tâches) ; les événements sans code retenu dans les intervalles non consultés ne peuvent pas être exclus avec certitude, en particulier d'éventuelles hésitations courtes non verbalisées entre les appels #118 et #236. (c) Le désaccord/accord avec le préparateur n'a pas pu être vérifié pour T3 et T4, faute de statut explicitement proposé dans la fiche de lecture pour ces deux tâches.
