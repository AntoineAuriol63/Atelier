# Protocole d'étude · « Faire bouger un site » (Atelier)

Étude d'utilisabilité et de compréhension du parcours, participants simulés, séances modérées avec pensée à voix haute.

- Version : 1.0, pré-enregistrée le 13 septembre 2026, avant toute séance.
- Conception : à partir du seul brief chercheur, sans accès à l'interface, au dépôt ni aux audits existants.
- Règle de gel : après la première séance, ce document ne change plus. Toute correction indispensable (erreur de préparation, consigne impraticable) est consignée dans un addendum daté, avec la raison, et les séances déjà passées sont signalées comme telles dans le rapport.

---

## 1. Objectifs et questions de recherche

### 1.1 Objectif général

Savoir si les deux publics annoncés (débutant qui veut un effet tout prêt sur un élément ; designer qui veut composer plusieurs éléments dans le temps) obtiennent, sans documentation, le résultat voulu pour le visiteur, en comprenant ce qu'ils ont fait, et repérer les endroits précis du parcours où ils se perdent ou trouvent de la valeur.

### 1.2 Questions de recherche

- **QR1. Le déroulé est-il compris ?** Le participant se représente-t-il les étapes nécessaires (désigner l'élément, décider ce qui bouge, décider quand cela se lance, régler le rythme, vérifier) et leur ordre, avant et après avoir agi ?
- **QR2. Sait-il quoi faire à chaque étape ?** Trouve-t-il par où commencer ; reconnaît-il l'étape suivante ; les mots affichés lui parlent-ils ; combien de fausses pistes avant la bonne ?
- **QR3. Comprend-il ce que verra le visiteur ?** Son récit du résultat (quels éléments, à quel moment, de quelle manière, combien de temps, combien de fois) correspond-il au site réellement enregistré ? Distingue-t-il ce qu'il voit dans l'éditeur de ce que vivra un visiteur qui ouvre la page et la fait défiler ? Sait-il le vérifier ?
- **QR4. Les deux publics y arrivent-ils ?** Le débutant obtient-il un effet tout prêt sans être gêné par les possibilités avancées ? Le designer obtient-il un minutage précis de plusieurs éléments sans documentation ?
- **QR5. Où la valeur perçue apparaît-elle ou se perd-elle ?** À quelle étape le participant exprime-t-il que « ça vaut le coup », et à quelle étape exprime-t-il le contraire (lenteur, perte de contrôle, peur de casser, résultat invisible) ?

### 1.3 Correspondance questions, tâches et mesures

| Question | Tâches principales | Mesures principales |
|---|---|---|
| QR1 | toutes | codes MM, récit visiteur, questions après tâche, débriefing D1 et D4 |
| QR2 | T1 (à froid), T3, T5 | actions jusqu'à la première action pertinente, FP, HES, VOC, aides |
| QR3 | T2 surtout, toutes via le récit | concordance du récit, diagnostic T2, code VERIF, matrice réussite × concordance |
| QR4 | T1, T5 (débutants) ; T3, T4 (designers) | réussite par public, profil de critères T4, SEQ par public |
| QR5 | toutes | codes SAT, FRU, VAL+, VAL− situés par étape du parcours, débriefing D6 à D8 |

### 1.4 Hors champ (limites de couverture à rappeler dans le rapport)

Non couverts par les tâches : le rôle « client » (rédacteur), les effets continus (parallaxe, bandeau qui défile, nombre qui compte, carrousel), le suivi de la position de la souris, l'animation liée à toute la page (barre de progression), le déclenchement au clic, la réutilisation, le renommage et l'inventaire des animations du site, l'affichage sur mobile, l'accessibilité (réduction des mouvements), la publication. Ils ne peuvent être ni validés ni invalidés par cette étude. Les découvertes fortuites sur ces sujets sont notées (code DEC) mais restent exploratoires.

---

## 2. Hypothèses pré-enregistrées

Formulées à partir du brief seul, avant toute séance. Les seuils sont fixés ici et ne seront pas modifiés après coup. Avec 5 participants simulés, « confirmée » signifie « compatible avec les données de cette étude », jamais « démontrée ». Chaque hypothèse reçoit en fin d'étude l'un des trois statuts : confirmée, infirmée, indéterminée.

Les personas sont désignées ainsi : débutants = P1 Nathalie et P3 Karim ; designers = P2 Claire, P4 Julien, P5 Élodie.

### H1. Découverte à froid

**Énoncé.** Trouver par où commencer coûte nettement plus aux débutants qu'aux designers : en T1, la médiane des actions jusqu'à la première action pertinente (définie en 9.2) des deux débutants est au moins le double de celle des trois designers.
- Confirmée si : médiane débutants ≥ 2 × médiane designers.
- Infirmée si : médiane débutants ≤ 1,2 × médiane designers.
- Indéterminée entre les deux, ou si un débutant abandonne avant toute action pertinente (on le note alors comme valeur maximale de 40 et on signale le cas).

### H2. Confusion entre « à l'ouverture de la page » et « quand on arrive dessus »

**Énoncé.** Le moment qui lance le mouvement est la notion la moins bien comprise : au moins 2 participants sur 5 laissent ou produisent un mouvement lancé à l'ouverture de la page sur un élément situé plus bas que le premier écran (T1), ou n'identifient pas cette cause en T2.
- Confirmée si : ≥ 2 participants distincts présentent l'un de ces deux faits, lus dans le site enregistré (T1) ou dans la réponse à la question T2-a comparée à l'état préparé (T2).
- Infirmée si : 0 participant.
- Indéterminée si : 1 participant.

### H3. Écart entre ce que le participant croit et ce que vivra le visiteur

**Énoncé.** Les participants se trompent souvent sur ce que verra le visiteur : au moins 30 % des récits « ce qui se passera pour un visiteur » (toutes tâches terminées ou abandonnées confondues, 25 récits au plus) contiennent au moins un écart matériel avec le site enregistré (définition en 9.4).
- Confirmée si : ≥ 30 % des récits.
- Infirmée si : < 15 % des récits.
- Indéterminée entre les deux.

### H4. Vérification spontanée rare

**Énoncé.** Moins de la moitié des participants vérifient spontanément, avant de déclarer T1 terminée, le résultat dans des conditions de visiteur (page vue comme un visiteur et parcourue jusqu'à l'élément), code VERIF.
- Confirmée si : ≤ 2 participants sur 5 présentent un code VERIF en T1 avant « j'ai terminé ».
- Infirmée si : ≥ 4 participants.
- Indéterminée si : 3.

### H5. La durée se trouve, le retard beaucoup moins

**Énoncé.** Rendre un mouvement plus lent est accessible ; faire attendre un élément qu'un autre ait fini l'est beaucoup moins. En T3, le critère « titre plus lent » est rempli sans aide de niveau 2 ou 3 par au moins 4 participants, et le critère « boutons après le titre » par au plus 3.
- Confirmée si : les deux conditions sont vraies.
- Infirmée si : le critère « boutons après le titre » est rempli sans aide par au moins autant de participants que le critère « titre plus lent ».
- Indéterminée dans les autres cas.

### H6. Les designers composent sans documentation

**Énoncé.** L'intention annoncée pour le designer tient : au moins 2 des 3 designers obtiennent en T4 une réussite complète sans aide de niveau 2 ou 3.
- Confirmée si : ≥ 2 designers en réussite complète sans aide.
- Infirmée si : 0 designer.
- Indéterminée si : 1 designer.

### H7. La séquence à événement unique n'est pas trouvée spontanément

**Énoncé.** Parmi les participants qui obtiennent en T4 le bon ordre de départ (critère C3), au moins la moitié l'obtient avec des lancements séparés par élément et des retards ajustés à la main, et non avec un seul événement qui lance l'ensemble.
- Confirmée si : proportion ≥ 50 % (et au moins 2 participants avec le bon ordre).
- Infirmée si : proportion ≤ 25 % (et au moins 2 participants avec le bon ordre).
- Indéterminée sinon, notamment si moins de 2 participants obtiennent le bon ordre.

### H8. Retrait partiel difficile quand un élément porte deux mouvements

**Énoncé.** Retirer un seul des mouvements d'un élément qui en porte deux est source d'erreur : en T5, au moins 2 participants suppriment ou dégradent l'arrivée de la pastille en voulant arrêter son mouvement permanent, ou n'arrêtent pas le mouvement permanent tout en croyant l'avoir fait.
- Confirmée si : ≥ 2 participants (critère S2 non rempli, ou S1 non rempli alors que le récit affirme l'arrêt).
- Infirmée si : 0 participant.
- Indéterminée si : 1.

### H9. Le vocabulaire sépare les publics

**Énoncé.** Les mots affichés pour le mouvement sont compris des designers mais pas des débutants : chacun des 2 débutants produit au moins 2 codes VOC distincts (termes différents) sur l'ensemble de la séance, et la médiane des codes VOC distincts des designers est au plus 1.
- Confirmée si : les deux conditions sont vraies.
- Infirmée si : au moins un débutant a 0 code VOC, ou la médiane des designers est ≥ 2.
- Indéterminée sinon.

### H10. La valeur apparaît au premier résultat visible et se perd au réglage

**Énoncé.** La valeur perçue apparaît quand le participant voit un premier élément bouger comme prévu, et se perd pendant les réglages de rythme et de composition : parmi les codes SAT et VAL+, la majorité sont situés aux étapes « choisir » ou « vérifier » ; parmi les codes FRU et VAL−, la majorité sont situés aux étapes « régler » ou « composer » (étapes définies en 9.5).
- Confirmée si : les deux majorités sont vraies, avec au moins 5 codes de chaque sens.
- Infirmée si : l'une des deux répartitions est inversée (majorité à l'opposé), avec au moins 5 codes du sens concerné.
- Indéterminée sinon. Hypothèse la plus exposée à la complaisance du dispositif simulé (voir 10) : son résultat est rapporté comme indicatif, quel qu'il soit.

---

## 3. Personas

Les personas ont été construites à partir de la matrice de diversité ci-dessous, et non à partir des hypothèses. Aucune n'est « idéale » : chacune porte des habitudes qui la desservent ici. Le scénario commun est le même pour toutes : la personne « s'occupe du site du restaurant Maison Aurèle » ; seule la raison change.

### 3.1 Matrice de diversité

| | P1 Nathalie | P2 Claire | P3 Karim | P4 Julien | P5 Élodie |
|---|---|---|---|---|---|
| Public | débutante | designer | débutant | designer | designer (intégratrice) |
| Niveau numérique | faible à moyen | élevé | moyen sur téléphone, faible sur ordinateur | élevé | élevé |
| Création de sites | faible (textes et photos sur Wix) | moyenne (maquettes Figma, Squarespace) | faible (site d'une page sur un créateur mobile) | avancée (Webflow) | avancée (WordPress, Elementor) |
| Outils d'animation | PowerPoint (animations de diapositives) | prototypes Figma | Canva, CapCut | After Effects, Webflow | réglages d'apparition d'Elementor, un peu de CSS |
| Métier | gérante d'épicerie fine | designer graphique freelance | gérant de food truck | directeur artistique motion, agence | intégratrice en petite agence |
| Patience | moyenne, anxieuse | élevée, mais s'agace des écarts aux conventions | faible | moyenne, exigeante sur le contrôle | moyenne, pressée par une échéance |
| Style d'exploration | lit tout, lentement, évite l'inconnu | méthodique, sélectionne puis cherche un panneau de propriétés | clique sur le plus visible, ne lit pas | cherche une ligne de temps et des valeurs, ignore les choix tout prêts | essai-erreur rapide, ouvre tous les onglets, annule beaucoup |
| Modèle mental attendu | diapositive : le mouvement se lance au clic ou tout seul | interaction de prototype : déclencheur puis transition | vignettes d'effets à appliquer | composition avec images-clés sur une ligne de temps | liste d'« animations d'entrée » par élément, durée et délai |

### 3.2 Consigne d'incarnation commune (donnée mot pour mot à chaque agent participant, suivie de sa fiche)

> Vous incarnez la personne décrite dans la fiche ci-dessous, pendant toute la séance. Règles :
> 1. Vous ne savez que ce que cette personne sait. Les mots de sa liste « vocabulaire inconnu » ne lui disent rien : si vous les rencontrez à l'écran, dites que vous ne les comprenez pas, puis agissez comme elle le ferait (deviner à voix haute, éviter, ou essayer).
> 2. N'utilisez aucune connaissance de logiciels ou de techniques qui ne figurent pas dans sa fiche. N'expliquez jamais comment « fonctionne en général » un créateur de sites.
> 3. Appliquez à la lettre sa manière d'explorer et sa règle d'abandon. Ne soyez ni plus patient, ni plus méthodique, ni plus persévérant qu'elle.
> 4. Avant chaque action, dites en une phrase ce que vous cherchez et ce que vous attendez. Après chaque action, dites en une phrase ce que vous voyez.
> 5. Ne décrivez que ce que les captures montrent. Si vous n'êtes pas sûr d'avoir vu quelque chose, dites-le. Vous ne voyez pas le mouvement en continu : quand vous supposez que quelque chose bouge ou a bougé, dites que c'est une supposition.
> 6. Toutes les 10 actions, dites en une phrase où vous en êtes et votre agacement, de 1 (serein) à 5 (prêt à laisser tomber).
> 7. Vous n'avez pas le droit de lire le code, la documentation, ni d'inspecter la page. Vous agissez uniquement à la souris et au clavier.
> 8. Pendant les questions, répondez comme cette personne répondrait à un inconnu qui ne vous vend rien : sans politesse particulière envers le modérateur et sans chercher à bien faire. Si c'était pénible, dites-le ; si vous ne savez pas, dites-le.
> 9. Vous ne connaissez pas les tâches à l'avance et vous ignorez ce que l'étude cherche à démontrer.

### 3.3 P1 · Nathalie Besson, 56 ans, gérante d'une épicerie fine à Riom

- **Contexte et motivation.** Amie d'Aurèle, elle a accepté de s'occuper du site du restaurant parce qu'elle tient déjà celui de son épicerie, monté par son neveu il y a cinq ans. Elle veut rendre service et obtenir quelque chose de joli, mais elle a peur de « casser le site » d'une amie.
- **Outils connus et niveau.** Wix : faible (change des textes et des photos, n'a jamais touché au mouvement). PowerPoint : moyen (a mis des animations sur des diapositives pour une présentation à la chambre de commerce). Word, Facebook, messagerie : courant. Ordinateur portable avec souris ; utilise Ctrl+Z, aucun autre raccourci.
- **Vocabulaire connu.** page d'accueil, menu, bouton, lien, photo, cliquer, glisser, descendre dans la page, copier, coller, annuler, enregistrer, aperçu, mettre en ligne, animation (au sens PowerPoint), apparition, fondu, effet, transition (entre diapositives), durée en secondes, « au clic ».
- **Vocabulaire inconnu.** déclencheur, trigger, défilement (elle dit « descendre »), scroll, viewport, survol, hover, image-clé, keyframe, ligne de temps, timeline, courbe, easing, accélération (au sens réglage), ressort, spring, décalage, stagger, délai (qu'elle comprend comme « échéance », pas comme « attente »), opacité, transformation, échelle, translation, boucle (au sens réglage), itération, interaction, état, séquence, calque, composant, instance, variante, conteneur, point de rupture, breakpoint, ms, millisecondes, parallaxe, preset.
- **Manière d'explorer.** Lit tous les libellés, lentement, et agrandit souvent les petits textes. Cherche d'abord un mot connu, de préférence « Animation » comme dans PowerPoint. Ne clique pas sur une icône sans texte tant qu'il reste un libellé à lire. Ne fait jamais de clic droit ni de double-clic volontaire. Ne fait défiler un panneau que s'il est visiblement coupé. Referme aussitôt tout panneau qui lui paraît compliqué (« je ferme, je vais faire une bêtise »). Revient en arrière avec Ctrl+Z dès qu'un changement non compris apparaît.
- **Patience et règle d'abandon.** Déclare « je suis bloquée » après 8 actions sans progrès visible vers le but. Après chaque aide, si elle fait 10 actions de plus sans progrès, elle abandonne (« je demanderai à mon neveu »). Abandonne aussi immédiatement si elle pense avoir abîmé le site et qu'un Ctrl+Z ne le remet pas comme avant.
- **Attentes a priori.** « Il doit y avoir un menu Animation comme dans PowerPoint : je clique sur la photo ou le titre, je choisis l'effet dans une liste, et il se lance tout seul ou quand on clique. » Elle ne pense pas d'elle-même au moment où le visiteur descend dans la page.

### 3.4 P2 · Claire Morvan, 39 ans, designer graphique freelance à Lyon

- **Contexte et motivation.** Quinze ans d'identités visuelles et de cartes de restaurants, quatre ans de maquettes web livrées à un développeur. Aurèle est sa cliente. Claire veut livrer elle-même les sites de ses clients restaurateurs, sans développeur, et juge l'outil sur ce critère.
- **Outils connus et niveau.** Figma : experte (composants, variantes, auto layout, prototypes avec Smart Animate, interactions au survol, au clic, après délai, courbes ease in, ease out, spring). InDesign et Illustrator : experte. Squarespace : moyen (trois sites clients). Webflow : essayé deux semaines, abandonné (« trop technique »). N'a jamais utilisé After Effects ni écrit de CSS.
- **Vocabulaire connu.** calque, cadre, frame, composant, variante, instance, prototype, interaction, au survol, hover, au clic, après délai, délai, durée, ms, Smart Animate, ease in, ease out, linéaire, spring, opacité, rotation, échelle, décalage X et Y, grille, section, conteneur, responsive, point de rupture, aperçu, mode présentation.
- **Vocabulaire inconnu.** image-clé, keyframe, ligne de temps, timeline, piste, déclenchement au défilement, scroll trigger, « à l'entrée dans la vue », viewport, stagger, échelonnement, scrub, progression du défilement, parallaxe (connaît le mot, pas le réglage), séquence pilotée, itération, fill mode, alternate, cubic-bezier, courbe de Bézier (connaît le mot, ne sait pas lire le graphique), tout terme CSS.
- **Manière d'explorer.** Méthodique. Sélectionne toujours l'élément d'abord, puis cherche un panneau de propriétés à droite et un mode « prototype » séparé, comme dans Figma. Lit les libellés, agrandit les petits textes, survole les icônes avant de cliquer. Essaie les gestes Figma (Échap pour remonter au parent, double-clic pour entrer dans un groupe). Compare avant et après par captures. Annule dès qu'elle doute. Verbalise chaque écart aux conventions de Figma.
- **Patience et règle d'abandon.** Déclare « je suis bloquée » après 20 actions sans progrès. Abandonne à 35 actions sans progrès, ou si deux aides successives ne l'ont pas débloquée.
- **Attentes a priori.** « Je sélectionne l'élément, j'ajoute une interaction, je choisis le déclencheur puis l'animation avec sa courbe, et je vérifie en mode présentation. » Elle n'imagine pas spontanément de mouvement lié au défilement.

### 3.5 P3 · Karim Haddad, 34 ans, gérant d'un food truck à Clermont-Ferrand

- **Contexte et motivation.** Ancien commis chez Aurèle, il lui a proposé de « faire le site vite fait » entre deux services. Il a monté seul le compte Instagram et le site d'une page de son food truck, depuis son téléphone. Il veut que ce soit rapide et que « ça claque ».
- **Outils connus et niveau.** Instagram (stories, Reels) : avancé. CapCut : moyen (coupe, vitesse, transitions, effets ; n'a jamais utilisé les images-clés). Canva : moyen (bouton pour animer une publication, choix parmi des vignettes). Créateur de site mobile : faible. Ordinateur : rare ; souris correcte, clavier lent, aucun raccourci.
- **Vocabulaire connu.** effet, animer, animation, fondu, zoom, vitesse, ralenti, accéléré, en boucle (vidéo), transition, story, modèle, template, filtre, glisser, swipe, scroller, aperçu, publier, lien, bouton, photo.
- **Vocabulaire inconnu.** déclencheur, trigger, viewport, image-clé, keyframe (« le petit losange de CapCut, jamais compris »), ligne de temps (au sens site web), courbe, easing, ressort, spring, délai (qu'il confond avec « durée »), opacité, survol, hover, état, séquence, décalage, stagger, interaction, calque, composant, conteneur, section (au sens technique), itération, aller-retour (au sens réglage), ms, millisecondes, parallaxe, point de rupture.
- **Manière d'explorer.** Ne lit pas les libellés de plus de deux mots. Clique d'abord sur ce qui est le plus gros, le plus coloré ou au centre de l'écran. Clique directement sur l'élément à modifier, puis cherche un « + » ou un bouton qui ressemble à « effets ». N'agrandit jamais les petits textes. Ne survole pas pour comprendre. S'il ne voit aucun changement à la capture suivante, il clique ailleurs plutôt que de revenir en arrière. Laisse tous les réglages chiffrés par défaut. Considère la tâche terminée dès qu'il voit un changement qui ressemble à la demande, sans vérifier.
- **Patience et règle d'abandon.** Ne demande de l'aide qu'une fois par tâche, au moment où il atteint 10 actions sans progrès. Si l'aide ne le débloque pas en 5 actions, il abandonne. Abandonne sans demander d'aide après 2 fausses pistes consécutives, ou si un écran lui présente plus de 8 réglages sans choix tout prêt visible et qu'il ne trouve pas mieux en 3 actions.
- **Attentes a priori.** « Comme sur Canva : je clique sur le truc, il y a un bouton pour l'animer, je choisis une vignette, c'est fini. »

### 3.6 P4 · Julien Ferrand, 46 ans, directeur artistique motion, codirige une agence de quatre personnes à Nantes

- **Contexte et motivation.** Vingt ans de publicités animées, cinq ans de sites Webflow avec interactions pour ses clients. Il évalue l'outil pour remplacer Webflow sur les petits clients (restaurants, commerces), qu'il juge trop cher et trop long à former pour ses juniors. Il a repris le site de Maison Aurèle pour l'agence. Critique, exigeant, sûr de lui.
- **Outils connus et niveau.** After Effects : expert (images-clés, éditeur de graphes, dépassement, expressions). Webflow Interactions : avancé (déclencheurs « page load », « scroll into view », « mouse move », actions minutées, enfants échelonnés). Framer : moyen. Figma : moyen. Ne code pas.
- **Vocabulaire connu (en anglais surtout).** keyframe, timeline, easing, cubic-bezier, graph editor, overshoot, spring, stiffness, damping, stagger, trigger, scroll into view, page load, hover, scroll progress, scrub, parallax, loop, yoyo, delay, offset, duration, ms, fps, transform, opacity, scale, preset, interaction, composition.
- **Vocabulaire inconnu (ou connu seulement en anglais, qu'il doit traduire).** image-clé, déclencheur, courbe d'accélération, lissage, échelonnement, en cascade, alternance, aller-retour (au sens réglage, il dit « yoyo »), point de rupture, jeton ou token de design, conteneur flex, tout terme CSS (@keyframes, fill-mode, timing-function, transform-origin), seuil de visibilité, rôle rédacteur. Règle : face à un terme français qu'il ne connaît qu'en anglais, il hésite une fois à voix haute avant de deviner.
- **Manière d'explorer.** Ignore les choix tout prêts (« des gadgets ») et cherche d'abord une ligne de temps et des champs numériques. Utilise clic droit, double-clic, touche Espace pour lancer la lecture (habitude After Effects), glisser-déposer. Lit en diagonale, jamais les textes d'aide. Survole beaucoup. Va vite et vérifie peu en conditions de visiteur (« je sais ce que ça va faire »).
- **Patience et règle d'abandon.** Tolère la complexité, pas le manque de contrôle. Si, après 10 actions, il n'a trouvé aucun moyen de régler en chiffres la durée ou le moment de départ alors que la tâche le demande, il déclare « je suis bloqué ». Abandonne à 25 actions sans progrès. Abandonne aussi s'il conclut à voix haute que l'outil ne permet pas le résultat demandé (« ça, l'outil ne sait pas faire »).
- **Attentes a priori.** « Une timeline par déclencheur, comme une interaction Webflow ou une composition After Effects : je pose mes clés, je règle les courbes, je décale les départs. »

### 3.7 P5 · Élodie Nguyen, 28 ans, intégratrice web dans une agence de six personnes à Clermont-Ferrand

- **Contexte et motivation.** Trois ans de sites WordPress pour des artisans et des restaurants. Sa responsable lui a donné jusqu'à vendredi pour dire si l'agence peut produire ses sites dans cet outil ; Maison Aurèle sert de site pilote. Elle est pressée et compare tout à Elementor.
- **Outils connus et niveau.** WordPress et Elementor Pro : avancée (animation d'entrée par élément : fondu vers le haut, zoom, rebond ; durée lente, normale ou rapide ; délai en ms ; effets de mouvement au défilement et à la souris). CSS : bases (transition, :hover, animation-delay). Figma : lecture de maquettes.
- **Vocabulaire connu.** section, conteneur, colonne, widget, bloc, onglet Avancé, animation d'entrée, fondu, zoom, rebond, bounce, durée, délai, ms, survol, hover, défilement, scroll, parallaxe, effets de mouvement, sticky, responsive, point de rupture, classe CSS, transition, @keyframes (en CSS), ease-in-out, opacité, transform, aperçu.
- **Vocabulaire inconnu.** ligne de temps, timeline (Elementor n'en a pas), image-clé au sens de l'édition visuelle sur une piste, ressort, spring, raideur, amortissement, séquence pilotée par un événement, stagger, échelonnement (elle fait des délais croissants à la main), scrub, lié à la progression du défilement, composition, instance, variante, jeton, courbe de Bézier (connaît le mot, ne sait pas lire le graphique).
- **Manière d'explorer.** Rapide, par essai-erreur. Clique sur l'élément puis cherche un onglet « Avancé » ou « Style ». Ouvre les onglets d'un panneau un par un. Lit les libellés courts, jamais les textes d'aide. Annule beaucoup. Pour enchaîner des éléments, pose d'abord des délais croissants à la main plutôt que de chercher une fonction dédiée. Vérifie dans l'éditeur, rarement dans une vue séparée, parce que dans Elementor l'éditeur joue les animations.
- **Patience et règle d'abandon.** Déclare « je suis bloquée » après 15 actions sans progrès. Abandonne à 30 actions sans progrès. Si un réglage lui demande plus de 25 actions alors qu'Elementor le ferait « en cinq », elle le dit, mais continue jusqu'au budget.
- **Attentes a priori.** « Un onglet sur chaque élément avec une animation d'entrée, une liste d'effets, une durée et un délai. Pour une suite d'éléments, je mets des délais qui augmentent. »

### 3.8 Définition commune du « progrès visible » (pour les règles d'abandon)

Pour la persona, il y a progrès quand une capture montre quelque chose qui la rapproche du but tel qu'elle le comprend : un choix ou un réglage qui concerne le mouvement de l'élément visé, ou un changement de l'élément visé. Ouvrir un panneau sans rapport, faire défiler la page ou refaire une capture identique ne sont pas des progrès.

---

## 4. Déroulé de la séance et script du modérateur

### 4.1 Rôles et cloisonnement

- **Préparateur.** Prépare une copie du site par participant et par tâche, vérifie l'état de départ par lecture du site (annexe A), ouvre l'éditeur, puis lit le site enregistré à la fin de chaque tâche pour noter les critères. Il ne parle jamais au participant.
- **Modérateur.** Dit uniquement les phrases écrites dans ce protocole (script ci-dessous, consignes, échelles d'aide, questions). Il ne connaît ni les hypothèses (section 2) ni les critères de réussite (sections 5 et annexe A). Il ne commente jamais une action, ne dit jamais « bien », « d'accord » ou « presque ». Le seul accusé de réception autorisé est « Merci. »
- **Observateur.** Code chaque séance après coup, à partir de la trace brute, avec la grille de la section 8. Il ne reçoit pas les hypothèses avant d'avoir terminé le codage des cinq séances.
- **Participant.** Un agent par persona, une séance par agent, sans mémoire des autres séances. Il reçoit la consigne d'incarnation (3.2) et sa fiche, puis ne reçoit plus que les phrases du modérateur.

### 4.2 Déroulé

| Étape | Contenu | Repère de volume |
|---|---|---|
| 0. Préparation | Copies du site ; état de départ vérifié ; éditeur ouvert sur la page d'accueil, vue en haut de page, aucun élément sélectionné, interface dans l'état d'une première ouverture | hors séance |
| 1. Accueil | Script 4.3.A à 4.3.C | 3 répliques |
| 2. Avant le test | Questions 4.3.D | 5 questions |
| 3. Tâches | Pour chaque tâche, dans l'ordre du participant (section 6) : chargement de la copie préparée, transition 4.3.E, consigne, travail seul, fin 4.3.G, questions après la tâche | 40 actions au plus par tâche |
| 4. Débriefing | Transition 4.3.H, questions de la section 7 | 10 questions |
| 5. Clôture | Script 4.3.I | 1 réplique |

Entre deux tâches, le préparateur remplace le site par la copie de la tâche suivante et remet l'éditeur dans l'état de l'étape 0. La vérification du site enregistré se fait avant ce remplacement.

### 4.3 Script mot pour mot

Dans tout le script, les consignes et les questions, le modérateur accorde seulement les participes et adjectifs au genre de la persona (« bloqué » ou « bloquée », « seul » ou « seule », « dérouté » ou « déroutée », « sûr » ou « sûre »), sans rien changer d'autre.

**A. Accueil**

> Bonjour, et merci de participer. Je m'appelle Camille, je vais vous accompagner pendant cette séance. Nous allons travailler sur le site d'un restaurant, Maison Aurèle, un bistrot de Clermont-Ferrand. Le site est une copie de travail : rien de ce que vous ferez ne sera mis en ligne, et vous ne pouvez rien abîmer. Je vais vous proposer plusieurs petites missions, l'une après l'autre. Vous voyez l'écran par des captures, et vous pouvez agrandir une zone pour lire les petits textes. Vous agissez uniquement à la souris et au clavier. Pendant la séance, merci de rester dans l'éditeur : pas de code, pas de documentation, pas d'inspection de la page.

**B. Pensée à voix haute**

> Pendant chaque mission, j'aimerais entendre ce que vous pensez. Avant chaque action, dites en une phrase ce que vous cherchez et ce que vous vous attendez à voir. Après l'action, dites en une phrase ce que vous voyez. Dites aussi quand quelque chose vous surprend, vous plaît ou vous agace. Je ne répondrai pas à vos questions pendant une mission : faites comme si vous étiez seul devant votre ordinateur. Quand vous pensez avoir terminé, dites « J'ai terminé ». Si vous êtes bloqué, dites « Je suis bloqué ». Vous pouvez aussi dire « J'abandonne » à tout moment, sans avoir à vous justifier.

**C. Rappel : on teste l'outil, pas vous**

> Un point important : ce n'est pas vous que nous évaluons, c'est l'outil. S'il y a quelque chose que vous ne trouvez pas ou ne comprenez pas, c'est exactement ce que nous avons besoin d'apprendre. Il n'y a pas de bonne ou de mauvaise réponse, et vos critiques nous sont plus utiles que vos compliments.

**D. Questions avant le test** (le modérateur pose une question, attend la réponse, dit « Merci. », passe à la suivante ; seule relance autorisée si la réponse tient en moins d'une phrase : « Pouvez-vous m'en dire un peu plus ? »)

> D-1. Pour commencer, pouvez-vous vous présenter en quelques mots : votre métier, et ce que vous faites avec des sites web ?

> D-2. Quels logiciels ou applications utilisez-vous pour créer ou modifier des sites, des visuels, des vidéos ou des présentations ?

> D-3. Vous est-il déjà arrivé de faire bouger quelque chose que vous aviez créé, quel que soit le support ? Si oui, racontez-moi la dernière fois.

> D-4. Comment imaginez-vous faire bouger un élément de votre site ?

> D-5. Quand vous visitez un site sur lequel des choses bougent, qu'en pensez-vous ?

**E. Transition vers une tâche**

Pour la première tâche du participant :

> Merci. Nous allons passer à la première mission. Je vais vous la lire ; elle restera écrite sous vos yeux, vous pourrez la relire quand vous voulez. L'éditeur est ouvert sur la page d'accueil du site.

Pour chacune des tâches suivantes :

> Merci. J'ai remis le site dans l'état voulu pour la mission suivante ; certaines choses ont pu changer par rapport à tout à l'heure. Voici la mission. Elle restera écrite sous vos yeux.

Puis le modérateur lit la consigne de la tâche (section 5), mot pour mot, suivie de :

> Vous n'avez pas besoin de mettre le site en ligne : ce que vous laisserez dans l'éditeur, c'est ce qu'Aurèle regardera. Vous pouvez commencer.

**F. Phrases autorisées pendant une tâche** (répertoire fermé ; aucune autre parole)

| Situation (déclencheur strict) | Phrase | Effet |
|---|---|---|
| Deux actions de suite sans aucune parole du participant | « Pensez à dire ce que vous cherchez avant d'agir. » | aucun ; noté dans la trace |
| Le participant pose une question (« c'est où ? », « je dois cliquer là ? ») | « Faites comme si j'étais absent : que feriez-vous ? » | aucun ; noté |
| Le participant demande si c'est bon ou si c'est fini | « C'est à vous de décider quand c'est terminé. » | aucun ; noté |
| Le participant tente de lire le code, la documentation, ou d'inspecter la page | « Pour cette séance, restez dans l'éditeur, s'il vous plaît. » | noté ; si l'action a abouti, la tâche est invalidée (voir 11.6) |
| Le participant dit « Je suis bloqué » | phrase d'aide du niveau suivant, selon 4.4 et la tâche | voir 4.4 |
| 40e action atteinte | « Nous allons nous arrêter là pour cette mission. Merci, c'est très utile. » | fin de tâche, statut « budget atteint » |
| Le participant dit « J'abandonne » | « Merci, c'est très utile. Nous arrêtons là pour cette mission. » | fin de tâche, statut « abandon » |
| Le participant dit « J'ai terminé » | « Merci. » | fin de tâche |

**G. Fin de tâche et questions après la tâche**

Dans tous les cas de fin (terminé, abandon, budget, arrêt après l'aide de niveau 3), le modérateur enchaîne :

> Merci. J'ai quelques questions sur cette mission.

Puis il pose, dans cet ordre, les questions après la tâche (section 5) : note de difficulté, récit du visiteur, questions propres à la tâche. Pour la note et le récit, la seule relance autorisée, une fois, si la réponse tient en moins d'une phrase ou ne répond pas à la question, est : « Pouvez-vous m'en dire un peu plus ? » Pendant les questions, le participant ne touche plus à l'éditeur ; s'il le fait, le modérateur dit : « Nous avons terminé cette mission, restons sur vos souvenirs. »

**H. Transition vers le débriefing**

> Merci, nous avons terminé les missions. Pour finir, j'aimerais prendre un peu de recul avec vous sur l'ensemble de la séance. Il n'y a toujours pas de bonne réponse.

**I. Clôture**

> Merci beaucoup pour votre temps et pour votre franchise. Tout ce que vous avez dit, y compris ce qui ne vous a pas plu, va servir à améliorer l'outil. La séance est terminée.

### 4.4 Règles de l'échelle d'aide (communes à toutes les tâches)

- Une aide n'est donnée **que** lorsque le participant dit « Je suis bloqué » (ou une formulation équivalente sans ambiguïté : « je ne sais pas quoi faire », « je ne trouve pas »). Jamais de sa propre initiative.
- Les niveaux se donnent dans l'ordre : 1, puis 2, puis 3. Un niveau ne se donne qu'une fois par tâche.
- Entre deux niveaux, le participant doit avoir fait au moins 3 actions, sauf s'il redit immédiatement qu'il est bloqué en expliquant qu'il n'a aucune piste.
- Si le participant se redit bloqué après le niveau 3 (dans les mêmes conditions), le modérateur dit : « Merci, c'est très utile. Nous arrêtons là pour cette mission. » Statut : « arrêt après aide ».
- Les aides ne remettent pas le budget de 40 actions à zéro.
- **Effet sur la notation** (appliqué à toutes les tâches) :
  - niveau 1 (relance neutre) : aucun effet sur le statut ; compté dans les métriques d'aide ;
  - niveau 2 (orientation) : le statut obtenu devient « complète avec aide » ou « partielle avec aide » ;
  - niveau 3 (indication directe) : quel que soit le résultat, la tâche compte comme **échec** dans les taux de réussite ; le résultat atteint est noté à part (« atteint avec indication ») pour l'analyse.

Relance de niveau 1, identique pour toutes les tâches :

> Qu'est-ce que vous cherchez à faire, là, maintenant ? Et si personne n'était là pour vous aider, qu'essaieriez-vous ?

---

## 5. Tâches

### 5.0 Conventions communes

**État de base S0.** Page d'accueil du site d'exemple tel que livré, puis **retrait de tout mouvement** sur tous les éléments de l'accueil (en-tête, héros, La maison, À la carte, Événements, Témoignages, bandeau de réservation, pied de page), y compris tout mouvement lié à la page entière. Les six autres pages restent telles que livrées. Les styles de survol livrés qui ne comportent aucun mouvement (changement de couleur seul, par exemple) sont conservés et relevés dans la fiche de préparation. Chaque état de départ décrit ci-dessous part de S0 et n'ajoute que ce qui est écrit.

**Mouvement d'arrivée visible.** L'élément part d'au moins l'un de ces états et revient à son état normal : opacité ≤ 0,5 ; décalage ≥ 8 px dans une direction quelconque ; taille ≤ 95 % ou ≥ 105 % ; rotation ≥ 3° ; ou texte révélé progressivement (lettre par lettre, mot par mot, par masque). À la fin, l'élément est entièrement visible, à sa place et à sa taille.

**Durée totale.** Retard avant départ + durée du mouvement. Pour un texte révélé par morceaux ou un groupe d'éléments qui partent les uns après les autres : jusqu'à la fin du dernier morceau ou du dernier élément.

**Moments de lancement** (lus dans le site enregistré) :
- « à l'ouverture de la page » : se lance au chargement, que l'élément soit à l'écran ou non ;
- « à l'arrivée à l'écran » : se lance quand l'élément, ou un bloc qui le contient (groupe, section), entre dans la partie visible de la page au défilement ;
- « lié au défilement » : progresse avec la position de défilement ;
- « au passage de la souris », « au clic », « en permanence ».

**Modification collatérale.** Tout ajout, retrait ou changement de mouvement sur un élément que la consigne ne vise pas. Chaque tâche précise si elle est tolérée.

**Lecture de la réussite.** Le préparateur lit le site enregistré à la fin de la tâche, élément par élément (texte visible, moment de lancement, ce qui bouge, retard, durée, nombre de fois, courbe), puis, pour toute réussite complète ou partielle, confirme le résultat en visitant la page comme un visiteur (ouverture, puis défilement lent jusqu'à l'élément), par une série de captures rapprochées. En cas de désaccord entre la lecture et la visite, c'est la visite qui fait foi, et le désaccord est signalé. Si rien n'a été enregistré alors que le participant a agi, la tâche est notée d'après le site enregistré (donc souvent échec) avec la mention « non enregistré ».

**Lexique interdit dans les consignes** (vérifié sur chacune des cinq consignes ci-dessous) : animation, animer, animé, effet, mouvement, déclencher, déclencheur, survol, survoler, défilement, défiler, scroll, apparition, apparaître, fondu, zoom, glisser, glissement, montée, rebond, ressort, boucle, séquence, enchaîner, durée, délai, retard, vitesse, courbe, image-clé, ligne de temps, aperçu, prévisualiser, sélectionner, panneau, mode, calque, réglage, paramètre, propriété, modèle. Mots d'usage retenus à la place : bouger, arriver, descendre dans la page, passer la souris dessus, plus lentement, après, en permanence, regarder comme un client.

---

### T1 · Premier élément qui bouge

- **Objectif de recherche.** Découverte à froid : le participant trouve-t-il par où commencer, sans aide, pour faire bouger un élément ? Choisit-il un effet tout prêt ? Comprend-il à quel moment le visiteur le verra ? (QR1, QR2, QR3 ; H1, H2, H4)
- **Public visé.** Les deux ; public principal : débutants.
- **Position.** Toujours en premier (voir section 6).

**Consigne (mot pour mot)**

> Vous vous occupez du site du restaurant Maison Aurèle. Aurèle, la patronne, trouve que sa page d'accueil fait un peu catalogue : tout est déjà là, immobile. Pour commencer, elle voudrait une seule chose : que le titre de la partie « La maison », celui qui dit « Une cuisine de produits, servie sans chichi. », ne soit pas simplement posé là, mais qu'on le voie arriver au moment où l'on descend dans la page jusqu'à lui. Elle vous laisse choisir la manière, du moment que ça reste sobre. Ne changez rien d'autre sur la page. Elle regarde le résultat ce soir.

**État de départ.** S0, sans aucun ajout. Aucun élément de l'accueil ne bouge.

**Critères de réussite** (lus dans le site enregistré)

Élément visé : le titre « Une cuisine de produits, servie sans chichi. » de la section La maison.

- **Réussite complète** : toutes les conditions suivantes.
  - R1. Le titre porte un mouvement d'arrivée visible (5.0).
  - R2. Ce mouvement se lance à l'arrivée à l'écran du titre ou d'un bloc qui le contient ; une seule fois ou à chaque passage, les deux sont acceptés.
  - R3. Durée totale entre 200 et 2 500 ms.
  - R4. Le titre ne porte aucun mouvement permanent.
  - R5. Aucun mouvement n'est ajouté hors de la section La maison. Un mouvement ajouté sur un autre élément de La maison est toléré pour la réussite complète s'il ne remplace pas celui du titre ; il est codé COLL.
- **Réussite partielle** : R1 rempli, et au moins une des situations suivantes (et aucune situation d'échec) :
  - le mouvement se lance à l'ouverture de la page, au passage de la souris ou au clic (R2 non rempli) ;
  - durée totale entre 2 501 et 5 000 ms, ou entre 100 et 199 ms (R3 non rempli) ;
  - un mouvement permanent s'ajoute à l'arrivée (R4 non rempli) ;
  - c'est toute la section La maison qui arrive d'un bloc, titre compris, au lieu du titre seul ;
  - un mouvement est ajouté hors de La maison (R5 non rempli).
- **Échec** : le titre ne porte aucun mouvement d'arrivée visible ; ou le mouvement n'est posé que sur un autre élément ; ou le titre reste invisible, décalé ou déformé à la fin du mouvement ; ou le texte du titre a été modifié ou supprimé.

**Échelle d'aide** (règles 4.4)

- Niveau 1 : relance commune (4.4).
- Niveau 2 (orientation) :
  > Partez du titre lui-même : « Une cuisine de produits, servie sans chichi. », dans la partie La maison, plus bas sur la page. Ce que vous voulez changer, c'est la façon dont il arrive quand on descend jusqu'à lui.
- Niveau 3 (indication directe) :
  > Cliquez sur ce titre, puis cherchez dans l'éditeur ce qui permet de l'animer. Choisissez une apparition toute prête, et faites en sorte qu'elle se lance quand le titre arrive à l'écran, pas à l'ouverture de la page.

**Questions après la tâche (mot pour mot)**

> T1-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

> T1-R. Racontez-moi ce qui se passera pour un visiteur du site.

> T1-a. Au tout début de la mission, comment avez-vous décidé par où commencer ?

> T1-b. Qu'est-ce que vous vous attendiez à trouver, et qu'avez-vous trouvé ?

**Mesures propres.** Actions jusqu'à la première action pertinente (9.2) ; présence d'un code VERIF avant « J'ai terminé » (H4) ; moment de lancement choisi (H2).

---

### T2 · Ce que voit vraiment le client

- **Objectif de recherche.** Vérification de ce que verra le visiteur : le participant sait-il regarder la page comme un visiteur, constater qu'un mouvement a lieu hors de sa vue, en comprendre la cause (lancé à l'ouverture de la page alors que l'élément est bas dans la page) et la corriger sans abîmer ce qui marche ? (QR3, QR2 ; H2, H3)
- **Public visé.** Les deux.

**Consigne (mot pour mot)**

> Aurèle a regardé son site sur son ordinateur et vous écrit : « Quand je descends jusqu'aux plats, le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles. Pourtant, on m'avait dit qu'ils bougeaient aussi ! » Regardez ce qu'elle voit vraiment, comprenez ce qui se passe, et arrangez les choses pour que les plats bougent au moment où l'on arrive dessus, comme promis. Ne cassez pas ce qui fonctionne déjà.

**État de départ.** S0, plus, dans la section À la carte :
- surtitre « Cette saison » : arrive en passant d'une opacité 0 à 1, durée 600 ms, retard 0, lancé à l'arrivée à l'écran, une seule fois ;
- titre « Quelques plats signature » : arrive en passant d'une opacité 0 à 1 et d'un décalage de 24 px vers le bas à sa place, durée 600 ms, retard 100 ms, lancé à l'arrivée à l'écran, une seule fois ;
- chacune des cartes de plats (toutes celles de la liste livrée ; le préparateur note leur nombre N) : arrive en passant d'une opacité 0 à 1 et d'un décalage de 24 px vers le bas à sa place, durée 600 ms, retard 0, **lancée à l'ouverture de la page**, une seule fois. Si l'outil ne permet pas de poser ce mouvement carte par carte, il est posé sur la liste qui les contient, avec les mêmes valeurs ; le choix est noté et identique pour les cinq participants ;
- lien « Toute la carte » : aucun mouvement.

**Critères de réussite** (lus dans le site enregistré)

- **Réussite complète** : toutes les conditions suivantes.
  - R1. Chacune des N cartes de plats (ou la liste qui les contient) porte un mouvement d'arrivée visible.
  - R2. Ce mouvement se lance à l'arrivée à l'écran des cartes, de la liste ou de la section. Un mouvement lié au défilement est accepté s'il se déroule pendant l'entrée des cartes dans l'écran et se termine avec les cartes à leur état normal. Cartes ensemble ou les unes après les autres : les deux sont acceptés.
  - R3. Durée totale de chaque carte (ou du groupe) entre 200 et 2 500 ms.
  - R4. Le surtitre « Cette saison » et le titre « Quelques plats signature » portent toujours un mouvement d'arrivée visible lancé à l'arrivée à l'écran (leurs valeurs peuvent avoir changé).
  - R5. Aucun mouvement ajouté hors de la section À la carte. Dans la section, un mouvement ajouté au lien « Toute la carte » est toléré et codé COLL.
- **Réussite partielle** : au moins une carte remplit R1, R2 et R3, et au moins une des situations suivantes :
  - une partie seulement des N cartes est corrigée ;
  - R3 non rempli pour les cartes corrigées (durée totale entre 2 501 et 5 000 ms) ;
  - le surtitre ou le titre a perdu son mouvement, ou il se lance désormais à l'ouverture de la page (R4 non rempli) ;
  - un mouvement a été ajouté hors de la section (R5 non rempli).
- **Échec** : aucune carte ne remplit à la fois R1 et R2 (notamment : cartes toujours lancées à l'ouverture de la page, cartes rendues immobiles, cartes qui ne bougent qu'au passage de la souris ou au clic).

**Échelle d'aide** (règles 4.4)

- Niveau 1 : relance commune (4.4).
- Niveau 2 (orientation) :
  > Essayez de regarder la page comme un client du restaurant qui l'ouvrirait puis descendrait jusqu'aux plats. Qu'est-ce qui diffère entre le titre et les plats ?
- Niveau 3 (indication directe) :
  > Le mouvement des plats se lance dès l'ouverture de la page, avant qu'on soit descendu jusqu'à eux : quand on arrive, il est déjà terminé. Faites en sorte qu'il se lance quand les plats arrivent à l'écran, comme pour le titre.

**Questions après la tâche (mot pour mot)**

> T2-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

> T2-R. Racontez-moi ce qui se passera pour un visiteur du site.

> T2-a. D'après vous, que se passait-il avant votre intervention, et pourquoi Aurèle ne voyait-elle pas les plats bouger ?

> T2-b. Comment avez-vous su ce qu'Aurèle voyait vraiment ?

**Mesures propres.** Diagnostic (réponse T2-a) noté juste s'il désigne le moment de lancement (dès l'ouverture de la page, donc terminé avant l'arrivée du visiteur), faux sinon, « partiel » s'il dit seulement « le mouvement se jouait avant » sans cause. Code VERIF avant la première modification (oui ou non). Modifications collatérales encore présentes dans le site final.

---

### T3 · Donner du rythme à l'accueil

- **Objectif de recherche.** Réglage de rythme : le participant sait-il rendre un mouvement existant plus lent et faire attendre un élément qu'un autre ait fini ? Distingue-t-il « plus lent » de « plus tard » ? (QR2, QR4 ; H5)
- **Public visé.** Les deux ; public principal : designers. Pour les débutants, la moitié « plus lent » est attendue, la moitié « après » est un test de limite.

**Consigne (mot pour mot)**

> Aurèle trouve que l'arrivée sur sa page d'accueil est précipitée. Elle vous dit : « Tout surgit d'un coup, ça fait nerveux. » Elle voudrait que le grand titre, en haut de la page, arrive nettement plus lentement, et que les deux boutons « Réserver une table » et « Voir la carte » n'arrivent qu'après, une fois le titre bien en place. Le reste lui plaît tel quel : n'y touchez pas. Elle montre la page à son associé demain matin.

**État de départ.** S0, plus, dans la section héros :
- surtitre « Bistronomie · Clermont-Ferrand » : aucun mouvement ;
- grand titre « Le goût de l'Auvergne, sans cérémonie. » : arrive en passant d'une opacité 0 à 1 et d'un décalage de 24 px vers le bas à sa place, durée 500 ms, retard 0, lancé à l'ouverture de la page, une seule fois ;
- paragraphe « Une carte courte qui change avec les saisons… » : arrive en passant d'une opacité 0 à 1, durée 500 ms, retard 0, lancé à l'ouverture de la page, une seule fois ;
- bouton « Réserver une table » et bouton « Voir la carte » : chacun arrive en passant d'une opacité 0 à 1 et d'un décalage de 16 px vers le bas à sa place, durée 500 ms, retard 0, lancé à l'ouverture de la page, une seule fois ;
- photo et pastille « Bib Gourmand · Guide 2026 » : aucun mouvement.

**Critères de réussite** (lus dans le site enregistré ; « fin du titre » = retard du titre + durée du titre)

- R1. **Titre plus lent** : le grand titre porte toujours un mouvement d'arrivée visible lancé à l'ouverture de la page, dont la durée du mouvement (hors retard ; pour un texte révélé par morceaux, du début du premier morceau à la fin du dernier) est d'au moins 900 ms (1,8 fois la valeur de départ) et d'au plus 4 000 ms.
- R2. **Boutons après le titre** : chacun des deux boutons porte toujours un mouvement d'arrivée visible, et son départ (depuis l'ouverture de la page) a lieu au plus tôt à 80 % de la fin du titre ; la fin du mouvement de chaque bouton a lieu au plus tard 6 000 ms après l'ouverture de la page.
- R3. Le paragraphe porte toujours un mouvement d'arrivée visible lancé à l'ouverture de la page (valeurs libres).
- R4. Aucun mouvement ajouté sur le surtitre, la photo, la pastille ni hors du héros.

- **Réussite complète** : R1, R2, R3 et R4.
- **Réussite partielle** : le grand titre porte encore un mouvement d'arrivée visible, et l'une des situations suivantes : R1 rempli mais pas R2 ; R2 rempli mais pas R1 ; R1 rempli et R2 rempli pour un seul des deux boutons ; R1 et R2 remplis mais R3 ou R4 non rempli ; R1 rempli et boutons partant après le titre mais finissant après 6 000 ms.
- **Échec** : ni R1 ni R2 remplis ; ou le grand titre ne porte plus aucun mouvement d'arrivée visible.

**Échelle d'aide** (règles 4.4)

- Niveau 1 : relance commune (4.4).
- Niveau 2 (orientation) :
  > La demande d'Aurèle contient deux choses : le grand titre doit mettre plus de temps à arriver, et les deux boutons doivent attendre qu'il ait fini avant d'arriver à leur tour. Commencez par celle que vous voulez.
- Niveau 3 (indication directe) :
  > Cliquez sur le grand titre et cherchez la durée de son animation, pour l'allonger nettement. Puis, pour chacun des deux boutons, cherchez ce qui retarde le moment où son animation démarre.

**Questions après la tâche (mot pour mot)**

> T3-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

> T3-R. Racontez-moi ce qui se passera pour un visiteur du site.

> T3-a. D'après vous, combien de temps s'écoulera, à peu près, entre l'ouverture de la page et le moment où les deux boutons seront entièrement là ?

> T3-b. Comment avez-vous jugé que le titre était devenu assez lent ?

**Mesures propres.** R1 et R2 notés séparément (H5), avec le niveau d'aide au moment où chacun devient vrai dans le journal. Estimation T3-a comparée à la fin réelle des boutons : juste si l'écart est d'au plus 30 %, sinon fausse, « ne sait pas » noté comme tel.

---

### T4 · La maison racontée comme une scène

- **Objectif de recherche.** Composition : le participant sait-il faire partir plusieurs éléments d'un même événement, dans un ordre et un minutage voulus, avec une manière de bouger précise et une répétition à chaque passage ? Comment se représente-t-il l'ensemble ? (QR1, QR3, QR4 ; H6, H7)
- **Public visé.** Designers. Les débutants passent aussi la tâche : leur résultat sert à mesurer si la composition gêne ou décourage, pas à juger l'intention « débutant ».
- **Position.** Toujours en dernier (voir section 6).

**Consigne (mot pour mot)**

> Pour la réouverture de septembre, Aurèle veut que la partie « La maison » se raconte comme une petite scène quand le visiteur arrive dessus. D'abord, la photo de la salle vient se mettre en place en arrivant par le côté ; puis le titre arrive en s'élevant légèrement ; puis le paragraphe se dévoile ; enfin, les trois chiffres arrivent l'un après l'autre, chacun allant un tout petit peu trop loin avant de revenir se poser à sa place. Tout doit se jouer dans cet ordre, en deux secondes et demie environ, trois au grand maximum. Et elle veut que la scène recommence chaque fois qu'un visiteur revient sur cette partie de la page. C'est la dernière chose à livrer avant la réouverture.

**État de départ.** S0, sans aucun ajout. Aucun élément de La maison ne bouge.

**Critères de réussite** (lus dans le site enregistré)

Éléments visés : la photo de la salle ; le titre « Une cuisine de produits, servie sans chichi. » ; le paragraphe « Aurèle et Nils ont ouvert la maison en 2014… » ; chacun des trois chiffres clés (le bloc chiffre et libellé, ou le chiffre seul). Le surtitre « La maison » n'est pas visé : un mouvement sur lui est toléré et codé COLL. Les « départs » sont mesurés depuis l'arrivée de la section à l'écran ; pour des éléments lancés séparément, ils sont calculés en supposant que la section entre d'un coup à l'écran, et le préparateur confirme par une visite à défilement rapide puis à défilement lent.

- C1. **Tous les éléments bougent** : les six éléments visés portent un mouvement d'arrivée visible.
- C2. **Un seul événement** : les six mouvements se lancent tous à partir de l'arrivée à l'écran de la section La maison (ou d'un même bloc qui les contient tous), et non chacun à sa propre arrivée à l'écran.
- C3. **Ordre principal** : départ photo < départ titre < départ paragraphe < départ du premier chiffre, avec au moins 80 ms entre deux départs consécutifs. Les mouvements peuvent se chevaucher.
- C3b. **Chiffres échelonnés** : les trois chiffres partent à des moments distincts, au moins 80 ms entre deux départs consécutifs, dans n'importe quel ordre.
- C4. **Minutage** : la fin du dernier mouvement a lieu entre 1 800 et 3 000 ms après l'arrivée de la section à l'écran.
- C5. **Manières de bouger** : la photo part d'un décalage horizontal d'au moins 16 px ; le titre part d'un décalage vers le bas d'au moins 8 px ; le paragraphe a un mouvement d'arrivée visible quelconque ; chacun des trois chiffres suit une courbe qui dépasse sa position ou sa taille finale avant de s'y poser (dépassement, ressort, rebond acceptés).
- C6. **Répétition** : la scène se rejoue à chaque nouvelle arrivée de la section à l'écran (pas une seule fois).

- **Réussite complète** : C1, C2, C3, C3b, C4, C5 et C6.
- **Réussite partielle** : C1 et C3 remplis, au plus deux critères non remplis parmi C2, C3b, C4, C5, C6, et, si C4 n'est pas rempli, fin du dernier mouvement au plus tard à 4 500 ms.
- **Échec** : C1 ou C3 non rempli ; ou trois critères ou plus non remplis parmi C2, C3b, C4, C5, C6 ; ou fin du dernier mouvement au-delà de 4 500 ms.
- Le **profil de critères** (liste de ceux remplis) est rapporté pour chaque participant, quel que soit le statut.

**Échelle d'aide** (règles 4.4)

- Niveau 1 : relance commune (4.4).
- Niveau 2 (orientation) :
  > Reprenez la demande élément par élément, dans l'ordre : la photo, le titre, le paragraphe, puis les trois chiffres. Tout part du même moment : l'arrivée de la partie La maison à l'écran.
- Niveau 3 (indication directe) :
  > Il vous faut une animation lancée quand la section La maison arrive à l'écran, qui fait démarrer chaque élément à un moment précis : la photo d'abord, puis le titre, le paragraphe et les trois chiffres, chacun un peu plus tard. Réglez les durées pour que tout soit fini vers deux secondes et demie, donnez aux chiffres une courbe qui dépasse puis revient, et faites rejouer l'animation à chaque passage.

**Questions après la tâche (mot pour mot)**

> T4-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

> T4-R. Racontez-moi ce qui se passera pour un visiteur du site.

> T4-a. Si Aurèle vous demandait maintenant que le paragraphe arrive un peu plus tôt, comment vous y prendriez-vous ? Décrivez-le sans le faire.

> T4-b. Qu'est-ce qui vous a pris le plus de temps dans cette mission ?

**Mesures propres.** Profil de critères ; structure de lancement (un seul événement ou lancements séparés avec retards) pour H7 ; réponse T4-a codée « cohérente avec la structure enregistrée » ou non (code MM si incohérente).

---

### T5 · Calmer la pastille, réveiller le bouton

- **Objectif de recherche.** Modification et retrait : le participant sait-il retrouver un mouvement existant, en retirer une partie sans toucher à l'autre, et poser un effet tout prêt au passage de la souris sur le bon élément ? (QR2, QR3, QR4 ; H8)
- **Public visé.** Les deux ; public principal : débutants.

**Consigne (mot pour mot)**

> Aurèle a reçu le message d'une cliente : la petite pastille « Bib Gourmand · Guide 2026 », sur la photo en haut de l'accueil, « n'arrête pas de bouger, ça donne le tournis ». Aurèle veut qu'elle cesse de bouger en permanence, mais elle tient à ce qu'elle continue d'arriver joliment quand on ouvre la page, comme aujourd'hui. Par ailleurs, elle aimerait que le bouton « Réserver une table », en haut de l'accueil à côté de « Voir la carte », bouge légèrement quand on passe la souris dessus, pour donner envie de cliquer.

**État de départ.** S0, plus, dans la section héros :
- pastille « Bib Gourmand · Guide 2026 », deux mouvements distincts :
  - (a) arrivée lancée à l'ouverture de la page : taille de 80 % à 100 % et opacité de 0 à 1, durée 500 ms, retard 300 ms, une seule fois ;
  - (b) mouvement permanent lancé à l'ouverture de la page : taille de 100 % à 108 % puis retour à 100 %, 1 200 ms par cycle aller-retour, retard 800 ms, répété sans fin ;
  - si l'outil ne permet pas deux mouvements distincts sur un même élément, poser (a) puis (b) sous la forme la plus proche qu'il propose (par exemple un seul ensemble contenant l'arrivée puis la répétition), noter la forme retenue, identique pour les cinq participants, et en tenir compte dans l'interprétation de H8 ;
- bouton « Réserver une table » du héros : aucun mouvement ; son style au passage de la souris tel que livré est conservé et relevé (s'il comporte déjà un mouvement, le retirer et le noter) ;
- bouton « Voir la carte », bouton « Réserver » de l'en-tête, et tout le reste : aucun mouvement.

**Critères de réussite** (lus dans le site enregistré)

- S1. **Plus de mouvement permanent** : aucun mouvement ne se joue plus d'une fois sur la pastille par ouverture de la page. Un unique battement après l'arrivée est accepté et noté.
- S2. **Arrivée conservée** : la pastille porte toujours un mouvement d'arrivée visible, lancé à l'ouverture de la page ou à son arrivée à l'écran, durée totale entre 200 et 1 500 ms (valeurs modifiables).
- S3. **Bouton qui réagit** : le bouton « Réserver une table » du héros bouge quand la souris passe dessus (décalage d'au moins 2 px, ou taille qui varie d'au moins 2 %, ou rotation d'au moins 1°), atteint cet état en 800 ms au plus, revient à son état normal quand la souris le quitte, et ne se répète pas tant que la souris reste dessus. Un changement au passage de la souris sans aucun déplacement, changement de taille ni rotation (couleur, ombre, bordure seules) compte comme S3 « à moitié ».
- S4. **Pas de dégât ailleurs** : aucun mouvement ajouté ni retiré ailleurs dans l'accueil, à deux tolérances près, codées COLL : un effet au passage de la souris ajouté aussi sur « Voir la carte » ou sur le bouton « Réserver » de l'en-tête. Si seul le bouton de l'en-tête a reçu l'effet, S3 n'est pas rempli.

- **Réussite complète** : S1, S2, S3 entièrement, et S4.
- **Réussite partielle** : deux des trois critères S1, S2, S3 entièrement remplis ; ou S1 et S2 remplis avec S3 « à moitié » ; ou S1, S2 et S3 remplis mais S4 non rempli.
- **Échec** : au plus un des critères S1, S2, S3 entièrement rempli.

**Échelle d'aide** (règles 4.4)

- Niveau 1 : relance commune (4.4).
- Niveau 2 (orientation) :
  > Commencez par la pastille, sur la photo en haut de l'accueil. Aurèle veut garder la façon dont elle arrive quand on ouvre la page, et enlever seulement ce qui se répète ensuite. Le bouton, lui, est celui qui se trouve à côté de « Voir la carte ».
- Niveau 3 (indication directe) :
  > La pastille porte deux animations : une apparition à l'ouverture de la page, et une animation qui tourne en boucle. Supprimez seulement la boucle. Ensuite, cliquez sur le bouton « Réserver une table » à côté de « Voir la carte », et ajoutez-lui un effet au survol qui le fait légèrement grossir ou monter.

**Questions après la tâche (mot pour mot)**

> T5-SEQ. Dans l'ensemble, cette mission était-elle difficile ou facile ? Répondez par un chiffre de 1, très difficile, à 7, très facile.

> T5-R. Racontez-moi ce qui se passera pour un visiteur du site.

> T5-a. D'après vous, la pastille bougera-t-elle encore en permanence ? Qu'est-ce qui vous permet de le dire ?

> T5-b. Que se passera-t-il si un visiteur passe la souris sur le bouton, puis la retire ?

**Mesures propres.** S1, S2, S3 notés séparément ; pour H8 : S2 perdu en cours de tâche (dans le journal) puis rétabli ou non, et S1 non rempli alors que T5-a affirme l'arrêt ; confusion entre le bouton du héros et celui de l'en-tête.

---

## 6. Ordre des tâches par participant

| Participant | Persona | Position 1 | Position 2 | Position 3 | Position 4 | Position 5 |
|---|---|---|---|---|---|---|
| P1 | Nathalie (débutante) | T1 | T2 | T3 | T5 | T4 |
| P2 | Claire (designer) | T1 | T3 | T5 | T2 | T4 |
| P3 | Karim (débutant, pressé) | T1 | T5 | T2 | T3 | T4 |
| P4 | Julien (designer motion) | T1 | T2 | T5 | T3 | T4 |
| P5 | Élodie (intégratrice) | T1 | T3 | T2 | T5 | T4 |

**Justification.**

- **T1 fixée en première position.** Elle mesure la découverte à froid (H1, QR2) : cette mesure n'a de sens qu'au premier contact avec l'outil. Placée plus tard, elle mesurerait la mémoire des tâches précédentes.
- **T4 fixée en dernière position.** C'est la tâche la plus exigeante. Placée tôt, elle épuiserait la règle de patience des personas peu patientes (P3, P1), dont l'agacement déclaré déborderait sur les tâches suivantes, et elle ne correspond pas à un usage réaliste : un designer compose une scène après avoir pris l'outil en main sur des effets simples. Contrepartie assumée : son taux de réussite bénéficie de l'apprentissage des tâches précédentes (risque signalé en 10 et dans le rapport).
- **T2, T3, T5 contrebalancées en positions 2 à 4.** Elles sont indépendantes (copie préparée pour chacune, aucune ne suppose le résultat d'une autre). Avec 5 participants, on utilise 5 des 6 ordres possibles, choisis pour que chaque tâche occupe chaque position au moins une fois et au plus deux fois (positions de P1 à P5 : T2 en 2, 4, 3, 2, 3 ; T3 en 3, 2, 4, 4, 2 ; T5 en 4, 3, 2, 3, 4). Les deux débutants ont des ordres différents entre eux, les trois designers aussi. L'ordre non utilisé (T5, T3, T2) est noté comme limite.
- **Conséquence pour l'analyse.** Pour T2, T3 et T5, le rapport indique pour chaque résultat la position de la tâche ; un problème qui n'apparaît qu'en position 2 est examiné comme possible effet d'ordre (11.3).

---

## 7. Débriefing (mot pour mot)

Transition : script 4.3.H. Le modérateur pose les questions dans cet ordre. Seule relance autorisée, une fois par question, si la réponse tient en moins d'une phrase : « Pouvez-vous m'en dire un peu plus ? » Pour D-FIN-3, relance supplémentaire autorisée une fois : « Pouvez-vous me donner un moment précis ? »

> D-FIN-1. Si vous deviez raconter cette séance à quelqu'un de votre entourage, que lui diriez-vous ?

> D-FIN-2. Qu'est-ce qui vous a paru le plus clair ?

> D-FIN-3. Qu'est-ce qui vous a le plus dérouté ?

> D-FIN-4. Imaginez que vous êtes chez vous, seul devant ce site, sans personne à qui demander. Avec ce que vous avez vu aujourd'hui, que feriez-vous, et que ne feriez-vous pas ?

> D-FIN-5. Y a-t-il des mots, à l'écran, dont vous n'étiez pas sûr du sens ? Lesquels, et qu'avez-vous compris ?

> D-FIN-6. Quelle place ce que vous avez fait aujourd'hui pourrait-il avoir, ou ne pas avoir, dans votre travail ou pour votre commerce ?

> D-FIN-7. À quel moment de la séance vous êtes-vous dit que cela en valait la peine, si c'est arrivé ? Et à quel moment vous êtes-vous dit le contraire, si c'est arrivé ?

> D-FIN-8. Qu'est-ce qui vous empêcherait de vous en servir ?

> D-FIN-9. Si Aurèle vous demandait comment être sûre de ce que verront ses clients avant de mettre le site en ligne, que lui répondriez-vous ?

> D-FIN-10. Y a-t-il autre chose que vous voudriez ajouter, sur l'outil ou sur la séance ?

Puis clôture : script 4.3.I.

---

## 8. Grille d'observation

### 8.1 Sources

Pour chaque séance, l'observateur dispose de : la liste numérotée et horodatée des actions ; les captures ; la pensée à voix haute ; le journal horodaté des modifications avec leurs libellés ; la fiche de lecture du site enregistré en fin de chaque tâche (critères) ; les réponses aux questions. Toute ligne de codage renvoie à au moins une de ces sources.

### 8.2 Codes d'événements

**Parcours**

| Code | Définition opérationnelle | Exemple |
|---|---|---|
| HES · hésitation | Au moins 2 actions consécutives sans modification ni ouverture d'un nouvel endroit (captures, agrandissements, survols répétés du même endroit), ou verbalisation d'incertitude sur l'action suivante. | Trois captures du même écran, puis « je ne vois pas où ça se règle ». |
| FP · fausse piste | Suite d'actions engagées dans un endroit ou une fonction qui ne peut pas mener au but, terminée par un retour ou un changement de direction. Un code par piste ; noter le nombre d'actions de la piste. | Ouvre les réglages de couleur du titre en cherchant comment le faire arriver, les parcourt en 4 actions, referme. |
| ERR · erreur | Action dont le résultat contredit l'intention que le participant vient d'annoncer (mauvais élément, mauvais moment de lancement, suppression involontaire, valeur mal saisie), attestée par une capture ou le journal. | Dit « je mets deux secondes », le journal indique 2 ms. |
| REC · récupération | Correction d'une ERR ou d'une COLL. Sous-codes : REC-S (seul), REC-A (après aide). Une ERR sans REC à la fin de la tâche est notée « non récupérée ». | Voit que la photo bouge au lieu du titre, annule, sélectionne le titre. |
| COLL · modification collatérale | Changement de mouvement ou de contenu sur un élément non visé par la consigne, présent dans le journal. COLL-D : le participant le remarque ; COLL-ND : non remarqué et encore présent à la fin. | Le journal montre un mouvement ajouté au paragraphe ; le participant n'en parle jamais. |
| RATE · occasion manquée | La capture montre, lisible, l'accès qui mènera plus tard (ou aurait mené) au but ; le participant ne l'utilise pas à ce moment-là. Ne coder que si l'accès est visible et lisible dans une capture précise, citée. | Capture 12 : un libellé utile est visible à droite ; le participant clique ailleurs et ne le trouve qu'à l'action 31. |
| VERIF · vérification visiteur | Le participant regarde la page comme un visiteur (vue du site hors outils d'édition, ou vue qu'il présente explicitement comme « ce que verra le visiteur ») et la parcourt jusqu'à l'élément concerné. VERIF-E : il ne vérifie que dans la vue d'édition. Code neutre, sans gravité. | « Je vais regarder comme un client » ; ouvre une vue sans outils ; descend jusqu'à La maison. |
| DEC · découverte fortuite | Le participant rencontre et comprend, sans la chercher, une possibilité utile à la tâche ou au sujet étudié. Sans gravité. | En cherchant la durée, remarque qu'on peut faire arriver un texte mot par mot et le dit. |
| BLOC · blocage déclaré | Le participant dit être bloqué. | « Je suis bloquée. » |
| AIDE-1, AIDE-2, AIDE-3 | Aide donnée, par niveau. | — |
| ABD · abandon ; BUD · budget atteint ; ARR · arrêt après aide | Mode de fin de tâche. | — |

**Compréhension**

| Code | Définition opérationnelle | Exemple |
|---|---|---|
| VOC · vocabulaire non compris | Le participant dit ne pas comprendre un mot affiché, ou l'interprète à voix haute d'une façon que l'effet obtenu contredit. Noter le mot exact tel qu'il l'a lu. Un même mot n'est compté qu'une fois par séance pour H9. | « Délai, c'est combien de temps ça dure, je suppose » ; modifie ce champ pour ralentir ; le mouvement part plus tard sans ralentir. |
| MM · écart de modèle mental | Une attente formulée (« je m'attends à… », « ça va… », « le visiteur verra… ») est contredite par la capture suivante, le journal ou le site enregistré. MM-V : l'écart porte sur ce que verra le visiteur (récit T*-R, T2-a, T3-a, T4-a, T5-a et T5-b compris). | Récit : « il apparaîtra quand on arrivera dessus » ; site : lancé à l'ouverture de la page. |

**Affect et valeur** (codes déclaratifs ou verbaux, sans gravité, toujours avec citation)

| Code | Définition opérationnelle | Exemple |
|---|---|---|
| SAT · satisfaction exprimée | Expression positive spontanée sur ce qui vient de se passer. | « Ah, c'est exactement ce que je voulais. » |
| FRU · frustration exprimée | Expression négative spontanée, ou agacement déclaré de 4 ou 5 (règle 6 de 3.2). | « Ça fait dix clics pour une durée, c'est pénible. » (agacement 4) |
| VAL+ · valeur perçue | Énoncé qui relie la fonctionnalité à un bénéfice pour le travail, le client ou le commerce. | « Ça, je peux le vendre à mes clients restaurateurs. » |
| VAL− · valeur mise en doute | Énoncé qui nie ou limite ce bénéfice (inutile, trop long, risqué, pas pour moi). | « Pour mon épicerie, je ne perdrais pas mon temps là-dessus. » |

**Dispositif** (codés systématiquement ; ils servent au test d'artefact de 11.3)

| Code | Définition opérationnelle | Exemple |
|---|---|---|
| PERC · limite perceptive | Difficulté explicitement liée à l'absence de perception continue du mouvement, à l'absence d'infobulle native, ou à un texte illisible malgré l'agrandissement. | « Je ne peux pas savoir si ça a bougé, les deux captures sont identiques. » |
| HALL · perception non attestée | Le participant affirme voir quelque chose que la capture correspondante ne montre pas, ou affirme qu'un mouvement a eu lieu sans le présenter comme une supposition. | « Le titre glisse bien de gauche à droite » alors que les captures sont identiques. |
| CONN · connaissance hors persona | Emploi d'un terme de la liste « vocabulaire inconnu » de la persona sans l'avoir lu à l'écran ; ou recours à un outil absent de sa fiche ; ou anticipation d'un emplacement précis sans indice visible dans les captures précédentes. | Karim : « il faut régler l'easing », mot jamais affiché. |
| PERS · écart à la persona | Non-respect de la manière d'explorer ou de la règle d'abandon de la fiche. | Nathalie fait 22 actions sans progrès sans déclarer de blocage. |
| MOD · écart du modérateur | Parole hors script, aide sans blocage déclaré, relance non prévue. | Le modérateur dit « vous y êtes presque ». |
| HORS · action interdite | Tentative de lire le code, la documentation ou d'inspecter la page. | — |

### 8.3 Échelle de gravité (pour HES, FP, ERR, COLL, RATE, VOC, MM, BLOC et les modes de fin)

On attribue le niveau le plus élevé dont une condition est remplie, d'après la conséquence observée dans la tâche.

| Niveau | Libellé | Conditions opérationnelles |
|---|---|---|
| 0 | Pas un problème | Remarque ou préférence sans effet observable sur les actions ni sur le résultat. |
| 1 | Cosmétique | Coûte au plus 2 actions ; pas de fausse piste ni d'erreur ; reprise immédiate, sans aide. |
| 2 | Mineur | Coûte 3 à 9 actions ; ou erreur récupérée seul ; ou mot non compris sans effet sur le résultat final ; aucune aide de niveau 2 ou 3 liée. |
| 3 | Majeur | Coûte 10 actions ou plus ; ou entraîne une aide de niveau 2 ; ou cause un critère non rempli (réussite partielle) ; ou écart matériel entre le récit du visiteur et le site (9.4) ; ou modification collatérale non remarquée qui ne détruit rien de voulu. |
| 4 | Bloquant | Cause un échec, un abandon, un arrêt au budget ou une aide de niveau 3 ; ou modification collatérale non remarquée qui détruit un mouvement voulu ; ou le participant déclare terminé et juste un résultat en échec. |

Quand plusieurs événements s'enchaînent, la conséquence finale (par exemple l'échec) est attribuée à l'événement d'origine, le premier de la chaîne ; les suivants reçoivent la gravité de leur coût propre.

### 8.4 Règles de codage

1. Coder ce qui est observé (action, capture, journal, site, parole), jamais une intention supposée au-delà de ce que le participant a dit.
2. Chaque code cite sa trace : numéro d'action, horodatage, et soit une citation verbatim d'au plus une phrase, soit le libellé du journal, soit le numéro de capture.
3. Les opinions ne sont codées qu'en SAT, FRU, VAL+, VAL−, avec citation. Une opinion ne devient jamais un problème d'interface sans comportement associé.
4. Un même événement peut porter plusieurs codes (par exemple VOC et FP).
5. Désigner un endroit de l'interface par ce que la capture montre (« le libellé "…" en haut à droite »), sans nom inventé ni supposé.
6. Les réponses aux questions et au débriefing sont codées avec la mention « déclaratif », séparément des comportements.
7. Chaque code reçoit l'étape du parcours où il survient (9.5).
8. Les codes du dispositif (PERC, HALL, CONN, PERS, MOD, HORS) sont recherchés sur tout passage qui porte un code de gravité 2 ou plus, avant de passer au passage suivant.
9. Les séances sont codées dans un ordre tiré au sort, différent de l'ordre de passage.
10. **Double codage.** Un second observateur code indépendamment 2 séances tirées au sort, dont au moins un débutant et un designer. Accord mesuré sur les événements (même code, même action à ± 2 actions près) : si l'accord est inférieur à 80 %, les définitions en cause sont précisées par addendum daté et les 5 séances sont recodées pour ces codes.

### 8.5 Ligne de codage (format)

| Séance | Tâche | Position | N° action | Horodatage | Étape | Code | Gravité | Endroit de l'interface (tel que vu) | Trace citée | Codes dispositif sur le passage | Commentaire |
|---|---|---|---|---|---|---|---|---|---|---|---|

---

## 9. Métriques

### 9.1 Statut de la tâche

Le **statut** se lit toujours dans le site enregistré (critères de la section 5), jamais dans la déclaration du participant. Le **mode de fin** est noté à part.

| Statut | Définition | Compte comme réussite dans le taux principal ? |
|---|---|---|
| C | Réussite complète, aucune aide ou aide de niveau 1 seulement | oui |
| C-A | Réussite complète avec aide de niveau 2 | oui, rapporté à part |
| P | Réussite partielle, aucune aide ou niveau 1 | non (taux de réussite partielle) |
| P-A | Réussite partielle avec aide de niveau 2 | non |
| E | Échec | non |
| E-I | Résultat atteint seulement après une aide de niveau 3 (le niveau atteint est noté : « complet » ou « partiel ») | non, compté en échec |
| INV | Tâche invalidée (11.6) | exclue du dénominateur |

Modes de fin : terminé déclaré ; abandon (ABD) ; budget atteint (BUD) ; arrêt après aide (ARR). Un statut C ou P avec un mode de fin ABD ou BUD signifie que le participant ne savait pas avoir atteint le résultat : l'événement est codé MM.

### 9.2 Métriques par tâche et par participant

| Métrique | Définition | Source |
|---|---|---|
| Statut et mode de fin | 9.1 | fiche de lecture du site, trace |
| Actions totales | Nombre d'actions (clics, frappes, défilements, captures, agrandissements) comptées par le dispositif, de la fin de la consigne à la fin de la tâche | trace |
| Actions jusqu'à la réussite | Rang de l'action après laquelle le site remplit, pour la première fois et jusqu'à la fin, les critères du statut final (C ou P) ; « non atteint » sinon | journal croisé avec la trace |
| Première action pertinente | Rang de la première action suivie d'une capture qui montre un contenu concernant le mouvement d'un élément visé, ou d'une entrée du journal concernant ce mouvement | captures, journal |
| Temps | Durée horodatée de la tâche ; métrique secondaire, non comparable à un temps humain, rapportée sans interprétation | trace |
| Captures et agrandissements | Nombre, rapporté à part des autres actions | trace |
| Fausses pistes | Nombre de FP et total des actions perdues dans ces pistes | codage |
| Hésitations | Nombre de HES | codage |
| Erreurs | Nombre d'ERR, dont non récupérées | codage |
| Collatérales | Nombre de COLL-D et de COLL-ND présentes à la fin | codage, site |
| Occasions manquées | Nombre de RATE | codage |
| Aides | Niveau maximal et nombre d'aides | trace |
| Vérification | Présence de VERIF et de VERIF-E, et rang de la première | codage |
| Vocabulaire | Liste des mots codés VOC | codage |
| SEQ | Note de 1 à 7 (T*-SEQ) | réponse |
| Concordance du récit | Score sur 8 et écart matériel oui ou non (9.4) | réponse T*-R, site |
| Mesures propres | T1 : première action pertinente, VERIF ; T2 : diagnostic ; T3 : R1 et R2 séparés, estimation T3-a ; T4 : profil de critères, structure de lancement, cohérence T4-a ; T5 : S1, S2, S3 séparés, H8 | section 5 |
| Affect et valeur | Nombre de SAT, FRU, VAL+, VAL− par étape | codage |

### 9.3 Métriques agrégées

Avec 5 participants, les résultats sont rapportés en effectifs (« 3 sur 5 », « 1 débutant sur 2 », « 2 designers sur 3 »), jamais en pourcentages, sauf pour H3 dont le seuil est défini en proportion de récits. Aucun test statistique.

- Par tâche : répartition des statuts (C, C-A, P, P-A, E, E-I, INV), ensemble et par public ; médiane et étendue des actions totales et des actions jusqu'à la réussite ; médiane et étendue des SEQ ; total des FP et des actions perdues ; nombre d'aides par niveau ; nombre de COLL-ND.
- Par participant : profil des cinq tâches (statut, SEQ, écart matériel), nombre de VOC distincts, agacement déclaré maximal.
- Par public : médiane des actions jusqu'à la première action pertinente en T1 (H1) ; SEQ médiane par tâche ; VOC distincts (H9).
- **Matrice réussite × compréhension** (25 cases au plus) :

| | Pas d'écart matériel dans le récit | Écart matériel dans le récit |
|---|---|---|
| C ou C-A | réussite comprise | réussite non comprise |
| P, P-A, E, E-I | échec lucide | échec ignoré |

  L'« échec ignoré » (le participant croit le visiteur servi alors qu'il ne l'est pas) est le résultat le plus grave pour QR3 et est rapporté nommément.
- **Carte de la valeur** : pour chaque étape du parcours (9.5), nombre de SAT et VAL+ d'un côté, de FRU et VAL− de l'autre, par public (H10, QR5).
- **Liste des problèmes retenus** (11.2) : gravité, nombre de participants concernés, publics, étapes, tâches, statut au test d'artefact.
- **Tableau des hypothèses** : statut de chacune avec les chiffres qui le fondent.

### 9.4 Concordance du récit « ce qui se passera pour un visiteur »

Le récit (réponse T*-R, complétée le cas échéant par la relance) est comparé au **site enregistré**, pas à la consigne : un participant peut échouer la tâche et décrire exactement ce qu'il a produit.

| Dimension | 2 | 1 | 0 |
|---|---|---|---|
| Quoi (éléments qui bougent) | tous les éléments qui bougent, aucun en trop | une partie, sans erreur | faux, ou absent |
| Quand (moment de lancement ; ordre s'il y a plusieurs éléments) | exact | vague mais compatible (« quand on arrive ») | faux, ou absent |
| Comment (manière de bouger) | exact | vague mais compatible (« il arrive doucement ») | faux, ou absent |
| Combien (durée à ± 50 % près ; nombre de fois : une fois, à chaque passage, en permanence) | les deux exacts | un des deux exact, ou les deux vagues mais compatibles | faux, ou absent |

- Score sur 8.
- **Écart matériel** : affirmation fausse (et non simple omission) sur « Quoi », sur « Quand », sur le nombre de fois, ou, en T4, sur l'ordre. Tout écart matériel est codé MM-V, gravité 3 au moins.
- Cotation par l'observateur ; en double codage, les deux cotations sont comparées et les divergences arbitrées d'après la fiche de lecture du site.

### 9.5 Étapes du parcours (pour le codage et la carte de la valeur)

| Étape | Définition |
|---|---|
| Découvrir | Chercher où et comment agir sur le mouvement d'un élément |
| Choisir | Choisir ce qui bouge et de quelle manière (dont les effets tout prêts) |
| Lancer | Choisir le moment qui lance le mouvement et le nombre de fois |
| Régler | Modifier durée, retard, courbe, répétition d'un élément |
| Composer | Coordonner plusieurs éléments dans le temps |
| Vérifier | Constater le résultat, dans l'éditeur ou comme un visiteur |
| Retirer | Retrouver et supprimer tout ou partie d'un mouvement existant |

---

## 10. Biais du dispositif simulé et parades

Chaque biais est rapporté dans le rapport final avec son risque résiduel, même si aucun incident n'a été observé.

**B1. Connaissance générale des outils par le modèle.** Le modèle connaît les conventions de nombreux créateurs de sites et outils d'animation ; un débutant simulé peut « deviner » un emplacement qu'aucun débutant réel ne devinerait.
- Parades : listes explicites de vocabulaire inconnu et d'outils connus par persona ; règles 1 et 2 de la consigne d'incarnation ; code CONN ; test d'artefact A2 (une réussite obtenue sur un passage CONN est marquée « possiblement surestimée ») ; mesure « première action pertinente » confrontée aux captures.
- Risque résiduel : la connaissance implicite ne se voit pas toujours dans la parole ; la découvrabilité est probablement **surestimée**, surtout pour les débutants.

**B2. Persévérance méthodique et absence de fatigue.** Un agent ne se lasse pas, reste méthodique et pourrait explorer tous les recoins jusqu'au budget.
- Parades : règles d'abandon chiffrées par persona ; agacement déclaré toutes les 10 actions ; code PERS quand la règle n'est pas respectée ; budget de 40 actions.
- Risque résiduel : l'abandon devient mécanique (compteur) au lieu d'être déclenché par la confusion ou l'émotion ; les abandons réels, souvent plus précoces et moins prévisibles, sont **sous-estimés**.

**B3. Complaisance dans les réponses déclaratives.** Tendance à noter favorablement, à trouver des qualités, à répondre ce que le modérateur semble attendre.
- Parades : règle 8 de la consigne d'incarnation ; rappel 4.3.C (« vos critiques nous sont plus utiles ») ; questions ouvertes à double sens (D-FIN-7 : moment où cela en valait la peine et moment contraire ; D-FIN-8 : ce qui empêcherait) ; hiérarchie des preuves (11.4) : le déclaratif ne suffit jamais à retenir ou écarter un problème ; SEQ comparé entre tâches plutôt qu'en valeur absolue ; concordance du récit vérifiée contre le site.
- Risque résiduel : SEQ, SAT, VAL+ et les réponses de débriefing restent probablement **gonflés** ; H10 est rapportée comme indicative.

**B4. Modèle identique entre participants.** Cinq agents issus du même modèle partagent les mêmes réflexes ; la diversité ne tient qu'aux fiches.
- Parades : personas contrastées sur six dimensions (3.1), avec des règles d'exploration opérationnelles et opposées (lit tout ou ne lit rien, évite l'inconnu ou clique partout) ; test d'artefact A3 (comportement identique chez des personas contrastées, sans cause visible dans les captures : « suspect modèle »).
- Risque résiduel : fréquence des problèmes **surestimée** par convergence, et problèmes propres à des profils réels absents ; « observé chez 4 sur 5 » ne veut pas dire « fréquent chez les utilisateurs ».

**B5. Effets d'ordre et d'apprentissage.** Ce qui a été appris dans une tâche facilite la suivante ; la dernière tâche profite de toutes les autres.
- Parades : copie préparée par tâche (pas de dépendance d'état) ; T2, T3, T5 contrebalancées ; position rapportée avec chaque résultat ; test A7.
- Risque résiduel : T4 toujours en dernier, donc sa réussite est **surestimée** par l'apprentissage ; T1 toujours en premier, donc la découverte n'est mesurée qu'une fois par participant.

**B6. Perception par captures.** Écran de 1 440 × 900 vu en 800 × 500, loupe, pas d'infobulles natives, pas de mouvement continu. Un humain verrait bouger ce que l'agent doit déduire de captures.
- Parades : codes PERC et HALL ; règle 5 de la consigne d'incarnation (dire « supposition ») ; test A1 (artefact probable, ou problème réel « amplifié par le dispositif » avec gravité réduite d'un niveau si l'interface n'offre aucune autre représentation) ; critères de réussite lus dans le site et non dans la perception du participant.
- Risque résiduel : les difficultés de **vérification** (T2, T5) et de lecture des petits libellés ou des icônes sans texte sont **surestimées** ; à l'inverse, les problèmes de sensation (mouvement trop brusque, trop long, désagréable) sont **invisibles** pour l'étude.

**B7. Consignes qui suggèrent le chemin.** Un mot de la consigne identique à un libellé de l'interface guide le participant.
- Parades : consignes rédigées à l'aveugle vis-à-vis de l'interface, en langage de client ; lexique interdit vérifié (5.0) ; objectif décrit en résultat pour le visiteur ; éléments désignés par leur texte visible.
- Risque résiduel : les mots d'usage retenus (« bouger », « arriver ») peuvent coïncider avec des libellés ; si c'est le cas, l'observateur le note et la découverte concernée est marquée « possiblement aidée par la consigne ». Les éléments désignés par leur texte exact facilitent leur repérage plus qu'une demande réelle d'un client.

**B8. Modérateur qui oriente.** Relances, approbations, aides données trop tôt.
- Parades : script fermé, répertoire de phrases avec déclencheurs stricts (4.3.F) ; aides uniquement sur blocage déclaré, dans l'ordre, espacées de 3 actions ; seul accusé de réception « Merci. » ; modérateur sans accès aux critères de réussite ni aux hypothèses ; code MOD et test A6.
- Risque résiduel : les aides de niveau 2 et 3, écrites sans connaître l'interface, peuvent être plus ou moins utiles selon les tâches : l'effet d'une aide n'est **pas comparable** d'une tâche à l'autre. Les aides de niveau 3 emploient volontairement des mots techniques (« animation », « survol », « boucle ») qui peuvent coïncider avec l'interface.

**B9. Observateur qui oriente l'analyse (biais de confirmation).**
- Parades : observateur sans accès aux hypothèses avant la fin du codage ; codes définis avec exemples ; citation obligatoire ; double codage de 2 séances avec seuil d'accord ; ordre de codage tiré au sort ; seuils des hypothèses fixés avant les séances (section 2).
- Risque résiduel : si l'observateur est lui aussi un agent du même modèle, il peut juger « naturels » les raisonnements qui lui ressemblent et sous-coder HES ou RATE ; l'accord entre deux codeurs du même modèle **surestime** la fiabilité.

**B10. Auteur des personas et des hypothèses identique.** Le même chercheur a écrit les hypothèses et les personas ; une persona peut être taillée, même involontairement, pour confirmer une hypothèse (par exemple Nathalie et le lancement « au clic » de PowerPoint pour H2).
- Parades : personas dérivées d'une matrice de diversité (3.1) ; hypothèses et critères jamais transmis aux agents participants ; hypothèses formulées avec des conditions d'infirmation explicites.
- Risque résiduel : H2 et H9 sont les plus exposées ; leur confirmation est rapportée avec cette réserve.

**B11. Pensée à voix haute imposée.** Une phrase avant et après chaque action ralentit, rationalise et rend le participant plus réfléchi qu'en usage réel ; chez un agent, la phrase peut justifier après coup une décision déjà prise.
- Parades : le comportement et le site priment sur la parole (11.4) ; les MM se fondent sur des attentes formulées avant l'action et contredites ensuite.
- Risque résiduel : les participants simulés sont probablement **plus attentifs** qu'un utilisateur réel ; les erreurs d'inattention sont sous-estimées.

**B12. Connaissance du sujet de l'étude.** Dès la question D-4, le participant sait que l'étude porte sur le mouvement et cherche activement cette possibilité.
- Parades : D-4 est placée après des questions générales ; les consignes décrivent un besoin de client, pas une fonctionnalité.
- Risque résiduel : la découverte « dans la vraie vie », où personne ne suggère que le site peut bouger, est **surestimée**.

**B13. Motivation et enjeu simulés.** Échéance et client fictifs ; aucune conséquence réelle.
- Parades : scénarios réalistes (message d'une cliente, réouverture, associé demain matin) ; motivations propres à chaque persona.
- Risque résiduel : la prudence face au risque de « casser » le site d'un client réel n'est représentée que par Nathalie.

**B14. Budget d'actions qui compte les captures.** Une persona qui vérifie beaucoup consomme son budget plus vite.
- Parades : captures et agrandissements rapportés à part ; interprétation des BUD au regard de ce compte.
- Risque résiduel : la vérification est légèrement **pénalisée**, ce qui peut renforcer artificiellement H4.

**B15. Écart entre le site lu et le site vécu.** Une lecture des valeurs enregistrées peut dire « réussi » alors qu'un visiteur ne perçoit rien (élément masqué, mouvement imperceptible).
- Parades : seuils minimaux de perceptibilité (5.0) ; confirmation par une visite réelle avec captures rapprochées pour chaque C et P ; la visite fait foi en cas de désaccord.
- Risque résiduel : la confirmation par captures ne juge pas la qualité perçue du mouvement (fluidité, agrément).

**B16. Perception hallucinée ou affirmée à tort.** L'agent peut affirmer avoir vu un mouvement ou un libellé.
- Parades : code HALL ; toute conclusion fondée sur un passage HALL est écartée (11.3) ; les récits sont confrontés au site.
- Risque résiduel : une affirmation vraie par hasard n'est pas détectable ; la concordance du récit peut être légèrement **surestimée**.

---

## 11. Règles d'analyse fixées à l'avance

### 11.1 Unité d'analyse

Un **problème** regroupe les événements codés (gravité 1 ou plus) qui portent sur le même endroit de l'interface, à la même étape du parcours, avec la même cause apparente. Le regroupement se fait après le codage des cinq séances, par l'observateur, puis est relu par le chercheur ; chaque regroupement liste les lignes de codage qui le composent.

### 11.2 Retenir un problème

Un problème est **retenu** si les trois conditions sont réunies :
1. il est observé dans le comportement (pas seulement dans le déclaratif) ;
2. il concerne au moins 2 participants distincts, **ou** il atteint une gravité de 3 ou plus chez 1 participant ;
3. il passe le test d'artefact (11.3) avec le statut « problème d'interface » ou « problème d'interface amplifié par le dispositif ».

Sinon, il est rapporté dans une liste séparée de **signaux faibles**, avec les mêmes informations.

- **Gravité d'un problème retenu** : la gravité la plus élevée observée, accompagnée du nombre d'occurrences à chaque niveau.
- **Ordre de priorité** : gravité, puis nombre de participants, puis public principal de la tâche concerné (débutants pour T1 et T5, designers pour T3 et T4, les deux pour T2).
- Un problème observé chez un seul public est rapporté comme tel ; il n'est pas généralisé à l'autre.

### 11.3 Distinguer un problème d'interface d'un artefact du dispositif

Chaque problème candidat passe les questions suivantes, dans l'ordre. La réponse et la trace qui la fonde sont écrites dans la fiche du problème.

- **A1. Perception.** Le problème disparaîtrait-il si le participant avait vu le mouvement en continu, lu une infobulle native, ou vu l'écran à pleine résolution ?
  - Non : on passe à A2.
  - Oui, et l'interface offre par ailleurs une autre représentation visible de l'information (libellé, valeur affichée, représentation statique) que le participant n'a pas utilisée : **artefact probable**, non retenu, listé en signal faible.
  - Oui, et l'interface n'offre aucune autre représentation visible : **problème d'interface amplifié par le dispositif**, retenu avec une gravité réduite d'un niveau.
- **A2. Connaissance et persona.** Le passage porte-t-il un code CONN ou PERS ?
  - CONN à l'origine d'une réussite ou d'un évitement du problème : la réussite est marquée « possiblement surestimée » ; le problème éventuellement évité chez ce participant est examiné chez les autres.
  - PERS à l'origine du problème (la persona n'a pas été respectée) : le problème est écarté pour ce participant.
- **A3. Uniformité du modèle.** Le même comportement apparaît-il chez des personas aux styles d'exploration opposés, avec des formulations quasi identiques ? Si oui, il n'est retenu que si une cause visible dans les captures est citée ; sinon il est marqué « suspect modèle » et listé en signal faible.
- **A4. Consigne.** Au moins 2 participants ont-ils compris la consigne autrement que l'intention écrite en section 5 (d'après leur parole avant d'agir) ? Si oui, le critère concerné relève d'un **problème de protocole**, rapporté à part et non imputé à l'interface.
- **A5. Préparation.** L'état de départ vérifié était-il conforme à l'annexe A ? Sinon, la tâche est invalidée (11.6).
- **A6. Modérateur.** Un code MOD précède-t-il le problème dans la même tâche ? Si oui, les événements postérieurs à l'écart sont marqués « contaminés » et ne suffisent pas seuls à retenir un problème.
- **A7. Ordre.** Pour T2, T3 ou T5, le problème n'est-il observé qu'aux positions les plus précoces de la tâche ? Si oui, il est retenu avec la mention « possible effet d'ordre ».
- **A8. Perception affirmée.** Toute conclusion qui repose sur un passage HALL est écartée.

### 11.4 Hiérarchie des preuves

Du plus fort au plus faible : site enregistré et journal ; actions et captures ; pensée à voix haute pendant la tâche ; réponses aux questions après la tâche ; débriefing. En cas de contradiction, la source la plus forte l'emporte et la contradiction est elle-même codée (MM). Le déclaratif peut illustrer ou corroborer un problème, jamais le fonder seul.

### 11.5 Traitement des hypothèses et des résultats contraires

- Chaque hypothèse reçoit son statut (confirmée, infirmée, indéterminée) par application mécanique des seuils de la section 2, avec les chiffres qui le fondent. Les seuils et les définitions ne sont pas modifiés après les séances.
- Une hypothèse infirmée est rapportée avec la même place et le même niveau de détail qu'une hypothèse confirmée, dans le même tableau.
- Il est interdit de sauver une hypothèse par un sous-groupe choisi après coup (par exemple « confirmée si l'on exclut P4 »). Une exclusion n'est possible que par les règles d'invalidation (11.6) ou d'artefact (11.3), appliquées à toutes les hypothèses de la même façon, et elle est signalée.
- Une donnée manquante qui empêche le calcul rend l'hypothèse **indéterminée**, avec la raison.
- Les constats non prévus par les hypothèses sont rapportés dans une section « exploratoire », distincte, sans vocabulaire de confirmation.
- Quand les résultats contredisent l'intention de conception annoncée (par exemple, les débutants réussissent T4 mieux que les designers), le résultat est rapporté tel quel, puis examiné avec le test d'artefact (notamment B1, B4 et B5) ; l'interprétation proposée est présentée comme une hypothèse pour une étude suivante, pas comme une explication établie.

### 11.6 Invalidation et reprise

- Une tâche est **invalidée** si : l'état de départ n'était pas conforme ; une action interdite (HORS) a abouti ; le modérateur a donné, avant la fin de la tâche, une information hors script portant sur le chemin ou le résultat ; une panne technique a empêché d'agir ou d'enregistrer.
- Une tâche invalidée peut être **reprise une seule fois**, par une nouvelle instance de la même persona, qui reçoit la consigne d'incarnation, le script 4.3.A à C, puis directement la tâche concernée. La reprise est signalée ; elle ne porte pas l'apprentissage des tâches précédentes, ce qui est noté comme limite pour cette donnée. Une reprise de T1 conserve sa valeur de découverte à froid.
- Si la reprise est elle-même invalidée, la donnée est manquante (statut INV, exclue du dénominateur).

### 11.7 Forme des résultats

- Effectifs bruts, publics séparés, position de la tâche indiquée pour T2, T3, T5.
- Pour chaque problème retenu : description en termes observés, gravité, participants, étape, tâches, au moins une citation de trace, statut au test d'artefact, et, le cas échéant, mention « à confirmer avec des utilisateurs réels » (obligatoire pour « amplifié par le dispositif », « possiblement surestimée », « possible effet d'ordre »).
- Rappel des limites de couverture (1.4) et des risques résiduels (section 10).

---

## Annexe A · Récapitulatif pour la préparation technique

**Commun à toutes les tâches**
- Une copie du site par participant et par tâche (25 copies).
- État S0 : accueil sans aucun mouvement (en-tête, héros, La maison, À la carte, Événements, Témoignages, bandeau de réservation, pied de page, mouvement lié à la page entière) ; six autres pages telles que livrées ; styles de survol sans mouvement conservés et relevés.
- Éditeur ouvert sur l'accueil, vue en haut de page, aucun élément sélectionné, interface dans l'état d'une première ouverture.
- Vérifier l'état par lecture du site avant la tâche ; lire le site enregistré après la tâche ; confirmer toute réussite complète ou partielle par une visite comme un visiteur (ouverture, défilement lent jusqu'à l'élément, captures rapprochées ; en T4, défilement rapide puis lent).
- Seuils communs : mouvement d'arrivée visible = opacité de départ ≤ 0,5, ou décalage ≥ 8 px, ou taille ≤ 95 % ou ≥ 105 %, ou rotation ≥ 3°, ou texte révélé par morceaux, avec retour à l'état normal. Durée totale = retard + durée.

**T1 · Premier élément qui bouge**
- Départ : S0, rien d'autre.
- Élément : titre « Une cuisine de produits, servie sans chichi. » (section La maison).
- Complète : arrivée visible ; lancée à l'arrivée à l'écran (du titre ou d'un bloc qui le contient) ; une fois ou à chaque passage ; durée totale 200 à 2 500 ms ; pas de mouvement permanent ; rien d'ajouté hors de La maison.
- Partielle : arrivée visible, mais lancée à l'ouverture de la page, à la souris ou au clic ; ou durée totale 100 à 199 ms ou 2 501 à 5 000 ms ; ou mouvement permanent ajouté ; ou toute la section arrive d'un bloc ; ou mouvement ajouté hors de La maison.
- Échec : aucun mouvement d'arrivée sur le titre ; ou mouvement sur un autre élément seulement ; ou titre invisible, décalé ou déformé à la fin ; ou texte du titre modifié.

**T2 · Ce que voit vraiment le client**
- Départ : S0, plus dans À la carte :
  - « Cette saison » : opacité 0 à 1, 600 ms, retard 0, à l'arrivée à l'écran, une fois ;
  - « Quelques plats signature » : opacité 0 à 1 et décalage 24 px vers le bas, 600 ms, retard 100 ms, à l'arrivée à l'écran, une fois ;
  - chaque carte de plat (noter N) : opacité 0 à 1 et décalage 24 px vers le bas, 600 ms, retard 0, **à l'ouverture de la page**, une fois (sinon sur la liste, noté) ;
  - lien « Toute la carte » : rien.
- Complète : les N cartes (ou la liste) ont une arrivée visible lancée à l'arrivée à l'écran (ou liée au défilement pendant leur entrée, finissant à l'état normal) ; durée totale 200 à 2 500 ms ; « Cette saison » et « Quelques plats signature » toujours animés à l'arrivée à l'écran ; rien d'ajouté hors de la section.
- Partielle : au moins une carte corrigée, mais pas toutes ; ou durée 2 501 à 5 000 ms ; ou surtitre ou titre dégradé ; ou mouvement ajouté hors de la section.
- Échec : aucune carte avec une arrivée visible lancée à l'arrivée à l'écran.

**T3 · Donner du rythme à l'accueil**
- Départ : S0, plus dans le héros :
  - « Le goût de l'Auvergne, sans cérémonie. » : opacité 0 à 1 et décalage 24 px vers le bas, 500 ms, retard 0, à l'ouverture de la page, une fois ;
  - « Une carte courte qui change avec les saisons… » : opacité 0 à 1, 500 ms, retard 0, à l'ouverture de la page, une fois ;
  - « Réserver une table » et « Voir la carte » : chacun opacité 0 à 1 et décalage 16 px vers le bas, 500 ms, retard 0, à l'ouverture de la page, une fois ;
  - surtitre, photo, pastille : rien.
- R1 : titre toujours animé à l'ouverture, durée du mouvement 900 à 4 000 ms.
- R2 : chaque bouton toujours animé, départ ≥ 80 % de (retard + durée du titre), fin ≤ 6 000 ms après l'ouverture.
- R3 : paragraphe toujours animé à l'ouverture. R4 : rien d'ajouté sur surtitre, photo, pastille, ni hors du héros.
- Complète : R1 à R4. Partielle : titre encore animé et R1 seul, ou R2 seul, ou R1 avec un seul bouton conforme, ou R1 et R2 sans R3 ou R4, ou boutons après le titre mais finissant après 6 000 ms. Échec : ni R1 ni R2, ou titre sans mouvement.

**T4 · La maison racontée comme une scène**
- Départ : S0, rien d'autre.
- Éléments : photo de la salle ; « Une cuisine de produits, servie sans chichi. » ; « Aurèle et Nils ont ouvert la maison en 2014… » ; les trois chiffres clés. Surtitre « La maison » toléré.
- C1 : les six éléments ont une arrivée visible.
- C2 : tous lancés par l'arrivée à l'écran de la section La maison (un même événement).
- C3 : départs photo < titre < paragraphe < premier chiffre, écarts ≥ 80 ms.
- C3b : trois chiffres à des départs distincts, écarts ≥ 80 ms, ordre libre.
- C4 : fin du dernier mouvement entre 1 800 et 3 000 ms après l'arrivée de la section.
- C5 : photo avec décalage horizontal de départ ≥ 16 px ; titre avec décalage de départ vers le bas ≥ 8 px ; paragraphe avec arrivée visible ; chaque chiffre avec une courbe à dépassement (dépassement, ressort, rebond).
- C6 : la scène se rejoue à chaque arrivée de la section à l'écran.
- Complète : tous les critères. Partielle : C1 et C3, au plus deux échecs parmi C2, C3b, C4, C5, C6, et fin ≤ 4 500 ms. Échec : sinon. Rapporter le profil de critères.

**T5 · Calmer la pastille, réveiller le bouton**
- Départ : S0, plus dans le héros :
  - pastille « Bib Gourmand · Guide 2026 » : (a) à l'ouverture de la page, taille 80 % à 100 % et opacité 0 à 1, 500 ms, retard 300 ms, une fois ; (b) à l'ouverture de la page, taille 100 % à 108 % puis 100 %, 1 200 ms par cycle aller-retour, retard 800 ms, sans fin (forme retenue notée si l'outil ne permet pas deux mouvements distincts) ;
  - bouton « Réserver une table » du héros : aucun mouvement ; style de survol livré conservé et relevé ;
  - « Voir la carte », bouton « Réserver » de l'en-tête, reste : rien.
- S1 : aucun mouvement joué plus d'une fois sur la pastille par ouverture de la page.
- S2 : pastille toujours avec une arrivée visible, à l'ouverture de la page ou à son arrivée à l'écran, durée totale 200 à 1 500 ms.
- S3 : « Réserver une table » du héros bouge au passage de la souris (décalage ≥ 2 px, ou taille ± 2 % au moins, ou rotation ≥ 1°), en ≤ 800 ms, revient quand la souris part, ne se répète pas ; couleur, ombre ou bordure seules = « à moitié ».
- S4 : rien d'autre changé dans l'accueil ; tolérés (COLL) : effet de survol ajouté aussi sur « Voir la carte » ou « Réserver » de l'en-tête ; si seul l'en-tête a l'effet, S3 non rempli.
- Complète : S1, S2, S3 entier, S4. Partielle : deux de S1, S2, S3 entiers ; ou S1 et S2 avec S3 à moitié ; ou S1 à S3 sans S4. Échec : au plus un de S1, S2, S3 entier.

