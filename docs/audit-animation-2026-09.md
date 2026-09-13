# Audit d'usage n°3 : composer des animations dans le mode Animation

Étape 7 du cadrage `docs/cadrage-animation.md`. Audit mené le 13 septembre 2026 par l'agent (Claude), dans le navigateur intégré, sur une copie des données fichiers de « Maison Aurèle » (serveur d'essai isolé, sans Supabase). Il fait passer trois scénarios par l'interface et note ce qui bloque, coince ou demande de deviner. **Il ne remplace pas un essai réel par un designer** : l'aisance du geste, la lisibilité de la ligne de temps et la densité du panneau restent à juger par Antoine.

## Verdict

**Les trois scénarios aboutissent depuis l'interface, sans code.** Le débutant pose une apparition lettre par lettre en deux choix. Le designer compose l'arrivée du héros sur trois éléments décalés et la voit exactement à chaque instant. La page reçoit une animation liée à son défilement, jouée de la même façon sur le site rendu.

Corrigé pendant l'audit (dans le même lot que l'étape 7) :

1. Remettre une transformation ou un filtre au neutre sur une image-clé **retirait** la propriété au lieu d'écrire `none` : une image-clé intermédiaire qui revenait au neutre était sautée par l'interpolation.
2. Les préréglages écrivent `translateY(28px)` : Effets affichait un champ de texte brut au lieu des champs Décalage.
3. On ne pouvait placer une image-clé ou une piste qu'**au glisser** : pas de temps exact (« le texte part à 150 ms »). Ajout de « Temps » sur l'image-clé et « Départ » sur la piste.
4. « Nouvelle animation vide » créait une piste sur l'élément porteur, à retirer dès qu'on animait ses enfants : elle part désormais sans piste.
5. Un élément qui a déjà sa propre animation (les apparitions migrées de Maison Aurèle) la joue **en plus** d'une composition, sans le dire : avertissement sous « Ajouter ».
6. La bibliothèque listait 59 animations dont une majorité « Fondu en montant » : chacune porte maintenant l'élément et la page qui la lancent.
7. « Effets continus » s'intercalait entre les déclencheurs et la ligne de temps : section repliable, fermée par défaut.

Ce qui coinçait encore, par ordre d'importance (**tous traités le 13 septembre, voir « Reprise » en fin de document**) :

8. **Le panneau change de contexte quand on choisit un élément à ajouter.** Pour ajouter le titre à une ligne de temps, on le sélectionne dans l'aperçu : le haut du panneau affiche alors *ses* déclencheurs et la ligne de temps descend (plus de 300 px dans le scénario 2). Pistes : replier les déclencheurs de l'élément tant qu'une ligne de temps est ouverte, ou garder la ligne de temps en haut du panneau.
9. **Quatre réglages par élément** pour un mouvement simple (opacité et décalage au départ, puis à l'arrivée). Piste : « Remplir la piste avec un préréglage » (Fondu en montant, Zoom…) qui pose ses images-clés à partir du départ de la piste, à retoucher ensuite.
10. **Sélectionner un conteneur** (la colonne de texte du héros) depuis l'aperçu : un clic prend l'élément le plus profond ; il faut passer par les calques ou la flèche gauche. Vrai dans tout l'éditeur, plus sensible ici où l'on pose les déclencheurs sur des conteneurs.
11. **Les homonymes restent** quand les éléments ne sont pas nommés (« Paragraphe · Accueil » deux fois) : nommer les calques, ou ajouter un extrait du texte au libellé.
12. **L'aperçu ne montre pas les pistes sur le canevas** (seulement dans les calques) : pas de repère sur l'élément animé ni de chemin de mouvement. Hors v1 pour le déplacement direct (cadrage § 4.1), mais un contour discret des cibles de la ligne de temps aiderait.
13. Rien n'empêche deux choix rapides de la même famille posés par des voies différentes (choix rapide puis déclencheur ajouté à la main dans le mode Animation) : la liste des déclencheurs les montre, sans avertir.

Observations sans défaut du produit :

- Dans le navigateur intégré **masqué**, `requestAnimationFrame` ne tourne pas et le document ne défile pas : ni la lecture ni le défilement ne s'y observent (CLAUDE.md le signale pour les minuteries). Le défilement de la page a été mesuré en relançant le script du site avec un `requestAnimationFrame` immédiat.
- Le serveur de développement journalise parfois « The destination stream closed early » quand on recharge l'éditeur pendant un rendu en flux ; sans effet visible, à surveiller.

## Scénario 1 · Le débutant, en Écriture

Sélectionner un surtitre (« Cette saison »), section Animation : Apparition « Fondu », case « lettre par lettre » ; Au survol « Soulever ». Deux déclencheurs, deux animations à cible relative, décalage de 30 ms par lettre. En Design, la même section liste les deux déclencheurs avec « Jouer ». Après une retouche de l'opacité à 300 ms dans le mode Animation, le choix s'affiche « Personnalisée (Fondu) » en Écriture comme en Design ; ⌘Z le rend à son préréglage. **Aucune friction notable.**

## Scénario 2 · Le designer compose l'arrivée du héros

« Quand la colonne de texte entre dans l'écran, le titre monte, puis le texte, puis les boutons. »

1. Sélectionner la colonne (clic sur le titre, flèche gauche : point 10), mode Animation, « Ajouter un déclencheur » : À l'entrée dans l'écran, Nouvelle animation vide.
2. Pour le titre, le texte et les boutons : le sélectionner dans l'aperçu (point 8), « Ajouter « … » » (avertissement : ils ont déjà leur Fondu en montant, point 5), à 0 ms opacité 0 et décalage vertical 28, à 600 ms opacité 100 et décalage 0 (point 9) ; Départ 150 ms pour le texte, 300 ms pour les boutons.

Résultat : trois pistes `node`, images-clés à 0/600, 150/750, 300/900 ms, retour au neutre écrit `none`. À 300 ms l'aperçu montre le titre à 80 % d'opacité et 5,5 px de décalage, le texte à 41 % et 16,6 px, les boutons encore au départ. Une quinzaine de gestes au total, dont douze réglages de valeurs.

## Scénario 3 · Une animation liée au défilement de la page

Sans sélection, section « Page · Accueil » : Au défilement, Nouvelle animation vide ; sélectionner le titre du héros, l'ajouter, rotation −8° à 1 000 ms. L'aperçu montre −6,4° à 500 ms. Sur le site rendu (moteur réel), un défilement à 0, 25, 50 et 100 % de la page place la ligne de temps à 0, 250, 500 et 1 000 ms, titre à −8° en bas de page. La plage se règle en pourcentages expliqués (« 0 % : haut de la page »). **Aucune friction notable**, sinon le point 8 quand on sélectionne l'élément.

## Ce qui a très bien marché

Le geste « se placer, régler, l'image-clé existe » ; l'aperçu exact à la tête de lecture, lettres décalées comprises ; les pastilles ◆ ◇ ○ ; le glisser et le ⌥-glisser d'images-clés ; le ressort avec son temps de stabilisation et « Caler le segment » ; la fermeture automatique de la ligne de temps après ⌘Z ou un retrait ; l'ouverture d'une animation d'une autre page qui y emmène ; les marges liées écrites en une fois dans l'image-clé.

## Reprise du 13 septembre 2026 : points 8 à 13, et créer une animation

Recommandations retenues par Antoine, mises en œuvre et vérifiées sur la même copie des données :

- **Créer une animation** (question d'Antoine : « je choisis Nouvelle animation vide, mais ensuite comment je la modifie, la renomme ? ») : l'option était en bas d'une liste de plus de soixante entrées et la ligne de temps s'ouvrait tout en bas du panneau. Désormais « Nouvelle animation (à composer) » est en tête et choisie par défaut ; la ligne de temps s'ouvre en haut du panneau, nom sélectionné (on tape, Entrée), rappel du déclencheur, guide en trois étapes tant qu'il n'y a pas de piste.
- **8, contexte du panneau** : quand une ligne de temps est ouverte, elle passe devant ; les déclencheurs de l'élément et de la page se replient sous elle. Et **pioche** : « Choisir un élément », bandeau sur l'aperçu, clic dans l'aperçu, les calques ou le fil d'Ariane, Échap pour annuler ; la sélection ne change pas. Vérifié : « Arrivée du héros » composée sur le titre, le texte et les boutons sans quitter la sélection de la colonne.
- **9, quatre réglages par élément** : « Remplir avec » un préréglage sur la piste (ses images-clés à partir du départ), puis « Départ » ; trois pistes composées en neuf gestes (choisir, remplir, départ).
- **10, conteneurs** : fil d'Ariane de la sélection en haut du panneau de droite, dans tous les modes ; il sert aussi de pioche.
- **11, homonymes** : un texte sans nom est désigné par un extrait (« Titre 1 « Le goût de l'Auvergne… » »), dans les calques, le fil d'Ariane, les pistes et la bibliothèque.
- **12, repère dans l'aperçu** : cadre pointillé et nom autour de l'élément de la piste active ; l'avertissement « a aussi ses propres animations » suit la piste active (avec la pioche, l'élément n'est plus sélectionné).
- **13, doublons** : badge « en double » sur le deuxième déclencheur d'une même famille (apparition, survol, continu), en Design et dans le mode Animation.
