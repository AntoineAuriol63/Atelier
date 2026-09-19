# Fiche de lecture du site enregistré · P5 (vague 4)

Ordre des tâches : T1 T3 T2 T5 T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur KC15Ofoy9Sz3 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [ncn_T4Sqmbqd] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [BsOYVJ_qc0WF]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
16:25:37 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P5 T1 (pos 1) : terminé 16 actions ; site v1 (journal : v1 « Apparition · Fondu en montant » sur rh_about_h2) : fondu en montant 700 ms à l'entrée dans l'écran du titre, une seule fois ; rien d'autre modifié. Visite (titre amené dans l'écran) : o=0 et +28 px avant l'entrée (pas d'éclair), 0 → 1 en ~930 ms. Critères R1 à R5 remplis. Statut proposé : C. Remarque : « Jouer dans le canevas » n'a rien montré de visible (ne voit pas le mouvement).
P5 T1 : SEQ 7 ; T1-R conforme au site (fondu en montant à l'entrée du titre, une seule fois, rien d'autre), durée supposée « une demi-seconde » (700 ms enregistrés), en précisant qu'elle n'a pas vu le mouvement.

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
  - déclencheur gswhn7mKcRX6 · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms (1,1 s).
    animation « Fondu en montant » [IEZwhIpHCWE4] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur [nkeDs0dl84GF]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur r2ZPra5-LlwK · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [ksurhMenWgYs] preset=fade duration=500 longueur=500
    piste → élément déclencheur [vqlfxfg2XHWu]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur XyGiIQLKOiay · on=load
    résumé : Au chargement de la page : « Réserver une table » (fondu en montant) de 1 200 à 1 700 ms (1,7 s).
    animation « Fondu en montant » [gurCy7wOgNPj] preset=fade-up duration=1700 longueur=1700
    piste → élément déclencheur [kFaC1qL24ZtH]
      images-clés : 1200ms {"opacity":"0","transform":"translateY(28px)"} | 1700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur ngHfm88d2-rg · on=load
    résumé : Au chargement de la page : « Voir la carte » (fondu en montant) de 1 350 à 1 850 ms (1,9 s).
    animation « Fondu en montant » [naGbaymgf1y4] preset=fade-up duration=1850 longueur=1850
    piste → élément déclencheur [Yn8f982vSevb]
      images-clés : 1350ms {"opacity":"0","transform":"translateY(28px)"} | 1850ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
16:29:05 v1 « Apparition · lente » [site.set:animations]
16:29:52 v2 « Apparition · délai » [site.set:animations]
16:30:34 v3 « Apparition · délai » [site.set:animations]
```

### Notes du préparateur
P5 T3 (pos 2) : terminé 21 actions ; journal : v1 « Apparition · lente » (titre 500 → 1 120 ms), v2/v3 « Apparition · délai » ; site v3 : titre 1 120 ms au chargement, « Réserver une table » 1 200 → 1 700 ms, « Voir la carte » 1 350 → 1 850 ms (délais posés à la main, décalages absolus, sans « après »), paragraphe inchangé. Visite au chargement : titre 0 → 1 en ~1 000 ms, boutons à o=0 pendant le titre puis pleins (échantillonnage grossier entre 1 et 2,3 s). Critères R1 (1 120 ≥ 900), R2 (départs 1 200 et 1 350 ≥ 896, fins ≤ 6 000), R3, R4 remplis. Statut proposé : C. Dit : vitesse en trois pastilles vs délai en ms, « 1 120 ms » valeur « qui tombe du ciel », enchaînement fait à la main comme dans Elementor.
P5 T3 : SEQ 6 ; T3-R conforme au site (titre 1,1 s, boutons 1,2 → 1,7 et 1,35 → 1,9 s, paragraphe inchangé), n'a pas vu le mouvement.

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
  - déclencheur NqxoAsQflGZk · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [NYunAFKrtC-7] preset=fade duration=600 longueur=600
    piste → élément déclencheur [CfwaU6a4Su6m]
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur uyEw0BSOeJKV · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [EfWhOH71HE2S] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur [nb55NM-rJdwu]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur cmBSyAs-JCmn · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois.
    animation « Fondu en montant » [Je_bXNdpeJR7] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [BXRRrnxWnQth]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:35:31 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P5 T2 (pos 3) : terminé 21 actions ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list (une seule opération) ; site v1 : déclencheur de « Plats » load → inView, effet et durée inchangés, titre et surtitre intacts. Visite : les 3 cartes o=0 et +28 px avant l'entrée, 0 → 1 en ~1 080 ms ensemble. Critères R1 à R5 remplis. Statut proposé : C. Dit : « Avec « Plats » » lu à la loupe, lien « Régler sur « Plats » » trouvé ; a vu « les cartes une à une » sans la cocher.
P5 T2 : SEQ 6 ; T2-R conforme au site (trois cartes ensemble en 600 ms à l'entrée, une seule fois, titre inchangé) ; diagnostic dans le récit juste ; « Avec « Plats » · Fondu en montant » aurait pu la tromper sans le texte gris ; « Tester sur le site » : arrivée directe sur les plats mais mouvement déjà fini.

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
  - déclencheur iruor7jvv0P_ · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [uuXLJeiRMWpn] preset=lift duration=250 longueur=250
    piste → élément déclencheur [dI6LTA6st8RO]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur tKe2lY4vgJR5 · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [a9QTbvBfuOna] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [rbyS-AKJ-KYC]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
16:39:14 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
16:40:16 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P5 T5 (pos 4) : terminé 21 actions ; journal : v1 « En continu · aucun », v2 « Au survol · Soulever » ; site v2 : pastille zoom 500 ms après 300 ms (inchangé), bouton soulever 250 ms au survol avec retour. Visite au chargement : pastille o=0, échelle 0,92 jusqu'à ~350 ms puis 0 → 1 en ~400 ms, immobile ensuite. Critères S1 à S4 remplis. Statut proposé : C. Dit : « la plus agréable des quatre » ; a enfin vu un mouvement grâce à « Tester sur le site » (lien à rendre visible dès le début).
P5 T5 : SEQ 7 ; T5-R conforme (zoom après 0,3 s puis immobile ; bouton soulevé au survol, retour au départ) ; le survol vu dans l'aperçu (le seul mouvement vu de la séance).

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 8
• « Photo de la salle » [rh_about_img]
  - déclencheur x17yTAfcN5XC · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, à chaque passage.
    animation « Glissé depuis la gauche » [om-4PP3EpvnY] preset=slide-right duration=700 longueur=700
    piste → élément déclencheur [WvsRdpmd2Ie6]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur VdQT7RwdYuwJ · on=inView once=false
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : Titre 2 « Une cuisine de… » (fondu en montant) de 600 à 1 300 ms (1,3 s), à chaque passage.
    animation « Fondu en montant » [G_YQ5YAxalM-] preset=fade-up duration=1300 longueur=1300
    piste → élément déclencheur [FGKt5IisJJux]
      images-clés : 600ms {"opacity":"0","transform":"translateY(28px)"} | 1300ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Chiffres » [rh_stats]
  - déclencheur a1y1K0N08Pfq · on=inView once=false
    résumé : Quand « Chiffres » entre dans l'écran : les enfants de « Chiffres » un à un (tous les 100 ms) (montée avec rebond) en 800 ms, à chaque passage.
    animation « Montée avec rebond » [nGzGZcakbI0y] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur (enfants) stagger={"each":100} [QxiDvCIx7XEu]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
16:44:44 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
16:45:21 v2 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
16:46:02 v3 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
16:46:50 v4 « Apparition · délai » [site.set:animations]
16:46:56 v5 « Apparition · à chaque passage » [node.set rh_about_h2:triggers]
16:49:02 v6 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stats:triggers]
16:49:24 v7 « Apparition enfant par enfant » [site.set:animations]
16:50:03 v8 « Apparition · à chaque passage » [node.set rh_stats:triggers]
```

### Notes du préparateur
P5 T4 (pos 5) : BUDGET (40 actions) ; journal v1–v8 tout par les choix rapides de l'Écriture : photo « Glissé depuis la gauche » 700 ms à chaque passage ; titre « Fondu en montant » de 600 à 1 300 ms à chaque passage ; « Chiffres » « Montée avec rebond » 800 ms, enfants un à un tous les 100 ms, à chaque passage ; paragraphe sans animation ; chacun sur son propre « entre dans l'écran ». Visite (défilement d'un coup sur les chiffres) : photo 0 → 874 ms, titre 600 → 1 490 ms, chiffres ~200/300/400 ms (avant le titre), paragraphe o=1 immobile. Critères : C1 non (paragraphe), C2 non (lancements séparés), C3 non (chiffres avant le titre), C3b oui, C4 oui (fin ~1,5 s… en fait < 1 800 ms : non), C5 partiel (photo −40 px, titre +28 px, rebond sur les chiffres), C6 oui. Statut proposé : E (échec), mode BUD. Structure H7 : lancements séparés avec retards. Dit : a vu « après Titre 2 » dans Démarre trop tard ; six éléments × 4–5 réglages ; agacement 4.
P5 T4-SEQ 3 (pas difficile, long et répétitif, « en aveugle », pas d'endroit où voir la scène entière) ; T4-R honnête et conforme au site : ordre cassé (photo et chiffres ensemble, titre après, paragraphe immobile), « à chaque passage » partout ; doute sur les moments d'entrée distincts ; a vu « après Titre 2 » trop tard.
P5 T4-a : cohérente avec la structure enregistrée (poserait un fondu sur le paragraphe puis un délai calculé à la main, et devrait retoucher « Chiffres ») ; mentionne « après tel élément » sans l'avoir essayé. T4-b : répétition (dix manipulations par élément, rubrique en bas du panneau à faire défiler), écran « composant / instances » sur le premier chiffre (peur, fil d'Ariane raté car trop petit), aucune vue d'ensemble de la scène (perte de confiance). Débriefing P5 lancé.

