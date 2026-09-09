# Export du code

Première forme de l'export (D15, revue de septembre 2026, point 10) : une archive statique complète, à déposer telle quelle sur n'importe quel hébergement. Le générateur de projet Next.js viendra ensuite ; il réutilisera le même nommage et le même moteur.

## Ce que contient l'archive

`GET /api/sites/:id/export` (propriétaire seulement) rend `<sous-domaine>-<date>.zip` :

- `index.html`, `<chemin>/index.html` : une page par adresse, pages fixes et une page par entrée de chaque modèle de page (adresse d'après `slugPattern`). Tête complète : titre, description, Open Graph, Twitter, robots, canonique, favicon, polices Google, `color-scheme`, code head du site ; fin de body du site. Rendu par `renderToStaticMarkup` avec le moteur partagé, sans attribut `data-node` ni script d'éditeur.
- `styles.css` : `siteCss(site, { classes })`, toutes pages, classes lisibles.
- `assets/` : originaux et déclinaisons, nommés d'après le nom du média dans la bibliothèque (`portrait.jpg`, `portrait-800.webp`). Extension d'après la signature du fichier, sinon le type déclaré, sinon l'adresse. Un média inaccessible garde son adresse d'origine et est listé dans le README.
- `data/<slug>.json` : entrées par base. `atelier/site.json` et `atelier/entries.json` : le document et les entrées tels que stockés (adresses de médias d'origine), pour revenir dans Atelier.
- `_redirects` (format Netlify/Cloudflare Pages) s'il y a des redirections ; `README.md` en français : contenu, mise en ligne, formulaires, médias externes.

Source : la version publiée si elle existe, sinon la version de travail (dit dans le README et dans la fenêtre Publier). Les en-têtes `x-atelier-pages` et `x-atelier-assets` servent au message de confirmation.

## Classes lisibles

`classMap(site)` (`packages/model/src/naming.ts`) déduit une classe par nœud et par style partagé, sans rien imposer à la création :

- un conteneur nommé prend son nom en slug (`Héros` → `heros`) ; s'il est déjà pris dans le site, il se préfixe de l'ancêtre nommé le plus proche (`derniers-projets-texte`), puis se numérote ;
- une feuille sans nom prend `<ancêtre nommé>-<sorte>` : `heros-title`, `heros-text`, `heros-text-2` (numéro parmi les voisins de même sorte, dans l'ordre). Sortes : `title` (h1–h6), `text`, `quote`, `label` (span), `image`, `video`, `button`, `link`, `list`, `item`, `view` (collection), `card` (item de vue), `box` ou la balise (`section`, `header`, `nav`…), `form`, `field`, `divider` ;
- la racine d'une page s'appelle `page`, celle d'un composant porte le nom du composant ; une instance ne produit pas d'élément, c'est la racine du composant qui porte la classe ;
- les styles partagés gardent leur nom (`Bouton / secondaire` → `bouton-secondaire`) ;
- un nom saisi à la main prime toujours ; renommer un calque renomme la classe. L'inspecteur affiche la classe sous le nom (« Classe CSS »).

L'éditeur et le site publié gardent les classes techniques `n-<id>` et `s-<id>` ; seules les options `classes` du moteur (`RenderContext.classes`, `siteCss(site, { classes })`, `nodeClassName(node, extra, classes)`) basculent vers les noms lisibles. Les identifiants ne sont jamais des classes visibles dans l'export.

## Limites connues

- Les formulaires pointent vers `/api/forms/…` d'Atelier : hors Atelier, changer l'`action` (dit dans le README).
- Liens absolus depuis la racine : l'archive se dépose à la racine d'un domaine, pas dans un sous-dossier, et ne se lit pas depuis le disque.
- Pas de `404.html` ni de domaine dans les canoniques/Open Graph (viendra avec le minimum professionnel, point 12).
- Pas encore de projet Next.js (D15) : l'archive statique est la base ; le générateur produira des composants par page à partir du même `classMap`.
- L'archive est construite en mémoire (zip sans compression, `lib/zip.ts`) : un site de plusieurs centaines de médias lourds demandera un flux.
