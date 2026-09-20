# Trace brute (vague 5)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots5/<séance>/ sous le même nom).

Appels d'outils : 59 · captures : 19 · durée : 13:34
Outils : {"Read":20,"Bash":39}
Écarts au protocole (outils ou commandes interdits) : 
- lecture /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p5.md


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés. C'est un jeu de rôle d'évaluation dans une copie de test locale du logiciel, sans aucune donnée réelle.

Première chose à faire, une seule fois : lis en entier, avec l'outil Read, ta consigne complète (consigne d'incarnation, fiche de la personne que tu incarnes, règles techniques, paroles du modérateur) : /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p5.md

Puis fais exactement ce qu'elle dit : réponds aux questions D-1 à D-5 en texte, sans outil, et arrête-toi. Les missions viendront dans des messages suivants.

00:02 💬 I'll read my full instructions first.
00:03 ▶ #1 ⚠ lecture /private/tmp/claude-501/-Users-antoi-Code-atelier/eb0bb1d2-505f-45cc-8d67-60408c6ae354/scratchpad/ut5/prompt5-p5.md
00:17 💬 D-1. Élodie Nguyen, intégratrice web dans une agence de six personnes à Clermont-Ferrand. Je fais des sites pour des artisans, des restaurants, ce genre de clients. Concrètement je reçois une maquette et je la monte en WordPress, section par section, avec Elementor. Trois ans que je fais ça. Je suis là parce que ma responsable veut savoir pour vendredi si on peut produire nos sites avec votre outil, donc je regarde surtout si ça va aussi vite que ce que je connais.
        D-2. WordPress et Elementor Pro tous les jours, c'est mon outil principal. Figma pour lire les maquettes que le graphiste m'envoie — je ne dessine pas dedans, je récupère les espacements, les couleurs, les tailles. Un peu de CSS quand Elementor ne suffit pas : des transitions, du :hover, des trucs comme ça. Pas de vidéo, pas de montage, ce n'est pas mon métier.
        D-3. Oui, tout le temps, c'est une demande standard des clients. La dernière fois c'était la semaine dernière, sur un site de plombier : le client voulait que les trois blocs « Dépannage / Rénovation / Entretien » arrivent les uns après les autres quand on descend sur la page. Dans Elementor je clique sur le premier bloc, onglet Avancé, animation d'entrée, je mets fondu vers le haut, durée normale. Ensuite je fais pareil sur le deuxième avec un délai de 200 ms, et le troisième 400 ms. Ça m'a pris cinq minutes, refaire les délais compris. Je fais aussi souvent des effets de mouvement au défilement pour les images de fond, un peu de parallaxe.
        D-4. Je clique sur l'élément, je cherche l'onglet Avancé ou Style dans le panneau de droite, et dedans il doit y avoir une section « animation d'entrée » : je déroule une liste d'effets — fondu, fondu vers le haut, zoom, rebond — je choisis, je règle la durée et le délai, et voilà. Si c'est une suite d'éléments, je répète sur chacun avec des délais qui augmentent. Pour du survol ou une transition fine, je passe par une classe CSS. C'est comme ça que j'imagine, mais je ne sais pas comment c'est fichu chez vous.
        D-5. Ça dépend complètement du dosage. Bien fait, c'est-à-dire discret et rapide, ça donne l'impression que le site est soigné, et les clients adorent, c'est même souvent eux qui le demandent. Mal fait, c'est-à-dire des choses qui arrivent lentement de partout, ou qui rejouent à chaque fois qu'on remonte, ça me fatigue et ça ralentit la page — sur mobile surtout, je coupe une bonne partie de ce que les clients me demandent. Donc je dirais : utile pour hiérarchiser ce qu'on veut faire remarquer, pénible dès que c'est décoratif.

### 01:00 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

01:03 💬 Bon. Une scène en quatre temps sur une section, avec du rebond sur les chiffres. Dans Elementor je ferais ça avec quatre animations d'entrée et des délais croissants, un quart d'heure grand maximum. Voyons ce que cet outil propose. Je commence par regarder l'écran.
        [1] Je photographie l'écran pour voir où j'en suis et à quoi ressemble l'éditeur.
01:04 ▶ #2 📷 capture
01:08 ▶ #3 👁 image 001-capture.png
01:17 💬 Tiens, il y a un onglet « Animation » tout en haut, à côté de Écriture et Design. Ça, c'est clair au moins, chez Elementor c'est caché dans l'onglet Avancé de chaque élément. Je vois la page d'accueil avec le grand titre, et plus bas une section « LA MAISON » avec une photo et un titre.
        [2] Je clique sur l'onglet « Animation » pour voir ce qu'il y a dedans, je m'attends à un panneau avec une liste d'effets.
01:18 ▶ #4 click 180 13
01:23 💬 [3] Je photographie pour voir ce que l'onglet Animation a ouvert.
01:24 ▶ #5 📷 capture
01:28 ▶ #6 👁 image 002-capture.png
01:42 💬 Panneau de droite bien chargé. En haut un texte d'explication que je ne lis pas en entier — j'ai juste vu passer « ligne de temps » et « images-clés », ça ne me parle pas, Elementor n'a pas ça. En dessous « Lancer une animation depuis la page » avec « Quand : Au défilement », et plus bas une longue liste « Animations du site » avec des choses comme « Fondu en montant · Titre · La carte ». Ça au moins je comprends : un effet, un élément. Il me faut d'abord ma section « La maison ».
        [4] Je fais défiler la page dans le canevas pour descendre jusqu'à la partie « La maison ».
01:44 ▶ #7 scroll 300 300 down 5
01:47 💬 [5] Je photographie pour voir où je suis arrivée dans la page.
01:49 ▶ #8 📷 capture
01:54 ▶ #9 👁 image 003-capture.png
01:58 💬 La section « La maison » apparaît : la photo à gauche, le titre « Une cuisine de produits, servie sans chichi. », le paragraphe, et en bas de l'écran je devine le début des chiffres.
        [6] Je descends encore un peu pour avoir toute la section sous les yeux, chiffres compris.
01:59 ▶ #10 scroll 300 300 down 3
02:03 💬 [7] Je photographie pour voir la section entière.
02:04 ▶ #11 📷 capture
02:09 ▶ #12 👁 image 004-capture.png
02:13 💬 Voilà toute la scène : la photo de la salle à gauche, le petit « LA MAISON », le titre, le paragraphe, et les trois chiffres 12 / 38 / 14 avec leurs légendes. Exactement les quatre temps demandés.
        [8] Je clique sur la photo, mon réflexe : sélectionner l'élément et voir ce que le panneau de droite me propose comme animation d'entrée.
02:15 ▶ #13 click 150 300
02:18 💬 [9] Je photographie pour voir ce que la sélection de la photo affiche à droite.
02:19 ▶ #14 📷 capture
02:24 ▶ #15 👁 image 005-capture.png
02:31 💬 Là je suis contente : en haut à droite ça dit « Page > La maison > Contenu > Photo de la salle », donc j'ai bien attrapé la photo. Et il y a un gros bouton bleu « Animer "Photo de la salle" », plus un réglage « Quand : À l'entrée dans l'écran ». « À l'entrée dans l'écran », c'est exactement mon animation d'entrée.
        Point d'étape : j'ai trouvé la section et l'élément en huit actions, tout va bien, agacement 1.
        [10] Je clique sur le bouton bleu « Animer "Photo de la salle" », j'attends une liste d'effets du genre fondu, glissé, zoom.
02:33 ▶ #16 click 660 183
02:36 💬 [11] Je photographie pour voir ce que ce bouton a ouvert.
02:38 ▶ #17 📷 capture
02:42 ▶ #18 👁 image 006-capture.png
02:56 💬 Ouh là, ça s'est ouvert en grand et c'est beaucoup d'un coup. Je vois « Animation · Photo de la salle », 1000 ms, « À l'entrée dans l'écran », un délai à 0 ms, une case « à chaque passage » — ça c'est exactement ce qu'Aurèle demande pour que ça rejoue. En dessous une barre graduée 250/500/750/1000 que je ne comprends pas encore, et une liste « Éléments de la scène » avec tous mes éléments et des « + Ajouter » : Titre 2, Paragraphe, Chiffres · 3 éléments avec écrit « les 3 un à un ». Tout est là en fait. Et tout en bas « Remplir avec : un préréglage… », ça doit être ma liste d'effets.
        [12] Je clique sur « un préréglage… » en bas, je m'attends à la liste des effets d'entrée.
02:57 ▶ #19 click 700 487
03:01 💬 [13] Je photographie pour voir la liste des préréglages.
03:02 ▶ #20 📷 capture
03:06 ▶ #21 👁 image 007-capture.png
03:13 💬 Ah, ça c'est ma liste : Fondu, Fondu en montant, Fondu en descendant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, Netteté, Montée avec rebond, Zoom avec rebond, et deux effets de survol. C'est le même vocabulaire que chez moi, je suis à l'aise. Et je repère déjà « Montée avec rebond » pour mes chiffres qui doivent dépasser puis revenir.
        [14] Je choisis « Apparition · Glissé depuis la gauche » pour la photo, puisqu'elle est du côté gauche et doit arriver par le côté.
03:14 ▶ #22 click 680 399
03:18 💬 [15] Je photographie pour vérifier que la photo a bien pris l'effet.
03:20 ▶ #23 📷 capture
03:24 ▶ #24 👁 image 008-capture.png
03:34 💬 Hm. Ma photo a disparu du canevas, il ne reste qu'un cadre vide. En haut il est écrit « Photo de la salle entre dans l'écran → Photo de la salle (glissé depuis la gauche) sur 700 ms, une seule fois ». Donc l'effet est bien posé ; je suppose que l'aperçu me montre l'instant zéro, où la photo n'est pas encore arrivée. Chez Elementor l'éditeur joue l'animation en boucle, là je vois un trou, c'est déstabilisant mais je continue.
        [16] Je clique sur « + Ajouter » à côté de « Titre 2 "Une cuisine de…" » pour mettre le titre dans la même scène.
03:36 ▶ #25 click 768 349
03:39 💬 [17] Je photographie pour voir ce que l'ajout du titre a fait.
03:40 ▶ #26 📷 capture
03:45 ▶ #27 👁 image 009-capture.png
03:54 💬 Le titre est venu se mettre en deuxième ligne, sous « Photo de la salle », dans la zone graduée, et en haut c'est écrit qu'il « n'a pas encore d'images-clés » — mot que je ne connais pas, mais je comprends qu'il lui manque son effet. En bas j'ai à nouveau « Remplir avec : un préréglage… », et son « Départ » est à 0 ms.
        [18] Je rouvre la liste des préréglages, en supposant qu'elle s'applique maintenant au titre qui est sélectionné en bleu.
03:56 ▶ #28 click 700 488
03:59 💬 [19] Je photographie pour voir la liste et vérifier de quelle piste il s'agit.
04:01 ▶ #29 📷 capture
04:07 ▶ #30 👁 image 010-capture.png
04:10 💬 La liste est là. Pour « le titre arrive en s'élevant légèrement », c'est « Fondu en montant », le même nom que chez moi.
        [20] Je clique sur « Apparition · Fondu en montant ».
04:12 ▶ #31 click 680 362
04:24 💬 Point d'étape : la photo et le titre ont chacun leur effet, en vingt actions. C'est plus long qu'Elementor mais ça avance, agacement 2.
        [21] Je photographie pour vérifier l'effet du titre et repérer la ligne du paragraphe.
04:27 ▶ #32 📷 capture
04:32 ▶ #33 👁 image 011-capture.png
04:37 💬 Le titre a disparu lui aussi de l'aperçu, comme la photo — logique, à l'instant zéro rien n'est encore arrivé. Dans la zone graduée je vois deux barres, mais elles commencent toutes les deux au même endroit : il faudra que je les décale, comme mes délais croissants.
        [22] Je clique sur « + Ajouter » en face de « Paragraphe "Aurèle et Nils ont…" » pour le mettre dans la scène.
04:40 ▶ #34 click 768 386
04:44 💬 [23] J'ouvre à nouveau la liste des préréglages, pour donner un fondu simple au paragraphe qui doit « se dévoiler ».
04:46 ▶ #35 click 700 488
04:50 💬 [24] Je photographie pour vérifier que la liste est ouverte sur la bonne piste.
04:52 ▶ #36 📷 capture
04:57 ▶ #37 👁 image 012-capture.png
05:05 💬 Le paragraphe s'est bien ajouté en troisième ligne et la liste est ouverte. « Se dévoile », pour moi c'est un fondu simple.
        [25] Je clique sur « Apparition · Fondu ».
05:08 ▶ #38 click 680 350
05:15 💬 Maintenant les trois chiffres. J'avais repéré « Chiffres · 3 éléments » avec une option « les 3 un à un » — si ça fait mes délais croissants tout seul, ça me fait gagner du temps.
        [26] Je photographie pour retrouver la ligne des chiffres à sa position actuelle.
05:18 ▶ #39 📷 capture
05:23 ▶ #40 👁 image 013-capture.png
05:28 💬 Mes trois pistes sont là, mais les trois barres commencent toutes au même endroit : pour l'instant tout part en même temps, ce n'est pas la scène demandée. Je m'occupe d'abord des chiffres.
        [27] Je clique sur « les 3 un à un » à droite de « Chiffres · 3 éléments », j'espère que ça les ajoute avec un décalage entre eux.
05:30 ▶ #41 click 765 422
05:34 💬 [28] Je photographie pour voir ce que « les 3 un à un » a produit.
05:36 ▶ #42 📷 capture
05:42 ▶ #43 👁 image 014-capture.png
05:48 💬 Une quatrième ligne « Chiffres · enfants » est apparue, et en bas je vois « Intervalle : 100 ms · Depuis le début » — donc c'est bien le décalage entre les trois chiffres, ça m'évite de le faire à la main. Mais il est écrit en haut que les Chiffres n'ont pas encore d'effet.
        [29] Je fais défiler le panneau du bas pour retrouver « Remplir avec » et poser le rebond sur les chiffres.
05:51 ▶ #44 scroll 680 470 down 3
05:55 💬 [30] Je photographie pour voir si « Remplir avec » est visible.
05:57 ▶ #45 📷 capture
06:03 ▶ #46 👁 image 015-capture.png
06:22 💬 Le défilement n'a bougé que la liste des éléments ; en bas j'aperçois un texte sur une « première image-clé » que je ne comprends pas. Il y a un petit chevron devant « Éléments de la scène ».
        [31] Je clique sur ce chevron pour replier la liste et laisser la place au panneau du bas.
06:25 ▶ #47 click 566 342
06:29 💬 [32] Je photographie pour voir si le panneau du bas est enfin lisible.
06:32 ▶ #48 📷 capture
06:38 ▶ #49 👁 image 016-capture.png
06:44 💬 Voilà, je vois « Cible : Ses enfants, un à un », « Intervalle : 100 ms », et « Remplir avec : un préréglage… ».
        [33] J'ouvre la liste des préréglages pour les chiffres, je veux « Montée avec rebond ».
06:47 ▶ #50 click 700 399
06:51 💬 [34] Je photographie pour situer « Montée avec rebond » dans la liste ouverte.
06:54 ▶ #51 📷 capture
06:59 ▶ #52 👁 image 017-capture.png
07:06 💬 « Apparition · Montée avec rebond », c'est exactement « va un peu trop loin puis revient se poser ».
        [35] Je clique sur « Apparition · Montée avec rebond ».
07:09 ▶ #53 click 680 345
07:24 💬 [36] Je coche « à chaque passage » sous « Rejouer », pour que la scène recommence à chaque fois qu'un visiteur revient dessus, comme Aurèle le demande.
07:27 ▶ #54 click 568 163
07:41 💬 [37] Je photographie pour vérifier la case cochée, le rebond des chiffres, et voir où en sont mes quatre barres avant de les décaler.
07:44 ▶ #55 📷 capture
07:51 ▶ #56 👁 image 018-capture.png
08:04 💬 La case « à chaque passage » est bien cochée en bleu, et le résumé en haut dit « les 3 éléments de "Chiffres" un à un (tous les 100 ms) en 800 ms, à chaque passage ». Le rebond est posé. Mais mes quatre barres démarrent toutes au même point : tout part en même temps, l'ordre n'y est pas. C'est ça qui me manque, et c'est précisément ce qu'Elementor me donnerait en tapant 0, 200, 400, 600 dans une case « Délai ».
        [38] Je tente de faire glisser la barre du titre vers la droite dans la zone graduée, en espérant que ça retarde son départ.
08:07 ▶ #57 drag 680 260 730 260
08:11 💬 [39] Je photographie pour voir si le glisser a décalé le départ du titre.
08:14 ▶ #58 📷 capture
08:20 ▶ #59 👁 image 019-capture.png
08:38 💬 Ah — le glisser n'a pas décalé la piste du tout : il a déplacé le curseur de lecture à 640 ms, c'est marqué « 640 / 1000 ms » en haut à droite. Par contre, effet secondaire agréable, je vois enfin ma scène à cet instant : la photo est en place, le titre est là, les chiffres aussi. Et surtout, dans le panneau du bas je découvre maintenant « PISTE · TITRE 2 » avec un champ « Départ : 0 ms » — voilà mon délai, c'est là que j'aurais dû aller au lieu de tirer sur la barre. Mais je n'ai plus de budget pour le faire quatre fois.
        Point d'étape, agacement 3. Ce n'est pas que je ne comprends pas l'outil : les noms d'effets sont les mêmes que chez moi et la liste des éléments de la scène est très bien. C'est que le décalage dans le temps, qui est le cœur de la demande, se cache dans un champ « Départ » tout en bas d'un panneau qu'il faut replier une liste pour voir, alors que dans Elementor c'est une case « Délai » sous l'effet, visible tout de suite. Et la zone graduée m'a piégée : je croyais tirer une barre, j'ai bougé un curseur de lecture.
        Ce que je laisse à Aurèle, pour être honnête : les quatre effets sont posés dans le bon esprit — photo glissée depuis la gauche, titre en fondu montant, paragraphe en fondu, chiffres en montée avec rebond et les trois un à un tous les 100 ms — et « à chaque passage » est coché, donc ça rejouera quand on revient. Mais tout démarre en même temps, donc la scène ne se raconte pas dans l'ordre, et la durée totale est à 1 seconde alors qu'il en faut deux et demie. Ce n'est pas livrable en l'état, il me manque quatre réglages de « Départ » et un changement de durée.
        FIN : budget
        ACTIONS : 39

### 09:47 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

10:02 💬 T4-SEQ. 4. Ni facile ni difficile, mais pour de mauvaises raisons : la première moitié a été très facile — l'onglet Animation se voit tout de suite, le bouton « Animer », la liste d'effets avec exactement les mêmes noms que chez moi, et la liste des éléments de la section avec un « + Ajouter » en face de chacun, ça c'est mieux qu'Elementor, je n'ai pas eu à cliquer élément par élément. Et la deuxième moitié m'a coûté tout mon temps pour rien, parce que je n'ai pas trouvé où on décale un élément par rapport à un autre. Si j'avais vu le champ « Départ » dès le début, je mettais 4 sur 7 à 6 sur 7. Là j'ai dépassé le temps que ça me prendrait chez moi et je n'ai pas fini, donc je ne peux pas mettre plus.
        T4-R. En l'état, et je le dis franchement, ce n'est pas ce qu'Aurèle a demandé.
        Un visiteur descend la page, il arrive sur la partie « La maison ». À ce moment-là tout se déclenche d'un coup, en même temps : la photo arrive par la gauche, le titre monte en fondu, le paragraphe apparaît en fondu, et les trois chiffres montent avec un rebond — les chiffres, eux, s'enchaînent bien l'un après l'autre, mais avec seulement un dixième de seconde entre eux, donc ça ressemblera plus à un petit paquet qu'à trois arrivées distinctes. Le tout est bouclé en une seconde environ, pas deux et demie. Donc au lieu d'une petite scène qui se raconte, il va voir un « flash » où tout bouge simultanément. Visuellement ce ne sera pas laid, les effets sont les bons, mais il n'y aura aucune narration, et c'était précisément la demande.
        Le seul point qui est vraiment conforme : s'il remonte et redescend sur cette partie, ça rejouera à chaque fois, parce que j'ai coché « à chaque passage ». Ça, c'est bon.
        Ce qui manque et que je saurais faire maintenant que j'ai vu le champ : mettre un « Départ » différent sur chaque ligne — la photo à 0, le titre vers 500 ou 600, le paragraphe vers 1 000, les chiffres vers 1 500 — augmenter l'intervalle entre les chiffres à 150 ou 200 ms, et passer la durée totale de 1 seconde à 2,5 secondes. Cinq réglages. Il me faudrait dix minutes, pas une journée. Mais tel que je le laisse, si Aurèle regarde, elle va me dire que ça ne raconte rien.

### 10:46 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

11:07 💬 T4-a. Maintenant que je l'ai vu, je ferais comme ça : je clique sur la ligne « Paragraphe » dans la zone des lignes à droite — pas sur la barre elle-même, j'ai compris la leçon, je clique sur le nom à gauche de la ligne — et je regarde le panneau du bas, qui affiche alors « PISTE · Paragraphe… » avec un champ « Départ » en millisecondes. Je sélectionne la valeur, je tape un chiffre plus petit, Entrée. Si le paragraphe démarrait à 1 000, je mets 700 ou 800.
        Deux réserves. La première, il faut que le panneau du bas soit visible, et chez moi il était coupé par la liste « Éléments de la scène » : j'ai dû replier cette liste avec le petit chevron pour voir le champ. Ça, c'est un truc que j'ai trouvé par hasard, pas parce que l'interface me l'a dit. La deuxième, je ne suis pas certaine à cent pour cent que « Départ » soit un délai avant de commencer plutôt qu'autre chose — je le suppose parce que le mot le dit et parce que les barres sont posées le long d'une graduation en millisecondes. Je l'essaierais et je regarderais la barre bouger vers la gauche pour confirmer.
        Et je vérifierais en faisant glisser le curseur de lecture, puisque j'ai découvert que c'est lui qui montre la scène à un instant donné. Ce n'est pas mon habitude — chez Elementor l'éditeur joue l'animation tout seul — mais ça marche.
        T4-b. Sans hésiter : chercher comment décaler les éléments les uns par rapport aux autres. Poser les quatre effets m'a pris peut-être un tiers du temps et c'était agréable. Tout le reste est parti dans la même impasse.
        Dans le détail, trois choses m'ont mangé mon temps. D'abord, le réglage que je cherchais est hors de l'écran : le panneau du bas est rogné, et rien ne me dit qu'il y a un champ « Départ » en dessous, donc j'ai fait défiler, ça a fait défiler la mauvaise liste, j'ai tâtonné. Ensuite, la zone graduée : j'ai cru que les barres se tiraient à la souris, comme dans n'importe quel outil où on voit des barres alignées sur une graduation. J'ai tiré, et c'est le curseur de lecture qui a bougé. J'ai perdu des actions et surtout j'ai cru un moment que je n'avais pas le droit de déplacer les barres du tout. Enfin, le fait que tout disparaisse de l'aperçu dès que je pose un effet : la photo est devenue un cadre vide, puis le titre, puis le paragraphe. Je ne savais jamais si ce que je venais de faire était juste, donc je photographiais et je relisais la phrase de résumé en haut à chaque fois pour me rassurer. Cette phrase de résumé est très bien, d'ailleurs, c'est elle qui m'a servi de contrôle — mais elle m'a servi de contrôle parce que l'aperçu, lui, ne me montrait rien.
        Ce qui me frappe, c'est le déséquilibre. La partie que je croyais difficile, choisir les effets et attraper les bons éléments, a été la plus simple que j'aie vue, meilleure que chez moi. Et la partie que je fais en trente secondes chez moi, taper un délai, est celle où je me suis plantée.

### 11:33 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

11:58 💬 D-FIN-1. Je le raconterais à ma responsable, et en gros je lui dirais : l'outil est bien pensé mais je n'ai pas réussi à finir une demande de client basique dans le temps que je me donne. Le début est bluffant — un onglet Animation qui se voit, un bouton « Animer » sur l'élément, une liste d'effets aux noms que je connais déjà, et surtout une liste de tous les éléments de la section avec un « + Ajouter » en face de chacun. Ça, c'est plus rapide que chez nous : je n'ai pas eu à cliquer élément par élément dans la page, j'ai tout empilé depuis un seul panneau. Et il y a une option « les 3 un à un » pour les chiffres qui m'a fait gagner les délais que je tape à la main d'habitude.
        Et puis je lui dirais que je me suis cassé les dents sur le plus simple : mettre les choses les unes après les autres. J'ai passé la moitié de la séance là-dessus et j'ai rendu une scène où tout part en même temps, ce qui est exactement ce qu'on ne voulait pas. Le réglage existe, je l'ai vu à la toute fin, il est juste caché en bas d'un panneau coupé.
        Pour vendredi, ma réponse honnête serait : pas non, mais pas encore. Sur un vrai chantier je passerais une demi-journée à comprendre la logique, et après je pense que j'irais aussi vite qu'avec Elementor, peut-être plus vite sur les sections à plusieurs éléments. Mais je ne peux pas dire à l'agence « lancez-vous » sur la base d'une séance où je n'ai pas fini.
        D-FIN-2. Deux choses, très nettement.
        La liste d'effets. « Fondu en montant », « Glissé depuis la gauche », « Zoom », « Montée avec rebond » — c'est mot pour mot mon vocabulaire, je n'ai pas eu à réfléchir une seconde, j'ai lu la demande du client et j'ai su quoi cliquer. Y compris « Montée avec rebond » pour « ça dépasse puis ça revient se poser », c'était évident.
        Et la phrase de résumé en haut du panneau, celle qui écrit en français ce que fait la scène : « Photo de la salle entre dans l'écran, glissé depuis la gauche sur 700 ms, et les 3 éléments de Chiffres un à un tous les 100 ms, montée avec rebond, à chaque passage ». Ça, c'est excellent. C'est la seule chose qui m'a dit ce que j'avais réellement fabriqué, et c'est aussi ce que je montrerais à un client pour valider avant de lui envoyer le lien. Chez Elementor je n'ai rien d'équivalent, je dois relire chaque élément un par un.
        Je mets aussi au clair le fil d'Ariane en haut à droite, « Page > La maison > Contenu > Photo de la salle » : je savais toujours sur quoi j'étais.
        D-FIN-3. Trois choses, dans l'ordre.
        La zone avec les barres alignées sur une graduation en millisecondes. Je n'ai pas le mot pour ça, ça n'existe pas chez moi. J'ai fait ce que n'importe qui ferait devant des barres posées sur une règle : j'ai tiré dessus pour les déplacer. Et c'est un curseur de lecture qui a bougé. Donc l'objet m'a fait croire à un fonctionnement qu'il n'a pas. Si les barres ne se tirent pas, il ne faut pas qu'elles ressemblent à des barres qu'on tire ; et si elles se tirent par un bord précis, il faut que ça se voie quand je passe la souris dessus.
        Le panneau du bas coupé par le bas de l'écran. Tout ce dont j'avais besoin y était — « Départ », « Cible », « Remplir avec » — et je ne le voyais pas. J'ai fait défiler, et c'est la liste au-dessus qui a défilé. J'ai fini par replier cette liste au hasard et tout est apparu d'un coup. Le réglage le plus important de la mission était le moins visible de l'écran.
        Et l'aperçu qui se vide. Chaque fois que je posais un effet, l'élément disparaissait du canevas et me laissait un cadre vide. Je comprends la logique une fois qu'on me l'explique — il me montre l'instant zéro, où rien n'est encore arrivé — mais sur le moment, trois fois de suite, j'ai cru que j'avais cassé quelque chose. Chez Elementor je clique sur l'effet et l'animation se joue devant moi, je vois tout de suite si c'est le bon. Ici, poser un effet fait littéralement disparaître ce sur quoi je travaille. Si je dois retenir une chose à corriger en priorité, c'est celle-là, parce qu'elle m'a enlevé toute confiance pendant la moitié de la séance.

### 12:29 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Merci.

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

12:51 💬 D-FIN-10. Oui, quelques trucs en vrac, de mon point de vue de personne qui doit produire vite.
        Je n'ai jamais vu ma scène se jouer en entier. Pas une seule fois. J'ai vu un instant fixe à 640 millisecondes, par accident. Il y avait un bouton « Tester sur le site » que je n'ai pas eu le budget d'essayer, et il y a sûrement des boutons de lecture dans la petite rangée d'icônes au-dessus des barres, mais je ne les ai pas identifiés, ils sont petits et sans texte. Pour un outil dont tout le sujet est le mouvement, c'est quand même le comble que j'aie travaillé quarante actions sans voir bouger quoi que ce soit. Un bouton « Lire » gros et écrit en toutes lettres, à côté du nom de l'animation, réglerait la moitié de mes problèmes de confiance.
        Le mot « images-clés » revient partout et ne me dit rien. Je connais « keyframes » en CSS, mais là ça désigne visiblement autre chose, des points posés sur les barres. Tant que je passe par « Remplir avec un préréglage » je n'ai pas besoin de comprendre, et c'est très bien ainsi — mais du coup, le message « n'a pas encore d'images-clés » qui s'affiche quand j'ajoute un élément m'inquiète pour rien. Dites-moi plutôt « n'a pas encore d'effet », je saurai quoi faire.
        La durée par défaut à une seconde m'a piégée sans que je m'en rende compte. Le client demandait deux secondes et demie ; l'outil a démarré à mille millisecondes et tout ce que j'empilais rentrait de force là-dedans. Rien ne m'a alertée. Si je décale mes éléments et que ça dépasse, j'espère que l'outil me le dira, parce que sinon je vais livrer des scènes tronquées sans le voir.
        Un point qui compte beaucoup pour nous et dont on n'a pas parlé : le mobile. Il y a des onglets Bureau / Tablette / Mobile en haut, mais je ne sais pas du tout si mes animations s'appliquent sur les trois, ni comment j'en coupe une sur téléphone. Dans mon métier c'est systématique, je désactive la moitié des animations sur mobile pour la fluidité. Si je devais recommander l'outil à l'agence, c'est la première question que je poserais.
        Il y avait aussi, au tout début quand rien n'est sélectionné, une longue liste « Animations du site » avec tout ce qui existe déjà sur les autres pages. J'ai trouvé ça rassurant — d'un coup d'œil je vois ce qu'il y a sur le site, chose que je n'ai pas chez moi. Je ne sais pas si on peut cliquer dedans pour aller corriger, mais si oui, c'est un vrai avantage pour reprendre un site qu'un collègue a monté.
        Dernière chose, sur la séance : c'était correct, je n'ai pas eu l'impression d'être jugée. Mais j'ai buté sur deux détails d'affichage, pas sur des idées. Les idées de l'outil sont bonnes, et franchement meilleures que ce que j'attendais. Ce qui m'a coûté, c'est un panneau coupé en bas de l'écran et des barres qui ne font pas ce qu'elles ont l'air de faire. Ça se répare, et ça ne demande pas de tout repenser. Dites-le à ceux qui l'ont fait : ils ne sont pas loin.

### 13:16 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

13:34 💬 Merci à vous. Si ça peut servir : je repasse volontiers dans deux mois pour refaire la même mission, ce serait le meilleur moyen de voir si les corrections tiennent. Et si vous corrigez une seule chose, faites que l'animation se joue dans l'éditeur.
        Bonne fin de journée.
        ---
        Fin de la séance. Compte rendu pour le modérateur :
        **Participante P5 · Élodie Nguyen** — intégratrice web en agence, experte Elementor Pro, sous contrainte de temps (arbitrage à rendre vendredi).
        **Mission 4 (scène séquencée sur la section « La maison ») : échec au budget — 39 actions, livrable non conforme.**
        Ce qui a été posé correctement : les quatre effets d'apparition (photo « glissé depuis la gauche », titre « fondu en montant », paragraphe « fondu », chiffres « montée avec rebond » via l'option « les 3 un à un », intervalle 100 ms), et « rejouer à chaque passage » coché.
        Ce qui manque : le séquencement — les quatre pistes démarrent toutes à 0 ms, donc la scène se joue en bloc au lieu de se raconter — et la durée totale reste à 1000 ms au lieu des 2500 ms demandés.
        **Les trois points de friction, par ordre de coût :**
        1. **Le champ « Départ » de la piste est hors écran.** Le panneau de piste est rogné par le bas ; faire défiler agit sur la liste « Éléments de la scène » au-dessus. La participante ne l'a découvert qu'à la 39e action, et uniquement après avoir replié la liste par le chevron, geste trouvé au hasard. C'est le réglage central de la tâche et le moins visible de l'écran.
        2. **Les barres de la ligne de temps suggèrent une affordance qu'elles n'ont pas.** Devant des barres alignées sur une graduation en millisecondes, elle a tiré dessus pour les déplacer ; le geste a déplacé la tête de lecture. Elle en a conclu qu'on ne pouvait pas décaler les pistes.
        3. **L'aperçu se vide à chaque effet posé.** L'élément disparaît du canevas (état à t=0), trois fois de suite. Venant d'Elementor, où l'éditeur joue l'animation, elle a cru casser quelque chose à chaque fois, et a perdu toute confiance dans son propre travail. Elle n'a jamais vu la scène se jouer : les commandes de lecture (icônes sans libellé) n'ont pas été identifiées, et « Tester sur le site » n'a pas été atteint faute de budget.
        **Ce qui a très bien fonctionné :** l'onglet Animation visible d'emblée ; le bouton « Animer [élément] » ; la nomenclature des préréglages, jugée identique à son vocabulaire métier (« j'ai lu la demande et j'ai su quoi cliquer ») ; la liste « Éléments de la scène » avec « + Ajouter » par élément, jugée supérieure à Elementor ; l'option « les 3 un à un » ; et surtout **la phrase de résumé en français**, qui a servi de seul moyen de contrôle et qu'elle montrerait à un client pour validation.
        **Points secondaires soulevés :** « images-clés » est opaque pour un profil intégrateur (suggère « n'a pas encore d'effet ») ; la durée par défaut à 1000 ms piège silencieusement une demande à 2500 ms, sans alerte de dépassement ; aucune visibilité sur le comportement des animations par point de rupture, alors que couper les animations sur mobile est un geste systématique dans son métier ; la liste « Animations du site » à vide de sélection est perçue comme un atout pour reprendre un site existant.
        **Verdict spontané sur l'adoption :** « pas non, mais pas encore » — elle estime qu'une demi-journée de prise en main suffirait, et qu'elle irait ensuite aussi vite, voire plus vite, sur les sections à plusieurs éléments. Sa priorité de correction, formulée seule : que l'animation se joue dans l'éditeur.
