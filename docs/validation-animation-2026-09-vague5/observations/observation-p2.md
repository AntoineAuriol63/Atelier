# Observation · P2 (Claire Morvan, designer) · vague 5 · T4 seule, position 1

Observateur indépendant, sans les hypothèses. Sources : protocole-observateur.md (sections 3, 4.3, 4.4, 5, 8, 9, 11), addendum-5.md, traces5/trace-p2.md, shots5/p2-t4/ (22 images ouvertes : 001 à 022, dont 3 loupes ; log.jsonl), fiches5/fiche-lecture-p2.md. Horodatages : « mm:ss » = temps de la trace depuis le début de la séance ; « UTC hh:mm:ss » = log.jsonl et journal du site.

---

## 1. Résumé de la séance

P2 reçoit T4 en première mission, sans apprentissage préalable. Elle applique sa méthode Figma : sélectionner l'élément, puis chercher un panneau de propriétés à droite. Dès l'action 4 elle a le panneau de la photo avec une entrée « Animation » ; à l'action 10 la photo reçoit « Glissé depuis la gauche » (journal v1) et à l'action 18 le titre reçoit « Fondu en montant » (v2). En lisant le panneau du titre elle trouve le lien « Voir la scène de « La maison » », l'ouvre (action 20), lit à la loupe l'avertissement « 2 lancements séparés … faites démarrer chaque élément « après » le précédent », revient sur le titre et règle « Démarre : après « Photo de la salle » » (v3, action 29) puis « Rejouer : à chaque passage » (v4, action 32). Elle passe au paragraphe, lui donne « Fondu » (v5, action 38) et atteint le budget de 40 actions avant d'avoir enchaîné le paragraphe et touché aux chiffres. Aucun blocage déclaré, aucune aide, aucune erreur, aucune modification collatérale. Le site enregistré contient 3 éléments animés sur 6, en deux lancements distincts : statut Échec (E), mode budget (BUD). Le récit du visiteur est exact sur ce qui a été produit (6 sur 8, sans écart matériel) : échec lucide. SEQ 3. Elle a vu « Pareil pour … » deux fois sans l'utiliser, n'a jamais ouvert l'onglet « Animation » ni le lien « Ouvrir dans le mode Animation », n'a jamais sélectionné un chiffre, et n'a fait aucune vérification en conditions de visiteur.

---

## 2. La tâche T4 (position 1)

### 2.1 Statut (9.1) et accord avec le préparateur

Lecture du site final (fiche) contre les critères de la section 5 :

| Critère | Lecture | Rempli |
|---|---|---|
| C1 · six éléments bougent | Photo (glissé, translateX −40 px → 0, opacité 0 → 1), titre (translateY 28 px → 0, opacité 0 → 1), paragraphe (opacité 0 → 1). Trois chiffres : rien. | **Non** (3 sur 6) |
| C2 · un seul événement | Deux déclencheurs : « Quand « Photo de la salle » entre dans l'écran » (photo + titre enchaîné) et « Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran ». Aucun n'est l'arrivée de la section ou d'un bloc contenant les six. | **Non** |
| C3 · ordre photo < titre < paragraphe < 1er chiffre, ≥ 80 ms | Photo 0, titre 700 (visite : 877), paragraphe 0 sur sa propre entrée (visite : 0 → 726, « avec la photo ») : le paragraphe part avant le titre. Pas de chiffre. | **Non** |
| C3b · chiffres échelonnés | Aucun chiffre animé. | **Non** |
| C4 · fin du dernier mouvement entre 1 800 et 3 000 ms | Fin lue à 1 400 ms (titre), visite 1 599 ms : trop tôt. Sous 4 500 ms. | **Non** |
| C5 · manières | Photo : décalage horizontal 40 px ≥ 16 (oui). Titre : décalage vers le bas 28 px ≥ 8 (oui). Paragraphe : arrivée visible (oui). Chiffres : aucune courbe à dépassement (non). | **Partiel** (3 des 4 sous-conditions) |
| C6 · rejoue à chaque passage | Photo + titre : once=false (oui). Paragraphe : une seule fois (non). | **Partiel** |

C1 non rempli → **Échec (E)**. Profil : C1 non (3/6), C2 non, C3 non, C3b non, C4 non, C5 partiel, C6 partiel. **Accord avec le statut proposé par le préparateur** (E, BUD), pour la même raison : C1 et C3 non remplis, et cinq critères sur les cinq restants non ou partiellement remplis.

Remarque sur C2 pour les deux éléments enchaînés : même photo + titre, seuls, ne remplissent pas C2 au sens strict, car l'événement est l'entrée de la photo, pas celle de la section « La maison » ; l'option « quand « La maison » entre dans l'écran » était visible dans la liste « Démarre » (capture 016) et n'a pas été choisie.

### 2.2 Mode de fin, aides

- Mode de fin : **BUD** (budget atteint). La participante annonce « FIN : budget · ACTIONS : 40 » à 08:36 ; le modérateur dit la phrase prévue à 09:13 (addendum 5, point 7).
- Aides : **aucune**. Aucun « Je suis bloquée » ; niveau maximal 0.
- Statut C ou P avec BUD : sans objet (E).

### 2.3 Métriques (9.2)

| Métrique | Valeur | Source |
|---|---|---|
| Actions totales (compte du participant) | 40 (annonce finale). Numérotation intermédiaire défaillante : étiquettes [12], [18], [27], [31] et [39] absentes ; du 21e au 39e geste, le compte affiché a une action de retard (le clic sur « Voir la scène », 21e commande du log, est étiqueté [20]) ; il se resynchronise en sautant de [38] à [40]. | trace, log.jsonl |
| Appels d'outils de la tâche | 62 (#2 à #63), dont 22 ouvertures d'image (👁, hors compte) ; 40 commandes du navigateur de test (log.jsonl : 19 captures, 3 loupes, 16 clics, 2 défilements). | trace, log.jsonl |
| Actions perdues à cause du dispositif | 2 (actions 12-13 : « Voir l'effet » puis capture, captures 006 et 007 identiques ; l'effet joué ne peut pas apparaître sur une image fixe). Voir aussi la limite « conscience du budget » en section 6. | captures 006, 007 |
| Première action pertinente | **4** (clic sur la photo, 01:42 ; capture 003 montre le panneau « Photo de la salle » avec l'entrée « Animation » repliée en bas). Lecture plus stricte : 6 (capture 004, section dépliée « Faire arriver l'élément… », menu « Apparition »). | captures 003, 004 |
| Actions jusqu'à la réussite | non atteint | journal, fiche |
| Captures et loupes | 19 captures + 3 loupes = 22 (soit 22 des 40 actions) | log.jsonl |
| Fausses pistes | 0 FP, 0 action perdue | codage |
| Hésitations (HES) | 2 (actions 12-13 ; actions 24-26) | codage |
| Erreurs (ERR) | 0, dont 0 non récupérée | codage, journal |
| Collatérales | COLL-D 0, COLL-ND 0 (les cinq entrées du journal portent sur rh_about_img, rh_about_h2, rh_about_p, tous visés) | journal |
| Occasions manquées (RATE) | 2 (« Pareil pour … » à l'action 19 ; « Ouvrir dans le mode Animation » / onglet « Animation », à partir de l'action 15, sous réserve) | codage |
| Aides | 0 | trace |
| Vérification | VERIF : **aucune**. VERIF-E : oui, rang **12** (« Voir l'effet », sans résultat visible) ; seconde vérification par lecture de la phrase de résumé à l'action 31 (loupe 018). « Tester sur le site » visible sur les captures 008, 012, 013, 020, jamais utilisé. | captures |
| Vocabulaire (VOC) | aucun mot codé | codage |
| SEQ | 3 | T4-SEQ |
| Concordance du récit | 6 sur 8, écart matériel : non (2.4) | T4-R, fiche |
| Temps | consigne reçue 00:58 ; première commande UTC 09:18:56 ; dernière commande 09:25:59 ; annonce de fin 08:36 (trace). Environ 7 min entre première et dernière commande ; métrique secondaire. | trace, log |
| Agacement déclaré | 2 (une seule annonce, à la 40e action ; les repères des 10e, 20e et 30e actions n'ont pas été donnés) | trace 08:36 |

### 2.4 Concordance du récit T4-R (9.4)

Récit (09:25) : « un visiteur qui arrive sur cette partie de la page verra la photo glisser depuis la gauche, puis le titre s'élever en fondu juste après. Le paragraphe, lui, va apparaître en fondu mais pas forcément au bon moment […] il va sans doute se déclencher tout seul dès qu'il entre dans l'écran, donc peut-être en même temps que la photo […]. Et les trois chiffres ne bougeront pas du tout ».

| Dimension | Score | Phrase du récit | Fait du site |
|---|---|---|---|
| Quoi | 2 | photo, titre, paragraphe bougent ; « les trois chiffres ne bougeront pas du tout » | Trois animations sur rh_about_img, rh_about_h2, rh_about_p ; aucune sur les chiffres. Confirmé. |
| Quand (moment, ordre) | 2 | « photo […] puis le titre […] juste après » ; paragraphe « dès qu'il entre dans l'écran, donc peut-être en même temps que la photo » | Photo à l'entrée de la photo, titre start after piste photo (700 → 1 400 ms) ; paragraphe déclencheur propre inView, visite : 0 → 726 « avec la photo ». Confirmé, ordre compris. |
| Comment | 2 | « glisser depuis la gauche », « s'élever en fondu », « apparaître en fondu » | translateX(−40 px) + opacité ; translateY(28 px) + opacité ; opacité seule. Confirmé. |
| Combien (durée, nombre de fois) | 0 | aucune durée ni nombre de fois dans T4-R | 700 ms / 700 → 1 400 ms ; à chaque passage (photo + titre), une seule fois (paragraphe). Absent du récit. Le nombre de fois avait été dit juste pendant la tâche (08:36 : « se rejouent à chaque passage ») mais pas dans la réponse T4-R ; aucune relance du modérateur. |

**Total : 6 sur 8. Écart matériel : non** (aucune affirmation fausse ; une omission). Case de la matrice : **échec lucide**.

### 2.5 Mesures propres (section 5)

- **Profil de critères** : C1 non (3/6) · C2 non · C3 non · C3b non · C4 non (fin à 1 400 ms lue, 1 599 ms visitée) · C5 partiel (photo, titre, paragraphe oui ; chiffres non) · C6 partiel (photo + titre oui ; paragraphe non).
- **Structure de lancement** : lancements séparés, deux déclencheurs (photo avec le titre enchaîné « après » ; paragraphe seul). Aucun événement de section.
- **T4-a** (10:45) : « Il y a un champ « Délai » en millisecondes juste sous « Démarre » — je diminuerais ce chiffre, ou je changerais carrément le « Démarre » pour le faire partir « après la photo » plutôt qu'« après le titre » ». Cotation : **cohérente sur le mécanisme** (les deux champs existent, captures 015 et 018 ; « après « Photo de la salle » » avancerait bien le paragraphe dans une scène enchaînée), **incohérente sur un point avec l'état enregistré** : le paragraphe n'est pas « après le titre » (déclencheur propre, délai 0 ; on ne peut pas « diminuer » un délai à 0). Elle raisonne sur la scène visée, non sur le site qu'elle a laissé, alors que son T4-R disait le contraire une minute plus tôt. Accord avec le préparateur (« cohérente ») **avec réserve** ; codé MM déclaratif gravité 1 (section 4).

### 2.6 Fonctions du lot 8 : trouvées ou non (d'après les captures)

| Fonction | Vue ? | Utilisée ? | Preuve |
|---|---|---|---|
| Champ « Ses voisins » sur un chiffre | non | non | aucun chiffre sélectionné de toute la séance |
| Vue « Scène » sur la section « La maison » | oui | lue | capture 012, loupe 013 (« Scène », « 2 lancements séparés », barres 0 → 700 ms) |
| Lien « Voir la scène de « La maison » » | oui | oui (action 20) | capture 010, loupe 011 ; capture 012 |
| Liste « Éléments de la scène », « les 3 un à un » (ligne de temps) | non | non | mode Animation jamais ouvert ; onglet « Animation » visible en haut (001), lien « Ouvrir dans le mode Animation » visible (008, 012, 020) |
| « Pareil pour … » | oui, deux fois | non | loupe 011 (« Pareil pour Paragraphe « Aurèle et Nils ont… ») ; capture 022 (« Pareil pour « Chiffres » ») |
| Champ de durée en ms | oui | non modifié | loupe 011 (« 700 ms ») ; capture 022 (« 700 ms ») |
| Avertissements de la scène | « lancements séparés » : lu à la loupe et compris (05:18). « part avant » : non affiché (à ce moment la scène n'a que deux éléments dans le bon ordre) | — | loupe 013 |
| « Démarre : après … » | oui | oui (action 29) | captures 016, 017 |
| « Rejouer : à chaque passage » | oui | oui (action 32) | captures 015, 019 |
| « Voir l'effet » | oui | oui (action 12), sans retour visible | captures 006, 007 |
| « Tester sur le site » | oui | non | captures 008, 012, 013, 020 |

---

## 3. Lignes de codage (format 8.5)

Séance P2, tâche T4, position 1 sur toutes les lignes. « N° action » = compte du dispositif (log.jsonl, égal au compte final du participant) ; « # » = appel d'outil de la trace.

| N° action / # | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|
| 2-3 / #4-#6 | 01:23-01:42 · UTC 09:19:11 | Découvrir | MM | 0 | Cadre pointillé autour de toute la section (photo + textes) avec un bandeau « Style + corbeille » en haut à droite (capture 002) | « un cadre semble déjà sélectionné autour de la photo […] c'est bizarre, dans Figma ça n'arrive pas » | — | Le cadre entoure la section, pas la photo ; le panneau de droite dit encore « Sélection · Cliquez un texte pour écrire » (rien n'est sélectionné). Lecture prudente (« semble »). Sans coût. |
| 4 / #7 | 01:42 · UTC 09:19:30 | Découvrir | — (première action pertinente) | — | Panneau de droite « Photo de la salle », fil « Page › La maison › Contenu › Photo de la salle », entrée « Animation » repliée en bas (capture 003) | « voilà un panneau à droite qui s'appelle « Photo de la salle » […] tout en bas une section repliée « Animation » » | — | Stratégie de la persona (sélectionner, puis panneau à droite) satisfaite du premier coup. |
| 7 / #11 | 02:15 | Choisir | HALL | 0 | Texte d'aide sous « Animation » (capture 004) | « Faire arriver l'élément, le faire réagir au survol ou au clic, en choisir. » | HALL | La capture dit « … le faire réagir au survol ou bouger en continu, en un choix. » : « au clic » n'y figure pas. Lecture approximative d'un texte de petite taille, sans effet sur les actions (elle ouvre bien « Apparition »). |
| 10 / #16 | 02:32 · UTC 09:20:19 | Choisir | — (progrès) | — | Liste « Apparition » : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond (capture 005) | journal v1 « Apparition · Glissé depuis la gauche » | — | Liste lue exactement. « Montée avec rebond » et « Zoom avec rebond » (utiles pour les chiffres) sont visibles dès ici ; non retenu en RATE car les chiffres n'ont jamais été atteints, faute d'actions. |
| 11 / #18 | 02:56 | Choisir | SAT | — | Champ « Glissé depuis la g… », badge « +1 animation » en tête du panneau, lien « Voir l'effet » (capture 006) | « Ça a pris, c'est un progrès. » | — | |
| 11 / #18 | 02:56 | Lancer | MM | 1 | Section Animation du panneau photo, coupée sous « Apparition » (capture 006) | « je n'ai pas eu à choisir de déclencheur comme au clic ou au survol […] je ne sais pas bien ce qui déclenche ce mouvement » | — | Attente Figma « déclencheur puis animation » contredite : l'apparition s'applique sans étape de déclencheur ; le champ « Démarre » existe mais est sous le pli (il n'apparaît qu'aux captures 010/011). Coût : les deux actions suivantes (« Voir l'effet »). |
| 12-13 / #19-#21 | 02:57-03:15 · UTC 09:20:44 | Vérifier | VERIF-E ; HES | 1 | Lien « ▷ Voir l'effet » en bas à droite du panneau (captures 006, 007) | « Rien ne semble avoir bougé entre les deux captures, mais je ne peux pas être sûre » | PERC | Deux actions sans modification ni nouvel endroit ; captures 006 et 007 identiques (seul le bandeau défilant a changé). Perte due au dispositif (pas de perception continue) : 2 actions. Supposition correctement signalée. |
| 15 / #24 | 03:33 | Découvrir | RATE (sous réserve) | 2 (hésitation 1-2) | Liens « ↗ Tester sur le site » et « Ouvrir dans le mode Animation » en bas de la section Animation du panneau « Titre 2 » (capture 008 ; revus en 012, 013, 020) ; onglet « Animation » dans la barre du haut (capture 001, remarqué à 01:23 : « ça me rassure ») | « Je vois aussi des liens « Tester sur le site » et « Ouvrir dans le mode Animation » tout en bas. » | — | Elle cherche « la vue d'ensemble façon prototype » (04:28) et dira en D-FIN-3 qu'il n'y a « pas un seul endroit où je peux voir et régler toute la scène d'un coup », sans jamais ouvrir ce mode. Réserve : les captures ne montrent pas ce mode, je ne peux pas affirmer qu'il aurait mené au but ; coût non mesurable. |
| 18 / #28 | 03:46 · UTC 09:21:34 | Choisir | — (progrès) | — | Liste « Apparition » du titre (capture 009) | journal v2 « Apparition · Fondu en montant » | — | Même schéma que la photo, en 5 actions. |
| 19 / #29-#32 | 03:52-04:28 · UTC 09:21:57 | Régler | DEC | — | Champ « Démarre : quand il entre dans l'écran », « Vitesse Rapide / Normale / Lente », « 700 ms » (capture 010, loupe 011) | « un champ « Démarre : quand il entre dans l'écran ». Ça c'est plus clair pour moi, même si je n'aurais pas dit ça comme ça — je comprends que c'est le déclencheur. » | PERC (texte coupé en bas de la capture ; loupe nécessaire) | Répond à son incertitude de 02:56. Le champ de durée en ms est vu et jamais modifié (700 ms conservés partout). |
| 19 / #31-#32 | 04:28 | Composer | RATE | 2 (hésitation 1-2) | Bouton « Pareil pour Paragraphe « Aurèle et Nils ont… » sous le menu « Apparition » du titre (loupe 011) | « un bouton « Pareil pour Paragraphe « Aurèle et Nils ont... » » qui doit permettre de recopier le réglage sur un autre élément » | — | Accès lisible, compris, non utilisé ; le paragraphe est ensuite réglé à la main en 5 actions (34-38). Réserve : le bouton aurait recopié « Fondu en montant », alors qu'elle voulait « Fondu » ; et en T4-b elle dit ne pas savoir « s'il aurait réglé que l'apparition ou aussi le démarrage et le rejouer » : le libellé ne dit pas sa portée. Coût estimé 2-3 actions. |
| 20-21 / #33-#35 | 04:28-04:53 · UTC 09:22:15 | Composer | — (attente partiellement satisfaite) | 0 | Panneau « La maison · Boîte », section « Scène » : « 2 lancements séparés (« Photo de la salle », Titre 2 « Une cuisine de… ») », deux barres « 0 → 700 ms » (capture 012) | « je m'attends à basculer vers une vue qui montre tous les éléments animés de la section ensemble » → « une section « Scène » qui liste « 2 lancements séparés » » | — | La vue liste bien les éléments animés avec leurs barres ; elle ne propose pas, sur cette capture, de commande sur les éléments (le panneau de la section n'a que ses propres menus Apparition / Quand la souris / En continu). Pas de MM : l'attente « voir » est remplie ; « régler » n'avait pas été formulé avant. |
| 22 / #36-#37 | 04:54-05:18 · UTC 09:22:41 | Composer | DEC ; SAT | — | Avertissement en orange sous les barres : « 2 lancements séparés : chaque délai se compte depuis l'entrée à l'écran de son propre élément […] faites démarrer chaque élément « après » le précédent, ou « quand « La maison » entre dans l'écran ». » puis « Paragraphe « Aurèle et Nils ont… » ne bouge pas · « Chiffres » ne bouge pas. » (loupe 013) | « Bon, ça c'est un message très utile, presque une instruction : le logiciel me dit lui-même comment faire une vraie scène. » | PERC (« un texte que je n'arrive pas à lire complètement », loupe nécessaire) | Découverte du mécanisme « après ». Elle retient la première option (« après ») et non la seconde (« quand « La maison » entre dans l'écran »), qui était celle de C2. |
| 23-26 / #38-#43 | 05:19-05:50 · UTC 09:23:07-09:23:28 | Lancer | HES | 1 | Panneau « Titre 2 », champ « Démarre » coupé par le bas du panneau (capture 014) ; après défilement du panneau : « Démarre », « Délai 0 ms », « Rejouer une seule fois / à chaque passage » (capture 015) | « Je dois descendre un peu dans le panneau pour atteindre le champ « Démarre » entièrement visible. » | — | Retour obligé sur le titre (la vue Scène ne donne pas accès à son « Démarre »), puis 2 actions (défilement + capture) pour amener le champ sous les yeux : les réglages de lancement sont sous le pli du panneau. |
| 27-29 / #44-#47 | 05:51-06:07 · UTC 09:23:55 | Composer | — (progrès) | 0 | Liste « Démarre » : quand il entre dans l'écran · dès l'ouverture de la page · quand « Texte » entre dans l'écran · quand « Contenu » entre dans l'écran · quand « La maison » entre dans l'écran · après « Photo de la salle » · en même temps que « Photo de la salle » (capture 016) | journal v3 « Apparition · démarre après « Photo de la salle » » ; « c'est exactement ce qu'il me faut : le titre commence après la photo » | — | Choix conforme à son intention. Observation sans code : l'option de section était visible juste au-dessus ; l'événement retenu reste l'entrée de la photo (C2 non rempli même pour ces deux éléments). |
| 30-31 / #48-#51 | 06:13-06:41 · UTC 09:24:16 | Vérifier | VERIF-E ; SAT | — | Phrase de résumé sous « Rejouer » : « Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), une seule fois. » (loupe 018) | « Le chaînage fonctionne bien. » | PERC (« un texte récapitulatif en dessous que je n'arrive pas à lire net », loupe nécessaire) | Vérification par lecture, dans la vue d'édition. La loupe lui montre aussi « Rejouer : une seule fois » sélectionné, d'où l'action suivante. |
| 32-33 / #52-#54 | 06:42-07:15 · UTC 09:24:29 | Lancer | — (progrès) | 0 | Bouton « à chaque passage » en surbrillance dans le panneau « Titre 2 » (capture 019) | journal v4 « Apparition · à chaque passage » [node.set rh_about_img:triggers] | — | Le clic, fait depuis le panneau du titre, modifie le déclencheur de la photo (le titre est une piste de l'animation de la photo). Résultat conforme à l'intention (« que ça recommence à chaque retour ») ; elle ne remarque pas le déplacement, qui n'a ici aucune conséquence. |
| 33 / #54 | 07:15 | Composer | — | 0 | — | « il me reste peu d'actions par rapport à tout ce qu'il y a à faire, je dois avancer plus vite » | conscience du budget (dispositif) | Gestion du budget de 40 actions par la participante, sans équivalent chez un utilisateur réel. Voir section 6. |
| 34-38 / #55-#61 | 07:16-08:02 · UTC 09:25:03-09:25:49 | Choisir | — (progrès, coût de la RATE de l'action 19) | — | Panneau « Paragraphe « Aurèle et Nils… », section Animation déjà ouverte, menu « Apparition » (captures 020, 021) | journal v5 « Apparition · Fondu » | — | 5 actions pour le troisième élément, même schéma que les deux premiers. « Démarre » et « Rejouer » ne seront pas atteints. |
| 40 / #62-#63 | 08:11-08:36 · UTC 09:25:59 | Vérifier | MM | 3 | Panneau du paragraphe : « +1 animation », « Fondu », « Pareil pour « Chiffres » », « 700 ms », « Démarre : quand il entre dans l'écran » (capture 022) | « sur le moment je pensais que ce serait réglé automatiquement pour toute la scène une fois le premier élément fait » | — | Attente contredite par la capture 022 et le journal (déclencheur propre au paragraphe, une seule fois) : chaque nouvelle apparition repart sur son propre élément et « une seule fois », même quand une scène « après » existe déjà dans la section. Conséquence : lancements séparés, paragraphe avant le titre (C2, C3 non ; C6 partiel). Gravité 3 (critères non remplis) ; l'échec lui-même est porté par la ligne BUD. |
| 40 / #63 | 08:36 | Vérifier | — | 0 | « Pareil pour « Chiffres » » (capture 022) | « je vois aussi un bouton « Pareil pour « Chiffres » » qui aurait pu m'aider à aller plus vite, mais je n'ai pas eu le temps de m'en servir » | — | Vu à la 40e action ; aucune action restante, donc pas codé RATE. Deuxième rencontre du bouton. |
| 40 / #63 | 08:36 → 09:13 | — | BUD | 4 | — | « FIN : budget · ACTIONS : 40 » ; modérateur : « Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. » | — | Cause de l'échec : 40 actions consommées pour 3 éléments sur 6 (dont 22 captures/loupes), sans fausse piste ni erreur. Événement d'origine de la chaîne : le coût par élément du parcours « sélectionner → Apparition → défiler → Démarre → Rejouer » (lignes RATE action 19, HES actions 23-26, MM action 40). |
| 40 / #63 | 08:36 | — | agacement 2 | — | — | « Mon agacement est à 2, plutôt raisonnable » | — | Seul repère d'agacement de la tâche (ceux des 10e, 20e et 30e actions manquent) ; < 4, pas de FRU. |

Codes non attribués et pourquoi : FP 0 (aucune suite d'actions dans un endroit sans issue ; le détour par « Voir la scène » a donné l'information décisive) ; ERR 0 (chaque entrée du journal correspond à l'intention annoncée juste avant) ; COLL 0 ; VOC 0 (« Démarre : quand il entre dans l'écran » est compris, « Boîte » et « lancements séparés » sont lus sans contresens) ; BLOC 0.

---

## 4. Codes déclaratifs (marqués « déclaratif »)

| Moment | Code | Étape | Citation | Commentaire |
|---|---|---|---|---|
| T4-SEQ (09:25) | SEQ 3 ; FRU | Composer | « il a fallu refaire les mêmes réglages à la main pour chaque élément un par un, et je n'ai pas eu le temps de finir » | déclaratif ; corrobore la ligne BUD. « Si ç'avait été juste la photo et le titre, j'aurais peut-être dit 5 ». |
| T4-a (10:45) | MM | Régler | « je changerais carrément le « Démarre » pour le faire partir « après la photo » plutôt qu'« après le titre » » | déclaratif, gravité 1 : le paragraphe enregistré n'est pas « après le titre » ; « diminuer » un délai déjà à 0 est sans objet. Mécanisme cohérent, état supposé incohérent (voir 2.5). |
| T4-b (10:45) | FRU | Composer | « devoir refaire le même petit parcours pour chaque élément — sélectionner, ouvrir Animation, choisir l'apparition, puis redescendre pour changer le « Démarre » et le « Rejouer » — sans qu'aucun réglage ne se propage tout seul au reste de la scène » | déclaratif ; corrobore HES 23-26 et MM 40. |
| T4-b (10:45) | (incertitude sur la portée de « Pareil pour … ») | Composer | « je ne sais pas s'il aurait réglé que l'apparition ou aussi le démarrage et le rejouer » | déclaratif ; explique la RATE de l'action 19 sans la fonder seule. |
| D-FIN-1 (11:36) | VAL+ | Découvrir | « ça a plutôt bien commencé, les mots utilisés sont compréhensibles » ; « ça a un bon potentiel » | déclaratif |
| D-FIN-1 (11:36) | VAL− | Composer | « dès qu'il a fallu enchaîner plusieurs éléments dans un ordre précis […] ça devenait long » ; « ce n'est pas encore aussi direct que ce à quoi je suis habituée » | déclaratif |
| D-FIN-2 (11:36) | SAT | Découvrir / Choisir | « quand je sélectionne un élément, je retrouve tout de suite un panneau à droite […] une section « Animation » clairement identifiée » ; « des noms simples comme « Glissé depuis la gauche » ou « Fondu en montant », ça je comprends tout de suite » | déclaratif ; corrobore la première action pertinente au rang 4. |
| D-FIN-2 (11:36) | SAT ; VAL+ | Composer | « le message qui m'expliquait, en phrases normales, qu'il fallait faire démarrer chaque élément « après » le précédent […] sans ce message je crois que je serais restée bloquée » | déclaratif ; corrobore DEC action 22. |
| D-FIN-3 (11:36) | FRU ; VAL− | Composer | « pas un seul endroit où je peux voir et régler toute la scène d'un coup, comme un scénario avec ses étapes dans l'ordre » ; « « Voir la scène » […] ce n'était que pour lire l'état, pas pour agir dessus directement » | déclaratif ; comportement associé : retour immédiat de la vue Scène vers le titre (action 23) ; mode Animation jamais ouvert (RATE action 15). |
| D-FIN-3 (11:36) | (incertitude « Pareil pour … ») | Composer | « je ne suis toujours pas sûre de ce que fait exactement le bouton « Pareil pour... », je ne l'ai jamais essayé » | déclaratif |
| D-FIN-10 (12:03) | VAL− ; FRU | Vérifier | « j'aurais aimé pouvoir tester en mode présentation […] plutôt que de deviner à partir de chiffres en millisecondes et de textes qui décrivent ce qui va se passer. J'ai vu un bouton « Tester sur le site » que je n'ai pas eu le temps d'essayer » | déclaratif ; comportement associé : aucun VERIF, « Tester sur le site » visible quatre fois et jamais utilisé. |
| D-FIN-10 (12:03) | VAL+ | Découvrir | « pour une freelance comme moi qui n'a jamais écrit de CSS, […] ce n'était pas si effrayant que ce que je craignais au départ, les mots restent humains la plupart du temps » | déclaratif |

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

### PC-1 · Composer une scène coûte un parcours complet par élément, sans propagation ; l'accès « Pareil pour … » est vu mais sa portée n'est pas lisible
- **Endroit** : panneau de droite, section « Animation » de chaque élément (menu « Apparition », puis, sous le pli, « Démarre » et « Rejouer ») ; bouton « Pareil pour … » sous « Apparition » (loupe 011, capture 022).
- **Étape** : Composer.
- **Cause apparente** : chaque élément demande la même suite (sélection, Apparition, défilement du panneau, Démarre, Rejouer), soit 5 à 12 actions avec les captures ; rien ne se propage aux voisins ; le seul raccourci visible (« Pareil pour … ») a un libellé qui ne dit pas ce qu'il copie, et la participante ne l'essaie pas.
- **Gravité maximale** : 4 (BUD → échec).
- **Lignes** : RATE action 19 ; HES actions 23-26 ; progrès 34-38 (coût) ; BUD action 40 ; déclaratif T4-SEQ, T4-b, D-FIN-1, D-FIN-3.
- **Test d'artefact** : A1 : non, le problème ne tient pas à la perception (mais le dispositif double le coût de chaque geste par une capture : 22 des 40 actions ; à rappeler dans l'interprétation du budget). A2 : aucun CONN ni PERS sur ces passages ; la conscience du budget (section 6) est un effet du dispositif qui a accéléré, pas causé, l'arrêt. A6 : aucun MOD avant. A8 : aucun HALL. → problème d'interface, à confronter aux autres séances.

### PC-2 · Une nouvelle apparition repart « quand il entre dans l'écran », « une seule fois », même quand une scène « après » existe déjà dans la section
- **Endroit** : champs « Démarre » et « Rejouer » du panneau du paragraphe (capture 022) ; avertissement de la vue Scène (loupe 013).
- **Étape** : Lancer.
- **Cause apparente** : valeurs par défaut par élément ; la participante s'attendait à ce que le lancement et la répétition soient « réglés automatiquement pour toute la scène une fois le premier élément fait » ; l'avertissement de la scène lui a expliqué le mécanisme, mais il faut le refaire à chaque élément.
- **Gravité maximale** : 3 (C2, C3 non remplis, C6 partiel).
- **Lignes** : MM action 11 (pas d'étape de déclencheur), MM action 40 ; DEC action 22 (l'avertissement, qui est aussi la partie qui marche) ; déclaratif T4-b.
- **Test d'artefact** : A1 : non. A2 : non. A6 : non. A8 : non. → problème d'interface (lié à PC-1, séparé parce que l'endroit et la cause diffèrent : ici les valeurs par défaut, là le coût de répétition).

### PC-3 · La vue d'ensemble cherchée n'est pas reconnue : « Voir la scène » est lue puis quittée, le mode « Animation » n'est jamais ouvert
- **Endroit** : onglet « Animation » dans la barre du haut (capture 001) ; lien « Ouvrir dans le mode Animation » en bas de la section Animation (captures 008, 012, 013, 020) ; panneau « La maison · Scène » (capture 012).
- **Étape** : Composer.
- **Cause apparente** : la participante veut « une vue globale où je pourrais glisser les choses dans l'ordre » ; elle trouve « Voir la scène », y lit l'état et l'avertissement, puis revient sur les éléments un par un ; l'entrée vers le mode Animation reste inexplorée bien que vue cinq fois et remarquée dès la première capture (« ça me rassure »).
- **Gravité maximale** : 2 (coût non mesurable ; sous réserve).
- **Lignes** : RATE action 15 ; attente action 20-21 ; déclaratif D-FIN-3.
- **Test d'artefact** : A1 : non. A2 : non (la persona cherche « un mode « prototype » séparé » ; elle en a repéré l'onglet et ne l'a pas ouvert, ce qui est une donnée, pas un écart). A6 : non. A8 : non. Réserve : les captures ne montrent jamais ce mode ; on ne peut pas dire ici s'il aurait répondu au besoin. → problème d'interface possible, à confirmer sur d'autres séances.

### PC-4 · Les réglages de lancement sont sous le pli du panneau
- **Endroit** : bas de la section Animation (captures 006, 010, 014 : « Démarre » coupé ; captures 015, 022 après défilement).
- **Étape** : Lancer.
- **Cause apparente** : « Démarre », « Délai », « Rejouer » ne sont visibles qu'après avoir fait défiler le panneau, et ne le sont pas du tout à la capture 006 (photo), d'où « je ne sais pas bien ce qui déclenche ce mouvement ».
- **Gravité maximale** : 1 (2 actions), mais contribue à PC-1 et PC-2.
- **Lignes** : MM action 11 ; HES actions 23-26 ; loupe action 19.
- **Test d'artefact** : A1 : partiellement — à pleine résolution le panneau serait le même (la capture est l'écran entier réduit), donc non ; l'interface n'offre pas d'autre représentation du lancement avant le défilement. A2, A6, A8 : non. → problème d'interface, cosmétique ici.

### PC-5 · Vérification : « Voir l'effet » sans retour visible, aucune vérification visiteur
- **Endroit** : lien « Voir l'effet » (captures 006, 007) ; lien « Tester sur le site » (captures 008, 012, 013, 020).
- **Étape** : Vérifier.
- **Cause apparente** : l'effet joué dans l'éditeur n'est pas observable sur une image fixe ; la participante ne tente pas « Tester sur le site ».
- **Gravité maximale** : 1 (2 actions).
- **Lignes** : VERIF-E/HES actions 12-13 ; VERIF-E action 30-31 ; déclaratif D-FIN-10.
- **Test d'artefact** : A1 : **oui** (le mouvement en continu aurait répondu), et l'interface offre une autre représentation, que la participante a utilisée ensuite (phrase de résumé, loupe 018 ; barres de la scène, capture 012). → **artefact probable, signal faible**. Le comportement « aucun VERIF » reste une donnée pour QR3.

---

## 6. Écarts au protocole et au dispositif ; limites de la lecture

- **MOD (forme, hors tâche)** : le modérateur groupe les questions en un seul message (T4-SEQ + T4-R ; T4-a + T4-b ; D-FIN-1 + 2 + 3) sans « Merci. » entre chaque, alors que 4.3.D/G prévoient une question, une réponse, « Merci. ». Aucune parole hors script, aucune relance ; aucun effet sur la tâche (tout est postérieur au BUD). Le message d'arrêt et la transition sont conformes. Aucune relance « Pouvez-vous m'en dire un peu plus ? » sur T4-R, ce qui laisse la dimension « Combien » à 0 : à signaler pour l'arbitrage du score.
- **MOD (cadrage, segment 1)** : le message de lancement dit à la participante que l'étude sert « pour repérer où de vrais utilisateurs se perdraient » — une indication générale du but de l'étude, contraire à la règle 9 de 3.2. Sans effet identifiable ici ; commun au dispositif.
- **HORS** : la trace signale la lecture de `prompt5-p2.md` comme « écart ». C'est la consigne d'incarnation demandée par le message de lancement, pas du code, de la documentation ni une inspection : **pas un HORS** au sens de 8.2. Aucune autre action interdite.
- **PERS** : aucun écart à la manière d'explorer (sélection d'abord, panneau à droite, lecture des libellés, loupe sur les petits textes, comparaison avant/après par captures, verbalisation des écarts à Figma : 01:42, 02:56). Les gestes Figma (Échap, double-clic) et le survol des icônes n'ont pas été tentés ; sans effet. Règle d'abandon jamais atteinte (progrès visible tout du long). Écart à la consigne d'incarnation (règle 6 de 3.2) : un seul point d'agacement, à la 40e action, au lieu d'un tous les 10.
- **CONN** : aucun. Les mots de la liste inconnue ne sont pas employés ; « chaînage », « déclencheur », « scène » sont soit connus, soit lus à l'écran.
- **PERC** : actions 12-13 (« Voir l'effet » sans perception possible) ; trois loupes nécessaires pour lire des textes coupés ou trop petits (011, 013, 018), chaque fois lisibles après agrandissement (PERC au sens strict non rempli, coût 1 action chacune).
- **HALL** : une citation inexacte du texte d'aide (action 7 : « au survol ou au clic, en choisir »), gravité 0. Toutes les autres descriptions concordent avec les captures ; les suppositions de mouvement sont signalées comme telles (03:15).
- **Conscience du budget (dispositif)** : la participante compte ses actions et pilote la fin de tâche sur ce compte (07:15 « je dois avancer plus vite » ; 08:11 « ma dernière action pour vérifier »). Un utilisateur réel n'aurait pas cette borne ; le statut E reste valable (site enregistré), mais la vitesse d'arrêt est en partie un artefact. Le compte affiché a en outre glissé d'une unité entre le 21e et le 39e geste avant de se resynchroniser à 40 ; le compte du dispositif (log.jsonl : 40) fait foi.
- **Limites de ma lecture** : les captures 800 × 500 rendent illisibles sans loupe les textes du panneau (j'ai vérifié les libellés cités sur les loupes 011, 013, 018 et sur les captures les plus lisibles) ; la capture 019 montre « à chaque passage » en surbrillance avec une étiquette dupliquée dessous que je ne sais pas interpréter (infobulle probable, sans effet) ; « Rejouer » du paragraphe n'est visible sur aucune capture (l'état « une seule fois » vient du journal et de la fiche) ; je ne peux rien dire des fonctions jamais affichées (champ sur un chiffre, ligne de temps). Aucune capture de la visite du préparateur n'est jointe : les temps de visite (877, 1 599, 726 ms) sont pris de la fiche.
