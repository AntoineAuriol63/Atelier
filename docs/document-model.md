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
| `box` | Boîte générique : section, conteneur, colonne, carte | oui | `tag` (`div`, `section`, `header`, `footer`, `nav`, `article`, `aside`, `main`, `figure`), `marquee?: { duration: number; direction?: "left" | "right" | "up" | "down"; pauseOnHover?: boolean }` (bandeau défilant : durée d'un tour en secondes, sens, pause au survol ; un nombre seul, ancienne forme, vaut `{ duration }`) |
| `text` | Un bloc de texte : paragraphe, titre, citation | non | `tag` (`p`, `h1`…`h6`, `blockquote`, `span`, `label`), `content: Localized<Inline[]>`, `countUp?: boolean` (le nombre du texte compte de 0 à sa valeur à l'entrée dans l'écran) |
| `list` | Liste | `listItem` | `ordered: boolean` |
| `listItem` | Élément de liste | oui | — |
| `image` | Image | non | `asset: Id \| null`, `alt: Localized<string>`, `fit`, `ratio`, `priority` |
| `video` | Vidéo hébergée ou intégrée | non | `asset \| url`, `autoplay`, `loop`, `muted`, `controls` |
| `link` | Lien ou bouton | oui | `href: LinkTarget`, `newTab`, `tag` (`a`, `button`) |
| `icon` | Icône vectorielle | non | `name` ou `svg` |
| `divider` | Séparateur : trait horizontal dans une colonne, vertical dans une rangée (décidé par le conteneur, section 11) | non | — |
| `embed` | HTML intégré (widget tiers) | non | `html: string` |
| `form` | Formulaire (envois : `docs/formulaires.md`) | oui | `formId: Id`, `successMessage: Localized<string>`, `successAction`, `notifyTo` (destinataires, séparés par des virgules) |
| `field` | Champ de formulaire | non | `fieldType`, `name`, `label`, `required`, `options` |
| `collection` | Vue de base de données (section 7) | `item` | `database: Id`, `view: ViewConfig` |
| `item` | Modèle de l'élément répété d'une `collection` | oui | — |
| `instance` | Instance d'un composant (section 6) | non (via `slots`) | `component: Id`, `variant`, `props`, `slots` |
| `slot` | Emplacement dans la définition d'un composant | oui (contenu par défaut) | `name` |
| `code` | Instance d'un composant code (D14, D41) | non | `component: Id`, `props` |

Propriétés communes à tout nœud (dans `props`) : `anchor?: string` (identifiant d'ancre, rendu en attribut `id` ; un lien `{ kind: "anchor", node }` ou l'adresse `#…` y mène, et `html { scroll-behavior: smooth }` adoucit le défilement) et `parallax?: number` (l'élément se déplace au défilement à `parallax` fois l'écart au centre de l'écran : 0,15 léger, 0,3 marqué, négatif = plus vite que la page ; joué par le script du site, jamais dans l'éditeur, désactivé avec « réduire les animations »). Le rendu de `marquee` duplique les enfants dans une piste (`.at-marquee-track`, copie `aria-hidden`) animée en CSS, en pause au survol.

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
  autoplay?: number;              // carrousel : passe à la carte suivante toutes les N secondes (pause au survol et au toucher)
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

Conventions d'édition (éditeur) : dupliquer un sous-arbre (`cloneWithNewIds`) réécrit les cibles `target.node` des interactions qui visent un nœud du sous-arbre copié, pour qu'une question dupliquée ouvre sa propre réponse. Placement d'un nouveau bloc (`planInsert`) : sans sélection, à la fin de la page mais avant l'instance « Pied de page » ; une section (`box` à `tag: section`) se pose toujours au niveau de la page, après la région qui contient la sélection ; rien ne se pose dans un lien ni dans le pied de page (après, à côté) ; un conteneur sélectionné reçoit le bloc à sa fin, une feuille le reçoit après elle.

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

Mise en œuvre (9 septembre 2026, première tranche) : le moteur émet sur chaque nœud qui en a un attribut `data-ix` (déclencheur, options, actions avec cibles résolues en sélecteurs) et un script (`INTERACTION_SCRIPT`) qui joue `inView` (IntersectionObserver, une fois ou à chaque passage avec `options.once: false`), `click`, `hover` (annulé à la sortie), `load` ; actions `setStyle` (transition CSS), `show` / `hide` / `toggle` (attribut `data-ix-hidden`), `setVariant` (classes `v-<axe>-<valeur>` sur la racine du composant), `navigate`, `scrollTo`. Non rendus pour l'instant : `scroll`, `change`, `setState`, `openModal`, `submit`, `script`. Conventions de l'éditeur (`packages/model/src/interactions.ts`) : une **apparition** est une interaction `inView` avec `options.reveal` (`fade`, `fade-up`, `fade-down`, `slide-left`, `slide-right`, `zoom`, `blur`), dont l'état de départ vit dans `style.base` du nœud ; un élément **masqué au chargement** porte `load` → `hide` sur lui-même. Dans l'éditeur (`.at-page[data-editor]`) et avec « réduire les animations », l'état d'arrivée est posé sans transition et les clics sont ignorés.

Variables de page :

```ts
type PageState = { [name: string]: { type: "boolean" | "number" | "text"; initial: unknown } };
```

Un nœud peut avoir `hidden` conditionnel via `bindings: { "visible": { source: "state", path: "menuOpen" } }`.

### 8.4 Animations

Cadrage : `docs/cadrage-animation.md`. Une **animation** est une ligne de temps nommée, rangée dans le site, faite de **pistes** (une par élément animé) portant des **images-clés** en millisecondes. Un **déclencheur**, posé sur un élément ou sur une page, lance une animation. Une animation peut être lancée par plusieurs déclencheurs ; un élément peut porter plusieurs déclencheurs.

```ts
type Keyframe = { at: number; style: StyleProps; easing?: string };   // at en ms ; easing : courbe pour atteindre cette image depuis la précédente (CSS, ou spring(raideur, amortissement))
type TrackTarget =
  | { trigger: true; children?: true; split?: "words" | "letters" }   // l'élément qui porte le déclencheur (relatif), ou ses enfants directs (les cartes d'une vue), ou ses mots / lettres
  | { node: Id; children?: true; split?: "words" | "letters" }        // un élément précis de la page
  | { selector: string };                                             // libre, joué par le script seulement
type Track = { id: Id; target: TrackTarget; stagger?: { each: number; from?: "start" | "end" | "center" }; keyframes: Keyframe[] };
type Animation = {
  id: Id; name: string;
  duration: number;                          // ms : longueur de la ligne de temps (au moins la dernière image-clé)
  tracks: Track[];
  loop?: number | "infinite";                // rejouer N fois ou sans fin (défaut : une fois)
  alternate?: boolean;                       // en boucle : aller-retour
  preset?: string;                           // préréglage d'origine, pour l'interface
};
type Trigger = {
  id: Id;
  on: "load" | "inView" | "hover" | "click" | "scroll" | "pointer";
  animation: Id;
  delay?: number;                            // ms
  once?: boolean;                            // inView : une fois (défaut) ou à chaque passage
  reverseOnLeave?: boolean;                  // hover : revient en arrière au départ de la souris
  toggle?: boolean;                          // click : un clic sur deux rembobine
  range?: [number, number];                  // scroll : part de la traversée de l'écran qui parcourt la ligne de temps (défaut [0, 1])
  axis?: "x" | "y";                          // pointer : la position de la souris parcourt la ligne de temps (défaut y)
  pauseOnHover?: boolean;
};
Node.triggers?: Trigger[];
Page.triggers?: Trigger[];                   // déclencheurs de page : l'élément porteur est la racine de la page
Site.animations: Animation[];
```

Règles :

- Une image-clé ne contient que les propriétés qui changent ; la première image-clé d'une piste peut être vide (elle vaut l'état de repos). Une piste a au moins deux images-clés pour être rendue. `at` est en millisecondes ; une piste va de sa première à sa dernière image-clé (sa **portée**), et la ligne de temps de l'animation les contient toutes.
- En attendant sa portée, l'élément montre la première image ; après, il reste sur la dernière (remplissage `both`, sans réglage). Une apparition finit donc par l'état de repos, et un survol reste grossi tant que la souris est là.
- Les cibles relatives (`trigger`) rendent une animation réutilisable sur d'autres éléments et d'autres pages, et sont les seules que porte un préréglage ; une cible `node` attache l'animation à une page. `children` vise les enfants directs (pour une vue, ses cartes), `split` les mots ou les lettres d'un texte.
- Décalage (`stagger`) : quand la piste vise plusieurs éléments, chacun part `each` ms plus tard par rang, compté depuis le début (`start`, défaut), la fin (`end`) ou le centre (`center` : `|i − (n − 1) / 2|`).
- Les interactions d'état (afficher, masquer, changer de variante) restent dans `Node.interactions` ; le bandeau (`props.marquee: { duration, direction: "left" | "right" | "up" | "down", pauseOnHover }`), la parallaxe (`props.parallax`) et le compteur (`props.countUp`) restent des propriétés.

Rendu (`packages/renderer`) : chaque piste de chaque animation devient un bloc `@keyframes at-<animation>-<piste>` (positions en % de sa portée, courbe d'un segment posée en `animation-timing-function` sur l'image qui l'ouvre, ressort échantillonné en `linear(…)` sur la durée du segment). Pour chaque déclencheur, la règle est émise sur la cible résolue (`.n-hôte`, `.n-hôte>*`, `.n-hôte .at-piece`, `.n-cible`, `.at-page:has(.n-hôte:hover) .n-cible` au survol d'un autre élément) : `animation: at-… <portée>ms … <délai + début de portée>ms <répétitions> <sens> both`, avec `animation-delay` en `calc()` et `--at-i`/`--at-n` sur les éléments quand il y a décalage. `load` et `hover` sans retour sont en CSS pur ; `inView` est en pause (`animation-play-state: paused`) jusqu'au script ; `click`, `scroll` (la position de défilement parcourt la ligne de temps), `pointer` (la souris la parcourt), le retour au départ de la souris (`reverse()`), la bascule au clic, et toute piste à sélecteur libre sont joués par le script avec l'API Web Animations, qui lit `data-anim` (déclencheurs et pistes recopiés, déclarations résolues). Les éléments animés qui ne sont pas le porteur reçoivent `data-anim-target` ; les règles « rien dans l'éditeur » (`.at-page[data-editor]`), « réduire les animations » et `<noscript>` s'appuient sur `[data-anim]` et `[data-anim-target]`. Un texte découpé se rend en `<span class="at-piece">` par mot, ou par lettre dans un `<span class="at-word">` par mot ; espaces hors des morceaux, marques conservées, `aria-label` en lettres ; un texte lié à un champ « texte long » ne se découpe pas. Dans l'éditeur, aucune animation ne joue d'elle-même : le mode Animation montre l'état à la tête de lecture, « Jouer » rejoue une animation sur ses cibles. Une animation ne pose rien dans `style` : la retirer laisse l'élément tel quel.

Migration 2 → 3 : chaque ancien `AnimationRun` d'un nœud devient une animation du site (images-clés de % en ms sur la durée du run, courbe du run posée sur chaque segment, `iterations` → `loop`, `direction` alternée → `alternate`, cible et découpage → cible de piste relative, décalage conservé) et un déclencheur sur le nœud (même identifiant que le run) ; un run qui renvoyait à la bibliothèque reçoit sa propre copie, nommée comme l'entrée de bibliothèque, et la bibliothèque d'avant disparaît. Migration 1 → 2 (inchangée) : les apparitions écrites en interactions deviennent des runs, puis passent par 2 → 3.

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
  triggers?: Trigger[];           // déclencheurs de page (section 8.4)
  source?: SourceRef;
};

type Site = {
  schemaVersion: 3;
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
  animations: Animation[];      // lignes de temps du site (section 8.4)
  assets: Asset[];
  redirects: { from: string; to: string; permanent: boolean }[];   // `from` exact ou préfixe `/dossier/*`, `to` chemin ou adresse, `*` reprend le reste (D39)
};
```

Conventions du site publié : une page fixe à l'adresse `/404` est la page « introuvable » (servie avec le statut 404, non indexée, exportée aussi en `404.html`). `settings.head` et `settings.bodyEnd` sont insérés tels quels dans le document HTML (D40) ; un formulaire peut porter `props.notifyTo` (destinataires de la notification, à défaut `FORM_NOTIFY_TO`).

Les `Asset` référencent un fichier stocké (`{ id, kind: "image" | "video" | "file", url, width, height, name?, alt?: Localized<string>, mime?, variants?, source? }`). `name` est le nom lisible (le nom du fichier à l'import, modifiable), `createdAt` la date d'ajout. `alt` est le texte alternatif porté par la ressource : un élément image sans `alt` propre l'utilise, un `alt` sur l'élément le surcharge. `variants` liste les déclinaisons optimisées produites à l'import (D37) : `{ width, height?, url, format }`, du plus petit au plus grand ; le rendu en fait un `srcset`, `url` reste l'original. Les fichiers eux-mêmes vivent dans le stockage (dossier `.atelier-data/assets` en développement, Supabase Storage sinon), jamais dans le document.

## 11. Ce que le rendu fait du modèle

- Chaque nœud produit un élément HTML avec l'attribut `data-node` (dans l'éditeur seulement) et une classe stable `n-<id>`.
- Le CSS est généré par nœud à partir de la cascade (5.1) : styles partagés en classes `s-<id>`, styles locaux en classes par nœud, points de rupture en `@media (max-width)`, états en pseudo-classes ou en attributs `data-state`.
- Les jetons deviennent des variables CSS sur `:root` et par mode.
- Un `divider` n'a pas d'orientation propre : le CSS du conteneur (nœud ou style partagé) le rend vertical quand ce conteneur dispose ses enfants côte à côte (flex en ligne, grille à plusieurs colonnes) et horizontal sinon, point de rupture par point de rupture. Un réglage de bordure posé sur le séparateur lui-même en Design reste possible mais le conteneur a le dernier mot sur l'orientation.
- Les liaisons sont résolues au rendu à partir d'un contexte `{ site, page, entry?, item?, props?, params, locale, state }`.
- Le même moteur sert l'éditeur (dans une iframe, D16), le site publié et l'export (D15). Les variables CSS `--color-*`, `--font-*`, `--space-*`… du thème sont un espace de noms réservé au site : rien de l'éditeur ne doit poser une variable de ce nom dans le document rendu. L'export émet des composants nommés d'après `name`.

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
