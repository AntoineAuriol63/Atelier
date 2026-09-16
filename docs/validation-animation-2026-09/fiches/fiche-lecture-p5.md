# Fiche de lecture du site enregistré · P5 (vague 3)

Ordre des tâches : T1 T3 T2 T5 T4. Pour chaque tâche : état de départ (copie de référence de la vague 3 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur K2wXDChKJAD9 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [HlwSBSwQgbPF] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [ngR2FsXhM7aE]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
07:34:14 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P5 T1 (pos 1) : terminé 19 actions (10 captures, 8 clics, 1 défilement ; aucune loupe) ; site v1 : « Apparition · Fondu en montant » à l'entrée dans l'écran du titre, 700 ms, une seule fois ; rien d'autre modifié. Visite (titre amené dans l'écran) : o=0 et +28 px avant, 0 → 1 en ~880 ms. Critères R1 à R5 remplis. Statut proposé : C. Dit que la rubrique Animation est « au même endroit que mon onglet Avancé », la liste « courte et en français clair », « aussi rapide qu'Elementor, voire plus », mais n'a **jamais vu le mouvement se jouer** (deux clics sur le bouton lecture sans changement visible sur les captures ; « Tester sur le site » montre le résultat, pas le mouvement).
P5 T1 : SEQ 6 (« trois clics », pas 7 faute d'avoir vu le résultat bouger) ; T1-R conforme au site (fondu en montant à l'arrivée, 700 ms, une seule fois), en précisant que c'est ce que l'outil affiche, pas ce qu'elle a constaté ; a vérifié sur « Tester sur le site » que le texte ne reste pas invisible ; rien vérifié sur téléphone.
P5 T1 : T1-a réflexe Elementor (clic sur l'élément, réglages à droite) ; a vu l'onglet « Animation » en haut mais ne l'a pas ouvert (« un espace à part, pas besoin pour un truc aussi simple ») ; T1-b : a trouvé « presque exactement » son attente sous le nom « Apparition » (rubrique dépliable, pas un onglet) ; apprécie « Démarre : quand il entre dans l'écran » par défaut et la phrase de résumé ; n'a pas trouvé comment voir l'animation se jouer (bouton lecture sans effet visible) ; mots non compris : « Netteté » (effet) et « canevas » (bulle du bouton lecture).

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
version 5
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur njh1MhZJ3oUb · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur [kfMtTydIx76G]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur [OHisTvva0JuG]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur DpNnQmOT_zQC · on=load
    résumé : Au chargement de la page : « Réserver une table » (fondu en montant) de 1 200 à 1 700 ms.
    animation « Fondu en montant » [Wt-VXWPKZB46] preset=fade-up duration=1700 longueur=1700
    piste → élément déclencheur [HokEdH_iX5YX]
      images-clés : 1200ms {"opacity":"0","transform":"translateY(28px)"} | 1700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur e5kG_QqpAVcY · on=load
    résumé : Au chargement de la page : « Voir la carte » (fondu en montant) de 1 350 à 1 850 ms.
    animation « Fondu en montant » [LZrSwdJwD_Ti] preset=fade-up duration=1850 longueur=1850
    piste → élément déclencheur [nPX3yqaLtCnJ]
      images-clés : 1350ms {"opacity":"0","transform":"translateY(28px)"} | 1850ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:38:30 v1 « Apparition · lente » [site.set:animations]
07:39:18 v2 « Apparition · délai » [site.set:animations]
07:39:18 v3 « Apparition · délai » [site.set:animations]
07:39:58 v4 « Apparition · délai » [site.set:animations]
07:39:58 v5 « Apparition · délai » [site.set:animations]
```

### Notes du préparateur
P5 T3 (pos 2) : terminé 23 actions (10 captures, 6 clics, 2 doubles-clics, 2 saisies, 2 touches, 1 défilement) ; journal : v1 « Apparition · lente » (titre 500 → 1 120 ms), v2/v3 puis v4/v5 « Apparition · délai » (doublons de validation, valeurs identiques) ; site v5 : titre 1 120 ms au chargement, « Réserver une table » 1 200 → 1 700 ms, « Voir la carte » 1 350 → 1 850 ms (décalages absolus, sans relation `start`), paragraphe inchangé. Visite : titre plein à ~975 ms, boutons visibles à ~1 390 et ~1 510 ms, pleins à ~1 720 et ~1 890 ms. Critères R1 (1 120 ≥ 900), R2 (départs 1 200 et 1 350 ≥ 896 ; fins ≤ 6 000), R3, R4 remplis. Statut proposé : C. Apprécie les phrases « de 1 200 à 1 850 ms » (« mieux qu'Elementor ») ; gênée par « Sur mesure : 500 ms » sans bouton de vitesse allumé à l'état de départ, et par l'impossibilité de voir la séquence se jouer.
P5 T3 : SEQ 6 ; T3-R conforme au site (titre « un peu plus d'une seconde », boutons ensuite à un cinquième de seconde d'écart, tout fini en moins de deux secondes) ; deux réserves : n'a pas vu le mouvement ; **a posé des délais fixes à la main** et note elle-même le risque (« si quelqu'un remet le titre en rapide …, l'enchaînement sera cassé sans que personne ne s'en rende compte ») sans avoir trouvé « Démarre : après ».
P5 T3 : T3-a « un peu moins de deux secondes … disons deux secondes » contre 1 850 ms enregistrés (~1 890 ms à la visite) : estimation **juste** (+8 %), lue sous le champ et non chronométrée ; T3-b « je ne l'ai pas jugé, je l'ai lu » (clic « Lente », résumé 500 → 1 120 ms) ; ne sait pas où taper une durée à la main (« j'ai vu la mention « Sur mesure », donc ça doit exister ») ; « 1 120 ms avec un effet mou ou avec un effet sec, ce n'est pas du tout la même impression, et ça se juge à l'œil ».

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
07:45:34 v1 « Apparition · démarre quand il entre dans l'écran » [node.set rh_dishes_list:triggers]
```

### Notes du préparateur
P5 T2 (pos 3) : terminé 20 actions ; journal : v1 « Apparition · démarre quand il entre dans l'écran » sur rh_dishes_list (une seule opération) ; site v1 : le déclencheur de « Plats » passe de `load` à `inView`, effet et durée inchangés, titre et surtitre intacts. Visite : les 3 cartes o=0 (+28 px) avant l'entrée puis 0 → 1 en ~1 030 ms, surtitre et titre inchangés. Critères R1 à R5 remplis. Statut proposé : C. Diagnostic énoncé juste (« l'animation se jouait dans le vide ») ; crédite « la phrase qui explique que l'effet vient du groupe « Plats » » et le lien « Régler sur Plats » ; a repéré la case « les cartes une à une » sans la cocher (non demandé) ; tiquée par le fil « Page > À la carte > Contenu > Plats » sur la page d'accueil.
P5 T2 : SEQ 6 (« sans la phrase et le lien, je mettais 3 ou 4 ») ; T2-R conforme au site (les trois cartes montent en fondu à l'arrivée, ensemble, 600 ms, une seule fois) ; réserve : ne sait pas à quel moment l'outil considère que la section « entre dans l'écran ».
P5 T2 : T2-a diagnostic **juste** et complet (« le réglage est là, il est juste déclenché au mauvais moment ») ; propose « quand il entre dans l'écran » par défaut, ou un avertissement quand on choisit « ouverture de la page » sur un élément hors du premier écran ; T2-b : a descendu l'aperçu jusqu'aux plats et lu les réglages (VERIF), mais « j'ai raisonné, je n'ai pas constaté ».

## T5 (position 4)

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
  - déclencheur YEy-NAU67IZs · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [KpJUpkoeMyOn] preset=lift duration=250 longueur=250
    piste → élément déclencheur [LUVRJZKHh0qr]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
08:44:24 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
08:45:32 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P5 T5 (pos 4) : terminé 23 actions (12 captures, 9 clics, 1 survol, 1 attente ; coupure réseau à la 3e action, reprise sur place) ; journal : v1 « En continu · aucun » (pulsation supprimée), v2 « Au survol · Soulever » ; site v2 : pastille zoom 500 ms après 300 ms (inchangé), bouton du héros soulever 250 ms au survol avec retour. Visite : pastille o 0,60 → 1 et scale 0,968 → 1 en ~290 ms après le chargement (le zoom se voit, la pulsation ayant disparu), plus rien ensuite sur 4 s. Critères S1, S2, S3, S4 remplis. Statut proposé : C. A **vérifié le survol de ses yeux** (capture avec le bouton décalé par rapport à son voisin) : « ça change tout, la confiance que j'ai dans ce que je livre » ; apprécie le découpage Apparition / Au survol / En continu et le badge « + 2 animations ».
P5 T5 : SEQ 7 (« la seule mission de la séance où j'ai eu la preuve de ce que je livrais ») ; T5-R conforme au site ; note l'absence de survol sur téléphone et se demande si l'outil prévoit quelque chose.
P5 T5 : T5-a « non » appuyé sur le réglage (« En continu » → « Aucun », badge passé de deux animations à une) **et sur deux captures à une seconde d'intervalle** ; T5-b juste (montée puis retour), a vérifié que le voisin « Voir la carte » ne bouge pas d'un pixel.

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
  - déclencheur eEeR_MNX71aV · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms, puis Paragraphe « Aurèle et Nils ont… » (fondu) de 1 400 à 2 100 ms, à chaque passage.
    animation « Glissé depuis la gauche » [c-FMuaabqQWg] preset=slide-right duration=2100 longueur=2100
    piste → élément déclencheur [Ah45T7_aTak2]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"Ah45T7_aTak2"} [nt2ODVLu3xmj]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] start={"after":"nt2ODVLu3xmj"} [nlpI_7cp-Cfq]
      images-clés : 1400ms {"opacity":"0"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
08:50:58 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
08:51:42 v2 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
08:52:18 v3 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
08:52:56 v4 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations]
08:53:50 v5 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
08:54:14 v6 « Apparition · démarre après Titre 2 « Une cuisine de… » » [node.set rh_about_p:triggers ; site.set:animations ; site.set:animations]
```

### Notes du préparateur
P5 T4 (pos 5) : **budget** à 38 actions (s'arrête faute de temps : « Je suis bloquée par le temps, pas par l'outil ») ; journal : v1 « Apparition · Glissé depuis la gauche » (photo, à l'entrée dans l'écran), v2 « Apparition · à chaque passage », v3 « Apparition · Fondu en montant » (titre), v4 « démarre après « Photo de la salle » », v5 « Apparition · Fondu » (paragraphe), v6 « démarre après Titre 2 » ; site v6 : une scène rejouée à chaque passage, photo 0 → 700 ms (translateX −40 px), titre `start: after` photo 700 → 1 400, paragraphe `start: after` titre 1 400 → 2 100 ; chiffres : rien. Visite : photo 140 → 701 ms, titre 847 → 1 394, paragraphe 1 533 → 2 023, **rejoué à l'identique au retour** (141/827/1 541). Profil : C1 non (3/6), C2 non, C3 non (aucun chiffre), C3b non, C4 oui (2 100 ms), C5 non (chiffres), C6 oui (à chaque passage). Statut proposé : E (mode de fin : budget). A trouvé « démarre après » et apprécié que « à chaque passage » se propage aux pistes suivantes (réglé une seule fois) ; bloquée par **la sélection du groupe des trois chiffres** (« un clic sur un chiffre m'attrape le chiffre, … le chemin affiché en haut m'a fait remonter d'un cran de trop ») ; redit n'avoir jamais vu la scène se jouer.
P5 T4 : SEQ 3 ; « l'enchaînement « après tel élément » est franchement bien vu », mais « sept ou huit gestes par élément » ; T4-R conforme au site (photo, titre, paragraphe, ~2 s, rejeu à chaque passage, chiffres immobiles), avec l'idée que la scène inachevée est « peut-être plus gênante que si je n'avais rien fait ».
P5 T4 : T4-a **cohérente** avec la structure enregistrée (« Démarre » du paragraphe : « après Titre 2 » → « en même temps que Titre 2 » plus un petit délai), en notant qu'elle n'a pas vérifié si le champ Délai existe avec « en même temps que » ; souligne que « ce qui suit se recale tout seul » (gain par rapport à Elementor). T4-b : atteindre les réglages (« neuf actions avant de toucher au premier menu » sur la photo, rubrique Animation repliée en bas du panneau) et la chasse au groupe des trois chiffres (le fil d'Ariane l'a menée à « Contenu », capture 016) ; « il me manquait un endroit où voir la structure de la page, une liste des blocs les uns dans les autres ».

