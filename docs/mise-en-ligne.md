# Mettre Atelier et ses sites en ligne

Ce document explique la vraie mise en ligne : l'éditeur hébergé, les sites publiés accessibles au public, les emails qui partent. À suivre une fois, puis à chaque changement d'infrastructure. Les étapes marquées **(Antoine)** demandent un compte ou un paiement ; les autres se font depuis le dépôt.

## 1. Ce qu'il faut

| Brique | Rôle | Compte |
| --- | --- | --- |
| Supabase | document, journal, entrées, instantanés publiés, fichiers | déjà créé (`docs/supabase.md`) |
| Vercel | héberge l'application (éditeur + rendu des sites publiés + API) | **(Antoine)** à créer, offre Pro conseillée pour les domaines wildcard |
| Nom de domaine d'Atelier | `nom.atelier.site` → à décider et acheter `[?]` | **(Antoine)** |
| Resend | notification des formulaires | **(Antoine)** gratuit jusqu'à 3 000 emails par mois ; un domaine d'envoi vérifié pour sortir de l'expéditeur d'essai |

## 2. Déployer l'application sur Vercel

1. **(Antoine)** Créer le projet Vercel depuis le dépôt GitHub, répertoire racine `apps/editor`, région Europe (Paris `cdg1` ou Francfort `fra1`), framework Next.js détecté.
2. Variables d'environnement (Production et Preview) :
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (les mêmes que `.env.local`) ;
   - `ATELIER_SITES_DOMAIN` = le domaine des sites, par exemple `atelier.site` (sans `https://`) ;
   - `RESEND_API_KEY`, `FORM_NOTIFY_TO`, `MAIL_FROM` pour les formulaires ;
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ATELIER_ALLOWED_EMAILS` pour la connexion (voir `docs/supabase.md`, section Comptes), sans quoi l'éditeur est ouvert à tous.
3. Premier déploiement : l'éditeur répond sur `https://<projet>.vercel.app/`, les sites publiés sur `https://<projet>.vercel.app/s/<sous-domaine>/`.

## 3. Les sous-domaines des sites

1. **(Antoine)** Chez le registrar, un enregistrement DNS `*` (wildcard) de type CNAME vers `cname.vercel-dns.com`, plus le domaine nu si l'éditeur doit y répondre.
2. Dans le projet Vercel → Domains, ajouter `*.atelier.site` (wildcard) et `atelier.site`. Vercel émet les certificats automatiquement (D34).
3. `src/proxy.ts` réécrit `<sous-domaine>.atelier.site/…` vers `/s/<sous-domaine>/…` ; `ATELIER_SITES_DOMAIN` doit valoir exactement `atelier.site`.
4. Chaque site choisit son sous-domaine dans la fenêtre Publier ; il est enregistré à la publication.

Sans domaine acheté, tout fonctionne déjà sur `/s/<sous-domaine>/` du domaine Vercel : c'est l'adresse à donner pour tester.

## 4. Vérifier après déploiement

- Ouvrir l'éditeur en ligne, publier, ouvrir l'adresse affichée dans la fenêtre Publier.
- `https://<site>/sitemap.xml` et `/robots.txt` répondent.
- Envoyer le formulaire de contact : le message apparaît dans Données → Messages reçus, et par email si Resend est configuré.
- Mesurer avec Lighthouse (Chrome → Outils de développement) et noter le résultat dans la feuille de route.

## 5. Ce qui manque encore pour un client

- Des rôles et un partage par site (v1, D50–D51) : aujourd'hui, un compte voit ses propres sites, et la liste des adresses autorisées est une variable d'environnement.
- Le domaine personnalisé d'un client (`v1`), l'export du code (D15), les sauvegardes planifiées.
