# Fiche de lecture du site enregistré · P2 (vague 3)

Ordre des tâches : T1 T3 T5 T2 T4. Pour chaque tâche : état de départ (copie de référence de la vague 3 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur HajEGnCsl075 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [r2aeEpEJpGDv] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [HyYwwB2AE3LV]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:07:00 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P2 T1 (pos 1) : terminé 33 actions (15 captures, 4 loupes, 7 clics, 6 défilements, 1 survol) ; site v1 : « Apparition · Fondu en montant » à l'entrée dans l'écran du titre, 700 ms, une seule fois ; rien d'autre modifié. Visite : o=0 et +28 px avant, 0 → 1 en ~870 ms. Critères R1 à R5 remplis. Statut proposé : C. « Pour une fois un outil qui utilise des mots que je comprends tout de suite, ça change de Webflow » ; n'a pas vu le mouvement, seulement l'avant et l'après.
P2 T1 : SEQ 6 ; T1-R conforme au site (fondu en montant à l'entrée du titre, une seule fois, rien d'autre), avec réserve : « je n'ai jamais vu le mouvement se faire réellement sous mes yeux ».
P2 T1 : T1-a réflexe Figma (sélection d'abord, panneau à droite) ; T1-b : attendait interaction + déclencheur + courbe, a trouvé une section « Animation » repliée en bas du panneau avec « Apparition » et des noms clairs (« pas de jargon, ce qui change de Webflow ») ; surprise en bien que « quand il entre dans l'écran » soit déjà réglé par défaut.

## T3 (position 2)

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
09:16:56 v1 « Apparition · lente » [site.set:animations]
09:18:11 v2 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b1:triggers ; site.set:animations ; site.set:animations]
09:19:19 v3 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P2 T3 (pos 2) : terminé 25 actions ; journal : v1 « Apparition · lente » (titre 500 → 1 120 ms), v2 et v3 « démarre après Titre 1 » sur chaque bouton ; site v3 : les deux boutons `start: after` le titre, 1 120 → 1 620 ms ; paragraphe inchangé. Visite : titre plein à ~890 ms, boutons visibles à ~1 220 ms et pleins à ~1 590 ms. Critères R1 à R4 remplis. Statut proposé : C.
P2 T3 : SEQ 6 ; T3-R conforme au site (titre ~1,1 s, puis les deux boutons ensemble sur une demi-seconde, ~1,6 s au total).
P2 T3 : T3-a « environ 1,6 seconde » contre 1 620 ms enregistrés (~1 590 ms à la visite) : estimation **juste** (lue dans le panneau) ; T3-b « je me suis fiée au chiffre … j'ai pris le bouton « Lente » tel quel ».

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
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur OlnNIc0YfK1R · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [xfQ9tHtiLtbx] preset=lift duration=250 longueur=250
    piste → élément déclencheur [nl4MUs4ZW2AJ]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
09:23:15 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
09:24:36 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P2 T5 (pos 3) : terminé 24 actions (11 captures, 3 loupes, 9 clics, 1 survol) ; journal : v1 « En continu · aucun » (pulsation supprimée, comme P3), v2 « Au survol · Soulever » ; site v2 : pastille zoom 500 ms après 300 ms conservé, bouton du héros soulever 250 ms au survol avec retour. Visite : pastille o 0,67 → 1 et scale 0,974 → 1 en ~290 ms puis immobile sur 3,5 s ; bouton −4 px au survol, retour à 0 à la sortie. Critères S1 à S4 remplis. Statut proposé : C.
P2 T5 : SEQ 6 ; T5-R conforme au site (zoom conservé, plus de pulsation, soulèvement au survol et retour), avec une mention d'« ombre » non vérifiée dans le site (style du bouton, à contrôler par l'observateur).
P2 T5 : T5-a « non » appuyé sur le compteur « +2 → +1 animation » et sur « En continu : Aucun » ; T5-b juste, d'après la phrase, avec une vérification partielle (a vu l'ombre au survol, pas le retour).

## T2 (position 4)

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
version 1
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
  - déclencheur nK9JEd39KM11 · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [U-z8-xgyyp7d] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [Nl-NVSfHBpvN]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
09:32:49 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P2 T2 (pos 4) : terminé 33 actions (15 captures, 4 loupes, 9 clics, 5 défilements) ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list (une seule opération, comme P5) ; site v1 : déclencheur de « Plats » passé de `load` à `inView`, effet, durée et reste intacts. Visite : titre et les 3 cartes o=0 (+28 px) avant l'entrée, puis 0 → 1 en ~1 030 et ~1 080 ms. Critères R1 à R5 remplis. Statut proposé : C. Diagnostic énoncé juste et vérification en aperçu déclarée.
P2 T2 : SEQ 4 ; T2-R conforme au site (titre et les trois plats arrivent ensemble à l'entrée de la section).
P2 T2 : T2-a diagnostic **juste** (comparaison des réglages : le titre « quand il entre dans l'écran », les plats « dès l'ouverture ») ; T2-b « en comparant les réglages, pas en regardant l'écran ».

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 6
• « Photo de la salle » [rh_about_img]
  - déclencheur b1m0Remno7Kg · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms, à chaque passage.
    animation « Glissé depuis la gauche » [MqWIx54BFK5P] preset=slide-right duration=1400 longueur=1400
    piste → élément déclencheur [nryXH11e4A47]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"nryXH11e4A47"} [nkskbrECCa-x]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:39:16 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
09:40:02 v2 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
09:41:03 v3 « Apparition · Fondu en descendant » [site.set:animations ; node.set rh_about_h2:triggers]
09:41:47 v4 « Apparition · Fondu en montant » [site.set:animations ; site.set:animations]
09:45:18 v5 « Apparition · démarre quand « Contenu » entre dans l'écran » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations ; node.set rh_about_in:triggers ; site.set:animations]
09:46:39 v6 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_in:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P2 T4 (pos 5) : **budget dépassé** — 44 actions annoncées au lieu de 40 (écart au protocole, la participante dit avoir perdu le compte « en me débattant avec le menu Démarre ») ; 20 captures, 3 loupes, 18 clics, 3 défilements. Journal : v1 « Glissé depuis la gauche » (photo, entrée dans l'écran), v2 « à chaque passage », v3 « Fondu en descendant » puis v4 « Fondu en montant » (titre, correction), v5 « démarre quand « Contenu » entre dans l'écran » (déclencheur posé sur le conteneur), v6 « démarre après « Photo de la salle » » ; site v6 : photo 0 → 700 ms, titre `start: after` photo 700 → 1 400 ms, à chaque passage ; paragraphe et chiffres : rien. Profil : C1 non (2/6), C2 non, C3 non, C3b non, C4 non (fin 1 400 ms < 1 800), C5 non, C6 oui. Statut proposé : E (mode de fin : budget).
P2 T4 : visite : photo 124 → 694 ms, titre 821 → 1 372 ms, rejoué au retour (149 → 701, 837 → 1 394) ; paragraphe et chiffres immobiles.
P2 T4 : SEQ 2 ; T4-R prudent et conforme (photo qui glisse et rejoue ; incertitude assumée sur le « démarre après » du titre, qui est en fait bien enregistré ; paragraphe et chiffres non touchés).
P2 T4 : T4-a **cohérente** (ouvrir « Démarre » du paragraphe, le faire démarrer après un élément plus tôt ou réduire le délai, vérifier la phrase récapitulative) ; T4-b : « sans hésiter, le menu « Démarre » du titre » (ouverture vers le haut, position changeante, trois erreurs de ligne) — à trancher comme artefact du dispositif (constats, point 14).

