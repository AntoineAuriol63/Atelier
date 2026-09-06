"use client";

import { useState } from "react";
import type { CommitOptions, LinkTarget, Node, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Field, FieldGroup, Hint, NumberInput, Section, Select, TextInput } from "@/ui";
import { Segmented } from "@/ui/controls";
import { AssetPicker } from "./AppearancePanel";

type Commit = (op: Op, opts?: CommitOptions) => void;

const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "span", "label"].map((t) => ({ value: t, label: t === "p" ? "Paragraphe (p)" : t.startsWith("h") ? `Titre ${t.slice(1)} (${t})` : t === "blockquote" ? "Citation" : t }));
const BOX_TAGS = [["div", "Bloc neutre (div)"], ["section", "Section"], ["header", "En-tête"], ["footer", "Pied de page"], ["nav", "Navigation"], ["main", "Contenu principal"], ["article", "Article"], ["aside", "Aparté"], ["figure", "Figure"]].map(([value, label]) => ({ value: value!, label: label! }));

/** Balise HTML d'un texte ou d'une boîte : le référencement se règle aussi à la main (D38). */
export function TagPanel({ node, commit }: { node: Node; commit: Commit }) {
  if (node.type !== "text" && node.type !== "box") return null;
  const options = node.type === "text" ? TEXT_TAGS : BOX_TAGS;
  return (
    <Field label="Balise" hint="Balise HTML rendue, utile au référencement">
      <Select value={String(node.props.tag ?? (node.type === "text" ? "p" : "div"))} options={options} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.tag", value: v }, { label: "Changer la balise" })} />
    </Field>
  );
}

export function ImagePanel({ site, node, commit }: { site: Site; node: Node; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const [url, setUrl] = useState("");
  const bound = !!node.bindings?.asset;
  const alt = (node.props.alt as Record<string, string> | undefined)?.[locale] ?? "";
  const addByUrl = () => {
    const u = url.trim();
    if (!/^https?:\/\//.test(u)) return;
    const asset = { id: newId(), kind: "image" as const, url: u };
    commit({ op: "batch", label: "Ajouter une image", ops: [
      { op: "site.set", path: "assets", value: [...site.assets, asset] },
      { op: "node.set", id: node.id, path: "props.asset", value: asset.id },
    ] });
    setUrl("");
  };
  return (
    <Section title="Image">
      {bound ? <Hint>Cette image est liée à un champ de base de données ({node.bindings!.asset!.path}). Le choix se fait dans la base.</Hint> : (
        <>
          <AssetPicker site={site} value={node.props.asset as string | null} onChange={(id) => commit({ op: "node.set", id: node.id, path: "props.asset", value: id }, { label: "Changer l'image" })} />
          <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); addByUrl(); }}>
            <TextInput className="flex-1" value={url} placeholder="https://… (ajouter par adresse)" onValueChange={setUrl} />
            <Button size="md" type="submit" disabled={!/^https?:\/\//.test(url.trim())}>Ajouter</Button>
          </form>
          <Hint>L&apos;import de fichiers depuis l&apos;ordinateur arrive au jalon M5.</Hint>
        </>
      )}
      <FieldGroup>
        {!node.bindings?.alt ? (
          <Field label="Texte alt." hint="Description pour l'accessibilité et le référencement">
            <TextInput value={alt} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.alt.${locale}`, value: v }, { coalesceKey: `alt:${node.id}`, label: "Texte alternatif" })} />
          </Field>
        ) : null}
        <Field label="Ajustement">
          <Segmented value={String(node.props.fit ?? "")} options={[{ value: "cover", label: "Couvrir" }, { value: "contain", label: "Contenir" }, { value: "fill", label: "Étirer" }]} onChange={(v) => commit({ op: "node.set", id: node.id, path: "props.fit", value: v }, { label: "Ajustement" })} />
        </Field>
        <Field label="Ratio" hint="Largeur / hauteur, par exemple 4 / 5">
          <TextInput mono value={String(node.props.ratio ?? "")} placeholder="auto" onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.ratio", value: v || undefined }, { coalesceKey: `ratio:${node.id}`, label: "Ratio" })} />
        </Field>
        <Field label="Priorité" hint="Charger en premier (image visible dès l'arrivée)">
          <Segmented value={node.props.priority ? "1" : undefined} options={[{ value: "1", label: "Chargement prioritaire" }]} onChange={(v) => commit({ op: "node.set", id: node.id, path: "props.priority", value: v ? true : undefined }, { label: "Priorité" })} />
        </Field>
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
          <Segmented value={isButton ? "button" : "a"} options={[{ value: "a", label: "Lien" }, { value: "button", label: "Bouton de formulaire" }]} onChange={(v) => { if (v) commit({ op: "node.set", id: node.id, path: "props.tag", value: v }, { label: "Rôle" }); }} />
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

export function CollectionPanel({ site, node, commit }: { site: Site; node: Node; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const view = (node.props.view ?? { layout: "gallery" }) as { layout: string; limit?: number; sort?: { field: string; dir: "asc" | "desc" }[] };
  const db = site.databases.find((d) => d.id === node.props.database);
  const setView = (patch: Partial<typeof view>) => commit({ op: "node.set", id: node.id, path: "props.view", value: { ...view, ...patch } }, { label: "Vue" });
  return (
    <Section title="Collection">
      <FieldGroup>
        <Field label="Base"><Select value={String(node.props.database ?? "")} placeholder="Choisir" options={site.databases.map((d) => ({ value: d.id, label: d.name[locale] ?? d.slug }))} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "props.database", value: v }, { label: "Base de données" })} /></Field>
        <Field label="Tri">
          <div className="flex gap-1">
            <Select className="flex-1" value={view.sort?.[0]?.field ?? ""} placeholder="Par défaut" options={(db?.fields ?? []).map((f) => ({ value: f.name, label: f.label[locale] ?? f.name }))} onValueChange={(f) => setView({ sort: f ? [{ field: f, dir: view.sort?.[0]?.dir ?? "asc" }] : [] })} />
            <Select className="w-24" value={view.sort?.[0]?.dir ?? "asc"} options={[{ value: "asc", label: "Croissant" }, { value: "desc", label: "Décroissant" }]} onValueChange={(d) => { if (view.sort?.[0]) setView({ sort: [{ field: view.sort[0].field, dir: d as "asc" | "desc" }] }); }} />
          </div>
        </Field>
        <Field label="Limite"><NumberInput className="w-24" min={1} value={view.limit ?? ""} placeholder="toutes" onValueChange={(n) => setView({ limit: n === "" ? undefined : n })} /></Field>
      </FieldGroup>
      <Hint>Filtres, pagination et colonnes par point de rupture : jalon M5.</Hint>
    </Section>
  );
}
