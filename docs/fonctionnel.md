# Atelier · document fonctionnel et technique

Ce que l'outil fait aujourd'hui, et comment. Tenu à jour à chaque évolution (règle dans `CLAUDE.md`). Les décisions de fond sont dans `docs/decisions.md`, le contrat de données dans `docs/document-model.md`, le plan dans `docs/roadmap.md`. Ici : l'état réel.

*Dernière mise à jour : 9 septembre 2026 (temps A et B, export du code, composants, minimum professionnel, rôles et partage, interactions et deuxième site de la revue globale).*

## Partie 1 · Fonctionnel

### 1.0 Compte et tableau de bord

Connexion par lien magique (Supabase Auth), adresses autorisées par variable d'environnement, sans connexion configurée l'accès est libre (développement). Partage par site (fenêtre Publier → Partage, propriétaire seulement) : inviter une adresse comme **rédacteur** (mode Écriture seulement : textes, images, blocs, entrées des bases, publication des contenus ; ni design, ni pages, ni réglages, ni thème, refusés côté serveur selon la frontière Écriture/Design) ou **éditeur** (tout sauf partager et supprimer le site). Une adresse invitée peut se connecter sans figurer dans la liste d'Atelier. Le tableau de bord marque les sites partagés avec le rôle. Tableau de bord : les sites du compte, état de publication, changements à publier, adresse en ligne, création (site vierge, exemple photographe ou exemple restaurant — carte et événements en bases, page par événement, réservation, composants à variantes, apparitions), (site vierge ou exemple photographe), suppression, déconnexion. Chaque site s'ouvre dans l'éditeur à `/sites/<id>`.

### 1.1 L'éditeur en un coup d'œil

Une fenêtre : barre du haut (modes, largeur d'aperçu, grille, annuler / rétablir, aperçu clair/sombre, palette ⌘K, Aperçu, Publier), panneau gauche (Pages, Calques, Ajouter, Données, Thème), aperçu vivant au centre (le site tel qu'il sera, dans un cadre), inspecteur à droite (l'élément sélectionné).

Deux modes, qui sont des préréglages du même éditeur et non des outils séparés (D06) :

- **Écriture** : on décide du contenu et de son ordre. Frontière (décision du 8 sept.) : une action qui peut casser la cohérence visuelle du site (valeur libre avec unité, couleur, bordure, espacement, grille) n'y a pas sa place.
- **Design** : on décide de l'apparence, avec le CSS réel derrière un vocabulaire simple.

### 1.2 Pages

- Créer, renommer, dupliquer, supprimer (pas encore de réordonnancement) ; adresse, titre SEO, description, image sociale, indexation.
- **Pages fixes** et **pages par entrée** (modèles) : une page par entrée d'une base, groupées à part dans Pages, créées avec la base, supprimées avec elle. Rôle et motif d'adresse dans les réglages de la page. Barre du haut : badge « page par entrée » et choix de l'entrée à prévisualiser.
- La page ouverte est mémorisée au rechargement.

### 1.3 Écriture

- Clic dans un texte : curseur ; gras, italique, souligné, barré, lien (barre sur la sélection, ⌘B ⌘I ⌘U ⌘K). Échap conserve le texte.
- Entrée : bloc suivant ; en début de bloc, bloc vide au-dessus ; dans une liste, élément suivant ; sur un élément vide, sortie de liste ; sur un paragraphe vide dernier de sa boîte, sortie de boîte ; sur une boîte sélectionnée, paragraphe dedans en dernier ; sur une feuille sélectionnée (image, bouton…), paragraphe après. Retour arrière sur un bloc vide : suppression et remontée.
- Menu « / » : sections modèles (Héros, Texte et image, Trois points forts, Appel à l'action, Questions fréquentes), structure, contenu (titre, paragraphe, citation, image, bouton, lien, liste, séparateur), données (vue de base de données, formulaire), composants du site. Classement : libellé d'abord, mots-clés ensuite.
- Barre de bloc au survol : type (paragraphe, titres, citation), alignement, Style (bascule en Design sur l'élément), insérer après, supprimer ; poignée gauche « + » et « ⋮⋮ ».
- Glisser-déposer des blocs avec fantôme fidèle, cibles avant/après/dedans, rangées (trait vertical), boutons et vues atomiques, Échap annule.
- Une image vide s'ouvre sur la bibliothèque d'un clic. Un séparateur suit son conteneur (horizontal en colonne, vertical en rangée).

### 1.4 Design

- Panneaux : Disposition, Espacement, Dimensions, Typographie, Apparence (fond, bordure, arrondi, ombre, opacité), Effets, Responsive (cascade descendante par point de rupture : base > tablette > mobile > petit), états (survol, focus, actif…) avec prévisualisation forcée et animation des changements, styles partagés (appliquer, créer, modifier, détacher, héritage), CSS brut.
- Chaque propriété montre sa source (locale, héritée, partagée, par défaut) et se réinitialise. Toute valeur numérique se règle à la souris : glisser horizontalement sur le champ lui-même (ou sur son libellé) fait défiler la valeur, un pixel par pas, dix fois plus vite avec Maj ; un simple clic met le curseur pour taper ; flèches haut et bas ±1 (Maj ±10). Les pas suivent l'unité (1 px, 1 %, un quart de rem, 0,1 sans unité) : jamais de centièmes. Vaut aussi pour les cases du schéma de boîte (marges et remplissage).
- Grille de mise en page par point de rupture (colonnes, gouttière, marge, largeur maximale), affichable.
- Largeur d'aperçu libre avec poignée, préréglages Bureau / Tablette / Mobile, réduction à l'échelle.
- Propriétés par type : image, lien ou bouton, balise, vue de base de données, formulaire, champ, données (liaisons).

### 1.4 pré Réglages d'un élément, textes composés, blocs

Section Élément : nom, balise, **ancre** (identifiant `#…` ; le panneau Lien propose alors les ancres du site dans une liste). Section Lien : **libellé** du lien ou du bouton modifiable directement (son enfant texte). Section Données d'un texte relié à un champ : **Avant** et **Après** habillent la valeur (« 26 € », « du 4 au 12 »), écrits en segments dans le contenu. Section CSS brut : liste les propriétés de l'état actif (survol, actif, focus) quand un état est choisi. Calques : un champ de formulaire porte son libellé. Ajouter : la **carte par défaut** d'une vue se construit d'après la base (première image, titre, premier texte) et suit un changement de base (liaisons reportées, nom « Vue · … ») ; bloc **Champ de formulaire** (clé unique parmi ses voisins, aussi à la duplication) ; **placement** : sans sélection avant le pied de page, une section toujours au niveau de la page après la région qui contient la sélection, jamais dans un lien. Page par entrée créée avec le titre SEO `{titre}`.

### 1.4 bis Composants

Tout élément d'une page (sauf la racine) peut devenir un composant du site : « En faire un composant… » dans la section Élément de l'inspecteur, ou la commande de la palette. L'élément est remplacé par une instance ; le composant apparaît dans Ajouter → Composants pour en poser d'autres. Une instance montre le composant ; « Modifier le composant » ouvre son arbre dans les calques (toutes les instances changent) ; cliquer un élément d'une instance dans l'aperçu ouvre aussi le composant ; sélectionner un élément de page le referme. « Détacher du composant » remplace l'instance par une copie indépendante (valeurs des propriétés, emplacements et styles de la variante choisie incorporés). Sur la racine du composant, la section Composant règle : nom, description, propriétés exposées (texte, texte long, nombre, oui/non, image, adresse, choix, couleur ; libellé, type, valeur par défaut, choix), axes de variantes (nom, valeurs, valeur par défaut), suppression si aucune instance. Un texte, une image ou un lien du composant se relie à une propriété (section « Propriété du composant ») ; chaque instance donne alors sa valeur dans la section Composant de l'inspecteur, où elle choisit aussi sa variante par axe. Avec des axes déclarés, l'inspecteur montre une barre « Variante » : les styles réglés sous une variante ne valent que pour les instances qui l'ont choisie, le style normal restant hérité. Pas encore : composants d'espace de travail (D50), emplacements (`slot`) créés depuis l'éditeur, surcharges locales d'une instance sans détacher.

### 1.4 ter Animations et interactions

**Animations** (section Animations de l'inspecteur, modèle § 8.4) : un élément porte des animations, chacune faite d'**étapes** (images-clés) et d'un **déclencheur** : au chargement, à l'entrée dans l'écran, au survol, au clic, au défilement. Réglages par animation : durée, délai, courbe, répétitions (ou en boucle), sens (normal, à l'envers, aller-retour), état à la fin, rejouer à chaque passage (entrée dans l'écran), plage de la traversée (défilement), pause au survol. Seize préréglages : apparitions (fondu, en montant, en descendant, glissés, zoom, netteté), continues (flottement, pulsation, rotation, clignotement, balancement), attention (secousse, rebond, grossissement) et « personnalisée ». Les étapes s'éditent sur place (position en %, opacité, X, Y, échelle, rotation, flou, autre CSS) ; « Enregistrer » range les étapes dans la bibliothèque du site (Thème → Animations : renommer, usages, supprimer) pour les réutiliser ; « Détacher » les reprend en ligne. « Jouer » rejoue l'animation une fois dans l'aperçu ; l'éditeur montre sinon l'état de repos, et une animation ne pose rien dans le style de l'élément (la retirer le laisse tel quel). Le site publié et l'export jouent tout : chargement et survol en CSS pur, entrée dans l'écran, clic et défilement par le script (API Web Animations) ; sans script ou avec « réduire les animations », l'élément reste à son état de repos. « Décaler les voisins » applique la même apparition aux éléments suivants avec 100 ms de plus chacun ; « Compteur » anime le nombre d'un texte. La palette ⌘K garde « Apparition · … ». Les documents d'avant sont convertis à la lecture (migration 1 → 2).

**Effets de mouvement** (section Effets) : parallaxe (vitesse relative au défilement) ; bandeau défilant sur une boîte, avec durée d'un tour, sens (gauche, droite, haut, bas) et pause au survol. Vue en Défilement : défilement auto toutes les N secondes.

**Interactions** (section Interactions) : au clic ou au survol, afficher ou masquer un élément nommé de la page ou un voisin, changer la variante d'une instance ; « masqué au chargement ». Le bloc « Questions fréquentes » arrive dépliable. Détail du modèle : `docs/document-model.md`, sections 4.2, 8 et 8.4.

### 1.4 quater Clavier et accessibilité

Dans un champ de saisie, le clavier appartient au champ : ⌘Z annule la frappe, ⌘K n'ouvre pas la palette. Supprimer, Retour arrière, les flèches et Entrée ne pilotent les calques que depuis l'espace de travail (arbre des calques, aperçu, ou rien de focalisé) ; sur un bouton ou un onglet focalisé, ces touches gardent leur sens natif. L'arbre des calques se parcourt au clavier : Tab arrive sur la ligne sélectionnée, les flèches déplacent la sélection et le focus la suit. Une confirmation dangereuse ouvre le focus sur « Annuler » : Entrée ne détruit rien. Dans les dialogues empilés, Échap ne ferme que le plus récent. Les limites des champs, le texte atténué et les intitulés respectent les contrastes WCAG (3:1 pour les contrôles, 4,5:1 pour le texte) ; l'anneau de focus est une règle globale hors couche, à ne pas déplacer. En mode Écriture, le « / » s'écrit vraiment : le menu de blocs s'ouvre, Échap le referme en laissant le caractère, choisir un bloc le retire.

### 1.4 quinquies Notifications, enregistrement et lecture d'écran

Les messages passagers (en haut de l'aperçu) se ferment d'un clic et portent une action quand elle existe : supprimer un bloc affiche « … supprimé · Annuler ». Ils vivent dans une région live permanente (`role="status"`), lue par les lecteurs d'écran. Les incidents d'enregistrement ont leur propre bandeau (`role="alert"`) : hors ligne (ton avertissement, compte à rebours vivant, « Réessayer maintenant »), conflit de version ou erreur serveur (« Copier mes changements » met les opérations non enregistrées dans le presse-papiers, « Recharger » reste visible). Un refus de rôle (403) ne fige plus l'éditeur : l'opération est annulée et le site remis dans son état enregistré, avec un message ; un rédacteur est d'ailleurs arrêté avant l'envoi (`opAllowedForWriter`) et ne voit pas « Nouvelle base ». Fermer l'onglet avec des opérations en attente demande confirmation. Dans l'inspecteur, une annonce invisible signale le contexte de réglage (taille d'écran, état, variante, style partagé) ; les sections sont de vrais titres de niveau 3 et les en-têtes de panneau des titres de niveau 2.

Sections de l'inspecteur : chacune garde l'état où on l'a laissée (mémorisé par titre, d'une session à l'autre) ; à la première rencontre, l'ouverture dépend du type sélectionné (texte : Texte et Typographie ; boîte : Disposition et Espacement ; image : Image et Dimensions). La pastille d'origine d'une valeur se lit sans la couleur (● posé ici, ◐ hérité, ◆ style partagé, ○ défaut), se focalise au clavier pour lire son explication, et se clique pour réinitialiser quand la valeur est posée ici. Un champ de longueur dont la valeur n'est pas comprise par le navigateur passe en rouge avec son explication (la valeur est gardée, sans effet). CSS brut accepte `space.4` comme `{space.4}`. Dans le tableau d'une base, le statut se lit (« Brouillon » / « Publiée », « Nouveau » / « Traité » pour les messages) et le pied compte les entrées publiées, en brouillon, et celles « pas encore en ligne » (publiées ici mais absentes ou modifiées depuis la version publiée, d'après `GET /api/sites/:id/publish` qui renvoie `publishedEntries`) ; les messages reçus sont en lecture seule. Un rédacteur ne voit ni « Champ », ni l'import CSV, ni les réglages de champ, ni l'import, le renommage, le remplacement ou le retrait d'images. Tout champ libre de style (CSS brut, grille, ratio, ombre, transformation, filtre, couleur d'une propriété de composant) porte le sélecteur ◇ des valeurs du thème ; en CSS brut, une valeur non comprise passe en rouge. L'intitulé en capitales est un seul composant (`Eyebrow`), utilisé par les en-têtes de panneau, les sections et les dialogues.

### 1.4 sexies Publication et réglages, tableau des entrées, styles partagés, glisser-déposer

La fenêtre « Publier » a deux onglets : **Publier** (état, adresse en ligne, note, publication des contenus, historique) et **Réglages du site** (nom, sous-domaine, référencement, page introuvable, redirections, code personnalisé, export, partage), aussi ouverts par l'engrenage de la barre et la palette (« Réglages du site… »). L'action principale est en pied de fenêtre ; désactivée, elle dit pourquoi. Le sous-domaine montre l'adresse qui en découle, explique ce qui a été retiré (majuscules, espaces, accents) et vérifie sa disponibilité (`GET /api/sites/subdomain?sub=…&site=…`). Le tableau d'une base filtre (champ « Filtrer… », sur toutes les valeurs), trie par colonne (flèche en tête de colonne : croissant, décroissant, aucun) et ouvre chaque entrée en détail (tous les champs en colonne, statut, dates). L'import CSV ignore par défaut les colonnes inconnues, compte par colonne les valeurs qu'il ne saura pas convertir avant d'importer, et le message de fin propose « Annuler l'import » (les entrées créées sont retirées). Thème → « Styles partagés » liste les styles du site avec leurs usages, les renomme et les supprime (les éléments gardent leurs autres réglages ; les styles qui en héritaient deviennent indépendants) ; les préréglages retrouvent les styles de base par identifiant, pas par nom. Pendant un glisser-déposer dans les calques, un dépôt impossible se voit tout de suite (indicateur rouge, raison en infobulle) au lieu d'échouer après coup ; les messages nomment les éléments en français (« Un lien ne peut pas contenir… »). Onglets et groupes de boutons se parcourent au clavier avec un seul arrêt de tabulation et les flèches ; les choix oui / non sont des cases (italique, retour à la ligne, nouvel onglet, indexation) ; la position est une liste. Le tableau de bord propose les trois modèles avec une esquisse, et une zone d'accueil quand il n'y a aucun site.

### 1.5 Thème

**Mode par défaut** (clair ou sombre : celui dans lequel le site est publié ; soleil / lune de la barre du haut ne changent que l'aperçu). Jetons (couleurs par mode clair/sombre, espacements, largeurs, rayons, ombres, tailles et interlignes, polices Google), défauts par balise, points de rupture, grille. Les tailles de titre sont fluides (`clamp`).

### 1.6 Données (bases)

- Onglet Données : bases avec nombre d'entrées et de brouillons, création (avec page par entrée), messages reçus des formulaires.
- Vue tableur : entrées en lignes, champs en colonnes, cellule par type (texte, texte long en paragraphes, nombre, date, oui/non, choix, choix multiples, image, galerie, lien, couleur, relation simple ou multiple ; le type « fichier » est déclaré mais n'a pas encore de cellule), publié / brouillon, adresse qui suit le titre, suppression, export CSV (servi par le serveur en pièce jointe, avec message de confirmation, et copie dans le presse-papier en secours), import CSV ou JSON avec correspondance des colonnes et conversion par type, suppression de la base avec ses pages par entrée. Navigation au clavier entre cellules : flèches (gauche et droite en bord de saisie), Entrée valide et descend, Échap annule.
- Champs : ajouter, renommer, typer, obligatoire, options, relation, réordonner, supprimer.
- Vues de base de données dans les pages : base, filtre (conditions « et »), tris, limite, texte si vide ; en Design : disposition (grille, liste, défilement) et colonnes par point de rupture.
- Liaisons : un texte, une image ou un lien placé dans une vue ou une page par entrée affiche un champ (section Données de l'inspecteur).

### 1.7 Médias

Import depuis l'ordinateur (plusieurs fichiers, glisser-déposer, adresse web), HEIC converti, réduction avant envoi au-delà de 4 Mo, déclinaisons WebP produites par le serveur et `srcset` au rendu. Une seule bibliothèque pour tout l'éditeur (bouton de la barre, palette ⌘K, panneau Image, clic sur une image vide, cellules des bases) : recherche, tri, filtre « inutilisées », volet de détail avec nom, texte alternatif porté par l'image (l'élément surcharge s'il a le sien), dimensions, date, usages avec accès direct, remplacement du fichier partout, retrait des images inutilisées. Pas de dossiers : la base de données est le vrai classement.

### 1.8 Formulaires

Bloc Formulaire (nom, email, message, bouton), champs réglables (libellé, clé, sorte, aide, obligatoire, choix), message de succès ; réception validée, piège à robots, limite d'envois, enregistrement dans « Messages reçus », notification par email (Resend). Détail : `docs/formulaires.md`. Destinataire propre à chaque formulaire (panneau Formulaire), à défaut celui d'Atelier.

### 1.9 Publication

Fenêtre Publier : état en ligne, écart avec la version de travail, note, historique, remettre en ligne une version, sous-domaine, référencement du site (suffixe des titres, description, image sociale, favicon). Le site publié est servi depuis l'instantané publié, jamais depuis le travail en cours. Référencement automatique, plan du site, robots. Nom du site modifiable. Page introuvable : « Créer la page introuvable » pose une page fixe à `/404` (titre, explication, lien vers l'accueil, non indexée) servie en 404 pour toute adresse inconnue. Redirections : liste `de → vers`, définitive (301) ou temporaire (302), `/dossier/*` et `*` pour le reste, validées à la saisie. Code personnalisé : deux zones, dans `<head>` et en fin de `<body>`, insérées telles quelles sur le site publié et dans l'export, jamais dans l'éditeur. Le site publié est un document HTML complet sans JavaScript d'Atelier (hors script des formulaires). Détail : `docs/publication.md`, mise en ligne : `docs/mise-en-ligne.md`.

**Publier les contenus seulement** : met en ligne les entrées des bases sous la version publiée, sans toucher au site en ligne (seul bouton d'un rédacteur).

**Exporter le code** (même fenêtre) : « Télécharger le site (.zip) » rend une archive statique complète, depuis la version publiée (sinon la version de travail) : une page HTML par adresse (pages fixes et une par entrée des modèles), `styles.css` aux classes lisibles déduites des noms des calques (`heros`, `heros-title`, `heros-text-2`, `bouton`), médias nommés d'après la bibliothèque avec leurs déclinaisons, données par base en JSON, document source, redirections, README. À déposer à la racine d'un hébergement statique. L'inspecteur affiche la classe CSS que portera chaque élément ; renommer un calque la renomme. Détail : `docs/export.md`.

### 1.10 Pas encore là (voir la feuille de route)

Domaine personnalisé, export en projet Next.js (l'archive statique existe), emplacements et surcharges locales des composants, publication du contenu seule, interactions avancées (défilement, variables de page, fenêtres modales, scripts), bases externes, texte riche dans les champs, sélection multiple, pagination des vues, calendrier et carte, animations d'interaction, langues multiples, membres.

## Partie 2 · Technique

### 2.1 Architecture

Monorepo npm workspaces.

- `packages/model` — types et schéma de validation (zod) accordés par un test de types, migration de schéma (`migrate.ts`), opérations inversibles (`node.insert/remove/move/set/replace`, `site.set`, `batch`), historique avec fusion, arbre et index, planification des déplacements et dépôts (`planMove`, `planDrop`, `planInsert`, `planExitBox`, `canInsertUnder`), gestes d'écriture (`planSplit`, `planMergePrev`, `planSlashInsert`, `fitHeadings`), résolution de style avec sources, grille de mise en page, sources de données (`templateOf`, `dataSourceFor`, `entryPath`), site d'exemple. Sans React. Tests vitest.
- `packages/renderer` — CSS d'un site (jetons par mode, défauts de thème dans `:where()`, styles partagés, nœuds, points de rupture, états, vues de collection, séparateurs, base `hr` et champs) et rendu React (`RenderPage`, `RenderNode`, liaisons, vues, formulaires avec script, `srcset`). Le même moteur sert l'éditeur, l'aperçu et le site publié. Tests vitest.
- `apps/editor` — Next.js (App Router, Tailwind v4, lucide-react, IBM Plex) : le tableau de bord (`/`), l'éditeur (`/sites/<id>`), l'aperçu vivant (`/preview/<id>/…?editor=1`), les sites publiés (`/s/<sous-domaine>/…`, réécriture par `src/proxy.ts`), la connexion (`/connexion`, `/auth/*`), l'API. `src/proxy.ts` exige une session sur tout sauf le public (sites publiés, formulaires, fichiers, connexion) ; `lib/auth.ts` et `lib/site-access.ts` vérifient le propriétaire dans les routes (un site sans propriétaire n'est accessible à personne) ; `lib/env.ts` refuse de tourner en production mal configurée ; en-têtes de sécurité dans `next.config.ts` ; `postMessage` avec origine vérifiée. En production, un site publié n'est servi que derrière son sous-domaine, sur un domaine distinct de l'éditeur.

### 2.2 Données et dépôts

- Document `Site` versionné : journal d'opérations, `commit_change` (Supabase) ou fichiers JSON (`.atelier-data/`), conflit 409 si la version de base a bougé (une seule fenêtre à la fois, bandeau avec bouton Recharger). Un incident réseau remet les opérations en file et réessaie ; rien n'est perdu. Lectures de listes par tranches de 1 000 ; journal compacté et instantanés purgés (vingt gardés) à la publication ; plafonds de corps dans `lib/limits.ts`.
- Entrées hors document : `GET/PUT/DELETE /api/sites/:id/entries` (un `PUT` peut porter plusieurs entrées : import), envois de formulaires dans une base virtuelle `frm_<formId>` ; lecture et écriture CSV/JSON dans `lib/csv.ts`, correspondance dans `components/data/ImportDialog.tsx`, export par `GET /api/sites/:id/databases/:dbId/export`.
- Fichiers : `AssetStorage` (Supabase Storage seau `assets`, ou `.atelier-data/assets`), `POST /api/sites/:id/assets` avec sharp ; usages calculés côté éditeur (`lib/asset-usage.ts`) ; bibliothèque fournie par `MediaLibraryProvider`, ouverte par `openMediaLibrary()` ou `useMediaLibrary()`.
- Publication : `snapshots` (`kind = 'publish'`, document + entrées), `sites.published_version`, `sites.subdomain` ; `GET/POST /api/sites/:id/publish`, `POST …/publish/restore`.
- `getStore()` et `getAssetStorage()` choisissent Supabase ou fichiers ; `ATELIER_STORE=file` force les fichiers ; la clé de cache du dépôt en mémoire porte `STORE_VERSION`.
- Interface `SiteStore` : `get`, `create(site, owner)`, `listSites(owner)`, `delete`, `appendChange`, `changes`, `entries`, `setEntries`, `upsertEntries`, `deleteEntries`, `publish`, `publications`, `published`, `restore`, `findBySubdomain`.

### 2.3 Éditeur

- `useDocument` : état optimiste, envoi séquentiel, annuler / rétablir (historique pur du modèle). `useEntries` : entrées optimistes sans annulation.
- `EditorShell` : coquille (client seulement), modes, sélection, insertion, déplacement, raccourcis, palette ⌘K, panneaux, dialogues (bibliothèque, tableur, publication).
- `LivePreview` (dans l'iframe) : rendu du site + couche d'édition (sélection, survol, glisser, édition riche par `contentEditable` sérialisée en `Inline[]` par `components/preview/serialize.ts`, testé, barres, menu « / », lien saisi dans la barre). Protocole `postMessage` typé dans `lib/preview-protocol.ts`, origine vérifiée des deux côtés : parent → iframe `atelier:site` (site, conteneurs, liens atomiques, textes, mode, blocs, entrées), `atelier:mode`, `atelier:editmode`, `atelier:highlight`, `atelier:state`, `atelier:grid`, `atelier:zoom`, `atelier:edit-text` ; iframe → parent `atelier:ready`, `select`, `move`, `drop-block`, `key`, `text`, `split`, `merge-prev`, `slash`, `style-in-context`, `set-style`, `set-tag`, `remove`, `pick-image`.
- Inspecteur : `NodeInspector` + panneaux `components/design/*` sur `useStyle` (lecture par `resolveNodeStyle`, écriture sur le point de rupture actif). Système de design de l'éditeur dans `src/ui` (jetons dans `globals.css`).

Composants : `packages/model/src/components.ts` (`planMakeComponent`, `planDetach`, `planDeleteComponent`, `componentUsages`, `applyOverrides`, `instanceVariant`, `variantClasses`, `variantKey`/`parseVariantKey`, `variantStylePath`, `resolveVariantStyle`), moteur `variantCss` dans `css.ts` et `RenderContext.extraClass` (classes de variante sur la racine de l'instance), panneaux `components/design/ComponentPanels.tsx` (`MakeComponentRow`, `InstancePanel`, `ComponentPanel`, `PropBindingPanel`), cible de style `variant` dans `useStyle`. Tests : `packages/model/test/components.test.ts`, moteur « variantes de composant ».

Rôles : `packages/model/src/roles.ts` (`Role`, `atLeast`, `opAllowedForWriter`), `lib/site-access.ts` (`siteRole`, `guardSite(id, min)`, `guardRole`), dépôts (`members`, `setMember`, `removeMember`, `isMember`, `listSites(user)` avec `role`, `publishEntries`), table `site_members`, route `/api/sites/:id/members` (GET, PUT, DELETE, propriétaire), `canSignIn` (liste ou invité). Niveaux : lecture, entrées, fichiers, changements et contenus seuls pour le rédacteur (les opérations d'un rédacteur sont filtrées par `opAllowedForWriter`) ; publication, retour arrière, export pour l'éditeur ; suppression et partage pour le propriétaire. L'éditeur reçoit `role` (`EditorShellClient`) : rédacteur forcé en Écriture, onglet Design désactivé, panneau Pages en lecture, fenêtre Publier réduite.

Aperçu vivant : les barres d'outils injectées dans l'iframe lisent les jetons de l'éditeur sous `--atelier-ui-*` (copiés depuis le document parent), jamais sous `--color-*`, qui appartient au thème du site.

Interactions : `packages/model/src/interactions.ts` (apparitions, masqué au chargement, `toggleInteraction`, `variantInteraction`, `describeInteraction`), `packages/renderer/src/interactions.ts` (`interactionsAttr`, `INTERACTION_SCRIPT`), panneau `components/design/InteractionsPanel.tsx`. Deuxième site d'exemple : `packages/model/src/sample-restaurant.ts` (`restaurantSite`, `restaurantEntries`), gabarit « restaurant » de `POST /api/sites`.

Aperçu vivant et interactions : le script du site n'est pas injecté dans l'aperçu ; `applyInstantStates` (moteur) pose l'état d'arrivée des apparitions et masque les éléments « au chargement » après chaque rendu.

### 2.4 Rendu publié et référencement

`app/(site)/s/[sub]/[[...path]]/route.ts` : gestionnaire de route, instantané publié mis en cache (`unstable_cache`, étiquette `site:<id>`, invalidée avec `expire: 0`), redirections (`matchRedirect`), page `/404` en 404, document HTML complet par `lib/html-document.ts` (`htmlDocument` : titre, description, robots, canonique, Open Graph avec image absolue, Twitter, favicon, polices, `color-scheme`, feuille en ligne, code head et fin de body tels quels), partagé avec l'export. `sitemap.xml` (sans `/404`) et `robots.txt` par site.

Export : `GET /api/sites/:id/export` → `lib/export-site.ts` (`buildExport` : médias regroupés et renommés, `classMap` du modèle, une page par adresse rendue par `renderToStaticMarkup` de `react-dom/server.edge`, feuille complète, données, README) et `lib/zip.ts` (archive sans compression, CRC-32, sans dépendance). Nommage partagé : `packages/model/src/naming.ts` (`classMap`, `kindOf`, `slugify`), consommé par le moteur via `RenderContext.classes` / `siteCss(site, { classes })` et par l'inspecteur (« Classe CSS »). Tests : `packages/model/test/naming.test.ts`, `packages/renderer/test/render.test.tsx` (classes lisibles), `apps/editor/test/export.test.ts` (CRC, archive lue par `unzip`, export du site d'exemple).

### 2.5 Variables d'environnement

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ATELIER_ALLOWED_EMAILS`, `ATELIER_DATA_DIR`, `ATELIER_STORE`, `ATELIER_SITES_DOMAIN`, `RESEND_API_KEY`, `FORM_NOTIFY_TO`, `MAIL_FROM`, `NEXT_DIST_DIR` (second serveur de développement). Modèle dans `.env.example`.

### 2.6 Commandes et vérifications

`npm run dev`, `npm test` (modèle 67, rendu 19, éditeur 12 dont le contrat des dépôts, au 9 sept.) ; intégration continue GitHub sur `main` et les demandes de fusion, `npm run typecheck`, `node --env-file=apps/editor/.env.local scripts/check-supabase.mjs`. Débogage : `window.__atelierDoc`, panneau du navigateur masqué = minuteries ralenties.
