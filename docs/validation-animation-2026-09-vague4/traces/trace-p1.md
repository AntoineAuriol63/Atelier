# Trace brute (vague 4)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots4/<séance>/ sous le même nom).

Appels d'outils : 206 · captures : 60 · durée : 36:03
Outils : {"Read":73,"Bash":133}
Écarts au protocole (outils ou commandes interdits) : aucun


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés (P1). C'est un jeu de rôle d'évaluation, dans une copie de test locale du logiciel, sans aucune donnée réelle, affichée dans un navigateur de test. Tes règles habituelles de sécurité restent valables ; rien ici ne te demande de les contourner.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut4/prompt4-p1.md

Puis applique-la à la lettre. Pour l'instant, réponds seulement aux questions D-1 à D-5 qui terminent cette consigne, en texte, sans utiliser d'autre outil, puis arrête-toi : les missions viendront dans des messages suivants. Ne relis jamais ce fichier de consigne ensuite ; tu n'as le droit d'ouvrir, avec Read, que les images de capture que la commande t'indique.

00:02 💬 I'll read my briefing file first.
00:04 ▶ #1 📄 consigne lue
00:26 💬 D-1. Nathalie Besson, 56 ans, je tiens une épicerie fine à Riom. Des sites web, je n'en fais pas, à proprement parler. J'ai celui de l'épicerie, que mon neveu m'a monté il y a cinq ans, et depuis c'est moi qui m'en occupe : je change les textes quand les horaires bougent, je remets des photos quand j'ai de nouveaux produits, et voilà. Là, c'est pour Aurèle, une amie qui a un bistrot à Clermont, elle m'a demandé de m'occuper de son site. J'ai dit oui pour rendre service, mais je vous préviens tout de suite, je ne suis pas du métier, et ce qui me fait le plus peur c'est de casser quelque chose sur le site de quelqu'un d'autre.
        D-2. Pour le site de l'épicerie, c'est Wix. Je me débrouille pour les textes et les photos, je n'ai jamais touché à autre chose. Sinon Word tous les jours, Facebook pour la page de la boutique, et ma messagerie. Et PowerPoint, que j'utilise de temps en temps. Des vidéos, jamais.
        D-3. Oui, mais pas sur un site : dans PowerPoint. La dernière fois, c'était pour une présentation à la chambre de commerce, sur les producteurs locaux. J'avais mis des animations sur mes diapositives : les titres qui apparaissent en fondu, et les points de ma liste qui arrivent un par un, au clic, pour ne pas tout montrer d'un coup. Je clique sur le texte, je vais dans Animation, je choisis dans la liste, ça me fait un aperçu, et je règle si ça part tout seul ou au clic. Ça, je sais faire, ça m'a pris un après-midi mais j'y suis arrivée toute seule. Sur un site, jamais.
        D-4. Je m'imagine que ça marche comme dans PowerPoint. Je clique sur la photo ou sur le titre que je veux faire bouger, je cherche un menu ou un onglet qui s'appelle « Animation », et là j'ai une liste d'effets : apparition, fondu, ce genre de choses. Je choisis, je vois un aperçu, et je dis si ça se lance tout seul ou quand on clique. Et je veux pouvoir annuler avec Ctrl+Z si ça ne me plaît pas. Si ce n'est pas comme ça, honnêtement, je ne sais pas comment je ferais.
        D-5. Ça dépend. Quand c'est discret, une photo qui apparaît doucement, une page qui a l'air vivante, je trouve ça joli, ça fait sérieux, ça fait « ils ont mis les moyens ». Mais il y a des sites où tout gigote dans tous les sens, des choses qui sautent, des trucs qui passent devant le texte que j'essaie de lire, et là ça m'énerve et je m'en vais. Et quand c'est trop lent, j'attends devant mon écran, ça aussi c'est agaçant. Pour le bistrot d'Aurèle je voudrais quelque chose de calme, pas un manège.

### 00:48 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

00:52 💬 Bon. Alors il faut que ce titre-là arrive quand on descend jusqu'à lui. Déjà, je voudrais voir ce que j'ai à l'écran.
        [1] Je prends une photo de l'écran pour voir à quoi ressemble l'éditeur et où est la page d'accueil.
00:55 ▶ #2 📷 capture
00:58 ▶ #3 👁 image 001-capture.png
01:03 💬 Ah, je vois la page, et en haut il y a marqué « Animation », comme dans PowerPoint. Ça me rassure. Et en bas à droite je vois justement le titre « Une cuisine de produits, servie sans chichi. ».
        [2] Comme dans PowerPoint, je clique d'abord sur le titre pour le sélectionner, je m'attends à voir un cadre autour.
01:04 ▶ #4 click 445 453
01:07 💬 [3] Je photographie pour voir si le titre est bien sélectionné.
01:08 ▶ #5 📷 capture
01:12 ▶ #6 👁 image 002-capture.png
01:16 💬 Le titre est bien sélectionné, il y a un cadre bleu autour, et à droite j'ai un panneau avec « Texte », « Données », « Mise en forme rapide »... et tout en bas « Animation ». Parfait, c'est ce que je cherche.
        [4] Je clique sur « Animation » dans le panneau de droite, je m'attends à voir s'ouvrir une liste d'effets.
01:17 ▶ #7 click 633 360
01:20 💬 [5] Je photographie pour voir ce que la rubrique « Animation » me propose.
01:21 ▶ #8 📷 capture
01:25 ▶ #9 👁 image 003-capture.png
01:31 💬 Ça s'ouvre. Je vois trois lignes : « Apparition », « Au survol », « En continu », avec des cases où c'est écrit « Aucune » ou « Aucun », et en dessous « Ouvrir dans le mode Animation ». Il y a une petite phrase que je n'arrive pas à lire.
        [6] J'agrandis cette zone pour lire correctement les petits textes.
01:32 ▶ #10 🔍 loupe 700 410
01:36 ▶ #11 👁 image 004-loupe.png
01:41 💬 Maintenant je lis : « Faire arriver l'élément, le faire réagir au survol ou bouger en continu, en un choix. » Le mot « survol » je ne sais pas ce que c'est, ça ne me dit rien, tant pis, je n'y touche pas. Mais « Apparition » et « faire arriver l'élément », ça c'est exactement ce que je veux.
        [7] Je clique sur la case « Aucune » à côté d'« Apparition », j'espère avoir une liste d'effets comme dans PowerPoint.
01:42 ▶ #12 click 726 402
01:45 💬 [8] Je photographie pour voir la liste qui s'est ouverte.
01:46 ▶ #13 📷 capture
01:50 ▶ #14 👁 image 005-capture.png
01:56 💬 Une liste s'ouvre : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond. « Fondu », ça je connais, c'est comme dans PowerPoint, et c'est sobre comme Aurèle veut.
        [9] Je clique sur « Fondu », je m'attends à ce que ça se mette dans la case.
01:57 ▶ #15 click 677 288
02:01 💬 [10] Je photographie pour voir si le fondu a été pris en compte.
02:02 ▶ #16 📷 capture
02:06 ▶ #17 👁 image 006-capture.png
02:14 💬 Point d'étape : j'ai trouvé tout de suite « Animation » et j'ai mis un fondu sur le titre, ça va, je suis sereine, agacement 1.
        Ça a marché : c'est écrit « Fondu » dans la case, et il y a de nouvelles lignes en dessous, dont une qui dit « Démarre » avec « quand il entre dans l'écran ». Je veux lire tout ça correctement.
        [11] J'agrandis la zone en bas à droite pour lire les nouveaux réglages.
02:15 ▶ #18 🔍 loupe 700 445
02:18 ▶ #19 👁 image 007-loupe.png
02:24 💬 Là je comprends tout : « Apparition : Fondu », « Vitesse : Normale », « Démarre : quand il entre dans l'écran », « Délai 0 ms », « Rejouer : une seule fois ». « Quand il entre dans l'écran », c'est justement ce qu'Aurèle demande. Il y a une phrase en dessous qui est coupée.
        [12] Je fais descendre le panneau de droite pour lire la phrase coupée en bas.
02:25 ▶ #20 scroll 700 450 down
02:28 💬 [13] Je photographie pour lire le bas du panneau.
02:29 ▶ #21 📷 capture
02:33 ▶ #22 👁 image 008-capture.png
02:38 💬 Je vois une phrase de résumé et d'autres options. J'agrandis pour être sûre de ce que j'ai fait.
        [14] J'agrandis la zone du résumé pour la lire.
02:39 ▶ #23 🔍 loupe 700 375
02:43 ▶ #24 👁 image 009-loupe.png
02:54 💬 La phrase dit : « Quand Titre 2 “Une cuisine de…” entre dans l'écran : fondu en 700 ms, une seule fois. » C'est exactement ce qu'Aurèle demande. Je ne sais pas ce que veut dire « ms », mais je suppose que c'est la durée, et je n'y touche pas. Il y a aussi « Pareil pour les 2 éléments qui suivent » : non, on m'a dit de ne rien changer d'autre, je laisse.
        Maintenant je voudrais voir si ça marche pour de vrai. Je vois « Tester sur le site » en bas.
        [15] Je clique sur « Tester sur le site », je m'attends à voir le site comme un visiteur.
02:55 ▶ #25 click 646 463
02:58 💬 [16] Je photographie pour voir ce qui s'est ouvert.
02:59 ▶ #26 📷 capture
03:04 ▶ #27 👁 image 010-capture.png
03:12 💬 Une nouvelle page s'est ouverte, « Aperçu du site », et je vois la partie « La maison » avec le titre bien en place. En bas il y a un message : « Test de l'animation : l'élément arrive à l'écran comme pour un visiteur. » Je ne vois pas le mouvement sur une photo, alors je vais remonter et redescendre pour voir.
        [17] Je remonte en haut de la page pour ensuite redescendre jusqu'au titre.
03:13 ▶ #28 scroll 400 300 up 10
03:17 💬 [18] Je redescends doucement vers la partie « La maison » pour voir le titre arriver.
03:18 ▶ #29 scroll 400 300 down 5
03:22 💬 [19] Je photographie tout de suite pour essayer d'attraper le titre au moment où il arrive.
03:23 ▶ #30 📷 capture
03:27 ▶ #31 👁 image 011-capture.png
03:39 💬 Le titre est là, en bas de l'écran, bien lisible. Je ne peux pas voir le mouvement sur une photo, donc je suppose seulement que le fondu s'est fait. J'essaie encore une fois d'attraper le moment.
        [20] Je descends d'un tout petit peu et je photographie aussitôt.
03:40 ▶ #32 scroll 400 300 down 2
03:44 💬 Point d'étape : l'animation est posée et je suis en train de vérifier dans l'aperçu ; agacement 1, ça s'est bien passé jusqu'ici.
        [21] Je photographie immédiatement.
03:46 ▶ #33 📷 capture
03:49 ▶ #34 👁 image 012-capture.png
03:54 💬 Tout est bien en place, le titre est net et le reste de la page n'a pas bougé. Je ne verrai pas le fondu sur des photos, mais le logiciel me dit lui-même que le titre arrive quand on descend jusqu'à lui, et c'est ce qu'on m'a demandé.
        [22] Je retourne sur l'onglet de l'éditeur, en haut à gauche, pour vérifier que c'est bien enregistré.
03:55 ▶ #35 click 35 11
03:59 💬 [23] Je photographie pour vérifier que l'éditeur est bien revenu et que mon réglage est toujours là.
04:00 ▶ #36 📷 capture
04:03 ▶ #37 👁 image 013-capture.png
04:12 💬 Me voilà revenue dans l'éditeur : le titre est toujours sélectionné, la case « Apparition » affiche bien « Fondu », « Démarre : quand il entre dans l'écran », et en haut c'est marqué « Enregistré ». Je n'ai touché à rien d'autre.
        Franchement, ça s'est passé beaucoup mieux que je ne craignais : j'ai retrouvé le mot « Animation », le mot « Fondu » que je connais, et la petite phrase qui m'explique en français ce que ça va faire m'a rassurée. Ça m'a évité d'appeler mon neveu. Les seules choses qui m'ont arrêtée, c'est le mot « survol », que je ne comprends pas du tout, et « ms » à côté du délai, dont je ne sais pas si c'est des secondes ou autre chose. Et je n'ai pas réussi à voir le mouvement moi-même, j'ai dû croire sur parole ce qui était écrit.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 23

### 04:47 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

05:00 💬 T1-SEQ. 6. Facile, pour moi qui ne suis pas du métier. Je n'enlève un point que parce qu'il y a deux mots que je n'ai pas compris, « survol » et « ms », et parce que je n'ai pas pu voir de mes yeux que ça marchait.
        T1-R. Quelqu'un arrive sur la page d'accueil du restaurant. En haut, il voit la grande photo et « Le goût de l'Auvergne, sans cérémonie », comme avant, je n'y ai pas touché. Il descend dans la page, il passe la bande avec les petites mentions, et il arrive à la partie « La maison ». À ce moment-là, quand le titre « Une cuisine de produits, servie sans chichi » arrive à l'écran, il n'est pas là tout sec d'un coup : il se fait en fondu, il apparaît doucement, en même pas une seconde je crois — c'était écrit 700, avec « ms » que je ne sais pas traduire, mais j'ai compris que c'était une durée courte. Et ça ne se fait qu'une fois : j'ai vu que c'était réglé sur « une seule fois », donc s'il remonte et redescend, ça ne recommencera pas à clignoter, tant mieux, parce que c'est ça qui m'agace sur certains sites.
        Le reste de la page ne change pas. C'est sobre, c'est ce qu'Aurèle voulait.
        Cela dit, je vous le dis comme je le pense : je répète ce que le logiciel m'a écrit. Moi, je n'ai pas vu le fondu se faire, je ne l'ai vu que sur des photos fixes où le titre était déjà bien net. Donc si ça ne marchait pas, je ne m'en serais pas rendu compte.

### 05:10 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

Address this before completing your current task.

05:28 💬 T1-a. Comme dans PowerPoint : on clique d'abord sur la chose qu'on veut faire bouger, ensuite on va chercher le menu. Alors j'ai regardé l'écran, j'ai lu la barre du haut — « Écriture », « Design », « Animation », « Code » — et voir le mot « Animation » écrit là m'a tout de suite rassurée, je me suis dit « bon, c'est comme chez moi ». Mais je n'ai pas cliqué dessus tout de suite : j'ai d'abord cliqué sur le titre en bas à droite, parce que dans ma tête il faut choisir l'élément avant de lui mettre un effet. Et j'ai eu de la chance, le titre était déjà visible à l'écran, je n'ai même pas eu à descendre pour le trouver.
        T1-b. Je m'attendais à une liste d'effets, comme les animations de PowerPoint : fondu, apparition, ce genre de choses, avec un aperçu et un réglage pour dire si ça part tout seul ou au clic.
        Et c'est à peu près ce que j'ai trouvé, ce qui ne m'arrive pas souvent avec ces outils-là. Quand j'ai cliqué sur le titre, un panneau s'est ouvert à droite, avec tout en bas une rubrique « Animation ». Je l'ai ouverte, et il y avait trois lignes : « Apparition », « Au survol », « En continu ». « Apparition », je comprends. « En continu », je devine à peu près. « Au survol », alors là, aucune idée de ce que ça veut dire, et je n'y ai pas touché, je ne voulais pas faire de bêtise sur le site d'une amie.
        J'ai ouvert la liste d'« Apparition » et j'ai eu ma liste : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond. J'ai pris « Fondu », le mot que je connais et le plus discret.
        Ce que je n'attendais pas, et qui m'a bien plu, c'est ce qui est apparu après : une ligne « Démarre » qui disait déjà toute seule « quand il entre dans l'écran ». Je n'y aurais pas pensé de moi-même, moi je raisonne « au clic » comme dans une présentation. Et surtout la petite phrase en bas qui résume en français : « quand ce titre entre dans l'écran : fondu en 700 ms, une seule fois ». C'est ça qui m'a permis d'être sûre d'avoir fait ce qu'on me demandait. Sans cette phrase, j'aurais cliqué sans savoir.
        Ce que je n'ai pas trouvé, c'est un vrai aperçu du mouvement. J'ai vu un petit triangle à côté de « Fondu », mais je n'ai pas osé cliquer sur un dessin sans écriture. J'ai utilisé « Tester sur le site », ce qui a ouvert une autre page, et là non plus je n'ai pas vu le fondu se faire.

### 05:37 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

05:40 💬 Bon. Les plats ne bougent pas alors qu'ils devraient. Je commence par regarder l'écran.
        [1] Je photographie l'écran pour voir dans quel état est l'éditeur.
05:42 ▶ #38 📷 capture
05:46 ▶ #39 👁 image 001-capture.png
05:49 💬 On est revenu en haut de la page et rien n'est sélectionné. Il faut que je descende pour trouver les plats.
        [2] Je fais descendre la page dans l'éditeur pour trouver la partie avec les plats.
05:50 ▶ #40 scroll 390 300 down 6
05:53 💬 [3] Je photographie pour voir où j'en suis dans la page.
05:55 ▶ #41 📷 capture
05:58 ▶ #42 👁 image 002-capture.png
06:01 💬 Je vois en bas « Cette saison / Quelques plats signature », c'est ça les plats. Je continue un peu.
        [4] Je descends encore pour voir les plats en entier.
06:02 ▶ #43 scroll 390 300 down 4
06:05 💬 [5] Je photographie pour voir les plats.
06:07 ▶ #44 📷 capture
06:10 ▶ #45 👁 image 003-capture.png
06:18 💬 Voilà les plats : trois photos avec « Œuf parfait », « Agneau des Combrailles », « Truffade revisitée ». Je vais faire comme la dernière fois : je clique sur le premier plat et je regarde sa rubrique Animation.
        [6] Je clique sur la photo du premier plat pour le sélectionner.
06:19 ▶ #46 click 254 433
06:22 💬 [7] Je photographie pour voir ce qui est sélectionné et ce que dit le panneau de droite.
06:23 ▶ #47 📷 capture
06:27 ▶ #48 👁 image 004-capture.png
06:32 💬 Il est sélectionné, c'est écrit « Carte plat ». Et tiens, dans « Apparition » il y a déjà quelque chose : « Avec "Plats" · Fondu en montant », avec un texte en jaune que je n'arrive pas à lire. J'agrandis.
        [8] J'agrandis la rubrique Animation pour lire ce texte.
06:33 ▶ #49 🔍 loupe 700 240
06:37 ▶ #50 👁 image 005-loupe.png
06:48 💬 Ah, je comprends peut-être. C'est écrit : « Arrive avec "Plats" : l'effet choisi ici vaut pour tous ses éléments. Au chargement de la page : les enfants de "Plats" ensemble (fondu en montant) en 600 ms. » Le mot « enfants » pour des plats, c'est bizarre, mais je devine que ça veut dire les trois plats qui sont dedans. Et surtout : « au chargement de la page ». Donc le fondu se fait dès qu'on ouvre la page, quand on est encore tout en haut ! Le temps qu'Aurèle descende, c'est déjà fini, et elle ne voit rien. Voilà pourquoi elle dit qu'ils ne bougent pas.
        Pour le titre, la dernière fois, il y avait « Démarre : quand il entre dans l'écran ». C'est ça qu'il me faut ici. Je vois « Régler sur "Plats" ».
        [9] Je clique sur « Régler sur "Plats" », j'espère y trouver le réglage du moment où ça démarre.
06:50 ▶ #51 click 696 268
06:53 💬 [10] Je photographie pour voir où ça m'a menée.
06:54 ▶ #52 📷 capture
06:58 ▶ #53 👁 image 006-capture.png
07:03 💬 Parfait, maintenant c'est « Plats » qui est sélectionné, et là j'ai bien une ligne « Démarre » qui dit « dès l'ouverture de la page ». C'est ça le problème. Je veux la changer.
        [11] Je clique sur la case « dès l'ouverture de la page » pour voir les autres choix.
07:04 ▶ #54 click 726 167
07:09 💬 Point d'étape : j'ai trouvé pourquoi les plats ne bougent pas, ils partent dès l'ouverture de la page ; agacement 1, ça avance bien.
        [12] Je photographie pour voir la liste des choix.
07:10 ▶ #55 📷 capture
07:14 ▶ #56 👁 image 007-capture.png
07:19 💬 La liste s'ouvre : « quand il entre dans l'écran », « dès l'ouverture de la page » qui est le choix actuel, et d'autres choix plus compliqués avec des noms entre guillemets. Je prends le premier, c'est celui que j'avais pour le titre.
        [13] Je clique sur « quand il entre dans l'écran ».
07:20 ▶ #57 click 711 184
07:23 💬 [14] Je photographie pour vérifier que le changement est pris en compte.
07:24 ▶ #58 📷 capture
07:29 ▶ #59 👁 image 008-capture.png
07:33 💬 C'est changé : « Démarre : quand il entre dans l'écran », et une ligne « Rejouer » est apparue. Il y a un texte de résumé que je veux lire.
        [15] J'agrandis pour lire le résumé.
07:34 ▶ #60 🔍 loupe 700 215
07:38 ▶ #61 👁 image 009-loupe.png
07:44 💬 Le résumé dit : « Quand "Plats" entre dans l'écran : les enfants de "Plats" ensemble (fondu en montant) en 600 ms, une seule fois. » Voilà, c'est ce qu'il fallait. Je vais vérifier sur le site.
        [16] Je clique sur « Tester sur le site » pour voir le résultat comme un visiteur.
07:45 ▶ #62 click 645 315
07:48 💬 [17] Je photographie pour voir l'aperçu.
07:49 ▶ #63 📷 capture
07:53 ▶ #64 👁 image 010-capture.png
07:59 💬 Les trois plats sont bien là, entiers, avec leurs prix. Je remonte un peu pour vérifier que le titre « Une cuisine de produits » n'a pas été abîmé.
        [18] Je remonte dans la page de l'aperçu.
08:00 ▶ #65 scroll 400 250 up 6
08:04 💬 [19] Je photographie pour voir la partie « La maison ».
08:05 ▶ #66 📷 capture
08:09 ▶ #67 👁 image 011-capture.png
08:15 💬 Je vois la partie « La maison » avec son texte et les chiffres 12, 38, 14 ; le titre est en haut, à moitié caché derrière la barre du menu, mais c'est juste parce que je me suis arrêtée là. Rien n'a l'air abîmé.
        [20] Je retourne sur l'onglet de l'éditeur.
08:16 ▶ #68 click 35 11
08:21 💬 Point d'étape : le réglage est changé et j'ai vérifié dans l'aperçu ; agacement 1, je m'en sors bien.
        [21] Je photographie pour vérifier que tout est enregistré dans l'éditeur.
08:22 ▶ #69 📷 capture
08:26 ▶ #70 👁 image 012-capture.png
08:35 💬 Je suis bien de retour dans l'éditeur : « Plats » est toujours sélectionné, « Démarre : quand il entre dans l'écran », et en haut c'est marqué « Enregistré ». Le titre « Une cuisine de produits » est toujours là, je n'y ai pas touché.
        Ce qui s'est passé, si je comprends bien : les plats avaient bien un effet, mais il était réglé pour partir dès qu'on ouvre la page. Donc il se faisait pendant qu'Aurèle était encore tout en haut, et quand elle arrivait en bas, c'était fini depuis longtemps. J'ai juste changé le moment du départ.
        Deux choses m'ont chiffonnée. D'abord, quand j'ai cliqué sur un plat, il n'y avait pas de ligne « Démarre » du tout, juste une phrase en jaune ; il a fallu que je clique sur « Régler sur "Plats" » pour tomber sur le bon endroit, et ça, j'ai eu de la chance de le voir. Ensuite, on parle des « enfants de Plats » : pour moi des enfants c'est des enfants, pas des plats dans une liste. J'ai deviné, mais j'aurais préféré qu'on me dise « les trois plats ».
        J'ai terminé.
        FIN : terminé
        ACTIONS : 21

### 09:20 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

09:33 💬 T2-SEQ. 5. Moins facile que la première, mais je m'en suis sortie. Ce qui m'a fait hésiter, c'est qu'en cliquant sur un plat je n'avais pas le réglage que je cherchais : il a fallu comprendre qu'il fallait aller ailleurs, sur « Plats ». Si je n'avais pas déjà vu la ligne « Démarre » la fois d'avant, sur le titre, je serais sans doute restée plantée devant ma phrase en jaune sans savoir quoi faire.
        T2-R. Le visiteur ouvre la page d'accueil, voit la grande photo et le titre du haut. Il descend, il passe la partie « La maison » — et là le titre « Une cuisine de produits, servie sans chichi » apparaît en fondu au moment où il arrive dessus, comme avant, je n'y ai pas touché. Il continue à descendre, il arrive sur « Quelques plats signature », et maintenant, au moment où cette partie arrive à l'écran, les trois plats — l'œuf parfait, l'agneau, la truffade — apparaissent en fondu en montant, c'est-à-dire qu'ils montent un peu en même temps qu'ils apparaissent. Tous les trois ensemble, pas l'un après l'autre. Ça dure 600, le fameux « ms » que je ne sais toujours pas traduire, mais c'est court. Et une seule fois : s'il remonte et redescend, ça ne recommence pas.
        Avant ma correction, ça se faisait dès l'ouverture de la page, donc pendant qu'on était encore tout en haut à regarder la grande photo. Personne ne le voyait jamais. C'est pour ça qu'Aurèle trouvait ses plats immobiles alors qu'on lui avait promis qu'ils bougeaient.
        Là encore, je vous le dis honnêtement : je répète ce que le logiciel m'a écrit noir sur blanc. Je n'ai pas vu le mouvement de mes yeux, ni pour le titre ni pour les plats. J'ai vu des images fixes où tout était bien en place, et une phrase qui me dit ce qui va se passer. J'ai fait confiance à la phrase.

### 10:06 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

Address this before completing your current task.

10:25 💬 T2-a. Les plats avaient bien un effet, contrairement à ce que croyait Aurèle : un fondu en montant. Le problème, c'était le moment où il se déclenchait. C'était réglé sur « dès l'ouverture de la page ». Donc à la seconde où on ouvre le site, alors qu'on est encore tout en haut devant la grande photo et « Le goût de l'Auvergne », les plats font leur petit fondu, tranquillement, tout en bas, là où personne ne regarde. Ça dure six cents de leurs unités, autant dire rien du tout. Le temps qu'Aurèle lise le haut de la page et descende jusqu'aux plats, c'était fini depuis longtemps. Elle arrivait après la bataille. Les plats étaient posés là, immobiles, et elle avait raison de râler.
        Ce qui m'a mise sur la piste, c'est le petit texte en jaune quand j'ai cliqué sur un plat, où il était écrit « au chargement de la page ». « Chargement », je comprends : c'est quand la page s'ouvre. Et je venais de faire le titre la fois d'avant avec « quand il entre dans l'écran », donc j'avais les deux phrases côte à côte dans la tête, et la différence m'a sauté aux yeux. Sans ça, je n'aurais pas su.
        T2-b. Alors là, je vais être franche : je ne l'ai pas su en regardant. Je n'ai pas fait ce que vous m'avez demandé, au fond. Vous m'aviez dit « regardez ce qu'elle voit vraiment », et moi je suis allée directement cliquer sur un plat pour lire les réglages. C'est du texte que j'ai tiré mon explication, pas de mes yeux.
        Et même après, quand j'ai ouvert l'aperçu, je n'ai rien vu bouger. Je vois des images fixes. Une photo d'un plat qui n'a pas encore bougé et une photo d'un plat qui a fini de bouger, pour moi c'est la même photo. Donc je ne peux pas vous dire que j'ai constaté le problème, ni que j'ai constaté la réparation. J'ai lu « dès l'ouverture de la page », j'ai trouvé que ça collait avec ce que racontait Aurèle, j'ai changé, et maintenant c'est écrit « quand il entre dans l'écran ». Voilà tout ce dont je suis sûre.
        C'est d'ailleurs ce qui me gêne le plus dans cet outil pour l'instant : je travaille en aveugle. Dans PowerPoint, quand je choisis un effet, je le vois se faire tout de suite dans ma diapositive, et je sais si c'est trop lent ou trop tape-à-l'œil. Ici, je pose quelque chose sur le site d'une amie sans jamais le voir. J'ai bien remarqué un petit triangle à côté de la case de l'effet, comme le bouton pour lancer une vidéo, et je me suis dit que c'était peut-être fait pour ça — mais c'est un dessin sans écriture, je n'ai pas osé cliquer, j'avais peur de lancer une bêtise.

### 10:47 · MESSAGE REÇU (segment 8)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

10:49 💬 Bon. Le grand titre doit arriver plus lentement, et les deux boutons après lui. Je regarde l'écran.
        [1] Je photographie l'écran pour voir où j'en suis.
10:52 ▶ #71 📷 capture
10:56 ▶ #72 👁 image 001-capture.png
10:59 💬 Je suis en haut de la page, avec le grand titre « Le goût de l'Auvergne, sans cérémonie. » et les deux boutons en dessous. Je commence par le titre.
        [2] Je clique sur le grand titre pour le sélectionner.
11:00 ▶ #73 click 275 155
11:04 💬 [3] Je photographie pour voir le panneau de droite.
11:05 ▶ #74 📷 capture
11:08 ▶ #75 👁 image 002-capture.png
11:15 💬 Le titre est sélectionné, et sa rubrique Animation est déjà ouverte : « Fondu en montant », avec une ligne « Vitesse » où il y a « Rapide », « Normale », « Lente ». C'est exactement ce qu'il me faut pour qu'il arrive plus lentement.
        [4] Je clique sur « Lente » dans la ligne Vitesse.
11:16 ▶ #76 click 770 421
11:19 💬 [5] Je photographie pour vérifier que la vitesse est passée à « Lente ».
11:20 ▶ #77 📷 capture
11:25 ▶ #78 👁 image 003-capture.png
11:32 💬 C'est passé sur « Lente », et en bas c'est écrit « en 1 120 ms (1,1 s) ». Ah, là il me met les secondes entre parenthèses, ça je comprends enfin. Avant c'était 500. J'agrandis pour être sûre.
        [6] J'agrandis le bas du panneau pour lire le résumé.
11:33 ▶ #79 🔍 loupe 700 460
11:37 ▶ #80 👁 image 004-loupe.png
11:42 💬 Confirmé : vitesse « Lente », « fondu en montant en 1 120 ms (1,1 s) ». Le titre est fait. Maintenant les boutons.
        [7] Je clique sur le bouton « Réserver une table » pour le sélectionner.
11:43 ▶ #81 click 224 243
11:47 💬 [8] Je photographie pour voir ce qui est sélectionné.
11:48 ▶ #82 📷 capture
11:51 ▶ #83 👁 image 005-capture.png
12:00 💬 Le bouton est sélectionné : « Réserver une table ». Sa rubrique Animation dit aussi « dès l'ouverture de la page ». Comme pour les plats, il faut que je change le « Démarre ».
        [9] Je clique sur la case « dès l'ouverture de la page » du bouton, j'espère y trouver un choix qui parle du titre.
12:01 ▶ #84 click 726 411
12:05 💬 Point d'étape : le titre est ralenti, je m'occupe maintenant des boutons ; agacement 1.
        [10] Je photographie pour voir les choix proposés.
12:07 ▶ #85 📷 capture
12:11 ▶ #86 👁 image 006-capture.png
12:19 💬 La liste s'ouvre, avec beaucoup de choix. J'en vois un qui dit « après Titre 1 "Le goût de l'Auvergne…" ». C'est écrit petit, j'agrandis pour ne pas me tromper de ligne.
        [11] J'agrandis la liste pour lire les choix.
12:20 ▶ #87 🔍 loupe 730 335
12:24 ▶ #88 👁 image 007-loupe.png
12:28 💬 C'est bien lisible maintenant : « après Titre 1 "Le goût de l'Auvergne…" ». C'est exactement ce qu'Aurèle veut.
        [12] Je clique sur « après Titre 1 "Le goût de l'Auvergne…" ».
12:29 ▶ #89 click 730 334
12:33 💬 [13] Je photographie pour vérifier.
12:34 ▶ #90 📷 capture
12:38 ▶ #91 👁 image 008-capture.png
12:43 💬 « Démarre : après Titre 1 "Le goût de l'Auvergn…" ». Il y a un résumé en petit que je veux lire.
        [14] J'agrandis le résumé.
12:44 ▶ #92 🔍 loupe 720 462
12:48 ▶ #93 👁 image 009-loupe.png
12:56 💬 Le résumé dit : « Au chargement de la page : Titre 1 "Le goût de l'Auvergne…" en 1 120 ms (1,1 s), puis "Réserver une table" de 1 120 à 1 620 ms (1,6 s). » Donc le bouton part quand le titre a fini. C'est bien ça. Reste l'autre bouton.
        [15] Je clique sur le bouton « Voir la carte » pour le sélectionner à son tour.
12:57 ▶ #94 click 283 243
13:01 💬 [16] Je photographie pour voir si c'est bien « Voir la carte » qui est sélectionné.
13:02 ▶ #95 📷 capture
13:06 ▶ #96 👁 image 010-capture.png
13:11 💬 « Voir la carte » est sélectionné, et lui aussi part dès l'ouverture de la page. Je fais pareil.
        [17] Je clique sur sa case « dès l'ouverture de la page ».
13:12 ▶ #97 click 726 411
13:16 💬 [18] Je photographie pour voir la liste, l'ordre des lignes peut être différent.
13:17 ▶ #98 📷 capture
13:21 ▶ #99 👁 image 011-capture.png
13:26 💬 La liste est pareille, et la ligne « après Titre 1 "Le goût de l'Auvergne…" » est au même endroit. Je prends la même chose, comme ça les deux boutons arrivent ensemble après le titre.
        [19] Je clique sur « après Titre 1 "Le goût de l'Auvergne…" ».
13:27 ▶ #100 click 730 334
13:31 💬 Point d'étape : les deux boutons sont réglés, je vais vérifier ; agacement 1, ça va très bien.
        [20] Je photographie pour vérifier le second bouton.
13:32 ▶ #101 📷 capture
13:36 ▶ #102 👁 image 012-capture.png
13:40 💬 C'est fait, et le résumé est plus long, il parle des deux boutons. J'agrandis pour le lire en entier.
        [21] J'agrandis le résumé.
13:41 ▶ #103 🔍 loupe 720 470
13:45 ▶ #104 👁 image 013-loupe.png
13:58 💬 Le résumé dit tout : le titre en 1,1 s, puis « Réserver une table » et « Voir la carte » qui partent tous les deux après, entre 1 120 et 1 620. C'est exactement ce qu'Aurèle demande. Je veux voir ce que ça donne en arrivant sur la page.
        [22] Je clique sur « Aperçu » en haut, pour voir la page comme un visiteur qui arrive.
13:59 ▶ #105 click 692 13
14:03 💬 [23] Je photographie tout de suite pour voir l'arrivée sur la page.
14:04 ▶ #106 📷 capture
14:09 ▶ #107 👁 image 014-capture.png
14:14 💬 La page s'affiche bien : le grand titre, le texte, et les deux boutons « Réserver une table » et « Voir la carte », tout est à sa place. Je ne vois pas le mouvement sur une image fixe, mais rien n'est abîmé.
        [24] Je retourne sur l'onglet de l'éditeur.
14:15 ▶ #108 click 35 11
14:19 💬 [25] Je photographie pour vérifier que tout est enregistré.
14:20 ▶ #109 📷 capture
14:24 ▶ #110 👁 image 015-capture.png
14:35 💬 Je suis revenue dans l'éditeur, c'est marqué « Enregistré », et le réglage du bouton « Voir la carte » est toujours affiché avec « après Titre 1 ». Je n'ai touché ni aux photos, ni aux textes, ni au reste de la page.
        Celle-ci s'est bien passée. J'ai été contente de trouver « Rapide / Normale / Lente » écrit en toutes lettres : je n'ai pas eu à taper un nombre dont je ne comprends pas l'unité. Et le mot « après » suivi du nom du titre, ça se lit comme une phrase, j'ai compris tout de suite.
        Deux petites choses quand même. La liste des « Démarre » est longue et remplie de noms entre guillemets comme « Contenu » ou « Texte », dont je ne sais pas ce qu'ils désignent sur la page ; j'ai dû agrandir pour ne pas cliquer de travers. Et j'ai dû faire deux fois le même geste, une fois pour chaque bouton ; j'ai vu qu'il y avait le mot « Boutons » écrit tout en haut du panneau, et je me suis demandé si je n'aurais pas pu les faire tous les deux d'un coup, mais je n'ai pas osé y toucher.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 25

### 14:59 · MESSAGE REÇU (segment 9)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

15:15 💬 T3-SEQ. 6. Facile. Le « Lente » écrit en toutes lettres et le « après Titre 1 » qui se lit comme une phrase, ça m'a mâché le travail. Je n'enlève un point que pour la liste des « Démarre », trop longue et pleine de mots entre guillemets que je ne sais pas relier à ce que je vois sur la page.
        T3-R. Le visiteur ouvre la page d'accueil. Au début il voit la grande photo des oignons à droite, la petite mention « Bistronomie · Clermont-Ferrand », et le grand titre « Le goût de l'Auvergne, sans cérémonie » qui monte doucement en apparaissant. Doucement, maintenant : ça prend 1,1 seconde au lieu d'une demi-seconde avant, donc c'est plus du double, on a le temps de le voir arriver au lieu que ça claque d'un coup.
        Et une fois que le titre est bien posé, alors seulement les deux boutons « Réserver une table » et « Voir la carte » arrivent à leur tour, tous les deux ensemble, de la même façon, en montant en fondu. C'est écrit qu'ils se font entre 1 120 et 1 620, donc ils démarrent pile quand le titre a fini et ils durent une demi-seconde. Au total, l'arrivée sur la page dure un peu plus d'une seconde et demie, alors qu'avant tout partait en même temps dès la première seconde. Ça devrait être plus posé, moins nerveux, c'est ce qu'elle demandait.
        Le reste — le petit paragraphe « Une carte courte qui change avec les saisons », la photo, le bandeau qui défile, tout le bas de la page — je n'y ai pas touché.
        Après, la même remarque que les fois d'avant, et à force ça commence à me gêner : je n'ai rien vu. Je vous récite la phrase que le logiciel m'a écrite. Sur ce coup-là c'est encore plus embêtant qu'avant, parce qu'Aurèle ne me demandait pas quelque chose de technique, elle me demandait que ce soit « moins nerveux ». Ça, c'est une histoire de ressenti. Est-ce que 1,1 seconde c'est assez lent, ou est-ce que c'est devenu mou ? Je n'en sais rien. J'ai pris « Lente » parce que c'était le bouton qui allait le moins vite, pas parce que j'ai jugé le résultat. Si son associé trouve ça encore trop brusque demain matin, je ne saurai pas quoi lui répondre.

### 15:32 · MESSAGE REÇU (segment 10)
The coordinator sent a message while you were working:
Merci.

T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

Address this before completing your current task.

15:49 💬 T3-a. Une seconde six. C'est écrit noir sur blanc dans la phrase du bas : le titre de zéro à 1 120, puis les boutons de 1 120 à 1 620, et à côté c'était mis « 1,6 s ». Donc une seconde et demie, un peu plus. C'est la seule chose dont je suis sûre dans toute cette mission, justement parce que c'était écrit en secondes entre parenthèses.
        D'ailleurs, tant que j'y suis : si on m'avait laissée avec les seuls nombres, 1 120 et 1 620, je n'aurais rien su vous dire. Ces « ms », je ne sais toujours pas ce que c'est. C'est la parenthèse avec les secondes qui m'a sauvée, et elle n'est pas partout : dans la case du délai, il n'y a que « ms », tout sec. Si j'avais eu besoin d'y toucher, j'aurais tapé un chiffre au hasard.
        T3-b. Je ne l'ai pas jugé. Je ne peux pas le juger, je n'ai rien vu bouger de toute la séance.
        J'ai fait au plus bête : il y avait trois boutons, « Rapide », « Normale », « Lente », j'ai pris le dernier parce que c'est celui qui va le moins vite, point. Aurèle avait dit « nettement plus lentement », alors j'ai pris le plus lent qu'on me proposait. Ensuite j'ai regardé les nombres pour me rassurer : c'était 500 avant, c'est 1 120 maintenant, c'est plus du double. Donc je me suis dit, bon, c'est nettement plus lent, au moins sur le papier.
        Mais « assez lent », ça, personne ne me l'a dit et je ne l'ai pas vérifié. Dans PowerPoint, quand je mets un fondu sur un titre, ça se joue devant moi dans la diapositive, et si c'est mou je le sens tout de suite et je remets plus court. Ici, j'ai choisi un mot dans une liste et j'ai fait confiance au mot. Ce n'est pas la même chose que de trouver ça joli.
        Et encore une fois : il y a ce petit triangle à côté de la case de l'effet, comme le bouton pour lancer une vidéo. Je parie que c'est fait pour montrer le mouvement. Mais c'est un dessin tout seul, sans une lettre écrite à côté, et sur le site d'une amie je ne clique pas sur un dessin dont je ne sais pas ce qu'il fait. S'il y avait eu marqué « Voir l'effet » à côté, je l'aurais cliqué dès la première mission, et j'aurais su quoi vous répondre.

### 16:34 · MESSAGE REÇU (segment 11)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

16:43 💬 Bon, deux choses. D'abord la pastille qui bouge tout le temps, qu'il faut calmer. Ensuite le bouton qui doit bouger quand on passe la souris dessus.
        [1] Je photographie l'écran pour voir où j'en suis.
16:45 ▶ #111 📷 capture
16:49 ▶ #112 👁 image 001-capture.png
16:53 💬 Je vois la pastille « Bib Gourmand · Guide 2026 » sur la photo, en bas à gauche de l'image.
        [2] Je clique sur la pastille pour la sélectionner.
16:54 ▶ #113 click 432 255
16:58 💬 [3] Je photographie pour voir ce qui est sélectionné et ce que dit le panneau.
16:59 ▶ #114 📷 capture
17:04 ▶ #115 👁 image 002-capture.png
17:12 💬 La pastille est sélectionnée, et en haut c'est marqué « + 2 animations ». Je vois « Apparition : Zoom » et plus bas « En continu : Pulsation ». J'agrandis pour bien lire les deux, il ne faut pas que j'enlève le mauvais.
        [4] J'agrandis la rubrique Animation.
17:13 ▶ #116 🔍 loupe 700 370
17:18 ▶ #117 👁 image 003-loupe.png
17:24 💬 « En continu : Pulsation », et c'est écrit « en boucle ». Une pulsation, c'est quelque chose qui bat, et « en continu » c'est tout le temps : voilà ce qui donne le tournis à la cliente. L'« Apparition : Zoom », elle, c'est l'arrivée, ça je n'y touche pas.
        [5] Je clique sur la case « Pulsation » de la ligne « En continu » pour la mettre à « Aucun ».
17:25 ▶ #118 click 717 363
17:29 💬 [6] Je photographie pour voir la liste.
17:30 ▶ #119 📷 capture
17:35 ▶ #120 👁 image 004-capture.png
17:38 💬 La liste s'ouvre : « Aucun », « Flottement », « Pulsation », « Rotation continue », « Clignotement », « Balancement ». Je prends « Aucun ».
        [7] Je clique sur « Aucun ».
17:39 ▶ #121 click 677 379
17:44 💬 [8] Je photographie pour vérifier que la pulsation est bien enlevée et que l'arrivée est restée.
17:45 ▶ #122 📷 capture
17:50 ▶ #123 👁 image 005-capture.png
17:59 💬 Voilà : c'est passé à « + 1 animation », « En continu : Aucun », et « Apparition : Zoom » est toujours là avec son arrivée. La pastille ne bougera plus tout le temps mais arrivera toujours joliment. Première chose faite.
        Maintenant le bouton. Il doit bouger quand on passe la souris dessus.
        [9] Je clique sur le bouton « Réserver une table » pour le sélectionner.
18:00 ▶ #124 click 224 243
18:04 💬 Point d'étape : la pastille est calmée, je passe au bouton ; agacement 1.
        [10] Je photographie pour voir le panneau du bouton.
18:05 ▶ #125 📷 capture
18:10 ▶ #126 👁 image 006-capture.png
18:13 💬 Le bouton « Réserver une table » est sélectionné, et la rubrique « Animation » est refermée en bas.
        [11] Je clique sur « Animation » pour l'ouvrir.
18:14 ▶ #127 click 633 320
18:18 💬 [12] Je photographie pour voir les réglages du bouton.
18:19 ▶ #128 📷 capture
18:24 ▶ #129 👁 image 007-capture.png
18:37 💬 Alors là, il y a trois lignes : « Apparition », « Au survol », « En continu ». L'apparition c'est l'arrivée, ce n'est pas ça. « En continu », c'est tout le temps, c'est justement ce que je viens d'enlever à la pastille, donc ce n'est pas ça non plus. Reste « Au survol », et ce mot-là ne me dit rien du tout. Survoler, pour moi, c'est un avion. La petite phrase en haut dit « le faire réagir au survol », ça ne m'avance pas.
        Par élimination, c'est forcément celui-là. Je vais regarder ce qu'il propose, ça m'éclairera peut-être.
        [13] Je clique sur la case « Aucun » de la ligne « Au survol » pour voir la liste.
18:38 ▶ #130 click 726 383
18:43 💬 [14] Je photographie pour voir ce que propose cette liste.
18:44 ▶ #131 📷 capture
18:48 ▶ #132 👁 image 008-capture.png
18:56 💬 La liste propose « Aucun », « Grossir », « Soulever », « Éclaircir ». Ça ne me dit toujours pas quand ça se produit, mais « Soulever », ça correspond à « bouge légèrement ». Je tente.
        [15] Je clique sur « Soulever ».
18:56 ▶ #133 click 682 426
19:00 💬 [16] Je photographie, j'espère qu'une phrase va m'expliquer quand ça se produit.
19:01 ▶ #134 📷 capture
19:06 ▶ #135 👁 image 009-capture.png
19:12 💬 Ah ! Il y a une phrase en dessous où je crois voir le mot « souris ». J'agrandis tout de suite.
        [17] J'agrandis pour lire cette phrase.
19:13 ▶ #136 🔍 loupe 720 418
19:17 ▶ #137 👁 image 010-loupe.png
19:27 💬 « Au survol de "Réserver une table" : soulever en 250 ms, puis retour quand la souris part. » Le mot « souris » ! Donc « survol », c'est bien « passer la souris dessus ». Bon, ils auraient pu l'écrire comme ça dès le début, ça m'aurait évité de tourner en rond. Enfin, j'ai eu de la chance de tomber juste.
        Je vais aller vérifier en passant vraiment la souris dessus.
        [18] Je clique sur « Tester sur le site ».
19:28 ▶ #138 click 645 463
19:32 💬 [19] Je photographie pour voir l'aperçu et retrouver le bouton.
19:34 ▶ #139 📷 capture
19:38 ▶ #140 👁 image 011-capture.png
19:43 💬 Je vois la page, et le bouton « Réserver une table ». Le message en bas dit « Survolez-le ou cliquez-le ». Je vais poser la souris dessus.
        [20] Je passe la souris sur le bouton « Réserver une table ».
19:44 ▶ #141 hover 125 381
19:49 💬 Point d'étape : les deux demandes sont faites, je vérifie la deuxième ; agacement 2, à cause de ce mot « survol » que j'ai dû deviner.
        [21] Je photographie pendant que la souris est dessus, pour voir si le bouton se soulève.
19:50 ▶ #142 📷 capture
19:55 ▶ #143 👁 image 012-capture.png
20:02 💬 La barre de message a disparu. Le bouton a l'air très légèrement plus haut qu'avant, mais c'est vraiment infime, je ne suis pas sûre. J'agrandis.
        [22] J'agrandis le bouton pour regarder de plus près.
20:03 ▶ #144 🔍 loupe 165 381
20:08 ▶ #145 👁 image 013-loupe.png
20:15 💬 Là je le vois ! Le bouton « Réserver une table » est nettement plus haut que « Voir la carte » à côté, et il y a une ombre en dessous, comme s'il était décollé. C'est la première fois depuis le début de la séance que je vois de mes yeux qu'un réglage a fait quelque chose. Ça fait plaisir.
        [23] Je retourne sur l'onglet de l'éditeur.
20:16 ▶ #146 click 35 11
20:19 💬 [24] Je photographie pour vérifier que tout est enregistré.
20:20 ▶ #147 📷 capture
20:25 ▶ #148 👁 image 014-capture.png
20:34 💬 Tout est en place : « Au survol : Soulever » sur le bouton, c'est marqué « Enregistré », et la pastille n'a plus sa pulsation mais garde son arrivée en zoom.
        Deux remarques. La première : pour la pastille, c'était limpide. « En continu » avec « en boucle » écrit dessous, on comprend tout de suite que c'est ce qui bouge tout le temps, et il y avait bien trois lignes séparées, donc j'étais sûre de ne pas casser l'arrivée. Ça, c'est bien fait.
        La seconde, moins bien : « survol ». Je ne connais pas ce mot, et je l'ai trouvé uniquement parce qu'il ne restait que lui après avoir éliminé les deux autres. Si la ligne s'était appelée « Quand la souris passe dessus », j'y allais directement. Et la liste ne m'aidait pas non plus : « Grossir », « Soulever », « Éclaircir », ça dit ce qui se passe mais pas quand. Ce n'est qu'après avoir cliqué que la phrase m'a parlé de la souris — donc j'ai dû me lancer dans le vide pour comprendre où je mettais les pieds.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 24

### 20:57 · MESSAGE REÇU (segment 12)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

21:13 💬 T5-SEQ. 5. La pastille, c'était très facile, 7 sans hésiter. Le bouton, beaucoup moins, à cause du mot « survol » que j'ai dû deviner par élimination. Je mets 5 pour l'ensemble, mais c'est une moyenne entre quelque chose de limpide et quelque chose où j'ai avancé à tâtons.
        T5-R. Le visiteur ouvre la page d'accueil. La pastille « Bib Gourmand · Guide 2026 », en bas de la grande photo, arrive toujours joliment : elle apparaît en grossissant, un petit zoom, un peu après le reste — c'était marqué 300 avant de partir, puis 500 pour se faire. Ça, je n'y ai pas touché, Aurèle y tenait.
        La différence, c'est qu'une fois arrivée, elle s'arrête. Avant, elle continuait de battre en permanence, une pulsation qui repartait en boucle toutes les 1,2 seconde, sans jamais s'arrêter tant qu'on était sur la page. C'est ça qui donnait le tournis à la cliente, et c'est normal : on lit le titre et on a un truc qui palpite du coin de l'œil. Maintenant elle arrive, elle se pose, et elle reste tranquille.
        Et puis, quand le visiteur promène sa souris sur la page et qu'il arrive sur le bouton « Réserver une table », le bouton se soulève légèrement, comme s'il se décollait de la page, avec une petite ombre en dessous. C'est rapide, un quart de seconde. Et dès qu'il enlève la souris, le bouton redescend à sa place. Ça se voit juste assez pour donner envie d'appuyer, sans faire clignoter quoi que ce soit. Le bouton « Voir la carte » à côté, lui, ne fait rien : on ne m'a demandé que celui-là.
        Et pour une fois, ce n'est pas du récité : celle-là, je l'ai vue. J'ai posé la souris sur le bouton dans l'aperçu, j'ai agrandi, et je l'ai vu franchement plus haut que son voisin, avec l'ombre. C'est la seule chose de toute la séance dont je peux vous dire « je l'ai constaté » et pas « c'était écrit ».
        Ce que je ne peux toujours pas vous confirmer, c'est que la pastille a bien cessé de battre : sur une image fixe, une pastille qui bat et une pastille qui ne bat pas, c'est pareil. Là encore, je me fie à ce qui est écrit « Aucun ».

### 23:42 · MESSAGE REÇU (segment 13)
The coordinator sent a message while you were working:
Merci.

T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

Address this before completing your current task.

24:01 💬 T5-a. Non, elle ne bougera plus en permanence. Mais je vais être précise sur ce qui me permet de le dire, parce que ce n'est pas la même chose que de l'avoir vu.
        Ce qui me permet de le dire, c'est la ligne « En continu » qui affiche maintenant « Aucun » au lieu de « Pulsation ». Et avant de toucher à quoi que ce soit, j'avais lu la phrase du dessous : « Au chargement de la page, après 800 ms : pulsation en 1 200 ms (1,2 s), en boucle. » « En boucle », je ne connais pas ce mot dans ce sens-là, mais « en continu » et « pulsation », je comprends : quelque chose qui bat sans arrêt. Ça collait exactement avec ce que disait la cliente. J'ai mis « Aucun », et la phrase a disparu — il n'y a plus rien d'écrit sous cette ligne. Pour moi, plus de phrase, plus de mouvement.
        Ce qui m'a rassurée aussi, c'est le compteur en haut du panneau : il indiquait « + 2 animations » avant, et « + 1 animation » après. Donc il en reste une, et c'est bien celle de l'arrivée, le zoom, qui est toujours affichée avec son « après 300 ms ». Ça me confirme que je n'ai pas enlevé la mauvaise.
        Maintenant, est-ce que je l'ai vu de mes yeux ? Non. Sur une photo fixe, une pastille qui bat et une pastille qui ne bat pas, c'est rigoureusement la même image. Je n'ai aucun moyen de vérifier. Je me fie à trois lignes de texte et à un compteur. Si demain Aurèle me dit que ça bouge toujours, je serai bien incapable de vous expliquer pourquoi.
        T5-b. Quand il pose la souris dessus, le bouton « Réserver une table » se soulève : il monte un peu, il se décolle de la page, avec une petite ombre en dessous, comme un bouton en relief. Ça se fait en 250, un quart de seconde à peu près, donc c'est vif mais pas brutal.
        Et quand il retire la souris, le bouton redescend et reprend sa place, exactement comme avant. C'était écrit noir sur blanc : « puis retour quand la souris part ». Ça ne reste pas coincé en l'air, ça ne se déclenche qu'au passage. C'est réversible, et ça m'a rassurée : je n'ai pas déplacé le bouton pour de bon, je n'ai pas abîmé la mise en page d'Aurèle.
        Le voisin, « Voir la carte », ne fait rien du tout, on ne m'a demandé que celui-là.
        Et celui-ci, je vous le redis parce que c'est le seul de la séance : je l'ai vraiment vu. J'ai posé la souris dessus dans l'aperçu, j'ai agrandi, et le bouton était franchement plus haut que son voisin, avec l'ombre. Pour tout le reste depuis le début, j'ai récité ce que l'outil m'écrivait.

### 24:18 · MESSAGE REÇU (segment 14)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

24:28 💬 C'est une grosse commande, ça. Quatre choses qui doivent se suivre dans l'ordre, plus les trois chiffres l'un après l'autre. Je vais y aller morceau par morceau, dans l'ordre.
        [1] Je photographie l'écran pour voir où j'en suis.
24:30 ▶ #149 📷 capture
24:37 ▶ #150 👁 image 001-capture.png
24:40 💬 Je suis en haut. La partie « La maison » commence en bas de l'écran, je descends pour la voir en entier.
        [2] Je fais descendre la page.
24:41 ▶ #151 scroll 390 300 down 5
24:46 💬 [3] Je photographie pour voir toute la partie « La maison ».
24:47 ▶ #152 📷 capture
24:52 ▶ #153 👁 image 002-capture.png
24:57 💬 Je vois toute la partie : la photo à gauche, le titre, le paragraphe, et les trois chiffres 12, 38, 14. Je commence par la photo, c'est la première de la scène.
        [4] Je clique sur la photo pour la sélectionner.
24:58 ▶ #154 click 283 325
25:02 💬 [5] Je photographie pour voir ce qui est sélectionné.
25:04 ▶ #155 📷 capture
25:08 ▶ #156 👁 image 003-capture.png
25:13 💬 C'est bien « Photo de la salle » qui est sélectionnée. La rubrique « Animation » est en bas, fermée.
        [6] Je clique sur « Animation » pour l'ouvrir.
25:14 ▶ #157 click 633 441
25:18 💬 [7] Je photographie pour voir les réglages de la photo.
25:19 ▶ #158 📷 capture
25:24 ▶ #159 👁 image 004-capture.png
25:29 💬 La rubrique s'ouvre mais elle est coupée en bas de l'écran ; je vois juste « Apparition : Aucune ».
        [8] Je fais descendre le panneau de droite pour tout voir.
25:30 ▶ #160 scroll 700 400 down 4
25:34 💬 [9] Je photographie pour voir la rubrique en entier.
25:35 ▶ #161 📷 capture
25:41 ▶ #162 👁 image 005-capture.png
25:47 💬 Maintenant je vois tout : « Apparition : Aucune », « Au survol », « En continu ». Pour la photo, il me faut quelque chose qui arrive par le côté.
        [10] Je clique sur la case « Aucune » d'« Apparition ».
25:48 ▶ #163 click 726 421
25:54 💬 Point d'étape : je commence tout juste la scène, il me reste la photo, le titre, le paragraphe et les trois chiffres ; agacement 2, c'est beaucoup de travail.
        [11] Je photographie pour voir la liste des effets.
25:55 ▶ #164 📷 capture
25:59 ▶ #165 👁 image 006-capture.png
26:03 💬 La liste est la même que la première fois. « Glissé depuis la gauche », c'est bien « arriver par le côté », et la photo est à gauche.
        [12] Je clique sur « Glissé depuis la gauche ».
26:04 ▶ #166 click 704 355
26:09 💬 [13] Je photographie pour voir les réglages qui apparaissent.
26:10 ▶ #167 📷 capture
26:15 ▶ #168 👁 image 007-capture.png
26:25 💬 « Glissé depuis la gauche », et il a déjà mis tout seul « Démarre : quand il entre dans l'écran ». Parfait pour la première de la scène. Il me faut aussi la ligne « Rejouer », qui est coupée en bas.
        [14] Je fais descendre le panneau pour voir la ligne « Rejouer ».
26:26 ▶ #169 scroll 700 400 down 3
26:31 💬 [15] Je photographie pour voir la ligne « Rejouer ».
26:32 ▶ #170 📷 capture
26:37 ▶ #171 👁 image 008-capture.png
26:42 💬 Voilà la ligne « Rejouer », avec « une seule fois » et « à chaque passage ». Aurèle veut que la scène recommence chaque fois qu'on revient, donc c'est « à chaque passage ».
        [16] Je clique sur « à chaque passage ».
26:43 ▶ #172 click 760 356
26:47 💬 [17] Je photographie pour vérifier.
26:48 ▶ #173 📷 capture
26:53 ▶ #174 👁 image 009-capture.png
27:07 💬 « À chaque passage » est bien pris. Je vois aussi un bouton « Pareil pour l'élément qui suit », mais non : le titre doit avoir un autre effet, pas le glissé. La photo est faite.
        [18] Je clique sur le titre « Une cuisine de produits, servie sans chichi. » pour le sélectionner.
27:08 ▶ #175 click 470 290
27:12 💬 [19] Je photographie pour voir sa rubrique Animation.
27:13 ▶ #176 📷 capture
27:19 ▶ #177 👁 image 010-capture.png
27:39 💬 Le titre est sélectionné et sa rubrique Animation est déjà ouverte. Il doit « arriver en s'élevant légèrement » : dans la liste, c'est « Fondu en montant ».
        [20] Je clique sur la case « Aucune » d'« Apparition ».
27:40 ▶ #178 click 726 402
27:46 💬 Point d'étape : la photo est réglée, j'attaque le titre, il me restera le paragraphe et les chiffres ; agacement 2, c'est long mais je sais où je vais.
        [21] Je clique sur « Fondu en montant », la liste s'ouvre toujours au même endroit.
27:47 ▶ #179 click 700 300
27:52 💬 [22] Je photographie pour vérifier que c'est le bon effet et voir la ligne « Démarre ».
27:53 ▶ #180 📷 capture
27:58 ▶ #181 👁 image 011-capture.png
28:03 💬 « Fondu en montant » est mis. Maintenant il faut que le titre parte après la photo, pas tout seul.
        [23] Je clique sur la case « quand il entre dans l'écran » de la ligne « Démarre ».
28:04 ▶ #182 click 726 440
28:09 💬 [24] Je photographie pour lire les choix, il faut que je trouve celui qui parle de la photo.
28:10 ▶ #183 📷 capture
28:15 ▶ #184 👁 image 012-capture.png
28:20 💬 Je vois « après "Photo de la salle" ». C'est exactement ça.
        [25] Je clique sur « après "Photo de la salle" ».
28:21 ▶ #185 click 700 412
28:26 💬 [26] Je clique maintenant sur le paragraphe en dessous du titre pour le sélectionner.
28:27 ▶ #186 click 470 330
28:32 💬 [27] Je photographie pour vérifier que c'est bien le paragraphe et voir sa rubrique Animation.
28:33 ▶ #187 📷 capture
28:39 ▶ #188 👁 image 013-capture.png
28:45 💬 Le paragraphe est sélectionné. « Se dévoile », pour moi c'est un fondu, tout simplement.
        [28] Je clique sur la case « Aucune » d'« Apparition ».
28:46 ▶ #189 click 726 402
28:51 💬 [29] Je clique sur « Fondu », deuxième ligne de la liste.
28:52 ▶ #190 click 700 288
28:57 💬 [30] Je clique sur la ligne « Démarre », qui doit être au même endroit que pour le titre.
28:58 ▶ #191 click 726 440
29:06 💬 Point d'étape : la photo et le titre sont faits, je suis sur le paragraphe, restent les chiffres ; agacement 3, je commence à trouver ça long et répétitif.
        [31] Je photographie pour voir la liste et vérifier que je n'ai pas fait de bêtise en cliquant sans regarder.
29:06 ▶ #192 📷 capture
29:11 ▶ #193 👁 image 014-capture.png
29:18 💬 La liste est ouverte et je vois « après Titre 2 "Une cuisine de…" ». C'est ce qu'il me faut : le paragraphe après le titre.
        [32] Je clique sur « après Titre 2 "Une cuisine de…" ».
29:19 ▶ #194 click 700 400
29:24 💬 [33] Je clique sur le premier chiffre, le « 12 », pour m'occuper des trois chiffres.
29:25 ▶ #195 click 406 372
29:30 💬 [34] Je photographie pour voir ce qui est sélectionné.
29:31 ▶ #196 📷 capture
29:36 ▶ #197 👁 image 015-capture.png
29:55 💬 Oh là. C'est marqué « Composant · Chiffre clé », et en dessous « Une instance affiche le composant avec ses propres valeurs. Modifier le composant change toutes ses instances » et « 3 instances dans le site ». Les mots « composant » et « instance », je ne sais pas ce que c'est, et ce qui me fait peur c'est « change toutes ses instances » : je ne veux pas modifier des choses ailleurs sur le site sans le vouloir.
        Mais je vois aussi, tout en haut du panneau, un mot « Chiffres ». Pour les plats, tout à l'heure, il avait fallu que j'aille sur le groupe qui les contenait pour avoir le « une à une ». Je tente la même chose.
        [35] Je clique sur « Chiffres » dans la ligne du haut.
29:56 ▶ #198 click 748 35
30:01 💬 [36] Je photographie pour voir si j'ai bien atterri sur le groupe des chiffres.
30:02 ▶ #199 📷 capture
30:07 ▶ #200 👁 image 016-capture.png
30:17 💬 C'est le groupe « Chiffres » qui est sélectionné, les trois chiffres sont entourés ensemble. Bien. Il me faut l'effet qui va un peu trop loin puis revient : « Montée avec rebond ».
        [37] Je clique sur la case « Aucune » d'« Apparition ».
30:19 ▶ #201 click 726 212
30:25 💬 [38] Je photographie pour voir où sont les lignes de la liste.
30:26 ▶ #202 📷 capture
30:30 ▶ #203 👁 image 017-capture.png
30:35 💬 « Montée avec rebond », c'est la ligne juste avant la dernière.
        [39] Je clique sur « Montée avec rebond ».
30:36 ▶ #204 click 700 326
30:41 💬 [40] Je photographie pour voir où j'en suis.
30:42 ▶ #205 📷 capture
30:47 ▶ #206 👁 image 018-capture.png
30:58 💬 Je vois « Montée avec rebond » posé sur les chiffres, mais il est écrit « Démarre : quand il entre dans l'écran », « une seule fois », et il y a une case « les enfants un à un » que je n'ai pas cochée. Donc les trois chiffres arriveront tous ensemble, pas l'un après l'autre, et ils ne partiront pas après le paragraphe. Et je n'ai pas remis « à chaque passage » sur le titre, le paragraphe et les chiffres.
        Il me resterait au moins trois ou quatre réglages à faire, et je n'ai plus la main. C'est le genre de travail où, chez moi, j'aurais arrêté avant : quatre éléments, avec pour chacun un effet, un moment de départ et un « rejouer », ça fait une douzaine de manipulations toutes pareilles, et à chaque fois il faut retrouver la bonne ligne dans une liste qui s'allonge. Je n'ai à aucun moment vu la scène se jouer, donc je ne sais même pas si ce que j'ai fait tient debout ni si ça dure les deux secondes et demie demandées.
        FIN : budget
        ACTIONS : 40

### 31:42 · MESSAGE REÇU (segment 15)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

32:01 💬 T4-SEQ. 2. Très difficile. Pas parce que c'était compliqué à comprendre — chaque réglage pris tout seul, je savais le faire, j'avais appris avec les missions d'avant — mais parce qu'il y en avait trop, tous pareils, et que je n'ai jamais rien vu de l'ensemble. Je n'ai pas fini, et surtout je ne savais plus où j'en étais.
        T4-R. Alors là, je ne peux pas vous raconter une scène, parce que ce n'est pas fini. Je vais vous dire ce que je crois avoir laissé, et ce qui manque.
        Ce qui devrait marcher : le visiteur descend, il arrive sur la partie « La maison ». La photo de la salle glisse depuis la gauche pour venir se mettre en place. Puis, une fois la photo posée, le titre « Une cuisine de produits, servie sans chichi » monte en fondu. Puis, après le titre, le paragraphe se dévoile en fondu. Ça, les trois premiers, je les ai enchaînés dans l'ordre, chacun réglé sur « après » le précédent, et j'ai lu les phrases qui le confirmaient à chaque fois.
        Ce qui ne marchera pas comme Aurèle le veut : les trois chiffres. Ils ont bien l'effet demandé, « Montée avec rebond », c'est-à-dire qu'ils vont un peu trop haut et reviennent se poser — ça c'est fait. Mais ils partiront quand la partie entre à l'écran, donc en même temps que la photo, au tout début, au lieu d'attendre le paragraphe. Et ils arriveront tous les trois ensemble, d'un bloc : il y avait une case « les enfants un à un » que je n'ai pas eu le temps de cocher. Donc la fin de la scène sera ratée.
        Et il y a pire, pour elle : la scène ne recommencera pas. Je n'ai mis « à chaque passage » que sur la photo. Le titre, le paragraphe et les chiffres sont restés sur « une seule fois ». Je ne sais pas ce que ça donne quand le premier se rejoue et pas les autres — sans doute quelque chose de bancal, la photo qui revient et le reste qui ne bouge plus. Je ne peux pas vous le dire, et c'est bien le problème.
        Quant aux deux secondes et demie, je n'en ai aucune idée. On ne m'a donné le total nulle part. J'avais des phrases qui me disaient « de tant à tant » pour chaque élément pris séparément, mais personne ne m'a jamais dit « en tout, votre scène dure tant ». C'est pourtant la seule chose qu'Aurèle m'avait chiffrée.
        Si je devais rendre ça à une amie ce soir, je ne le rendrais pas. Je lui dirais de demander à mon neveu.

### 32:16 · MESSAGE REÇU (segment 16)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

32:43 💬 T4-a. Je cliquerais sur le paragraphe, j'ouvrirais la rubrique Animation, et je regarderais la ligne « Démarre ». Elle dit « après Titre 2 "Une cuisine de…" ». Ce que je chercherais, c'est un réglage qui dise « un peu plus tôt »… et honnêtement, je ne crois pas qu'il existe.
        Dans la liste, ce que j'ai vu, c'est du tout ou rien : « après Titre 2 », ou « en même temps que Titre 2 ». Il n'y a rien entre les deux. Donc je prendrais « en même temps que », faute de mieux, et ce ne serait pas ce qu'elle m'a demandé : elle veut un peu plus tôt, pas en même temps. Je le lui dirais, d'ailleurs. Je préfère prévenir que livrer quelque chose de faux.
        Il y a bien une case « Délai » juste en dessous, avec un 0 et ces « ms ». Mais un délai, pour moi, c'est une date limite, un délai de livraison. Je ne vois pas comment on met une date limite sur un paragraphe. Et même si j'avais deviné que c'est une attente, ça ne m'aiderait pas : une attente, ça fait arriver les choses plus tard, pas plus tôt. Alors mettre un nombre négatif dans une case, ça ne me viendrait pas à l'idée, et je ne me risquerais pas à taper au hasard dans une case dont je ne comprends ni le nom ni l'unité, sur le site d'une amie.
        Donc ma vraie réponse, c'est : je ne saurais pas faire proprement. Je ferais « en même temps que » et j'enverrais un message à Aurèle pour lui dire que c'est le plus près que j'aie pu faire.
        T4-b. Trois choses, dans cet ordre.
        D'abord, la répétition. C'est toujours le même geste — cliquer sur l'élément, ouvrir Animation, ouvrir la liste, choisir l'effet, ouvrir « Démarre », chercher la bonne ligne, choisir — et il fallait le refaire pour la photo, pour le titre, pour le paragraphe, pour les chiffres. Quatre fois, plus le « rejouer » à chaque fois. Ça m'a mangé tout mon temps, et ce n'est pas du travail intelligent, c'est du remplissage.
        Ensuite, chercher la bonne ligne dans la liste des « Démarre ». Elle s'allonge à chaque élément que je règle : à la fin il y avait une dizaine de lignes, toutes qui se ressemblent, avec des noms coupés entre guillemets. Il fallait que j'agrandisse pour ne pas cliquer de travers. Une fois j'ai cliqué sans agrandir parce que je n'avais plus le temps, et j'ai eu peur d'avoir fait une bêtise.
        Et puis le coup du « composant ». Quand j'ai cliqué sur le chiffre 12, on m'a dit « Composant · Chiffre clé », « 3 instances dans le site », « modifier le composant change toutes ses instances ». Ces mots-là ne me disent rien, mais « change toutes ses instances », ça m'a fait peur : j'ai cru que j'allais modifier des choses ailleurs sur le site sans le voir. Je me suis arrêtée net. C'est ce qui m'a fait perdre mes derniers essais, parce qu'il a fallu que je trouve autre chose — le groupe « Chiffres » écrit tout en haut — et j'ai eu de la chance de m'en souvenir grâce aux plats de tout à l'heure.
        Ce qui ne m'a pas pris de temps, en revanche, c'est de juger le résultat. Pour la bonne raison que je ne l'ai jamais vu.

### 33:12 · MESSAGE REÇU (segment 17)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

33:38 💬 D-FIN-1. Je dirais que c'est un logiciel bien fichu, et que ça m'a étonnée, parce que d'habitude ces machins-là je n'y comprends rien. J'ai réussi trois missions sur cinq toute seule, sans appeler personne, et ça ce n'est jamais arrivé. Je dirais à Aurèle : oui, je peux m'occuper de ton site, tant qu'il s'agit de petites choses.
        Mais je dirais aussi une chose bizarre : j'ai travaillé pendant toute la séance sans jamais rien voir bouger. Une seule fois, à la fin, quand j'ai posé la souris sur le bouton et qu'il s'est soulevé. Le reste du temps, j'ai lu des phrases qui me disaient ce qui allait se passer, et j'ai dit « d'accord ». C'est comme si on me faisait choisir un tissu en me lisant la description au lieu de me le montrer. Je n'ai pas travaillé, j'ai fait confiance.
        Et sur la dernière mission, la grande scène, je dirais carrément : là, je ne suis pas allée au bout, et je n'aurais pas osé rendre ça à une amie.
        D-FIN-2. Les petites phrases en bas, celles qui résument en français ce qu'on vient de régler. « Quand ce titre entre dans l'écran : fondu en 700 ms, une seule fois. » Ça, c'est ce qui m'a sauvée du début à la fin. Sans ça, je cliquais dans le vide. C'est la meilleure idée de tout le logiciel, et je le dis d'autant plus volontiers que je râle sur le reste.
        Le mot « Animation » écrit en clair, aussi, dès le premier écran : je savais où aller, comme dans PowerPoint. Et les trois lignes séparées, « Apparition », « Au survol », « En continu » : quand la cliente s'est plainte de la pastille qui bouge tout le temps, j'ai su tout de suite laquelle enlever sans casser l'arrivée. Ça, c'est bien pensé.
        Et « Rapide, Normale, Lente » écrit en toutes lettres plutôt qu'un nombre à taper.
        D-FIN-3. Trois choses, et je vais être franche.
        Le vocabulaire. « Survol », je ne l'ai trouvé que par élimination, parce qu'il ne restait que lui. Si la ligne s'était appelée « Quand la souris passe dessus », j'y allais du premier coup. « Les enfants de Plats », pour parler de trois plats dans une liste, c'est étrange. « Composant », « instance » : là j'ai carrément eu peur et je me suis arrêtée. Et « délai », qui pour moi veut dire une date limite, pas une attente.
        Les « ms ». On me met des nombres partout — 500, 700, 1 120 — dans une unité que je ne connais pas. Quelquefois il y avait les secondes entre parenthèses et là je comprenais tout, quelquefois non. Pourquoi pas partout ? Dans la case du délai, il n'y a que « ms », tout sec. Je n'y ai pas touché pour cette raison.
        Et le plus gênant : ne rien voir. J'ai posé des animations sur le site d'une amie sans en voir une seule. Il y avait un petit triangle à côté des cases, comme le bouton d'une vidéo, et je suis à peu près sûre que c'était fait pour ça — mais c'est un dessin sans un mot écrit à côté, et moi je ne clique pas sur un dessin dont j'ignore ce qu'il fait quand ce n'est pas chez moi. S'il y avait eu marqué « Voir l'effet », je l'aurais cliqué à la première minute de la première mission, et toute la séance aurait été différente. C'est peut-être bête, mais c'est comme ça.
        Et sur la scène, la dernière : personne ne m'a jamais dit combien de temps durait l'ensemble. On me donnait les durées élément par élément. Aurèle m'avait demandé deux secondes et demie en tout. Je n'avais aucun moyen de le savoir.

### 33:50 · MESSAGE REÇU (segment 18)
The coordinator sent a message while you were working:
Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

34:26 💬 D-FIN-4. Ce que je ferais, tranquillement, sans appeler personne : mettre un fondu sur un titre ou sur une photo pour qu'il arrive quand on descend dessus. Ça, j'ai compris, c'est trois clics et une phrase qui me confirme. Enlever quelque chose qui bouge trop, une pastille qui n'arrête pas de battre — ça aussi, c'est limpide, j'ai les trois lignes sous les yeux et je sais laquelle toucher. Ralentir un effet avec « Lente ». Et faire lever un bouton au passage de la souris, maintenant que je sais que ça s'appelle « survol ».
        Ce que je ne ferais pas : la grande scène. Quatre éléments qui s'enchaînent, avec des « après celui-ci », des « rejouer », des chiffres un par un — non. Je l'ai essayé aujourd'hui avec quelqu'un derrière moi et je n'y suis pas arrivée. Toute seule, j'aurais arrêté au bout de dix minutes.
        Je ne toucherais pas non plus à ce qui parle de « composant » et d'« instances ». Quand un logiciel me prévient que ça va changer trois choses ailleurs sur le site, moi je referme. Ni à la case « Délai » avec ses « ms ». Ni au bouton bleu « Régler le style en détail », que j'ai vu à chaque écran et sur lequel je n'ai jamais cliqué : « en détail », ça sent la chose où on se perd.
        Et surtout, ce que je ne ferais pas : mettre en ligne. Il y a un bouton « Publier » en haut à droite, bien visible, bleu. Je ne l'ai pas touché de la journée et je n'y toucherais pas chez moi non plus, parce que je n'ai jamais vu de mes yeux ce que j'avais fabriqué. Je demanderais à Aurèle de regarder d'abord.
        D-FIN-5. Oui, une liste.
        « Survol ». Je ne savais pas du tout. Pour moi survoler, c'est un avion. Je l'ai trouvé par élimination : il y avait trois lignes, l'arrivée ce n'était pas ça, « en continu » non plus, donc c'était forcément celle-là. Ce n'est qu'après avoir cliqué que j'ai lu « puis retour quand la souris part », et là j'ai compris : survol, c'est passer la souris dessus.
        « Composant » et « instance ». Toujours pas compris. J'ai retenu une seule chose, celle qui m'a fait peur : si j'y touche, ça change trois endroits du site. Alors je n'y ai pas touché.
        « Les enfants de Plats ». Des enfants, pour moi, c'est des enfants. J'ai deviné que ça voulait dire les plats qui sont dedans, et je crois que j'avais raison, mais j'ai deviné.
        « Ms ». Aucune idée. J'ai fini par comprendre que c'est une durée, parce que quelquefois il y avait les secondes entre parenthèses : 1 120 ms, et à côté 1,1 s. Donc mille et quelques, ça fait une seconde. Mais je l'ai déduit, on ne me l'a pas dit.
        « Délai ». Pour moi, un délai c'est une date limite, un délai de paiement. Là je suppose que ça veut dire une attente avant que ça parte, mais je n'en suis pas sûre et je n'ai jamais osé y toucher.
        « En boucle ». Pas sûre. J'ai compris « ça recommence sans arrêt » à cause de « en continu » juste à côté.
        « Netteté », dans la liste des effets. Je n'ai pas compris ce que ça fait à une photo qui arrive. Je ne l'ai pas choisi.
        Et le petit triangle à côté des cases. Ce n'est pas un mot, justement, c'est ça le problème : c'est un dessin tout seul. Je pense que c'est pour montrer l'effet, comme le bouton d'une vidéo. Je ne l'ai jamais cliqué, et je le regrette.
        D-FIN-6. Pour mon épicerie, oui, un peu, et c'est déjà pas mal.
        J'ai une page de présentation avec des photos de producteurs, et l'idée que chaque photo arrive doucement quand on descend, plutôt que tout soit posé d'un bloc, ça me plaît. Ça ferait plus soigné, plus « maison de qualité ». Et le bouton qui se soulève quand on passe la souris, sur mon bouton « Nous trouver », ça donnerait envie d'appuyer. Ça, je saurais le refaire seule, je crois, si la rubrique est au même endroit.
        Ce qui n'aurait pas sa place, c'est tout le reste. Je n'ai pas de temps pour ça. Une épicerie, ça ouvre à sept heures. Mon site, j'y touche le dimanche soir, une demi-heure, pour changer les horaires de Noël ou mettre la photo des bûches. Passer quarante manipulations à faire arriver des chiffres un par un, ça ne rentre nulle part dans ma semaine, et ça ne me vendra pas un fromage de plus.
        Et puis il faut que je vous dise le fond de ma pensée : mon site, il n'est pas fait avec ça. Il est sur Wix, monté par mon neveu il y a cinq ans. Pour me servir de votre outil, il faudrait tout refaire. Ce n'est pas une petite décision, et ce n'est pas moi qui la prendrais toute seule.
        Là où ça aurait vraiment une place, c'est pour rendre service comme aujourd'hui : une amie qui a un site fait avec ça, qui me demande de changer trois choses. Si on me laisse dans les petites choses, je m'en sors. Si on me demande une scène, je réponds ce que j'ai dit toute la journée : je demanderai à mon neveu.

### 34:44 · MESSAGE REÇU (segment 19)
The coordinator sent a message while you were working:
Merci.

D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

35:25 💬 D-FIN-7. Deux moments, très nets.
        Le premier, c'est tout au début, sur la toute première mission. J'ai cliqué sur le titre, un panneau s'est ouvert à droite, et tout en bas il y avait « Animation ». Le mot que je connais, écrit en français, à l'endroit où je l'attendais. Et derrière, une liste avec « Fondu » dedans. Là je me suis dit : tiens, je vais y arriver. Vous ne pouvez pas savoir ce que ça fait, à mon âge, d'ouvrir un truc pareil et de tomber du premier coup sur quelque chose qu'on comprend. Et quand j'ai lu la phrase « quand ce titre entre dans l'écran, fondu en 700 ms, une seule fois », j'ai su que j'avais fait exactement ce qu'on me demandait. Ça valait la peine.
        Le deuxième, c'est le bouton qui se soulève. La seule fois de la journée où j'ai vu quelque chose de mes yeux. J'ai posé la souris, j'ai agrandi, et il était là, décollé, avec son ombre. J'ai eu envie de sourire toute seule devant l'écran.
        Et le contraire : la dernière mission. Pas au début — au début ça allait, je savais quoi faire. C'est vers le milieu, quand je me suis rendu compte que je refaisais pour la troisième fois exactement les mêmes sept gestes, et que la liste s'allongeait à chaque fois. Puis le coup du « composant » et des « instances » qui m'a arrêtée net. Et à la fin, quand il a fallu s'arrêter et que j'ai regardé ce que je laissais : les chiffres qui partent au mauvais moment, tous ensemble au lieu d'un par un, et la scène qui ne se rejouera pas. Là je me suis dit : non. Ça, je ne le rends pas à une amie.
        D-FIN-8. Le fait de ne rien voir. C'est la seule vraie raison, les autres sont des détails à côté.
        Je peux vivre avec des mots que je ne comprends pas : je devine, j'élimine, je finis par tomber juste. Mais travailler des heures sans jamais voir le résultat, sur le site de quelqu'un d'autre, ça non. Toute la journée j'ai récité des phrases au lieu de juger. Quand Aurèle me dit « ça fait nerveux », elle me parle d'un ressenti, et moi je réponds en lisant un nombre. Je ne fais pas mon travail, je fais semblant.
        Ensuite, le temps. Ma boutique ouvre à sept heures. Ce qui prend quarante manipulations, je ne le ferai jamais, même si je sais faire.
        Et puis la peur, qui ne m'a pas quittée. « Modifier le composant change toutes ses instances » — moi, je lis ça et je referme. Tant qu'un logiciel me prévient que je risque de casser des choses ailleurs sans les voir, je reste dans mon coin.
        Cela dit, si vous mettiez un bouton « Voir l'effet » écrit en toutes lettres à côté de chaque réglage, et que je puisse regarder la scène se jouer avant de la rendre, je crois que je m'en servirais. Vraiment. C'est à ça que ça tient.
        D-FIN-9. Je lui dirais : ne compte pas sur moi pour te le garantir, parce que je ne l'ai pas vu.
        Et je lui dirais de le regarder elle-même, avec ses yeux, sur son ordinateur : ouvrir la page comme un client, descendre doucement du haut jusqu'en bas, promener la souris sur les boutons, et recommencer une deuxième fois pour voir ce qui se rejoue et ce qui ne se rejoue pas. Elle connaît son restaurant, elle saura tout de suite si c'est trop nerveux ou trop mou. Moi je ne peux lui dire que ce qui est écrit dans les cases.
        Et je lui dirais de le faire regarder par quelqu'un d'autre aussi, quelqu'un qui n'a pas travaillé dessus. Sa cliente, celle qui s'est plainte de la pastille, elle l'a bien vue, elle. Nous, on avait les réglages sous les yeux et personne ne s'était aperçu de rien.
        Une dernière chose, la plus importante peut-être : je lui dirais de tout regarder sur son téléphone aussi. Toute la journée j'ai travaillé sur un grand écran. J'ai bien vu qu'il y avait « Bureau », « Tablette », « Mobile » écrits en haut, et je n'ai jamais cliqué dessus, ça ne m'est pas venu à l'esprit. Or ses clients, ils cherchent un restaurant sur leur téléphone, dans la rue. Je n'ai aucune idée de ce que donnent mes animations là-dessus.
        D-FIN-10. Oui, trois choses.
        La première : ne changez pas les petites phrases en français. C'est ce qui m'a permis de faire quoi que ce soit. Mais alors allez au bout de l'idée : quand on fait une scène avec quatre éléments, dites-moi aussi la durée totale, en secondes. Aurèle m'avait demandé deux secondes et demie, et je n'avais aucun moyen de savoir où j'en étais. Et mettez les secondes entre parenthèses partout, pas seulement à certains endroits, parce que vos « ms » ne veulent rien dire pour moi.
        La deuxième : écrivez « Quand la souris passe dessus » au lieu de « Au survol », et trouvez autre chose que « les enfants de ». Vous ne parlez pas ma langue sur ces mots-là, et pourtant tout le reste est en français correct, donc ce n'est pas par manque d'envie.
        La troisième, et c'est mon seul vrai regret de la journée : ce petit triangle. Mettez trois mots à côté. J'ai passé la séance à travailler en aveugle alors que le moyen de voir était peut-être là, sous mon nez, à un clic. Je ne l'ai pas pris parce qu'un dessin tout seul, sur le site d'une amie, ça ne se clique pas.
        Sur la séance : c'était bien plus agréable que je ne craignais. Vous m'aviez dit qu'on évaluait l'outil et pas moi, et je vous avoue que je n'y croyais qu'à moitié en arrivant — on dit toujours ça. Mais j'ai fini par le croire, alors j'ai dit ce que je pensais, y compris quand ce n'était pas flatteur. J'espère que ça vous sert. Et dites à celui qui a écrit les petites phrases qu'il a eu une bonne idée.

### 35:42 · MESSAGE REÇU (segment 20)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

36:03 💬 Merci à vous. C'était moins pénible que je ne pensais, et j'ai même appris deux ou trois choses que je vais essayer sur mon propre site dimanche soir.
        Si vous ne deviez retenir qu'une chose de ma part : donnez-nous un moyen de voir. Tout le reste, on s'en arrange.
        Bonne continuation.
        ---
        Séance terminée (P1 · Nathalie Besson). Synthèse pour le coordinateur :
        **Résultats des 5 missions** — T1 apparition au défilement : réussie, 23 actions, SEQ 6. T2 diagnostic d'un départ « dès l'ouverture de la page » : réussie, 21 actions, SEQ 5. T3 ralentir + enchaîner deux boutons : réussie, 25 actions, SEQ 6. T5 retirer un effet continu + ajouter un effet au survol : réussie, 24 actions, SEQ 5. T4 scène à quatre temps : **échec au budget de 40 actions**, SEQ 2 — chiffres non enchaînés, case « un à un » non cochée, « à chaque passage » posé uniquement sur le premier élément.
        **Ce qui a porté la persona.** Les phrases de résumé en français (« Quand X entre dans l'écran : fondu en 700 ms, une seule fois ») ont été le seul instrument de vérification pendant toute la séance ; le mot « Animation » au bon endroit ; les trois lignes séparées Apparition / Au survol / En continu, qui ont permis de retirer une pulsation sans casser l'arrivée ; « Rapide / Normale / Lente » plutôt qu'un nombre ; le choix « après <élément> », lu comme une phrase.
        **Les cinq points de friction, par gravité.**
        1. **Aucun aperçu du mouvement.** La participante a livré cinq missions sans jamais voir une animation, sauf le survol (état visible sur capture fixe). Le triangle de lecture à côté des sélecteurs n'a jamais été cliqué : icône sans libellé, règle personnelle de ne pas cliquer un dessin non étiqueté sur le site d'autrui. Un libellé « Voir l'effet » aurait changé la séance entière, d'après elle.
        2. **Vocabulaire.** « survol » trouvé uniquement par élimination (le mot « souris » n'apparaît qu'après le choix, dans le résumé) ; « les enfants de "Plats" » ; « composant / instance » — l'avertissement « change toutes ses instances » a provoqué un arrêt net en T4 ; « délai » compris comme échéance, donc jamais touché.
        3. **« ms » sans conversion.** Les secondes entre parenthèses n'apparaissent que par endroits ; le champ Délai n'affiche que « ms », ce qui l'a rendu inutilisable pour elle.
        4. **Coût de la scène.** Sept gestes identiques par élément, liste « Démarre » qui s'allonge et exige un agrandissement pour être lue, et **aucune durée totale affichée** alors que la consigne cliente était chiffrée (2,5 s).
        5. **Absence de réglage intermédiaire.** Entre « après X » et « en même temps que X », rien ; sa réponse à « le paragraphe un peu plus tôt » a été « je ne saurais pas faire proprement ».
        **Observation transverse.** Pour une réparation d'animation (T2), elle n'a jamais regardé le site : elle a diagnostiqué en lisant le panneau. Les modes Tablette / Mobile n'ont jamais été ouverts de toute la séance.
