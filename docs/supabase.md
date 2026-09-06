# Supabase pour Atelier

## Pourquoi Supabase (et jusqu'où)

Supabase, c'est Postgres géré, plus l'authentification, le stockage de fichiers et le temps réel. Pour Atelier :

- **Postgres est le bon socle**, et le seul élément qu'on ne changera pas : documents en JSONB, journal d'opérations, entrées de bases de données, multi-locataire par RLS, région Francfort pour l'Europe (D05). Il tient des milliers de sites sans effort et des millions d'entrées avec des index.
- **Ce qui sera remplacé à l'échelle n'est pas la base** : le temps réel collaboratif (D52) demandera un service dédié (Yjs, Liveblocks ou PartyKit) plutôt que Supabase Realtime ; l'optimisation d'images (D37) passera par un service d'images (Cloudflare Images, Vercel) devant le stockage ; les sites publiés sont servis par CDN (D35), jamais depuis Supabase.
- **Ce que le code fait déjà pour rester libre** : tout l'accès aux données passe par `SiteStore` (`apps/editor/src/lib/store`), et le journal d'opérations est la vérité, ce qui rend le stockage remplaçable sans toucher à l'éditeur.

Points d'attention posés dès maintenant dans le schéma : le document complet est réécrit à chaque opération (JSONB), acceptable jusqu'à quelques Mo par site ; au-delà, on découpera le document par page. Le journal grandit sans fin : `snapshots` et `compact_changes` permettent de le tronquer après chaque publication.

## Mise en place (trois étapes)

1. **Créer le projet** sur supabase.com : nom `atelier`, région `Frankfurt (eu-central-1)`, mot de passe de base de données conservé dans ton gestionnaire de mots de passe.
2. **Exécuter le schéma** : ouvrir *SQL Editor*, coller le contenu de `supabase/schema.sql`, exécuter.
3. **Renseigner les clés** dans `apps/editor/.env.local` (fichier ignoré par git) : *Project Settings → API* donne `Project URL` et la clé `service_role`.

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Puis vérifier et redémarrer :

```bash
node --env-file=apps/editor/.env.local scripts/check-supabase.mjs
npm run dev
```

Au premier chargement de l'éditeur, le site d'exemple est créé dans Supabase (version 0). Les données du mode fichier (`.atelier-data/`) ne sont pas migrées automatiquement.

La clé `service_role` donne tous les droits : elle ne quitte jamais le serveur. Le client n'appelle que l'API d'Atelier.
