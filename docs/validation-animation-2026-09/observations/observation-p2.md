# Observation · P2 · Claire Morvan (designer graphique) · vague 3

Codage par l'observateur de la séance, d'après le protocole remis à l'observateur (sections 3, 4.3, 4.4, 5, 8, 9, 11), l'addendum 3, la trace `traces3/trace-p2.md`, les captures `shots3/p2-t*/` et la fiche `fiches3/fiche-lecture-p2.md`.

**Convention de numérotation.** Les numéros d'action de ce document sont les actions réelles comptées par le dispositif (appels d'outil hors 👁), recomptées appel par appel. Le compte annoncé par la participante entre crochets est rappelé quand il diffère. Le repère `▶#n` est le numéro d'appel d'outil de la trace.

**Convention de codage HES.** La participante lit systématiquement une capture puis une loupe avant d'agir (manière d'explorer de sa fiche). Ces paires lecture/agrandissement remplissent à la lettre la définition de HES (deux actions consécutives sans modification ni ouverture d'un nouvel endroit) sans porter aucune incertitude ni coût : elles sont comptées en bloc, gravité 0, et seules les hésitations avec incertitude verbalisée ou coût ≥ 3 actions reçoivent une ligne propre. Hésitation de codage assumée et signalée ici.

---

## 1. Résumé de la séance

Séance complète, cinq missions dans l'ordre T1, T3, T5, T2, T4, 249 appels d'outil, 48 min 39 s de trace, aucune aide demandée ni donnée (aucun « je suis bloquée » de toute la séance), aucune action interdite. La participante applique sans écart sa méthode Figma : elle sélectionne l'élément, trouve le panneau de droite, déplie la rubrique « Animation », lit les libellés, agrandit, et vérifie par la phrase récapitulative du panneau. Quatre missions sur cinq sont réussies complètement, sans aide, en 24 à 33 actions : T1 (fondu en montant à l'entrée du titre dans l'écran), T3 (titre ralenti à 1 120 ms et les deux boutons enchaînés après lui), T5 (pulsation retirée, arrivée conservée, soulèvement au survol), T2 (déclencheur du groupe « Plats » passé de « dès l'ouverture de la page » à « quand il entre dans l'écran », diagnostic juste par comparaison des réglages). La cinquième, T4 (scène à six éléments), échoue : deux éléments sur six sont traités et la mission s'arrête au budget, dépassé de quatre actions (44 au lieu de 40), après six clics qui n'atteignent pas leur cible dans la rubrique « Démarre » du titre. Aucune fausse piste dans toute la séance, aucune modification collatérale présente dans un site final, un seul mot de vocabulaire non compris (« Netteté »). Deux plaintes reviennent de bout en bout : n'avoir jamais vu une seule animation se jouer, et le comportement du champ « Démarre » en dernière mission — ce dernier tenant pour l'essentiel à une adaptation du dispositif (addendum 3, point 2).

---

## 2. Par tâche

### T1 · Premier élément qui bouge (position 1)

**Statut : C** (réussite complète, aucune aide). **Accord** avec le statut proposé par le préparateur.
Lecture des critères dans le site enregistré (v1) : R1 — le titre `rh_about_h2` porte une arrivée visible (opacité 0 → 1 et `translateY(28px)` → 0, donc décalage ≥ 8 px) ✔ ; R2 — déclencheur `on=inView` sur le titre lui-même ✔ ; R3 — durée totale 0 + 700 ms, dans 200–2 500 ms ✔ (visite du préparateur : ~870 ms, toujours dans la fenêtre) ; R4 — aucun mouvement permanent ✔ ; R5 — une seule entrée au journal, rien hors de La maison ✔.

- **Mode de fin** : terminé déclaré (« J'ai terminé », 10:39).
- **Aides** : aucune (niveau maximal : néant).
- **Actions totales** : 33 réelles (compte de la participante : 33 — identique) ; 15 captures, 4 loupes, 7 clics, 6 défilements, 1 survol.
- **Actions perdues du fait du dispositif** : 17 sur 33 (actions 13–17, tentative de voir l'animation par le triangle « Jouer dans le canevas » ; actions 20–31, six défilements et six captures dans l'aperçu), aucune information obtenue sur le mouvement.
- **Première action pertinente** : action 2 (▶#3, clic sur le titre) — la capture 002 qui suit montre, dans le panneau de l'élément visé, une rubrique « Animation » repliée. Lecture plus stricte (premier écran entièrement consacré au mouvement) : action 5 (▶#8) et capture 004.
- **Actions jusqu'à la réussite** : 10 (▶#16, choix « Fondu en montant », journal v1 09:07:00) ; les critères sont remplis à partir de là et jusqu'à la fin.
- **Captures et loupes** : 15 captures, 4 loupes.
- **FP** : 0 ; actions perdues en fausses pistes : 0.
- **HES** : 2 substantielles (actions 13–17 ; actions 20–31) + 4 paires de lecture (gravité 0).
- **ERR** : 0 (dont non récupérées : 0).
- **COLL-D / COLL-ND** : 0 / 0.
- **RATE** : 0.
- **VERIF** : oui, rang 18 (▶#29, ouverture de l'aperçu, puis défilement jusqu'au titre, captures 013, 014, 016, 017, 018) — vérification en conditions de visiteur, avant « J'ai terminé ». VERIF-E : aucune distincte.
- **VOC** : aucun mot dans cette tâche.
- **SEQ** : 6.
- **Concordance du récit T1-R : 7 / 8**, écart matériel **non**.
  - Quoi **2** : « il n'y a que ce titre qui est concerné » ; site : une seule animation, sur `rh_about_h2`.
  - Quand **2** : « au moment précis où le titre entre dans l'écran » ; site : `on=inView` sur le titre.
  - Comment **2** : « apparaître en fondu, en montant légèrement » ; site : preset `fade-up`, opacité 0 → 1 et `translateY(28px)`.
  - Combien **1** : nombre de fois exact (« ça ne joue qu'une seule fois » ; site : une seule fois), durée absente du récit.
  - Réserve énoncée d'elle-même : « je n'ai jamais vu le mouvement se faire réellement sous mes yeux » — cohérente avec les captures.
- **Mesures propres T1** : première action pertinente au rang 2 ; VERIF présent avant « J'ai terminé » ; moment de lancement choisi = « quand il entre dans l'écran », conservé tel qu'il était proposé par défaut (capture 008-loupe) et non recherché.

### T3 · Donner du rythme à l'accueil (position 2)

**Statut : C** (réussite complète, aucune aide). **Accord** avec le préparateur.
Lecture dans le site v3 : R1 — le titre `rh_hero_h1` garde `on=load`, images-clés 0 → 1 120 ms, donc durée du mouvement 1 120 ms, dans 900–4 000 ms ✔ ; R2 — les deux boutons portent chacun une piste `start={"after":"kfMtTydIx76G"}`, départ à 1 120 ms, soit 100 % de la fin du titre (seuil : 80 % de 1 120 = 896 ms) et fin à 1 620 ms, sous 6 000 ms ✔ ; R3 — le paragraphe garde son fondu 500 ms au chargement ✔ ; R4 — aucun ajout sur le surtitre, la photo, la pastille ni hors du héros ✔.

- **Mode de fin** : terminé déclaré (17:54).
- **Aides** : aucune.
- **Actions totales** : 25 réelles (compte de la participante : 25) ; 12 captures, 4 loupes, 9 clics.
- **Actions perdues du fait du dispositif** : 0.
- **Première action pertinente** : action 2 (▶#55, clic sur le grand titre) — capture 002 et loupe 003 montrent l'animation existante de l'élément visé.
- **Actions jusqu'à la réussite** : 19 (▶#82, « après Titre 1 » posé sur « Voir la carte », journal v3 09:19:19). R1 est vrai dès l'action 5 (▶#60, v1), R2 pour le premier bouton à l'action 12 (▶#71, v2), pour le second à l'action 19.
- **Captures et loupes** : 12 captures, 4 loupes.
- **FP** : 0. **HES** : 4 paires de lecture (gravité 0), aucune substantielle. **ERR** : 0. **COLL** : 0 / 0. **RATE** : 0.
- **VERIF** : oui, rang 22 (▶#87, aperçu ouvert), mais **sans parcours utile** : une seule capture (014) sur le haut de page, puis retour ; elle dit elle-même s'en remettre à la phrase du panneau (« Je me fie à la phrase récapitulative … plutôt qu'à mes captures »). Codée VERIF (vue du site hors outils d'édition, élément concerné à l'écran), avec la réserve que rien n'y a été constaté.
- **VOC** : aucun.
- **SEQ** : 6.
- **Concordance du récit T3-R : 6 / 8**, écart matériel **non**.
  - Quoi **1** : titre et deux boutons nommés exactement ; le paragraphe, qui porte toujours un fondu de 500 ms au chargement, est absent du récit (omission, pas erreur). Hésitation signalée : « d'abord le titre tout seul » pourrait se lire comme une affirmation fausse (le paragraphe arrive en même temps que le titre) ; je retiens l'omission, faute d'une négation explicite.
  - Quand **2** : « quand un visiteur arrive sur la page » puis boutons « une fois que le titre a fini » ; site : `on=load` et `start: after` le titre.
  - Comment **2** : « en fondu, en montant légèrement » pour le titre (exact) ; « en fondu eux aussi » pour les boutons (vague mais compatible : ils sont en fondu en montant).
  - Combien **1** : durées exactes (« environ 1,1 seconde », « une demi-seconde de plus », « environ 1,6 seconde » ; site : 1 120, 500, 1 620 ms) ; nombre de fois absent du récit.
- **Mesures propres T3** : R1 vrai à l'action 5, R2 vrai à l'action 19, **aucune aide à ces deux moments** (niveau 0). Estimation T3-a : « environ 1,6 seconde » contre 1 620 ms enregistrés et ~1 590 ms à la visite → écart ~1 %, **juste**, et explicitement lue dans le panneau et non estimée à l'œil (T3-b : « je me suis fiée au chiffre »).

### T5 · Calmer la pastille, réveiller le bouton (position 3)

**Statut : C** (réussite complète, aucune aide). **Accord** avec le préparateur.
Lecture dans le site v2 : S1 — le déclencheur `vd1lkjF_CIbb` (pulsation en boucle) a disparu ; plus aucun mouvement joué plus d'une fois sur la pastille ✔ ; S2 — l'arrivée `Gusn3UtkpQVn` (zoom, `on=load delay=300`, 500 ms) est intacte, durée totale 800 ms, dans 200–1 500 ms ✔ ; S3 — `rh_hero_b1` (bouton du héros, pas celui de l'en-tête) porte `on=hover reverseOnLeave`, `translateY(-4px)` en 250 ms : décalage ≥ 2 px, atteint en ≤ 800 ms, retour à la sortie, pas de répétition → **S3 entier** ✔ ; S4 — aucun autre changement ✔.

- **Mode de fin** : terminé déclaré (23:43).
- **Aides** : aucune.
- **Actions totales** : 24 réelles (compte de la participante : 24 ; sa numérotation saute de [20] à [23], sans effet sur le total) ; 11 captures, 3 loupes, 9 clics, 1 survol.
- **Actions perdues du fait du dispositif** : 0 — c'est la seule tâche où une vérification perceptive aboutit (actions 20–22).
- **Première action pertinente** : action 2 (▶#95, clic sur la pastille) — capture 002 montre « 2 animations » et « En continu : Pulsation ».
- **Actions jusqu'à la réussite** : 15 (▶#115, choix « Soulever », journal v2 09:24:36) ; S1 est vrai dès l'action 7 (▶#103, v1).
- **Captures et loupes** : 11 captures, 3 loupes.
- **FP** : 0. **HES** : 3 paires de lecture (gravité 0). **ERR** : 0. **COLL** : 0 / 0. **RATE** : 1 (voir lignes de codage, prudence explicitée).
- **VERIF** : oui, rang 18 (▶#120, aperçu) avec survol effectif du bouton (action 20) et loupe comparative (action 22) ; c'est la seule vérification de la séance qui produit une constatation. VERIF-E : aucune.
- **VOC** : aucun.
- **SEQ** : 6.
- **Concordance du récit T5-R : 8 / 8**, écart matériel **non**.
  - Quoi **2** : pastille + bouton « Réserver une table », et mention exacte que « Voir la carte » ne fait rien ; site : deux déclencheurs, exactement ceux-là.
  - Quand **2** : « à l'ouverture de la page » pour la pastille, « quand un visiteur passera sa souris » pour le bouton ; site : `on=load delay=300` et `on=hover`.
  - Comment **2** : « arriver en zoom », « se soulever légèrement … il redescendra à sa place normale » ; site : preset `zoom` et `translateY(-4px)` avec `reverseOnLeave`. Réserve : la « petite ombre en dessous » qu'elle ajoute n'appartient pas à l'animation enregistrée (seul `translateY` y figure) ; la capture 013-loupe montre bien, sous le bouton survolé, une zone sombre absente sous « Voir la carte », ce qui renvoie au style de survol livré du bouton et non à l'animation posée. Ce n'est donc ni une hallucination ni une manière de bouger fausse.
  - Combien **2** : « en un quart de seconde à peu près » (site : 250 ms) ; nombre de fois exact pour les deux (« elle va rester tranquille, elle ne pulsera plus en boucle »). La durée de l'arrivée de la pastille est absente ; jugée non déterminante.
- **Mesures propres T5** : S1 ✔, S2 ✔, S3 ✔ (entier, pas « à moitié ») notés séparément. S2 **n'a jamais été perdu en cours de tâche** : le journal ne contient qu'une opération sur la pastille (v1 « En continu · aucun »), l'arrivée n'a jamais été touchée. T5-a affirme l'arrêt du mouvement permanent et le site le confirme : **pas de discordance**. Aucune confusion entre le bouton du héros et celui de l'en-tête (clic à 225 243, `rh_hero_b1`).

### T2 · Ce que voit vraiment le client (position 4)

**Statut : C** (réussite complète, aucune aide). **Accord** avec le préparateur.
Lecture dans le site v1 : R1 — la liste `rh_dishes_list` porte l'arrivée visible de ses enfants (opacité 0 → 1, `translateY(28px)`) ✔ ; R2 — déclencheur passé de `on=load` à `on=inView` ✔ ; R3 — 600 ms, dans 200–2 500 ms ✔ (visite : ~1 030 et ~1 080 ms, toujours dans la fenêtre) ; R4 — le surtitre « Cette saison » et le titre « Quelques plats signature » gardent leur arrivée `on=inView` inchangée ✔ ; R5 — une seule entrée au journal, rien hors de la section ✔.

- **Mode de fin** : terminé déclaré (32:19).
- **Aides** : aucune.
- **Actions totales** : 33 réelles (compte de la participante : 33) ; 15 captures, 4 loupes, 9 clics, 5 défilements.
- **Actions perdues du fait du dispositif** : 6 (actions 18–23 : détection et correction d'un clic tombé une ligne trop bas dans la liste « Démarre », là où 3 actions auraient suffi).
- **Première action pertinente** : action 8 (▶#142, clic sur la première carte de plat) — capture 005 montre, pour l'élément visé, la note « Arrive avec « Plats » … Au chargement de la page ». L'action 6 (clic sur le titre voisin, élément non visé mais servant de référence) n'est pas comptée comme pertinente au sens de 9.2.
- **Actions jusqu'à la réussite** : 23 (▶#166, « quand il entre dans l'écran », journal v1 09:32:49).
- **Captures et loupes** : 15 captures, 4 loupes.
- **FP** : 0. **HES** : 1 substantielle (actions 18–22) + 4 paires de lecture (gravité 0). **ERR** : 1 (action 17), récupérée seule → **0 non récupérée**. **COLL** : 0 / 0. **RATE** : 0.
- **VERIF** : oui, rang 26 (▶#171, aperçu puis deux défilements jusqu'à la section, captures 016 à 018) — **après** la modification ; elle n'y constate que l'intégrité de la mise en page. **VERIF-E** : rang 8 (lecture comparée des panneaux du titre puis de la carte de plat), c'est là que se fait tout le diagnostic.
- **VOC** : aucun.
- **SEQ** : 4 (la note la plus basse des quatre missions réussies).
- **Concordance du récit T2-R : 3 / 8**, écart matériel **non**.
  - Quoi **1** : « le titre » et « les trois plats » ; le surtitre « Cette saison », qui porte aussi un fondu à l'entrée dans l'écran, est absent (omission, pas erreur).
  - Quand **1** : « au moment où cette section arrive à l'écran » ; site : trois déclencheurs distincts, chacun sur son propre élément (le surtitre, le titre avec 100 ms de retard, la liste). Vague mais compatible.
  - Comment **1** : « en fondu » pour le titre et les plats ; site : fondu **en montant** (opacité + 28 px). Vague mais compatible.
  - Combien **0** : ni durée ni nombre de fois dans le récit.
- **Mesures propres T2** : diagnostic (T2-a) **juste** — il désigne explicitement le moment de lancement et sa conséquence : « les plats faisaient leur petit mouvement tout de suite quand la page se charge … le temps qu'elle arrive à cet endroit, c'était déjà fini ». **VERIF avant la première modification : non** (aucune visite en conditions de visiteur avant l'action 23 ; T2-b : « En comparant les réglages, pas en regardant l'écran »). Modifications collatérales encore présentes dans le site final : **aucune**.

### T4 · La maison racontée comme une scène (position 5)

**Statut : E** (échec), **mode de fin : budget** (BUD), budget dépassé. **Accord** avec le préparateur.
Lecture dans le site v6 : deux éléments visés sur six portent un mouvement (photo, titre) → **C1 non** ; les six mouvements ne sont pas lancés par un même événement puisque quatre n'existent pas → **C2 non** ; l'ordre photo < titre < paragraphe < premier chiffre est impossible → **C3 non** ; **C3b non** ; fin du dernier mouvement à 1 400 ms, hors de la fenêtre 1 800–3 000 ms → **C4 non** ; photo `translateX(-40px)` ≥ 16 px ✔ et titre `translateY(28px)` ≥ 8 px ✔, mais paragraphe et chiffres absents et aucune courbe à dépassement → **C5 non** ; `once=false` → **C6 oui**. C1 et C3 non remplis : échec par la première clause de la règle.
**Profil de critères : C6 seul** (avec C5 rempli pour les deux éléments traités).

- **Aides** : aucune. Aucun « je suis bloquée » n'a été prononcé, y compris au plus fort de la difficulté (agacement déclaré 5 sur 5).
- **Actions totales** : **44 réelles** (compte annoncé par la participante : 40) ; 20 captures, 3 loupes, 18 clics, 3 défilements. La 40ᵉ action réelle est ▶#243 (43:05) ; les actions 41 à 44 (▶#244, #246, #247, #249) sont hors budget. Cause visible dans la trace : quatre actions faites sans numéro entre crochets (▶#194 et ▶#203, défilements du panneau ; ▶#227 et ▶#235, loupes), d'où un compte annoncé inférieur de 4 au compte réel.
- **Actions perdues du fait des clics qui n'atteignent pas leur cible** : **17**. De l'action 20 à l'action 44 elle dépense 25 actions là où 8 auraient suffi (ouvrir Apparition, capturer, choisir, capturer, ouvrir Démarre, capturer, choisir, capturer). Sans cette perte, il lui restait environ 17 actions pour le paragraphe et les trois chiffres.
- **Première action pertinente** : action 4 (▶#188, clic sur la photo) — capture 003 montre la rubrique « Animation » repliée dans le panneau de l'élément visé. Première entrée du journal concernant un élément visé : action 12 (▶#200, v1 « Glissé depuis la gauche »).
- **Actions jusqu'à la réussite** : **non atteint**.
- **Captures et loupes** : 20 captures, 3 loupes.
- **FP** : 0 ; actions perdues en fausses pistes : 0. (Elle n'est jamais allée dans un endroit qui ne pouvait pas mener au but : toute la perte est du ratage de cible dans le bon endroit.)
- **HES** : 1 substantielle (actions 28–35, dix actions sans aucune modification enregistrée) + paires de lecture.
- **ERR** : **6** (actions 22, 28, 31, 33, 38, 40) ; toutes récupérées seule (REC-S aux actions 26, 36, 44, 42) → **0 non récupérée**. La dernière récupération (action 44) est enregistrée au journal (v6) mais **non vérifiée** par la participante, qui s'arrête sans capture.
- **COLL-D / COLL-ND** : 1 / 0. À l'action 38, le déclencheur est déplacé sur le conteneur « Contenu » (`node.set rh_about_in:triggers`, v5), élément non visé par la consigne ; elle le remarque immédiatement (« Encore raté, j'ai pris « quand « Contenu » entre dans l'écran » ») et le retire à l'action 44 (v6). Absent du site final.
- **RATE** : 1 — le lien « Ouvrir dans le mode Animation », lisible en bas du bloc Animation dès la capture 005 (action 9) puis 009 (action 17), n'est utilisé à aucun moment d'une mission qui demande de composer six éléments dans le temps. Prudence : je ne peux pas attester du contenu de ce mode ; la clause « qui aurait mené au but » n'est donc pas établie, seule la visibilité et la lisibilité de l'accès le sont.
- **VERIF** : **aucune** ; VERIF-E : aucune non plus au sens strict (elle lit les phrases récapitulatives du panneau mais n'examine jamais la section dans son ensemble, ni dans l'éditeur ni en aperçu).
- **VOC** : aucun mot déclaré incompris pendant la tâche.
- **SEQ** : 2 (la note la plus basse de la séance).
- **Concordance du récit T4-R : 6 / 8**, écart matériel **non**.
  - Quoi **2** : photo et titre nommés, paragraphe et chiffres explicitement décrits comme non touchés ; site : deux pistes, exactement ces deux éléments.
  - Quand **1** : « quand le visiteur arrive sur la section « La maison » » ; site : déclencheur `on=inView` posé sur la photo elle-même, pas sur la section. Vague mais compatible. Pour le titre, elle refuse de se prononcer (« je ne sais pas dire s'il va démarrer après la photo ou non ») : incertitude assumée, ni exacte ni fausse.
  - Comment **2** : « glisser depuis la gauche » (site : `translateX(-40px)` → arrivée par la gauche) et « fondu en montant » pour le titre.
  - Combien **1** : nombre de fois exact (« ça recommencera à chaque fois qu'il revient dessus » ; site : `once=false`, confirmé par la visite du préparateur, rejeu à 149 → 701 ms) ; durées absentes.
  - Fait notable, en sens inverse de l'écart habituel : le site est **meilleur** que le récit. Le « démarre après « Photo de la salle » » du titre a bien été enregistré (v6, 09:46:39) alors qu'elle l'annonce comme incertain. L'interface ne lui a pas permis de constater une modification pourtant enregistrée — parce qu'elle s'est arrêtée sans capture, faute d'actions.
- **Mesures propres T4** : profil de critères = **C6 seul**. **Structure de lancement : un seul événement** — déclencheur `on=inView` sur la photo, piste du titre en `start={"after":…}` : c'est exactement la structure demandée par C2, appliquée à deux éléments sur six. T4-a **cohérente avec la structure enregistrée** (ouvrir le « Démarre » du paragraphe, le faire démarrer après un élément plus tôt ou réduire le délai, contrôler la phrase récapitulative) : pas de code MM.

---

## 3. Lignes de codage (format 8.5)

| Séance | Tâche | Pos. | N° action | Horod. | Étape | Code | Grav. | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P2 | T1 | 1 | 5 (▶#8) | 03:14 | Découvrir | DEC | 0 | ligne « Animation » repliée, en bas du panneau de droite | « Cette section « Animation » repliée … c'est exactement ce que je cherchais » | — | Trouvée à la 5ᵉ action, sans détour ; pas de mode séparé cherché ensuite. |
| P2 | T1 | 1 | 10 (▶#16) | 04:13 | Choisir | SAT | 0 | liste « Apparition » rendue dans la page | « Ce sont des mots que je comprends, pas de jargon bizarre » | — | Déclaratif pendant la tâche ; 10 choix lus et triés selon « sobre ». |
| P2 | T1 | 1 | 11–12 | 04:28 | Lancer | DEC | 0 | lignes Vitesse / Démarre / Délai / Rejouer (capture 007, loupe 008) | « Les réglages par défaut correspondent déjà à ce qu'il faut » | — | Le déclenchement « quand il entre dans l'écran » est obtenu sans être cherché. |
| P2 | T1 | 1 | 13–17 | 05:06–06:03 | Vérifier | HES | 2 | petit triangle à droite du menu « Apparition », infobulle « Jouer dans le canevas » | « je ne peux pas dire si l'animation a vraiment joué … je ne vois pas le mouvement » | PERC | 5 actions (survol, capture, loupe, clic, capture) sans information ; la capture 011 montre le titre identique. |
| P2 | T1 | 1 | 18–31 | 06:04–08:47 | Vérifier | VERIF | 0 | onglet « Maison Aurèle », adresse `…/preview/site_ut3_p2_t1` (capture 012) | « Je vais regarder comme je ferais dans Figma : en mode présentation » | — | Vérification en conditions de visiteur, jusqu'à l'élément (capture 018). |
| P2 | T1 | 1 | 20–31 | 06:26–08:47 | Vérifier | HES | 3 | page d'aperçu, six défilements de plus en plus fins | « je ne peux toujours pas dire avec certitude si j'ai vu l'animation se faire » | PERC | 12 actions ; coût ≥ 10 → gravité 3 ; passage dominé par l'absence de perception continue (voir 11.3, A1). |
| P2 | T1 | 1 | 30 ([30]) | 07:58 | Vérifier | FRU | 1 | — | « je commence à trouver ça un peu long pour juste regarder une animation » (agacement 2/5) | PERC | Sous le seuil d'agacement 4, mais expression négative explicite. |
| P2 | T1 | 1 | 33 | 10:39 | Vérifier | SAT | 0 | — | « Pour une fois un outil qui utilise des mots que je comprends tout de suite » | — | Énoncé de fin de tâche. |
| P2 | T3 | 2 | 5 (▶#60) | 14:09 | Régler | — | 0 | boutons « Rapide / Normale / Lente » et ligne « Sur mesure : 500 ms » | journal v1 09:16:56 « Apparition · lente » | — | Réglage obtenu en un clic ; 500 → 1 120 ms lu à la loupe 005. |
| P2 | T3 | 2 | 7 | 14:37 | Régler | MM | 1 | ligne « Sur mesure : 1 120 ms » | « je n'avais pas de repère précis pour savoir si 1120 ms c'est vraiment lent » (T3-b, déclaratif) | PERC | Attente « doubler la durée = nettement plus lent » ni confirmée ni infirmée faute de perception ; le site remplit R1. |
| P2 | T3 | 2 | 11–12 (▶#69, #71) | 15:23 | Composer | SAT | 0 | liste « Démarre » rendue dans la page, 11 options (capture 007) | « Voilà ! … exactement ce qu'il me faut … sans avoir à deviner un délai en millisecondes » | — | Option « après Titre 1 « Le goût de l'Auvergne… » » trouvée à la première ouverture du menu. |
| P2 | T3 | 2 | 14 (▶#74) | 15:56 | Vérifier | VERIF-E | 0 | phrase récapitulative sous les réglages (loupe 009) | « La phrase confirme exactement ce qu'il fallait : « … en 1120 ms, puis Réserver une table … de 1120 à 1620 ms » » | — | La phrase récapitulative devient son unique instrument de contrôle pour le reste de la séance. |
| P2 | T3 | 2 | 22–23 (▶#87, #88) | 17:09 | Vérifier | VERIF | 0 | aperçu, capture 014 | « Encore une fois tout est déjà stable sur la capture » | PERC | Vérification ouverte mais sans constat ; elle s'en remet à la phrase du panneau. |
| P2 | T5 | 3 | 2–4 (▶#95–#99) | 19:38–20:10 | Retirer | DEC | 0 | en-tête du panneau « Pastille », mention « 2 animations » ; ligne « En continu : Pulsation » | « La pastille a déjà « 2 animations » … c'est sûrement ça qui la fait bouger sans arrêt » | — | Distinction arrivée / mouvement permanent faite dès la lecture, sans essai. |
| P2 | T5 | 3 | 7 (▶#103) | 20:28 | Retirer | — | 0 | liste « En continu » : Aucun, Flottement, Pulsation, Rotation continue, Clignotement, Balancement | journal v1 09:23:15 « En continu · aucun » | — | Retrait ciblé, sans toucher à l'arrivée (capture 005 : « + 1 animation », Zoom et délai 300 ms intacts). |
| P2 | T5 | 3 | 8 (▶#104) | 20:45 | Vérifier | SAT | 0 | badge « + 1 animation » en haut du panneau | « Parfait : le panneau indique maintenant « +1 animation » au lieu de 2 » | — | Le badge sert de preuve de retrait ; repris tel quel en T5-a. |
| P2 | T5 | 3 | 15 (▶#115) | 21:49 | Choisir | — | 0 | liste « Au survol » : Aucun, Grossir, Soulever, Éclaircir (capture 008) | « « Soulever » correspond mieux à un vrai mouvement » | — | Écarte « Éclaircir » parce qu'il ne bouge pas : lecture juste du libellé. |
| P2 | T5 | 3 | 15 | 21:47 | Choisir | RATE | 1 | liens « Tester sur le site » et « Ouvrir dans le mode Animation », lisibles en bas du bloc (capture 005, loupe 010) | capture `p2-t5/005-capture.png`, `010-loupe.png` | — | Accès jamais utilisés alors qu'elle se plaint de ne rien voir jouer ; je ne peux pas attester qu'ils y auraient répondu → gravité 1, à vérifier. |
| P2 | T5 | 3 | 20–22 (▶#123–#126) | 22:40–23:22 | Vérifier | VERIF | 0 | aperçu, survol du bouton, loupe comparative | « Je vois une différence nette : le bouton … a une ombre visible en dessous, et pas « Voir la carte » » | — | Seule vérification de la séance qui produit un constat ; captures 011 (repos) et 012/013 (survolé) montrent aussi le bouton déplacé vers le haut. |
| P2 | T5 | 3 | 22 | 23:22 | Vérifier | SAT | 0 | loupe 013 | « C'est un bon signe, l'effet de survol a l'air de fonctionner » | — | — |
| P2 | T2 | 4 | 8–10 (▶#142–#145) | 26:42–27:31 | Découvrir | DEC | 0 | encart « Arrive avec « Plats » : l'effet choisi vaut pour tous ses enfants » et lien « Régler sur « Plats » » (capture 005) | « Intéressant : … « au chargement de la page », pas « quand il entre dans l'écran » ! » | — | Le diagnostic complet naît de la lecture de cet encart ; le lien mène en un clic au bon endroit. |
| P2 | T2 | 4 | 11 (▶#147) | 27:33 | Découvrir | — | 0 | lien « Régler sur « Plats » » | « Je clique dessus pour aller régler le déclencheur au bon endroit » | — | Passage enfant → groupe réussi du premier coup. |
| P2 | T2 | 4 | 17 (▶#156) | 28:39 | Lancer | ERR | 2 | liste « Démarre » rendue dans la page, lignes hautes de 15 px dans la capture 800 × 500 (capture 009) | intention « Je clique sur « quand il entre dans l'écran » », clic à (700, 241) = ligne « dès l'ouverture de la page », déjà cochée ; capture 010 inchangée | PERC | Une ligne trop bas (cible à 226). Récupérée seule à l'action 23. |
| P2 | T2 | 4 | 18–22 | 28:46–30:00 | Lancer | HES | 2 | même liste, loupes 011 et 013 | « Le clic n'a pas marché … Je me suis peut-être trompée dans la position » | PERC | 5 actions pour comprendre et viser ; diagnostic exact énoncé (« j'ai cliqué trop bas »). |
| P2 | T2 | 4 | 23 (▶#166) | 30:02 | Lancer | REC-S | 0 | ligne « quand il entre dans l'écran » | journal v1 09:32:49 ; capture 014 | — | Correction sans aide. |
| P2 | T2 | 4 | 25 (▶#169) | 30:21 | Vérifier | VERIF-E | 0 | phrase récapitulative (loupe 015) | « La phrase confirme : « Quand « Plats » entre dans l'écran … » » | — | — |
| P2 | T2 | 4 | 26–31 | 30:39–31:45 | Vérifier | VERIF | 0 | aperçu, deux défilements jusqu'à la section (captures 017, 018) | « La section des plats s'affiche normalement … rien ne semble cassé » | PERC | Contrôle d'intégrité seulement ; aucun constat sur le mouvement. |
| P2 | T4 | 5 | 9 et 17 | 35:53, 37:19 | Composer | RATE | 2 | lien « Ouvrir dans le mode Animation », bas du bloc Animation (captures 005 et 009) | captures `p2-t4/005-capture.png` (y ≈ 483), `009-capture.png` (y ≈ 495) | — | Accès lisible, jamais employé dans la seule mission de composition ; « aurait mené au but » non établi (voir 11.3). |
| P2 | T4 | 5 | 16 (▶#206) | 37:15 | Lancer | — | 0 | ligne « Rejouer : une seule fois / à chaque passage » | journal v2 09:40:02 « Apparition · à chaque passage » | — | C6 obtenu ici, très tôt, sans détour. |
| P2 | T4 | 5 | 22 (▶#215) | 38:16 | Choisir | ERR | 2 | liste « Apparition » ouverte **vers le haut**, par-dessus la rubrique « Mise en forme rapide », lignes de 15 px (capture 011) | intention « Je clique sur « Fondu en montant » », clic à (703, 292) = « Fondu en descendant » (capture 012, journal v3) | PERC | Une ligne trop bas (cible à 278). |
| P2 | T4 | 5 | 26 (▶#221) | 39:00 | Choisir | REC-S | 0 | même liste, après loupe 013 | journal v4 09:41:47 « Apparition · Fondu en montant » ; capture 014 | — | Correction seule, en 4 actions. |
| P2 | T4 | 5 | 28 (▶#224) | 39:20 | Composer | ERR | 2 | champ « Démarre » (y = 440) et champ « Délai » (y = 462) (capture 014) | intention « Je clique sur le menu déroulant « Démarre » », clic à (727, 462) → curseur dans le champ « Délai » (capture 015) | PERC | — |
| P2 | T4 | 5 | 31 (▶#229) | 40:03 | Composer | ERR | 2 | même ligne « Démarre » | clic à (727, 429) → aucune liste (capture 017) | PERC | Tombe dans l'espace entre « Vitesse » (421) et « Démarre » (440). |
| P2 | T4 | 5 | 33 (▶#232) | 40:30 | Composer | ERR | 2 | même ligne | clic identique à (727, 429) → aucune liste (capture 018) | PERC | Répétition du même clic ; « Rien ne s'ouvre, c'est étrange ». |
| P2 | T4 | 5 | 28–35 | 39:20–42:09 | Composer | HES | 3 | ligne « Démarre » du panneau du titre | « Je me suis embrouillée avec mes calculs. Je reviens à une lecture directe de la capture » | PERC | 10 actions sans aucune modification enregistrée ; elle finit par déduire la position (441) par encadrement entre Vitesse et Délai. |
| P2 | T4 | 5 | 36 (▶#237) | 42:11 | Composer | REC-S | 0 | liste « Démarre » ouverte vers le haut, 7 options (capture 020) | « Enfin, le menu s'est ouvert ! » | — | — |
| P2 | T4 | 5 | 38 (▶#240) | 42:31 | Composer | ERR | 3 | liste « Démarre », options espacées de 15 px (capture 020) | intention « Je clique sur « après « Photo de la salle » » », clic à (700, 376) = « quand « Contenu » entre dans l'écran » (capture 021, journal v5) | PERC | Deux lignes trop haut (cible à 406) ; déplace le déclencheur sur le conteneur. Gravité 3 : coûte les 6 dernières actions et contribue directement au dépassement du budget. |
| P2 | T4 | 5 | 38 | 43:03 | Composer | COLL-D | 2 | — | journal v5 : `node.set rh_about_h2:triggers ; … ; node.set rh_about_in:triggers` | — | Modification sur « Contenu », non visé par la consigne ; remarquée aussitôt, retirée à l'action 44, absente du site final. |
| P2 | T4 | 5 | 38–39 | 43:03 | Vérifier | — | 1 | en-tête du panneau du titre | badge « + 1 animation » présent captures 012, 014, 017, 020 ; **absent** captures 021, 022, 023 | — | Observation : l'indicateur sur lequel elle s'appuie ailleurs (T5-a) disparaît du panneau de l'élément quand l'animation est pilotée depuis un autre élément. Aucun coût observé ici : elle ne le remarque pas. |
| P2 | T4 | 5 | 40 (▶#243) | 43:05 | Composer | ERR | 2 | champ « Démarre » devenu haut de deux lignes (« quand « Contenu » entre dans l'écran », y 432–452) et champ « Délai » (y 455–470) (capture 021) | intention « Je clique de nouveau sur le champ « Démarre » », clic à (727, 455) → curseur dans « Délai » (capture 022) | PERC | **40ᵉ action réelle : limite ferme atteinte** ; la mission continue. |
| P2 | T4 | 5 | 42 (▶#246) | 43:30 | Composer | REC-S | 0 | liste « Démarre » rouverte (capture 023) | « Maintenant je vois bien la liste » | — | Hors budget. |
| P2 | T4 | 5 | 44 (▶#249) | 43:52 | Composer | REC-S | 0 | ligne « après « Photo de la salle » » | journal v6 09:46:39 « Apparition · démarre après « Photo de la salle » » | — | Hors budget ; **enregistré, non vérifié** : elle s'arrête sans capture. |
| P2 | T4 | 5 | 44 | 44:42 | Composer | FRU | 3 | menu « Démarre » | « C'est de loin la mission la plus pénible … Agacement à 5 sur 5, je suis à bout avec ce menu » | PERC | Agacement 5 → FRU au sens de 8.2 ; gravité alignée sur la conséquence (budget dépassé, tâche en échec). |
| P2 | T4 | 5 | 44 | 44:42 | Composer | BUD | 4 | — | « FIN : budget / ACTIONS : 44 » | — | Échec au budget avec 4 éléments visés sur 6 jamais ouverts. |
| P2 | T4 | 5 | 44 | 44:42 | Composer | HALL | — | menu « Démarre » | « ce menu Démarre qui s'ouvre vers le haut **et qui bouge selon la longueur du texte choisi** » | HALL | Les captures 020 et 023 montrent la liste **aux mêmes positions** (lignes 331 à 421) avant et après le choix d'une option longue ; ce qui change est la hauteur du **champ** (une puis deux lignes), qui déplace « Délai » sous lui. Voir aussi D-FIN-3. |

---

## 4. Codes déclaratifs (réponses aux questions et débriefing)

Tous marqués « déclaratif » ; ils illustrent, ils ne fondent rien (11.4).

| Code | Étape | Citation | Source |
|---|---|---|---|
| SAT (déclaratif) | Choisir | « un réglage « Apparition » avec des choix clairs … pas de jargon, ce qui change de Webflow » | T1-b |
| SAT (déclaratif) | Lancer | « Ce que je n'avais pas prévu, c'est que le déclenchement « quand il entre dans l'écran » était déjà réglé par défaut … Ça m'a surprise en bien » | T1-b |
| SAT (déclaratif) | Choisir | « Le menu pour choisir comment un élément arrive … Des mots normaux, pas de jargon, et en plus il y avait toujours une petite phrase en dessous qui disait exactement ce qui allait se passer » | D-FIN-2 |
| SAT (déclaratif) | Vérifier | « j'ai survolé le bouton dans l'aperçu et j'ai vu une vraie ombre apparaître dessous … pour une fois, j'ai vu un résultat concret » | D-FIN-7 |
| FRU (déclaratif) | Composer | « Le menu « Démarre » … je me suis trompée de ligne plusieurs fois de suite sans comprendre pourquoi, et c'est ce qui m'a fait perdre presque toute la dernière mission » | D-FIN-3 |
| FRU (déclaratif) | Vérifier | « ne jamais voir une seule animation se jouer réellement sous mes yeux, devoir croire une phrase écrite plutôt que le constater, ça reste frustrant du début à la fin de la séance » | D-FIN-3 |
| FRU (déclaratif) | Composer | « à un moment j'ai cliqué quatre fois de suite sur la mauvaise ligne, et je me suis demandé si ça valait vraiment le coup de continuer » | D-FIN-7 |
| FRU (déclaratif) | Composer | « Sans hésiter, le menu « Démarre » du titre … C'est là que j'ai perdu presque toutes mes actions » | T4-b |
| VAL+ (déclaratif) | Choisir / Régler | « Ça pourrait clairement m'aider pour les petites touches sur les sites de mes clients restaurateurs … ce genre de finition que je laissais avant à un développeur » | D-FIN-6 |
| VAL+ (déclaratif) | Découvrir | « pour des trucs simples … c'est étonnamment clair, avec des mots qu'on comprend tout de suite … plus vite que Webflow en tout cas » | D-FIN-1 |
| VAL+ (déclaratif) | Retirer | « Je referais sans hésiter tout ce qui touche un seul élément à la fois … maintenant je saurais le refaire toute seule » | D-FIN-4 |
| VAL− (déclaratif) | Composer | « je ne me lancerais pas dans une mise en scène avec plusieurs éléments qui s'enchaînent … pas avec ce menu « Démarre » qui m'a fait perdre autant de temps » | D-FIN-4 |
| VAL− (déclaratif) | Composer | « je ne compterais pas dessus pour livrer quelque chose de plus élaboré … Donc ça aurait sa place pour l'essentiel, mais pas encore pour le raffiné » | D-FIN-6 |
| VAL− (déclaratif) | Vérifier | « ne jamais pouvoir vérifier de mes yeux qu'une animation fait bien ce qu'elle est censée faire, ça laisse un doute qui ne part jamais … pour un rendu client, j'ai besoin d'être sûre avant de livrer » | D-FIN-8 |
| VOC (déclaratif) | Choisir | « « Netteté », dans la liste des apparitions, je n'étais pas sûre de ce que ça donnait … j'ai deviné que ça voulait dire un flou qui devient net » — mot jamais choisi, aucun effet sur le résultat | D-FIN-5 ; gravité 0 |
| MM (déclaratif) | Vérifier | « Il s'ouvrait tantôt vers le bas, tantôt vers le haut » — dans les six ouvertures de liste capturées de la séance (T1/006, T3/007, T5/008, T2/009, T4/011, 020, 023), la liste s'ouvre **toujours vers le haut** | D-FIN-3 ; voir HALL ci-dessus |
| — (déclaratif) | Vérifier | « Je lui dirais d'utiliser le bouton « Aperçu » … et de dérouler la page comme le ferait un client … Mais … je n'ai jamais réussi à surprendre une animation en train de se jouer avec cette méthode » | D-FIN-9 ; réponse juste sur le moyen, aveu d'échec sur le résultat |

**VOC distincts de la séance : 1** (« Netteté »). Aucun mot de la liste « vocabulaire inconnu » de la fiche n'a été rencontré à l'écran ni employé sans avoir été lu.

---

## 5. Problèmes candidats pour cette séance (regroupement provisoire, 11.1)

Regroupement provisoire, à reprendre après le codage des cinq séances. Chaque fiche porte la **première réponse** au test d'artefact de 11.3 (A1, A2, A6, A8) ; A3, A4, A5 et A7 ne peuvent être tranchés qu'après les autres séances.

### P2-a · Les clics visant le champ « Démarre » atteignent le champ voisin ou une autre ligne de la liste
- **Étape** : Composer (et Lancer en T2). **Tâches** : T4 (6 occurrences), T2 (1 occurrence), T4 encore pour la liste « Apparition ».
- **Lignes** : T4 actions 22, 28, 31, 33, 38, 40 ; HES T4 28–35 ; T2 action 17 et HES 18–22.
- **Ce qui est observé** : 17 des 44 actions de T4 y passent ; la mission finit au budget avec quatre éléments visés sur six jamais ouverts ; agacement déclaré 5/5. Gravité brute **4** (cause l'échec et le dépassement du budget).
- **A1 · Perception** : **oui, en grande partie**. Trois faits : (i) les listes déroulantes de la copie de test sont rendues **dans la page** par une adaptation du dispositif (addendum 3, point 2), donc leur placement et leur taille ne sont pas ceux de l'éditeur livré ; (ii) les clics sont donnés dans une capture réduite à 800 × 500 pour un écran de 1 440 × 900, où une ligne de liste mesure 15 px (captures 011, 020, 023 de T4) : l'erreur d'une ligne correspond à 27 px réels, qu'une main sur une souris ne commet pas ; (iii) la participante détecte et corrige chaque fois son erreur grâce à une autre représentation visible que l'interface fournit bien — la phrase récapitulative et le texte du champ — qu'elle **utilise** systématiquement. → Statut : **artefact du dispositif prépondérant**. Subsiste une part d'interface, attestée par les captures et indépendante de la résolution : le champ « Démarre » passe de une à deux lignes selon la longueur de l'option choisie (captures 014 puis 021), ce qui décale le champ « Délai » sous lui et fait tomber dans « Délai » deux clics visant « Démarre » (actions 28 et 40) ; et la liste se déploie **par-dessus** les réglages situés au-dessus du champ plutôt qu'en dessous. Cette part relève de « problème d'interface amplifié par le dispositif », **gravité réduite d'un niveau : 3**, mention obligatoire « **à confirmer avec des utilisateurs réels** ».
- **A2 · Connaissance et persona** : aucun code CONN, aucun code PERS à l'origine du problème (sa règle d'abandon n'était pas déclenchée : le journal enregistre une modification sur l'élément visé aux actions 12, 16, 22, 26, 38 et 44, donc jamais 20 actions sans progrès au sens de 3.8). → rien à écarter.
- **A6 · Modérateur** : aucune parole du modérateur pendant T4 avant la fin. → non contaminé.
- **A8 · Perception affirmée** : la description qu'elle en donne au débriefing (« tantôt vers le bas, tantôt vers le haut », « la liste changeait de place ») est **écartée** : captures 020 et 023 identiques quant aux positions de la liste, et les six ouvertures de liste capturées de la séance s'ouvrent toutes vers le haut. Le problème ne peut être retenu que dans les termes des captures : hauteur variable du champ, liste par-dessus les réglages du dessus.

### P2-b · Aucune animation d'arrivée ne peut être constatée, ni dans l'éditeur ni dans l'aperçu
- **Étape** : Vérifier. **Tâches** : T1 (17 actions), T3, T2, et jusqu'au débriefing.
- **Lignes** : HES T1 13–17 et 20–31 ; VERIF T1, T3, T2 sans constat ; FRU T1 action 30 ; FRU et VAL− déclaratifs D-FIN-3, D-FIN-7, D-FIN-8, D-FIN-9.
- **Ce qui est observé** : elle ouvre le mode aperçu à chaque mission, descend jusqu'à l'élément, refait le trajet plus lentement (T1), et n'obtient jamais d'image du mouvement ; elle clique le triangle « Jouer dans le canevas » (T1 action 16) sans différence visible sur la capture suivante (011). Elle finit par fonder toutes ses conclusions sur la phrase récapitulative. Gravité brute **3** (12 actions et plus).
- **A1 · Perception** : **oui** — le problème disparaîtrait si elle voyait le mouvement en continu ; et l'interface offre une autre représentation visible (phrase récapitulative, chiffres de durée, badge « + n animation ») **qu'elle utilise** et qui lui donne des récits exacts (T1 7/8, T3 6/8, T5 8/8). → **artefact probable, non retenu, à lister en signal faible**. À reprendre néanmoins comme constat exploratoire, parce que la conséquence déclarée est un frein de valeur (« pour un rendu client, j'ai besoin d'être sûre avant de livrer », D-FIN-8) et parce qu'un utilisateur réel, lui, verrait le mouvement — c'est-à-dire que le signal porte sur autre chose que sur l'interface : sur ce qui reste quand on ne voit rien.
- **A2** : aucun CONN ni PERS. **A6** : aucune parole du modérateur en cause. **A8** : aucune de ses affirmations sur ce point n'est une perception non attestée — elle qualifie systématiquement ses suppositions (« je suppose seulement », « je ne peux pas dire »), conformément à la règle 5 de la consigne d'incarnation.

### P2-c · Pour ralentir, seuls trois paliers nommés ; aucun repère de ce que valent 1 120 ms
- **Étape** : Régler. **Tâche** : T3.
- **Lignes** : T3 action 5 ; MM T3 action 7 ; T3-b déclaratif.
- **Ce qui est observé** : le réglage réussit du premier coup et R1 est rempli, mais elle ne peut pas juger si « nettement plus lent » est atteint : « j'ai pris le bouton « Lente » tel quel, en faisant confiance à l'outil plutôt qu'en réglant un chiffre moi-même ». Gravité **1** (aucun coût, résultat conforme).
- **A1** : **oui en partie** — un designer qui voit le mouvement jugerait ; et l'interface affiche par ailleurs la valeur (« Sur mesure : 1 120 ms »), qu'elle lit et utilise. → artefact probable, **signal faible**. Réserve : la question « 1 120 ms, est-ce lent ? » reste posée même en voyant le mouvement, si aucune comparaison n'est offerte. **A2/A6/A8** : rien.

### P2-d · L'indicateur « + n animation » du panneau disparaît quand l'animation d'un élément est pilotée depuis un autre élément
- **Étape** : Vérifier. **Tâche** : T4, actions 38 à 44.
- **Lignes** : ligne d'observation T4 38–39 (badge présent captures 012, 014, 017, 020 ; absent 021, 022, 023).
- **Ce qui est observé** : c'est le badge qui lui sert de preuve ailleurs (T5-a : « c'était marqué « +2 animations » avant … c'est passé à « +1 animation » »). En T4 il disparaît du panneau du titre alors que le titre reste animé, comme piste d'une animation portée par un autre élément. Gravité **1** : **aucun coût observé**, elle ne le remarque pas.
- **A1** : **non** (information textuelle, lisible, indépendante de la perception du mouvement) → passe à A2. **A2** : ni CONN ni PERS. **A6** : rien. **A8** : rien — le constat repose sur des captures, pas sur une parole. Candidat faible mais **non artefactuel** ; à confronter aux autres séances.

### P2-e · L'accès « Ouvrir dans le mode Animation » n'est pas employé dans la seule mission de composition
- **Étape** : Composer. **Tâche** : T4 (lisible dès l'action 9).
- **Lignes** : RATE T4 actions 9 et 17 ; RATE T5 action 15 (« Tester sur le site »).
- **Ce qui est observé** : elle lit le lien à voix haute dès T1 (« un lien « Ouvrir dans le mode Animation » »), ne l'ouvre jamais, et compose la scène de T4 entièrement dans le panneau de droite, élément par élément. Gravité **2** (hésitation assumée entre 1 et 2 : le coût n'est pas imputable au lien, mais la mission échouée est précisément celle qu'il semble nommer).
- **A1** : **non** (lien textuel lisible) → A2. **A2** : ni CONN ni PERS — sa fiche prévoit qu'elle cherche « un panneau de propriétés à droite », ce qu'elle a trouvé et qui lui a suffi quatre fois sur cinq ; on ne peut pas imputer le non-usage à un écart de persona. **A6/A8** : rien. **Réserve de méthode** : je ne peux pas attester du contenu de ce mode ; la clause « qui aurait mené au but » de la définition de RATE n'est donc **pas établie**, seule la visibilité l'est. À trancher avec les séances où ce mode est ouvert.

**Point positif à consigner (non un problème)** : le chemin enfant → groupe de T2. L'encart « Arrive avec « Plats » : l'effet choisi vaut pour tous ses enfants » et le lien « Régler sur « Plats » » (capture `p2-t2/005-capture.png`) produisent à eux seuls un diagnostic juste et la correction en un clic, chez une participante qui n'a jamais regardé la page en conditions de visiteur avant d'agir.

---

## 6. Écarts au protocole et au dispositif

**Codes relevés**

- **PERC** : relevé sur tous les passages de gravité ≥ 2 (T1 13–17 et 20–31 ; T2 17 et 18–22 ; T4 22, 28, 31, 33, 38, 40 et 28–35). Deux causes distinctes, à ne pas confondre : (a) l'absence de perception continue du mouvement ; (b) le clic donné dans une capture réduite à 800 × 500 sur un écran de 1 440 × 900, avec des listes déroulantes rendues dans la page (addendum 3, point 2), dont le placement et la taille ne sont pas ceux de l'éditeur livré.
- **HALL** : 1, au débriefing (D-FIN-3 et T4-b) — « il s'ouvrait tantôt vers le bas, tantôt vers le haut », « la liste changeait de place selon que le texte choisi tenait sur une ou deux lignes ». Non attesté : les captures 020 et 023 montrent la liste aux mêmes positions, et les six ouvertures de liste capturées s'ouvrent toutes vers le haut. Ce qui change est la hauteur du **champ**. Conséquence (11.3, A8) : la formulation du problème P2-a ne peut pas reprendre ces termes. À noter qu'il s'agit d'une reconstruction après coup, pas d'une perception affirmée pendant l'action : pendant la tâche, elle dit « je me suis embrouillée avec mes calculs », ce qui est exact.
- **CONN** : **aucun**. Aucun terme de sa liste « vocabulaire inconnu » n'est employé sans avoir été lu à l'écran. Cas limite examiné et écarté : « en scrollant » (T2-R) — le mot « scroll » seul ne figure pas dans sa liste d'inconnus, qui vise « déclenchement au défilement » et « scroll trigger », et elle avait alors lu « quand il entre dans l'écran » une dizaine de fois.
- **PERS** : **aucun** au sens de la fiche. Sa manière d'explorer est appliquée à la lettre (sélection d'abord, panneau de droite, lecture, agrandissement, survol avant clic, gestes comparatifs par captures) ; sa règle d'abandon n'a jamais été déclenchée, y compris en T4, parce que le journal enregistre une modification sur un élément visé aux actions 12, 16, 22, 26, 38 et 44 — jamais 20 actions consécutives sans progrès visible au sens de 3.8. Réserve : sa règle prévoit aussi « Annule dès qu'elle doute » ; aucune annulation (Ctrl+Z) n'apparaît de toute la séance — elle corrige toujours en rejouant le réglage. Écart mineur, sans effet sur les résultats, signalé.
- **MOD** : 1, gravité 0. La règle 4.3.F prévoit qu'à la 40ᵉ action le modérateur dit « Nous allons nous arrêter là pour cette mission ». La 40ᵉ action réelle de T4 est ▶#243 (43:05) ; la phrase n'arrive qu'à 45:48, après que la participante s'est arrêtée seule à 44 actions. Le modérateur ne pouvait pas le savoir : le compte annoncé par la participante était de 40 à la dernière action. Aucune information hors script n'a été donnée, aucun commentaire, aucun encouragement : le répertoire fermé a été respecté partout ailleurs dans la séance. Pas d'invalidation (11.6).
- **HORS** : **aucune**. La trace le contrôle : « Écarts au protocole (outils ou commandes interdits) : aucun ».

**Dépassement du budget d'actions (T4)**

44 actions réelles au lieu des 40 de la limite ferme, soit 4 actions hors budget (▶#244, #246, #247, #249), dont le dernier clic qui enregistre v6. Cause visible dans la trace, et non déclarative : quatre actions ont été faites sans numéro entre crochets — ▶#194 et ▶#203 (défilements du panneau de droite), ▶#227 et ▶#235 (loupes) — ce qui a décalé de 4 le compte annoncé. Sa propre explication (« j'ai perdu le fil du compte en me débattant avec le menu Démarre ») est compatible avec le fait : les deux loupes non comptées sont précisément celles de la lutte avec « Démarre ». Conséquences pour l'analyse : le statut de T4 (E) n'en dépend pas — deux éléments sur six, C1 et C3 non remplis quoi qu'il arrive — mais la métrique « actions totales » de T4 n'est pas comparable telle quelle aux tâches arrêtées à 40 ; et le mode de fin BUD doit être lu comme « budget dépassé », pas « budget atteint ». Dans les quatre autres missions, le compte annoncé et le compte réel coïncident exactement (33, 25, 24, 33).

**Autres écarts du dispositif à signaler**

- La règle 6 de la consigne d'incarnation (« Toutes les 10 actions, dites où vous en êtes et votre agacement ») n'est appliquée que deux fois sur les cinq missions (T1 action 30, agacement 2 ; T4 fin, agacement 5). La courbe d'agacement de cette séance est donc lacunaire : elle ne permet pas de situer le moment où l'agacement monte en T4.
- Les pages ouvertes par « Aperçu » sont affichées par l'onglet simulé de la vague 2 (addendum 3, point 6) ; les captures 012 de T1 et 011 de T5 montrent bien la barre d'onglets et l'adresse `q2.localhost:3002/preview/site_ut3_p2_t*`. Aucun incident lié à ce point dans cette séance : elle revient à l'éditeur du premier coup à chaque fois (clic à 35 11).

**Limites de ma propre lecture**

1. Je n'ai ouvert que 28 des 72 captures de la séance, choisies : les états de départ et d'arrivée de chaque modification, les six ouvertures de liste, et les deux images de survol de T5. Un événement visible dans une capture non ouverte a pu m'échapper, en particulier dans les longues suites de défilement de T1 et de T2.
2. Je n'ai pas vu l'interface livrée, seulement la copie de test avec ses adaptations ; toute affirmation sur le rendu réel des listes déroulantes serait hors de ma portée, d'où la prudence de P2-a.
3. Je ne peux pas dire ce que contient « le mode Animation » ni ce que produit « Tester sur le site », jamais ouverts dans cette séance : les codes RATE correspondants sont posés sur la seule visibilité de l'accès, pas sur sa capacité à mener au but.
4. La « petite ombre » du bouton survolé (T5) est visible sur la loupe 013 mais n'appartient pas à l'animation enregistrée ; je l'attribue au style de survol livré du bouton, que la fiche de préparation devait relever mais que je n'ai pas sous les yeux. À confirmer par le préparateur.
5. Les cotations de concordance (9.4) sont miennes ; trois d'entre elles ont été serrées : T3 « Quoi » (1 ou 2 selon qu'on lit « le titre tout seul » comme une omission ou comme une affirmation), T2 « Quand » (1 ou 2 : elle nomme la section là où le site déclenche sur chaque élément), T5 « Combien » (1 ou 2 : une durée exacte sur deux). Les hésitations sont écrites au fil du texte, comme demandé.
