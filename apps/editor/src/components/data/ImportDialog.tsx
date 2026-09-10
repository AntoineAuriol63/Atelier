"use client";

import { useMemo, useRef, useState } from "react";
import { Upload } from "lucide-react";
import type { CommitOptions, Database, Entry, Field, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Dialog, Hint, Select } from "@/ui";
import { Segmented } from "@/ui/controls";
import { slugify } from "@/components/PagesPanel";
import type { Table } from "@/lib/csv";

type Commit = (op: Op, opts?: CommitOptions) => void;
const NEW = "@new", SKIP = "@skip";
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");

/** Valeur d'une cellule convertie selon le type du champ ; `undefined` si vide ou inconvertible. */
function convert(field: Field, raw: string, locale: string, related: Entry[], relatedDb?: Database): unknown {
  const v = raw.trim();
  if (v === "") return undefined;
  switch (field.type) {
    case "number": case "position": { const n = Number(v.replace(",", ".")); return Number.isFinite(n) ? n : undefined; }
    case "boolean": return /^(1|true|oui|yes|vrai|x)$/i.test(v) ? true : /^(0|false|non|no|faux)$/i.test(v) ? false : undefined;
    case "date": { const d = v.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/); if (d) return `${d[3]}-${d[2]!.padStart(2, "0")}-${d[1]!.padStart(2, "0")}`; return Number.isNaN(Date.parse(v)) ? undefined : new Date(v).toISOString().slice(0, 10); }
    case "select": { const o = (field.options ?? []).find((x) => x.value === v || norm(x.label[locale] ?? "") === norm(v)); return o?.value; }
    case "multiSelect": return v.split(/[;|,]/).map((x) => x.trim()).map((x) => (field.options ?? []).find((o) => o.value === x || norm(o.label[locale] ?? "") === norm(x))?.value).filter((x): x is string => !!x);
    case "relation": {
      const find = (t: string) => related.find((e) => e.id === t || (relatedDb && norm(String(e.values[relatedDb.titleField] ?? "")) === norm(t)))?.id;
      if (field.relation?.multiple) return v.split(/[;|]/).map((x) => find(x.trim())).filter((x): x is string => !!x);
      return find(v);
    }
    case "richtext": return v.split(/\n{2,}|\\n\\n/).map((p) => p.trim()).filter(Boolean).map((p) => ({ id: newId(), type: "text" as const, props: { tag: "p", content: { [locale]: [{ t: "text" as const, v: p }] } } }));
    case "image": case "gallery": case "file": return undefined; // les fichiers passent par la bibliothèque, pas par un CSV
    default: return v;
  }
}

/** Import d'un tableau (CSV ou JSON) dans une base : correspondance des colonnes, conversion par type, entrées créées ou mises à jour. */
export function ImportDialog({ site, db, table, entries, commit, saveMany, onClose, onDone }: { site: Site; db: Database; table: Table; entries: Entry[]; commit: Commit; saveMany: (list: Entry[]) => void; onClose: () => void; onDone: (n: number, createdIds: string[]) => void }) {
  const locale = site.settings.defaultLocale;
  const auto = useMemo(() => table.columns.map((c) => {
    const n = norm(c);
    if (n === "id" || n === "identifiant") return "@id";
    const f = db.fields.find((x) => norm(x.name) === n || norm(x.label[locale] ?? "") === n);
    // Une colonne inconnue est ignorée par défaut : créer un champ est un choix, pas un effet de bord.
    return f ? f.name : SKIP;
  }), [table.columns, db.fields, locale]);
  const [mapping, setMapping] = useState<string[]>(auto);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const idCol = mapping.indexOf("@id");
  const dbIndex = site.databases.findIndex((d) => d.id === db.id);
  const posField = db.fields.find((f) => f.type === "position")?.name;
  const fieldOptions = [{ value: SKIP, label: "Ignorer" }, { value: NEW, label: "Nouveau champ texte" }, { value: "@id", label: "Identifiant (mise à jour)" }, ...db.fields.map((f) => ({ value: f.name, label: `${f.label[locale] ?? f.name}` }))];
  const usable = table.columns.filter((_, i) => mapping[i] !== SKIP && mapping[i] !== "@id").length;
  // Pré-analyse : pour chaque colonne reliée à un champ typé, combien de valeurs non vides ne se convertissent pas.
  const problems = useMemo(() => table.columns.map((_, i) => {
    const m = mapping[i]!;
    const f = db.fields.find((x) => x.name === m);
    if (!f || m === SKIP || m === NEW || m === "@id" || f.type === "text" || f.type === "richtext" || f.type === "link") return 0;
    const relDb = f.type === "relation" ? site.databases.find((d) => d.id === f.relation?.database) : undefined;
    return table.rows.reduce((n, r) => { const raw = r[i] ?? ""; if (!raw.trim()) return n; const v = convert(f, raw, locale, relDb ? entries.filter((e) => e.database === relDb.id) : [], relDb); return v === undefined ? n + 1 : n; }, 0);
  }), [table, mapping, db.fields, site.databases, entries, locale]);
  const problemTotal = problems.reduce((a, b) => a + b, 0);
  const created = useRef<string[]>([]);

  const run = () => {
    // 1. Les nouveaux champs.
    let fields = db.fields;
    const targets = table.columns.map((c, i) => {
      const m = mapping[i]!;
      if (m !== NEW) return m;
      let name = slugify(c) || `champ-${i + 1}`;
      while (fields.some((f) => f.name === name)) name += "-2";
      fields = [...fields, { name, label: { [locale]: c }, type: "text" }];
      return name;
    });
    if (fields !== db.fields) commit({ op: "site.set", path: `databases.${dbIndex}.fields`, value: fields }, { label: "Champs importés" });
    const fieldsByName = new Map(fields.map((f) => [f.name, f]));
    // 2. Les entrées.
    const now = new Date().toISOString();
    const existing = entries.filter((e) => e.database === db.id);
    let pos = existing.reduce((m, e) => Math.max(m, Number(e.values[posField ?? ""] ?? 0)), 0);
    const out: Entry[] = [];
    for (const row of table.rows) {
      const id = idCol >= 0 ? row[idCol]?.trim() : "";
      const prev = id ? existing.find((e) => e.id === id) : undefined;
      const values: Record<string, unknown> = { ...(prev?.values ?? {}) };
      targets.forEach((t, i) => {
        if (t === SKIP || t === "@id") return;
        const f = fieldsByName.get(t);
        if (!f) return;
        const relDb = f.type === "relation" ? site.databases.find((d) => d.id === f.relation?.database) : undefined;
        const v = convert(f, row[i] ?? "", locale, relDb ? entries.filter((e) => e.database === relDb.id) : [], relDb);
        if (v === undefined) delete values[t]; else values[t] = v;
      });
      if (db.slugField && !values[db.slugField] && typeof values[db.titleField] === "string") values[db.slugField] = slugify(values[db.titleField] as string);
      if (posField && values[posField] === undefined) values[posField] = ++pos;
      const entry = prev ? { ...prev, values } : { id: id && /^[A-Za-z_][A-Za-z0-9_-]{2,31}$/.test(id) ? id : newId(), database: db.id, status, values, createdAt: now, updatedAt: now };
      if (!prev) created.current.push(entry.id);
      out.push(entry);
    }
    saveMany(out);
    onDone(out.length, created.current);
  };

  return (
    <Dialog open onClose={onClose} title={`Importer dans ${db.name[locale] ?? db.slug}`} width={820} footer={<><span className="text-xs text-muted flex-1">{problemTotal ? `${problemTotal} valeur${problemTotal > 1 ? "s" : ""} ne se convertir${problemTotal > 1 ? "ont" : "a"} pas (voir les colonnes en rouge).` : usable ? "Colonnes reliées, prêt à importer." : "Reliez au moins une colonne à un champ."}</span><Button variant="ghost" onClick={onClose}>Annuler</Button><Button variant="primary" icon={Upload} disabled={!table.rows.length || !usable} onClick={run}>Importer {table.rows.length} ligne{table.rows.length > 1 ? "s" : ""}</Button></>}>
      <div className="p-4 flex flex-col gap-3">
        <Hint>Chaque colonne du fichier va dans un champ de la base. Une colonne « id » met à jour les entrées existantes au lieu d&apos;en créer. Les images se posent ensuite depuis la bibliothèque.</Hint>
        <div className="overflow-auto border border-line rounded-xs">
          <table className="text-xs border-collapse min-w-full">
            <thead className="bg-surface">
              <tr>{table.columns.map((c, i) => (
                <th key={i} className="text-left font-medium px-2 py-1.5 border-b border-r border-line min-w-[160px] align-top">
                  <div className="text-muted truncate mb-1" title={c}>{c}</div>
                  <Select value={mapping[i]!} options={fieldOptions} onValueChange={(v) => setMapping((m) => m.map((x, j) => (j === i ? v : x)))} />
                  {problems[i] ? <div className="text-2xs text-danger mt-1 whitespace-normal">{problems[i]} valeur{problems[i]! > 1 ? "s" : ""} illisible{problems[i]! > 1 ? "s" : ""} pour ce type (laissée{problems[i]! > 1 ? "s" : ""} vide{problems[i]! > 1 ? "s" : ""})</div> : null}
                </th>
              ))}</tr>
            </thead>
            <tbody>
              {table.rows.slice(0, 5).map((r, ri) => <tr key={ri}>{r.map((v, i) => <td key={i} className={`px-2 py-1 border-b border-r border-line truncate max-w-[220px] ${mapping[i] === SKIP ? "text-dim line-through" : "text-ink"}`} title={v}>{v}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        {table.rows.length > 5 ? <p className="text-2xs text-dim">… et {table.rows.length - 5} autre{table.rows.length - 5 > 1 ? "s" : ""} ligne{table.rows.length - 5 > 1 ? "s" : ""}.</p> : null}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Entrées importées :</span>
          <Segmented value={status} options={[{ value: "draft", label: "Brouillons" }, { value: "published", label: "Publiées" }]} onChange={(v) => { if (v) setStatus(v as "draft" | "published"); }} />
        </div>
      </div>
    </Dialog>
  );
}
