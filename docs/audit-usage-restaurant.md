# Audit d'usage n°2 : reconstruire « Maison Aurèle » depuis l'éditeur

Le site restaurant a d'abord été écrit en code dans le modèle (`packages/model/src/sample-restaurant.ts`). Cet audit le reconstruit depuis un site vierge, uniquement avec les outils d'Atelier (navigateur intégré, serveur d'essai en mode fichier), et note tout ce qui bloque, coince ou demande du code. Mené le 9 septembre 2026.

## Verdict

**Le site se reconstruit depuis l'éditeur, sans code, à trois exceptions près.** Thème, deux bases importées du CSV, quatorze images, sept pages (accueil avec héros, présentation, plats signature filtrés, événements, témoignages en composant à propriétés, appel à l'action ; carte en quatre catégories ; événements ; page par événement ; réservation à sept champs ; la maison avec questions dépliables ; 404), en-tête à trois liens, apparitions au défilement, publication : tout a été fait par l'interface, version 227 publiée et contrôlée sur les sept adresses.

Ce qui n'a **pas** pu être fait depuis l'interface :

1. **Le mode sombre par défaut** : aucun réglage ; le site s'est publié en clair alors que tout a été dessiné en sombre.
2. **Les ancres** (`#entrees`, `#plats`) : le panneau Lien sait viser une ancre, aucun panneau ne permet d'en poser une.
3. **Les textes composés** (« 26 € », un champ suivi d'une unité) : un texte relié à un champ affiche le champ seul.

Ce qui coince le plus, par ordre d'importance :

4. « Ajouter » pose les sections **après le pied de page** ; il faut remonter chaque section ou redescendre le pied de page. Avec une sélection, le bloc va *dans* la sélection : trois liens d'affilée se nichent l'un dans l'autre.
5. La **carte par défaut** d'une vue lie `cover` et `title` de l'exemple photographe, pas les champs de la base choisie.
6. **Entrée ne valide pas** les petits formulaires (nouvelle page, nom du composant, police).
7. Le bloc **Questions fréquentes** est statique ; le rendre dépliable demande trois gestes par question, dont nommer chaque réponse.
8. Pas de bloc **Champ de formulaire** dans Ajouter ; la duplication d'un champ garde la même clé.
9. Les **calques** nomment « Champ » tous les champs et « Vue · Plats » une vue passée à Événements ; le libellé d'un bouton n'est modifiable que par son enfant.
10. **Apparitions** : trois gestes par élément, la section est repliée en bas de l'inspecteur.
11. Pas de style partagé **Carte** dans un site vierge ; titre SEO d'une page modèle = nom de la page (« Événements ») au lieu du titre de l'entrée. (Le choix de l'entrée d'aperçu d'un modèle existe bien, dans la barre du haut : point retiré.)

**Reprise du 10 septembre 2026 : les onze points sont corrigés, voir § 18.**

Un bug de l'éditeur a été trouvé et corrigé pendant l'audit (élément à apparition invisible dans l'aperçu tant qu'on ne rechargeait pas).

Ce qui a très bien marché : import CSV avec correspondance des colonnes, filtres et tris des vues, liaisons champ par champ, création d'un composant à propriétés depuis la sélection, copier-coller de sections entre pages, duplication ⌘D, page par entrée, formulaire et son destinataire, publication et page 404 depuis la même fenêtre.

## Journal de construction

### 1. Site vierge et thème

- Création depuis le tableau de bord : sans accroc.
- Couleurs : les quatorze valeurs (sept rôles × clair/sombre) se saisissent en hexadécimal, sans accroc.
- **Bloque** : aucun réglage du mode par défaut du site (clair ou sombre). Le restaurant est sombre par défaut ; impossible depuis l'interface, seul l'aperçu bascule (icônes soleil/lune). → à ajouter dans Thème → Couleurs.
- **Coince** : dans « Polices chargées », Entrée dans le champ n'ajoute pas la police, il faut cliquer « Ajouter ».
- **Coince** : une police chargée ne se retire pas (Cormorant Garamond et Work Sans restent chargées, donc téléchargées par les visiteurs, alors que le site ne les utilise plus).
- Rôles de police (display, body) : saisie en texte libre de la pile CSS ; ça marche mais un choix parmi les polices chargées serait plus juste.

### 2. Base « Plats »

- Création de la base : la case « une page par entrée » est cochée par défaut ; décochée (ou non, voir plus bas), une page modèle `/plats/…` a quand même été créée. **À vérifier** : la case n'a pas été prise en compte, ou l'outil de test ne l'a pas décochée. Dans les deux cas, pour une base de plats on ne veut pas de page par entrée : il faudra supprimer la page modèle à la main.
- Champs : renommer « Titre » en « Nom », ajouter Description (texte), Prix (nombre), Catégorie (choix, quatre options séparées par des virgules), Étiquettes (choix multiples), Photo (image), Disponible (oui/non) : sans accroc, un éditeur clair par champ.
- Import CSV : les colonnes sont reconnues d'après les libellés (Nom, Description, Prix, Catégorie, Étiquettes, Ordre), les choix et choix multiples convertis par libellé, 14 lignes importées en un clic. Très bien.
- **Coince** : les valeurs des choix sont dérivées des libellés (`entrees`, `plats`…), ce qui est ce qu'il faut ; mais on ne les voit nulle part dans l'éditeur de champ, or ce sont elles qu'on retrouve dans les filtres de vue.
- **Coince (moi, pas l'outil)** : les 14 plats sont arrivés en brouillon et j'ai cliqué 14 pastilles pour les publier, alors que le dialogue d'import a un choix « Brouillons / Publiées » que je n'avais pas vu. Il est en bas du dialogue, sous l'aperçu des lignes : à remonter à côté du bouton « Importer », et la question « brouillon par défaut ? » mérite d'être posée pour un import (on importe rarement des brouillons).
- Pas d'action « tout publier » ni de sélection multiple dans le tableur : connu (revue, hors v1), mais l'import le rend plus visible.

### 3. Base « Événements »

- Créée avec « une page par entrée » : la page modèle `/evenements/{slug}` apparaît dans Pages sous « Pages par entrée ». Sept champs ajoutés dans la foulée (date, texte, texte long, image, nombres) : sans accroc.
- Import CSV avec « Publiées » : 4 entrées, dates et nombres convertis, adresse reprise du fichier. Sans accroc.
- **Coince** : la clé technique d'un champ est dérivée du libellé (« Date affichée » → `date-affichee`, « Résumé » → `resume`) sans que l'éditeur de champ la montre ni permette de la choisir ; on la découvre dans les liaisons (« Contenu vient du champ… ») et l'export CSV. Pour un développeur qui reprend l'export, mieux vaut la voir et pouvoir la fixer à la création.

### 4. Images

- Bibliothèque : import de 14 fichiers d'un coup, déclinaisons produites, noms déduits des fichiers (« assiette du soir »). Sans accroc.
- **Coince** : pas d'import par adresse (URL) ; il faut des fichiers locaux. Pour un designer qui maquette avec des images de banque, une adresse collée serait plus rapide.
- Le nom déduit d'un fichier `assiette-du-soir.jpg` donne « assiette du soir », sans majuscule : à capitaliser.
- Photos des entrées : « Choisir… » dans la cellule ouvre la bibliothèque, double-clic sur la vignette. Deux gestes par entrée, huit entrées : correct, mais l'import CSV pourrait accepter une colonne « Photo » qui retrouve l'image par son nom dans la bibliothèque (le dialogue dit « les images se posent ensuite depuis la bibliothèque » : c'est là que ça se joue).

### 5. Pages

- Suppression de la page modèle « Plats » (créée malgré moi) : confirmation claire, la base reste. Sans accroc.
- **Coince (récurrent)** : dans les petits formulaires de création (nouvelle page, nom du composant, police), Entrée ne valide pas, il faut cliquer le bouton. Le champ de saisie garde sa valeur localement et ne la transmet qu'au blur : la soumission part avec un nom vide. À corriger dans `TextInput` (valider la valeur locale à Entrée avant que le formulaire ne parte).

### 6. Page d'accueil : poser les sections

- **Bloque presque** : « Ajouter » pose le bloc « à la fin de la page », c'est-à-dire **après le pied de page**. Chaque section ajoutée doit ensuite être remontée (bouton Monter) ou le pied de page redescendu. Avec un élément sélectionné, le bloc va *dans* la sélection si c'est un conteneur : pour poser cinq sections d'affilée il faut désélectionner (Échap) entre chaque. Règle attendue : une section se pose avant le pied de page (dernier enfant de type instance « Pied de page ») ; un bloc de contenu se pose après la sélection, pas dedans, sauf si la sélection est vide.
- Les sections prêtes (Héros, Texte et image, Trois points forts, Appel à l'action, Questions fréquentes) sont un vrai gain : une page se dessine en cinq clics.

### 7. Textes, liens, images du héros

- Texte : sélection dans les calques, zone « Texte » de l'inspecteur ; ou double-clic dans l'aperçu. Sans accroc.
- Image : le sélecteur montre les huit plus récentes ; « Toutes les images (14)… » ouvre la bibliothèque, double-clic pour poser. Sans accroc.
- Lien : cible « Page du site » puis choix de la page. Sans accroc.
- **Coince** : le libellé d'un bouton n'est pas modifiable depuis le lien lui-même : il faut déplier le lien dans les calques, sélectionner son enfant « Texte », puis modifier. Le panneau Lien devrait proposer le libellé quand l'enfant unique est un texte.
- **Coince** : dans les calques, la flèche droite du clavier déplie bien, mais rien ne signale qu'un lien a un enfant (pas de chevron avant dépliage sur ces lignes).

### 8. Vue de base de données sur l'accueil

- « Vue de base de données » posée dans la section sélectionnée : elle prend la première base du site, une grille de trois colonnes et une carte (image + texte). Bon départ.
- **Bloque** : la carte par défaut lie son image au champ `cover` et son texte au champ `title` **de l'exemple photographe**, pas aux champs de la base choisie. Sur « Plats », l'image reste vide tant qu'on ne relie pas le champ « Photo » à la main. La carte par défaut doit se construire d'après la base : premier champ image, champ titre, premier texte court.
- Filtre : « Étiquettes · contient · Signature » se règle avec trois listes (champ, opérateur, valeur proposée d'après les options du champ), tri par « Ordre », limite 3 : sans accroc, et l'aperçu montre les trois cartes tout de suite.
- Carte : image reliée au champ « Photo » par la liste « Choisie à la main / Photo » ; deux paragraphes ajoutés dans la carte (Ajouter → Paragraphe, avec la carte sélectionnée) puis reliés à « Prix » et « Description » par la liste « Texte saisi ici / champ ». Sans accroc.
- **Bloque** : un texte composé (« 26 € », un prix suivi d'une unité) est impossible depuis l'interface : un paragraphe relié à un champ affiche le champ seul. Le modèle le permet (segment lié dans un texte) et le site codé s'en sert pour les prix ; il faut un moyen d'insérer un champ dans un texte (par exemple « / » puis « Champ… » en mode Écriture, dans une carte ou un modèle de page).
- Le sélecteur d'image d'un élément lié montre un second choix « Nom » (le texte alternatif tiré d'un champ) sans le dire : à libeller « Texte alternatif ».

### 9. Événements et témoignages (composant)

- Vue des événements : base changée dans la liste, tri par Date, limite 3 ; carte : image reliée à Photo, deux paragraphes reliés à « Date affichée » et « Résumé », un lien texte relié à « La page de l'entrée ». Sans accroc : le lien vers la page par entrée est bien proposé.
- **Coince** : le nom du calque de la vue reste « Vue · Plats » après avoir changé la base pour Événements ; il faut le renommer à la main. Le nom déduit devrait suivre la base tant qu'il n'a pas été saisi.
- **Coince** : la carte de la vue événements n'est pas cliquable en entier (le lien est un élément à part) ; pour envelopper la carte dans un lien il faudrait déplacer les éléments dans un lien, ce que le glisser-déposer permet en principe mais que je n'ai pas tenté ici.
- Composant : « Trois points forts » → colonne 1 renommée et réécrite, « En faire un composant… » (section Élément), nom « Témoignage », puis « Modifier le composant » → deux propriétés (Citation, Auteur) ajoutées, reliées au titre et au paragraphe par « Propriété du composant », retour à la page, deux instances ajoutées depuis Ajouter → Composants, valeurs saisies dans la section Composant de l'instance. **Sans accroc, et c'est le meilleur moment de l'audit** : le flux est court et lisible.
- Détail : les champs de valeurs d'une instance n'ont pas de texte d'aide quand la propriété n'a pas de valeur par défaut ; on ne voit que deux champs vides sous « Composant · Témoignage ». Les libellés sont là, mais un placeholder reprenant le contenu de la définition aiderait.

### 10. Interactions, appel à l'action, première publication

- Appel à l'action : titre, texte et bouton (cible « Page du site » → Réserver, libellé via l'enfant texte). Sans accroc.
- Apparitions : section Interactions de l'inspecteur → liste « Apparition » (fondu en montant, zoom…) : posées sur le titre du héros, la photo, les deux vues. Sans accroc, mais **coince** : la section Interactions est repliée par défaut et tout en bas de l'inspecteur ; poser une apparition, c'est sélectionner, faire défiler, déplier, choisir. Trois gestes de trop quand on veut animer dix éléments. Idée : une commande de palette « Apparition… » et un raccourci pour appliquer la même apparition à la sélection suivante.
- Mode par défaut : le site s'est publié en mode **clair** alors que tout a été réglé en aperçu sombre (rappel du bloquant n°1).
- Publication : « Créer la page introuvable » puis « Publier maintenant » depuis la même fenêtre, version 141, page 404 servie. Sans accroc.

### 11. Page « La carte »

- Poser les sections de catégories *dans* « Contenu principal » (sélectionné) évite le problème du pied de page : chaque bloc ajouté va à la fin du conteneur sélectionné. C'est le geste à recommander, et « Ajouter » devrait le faire par défaut quand rien n'est sélectionné (dernier enfant de `main`, pas de la page).
- **Bloque** : aucun champ « Ancre » sur un élément (le modèle a `props.anchor`, le site codé s'en sert pour `#entrees`, `#plats`…) alors que le panneau Lien propose la cible « Ancre ». On peut viser une ancre mais pas en poser une. À ajouter dans Élément, sous la balise.
- Section « Entrées » complète (nom, titre, sous-titre, vue en liste filtrée « Catégorie = Entrées », triée par Ordre, carte sans image avec nom, prix, description), puis **⌘D trois fois** et, dans chaque copie : nom, titre, valeur du filtre. Quatre sections en une trentaine de gestes : correct.
- **Coince** : renommer un calque avec Entrée (annoncé dans l'aide de la sélection : « Entrée pour renommer ») n'a pas pris depuis l'outil de test ; à vérifier à la main. Le chemin Élément → Nom fonctionne.
- La vue en liste est rendue en une colonne d'éléments empilés, sans style de « ligne de carte » ; il n'existe pas de style partagé « Carte » dans un site vierge, contrairement au site codé. Un site vierge devrait naître avec un style « Carte » (fond de surface, bord, arrondi, survol) en plus de Bouton, Section, Conteneur.

### 12. Page « Événements » et copier-coller entre pages

- ⌘C sur la section « Événements » de l'accueil, ⌘V sur la page Événements : la section entière arrive (titre, vue, carte, liaisons). Copier-coller entre pages fonctionne et fait gagner beaucoup ; il collerait mieux *après* la sélection quand celle-ci est un conteneur vide de sens (« Contenu principal » a reçu la section comme voisine, pas comme enfant : acceptable).
- **Bug trouvé et corrigé pendant l'audit** : dans l'éditeur, un élément qui recevait une apparition disparaissait de l'aperçu (opacité 0) tant qu'on ne rechargeait pas : le script des interactions ne tourne qu'au chargement, et l'aperçu est rendu par React sans rechargement. L'éditeur pose maintenant l'état d'arrivée après chaque rendu (`applyInstantStates`), et n'injecte plus le script du site dans l'aperçu (ce qui supprime aussi un avertissement d'hydratation de React).

### 13. Page par entrée « Événement »

- La page modèle naît avec le titre relié à l'entrée et s'aperçoit avec la première entrée (« Brunch des producteurs »). Deux paragraphes, une image, un paragraphe et un bouton ajoutés dans le contenu principal (Ajouter, avec le conteneur sélectionné), reliés un par un (« Date affichée », « Résumé », Photo, « Programme ») par la liste « Texte saisi ici / champ » ou « Choisie à la main / Photo ». Sans accroc.
- **Coince** : un champ « texte long » relié à un paragraphe s'affiche en paragraphes empilés, ce qui est bien, mais rien ne le dit au moment de relier ; et l'aperçu ne montre pas les entrées sans programme (le champ est vide pour celles importées du CSV). À la saisie d'un texte long dans le tableur, la cellule propose des paragraphes : très bien.
- **Coince** : pas moyen de choisir *quelle* entrée sert à l'aperçu du modèle (toujours la première). Un sélecteur d'entrée dans la barre de l'aperçu manque (il existait dans le cadrage : « sélecteur d'entrée »).

### 14. Page « Réserver » (formulaire)

- **Coince** : l'onglet Ajouter ne propose pas de bloc « Champ » (le panneau Formulaire dit pourtant « Ajoutez des champs avec « / » ou l'onglet Ajouter »). Pour ajouter téléphone, date, service et nombre de personnes au formulaire de base (nom, email, message), il faut dupliquer un champ existant (⌘D) et changer sa sorte, ou passer par « / » en mode Écriture. À ajouter dans Ajouter → Données : « Champ de formulaire ».
- Bloc « Formulaire » posé dans le contenu principal : nom, email, message, bouton, identifiant de formulaire attribué, destinataire saisi dans le panneau Formulaire. Sans accroc.
- **Coince** : dans les calques, les champs s'appellent tous « Champ » ; le libellé (« Votre nom », « Votre email ») devrait servir de nom déduit, comme le texte des boutons sert aux liens.
- Champs supplémentaires par ⌘D sur le champ email : les copies gardent la **même clé `email`** ; tant qu'on ne la change pas, deux champs du formulaire s'écrasent à l'envoi. La duplication d'un champ devrait dériver une clé unique (`email-2`), comme les adresses de pages.

### 15. Page « La maison » (histoire, équipe, questions)

- Trois sections prêtes posées d'un coup (Texte et image, Trois points forts, Questions fréquentes), puis pied de page redescendu trois fois (rappel du bloquant « fin de page »).
- **Coince** : le bloc « Questions fréquentes » est statique : les réponses sont visibles en permanence et aucune interaction n'est posée. Pour obtenir des questions dépliables il faut, par question : nommer la réponse (les cibles d'interaction doivent être des éléments nommés), la masquer au chargement, puis ajouter sur la question « Au clic → afficher / masquer → Réponse ». Le bloc devrait naître ainsi (réponses nommées et masquées, interaction posée), et le panneau Interactions devrait accepter comme cible « l'élément suivant » sans nom.
- Question dépliable faite à la main sur la question 1 : réponse nommée « Réponse 1 » (Élément → Nom), « Au chargement : masqué » (Interactions), puis sur la question « Au clic → Afficher / masquer → Réponse 1 → Ajouter l'interaction ». Ça marche, et la réponse disparaît aussitôt de l'aperçu de l'éditeur (masquée au chargement), ce qui la rend difficile à sélectionner autrement que par les calques : l'éditeur devrait montrer les éléments masqués au chargement en transparence plutôt que les cacher.

- Titre SEO de la page par entrée : « Événements · Maison Aurèle », c'est-à-dire le nom de la page modèle ; le site codé utilise `{title}`. **Coince** : le modèle de page devrait proposer `{title}` par défaut, ou le réglage « Titre SEO » devrait expliquer la composition `{champ}`.

### 16. En-tête (composant partagé)

- « Ouvrir » sur l'instance En-tête dans les calques → on édite le composant, bandeau « toutes ses copies changent ». Un lien texte ajouté dans « Navigation » (cible Page du site → La carte, libellé par l'enfant texte), puis ⌘D deux fois et ajustement des copies (page, libellé). Sans accroc.
- **Coince (rappel)** : ajouter trois liens à la suite dans le même conteneur oblige à re-sélectionner le conteneur entre chaque ajout, sinon le lien suivant se pose *dans* le lien précédent (un lien est un conteneur). Duplication ⌘D puis ajustement reste le chemin le plus court.
- Non fait faute de temps : la variante « fond transparent / plein » de l'en-tête. Le flux composant → variantes a été validé sur le site codé (session précédente) et sur « Témoignage » ici (propriétés) ; les variantes depuis l'interface restent à vérifier par un vrai designer.

### 17. Publication finale

Version 227 publiée depuis la fenêtre Publier. Contrôle des sept adresses : accueil (4 apparitions, 2 vues, 3 liens de navigation), carte (4 vues filtrées), événements (1 vue), page événement, réservation (7 champs nommés name, email, phone, date, service, people, message), la maison (question 1 masquée et dépliable), 404.

### 18. Reprise du 10 septembre : zéro écart avec le site codé

Demande : plus aucune différence entre « Maison Aurèle » (codé) et « Maison Aurèle (audit) », tout faisable depuis l'outil, et explorer carrousels, parallaxe et compagnie.

Ce qui a été corrigé dans l'éditeur, point par point : (1) Thème → « Mode par défaut » ; (2) Élément → « Ancre », et le panneau Lien liste les ancres du site ; (3) Données → « Avant » / « Après » autour d'un champ (« 26 € ») ; (4) placement : sans sélection avant le pied de page, une section toujours au niveau de la page, jamais dans un lien ; (5) carte par défaut construite d'après la base, reliée à nouveau quand la base change (et renommée « Vue · … ») ; (6) Entrée valide bien les petits formulaires (ils sont de vrais `form` ; l'échec venait de l'outil de test) ; (7) bloc Questions fréquentes dépliable d'emblée, et « Décaler les voisins » pour les cascades ; (8) bloc « Champ de formulaire », clé unique à l'ajout et à la duplication ; (9) calques : un champ porte son libellé, un lien montre son libellé dans le panneau Lien, une vue est renommée quand sa base change ; (10) apparitions par la palette ⌘K en un geste, cascade en un clic ; (11) styles « Carte » et « Étiquette » dans un site vierge, titre SEO `{titre}` des pages par entrée. En route : la section CSS brut ne montrait pas les propriétés de l'état choisi (survol…) ; dupliquer une question gardait la réponse d'origine pour cible (corrigé dans le modèle, testé) ; l'aperçu « Voir » jouait les scripts deux fois (mode strict de React) et signalait un écart d'hydratation (scripts injectés après l'hydratation, garde d'idempotence).

Exploration livrée, dans l'inspecteur : **parallaxe** (Effets, photo du héros à 0,15), **bandeau défilant** (Effets, boîte « Bandeau » sous le héros, six mentions en boucle, 28 s), **carrousel automatique** (vue Événements de l'accueil, disposition Défilement, 4 s, pause au survol), **compteurs** (Interactions → Compteur sur la valeur du composant « Chiffre » : 12, 38, 14). Le modèle codé a reçu les mêmes réglages pour rester la référence de ce que l'éditeur produit.

Puis le site d'audit a été remis au niveau du site codé, uniquement avec les commandes de l'éditeur (clavier et souris n'ayant pas passé le panneau du navigateur intégré, chaque geste a été déclenché par script sur les vrais boutons, champs et listes de l'inspecteur — même chemin de code, mêmes opérations qu'un clic) : mode sombre par défaut ; accueil (cascade du héros, pastille « Bib Gourmand », bandeau, section « La maison » avec surtitre et trois chiffres en composant à propriétés, en-têtes de section « surtitre + titre + bouton », cartes « Carte » et « Image · zoom au survol » en styles partagés, prix « {prix} € », carrousel automatique, témoignages avec rôle, bandeau réservation en composant à variante « ton ») ; carte (surtitre, quatre étiquettes-ancres, quatre sections en grille 1/3 – 2/3 à titre collant, cartes en ligne nom + prix, fonds alternés) ; événements (surtitre, intro, cartes complètes avec prix) ; page par entrée (deux colonnes, étiquettes prix et places, photo zoomée, section Programme sur fond de surface, retour) ; réservation (deux colonnes, horaires, formulaire en carte à deux colonnes, « Demander une table ») ; la maison (histoire, équipe avec photos, quatre questions dépliables, bandeau) ; 404 ; en-tête (logo, liens « Lien de navigation », bouton Réserver, collant et flouté, variante « fond » transparent / plein choisie sur chaque page) ; pied de page en trois colonnes ; titres et descriptions SEO ; deux redirections. Version 1268 publiée et contrôlée : mode sombre, ancres, prix, parallaxe, bandeau, compteurs, carrousel automatique, questions qui s'ouvrent et se ferment, redirection `/carte` → `/la-carte` en 301.

Inventaire comparé (script sur les deux documents) : mêmes pages, mêmes apparitions (18 à 20 sur l'accueil, 12 sur la carte, 4 sur les événements, 9 sur la page par entrée, 5 sur la réservation, 16 + 4 questions sur la maison), mêmes ancres, mêmes textes composés, mêmes vues (dont le carrousel automatique), mêmes styles partagés (dix), mêmes composants (en-tête à variante, pied de page, témoignage à trois propriétés, chiffre, bandeau à variante), deux redirections des deux côtés. Les survols (cartes qui se soulèvent, images qui zooment, liens qui se colorent) vivent dans les styles partagés côté audit, dans les nœuds côté codé : même rendu.
