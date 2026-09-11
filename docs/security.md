# Sécurité et frontières de confiance

Ce document décrit les invariants à préserver lorsqu’Atelier évolue.

## Contenu des sites

Un document Atelier est du contenu non fiable, même lorsqu’il provient d’un collaborateur invité. Il peut contenir du HTML intégré, du SVG, des valeurs CSS, des liens, des médias externes et du code personnalisé de tête ou de fin de corps.

- **Éditeur et aperçu** : aucun HTML, SVG ou script fourni par le document ne doit s’exécuter avec l’origine de l’éditeur. Les blocs intégrés sont représentés par un substitut inerte dans l’aperçu. Le texte placé dans une balise `style` doit neutraliser le caractère `<`.
- **Site publié** : le code personnalisé reste autorisé, mais uniquement derrière le domaine séparé `ATELIER_SITES_DOMAIN`. Cette origine ne doit jamais partager les cookies de l’éditeur.
- Un futur aperçu fidèle du code personnalisé devra utiliser une origine dédiée ou une iframe sans `allow-same-origin`, avec un protocole `postMessage` validé.

## Accès réseau côté serveur

Toute URL issue d’un document est hostile. Un téléchargement serveur doit passer par `fetchPublicBytes` :

- HTTP(S) uniquement, sans identifiants ni port non standard ;
- résolution DNS contrôlée et adresses privées, loopback ou link-local refusées ;
- redirections vérifiées une par une ;
- délai et taille maximale obligatoires.

Ne jamais remplacer cet appel par un `fetch(url)` direct. Une allowlist de domaines reste préférable pour les futures intégrations.

## Authentification et rôles

Les pages et routes propres à un site utilisent `siteRole` ou `guardSite`. Ne pas employer le contrôle historique propriétaire-seul pour une fonctionnalité destinée aux invités.

Le rôle rédacteur peut modifier la structure et le contenu. Toute nouvelle propriété exécutable doit donc être soit neutralisée dans l’aperçu, soit réservée explicitement à un rôle supérieur.

## Routes publiques

Les sites publiés, assets et formulaires sont publics. Ils ne doivent jamais donner accès au document de travail ou à la clé de service. En production, une panne du limiteur de débit des formulaires doit fermer la route temporairement, pas désactiver la limite.

## Vérifications avant fusion

```bash
npm ci
npm run typecheck
npm test
npm run lint
npm run build
```

GitHub doit protéger `main` avec pull request et vérifications obligatoires. La protection de branche est un réglage du dépôt, pas un fichier versionné.
