# Atelier · document fonctionnel et technique

Ce que l'outil fait aujourd'hui, et comment. Tenu à jour à chaque évolution (règle dans `CLAUDE.md`). Les décisions de fond sont dans `docs/decisions.md`, le contrat de données dans `docs/document-model.md`, le plan dans `docs/roadmap.md`. Ici : l'état réel.

*Dernière mise à jour : 8 septembre 2026 (comptes et tableau de bord ; revue globale : `docs/revue-globale-2026-09.md`).*

## Partie 1 · Fonctionnel

### 1.0 Compte et tableau de bord

Connexion par lien magique (Supabase Auth), adresses autorisées par variable d'environnement, sans connexion configurée l'accès est libre (développement). Tableau de bord : les sites du compte, état de publication, changements à publier, adresse en ligne, création (site vierge ou exemple photographe), suppression, déconnexion. Chaque site s'ouvre dans l'éditeur à `/sites/<id>`.

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

### 1.5 Thème

Jetons (couleurs par mode clair/sombre, espacements, largeurs, rayons, ombres, tailles et interlignes, polices Google), défauts par balise, points de rupture, grille. Les tailles de titre sont fluides (`clamp`).

### 1.6 Données (bases)

- Onglet Données : bases avec nombre d'entrées et de brouillons, création (avec page par entrée), messages reçus des formulaires.
- Vue tableur : entrées en lignes, champs en colonnes, cellule par type (texte, texte long en paragraphes, nombre, date, oui/non, choix, choix multiples, image, galerie, lien, couleur, relation simple ou multiple ; le type « fichier » est déclaré mais n'a pas encore de cellule), publié / brouillon, adresse qui suit le titre, suppression, export CSV (servi par le serveur en pièce jointe, avec message de confirmation, et copie dans le presse-papier en secours), import CSV ou JSON avec correspondance des colonnes et conversion par type, suppression de la base avec ses pages par entrée.
- Champs : ajouter, renommer, typer, obligatoire, options, relation, réordonner, supprimer.
- Vues de base de données dans les pages : base, filtre (conditions « et »), tris, limite, texte si vide ; en Design : disposition (grille, liste, défilement) et colonnes par point de rupture.
- Liaisons : un texte, une image ou un lien placé dans une vue ou une page par entrée affiche un champ (section Données de l'inspecteur).

### 1.7 Médias

Import depuis l'ordinateur (plusieurs fichiers, glisser-déposer, adresse web), HEIC converti, réduction avant envoi au-delà de 4 Mo, déclinaisons WebP produites par le serveur et `srcset` au rendu. Une seule bibliothèque pour tout l'éditeur (bouton de la barre, palette ⌘K, panneau Image, clic sur une image vide, cellules des bases) : recherche, tri, filtre « inutilisées », volet de détail avec nom, texte alternatif porté par l'image (l'élément surcharge s'il a le sien), dimensions, date, usages avec accès direct, remplacement du fichier partout, retrait des images inutilisées. Pas de dossiers : la base de données est le vrai classement.

### 1.8 Formulaires

Bloc Formulaire (nom, email, message, bouton), champs réglables (libellé, clé, sorte, aide, obligatoire, choix), message de succès ; réception validée, piège à robots, limite d'envois, enregistrement dans « Messages reçus », notification par email (Resend). Détail : `docs/formulaires.md`.

### 1.9 Publication

Fenêtre Publier : état en ligne, écart avec la version de travail, note, historique, remettre en ligne une version, sous-domaine, référencement du site (suffixe des titres, description, image sociale, favicon). Le site publié est servi depuis l'instantané publié, jamais depuis le travail en cours. Référencement automatique, plan du site, robots. Le code head et fin de body (D40) n'est pas encore fonctionnel : pas d'interface, et l'injection actuelle n'exécute pas les scripts. Détail : `docs/publication.md`, mise en ligne : `docs/mise-en-ligne.md`.

### 1.10 Pas encore là (voir la feuille de route)

Rôles et partage par site, domaine personnalisé, export du code, code head fonctionnel, composants créés par l'utilisateur, publication du contenu seule, 404 personnalisée et redirections, interactions déclaratives, bases externes, texte riche dans les champs, sélection multiple, pagination des vues, calendrier et carte, animations d'interaction, langues multiples, membres.

## Partie 2 · Technique

### 2.1 Architecture

Monorepo npm workspaces.

- `packages/model` — types, schéma de validation (zod), opérations inversibles (`node.insert/remove/move/set/replace`, `site.set`, `batch`), historique avec fusion, arbre et index, planification des déplacements et dépôts (`planMove`, `planDrop`, `planInsert`, `planExitBox`, `canInsertUnder`), résolution de style avec sources, grille de mise en page, sources de données (`templateOf`, `dataSourceFor`, `entryPath`), site d'exemple. Sans React. Tests vitest.
- `packages/renderer` — CSS d'un site (jetons par mode, défauts de thème dans `:where()`, styles partagés, nœuds, points de rupture, états, vues de collection, séparateurs, base `hr` et champs) et rendu React (`RenderPage`, `RenderNode`, liaisons, vues, formulaires avec script, `srcset`). Le même moteur sert l'éditeur, l'aperçu et le site publié. Tests vitest.
- `apps/editor` — Next.js (App Router, Tailwind v4, lucide-react, IBM Plex) : le tableau de bord (`/`), l'éditeur (`/sites/<id>`), l'aperçu vivant (`/preview/<id>/…?editor=1`), les sites publiés (`/s/<sous-domaine>/…`, réécriture par `src/proxy.ts`), la connexion (`/connexion`, `/auth/*`), l'API. `src/proxy.ts` exige une session sur tout sauf le public (sites publiés, formulaires, fichiers, connexion) ; `lib/auth.ts` et `lib/site-access.ts` vérifient le propriétaire dans les routes.

### 2.2 Données et dépôts

- Document `Site` versionné : journal d'opérations, `commit_change` (Supabase) ou fichiers JSON (`.atelier-data/`), conflit 409 si la version de base a bougé (une seule fenêtre à la fois).
- Entrées hors document : `GET/PUT/DELETE /api/sites/:id/entries` (un `PUT` peut porter plusieurs entrées : import), envois de formulaires dans une base virtuelle `frm_<formId>` ; lecture et écriture CSV/JSON dans `lib/csv.ts`, correspondance dans `components/data/ImportDialog.tsx`, export par `GET /api/sites/:id/databases/:dbId/export`.
- Fichiers : `AssetStorage` (Supabase Storage seau `assets`, ou `.atelier-data/assets`), `POST /api/sites/:id/assets` avec sharp ; usages calculés côté éditeur (`lib/asset-usage.ts`) ; bibliothèque fournie par `MediaLibraryProvider`, ouverte par `openMediaLibrary()` ou `useMediaLibrary()`.
- Publication : `snapshots` (`kind = 'publish'`, document + entrées), `sites.published_version`, `sites.subdomain` ; `GET/POST /api/sites/:id/publish`, `POST …/publish/restore`.
- `getStore()` et `getAssetStorage()` choisissent Supabase ou fichiers ; `ATELIER_STORE=file` force les fichiers ; la clé de cache du dépôt en mémoire porte `STORE_VERSION`.
- Interface `SiteStore` : `get`, `create(site, owner)`, `listSites(owner)`, `delete`, `appendChange`, `changes`, `entries`, `setEntries`, `upsertEntries`, `deleteEntries`, `publish`, `publications`, `published`, `restore`, `findBySubdomain`.

### 2.3 Éditeur

- `useDocument` : état optimiste, envoi séquentiel, annuler / rétablir (historique pur du modèle). `useEntries` : entrées optimistes sans annulation.
- `EditorShell` : coquille (client seulement), modes, sélection, insertion, déplacement, raccourcis, palette ⌘K, panneaux, dialogues (bibliothèque, tableur, publication).
- `LivePreview` (dans l'iframe) : rendu du site + couche d'édition (sélection, survol, glisser, édition riche par `contentEditable` sérialisée en `Inline[]`, barres, menu « / »). Protocole `postMessage` : parent → iframe `atelier:site` (site, conteneurs, liens atomiques, textes, mode, blocs, entrées), `atelier:mode`, `atelier:editmode`, `atelier:highlight`, `atelier:state`, `atelier:grid`, `atelier:zoom`, `atelier:edit-text` ; iframe → parent `atelier:ready`, `select`, `move`, `drop-block`, `key`, `text`, `split`, `merge-prev`, `slash`, `style-in-context`, `set-style`, `set-tag`, `remove`, `pick-image`.
- Inspecteur : `NodeInspector` + panneaux `components/design/*` sur `useStyle` (lecture par `resolveNodeStyle`, écriture sur le point de rupture actif). Système de design de l'éditeur dans `src/ui` (jetons dans `globals.css`).

### 2.4 Rendu publié et référencement

`app/(site)/s/[sub]/[[...path]]` : instantané publié mis en cache (`unstable_cache`, étiquette `site:<id>`, invalidée avec `expire: 0`), `generateMetadata` (titre, description, canonique, Open Graph, Twitter, robots, favicon), `sitemap.xml` et `robots.txt` par site, code head et fin de body injectés.

### 2.5 Variables d'environnement

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ATELIER_ALLOWED_EMAILS`, `ATELIER_DATA_DIR`, `ATELIER_STORE`, `ATELIER_SITES_DOMAIN`, `RESEND_API_KEY`, `FORM_NOTIFY_TO`, `MAIL_FROM`, `NEXT_DIST_DIR` (second serveur de développement). Modèle dans `.env.example`.

### 2.6 Commandes et vérifications

`npm run dev`, `npm test` (modèle 55, rendu 18 au 8 sept.), `npm run typecheck`, `node --env-file=apps/editor/.env.local scripts/check-supabase.mjs`. Débogage : `window.__atelierDoc`, panneau du navigateur masqué = minuteries ralenties.
