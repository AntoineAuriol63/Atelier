"use client";

import type { CommitOptions, DataSource, FieldType, Inline, Node, Op, Site } from "@atelier/model";
import { Field, FieldGroup, Hint, Section, Select } from "@/ui";

type Commit = (op: Op, opts?: CommitOptions) => void;
type BindKey = "content" | "asset" | "alt" | "href";

const TEXT_TYPES: FieldType[] = ["text", "richtext", "number", "date", "select", "multiSelect", "link", "color", "formula", "createdAt", "updatedAt", "position"];
const IMAGE_TYPES: FieldType[] = ["image"];
const LINK_TYPES: FieldType[] = ["link"];

/**
 * Liaison d'un élément à un champ de base de données (7.3) : le texte, l'image, son alternative ou la cible d'un lien
 * viennent de l'entrée du modèle de page, ou de chaque entrée d'une vue.
 */
export function BindingPanel({ site, node, source, commit }: { site: Site; node: Node; source: DataSource; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const db = source.database;
  const dbName = db.name[locale] ?? db.slug;
  const where = source.source === "item" ? `chaque entrée de la vue (${dbName})` : `l'entrée de la page (${dbName})`;
  const opts = (types: FieldType[]) => db.fields.filter((f) => types.includes(f.type)).map((f) => ({ value: f.name, label: f.label[locale] ?? f.name }));
  const current = (key: BindKey): string => {
    const b = node.bindings?.[key]?.path;
    if (b) return b;
    if (key === "content") { const inline = ((node.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).find((seg): seg is Extract<Inline, { t: "bind" }> => seg.t === "bind"); return inline?.binding.path ?? ""; }
    return "";
  };
  const set = (key: BindKey, path: string, label: string) => {
    const ops: Op[] = [{ op: "node.set", id: node.id, path: `bindings.${key}`, value: path ? { source: source.source, path } : undefined }];
    if (key === "content" && !path) {
      // Retour au texte saisi : les segments liés en ligne deviennent un texte ordinaire, pour que l'élément redevienne éditable.
      const list = (node.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? [];
      if (list.some((seg) => seg.t === "bind")) ops.push({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: list.map((seg) => (seg.t === "bind" ? { t: "text", v: db.fields.find((f) => f.name === seg.binding.path)?.label[locale] ?? "Texte" } : seg)) });
    }
    commit(ops.length === 1 ? ops[0]! : { op: "batch", ops, label }, { label });
  };
  const hint = `Ce que cet élément affiche peut venir de ${where}.`;
  if (node.type === "text") {
    return (
      <Section title="Données" hint={hint}>
        <FieldGroup>
          <Field label="Contenu"><Select value={current("content")} options={[{ value: "", label: "Texte saisi ici" }, ...opts(TEXT_TYPES)]} onValueChange={(v) => set("content", v, v ? "Lier le texte à un champ" : "Délier le texte")} /></Field>
        </FieldGroup>
        {current("content") ? <Hint>Le texte se modifie dans la base, pas ici. Un champ « texte long » s&apos;affiche en paragraphes.</Hint> : null}
      </Section>
    );
  }
  if (node.type === "image") {
    return (
      <Section title="Données" hint={hint}>
        <FieldGroup>
          <Field label="Image"><Select value={current("asset")} options={[{ value: "", label: "Choisie à la main" }, ...opts(IMAGE_TYPES)]} onValueChange={(v) => set("asset", v, v ? "Lier l'image à un champ" : "Délier l'image")} /></Field>
          <Field label="Texte alt."><Select value={current("alt")} options={[{ value: "", label: "Saisi à la main" }, ...opts(["text"])]} onValueChange={(v) => set("alt", v, v ? "Lier l'alternative" : "Délier l'alternative")} /></Field>
        </FieldGroup>
      </Section>
    );
  }
  if (node.type === "link") {
    const pageOpt = db.pageTemplates?.length ? [{ value: "$url", label: "La page de l'entrée" }] : [];
    return (
      <Section title="Données" hint={hint}>
        <FieldGroup>
          <Field label="Cible"><Select value={current("href")} options={[{ value: "", label: "Réglée à la main" }, ...pageOpt, ...opts(LINK_TYPES)]} onValueChange={(v) => set("href", v, v ? "Lier la cible" : "Délier la cible")} /></Field>
        </FieldGroup>
        {!pageOpt.length ? <Hint>Pour renvoyer vers la page de chaque entrée, donnez d&apos;abord un modèle de page à la base (réglages de la page).</Hint> : null}
      </Section>
    );
  }
  return null;
}
