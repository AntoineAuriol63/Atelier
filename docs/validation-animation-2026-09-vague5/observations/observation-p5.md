# Observation · P5 (Élodie, intégratrice) · vague 5 · T4 en position 1

Observateur indépendant (Opus), sans les hypothèses. Sources : protocole (version observateur), addendum 5, trace brute `traces5/trace-p5.md`, `shots5/p5-t4/` (19 captures, 0 loupe, `log.jsonl`), fiche `fiches5/fiche-lecture-p5.md`. Correspondance des horodatages : la capture 001 est à 01:04 dans la trace et à 09:19:04 UTC dans `log.jsonl` ; le journal du site (UTC) se recale donc sur la trace à − 09:18:00.

Convention : « action n » = compte du participant (remis à zéro à la mission, ici une seule mission) ; « #n » = appel d'outil de la trace (les ouvertures d'image 👁 ne comptent pas comme action). Les 39 actions annoncées par la participante correspondent exactement aux 39 commandes de `log.jsonl` (19 captures, 16 clics, 3 défilements, 1 glisser).

---

## 1. Résumé de la séance

P5 aborde T4 à froid (première et seule mission). En 9 actions elle ouvre l'onglet « Animation », descend jusqu'à la section La maison, clique sur la photo et voit le bouton « Animer « Photo de la salle » ». Le clic sur ce bouton (action 10) ouvre le panneau d'animation ; elle y repère d'emblée la liste « Éléments de la scène (10) » avec ses « + Ajouter » et « les 3 un à un », et le menu « Remplir avec : un préréglage… ». En 26 actions (10 à 36) elle pose, dans une seule animation lancée « À l'entrée dans l'écran » de la photo, quatre pistes remplies par préréglage (photo « Glissé depuis la gauche », titre « Fondu en montant », paragraphe « Fondu », les 3 enfants de Chiffres « Montée avec rebond », intervalle 100 ms) et coche « à chaque passage ». Toutes les pistes restent à Départ 0 ms et la durée à 1 000 ms : elle ne trouve pas comment décaler les départs, tire la barre du titre dans la zone graduée (action 38), ce qui déplace la tête de lecture à 640 ms ; elle voit alors la scène à cet instant et le champ « Départ » de la piste Titre 2, puis s'arrête elle-même à 39 actions (« FIN : budget »). Le site enregistré : six éléments animés, un seul événement, ordre non respecté (tous à 0), fin à 1 000 ms, courbe à dépassement sur les chiffres, rejeu à chaque passage. Statut E (C3 non rempli), mode BUD, aucune aide. SEQ 4. Récit du visiteur 8/8, sans écart matériel (« échec lucide »).

---

## 2. La tâche T4 (position 1)

### 2.1 Statut (9.1) et profil de critères (section 5)

Lecture du site final (fiche) : un déclencheur `on=inView once=false` sur « Photo de la salle » ; une animation de 1 000 ms avec quatre pistes : photo (0 ms `translateX(-40px)`, opacité 0 → 700 ms), Titre 2 (`translateY(28px)`, opacité 0 → 700 ms), Paragraphe (opacité 0 → 700 ms), Chiffres enfants échelonnés `each: 100` (`translateY(28px)`, opacité 0 → 800 ms, courbe `cubic-bezier(.34,1.56,.64,1)`). Aucun Départ de piste, aucun délai. Visite du préparateur : photo, titre, paragraphe 0 → ~877 ensemble ; chiffres 0/100/200 → ~1 000.

| Critère | Rempli ? | Fait du site |
|---|---|---|
| C1 tous bougent | oui | six éléments visés avec opacité 0 → 1 (photo, titre, paragraphe, trois chiffres via « enfants ») |
| C2 un seul événement | **oui, sous réserve de lecture** | un seul déclencheur, une seule animation ; mais l'événement est « Photo de la salle entre dans l'écran », pas l'arrivée de la section ni d'un bloc contenant les six. À la lettre de C2 (« la section La maison ou un même bloc qui les contient tous »), non rempli ; au sens de l'intitulé (« un seul événement », par opposition à « chacun à sa propre arrivée »), rempli. Je retiens « oui » comme le préparateur, en signalant l'écart de lecture ; il ne change pas le statut. |
| C3 ordre principal | **non** | les quatre pistes partent à 0 ms |
| C3b chiffres échelonnés | oui | intervalle 100 ms ≥ 80 ms |
| C4 minutage | **non** | fin du dernier mouvement à 1 000 ms (< 1 800) ; ≤ 4 500 |
| C5 manières | oui | photo −40 px horizontal (≥ 16) ; titre +28 px vers le bas (≥ 8) ; paragraphe fondu ; chiffres courbe à y2 = 1,56 (dépassement) |
| C6 répétition | oui | `once=false`, résumé « à chaque passage » |

**Statut : E** (la réussite partielle exige C1 et C3 ; C3 non rempli). Aucune aide donnée, donc pas E-I. **Accord avec le statut proposé par le préparateur (E, C3)**. Désaccord de détail : (a) sur C2, réserve littérale ci-dessus ; (b) sur la note « le champ « Départ » de la piste découvert à la 39e action » : les captures 006, 008, 009, 010 et 011 montrent ce champ lisible (« Départ | 0 ms », bas du panneau droit, sous « PISTE · PHOTO DE LA SALLE ») et la participante le lit à voix haute à l'action 17 (« et son « Départ » est à 0 ms », 03:54) ; il n'est **reconnu** comme le réglage du décalage qu'à l'action 39, il n'est pas **découvert** à ce moment-là. Cette nuance pèse sur le problème candidat A (section 5).

### 2.2 Mode de fin et aides

- Mode de fin : **BUD**, avec réserve : la participante écrit elle-même « FIN : budget · ACTIONS : 39 » à 08:38 et cesse d'agir ; le modérateur prononce ensuite (09:47) la phrase de la 40e action. Le compte était de 39, non ≥ 40 (addendum 5, point 7). Voir MOD en section 6.
- Aides : aucune (niveau maximal 0, nombre 0). Aucun « je suis bloquée ».

### 2.3 Métriques (9.2)

| Métrique | Valeur |
|---|---|
| Actions totales (compte du participant) | 39 |
| Appels d'outils de la tâche | 58 (#2 à #59), dont 19 ouvertures d'image (👁) ; 39 commandes |
| Actions perdues à cause des défauts du dispositif | 0 (tous les clics ont atteint leur cible, les listes déroulantes se sont ouvertes dans la page, le glisser a été exécuté) |
| Première action pertinente | **8** (clic sur la photo, #13, 02:15 ; capture 005 montre « Animer « Photo de la salle » » et « Quand : À l'entrée dans l'écran ») |
| Actions jusqu'à la réussite | non atteint |
| Temps | consigne 01:00 ; dernière commande 08:14 ; dernière parole 08:38 ; arrêt du modérateur 09:47 (log : 09:19:04 → 09:26:13 UTC, 7 min 09 s de commandes) |
| Captures et loupes | 19 captures, 0 loupe |
| FP et actions perdues | 0 FP au sens strict (aucune piste refermée par un retour) ; si l'on compte le glisser de la barre (38-39) comme une piste, 1 FP de 2 actions |
| HES | 1 (actions 29-30) |
| ERR, dont non récupérées | 2 ; 1 non récupérée (le glisser, action 38 ; sans effet sur le site) |
| REC | 1 REC-S (action 31, chevron) |
| COLL-D / COLL-ND | 0 / 0 (le journal ne touche que le déclencheur de la photo et l'animation ; toutes les pistes visent des éléments de la consigne) |
| RATE | 3 (« Départ » à la capture 006, « Départ » à la capture 009, durée « 1000 ms » à la capture 006) |
| VERIF / VERIF-E | VERIF : non (aucune vue visiteur ; « Tester sur le site » visible dès 006, jamais utilisé). VERIF-E : oui, première au rang **15** (capture 008, « Je photographie pour vérifier que la photo a bien pris l'effet », lecture de la phrase de résumé) ; VERIF-E fortuite au rang 39 (scène vue à 640 ms) |
| VOC | « ligne de temps », « images-clés » (lu aussi comme « n'a pas encore d'images-clés », « première image-clé ») |
| SEQ | 4 |

### 2.4 Concordance du récit T4-R (9.4)

Récit (10:02) comparé au site enregistré.

| Dimension | Score | Phrase du récit | Fait du site |
|---|---|---|---|
| Quoi | 2 | « la photo arrive par la gauche, le titre monte en fondu, le paragraphe apparaît en fondu, et les trois chiffres montent avec un rebond » | quatre pistes : photo, Titre 2, Paragraphe, enfants de Chiffres ; rien d'autre |
| Quand | 2 | « il arrive sur la partie « La maison ». À ce moment-là tout se déclenche d'un coup, en même temps » | `inView`, toutes les pistes à 0 ms ; nuance non dite : l'événement est l'entrée de la photo, non de la section (compatible) |
| Comment | 2 | idem Quoi ; « les chiffres, eux, s'enchaînent bien l'un après l'autre, mais avec seulement un dixième de seconde entre eux » | glissé depuis la gauche, fondu en montant, fondu, montée avec rebond ; `each: 100` |
| Combien | 2 | « Le tout est bouclé en une seconde environ » ; « ça rejouera à chaque fois, parce que j'ai coché « à chaque passage » » | fin à 1 000 ms ; `once=false` |

**Total 8/8. Écart matériel : non.** Matrice réussite × compréhension : **échec lucide** (« En l'état, et je le dis franchement, ce n'est pas ce qu'Aurèle a demandé. »).

### 2.5 Mesures propres (section 5)

- **Profil de critères** : C1 ✓, C2 ✓ (réserve littérale : déclencheur sur la photo), C3 ✗, C3b ✓, C4 ✗, C5 ✓, C6 ✓.
- **Structure de lancement** : un seul déclencheur (« Quand « Photo de la salle » entre dans l'écran », à chaque passage), posé sur la photo, non sur la section ; une seule animation de 1 000 ms à quatre pistes, aucun retard de piste, aucun délai global. La participante n'a jamais sélectionné la section La maison elle-même (le fil d'Ariane des captures 005 à 019 montre « Page › La maison › Contenu › Photo de la salle ») ; aucune capture ne montre d'entrée de scène depuis la section, elle ne peut donc être codée ni trouvée ni manquée.
- **T4-a** : **cohérente** avec la structure enregistrée (« je clique sur la ligne « Paragraphe » dans la zone des lignes […] le panneau du bas […] affiche alors « PISTE · Paragraphe… » avec un champ « Départ » en millisecondes »). Elle précise ne pas être « certaine à cent pour cent que « Départ » soit un délai avant de commencer » : supposition déclarée, pas MM. Pas de code MM.
- Fonctions du lot 8 (relevé demandé) : liste « Éléments de la scène » **trouvée** (capture 006, action 11) et utilisée (16, 22, 27) ; « les 3 un à un » **trouvé** (capture 006) et utilisé (27, capture 014 : « Chiffres · enfants », « Intervalle : 100 ms »). Champ de durée en ms : visible (« 1000 | ms », captures 006 à 019), **jamais modifié**. Champ « Départ » de piste : visible (006, 008 à 011, 019), lu (action 17), **jamais modifié**. « Ses voisins » sur un chiffre : aucun chiffre n'a été sélectionné, non visible sur les captures. Vue « Scène » de la section / lien « Voir la scène de « La maison » » : non visibles sur les captures (section jamais sélectionnée). « Pareil pour … » : non visible. Avertissements « part avant », « lancements séparés » : absents des captures (toutes les pistes dans une seule animation à 0 ms ; rien à afficher).

---

## 3. Lignes de codage (format 8.5)

Séance P5, tâche T4, position 1 sur toutes les lignes. « Endroit » = tel que vu sur la capture citée. Gravité « — » pour les codes sans gravité.

| N° action / #outil | Horodatage | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|
| 2-3 / #4-#5 | 01:17-01:24 | Découvrir | SAT | — | onglet « Animation » dans la barre du haut (capture 001) | « Ça, c'est clair au moins, chez Elementor c'est caché dans l'onglet Avancé de chaque élément. » | — | Spontané, avant d'agir. |
| 3 / #5 | 01:42 | Découvrir | VOC « ligne de temps » | 2 | bloc « Comment ça marche » en haut du panneau droit (capture 002 : « images-clés sur la ligne de temps ») | « j'ai juste vu passer « ligne de temps » et « images-clés », ça ne me parle pas » | — | Mot de la liste inconnue, lu à l'écran. Sans effet observable sur le résultat ; gravité 2 par la clause « mot non compris sans effet » de 8.3, hésitation avec 0. |
| 3 / #5 | 01:42 ; 03:54 ; 06:22 | Découvrir | VOC « images-clés » | 2 | même bloc (002) ; phrase de résumé « n'a pas encore d'images-clés » (009, 013, 014) ; texte « Première image-clé de la piste » (015) | « n'a pas encore d'images-clés » — mot que je ne connais pas, mais je comprends qu'il lui manque son effet » | — | Compté une fois. Contourné par « Remplir avec ». En débriefing : le message « m'inquiète pour rien » (déclaratif). |
| 3 / #5 | 01:42 | Découvrir | DEC | — | liste « Animations du site » sous « Page La carte » (capture 002) | « Ça au moins je comprends : un effet, un élément. » | — | Inventaire des animations : hors champ (1.4), exploratoire. Repris en VAL+ au débriefing. |
| 8-9 / #13-#14 | 02:15-02:31 | Découvrir | (première action pertinente) | — | fil d'Ariane « Page › La maison › Contenu › Photo de la salle », bouton bleu « Animer « Photo de la salle » », « Quand : À l'entrée dans l'écran » (capture 005) | « donc j'ai bien attrapé la photo » | — | Rang 8 (9.2). Le texte d'aide de 005 mentionne « (la section lance, le titre et le texte bougent) » ; non lu (persona : jamais les textes d'aide). |
| 9 / #14 | 02:31 | Lancer | SAT | — | « Quand : À l'entrée dans l'écran » (capture 005) | « « À l'entrée dans l'écran », c'est exactement mon animation d'entrée. » | — | Agacement déclaré 1. |
| 11 / #17 | 02:56 | Découvrir | FRU | — | panneau « ANIMATION · Photo de la salle » entier (capture 006) | « Ouh là, ça s'est ouvert en grand et c'est beaucoup d'un coup. » | — | Sans coût d'action : elle enchaîne à l'action 12 sur le bon menu. |
| 11 / #17 | 02:56 | Découvrir | DEC | — | liste « Éléments de la scène (10) » avec « + Ajouter » par ligne, « Chiffres · 3 éléments … les 3 un à un », « Remplir avec : un préréglage… » (capture 006) | « Tout est là en fait. » | — | Fonctions du lot 8 trouvées à la première ouverture du panneau, sans les chercher. |
| 11 / #17 | 02:56 | Lancer | SAT | — | case « à chaque passage » sous « Rejouer » (capture 006) | « une case « à chaque passage » — ça c'est exactement ce qu'Aurèle demande pour que ça rejoue » | — | Cochée à l'action 36. |
| 11 / #17 | 02:56 | Composer | **RATE** | **4** | « PISTE · PHOTO DE LA SALLE » / « Départ | 0 | ms », dernier bloc visible en bas du panneau droit (capture 006, y ≈ 447 ; encore visible en 008, 009, 010, 011) | capture 006 | — | Origine de la chaîne qui aboutit à C3 non rempli, C4 non rempli et arrêt au budget (8.3 : la conséquence finale va au premier événement). L'accès au décalage est lisible dès la première ouverture ; il n'est pas utilisé. Elle énumère pourtant à 02:56 « 1000 ms, À l'entrée dans l'écran, un délai à 0 ms » (le « Délai » du haut, global) : le mot qu'elle cherche est « Délai » (08:04), celui de la piste est « Départ ». Hésitation : la RATE de l'action 17 (ci-dessous) est plus nette ; je garde l'origine ici par la règle « premier de la chaîne ». |
| 11 / #17 | 02:56 | Régler | RATE | 3 | champ « 1000 | ms » à gauche de « Une fois » (capture 006, visible jusqu'en 019) | « Je vois « Animation · Photo de la salle », 1000 ms » | — | Jamais modifié ; C4 non rempli (fin à 1 000 ms). Hésitation : C4 dépend d'abord des départs (P-A) ; la durée est le second levier, reconnu par elle à 08:38 (« un changement de durée »). Probablement à fusionner avec la RATE précédente au regroupement. |
| 13 / #20 | 03:13 | Choisir | SAT | — | liste déroulante « Apparition · Fondu … Survol · Soulever » (capture 007) | « C'est le même vocabulaire que chez moi, je suis à l'aise. » | — | Elle repère déjà « Montée avec rebond » pour les chiffres. |
| 15 / #23 | 03:20-03:34 | Vérifier | VERIF-E | — | phrase de résumé « Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, une seule fois. » (capture 008) | « Je photographie pour vérifier que la photo a bien pris l'effet. » | — | Première vérification, rang 15, dans l'éditeur, par la phrase de résumé. Journal v2 09:21:14 « Remplir la piste · Glissé depuis la gauche » confirme. |
| 15 / #23 | 03:34 | Vérifier | FRU | — | canevas : cadre en pointillés vide à la place de la photo, étiquette « Photo de la salle » (capture 008 ; « 0 / 1 000 ms ») | « là je vois un trou, c'est déstabilisant mais je continue » | PERC | Elle présente correctement l'explication comme une supposition (« je suppose que l'aperçu me montre l'instant zéro »). PERC : la capture fixe ne peut pas dire si une lecture s'est jouée à la pose du préréglage ; l'état au repos (tête à 0, élément invisible) est attesté. Le texte d'aide « L'aperçu montre l'instant de la tête de lecture : glissez-la (ou ▷) pour voir la scène se jouer » est visible en 006-019, non lu. |
| 17 / #26 | 03:54 | Composer | **RATE** | 3 | « Départ | 0 | ms » en bas du panneau, piste « Titre 2 » sélectionnée (capture 009, y ≈ 447) | « et son « Départ » est à 0 ms. » | — | Le champ est lu à voix haute et non utilisé. Coût propre : 22 actions (17 → 39) avant de le reconnaître comme « mon délai ». À l'action 21 elle formule le besoin (« il faudra que je les décale, comme mes délais croissants ») sans revenir au champ. Contredit la version déclarative (« découvert […] à la 39e action », « rien ne me dit qu'il y a un champ « Départ » »). |
| 20-21 / #31-#32 | 04:24 | Choisir | VAL− | — | — | « C'est plus long qu'Elementor mais ça avance, agacement 2. » | — | Limite le bénéfice (temps). |
| 21 / #32 | 04:37 | Composer | (constat) | — | zone graduée : deux barres alignées au même départ (capture 011) | « elles commencent toutes les deux au même endroit : il faudra que je les décale » | — | Pas un code : constat juste, intention annoncée. Sert de repère pour la RATE de l'action 17. |
| 27-28 / #41-#42 | 05:48 | Composer | SAT | — | ligne « Chiffres · enfants » dans la zone graduée ; « Intervalle | 100 | ms | Depuis le début » (capture 014) | « donc c'est bien le décalage entre les trois chiffres, ça m'évite de le faire à la main » | — | « les 3 un à un » trouvé et compris ; journal v7 « Ajouter une piste · les enfants de Chiffres ». Persona : d'habitude délais à la main ; ici la fonction dédiée était visible, pas cherchée (pas de PERS codé). |
| 29-30 / #44-#45 | 05:51-06:22 | Choisir | HES | 1 | bas du panneau droit sous la liste « Éléments de la scène (10) » (captures 014-015) | « en bas j'aperçois un texte sur une « première image-clé » que je ne comprends pas » | — | Deux actions sans nouvel endroit atteint + incertitude verbalisée. |
| 29 / #44 | 05:51 | Composer | ERR | 2 | défilement à (680, 470) sur la liste des éléments (capture 015 : la ligne « Contenu » sort, « Producteurs » entre ; sous la liste, le texte « Première image-clé de la piste … » remplace « Intervalle ») | « Je fais défiler le panneau du bas pour retrouver « Remplir avec » » | — | Résultat contraire à l'intention : « Remplir avec » n'apparaît pas ; la liste défile d'une ligne et l'en-tête de piste avec son « Départ » sort par le haut (en 016-018, le panneau de piste commence à « Cible », sans « Départ »). Récupérée seule à 31. |
| 31-32 / #47-#48 | 06:25-06:44 | Choisir | REC-S | — | chevron « › » devant « Éléments de la scène (10) » (capture 015, 566 × 343) ; liste repliée, panneau « Cible : Ses enfants, un à un · Intervalle 100 ms · Remplir avec » visible (capture 016) | « Je clique sur ce chevron pour replier la liste et laisser la place au panneau du bas. » | — | Coût total du détour 29-32 : 4 actions. Elle le qualifiera de « trouvé par hasard » (T4-a). |
| 35 / #53 | 07:06-07:09 | Choisir | SAT | — | « Apparition · Montée avec rebond » dans la liste ouverte (capture 017) | « c'est exactement « va un peu trop loin puis revient se poser » » | — | Journal v8 ; courbe `cubic-bezier(.34,1.56,.64,1)` : C5 rempli pour les chiffres. |
| 36 / #54 | 07:24-08:04 | Lancer | (réglage juste) | — | case « à chaque passage » cochée en bleu ; résumé « … en 800 ms, à chaque passage. » (capture 018) | « La case « à chaque passage » est bien cochée en bleu » | — | Journal v9 « Rejouer » ; C6 rempli. Clic à (568, 163) sur une case visible en 017 à (566, 163) : pas d'anticipation. |
| 37 / #55 | 08:04 | Composer | FRU + VAL− | — | zone graduée : quatre barres partant du même point (capture 018) | « C'est ça qui me manque, et c'est précisément ce qu'Elementor me donnerait en tapant 0, 200, 400, 600 dans une case « Délai ». » | — | Elle nomme le champ qu'elle cherche : « Délai ». Un champ « Délai | 0 | ms » existe en haut du panneau (global, capture 018), non essayé ; celui de la piste s'appelle « Départ ». Aucune confusion verbalisée : simple relevé des captures. |
| 38 / #57 | 08:07 | Composer | ERR + MM | 2 | barre de la ligne « Titre 2 « Une cu… » dans la zone graduée (capture 018 : barre de x ≈ 624 à 739, y = 260 ; glisser de 680 à 730) | « Je tente de faire glisser la barre du titre vers la droite dans la zone graduée, en espérant que ça retarde son départ. » | — | Capture 019 : « 640 / 1000 ms », tête de lecture à x ≈ 730, piste Titre 2 sélectionnée, barre inchangée. Attente contredite (MM) et résultat contraire (ERR). Non récupérée (tête laissée à 640 ; sans effet sur le site, aucune version au journal). Gravité 2 par coût (2 actions) ; hésitation avec 3 : elle en conclut qu'on ne peut pas déplacer les barres (« j'ai cru un moment que je n'avais pas le droit de déplacer les barres du tout », T4-b). |
| 39 / #58 | 08:14-08:38 | Vérifier | DEC + VERIF-E + SAT | — | canevas : photo, titre, paragraphe et chiffres visibles ; « 640 / 1000 ms » (capture 019) | « effet secondaire agréable, je vois enfin ma scène à cet instant » | — | Découverte fortuite du rôle de la tête de lecture. Seule vue de la scène « en cours » de la séance, à un instant fixe. |
| 39 / #58 | 08:38 | Composer | (reconnaissance tardive) + FRU | — | « PISTE · TITRE 2 « UNE CUISINE DE… » » / « Départ | 0 | ms » (capture 019) | « voilà mon délai, c'est là que j'aurais dû aller au lieu de tirer sur la barre. Mais je n'ai plus de budget pour le faire quatre fois. » | — | Agacement 3 (< 4 : pas FRU par la règle 6, mais expression négative spontanée « la zone graduée m'a piégée »). Elle disposait d'une 40e action ; ne l'utilise pas. |
| 39 / #58 | 08:38 → 09:47 | — | **BUD** | 4 | — | « FIN : budget · ACTIONS : 39 » ; modérateur : « Nous allons nous arrêter là pour cette mission. » | MOD | Statut E. Arrêt auto-déclaré à 39, phrase du modérateur prononcée à 39 (voir section 6). Pas de MM au sens 9.1 (statut E, pas C/P). |

---

## 4. Codes déclaratifs (marqués « déclaratif »)

| Moment | Code | Étape | Citation | Note |
|---|---|---|---|---|
| T4-SEQ (10:02) | SEQ 4 | — | « 4. Ni facile ni difficile, mais pour de mauvaises raisons » | déclaratif |
| T4-SEQ | VAL+ | Choisir / Composer | « la liste des éléments de la section avec un « + Ajouter » en face de chacun, ça c'est mieux qu'Elementor, je n'ai pas eu à cliquer élément par élément » | déclaratif ; comportement associé : actions 16, 22, 27 |
| T4-SEQ | VAL− | Composer | « j'ai dépassé le temps que ça me prendrait chez moi et je n'ai pas fini » | déclaratif |
| T4-R | VAL− | Composer | « tel que je le laisse, si Aurèle regarde, elle va me dire que ça ne raconte rien » | déclaratif ; conforme au site |
| T4-a (11:07) | (cohérente) | Composer | « je regarde le panneau du bas, qui affiche alors « PISTE · Paragraphe… » avec un champ « Départ » en millisecondes » | déclaratif ; hypothèse « si le paragraphe démarrait à 1 000 » explicitement conditionnelle |
| T4-a | FRU | Composer | « il faut que le panneau du bas soit visible, et chez moi il était coupé par la liste « Éléments de la scène » » | déclaratif ; attesté par 012-018, mais pas par 006-011 |
| T4-b | FRU | Composer | « Tout le reste est parti dans la même impasse. » | déclaratif |
| T4-b | FRU | Composer | « rien ne me dit qu'il y a un champ « Départ » en dessous » | déclaratif ; **contredit** par les captures 006-011 et par sa propre parole à 03:54 (11.4 : la trace de tâche prime) |
| T4-b | FRU | Composer | « j'ai cru que les barres se tiraient à la souris […] c'est le curseur de lecture qui a bougé » | déclaratif ; comportement : ERR action 38 |
| T4-b | FRU | Vérifier | « Je ne savais jamais si ce que je venais de faire était juste, donc je photographiais et je relisais la phrase de résumé » | déclaratif ; comportement : captures 008, 011, 013, 018 |
| T4-b | VAL+ | Vérifier | « Cette phrase de résumé est très bien, d'ailleurs, c'est elle qui m'a servi de contrôle » | déclaratif |
| T4-b | SAT | Choisir | « La partie que je croyais difficile, choisir les effets et attraper les bons éléments, a été la plus simple que j'aie vue, meilleure que chez moi. » | déclaratif |
| D-FIN-1 (11:58) | VAL+ | Choisir / Composer | « j'ai tout empilé depuis un seul panneau » ; « une option « les 3 un à un » […] qui m'a fait gagner les délais que je tape à la main » | déclaratif |
| D-FIN-1 | VAL− | — | « pas non, mais pas encore » ; « je ne peux pas dire à l'agence « lancez-vous » sur la base d'une séance où je n'ai pas fini » | déclaratif |
| D-FIN-2 | SAT + VAL+ | Choisir | « c'est mot pour mot mon vocabulaire, je n'ai pas eu à réfléchir une seconde » | déclaratif |
| D-FIN-2 | VAL+ | Vérifier | « c'est aussi ce que je montrerais à un client pour valider avant de lui envoyer le lien » (phrase de résumé) | déclaratif |
| D-FIN-2 | SAT | Découvrir | « le fil d'Ariane en haut à droite […] je savais toujours sur quoi j'étais » | déclaratif |
| D-FIN-3 | FRU | Composer | « Si les barres ne se tirent pas, il ne faut pas qu'elles ressemblent à des barres qu'on tire » | déclaratif |
| D-FIN-3 | FRU | Composer | « Le réglage le plus important de la mission était le moins visible de l'écran. » | déclaratif ; voir contradiction ci-dessus |
| D-FIN-3 | FRU | Vérifier | « sur le moment, trois fois de suite, j'ai cru que j'avais cassé quelque chose » | déclaratif ; **contredit** par la parole de tâche (03:34 « je suppose que l'aperçu me montre l'instant zéro » ; 04:37 « logique, à l'instant zéro rien n'est encore arrivé ») |
| D-FIN-10 | FRU | Vérifier | « je n'ai jamais vu ma scène se jouer en entier. Pas une seule fois. » | déclaratif ; attesté : aucune lecture, icônes de la rangée au-dessus des barres non utilisées, « Tester sur le site » non utilisé |
| D-FIN-10 | VOC (déclaratif) | Découvrir | « Le mot « images-clés » revient partout et ne me dit rien. […] Dites-moi plutôt « n'a pas encore d'effet » » | déjà compté en VOC |
| D-FIN-10 | VAL− | Régler | « La durée par défaut à une seconde m'a piégée sans que je m'en rende compte. » ; « Rien ne m'a alertée. » | déclaratif ; comportement : champ « 1000 ms » jamais touché (RATE) ; « tout ce que j'empilais rentrait de force là-dedans » est une interprétation non attestée (les pistes font 700 et 800 ms par préréglage) |
| D-FIN-10 | VAL− (hors champ) | — | « le mobile […] je ne sais pas du tout si mes animations s'appliquent sur les trois » | déclaratif ; hors champ (1.4), exploratoire |
| D-FIN-10 | VAL+ (hors champ) | Découvrir | « une longue liste « Animations du site » […] J'ai trouvé ça rassurant » | déclaratif ; DEC de l'action 3 |
| D-FIN-10 | VAL+ | — | « Les idées de l'outil sont bonnes, et franchement meilleures que ce que j'attendais. » | déclaratif |
| Clôture (13:34) | VAL− | Vérifier | « si vous corrigez une seule chose, faites que l'animation se joue dans l'éditeur » | déclaratif |

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

**P-A. Le décalage des départs n'est pas trouvé : le champ « Départ » de la piste, en bas du panneau droit, est vu puis masqué, jamais utilisé.**
- Endroit : bloc « PISTE · … » sous la liste « Éléments de la scène (10) », champ « Départ | 0 | ms » (captures 006, 008-011, 019) ; en 012-018 le bloc est rogné ou décalé (« Cible » puis « Remplir avec » seuls visibles ; après le défilement de l'action 29, le bloc commence à « Cible », « Départ » hors de vue).
- Étape : Composer. Cause apparente (observée) : deux faits distincts. (1) Le champ est visible et lisible cinq fois et lu une fois (action 17) sans être reconnu comme le réglage cherché ; la participante cherche une « case « Délai » sous l'effet » (08:04) et le panneau porte un « Délai » global en haut et un « Départ » de piste en bas. (2) Dès que la liste des éléments s'allonge (ajout du paragraphe, action 22) puis qu'elle est défilée (action 29), le bloc de piste passe sous le bord de l'écran ; le défilement agit sur la liste, et seul le repli de la liste (chevron) le ramène.
- Gravité maximale : 4 (RATE action 11, origine de C3 et C4 non remplis et de l'arrêt au budget). Lignes : RATE 11, RATE 17, HES 29-30, ERR 29, REC-S 31, reconnaissance tardive 39, BUD 39 ; déclaratif T4-a, T4-b, D-FIN-1, D-FIN-3.
- Test d'artefact : A1 non (libellé statique, lisible sur les captures ; la perception continue n'y changerait rien). A2 : aucun CONN ; aucun PERS à l'origine (ne pas lire les textes d'aide est dans la fiche ; le libellé « Départ » est un libellé court). A6 : aucun MOD avant. A8 : aucun HALL. → **problème d'interface**, avec la nuance que le récit déclaratif (« caché », « découvert à la 39e ») surestime la part (2) et passe sous silence la part (1), attestée par 006-011 et 03:54.

**P-B. La barre de piste dans la zone graduée est tirée pour décaler le départ ; c'est la tête de lecture qui se déplace.**
- Endroit : zone graduée « 250 · 500 · 750 · 1000 », ligne « Titre 2 « Une cu… » (captures 018-019).
- Étape : Composer. Cause apparente : barres alignées sur une règle en ms, sans indication visible de ce qui se déplace au glisser ; le glisser au milieu de la barre déplace la tête (« 640 / 1000 ms »).
- Gravité maximale : 2 (ERR + MM action 38, coût 2 actions ; hésitation avec 3 : conclusion « pas le droit de déplacer les barres », et c'est le dernier geste avant l'arrêt).
- Test d'artefact : A1 non (le résultat du geste est lisible : compteur « 640 / 1000 ms », barre inchangée). A2 non. A6 non. A8 non. → problème d'interface ; un seul participant à gravité 2 : signal faible sauf récurrence chez d'autres.

**P-C. L'aperçu se vide à la pose d'un préréglage (état à 0 ms) et la scène n'est jamais vue en mouvement.**
- Endroit : canevas (cadres vides, captures 008, 011, 013, 018) ; rangée d'icônes au-dessus des barres et texte « glissez-la (ou ▷) pour voir la scène se jouer » (006-019) ; bouton « Tester sur le site ».
- Étape : Vérifier. Cause apparente : la tête reste à 0 après la pose ; les commandes de lecture sont des icônes sans libellé, non identifiées ; le texte d'aide n'est pas lu.
- Gravité maximale : 1 (aucune action perdue : elle infère juste « l'instant zéro » dès 03:34 et se contrôle par la phrase de résumé). Lignes : FRU 15, DEC/VERIF-E 39 ; déclaratif T4-b, D-FIN-3, D-FIN-10, clôture.
- Test d'artefact : A1 **oui**, et l'interface offre d'autres représentations visibles (phrase de résumé — utilisée ; texte d'aide et icône ▷ — non utilisés) → **artefact probable, signal faible**. La version déclarative (« j'ai cru que j'avais cassé quelque chose ») est contredite par la parole de tâche (A8 ne s'applique pas, mais 11.4 oui). À confirmer avec des utilisateurs réels.

**P-D. La durée de l'animation reste à 1 000 ms.**
- Endroit : champ « 1000 | ms » à côté de « Une fois » (006-019). Étape : Régler. Cause apparente : jamais abordé ; le temps de la tâche est consommé par P-A. Gravité 3 (RATE 11, C4 non rempli). A1 non ; A2 non ; A6 non ; A8 non. → problème d'interface au sens formel, mais **conséquence de P-A** plutôt que cause propre ; à fusionner au regroupement inter-séances selon ce qu'ont fait les autres participants.

**P-E. Vocabulaire « images-clés » / « ligne de temps ».**
- Endroit : bloc « Comment ça marche » (002), phrases de résumé « n'a pas encore d'images-clés » (009, 013, 014), « Première image-clé de la piste » (015-018). Étape : Découvrir. Gravité 2 (VOC sans effet sur le résultat). A1 non ; A2 : mots de la liste inconnue de la persona, lus à l'écran (pas CONN). → signal faible seul ; à croiser avec les autres séances.

**Note (pas un problème)** : la scène a été construite depuis la photo (enfant), et le déclencheur est resté sur la photo ; la section n'a jamais été sélectionnée. Aucune capture ne montre une entrée par la section, donc rien à coder ; mais c'est la donnée de structure pour C2 et pour la lecture du lot 8 (« désigner le groupe depuis un enfant » a fonctionné via la liste « Éléments de la scène » ; « scène entière en une vue » n'a pas été rencontrée).

---

## 6. Écarts au protocole et au dispositif ; limites de lecture

- **MOD (gravité 0, sans effet sur la tâche)** : la phrase de fin de budget est prononcée à 09:47 alors que le compte annoncé est 39 (le script la réserve à la 40e action ; l'addendum 5 la déclenche « dès l'annonce d'un compte ≥ 40 »). Elle suit le « FIN : budget » écrit par la participante, qui avait cessé d'agir. Le mode de fin BUD est donc en partie auto-déclaré ; le statut (E) n'en dépend pas.
- **MOD (forme)** : les questions après la tâche sont posées deux par deux (T4-SEQ + T4-R ; T4-a + T4-b) et le débriefing trois par trois (D-FIN-1 à 3), sans « Merci. » intercalé ; pas de relance. Tout est postérieur à la tâche : aucun événement de tâche « contaminé » (A6). La consigne et la transition E sont mot pour mot ; aucune parole du modérateur pendant la tâche.
- **Dispositif** : chaque message du modérateur est encadré d'un « The coordinator sent a message… / Address this before completing your current task. » (enveloppe du dispositif, pas du modérateur).
- **HORS** : la trace signale une « lecture prompt5-p5.md » (#1) ; c'est la consigne d'incarnation lue sur ordre du coordinateur, avant la mission. Pas une action interdite au sens 4.3.F (code, documentation ou inspection de l'outil). Aucune tentative HORS pendant la tâche.
- **PERS** : aucun écart net. Nuances : (a) la participante n'a pas annulé une seule fois (« annule beaucoup » dans la fiche) — rien à annuler, tous les gestes ont produit ce qu'elle voulait sauf 29 et 38 ; (b) pour les chiffres elle a pris la fonction dédiée visible (« les 3 un à un ») au lieu de délais à la main : conforme à la lettre (elle ne l'a pas cherchée) ; (c) elle s'est arrêtée à 39 en invoquant le budget alors qu'il lui restait une action et que la fiche dit « continue jusqu'au budget ». Cette connaissance du budget vient de ses règles techniques (que je ne peux pas lire) ; je ne la code pas PERS mais je la signale.
- **CONN** : aucun. Tous les termes employés ont été lus à l'écran (« piste », « à chaque passage », « préréglage », « images-clés ») ou sont de son vocabulaire (« délai », « ms », « animation d'entrée »). « Curseur de lecture » est sa traduction de « tête de lecture » (texte visible en 006). Les clics à l'aveugle (23 : « un préréglage… » sans capture entre 22 et 23 ; 36 : « à chaque passage ») visent des éléments vus sur la capture précédente à la même position.
- **PERC** : un passage (action 15, aperçu vide à 0 ms). La scène n'a jamais été jouée : la capture fixe ne permet pas de savoir si la pose d'un préréglage déclenche une lecture ; l'état de repos est attesté.
- **HALL** : aucun. Chaque description vérifiée contre sa capture (liste des préréglages 007 ; cadres vides 008, 011 ; « Chiffres · enfants » et « Intervalle : 100 ms » 014 ; « Cible : Ses enfants, un à un » 016 ; case cochée et résumé 018 ; « 640 / 1000 ms » et « PISTE · TITRE 2 » 019). Les suppositions de mouvement sont présentées comme telles.
- **Blocs 🧠** : la trace ne contient que des lignes 💬 ; aucune pensée restituée partielle. Pas d'incertitude de ce chef.
- **Limites de ma lecture** : (1) sur la capture 015, je ne peux pas dire avec certitude si le défilement de l'action 29 a fait défiler un seul conteneur (liste + bloc de piste) ou deux ; j'observe seulement que la liste a bougé d'une ligne et que, à partir de 016, le bloc de piste commence à « Cible » sans « Départ ». (2) « Départ | 0 | ms » en 006-011 se trouve dans les 50 derniers pixels de la capture ; lisible à mes yeux à l'échelle 800 × 500, mais sans loupe de la participante pour le confirmer ; sa lecture à voix haute à 03:54 lève le doute pour 009. (3) La réserve sur C2 (déclencheur sur la photo ou sur la section) est une question de lecture du critère, à arbitrer par le chercheur ; elle ne change pas le statut. (4) La séance est en position 1 sans apprentissage préalable, comme prévu par l'addendum (résultat « en défaveur de la version ») ; je n'en tire rien de plus.
