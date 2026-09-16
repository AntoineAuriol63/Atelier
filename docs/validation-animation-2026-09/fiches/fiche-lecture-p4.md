# Fiche de lecture du site enregistré · P4 (vague 3)

Ordre des tâches : T1 T2 T5 T3 T4. Pour chaque tâche : état de départ (copie de référence de la vague 3 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 14
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur FqNgC8GX_CIL · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : Titre 2 « Une cuisine de… » en 600 ms, une seule fois.
    animation « Animation · Titre 2 « Une cuisine de… » » [hS0iyDfqbM8m] preset=- duration=600 longueur=600
    piste → élément déclencheur [eitBO4RPlrnE]
      images-clés : 0ms {"opacity":"0","transform":"translate(0px, 20px)"} | 600ms {"opacity":"1","transform":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:55:11 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about_h2:triggers]
09:55:29 v2 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
09:56:12 v3 « opacity (image-clé à 0 ms) » [site.set:animations]
09:56:12 v4 « opacity (image-clé à 0 ms) » [site.set:animations]
09:56:50 v5 « transform (image-clé à 0 ms) » [site.set:animations]
09:56:50 v6 « transform (image-clé à 0 ms) » [site.set:animations]
09:57:14 v7 « Durée de l'animation » [site.set:animations]
09:57:14 v8 « Durée de l'animation » [site.set:animations]
09:58:06 v9 « opacity (image-clé à 590 ms) » [site.set:animations]
09:58:06 v10 « opacity (image-clé à 590 ms) » [site.set:animations]
09:58:38 v11 « transform (image-clé à 590 ms) » [site.set:animations]
09:58:38 v12 « transform (image-clé à 590 ms) » [site.set:animations]
09:58:50 v13 « Déplacer l'image-clé » [site.set:animations]
09:58:50 v14 « Déplacer l'image-clé » [site.set:animations]
```

### Notes du préparateur
P4 T1 (pos 1) : terminé 36 actions (11 captures, 5 clics, 6 doubles-clics, 6 saisies, 6 touches, 1 défilement, 1 commande inconnue) ; **a construit l'animation à la main dans le mode Animation** : v1 « Nouvelle animation », v2 « Ajouter une piste », images-clés opacity et transform à 0 ms puis à 590 ms, durée, puis « Déplacer l'image-clé » (590 → 600) ; **chaque validation apparaît en double dans le journal** (14 versions pour 7 changements : défaut de double validation, constats point 1). Site v14 : déclencheur à l'entrée dans l'écran, animation sur mesure 600 ms, opacité 0 → 1 et translateY 20 px → 0. Visite : o=0 et +20 px avant, 0 → 1 en ~780 ms. Critères R1 à R5 remplis. Statut proposé : C. Écart de dispositif : une commande `triple` (non prévue) rejetée par le navigateur de test, comptée par le participant. Remarques : pas d'aimantation sur la règle (clic à 590 ms au lieu de 600), et « la courbe se règle par un menu « Naturel (par défaut) » … sans ça je ne pourrai pas faire d'overshoot ».
P4 T1 : SEQ 6 ; T1-R conforme au site (montée de 20 px en fondu, 600 ms, une seule fois) ; n'a pas vérifié en conditions de visiteur ; demande **où se règle le seuil de déclenchement** à l'entrée dans l'écran (« dès que le premier pixel touche le bas de l'écran, ou quand il est au milieu ? »).
P4 T1 : T1-a a choisi l'onglet « Animation » du haut plutôt que la rubrique du panneau (« une rubrique au fond d'un panneau de propriétés, ça sent le menu d'effets tout prêts ») ; T1-b : formulaire « Quand » + « Animation » puis « Ajouter » avant que la ligne de temps apparaisse (« présenté à l'envers de ce à quoi je suis habitué ») ; apprécie le déclencheur par défaut et l'existence de « à composer » ; **n'a pas compris pourquoi il faut encore ajouter une piste** après avoir sélectionné l'élément (« Deux boutons se disputaient le travail, « Choisir un élément » et « + Ajouter Titre 2 » … je ne saurais pas expliquer la différence à un de mes juniors ») ; « Naturel (par défaut) » ne lui dit rien.

## T2 (position 2)

### État de départ
```
version 0
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur mkGjNLQCbqxk · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [nJXEbeKmpNcq] preset=fade duration=600 longueur=600
    piste → élément déclencheur [qGsD5YzL9aYv]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur iX6WePnLqlDI · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [G0VBXDt1E4Ds] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [LDrHyieeLuuR]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur nK9JEd39KM11 · on=load
    résumé : Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms.
    animation « Fondu en montant » [U-z8-xgyyp7d] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [Nl-NVSfHBpvN]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 4
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur mkGjNLQCbqxk · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [nJXEbeKmpNcq] preset=fade duration=600 longueur=600
    piste → élément déclencheur [qGsD5YzL9aYv]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur iX6WePnLqlDI · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [G0VBXDt1E4Ds] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [LDrHyieeLuuR]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur nK9JEd39KM11 · on=load
    résumé : Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms.
    animation « Fondu en montant » [U-z8-xgyyp7d] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [Nl-NVSfHBpvN]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
10:03:29 v1 « Ajouter une piste · Carte plat » [site.set:animations]
10:04:53 v2 « Ajouter une piste · Plats » [site.set:animations]
10:05:39 v3 « Retirer la piste » [site.set:animations]
10:06:04 v4 « Retirer la piste » [site.set:animations]
```

### Notes du préparateur
P4 T2 (pos 2) : **budget** à 40 actions ; journal : v1 « Ajouter une piste · Carte plat », v2 « Ajouter une piste · Plats », v3 et v4 « Retirer la piste » (les deux pistes ajoutées par erreur sont retirées) ; **le déclencheur de « Plats » est resté sur `load`** : site final équivalent à l'état de départ pour le critère visé. Visite : le titre arrive à l'entrée, les 3 cartes sont déjà à o=1 sans transformation. Critères : R1 oui, R2 non → Statut proposé : E (mode de fin : budget). Diagnostic énoncé **juste et détaillé** (« son seul défaut, c'est son déclencheur : au chargement de la page »), plus une remarque sur le décalage entre enfants réglé sur « aucun ». Constat principal du participant : « le « quand » d'une animation existante n'est pas là où on la règle » (la phrase du haut du panneau n'est pas modifiable ; le menu est dans la rubrique repliée « Animations lancées par Plats »), et « le mot « enfants » ne s'applique pas au même niveau selon l'élément qu'on vise ».
P4 T2 : SEQ 3 (« Comprendre le problème m'a pris cinq minutes, le réparer m'a coûté tout le reste … ne pas trouver un interrupteur que l'outil m'affichait en toutes lettres à trois centimètres de là ») ; T2-R : donne les deux hypothèses faute d'avoir pu vérifier, et décrit exactement l'état de départ ; le site montre que le changement n'est **pas** passé.
P4 T2 : T2-a diagnostic **juste et complet** (« le problème tenait à un seul mot ») ; souligne que « au chargement » et « à l'entrée dans l'écran » sont deux lignes voisines du même menu sans avertissement ; T2-b : n'a jamais regardé le site en visiteur (« Tester sur le site », non cliqué) ; a diagnostiqué par la phrase de résumé (« le seul vrai bon point de cette mission … le défaut, c'est qu'elle énonce le problème sans permettre de le corriger sur place ») ; dit avoir été arrêté à temps par l'avertissement « Plats a aussi ses propres animations : elles se jouent en plus », sans quoi il posait un second fondu par-dessus.

## T5 (position 3)

### État de départ
```
version 0
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur vd1lkjF_CIbb · on=load delay=800
    résumé : Au chargement de la page, après 800 ms : pulsation en 1 200 ms, en boucle.
    animation « Pulsation » [bDlR946136sO] preset=pulse duration=1200 longueur=1200
    piste → élément déclencheur [myytNdlhs6jm]
      images-clés : 0ms {"transform":"scale(1)"} | 600ms/ease-in-out {"transform":"scale(1.05)"} | 1200ms/ease-in-out {"transform":"scale(1)"}
(animations du site : 43 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 7
• « Réserver une table » [rh_hero_b1]
  - déclencheur RfH11J8qzl1I · on=hover
    résumé : Au survol de « Réserver une table » : « Réserver une table » en 150 ms.
    animation « Animation · Réserver une table » [HjccXjcgp4TO] preset=- duration=150 longueur=150
    piste → élément déclencheur [i7hxbcT5Pe8T]
      images-clés : 0ms {} | 150ms {"transform":"scale(1.05)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
10:12:57 v1 « Retirer le déclencheur » [node.set rh_hero_badge:triggers ; site.set:animations]
10:14:22 v2 « Nouvelle animation » [site.set:animations ; node.set rh_hero_b1:triggers]
10:14:47 v3 « Ajouter une piste · Réserver une table » [site.set:animations]
10:15:02 v4 « Durée de l'animation » [site.set:animations]
10:15:02 v5 « Durée de l'animation » [site.set:animations]
10:15:47 v6 « transform (image-clé à 150 ms) » [site.set:animations]
10:15:47 v7 « transform (image-clé à 150 ms) » [site.set:animations]
```

### Notes du préparateur
P4 T5 (pos 3) : terminé 33 actions ; journal : v1 « Retirer le déclencheur » (pulsation supprimée), v2 « Nouvelle animation » au survol sur rh_hero_b1, v3 « Ajouter une piste », v4/v5 « Durée » (doublon), v6/v7 « transform (image-clé à 150 ms) » (doublon) ; site v7 : pastille zoom conservé, bouton du héros animation sur mesure au survol, échelle 1,05 en 150 ms, **sans `reverseOnLeave`**. Visite : au survol scale 1,05 ; à la sortie, retour immédiat à l'état normal (non animé). Critères S1, S2, S3 (retour présent, atteint en 150 ms, sans répétition), S4 remplis. Statut proposé : C. Réserves du participant : ne sait pas ce qui se passe à la sortie du survol (« la case « aller-retour » est grisée »), le canevas ne joue ni survols ni effets continus, et « la croix à côté du nom de l'animation … referme le panneau ; la croix qui supprime est celle de la liste, juste au-dessus, et elle a exactement le même dessin ».
P4 T5 : SEQ 6 ; T5-R conforme au site (zoom d'arrivée conservé, plus de pulsation, bouton +5 % au survol), avec incertitude assumée sur la sortie du survol (le rendu la ramène à l'état normal sans transition).
P4 T5 : T5-a « non », appuyé sur la liste des animations et sur la rubrique « Effets continus » vérifiée (parallaxe aucune, bandeau non), en précisant qu'il n'a fait que « lire sa fiche » ; T5-b « aucune idée », énumère les trois comportements possibles à la sortie du survol (le rendu fait un retour immédiat sans transition) et rappelle que Webflow distingue « hover in » et « hover out ».

## T3 (position 4)

### État de départ
```
version 0
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur njh1MhZJ3oUb · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [kfMtTydIx76G]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur [OHisTvva0JuG]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur DpNnQmOT_zQC · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [Wt-VXWPKZB46] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [HokEdH_iX5YX]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur e5kG_QqpAVcY · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [LZrSwdJwD_Ti] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [nPX3yqaLtCnJ]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 6
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur njh1MhZJ3oUb · on=load
    résumé : Au chargement de la page : fondu en montant en 1 200 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=1200 longueur=1200
    piste → élément déclencheur [kfMtTydIx76G]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1200ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur [OHisTvva0JuG]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur DpNnQmOT_zQC · on=load delay=1200
    résumé : Au chargement de la page, après 1 200 ms : fondu en montant en 500 ms.
    animation « Fondu en montant » [Wt-VXWPKZB46] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [HokEdH_iX5YX]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur e5kG_QqpAVcY · on=load delay=1320
    résumé : Au chargement de la page, après 1 320 ms : fondu en montant en 500 ms.
    animation « Fondu en montant » [LZrSwdJwD_Ti] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [nPX3yqaLtCnJ]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
10:20:33 v1 « Durée de l'animation » [site.set:animations]
10:20:33 v2 « Durée de l'animation » [site.set:animations]
10:23:05 v3 « Délai » [node.set rh_hero_b1:triggers]
10:23:05 v4 « Délai » [node.set rh_hero_b1:triggers]
10:24:43 v5 « Délai » [node.set rh_hero_b2:triggers]
10:24:43 v6 « Délai » [node.set rh_hero_b2:triggers]
```

### Notes du préparateur
P4 T3 (pos 4) : terminé 36 actions ; journal : v1/v2 « Durée de l'animation » (titre 500 → 1 200 ms), v3/v4 « Délai » (bouton 1, 1 200 ms), v5/v6 « Délai » (bouton 2, 1 320 ms) — tous en double (défaut de double validation) ; site : titre 1 200 ms au chargement, boutons avec **délai de déclencheur** 1 200 et 1 320 ms (pas de relation `start`), paragraphe inchangé. Visite : titre plein à ~1 010 ms, boutons visibles à ~1 350 et ~1 470 ms, pleins à ~1 680 et ~1 810 ms. Critères R1 (1 200 ≥ 900), R2 (départs 1 200 et 1 320 ≥ 960 ; fins 1 700 et 1 820 ≤ 6 000), R3, R4 remplis. Statut proposé : C. Remarques : le champ « Délai » est « le réglage le plus utile de toute cette mission » mais demande de défiler et de déplier deux fois, alors que la durée est en haut ; **déplier la ligne du second bouton a rechargé le panneau et renvoyé en haut** (trois manipulations perdues) ; a vérifié à la loupe que l'image-clé de fin avait suivi l'allongement de la durée.
P4 T3 : SEQ 5 (« la moitié de mes manipulations ont servi à naviguer, pas à régler ») ; T3-R conforme au site et argumenté (hiérarchie du regard), avec une réserve métier : deux secondes avant de voir « Réserver », « c'est long pour un site de restaurant ».
P4 T3 : T3-a « 1,8 seconde », calculé à partir des chiffres, contre 1 820 ms enregistrés (~1 810 ms à la visite) : **juste** ; T3-b « je ne l'ai pas jugé, je l'ai calculé » (doubler pour qu'un changement se remarque, rester sous 1,5 s), seule vérification à l'œil : l'image-clé de fin après l'allongement.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 15
• « La maison » [rh_about]
  - déclencheur n8viexmI6EZB · on=inView
    résumé : Quand « La maison » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu) de 700 à 1 400 ms, une seule fois.
    animation « Animation · La maison » [eFELYZpsoeOc] preset=- duration=2500 longueur=2500
    piste → « Photo de la salle » [rh_about_img] [nUxiJ7S0K3EE]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [QXAT6dyjhUPS]
      images-clés : 700ms {"opacity":"0"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] [HiROplj29sJ4]
      images-clés : 1400ms {}
    piste → « Années » [rh_stat1] [key77KvnL0ju]
      images-clés : 1800ms {}
(animations du site : 42 ; non utilisées : aucune)
== Journal
10:29:24 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about:triggers]
10:30:25 v2 « Durée de l'animation » [site.set:animations]
10:30:25 v3 « Durée de l'animation » [site.set:animations]
10:30:36 v4 « Ajouter une piste · Photo de la salle » [site.set:animations]
10:31:19 v5 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
10:31:31 v6 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
10:32:33 v7 « Décaler la piste » [site.set:animations]
10:32:33 v8 « Décaler la piste » [site.set:animations]
10:32:45 v9 « Remplir la piste · Fondu » [site.set:animations]
10:33:53 v10 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
10:35:02 v11 « Décaler la piste » [site.set:animations]
10:35:02 v12 « Décaler la piste » [site.set:animations]
10:35:26 v13 « Ajouter une piste · Années » [site.set:animations]
10:36:25 v14 « Décaler la piste » [site.set:animations]
10:36:25 v15 « Décaler la piste » [site.set:animations]
```

### Notes du préparateur
P4 T4 (pos 5, dernière mission de la vague) : lancée ; contrôle : visible, Écriture, stockage vidé, journal vide.
P4 T4 (pos 5) : **budget** à 40 actions ; journal : v1 « Nouvelle animation » sur la **section « La maison »** (déclencheur à l'entrée dans l'écran), v2/v3 durée 2 500 ms, v4 piste photo, v5 « Remplir la piste · Glissé depuis la gauche », v6 piste titre, v7/v8 décalage 700, v9 « Remplir la piste · Fondu » (au lieu de « Fondu en montant » : une ligne trop haut dans la liste), v10 piste paragraphe, v11/v12 décalage 1 400, v13 piste « Années », v14/v15 décalage 1 800 — pistes du paragraphe et du chiffre **jamais remplies** (une image-clé vide). Site v15 : scène unique sur la section, photo 0 → 700 ms, titre 700 → 1 400 ms (fondu simple), paragraphe et « Années » sans mouvement, une seule fois. Visite : photo 124 → 686 ms, titre 830 → 1 300 ms, rien d'autre ; **rien au retour**. Profil : C1 non (2/6), C2 oui pour les éléments présents, C3 non, C3b non, C4 non (fin 1 400 ms < 1 800), C5 non, C6 non. Statut proposé : E (mode de fin : budget). Écart du récit : il annonce un paragraphe « qui se dévoile en fondu », alors que sa piste est restée vide.
P4 T4 : SEQ 2 (« ce n'est pas la complexité de la scène … c'est le coût de chaque geste … Un de mes juniors n'aurait jamais fini ») ; T4-R juste sauf sur le paragraphe (annoncé « se dévoile », piste vide en réalité) ; conclusion : « une belle moitié de scène … pas livrable en l'état », « l'outil sait tout faire, … chaque réglage coûte trop cher en manipulations ».
P4 T4 : T4-a **cohérente** (piste « Paragraphe » dans la ligne de temps, champ « Départ » 1 400 → 1 100) ; relève que rien ne suit automatiquement derrière, et surtout **deux mots pour le même besoin** : le « Départ » d'une piste (dans la scène) et le « Délai » du déclencheur (rubrique repliée), « rien à l'écran n'explique lequel sert quand » ; aurait voulu tirer la barre de la piste à la souris. T4-b : la navigation, pas le réglage (« six ou sept manipulations » par élément, dont deux seulement sur le mouvement) ; deux incidents coûteux : la liste de préréglages serrée et le clic qui attrape le chiffre au lieu du bloc ; « comprendre le modèle … se saisit en trente secondes et c'est bien pensé. Le problème n'est pas de comprendre, c'est d'exécuter ».

