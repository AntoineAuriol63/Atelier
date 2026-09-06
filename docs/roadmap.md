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

### M2 · Édition structurelle — prochain

Ce qui empêche aujourd'hui de construire une page : on ne peut ni ajouter ni déplacer.

- [ ] **Ajouter un bloc** : onglet Ajouter (boîte, texte, image, lien/bouton, liste, séparateur, colonnes, section, vue de base, formulaire, composant existant), insertion avant/après/dedans la sélection
- [ ] **Déplacer depuis les calques** : glisser-déposer dans l'arbre avec indicateur avant/après/dedans, respect des types conteneurs
- [ ] **Déplacer depuis le canvas** : glisser un élément sélectionné dans l'aperçu, cible calculée depuis le DOM réel, aperçu de la position
- [ ] **Largeur d'aperçu libre** : champ en pixels, poignée de redimensionnement sur le cadre, affichage du point de rupture actif
- [ ] Sélection au clavier : flèches pour parent/enfant/frères, Suppr, ⌘D dupliquer, Échap
- [ ] Renommer un calque en double-cliquant
- [ ] Arbre : replier/déplier mémorisé, défilement vers la sélection

### M3 · Panneaux Design (D19)

Le panneau de droite actuel est un échafaudage. Il est remplacé, pas amélioré.

- [ ] **Disposition** : direction, alignement, répartition, retour à la ligne, écart, mode grille (colonnes/lignes), position et calque
- [ ] **Espacement** : schéma de la boîte (marge, remplissage) cliquable, valeurs liées ou par côté
- [ ] **Dimensions** : largeur, hauteur, min et max, ratio, unités et jetons
- [ ] **Typographie** : police, taille, graisse, interligne, espacement, alignement, casse, couleur
- [ ] **Apparence** : fond (couleur, dégradé, image), bordure, arrondis, ombre, opacité
- [ ] **Effets** : transformation, transition, filtre, curseur
- [ ] Contrôles communs : champ numérique avec unité et glissement, sélecteur de couleur avec jetons, sélecteur de jeton, réinitialisation d'une propriété, indicateur de source (thème, style partagé, local, hérité du point de rupture)
- [ ] **États** : édition du survol, actif, focus, ouvert, avec prévisualisation forcée dans le canvas
- [ ] **Points de rupture** : édition par point, indicateur des valeurs héritées ou surchargées
- [ ] **Styles partagés** : appliquer, créer depuis la sélection, modifier, détacher, voir les usages
- [ ] **Thème** : panneau des jetons (couleurs par mode, polices, tailles, espacements, arrondis, ombres)
- [ ] Propriétés par type : image (source, alt, ajustement, ratio), lien (cible, nouvel onglet), texte (balise), boîte (balise sémantique, D38)
- [ ] Raccourcis clavier documentés et palette de commandes ⌘K (D06)
- [ ] Erreurs d'affichage : relever et corriger (à auditer avec l'éditeur ouvert)
- [ ] **Audit d'usage n°1** : Antoine construit une page complète et note tout ce qui bloque ; l'audit alimente les finitions de M3

### M4 · Mode Écriture (D18)

- [ ] Insertion par « / » avec recherche de blocs
- [ ] Édition du texte en place dans l'aperçu (texte riche : gras, italique, lien, listes)
- [ ] Barre d'options au survol d'un bloc (alignement, taille, variante, style en contexte)
- [ ] Glisser pour réorganiser les blocs
- [ ] Modèles de section prêts à insérer
- [ ] Style en contexte : accès au panneau Design d'un bloc sans changer de mode (D06)

### M5 · Données et formulaires

- [ ] Édition des bases : vue tableur, ajout et modification d'entrées, champs image et galerie
- [ ] Gestion des champs : ajouter, typer, réordonner
- [ ] Vues : choix de la disposition, filtre, tri, limite, colonnes par point de rupture
- [ ] Modèle de page : liaison des champs depuis le panneau, aperçu avec une entrée au choix
- [ ] **Formulaire de contact fonctionnel** : réception des envois (`POST /api/forms/:id`), stockage dans une base du site, notification par email, anti-spam
- [ ] Médias : import d'images (stockage Supabase), conversion HEIC, déclinaisons optimisées (D37)

### M6 · Publication

- [ ] Rendu statique du site publié, séparé de l'éditeur (D35)
- [ ] Sous-domaine `nom.atelier.site` (nom de domaine à acheter `[?]`), certificat automatique
- [ ] Publier / versions / retour arrière (D36), avec instantané dans Supabase
- [ ] SEO automatique : balises, Open Graph, sitemap, robots (D38)
- [ ] Mode sombre publié, polices chargées proprement, performances mesurées

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

## Décisions ouvertes

- `[?]` Nom définitif du produit et domaine des sous-domaines (avant M6 · Publication).

## Journal

- 6 sept. 2026 — M0 terminé. Supabase branché et vérifié. Remarques d'Antoine sur le mode Design intégrées dans M1 à M3. Trois décisions prises (identité, nom, hébergement). Prochaine étape : M1, système de design.
- 6 sept. 2026 (soir) — M1 posé : jetons sombres et denses (`globals.css`), primitives `src/ui`, coquille et inspecteur refaits, IBM Plex via next/font, icônes Lucide. Prochaine étape : M2, édition structurelle.
