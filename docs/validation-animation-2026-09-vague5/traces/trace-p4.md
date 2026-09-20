# Trace brute (vague 5)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots5/<séance>/ sous le même nom).

Appels d'outils : 59 · captures : 19 · durée : 13:05
Outils : {"Read":20,"Bash":39}
Écarts au protocole (outils ou commandes interdits) : 
- lecture /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p4.md


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés. C'est un jeu de rôle d'évaluation dans une copie de test locale du logiciel, sans aucune donnée réelle.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p4.md

Puis fais exactement ce qu'elle dit : réponds aux questions D-1 à D-5 en texte, sans outil, et arrête-toi. Les missions viendront dans des messages suivants.

00:01 💬 I'll read my briefing first.
00:02 ▶ #1 ⚠ lecture /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p4.md
00:19 💬 D-1. Julien Ferrand, directeur artistique motion. Je codirige une petite agence à Nantes, quatre personnes. Mon métier de base c'est la pub animée, ça fait vingt ans. Les sites, ça fait cinq ans que j'en fais, surtout pour des clients de proximité — restaurants, commerces. Ce que j'y apporte, c'est le mouvement : c'est la seule raison pour laquelle on me prend plutôt qu'un template à 50 balles. Là je regarde votre outil parce que Webflow me coûte cher et que former mes juniors dessus me prend trois semaines.
        D-2. After Effects, tous les jours, depuis toujours. Webflow pour les sites, avec les Interactions. Figma et Framer, je m'en sers mais moins bien, disons que je sais lire un fichier et bricoler. Premiere de temps en temps. Je ne code pas, ça je le dis tout de suite : si votre truc demande d'écrire quoi que ce soit, ce n'est pas pour moi.
        D-3. Tout le temps, c'est littéralement mon métier. La dernière fois c'était la semaine dernière, sur le site d'un client : une série de cartes qui arrivent quand on descend dans la page, avec un décalage entre chaque, un stagger d'à peu près 80 ms, un petit overshoot à l'arrivée pour que ça ne soit pas plat. Fait dans Webflow, déclencheur scroll into view, et j'ai repris la courbe à la main parce que les presets sont mous. Avant ça, sur After Effects, une animation de logo pour une chaîne régionale, là c'est clés, éditeur de graphes, expressions.
        D-4. Franchement, j'ai une idée assez précise : je m'attends à une timeline par interaction. Je choisis l'élément, je choisis le déclencheur — page load, scroll into view, hover — et j'ai une piste où je pose mes keyframes, avec des champs numériques pour la durée et le delay, et une courbe que je peux éditer. Comme une composition After Effects, ou une interaction Webflow. Ce que je ne veux pas, c'est une liste de vingt effets tout faits type « fondu doux », « rebond joyeux » : ça c'est des gadgets, on n'en tire jamais ce qu'on veut. Ce qui me fera juger l'outil en deux minutes, c'est : est-ce que je peux taper 320 ms et 80 ms de décalage au clavier, oui ou non.
        D-5. Ça dépend entièrement du timing. Bien fait, ça hiérarchise, ça guide l'œil, ça donne de la valeur perçue — un restaurant qui a un site qui respire, ça change la note moyenne du menu dans la tête du client. Mal fait, c'est-à-dire trop long, trop de choses qui bougent en même temps, des trucs qui rejouent à chaque fois qu'on remonte, ça devient insupportable et ça fait amateur. La plupart des sites que je vois sont dans la deuxième catégorie, parce que les gens prennent le preset par défaut sans jamais toucher la durée. 600 ms partout, tout le monde fait ça, et c'est trop lent.

### 00:58 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

01:02 💬 Bon. Une scène séquencée sur une section, avec un stagger sur les trois chiffres et un overshoot à l'arrivée. Sur Webflow je ferais ça en dix minutes avec une interaction scroll into view et quatre actions décalées. Voyons ce que vous proposez.
        [1] Je commence par regarder l'écran pour voir à quoi ressemble l'éditeur et repérer où sont les réglages.
01:04 ▶ #2 📷 capture
01:07 ▶ #3 👁 image 001-capture.png
01:12 💬 L'interface est claire : des modes en haut — Écriture, Design, Animation, Code. Il y a un mode Animation dédié, bon point. En bas de la page je vois la section « LA MAISON » avec le titre et une photo.
        [2] Je clique directement sur « Animation », je m'attends à trouver une timeline.
01:14 ▶ #4 click 179 13
01:17 💬 [3] Je regarde ce que ça donne.
01:19 ▶ #5 📷 capture
01:22 ▶ #6 👁 image 002-capture.png
01:29 💬 Il y a un mode Animation avec un pavé « Comment ça marche » que je ne lis pas, un bloc « Lancer une animation depuis la page » avec un menu « Quand : Au défilement », et en dessous une longue liste d'animations existantes sur la page La carte. Ça sent plutôt le système de règles que la timeline, on verra.
        [4] Je fais défiler le canevas pour atteindre la section « La maison », il faut que je sélectionne mes éléments.
01:31 ▶ #7 scroll 300 300 down 6
01:34 💬 [5] Je regarde où j'en suis dans la page.
01:36 ▶ #8 📷 capture
01:40 ▶ #9 👁 image 003-capture.png
01:48 💬 Voilà ma scène : la photo à gauche, le sur-titre « LA MAISON », le titre, le paragraphe et les trois chiffres 12 / 38 / 14. 
        [6] Je clique dans un espace vide de la section pour sélectionner la section entière, je m'attends à voir apparaître des réglages pour elle.
01:49 ▶ #10 click 200 300
01:52 💬 [7] Je regarde ce qui est sélectionné.
01:54 ▶ #11 📷 capture
01:58 ▶ #12 👁 image 004-capture.png
02:09 💬 Bien, j'ai attrapé « Photo de la salle » — le fil d'Ariane en haut me le dit. Le panneau propose « Animer Photo de la salle » et, en dessous, « Lancer une animation depuis Photo de la salle » avec un « Quand : À l'entrée dans l'écran ». Donc un élément peut être déclencheur pour d'autres, ça ressemble à une interaction Webflow. Mais mon déclencheur, ce doit être la section entière.
        [8] Je clique sur « La maison » dans le fil d'Ariane pour sélectionner la section complète.
02:10 ▶ #13 click 668 36
02:14 💬 [9] Je regarde le panneau pour la section.
02:15 ▶ #14 📷 capture
02:19 ▶ #15 👁 image 005-capture.png
02:25 💬 La section « La maison » est sélectionnée. J'ai « Quand : À l'entrée dans l'écran » et « Animation : Nouvelle animation (à composer) ». C'est exactement mon déclencheur. Je compose.
        Point d'étape : j'ai trouvé le déclencheur en neuf actions, je n'ai pas encore vu l'ombre d'une timeline. Agacement 2.
        [10] Je clique sur « + Ajouter » pour créer l'animation, je m'attends à ce qu'une ligne de temps s'ouvre.
02:26 ▶ #16 click 766 286
02:29 💬 [11] Je regarde ce qui s'est ouvert.
02:30 ▶ #17 📷 capture
02:35 ▶ #18 👁 image 006-capture.png
02:50 💬 Ah, voilà autre chose. Une ligne de temps : un champ 1 000 ms, un délai en ms, une règle graduée 0-250-500-750-1000, des boutons de lecture, une case « à chaque passage » pour rejouer, et une liste « Éléments de la scène (10) » avec un bouton Ajouter par élément — et même « Chiffres · 3 éléments » avec « les 3 un à un ». Là on parle. C'est une composition, pas un gadget.
        [12] J'ajoute d'abord la photo de la salle comme première piste.
02:51 ▶ #19 click 768 299
02:55 💬 [13] Je regarde la piste créée.
02:56 ▶ #20 📷 capture
03:00 ▶ #21 👁 image 007-capture.png
03:04 💬 Une piste « Photo de la salle » s'est posée sur la ligne de temps, et en bas j'ai « PISTE · PHOTO DE LA SALLE » avec un « Départ : 0 ms » et une « Cible ». Des champs numériques, parfait.
        [14] Je fais défiler le panneau de droite pour voir tous les réglages de la piste.
03:06 ▶ #22 scroll 690 450 down 5
03:09 💬 [15] Je regarde les réglages de la piste.
03:11 ▶ #23 📷 capture
03:15 ▶ #24 👁 image 008-capture.png
03:20 💬 Je vois « Échelle 1 », « Rotation 0 ° », « Flou 0 px » — des champs numériques par propriété. J'ai sauté un bout, je remonte un peu.
        [16] Je remonte légèrement dans le panneau pour voir ce qu'il y a entre le départ de la piste et ces propriétés.
03:21 ▶ #25 scroll 690 450 up 2
03:25 💬 [17] Je regarde.
03:26 ▶ #26 📷 capture
03:30 ▶ #27 👁 image 009-capture.png
03:36 💬 Le panneau est terriblement à l'étroit : la liste des dix éléments mange tout et il me reste trois centimètres en bas pour les réglages de piste. Je replie la liste.
        [18] Je clique sur le triangle de « Éléments de la scène (10) » pour la replier et récupérer de la place.
03:37 ▶ #28 click 566 287
03:41 💬 [19] Je regarde si j'ai gagné de la place.
03:43 ▶ #29 📷 capture
03:47 ▶ #30 👁 image 010-capture.png
04:01 💬 La liste repliée, j'ai enfin les réglages : « Départ » en ms, « Cible », « Remplir avec : un préréglage… », une « IMAGE-CLÉ À 0 MS » avec un champ « Temps » en ms, et une section « Mouvement » avec l'opacité. Donc j'ai bien des images-clés posées dans le temps. 
        Point d'étape : j'ai la composition, le déclencheur et des champs en ms ; il me reste à remplir quatre pistes. Agacement 2, surtout à cause de la fenêtre riquiqui.
        [20] J'ouvre « Remplir avec » — normalement c'est un préréglage qui me pose les deux clés, je les corrigerai après.
04:03 ▶ #31 click 700 339
04:07 💬 [21] Je regarde les choix proposés.
04:09 ▶ #32 📷 capture
04:14 ▶ #33 👁 image 011-capture.png
04:20 💬 La liste : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond, puis deux Survol. Je note « Montée avec rebond », ce sera mon overshoot pour les chiffres. Pour la photo, qui est à gauche, je prends le glissé depuis la gauche.
        [22] Je choisis « Apparition · Glissé depuis la gauche » pour la photo.
04:22 ▶ #34 click 665 417
04:30 💬 Je dois maintenant ajouter les trois autres pistes ; je rouvre la liste des éléments.
        [23] Je rouvre « Éléments de la scène ».
04:32 ▶ #35 click 566 287
04:35 💬 [24] Je regarde l'état de la piste photo et la liste.
04:38 ▶ #36 📷 capture
04:43 ▶ #37 👁 image 012-capture.png
05:05 💬 Aïe. Mon clic n'a pas replié la liste : il a créé une piste « La maison » — la section entière — et le panneau du bas est maintenant « PISTE · LA MAISON ». La mise en page a bougé sous ma souris parce que la phrase de résumé en haut est passée sur deux lignes. Ça, c'est pénible. En revanche la phrase me confirme : « Photo de la salle » glissé depuis la gauche en 700 ms. Et la photo a disparu du canevas, ce qui est normal puisque la tête de lecture est à 0 et qu'elle est censée être hors cadre.
        [25] Je supprime cette piste « La maison » parasite avec la corbeille en haut à droite du bloc.
05:08 ▶ #38 click 779 326
05:12 💬 [26] Je vérifie que la piste parasite est partie et je cherche la liste des éléments.
05:14 ▶ #39 📷 capture
05:20 ▶ #40 👁 image 013-capture.png
05:33 💬 La piste parasite est partie, il ne reste que « Photo de la salle ». Au passage, la case « Rejouer : à chaque passage » est décochée, et la cliente veut que ça rejoue à chaque retour.
        [27] Je coche « à chaque passage ».
05:36 ▶ #41 click 566 145
05:40 💬 [28] Je rouvre la liste des éléments pour ajouter les trois pistes suivantes.
05:42 ▶ #42 click 566 296
05:46 💬 [29] Je regarde la liste et la case cochée.
05:48 ▶ #43 📷 capture
05:54 ▶ #44 👁 image 014-capture.png
06:07 💬 La case « à chaque passage » est bien cochée, et le résumé en haut le confirme. La liste est rouverte, « Photo de la salle » est marquée « • piste ».
        [30] J'ajoute le titre « Une cuisine de… » comme deuxième piste.
06:10 ▶ #45 click 768 367
06:13 💬 [31] Je vérifie que la liste n'a pas bougé sous ma souris.
06:16 ▶ #46 📷 capture
06:22 ▶ #47 👁 image 015-capture.png
06:34 💬 La liste a encore glissé de deux crans vers le bas parce que le résumé est passé à trois lignes — je dois recapturer à chaque fois pour ne pas cliquer à côté. Ça, c'est un vrai défaut. La piste « Titre 2 » est en place, et le bloc « Remplir avec » en bas la concerne.
        [32] J'ouvre « Remplir avec » pour donner au titre une montée en fondu.
06:37 ▶ #48 click 700 469
06:41 💬 [33] Je regarde où le menu s'est ouvert.
06:43 ▶ #49 📷 capture
06:49 ▶ #50 👁 image 016-capture.png
06:54 💬 Le menu s'est ouvert vers le haut cette fois. « Fondu en montant », c'est ce que je veux pour le titre : il s'élève en apparaissant.
        [34] Je choisis « Apparition · Fondu en montant ».
06:57 ▶ #51 click 665 343
07:01 💬 [35] Je regarde l'état de la scène et je repère la liste pour la suite.
07:04 ▶ #52 📷 capture
07:09 ▶ #53 👁 image 017-capture.png
07:19 💬 Le résumé dit : photo glissée depuis la gauche en 700 ms **et** titre en fondu montant en 700 ms — donc les deux partent en même temps, il faudra que je décale les départs. Les deux pistes commencent bien à 0 sur la règle.
        [36] J'ajoute le paragraphe « Aurèle et Nils ont… ».
07:22 ▶ #54 click 768 404
07:26 💬 [37] Je recapture pour retrouver la ligne des chiffres, qui a sûrement encore glissé.
07:28 ▶ #55 📷 capture
07:34 ▶ #56 👁 image 018-capture.png
07:38 💬 Encore un décalage vers le bas : le résumé est passé à quatre lignes. Les trois pistes sont là. Il me reste les chiffres.
        [39] Je clique sur « les 3 un à un » à droite de « Chiffres · 3 éléments » pour les faire arriver l'un après l'autre.
07:42 ▶ #57 click 765 440
07:45 💬 [40] Dernière capture, je regarde où j'en suis.
07:48 ▶ #58 📷 capture
07:53 ▶ #59 👁 image 019-capture.png
08:05 💬 J'ai une piste « Chiffres · enfants » qui apparaît sur la ligne de temps, mais le résumé dit que le paragraphe et les chiffres n'ont pas encore d'images-clés — donc pour l'instant ils ne bougent pas. Et les quatre pistes partent toutes à 0, la scène entière fait 1 000 ms.
        Où j'en suis : la structure est bonne — j'ai bien une composition par déclencheur, des pistes, des champs en ms, une case « à chaque passage » cochée, et une entrée « les 3 un à un » pour l'échelonnement. Mais il ne me reste rien pour faire le vrai travail : décaler les quatre départs, passer la durée totale à 2 500, mettre l'overshoot sur les chiffres et enlever le mouvement du paragraphe qui n'en a pas encore. Ce n'est pas l'outil qui m'a bloqué, c'est le temps que je perds à recapturer l'écran à chaque clic : le résumé en haut du panneau grandit d'une ligne à chaque piste ajoutée et pousse toute la liste vers le bas, donc une cible que j'ai repérée à l'écran n'est plus au même endroit deux secondes plus tard. J'ai d'ailleurs créé une piste parasite comme ça, en voulant replier une liste. Sur un panneau de cette taille, ça c'est inacceptable : dans After Effects ma liste de calques ne se déplace pas quand j'ajoute un calque.
        Agacement : 3. L'outil sait faire ce qu'on me demande, j'en suis à peu près sûr, mais il m'a coûté deux fois trop de gestes pour arriver à mi-chemin.
        FIN : budget
        ACTIONS : 40

### 09:02 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

09:19 💬 T4-SEQ. 4.
        Le modèle est juste, c'est ça qui me fait mettre 4 et pas 2 : une composition par déclencheur, des pistes, des ms, un échelonnement pour les enfants — c'est ce que j'attendais. Ce qui plombe la note, c'est la manipulation. Le panneau est étroit, la liste des éléments et les réglages de piste se disputent quarante pixels, et surtout la phrase de résumé en haut grossit d'une ligne à chaque piste ajoutée et pousse toute la liste vers le bas. Résultat : la moitié de mes actions sont des captures pour re-repérer un bouton que je venais de voir, et j'ai créé une piste dont je ne voulais pas en cliquant sur une cible qui avait bougé. Sur le fond, facile ; sur la forme, laborieux.
        T4-R. Aujourd'hui, en l'état, voilà ce que voit le visiteur, et ce n'est pas ce qu'Aurèle a demandé.
        Il descend la page, la section « La maison » entre dans l'écran, et deux choses partent en même temps : la photo de la salle glisse depuis la gauche en 700 ms, et le titre « Une cuisine de produits » apparaît en montant, aussi en 700 ms. En même temps, pas l'un après l'autre — le résumé du panneau le disait et les deux pistes démarraient bien toutes les deux à zéro sur la règle. Donc il n'y a pas de scène, il y a un seul mouvement à deux voix qui dure sept dixièmes de seconde.
        Le paragraphe et les trois chiffres, eux, ne bougent pas du tout. J'ai créé leurs pistes, mais l'outil m'a écrit noir sur blanc qu'elles n'ont pas d'images-clés. Une piste vide, ça ne fait rien. Donc le texte et les 12 / 38 / 14 sont là dès le départ, fixes, pendant que la photo et le titre arrivent. Et évidemment pas d'overshoot sur les chiffres, puisqu'il n'y a rien dessus.
        La seule chose qui est bonne, c'est le rejeu : j'ai coché « à chaque passage », donc s'il remonte et redescend, ça se rejouera. Et le déclencheur est le bon, l'entrée de la section dans l'écran.
        Pour être honnête, je ne l'ai pas vérifié en conditions de visiteur — je n'ai pas lancé le « Tester sur le site », je me suis arrêté avant. Mais je n'ai pas besoin de le voir : deux pistes remplies qui démarrent à zéro et deux pistes vides, je sais ce que ça donne. En l'état je ne le montre pas à la cliente, c'est un quart du travail.

### 10:31 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

10:47 💬 T4-a. Simple, sur le papier : je clique sur la piste « Paragraphe » dans la ligne de temps, et en dessous j'ai un bloc « PISTE · … » avec un champ « Départ » en millisecondes. Je tape la valeur que je veux et c'est fini. C'est exactement ce que je cherchais en arrivant, et c'est le seul endroit où votre outil m'a tout de suite donné ce que j'attends : un chiffre, pas un curseur mou.
        J'essaierais probablement aussi d'attraper la barre de la piste directement sur la règle et de la faire glisser vers la gauche, par réflexe — mais ça je ne l'ai pas testé, donc je ne sais pas si ça marche chez vous. Si ça ne marche pas, c'est un manque : quand on a quatre pistes à caler les unes derrière les autres, on le fait à la souris en regardant l'ensemble, pas en tapant huit fois dans un champ.
        Une réserve quand même : dans l'état actuel la question ne veut rien dire, parce que ma piste paragraphe est vide. La faire arriver plus tôt, c'est faire arriver plus tôt quelque chose qui ne se produit pas. Il faudrait d'abord que je lui donne un mouvement — un fondu — et ensuite seulement que je règle son départ.
        T4-b. Le repérage à l'écran, très largement. Pas la réflexion, pas les réglages : le fait de retrouver où cliquer.
        Trois choses se cumulent. Un, la phrase de résumé en haut du panneau s'allonge d'une ligne à chaque piste ajoutée, et tout ce qu'il y a en dessous descend d'autant. Donc à chaque ajout, la liste des éléments n'est plus au même endroit, et je dois refaire une capture avant de cliquer. C'est comme ça que j'ai créé une piste « La maison » dont je ne voulais pas, en visant un bouton qui n'était plus là. Deux, le panneau est une colonne étroite où la ligne de temps, la liste des dix éléments et les réglages de la piste se partagent la même hauteur : à un moment je n'avais que trois centimètres pour les réglages, j'ai dû replier la liste pour les lire, puis la rouvrir pour ajouter la piste suivante, puis la replier… Trois, dans cette liste il y a à la fois des boutons « Ajouter » alignés à droite et un « Ajouter « La maison » » juste au-dessus, tous pareils : rien ne me dit visuellement lequel crée quoi.
        Pour comparer : dans After Effects ou dans Webflow, la liste des calques ne bouge pas quand j'ajoute un calque, et la timeline a sa propre zone en bas, large, qui ne se fait pas voler sa place par autre chose. Ici la composition est bonne mais elle est servie dans un tiroir. C'est vraiment ça qui m'a coûté la mission, pas le concept.

### 11:17 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

11:40 💬 D-FIN-1. Je dirais que j'ai vu un outil qui a compris quelque chose que la plupart des concurrents n'ont pas compris, et qui l'a rangé dans un placard trop petit.
        Concrètement : « ils ont fait une vraie timeline ». Pas une liste d'effets avec trois cases à cocher — une composition par déclencheur, avec des pistes, des images-clés posées dans le temps, une durée et un départ en millisecondes, et même un truc pour faire arriver trois enfants l'un après l'autre en un clic. Ça, dans un créateur de sites, ce n'est pas courant. Si le reste suit, je peux imaginer y mettre mes juniors.
        Et tout de suite après je dirais : « sauf que j'ai passé la moitié du temps à chercher où cliquer ». J'ai fait quarante gestes pour arriver au quart du travail, j'ai créé une piste par erreur parce que l'interface s'était décalée sous ma souris, et je n'ai jamais vu la scène jouer. Pour être clair : je ne suis pas sorti de là convaincu, je suis sorti intéressé. Ce n'est pas la même chose. Je referais un essai quand ils auront donné de la place à cette timeline.
        D-FIN-2. Deux choses, très nettes.
        D'abord le trio déclencheur / élément / temps. On sélectionne l'élément, on a « Quand : à l'entrée dans l'écran », on ajoute une animation, on obtient une composition. Ce chemin-là, je l'ai fait en neuf gestes sans lire une ligne d'aide, ce qui veut dire qu'il est bien fichu. Un junior à qui je montre ça une fois le refait.
        Ensuite la phrase de résumé en haut. Elle m'a dit, en français, exactement ce que l'animation faisait : photo glissée depuis la gauche en 700 ms, titre en fondu montant en 700 ms, à chaque passage, et les autres pistes n'ont pas encore d'images-clés. C'est elle qui m'a appris que mes deux pistes partaient en même temps et que deux autres étaient vides. C'est intelligent, je ne l'ai vu nulle part ailleurs, et je n'aurais pas su l'état réel de mon travail sans elle.
        Je note aussi que les champs sont des vrais chiffres : ms partout, échelle, rotation, flou. Pas de « doux / moyen / rapide ». Merci.
        D-FIN-3. La mise en page qui bouge toute seule. C'est le vrai problème, et ce n'est pas un détail d'esthétique.
        Cette même phrase de résumé que je viens de complimenter s'allonge d'une ligne chaque fois que j'ajoute une piste, et pousse vers le bas tout ce qui la suit. Donc l'endroit que je viens de repérer n'est plus valable au geste d'après. Dans un outil où l'on empile des pistes, c'est-à-dire où l'on fait dix fois la même action, avoir une cible qui se déplace après chaque action, c'est disqualifiant. J'y ai perdu des gestes et j'ai créé une piste fantôme.
        Ce qui m'a dérouté ensuite, c'est le partage de la place. Ligne de temps, liste des dix éléments et réglages de la piste sélectionnée sont empilés dans la même colonne étroite, et ils se volent la hauteur : pour lire les réglages j'ai dû replier la liste, pour ajouter une piste la rouvrir, et ainsi de suite. Une timeline, ça se met en bas, sur toute la largeur. C'est comme ça dans After Effects, dans Premiere, dans Figma quand ils font du prototype, et ce n'est pas un hasard : on a besoin de voir les départs des quatre pistes en même temps pour juger d'un enchaînement. Là je les voyais, mais dans une bande de deux centimètres de haut.
        Troisième chose, plus mineure mais agaçante : les boutons « Ajouter ». Il y a une colonne d'« Ajouter » à droite de chaque élément, et juste au-dessus un « Ajouter « La maison » » qui a exactement la même tête et qui, lui, ajoute la section entière. Rien ne les distingue à l'œil. C'est précisément celui-là que j'ai déclenché par accident.
        Et une dernière, dont je ne sais pas quoi penser : j'ai ajouté les trois chiffres avec « les 3 un à un », et j'ai obtenu une seule piste appelée « Chiffres · enfants ». Une piste pour trois éléments décalés. C'est peut-être très bien, mais je n'ai pas eu le temps de voir où se règle le décalage entre les trois, et une piste unique pour trois objets, ce n'est pas ce que mon œil d'After Effects attend. Là-dessus je reste sur ma faim.

### 12:10 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci.

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

12:26 💬 D-FIN-10. Oui, trois ou quatre choses, puisque vous demandez.
        Sur l'outil, d'abord un point que je n'ai pas eu le temps de vérifier et qui décidera de tout pour moi : les courbes. J'ai vu des préréglages « Fondu en montant », « Montée avec rebond », et des champs numériques par propriété — mais je n'ai jamais vu où on règle l'accélération. Est-ce que j'ai accès à une courbe éditable, une cubic-bezier que je peux tirer, ou est-ce que je suis coincé avec le easing que le préréglage a décidé ? Si c'est la deuxième réponse, tout ce que j'ai dit de bien sur votre timeline ne sert à rien : un mouvement, c'est sa courbe. Un rebond dont je ne peux pas régler l'amplitude ni le retour, je ne peux pas le vendre.
        Ensuite, la prévisualisation. J'ai lu qu'il fallait faire glisser la tête de lecture pour voir la scène se jouer, et il y avait des boutons de transport. Par réflexe j'aurais appuyé sur la barre d'espace, comme partout ailleurs — je ne l'ai pas essayé, mais si ça ne lance pas la lecture, faites-le, ça coûte trois lignes et ça vous évite que dix personnes comme moi cherchent. Et un vrai bouton « jouer la scène en boucle » bien visible, parce qu'on règle un timing en le regardant tourner vingt fois, pas en déplaçant un curseur à la main.
        Troisième chose, sur le décalage. Votre « les 3 un à un » est une bonne idée, mais il me faut le chiffre : combien de millisecondes entre chaque. 60, 80, 120, ce n'est pas la même animation du tout, et c'est là que se joue la différence entre un site qui a l'air cher et un site qui a l'air d'un template. Si la valeur est cachée ou imposée, c'est un gadget de plus.
        Et une remarque de fond : vous avez visiblement travaillé sur les mots. Les libellés en français sont compréhensibles, « à chaque passage », « à l'entrée dans l'écran », la phrase de résumé — c'est du travail bien fait et ça évitera à mes juniors de deviner. Mais quelqu'un chez vous a soigné le vocabulaire et personne n'a soigné la géométrie de l'écran. Un outil de motion, ça se juge au nombre de gestes pour caler un timing. Le vôtre est bon sur le fond et mauvais sur ce compte-là. Donnez sa vraie place à cette timeline, arrêtez de faire bouger la mise en page sous la souris, et vous avez quelque chose.
        Sur la séance : rien à redire, c'était clair, et le fait que vous ne répondiez pas pendant les missions est la bonne méthode. Le seul reproche, c'est de m'avoir coupé à la moitié : j'aurais aimé aller jusqu'au bout pour vous dire si le résultat tient la route, parce que juger un outil d'animation sans avoir vu une seule animation se jouer, c'est un peu frustrant.

### 12:49 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

13:05 💬 Très bien. Bonne chance avec la suite — et tenez-moi au courant quand la timeline aura sa place en bas de l'écran et que je pourrai tirer une courbe. À ce moment-là je reprends une heure pour refaire cette scène en entier, ça m'intéresse vraiment de savoir si ça tient.
        Séance terminée de mon côté.
        ---
        Rapport de fin de séance (participant simulé P4 · Julien Ferrand, DA motion, 46 ans, profil expert After Effects / Webflow)
        **Mission T4 (scène séquencée sur la section « La maison ») : non terminée, arrêt sur budget à 40 actions, environ 25 % de la tâche faite.**
        État laissé dans l'éditeur : une animation « Animation · La maison » déclenchée à l'entrée de la section dans l'écran, rejeu « à chaque passage » coché (exigence client satisfaite), durée totale restée à 1 000 ms, et quatre pistes — Photo de la salle (glissé depuis la gauche, 700 ms), Titre 2 (fondu en montant, 700 ms), Paragraphe « Aurèle et Nils ont… » (vide), Chiffres · enfants (vide). Les quatre pistes démarrent toutes à 0 : aucun séquencement, pas d'overshoot sur les chiffres, durée totale non portée à 2 500 ms.
        Ce qui a marché sans aide : le chemin sélection d'élément → « Quand : à l'entrée dans l'écran » → « + Ajouter » → composition, parcouru en 9 actions sans lire un seul texte d'aide. La phrase de résumé en haut du panneau a été le seul moyen pour le participant de connaître l'état réel de son travail (pistes vides, départs simultanés) ; il l'a explicitement saluée.
        Problème principal, à l'origine de l'échec : **la mise en page se décale sous la souris**. Cette même phrase de résumé gagne une ligne à chaque piste ajoutée et pousse vers le bas la liste des éléments ; une cible repérée n'est plus valable au geste suivant. Conséquences observées : une capture d'écran obligatoire avant presque chaque clic (la moitié du budget d'actions), et la création accidentelle d'une piste « La maison » (section entière) qu'il a fallu supprimer.
        Problèmes secondaires : la colonne unique fait cohabiter ligne de temps, liste des 10 éléments et réglages de piste, au point qu'il ne restait qu'une soixantaine de pixels pour les réglages (le participant a dû replier puis rouvrir la liste) ; les boutons « Ajouter » de la liste et le bouton « + Ajouter « La maison » » sont visuellement identiques alors qu'ils créent des choses différentes — c'est exactement celui-là qui a été déclenché par erreur ; « les 3 un à un » produit une piste unique « Chiffres · enfants », ce qu'un profil After Effects ne comprend pas spontanément et dont il n'a pas trouvé le réglage de décalage.
        Attentes d'expert non vérifiées faute de temps, mais citées comme décisives : accès à une courbe d'accélération éditable (sans quoi « la timeline ne sert à rien »), valeur numérique du décalage entre enfants, barre d'espace pour lancer la lecture, lecture en boucle.
        Jugement global du participant : 4/7 en difficulté ; modèle conceptuel jugé juste et rare pour un créateur de sites (« une vraie timeline »), exécution de l'interface jugée disqualifiante pour un travail répétitif. Verdict : intéressé, pas convaincu, prêt à réessayer.
