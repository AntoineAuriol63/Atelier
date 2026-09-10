"use client";
import { TokenSelect } from "@/ui/controls";

import { useState } from "react";
import { Plus, Puzzle, Trash2, Unlink, X } from "lucide-react";
import type { CommitOptions, ComponentDef, Node, Op, PropDef, Site, VariantAxis } from "@atelier/model";
import { componentUsages, instanceVariant, planDeleteComponent, slugify } from "@atelier/model";
import { Button, Field, FieldGroup, Hint, IconButton, Section, Select, TextArea, TextInput, Toggle, NumberInput, askConfirm, Eyebrow } from "@/ui";
import { AssetPicker } from "./AppearancePanel";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;

const PROP_TYPES: { value: PropDef["type"]; label: string }[] = [
  { value: "text", label: "Texte" }, { value: "richtext", label: "Texte long" }, { value: "number", label: "Nombre" }, { value: "boolean", label: "Oui / non" },
  { value: "image", label: "Image" }, { value: "link", label: "Adresse (lien)" }, { value: "select", label: "Choix" }, { value: "color", label: "Couleur" },
];

/** Réglages de l'élément sélectionné vis-à-vis des composants : en faire un composant, ou détacher l'instance. */
export function MakeComponentRow({ node, isInstance, onMake, onDetach }: { node: Node; isInstance: boolean; onMake?: (name: string) => void; onDetach?: () => void }) {
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  if (isInstance) return onDetach ? <Button size="sm" variant="ghost" icon={Unlink} onClick={onDetach} title="Remplacer cette instance par une copie indépendante : elle ne suivra plus le composant">Détacher du composant</Button> : null;
  if (!onMake) return null;
  if (!naming) return <Button size="sm" variant="ghost" icon={Puzzle} onClick={() => { setName(node.name ?? nodeLabel(node)); setNaming(true); }} title="Réutiliser cet élément ailleurs : toutes ses copies changeront ensemble">En faire un composant…</Button>;
  return (
    <form className="flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); if (name.trim()) { onMake(name.trim()); setNaming(false); } }}>
      <TextInput className="flex-1" value={name} placeholder="Nom du composant" onValueChange={setName} autoFocus />
      <Button size="sm" variant="primary" type="submit" disabled={!name.trim()}>Créer</Button>
      <IconButton size="sm" label="Annuler" icon={X} onClick={() => setNaming(false)} />
    </form>
  );
}

/** Instance : variante et valeurs des propriétés du composant. */
export function InstancePanel({ site, node, commit, onEnterComponent }: { site: Site; node: Node; commit: Commit; onEnterComponent?: (id: string) => void }) {
  const locale = site.settings.defaultLocale;
  const cmp = site.components.find((c) => c.id === node.props.component);
  if (!cmp) return <Section title="Composant"><Hint>Composant introuvable : il a été supprimé. Détachez ou supprimez cette instance.</Hint></Section>;
  const values = (node.props.values ?? {}) as Record<string, unknown>;
  const variant = instanceVariant(cmp, node);
  const setValue = (p: PropDef, v: unknown) => commit({ op: "node.set", id: node.id, path: `props.values.${p.name}`, value: v === "" ? undefined : v }, { coalesceKey: `value:${node.id}:${p.name}`, label: `${p.label[locale] ?? p.name}` });
  const setVariant = (axis: string, v: string) => commit({ op: "node.set", id: node.id, path: `props.variant.${axis}`, value: v }, { label: `Variante ${axis} : ${v}` });
  const usages = componentUsages(site, cmp.id).length;
  return (
    <Section title={`Composant · ${cmp.name}`} hint="Une instance affiche le composant avec ses propres valeurs. Modifier le composant change toutes ses instances.">
      <FieldGroup>
        {(cmp.variants ?? []).map((axis) => (
          <Field key={axis.name} label={axis.name}><Select value={variant[axis.name] ?? axis.default} options={axis.values.map((v) => ({ value: v, label: v }))} onValueChange={(v) => setVariant(axis.name, v)} /></Field>
        ))}
        {cmp.props.map((p) => {
          const label = p.label[locale] ?? p.name;
          const v = values[p.name] ?? p.default;
          switch (p.type) {
            case "boolean": return <Field key={p.name} label={label}><Toggle checked={!!v} label={v ? "Oui" : "Non"} onChange={(b) => setValue(p, b)} /></Field>;
            case "number": return <Field key={p.name} label={label}><NumberInput value={typeof v === "number" ? v : ""} onValueChange={(n) => setValue(p, n === "" ? undefined : n)} /></Field>;
            case "select": return <Field key={p.name} label={label}><Select value={String(v ?? "")} options={(p.options ?? []).map((o) => ({ value: o, label: o }))} placeholder="—" onValueChange={(s) => setValue(p, s)} /></Field>;
            case "image": return <Field key={p.name} label={label} inline={false}><AssetPicker site={site} value={typeof v === "string" ? v : undefined} onChange={(id) => setValue(p, id ?? undefined)} /></Field>;
            case "richtext": return <Field key={p.name} label={label} inline={false}><TextArea value={String(v ?? "")} onValueChange={(s) => setValue(p, s)} /></Field>;
            case "color": return <Field key={p.name} label={label}><div className="flex items-center gap-1"><TextInput mono className="flex-1 min-w-0" value={String(v ?? "")} placeholder="#000000" onValueChange={(s) => setValue(p, s)} /><TokenSelect site={site} group="color" onPick={(t) => setValue(p, t)} /></div></Field>;
            default: return <Field key={p.name} label={label}><TextInput value={String(v ?? "")} placeholder={typeof p.default === "string" ? p.default : ""} onValueChange={(s) => setValue(p, s)} /></Field>;
          }
        })}
      </FieldGroup>
      {!cmp.props.length && !cmp.variants?.length ? <Hint>Ce composant n&apos;expose ni propriété ni variante. Ouvrez-le (« Modifier le composant ») pour en déclarer : une propriété « Titre » reliée à son titre, une variante « style » avec ses couleurs…</Hint> : null}
      <div className="flex items-center gap-2 text-xs text-muted">
        <span>{usages} instance{usages > 1 ? "s" : ""} dans le site</span>
        {onEnterComponent ? <button type="button" onClick={() => onEnterComponent(cmp.id)} className="text-accent hover:underline">Modifier le composant</button> : null}
      </div>
    </Section>
  );
}

/** Définition du composant (racine sélectionnée) : nom, propriétés exposées, axes de variantes, suppression. */
export function ComponentPanel({ site, component, commit, onDeleted, notify }: { site: Site; component: ComponentDef; commit: Commit; onDeleted: () => void; notify?: (text: string, tone?: "danger" | "success" | "info") => void }) {
  const locale = site.settings.defaultLocale;
  const i = site.components.findIndex((c) => c.id === component.id);
  const set = (path: string, value: unknown, label: string, coalesce = true) => commit({ op: "site.set", path: `components.${i}.${path}`, value }, { label, coalesceKey: coalesce ? `cmp:${component.id}:${path}` : undefined });
  const [newProp, setNewProp] = useState("");
  const [newAxis, setNewAxis] = useState("");
  const usages = componentUsages(site, component.id).length;
  const addProp = () => {
    const label = newProp.trim(); if (!label) return;
    const base = slugify(label).replace(/-/g, "_") || "prop"; let name = base, k = 2; while (component.props.some((p) => p.name === name)) name = `${base}_${k++}`;
    set("props", [...component.props, { name, label: { [locale]: label }, type: "text" }], `Ajouter la propriété « ${label} »`, false); setNewProp("");
  };
  const updateProp = (idx: number, patch: Partial<PropDef>, label: string) => set(`props.${idx}`, { ...component.props[idx]!, ...patch }, label);
  const removeProp = (idx: number) => set("props", component.props.filter((_, k) => k !== idx), "Retirer la propriété", false);
  const axes = component.variants ?? [];
  const addAxis = () => {
    const name = slugify(newAxis.trim()); if (!name || axes.some((a) => a.name === name)) return;
    set("variants", [...axes, { name, values: ["defaut"], default: "defaut" }], `Ajouter l'axe « ${name} »`, false); setNewAxis("");
  };
  const updateAxis = (idx: number, patch: Partial<VariantAxis>, label: string) => set(`variants.${idx}`, { ...axes[idx]!, ...patch }, label);
  const removeAxis = async (idx: number) => {
    const a = axes[idx]!;
    const hasStyles = Object.keys(component.variantStyles ?? {}).some((k) => k.startsWith(`${a.name}:`));
    if (hasStyles && !(await askConfirm({ title: `Retirer l'axe « ${a.name} » ?`, message: "Les styles réglés pour ses valeurs seront perdus.", action: "Retirer", danger: true }))) return;
    const rest = Object.fromEntries(Object.entries(component.variantStyles ?? {}).filter(([k]) => !k.startsWith(`${a.name}:`)));
    commit({ op: "batch", ops: [{ op: "site.set", path: `components.${i}.variants`, value: axes.filter((_, k) => k !== idx) }, { op: "site.set", path: `components.${i}.variantStyles`, value: Object.keys(rest).length ? rest : undefined }], label: `Retirer l'axe « ${a.name} »` });
  };
  const remove = async () => {
    const plan = planDeleteComponent(site, component.id);
    if (!plan.ok) { notify?.(plan.reason); return; }
    if (!(await askConfirm({ title: `Supprimer le composant « ${component.name} » ?`, message: "Il n'est utilisé nulle part. Cette action est réversible avec Annuler.", action: "Supprimer", danger: true }))) return;
    commit({ op: "batch", ops: plan.ops, label: plan.label }); onDeleted();
  };
  return (
    <Section title="Composant" hint="Ce que vous réglez ici vaut pour toutes les instances. Les propriétés donnent à chaque instance ses propres valeurs ; les variantes, des jeux de styles au choix.">
      <FieldGroup>
        <Field label="Nom"><TextInput value={component.name} onValueChange={(v) => set("name", v, "Renommer le composant")} /></Field>
        <Field label="Description"><TextInput value={component.description ?? ""} onValueChange={(v) => set("description", v || undefined, "Décrire le composant")} /></Field>
      </FieldGroup>
      <div className="flex flex-col gap-1.5">
        <Eyebrow as="span">Propriétés</Eyebrow>
        {component.props.map((p, idx) => (
          <div key={p.name} className="grid grid-cols-[1fr_auto_24px] gap-1 items-center">
            <TextInput value={p.label[locale] ?? p.name} onValueChange={(v) => updateProp(idx, { label: { ...p.label, [locale]: v } }, "Renommer la propriété")} />
            <Select value={p.type} options={PROP_TYPES} onValueChange={(t) => updateProp(idx, { type: t as PropDef["type"] }, "Type de la propriété")} />
            <IconButton size="sm" label="Retirer" icon={X} onClick={() => removeProp(idx)} />
            {p.type === "select" ? <TextInput className="col-span-3" value={(p.options ?? []).join(", ")} placeholder="Choix possibles, séparés par des virgules" onValueChange={(v) => updateProp(idx, { options: v.split(",").map((s) => s.trim()).filter(Boolean) }, "Choix de la propriété")} /> : null}
            {p.type === "text" || p.type === "richtext" || p.type === "link" || p.type === "color" ? <TextInput className="col-span-3" value={typeof p.default === "string" ? p.default : ""} placeholder="Valeur par défaut" onValueChange={(v) => updateProp(idx, { default: v || undefined }, "Valeur par défaut")} /> : null}
            <span className="col-span-3 font-mono text-2xs text-dim">{p.name}</span>
          </div>
        ))}
        <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); addProp(); }}>
          <TextInput className="flex-1" value={newProp} placeholder="Nouvelle propriété : « Titre », « Image »…" onValueChange={setNewProp} />
          <Button size="sm" icon={Plus} type="submit" disabled={!newProp.trim()}>Ajouter</Button>
        </form>
        <Hint>Puis sélectionnez un texte, une image ou un lien du composant et reliez-le à la propriété (section « Propriété du composant »).</Hint>
      </div>
      <div className="flex flex-col gap-1.5">
        <Eyebrow as="span">Variantes</Eyebrow>
        {axes.map((a, idx) => (
          <div key={a.name} className="grid grid-cols-[88px_1fr_24px] gap-1 items-center">
            <span className="font-mono text-xs text-muted truncate" title={a.name}>{a.name}</span>
            <TextInput value={a.values.join(", ")} placeholder="valeurs, séparées par des virgules" onValueChange={(v) => { const values = v.split(",").map((s) => slugify(s.trim())).filter(Boolean); updateAxis(idx, { values, default: values.includes(a.default) ? a.default : values[0] ?? a.default }, `Valeurs de « ${a.name} »`); }} />
            <IconButton size="sm" label="Retirer l'axe" icon={X} onClick={() => void removeAxis(idx)} />
            <span className="text-2xs text-dim">par défaut</span>
            <Select value={a.default} options={a.values.map((v) => ({ value: v, label: v }))} onValueChange={(v) => updateAxis(idx, { default: v }, `Défaut de « ${a.name} »`)} />
            <span />
          </div>
        ))}
        <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); addAxis(); }}>
          <TextInput className="flex-1" value={newAxis} placeholder="Nouvel axe : « style », « taille »…" onValueChange={setNewAxis} />
          <Button size="sm" icon={Plus} type="submit" disabled={!newAxis.trim()}>Ajouter</Button>
        </form>
        <Hint>Choisissez ensuite une variante dans la barre « Variante » de l&apos;inspecteur : les styles que vous réglez alors ne valent que pour elle. Chaque instance choisit sa variante.</Hint>
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{usages} instance{usages > 1 ? "s" : ""} dans le site</span>
        <Button size="sm" variant="ghost" icon={Trash2} onClick={() => void remove()} disabled={usages > 0} title={usages ? "Détachez ou supprimez ses instances d'abord" : "Supprimer ce composant"}>Supprimer</Button>
      </div>
    </Section>
  );
}

/** Nœud d'un composant : relier son contenu à une propriété du composant. */
export function PropBindingPanel({ site, node, component, commit }: { site: Site; node: Node; component: ComponentDef; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const key = node.type === "text" ? "content" : node.type === "image" ? "asset" : node.type === "link" ? "href" : null;
  if (!key) return null;
  const accept: PropDef["type"][] = node.type === "text" ? ["text", "richtext", "number"] : node.type === "image" ? ["image"] : ["link"];
  const candidates = component.props.filter((p) => accept.includes(p.type));
  const current = node.bindings?.[key];
  const bound = current?.source === "prop" ? current.path : "";
  const setBinding = (name: string) => {
    const next = { ...(node.bindings ?? {}) };
    if (name) next[key] = { source: "prop", path: name }; else delete next[key];
    commit({ op: "node.set", id: node.id, path: "bindings", value: Object.keys(next).length ? next : undefined }, { label: name ? `Relier à « ${name} »` : "Délier" });
  };
  return (
    <Section title="Propriété du composant" defaultOpen={!!bound || candidates.length > 0} hint="Le contenu de cet élément vient d'une propriété : chaque instance donne la sienne.">
      {candidates.length ? (
        <Field label={node.type === "text" ? "Texte" : node.type === "image" ? "Image" : "Adresse"}><Select value={bound} placeholder="Contenu fixe" options={candidates.map((p) => ({ value: p.name, label: p.label[locale] ?? p.name }))} onValueChange={setBinding} /></Field>
      ) : <Hint>Aucune propriété de ce type sur le composant. Déclarez-en une sur la racine du composant (section Composant).</Hint>}
    </Section>
  );
}
