# Atelier

Créateur de sites web designer-first, code-natif et sans verrou. Assez simple pour qu'un débutant construise son site comme il écrit une page Notion, assez profond pour qu'un développeur y branche du vrai code.

- Cadrage et décisions : `docs/decisions.md`
- Modèle de document : `docs/document-model.md`

## État

v0 · fondations. Modèle de document, opérations inversibles, moteur de rendu, site d'exemple (vitrine de photographe), coquille d'éditeur avec aperçu réel dans une iframe, persistance avec journal d'opérations, annulation et rétablissement.

## Persistance

Le document est modifié uniquement par opérations. L'éditeur les applique localement, puis les envoie à `POST /api/sites/:id/changes` avec la version de base ; le serveur les rejoue, incrémente la version et les journalise. Une version de base périmée renvoie un conflit (409).

- Sans configuration : fichiers JSON dans `.atelier-data/` (document courant + journal `.changes.jsonl`), amorcés avec le site d'exemple.
- Avec `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` (voir `.env.example`) : tables `sites`, `changes`, `entries` et fonction `commit_change` de `supabase/schema.sql`.

## Démarrer

```bash
npm install
npm run dev
```

Éditeur sur http://localhost:3000, site d'exemple sur http://localhost:3000/preview.
