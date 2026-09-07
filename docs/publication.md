# Publication (M6)

## Ce qui est publié

« Publier » fige le document courant **et ses entrées** en un instantané (`snapshots`, `kind = 'publish'`), qui devient la version publiée du site (`sites.published_version`). Le site public est toujours servi depuis cet instantané : continuer à travailler dans l'éditeur ne change rien en ligne tant qu'on ne republie pas (D36). Le retour arrière désigne un instantané précédent comme version publiée, sans rien recalculer.

## Adresses

Un site répond sur `<sous-domaine>.<ATELIER_SITES_DOMAIN>` (réécriture par `src/proxy.ts` vers `/s/<sous-domaine>/…`), et en repli sur `/s/<sous-domaine>/…` sur le domaine nu. Le sous-domaine vient de `settings.subdomain` (réglable dans la fenêtre Publier), sinon de l'identifiant du site. En développement, `marie.localhost:3000` fonctionne dans Chrome sans configuration.

Le domaine d'Atelier reste à acheter (décision ouverte) ; en attendant, un déploiement Vercel sert les sites sur `/s/…` et sur les sous-domaines de son domaine si `ATELIER_SITES_DOMAIN` le désigne (domaine wildcard à ajouter au projet Vercel).

## Rendu et cache (D35)

Les pages publiées sont rendues à la demande par le même moteur que l'éditeur, depuis l'instantané mis en cache (`unstable_cache`, étiquette `site:<id>`). Publier ou revenir en arrière invalide l'étiquette : la première visite suivante régénère, les autres lisent le cache. Aucune étape de construction.

## Référencement (D38)

Automatique par page : titre (avec le suffixe du site), description, canonique, Open Graph et carte Twitter (image de la page ou du site), `robots` selon « indexer », favicon. `sitemap.xml` liste les pages fixes indexables et une adresse par entrée publiée des modèles de page ; `robots.txt` renvoie au plan du site. Le code `settings.head` et `settings.bodyEnd` est injecté tel quel (D40).

## Mise en place Supabase

Exécuter le bloc « publication » de `supabase/schema.sql` (deux colonnes sur `sites`). Sans lui, « Publier » explique quoi faire.
