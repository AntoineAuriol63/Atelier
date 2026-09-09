# Revue globale — 8 septembre 2026

Cinq examens indépendants, menés sur le code réel après la sortie de M6 et des comptes : architecture et maintenabilité, montée en charge, UI/UX, cohérence avec le cadrage, sécurité. Ce document en est la synthèse et le plan d'actions. Les rapports détaillés citent les fichiers et les lignes ; les constats ci-dessous en reprennent l'essentiel.

## Verdict en une page

**Les fondations sont solides, et c'est rare.** Le découpage `model` / `renderer` / `editor` est réellement respecté (aucun import React dans le modèle, aucun `any` dans tout le dépôt, aucun TODO abandonné), le modèle par opérations inversibles est correct et testé, un seul moteur de rendu sert l'éditeur, l'aperçu et le site publié, les index SQL sont bons, la copie sur écriture est bien faite. Il n'y a aucun algorithme à jeter et aucune réécriture à envisager.

**Trois dettes réelles se sont accumulées, toutes réparables en quelques jours chacune :**

1. **Le transport en entier.** Le document complet est lu deux fois et écrit une fois à chaque opération, envoyé en entier à l'aperçu à chaque geste, avec toutes les entrées ; le CSS de toutes les pages est servi sur chaque page ; l'instantané publié est un bloc unique. Rien ne casse sur le site d'exemple ; tout casse entre 50 pages et 1 000 entrées. Et un seuil précis fait perdre des données en silence dès aujourd'hui : Supabase tronque à 1 000 lignes sans erreur, donc un site à 1 001 entrées se publie amputé.
2. **La sécurité de la mise en ligne.** Les sites publiés servis sur l'origine de l'éditeur (repli `/s/…`) rendent le code injecté d'un site dangereux pour la session de l'éditeur ; l'authentification se désactive silencieusement si une variable manque ; un site sans propriétaire est ouvert à tout compte ; l'aperçu ne vérifie pas le propriétaire ; deux injections dans des filtres et un chemin de fichier.
3. **La promesse centrale n'est pas commencée.** « Sans verrou » (D03, D15) n'a aucune ligne de code : pas d'export, classes CSS opaques `n-<id>`, `name` absent de la plupart des nœuds, médias liés au stockage. Le produit est fort sur « designer-first », moyen sur « code-natif », nul sur ce qu'on vend.

Le reste est de la régie : deux fichiers de 50 Ko à découper mécaniquement, un protocole `postMessage` à typer, des composants dupliqués, un vocabulaire à unifier, des explications enfermées derrière des boutons désactivés.

## 1. Architecture et maintenabilité

Points forts vérifiés : frontières de paquets tenues, 55 tests modèle et 18 rendu écrits comme des spécifications, conventions respectées (français pour l'interface, anglais pour le code, commentaires qui disent pourquoi), dépendances peu nombreuses et épinglées.

| Gravité | Constat | Où | Correction |
| --- | --- | --- | --- |
| Bloquant | Une opération perdue en silence sur incident réseau : le lot est vidé avant l'envoi, l'état local reste appliqué, les commits suivants échouent en 422 | `lib/use-document.ts` | Remettre le lot en tête de file et réessayer avec délai croissant |
| Bloquant à terme | Aucune migration de schéma alors que le contrat en promet une ; `schemaVersion` jamais lu ; trois surfaces à migrer (document, instantanés, journal) | `packages/model` | `migrate.ts` avec `SCHEMA_VERSION` et une fonction identité, appelée aux trois points de lecture ; valider le document à la publication |
| Bloquant pour une équipe | `LivePreview` : un seul effet de 560 lignes ; `EditorShell` : 631 lignes, cinq responsabilités ; protocole `postMessage` en chaînes libres, sans type ni vérification d'origine | `components/LivePreview.tsx`, `EditorShell.tsx` | Extraction mécanique : `serialize` (testable, le code le plus risqué du produit), calques, ciblage du glisser, menu « / » ; `split`/`merge`/`slashInsert` descendus dans le modèle à côté de `move.ts` ; `lib/preview-protocol.ts` typé |
| Important | `setEntries` n'a pas la même sémantique fichier (remplace) et Supabase (upsert) ; lecture-modification-écriture hors verrou en mode fichier | `lib/store/*` | Une seule suite de tests exécutée contre les deux dépôts ; retirer `setEntries` de l'interface |
| Important | Types et schéma zod maintenus en double sans filet ; tests non typés (`include: ["src"]`) ; `tsconfig` de l'app moins strict que les paquets ; pas d'intégration continue | racine, `tsconfig` | Test d'accord types/schéma, `include: ["src", "test"]`, héritage de `tsconfig.base.json`, un workflow qui lance typecheck, tests, lint |
| Important | `node.insert` ne vérifie l'unicité que de l'identifiant racine ; `indexSite` reconstruit à chaque op d'un lot | `model/ops.ts` | Contrôle des identifiants descendants ; index construit une fois par lot |
| Mineur | Journal d'opérations avec `author: "local"` depuis les comptes ; codes d'erreur 422/500 incohérents ; `STORE_VERSION` à bumper à la main ; `lib/site.ts` en doublon ; `heic2any` en 0.0.4 | divers | Auteur = email ; helper d'erreur commun ; cache de dépôt en production seulement |

## 2. Montée en charge

Mesures sur le site d'exemple extrapolées à 300 pages, 5 000 images, 20 000 entrées : document 5,8 Mo (dont 4,2 Mo d'images), entrées 8,2 Mo, CSS complet 770 Ko, clone du message d'aperçu 66 ms. La donnée est petite et les algorithmes rapides ; c'est la granularité du transport qui casse.

| Gravité | Constat | Casse à | Correction |
| --- | --- | --- | --- |
| Bloquant, perte de données | `entries()` et `changes()` sans pagination : PostgREST tronque à 1 000 lignes en silence ; publication et export amputés | 1 001 entrées | Boucle `.range()` dans les deux méthodes. À faire avant toute mise en ligne |
| Bloquant | Chaque commit lit le document deux fois (`guardSite` puis `appendChange`) et l'écrit une fois ; chaque envoi de formulaire charge document et entrées pour écrire une ligne | ~1 Mo de document | `guardSite` sur la seule colonne `owner` ; formulaire sans `loadSite` ; à terme, opérations appliquées dans Postgres |
| Bloquant | Le site entier et toutes les entrées traversent l'iframe à chaque changement ; `siteCss` recalculé et reparsé | ~1 500 nœuds | Retirer les entrées du message ; mémoïser `siteCss` et `assetMap` ; puis envoyer les opérations plutôt que le document (le moteur `applyOp` existe déjà) |
| Bloquant | `site.assets` dans le document : renommer une image écrit 8 Mo dans le journal (valeur + précédente) ; ⌘Z devient un 413 au-delà de 2 500 images | ~500 images | Sortir les images du document (table `assets`, comme les entrées) ; en attendant, opérations granulaires sur `assets.<i>.<champ>` |
| Bloquant, coût | Instantané publié de 14 Mo au-delà de la limite de cache Vercel (2 Mo) : chaque visite relit tout ; `headers()` rend la route dynamique, aucun cache CDN | ~2 500 entrées | Instantané découpé document/entrées puis par page ; préfixe sans `headers()` ; `Cache-Control` explicite ; purge des instantanés au-delà de 20 |
| Grave | `siteCss` génère le CSS de toutes les pages pour chaque page servie | ~50 pages | CSS restreint à la page rendue et ses composants |
| Grave | `compact_changes` jamais appelé : journal sans fin | quelques milliers d'ops | L'appeler à la publication |
| Grave | Glissement de valeur : un commit par pas, chaque pas coûte clone + CSS + rendu ; tableur non paginé avec un `<select>` par cellule de relation ; import quadratique | ~500 entrées | Throttle pendant le glissement ; tableur paginé par 100 ; `Map` hors des boucles ; import par lots de 500 |
| Grave | Limite d'envoi des formulaires en mémoire de processus, sans purge | multi-instances | Limite persistée (table ou Upstash) |

## 3. UI et UX

Points forts : un vrai système de jetons et de primitives, des textes d'aide réfléchis, les états vides bien couverts, la page de connexion exemplaire.

| Gravité | Constat | Correction |
| --- | --- | --- |
| Bloquant | `disabled:pointer-events-none` sur `Button`, `IconButton`, `Tabs` : toutes les explications de boutons désactivés (« retirez-la d'abord », « impossible de supprimer la dernière page ») sont inatteignables | Enrober les éléments désactivés, ou `aria-disabled` avec clic intercepté |
| Bloquant | Conflit de version : bandeau « rechargez la page » sans bouton ; « Publier » reste désactivé avec « Enregistrement en cours… » | Bouton Recharger ; distinguer en cours et bloqué |
| Important | Huit `window.confirm` et un `window.prompt` (dont le seul éditeur de lien en Écriture, sans liste des pages) ; quatre surfaces d'erreur différentes ; remplacement de fichier qui échoue en silence ; export CSV qui annonce un succès non vérifié | `ConfirmDialog` et `LinkPopover` maison ; deux surfaces d'erreur ; `catch` ; succès conditionné à la réponse |
| Important | Mode par défaut Design ; en Écriture, le panneau gauche complet, le champ de largeur en pixels et le badge de point de rupture restent ; balise HTML, ratio libre et clé de champ visibles en Écriture | Défaut Écriture ; barre et rail allégés ; masquer la balise, le ratio, la clé |
| Important | Vocabulaire : « Collection » et « Vue de base de données » pour la même chose ; « Point de rupture », « Responsive », « Par taille d'écran » ; « Base » (point de rupture) contre « base » (de données) ; noms CSS bruts dans les pastilles d'état et Responsive ; `⌘` en dur pour Windows ; mentions de jalons dans l'interface (« jalon M5 », faux aujourd'hui) | `PROP_LABEL` unique ; « Vue » et « Carte » ; « Tailles d'écran » ; « Tous les écrans » ; `mod()` selon la plateforme ; retrait des jalons |
| Important | Accessibilité : arbre des calques inatteignable au clavier ; dialogues sans piège de focus ; actions cachées au survol sans `focus-within` ; contrastes fautifs (toasts 2:1, `--color-dim` 3,3:1) ; cibles sous 24 px ; menu « / » sans rôles | Corrections listées dans le rapport |
| Important | Deux sélecteurs d'image, dont un sans limite (150 vignettes dans un panneau de 340 px) et sans accès à l'import ni à la bibliothèque (favicon, image sociale) | Un seul composant : vignette + « Choisir une image… » vers la bibliothèque |
| Important | Le canvas réimplémente le système de design en chaînes CSS avec deux accents différents et `system-ui` | Jetons injectés dans l'iframe |
| Mineur | Emoji 🔗, « OK », « Retirer les miens », « CSV » comme libellé, fractions sans texte, apostrophes mélangées (une recherche « / » échoue sur `l'action` contre `l’action`) | Verbe + objet ; icône SVG ; normalisation |

Trois principes retenus : un geste, un composant, et il vit dans `src/ui` ; toute action rend compte et toute impossibilité s'explique de façon atteignable ; le mode Écriture retire, il ne masque pas seulement un panneau.

## 4. Cohérence avec le cadrage

Décisions tenues : D06, D07, D09, D11, D12, D16, D24, D38 en grande partie, D57 dans la forme. Partielles : D01, D02, D13 (variantes ignorées au rendu, aucune UI de composant), D17, D18, D19 (pas d'Interactions), D23, D25, D34, D36 (contenu non publiable seul), D37, D39, D47, D50. Absentes : D03, D05, D08, D14, D15, D20. Contredites : D10 (le site vierge clone le thème et référence `st_section` en dur), D40 (le code head est injecté dans le corps, les scripts sont inertes, aucune interface pour le saisir, pourtant déclaré fait).

Écarts documents/code corrigés dans la foulée de cette revue : « réordonner » les pages n'existe pas ; le code head n'est pas fonctionnel ; le champ « Fichier » proposé dans le tableur n'a pas de cellule ; les comptes de tests étaient datés ; la ligne « Styles partagés » n'était pas cochée ; les restes « M4 bis » et « destinataire par formulaire » n'avaient plus de domicile.

Ce qui rend un vrai client impossible aujourd'hui : rien n'est déployé ; pas de domaine personnalisé ; les messages de formulaire n'arrivent pas chez le client ; pas de rôles ni de partage ; une seule fenêtre à la fois ; code head inopérant ; pas de composants créables ; le client ne peut pas publier son contenu seul ; pas de 404 personnalisée ni de redirections ; pas d'export.

Fait mais à ne pas étendre avant l'export et les rôles : le tableur (déjà un demi-Notion), la bibliothèque de médias, la grille de mise en page, les micro-gestes des panneaux. Le champ « Fichier » est à retirer, pas à finir.

## 5. Sécurité

| Gravité | Constat | Correction |
| --- | --- | --- |
| Critique | Sites publiés sur l'origine de l'éditeur via le repli `/s/…` : le code injecté d'un site (head, embed, icône SVG) tourne avec la session de l'éditeur, dont les cookies ne sont pas `httpOnly` ; même sur un sous-domaine, `SameSite=lax` laisse passer les requêtes avec cookies vers l'API | Domaine enregistrable distinct pour les sites publiés ; repli `/s/…` réservé au développement ; vérification `Origin`/`Sec-Fetch-Site` sur les routes mutantes ; injection HTML réservée à un rôle explicite |
| Critique | L'authentification échoue en mode ouvert si une variable manque ou si `ATELIER_AUTH=off` traîne ; le dépôt bascule en fichiers éphémères si les clés de service manquent | Refus de démarrer en production sans ces variables |
| Critique | Liste d'adresses vide = inscription ouverte ; site sans propriétaire = accessible à tout compte ; repli silencieux si la colonne `owner` manque | Liste obligatoire en production ; retirer la règle « sans propriétaire = à tous » après attribution d'un propriétaire aux sites existants ; échec bruyant si la colonne manque |
| Important | `/preview/<siteId>` ne vérifie pas le propriétaire (document de travail et messages reçus lisibles par tout compte) | `canAccess` dans la page et ses métadonnées |
| Important | Sous-domaine interpolé sans validation dans un filtre PostgREST (`.or(...)`) ; `siteId` non contrôlé contre `..` dans le stockage fichier ; type MIME déclaré par le client stocké tel quel, SVG actifs acceptés, pas de plafond de taille ; redirections `suite` et `Referer` ouvertes (`//evil`) ; aucun en-tête de sécurité, `postMessage` sans origine ; `site.set` sans revalidation (sous-domaine hors regex) | Validation du sous-domaine ; `SAFE` restreint et vérification après `resolve` ; type déduit du contenu, SVG refusé ou assaini, plafond ; comparaison d'origine ; `headers()` dans `next.config`, `e.origin` vérifié ; revalidation du document |
| Mineur | Messages d'erreur qui fuient des détails internes ; aucune journalisation ; énumération d'adresses et d'identifiants ; `secure` absent sur le cookie de suite ; formule CSV non échappée à l'export ; `heic2any` sans mainteneur | Messages génériques et journal serveur ; réponses uniformes ; échappement `=+-@` |

## Plan d'actions

Le principe : réparer ce qui perd des données ou expose des données avant la mise en ligne ; poser les points de passage qui évitent la dette (migration, protocole, tests des dépôts) ; ne rien ajouter qui ne serve « designer-first, code-natif, sans verrou ».

### A. Avant toute mise en ligne — fait le 9 septembre 2026

Tout ce qui suit est en place et vérifié (voir le journal de `docs/roadmap.md`). Deux écarts assumés : les messages d'erreur d'API restent explicites (outil privé, lisibilité avant discrétion), et la réponse de `/auth/otp` dit encore si une adresse est refusée.

1. Pagination de `entries()` et `changes()` ; `compact_changes` et purge des instantanés à la publication ; contrôle de taille des corps.
2. Sécurité bloquante : domaine distinct pour les sites publiés (repli `/s/…` en développement seulement), refus de démarrer sans variables, liste d'adresses obligatoire, propriétaire attribué à tous les sites, garde sur `/preview`, validation du sous-domaine, chemin de fichiers, redirections, en-têtes de sécurité et origine `postMessage`.
3. Opérations jamais perdues sur incident réseau ; bandeau de conflit avec bouton Recharger.
4. `guardSite` léger ; formulaire sans chargement du document ; limite d'envoi persistée ; import d'images : type déduit du contenu, SVG refusé, plafond, envoi un par un.
5. `siteCss` par page ; entrées hors du message d'aperçu ; `siteCss` et `assetMap` mémoïsés ; throttle pendant un glissement.

### B. Points de passage anti-dette — fait le 9 septembre 2026

En place : migration de schéma (`migrate.ts`, appelée aux trois lectures, validation du document à la publication), identifiants descendants contrôlés, auteur réel dans le journal ; protocole d'aperçu typé (`lib/preview-protocol.ts`) avec origine vérifiée, sérialisation extraite et testée (un vrai bug corrigé : les retours à la ligne d'un collage multi-paragraphes étaient perdus), gestes d'écriture descendus dans le modèle (`text.ts`, testés) ; suite de tests commune aux dépôts (fichiers toujours, Supabase quand les clés sont présentes), `setEntries` retiré, tests typés, tsconfig unifié, accord types/schéma vérifié par le typecheck (trois écarts corrigés), intégration continue GitHub ; régie UI : explications atteignables, dialogues de confirmation maison, lien saisi dans la barre de sélection avec les pages du site, deux erreurs silencieuses corrigées, contrastes, libellés lisibles des propriétés, « Vue » et « Carte », « Tailles d'écran » et « Tous les écrans », raccourcis selon la plateforme, sélecteur d'image unique branché sur la bibliothèque, jetons de l'éditeur dans l'aperçu, Écriture par défaut et allégée, interrupteurs oui/non, focus des dialogues, actions visibles au clavier. Restent pour plus tard : extraction de l'effet clavier et de la barre du haut, navigation clavier complète des calques, menu « / » avec rôles ARIA, tailles de cibles, ponctuation insécable.

6. `migrate.ts` et validation du document à la publication ; contrôle des identifiants descendants ; auteur réel dans le journal.
7. Protocole `postMessage` typé et fermé ; `serialize` extrait et testé ; `split`/`merge`/`slashInsert` descendus dans le modèle ; effet clavier et barre du haut extraits.
8. Une suite de tests commune aux deux dépôts ; `setEntries` retiré ; tests typés ; `tsconfig` unifié ; intégration continue ; test d'accord types/schéma.
9. Régie UI : explications atteignables, `ConfirmDialog`, `LinkPopover`, deux surfaces d'erreur, contrastes, `PROP_LABEL`, vocabulaire unique, `mod()`, sélecteur d'image unique, jetons dans l'iframe, Écriture par défaut et allégée.

### C. Pour un vrai client (v1, dans cet ordre)

10. Export du code : classes dérivées de `name`, `name` obligatoire avec défaut, styles en ligne sortis du moteur, archive des médias, générateur Next.js.
11. Composants créés par l'utilisateur, variantes appliquées au rendu.
12. Minimum professionnel : code head réel, 404 personnalisée, redirections, nom de site modifiable, destinataire par formulaire.
13. Rôles et partage par site, publication du contenu seule ; aperçu et tableur navigables au clavier.
14. Images hors du document ; opérations envoyées à l'aperçu plutôt que le document ; instantané par page et route publiée en cache CDN ; tableur paginé et relations en recherche ; éditeur chargé par page.
15. Le deuxième site d'une autre nature avant toute nouvelle fonctionnalité.

À ne pas faire en v1 : calendrier et carte, pagination des vues, sélection multiple, bases externes, IA, enrichissement du tableur et de la bibliothèque.
