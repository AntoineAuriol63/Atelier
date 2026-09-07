import type { Site, StyleValue, Theme } from "@atelier/model";

export const LENGTH_UNITS = ["px", "%", "rem", "em", "vw", "vh", "fr", "ch"] as const;
export type Unit = (typeof LENGTH_UNITS)[number];

export type Parsed =
  | { kind: "number"; n: number; unit: string }
  | { kind: "keyword"; keyword: string }
  | { kind: "token"; token: string }
  | { kind: "raw"; raw: string }
  | { kind: "empty" };

const NUM = /^(-?\d*\.?\d+)\s*(px|%|rem|em|vw|vh|vmin|vmax|fr|ch|deg|ms|s)?$/i;

export function parseValue(v: StyleValue | undefined | null): Parsed {
  if (v === undefined || v === null || v === "") return { kind: "empty" };
  if (typeof v === "number") return { kind: "number", n: v, unit: "" };
  if (typeof v === "object") {
    if ("token" in v) return { kind: "token", token: v.token };
    return { kind: "raw", raw: JSON.stringify(v) };
  }
  const s = v.trim();
  const tok = s.match(/^\{([\w.-]+)\}$/);
  if (tok) return { kind: "token", token: tok[1]! };
  const m = s.match(NUM);
  if (m) return { kind: "number", n: Number(m[1]), unit: (m[2] ?? "").toLowerCase() };
  if (/^[a-z-]+$/i.test(s)) return { kind: "keyword", keyword: s };
  return { kind: "raw", raw: s };
}

export function formatValue(p: Parsed): StyleValue | undefined {
  switch (p.kind) {
    case "empty": return undefined;
    case "number": return p.unit ? `${p.n}${p.unit}` : String(p.n);
    case "keyword": return p.keyword;
    case "token": return { token: p.token };
    case "raw": return p.raw;
  }
}

/** Texte court d'une valeur pour un champ compact. */
export function shortLabel(v: StyleValue | undefined, site?: Site): string {
  const p = parseValue(v);
  switch (p.kind) {
    case "empty": return "";
    case "number": return p.unit && p.unit !== "px" ? `${p.n}${p.unit}` : String(p.n);
    case "keyword": return p.keyword;
    case "token": { const t = site ? tokenValue(site, p.token) : undefined; return t ? `${p.token.split(".").pop()} · ${t}` : `{${p.token}}`; }
    case "raw": return p.raw;
  }
}

/** Analyse une saisie libre : "16" → 16px (unité par défaut), "auto", "{space.4}", "1.5rem". */
export function parseInput(text: string, defaultUnit = "px", keywords: string[] = []): StyleValue | undefined {
  const s = text.trim().replace(",", ".");
  if (!s) return undefined;
  const tok = s.match(/^\{?\s*([\w-]+\.[\w.-]+)\s*\}?$/);
  if (tok) return { token: tok[1]! };
  const m = s.match(NUM);
  if (m) { const unit = m[2] ? m[2].toLowerCase() : (Number(m[1]) === 0 ? "" : defaultUnit); return `${Number(m[1])}${unit}`; }
  if (keywords.includes(s.toLowerCase())) return s.toLowerCase();
  return s;
}

/** Groupe de jetons pertinent pour une propriété. */
export function tokenGroupFor(prop: string): keyof Theme["tokens"] | undefined {
  if (/^(gap|rowGap|columnGap|padding|margin|top|right|bottom|left|inset)/.test(prop)) return "space";
  if (/^(min|max)?(Width|Height|width|height|flexBasis)$/.test(prop)) return "width";
  if (/Radius/.test(prop)) return "radius";
  if (prop === "fontSize") return "fontSize";
  if (prop === "lineHeight") return "lineHeight";
  if (prop === "fontFamily") return "font";
  if (/color|background|Color/i.test(prop)) return "color";
  if (prop === "boxShadow") return "shadow";
  return undefined;
}

export function tokenValue(site: Site, token: string): string | undefined {
  const [group, name] = token.split(".") as [keyof Theme["tokens"], string];
  const v = site.theme.tokens[group]?.[name];
  if (v === undefined) return undefined;
  return typeof v === "string" ? v : v[site.theme.defaultMode] ?? Object.values(v)[0];
}

const SIZE_NAMES: Record<string, string> = { xs: "très petite", sm: "petite", md: "moyenne", lg: "grande", xl: "très grande", "2xl": "énorme", "3xl": "géante", full: "complète", none: "aucune" };

/** Libellé lisible d'un nom de valeur du thème (sm → petite). */
export function tokenLabel(name: string): string {
  return SIZE_NAMES[name] ? `${SIZE_NAMES[name]} (${name})` : name;
}

export function tokenOptions(site: Site, group: keyof Theme["tokens"]): { token: string; label: string; value: string }[] {
  const g = site.theme.tokens[group] ?? {};
  return Object.entries(g).map(([name, v]) => ({ token: `${group}.${name}`, label: tokenLabel(name), value: typeof v === "string" ? v : v[site.theme.defaultMode] ?? Object.values(v)[0] ?? "" }));
}
