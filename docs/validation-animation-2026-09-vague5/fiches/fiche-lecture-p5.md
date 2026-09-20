# Fiche de lecture du site enregistré · P5 (vague 5)

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
version 9
• « Photo de la salle » [rh_about_img]
  - déclencheur Q5hLFJ47hyNd · on=inView once=false
    résumé : Quand « Photo de la salle » entre dans l'écran : « Photo de la salle » (glissé depuis la gauche) en 700 ms, Titre 2 « Une cuisine de… » (fondu en montant) en 700 ms, Paragraphe « Aurèle et Nils ont… » (fondu) en 700 ms et les 3 éléments de « Chiffres » un à un (tous les 100 ms) (montée avec rebond) en 800 ms, à chaque passage.
    animation « Animation · Photo de la salle » [XIEVLstjH5TU] preset=- duration=1000 longueur=1000
    piste → élément déclencheur [OPMn8va5ZqXe]
      images-clés : 0ms {"opacity":"0","transform":"translateX(-40px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Titre 2 « Une cuisine de… » » [rh_about_h2] [lWiUM9P26b3q]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Paragraphe « Aurèle et Nils ont… » » [rh_about_p] [nu5_y9VGHzU_]
      images-clés : 0ms {"opacity":"0"} | 700ms/cubic-bezier(.22,1,.36,1) {"opacity":"1","transform":"none","filter":"none"}
    piste → « Chiffres » [rh_stats] (enfants) stagger={"each":100} [Pb1ZaxL44xeq]
      images-clés : 0ms {"opacity":"0","transform":"translateY(28px)"} | 800ms/cubic-bezier(.34,1.56,.64,1) {"opacity":"1","transform":"none","filter":"none"}
(animations du site : 42 ; non utilisées : aucune)
== Journal
09:20:32 v1 « Animer Photo de la salle » [site.set:animations ; node.set rh_about_img:triggers]
09:21:14 v2 « Remplir la piste · Glissé depuis la gauche » [site.set:animations]
09:21:35 v3 « Ajouter une piste · Titre 2 « Une cuisine de… » » [site.set:animations]
09:22:11 v4 « Remplir la piste · Fondu en montant » [site.set:animations]
09:22:39 v5 « Ajouter une piste · Paragraphe « Aurèle et Nils ont… » » [site.set:animations]
09:23:07 v6 « Remplir la piste · Fondu » [site.set:animations]
09:23:29 v7 « Ajouter une piste · les enfants de Chiffres » [site.set:animations]
09:25:08 v8 « Remplir la piste · Montée avec rebond » [site.set:animations]
09:25:26 v9 « Rejouer » [node.set rh_about_img:triggers]
```

### Notes du préparateur
P5 T4 (pos 1) : BUDGET (39) ; mode Animation : v1 « Animer Photo de la salle » (animation sur la photo, inView), pistes titre, paragraphe et « les enfants de Chiffres » (via la liste « Éléments de la scène », « les 3 un à un », échelonnés de 100 ms) toutes remplies (glissé, fondu en montant, fondu, montée avec rebond), « Rejouer » à chaque passage ; toutes les pistes à 0, durée 1 000. Visite : photo, titre, paragraphe 0 → ~877 ensemble ; chiffres 0/100/200 → ~1 000. Critères : C1 oui, C2 oui, C3 non (tous à 0), C3b oui, C4 non (1 000), C5 oui, C6 oui. Statut proposé : E (C3), mode BUD. Lot 8 : liste des éléments et « les 3 un à un » TROUVÉS (« très bien ») ; le champ « Départ » de la piste découvert à la 39e action (« caché tout en bas d'un panneau qu'il faut replier une liste pour voir ») ; a tiré la barre de la piste croyant la décaler : a déplacé la tête de lecture, et a vu la scène à cet instant (« effet secondaire agréable »).
P5 T4-SEQ 4 (première moitié « mieux qu'Elementor » : liste des éléments avec « + Ajouter » ; seconde moitié perdue à chercher le décalage ; « si j'avais vu le champ Départ dès le début : 6 sur 7 ») ; T4-R conforme au site (tout en même temps, chiffres à 100 ms, une seconde, rejeu ok) ; dit ce qu'il manque : cinq réglages de « Départ » et la durée.
P5 T4-a : cohérente (nom de la piste → « Départ » ; replier la liste pour voir le panneau du bas, « trouvé par hasard ») ; T4-b : le réglage du décalage hors de l'écran (panneau rogné par la liste des éléments), la barre qu'on croit tirer (c'est la tête de lecture), l'aperçu qui « vide » chaque élément posé (tête de lecture à 0) ; « la partie que je croyais difficile a été la plus simple… et la partie que je fais en trente secondes chez moi, taper un délai, est celle où je me suis plantée ».

