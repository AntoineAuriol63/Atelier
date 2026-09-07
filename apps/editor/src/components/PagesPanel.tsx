"use client";

import { useState } from "react";
import { Copy, Database as DatabaseIcon, FileText, Plus, Settings2, Trash2 } from "lucide-react";
import type { CommitOptions, Database, Node, Op, Page, Site } from "@atelier/model";
import { cloneWithNewIds, newId, templateOf } from "@atelier/model";
import { Button, Field, FieldGroup, Hint, IconButton, Select, TextInput } from "@/ui";
import { Segmented } from "@/ui/controls";
import { AssetPicker } from "@/components/design/AppearancePanel";
import { cx } from "@/ui/cx";

type Commit = (op: Op, opts?: CommitOptions) => void;

export function slugify(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Une page vierge : racine, en-tête et pied de page du site s'ils existent, un contenu principal avec un titre. */
function blankPage(site: Site, name: string): Page {
  const locale = site.settings.defaultLocale;
  const header = site.components.find((c) => /en-t[eê]te|header/i.test(c.name));
  const footer = site.components.find((c) => /pied|footer/i.test(c.name));
  const children: Node[] = [];
  if (header) children.push({ id: newId(), type: "instance", name: header.name, props: { component: header.id } });
  children.push({
    id: newId(), type: "box", name: "Contenu principal", props: { tag: "main" },
    style: { shared: site.sharedStyles.filter((s) => s.name === "Section").map((s) => s.id), base: { display: "flex", flexDirection: "column", gap: { token: "space.5" }, maxWidth: { token: "width.content" }, marginLeft: "auto", marginRight: "auto" } },
    children: [{ id: newId(), type: "text", props: { tag: "h1", content: { [locale]: [{ t: "text", v: name }] } } }],
  });
  if (footer) children.push({ id: newId(), type: "instance", name: footer.name, props: { component: footer.id } });
  return { id: newId(), name: { [locale]: name }, path: "/" + slugify(name), kind: "static", root: { id: newId(), type: "box", name: "Page", props: { tag: "div" }, children } };
}

/** La page par entrée d'une base : même squelette qu'une page vierge, avec le titre lié au champ titre. */
export function templatePage(site: Site, db: Database): Page {
  const locale = site.settings.defaultLocale;
  const page = blankPage(site, db.name[locale] ?? db.slug);
  const main = page.root.children?.find((c) => c.type === "box");
  const h1 = main?.children?.find((c) => c.type === "text");
  if (h1) { h1.bindings = { content: { source: "entry", path: db.titleField } }; h1.props = { ...h1.props, content: { [locale]: [{ t: "text", v: "Titre de l'entrée" }] } }; }
  return { ...page, kind: "template", path: `/${db.slug}/{${db.slugField ?? "slug"}}` };
}

export function PagesPanel({ site, pageId, onOpen, commit }: { site: Site; pageId: string; onOpen: (id: string) => void; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [settingsFor, setSettingsFor] = useState<string | null>(null);
  const setPages = (pages: Page[], label: string, opts?: CommitOptions) => commit({ op: "site.set", path: "pages", value: pages }, { label, ...opts });
  const pathTaken = (path: string, except?: string) => site.pages.some((p) => p.path === path && p.id !== except);
  /** Page fixe ↔ modèle de page d'une base : la page change de sorte, la base enregistre son modèle (D24). */
  const setRole = (p: Page, dbId: string | null) => {
    const databases = site.databases.map((d) => {
      const others = (d.pageTemplates ?? []).filter((t) => t.page !== p.id);
      if (d.id !== dbId) return others.length === (d.pageTemplates ?? []).length ? d : { ...d, pageTemplates: others.length ? others : undefined };
      return { ...d, pageTemplates: [{ page: p.id, slugPattern: `/${d.slug}/{${d.slugField ?? "slug"}}` }, ...others] };
    });
    const pages = site.pages.map((x) => (x.id === p.id ? { ...x, kind: dbId ? ("template" as const) : ("static" as const), path: dbId ? x.path : pathTaken(x.path, p.id) || x.path === "/" ? "/" + slugify(x.name[locale] ?? "page") : x.path } : x));
    commit({ op: "batch", label: dbId ? "Faire de la page un modèle" : "Revenir à une page fixe", ops: [{ op: "site.set", path: "pages", value: pages }, { op: "site.set", path: "databases", value: databases }] });
  };
  const setPattern = (p: Page, pattern: string) => {
    const t = templateOf(site, p.id);
    if (!t) return;
    const clean = "/" + pattern.replace(/^\/+/, "");
    commit({ op: "site.set", path: "databases", value: site.databases.map((d) => (d.id !== t.database.id ? d : { ...d, pageTemplates: (d.pageTemplates ?? []).map((x) => (x.page === p.id ? { ...x, slugPattern: clean } : x)) })) }, { label: "Motif d'adresse", coalesceKey: `tpl-pattern:${p.id}` });
  };

  const create = () => {
    const n = name.trim();
    if (!n) return;
    const page = blankPage(site, n);
    let path = page.path || "/page";
    let i = 2;
    while (pathTaken(path)) path = `${page.path}-${i++}`;
    setPages([...site.pages, { ...page, path }], `Créer la page « ${n} »`);
    setCreating(false); setName("");
    onOpen(page.id);
  };
  const duplicate = (p: Page) => {
    const { node: root } = cloneWithNewIds(p.root, newId);
    const copy: Page = { ...structuredClone(p), id: newId(), root, name: { ...p.name, [locale]: `${p.name[locale] ?? "Page"} (copie)` }, path: p.kind === "template" ? p.path : `${p.path === "/" ? "/accueil" : p.path}-copie` };
    let path = copy.path, i = 2;
    while (pathTaken(path)) path = `${copy.path}-${i++}`;
    setPages([...site.pages, { ...copy, path }], "Dupliquer la page");
    onOpen(copy.id);
  };
  const remove = (p: Page) => {
    if (site.pages.length <= 1) return;
    const tpl = templateOf(site, p.id);
    if (!window.confirm(tpl ? `Supprimer la page par entrée de « ${tpl.database.name[locale] ?? tpl.database.slug} » ? Les entrées n'auront plus de page (la base reste). ⌘Z l'annule.` : `Supprimer la page « ${p.name[locale] ?? p.path} » ? Cette action s'annule avec ⌘Z.`)) return;
    const rest = site.pages.filter((x) => x.id !== p.id);
    if (tpl) { commit({ op: "batch", label: "Supprimer la page par entrée", ops: [{ op: "site.set", path: "pages", value: rest }, { op: "site.set", path: "databases", value: site.databases.map((d) => (d.id !== tpl.database.id ? d : { ...d, pageTemplates: (d.pageTemplates ?? []).filter((t) => t.page !== p.id).length ? (d.pageTemplates ?? []).filter((t) => t.page !== p.id) : undefined })) }] }); }
    else setPages(rest, "Supprimer la page");
    if (p.id === pageId) onOpen(rest[0]!.id);
  };
  const update = (id: string, patch: Partial<Page>, label: string, coalesceKey?: string) => setPages(site.pages.map((p) => (p.id === id ? { ...p, ...patch } : p)), label, coalesceKey ? { coalesceKey } : undefined);

  return (
    <div className="pb-4">
      <ul>
        {[...site.pages.filter((p) => p.kind !== "template"), ...site.pages.filter((p) => p.kind === "template")].map((p, i, all) => {
          const active = p.id === pageId;
          const open = settingsFor === p.id;
          const tpl = p.kind === "template" ? templateOf(site, p.id) : undefined;
          const firstTemplate = p.kind === "template" && (i === 0 || all[i - 1]!.kind !== "template");
          return (
            <li key={p.id}>
              {firstTemplate ? <div className="flex items-center gap-1.5 h-7 px-3 mt-1 text-2xs uppercase tracking-[0.12em] text-dim border-t border-line" title="Une page par entrée d'une base : son contenu vient de l'entrée, son adresse aussi."><DatabaseIcon size={11} aria-hidden />Pages par entrée</div> : null}
              <div className={cx("group flex items-center gap-1 h-[28px] pl-3 pr-1 text-sm", active ? "bg-accent-soft text-ink" : "text-ink hover:bg-hover")}>
                <button type="button" onClick={() => onOpen(p.id)} className="flex-1 min-w-0 flex items-center gap-2 text-left h-full" title={tpl ? `Page par entrée de la base « ${tpl.database.name[locale] ?? tpl.database.slug} » · ${tpl.slugPattern}` : p.path}>
                  {p.kind === "template" ? <DatabaseIcon size={13} className={active ? "text-accent" : "text-muted"} aria-hidden /> : <FileText size={13} className={active ? "text-accent" : "text-muted"} aria-hidden />}
                  <span className="truncate">{p.name[locale] ?? p.path}</span>
                  <span className="ml-auto font-mono text-2xs text-dim truncate max-w-[40%]">{tpl ? tpl.slugPattern.replace(/\{\w+\}/g, "…") : p.kind === "template" ? "sans base" : p.path}</span>
                </button>
                <div className={cx("flex items-center", open ? "" : "opacity-0 group-hover:opacity-100 focus-within:opacity-100")}>
                  <IconButton size="sm" label="Réglages de la page" icon={Settings2} active={open} onClick={() => setSettingsFor(open ? null : p.id)} />
                  <IconButton size="sm" label="Dupliquer la page" icon={Copy} onClick={() => duplicate(p)} />
                  <IconButton size="sm" label={site.pages.length <= 1 ? "Impossible de supprimer la dernière page" : "Supprimer la page"} icon={Trash2} tone="danger" disabled={site.pages.length <= 1} onClick={() => remove(p)} />
                </div>
              </div>
              {open ? (
                <div className="px-3 py-2 bg-surface/60 border-y border-line">
                  <FieldGroup>
                    <Field label="Nom"><TextInput value={p.name[locale] ?? ""} onValueChange={(v) => update(p.id, { name: { ...p.name, [locale]: v } }, "Renommer la page", `page-name:${p.id}`)} /></Field>
                    <Field label="Adresse" hint={p.kind === "template" ? "Adresse définie par la base de données" : "Chemin de la page, commence par /"}>
                      <TextInput mono value={p.path} onValueChange={(v) => { const path = "/" + v.replace(/^\/+/, "").split("/").map(slugify).filter(Boolean).join("/"); if (p.kind !== "template" && !pathTaken(path, p.id)) update(p.id, { path }, "Adresse de la page", `page-path:${p.id}`); }} />
                    </Field>
                    <Field label="Rôle" hint="Une page fixe a une adresse. Un modèle de page s'affiche une fois par entrée d'une base, à l'adresse de l'entrée.">
                      <Select value={templateOf(site, p.id)?.database.id ? `tpl:${templateOf(site, p.id)!.database.id}` : "static"} options={[{ value: "static", label: "Page fixe" }, ...site.databases.map((d) => ({ value: `tpl:${d.id}`, label: `Modèle pour ${d.name[locale] ?? d.slug}` }))]} onValueChange={(v) => setRole(p, v.startsWith("tpl:") ? v.slice(4) : null)} />
                    </Field>
                    {templateOf(site, p.id) ? (
                      <Field label="Adresses" hint="Motif d'adresse des entrées ; {slug} est remplacé par le champ adresse de l'entrée">
                        <TextInput mono value={templateOf(site, p.id)!.slugPattern} onValueChange={(v) => setPattern(p, v)} />
                      </Field>
                    ) : null}
                    <Field label="Titre SEO" hint="Titre affiché dans l'onglet et les moteurs ; le suffixe du site est ajouté"><TextInput value={p.seo?.title?.[locale] ?? ""} placeholder={p.name[locale]} onValueChange={(v) => update(p.id, { seo: { ...p.seo, title: v ? { ...p.seo?.title, [locale]: v } : undefined } }, "Titre SEO", `page-seo-title:${p.id}`)} /></Field>
                    <Field label="Indexer" hint="Non : la page reste accessible mais demande aux moteurs de ne pas la lister"><Segmented value={p.seo?.index === false ? "0" : "1"} options={[{ value: "1", label: "Oui" }, { value: "0", label: "Non" }]} onChange={(v) => update(p.id, { seo: { ...p.seo, index: v === "0" ? false : undefined } }, "Indexation")} /></Field>
                    <Field label="Image sociale" hint="Image de partage de cette page (Open Graph)" inline={false}><AssetPicker site={site} value={p.seo?.image} onChange={(id) => update(p.id, { seo: { ...p.seo, image: id ?? undefined } }, "Image sociale")} /></Field>
                    <Field label="Description"><TextInput value={p.seo?.description?.[locale] ?? ""} onValueChange={(v) => update(p.id, { seo: { ...p.seo, description: v ? { ...p.seo?.description, [locale]: v } : undefined } }, "Description SEO", `page-seo-desc:${p.id}`)} /></Field>
                  </FieldGroup>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="px-2 pt-2">
        {creating ? (
          <form className="flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); create(); }}>
            <TextInput className="flex-1" value={name} placeholder="Nom de la page" onValueChange={setName} autoFocus onKeyDown={(e) => { if (e.key === "Escape") setCreating(false); }} />
            <Button type="submit" variant="primary" disabled={!name.trim()}>Créer</Button>
          </form>
        ) : (
          <Button className="w-full" icon={Plus} onClick={() => setCreating(true)}>Nouvelle page</Button>
        )}
        {creating ? <Hint>L&apos;adresse est déduite du nom ({name.trim() ? "/" + slugify(name) : "/…"}). L&apos;en-tête et le pied de page du site sont ajoutés automatiquement.</Hint> : null}
      </div>
    </div>
  );
}
