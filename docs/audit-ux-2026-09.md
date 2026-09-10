# Audit UX d'expert — Atelier, l'éditeur (10 septembre 2026)

Périmètre : les quatre modes de l'éditeur (Design, Écriture, Données, Publication), le tableau de bord, la connexion et la bibliothèque d'images. Six angles : parcours par tâches, évaluation heuristique, architecture de l'inspecteur, accessibilité et clavier, cohérence du système de design, performance perçue.

Méthode : audit d'expert, sans test utilisateur. Trois lectures complètes du code de `apps/editor` (inspecteur et panneaux Design ; Écriture, Données, Publication, tableau de bord, médias ; accessibilité et système de design), plus des mesures en direct dans l'éditeur (latence par opération, densité des contrôles, contrastes calculés, gestes comptés) et le vécu de la reconstruction de « Maison Aurèle » (≈ 450 gestes, `docs/audit-usage-restaurant.md`). Les références de code sont données en `fichier:ligne` relatif à `apps/editor/src`.

Ce que l'audit ne couvre pas : la découvrabilité réelle par des designers (elle se mesure sur des personnes, pas par lecture), la manipulation directe à la souris sur la toile (le panneau de test ne transmettait pas les clics), et l'usage en conditions de production (mesures faites sur un serveur de développement).

## 1. Synthèse

**Verdict.** Atelier a un modèle sous-jacent solide et plusieurs mécanismes que Webflow, Framer ou Notion n'ont pas (pastille de source des valeurs, bandeau de contexte « vous réglez Mobile · Survol », fusion d'historique au glissement, liaison automatique des cartes, conséquences listées avant une suppression, reprise réseau, qualité des textes d'aide). Ses faiblesses sont concentrées, et la plupart sont bon marché : un inspecteur trop dense qui oublie ce qu'on lui a ouvert, un clavier dangereux hors des champs de saisie, un contrat d'accessibilité solide sur le papier mais troué sur les points structurants (arbre des calques inaccessible, origine des valeurs signalée par la couleur seule, bordures de champs invisibles), et une poignée de bugs de flux qui trahissent l'utilisateur au pire moment (« / » intapable en Écriture, ⌘Z qui annule une opération du document pendant qu'on tape, session gelée sur un 403 de rôle).

**Cinq chiffres.**

| Mesure | Valeur | Repère |
|---|---|---|
| Contrôles visibles par défaut, texte sélectionné | 66 (99 pour un bouton) | Figma : ≈ 25 pour un calque texte |
| Latence édition → aperçu | 108 à 149 ms | RAIL : 100 ms perçu comme instantané, 400 ms limite Doherty |
| Échecs WCAG 2.2 de niveau A ou AA relevés | 11 critères | Cible AA : 0 |
| Gestes pour animer un bouton au survol avec transition | 8 à 12 | Webflow : 6 à 10 ; Framer : 3 à 5 |
| Constats consolidés dans ce rapport (section 4) | 79, dont 4 en sévérité 4 et 36 en sévérité 3 ; les trois lectures détaillées en comptent environ 145 | Échelle Nielsen 0–4 |

**Les dix corrections qui rapportent le plus** (impact ÷ effort, toutes lectures confondues) :

1. **Clavier sûr** : conditionner Suppr, Retour arrière, flèches et Entrée au focus dans l'arbre ou l'aperçu, rendre l'arbre des calques focalisable, et passer le garde `isTyping()` **avant** ⌘Z et ⌘K (`EditorShell.tsx:341-388`, `ui/TreeRow.tsx:19-44`). Trois échecs de niveau A et deux pertes de données surprises réglés d'un coup.
2. **Ne plus geler la session** sur un 403 de rôle ni sur un conflit sans issue : filtrer côté client avec `opAllowedForWriter`, masquer les contrôles interdits au rédacteur, traiter 403 comme un retour arrière local, garder « Recharger » visible, offrir « Copier mes changements », ajouter `beforeunload` (`lib/use-document.ts:30-73`).
3. **Inspecteur qui se souvient** : persister l'ouverture des sections par titre, et `defaultOpen` par type de nœud (texte → Texte + Typographie ; boîte → Disposition + Espacement). Un clic de moins par élément, toute la journée, et 66 contrôles ramenés à une quinzaine (`ui/Panel.tsx:29`, `NodeInspector.tsx:265-270`).
4. **Rendre « / » tapable** en Écriture et unifier Échap (annuler partout ; l'aide de l'inspecteur dit déjà « Échap annule », l'aperçu fait l'inverse) (`LivePreview.tsx:543-559`, `NodeInspector.tsx:227`).
5. **Origine des valeurs lisible sans la couleur** : forme ou glyphe par origine (le ◆ existe déjà), cible 24 px, infobulle atteignable au clavier, « défaut » au-dessus de 3:1 (`ui/controls/SourceDot.tsx`).
6. **Trois jetons de couleur** : relever `line`, `line-strong` et le fond des champs à 3:1, éclaircir `dim` (`globals.css:15-16`). Répare les limites de tous les champs et ≈ 50 emplacements de texte 10 px.
7. **Réparer `revealProp`** : passer `prop` (et `onScrub`) dans les trois helpers `row()` et `data-prop` sur `BoxModel`. Le bouton « Animer », les pastilles de « Tailles d'écran » et le glissement de valeur marchent alors partout (`TypographyPanel.tsx:19`, `AppearancePanel.tsx:85`, `EffectsPanel.tsx:63`, `BoxModel.tsx:26`).
8. **Corriger les quatre aides fausses** (Entrée/Échap, « bleu posé ici », « (Avancé) », parallaxe vs interactions) et ajouter un test qui vérifie que tout nom de section cité dans une aide existe.
9. **Région live et titres** : un conteneur `aria-live` permanent, `role="alert"` pour les erreurs, annonce des changements de contexte (état, variante, style partagé, composant), `PanelHeading` unique avec `as="h2/h3"` à la place des ~20 réimplémentations de l'intitulé en capitales (`EditorShell.tsx:553-559`, `ui/Panel.tsx:21`).
10. **Scinder « Publier »** en « Publier » (état, adresse, action, contenus, historique) et « Réglages du site » (SEO, 404, redirections, code, export, partage), avec l'action primaire en pied de dialogue et un bouton désactivé qui dit pourquoi (`PublishDialog.tsx:102-232`, `ui/Dialog.tsx`).

## 2. Cadre de référence

L'évaluation s'appuie sur les grilles reconnues du domaine, et sur les conventions des outils que les designers connaissent déjà.

- **Nielsen, dix heuristiques** (1994, révision 2020) et l'échelle de sévérité 0–4 associée (0 non-problème, 1 cosmétique, 2 mineur, 3 majeur, 4 catastrophe).
- **ISO 9241-110:2020**, sept principes de dialogue : aptitude à la tâche, auto-descriptivité, conformité aux attentes, aptitude à l'apprentissage, contrôlabilité, tolérance aux erreurs, engagement.
- **Shneiderman, huit règles d'or** (cohérence, raccourcis, retour informatif, clôture, prévention des erreurs, réversibilité, maîtrise, charge mémorielle).
- **WCAG 2.2 AA** et **WAI-ARIA Authoring Practices 1.2** (motifs onglets, arbre, combobox, dialogue, groupe radio).
- **Performance perçue** : modèle RAIL de Google (réponse sous 100 ms perçue comme immédiate, 100–300 ms perceptible, animation à 16 ms), seuil de Doherty (400 ms), loi de Fitts (taille et distance des cibles), loi de Hick (nombre d'options), divulgation progressive (Cooper, *About Face*).
- **Conventions d'outils** : Figma (inspecteur par sections, valeurs mixtes, composants à propriétés et variantes), Webflow (panneau de style, états, interactions, CMS, publication multi-cibles, confirmation par frappe du nom), Framer (popover de publication, réglages séparés), Notion (édition en ligne, menu « / », poignée de bloc, bases).

## 3. Parcours par tâches

Un geste = un clic, un raccourci, un glisser ou une ouverture de sélecteur de fichier ; la frappe n'est pas comptée. Les gestes marqués « mesuré » ont été exécutés dans l'éditeur ; les autres sont dérivés du code.

| Tâche | Gestes | Source | Frictions principales |
|---|---|---|---|
| Créer un site depuis un modèle | 3 | mesuré | Choix du modèle aveugle : ni vignette ni aperçu (`Dashboard.tsx:56-68`) |
| Nouvelle page | 4 | mesuré | Bon ; « Nouvelle page » sans ellipsis alors que la palette dit « Nouvelle page… » |
| Poser un héros | 2 | mesuré | Placement après la sélection courante ; un double clic pose deux héros, sans garde-fou |
| Écrire un paragraphe, gras, lien, couper, insérer un bloc | 1 + 3 + 4 + 1 + 2 | code | Curseur flèche sur les textes éditables ; « / » intapable ; lien stocké en URL brute, pages par entrée absentes de la liste ; Backspace ne fusionne qu'un bloc vide |
| Bouton : couleur au survol + transition | 8 à 12 | code + mesuré | Barre ÉTAT peu explicite ; bouton « Animer » 20 px ; `revealProp` n'atteint pas la ligne Transition ; l'état forcé suit la sélection suivante |
| Appliquer un style partagé, puis le modifier | 4 à 7 | code | Section fermée quand aucun style n'est appliqué (inverse du besoin) ; trois icônes quasi identiques crayon / maillon / croix ; impossible de renommer ou supprimer un style |
| Section responsive (colonnes sur mobile) | 3 à 5 | code | Deux modèles mentaux opposés : boîte = largeur d'aperçu + Disposition ; vue = matrice par point de rupture insensible au point actif |
| Composant à propriété + deuxième instance | ≈ 11, 3 changements de contexte | code | « Modifier le composant » évoque l'édition du contenu, pas la déclaration de propriétés ; le modèle « déclarer sur la racine, lier sur l'enfant, valoriser sur l'instance » n'est jamais énoncé |
| Apparition sur un élément, cascade sur les voisins | 2 + 1 | mesuré | Bon (palette ⌘K puis « Décaler les voisins ») |
| Base à 3 champs, import CSV, entrée publiée, coquille | 4 + ≈ 12 + 4 + 3 + 1 | code | Pas d'« Annuler » dans l'éditeur de champ ; conversions CSV muettes ; « Nouvelle entrée » sans focus ; « publiée » ne met rien en ligne |
| Vue de base et carte liée | 2 + 4 | code | Carte liée automatiquement (mieux que Webflow) ; en Écriture la vue est atomique : le rédacteur ne peut jamais toucher une carte |
| Formulaire, destinataire, message reçu | 1 + 2 + 2 | code | Notification non configurée = silence total ; messages reçus modifiables et supprimables malgré `readOnly` |
| Publier, nom, sous-domaine, 404, zip, inviter | 2–3, 2, 1, 1, 3 | code | Huit sections dans un dialogue ; sous-domaine réécrit sans explication ; invitation sans email ; « Retirer l'accès » sans confirmation |
| Importer, poser, remplacer, nettoyer des images | 4, 2, 2 | code | Excellent (clic sur image vide, HEIC, usages listés) ; remplacement partout sans confirmation |

Ce que le comptage dit : sur les tâches de contenu, Atelier est au niveau ou devant (Écriture, images, cartes liées, apparitions). Sur les tâches de style fin (survol, responsive, styles partagés), il coûte deux à quatre gestes de plus que nécessaire, presque toujours à cause de sections fermées, d'un contrôle mal placé ou d'un libellé qui n'annonce pas ce qui va suivre.

## 4. Évaluation heuristique

Constats consolidés des trois lectures, classés par heuristique. Sévérité sur l'échelle de Nielsen.

### H1 · Visibilité de l'état du système

| Sév. | Constat | Référence |
|---|---|---|
| 3 | L'état de publication n'existe que dans le dialogue ; la barre du haut ne montre que « Publier » | `EditorShell.tsx:514`, `PublishDialog.tsx:98-108` |
| 3 | L'état forcé (survol) fuit d'un élément au suivant : `state` est local à l'inspecteur remonté par `key`, `previewState` reste dans le shell | `NodeInspector.tsx:84-88`, `EditorShell.tsx:329,574` |
| 3 | Pendant la frappe dans l'aperçu rien n'est envoyé, mais le badge affiche « Enregistré · v12 » ; aucun `beforeunload` | `LivePreview.tsx:341-353`, `EditorShell.tsx:94,505` |
| 3 | « Publier maintenant » grisé sans raison affichée ; après une erreur réseau, `dirty` reste vrai et le message dit « Enregistrement en cours… » | `PublishDialog.tsx:108,114`, `EditorShell.tsx:585` |
| 3 | Notification email non configurée : rien n'est envoyé, l'interface ne le dit jamais | `lib/mail.ts:6` |
| 3 | Export CSV depuis les messages : aucun `notify` passé, échec silencieux | `EditorShell.tsx:584` |
| 2 | Le préréglage de largeur (Bureau / Tablette / Mobile) se désélectionne quand on clique une ligne de « Tailles d'écran » | `EditorShell.tsx:412-416,495` |
| 2 | Les libellés d'historique existent (« Retirer l'état Survol ») mais Annuler / Rétablir ne les montrent jamais | `EditorShell.tsx:502-503`, `history.ts:45` |
| 2 | Le mode d'aperçu (clair / sombre) n'est signalé nulle part quand on règle une couleur | `ColorInput.tsx:42-47` |
| 2 | Une coupure réseau récupérable est annoncée en ton « danger », compte à rebours figé, pas de « Réessayer » | `lib/use-document.ts:59-68` |
| 2 | Section Partage absente sans erreur si `GET /members` échoue | `PublishDialog.tsx:42` |

### H2 · Correspondance avec le monde réel

| Sév. | Constat | Référence |
|---|---|---|
| 4 | Le contrat affiché aux rédacteurs (« textes, images, entrées ») est faux : les images sont hors de leur portée | `PublishDialog.tsx:207`, `Dashboard.tsx:75` |
| 3 | « Calque » désigne `zIndex` alors que « Calques » est l'arbre du document | `LayoutPanel.tsx:137`, `prop-labels.ts` |
| 3 | Syntaxe des jetons exposée et incohérente : CSS brut n'accepte que `{groupe.nom}`, l'aide d'Espacement enseigne `space.4` sans accolades ; le résultat est du CSS invalide, silencieux | `NodeInspector.tsx:69-74`, `SpacingPanel.tsx:12`, `lib/css-value.ts:57-59` |
| 3 | Messages exposant les types internes : « Un text n'accepte pas d'enfants » (`TYPE_LABEL` existe) | `packages/model/src/move.ts:60,108` |
| 3 | « publiée » (entrée) ne met rien en ligne, mais le pied du tableau laisse croire l'inverse | `DatabaseTable.tsx:303` |
| 2 | « CSS brut » comme section visible de tous ; « Adresse » désigne quatre choses (page, entrée, URL, email) ; « clé », « liaisons », « Open Graph », « déclinaisons », « point de rupture » | `NodeInspector.tsx:279`, `DatabaseTable.tsx:155`, `PublishDialog.tsx:128-133`, `MediaLibrary.tsx:195` |
| 2 | Trois noms pour le point de rupture de base : « Tous les écrans », « Base », « Bureau » | `EditorShell.tsx:34,411`, `useStyle.ts:44` |
| 2 | Rôle « Formulaire » pour un bouton ; « bouton avec le type « envoi » » n'existe nulle part | `TypePanels.tsx:84,234` |

### H3 · Contrôle et liberté

| Sév. | Constat | Référence |
|---|---|---|
| 4 | Un rédacteur peut déclencher un `site.set` (import d'image, champ, base) : 403 serveur, puis **toute la session est gelée** « rechargez la page » | `lib/use-document.ts:46-52`, `MediaLibrary.tsx:25`, `DataPanel.tsx:41` |
| 4 | ⌘Z et ⌘K sont traités avant le garde `isTyping()` : ⌘Z dans une cellule annule une opération du document | `EditorShell.tsx:345-349` |
| 4 | Impossible de taper « / » en mode Écriture (avalé à l'ouverture du menu et pendant le filtrage) | `LivePreview.tsx:543,559` |
| 3 | Les sections se referment à chaque changement de sélection (`useState` local, inspecteur remonté par `key`) | `ui/Panel.tsx:29`, `EditorShell.tsx:574` |
| 3 | Sur conflit de version, l'éditeur devient inerte ; « Recharger » disparaît dès qu'un autre message passe ; aucune issue pour le travail local | `lib/use-document.ts:40-45,85-102`, `EditorShell.tsx:557` |
| 3 | Retirer une propriété de composant casse silencieusement les liaisons des enfants et les valeurs des instances | `ComponentPanels.tsx:87` |
| 3 | Édition d'un style partagé : Supprimer / Dupliquer / Monter restent actifs sur le nœud, « Place dans son parent » montre le parent d'un seul usage | `NodeInspector.tsx:140-154,186-191,265` |
| 3 | Styles partagés ni renommables ni supprimables ; les préréglages les retrouvent par nom | `SharedStylesPanel.tsx`, `lib/blocks.ts:10` |
| 3 | Échap valide dans l'aperçu, annule dans le tableur, ferme dans un dialogue ; l'aide dit « Échap annule » pour l'aperçu | `LivePreview.tsx:548`, `DatabaseTable.tsx:42`, `NodeInspector.tsx:227` |
| 3 | Aucune annulation pour les entrées (hors journal) : un import ou une suppression de ligne est définitif | `lib/use-entries.ts:10` |
| 3 | Échap dans un dialogue imbriqué ferme les deux (`stopPropagation` au lieu de `stopImmediatePropagation`) | `ui/Dialog.tsx` |
| 2 | Retirer une police chargée sans vérifier ses usages (les points de rupture, eux, sont protégés) | `ThemePanel.tsx:93,172` |
| 2 | Pas d'Escape en cascade (style partagé → variante → état → désélection) ; ⌘S non intercepté | `NodeInspector.tsx:88,189`, `EditorShell.tsx:351` |
| 2 | Backspace en début de bloc non vide ne fusionne pas (Notion le fait) | `LivePreview.tsx:561` |

### H4 · Cohérence et standards

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Quatre patrons pour un oui/non : Toggle, Segmented à une option, Segmented Oui/Non, NumberInput vide | `TypePanels.tsx:97`, `TypographyPanel.tsx:41`, `PagesPanel.tsx:156`, `EffectsPanel.tsx:110` |
| 3 | Actions primaires des dialogues dans l'en-tête à côté de la croix ; `Confirm` les met en pied ; « Publier » n'a pas de pied | `ui/Dialog.tsx`, `ui/Confirm.tsx`, `ImportDialog.tsx:93` |
| 3 | Deux mécanismes opposés pour la même tâche responsive (boîte vs vue de base) | `LayoutPanel.tsx:91-96`, `TypePanels.tsx:208-212` |
| 2 | Segmented : « cliquer l'actif le retire », contrat rompu par trois appelants qui filtrent `undefined` | `Segmented.tsx:23`, `TypePanels.tsx:84,206`, `LayoutPanel.tsx:98` |
| 2 | Select vs Segmented sans règle ; POSITION à cinq segments tronqués dans 340 px | `LayoutPanel.tsx:46-49,131` |
| 2 | Deux familles de champs numériques (UnitInput avec jetons, NumberInput sans) ; l'opacité est le seul curseur de l'inspecteur | `AppearancePanel.tsx:151`, `EffectsPanel.tsx:78-101` |
| 2 | Deux contrôles côte à côte pour `gridTemplateColumns` qui s'écrasent mutuellement | `LayoutPanel.tsx:91-96` |
| 2 | « Retirer » pour une destruction définitive d'image, « Retirer » réversible quatre lignes plus bas ; ellipsis d'ouverture de dialogue appliquée à moitié ; Ajouter / Nouveau / Créer alternent | `MediaLibrary.tsx:214,218`, `PagesPanel.tsx:173`, `Dashboard.tsx:54,64` |
| 2 | Export zip sans état « en cours » alors que Publier en a un | `PublishDialog.tsx:114,181` |
| 1 | « Position et débordement » rendue avant Espacement et Dimensions | `NodeInspector.tsx:265-267` |

### H5 · Prévention des erreurs

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Aucune validation de valeur de style : `16p`, `blue-ish`, `background-color` acceptés, enregistrés, publiés, sans effet ni avertissement | `lib/css-value.ts:67`, `packages/model/src/schema.ts:38` |
| 3 | Les refus de dépôt n'arrivent qu'après l'échec (toast 4 s) ; l'indicateur de dépôt ne consulte pas `planMove` | `EditorShell.tsx:61,212-213` |
| 3 | La confirmation `danger` donne le focus au bouton destructeur : Entrée supprime | `ui/Confirm.tsx` |
| 3 | Corbeille de la barre de bloc adjacente au « + », suppression immédiate sans toast ; Backspace transmis depuis l'aperçu supprime une section entière | `LivePreview.tsx:193-198`, `EditorShell.tsx:309,357` |
| 3 | Supprimer un formulaire porteur de messages les rend inaccessibles sans avertissement | `lib/forms.ts:6-16` |
| 3 | Sous-domaine réécrit en direct sans explication, sans aperçu d'URL ni contrôle de disponibilité | `PublishDialog.tsx:129` |
| 3 | Conversions CSV impossibles supprimées en silence ; colonnes inconnues → « Nouveau champ » par défaut | `ImportDialog.tsx:44,82` |
| 2 | Propriété CSS ajoutée vide et persistée ; « Animer » écrit sur Base sans le dire ; `goToBreakpoint` vise exactement la borne | `NodeInspector.tsx:116,289`, `EditorShell.tsx:415` |
| 2 | « Remplacer le fichier… » change l'image partout sans confirmation ; « Retirer l'accès » sans confirmation ; nom du site vidé → « Site » | `MediaLibrary.tsx:212`, `PublishDialog.tsx:128,197` |
| 2 | `set-tag` ne repasse pas par `fitHeadings` : deux `h1` possibles | `EditorShell.tsx:307` |

### H6 · Reconnaître plutôt que se rappeler

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Valeurs du thème à taper à la main dans huit endroits (CSS brut, ombre, grilles, ratio, transform, filtre, couleur de propriété) | `NodeInspector.tsx:285`, `AppearancePanel.tsx:146`, `LayoutPanel.tsx:93-123`, `ComponentPanels.tsx:59` |
| 3 | Curseur flèche forcé sur les textes éditables en Écriture : rien n'indique qu'un texte s'édite | `LivePreview.tsx:646` |
| 2 | Balise HTML et « En faire un composant… » enterrés dans « Élément » fermée | `NodeInspector.tsx:199,208` |
| 2 | Cibles d'interaction limitées aux éléments nommés, aide seulement quand la liste est vide | `InteractionsPanel.tsx:25,69` |
| 2 | Repère « Tapez du texte, ou / … » lié à `:empty`, donc après le clic et fragile | `LivePreview.tsx:648` |
| 2 | Choix du modèle de site sans image ; tableau de bord vide avec l'aide sous la grille | `Dashboard.tsx:56-68,90` |
| 2 | Motif d'adresse d'un modèle expose la clé `{slug}` au lieu du libellé du champ | `PagesPanel.tsx:151-153` |

### H7 · Flexibilité et efficacité

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Pas de multi-sélection (`selected: string | null`) : ni alignement, ni style en lot | `EditorShell.tsx:116` |
| 2 | Glissement de valeur excellent mais invisible (infobulle après 150 ms) et disponible sur une partie des libellés seulement | `PropRow.tsx:22-27` |
| 2 | La palette ne navigue pas dans l'inspecteur ni entre points de rupture ; pas de raccourcis largeur / survol | `EditorShell.tsx:436-466` |
| 2 | Tableur sans tri, filtre, recherche ni vue détail ; clic sur l'en-tête = éditeur de champ | `DatabaseTable.tsx:268-276` |
| 2 | Pas de défilement automatique pendant un glisser dans l'aperçu | `LivePreview.tsx:450-481` |
| 1 | Fenêtre de fusion d'historique de 1 s pour les saisies clavier | `history.ts:27` |

### H8 · Esthétique et minimalisme

| Sév. | Constat | Référence |
|---|---|---|
| 3 | 66 contrôles visibles pour un texte, 99 pour un bouton ; Espacement et Dimensions ouvertes, Typographie fermée | mesuré ; `SpacingPanel.tsx:10`, `SizePanel.tsx:43`, `TypographyPanel.tsx:28` |
| 3 | Dialogue Publier à huit sections dans 640 px, historique tout en bas | `PublishDialog.tsx:102-232` |
| 2 | Chaque aide rendue deux fois (infobulle 11 px et paragraphe) ; Dimensions expose sept champs ; Effets montre cinq filtres neutres ; jusqu'à cinq bandeaux empilés | `ui/Panel.tsx:43,47`, `SizePanel.tsx:54-60`, `EffectsPanel.tsx:97-101`, `NodeInspector.tsx:157-196` |
| 2 | Deux affordances concurrentes en Écriture (barre flottante et poignée ⋮⋮) ; toast répété à chaque sélection d'un texte lié | `LivePreview.tsx:166-216`, `EditorShell.tsx:292-296` |

### H9 · Aide à reconnaître et corriger les erreurs

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Le conflit (bloquant) est annoncé en `role="status"` ; les erreurs ont la politesse d'un « Copié » | `EditorShell.tsx:554-557` |
| 3 | Erreurs CSV réduites à « Import impossible : Fichier vide » | `DatabaseTable.tsx:240-241` |
| 2 | `notify` en ton danger par défaut ; toasts 3,5–4 s sans fermeture, sans action « Annuler », un seul à la fois | `EditorShell.tsx:159-162,554` |
| 2 | Messages techniques renvoyés tels quels (« Opération 0 invalide », issues zod) ; erreurs sans cause (« Impossible d'ajouter un paragraphe ici ») | `api/sites/[id]/changes/route.ts`, `EditorShell.tsx:377` |
| 1 | L'erreur de redirection remplace l'aide au lieu de s'y ajouter | `PublishDialog.tsx:166` |
| 0 | À conserver : conflit 409 et perte réseau bien expliqués, `askConfirm` avec conséquences | `lib/use-document.ts:40-66`, `EditorShell.tsx:188-192` |

### H10 · Aide et documentation

| Sév. | Constat | Référence |
|---|---|---|
| 3 | Quatre aides fausses ou contradictoires : « Entrée valide, Échap annule », « bleu posé ici », « (Avancé) », aperçu « Voir » joue / ne joue pas | `NodeInspector.tsx:227`, `SpacingPanel.tsx:12`, `AppearancePanel.tsx:125`, `EffectsPanel.tsx:112` |
| 2 | Aucune aide de tâche (survol → transition, composant → propriété → liaison) ; liste des raccourcis consultable nulle part | — |
| 2 | Invitation : aucun email envoyé, l'aide ne le dit pas ; « Renvoyer le lien » absent de la connexion alors que l'aide y invite | `PublishDialog.tsx:207`, `SignIn.tsx:36` |

**Répartition des constats consolidés ci-dessus** : sévérité 4 : 4 · sévérité 3 : 36 · sévérité 2 : 35 · sévérité 1 : 3 · sévérité 0 (à conserver) : 1. Les 4 « catastrophes » : ⌘Z qui annule le document pendant qu'on tape dans un champ, la session gelée sur un 403 de rôle, le contrat affiché aux rédacteurs qui est faux, et le « / » intapable en Écriture.

## 5. Architecture de l'inspecteur

**Ordre et ouverture par défaut.** Vingt-cinq sections possibles, quatorze ou quinze rendues pour un texte, trois ouvertes : « Texte », « Espacement », « Dimensions ». Les sections ouvertes sont les moins utiles à un texte ; « Typographie » est fermée. Un bouton affiche 99 contrôles. Figma en montre une vingtaine pour un calque comparable, avec les sections rares (effets, export) repliées et mémorisées.

**Ce qui coûte le plus** : l'ouverture d'une section ne survit pas à un changement de sélection (`useState` local dans `ui/Panel.tsx:29`, inspecteur remonté par `key={node.id}`). Sur un site réel, c'est un clic supplémentaire par élément, sans fin. La correction tient en un contexte (ou `localStorage`) indexé par titre de section.

**Collisions de libellés** (visibles simultanément) : « Nom » (calque, composant, page, point de rupture), « Texte » (section et propriété de composant), « Ancre » (poser / viser), « Page » (racine des calques et champ Lien), « Disposition » (flex/grid et disposition d'une vue), « Affichage » (prop et section), « Colonnes » (grille, vue, thème), « Calque » (`zIndex`) contre « Calques ». Trois noms pour le même point de rupture de base. `revealProp` cherche `data-prop="color"` et trouve `data-prop="Couleur"` : le mécanisme de « aller au réglage » est cassé pour Typographie, Apparence, Effets et le schéma de boîte.

**Recommandation d'ordre** (haut → bas, du contenu vers le détail) : Élément (nom, balise, ancre, composant) ouverte ; puis, selon le type, la section de type (Texte, Image, Lien, Vue, Formulaire, Champ) ouverte ; Données ; Disposition ; Typographie (ouverte pour un texte) ; Espacement ; Dimensions ; Apparence ; Effets ; Interactions ; Styles partagés (ouverte s'il en existe dans le site) ; Tailles d'écran ; CSS brut derrière un réglage « développeur ». Un seul bandeau de contexte (« Mobile · Survol · style « Bouton » ») à la place de cinq.

## 6. Accessibilité et clavier

L'éditeur n'a qu'un thème (sombre). Contrastes calculés sur les jetons de `globals.css`.

| Texte | sur panneau | sur surface | sur survol | sur surélevé |
|---|---|---|---|---|
| `ink` | 14,1 | 12,7 | 11,6 | 10,6 |
| `muted` | 6,4 | 5,8 | 5,2 | 4,8 |
| `dim` | 5,2 | 4,6 | **4,2** | **3,9** |
| `accent` | 7,0 | 6,3 | 5,7 | 5,3 |
| `danger` | 6,0 | 5,4 | 4,9 | **4,5** |

Cibles WCAG : 4,5 pour le texte, 3,0 pour les composants d'interface. Les bordures et fonds de champs sont très en dessous : `line` sur `surface` 1,1, `line-strong` sur `panel` 1,5, `surface` sur `panel` 1,25. Les limites de tous les champs de l'éditeur sont invisibles en basse vision. Le texte le plus fréquent est en 11 px (81 usages) et 10 px (67), dont 48 combinaisons 10 px + `dim`.

**Échecs par critère WCAG 2.2**

| Critère | Niveau | Où |
|---|---|---|
| 1.3.1 Information et relations | A | Aucun titre h1–h6 dans l'éditeur ; `PublishDialog` a sept h3 sans h1/h2 ; tableau sans `caption` ni `scope` |
| 1.4.1 Utilisation de la couleur | A | Origine des valeurs (`SourceDot`, quatre teintes d'un point de 6 px), statut publié / brouillon (disque vert vs cercle gris), point de rupture actif |
| 1.4.3 Contraste du texte | AA | `dim` sur survol, surélevé, accent-soft (`ColorInput.tsx:84`, `TreeRow.tsx:65`, `ResponsivePanel.tsx:39`) |
| 1.4.11 Contraste non textuel | AA | Bordures et fonds de champs, pastille « défaut », bordures du tableau |
| 2.1.1 Clavier | A | Arbre des calques sans `tabIndex` ; reparentage à la souris seule ; `ColorInput` ne se ferme pas à Échap ; Entrée sur un bouton focalisé exécute aussi l'action globale |
| 2.1.4 Raccourcis à touche unique | A | « / » en Écriture, non désactivable |
| 2.4.1 Contourner des blocs | A | Aucun lien d'évitement, ~20 contrôles avant le panneau gauche |
| 2.5.7 Mouvements de glissement | AA | Reparentage des calques sans alternative clavier |
| 2.5.8 Taille de cible | AA | `SourceDot` 12 px, pastille de statut 8 px |
| 3.3.2 Étiquettes | A | Champs à placeholder seul (bibliothèque ×5, CSS brut, palette), case à cocher dans un label vide |
| 4.1.2 Nom, rôle, valeur | A | Trois boutons iconiques sans nom (`AppearancePanel.tsx:70`, `DatabaseTable.tsx:102,284`), `radiogroup` sans nom, `label` autour d'un groupe |
| 4.1.3 Messages d'état | AA | Région live montée avec son contenu, aucun `role="alert"`, bandeaux de contexte non annoncés |

**Ce qui est bon** : `IconButton` exige un libellé (32 usages, tous nommés) ; `Dialog` a un vrai piège à focus, Échap et retour du focus ; `Toggle` est une case native ; `:focus-visible` global existe (mais dix `outline-none` inopérants attendent qu'on déplace la règle dans une couche pour tout casser) ; `lang="fr"` ; `tableKeys` du tableur ; `NumberInput` et `UnitInput` avec flèches ±pas et ⇧×10.

**Clavier** : les raccourcis destructifs (Suppr, Retour arrière) et de navigation (flèches, Entrée) sont actifs depuis n'importe quel bouton focalisé, parce que le garde ne teste que les champs de saisie (`EditorShell.tsx:98-101`). Les flèches sont `preventDefault` partout et inertes hors de l'onglet Calques : le défilement clavier des panneaux est cassé. Aucun moyen d'entrer ou de sortir de l'iframe d'aperçu au clavier. `Ctrl G` entre en conflit avec « Rechercher suivant » de Firefox et Safari. Tabs et Segmented n'ont ni tabindex tournant ni flèches : traverser Disposition demande des dizaines de Tab.

## 7. Cohérence du système de design

**Écarts aux jetons.** Deux hexadécimaux inventés sur la ligne du toast (`#2a1210`, `#12211a`) faute de `success-ink` et `danger-ink` ; `violet-400/300` est la cinquième couleur sémantique du produit (« style partagé »), sans jeton, en deux teintes et deux alphas (7 usages) ; dix alphas ad hoc sur des jetons opaques (`hover/60`, `surface/60`, `accent/30`…) ; ~12 couleurs qui interdiraient un thème clair.

**Éléments bruts hors primitives** : 37 `<button>`, 12 `<input>`, 9 `style={{}}`, 20 `className` en template sans `cx`. Les pires : le toast de 386 caractères (`EditorShell.tsx:554`), les tables `SOURCE_COLOR` / `SOURCE_TEXT` dupliquées, `DatabaseTable.tsx:42` qui réimplémente `TextInput`, `NodeInspector.tsx:290` qui copie `FIELD`, quatre clones manuels de `Field` dans `ThemePanel.tsx:122-136`, une copie littérale de `PropRow` dans `SizePanel.tsx:45`. `ThemePanel`, `PublishDialog`, `MediaLibrary`, `DatabaseTable` et `DataPanel` n'utilisent presque pas `Field` ni `PropRow`.

**Échelles.** Button / IconButton cohérents (sm h-6, md h-7) mais Segmented décalé d'un cran (sm h-5, md h-6) ; trois hauteurs de ligne de liste hors échelle (26, 28, 34 px) ; huit tailles d'icônes (11 à 16) et `strokeWidth` absent des usages bruts ; rayons : `xs` ×40, `sm` ×25 avec une règle implicite « conteneur sm, interne xs » violée six fois.

**Typographie.** Aucune convention libellé / valeur / aide ; l'intitulé en capitales est réimplémenté une vingtaine de fois avec deux interlettrages (`tracking-[0.12em]` et `tracking-wider`, du simple au double). C'est l'incohérence la plus visible et la moins chère : `PanelHeading` existe déjà.

**Langue.** Remarquablement tenue : 65 « … » et zéro « ... », guillemets « » partout, « Éditer » jamais, Retirer / Supprimer suivent une vraie règle, avec trois entorses (`MediaLibrary.tsx:214,135`, `ComponentPanels.tsx:97-151`). Ellipsis d'ouverture de dialogue appliquée à moitié ; Ajouter / Nouveau / Créer alternent ; deux micro-boutons en minuscules (`MediaLibrary.tsx:204`).

## 8. Performance perçue

Mesures faites dans l'éditeur sur le site d'audit (1 276 versions, ≈ 220 éléments rendus sur l'accueil), serveur de développement, panneau masqué (les minuteries étaient bridées, les observateurs de mutation non).

| Opération | Délai mesuré | Lecture RAIL |
|---|---|---|
| Sélection d'un calque → inspecteur rendu | 67 ms | instantané |
| Édition de texte (inspecteur) → aperçu | 108 ms | perceptible mais fluide |
| Retour du texte → aperçu | 149 ms | perceptible |
| Ajout d'une propriété CSS → ligne | 37 ms | instantané |
| Ouverture d'une section | 1 ms | instantané |
| Chargement de l'éditeur (dev) | DOMContentLoaded 152 ms, load 362 ms, 28 fichiers JS | non représentatif de la production |

Le cœur est rapide : chaque opération passe par `applyOp` + rendu React + injection dans l'iframe en bien moins que le seuil de Doherty. Les vrais coûts de temps sont ailleurs : clics d'ouverture de sections, allers-retours page → composant → page, et les 4 s de toast pendant lesquels une raison de refus doit être lue. Trois risques à surveiller : la fusion d'historique à 1 s pendant la frappe (entrées d'annulation multiples), l'aperçu qui re-rend la page entière à chaque opération (fine aujourd'hui à 220 nœuds, à mesurer à 2 000), et le glissement de valeur throttlé à 50 ms (bien).

Ce qui n'a pas pu être mesuré : le changement de page (minuteries bridées), le temps de première publication, et le poids réel de la production (à faire sur le déploiement Vercel avec Lighthouse, comme pour les sites publiés).

## 9. Positionnement

- **Face à Figma** : l'inspecteur d'Atelier a le bon squelette (sections, pastille de source, états, variantes) mais montre trois fois trop de contrôles et oublie ce qu'on lui a ouvert. La multi-sélection manque.
- **Face à Webflow** : Atelier est devant sur les animations (un geste, une cascade en un clic, un script de quelques ko), sur la liaison des cartes et sur la gestion des images ; derrière sur le panneau de style (validation, contrôles unifiés, styles partagés gérables), le CMS (tri, filtre, détail, annulation) et la séparation réglages / publication.
- **Face à Framer** : les libellés de publication sont dans l'esprit de Framer, la forme non (modale à huit sections au lieu d'un popover).
- **Face à Notion** : l'Entrée contextuelle (`planSplit`) est au niveau ou au-dessus ; le « / » intapable, le curseur flèche et l'absence de fusion à Backspace sont trois écarts que tout utilisateur de Notion remarquera dans la première minute.

## 10. Plan d'action

**Lot 1, une journée, sans risque — fait le 10 septembre 2026** (`docs/fonctionnel.md` § 1.4 quater ; reste du lot : le glissement de valeur sur Typographie, Apparence et Effets, reporté au lot 3 avec l'unification des champs numériques) : garde `isTyping()` avant ⌘Z / ⌘K ; raccourcis destructifs conditionnés au focus dans l'arbre ou l'aperçu ; arbre focalisable ; « / » tapable ; quatre aides corrigées ; `prop` et `data-prop` dans les helpers `row()` ; huit contrôles nommés ; trois jetons de contraste ; dix `outline-none` supprimés avec un commentaire sur le contrat de focus ; `stopImmediatePropagation` dans `Dialog` ; focus sur « Annuler » dans les confirmations dangereuses.

**Lot 2, une semaine — fait en entier le 10 septembre 2026** (`docs/fonctionnel.md` § 1.4 quinquies) : persistance de l'ouverture des sections et `defaultOpen` par type ; `SourceDot` lisible sans couleur et atteignable au clavier ; région live permanente + `role="alert"` + annonce des changements de contexte ; 403 non bloquant et contrôles masqués pour le rédacteur ; issue de secours sur conflit et coupure, `beforeunload` ; `PanelHeading` unique avec niveau de titre ; validation des valeurs de style (`CSS.supports`) et jeton par sélecteur partout ; toasts fermables avec « Annuler » ; libellé « Brouillon / Publiée » et compteur « pas encore en ligne » ; `readOnly` réel sur les messages.

**Lot 3, un mois — fait le 11 septembre 2026** (`docs/fonctionnel.md` § 1.4 sexies ; reste du lot : l'unification complète des champs numériques, le glissement de valeur n'étant ajouté qu'à interligne, espacement, bordure, arrondi et opacité) : scission Publier / Réglages du site avec pied de dialogue ; refus de dépôt pendant le glissement ; unification oui/non, Select / Segmented, champs numériques ; styles partagés gérables (liste, renommage, suppression, usages) ; tabindex tournant et flèches sur Tabs et Segmented ; import CSV avec pré-analyse et annulation ; vignettes des modèles et zone vide du tableau de bord ; sous-domaine avec aperçu d'URL et disponibilité ; tableur avec tri, filtre, détail.

**Plus tard, structurant** : multi-sélection ; un seul modèle responsive pour les boîtes et les vues ; reparentage au clavier ; Field / PropRow étendus puis clones éliminés.

## 11. Limites et suite

Cet audit est une évaluation d'expert : il trouve ce qu'une lecture attentive et des mesures trouvent, pas ce que cinq designers découvrent en tâtonnant. La prochaine étape logique est un test utilisateur sur trois scénarios (poser un héros et l'animer, relier une base, publier), avec les gestes et les minutes comptés sur Atelier et sur Webflow par les mêmes personnes. Le protocole et la grille sont prêts à écrire à partir de la section 3.
