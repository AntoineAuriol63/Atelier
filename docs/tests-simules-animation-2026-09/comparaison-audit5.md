# Comparaison · étude simulée « Faire bouger un site » (vague 2) et audit de parcours n°5

Rédigée le 14 septembre 2026, après le gel de la synthèse. Sources : `synthese.md` (citée « synth. § n », problèmes PR1 à PR14, signaux faibles S1 à S16, biais B1 à B16) ; `docs/audit-parcours-animation-2026-09.md` (cité « audit § n », recommandations R1 à R11) ; `constats-preparateur.md` (« constat n ») ; pour trois renvois, `docs/audit-ux-animation-2026-09.md` (« audit n°4 », points E2, M8, m2).

## Conventions et précautions de lecture

- **Deux numérotations en P.** Dans l'audit, P1 à P7 sont des parcours ; dans la synthèse, P1 à P5 sont des participants. Ici, « parcours P3 » renvoie à l'audit (§ 2) ; « P3 » seul désigne le participant.
- **Tâches**, telles qu'on peut les reconstituer depuis la synthèse (protocole non relu) : T1 faire arriver un titre ; T2 trouver pourquoi les cartes « Plats » de l'accueil ne partent pas à leur arrivée à l'écran, et corriger ; T3 ralentir le titre, puis faire partir les boutons après lui ; T4 composer l'entrée d'une section (ordre des éléments, trois chiffres l'un après l'autre, dépassement, rejouer à chaque passage) ; T5 faire réagir un bouton au survol et retirer la boucle d'une pastille sans perdre son arrivée.
- **Pas d'avant / après.** L'audit est une inspection experte faite avant R1 à R4 ; l'étude a eu lieu après leur réalisation. Les tests ne mesurent donc aucun écart imputable à R1 à R4 : ils montrent comment se comporte la version corrigée, pas ce que les corrections ont changé. L'audit proposait lui-même un essai « avant d'engager R1 à R4 » sur trois consignes ; T1 et T3 (et en partie T4) les reprennent, mais après coup et avec des participants simulés.
- **Participants simulés, effectifs de 5** (2 débutants, 3 designers). Un « 5 sur 5 » ne dit rien d'une fréquence réelle (B4). Statuts, modes de fin, aides, écarts des récits et diagnostics sont fiables entre codeurs ; comptes d'événements, gravités d'origine et étapes ne le sont pas (synth. § 5.3) : je ne m'en sers que pour décrire.

---

## 1. Ce que les tests confirment de l'audit n°5

### 1.1 Le débutant obtient seul un effet tout prêt (audit, Verdict ; parcours P1 ; § 3 « Débutant »)
- **Audit** : « Pour un débutant, la promesse est tenue » ; valeur forte, obtenue en deux gestes.
- **Tests** : T1 réussie par 5 sur 5 sans aide, première action pertinente entre 4 et 6, SEQ médiane 6 ; T5 réussie par 5 sur 5 ; les 2 débutants réussissent T1 et T5 (synth. § 3, § 4.1, § 4.2, § 10). Les 5 jugent les effets simples faisables seuls (synth. § 11.10).
- **Portée** : la confirmation la plus nette, mais une découverte « probablement surestimée » (B1 ; B7 : « arriver » dans la consigne, proche du libellé « Apparition » ; B12 : tous savent que le sujet est l'animation). Les « deux gestes » ne se vérifient pas : le budget compte les captures (B14), les comptes ne se comparent pas à l'estimation de l'audit.

### 1.2 Pour composer, le modèle ne se laisse pas deviner (audit, Verdict ; § 3 « Designer qui compose »)
- **Audit** : « l'outil est puissant mais son modèle ne se laisse pas deviner ».
- **Tests** : T4 réussie par 0 sur 5, dont 0 designer sur 3 (H6 infirmée) ; « boutons après le titre » (T3) par 1 sur 5 ; 7 des 13 fins autres que « terminé » naissent à l'étape Composer, qui porte aussi la plus grande part des codes négatifs dans les deux publics (synth. § 1, § 9.1, § 9.2).
- **Portée** : direction confirmée. L'endroit où le modèle échappe diffère toutefois de celui que l'audit prévoyait (voir 2.1 et 3.1), et le budget de 40 actions pèse sur T4 (B14).

### 1.3 L'utilisateur pense « élément d'abord » (audit § 1, première ligne)
- **Audit** : « J'anime ce titre » (l'élément d'abord), alors que l'outil pose un déclencheur, puis des pistes.
- **Tests** : en T4, 4 participants sur 5 posent un lancement par élément depuis le panneau, sans attente (P3, P1, P5, P2) ; 1 seul compose un événement unique à départs décalés (P4) (synth. § 11.5). Les citations de PR1 cherchent l'attente à côté de l'effet (« Je n'y trouve pas d'option « après le précédent » », P1 ; « le délai n'est pas dans le panneau de l'élément », P5), et le constat 9 relève que 4 participants sur 5 ont cherché un délai « à côté de l'effet ».
- **Portée** : modèle mental confirmé chez 4 participants des deux publics. Sa conséquence prévue (un déclencheur posé sur le mauvais élément dans le mode Animation) n'est pas celle qui a été observée (voir 2.1).

### 1.4 Le vocabulaire du modèle arrête les débutants (audit § 4.1 ; promesse « Deux publics, un même objet », § 3)
- **Audit** : déclencheur, piste, image-clé, cible… « l'utilisateur doit l'apprendre avant d'agir » ; le passage du débutant au designer (« Ouvrir dans le mode Animation ») est « opaque ».
- **Tests** : PR2 (gravité 4, 4 participants sur 5) : évitement ou abandon chez les 2 débutants (P3 abandonne T3 ; P1 : « Je me suis dit « ce n'est pas pour moi » », synth. § 9) ; « piste » et « image-clé » contournés par P2 et P5, sans effet sur leur résultat ; seul P4 (designer motion) les emploie sans difficulté (synth. § 11.9).
- **Portée** : confirmé pour les débutants, sous une réserve forte : ces mots figuraient dans les listes « vocabulaire inconnu » de leurs fiches (B10), le résultat est donc en partie écrit d'avance. Nuancé pour les designers (voir 2.3).

### 1.5 Il manquait une phrase qui dise ce qui va se passer (audit § 4.2)
- **Audit** : cette phrase « ferait le lien entre le modèle et l'intention ».
- **Tests** : phrase lue et utilisée par 5 sur 5 (synth. § 9.1) ; seule source du diagnostic juste de T2 chez P3 et P2 ; citée comme ce qu'il y a de plus clair par P1, P2, P4, P5 ; 24 récits sur 25 sans écart matériel avec le site (synth. § 4.3, § 10).
- **Portée** : l'intuition de l'audit est confirmée dans son effet ; ses limites sont en 4.2.

### 1.6 Une apparition ouverte à 0 ms fait croire qu'on a fait disparaître l'élément (audit, parcours P3, première étape ; R10)
- **Audit** : « le titre disparaît du canevas : la tête de lecture est à 0 ms ».
- **Tests** : dans le mode Animation, le bouton « a disparu, remplacé par un cadre en pointillés » (P1, dans la chaîne de PR2) ; « cadre vide en pointillés … sans savoir si … je l'ai cassé » (P5, gravité 1) ; peur de casser exprimée par P1, P3 et P5 (B13). S13 (élément qui semble disparaître juste après le choix d'un effet) est un artefact probable et n'entre pas ici.
- **Portée** : observé chez 2 participants, de faible gravité isolément, mais inscrit dans le recul de P1 devant le mode Animation.

### 1.7 La boucle « régler, voir » ne va pas d'elle-même jusqu'au site (audit, parcours P6 ; § 4.4)
- **Audit** : pour voir une apparition à l'entrée dans l'écran, « il faut penser à l'onglet Aperçu ».
- **Tests** : H4 confirmée : en T1, 2 participants sur 5 vérifient en vue visiteur avant « J'ai terminé » ; P5 ne vérifie dans aucune tâche (synth. § 4.1, § 4.2, S14), et cela malgré « Tester sur le site » (R4).
- **Portée** : faible. Trois fiches prescrivaient de peu vérifier (B10) et aucune capture ne montre un mouvement en continu (B6). Compatible avec l'audit, non probant.

### 1.8 « Un seul endroit pour faire bouger » n'est pas tenu (audit, Verdict ; § 3, promesse 3)
- **Audit** : huit endroits, qui ne renvoient pas les uns aux autres.
- **Tests** : les cinq fonctions cherchées et non trouvées existent toutes, et toutes à un autre endroit que celui où on les cherche, le mode Animation : « Départ » (PR1, constat 9), « Rejouer » (PR7, constat 6), « Quand » d'une animation existante (PR12, constat 5), « Cible · Ses enfants, un à un » et « Décalage » (PR6, PR9, constat 7), courbe « Ressort » (PR8, constat 8).
- **Portée** : promesse non tenue, confirmée par 5 problèmes retenus. Mais le partage qui coûte n'est pas celui que décrivait l'audit (voir 2.5).

### 1.9 Le retour du survol n'est pas représenté (audit, parcours P5)
- **Audit** : dans le canevas, « Jouer » montre le grossissement « puis un retour sec ».
- **Tests** : un survol composé à la main revient d'un coup sur le site aussi, et rien ne dit ce qui se passera à la sortie de la souris (constat 3) ; P4 : « je ne sais pas » (S11).
- **Portée** : 1 participant, gravité 0, déclaratif seul : signal faible, qui prolonge l'observation de l'audit du canevas au site.

---

## 2. Ce que les tests contredisent ou nuancent

### 2.1 L'obstacle principal du designer n'est pas « où poser le déclencheur » (audit, parcours P2, deuxième étape ; § 3 ; R3)
- **Audit** : « Obstacle principal, avant le guide : savoir sur quel élément poser le déclencheur. »
- **Tests** : aucun problème retenu ni signal faible ne porte sur un déclencheur mal placé. Presque personne n'atteint ce geste : 4 participants sur 5 composent depuis le panneau, élément par élément (synth. § 11.5) ; le seul qui compose dans le mode Animation, P4, pose d'emblée un événement unique sur un bloc parent (« Contenu »). L'obstacle observé est en amont : ne pas trouver d'« après » dans le panneau (PR1, 4 sur 5), reculer devant le mode Animation (PR2).
- **Lecture** : l'audit a raisonné sur un designer qui entre dans le mode Animation pour composer ; les participants, designers compris, ont d'abord tenté de composer avec les choix tout prêts. On ne peut pas en conclure que R3 a réglé le problème prévu (voir 4.3).

### 2.2 Ralentir n'est plus le parcours le plus fragile (audit, parcours P3 ; Verdict)
- **Audit** : « Valeur : faible pour la retouche la plus courante » ; « Le champ « Durée » ne la ralentit pas ».
- **Tests** : titre ralenti par 5 sur 5 sans aide (H5) ; « Lente » choisi par 4 sur 5 (synth. § 10).
- **Lecture** : ce n'est pas l'audit qui est démenti, c'est l'interface qu'il décrivait qui a changé (R1). L'autre moitié du parcours P3, « partir plus tôt », a pris la forme « partir après » et elle est devenue le premier problème de l'étude (PR1).

### 2.3 « Départ » et « Remplir avec » fonctionnent pour les designers (audit § 4.1 ; parcours P2, étape « Décaler »)
- **Audit** : « départ » et « remplir » sont rangés parmi les mots du modèle ; l'audit ajoute que les mots d'action (« Choisir un élément », « Remplir avec », « Modifier ») « sont ceux qui fonctionnent », et il cote « Départ » clair sur les quatre questions du parcours P2.
- **Tests** : « Départ » compris comme une attente, sans code de vocabulaire, par 3 designers sur 3 (P5, P2, P4) ; P4 en tire la seule réussite complète de T3 ; « Remplir avec » employé sans difficulté par P4 (synth. § 10, § 11.9). Chez les 2 débutants, en revanche, « Départ » est vu et non utilisé (PR2). Chez les designers, les mots qui gênent sont des noms de structure : « piste », « image-clé », « composant », « instance » (H9 infirmée).
- **Lecture** : la distinction de l'audit entre mots d'action et noms de structure est confirmée, et « Départ » passe du côté des mots d'action ; mais pour les seuls designers. La cotation du parcours P2 est juste pour eux et fausse pour les débutants. Enfin, « trouvé et compris » ne veut pas dire « suffisant » : P5 et P2 n'ont décalé qu'un bouton sur deux avant la fin du budget.

### 2.4 Comprendre le modèle ne suffit pas à composer (audit § 3 : designer qui compose « ✓ en ~13 gestes, une fois le modèle compris »)
- **Tests** : P4, le seul à employer tout le vocabulaire sans difficulté, échoue T4 au budget avec trois éléments sur six et n'atteint jamais les chiffres ; environ 23 gestes hors captures pour trois éléments, soit 7 à 12 actions par élément (PR9). Aucun des 3 designers n'envisage aujourd'hui l'outil pour une scène composée (P5 « pas encore en production », P4 « pas encore prêt pour nos juniors », P2 « n'a pas sa place pour l'instant » ; synth. § 11.10).
- **Lecture** : les 13 gestes (mesurés par l'audit n°4) sont ceux d'un expert qui connaît le chemin. Les tests suggèrent un coût nettement supérieur à la première fois, mais le budget qui compte les captures l'amplifie (B14) : à confirmer. Une valeur déclarée négative est plus crédible qu'une valeur positive, puisque la complaisance (B3) pousse en sens inverse.

### 2.5 Le partage qui coûte est en profondeur, pas entre voisins (audit § 3, promesse 3 ; § 4.5 ; parcours P5 ; R7)
- **Audit** : hésitation entre deux chemins pour le survol, trois pour le défilement ; huit endroits.
- **Tests** : aucune hésitation entre chemins voisins n'est observée. En T5, réaction au survol obtenue par 5 sur 5, « Soulever » avec retour automatique chez 4 sur 5 ; en T1, la rubrique « Animation » trouvée par 5 sur 5 ; « Effets continus » découvert par hasard par P4 seul (synth. § 10, § 11.12). Ce qui coûte, c'est que le panneau et le mode Animation forment deux étages : ce qu'on cherche depuis le panneau n'existe qu'à l'étage du dessous (1.8), et le passage d'un étage à l'autre fait reculer (PR2).
- **Lecture** : le constat « pas un seul endroit » tient ; sa forme dominante est différente. Le volet survol de l'audit n'est pas démenti pour autant : T5 n'éprouvait pas le choix entre préréglage « Au survol » et état Survol.

### 2.6 Retirer une animation n'a pas posé de problème (audit, parcours P7 ; R11, volet « un mot par geste »)
- **Audit** : « Trois mots pour un même geste » ; une animation partagée survit au retrait sans qu'on le voie.
- **Tests** : H8 infirmée : boucle retirée sans perdre l'arrivée par 5 sur 5, arrivée jamais perdue dans le journal ; le badge « n animations » sert de preuve du retrait (P3, P2, P5) (synth. § 8, § 10).
- **Lecture** : démenti pour la forme testée (deux déclencheurs distincts sur un élément, retrait depuis le panneau). La survie d'une animation partagée n'a pas été éprouvée. Le mot « Aucune » pose en revanche un autre problème : il s'affiche sur un élément animé par son parent (PR3, voir 3.2).

### 2.7 L'écart entre éditeur et site ne se retrouve pas dans les récits (audit, Verdict, troisième idée ; § 1, ligne « L'aperçu »)
- **Audit** : « ce qu'on voit dans l'éditeur n'est pas ce qui se passera sur le site », l'une des trois idées sur lesquelles on bute.
- **Tests** : H3 infirmée : 1 récit sur 25 avec écart matériel, et ce récit est contaminé par une aide hors conditions (synth. § 4.3). Deux échecs déclarés « terminé » s'accompagnent même d'un récit exact (P1-T2, P3-T4).
- **Lecture** : sur la compréhension, l'écart est comblé chez des participants qui lisent la phrase de résumé (R2). Sur la perception, rien n'est tranché : aucun mouvement vu en continu (B6), récits comparés au site enregistré et non au vécu, « éclair » avant l'apparition absent de tous les récits (constat 1). Concordance probablement surestimée (B11, B16).

### 2.8 Le ressort n'est pas un « moment où ça marche » (audit § 3, designer qui retouche : « La courbe et le ressort, visibles »)
- **Tests** : aucun participant ne trouve la courbe « Ressort » ; le dépassement demandé en T4 n'est obtenu par personne ; P5 cherche un « rebond » parmi les choix tout prêts et prend « Zoom » à défaut (PR8, gravité 3, 2 participants ; constat 8).
- **Lecture** : l'audit jugeait le ressort une fois ouverts les réglages d'une image-clé ; les participants n'y arrivent pas. Réserve : T4 toujours en dernière position, budgets entamés.

### 2.9 L'inventaire des animations : moins une affaire de longueur que de page (audit, parcours P2 : liste de 59 animations, liste « Animation » de 79 choix ; audit n°4 M8)
- **Audit** : des listes longues qui « noient » ; l'audit n°4 relevait que la partie qui distingue les homonymes (élément, page) était tronquée.
- **Tests** : aucun participant n'est gêné par la longueur. P4 ouvre dans « Animations du site » l'animation homonyme d'une autre page et y passe 24 actions sans relever le changement de page, alors que « · La carte » est lisible dans la capture (PR4, gravité 4, 1 participant, possible effet d'ordre).
- **Lecture** : l'intuition de l'audit n°4 (distinguer par la page) est pertinente, mais la troncature n'est pas en cause ici. Un seul participant : à confirmer.

### 2.10 Constats de l'audit que les tests n'éprouvent pas
Faute de tâche correspondante, ni confirmés ni démentis : le défilement, ses millisecondes et le choix entre trois mécanismes (parcours P4, R6) ; la liste « Animation » de 79 choix au moment d'ajouter un déclencheur et « Terminer » sans résumé (parcours P2) ; « Personnalisée » après un décalage (parcours P3, R8) ; le délai du déclencheur caché qui s'additionne au « Départ » (§ 1, R5) ; le choix entre préréglage de survol et état Survol (parcours P5, R7) ; le récapitulatif à la publication et « réduire les animations » (parcours P6). « Netteté » (parcours P1, R11) n'apparaît qu'en déclaratif chez P5 (S12). Aucun de ces points n'est à lire comme réfuté.

---

## 3. Ce que les tests révèlent et que l'audit n'avait pas vu

### 3.1 Aucune attente ni « après » là où l'on pose l'effet (PR1, rang 1)
- **Observé** : 4 participants sur 5 (P1, P3, P5, P2), gravité 4, cause visible dans des captures nettes ; le délai est absent du panneau par conception (constat 9).
- **Pourquoi l'audit ne l'a pas vu** : ses parcours séparaient le débutant, qui pose un effet sur un élément (parcours P1), et le designer, qui compose directement dans le mode Animation (parcours P2). Le chemin réellement suivi, poser un effet tout prêt sur chaque élément puis chercher à les ordonner, ne figurait dans aucun des sept parcours. L'audit a vu l'absence de vitesse dans les choix rapides (parcours P3, corrigée par R1), pas l'absence symétrique d'attente ; R5 visait le délai caché du mode Animation, pas celui-ci.

### 3.2 Un élément animé par son parent affiche « Aucune » (PR3)
- **Observé** : P1 et P5, gravité 4 (origine de l'échec déclaré « terminé » de P1) : « La carte du plat n'a aucune animation configurée, ce qui explique son immobilité » (P5).
- **Écart avec l'audit** : l'audit posait que « ce qui lance n'est pas ce qui bouge » (§ 1) et qu'on ne retrouve un élément animé qu'en le sélectionnant (parcours P1, dernière étape), mais pour une animation posée sur l'élément lui-même, et au moment de la créer. Le diagnostic d'une animation existante portée par un autre élément n'a pas été parcouru. Cause non vérifiée (synth. PR3).

### 3.3 Modifier une animation existante : « Quand » et « Rejouer » introuvables, pertes silencieuses (PR7, PR12, synth. § 11.8)
- **Observé** : personne ne fait rejouer la scène à chaque passage (critère de T4 non rempli par 5 sur 5 ; P1 et P4 cherchent sans trouver ; P4 cherche dans le menu des répétitions, constat 6). P5 et P2 ne trouvent pas comment passer « Au chargement » à l'entrée dans l'écran sur l'animation existante (PR12) : P5 crée un doublon ; P2 retire puis remet l'apparition, ce qui décoche « les cartes une à une » sans prévenir (synth. § 11.8).
- **Écart avec l'audit** : l'audit posait « Une fois ou à chaque passage ? » comme un manque d'information (parcours P1), que R2 a comblé ; les tests montrent qu'une fois l'information lue (P1 lit « une seule fois »), le réglage reste introuvable. La retouche du parcours P3 portait sur la vitesse et le délai, pas sur le moment de lancement. Les deux réglages en cause sont au même endroit (réglages du déclencheur, constats 5 et 6).

### 3.4 Faire partir un groupe d'éléments répétés l'un après l'autre (PR6, PR9)
- **Observé** : P1 et P2 n'atteignent aucun bloc des trois chiffres (PR6, gravité 3, amplifiée par le dispositif) ; P4 compose piste par piste (PR9, amplifié). « Cible · Ses enfants, un à un » et « Décalage » existent sur la piste, sans être ouverts (constat 7) ; l'existence d'un bloc contenant les seuls trois chiffres n'est attestée nulle part.
- **Écart avec l'audit** : ni l'échelonnement d'éléments répétés, ni la case « les enfants un à un » du panneau n'ont été parcourus.

### 3.5 Dans le mode Animation, sélectionner un autre élément garde l'animation précédente (PR5)
- **Observé** : 3 designers, gravité 3 : l'animation en cours reste ouverte, et « + Ajouter » ajoute une piste au lieu d'ouvrir l'animation de l'élément cliqué.
- **Écart avec l'audit** : la pioche est cotée claire sur les quatre questions (parcours P2), ce qui est juste pour ajouter un élément à une scène ; le cas « passer à l'animation d'un autre élément » n'a pas été envisagé. Cause non vérifiée.

### 3.6 Désigner ce qui doit bouger : texte ou image intérieurs, fil d'Ariane (PR10, S1)
- **Observé** : PR10 chez 5 sur 5, gravité 2, les deux publics, parade apprise en cours de séance (P1, P2, P5). S1 (fil d'Ariane difficile à viser) est à l'origine de l'échec le plus lourd de l'étude (P3-T2), mais classé artefact probable.
- **Écart avec l'audit** : hors du champ que l'audit n°5 s'était donné (« pas la taille des boutons ») ; l'audit n°4 ne relevait sur le fil d'Ariane que la troncature du premier élément (m2). Pour un parcours d'animation, c'est pourtant l'étape « désigner ce qui bouge » qui coûte le plus souvent.

### 3.7 La portée d'un réglage posé dans un composant n'est pas dite (PR11, constat 4)
- **Observé** : P1, P3, P5, gravité 2 ; défaut établi : une apparition posée sur un chiffre vaut pour les trois occurrences du composant sans avertissement lisible, et le panneau nomme « Texte « 12 » » quand on clique « 38 ».
- **Écart avec l'audit** : l'audit parlait du partage d'une animation entre déclencheurs (§ 1, dernière ligne ; parcours P7), pas du partage par un composant.

### 3.8 Défauts techniques et résidus des corrections
- **« Éclair » avant l'apparition** (constat 1) : sur le site, l'élément est visible, disparaît, puis arrive. Relevé par 5 visites instrumentées, invisible aux participants (B6), anticipé par P4 dans un récit. L'audit examinait l'éditeur, pas ce que vit le visiteur.
- **Phrase « un à un » sans échelonnement réel** (constat 2) : la phrase issue de R2 peut annoncer ce qui ne se joue pas. Aucun comportement observé.
- **Vitesse active indiscernable** (PR14 : P2 et P5, gravité 1, possible effet d'ordre) : résidu de R1.
- **Entrée dans un champ chiffré** (PR13 : P5 et P4) : d'après le journal, la valeur n'est enregistrée qu'au changement de champ, ce que contredit la lecture du code (constat 10). Même zone que le défaut E2 de l'audit n°4 (Entrée qui renommait le calque, corrigé le 13 septembre) : à inclure dans la vérification technique, sans présumer d'un lien.

### 3.9 Ce qui marche et que l'audit n'avait pas formulé
- **Le moment de lancement est décidé par le choix tout prêt** : 5 sur 5 obtiennent « entre dans l'écran » sans le choisir (« je ne l'ai pas choisi, c'était déjà comme ça », P1 ; synth. § 11.1). La promesse « déclencheur d'abord » est invisible pour le débutant, et c'est ce qui la rend tenable pour lui. À préserver dans toute évolution (synth. § 12, dernière phrase).
- **Le badge « n animations »** sert de preuve d'un retrait (3 participants) : l'audit le jugeait insuffisant pour retrouver un élément animé (parcours P1) ; il suffit pour vérifier un retrait.

---

## 4. Effet des recommandations déjà faites (R1 à R4)

Rappel : sans mesure avant correction, « effet » veut dire ici « comportement de la version corrigée », pas « changement causé par la correction ».

### 4.1 R1 · « Durée » fait la vitesse ; vitesse Rapide · Normale · Lente sur les choix rapides
- **Utilisée (observé)** : « Lente » choisi par 4 participants sur 5 en T3, en 4 à 13 actions ; P4, qui compose à la main, comprend sans aide que les images-clés suivent la durée (synth. § 10).
- **Comprise (observé)** : titre ralenti par 5 sur 5 sans aide (H5) ; aucun récit ne décrit une durée allongée qui ne ralentirait pas.
- **Suffisante** : pour ralentir, oui dans l'étude. Résidu observé : la vitesse active ne se distingue pas et « Normal » est tronqué (PR14, 2 designers, gravité 1, possible effet d'ordre).
- **Supposé, non établi** : que le champ « Durée » du mode Animation ne trompe plus personne (un seul participant, P4, l'a utilisé) ; qu'une retouche chiffrée (« deux fois plus lente », consigne proposée par l'audit) réussisse aussi bien : T3 est cotée sur « titre plus lent » (H5).

### 4.2 R2 · Phrase de résumé en langage courant
- **Utilisée (observé)** : lue et utilisée par 5 sur 5 (synth. § 9.1), lue pour vérifier dans 4 séances sur 5 ; seule source du diagnostic juste de T2 chez P3 et P2, ligne « Au chargement » chez P5 (synth. § 10).
- **Comprise (observé)** : 24 récits sur 25 sans écart matériel ; citée comme ce qu'il y a de plus clair par 4 participants, « la meilleure idée de l'outil » pour P4.
- **Suffisante : non, sur deux points observés.** Elle n'aide pas quand l'animation est portée par un autre élément : P1 et P5 lisent « Aucune » sur la carte et concluent à l'absence d'animation (PR3). Elle dit « une seule fois » sans mener au réglage : P1 la lit et ne trouve pas où le changer (PR7). Défaut établi hors participants : elle peut annoncer « un à un » sans échelonnement (constat 2).
- **Supposé, non établi** : que de vraies personnes la lisent autant ; les participants simulés lisent les textes longs et s'y fient (B11), P3 les lit contre sa persona (B1).

### 4.3 R3 · Le modèle dit à l'entrée du mode Animation ; « Animer « élément » » en un geste
- **Utilisée : non établi.** La synthèse ne rapporte aucune lecture ni citation du texte d'entrée. Les entrées décrites se font depuis le panneau par « Ouvrir dans le mode Animation » (P1 en T3 ; P2 passe à côté en T4) ou d'emblée (P4). Hypothèse à vérifier dans l'interface, pas dans les données : si ce lien ouvre directement la ligne de temps de l'élément, le texte d'entrée n'est pas vu par ceux qui en auraient le plus besoin.
- **Comprise : non établi.** L'erreur visée (déclencheur sur le mauvais élément) n'apparaît pas, et P4 compose correctement un événement unique sur un bloc parent. Mais P4 est le designer motion dont la persona connaît ce modèle, et les autres n'atteignent pas ce geste (2.1) : l'absence d'erreur ne prouve pas l'effet de R3.
- **Suffisante : non pour les débutants (observé).** Le mode Animation fait reculer P3 et P1 (PR2) : mots des pistes et des images-clés inconnus, élément montré en cadre vide, écran jugé trop chargé. Chez les designers, passer d'un élément à l'autre dans ce mode reste confus (PR5, 3 designers) ; la synthèse n'en qualifie pas la cause, rien ne permet de l'imputer à R3.

### 4.4 R4 · « Tester sur le site » ; canevas et Aperçu distingués
- **Utilisée (observé)** : en T2, 4 participants sur 5 vérifient en vue visiteur à un moment (P3, P1, P2, P4) ; sur la séance, P1 dans 4 tâches, P2 dans 3, P4 dans 2, P3 dans 1 (par accident), P5 dans aucune (synth. § 4.2). En T1, 2 sur 5 vérifient avant « J'ai terminé ».
- **Comprise (observé)** : le lien a montré un mouvement en cours chez P1 (T2, T4), P2 (T5) et P4 (T3) ; cité comme utile par P1, P2, P3 (synth. § 10).
- **Suffisante : non établi.** « Tester sur le site » s'ouvre en haut de page ou sur une autre page chez P2 et P4 (S15, cause non établie : défilement postérieur à la capture non exclu) ; plusieurs vérifications ne voient pas l'arrivée, déjà jouée au moment de la capture (S2, artefact probable). La distinction de vocabulaire canevas / Aperçu ne produit aucune observation, ni confusion ni usage explicite.
- **Supposé, non établi** : que R4 fasse vérifier davantage de vraies personnes (H4 confirmée, mais en partie écrite dans les fiches, B10). À noter : R4 mène précisément là où l'« éclair » du constat 1 se voit ; la boucle « régler, voir, ajuster » n'est complète que si ce défaut est corrigé.

### 4.5 En bref
R1 et R2 : utilisées et comprises par tous, avec des limites précises (état de la vitesse ; animation portée par un parent ; réglage « une seule fois » introuvable). R3 : aucun effet lisible dans les données, et les débutants reculent toujours. R4 : utilisée par 4 participants sur 5 et utile quand le mouvement se voit ; fiabilité de l'ouverture non établie. Aucune ne traite le premier problème de l'étude (PR1), que l'audit n'avait pas identifié.

---

## 5. Recommandations R5 à R11 à la lumière des tests

| # | Verdict | En une ligne |
|---|---|---|
| R5 · Un seul délai visible | **À reformuler** | Besoin d'attente confirmé (PR1), mais cherché dans le panneau, pas dans la ligne de temps |
| R6 · Défilement en % | **Sans appui** (non testé) | Aucune tâche ne portait sur le défilement |
| R7 · Relier les endroits | **À reformuler** | Volet voisins sans appui ; volet profondeur (panneau → mode Animation) fortement appuyé |
| R8 · « Personnalisée » | **Sans appui** | Aucune observation |
| R9 · Animations empilées | **Moins prioritaire** | 1 doublon observé, sans perte ; mieux traité à la source (PR12) |
| R10 · Ouvrir sur l'état visible | **Confirmée** | Cadre vide chez P1 et P5, dans le recul devant le mode Animation |
| R11 · Un mot par geste | **À reformuler, moins prioritaire** | Retrait sans problème ; les mots en cause sont ailleurs |

### R5 · Un seul délai visible, réglé dans la ligne de temps
- **Appui** : le besoin d'attendre ou de partir « après » est le premier problème de l'étude (PR1, 4 participants sur 5, gravité 4). Mais il est cherché à côté de l'effet, dans le panneau (constat 9), pas dans la ligne de temps. La confusion entre délai du déclencheur et « Départ », qui fonde R5, n'est pas observée ; la synthèse ne rapporte aucune tâche partant d'un délai de déclencheur existant.
- **Reformulation** : une attente, ou « après tel élément », exprimée là où l'on pose l'effet et en mots d'usage ; la même valeur se retrouve à l'identique dans la ligne de temps (un seul délai, mais d'abord là où on le cherche). Reprise dans l'action 1.

### R6 · Au défilement, parler en % ; aider à choisir le mécanisme
- **Appui** : aucun ; le défilement était hors des tâches, « Effets continus » n'a été découvert que par hasard (P4).
- **Statut** : le constat d'inspection (des millisecondes pour un effet sans durée, trois mécanismes sans guide) reste valable. Moins prioritaire faute de preuve, pas écartée : à inclure dans un prochain test.

### R7 · Relier les endroits qui font bouger
- **Volet voisins** (survol par préréglage ou par état Survol ; Interactions) : sans appui. T5 réussie par 5 sur 5 sans hésitation observée, mais le choix entre les deux chemins n'était pas éprouvé.
- **Volet profondeur** : fortement appuyé. Cinq problèmes retenus (PR1, PR6, PR7, PR8, PR12) portent sur une fonction qui existe dans le mode Animation et qu'on cherche depuis le panneau (constats 5 à 9) ; le passage d'un étage à l'autre fait reculer (PR2).
- **Reformulation** : depuis le panneau et la phrase de résumé, nommer ce qui existe plus loin et mener directement au réglage visé, plutôt qu'à l'écran entier ; amener le réglage dans le panneau quand la majorité le cherche là (attente, rejouer). Reprise dans les actions 1, 4 et 5.

### R8 · « Personnalisée » explicable et réversible
- **Appui** : aucune observation de « Personnalisée » dans la synthèse.
- **Voisin mais distinct** : retirer puis remettre une apparition décoche « les cartes une à une » sans le dire (P2, synth. § 11.8), autre perte silencieuse entre les deux étages. L'esprit de R8, dire ce qui a changé, est repris dans l'action 4 ; R8 elle-même reste en réserve.

### R9 · Signaler les animations empilées
- **Appui faible** : 1 empilement involontaire (doublon créé par P5 en T2, sans perte de critère, synth. § 3.1) ; en T5, un élément à deux mouvements est bien lu grâce au badge (P3, P2, P5).
- **Statut** : moins prioritaire. Le doublon observé naît de l'impossibilité de changer le « Quand » : c'est à la source qu'il se traite (action 4).

### R10 · Ouvrir une apparition sur son état visible
- **Appui** : cadre vide en pointillés chez P1 et P5 dans le mode Animation (1.6), repris par la recommandation 2 de la synthèse. Gravité faible isolément, rôle dans le recul d'une débutante.
- **Statut** : confirmée ; reprise dans l'action 3.

### R11 · Un mot par geste
- **Appui** : « Retirer l'animation » partout, sans appui (retrait réussi par 5 sur 5, 2.6) ; « Netteté », déclaratif seul chez P5 (S12) ; mention de l'aperçu « Voir », non observée (peut-être déjà traitée avec R4, à vérifier).
- **Ce que les tests demandent en matière de mots** : des noms de structure du mode Animation doublés d'un mot d'usage là où arrivent les débutants (« piste », « image-clé », « cible », « décalage » : PR2) ; des états affichés qui disent vrai pour l'élément sélectionné (« Aucune » sur un élément animé par son parent, PR3 ; « Texte « 12 » » quand on clique « 38 », PR11).
- **Statut** : à reformuler dans ce sens ; la forme actuelle de R11 est moins prioritaire. Reprise dans les actions 3, 4 et 9.

---

## 6. Plan d'action consolidé

**Règle de classement.** D'abord l'effet estimé de la synthèse (gravité retenue × participants, synth. § 12) ; puis la solidité de la preuve (problème d'interface avant problème amplifié par le dispositif ou possible effet d'ordre) ; enfin, à niveau voisin, ce qui donne une information fausse à l'utilisateur ou au visiteur passe avant ce qui la rend seulement difficile à trouver. Ce sont des intentions pour l'utilisateur, pas des maquettes.

| Rang | Action | Problèmes | Nature | Preuve |
|---|---|---|---|---|
| 1 | Dire « après » ou « attendre » là où l'on pose l'effet | PR1 (+ R5, R7) | Fonction hors de portée | Observé chez 4 sur 5 |
| 2 | Que le site joue ce que l'éditeur annonce | Constats 1 et 2 | Défaut | Code et visites, non perçu par les participants |
| 3 | Rendre le mode Animation abordable pour qui vient du panneau | PR2 (+ R10, R11) | Manque de mots et d'état | Observé chez 4 sur 5, bloquant chez 2 |
| 4 | Retrouver et corriger une animation existante là où on la lit | PR3, PR12, PR4, § 11.8 (+ R8, R9) | Manque, découvrabilité | Observé chez 2, 2 et 1 |
| 5 | Trouver « à chaque passage » et une arrivée qui dépasse là où on les cherche | PR7, PR8 (+ R7) | Découvrabilité, fonction absente des choix tout prêts | Observé chez 2 et 2 |
| 6 | Désigner du premier coup ce qui doit bouger | PR10, S1 | Manque | Observé chez 5, pointage amplifié |
| 7 | Passer d'un élément à l'autre dans le mode Animation sans ambiguïté | PR5 | Manque | Observé chez 3 designers |
| 8 | Faire partir un groupe d'éléments répétés l'un après l'autre | PR6, PR9 | Découvrabilité | Observé chez 3, amplifié |
| 9 | Dire la portée d'un réglage de composant au moment où on le pose | PR11 | Défaut | Observé chez 3 |
| 10 | Vérifier et finir les corrections déjà faites | PR13, PR14, S15 | Défauts à vérifier | Observé chez 2, 2 et 2 |

### 1 · Dire « après » ou « attendre » là où l'on pose l'effet
- **Problème traité** : PR1 ; réduit l'exposition des débutants à PR2. Reprend R5 reformulée, le volet profondeur de R7 et la recommandation 1 de la synthèse.
- **Nature** : fonction existante mais hors de portée (« Départ » dans le mode Animation) et absente du panneau par conception (constat 9).
- **Effet attendu** : « boutons après le titre » (T3) et l'ordre d'une scène (T4) deviennent atteignables sans changer de mode, en mots d'usage ; les débutants ne sont plus envoyés vers l'écran qui les fait reculer ; une seule valeur d'attente, retrouvée à l'identique dans la ligne de temps.
- **Niveau de preuve** : observé chez 4 participants sur 5 (P1, P3, P5, P2), gravité 4, cause visible dans les captures ; simulé. À confirmer avec de vraies personnes, en particulier chez les débutants, pour qui « après » était un test de limite.

### 2 · Que le site joue ce que l'éditeur annonce
- **Problème traité** : l'« éclair » avant l'apparition à l'entrée dans l'écran (constat 1) ; la phrase « un à un » affichée sans échelonnement (constat 2). Condition de R4.
- **Nature** : défaut.
- **Effet attendu** : le passage qui réussit chez 5 sur 5 (T1) donne au visiteur une arrivée propre ; « Tester sur le site » montre ce qu'on a réglé ; la phrase de résumé reste une source sûre, alors que les participants s'y fient pour vérifier.
- **Niveau de preuve** : défaut vérifié dans le code et par 5 visites instrumentées ; perçu par aucun participant (captures, B6). Seule action du plan qui ne repose pas sur un comportement observé ; classée haut parce qu'elle touche le chemin le plus emprunté et le visiteur final, et que sa cause est établie. Sa gêne réelle est à confirmer, pas son existence.

### 3 · Rendre le mode Animation abordable pour qui arrive du panneau
- **Problème traité** : PR2 ; reprend R10, le volet vocabulaire de R11 reformulée et la recommandation 2 de la synthèse.
- **Nature** : manque (mots de structure sans équivalent d'usage, élément montré comme un cadre vide) ; les fonctions existent.
- **Effet attendu** : en arrivant du panneau, on comprend ce que chaque zone règle sans connaître « piste », « image-clé », « cible », « décalage », et on voit l'élément tel qu'il apparaîtra ; les débutants qui y arrivent ne quittent plus l'écran, les designers ne contournent plus les mots.
- **Niveau de preuve** : observé chez 4 participants sur 5, bloquant chez les 2 débutants seulement ; simulé et en partie écrit d'avance (mots inscrits dans les fiches, B10) ; à confirmer avec de vrais débutants. La modification accidentelle d'un réglage en fermant une liste (P3) ne fonde rien (listes du dispositif, S4). Priorité à revoir une fois l'action 1 livrée, qui réduit le nombre de débutants envoyés dans ce mode.

### 4 · Retrouver et corriger une animation existante là où on la lit
- **Problème traité** : PR3, PR12, PR4, perte silencieuse de « une à une » (synth. § 11.8) ; reprend l'esprit de R8, R9 et les recommandations 3 et 10 de la synthèse.
- **Nature** : PR3 manque d'information sur l'élément sélectionné (cause non vérifiée) ; PR12 découvrabilité (constat 5) ; PR4 manque (cause non vérifiée) ; § 11.8 défaut probable.
- **Effet attendu** : un élément animé par un parent le dit dans sa propre rubrique et mène au porteur ; le moment de lancement se change là où on le lit, sans doublon ni perte d'un réglage ; l'inventaire dit la page de chaque animation et prévient quand on en change. T2 se diagnostique et se corrige sans fausse piste.
- **Niveau de preuve** : PR3 observé chez 2 (gravité 4) ; PR12 chez 2 designers (gravité 2) ; PR4 chez 1 (possible effet d'ordre, à confirmer) ; perte de « une à une » chez 1. Simulé.

### 5 · Trouver « à chaque passage » et une arrivée qui dépasse là où on les cherche
- **Problème traité** : PR7, PR8 ; reprend R7 reformulée et la recommandation 4 de la synthèse. « Rejouer » est au même endroit que le « Quand » de l'action 4 (constats 5 et 6) : à concevoir ensemble.
- **Nature** : découvrabilité (interrupteur « Rejouer », courbe « Ressort » : constats 6 et 8) ; fonction absente des choix tout prêts (aucune apparition à dépassement, constat 8).
- **Effet attendu** : la mention « une seule fois » devient actionnable ; une arrivée qui dépasse avant de se poser s'obtient parmi les choix tout prêts ; les deux critères de T4 qu'aucun participant n'a remplis deviennent atteignables.
- **Niveau de preuve** : critères non remplis par 5 sur 5 ; problème retenu chez 2 participants chacun (P1, P4 ; P5, P1) ; T4 toujours en dernière position ; simulé.

### 6 · Désigner du premier coup ce qui doit bouger
- **Problème traité** : PR10 et S1 ; recommandation 5 de la synthèse.
- **Nature** : manque (cause non vérifiée).
- **Effet attendu** : un clic sur un bouton, une pastille ou une carte désigne l'élément voulu, ou permet d'y remonter sans viser de petites cibles ; moins d'actions perdues dans chaque tâche, pas d'échec de diagnostic dû à la remontée (P3-T2).
- **Niveau de preuve** : PR10 observé chez 5 sur 5, gravité 2 (le « 5 sur 5 » ne dit rien d'une fréquence réelle, B4) ; S1 classé artefact probable ; à confirmer avec une vraie souris.

### 7 · Passer d'un élément à l'autre dans le mode Animation sans ambiguïté
- **Problème traité** : PR5 ; recommandation 6 de la synthèse.
- **Nature** : manque (cause non vérifiée).
- **Effet attendu** : en sélectionnant un autre élément, on choisit clairement entre ouvrir son animation et l'ajouter à la scène en cours ; plus de piste vide ajoutée par erreur.
- **Niveau de preuve** : observé chez 3 designers, gravité 3 ; occurrences de gravité 2 et plus toutes à la position la plus précoce de T3 ; simulé.

### 8 · Faire partir un groupe d'éléments répétés l'un après l'autre
- **Problème traité** : PR6, PR9 ; recommandation 7 de la synthèse. Prolonge l'action 1 (un « après » pour des éléments répétés).
- **Nature** : découvrabilité (« Cible · Ses enfants, un à un », « Décalage », case « les enfants un à un » : constat 7) ; existence d'un bloc regroupant les trois chiffres à vérifier techniquement.
- **Effet attendu** : une série (chiffres, cartes) part l'un après l'autre sans chercher un bloc parent ni poser une piste par élément ; le coût d'une scène devient compatible avec l'usage que les designers déclarent.
- **Niveau de preuve** : observé chez 2 (PR6) et 1 (PR9), tous deux amplifiés par le budget et les captures ; à confirmer avec de vrais designers, sans limite d'actions.

### 9 · Dire la portée d'un réglage de composant au moment où on le pose
- **Problème traité** : PR11 ; recommandation 8 de la synthèse.
- **Nature** : défaut (constat 4).
- **Effet attendu** : on sait, avant de valider, que le réglage vaudra pour toutes les occurrences, et le panneau nomme l'occurrence cliquée.
- **Niveau de preuve** : observé chez 3 (P1, P3, P5), gravité 2, sans modification involontaire dans l'étude ; le risque sur un composant utilisé ailleurs dans un vrai site est supposé, non observé.

### 10 · Vérifier et finir les corrections déjà faites
- **Problème traité** : PR13 (Entrée dans un champ chiffré), PR14 (vitesse active indiscernable, résidu de R1), S15 (« Tester sur le site » ouvert au mauvais endroit, résidu possible de R4) ; recommandation 9 de la synthèse.
- **Nature** : PR13 défaut à vérifier (journal contre code, constat 10 ; même zone que E2 de l'audit n°4) ; PR14 manque d'état visible ; S15 défaut non établi.
- **Effet attendu** : une valeur validée au clavier est prise ; la vitesse choisie se lit d'un coup d'œil ; la boucle vers le site ouvre toujours sur l'élément.
- **Niveau de preuve** : chacun observé chez 2 participants ; PR14 possible effet d'ordre ; S15 cause non établie. Vérifications techniques plutôt que tests utilisateurs.

**Hors plan, en réserve, non réfutées** : R6 (non testée), R8 (non observée), R7 volet survol, R11 volets retrait et « Netteté », R9 en tant qu'alerte séparée.

---

## 7. Ce qu'un test avec de vraies personnes devrait trancher en priorité

Format minimal : séances sans budget d'actions, filmées, pensée à voix haute, sans annoncer le thème de l'animation ; au moins 3 débutants et 2 ou 3 designers. Les questions sont classées par poids dans les décisions du plan.

1. **De vrais débutants cherchent-ils à ordonner des éléments, et où ?**
   Tranche : la portée de l'action 1 (panneau pour tous ou pour les designers), PR2 hors de l'effet des fiches (B10), H5.
   Consigne : « Sur l'accueil, faites que les deux boutons arrivent juste après le titre. »
   À relever : premier endroit cherché, passage ou non par le mode Animation et réaction à cet écran, abandon, récit de ce que verra un client.

2. **Un vrai designer compose-t-il une scène quand rien ne limite ses gestes ?**
   Tranche : H6, PR9 et PR6 (amplifiés par le dispositif), PR7, PR5, et la valeur déclarée de la mise en scène (synth. § 11.10).
   Consigne : « Quand cette section arrive à l'écran, faites entrer la photo, puis le titre, puis le texte, puis les trois chiffres l'un après l'autre, et que ça se rejoue à chaque passage. »
   À relever : durée et chemin (panneau ou mode Animation), ouverture de « Cible » et de « Rejouer », moment où il juge l'outil utilisable ou non pour son travail.

3. **Le diagnostic d'une animation portée par un parent échoue-t-il avec une vraie souris ?**
   Tranche : PR3, PR4 (possible effet d'ordre), PR12, S1 et PR10 (pointage amplifié par les captures).
   Consigne : « Le client voulait que les plats de l'accueil arrivent quand on descend jusqu'à eux ; ce n'est pas le cas. Trouvez pourquoi et corrigez. »
   À relever : élément sélectionné en premier, lecture de « Aucune », remontée jusqu'à la liste, page ouverte depuis l'inventaire, doublon ou réglage perdu.

4. **Des débutants qui ignorent le sujet trouvent-ils seuls où agir ?**
   Tranche : H1, et le socle du plan (T1 à 5 sur 5 probablement surestimé : B1, B7, B12).
   Consigne, en début de séance : « Ce site paraît un peu figé ; rendez le titre de l'accueil plus vivant. » (sans « arriver », « apparition » ni « animation »).
   À relever : temps et chemin jusqu'à la rubrique, effet obtenu, abandon.

5. **Vérifie-t-on comme un visiteur quand le mouvement se voit en continu, et que voit-on ?**
   Tranche : H4, S2, la suffisance de la phrase de résumé (H3), l'usage réel de R4 ; la gêne de l'« éclair » seulement si ce test précède l'action 2.
   Consigne, après une tâche réussie : « Montrez-moi ce que verra un client qui ouvre la page, puis dites si c'est ce que vous vouliez. »
   À relever : recours spontané à « Tester sur le site », ce qui est vu et dit (éclair, vitesse perçue), écart entre le récit et le site.
