"use client";

import { createElement, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Trash2, X } from "lucide-react";
import type { CommitOptions, Inline, Node, NodeLocation, Op, Site, StyleValue } from "@atelier/model";
import { BASE, cloneWithNewIds, newId, resolveNodeStyle, stylePath } from "@atelier/model";
import { Badge, Field, FieldGroup, Hint, IconButton, Section, TextArea, TextInput } from "@/ui";
import { nodeIcon, nodeLabel, TYPE_LABEL } from "./node-icons";
import { AppearancePanel, CollectionPanel, EffectsPanel, ImagePanel, LayoutPanel, LinkPanel, ResponsivePanel, SharedStylesPanel, SizePanel, SpacingPanel, STATE_LABEL, TagPanel, TypographyPanel, useStyle, type StyleTarget } from "./design";
import { Segmented } from "@/ui/controls";
import { sharedStyleUsages } from "@atelier/model";

type Props = {
  site: Site;
  loc: NodeLocation;
  activeBp: string;
  mode?: string;
  onGoToBreakpoint: (bp: string) => void;
  /** État prévisualisé de force dans l'aperçu (survol…), ou null. */
  onPreviewState: (state: string | null) => void;
  onEditInPreview?: () => void;
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

export function NodeInspector({ site, loc, activeBp, mode, onGoToBreakpoint, onPreviewState, onEditInPreview, commit, onDeleted }: Props) {
  const node: Node = loc.node;
  const locale = site.settings.defaultLocale;
  const [state, setStateRaw] = useState<string | undefined>(undefined);
  const [editingShared, setEditingShared] = useState<string | null>(null);
  const setState = (st: string | undefined) => { setStateRaw(st); onPreviewState(st ?? null); };
  const sharedTarget = editingShared && site.sharedStyles.some((x) => x.id === editingShared) ? editingShared : null;
  const target: StyleTarget = sharedTarget ? { kind: "shared", id: sharedTarget } : { kind: "node", node };
  const style = useStyle(site, target, activeBp, state, commit);
  const sharedDef = sharedTarget ? site.sharedStyles.find((x) => x.id === sharedTarget) : undefined;
  /** Propriétés posées sur chaque état, tous points de rupture confondus (badges du sélecteur d'état). */
  const stateProps = (st: string): string[] => {
    const src = sharedDef ? sharedDef.style : node.style;
    const set = new Set<string>(Object.keys(src?.states?.[st] ?? {}));
    for (const byBp of [src?.stateBreakpoints?.[st] ?? {}]) for (const props of Object.values(byBp)) Object.keys(props).forEach((p) => set.add(p));
    return [...set];
  };
  const clearState = (st: string) => {
    const ops: Op[] = [];
    if (sharedDef) { const i = site.sharedStyles.findIndex((x) => x.id === sharedDef.id); ops.push({ op: "site.set", path: `sharedStyles.${i}.style.states.${st}`, value: undefined }, { op: "site.set", path: `sharedStyles.${i}.style.stateBreakpoints.${st}`, value: undefined }); }
    else ops.push({ op: "node.set", id: node.id, path: `style.states.${st}`, value: undefined }, { op: "node.set", id: node.id, path: `style.stateBreakpoints.${st}`, value: undefined });
    commit({ op: "batch", ops, label: `Retirer l'état ${STATE_LABEL[st] ?? st}` });
  };
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

      <div className="flex items-center gap-2 px-3 h-9 border-b border-line">
        <span className="text-2xs uppercase tracking-wider text-dim">État</span>
        <Segmented className="flex-1" size="sm" value={state} options={["hover", "active", "focus"].map((st) => { const n = stateProps(st).length; return { value: st, label: n ? `${STATE_LABEL[st]} · ${n}` : STATE_LABEL[st]! }; })} onChange={(v) => setState(v)} />
      </div>
      {state ? (
        <div className="flex items-center gap-2 px-3 py-1.5 text-xs border-b border-line bg-surface/60">
          {stateProps(state).length ? (
            <>
              <span className="flex-1 text-muted"><span className="text-ink">{STATE_LABEL[state]}</span> modifie : <span className="font-mono text-ink">{stateProps(state).join(", ")}</span></span>
              <button type="button" onClick={() => clearState(state)} className="h-6 px-2 rounded-sm text-danger hover:bg-danger-soft whitespace-nowrap">Tout retirer</button>
            </>
          ) : <span className="text-dim">Aucun réglage propre à cet état : ce que vous posez maintenant ne s&apos;appliquera qu&apos;au {STATE_LABEL[state]?.toLowerCase()}.</span>}
        </div>
      ) : null}
      {sharedDef ? (
        <div className="flex items-center gap-2 px-3 h-8 bg-violet-400/15 text-violet-300 text-xs border-b border-line">
          <span className="flex-1 truncate">Vous modifiez le style partagé <strong className="font-medium">« {sharedDef.name} »</strong> ({sharedStyleUsages(site, sharedDef.id).length} usages)</span>
          <button type="button" onClick={() => setEditingShared(null)} className="h-6 px-2 rounded-sm bg-panel text-ink hover:bg-hover">Retour à l&apos;élément</button>
        </div>
      ) : null}
      {activeBp !== BASE || state ? (
        <div className="flex items-center gap-2 px-3 h-7 bg-warning-soft text-warning text-xs border-b border-line">
          Réglages posés sur <strong className="font-medium">{style.bpName(activeBp)}{state ? ` · ${STATE_LABEL[state] ?? state}` : ""}</strong>{state ? " (l'état est forcé dans l'aperçu)" : " et les points plus étroits"}.
        </div>
      ) : null}

      <Section title="Élément" defaultOpen={false} hint="Nom dans les calques, balise HTML rendue, identifiant technique.">
        <FieldGroup>
          <Field label="Nom" hint="Nom affiché dans les calques">
            <TextInput value={node.name ?? ""} placeholder={nodeLabel(node)} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "name", value: v || undefined }, { coalesceKey: `name:${node.id}`, label: "Renommer" })} />
          </Field>
          <TagPanel node={node} commit={commit} />
          <Field label="Identifiant"><span className="font-mono text-xs text-dim">{node.id}</span></Field>
        </FieldGroup>
      </Section>

      {canText && !sharedDef ? (
        <Section title="Texte" hint="Double-cliquez le texte dans l'aperçu pour le modifier sur place, ou éditez-le ici. Entrée valide, Échap annule.">
          {rich ? <Hint>Ce texte contient des mises en forme ou des liens. L&apos;édition riche arrive avec le mode Écriture.</Hint> : (
            <>
              <TextArea value={text} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: v.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) }, { coalesceKey: `text:${node.id}`, label: "Modifier le texte" })} />
              {onEditInPreview ? <button type="button" onClick={onEditInPreview} className="self-start text-xs text-accent hover:underline">Modifier dans l&apos;aperçu</button> : null}
            </>
          )}
        </Section>
      ) : null}

      {!sharedDef && node.type === "image" ? <ImagePanel site={site} node={node} commit={commit} /> : null}
      {!sharedDef && node.type === "link" ? <LinkPanel site={site} node={node} commit={commit} /> : null}
      {!sharedDef && node.type === "collection" ? <CollectionPanel site={site} node={node} commit={commit} /> : null}

      <LayoutPanel site={site} node={node} style={style} parentDisplay={parentDisplay} />
      <SpacingPanel site={site} style={style} />
      <SizePanel site={site} style={style} />
      <TypographyPanel site={site} style={style} mode={mode} />
      <AppearancePanel site={site} style={style} mode={mode} />
      <EffectsPanel site={site} style={style} />

      {!sharedDef ? <SharedStylesPanel site={site} node={node} commit={commit} onEdit={setEditingShared} /> : null}

      <ResponsivePanel site={site} node={node} activeBp={activeBp} onGoTo={onGoToBreakpoint} />

      <Section title="Avancé" defaultOpen={false} hint="Toutes les propriétés CSS posées sur ce point de rupture, en brut. Pour ce que les panneaux ne couvrent pas.">
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
        <Hint>Toutes les propriétés posées sur ce point de rupture, en CSS brut.</Hint>
      </Section>
    </div>
  );
}
