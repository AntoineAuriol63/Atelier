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

## Fichiers (images importées)

Les images importées vont dans le seau Storage `assets` (créé par `supabase/schema.sql`, public en lecture, limite 50 Mo par fichier). L'import passe par `POST /api/sites/:id/assets` : le serveur lit l'image, produit les déclinaisons WebP (480, 960, 1600, 2400 px) et écrit le tout dans le seau avec la clé de service. Le document ne garde que les adresses publiques. En mode fichier, les mêmes fichiers vont dans `.atelier-data/assets/` et sont servis par `GET /api/sites/:id/assets/…`. Si le schéma a été exécuté avant l'ajout du seau, relancer seulement le bloc `insert into storage.buckets` du fichier.

## Publication (M6)

Le schéma a gagné deux colonnes sur `sites` (`published_version`, `subdomain`) : relancer le bloc « publication » de `supabase/schema.sql` sur un projet créé avant, puis vérifier avec `scripts/check-supabase.mjs`. Les instantanés publiés vont dans `snapshots` (`kind = 'publish'`). `ATELIER_STORE=file` force le mode fichier même avec Supabase configuré (essais locaux).

## Comptes et connexion (D50, première version)

1. Exécuter le bloc « comptes » de `supabase/schema.sql` (colonne `sites.owner`).
2. Dans Supabase → Authentication → Providers : Email activé, avec « Magic link » (les mots de passe restent désactivés). Dans Authentication → URL Configuration : Site URL = l'adresse de l'éditeur (`http://localhost:3000` puis l'adresse Vercel), et dans Redirect URLs `http://localhost:3000/auth/callback` et `https://<éditeur>/auth/callback`.
3. Dans `.env.local` : `NEXT_PUBLIC_SUPABASE_URL` (la même adresse que `SUPABASE_URL`), `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clé publique « anon », Project Settings → API), et `ATELIER_ALLOWED_EMAILS` avec votre adresse. Redémarrer le serveur.

Dès lors l'éditeur, l'aperçu et l'API demandent une session ; les sites publiés, les envois de formulaires et les fichiers restent publics. Chaque site créé appartient au compte qui l'a créé. Les sites d'avant (sans propriétaire) ne sont accessibles à personne tant qu'on ne leur en a pas donné un : `node --env-file=apps/editor/.env.local scripts/assign-owner.mjs votre@adresse`. Les emails de connexion partent avec le gabarit par défaut de Supabase (en anglais) et l'envoi intégré est limité à deux emails par heure sur le plan gratuit : « email rate limit exceeded » veut dire attendre une heure. Pour s'en affranchir, brancher Resend en SMTP dans Authentication → Emails → SMTP Settings (hôte `smtp.resend.com`, port 587 (STARTTLS ; 465 donne « Gateway Timeout »), utilisateur `resend`, mot de passe = clé API Resend, expéditeur `onboarding@resend.dev` tant qu'aucun domaine n'est vérifié, ce qui limite alors les envois à l'adresse du compte Resend), puis relever les limites dans Authentication → Rate Limits et traduire le gabarit « Magic Link » dans Email Templates.

## Partage par site (D51)

Exécuter le bloc « partage » de `supabase/schema.sql` (table `site_members` : site, adresse, rôle `editor` ou `writer`). Le propriétaire invite des adresses depuis la fenêtre Publier → Partage. Une adresse invitée peut se connecter même si elle n'est pas dans `ATELIER_ALLOWED_EMAILS` : la liste d'Atelier reste celle des personnes qui peuvent créer des sites. Sans la table, personne n'est invité ; en production son absence est une erreur.

## Blocs ajoutés après le premier schéma

Sur un projet créé avant, relancer dans l'ordre les blocs « publication », « comptes », « limite de débit » et « partage » de `supabase/schema.sql`, puis `scripts/check-supabase.mjs` qui vérifie chacun.
