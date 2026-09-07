# Feuille de route Atelier

Document vivant. Le cadrage (`decisions.md`) dit pourquoi ; ce fichier dit quoi et dans quel ordre. Il est mis à jour à la fin de chaque session de travail.

Règle d'entrée (D59) : rien n'entre dans une version tant que le site en cours de construction n'en a pas besoin. Ce qui n'est pas nécessaire au site de recette va dans la version suivante.

États : `[x]` fait · `[~]` en cours · `[ ]` à faire · `[?]` à trancher

---

## v0 · Fondations — site de recette : vitrine de photographe

Critère de sortie : le site de la photographe est en ligne sur un sous-domaine, construit entièrement dans Atelier, et utilisé.

### M0 · Socle — fait le 6 septembre 2026

- [x] Spécification du modèle de document (`document-model.md`)
- [x] Paquet modèle : types, schéma de validation, opérations inversibles, arbre, historique
- [x] Moteur de rendu : CSS (jetons, modes, styles partagés, points de rupture, états) et rendu React de tous les types de nœuds
- [x] Site d'exemple (Marie Lambert) : thème, composants, base « Projets », 5 pages
- [x] Coquille d'éditeur : pages, calques, aperçu réel en iframe, largeurs, mode sombre, sélection croisée
- [x] Persistance : dépôt fichier et Supabase, journal d'opérations versionné, conflit 409, instantanés et compactage
- [x] Annuler et rétablir, regroupement des frappes, aperçu vivant sans rechargement
- [x] Inspecteur provisoire : nom, texte simple, styles de base, monter, descendre, dupliquer, supprimer

### M1 · Système de design de l'éditeur — fait le 6 septembre 2026 (base, à faire évoluer)

Décision du 6 septembre : interface dense et sombre, résolument outil pro, mais qui ne fait pas peur au débutant (libellés lisibles, infobulles, pas d'icônes seules, contrastes soignés). Le système est posé avant les panneaux pour que chaque panneau naisse dedans ; il évoluera.

- [x] **Jetons de l'éditeur** : fonds, surfaces, lignes, textes, accent, états (sélection, survol, danger), rayons, espacements, typographie utilitaire (IBM Plex Sans / Mono, cohérent avec le cadrage)
- [x] **Primitives d'interface** (`apps/editor/src/ui`) : bouton, bouton icône, champ, champ numérique avec unité, sélecteur, onglets, panneau et section repliable, ligne d'arbre, barre d'outils, badge d'état, raccourci clavier, infobulle
- [x] **Coquille refaite** avec ces primitives : barre supérieure (site, page, modes, largeurs, annuler/rétablir, état, aperçu, publier), panneau gauche à onglets (Pages, Calques, Ajouter), zone de canvas, panneau droit
- [x] Inspecteur provisoire rhabillé avec les primitives (remplacé en M3)
- [x] Icônes : Lucide

### M2 · Édition structurelle — fait le 6 septembre 2026

Ce qui empêche aujourd'hui de construire une page : on ne peut ni ajouter ni déplacer.

- [x] **Ajouter un bloc** : onglet Ajouter (boîte, texte, image, lien/bouton, liste, séparateur, colonnes, section, vue de base, formulaire, composant existant), insertion avant/après/dedans la sélection
- [x] **Déplacer depuis les calques** : glisser-déposer dans l'arbre avec indicateur avant/après/dedans, respect des types conteneurs
- [x] **Déplacer depuis le canvas** : glisser un élément sélectionné dans l'aperçu, cible calculée depuis le DOM réel, aperçu de la position
- [x] **Largeur d'aperçu libre** : champ en pixels (320 à 4000, validé à la fin de la saisie), poignée de redimensionnement, point de rupture actif, mise à l'échelle automatique quand le cadre dépasse la zone visible (badge de zoom)
- [x] Sélection au clavier : flèches pour parent/enfant/frères, Suppr, ⌘D dupliquer, Échap
- [x] Renommer un calque en double-cliquant (ou Entrée)
- [x] Arbre : replier/déplier mémorisé, ancêtres ouverts et défilement à la sélection
- [x] Pages : créer (en-tête et pied de page du site ajoutés, adresse déduite du nom), dupliquer, réglages (nom, adresse, titre et description SEO), supprimer (sauf la dernière et les modèles de base) — ajouté le 7 sept. au premier retour de l'audit

### M3 · Panneaux Design (D19) — fait le 7 septembre 2026 (reste l'audit d'usage)

Le panneau de droite actuel est un échafaudage. Il est remplacé, pas amélioré.

- [x] **Disposition** : affichage, direction, retour à la ligne, alignement, répartition, écart, grille (colonnes, lignes, nombre de colonnes égales), position et décalages, calque, débordement, réglages « dans le parent » (grandir, rétrécir, base, aligner, ordre, colonne/ligne de grille)
- [x] **Espacement** : schéma de la boîte (marge, remplissage), une case par côté, côtés liables, couleur du texte selon la source
- [x] **Dimensions** : largeur, hauteur, min et max, ratio, unités et jetons
- [x] **Typographie** : police (thème, jetons, système), taille, interligne, graisse, espacement, couleur, alignement, italique et décorations, casse, retour à la ligne
- [x] **Apparence** : fond couleur, dégradé (type, angle, arrêts) ou image (ressource, taille, position), bordure (épaisseur, style, couleur), arrondi global ou par coin, ombre (jeton ou libre), opacité
- [x] **Effets** : rotation, échelle, décalage (ou texte brut si transformation complexe), transition (propriété, durée, courbe), filtre, curseur
- [x] Contrôles communs : champ de longueur avec unité, jeton (◇), mots-clés, flèches et Alt+glisser · pastille de source et réinitialisation · groupe de boutons exclusifs · sélecteur de couleur (pastille native, texte libre, jetons avec valeur par mode)
- [x] **États** : sélecteur Survol / Actif / Focus dans l'inspecteur, réglages posés sur l'état au point actif, valeurs de l'état normal marquées héritées, état forcé dans l'aperçu (attribut `data-force-state` émis avec chaque pseudo-classe)
- [x] **Points de rupture** : édition sur le point actif (celui de la largeur d'aperçu), indicateur de source par contrôle (bleu : posé ici · ambre : hérité d'un point plus large · violet : style partagé · gris : défaut du thème), réinitialisation d'une surcharge, section « Responsive » listant les surcharges de l'élément par point
- [x] Réglages des points de rupture du site : ajouter, renommer, changer un seuil, supprimer si aucun réglage ne l'utilise ; grands écrans en largeur minimale en v1
- [ ] **Styles partagés** : appliquer, créer depuis la sélection, modifier, détacher, voir les usages
- [x] **Thème** : onglet Thème avec les jetons par groupe (couleurs par mode, polices, tailles, interlignes, espacements, arrondis, ombres, largeurs), ajout et suppression
- [x] Propriétés par type : image (ressource du site ou ajout par adresse, alt, ajustement, ratio, priorité), lien ou bouton (page, adresse, email, téléphone, ancre, nouvel onglet), texte et boîte (balise sémantique, D38), collection (base, tri, limite)
- [x] Palette de commandes ⌘K : annuler, rétablir, modes, largeurs, panneaux, pages, ajout de blocs, sélection d'un calque par son nom ; raccourcis affichés dans la palette
- [x] **Audit d'usage n°1** (7 sept. 2026) — retours d'Antoine et suites :
  - [x] Modifier le texte directement dans le canvas → double-clic sur un texte, Entrée valide, Échap annule (texte simple ; le texte riche viendra avec M4)
  - [x] Glisser un bloc depuis Ajouter vers le canvas ou les calques
  - [x] Dimensions incompréhensible et qui déborde → panneau sur une colonne, explication, libellés clairs
  - [x] ⌘C, ⌘X, ⌘V sur les calques
  - [ ] Sélection multiple (Maj / Alt) → M4, chantier à part : sélection, déplacement et style groupés
  - [x] Changer la police ou l'alignement ne faisait rien → bug de priorité CSS des défauts du thème (corrigé avec `:where()`, et ça explique aussi le titre qui ne se centrait pas)
  - [x] Faire varier un nombre en glissant → glisser sur le libellé de la propriété (Maj ×10)
  - [x] « Bureau » restait à la largeur du panneau (868 px = Tablette) → force 1280 px, réduit à l'échelle si besoin
  - [x] Panneau de droite peu clair → explication sous chaque section, sections renommées et réordonnées (Élément, Texte/Image/Lien, Disposition, Espacement, Dimensions, Typographie, Apparence, Effets, Styles partagés, Responsive, Avancé)
  - [x] « Jeton » incompréhensible → « valeur du thème » partout, explication en tête de l'onglet Thème
  - [x] États : savoir qui a un survol et sur quoi → badge avec le nombre de réglages par état, liste des propriétés modifiées par l'état actif, « Tout retirer »
- [x] **Audit d'usage n°2** (7 sept. 2026, 30 points) — traités :
  - [x] « Les px ne sont pas des px » → une valeur du thème dans le schéma de boîte s'affichait par son nom (12 = space.12 = 96 px) ; affiche désormais la vraie valeur, soulignée en pointillés
  - [x] Infobulles du (i) → `title` natif
  - [x] Polices : ajout de n'importe quelle police Google par son nom et ses graisses (onglet Thème → Polices), chargée à chaud dans l'aperçu ; l'import d'un fichier de police attend M5
  - [x] Suppr / Backspace et tous les raccourcis fonctionnent aussi quand l'aperçu a le focus (touches transmises)
  - [x] En-tête de l'inspecteur (actions, états) collant au défilement
  - [x] Vertical / horizontal « inversés » → les icônes suivent maintenant l'axe réel selon le sens (ligne ou colonne), libellés en langage courant (à gauche, centré, en haut…)
  - [x] Modifier une dimension à la souris → glisser sur le libellé (déjà) ; le chip d'une valeur du thème s'édite d'un clic sans passer par la croix
  - [x] Auto ≠ taille minimale → Dimensions avec quatre modes : Auto, Ajustée au contenu (fit-content), Remplit le parent (100 %), Fixe ; explication ; retour à auto par la pastille
  - [x] « Dans le parent » louche → « Place dans son parent », réglages en langage courant (prend l'espace libre, peut rétrécir, alignement)
  - [x] Cliquer un réglage d'état mène au réglage (section ouverte, défilement, surlignage) ; idem depuis Responsive
  - [x] Filtres → Flou, Luminosité, Contraste, Saturation, Noir et blanc (texte brut seulement si un filtre inconnu existe)
  - [x] Curseur dans l'aperçu : flèche partout, texte seulement en édition, main fermée en déplacement
  - [x] Bandeau « Réglages posés sur… » qui débordait → reformulé et sur deux lignes
  - [x] Voir ce qui est surchargé par taille d'écran → Responsive déplie chaque taille avec ses réglages et leurs valeurs
  - [x] Tailles à la Figma (fill / hug) → oui, c'est le mode Ajustée / Remplit ci-dessus
  - [x] Grille de mise en page fluide → décidée le 7 sept. (avant Écriture) et faite : réglage dans Thème (colonnes, gouttière, marge, largeur max., colonnes et marge par taille d'écran), calque affichable par-dessus l'aperçu (⌃G, bouton dans la barre, palette), « Calquer sur la grille du site » pour une disposition en grille, fractions ¼ ⅓ ½ ⅔ ¾ 1 dans Dimensions, gouttière reprise par le bloc Colonnes. L'accrochage automatique lors d'un glissement n'est pas fait (le modèle est en flux CSS, pas en positions libres)
  - [x] Débordement du panneau (« Ligne de base ») → icône, panneaux sans débordement horizontal
  - [x] « Avancé » bizarre → renommé « CSS brut », placé en dernier, présenté comme réservé aux développeurs ; l'identifiant y est déplacé
  - [x] Animer un changement d'état → bouton « Animer les changements » dans la ligne d'état (transition 200 ms), lien vers la transition
  - [x] Calques d'un composant (pied de page) → bouton « Ouvrir » sur la ligne du composant ou « Modifier le composant » dans l'inspecteur ; bandeau et retour à la page
  - [x] Console d'erreurs Next → badge masqué (`devIndicators: false`)
  - [x] Gérer un lien → section Lien de l'inspecteur (déjà), expliquée ; un lien dans un texte attend le texte riche de M4
  - [x] Balise / Identifiant → « Balise HTML » expliquée, identifiant déplacé dans CSS brut
  - [x] Ombres sm / md → libellés « petite (sm) », « moyenne (md) »… pour les valeurs du thème nommées par taille
  - [x] Bouton avec survol sans réglage → les états venant d'un style partagé sont listés avec ◆ et le nom du style
  - [ ] Refonte complète du panneau de droite → faite par touches ci-dessus ; une passe globale d'harmonisation est prévue après l'audit n°3
  - [x] Suite du 7 sept. (soir) : infobulles réelles (composant Tooltip, immédiates) sur les (i), les boutons icône, les pastilles, les options et les libellés ; panneau droit à 340 px et libellés courts ; espace perdu autour du canvas supprimé ; deux sections « Polices » du thème distinguées (« Polices chargées » / « Rôles de police ») ; « Animer » ouvre aussitôt les réglages de la transition
  - [x] Bug trouvé via le panneau de problèmes de Next : un lien déposé dans un lien (HTML invalide, erreur d'hydratation à chaque chargement). Règle ajoutée dans le modèle (déplacement, dépôt, insertion, collage) et rendu dégradé en span ; documents réparés
  - [ ] Sélection multiple → M4

### M4 · Mode Écriture (D18) — fait le 8 septembre 2026 (première version)

- [x] Insertion par « / » avec recherche de blocs (sections, structure, contenu, données, composants), à la place d'un bloc vide ou après
- [x] Édition du texte en place dans l'aperçu : un clic place le curseur ; gras, italique, souligné, barré, lien (barre sur la sélection, ⌘B ⌘I ⌘U ⌘K) ; Entrée crée le bloc suivant (ou l'élément de liste suivant), Retour arrière sur un bloc vide le supprime et remonte ; le contenu est sérialisé en marques du modèle
- [x] Barre au survol d'un bloc : poignée de déplacement, type (paragraphe, titres, citation), alignement, Style (bascule en Design sur l'élément), insérer après, supprimer
- [x] Glisser pour réorganiser les blocs (poignée ⋮⋮ ou glisser l'élément sélectionné)
- [x] Modèles de section prêts à insérer : Héros, Texte et image, Trois points forts, Appel à l'action, Questions fréquentes (groupe Sections de l'onglet Ajouter et du menu /)
- [x] Style en contexte : inspecteur simplifié en Écriture (alignement, taille, aide) avec « Régler le style en détail » qui bascule en Design sur l'élément ; bouton Style dans la barre de bloc
- [x] Exercice n°2 (8 sept.) : page « Mariages » construite entièrement en Écriture (titre, intro, héros, liste avec Entrée, image et ressource, citation, bouton, FAQ avec gras et lien, appel à l'action, vue de base de données, déplacement par la poignée, vue mobile). Corrigé : classement du menu / (le libellé prime sur la description, plus d'en-têtes de groupe pendant la recherche) et mots-clés par bloc (faq, cta, photo, puces…) ; bloc Citation ; Échap garde le texte ; Entrée sur un élément de liste vide sort de la liste ; un lien posé sur une sélection perdait son texte (sérialisation) ; les vues de base de données sont atomiques au dépôt en Écriture (on ne tombe plus dans le modèle de carte) ; Héros et Texte et image passent en une colonne sur mobile ; un modèle qui apporte un h1 devient h2 si la page en a déjà un ; tailles de titres fluides (clamp) dans le thème d'exemple ; marges navigateur remises à zéro pour citation, h5, h6, figure ; un bouton inséré seul ne s'étire plus sur toute la largeur ; la page ouverte est mémorisée au rechargement

### M5 · Données et formulaires

- [x] Édition des bases (8 sept.) : onglet Données (bases, nombre d'entrées et brouillons, modèle de page, création d'une base), vue tableur en dialogue : entrées en lignes, champs en colonnes, cellule par type (texte, nombre, date, oui/non, choix, choix multiples, image et galerie via la bibliothèque, lien, couleur, relation simple ou multiple, texte long en paragraphes), statut publié/brouillon d'un clic, adresse qui suit le titre, suppression avec confirmation ; API `GET/PUT/DELETE /api/sites/:id/entries` (schéma `entry`, testé), état optimiste avec envois en série, aperçu mis à jour en direct
- [x] Gestion des champs (8 sept.) : ajouter, renommer (clé qui suit le libellé tant que le champ est vide), typer, obligatoire, options des choix, cible et cardinalité d'une relation, déplacer à gauche/droite, supprimer (sauf le champ titre) ; les définitions restent dans le document, donc annulables
- [x] Vues (8 sept.) : panneau « Vue de base de données » en Écriture et en Design : base, filtre plat (conditions « et », opérateur et valeur adaptés au type du champ, « l'entrée de la page » pour une relation), tris successifs (jusqu'à trois), limite, texte si vide ; en Design seulement : disposition (grille, liste, défilement horizontal avec accroche) et colonnes ou éléments visibles par point de rupture. Le CSS de disposition vient de la vue (moteur, testé), le style du nœud garde le dernier mot ; le modèle « Vue de base de données » ne pose plus de grille en dur. Reste : pagination (rendu dynamique, M6), calendrier et carte (v1), filtre par paramètre d'adresse dans le panneau
- [x] Modèle de page (8 sept.) : une page devient modèle depuis ses réglages (rôle « Modèle pour <base> », motif d'adresse modifiable) ; sélecteur d'entrée dans la barre pour prévisualiser un modèle avec l'entrée publiée de son choix ; panneau « Données » sur un texte, une image ou un lien placé dans un modèle ou dans une vue (source déduite : `dataSourceFor`, testé) pour lier ou délier le contenu, l'image et son alternative, la cible (page de l'entrée ou champ lien) ; un champ texte long lié se rend en paragraphes (testé). Reste : transformations (format de date, troncature) et liaison des relations traversées depuis le panneau
- [ ] Bases, interconnexion (idée d'Antoine, 9 sept.) : export CSV (fait avec les formulaires, pour toute base), import CSV ou JSON avec correspondance des colonnes vers les champs, puis connexion d'une base externe (D25 : Notion d'abord, Airtable, Supabase, REST) en lecture avec synchronisation, en v1
- [ ] Médias, second temps (après les bases, décidé le 8 sept. avec Antoine : bibliothèque plate, pas de dossiers, la base de données est le vrai classement) : recherche par nom et tri par date ; « utilisée dans n endroits » avec accès, filtre « non utilisées » ; remplacer une image partout ; supprimer les orphelines ; texte alternatif porté par la ressource, l'élément pouvant surcharger ; étiquettes libres seulement si le besoin apparaît
- [x] **Formulaire de contact fonctionnel** (9 sept., `docs/formulaires.md`) : `POST /api/forms/:formId` (multipart ou JSON, réponse JSON ou redirection `?envoye=`), validation par champ (obligatoire, email, nombre, choix, longueur), piège à robots silencieux et dix envois par minute par adresse, enregistrement comme entrée de la base virtuelle `frm_<formId>`, notification par email via Resend si configuré ; script du site pour l'envoi en place avec message de succès ou d'erreur (absent dans l'éditeur) ; base CSS des champs ; onglet Données → « Messages reçus » par formulaire (compteur des nouveaux, tableau en lecture seule, traité/nouveau, suppression) ; export CSV de toute base ; panneaux Formulaire (message de succès) et Champ (libellé, clé, sorte, aide, obligatoire, choix). Reste : destinataire par formulaire et domaine d'envoi (M6), fichiers joints et réponse automatique (v1)
- [x] Médias (8 sept.) : import d'images depuis l'ordinateur (`POST /api/sites/:id/assets`, plusieurs fichiers, glisser-déposer, adresse web), stockage Supabase Storage (seau `assets`, créé par le schéma ou à la volée) ou `.atelier-data/assets` en développement ; conversion HEIC dans le navigateur (voie native puis heic2any), réduction avant envoi au-delà de 4 Mo ; déclinaisons WebP 480/960/1600/2400 produites par sharp, `srcset` et `sizes` au rendu (D37) ; ressources nommées (`name`) et renommables ; bibliothèque d'images (dialogue) ouverte depuis le panneau ou d'un clic sur une image vide dans l'aperçu ; sélecteur du panneau avec vignettes nommées et tuile d'import

### M6 · Publication — première version le 9 septembre 2026 (`docs/publication.md`)

- [x] Site publié servi depuis l'instantané publié, jamais depuis le document de travail (D35, D36) : route `/s/<sous-domaine>/…`, rendu à la demande par le même moteur, cache par étiquette `site:<id>` invalidé à la publication (régénération à la demande, sans construction)
- [x] Sous-domaine : `settings.subdomain` (fenêtre Publier), réécriture `<sous-domaine>.<ATELIER_SITES_DOMAIN>` → `/s/…` par `src/proxy.ts`, liens racine derrière un sous-domaine et préfixés en repli par chemin ; `marie.localhost:3000` en développement. Le domaine d'Atelier reste à acheter `[?]` ; le certificat viendra du domaine wildcard chez Vercel
- [x] Publier / historique / retour arrière : fenêtre Publier (état en ligne, écart de versions, note, historique, « Remettre en ligne »), API `GET/POST /api/sites/:id/publish` et `POST …/publish/restore`, instantanés `snapshots` (`kind = 'publish'`) avec les entrées, `sites.published_version` et `sites.subdomain` (bloc « publication » du schéma à exécuter sur un projet existant, vérifié par `scripts/check-supabase.mjs`)
- [x] Référencement automatique (D38, D39 en partie) : titre avec suffixe, description, canonique, Open Graph et carte Twitter, `robots` par page (« Indexer »), favicon, `sitemap.xml` (pages fixes et une adresse par entrée publiée), `robots.txt` ; réglages du site (suffixe, description, image sociale, favicon) dans la fenêtre Publier, image sociale et indexation par page dans les réglages de page ; code head et fin de body injectés (D40)
- [x] Polices préconnectées et chargées avec `display=swap`, `color-scheme` annoncé ; reste : bascule clair/sombre selon le système (décision à prendre : réglage du site), performances à mesurer avec Lighthouse une fois déployé
- [ ] Déploiement Vercel du rendu multi-sites et domaine wildcard, en suivant `docs/mise-en-ligne.md` (projet Vercel, variables, DNS wildcard, Resend) ; Lighthouse ensuite
- [x] Vérifié sur Supabase le 9 sept. : colonnes en place, publication depuis l'éditeur, site servi avec quatorze adresses dans le plan

### Sortie de v0

- [ ] Le site de la photographe est en ligne, construit dans Atelier
- [ ] Un deuxième site de nature différente est commencé pour vérifier qu'on n'est pas enfermé (D10)

---

## v1 · Utilisable pour un client

Domaine personnalisé · export Next.js (D15) · panneau SEO et redirections (D39) · code head/body (D40) · interactions et états (D31–D33) · espace de travail et rôles (D50–D51) · import et export CSV/JSON, API des bases (D25, D46) · email et webhooks (D43–D45) · import Figma structurel (D26) · interface bilingue (D05) · audit d'usage n°2 avec un vrai client.

## v2 · Vendable

Composants code et SDK (D41, D58) · bibliothèque de composants (D42) · IA sur le modèle (D53–D54) · import Figma fonctionnel et itératif (D27–D28) · multilingue (D48) · bases externes Notion et Airtable (D25) · intégrations Notion, Sheets, Slack (D45) · temps réel et commentaires (D52) · formulaires avancés · plans payants (D55).

## v3 · Plateforme

Espaces membres (D49) · synchronisation Git des composants · contributions à la bibliothèque · plan Espace agences (D55) · export Astro · plugin Figma (D30) · e-commerce : décision à reprendre.

---

## Décisions prises en route

- 6 sept. — **Identité visuelle de l'éditeur** : dense et sombre, outil pro, sans faire peur au débutant. Le système de design précède les panneaux (M1 avant M3).
- 6 sept. — **Nom** : « Atelier » reste le nom de code. Une seule constante dans le code (`PRODUCT_NAME`), pas de nom en dur ailleurs, pour changer plus tard sans coût.
- 6 sept. — **Hébergement des sites publiés** : Vercel en v0 (une application de rendu multi-sites, région Europe, régénération à la demande), derrière une interface `Publisher`. Réévaluer Cloudflare (domaines clients avec certificats automatiques, bande passante moins chère) au moment des domaines personnalisés en v1.

- 8 sept. — **Frontière du mode Écriture** : en Écriture on décide du contenu et de son ordre, en Design de l'apparence. Test pour chaque future fonction : si l'action peut casser la cohérence visuelle du site (valeur libre avec unité, couleur, bordure, espacement, grille), elle va en Design ; sinon (type de bloc, modèle de section, ordre, lien, image, séparateur) elle a sa place en Écriture. Écriture n'est pas un mode débutant mais le mode du propriétaire du site, à qui le freelance livre sans risque. Sa richesse vient des modèles et des variantes de styles partagés (des choix, pas des réglages), pas de réglages supplémentaires. À reporter dans le document de cadrage (D60) si Antoine le souhaite.
- 8 sept. — **Séparateur sans orientation** : un séparateur suit son conteneur, horizontal dans une colonne, vertical dans une rangée, point de rupture par point de rupture (règle dans le moteur CSS, testée, notée dans la spécification section 11).

## Décisions ouvertes

- `[?]` Nom définitif du produit et domaine des sous-domaines (avant M6 · Publication).

## Journal

- 9 sept. 2026 — Demandes d'Antoine : une explication claire de la vraie mise en ligne (`docs/mise-en-ligne.md`, à suivre ensemble) et un document fonctionnel et technique de l'état de l'outil (`docs/fonctionnel.md`, tenu à jour à chaque évolution, règle ajoutée dans `CLAUDE.md`).

- 6 sept. 2026 — M0 terminé. Supabase branché et vérifié. Remarques d'Antoine sur le mode Design intégrées dans M1 à M3. Trois décisions prises (identité, nom, hébergement). Prochaine étape : M1, système de design.
- 6 sept. 2026 (soir) — M1 posé : jetons sombres et denses (`globals.css`), primitives `src/ui`, coquille et inspecteur refaits, IBM Plex via next/font, icônes Lucide. Prochaine étape : M2, édition structurelle.
- 6 sept. 2026 (nuit) — M2 terminé : palette de blocs, glisser-déposer dans les calques et dans le canvas (planification pure et testée dans le modèle), largeur libre avec poignée et point de rupture actif, raccourcis clavier, renommage en place. Correctif : `null` vaut retrait sur un champ optionnel (les erreurs serveur affichent le détail). Prochaine étape : M3, panneaux Design.
- 7 sept. 2026 — M3 session 1 : résolution de style avec sources dans le modèle (testée), contrôles communs (pastille de source, champ de longueur, groupe exclusif, schéma de boîte), panneaux Disposition, Espacement, Dimensions, Responsive ; édition sur le point de rupture actif. Correctif : un retrait (`value` absente) est valide côté serveur. Session 2 : Typographie, Apparence, couleur et jetons, Effets.
- 7 sept. 2026 — M3 session 2 : sélecteur de couleur, Typographie, Apparence, Effets, panneaux Image, Lien, Balise et Collection. Session 3 à faire : états (survol…), styles partagés (appliquer, créer, modifier, détacher), thème (jetons), raccourcis et ⌘K, réglage des points de rupture, puis audit d'usage n°1.
- 8 sept. 2026 — M4 Écriture, première version : mode Écriture / Design réel dans la barre (mémorisé), édition riche dans le canvas, barres flottantes, menu /, Entrée et Retour arrière à la Notion, modèles de sections. Reste pour un M4 bis : listes à puces depuis le menu de bloc, sélection multiple, texte riche dans les champs de base de données. Exercice de construction d'une page en Écriture (8 sept.) : titre, Entrée, paragraphe, « / » → section Trois points forts, édition dans une carte avec Entrée qui reste dans la carte, déplacement d'une section par la poignée gauche : tout passe ; poignée et « + » déplacés à gauche du bloc comme dans Notion ; grille masquée en Écriture. Retours d'Antoine (8 sept.) : Entrée en début de bloc crée le bloc vide au-dessus et laisse le texte (comme Notion), Entrée dans un bouton ne crée rien ; la barre de bloc reste affichée jusqu'au survol d'un autre bloc (la poignée est atteignable) ; un texte relié à une base explique au clic qu'il se modifie dans la base ; Ctrl/⌘Z pendant la frappe annule la frappe puis, une fois épuisée, l'opération précédente. Suite : la barre de bloc ne saute plus sur le parent pendant le trajet vers la poignée et ne se cache plus en sortant du cadre ; poignée à l'intérieur du bloc près d'un bord ; même moteur d'édition riche en Design (double-clic) et en Écriture (clic), conformément à D06. Bug du bouton Écriture qui ne répondait pas au premier clic : divergence entre le pré-rendu serveur et l'état mémorisé dans le navigateur ; la coquille de l'éditeur n'est plus pré-rendue (client seulement). Glisser puis se raviser : relâcher sur sa propre place ne change rien (et n'entre pas dans l'historique), Échap annule le glissement ; les barres dans l'aperçu compensent l'échelle de réduction pour rester à taille réelle. Cible de dépôt sur l'espace vide d'un conteneur : la place la plus proche parmi ses enfants (bords de 8 px pour viser avant/après le conteneur), et la propre place de l'élément déplacé s'il en est le plus proche (rien ne bouge). Dans une rangée (flex en ligne, grille), avant/après se décide par la moitié gauche ou droite et le trait de dépôt est vertical ; un bouton ou un lien est une cible atomique (avant/après lui). Fantôme semi-transparent fidèle (styles calculés figés) qui suit le curseur. Un bouton ou un lien n'accepte que du texte, une image ou une icône (règle du modèle, testée).
- 8 sept. 2026 (suite) — Exercice n°2 en Écriture, page « Mariages » complète : neuf corrections (classement et mots-clés du menu /, bloc Citation, Échap conserve, sortie de liste, lien qui perdait son texte, vue de base atomique au dépôt, modèles en une colonne sur mobile, h1 unique, titres fluides). Restes à décider : le lien se saisit dans une boîte de dialogue native (à remplacer par un petit champ dans la barre de sélection) ; les vignettes de ressources sans nom affichent leur identifiant (as_p1…) ; le choix d'image se fait dans l'inspecteur à droite, pas dans le canvas (un clic sur une image vide pourrait ouvrir le choix). Note pour les tests automatisés : un rechargement à chaud (HMR) peut laisser l'aperçu figé sur un ancien état, ce n'est pas un défaut du produit (un rechargement propre le résout).
- 9 sept. 2026 — M6 première version : publication par instantané, historique et retour arrière, site publié servi sur `/s/…` et par sous-domaine via `proxy.ts`, référencement automatique, plan du site et robots. Vérifié en mode fichier (second serveur, `ATELIER_STORE=file`, `NEXT_DIST_DIR=.next-file`) : jamais publié → publié à jour, page publiée avec titre, description, canonique, Open Graph, CSS et polices, liens préfixés en repli et racine derrière le sous-domaine (en-tête Host), page d'entrée en `og:type article`, script des formulaires présent sur Contact, dix adresses dans le plan du site, robots avec le plan, 404 sur une adresse inconnue, changement → publication v1 → retour à v0 visible aussitôt. Piège : `unstable_cache` gardait `null` et le profil `max` servait l'ancien état une fois de plus ; l'invalidation se fait avec `expire: 0`. Le dépôt en mémoire porte une version dans sa clé de cache (bumpée à chaque changement d'interface). À faire avec Antoine : exécuter le bloc « publication » du schéma Supabase, déployer sur Vercel.
- 9 sept. 2026 — M5 formulaires : réception, validation, anti-spam, enregistrement, notification, messages reçus dans Données, export CSV, panneaux Formulaire et Champ. Vérifié : envoi valide enregistré (nouveau), robot ignoré avec réponse normale, email invalide et champ manquant refusés avec message, envoi sans script redirigé, tableau des messages avec export. La notification n'est pas testée faute de clé Resend : à renseigner dans `.env.local` (`RESEND_API_KEY`, `FORM_NOTIFY_TO`). M5 est terminé, il reste le second temps des médias et l'interconnexion des bases avant M6.
- 9 sept. 2026 — **Pages par entrée liées aux bases** (proposition d'Antoine, comme Webflow) : créer une base crée sa page par entrée (case cochée par défaut, titre lié au champ titre, adresse `/<base>/{slug}`) ; supprimer la base supprime ses pages par entrée (annulable côté document) ; supprimer une page par entrée laisse la base sans page, avec avertissement ; l'onglet Pages sépare un groupe « Pages par entrée » avec l'icône base et le motif d'adresse, et la barre du haut porte le badge « page par entrée ». Une page par entrée sans entrée publiée se dessine quand même dans l'éditeur (`/preview/__template/<page>`, textes liés sur leur repli). Vérifié : création avec page, groupe dans l'onglet Pages, badge, rendu sans entrée, suppression de la base qui emporte sa page et ramène sur l'accueil.
- 9 sept. 2026 — Retours d'Antoine sur les bases : la section « Données » de l'inspecteur est maintenant toujours présente sur un texte, une image ou un lien, avec l'explication quand l'élément n'a pas de données à portée ; suppression d'une base depuis la vue tableur (confirmation qui annonce les entrées perdues, les vues à reconfigurer, les pages modèles qui redeviennent fixes ; entrées supprimées côté serveur, définition retirée du document, donc annulable côté document mais pas côté entrées). Observé : deux fenêtres ouvertes sur le même site donnent « Le site a été modifié ailleurs » dans la plus ancienne ; la synchronisation entre fenêtres viendra avec la collaboration (v2), en attendant recharger.
- 8 sept. 2026 (nuit, encore) — M5 modèle de page : `templateOf`, `dataSourceFor`, `entryPath` dans le modèle, panneau Données, sélecteur d'entrée, rôle de page. Vérifié dans l'éditeur : la page Projet s'ouvre sur une entrée, en changer recharge l'aperçu à l'adresse de l'entrée choisie, le résumé lié se relie au texte long puis revient, les réglages de la page montrent le rôle et le motif. Il reste dans M5 le formulaire de contact fonctionnel, puis le second temps des médias.
- 8 sept. 2026 (nuit, fin) — M5 vues de collection : CSS de disposition tiré de la vue, panneau complet (filtre, tris, limite, si vide, disposition, colonnes). Vérifié dans l'éditeur : filtre « Catégorie est Mariage » ramène deux cartes, colonnes 3 → 2 change la grille, défilement horizontal pose le flex avec accroche, tri par année décroissante réordonne. La page « Mariages » garde son filtre et son tri, qui lui vont bien. Suite de M5 : modèle de page (liaison des champs depuis le panneau, aperçu avec une entrée au choix), puis formulaire de contact.
- 8 sept. 2026 (nuit, suite) — M5 bases : onglet Données, vue tableur en dialogue, cellules par type, gestion des champs, API des entrées. Vérifié dans l'éditeur sur Supabase : modification d'un titre visible dans l'aperçu et enregistrée, nouvelle entrée en brouillon avec adresse automatique puis publiée et visible dans la vue de base, suppression, champ créé puis renommé (clé « lieu »), typé en choix avec options, déplacé, supprimé, galerie remplie depuis la bibliothèque puis vidée. Piège rencontré : le dépôt gardé en mémoire (`globalThis`) survivait au rechargement à chaud avec l'ancienne interface ; sa clé de cache porte maintenant une version. Restes pour plus tard : texte long en paragraphes seulement (le texte riche des champs viendra avec l'éditeur de texte riche, M4 bis), pas d'annulation sur les entrées, pas de tri ni de filtre dans le tableur, réordonner les entrées par glisser. Suite de M5 : vues de collection (disposition, filtre, tri, limite, colonnes par point de rupture) et modèle de page.
- 8 sept. 2026 (nuit) — M5 démarré par les médias : modèle (`Asset.name`, `Asset.variants`, spécification et schéma, testé), rendu `srcset` (testé), stockage de fichiers derrière une interface (`AssetStorage`, fichiers ou Supabase Storage), route d'import avec sharp, conversion HEIC côté navigateur, bibliothèque d'images et sélecteur renouvelés, clic sur une image vide dans l'aperçu. Vérifié de bout en bout sur Supabase : un JPEG de 2400 px donne quatre déclinaisons WebP en 3 s, servies publiquement. Limite connue : l'envoi passe par le serveur (4,5 Mo par requête sur Vercel), d'où la réduction dans le navigateur ; un envoi direct vers le stockage avec une adresse signée viendra si les originaux pleine taille deviennent nécessaires. Suite de M5 : édition des bases (vue tableur, entrées, champs image et galerie).
- 8 sept. 2026 (soir) — Séparateur invisible en Écriture : le `hr` gardait les bordures et la largeur automatique du navigateur (2 px de large dans une colonne alignée au début). Base CSS du moteur pour `hr`, orientation décidée par le conteneur, modèle « Séparateur » sans style local. Décision de positionnement du mode Écriture consignée ci-dessus. Piste notée : variantes de styles partagés sélectionnables en Écriture (M4 bis). Retour d'Antoine : Entrée sur un bloc sélectionné (section, image…) ne permettait pas d'ajouter un élément (la touche renommait le calque). En Écriture, Entrée sur un texte sélectionné reprend la frappe à la fin ; sur tout autre bloc, un paragraphe vide apparaît juste après lui, prêt à écrire (dedans, à la fin, si rien ne peut suivre le bloc). En Design, Entrée renomme toujours le calque. Décision d'Antoine (8 sept.) : Entrée sur une boîte sélectionnée met le paragraphe dedans, en dernier (la boîte s'ouvre) ; sur une feuille (image, bouton, vue, séparateur), juste après ; Entrée sur un paragraphe vide dernier de sa boîte sort de la boîte (règle des listes appliquée aux boîtes, planification `planExitBox` testée dans le modèle ; les régions de premier niveau d'une page ne se quittent pas). Le « + » de la barre de bloc reste « insérer après ».
- 7 sept. 2026 — Grille de mise en page (modèle `settings.layoutGrid`, cascade par point de rupture, testée) et calque dans l'éditeur.
- 7 sept. 2026 — M3 session 3 : états avec prévisualisation forcée, styles partagés complets, onglet Thème avec points de rupture, palette ⌘K. Reste : erreurs d'affichage à relever pendant l'audit d'usage n°1, qui est la prochaine étape.
