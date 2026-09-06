"use client";

import { createElement, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Trash2, X } from "lucide-react";
import type { CommitOptions, Inline, Node, NodeLocation, Op, Site, StyleValue } from "@atelier/model";
import { BASE, cloneWithNewIds, newId, resolveNodeStyle, stylePath } from "@atelier/model";
import { Badge, Field, FieldGroup, Hint, IconButton, Section, TextArea, TextInput } from "@/ui";
import { nodeIcon, nodeLabel, TYPE_LABEL } from "./node-icons";
import { LayoutPanel, ResponsivePanel, SizePanel, SpacingPanel, useStyle } from "./design";

type Props = {
  site: Site;
  loc: NodeLocation;
  activeBp: string;
  onGoToBreakpoint: (bp: string) => void;
  commit: (op: Op, opts?: CommitOptions) => void;
  onDeleted: () => void;
};

function displayValue(v: StyleValue | undefined): string {
  if (v === undefined) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if ("token" in v) return `{${v.token}}`;
  return JSON.stringify(v);
}
function parseRaw(raw: string): StyleValue | undefined {
  const s = raw.trim();
  if (!s) return undefined;
  const m = s.match(/^\{([\w.-]+)\}$/);
  return m ? { token: m[1]! } : s;
}
function plainText(content: unknown, locale: string): { text: string; rich: boolean } {
  const list = (content as Record<string, Inline[]> | undefined)?.[locale] ?? [];
  const rich = list.some((s) => (s.t !== "text" && s.t !== "break") || (s.t === "text" && s.marks && s.marks.length > 0));
  return { text: list.map((s) => (s.t === "text" ? s.v : s.t === "break" ? "\n" : "")).join(""), rich };
}

export function NodeInspector({ site, loc, activeBp, onGoToBreakpoint, commit, onDeleted }: Props) {
  const node: Node = loc.node;
  const locale = site.settings.defaultLocale;
  const style = useStyle(site, node, activeBp, commit);
  const parentDisplay = loc.parent ? (resolveNodeStyle(site, loc.parent, activeBp).display?.value as string | undefined) : undefined;
  const siblings = loc.parent?.children ?? [];
  const canText = node.type === "text" && !node.bindings?.content;
  const { text, rich } = canText ? plainText(node.props.content, locale) : { text: "", rich: false };
  const localProps = activeBp === BASE ? node.style?.base ?? {} : node.style?.breakpoints?.[activeBp] ?? {};
  const [newProp, setNewProp] = useState("");

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

      {activeBp !== BASE ? (
        <div className="flex items-center gap-2 px-3 h-7 bg-warning-soft text-warning text-xs border-b border-line">
          Réglages posés sur <strong className="font-medium">{style.bpName(activeBp)}</strong> et les points plus étroits.
        </div>
      ) : null}

      <Section title="Général" defaultOpen={false}>
        <FieldGroup>
          <Field label="Nom" hint="Nom affiché dans les calques">
            <TextInput value={node.name ?? ""} placeholder={nodeLabel(node)} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "name", value: v || undefined }, { coalesceKey: `name:${node.id}`, label: "Renommer" })} />
          </Field>
          {typeof node.props.tag === "string" ? <Field label="Balise"><span className="font-mono text-xs text-muted">{node.props.tag}</span></Field> : null}
          <Field label="Identifiant"><span className="font-mono text-xs text-dim">{node.id}</span></Field>
        </FieldGroup>
      </Section>

      {canText ? (
        <Section title="Texte">
          {rich ? <Hint>Ce texte contient des mises en forme ou des liens. L&apos;édition en place arrive avec le mode Écriture.</Hint> : (
            <TextArea value={text} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: v.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) }, { coalesceKey: `text:${node.id}`, label: "Modifier le texte" })} />
          )}
        </Section>
      ) : null}

      <LayoutPanel site={site} node={node} style={style} parentDisplay={parentDisplay} />
      <SpacingPanel site={site} style={style} />
      <SizePanel site={site} style={style} />

      {node.style?.shared?.length ? (
        <Section title="Styles partagés" defaultOpen={false}>
          <div className="flex flex-wrap gap-1">{node.style.shared.map((s) => <Badge key={s} tone="accent">{site.sharedStyles.find((x) => x.id === s)?.name ?? s}</Badge>)}</div>
          <Hint>Créer, modifier et détacher des styles partagés : suite du jalon M3.</Hint>
        </Section>
      ) : null}

      <ResponsivePanel site={site} node={node} activeBp={activeBp} onGoTo={onGoToBreakpoint} />

      <Section title="Avancé" defaultOpen={false}>
        <FieldGroup>
          {Object.entries(localProps).map(([prop, value]) => (
            <div key={prop} className="grid grid-cols-[88px_1fr_24px] items-center gap-1">
              <span className="font-mono text-xs text-muted truncate" title={prop}>{prop}</span>
              <TextInput mono value={displayValue(value)} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: stylePath(activeBp, prop), value: parseRaw(v) }, { coalesceKey: `style:${node.id}:${activeBp}:${prop}` })} />
              <IconButton size="sm" label={`Retirer ${prop}`} icon={X} onClick={() => style.reset(prop)} />
            </div>
          ))}
          <form className="grid grid-cols-[1fr_auto] gap-1" onSubmit={(e) => { e.preventDefault(); const p = newProp.trim(); if (!p) return; commit({ op: "node.set", id: node.id, path: stylePath(activeBp, p), value: "" }, { label: `Ajouter ${p}` }); setNewProp(""); }}>
            <input value={newProp} onChange={(e) => setNewProp(e.target.value)} placeholder="Propriété CSS…" className="h-7 px-2 rounded-sm bg-transparent border border-dashed border-line-strong font-mono text-xs text-ink placeholder:text-dim focus:border-accent focus:outline-none" />
            <button type="submit" className="h-7 px-2 rounded-sm bg-surface border border-line-strong text-xs hover:bg-hover">Ajouter</button>
          </form>
        </FieldGroup>
        <Hint>Toutes les propriétés posées sur ce point de rupture, en CSS brut. Typographie, apparence et effets arrivent à la prochaine session.</Hint>
      </Section>
    </div>
  );
}
