# Observation · P3 (Karim, débutant pressé) · vague 5 · T4 seule, position 1

Observateur indépendant, sans les hypothèses. Sources lues : protocole (version observateur, sections 3, 4.3, 4.4, 5, 8, 9, 11), addendum 5, trace brute `traces5/trace-p3.md`, `shots5/p3-t4/log.jsonl`, les 18 captures `001` à `018` (aucune loupe n'existe : le participant n'en a fait aucune), fiche `fiches5/fiche-lecture-p3.md`. Horodatages : ceux de la trace (relatifs au début de séance) ; le journal du site est en UTC (09:20:16 → 09:26:29) ; correspondance approximative : trace 01:06 ≈ 09:18:58 UTC.

## 1. Résumé de la séance

- T4 reçue en première position (addendum 5), à froid, sans mission préalable. Le participant descend jusqu'à « La maison » (capture 002), clique la photo, ouvre le libellé « Animation » en bas du panneau droit (003 → 004), puis pose un choix d'« Apparition » sur chacun des six éléments, un par un, toujours par le même chemin (clic sur l'élément, clic sur le menu « Apparition », clic sur un effet) : photo « Glissé depuis la droite » (v1), titre « Fondu » (v2, alors qu'il annonce « Fondu en montant »), paragraphe « Fondu » (v3), chiffres « Montée avec rebond » (v4, v5, v6).
- Il ouvre une fois la liste « Ses voisins » (« Chacun à part ») sur le chiffre 12 (016), n'y voit « rien qui dit "l'un après l'autre" », la referme et répète l'effet sur les deux autres chiffres.
- Il lit à voix haute, sur la capture 015, « Démarre quand il entre dans l'écran », « Délai » à 0 et « Rejouer : une seule fois / à chaque passage », puis « je laisse comme c'est ». Il ne lit ni ne clique le lien « Voir la scène de « La maison » » visible sur toutes les captures de panneau à partir de 009, ni « Voir l'effet », « Tester sur le site », « Ouvrir dans le mode Animation », ni le bouton « Aperçu ».
- Fin au budget : à sa 40e action il dit « je m'arrête là » ; le modérateur applique l'arrêt. Aucun blocage déclaré, aucune aide. Aucune vérification, ni dans l'éditeur ni comme visiteur ; les trois dernières actions sont faites sans capture.
- Site enregistré : six déclencheurs séparés « quand il entre dans l'écran », une seule fois, retard 0, durées 700 à 800 ms ; aucune scène, aucun ordre, aucun rejeu. Statut : échec, profil C1 seul. Récit du visiteur concordant (6/8), sans écart matériel : il sait qu'il n'a réglé ni l'ordre ni le rejeu.
- SEQ 3. Agacement déclaré maximal : 3.

## 2. La tâche T4 (position 1)

### Statut (9.1) et profil de critères (section 5)

Lecture du site enregistré (fiche, version 6) :

| Critère | Lecture | Rempli |
|---|---|---|
| C1 tous bougent | photo opacité 0 + translateX 40 px ; titre opacité 0 ; paragraphe opacité 0 ; trois chiffres opacité 0 + translateY 28 px ; tous reviennent à `transform: none`, opacité 1 | oui |
| C2 un seul événement | six déclencheurs `on=inView`, chacun sur son propre élément (rh_about_img, rh_about_h2, rh_about_p, rh_stat1, rh_stat2, rh_stat3) | non |
| C3 ordre principal | tous partent à 0 ms de leur propre entrée ; visite du préparateur : « tous 0 → ~700/880 ensemble » ; aucun écart ≥ 80 ms | non |
| C3b chiffres échelonnés | trois départs à 0, aucun écart | non |
| C4 minutage | fin du dernier mouvement vers 800 ms (< 1 800 ms) | non |
| C5 manières | photo ≥ 16 px horizontal : oui (40 px) ; titre décalage bas ≥ 8 px : **non** (fondu seul) ; paragraphe : oui ; chiffres courbe à dépassement : oui (`cubic-bezier(.34,1.56,.64,1)`, y2 > 1) | non (titre) |
| C6 répétition | « une seule fois » sur les six | non |

- C3 non rempli → **échec** par définition ; cinq critères non remplis parmi C2 à C6 confirment. Fin du dernier mouvement ≤ 4 500 ms (sans effet sur le statut).
- **Statut : E.** Profil : **C1 seul**. **Accord avec le préparateur** (E, mode BUD), pour la même lecture.
- Structure de lancement : lancements séparés, six déclencheurs à l'entrée de chaque élément, aucun retard, aucun « démarre après », aucune scène.

### Mode de fin, aides

- Mode de fin : **BUD** (budget). Le participant annonce lui-même « Je suis à 40, la limite, donc je m'arrête là » (08:45) ; le modérateur dit la phrase de budget (09:53). Ni « J'ai terminé », ni « J'abandonne », ni « Je suis bloqué ».
- Aides : aucune (niveau max 0, 0 aide).

### Métriques (9.2)

| Métrique | Valeur | Source |
|---|---|---|
| Actions totales, compte du participant | 40 ([1] à [40]) | trace |
| Appels d'outils de la tâche | 58 (#2 à #59), dont 18 ouvertures d'image 👁 (non comptées) → 40 commandes = 18 captures + 20 clics + 1 défilement + 1 touche | trace, log.jsonl (lignes 2 à 41 ; la ligne 1, capture à 09:17:38 UTC avant le début de séance, n'est pas une action du participant) |
| Actions perdues à cause des défauts du dispositif | 0 certaine ; 1 possible : l'action [16] (clic à y = 288 sur « Fondu » alors que « Fondu en montant » est à y ≈ 300 sur la capture 008, lignes de 12 px dans la capture réduite ; voir ERR) | captures 008, 009, journal v2 |
| Première action pertinente | **[4]** (#7, clic sur la photo, 01:34), suivie de la capture 003 ([5]) qui montre le libellé « Animation » sous l'élément sélectionné ; la première capture avec un contenu d'animation ouvert est 004 ([7]) ; première entrée du journal à [10] (v1, 09:20:16 UTC) | captures 003, 004, journal |
| Actions jusqu'à la réussite | non atteint (E) | journal |
| Temps | consigne à 00:58, arrêt annoncé à 08:45 (≈ 7 min 47 s) ; journal de 09:20:16 à 09:26:29 UTC | trace, journal |
| Captures / loupes | 18 / 0 | trace |
| FP / actions perdues | 0 FP au sens strict (la seule voie quittée, « Ses voisins », pouvait mener au but) ; 3 actions perdues dans ce détour ([30]–[32]) | codage L13 |
| HES | 0 (aucune suite de 2 actions sans nouvel endroit, aucune incertitude verbalisée sur l'action suivante ; le rythme clic-capture est constant) | codage |
| ERR | 1, **non récupérée** ([16] : « Fondu » au lieu de « Fondu en montant ») | L4 |
| COLL-D / COLL-ND | 0 / 0 (le journal ne touche que les six éléments visés) | journal |
| RATE | 7 (L3, L5, L6, L8, L11, L12, L14) | codage |
| Aides | 0 | trace |
| VERIF / VERIF-E | aucun ; « Voir l'effet » (006, 009, 012, 015), « Tester sur le site » (007, 010, 013, 015, 017), « Aperçu » (toutes) jamais utilisés | captures |
| VOC | 1 : « Ses voisins » / « Chacun à part » (interprétation « pour faire arriver les chiffres l'un après l'autre » puis abandon ; D-FIN-3 « je voyais pas la différence entre les deux ») | L13, déclaratif |
| SEQ | 3 | T4-SEQ |
| Concordance du récit | 6/8, pas d'écart matériel | ci-dessous |
| Agacement déclaré | 2 (à 20 actions), 3 (à 40) | trace 05:17, 08:45 |

### Concordance du récit T4-R (9.4)

Récit (10:05) : « la photo devrait glisser depuis le côté, le titre et le texte devraient apparaître en fondu, et les trois chiffres devraient monter avec un petit rebond. […] j'ai juste mis la même animation partout, j'ai pas réglé qui passe avant qui. […] je pense que ça va jouer qu'une fois, genre au premier chargement de la page, et plus après. »

| Dimension | Score | Fait du site |
|---|---|---|
| Quoi | 2 | les six éléments cités (photo, titre, texte, trois chiffres), aucun en trop ; site : exactement ces six |
| Quand | 1 | ordre : « j'ai pas réglé qui passe avant qui » — exact (aucun ordre enregistré) ; moment : « genre au premier chargement de la page » — vague et hésitant ; site : à l'entrée de chaque élément dans l'écran, une seule fois. Compatible pour un visiteur qui descend une fois ; pas exact. Hésitation : un second codeur pourrait lire « au premier chargement » comme une affirmation fausse sur le moment ; je retiens la formulation hésitante (« je pense », « genre ») et le fait qu'il a lu « Démarre quand il entre dans l'écran » à 06:55 |
| Comment | 2 | « glisser depuis le côté » = translateX 40 px ; « fondu » = opacité seule sur titre et paragraphe (il décrit ce qu'il a obtenu, pas ce qu'il visait) ; « monter avec un petit rebond » = translateY 28 px + courbe à dépassement |
| Combien | 1 | nombre de fois « qu'une fois » : exact ; durée : absente |
| **Total** | **6/8** | **écart matériel : non** |

Lucidité : « Si Aurèle regarde ça, elle va sûrement dire que c'est pas ce qu'elle a demandé. » Case de la matrice : échec lucide.

### Mesures propres (section 5)

- Profil de critères : C1 seul.
- Structure de lancement : lancements séparés (six déclencheurs « quand il entre dans l'écran », retard 0, une seule fois).
- T4-a : « Je cliquerais sur le paragraphe, j'irais rouvrir la partie « Animation » […] un genre de « Délai ». Je chercherais un champ pareil pour le paragraphe, et j'essaierais de baisser le chiffre » — **cohérente avec la structure enregistrée** (chaque élément a son propre bloc de réglages avec un champ « Délai », vu sur 015 pour le chiffre 12). Réserve : le délai du paragraphe est déjà à 0, la réponse ne pourrait donc rien produire ; il ne l'a pas vu pour le paragraphe (captures 010 à 012 s'arrêtent avant « Délai »). Pas de MM.
- Lot 8, fonctions présentes et ce qu'il en a fait (captures citées) :
  - champ « Ses voisins » sur un chiffre : **vu et ouvert** (013, 015, 016), texte « Avec « Couverts », « Producteurs » dans le groupe « Chiffres » : les 3 éléments un à un » et lien « Régler sur « Chiffres » » lisibles sur 013 et 015, **non lus** ; liste refermée par Échap sans choix ;
  - lien « Voir la scène de « La maison » » : **visible** sur 009 à 018 (au-dessus d'« Apparition »), **jamais mentionné ni cliqué** ; aucune capture de la vue « Scène », donc rien à dire sur « Éléments de la scène », « les 3 un à un » dans la ligne de temps, ni sur les avertissements (« part avant », « lancements séparés ») : jamais affichés ;
  - « Pareil pour … » : **remarqué deux fois** (009 : « Pareil pour Paragraphe « Aurèle et Nils ont… » » ; 012 : « Pareil pour « Chiffres » » ; 015 : « Pareil pour « Couverts » et « Producteurs » »), **jamais lu ni utilisé** (« écrit petit et long, je regarde pas plus ») ;
  - champ de durée en ms : visible (009 « 700 ms », 015 « 800 ms »), **jamais touché** ; nommé après coup en T4-a (« un champ avec un chiffre et « ms » ») ;
  - « Rejouer : une seule fois / à chaque passage » : **lu à voix haute** (06:55, capture 015), **laissé par défaut**, puis déclaré introuvable (08:45, T4-R, T4-b, D-FIN-3).

## 3. Lignes de codage (format 8.5)

Séance P3, tâche T4, position 1 sur toutes les lignes. « N° action » = compte du participant / n° d'appel d'outil.

| N° action | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|
| L1 · [3] / #5–#6 | 01:21–01:34 | Découvrir | MM | 0 | petit bandeau « Style + 🗑 » au-dessus de la section (capture 002) ; panneau droit « SÉLECTION – Cliquez un texte pour écrire… » | « on dirait qu'un truc est déjà sélectionné » | — | Attente contredite par la capture elle-même (rien de sélectionné à droite). Formulée avec « on dirait ». Sans effet : il clique la photo ensuite. |
| L2 · [4]–[5] / #7–#9 | 01:34–01:49 | Découvrir | SAT | — | libellé « Animation » en bas du panneau droit, section repliée (capture 003) | « Tiens, il y a écrit « Animation » tout en bas du panneau à droite, ça c'est un mot que je connais. » | — | Première action pertinente [4]. Le mot connu de la persona est trouvé en 4 actions, sans « + » ni bouton « effets » cherché. |
| L3 · [11] / #17–#18 | 02:30–02:46 | Vérifier | RATE | 1 | lien « Voir l'effet » à droite du champ « Apparition » (capture 006) ; aussi « Aperçu » en haut à droite (toutes captures) | « Il y a aussi un lien « Voir l'effet » mais je vais pas m'en occuper, ça a l'air bon. » | PERC (déclaratif, D-FIN-10) | Accès lisible et nommé, écarté volontairement ; aucun coût en actions (gravité 1 par hésitation entre 0 et 1) ; conséquence différée : D-FIN-10 « j'ai jamais vraiment vu le résultat en vrai ». Conforme à la persona (« sans vérifier »). |
| L3b · [11] / #18 | 02:46 | Choisir | SAT | — | badge « +1 animation » à côté du nom de l'élément ; champ « Glissé depuis la d… » (006) | « Ça a l'air d'avoir marché pour la photo. » | — | Journal v1 confirme. Le badge sert de signal de fin pour cet élément. |
| L4 · [16] / #25 | 03:18 (journal v2 09:21:09 UTC) | Choisir | ERR (non récupérée) | 3 | liste déroulante « Apparition » du titre (capture 008 : « Fondu » à y ≈ 288, « Fondu en montant » à y ≈ 300) ; résultat sur 009 : champ « Fondu » | « [16] Je clique sur « Fondu en montant ». » ; journal : « Apparition · Fondu » ; clic log : x 727, y 288 | dispositif : visée sur capture réduite (lignes de 12 px) possible, non prouvée ; aucune loupe | Résultat contraire à l'intention annoncée, attesté par 009 et le journal. Remarqué à 04:03 (« C'est pas exactement ce que je voulais dire (« monter ») … il y a bien un changement, donc je vais dire que c'est bon ») et **non corrigé** → C5 titre non rempli. Gravité 3 (critère non rempli). La non-correction est conforme à la persona (« considère la tâche terminée dès qu'il voit un changement qui ressemble »). |
| L5 · [17] / #26–#27 | 03:24–04:03 | Choisir | RATE | 2 | case « Pareil pour Paragraphe « Aurèle et Nils ont… » » sous le champ « Apparition » (capture 009) | « Je remarque aussi une case « Pareil pour Paragraphe + Chiffres » mais c'est écrit petit et long, je regarde pas plus. » | — (voir limite en §6 : « + Chiffres » non lisible sur 009 dans ma lecture) | Accès lisible, remarqué, non lu. Coût : le paragraphe est fait à la main en 6 actions ([18]–[23]) pour le même effet « Fondu ». Gravité 2. Persona (« ne lit pas les libellés de plus de deux mots »). |
| L6 · [17] / #27 | 04:03 | Composer | RATE | 4 | lien « Voir la scène de « La maison » » au-dessus du champ « Apparition », section Animation (capture 009 ; présent sur 010 à 018) | capture 009 ; jamais nommé dans la trace | — | Seul accès visible à la scène (ordre, minutage commun, rejeu de l'ensemble) : jamais lu ni cliqué en 24 actions de panneau. Origine de la chaîne C2, C3, C4 non remplis → échec : gravité 4. Hésitation : conforme à la persona (libellé de 6 mots, texte petit), donc pas PERS ; le problème d'interface est que rien de plus gros ou plus central ne mène à la scène. |
| L7 · [21] / #33 | 05:17 | Choisir | FRU | — | — | « ça commence à faire beaucoup de clics pour un truc qui devrait être simple » (agacement 2) | — | Expression négative spontanée au point d'étape 20 actions ; agacement < 4. Trois clics par élément, sans « Pareil pour ». |
| L8 · [23] / #35–#36 | 05:23–05:41 | Choisir | RATE | 1 | case « Pareil pour « Chiffres » » sous « Apparition » du paragraphe (capture 012) | « Je vois une case « Pareil pour Chiffres » mais c'est un peu long à lire, je passe. » | — | Deuxième occurrence remarquée, non lue. Elle aurait posé « Fondu » sur le groupe, pas le rebond voulu : accès au groupe, pas au but exact ; gravité 1 par hésitation (0 possible). |
| L9 · [25] / #38–#39 | 05:47–06:04 | Composer | DEC | — | panneau « Composant · Chiffre clé » ; ligne « Ses voisins : Chacun à part » avec le texte « Avec « Couverts », « Producteurs » dans le groupe « Chiffres » : les 3 éléments un à un » (capture 013) | « Ça doit être pour faire arriver les chiffres l'un après l'autre. » | — | Rencontre et interprétation juste de la fonction du lot 8, sans la chercher à cet endroit. Compréhension non confirmée par l'usage (voir L13). |
| L10 · [28] / #43–#45 | 06:22–06:55 | Choisir | SAT | — | champ « Montée avec rebc… », badge « +1 animation » (capture 015) | « « Montée avec rebond » c'est pris, badge « +1 animation ». » | — | Journal v4 confirme. Faible, factuel. |
| L11 · [29] / #45 | 06:55 | Lancer | RATE | 4 | groupe « Rejouer : une seule fois \| à chaque passage », phrase « Quand « Années » entre dans l'écran : montée avec rebond en 800 ms, une seule fois. » (capture 015) | « un « Rejouer : une seule fois / à chaque passage ». Ça fait beaucoup de texte, je lis pas tout en détail, je laisse comme c'est. » | — | Le réglage du rejeu est **lu à voix haute** puis laissé par défaut → C6 non rempli. À 08:45 : « j'ai pas trouvé où dire que ça recommence à chaque fois » ; T4-b et D-FIN-3 idem : affirmation contredite par sa propre lecture de 015 (pas HALL : il n'affirme pas voir ; c'est un oubli). La phrase de résumé « une seule fois » n'a pas fait alerte. Gravité 4 (cause d'un critère non rempli au sein de l'échec ; conforme à « laisse tous les réglages par défaut »). |
| L12 · [29] / #45 | 06:55 | Régler | RATE | 3 | « Vitesse : Rapide \| Normale \| Lente », champ « 800 ms », « Démarre : quand il entre dans l'écran », « Délai : 0 ms » (capture 015 ; « 700 ms » et « Démarre » déjà visibles en bas de 009 et 012) | « vitesse, un truc « Démarre quand il entre dans l'écran », un « Délai » à 0 … je laisse comme c'est » | — | Les champs qui auraient permis de décaler (C3, C3b) et d'allonger (C4) sont vus et laissés. Gravité 3 (critères non remplis, coût ≥ 10 actions au total si l'on compte la répétition à l'identique). Nommés après coup en T4-a. Conforme à la persona. |
| L13 · [30]–[32] / #46–#49 | 06:55–07:28 | Composer | MM + VOC + RATE | 3 | liste déroulante ouverte sous « Ses voisins » : « Chacun à part » puis les mêmes dix effets que la liste « Apparition » (capture 016) ; texte « les 3 éléments un à un » et lien « Régler sur « Chiffres » » lisibles sur 013 et 015 | « Cette liste c'est pareil que celle d'avant … je vois rien qui dit "l'un après l'autre" ou dans quel ordre. Ça m'aide pas » ; touche `Escape` (#49) | CONN faible (Échap, persona « aucun raccourci ») | Attente (« pour faire arriver les chiffres l'un après l'autre ») contredite par le contenu de la liste (des effets, pas un ordre) → MM. Mot VOC : « Ses voisins » / « Chacun à part » (D-FIN-3 : « je voyais pas la différence entre les deux »). RATE : la mention « un à un » est écrite juste à côté et n'est pas lue. 3 actions perdues ; C3b non rempli → gravité 3. Pas FP au sens strict (la fonction pouvait mener au but) : hésitation notée. |
| L14 · [33]–[40] / #50–#59 | 07:33–08:37 | Choisir | RATE | 2 | « Pareil pour « Couverts » et « Producteurs » » sous « Apparition » du chiffre 12 (capture 015) | « je vais juste faire pareil sur les deux autres chiffres, ça devrait suffire » | — | Répétition à la main en 8 actions ([33]–[40]) de ce que la case « Pareil pour » propose en un clic. Gravité 2. |
| L15 · [38]–[40] / #57–#59 | 08:11–08:37 | Choisir | — (note) | — | chiffre « 14 », menu « Apparition », « Montée avec rebond » (aucune capture) | « [39] Je clique directement sur le menu déroulant « Apparition » du chiffre 14, au même endroit que pour les deux autres. » | PERS (règle 4 de 3.2 : trois actions sans dire ce qu'il voit) | Trois actions à l'aveugle en fin de budget ; le journal (v6, 09:26:29 UTC) confirme le résultat, donc ni ERR ni HALL. L'anticipation de l'emplacement s'appuie sur 013 et 017 (même disposition) : pas CONN. |
| L16 · [40] / #59 | 08:45 | Composer | BUD | 4 | — | « Je suis à 40, la limite, donc je m'arrête là. […] j'ai pas trouvé où dire que ça recommence à chaque fois qu'on revient sur la partie, ni comment mettre les chiffres dans l'ordre » | — | Mode de fin budget ; échec E. Le participant sait ce qui manque (ordre, rejeu) : pas de MM sur le statut. |
| L17 · [40] / #59 | 08:45 | Composer | FRU | — | — | « Franchement c'était long » ; agacement 3 | — | Agacement < 4 ; expression négative spontanée. |

## 4. Codes déclaratifs (questions et débriefing) — tous « déclaratif »

| Moment | Code | Étape | Citation |
|---|---|---|---|
| T4-SEQ (10:05) | SEQ 3 | — | « Je dirais 3. […] y'a des trucs que j'ai pas trouvés, genre dans quel ordre ça se déclenche et comment faire pour que ça se relance » |
| T4-SEQ | SAT | Choisir | « C'est pas hyper compliqué de cliquer et choisir un truc dans un menu, ça j'ai su faire assez vite pour chaque élément. » |
| T4-R (10:05) | VAL− | Composer | « Si Aurèle regarde ça, elle va sûrement dire que c'est pas ce qu'elle a demandé. » (lucide ; corroboré par le site) |
| T4-b (11:04) | FRU | Composer | « J'ai ouvert un menu « Ses voisins » en pensant que c'était ça, mais j'ai rien trouvé qui parlait d'ordre ou de recommencer, donc j'ai tourné en rond pour rien » (corrobore L13) |
| D-FIN-1 (11:47) | VAL+ | Découvrir / Choisir | « pour un truc simple genre « fais bouger la photo », ça se trouve assez vite […] Un peu comme sur Canva pour la base » |
| D-FIN-1 | VAL− | Composer / Lancer | « dès que c'est plus précis, genre l'ordre dans lequel les choses bougent ou faire que ça se relance quand on repasse dessus, là je me suis retrouvé à cliquer un peu au hasard » |
| D-FIN-2 | SAT | Choisir | « Le plus clair, c'est le menu « Apparition » avec les vignettes toutes prêtes […] ça ressemble à ce que je connais sur Canva. » |
| D-FIN-3 | FRU + VOC | Composer | « ce « Ses voisins » avec « Chacun à part », qui proposait exactement les mêmes choix que le menu du dessus, je voyais pas la différence entre les deux » |
| D-FIN-3 | FRU | Lancer | « comment faire pour que toute la scène rejoue à chaque fois qu'on revient dessus. Ça, j'ai vraiment pas su où chercher. » (contredit par sa lecture de 015 ; voir L11) |
| D-FIN-10 (12:23) | FRU + PERC | Vérifier | « ça serait bien qu'il y ait un bouton genre « voir toute la scène jouer » directement visible, parce que là j'ai jamais vraiment vu le résultat en vrai » ; « Sur Canva je vois tout de suite l'animation qui joue […] là j'ai pas eu ça » (« Voir l'effet » et « Tester sur le site » étaient visibles et écartés : L3) |
| D-FIN-10 | VAL− faible | — | « c'était pas désagréable, juste un peu long pour un truc qui avait l'air simple au départ » |

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

**PC-1 · La scène n'est jamais abordée : l'entrée « par élément » suffit à clore la recherche.**
- Endroit : section « Animation » du panneau droit ; lien « Voir la scène de « La maison » » (009 à 018) ; « Ouvrir dans le mode Animation » (007, 010, 013, 015, 017) ; onglet « Animation » de la barre du haut (toutes captures).
- Étape : Composer. Cause apparente : le chemin élément → « Apparition » → effet donne un signal de réussite (« +1 animation ») après 3 actions ; l'accès à la composition est un lien texte de six mots, petit, au-dessus du champ, que la persona ne lit pas ; aucune invitation plus visible n'apparaît après le deuxième ou troisième élément animé dans la même section.
- Gravité maximale : 4. Lignes : L6, L12, L16 ; déclaratif T4-SEQ, D-FIN-1 (VAL−).
- Test d'artefact : A1 non (libellés statiques visibles, pas de mouvement à percevoir). A2 : pas de CONN ; comportement conforme à la persona (pas PERS) : le problème vaut pour ce public, non généralisable aux designers par cette séance. A6 : aucun MOD avant. A8 : aucun HALL. → problème d'interface, à croiser avec les autres séances.

**PC-2 · Le rejeu « à chaque passage » est vu, laissé par défaut, puis déclaré introuvable.**
- Endroit : groupe « Rejouer : une seule fois | à chaque passage » et phrase de résumé « … une seule fois. » sous « Apparition » (015).
- Étape : Lancer. Cause apparente : le réglage arrive dans une liste de cinq lignes lue d'un bloc (« beaucoup de texte ») ; rien ne relie « Rejouer » à la formulation de la consigne (« recommence chaque fois qu'un visiteur revient ») ; la phrase de résumé énonce « une seule fois » sans le présenter comme un choix à faire.
- Gravité maximale : 4. Lignes : L11, L16 ; déclaratif T4-R, T4-b, D-FIN-3.
- Test d'artefact : A1 non. A2 : conforme à la persona (« laisse tous les réglages chiffrés par défaut »). A6 non. A8 non (la contradiction est entre deux paroles du participant, pas entre parole et capture). → problème d'interface (pour ce public).

**PC-3 · « Ses voisins » : la liste d'effets ne dit pas « l'un après l'autre ».**
- Endroit : champ « Ses voisins : Chacun à part », sa liste (016), texte « les 3 éléments un à un » et lien « Régler sur « Chiffres » » (013, 015).
- Étape : Composer. Cause apparente : l'idée d'échelonnement est portée par un texte d'aide petit (« un à un ») et par la sémantique du champ, pas par les libellés de la liste, identiques à ceux d'« Apparition » ; la persona lit la liste, pas le texte d'aide.
- Gravité maximale : 3. Lignes : L9, L13, L14 ; déclaratif T4-b, D-FIN-3 (VOC).
- Test d'artefact : A1 non. A2 : conforme à la persona (ne lit pas > 2 mots) ; CONN faible sur Échap sans effet sur le problème. A6 non. A8 non. → problème d'interface (public débutant) ; à confronter aux designers.

**PC-4 · Titre : « Fondu » posé au lieu de « Fondu en montant », vu et non corrigé.**
- Endroit : liste « Apparition » (008), champ « Fondu » (009).
- Étape : Choisir. Cause apparente : clic 12 px trop haut dans une liste dense de la capture réduite ; le champ affiche bien « Fondu », le participant le lit et se contente d'« un changement ».
- Gravité maximale : 3 (C5 titre). Lignes : L4.
- Test d'artefact : A1 : oui en partie (visée sur capture à 800 × 500, aucune loupe) et l'interface offre la valeur affichée « Fondu », lue et non exploitée → artefact probable pour le clic manqué, signal faible ; la non-correction est un comportement de persona. A8 non.

**PC-5 · « Pareil pour … » remarqué deux fois, jamais lu.**
- Endroit : case « Pareil pour … » sous « Apparition » (009, 012, 015).
- Étape : Choisir. Cause apparente : libellé long et petit, qui contient le nom complet de l'élément voisin ; la persona n'agrandit jamais.
- Gravité maximale : 2 (6 + 8 actions répétées). Lignes : L5, L8, L14 ; déclaratif L7 (« beaucoup de clics »).
- Test d'artefact : A1 : « écrit petit » — le texte est lisible sur la capture ; loupe disponible et jamais utilisée → problème d'interface amplifié par le dispositif, gravité réduite à 1 ; ou signal faible. A2 conforme persona.

**PC-6 · Aucune vérification, puis demande d'un bouton « voir toute la scène jouer ».**
- Endroit : « Voir l'effet » (006, 009, 012, 015), « Tester sur le site », « Aperçu ».
- Étape : Vérifier. Gravité : 1 (comportement : L3) ; le reste est déclaratif (D-FIN-10, PERC).
- Test d'artefact : A1 oui, et l'interface offre une représentation (« Voir l'effet », nommé et écarté) → artefact probable, signal faible. Noter tout de même : le souhait exprimé porte sur **toute la scène**, ce qu'aucun accès utilisé ne montrait, et qui rejoint PC-1.

## 6. Écarts au protocole et au dispositif ; limites de lecture

- **MOD** (procédure, après la tâche, sans effet sur elle) : segment 3 regroupe dans un seul message la phrase de budget, « Merci. J'ai quelques questions… », T4-SEQ et T4-R (le script prévoit une question, une réponse, « Merci. ») ; segment 4 idem pour T4-a et T4-b ; segment 5 pour D-FIN-1 à 3 ; aucune relance « Pouvez-vous m'en dire un peu plus ? » n'a été nécessaire. Segment 1 (lancement) dit au participant que l'étude sert « à repérer où de vrais utilisateurs se perdraient » : cadrage hors script, en tension avec la règle 9 de 3.2 ; noté, sans conséquence visible. Le modérateur a arrêté sur l'annonce du compte 40 (addendum 5, point 5) : conforme.
- **HORS** : aucun. L'entête de la trace signale la lecture de `prompt5-p3.md` (#1) : c'est la consigne d'incarnation demandée, pas le code ni la documentation de l'outil.
- **PERS** : (a) [38]–[40] : trois actions sans capture ni description (règle 4 de 3.2) ; (b) lecture de libellés longs (02:07 « Faire arriver l'élément, le faire réagir au survol ou bouger en continu » ; 06:55 les cinq lignes de réglages) au-delà des « deux mots » de la fiche, sans effet puisqu'il les laisse ; (c) pour le reste, persona respectée : pas de loupe, réglages par défaut, un seul chemin, arrêt sans vérification. Règle d'aide non atteinte (progrès à chaque élément).
- **CONN** : touche Échap pour fermer une liste (#49) alors que la fiche dit « aucun raccourci » ; faible, sans effet sur le résultat.
- **PERC** : déclaratif seulement (D-FIN-10). Pendant la tâche, aucune difficulté attribuée à l'absence de mouvement.
- **HALL** : aucun cas net. Deux points à vérifier : (a) 04:03 « Pareil pour Paragraphe + Chiffres » alors que la capture 009 montre, à ma lecture, « Pareil pour Paragraphe « Aurèle et Nils ont… » » sans « + Chiffres » (texte petit ; possible troncature ou limite de ma lecture sans loupe) ; (b) 08:45 « J'ai fait pareil sur les trois chiffres » sans capture pour le troisième : vrai d'après le journal v6.
- **A5** : état de départ version 0, aucune animation utilisée sur l'accueil d'après la fiche ; réserve levée pour cette séance à la lecture de la fiche seule.
- **Limites de lecture** : aucune loupe dans la séance ; j'ai lu les petits textes des captures 800 × 500 sans agrandissement (positions des lignes des listes déroulantes estimées à ± 3 px, ce qui suffit à trancher [16] : 288 est au centre de « Fondu », « Fondu en montant » commence vers 296) ; la ligne 1 de `log.jsonl` (capture 001 à 09:17:38 UTC, avant le message de consigne) est exclue du compte ; les horodatages de la trace sont relatifs et ceux du journal en UTC, appariés à quelques secondes près ; aucune capture de la vue « Scène » n'existe, donc rien n'est dit sur son contenu.
