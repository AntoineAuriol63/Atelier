"use client";

import { createElement, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Trash2, X } from "lucide-react";
import type { CommitOptions, Inline, Node, NodeLocation, Op, Site, StyleValue } from "@atelier/model";
import { cloneWithNewIds, newId } from "@atelier/model";
import { Badge, Button, Field, FieldGroup, Hint, IconButton, Section, TextArea, TextInput } from "@/ui";
import { nodeIcon, nodeLabel, TYPE_LABEL } from "./node-icons";

type Props = {
  site: Site;
  loc: NodeLocation;
  commit: (op: Op, opts?: CommitOptions) => void;
  onDeleted: () => void;
};

const COMMON_PROPS = ["display", "flexDirection", "gap", "alignItems", "justifyContent", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "marginTop", "marginBottom", "width", "maxWidth", "fontSize", "fontWeight", "lineHeight", "color", "background", "borderRadius", "textAlign"];

function displayValue(v: StyleValue | undefined): string {
  if (v === undefined) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if ("token" in v) return `{${v.token}}`;
  if ("calc" in v) return `calc(${v.calc})`;
  return JSON.stringify(v);
}

function parseValue(raw: string): StyleValue | undefined {
  const s = raw.trim();
  if (!s) return undefined;
  const m = s.match(/^\{([\w.-]+)\}$/);
  if (m) return { token: m[1]! };
  return s;
}

function plainText(content: unknown, locale: string): { text: string; rich: boolean } {
  const list = (content as Record<string, Inline[]> | undefined)?.[locale] ?? [];
  const rich = list.some((s) => s.t !== "text" && s.t !== "break" || (s.t === "text" && s.marks && s.marks.length > 0));
  return { text: list.map((s) => (s.t === "text" ? s.v : s.t === "break" ? "\n" : "")).join(""), rich };
}

/** Inspecteur provisoire (jalon M0), rhabillé avec le système de design. Remplacé par les panneaux Design en M3. */
export function NodeInspector({ site, loc, commit, onDeleted }: Props) {
  const node: Node = loc.node;
  const locale = site.settings.defaultLocale;
  const base = node.style?.base ?? {};
  const [newProp, setNewProp] = useState("");
  const siblings = loc.parent?.children ?? [];
  const canText = node.type === "text" && !node.bindings?.content;
  const { text, rich } = canText ? plainText(node.props.content, locale) : { text: "", rich: false };

  const setStyle = (prop: string, raw: string) =>
    commit({ op: "node.set", id: node.id, path: `style.base.${prop}`, value: parseValue(raw) }, { coalesceKey: `style:${node.id}:${prop}`, label: `Style ${prop}` });

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 h-10 px-3 border-b border-line">
        {createElement(nodeIcon(node), { size: 14, className: "text-accent shrink-0", "aria-hidden": true })}
        <span className="text-sm font-medium truncate">{nodeLabel(node)}</span>
        <Badge>{TYPE_LABEL[node.type]}</Badge>
        {loc.parent ? (
          <div className="ml-auto flex items-center">
            <IconButton size="sm" label="Monter" icon={ArrowUp} disabled={loc.index === 0} onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index - 1 } }, { label: "Monter" })} />
            <IconButton size="sm" label="Descendre" icon={ArrowDown} disabled={loc.index >= siblings.length - 1} onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index + 1 } }, { label: "Descendre" })} />
            <IconButton size="sm" label="Dupliquer (⌘D)" icon={Copy} onClick={() => { const { node: copy } = cloneWithNewIds(node, newId); commit({ op: "node.insert", parent: loc.parent!.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); }} />
            <IconButton size="sm" label="Supprimer" icon={Trash2} tone="danger" onClick={() => { commit({ op: "node.remove", id: node.id }, { label: "Supprimer" }); onDeleted(); }} />
          </div>
        ) : null}
      </div>

      <Section title="Général">
        <FieldGroup>
          <Field label="Nom" hint="Nom affiché dans les calques">
            <TextInput value={node.name ?? ""} placeholder={nodeLabel(node)} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "name", value: v || undefined }, { coalesceKey: `name:${node.id}`, label: "Renommer" })} />
          </Field>
          {typeof node.props.tag === "string" ? (
            <Field label="Balise" hint="Balise HTML rendue">
              <span className="font-mono text-xs text-muted">{node.props.tag}</span>
            </Field>
          ) : null}
          <Field label="Identifiant"><span className="font-mono text-xs text-dim">{node.id}</span></Field>
        </FieldGroup>
      </Section>

      {canText ? (
        <Section title="Texte">
          {rich ? (
            <Hint>Ce texte contient des mises en forme ou des liens. L&apos;édition en place arrive avec le mode Écriture.</Hint>
          ) : (
            <TextArea value={text} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: v.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) }, { coalesceKey: `text:${node.id}`, label: "Modifier le texte" })} />
          )}
        </Section>
      ) : null}

      {node.style?.shared?.length ? (
        <Section title="Styles partagés">
          <div className="flex flex-wrap gap-1">
            {node.style.shared.map((s) => <Badge key={s} tone="accent">{site.sharedStyles.find((x) => x.id === s)?.name ?? s}</Badge>)}
          </div>
          <Hint>Créer, modifier et détacher des styles partagés : jalon M3.</Hint>
        </Section>
      ) : null}

      <Section title="Style local">
        <FieldGroup>
          {Object.entries(base).map(([prop, value]) => (
            <div key={prop} className="grid grid-cols-[88px_1fr_24px] items-center gap-1">
              <span className="font-mono text-xs text-muted truncate" title={prop}>{prop}</span>
              <TextInput mono value={displayValue(value)} onValueChange={(v) => setStyle(prop, v)} />
              <IconButton size="sm" label={`Retirer ${prop}`} icon={X} onClick={() => commit({ op: "node.set", id: node.id, path: `style.base.${prop}`, value: undefined }, { label: `Retirer ${prop}` })} />
            </div>
          ))}
          <form className="grid grid-cols-[1fr_auto] gap-1" onSubmit={(e) => { e.preventDefault(); const p = newProp.trim(); if (!p) return; commit({ op: "node.set", id: node.id, path: `style.base.${p}`, value: "" }, { label: `Ajouter ${p}` }); setNewProp(""); }}>
            <input list="atelier-props" value={newProp} onChange={(e) => setNewProp(e.target.value)} placeholder="Ajouter une propriété…" className="h-7 px-2 rounded-sm bg-transparent border border-dashed border-line-strong font-mono text-xs text-ink placeholder:text-dim focus:border-accent focus:outline-none" />
            <Button size="sm" type="submit">Ajouter</Button>
            <datalist id="atelier-props">{COMMON_PROPS.map((p) => <option key={p} value={p} />)}</datalist>
          </form>
        </FieldGroup>
        <Hint>Valeur CSS, ou un jeton du thème entre accolades, par exemple <span className="font-mono">{"{space.4}"}</span>. Les panneaux Disposition, Espacement, Typographie et Apparence remplacent cette liste au jalon M3.</Hint>
      </Section>
    </div>
  );
}
