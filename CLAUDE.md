# Atelier — consignes pour les agents

Créateur de sites web designer-first, code-natif, sans verrou. Voir `docs/decisions.md` (59 décisions validées) et `docs/document-model.md` (spécification du modèle, la référence de tout le code). `docs/architecture.md` est la carte de ce qui s'exécute où (trois paquets, un processus, quatre runtimes, journal et conflits, dépôt, publication) : la lire avant de raisonner sur l'architecture, la mettre à jour quand une frontière bouge.

## Structure

- `packages/model` — types, schéma de validation (zod), opérations inversibles, site d'exemple. Aucune dépendance React.
- `packages/renderer` — génération CSS et rendu React d'un site. Le même moteur sert l'éditeur, le site publié et l'export.
- `apps/editor` — application Next.js (App Router). `/` est l'éditeur, `/preview/...` rend le site courant (`?editor=1` : aperçu vivant piloté par l'éditeur), `/api/sites/:id` et `/api/sites/:id/changes` exposent le document et son journal.
- `apps/editor/src/lib/store` — dépôt de sites (`SiteStore`) : fichiers JSON en développement (`.atelier-data/`), Supabase si configuré (`supabase/schema.sql`).
- `apps/editor/src/ui` — système de design de l'éditeur (jetons dans `src/app/globals.css`, primitives : Button, IconButton, TextInput, TextArea, Select, NumberInput, Field, Tabs, Panel, Section, TreeRow, Badge, Kbd…). Toute interface de l'éditeur se construit avec ces primitives ; on les fait évoluer plutôt que de styler à la main.
- `apps/editor/src/ui/controls` — contrôles de style (pastille de source, ligne de propriété, groupe exclusif, champ de longueur avec unité et jeton, schéma de boîte). `apps/editor/src/components/design` — panneaux Design (Disposition, Espacement, Dimensions, Responsive) branchés sur `useStyle`, qui lit `resolveNodeStyle` du modèle et écrit sur le point de rupture actif via `stylePath`.
- `apps/editor/src/components/animation` — outil Animation (cadrage `docs/cadrage-animation.md`, D60 : un tiroir sous le canevas, pas un mode) : panneau (`AnimationModePanel`, deux colonnes : déclencheurs et bibliothèque, puis ligne de temps), ligne de temps (`Timeline`, avec `TrackSettings`, `KeyframePanels`, `TriggerSettings`), choix rapides (`QuickAnimations`, options d'apparition dans `lib/appearance-options.ts`), effets continus ; aides pures dans `apps/editor/src/lib/timeline.ts` (dont la liste des éléments d'une scène) et `apps/editor/src/lib/scene.ts` (la scène d'une section : départs, fins, total, avertissements), aperçu à la tête de lecture dans `apps/editor/src/lib/scrub.ts`, panneaux Design en mode image-clé par `components/design/useKeyframeStyle.ts`. Les aides du modèle sont dans `packages/model/src/animations.ts`.
- `apps/editor/src/lib/use-document.ts` — état d'édition côté client : commit, annuler, rétablir (historique pur dans `packages/model/src/history.ts`), envoi séquentiel au journal ; sur un conflit de version, relecture du serveur et rebasage des opérations en attente (`lib/rebase.ts`).

## Règles

- `docs/roadmap.md` est la feuille de route vivante : la lire au début d'une session, la mettre à jour à la fin (états des tâches, journal).
- `docs/revue-globale-2026-09.md` est le plan d'actions issu de la revue du 8 septembre : le consulter avant d'ajouter une fonctionnalité, cocher ce qui est fait.
- `docs/fonctionnel.md` est l'état réel de l'outil, fonctionnel et technique : le mettre à jour à chaque évolution livrée (nouvelle capacité, nouvelle route, nouvelle variable, changement de comportement), dans la même session que le code. `docs/mise-en-ligne.md` décrit la mise en ligne réelle ; le tenir à jour à chaque changement d'infrastructure.

- Le modèle de document (`docs/document-model.md`) est le contrat : toute modification passe par ce document d'abord, puis par `packages/model/src/types.ts` et `schema.ts`, avec un test.
- Développement piloté par les tests (TDD, depuis le 11 septembre 2026) : pour toute évolution, écrire d'abord les tests qui échouent (modèle, rendu CSS/HTML, script du site dans un DOM simulé avec `// @vitest-environment happy-dom`, aides de l'éditeur dans `apps/editor/test`), puis le code qui les fait passer. Une attente fausse se corrige dans le test, jamais en affaiblissant le code. Lancer `npm run typecheck`, `npm test` et `npm run lint` à la racine avant de proposer un commit.
- Le document ne se modifie que par opérations (`applyOp`), jamais par mutation directe. Toute opération doit être inversible (`invertOp`) et testée en aller-retour.
- Le rendu ne dépend jamais de l'éditeur. `ctx.editor` n'ajoute que des attributs `data-*` et un script de sélection.
- Interface en français. Les identifiants de code en anglais.
- Next.js : cette version a des changements de rupture. Lire `node_modules/next/dist/docs/` avant d'écrire du code Next (params et searchParams sont des promesses ; plusieurs root layouts via groupes de routes).

## Débogage

- En développement, `window.__atelierDoc` expose le document courant de l'éditeur (site + historique) après chaque opération.
- Le panneau du navigateur intégré, quand il est masqué, ralentit les minuteries et fige les transitions CSS : ne pas en déduire des bugs de regroupement ou d'état.

## Commandes

```bash
npm install
npm run dev          # éditeur sur http://localhost:3000
npm test             # tests de tous les paquets
npm run typecheck
```
