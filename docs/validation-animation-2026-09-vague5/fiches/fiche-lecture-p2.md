# Fiche de lecture du site enregistré · P2 (vague 5)

Ordre des tâches : T4. Pour chaque tâche : état de départ (copie de référence de la vague 4 ; les identifiants générés diffèrent de la copie du participant), site final (déclencheurs, animations, pistes avec leur identifiant, enchaînement « start » quand une piste démarre après ou avec une autre, images-clés, phrase de résumé de l'outil ; déclencheurs posés dans un composant signalés), journal horodaté (UTC) des modifications, notes du préparateur (visite instrumentée, statut proposé). L'observateur vérifie ce statut contre les critères de la section 5 et signale tout désaccord.

## T4 (position 1)

### État de départ
```
version 0
(animations du site : 41 ; non utilisées : aucune)
```

### Site final et journal
```
== Site final
version 5
• « Photo de la salle » [rh_about_img]
  - déclencheur w9Dp3pSXTJ7x · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, puis Titre 2 « Une cuisine de… » (fondu en montant) de 700 à 1 400 ms (1,4 s), à chaque passage.
    animation « Glissé depuis la gauche » [ABFGr1IAmYui] preset=slide-right duration=1400 longueur=1400
    piste → élément déclencheur [napOtwmF7dJi]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] start={"after":"napOtwmF7dJi"} [BH2mSQsv4DpW]
      images-clés : 700ms {"opacity":"0","transform":"translateY(28px)"} | 1400ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur K9ut1qr4XXgw · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [P_Y3mto5v2F_] preset=fade duration=700 longueur=700
    piste → élément déclencheur [Cck7Tz3nHK5y]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 43 ; non utilisées : aucune)
== Journal
09:20:19 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
09:21:34 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
09:23:55 v3 « Apparition · démarre après « Photo de la salle » » [node.set rh_about_h2:triggers ; site.set:animations ; site.set:animations]
09:24:29 v4 « Apparition · à chaque passage » [node.set rh_about_img:triggers]
09:25:49 v5 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
```

### Notes du préparateur
P2 T4 (pos 1) : BUDGET (40) ; choix rapides : photo glissé 700 à chaque passage, titre fondu en montant « démarre après « Photo » » (700 → 1 400, dans l'animation de la photo), paragraphe fondu sur sa propre entrée, une seule fois ; chiffres non touchés. Visite : photo 0 → 877, titre 877 → 1 599, paragraphe 0 → 726 (avec la photo), chiffres immobiles. Critères : C1 non (3 sur 6), C2 non (2 lancements), C3 non (paragraphe avant le titre), C3b non, C4 non, C5 partiel, C6 partiel. Statut proposé : E, mode BUD. Lot 8 : « Pareil pour « Chiffres » » VU, pas le temps ; « Démarre après » utilisé (elle l'attendait « réglé automatiquement pour toute la scène une fois le premier élément fait »). SEQ 3 ; T4-R conforme (photo puis titre ; paragraphe « pas forcément au bon moment » ; chiffres fixes).
P2 T4-a : cohérente (Délai sous Démarre, ou « après la photo » ; vérifierait avec « Voir l'effet ») ; T4-b : refaire le même parcours par élément (apparition, puis Démarre, puis Rejouer), « Pareil pour… » vu sans savoir s'il copie aussi le démarrage et le rejouer.

