"use client";
/* eslint-disable @next/next/no-img-element -- vignettes de l'éditeur, pas du site publié */

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Download, Plus, Trash2, Upload, X } from "lucide-react";
import type { CommitOptions, Database, Entry, Field, FieldType, Node, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Dialog, Hint, IconButton, Select, TextArea, TextInput } from "@/ui";
import { Segmented } from "@/ui/controls";
import { MediaLibrary } from "@/components/MediaLibrary";
import { assetLabel } from "@/lib/upload";
import { slugify } from "@/components/PagesPanel";
import { readTable, richToText, toCsv, type Table } from "@/lib/csv";
import { ImportDialog } from "./ImportDialog";

type Commit = (op: Op, opts?: CommitOptions) => void;

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texte" }, { value: "richtext", label: "Texte long" }, { value: "number", label: "Nombre" }, { value: "date", label: "Date" },
  { value: "boolean", label: "Oui / non" }, { value: "select", label: "Choix" }, { value: "multiSelect", label: "Choix multiples" },
  { value: "image", label: "Image" }, { value: "gallery", label: "Galerie" }, { value: "file", label: "Fichier" }, { value: "link", label: "Lien" },
  { value: "color", label: "Couleur" }, { value: "relation", label: "Relation" }, { value: "position", label: "Ordre" },
];
const READONLY: FieldType[] = ["formula", "backlink", "createdAt", "updatedAt"];
const READONLY_LABEL: Partial<Record<FieldType, string>> = { createdAt: "Date de création", updatedAt: "Dernière modification", formula: "Formule", backlink: "Relation inverse" };
const typeLabel = (t: FieldType) => FIELD_TYPES.find((x) => x.value === t)?.label ?? READONLY_LABEL[t] ?? t;

// ---------------------------------------------------------------- texte long ↔ texte simple (v0 : paragraphes seulement)
function textToRich(text: string, locale: string): Node[] {
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => ({ id: newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: p }] } } }));
}
function isPlainRich(v: unknown, locale: string): boolean {
  if (!Array.isArray(v)) return true;
  return (v as Node[]).every((n) => n.type === "text" && ((n.props.content as Record<string, { t: string; marks?: unknown }[]> | undefined)?.[locale] ?? []).every((s) => s.t === "text" && !s.marks));
}

// ---------------------------------------------------------------- cellules
function Draft({ value, onCommit, type = "text", placeholder, mono }: { value: string; onCommit: (v: string) => void; type?: string; placeholder?: string; mono?: boolean }) {
  const [draft, setDraft] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); setDraft(value); }
  const commit = () => { if (draft !== value) onCommit(draft); };
  return <input type={type} value={draft} placeholder={placeholder} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") { setDraft(value); (e.target as HTMLInputElement).blur(); } }} className={`w-full h-7 px-1.5 bg-transparent text-sm text-ink rounded-xs border border-transparent hover:border-line focus:border-accent focus:bg-surface outline-none ${mono ? "font-mono text-xs" : ""}`} />;
}

function Cell({ site, db, field, entry, allEntries, onChange, onPickMedia }: { site: Site; db: Database; field: Field; entry: Entry; allEntries: Entry[]; onChange: (v: unknown) => void; onPickMedia: (mode: "image" | "gallery") => void }) {
  const locale = site.settings.defaultLocale;
  const v = entry.values[field.name];
  const asset = (id: unknown) => site.assets.find((a) => a.id === id);
  switch (field.type) {
    case "text": case "link":
      return <Draft value={typeof v === "string" ? v : v == null ? "" : String(v)} onCommit={(s) => onChange(s || undefined)} placeholder={field.type === "link" ? "https://…" : undefined} mono={field.name === db.slugField} />;
    case "number": case "position":
      return <Draft type="number" value={typeof v === "number" ? String(v) : ""} onCommit={(s) => onChange(s === "" ? undefined : Number(s))} />;
    case "date":
      return <Draft type="date" value={typeof v === "string" ? v.slice(0, 10) : ""} onCommit={(s) => onChange(s || undefined)} />;
    case "color":
      return <div className="flex items-center gap-1"><input type="color" value={typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v) ? v : "#000000"} onChange={(e) => onChange(e.target.value)} className="h-6 w-7 bg-transparent border-0 p-0 cursor-pointer" /><Draft value={typeof v === "string" ? v : ""} onCommit={(s) => onChange(s || undefined)} mono placeholder="#…" /></div>;
    case "boolean":
      return <label className="flex items-center h-7 px-1.5 cursor-pointer"><input type="checkbox" checked={!!v} onChange={(e) => onChange(e.target.checked)} className="accent-[var(--color-accent)]" /></label>;
    case "select":
      return <Select value={typeof v === "string" ? v : ""} placeholder="—" options={[{ value: "", label: "—" }, ...(field.options ?? []).map((o) => ({ value: o.value, label: o.label[locale] ?? o.value }))]} onValueChange={(s) => onChange(s || undefined)} />;
    case "multiSelect": {
      const cur = Array.isArray(v) ? (v as string[]) : [];
      return <div className="flex flex-wrap gap-1 py-1">{(field.options ?? []).map((o) => { const on = cur.includes(o.value); return <button key={o.value} type="button" onClick={() => onChange(on ? cur.filter((x) => x !== o.value) : [...cur, o.value])} className={`h-5 px-1.5 rounded-full text-2xs border ${on ? "bg-accent-soft border-accent text-ink" : "border-line text-muted hover:border-line-strong"}`}>{o.label[locale] ?? o.value}</button>; })}{!(field.options ?? []).length ? <span className="text-2xs text-dim">Aucune option (réglez le champ)</span> : null}</div>;
    }
    case "image": {
      const a = asset(v);
      return <button type="button" onClick={() => onPickMedia("image")} title={a ? assetLabel(a, locale) : "Choisir une image"} className="flex items-center gap-1.5 h-7 px-1 rounded-xs hover:bg-hover text-xs text-muted max-w-full">
        {a ? <img src={a.variants?.[0]?.url ?? a.url} alt="" className="h-6 w-6 rounded-xs object-cover shrink-0" /> : <span className="h-6 w-6 rounded-xs border border-dashed border-line-strong shrink-0" />}
        <span className="truncate">{a ? assetLabel(a, locale) : "Choisir…"}</span>
      </button>;
    }
    case "gallery": {
      const ids = Array.isArray(v) ? (v as string[]) : [];
      return <div className="flex items-center gap-1 py-0.5 flex-wrap">
        {ids.map((id, i) => { const a = asset(id); return a ? <img key={`${id}-${i}`} src={a.variants?.[0]?.url ?? a.url} alt="" title={`${assetLabel(a, locale)} · cliquer pour retirer`} onClick={() => onChange(ids.filter((_, j) => j !== i))} className="h-6 w-6 rounded-xs object-cover cursor-pointer hover:opacity-60" /> : null; })}
        <button type="button" onClick={() => onPickMedia("gallery")} title="Ajouter une image à la galerie" className="h-6 w-6 rounded-xs border border-dashed border-line-strong text-dim hover:text-ink hover:border-accent grid place-items-center"><Plus size={12} /></button>
      </div>;
    }
    case "relation": {
      const target = site.databases.find((d) => d.id === field.relation?.database);
      return <RelationCell field={field} value={v} onChange={onChange} target={target} entries={allEntries.filter((e) => e.database === target?.id)} />;
    }
    case "richtext": {
      const plain = isPlainRich(v, locale);
      return <RichDraft value={richToText(v, locale)} plain={plain} onCommit={(t) => onChange(t.trim() ? textToRich(t, locale) : undefined)} />;
    }
    default:
      return <span className="text-xs text-dim px-1.5">{field.type === "createdAt" ? entry.createdAt.slice(0, 10) : field.type === "updatedAt" ? entry.updatedAt.slice(0, 10) : "—"}</span>;
  }
}

function RichDraft({ value, plain, onCommit }: { value: string; plain: boolean; onCommit: (t: string) => void }) {
  const [draft, setDraft] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); setDraft(value); }
  return <TextArea value={draft} onValueChange={setDraft} rows={2} placeholder="Paragraphes séparés par une ligne vide" title={plain ? undefined : "Ce texte contient de la mise en forme (gras, liens…) qui sera perdue si vous le modifiez ici."} onBlur={() => { if (draft !== value) onCommit(draft); }} className={`min-w-[220px] ${plain ? "" : "border-warning/60"}`} />;
}

/** Relation : une ou plusieurs entrées d'une autre base, choisies par leur titre. */
function RelationCell({ field, value, onChange, target, entries }: { field: Field; value: unknown; onChange: (v: unknown) => void; target?: Database; entries: Entry[] }) {
  if (!target) return <span className="text-2xs text-dim px-1.5">Base cible à choisir (réglez le champ)</span>;
  const title = (e: Entry) => String(e.values[target.titleField] ?? "") || "Sans titre";
  const options = [{ value: "", label: "—" }, ...entries.map((e) => ({ value: e.id, label: title(e) }))];
  if (!field.relation?.multiple) return <Select value={typeof value === "string" ? value : ""} options={options} onValueChange={(s) => onChange(s || undefined)} />;
  const cur = Array.isArray(value) ? (value as string[]) : [];
  return <div className="flex items-center gap-1 flex-wrap py-0.5">
    {cur.map((id) => { const e = entries.find((x) => x.id === id); return <span key={id} className="h-5 pl-1.5 pr-0.5 rounded-full bg-accent-soft text-2xs text-ink inline-flex items-center gap-0.5">{e ? title(e) : id}<button type="button" onClick={() => onChange(cur.filter((x) => x !== id))} className="h-4 w-4 grid place-items-center hover:text-danger" title="Retirer"><X size={10} /></button></span>; })}
    <Select value="" placeholder="Ajouter…" options={options.filter((o) => o.value && !cur.includes(o.value))} onValueChange={(s) => { if (s) onChange([...cur, s]); }} className="w-[120px]" />
  </div>;
}

// ---------------------------------------------------------------- réglage d'un champ
function FieldEditor({ site, db, field, onChange, onMove, onRemove, onClose, isNew }: { site: Site; db: Database; field: Field; onChange: (f: Field) => void; onMove: (dir: -1 | 1) => void; onRemove: () => void; onClose: () => void; isNew?: boolean }) {
  const locale = site.settings.defaultLocale;
  const label = field.label[locale] ?? field.name;
  const optionsText = (field.options ?? []).map((o) => o.label[locale] ?? o.value).join(", ");
  const setOptions = (text: string) => {
    const labels = text.split(",").map((s) => s.trim()).filter(Boolean);
    const prev = field.options ?? [];
    onChange({ ...field, options: labels.map((l) => prev.find((o) => (o.label[locale] ?? o.value) === l) ?? { value: slugify(l) || l, label: { [locale]: l } }) });
  };
  const others = site.databases.map((d) => ({ value: d.id, label: d.name[locale] ?? d.slug }));
  const canRemove = field.name !== db.titleField;
  return (
    <div className="flex flex-col gap-2 p-3 border-b border-line bg-surface">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted w-16 shrink-0">Champ</span>
        <TextInput autoFocus={isNew} className="flex-1" value={label} onValueChange={(v) => onChange({ ...field, label: { ...field.label, [locale]: v } })} placeholder="Nom du champ" />
        <span className="text-2xs text-dim font-mono" title="Clé stable, utilisée par les liaisons">{field.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted w-16 shrink-0">Type</span>
        <Select className="w-[180px]" value={field.type} options={READONLY.includes(field.type) ? [{ value: field.type, label: typeLabel(field.type) }] : FIELD_TYPES} onValueChange={(t) => onChange({ ...field, type: t as FieldType, options: t === "select" || t === "multiSelect" ? field.options ?? [] : undefined, relation: t === "relation" ? field.relation ?? { database: site.databases.find((d) => d.id !== db.id)?.id ?? db.id, multiple: false } : undefined })} />
        <Segmented value={field.required ? "1" : undefined} options={[{ value: "1", label: "Obligatoire" }]} onChange={(v) => onChange({ ...field, required: v ? true : undefined })} />
      </div>
      {field.type === "select" || field.type === "multiSelect" ? (
        <div className="flex items-center gap-2"><span className="text-xs text-muted w-16 shrink-0">Options</span><TextInput className="flex-1" value={optionsText} onValueChange={setOptions} placeholder="Portrait, Mariage, Paysage (séparées par des virgules)" /></div>
      ) : null}
      {field.type === "relation" ? (
        <div className="flex items-center gap-2"><span className="text-xs text-muted w-16 shrink-0">Vers</span><Select className="w-[180px]" value={field.relation?.database ?? ""} options={others} onValueChange={(d) => onChange({ ...field, relation: { ...(field.relation ?? { multiple: false }), database: d } })} /><Segmented value={field.relation?.multiple ? "1" : undefined} options={[{ value: "1", label: "Plusieurs" }]} onChange={(v) => onChange({ ...field, relation: { database: field.relation?.database ?? db.id, multiple: !!v } })} /></div>
      ) : null}
      <div className="flex items-center gap-1">
        <Button size="sm" icon={ChevronLeft} onClick={() => onMove(-1)} title="Déplacer la colonne vers la gauche">Gauche</Button>
        <Button size="sm" icon={ChevronRight} onClick={() => onMove(1)} title="Déplacer la colonne vers la droite">Droite</Button>
        <span className="flex-1" />
        {canRemove ? <Button size="sm" variant="danger" icon={Trash2} onClick={onRemove}>Supprimer le champ</Button> : <span className="text-2xs text-dim">Le champ titre ne se supprime pas</span>}
        <Button size="sm" variant="primary" onClick={onClose}>Terminé</Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- la vue tableur
export function DatabaseTable({ site, db, entries, save, saveMany, remove, commit, onClose, saving, onDeleteDatabase, readOnly, notify }: { site: Site; db: Database; entries: Entry[]; save: (e: Entry) => void; saveMany?: (list: Entry[]) => void; remove: (id: string) => void; commit: Commit; onClose: () => void; saving?: boolean; onDeleteDatabase?: () => void; /** Base virtuelle (messages reçus) : pas de champs à régler ni d'entrées à créer. */ readOnly?: boolean; notify?: (text: string, tone?: "danger" | "success" | "info") => void }) {
  const locale = site.settings.defaultLocale;
  const dbIndex = site.databases.findIndex((d) => d.id === db.id);
  const [fieldEdit, setFieldEdit] = useState<string | null>(null);
  const [media, setMedia] = useState<{ entryId: string; field: string; mode: "image" | "gallery" } | null>(null);
  const posField = db.fields.find((f) => f.type === "position")?.name;
  const rows = useMemo(() => {
    const list = entries.filter((e) => e.database === db.id);
    return posField ? [...list].sort((a, b) => Number(a.values[posField] ?? 0) - Number(b.values[posField] ?? 0)) : [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }, [entries, db.id, posField]);
  const setDb = (next: Database, label: string) => commit({ op: "site.set", path: `databases.${dbIndex}`, value: next }, { label });
  const setFields = (fields: Field[], label: string) => setDb({ ...db, fields }, label);

  const addField = () => {
    let name = "champ", i = 2;
    while (db.fields.some((f) => f.name === name)) name = `champ-${i++}`;
    const f: Field = { name, label: { [locale]: "Nouveau champ" }, type: "text" };
    setFields([...db.fields, f], "Ajouter un champ");
    setFieldEdit(name);
  };
  const updateField = (name: string, next: Field) => {
    // La clé suit le libellé tant que le champ est neuf (pas encore de valeur saisie), pour des liaisons lisibles.
    const used = rows.some((e) => e.values[name] !== undefined);
    let key = next.name;
    if (!used && name.startsWith("champ")) { const k = slugify(next.label[locale] ?? "") || name; key = db.fields.some((f) => f.name === k && f.name !== name) ? name : k; }
    setFields(db.fields.map((f) => (f.name === name ? { ...next, name: key } : f)), "Régler le champ");
    if (key !== name) setFieldEdit(key);
  };
  const moveField = (name: string, dir: -1 | 1) => {
    const i = db.fields.findIndex((f) => f.name === name), j = i + dir;
    if (i < 0 || j < 0 || j >= db.fields.length) return;
    const next = [...db.fields]; const [f] = next.splice(i, 1); next.splice(j, 0, f!);
    setFields(next, "Déplacer le champ");
  };
  const removeField = (name: string) => { setFields(db.fields.filter((f) => f.name !== name), "Supprimer le champ"); setFieldEdit(null); };

  const addEntry = () => {
    const now = new Date().toISOString();
    const values: Record<string, unknown> = {};
    if (posField) values[posField] = rows.length + 1;
    save({ id: newId(), database: db.id, status: "draft", values, createdAt: now, updatedAt: now });
  };
  const setValue = (e: Entry, field: Field, v: unknown) => {
    const values = { ...e.values, [field.name]: v };
    if (v === undefined) delete values[field.name];
    // L'adresse suit le titre tant qu'elle n'a pas été fixée à la main.
    if (field.name === db.titleField && db.slugField && !e.values[db.slugField] && typeof v === "string") values[db.slugField] = slugify(v);
    save({ ...e, values });
  };
  const pickMedia = (id: string | null) => {
    if (!media) return;
    const e = entries.find((x) => x.id === media.entryId); const f = db.fields.find((x) => x.name === media.field);
    if (!e || !f) return;
    if (media.mode === "image") setValue(e, f, id ?? undefined);
    else if (id) setValue(e, f, [...(Array.isArray(e.values[f.name]) ? (e.values[f.name] as string[]) : []), id]);
  };

  const [importTable, setImportTable] = useState<Table | null>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const onImportFile = async (file: File) => {
    try { const t = await readTable(file); if (!t.columns.length) throw new Error("Fichier vide"); setImportTable(t); }
    catch (e) { notify?.(e instanceof Error ? `Import impossible : ${e.message}` : "Import impossible"); }
  };
  // L'export est servi par le serveur (pièce jointe) : plus fiable qu'un fichier fabriqué dans la page, et copiable en secours.
  const exportCsv = () => {
    const a = document.createElement("a");
    a.href = `/api/sites/${site.id}/databases/${db.id}/export`; a.download = `${db.slug}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    notify?.(`Téléchargement de ${db.slug}.csv (${rows.length} entrée${rows.length > 1 ? "s" : ""}) : regardez vos téléchargements.`, "success");
  };
  const copyCsv = async () => { try { await navigator.clipboard.writeText(toCsv(db, rows, locale)); notify?.("CSV copié : collez-le dans un tableur.", "success"); } catch { notify?.("Copie impossible dans ce navigateur."); } };
  const editing = fieldEdit && !readOnly ? db.fields.find((f) => f.name === fieldEdit) : undefined;
  const title = (e: Entry) => String(e.values[db.titleField] ?? "") || "Sans titre";
  return (
    <Dialog open onClose={onClose} title={`${db.name[locale] ?? db.slug} · ${rows.length} entrée${rows.length > 1 ? "s" : ""}`} width={1240} actions={<div className="flex items-center gap-1">{saving ? <span className="text-2xs text-dim mr-2">Enregistrement…</span> : null}<Button size="sm" icon={Download} onClick={exportCsv} disabled={!rows.length} title="Télécharger toutes les entrées en CSV (tableur)">CSV</Button><Button size="sm" variant="ghost" icon={Copy} onClick={copyCsv} disabled={!rows.length} title="Copier le CSV dans le presse-papier (à coller dans un tableur)">Copier</Button>{readOnly || !saveMany ? null : <><input ref={importInput} type="file" accept=".csv,.json,text/csv,application/json" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void onImportFile(f); }} /><Button size="sm" icon={Upload} onClick={() => importInput.current?.click()} title="Importer un CSV (tableur) ou un JSON : les colonnes deviennent des champs">Importer…</Button></>}{readOnly ? null : <><Button size="sm" icon={Plus} onClick={addField}>Champ</Button><Button size="sm" variant="primary" icon={Plus} onClick={addEntry}>Nouvelle entrée</Button></>}</div>}>
      {editing ? <FieldEditor site={site} db={db} field={editing} isNew={editing.name.startsWith("champ")} onChange={(f) => updateField(editing.name, f)} onMove={(d) => moveField(editing.name, d)} onRemove={() => removeField(editing.name)} onClose={() => setFieldEdit(null)} /> : null}
      <div className="overflow-auto">
        <table className="border-collapse text-sm min-w-full">
          <thead className="sticky top-0 z-10 bg-panel">
            <tr>
              <th className="w-8 border-b border-r border-line" title="Publié / brouillon" />
              {db.fields.map((f) => (
                <th key={f.name} className="text-left font-medium text-xs text-muted border-b border-r border-line px-1.5 h-8 whitespace-nowrap min-w-[140px]">
                  <button type="button" disabled={readOnly} onClick={() => setFieldEdit(f.name)} className={`flex items-center gap-1.5 w-full text-left hover:text-ink ${fieldEdit === f.name ? "text-ink" : ""}`} title={readOnly ? undefined : "Régler ce champ (nom, type, options, ordre)"}>
                    <span className="truncate">{f.label[locale] ?? f.name}</span>
                    <span className="text-2xs text-dim font-normal">{typeLabel(f.type)}</span>
                    {f.name === db.titleField ? <span className="text-2xs text-dim font-normal">· titre</span> : null}
                  </button>
                </th>
              ))}
              <th className="w-8 border-b border-line" />
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="group hover:bg-hover/40">
                <td className="border-b border-r border-line text-center align-middle">
                  <button type="button" onClick={() => save({ ...e, status: e.status === "published" ? "draft" : "published" })} title={readOnly ? (e.status === "published" ? "Traité · cliquer pour remettre en nouveau" : "Nouveau · cliquer pour marquer traité") : e.status === "published" ? "Publiée · cliquer pour passer en brouillon" : "Brouillon (invisible sur le site) · cliquer pour publier"} className="h-7 w-8 grid place-items-center">
                    <span className={`h-2 w-2 rounded-full ${e.status === "published" ? "bg-success" : "border border-line-strong"}`} />
                  </button>
                </td>
                {db.fields.map((f) => (
                  <td key={f.name} className={`border-b border-r border-line align-middle px-0.5 ${f.name === db.titleField ? "font-medium" : ""}`}>
                    <Cell site={site} db={db} field={f} entry={e} allEntries={entries} onChange={(v) => setValue(e, f, v)} onPickMedia={(mode) => setMedia({ entryId: e.id, field: f.name, mode })} />
                  </td>
                ))}
                <td className="border-b border-line align-middle">
                  <IconButton size="sm" tone="danger" label={`Supprimer « ${title(e)} »`} icon={Trash2} className="opacity-0 group-hover:opacity-100" onClick={() => { if (window.confirm(`Supprimer « ${title(e)} » ? Cette entrée ne se récupère pas.`)) remove(e.id); }} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? <tr><td colSpan={db.fields.length + 2} className="p-6 text-center text-sm text-dim">{readOnly ? "Aucun message reçu pour l'instant." : "Aucune entrée. Créez la première avec « Nouvelle entrée »."}</td></tr> : null}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-2 border-t border-line flex items-center gap-3">
        <Hint>{readOnly ? "Les messages arrivent ici à chaque envoi du formulaire. Le point en tête de ligne marque un message traité ; la corbeille le supprime." : "Une entrée en brouillon reste invisible sur le site. Cliquez un en-tête pour régler le champ. Les images se choisissent dans la bibliothèque du site ; dans une galerie, cliquer une vignette la retire."}</Hint>
        {onDeleteDatabase ? <Button size="sm" variant="danger" icon={Trash2} className="shrink-0" onClick={onDeleteDatabase}>Supprimer la base…</Button> : null}
      </div>
      {importTable && saveMany ? <ImportDialog site={site} db={db} table={importTable} entries={entries} commit={commit} saveMany={saveMany} onClose={() => setImportTable(null)} onDone={(n) => { setImportTable(null); notify?.(`${n} entrée${n > 1 ? "s" : ""} importée${n > 1 ? "s" : ""}.`, "success"); }} /> : null}
      {media ? <MediaLibrary site={site} entries={entries} open onClose={() => setMedia(null)} value={media.mode === "image" ? (entries.find((x) => x.id === media.entryId)?.values[media.field] as string | null) ?? null : null} onPick={pickMedia} commit={commit} saveEntry={save} /> : null}
    </Dialog>
  );
}
