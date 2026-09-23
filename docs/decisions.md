# Décisions de cadrage (validées le 6 septembre 2026)

Source : document de cadrage « Cadrage Atelier » (artifact Claude, version 0.2). Chaque décision ci-dessous a été validée par Antoine. Le détail (pourquoi, conséquences) est dans le document source.

## Vision et positionnement

- **D01** — Atelier est un créateur de sites designer-first, code-natif et sans verrou, dont les trois mondes (écrire, designer, coder) sont reliés en permanence.
- **D02** — Cible de lancement : freelances et petites agences. Les débutants suivent rapidement via le mode Écriture et les modèles.
- **D03** — L'export et l'absence de verrou sont la promesse centrale, affichée dès la page d'accueil.
- **D04** — L'humain, l'éditeur visuel et l'IA modifient tous le même modèle de document.
- **D05** — Européen par défaut : hébergement en Europe, conformité RGPD native, interface en français et en anglais.

## Principes produit

- **D06** — Divulgation progressive : un seul modèle, un seul espace de travail, et des modes qui sont des préréglages d'affichage, pas des cloisons.
- **D07** — Le bloc est une boîte déguisée.
- **D08** — « Tout faire » passe par le code, pas par un app builder.
- **D09** — CSS réel, vocabulaire simple.
- **D10** — Le premier site (vitrine de photographe) sert de test, pas de spécification.

## Modèle de document

- **D11** — Un site est un arbre de nœuds JSON, et chaque nœud est un composant de rendu réel.
- **D12** — Trois niveaux de style : thème (variables), styles partagés, surcharges locales. Le responsive se règle par points de rupture en cascade.
- **D13** — Les composants ont des propriétés typées, des variantes et des emplacements (slots).
- **D14** — Les composants en code sont des nœuds de premier ordre, au même titre que les blocs natifs.
- **D15** — L'export produit un projet Next.js standard et lisible, pas un dump HTML.
- **D16** — Le canvas de l'éditeur est le vrai site rendu dans une iframe, pas une imitation.

## Les trois modes

- **D17** — Les modes s'appellent Écriture, Design et Code. Ce sont des points de départ, pas des cases : chaque personne les ajuste et les mélange.
- **D18** — Le mode Écriture reprend la dynamique de Notion (insérer par « / », glisser pour réorganiser, éditer en place, aucun panneau imposé), pas son interface.
- **D19** — Le mode Design suit la disposition Figma : calques à gauche, canvas au centre, propriétés à droite, avec les panneaux Disposition, Espacement, Typographie, Apparence, Effets et Interactions.
- **D20** — Le mode Code donne accès à l'arbre, aux styles, aux composants custom et au code injecté, sans jamais être obligatoire.

## Bases de données et CMS

- **D21** — Le CMS d'Atelier, c'est des bases de données avec vues, à la Notion. Il n'y a pas d'autre notion de « collection ».
- **D22** — Types de champs à la v1 : texte, texte riche, nombre, date, case à cocher, sélection (simple, multiple), image, fichier, galerie, lien, couleur, relation, référence inverse, formule simple, auto (créé le, modifié le, position).
- **D23** — Une vue est une mise en page prête (galerie, liste, tableau, calendrier, carrousel, carte) posée dans une page comme un bloc, avec filtre, tri et pagination. Son élément répété est un composant modifiable en mode Design.
- **D24** — Chaque base peut avoir un modèle de page qui génère une page par entrée, avec URL, SEO et champs liés.
- **D25** — Ne pas rester coincé dans le modèle Notion : import et export, API, et sources externes montées comme des bases.

## Import Figma

- **D26** — Figma et Atelier sont connectés : un fichier Figma est lié au site, le designer continue à travailler dans Figma, voit le rendu dans Atelier et pousse ses mises à jour quand il le souhaite.
- **D27** — L'import Figma est aussi fonctionnel : les liens de prototype deviennent une navigation, les interactions (au clic, au survol, changement de variante) deviennent des interactions Atelier, et les transitions Smart Animate deviennent des animations de layout.
- **D28** — L'import est itératif : on peut réimporter un composant ou une page depuis Figma sans écraser ce qui a été modifié dans Atelier.
- **D29** — Ce que Figma permet et que le web ne tolère pas (positions absolues sans auto-layout, textes en hauteur fixe) est converti au mieux et signalé « à réviser », jamais reproduit tel quel.
- **D30** — L'import Figma arrive en v1, mais le modèle de document en tient compte dès la v0.

## Interactions et animations

- **D31** — Les interactions sont déclaratives par défaut (déclencheur, cible, changement, transition) et toujours lisibles en code ; les interactions complexes s'écrivent en code et vivent dans le même panneau.
- **D32** — Les composants ont des états (survol, actif, ouvert, sélectionné) et les pages ont des variables d'état simples (menu ouvert, onglet courant).
- **D33** — Les animations de layout sont automatiques : quand un nœud change d'état ou de variante, la transition entre les deux dispositions est animée par défaut.

## Hébergement et publication

- **D34** — L'hébergement est inclus et géré par Atelier, en Europe, avec un sous-domaine gratuit, un domaine personnalisé et un certificat automatique.
- **D35** — Les sites publiés sont rendus en statique avec régénération à la demande : chaque publication ou modification de contenu régénère uniquement les pages concernées.
- **D36** — Publication explicite avec prévisualisation, historique des versions et retour arrière en un clic. Le contenu des bases de données peut être publié indépendamment du design.
- **D37** — Les images et vidéos sont optimisées automatiquement : formats modernes, tailles adaptées, chargement différé, conversion HEIC à l'import.

## Référencement

- **D38** — Le référencement technique est automatique par défaut, et chaque automatisme est débrayable ou surchargeable à la main.
- **D39** — Un panneau Référencement par page et par modèle de page, avec titre, description, image sociale, indexation, canonique, et un aperçu du résultat Google.

## Code personnalisé

- **D40** — Code injecté dans le head et en fin de body, au niveau du site et de la page, avec un chargement différé par défaut pour les scripts tiers.
- **D41** — Les composants code sont écrits en React et TypeScript, avec des propriétés déclarées qui apparaissent dans le panneau de propriétés, un aperçu en direct, et l'accès à un SDK (bases de données, formulaires, thème, page courante).
- **D42** — Une bibliothèque publique de composants et de modèles de sections, alimentée d'abord par Atelier, puis ouverte aux utilisateurs.

## Automatisations et interconnexions

- **D43** — Tout ce qui se passe sur un site émet un événement : formulaire envoyé, entrée créée ou modifiée, site publié, membre inscrit, erreur.
- **D44** — Une automatisation est une règle simple « quand ceci, faire cela », avec une condition optionnelle. Pas de constructeur de workflows à branches.
- **D45** — Intégrations natives prioritaires : email transactionnel, Notion, Airtable, Google Sheets, Slack, Mailchimp ou Brevo, Zapier, Make, n8n. Le reste passe par webhooks et API.
- **D46** — Une API publique REST couvrant bases de données, formulaires, médias et publication, avec webhooks sortants et clés par site.

## Formulaires, langues, membres

- **D47** — Les formulaires sont natifs : constructeur de champs, envois stockés dans une base de données du site, notification par email, protection anti-spam, fichiers joints.
- **D48** — Le multilingue est prévu dans le modèle dès la v0 (chaque texte et chaque champ peuvent porter plusieurs langues), et livré en v2 avec traduction assistée par IA.
- **D49** — Les espaces membres (inscription, connexion, pages réservées, contenu selon le profil) sont en v3, avec des membres stockés dans une base ordinaire.

## Organisation et collaboration

- **D50** — La hiérarchie est Espace de travail → Sites → Pages et bases. Un espace a des membres avec rôles : propriétaire, designer, rédacteur, client.
- **D51** — Le rôle « client » voit une interface réduite : mode Écriture, bases de données, formulaires reçus, publication. Le designer choisit ce que le client peut toucher.
- **D52** — Édition à plusieurs en temps réel, commentaires ancrés sur les nœuds et historique des modifications, en v2.

## IA

- **D53** — L'IA agit sur le modèle de document (D04) et couvre quatre usages : démarrer un site depuis une description, générer ou modifier une section, réécrire un texte, remplir les métadonnées (SEO, textes alternatifs, traductions).
- **D54** — L'IA arrive en v2, après que le modèle et les modes sont stables. Les métadonnées assistées (alt, SEO) peuvent arriver dès la v1.

## Modèle économique

- **D55** — Gratuit sur sous-domaine avec limites, payant par site publié sur domaine personnalisé, et un plan Espace pour les agences avec sites clients illimités en brouillon et facturation transférable au client.

## Socle technique

- **D56** — Next.js, React et TypeScript pour l'éditeur et le rendu ; Supabase (Postgres, auth, stockage) pour les données ; Vercel pour l'hébergement au départ, région Europe.
- **D57** — Le document est stocké comme un arbre versionné par opérations (chaque modification est une opération enregistrée), pas comme un fichier réécrit à chaque sauvegarde.
- **D58** — Les composants code sont compilés dans un bac à sable côté serveur ; dans l'éditeur ils s'exécutent isolés, sur le site publié ils font partie de la page comme tout autre composant, sans iframe.

## Feuille de route

- **D59** — Le découpage en quatre versions ci-dessus est adopté, avec un site réel publié comme critère de fin de chaque version.

## Interface (23 septembre 2026)

- **D60** — L'animation est un **outil**, pas un mode : D17 garde ses trois modes (Écriture, Design, Code). L'outil Animation est un tiroir sous le canevas, ouvert depuis la rubrique Animation d'un élément, la barre du canevas ou la palette ; à gauche ce que l'élément et la page lancent, à droite la ligne de temps de l'animation ouverte (scène et pistes ; réglages de la piste et de l'image-clé). La barre du haut ne porte que le site, les modes et la publication ; la vue de l'aperçu se règle dans une barre du canevas ; les panneaux de gauche s'ouvrent depuis un rail d'icônes.
