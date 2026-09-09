# Mettre Atelier et ses sites en ligne

Ce document explique la vraie mise en ligne : l'éditeur hébergé, les sites publiés accessibles au public, les emails qui partent. À suivre une fois, puis à chaque changement d'infrastructure. Les étapes marquées **(Antoine)** demandent un compte ou un paiement ; les autres se font depuis le dépôt.

## 1. Ce qu'il faut

| Brique | Rôle | Compte |
| --- | --- | --- |
| Supabase | document, journal, entrées, instantanés publiés, fichiers | déjà créé (`docs/supabase.md`) |
| Vercel | héberge l'application (éditeur + rendu des sites publiés + API) | **(Antoine)** à créer, offre Pro conseillée pour les domaines wildcard |
| Nom de domaine d'Atelier | **deux domaines enregistrables distincts** : l'éditeur (par exemple `atelier.studio`) et les sites publiés (`*.atelier.site`). Un site publié peut contenir du code libre (head, embed) : il ne doit jamais partager l'origine ni les cookies de l'éditeur | **(Antoine)** |
| Resend | notification des formulaires | **(Antoine)** gratuit jusqu'à 3 000 emails par mois ; un domaine d'envoi vérifié pour sortir de l'expéditeur d'essai |

## 2. Déployer l'application sur Vercel

0. **(Antoine)** Le dépôt n'a pas encore de distant : créer un dépôt GitHub privé (`atelier`) et pousser `main` (`git remote add origin git@github.com:<compte>/atelier.git && git push -u origin main`). Le workflow `.github/workflows/ci.yml` (typecheck, tests, lint) tourne à chaque envoi.
0 bis. Exécuter les blocs manquants du schéma Supabase, puis `node --env-file=apps/editor/.env.local scripts/check-supabase.mjs` jusqu'à « Supabase est prêt pour Atelier » (au 9 septembre 2026 il manque le bloc « partage »).
1. **(Antoine)** Créer le projet Vercel depuis le dépôt GitHub, répertoire racine `apps/editor`, région Europe (Paris `cdg1` ou Francfort `fra1`), framework Next.js détecté. La compilation de production (`next build`) a été vérifiée en local le 9 septembre 2026 : toutes les routes sont dynamiques, aucune étape de construction ne touche Supabase.
2. Variables d'environnement (Production et Preview) :
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (les mêmes que `.env.local`) ;
   - `ATELIER_SITES_DOMAIN` = le domaine des sites, par exemple `atelier.site` (sans `https://`) ;
   - `RESEND_API_KEY`, `FORM_NOTIFY_TO`, `MAIL_FROM` pour les formulaires ;
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ATELIER_ALLOWED_EMAILS` pour la connexion (voir `docs/supabase.md`, section Comptes), sans quoi l'éditeur est ouvert à tous.
3. Premier déploiement : l'éditeur répond sur `https://<projet>.vercel.app/`. Sans domaine de sites, les sites publiés ne répondent pas encore (le repli `/s/…` est réservé au développement) : pour un premier contrôle, poser temporairement `ATELIER_ALLOW_PATH_FALLBACK=1` et ouvrir `https://<projet>.vercel.app/s/<sous-domaine>/`, puis retirer la variable dès que le domaine des sites est branché. Tant que `ATELIER_SITES_DOMAIN` est absent, l'adresse publique (fenêtre Publier, canonique, plan du site, robots) est ce chemin de repli derrière l'origine de la requête.

Fait le 9 septembre 2026 : projet `atelier-editor` sur Vercel, `https://atelier-editor.vercel.app` ; connexion, site de Marie sous `/s/site-marie`, plan du site, robots, page 404 et en-têtes vérifiés.
4. Republier chaque site une fois depuis l'éditeur en ligne : la publication enregistre le sous-domaine qui répond (les sites publiés avant le 9 septembre 2026 n'en ont pas ; en attendant, l'identifiant du site sert de repli).

## 3. Les sous-domaines des sites

1. **(Antoine)** Chez le registrar, un enregistrement DNS `*` (wildcard) de type CNAME vers `cname.vercel-dns.com`, plus le domaine nu si l'éditeur doit y répondre.
2. Dans le projet Vercel → Domains, ajouter `*.atelier.site` (wildcard) et `atelier.site`. Vercel émet les certificats automatiquement (D34).
3. `src/proxy.ts` réécrit `<sous-domaine>.atelier.site/…` vers `/s/<sous-domaine>/…` ; `ATELIER_SITES_DOMAIN` doit valoir exactement `atelier.site`.
4. Chaque site choisit son sous-domaine dans la fenêtre Publier ; il est enregistré à la publication.

Sans domaine de sites, il n'y a pas de site public en production : le repli `/s/<sous-domaine>/` est réservé au développement (`ATELIER_ALLOW_PATH_FALLBACK=1` le force pour un essai, jamais avec des sites de clients). L'application refuse de démarrer en production si une variable Supabase, la connexion ou la liste des adresses manque, ou si `ATELIER_AUTH=off` / `ATELIER_STORE=file` traînent.

## 3 bis. Propriétaires des sites et partage

Un site n'est accessible qu'à son propriétaire et aux personnes qu'il invite. Les sites créés avant les comptes n'ont pas de propriétaire : `node --env-file=apps/editor/.env.local scripts/assign-owner.mjs votre@adresse` les attribue en une fois. Le bloc « partage » de `supabase/schema.sql` (table `site_members`) est nécessaire en production. Les personnes invitées se connectent avec leur adresse sans être dans `ATELIER_ALLOWED_EMAILS`, qui reste la liste de ceux qui peuvent créer des sites.

## 4. Vérifier après déploiement

Fait le 9 septembre 2026 sur `atelier-editor.vercel.app` : connexion par lien magique, publication depuis l'éditeur en ligne, site servi avec son thème, plan du site, robots, page 404, en-têtes, formulaire de contact reçu dans Données → Messages reçus. Lighthouse reste à mesurer.

- Ouvrir l'éditeur en ligne, publier, ouvrir l'adresse affichée dans la fenêtre Publier.
- `https://<site>/sitemap.xml` et `/robots.txt` répondent.
- Envoyer le formulaire de contact : le message apparaît dans Données → Messages reçus, et par email si Resend est configuré.
- Mesurer avec Lighthouse (Chrome → Outils de développement) et noter le résultat dans la feuille de route.

## 5. Ce qui manque encore pour un client

- Le domaine personnalisé d'un client (v1), l'export en projet Next.js (l'archive statique existe, D15), les sauvegardes planifiées.
