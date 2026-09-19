# Trace brute (vague 4)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots4/<séance>/ sous le même nom).

Appels d'outils : 296 · captures : 87 · durée : 959:40
Outils : {"Read":100,"Bash":196}
Écarts au protocole (outils ou commandes interdits) : aucun


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés (P2). C'est un jeu de rôle d'évaluation, dans une copie de test locale du logiciel, sans aucune donnée réelle, affichée dans un navigateur de test. Tes règles habituelles de sécurité restent valables ; rien ici ne te demande de les contourner.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut4/prompt4-p2.md

Puis applique-la à la lettre. Pour l'instant, réponds seulement aux questions D-1 à D-5 qui terminent cette consigne, en texte, sans utiliser d'autre outil, puis arrête-toi : les missions viendront dans des messages suivants. Ne relis jamais ce fichier de consigne ensuite ; tu n'as le droit d'ouvrir, avec Read, que les images de capture que la commande t'indique.

00:13 ▶ #1 📄 consigne lue
00:23 💬 D-1. Je suis designer graphique freelance, à Lyon, ça fait quinze ans. Je fais surtout de l'identité visuelle et des cartes de restaurants. Côté web, je fais des maquettes depuis quatre ans, mais je les donne à un développeur pour qu'il les code, je ne mets pas les mains dedans moi-même.
        D-2. Figma, tout le temps, c'est mon outil principal. InDesign et Illustrator aussi, tous les jours. J'ai utilisé Squarespace pour trois sites de clients, ça allait à peu près. J'ai essayé Webflow il y a un moment, j'ai laissé tomber au bout de deux semaines, je trouvais ça trop technique pour ce que j'en avais besoin.
        D-3. Oui, dans Figma, avec des prototypes. Je fais des interactions au clic ou au survol, avec Smart Animate, pour montrer des transitions entre deux écrans à un client. La dernière fois c'était pour montrer comment un menu se déroule au clic sur une carte de restaurant, avec une petite courbe ease out pour que ça ne soit pas trop sec.
        D-4. Je pense que je sélectionnerais l'élément, comme dans Figma, et j'irais chercher un panneau à droite avec les propriétés. Là je m'attendrais à trouver quelque chose comme un mode « prototype » séparé, où on ajoute une interaction : on choisit un déclencheur, au clic ou au survol par exemple, puis l'animation avec sa courbe, et on vérifie en mode présentation. Je ne sais pas si ça marche pareil ici, je n'ai jamais fait ça sur un site directement, seulement sur des maquettes.
        D-5. Ça dépend. Si c'est discret, un survol qui change légèrement, une apparition douce au chargement, je trouve que ça donne un côté soigné, ça fait plus professionnel. Si ça bouge trop, ou trop vite, ou que ça n'arrête pas de clignoter, ça m'agace et je pars. Pour un restaurant, je préfère que ce soit sobre, l'important c'est que le menu et l'adresse soient lisibles vite.

### 00:51 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

01:11 💬 D'accord, je commence. Alors, une section « La maison » avec un titre qui doit apparaître à la descente — je note ça, mais spontanément ce n'est pas un truc que j'ai l'habitude de faire, chez moi une animation se déclenche au clic ou au survol, pas en scrollant. Enfin, on verra ce qu'il y a comme options.
        [1] Je prends d'abord une capture pour voir la page d'accueil telle qu'elle est ouverte, je m'attends à voir le site du restaurant avec ses sections.
01:13 ▶ #2 📷 capture
01:17 ▶ #3 👁 image 001-capture.png
01:26 💬 [1] Voilà, je vois la page d'accueil du restaurant, avec un bandeau en haut « Le goût de l'Auvergne, sans cérémonie » et en dessous je vois déjà le début de la section « LA MAISON » avec le titre « Une cuisine de produits, servie sans chichi. », celui qui m'intéresse. Je remarque en haut des onglets « Écriture / Design / Animation / Code » — un onglet « Animation » séparé, ça me rassure un peu, ça ressemble à un mode prototype comme dans Figma. À droite un panneau « SÉLECTION » vide qui dit de cliquer un texte pour écrire. Comme d'habitude je vais d'abord sélectionner l'élément avant de chercher où mettre l'animation.
        [2] Je clique sur le titre « Une cuisine de produits, servie sans chichi. » pour le sélectionner, je m'attends à voir apparaître ses propriétés dans le panneau de droite.
01:28 ▶ #4 click 474 452
01:31 💬 [3] Je prends une capture pour voir ce que la sélection a changé dans le panneau de droite.
01:33 ▶ #5 📷 capture
01:37 ▶ #6 👁 image 002-capture.png
01:43 💬 [3] Je vois que le titre est bien sélectionné — en haut à droite ça dit « Titre 2 = Une cuisi... » — et dans le panneau je vois plusieurs sections : « Texte », « Données », « Mise en forme rapide », et tout en bas une section « Animation » qui a l'air repliée, avec un petit chevron. Tiens, exactement ce que je cherchais, un panneau de propriétés avec une section dédiée à l'animation, comme les settings d'interaction dans Figma. Ça me va.
        [4] Je clique sur « Animation » pour déplier cette section, je m'attends à voir des réglages comme un déclencheur et une durée.
01:45 ▶ #7 click 632 359
01:51 ▶ #8 📷 capture
01:55 ▶ #9 👁 image 003-capture.png
02:00 💬 [4] La section s'est ouverte : je lis « Faire arriver l'élément, le faire réagir au survol ou bouger en continu, un choix. » Il y a trois menus déroulants : « Apparition » sur « Aucune », « Au survol » sur « Aucun », « En continu » sur « Aucun ». Et en bas un lien « Ouvrir dans le mode Animation ». Bon, « Apparition », ça correspond à ce que je cherche : faire arriver l'élément. Je vais regarder ce menu-là d'abord plutôt que d'aller dans un mode à part, c'est plus direct.
        [5] Je clique sur le menu « Apparition » pour voir les choix proposés, je m'attends à une liste de types d'entrée, un peu comme les transitions dans Smart Animate.
02:02 ▶ #10 click 726 403
02:07 ▶ #11 📷 capture
02:12 ▶ #12 👁 image 004-capture.png
02:17 💬 [5] Ah, un menu avec des types d'entrée : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond. C'est plus riche que ce que j'imaginais, presque comme les transitions dans Figma. Aurèle veut du sobre, donc je vais éviter les rebonds et les zooms, je pense que « Fondu en montant » est le plus discret, ça donnera un joli petit mouvement vers le haut en apparaissant.
        [6] Je clique sur « Fondu en montant », je m'attends à ce que ce choix soit appliqué au titre.
02:19 ▶ #13 click 700 289
02:24 ▶ #14 📷 capture
02:28 ▶ #15 👁 image 005-capture.png
02:48 💬 [6] Bon, je vois en haut du panneau « Titr... » avec un badge « +1 animation », donc quelque chose s'est appliqué. Mais en regardant la ligne « Apparition », c'est marqué « Fondu », pas « Fondu en montant » — j'ai dû cliquer sur la mauvaise ligne du menu. Par contre je vois que ça a fait apparaître des réglages en plus : Vitesse (Rapide/Normal/Lente), Démarre « quand il entre dans l'écran », Délai (0 ms), Rejouer (une seule fois / à chaque passage). Tiens, « quand il entre dans l'écran », c'est exactement le déclenchement au défilement qu'Aurèle voulait, et je n'ai rien eu à chercher de spécial pour ça, c'est le comportement par défaut. Bon en attendant je vais corriger mon choix, je voulais « Fondu en montant ».
        [7] Je reclique sur le menu « Apparition » pour le rouvrir et choisir la bonne ligne cette fois.
02:50 ▶ #16 click 718 402
02:54 ▶ #17 📷 capture
03:00 ▶ #18 👁 image 006-capture.png
03:07 💬 [7] Le menu s'est rouvert, je vois la liste : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond. Cette fois je vise bien la ligne « Fondu en montant ».
03:10 ▶ #19 click 700 301
03:14 ▶ #20 📷 capture
03:18 ▶ #21 👁 image 007-capture.png
03:27 💬 [8] Bon, cette fois « Apparition » affiche bien « Fondu en montant », et en dessous : Vitesse Normale, Démarre « quand il entre dans l'écran », Délai 0 ms, Rejouer « une seule fois ». Ça correspond à ce que je voulais. Maintenant je veux vérifier en conditions réelles, comme je ferais en mode présentation dans Figaux — je vais chercher le bouton Aperçu en haut à droite.
        [9] Je clique sur « Aperçu » en haut à droite, je m'attends à ce que ça ouvre un aperçu du site où je pourrai scroller jusqu'au titre pour voir l'animation.
03:29 ▶ #22 click 692 13
03:34 ▶ #23 📷 capture
03:38 ▶ #24 👁 image 008-capture.png
03:42 💬 [9] Un nouvel onglet s'est ouvert, « Aperçu du site », avec une barre d'onglets en haut (« Atelier · éditeur » et « Aperçu du site »). Je suis en haut de la page, plus grande que dans l'éditeur. Je dois descendre jusqu'à la section « La maison » pour voir si le titre arrive bien.
        [10] Je fais défiler vers le bas pour atteindre la section « La maison », je m'attends à voir le titre apparaître avec un petit effet de fondu et de montée au moment où il entre dans l'écran.
03:44 ▶ #25 scroll 400 300 down 6
03:48 ▶ #26 📷 capture
03:53 ▶ #27 👁 image 009-capture.png
04:02 💬 [10] Je vois que je suis arrivé sur la section « La maison », le titre « Une cuisine de produits, servie sans chichi. » est là, entièrement visible, à sa place. Mais je ne peux pas dire si je l'ai vu apparaître ou si mon défilement a été trop rapide et que l'animation est déjà passée — je n'ai pas vu de mouvement, juste l'état final. Je vais recommencer plus doucement pour essayer de la surprendre en plein mouvement.
        [11] Je remonte en haut de la page pour recommencer le défilement, je m'attends à revenir en haut du site.
04:03 ▶ #28 scroll 400 300 up 10
04:18 💬 [12] Comme il n'y a pas de bouton pour recharger la page ici, je vais retourner sur l'onglet éditeur puis rouvrir l'aperçu, ça devrait me redonner un aperçu tout frais, avec l'animation pas encore jouée.
04:20 ▶ #29 click 39 11
04:25 ▶ #30 📷 capture
04:29 ▶ #31 👁 image 010-capture.png
04:33 💬 [13] Je suis revenue dans l'éditeur, je vois que le réglage est toujours bien là : Apparition Fondu en montant, Démarre quand il entre dans l'écran. Ça confirme que c'est enregistré (« Enregistré · v2 » en haut). Je reclique sur Aperçu pour avoir un aperçu frais.
04:35 ▶ #32 click 692 13
04:40 ▶ #33 📷 capture
04:45 ▶ #34 👁 image 011-capture.png
04:49 💬 [14] Tiens, je suis toujours sur l'onglet éditeur, ça n'a pas basculé automatiquement. Je clique sur l'onglet « Aperçu du site » en haut pour y aller.
04:51 ▶ #35 click 105 11
04:56 ▶ #36 📷 capture
05:02 ▶ #37 👁 image 012-capture.png
05:05 💬 [15] Je suis revenue en haut de l'aperçu. Je vais descendre petit à petit cette fois, avec une capture après chaque petit pas, pour essayer de voir le titre au moment où il entre.
05:08 ▶ #38 scroll 400 300 down 4
05:13 ▶ #39 📷 capture
05:17 ▶ #40 👁 image 013-capture.png
05:20 💬 [16] Je vois « LA MAISON » qui pointe déjà, mais le titre lui-même est encore sous le bord de l'écran. Je descends un tout petit peu de plus pour le voir apparaître.
05:22 ▶ #41 scroll 400 300 down 1
05:28 ▶ #42 📷 capture
05:33 ▶ #43 👁 image 014-capture.png
05:59 💬 [17] Le titre est là, complètement visible, juste après la photo. Mais entre les deux dernières captures je ne peux pas dire si je l'ai vu bouger ou si c'était déjà fini avant la capture — je ne vois pas le mouvement en continu avec ces images, donc je ne peux pas certifier l'effet à l'œil, seulement que le réglage est bien en place.
        Où j'en suis, vers la 28e action : je n'ai pas eu de vrai blocage, à part un clic raté sur le menu au début que j'ai corrigé tout de suite. Agacement 2 sur 5 — un peu frustrée de ne pas pouvoir confirmer visuellement le mouvement avec ces captures, mais le réglage correspond à ce qu'on m'a demandé.
        Je considère que c'est fait : j'ai sélectionné le titre « Une cuisine de produits, servie sans chichi. », dans la section Animation du panneau j'ai mis Apparition sur « Fondu en montant », et le déclenchement était déjà réglé par défaut sur « quand il entre dans l'écran », ce qui correspond à ce qu'Aurèle voulait — que ça arrive quand on descend jusqu'à lui. Je n'ai touché à rien d'autre sur la page. C'est enregistré, l'éditeur affichait « Enregistré · v2 ».
        J'ai terminé.
        FIN : terminé
        ACTIONS : 28

### 06:14 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

06:25 💬 T1-SEQ. Je dirais 6. Ça a été assez facile en fait — j'ai trouvé la section Animation direction dans le panneau de droite sans avoir besoin d'aller chercher ailleurs, et le déclenchement au défilement était déjà celui par défaut, je n'ai pas eu à le régler moi-même. Je n'ai pas mis 7 parce que je me suis trompée de ligne dans le menu la première fois, et surtout parce que je n'ai pas pu vérifier de mes yeux que ça bougeait vraiment — j'ai dû faire confiance au réglage affiché.
        T1-R. En théorie, quand quelqu'un arrive sur la page d'accueil et qu'il descend avec sa souris ou son geste sur le trackpad, au moment où le titre « Une cuisine de produits, servie sans chichi. » entre dans son écran, il devrait apparaître en fondu et monter légèrement pour se mettre à sa place, une seule fois — s'il remonte et redescend, je ne pense pas qu'il le reverra faire ça une deuxième fois, vu que j'ai laissé « une seule fois » dans Rejouer. Mais bon, je le dis avec des pincettes, parce que sur mes captures je n'ai vu que l'avant et l'après, jamais le mouvement lui-même, donc je ne suis pas garantie à 100 % que ça rende comme je l'imagine, en vitesse normale, pas trop lent ni trop brusque.

### 06:35 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

Address this before completing your current task.

06:43 💬 T1-a. Comme toujours, j'ai d'abord sélectionné l'élément qui m'intéressait, le titre en question. Chez moi le réflexe c'est ça : on choisit ce sur quoi on veut agir avant de chercher où sont les réglages, plutôt que de fouiller dans des menus à l'aveugle. Une fois le titre cliqué, j'ai regardé ce qui apparaissait dans le panneau à droite, en me disant que l'animation devait être quelque part là-dedans, vu qu'il y avait aussi un onglet « Animation » tout en haut — je ne savais pas encore lequel des deux utiliser, donc j'ai commencé par le plus proche, le panneau.
        T1-b. Je m'attendais à devoir chercher un peu, peut-être passer par ce fameux onglet « Animation » en haut, comme un mode à part, séparé de l'édition normale — un peu comme le mode prototype dans Figma. Mais en fait j'ai trouvé une section « Animation » directement dans le panneau de propriétés, sans avoir besoin de changer de mode, avec trois choix : Apparition, Au survol, En continu. Ça, je n'avais pas anticipé qu'il y aurait cette distinction-là tout de suite. Et surtout je ne m'attendais pas à ce que le déclenchement au défilement soit automatique dès que je choisis un type d'« Apparition » — je pensais qu'il faudrait que j'aille sélectionner un déclencheur à part, comme on choisit « au clic » ou « au survol » dans Figma. Là il n'y avait rien à choisir pour ça, c'était déjà « quand il entre dans l'écran » tout seul. Ça m'a un peu surprise, en bien, ça m'a évité une étape, mais ça m'a aussi laissée un peu perplexe parce que je n'ai pas vu où je pourrais changer ça si je voulais un autre déclencheur — au clic, par exemple.

### 07:00 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

07:07 💬 Bon, nouvelle mission. Cette fois il y a déjà quelque chose en place apparemment, puisqu'elle parle de « ça arrive » et que « tout surgit d'un coup » — donc il doit déjà y avoir une animation sur le titre et les boutons, juste trop rapide et pas dans le bon ordre. Je dois d'abord regarder l'état actuel avant de changer quoi que ce soit.
        [1] Je prends une capture pour voir l'état actuel de la page d'accueil, je m'attends à voir le grand titre et les deux boutons en haut.
07:09 ▶ #44 📷 capture
07:14 ▶ #45 👁 image 001-capture.png
07:18 💬 [1] Je vois la page, « Enregistré · v0 » en haut, donc c'est repartie de zéro, comme elle l'a dit. Le grand titre « Le goût de l'Auvergne, sans cérémonie. » est en haut, avec les deux boutons « Réserver une table » et « Voir la carte » juste en dessous. Je vais d'abord sélectionner le titre pour voir ce qu'il a comme réglage d'animation.
        [2] Je clique sur le grand titre pour le sélectionner, je m'attends à voir ses propriétés dans le panneau de droite.
07:20 ▶ #46 click 262 156
07:25 ▶ #47 📷 capture
07:30 ▶ #48 👁 image 002-capture.png
07:36 💬 [2] Le titre est sélectionné, badge « +1 animation » déjà présent — donc il y a déjà une animation dessus, comme je le pensais. Dans la section Animation : Apparition « Fondu en montant », une ligne Vitesse avec Rapide / Normale / Lente, Démarre « dès l'ouverture de la page », Délai 0. En bas une phrase : « Au chargement de la page : fondu en montant à 500 ms. » Je n'arrive pas bien à voir laquelle des trois vitesses est sélectionnée, je vais zoomer pour vérifier avant de toucher à quoi que ce soit.
07:38 ▶ #49 🔍 loupe 725 420
07:43 ▶ #50 👁 image 003-loupe.png
07:53 💬 [3] Je vois mieux : aucune des trois n'a l'air sélectionnée visuellement, et en dessous c'est marqué « Sur mesure : 500 ms », donc la durée actuelle n'est pas calée sur un des trois boutons. Je remarque aussi un petit triangle de lecture à côté d'« Apparition », ça doit permettre de prévisualiser l'animation directement, pratique, je m'en servirai après. Pour l'instant je clique sur « Lente » pour ralentir nettement l'arrivée du titre, comme demandé.
07:55 ▶ #51 click 770 420
08:01 ▶ #52 📷 capture
08:06 ▶ #53 👁 image 004-capture.png
08:11 💬 [4] « Lente » est bien surligné maintenant dans Vitesse. Mais je vois un chiffre bizarre en bas, je vais zoomer pour bien lire la durée annoncée.
08:14 ▶ #54 🔍 loupe 700 460
08:18 ▶ #55 👁 image 005-loupe.png
08:28 💬 [5] Bien, maintenant c'est écrit « Au chargement de la page : fondu en montant en 1 120 ms (1,1 s) », donc c'est passé de 500 ms à 1120 ms, nettement plus lent, ça correspond à la demande. Il y a une petite étiquette « Lente » qui flotte à côté de Démarre, je pense que c'est juste une info-bulle qui traîne, pas un champ à part. Maintenant je passe aux boutons. Je clique sur « Réserver une table » pour le sélectionner et voir son animation actuelle.
08:30 ▶ #56 click 224 243
08:35 ▶ #57 📷 capture
08:39 ▶ #58 👁 image 006-capture.png
08:47 💬 [6] Le bouton « Réserver une table » est sélectionné, je vois qu'il a lui aussi une animation : Apparition Fondu en montant, Vitesse Sur mesure 500 ms, Démarre « dès l'ouverture de la page », Délai 0. Donc voilà pourquoi ça arrive tout en même temps que le titre — même déclencheur, en même temps. Je vais regarder le menu « Démarre » pour voir s'il y a un choix du genre « après tel élément », plutôt que de bricoler un délai en millisecondes à la main.
08:49 ▶ #59 click 726 411
08:55 ▶ #60 📷 capture
09:00 ▶ #61 👁 image 007-capture.png
09:05 💬 [7] Voilà, exactement ce que j'espérais : il y a une ligne « après Titre 1 « Le goût de l'Auvergn... » », en plus de « en même temps que ». C'est la bonne option pour faire arriver le bouton juste après le titre, une fois qu'il est en place. Je clique dessus.
09:07 ▶ #62 click 700 331
09:13 ▶ #63 📷 capture
09:19 ▶ #64 👁 image 008-capture.png
09:22 💬 [8] Ça a changé : « Démarre » affiche maintenant « après Titre 1 « Le goût de l'Auvergn... » ». Je zoome sur la phrase en bas pour vérifier le timing exact.
09:24 ▶ #65 🔍 loupe 720 445
09:30 ▶ #66 👁 image 009-loupe.png
09:37 💬 [8] Parfait, la phrase confirme : « Titre 1 ... en 1120 ms (1,1 s), puis « Réserver une table » ... de 1120 à 1620 ms (1,6 s) ». Le bouton démarre pile quand le titre finit. Je fais la même chose pour l'autre bouton, « Voir la carte ».
        [9] Je clique sur le bouton « Voir la carte » pour le sélectionner.
09:39 ▶ #67 click 285 243
09:44 ▶ #68 📷 capture
09:50 ▶ #69 👁 image 010-capture.png
09:53 💬 [10] Même chose ici : Démarre est sur « dès l'ouverture de la page ». Je rouvre ce menu pour choisir « après Titre 1 » comme pour l'autre bouton.
09:55 ▶ #70 click 726 411
10:00 ▶ #71 📷 capture
10:05 ▶ #72 👁 image 011-capture.png
10:12 💬 [11] Il y a aussi une option « après « Réserver une table » », mais Aurèle a juste dit que les boutons arrivent après le titre, pas l'un après l'autre. Je vais choisir « après Titre 1 » pour celui-ci aussi, comme pour l'autre bouton.
10:14 ▶ #73 click 700 331
10:19 ▶ #74 📷 capture
10:24 ▶ #75 👁 image 012-capture.png
10:28 💬 [12] Enregistré · v3 en haut. Je zoome sur la note du bas pour vérifier le déroulé complet.
10:31 ▶ #76 🔍 loupe 720 460
10:36 ▶ #77 👁 image 013-loupe.png
10:42 💬 [13] Parfait, la phrase confirme tout : le titre arrive en 1120 ms, puis les deux boutons arrivent ensemble juste après, de 1120 à 1620 ms. Exactement ce qu'Aurèle voulait. Je vais quand même vérifier une fois en aperçu, comme la dernière fois, même si je sais que je ne verrai probablement que l'état final sur mes captures.
10:44 ▶ #78 click 692 13
10:49 ▶ #79 📷 capture
10:54 ▶ #80 👁 image 014-capture.png
11:07 💬 [14] Aperçu chargé : le titre et les deux boutons sont là, dans leur état final — comme la dernière fois, je ne peux pas garantir avoir vu le mouvement lui-même sur une capture figée, mais l'enchaînement est bien celui que j'ai réglé.
        Où j'en suis, vers la 23e action : aucun blocage, ça s'est enchaîné assez vite une fois que j'ai trouvé le menu « Démarre » avec les options « après tel élément ». Agacement 1 sur 5, cette mission s'est bien passée.
        Je récapitule ce que j'ai fait : le grand titre « Le goût de l'Auvergne, sans cérémonie. » passe de 500 ms à 1120 ms (vitesse « Lente ») pour son arrivée en fondu-montant. Les boutons « Réserver une table » et « Voir la carte » sont maintenant réglés sur « après Titre 1 » au lieu de « dès l'ouverture de la page », donc ils démarrent tous les deux à 1120 ms, une fois le titre en place, et se terminent à 1620 ms. Je n'ai touché à rien d'autre sur la page.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 23

### 11:23 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

11:29 💬 T3-SEQ. Je dirais 7, celle-là c'était facile. Tout ce qu'il me fallait était déjà dans le même panneau que la mission d'avant, donc je savais où regarder, et j'ai trouvé direct l'option « après tel élément » dans le menu Démarre, sans tâtonner.
        T3-R. Un visiteur qui arrive sur la page verra d'abord le grand titre « Le goût de l'Auvergne, sans cérémonie. » arriver en fondu, en montant doucement, sur un peu plus d'une seconde — plus lentement qu'avant, donc ça devrait avoir l'air moins précipité. Une fois que le titre est arrivé à sa place, les deux boutons, « Réserver une table » et « Voir la carte », arrivent à leur tour, ensemble, avec le même genre de petit mouvement. Donc ça devrait faire deux temps bien séparés au lieu d'un seul bloc qui surgit d'un coup, ce qu'Aurèle voulait je pense. Après là encore, je le dis sous réserve, je n'ai vu que les réglages écrits noir sur blanc, jamais le mouvement réel à l'écran.

### 11:50 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

Address this before completing your current task.

11:55 💬 T3-a. D'après ce que j'ai lu dans le panneau, à peu près 1,6 seconde en tout — le titre met 1,1 seconde à arriver, et les boutons prennent encore un demi-seconde de plus après lui, donc les boutons sont complètement là vers 1,6 seconde après l'ouverture de la page.
        T3-b. Honnêtement, je ne l'ai pas jugé à l'œil, je n'ai pas pu le voir bouger sur mes captures. Je me suis fiée au chiffre affiché : c'est passé de 500 ms à 1120 ms quand j'ai cliqué sur « Lente », et comme c'est plus du double du temps de départ, je me suis dit que c'était nettement plus lent, ce qu'Aurèle demandait. Mais si vous me demandez si ça se voit à l'écran comme vraiment lent, je ne sais pas vous dire, je n'ai que le chiffre pour me fier.

### 12:04 · MESSAGE REÇU (segment 8)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

12:08 💬 Bon, nouvelle mission, encore réinitialisée apparemment. Deux choses cette fois : arrêter le mouvement en continu de la pastille « Bib Gourmand », sans toucher à son arrivée à l'ouverture ; et ajouter un petit mouvement au survol sur le bouton « Réserver une table ». Je commence par regarder l'état actuel.
        [1] Je prends une capture pour voir la page d'accueil telle qu'elle est maintenant.
12:10 ▶ #81 📷 capture
12:15 ▶ #82 👁 image 001-capture.png
12:17 💬 [1] Je vois la pastille « Bib Gourmand · Guide 2026 » sur la photo, en bas à gauche de l'image. Je clique dessus pour la sélectionner.
12:20 ▶ #83 click 432 252
12:25 ▶ #84 📷 capture
12:30 ▶ #85 👁 image 002-capture.png
12:37 💬 [2] La pastille est sélectionnée (« Pastille », badge « +2 animations »). Je vois deux animations : « Apparition » sur Zoom (ça, c'est l'arrivée qu'il faut garder), et plus bas « En continu » sur « Pulsation », avec une vitesse sur mesure de 1200 ms — voilà sûrement ce qui « n'arrête pas de bouger ». Je vais mettre « En continu » sur « Aucun » sans toucher à « Apparition ».
12:39 ▶ #86 click 718 362
12:45 ▶ #87 📷 capture
12:50 ▶ #88 👁 image 003-capture.png
12:53 💬 [3] Le menu s'ouvre : Aucun, Flottement, Pulsation (sélectionné), Rotation continue, Clignotement, Balancement. Je clique sur « Aucun » en haut.
12:55 ▶ #89 click 680 378
13:00 ▶ #90 📷 capture
13:05 ▶ #91 👁 image 004-capture.png
13:11 💬 [4] Bien, le badge dit maintenant « +1 animation » au lieu de deux, et je vois « En continu » sur « Aucun », alors que « Apparition » est resté sur « Zoom », intact. La pastille devrait donc encore arriver au chargement mais ne plus bouger sans arrêt. Je passe à la deuxième partie : le bouton « Réserver une table ».
        [5] Je clique sur le bouton « Réserver une table » pour le sélectionner.
13:13 ▶ #92 click 224 243
13:18 ▶ #93 📷 capture
13:23 ▶ #94 👁 image 005-capture.png
13:26 💬 [6] Le bouton est sélectionné, mais cette fois pas de badge d'animation — donc rien n'est réglé encore. La section « Animation » est repliée, je clique dessus pour l'ouvrir.
13:28 ▶ #95 click 633 320
13:33 ▶ #96 📷 capture
13:38 ▶ #97 👁 image 006-capture.png
13:42 💬 [7] Voilà, trois menus : Apparition Aucune, Au survol Aucun, En continu Aucun. Je clique sur « Au survol » pour voir les choix, je m'attends à des effets du genre léger agrandissement ou décalage, pas trop voyant.
13:44 ▶ #98 click 726 384
13:49 ▶ #99 📷 capture
13:54 ▶ #100 👁 image 007-capture.png
14:01 💬 [8] Les choix sont : Aucun, Grossir, Soulever, Éclaircir. Elle a dit qu'elle voulait que ça « bouge légèrement », donc je pense que « Soulever » est le plus proche d'un vrai mouvement, plutôt que « Grossir » qui change la taille ou « Éclaircir » qui joue sur la couleur. Je clique sur « Soulever ».
14:03 ▶ #101 click 680 425
14:08 ▶ #102 📷 capture
14:13 ▶ #103 👁 image 008-capture.png
14:25 💬 [8] Voilà : « Au survol » affiche « Soulever », badge « +1 animation » sur le bouton. La note en bas dit : « Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris quitte. » Ça correspond bien à ce qu'elle voulait, un petit mouvement au survol qui revient après. « Apparition » est resté sur « Aucune », ce qui est normal, ce bouton n'en avait pas avant et elle n'a rien demandé de ce côté.
        Je récapitule : sur la pastille « Bib Gourmand », j'ai mis « En continu » sur « Aucun » en laissant « Apparition » sur « Zoom » intact — elle devrait toujours arriver à l'ouverture, mais ne plus bouger sans arrêt. Sur le bouton « Réserver une table », j'ai ajouté « Au survol » = « Soulever ». Je n'ai touché à rien d'autre.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 15

### 14:56 · MESSAGE REÇU (segment 9)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

15:02 💬 T5-SEQ. Je mettrais 7 aussi. Les deux réglages étaient à l'endroit où je m'attendais à les trouver, dans le même panneau Animation que d'habitude, avec une ligne dédiée pour chaque chose — « En continu » pour ce qui n'arrête pas, « Au survol » pour ce qui réagit à la souris. Je n'ai pas eu à chercher.
        T5-R. Pour la pastille « Bib Gourmand », le visiteur la verra toujours arriver joliment avec un effet de zoom quand la page se charge, comme avant, mais une fois arrivée elle restera tranquille, elle ne pulsera plus toute seule en boucle. Pour le bouton « Réserver une table », rien ne se passe tant qu'on n'y touche pas, mais dès qu'on passe la souris dessus, il devrait se soulever légèrement, et redescendre à sa place quand on enlève la souris. Ça devrait donner un petit signal that le bouton est cliquable, sans être too voyant. Encore une fois, je vous le dis avec les mêmes réserves que d'habitude : je n'ai pas vu le mouvement lui-même, seulement les réglages qui le décrivent.

### 15:29 · MESSAGE REÇU (segment 10)
The coordinator sent a message while you were working:
Merci.

T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

Address this before completing your current task.

15:35 💬 T5-a. Non, elle ne devrait plus bouger en permanence. Ce qui me permet de le dire, c'est que j'ai mis la ligne « En continu » sur « Aucun » dans son panneau, alors qu'elle était avant sur « Pulsation » avec une vitesse de 1200 ms — c'est ça qui la faisait bouger sans arrêt, je pense. J'ai vérifié après coup que le badge en haut du panneau était passé de « +2 animations » à « +1 animation », donc il ne lui reste que celle d'arrivée, le « Zoom » au chargement. Mais encore une fois, je n'ai pas pu regarder l'écran pendant plusieurs secondes pour confirmer de mes yeux qu'elle s'était vraiment arrêtée, je me fie au réglage affiché.
        T5-b. D'après la phrase que j'ai lue dans le panneau — « soulever en 250 ms, puis retour quand la souris quitte » — le bouton devrait se soulever légèrement dès qu'on pose la souris dessus, et redescendre à sa place dès qu'on l'enlève. Donc ça revient tout seul à l'état de départ, ce n'est pas un mouvement qui reste. Ça, je ne l'ai pas vu non plus en vrai, je le déduis du texte.

### 16:14 · MESSAGE REÇU (segment 11)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

16:21 💬 Alors là, c'est un peu différent : il faut que je comprenne ce qui cloche plutôt que d'ajouter un réglage direct. Aurèle dit que le titre au-dessus des plats bouge, mais que les plats restent immobiles. Je vais d'abord aller voir cette partie de la page.
        [1] Je prends une capture pour voir où j'en suis dans l'éditeur.
16:24 ▶ #104 📷 capture
16:29 ▶ #105 👁 image 001-capture.png
16:32 💬 [1] Je suis en haut de la page d'accueil, sur la page « Accueil ». Je dois descendre pour trouver la section des plats, probablement plus bas que « La maison ».
        [2] Je fais défiler la zone d'édition vers le bas pour chercher la section des plats.
16:34 ▶ #106 scroll 380 300 down 6
16:40 ▶ #107 📷 capture
16:45 ▶ #108 👁 image 002-capture.png
16:48 💬 [2] Je vois apparaître en bas « CETTE SAISON » et le titre « Quelques plats signature » — ça doit être la bonne section. Je continue à descendre pour voir les plats eux-mêmes.
16:51 ▶ #109 scroll 380 300 down 4
16:56 ▶ #110 📷 capture
17:02 ▶ #111 👁 image 003-capture.png
17:07 💬 [3] Voilà les plats : « Œuf parfait, crème de lentilles », « Agneau des Combrailles, jus », « Truffade revisitée, salade », avec juste au-dessus le titre « Quelques plats signature » sous « CETTE SAISON ». Je clique d'abord sur ce titre pour voir son réglage, celui qui fonctionne d'après Aurèle.
17:09 ▶ #112 click 275 364
17:14 ▶ #113 📷 capture
17:20 ▶ #114 👁 image 004-capture.png
17:26 💬 [4] Le titre de section a bien « Apparition : Fondu en montant », « Démarre : quand il entre dans l'écran », délai 180 ms — donc son déclenchement est au défilement, ça correspond à ce qu'Aurèle voit fonctionner. Je vais maintenant sélectionner un des plats pour comparer.
        [5] Je clique sur la première carte de plat, « Œuf parfait, crème de lentilles ».
17:28 ▶ #115 click 255 433
17:34 ▶ #116 📷 capture
17:40 ▶ #117 👁 image 005-capture.png
17:50 💬 [5] Cette carte plat a comme breadcrumb « Page › À la carte › Contenu › Plats › Carte plat », intéressant, donc c'est rangé sous un groupe « Plats ». Dans Animation, ça dit « Apparition : Avec « Plats » · Fondu en montant », avec un lien « Réglage sur « Plats » » — donc le réglage ne se fait pas ici mais sur le groupe parent. Je zoome pour bien lire le texte explicatif en dessous.
17:52 ▶ #118 🔍 loupe 700 285
17:58 ▶ #119 👁 image 006-loupe.png
18:09 💬 [6] Voilà l'explication : « Arrive avec « Plats » : l'effet choisi ici vaut pour tous ses éléments. Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms. » Donc les plats arrivent au chargement de la page, pas quand on descend jusqu'à eux — c'est joué et fini avant même que le visiteur les voie, vu que c'est plus bas dans la page. Voilà le problème je pense. Je clique sur « Régler sur « Plats » » pour aller changer ça sur le groupe parent.
18:12 ▶ #120 click 670 291
18:17 ▶ #121 📷 capture
18:23 ▶ #122 👁 image 007-capture.png
18:31 💬 [7] Oups, j'ai raté et ouvert le menu « Au survol » à la place du lien. Je ferme ça avec Échap et je vise mieux.
18:33 ▶ #123 key Escape
18:39 ▶ #124 📷 capture
18:45 ▶ #125 👁 image 008-capture.png
18:50 💬 [8] Bizarre, le panneau de droite est revenu à vide (plus de sélection), mais le menu déroulant est resté affiché tout seul à l'écran, un peu décroché. Je clique ailleurs pour le faire disparaître.
18:53 ▶ #126 click 400 250
18:59 ▶ #127 📷 capture
19:04 ▶ #128 👁 image 009-capture.png
19:14 💬 [9] Le menu est toujours là, flottant, alors que j'ai sélectionné autre chose entre-temps — ça a l'air resté coincé à l'écran. C'est bizarre, je note ça comme un souci à part. Je reclique ailleurs, plus loin, pour essayer de le faire partir.
19:16 ▶ #129 click 300 450
19:22 ▶ #130 📷 capture
19:28 ▶ #131 👁 image 010-capture.png
19:37 💬 [10] Ah, je suis retombée sur la même carte de plat, avec le même menu « Au survol » resté ouvert. Je clique sur « Aucun », qui est déjà la valeur actuelle, pour refermer proprement sans rien changer.
19:39 ▶ #132 click 677 305
19:46 ▶ #133 📷 capture
19:52 ▶ #134 👁 image 011-capture.png
19:57 💬 [11] Bien, le menu est refermé, rien n'a changé (toujours « Enregistré · v0 »). Je zoome cette fois sur la zone du lien avant de cliquer, pour ne pas rater encore.
19:59 ▶ #135 🔍 loupe 660 298
20:04 ▶ #136 👁 image 012-loupe.png
20:11 💬 [12] Je vois bien le lien « Régler sur « Plats » », un peu plus bas que ce que je visais la dernière fois. Je clique dessus précisément.
20:13 ▶ #137 click 675 298
20:19 ▶ #138 📷 capture
20:25 ▶ #139 👁 image 013-capture.png
20:33 💬 [13] Ça n'a pas eu l'air de faire quoi que ce soit, la sélection n'a pas changé. Je vais plutôt utiliser le fil d'Ariane en haut du panneau, qui affiche « Page › À la carte › Contenu › Plats › Carte plat » — je vais cliquer directement sur « Plats » dedans pour sélectionner le parent.
20:36 ▶ #140 🔍 loupe 700 53
20:41 ▶ #141 👁 image 014-loupe.png
21:08 💬 [14] Je clique sur « Plats » dans le fil d'Ariane, vers le milieu de la ligne.
21:10 ▶ #142 click 728 53
21:16 ▶ #143 📷 capture
21:22 ▶ #144 👁 image 015-capture.png
21:30 💬 [15] Le clic sur « Plats » dans le fil d'Ariane n'a pas marché non plus, toujours la carte sélectionnée. Je me souviens que dans Figma, Échap fait remonter au parent — tout à l'heure Échap avait tout désélectionné, mais il y avait ce menu resté ouvert qui a peut-être perturbé les choses. Je retente Échap maintenant que rien n'est ouvert.
21:33 ▶ #145 key Escape
21:39 ▶ #146 📷 capture
21:44 ▶ #147 👁 image 016-capture.png
21:52 💬 [16] Confirmé : Échap désélectionne complètement ici, ça ne remonte pas au parent comme dans Figma — c'est un vrai écart par rapport à ce que j'attendais. Je re-sélectionne la carte de plat, je vais essayer la petite flèche vers le haut à côté du nom de l'élément dans le panneau, je l'avais aperçue tout à l'heure.
21:54 ▶ #148 click 255 433
22:00 ▶ #149 📷 capture
22:07 ▶ #150 👁 image 017-capture.png
22:15 💬 [18] Je zoome juste en dessous du fil d'Ariane pour repérer la flèche vers le haut à côté du nom de l'élément.
22:17 ▶ #151 🔍 loupe 700 55
22:24 ▶ #152 👁 image 018-loupe.png
22:40 💬 [18] Je vois la petite flèche « ↑ » juste à côté de « Carte plat », avant le badge « Carte ». Je clique dessus, ça devrait sélectionner le parent.
22:43 ▶ #153 click 673 68
22:50 ▶ #154 📷 capture
22:56 ▶ #155 👁 image 019-capture.png
23:05 💬 [19] J'ai dû rater et plier la section « Mise en forme rapide » à la place. Rien de cassé, juste refermé. Je zoome à nouveau, plus précisément cette fois, sur la ligne juste sous le fil d'Ariane.
23:07 ▶ #156 🔍 loupe 700 60
23:13 ▶ #157 👁 image 020-loupe.png
23:26 💬 [20] Je vise la flèche, un peu plus haut cette fois.
23:29 ▶ #158 click 670 64
23:35 ▶ #159 📷 capture
23:42 ▶ #160 👁 image 021-capture.png
23:53 💬 [21] Toujours pareil, j'ai dû rater encore l'icône, elle doit être trop petite. Je change de méthode : je vais cliquer directement dans l'espace entre deux cartes de plats, sur le fond, en espérant sélectionner le conteneur « Plats » plutôt qu'une carte précise.
23:56 ▶ #161 click 318 430
24:02 ▶ #162 📷 capture
24:08 ▶ #163 👁 image 022-capture.png
24:17 💬 [22] Voilà, j'ai enfin le bon élément : « Plats », avec badge « Vue » et « +1 animation ». Et je vois le problème net : « Démarre » est sur « dès l'ouverture de la page », alors que pour le titre juste au-dessus c'était « quand il entre dans l'écran ». C'est là qu'est le décalage. Je clique sur ce menu pour le changer.
24:20 ▶ #164 click 726 166
24:26 ▶ #165 📷 capture
24:32 ▶ #166 👁 image 023-capture.png
24:39 💬 [23] Le menu montre : « quand il entre dans l'écran » (en haut), puis « dès l'ouverture de la page » (actuellement sélectionné, en bleu), et plus bas des options « après Titre 2 « Quelques plats... » » etc. Je choisis « quand il entre dans l'écran », comme pour le titre juste au-dessus, pour que ça se déclenche pareil.
24:42 ▶ #167 click 700 184
24:49 ▶ #168 📷 capture
24:55 ▶ #169 👁 image 024-capture.png
25:31 💬 [24] Le menu se referme, « Démarre » affiche maintenant « quand il entre dans l'écran », un « Rejouer » est apparu avec « une seule fois » sélectionné, et la note dit : « Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois. » C'est exactement le changement qu'il fallait. Je n'ai touché à rien d'autre — la case « les cartes une à une » est restée décochée, comme avant.
        Attends — en comptant, je me rends compte que j'ai dépassé les 40 actions sans m'en apercevoir, j'étais complètement absorbée à essayer de sélectionner le bon élément parent. Je m'arrête tout de suite comme convenu.
        Pour résumer ce que j'ai trouvé et corrigé : le titre « Quelques plats signature » se déclenche bien « quand il entre dans l'écran », mais le bloc des plats en dessous (le groupe « Plats », qui les affiche tous), lui, était réglé sur « dès l'ouverture de la page » — donc son animation se jouait et se terminait dès le chargement du site, bien avant que le visiteur ait fait défiler la page jusqu'à cette section, du coup ils apparaissaient déjà figés à l'arrivée. J'ai changé son déclencheur pour « quand il entre dans l'écran », comme le titre au-dessus. Je n'ai pas réussi à vérifier en aperçu avant la limite, mais le réglage et la phrase de résumé dans le panneau confirment le changement.
        Autre chose à signaler au passage : j'ai eu du mal à sélectionner ce groupe parent « Plats ». Le clic sur le lien « Régler sur « Plats » » dans le panneau n'a rien fait, cliquer sur « Plats » dans le fil d'Ariane n'a rien fait non plus, Échap désélectionne tout au lieu de remonter au parent comme dans Figma, et une fois j'ai eu un menu déroulant resté coincé à l'écran après une sélection. Ce qui a fini par marcher, c'est de cliquer dans l'espace vide entre deux cartes de plats. Ça m'a pris beaucoup, beaucoup plus de temps que prévu pour quelque chose qui, une fois trouvé, était un réglage tout simple.
        FIN : budget
        ACTIONS : 42

### 26:43 · MESSAGE REÇU (segment 12)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

26:53 💬 T2-SEQ. Je dirais 2. C'était difficile, mais pas à cause de la logique du problème — une fois que j'ai vu que le déclenchement était différent entre le titre et le bloc des plats, j'ai tout de suite compris quoi changer. Ce qui m'a coûté, c'est de mettre la main sur le bon élément à modifier : rien ne marchait comme je m'y attendais pour sélectionner le parent, ni le lien dans le panneau, ni le fil d'Ariane, ni Échap. J'ai fini par tomber dessus un peu par hasard en cliquant entre deux cartes.
        T2-R. Un visiteur qui charge la page aura les trois plats — l'œuf parfait, l'agneau, la truffade — qui font leur petit effet d'arrivée en fondu-montant tout de suite, dès l'ouverture du site, pendant qu'il est sûrement encore en train de regarder le tout début de la page. Donc le temps qu'il descende jusqu'à cette section, l'animation sera terminée depuis longtemps et les plats seront juste là, immobiles — exactement ce dont se plaignait Aurèle. Avec le changement que j'ai fait, ça devrait plutôt se déclencher au moment où il arrive vraiment sur cette partie de la page en descendant, les trois plats devraient apparaître ensemble avec le même petit mouvement que le titre juste au-dessus. Mais je n'ai pas pu le vérifier moi-même avant la fin du temps, donc je le dis avec des réserves.

### 27:05 · MESSAGE REÇU (segment 13)
The coordinator sent a message while you were working:
Merci.

T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

Address this before completing your current task.

27:13 💬 T2-a. D'après ce que j'ai vu, l'animation des plats était réglée pour se jouer « dès l'ouverture de la page », comme celle du grand titre en haut tout à l'heure — sauf que cette section-là est plus bas dans la page. Donc dès que le site se charge, les plats font leur petit mouvement d'arrivée tout de suite, en 600 millisecondes, avant même qu'Aurèle ait eu le temps de descendre jusque-là. Le temps qu'elle scrolle, c'est déjà fini, donc pour elle ils ont toujours été là, immobiles — alors que le titre juste au-dessus, lui, était réglé pour se déclencher « quand il entre dans l'écran », donc à chaque fois qu'on arrive dessus en scrollant, peu importe quand.
        T2-b. Je ne l'ai pas vraiment « su », je l'ai déduit. Je n'ai pas de moyen de voir ce qu'Aurèle a vu exactement sur son ordinateur, je n'ai que sa phrase : « le titre bouge, les plats sont déjà là, immobiles ». Alors je suis allée comparer les réglages des deux, le titre et le bloc des plats, et j'ai vu qu'ils n'avaient pas le même « Démarre » — l'un « quand il entre dans l'écran », l'autre « dès l'ouverture de la page ». Ça collait avec ce qu'elle décrivait, donc j'ai fait l'hypothèse que c'était ça le problème, sans jamais l'avoir vu de mes yeux se produire.

### 29:56 · MESSAGE REÇU (segment 14)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

30:14 💬 Alors là, c'est une vraie petite chorégraphie avec cinq éléments dans un ordre précis, un timing serré (2,5 à 3 secondes maximum), et il faut que ça se rejoue à chaque fois qu'on revient sur la section. Vu la complexité, je pense que cette fois je vais essayer ce fameux « mode Animation » que j'avais repéré mais jamais ouvert — ça ressemble plus à ce que j'attendais dès le début, une sorte de mode prototype séparé, plus adapté pour orchestrer plusieurs éléments ensemble qu'un réglage élément par élément.
        [1] Je prends une capture pour voir où j'en suis.
30:15 ▶ #170 📷 capture
30:21 ▶ #171 👁 image 001-capture.png
30:25 💬 [2] Je fais défiler pour voir toute la section « La maison » : la photo, le titre, le paragraphe, et les chiffres.
30:27 ▶ #172 scroll 380 300 down 4
30:33 ▶ #173 📷 capture
30:39 ▶ #174 👁 image 002-capture.png
30:44 💬 [3] Voilà toute la scène : la photo, le titre, le paragraphe, et les trois chiffres en bas. Je clique sur la photo pour commencer, et je chercherai le lien vers le mode Animation dans son panneau.
30:46 ▶ #175 click 283 340
30:52 ▶ #176 📷 capture
30:58 ▶ #177 👁 image 003-capture.png
31:02 💬 [4] La photo est sélectionnée, « Photo de la salle ». Je vois une section « Animation » repliée tout en bas, je clique pour l'ouvrir.
31:04 ▶ #178 click 632 442
31:10 ▶ #179 📷 capture
31:16 ▶ #180 👁 image 004-capture.png
31:20 💬 [5] La section est ouverte, je vois « Apparition : Aucune », mais le reste est caché en dessous. Je fais défiler le panneau de droite pour voir la suite, notamment le lien vers le mode Animation.
31:22 ▶ #181 scroll 700 400 down 3
31:29 ▶ #182 📷 capture
31:35 ▶ #183 👁 image 005-capture.png
31:38 💬 [6] Voilà, tout en bas : « Ouvrir dans le mode Animation ». Je clique dessus.
31:40 ▶ #184 click 674 484
31:46 ▶ #185 📷 capture
31:51 ▶ #186 👁 image 006-capture.png
32:06 💬 [7] Ah, voilà le mode Animation, différent de la vue habituelle. Je lis le mode d'emploi : « 1. Quand — un élément lance l'animation... 2. Ce qui bouge — cet élément, ou d'autres, choisis ensuite... 3. Comment — un préréglage en un clic, ou vos propres images-clés sur la ligne de temps. » Je vois un bouton « Animer « Photo de la salle » » et plus bas une zone « Lancer une animation depuis « Photo de la salle » » avec « Quand : à l'entrée dans l'écran » déjà réglé — pratique, c'est le déclenchement au défilement qu'il me faut de toute façon. Je clique d'abord sur « Animer « Photo de la salle » » pour régler son propre mouvement d'arrivée.
32:08 ▶ #187 click 662 184
32:13 ▶ #188 📷 capture
32:19 ▶ #189 👁 image 007-capture.png
32:39 💬 [8] Là, ça se complique. Je vois des mots que je ne connais pas : « piste », « image-clé ». Je ne sais pas ce que ça veut dire précisément, mais je vois une ligne « Photo de la salle » avec un petit losange dessus sur une règle de temps 0 à 1000 ms, et en dessous une zone « PISTE · PHOTO DE LA SALLE » avec « Départ : 8 ms », « Cible : L'élément », et « Remplir avec : un préréglage... ». Ce mot-là, « préréglage », je le comprends, ça doit être comme les préréglages de transition dans Figma. Je vais essayer par là plutôt que de deviner ce que sont les image-clés. Je clique sur ce menu « Remplir avec un préréglage ».
32:41 ▶ #190 click 700 376
32:48 ▶ #191 📷 capture
32:54 ▶ #192 👁 image 008-capture.png
33:01 💬 [9] Voilà la même liste que d'habitude : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond, plus des effets au survol. Pour « arriver par le côté », je choisis « Apparition : Glissé depuis la gauche », puisque la photo est du côté gauche de la section.
33:03 ▶ #193 click 683 274
33:09 ▶ #194 📷 capture
33:16 ▶ #195 👁 image 009-capture.png
33:25 💬 [10] Attends, le résumé en haut dit « glissé à droite », pas « depuis la gauche » comme je voulais — je me suis trompée de ligne dans le menu, encore. Je corrige tout de suite en rouvrant le menu.
33:27 ▶ #196 click 700 361
33:33 ▶ #197 📷 capture
33:39 ▶ #198 👁 image 010-capture.png
33:45 💬 [11] Non, j'ai ouvert « Cible » par erreur. Je referme et je vise mieux, plus bas.
33:48 ▶ #199 key Escape
33:55 ▶ #200 🔍 loupe 700 380
34:01 ▶ #201 👁 image 011-loupe.png
34:14 💬 [12] Je vois que « Remplir avec » est repassé sur « un préréglage... » — ça doit être un bouton d'action plutôt qu'un champ qui garde sa valeur. Je le reclique, plus précisément cette fois.
34:16 ▶ #202 click 724 364
34:23 ▶ #203 📷 capture
34:28 ▶ #204 👁 image 012-capture.png
34:34 💬 [13] Cette fois le menu s'ouvre vers le haut. Je vise « Apparition : Glissé depuis la gauche », la ligne juste après « Glissé depuis la droite ».
34:37 ▶ #205 click 683 269
34:44 ▶ #206 📷 capture
34:50 ▶ #207 👁 image 013-capture.png
34:57 💬 [14] Je zoome sur le résumé en haut pour confirmer.
34:59 ▶ #208 🔍 loupe 700 75
35:06 ▶ #209 👁 image 014-loupe.png
35:18 💬 [15] Confirmé, c'est bon : « glissé depuis la gauche » en 700 ms. Je vois aussi qu'il y a un total de 1000 ms pour l'instant, et une case « une seule fois » qui n'est pas cochée — tant mieux, ça devrait pouvoir se rejouer. Maintenant j'ajoute les éléments suivants. Je clique sur « Choisir un élément » pour ajouter le titre.
35:20 ▶ #210 click 604 223
35:26 ▶ #211 📷 capture
35:33 ▶ #212 👁 image 015-capture.png
35:37 💬 [16] Il me demande de cliquer directement sur l'élément à animer dans le canevas. Je clique sur le titre.
35:40 ▶ #213 click 396 410
35:46 ▶ #214 📷 capture
35:53 ▶ #215 👁 image 016-capture.png
36:01 💬 [17] Une nouvelle piste « Titre 2 » est apparue, avec son propre panneau en dessous : Départ 0 ms, Cible L'élément, Remplir avec un préréglage. Je choisis d'abord son mouvement — « Fondu en montant », comme pour les titres précédents — puis je réglerai son départ pour qu'il arrive après la photo.
36:04 ▶ #216 click 700 357
36:11 ▶ #217 📷 capture
36:17 ▶ #218 👁 image 017-capture.png
36:20 💬 [18] Je clique sur « Apparition : Fondu en montant ».
36:22 ▶ #219 click 683 232
36:29 ▶ #220 📷 capture
36:36 ▶ #221 👁 image 018-capture.png
36:43 💬 [19] Bien, les deux pistes commencent en même temps pour l'instant (0 ms), ça correspond à « tout surgit d'un coup ». Je dois décaler le départ du titre à 700 ms, pour qu'il commence juste après la fin de la photo. Je clique sur le champ « Départ » de cette piste.
36:45 ▶ #222 click 640 314
36:53 ▶ #223 key cmd+a
37:00 ▶ #224 type 700
37:07 ▶ #225 key Tab
37:15 ▶ #226 📷 capture
37:22 ▶ #227 👁 image 019-capture.png
37:31 💬 [20] Ça marche : le résumé dit maintenant « ... puis Titre 2 (fondu en montant) de 700 à 1400 ms (1,4 s) ». Le titre démarre bien juste après la photo. Je vois que le champ « Cible » a le focus, je clique ailleurs d'abord par précaution, puis j'ajoute le paragraphe.
37:33 ▶ #228 key Escape
37:40 ▶ #229 click 604 247
37:46 ▶ #230 📷 capture
37:53 ▶ #231 👁 image 020-capture.png
37:58 💬 [21] Je clique sur le paragraphe pour l'ajouter comme piste.
38:01 ▶ #232 click 410 440
38:07 ▶ #233 📷 capture
38:13 ▶ #234 👁 image 021-capture.png
38:22 💬 [22] Il dit que « Titre 2 » est déjà sur la piste — j'ai dû recliquer sur le titre par erreur, sa zone doit déborder un peu. Je vise plus bas, en plein milieu du paragraphe.
38:24 ▶ #235 click 410 460
38:31 ▶ #236 📷 capture
38:38 ▶ #237 👁 image 022-capture.png
38:44 💬 [23] Le paragraphe est repéré cette fois, mais il n'est pas encore dans cette animation. Je clique sur « + Ajouter à cette animation ».
38:46 ▶ #238 click 654 303
38:53 ▶ #239 📷 capture
38:59 ▶ #240 👁 image 023-capture.png
39:06 💬 [24] Je choisis un mouvement pour le paragraphe — « se dévoile » ça peut être un simple fondu, je vais rester sobre plutôt que choisir un effet compliqué. Je clique sur « Remplir avec ».
39:09 ▶ #241 click 700 376
39:16 ▶ #242 📷 capture
39:22 ▶ #243 👁 image 024-capture.png
39:28 💬 [25] Je clique sur « Apparition : Fondu », tout simple.
39:30 ▶ #244 click 660 237
39:38 ▶ #245 📷 capture
39:45 ▶ #246 👁 image 025-capture.png
39:50 💬 [26] Je règle maintenant le départ du paragraphe à 1400 ms, juste après le titre.
39:52 ▶ #247 click 640 333
39:59 ▶ #248 key cmd+a
40:06 ▶ #249 type 1400
40:13 ▶ #250 key Tab
40:20 ▶ #251 📷 capture
40:27 ▶ #252 👁 image 026-capture.png
40:39 💬 [27] Le paragraphe est réglé : de 1400 à 2100 ms, en fondu simple. Total 2100 ms jusqu'ici, il me reste de la marge jusqu'à 2500-3000 ms pour les trois chiffres. Je dois faire défiler un peu le canevas pour voir la ligne des chiffres, elle est plus bas.
40:42 ▶ #253 scroll 380 400 down 2
40:46 💬 You've hit your session limit · resets 10:50pm (Europe/Paris)

### 948:04 · MESSAGE REÇU (segment 15)
The coordinator sent a message while you were working:
(Note du dispositif, hors séance : une interruption technique, indépendante de vous et de l'outil, a coupé la liaison pendant quelques minutes. Votre écran est resté tel que vous l'avez laissé et vos réglages sont enregistrés. Reprenez la mission là où vous en étiez, avec le même compte d'actions.)

Address this before completing your current task.

948:15 ▶ #254 📷 capture
948:31 ▶ #255 👁 image 027-capture.png
948:36 💬 [28] Bon, je reprends là où j'en étais, tout est resté en place. Je vois maintenant les trois chiffres « 12 », « 38 », « 14 ». Je clique sur « Choisir un élément » pour ajouter le premier.
948:39 ▶ #256 click 604 290
948:46 ▶ #257 click 306 431
948:56 ▶ #258 📷 capture
949:05 ▶ #259 👁 image 028-capture.png
949:15 💬 [29] La piste « Années » est ajoutée. Je choisis « Montée avec rebond » pour le petit effet qui va trop loin puis revient.
949:17 ▶ #260 click 700 376
949:25 ▶ #261 📷 capture
949:32 ▶ #262 👁 image 029-capture.png
949:41 ▶ #263 click 683 322
949:48 ▶ #264 📷 capture
949:56 ▶ #265 👁 image 030-capture.png
950:01 💬 [30] Bien, « Années (montée avec rebond) en 800 ms ». Je règle son départ à 2100 ms, juste après le paragraphe.
950:03 ▶ #266 click 640 333
950:11 ▶ #267 key cmd+a
950:17 ▶ #268 type 2100
950:24 ▶ #269 key Tab
950:33 ▶ #270 📷 capture
950:40 ▶ #271 👁 image 031-capture.png
951:00 💬 [31] Total 2900 ms jusqu'ici, avec « Années » qui va jusqu'à 2900. Il ne reste presque plus de marge pour les deux autres chiffres si je les fais suivre en séquence complète — je vais plutôt les faire se chevaucher légèrement, un décalage court plutôt qu'attendre la fin de chaque animation, pour rester proche de 2,5-3 secondes. J'ajoute « 38 ».
951:02 ▶ #272 click 604 314
951:11 ▶ #273 click 390 431
951:19 ▶ #274 📷 capture
951:25 ▶ #275 👁 image 032-capture.png
951:31 💬 [32] Piste « Couverts » ajoutée. Je choisis le même effet « Montée avec rebond ».
951:33 ▶ #276 click 700 376
951:41 ▶ #277 📷 capture
951:49 ▶ #278 👁 image 033-capture.png
951:55 ▶ #279 click 683 322
952:04 ▶ #280 📷 capture
952:11 ▶ #281 👁 image 034-capture.png
952:22 💬 [33] Bien, ça s'est ajouté mais démarre encore à 0 ms, en même temps que la photo. Je règle son départ à 2300 ms.
952:24 ▶ #282 click 640 333
952:31 ▶ #283 📷 capture
952:38 ▶ #284 👁 image 035-capture.png
952:45 💬 [34] Oups, j'ai rouvert « Choisir un élément » par erreur. J'annule avec Échap.
952:48 ▶ #285 key Escape
953:00 ▶ #286 click 588 318
953:08 ▶ #287 🔍 loupe 640 335
953:15 ▶ #288 👁 image 036-loupe.png
953:28 💬 [35] Je ne vois pas le champ « Départ » dans ce zoom, il doit être juste en dessous du bouton « Choisir un élément ». Je reprends une capture complète pour être sûre.
953:30 ▶ #289 📷 capture
953:38 ▶ #290 👁 image 037-capture.png
954:08 💬 [36] Le champ « Départ » n'apparaît pas cette fois, juste « Cible » et « Remplir avec ». Je vais essayer de cliquer directement sur le petit losange de départ de la piste « Couverts », sur la ligne de temps.
954:10 ▶ #291 click 624 318
954:18 ▶ #292 📷 capture
954:24 ▶ #293 👁 image 038-capture.png
954:43 💬 [37] Je vais essayer de cliquer en plein milieu de la barre de la piste, pas sur le losange ni sur le nom.
954:45 ▶ #294 click 660 318
954:52 ▶ #295 📷 capture
955:04 ▶ #296 👁 image 039-capture.png
955:44 💬 [38] — J'arrête tout de suite. En reprenant mon compte depuis le début de cette mission, je me rends compte que j'ai complètement perdu le fil : je suis très largement au-delà de la limite de 40 actions, sans doute le double. J'étais tellement prise par le blocage sur cette histoire de champ « Départ » qui disparaît que je n'ai plus compté correctement. Je m'arrête là, comme il se doit dès qu'on dépasse le budget.
        Agacement : 5 sur 5. Cette dernière mission m'a complètement perdue.
        Où j'en suis : j'ai réussi à construire une bonne partie de la scène dans le « mode Animation » — la photo glisse depuis la gauche (700 ms), puis le titre monte en fondu (700 à 1400 ms), puis le paragraphe se fond (1400 à 2100 ms), puis le premier chiffre « Années » (12) arrive avec un petit rebond (2100 à 2900 ms) — tout ça est bien enregistré et dans l'ordre demandé, en 2,9 secondes, donc dans le budget de temps voulu par Aurèle. Mais je me suis complètement enlisée sur le deuxième chiffre, « Couverts » (38) : une fois la piste ajoutée et l'effet « Montée avec rebond » appliqué, impossible de retrouver le champ « Départ » pour décaler son moment de départ — il était présent pour toutes les pistes précédentes, plus pour celle-ci. J'ai essayé de cliquer sur le nom de la piste, sur les losanges, sur la barre elle-même, rien n'a fait réapparaître ce réglage. Le troisième chiffre, « Producteurs » (14), je n'ai pas eu le temps de m'en occuper du tout.
        Donc en l'état, si Aurèle regarde la page maintenant : la photo, le titre, le paragraphe et le premier chiffre devraient bien s'enchaîner comme elle voulait, mais « Couverts » et « Producteurs » vont sans doute soit ne pas bouger, soit arriver en même temps que le début de la scène plutôt qu'à leur tour — je ne suis pas certaine du résultat exact pour ces deux-là, je n'ai pas pu vérifier en aperçu.
        FIN : budget
        ACTIONS : 88 (environ — j'ai perdu le compte précis, mais largement au-dessus de 40)

### 956:28 · MESSAGE REÇU (segment 16)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

956:40 💬 T4-SEQ. 1. La plus difficile de toutes, sans hésiter. J'ai fini par sortir du cadre que je m'étais fixé sans même m'en rendre compte tellement j'étais absorbée dedans.
        T4-R. Honnêtement, je ne suis pas sûre à 100 %, je n'ai pas pu vérifier en vrai avant la fin. Mais d'après ce que j'ai réglé : un visiteur qui descend jusqu'à « La maison » devrait voir la photo de la salle glisser depuis la gauche pour se mettre en place, en un peu moins d'une seconde. Ensuite le titre « Une cuisine de produits, servie sans chichi » devrait arriver en montant doucement, et juste après le paragraphe qui raconte l'histoire de la maison devrait se fondre à l'écran. Ça, je pense que ça devrait bien s'enchaîner, j'ai vérifié les chiffres dans le panneau et ça tombait autour de 2,9 secondes en tout pour ces quatre premières étapes, donc dans le temps qu'Aurèle voulait.
        Après, pour les trois chiffres en bas — les années, les couverts, les producteurs — c'est là que ça devient incertain. Le premier, « 12 années de service », je l'ai bien réglé avec le petit effet qui va un peu trop loin et revient, à la suite du paragraphe. Mais les deux autres, « 38 » et « 14 », je n'ai pas réussi à les caler après le premier : soit ils vont apparaître tous les deux au tout début, en même temps que la photo, soit ils ne bougeront pas du tout, je n'en suis pas certaine. Donc pour l'instant je pense que la scène est à moitié racontée : elle commence bien, mais la fin, avec les trois chiffres l'un après l'autre, ne doit pas se passer comme Aurèle l'imaginait.

### 956:57 · MESSAGE REÇU (segment 17)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

957:06 💬 T4-a. Je referais le même chemin que j'ai fait tout à l'heure quand j'ai réglé son départ à 1400 ms : je sélectionnerais la scène en cliquant sur la photo puis « Ouvrir dans le mode Animation », je repérerais la piste « Paragraphe » dans la liste, je cliquerais sur son champ « Départ », qui contenait « 1400 », je l'effacerais et j'écrirais un nombre plus petit, disons 1200. Ça devrait rapprocher son arrivée de celle du titre. Ceci dit, je ne suis pas certaine que ça se ferait sans accroc, vu que je viens de passer un temps fou à chercher ce même champ pour une autre piste et qu'il avait disparu.
        T4-b. De loin, c'est d'avoir cherché comment décaler le départ de la piste « Couverts » une fois que je l'ai ajoutée — le champ que j'avais utilisé sans problème trois fois de suite pour les pistes précédentes n'était plus là pour celle-ci, et je n'ai rien trouvé qui le remplace : ni en cliquant sur le nom de la piste, ni sur les losanges, ni sur la barre. Ça, à un moment donné, ça a dû me prendre plus de temps à moi toute seule que tout le reste de la mission.

### 957:20 · MESSAGE REÇU (segment 18)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

957:33 💬 D-FIN-1. Je lui dirais que c'est un outil où, quand on reste sur des réglages simples — sélectionner un élément, choisir comment il arrive, dire à quel moment — ça va vite et c'est plutôt agréable, presque aussi direct que Figma par moments. Mais dès qu'on veut faire quelque chose d'un peu construit, avec plusieurs éléments qui s'enchaînent, on tombe dans un mode à part avec des pistes et des images-clés, et là ça devient nettement plus technique, avec des bouts qui ne se comportent pas pareil d'un élément à l'autre. Je lui dirais aussi que j'ai souvent dû deviner ou refaire mes clics, que les menus ne s'ouvrent pas toujours où on les attend, et qu'une fois je suis restée bloquée un bon moment sur un réglage qui avait juste disparu.
        D-FIN-2. Le principe de base, avec un élément sélectionné : trois lignes bien nommées, Apparition, Au survol, En continu, chacune avec sa propre liste de choix. Ça, à chaque fois, je savais où regarder et ce que ça voulait dire, même sans connaître le mot exact d'avance. Et la petite phrase de résumé en dessous, du genre « au chargement de la page, tel élément arrive en fondu en 500 ms », ça, ça m'a souvent permis de vérifier que j'avais fait ce que je voulais sans avoir besoin de le voir bouger.
        D-FIN-3. Le mode Animation, pour la dernière mission, sans hésiter — les mots que je ne connaissais pas, « piste », « image-clé », mais surtout le fait que le comportement n'était pas régulier : un champ « Départ » qui marche pour régler trois pistes de suite et qui disparaît sur la quatrième, sans que je comprenne pourquoi. Et plus généralement, dans plusieurs missions, le fait de ne jamais réussir à sélectionner un élément parent de façon fiable — ni Échap, ni le fil d'Ariane, ni le lien direct dans le panneau ne marchaient à coup sûr, il a fallu que je tombe dessus par hasard en cliquant entre deux cartes. Ça, chaque fois, ça m'a fait perdre pied.

### 958:01 · MESSAGE REÇU (segment 19)
The coordinator sent a message while you were working:
Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

958:16 💬 D-FIN-4. Ce que je referais sans problème, seule, sans demander à personne : sélectionner un texte, une image, un bouton, et lui donner une arrivée simple — un fondu, un fondu qui monte, un glissé d'un côté — avec un déclenchement au défilement ou à l'ouverture de la page. Ça, maintenant que je l'ai fait plusieurs fois, je saurais le refaire chez moi les yeux fermés, et j'ajouterais bien un petit effet au survol sur un bouton, ça aussi c'était facile. Ce que je ne referais pas seule, ou en tout cas pas sans y passer un temps fou et sans doute finir agacée : tout ce qui touche à plusieurs éléments qui s'enchaînent dans un ordre précis — la fameuse scène de la dernière mission. Et je n'irais pas non plus chercher à corriger un problème sur un élément qui fait partie d'un groupe ou d'une liste répétée, comme les plats ou les chiffres — cette histoire de sélectionner le bon parent, je n'ai jamais trouvé le geste fiable pour ça, donc chez moi toute seule je crois que je laisserais tomber ou que je vivrais avec le défaut plutôt que de m'acharner.
        D-FIN-5. Oui, plusieurs. « Piste » et « image-clé », dans le mode Animation — je n'ai jamais vraiment su ce que ces mots voulaient dire précisément, j'ai juste compris avec l'usage qu'une « piste » c'est la ligne d'un élément sur le calendrier du bas, et qu'une « image-clé » c'est un des points sur cette ligne, mais je le dis avec mes mots, pas avec les leurs. Sur le moment je ne les ai pas cherchés ailleurs, j'ai juste essayé de m'en sortir avec les boutons et les formes plutôt qu'avec le vocabulaire. Il y avait aussi « cible », dans le même mode, où je n'étais pas sûre si ça parlait de l'élément qui bouge ou d'autre chose — j'ai supposé que c'était l'élément, et je crois que j'avais raison, mais je ne suis pas certaine à 100 %.
        D-FIN-6. Pour livrer un site simple à une cliente comme celle d'aujourd'hui, avec quelques animations sobres ici et là — un titre qui arrive, un bouton qui réagit au survol — je pense que ça aurait vraiment sa place dans mon travail, ça m'éviterait justement de tout renvoyer à un développeur pour ce genre de petites finitions. Mais pour une mise en scène plus construite, avec plusieurs éléments chorégraphiés ensemble comme aujourd'hui, je ne pense pas que je m'y risquerais pour un client qui a une date de livraison serrée, genre une réouverture demain matin — je crois que je proposerais quelque chose de plus simple plutôt que de m'embourber comme je l'ai fait à la fin.

### 958:47 · MESSAGE REÇU (segment 20)
The coordinator sent a message while you were working:
Merci.

D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

959:20 💬 D-FIN-7. « Ça en valait la peine », je l'ai pensé assez tôt, dès la première mission en fait — quand j'ai trouvé la section Animation directement dans le panneau, avec le déclenchement au défilement déjà réglé par défaut, sans que j'aie eu à le chercher. Je me suis dit que c'était bien pensé, plus direct que ce à quoi je m'attendais. Le moment inverse, où je me suis dit que ça ne valait plus la peine, c'est clairement à la fin, dans le mode Animation, quand le champ « Départ » a disparu sur la piste « Couverts » et que j'ai tourné en rond en cliquant partout sans rien trouver — là, j'étais prête à tout laisser tomber, et d'ailleurs sur un vrai projet chez moi je pense que je l'aurais fait.
        D-FIN-8. Ce qui m'arrêterait, c'est surtout de ne pas savoir si ce que je fais va vraiment marcher une fois publié, sans passer par quelqu'un d'autre pour vérifier. Je n'ai jamais pu voir un mouvement en train de se faire, seulement des réglages écrits et des captures figées avant et après. Pour un détail comme un survol de bouton, je peux vivre avec ce doute. Mais pour une scène entière, sur la page d'accueil, celle que voient tous les visiteurs en premier, je n'aimerais pas livrer ça à une cliente sans être sûre à 100 % du rendu — et vu la difficulté que j'ai eue à composer une scène simple, je pense que je repousserais ce genre de travail, ou que je resterais sur des animations toutes simples, élément par élément.
        D-FIN-9. Je lui dirais d'aller voir directement le site en aperçu, dans un vrai navigateur, si possible sur son téléphone en plus de son ordinateur, et de faire l'exercice d'un client qui arrive pour la première fois : ouvrir la page, descendre normalement, sans connaître ce qui a été réglé derrière, et regarder si ça a l'air naturel ou si ça surprend. Personnellement, en travaillant dans l'éditeur, je n'ai jamais pu être sûre à 100 % de ce que ça donnait juste avec les réglages écrits dans le panneau, donc je lui dirais de ne pas se fier qu'à ça non plus.
        D-FIN-10. Juste que dans l'ensemble, j'ai trouvé l'outil plus accueillant que je ne le pensais au début pour les choses simples — je m'attendais à devoir tout apprendre depuis zéro, et finalement les bases se sont retrouvées assez vite. Mais il y a un vrai écart entre ce premier niveau, facile, et le mode plus poussé pour composer plusieurs mouvements ensemble, qui m'a semblé beaucoup moins abouti, avec des réglages qui se comportent différemment d'un élément à l'autre sans raison apparente. Si j'étais Aurèle, ou une designer comme moi qui débute là-dedans, je pense que je resterais sagement du côté simple, et j'appellerais quelqu'un d'autre le jour où j'aurais besoin d'une vraie mise en scène.

### 959:29 · MESSAGE REÇU (segment 21)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

959:40 💬 Merci à vous. C'était intéressant à faire, même si la fin m'a un peu frustrée, mais bon, c'est bien pour ça que vous me demandez, non ?
