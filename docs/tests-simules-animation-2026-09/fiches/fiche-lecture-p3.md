# Fiche de lecture du site enregistré · P3 (vague 2)

Ordre des tâches : T1 T5 T2 T3 T4. Pour chaque tâche : état de départ (copie de référence ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur wdM8rlg7jfAK · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [x0fdsgG1Ox6l] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
07:08:35 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P3 T1 (pos 1) : terminé 9 actions ; site : inView fondu en montant 700 ms sur le titre (Écriture, choix rapide) ; visite : arrive à l'entrée (éclair o=1 avant départ, constat préparateur 1) ; statut préparateur proposé : C. SEQ 6.

## T5 (position 2)

### État de départ
```
version 0
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur vd1lkjF_CIbb · on=load delay=800
    résumé : Au chargement de la page, après 800 ms : pulsation en 1 200 ms, en boucle.
    animation « Pulsation » [bDlR946136sO] preset=pulse duration=1200 longueur=1200
    piste → élément déclencheur
      images-clés : 0ms {"transform":"scale(1)"} | 600ms/ease-in-out {"transform":"scale(1.05)"} | 1200ms/ease-in-out {"transform":"scale(1)"}
(animations du site : 43 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur m4Q4djH1rRnH · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [phwivukwXVqt] preset=lift duration=250 longueur=250
    piste → élément déclencheur
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur qutZWt3wSTQ- · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [daIg2iAgp9KV] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
07:11:08 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
07:11:41 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P3 T5 (pos 2) : terminé 25 actions ; site : boucle retirée (« En continu · aucun »), zoom d'arrivée gardé, « Soulever » au survol sur « Réserver une table » du héros ; visite : pastille stable après arrivée (3,5 s), bouton −4 px au survol en ~250 ms et retour ; statut proposé : C. SEQ 5.

## T2 (position 3)

### État de départ
```
version 0
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur mkGjNLQCbqxk · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [nJXEbeKmpNcq] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur iX6WePnLqlDI · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [G0VBXDt1E4Ds] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur nK9JEd39KM11 · on=load
    résumé : Au chargement de la page : les enfants de « Plats » un à un en 600 ms.
    animation « Fondu en montant » [U-z8-xgyyp7d] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants)
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 0
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur T3-sLuJEXQpp · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [_yyXB6WHkH2Y] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur nKB96CJ2j2Iv · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [BzZ6oVZHR-ZX] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur uuxj-I-mys0n · on=load
    résumé : Au chargement de la page : les enfants de « Plats » un à un en 600 ms.
    animation « Fondu en montant » [nyMGe3q62tD2] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants)
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
```

### Notes du préparateur
P3 T2 (pos 3) : budget 41 actions (77 appels d'outils) ; aucune modification (v0) ; diagnostic dit : « Plats » au chargement vs titre à l'entrée dans l'écran ; bloqué sur la sélection de « Carte plat » via le fil d'Ariane ; statut proposé : E. 

## T3 (position 4)

### État de départ
```
version 0
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur njh1MhZJ3oUb · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur DpNnQmOT_zQC · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [Wt-VXWPKZB46] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur e5kG_QqpAVcY · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [LZrSwdJwD_Ti] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 3
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur sGsQRq1CuUjy · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms.
    animation « Fondu en montant » [QS8ZiR3tK9ft] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur z8yLhF3XT7_0 · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [ix8_V1IQ-R7K] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur C7qtCnASvT1U · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [nrc_RZTyhpsd] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur JBtV1jraQzBo · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [f-3HDL68_M-R] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:19:43 v1 « Apparition · lente » [site.set:animations]
07:21:20 v2 « Remplir la piste · Rotation continue » [site.set:animations]
07:21:46 v3 « Remplir la piste · Rotation continue » [site.set:animations]
```

### Notes du préparateur
P3 T3 (pos 4) : abandon 21 actions (99 appels d'outils cumulés) ; titre passé en « lente » 1 120 ms (R1 ✓) ; boutons inchangés (R2 ✗) ; journal : « Remplir la piste · Rotation continue » posé puis annulé (ERR + REC) ; statut proposé : P.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 4
• « Photo de la salle » [rh_about_img]
  - déclencheur nr_B8bbnftjq · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, une seule fois.
    animation « Glissé depuis la gauche » [kBLCGaAcuI5d] preset=slide-right duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur f8GWG9v-hbPY · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [nvK6GcMXGECk] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur FnBO_L-XyaTE · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [PAW3vjGhWnrw] preset=fade duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• composant « Chiffre clé » › « Texte « 12 » » [rk_value] (vaut pour chaque instance)
  - déclencheur pd1OsWqhvjCr · on=inView
    résumé : Quand Texte « 12 » entre dans l'écran : glissé depuis la droite en 700 ms, une seule fois.
    animation « Glissé depuis la droite » [n6FJWw9mWmo9] preset=slide-left duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateX(40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:24:18 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
07:24:32 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
07:24:47 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
07:25:40 v4 « Apparition · Glissé depuis la droite » [site.set:animations ; node.set rk_value:triggers]
```

### Notes du préparateur
P3 T4 (pos 5) : terminé 34 actions (134 appels cumulés) ; 4 apparitions séparées à l'entrée dans l'écran : photo glissé gauche, titre fondu en montant, paragraphe fondu, et « Glissé depuis la droite » posé DANS le composant « Chiffre clé » (texte de la valeur, donc les 3 chiffres ensemble) ; profil : C1 ✓, C2 ✗, C3 ✗ (départs simultanés), C3b ✗, C4 ✗ (700 ms), C5 ✗ (pas de dépassement), C6 ✗ ; statut proposé : E. Note : modification d'un composant partagé (impact sur toute instance « Chiffre clé » du site) non remarquée → COLL-ND probable.

