# Architecture d'Atelier · carte honnête

*19 septembre 2026. À tenir à jour à chaque frontière déplacée. Ce document dit ce qui est, pas ce qui est prévu ; les décisions sont dans `docs/decisions.md`, le contrat du document dans `docs/document-model.md`.*

Un schéma généré depuis les fichiers du dépôt a montré cinq « services », un module d'état publié à part, ni export ni médias, et aucun runtime côté visiteur. Il se trompait sur les quatre premiers points et oubliait le dernier. Cette carte est écrite pour qu'on n'ait plus à deviner.

## 1. Trois paquets, un processus

| Paquet | Rôle | Dépend de | Ne dépend jamais de |
|---|---|---|---|
| `packages/model` | Types, schéma zod, opérations inversibles (`applyOp`, `invertOp`), historique pur, migrations, aides (animations, apparitions, arbre, sélection) | rien | React, Next, le dépôt |
| `packages/renderer` | CSS et rendu React d'un site, script du site (`INTERACTION_SCRIPT`), attributs `data-*` pour l'éditeur | `model` | l'éditeur (`ctx.editor` n'ajoute que des attributs et un script de sélection) |
| `apps/editor` | Une application Next.js : l'éditeur, l'aperçu vivant, les routes d'API, la livraison des sites publiés, l'export | `model`, `renderer` | — |

**Il n'y a qu'un processus serveur.** Les routes d'API (`/api/sites/*`, `/api/forms/*`, `/auth/*`), la livraison (`/s/<sous-domaine>/*`, sous-domaines par `proxy.ts`) et l'aperçu (`/preview/*`) sont des fichiers d'une même application Next.js, qui parlent au même dépôt. Un schéma qui les range en « services » décrit une organisation de fichiers, pas des frontières d'exécution.

## 2. Quatre endroits où du code s'exécute

1. **Le serveur** (Next.js) : routes, rendu HTML des sites publiés (`renderToStaticMarkup` par `lib/html-document.ts`), export, envoi de courriels.
2. **L'éditeur** (navigateur du créateur, `EditorShell.tsx`) : état du document (`lib/use-document.ts`), panneaux, palette, calques, outil Animation (tiroir sous le canevas).
3. **L'aperçu vivant** (iframe même origine, `LivePreview.tsx`, `/preview/<site>?editor=1`) : rend le site avec le moteur, reçoit les mises à jour de l'éditeur et lui renvoie sélection, texte, déplacements. Le contrat des messages est typé dans `lib/preview-protocol.ts` (`ToPreview`, `FromPreview`) : c'est la seule frontière entre ces deux gros fichiers.
4. **Le site publié** (navigateur du visiteur) : un document HTML complet, sans React, qui embarque quand la page en a besoin le **script du site** (`packages/renderer/src/interactions.ts`, `INTERACTION_SCRIPT` : déclencheurs à l'entrée dans l'écran, au clic, au défilement, à la souris ; retour de survol ; bascule ; ressorts ; lecture d'une animation par `window.__atelierAnim`) et le script des formulaires. Ce runtime est la partie du produit que promet la phrase de résumé de l'éditeur : c'est lui que les visites instrumentées des tests d'usage mesurent. Dans l'éditeur, il ne tourne pas : `applyInstantStates` pose l'état d'arrivée après chaque rendu, et seul l'outil de lecture (`ANIMATION_PLAY_SCRIPT`) est injecté.

## 3. Le document et son journal

- Un site est un document `Site` (`schemaVersion` 3), migré à la lecture (`migrate`, puis `repairAnimations`).
- **Il ne change que par opérations** (`Op`), toutes inversibles. L'éditeur les applique localement d'abord (état optimiste), les garde en file et les envoie par lots à `POST /api/sites/:id/changes` avec `baseVersion`.
- **Le serveur est l'arbitre.** `SiteStore.appendChange` applique le lot si `baseVersion` est la version courante, sinon répond « conflit » (409). L'ajout est atomique : file d'attente par site dans le dépôt fichier, fonction `commit_change` en base pour Supabase.
- **Conflit** (deux fenêtres ou deux personnes sur le même site) : l'éditeur relit `GET /api/sites/:id`, repose ses opérations en attente sur ce document (`lib/rebase.ts`, tout ou rien) et les renvoie une fois. Si une opération n'a plus de sens (l'élément visé a disparu) ou si le renvoi est encore en conflit, l'éditeur se fige avec ses changements intacts (copier, recharger). Il n'y a pas de fusion en temps réel : deux personnes qui éditent en même temps voient leurs changements se croiser à chaque enregistrement, pas au caractère.
- **Journal court, jalons longs** (23 septembre 2026) : le numéro de version est un verrou (un de plus par lot accepté), jamais une version au sens de l'utilisateur, et l'interface ne le montre plus. Les jalons sont les instantanés : les **publications** (jusqu'à vingt) et les **points de reprise** automatiques (`SiteStore.checkpoint`, déclenché par la route des changements au plus une fois par heure et par processus ; au plus un point par jour de travail, trente gardés). Le journal est compacté à chaque point et à chaque publication : il garde toujours ses 500 derniers lots et rien n'en sort sans instantané qui le couvre (`compact_changes`). Le document courant est toujours matérialisé, on ne rejoue pas depuis l'origine. Reprendre un instantané comme version de travail (`POST …/publish/resume`) passe par un changement ordinaire (`planReplaceSite`, une opération `site.set` par partie qui diffère) : verrou et « annuler » restent vrais ; les entrées des bases, hors document, ne bougent pas.

## 4. Le dépôt et ce qu'il contient

`SiteStore` (`lib/store/types.ts`) est l'unique interface : sites, membres, journal, entrées des bases, publication (instantanés), limite de débit, sous-domaines. Deux implémentations : `FileSiteStore` (`.atelier-data/`, développement et tests) et `SupabaseSiteStore` (`supabase/schema.sql`). `getStore()` choisit selon l'environnement (`ATELIER_STORE=file` force les fichiers). Le contrat est testé contre les deux (`test/store.contract.test.ts`).

- **L'état publié n'est pas un module à part** : c'est un instantané (`snapshots`, `publish`, `restore`, `published`) dans le même dépôt, derrière la même façade. `lib/published.ts` n'est qu'un cache (`unstable_cache`, étiquette `site:<id>`) et le calcul des adresses publiques.
- **Les médias** ont leur propre façade, `AssetStorage` (`lib/store/assets.ts`, fichiers ou Supabase Storage), servie par `/api/sites/:id/assets`.
- **Les entrées** des bases vivent hors du document (`entries`, `/api/sites/:id/entries`), publiées avec le site ou seules (« publier les contenus »).

## 5. Publier, livrer, exporter

- **Publier** fige document et entrées en un instantané et le désigne comme version en ligne ; **revenir en arrière** désigne un instantané plus ancien.
- **Livrer** : `app/(site)/s/[sub]/[[...path]]/route.ts` rend à la demande, depuis l'instantané en cache, un document HTML complet (tête, feuille de style de la page, corps, scripts du site, code personnalisé). Publier invalide le cache.
- **Exporter** : `GET /api/sites/:id/export` produit une archive statique complète avec le même `htmlDocument` (`docs/export.md`). C'est la garantie « sans verrou » : le site publié et l'export sont le même HTML.

## 6. Ce qui est fragile, et connu

- **Deux gros fichiers de part et d'autre de l'iframe** : `EditorShell.tsx` (≈ 770 lignes, une trentaine d'états) et `LivePreview.tsx` (≈ 750 lignes, toute l'interface dans l'aperçu dans un seul effet). Le contrat `preview-protocol.ts` est la couture ; le découpage en sous-composants et en hooks (sélection et pioche, synchronisation vers l'aperçu, raccourcis) reste à faire, sans test de comportement autour pour l'instant : à mener par petites extractions typées, pas par une réécriture.
- **Pas d'édition simultanée** : le rebasage règle les croisements entre enregistrements, pas la co-édition.
- **Le site publié dépend d'un script** pour tout ce qui attend l'écran ou le défilement ; sans JavaScript, ces éléments restent visibles à leur état de repos (`noscript`).
