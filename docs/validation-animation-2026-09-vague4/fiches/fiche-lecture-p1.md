# Fiche de lecture du site enregistré · P1 (vague 4)

Ordre des tâches : T1 T2 T3 T5 T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur exv3d-8nc7xt · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [uBATyZD2wObN] preset=fade duration=700 longueur=700
    piste → élément déclencheur [DRbvcmTcl5HF]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:25:34 v1 « Apparition · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P1 T1 (pos 1) : terminé 23 actions ; site v1 (journal : v1 « Apparition · Fondu » sur rh_about_h2) : fondu 700 ms à l'entrée dans l'écran du titre, une seule fois ; rien d'autre modifié. Visite : o=0 avant l'entrée (pas d'éclair), 0 → 1 en ~720 ms. Critères R1 à R5 remplis. Statut proposé : C. Dit : mots « survol » et « ms » non compris ; n'a pas vu le mouvement, a « cru sur parole » la phrase.
P1 T1 : SEQ 6 ; T1-R conforme au site (fondu à l'arrivée du titre, « même pas une seconde », une seule fois, rien d'autre) ; « 700 ms » lu sans savoir le traduire ; précise qu'elle répète ce que le logiciel a écrit, sans avoir vu le mouvement.

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
version 1
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
  - déclencheur o7mgglfewye3 · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [fqSrKHdzQRDd] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [nWp7esWgYS_2]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:30:57 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P1 T2 (pos 2) : terminé 21 actions ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list (une seule opération) ; site v1 : le déclencheur de « Plats » passe de load à inView, fondu en montant 600 ms sur les enfants, surtitre et titre intacts. Visite : les 3 cartes o=0 et +28 px avant l'entrée, 0 → 1 en ~1 080 ms ensemble ; surtitre et titre inchangés. Critères R1 à R5 remplis. Statut proposé : C. Chemin : clic sur un plat → phrase « Arrive avec « Plats » » (« en jaune ») sans ligne Démarre → « Régler sur « Plats » » → Démarre. Dit : « les enfants de Plats » non compris (préférerait « les trois plats »).
P1 T2 : SEQ 5 ; T2-R conforme au site (titre inchangé, les trois plats en fondu en montant ensemble à l'arrivée, 600 « ms », une seule fois) ; diagnostic dans le récit juste (partait dès l'ouverture).

## T3 (position 3)

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
  - déclencheur Lh2n6b0zOsoR · on=load
    résumé : Au chargement de la page : Titre 1 « Le goût de l'Auvergne… » (fondu en montant) en 1 120 ms (1,1 s), puis « Réserver une table » (fondu en montant) de 1 120 à 1 620 ms (1,6 s) et « Voir la carte » (fondu en montant) de 1 120 à 1 620 ms (1,6 s).
    animation « Fondu en montant » [nelkIcw9M4hT] preset=fade-up duration=1620 longueur=1620
    piste → élément déclencheur [P5mSTJPobZ1c]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Réserver une table » [rh_hero_b1] start={"after":"P5mSTJPobZ1c"} [nGrF1-YTUfeC]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Voir la carte » [rh_hero_b2] start={"after":"P5mSTJPobZ1c"} [aJCtOTzd1POh]
      images-clés : 1120ms {"opacity":"0","transform":"translateY(28px)"} | 1620ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur joFC3WIC3C8L · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [YBefK8-oWr9-] preset=fade duration=500 longueur=500
    piste → élément déclencheur [udiAuUCTqXY3]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:34:53 v1 « Apparition · lente » [site.set:animations]
16:36:06 v2 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b1:triggers ; site.set:animations ; site.set:animations]
16:37:04 v3 « Apparition · démarre après Titre 1 « Le goût de l'Auvergne… » » [node.set rh_hero_b2:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P1 T3 (pos 3) : terminé 25 actions ; journal : v1 « Apparition · lente », v2 et v3 « démarre après Titre 1 » ; site v3 : titre 1 120 ms, boutons start:after 1 120 → 1 620 ms, paragraphe inchangé. Visite au chargement : titre 0 → 1 en ~1 100 ms, boutons o=0 jusqu'à ~1 200 ms puis pleins vers ~1 620 ms. Critères R1 à R4 remplis. Statut proposé : C. SEQ 6 ; T3-R conforme (titre 1,1 s puis boutons ensemble 1 120 → 1 620) ; a fait deux fois le même geste (un par bouton) ; liste « Démarre » longue avec des noms entre guillemets non reliés à la page ; « je n'ai rien vu ».

## T5 (position 4)

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
  - déclencheur MUsC8Rx6mj6c · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [nbztKX_tTw98] preset=lift duration=250 longueur=250
    piste → élément déclencheur [C6mtpbgmMcvc]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur qJ0mbsuD3F3k · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [Iq0WeWZUtR1z] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [nlEEm2Tk5DnV]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:41:16 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
16:42:33 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P1 T5 (pos 4) : terminé 24 actions ; journal : v1 « En continu · aucun », v2 « Au survol · Soulever » ; site v2 : pastille zoom 500 ms après 300 ms (inchangé), bouton soulever 250 ms au survol avec retour. Visite au chargement : pastille o=0/0,92 puis 0 → 1 vers ~840 ms, immobile ensuite. Critères S1 à S4 remplis. Statut proposé : C. Dit : « En continu » limpide ; « survol » non compris, trouvé par élimination ; la liste (Grossir, Soulever, Éclaircir) dit quoi mais pas quand.
P1 T5-SEQ 5 (pastille 7, bouton 5 à cause de « survol ») ; T5-R conforme ; a VU le bouton soulevé dans l'aperçu (seule constatation directe de sa séance) ; ne peut pas confirmer l'arrêt de la pulsation à l'œil.
P1 T5-a/b : déduit de « En continu · Aucun », de la disparition de la phrase et du compteur « + 2 » → « + 1 » ; pas vu à l'œil. T5-b conforme, lit « puis retour quand la souris part » (donc P1 a eu le retour par défaut via le choix rapide Soulever, contrairement à P4 en mode Animation). Mission T4 envoyée.

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
  - déclencheur uU3zqTUpu104 · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), puis Paragraphe « Aurèle et Nils ont… » (fondu) de 1 400 à 2 100 ms (2,1 s), à chaque passage.
    animation « Glissé depuis la gauche » [nSteEar9dcsv] preset=slide-right duration=2100 longueur=2100
    piste → élément déclencheur [nrtFCu9JW4Ro]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"nrtFCu9JW4Ro"} [nxbxLuJ9BP2h]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] start={"after":"nxbxLuJ9BP2h"} [ImA_z7ZmSWda]
      images-clés : 1400ms {"opacity":"0"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Chiffres » [rh_stats]
  - déclencheur DRIXIJ6EBkO6 · on=inView
    résumé : Quand « Chiffres » entre dans l'écran : montée avec rebond en 800 ms, une seule fois.
    animation « Montée avec rebond » [nxNuV7s4TftX] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur [vS33VcbBe9V8]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:49:41 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
16:50:20 v2 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
16:51:24 v3 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
16:51:58 v4 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations]
16:52:29 v5 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
16:52:56 v6 « Apparition · démarre après Titre 2 « Une cuisine de… » » [node.set rh_about_p:triggers ; site.set:animations ; site.set:animations]
16:54:13 v7 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stats:triggers]
```

### Notes du préparateur
P1 T4-SEQ 2 ; T4-R : décrit l'enchaînement photo → titre → paragraphe (conforme), les chiffres avec la photo et ensemble (conforme), mais croit que titre et paragraphe restent « une seule fois » alors qu'ils sont dans l'animation de la photo, rejouée à chaque passage (écart de modèle mental : le « rejouer » de la chaîne est porté par la photo) ; « personne ne m'a dit en tout votre scène dure tant ».
P1 T4-a : cohérente avec la structure (irait sur « Démarre » du paragraphe) mais ne trouve pas de « un peu plus tôt » : « après » ou « en même temps que », rien entre ; « Délai » compris comme date limite, un délai ne fait qu'arriver plus tard (idée de valeur négative écartée). T4-b : répétition (quatre fois le même geste + rejouer), liste « Démarre » qui s'allonge (noms coupés, loupe nécessaire), écran « Composant · Chiffre clé · 3 instances » qui a fait peur, retrouvé le groupe « Chiffres » grâce à l'expérience des plats. Débriefing P1 lancé.

