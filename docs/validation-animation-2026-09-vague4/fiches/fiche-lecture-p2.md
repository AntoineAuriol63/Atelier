# Fiche de lecture du site enregistré · P2 (vague 4)

Ordre des tâches : T1 T3 T5 T2 T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 2
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur bKUvIqdM17_1 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [QXfnsdhb8Xbq] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [F7AVgKZef1i3]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:25:58 v1 « Apparition · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
16:26:48 v2 « Apparition · Fondu en montant » [site.set:animations ; site.set:animations]
```

### Notes du préparateur
P2 T1 (pos 1) : terminé 28 actions ; site v2 (journal : v1 « Apparition · Fondu », v2 « Apparition · Fondu en montant » sur rh_about_h2) : fondu en montant 700 ms à l'entrée dans l'écran du titre, une seule fois ; rien d'autre modifié. Visite : o=0 et +28 px avant l'entrée, 0 → 1 en ~720 ms. Critères R1 à R5 remplis. Statut proposé : C. Un clic raté sur le menu au début, corrigé ; agacement 2 ; ne peut pas certifier le mouvement à l'œil.
P2 T1 : SEQ 6 ; T1-R conforme au site (fondu en montant à l'entrée du titre, une seule fois), avec réserve : n'a vu que l'avant et l'après.

## T3 (position 2)

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
  - déclencheur XaszlSqZXhAn · on=load
    résumé : Au chargement de la page : Titre 1 « Le goût de l'Auvergne… » (fondu en montant) en 1 120 ms (1,1 s), puis « Réserver une table » (fondu en montant) de 1 120 à 1 620 ms (1,6 s) et « Voir la carte » (fondu en montant) de 1 120 à 1 620 ms (1,6 s).
    animation « Fondu en montant » [dqU0SkYyjBuP] preset=fade-up duration=1620 longueur=1620
    piste → élément déclencheur [kPMzsWmUghOc]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Réserver une table » [rh_hero_b1] start={"after":"kPMzsWmUghOc"} [u47FNR3ane8A]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Voir la carte » [rh_hero_b2] start={"after":"kPMzsWmUghOc"} [JFBGIcrbISb3]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur BHzHv_8iwlWo · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [nqVFyIutk_Lb] preset=fade duration=500 longueur=500
    piste → élément déclencheur [tarHGIwCm2z-]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:31:34 v1 « Apparition · lente » [site.set:animations]
16:32:46 v2 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b1:triggers ; site.set:animations ; site.set:animations]
16:33:52 v3 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P2 T3 (pos 2) : terminé 23 actions ; journal : v1 « Apparition · lente » (titre 500 → 1 120 ms), v2 et v3 « démarre après Titre 1 » sur chaque bouton ; site v3 : les deux boutons start:after le titre, 1 120 → 1 620 ms, dans l'animation du titre ; paragraphe inchangé. Visite au chargement : titre 0 → 1 en ~1 100 ms, boutons à o=0 jusqu'à ~1 120 ms puis 0 → 1 en ~500 ms (pleins à ~1 620 ms). Critères R1 à R4 remplis. Statut proposé : C. Agacement 1.
P2 T3 : SEQ 7 ; T3-R conforme au site (titre « un peu plus d'une seconde », puis les deux boutons ensemble), sous réserve de n'avoir rien vu bouger.

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
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur y6OVhxbW3MzB · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [n0uZFwrSoLxB] preset=lift duration=250 longueur=250
    piste → élément déclencheur [lDEnuOPeHUdl]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur dFD14figmkPE · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [RKP-cLhKwnnp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [ahXrOTiwf4eQ]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:36:33 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
16:37:41 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P2 T5 (pos 3) : terminé 15 actions ; journal : v1 « En continu · aucun », v2 « Au survol · Soulever » ; site v2 : pastille zoom 500 ms après 300 ms (inchangé), bouton soulever 250 ms au survol avec retour. Visite au chargement : pastille o=0, échelle 0,92 jusqu'à ~370 ms puis 0 → 1 en ~430 ms, immobile ensuite. Critères S1 à S4 remplis. Statut proposé : C. SEQ 7 ; T5-R conforme.

## T2 (position 4)

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
  - déclencheur xijUfbfpGzav · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [ezFCucRvpUUh] preset=fade duration=600 longueur=600
    piste → élément déclencheur [Ax2h-gx90kml]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur nCx3iV0Zumkt · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [n5n4VPS47jf-] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [B51QX2GKhkRo]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur LBdTq6702P2x · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [gNEKfCyx79BO] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [pBdF-ld-ybxf]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:48:20 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P2 T2 (pos 4) : BUDGET (42 actions déclarées) ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list (une seule opération, à la 24e action selon son récit) ; site v1 : déclencheur de « Plats » load → inView, fondu en montant 600 ms sur les enfants, surtitre et titre intacts. Visite : cartes o=0 et +28 px avant l'entrée, 0 → 1 en ~1 080 ms ; titre et surtitre inchangés. Critères R1 à R5 remplis. Statut proposé : C, mode de fin BUD → MM (ne savait pas avoir fini ; a passé le budget à chercher à sélectionner « Plats »). Dit : lien « Régler sur « Plats » » sans effet, fil d'Ariane sans effet, Échap désélectionne, menu déroulant resté ouvert, clic entre deux cartes a marché. Diagnostic juste (« dès l'ouverture de la page »).
P2 T2-SEQ 2 (logique comprise vite, sélection du parent très coûteuse) ; T2-R : décrit l'avant puis l'après avec réserves (« devrait ») ; T2-a diagnostic juste ; T2-b déduit par comparaison des « Démarre » du titre et du bloc.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 14
• « Photo de la salle » [rh_about_img]
  - déclencheur prN9NcGnEgub · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, « Couverts » (montée avec rebond) en 800 ms, Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), puis Paragraphe « Aurèle et Nils ont… » (fondu) de 1 400 à 2 100 ms (2,1 s), puis « Années » (montée avec rebond) de 2 100 à 2 900 ms (2,9 s), une seule fois.
    animation « Animation · Photo de la salle » [kRgJ9beevPJQ] preset=- duration=2900 longueur=2900
    piste → élément déclencheur [spUteB3_ReXf]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [LZX5Nqdr8TWC]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] [Jmp-T6e7_wAX]
      images-clés : 1400ms {"opacity":"0"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Années » [rh_stat1] [LBtL9aP3I3W9]
      images-clés : 2100ms {"opacity":"0","transform":"translateY(28px)"} | 2900ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Couverts » [rh_stat2] [JzDjLwaR9UbU]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:55:46 v1 « Animer Photo de la salle » [site.set:animations ; node.set rh_about_img:triggers]
16:56:41 v2 « Remplir la piste · Glissé depuis la droite » [site.set:animations]
16:58:15 v3 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
16:59:18 v4 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
17:00:01 v5 « Remplir la piste · Fondu en montant » [site.set:animations]
17:00:45 v6 « Décaler la piste » [site.set:animations]
17:02:24 v7 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
17:03:09 v8 « Remplir la piste · Fondu » [site.set:animations]
17:03:51 v9 « Décaler la piste » [site.set:animations]
08:12:25 v10 « Ajouter une piste · Années » [site.set:animations]
08:13:19 v11 « Remplir la piste · Montée avec rebond » [site.set:animations]
08:14:02 v12 « Décaler la piste » [site.set:animations]
08:14:49 v13 « Ajouter une piste · Couverts » [site.set:animations]
08:15:34 v14 « Remplir la piste · Montée avec rebond » [site.set:animations]
```

### Notes du préparateur
P2 T4 (pos 5) : BUDGET (« 88 environ », compte perdu ; agacement 5) ; tout en mode Animation, une seule animation sur la photo (inView, une seule fois) : photo glissé 0 → 700 (après un premier « Glissé depuis la droite » corrigé), titre 700 → 1 400, paragraphe 1 400 → 2 100, « Années » rebond 2 100 → 2 900, « Couverts » rebond 0 → 800 (non décalé : « impossible de retrouver le champ Départ » pour cette piste), « Producteurs » non traité. Visite (d'un coup) : photo 0 → 875, titre → 1 595, paragraphe → 2 065, « Années » et « Couverts » bougent, chiffre 3 immobile. Critères : C1 non, C2 oui, C3 oui, C3b non (Couverts à 0, Années à 2 100 : distincts en fait — oui), C4 oui (2 900), C5 oui pour les présents, C6 non. Statut proposé : E (C1), mode BUD. Structure H7 : un seul événement, pistes décalées à la main (mode Animation). À VÉRIFIER : champ « Départ » de piste absent pour la piste « Couverts » (TrackSettings).
P2 T4-SEQ 1 ; T4-R : photo → titre → paragraphe → « 12 » conforme ; « 38 » et « 14 » : « soit au tout début, soit pas du tout » (site : « 38 » à 0 → 800 avec la photo, « 14 » immobile) : incertitude déclarée, pas d'écart affirmé ; ne mentionne pas « une seule fois » (site : une seule fois, demande « à chaque passage » non remplie).
P2 T4-a : cohérente avec la structure (piste « Paragraphe », champ « Départ » 1 400 → 1 200) ; T4-b : le champ « Départ » de la piste « Couverts » introuvable (nom, losanges, barre essayés). Débriefing P2 lancé.

