# Fiche de lecture du site enregistré · P1 (vague 2)

Ordre des tâches : T1 T2 T3 T5 T4. Pour chaque tâche : état de départ (copie de référence ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur nGgc-rRttkdP · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [nsZX8nFk1Pc8] preset=fade duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
07:42:22 v1 « Apparition · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P1 T1 (pos 1) : terminé 29 actions ; site : inView fondu 700 ms sur le titre (Écriture, choix rapide) ; visite : fondu joué à l'entrée (éclair o=1 avant départ) ; statut proposé : C. SEQ 5. Dit n'avoir jamais vu l'effet (ni « Jouer » ni Aperçu).

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
version 1
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur x9TwdPOkojLF · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [cCXWgciGz7Ty] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur nAdgwPHkY3So · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [DSpJuEJCAEA8] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur nHoZaoe0HvXm · on=load
    résumé : Au chargement de la page : les enfants de « Plats » un à un en 600 ms.
    animation « Fondu en montant » [ik_Pxwy5MaJb] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur (enfants)
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Image » [rh_dishes_img]
  - déclencheur n4WqNQ3hyhwf · on=inView
    résumé : Quand « Image » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [VfHA34yrTj_Y] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:47:41 v1 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_dishes_img:triggers]
```

### Notes du préparateur
P1 T2 (pos 2) : terminé 35 actions (58 appels) ; ajout d'un Fondu en montant à l'entrée dans l'écran sur l'IMAGE du modèle de carte (s'applique aux 3 photos) ; déclencheur « Plats » au chargement laissé ; diagnostic : « les plats étaient sur Aucune » (cause non identifiée) ; visite : les 3 photos arrivent à l'entrée (0→1, 14 px), textes des cartes immobiles ; « Tester sur le site » utilisé ; statut proposé : P discutable (photos seulement ; R1 lu strictement « la carte » → E possible), à trancher par l'observateur.

## T3 (position 3)

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
version 1
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur nEZ3W56qfC6n · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms.
    animation « Fondu en montant » [L3kMfJX-sLuY] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur Aj5tnPANIjkw · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [cbB8l6XsBtC4] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur EEHlKhNh6PHn · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [O9e6LRGBjrE0] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Voir la carte » [rh_hero_b2]
  - déclencheur V1Jlhhzo-BDI · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [pLv3gpGnReSD] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:49:58 v1 « Apparition · lente » [site.set:animations]
```

### Notes du préparateur
P1 T3 : « Je suis bloquée » à 20 actions → aide niveau 1 (relance commune 4.4).
P1 T3 : après la réponse à la relance, message « Merci. » + consigne technique de reprise (compte à 21). À signaler : un aller-retour est nécessaire pour qu'un participant simulé reprenne après une aide (addendum 2, point 11).
P1 T3 (pos 3) : abandon 30 actions (aide niveau 1 à 20) ; titre « Lente » (1 120 ms, R1 ✓) ; boutons inchangés (R2 ✗) ; statut proposé : P.

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
  - déclencheur g7gzmnNa0NNd · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [niShc91yfI3g] preset=lift duration=250 longueur=250
    piste → élément déclencheur
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur n3W3kK-r_6wv · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [CEIr_Id59ER1] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
07:55:16 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
07:55:59 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P1 T5 (pos 4) : terminé 26 actions ; boucle retirée (« En continu · aucun »), zoom d'arrivée gardé, « Soulever » au survol sur « Réserver une table » du héros ; configuration identique à P3 T5 (visite faite sur P3 : conforme) ; a vérifié en survolant le bouton dans l'éditeur ; statut proposé : C.

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
  - déclencheur FEZG4awlF5uy · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, une seule fois.
    animation « Glissé depuis la gauche » [RT765JCNumuD] preset=slide-right duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur ucAzrXQZFNAH · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [e54oBKsE2T3-] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur nzIEb9WgY2uo · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [Fk9izZSh-Xz4] preset=fade duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• composant « Chiffre clé » › « Chiffre clé » [rk_root] (vaut pour chaque instance)
  - déclencheur e1jAReB4cnHP · on=inView
    résumé : Quand « Chiffre clé » entre dans l'écran : zoom en 700 ms, une seule fois.
    animation « Zoom » [skBQE1LxOR-1] preset=zoom duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
07:58:15 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
07:58:41 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
07:59:11 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
08:00:03 v4 « Apparition · Zoom » [site.set:animations ; node.set rk_root:triggers]
```

### Notes du préparateur
P1 T4 (pos 5) : abandon 38 actions ; 4 apparitions séparées à l'entrée dans l'écran (photo glissé gauche, titre fondu en montant, paragraphe fondu, « Zoom » sur la racine du COMPOSANT « Chiffre clé » → 3 chiffres ensemble, remarqué : « le 14 bouge alors que je n'y ai pas touché ») ; a testé comme un visiteur et vu tout arriver en même temps ; profil : C1 ✓, C2 ✗, C3 ✗, C3b ✗, C4 ✗, C5 ✗ (pas de dépassement ; photo 40 px ✓, titre 28 px ✓ partiellement), C6 ✗ ; statut proposé : E (échec lucide).

