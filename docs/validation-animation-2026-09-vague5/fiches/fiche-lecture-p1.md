# Fiche de lecture du site enregistré · P1 (vague 5)

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
version 6
• « Photo de la salle » [rh_about_img]
  - déclencheur ToCI5gs2bbPl · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la gauche en 700 ms, une seule fois.
    animation « Glissé depuis la gauche » [XHsrAfvqD7RZ] preset=slide-right duration=700 longueur=700
    piste → élément déclencheur [KFe07nOVdXiQ]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur VWmai_6jKshe · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en montant en 700 ms, une seule fois.
    animation « Fondu en montant » [no38HSAsdK0H] preset=fade-up duration=700 longueur=700
    piste → élément déclencheur [n8l_qL8MLtN6]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur g5-nEIod2tX2 · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [f7GFBTOYYlrj] preset=fade duration=700 longueur=700
    piste → élément déclencheur [RjqnU3oTZ5BV]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Années » [rh_stat1]
  - déclencheur n0Wt86n86JwZ · on=inView once=false
    résumé : Quand « Années » entre dans l'écran : « Années » (montée avec rebond) en 800 ms, « Couverts » (montée avec rebond) de 120 à 920 ms et « Producteurs » (montée avec rebond) de 240 à 1 040 ms (1 s), à chaque passage.
    animation « Montée avec rebond » [n352bsKbcoD7] preset=rise-bounce duration=1040 longueur=1040
    piste → élément déclencheur [nAqNrY-67OeU]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Couverts » [rh_stat2] start={"with":"nAqNrY-67OeU","gap":120} [dXfvNs0n15Vz]
      images-clés : 120ms {"opacity":"0","transform":"translateY(28px)"} | 920ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Producteurs » [rh_stat3] start={"with":"dXfvNs0n15Vz","gap":120} [XGA56gnSBnEf]
      images-clés : 240ms {"opacity":"0","transform":"translateY(28px)"} | 1040ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 45 ; non utilisées : aucune)
== Journal
09:20:17 v1 « Apparition · Glissé depuis la gauche » [site.set:animations ; node.set rh_about_img:triggers]
09:21:06 v2 « Apparition · Fondu en montant » [site.set:animations ; node.set rh_about_h2:triggers]
09:21:41 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
09:22:39 v4 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat1:triggers]
09:23:04 v5 « Apparition · pareil pour les 2 suivants » [site.set:animations]
09:23:36 v6 « Apparition · à chaque passage » [node.set rh_stat1:triggers]
```

### Notes du préparateur
P1 T4 (pos 1) : BUDGET (40) ; journal v1–v6 par les choix rapides : photo glissé 700, titre fondu en montant 700, paragraphe fondu 700, « Années » montée avec rebond puis « Pareil pour les 2 suivants » (Couverts, Producteurs à +120 ms chacun, dans l'animation d'Années), « à chaque passage » sur Années seulement ; quatre lancements séparés, chacun sur sa propre entrée à l'écran, aucun « Démarre après ». Visite (défilement d'un coup) : photo, titre, paragraphe 0 → ~880 ms ensemble ; chiffres 0 / 120 / 240 → ~1 040 ms. Critères : C1 oui (6 sur 6), C2 non (4 lancements), C3 non (tous à 0), C3b oui, C4 non (~1 040 ms), C5 oui, C6 non (chiffres seuls). Statut proposé : E (C3), mode BUD. Lot 8 : « Pareil pour » TROUVÉ et utilisé (depuis un chiffre, pas depuis « Ses voisins ») ; vue « Scène » et « Voir la scène » non utilisées (à vérifier sur captures) ; « Démarre » vu à la fin (« coupé »), pas de champ ms compris (« je ne sais pas ce que veut dire ms »). Dit : les barres qui partent au même endroit vues (dans la scène ? à vérifier).
P1 T4-SEQ 3 ; T4-R conforme au site (trois ensemble, chiffres un à un, rejouer sur les chiffres seuls), lu dans « les barres bleues » (la vue Scène a donc été vue) et « fini à 1 040 ms, 1 s » (le total lu, en secondes).
P1 T4-a : cohérente avec la structure (irait dans « Démarre » chercher « après le titre », a lu l'avertissement orange de la scène) ; « délai » = date limite, « ms » inconnu (« dans PowerPoint j'écrivais 0,5 seconde ») ; T4-b : lire (tout petit, loupe), reprendre chaque morceau séparément, « nulle part où dire d'abord la photo, ensuite le titre… d'un seul coup » ; la vue Scène « ce que j'ai le mieux compris de toute la séance… mais ne sert qu'à regarder, je n'ai pas vu comment déplacer une barre ». Débriefing réduit lancé.

