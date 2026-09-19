# Fiche de lecture du site enregistré · P4 (vague 4)

Ordre des tâches : T1 T2 T5 T3 T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 8
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur s_mBGxZ54lKi · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : Titre 2 « Une cuisine de… » en 1 000 ms (1 s), une seule fois.
    animation « Animation · Titre 2 « Une cuisine de… » » [V780OE24DOEy] preset=- duration=1000 longueur=1000
    piste → élément déclencheur [johuHMip5Jaf]
      images-clés : 0ms {"opacity":"0","transform":"translate(0px, 24px)"} | 1000ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:25:34 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about_h2:triggers]
16:25:55 v2 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
16:26:41 v3 « opacity (image-clé à 0 ms) » [site.set:animations]
16:27:06 v4 « transform (image-clé à 0 ms) » [site.set:animations]
16:28:00 v5 « opacity (image-clé à 990 ms) » [site.set:animations]
16:28:23 v6 « transform (image-clé à 990 ms) » [site.set:animations]
16:28:41 v7 « Déplacer l'image-clé » [site.set:animations]
16:29:24 v8 « Courbe du segment » [site.set:animations]
```

### Notes du préparateur
P4 T1 (pos 1) : terminé 38 actions ; site v8 (journal : v1 « Nouvelle animation », v2 « Ajouter une piste · Titre 2 », v3/v4 images-clés à 0 ms (opacité, transform), v5/v6 à 990 ms, v7 « Déplacer l'image-clé », v8 « Courbe du segment ») : animation composée à la main dans le mode Animation, opacité 0 → 1 et y 24 px → 0 en 1 000 ms, courbe Doux (sortie), à l'entrée dans l'écran, une seule fois ; rien d'autre modifié. Visite : o=0 et +24 px avant l'entrée, 0 → 1 en ~1 000 ms. Critères R1 à R5 remplis. Statut proposé : C. Réserves déclarées : pas de courbe réglable à la main (liste de neuf mots), doute sur des pastilles allumées sur Échelle/Rotation/Flou non touchés ; la vue a sauté en haut de page en passant en mode Animation ; deux boutons « Animer » / « Lancer une animation » qui semblent faire pareil.
P4 T1 : SEQ 6 ; T1-R conforme au site (transparent puis opaque en remontant de 24 px en 1 s, sortie douce, une seule fois) ; « Tester sur le site » amène sur la section mais l'animation était finie ; demande une lecture en boucle ou une tête de lecture visible dans l'aperçu.

## T2 (position 2)

### État de départ
```
version 0
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur CnchElyiFCsM · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [lv72NBVRLZmP] preset=fade duration=600 longueur=600
    piste → élément déclencheur [x_Ng1llaZLIb]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur kWiCyG1elqhU · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [raRgrOH2Q0ZQ] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [MzNb3gJy7_i6]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur o7mgglfewye3 · on=load
    résumé : Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms.
    animation « Fondu en montant » [fqSrKHdzQRDd] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [nWp7esWgYS_2]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 2
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur cMBuuq-jLqjm · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [yey73fal1POp] preset=fade duration=600 longueur=600
    piste → élément déclencheur [pSqxdTvoSF7Q]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur na1Ghw5a4FAp · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [nryFuvsc2djM] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [nUgT0wd9FGVj]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur PDDkBedIldr5 · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » un à un (tous les 90 ms) (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [a7XhqU5G5BDz] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) stagger={"each":90} [eNzANoEFZm27]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:34:43 v1 « Déclencheur » [node.set rh_dishes_list:triggers]
16:35:22 v2 « Décalage de la piste » [site.set:animations]
```

### Notes du préparateur
P4 T2 (pos 2) : terminé 25 actions ; journal : v1 « Déclencheur » (rh_dishes_list : load → inView), v2 « Décalage de la piste » (enfants un à un, 90 ms) ; site v2 : fondu en montant 600 ms sur les enfants, décalés de 90 ms, à l'entrée dans l'écran ; titre et surtitre intacts. Visite : cartes o=0 et +28 px avant l'entrée, 1re 0 → 1 en ~1 080 ms, 2e décalée de ~50–90 ms, 3e ensuite. Critères R1 à R5 remplis. Statut proposé : C. Dit : pas d'avertissement pour « au chargement » sur un élément hors du premier écran ; a lu « un à un » alors que le décalage était à zéro (à vérifier : la phrase dit « ensemble » sans décalage) ; « Tester sur le site » collé en fin de paragraphe.
P4 T2 : SEQ 6 ; T2-R conforme au site (vague de gauche à droite, 90 ms d'écart, 600 ms, une seule fois) ; diagnostic dans le récit juste ; « l'outil ne m'a pas aidé à le poser » ; réglé à l'aveugle, titre non revérifié.

## T5 (position 3)

### État de départ
```
version 0
• « Pastille » [rh_hero_badge]
  - déclencheur qJ0mbsuD3F3k · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [Iq0WeWZUtR1z] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [nlEEm2Tk5DnV]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur n3o35CjtocRy · on=load delay=800
    résumé : Au chargement de la page, après 800 ms : pulsation en 1 200 ms (1,2 s), en boucle.
    animation « Pulsation » [dNQkZuHRGOOW] preset=pulse duration=1200 longueur=1200
    piste → élément déclencheur [tGaOSN5rUAGA]
      images-clés : 0ms {"transform":"scale(1)"} | 600ms/ease-in-out {"transform":"scale(1.05)"} | 1200ms/ease-in-out {"transform":"scale(1)"}
(animations du site : 43 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 6
• « Réserver une table » [rh_hero_b1]
  - déclencheur Nj5G4ErB9QHG · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : « Réserver une table » en 180 ms, puis retour quand la souris part.
    animation « Animation · Réserver une table » [jmY-4T57D2kB] preset=- duration=180 longueur=180
    piste → élément déclencheur [bZNpDDrjr1pu]
      images-clés : 0ms {} | 180ms {"transform":"scale(1.04)"}
• « Pastille » [rh_hero_badge]
  - déclencheur nf52ML-AzrZ2 · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [XhjFT0m0iWf1] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [imYfH3wUe30C]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:39:56 v1 « Retirer le déclencheur » [node.set rh_hero_badge:triggers ; site.set:animations]
16:41:12 v2 « Nouvelle animation » [site.set:animations ; node.set rh_hero_b1:triggers]
16:41:29 v3 « Ajouter une piste · Réserver une table » [site.set:animations]
16:41:44 v4 « Durée de l'animation » [site.set:animations]
16:43:13 v5 « transform (image-clé à 180 ms) » [site.set:animations]
16:43:33 v6 « Au départ de la souris » [node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P4 T5 (pos 3) : terminé 36 actions ; journal : v1 « Retirer le déclencheur » (pulsation), v2 « Nouvelle animation » sur rh_hero_b1, v3 piste, v4 durée 180 ms, v5 image-clé scale(1.04) à 180 ms, v6 « Au départ de la souris » (revient) ; site v6 : pastille zoom 500 ms après 300 ms (inchangé), bouton survol composé à la main (échelle 1,04 en 180 ms, retour au départ). Visite au chargement : pastille o=0/0,92 jusqu'à ~350 ms puis 0 → 1 en ~500 ms, immobile ensuite. Critères S1, S2, S3 (échelle +4 % en 180 ms, retour), S4 remplis. Statut proposé : C. Dit : deux croix identiques (fermer / supprimer) sans confirmation ; clic sur la règle irrégulier ; défaut « reste ainsi » au survol jugé mauvais ; la phrase de résumé « ce que l'outil fait de mieux ».
P4 T5 : SEQ 5 (deux croix, règle de temps qui n'a pas répondu au clic) ; T5-R conforme (pastille zoom puis silence ; bouton +4 % en 180 ms puis retour) ; rien vu.
P4 T5-a/b : « ne bougera plus » déduit de la ligne « en boucle · 1 200 ms » supprimée + rubrique Effets continus vérifiée ; pas constaté à l'œil. T5-b conforme (+4 % en 180 ms, retour) mais insiste : défaut « reste ainsi quand la souris part » jugé mauvais ; case « se coupe » jugée trompeuse (devient « revient en arrière » une fois cochée) — trouvée grâce à la phrase de résumé.

## T3 (position 4)

### État de départ
```
version 0
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur Lh2n6b0zOsoR · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [nelkIcw9M4hT] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [P5mSTJPobZ1c]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur joFC3WIC3C8L · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [YBefK8-oWr9-] preset=fade duration=500 longueur=500
    piste → élément déclencheur [udiAuUCTqXY3]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur n0qdady3hr-- · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [Ep36JsaHI8m1] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [nGrF1-YTUfeC]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur lum_OUoDLdN6 · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [nwIUpuxkQ5Et] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [aJCtOTzd1POh]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 3
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur naFRqFoPHRyZ · on=load
    résumé : Au chargement de la page : fondu en montant en 1 200 ms (1,2 s).
    animation « Fondu en montant » [nUrzhkUEjGDu] preset=fade-up duration=1200 longueur=1200
    piste → élément déclencheur [_XN570v1l3cL]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1200ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur NaMcSttdlzSE · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [usb374iqZHpn] preset=fade duration=500 longueur=500
    piste → élément déclencheur [fc75YQzeVd8G]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur nCe66LOSMrrl · on=load delay=1200
    résumé : Au chargement de la page, après 1 200 ms : fondu en montant en 500 ms.
    animation « Fondu en montant » [gqhPaRYyx6DS] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [nsOXLUcOdsqb]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur mwNwO4cNaYhm · on=load delay=1320
    résumé : Au chargement de la page, après 1 320 ms : fondu en montant en 500 ms.
    animation « Fondu en montant » [n8JXCx0-fBKK] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [rqYu_TrAp6un]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
16:48:47 v1 « Durée de l'animation » [site.set:animations]
16:50:22 v2 « Délai » [node.set rh_hero_b1:triggers]
16:51:36 v3 « Délai » [node.set rh_hero_b2:triggers]
```

### Notes du préparateur
P4 T3 (pos 4) : terminé 26 actions ; journal : v1 « Durée de l'animation » (titre 500 → 1 200 ms, en mode Animation), v2 « Délai » rh_hero_b1 1 200 ms, v3 « Délai » rh_hero_b2 1 320 ms ; site v3 : titre fondu en montant 1 200 ms au chargement, boutons après 1 200 et 1 320 ms (500 ms chacun), paragraphe inchangé (fondu 500 ms). Visite au chargement : titre 0 → ~1 (0,98 à 740 ms, courbe rapide au départ), boutons o=0 jusqu'à ~1 250 / ~1 390 ms puis pleins à ~1 750 / ~1 890 ms. Critères R1 à R4 remplis. Statut proposé : C. Dit : la clé de fin a suivi la durée (apprécié) ; signale le surtitre et le paragraphe qui arrivent avant le titre ; rien vu se jouer.
P4 T3-SEQ 6 (chiffres tapables ; clé de fin qui suit la durée apprécié ; −1 pour l'encart « cet élément n'est pas dans cette animation » à chaque changement d'élément) ; T3-R conforme au site (titre 1,2 s, boutons à 1,2 s puis +120 ms, fini vers 1,8 s), signale surtitre et paragraphe qui précèdent le titre ; rien vu.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 10
• « La maison » [rh_about]
  - déclencheur yD0iKQrzmIad · on=inView
    résumé : Quand « La maison » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), puis « Années » (montée avec rebond) de 1 600 à 2 400 ms (2,4 s), une seule fois.
    animation « Animation · La maison » [n5N4Zxflsi1J] preset=- duration=2500 longueur=2500
    piste → « Photo de la salle » [rh_about_img] [F9kXz0_IIJHp]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [sgOkaTlKlFQT]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Années » [rh_stat1] [aQXuhcXCjPB1]
      images-clés : 1600ms {"opacity":"0","transform":"translateY(28px)"} | 2400ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:55:43 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about:triggers]
16:56:26 v2 « Durée de l'animation » [site.set:animations]
16:56:39 v3 « Ajouter une piste · Photo de la salle » [site.set:animations]
16:57:20 v4 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
16:58:18 v5 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
16:59:24 v6 « Décaler la piste » [site.set:animations]
16:59:56 v7 « Remplir la piste · Fondu en montant » [site.set:animations]
17:00:09 v8 « Ajouter une piste · Années » [site.set:animations]
17:00:58 v9 « Décaler la piste » [site.set:animations]
17:01:20 v10 « Remplir la piste · Montée avec rebond » [site.set:animations]
```

### Notes du préparateur
P4 T4 (pos 5) : BUDGET (39 actions déclarées, arrêt de lui-même) ; tout en mode Animation : journal v1 « Nouvelle animation » sur la section « La maison » (inView), durée 2 500, trois pistes ajoutées/décalées/remplies : photo glissé 0 → 700, titre fondu en montant 700 → 1 400, « Années » montée avec rebond 1 600 → 2 400 ; paragraphe, « Couverts », « Places » sans piste ; déclencheur sans once=false (résumé « une seule fois »). Critères : C1 non, C2 oui, C3 oui (photo < titre < premier chiffre ; paragraphe absent), C3b non, C4 oui (2 400), C5 oui pour les présents, C6 non. Statut proposé : E, mode BUD. Structure H7 : un seul événement, pistes décalées à la main. Dit : n'a pas pu désigner le groupe des chiffres (clic dans la page tombe sur un enfant, pas d'arborescence à côté de la ligne de temps) ; a vu la cible « ses enfants, un à un » ailleurs ; signale que le résumé dit « une seule fois » alors que la case « Rejouer une seule fois » est décochée (À VÉRIFIER : défaut possible de TriggerSettings) ; photo absente dans l'éditeur car tête de lecture à 0.
P4 T4-SEQ 3 (modèle jugé bon, coût de six à huit manipulations par piste, impossible de désigner le groupe des chiffres, pas de liste de calques) ; T4-R conforme au site (photo 0 → 700, titre 700 → 1 400, « 12 » 1 600 → 2 400, paragraphe et deux autres chiffres immobiles, « une seule fois ») ; cite une case « Rejouer une seule fois » et un menu « Une fois » (Répéter ?) aux mêmes mots.
P4 T4-a : cohérente avec la structure (ajouter une piste par « Choisir un élément », taper un départ, préréglage Fondu ; sinon champ « Départ » de chaque piste) ; T4-b : viser les éléments dans la page (un départ tapé dans le vide après un décalage de 25 px du panneau ; le groupe des chiffres non attrapé → mission perdue) ; demande une liste des éléments à gauche de la ligne de temps ; a découvert tard, « par accident », que l'aperçu suit la tête de lecture (photo disparue à 0) ; demande un bouton « lecture » bien visible. Débriefing P4 lancé.

