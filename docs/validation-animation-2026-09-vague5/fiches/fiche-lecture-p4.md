# Fiche de lecture du site enregistré · P4 (vague 5)

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
version 10
• « La maison » [rh_about]
  - déclencheur fISl3VIdAJWT · on=inView once=false
    résumé : Quand « La maison » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms et Titre 2 « Une cuisine de… » (fondu en montant) en 700 ms, à chaque passage. Paragraphe « Aurèle et Nils ont… », « Chiffres » n'ont pas encore d'images-clés.
    animation « Animation · La maison » [fxwqdGoiMSJH] preset=- duration=1000 longueur=1000
    piste → « Photo de la salle » [rh_about_img] [pBQGkyqUEO_g]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [It47NO8fsyfi]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] [neaLcvPe64pL]
      images-clés : 0ms {}
    piste → « Chiffres » [rh_stats] (enfants) stagger={"each":100} [n3nVlKl8gGs2]
      images-clés : 0ms {}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:20:21 v1 « Nouvelle animation » [site.set:animations ; node.set rh_about:triggers]
09:20:47 v2 « Ajouter une piste · Photo de la salle » [site.set:animations]
09:22:18 v3 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
09:22:27 v4 « Ajouter une piste · La maison » [site.set:animations]
09:23:03 v5 « Retirer la piste » [site.set:animations]
09:23:31 v6 « Rejouer » [node.set rh_about:triggers]
09:24:05 v7 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
09:24:53 v8 « Remplir la piste · Fondu en montant » [site.set:animations]
09:25:17 v9 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
09:25:37 v10 « Ajouter une piste · les enfants de Chiffres » [site.set:animations]
```

### Notes du préparateur
P4 T4 (pos 1) : BUDGET (40) ; tout en mode Animation : v1 « Nouvelle animation » sur la section « La maison » (inView), v6 « Rejouer » (à chaque passage), pistes photo (glissé 700) et titre (fondu en montant 700) remplies, pistes paragraphe et « les enfants de Chiffres » (via la liste « Éléments de la scène », « les 3 un à un ») ajoutées mais VIDES ; une piste parasite « La maison » ajoutée puis retirée. Visite : photo et titre 0 → 880 ensemble ; paragraphe et chiffres immobiles. Critères : C1 non (2 sur 6), C2 oui, C3 non, C3b non (piste vide), C4 non (1 000), C5 partiel, C6 oui. Statut proposé : E, mode BUD. Lot 8 : liste « Éléments de la scène » et « les 3 un à un » TROUVÉS et utilisés ; phrase de résumé lue (« n'ont pas encore d'images-clés »). Défaut signalé : le bloc du haut grandit d'une ligne par piste et décale les cibles (« une piste parasite… en voulant replier une liste ») — même racine que N-1 de la vague 4, la scène collante grandit avec la phrase de résumé et les pistes.
P4 T4-SEQ 4 (modèle juste ; forme laborieuse : la phrase de résumé grossit d'une ligne par piste et pousse la liste, moitié des actions en captures, une piste parasite) ; T4-R conforme au site (photo et titre ensemble en 700 ms ; paragraphe et chiffres fixes, « pistes sans images-clés » lu ; rejeu ok ; pas de « Tester sur le site »).
P4 T4-a : cohérente (champ « Départ » de la piste ; tenterait de tirer la barre, non testé) ; T4-b : le repérage à l'écran : la phrase de résumé qui grandit et pousse la liste, la colonne étroite où ligne de temps, liste des dix éléments et réglages se partagent la hauteur (« replier la liste pour lire les réglages, la rouvrir pour ajouter »), boutons « Ajouter » tous pareils ; « la composition est bonne mais elle est servie dans un tiroir ».

