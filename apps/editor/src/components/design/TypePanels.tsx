"use client";

import type { CommitOptions, FilterExpr, LinkTarget, Node, Op, Site, ViewConfig } from "@atelier/model";
import { newId } from "@atelier/model";
import { Plus, X } from "lucide-react";
import { Button, Field, FieldGroup, Hint, IconButton, NumberInput, Section, Select, TextInput, Toggle } from "@/ui";
import { Segmented } from "@/ui/controls";
import { AssetPicker } from "./AppearancePanel";
import { useImageImport, useMediaLibrary } from "@/components/MediaLibrary";

type Commit = (op: Op, opts?: CommitOptions) => void;

const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "span", "label"].map((t) => ({ value: t, label: t === "p" ? "Paragraphe (p)" : t.startsWith("h") ? `Titre ${t.slice(1)} (${t})` : t === "blockquote" ? "Citation" : t }));
const BOX_TAGS = [["div", "Bloc neutre (div)"], ["section", "Section"], ["header", "En-tête"], ["footer", "Pied de page"], ["nav", "Navigation"], ["main", "Contenu principal"], ["article", "Article"], ["aside", "Aparté"], ["figure", "Figure"]].map(([value, label]) => ({ value: value!, label: label! }));

/** Balise HTML d'un texte ou d'une boîte : le référencement se règle aussi à la main (D38). */
export function TagPanel({ node, commit }: { node: Node; commit: Commit }) {
  if (node.type !== "text" && node.type !== "box") return null;
  const options = node.type === "text" ? TEXT_TAGS : BOX_TAGS;
  return (
    <Field label="Balise HTML" hint="Ce qu'est l'élément pour le navigateur et les moteurs de recherche : titre de niveau 1 à 6, paragraphe, section… Ne change pas le style.">
      <Select value={String(node.props.tag ?? (node.type === "text" ? "p" : "div"))} options={options} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.tag", value: v }, { label: "Changer la balise" })} />
    </Field>
  );
}

export function ImagePanel({ site, node, commit, editMode = "design" }: { site: Site; node: Node; commit: Commit; editMode?: "write" | "design" }) {
  const locale = site.settings.defaultLocale;
  const library = useMediaLibrary();
  const { importFiles, busy, error } = useImageImport(site, commit);
  const bound = !!node.bindings?.asset;
  const alt = (node.props.alt as Record<string, string> | undefined)?.[locale] ?? "";
  const setAsset = (id: string | null) => commit({ op: "node.set", id: node.id, path: "props.asset", value: id }, { label: "Changer l'image" });
  // Importer depuis le panneau pose directement la première image importée sur l'élément.
  const importHere = async (files: File[]) => { const added = await importFiles(files); if (added[0]) setAsset(added[0].id); };
  return (
    <Section title="Image">
      {bound ? <Hint>Cette image est liée à un champ de base de données ({node.bindings!.asset!.path}). Le choix se fait dans la base.</Hint> : (
        <>
          <AssetPicker site={site} value={node.props.asset as string | null} onChange={setAsset} onImport={(files) => void importHere(files)} busy={busy} onOpenLibrary={library ? () => library.open({ value: node.props.asset as string | null, onPick: setAsset }) : undefined} />
          {error ? <p className="text-xs text-danger">{error}</p> : null}
        </>
      )}
      <FieldGroup>
        {!node.bindings?.alt ? (
          <Field label="Texte alt." hint="Description pour l'accessibilité et le référencement. Vide : celui de l'image dans la bibliothèque est utilisé.">
            <TextInput value={alt} placeholder={site.assets.find((a) => a.id === node.props.asset)?.alt?.[locale] ?? ""} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.alt.${locale}`, value: v }, { coalesceKey: `alt:${node.id}`, label: "Texte alternatif" })} />
          </Field>
        ) : null}
        <Field label="Ajustement">
          <Segmented value={String(node.props.fit ?? "")} options={[{ value: "cover", label: "Couvrir" }, { value: "contain", label: "Contenir" }, { value: "fill", label: "Étirer" }]} onChange={(v) => commit({ op: "node.set", id: node.id, path: "props.fit", value: v }, { label: "Ajustement" })} />
        </Field>
        {editMode === "design" ? <><Field label="Ratio" hint="Largeur / hauteur, par exemple 4 / 5">
          <TextInput mono value={String(node.props.ratio ?? "")} placeholder="auto" onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.ratio", value: v || undefined }, { coalesceKey: `ratio:${node.id}`, label: "Ratio" })} />
        </Field>
        <Field label="Priorité" hint="Charger en premier (image visible dès l'arrivée)">
          <Toggle checked={!!node.props.priority} label="Chargement prioritaire" onChange={(v) => commit({ op: "node.set", id: node.id, path: "props.priority", value: v ? true : undefined }, { label: "Priorité" })} />
        </Field></> : null}
      </FieldGroup>
    </Section>
  );
}

const KINDS = [{ value: "page", label: "Page du site" }, { value: "url", label: "Adresse web" }, { value: "email", label: "Email" }, { value: "phone", label: "Téléphone" }, { value: "anchor", label: "Ancre" }];

export function LinkPanel({ site, node, commit }: { site: Site; node: Node; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const isButton = node.props.tag === "button";
  const href = (node.props.href ?? { kind: "url", url: "#" }) as LinkTarget;
  const set = (h: LinkTarget) => commit({ op: "node.set", id: node.id, path: "props.href", value: h }, { coalesceKey: `href:${node.id}`, label: "Cible du lien" });
  if (node.bindings?.href) return <Section title="Lien"><Hint>La cible est liée à une donnée ({node.bindings.href.path}).</Hint></Section>;
  return (
    <Section title={isButton ? "Bouton" : "Lien"}>
      <FieldGroup>
        <Field label="Rôle">
          <Segmented value={isButton ? "button" : "a"} options={[{ value: "a", label: "Lien" }, { value: "button", label: "Formulaire" }]} onChange={(v) => { if (v) commit({ op: "node.set", id: node.id, path: "props.tag", value: v }, { label: "Rôle" }); }} />
        </Field>
        {isButton ? (
          <Field label="Action"><Select value={String(node.props.type ?? "button")} options={[{ value: "submit", label: "Envoyer le formulaire" }, { value: "button", label: "Aucune (interaction)" }]} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.type", value: v })} /></Field>
        ) : (
          <>
            <Field label="Cible"><Select value={href.kind} options={KINDS} onValueChange={(k) => set(k === "page" ? { kind: "page", page: site.pages[0]!.id } : k === "email" ? { kind: "email", to: "" } : k === "phone" ? { kind: "phone", number: "" } : k === "anchor" ? { kind: "anchor", node: "" } : { kind: "url", url: "https://" })} /></Field>
            {href.kind === "page" ? <Field label="Page"><Select value={href.page} options={site.pages.filter((p) => p.kind === "static").map((p) => ({ value: p.id, label: p.name[locale] ?? p.path }))} onValueChange={(id) => set({ kind: "page", page: id })} /></Field> : null}
            {href.kind === "url" ? <Field label="Adresse"><TextInput mono value={href.url} onValueChange={(u) => set({ kind: "url", url: u })} /></Field> : null}
            {href.kind === "email" ? <Field label="Email"><TextInput value={href.to} onValueChange={(u) => set({ kind: "email", to: u })} /></Field> : null}
            {href.kind === "phone" ? <Field label="Numéro"><TextInput value={href.number} onValueChange={(u) => set({ kind: "phone", number: u })} /></Field> : null}
            {href.kind === "anchor" ? <Field label="Identifiant" hint="Identifiant d'un élément de la page"><TextInput mono value={href.node} onValueChange={(u) => set({ kind: "anchor", node: u })} /></Field> : null}
            <Field label="Ouverture">
              <Segmented value={node.props.newTab ? "1" : undefined} options={[{ value: "1", label: "Nouvel onglet" }]} onChange={(v) => commit({ op: "node.set", id: node.id, path: "props.newTab", value: v ? true : undefined }, { label: "Nouvel onglet" })} />
            </Field>
          </>
        )}
      </FieldGroup>
    </Section>
  );
}

const LAYOUTS: { value: ViewConfig["layout"]; label: string }[] = [{ value: "gallery", label: "Grille" }, { value: "list", label: "Liste" }, { value: "carousel", label: "Défilement" }];
const OPS: { value: FilterCond["op"]; label: string; needsValue: boolean }[] = [
  { value: "eq", label: "est", needsValue: true }, { value: "ne", label: "n'est pas", needsValue: true }, { value: "contains", label: "contient", needsValue: true },
  { value: "gt", label: "est supérieur à", needsValue: true }, { value: "gte", label: "est au moins", needsValue: true }, { value: "lt", label: "est inférieur à", needsValue: true }, { value: "lte", label: "est au plus", needsValue: true },
  { value: "isEmpty", label: "est vide", needsValue: false }, { value: "isNotEmpty", label: "n'est pas vide", needsValue: false },
];
type FilterCond = Extract<FilterExpr, { field: string }>;
const isCond = (f: FilterExpr): f is FilterCond => "field" in f;

/** Le filtre de l'éditeur est une liste plate de conditions (« et »). Une expression plus riche est conservée mais non éditable ici. */
function readFilter(f: FilterExpr | undefined): { conds: FilterCond[]; advanced: boolean } {
  if (!f) return { conds: [], advanced: false };
  if (isCond(f)) return { conds: [f], advanced: false };
  if ("and" in f && f.and.every(isCond)) return { conds: f.and as FilterCond[], advanced: false };
  return { conds: [], advanced: true };
}
const writeFilter = (conds: FilterCond[]): FilterExpr | undefined => (conds.length === 0 ? undefined : conds.length === 1 ? conds[0] : { and: conds });

export function CollectionPanel({ site, node, commit, editMode = "design" }: { site: Site; node: Node; commit: Commit; editMode?: "write" | "design" }) {
  const locale = site.settings.defaultLocale;
  const view = (node.props.view ?? { layout: "gallery" }) as ViewConfig;
  const db = site.databases.find((d) => d.id === node.props.database);
  const fields = db?.fields ?? [];
  const setView = (patch: Partial<ViewConfig>, label = "Vue") => {
    const next: ViewConfig = { ...view, ...patch };
    (Object.keys(next) as (keyof ViewConfig)[]).forEach((k) => { if (next[k] === undefined) delete next[k]; });
    commit({ op: "node.set", id: node.id, path: "props.view", value: next }, { label });
  };
  const fieldOptions = fields.map((f) => ({ value: f.name, label: f.label[locale] ?? f.name }));
  const { conds, advanced } = readFilter(view.filter);
  const setConds = (c: FilterCond[]) => setView({ filter: writeFilter(c) }, "Filtre");
  const emptyText = (() => { const n = view.empty?.[0]; const c = n?.type === "text" ? (n.props.content as Record<string, { t: string; v?: string }[]> | undefined)?.[locale] : undefined; return view.empty?.length === 1 && c ? c.map((x) => x.v ?? "").join("") : ""; })();
  const sorts = view.sort ?? [];
  const bps = site.settings.breakpoints;
  const cols = view.columns ?? { base: 3 };

  const ValueEditor = ({ cond, onChange }: { cond: FilterCond; onChange: (v: unknown) => void }) => {
    const f = fields.find((x) => x.name === cond.field);
    const v = cond.value;
    if (f?.type === "select" || f?.type === "multiSelect") return <Select className="flex-1" value={typeof v === "string" ? v : ""} placeholder="Choisir" options={(f.options ?? []).map((o) => ({ value: o.value, label: o.label[locale] ?? o.value }))} onValueChange={onChange} />;
    if (f?.type === "boolean") return <Select className="flex-1" value={v === true ? "1" : v === false ? "0" : ""} placeholder="Choisir" options={[{ value: "1", label: "Oui" }, { value: "0", label: "Non" }]} onValueChange={(s) => onChange(s === "1")} />;
    if (f?.type === "number" || f?.type === "position") return <NumberInput className="flex-1" value={typeof v === "number" ? v : ""} onValueChange={(n) => onChange(n === "" ? undefined : n)} />;
    if (f?.type === "relation") {
      const isPageEntry = typeof v === "object" && v !== null && "page" in (v as object);
      return <Select className="flex-1" value={isPageEntry ? "@page" : typeof v === "string" ? v : ""} placeholder="Choisir" options={[{ value: "@page", label: "L'entrée de la page" }]} onValueChange={(s) => onChange(s === "@page" ? { page: "entry" } : s || undefined)} />;
    }
    return <TextInput className="flex-1" value={typeof v === "string" ? v : ""} onValueChange={(s) => onChange(s || undefined)} placeholder="Valeur" />;
  };

  return (
    <Section title="Vue de base de données" hint="Quelle base, quelles entrées, dans quel ordre. La carte répétée se dessine dans l'aperçu.">
      <FieldGroup>
        <Field label="Base"><Select value={String(node.props.database ?? "")} placeholder="Choisir" options={site.databases.map((d) => ({ value: d.id, label: d.name[locale] ?? d.slug }))} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.database", value: v }, { label: "Base de la vue" })} /></Field>
        <Field label="Filtre" hint="Seules les entrées qui remplissent toutes les conditions s'affichent." inline={false}>
          {advanced ? <Hint>Ce filtre a été écrit en code (ou / imbrication) : il s&apos;applique mais ne se modifie pas ici.</Hint> : (
            <div className="flex flex-col gap-1">
              {conds.map((c, i) => {
                const op = OPS.find((o) => o.value === c.op) ?? OPS[0]!;
                const set = (patch: Partial<FilterCond>) => setConds(conds.map((x, j) => (j === i ? { ...x, ...patch } : x)));
                return (
                  <div key={i} className="flex flex-col gap-1 p-1.5 rounded-xs bg-surface border border-line">
                    <div className="flex gap-1">
                      <Select className="flex-1" value={c.field} options={fieldOptions} onValueChange={(field) => set({ field, value: undefined })} />
                      <Select className="w-[132px]" value={c.op} options={OPS.map((o) => ({ value: o.value, label: o.label }))} onValueChange={(o) => set({ op: o as FilterCond["op"], value: OPS.find((x) => x.value === o)?.needsValue ? c.value : undefined })} />
                      <IconButton size="sm" label="Retirer la condition" icon={X} onClick={() => setConds(conds.filter((_, j) => j !== i))} />
                    </div>
                    {op.needsValue ? <div className="flex gap-1"><ValueEditor cond={c} onChange={(value) => set({ value })} /></div> : null}
                  </div>
                );
              })}
              <Button size="sm" variant="ghost" icon={Plus} disabled={!fields.length} onClick={() => setConds([...conds, { field: fields[0]!.name, op: "eq" }])}>Condition</Button>
            </div>
          )}
        </Field>
        <Field label="Tri" inline={false}>
          <div className="flex flex-col gap-1">
            {sorts.map((s, i) => (
              <div key={i} className="flex gap-1">
                <Select className="flex-1" value={s.field} options={fieldOptions} onValueChange={(field) => setView({ sort: sorts.map((x, j) => (j === i ? { ...x, field } : x)) }, "Tri")} />
                <Select className="w-[112px]" value={s.dir} options={[{ value: "asc", label: "Croissant" }, { value: "desc", label: "Décroissant" }]} onValueChange={(dir) => setView({ sort: sorts.map((x, j) => (j === i ? { ...x, dir: dir as "asc" | "desc" } : x)) }, "Tri")} />
                <IconButton size="sm" label="Retirer ce tri" icon={X} onClick={() => setView({ sort: sorts.filter((_, j) => j !== i).length ? sorts.filter((_, j) => j !== i) : undefined }, "Tri")} />
              </div>
            ))}
            {sorts.length < 3 ? <Button size="sm" variant="ghost" icon={Plus} disabled={!fields.length} onClick={() => setView({ sort: [...sorts, { field: fields.find((f) => !sorts.some((x) => x.field === f.name))?.name ?? fields[0]!.name, dir: "asc" }] }, "Tri")}>{sorts.length ? "Puis par" : "Trier par"}</Button> : null}
          </div>
        </Field>
        <Field label="Limite" hint="Nombre maximal d'entrées affichées"><NumberInput className="w-24" min={1} value={view.limit ?? ""} placeholder="toutes" onValueChange={(n) => setView({ limit: n === "" ? undefined : n }, "Limite")} /></Field>
        <Field label="Si vide" hint="Texte affiché quand aucune entrée ne correspond"><TextInput value={emptyText} placeholder="Rien à afficher" onValueChange={(t) => setView({ empty: t ? [{ id: view.empty?.[0]?.id ?? newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: t }] } } }] : undefined }, "Texte si vide")} /></Field>
      </FieldGroup>
      {editMode === "design" ? (
        <FieldGroup>
          <Field label="Disposition"><Segmented value={view.layout} options={LAYOUTS} onChange={(l) => { if (l) setView({ layout: l as ViewConfig["layout"] }, "Disposition"); }} /></Field>
          {view.layout !== "list" ? (
            <Field label={view.layout === "carousel" ? "Visibles" : "Colonnes"} hint="Par point de rupture ; vide = comme le point de rupture au-dessus" inline={false}>
              <div className="flex gap-1 flex-wrap">
                {[{ id: "base", label: "Base" }, ...[...bps].sort((a, b) => b.maxWidth - a.maxWidth).map((b) => ({ id: b.id, label: b.name || b.id }))].map((bp) => (
                  <label key={bp.id} className="flex flex-col gap-0.5 text-2xs text-muted"><span>{bp.label}</span><NumberInput className="w-14" min={1} max={12} value={cols[bp.id] ?? ""} placeholder={bp.id === "base" ? "3" : "—"} onValueChange={(n) => { const next = { ...cols }; if (n === "") { if (bp.id !== "base") delete next[bp.id]; } else next[bp.id] = n; setView({ columns: next as ViewConfig["columns"] }, "Colonnes"); }} /></label>
                ))}
              </div>
            </Field>
          ) : null}
        </FieldGroup>
      ) : <Hint>Disposition et colonnes se règlent en mode Design.</Hint>}
    </Section>
  );
}

const FIELD_KINDS = [{ value: "text", label: "Texte court" }, { value: "email", label: "Email" }, { value: "tel", label: "Téléphone" }, { value: "number", label: "Nombre" }, { value: "date", label: "Date" }, { value: "textarea", label: "Texte long" }, { value: "select", label: "Liste de choix" }, { value: "checkbox", label: "Case à cocher" }];

/** Réglages d'un formulaire : message de succès, rappel du branchement (docs/formulaires.md). */
export function FormPanel({ site, node, commit }: { site: Site; node: Node; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const msg = (node.props.successMessage as Record<string, string> | undefined)?.[locale] ?? "";
  return (
    <Section title="Formulaire" hint="Les envois arrivent dans Données → Messages reçus, et par email si la notification est configurée.">
      <FieldGroup>
        <Field label="Après l'envoi" hint="Message affiché à la place des champs"><TextInput value={msg} placeholder="Merci, votre message est bien envoyé." onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.successMessage.${locale}`, value: v || undefined }, { coalesceKey: `form-ok:${node.id}`, label: "Message de succès" })} /></Field>
        <Field label="Destinataire" hint="Adresse(s) email qui reçoivent chaque envoi, séparées par des virgules. Vide : le destinataire par défaut d'Atelier."><TextInput mono value={String(node.props.notifyTo ?? "")} placeholder="contact@exemple.fr" onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.notifyTo", value: v.trim() || undefined }, { coalesceKey: `form-to:${node.id}`, label: "Destinataire du formulaire" })} /></Field>
      </FieldGroup>
      <Hint>Ajoutez des champs avec « / » ou l&apos;onglet Ajouter, puis réglez chacun (libellé, sorte, obligatoire). Un bouton avec le type « envoi » déclenche l&apos;envoi.</Hint>
    </Section>
  );
}

/** Réglages d'un champ de formulaire : libellé, clé, sorte, obligatoire, aide, options. */
export function FieldPanel({ site, node, commit, editMode = "design" }: { site: Site; node: Node; commit: Commit; editMode?: "write" | "design" }) {
  const locale = site.settings.defaultLocale;
  const set = (path: string, value: unknown, label: string, coalesce?: boolean) => commit({ op: "node.set", id: node.id, path, value }, { label, coalesceKey: coalesce ? `${path}:${node.id}` : undefined });
  const kind = String(node.props.fieldType ?? "text");
  const options = ((node.props.options as { value: string; label: Record<string, string> }[] | undefined) ?? []).map((o) => o.label[locale] ?? o.value).join(", ");
  return (
    <Section title="Champ">
      <FieldGroup>
        <Field label="Libellé"><TextInput value={(node.props.label as Record<string, string> | undefined)?.[locale] ?? ""} onValueChange={(v) => set(`props.label.${locale}`, v || undefined, "Libellé du champ", true)} /></Field>
        {editMode === "design" ? <Field label="Clé" hint="Nom technique de la valeur reçue (name, email, message…)"><TextInput mono value={String(node.props.name ?? "")} onValueChange={(v) => set("props.name", v.replace(/[^a-zA-Z0-9_-]/g, "") || undefined, "Clé du champ", true)} /></Field> : null}
        <Field label="Sorte"><Select value={kind} options={FIELD_KINDS} onValueChange={(v) => set("props.fieldType", v, "Sorte du champ")} /></Field>
        <Field label="Aide" hint="Texte dans le champ vide"><TextInput value={(node.props.placeholder as Record<string, string> | undefined)?.[locale] ?? ""} onValueChange={(v) => set(`props.placeholder.${locale}`, v || undefined, "Aide du champ", true)} /></Field>
        <Field label="Obligatoire"><Toggle checked={!!node.props.required} label="Obligatoire" onChange={(v) => set("props.required", v ? true : undefined, "Champ obligatoire")} /></Field>
        {kind === "select" ? <Field label="Choix" hint="Séparés par des virgules"><TextInput value={options} onValueChange={(v) => set("props.options", v.split(",").map((x) => x.trim()).filter(Boolean).map((l) => ({ value: l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || l, label: { [locale]: l } })), "Choix du champ", true)} /></Field> : null}
      </FieldGroup>
    </Section>
  );
}
