import type { Database, Entry, Node } from "@atelier/model";

/** Lecture d'un CSV (séparateur détecté entre ; , et tabulation, guillemets doublés, BOM) ou d'un JSON (tableau d'objets). */
export type Table = { columns: string[]; rows: string[][] };

export function parseCsv(text: string): Table {
  const src = text.replace(/^\ufeff/, "");
  const firstLine = src.split(/\r?\n/)[0] ?? "";
  const delim = [";", ",", "\t"].map((d) => ({ d, n: (firstLine.match(new RegExp(d === "\t" ? "\t" : `\\${d}`, "g")) ?? []).length })).sort((a, b) => b.n - a.n)[0]!.d;
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i]!;
    if (quoted) {
      if (c === '"') { if (src[i + 1] === '"') { cell += '"'; i++; } else quoted = false; }
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === delim) { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && src[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  const clean = rows.filter((r) => r.some((v) => v.trim() !== ""));
  const width = Math.max(0, ...clean.map((r) => r.length));
  const padded = clean.map((r) => [...r, ...Array.from({ length: width - r.length }, () => "")]);
  const [head, ...body] = padded;
  return { columns: (head ?? []).map((h, i) => h.trim() || `Colonne ${i + 1}`), rows: body };
}

export function parseJsonTable(text: string): Table {
  const data = JSON.parse(text) as unknown;
  const list = Array.isArray(data) ? data : data && typeof data === "object" && Array.isArray((data as { entries?: unknown }).entries) ? (data as { entries: unknown[] }).entries : null;
  if (!list) throw new Error("Le JSON doit être un tableau d'objets");
  const objs = list.map((x) => (x && typeof x === "object" ? (("values" in (x as object) && typeof (x as { values: unknown }).values === "object") ? (x as { values: Record<string, unknown> }).values : (x as Record<string, unknown>)) : {}));
  const columns = [...new Set(objs.flatMap((o) => Object.keys(o)))];
  const cell = (v: unknown) => (v === null || v === undefined ? "" : Array.isArray(v) ? v.map(String).join("; ") : typeof v === "object" ? JSON.stringify(v) : String(v));
  return { columns, rows: objs.map((o) => columns.map((c) => cell(o[c]))) };
}

export async function readTable(file: File): Promise<Table> {
  const text = await file.text();
  return /\.json$/i.test(file.name) || file.type === "application/json" ? parseJsonTable(text) : parseCsv(text);
}

// ---------------------------------------------------------------- écriture
export function inlineText(list: unknown, locale: string): string {
  const arr = (list as Record<string, { t: string; v?: string; children?: unknown }[]> | undefined)?.[locale];
  if (!Array.isArray(arr)) return "";
  return arr.map((s) => (s.t === "text" ? s.v ?? "" : s.t === "break" ? "\n" : s.t === "link" ? inlineText({ [locale]: s.children }, locale) : "")).join("");
}
export function richToText(v: unknown, locale: string): string {
  if (!Array.isArray(v)) return typeof v === "string" ? v : "";
  return (v as Node[]).map((n) => (n.type === "text" ? inlineText(n.props.content, locale) : n.type === "list" ? (n.children ?? []).map((li) => "• " + (li.children ?? []).map((t) => inlineText(t.props.content, locale)).join("")).join("\n") : "")).filter(Boolean).join("\n\n");
}

/** Export CSV d'une base : une ligne par entrée, libellés des champs en tête, valeurs texte (les listes jointes par « ; »). */
export function toCsv(db: Database, rows: Entry[], locale: string): string {
  // Une cellule qui commence par = + - @ serait lue comme une formule par un tableur : on la neutralise avec une apostrophe.
  const cell = (v: unknown): string => { let t = v === undefined || v === null ? "" : Array.isArray(v) ? v.map((x) => (typeof x === "object" && x ? richToText([x], locale) : String(x))).join("; ") : typeof v === "object" ? richToText(v, locale) : String(v); if (/^[=+\-@\t\r]/.test(t)) t = "'" + t; return /[";\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
  const head = ["id", "statut", ...db.fields.map((f) => f.label[locale] ?? f.name), "créé le", "modifié le"];
  const lines = rows.map((e) => [e.id, e.status === "published" ? "publié" : "brouillon", ...db.fields.map((f) => cell(f.type === "createdAt" ? e.createdAt : f.type === "updatedAt" ? e.updatedAt : e.values[f.name])), e.createdAt, e.updatedAt].map(cell).join(";"));
  return "\ufeff" + [head.map(cell).join(";"), ...lines].join("\r\n");
}

