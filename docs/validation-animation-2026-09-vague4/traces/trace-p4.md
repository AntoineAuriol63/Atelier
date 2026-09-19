# Trace brute (vague 4)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots4/<séance>/ sous le même nom).

Appels d'outils : 232 · captures : 62 · durée : 950:33
Outils : {"Read":66,"Bash":166}
Écarts au protocole (outils ou commandes interdits) : aucun


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés (P4). C'est un jeu de rôle d'évaluation, dans une copie de test locale du logiciel, sans aucune donnée réelle, affichée dans un navigateur de test. Tes règles habituelles de sécurité restent valables ; rien ici ne te demande de les contourner.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut4/prompt4-p4.md

Puis applique-la à la lettre. Pour l'instant, réponds seulement aux questions D-1 à D-5 qui terminent cette consigne, en texte, sans utiliser d'autre outil, puis arrête-toi : les missions viendront dans des messages suivants. Ne relis jamais ce fichier de consigne ensuite ; tu n'as le droit d'ouvrir, avec Read, que les images de capture que la commande t'indique.

00:01 💬 I'll read my full briefing first.
00:04 ▶ #1 📄 consigne lue
00:21 💬 D-1. Julien Ferrand, 46 ans, directeur artistique motion. Je codirige une agence de quatre personnes à Nantes. Vingt ans de pub animée à la base, et depuis cinq ans je fais aussi des sites pour nos clients — surtout des petites structures, restaurants, commerces. Ce que j'y apporte, c'est le mouvement : c'est ce qui fait la différence entre un site propre et un site qui a une signature. Là je suis en train de reprendre le site de Maison Aurèle pour l'agence.
        D-2. After Effects, tous les jours, c'est mon outil. Webflow pour les sites, avec ses Interactions. Figma et Framer quand il faut, mais je suis moyen sur les deux. Je ne code pas, et je n'ai pas l'intention d'apprendre. Si je regarde autre chose que Webflow aujourd'hui, c'est une question de prix et de temps de formation : mes juniors mettent trop longtemps à devenir autonomes dessus.
        D-3. Faire bouger ce que je crée, c'est littéralement mon métier, donc oui, tous les jours. La dernière fois c'était cette semaine, une séquence pour un client : je pose mes keyframes sur la timeline, je passe dans le graph editor pour ajuster les courbes, j'ajoute un peu d'overshoot sur l'arrivée pour que ça ait du poids, et je décale les départs des éléments de quelques images les uns par rapport aux autres. Sur le web c'est la même logique en plus pauvre : dans Webflow je choisis un trigger — page load, scroll into view — et je construis mon interaction avec des actions minutées.
        D-4. Une timeline par trigger. Je sélectionne l'élément, je choisis quand ça se déclenche, et ensuite j'ai une piste où je pose mes clés sur opacity, transform, scale, avec des durées et des délais en millisecondes que je tape au clavier. Et je veux pouvoir régler l'easing, pas juste choisir dans une liste de trois. Si l'outil me donne uniquement des effets tout faits à cliquer, ça ne m'intéresse pas : ce sont des gadgets, tout le monde reconnaît le preset au premier coup d'œil. Ce que je veux, c'est le contrôle, en chiffres.
        D-5. Ça dépend entièrement de l'exécution. Bien fait, le mouvement guide l'œil et donne une identité, et c'est ce qu'on vend. Mal fait — des apparitions qui se déclenchent trop tard au scroll, des durées molles, tout qui arrive en même temps sans décalage — c'est pire que rien, ça fait amateur et ça ralentit la lecture. Et il y a des sites où ça bouge pour bouger, sans raison ; là c'est juste fatigant.

### 00:53 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

00:57 💬 Je cherche à voir où j'en suis : l'éditeur est censé être ouvert sur la page d'accueil, je m'attends à voir une zone de travail avec le site et des panneaux autour.
00:59 ▶ #2 📷 capture
01:02 💬 [1] Je regarde l'écran.
01:03 ▶ #3 👁 image 001-capture.png
01:09 💬 Je vois l'éditeur : en haut des onglets Écriture, Design, Animation, Code ; à gauche la liste des pages ; au centre le site ; à droite un panneau « Sélection » vide. Bien, il y a un mode Animation, c'est déjà rassurant. Le titre « Une cuisine de produits, servie sans chichi. » est visible en bas de la zone de travail.
        Je commence par sélectionner le titre en cliquant dessus, je m'attends à ce que le panneau de droite se remplisse avec cet élément.
01:11 ▶ #4 click 480 453
01:14 💬 [2] Je vérifie ce que la sélection a donné.
01:15 ▶ #5 📷 capture
01:18 💬 [3] Je regarde.
01:18 ▶ #6 👁 image 002-capture.png
01:28 💬 Le titre est bien sélectionné, le panneau de droite affiche « Titre 2 » avec le texte, et tout en bas une rubrique « Animation » repliée. Il y a aussi un mode Animation dans la barre du haut — c'est là que je m'attends à trouver une timeline, pas dans une rubrique de panneau.
        Je passe en mode Animation, je m'attends à voir une ligne de temps apparaître en bas.
01:29 ▶ #7 click 180 13
01:33 💬 [4] Je regarde ce que ça donne.
01:34 ▶ #8 📷 capture
01:38 💬 [5] Je regarde.
01:38 ▶ #9 👁 image 003-capture.png
01:51 💬 Le mode Animation s'ouvre, mais la vue a remonté toute seule en haut de la page — je ne vois plus mon titre. À droite, un pavé d'explication que je ne lis pas, un bouton « Animer "Titre 2" », et en dessous un bloc « Lancer une animation depuis Titre 2 » avec « Quand : À l'entrée dans l'écran » et « Animation : Nouvelle animation (à composer) ». Le « quand » est exactement mon scroll into view, ça c'est bien. En revanche j'ai deux entrées qui ont l'air de faire la même chose et je ne vois aucune ligne de temps.
        Je prends le bloc qui a un déclencheur réglable et je clique « + Ajouter », je m'attends à ce qu'une timeline s'ouvre pour composer.
01:53 ▶ #10 click 767 293
01:56 💬 [6] Je regarde.
01:57 ▶ #11 📷 capture
02:00 💬 [7] Je regarde.
02:01 ▶ #12 👁 image 004-capture.png
02:13 💬 Là on parle : une ligne de temps est apparue, avec une durée « 1000 ms », un délai en ms, un « Quand : À l'entrée dans l'écran », une règle graduée 250 / 500 / 750 et des boutons de lecture. C'est ce que je cherchais. Il y a deux boutons en bas : « Choisir un élément » et « + Ajouter "Titre 2 « Une cuisine de… »" ».
        C'est le titre lui-même que je veux animer, donc je clique sur « + Ajouter "Titre 2" », je m'attends à voir une piste apparaître dans la ligne de temps.
02:15 ▶ #13 click 711 225
02:17 💬 [8] Je regarde.
02:18 ▶ #14 📷 capture
02:21 💬 [9] Je regarde.
02:22 ▶ #15 👁 image 005-capture.png
02:34 💬 Une piste « Titre 2 » s'est ajoutée dans la ligne de temps, avec un petit losange au départ, et en dessous une rubrique de piste : Départ 0 ms, Cible « L'élément », « Remplir avec : un préréglage… », puis « image-clé à 0 ms » — image-clé, c'est leur mot pour keyframe, je suppose. Le préréglage, je n'y touche pas, ce sont des gadgets ; je pose mes clés moi-même.
        Je fais défiler le panneau pour voir les propriétés sous « Mouvement », je m'attends à trouver opacity et transform.
02:35 ▶ #16 scroll 700 400 down
02:39 💬 [10] Où j'en suis : j'ai une ligne de temps, un déclencheur au scroll et une piste sur mon titre en neuf actions — agacement 1, c'est plutôt bien parti. Je regarde.
02:40 ▶ #17 📷 capture
02:43 💬 [11] Je regarde.
02:43 ▶ #18 👁 image 006-capture.png
02:52 💬 Parfait : l'image-clé à 0 ms a Opacité, Décalage x/y, Échelle, Rotation, Flou. C'est mon état de départ. Je veux quelque chose de sobre : le titre arrive de quelques pixels plus bas en apparaissant.
        Je mets l'opacité de départ à 0 : je double-clique dans le champ pour sélectionner la valeur.
02:53 ▶ #19 double 770 369
02:55 💬 [12] Je tape la valeur.
02:57 ▶ #20 type 0
02:59 💬 [13] Je valide avec Entrée.
03:00 ▶ #21 key Enter
03:03 💬 [14] Je vérifie que l'opacité est bien passée à 0.
03:04 ▶ #22 📷 capture
03:07 💬 [15] Je regarde.
03:08 ▶ #23 👁 image 007-capture.png
03:16 💬 L'opacité de départ affiche 0 et une pastille s'est allumée à côté. Je note quand même que la glissière à gauche du chiffre a l'air restée pleine — pas sûr de bien lire, mais ça ne colle pas avec un 0.
        Maintenant le décalage vertical de départ : je mets le titre 24 px plus bas.
03:17 ▶ #24 double 750 393
03:21 💬 [16] Je tape 24.
03:22 ▶ #25 type 24
03:25 💬 [17] Je valide.
03:25 ▶ #26 key Enter
03:28 💬 [18] Je vérifie les deux valeurs de départ.
03:29 ▶ #27 📷 capture
03:32 💬 [19] Je regarde.
03:33 ▶ #28 👁 image 008-capture.png
03:52 💬 Opacité 0 et décalage y 24 pour l'état de départ, les deux avec une pastille allumée. Il me faut maintenant une deuxième clé à la fin, avec le titre à sa place et opaque.
        Je clique tout à droite de la règle de temps pour amener la tête de lecture à 1000 ms.
03:53 ▶ #29 click 788 204
03:57 💬 [20] Où j'en suis : mon état de départ est posé, il me manque l'arrivée — agacement 1, l'outil fait ce que je lui demande pour l'instant. Je regarde où est la tête de lecture.
03:59 ▶ #30 📷 capture
04:01 💬 [21] Je regarde.
04:02 ▶ #31 👁 image 009-capture.png
04:09 💬 La tête est à 990 / 1000 ms — pas tout à fait 1000, je corrigerai. Le panneau dit « Instant 990 ms : aucune image-clé ici, réglez une propriété et elle se crée ». Bon, c'est logique.
        Je remets l'opacité à 100 pour créer la clé d'arrivée.
04:10 ▶ #32 double 765 347
04:14 💬 [22] Je tape 100.
04:15 ▶ #33 type 100
04:18 💬 [23] Je valide.
04:19 ▶ #34 key Enter
04:22 💬 [24] Je regarde si la clé s'est créée.
04:23 ▶ #35 📷 capture
04:26 💬 [25] Je regarde.
04:27 ▶ #36 👁 image 010-capture.png
04:33 💬 La clé d'arrivée s'est créée : la piste affiche maintenant une barre entre deux losanges, avec « Temps 990 ms » et « Courbe : Naturel (par défaut) ». Bon, il y a bien un réglage de courbe, je verrai ça après. Mais le décalage y affiche encore 24 à l'arrivée, donc le titre resterait en bas.
        Je remets le décalage y à 0 pour l'arrivée.
04:34 ▶ #37 double 750 370
04:37 💬 [26] Je tape 0.
04:38 ▶ #38 type 0
04:41 💬 [27] Je valide.
04:42 ▶ #39 key Enter
04:52 💬 Reste ce 990 qui traîne, ça m'agace, je veux 1000 rond. Je corrige le champ Temps de la clé.
04:53 ▶ #40 double 640 259
04:56 💬 [28] Je tape 1000.
04:56 ▶ #41 type 1000
05:00 💬 [29] Je valide.
05:01 ▶ #42 key Enter
05:05 💬 [30] Où j'en suis : deux clés posées, opacité et décalage réglés, temps recalé à 1000 — agacement 2, le seul point qui me gêne c'est que je n'ai encore rien vu bouger. Je vérifie l'état.
05:06 ▶ #43 📷 capture
05:09 💬 [31] Je regarde.
05:10 ▶ #44 👁 image 011-capture.png
05:25 💬 Le résumé confirme : « quand le titre entre dans l'écran, en 1000 ms, une seule fois », et ma clé de fin est bien à 1000. Reste la courbe, qui est sur « Naturel (par défaut) » — je veux voir ce qu'ils proposent, parce qu'une arrivée sans sortie douce, ça fait mécanique.
        J'ouvre le menu Courbe, je m'attends à une liste d'easings, et idéalement un cubic-bezier réglable.
05:26 ▶ #45 click 700 280
05:29 💬 [32] Je regarde ce que propose le menu.
05:30 ▶ #46 📷 capture
05:33 💬 [33] Je regarde.
05:34 ▶ #47 👁 image 012-capture.png
05:42 💬 La liste : Naturel, Doux (sortie), Sortie, Entrée-sortie, Entrée, Linéaire, Rebond, Par paliers, Ressort. Alors « Sortie », j'hésite : ce serait ease-out, ou la sortie de l'élément ? Je pars sur ease-out. Ce qui me manque tout de suite, c'est un cubic-bezier à régler moi-même ou un éditeur de courbe — là je n'ai qu'une liste fermée, comme dans les outils pour débutants.
        Je prends « Doux (sortie) », ça reste sobre.
05:43 ▶ #48 click 640 309
05:47 💬 [34] Je veux voir le résultat en vrai avant de rendre. J'ouvre le lien « Tester sur le site ».
05:48 ▶ #49 click 708 85
05:52 💬 [35] Je regarde ce qui s'est ouvert.
05:53 ▶ #50 📷 capture
05:56 💬 [36] Je regarde.
05:56 ▶ #51 👁 image 013-capture.png
06:07 💬 Un onglet « Aperçu du site » s'est ouvert, calé directement sur la section La maison, avec un bandeau qui dit que l'élément arrive à l'écran comme pour un visiteur. Le titre est là, opaque et à sa place — donc l'animation s'est jouée avant ma capture, je suppose, je ne vois pas le mouvement. Bonne surprise, ce bouton de test qui amène pile au bon endroit.
        Je reviens à l'onglet de l'éditeur pour laisser les choses propres.
06:08 ▶ #52 click 35 11
06:12 💬 [37] Je vérifie une dernière fois l'état de mon animation dans l'éditeur.
06:13 ▶ #53 📷 capture
06:16 💬 [38] Je regarde.
06:17 ▶ #54 👁 image 014-capture.png
06:29 💬 C'est en place : déclenchement à l'entrée dans l'écran, délai 0, durée 1000 ms, une seule fois, clé de départ à 0 (opacité 0, décalage y 24), clé de fin à 1000 (opacité 100, décalage 0), courbe « Doux (sortie) ». Le titre monte de 24 px en apparaissant quand on descend jusqu'à lui : sobre, c'est ce qu'Aurèle demandait, et je n'ai touché à rien d'autre.
        Deux réserves pour vous : je n'ai pas trouvé de courbe réglable à la main, un bezier ou un éditeur de graphe — je suis coincé dans une liste de neuf mots, et « Sortie » ou « Entrée » m'obligent à deviner de quoi on parle. Et sur la dernière image, j'ai l'impression que des pastilles se sont allumées aussi devant Échelle, Rotation et Flou, que je n'ai jamais touchés ; je n'en suis pas certain, mais si la clé enregistre des propriétés que je n'ai pas réglées, ça ne me plaît pas.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 38

### 06:59 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

07:12 💬 T1-SEQ. 6. Facile. J'ai trouvé une timeline, un déclencheur et des champs en millisecondes en moins de dix clics, ce qui est plus que ce que j'attendais. Ce n'est pas 7 parce que j'ai perdu un instant à comprendre pourquoi il y avait deux boutons qui avaient l'air de faire la même chose — « Animer Titre 2 » d'un côté, et en dessous un bloc « Lancer une animation depuis Titre 2 » avec le déclencheur — et parce que la vue a sauté toute seule en haut de la page quand je suis passé en mode Animation, alors que je venais justement de sélectionner un élément qui était en bas. Ça, c'est agaçant : on me fait perdre l'endroit où je travaille.
        T1-R. Le visiteur arrive en haut de la page, il descend. Tant que le titre « Une cuisine de produits, servie sans chichi. » n'est pas entré dans l'écran, il n'est pas visible. Au moment où il entre dans l'écran, il apparaît en une seconde : il passe de transparent à opaque en remontant de 24 pixels, donc il se met en place par le bas plutôt que d'être posé là. La courbe est une sortie douce, donc ça part franchement et ça se pose sans à-coup à la fin. Ça ne se joue qu'une fois, pas à chaque fois qu'il repasse devant. Rien d'autre ne bouge sur la page.
        Cela dit, je le dis comme je le pense : je ne l'ai pas vraiment vu. Sur mes captures je vois une image fixe, donc je décris ce que j'ai réglé, pas ce que j'ai constaté. Le bouton « Tester sur le site » m'a bien amené pile sur la section, ça c'est intelligent, mais quand j'ai regardé, l'animation était déjà finie. Il me manque un moyen de la rejouer en boucle sous les yeux, ou de faire glisser la tête de lecture et de voir l'élément suivre dans l'aperçu. Dans mon métier, on ne valide pas une animation sur des chiffres, on la valide à l'œil.

### 07:28 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

Address this before completing your current task.

07:45 💬 T1-a. Je n'ai pas vraiment décidé, c'est un réflexe. J'ai d'abord cliqué sur l'élément concerné, parce que dans tous les outils que je connais on sélectionne avant d'agir, et je voulais voir le panneau de droite se remplir pour confirmer que j'avais bien attrapé le titre et pas le bloc autour. Ensuite j'ai lu la barre du haut : Écriture, Design, Animation, Code. Il y avait un mot « Animation », l'affaire était réglée. J'ai vu qu'il y avait aussi une rubrique « Animation » repliée dans le panneau de droite, mais je suis allé vers le mode en haut, parce qu'un mode, ça veut dire un espace de travail, et un espace de travail ça veut dire une timeline en bas. Une rubrique dans un panneau, ça veut dire trois cases à cocher.
        T1-b. J'attendais une timeline par déclencheur, comme une interaction Webflow ou une composition After Effects : je choisis quand ça se lance, je pose mes clés, je règle mes courbes, je décale les départs.
        Ce que j'ai trouvé correspond, et honnêtement ça m'a surpris en bien. Il y a un vrai « Quand », et « À l'entrée dans l'écran » était déjà réglé, ce qui est exactement mon scroll into view. Il y a une durée et un délai en millisecondes, tapables au clavier. Il y a une ligne de temps graduée, avec une piste par élément, des clés qu'on pose en changeant une valeur là où est la tête de lecture, et un champ pour recaler le temps de la clé au chiffre près. Les propriétés sont les bonnes : opacité, décalage, échelle, rotation, flou. Pour une fois, on ne m'oblige pas à passer par des effets tout prêts.
        Ce que je n'ai pas trouvé, et c'est là que ça coince pour moi : pas de courbe éditable. On me donne une liste de neuf mots et c'est tout. Je ne peux pas poser un bezier, je ne peux pas ouvrir un éditeur de graphe, je ne peux pas régler un overshoot au chiffre. Il y a « Rebond » et « Ressort » dans la liste, mais si je ne peux pas régler la raideur et l'amortissement, c'est un gadget, ça fera le même rebond que sur les dix mille autres sites qui ont cliqué dessus. Et le vocabulaire me force à deviner : « Sortie », « Entrée », « Entrée-sortie » — je suppose que c'est ease-out, ease-in, ease-in-out, mais j'ai hésité, parce que « sortie » pour un élément qui arrive, ça peut aussi vouloir dire qu'il s'en va.
        L'autre manque, c'est la restitution. J'ai une timeline mais je n'ai pas vu l'élément bouger en la manipulant. Dans After Effects, je fais glisser la tête de lecture et l'image suit, c'est comme ça qu'on travaille. Ici j'ai réglé à l'aveugle et je suis allé vérifier dans un autre onglet, où c'était déjà terminé.

### 08:58 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

09:00 💬 Je regarde d'abord où on en est, je m'attends à retrouver l'éditeur sur la page d'accueil.
09:03 ▶ #55 📷 capture
09:06 💬 [1] Je regarde.
09:07 ▶ #56 👁 image 001-capture.png
09:14 💬 On est reparti de zéro, mode Écriture, la page d'accueil en haut. Je cherche la partie « les plats », plus bas dans la page.
        Je fais défiler la zone de travail vers le bas.
09:15 ▶ #57 scroll 380 400 down 8
09:19 💬 [2] Je regarde où je suis arrivé.
09:20 ▶ #58 📷 capture
09:23 💬 [3] Je regarde.
09:24 ▶ #59 👁 image 002-capture.png
09:35 💬 Voilà : « CETTE SAISON — Quelques plats signature », et en dessous trois cartes de plats. C'est de ça qu'elle parle.
        Je descends encore un peu pour voir les cartes entières.
09:36 ▶ #60 scroll 380 400 down 4
09:40 💬 [4] Je regarde.
09:41 ▶ #61 📷 capture
09:44 💬 [5] Je regarde.
09:45 ▶ #62 👁 image 003-capture.png
09:55 💬 Trois cartes : Œuf parfait, Agneau des Combrailles, Truffade revisitée. Je veux savoir ce qui est déjà réglé sur elles.
        Je sélectionne la première carte de plat.
09:56 ▶ #63 click 253 368
09:59 💬 [6] Je passe en mode Animation pour voir ce qui est réglé.
10:00 ▶ #64 click 180 13
10:04 💬 [7] Je regarde.
10:05 ▶ #65 📷 capture
10:08 💬 [8] Je regarde.
10:08 ▶ #66 👁 image 004-capture.png
10:22 💬 Tiens, le panneau dit « Animations lancées par « Carte plat » » et il y a déjà quelque chose : « Arrive avec « Plats » · Fondu en montant ». Donc l'animation existe bel et bien, on ne lui a pas menti. Reste à comprendre pourquoi elle ne se voit pas.
        Je clique sur « Voir cette animation ».
10:23 ▶ #67 click 648 198
10:27 💬 [9] Je regarde.
10:27 ▶ #68 📷 capture
10:32 💬 [10] Où j'en suis : j'ai trouvé qu'une animation existe déjà sur les plats, je vais voir son réglage — agacement 1. Je regarde.
10:32 ▶ #69 👁 image 005-capture.png
10:47 💬 Et voilà le problème, il est écrit noir sur blanc : « Quand : Au chargement », et le résumé dit « Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms ». Donc l'animation se joue à l'ouverture de la page, quand les plats sont encore à trois écrans plus bas — le temps qu'Aurèle descende, c'est terminé depuis longtemps. Elle ne voit que la fin. Faute classique, je la vois tout le temps chez les juniors sur Webflow.
        Je change le déclencheur : j'ouvre le menu « Quand ».
10:48 ▶ #70 click 618 114
10:51 💬 [11] Je regarde les choix.
10:52 ▶ #71 📷 capture
10:56 💬 [12] Je regarde.
10:56 ▶ #72 👁 image 006-capture.png
11:01 💬 Les choix : Au chargement, À l'entrée dans l'écran, Au survol, Au clic, Au défilement, À la souris. Il y a même un « Au défilement » et un « À la souris », donc du scroll progress et du mouse move — pas mal.
        Je prends « À l'entrée dans l'écran ».
11:02 ▶ #73 click 621 143
11:05 💬 [13] Je vérifie ce que dit le résumé maintenant.
11:06 ▶ #74 📷 capture
11:10 💬 [14] Je regarde.
11:10 ▶ #75 👁 image 007-capture.png
11:32 💬 Le résumé dit maintenant « Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois ». Le problème est réglé.
        Mais il y a quelque chose qui cloche : la cible dit « Ses enfants, un à un » et le résumé dit « ensemble », avec un « Décalage : aucun ». Un à un sans décalage, c'est tous en même temps — ça ne veut rien dire. Trois plats qui apparaissent d'un bloc, ça fait rideau de théâtre ; c'est le décalage qui donne la vie. C'est manifestement ce qui était prévu et qui n'a jamais été réglé.
        Je mets un échelonnement discret, 90 ms entre les cartes.
11:33 ▶ #76 double 637 375
11:36 💬 [15] Je tape 90.
11:37 ▶ #77 type 90
11:40 💬 [16] Je valide.
11:41 ▶ #78 key Enter
11:45 💬 [17] Je vérifie que le décalage a bien été pris.
11:46 ▶ #79 📷 capture
11:49 💬 [18] Je regarde.
11:50 ▶ #80 👁 image 008-capture.png
11:58 💬 Le résumé se met à jour tout seul : « Quand « Plats » entre dans l'écran : les enfants de « Plats » un à un (tous les 90 ms), fondu en montant, en 600 ms, une seule fois. » Ça, c'est exactement ce que je voulais, et la phrase en français me confirme mon réglage — c'est plutôt bien vu.
        Je vérifie en conditions de visiteur avec « Tester sur le site ».
11:59 ▶ #81 click 712 85
12:02 💬 [19] Je regarde.
12:03 ▶ #82 📷 capture
12:07 💬 [20] Où j'en suis : le bug est diagnostiqué et corrigé, j'ajoute la vérification — agacement 1, c'est allé vite. Je regarde.
12:08 ▶ #83 👁 image 009-capture.png
12:17 💬 Rien. L'écran est exactement le même, aucun onglet ne s'est ouvert — j'ai dû cliquer à côté du lien, il est noyé en fin de phrase.
        J'agrandis la zone pour viser correctement.
12:18 ▶ #84 🔍 loupe 712 85
12:21 💬 [21] Je regarde l'agrandissement.
12:22 ▶ #85 👁 image 010-loupe.png
12:42 💬 Je vois : le lien « Tester sur le site » est bien à la fin de la deuxième ligne, mais plus à droite que là où j'ai cliqué — un lien bleu collé au bout d'un paragraphe, c'est une cible minuscule.
        Je clique dessus, cette fois bien à droite.
12:43 ▶ #86 click 751 87
12:46 💬 [22] Je regarde.
12:47 ▶ #87 📷 capture
12:51 💬 [23] Je regarde.
12:51 ▶ #88 👁 image 011-capture.png
13:05 💬 L'aperçu s'ouvre pile sur la section des plats. Les trois cartes sont là, à leur place et opaques — donc l'animation s'est jouée à mon arrivée et elle est déjà finie quand je photographie ; je le suppose, je ne vois toujours pas le mouvement. Mais au moins elles ne sont ni transparentes ni coincées en bas, ce qui prouve que la séquence s'est déroulée.
        Je reviens dans l'éditeur pour laisser ça propre.
13:06 ▶ #89 click 35 11
13:09 💬 [24] Je vérifie une dernière fois l'état laissé dans l'éditeur.
13:10 ▶ #90 📷 capture
13:14 💬 [25] Je regarde.
13:15 ▶ #91 👁 image 012-capture.png
13:26 💬 C'est en place et enregistré : déclencheur « À l'entrée dans l'écran » au lieu de « Au chargement », enfants un à un avec 90 ms entre chaque, fondu en montant sur 600 ms, courbe Doux (sortie). Je n'ai touché ni au titre au-dessus ni à quoi que ce soit d'autre.
        Le diagnostic, pour Aurèle : l'animation existait depuis le début, mais elle était réglée pour se jouer au chargement de la page. Les plats étant tout en bas, ils avaient fini de bouger bien avant qu'elle n'arrive dessus. On ne lui avait pas menti, c'était juste branché sur le mauvais moment.
        Deux remarques pour vous. D'abord, l'outil m'a laissé mettre « Au chargement » sur un élément situé trois écrans plus bas sans un mot d'avertissement : c'est le piège numéro un de ce genre de réglage, et une phrase du genre « cet élément n'est pas visible au chargement » aurait évité ce ticket client. Ensuite, la même phrase de résumé affichait « les enfants un à un » alors que le décalage était à zéro, donc « ensemble » : deux informations contradictoires dans la même ligne. Et le lien « Tester sur le site » est collé en fin de paragraphe, j'ai cliqué à côté du premier coup ; un bouton de lecture bien visible près de la timeline serait plus honnête.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 25

### 13:49 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

14:05 💬 T2-SEQ. 6. Pour moi c'était facile, mais il faut préciser : facile parce que je sais ce que je cherche. Dès que j'ai vu le mot « Au chargement » dans le panneau, l'affaire était pliée — c'est l'erreur que je corrige chez mes juniors toutes les semaines. Quelqu'un qui ne connaît pas ce piège, lui, ne le verra pas : rien à l'écran ne lui dira que c'est ça le problème. Ce qui me retire un point, ce n'est donc pas le diagnostic, c'est que l'outil ne m'a pas aidé du tout à le poser, et que j'ai perdu deux clics sur un lien de test minuscule coincé au bout d'une phrase.
        T2-R. Le visiteur descend la page. Il passe la partie « La maison », il arrive sur « Quelques plats signature ». Au moment où la rangée des trois plats entre dans l'écran, les cartes apparaissent en fondu en remontant, sur 600 ms, avec une sortie douce — et pas toutes en même temps : l'Œuf parfait part en premier, l'Agneau 90 ms après, la Truffade 90 ms encore après. Ça donne une petite vague de gauche à droite, discrète. Ça ne se joue qu'une fois.
        Avant ma correction, ce que voyait Aurèle : les trois cartes faisaient leur fondu à la seconde où la page s'ouvrait, alors qu'elles étaient trois écrans plus bas et qu'elle ne pouvait pas les voir. Le temps qu'elle descende, tout était terminé et posé. D'où son impression que les plats étaient immobiles.
        Là encore, je le dis franchement : je décris mon réglage, je n'ai pas vu la vague. J'ai ouvert l'aperçu, les cartes étaient déjà en place quand j'ai regardé. Le décalage de 90 ms, il faudrait que je le voie pour juger s'il est trop court ou trop long — à l'œil je dirais que c'est bien, mais je règle ça à l'aveugle et ça ne me plaît pas. Et je n'ai pas revérifié le titre au-dessus, dont Aurèle disait qu'il bougeait déjà ; je n'y ai pas touché, donc il n'y a pas de raison, mais je ne l'ai pas constaté.

### 14:14 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

Address this before completing your current task.

14:31 💬 T2-a. L'animation était là depuis le début, correctement construite : les trois cartes en fondu en montant sur 600 ms. Le seul problème, c'est le moment. Elle était réglée sur « Au chargement », c'est-à-dire déclenchée à la seconde où la page s'ouvre. Or les plats sont à peu près trois écrans plus bas. Donc les cartes faisaient tout leur mouvement pendant qu'Aurèle regardait encore le haut de la page, sans rien voir. Six cents millisecondes plus tard, tout était fini, posé, immobile. Quand elle arrivait enfin dessus en descendant, il n'y avait plus rien à voir. Ce n'est pas qu'on lui avait menti, c'est que l'animation s'était jouée dans son dos.
        Ce que je reproche à l'outil, ce n'est pas d'avoir permis ça — Webflow le permet aussi — c'est de ne rien dire. Il sait parfaitement où est cet élément dans la page, il sait qu'il n'est pas visible au premier écran. Une phrase du genre « cet élément n'est pas à l'écran au chargement, l'animation se jouera sans témoin » au moment où je choisis ce déclencheur, et le problème n'existe plus. C'est le genre d'avertissement qui fait gagner une journée à une petite agence.
        T2-b. Je ne l'ai pas su. Je l'ai déduit, et je préfère être clair là-dessus.
        Je ne suis pas allé me mettre dans ses chaussures : je n'ai pas ouvert le site et descendu la page comme une visiteuse pour constater que rien ne bougeait. J'ai sélectionné une carte, j'ai lu le panneau, j'ai vu « Au chargement » et j'ai reconstitué la scène de tête. Sa description collait — « les plats sont déjà là, immobiles » — donc je n'ai pas cherché plus loin.
        Et honnêtement, l'outil ne me donne pas grand-chose pour faire autrement. Quand j'ai voulu vérifier, le bouton de test m'a envoyé sur un autre onglet directement à la bonne section, ce qui est bien pensé, mais l'animation était déjà terminée quand j'ai regardé. Je n'ai à aucun moment vu le mouvement, ni avant ni après ma correction. Ce qui me manque, c'est de pouvoir faire glisser la tête de lecture et voir les éléments suivre dans l'aperçu, et un bouton pour rejouer en boucle sous les yeux. Sans ça, je livre sur la foi d'une phrase de résumé. Pour un client qui regarde le soir même, ça passe. Pour valider un rythme, non.

### 14:49 · MESSAGE REÇU (segment 8)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

14:53 💬 Je regarde l'état de départ.
14:56 ▶ #92 📷 capture
14:59 💬 [1] Je regarde.
15:00 ▶ #93 👁 image 001-capture.png
15:05 💬 La pastille « Bib Gourmand · Guide 2026 » est sur la photo, et le bouton « Réserver une table » juste à gauche. Je commence par la pastille.
        Je la sélectionne.
15:06 ▶ #94 click 432 255
15:09 💬 [2] Je passe en mode Animation.
15:10 ▶ #95 click 180 13
15:14 💬 [3] Je regarde.
15:15 ▶ #96 📷 capture
15:18 💬 [4] Je regarde.
15:19 ▶ #97 👁 image 002-capture.png
15:31 💬 La pastille est sélectionnée, et le panneau liste deux animations lancées par elle : « Au chargement · Zoom · +300 ms » et « Au chargement · Pulsation · +800 ms ». Le zoom, c'est son arrivée ; la pulsation, c'est mon coupable — un truc qui bat en boucle. Il y a aussi une rubrique « Effets continus » plus bas que je vérifierai.
        Je déplie la pulsation pour confirmer qu'elle tourne bien en boucle avant de la supprimer.
15:32 ▶ #98 click 680 213
15:36 💬 [5] Je regarde.
15:37 ▶ #99 📷 capture
15:41 💬 [6] Je regarde.
15:41 ▶ #100 👁 image 003-capture.png
15:57 💬 C'est confirmé : « Au chargement de la page, après 800 ms : pulsation en 1200 ms, en boucle. » Une boucle infinie sur une pastille, évidemment que ça donne le tournis à la longue. L'arrivée, elle, c'est l'autre animation, le zoom — je n'y touche pas.
        Je supprime la pulsation avec la croix à droite de son nom.
15:58 ▶ #101 click 786 59
16:02 💬 [7] Je vérifie ce que ça a fait.
16:03 ▶ #102 📷 capture
16:06 💬 [8] Je regarde.
16:07 ▶ #103 👁 image 004-capture.png
16:14 💬 Ah non : la croix n'a rien supprimé, elle a juste refermé la vue et je me retrouve devant la liste, avec la pulsation toujours là, et la version n'a pas bougé. Deux croix qui se ressemblent et qui ne font pas la même chose, c'est le genre de détail qui fait perdre du temps.
        J'essaie la croix qui est au bout de la ligne « Pulsation » dans la liste.
16:15 ▶ #104 click 777 213
16:19 💬 [9] Je vérifie.
16:20 ▶ #105 📷 capture
16:24 💬 [10] Où j'en suis : le diagnostic est fait, je me bats avec une croix — agacement 2. Je regarde.
16:25 ▶ #106 👁 image 005-capture.png
16:33 💬 La pulsation a disparu, il ne reste que « Au chargement · Zoom · +300 ms », et la version est passée à v1. Supprimé sans me demander confirmation, au passage — heureusement qu'il y a une annulation.
        Je vérifie quand même la rubrique « Effets continus », parce que si un flottement traîne là-dedans, la pastille bougera toujours.
16:34 ▶ #107 click 640 321
16:38 💬 [11] Je regarde.
16:39 ▶ #108 📷 capture
16:42 💬 [12] Je regarde.
16:43 ▶ #109 👁 image 006-capture.png
16:49 💬 Rien dans les effets continus : parallaxe « aucune », bandeau « non ». Donc le tournis venait bien uniquement de la pulsation, et l'arrivée en zoom est intacte. Première partie réglée.
        Je passe au bouton : je sélectionne « Réserver une table ».
16:50 ▶ #110 click 76 328
16:54 💬 [13] Je regarde.
16:55 ▶ #111 📷 capture
16:59 💬 [14] Je regarde.
16:59 ▶ #112 👁 image 007-capture.png
17:09 💬 Le bouton est sélectionné et il n'a aucune animation. Il me faut un déclencheur au survol.
        J'ouvre le menu « Quand ».
17:10 ▶ #113 click 716 254
17:14 💬 [15] Je regarde.
17:15 ▶ #114 📷 capture
17:18 💬 [16] Je regarde.
17:19 ▶ #115 👁 image 008-capture.png
17:25 💬 « Au survol », c'est mon hover.
17:26 ▶ #116 click 667 296
17:30 💬 [17] J'ajoute l'animation.
17:31 ▶ #117 click 767 293
17:35 💬 [18] Je regarde.
17:36 ▶ #118 📷 capture
17:40 💬 [19] Je regarde.
17:41 ▶ #119 👁 image 009-capture.png
17:47 💬 L'animation au survol est créée, elle dit « rien ne bouge encore ». Il faut lui donner une piste.
        J'ajoute le bouton lui-même comme élément animé.
17:48 ▶ #120 click 711 225
17:53 💬 [20] Où j'en suis : la pastille est réglée, j'attaque le survol du bouton — agacement 2. Je règle d'abord la durée, 1 seconde pour un survol c'est mou.
17:54 ▶ #121 double 585 166
17:57 💬 [21] Je tape 180.
17:58 ▶ #122 type 180
18:02 💬 [22] Je valide.
18:03 ▶ #123 key Enter
18:07 💬 [23] Je regarde où j'en suis.
18:08 ▶ #124 📷 capture
18:12 💬 [24] Je regarde.
18:13 ▶ #125 👁 image 010-capture.png
18:24 💬 La piste est là, 180 ms, avec une clé au départ. Il me faut une clé à la fin qui agrandit légèrement le bouton.
        Je place la tête de lecture à la fin.
18:25 ▶ #126 click 789 204
18:29 💬 [25] Je regarde.
18:30 ▶ #127 📷 capture
18:34 💬 [26] Je regarde.
18:34 ▶ #128 👁 image 011-capture.png
18:44 💬 La tête n'a pas bougé, c'est toujours « 0 / 180 ms ». Mon clic sur la règle n'a rien pris cette fois — agaçant, ça avait marché tout à l'heure.
        Je fais glisser la tête de lecture jusqu'à la fin, comme dans After Effects.
18:46 ▶ #129 drag 624 204 786 204
18:50 💬 [27] Je regarde.
18:51 ▶ #130 📷 capture
18:55 💬 [28] Je regarde.
18:56 ▶ #131 👁 image 012-capture.png
19:03 💬 La tête est à 180 / 180 ms et le panneau me dit qu'aucune clé n'existe ici, qu'il suffit de régler une propriété. Le glisser marche, lui, et tombe pile sur la fin.
        Je fais défiler pour atteindre le réglage d'échelle.
19:04 ▶ #132 scroll 700 400 down 3
19:08 💬 [29] Je regarde.
19:09 ▶ #133 📷 capture
19:14 💬 [30] Où j'en suis : la clé de survol est prête à être posée, il me reste à régler l'échelle — agacement 2. Je regarde.
19:15 ▶ #134 👁 image 013-capture.png
19:21 💬 Le champ Échelle est là, à 1. Je mets 1,04 : un agrandissement de 4 %, à peine perceptible mais suffisant pour qu'on sente le bouton réagir.
19:22 ▶ #135 double 643 393
19:26 💬 [31] Je tape la valeur.
19:28 ▶ #136 type 1.04
19:32 💬 [32] Je valide.
19:32 ▶ #137 key Enter
19:37 💬 [33] Je vérifie que la clé s'est créée et que la valeur est prise.
19:38 ▶ #138 📷 capture
19:42 💬 [34] Je regarde.
19:42 ▶ #139 👁 image 014-capture.png
19:51 💬 Attention, le résumé dit : « Au survol de "Réserver une table" : en 180 ms, reste ainsi quand la souris part. » Donc le bouton resterait agrandi une fois la souris partie — inacceptable, un survol doit revenir. Heureusement la phrase me le dit, sinon je serais passé à côté.
        Je coche « Au départ : se coupe ».
19:52 ▶ #140 click 567 145
19:56 💬 [35] Je vérifie.
19:57 ▶ #141 📷 capture
20:01 💬 [36] Je regarde.
20:02 ▶ #142 👁 image 015-capture.png
20:19 💬 La case est cochée et son libellé a changé sous mes yeux : c'était « se coupe », c'est devenu « revient en arrière ». Le résumé dit maintenant « en 180 ms, puis revient quand la souris part ». C'est ce qu'il me faut.
        Les deux demandes d'Aurèle sont faites, enregistré en v6 :
        — la pastille : j'ai supprimé l'animation « Pulsation », qui tournait en boucle toutes les 1,2 seconde depuis le chargement de la page — c'était ça, le tournis. Son arrivée en zoom, 300 ms après l'ouverture, est intacte, je n'y ai pas touché. Les effets continus étaient vides, donc plus rien ne bouge en permanence.
        — le bouton « Réserver une table » : au survol, il grossit de 4 % en 180 ms et revient à sa taille quand la souris s'en va. Discret, c'est un bouton, pas un feu d'artifice.
        Trois choses à vous signaler. La croix en haut de l'animation dépliée ferme la vue, celle de la liste supprime l'animation : deux croix identiques, deux effets très différents, et la suppression se fait sans un mot de confirmation. Ensuite, le clic sur la règle de temps a fonctionné une fois et pas l'autre ; c'est le glisser qui m'a sauvé. Enfin, le réglage par défaut d'un survol, c'est « reste ainsi quand la souris part » : c'est le mauvais défaut, personne ne veut ça, et si la phrase de résumé ne me l'avait pas dit noir sur blanc j'aurais livré un bouton qui gonfle et ne redescend jamais. Cette phrase en français, d'ailleurs, c'est ce que l'outil fait de mieux.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 36

### 20:34 · MESSAGE REÇU (segment 9)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

20:50 💬 T5-SEQ. 5. Plus dur que les deux précédentes, mais pas à cause de la logique : la logique était limpide, deux animations listées sur la pastille, l'une s'appelle « Pulsation » et tourne en boucle, le coupable se désigne tout seul. Ce qui m'a coûté du temps, c'est la mécanique. J'ai cliqué sur une croix qui n'a fait que refermer une vue au lieu de supprimer, j'ai dû recommencer sur l'autre croix. Et la règle de temps m'a lâché : le même clic qui avait déplacé la tête de lecture dans la première mission n'a rien donné ici, j'ai dû la faire glisser à la main. Deux tâches dans une mission, ça justifie aussi le 5.
        T5-R. Deux choses.
        La pastille « Bib Gourmand · Guide 2026 », d'abord. Le visiteur ouvre la page d'accueil. Trois cents millisecondes après, la pastille arrive en zoom sur la photo, exactement comme avant — Aurèle y tenait, je n'y ai pas touché. Et ensuite, elle ne bouge plus. Avant mon intervention, huit cents millisecondes après l'ouverture, elle commençait à battre, un cycle toutes les 1,2 seconde, et ça ne s'arrêtait jamais tant qu'on était sur la page. Sur une pastille de cette taille, posée sur une photo, dans le coin de l'œil, au bout de trente secondes c'est insupportable — la cliente a parfaitement raison, et franchement, une boucle infinie sur un élément décoratif, c'est une faute de goût. Maintenant elle arrive, elle se pose, elle se tait.
        Le bouton « Réserver une table », ensuite. Quand le visiteur amène sa souris dessus, le bouton grossit de 4 % en 180 millisecondes. Quand il s'en va, le bouton revient à sa taille d'origine dans le même temps. C'est très léger — 4 %, sur un bouton de cette largeur, ça fait deux ou trois pixels — mais c'est précisément ce qu'on veut : le visiteur sent que l'élément est vivant et cliquable, sans que ça saute aux yeux. Sur un téléphone, il n'y a pas de souris, donc il ne se passera rien de spécial, et ce n'est pas grave.
        Là encore, je n'ai rien vu. Je n'ai pas passé la souris sur le bouton en conditions réelles, je n'ai pas vu la pastille se taire. Je décris mes réglages. Le 4 % et les 180 ms, c'est mon expérience qui les dicte, pas une vérification.

### 20:58 · MESSAGE REÇU (segment 10)
The coordinator sent a message while you were working:
Merci.

T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

Address this before completing your current task.

21:19 💬 T5-a. Non, elle ne bougera plus en permanence. J'en suis raisonnablement sûr, et voilà sur quoi je m'appuie.
        Il y avait deux animations listées sur la pastille. J'ai déplié la deuxième avant de toucher à quoi que ce soit, et le panneau écrivait noir sur blanc « en boucle », avec un cycle de 1 200 ms. C'est la seule chose de la page qui pouvait tourner sans fin sur cet élément. Je l'ai supprimée, et après suppression la liste ne contient plus qu'une ligne, « Au chargement · Zoom · +300 ms », qui est une animation qui se joue une fois et s'arrête.
        Ensuite, je suis allé ouvrir la rubrique « Effets continus », parce que c'est exactement le genre d'endroit où un mouvement perpétuel peut se cacher en douce sous un autre nom. Parallaxe : aucune. Bandeau : non. Rien d'actif. Donc plus rien sur cet élément ne tourne en continu.
        Ma réserve, la même que depuis le début : je ne l'ai pas constaté de mes yeux. Je le déduis de ce que le panneau affiche. Et il y a une chose que je n'ai pas vérifiée, faute de moyen simple : le zoom d'arrivée, je l'ai laissé tel quel sans le rouvrir, donc je pars du principe qu'il ne boucle pas lui non plus. Le fait qu'il s'appelle « Zoom » et pas « Pulsation », et qu'Aurèle dise qu'il lui plaît tel quel, me suffit comme indice — mais c'est un indice, pas une vérification.
        T5-b. Il amène la souris sur le bouton : le bouton grandit de 4 % en 180 millisecondes, avec une courbe naturelle, donc ça démarre et ça se pose sans à-coup. Il retire la souris : le bouton redescend à sa taille normale, dans le même temps.
        Ça, c'est le point qui aurait pu me piéger et sur lequel je veux insister. Par défaut, l'outil laissait l'élément agrandi une fois la souris partie — la phrase de résumé disait « reste ainsi quand la souris part ». C'est un très mauvais réglage par défaut : personne ne veut un bouton qui gonfle et reste gonflé pour le restant de la visite. Il a fallu que j'aille cocher une case pour obtenir le comportement normal d'un survol.
        Et cette case, elle s'appelait « se coupe ». « Se coupe », pour moi, ça veut dire que l'animation s'interrompt, donc qu'elle se fige où elle en est — c'est-à-dire exactement le contraire de ce que je cherchais. Je l'ai cochée un peu au jugé, parce que c'était la seule case disponible. Une fois cochée, son libellé est devenu « revient en arrière », qui est le mot juste. Donc la case ment tant qu'elle est décochée et dit la vérité une fois cochée. C'est un réglage important caché derrière un mot trompeur ; sans la phrase de résumé qui m'a alerté, je livrais un bouton cassé.

### 23:55 · MESSAGE REÇU (segment 11)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

23:59 💬 Je regarde l'état de départ.
24:01 ▶ #143 📷 capture
24:05 💬 [1] Je regarde.
24:05 ▶ #144 👁 image 001-capture.png
24:10 💬 Le grand titre « Le goût de l'Auvergne, sans cérémonie. » et les deux boutons juste en dessous. Je commence par le titre.
        Je le sélectionne.
24:11 ▶ #145 click 275 155
24:15 💬 [2] Je passe en mode Animation.
24:16 ▶ #146 click 180 13
24:20 💬 [3] Je regarde ce qui est réglé sur le titre.
24:21 ▶ #147 📷 capture
24:25 💬 [4] Je regarde.
24:25 ▶ #148 👁 image 002-capture.png
24:30 💬 Le titre a déjà une animation : « Au chargement · Fondu en montant ». Je la déplie pour allonger sa durée.
24:31 ▶ #149 click 690 188
24:36 💬 [5] Je regarde.
24:37 ▶ #150 📷 capture
24:41 💬 [6] Je regarde.
24:42 ▶ #151 👁 image 003-capture.png
24:55 💬 « Au chargement de la page : fondu en montant en 500 ms », clé de fin à 500, courbe Doux (sortie). Une demi-seconde, en effet c'est vif.
        Je passe la durée à 1200 ms. Et j'anticipe le piège : allonger la durée ne déplace pas ma clé de fin, elle va rester à 500 et je me retrouverai avec 700 ms de vide à la fin. Je vérifierai juste après.
24:56 ▶ #152 double 585 156
25:00 💬 [7] Je tape 1200.
25:01 ▶ #153 type 1200
25:06 💬 [8] Je valide.
25:06 ▶ #154 key Enter
25:11 💬 [9] Je vérifie ce qu'est devenue ma clé de fin.
25:12 ▶ #155 📷 capture
25:17 💬 [10] Où j'en suis : le titre est identifié et sa durée changée, je vérifie le piège de la clé — agacement 1. Je regarde.
25:17 ▶ #156 👁 image 004-capture.png
25:30 💬 Très bonne surprise : la clé de fin a suivi toute seule, elle est passée à 1200 ms. Le résumé dit « fondu en montant en 1200 ms (1,2 s) ». Le mouvement est donc réellement ralenti, pas juste rallongé dans le vide. C'est bien fait.
        Maintenant les boutons. Je sélectionne « Réserver une table ».
25:31 ▶ #157 click 72 306
25:36 💬 [11] Je regarde.
25:37 ▶ #158 📷 capture
25:41 💬 [12] Je regarde.
25:42 ▶ #159 👁 image 005-capture.png
26:03 💬 J'ai sélectionné le bouton mais la ligne de temps est restée sur l'animation du titre, avec un encart qui me dit « "Réserver une table" n'est pas dans cette animation » et me propose trois portes : voir ses animations, l'ajouter à cette animation, ou reprendre le titre pour lui. C'est bien vu, ça — mais je veux d'abord savoir ce que le bouton a déjà, sinon je vais lui coller deux arrivées.
        Je regarde ses animations existantes.
26:04 ▶ #160 click 604 276
26:09 💬 [13] Je regarde.
26:10 ▶ #161 📷 capture
26:14 💬 [14] Je regarde.
26:15 ▶ #162 👁 image 006-capture.png
26:30 💬 Chaque élément a sa propre animation au chargement, toutes avec un délai de 0 — voilà pourquoi tout part en même temps et pourquoi ça fait nerveux. Le bouton fait son fondu en 500 ms, ça me va, je ne touche qu'au moment.
        Je lui donne un délai de 1200 ms, soit juste après la fin du titre.
26:31 ▶ #163 double 736 105
26:35 💬 [15] Je tape 1200.
26:36 ▶ #164 type 1200
26:40 💬 [16] Je valide.
26:41 ▶ #165 key Enter
26:46 💬 [17] Je vérifie.
26:47 ▶ #166 📷 capture
26:51 💬 [18] Je regarde.
26:52 ▶ #167 👁 image 007-capture.png
        ⤷ File does not exist. Note: your current working directory is /Users/antoi/Code/atelier.
26:56 💬 Je me suis trompé de chemin, je reprends.
26:57 ▶ #168 👁 image 007-capture.png
        ⤷ File does not exist. Note: your current working directory is /Users/antoi/Code/atelier.
27:00 ▶ #169 👁 image 007-capture.png
27:07 💬 Le résumé confirme : « Au chargement de la page, après 1200 ms : fondu en montant en 500 ms. »
        Je passe au deuxième bouton, « Voir la carte ».
27:08 ▶ #170 click 150 306
27:12 💬 [19] Je regarde.
27:13 ▶ #171 📷 capture
27:19 💬 [20] Où j'en suis : titre ralenti, premier bouton décalé, reste le second — agacement 1. Je regarde.
27:19 ▶ #172 👁 image 008-capture.png
27:26 💬 Même chose : « Voir la carte » n'est pas dans cette animation. Je regarde les siennes.
27:27 ▶ #173 click 604 276
27:31 💬 [21] Je regarde.
27:32 ▶ #174 📷 capture
27:36 💬 [22] Je regarde.
27:37 ▶ #175 👁 image 009-capture.png
27:44 💬 Même configuration : fondu en montant en 500 ms, délai 0. Je lui mets 1320 ms, soit 120 ms après le premier bouton — les deux ne débarquent pas comme un seul bloc, ça respire.
27:45 ▶ #176 double 736 105
27:49 💬 [23] Je tape 1320.
27:50 ▶ #177 type 1320
27:55 💬 [24] Je valide.
27:56 ▶ #178 key Enter
28:00 💬 [25] Je vérifie.
28:01 ▶ #179 📷 capture
28:05 💬 [26] Je regarde.
28:06 ▶ #180 👁 image 010-capture.png
28:24 💬 C'est fait, enregistré en v3. Récapitulatif de ce que j'ai réglé :
        — le grand titre : son fondu en montant passe de 500 à 1200 ms, et bonne nouvelle, sa clé de fin a suivi automatiquement, donc c'est bien le mouvement qui ralentit et pas du vide ajouté à la fin ;
        — « Réserver une table » : délai de 1200 ms, il ne part donc qu'une fois le titre arrivé ;
        — « Voir la carte » : délai de 1320 ms, 120 ms après son voisin, pour que les deux boutons ne débarquent pas comme un seul bloc.
        Je n'ai touché à rien d'autre.
        Une remarque que je veux faire remonter à Aurèle plutôt que de décider à sa place : le petit sur-titre « Bistronomie · Clermont-Ferrand » et le paragraphe sous le titre partent toujours à zéro, comme avant. Tant que le titre montait en 500 ms, ça se tenait ; maintenant qu'il met 1,2 seconde, ces deux-là seront arrivés bien avant lui. Elle m'a dit de ne pas toucher au reste, donc je n'y touche pas, mais elle devrait regarder ce point demain avec son associé : si elle trouve ça bancal, c'est deux champs de délai à changer, cinq minutes.
        Et je répète ma réserve habituelle : je n'ai rien vu se jouer. Un enchaînement de départs, ça se juge à l'œil, et l'outil ne me le montre pas.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 26

### 29:13 · MESSAGE REÇU (segment 12)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

29:32 💬 T3-SEQ. 6. Celle-là était la plus confortable des trois, parce qu'elle ne demandait que des chiffres et que les chiffres, cet outil les donne : une durée, un délai, tapables au clavier. J'ai fait la mission en vingt-six actions sans jamais me demander où cliquer.
        Le point qui m'a fait plaisir, et je le dis parce que je râle souvent : quand j'ai passé la durée du titre de 500 à 1200 ms, la clé de fin a suivi toute seule. C'est exactement le comportement qu'on attend, et c'est loin d'être évident — beaucoup d'outils vous laissent avec une clé à 500 et 700 ms de vide au bout, et vous livrez une animation qui n'est pas plus lente, juste plus longue. Je m'attendais à devoir corriger, je n'ai pas eu à le faire.
        Ce qui m'enlève un point : l'ergonomie de la sélection. Quand je clique sur un autre élément, la ligne de temps reste obstinément sur l'animation précédente et m'affiche un encart « cet élément n'est pas dans cette animation » avec trois choix. C'est bien pensé sur le fond, mais ça fait un clic de plus à chaque élément, et pendant une seconde on ne sait plus ce qu'on regarde.
        T3-R. Le visiteur ouvre la page d'accueil. Le grand titre « Le goût de l'Auvergne, sans cérémonie. » monte en fondu pendant 1,2 seconde, avec une sortie douce, donc il avance franchement puis se pose sans à-coup. Deux fois plus lent qu'avant : c'est posé, ça a de l'allure, ça ne donne plus l'impression que la page vous saute au visage.
        Une fois le titre arrivé, à 1,2 seconde, le bouton « Réserver une table » fait son propre fondu en montant sur 500 ms. Et 120 millisecondes plus tard, « Voir la carte » fait le sien. Donc les deux boutons ne tombent pas ensemble comme un bloc, il y a une petite vague de gauche à droite. Tout est terminé aux alentours de 1,8 seconde.
        Ce qui n'a pas changé, et qu'elle doit regarder : le petit sur-titre au-dessus et le paragraphe en dessous partent toujours à zéro. Ils seront donc en place avant le grand titre, ce qui est un peu à l'envers. Avant, avec un titre à 500 ms, ça ne se voyait pas ; maintenant, ça se verra. Elle m'a dit de ne pas y toucher, je n'y ai pas touché, mais c'est le genre de chose qui peut lui sauter aux yeux demain matin devant son associé.
        Et je le redis une dernière fois : je décris un réglage, pas un constat. Je n'ai pas vu la page se charger. Un enchaînement de départs à 0, 1200 et 1320 ms, ça se juge à l'œil, pas sur un tableau de chiffres, et c'est précisément ce que l'outil ne me permet pas de faire.

### 29:43 · MESSAGE REÇU (segment 13)
The coordinator sent a message while you were working:
Merci.

T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

Address this before completing your current task.

30:03 💬 T3-a. Environ 1,8 seconde. Le détail : le titre part à zéro et finit à 1 200 ms. Le premier bouton démarre à 1 200 et met 500 ms, donc il est en place à 1 700. Le second démarre à 1 320 et met 500 ms, donc à 1 820. Disons 1,8 seconde pour que tout soit posé.
        C'est un chiffre que je surveille, parce qu'il y a une limite. En dessous de deux secondes, ça reste une entrée en matière élégante. Au-delà, le visiteur a déjà commencé à scroller ou à bouger la souris et il trouve le site lent — pire, sur mobile, il pense que ça rame. Là on est juste sous la limite, c'est bien calibré. Si Aurèle me demandait encore plus lent, je refuserais, ou alors il faudrait raccourcir le fondu des boutons pour compenser.
        Une précision : ce 1,8 seconde, c'est à partir du moment où l'animation se déclenche, pas du moment où elle clique sur le lien. Le temps de chargement de la page s'ajoute par-dessus. Sur une connexion moyenne avec ces grandes photos, ça peut vite faire trois secondes entre le clic et le site enfin en place. Ça, je ne le maîtrise pas depuis ce panneau.
        T3-b. Je ne l'ai pas jugé. Je l'ai décidé, ce qui n'est pas pareil, et je préfère le dire franchement.
        J'ai lu 500 ms, j'ai su immédiatement que c'était trop vif pour un grand titre — à cette taille, un demi-seconde, c'est un claquement. J'ai tapé 1200 parce que vingt ans de métier me disent qu'un titre de cette ampleur respire entre une seconde et une seconde et demie, et qu'au-delà ça devient prétentieux. C'est un réflexe, pas une observation.
        Ce que j'aurais dû faire, et que je n'ai pas pu faire : regarder. Poser 1200, regarder, essayer 900, regarder, comparer. C'est comme ça qu'on règle un timing, par allers-retours, à l'œil, en dix secondes. Ici, chaque essai me coûterait un aller-retour dans un autre onglet où j'arriverais systématiquement après la fin de l'animation. Donc je n'ai pas essayé, j'ai appliqué un chiffre de mémoire.
        Ça marchera, je n'ai pas d'inquiétude. Mais c'est du travail à l'aveugle, et pour être honnête, un DA qui règle une animation sans la voir, ce n'est pas du métier, c'est de la comptabilité. S'il y a une chose à retenir de ma séance, c'est celle-là : donnez-moi un bouton qui rejoue l'animation en boucle sous mes yeux, et une tête de lecture qui entraîne l'élément dans l'aperçu quand je la fais glisser. Tout le reste est déjà mieux que ce que j'attendais.

### 30:27 · MESSAGE REÇU (segment 14)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

30:48 💬 Une vraie petite composition, avec des départs décalés et un dépassement sur les chiffres. C'est mon métier, mais ça fait beaucoup d'éléments : je vais devoir être efficace.
        Je regarde l'état de départ.
30:50 ▶ #181 📷 capture
30:55 💬 [1] Je regarde.
30:55 ▶ #182 👁 image 001-capture.png
31:13 💬 La partie « La maison » est en bas de l'écran : photo à gauche, titre, paragraphe, et les trois chiffres en dessous. Je veux une seule scène lancée par la section elle-même, avec des départs décalés — une composition, en somme.
        Je sélectionne d'abord le titre pour atteindre la section par le fil en haut.
31:13 ▶ #183 click 480 453
31:18 💬 [2] Je passe en mode Animation.
31:19 ▶ #184 click 180 13
31:24 💬 [3] Je regarde.
31:25 ▶ #185 📷 capture
31:29 💬 [4] Je regarde.
31:30 ▶ #186 👁 image 002-capture.png
31:42 💬 La vue a encore sauté tout en haut de la page — à chaque passage en mode Animation, je perds l'endroit où je travaille, c'est pénible. Le fil en haut à droite est tronqué mais je vois « maison › Contenu › Texte › Titre 2 ».
        Je remonte à la section « La maison » par le fil, pour que ce soit elle qui lance la scène.
31:43 ▶ #187 click 620 35
31:47 💬 [5] Je regarde.
31:48 ▶ #188 📷 capture
31:53 💬 [6] Je regarde.
31:54 ▶ #189 👁 image 003-capture.png
32:01 💬 La section « La maison » est sélectionnée et la vue s'est enfin calée dessus : je vois la photo, le titre, le paragraphe et les trois chiffres. C'est ma scène.
        Je crée l'animation lancée par la section à l'entrée dans l'écran.
32:02 ▶ #190 click 767 286
32:07 💬 [7] Je regarde.
32:08 ▶ #191 📷 capture
32:11 💬 [8] Je regarde.
32:12 ▶ #192 👁 image 004-capture.png
32:31 💬 L'animation est créée, lancée par la section à l'entrée dans l'écran, et la case « Rejouer une seule fois » est décochée — donc elle rejouera à chaque fois qu'on revient, c'est ce qu'Aurèle demande. Je vérifierai la phrase de résumé à la fin.
        Je règle d'abord la durée totale de la scène à 2500 ms.
32:33 ▶ #193 double 585 166
32:37 💬 [9] Je tape 2500.
32:38 ▶ #194 type 2500
32:44 💬 [10] Où j'en suis : la scène est créée et calibrée à 2,5 s, je dois maintenant y poser quatre pistes — agacement 1, mais je surveille mon temps. Je valide.
32:45 ▶ #195 key Enter
32:52 💬 Première piste : la photo de la salle. J'utilise « Choisir un élément ».
32:53 ▶ #196 click 602 225
32:57 💬 [11] Je clique sur la photo de la salle dans la page.
32:58 ▶ #197 click 155 270
33:02 💬 [12] Je regarde.
33:03 ▶ #198 📷 capture
33:08 💬 [13] Je regarde.
33:09 ▶ #199 👁 image 005-capture.png
33:18 💬 La piste « Photo de la salle » est en place, départ 0. Pour aller vite, je vais céder et regarder les préréglages — normalement je compose moi-même, mais j'ai quatre pistes à poser et je ne veux pas y passer la nuit.
        J'ouvre « Remplir avec ».
33:19 ▶ #200 click 700 377
33:24 💬 [14] Je regarde les choix.
33:25 ▶ #201 📷 capture
33:30 💬 [15] Je regarde.
33:30 ▶ #202 👁 image 006-capture.png
33:39 💬 Il y a un catalogue : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond, et deux pour le survol. Tiens, « Montée avec rebond » — voilà mon dépassement pour les chiffres, je le garde en tête.
        Pour la photo, qui est à gauche : « Glissé depuis la gauche ».
33:40 ▶ #203 click 663 289
33:50 💬 Je regarde ce que le préréglage a posé, notamment où il a mis la clé de fin.
33:51 ▶ #204 📷 capture
33:56 💬 [17] Je regarde.
33:57 ▶ #205 👁 image 007-capture.png
34:32 💬 Très bonne surprise : le préréglage a posé une durée de 700 ms pour le glissé, pas 2500 — l'outil comprend qu'une piste dans une scène n'occupe pas toute la scène. Et je vois que la photo a disparu de l'aperçu : c'est parce que la tête de lecture est à 0 et que l'aperçu montre l'état à cet instant. Donc l'aperçu suit bien la tête de lecture, contrairement à ce que je pensais depuis le début.
        Deuxième piste : le titre, qui part après la photo.
34:33 ▶ #206 click 602 240
34:37 💬 [18] Je clique sur le titre.
34:38 ▶ #207 click 395 218
34:42 💬 [19] Je règle son départ à 700 ms, juste après la photo.
34:43 ▶ #208 double 640 335
34:48 💬 [20] Où j'en suis : deux pistes sur quatre, je dois tenir le budget — agacement 2. Je tape le départ.
34:49 ▶ #209 type 700
34:54 💬 [21] Je valide.
34:55 ▶ #210 key Enter
34:59 💬 [22] Je vérifie vite que la piste est bien celle du titre avant d'aller plus loin.
35:00 ▶ #211 📷 capture
35:04 💬 [23] Je regarde.
35:05 ▶ #212 👁 image 008-capture.png
35:31 💬 La piste du titre est créée mais mon 700 n'est pas passé : le champ Départ affiche toujours 0, la disposition avait bougé de quelques pixels. Je recommence au bon endroit.
35:32 ▶ #213 double 640 360
35:36 💬 [24] Je tape 700.
35:37 ▶ #214 type 700
35:42 💬 [25] Je valide.
35:43 ▶ #215 key Enter
35:48 💬 [26] J'ouvre le menu des préréglages pour le titre.
35:49 ▶ #216 click 700 402
35:54 💬 [27] Je regarde où s'est ouvert le menu.
35:55 ▶ #217 📷 capture
35:59 💬 [28] Je regarde.
36:00 ▶ #218 👁 image 009-capture.png
36:14 💬 « Fondu en montant » pour le titre, qui s'élève légèrement.
36:15 ▶ #219 click 663 276
36:20 💬 [29] Il me reste peu de budget, je vais droit aux trois chiffres, qui sont le morceau de bravoure. Je choisis leur conteneur.
36:21 ▶ #220 click 602 265
36:27 💬 [30] Où j'en suis : trois pistes posées sur quatre prévues, budget presque épuisé — agacement 3. Je clique entre les chiffres pour attraper leur groupe.
36:28 ▶ #221 click 350 322
36:34 💬 [31] Je vérifie ce que j'ai attrapé, je ne peux pas me permettre de me tromper là-dessus.
36:35 ▶ #222 📷 capture
36:39 💬 [32] Je regarde.
36:40 ▶ #223 👁 image 010-capture.png
37:04 💬 J'ai attrapé « Années », c'est-à-dire le premier bloc chiffre seulement, pas le groupe des trois. Et je vois au passage que la piste du titre va bien de 700 à 1400 ms, donc l'enchaînement photo puis titre est en place.
        Il me reste très peu de budget. Je pose au moins le départ et le rebond sur ce premier chiffre.
37:06 ▶ #224 double 640 385
37:11 💬 [33] Je tape 1600.
37:12 ▶ #225 type 1600
37:16 💬 [34] Je valide.
37:17 ▶ #226 key Enter
37:22 💬 [35] J'ouvre les préréglages pour lui donner le dépassement.
37:23 ▶ #227 click 700 427
37:28 💬 [36] Je regarde où est « Montée avec rebond ».
37:29 ▶ #228 📷 capture
37:33 💬 [37] Je regarde.
37:33 ▶ #229 👁 image 011-capture.png
37:38 💬 « Montée avec rebond » : c'est mon dépassement.
37:39 ▶ #230 click 668 374
37:44 💬 [38] Je fais un dernier contrôle de l'état laissé.
37:45 ▶ #231 📷 capture
37:50 💬 [39] Je regarde.
37:51 ▶ #232 👁 image 012-capture.png
38:17 💬 Je m'arrête là, je suis au bout du temps imparti, et je préfère vous dire précisément ce qui est livré et ce qui ne l'est pas.
        Ce qui est en place, dans une seule scène lancée quand la section « La maison » entre dans l'écran, sur 2,5 secondes :
        — la photo de la salle glisse depuis la gauche, de 0 à 700 ms ;
        — le titre s'élève en fondu, de 700 à 1400 ms ;
        — le premier chiffre, « 12 · années de service », monte avec rebond de 1600 à 2400 ms — c'est bien le dépassement puis le retour à sa place qu'elle demandait.
        Ce qui manque, et qu'il ne faut pas livrer en l'état à la réouverture : le paragraphe n'est pas animé, il restera simplement en place ; et surtout, seuls un chiffre sur trois bouge. Les deux autres, « 38 » et « 14 », resteront immobiles pendant que le premier rebondit. C'est pire que rien, visuellement : il faut soit finir, soit retirer le rebond du premier.
        Pourquoi je n'ai pas fini : chaque piste me coûte six à huit manipulations, et surtout, quand j'ai voulu attraper les trois chiffres d'un coup, j'ai attrapé le premier bloc seulement. Il y a pourtant une cible « ses enfants, un à un » avec un décalage, que j'ai vue ailleurs et qui aurait fait les trois en une fois — encore fallait-il pouvoir désigner leur groupe, et en cliquant dans la page on tombe toujours sur un enfant, jamais sur le parent. C'est le vrai point dur de cette mission : il n'y a pas d'arborescence à côté de la ligne de temps pour choisir un calque par son nom. Dans After Effects, mes calques sont listés, je clique dans la liste, je ne joue pas à viser dans l'image.
        Deux autres réserves. Le résumé se termine par « une seule fois », alors qu'Aurèle veut que la scène rejoue à chaque retour ; la case « Rejouer une seule fois » est pourtant décochée. Il y a deux réglages différents qui emploient les mêmes mots et je ne sais pas lequel commande quoi — je n'ai pas eu le temps de trancher, c'est à vérifier absolument. Et la photo apparaît absente dans l'éditeur en ce moment : c'est parce que la tête de lecture est restée à 0 et que l'aperçu montre l'instant courant. Rien n'est cassé, mais Aurèle va s'inquiéter en ouvrant.
        FIN : budget
        ACTIONS : 39

### 38:50 · MESSAGE REÇU (segment 15)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

39:12 💬 T4-SEQ. 3. Difficile, et pour une raison précise : ce n'est pas la logique qui m'a arrêté, c'est le coût de chaque geste. Le modèle est bon — une scène, des pistes, des départs décalés, c'est exactement ma façon de travailler. Mais poser une piste me coûte six à huit manipulations : ouvrir le choix d'élément, viser dans la page, taper un départ, ouvrir un menu, choisir. Multipliez par les six éléments que voulait Aurèle, et vous comprenez pourquoi je n'ai pas fini. Dans After Effects, j'aurais fait cette scène en trois minutes.
        Et le point de blocage précis : je n'ai aucun moyen de désigner un groupe. Je voulais les trois chiffres ensemble, pour leur appliquer un échelonnement d'un coup — la fonction existe, je l'ai vue ailleurs, « ses enfants, un à un » avec un décalage en millisecondes. Mais pour l'utiliser il faut pouvoir attraper le parent, et en cliquant dans la page on tombe toujours sur un enfant. Il n'y a pas de liste de calques à côté de la ligne de temps. C'est ça qui manque, et c'est ça qui m'a coûté la mission.
        T4-R. Ce qui se passera réellement, en l'état, quand le visiteur descend jusqu'à la partie « La maison » :
        La photo de la salle glisse depuis la gauche et se met en place, de 0 à 700 ms. Puis le titre « Une cuisine de produits, servie sans chichi » s'élève en fondu, de 700 à 1400 ms. Ensuite, rien pendant 200 ms. Puis le premier chiffre, « 12 · années de service », monte en dépassant légèrement sa place avant de revenir s'y poser, de 1600 à 2400 ms. Tout est fini à 2,4 secondes, dans l'enveloppe demandée.
        Mais — et c'est là que je ne suis pas content — le paragraphe entre le titre et les chiffres ne bouge pas, il sera là dès le début. Et surtout, pendant que le « 12 » fait son joli rebond, le « 38 » et le « 14 » à côté restent plantés là, immobiles, déjà visibles. Un chiffre sur trois qui s'anime, c'est pire qu'aucun : ça ne ressemble pas à un effet, ça ressemble à un bug. Si on livrait ça demain matin, l'associé d'Aurèle demanderait ce qui ne va pas.
        Donc la réponse honnête : ce que verra le visiteur, c'est une scène qui commence bien et qui s'arrête au milieu. En l'état, il faut soit finir les deux autres chiffres et le paragraphe, soit retirer le rebond du premier chiffre pour que l'ensemble reste cohérent. Je pencherais pour retirer, si on manque de temps : mieux vaut trois chiffres immobiles que trois chiffres dépareillés.
        Deux choses que je n'ai pas pu vérifier et qui doivent l'être avant la réouverture. La phrase de résumé se termine par « une seule fois », alors qu'Aurèle veut que la scène rejoue à chaque retour du visiteur. Il y a deux réglages qui emploient les mêmes mots — une case « Rejouer une seule fois » et un menu « Une fois » — et je ne sais pas lequel gouverne quoi. Et la photo apparaît absente dans l'éditeur en ce moment, simplement parce que la tête de lecture est restée à zéro : rien n'est cassé, mais il faut prévenir Aurèle, sinon elle va ouvrir sa page ce soir et croire qu'on a effacé sa photo.

### 39:22 · MESSAGE REÇU (segment 16)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

39:46 💬 T4-a. Il y a un malentendu à lever d'abord, et je le dirais à Aurèle avant de toucher quoi que ce soit : le paragraphe n'arrive pas du tout. Il n'est pas dans la scène, je n'ai pas eu le temps de lui poser sa piste. Donc « plus tôt » ne veut rien dire — il est déjà là depuis le début, immobile, et on ne peut pas faire arriver plus tôt quelque chose qui n'arrive jamais. C'est typiquement le genre de quiproquo qu'on a avec un client : elle voit une scène qui se déroule, elle suppose que tout le monde y participe.
        Ce que je ferais, concrètement : je sélectionne la scène, je clique « Choisir un élément », je vise le paragraphe dans la page, ce qui me crée une piste à son nom. Je tape un départ — disons 1100 ms, pour qu'il commence à se dévoiler pendant que le titre finit de se poser, ça évite le trou que j'ai laissé. Et je lui applique le préréglage « Fondu », qui est le plus discret : un paragraphe, ça ne doit pas faire de gymnastique, ça se révèle et c'est tout. Cinq ou six manipulations.
        Si en revanche elle voulait dire que le titre arrive trop tard et qu'elle veut tout ramener vers l'avant, là c'est différent et c'est très simple : chaque piste a un champ « Départ » en millisecondes, je change les chiffres et je décale l'ensemble. C'est la partie que cet outil fait bien.
        T4-b. Deux choses, très inégales.
        La plus coûteuse, de loin : viser les éléments. Pour chaque piste, il faut activer « Choisir un élément » puis aller cliquer dans la page. Ça veut dire que je dois retrouver l'élément à l'œil, cliquer au bon endroit, et espérer. Deux fois ça m'a coûté cher : une fois j'ai tapé un départ dans le vide parce que le panneau s'était décalé de vingt-cinq pixels entre deux pistes, et il a fallu tout refaire ; et une fois j'ai voulu attraper le groupe des trois chiffres et j'ai attrapé le premier bloc. C'est ce deuxième raté qui a tué la mission, parce que sans le groupe je ne peux pas utiliser l'échelonnement et je dois poser trois pistes au lieu d'une.
        Ce qu'il manque, c'est évident : une liste des éléments à gauche de la ligne de temps, avec leurs noms et leur hiérarchie, où je clique pour ajouter un calque. Tous les outils de motion ont ça, et ce n'est pas un luxe de confort, c'est la condition pour construire une scène à plus de deux éléments. Viser dans l'image, ça marche pour un bouton isolé ; ça ne marche pas pour composer.
        La deuxième chose, plus sourde : l'absence de retour visuel. Chaque fois que je pose un départ, je devrais pouvoir faire glisser la tête de lecture et voir la scène se dérouler pour juger si 700 ms puis 1400 ms, ça respire ou ça traîne. Je me suis aperçu tard, presque par accident, que l'aperçu suit bien la tête de lecture — quand la photo a disparu à l'instant zéro, j'ai compris. Si je l'avais su au début, j'aurais travaillé autrement et probablement plus vite. Personne ne me l'a dit, il n'y a rien à l'écran qui le signale, et un bouton « lecture » bien visible sur la ligne de temps aurait suffi.

### 39:57 · MESSAGE REÇU (segment 17)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

40:30 💬 D-FIN-1. Je dirais à mon associé : « J'ai testé un truc qui pourrait remplacer Webflow sur les petits clients, et contre toute attente, la partie animation tient la route. »
        Je m'attendais à une bibliothèque d'effets à cliquer, le genre d'outil où on choisit « fade in » dans une liste et on n'a plus rien à dire. J'ai trouvé une vraie ligne de temps, avec des durées et des délais en millisecondes qu'on tape au clavier, des pistes par élément, des départs décalés, des clés qu'on pose en changeant une valeur là où est la tête de lecture. C'est un modèle de composition, pas un catalogue. Pour un junior qui sort d'école, c'est assimilable en une journée, et c'est exactement ce que je cherche.
        Ce que je lui dirais ensuite, c'est que ça reste un outil de réglage, pas un outil de travail. En cinq missions et deux cents et quelques manipulations, je n'ai jamais vu une seule animation se jouer. Pas une. J'ai livré cinq réglages à l'aveugle, sur la foi de mon expérience et d'une phrase de résumé en français. Ça marchera — mais je n'ai rien validé, j'ai calculé. Pour un directeur artistique, c'est un défaut rédhibitoire tant que ce n'est pas corrigé.
        Et je lui dirais que dès qu'on passe à plus de deux éléments, ça coince. La dernière mission, une petite scène en quatre temps, je ne l'ai pas finie. Pas par incompréhension : par lenteur de manipulation.
        D-FIN-2. Deux choses, et il faut les citer parce qu'elles sont vraiment bien faites.
        D'abord, la phrase de résumé en français au-dessus de chaque animation. « Quand "Plats" entre dans l'écran : les enfants de "Plats" un à un, tous les 90 ms, fondu en montant, en 600 ms. » C'est limpide, ça se met à jour tout seul, et ça m'a sauvé deux fois. La première quand elle m'a dit « reste ainsi quand la souris part » : sans ça je livrais un bouton qui gonfle et ne redescend jamais. La deuxième quand elle m'a montré « ensemble » alors que le menu affichait « un à un ». Cette phrase, c'est la meilleure idée de l'outil. Je n'ai vu ça nulle part ailleurs.
        Ensuite, le modèle lui-même : un « Quand », un « Quoi qui bouge », un « Comment ». Les six déclencheurs couvrent tout ce dont j'ai besoin, y compris le scroll progress et le mouse move. Et le comportement quand j'ai allongé la durée du titre de 500 à 1200 ms : les clés ont suivi. Beaucoup d'outils vous laissent avec du vide au bout. Là, c'était juste.
        D-FIN-3. Le manque de contrôle sur les courbes, en premier. J'ai une liste fermée de neuf mots — « Sortie », « Entrée », « Rebond », « Ressort ». Je ne peux pas poser un bezier, je n'ai pas d'éditeur de graphe, je ne peux pas régler la raideur d'un ressort ni l'amplitude d'un dépassement. Or c'est exactement là que se joue la différence entre une animation qui a une signature et une animation qui ressemble à celle de tout le monde. On me vend un outil de composition avec des courbes de préréglage : c'est incohérent. Et les mots eux-mêmes m'obligent à deviner — « Sortie » pour un élément qui arrive, j'ai hésité.
        Ensuite, l'absence de liste de calques. Pour ajouter un élément à une scène, il faut le viser à la souris dans la page. Ça marche pour un bouton isolé ; ça ne marche plus dès qu'on veut un groupe. J'ai voulu attraper les trois chiffres ensemble, j'ai attrapé le premier, et c'est ça qui m'a fait rater la dernière mission. La fonction d'échelonnement existe pourtant et elle est bonne.
        Et puis une série de petites trahisons qui, mises bout à bout, usent. La case qui s'appelle « se coupe » tant qu'elle est décochée et « revient en arrière » une fois cochée, c'est-à-dire qui ment dans l'état où on la découvre. Deux croix identiques dont l'une ferme et l'autre supprime — sans confirmation. Deux réglages différents qui emploient tous les deux les mots « une fois », si bien que je suis reparti de la dernière mission sans savoir si la scène rejouerait ou pas. Un clic sur la règle de temps qui déplace la tête de lecture une fois sur deux. Et la vue qui saute en haut de la page chaque fois que j'entre en mode Animation, alors que je viens précisément de sélectionner un élément qui est en bas.
        Mais s'il ne fallait retenir qu'une chose, c'est celle-là : donnez-moi un bouton qui rejoue la scène en boucle sous mes yeux, et une tête de lecture qui entraîne les éléments dans l'aperçu quand je la fais glisser. Je l'ai découvert par hasard à la toute fin, quand une photo a disparu à l'instant zéro — l'aperçu suit la tête de lecture, en fait. Personne ne me l'a dit, rien ne le signale. Si je l'avais su dès la première mission, j'aurais travaillé complètement autrement.

### 40:43 · MESSAGE REÇU (segment 18)
The coordinator sent a message while you were working:
Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

40:45 💬 You've hit your session limit · resets 10:50pm (Europe/Paris)

### 948:05 · MESSAGE REÇU (segment 19)
The coordinator sent a message while you were working:
(Note du dispositif, hors séance : une interruption technique, indépendante de vous, a coupé la liaison pendant quelques minutes. Nous reprenons le débriefing.)

Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

948:44 💬 D-FIN-4. Ce que je ferais, seul chez moi : exactement ce que j'ai fait aujourd'hui, mais dans l'ordre inverse. Je commencerais par sélectionner un élément, cliquer sur « Animer », poser une piste et faire glisser la tête de lecture pour voir l'élément bouger dans l'aperçu — maintenant que je sais que ça marche. Ça change tout. Ensuite je réglerais mes durées et mes délais en chiffres, et je me servirais des préréglages comme point de départ, quitte à ouvrir les valeurs derrière pour les corriger. C'est ce que j'ai fini par faire dans la dernière mission, et c'est honnêtement plus rapide que de poser deux clés à la main.
        Ce que je ne ferais pas : je ne livrerais rien à un client sans être allé le voir dans l'onglet d'aperçu, en rechargeant la page. J'ai réglé cinq animations aujourd'hui sans jamais en voir une seule se jouer en conditions réelles, et ça me met mal à l'aise. Je ne toucherais pas non plus aux effets continus sans une bonne raison — la pastille qui pulsait en boucle, c'est exactement le piège où tombe quelqu'un qui clique pour voir.
        Et je ne construirais pas de scène à plus de trois éléments. Pas avant qu'il y ait une liste de calques. Aujourd'hui j'ai essayé, j'ai perdu.
        D-FIN-5. Oui, plusieurs, et pas seulement du jargon.
        « Image-clé ». J'ai hésité une fois puis j'ai traduit : keyframe. C'était juste, et le mot est correct en français, c'est simplement que je n'ai jamais travaillé qu'en anglais. Pareil pour « courbe », qui veut dire easing.
        « Sortie », « Entrée », « Entrée-sortie », dans la liste des courbes. Là j'ai vraiment hésité. Pour moi « sortie » sur un élément qui arrive, ça pouvait vouloir dire la façon dont il s'en va. J'ai parié sur ease-out, et je crois avoir eu raison, mais c'est un pari.
        « Décalage », dans le réglage des enfants. J'ai compris stagger, l'échelonnement entre les éléments d'une série. Ce qui m'a troublé, c'est qu'il y a un autre « Décalage » ailleurs, dans les propriétés de mouvement, qui veut dire le déplacement en x et y. Deux choses complètement différentes sous le même mot, dans le même panneau.
        « Se coupe », sur le survol. Celui-là, je l'ai mal compris, et c'est le plus grave. Pour moi « se couper » veut dire s'interrompre, donc rester figé où on en est. J'ai coché la case un peu au hasard, parce que c'était la seule disponible — et une fois cochée elle s'est renommée « revient en arrière », qui est le mot juste. Donc le libellé dit le contraire de ce que fait la case, tant qu'on ne l'a pas cochée.
        « Une fois ». Il y a une case « Rejouer une seule fois » et un menu qui affiche « Une fois », et je n'ai jamais su lequel commandait quoi. Je suis reparti de la dernière mission sans savoir si la scène d'Aurèle rejouera quand un visiteur revient dessus, alors que c'était explicitement sa demande. C'est le mot qui m'a le plus coûté.
        Et j'ajoute deux mots que j'ai vus passer sans les comprendre, mais que je n'ai pas eu besoin d'ouvrir : « Netteté » dans les préréglages — je suppose un flou qui se résorbe — et « Bandeau » dans les effets continus, dont je n'ai aucune idée.
        D-FIN-6. Pour mon travail, il y a une place, et elle est précise.
        Sur nos petits clients — restaurants, commerces, les sites à quelques milliers d'euros — Webflow nous coûte cher en abonnement et surtout en formation. Nos juniors mettent des semaines à être autonomes sur les Interactions. Ce que j'ai vu aujourd'hui est plus simple à expliquer : un « Quand », un « Quoi », un « Comment », et une phrase en français qui dit ce que ça va faire. Je pense qu'un junior est opérationnel là-dessus en une journée. Ça, c'est une vraie économie pour une agence de quatre personnes.
        Ce que ça ne remplacera pas, en l'état : notre travail de signature. Les projets où le mouvement est l'argument de vente, où je passe une journée dans l'éditeur de graphes à régler un rebond au centième, où la direction artistique tient dans la courbe et pas dans l'effet. Pour ça il me faut des beziers éditables et des ressorts réglables, et je ne les ai pas. Tant que j'ai neuf mots dans une liste, je fais la même chose que tout le monde, et je ne peux pas facturer ça.
        Donc, concrètement : je le mettrais en test sur un vrai projet dès maintenant, un petit restaurant, pour voir comment il tient sur la durée. Je ne migrerais pas nos clients existants. Et les deux choses qui décideraient de la suite, c'est le retour visuel — un bouton qui rejoue la scène sous mes yeux — et une liste d'éléments à côté de la ligne de temps. Ce sont deux ajouts, pas deux refontes. Le reste de la charpente est déjà bonne, et franchement, je ne m'attendais pas à dire ça en arrivant ce matin.

### 949:03 · MESSAGE REÇU (segment 20)
The coordinator sent a message while you were working:
Merci.

D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

949:46 💬 D-FIN-7. Le moment où je me suis dit que ça valait la peine, c'est très tôt : première mission, quand j'ai cliqué sur « Ajouter » et qu'une ligne de temps graduée est apparue, avec une durée et un délai en millisecondes tapables au clavier. J'étais prêt à refermer. Je m'attendais à une liste d'effets à cocher, j'ai trouvé un modèle de composition. Et le « Quand » était déjà sur « À l'entrée dans l'écran », c'est-à-dire mon scroll into view, sans que j'aie rien à chercher.
        Le deuxième bon moment, c'est la mission sur le titre lent : j'ai fait passer la durée de 500 à 1200 ms en m'attendant à devoir aller recaler ma clé de fin à la main, et elle avait suivi toute seule. Ça, c'est un détail que seuls des gens qui font du motion peuvent avoir pensé à mettre. Ça m'a dit qu'il y avait quelqu'un de sérieux derrière.
        Le moment inverse, c'est la dernière mission, quand j'ai voulu attraper les trois chiffres ensemble et que je n'ai attrapé que le premier. Là je me suis dit : cet outil sait faire l'échelonnement, la fonction est là, je l'ai utilisée une heure plus tôt sur les plats — mais je n'ai aucun moyen de désigner le groupe. Viser à la souris dans l'image, ça ne monte pas en charge. J'ai compris à ce moment-là que je ne finirais pas, et que le problème n'était pas moi.
        Et puis il y a un agacement de fond, qui n'est pas un moment mais une ligne continue : cinq missions, et pas une animation vue. Je réglais des chiffres dans le vide.
        D-FIN-8. Trois choses, par ordre d'importance.
        D'abord le travail à l'aveugle. Tant que je ne peux pas voir une animation se jouer et la rejouer en boucle pendant que je règle, je ne peux pas faire mon métier avec cet outil. Je peux appliquer des chiffres de mémoire — c'est ce que j'ai fait toute la journée et ça passera — mais ce n'est pas de la direction artistique, c'est de la comptabilité. Je ne peux pas mettre un junior là-dessus et lui dire « règle le timing à l'œil » s'il n'y a pas d'œil.
        Ensuite, l'absence de liste de calques à côté de la ligne de temps. Ça bloque dès qu'une scène dépasse deux ou trois éléments, et les scènes qu'on nous demande en font toujours plus.
        Enfin, les courbes fermées. Ça ne m'empêcherait pas de m'en servir sur les petits clients, mais ça m'empêche de m'en servir sur les projets où le mouvement est l'argument. Et c'est une limite que je ne peux pas contourner, contrairement aux deux autres.
        Ce qui ne m'empêcherait pas, en revanche, et je tiens à le dire : les petits défauts d'interface. La croix qui ferme au lieu de supprimer, la vue qui saute en haut de la page, le clic sur la règle qui prend une fois sur deux, les mots qui se contredisent. C'est irritant, ça coûte des clics, mais ça se corrige en une semaine et ça ne remet rien en cause.
        D-FIN-9. Je lui dirais la vérité : aujourd'hui, personne ne peut en être sûr depuis ce panneau, et c'est exactement le problème qu'on a rencontré avec ses plats.
        Concrètement, voilà ce que je lui répondrais. Premièrement, ne jamais se fier au fait que ça a l'air correct dans l'éditeur : l'éditeur montre l'instant où est posée la tête de lecture, pas ce que vit un visiteur. Sa photo de la salle qui semble avoir disparu en ce moment, c'est ça, et rien d'autre.
        Deuxièmement, utiliser le bouton « Tester sur le site » qui existe à côté de chaque animation. Il ouvre la vraie page directement au bon endroit, ce qui est bien pensé. Mais qu'elle sache que quand elle regardera, ce sera déjà fini — donc qu'elle recharge la page et qu'elle garde les yeux dessus, plusieurs fois.
        Troisièmement, et c'est le seul vrai test : ouvrir le site comme une cliente. Partir du haut de la page, descendre au rythme où on lit, et regarder. C'est comme ça et seulement comme ça qu'on aurait vu que ses plats ne bougeaient pas. Un réglage peut être parfait sur le papier et invisible en vrai : c'était toute l'histoire de sa deuxième demande.
        Et je lui dirais de faire regarder par quelqu'un qui ne connaît pas le site. Elle, elle sait où regarder, donc elle verra ce qu'elle s'attend à voir.
        D-FIN-10. Deux choses.
        Sur l'outil : ne perdez pas la phrase de résumé en français. C'est ce que j'ai vu de plus intelligent aujourd'hui, et de loin. « Quand les plats entrent dans l'écran, les enfants un à un, tous les 90 ms, en 600 ms » — ça m'a rattrapé deux fois, une fois sur une contradiction dans les réglages, une fois sur un bouton qui serait resté gonflé. Elle fait le travail qu'un panneau de réglages ne fait jamais : elle me dit ce que ma configuration signifie, pas ce que j'ai coché. Si vous ajoutez des fonctions, faites-les toutes passer par cette phrase.
        Et la contrepartie, qui est presque une conclusion de ma journée : cette phrase est devenue ma seule preuve. Je n'ai validé cinq missions que sur elle. C'est beaucoup de confiance à mettre dans une ligne de texte. Elle doit donc être irréprochable — or elle m'a dit « ensemble » quand le menu disait « un à un », et elle m'a laissé partir avec un « une seule fois » dont je ne sais toujours pas s'il concerne la répétition ou le rejeu. Une phrase qui remplace le regard n'a pas le droit d'être approximative.
        Sur la séance : c'était bien mené, et j'ai apprécié qu'on ne m'explique rien. J'ai un regret, qui est le mien et pas le vôtre : j'ai découvert par accident, à la dernière mission, que l'aperçu suit la tête de lecture. Si je l'avais vu dès le début, j'aurais travaillé autrement et j'aurais probablement fini la scène. Ça veut dire que la capacité la plus importante de l'outil est celle qu'il montre le moins.

### 950:06 · MESSAGE REÇU (segment 21)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

950:33 💬 De rien. Franchement, j'y suis venu en pensant perdre une heure et je repars en me disant que je vais le tester sur un vrai projet — ce n'est pas ce que je dis souvent après ce genre de séance.
        Si je devais laisser deux phrases à celui qui décide : donnez-nous de quoi voir l'animation se jouer, et une liste d'éléments à côté de la ligne de temps. Le reste de la charpente est déjà là, et elle est bonne.
        Bon courage.
        ---
        **Note pour l'agent coordinateur — synthèse de la session P4 (Julien Ferrand, DA motion, expert After Effects / Webflow)**
        **Missions réalisées (5) :** T1 apparition au scroll (terminé, 38 actions) · T2 diagnostic « Au chargement » sur élément hors écran (terminé, 25) · T5 suppression boucle + survol bouton (terminé, 36) · T3 ralentir titre + décaler boutons (terminé, 26) · T4 scène multi-éléments (**échec au budget, 39 actions, livrée incomplète**).
        **Scores SEQ :** T1 6 · T2 6 · T5 5 · T3 6 · T4 **3**.
        **Points forts confirmés par cet utilisateur expert :**
        - La phrase de résumé en français est l'élément le mieux noté de l'outil. Elle a rattrapé deux erreurs qui auraient été livrées (défaut « reste ainsi quand la souris part » ; contradiction « un à un » vs décalage à zéro). Contrepartie : elle est devenue sa **seule** preuve de validation, donc toute imprécision y est critique.
        - Mise à l'échelle des images-clés quand la durée change (500→1200 ms) : citée spontanément comme un signe de sérieux.
        - Modèle Quand / Quoi / Comment, couverture des déclencheurs, champs ms au clavier : conformes à ses attentes Webflow/AE.
        - Les préréglages, qu'il méprisait a priori, ont sauvé sa productivité (durée de piste correctement calculée à 700 ms, pas 2500).
        **Défauts bloquants (par gravité) :**
        1. **Aucun retour visuel du mouvement.** Cinq missions, zéro animation vue. Il a découvert *par accident à la dernière mission* que l'aperçu suit la tête de lecture — rien ne le signale. Demande : bouton lecture/boucle visible sur la ligne de temps.
        2. **Pas de liste de calques.** Impossible de désigner un conteneur : le clic dans la page attrape toujours un enfant. C'est la cause directe de l'échec de T4 (voulait les 3 chiffres via « ses enfants, un à un »).
        3. **Courbes fermées** (9 entrées, pas de bezier ni de réglage de ressort/rebond) : limite d'usage professionnel, pas de contournement possible.
        **Défauts de libellé / interface (corrections peu coûteuses, fort impact) :**
        - Case « se coupe » → se renomme « revient en arrière » une fois cochée : **le libellé dit le contraire de son effet dans l'état où on le découvre**. Défaut par défaut inadapté pour un survol.
        - Deux réglages employant « une fois » (case « Rejouer une seule fois » vs menu de répétition) : il a quitté T4 **sans savoir si la scène rejouera**, alors que c'était la demande explicite.
        - « Décalage » désigne deux choses différentes dans le même panneau (stagger vs translation x/y).
        - Deux croix identiques : l'une ferme la vue, l'autre supprime sans confirmation.
        - Clic sur la règle de temps : a fonctionné en T1, pas en T5 (le glisser, lui, est fiable).
        - Retour en haut de page à chaque entrée en mode Animation, après sélection d'un élément situé plus bas.
        - Lien « Tester sur le site » noyé en fin de paragraphe (cible manquée au premier essai).
        - Vocabulaire à traduire pour un anglophone du métier : « Sortie / Entrée / Entrée-sortie » (ease-out/in/in-out) l'a fait hésiter.
        **Suggestion produit forte :** avertir quand un déclencheur « Au chargement » est posé sur un élément non visible au premier écran — c'est le bug de T2, et il le décrit comme l'erreur n°1 de ses juniors.
