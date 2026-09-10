"use client";

import { useState } from "react";
import { Database as DatabaseIcon, Inbox, Plus, Table2 } from "lucide-react";
import type { CommitOptions, Database, Entry, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Hint, TextInput, Eyebrow } from "@/ui";
import { slugify, templatePage } from "@/components/PagesPanel";
import { findForms, formDatabaseId } from "@/lib/forms";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Onglet Données : les bases du site, leur nombre d'entrées, et la création d'une base. */
export function DataPanel({ site, entries, commit, onOpen, readOnly }: { site: Site; entries: Entry[]; commit: Commit; onOpen: (dbId: string) => void; /** Rédacteur : les bases se consultent et se remplissent, elles ne se créent pas. */ readOnly?: boolean }) {
  const locale = site.settings.defaultLocale;
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [withPage, setWithPage] = useState(true);
  const forms = findForms(site);
  const create = () => {
    const n = name.trim();
    if (!n) return;
    let slug = slugify(n) || "base";
    while (site.databases.some((d) => d.slug === slug)) slug += "-2";
    const db: Database = {
      id: newId(), name: { [locale]: n }, slug, titleField: "title", slugField: "slug",
      fields: [
        { name: "title", label: { [locale]: "Titre" }, type: "text", required: true },
        { name: "slug", label: { [locale]: "Adresse" }, type: "text" },
        { name: "position", label: { [locale]: "Ordre" }, type: "position" },
      ],
    };
    const ops: Op[] = [];
    if (withPage) {
      // La page par entrée naît avec la base ; la base connaît son modèle (D24).
      const page = templatePage(site, db);
      db.pageTemplates = [{ page: page.id, slugPattern: page.path }];
      ops.push({ op: "site.set", path: "pages", value: [...site.pages, page] });
    }
    ops.push({ op: "site.set", path: "databases", value: [...site.databases, db] });
    commit(ops.length === 1 ? ops[0]! : { op: "batch", ops, label: `Créer la base ${n}` }, { label: `Créer la base ${n}` });
    setName(""); setCreating(false); onOpen(db.id);
  };
  return (
    <div className="flex flex-col min-h-0">
      <ul className="flex flex-col py-1">
        {site.databases.map((db) => {
          const count = entries.filter((e) => e.database === db.id).length;
          const drafts = entries.filter((e) => e.database === db.id && e.status === "draft").length;
          const template = db.pageTemplates?.[0] ? site.pages.find((p) => p.id === db.pageTemplates![0]!.page) : undefined;
          return (
            <li key={db.id}>
              <button type="button" onClick={() => onOpen(db.id)} className="w-full flex items-center gap-2 h-[34px] pl-3 pr-2 text-left text-sm text-ink hover:bg-hover" title="Ouvrir la base en vue tableur">
                <DatabaseIcon size={13} strokeWidth={1.75} className="text-dim shrink-0" />
                <span className="flex-1 min-w-0 truncate">{db.name[locale] ?? db.slug}</span>
                <span className="text-2xs text-dim tabular-nums" title={drafts ? `${drafts} brouillon${drafts > 1 ? "s" : ""}` : undefined}>{count}{drafts ? ` · ${drafts} br.` : ""}</span>
                <Table2 size={13} strokeWidth={1.75} className="text-dim shrink-0" />
              </button>
              {template ? <div className="pl-8 pr-2 -mt-1 pb-1 text-2xs text-dim truncate">Modèle de page : {template.name[locale] ?? template.path} · /{db.slug}/…</div> : null}
            </li>
          );
        })}
      </ul>
      {forms.length ? (
        <div className="border-t border-line">
          <Eyebrow as="div" className="flex items-center gap-1.5 h-7 px-3 mt-1" title="Les envois de chaque formulaire du site"><Inbox size={11} aria-hidden />Messages reçus</Eyebrow>
          <ul className="flex flex-col pb-1">
            {forms.map((f) => {
              const dbId = formDatabaseId(f.formId);
              const all = entries.filter((e) => e.database === dbId);
              const fresh = all.filter((e) => e.status === "draft").length;
              return (
                <li key={f.formId}>
                  <button type="button" onClick={() => onOpen(dbId)} className="w-full flex items-center gap-2 h-[34px] pl-3 pr-2 text-left text-sm text-ink hover:bg-hover" title={`Formulaire de la page « ${f.where} »`}>
                    <Inbox size={13} strokeWidth={1.75} className="text-dim shrink-0" />
                    <span className="flex-1 min-w-0 truncate">{f.node.name ?? "Formulaire"} <span className="text-dim">· {f.where}</span></span>
                    {fresh ? <span className="h-4 min-w-4 px-1 rounded-full bg-accent text-accent-ink text-2xs grid place-items-center tabular-nums" title={`${fresh} nouveau${fresh > 1 ? "x" : ""}`}>{fresh}</span> : <span className="text-2xs text-dim tabular-nums">{all.length}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="px-3 py-2 border-t border-line flex flex-col gap-2">
        {creating ? (
          <form className="flex flex-col gap-1.5" onSubmit={(e) => { e.preventDefault(); create(); }}>
            <TextInput autoFocus value={name} placeholder="Nom de la base (Projets, Articles…)" onValueChange={setName} onKeyDown={(e) => { if (e.key === "Escape") setCreating(false); }} />
            <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer" title="Chaque entrée aura sa page, à l'adresse /<base>/<adresse de l'entrée>. Sans page, la base ne s'affiche que dans des vues."><input type="checkbox" checked={withPage} onChange={(e) => setWithPage(e.target.checked)} className="accent-[var(--color-accent)]" />Une page par entrée</label>
            <div className="flex gap-1"><Button size="sm" variant="primary" type="submit" disabled={!name.trim()}>Créer</Button><Button size="sm" variant="ghost" type="button" onClick={() => setCreating(false)}>Annuler</Button></div>
          </form>
        ) : (
          readOnly ? null : <Button size="sm" icon={Plus} onClick={() => setCreating(true)}>Nouvelle base</Button>
        )}
        <Hint>Une base, c&apos;est un tableau : des champs en colonnes, des entrées en lignes. Les pages l&apos;affichent avec une vue de base de données, ou un modèle de page par entrée.</Hint>
      </div>
    </div>
  );
}
