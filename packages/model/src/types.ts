/**
 * Modèle de document Atelier — types TypeScript.
 * Référence : docs/document-model.md (schemaVersion 1).
 */

export type Id = string;
export type Locale = string;
export type Localized<T> = { [locale: Locale]: T };

export type SourceRef = {
  kind: "figma" | "import" | "ai" | "template";
  ref: string;
  fileId?: string;
  syncedAt?: string;
};

// ---------------------------------------------------------------- Liens

export type LinkTarget =
  | { kind: "url"; url: string }
  | { kind: "page"; page: Id; anchor?: string }
  | { kind: "entry"; database: Id; entry: Id }
  | { kind: "asset"; asset: Id }
  | { kind: "email"; to: string }
  | { kind: "phone"; number: string }
  | { kind: "anchor"; node: Id };

// ---------------------------------------------------------------- Style

export type Gradient = {
  type: "linear" | "radial";
  angle?: number;
  stops: { color: StyleValue; at: string }[];
};

export type StyleValue =
  | string
  | number
  | { token: string }
  | { calc: string }
  | { image: Id; size?: string; position?: string; repeat?: string }
  | { gradient: Gradient };

export type StyleProps = { [property: string]: StyleValue };

export type StyleSet = {
  shared?: Id[];
  base?: StyleProps;
  breakpoints?: { [breakpoint: string]: StyleProps };
  states?: { [state: string]: StyleProps };
  stateBreakpoints?: { [state: string]: { [breakpoint: string]: StyleProps } };
};

export type SharedStyle = {
  id: Id;
  name: string;
  extends?: Id;
  style: Omit<StyleSet, "shared">;
  appliesTo?: NodeType[];
  source?: SourceRef;
};

export type Breakpoint = { id: string; name: string; maxWidth: number };

export type TokenValue = string | { [mode: string]: string };
export type TokenGroup = { [name: string]: TokenValue };

export type FontFace = {
  family: string;
  provider: "google" | "file" | "system";
  weights?: number[];
  files?: { weight: number; style: "normal" | "italic"; asset: Id }[];
  fallback: string;
};

export type Theme = {
  tokens: {
    color: TokenGroup;
    font: TokenGroup;
    fontSize: TokenGroup;
    lineHeight: TokenGroup;
    space: TokenGroup;
    radius: TokenGroup;
    shadow: TokenGroup;
    width: TokenGroup;
  };
  modes: { id: string; name: string }[];
  defaultMode: string;
  typeDefaults: { [nodeTypeOrTag: string]: StyleProps };
  fonts: FontFace[];
};

// ---------------------------------------------------------------- Données

export type Binding = {
  source: "item" | "entry" | "prop" | "page" | "site" | "param" | "state";
  path: string;
  transform?:
    | { kind: "date"; format: string }
    | { kind: "number"; format: string }
    | { kind: "truncate"; length: number };
};

export type FieldType =
  | "text" | "richtext" | "number" | "date" | "boolean" | "select" | "multiSelect"
  | "image" | "file" | "gallery" | "link" | "color" | "relation" | "backlink" | "formula"
  | "createdAt" | "updatedAt" | "position";

export type Field = {
  name: string;
  label: Localized<string>;
  type: FieldType;
  required?: boolean;
  localized?: boolean;
  options?: { value: string; label: Localized<string>; color?: string }[];
  relation?: { database: Id; multiple: boolean; inverse?: string };
  formula?: string;
};

export type ExternalSource =
  | { kind: "notion"; databaseId: string }
  | { kind: "airtable"; baseId: string; tableId: string }
  | { kind: "supabase"; table: string }
  | { kind: "rest"; url: string; itemsPath?: string };

export type Database = {
  id: Id;
  name: Localized<string>;
  slug: string;
  fields: Field[];
  titleField: string;
  slugField?: string;
  pageTemplates?: { page: Id; slugPattern: string }[];
  external?: ExternalSource;
  structuredDataType?: "Article" | "Product" | "Event" | "Person" | "Organization" | "Place";
};

export type FilterValue = unknown | { param: string } | { page: "entry" } | { state: string };
export type FilterExpr =
  | { field: string; op: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in" | "isEmpty" | "isNotEmpty"; value?: FilterValue }
  | { and: FilterExpr[] }
  | { or: FilterExpr[] };

export type ViewConfig = {
  layout: "list" | "gallery" | "table" | "carousel" | "calendar" | "map";
  filter?: FilterExpr;
  sort?: { field: string; dir: "asc" | "desc" }[];
  limit?: number;
  pagination?: "none" | "pages" | "loadMore" | "infinite";
  columns?: { base: number; [breakpoint: string]: number };
  empty?: Node[];
};

/** Une entrée de base de données (hors document, référencée par identifiant). */
export type Entry = {
  id: Id;
  database: Id;
  status: "draft" | "published";
  values: { [field: string]: unknown };
  createdAt: string;
  updatedAt: string;
};

// ---------------------------------------------------------------- Interactions

export type Target = { self: true } | { node: Id } | { component: Id } | { selector: string };
export type Transition = { duration: number; delay?: number; easing: string; layout?: boolean };

export type Action =
  | { kind: "toggle" | "show" | "hide"; target: Target; transition?: Transition }
  | { kind: "setVariant"; target: Target; variant: { [axis: string]: string }; transition?: Transition }
  | { kind: "setStyle"; target: Target; style: StyleProps; transition?: Transition }
  | { kind: "setState"; name: string; value: unknown }
  | { kind: "navigate"; to: LinkTarget }
  | { kind: "openModal" | "closeModal"; target: Target }
  | { kind: "scrollTo"; target: Target }
  | { kind: "submit" }
  | { kind: "script"; code: Id };

export type Interaction = {
  id: Id;
  trigger: { kind: "click" | "hover" | "inView" | "scroll" | "load" | "change"; options?: Record<string, unknown> };
  actions: Action[];
  source?: SourceRef;
};

export type PageState = { [name: string]: { type: "boolean" | "number" | "text"; initial: unknown } };

// ---------------------------------------------------------------- Nœuds

export type NodeType =
  | "box" | "text" | "list" | "listItem" | "image" | "video" | "link" | "icon" | "divider"
  | "embed" | "form" | "field" | "collection" | "item" | "instance" | "slot" | "code";

export const NODE_TYPES: readonly NodeType[] = [
  "box", "text", "list", "listItem", "image", "video", "link", "icon", "divider",
  "embed", "form", "field", "collection", "item", "instance", "slot", "code",
];

/** Types de nœuds qui acceptent des enfants. */
export const CONTAINER_TYPES: ReadonlySet<NodeType> = new Set<NodeType>([
  "box", "list", "listItem", "link", "form", "collection", "item", "slot",
]);

export type Mark = "bold" | "italic" | "underline" | "strike" | "code" | { color: StyleValue };

export type Inline =
  | { t: "text"; v: string; marks?: Mark[] }
  | { t: "break" }
  | { t: "link"; href: LinkTarget; newTab?: boolean; children: Inline[] }
  | { t: "bind"; binding: Binding; marks?: Mark[] };

export type PropValue = unknown;

export type InstanceProps = {
  component: Id;
  variant?: { [axis: string]: string };
  values?: { [prop: string]: PropValue };
  overrides?: { [nodeId: Id]: { props?: Record<string, PropValue>; style?: StyleSet; hidden?: { [bp: string]: boolean } } };
  slots?: { [slot: string]: Node[] };
};

export type Node = {
  id: Id;
  type: NodeType;
  name?: string;
  props: Record<string, PropValue>;
  style?: StyleSet;
  children?: Node[];
  bindings?: Record<string, Binding>;
  interactions?: Interaction[];
  locked?: boolean;
  hidden?: { [breakpoint: string]: boolean };
  source?: SourceRef;
  meta?: Record<string, unknown>;
};

// ---------------------------------------------------------------- Composants

export type PropDef = {
  name: string;
  label: Localized<string>;
  type: "text" | "richtext" | "number" | "boolean" | "image" | "link" | "select" | "color" | "entry" | "node";
  default?: PropValue;
  options?: string[];
  database?: Id;
};

export type VariantAxis = { name: string; values: string[]; default: string };

export type ComponentDef = {
  id: Id;
  name: string;
  description?: string;
  props: PropDef[];
  variants?: VariantAxis[];
  root: Node;
  variantStyles?: { [variantKey: string]: { [nodeId: Id]: StyleSet } };
  source?: SourceRef;
  scope: "site" | "workspace";
};

export type CodeComponent = {
  id: Id;
  name: string;
  props: PropDef[];
  source: string;
  build?: { hash: string; artifact: string; builtAt: string; errors?: string[] };
  render: "server" | "client";
  scope: "site" | "workspace";
};

// ---------------------------------------------------------------- Pages et site

export type PageSeo = {
  title?: Localized<string>;
  description?: Localized<string>;
  image?: Id;
  index?: boolean;
  canonical?: string;
};

export type SiteSeo = {
  titleSuffix?: Localized<string>;
  description?: Localized<string>;
  image?: Id;
  favicon?: Id;
  social?: { [network: string]: string };
};

export type Page = {
  id: Id;
  name: Localized<string>;
  path: string;
  kind: "static" | "template";
  root: Node;
  seo?: PageSeo;
  state?: PageState;
  locales?: Locale[];
  source?: SourceRef;
};

export type Asset = {
  id: Id;
  kind: "image" | "video" | "file";
  url: string;
  width?: number;
  height?: number;
  alt?: Localized<string>;
  mime?: string;
  source?: SourceRef;
};

export type Redirect = { from: string; to: string; permanent: boolean };

export type SiteSettings = {
  defaultLocale: Locale;
  locales: Locale[];
  breakpoints: Breakpoint[];
  seo: SiteSeo;
  head?: string;
  bodyEnd?: string;
};

export type Site = {
  schemaVersion: 1;
  id: Id;
  name: string;
  settings: SiteSettings;
  theme: Theme;
  sharedStyles: SharedStyle[];
  components: ComponentDef[];
  codeComponents: CodeComponent[];
  databases: Database[];
  pages: Page[];
  assets: Asset[];
  redirects: Redirect[];
};

// ---------------------------------------------------------------- Opérations

/** Où vit un nœud racine : dans une page ou dans un composant. */
export type RootOwner = { page: Id } | { component: Id };

export type Op =
  | { op: "node.insert"; parent: Id; index: number; node: Node }
  | { op: "node.remove"; id: Id; prev?: { parent: Id; index: number; node: Node } }
  | { op: "node.move"; id: Id; to: { parent: Id; index: number }; prev?: { parent: Id; index: number } }
  | { op: "node.set"; id: Id; path: string; value: unknown; prev?: unknown }
  | { op: "node.replace"; id: Id; node: Node; prev?: Node }
  | { op: "site.set"; path: string; value: unknown; prev?: unknown }
  | { op: "batch"; ops: Op[]; label?: string };

export type Change = {
  id: Id;
  ops: Op[];
  author: Id;
  at: string;
  label?: string;
  version: number;
};
