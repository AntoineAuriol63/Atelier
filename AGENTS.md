# Atelier — consignes pour les agents

Créateur de sites web designer-first, code-natif, sans verrou. Voir `docs/decisions.md` (59 décisions validées) et `docs/document-model.md` (spécification du modèle, la référence de tout le code).

## Structure

- `packages/model` — types, schéma de validation (zod), opérations inversibles, site d'exemple. Aucune dépendance React.
- `packages/renderer` — génération CSS et rendu React d'un site. Le même moteur sert l'éditeur, le site publié et l'export.
- `apps/editor` — application Next.js (App Router). `/` est l'éditeur, `/preview/...` rend le site courant (`?editor=1` : aperçu vivant piloté par l'éditeur), `/api/sites/:id` et `/api/sites/:id/changes` exposent le document et son journal.
- `apps/editor/src/lib/store` — dépôt de sites (`SiteStore`) : fichiers JSON en développement (`.atelier-data/`), Supabase si configuré (`supabase/schema.sql`).
- `apps/editor/src/lib/use-document.ts` — état d'édition côté client : commit, annuler, rétablir (historique pur dans `packages/model/src/history.ts`), envoi séquentiel au journal.

## Règles

- Le modèle de document (`docs/document-model.md`) est le contrat : toute modification passe par ce document d'abord, puis par `packages/model/src/types.ts` et `schema.ts`, avec un test.
- Le document ne se modifie que par opérations (`applyOp`), jamais par mutation directe. Toute opération doit être inversible (`invertOp`) et testée en aller-retour.
- Le rendu ne dépend jamais de l'éditeur. `ctx.editor` n'ajoute que des attributs `data-*` et un script de sélection.
- Interface en français. Les identifiants de code en anglais.
- Next.js : cette version a des changements de rupture. Lire `node_modules/next/dist/docs/` avant d'écrire du code Next (params et searchParams sont des promesses ; plusieurs root layouts via groupes de routes).

## Commandes

```bash
npm install
npm run dev          # éditeur sur http://localhost:3000
npm test             # tests de tous les paquets
npm run typecheck
```
