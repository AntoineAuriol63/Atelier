# Fiche de lecture du site enregistré · P3 (vague 4)

Ordre des tâches : T1 T5 T2 T3 T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 4
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur sknKsUu61R_D · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : Titre 2 « Une cuisine de… » (fondu) en 700 ms, une seule fois.
    animation « Animation · Titre 2 « Une cuisine de… » » [Pn13WWmHZ6wS] preset=- duration=1000 longueur=1000
    piste → élément déclencheur [W5zPX3O3zn4E]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:26:26 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about_h2:triggers]
16:27:34 v2 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
16:28:14 v3 « Remplir la piste · Fondu » [site.set:animations]
16:28:56 v4 « Déclencheur » [node.set rh_about_h2:triggers]
```

### Notes du préparateur
P3 T1 (pos 1) : terminé 17 actions ; site v4 (journal : v1 « Nouvelle animation » sur rh_about_h2, v2 « Ajouter une piste · Titre 2 », v3 « Remplir la piste · Fondu », v4 « Déclencheur ») : animation composée dans le mode Animation, piste fondu 0 → 700 ms, déclencheur à l'entrée dans l'écran, une seule fois ; rien d'autre modifié. Visite : o=0 avant l'entrée, 0 → 1 en ~725 ms. Critères R1 à R5 remplis. Statut proposé : C. Dit « J'ai choisi une vignette dans la liste comme sur Canva ».
P3 T1 : SEQ 5 ; T1-R conforme au site (fondu à l'arrivée, « 700 ms … même pas une seconde »), n'a pas réussi à ouvrir le test ; « image-clé » l'a arrêté ; a cliqué sur des choses sans effet.

## T5 (position 2)

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
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur ZhQjhTCHweTT · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [E5f2PG2n4ig6] preset=lift duration=250 longueur=250
    piste → élément déclencheur [nM59Ow-cYIQu]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur n5yry2CkSvRr · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [Y6HVzAON6wya] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [sGAWcavmRO4c]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:32:33 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
16:33:37 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P3 T5 (pos 2) : terminé 9 actions ; journal : v1 « En continu · aucun » (pulsation retirée), v2 « Au survol · Soulever » sur rh_hero_b1 ; site v2 : pastille zoom 500 ms après 300 ms au chargement (inchangé), bouton soulever 250 ms au survol avec retour. Visite au chargement : pastille o=0 et échelle 0,92 jusqu'à ~490 ms puis 0 → 1 en ~470 ms, immobile ensuite. Critères S1 à S4 remplis. Statut proposé : C.
P3 T5 : SEQ 6 ; T5-R conforme au site (pastille arrive en zoom puis reste tranquille ; bouton se soulève au survol « un quart de seconde » et redescend au départ de la souris).

## T2 (position 3)

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
version 1
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur nQX02gkBXZKE · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [GAOFo4E5AJUv] preset=fade duration=600 longueur=600
    piste → élément déclencheur [Fo-9lb1Pnzga]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur hA-7vXjyQNqE · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [n4GeFhw_44a6] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [xDCjpLhH-NKG]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur nYV2qBMRK52T · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [Lh9cOL1wfGE_] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [IrX5abSLHRQx]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:37:18 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P3 T2 (pos 3) : terminé 9 actions ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list ; site v1 : déclencheur load → inView, titre et surtitre intacts. Visite : 3 cartes o=0 et +28 px avant l'entrée, 0 → 1 en ~1 080 ms. Critères R1 à R5 remplis. Statut proposé : C. SEQ 5 ; T2-R conforme (cartes montent en apparaissant à l'arrivée) ; diagnostic dans le récit juste ; a raté « Régler sur « Plats » » une fois.

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
  - déclencheur gu5nkK1Sv4ST · on=load
    résumé : Au chargement de la page : Titre 1 « Le goût de l'Auvergne… » (fondu en montant) en 1 120 ms (1,1 s), puis « Réserver une table » (fondu en montant) de 1 120 à 1 620 ms (1,6 s) et « Voir la carte » (fondu en montant) de 1 120 à 1 620 ms (1,6 s).
    animation « Fondu en montant » [gFm5ydutt_3M] preset=fade-up duration=1620 longueur=1620
    piste → élément déclencheur [o7WO2t30N9dV]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Réserver une table » [rh_hero_b1] start={"after":"o7WO2t30N9dV"} [_6TenNiEReTW]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Voir la carte » [rh_hero_b2] start={"after":"o7WO2t30N9dV"} [ZrsDeVRdZptH]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur ktqSP2Mv8YbQ · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [kGC_L2vFtDTj] preset=fade duration=500 longueur=500
    piste → élément déclencheur [UnFq46UXypwO]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:40:07 v1 « Apparition · lente » [site.set:animations]
16:41:01 v2 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b1:triggers ; site.set:animations ; site.set:animations]
16:41:57 v3 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P3 T3 : SEQ 6 ; T3-R conforme (titre « un peu plus d'une seconde », boutons invisibles puis ensemble juste après).

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 11
• « Photo de la salle » [rh_about_img]
  - déclencheur sdWWLveafvpV · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), puis Paragraphe « Aurèle et Nils ont… » (netteté) de 1 400 à 2 100 ms (2,1 s), puis « Années » (montée avec rebond) de 2 100 à 2 900 ms (2,9 s) et « Couverts » (montée avec rebond) de 2 100 à 2 900 ms (2,9 s), à chaque passage.
    animation « Glissé depuis la gauche » [kYAcQbq0HzBp] preset=slide-right duration=2900 longueur=2900
    piste → élément déclencheur [jxBCSMZCKZ6M]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"jxBCSMZCKZ6M"} [yiR3xFtRe1wW]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] start={"after":"yiR3xFtRe1wW"} [nm8KtINRpL2l]
      images-clés : 1400ms {"opacity":"0","filter":"blur(12px)"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Années » [rh_stat1] start={"after":"nm8KtINRpL2l"} [fUEP8jMvZUuN]
      images-clés : 2100ms {"opacity":"0","transform":"translateY(28px)"} | 2900ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Couverts » [rh_stat2] start={"after":"nm8KtINRpL2l"} [fFJRqzNLEaw7]
      images-clés : 2100ms {"opacity":"0","transform":"translateY(28px)"} | 2900ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:45:25 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
16:46:02 v2 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
16:46:55 v3 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
16:47:29 v4 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations]
16:48:48 v5 « Apparition · Netteté » [site.set:animations ; node.set rh_about_p:triggers]
16:49:24 v6 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_p:triggers ; site.set:animations ; site.set:animations]
16:50:03 v7 « Apparition · démarre après Titre 2 « Une cuisine de… » » [site.set:animations]
16:53:36 v8 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat1:triggers]
16:54:15 v9 « Apparition · démarre après Paragraphe « Aurèle et Nils ont… » » [node.set rh_stat1:triggers ; site.set:animations ; site.set:animations]
16:55:40 v10 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat2:triggers]
16:56:19 v11 « Apparition · démarre après Paragraphe « Aurèle et Nils ont… » » [node.set rh_stat2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P3 T4-SEQ 2 (même geste cinq fois, « après tel truc », mauvaise ligne cliquée plusieurs fois) ; T4-R : photo → titre → paragraphe → « 12 » avec rebond conforme ; croit que « 38 » démarre en même temps que le paragraphe alors que le site enregistre « après Paragraphe » (donc à 2 100 ms, avec « 12 ») : écart sur le « quand » ; « 14 » immobile : conforme.
P3 T4-a : cohérente avec la structure (« Démarre » du paragraphe : « après Titre 2 » → « en même temps que Titre 2 ») ; T4-b : a cherché à régler les trois chiffres d'un coup en cliquant « Chiffres » en haut (fil d'Ariane ?) et « ça sélectionnait un bloc trop grand » (à vérifier par l'observateur : le groupe « Chiffres » porte bien la case « les enfants un à un »), puis clics à côté dans les menus « Démarre ». Débriefing P3 lancé.

