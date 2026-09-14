# Fiche de lecture du site enregistré · P4 (vague 2)

Ordre des tâches : T1 T2 T5 T3 T4. Pour chaque tâche : état de départ (copie de référence ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T1 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 6
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur WoNh3sv2W6bB · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : Titre 2 « Une cuisine de… » en 760 ms, une seule fois.
    animation « Animation · Titre 2 « Une cuisine de… » » [hrCkYEu9MylF] preset=- duration=1000 longueur=1000
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translate(0px, 24px)"} | 760ms {"opacity":"1","transform":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:03:29 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about_h2:triggers]
09:03:41 v2 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
09:04:30 v3 « opacity (image-clé à 0 ms) » [site.set:animations]
09:04:40 v4 « transform (image-clé à 0 ms) » [site.set:animations]
09:05:15 v5 « opacity (image-clé à 760 ms) » [site.set:animations]
09:05:33 v6 « transform (image-clé à 760 ms) » [site.set:animations]
```

### Notes du préparateur
P4 T1 (pos 1) : terminé 39 actions ; mode Animation « Nouvelle animation », piste sur le titre, images-clés à la main : 0 ms opacité 0 + 24 px, 760 ms opacité 1 + none ; à l'entrée dans l'écran, une fois ; visite : arrive à l'entrée (éclair o=1 avant départ) ; n'a pas vérifié en visiteur (« je sais ce que ça va faire ») ; statut proposé : C.

## T2 (position 2)

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
  - déclencheur kZCGl_SsDqYf · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [o7IokcR-NJ6m] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur nNBd1k--lY3a · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [nK8UGSDyvx7Q] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur RbMHOjZcIiqM · on=load
    résumé : Au chargement de la page : les enfants de « Plats » un à un en 600 ms.
    animation « Fondu en montant » [V9rsMiGS7pil] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants)
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
```

### Notes du préparateur
P4 T2 (pos 2) : budget 40 actions ; aucune modification (v0) ; a suivi la liste « Animations du site » vers la page La carte (4 listes « Plats » homonymes) et y a perdu ~30 actions ; confusion de noms « À la carte » / « Plats » entre accueil et page La carte ; statut proposé : E.

## T5 (position 3)

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
version 5
• « Réserver une table » [rh_hero_b1]
  - déclencheur Y5P2Ql2bxw4x · on=hover
    résumé : Au survol de « Réserver une table » : « Réserver une table » en 245 ms.
    animation « Animation · Réserver une table » [n3YJosBYxa6K] preset=- duration=250 longueur=250
    piste → élément déclencheur
      images-clés : 0ms {} | 245ms {"transform":"scale(1.05)"}
• « Pastille » [rh_hero_badge]
  - déclencheur Iyz5sWultB7S · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [WBeFhHwHeqII] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
  - déclencheur VBgpAZ0LQo-H · on=load delay=800
    résumé : Au chargement de la page, après 800 ms : « Pastille » en 1 200 ms.
    animation « Pulsation » [Lu3cuzotKCL8] preset=pulse duration=1200 longueur=1200
    piste → élément déclencheur
      images-clés : 0ms {"transform":"scale(1)"} | 600ms/ease-in-out {"transform":"scale(1.05)"} | 1200ms/ease-in-out {"transform":"scale(1)"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
09:14:26 v1 « Répétitions » [site.set:animations]
09:15:31 v2 « Nouvelle animation » [site.set:animations ; node.set rh_hero_b1:triggers]
09:15:43 v3 « Ajouter une piste · Réserver une table » [site.set:animations]
09:16:14 v4 « transform (image-clé à 980 ms) » [site.set:animations]
09:16:27 v5 « Durée de l'animation » [site.set:animations]
```

### Notes du préparateur
P4 T5 (pos 3) : budget 40 actions ; pastille : « Répétitions » passé à une fois → une seule pulsation après l'arrivée (visite : 1,00→1,047→1,00 entre 400 et 1 600 ms, puis immobile ; toléré et noté par S1) ; zoom gardé ; bouton : compo au survol à la main 0 → 245 ms scale(1.05), sans retour composé ; visite : grossit à 1,05 en ~250 ms, tient pendant le survol, revient d'un coup à la sortie, rejoue au survol suivant ; statut proposé : C (fin BUD, participant incertain → MM).

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
  - déclencheur GcOThYbsb0Kh · on=load
    résumé : Au chargement de la page : fondu en montant en 1 400 ms.
    animation « Fondu en montant » [z5XKeuOYV8x5] preset=fade-up duration=1400 longueur=1400
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur FzdkVkIpFySP · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [VS4a84sm2WHq] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur vdP0KLQwwtaP · on=load
    résumé : Au chargement de la page : « Réserver une table » de 1 400 à 1 900 ms.
    animation « Fondu en montant » [uzgg7TNNXQ4A] preset=fade-up duration=1900 longueur=1900
    piste → élément déclencheur
      images-clés : 1400ms {"opacity":"0","transform":"translateY(28px)"} | 1900ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur N_f3Gqrl0SdT · on=load
    résumé : Au chargement de la page : « Voir la carte » de 1 500 à 2 000 ms.
    animation « Fondu en montant » [B5GUxDfEAiYh] preset=fade-up duration=2000 longueur=2000
    piste → élément déclencheur
      images-clés : 1500ms {"opacity":"0","transform":"translateY(28px)"} | 2000ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
09:18:44 v1 « Durée de l'animation » [site.set:animations]
09:19:35 v2 « Décaler la piste » [site.set:animations]
09:20:16 v3 « Décaler la piste » [site.set:animations]
```

### Notes du préparateur
P4 T3 (pos 4) : terminé 35 actions ; titre : durée de l'animation 1 400 ms (R1 ✓) ; « Réserver une table » décalé 1 400–1 900 ms, « Voir la carte » 1 500–2 000 ms (R2 ✓ pour les deux) ; paragraphe inchangé (R3 ✓), rien d'autre (R4 ✓) ; même mécanique « Départ » que P5 T3 (visite conforme : retard + remplissage both) ; statut proposé : C.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 9
• « Contenu » [rh_about_in]
  - déclencheur UA7YwgI5IsC3 · on=inView
    résumé : Quand « Contenu » entre dans l'écran : « Photo de la salle » en 700 ms, Titre 2 « Une cuisine de… » de 500 à 1 200 ms et Paragraphe « Aurèle et Nils ont… » de 1 000 à 1 700 ms, une seule fois.
    animation « Animation · Contenu » [tkkc0Hf108UF] preset=- duration=1700 longueur=1700
    piste → « Photo de la salle » [rh_about_img]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2]
      images-clés : 500ms {"opacity":"0","transform":"translateY(28px)"} | 1200ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
      images-clés : 1000ms {"opacity":"0","filter":"blur(12px)"} | 1700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:22:37 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about_in:triggers]
09:23:05 v2 « Ajouter une piste · Photo de la salle » [site.set:animations]
09:23:24 v3 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
09:23:51 v4 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
09:24:07 v5 « Remplir la piste · Fondu en montant » [site.set:animations]
09:24:30 v6 « Décaler la piste » [site.set:animations]
09:24:53 v7 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
09:25:13 v8 « Remplir la piste · Netteté » [site.set:animations]
09:25:47 v9 « Décaler la piste » [site.set:animations]
```

### Notes du préparateur

