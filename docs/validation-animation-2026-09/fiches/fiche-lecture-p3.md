# Fiche de lecture du site enregistré · P3 (vague 3)

Ordre des tâches : T1 T5 T2 T3 T4. Pour chaque tâche : état de départ (copie de référence de la vague 3 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 1
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur wi1NABqHQgV2 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [B8fUTksxhUI2] preset=fade duration=700 longueur=700
    piste → élément déclencheur [KBSZhZkHxWjn]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
12:22:31 v1 « Apparition · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P3 T1 (pos 1) : terminé 9 actions ; site v1 : « Apparition · Fondu » à l'entrée dans l'écran sur le titre (700 ms, une seule fois) ; visite : o=0 avant l'entrée (pas d'éclair), fondu de 0 à 1 en ~500 ms après l'entrée ; statut proposé : C. SEQ 6.

## T5 (position 2)

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
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur L0ci8qDCgy5l · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [ngLRIC7GOWD4] preset=lift duration=250 longueur=250
    piste → élément déclencheur [z4aPAntEjGmm]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
12:30:49 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
12:32:01 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P3 T5 (pos 2) : terminé 15 actions ; site v2 (journal : v1 « En continu · aucun » sur la pastille, v2 « Au survol · Soulever » sur rh_hero_b1) ; visite : pastille zoom 0,97 → 1 en ~400 ms puis immobile sur 4 s (S1, S2) ; bouton : translateY −4 px atteint en ~140 ms au survol, retour à 0 en ~140 ms à la sortie, sans répétition (S3) ; rien d'autre modifié (S4) ; statut proposé : C. SEQ 5 (« survol » deviné par élimination).
P3 T5 : T5-a « elle bougera plus tout le temps », appuyé sur le compteur « +2 → +1 animation » du panneau, sans vérification sur le site ; T5-b : soulèvement au survol vu, retour à la sortie supposé (« une petite phrase sous le réglage pas vraiment lue »), pas testé.

## T2 (position 3)

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
== Journal
```

### Notes du préparateur
P3 T2 (pos 3) : terminé 27 actions ; **site inchangé** (version 0, journal vide). Déroulé (captures) : défile jusqu'aux plats sans ouvrir l'Aperçu ; clique une carte → inspecteur « Carte plat » : Apparition « Fondu en montant » héritée (« Arrive avec « Plats » … Au chargement de la page … ») ; rouvre la liste et reprend « Fondu en montant » (aucune opération) ; clique « Régler sur « Plats » » → panneau de la vue de base de données, section Animation en bas, non défilée (le choix du moment n'est jamais affiché) ; recommence sur les autres cartes. Constat de sélection : un clic sur la 3e carte, alors que la 2e (même modèle de carte répété) était choisie, a sélectionné l'« Image » intérieure au lieu de la carte (descente d'un niveau). Visite : surtitre et titre arrivent à l'entrée (o 0 → 1) ; les 3 cartes sont déjà à o=1, sans transformation, à l'arrivée (mouvement joué au chargement). Statut proposé : E.
P3 T2 : SEQ 3 ; T2-R : croit avoir mis les trois cartes sur « Avec Plats » « pour qu'elles suivent le même réglage que le bloc entier » (clic à y=232 dans la liste ouverte = option « Avec « Plats » », déjà l'état en vigueur : aucune opération ; la liste affiche ensuite « Fondu en montant ») ; doute sur la 3e carte ; rien vérifié.
P3 T2 : T2-a diagnostic **faux** (« chaque plat avait son propre réglage … séparé du bloc « Plats » … un conflit ») ; T2-b : n'a pas regardé le site, s'est fié à la consigne et aux réglages (VERIF non).

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
version 3
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur njh1MhZJ3oUb · on=load
    résumé : Au chargement de la page : Titre 1 « Le goût de l'Auvergne… » (fondu en montant) en 1 120 ms, puis « Réserver une table » (fondu en montant) de 1 120 à 1 620 ms et « Voir la carte » (fondu en montant) de 1 120 à 1 620 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=1620 longueur=1620
    piste → élément déclencheur [kfMtTydIx76G]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Réserver une table » [rh_hero_b1] start={"after":"kfMtTydIx76G"} [HokEdH_iX5YX]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Voir la carte » [rh_hero_b2] start={"after":"kfMtTydIx76G"} [nPX3yqaLtCnJ]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur [OHisTvva0JuG]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
12:48:23 v1 « Apparition · lente » [site.set:animations]
12:49:19 v2 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b1:triggers ; site.set:animations ; site.set:animations]
12:50:08 v3 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P3 T3 (pos 4) : terminé 17 actions ; site v3 (journal : v1 « Apparition · lente » sur le titre ; v2 et v3 « Apparition · démarre après Titre 1 » sur chaque bouton) ; site final : l'animation du titre porte trois pistes, titre 0 → 1 120 ms, boutons `start: after` titre de 1 120 à 1 620 ms ; paragraphe inchangé (500 ms au chargement). Critères : R1 (1 120 ms ≥ 900), R2 (départ 1 120 ≥ 80 % × 1 120 ; fin 1 620 ≤ 6 000, les deux boutons), R3, R4 remplis. Visite depuis l'ouverture (horloge de navigation) : titre o 0,42 → 1 entre ~200 et ~1 250 ms ; boutons o=0 et +28 px jusqu'à ~1 150 ms, puis o=1 à ~1 700 ms ; paragraphe fini à ~470 ms. Statut proposé : C.
P3 T3 : SEQ 6 (« Vitesse » trouvé direct ; « un choix tout fait « après Titre 1 » ») ; T3-R cohérent avec le site (titre plus doux, boutons juste après).
P3 T3 : T3-a « une seconde et demie, deux secondes … au pif » contre 1 620 ms enregistrés (~1 700 ms à la visite) : écart ≤ 30 % aux deux bornes, estimation **juste** ; T3-b : « Lente » surligné et « le petit chiffre » passé de 500 à 1 120, sans savoir ce qu'il représente.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 7
• « Photo de la salle » [rh_about_img]
  - déclencheur MzXWjuSTx0BH · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la droite) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms, puis Paragraphe « Aurèle et Nils ont… » (fondu) de 1 400 à 2 100 ms, à chaque passage.
    animation « Glissé depuis la droite » [CrZMVXkknfEU] preset=slide-left duration=2100 longueur=2100
    piste → élément déclencheur [nOh4q1GPsINK]
      images-clés : 0ms {"opacity":"0","transform":"translateX(40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"nOh4q1GPsINK"} [tH0qdg_rdbfd]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] start={"after":"tH0qdg_rdbfd"} [qoxuVekEPLDr]
      images-clés : 1400ms {"opacity":"0"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Années » [rh_stat1]
  - déclencheur nxxj9E8nLxLt · on=inView
    résumé : Quand « Années » entre dans l'écran : montée avec rebond en 800 ms, une seule fois.
    animation « Montée avec rebond » [koCYp0Av_EhL] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur [lhsTvqZJQ4Io]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
12:54:44 v1 « Apparition · Glissé depuis la droite » [site.set:animations ; node.set rh_about_img:triggers]
12:55:29 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
12:56:11 v3 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations]
12:56:28 v4 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
12:57:19 v5 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
12:57:49 v6 « Apparition · démarre après Titre 2 « Une cuisine de… » » [node.set rh_about_p:triggers ; site.set:animations ; site.set:animations]
12:59:10 v7 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat1:triggers]
```

### Notes du préparateur
P3 T4 (pos 5) : **abandon** à 38 actions (« Ça fait vraiment trop d'étapes qui se répètent … il m'en reste encore deux fois plus » ; ne sait pas où régler les « deux secondes et demie ») ; site v7 : une scène lancée par l'entrée à l'écran de la **photo** (`once=false`, à chaque passage) : photo glissé depuis la droite 0 → 700 ms (translateX 40 px), titre `start: after` photo 700 → 1 400 ms (translateY 28 px), paragraphe `start: after` titre 1 400 → 2 100 ms (fondu) ; chiffre « Années » : animation séparée « Montée avec rebond » à sa propre entrée, 800 ms, une seule fois ; « Couverts » et « Producteurs » : rien. Visite (défilement rapide, section en haut à 35 %) : photo 124 → 706 ms, titre 826 → 1 381, paragraphe 1 539 → 2 022, rejoué au retour (139 → 696, 835 → 1 378, 1 529 → 2 017) ; la section (939 px) dépasse l'écran : les chiffres entrent plus tard ; « Années » à son entrée : o 0 → 1 et y 28 → −2,7 → 0 px en ~1 040 ms (dépassement). Profil : C1 non (4/6), C2 non (deux événements, photo et chiffre), C3 non (chiffre lancé à 0 en supposant la section entrée d'un coup), C3b non, C4 oui (fin 2 100 ms), C5 non (deux chiffres immobiles), C6 non (chiffre une seule fois). Statut proposé : E (abandon).
P3 T4 : SEQ 2 ; T4-R juste sur l'enchaînement photo → titre → paragraphe, le « 12 » non relié et les deux autres chiffres immobiles ; **faux sur la répétition** : croit l'avoir mise « que sur le titre et le paragraphe, pas sur la photo », alors que le journal (v4 « Apparition · à chaque passage » sur rh_about_img) et le site la portent sur le déclencheur de la photo, qui rejoue toute la scène (visite : rejouée au retour).
P3 T4 : T4-a « sur « Démarre » je changerais « après Titre 2 » pour … « en même temps que Titre 2 » », sans toucher au « Délai » : **cohérente** avec la structure enregistrée (paragraphe `start: after` titre) ; T4-b : la répétition des mêmes réglages élément par élément.

