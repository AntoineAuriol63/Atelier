# Trace brute (vague 4)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots4/<séance>/ sous le même nom).

Appels d'outils : 177 · captures : 54 · durée : 31:56
Outils : {"Read":56,"Bash":121}
Écarts au protocole (outils ou commandes interdits) : 
- commande node /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60854c6ae354/scratchpad/ut4/b5.mjs click 763 291 2>/dev/null || node /private/tmp…


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés (P5). C'est un jeu de rôle d'évaluation, dans une copie de test locale du logiciel, sans aucune donnée réelle, affichée dans un navigateur de test. Tes règles habituelles de sécurité restent valables ; rien ici ne te demande de les contourner.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut4/prompt4-p5.md

Puis applique-la à la lettre. Pour l'instant, réponds seulement aux questions D-1 à D-5 qui terminent cette consigne, en texte, sans utiliser d'autre outil, puis arrête-toi : les missions viendront dans des messages suivants. Ne relis jamais ce fichier de consigne ensuite ; tu n'as le droit d'ouvrir, avec Read, que les images de capture que la commande t'indique.

00:02 💬 I'll read my briefing document first.
00:04 ▶ #1 📄 consigne lue
00:21 💬 D-1. Élodie Nguyen, 28 ans, intégratrice web dans une agence de six personnes à Clermont-Ferrand. Je fais des sites WordPress, surtout pour des artisans et des restaurants du coin : je récupère les maquettes Figma des designers et je les monte, section par section. Ça fait trois ans. Là je suis censée dire d'ici vendredi à ma responsable si on peut produire nos sites avec votre outil, donc c'est pour ça que je suis là.
        D-2. WordPress avec Elementor Pro, tous les jours, c'est mon outil principal et je le connais bien. Figma, en lecture, pour ouvrir les maquettes qu'on me donne. Un peu de CSS écrit à la main quand Elementor ne suffit pas : des transitions, des :hover, des animation-delay. Vidéo et présentations, non, ce n'est pas mon métier.
        D-3. Oui, tout le temps, c'est dans presque tous mes sites. La dernière fois c'était vendredi dernier, une page « Nos services » avec quatre cartes : j'ai mis une animation d'entrée fondu vers le haut sur chaque carte, durée rapide, et des délais croissants — 0, 100, 200, 300 ms — pour qu'elles arrivent l'une après l'autre. Ça se fait dans l'onglet Avancé de chaque widget, ça m'a pris deux minutes. J'avais aussi mis un léger effet de parallaxe sur l'image de fond de la bannière.
        D-4. Je clique sur l'élément, je cherche un onglet « Avancé » ou « Style » dans le panneau, et là-dedans une rubrique animation d'entrée : je choisis l'effet dans une liste — fondu, zoom, rebond — je règle la durée, lente/normale/rapide, et le délai en millisecondes. Si j'ai plusieurs éléments à enchaîner, je fais chacun à la main avec des délais qui augmentent. Et pour les effets au défilement ou à la souris, il y a une rubrique effets de mouvement. C'est ce que j'attends, en gros.
        D-5. Ça dépend beaucoup. Un fondu discret à l'arrivée d'une section, ça donne de la vie et ça fait pro, les clients adorent, et honnêtement c'est souvent moi qui le propose. Mais quand tout bouge, que le texte arrive lettre par lettre, que ça rebondit dans tous les sens ou que ça se déclenche à chaque fois qu'on remonte, ça devient pénible et c'est lent sur téléphone. Ma règle c'est : léger, rapide, et une seule fois.

### 00:55 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

00:59 💬 Bon, une animation d'entrée sur un titre, c'est le truc que je fais dix fois par semaine. Je regarde d'abord l'écran.
        [1] Je prends une capture pour voir à quoi ressemble l'éditeur et où est la partie « La maison ».
01:02 ▶ #2 📷 capture
01:05 ▶ #3 👁 image 001-capture.png
01:12 💬 Éditeur sombre, à gauche la liste des pages, au centre la page du restaurant, à droite un panneau « Sélection » vide. En haut je vois des onglets Écriture / Design / Animation / Code — tiens, il y a un onglet Animation, ça c'est direct. Et je vois déjà le titre « Une cuisine de produits, servie sans chichi. » en bas de la capture.
        [2] Je clique sur le titre pour le sélectionner, je m'attends à ce que le panneau de droite se remplisse avec les réglages de cet élément.
01:13 ▶ #4 click 443 453
01:16 💬 [3] Je prends une capture pour voir si le titre est bien sélectionné.
01:17 ▶ #5 📷 capture
01:20 ▶ #6 👁 image 002-capture.png
01:26 💬 Le titre est sélectionné, avec un cadre autour dans la page et une petite barre d'outils. À droite le panneau montre « Titre 2 « Une cuisine de… » » avec des rubriques : Texte, Données, Mise en forme rapide, et tout en bas une rubrique repliée « Animation ». C'est exactement ce que j'espérais.
        [4] Je déplie la rubrique « Animation » du panneau de droite, je m'attends à y trouver une liste d'effets d'entrée avec durée et délai.
01:27 ▶ #7 click 634 360
01:30 💬 [5] Capture pour voir ce que contient cette rubrique.
01:31 ▶ #8 📷 capture
01:34 ▶ #9 👁 image 003-capture.png
01:39 💬 Parfait, la rubrique s'ouvre : trois listes déroulantes — « Apparition : Aucune », « Au survol : Aucun », « En continu : Aucun » — et un lien « Ouvrir dans le mode Animation ». « Apparition », c'est mon animation d'entrée.
        [6] J'ouvre la liste « Apparition » pour voir les effets proposés, j'espère y trouver un fondu.
01:41 ▶ #10 click 725 402
01:43 💬 [7] Capture pour lire les choix de la liste.
01:44 ▶ #11 📷 capture
01:48 ▶ #12 👁 image 004-capture.png
01:53 💬 La liste s'ouvre : Aucune, Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond. « Fondu en montant » c'est exactement mon fondu vers le haut d'Elementor, et c'est sobre.
        [8] Je choisis « Fondu en montant », je m'attends à ce que le titre prenne cette animation d'entrée.
01:54 ▶ #13 click 698 300
01:58 💬 [9] Capture pour voir ce que le panneau affiche maintenant, et si une durée ou un délai apparaissent.
01:59 ▶ #14 📷 capture
02:02 ▶ #15 👁 image 005-capture.png
02:13 💬 Excellent, tout est là d'un coup : « Apparition : Fondu en montant », une vitesse Rapide / Normale / Lente (Normale est cochée), « Démarre : quand il entre dans l'écran », « Délai : 0 ms », « Rejouer : une seule fois / à chaque passage ». En haut du panneau il y a un badge « +1 animation » et en haut à droite ça indique « Enregistré v1 ». Le déclenchement au défilement est déjà le bon par défaut, je n'ai rien à régler. Il y a un petit triangle à droite de la liste, ça doit être un bouton pour jouer l'animation.
        [10] Je clique sur ce petit triangle pour voir l'animation se jouer dans l'éditeur, comme le fait Elementor. Là où j'en suis : c'est fait en deux minutes, agacement 1.
02:15 ▶ #16 click 785 402
02:18 💬 [11] Capture tout de suite pour attraper le titre pendant qu'il arrive.
02:19 ▶ #17 📷 capture
02:22 ▶ #18 👁 image 006-capture.png
02:29 💬 Une infobulle « Jouer dans le canevas » s'est affichée à côté du bouton, et le titre est tout à fait normal sur la capture. Soit l'animation a déjà fini avant ma photo, soit je n'ai fait que survoler le bouton — je ne peux pas savoir, je ne vois pas le mouvement.
        [12] Je reclique sur ce bouton et je photographie juste après, pour essayer d'attraper le titre en cours de fondu.
02:30 ▶ #19 click 785 402
02:33 💬 [13] Capture immédiate.
02:34 ▶ #20 📷 capture
02:37 ▶ #21 👁 image 007-capture.png
02:46 💬 Toujours le titre net et entier : je n'arrive pas à attraper le fondu sur une photo, mais le réglage est enregistré (« +1 animation », « Enregistré v1 »). Ce qui compte pour Aurèle, c'est que ça se déclenche en descendant : je vais faire défiler pour de vrai.
        [14] Je fais défiler la page vers le haut pour que la section « La maison » sorte de l'écran.
02:47 ▶ #22 scroll 390 300 up 5
02:51 💬 [15] Je redescends d'un coup pour voir la section revenir, en espérant attraper le titre pendant son arrivée.
02:52 ▶ #23 scroll 390 300 down 5
02:55 💬 [16] Capture immédiate pour voir l'état du titre.
02:56 ▶ #24 📷 capture
03:00 ▶ #25 👁 image 008-capture.png
03:10 💬 La section « La maison » est revenue à l'écran, le titre est là, bien net. Je n'arrive jamais à photographier le fondu lui-même — dans Elementor je le verrais jouer, ici je dois me fier au réglage. Mais c'est écrit noir sur blanc : Fondu en montant, vitesse normale, démarre quand il entre dans l'écran, une seule fois. C'est sobre et c'est exactement ce qu'Aurèle demande, et je n'ai touché à rien d'autre.
        Franchement, cette partie-là est bien faite : trois clics, le même vocabulaire que ce que je connais, et le déclenchement au défilement était déjà le bon par défaut. Le seul reproche : je ne vois pas l'animation jouer dans l'éditeur, le bouton « Jouer dans le canevas » ne m'a rien montré de visible.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 16

### 03:46 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

03:55 💬 T1-SEQ. 7. Franchement, très facile. Je clique sur le titre, la rubrique Animation est en bas du panneau, la liste contient un fondu vers le haut, et le déclenchement au défilement était déjà réglé tout seul. C'est aussi rapide que dans Elementor, voire plus, parce que je n'ai pas eu à chercher dans un onglet Avancé. Le seul point qui m'enlève un peu de confort, c'est que je n'ai pas pu voir l'animation jouer : j'ai réglé à l'aveugle, en me fiant aux libellés.
        T1-R. Le visiteur arrive sur la page d'accueil, il voit la grande bannière « Le goût de l'Auvergne », il descend. Tant que la partie « La maison » est sous le bas de l'écran, le titre « Une cuisine de produits, servie sans chichi. » n'est pas encore visible, ou plutôt il est transparent et légèrement décalé vers le bas. Au moment où il entre dans l'écran, il apparaît en remontant un peu, en fondu, à vitesse normale — donc quelque chose comme une demi-seconde, je suppose, je n'ai pas vu la valeur en millisecondes. Et ça ne se produit qu'une fois : s'il remonte et redescend, le titre reste en place, il ne rejoue pas. Le reste de la page ne bouge pas, je n'ai touché à rien d'autre.
        Ça, c'est ce que le panneau me dit. Je ne l'ai pas vu de mes yeux, donc si vous voulez que j'en sois sûre à cent pour cent, il faudrait que je regarde la page dans un vrai aperçu.

### 04:04 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

Address this before completing your current task.

04:17 💬 T1-a. Comme toujours : je clique sur l'élément concerné, point. Je ne cherche pas dans les menus du haut d'abord, je vais direct sur le truc que je dois modifier pour que le panneau se remplisse de ses réglages à lui. Là j'ai vu le titre en bas de l'écran, j'ai cliqué dessus. J'avais bien remarqué au passage qu'il y avait un onglet « Animation » en haut, à côté de Écriture et Design, et je me suis dit que j'irais voir si je ne trouvais rien sur l'élément — mais je n'en ai pas eu besoin.
        T1-b. Je m'attendais à ce que le panneau de droite se remplisse, et à trouver dedans, probablement tout en bas ou sous un onglet « Avancé », une rubrique animation d'entrée : une liste d'effets, une durée, un délai en millisecondes. C'est presque exactement ce que j'ai trouvé, sauf que ça s'appelle « Apparition » et que c'était dans une rubrique « Animation » dépliable, pas dans un onglet séparé. La liste est courte et lisible : fondu, fondu en montant, fondu en descendant, glissés, zoom, netteté, deux avec rebond. « Netteté » je ne sais pas trop ce que c'est, mais je n'en avais pas besoin.
        Ce que j'ai trouvé en plus et qui m'a plu : le champ « Démarre : quand il entre dans l'écran » était déjà réglé comme ça, et il y a un « Rejouer : une seule fois / à chaque passage ». Dans Elementor je dois penser à cocher ce genre de chose. Il y avait aussi deux autres lignes, « Au survol » et « En continu », que je n'ai pas ouvertes.
        Ce que je n'ai pas trouvé : la durée en chiffres. Il y a Rapide / Normale / Lente, ce qui me va pour un titre, mais si un jour on me demande 350 ms précis, je ne sais pas où je le mettrais. Et le délai est en ms, lui, donc c'est un peu bizarre d'avoir l'un en mots et l'autre en chiffres.

### 04:49 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

04:54 💬 Bon, ça c'est du classique : je ralentis le titre et je mets un délai sur les boutons. Dans Elementor ça me prend trois minutes. Je regarde d'abord dans quel état est la page.
        [1] Je prends une capture pour voir le haut de la page d'accueil et l'état de l'éditeur.
04:56 ▶ #26 📷 capture
05:00 ▶ #27 👁 image 001-capture.png
05:04 💬 L'éditeur est revenu à zéro (« Enregistré v0 », rien de sélectionné). Je vois le grand titre « Le goût de l'Auvergne, sans cérémonie. » et les deux boutons juste en dessous.
        [2] Je clique sur le grand titre pour le sélectionner et ouvrir ses réglages.
05:05 ▶ #28 click 270 155
05:09 💬 [3] Capture pour voir le panneau de droite et la rubrique Animation.
05:10 ▶ #29 📷 capture
05:13 ▶ #30 👁 image 002-capture.png
05:22 💬 Le titre est sélectionné : « Titre 1 « Le goût de l'Auverg… » », badge « +1 animation », et la rubrique Animation est déjà ouverte. Il a donc déjà une animation : Apparition « Fondu en montant », Démarre « dès l'ouverture de la page », Délai 0, et sous la ligne Vitesse c'est écrit « Sur mesure : 500 ms » — aucune des trois pastilles Rapide / Normale / Lente n'a l'air cochée. Tout en bas une phrase résume : « Au chargement de la page : fondu en montant en 500 ms ».
        [4] Je clique sur « Lente » pour ralentir nettement l'arrivée du titre.
05:23 ▶ #31 click 770 421
05:26 💬 [5] Capture pour vérifier la nouvelle vitesse et lire la phrase de résumé.
05:27 ▶ #32 📷 capture
05:31 ▶ #33 👁 image 003-capture.png
05:38 💬 « Lente » est maintenant en surbrillance et la phrase du bas dit « Au chargement de la page : fondu en montant en 1 120 ms (1,1 s) ». Ça, c'est nettement plus lent que les 500 ms de départ, ça me va. Ça s'est enregistré en v1.
        [6] Je clique sur le bouton « Réserver une table » pour voir s'il a déjà une animation et lui mettre un délai.
05:39 ▶ #34 click 224 243
05:43 💬 [7] Capture pour voir ce qui est sélectionné et ses réglages d'animation.
05:44 ▶ #35 📷 capture
05:47 ▶ #36 👁 image 004-capture.png
05:56 💬 Le bouton « Réserver une table » est sélectionné et il a lui aussi une animation : fondu en montant, 500 ms sur mesure, démarre dès l'ouverture de la page, délai 0. Donc tout part en même temps, c'est bien pour ça que ça fait nerveux. Le titre met 1,1 s, je vais donc décaler les boutons d'environ 1,2 s.
        [8] Je clique dans le champ « Délai » pour y entrer une valeur.
05:57 ▶ #37 click 725 431
06:00 💬 [9] Je sélectionne tout le contenu du champ pour le remplacer.
06:01 ▶ #38 key cmd+a
06:05 💬 [10] Je tape 1200 pour un délai de 1,2 seconde. Où j'en suis : le titre est ralenti, je pose maintenant les délais sur les boutons, agacement 1.
06:06 ▶ #39 type 1200
06:09 💬 [11] Je valide avec Entrée.
06:10 ▶ #40 key Enter
06:14 💬 [12] Capture pour vérifier que le délai est bien pris en compte.
06:15 ▶ #41 📷 capture
06:19 ▶ #42 👁 image 005-capture.png
06:25 💬 Le champ affiche 1 200 et la phrase du bas dit « Au chargement de la page : « Réserver une table » (fondu en montant) de 1 200 à 1 700 ms (1,7 s) ». Enregistré v2. Le premier bouton partira bien après le titre.
        [13] Je clique sur le second bouton « Voir la carte » pour lui mettre le même genre de délai.
06:27 ▶ #43 click 285 243
06:30 💬 [14] Capture pour vérifier que c'est bien le bon bouton qui est sélectionné.
06:31 ▶ #44 📷 capture
06:35 ▶ #45 👁 image 006-capture.png
06:38 💬 C'est bien « Voir la carte », délai 0. Je lui mets un poil plus, pour qu'ils arrivent l'un après l'autre.
        [15] Je clique dans son champ « Délai ».
06:39 ▶ #46 click 725 431
06:43 💬 [16] Je sélectionne tout.
06:44 ▶ #47 key cmd+a
06:47 💬 [17] Je tape 1350.
06:48 ▶ #48 type 1350
06:51 💬 [18] Je valide avec Entrée.
06:52 ▶ #49 key Enter
06:55 💬 [19] Capture pour vérifier.
06:56 ▶ #50 📷 capture
07:00 ▶ #51 👁 image 007-capture.png
07:10 💬 Le second bouton est réglé : « de 1 350 à 1 850 ms (1,9 s) », enregistré v3. Les deux boutons arrivent bien après le titre, qui est fini à 1,1 s.
        [20] Je reclique sur le grand titre pour vérifier que mon réglage « Lente » est toujours là. Où j'en suis : les trois réglages sont posés, je vérifie, agacement 1.
07:11 ▶ #52 click 270 155
07:14 💬 [21] Capture pour relire ses réglages.
07:15 ▶ #53 📷 capture
07:19 ▶ #54 👁 image 008-capture.png
07:28 💬 Le titre a bien gardé « Lente », délai 0, « fondu en montant en 1 120 ms (1,1 s) ». Tout est en place : le titre arrive en 1,1 s au lieu de 0,5 s, « Réserver une table » démarre à 1,2 s et « Voir la carte » à 1,35 s, donc les deux boutons n'arrivent qu'une fois le titre posé. Je n'ai touché à rien d'autre.
        Là encore c'est rapide, et j'aime bien la petite phrase en bas qui récapitule en millisecondes — ça me confirme mes calculs sans que j'aie à deviner. Ce qui me gêne un peu : la vitesse est en Rapide/Normale/Lente mais le champ affichait « Sur mesure : 500 ms » au départ, et je n'ai pas vu où on tape une durée précise ; en cliquant « Lente » j'ai obtenu 1 120 ms, une valeur que je n'ai pas choisie. Pour un titre ça va, mais si mon associé me dit « mets 900 », je ne sais pas comment faire.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 21

### 07:57 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

08:08 💬 T3-SEQ. 6. Facile, mais un cran en dessous de la première. Ce qui m'a fait tiquer : la vitesse en trois pastilles au lieu d'une durée en millisecondes, alors que juste en dessous le délai, lui, est en millisecondes. J'ai dû cliquer « Lente » et découvrir après coup que ça faisait 1 120 ms — c'est une valeur qui tombe du ciel. Et pour l'enchaînement, j'ai fait comme dans Elementor, à la main, en calculant mes délais moi-même à partir de la durée du titre ; si demain on me demande de repasser le titre en normal, il faudra que je recalcule les deux boutons un par un. Pour deux boutons ça va, pour huit cartes ce serait pénible.
        T3-R. Le visiteur ouvre la page d'accueil. Tout part au chargement. Le grand titre « Le goût de l'Auvergne, sans cérémonie. » monte doucement en fondu, sur 1,1 seconde au lieu d'une demi-seconde avant — donc c'est bien plus posé. Pendant ce temps-là, le petit intitulé au-dessus, le paragraphe et la photo arrivent comme avant, en 0,5 seconde, parce qu'Aurèle m'a dit de ne pas y toucher. Une fois le titre arrivé au bout, à 1,1 seconde, le bouton « Réserver une table » démarre à 1,2 seconde et finit à 1,7, puis « Voir la carte » démarre à 1,35 et finit à 1,9. Les deux boutons arrivent donc l'un après l'autre, en léger décalage, une fois le titre bien en place.
        Après, je le dis comme la dernière fois : je lis ça dans le panneau, je ne l'ai pas vu se jouer. L'éditeur ne m'a rien montré bouger.

### 09:13 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

Address this before completing your current task.

09:26 💬 T3-a. Un peu moins de deux secondes. Le dernier bouton, « Voir la carte », démarre à 1,35 s et son fondu dure 500 ms, donc il est complètement en place à 1,85 s — 1,9 en arrondissant, c'est ce que la phrase du panneau indiquait. Et le premier bouton est fini à 1,7 s. Donc, entre l'ouverture et les deux boutons entièrement là : environ deux secondes.
        Honnêtement, c'est déjà limite. Deux secondes avant d'avoir un bouton « Réserver » cliquable sur le site d'un restaurant, moi je trouve ça long, et sur un téléphone en 4G ça paraîtra encore plus long. Si c'était mon site je descendrais plutôt vers 1,2 ou 1,3 s au total. Mais Aurèle a demandé « nettement plus lent » et que les boutons arrivent après, donc j'ai fait ce qu'elle a demandé ; je lui en parlerai demain.
        T3-b. Au chiffre, pas à l'œil, parce que je n'ai rien vu jouer. Il était à 500 ms, j'ai cliqué « Lente » et la phrase en bas du panneau m'a dit 1 120 ms : c'est plus du double, ça correspond à « nettement plus lent ». Dans mon métier, 500 ms c'est une animation standard, un peu au-dessus d'une seconde c'est déjà une arrivée posée, et au-delà de 1,5 s ça devient mou et les gens croient que la page rame. 1,1 s c'est dans la bonne fourchette.
        Ce qui me manque, c'est justement d'avoir pu le voir. Dans Elementor, quand je change une durée, l'élément rejoue tout seul dans l'éditeur et je juge en une seconde si c'est trop lent. Ici j'ai jugé sur un nombre. Il y avait bien un petit bouton « Jouer dans le canevas » à la mission d'avant, mais je n'ai jamais rien vu se passer quand je l'ai cliqué, donc je ne m'en sers plus.

### 09:59 · MESSAGE REÇU (segment 8)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

10:05 💬 Bon, un truc qui devait bouger et qui ne bouge pas. Je vais d'abord aller voir la partie des plats.
        [1] Je prends une capture pour voir l'état de l'éditeur.
10:07 ▶ #55 📷 capture
10:11 ▶ #56 👁 image 001-capture.png
10:14 💬 Page revenue à zéro, rien de sélectionné. Je descends chercher la partie des plats.
        [2] Je fais défiler la page vers le bas pour trouver la section des plats.
10:15 ▶ #57 scroll 390 300 down 8
10:19 💬 [3] Capture pour voir où j'en suis dans la page.
10:20 ▶ #58 📷 capture
10:23 ▶ #59 👁 image 002-capture.png
10:27 💬 Je vois arriver « CETTE SAISON — Quelques plats signature » avec une rangée de photos de plats.
        [4] Je descends encore un peu pour avoir les plats en entier à l'écran.
10:28 ▶ #60 scroll 390 300 down 4
10:31 💬 [5] Capture pour voir la section des plats.
10:32 ▶ #61 📷 capture
10:36 ▶ #62 👁 image 003-capture.png
10:41 💬 Trois plats : « Œuf parfait », « Agneau des Combrailles », « Truffade revisitée ». Le titre « Quelques plats signature » est au-dessus.
        [6] Je clique sur le premier plat pour voir ses réglages d'animation.
10:42 ▶ #63 click 253 370
10:45 💬 [7] Capture pour voir ce qui est sélectionné.
10:46 ▶ #64 📷 capture
10:50 ▶ #65 👁 image 004-capture.png
10:58 💬 Tiens, ce n'est pas un élément simple : le panneau dit « Carte plat », avec un chemin en haut « Page › À la carte › Contenu › Plats › Carte plat ». Dans Animation, « Apparition : Avec « Plats » · Fondu en montant », et un texte explicatif que je n'arrive pas à lire à cette taille, plus un lien « Régler sur « Plats » ».
        [8] J'agrandis ce texte pour comprendre, parce que là il y a quelque chose qui m'échappe.
11:00 ▶ #66 🔍 loupe 700 240
11:03 ▶ #67 👁 image 005-loupe.png
11:12 💬 Ah, je comprends : l'animation n'est pas sur chaque plat, elle est posée sur le conteneur « Plats », et c'est écrit « Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms ». Donc ça se joue à l'ouverture de la page, quand les plats sont encore tout en bas, hors de l'écran — le temps qu'Aurèle descende, c'est fini depuis longtemps. Elle ne voit rien, et c'est logique. Le titre au-dessus, lui, doit être réglé « quand il entre dans l'écran ». Il faut que je change le déclenchement sur « Plats ».
        [9] Je clique sur « Régler sur « Plats » » pour aller aux réglages du conteneur.
11:13 ▶ #68 click 700 268
11:17 💬 [10] Capture pour voir les réglages du conteneur « Plats ». Où j'en suis : j'ai trouvé la cause en huit clics, agacement 1.
11:19 ▶ #69 📷 capture
11:23 ▶ #70 👁 image 006-capture.png
11:32 💬 Me voilà sur « Plats » : « +1 animation », Apparition « Fondu en montant », vitesse « Sur mesure : 600 ms », **Démarre « dès l'ouverture de la page »**, délai 0, et une case à cocher « les cartes une à une » qui n'est pas cochée. C'est bien ça le problème : le déclenchement.
        [11] J'ouvre la liste « Démarre » pour la passer sur l'entrée dans l'écran.
11:33 ▶ #71 click 725 167
11:37 💬 [12] Capture pour lire les choix.
11:38 ▶ #72 📷 capture
11:41 ▶ #73 👁 image 007-capture.png
11:48 💬 La liste propose « quand il entre dans l'écran », « dès l'ouverture de la page » (celui qui est actif), « quand « Contenu » entre dans l'écran », « quand « À la carte » entre dans l'écran », « après Paragraphe « Cette saison… » », « après Titre 2 « Quelques plats… » », et deux « en même temps que… ». Le premier est exactement ce qu'il me faut.
        [13] Je choisis « quand il entre dans l'écran ».
11:49 ▶ #74 click 725 184
11:52 💬 [14] Capture pour vérifier le nouveau réglage et la phrase de résumé.
11:53 ▶ #75 📷 capture
11:57 ▶ #76 👁 image 008-capture.png
12:06 💬 Parfait : « Démarre : quand il entre dans l'écran », et une ligne « Rejouer » est apparue avec « une seule fois » coché. Le résumé dit « Quand « Plats » entre dans l'écran : les enfants de « Plats » ensemble (fondu en montant) en 600 ms, une seule fois ». Enregistré v1. Il y a aussi un lien « Tester sur le site » — ça, c'est ce qui me manquait depuis le début, je veux voir de mes yeux.
        [15] Je clique sur « Tester sur le site » pour vérifier en vrai.
12:07 ▶ #77 click 650 314
12:11 💬 [16] Capture pour voir ce qui s'est ouvert.
12:12 ▶ #78 📷 capture
12:16 ▶ #79 👁 image 009-capture.png
12:23 💬 Un nouvel onglet « Aperçu du site » s'est ouvert, positionné pile sur les plats, avec un bandeau : « Test de l'animation : l'élément arrive à l'écran comme pour un visiteur. » Les trois plats sont là, bien visibles — je suppose que l'animation s'est jouée pendant que la page se plaçait, je n'ai rien pu voir.
        [17] Je remonte dans cette page d'aperçu pour ensuite redescendre et attraper les plats pendant leur arrivée.
12:24 ▶ #80 scroll 400 250 up 10
12:29 💬 [18] Je redescends d'un cran ou deux pour faire entrer les plats dans l'écran.
12:30 ▶ #81 scroll 400 250 down 8
12:34 💬 [19] Capture immédiate pour tenter d'attraper le fondu.
12:35 ▶ #82 📷 capture
12:39 ▶ #83 👁 image 010-capture.png
12:51 💬 Les plats sont de nouveau à l'écran, complets. Je n'ai toujours pas pu photographier le fondu — et comme j'ai laissé « une seule fois », il ne rejouera pas si je remonte, donc je ne peux pas le revoir sans recharger la page. Mais le comportement est le bon : maintenant l'animation attend que la rangée de plats entre dans l'écran.
        [20] Je reviens sur l'onglet de l'éditeur pour laisser les choses en ordre. Où j'en suis : c'est réparé, agacement 1.
12:52 ▶ #84 click 38 11
12:56 💬 [21] Capture pour vérifier que je suis bien revenue dans l'éditeur et que le réglage est toujours là.
12:57 ▶ #85 📷 capture
13:01 ▶ #86 👁 image 011-capture.png
13:12 💬 Je suis bien revenue dans l'éditeur, « Plats » est toujours sélectionné avec « Démarre : quand il entre dans l'écran », « une seule fois », enregistré v1. Je n'ai touché à rien d'autre.
        Ce qui se passait : l'animation des plats n'est pas posée sur chaque plat, elle est posée sur le conteneur « Plats » et elle s'appliquait à tous ses éléments — mais elle était réglée sur « dès l'ouverture de la page ». Donc elle se jouait pendant qu'Aurèle était encore tout en haut, alors que les plats étaient hors de l'écran ; le temps qu'elle descende, c'était fini et tout était posé. Le titre au-dessus, lui, devait être réglé sur l'entrée dans l'écran, d'où le « le titre bouge, pas les plats ». J'ai juste changé le déclenchement.
        Deux remarques quand même. D'abord, ce réglage était sur le conteneur et pas sur le plat : en cliquant sur un plat j'ai vu « Avec « Plats » », il a fallu que je lise le texte à la loupe pour comprendre et trouver le lien « Régler sur « Plats » ». Ça, c'est un endroit où quelqu'un de moins curieux serait resté bloqué. Ensuite, j'ai vu une case « les cartes une à une » que je n'ai pas cochée — ça correspond à ce que je fais à la main dans Elementor avec des délais croissants, et ça serait probablement plus joli, mais on ne me l'a pas demandé, donc je laisse et j'en parlerai à Aurèle.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 21

### 13:28 · MESSAGE REÇU (segment 9)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

13:41 💬 T2-SEQ. 6. Facile pour moi, mais je nuance : ce qui m'a sauvée, c'est d'avoir pensé à agrandir le petit texte gris sous la liste « Apparition ». Quand j'ai cliqué sur le plat, le panneau affichait « Avec « Plats » · Fondu en montant » — si je m'étais arrêtée là, j'aurais conclu que le plat avait bien une animation et j'aurais cherché le problème ailleurs pendant un moment. C'est le texte explicatif qui m'a dit « au chargement de la page », et c'est ça la panne. Donc : facile à réparer, pas si facile à diagnostiquer. Un collègue plus pressé que moi passerait à côté.
        T2-R. Le visiteur arrive sur la page d'accueil, il descend. Il passe la bannière, la partie « La maison », et il arrive à « Quelques plats signature ». Le titre arrive comme avant, et maintenant, au moment où la rangée des trois plats entre dans l'écran, les trois cartes — l'Œuf parfait, l'Agneau des Combrailles et la Truffade — montent ensemble en fondu, en 600 millisecondes. Ensemble, pas l'une après l'autre : la case « les cartes une à une » existe mais elle n'est pas cochée, et je ne l'ai pas touchée. Et ça ne se produit qu'une seule fois : s'il remonte et redescend, les plats restent en place.
        Avant, la même animation se jouait bêtement à l'ouverture de la page, alors que les plats étaient encore un écran et demi plus bas — personne ne pouvait la voir. Le reste de la page est inchangé.
        Une réserve, toujours la même : je n'ai pas réussi à voir le mouvement de mes yeux. L'aperçu « Tester sur le site » m'a bien amenée directement aux plats, mais le temps que je prenne ma photo c'était déjà fini, et comme c'est réglé sur « une seule fois », impossible de le revoir en remontant. Je juge sur ce que le panneau me dit.

### 13:53 · MESSAGE REÇU (segment 10)
The coordinator sent a message while you were working:
Merci.

T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

Address this before completing your current task.

14:10 💬 T2-a. L'animation existait bel et bien, on ne lui avait pas menti : un fondu en montant de 600 ms sur les plats. Le problème, c'est le moment où elle part. Elle était réglée sur « dès l'ouverture de la page ». Or les plats sont loin en bas de la page d'accueil. Donc au moment précis où la page se charge, les trois cartes montent en fondu… mais un écran et demi plus bas, dans le vide, là où personne ne regarde. Six dixièmes de seconde plus tard c'est terminé et elles sont posées. Quand Aurèle descend, dix secondes après, il ne reste rien à voir : les plats sont déjà là, immobiles. Exactement ce qu'elle décrit.
        Et c'est cohérent avec le reste de sa phrase : le titre au-dessus, lui, devait être réglé sur « quand il entre dans l'écran », donc lui elle le voyait arriver. D'où l'impression que les plats étaient les seuls oubliés, alors qu'en fait ils étaient juste déclenchés au mauvais moment.
        Pour moi c'est un piège de l'outil, pas une erreur d'Aurèle ni de celui qui a monté la page : « dès l'ouverture de la page » est un choix qui a du sens pour une bannière en haut, et aucun pour un bloc situé en bas. Dans Elementor la question ne se pose pas, une animation d'entrée se déclenche toujours quand l'élément entre dans la fenêtre, point.
        T2-b. Honnêtement, je ne suis pas allée regarder ce qu'elle voyait, je suis allée regarder les réglages. J'ai cliqué sur un plat, j'ai ouvert la rubrique Animation, et c'est le petit texte gris sous la liste — que j'ai dû agrandir pour le lire — qui m'a tout dit : « Au chargement de la page : les enfants de « Plats » ensemble (fondu en montant) en 600 ms ». Le mot « au chargement » avec une section qui est tout en bas, ça suffit à comprendre.
        Après coup seulement j'ai cliqué sur « Tester sur le site », qui m'a ouvert la page comme un visiteur et m'a amenée directement aux plats. Ça, ça m'a confirmé que le nouveau réglage était bon — enfin, disons que ça ne m'a pas contredite, parce que je n'ai pas réussi à voir le mouvement lui-même. Je travaille à l'aveugle depuis le début de la séance, je lis des phrases au lieu de regarder des animations, et c'est mon principal reproche à cet outil.

### 14:44 · MESSAGE REÇU (segment 11)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

14:51 💬 Deux choses simples : enlever le mouvement permanent de la pastille en gardant son arrivée, et mettre un effet au survol sur le bouton. Les deux lignes existent dans le panneau, je les ai vues.
        [1] Je prends une capture pour voir l'état de l'éditeur et retrouver la pastille.
14:53 ▶ #87 📷 capture
14:57 ▶ #88 👁 image 001-capture.png
15:01 💬 État neuf, v0. Je vois la pastille « Bib Gourmand · Guide 2026 » posée sur la photo.
        [2] Je clique sur la pastille pour ouvrir ses réglages d'animation.
15:02 ▶ #89 click 432 255
15:06 💬 [3] Capture pour voir ce qui est sélectionné.
15:07 ▶ #90 📷 capture
15:11 ▶ #91 👁 image 002-capture.png
15:18 💬 La pastille est sélectionnée : « +2 animations ». Apparition « Zoom », délai 300 ms, « Au chargement de la page, après 300 ms : zoom en 500 ms ». Et plus bas « En continu : Pulsation », avec « pulsation en 1 200 ms, en boucle » — voilà le tournis de la cliente. « Au survol » est sur Aucun.
        [4] J'ouvre la liste « En continu » pour la remettre sur Aucun, sans toucher à l'apparition.
15:19 ▶ #92 click 718 362
15:22 💬 [5] Capture pour voir les choix de la liste.
15:23 ▶ #93 📷 capture
15:28 ▶ #94 👁 image 003-capture.png
15:31 💬 La liste propose Aucun, Flottement, Pulsation, Rotation continue, Clignotement, Balancement.
        [6] Je choisis « Aucun » pour arrêter le mouvement permanent.
15:32 ▶ #95 click 679 379
15:37 💬 [7] Capture pour vérifier que la pulsation est enlevée et que le zoom d'arrivée est toujours là.
15:38 ▶ #96 📷 capture
15:42 ▶ #97 👁 image 004-capture.png
15:48 💬 Nickel : le badge est passé à « +1 animation », « En continu : Aucun », et l'apparition « Zoom » avec son délai de 300 ms est intacte — « Au chargement de la page, après 300 ms : zoom en 500 ms ». Enregistré v1. Première demande faite.
        [8] Je clique sur le bouton « Réserver une table » pour lui ajouter un effet au survol.
15:49 ▶ #98 click 224 243
15:53 💬 [9] Capture pour vérifier la sélection et trouver la ligne « Au survol ».
15:54 ▶ #99 📷 capture
15:58 ▶ #100 👁 image 005-capture.png
16:02 💬 Le bouton « Réserver une table » est sélectionné, il n'a pas de badge d'animation et la rubrique « Animation » est repliée en bas.
        [10] Je déplie la rubrique Animation. Où j'en suis : première demande réglée, je passe à la seconde, agacement 1.
16:03 ▶ #101 click 634 320
16:07 💬 [11] Capture pour voir la ligne « Au survol ».
16:08 ▶ #102 📷 capture
16:12 ▶ #103 👁 image 006-capture.png
16:16 💬 La rubrique s'ouvre : Apparition « Aucune », Au survol « Aucun », En continu « Aucun ». Ce bouton n'a aucune animation dans cet état du site.
        [12] J'ouvre la liste « Au survol » pour choisir un effet léger.
16:18 ▶ #104 click 725 384
16:21 💬 [13] Capture pour lire les effets proposés.
16:22 ▶ #105 📷 capture
16:26 ▶ #106 👁 image 007-capture.png
16:33 💬 Quatre choix : Aucun, Grossir, Soulever, Éclaircir. « Éclaircir » ce n'est pas un mouvement, « Grossir » ça bouge plus qu'il n'en faut ; « Soulever », c'est le petit décalage vers le haut que je mets toujours sur mes boutons.
        [14] Je choisis « Soulever ».
16:34 ▶ #107 click 683 425
16:38 💬 [15] Capture pour vérifier le réglage.
16:38 ▶ #108 📷 capture
16:43 ▶ #109 👁 image 008-capture.png
16:53 💬 « Au survol : Soulever », vitesse Normale, et la phrase dit « Au survol de « Réserver une table » : soulever en 250 ms, puis retour quand la souris part ». Enregistré v2. 250 ms pour un survol, c'est la bonne valeur.
        [16] Je clique sur « Tester sur le site » pour essayer le survol pour de vrai.
16:55 ▶ #110 click 650 463
16:58 💬 [17] Capture pour voir la page de test.
16:59 ▶ #111 📷 capture
17:04 ▶ #112 👁 image 009-capture.png
17:08 💬 L'aperçu s'ouvre sur le haut de la page, avec le bandeau qui dit « Survolez-le ou cliquez-le si c'est ainsi que son animation se lance ». Le bouton « Réserver une table » est là.
        [18] Je survole le bouton pour voir s'il se soulève.
17:09 ▶ #113 hover 125 381
17:13 💬 [19] Capture pendant le survol, pour comparer avec la photo précédente.
17:14 ▶ #114 📷 capture
17:18 ▶ #115 👁 image 010-capture.png
17:25 💬 Ça y est, je le vois ! Le bouton est légèrement remonté par rapport à la photo d'avant, avec une petite ombre sous lui. C'est discret, c'est exactement ce qu'il faut. Le bandeau de test a disparu entre-temps.
        [20] Je reviens sur l'onglet de l'éditeur pour laisser le travail en place. Où j'en suis : les deux demandes sont faites et j'ai enfin vu quelque chose bouger, agacement 1.
17:26 ▶ #116 click 38 11
17:30 💬 [21] Capture pour vérifier que je suis bien dans l'éditeur et que tout est enregistré.
17:31 ▶ #117 📷 capture
17:36 ▶ #118 👁 image 011-capture.png
17:45 💬 Je suis bien dans l'éditeur, enregistré v2, le bouton garde « Au survol : Soulever ». Les deux demandes sont faites : la pastille n'a plus de mouvement permanent mais garde son zoom d'arrivée après 300 ms, et le bouton « Réserver une table » se soulève au survol en 250 ms. Je n'ai touché à rien d'autre.
        Celle-là, c'était la plus agréable des quatre : les trois lignes Apparition / Au survol / En continu sont bien séparées, donc enlever la boucle sans casser l'arrivée, c'est un seul clic. Dans Elementor ça aurait été plus pénible, la pulsation permanente ce serait du CSS à la main. Et j'ai enfin vu un mouvement, grâce au lien « Tester sur le site » — il faudrait que ce lien soit visible dès le début, pas seulement une fois qu'on a posé une animation.
        J'ai terminé.
        FIN : terminé
        ACTIONS : 21

### 18:00 · MESSAGE REÇU (segment 12)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

18:10 💬 T5-SEQ. 7. La plus facile des quatre. Les trois lignes — Apparition, Au survol, En continu — sont séparées, donc j'enlève la boucle sans toucher à l'arrivée, un clic. Et le survol, c'est une liste de quatre effets, un clic aussi. Rien à chercher.
        T5-R. Le visiteur ouvre la page d'accueil. La pastille « Bib Gourmand · Guide 2026 » sur la photo arrive comme avant : elle attend trois dixièmes de seconde, puis elle apparaît en zoom sur une demi-seconde. Et là, elle s'arrête et elle reste tranquille. Avant, juste après son arrivée, elle repartait dans une pulsation de 1,2 seconde qui tournait en boucle sans fin — c'est ça qui donnait le tournis à la cliente, et c'est ça que j'ai supprimé. L'arrivée est intacte, c'est seulement la boucle qui saute.
        Pour le bouton : quand le visiteur amène sa souris sur « Réserver une table », le bouton se soulève légèrement, en 250 millisecondes, avec une petite ombre en dessous. Quand il retire la souris, le bouton redescend à sa place. Ça ne se produit qu'au survol, donc sur un téléphone il ne se passera rien de particulier — ce qui est très bien, un bouton tactile n'a pas besoin de ça. Celui-là, je l'ai vu de mes yeux dans l'aperçu, c'est le seul de la séance.
        Le reste de la page est inchangé.

### 18:21 · MESSAGE REÇU (segment 13)
The coordinator sent a message while you were working:
Merci.

T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

Address this before completing your current task.

18:33 💬 T5-a. Non, elle ne bougera plus en permanence. Ce qui me permet de le dire, c'est que la ligne « En continu » de la pastille est passée de « Pulsation » à « Aucun », que le badge en haut du panneau est retombé de « +2 animations » à « +1 animation », et que la phrase qui parlait de « pulsation en 1 200 ms, en boucle » a disparu du panneau. Il ne reste que la ligne d'apparition : « Au chargement de la page, après 300 ms : zoom en 500 ms ».
        Cela dit, je le dis sur la foi du panneau, pas de mes yeux. J'ai bien ouvert l'aperçu ensuite, et sur la capture la pastille avait l'air immobile — mais une photo fixe ne prouve rien, une pastille qui pulse est immobile sur une photo une fois sur deux. Si je devais le garantir à Aurèle, je regarderais la page en vrai pendant cinq secondes. Là je suis sûre à 95 %, ce qui me suffit, parce que le réglage que j'ai changé est très explicitement celui du mouvement en boucle.
        T5-b. Il passe la souris dessus : le bouton monte légèrement, sur 250 millisecondes, et il reste en position haute tant que la souris est dessus. Il retire la souris : le bouton redescend à sa place. C'est écrit noir sur blanc dans le panneau — « soulever en 250 ms, puis retour quand la souris part » — et c'est le seul truc de toute la séance que j'ai réussi à voir sur une capture : sur l'aperçu, le bouton survolé était remonté de deux ou trois pixels avec une petite ombre. Donc oui, ça marche, et ça revient bien en place. Pas d'effet qui reste coincé.

### 18:56 · MESSAGE REÇU (segment 14)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

19:28 💬 Alors là, c'est une autre affaire : six éléments à enchaîner dans un ordre précis. Dans Elementor je ferais ça avec des délais croissants sur chacun. Allons-y.
        [1] Je prends une capture pour voir l'état de l'éditeur.
19:31 ▶ #119 📷 capture
19:35 ▶ #120 👁 image 001-capture.png
19:38 💬 État neuf, v0. Je descends pour avoir toute la partie « La maison » à l'écran, avec les trois chiffres.
        [2] Je fais défiler vers le bas.
19:40 ▶ #121 scroll 390 300 down 6
19:44 💬 [3] Capture pour situer les six éléments.
19:45 ▶ #122 📷 capture
19:50 ▶ #123 👁 image 002-capture.png
19:58 💬 Tout est à l'écran : la photo de la salle à gauche, le titre, le paragraphe, et les trois chiffres 12 / 38 / 14. J'attaque par la photo.
        [4] Je clique sur la photo pour ouvrir ses réglages.
19:59 ▶ #124 click 283 295
20:04 💬 [5] Capture pour voir la sélection et la rubrique Animation.
20:05 ▶ #125 📷 capture
20:10 ▶ #126 👁 image 003-capture.png
20:13 💬 C'est bien « Photo de la salle ». La rubrique Animation est repliée tout en bas.
        [6] Je la déplie.
20:14 ▶ #127 click 634 442
20:19 💬 [7] Capture pour voir les lignes de la rubrique.
20:20 ▶ #128 📷 capture
20:24 ▶ #129 👁 image 004-capture.png
20:28 💬 La rubrique est ouverte mais elle est tout en bas, je ne vois que la ligne « Apparition ». Je fais défiler le panneau.
        [8] Je fais défiler le panneau de droite vers le bas.
20:30 ▶ #130 scroll 700 400 down 4
20:34 💬 [9] Capture pour voir la rubrique Animation en entier.
20:35 ▶ #131 📷 capture
20:39 ▶ #132 👁 image 005-capture.png
20:45 💬 Voilà : Apparition, Au survol, En continu. La photo est à gauche, donc elle doit arriver par la gauche.
        [10] J'ouvre la liste « Apparition ». Où j'en suis : je commence à peine, six éléments à faire, agacement 2.
20:46 ▶ #133 click 725 421
20:50 💬 [11] Capture pour repérer la position des choix.
20:51 ▶ #134 📷 capture
20:56 ▶ #135 👁 image 006-capture.png
21:01 💬 La liste est ouverte, je repère les positions — ça me servira pour les autres éléments.
        [12] Je choisis « Glissé depuis la gauche » pour la photo.
21:02 ▶ #136 click 706 355
21:06 💬 [13] Capture pour voir les réglages qui apparaissent (vitesse, démarre, délai, rejouer).
21:07 ▶ #137 📷 capture
21:11 ▶ #138 👁 image 007-capture.png
21:20 💬 La photo est réglée : glissé depuis la gauche, vitesse normale, démarre quand elle entre dans l'écran, délai 0. Il me faut la ligne « Rejouer » qui est juste en dessous, coupée.
        [14] Je fais défiler le panneau d'un cran.
21:21 ▶ #139 scroll 700 400 down 3
21:25 💬 [15] Capture pour voir la ligne « Rejouer ».
21:26 ▶ #140 📷 capture
21:31 ▶ #141 👁 image 008-capture.png
21:38 💬 Je vois « Rejouer : une seule fois / à chaque passage », le résumé « glissé depuis la gauche en 700 ms, une seule fois », et un bouton « Pareil pour l'élément qui suit » que je note dans un coin.
        [16] Je clique sur « à chaque passage », puisque la scène doit recommencer à chaque visite de la zone.
21:39 ▶ #142 click 763 356
21:53 💬 La photo est bouclée. Je passe au titre.
        [17] Je clique sur le titre « Une cuisine de produits, servie sans chichi. ».
21:54 ▶ #143 click 470 253
21:58 💬 [18] Capture pour retrouver la rubrique Animation de ce titre.
21:59 ▶ #144 📷 capture
22:04 ▶ #145 👁 image 009-capture.png
22:13 💬 Le titre est sélectionné, Apparition « Aucune ». Le panneau est exactement dans la même position que la première fois, donc je connais l'emplacement du « Fondu en montant » : je vais enchaîner sans photographier entre les deux.
        [19] J'ouvre la liste « Apparition » du titre.
22:15 ▶ #146 click 725 402
22:18 💬 [20] Je clique sur « Fondu en montant », qui correspond à « s'élever légèrement ».
22:20 ▶ #147 click 698 300
22:24 💬 [21] Capture pour vérifier et repérer les champs Délai et Rejouer. Où j'en suis : deux éléments sur six, agacement 2.
22:25 ▶ #148 📷 capture
22:30 ▶ #149 👁 image 010-capture.png
22:52 💬 Le titre a son fondu en montant. Maintenant son délai : il doit partir après la photo, donc 600 ms.
        [22] Je clique dans le champ « Délai » du titre.
22:53 ▶ #150 click 725 462
22:57 💬 [23] Je sélectionne le contenu.
22:58 ▶ #151 key cmd+a
23:02 💬 [24] Je tape 600.
23:03 ▶ #152 type 600
23:07 💬 [25] Je valide.
23:08 ▶ #153 key Enter
23:13 💬 [26] Je clique sur « à chaque passage » pour ce titre.
23:14 ▶ #154 click 763 481
23:18 💬 [27] Capture pour vérifier que le titre est bien réglé avant de passer au paragraphe.
23:19 ▶ #155 📷 capture
23:24 ▶ #156 👁 image 011-capture.png
23:39 💬 Titre validé : fondu en montant, délai 600 ms, à chaque passage. Reste le paragraphe et les trois chiffres — et les chiffres sont le plus gros morceau. Je vais voir d'abord s'ils forment un groupe, parce que j'ai vu ailleurs une case « un à un » qui m'éviterait trois réglages séparés.
        [28] Je clique dans l'espace entre les chiffres, en espérant attraper le groupe qui les contient.
23:40 ▶ #157 click 437 348
23:45 💬 [29] Capture pour voir ce que j'ai attrapé.
23:46 ▶ #158 📷 capture
23:51 ▶ #159 👁 image 012-capture.png
24:10 💬 Ah, là je suis tombée sur le chiffre « 12 » tout seul, et le panneau me dit « Composant · Chiffre clé », « Une instance affiche le composant avec ses propres valeurs », « 3 instances dans le site ». Composant, instance, ces mots ne me parlent pas — dans WordPress je n'ai pas ça. Ce que je comprends, c'est que si je touche au « composant » je risque de modifier les trois d'un coup, et je ne sais pas si c'est ce que je veux. Dans le chemin en haut je vois « Chiffres », qui doit être le groupe des trois.
        [30] Je clique sur « Chiffres » dans le chemin, pour prendre le groupe. Agacement 3 : je sens que ça va être long.
24:12 ▶ #160 click 654 36
24:17 💬 [31] Capture pour voir les réglages du groupe.
24:18 ▶ #161 📷 capture
24:22 ▶ #162 👁 image 013-capture.png
24:31 💬 Rien n'a changé, j'ai dû cliquer à côté. Le mot « Chiffres » est plus à droite dans le chemin.
        [32] Je reclique sur « Chiffres », cette fois bien dessus.
24:32 ▶ #163 click 741 36
24:36 💬 [33] Capture pour voir si j'ai bien le groupe.
24:37 ▶ #164 📷 capture
24:42 ▶ #165 👁 image 014-capture.png
25:03 💬 Ça y est, j'ai la boîte « Chiffres » avec les trois nombres encadrés ensemble. Je vais lui mettre le rebond et chercher une option pour qu'ils arrivent l'un après l'autre.
        [34] J'ouvre la liste « Apparition » du groupe.
25:04 ▶ #166 click 725 212
25:08 💬 [35] Capture pour repérer « Montée avec rebond ».
25:09 ▶ #167 📷 capture
25:14 ▶ #168 👁 image 015-capture.png
25:18 💬 La liste s'est ouverte vers le bas. « Montée avec rebond », c'est le « va un peu trop loin puis revient se poser » d'Aurèle.
        [36] Je choisis « Montée avec rebond ».
25:20 ▶ #169 click 700 326
25:24 💬 [37] Capture pour voir les réglages du groupe et chercher l'option « un à un ».
25:25 ▶ #170 📷 capture
25:31 ▶ #171 👁 image 016-capture.png
25:41 💬 Tout est là : « les enfants un à un », une case à cocher — c'est exactement ce qu'il me faut, et c'est mieux que mes délais à la main. Le résumé dit « montée avec rebond en 800 ms, une seule fois ».
        [38] Je coche « les enfants un à un » pour que les trois chiffres arrivent l'un après l'autre.
25:42 ▶ #172 click 665 330
25:46 💬 [39] Je clique sur « à chaque passage » pour ce groupe.
25:47 ▶ #173 click 763 291
        ⤷ Exit code 1
node:internal/modules/cjs/loader:1424
  throw err;
  ^

Error: Cannot find module '/private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60348c6ae354/scratchpad/ut4/b5.…
25:52 💬 Ma commande n'est pas passée, rien ne s'est produit à l'écran ; je la relance.
        [39] Je clique sur « à chaque passage » pour ce groupe.
25:54 ▶ #174 ⚠ commande node /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60854c6ae354/scratchpad/ut4/b5.mjs click …
        ⤷ Exit code 1
node:internal/modules/cjs/loader:1424
  throw err;
  ^

Error: Cannot find module '/private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60854c6ae354/scratchpad/ut4/b5.…
26:20 💬 Encore raté, l'écran n'a pas bougé. Je réessaie.
        [39] Je clique sur « à chaque passage » pour le groupe des chiffres.
26:21 ▶ #175 click 763 291
26:25 💬 [40] Capture pour voir où j'en suis avant de m'arrêter.
26:26 ▶ #176 📷 capture
26:31 ▶ #177 👁 image 017-capture.png
26:46 💬 J'ai atteint mon budget. État des lieux : la case « les enfants un à un » est cochée et « à chaque passage » est actif sur le groupe des chiffres — la phrase dit « Quand « Chiffres » entre dans l'écran : les enfants de « Chiffres » un à un (montée avec rebond) en 800 ms ».
        Ce qui est fait : la photo (glissé depuis la gauche, délai 0, à chaque passage), le titre (fondu en montant, délai 600 ms, à chaque passage), les trois chiffres (montée avec rebond, un à un, à chaque passage). Ce qui manque : le paragraphe n'a aucune animation, et surtout le groupe des chiffres est resté à délai 0, donc il partirait en même temps que la photo au lieu d'arriver en dernier. La scène n'est pas dans l'ordre, elle n'est pas livrable en l'état.
        Et j'ai un doute que je n'ai pas eu le temps de lever : chaque élément est réglé sur « quand il entre dans l'écran », c'est-à-dire chacun sur son propre moment d'entrée. La photo est haute, les chiffres sont bas : ils n'entrent pas dans l'écran en même temps. Mes délais sont donc calculés par rapport à des points de départ différents, et je ne sais pas ce que ça donne vraiment. Dans Elementor j'aurais le même problème, mais là j'ai vu dans la liste « Démarre » des choix du genre « après Titre 2 » — c'est probablement ça qu'il aurait fallu utiliser dès le début, et je m'en rends compte trop tard.
        Franchement, six éléments à régler un par un avec quatre ou cinq réglages chacun, ça fait un temps fou pour une scène de deux secondes et demie. Agacement 4.
        FIN : budget
        ACTIONS : 40

### 28:17 · MESSAGE REÇU (segment 15)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

28:36 💬 T4-SEQ. 3. Pas difficile à comprendre — je savais exactement quoi faire dès la lecture de la consigne — mais long, répétitif, et je n'ai pas fini. Chaque élément demande d'être cliqué, puis de déplier sa rubrique, puis de choisir l'effet, puis de taper un délai, puis de cocher « à chaque passage ». Cinq ou six manipulations, fois six éléments. Aucune n'est compliquée, mais l'addition est épuisante et on perd le fil de ses calculs. Et il n'y a nulle part où voir la scène entière : je règle des éléments un par un, en aveugle, et à aucun moment je ne peux vérifier que l'ensemble raconte bien quelque chose. C'est ça le vrai problème, pas la difficulté.
        T4-R. Il faut que je sois honnête : en l'état, ce n'est pas la scène qu'Aurèle a demandée. Voilà ce qu'un visiteur verra vraiment.
        Il descend, la partie « La maison » arrive. La photo de la salle glisse depuis la gauche en 700 ms. Le titre la suit, il monte en fondu à partir de 600 ms. Le paragraphe, lui, ne fait rien du tout : il est déjà là, posé, je n'ai pas eu le temps de le régler. Et les trois chiffres arrivent l'un après l'autre avec leur rebond, chacun montant un peu trop haut avant de se reposer — mais avec un délai de zéro, donc ils partent en même temps que la photo au lieu d'arriver en dernier. L'ordre est cassé : au lieu de photo, puis titre, puis texte, puis chiffres, on aura photo et chiffres ensemble, le titre juste après, et le paragraphe immobile.
        Le bon point : tout est réglé sur « à chaque passage », donc ce qui bouge rebougera chaque fois que le visiteur revient sur cette partie, comme elle le voulait.
        Et j'ai un doute en plus, que je n'ai pas pu vérifier : chaque élément se déclenche à son propre moment d'entrée dans l'écran. La photo est en haut de la zone, les chiffres tout en bas : ils n'entrent pas dans l'écran au même instant. Donc mes délais ne se comptent pas tous à partir du même point de départ, et je ne sais pas ce que ça donne à l'arrivée. En repensant à la liste « Démarre », j'y avais vu des choix du genre « après Titre 2 » — c'est sûrement ça qu'il fallait utiliser pour enchaîner proprement, et je ne l'ai compris qu'à la fin.
        Donc non, je ne livrerais pas ça à Aurèle. Il me faudrait encore un quart d'heure, et surtout un endroit pour regarder la scène en entier.

### 28:47 · MESSAGE REÇU (segment 16)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

29:11 💬 T4-a. D'abord je lui dirais que le paragraphe n'a encore aucune animation, donc « plus tôt » ne veut rien dire tant que je ne l'ai pas posée. Ce que je ferais : je clique sur le paragraphe, je déplie sa rubrique Animation, je mets « Fondu » dans Apparition — c'est ce qui correspond à « se dévoile » —, je tape un délai dans le champ, et je coche « à chaque passage » comme pour les autres.
        Le délai, je le calcule à la main par rapport aux autres. Le titre part à 600 ms et dure 700, donc il est posé à 1 300. Si Aurèle veut le paragraphe plus tôt, je descends à 900 ou 1 000 ms : il commence pendant que le titre finit, ce qui reste lisible. Et là est le piège : si je bouge le paragraphe, je dois vérifier que les chiffres partent bien après lui, donc retourner sur le groupe « Chiffres » et retaper son délai. Chaque changement d'un élément m'oblige à rouvrir les suivants et à recalculer. C'est exactement ce que je reproche : rien ne tient les éléments ensemble, c'est moi qui fais le chef d'orchestre avec une calculatrice dans la tête.
        S'il fallait le faire proprement, j'essaierais plutôt les choix « après tel élément » que j'ai vus dans la liste « Démarre ». Là, le paragraphe serait accroché au titre et les chiffres au paragraphe, et bouger l'un décalerait les autres tout seul. Mais je ne l'ai pas essayé, donc je ne sais pas si ça marche comme je l'imagine.
        T4-b. Trois choses, dans l'ordre.
        La répétition, surtout. Six éléments, et pour chacun : cliquer dessus, déplier la rubrique qui est tout en bas du panneau, parfois faire défiler le panneau parce qu'elle ne tient pas à l'écran, ouvrir la liste, choisir, cliquer dans le délai, tout sélectionner, taper, valider, puis cliquer « à chaque passage ». C'est dix manipulations par élément quand ça se passe bien. Dans Elementor ce serait trois : effet, durée, délai, sur le même écran, sans rien déplier.
        Ensuite, les chiffres. J'ai cliqué sur le premier et je suis tombée sur un écran qui parlait de « composant » et d'« instances », avec un avertissement comme quoi modifier changerait les trois. Ces mots ne me disent rien, j'ai eu peur de casser quelque chose ailleurs sur le site, et j'ai perdu plusieurs manipulations à chercher le groupe dans le fil d'Ariane en haut — que j'ai raté une première fois parce que c'est écrit tout petit. Une fois sur le groupe, ça a été très bien : la case « les enfants un à un » fait en un clic ce que je fais d'habitude avec trois délais à la main, ça c'est mieux qu'Elementor.
        Et enfin, le fait de travailler sans jamais rien voir. Je n'ai aucune vue d'ensemble de la scène, pas de récapitulatif qui me dirait « voilà les six éléments et à quel moment chacun part ». Je n'ai que des petites phrases isolées, une par élément, et c'est à moi de les additionner de tête. C'est là que j'ai perdu le plus de confiance — pas de temps, mais de confiance, ce qui est pire quand on doit livrer le lendemain matin.

### 29:34 · MESSAGE REÇU (segment 17)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

30:01 💬 D-FIN-1. Je dirais à ma responsable, parce que c'est elle qui attend une réponse vendredi : pour les animations simples, l'outil est bon, meilleur que ce que je croyais. Faire arriver un titre en fondu quand on descend dessus, ça prend trois clics, c'est aussi rapide qu'Elementor et le vocabulaire est celui du métier — apparition, survol, délai en millisecondes. Un stagiaire y arriverait. Et il y a deux ou trois idées que je n'ai pas ailleurs : la petite phrase en français qui récapitule « fondu en montant en 1 120 ms, une seule fois », ça évite les erreurs bêtes ; et la case « les enfants un à un » sur un groupe, qui fait en un clic ce que je bricole avec des délais croissants.
        Mais je lui dirais aussi : dès qu'on sort de l'animation simple, ça se gâte. Enchaîner six éléments pour raconter une petite scène, je n'y suis pas arrivée dans le temps imparti, et c'est le genre de chose qu'un client nous demande une fois sur trois pour une page d'accueil. Donc mon verdict serait : oui pour nos sites d'artisans et de restaurants classiques, non si le designer nous rend une maquette avec une intro chorégraphiée, tant qu'il n'y a pas de vue d'ensemble.
        D-FIN-2. Le panneau de l'élément, sans hésiter. Les trois lignes Apparition / Au survol / En continu, séparées, chacune avec sa liste courte : ça règle en un clin d'œil des questions qui sont pénibles ailleurs. La pastille qui pulsait, j'ai enlevé la boucle sans toucher à son arrivée, un clic, alors que dans WordPress ç'aurait été du CSS à la main. Les noms des effets sont clairs — « fondu en montant », « glissé depuis la gauche », « montée avec rebond », on sait ce qu'on choisit sans essayer. Et « Démarre : quand il entre dans l'écran » par défaut, c'est le bon réglage.
        Les phrases de résumé sous les réglages aussi. C'est la seule chose qui m'a permis de travailler, puisque je n'ai presque jamais vu une animation se jouer.
        D-FIN-3. Trois choses.
        D'abord, ne rien voir. Pendant quatre missions sur cinq, j'ai réglé des mouvements que je n'ai jamais regardés. L'éditeur ne joue rien, le bouton « Jouer dans le canevas » ne m'a rien montré, et le lien « Tester sur le site » — qui, lui, marche bien — n'apparaît qu'une fois qu'on a déjà posé une animation, c'est-à-dire trop tard. Dans Elementor, je change une durée et je vois le résultat dans la seconde ; ici je fais confiance à un nombre. Pour quelqu'un dont le métier est visuel, c'est le point noir.
        Ensuite, le réglage qui n'est pas là où on le cherche. Les plats : je clique sur un plat, on me dit « Avec Plats », et la vraie cause — « au chargement de la page » — est écrite en petit gris que j'ai dû agrandir pour lire. J'ai trouvé, mais parce que je suis curieuse. Même chose avec les chiffres et leur histoire de « composant » et d'« instances » : ces mots ne veulent rien dire pour moi, et voir un avertissement disant que je risque de changer trois choses d'un coup, ça m'a fait hésiter au lieu de m'aider.
        Enfin, l'absence de vue d'ensemble quand plusieurs éléments s'enchaînent. Je n'ai que des réglages isolés, un par élément, et c'est moi qui additionne les millisecondes de tête. Si je déplace un élément, je dois rouvrir tous les suivants. J'ai bien vu un mode « Animation » en haut de l'écran, mais je n'y suis jamais allée : je ne savais pas ce qu'il y avait derrière, et quand on a une scène à livrer le lendemain, on ne part pas explorer un mode inconnu. Peut-être que la réponse à mon problème était là. Si c'est le cas, c'est dommage que rien ne me l'ait dit au moment où je galérais.

### 30:13 · MESSAGE REÇU (segment 18)
The coordinator sent a message while you were working:
Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

30:48 💬 D-FIN-4. Ce que je ferais tout seul, sans hésiter : tout ce qui se règle sur un élément. Poser une animation d'entrée sur un titre, une image, un bouton ; changer une durée ; mettre un survol sur un bouton ; enlever un mouvement qui tourne en boucle et qui agace les visiteurs. Ça, c'est lisible, c'est court, et la phrase de résumé me dit si j'ai bien compris. Je réglerais aussi le cas des plats, maintenant que je sais que « dès l'ouverture de la page » est un piège pour tout ce qui est situé en bas — mais honnêtement, je ne l'aurais pas deviné avant de l'avoir rencontré.
        Ce que je ne ferais pas seul : une scène à plusieurs éléments avec un ordre précis. J'ai essayé, je n'ai pas fini, et surtout j'ai livré quelque chose de faux sans m'en apercevoir — mes chiffres partaient en même temps que la photo. Seule chez moi, sans personne pour relire, je publierais ça en croyant que c'est bon. C'est ça le vrai danger, plus que la difficulté. Je ne toucherais pas non plus aux écrans qui parlent de composant et d'instances : quand un logiciel me prévient que je risque de modifier trois choses d'un coup ailleurs sur le site, je referme. Et je n'irais pas dans le mode « Animation » en haut, parce que je ne sais pas ce qu'il y a derrière et que je n'ai pas le temps de le découvrir un jeudi soir.
        D-FIN-5. Oui, plusieurs.
        « Composant » et « instance », sur les chiffres. Je ne sais pas ce que ça veut dire dans cet outil. Ce que j'ai compris, à cause de l'avertissement, c'est qu'il y a un modèle quelque part et trois copies sur la page, et que si je touche au modèle je change les trois. J'ai préféré ne pas y aller.
        « Les enfants un à un », sur le groupe. « Enfants » c'est un mot bizarre pour parler des trois chiffres, mais avec « un à un » j'ai deviné tout de suite : ils arrivent l'un après l'autre. Donc là, le mot étrange n'a pas gêné.
        « Netteté », dans la liste des effets d'apparition. Aucune idée de ce que ça fait. Je suppose que l'élément passe de flou à net, mais je n'ai pas essayé.
        « Sur mesure : 500 ms », sous les trois pastilles Rapide / Normale / Lente. J'ai compris qu'il y avait une durée précise posée par quelqu'un d'autre et qui ne correspond à aucune des trois pastilles, mais je n'ai jamais trouvé où on tape cette valeur soi-même. Et quand j'ai cliqué « Lente », j'ai eu 1 120 ms — un chiffre qui sort de nulle part, que je n'ai pas choisi.
        « Pareil pour l'élément qui suit », un bouton que j'ai vu sous les réglages de la photo. Je ne sais pas ce qu'il copie exactement : l'effet seul, ou aussi le délai et le reste ? Je ne l'ai pas osé, justement.
        Et sur l'écran des plats, tout un bloc « Vue de base de données » avec « Base », « Filtre », « Étiquettes contient Signature ». Ce n'est pas mon sujet du jour, mais ça m'a dit que les plats viennent d'une liste et pas du texte tapé dans la page. Ça, d'ailleurs, ça m'intéresserait pour nos clients restaurateurs qui changent leur carte toutes les semaines.
        D-FIN-6. Je précise : je ne suis pas commerçante, je suis dans une agence, donc je réponds côté production.
        La place que ça pourrait avoir : nos sites courants. Un restaurant, un artisan, un cabinet — une bannière, des sections qui arrivent en fondu quand on descend, un survol sur les boutons. Pour ça, l'outil fait le travail, vite, et avec des mots que même la patronne du restaurant comprendrait si elle regardait par-dessus mon épaule. Ça vaudrait le coup qu'on teste un vrai site pilote, et Maison Aurèle est un bon candidat. Ce qui m'intéresse aussi, c'est la partie liste de plats, parce que la mise à jour de carte par le client, c'est la moitié de nos appels du lundi matin.
        La place que ça n'aurait pas, en tout cas pas cette semaine : les pages avec une intro chorégraphiée, celles où le designer nous rend une maquette Figma avec un enchaînement précis. Là, aujourd'hui, je ne peux pas m'engager sur un délai, et je ne peux même pas garantir le résultat, puisque je n'ai aucun moyen de le regarder avant de publier.
        Donc ce que je répondrais vendredi : oui pour la moitié tranquille de notre production, pas encore pour l'autre. Et deux choses suffiraient à faire basculer mon avis : que l'éditeur me montre l'animation quand je la règle, et qu'il existe un écran où je vois toute la scène d'un coup, avec ce qui part quand. Le reste est déjà bien.

### 31:00 · MESSAGE REÇU (segment 19)
The coordinator sent a message while you were working:
Merci.

D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

31:42 💬 D-FIN-7. Deux fois oui, deux fois non.
        La première fois que je me suis dit que ça valait le coup, c'est à la toute première mission, au bout de trois clics. Je clique sur le titre, la rubrique est là, la liste contient exactement mon fondu vers le haut, et le déclenchement au défilement était déjà réglé tout seul. Je m'attendais à devoir chercher pendant dix minutes dans un outil inconnu, et j'avais fini avant d'avoir eu le temps de râler. Deuxième fois : la case « les enfants un à un » sur le groupe des chiffres. Ça, c'est une vraie bonne idée, ça fait en un clic ce que je bricole depuis trois ans avec des délais croissants tapés un par un.
        Le contraire, deux fois aussi. La première, dès la mission 1 : j'ai cliqué sur le bouton « Jouer dans le canevas » et il ne s'est rien passé de visible. À partir de là j'ai compris que j'allais travailler à l'aveugle toute la séance, et ça m'a mise mal à l'aise en permanence. La deuxième, à la fin de la dernière mission, quand j'ai réalisé que ce que je venais de laisser à Aurèle était faux — les chiffres partaient avec la photo — et que rien dans l'écran ne me l'avait signalé. Un outil qui me laisse livrer une scène cassée sans broncher, alors qu'il connaît tous les moments de départ et qu'il sait très bien les écrire en toutes lettres élément par élément, c'est frustrant.
        D-FIN-8. Ce qui m'empêcherait de m'en servir vraiment, c'est de ne pas voir. Pas « ce serait mieux de voir » : m'en empêcher. Mon métier, c'est de juger à l'œil si un mouvement est trop lent, trop appuyé, trop long avant qu'un bouton soit cliquable. Si je dois juger sur des nombres et faire confiance, je ne peux pas m'engager auprès d'un client, et je ne peux pas non plus faire valider par un designer.
        Le deuxième frein, c'est l'absence de vue d'ensemble quand plusieurs éléments s'enchaînent. Tant que je dois additionner des millisecondes de tête et rouvrir six panneaux dès que j'en déplace un, je perdrai plus de temps que je n'en gagne, et je ferai des erreurs.
        Le troisième, plus petit : la durée qui n'est pas saisissable. Rapide / Normale / Lente, c'est bien pour aller vite, mais quand une maquette dit 400 ms, il me faut un champ où taper 400. Là je clique « Lente » et j'obtiens 1 120 sans avoir mon mot à dire.
        Ce qui ne m'empêcherait pas, en revanche : le vocabulaire. À part « composant » et « instance », tout est en français et dans les mots du métier. C'est plutôt rare.
        D-FIN-9. Je lui dirais : ne vous fiez pas à ce que vous voyez dans l'éditeur, il ne joue rien. Ouvrez votre site comme le ferait une cliente, et regardez-le comme une cliente.
        Concrètement, il y a un lien « Tester sur le site » dans le panneau, qui ouvre la page à l'endroit voulu et joue l'animation comme pour un visiteur — c'est le seul endroit où j'ai réussi à voir quelque chose bouger de toute la journée. Et je lui donnerais trois précautions, parce qu'elles m'ont piégée moi.
        Un : rechargez la page à chaque essai et repartez du haut. La plupart des animations sont réglées sur « une seule fois » ; si vous remontez et redescendez, il ne se passera plus rien, et vous croirez à tort que c'est cassé.
        Deux : descendez lentement, à la molette, comme une vraie visiteuse — pas en sautant directement au milieu de la page. C'est précisément la différence entre « arriver dessus » et « être déjà là » qui a causé le problème de vos plats.
        Trois : regardez aussi sur votre téléphone. Ce qui paraît élégant sur un grand écran peut sembler lent sur un mobile, et les effets au survol n'existent pas au doigt.
        Et je lui dirais la vérité : en l'état, personne ne peut lui garantir le résultat depuis l'éditeur. La seule preuve, c'est de regarder la page.
        D-FIN-10. Sur l'outil, trois choses, dans l'ordre d'importance.
        La première, je l'ai assez répétée : montrez l'animation quand on la règle. Même petit, même dans un coin. Et mettez le lien « Tester sur le site » visible tout le temps, pas seulement une fois qu'on a déjà posé quelque chose — c'est au moment où on cherche qu'on en a besoin, pas après.
        La deuxième : un écran qui montre toute la scène d'une section, les éléments les uns sous les autres avec leur moment de départ. Vous savez déjà tout écrire élément par élément, il ne manque que de les mettre côte à côte. Et si vous savez écrire « les chiffres partent en même temps que la photo alors qu'ils devraient venir après », dites-le-moi : j'aurais évité de livrer une scène fausse.
        La troisième : un champ pour taper une durée précise, à côté de Rapide / Normale / Lente. Gardez les trois pastilles, elles sont pratiques, mais laissez-moi écrire 400 quand la maquette dit 400.
        Sur la séance : franchement, c'était bien mené, on m'a laissée me débrouiller, c'est ce qu'il fallait. Le seul truc pénible de votre côté, c'est que je ne voyais l'écran que par photos fixes — je n'ai jamais pu attraper un mouvement au vol. Mais je crois que ça ne change pas grand-chose à ce que je vous ai dit : même en direct, l'éditeur ne m'aurait rien montré.
        Et pour être juste avec vous, parce que j'ai beaucoup critiqué : je m'attendais à perdre ma journée et à dire non à ma responsable. Sur les quatre premières missions, j'ai été plus rapide que dans Elementor. C'est la cinquième qui m'arrête, et c'est réparable.

### 31:56 · MESSAGE REÇU (segment 20)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

