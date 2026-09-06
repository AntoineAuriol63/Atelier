import { z } from "zod";
import { NODE_TYPES } from "./types";
import { ID_PATTERN } from "./ids";

const id = z.string().regex(ID_PATTERN, "identifiant invalide");
const locale = z.string().min(2);
const localized = <T extends z.ZodTypeAny>(t: T) => z.record(locale, t);

const sourceRef = z.object({
  kind: z.enum(["figma", "import", "ai", "template"]),
  ref: z.string(),
  fileId: z.string().optional(),
  syncedAt: z.string().optional(),
});

export const linkTarget = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("url"), url: z.string() }),
  z.object({ kind: z.literal("page"), page: id, anchor: z.string().optional() }),
  z.object({ kind: z.literal("entry"), database: id, entry: id }),
  z.object({ kind: z.literal("asset"), asset: id }),
  z.object({ kind: z.literal("email"), to: z.string() }),
  z.object({ kind: z.literal("phone"), number: z.string() }),
  z.object({ kind: z.literal("anchor"), node: id }),
]);

const styleValue: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.object({ token: z.string() }),
    z.object({ calc: z.string() }),
    z.object({ image: id, size: z.string().optional(), position: z.string().optional(), repeat: z.string().optional() }),
    z.object({ gradient: z.object({ type: z.enum(["linear", "radial"]), angle: z.number().optional(), stops: z.array(z.object({ color: styleValue, at: z.string() })) }) }),
  ]),
);

const styleProps = z.record(z.string(), styleValue);

export const styleSet = z.object({
  shared: z.array(id).optional(),
  base: styleProps.optional(),
  breakpoints: z.record(z.string(), styleProps).optional(),
  states: z.record(z.string(), styleProps).optional(),
  stateBreakpoints: z.record(z.string(), z.record(z.string(), styleProps)).optional(),
});

export const binding = z.object({
  source: z.enum(["item", "entry", "prop", "page", "site", "param", "state"]),
  path: z.string(),
  transform: z.union([
    z.object({ kind: z.literal("date"), format: z.string() }),
    z.object({ kind: z.literal("number"), format: z.string() }),
    z.object({ kind: z.literal("truncate"), length: z.number() }),
  ]).optional(),
});

const target = z.union([
  z.object({ self: z.literal(true) }),
  z.object({ node: id }),
  z.object({ component: id }),
  z.object({ selector: z.string() }),
]);
const transition = z.object({ duration: z.number(), delay: z.number().optional(), easing: z.string(), layout: z.boolean().optional() });

const action = z.union([
  z.object({ kind: z.enum(["toggle", "show", "hide"]), target, transition: transition.optional() }),
  z.object({ kind: z.literal("setVariant"), target, variant: z.record(z.string(), z.string()), transition: transition.optional() }),
  z.object({ kind: z.literal("setStyle"), target, style: styleProps, transition: transition.optional() }),
  z.object({ kind: z.literal("setState"), name: z.string(), value: z.unknown() }),
  z.object({ kind: z.literal("navigate"), to: linkTarget }),
  z.object({ kind: z.enum(["openModal", "closeModal"]), target }),
  z.object({ kind: z.literal("scrollTo"), target }),
  z.object({ kind: z.literal("submit") }),
  z.object({ kind: z.literal("script"), code: id }),
]);

export const interaction = z.object({
  id,
  trigger: z.object({ kind: z.enum(["click", "hover", "inView", "scroll", "load", "change"]), options: z.record(z.string(), z.unknown()).optional() }),
  actions: z.array(action),
  source: sourceRef.optional(),
});

export const node: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    id,
    type: z.enum(NODE_TYPES as unknown as [string, ...string[]]),
    name: z.string().optional(),
    props: z.record(z.string(), z.unknown()),
    style: styleSet.optional(),
    children: z.array(node).optional(),
    bindings: z.record(z.string(), binding).optional(),
    interactions: z.array(interaction).optional(),
    locked: z.boolean().optional(),
    hidden: z.record(z.string(), z.boolean()).optional(),
    source: sourceRef.optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
);

const tokenValue = z.union([z.string(), z.record(z.string(), z.string())]);
const tokenGroup = z.record(z.string(), tokenValue);

export const theme = z.object({
  tokens: z.object({
    color: tokenGroup, font: tokenGroup, fontSize: tokenGroup, lineHeight: tokenGroup,
    space: tokenGroup, radius: tokenGroup, shadow: tokenGroup, width: tokenGroup,
  }),
  modes: z.array(z.object({ id: z.string(), name: z.string() })),
  defaultMode: z.string(),
  typeDefaults: z.record(z.string(), styleProps),
  fonts: z.array(z.object({
    family: z.string(),
    provider: z.enum(["google", "file", "system"]),
    weights: z.array(z.number()).optional(),
    files: z.array(z.object({ weight: z.number(), style: z.enum(["normal", "italic"]), asset: id })).optional(),
    fallback: z.string(),
  })),
});

export const sharedStyle = z.object({
  id,
  name: z.string(),
  extends: id.optional(),
  style: styleSet.omit({ shared: true }),
  appliesTo: z.array(z.enum(NODE_TYPES as unknown as [string, ...string[]])).optional(),
  source: sourceRef.optional(),
});

const propDef = z.object({
  name: z.string(),
  label: localized(z.string()),
  type: z.enum(["text", "richtext", "number", "boolean", "image", "link", "select", "color", "entry", "node"]),
  default: z.unknown().optional(),
  options: z.array(z.string()).optional(),
  database: id.optional(),
});

export const componentDef = z.object({
  id,
  name: z.string(),
  description: z.string().optional(),
  props: z.array(propDef),
  variants: z.array(z.object({ name: z.string(), values: z.array(z.string()), default: z.string() })).optional(),
  root: node,
  variantStyles: z.record(z.string(), z.record(z.string(), styleSet)).optional(),
  source: sourceRef.optional(),
  scope: z.enum(["site", "workspace"]),
});

export const codeComponent = z.object({
  id,
  name: z.string(),
  props: z.array(propDef),
  source: z.string(),
  build: z.object({ hash: z.string(), artifact: z.string(), builtAt: z.string(), errors: z.array(z.string()).optional() }).optional(),
  render: z.enum(["server", "client"]),
  scope: z.enum(["site", "workspace"]),
});

const field = z.object({
  name: z.string(),
  label: localized(z.string()),
  type: z.enum(["text", "richtext", "number", "date", "boolean", "select", "multiSelect", "image", "file", "gallery", "link", "color", "relation", "backlink", "formula", "createdAt", "updatedAt", "position"]),
  required: z.boolean().optional(),
  localized: z.boolean().optional(),
  options: z.array(z.object({ value: z.string(), label: localized(z.string()), color: z.string().optional() })).optional(),
  relation: z.object({ database: id, multiple: z.boolean(), inverse: z.string().optional() }).optional(),
  formula: z.string().optional(),
});

export const database = z.object({
  id,
  name: localized(z.string()),
  slug: z.string(),
  fields: z.array(field),
  titleField: z.string(),
  slugField: z.string().optional(),
  pageTemplates: z.array(z.object({ page: id, slugPattern: z.string() })).optional(),
  external: z.union([
    z.object({ kind: z.literal("notion"), databaseId: z.string() }),
    z.object({ kind: z.literal("airtable"), baseId: z.string(), tableId: z.string() }),
    z.object({ kind: z.literal("supabase"), table: z.string() }),
    z.object({ kind: z.literal("rest"), url: z.string(), itemsPath: z.string().optional() }),
  ]).optional(),
  structuredDataType: z.enum(["Article", "Product", "Event", "Person", "Organization", "Place"]).optional(),
});

const pageSeo = z.object({
  title: localized(z.string()).optional(),
  description: localized(z.string()).optional(),
  image: id.optional(),
  index: z.boolean().optional(),
  canonical: z.string().optional(),
});

export const page = z.object({
  id,
  name: localized(z.string()),
  path: z.string().startsWith("/"),
  kind: z.enum(["static", "template"]),
  root: node,
  seo: pageSeo.optional(),
  state: z.record(z.string(), z.object({ type: z.enum(["boolean", "number", "text"]), initial: z.unknown() })).optional(),
  locales: z.array(locale).optional(),
  source: sourceRef.optional(),
});

export const asset = z.object({
  id,
  kind: z.enum(["image", "video", "file"]),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: localized(z.string()).optional(),
  mime: z.string().optional(),
  source: sourceRef.optional(),
});

export const site = z.object({
  schemaVersion: z.literal(1),
  id,
  name: z.string(),
  settings: z.object({
    defaultLocale: locale,
    locales: z.array(locale).min(1),
    breakpoints: z.array(z.object({ id: z.string(), name: z.string(), maxWidth: z.number() })),
    seo: z.object({
      titleSuffix: localized(z.string()).optional(),
      description: localized(z.string()).optional(),
      image: id.optional(),
      favicon: id.optional(),
      social: z.record(z.string(), z.string()).optional(),
    }),
    head: z.string().optional(),
    bodyEnd: z.string().optional(),
  }),
  theme,
  sharedStyles: z.array(sharedStyle),
  components: z.array(componentDef),
  codeComponents: z.array(codeComponent),
  databases: z.array(database),
  pages: z.array(page),
  assets: z.array(asset),
  redirects: z.array(z.object({ from: z.string(), to: z.string(), permanent: z.boolean() })),
});

export type SiteInput = z.input<typeof site>;

/** Valide un document et retourne les erreurs lisibles. */
export function validateSite(input: unknown): { ok: true } | { ok: false; errors: string[] } {
  const r = site.safeParse(input);
  if (r.success) return { ok: true };
  return { ok: false, errors: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) };
}
