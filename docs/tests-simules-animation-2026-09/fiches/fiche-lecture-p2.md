# Fiche de lecture du site enregistré · P2 (vague 2)

Ordre des tâches : T1 T3 T5 T2 T4. Pour chaque tâche : état de départ (copie de référence ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

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
  - déclencheur VK2wfi-SA0yW · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [WotG3qrt2UfS] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
08:32:01 v1 « Apparition · Fondu en descendant » [site.set:animations ; node.set rh_about_h2:triggers]
08:32:27 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
```

### Notes du préparateur
P2 T1 (pos 1) : terminé 26 actions (30 appels) ; inView fondu en montant 700 ms sur le titre (choix rapide) ; ERR corrigée : « Fondu en descendant » puis « Fondu en montant » (liste serrée) ; a vérifié dans l'aperçu ; configuration identique à P3 T1 (visite conforme) ; statut proposé : C.

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
version 3
• « Titre 1 « Le goût de l'Auvergne… » » [rh_hero_h1]
  - déclencheur SCLjsn6P0A9e · on=load
    résumé : Au chargement de la page : fondu en montant en 1 120 ms.
    animation « Fondu en montant » [C5HaP52jFp7B] preset=fade-up duration=1120 longueur=1120
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 1120ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Une carte courte qui… » » [rh_hero_p]
  - déclencheur UY5IO6swRNXE · on=load
    résumé : Au chargement de la page : fondu en 500 ms.
    animation « Fondu » [TgWH9q_ihn-4] preset=fade duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Réserver une table » [rh_hero_b1]
  - déclencheur KUkkm1VO6CFO · on=load
    résumé : Au chargement de la page : « Réserver une table » de 1 200 à 1 700 ms.
    animation « Fondu en montant » [c6UUIhkZhdyD] preset=fade-up duration=1700 longueur=1700
    piste → élément déclencheur
      images-clés : 1200ms {"opacity":"0","transform":"translateY(28px)"} | 1700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Texte « Voir la carte » » [rh_hero_b2_t]
      images-clés : 0ms {}
• « Voir la carte » [rh_hero_b2]
  - déclencheur fISyQYPBAUxE · on=load
    résumé : Au chargement de la page : fondu en montant en 500 ms.
    animation « Fondu en montant » [u_xjjr3ZJMVj] preset=fade-up duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
08:36:58 v1 « Apparition · lente » [site.set:animations]
08:39:18 v2 « Décaler la piste » [site.set:animations]
08:39:54 v3 « Ajouter une piste · Texte « Voir la carte » » [site.set:animations]
```

### Notes du préparateur
P2 T3 (pos 2) : budget 40 actions (71 appels) ; titre « Lente » 1 120 ms (R1 ✓) ; « Réserver une table » décalé 1 200–1 700 ms (✓) ; piste ajoutée dans l'animation du bouton 1 sur le TEXTE de « Voir la carte » (sans mouvement réglé) ; « Voir la carte » inchangé 0–500 ms (✗) ; même chemin que P5 (Départ dans le mode Animation) ; statut proposé : P.

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
version 2
• « Réserver une table » [rh_hero_b1]
  - déclencheur sBTRHEQWf9Uv · on=hover reverseOnLeave
    résumé : Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part.
    animation « Soulever » [qa1TZetGOh8Y] preset=lift duration=250 longueur=250
    piste → élément déclencheur
      images-clés : 0ms {"transform":"translateY(0)"} | 250ms/ease-out {"transform":"translateY(-4px)"}
• « Pastille » [rh_hero_badge]
  - déclencheur ptf8NiC02CAh · on=load delay=300
    résumé : Au chargement de la page, après 300 ms : zoom en 500 ms.
    animation « Zoom » [UNHU1avnCkIg] preset=zoom duration=500 longueur=500
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"scale(0.92)"} | 500ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
08:42:18 v1 « En continu · aucun » [node.set rh_hero_badge:triggers ; site.set:animations]
08:42:53 v2 « Au survol · Soulever » [site.set:animations ; node.set rh_hero_b1:triggers]
```

### Notes du préparateur
P2 T5 (pos 3) : terminé 30 actions ; boucle retirée, zoom gardé, « Soulever » au survol sur « Réserver une table » ; identique aux autres (visite conforme sur P3) ; a survolé dans l'aperçu ; fil d'Ariane mal visé (remontée à « Visuel ») ; statut proposé : C.

## T2 (position 4)

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
version 4
• « Paragraphe « Cette saison » » [rh_menu_eyebrow]
  - déclencheur nShWytKKmIrc · on=inView
    résumé : Quand Paragraphe « Cette saison » entre dans l'écran : fondu en 600 ms, une seule fois.
    animation « Fondu » [mVdwM_tmBVe7] preset=fade duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Quelques plats… » » [rh_menu_h2]
  - déclencheur J42mA_MU7WBq · on=inView delay=100
    résumé : Quand Titre 2 « Quelques plats… » entre dans l'écran, après 100 ms : fondu en montant en 600 ms, une seule fois.
    animation « Fondu en montant » [nmBGYRCLfnXS] preset=fade-up duration=600 longueur=600
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 600ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Plats » [rh_dishes_list]
  - déclencheur edERF2hmQQ1d · on=inView
    résumé : Quand « Plats » entre dans l'écran : les enfants de « Plats » un à un (tous les 100 ms) en 700 ms, une seule fois.
    animation « Fondu en montant » [ndhq4xNCLJIB] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur (enfants) stagger={"each":100}
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
08:46:59 v1 « Apparition · aucune » [node.set rh_dishes_list:triggers ; site.set:animations]
08:47:17 v2 « Apparition · Fondu en descendant » [site.set:animations ; node.set rh_dishes_list:triggers]
08:47:38 v3 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_dishes_list:triggers]
08:48:22 v4 « Apparition enfant par enfant » [site.set:animations]
```

### Notes du préparateur
P2 T2 (pos 4) : budget 43 actions (dépassement de 3 ; journal v1–v4 de 08:46:59 à 08:48:22, à situer par l'observateur par rapport à la 40e action ; v3 seul remplit déjà les critères) ; « Apparition · aucune » puis « Fondu en montant » à l'entrée dans l'écran sur « Plats » puis « enfant par enfant » (stagger 100 ms) ; diagnostic juste (comparaison titre / plats) ; visite : les 3 cartes arrivent l'une après l'autre à l'entrée (éclair o=1 avant départ) ; statut proposé : C.

## T4 (position 5)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 3
• « Photo de la salle » [rh_about_img]
  - déclencheur DSMZMMuTCK1T · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la droite en 700 ms, une seule fois.
    animation « Glissé depuis la droite » [nTdDS-3lIz01] preset=slide-left duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateX(40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur d3PwKNFPg-VF · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [T7HGRsfT9Cau] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur r8TT537Ic-uW · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [umOmANJWbxe2] preset=fade duration=700 longueur=700
    piste → élément déclencheur
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 44 ; non utilisées : aucune)
== Journal
08:52:04 v1 « Apparition · Glissé depuis la droite » [site.set:animations ; node.set rh_about_img:triggers]
08:52:27 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
08:52:44 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
```

### Notes du préparateur
P2 T4 : « Je suis bloquée » à 36 actions (sélection du groupe des 3 chiffres impossible) → aide niveau 1.
P2 T4 : reprise à 37 ; « Je suis bloquée » à 39 (3 actions après le niveau 1) → aide niveau 2 (texte T4), compte reprend à 40 (dernière action du budget).
P2 T4 (pos 5) : budget 40 actions (aides 1 et 2) ; 3 apparitions séparées à l'entrée dans l'écran (photo glissé droite, titre fondu en montant, paragraphe fondu) ; chiffres non traités (sélection du groupe impossible : clic sur « 12 » ne sélectionne que le texte d'une instance de composant) ; C1 ✗ (chiffres), C3 ✗ → statut proposé : E (avec aide de niveau 2 : E-A n'existe pas, E reste E).

