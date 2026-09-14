# Fiche de lecture du site enregistré · P5 (vague 2)

Ordre des tâches : T1 T3 T2 T5 T4. Pour chaque tâche : état de départ (copie de référence ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur SYvA3bnSbMt5 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [W_HgcQdCJiuh] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
08:06:09 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P5 T1 (pos 1) : terminé 15 actions ; inView fondu en montant 700 ms sur le titre (choix rapide) ; configuration identique à P3 T1 (visite conforme) ; a vu l'aperçu joué dans l'éditeur (capture titre pâle) ; statut proposé : C.

## T3 (position 2)

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
version 5
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur nQXb_xrm2yWj · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms.
    animation « Fondu en montant » [nGrVe3jtvbEn] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur n_YO1F3toAGK · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [nJkuVSOOKQPx] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur KNg5jAK-yQ6x · on=load
    résumé : Au chargement de la page : « Réserver une table » de 1 200 à 1 700 ms.
    animation « Fondu en montant » [DSB7v27EUlt_] preset=fade-up duration=1700 longueur=1700
    piste → élément déclencheur
      images-clés : 1200ms {"opacity":"0","transform":"translateY(28px)"} | 1700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur GbmKUdkeT94m · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [L1Djt3YpmupG] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
08:08:16 v1 « Apparition · lente » [site.set:animations]
08:08:23 v2 « Apparition · lente » [site.set:animations]
08:10:07 v3 « Décaler la piste » [site.set:animations]
08:11:01 v4 « Ajouter une piste · Voir la carte » [site.set:animations]
08:11:20 v5 « Ajouter une piste · Voir la carte » [site.set:animations]
```

### Notes du préparateur
P5 T3 (pos 2) : budget 40 actions (56 appels) ; titre « Lente » 1 120 ms (R1 ✓) ; « Réserver une table » : piste décalée, fondu en montant de 1 200 à 1 700 ms (départ ≥ 896 ms ✓, fin ≤ 6 000 ✓) ; « Voir la carte » inchangé 0–500 ms (✗) ; journal : « Ajouter une piste · Voir la carte » posé puis annulé ; visite (lecture de l'animation CSS) : retard 1 200 ms, remplissage « both », image-clé de départ à opacité 0 → pas d'éclair ; statut proposé : P (R2 pour un seul bouton).

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
version 1
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur bCPNc13R2ecw · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [BWkbJOazoHZ1] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur mZX24KS8Y2jj · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [pwGVc9W95mkT] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur cHRgIq1mfmwv · on=load
    résumé : Au chargement de la page : les enfants de « Plats » un à un en 600 ms.
    animation « Fondu en montant » [njEFL7ZP99Mc] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants)
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur Ouq-Il1YC_mD · on=inView
    résumé : Quand « Plats » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [JkahMSJ4XD-H] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
08:16:24 v1 « Animation · Fondu en montant » [site.set:animations ; node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P5 T2 (pos 3) : budget 40 actions (93 appels cumulés) ; diagnostic juste (« Plats » au chargement) ; ajout d'un 2e déclencheur à l'entrée dans l'écran sur la liste « Plats » (fondu en montant 700 ms, bloc entier) ; l'ancien « au chargement » (enfants) conservé, badge « en double » ; n'a pas trouvé comment changer le « Quand » de l'animation existante ; visite : la liste arrive à l'entrée (o 0,34→1, 18 px), avec l'éclair o=1 avant départ ; statut proposé : C au regard des critères (liste acceptée) avec fin BUD → MM (le participant ignore avoir réussi) ; COLL : aucune.

## T5 (position 4)

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
  - déclencheur neK3yst3XNVM · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [CfycUYIlSdAZ] preset=lift duration=250 longueur=250
    piste → élément déclencheur
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur nAsZwr8Vj8xW · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [kN0YHf0m3ZVT] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
08:18:33 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
08:19:06 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P5 T5 (pos 4) : terminé 27 actions ; boucle retirée, zoom gardé, « Soulever » au survol sur « Réserver une table » du héros ; configuration identique à P3/P1 T5 (visite conforme) ; n'a pas pu voir le survol dans l'éditeur (barre d'outils de texte par-dessus le bouton) ; statut proposé : C.

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
  - déclencheur xedkSfDp2w07 · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, une seule fois.
    animation « Glissé depuis la gauche » [X-1fxYxaoEgR] preset=slide-right duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur xWwPlJt28Z0a · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [Ft6y3ICuHn4C] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur YbpVy1gS-FzN · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [n2WZpK5cPPxG] preset=fade duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• composant « Chiffre clé » › « Texte « 12 » » [rk_value] (vaut pour chaque instance)
  - déclencheur VGg0vjqOLpj9 · on=inView
    résumé : Quand Texte « 12 » entre dans l'écran : zoom en 700 ms, une seule fois.
    animation « Zoom » [bB1lvvGcDibq] preset=zoom duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
08:21:35 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
08:22:13 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
08:22:42 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
08:23:37 v4 « Apparition · Zoom » [site.set:animations ; node.set rk_value:triggers]
```

### Notes du préparateur
P5 T4 (pos 5) : budget 40 actions (147 appels cumulés) ; 4 apparitions séparées à l'entrée dans l'écran (photo glissé gauche, titre fondu en montant, paragraphe fondu, « Zoom » sur le texte de valeur DANS le composant « Chiffre clé » → les 3 chiffres ; croit « 38 et 14 n'ont probablement rien » → MM / COLL-ND) ; aucun délai, aucune répétition, pas de dépassement ; profil : C1 ✓ seul ; statut proposé : E. Même schéma que P3 et P1.

