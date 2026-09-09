# Modèle de document Atelier

Version du schéma : `1` (champ `schemaVersion`).
Statut : spécification v0, à faire évoluer par version de schéma avec migration.

Ce document est le contrat entre l'éditeur, le moteur de rendu, l'export, l'import Figma et l'IA. Il découle des décisions D11 à D16, D22 à D24, D31 à D33, D48, D54 et D57 (voir `decisions.md`).

## 1. Principes

1. **Tout est un nœud.** Une page est un arbre de nœuds. Un titre, une image, une section, une vue de base de données, une instance de composant ou un composant code sont des nœuds du même type de structure. Le texte riche d'une base de données est aussi une liste de nœuds.
2. **Chaque nœud a un rendu réel.** Le champ `type` désigne un composant du moteur de rendu (`@atelier/renderer`) qui rend le nœud à l'identique dans l'éditeur, sur le site publié et dans l'export.
3. **Le style est du CSS réel, contraint.** Les propriétés de style sont un sous-ensemble nommé et typé du CSS. Une valeur est un littéral, une référence à un jeton du thème, ou héritée d'un style partagé. Pas de CSS libre dans le modèle (le CSS libre passe par le code personnalisé).
4. **Lisible par un humain et par un modèle de langage.** Les noms sont explicites, la structure est plate quand elle peut l'être, les identifiants sont courts et stables mais jamais seuls porteurs de sens : chaque nœud a un `name`.
5. **Modifié par opérations.** Un document ne s'écrase pas. Il évolue par une suite d'opérations inversibles (section 9). Un instantané complet est calculé à chaque publication.
6. **Localisable dès le départ.** Tout texte visible est un `Localized<T>`. Un site a une langue par défaut et des langues secondaires.
7. **Traçable vers sa source.** Un nœud, un composant ou un jeton peut porter une référence à sa source externe (nœud Figma, entrée importée) pour permettre la resynchronisation.

## 2. Vue d'ensemble

```
Site
├── settings        langue(s), points de rupture, domaine, SEO par défaut
├── theme           jetons (couleurs, polices, tailles, espacements, arrondis, ombres), modes
├── sharedStyles    styles nommés réutilisables
├── components      définitions de composants (arbre + propriétés + variantes + emplacements)
├── codeComponents  composants en code (source, propriétés déclarées, artefact compilé)
├── databases       schémas des bases de données (les entrées vivent hors du document)
├── pages           pages statiques et modèles de page
├── assets          médias référencés (les fichiers vivent dans le stockage)
└── redirects       redirections
```

Le document est l'objet `Site`. Les entrées des bases de données et les fichiers médias ne sont pas dans le document : ils sont référencés par identifiant.

## 3. Types de base

```ts
type Id = string;                 // 10 à 21 caractères [A-Za-z0-9_-], stable, unique dans le site
type Locale = string;             // BCP 47 : "fr", "en", "fr-CA"
type Localized<T> = { [locale: Locale]: T };  // la langue par défaut du site est toujours présente

type SourceRef = {
  kind: "figma" | "import" | "ai" | "template";
  ref: string;                    // ex. identifiant de nœud Figma "12:345"
  fileId?: string;
  syncedAt?: string;              // ISO 8601
};
```

Convention : quand une valeur localisée n'existe pas dans la langue demandée, le rendu retombe sur la langue par défaut (D48).

## 4. Nœuds

### 4.1 Structure commune

```ts
type Node = {
  id: Id;
  type: NodeType;
  name?: string;                  // nom affiché dans les calques ; sinon dérivé du type
  props: Record<string, PropValue>;   // propriétés propres au type (src, href, level…)
  style?: StyleSet;               // voir section 5
  children?: Node[];              // uniquement pour les types conteneurs
  bindings?: Record<string, Binding>;   // propriété → source de données (section 7)
  interactions?: Interaction[];   // section 8
  locked?: boolean;               // verrouillé pour les rôles limités (D51)
  hidden?: { [breakpoint: string]: boolean };   // masqué par point de rupture
  source?: SourceRef;
  meta?: Record<string, unknown>; // espace libre pour l'éditeur (replié, couleur de calque…)
};
```

### 4.2 Types de nœuds (v0)

| Type | Rôle | Enfants | Propriétés principales |
|---|---|---|---|
| `box` | Boîte générique : section, conteneur, colonne, carte | oui | `tag` (`div`, `section`, `header`, `footer`, `nav`, `article`, `aside`, `main`, `figure`) |
| `text` | Un bloc de texte : paragraphe, titre, citation | non | `tag` (`p`, `h1`…`h6`, `blockquote`, `span`, `label`), `content: Localized<Inline[]>` |
| `list` | Liste | `listItem` | `ordered: boolean` |
| `listItem` | Élément de liste | oui | — |
| `image` | Image | non | `asset: Id \| null`, `alt: Localized<string>`, `fit`, `ratio`, `priority` |
| `video` | Vidéo hébergée ou intégrée | non | `asset \| url`, `autoplay`, `loop`, `muted`, `controls` |
| `link` | Lien ou bouton | oui | `href: LinkTarget`, `newTab`, `tag` (`a`, `button`) |
| `icon` | Icône vectorielle | non | `name` ou `svg` |
| `divider` | Séparateur : trait horizontal dans une colonne, vertical dans une rangée (décidé par le conteneur, section 11) | non | — |
| `embed` | HTML intégré (widget tiers) | non | `html: string` |
| `form` | Formulaire (envois : `docs/formulaires.md`) | oui | `formId: Id`, `successMessage: Localized<string>`, `successAction` |
| `field` | Champ de formulaire | non | `fieldType`, `name`, `label`, `required`, `options` |
| `collection` | Vue de base de données (section 7) | `item` | `database: Id`, `view: ViewConfig` |
| `item` | Modèle de l'élément répété d'une `collection` | oui | — |
| `instance` | Instance d'un composant (section 6) | non (via `slots`) | `component: Id`, `variant`, `props`, `slots` |
| `slot` | Emplacement dans la définition d'un composant | oui (contenu par défaut) | `name` |
| `code` | Instance d'un composant code (D14, D41) | non | `component: Id`, `props` |

Les blocs du mode Écriture (D18) sont des préréglages de ces types : « Section » est un `box` avec `tag: section` et un style partagé de section ; « Colonnes » est un `box` en grille avec des `box` enfants ; « Galerie » est une `collection` avec une vue galerie ; « Bouton » est un `link` avec le style partagé bouton.

### 4.3 Contenu en ligne (`Inline`)

Le contenu d'un nœud `text` est une liste de segments avec marques, pas du HTML :

```ts
type Inline =
  | { t: "text"; v: string; marks?: Mark[] }
  | { t: "break" }
  | { t: "link"; href: LinkTarget; newTab?: boolean; children: Inline[] }
  | { t: "bind"; binding: Binding; marks?: Mark[] };   // texte lié à une donnée

type Mark = "bold" | "italic" | "underline" | "strike" | "code" | { color: StyleValue };
```

### 4.4 Cibles de lien

```ts
type LinkTarget =
  | { kind: "url"; url: string }
  | { kind: "page"; page: Id; anchor?: string }
  | { kind: "entry"; database: Id; entry: Id }       // page dynamique d'une entrée
  | { kind: "asset"; asset: Id }
  | { kind: "email"; to: string }
  | { kind: "phone"; number: string }
  | { kind: "anchor"; node: Id };
```

## 5. Style

### 5.1 Jeu de styles d'un nœud

```ts
type StyleSet = {
  shared?: Id[];                  // styles partagés appliqués, dans l'ordre
  base?: StyleProps;              // valeurs locales, point de rupture de base (le plus large)
  breakpoints?: { [breakpoint: string]: StyleProps };   // surcharges par point de rupture
  states?: { [state: string]: StyleProps };             // hover, active, focus, open, current…
  stateBreakpoints?: { [state: string]: { [breakpoint: string]: StyleProps } };
};
```

Cascade, du plus faible au plus fort : thème (valeurs par défaut du type) → styles partagés dans l'ordre → `base` → point de rupture courant et ceux plus larges (cascade descendante, comme Webflow) → état.

### 5.2 Propriétés de style

Sous-ensemble du CSS, avec des noms CSS (pas d'invention de vocabulaire dans le modèle : le vocabulaire simple est affaire d'interface, D09).

Groupes et propriétés (v0) :

- **Disposition** : `display` (`flex`, `grid`, `block`, `inline-block`, `none`), `flexDirection`, `flexWrap`, `justifyContent`, `alignItems`, `alignSelf`, `gap`, `rowGap`, `columnGap`, `gridTemplateColumns`, `gridTemplateRows`, `gridColumn`, `gridRow`, `order`, `flexGrow`, `flexShrink`, `flexBasis`, `position`, `top`, `right`, `bottom`, `left`, `zIndex`, `overflow`.
- **Dimensions** : `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `aspectRatio`.
- **Espacement** : `margin*`, `padding*` (les quatre côtés).
- **Typographie** : `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecoration`, `color`, `whiteSpace`, `textWrap`.
- **Apparence** : `background` (couleur, dégradé ou image), `borderWidth*`, `borderStyle`, `borderColor`, `borderRadius*`, `boxShadow`, `opacity`, `objectFit`, `objectPosition`.
- **Effets** : `transform`, `transition`, `filter`, `backdropFilter`, `cursor`.

### 5.3 Valeurs

```ts
type StyleValue =
  | string | number                       // littéral CSS : "16px", "1.5", "#1F5F8B", "auto"
  | { token: string }                      // référence à un jeton : { token: "color.primary" }
  | { calc: string }                       // expression calc() sur littéraux et jetons
  | { image: Id; size?: string; position?: string; repeat?: string }   // fond image
  | { gradient: Gradient };
```

Les unités sont conservées telles quelles. L'interface propose des unités et des valeurs saisissables en syntaxe CSS (D01).

### 5.4 Styles partagés

```ts
type SharedStyle = {
  id: Id;
  name: string;                   // "Bouton", "Bouton / secondaire", "Section"
  extends?: Id;                   // héritage simple, une seule profondeur recommandée
  style: Omit<StyleSet, "shared">;
  appliesTo?: NodeType[];         // aide de l'interface, pas une contrainte du moteur
  source?: SourceRef;             // style Figma d'origine
};
```

### 5.5 Points de rupture

Définis au niveau du site, en cascade descendante à partir du plus large :

```ts
type Breakpoint = { id: string; name: string; maxWidth: number };   // "tablet" 991, "mobile" 767, "small" 479
```

Le point de rupture de base n'a pas de `maxWidth`. On peut en ajouter (grand écran avec `minWidth`) en v1.

### 5.6 Thème

```ts
type Theme = {
  tokens: {
    color: TokenGroup; font: TokenGroup; fontSize: TokenGroup; lineHeight: TokenGroup;
    space: TokenGroup; radius: TokenGroup; shadow: TokenGroup; width: TokenGroup;
  };
  modes: { id: string; name: string }[];        // "light", "dark"
  defaultMode: string;
  typeDefaults: { [nodeTypeOrTag: string]: StyleProps };   // styles par défaut de h1, p, a…
  fonts: FontFace[];                            // polices chargées (Google ou fichiers)
};
type TokenGroup = { [name: string]: TokenValue };
type TokenValue = string | { [mode: string]: string };      // une valeur par mode si nécessaire
```

Les jetons sont rendus en variables CSS `--color-primary`, `--space-4`, etc. Un jeton par mode génère la déclinaison sous `[data-mode="dark"]`. Le thème correspond aux variables et modes Figma (D26).

## 6. Composants

```ts
type ComponentDef = {
  id: Id;
  name: string;
  description?: string;
  props: PropDef[];               // propriétés exposées
  variants?: VariantAxis[];       // axes de variantes : { name: "style", values: ["primaire", "secondaire"] }
  root: Node;                     // arbre du composant ; contient des nœuds `slot`
  variantStyles?: { [variantKey: string]: { [nodeId: Id]: StyleSet } };   // surcharges par variante
  source?: SourceRef;
  scope: "site" | "workspace";    // bibliothèque d'espace de travail (D50)
};

type PropDef = {
  name: string;
  label: Localized<string>;
  type: "text" | "richtext" | "number" | "boolean" | "image" | "link" | "select" | "color" | "entry" | "node";
  default?: PropValue;
  options?: string[];             // pour select
  database?: Id;                  // pour entry
};
```

Dans l'arbre d'un composant, un nœud lie une propriété par `bindings: { "content": { source: "prop", path: "title" } }`.

Une instance :

```ts
// Node de type "instance"
props: {
  component: Id;
  variant?: { [axis: string]: string };
  values?: { [propName: string]: PropValue };
  overrides?: { [nodeId: Id]: Partial<Pick<Node, "props" | "style" | "hidden">> };   // surcharges locales sans détacher
  slots?: { [slotName: string]: Node[] };
}
```

« Détacher l'instance » (`planDetach`) remplace le nœud `instance` par une copie de l'arbre résolu : surcharges appliquées, propriétés liées (`bindings` de source `prop`) remplacées par leur valeur, emplacements remplis, identifiants neufs. « En faire un composant » (`planMakeComponent`) fait l'inverse : le sous-arbre sélectionné devient `root` d'une nouvelle définition (identifiants conservés), remplacé dans la page par une instance.

Variantes (`packages/model/src/components.ts`) : la clé de `variantStyles` est `axe:valeur` (une clé par valeur, les axes se combinent). Au rendu, la racine de l'instance reçoit une classe `v-<axe>-<valeur>` par axe (valeur de l'instance, sinon défaut de l'axe), et le moteur émet `.racine.v-axe-valeur .nœud { … }` pour chaque nœud réglé. L'éditeur écrit ces styles par `site.set` sur `components.<i>.variantStyles.<clé>.<nœud>.<base|breakpoints…>`. Les styles de variante s'ajoutent au style normal du nœud, qui reste hérité.

### 6.1 Composants code

```ts
type CodeComponent = {
  id: Id;
  name: string;
  props: PropDef[];               // déclarés dans le source, extraits à la compilation
  source: string;                 // TSX
  build?: { hash: string; artifact: string; builtAt: string; errors?: string[] };
  render: "server" | "client";
  scope: "site" | "workspace";
};
```

## 7. Données

### 7.1 Bases de données

```ts
type Database = {
  id: Id;
  name: Localized<string>;
  slug: string;                   // "projets"
  fields: Field[];
  titleField: string;             // champ utilisé comme titre
  slugField?: string;
  pageTemplates?: { page: Id; slugPattern: string }[];   // "/projets/{slug}" (D24)
  external?: ExternalSource;      // base montée depuis Notion, Airtable, Supabase, REST (D25)
  structuredDataType?: "Article" | "Product" | "Event" | "Person" | "Organization" | "Place";
};

type Field = {
  name: string;                   // clé stable, "title"
  label: Localized<string>;
  type: "text" | "richtext" | "number" | "date" | "boolean" | "select" | "multiSelect"
      | "image" | "file" | "gallery" | "link" | "color" | "relation" | "backlink" | "formula"
      | "createdAt" | "updatedAt" | "position";
  required?: boolean;
  localized?: boolean;            // valeur par langue
  options?: { value: string; label: Localized<string>; color?: string }[];
  relation?: { database: Id; multiple: boolean; inverse?: string };
  formula?: string;
};
```

Les entrées vivent hors du document et hors de son journal : elles s'échangent par `GET`, `PUT { entries }` et `DELETE { ids }` sur `/api/sites/:id/entries` (schéma `entry`), sans annulation en v0. Les définitions de bases et de champs, elles, sont dans le document (`site.set` sur `databases`) et se retrouvent dans l'historique. Les entrées vivent en base de données (Postgres) sous forme `{ id, databaseId, values: Record<fieldName, unknown>, status: "draft" | "published", ... }`. Un champ `richtext` contient un tableau de `Node` (les mêmes nœuds que les pages, types autorisés : `text`, `list`, `image`, `video`, `divider`, `embed`, `link`).

### 7.2 Vues de collection

Un nœud `collection` porte :

```ts
type ViewConfig = {
  layout: "list" | "gallery" | "table" | "carousel" | "calendar" | "map";
  filter?: FilterExpr;            // combinaisons de { field, op, value | { param } | { page: "entry" } }
  sort?: { field: string; dir: "asc" | "desc" }[];
  limit?: number;
  pagination?: "none" | "pages" | "loadMore" | "infinite";
  columns?: { base: number; [breakpoint: string]: number };
  empty?: Node[];                 // contenu affiché sans résultat
};
```

Le rendu tire de la vue le CSS de disposition du nœud `collection` : `gallery` et `table` donnent une grille dont les colonnes suivent `columns` par point de rupture, `list` une colonne, `carousel` un défilement horizontal avec accroche (`columns` = éléments visibles). Ce CSS est émis avant le style propre du nœud, qui garde le dernier mot. `calendar` et `map` attendent leur rendu (v1). L'éditeur propose un filtre plat (conditions combinées par `and`) ; une expression plus riche reste valide et est conservée telle quelle.

L'enfant unique `item` est le modèle répété ; ses descendants lient les champs par `bindings: { "content": { source: "item", path: "title" } }`. Le rendu instancie l'`item` par entrée. Une vue par défaut est générée par le thème (D23) ; l'utilisateur peut la redessiner.

### 7.3 Liaisons

```ts
type Binding = {
  source: "item" | "entry" | "prop" | "page" | "site" | "param" | "state";
  path: string;                   // "title", "cover.url", "author.name" (relations traversées)
  transform?: { kind: "date"; format: string } | { kind: "number"; format: string } | { kind: "truncate"; length: number };
};
```

Dans l'éditeur, un élément (texte, image, lien) placé dans un modèle de page ou dans une vue propose un panneau « Données » qui pose ou retire ces liaisons ; la source (`entry` ou `item`) est déduite de la vue la plus proche qui contient l'élément, sinon du modèle de page (`dataSourceFor`). Un modèle de page se prévisualise avec une entrée publiée au choix. Une page devient modèle depuis ses réglages : elle prend `kind: "template"` et la base enregistre `pageTemplates`.

`entry` désigne l'entrée courante d'un modèle de page ; `item` l'élément courant d'une collection ; `prop` une propriété de composant ; `page` et `site` les métadonnées ; `param` un paramètre d'URL ; `state` une variable de page (D32).

## 8. Interactions et états

```ts
type Interaction = {
  id: Id;
  trigger: { kind: "click" | "hover" | "inView" | "scroll" | "load" | "change"; options?: Record<string, unknown> };
  actions: Action[];
  source?: SourceRef;             // interaction Figma d'origine (D27)
};

type Action =
  | { kind: "toggle" | "show" | "hide"; target: Target; transition?: Transition }
  | { kind: "setVariant"; target: Target; variant: { [axis: string]: string }; transition?: Transition }
  | { kind: "setStyle"; target: Target; style: StyleProps; transition?: Transition }
  | { kind: "setState"; name: string; value: unknown }
  | { kind: "navigate"; to: LinkTarget }
  | { kind: "openModal" | "closeModal"; target: Target }
  | { kind: "scrollTo"; target: Target }
  | { kind: "submit" }
  | { kind: "script"; code: Id };   // script d'interaction (D31)

type Target = { self: true } | { node: Id } | { component: Id } | { selector: string };
type Transition = { duration: number; delay?: number; easing: string; layout?: boolean };   // layout: animation de disposition (D33)
```

Variables de page :

```ts
type PageState = { [name: string]: { type: "boolean" | "number" | "text"; initial: unknown } };
```

Un nœud peut avoir `hidden` conditionnel via `bindings: { "visible": { source: "state", path: "menuOpen" } }`.

## 9. Opérations

Le document est modifié uniquement par des opérations. Chaque opération est sérialisable, appliquée de façon déterministe, et porte de quoi être inversée.

```ts
type Op =
  | { op: "node.insert"; parent: Id | { page: Id } | { component: Id } ; index: number; node: Node }
  | { op: "node.remove"; id: Id; /* inverse : */ prev?: { parent: Id; index: number; node: Node } }
  | { op: "node.move"; id: Id; to: { parent: Id; index: number }; prev?: { parent: Id; index: number } }
  | { op: "node.set"; id: Id; path: string; value: unknown; prev?: unknown }     // props.*, style.*, name, hidden…
  | { op: "node.replace"; id: Id; node: Node; prev?: Node }                         // détacher une instance, convertir un type
  | { op: "site.set"; path: string; value: unknown; prev?: unknown }               // theme.*, settings.*, sharedStyles.*, components.*, databases.*
  | { op: "batch"; ops: Op[]; label?: string };

type Change = { id: Id; ops: Op[]; author: Id; at: string; label?: string; version: number };
```

Règles :

- `path` est un chemin pointé (`props.alt.fr`, `style.base.gap`, `style.breakpoints.mobile.display`).
- L'application enregistre `prev` si absent, ce qui rend l'inversion possible sans relire l'état précédent.
- `batch` groupe une action utilisateur (une seule entrée d'annulation).
- Le numéro de `version` est monotone par site ; c'est la base de la détection de conflit et, plus tard, du temps réel (D52).
- Un instantané (`Site` complet, avec les entrées) est calculé et stocké à chaque publication (D36) et périodiquement. Le site publié est servi depuis l'instantané désigné comme publié, jamais depuis le document de travail ; le retour arrière change seulement cette désignation (`docs/publication.md`). `settings.subdomain` donne l'adresse `<subdomain>.<domaine d'Atelier>`.

## 10. Pages et site

```ts
type Page = {
  id: Id;
  name: Localized<string>;
  path: string;                   // "/", "/a-propos", "/projets/{slug}" pour un modèle
  kind: "static" | "template";    // template : lié à une base via Database.pageTemplates
  root: Node;                     // box racine
  seo?: PageSeo;                  // titre, description, image, index, canonical ; composables avec {champ}
  state?: PageState;
  locales?: Locale[];             // sous-ensemble si la page n'existe pas dans toutes les langues
  source?: SourceRef;
};

type Site = {
  schemaVersion: 1;
  id: Id;
  name: string;
  settings: {
    defaultLocale: Locale; locales: Locale[];
    breakpoints: Breakpoint[];
    layoutGrid?: { columns: number; gutter: StyleValue; margin: StyleValue; maxWidth?: StyleValue; byBreakpoint?: { [bp: string]: { columns?: number; gutter?: StyleValue; margin?: StyleValue } } };   // guide de colonnes du designer, fluide par point de rupture
    seo: SiteSeo;                 // valeurs par défaut, réseaux sociaux, favicon
    head?: string; bodyEnd?: string;   // code injecté (D40)
  };
  theme: Theme;
  sharedStyles: SharedStyle[];
  components: ComponentDef[];
  codeComponents: CodeComponent[];
  databases: Database[];
  pages: Page[];
  assets: Asset[];
  redirects: { from: string; to: string; permanent: boolean }[];
};
```

Les `Asset` référencent un fichier stocké (`{ id, kind: "image" | "video" | "file", url, width, height, name?, alt?: Localized<string>, mime?, variants?, source? }`). `name` est le nom lisible (le nom du fichier à l'import, modifiable), `createdAt` la date d'ajout. `alt` est le texte alternatif porté par la ressource : un élément image sans `alt` propre l'utilise, un `alt` sur l'élément le surcharge. `variants` liste les déclinaisons optimisées produites à l'import (D37) : `{ width, height?, url, format }`, du plus petit au plus grand ; le rendu en fait un `srcset`, `url` reste l'original. Les fichiers eux-mêmes vivent dans le stockage (dossier `.atelier-data/assets` en développement, Supabase Storage sinon), jamais dans le document.

## 11. Ce que le rendu fait du modèle

- Chaque nœud produit un élément HTML avec l'attribut `data-node` (dans l'éditeur seulement) et une classe stable `n-<id>`.
- Le CSS est généré par nœud à partir de la cascade (5.1) : styles partagés en classes `s-<id>`, styles locaux en classes par nœud, points de rupture en `@media (max-width)`, états en pseudo-classes ou en attributs `data-state`.
- Les jetons deviennent des variables CSS sur `:root` et par mode.
- Un `divider` n'a pas d'orientation propre : le CSS du conteneur (nœud ou style partagé) le rend vertical quand ce conteneur dispose ses enfants côte à côte (flex en ligne, grille à plusieurs colonnes) et horizontal sinon, point de rupture par point de rupture. Un réglage de bordure posé sur le séparateur lui-même en Design reste possible mais le conteneur a le dernier mot sur l'orientation.
- Les liaisons sont résolues au rendu à partir d'un contexte `{ site, page, entry?, item?, props?, params, locale, state }`.
- Le même moteur sert l'éditeur (dans une iframe, D16), le site publié et l'export (D15). L'export émet des composants nommés d'après `name`.

## 12. Exemple minimal

```json
{
  "id": "hero", "type": "box", "name": "Héros",
  "props": { "tag": "section" },
  "style": {
    "shared": ["st_section"],
    "base": { "display": "flex", "flexDirection": "column", "gap": { "token": "space.6" }, "alignItems": "center" },
    "breakpoints": { "mobile": { "gap": { "token": "space.4" } } }
  },
  "children": [
    { "id": "t1", "type": "text", "name": "Titre", "props": { "tag": "h1", "content": { "fr": [ { "t": "text", "v": "Marie Lambert, photographe" } ] } } },
    { "id": "b1", "type": "link", "name": "Bouton contact", "props": { "tag": "a", "href": { "kind": "page", "page": "p_contact" } },
      "style": { "shared": ["st_button"] },
      "children": [ { "id": "b1t", "type": "text", "props": { "tag": "span", "content": { "fr": [ { "t": "text", "v": "Me contacter" } ] } } } ] }
  ]
}
```

## 13. Hors du modèle

Volontairement absents : le contenu des entrées, les fichiers, les envois de formulaires, les utilisateurs et rôles, les versions publiées (qui sont des instantanés de `Site`), la configuration d'hébergement. Ils vivent dans la base de données de la plateforme et sont référencés par identifiant.

## 14. Évolutions prévues

- v1 : `minWidth` sur les points de rupture, `pageTemplates` multiples, champs SEO composables, redirections importées, `source` Figma sur tous les objets.
- v2 : `codeComponents` avec `build`, scripts d'interaction, timeline optionnelle (`Interaction.sequence`), variables de thème par composant, `external` sur les bases.
- Toute évolution incrémente `schemaVersion` avec une migration dans `@atelier/model/migrations`.
