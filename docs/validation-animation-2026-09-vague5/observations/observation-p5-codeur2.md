# Observation codée · Séance P5 (vague 5) — mission T4 seule

Observateur : codage à partir de la trace brute, du journal, de la fiche de lecture et de 17 des 19 captures de `shots5/p5-t4/` (001 à 009, 011, 013 à 019 ; 010 et 012 non ouvertes, jugées redondantes avec 007/009/017 pour l'ouverture de la même liste de préréglages). Aucune hypothèse consultée. Aucun outil de navigateur utilisé.

---

## 1. Résumé de la séance

P5 incarne Élodie Nguyen, intégratrice web experte d'Elementor Pro, sous contrainte de temps (arbitrage à rendre vendredi). La vague 5 ne comporte qu'une mission, T4 (« La maison racontée comme une scène »), en position 1, sur la version du lot 8. La participante trouve l'onglet Animation immédiatement, sélectionne la photo, pose avec aisance les quatre effets demandés (glissé depuis la gauche, fondu en montant, fondu, montée avec rebond) via le bouton « Animer », la liste « Éléments de la scène » et l'option « les 3 un à un », et coche « à chaque passage ». Elle échoue en revanche à décaler les départs des pistes les unes par rapport aux autres : elle cherche ce réglage pendant l'essentiel de la séance, le trouve un champ « Départ » un peu par hasard après avoir replié la liste des éléments, puis, en tentant de faire glisser une barre de piste, déplace en réalité la tête de lecture. La tâche s'arrête au budget (39 actions autodéclarées) sans que le séquencement ni la durée totale (2,5 s demandées, 1 s obtenue) soient corrigés. Statut lu dans le site : échec, sur le seul critère C3. Le récit qu'elle fait ensuite du résultat au visiteur est, lui, entièrement exact.

---

## 2. La tâche T4

### Statut (9.1) et accord avec la préparation

Lecture du site final (`fiche-lecture-p5.md`) contre les critères de la section 5 du protocole :

- C1 (tous les éléments bougent) : **oui** — les six éléments visés (photo, titre, paragraphe, trois chiffres) portent chacun une arrivée visible (images-clés 0 → 700/800 ms, opacité et/ou transform).
- C2 (un seul événement) : **oui** — un déclencheur unique `Q5hLFJ47hyNd` (on=inView) porte les quatre pistes.
- C3 (ordre principal, écarts ≥ 80 ms) : **non** — les quatre pistes (photo, titre, paragraphe, chiffres) démarrent toutes à 0 ms ; aucun écart entre elles.
- C3b (chiffres échelonnés) : **oui** — stagger `{"each":100}`, départs 0/100/200 ms entre les trois chiffres.
- C4 (fin entre 1 800 et 3 000 ms) : **non** — fin du dernier mouvement à 1 000 ms (dernier chiffre : 200 ms + 800 ms).
- C5 (manières de bouger) : **oui** — translateX(-40px) pour la photo (≥16 px), translateY(28px) pour le titre (≥8 px), fondu pour le paragraphe, cubic-bezier à dépassement (.34,1.56,.64,1) pour les chiffres.
- C6 (répétition) : **oui** — `once=false` sur le déclencheur, case « à chaque passage » cochée (journal v9 « Rejouer »).

Application de la règle de la section 5 : « Échec : C1 ou C3 non rempli… ». C3 n'étant pas rempli, le statut est **E (échec)**, quel que soit le score sur les cinq autres critères (5 sur 7 remplis). **Accord avec le statut proposé par le préparateur** (E, cause C3, mode BUD) : accord entier, y compris sur la cause unique retenue — C4 est également non rempli mais n'intervient pas dans la qualification puisque C3 seul suffit à l'échec.

### Mode de fin et aides

- Mode de fin : **BUD (budget atteint)**, déclaré par la participante elle-même (« FIN : budget / ACTIONS : 39 ») puis confirmé par le message du coordinateur reproduisant mot pour mot la phrase de fin de budget de 4.3.F (« Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. »), reçu à 09:47 — voir réserve en section 6 (compte à 39, pas 40).
- Aides : **aucune**. La participante n'a jamais dit « je suis bloquée » ni formulation équivalente ; aucune phrase d'aide n'apparaît dans la trace.

### Métriques (9.2)

- **Actions totales** : 39 au compte de la participante ([1] à [39], ACTIONS:39) ; 39 appels d'outils « action » au sens du dispositif (Bash : 15 clics, 3 défilements, 1 glissé, 19 captures — cf. `log.jsonl`) ; en comptant aussi les 19 ouvertures d'image (👁, hors compte), 58 appels d'outils au total pour la tâche (▶ #2 à ▶ #59).
- **Actions perdues à cause des défauts du dispositif** : aucune identifiée — pas d'échec de capture, pas de décalage de coordonnées visible, le glissé a été exécuté et a produit un effet réel dans l'éditeur (déplacement de la tête de lecture), donc pas une panne du navigateur de test mais un comportement de l'interface observée.
- **Première action pertinente** (9.2 : première action suivie d'une capture ou d'une entrée de journal concernant le mouvement d'un élément visé) : action **[10]**, 02:33, clic sur le bouton « Animer "Photo de la salle" » → journal v1 « Animer Photo de la salle » (09:20:32).
- **Actions jusqu'à la réussite** : non atteint (le statut est E ; le critère C3 n'est jamais rempli, à aucun instant du journal).
- **Captures et agrandissements** : 19 captures, 0 loupe.
- **Fausses pistes (FP)** : 0 identifiée au sens strict (aucune suite d'actions engagée dans une fonction sans rapport, puis abandonnée) ; la confusion sur le défilement (voir ERR ci-dessous) est un mauvais résultat d'une action à la bonne intention, pas un détour vers une fonction sans rapport.
- **HES** : 0 codée isolément ; la répétition de captures suit la cadence normale du dispositif (une capture après chaque action), sans blocage caractérisé au sens de la définition (deux actions consécutives sans changement ni verbalisation d'incertitude).
- **ERR** : 2 — une récupérée seule (défilement, action [29]-[31]), une non récupérée faute de budget (glissé de piste, action [38]-[39]).
- **COLL** : 0 (COLL-D et COLL-ND) — aucune modification hors des six éléments visés ; le surtitre « La maison », toléré par la consigne, n'a pas non plus été touché.
- **RATE** : 2 — le champ « Départ » visible dès la capture 011 avant d'être cherché (voir lignes de codage), et le texte d'aide sous la ligne de temps expliquant la tête de lecture, visible dans presque toutes les captures et jamais lu avant la fin.
- **Vérification** : uniquement **VERIF-E** (dans l'éditeur) ; jamais de VERIF au sens strict (aucune ouverture d'une vue visiteur, « Tester sur le site » jamais cliqué, faute de budget selon ses propres mots). Rang de la première VERIF-E : action [15], 03:18 (« Je photographie pour vérifier que la photo a bien pris l'effet »).
- **VOC** : 1 mot — « images-clés », lu à l'écran (« n'a pas encore d'images-clés »), non compris, cité dans la fiche de sa persona comme vocabulaire inconnu.
- **SEQ (T4-SEQ)** : 4/7, avec justification explicite d'un score coupé en deux (moitié facile, moitié coûteuse), et remarque spontanée : « si j'avais vu le champ Départ dès le début, je mettais 4 sur 7 à 6 sur 7 ».

### Concordance du récit (9.4)

Récit T4-R comparé au site enregistré (déclencheur unique, quatre pistes à 700-800 ms démarrant toutes à 0 ms sauf les trois chiffres échelonnés de 100 ms, fin à 1 000 ms, rejeu à chaque passage) :

| Dimension | Score | Justification |
|---|---|---|
| Quoi | 2/2 | Nomme exactement les quatre familles d'éléments qui bougent (photo, titre, paragraphe, chiffres), aucune en trop, aucune omise. |
| Quand | 2/2 | « Tout se déclenche d'un coup, en même temps » (photo/titre/paragraphe) et chiffres « l'un après l'autre... avec un dixième de seconde entre eux » : exact, y compris la valeur du décalage (100 ms). |
| Comment | 2/2 | « la photo arrive par la gauche, le titre monte en fondu, le paragraphe apparaît en fondu, les trois chiffres montent avec un rebond » : correspond mot pour mot aux préréglages posés (glissé depuis la gauche, fondu en montant, fondu, montée avec rebond). |
| Combien | 2/2 | « bouclé en une seconde environ » (site : 1 000 ms, exact) et « ça rejouera à chaque fois » (site : `once=false`, case cochée, exact). |

**Total : 8/8. Écart matériel : non.** C'est un résultat notable : bien que la tâche soit un échec (C3), le récit que la participante fait de ce qu'elle a réellement produit est entièrement exact — cas d'« échec lucide » au sens de la matrice réussite × compréhension (9.3), pas d'« échec ignoré ». Elle formule d'ailleurs ce diagnostic elle-même avant la fin de la tâche (voir ligne de codage à 07:41) et dans sa réponse T4-R (« ce n'est pas ce qu'Aurèle a demandé », « au lieu d'une petite scène qui se raconte, il va voir un flash »).

### Mesures propres (section 5)

- **Profil de critères** : C1 oui, C2 oui, C3 **non**, C3b oui, C4 **non**, C5 oui, C6 oui (5 remplis sur 7 ; l'échec tient au seul C3, C4 étant une conséquence directe de l'absence de décalage plutôt qu'un défaut indépendant).
- **Structure de lancement** : un seul événement (déclencheur unique à l'entrée à l'écran de la photo, cohérent avec C2), mais sans aucun échelonnement entre les quatre pistes principales (toutes à « Départ : 0 ms ») ; seul l'échelonnement interne aux trois chiffres (100 ms, via « les 3 un à un ») a été posé.
- **Cohérence de T4-a** (« si le paragraphe devait arriver plus tôt ») : jugée **cohérente** avec la structure enregistrée — elle décrit précisément le bon mécanisme (cliquer le nom de la piste « Paragraphe » dans la liste, pas la barre ; panneau du bas « PISTE · Paragraphe… » ; champ « Départ » en ms ; taper une valeur plus petite ; Entrée), avec deux réserves explicites et honnêtes (le panneau était caché chez elle, « trouvé par hasard » ; incertitude sur le sens exact de « Départ », qu'elle propose de vérifier en observant la barre). Pas de code MM sur cette réponse.

---

## 3. Lignes de codage

| Séance | Tâche | Position | N° action (n° outil) | Horodatage | Étape | Code | Gravité | Endroit (tel que vu) | Trace citée | Dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P5 | T4 | 1 | [2] (#4) | 01:17-01:18 | Découvrir | SAT | – | Onglet « Animation », barre du haut, à côté de « Écriture » et « Design » | « il y a un onglet «Animation» tout en haut... Ça, c'est clair au moins » | — | Reconnaissance immédiate du point d'entrée, comparaison favorable spontanée à Elementor. |
| P5 | T4 | 1 | [8]-[10] (#13-16) | 02:13-02:33 | Découvrir | SAT / VAL+ | – | Fil d'ariane « Page > La maison > Contenu > Photo de la salle » ; bouton « Animer "Photo de la salle" » ; champ « Quand : À l'entrée dans l'écran » | « Là je suis contente ... c'est exactement mon animation d'entrée » | — | Vocabulaire (« à l'entrée dans l'écran ») transposé sans effort depuis Elementor. |
| P5 | T4 | 1 | [11] (#17), capture 006 | 02:36-02:56 | Découvrir | — | – | Panneau « Animation · Photo de la salle » : « Quand », « Délai », « Rejouer », ligne de temps graduée, « Éléments de la scène (10) », panneau « PISTE · Photo de la salle / Départ : 0 ms » déjà visible en bas | « Panneau de droite bien chargé... ça ne me parle pas » | — | Premier aperçu complet du panneau ; le champ « Départ » y est déjà lisible mais la participante regarde « Remplir avec un préréglage », choix cohérent à ce stade (aucun élément à décaler encore). |
| P5 | T4 | 1 | [15] (#23), capture 008 | 03:18-03:34 | Vérifier | VERIF-E | – | Canevas, cadre pointillé vide à la place de « Photo de la salle » | « Ma photo a disparu du canevas, il ne reste qu'un cadre vide... je suppose que l'aperçu me montre l'instant zéro » | PERC | Elle qualifie explicitement sa lecture de supposition (pas de HALL) ; premier des trois épisodes où l'aperçu se vide après la pose d'un effet. |
| P5 | T4 | 1 | [17] (#25-27), capture 009 | 03:39-03:54 | Choisir | VOC | 2 | Ligne « Titre 2 «Une cuisine de…» », résumé : « n'a pas encore d'images-clés » | « n'a pas encore d'images-clés » — mot que je ne connais pas, mais je comprends qu'il lui manque son effet » | — | Mot listé comme inconnu dans la fiche de persona (3.7) ; sans effet sur le résultat, elle infère juste. |
| P5 | T4 | 1 | [21]-[22] (#31-34), capture 011 | 04:24-04:37 | Composer | RATE | 4 | Panneau « PISTE · Photo de la salle », champ « Départ : 0 ms », visible sous le canevas juste après l'ajout de l'effet du titre | « il faudra que je les décale, comme mes délais croissants » (juste après avoir vu la capture montrant le champ Départ) | — | Elle formule elle-même, à voix haute, le besoin exact (décaler) immédiatement après une capture qui montre le champ qui le permet, sans le repérer ni l'utiliser à ce moment. Événement d'origine de la chaîne qui mène à l'échec (règle 8.3) : gravité 4 attribuée ici plutôt qu'à l'action de fin de tâche. |
| P5 | T4 | 1 | [26] (#39-41) | 05:15-05:28 | Composer | DEC / VAL+ | – | Ligne « Chiffres · 3 éléments », bouton « les 3 un à un » | « si ça fait mes délais croissants tout seul, ça me fait gagner du temps » | — | Fonction cherchée puis trouvée et utilisée avec succès ; élément de checklist « les 3 un à un » : **trouvé et utilisé**. |
| P5 | T4 | 1 | [29]-[31] (#44-47), capture 015 | 05:48-06:25 | Régler | ERR (REC-S) | 2 | Défilement dans le panneau de droite, sous « Éléments de la scène » | « Le défilement n'a bougé que la liste des éléments » | — | Action dont le résultat contredit l'intention annoncée (« pour retrouver Remplir avec ») ; récupérée seule au coup suivant. |
| P5 | T4 | 1 | [31]-[32] (#47-49), capture 016 | 06:25-06:44 | Régler | DEC | – | Chevron devant « Éléments de la scène » | « Je clique sur ce chevron pour replier la liste et laisser la place au panneau du bas » | — | Geste qui révèle enfin « Cible », « Intervalle », « Remplir avec » ; trouvé « au hasard » selon ses propres mots (T4-a). |
| P5 | T4 | 1 | [36] (#54-55), capture 018 | 07:09-07:24 | Lancer | — | – | Case « à chaque passage » sous « Rejouer » | « je coche «à chaque passage»... pour que la scène recommence » | — | C6 posé correctement, sans ambiguïté. |
| P5 | T4 | 1 | [37] (#55-56), capture 018 | 07:41-08:04 | Vérifier | VERIF-E / MM (lucide) | 3 | Résumé en haut du panneau + ligne de temps, quatre repères de piste alignés au même point | « mes quatre barres démarrent toutes au même point : tout part en même temps, l'ordre n'y est pas » | — | Diagnostic correct et spontané du défaut C3, avant même la fin de budget ; pas un écart de modèle mental au sens négatif, plutôt une lecture juste non suivie d'effet faute de trouver le réglage. Gravité liée au fait que ce diagnostic correct ne débouche sur aucune correction dans le temps restant. |
| P5 | T4 | 1 | [38]-[39] (#57-59), capture 019 | 08:04-08:38 | Régler | ERR + MM | 3 (hésitation avec 4, voir ci-dessous) | Zone graduée sous les pistes, barre de la piste « Titre 2 «Une cuisine de…» » | attente : « en espérant que ça retarde son départ » ; capture suivante : « le glisser n'a pas décalé la piste du tout : il a déplacé le curseur de lecture » | PERC | Erreur non récupérée (fin de budget). J'hésite entre gravité 3 (coût propre de cette action) et 4 (elle contribue à l'échec) ; je retiens 3 ici et j'attribue la gravité 4 « cause de l'échec » à l'événement d'origine (ligne du 04:24-04:37, règle 8.3 sur les chaînes d'événements). |
| P5 | T4 | 1 | [11]→[38] (#17→#58), captures 006, 007, 009, 011, 013-019 | 02:36→08:38 | Vérifier | RATE | 3 | Texte sous la ligne de temps : « L'aperçu montre l'instant de la tête de lecture : glissez-la (ou ►) pour voir la scène se jouer. », identique dans toutes les captures citées | jamais cité ni lu à voix haute pendant la tâche ; corroboré en débriefing : « Je n'ai jamais vu ma scène se jouer en entier. Pas une seule fois. » (déclaratif, D-FIN-10) | PERC | Présent dès la capture 006 (avant même le premier effet posé), jamais utilisé avant la découverte accidentelle du curseur de lecture à l'action [38]. Voir test d'artefact A1 en section 5 : une représentation alternative (ce texte même) existe et n'a pas été utilisée. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués **déclaratif**.

| Code | Étape | Citation |
|---|---|---|
| FRU | Composer/global | « j'ai dépassé le temps que ça me prendrait chez moi et je n'ai pas fini, donc je ne peux pas mettre plus » (T4-SEQ, note 4/7). |
| VAL+ | Choisir/Composer | « Ça, c'est plus rapide que chez nous : je n'ai pas eu à cliquer élément par élément dans la page, j'ai tout empilé depuis un seul panneau » (D-FIN-1). |
| VAL+ | Vérifier | « La phrase de résumé... C'est excellent... c'est aussi ce que je montrerais à un client pour valider avant de lui envoyer le lien » (D-FIN-2). |
| SAT | Choisir | « j'ai lu la demande du client et j'ai su quoi cliquer » à propos de la liste de préréglages (D-FIN-2). |
| VAL− | global | « je ne peux pas dire à l'agence «lancez-vous» sur la base d'une séance où je n'ai pas fini » ; verdict « pas non, mais pas encore » (D-FIN-1). |
| FRU | Vérifier | « j'ai cru que j'avais cassé quelque chose... elle m'a enlevé toute confiance pendant la moitié de la séance » à propos de l'aperçu qui se vide (D-FIN-3). |
| VAL− | Régler (hors champ, mobile) | « je ne sais pas du tout si mes animations s'appliquent sur les trois [Bureau/Tablette/Mobile]... c'est la première question que je poserais » (D-FIN-10) — touche un sujet hors champ de l'étude (1.4, mobile/responsive) ; rapporté ici mais non retenu comme problème de cette étude. |
| VAL+ | Découvrir | « J'ai trouvé ça rassurant — d'un coup d'œil je vois ce qu'il y a sur le site » à propos de la liste « Animations du site » à vide de sélection (D-FIN-10) — porte sur une fonctionnalité hors du périmètre direct de T4. |
| VAL+ / SAT | Vérifier (déclaratif, priorité de correction) | « Et si vous corrigez une seule chose, faites que l'animation se joue dans l'éditeur » — clôture, priorité spontanée. |

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

**Problème A — Le champ « Départ » de la piste devient invisible dès que plusieurs pistes sont ajoutées, sans indice de défilement.**
- Endroit : panneau « PISTE · [nom de l'élément] », en bas du panneau Animation, sous la liste dépliée « Éléments de la scène ».
- Étape : Composer / Régler.
- Cause apparente : la liste « Éléments de la scène », dépliée par défaut et longue (10 lignes pour cette section), occupe l'espace vertical qui contiendrait le panneau de piste ; rien ne signale qu'il faut la replier (chevron non mis en évidence) ; le défilement du panneau agit sur la mauvaise zone.
- Gravité maximale : 4 (cause l'échec de C3).
- Lignes de codage : ligne du 02:36-02:56 (champ visible tôt, capture 006), ligne du 04:24-04:37 (RATE, gravité 4), ligne du 05:48-06:25 (ERR de défilement), ligne du 06:25-06:44 (DEC du chevron, trouvé « au hasard »).
- Test d'artefact (11.3) : **A1** — le problème ne disparaîtrait pas avec une perception continue du mouvement ni avec une infobulle native : c'est un problème de place à l'écran, indépendant du mouvement perçu. Réponse : non → passe à A2. **A2** — la ligne ne porte ni CONN (elle n'emploie aucun terme hors de sa fiche) ni PERS avant la découverte du chevron. **A6** — aucun code MOD ne précède ce passage dans la tâche. **A8** — aucune conclusion ici ne s'appuie sur un HALL. Sous réserve de confirmation sur d'autres séances (11.2, condition « 2 participants ou gravité ≥ 3 chez 1 »), cette ligne remplit déjà la condition de gravité seule.

**Problème B — Les repères de piste alignés sur la ligne de temps graduée suggèrent qu'on peut les faire glisser pour les décaler ; le glissé déplace en réalité la tête de lecture.**
- Endroit : zone graduée sous les noms de piste (ligne de temps), barres/points alignés sur 0/250/500/750/1000 ms.
- Étape : Régler.
- Cause apparente : absence de distinction visuelle (curseur, poignée, surbrillance au survol) entre la tête de lecture et les repères de piste, alors que les deux objets se trouvent sur la même zone graduée.
- Gravité maximale : 3 (voir hésitation notée avec 4 dans la ligne de codage correspondante).
- Lignes de codage : ligne du 08:04-08:38 (ERR + MM, gravité 3).
- Test d'artefact : **A1** — ne disparaîtrait pas avec une perception continue du mouvement (c'est un problème d'affordance au clic/glissé, pas de perception d'animation). Réponse : non → A2. **A2** — pas de CONN ni de PERS sur ce passage (elle agit conformément à sa manière d'explorer : essai-erreur rapide). **A6** — pas de MOD antérieur. **A8** — pas de HALL. Un seul participant observé ici ; à confirmer.

**Problème C (signal faible, probable artefact) — Absence de lecture continue de l'aperçu ; le texte d'aide sur la tête de lecture existe mais n'est jamais utilisé avant la fin de budget.**
- Endroit : texte sous la ligne de temps (« L'aperçu montre l'instant de la tête de lecture : glissez-la (ou ►) pour voir la scène se jouer. ») et rangée d'icônes de lecture au-dessus de la ligne de temps (jamais nommées ni cliquées, mentionnées seulement en débriefing).
- Étape : Vérifier.
- Gravité maximale : 3 (coût en actions et en confiance, cf. ligne de codage et D-FIN-3/D-FIN-10).
- Test d'artefact : **A1** — le problème disparaîtrait probablement si la participante percevait le mouvement en continu (lecture automatique) ; **et** l'interface offre par ailleurs une représentation alternative visible : le texte d'aide lui-même, présent dans toutes les captures depuis 006, qu'elle n'a pas utilisé. Réponse : **« artefact probable, non retenu, à lister en signal faible »**, selon la règle 11.3-A1. Je le rapporte néanmoins ici car le comportement (texte jamais lu) est attesté sur 13 captures consécutives et corroboré en débriefing, et parce qu'il éclaire directement le Problème A (c'est la même zone de l'écran, sous la ligne de temps, qui porte à la fois le texte d'aide inutilisé et, plus bas, le champ « Départ » invisible).

**Problème D (signal faible) — « images-clés » comme intitulé d'état, opaque pour un profil intégrateur Elementor.**
- Endroit : ligne de piste nouvellement ajoutée, mention « n'a pas encore d'images-clés ».
- Étape : Choisir.
- Gravité maximale : 2 — sans effet sur le résultat (elle devine correctement), un seul participant concerné dans cette séance.
- Test d'artefact : A1 non pertinent (ce n'est pas un problème de perception du mouvement) ; A2 : mot explicitement listé comme vocabulaire inconnu dans sa fiche (3.7), donc pas de CONN ; ne remplit pas encore la condition de rétention de 11.2 (gravité < 3, un seul participant) à ce stade — à revoir en synthèse inter-séances.

---

## 6. Écarts au protocole et au dispositif

- **MOD (probable)** : le message de fin de tâche reçu à 09:47 reproduit mot pour mot la phrase de 4.3.F prévue pour la « 40e action atteinte », alors que le compte annoncé par la participante et confirmé par le journal des outils est de **39** actions, pas 40. L'addendum (point 5) prévoit que « le budget de 40 actions est arrêté par le modérateur dès l'annonce d'un compte ≥ 40 » ; 39 n'est pas ≥ 40. C'est donc un arrêt anticipé d'une action, à signaler comme écart du dispositif/modérateur pour cette séance ; il ne change pas le statut (déjà un échec sur C3, indépendamment du temps restant) mais retire potentiellement une action à la participante.
- **Flag mécanique, pas un HORS réel** : l'en-tête de la trace liste comme « écart » la lecture de `.../prompt5-p5.md`. Cette lecture est cependant l'action explicitement demandée par le message d'ouverture de séance (« Première chose à faire... lis en entier, avec l'outil Read, ta consigne complète : .../prompt5-p5.md ») : il s'agit de la consigne d'incarnation et de la fiche de la participante elle-même, pas du protocole complet, des hypothèses, du code ou de la documentation du dépôt. Je ne la retiens donc pas comme une action interdite au sens de 8.2 (HORS), mais je signale que le marquage automatique de la trace ne fait pas cette distinction.
- **PERS (probable)** : la fiche de persona (3.7) décrit une manière d'explorer qui « annule beaucoup ». Aucune action d'annulation (Ctrl+Z ou équivalent) n'apparaît dans les 39 actions de la trace, alors qu'au moins deux moments s'y prêtaient (le défilement qui n'a pas abouti ; le glissé qui a déplacé la tête de lecture). Écart à signaler, sans certitude sur son effet : elle a pu juger, à raison, qu'annuler n'aurait rien changé à ces deux confusions (aucune des deux n'a modifié le site de façon indésirable).
- **CONN, HALL** : aucun relevé. La participante n'emploie aucun terme de sa liste « vocabulaire inconnu » sans l'avoir d'abord lu à l'écran, et ne prétend jamais avoir vu un mouvement que les captures ne montrent pas ; elle qualifie systématiquement ses suppositions comme telles (« je suppose », « une supposition »).
- **HORS** : aucune tentative de lire du code, de la documentation, ou d'inspecter la page.
- **Limites de ma propre lecture** : deux captures (010, 012) n'ont pas été ouvertes, jugées redondantes avec 007/009/017 (même liste de préréglages rouverte) ; leur omission ne change aucune ligne de codage ci-dessus. Le texte fin du bandeau de résumé, en haut du panneau Animation, est parfois difficile à lire avec certitude totale à la résolution des captures (800 × 500) ; je m'en suis tenu aux passages où le texte était net. Aucune capture « loupe » n'existe pour cette séance (la participante n'a jamais utilisé cet outil), donc aucune vérification à plus haute résolution n'a été possible au-delà de ce que montrent les 001-019.
- **Éléments de la checklist d'exhaustivité (item 6 de la consigne)**, tels qu'observables dans les captures ouvertes : la liste « Éléments de la scène » et l'option « les 3 un à un » ont été **trouvées et utilisées** ; le champ de durée en ms existe et est visible dès la première capture du panneau (« 1000 ms ») mais n'a **jamais été modifié** (durée restée à 1 000 ms au lieu des 2 500 ms demandés, sans qu'aucune alerte de dépassement n'apparaisse dans les captures consultées) ; le champ « Ses voisins » sur un chiffre pris individuellement, la vue « Scène » sur la section « La maison », le lien « Voir la scène de « La maison » » et la fonction « Pareil pour… » **n'apparaissent dans aucune des 17 captures consultées** — la participante n'ayant jamais sélectionné un chiffre individuel ni cherché une vue de scène séparée (elle a travaillé entièrement depuis le panneau ouvert sur la photo), je ne peux ni confirmer ni infirmer leur présence ailleurs dans l'outil, seulement constater qu'ils ne sont pas apparus sur son chemin. Aucun avertissement du type « part avant » ou « lancements séparés » n'est visible dans les captures consultées.
