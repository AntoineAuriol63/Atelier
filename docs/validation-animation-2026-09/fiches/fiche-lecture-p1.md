# Fiche de lecture du site enregistré · P1 (vague 3)

Ordre des tâches : T1 T2 T3 T5 T4. Pour chaque tâche : état de départ (copie de référence de la vague 3 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 3
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur k1HK9mHVAggi · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [R-SZsPlgaakA] preset=fade duration=700 longueur=700
    piste → élément déclencheur [nBBy9cQkv41B]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
13:10:46 v1 « Animer Titre 2 « Une cuisine de… » » [site.set:animations ; node.set rh_about_h2:triggers]
13:11:45 v2 « Animer Titre 2 « Une cuisine de… » » [node.set rh_about_h2:triggers ; site.set:animations]
13:13:58 v3 « Animation · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P1 T1 : contrôle préparé (visible, 1 440 × 900, Écriture, stockage vide, journal vide, capture de contrôle vue puis supprimée et compteur remis à zéro).
P1 T1 (pos 1) : terminé 31 actions (14 captures, 3 loupes, 9 clics, 4 défilements, 1 touche) ; journal : v1 « Animer Titre 2 « Une cuisine de… » », v2 même libellé en opérations inverses (annulation : « le grand panneau plein de chiffres … m'a fait peur : la première fois, j'ai tout annulé »), v3 « Animation · Fondu » ; site v3 : fondu 700 ms à l'entrée dans l'écran du titre, une seule fois. Visite (titre amené dans l'écran) : o=0 avant, 0 → 1 en ~670 ms ; surtitre et paragraphe inchangés (o=1). Statut proposé : C. Dit ne pas avoir vu le titre arriver ni savoir ce que veut dire « 700 ms ».
P1 T1 : SEQ 3 ; T1-R conforme au site (fondu à l'arrivée à « La maison », une seule fois, reste immobile) avec durée inconnue (« 700 ms … une supposition ») ; « dans l'aperçu, le titre était déjà là quand j'ai regardé ».
P1 T1 : T1-a : cherche « Animation » (onglet du haut), lit « choisir l'élément », clique le titre ; T1-b : encadré d'explication plein de mots inconnus (« survol, défilement, images-clés, ligne de temps, canevas, calques ») ; gros bouton bleu « Animer » → panneau de chiffres (« ms », opacité, décalage, piste), tout annulé ; effets trouvés dans une petite liste « Nouvelle animation (à composer) » ; « rien ne disait « quand on descend », j'ai dû deviner … « À l'entrée dans l'écran » » ; choisir le fondu ne fait rien tant qu'on n'a pas cliqué « Ajouter », qui ramène le panneau compliqué ; effet jamais vu jouer.

## T2 (position 2)

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
  - déclencheur nK9JEd39KM11 · on=load
    résumé : Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms.
    animation « Fondu en montant » [U-z8-xgyyp7d] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants) [Nl-NVSfHBpvN]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Carte plat » [rh_dishes_item]
  - déclencheur yIZkP0Q8dZs8 · on=inView
    résumé : Quand « Carte plat » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [d2kXJ8V-i0_W] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [ZQWaorQ1HuV-]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
13:28:56 v1 « Animation · Fondu en montant » [site.set:animations ; node.set rh_dishes_item:triggers]
```

### Notes du préparateur
P1 T2 (pos 2) : **budget** (40 actions : 17 captures, 5 loupes, 10 clics, 8 défilements) ; journal : v1 « Animation · Fondu en montant » sur rh_dishes_item (modèle de carte de la collection, vaut pour les 3 cartes) ; site v1 : déclencheur « à l'entrée dans l'écran » sur la carte, fondu en montant 700 ms, une seule fois ; l'animation d'origine au chargement sur les enfants de « Plats » est **restée**. Visite : surtitre et titre arrivent à l'entrée ; les 3 cartes à o=0 (+28 px) avant l'entrée puis 0 → 1 en ~1 240 ms depuis le défilement (départ ~450 ms) : le mouvement se voit à l'arrivée. Critères : R1, R2, R3 (700 ms), R4, R5 remplis. Statut proposé : C (mode de fin : budget). Croit n'avoir corrigé que le premier plat (« seul le premier plat … a un cadre bleu ») ; diagnostic énoncé dans le message de fin : « les plats faisaient leur fondu quand la page s'ouvre, donc c'était fini avant qu'on arrive dessus » ; perdue par « quatre fois la même ligne « Plats · La carte » ».
P1 T2 : SEQ 2 ; T2-R en **écart matériel** avec le site : croit que seul le premier plat arrivera et que « les deux autres … seront toujours déjà là, immobiles » (le site et la visite montrent les 3 cartes arrivant à l'entrée) ; incertaine sur le cumul avec l'animation au chargement ; « le grand panneau que je ne sais pas fermer, cliquer sur un plat qui ne change rien » ; aperçu non regardé.
P1 T2 : T2-a diagnostic **juste** (« réglé « au chargement de la page » … quand Aurèle descendait jusqu'à eux, c'était fini depuis longtemps »), compris par la phrase de résumé en haut du panneau ; « Les enfants de Plats » non compris ; T2-b : a ouvert l'aperçu et est descendue jusqu'aux plats (déjà visibles), sans pouvoir voir le mouvement.

## T3 (position 3)

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
    résumé : Au chargement de la page : fondu en montant en 1 500 ms.
    animation « Fondu en montant » [nhWzmVupogom] preset=fade-up duration=1500 longueur=1500
    piste → élément déclencheur [kfMtTydIx76G]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur CpUeFCZiRFRf · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [pRUksxOKFPi_] preset=fade duration=500 longueur=500
    piste → élément déclencheur [OHisTvva0JuG]
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur DpNnQmOT_zQC · on=load
    résumé : Au chargement de la page : « Réserver une table » (fondu en montant) de 1 500 à 2 000 ms.
    animation « Fondu en montant » [Wt-VXWPKZB46] preset=fade-up duration=2000 longueur=2000
    piste → élément déclencheur [HokEdH_iX5YX]
      images-clés : 1500ms {"opacity":"0","transform":"translateY(28px)"} | 2000ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur e5kG_QqpAVcY · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [LZrSwdJwD_Ti] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur [nPX3yqaLtCnJ]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
13:35:10 v1 « Durée de l'animation » [site.set:animations]
13:35:10 v2 « Durée de l'animation » [site.set:animations]
13:38:05 v3 « Décaler la piste » [site.set:animations]
13:38:05 v4 « Décaler la piste » [site.set:animations]
13:38:47 v5 « Décaler la piste » [site.set:animations]
```

### Notes du préparateur
P1 T3 (pos 3) : **abandon** à 27 actions (« J'ai abîmé le bouton du site d'Aurèle, je ne touche plus à rien ») ; journal : v1 et v2 « Durée de l'animation » (même valeur, 50 ms d'écart), v3 et v4 « Décaler la piste » (même valeur, 50 ms d'écart), v5 « Décaler la piste » = Ctrl+Z, qui n'annule que le doublon v4 : l'état ne change pas. Site v5 : titre fondu en montant 1 500 ms au chargement ; « Réserver une table » : piste décalée, 1 500 → 2 000 ms ; « Voir la carte » inchangé (0 → 500 ms) ; paragraphe inchangé. Visite (horloge de navigation) : titre ~300 → 1 690 ms ; « Réserver une table » o=0 jusqu'à ~1 650 ms puis là à ~2 190 ms ; « Voir la carte » là à ~680 ms. Critères : R1 oui (1 500 ms), R2 pour un seul bouton (départ 1 500 ≥ 1 200, fin 2 000), R3 oui, R4 oui. Statut proposé : P (mode de fin : abandon). Cause de l'abandon (capture 011) : en mode Animation, le canevas montre le bouton à la tête de lecture (500 ms, avant son départ) : étiquette de sélection et cadre vide, « Opacité 0 % » dans le panneau ; la participante le croit supprimé, et son Ctrl+Z semble sans effet.
P1 T3 : SEQ 2 ; « rien ne ressemblait à « Après la précédente » » ; T3-R : titre 1 500 au lieu de 500 (« trois fois plus lent »), « Voir la carte » comme avant, « Réserver une table » : « j'ai peur que le visiteur ne le voie plus du tout … Peut-être qu'il arrive simplement plus tard » ; aperçu non ouvert (« je n'ai pas osé »).
P1 T3 : T3-a « peut-être deux ou trois secondes ? C'est vraiment au hasard » contre 2 000 ms enregistrés (~2 190 ms à la visite) : point milieu 2,5 s, écart +25 % (juste au point milieu, borne haute +50 %) ; T3-b « Je n'ai pas jugé, j'ai deviné … j'ai triplé le chiffre » ; dans PowerPoint elle voyait l'effet se jouer.

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
version 4
• « Réserver une table » [rh_hero_b1]
  - déclencheur nmugnerdq5Au · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [n7A8C7J25KT7] preset=lift duration=250 longueur=250
    piste → élément déclencheur [sepYq8bFJZwI]
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Gusn3UtkpQVn · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [mJYsaeUi0znp] preset=zoom duration=500 longueur=500
    piste → élément déclencheur [en2gjuUfkDAh]
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur vd1lkjF_CIbb · on=load delay=800
    résumé : Au chargement de la page, après 800 ms : « Pastille » en 1 200 ms.
    animation « Pulsation » [bDlR946136sO] preset=pulse duration=1200 longueur=1200
    piste → élément déclencheur [myytNdlhs6jm]
      images-clés : 0ms {"transform":"scale(1)"} | 600ms/ease-in-out {"transform":"scale(1.05)"} | 1200ms/ease-in-out {"transform":"scale(1)"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
13:44:55 v1 « Répétitions » [site.set:animations]
13:47:49 v2 « Animation · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
13:48:45 v3 « Animation · Soulever » [node.set rh_hero_b1:triggers ; site.set:animations]
13:50:50 v4 « Animation · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P1 T5 (pos 4) : terminé à 40 actions (« J'ai terminé » à la 40e ; 19 captures, 2 loupes, 17 clics, 1 survol, 1 touche) ; journal : v1 « Répétitions » (pulsation : boucle → une fois), v2 « Animation · Soulever » posé d'abord avec « À la souris », v3 annulation, v4 « Animation · Soulever » au survol. Site v4 : pastille zoom 500 ms après 300 ms (inchangé) + pulsation **une seule fois** après 800 ms ; bouton du héros : soulever 250 ms au survol, retour à la sortie. Visite : pastille o 0 → 1 entre ~340 et ~1 040 ms, puis un battement scale 1 → 1,049 → 1 entre ~1 040 et ~2 160 ms, puis immobile ; bouton −4 px en ~145 ms au survol, retour en ~145 ms. Critères : S1 oui avec un battement unique noté, S2 oui, S3 oui, S4 oui. Statut proposé : C. Dernière action : survol du bouton dans le canevas et capture (« il me semble que le bouton … est un tout petit peu plus haut »).
P1 T5 : SEQ 5 ; T5-R conforme au site (zoom inchangé, une pulsation après 800 ms puis immobile, soulèvement 250 ms au survol et retour) ; « À la souris » l'a induite en erreur, corrigé grâce à la phrase de résumé ; doute sur l'effet de son Ctrl+Z sur « Une fois » (non revérifié ; le journal montre que non).
P1 T5 : T5-a « Je pense que non » (liste « Une fois », phrase sans « en boucle »), doute sur « Effets continus » jamais ouvert ; T5-b retour à la sortie juste, mais « la petite liste disait aussi « Une fois » … je me demande si le bouton ne se soulèvera que la première fois » (répétitions lues comme « une fois par visite »).

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
• « Photo de la salle » [rh_about_img]
  - déclencheur nQ4luqD93c8l · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms, puis Paragraphe « Aurèle et Nils ont… » (fondu) de 1 400 à 2 100 ms, une seule fois.
    animation « Glissé depuis la gauche » [VJZe9gmB3OXp] preset=slide-right duration=2100 longueur=2100
    piste → élément déclencheur [G-ddpur5vRmj]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [e6dCDgfzpuYU]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] [vQCaS0lzSUkN]
      images-clés : 1400ms {"opacity":"0"} | 2100ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
13:57:22 v1 « Animation · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
13:58:33 v2 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
13:59:26 v3 « Remplir la piste · Fondu en montant » [site.set:animations]
14:00:30 v4 « Décaler la piste » [site.set:animations]
14:00:30 v5 « Décaler la piste » [site.set:animations]
14:01:14 v6 « Décaler la piste » [site.set:animations]
14:02:30 v7 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
14:03:33 v8 « Remplir la piste · Fondu » [site.set:animations]
14:04:39 v9 « Décaler la piste » [site.set:animations]
14:04:39 v10 « Décaler la piste » [site.set:animations]
```

### Notes du préparateur
P1 T4 (pos 5) : **budget** (40 actions : 17 captures, 15 clics, 5 touches, 2 saisies, 1 défilement ; aucune loupe) ; journal : v1 « Animation · Glissé depuis la gauche » sur la photo (à l'entrée dans l'écran), v2 « Ajouter une piste · Titre 2 », v3 « Remplir la piste · Fondu en montant », v4 et v5 « Décaler la piste » (double validation par Entrée : v4 place le titre à 700 → 1 400 ms, v5 le décale une seconde fois et **écrase ses images-clés en une seule à 1 400 ms**), v6 Ctrl+Z (retour à 700 → 1 400), v7 « Ajouter une piste · Paragraphe », v8 « Remplir la piste · Fondu », v9 et v10 « Décaler la piste » (paragraphe 1 400 → 2 100 ms, second passage identique). Site v10 : une animation lancée par l'entrée à l'écran de la photo, **une seule fois** : photo glissé depuis la gauche 0 → 700 ms (translateX −40 px), titre 700 → 1 400 (translateY 28 px), paragraphe 1 400 → 2 100 (fondu), décalages absolus (sans `start`) ; chiffres : rien. Visite : photo 138 → 714 ms, titre 834 → 1 389, paragraphe 1 550 → 2 018 ; au retour, rien ne se rejoue. Profil : C1 non (3/6), C2 non, C3 non (aucun chiffre), C3b non, C4 oui (fin 2 100 ms), C5 non (chiffres), C6 non (une seule fois). Statut proposé : E (mode de fin : budget). N'a trouvé ni la répétition « à chaque passage » (« aucun ne dit « chaque fois qu'on revient » » dans Une fois / 2 fois / 3 fois / En boucle), ni le sens des « ms ».
P1 T4 : SEQ 3 ; a compris l'enchaînement par « L'ajouter à cette animation », puis « Départ », avec la phrase qui dit « puis » ; T4-R conforme au site (photo depuis la gauche, titre en s'élevant, paragraphe en fondu, 2 100 ms, chiffres immobiles, « une seule fois » donc pas de reprise) ; d'après la phrase de l'éditeur, aperçu non regardé.
P1 T4 : T4-a rouvrir la scène (liste « Animations du site » ou « Voir ses animations »), « Départ » du paragraphe de 1400 à 1200, vérifier la phrase : **cohérente** avec la structure enregistrée (décalages absolus) ; note que le paragraphe partirait avant la fin du titre. T4-b : « une dizaine de petits gestes par élément » (cliquer, « L'ajouter à cette animation », « Remplir avec », « Départ »…), calculer soi-même les départs en « ms » ; « Dans PowerPoint, on choisit « Après la précédente » et c'est fini » ; le « 1400 surprise ».

