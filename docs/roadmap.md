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
- 6 sept. 2026 (nuit) — M2 terminé : palette de blocs, glisser-déposer dans les calques et dans le canvas (planification pure et testée dans le modèle), largeur libre avec poignée et point de rupture actif, raccourcis clavier, renommage en place. Correctif : `null` vaut retrait sur un champ optionnel (les erreurs serveur affichent le détail). Prochaine étape : M3, panneaux Design.
- 7 sept. 2026 — M3 session 1 : résolution de style avec sources dans le modèle (testée), contrôles communs (pastille de source, champ de longueur, groupe exclusif, schéma de boîte), panneaux Disposition, Espacement, Dimensions, Responsive ; édition sur le point de rupture actif. Correctif : un retrait (`value` absente) est valide côté serveur. Session 2 : Typographie, Apparence, couleur et jetons, Effets.
- 7 sept. 2026 — M3 session 2 : sélecteur de couleur, Typographie, Apparence, Effets, panneaux Image, Lien, Balise et Collection. Session 3 à faire : états (survol…), styles partagés (appliquer, créer, modifier, détacher), thème (jetons), raccourcis et ⌘K, réglage des points de rupture, puis audit d'usage n°1.
- 8 sept. 2026 — M4 Écriture, première version : mode Écriture / Design réel dans la barre (mémorisé), édition riche dans le canvas, barres flottantes, menu /, Entrée et Retour arrière à la Notion, modèles de sections. Reste pour un M4 bis : listes à puces depuis le menu de bloc, sélection multiple, texte riche dans les champs de base de données. Exercice de construction d'une page en Écriture (8 sept.) : titre, Entrée, paragraphe, « / » → section Trois points forts, édition dans une carte avec Entrée qui reste dans la carte, déplacement d'une section par la poignée gauche : tout passe ; poignée et « + » déplacés à gauche du bloc comme dans Notion ; grille masquée en Écriture. Retours d'Antoine (8 sept.) : Entrée en début de bloc crée le bloc vide au-dessus et laisse le texte (comme Notion), Entrée dans un bouton ne crée rien ; la barre de bloc reste affichée jusqu'au survol d'un autre bloc (la poignée est atteignable) ; un texte relié à une base explique au clic qu'il se modifie dans la base ; Ctrl/⌘Z pendant la frappe annule la frappe puis, une fois épuisée, l'opération précédente. Suite : la barre de bloc ne saute plus sur le parent pendant le trajet vers la poignée et ne se cache plus en sortant du cadre ; poignée à l'intérieur du bloc près d'un bord ; même moteur d'édition riche en Design (double-clic) et en Écriture (clic), conformément à D06. Bug du bouton Écriture qui ne répondait pas au premier clic : divergence entre le pré-rendu serveur et l'état mémorisé dans le navigateur ; la coquille de l'éditeur n'est plus pré-rendue (client seulement). Glisser puis se raviser : relâcher sur sa propre place ne change rien (et n'entre pas dans l'historique), Échap annule le glissement ; les barres dans l'aperçu compensent l'échelle de réduction pour rester à taille réelle.
- 7 sept. 2026 — Grille de mise en page (modèle `settings.layoutGrid`, cascade par point de rupture, testée) et calque dans l'éditeur.
- 7 sept. 2026 — M3 session 3 : états avec prévisualisation forcée, styles partagés complets, onglet Thème avec points de rupture, palette ⌘K. Reste : erreurs d'affichage à relever pendant l'audit d'usage n°1, qui est la prochaine étape.
