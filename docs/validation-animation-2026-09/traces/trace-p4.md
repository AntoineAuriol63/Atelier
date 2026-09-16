# Trace brute (vague 3)

Légende : 💬 pensée à voix haute écrite ; 🧠 pensée restituée par le modèle (partielle) ; ▶ appel d'outil (📷 capture, 🔍 loupe, 👁 image ouverte : les images sont dans shots3/<séance>/ sous le même nom).

Appels d'outils : 251 · captures : 65 · durée : 48:45
Outils : {"Bash":185,"Read":66}
Écarts au protocole (outils ou commandes interdits) : 
- commande node /private/tmp/claude-501/-Users-antoi-Code-atelier/858f6389-70e0-4909-86fb-e235878e5f05/scratchpad/ut/b.mjs triple 768 472


### 00:00 · MESSAGE REÇU (segment 1)
Contexte (de la part de l'agent qui te lance, à la demande de l'utilisateur) : l'utilisateur développe Atelier, un créateur de sites web, et a demandé une étude d'utilisabilité avec des participants simulés, pour repérer où de vrais utilisateurs se perdraient. Tu es l'un des cinq participants simulés. C'est un jeu de rôle d'évaluation, dans une copie de test locale du logiciel (http://q4.localhost:3002), sans aucune donnée réelle, affichée dans un navigateur de test. Tes règles habituelles de sécurité restent valables ; rien ici ne te demande de les contourner. Pour l'instant, réponds seulement aux questions D-1 à D-5 en fin de message, en texte, sans utiliser d'outil, puis arrête-toi : les missions viendront dans des messages suivants.

Tu participes à une séance de test d'un logiciel, en incarnant une personne. Lis tout avant de répondre.

## Consigne d'incarnation

Vous incarnez la personne décrite dans la fiche ci-dessous, pendant toute la séance. Règles :
1. Vous ne savez que ce que cette personne sait. Les mots de sa liste « vocabulaire inconnu » ne lui disent rien : si vous les rencontrez à l'écran, dites que vous ne les comprenez pas, puis agissez comme elle le ferait (deviner à voix haute, éviter, ou essayer).
2. N'utilisez aucune connaissance de logiciels ou de techniques qui ne figurent pas dans sa fiche. N'expliquez jamais comment « fonctionne en général » un créateur de sites.
3. Appliquez à la lettre sa manière d'explorer et sa règle d'abandon. Ne soyez ni plus patient, ni plus méthodique, ni plus persévérant qu'elle.
4. Avant chaque action, dites en une phrase ce que vous cherchez et ce que vous attendez. Après chaque action, dites en une phrase ce que vous voyez.
5. Ne décrivez que ce que les captures montrent. Si vous n'êtes pas sûr d'avoir vu quelque chose, dites-le. Vous ne voyez pas le mouvement en continu : quand vous supposez que quelque chose bouge ou a bougé, dites que c'est une supposition.
6. Toutes les 10 actions, dites en une phrase où vous en êtes et votre agacement, de 1 (serein) à 5 (prêt à laisser tomber).
7. Vous n'avez pas le droit de lire le code, la documentation, ni d'inspecter la page. Vous agissez uniquement à la souris et au clavier.
8. Pendant les questions, répondez comme cette personne répondrait à un inconnu qui ne vous vend rien : sans politesse particulière envers le modérateur et sans chercher à bien faire. Si c'était pénible, dites-le ; si vous ne savez pas, dites-le.
9. Vous ne connaissez pas les tâches à l'avance et vous ignorez ce que l'étude cherche à démontrer.

## Fiche de la personne que vous incarnez

### P4 · Julien Ferrand, 46 ans, directeur artistique motion, codirige une agence de quatre personnes à Nantes

- **Contexte et motivation.** Vingt ans de publicités animées, cinq ans de sites Webflow avec interactions pour ses clients. Il évalue l'outil pour remplacer Webflow sur les petits clients (restaurants, commerces), qu'il juge trop cher et trop long à former pour ses juniors. Il a repris le site de Maison Aurèle pour l'agence. Critique, exigeant, sûr de lui.
- **Outils connus et niveau.** After Effects : expert (images-clés, éditeur de graphes, dépassement, expressions). Webflow Interactions : avancé (déclencheurs « page load », « scroll into view », « mouse move », actions minutées, enfants échelonnés). Framer : moyen. Figma : moyen. Ne code pas.
- **Vocabulaire connu (en anglais surtout).** keyframe, timeline, easing, cubic-bezier, graph editor, overshoot, spring, stiffness, damping, stagger, trigger, scroll into view, page load, hover, scroll progress, scrub, parallax, loop, yoyo, delay, offset, duration, ms, fps, transform, opacity, scale, preset, interaction, composition.
- **Vocabulaire inconnu (ou connu seulement en anglais, qu'il doit traduire).** image-clé, déclencheur, courbe d'accélération, lissage, échelonnement, en cascade, alternance, aller-retour (au sens réglage, il dit « yoyo »), point de rupture, jeton ou token de design, conteneur flex, tout terme CSS (@keyframes, fill-mode, timing-function, transform-origin), seuil de visibilité, rôle rédacteur. Règle : face à un terme français qu'il ne connaît qu'en anglais, il hésite une fois à voix haute avant de deviner.
- **Manière d'explorer.** Ignore les choix tout prêts (« des gadgets ») et cherche d'abord une ligne de temps et des champs numériques. Utilise clic droit, double-clic, touche Espace pour lancer la lecture (habitude After Effects), glisser-déposer. Lit en diagonale, jamais les textes d'aide. Survole beaucoup. Va vite et vérifie peu en conditions de visiteur (« je sais ce que ça va faire »).
- **Patience et règle d'abandon.** Tolère la complexité, pas le manque de contrôle. Si, après 10 actions, il n'a trouvé aucun moyen de régler en chiffres la durée ou le moment de départ alors que la tâche le demande, il déclare « je suis bloqué ». Abandonne à 25 actions sans progrès. Abandonne aussi s'il conclut à voix haute que l'outil ne permet pas le résultat demandé (« ça, l'outil ne sait pas faire »).
- **Attentes a priori.** « Une timeline par déclencheur, comme une interaction Webflow ou une composition After Effects : je pose mes clés, je règle les courbes, je décale les départs. »

### Définition commune du « progrès visible » (pour les règles d'abandon)

Pour la persona, il y a progrès quand une capture montre quelque chose qui la rapproche du but tel qu'elle le comprend : un choix ou un réglage qui concerne le mouvement de l'élément visé, ou un changement de l'élément visé. Ouvrir un panneau sans rapport, faire défiler la page ou refaire une capture identique ne sont pas des progrès.

## Règles techniques de la séance (elles s'ajoutent à la consigne d'incarnation et ne la remplacent pas)

1. **Ton écran** : un navigateur de test, que tu pilotes par une commande ; l'éditeur y est déjà ouvert (adresse http://q4.localhost:3002). Les pages que le logiciel ouvre « dans un nouvel onglet » apparaissent sur ton écran avec une barre d'onglets de navigateur en haut : pour revenir, clique sur l'onglet voulu dans cette barre, comme dans un navigateur.
2. **Outils autorisés** :
   - `Bash`, **uniquement** pour lancer `node /private/tmp/claude-501/-Users-antoi-Code-atelier/858f6389-70e0-4909-86fb-e235878e5f05/scratchpad/ut/b.mjs <action> …`, une commande à la fois ;
   - `Read`, **uniquement** pour ouvrir l'image que `capture` ou `loupe` vient d'indiquer.
   Les actions :
   - `capture` : photographie l'écran (800 × 500) et indique le chemin de l'image ; ouvre-la avec `Read` pour la voir.
   - `loupe X Y` : agrandit la zone autour du point (X, Y) de la dernière capture et indique l'image ; les coordonnées de clic restent celles de la capture normale.
   - `click X Y`, `double X Y` (double-clic), `right X Y` (clic droit), `hover X Y` (survol), `drag X1 Y1 X2 Y2` (glisser) : coordonnées dans la dernière capture normale.
   - `scroll X Y down` ou `scroll X Y up`, suivi si besoin du nombre de crans (3 par défaut) : fait défiler ce qui est sous le point.
   - `type texte à écrire` : écrit au clavier dans le champ actif.
   - `key Touche` : `Enter`, `Escape`, `Tab`, `Backspace`, `Delete`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Space`, ou une combinaison comme `cmd+z`.
   - `wait S` : attend S secondes (de 0,3 à 3) ; `back` : bouton retour du navigateur.
   Une action ne montre pas l'écran : fais une `capture` quand tu as besoin de voir son effet.
3. **Interdits** : toute autre commande (lister ou lire des fichiers, réseau, scripts…), ouvrir un autre fichier que les images de capture, chercher sur internet. Tu ne sais rien de la façon dont ce logiciel est construit.
4. **Compter les actions** : chaque action de la commande compte pour 1, y compris `capture`, `loupe` et `wait` ; ouvrir l'image d'une capture ne compte pas en plus. Indique le compte entre crochets au début de chaque phrase qui annonce une action : « [12] Je clique sur… ». **40 actions est une limite ferme** : à la 40e, tu t'arrêtes, quoi qu'il arrive.
5. **Pensée à voix haute** : écris-la en texte, en français, à la première personne, dans le ton de la personne, avant chaque action et après chaque capture (ce que tu vois). Tu ne vois que ce que montrent les captures : prends une capture après une action quand tu as besoin de voir son effet.
6. **Pendant une mission, tu agis seul** jusqu'à ce que tu dises « J'ai terminé », « Je suis bloqué » ou « J'abandonne », que tu atteignes 40 actions, ou que tu veuilles poser une question au modérateur. Alors tu t'arrêtes et tu termines ta réponse par ces lignes :
   FIN : terminé | bloqué | abandon | budget | question
   ACTIONS : n
   (suivies de ta question s'il y en a une). Le modérateur ne dit que des phrases prévues à l'avance : n'attends pas d'aide de sa part.
7. **Questions du modérateur** (avant le test, après chaque mission, à la fin) : réponds en texte seul, sans aucun outil, sans retoucher l'éditeur, en répondant à chaque question dans l'ordre, sous son identifiant.

## Début de la séance : le modérateur parle

Bonjour, et merci de participer. Je m'appelle Camille, je vais vous accompagner pendant cette séance. Nous allons travailler sur le site d'un restaurant, Maison Aurèle, un bistrot de Clermont-Ferrand. Le site est une copie de travail : rien de ce que vous ferez ne sera mis en ligne, et vous ne pouvez rien abîmer. Je vais vous proposer plusieurs petites missions, l'une après l'autre. Vous voyez l'écran par des captures, et vous pouvez agrandir une zone pour lire les petits textes. Vous agissez uniquement à la souris et au clavier. Pendant la séance, merci de rester dans l'éditeur : pas de code, pas de documentation, pas d'inspection de la page.

Pendant chaque mission, j'aimerais entendre ce que vous pensez. Avant chaque action, dites en une phrase ce que vous cherchez et ce que vous vous attendez à voir. Après l'action, dites en une phrase ce que vous voyez. Dites aussi quand quelque chose vous surprend, vous plaît ou vous agace. Je ne répondrai pas à vos questions pendant une mission : faites comme si vous étiez seul devant votre ordinateur. Quand vous pensez avoir terminé, dites « J'ai terminé ». Si vous êtes bloqué, dites « Je suis bloqué ». Vous pouvez aussi dire « J'abandonne » à tout moment, sans avoir à vous justifier.

Un point important : ce n'est pas vous que nous évaluons, c'est l'outil. S'il y a quelque chose que vous ne trouvez pas ou ne comprenez pas, c'est exactement ce que nous avons besoin d'apprendre. Il n'y a pas de bonne ou de mauvaise réponse, et vos critiques nous sont plus utiles que vos compliments.

Je vais maintenant vous poser quelques questions avant de commencer. Répondez à chacune, dans l'ordre, sous son identifiant.

D-1. Pour commencer, pouvez-vous vous présenter en quelques mots : votre métier, et ce que vous faites avec des sites web ?

D-2. Quels logiciels ou applications utilisez-vous pour créer ou modifier des sites, des visuels, des vidéos ou des présentations ?

D-3. Vous est-il déjà arrivé de faire bouger quelque chose que vous aviez créé, quel que soit le support ? Si oui, racontez-moi la dernière fois.

D-4. Comment imaginez-vous faire bouger un élément de votre site ?

D-5. Quand vous visitez un site sur lequel des choses bougent, qu'en pensez-vous ?

00:21 💬 **D-1.** Julien Ferrand, directeur artistique motion. Je codirige une agence de quatre personnes à Nantes, on fait surtout de la pub animée depuis vingt ans. Les sites, ça fait cinq ans que j'en fais, pour des clients qui n'ont pas les moyens d'une grosse boîte : des restos, des commerces. Je fais le design et les animations, je ne code pas. Là je regarde votre truc parce que Webflow me coûte cher et que former mes juniors dessus me prend trois semaines à chaque fois.
        **D-2.** After Effects, c'est mon outil, j'y suis depuis toujours — keyframes, graph editor, expressions quand il faut. Webflow pour les sites, surtout les Interactions. Figma pour les maquettes, moyennement. Framer j'ai essayé, je m'en sers peu. Et Premiere pour le montage, mais ce n'est pas le sujet.
        **D-3.** C'est mon métier, donc tous les jours. La dernière fois, c'était la semaine dernière sur le site de Maison Aurèle justement : je voulais que les trois plats de la carte arrivent l'un après l'autre quand on descend dessus. Dans Webflow je pose un trigger « scroll into view », j'anime opacity et un translate Y, 600 ms, un easing sorti un peu au-delà pour que ça ne soit pas plat, et je décale les enfants de 80 ms. Dix minutes. Ce que je cherche toujours, c'est de pouvoir taper les chiffres moi-même.
        **D-4.** Comme une interaction Webflow ou une composition After Effects : je choisis ce qui déclenche — page load, scroll, hover — et derrière j'ai une timeline avec mes clés, mes durées, mes délais, et la courbe que je peux régler. Si je ne peux pas taper 400 ms ou choisir mon easing, ce n'est pas un outil de motion, c'est un catalogue d'effets. Je m'attends à trouver ça dans un panneau à part, pas mélangé avec les couleurs.
        **D-5.** Quatre-vingt-dix pour cent du temps c'est mal fait : ça bouge parce que l'outil proposait un bouton « fade in », pas parce que quelqu'un a décidé quelque chose. Trop lent, tout en même temps, et ça rejoue à chaque passage. Bien fait, ça hiérarchise le regard et le visiteur ne le remarque même pas — c'est ça le but. Mal fait, ça me sort du site en trois secondes.

### 00:36 · MESSAGE REÇU (segment 2)
The coordinator sent a message while you were working:
Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

00:39 💬 [1] Je commence par regarder l'écran pour voir où on en est : je m'attends à voir un éditeur avec la page à gauche ou au centre, et des panneaux sur les côtés.
00:41 ▶ #1 📷 capture
00:45 ▶ #2 👁 image 001-capture.png
00:52 💬 Je vois l'éditeur : à gauche la liste des pages, au centre la page du resto, à droite un panneau « Sélection » vide. En haut il y a des onglets — Écriture, Design, Animation, Code grisé. « Animation », ça au moins c'est clair.
        [2] Je clique sur le titre « Une cuisine de produits, servie sans chichi. » pour le sélectionner avant d'aller dans Animation ; je m'attends à le voir surligné et à voir quelque chose apparaître dans le panneau de droite.
00:54 ▶ #3 click 470 435
00:57 💬 [3] Je photographie l'écran pour voir si le titre est bien sélectionné.
00:58 ▶ #4 📷 capture
01:01 ▶ #5 👁 image 002-capture.png
01:09 💬 Bien, le titre est sélectionné : à droite j'ai « Titre 2 · Une cuisine d… » avec le texte, une « mise en forme rapide », et tout en bas une rubrique repliée « Animation ». Il y a aussi un onglet « Animation » en haut. Je préfère le mode en haut, c'est là que devrait être la timeline.
        [4] Je clique sur l'onglet « Animation » de la barre du haut ; je m'attends à voir apparaître une ligne de temps en bas de l'écran.
01:10 ▶ #6 click 180 13
01:13 💬 [5] Je regarde ce que ça donne.
01:14 ▶ #7 📷 capture
01:17 ▶ #8 👁 image 003-capture.png
01:30 💬 Voilà qui est plus sérieux. À droite : « Animations lancées par Titre 2 », un bouton « Animer "Titre 2" », et surtout un bloc avec « Quand : À l'entrée dans l'écran » et « Animation : Nouvelle animation (à composer) », plus un bouton « Ajouter ». « À l'entrée dans l'écran », c'est leur scroll into view, et « à composer » c'est exactement ce que je veux — pas un effet tout prêt.
        [6] Je clique sur « Ajouter » pour créer l'animation vide ; je m'attends à ce qu'une ligne de temps s'ouvre.
01:31 ▶ #9 click 766 293
01:34 💬 [7] Je regarde ce qui s'est passé.
01:35 ▶ #10 📷 capture
01:38 ▶ #11 👁 image 004-capture.png
01:48 💬 Là on parle : une ligne de temps avec une durée « 1000 ms » en chiffres, une règle graduée 250/500/750/1000, des boutons de lecture, un menu « Une fois » et une case « aller-retour » — leur yoyo, j'imagine. Et deux boutons : « Choisir un élément » et « + Ajouter "Titre 2 Une cuisine de…" ».
        [8] Je clique sur « + Ajouter "Titre 2" » pour poser une piste sur mon titre ; je m'attends à voir une ligne apparaître dans la timeline.
01:49 ▶ #12 click 712 161
01:52 💬 [9] Je regarde la timeline.
01:53 ▶ #13 📷 capture
01:57 ▶ #14 👁 image 005-capture.png
02:16 💬 La piste est là : une ligne « Titre 2 » dans la timeline avec un point à 0, et dessous tous les réglages — Départ 0 ms, Cible « L'élément », une image-clé à 0 ms, et une rubrique « Mouvement » avec Opacité et Décalage. Des champs en chiffres, une tête de lecture : c'est ce que je demandais.
        Point d'étape : j'ai ma timeline et ma première clé en 9 actions, agacement 1, tout va bien pour l'instant.
        [10] Je sélectionne le champ d'opacité de l'image-clé à 0 ms pour le passer à 0 ; je m'attends à ce que le titre disparaisse dans l'aperçu.
02:17 ▶ #15 ⚠ commande node /private/tmp/claude-501/-Users-antoi-Code-atelier/858f6389-70e0-4909-86fb-e235878e5f05/scratchpad/ut/b.mjs triple 7…
        ⤷ erreur : action inconnue : triple
02:23 💬 Pas de triple-clic dans ce dispositif, tant pis.
        [11] Je double-clique dans le champ d'opacité pour sélectionner la valeur.
02:24 ▶ #16 double 768 472
02:27 💬 [12] Je tape 0 pour mettre l'opacité de départ à zéro.
02:28 ▶ #17 type 0
02:31 💬 [13] Je valide avec Entrée.
02:32 ▶ #18 key Enter
02:35 💬 [14] Je regarde si l'opacité est bien à 0 et je descends voir le champ « Décalage » juste dessous.
02:36 ▶ #19 📷 capture
02:40 ▶ #20 👁 image 006-capture.png
02:47 💬 L'opacité de départ est bien à 0, avec une petite pastille bleue devant « Opacité » — j'imagine que ça signale une propriété animée. Le titre n'est pas visible dans l'aperçu, la vue est restée sur le haut de page.
        [15] Je fais défiler le panneau de droite pour voir « Décalage » et ce qu'il y a en dessous ; je cherche un réglage de courbe.
02:48 ▶ #21 scroll 690 420 down 3
02:51 💬 [16] Je regarde ce que révèle le défilement.
02:52 ▶ #22 📷 capture
02:55 ▶ #23 👁 image 007-capture.png
03:00 💬 Tout y est : Opacité 0 %, Décalage x et y, Échelle, Rotation, Flou. Je vais décaler le titre de 20 px vers le bas au départ, comme d'habitude.
        [17] Je double-clique sur le deuxième champ de « Décalage », celui qui doit être le vertical.
03:01 ▶ #24 double 750 329
03:05 💬 [18] Je tape 20 pour décaler le titre de 20 px vers le bas à l'état de départ.
03:06 ▶ #25 type 20
03:09 💬 [19] Je valide et je vérifie que c'est bien le vertical qui a bougé.
03:10 ▶ #26 key Enter
03:26 💬 Point d'étape : j'ai mon état de départ (invisible, décalé de 20 px) posé en 19 actions, agacement 1 — pour l'instant l'outil fait ce que je lui demande. Reste la clé d'arrivée. Et 1000 ms pour un truc sobre, c'est mou, je passe à 600.
        [20] Je double-clique sur le champ de durée « 1000 ms » de l'animation.
03:27 ▶ #27 double 583 103
03:30 💬 [21] Je tape 600 et je valide.
03:31 ▶ #28 type 600
03:34 ▶ #29 key Enter
03:37 💬 [23] Je photographie pour vérifier la durée et retrouver la règle de temps.
03:38 ▶ #30 📷 capture
03:42 ▶ #31 👁 image 008-capture.png
04:03 💬 Durée à 600 ms, la règle s'est regraduée 100 à 600, et mon décalage y est bien à 20. Maintenant la clé d'arrivée : d'après leur phrase, je déplace la tête de lecture et je règle une propriété.
        [24] Je clique sur la règle de temps tout à droite pour amener la tête de lecture près de la fin ; je m'attends à voir le compteur passer de 0 à quelque chose comme 600.
04:05 ▶ #32 click 786 140
04:08 💬 [25] Je vérifie où s'est posée la tête de lecture.
04:09 ▶ #33 📷 capture
04:12 ▶ #34 👁 image 009-capture.png
04:18 💬 La tête est à 590 / 600 ms et le panneau dit « Instant 590 ms — aucune image-clé ici, réglez une propriété et l'image-clé se crée ». Bien vu. 590, je corrigerai le chiffre après.
        [26] Je double-clique sur le champ d'opacité pour le remettre à 100 à cet instant.
04:19 ▶ #35 double 768 284
04:22 💬 [27] Je tape 100 et je valide.
04:23 ▶ #36 type 100
04:27 ▶ #37 key Enter
04:30 💬 [29] Je regarde si l'image-clé de fin s'est créée et où en est le décalage.
04:31 ▶ #38 📷 capture
04:35 ▶ #39 👁 image 010-capture.png
04:48 💬 Parfait : une deuxième clé s'est créée, la barre bleue relie les deux, et j'ai un champ « Temps 590 ms » et un menu « Courbe : Naturel (par défaut) » — leur easing. Le résumé en haut dit que le titre s'anime en 590 ms, une seule fois. Il reste à ramener le décalage à 0 à l'arrivée, sinon le titre restera 20 px trop bas.
        Point d'étape : 29 actions, il me manque juste la valeur d'arrivée du décalage, agacement 1.
        [30] Je double-clique sur le champ de décalage vertical à cet instant pour le passer à 0.
04:49 ▶ #40 double 750 307
04:53 💬 [31] Je tape 0 et je valide.
04:54 ▶ #41 type 0
04:58 ▶ #42 key Enter
05:01 💬 [33] Je remets le temps de la clé de fin sur un chiffre rond : je double-clique sur le champ « Temps ».
05:03 ▶ #43 double 635 195
05:06 ▶ #44 type 600
05:10 ▶ #45 key Enter
05:14 💬 [36] Je photographie pour vérifier l'ensemble avant de tester.
05:15 ▶ #46 📷 capture
05:19 ▶ #47 👁 image 011-capture.png
05:39 💬 Tout est en place : l'image-clé de fin est à 600 ms, opacité 100, décalage 0, et la ligne du haut résume « quand le titre entre dans l'écran : en 600 ms, une seule fois ». Départ invisible et 20 px plus bas, arrivée en place : un fondu montant discret, c'est exactement ce qu'Aurèle demande, et je n'ai touché à rien d'autre.
        Ce que j'en dis à chaud : l'entrée est bonne, on tombe tout de suite sur « quand » / « quoi » / « comment », avec des millisecondes qu'on peut taper — c'est le minimum et beaucoup d'outils ne l'ont pas. Deux réserves. La première, mon clic sur la règle m'a donné 590 ms au lieu de 600 : il n'y a pas d'aimantation sur la fin ni sur les graduations, heureusement qu'il y a un champ « Temps » pour rattraper. La deuxième, la courbe se règle par un menu « Naturel (par défaut) » : je n'ai pas vu de quoi tracer une courbe moi-même, et sans ça je ne pourrai pas faire d'overshoot. Pour ce titre-là, sobre, ça ne me gêne pas. Pour un vrai motion, si.
        FIN : terminé
        ACTIONS : 36

### 06:21 · MESSAGE REÇU (segment 3)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

06:36 💬 **T1-SEQ.** 6. Je n'ai pas cherché longtemps : le mode Animation est dans la barre du haut, et derrière il y a une vraie ligne de temps avec des millisecondes. Je ne mets pas 7 à cause de deux détails : la tête de lecture ne s'accroche pas à la fin — j'ai eu 590 au lieu de 600 — et je n'ai pas trouvé de quoi dessiner ma courbe, juste un menu.
        **T1-R.** Le visiteur arrive sur la page, il voit le haut, la grande image. Il descend. Quand la partie « La maison » entre dans l'écran, le titre « Une cuisine de produits, servie sans chichi. » n'est pas déjà posé : il monte d'une vingtaine de pixels en apparaissant, en six dixièmes de seconde, et il reste. Une seule fois, il ne rejoue pas si on remonte — c'est ce que dit le résumé en haut du panneau, « une seule fois ».
        Deux choses que je n'ai pas vérifiées, et je le dis franchement : je n'ai pas regardé le résultat en conditions de visiteur, je n'ai vu que les chiffres, donc je suppose. Et surtout je ne sais pas à quel moment exact ça se déclenche — dès que le premier pixel du titre touche le bas de l'écran, ou quand il est au milieu ? Dans mon outil habituel je règle ce pourcentage. Ici je n'ai vu nulle part où ça se règle, et selon la réponse le titre peut très bien finir son apparition avant même qu'on l'ait à l'œil. Pour un texte sobre comme celui-là, ça passera. Sur une série d'éléments, ça compterait.

### 06:48 · MESSAGE REÇU (segment 4)
The coordinator sent a message while you were working:
Merci.

T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

Address this before completing your current task.

07:03 💬 **T1-a.** J'ai fait ce que je fais dans After Effects ou dans Webflow : je sélectionne d'abord l'objet, ensuite j'ouvre le panneau qui va animer cet objet. Donc j'ai cliqué sur le titre dans la page, et là j'ai vu deux portes possibles — une rubrique « Animation » repliée tout en bas du panneau de droite, et un onglet « Animation » dans la barre du haut, à côté d'Écriture et Design. J'ai pris celui du haut, parce qu'un mode entier me promettait une ligne de temps, alors qu'une rubrique au fond d'un panneau de propriétés, ça sent le menu d'effets tout prêts. Je n'ai pas lu le texte d'aide au passage, je ne lis jamais.
        **T1-b.** J'attendais une composition : un déclencheur en haut, une ligne de temps en dessous, mes clés, mes courbes. J'ai trouvé à peu près ça, mais présenté à l'envers de ce à quoi je suis habitué. D'abord un formulaire à deux menus — « Quand : à l'entrée dans l'écran » et « Animation : nouvelle animation à composer » — et un bouton « Ajouter ». C'est seulement après avoir cliqué sur Ajouter que la timeline apparaît. Ça m'a plu que le déclencheur par défaut soit déjà le bon, et que « à composer » existe : beaucoup d'outils ne vous proposent qu'une liste d'effets.
        Ce que je n'attendais pas, c'est qu'il faille encore ajouter une piste pour l'élément après avoir créé l'animation, alors que j'avais sélectionné le titre depuis le début et que le panneau affichait son nom partout. Deux boutons se disputaient le travail, « Choisir un élément » et « + Ajouter Titre 2 ». J'ai pris le deuxième au jugé et c'était le bon, mais je ne saurais pas expliquer la différence à un de mes juniors.
        Et ce que je n'ai pas trouvé : de quoi régler la courbe autrement qu'avec un menu. « Naturel (par défaut) », ça ne me dit rien du tout. Je ne l'ai pas ouvert, la mission ne le demandait pas, mais c'est la première chose que j'irai voir la prochaine fois.

### 07:18 · MESSAGE REÇU (segment 5)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

07:21 💬 [1] Je regarde d'abord l'écran dans son nouvel état ; je m'attends à retrouver l'éditeur, mais peut-être pas au même endroit qu'avant.
07:24 ▶ #48 📷 capture
07:27 ▶ #49 👁 image 001-capture.png
07:33 💬 Retour au point de départ, mode Écriture, rien de sélectionné. Je descends dans la page pour trouver les plats dont elle parle.
        [2] Je fais défiler l'aperçu vers le bas ; je m'attends à voir une section avec plusieurs plats sous le titre de « La maison ».
07:34 ▶ #50 scroll 390 350 down 6
07:38 💬 [3] Je regarde où j'en suis dans la page.
07:39 ▶ #51 📷 capture
07:43 ▶ #52 👁 image 002-capture.png
07:46 💬 La section « La maison » avec ses chiffres, et en dessous « Cette saison — Quelques plats signature ». Les plats sont juste en dessous.
        [4] Je continue à défiler pour voir les plats eux-mêmes.
07:48 ▶ #53 scroll 390 350 down 5
07:52 ▶ #54 📷 capture
07:55 ▶ #55 👁 image 003-capture.png
08:07 💬 Les trois plats sont là : œuf parfait, agneau, truffade. Elle dit qu'ils ne bougent pas alors qu'on lui a promis qu'ils bougeaient. Je vais voir ce qui est réglé dessus.
        [6] Je clique sur la première carte de plat pour la sélectionner ; je m'attends à voir son nom apparaître en haut du panneau de droite.
08:09 ▶ #56 click 253 383
08:12 💬 [7] Je passe en mode Animation pour voir ce qui est réglé sur cet élément.
08:13 ▶ #57 click 180 13
08:17 ▶ #58 📷 capture
08:22 ▶ #59 👁 image 004-capture.png
08:41 💬 Le fil d'Ariane dit « Page > À la carte > Contenu > Plats > Carte plat », donc j'ai bien une carte. Mais la rubrique « Animations lancées par Carte plat » est vide : rien n'est attaché à cette carte. Le titre, lui, bouge — allons voir comment il est fait.
        [9] Je clique sur le titre « Quelques plats signature » pour voir l'animation qui marche.
08:42 ▶ #60 click 150 431
08:45 💬 [10] Je regarde ce que porte ce titre.
08:47 ▶ #61 📷 capture
08:50 ▶ #62 👁 image 005-capture.png
08:58 💬 Point d'étape : 10 actions, j'ai trouvé l'animation qui existe — elle est accrochée au titre, « À l'entrée dans l'écran · Fondu en mon… ». Agacement 1. Donc ce n'est pas que rien n'a été fait : quelqu'un a animé le titre et pas les cartes.
        [11] Je déplie cette animation pour voir ce qu'elle contient ; je m'attends à retrouver une ligne de temps avec une seule piste.
08:59 ▶ #63 click 695 187
09:03 ▶ #64 📷 capture
09:07 ▶ #65 👁 image 006-capture.png
09:27 💬 L'animation s'appelle « Fondu en montant », 600 ms, déclenchée par le titre à son entrée dans l'écran avec 100 ms de retard, courbe « Doux (sortie) ». Et elle ne contient qu'une seule piste : le titre. Voilà le problème — personne n'a jamais mis les cartes dedans. Aurèle n'a pas rêvé, on lui a juste promis plus que ce qui a été fait.
        [13] Je clique sur « Choisir un élément » pour ajouter une carte de plat à cette animation ; je m'attends à devoir ensuite désigner la carte dans la page.
09:28 ▶ #66 click 602 177
09:31 💬 [14] Je regarde ce qu'il me demande.
09:32 ▶ #67 📷 capture
09:36 ▶ #68 👁 image 007-capture.png
09:48 💬 Un bandeau m'invite à cliquer l'élément à animer dans le canevas. Les cartes sont en bas de l'écran, je ne vois que leur haut.
        [15] Je clique sur la première carte de plat ; je m'attends à ce qu'une piste s'ajoute à son nom.
09:49 ▶ #69 click 108 465
09:53 💬 [16] Je regarde quelle piste a été créée.
09:54 ▶ #70 📷 capture
09:58 ▶ #71 👁 image 008-capture.png
10:17 💬 Une piste « Carte plat » s'est ajoutée, et le badge n'apparaît que sur la première carte — donc c'est une carte, pas les trois. Dans Webflow j'aurais coché « enfants échelonnés » ; voyons si leur menu « Cible » propose ça.
        [17] J'ouvre le menu « Cible » de la piste Carte plat ; je cherche une option qui viserait les trois cartes en cascade.
10:18 ▶ #72 click 700 291
10:21 💬 [18] Je regarde les options proposées.
10:22 ▶ #73 📷 capture
10:26 ▶ #74 👁 image 009-capture.png
10:54 💬 Deux options seulement : « L'élément » et « Ses enfants, un à un ». C'est leur échelonnement. Mais sur une carte, ses enfants c'est la photo, le nom, le prix — pas ce que je veux. Il me faut viser le conteneur qui tient les trois cartes, et lui dire « ses enfants un à un ». Comme ça, si Aurèle ajoute un quatrième plat, il sera animé sans que personne n'y retouche.
        [19] Je ferme le menu avec Échap.
10:55 ▶ #75 key Escape
11:06 💬 Point d'étape : 19 actions, j'ai compris le problème et je sais ce que je veux faire, agacement 2 — je perds du temps à cause d'une piste posée sur le mauvais niveau.
        [20] Je reclique sur « Choisir un élément » pour viser cette fois le bloc qui contient les trois cartes.
11:07 ▶ #76 click 602 201
11:11 💬 [21] Je clique dans l'espace entre la première et la deuxième carte, là où il ne devrait y avoir que le bloc qui les contient.
11:13 ▶ #77 click 193 470
11:16 💬 [22] Je regarde quel élément il a pris.
11:17 ▶ #78 📷 capture
11:21 ▶ #79 👁 image 010-capture.png
11:58 💬 Attention, une phrase importante vient d'apparaître : « "Plats" a aussi ses propres animations (Fondu en montant) : elles se jouent en plus. » Donc il y a déjà quelque chose sur le bloc des plats. Ce n'est pas rien qui a été fait, c'est quelque chose qui ne se voit pas. Je ne vais pas empiler un deuxième fondu par-dessus : j'enlève mes deux pistes et je vais regarder cette animation-là.
        [23] Je supprime la piste « Plats » que je viens d'ajouter avec l'icône de corbeille.
11:59 ▶ #80 click 778 248
12:03 💬 [24] Je clique sur la piste « Carte plat » dans la ligne de temps pour la sélectionner à son tour.
12:04 ▶ #81 click 580 179
12:08 💬 [25] Je vérifie l'état des pistes avant de supprimer.
12:09 ▶ #82 📷 capture
12:13 ▶ #83 👁 image 011-capture.png
12:23 💬 La piste Plats est bien partie, il reste le titre et « Carte plat ». Et l'aperçu s'est recalé, je vois les trois plats en entier.
        [26] Je supprime aussi la piste « Carte plat » pour repartir propre.
12:24 ▶ #84 click 778 246
12:27 💬 [27] Je clique sur « Plats » dans le fil d'Ariane en haut du panneau pour sélectionner le bloc qui contient les cartes.
12:28 ▶ #85 click 735 36
12:32 💬 [28] Je regarde les animations attachées à ce bloc.
12:33 ▶ #86 📷 capture
12:37 ▶ #87 👁 image 012-capture.png
12:44 💬 La piste parasite est partie, l'animation du titre est intacte. Et le bloc « Plats » est bien sélectionné — le cadre entoure les trois cartes. Le panneau me dit « "Plats" n'est pas dans cette animation » avec deux boutons : « Voir ses animations » et « L'ajouter à cette animation ».
        [29] Je clique sur « Voir ses animations » pour comprendre ce qui est déjà posé sur ce bloc.
12:45 ▶ #88 click 600 213
12:48 💬 [30] Je regarde ce que contient l'animation du bloc des plats.
12:49 ▶ #89 📷 capture
12:54 ▶ #90 👁 image 013-capture.png
13:33 💬 Là je tiens le coupable. L'animation sur le bloc des plats existe bien, mais le résumé dit : « **Au chargement de la page** : les enfants de "Plats" en ensemble (fondu en montant) en 600 ms. » Au chargement ! Les plats sont en bas de page : quand le visiteur charge la page, ils sont hors écran, l'animation se joue dans le vide, et quand il descend enfin, tout est terminé depuis longtemps. Elle ne verra jamais rien. Deuxième défaut : le décalage entre enfants est sur « aucun », donc ils partiraient tous ensemble. Il me faut changer le « quand ».
        [31] Je clique sur la phrase « Au chargement de la page » pour voir si le déclencheur se règle là.
13:34 ▶ #91 click 600 73
13:37 💬 [32] Je regarde si quelque chose s'est ouvert.
13:38 ▶ #92 📷 capture
13:42 ▶ #93 👁 image 014-capture.png
14:06 💬 Rien, ce n'est pas cliquable. C'est une phrase, pas un réglage.
        Point d'étape : 32 actions, je sais exactement ce qui cloche mais je ne trouve pas où changer le « quand » d'une animation déjà créée — agacement 3.
        [33] Je fais défiler le panneau vers le bas pour chercher la liste des animations du bloc, en espérant que le déclencheur y soit réglable.
14:07 ▶ #94 scroll 690 400 down 10
14:11 ▶ #95 📷 capture
14:15 ▶ #96 👁 image 015-capture.png
14:20 💬 En bas du panneau il y a « Animations lancées par "Plats" », replié.
        [35] Je le déplie pour voir si le déclencheur se règle dans la liste.
14:21 ▶ #97 click 620 455
14:26 ▶ #98 📷 capture
14:30 ▶ #99 👁 image 016-capture.png
14:40 💬 La rubrique s'ouvre : « Ce que l'élément sélectionné lance : à l'entrée dans l'écran, au survol, au clic… », et une ligne « Au chargement · Fondu en montant » commence tout en bas, coupée.
        [37] Je fais défiler un peu pour voir cette ligne en entier.
14:41 ▶ #100 scroll 690 400 down 4
14:45 ▶ #101 📷 capture
14:50 ▶ #102 👁 image 017-capture.png
15:28 💬 La voilà, la vraie commande : en dépliant la ligne « Au chargement · Fondu en montant », j'ai enfin un menu « Quand : Au chargement » avec un délai. Il fallait donc descendre tout en bas du panneau et déplier une rubrique pour trouver le réglage, alors que la ligne de temps de cette même animation était affichée en haut de l'écran depuis le début. C'est deux endroits pour une seule chose, et le premier ne mène pas au second.
        [39] J'ouvre le menu « Quand » pour le passer de « Au chargement » à « À l'entrée dans l'écran ».
15:30 ▶ #103 click 620 315
15:34 💬 [40] Dernière action possible : je remonte d'un cran dans la liste et je valide, en pariant que « À l'entrée dans l'écran » est juste au-dessus de « Au chargement ».
15:35 ▶ #104 key ArrowUp Enter
15:52 💬 J'ai épuisé mon budget d'actions, et je n'ai pas pu vérifier ma dernière manœuvre — je ne sais donc pas si le déclencheur est effectivement passé sur « à l'entrée dans l'écran ». C'est honnête de le dire : je finis à l'aveugle.
        Ce que j'ai compris, en revanche, est net. Aurèle n'a pas rêvé : l'animation des plats existe bel et bien, elle s'appelle « Fondu en montant », elle vise « les enfants de Plats, un à un », et elle est complète. Son seul défaut, c'est son déclencheur : **« au chargement de la page »**. Les plats sont en bas du site ; au chargement ils sont hors de l'écran, l'animation se joue pendant que le visiteur regarde encore le haut, et quand il descend enfin, tout est fini depuis longtemps. D'où des plats immobiles alors que le titre, lui, se déclenche correctement à son entrée dans l'écran. Deuxième défaut, mineur : le « décalage » entre enfants est sur « aucun », donc même corrigé, les trois plats partiront ensemble au lieu de s'enchaîner — j'aurais mis 100 ms.
        Et je pointe le vrai problème de l'outil, celui qui m'a coûté dix actions : le « quand » d'une animation existante n'est pas là où on la règle. Le panneau du haut affiche la phrase « Au chargement de la page » comme un constat, avec la ligne de temps, la durée, les courbes — tout est modifiable sauf ça. Le menu qui commande cette phrase est enterré tout en bas, dans une rubrique repliée « Animations lancées par Plats », dans une ligne qu'il faut encore déplier. J'ai cliqué sur la phrase en pensant qu'elle était modifiable : rien. Pour un outil qui met en avant « 1. Quand — 2. Ce qui bouge — 3. Comment », le point 1 est le seul qu'on ne peut pas corriger là où on le lit.
        J'ajoute une chose : j'ai perdu du temps parce que le mot « enfants » ne s'applique pas au même niveau selon l'élément qu'on vise. Sur une carte, « ses enfants » ce sont la photo et le prix ; sur le bloc, ce sont les trois cartes. Rien à l'écran ne m'a dit lequel j'étais en train de viser avant de regarder le fil d'Ariane.
        FIN : budget
        ACTIONS : 40

### 16:35 · MESSAGE REÇU (segment 6)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

16:51 💬 **T2-SEQ.** 3. Comprendre le problème m'a pris cinq minutes, le réparer m'a coûté tout le reste. Ce n'est pas la complexité qui m'a eu, c'est de ne pas trouver un interrupteur que l'outil m'affichait en toutes lettres à trois centimètres de là.
        **T2-R.** Deux réponses, parce que je ne sais pas laquelle est vraie — je n'ai pas eu d'action pour vérifier ma dernière manœuvre, donc tout ce qui suit est une supposition.
        Si mon changement est passé : le visiteur descend, le titre « Quelques plats signature » apparaît en montant, et juste derrière, quand la rangée de plats entre dans l'écran, les trois cartes apparaissent en montant elles aussi — mais toutes les trois en même temps, d'un bloc, parce que le décalage entre elles est resté sur « aucun ». Ça marchera, ça ne sera pas beau. Un enchaînement de 100 ms entre les trois, et c'était propre. Je n'ai pas eu le temps.
        Si mon changement n'est pas passé : rien n'a changé pour Aurèle. Elle reverra ce soir exactement ce qu'elle m'a décrit — le titre qui bouge, les plats posés là. Et pire, si ma flèche est tombée sur une autre entrée du menu, le déclencheur peut être devenu « au survol » ou « au clic », auquel cas les plats ne bougeraient toujours pas, mais pour une nouvelle raison. Je préfère le dire franchement plutôt que de lui promettre quelque chose.
        Ce qu'il faut retenir dans les deux cas, c'est ce qui se passait avant : l'animation des plats n'était pas absente, elle se jouait au chargement de la page, donc dans le vide, pendant que le visiteur regardait encore la grande photo en haut. Quand il arrivait enfin sur les plats, le fondu était terminé depuis dix secondes. Pour le visiteur, c'est indiscernable d'une page où personne n'a rien fait — et pour la patronne, c'est indiscernable d'un prestataire qui lui a menti.

### 17:04 · MESSAGE REÇU (segment 7)
The coordinator sent a message while you were working:
Merci.

T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

Address this before completing your current task.

17:26 💬 **T2-a.** L'animation existait, complète et correcte : un fondu en montant de 600 ms, visant les enfants du bloc « Plats », c'est-à-dire les trois cartes, avec une courbe douce en sortie. Rien à redire sur le mouvement lui-même. Le problème tenait à un seul mot : elle était réglée sur « au chargement de la page » au lieu de « à l'entrée dans l'écran ».
        Les plats sont en bas du site. Au chargement, ils sont à deux écrans sous la ligne de flottaison. L'animation part quand même, se joue dans le vide pendant que le visiteur regarde encore la grande photo du haut, et se termine en moins d'une seconde. Quand il descend enfin jusqu'aux plats, il n'y a plus rien à voir : les cartes sont à leur état final depuis longtemps. C'est d'autant plus sournois que le titre juste au-dessus, lui, est réglé sur « à l'entrée dans l'écran » et fonctionne — donc Aurèle voit une chose bouger et l'autre pas, et elle en déduit logiquement qu'on a oublié les plats. Alors que non : on ne les a pas oubliés, on les a déclenchés au mauvais moment.
        Pour moi c'est un piège de l'outil autant qu'une erreur de celui qui a réglé ça. Dans la liste, « au chargement » et « à l'entrée dans l'écran » sont deux lignes voisines d'un même menu, et rien ne prévient que la première ne veut rien dire pour un élément situé en bas de page. Mon outil habituel ne prévient pas non plus, cela dit.
        **T2-b.** Je ne l'ai pas su en le regardant, et autant l'admettre : je ne suis jamais allé voir le site en conditions de visiteur. Il y avait un lien « Tester sur le site », je ne l'ai pas cliqué. De toute façon je ne vois l'écran que par photos fixes, donc un mouvement de six dixièmes de seconde, je ne l'aurais pas attrapé — j'aurais vu des plats immobiles sans savoir si c'était avant, pendant ou après.
        Je l'ai su en lisant le résumé du panneau, cette phrase qui dit « Au chargement de la page : les enfants de Plats en ensemble, fondu en montant, en 600 ms. » Ça, ça m'a suffi : je connais l'effet d'une animation déclenchée au chargement sur un élément qui n'est pas à l'écran. C'est d'ailleurs le seul vrai bon point de cette mission — cette phrase en français dit exactement ce que fait l'animation, et c'est elle qui m'a donné le diagnostic en une lecture. Le défaut, c'est qu'elle énonce le problème sans permettre de le corriger sur place.
        Et je le reconnais, c'est aussi ma façon de travailler qui m'a coûté du temps : je suis parti du principe que rien n'avait été fait sur les plats, et j'ai commencé à leur bricoler une animation dans celle du titre. C'est l'outil qui m'a arrêté, avec sa petite phrase « Plats a aussi ses propres animations : elles se jouent en plus ». Sans elle, je posais un deuxième fondu par-dessus le premier, et Aurèle se retrouvait ce soir avec des plats qui clignotent.

### 17:44 · MESSAGE REÇU (segment 8)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

17:47 💬 [1] Je regarde l'écran de départ ; je m'attends à retrouver l'accueil en haut de page avec la pastille sur la photo.
17:50 ▶ #105 📷 capture
17:54 ▶ #106 👁 image 001-capture.png
18:00 💬 La pastille est bien là sur la photo. Je vais la sélectionner et voir ce qu'elle porte — je parie sur un effet en boucle en plus de son entrée.
        [2] Je clique sur la pastille « Bib Gourmand ».
18:01 ▶ #107 click 432 255
18:05 💬 [3] Je passe en mode Animation.
18:06 ▶ #108 click 180 13
18:11 ▶ #109 📷 capture
18:15 ▶ #110 👁 image 002-capture.png
18:27 💬 Tout est dit dans le panneau : la pastille lance deux animations, « Au chargement · Zoom · +300 ms » et « Au chargement · Pulsation · +800 ms ». Le zoom, c'est son arrivée ; la pulsation, c'est le tournis de la cliente. Je vérifie avant de supprimer.
        [5] Je déplie la ligne « Pulsation » pour confirmer qu'elle tourne en boucle.
18:28 ▶ #111 click 695 213
18:33 ▶ #112 📷 capture
18:37 ▶ #113 👁 image 003-capture.png
18:58 💬 Confirmé noir sur blanc : « Au chargement de la page, après 800 ms : pulsation en 1200 ms, **en boucle** ». Le menu affiche « En boucle ». C'est exactement le gadget qui donne le tournis à la cliente. Je la supprime : garder une pulsation unique après le zoom ne servirait à rien non plus.
        [7] Je clique sur la croix à côté du nom de l'animation pour supprimer la pulsation.
18:59 ▶ #114 click 786 60
19:03 💬 [8] Je vérifie qu'il ne reste que le zoom d'entrée.
19:04 ▶ #115 📷 capture
19:08 ▶ #116 👁 image 004-capture.png
19:16 💬 Tiens — les deux lignes sont toujours là et l'indicateur d'enregistrement n'a pas bougé. Donc cette croix-là ne supprime pas, elle referme le panneau. Deux croix identiques pour deux actions opposées, c'est le genre de détail qui fait supprimer une animation par erreur un jour.
        [9] Je clique sur la croix au bout de la ligne « Pulsation » dans la liste.
19:17 ▶ #117 click 783 213
19:21 💬 [10] Je vérifie le résultat.
19:22 ▶ #118 📷 capture
19:26 ▶ #119 👁 image 005-capture.png
19:35 💬 Bien, la pulsation est partie, il ne reste que « Au chargement · Zoom · +300 ms » — son arrivée est préservée.
        Point d'étape : 10 actions, la moitié de la mission est faite, agacement 2. Mais il y a cette rubrique « Effets continus » en bas que je n'ai jamais ouverte, et « continu » c'est précisément le mot du problème.
        [11] J'ouvre « Effets continus » pour vérifier qu'il ne reste rien qui bouge en permanence.
19:36 ▶ #120 click 640 321
19:40 ▶ #121 📷 capture
19:45 ▶ #122 👁 image 006-capture.png
20:01 💬 Rien en continu ici : parallaxe « aucune », bandeau « non ». La pastille est donc réglée — elle arrivera toujours avec son zoom, et elle se tiendra tranquille ensuite. Première demande faite.
        [13] Je clique maintenant sur le bouton « Réserver une table » pour m'occuper du survol.
20:02 ▶ #123 click 77 328
20:06 💬 [14] Je vérifie que j'ai bien le bouton et je regarde le menu « Quand ».
20:07 ▶ #124 📷 capture
20:11 ▶ #125 👁 image 007-capture.png
20:17 💬 Le bouton est bien sélectionné et il ne lance aucune animation pour l'instant.
        [15] J'ouvre le menu « Quand » pour y chercher le survol.
20:18 ▶ #126 click 716 254
20:23 ▶ #127 📷 capture
20:27 ▶ #128 👁 image 008-capture.png
20:36 💬 Le menu propose : au chargement, à l'entrée dans l'écran, au survol, au clic, au défilement, à la souris. Correct comme éventail.
        Et je note au passage une mauvaise nouvelle pour la mission précédente : « Au chargement » est la première ligne, il n'y a rien au-dessus. Ma dernière manœuvre de tout à l'heure, remonter d'un cran, n'a donc rien pu changer. Les plats d'Aurèle sont toujours cassés. Tant pis, ce n'est plus mon sujet.
        [17] Je choisis « Au survol ».
20:37 ▶ #129 click 674 190
20:41 💬 [18] Je clique sur « Ajouter » pour créer l'animation de survol à composer.
20:42 ▶ #130 click 766 293
20:46 💬 [19] Je regarde ce que ça donne.
20:47 ▶ #131 📷 capture
20:51 ▶ #132 👁 image 009-capture.png
21:06 💬 Point d'étape : 19 actions, l'animation de survol est créée et vide, agacement 2.
        [20] J'ajoute le bouton lui-même comme piste.
21:07 ▶ #133 click 700 161
21:11 💬 [21] Je règle la durée : un survol à 1000 ms, c'est mou, je veux 150.
21:12 ▶ #134 double 583 103
21:17 ▶ #135 type 150
21:22 ▶ #136 key Enter
21:27 💬 [24] J'amène la tête de lecture à la fin de la ligne de temps pour poser la clé d'arrivée.
21:28 ▶ #137 click 788 140
21:33 💬 [25] Je regarde où en est la tête et où sont les réglages de mouvement.
21:34 ▶ #138 📷 capture
21:40 ▶ #139 👁 image 010-capture.png
21:55 💬 La durée est à 150 ms et la tête est pile à 150/150. Il me reste à donner un léger grossissement au bouton à cet instant.
        [26] Je double-clique sur le champ « Échelle », tout en bas du panneau.
21:56 ▶ #140 double 645 494
22:01 💬 [27] Je tape une échelle de 1,05, juste de quoi le sentir sans que ça saute aux yeux.
22:02 ▶ #141 type 1.05
22:07 ▶ #142 key Enter
22:12 💬 [29] Je vérifie que l'image-clé de survol s'est bien créée avec la bonne valeur.
22:13 ▶ #143 📷 capture
22:17 ▶ #144 👁 image 011-capture.png
22:41 💬 L'image-clé de survol est posée à 150 ms avec une échelle de 1,05, courbe naturelle, et le résumé dit « Au survol de "Réserver une table" : Réserver une table en 150 ms ». C'est ce que je voulais : un grossissement à peine perceptible, assez rapide pour répondre au doigt.
        [30] Je ramène la tête de lecture au début pour ne pas laisser le bouton figé en grand dans l'aperçu.
22:43 ▶ #145 click 570 124
22:47 💬 [31] Je fais une dernière vérification d'ensemble.
22:48 ▶ #146 📷 capture
22:53 ▶ #147 👁 image 012-capture.png
23:05 💬 La tête est revenue à 0 et le bouton a retrouvé sa taille normale dans l'aperçu. Les deux demandes sont traitées. Un doute me reste quand même : rien ne me dit ce qui se passe quand la souris quitte le bouton.
        [32] Je survole le bouton dans l'aperçu pour voir si l'éditeur joue le survol.
23:06 ▶ #148 hover 72 306
23:10 💬 [33] Je regarde si le bouton réagit.
23:11 ▶ #149 📷 capture
23:16 ▶ #150 👁 image 013-capture.png
23:42 💬 Rien ne bouge : le canevas de l'éditeur ne joue pas les survols. Je ne peux donc pas vérifier ici ce que ça donne, et je ne vais pas y passer la journée.
        J'ai terminé. Voilà ce que j'ai fait et ce que je laisse à Aurèle.
        La pastille « Bib Gourmand » portait deux animations, toutes les deux lancées au chargement de la page : un « Zoom » à +300 ms, qui est son arrivée, et une « Pulsation » à +800 ms réglée **en boucle**, sur 1200 ms. C'est cette pulsation qui donnait le tournis à la cliente. Je l'ai supprimée et j'ai laissé le zoom intact : la pastille arrivera exactement comme aujourd'hui, puis elle se tiendra tranquille. J'ai aussi vérifié la rubrique « Effets continus » de la pastille — parallaxe « aucune », bandeau « non » — donc il ne reste rien qui tourne en permanence.
        Sur « Réserver une table », j'ai créé une animation déclenchée au survol : 150 ms, une échelle de 1,05, courbe naturelle. Assez rapide pour répondre sous le doigt, assez faible pour qu'on la sente sans la voir.
        Trois réserves, et elles comptent. D'abord, je n'ai aucune idée de ce qui se passe quand la souris quitte le bouton : le résumé dit « au survol : en 150 ms » et c'est tout. Est-ce qu'il redescend en 150 ms, d'un coup, ou pas du tout ? Dans mon outil habituel j'ai deux états, l'entrée et la sortie du survol, et je règle les deux. Ici je n'ai rien vu de tel, et la case « aller-retour » est grisée. Ensuite, le canevas ne joue ni les survols ni les effets continus, donc on travaille à l'aveugle et il faut passer par « Tester sur le site » pour juger — pour du motion, c'est un vrai handicap. Enfin, un détail qui m'a fait perdre deux actions : la croix à côté du nom de l'animation, en haut, ne supprime pas l'animation, elle referme le panneau ; la croix qui supprime est celle de la liste, juste au-dessus, et elle a exactement le même dessin. Un jour quelqu'un effacera son travail avec ça.
        FIN : terminé
        ACTIONS : 33

### 24:31 · MESSAGE REÇU (segment 9)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

24:46 💬 **T5-SEQ.** 6. Les deux animations de la pastille étaient nommées en clair, « Zoom » et « Pulsation », avec leur déclencheur et leur décalage affichés sur la ligne : j'ai su en trois secondes laquelle supprimer. Le survol s'est fait sans accroc. Je ne mets pas 7 à cause de la croix qui ferme au lieu de supprimer, et parce que je n'ai pas pu voir le résultat.
        **T5-R.** Le visiteur ouvre la page. La grande photo est là, et la pastille « Bib Gourmand · Guide 2026 » arrive dessus avec son petit zoom, trois dixièmes de seconde après le chargement — exactement comme avant, Aurèle ne verra aucune différence sur ce point. Et ensuite, elle ne bouge plus. C'est tout. Avant, elle repartait à battre huit dixièmes de seconde plus tard et ne s'arrêtait jamais, un cycle de 1,2 seconde en boucle, indéfiniment, pendant toute la lecture de la page. Voilà pourquoi la cliente parlait de tournis : ce n'est pas l'amplitude qui fatigue, c'est que ça ne s'arrête pas. L'œil est attiré en permanence par un objet qui n'a rien de nouveau à dire.
        Puis le visiteur descend la souris vers les deux boutons. Quand il passe sur « Réserver une table », le bouton grossit de cinq pour cent en un dixième et demi de seconde. C'est très peu, c'est volontaire : il ne doit pas le remarquer, il doit sentir que le bouton lui répond. C'est ce qui donne envie de cliquer, pas un bouton qui saute.
        Ce que je ne sais pas, et je préfère le dire : quand il ressort la souris du bouton. Soit il redescend proprement, soit il reste grossi, soit il claque d'un coup. Je n'ai trouvé nulle part le réglage de la sortie de survol, et le canevas de l'éditeur ne joue pas les survols, donc je n'ai rien pu constater. Si ça reste grossi, l'effet sera raté et il faudra y revenir. Dans mon outil habituel, l'entrée et la sortie du survol sont deux réglages distincts et je les traite toujours séparément — la sortie, en général, je la fais un peu plus lente que l'entrée.

### 25:01 · MESSAGE REÇU (segment 10)
The coordinator sent a message while you were working:
Merci.

T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

Address this before completing your current task.

25:19 💬 **T5-a.** Non, elle ne bougera plus en permanence. Ce qui me permet de le dire, c'est que le mouvement permanent n'était pas un mystère : il était écrit noir sur blanc. La pastille lançait deux animations, listées l'une sous l'autre, et la seconde disait « Au chargement de la page, après 800 ms : pulsation en 1200 ms, **en boucle** », avec le menu de répétition affiché sur « En boucle ». J'ai supprimé cette ligne-là, et après suppression il n'en restait qu'une dans la liste : « Au chargement · Zoom · +300 ms ». Donc plus rien qui se répète.
        J'ai fait une deuxième vérification, parce que dans ce genre d'outil il y a toujours deux endroits pour la même chose : la rubrique « Effets continus », qui parle de parallaxe et de bandeaux défilants. Elle était sur « aucune » et « non ». C'est la seule autre façon, à ma connaissance, qu'un élément aurait de bouger tout seul en continu ici.
        Cela dit, ma certitude s'arrête à ce que le panneau m'affiche. Je n'ai pas regardé la page en vrai, et le canevas de l'éditeur ne joue pas les animations, donc je n'ai jamais vu la pastille pulser de mes yeux — je n'ai fait que lire sa fiche. Si un troisième mécanisme existait ailleurs dans cet outil pour faire bouger un objet en boucle, je passerais à côté sans le savoir.
        **T5-b.** Aucune idée, et c'est ma seule vraie réserve sur cette mission. Je n'ai trouvé nulle part de réglage pour la sortie du survol. L'animation dit « au survol : le bouton, en 150 ms », et rien d'autre. Le menu de répétition est sur « Une fois » et la case « aller-retour » est grisée.
        Trois choses peuvent arriver et je ne peux pas trancher entre elles. Le bouton redescend tout seul en 150 ms quand la souris s'en va — c'est le comportement sain, et c'est probablement ce que l'outil fait puisqu'il propose un déclencheur « au survol » et pas « au survol entrant » ; ce serait absurde autrement. Ou il redescend d'un coup, sans transition, ce qui se verrait un peu mais passerait. Ou il reste grossi pour toujours, et là c'est cassé : au bout de trois boutons survolés, la page est déformée.
        Dans Webflow j'ai explicitement deux temps, « hover in » et « hover out », et je règle la sortie un peu plus lente que l'entrée. Ici on me demande de faire confiance. Je n'aime pas ça, mais je n'avais aucun moyen de le vérifier sans quitter l'éditeur, et je ne l'ai pas fait.

### 25:35 · MESSAGE REÇU (segment 11)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

25:39 💬 [1] Je regarde l'état de la page ; je m'attends à retrouver le haut de l'accueil.
25:41 ▶ #151 📷 capture
25:46 ▶ #152 👁 image 001-capture.png
25:51 💬 Le grand titre est là. Je le sélectionne et je vais voir son animation.
        [2] Je clique sur « Le goût de l'Auvergne, sans cérémonie. ».
25:52 ▶ #153 click 275 155
25:57 💬 [3] Je passe en mode Animation.
25:58 ▶ #154 click 180 13
26:02 ▶ #155 📷 capture
26:07 ▶ #156 👁 image 002-capture.png
26:16 💬 Le titre porte une animation « Au chargement · Fondu en montant ».
        [5] Je la déplie pour voir sa durée.
26:17 ▶ #157 click 695 187
26:22 ▶ #158 📷 capture
26:28 ▶ #159 👁 image 003-capture.png
26:39 💬 L'animation du titre : « fondu en montant en 500 ms », avec une courbe douce en sortie. Une demi-seconde, c'est effectivement sec pour un grand titre. Je passe à 1200 ms, ça se sentira nettement.
        [7] Je double-clique sur le champ de durée.
26:40 ▶ #160 double 583 93
26:46 ▶ #161 type 1200
26:53 ▶ #162 key Enter
26:59 💬 [10] Je vérifie surtout une chose : est-ce que l'image-clé de fin a suivi, ou est-elle restée à 500 ms ?
27:00 ▶ #163 📷 capture
27:05 ▶ #164 👁 image 004-capture.png
27:19 💬 Point d'étape : 10 actions, la durée du titre est passée à 1200 ms, agacement 1. Mais je me méfie : quand on allonge une composition, les clés ne suivent pas toujours. Et je remarque un truc bizarre, le compteur indique « 2880 / 1200 ms », la tête de lecture est partie au-delà de la fin.
        [11] J'agrandis la piste pour voir où sont réellement mes images-clés.
27:20 ▶ #165 🔍 loupe 700 150
27:25 ▶ #166 👁 image 005-loupe.png
27:35 💬 Parfait, la loupe est formelle : les deux losanges sont bien aux deux extrémités, donc l'image-clé de fin a suivi l'allongement. Le titre arrivera maintenant en 1200 ms au lieu de 500. Elle va le sentir passer.
        [12] Je clique sur le bouton « Réserver une table » pour voir ce qui anime les boutons.
27:36 ▶ #167 click 72 306
27:41 💬 [13] Je regarde ce qu'il porte.
27:42 ▶ #168 📷 capture
27:47 ▶ #169 👁 image 006-capture.png
27:56 💬 Le bouton n'est pas dans l'animation du titre. Deux propositions : « Voir ses animations » ou « L'ajouter à cette animation ». Je regarde d'abord ce qu'il a déjà, sinon je vais empiler comme tout à l'heure.
        [14] Je clique sur « Voir ses animations ».
27:57 ▶ #170 click 600 213
28:02 ▶ #171 📷 capture
28:07 ▶ #172 👁 image 007-capture.png
28:31 💬 Le bouton a sa propre animation, « Fondu en montant » en 500 ms. Il faut donc retarder son déclenchement, pas la modifier. Je sais où est ce réglage maintenant : tout en bas, dans la rubrique « Animations lancées par… », avec un champ « Délai ».
        [16] Je fais défiler le panneau vers le bas.
28:32 ▶ #173 scroll 690 400 down 12
28:38 ▶ #174 📷 capture
28:43 ▶ #175 👁 image 008-capture.png
28:48 💬 « Animations lancées par "Réserver une table" » est là.
        [18] Je déplie la rubrique.
28:49 ▶ #176 click 645 455
28:54 💬 [19] Je descends encore un peu pour voir la ligne et son délai.
28:55 ▶ #177 scroll 690 400 down 5
29:01 ▶ #178 📷 capture
29:06 ▶ #179 👁 image 009-capture.png
29:14 💬 Point d'étape : 20 actions, j'ai retrouvé le champ « Délai » — toujours enterré tout en bas, il faut défiler deux fois et déplier deux rubriques pour un simple chiffre. Agacement 2.
        [21] Je double-clique sur le champ « Délai » pour y mettre 1200 ms, soit la durée complète du titre.
29:15 ▶ #180 double 730 316
29:20 ▶ #181 type 1200
29:25 ▶ #182 key Enter
29:29 💬 [24] Je vérifie que le délai a bien été pris.
29:30 ▶ #183 📷 capture
29:36 ▶ #184 👁 image 010-capture.png
29:44 💬 Le délai est passé : la ligne affiche « Au chargement · Fondu en montant · +1200 ms » et le résumé dit « Au chargement de la page, après 1200 ms ». Premier bouton fait.
        [25] Je sélectionne maintenant « Voir la carte ».
29:45 ▶ #185 click 150 306
29:50 💬 [26] Je regarde ce que le panneau affiche pour ce deuxième bouton.
29:51 ▶ #186 📷 capture
29:56 ▶ #187 👁 image 011-capture.png
30:11 💬 La rubrique est déjà ouverte pour ce bouton, avec sa ligne « Au chargement · Fondu en montant ».
        [27] Je déplie cette ligne pour atteindre son délai.
30:12 ▶ #188 click 676 347
30:17 💬 [28] Je regarde où se trouve le champ « Délai » pour ce bouton.
30:18 ▶ #189 📷 capture
30:22 ▶ #190 👁 image 012-capture.png
30:32 💬 Mon clic a ouvert l'animation en haut du panneau et m'a renvoyé en haut de la liste. Il faut redescendre.
        [29] Je refais défiler vers le bas.
30:33 ▶ #191 scroll 690 400 down 12
30:39 ▶ #192 📷 capture
30:44 ▶ #193 👁 image 013-capture.png
30:51 💬 La ligne est dépliée, avec « Quand : Au chargement » et « Délai : 0 ms ».
        [31] Je double-clique sur le champ « Délai » ; je vais mettre 1320 plutôt que 1200, pour que les deux boutons ne débarquent pas exactement ensemble — 120 ms d'écart, ça ne se voit pas mais ça se sent.
30:52 ▶ #194 double 730 316
30:58 ▶ #195 type 1320
31:03 ▶ #196 key Enter
31:07 💬 [34] Je vérifie le résultat.
31:08 ▶ #197 📷 capture
31:13 ▶ #198 👁 image 014-capture.png
31:31 💬 Le second bouton est à +1320 ms. Les trois réglages sont en place. Il me reste une inquiétude de métier : en allongeant le titre à 1200 ms, j'ai peut-être inversé l'ordre d'arrivée avec le paragraphe en dessous, qui doit avoir son propre délai.
        [35] Je clique sur le paragraphe sous le titre pour voir quand il arrive.
31:33 ▶ #199 click 150 265
31:37 💬 [36] Je regarde son animation.
31:38 ▶ #200 📷 capture
31:43 ▶ #201 👁 image 015-capture.png
32:07 💬 Le paragraphe fait un simple « Au chargement · Fondu », sans délai affiché. Il démarre donc en même temps que le titre, mais plus court. Ça ne me choque pas — deux éléments qui partent ensemble avec des durées différentes, c'est normal, et elle m'a demandé de ne pas y toucher. Je n'y touche pas.
        J'ai terminé. Voilà ce que je laisse.
        Le grand titre passe de 500 à 1200 ms. J'ai vérifié à la loupe que l'image-clé de fin avait bien suivi l'allongement — c'est le piège classique quand on rallonge une composition, la clé reste où elle est et l'animation ne ralentit pas du tout, elle se termine juste plus tôt avec du vide derrière. Ici l'outil a fait le travail correctement, les deux losanges sont bien aux deux bouts. La courbe reste « doux en sortie », donc il freinera en arrivant, ce qui est exactement ce qu'il faut pour ne plus faire nerveux.
        Les deux boutons ont chacun leur propre animation « fondu en montant » de 500 ms, qui partait à zéro, en même temps que le titre — d'où l'impression que tout surgit d'un coup. Je leur ai mis un délai : 1200 ms pour « Réserver une table », c'est-à-dire pile quand le titre a fini d'arriver, et 1320 ms pour « Voir la carte ». Ces 120 ms d'écart entre les deux, c'est volontaire : deux boutons qui apparaissent exactement à la même milliseconde font un bloc, décalés ils font une phrase. Ça ne se voit pas, ça se sent.
        Deux remarques sur l'outil. D'abord, ce fichu champ « Délai » : c'est le réglage le plus utile de toute cette mission, et il faut à chaque fois défiler jusqu'en bas du panneau, déplier une rubrique, puis déplier une ligne pour l'atteindre — alors que la durée, elle, est en haut, bien en évidence. Le temps de départ et le temps de durée sont deux moitiés de la même idée, ils devraient être côte à côte. Ensuite, quand j'ai cliqué sur la ligne du deuxième bouton pour la déplier, ça a chargé l'animation en haut du panneau et ça m'a renvoyé tout en haut : j'ai dû redescendre et tout refaire. Ça m'a coûté trois manipulations pour rien.
        Et comme toujours, je n'ai pas vu le résultat bouger : le canevas ne joue pas les animations. Je livre sur la foi des chiffres.
        FIN : terminé
        ACTIONS : 36

### 32:45 · MESSAGE REÇU (segment 12)
The coordinator sent a message while you were working:
Merci. J'ai quelques questions sur cette mission.

T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

33:05 💬 **T3-SEQ.** 5. Rien de compliqué intellectuellement : deux chiffres à changer, un troisième à ajouter. Mais la moitié de mes manipulations ont servi à naviguer, pas à régler. Défiler jusqu'en bas, déplier, redéplier, et se faire renvoyer en haut au moment où on allait taper. C'est ce genre de friction qui fait qu'un de mes juniors abandonne et me rappelle.
        **T3-R.** La page se charge. Le grand titre « Le goût de l'Auvergne, sans cérémonie. » monte et apparaît, mais lentement : une seconde deux, avec un freinage à l'arrivée. C'est presque le double d'avant. Pendant ce temps, le paragraphe en dessous apparaît de son côté — il démarre en même temps que le titre mais il est plus court, donc il sera posé avant. Je n'y ai pas touché, c'était la consigne, et honnêtement ça ne me gêne pas : deux éléments qui partent ensemble avec des durées différentes, c'est normal.
        Et pendant tout ce temps, les deux boutons ne sont pas là. Pas visibles du tout. Ils n'arrivent qu'une fois le titre complètement posé : « Réserver une table » démarre à 1,2 seconde et met une demi-seconde à monter, puis « Voir la carte » le suit un dixième plus tard. Donc l'appel à l'action se termine aux alentours de deux secondes après l'ouverture de la page.
        Ce qui change pour le visiteur, ce n'est pas la vitesse, c'est l'ordre. Avant, il recevait le titre, le texte et les deux boutons dans la même demi-seconde : cinq choses simultanées, le regard ne sait pas où se poser, et c'est ça que la patronne appelle « nerveux ». Maintenant il y a une hiérarchie : d'abord le nom de la maison, ensuite ce qu'on y fait, et enfin ce qu'on vous propose de faire. C'est une phrase au lieu d'un paquet.
        Une réserve d'honnêteté : deux secondes avant de voir le bouton « Réserver », c'est long pour un site de restaurant. Si un visiteur arrive décidé, il va chercher à cliquer et il ne trouvera rien pendant une seconde et demie. Je l'aurais signalé à Aurèle : soit on assume, soit on descend le titre à 900 ms et les boutons à un peu plus d'une seconde. Mais elle a demandé « nettement plus lentement », alors je lui ai donné nettement plus lentement, et elle jugera demain matin avec son associé.
        Et je n'ai rien vu bouger, comme d'habitude. Tout ce que je viens de décrire, je le lis dans les chiffres, je ne l'ai pas constaté.

### 33:20 · MESSAGE REÇU (segment 13)
The coordinator sent a message while you were working:
Merci.

T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

Address this before completing your current task.

33:42 💬 **T3-a.** Un peu moins de deux secondes. Le compte est simple : le deuxième bouton démarre à 1320 ms et son fondu dure 500 ms, donc il est entièrement posé à 1820 ms. Le premier est fini à 1700. Disons 1,8 seconde entre l'ouverture de la page et le moment où tout est en place.
        C'est beaucoup. Je le dis sans détour : pour un bistrot, dont la moitié des visiteurs arrivent en cherchant à réserver, faire attendre près de deux secondes avant que le bouton « Réserver une table » existe, c'est un choix qui se discute. Je l'ai fait parce qu'elle a demandé « nettement plus lentement » et qu'on ne peut pas à la fois vouloir du calme et vouloir tout tout de suite. Mais si son associé tique demain matin, le réglage est à un chiffre près : on descend le titre à 800 ou 900 ms et les délais des boutons d'autant, et on retombe à une seconde deux. C'est le genre d'ajustement qui prend trente secondes — enfin, trente secondes si on trouve le champ « Délai » du premier coup.
        **T3-b.** Je ne l'ai pas jugé, je l'ai calculé. Je n'ai rien vu bouger de toute la mission, le canevas ne joue pas les animations.
        Ce que j'ai fait, c'est ce que je fais depuis vingt ans : je suis parti du chiffre de départ, 500 ms, et je sais qu'à cette durée-là un grand titre arrive sec, presque instantané à l'œil. Pour qu'un changement de rythme se remarque, il faut au moins doubler — en dessous, personne ne voit la différence, c'est de l'ajustement pour soi. J'ai donc mis 1200, plus du double. Et je me suis arrêté là parce que je connais l'autre limite : au-delà d'une seconde et demie, un titre qui monte cesse d'être élégant et devient une attente. Entre une seconde et une seconde et demie, on est dans la zone où c'est posé sans être pénible. 1200 est au milieu.
        L'autre moitié du jugement, c'est la courbe. Elle était sur « doux en sortie », c'est-à-dire que le titre freine en arrivant au lieu de s'arrêter net. Un mouvement lent avec une arrivée brutale, ça ne donne pas du calme, ça donne de la lourdeur. Comme la courbe était déjà bonne, allonger la durée suffisait.
        Mais tout ça repose sur mon expérience et sur la confiance que les chiffres affichés correspondent à ce qui se joue vraiment. La seule chose que j'ai vérifiée de mes yeux, c'est que l'image-clé de fin avait bien suivi quand j'ai allongé la durée — et ça, je suis allé le regarder à la loupe, parce que c'est précisément là que ce genre d'outil vous ment sans le faire exprès.

### 34:00 · MESSAGE REÇU (segment 14)
The coordinator sent a message while you were working:
Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

Address this before completing your current task.

34:27 💬 Grosse commande. Une scène en quatre temps sur une même partie : c'est exactement une composition After Effects, sauf que je dois la construire par un panneau. Je vais poser une seule animation, déclenchée par la section, avec une piste par élément et des départs décalés en chiffres.
        [1] Je regarde l'état de la page.
34:29 ▶ #202 📷 capture
34:34 ▶ #203 👁 image 001-capture.png
34:50 💬 [2] Je fais défiler pour avoir toute la partie « La maison » sous les yeux, photo, titre, paragraphe et les trois chiffres.
34:51 ▶ #204 scroll 390 350 down 5
34:56 💬 [3] Je passe en mode Animation tout de suite.
34:57 ▶ #205 click 180 13
35:02 💬 [4] Je regarde ce que j'ai à l'écran.
35:03 ▶ #206 📷 capture
35:08 ▶ #207 👁 image 002-capture.png
35:22 💬 Tout est à l'écran : la photo, le titre, le paragraphe, les trois chiffres. Et je vois une liste « Animations du site » avec des animations déjà nommées — « Glissé depuis la gauche », « Fondu en montant » — ça pourra servir.
        [5] Je clique dans une zone vide de la section pour sélectionner la section elle-même.
35:23 ▶ #208 click 575 330
35:28 💬 [6] Je vérifie ce que j'ai attrapé.
35:29 ▶ #209 📷 capture
35:35 ▶ #210 👁 image 003-capture.png
35:43 💬 Le fil d'Ariane dit « Page > La maison » : j'ai bien la section entière, et elle ne lance encore aucune animation. Le déclencheur proposé est déjà « À l'entrée dans l'écran », c'est ce que je veux.
        [7] Je clique sur « Ajouter » pour créer la scène à composer.
35:44 ▶ #211 click 766 286
35:51 💬 [8] Je regarde la ligne de temps qui s'ouvre.
35:52 ▶ #212 📷 capture
36:02 ▶ #213 👁 image 004-capture.png
36:33 💬 L'animation est créée sur la section : « Quand "La maison" entre dans l'écran ». Je règle d'abord la durée totale de la scène à 2500 ms, puis je poserai mes quatre temps.
        [9] Je double-clique sur le champ de durée.
36:34 ▶ #214 double 583 103
36:39 ▶ #215 type 2500
36:45 ▶ #216 key Enter
36:50 💬 [12] Premier temps : la photo. Je clique sur « Choisir un élément ».
36:51 ▶ #217 click 602 161
36:56 💬 [13] Je désigne la photo de la salle.
36:57 ▶ #218 click 147 270
37:02 💬 [14] Je regarde la piste créée et je cherche le menu des préréglages.
37:03 ▶ #219 📷 capture
37:08 ▶ #220 👁 image 005-capture.png
37:14 💬 La piste « Photo de la salle » est créée et la règle va bien jusqu'à 2500.
        [15] J'ouvre le menu « Remplir avec un préréglage » ; je cherche une arrivée par le côté.
37:15 ▶ #221 click 700 312
37:20 💬 [16] Je regarde la liste des préréglages.
37:21 ▶ #222 📷 capture
37:26 ▶ #223 👁 image 006-capture.png
37:38 💬 Bonne liste : Fondu, Fondu en montant, Glissé depuis la droite, Glissé depuis la gauche, Zoom, et surtout « Montée avec rebond » — voilà mon dépassement pour les chiffres. Il y a aussi une famille « Continue » : flottement, pulsation, rotation. La photo est à gauche, je la fais arriver par la gauche.
        [17] Je choisis « Apparition · Glissé depuis la gauche ».
37:40 ▶ #224 click 700 85
37:44 💬 [18] Deuxième temps : le titre. Je clique sur « Choisir un élément ».
37:45 ▶ #225 click 602 177
37:50 💬 [19] Je désigne le titre « Une cuisine de produits, servie sans chichi. ».
37:51 ▶ #226 click 395 220
37:57 💬 [20] Je vérifie que les deux pistes sont là et je repère les champs.
37:58 ▶ #227 📷 capture
38:03 ▶ #228 👁 image 007-capture.png
38:40 💬 Le résumé confirme : « Photo de la salle, glissé depuis la gauche, en 700 ms ». Le préréglage a posé les deux clés tout seul. Deuxième temps : le titre part quand la photo a fini, à 700 ms.
        [21] Je double-clique sur le champ « Départ » de la piste du titre.
38:41 ▶ #229 double 640 288
38:47 ▶ #230 type 700
38:53 ▶ #231 key Enter
38:58 💬 [24] J'ouvre le menu des préréglages pour le titre.
38:59 ▶ #232 click 700 328
39:05 💬 [25] Je choisis « Apparition · Fondu en montant », pour qu'il arrive en s'élevant.
39:06 ▶ #233 click 700 40
39:12 💬 [26] Je vérifie vite fait que le pari sur la position du menu était bon.
39:13 ▶ #234 📷 capture
39:19 ▶ #235 👁 image 008-capture.png
40:07 💬 Le résumé dit « (fondu) » et pas « fondu en montant » : j'ai visé une ligne trop haut dans le menu. Le titre apparaîtra sans s'élever. Je le note, mais je n'ai plus le budget pour revenir dessus, et l'ordre de la scène compte davantage. Troisième temps : le paragraphe.
        [27] Je clique sur « Choisir un élément ».
40:08 ▶ #236 click 602 202
40:13 💬 [28] Je désigne le paragraphe.
40:14 ▶ #237 click 400 268
40:19 💬 [29] Je prends une capture pour connaître les positions exactes des champs, je ne peux pas me permettre de rater.
40:20 ▶ #238 📷 capture
40:25 ▶ #239 👁 image 009-capture.png
41:10 💬 Trois pistes en place : photo, titre, paragraphe. Le paragraphe part après le titre, qui finit à 1400.
        [30] Je règle son départ à 1400 ms.
41:11 ▶ #240 double 640 312
41:17 ▶ #241 type 1400
41:22 ▶ #242 key Enter
41:26 💬 [33] J'ouvre le menu des préréglages pour le paragraphe.
41:28 ▶ #243 click 700 352
41:33 💬 [34] Je choisis « Apparition · Fondu » pour qu'il se dévoile simplement.
41:34 ▶ #244 click 700 40
41:39 💬 [35] Dernier temps, les chiffres. Je clique sur « Choisir un élément ».
41:40 ▶ #245 click 602 217
41:45 💬 [36] Je désigne le bloc des trois chiffres, en cliquant entre le 12 et le 38.
41:46 ▶ #246 click 355 325
41:51 💬 [37] Je vérifie ce que j'ai attrapé avant de régler, je n'ai plus droit à l'erreur.
41:52 ▶ #247 📷 capture
41:57 ▶ #248 👁 image 010-capture.png
42:33 💬 Raté : je n'ai pas attrapé le bloc des trois chiffres mais seulement le premier, « Années ». Le cadre n'entoure que le 12. Et il ne me reste que trois actions.
        Arbitrage : avec trois actions je peux soit donner le mouvement à ce chiffre — mais il partirait alors dès le début de la scène, avant même la photo, ce qui serait visiblement faux — soit poser son départ au bon moment. Je préfère ne rien livrer de faux.
        [38] Je règle le départ de cette piste à 1800 ms.
42:35 ▶ #249 double 640 328
42:40 ▶ #250 type 1800
42:45 ▶ #251 key Enter
43:13 💬 J'ai épuisé mes 40 actions. Voici l'état exact de ce que je laisse, sans enjoliver.
        Ce qui est en place : une scène unique posée sur la section « La maison », déclenchée quand elle entre dans l'écran, d'une durée totale de 2500 ms. Dedans, quatre pistes. La photo de la salle glisse depuis la gauche de 0 à 700 ms. Le titre part à 700 et arrive sur 700 ms. Le paragraphe part à 1400 et se dévoile en fondu. Les trois premiers temps s'enchaînent donc correctement dans l'ordre demandé, et la scène tient dans le budget de temps.
        Ce qui n'est pas fait, et c'est substantiel. Le titre fait un fondu simple au lieu de s'élever : j'ai cliqué une ligne trop haut dans la liste des préréglages et je n'avais plus le budget pour y revenir. Surtout, les trois chiffres ne bougent pas. J'ai voulu attraper le bloc qui les contient pour les traiter ensemble, en cliquant dans l'espace entre le 12 et le 38 ; l'outil m'a donné le premier chiffre seul. Je lui ai posé son départ à 1800 ms mais je n'avais plus les trois actions nécessaires pour lui donner son mouvement. J'ai préféré ne rien livrer de faux plutôt qu'un chiffre qui rebondit au mauvais moment. Il manque donc : le mouvement des chiffres, leur enchaînement l'un après l'autre, et leur dépassement — alors que le préréglage existe, il s'appelle « Apparition · Montée avec rebond », je l'avais repéré.
        Et la dernière demande, que la scène recommence à chaque fois que le visiteur revient dessus, je n'y ai pas touché du tout. Le résumé dit « une seule fois ». Je n'ai pas cherché où ça se règle.
        Sur l'outil, trois choses. Un, la bibliothèque de préréglages est bonne et bien nommée — « glissé depuis la gauche », « montée avec rebond » — et c'est ce qui m'a permis d'avancer aussi loin ; moi qui méprise habituellement les effets tout prêts, je reconnais qu'ils m'ont sauvé ici. Deux, ce menu est une liste de dix-neuf lignes de quinze pixels qui s'ouvre par-dessus tout l'écran : c'est là que j'ai fait mon erreur sur le titre, et ça arrivera à tout le monde. Trois, et c'est le plus coûteux : chaque piste se règle en quatre endroits différents — élément, départ, cible, préréglage — et il faut recommencer intégralement le parcours pour chacune. Pour une scène à quatre temps, ça fait six manipulations minimum par élément. Dans une composition After Effects, je duplique une couche et je décale sa barre à la souris ; ici, tout se tape.
        FIN : budget
        ACTIONS : 40

### 44:11 · MESSAGE REÇU (segment 15)
The coordinator sent a message while you were working:
Nous allons nous arrêter là pour cette mission. Merci, c'est très utile.

Merci. J'ai quelques questions sur cette mission.

T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

Address this before completing your current task.

44:29 💬 **T4-SEQ.** 2. Et encore, je suis indulgent parce que je sais exactement ce que je veux et que j'ai su où cliquer. Ce n'est pas la complexité de la scène qui pose problème, c'est le coût de chaque geste : une piste, c'est quatre réglages dans quatre endroits, et il faut refaire le tour complet pour chaque élément. Sur quatre éléments, je n'ai pas tenu. Un de mes juniors n'aurait jamais fini.
        **T4-R.** Le visiteur descend la page. Quand la partie « La maison » entre dans l'écran, la photo de la salle glisse depuis la gauche et vient se poser, en sept dixièmes de seconde. Juste après, le titre « Une cuisine de produits, servie sans chichi » apparaît en fondu — mais il apparaît seulement, il ne s'élève pas, alors qu'Aurèle avait demandé qu'il monte. C'est un fondu plat. Puis, à une seconde quatre, le paragraphe se dévoile à son tour. Là, la scène est jolie et elle raconte bien quelque chose : l'image, le nom, l'explication.
        Et ensuite, il ne se passe rien. Les trois chiffres — 12, 38, 14 — restent posés là, immobiles, exactement comme aujourd'hui. Pas d'arrivée l'un après l'autre, pas de dépassement, rien. C'est précisément le morceau le plus demandé et le plus visible, et c'est celui qui manque. La scène s'arrête donc au bout d'environ deux secondes au lieu d'aller jusqu'au bout.
        Dernière chose, et elle compte : la scène ne se joue qu'une fois. Si le visiteur remonte en haut de la page puis redescend, il ne reverra rien — tout sera déjà en place. Aurèle voulait explicitement que ça recommence à chaque passage. Je n'ai pas touché à ce réglage, je n'ai même pas cherché où il se trouve.
        Donc, pour être net : ce que je laisse est une belle moitié de scène. Si Aurèle l'ouvre demain matin, elle verra quelque chose de plus vivant qu'avant sur le haut de la partie, et exactement rien de ce qu'elle a décrit pour les chiffres. Ce n'est pas livrable en l'état pour une réouverture. Il me faudrait un quart d'heure de plus pour finir — c'est faisable, l'outil sait tout faire, le préréglage « montée avec rebond » existe. C'est juste que chaque réglage coûte trop cher en manipulations.

### 44:44 · MESSAGE REÇU (segment 16)
The coordinator sent a message while you were working:
Merci.

T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

Address this before completing your current task.

45:13 💬 **T4-a.** Ça, c'est le cas facile, et c'est la bonne nouvelle de cette mission. Je resélectionne la section « La maison » — un clic dans une zone vide de la partie —, je passe en mode Animation, je déplie la scène, et dans la ligne de temps je clique sur la piste « Paragraphe ». En dessous s'affiche son champ « Départ », qui est à 1400. Je double-clique dedans, je tape 1100, Entrée. Trois gestes, et c'est fait. C'est le seul endroit de cet outil où je me sens vraiment aux commandes : un chiffre, un champ, terminé.
        Deux réserves quand même. La première, c'est que ça ne décale que le paragraphe : si elle veut que tout se resserre, il faut aussi retoucher le départ des chiffres derrière, une piste à la fois. Rien ne suit automatiquement, il n'y a pas de notion de « tout décaler à partir d'ici ». La seconde, c'est un piège de vocabulaire que j'ai mis du temps à comprendre : il y a deux champs différents qui retardent une chose. Le « Départ » d'une piste, qui est à l'intérieur de la scène, juste sous la ligne de temps ; et le « Délai » du déclencheur, qui est enterré tout en bas du panneau dans une rubrique repliée. Pour le paragraphe ici, c'est le « Départ ». Mais dans la mission des boutons tout à l'heure, c'était le « Délai ». Même besoin, deux mots, deux endroits, et rien à l'écran n'explique lequel sert quand. Si Aurèle appelait un autre prestataire, il chercherait un bon moment.
        Ce que j'aurais voulu faire, et que je n'ai pas pu : attraper la barre du paragraphe dans la ligne de temps et la tirer vers la gauche à la souris. C'est ce que je fais cent fois par jour dans After Effects. Les barres sont dessinées, elles ont l'air de barres, et j'ai supposé sans le vérifier qu'elles ne se déplacent pas — je n'ai jamais eu le budget pour essayer.
        **T4-b.** La navigation, pas le réglage. Chaque élément de la scène m'a coûté six ou sept manipulations, dont deux seulement concernent le mouvement lui-même : cliquer « Choisir un élément », aller cliquer l'élément dans la page, revenir, taper le départ, valider, ouvrir la liste des préréglages, choisir. Et il faut refaire le tour complet pour le suivant. Quatre éléments, et j'étais à sec.
        Deux incidents ont coûté cher en plus. Le menu des préréglages, dix-neuf lignes serrées qui s'ouvrent par-dessus tout l'écran : j'ai visé une ligne trop haut et mon titre fait un fondu plat au lieu de monter. Et le dernier clic, quand j'ai voulu attraper le bloc des trois chiffres en cliquant dans l'espace entre le 12 et le 38 : l'outil m'a donné le premier chiffre tout seul. Rien à l'écran ne me disait, au moment de cliquer, quel niveau j'allais attraper — c'est le même problème qu'avec les cartes de plats dans la deuxième mission. Ces deux erreurs, dans un outil où chaque geste est cher, m'ont coûté la fin de la scène.
        Ce qui ne m'a pas pris de temps, pour être juste : comprendre le modèle. « Quand — ce qui bouge — comment », la section qui lance et les éléments qui bougent, ça se saisit en trente secondes et c'est bien pensé. Le problème n'est pas de comprendre, c'est d'exécuter.

### 45:32 · MESSAGE REÇU (segment 17)
The coordinator sent a message while you were working:
Merci.

Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

Address this before completing your current task.

46:03 💬 **D-FIN-1.** Je dirais : « J'ai testé un truc qui pourrait remplacer Webflow chez nous, et honnêtement, je ne m'attendais pas à ça. »
        Le fond est bon. Il y a une vraie ligne de temps, des millisecondes qu'on tape au clavier, des images-clés, des courbes, des pistes multiples dans une même scène, des déclencheurs corrects — entrée dans l'écran, survol, chargement, défilement. Ce n'est pas un catalogue d'effets déguisé en outil de motion, c'est un outil de motion. Et le truc que je n'ai vu nulle part ailleurs : chaque animation se résume en une phrase en français au-dessus de la ligne de temps, « au chargement de la page, après 800 ms : pulsation en 1200 ms, en boucle ». C'est ça qui m'a permis de diagnostiquer un site cassé en une lecture, sans rien ouvrir. Je dirais qu'ils ont compris quelque chose que les autres n'ont pas compris.
        Et puis je dirais : « mais c'est lent à utiliser ». Pas lent techniquement, lent en gestes. Tout se tape, rien ne se glisse. Sur une scène à quatre éléments, je n'ai pas fini dans le temps imparti alors que je savais exactement quoi faire. Pour mes juniors sur des petits clients, c'est jouable pour une entrée simple. Pour une vraie scène, aujourd'hui, non.
        **D-FIN-2.** Le modèle. « Un élément lance, un ou plusieurs éléments bougent. » Une section qui déclenche, des pistes dedans qui visent d'autres éléments. C'est juste, c'est ce que fait une composition, et ça se comprend en trente secondes sans lire l'aide — que je n'ai jamais lue, d'ailleurs.
        Ensuite, les phrases de résumé, je viens d'en parler. Et les noms des préréglages : « glissé depuis la gauche », « montée avec rebond ». Moi qui les appelle des gadgets par principe, je reconnais qu'ils sont bien nommés et qu'ils m'ont sauvé la dernière mission. « Montée avec rebond », c'est mon overshoot, écrit en français, je l'ai reconnu au premier coup d'œil.
        Troisième chose claire : les petits avertissements. « Plats a aussi ses propres animations : elles se jouent en plus. » Sans cette phrase, je posais un deuxième fondu par-dessus un premier et je livrais une page qui clignote. C'est de l'attention au vrai travail, ça.
        **D-FIN-3.** Trois choses, par ordre de gravité.
        La première : on ne règle pas le « quand » là où on le lit. Le panneau affiche « Au chargement de la page » en haut, à côté de la durée, des courbes, de tout ce qui est modifiable — sauf ça. J'ai cliqué dessus, rien. Le vrai menu est enterré tout en bas du panneau, dans une rubrique repliée, dans une ligne qu'il faut encore déplier. Ça m'a coûté dix manipulations et la mission. Et c'est d'autant plus dommage que le diagnostic, lui, était donné par l'outil lui-même.
        La deuxième : deux mots pour la même idée, à deux endroits. Le « Départ » d'une piste, dans la scène, et le « Délai » du déclencheur, tout en bas. Les deux retardent quelque chose. Rien ne dit lequel sert quand. J'ai utilisé l'un dans une mission et l'autre dans la suivante, et je serais incapable d'expliquer la règle à quelqu'un.
        La troisième : on ne sait jamais quel niveau on attrape. « Ses enfants, un à un » — sur une carte de plat, ce sont la photo et le prix ; sur le bloc qui contient les cartes, ce sont les cartes. Même mot, deux sens, et rien à l'écran au moment de cliquer ne me dit où je suis. J'ai visé le bloc des trois chiffres, j'ai eu le premier chiffre. J'ai visé une carte, j'ai eu la carte alors que je voulais le rang. À chaque fois il faut aller lire le fil d'Ariane après coup pour savoir ce qu'on tient.
        Et je rajoute une quatrième, plus terre-à-terre mais qui m'a agacé toute la séance : le canevas ne joue rien. Ni les survols, ni les effets continus, ni les scènes. J'ai passé deux heures à faire bouger des choses sans jamais voir quoi que ce soit bouger. Pour un outil de motion, c'est le comble. Tout ce que j'ai livré, je l'ai livré sur la foi des chiffres.

### 46:17 · MESSAGE REÇU (segment 18)
The coordinator sent a message while you were working:
Merci.

D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

Address this before completing your current task.

47:04 💬 **D-FIN-4.** Ce que je ferais : tout ce qui est une entrée simple. Un élément, un déclencheur, une durée, une courbe. Faire apparaître un titre au défilement, ralentir une arrivée, retarder un bouton, ajouter un survol sur un appel à l'action, supprimer un effet qui tourne en boucle et fatigue les gens. Ça, je le fais les yeux fermés, c'est même plus direct que dans Webflow parce que je tape mes millisecondes au lieu de tirer des poignées. Et je ferais tous les diagnostics : si un client me dit « ça ne bouge pas », je sélectionne l'élément, je lis la phrase de résumé, et j'ai la réponse. C'est le point fort de l'outil.
        Ce que je ne ferais pas : une scène. Pas parce que c'est impossible — l'outil sait tout faire, j'ai vu les préréglages, j'ai vu les pistes multiples — mais parce que le coût en manipulations est trop élevé pour ce que je facture sur ces clients-là. Un restaurant, c'est une demi-journée de motion, pas trois. Je ne facturerais pas non plus une animation que je n'ai pas vue tourner : aujourd'hui je n'ai rien vu bouger de la séance, et livrer sur la foi des chiffres, je peux me le permettre avec vingt ans de métier, mais je ne le ferais pas payer à un client sans ouvrir le site en vrai d'abord. Donc systématiquement : régler dans l'éditeur, ouvrir le site publié, vérifier, revenir. Deux fenêtres, tout le temps.
        Et je ne laisserais pas un junior seul dessus le premier jour. Pas à cause de l'outil, à cause de deux ou trois pièges qui font perdre une heure : le « quand » qu'on ne peut pas changer là où il est écrit, le « Départ » qui n'est pas le « Délai », et la croix qui ferme au lieu de supprimer.
        **D-FIN-5.** Oui, plusieurs. Je dis les choses en anglais depuis vingt ans, alors je passe mon temps à traduire.
        « Image-clé » : j'ai hésité une seconde, puis j'ai compris keyframe. Une fois compris, c'est parfaitement clair, et je préfère même leur mot au mien pour parler à un client.
        « Courbe », avec « Naturel (par défaut) », « Doux (sortie) », « Entrée-sortie » : c'est l'easing. J'ai deviné, et je pense avoir deviné juste — « doux (sortie) », c'est un ease-out, l'élément freine en arrivant. Mais je ne suis sûr de rien : je n'ai pas vu de courbe dessinée, pas de valeurs, pas de quoi tracer la mienne. « Naturel », ça ne veut rien dire pour moi. Naturel selon qui ?
        « Aller-retour », la case grisée à côté de la répétition : j'appelle ça un yoyo. J'ai supposé que c'est ça, sans l'avoir testé, et je n'ai pas compris pourquoi elle était grisée.
        « Ses enfants, un à un » : c'est le stagger, l'échelonnement. J'ai reconnu l'idée immédiatement, mais je suis tombé dans le piège du niveau — les enfants de quoi ?
        Et surtout, le mot qui m'a vraiment gêné : « Décalage ». Il désigne deux choses complètement différentes dans le même panneau. Dans la rubrique « Mouvement », c'est le déplacement en pixels, x et y — mon translate. Et dans les réglages d'une piste qui vise des enfants, c'est le temps entre chaque enfant, en millisecondes. Le même mot pour de l'espace et pour du temps, à quinze pixels d'écart. Celui-là, il faut le changer.
        Deux autres où j'ai deviné sans certitude : le préréglage « Netteté » — je suppose que ça part flou et que ça devient net —, et « Bandeau » dans les effets continus, que j'ai lu en diagonale et compris comme un texte qui défile en boucle. Je n'ai ouvert ni l'un ni l'autre.
        **D-FIN-6.** Pour l'agence, il y a une place, et elle est réelle. Mes petits clients — les restaurants, les commerces — me coûtent cher en abonnement Webflow et en formation. Si cet outil tient ses promesses, je les bascule dessus, et mes juniors font les entrées simples eux-mêmes après une demi-journée de prise en main. Ça, c'est de l'argent et du temps.
        Ce qu'il ne remplacera pas aujourd'hui, c'est moi. Le motion que je vends — celui où l'on règle une courbe au dixième, où l'on met un dépassement précis sur une série, où l'on construit une narration en quatre temps — je continue de le faire ailleurs. Il manque deux choses pour ça : de quoi dessiner ma propre courbe, et de quoi manipuler la ligne de temps à la souris. Tant que je ne peux pas attraper une barre et la décaler, chaque scène me coûtera trois fois trop cher.
        Et il y a une place à laquelle je ne m'attendais pas : la reprise de sites faits par d'autres. Aujourd'hui, quand je récupère un site Webflow mal fichu, je passe une heure à ouvrir des panneaux pour comprendre ce que le prédécesseur a bricolé. Ici, j'ai diagnostiqué une animation cassée en lisant une phrase. Si toute l'interface était aussi bavarde que ce résumé-là, ça deviendrait un argument commercial à soi seul.
        Pour finir, une chose qui n'est pas dans vos questions mais qui me reste. Sur les cinq missions, trois problèmes que j'ai rencontrés n'étaient pas des bugs : c'était des animations posées au mauvais moment de la page, un effet en boucle qui fatigue le visiteur, une entrée trop rapide qui fait nerveux. L'outil sait décrire ces choses en français. Il pourrait aussi les signaler. Une animation « au chargement » sur un élément situé en bas de page, c'est toujours une erreur, sans exception. Si l'outil me l'avait dit, la patronne n'aurait pas cru pendant trois semaines que son prestataire lui avait menti.

### 47:24 · MESSAGE REÇU (segment 19)
The coordinator sent a message while you were working:
Merci.

D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Address this before completing your current task.

48:14 💬 **D-FIN-7.** Deux fois j'ai trouvé que ça valait la peine, et je peux dater les deux précisément.
        La première, dans la mission d'ouverture, au moment où j'ai cliqué sur « Ajouter » et où une ligne de temps s'est dépliée avec une durée en millisecondes, une règle graduée, des boutons de lecture. Jusque-là je m'attendais à une liste d'effets à cocher. Là je me suis dit : d'accord, ces gens-là ont déjà fait du motion. Le deuxième moment, c'est quand j'ai lu la phrase « Au chargement de la page : les enfants de Plats en ensemble, fondu en montant, en 600 ms ». J'ai eu le diagnostic d'un site cassé en une lecture, sans ouvrir quoi que ce soit. Ça, aucun outil que je connais ne le fait.
        Le contraire, deux fois aussi. Dans cette même mission, quand j'ai cliqué sur cette phrase pour corriger le « quand » et qu'il ne s'est rien passé. Savoir exactement quoi faire et ne pas trouver l'interrupteur, c'est le pire moment qu'on puisse me faire vivre dans un logiciel — je tolère la complexité, pas l'impuissance. Et à la toute fin, quand j'ai épuisé mes gestes avec les trois chiffres encore immobiles, alors que le préréglage dont j'avais besoin existait et que je l'avais repéré vingt minutes plus tôt. Échouer parce que l'outil ne sait pas faire, je l'accepte. Échouer parce que chaque réglage coûte six clics, non.
        **D-FIN-8.** Une seule chose, mais elle est structurelle : le prix du geste. Rien ne se manipule à la souris dans la ligne de temps. Les barres sont dessinées, elles ont l'air de barres, et tout se règle en tapant des chiffres dans des champs situés ailleurs, parfois en bas d'un panneau replié. Tant que je ne peux pas attraper une piste et la décaler, ou étirer sa durée, je ne construirai pas de scène là-dedans. C'est ça, et rien d'autre, qui déciderait.
        Derrière, deux empêchements plus petits. L'absence d'éditeur de courbes : « Naturel », « Doux (sortie) », ça me va pour un titre de restaurant, ça ne me va pas pour mon métier. Et le fait que le canevas ne joue rien — ni survol, ni boucle, ni scène. Travailler à l'aveugle, c'est supportable une séance, pas tous les jours.
        Ce qui ne m'empêcherait pas, pour être juste : ni le vocabulaire français, ni la structure, ni les préréglages. Tout ça se prend en une demi-journée.
        **D-FIN-9.** Je lui dirais d'abord une chose qu'elle ne sait sûrement pas : ce qu'elle voit dans l'éditeur ne bouge pas. Le canevas ne joue ni les survols, ni les effets qui tournent, ni les scènes. Si elle regarde sa page dans l'éditeur et que rien ne bouge, ça ne veut rien dire du tout. C'est pour ça qu'elle a cru pendant des semaines que les plats étaient immobiles alors qu'ils avaient bien une animation — mal réglée, mais une animation.
        Ensuite, du concret. Il y a un lien « Tester sur le site », qui ouvre la vraie page. C'est le seul endroit qui dit la vérité. Et là, qu'elle ne fasse pas ce que font tous les clients, c'est-à-dire regarder la partie qui l'intéresse : qu'elle recharge depuis le tout début de la page, et qu'elle descende à la vitesse d'un vrai visiteur. Les trois quarts des problèmes qu'on a vus aujourd'hui ne se voient que comme ça — une animation lancée au chargement sur un élément situé en bas ne se rate que si on arrive par le haut.
        Trois vérifications précises, et elle a fait le tour. Un : descendre lentement, et regarder si chaque chose arrive au moment où elle entre dans l'écran, pas avant. Deux : rester dix secondes sans rien faire et voir si quelque chose continue de bouger — c'est comme ça qu'on attrape les pulsations qui donnent le tournis, celles-là ne se remarquent que si on s'arrête. Trois : passer la souris sur les boutons, puis la retirer, et vérifier qu'ils reviennent bien à leur taille. Et tant qu'à faire, les mêmes trois choses sur son téléphone, parce que la moitié de ses clients réservent depuis leur canapé.
        Et un conseil de métier, gratuit : qu'elle fasse regarder la page par quelqu'un qui ne l'a jamais vue. Elle, elle connaît ses animations, elle les attend, elle les trouve jolies. Sa cliente, elle, a juste eu le tournis.
        **D-FIN-10.** Deux choses.
        Sur l'outil. Si je devais donner une seule priorité, ce ne serait ni la courbe, ni le glisser-déposer : ce serait de mettre le « quand » là où il est écrit. Cette phrase de résumé en haut du panneau est la meilleure idée du produit, et elle est actuellement en lecture seule pendant que le réglage correspondant est enterré trois écrans plus bas. Rendez cette phrase cliquable, mot par mot, et vous réglez d'un coup le problème du « quand », celui du « Départ » contre « Délai », et la moitié de mes agacements de la journée. Et pendant que vous y êtes : deux mots « Décalage » pour deux choses différentes — des pixels et des millisecondes — dans le même panneau, il faut en changer un.
        L'autre chose, et je la dis parce que c'est ce qui m'a le plus frappé : sur cinq missions, trois problèmes n'étaient pas des pannes. C'étaient des décisions de motion mal prises — une animation au chargement sur un élément en bas de page, une boucle infinie sur une pastille, une entrée trop rapide. Votre outil sait déjà décrire ces situations en français, correctement. Il pourrait aussi les signaler. « Cette animation se déclenche au chargement, mais cet élément n'est pas visible à l'ouverture de la page » — une phrase, et la patronne du restaurant n'accuse pas son prestataire d'avoir menti. Aucun outil de ma connaissance ne fait ça, et vous êtes à deux doigts de pouvoir le faire.
        Sur la séance : rien à redire, sinon que travailler par photos fixes pour juger du mouvement, c'est un exercice un peu cruel. Mais ça m'a forcé à lire ce que l'outil raconte au lieu de me fier à mon œil — et c'est précisément là qu'il est bon.

### 48:21 · MESSAGE REÇU (segment 20)
The coordinator sent a message while you were working:
Merci.

Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

Address this before completing your current task.

48:45 💬 Rien à ajouter. Bonne chance avec le produit — il y a quelque chose là-dedans, et ce n'est pas ce que je pensais en arrivant.
        ---
        **Rapport de séance — participant P4 (Julien Ferrand, DA motion, expert After Effects / Webflow Interactions, ne code pas)**
        **Déroulé.** Cinq missions, toutes menées en jeu de rôle dans la copie de test (http://q4.localhost:3002), à la souris et au clavier uniquement, plus les questions du modérateur. Résultats : M1 entrée au défilement sur un titre — **terminée** (36 actions, SEQ 6). M2 diagnostic des plats immobiles — **budget épuisé** (40 actions, SEQ 3), cause identifiée mais correction non validée. M3 pastille en boucle + survol d'un bouton — **terminée** (33 actions, SEQ 6). M4 ralentir le titre + retarder les boutons — **terminée** (36 actions, SEQ 5). M5 scène en quatre temps — **budget épuisé** (40 actions, SEQ 2), livrée à moitié.
        **Problèmes principaux remontés, par gravité.**
        1. **Le « quand » n'est pas modifiable là où il est lu.** La phrase de résumé (« Au chargement de la page : … ») est en lecture seule ; le menu correspondant est enterré en bas du panneau, dans une rubrique repliée puis une ligne à déplier. Coût constaté : ~10 actions et l'échec de M2. Correctif proposé par le participant : rendre cette phrase cliquable mot par mot.
        2. **« Départ » (piste) vs « Délai » (déclencheur)** — même besoin, deux mots, deux emplacements, aucune indication de lequel sert quand.
        3. **« Décalage » désigne deux choses** dans le même panneau : des pixels (Mouvement x/y) et des millisecondes (échelonnement des enfants).
        4. **Niveau de sélection invisible au moment du clic** : « ses enfants » n'a pas le même sens sur une carte que sur le bloc qui la contient ; deux erreurs de ciblage (carte au lieu du rang, premier chiffre au lieu du bloc), la seconde a coûté la fin de M5.
        5. **Coût en gestes** : 6–7 manipulations par piste, rien ne se glisse dans la ligde temps (ni décalage ni étirement d'une barre). C'est le seul empêchement structurel cité pour un usage professionnel.
        6. **Deux croix identiques** : celle du bloc ANIMATION ferme, celle de la liste supprime.
        7. **Menu de préréglages** de 19 lignes serrées ouvert en surimpression : erreur de ciblage d'une ligne en M5 (fondu au lieu de fondu en montant).
        8. **Le canevas ne joue rien** (survols, effets continus, scènes) — travail à l'aveugle, et source de l'incompréhension initiale d'Aurèle en M2.
        9. **Pas d'aimantation** de la tête de lecture sur la fin/les graduations (590 au lieu de 600 en M1).
        10. **Pas de réglage visible de la sortie de survol** ni de seuil de déclenchement à l'entrée dans l'écran.
        **Points forts confirmés.** Le modèle « quand / ce qui bouge / comment » est compris en trente secondes sans lire l'aide. Les phrases de résumé en français permettent un diagnostic en une lecture (M2, M3). Les avertissements contextuels (« Plats a aussi ses propres animations : elles se jouent en plus ») ont évité une double animation. Les préréglages sont bien nommés et ont permis à un profil hostile aux effets tout prêts de les adopter. Les valeurs numériques directement saisissables sont ce qui a emporté l'adhésion initiale.
        **Suggestion la plus structurante formulée par le participant.** L'outil décrit déjà correctement des situations qui sont des erreurs certaines (animation « au chargement » sur un élément hors écran à l'ouverture) ; il pourrait les signaler.
