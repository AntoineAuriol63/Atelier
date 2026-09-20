# Fiche de lecture du site enregistré · P3 (vague 5)

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
  - déclencheur nKJm9RJQjvjc · on=inView
    résumé : Quand « Photo de la salle » entre dans l'écran : glissé depuis la droite en 700 ms, une seule fois.
    animation « Glissé depuis la droite » [Q-klXKjUZXHG] preset=slide-left duration=700 longueur=700
    piste → élément déclencheur [Am7yqqqnyuyn]
      images-clés : 0ms {"opacity":"0","transform":"translateX(40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Titre 2 « Une cuisine de… » » [rh_about_h2]
  - déclencheur QZnUIgnnN_n1 · on=inView
    résumé : Quand Titre 2 « Une cuisine de… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [l5DNloUYSFlM] preset=fade duration=700 longueur=700
    piste → élément déclencheur [eH5zIbKonCa5]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Paragraphe « Aurèle et Nils ont… » » [rh_about_p]
  - déclencheur g-_qPtiJddjV · on=inView
    résumé : Quand Paragraphe « Aurèle et Nils ont… » entre dans l'écran : fondu en 700 ms, une seule fois.
    animation « Fondu » [Edb67puHcDcD] preset=fade duration=700 longueur=700
    piste → élément déclencheur [n9SMUXUSoD2l]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
• « Années » [rh_stat1]
  - déclencheur KwkagYyP2K2m · on=inView
    résumé : Quand « Années » entre dans l'écran : montée avec rebond en 800 ms, une seule fois.
    animation « Montée avec rebond » [jeIBu0zbBY31] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur [ffN9XTKoyarq]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
• « Couverts » [rh_stat2]
  - déclencheur RlScC2VA6s8V · on=inView
    résumé : Quand « Couverts » entre dans l'écran : montée avec rebond en 800 ms, une seule fois.
    animation « Montée avec rebond » [caRY2APDP_9_] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur [kMhpbnQRUWwE]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
• « Producteurs » [rh_stat3]
  - déclencheur hDhUZCyOOs6X · on=inView
    résumé : Quand « Producteurs » entre dans l'écran : montée avec rebond en 800 ms, une seule fois.
    animation « Montée avec rebond » [hEZiyeBrsjRL] preset=rise-bounce duration=800 longueur=800
    piste → élément déclencheur [NMhJPqKxnXUJ]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 47 ; non utilisées : aucune)
== Journal
09:20:16 v1 « Apparition · Glissé depuis la droite » [site.set:animations ; node.set rh_about_img:triggers]
09:21:09 v2 « Apparition · Fondu » [site.set:animations ; node.set rh_about_h2:triggers]
09:23:09 v3 « Apparition · Fondu » [site.set:animations ; node.set rh_about_p:triggers]
09:24:14 v4 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat1:triggers]
09:25:56 v5 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat2:triggers]
09:26:29 v6 « Apparition · Montée avec rebond » [site.set:animations ; node.set rh_stat3:triggers]
```

### Notes du préparateur
P3 T4 (pos 1) : BUDGET (40) ; six choix rapides séparés, chacun sur sa propre entrée, une seule fois : photo glissé depuis la droite (+40 px : sens inverse de la consigne mais « par le côté » accepté), titre fondu (SANS montée : C5 titre non), paragraphe fondu, trois chiffres montée avec rebond un par un ; aucun « Démarre après », aucun « à chaque passage ». Visite : tous 0 → ~700/880 ensemble. Critères : C1 oui, C2 non (6 lancements), C3 non, C3b non, C4 non, C5 non (titre), C6 non. Statut proposé : E, mode BUD. Lot 8 : rien d'utilisé (ni « Ses voisins » sur un chiffre, ni la scène) ; dit « j'ai pas trouvé où dire que ça recommence… ni comment mettre les chiffres dans l'ordre ».
P3 T4-SEQ 3 ; T4-R conforme (même animation partout, ordre non réglé ; croit que ça ne jouera qu'une fois « au premier chargement » : exact, une seule fois à l'entrée).
P3 T4-a : cohérente à l'essai (chercherait « Délai » et baisserait) ; T4-b : a ouvert « Ses voisins » « en pensant que c'était ça » mais « rien qui parlait d'ordre ou de recommencer » → a tourné en rond puis répété l'animation sur chaque chiffre (le champ propose un effet pour le groupe, pas l'ordre ni le rejeu : à retenir).

