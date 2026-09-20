# Observation · P1 (Nathalie Besson, débutante) · vague 5 · T4 en position 1

Observateur : codage après coup à partir de la trace brute (`traces5/trace-p1.md`), du journal `shots5/p1-t4/log.jsonl`, des 20 images du dossier `shots5/p1-t4/` (17 captures, 3 loupes, toutes ouvertes) et de la fiche de lecture `fiches5/fiche-lecture-p1.md`. Grille de la section 8 du protocole, version remise à l'observateur (sans hypothèses). Aucune ligne 🧠 dans cette trace : toute la pensée à voix haute est écrite (💬), il n'y a donc pas d'incertitude de restitution à signaler sur la parole pendant la tâche.

Convention des références : `[n]` = compte d'actions du participant (remis à zéro pour la mission, seule mission de la vague) ; `#n` = appel d'outil ; heures mm:ss de la trace ; heures UTC du journal entre parenthèses quand elles servent (décalage constant : 02:34 de la trace = 09:20:17 UTC). Les images sont désignées par leur numéro (001 à 020).

---

## 1. Résumé de la séance

P1 aborde T4 à froid (première et seule mission). Dès la première capture (001) elle repère l'onglet « Animation » de la barre du haut, descend jusqu'à la partie « La maison », clique la photo, ouvre le bloc « Animation » du panneau de droite et pose en 12 actions une apparition « Glissé depuis la gauche » (journal v1, 09:20:17). Elle répète le même chemin sur le titre (« Fondu en montant », v2), le paragraphe (« Fondu », v3) et le chiffre « 12 » (« Montée avec rebond », v4), puis utilise « Pareil pour « Couverts » et « Producteurs » » (v5) et « Rejouer : à chaque passage » (v6, sur « Années » seulement). À l'action [35], en lisant la phrase de résumé, elle constate que les trois chiffres s'enchaînent (0, 120, 240 ms) mais devine que la photo, le titre et le paragraphe partiront « tous en même temps » ; elle ouvre alors « Voir la scène de « La maison » » ([36]), lit à la loupe les barres et l'avertissement orange « 4 lancements séparés … faites démarrer chaque élément « après » le précédent » ([38]), reclique le titre ([39]) et atteint le budget de 40 actions ([40]) sans avoir ouvert la liste « Démarre » ni touché « Délai ». Aucun blocage déclaré, aucune aide ; agacement déclaré 1, 1, 2, 3. Site enregistré : six éléments animés, quatre lancements séparés à leur propre entrée à l'écran, tout fini à 1 040 ms, répétition sur les chiffres seuls : échec (C3 non rempli), mode de fin budget. Le récit du visiteur (T4-R) décrit fidèlement ce site (7 sur 8, sans écart matériel) : échec lucide.

---

## 2. La tâche T4 (position 1)

### 2.1 Statut (9.1) et profil de critères (section 5)

Lu dans la fiche du site enregistré (version 6) :

| Critère | Lecture du site | Rempli |
|---|---|---|
| C1 · les six éléments bougent | photo (opacité 0→1, translateX −40 px), titre (opacité, translateY 28 px), paragraphe (opacité), Années, Couverts, Producteurs (opacité, translateY 28 px) : tous partent d'un état conforme à 5.0 et reviennent à `transform:none`, opacité 1 | oui |
| C2 · un seul événement | quatre déclencheurs `on=inView`, chacun sur son propre élément (rh_about_img, rh_about_h2, rh_about_p, rh_stat1) ; Couverts et Producteurs enchaînés dans l'animation d'Années (`start with … gap 120`) | non |
| C3 · ordre principal | départs photo 0, titre 0, paragraphe 0, premier chiffre 0 (section supposée entrer d'un coup ; visite du préparateur : « 0 → ~880 ms ensemble ») : aucun écart de 80 ms | non |
| C3b · chiffres échelonnés | Années 0, Couverts 120, Producteurs 240 (écarts 120 ms) | oui |
| C4 · minutage | fin du dernier mouvement à 1 040 ms (< 1 800) | non |
| C5 · manières de bouger | photo : décalage horizontal 40 px ≥ 16 ; titre : 28 px vers le bas ≥ 8 ; paragraphe : fondu ; chiffres : `cubic-bezier(.34,1.56,.64,1)` (y2 = 1,56, courbe à dépassement) | oui |
| C6 · répétition | `once=false` sur le déclencheur d'Années seulement ; photo, titre, paragraphe : « une seule fois » | non |

- **Statut : E (échec)**, pour deux raisons indépendantes : C3 non rempli ; et trois critères non remplis parmi C2, C3b, C4, C5, C6 (C2, C4, C6). Fin du dernier mouvement à 1 040 ms, sous 4 500 ms, ce qui n'aurait compté que pour une partielle.
- **Profil : C1 ✓ · C2 ✗ · C3 ✗ · C3b ✓ · C4 ✗ · C5 ✓ · C6 ✗** (3 sur 7).
- **Accord avec le statut proposé par le préparateur** (« E (C3), mode BUD ») : oui, même lecture critère par critère. Désaccord sur une note annexe du préparateur : « vue « Scène » et « Voir la scène » non utilisées (à vérifier sur captures) » est contredit par les captures 018 et 019 (le lien « Voir la scène de « La maison » » est cliqué à [36], #54, et le bloc « Scène » de la section est capturé puis lu à la loupe) ; le préparateur le corrige lui-même dans la note suivante (« la vue Scène a donc été vue »). Sans effet sur le statut.
- Aucune modification collatérale dans le journal (six nœuds touchés, tous visés ; surtitre « La maison » intact : la scène affiche « Paragraphe « La maison » ne bouge pas », 019).

### 2.2 Mode de fin, aides

- **Mode de fin : BUD** (budget). Le participant annonce lui-même « FIN : budget · ACTIONS : 40 » à 07:25 ; le modérateur dit la phrase d'arrêt du script à 08:06 (conforme à l'addendum 5, point 5 : arrêt dès l'annonce d'un compte ≥ 40). La participante savait que le budget se fermait (« je n'ai plus le droit de continuer », 07:25) : voir section 6.
- **Aides : aucune.** Aucun « Je suis bloquée », aucune relance. Niveau maximal : 0.

### 2.3 Métriques (9.2)

| Métrique | Valeur | Source |
|---|---|---|
| Actions totales (compte du participant) | 40 | trace [1]…[40] |
| Appels d'outils de la tâche | 60 (#2 à #61), dont 20 ouvertures d'image 👁 non comptées → 40 actions ; concordance exacte avec `log.jsonl` (40 lignes : 17 captures, 3 loupes, 18 clics, 2 défilements) | trace, log |
| Actions perdues à cause des défauts du dispositif | 2, avec réserve : [32] (clic sur une mise en page qui avait bougé depuis la capture 015, cf. L21) et [33] (capture pour le constater). Les 3 loupes ne sont pas comptées comme perdues (lecture conforme à la persona) | codage |
| Première action pertinente | **[6]** (#10, 01:47) : clic sur « Animation » en bas du panneau → capture 004 montre « Faire arriver l'élément, le faire réagir au survol ou bouger en continu » et « Apparition : Aucune » pour la photo. Lecture moins stricte : [4] (#7, clic sur la photo → capture 003 montre déjà l'entrée « Animation » repliée en bas du panneau de la photo). Je retiens [6] par prudence | captures 003, 004 |
| Actions jusqu'à la réussite | non atteint (statut E) | journal, site |
| Temps | consigne à 00:58, dernière action à 07:11 (09:24:55 UTC), dernière parole de tâche 07:25, arrêt du modérateur 08:06 ; premier au dernier appel du log : 09:18:47 → 09:24:55 UTC (6 min 08) | trace, log |
| Captures et agrandissements | 17 captures, 3 loupes (013, 017, 019) = 20 des 40 actions | log |
| Fausses pistes | 0 FP, 0 action perdue | codage |
| Hésitations | 2 HES (L13, L25), toutes deux gravité 1, toutes deux « capture puis loupe » pour lire un petit texte | codage |
| Erreurs | 1 ERR (L21), non récupérée (la liste « Ses voisins » n'est jamais rouverte) | codage |
| Collatérales | COLL-D 0, COLL-ND 0 | journal |
| Occasions manquées | 3 RATE : L7 (« Démarre » visible dès 007, jamais ouvert), L10 (« Voir la scène » vu à 010, utilisé à [36]), L33 (« Voir l'effet » / « Tester sur le site » visibles, jamais utilisés) | codage |
| Aides | 0 | trace |
| Vérification | VERIF : aucune (jamais de vue sans outils, « Tester sur le site » non utilisé). VERIF-E : [36] (#54), bloc « Scène » de la section, représentation statique des départs et durées ; codé VERIF-E avec hésitation (voir L24) | codage |
| Vocabulaire (VOC) | pendant la tâche : « survol », « ms », « Composant », « Délai » ; en débriefing seulement : « instance » (visible sur 012 « 3 instances dans le site ») | codage |
| SEQ | 3 | T4-SEQ |
| Concordance du récit | 7 sur 8, pas d'écart matériel (2.4) | T4-R, site |
| Agacement déclaré | 1 ([10]), 1 ([20]), 2 ([30]), 3 ([40]) ; maximum 3 | trace |

Repères de progression du journal (non codés, pour situer les lignes) :

| Version | Action | Appel | UTC | Libellé du journal | Nœud |
|---|---|---|---|---|---|
| v1 | [12] | #19 | 09:20:17 | Apparition · Glissé depuis la gauche | photo |
| v2 | [18] | #28 | 09:21:06 | Apparition · Fondu en montant | titre (sans capture de contrôle : [19] clique aussitôt le paragraphe) |
| v3 | [23] | #35 | 09:21:41 | Apparition · Fondu | paragraphe (sans capture de contrôle : [24] clique aussitôt le chiffre) |
| v4 | [29] | #44 | 09:22:39 | Apparition · Montée avec rebond | Années |
| v5 | [31] | #47 | 09:23:04 | Apparition · pareil pour les 2 suivants | Couverts +120 ms, Producteurs +240 ms, dans l'animation d'Années |
| v6 | [34] | #51 | 09:23:36 | Apparition · à chaque passage | déclencheur d'Années seulement |

### 2.4 Concordance du récit (9.4) : T4-R comparé au site enregistré

| Dimension | Score | Phrase du récit | Fait du site |
|---|---|---|---|
| Quoi | 2 | « la photo glisse … le titre monte en fondu … le paragraphe se fait en fondu … les trois chiffres arrivent » | les six éléments animés, aucun autre : confirmé |
| Quand | 1 | « quand le visiteur descend et arrive sur la partie « La maison » … Les trois partent ensemble, d'un coup » ; « Ensuite — ou peut-être aussi en même temps, je ne suis pas sûre — les trois chiffres arrivent, eux l'un après l'autre : 12, puis 38, puis 14 » | déclencheurs à l'entrée de chaque élément (compatible avec « arrive sur la partie ») ; photo, titre, paragraphe à 0 : confirmé ; chiffres 0 / 120 / 240 : ordre confirmé ; les chiffres partent en même temps que le reste (Années à 0) : le récit hésite entre « ensuite » et « en même temps », donc vague mais compatible, non faux |
| Comment | 2 | « glisse depuis la gauche », « monte en fondu », « se fait en fondu », « chacun qui monte et qui rebondit un peu » | slide depuis −40 px, fade-up, fade, rise-bounce avec courbe à dépassement : confirmé |
| Combien | 2 | « tout est fini en une seconde » ; « les trois chiffres recommencent … Pour la photo, le titre et le paragraphe, je ne l'ai pas fait, donc je suppose qu'ils ne se rejoueront pas » | fin à 1 040 ms ; `once=false` sur Années seulement : les deux exacts (la durée est déduite du « (1 s) » lu sur 019, ce que le récit dit lui-même) |

- **Total : 7 sur 8. Écart matériel : non.** Aucune affirmation fausse sur quoi, quand, nombre de fois ni ordre. Matrice réussite × compréhension : **échec lucide** (« elle va me dire que ce n'est pas ce qu'elle avait demandé, et elle aura raison »).
- Pas de code MM au titre de 9.1 (le statut E avec BUD ne suppose pas que le participant se croie arrivé ; ici il dit le contraire).

### 2.5 Mesures propres de T4 (section 5)

- **Profil de critères** : C1, C3b, C5 remplis ; C2, C3, C4, C6 non remplis.
- **Structure de lancement** : lancements séparés (quatre déclencheurs « quand il entre dans l'écran », un par élément, plus deux pistes enchaînées « avec … +120 ms » dans l'animation d'Années par « Pareil pour ») ; aucun « Démarre après », aucun retard ; tous les délais à 0. C'est exactement ce que l'avertissement de la scène lui a décrit à [38] (019 : « 4 lancements séparés »).
- **Cohérence de T4-a avec la structure enregistrée** : cohérente, avec une réserve. Elle décrit le bon chemin (cliquer le paragraphe, bloc « Animation », ligne « Démarre » ou case « Délai ») et cite l'avertissement orange comme source (« Le texte en orange disait de faire démarrer chaque élément « après » le précédent, donc j'irais voir dans la liste « Démarre » s'il y a un choix du genre « après le titre » »). Réserve : elle raisonne sur un ordre (« après le titre » → « après la photo ») que le site enregistré n'a pas (le paragraphe part déjà à 0), sans le relever ; et elle dit ne pas savoir quel nombre taper dans « Délai » ni dans quel sens. Pas de MM : rien de contredit par le site.

---

## 3. Lignes de codage (format 8.5)

Séance P1, tâche T4, position 1 sur toutes les lignes. Gravité « — » pour les codes sans gravité (SAT, FRU, DEC, VERIF-E).

| L | N° action / appel | Horodatage | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|
| L1 | [1] / #2 | 01:16 | Découvrir | SAT | — | onglet « Animation » dans la barre du haut (001) | « Tiens, il y a écrit « Animation » tout en haut, comme dans PowerPoint. Ça me rassure. » | — | Le mot cherché a priori est trouvé sur la première capture ; elle ne clique pourtant pas cet onglet et passe par l'élément (persona : cliquer la photo d'abord). |
| L2 | [7] / #11 | 02:00 | Découvrir | VOC « survol » | 0 | phrase d'aide du bloc « Animation » du panneau de droite : « Faire arriver l'élément, le faire réagir au survol ou bouger en continu, en un choix. » (004) | « Le mot « survol », je ne sais pas ce que c'est. » | — | Mot évité ; la ligne « Quand la souri… » n'est jamais ouverte et n'était pas nécessaire. Aucun effet sur les actions. |
| L3 | [11] / #17 | 02:33 | Choisir | SAT | — | liste déroulante « Apparition » ouverte : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond (006) | « Ce sont des mots que je comprends, ça me plaît. » | — | Choix immédiat et juste (« Glissé depuis la gauche » pour « arrivant par le côté ») ; v1 à l'action suivante. |
| L4 | [13] / #20 | 02:54 | Régler | VOC « ms » | 3 | ligne « Vitesse » du bloc « Animation » : Rapide / Normale / Lente et champ « 700 ms » (007) | « « ms », je ne sais pas ce que c'est, moi je compte en secondes » | — | Elle ne touchera jamais ni la vitesse ni le champ ; à [40] : « je ne sais pas si 700 c'est beaucoup ou pas ». C4 non rempli (fin à 1 040 ms) a deux causes : les durées laissées par défaut et l'absence d'enchaînement ; hésitation 2/3, retenu 3 parce que la consigne donnait une durée cible et que le mot en a empêché toute lecture. |
| L5 | [13] / #20 | 02:54 | Lancer | SAT | — | ligne « Démarre : quand il entre dans l'écran » (007) | « « Démarre : quand il entre dans l'écran », ça, ça me va, c'est bien quand le visiteur arrive dessus. » | — | Compréhension juste du moment de lancement pour un élément ; mais voir L7. |
| L6 | [13] / #20 | 02:54 | Choisir | DEC | — | ligne « Pareil pour « Texte » » sous « Apparition » (007) ; pastille « + 1 animation » dans l'en-tête du panneau | « en haut il s'est ajouté « + 1 animation ». En dessous il y a « Pareil pour « Texte » » » | — | Première rencontre de « Pareil pour … » ; lue, non utilisée ici (pertinent : l'effet de la photo n'est pas voulu sur le texte). Réutilisée à bon escient à [31]. |
| L7 | [13] / #20 | 02:54 | Composer | RATE | 4 | liste déroulante « Démarre » (valeur « quand il entre dans l'écran ») en bas du bloc « Animation » (007 ; encore visible sur 015, 016, 017, 020) | capture 007 ; « ça, ça me va » | — | Le contrôle n'est jamais ouvert de la séance. D'après le seul avertissement de la scène (019 : « faites démarrer chaque élément « après » le précédent, ou « quand « La maison » entre dans l'écran » »), c'est là que se règlent et l'ordre (C3) et l'événement unique (C2) ; je ne peux pas le vérifier autrement, la liste n'ayant jamais été déroulée. La valeur par défaut, lue comme satisfaisante, ferme la question. Origine de la chaîne qui mène à C2 et C3 non remplis, donc à l'échec : gravité 4 par la règle d'origine ; hésitation avec 3 si l'on tient le coût du chemin par élément (L29) pour l'origine. |
| L8 | [15] / #23 | 03:08 | Découvrir | SAT | — | titre sélectionné, bloc « Animation » déjà déplié avec « Apparition : Aucune » (008) | « Parfait, c'est toujours au même endroit. » | — | Le chemin appris sur la photo est réutilisé à l'identique : titre en 5 actions ([14]–[18]), paragraphe en 5 ([19]–[23]). |
| L9 | [18]→[19] / #28→#29 | 03:22–03:30 | Choisir | — (repère) | — | — | journal v2 « Apparition · Fondu en montant » | — | Non codé : après le choix, elle clique le paragraphe sans capture (« dire ce que vous voyez » impossible) ; même chose après v3 ([23]→[24]). Économie d'actions : elle ne voit donc jamais le panneau du titre ni du paragraphe après leur réglage (ni « Démarre », ni « Rejouer »). Voir section 6. |
| L10 | [20] / #30 | 03:43 | Composer | RATE | 2 | ligne « Voir la scène de « La maison » » en tête du bloc « Animation » du paragraphe (010 ; aussi sur 012, 015, 016) | « Tiens, il y a une nouvelle ligne : « Voir la scène de « La maison » ». Je la garde dans un coin de la tête, ça pourrait servir pour l'ordre. » | — | Accès lisible, compris comme lié à l'ordre, non utilisé avant [36] (16 actions plus tard). Coût difficile à chiffrer : l'ouverture à [36]–[38] a laissé 2 actions ; ouverte ici, elle aurait livré l'avertissement avec 17 actions restantes. Hésitation 2/3 ; retenu 2 (les effets restaient à poser de toute façon). Le lien n'apparaît qu'à partir de la 2e animation posée (absent sur 007, présent sur 010). |
| L11 | [25] / #37 | 04:25 | Composer | VOC « Composant » | 0 | en-tête du panneau « Composant » et section « Composant · Chiffre clé » (012) | « il y a aussi le mot « Composant » que je ne comprends pas » | — | Ignoré, sans effet ; la section n'est jamais ouverte. |
| L12 | [25] / #37 | 04:25 | Composer | SAT | — | ligne « Ses voisins » avec « Chacun à part » et texte d'aide (012) | « Ça m'intéresse beaucoup. » | — | Elle relie spontanément « les 3 éléments un à un » à la demande « l'un après l'autre ». |
| L13 | [25]–[26] / #37–#39 | 04:12–04:38 | Composer | HES | 1 | texte d'aide gris sous « Ses voisins » (012, lu sur 013) | « Mais c'est écrit tout petit » ; « J'agrandis la zone autour de « Ses voisins » pour lire ce petit texte. » | lisibilité (capture à 55 % de l'écran) ; PERC non attesté (lisible à la loupe) | Deux actions sans modification (capture puis loupe) : HES au sens strict, conforme à la persona (« agrandit souvent les petits textes »). Coût 2 actions. Candidat « amplifié par le dispositif » (A1). |
| L14 | [26] / #39 | 04:38 | Composer | DEC | — | loupe 013 : « Ses voisins » — « Chacun à part » — « Avec « Couverts », « Producteurs » dans le groupe « Chiffres » : les 3 éléments un à un. » — « Régler sur « Chiffres » » | « Donc il y a bien moyen de les faire un à un. » | — | Fonction du lot 8 trouvée et comprise depuis un chiffre. « Régler sur « Chiffres » » est lu, jamais cliqué. La liste « Ses voisins » ne sera jamais ouverte (L21). |
| L15 | [30] / #45 | 05:19 | Régler | VOC « Délai » | 3 | ligne « Délai » avec champ « 0 ms » (015, 016, 017) | « Et « Délai », je ne vois pas bien ce que ça vient faire. » ; à [38] : « Le mot « délai » je ne le comprends pas » | — | Jamais touché. Pour des lancements séparés, un délai croissant par élément aurait satisfait C3 (départs mesurés section entrant d'un coup) ; l'avertissement de la scène emploie le mot (« chaque délai se compte… »). Contribue à C3 non rempli sans en être l'origine (L7) : gravité 3. Déclaratif T4-a : « je ne saurais pas quoi taper dedans ». |
| L16 | [30] / #45 | 05:19 | Choisir | DEC + SAT | — | ligne « Pareil pour « Couverts » et « Producteurs » » sous « Apparition » (015) | « ça doit mettre le même effet sur les deux autres chiffres, ça m'arrange » | — | Comprise avant l'essai, utilisée à [31] (v5) ; le résumé de 016 confirme le résultat, ce qu'elle vérifie. |
| L17 | [30] / #45 | 05:19 | Lancer | DEC + SAT | — | ligne « Rejouer : une seule fois / à chaque passage » et phrase de résumé « Quand « Années » entre dans l'écran : montée avec rebond en 800 ms, une seule fois » (015) | « Ça, c'est exactement ce qu'Aurèle demande, qu'elle recommence. » | — | Trouvée sans la chercher (le panneau du chiffre l'affiche sous le pli, et le bloc « Animation » est ici en haut du panneau). Utilisée à [34] (v6). Elle n'est visible pour aucun des trois autres éléments (007, 020 : panneau coupé sous « Démarre »), et n'y sera jamais réglée : cause directe de C6 non rempli (voir problème 5). |
| L18 | [31] / #47 | 05:21 (09:23:04) | Composer | — (repère) | — | — | journal v5 « Apparition · pareil pour les 2 suivants » | — | Non codé : réussite de C3b par cette seule action (0 / 120 / 240 ms), constatée à [33] : « La ligne « Pareil pour… » a disparu, donc ça a marché ». |
| L19 | [32] / #48 | 05:27 | Composer | ERR (non récupérée) | 2 | liste « Ses voisins » (« Chacun à part ») ; clic à (726, 178), position de la liste sur 015 ; sur 016 la ligne « Pareil pour » a disparu et la liste est remontée vers y ≈ 158, entourée de bleu, sans menu ouvert | « La liste « Ses voisins » ne s'est pas ouverte, elle est juste entourée de bleu. Tant pis, je vais d'abord faire le plus important. » | PERS ? (agit sans capture entre [31] et [32], alors que la persona « lit tout, lentement ») ; perception : le déplacement de la ligne entre les deux clics n'était pas visible sans capture | Intention annoncée (« voir s'il y a un choix « l'un après l'autre » ») contredite par 016. Hypothèse d'observateur, invérifiable : le clic a atteint le texte d'aide sous la liste, qui donne le focus sans ouvrir le menu. Non récupérée : « Ses voisins » n'est plus jamais tenté. Coût 2 actions ([32], [33]) ; aucun critère touché (C3b déjà obtenu par v5). Candidat artefact (A1 : oui). |
| L20 | [34] / #51 | 05:52 (09:23:36) | Lancer | — (repère) | — | bouton « à chaque passage » de la ligne « Rejouer » (016) | journal v6 « Apparition · à chaque passage » (nœud rh_stat1) | — | Non codé : réglage juste pour les chiffres ; les trois autres déclencheurs restent « une seule fois » (C6). Elle le sait à [40] : « je ne l'ai coché que sur les chiffres ; je ne sais pas si les autres recommenceront ». |
| L21 | [35] / #52 | 06:14 | Composer | DEC | — | phrase de résumé sous « Rejouer » (loupe 017) : « Quand « Années » entre dans l'écran : « Années » (montée avec rebond) en 800 ms, « Couverts » … de 120 à 920 ms et « Producteurs » … de 240 à 1 040 ms (1 s), à chaque passage. » | « la phrase dit que les trois chiffres arrivent à 0, puis 120, puis 240, l'un après l'autre. Ça, c'est fait. Mais je n'ai rien réglé pour que la photo, le titre et le paragraphe arrivent chacun leur tour, et je crois qu'ils vont tous arriver en même temps. » | sur 017, une infobulle « à chaque passage » (état de survol figé après le clic) masque une partie de la phrase | Elle découvre par la lecture que « Pareil pour » a produit l'échelonnement. Son attente (« tous en même temps ») est exacte, confirmée par 018 : pas de MM. Point de bascule vers l'étape Composer. |
| L22 | [36]–[37] / #54–#55 | 06:17–06:43 | Vérifier | VERIF-E (rang 36) | — | clic « Voir la scène de « La maison » » (016, y ≈ 118) → panneau de la section « La maison · Boîte », bloc « Animation » avec « Scène » : six barres bleues « Photo de la salle 0 → 700 ms », « Titre 2 « Une cuis… 0 → 700 ms », « Paragraphe « Aur… 0 → 700 ms », « Années 0 → 800 ms », « Couverts 120 → 920 ms », « Producteurs 240 → 1 040 ms » (018) | « Les quatre premières barres commencent toutes au même endroit, donc la photo, le titre et le paragraphe vont arriver tous ensemble. Ce n'est pas ce qu'Aurèle veut. » | — | Vérification dans l'éditeur, sur une représentation statique du minutage, pas sur la page : VERIF-E avec hésitation (ce n'est pas la « vue d'édition » de la page). Lecture exacte du site. Fonction du lot 8 (vue « Scène » et lien) trouvée et utilisée. |
| L23 | [37]–[38] / #55–#57 | 06:22–07:02 | Composer | HES | 1 | petit texte orange sous les barres de la scène (018, lu sur 019) | « Il y a un petit texte en dessous, je le lis. » ; « J'agrandis le texte sous les barres pour comprendre comment les faire arriver l'un après l'autre. » | lisibilité (capture réduite) | Capture puis loupe, sans modification : HES au sens strict, conforme à la persona. Coût 2 actions sur les 4 restantes. |
| L24 | [38] / #57 | 07:02 | Composer | DEC | — | loupe 019 : « 4 lancements séparés : chaque délai se compte depuis l'entrée à l'écran de son propre élément, pas depuis le début de la scène. Pour une seule scène, faites démarrer chaque élément « après » le précédent, ou « quand « La maison » entre dans l'écran ». » ; au-dessus : « Tout est fini à 1 040 ms (1 s) après le dernier lancement. » | « « faites démarrer chaque élément après le précédent », ça oui. Donc il faut que je reprenne chaque élément un par un pour lui dire de démarrer après celui d'avant. » | — | L'avertissement « lancements séparés » est lu et compris (chemin « après »). L'avertissement « part avant » n'apparaît sur aucune capture. Le « (1 s) » est la seule conversion en secondes qu'elle lira (T4-R, D-FIN-3). |
| L25 | [38] / #57 | 07:02 | Composer | FRU | — | même endroit (019) | « C'est long, et je commence à trouver ça compliqué. » | — | Agacement déclaré 3 à [40] (pas de FRU par la règle des 4–5). |
| L26 | [39]–[40] / #59–#60 | 07:04–07:25 | Composer | — (repère) | — | titre resélectionné ; panneau : « Fondu en montan… », « + 1 animation », « Pareil pour « Chiffres » », « Vitesse 700 ms », « Démarre : quand il entre dans l'écran » coupé en bas (020) | « Tout en bas je vois « Démarre : quand il entre dans l'écran », mais c'est coupé et je n'ai plus le droit de continuer. » | — | Non codé : dernière action, en direction du bon contrôle (L7), sans l'ouvrir. |
| L27 | [40] / #60 | 07:11–08:06 | Composer | BUD | 4 | — | participant : « FIN : budget · ACTIONS : 40 » ; modérateur (08:06) : « Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. » | budget : 20 des 40 actions sont des captures ou des loupes ; la participante connaît le plafond (« je n'ai plus le droit de continuer ») | Statut E (C2, C3, C4, C6). Chaîne : L7 (« Démarre » jamais ouvert) → quatre lancements séparés → constat à [35]–[38] → plus de budget. Gravité 4 portée par l'origine L7 ; la ligne BUD la reçoit aussi comme mode de fin. Amplification par le dispositif : chaque contrôle visuel coûte une action (A1, voir problème 1). |
| L28 | [40] / #60 | 07:25 | Choisir | SAT | — | — | « Ça, j'en suis assez contente, et les noms des effets sont clairs, ce sont des mots de tous les jours. » | — | Bilan spontané avant les questions : la partie « Choisir » est perçue réussie. |
| L29 | [40] / #60 | 07:25 | Composer | FRU | — | — | « Je ne peux pas rendre ça à Aurèle comme ça, ce n'est pas la petite scène qu'elle demande. » | — | Conscience de l'échec avant la question T4-R (échec lucide). |
| L30 | [13] / #20 (et [30] / #45) | 02:54 (05:19) | Vérifier | RATE | 1 | bouton « Voir l'effet » à droite d'« Apparition » (007, 015, 020) ; lien « Tester sur le site » en bas du bloc (005, 012, 015, 016, 018) | capture 007 ; déclaratif D-FIN-10 : « Il y avait « Voir l'effet » et « Tester sur le site », je n'ai pas eu le temps. » | PERC (déclaratif : « je n'ai jamais rien vu bouger ») ; dans le dispositif, « Voir l'effet » n'aurait montré aucun mouvement sur une capture | Accès visibles, lus, jamais utilisés ; aucun VERIF de la séance. Gravité 1 (aucun coût d'action ; hésitation avec 0). Artefact probable pour la partie « voir bouger » (A1) ; l'absence de « Tester sur le site » reste un fait de comportement. |

---

## 4. Codes déclaratifs (réponses et débriefing), marqués « déclaratif »

| D | Source | Étape | Code | Citation | Commentaire |
|---|---|---|---|---|---|
| D1 | T4-SEQ (08:17) | Découvrir / Choisir | SAT — déclaratif | « Le début a été facile, j'ai trouvé tout de suite le mot « Animation » et la liste d'effets était dans ma langue. » | Corrobore L1, L3, L8. |
| D2 | T4-SEQ | Composer | FRU — déclaratif | « dès qu'il a fallu que les choses arrivent l'une après l'autre, ça s'est compliqué, et je n'y suis pas arrivée. » | Note 3. |
| D3 | T4-R (08:17) | Composer | FRU — déclaratif | « Ça ne raconte rien, c'est juste tout qui apparaît en même temps. » ; « elle va me dire que ce n'est pas ce qu'elle avait demandé, et elle aura raison. » | Récit fidèle au site (2.4). |
| D4 | T4-R | Régler | VOC « ms » — déclaratif (déjà compté L4) | « Si 1 040 ms c'est une seconde, alors tout est fini en une seconde … ça je viens de le deviner en lisant, personne ne me l'a dit en secondes. » | La conversion vient du « (1 s) » de 019. |
| D5 | T4-a (08:44) | Régler | VOC « Délai » — déclaratif (déjà compté L15) | « « délai » pour moi c'est une date limite, un délai de paiement, alors je ne vois pas ce que ça fait là, et je ne saurais pas quoi taper dedans. » | Sens attendu par la fiche persona ; le mot n'a pas été deviné pendant la tâche. |
| D6 | T4-a | Régler | VAL− — déclaratif | « je taperais un chiffre au hasard, je regarderais, et si c'était laid je ferais Ctrl+Z. C'est ça ma méthode, et ce n'est pas très rassurant quand c'est le site d'une amie. » | Risque perçu, lié à « ms » et « Délai ». |
| D7 | T4-b (08:44) | Composer / Vérifier | FRU — déclaratif | « Tout est écrit très petit, j'ai dû agrandir trois ou quatre fois … c'est justement dans ces petites phrases qu'il y a les renseignements importants » ; « Si je ne l'avais pas agrandie, je serais partie en croyant que c'était fini. » | 3 loupes en fait. Corrobore L13, L23 ; dispositif : capture réduite. |
| D8 | T4-b | Composer | FRU — déclaratif | « Quatre fois la même promenade dans le même panneau. Et à la fin, comme chacun est réglé dans son coin, personne ne s'occupe de l'ordre entre eux. … je n'ai trouvé nulle part où dire ça d'un seul coup. » | Corrobore L7, L27 (problème 1). |
| D9 | T4-b | Vérifier | SAT — déclaratif | « Le petit tableau avec les barres bleues, lui, montrait très bien le problème ; c'est ce que j'ai le mieux compris de toute la séance. » | Corrobore L22. |
| D10 | T4-b | Composer | VAL− — déclaratif | « Mais il ne sert qu'à regarder, je n'ai pas vu comment déplacer une barre. » | Croyance non testée : aucun glissement ni clic sur une barre pendant la tâche ; les captures 018/019 ne montrent aucune poignée. Ne fonde pas seule un problème (11.4). |
| D11 | D-FIN-1 (09:37) | Découvrir / Choisir | SAT + VAL+ — déclaratif | « ce n'est pas si méchant que je craignais … j'ai choisi « Glissé depuis la gauche » dans une liste, comme dans PowerPoint. Ça, je le raconterais avec plaisir. » | Valeur pour un effet isolé. |
| D12 | D-FIN-1 | Composer | VAL− — déclaratif | « ça se laisse faire pour un effet, mais dès qu'il faut en enchaîner plusieurs, appelle ton neveu. » | Limite nette de la valeur au public débutant pour la composition. |
| D13 | D-FIN-2 | Choisir / Lancer | SAT — déclaratif | « La liste des effets, sans hésiter … il y en a peu, on lit la liste en entier. Et « Démarre : quand il entre dans l'écran », ça aussi c'était clair » | |
| D14 | D-FIN-2 | Vérifier | VAL+ — déclaratif | « [les barres bleues] C'est la seule chose qui m'ait dit la vérité sur ce que le visiteur allait voir. » | |
| D15 | D-FIN-2 | Choisir | SAT — déclaratif | « « Pareil pour « Couverts » et « Producteurs » » : un clic, les deux autres chiffres réglés, ça m'a évité de recommencer deux fois. » | Corrobore L16, L18. |
| D16 | D-FIN-3 | Régler | FRU — déclaratif | « Les « ms ». Tout est en ms, et moi je compte en secondes. On m'a demandé deux secondes et demie et je n'ai jamais pu vérifier si j'y étais. … pourquoi ce n'est pas écrit en secondes partout ? » | |
| D17 | D-FIN-3 | Régler | FRU — déclaratif | « « Délai ». … je suppose que ça veut dire l'attente avant que ça parte, mais je ne l'ai compris qu'en devinant, et je n'ai pas osé y toucher. » | Le sens juste est deviné après coup seulement. |
| D18 | D-FIN-3 | Composer | FRU + VAL− — déclaratif | « il n'y a pas d'endroit où dire « d'abord ça, ensuite ça ». J'ai cherché un endroit où voir toute la partie « La maison » avec mes quatre morceaux et les mettre dans l'ordre, comme le volet d'animation de PowerPoint » | Modèle mental attendu (persona) ; aucune recherche d'un tel endroit n'est visible dans les actions avant [36]. |
| D19 | D-FIN-3 | Découvrir | VOC « instance » — déclaratif | « il y a des mots qui ne me parlent pas du tout, « survol », « composant », « instance ». Ceux-là j'ai fait comme si je ne les avais pas vus. » | « instance » visible sur 012 (« 3 instances dans le site »), jamais commenté pendant la tâche. |
| D20 | D-FIN-10 (11:00) | Vérifier | FRU — déclaratif, PERC | « je n'ai jamais rien vu bouger. … Là j'ai travaillé à l'aveugle, sur des mots. » | Limite du dispositif reconnue par la participante elle-même (« Dans PowerPoint, je clique sur l'effet et il se joue devant moi tout de suite ») ; voir L30. |
| D21 | D-FIN-10 | Composer | VAL− — déclaratif | « l'outil, lui, ne parle que d'un élément à la fois. … Tout est là, il manque juste l'endroit où dire l'ordre. » | |
| D22 | D-FIN-10 | Vérifier | SAT + VAL+ — déclaratif | « à aucun moment je n'ai eu peur d'avoir cassé quelque chose. … il y avait « v1, v2, v3 » en haut qui montait, et une petite pastille « + 1 animation » » | Corrobore [13] et [20] (elle a lu « v2 » sur 010 comme preuve que le titre avait gardé son effet). Aucun Ctrl+Z de la séance. |
| D23 | D-FIN-10 | Composer | FRU — déclaratif, PERC partiel | « agrandissez les caractères. … ce sont ces phrases-là qui contenaient tout ce qu'il fallait savoir. » | |
| D24 | D-FIN-10 | — | FRU — déclaratif | « J'ai juste l'impression d'avoir laissé le travail à moitié fait, et ça ne me plaît pas beaucoup » | |
| D25 | clôture (11:51) | — | SAT — déclaratif | « le reste, franchement, m'a plutôt plu. » | |

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

**Problème 1 · L'ordre entre les éléments ne se règle qu'élément par élément, derrière une liste « Démarre » dont la valeur par défaut satisfait la lecture.**
- Endroit : ligne « Démarre » (valeur « quand il entre dans l'écran ») du bloc « Animation » de chaque élément (007, 015, 016, 020) ; ligne « Délai » (015).
- Étape : Composer (et Lancer pour la valeur par défaut).
- Cause apparente : l'événement unique et l'ordre (C2, C3) supposent d'ouvrir « Démarre » sur chacun des éléments suivants et d'y choisir « après … » ou « quand « La maison » entre dans l'écran » (chemin connu seulement par l'avertissement 019) ; la valeur affichée par défaut répond déjà à « quand le visiteur arrive dessus » et n'invite pas à l'ouvrir ; le seul autre chemin, « Délai », porte un mot que la persona lit comme « échéance ». Le tout coûte un aller-retour par élément.
- Gravité maximale : 4 (échec, BUD).
- Lignes : L7 (RATE 4), L15 (VOC Délai 3), L10 (RATE 2), L24 (DEC), L25, L27 (BUD 4), L29 ; déclaratif D8, D12, D18, D21.
- Test d'artefact : A1 non pour la substance (voir le mouvement en continu n'aurait pas montré l'ordre absent avant la scène ; la scène statique l'a montré) ; oui pour le coût en actions (20 captures et loupes sur 40 : sans capture obligatoire, le budget aurait permis d'essayer « Démarre » au moins une fois) → **problème d'interface, amplifié par le dispositif sur le coût**, à confirmer avec des utilisateurs réels. A2 : aucun CONN ; PERS non (les sauts de capture de L9 ne créent pas le problème). A6 : aucun MOD avant. A8 : aucun HALL.

**Problème 2 · Les durées et le minutage ne sont exprimés qu'en « ms », mot inconnu du public débutant ; la cible « deux secondes et demie » n'a jamais pu être lue ni visée.**
- Endroit : champ « 700 ms » / « 800 ms » de la ligne « Vitesse » (007, 015), champ « 0 ms » de « Délai », phrases de résumé (017), barres de la scène « 0 → 700 ms » (018) ; seule exception « (1 s) » (017, 019).
- Étape : Régler.
- Cause apparente : unité unique en millisecondes ; la seule conversion visible est la parenthèse « (1 s) » du total, que la participante a effectivement utilisée dans son récit.
- Gravité maximale : 3 (C4 non rempli, co-cause avec l'absence d'enchaînement).
- Lignes : L4 ; déclaratif D4, D6, D16.
- Test d'artefact : A1 non (unité affichée à l'écran, lisible). A2 : ignorance prévue par la fiche persona, pas un écart (PERS non). → **problème d'interface**, public débutant, une participante (retenu par la gravité 3 si confirmé).

**Problème 3 · « Délai » lu comme « date limite » : le champ n'est jamais touché, ni compris pendant la tâche.**
- Endroit : ligne « Délai » (015, 016, 017) et le mot dans l'avertissement orange (019).
- Étape : Régler.
- Cause apparente : libellé polysémique pour ce public ; aucune formulation de rechange visible (« attente avant le départ ») sur les captures.
- Gravité maximale : 3 (contribue à C3 non rempli).
- Lignes : L15 ; déclaratif D5, D17.
- Test d'artefact : A1 non. A2 : sens « échéance » prévu par la fiche (pas un écart). → **problème d'interface**, public débutant. Peut être regroupé avec le problème 1 (même chaîne) ou le problème 2 (même ligne de réglage) au regroupement des cinq séances.

**Problème 4 · Les renseignements décisifs sont dans de petits textes gris ou orange, lus seulement à la loupe.**
- Endroit : texte d'aide sous « Ses voisins » (012/013), phrase de résumé sous « Rejouer » (015/017), avertissement sous les barres de la scène (018/019).
- Étape : Composer, Vérifier.
- Cause apparente : taille et contraste des textes d'aide ; sur les captures à 55 %, ils ne sont lisibles qu'agrandis.
- Gravité maximale : 1 (2 HES de 2 actions chacune), 6 actions au total ([25]–[26], [37]–[38], plus la loupe [35]).
- Lignes : L13, L23, L21 (loupe 017) ; déclaratif D7, D23.
- Test d'artefact : A1 oui en partie (écran à pleine résolution) ; l'interface n'offre pas d'autre représentation de ces informations → **problème d'interface amplifié par le dispositif**, gravité réduite à 0–1 ; à confirmer avec des utilisateurs réels (la persona a 56 ans et agrandit par habitude).

**Problème 5 · « Rejouer : à chaque passage » est un réglage par élément, visible sous le pli pour la photo, le titre et le paragraphe : la scène ne se rejoue que pour les chiffres.**
- Endroit : ligne « Rejouer » (015, 016, 017) ; absente des captures du panneau de la photo (007) et du titre (020), coupé sous « Démarre ».
- Étape : Lancer.
- Cause apparente : la répétition se règle déclencheur par déclencheur ; pour trois des quatre déclencheurs, la ligne n'a jamais été à l'écran (panneau coupé, pas de défilement) ; la participante a réglé le seul qu'elle a vu et sait à [40] qu'elle n'a pas réglé les autres.
- Gravité maximale : 3 (C6 non rempli).
- Lignes : L17, L20, L26 (repère) ; déclaratif T4-R (« je suppose qu'ils ne se rejoueront pas »).
- Test d'artefact : A1 non. A2 : la persona « ne fait défiler un panneau que s'il est visiblement coupé » — le panneau de 007 est coupé sous « Démarre » et elle ne l'a pas fait défiler, mais rien n'oblige la persona à le faire à chaque fois (PERS non). → **problème d'interface**, même cause de fond que le problème 1 (réglage par élément, pas de réglage au niveau de la scène) ; à regrouper au niveau des cinq séances si la cause est jugée identique.

**Problème 6 · La vue « Scène » diagnostique juste, mais elle est trouvée tard et n'offre aucune prise visible sur les barres.**
- Endroit : lien « Voir la scène de « La maison » » (010, 012, 015, 016) ; bloc « Scène » du panneau de la section (018/019).
- Étape : Vérifier, Composer.
- Cause apparente : le lien n'apparaît qu'à partir de la deuxième animation et se lit comme une consultation ; les barres n'ont pas de poignée visible ; l'avertissement renvoie vers chaque élément.
- Gravité maximale : 2 (L10).
- Lignes : L10 (RATE 2), L22 (VERIF-E), L23, L24 (DEC) ; déclaratif D9, D10, D14.
- Test d'artefact : A1 non. A8 : aucun HALL (barres et texte vérifiés sur 018/019). Le volet « ne sert qu'à regarder » (D10) est déclaratif et non testé : il ne peut pas fonder seul un problème ; seul le retard d'ouverture (L10) est un comportement. → **problème d'interface** de gravité 2 pour la découverte ; signal faible pour la manipulation des barres.

**Signal faible A · Décalage de mise en page après « Pareil pour » : la ligne disparaît, le clic suivant tombe à côté, la liste « Ses voisins » ne s'ouvre pas et n'est plus jamais tentée.**
- Endroit : bloc « Animation » du chiffre (015 → 016). Étape : Composer. Gravité 2 (L19, ERR non récupérée, 2 actions).
- Test d'artefact : A1 oui (avec une perception continue, la participante aurait vu la ligne disparaître avant de cliquer ; l'état réel était visible dès la capture suivante) → **artefact probable**, signal faible. Le saut de mise en page lui-même reste à vérifier chez d'autres participants.

**Signal faible B · Aucun retour visuel du mouvement pendant toute la séance ; « Voir l'effet » et « Tester sur le site » jamais utilisés.**
- Endroit : « Voir l'effet » (007, 015, 020), « Tester sur le site » (005, 012, 015, 016, 018). Étape : Vérifier. Gravité 1 (L30).
- Test d'artefact : A1 oui, PERC déclaré (D20) : les captures ne peuvent pas montrer un mouvement → **artefact probable** pour « je n'ai jamais rien vu bouger » ; l'absence de toute vérification visiteur (aucun VERIF) reste un fait de comportement à rapporter dans la matrice.

---

## 6. Écarts au protocole et au dispositif, limites de lecture

- **MOD.** Aucune parole hors script pendant la tâche ; aucune aide, aucun blocage. Après la tâche, les questions sont groupées dans un même message (T4-SEQ avec T4-R ; T4-a avec T4-b ; D-FIN-1, 2 et 3 ensemble) au lieu d'être posées une à une avec « Merci. » entre chacune (4.3.D, 4.3.G, section 7) : écart de forme, gravité 0, postérieur à la tâche, sans effet sur le codage. Le débriefing réduit à D-FIN-1, 2, 3 et 10 est conforme à l'addendum 5. Chaque message du modérateur est enveloppé par le dispositif d'une phrase en anglais (« The coordinator sent a message while you were working … Address this before completing your current task. ») qui n'est pas du script ; pas d'effet observé. La phrase d'arrêt est venue après l'annonce « ACTIONS : 40 » de la participante (addendum 5, point 5).
- **HORS.** Aucune. L'en-tête de la trace signale « lecture prompt5-p1.md » (#1, 00:03) : c'est la lecture de sa propre consigne, demandée par le message d'ouverture, avant la mission ; ni code, ni documentation, ni inspection de la page.
- **PERS.** Aucun écart ferme. Manière d'explorer respectée : cherche « Animation », lit les libellés, agrandit trois fois, ne clique aucune icône sans texte, fait défiler le panneau une seule fois après avoir dit qu'il est coupé ([8]), aucun clic droit ni double-clic, aucun Ctrl+Z (aucun changement non compris n'est apparu). Règle des 8 actions sans progrès jamais atteinte (progrès visible au moins toutes les 5 actions jusqu'à [34], puis scène à [36]). Point à signaler : à trois reprises ([18]→[19], [23]→[24], [31]→[32]) elle enchaîne un clic sans capture, donc sans « dire ce que vous voyez » (consigne d'incarnation, règle 4) ; économie d'actions plausible sous budget connu, marquée « PERS ? » sur L19 seulement, où elle a eu une conséquence.
- **CONN.** Aucun terme de la liste « vocabulaire inconnu » employé sans l'avoir lu à l'écran (« ms », « délai », « survol », « composant », « instance » sont tous cités comme lus, et tous vérifiés sur les captures) ; aucun emplacement anticipé sans indice visible (le clic sur « Animation » suit la lecture du libellé sur 003 ; « Voir la scène » suit 010). La conversion « 1 040 ms = 1 s » vient du « (1 s) » de 019, dit explicitement.
- **PERC.** Aucune difficulté explicitement rapportée à la perception pendant la tâche ; en débriefing seulement (D20, D23). L'infobulle « à chaque passage » figée sur la loupe 017 masque une partie de la phrase de résumé (état de survol conservé après le clic) : sans effet, la participante a lu le reste.
- **HALL.** Aucune. Toutes les descriptions ont été confrontées aux captures citées : onglet « Animation » (001), section « La maison » et chiffres 12 / 38 / 14 (002), panneau « Photo de la salle » et entrée « Animation » (003), phrase d'aide et « Apparition : Aucune » (004), trois lignes et deux liens (005), les dix choix de la liste (006), « Glissé depuis la g… », « + 1 animation », « Pareil pour « Texte » », « 700 ms », « Démarre » (007), titre pris (008), « v2 » et « Voir la scène » (010), « Ses voisins », « Chacun à part », « Composant » (012, 013), « Pareil pour « Couverts » et « Producteurs » », « Rejouer », « Délai » (015), liste entourée de bleu sans menu (016), « à chaque passage » actif (017), six barres et leurs valeurs (018), texte orange mot pour mot (019), titre pris avec « Démarre » coupé (020). Les suppositions sont présentées comme telles (« je crois qu'ils vont tous arriver en même temps », « je suppose qu'ils ne se rejoueront pas »).
- **Dispositif, compte d'actions.** 20 des 40 actions sont des captures ou des loupes, conformément à 9.2 ; c'est la première cause d'épuisement du budget et elle pèse sur le test d'artefact du problème 1. La participante connaît le plafond de 40 et l'a intégré à sa stratégie de fin (« je n'ai plus le temps de reprendre chaque élément », [40]).
- **Préparation (A5).** Capture 001 : « Enregistré · v0 », aucune pastille d'animation visible ; fiche : version 0, conforme à la copie de référence. Réserve A5 de l'addendum maintenue, je n'ai pas d'autre moyen de vérification.
- **Limites de ma lecture.**
  - Le contenu de la liste « Démarre » n'est connu que par l'avertissement 019 ; elle n'a jamais été déroulée : la gravité 4 de L7 repose sur cette seule source.
  - Je ne peux pas dire si les barres de la scène sont manipulables (aucune tentative, aucune poignée visible sur 018/019).
  - La cause du clic manqué de L19 (texte d'aide sous la liste ?) est une hypothèse.
  - Certains libellés sont tronqués sur les captures (« Quand la souri… », « Glissé depuis la g… », « Fondu en montan… », « Titre 2 « Une cuis… ») ; la participante les a lus tronqués aussi.
  - Le « Rapport pour le coordinateur » écrit par le participant après la clôture (11:51) est hors persona (résumé du modèle) ; il n'a servi ni de source ni de preuve.
  - Deux HES possibles n'ont pas été codées : [1]–[3] (capture, défilement de la page, capture) et [7]–[9] (capture, défilement du panneau, capture), parce que chaque défilement révélait un nouvel endroit (la section, le bas du bloc « Animation »).
