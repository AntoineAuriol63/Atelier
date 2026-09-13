# Audit n°5 : parcours et valeur des animations

Audit du 13 septembre 2026, demandé par Antoine après l'audit d'interface n°4. **La question n'est pas la taille des boutons, mais la compréhension** : le déroulé se comprend-il, l'utilisateur sait-il ce qu'il doit faire à chaque étape, voit-il ce qu'il obtient, et la fonctionnalité lui apporte-t-elle ce qu'elle promet ?

## Méthode

- **Parcours cognitifs** (*cognitive walkthrough*) : sept tâches réelles, rejouées dans l'éditeur sur une copie des données de Maison Aurèle. À chaque étape, quatre questions :
  1. **But** : l'utilisateur sait-il ce qu'il cherche à faire à ce moment ?
  2. **Action visible** : voit-il que l'action existe ?
  3. **Lien** : comprend-il que cette action mène à son but, avec les mots affichés ?
  4. **Retour** : voit-il que ça a marché, et ce qui va se passer ?
- **Valeur** : pour chaque profil, ce qu'il vient chercher, le moment où il l'obtient, ce qui l'en empêche ; et les quatre promesses du cadrage (`docs/cadrage-animation.md` § 1), tenues ou non.
- **Textes relevés tels qu'affichés** : l'audit cite ce que l'utilisateur lit, pas ce que le code veut dire.

**Limites.** Pas d'utilisateurs réels. L'auditeur connaît le modèle (il l'a construit) : le risque est de trouver clair ce qui ne l'est que pour lui. Pour le réduire, chaque étape est jugée sur les seuls mots visibles. Un essai avec deux ou trois personnes (une débutante, un designer habitué à Webflow ou Figma) reste nécessaire pour confirmer.

## Verdict

**Pour un débutant, la promesse est tenue** : dans Écriture ou Design, « Apparition : Fondu en montant » se comprend et s'obtient en deux gestes, et l'aperçu la joue aussitôt.

**Pour un designer, l'outil est puissant mais son modèle ne se laisse pas deviner.** Trois idées structurent tout le mode Animation et aucune n'est dite :
- ce qui **lance** l'animation n'est pas forcément ce qui **bouge** ;
- le **temps** d'une animation est porté par ses images-clés, pas par sa « Durée » ;
- ce qu'on voit dans l'éditeur n'est **pas ce qui se passera sur le site**, puisque rien ne s'y joue seul.

Qui ne découvre pas ces trois idées bute, en particulier sur la retouche la plus courante : **ralentir une animation**. Le champ « Durée » ne la ralentit pas.

S'y ajoutent deux promesses du cadrage non tenues : **« un seul endroit pour faire bouger »** (on en compte huit) et **« voir ce qu'on règle »** pour ce qui dépend du défilement ou de la souris.

## 1. Le modèle attendu et le modèle proposé

| L'utilisateur pense | L'outil fait | Conséquence |
|---|---|---|
| « J'anime **ce titre** » (l'élément d'abord) | On pose un **déclencheur** sur un élément, puis on choisit **quels éléments bougent** (pistes). L'élément qui déclenche et les éléments animés peuvent être différents | Pour « la section entre, le titre puis le texte arrivent », il faut deviner que le déclencheur va sur la section. Rien ne l'explique : l'état vide dit seulement « Sélectionnez un élément… pour voir ce qui le déclenche ». |
| « **Durée** = la vitesse » | « Durée » allonge la ligne de temps ; le mouvement est fixé par les images-clés | Vérifié : Durée 800 → 1 600 ms, les images-clés restent à 0 et 800 ms. L'animation garde sa vitesse et ne fait qu'attendre 800 ms de plus. **L'utilisateur croit avoir ralenti, rien n'a changé.** |
| « Un délai, c'est un délai » | Deux délais : celui du **déclencheur** (« +120 ms ») et le **Départ** de chaque piste | Le délai du déclencheur est réglé dans une section repliée sous la ligne de temps ; le Départ, dans la piste. Les deux s'additionnent sans que la ligne de temps montre le premier. |
| « Au défilement, ça dépend de **où j'en suis** » | Une ligne de temps **en millisecondes** (« 1 000 ms »), parcourue par la position | Des « ms » pour un effet qui n'a pas de durée. L'aide l'explique, mais la règle, la Durée et les images-clés continuent de parler en temps. |
| « L'**aperçu**, c'est ce que je vois » | Deux aperçus : le **canevas** de l'éditeur (« Jouer dans l'aperçu ») et l'onglet **Aperçu** qui montre le vrai site | Rien ne dit qu'une apparition « à l'entrée dans l'écran » ne se vérifie que dans l'onglet Aperçu. Une aide renvoie encore à un « aperçu « Voir » » qui n'existe plus. |
| « Une animation, c'est **sur** l'élément » | Une animation est un **objet du site**, réutilisable, que des déclencheurs lancent | Utile pour réutiliser, mais « Retirer le déclencheur » (mode Animation) et « Retirer l'animation » (Design) désignent le même geste, et une animation partagée survit au retrait sans qu'on le sache. |

## 2. Parcours

Légende : ✓ clair · ◐ se comprend avec un effort · ✗ bloque ou induit en erreur.

### P1 · Débutant : « faire apparaître joliment ce titre » (Écriture)

| Étape | Ce que l'utilisateur lit | But | Action visible | Lien | Retour |
|---|---|---|---|---|---|
| Sélectionner le titre | Section « Animation » : « Faire arriver l'élément, le faire réagir au survol ou bouger en continu, en un choix. » | ✓ | ◐ (4e section, sous la mise en forme) | ✓ | — |
| Choisir « Fondu en montant » | Apparition · Au survol · En continu | ✓ | ✓ | ✓ (noms parlants) | ◐ joué une fois dans le canevas pendant qu'on regarde le menu, puis plus rien |
| Comprendre ce qui se passera | Rien ; « quand il entre dans l'écran » n'est que dans l'infobulle du libellé | ◐ | ✗ | ◐ | ✗ Une fois ou à chaque passage ? En combien de temps ? Aucun résumé |
| « lettre par lettre » | Case apparue sous Apparition | ✓ | ✓ | ✓ | ◐ |
| Plus tard, retrouver que le titre est animé | Pastille « ◆ 1 animation » en tête de l'inspecteur, si on le re-sélectionne | ◐ | ◐ | ✓ | ✗ rien sur le canevas |

**Valeur : forte, obtenue en deux gestes.** Obstacles : le résultat sur le site reste implicite (quand, combien de fois), et le retour est fugace. « Netteté » se comprend mal (c'est un flou qui devient net).

### P2 · Designer : « quand le héros entre dans l'écran, le titre monte, puis le texte, puis les boutons » (mode Animation)

| Étape | Ce que l'utilisateur lit | But | Action visible | Lien | Retour |
|---|---|---|---|---|---|
| Entrer dans le mode Animation | « Sélectionnez un élément dans l'aperçu ou dans les calques pour voir ce qui le déclenche, ou ouvrez une animation du site ci-dessous. » + « Page · Accueil » + une liste de 59 animations | ◐ | ◐ | ✗ le modèle n'est pas donné ; « déclenche » est du vocabulaire interne | — |
| Sélectionner… quoi ? | Le réflexe est de cliquer **le titre** | ✗ il fallait la colonne (l'élément qui entre dans l'écran) | — | ✗ | — |
| Ajouter un déclencheur | « Quand » (6 choix), « Animation » (**79 choix** : Nouvelle animation, 18 préréglages, 60 animations du site) | ✓ | ✓ | ◐ « Nouvelle animation (à composer) » est en tête, bien ; le reste noie | ✓ la ligne de temps s'ouvre, nommée « Animation · Texte », nom prêt à taper |
| Guide | « Composer cette animation · 1. Nommez-la ci-dessus. 2. « Choisir un élément », puis cliquez l'élément à animer… 3. Sur sa piste, « Remplir avec » un préréglage, ou placez la tête de lecture et réglez ses propriétés : les images-clés se créent. » | ✓ | ✓ | ✓ | — |
| Choisir les éléments | Bandeau : « Cliquez l'élément à animer dans l'aperçu ou les calques · Échap pour annuler » | ✓ | ✓ | ✓ | ✓ une piste apparaît |
| Leur donner un mouvement | « Remplir avec : un préréglage… » | ✓ | ✓ | ◐ « Remplir » se comprend une fois essayé | ✓ |
| Décaler | « Départ » (ms) sur la piste | ✓ | ✓ | ✓ | ✓ |
| Vérifier | Lecture dans le canevas | ✓ | ✓ | ✓ | ◐ c'est la ligne de temps qui est jouée, pas « l'entrée dans l'écran » ; rien ne propose de tester sur le site |
| Terminer | « × Fermer la ligne de temps » | ◐ | ✓ | ◐ enregistré ? appliqué ? | ◐ l'état « Enregistré » est en haut, loin ; pas de résumé de ce qui a été créé |

**Valeur : forte une fois le modèle compris**, et le guide en trois étapes porte bien le parcours dès qu'on est dans une ligne de temps. Obstacle principal, **avant** le guide : savoir sur quel élément poser le déclencheur. La liste « Animation » de 79 entrées mélange créer, appliquer un préréglage et réutiliser.

### P3 · Retoucher : « cette apparition est trop rapide, et elle part trop tard »

| Étape | Ce que l'utilisateur lit | But | Action visible | Lien | Retour |
|---|---|---|---|---|---|
| Ouvrir l'animation du titre | « À l'entrée dans l'écran · Fondu en montant · +120 ms » + « Modifier » | ✓ | ✓ | ✓ | ◐ **le titre disparaît du canevas** : la tête de lecture est à 0 ms, l'élément y est transparent |
| Ralentir | Champ « Durée » (800 ms) | ✓ | ✓ | **✗ induit en erreur** | **✗** Durée 1 600 ms : le mouvement garde sa vitesse. Il faut déplacer l'image-clé de fin (glisser, ou « Temps » après l'avoir sélectionnée) |
| Ralentir depuis Écriture ou Design | Aucun réglage de vitesse sur les choix rapides | ✓ | ✗ | — | Il faut passer au mode Animation pour un simple « plus lent » |
| Partir plus tôt | « +120 ms » lu dans la ligne de rappel ; réglable dans « Déclencheurs · … », section repliée sous les réglages | ✓ | ✗ | ◐ « Départ » de la piste est plus visible, mais c'est un autre délai | ◐ |
| Constater « Personnalisée » | Après un décalage de 20 ms, Écriture et Design affichent « Personnalisée (Fondu en montant) » | — | — | ✗ ce qui a changé n'est pas dit, ni comment revenir | — |

**Valeur : faible pour la retouche la plus courante.** C'est le parcours le plus fragile : l'utilisateur agit sur le bon champ selon son modèle, et l'outil ne fait pas ce qu'il croit.

### P4 · « Animer au défilement »

| Étape | Ce que l'utilisateur lit | But | Action visible | Lien | Retour |
|---|---|---|---|---|---|
| Choisir le mécanisme | Trois voies, sans aide pour choisir : « Au défilement » sur un élément (sa traversée de l'écran) ; « Page · … Au défilement » (la progression de toute la page, visible seulement sans sélection) ; « Parallaxe » dans Effets continus (replié) | ✓ | ◐ | ✗ | — |
| Régler la plage | « De 0 % à 100 % » + « 0 % : l'élément entre par le bas de l'écran ; 100 % : il sort par le haut. » | ✓ | ✓ | ✓ | ✓ |
| Composer | La ligne de temps parle en **ms** : « Durée 1 000 ms », règle « 0 … 1 000 » | ◐ | ✓ | ✗ le temps n'a pas de sens ici ; l'aide le dit une fois (« la position… parcourt cette ligne de temps ») | ✓ l'aperçu suit la tête de lecture |
| Vérifier | Rien ne se vérifie dans le canevas en faisant défiler ; l'aide de la parallaxe renvoie à « l'aperçu « Voir » », qui n'existe plus | ✓ | ✗ | ✗ | ✗ |
| Ce qui existait déjà | Le visuel avait déjà « À l'entrée dans l'écran · Zoom » : les deux se jouent, sans avertissement | — | — | — | ✗ |

**Valeur : réelle pour qui sait ce qu'il veut, mais le choix du mécanisme et la vérification restent à la charge de l'utilisateur.**

### P5 · « Grossir la carte au survol » (Design)

Deux chemins qui ne se connaissent pas :
- **Animations → Au survol : Grossir** (préréglage, revient quand la souris part) ;
- **État Survol + transition** en haut de l'inspecteur, avec « Pour animer un changement au survol (couleur, taille…), réglez une transition ici » dans Effets.

Les deux marchent ; aucun ne dit quand préférer l'autre. Le canevas ne permet pas de survoler « pour de vrai » : « Jouer » montre le grossissement puis un retour sec.

**Valeur : bonne, mais le doublon crée une hésitation** (« lequel est le bon ? ») et un risque de cumuler les deux.

### P6 · « Est-ce que ça rend bien sur le site ? », puis publier

- **Rien ne se joue seul dans l'éditeur**, par choix de conception. Pour voir une apparition à l'entrée dans l'écran, un défilement ou un survol réel, il faut penser à l'onglet **Aperçu** (qui, sous 1440 px, n'est plus qu'une icône).
- Aucun texte des panneaux d'animation ne mentionne cet onglet. « Jouer dans l'aperçu » désigne le canevas : le mot « aperçu » sert aux deux.
- À la publication, rien ne récapitule les animations ni ne rappelle que « réduire les animations » (réglage système des visiteurs) les coupe.

**C'est le trou principal de la boucle « régler, voir, ajuster »** pour tout ce qui dépend du visiteur : défilement, survol, entrée dans l'écran, souris.

### P7 · Retirer une animation

- Mode Animation : « Retirer le déclencheur » ; Design : « Retirer l'animation » ; Écriture : « Aucune ». **Trois mots pour un même geste.**
- Si l'animation est lancée ailleurs, elle survit au retrait ; sinon elle disparaît. L'utilisateur ne voit pas la différence.
- Annuler (⌘Z) rattrape tout, avec un libellé clair : ✓.

## 3. La valeur

### Les promesses du cadrage

| Promesse (cadrage § 1) | Tenue ? | Ce qui manque |
|---|---|---|
| **Déclencheur d'abord, composition ensuite** | ◐ Oui dans la structure | Le modèle n'est expliqué nulle part ; l'utilisateur pense « élément d'abord » et doit deviner où poser le déclencheur. |
| **On doit voir ce qu'on règle** | ◐ Oui pour le temps (tête de lecture exacte, préréglages joués) | Non pour ce qui dépend du visiteur (défilement, survol, entrée dans l'écran), ni pour la vitesse (« Durée » trompe). |
| **Un seul endroit pour faire bouger** | ✗ | Huit endroits : section Animation (Écriture), Animations (Design), Effets (transition, parallaxe, bandeau), États (survol), Interactions (afficher, masquer au clic), mode Animation, Thème → Animations, vue en carrousel. Aucun ne renvoie aux autres, sauf Interactions vers Animations. |
| **Deux publics, un même objet** | ◐ Oui techniquement | Le passage du débutant au designer (« Personnalisée », « Ouvrir dans le mode Animation ») est opaque : on ne sait pas ce qui a changé, ni comment revenir. |

### Par profil

| Profil | Vient chercher | Obtient | Moment « ça marche » | Ce qui l'en empêche |
|---|---|---|---|---|
| **Débutant** (Écriture, Design) | Un effet propre, sans réfléchir | ✓ en 2 gestes | L'aperçu joue l'apparition | Ne sait pas quand ni combien de fois elle se jouera ; ne peut pas la ralentir sans le mode Animation |
| **Designer qui compose** | Une chorégraphie sur plusieurs éléments | ✓ en ~13 gestes, une fois le modèle compris | La tête de lecture montre les trois éléments décalés | Où poser le déclencheur ; liste « Animation » de 79 entrées ; vérifier le vrai rendu |
| **Designer qui retouche** | Plus lent, plus tôt, plus doux | ◐ | La courbe et le ressort, visibles | « Durée » ne ralentit pas ; délai du déclencheur caché ; « Personnalisée » inexpliquée |
| **Effets au défilement** | Une progression liée au scroll, une parallaxe | ◐ | La plage en % bien expliquée | Trois mécanismes, pas de guide ; des ms partout ; rien à vérifier dans l'éditeur |
| **Rédacteur** (rôle) | — | Ne voit pas les animations | — | Voulu (frontière Écriture/Design) |

## 4. Constats transverses

1. **Le vocabulaire est celui du modèle, pas de l'usage.** Déclencheur, piste, image-clé, instant, départ, cible, remplir, portée, effets continus, pioche : juste et cohérent, mais l'utilisateur doit l'apprendre avant d'agir. Les titres de section (« DÉCLENCHEURS · TITRE 1… », « PISTE · … ») parlent du modèle ; les actions (« Choisir un élément », « Remplir avec », « Modifier ») parlent de l'usage, et ce sont elles qui fonctionnent.
2. **Il manque une phrase qui dit ce qui va se passer.** Nulle part on ne lit « Quand la colonne entre dans l'écran, le titre monte en 0,7 s, puis le texte, puis les boutons — une seule fois ». Cette phrase ferait le lien entre le modèle et l'intention.
3. **Le temps et la vitesse ne se règlent pas où on les cherche** : Durée qui ne ralentit pas, deux délais, ms pour le défilement.
4. **La boucle « régler, voir » s'arrête à la porte du site** : tout ce qui dépend du visiteur se vérifie ailleurs, sans que l'outil y mène.
5. **Les doublons silencieux** : deux chemins pour le survol, trois pour le défilement, des animations qui s'empilent sur un même élément sans alerte hors d'une même famille de choix rapide.
6. **Ce qui est clair et à garder** : les choix rapides et leurs noms ; le guide en trois étapes ; la pioche et son bandeau ; la ligne de rappel du déclencheur ; l'aide de la plage de défilement ; « Modifier » sur chaque déclencheur ; l'annulation.

## 5. Recommandations de parcours

Classées par effet sur la compréhension. Il s'agit de ce que l'utilisateur doit comprendre et à quel moment, pas de réglages d'interface.

| # | Recommandation | Répond à | Effet attendu |
|---|---|---|---|
| **R1** | ✅ *(fait le 13 sept.)* **Faire de « Durée » la vitesse** : changer la durée met les images-clés à l'échelle (et proposer « allonger la ligne de temps » à part, si besoin) ; ajouter une vitesse (rapide · normale · lente) aux choix rapides | P3, § 1 | La retouche la plus courante marche du premier coup |
| **R2** | ✅ *(fait le 13 sept.)* **Une phrase de résumé** en langage courant, là où l'on choisit (choix rapides) et en tête de la ligne de temps : « Quand [la colonne] [entre dans l'écran], [le titre] [monte] en [0,7 s]… une seule fois » | P1, P2, P3, § 4.2 | L'utilisateur sait ce qui se passera sur le site sans connaître le modèle |
| **R3** | **Dire le modèle à l'entrée du mode Animation** en trois temps (« Quand… · Qu'est-ce qui bouge · Comment ») et proposer d'emblée « Animer l'élément sélectionné » ; au moment d'ajouter un déclencheur, préciser « c'est l'élément qui lance l'animation ; vous choisirez ensuite ce qui bouge » | P2, § 1 | Le déclencheur n'est plus posé au mauvais endroit |
| **R4** | **Boucler vers le vrai rendu** : « Tester sur le site » près de chaque animation (ouvre l'Aperçu sur la bonne page, idéalement à la bonne hauteur) ; appeler le canevas « canevas » et réserver « Aperçu » à l'onglet | P4, P5, P6 | La boucle « régler, voir » couvre le défilement, le survol et l'entrée dans l'écran |
| **R5** | **Un seul délai visible** : montrer le délai du déclencheur dans la ligne de temps (comme un départ général) et le régler là | P3 | Plus de délai caché qui s'additionne |
| **R6** | **Au défilement, parler en % de défilement** : règle, durée et images-clés en positions ; et, au moment de choisir « Au défilement », aider à choisir entre l'élément, la page et la parallaxe | P4 | L'effet au scroll se pense comme on le vit |
| **R7** | **Relier les endroits qui font bouger** : chaque section renvoie aux autres pour ce qu'elle ne fait pas (« afficher au clic : Interactions », « grossir au survol : ici ou via l'état Survol, et la différence ») ; à terme, la fusion prévue par le cadrage | P5, promesse 3 | L'utilisateur cesse d'hésiter entre deux chemins |
| **R8** | **« Personnalisée » explicable et réversible** : dire ce qui a changé (« départ décalé de 20 ms »), proposer « Revenir au préréglage », ignorer un simple décalage | P3, promesse 4 | Le passage débutant → designer ne fait plus peur |
| **R9** | **Signaler les animations empilées** sur un même élément, quelle que soit la voie, au moment où on en ajoute une | P4, § 4.5 | Plus d'effets cumulés par erreur |
| **R10** | **Ouvrir une apparition sur son état visible** (tête de lecture à la fin, ou fantôme de l'état de repos) plutôt qu'à 0 ms où l'élément disparaît | P3 | L'utilisateur ne croit plus avoir fait disparaître son titre |
| **R11** | **Un mot par geste** : « Retirer l'animation » partout (et dire si elle reste utilisée ailleurs) ; renommer « Netteté » (« Flou qui s'efface ») ; corriger la mention de l'aperçu « Voir » | P1, P7 | Moins d'hésitation sur les mots |

**Pour confirmer avant d'engager R1 à R4**, un essai court (30 minutes, 2 ou 3 personnes, sans aide) sur trois consignes suffit : « faites apparaître ce titre », « faites arriver le titre puis le texte quand la section entre à l'écran », « rendez cette apparition deux fois plus lente ». Chaque consigne mesure une des idées non dites du modèle.
