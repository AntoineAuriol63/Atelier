"use client";

import { createElement, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Trash2, X } from "lucide-react";
import type { CommitOptions, Inline, Node, NodeLocation, Op, Site, StyleValue, DataSource } from "@atelier/model";
import { BASE, classMap, cloneWithNewIds, newId, resolveNodeStyle, resolveSharedStyleSet, stylePath } from "@atelier/model";
import { Badge, Field, FieldGroup, Hint, IconButton, Section, TextArea, TextInput } from "@/ui";
import { nodeIcon, nodeLabel, TYPE_LABEL } from "./node-icons";
import { propLabel } from "@/lib/prop-labels";
import { AppearancePanel, BindingPanel, CollectionPanel, EffectsPanel, FieldPanel, FormPanel, ImagePanel, LayoutPanel, LinkPanel, ResponsivePanel, SharedStylesPanel, SizePanel, SpacingPanel, STATE_LABEL, TagPanel, TypographyPanel, useStyle, type StyleTarget } from "./design";
import { PropRow, Segmented } from "@/ui/controls";
import { sharedStyleUsages } from "@atelier/model";

/** Section de l'inspecteur qui porte chaque propriété (pour y aller en un clic). */
export function sectionOfProp(prop: string): string {
  if (/^(flexGrow|flexShrink|flexBasis|alignSelf|order|gridColumn|gridRow)$/.test(prop)) return "Place dans son parent";
  if (/^(position|top|right|bottom|left|zIndex|overflow)$/.test(prop)) return "Position et débordement";
  if (/^(display|flex|grid|gap|rowGap|columnGap|justify|align)/.test(prop)) return "Disposition";
  if (/^(margin|padding)/.test(prop)) return "Espacement";
  if (/^(width|height|minWidth|minHeight|maxWidth|maxHeight|aspectRatio)$/.test(prop)) return "Dimensions";
  if (/^(font|lineHeight|letterSpacing|text|color|whiteSpace)/.test(prop)) return "Typographie";
  if (/^(background|border|boxShadow|opacity)/.test(prop)) return "Apparence";
  if (/^(transform|transition|filter|cursor|backdropFilter)$/.test(prop)) return "Effets";
  return "CSS brut";
}

/** Ouvre la section d'une propriété, fait défiler jusqu'à elle et la surligne un instant. */
export function revealProp(prop: string) {
  window.dispatchEvent(new CustomEvent("atelier:reveal-section", { detail: sectionOfProp(prop) }));
  window.requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>(`[data-prop="${prop}"]`);
    if (!el) return;
    el.scrollIntoView({ block: "center" });
    el.style.transition = "background-color .2s";
    el.style.backgroundColor = "var(--color-accent-soft)";
    window.setTimeout(() => { el.style.backgroundColor = ""; }, 1200);
  });
}

type Props = {
  site: Site;
  loc: NodeLocation;
  /** Source de données disponible pour ce nœud (modèle de page ou vue qui le contient). */
  dataSource?: DataSource;
  activeBp: string;
  mode?: string;
  onGoToBreakpoint: (bp: string) => void;
  /** État prévisualisé de force dans l'aperçu (survol…), ou null. */
  onPreviewState: (state: string | null) => void;
  onEditInPreview?: () => void;
  onEnterComponent?: (componentId: string) => void;
  editMode?: "write" | "design";
  onSwitchMode?: (m: "write" | "design") => void;
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

export function NodeInspector({ site, loc, dataSource, activeBp, mode, onGoToBreakpoint, onPreviewState, onEditInPreview, onEnterComponent, editMode = "design", onSwitchMode, commit, onDeleted }: Props) {
  const node: Node = loc.node;
  const locale = site.settings.defaultLocale;
  const [state, setStateRaw] = useState<string | undefined>(undefined);
  // Classe du code exporté, déduite des noms des calques (même règle que l'export).
  const exportClass = useMemo(() => classMap(site).node.get(node.id), [site, node.id]);
  const [editingShared, setEditingShared] = useState<string | null>(null);
  const setState = (st: string | undefined) => { setStateRaw(st); onPreviewState(st ?? null); };
  const sharedTarget = editingShared && site.sharedStyles.some((x) => x.id === editingShared) ? editingShared : null;
  const target: StyleTarget = sharedTarget ? { kind: "shared", id: sharedTarget } : { kind: "node", node };
  const style = useStyle(site, target, activeBp, state, commit);
  const sharedDef = sharedTarget ? site.sharedStyles.find((x) => x.id === sharedTarget) : undefined;
  /** Propriétés modifiées par un état, tous points de rupture confondus, y compris via les styles partagés (badges et liste). */
  const stateEntries = (st: string): { prop: string; via?: string }[] => {
    const out = new Map<string, string | undefined>();
    const collect = (src: { states?: Record<string, Record<string, unknown>>; stateBreakpoints?: Record<string, Record<string, Record<string, unknown>>> } | undefined, via?: string) => {
      if (!src) return;
      Object.keys(src.states?.[st] ?? {}).forEach((p) => out.set(p, via));
      for (const props of Object.values(src.stateBreakpoints?.[st] ?? {})) Object.keys(props).forEach((p) => out.set(p, via));
    };
    if (sharedDef) collect(sharedDef.style);
    else {
      for (const id of node.style?.shared ?? []) collect(resolveSharedStyleSet(site, id), site.sharedStyles.find((x) => x.id === id)?.name ?? id);
      collect(node.style);
    }
    return [...out.entries()].map(([prop, via]) => ({ prop, via }));
  };
  const stateProps = (st: string) => stateEntries(st).map((e) => e.prop);
  const transitionValue = style.value("transition");
  const animate = () => { if (!transitionValue) commit({ op: "node.set", id: node.id, path: stylePath(BASE, "transition"), value: "all 200ms ease" }, { label: "Animer les changements d'état" }); window.setTimeout(() => revealProp("transition"), 80); };
  const clearState = (st: string) => {
    const ops: Op[] = [];
    if (sharedDef) { const i = site.sharedStyles.findIndex((x) => x.id === sharedDef.id); ops.push({ op: "site.set", path: `sharedStyles.${i}.style.states.${st}`, value: undefined }, { op: "site.set", path: `sharedStyles.${i}.style.stateBreakpoints.${st}`, value: undefined }); }
    else ops.push({ op: "node.set", id: node.id, path: `style.states.${st}`, value: undefined }, { op: "node.set", id: node.id, path: `style.stateBreakpoints.${st}`, value: undefined });
    commit({ op: "batch", ops, label: `Retirer l'état ${STATE_LABEL[st] ?? st}` });
  };
  const parentStyle = loc.parent ? resolveNodeStyle(site, loc.parent, activeBp) : undefined;
  const parentDisplay = parentStyle?.display?.value as string | undefined;
  const parentDirection = (parentStyle?.flexDirection?.value as string | undefined) ?? "row";
  const siblings = loc.parent?.children ?? [];
  const boundPath = node.type === "text" ? (node.bindings?.content?.path ?? ((node.props.content as Record<string, Inline[]> | undefined)?.[locale] ?? []).find((seg): seg is Extract<Inline, { t: "bind" }> => seg.t === "bind")?.binding.path) : undefined;
  const canText = node.type === "text" && !boundPath;
  const { text, rich } = canText ? plainText(node.props.content, locale) : { text: "", rich: false };
  const localProps = activeBp === BASE ? node.style?.base ?? {} : node.style?.breakpoints?.[activeBp] ?? {};
  const [newProp, setNewProp] = useState("");

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 bg-panel shadow-[0_1px_0_var(--color-line)]">
      <div className="flex items-center gap-2 h-10 px-3 border-b border-line">
        {createElement(nodeIcon(node), { size: 14, className: "text-accent shrink-0", "aria-hidden": true })}
        <span className="text-sm font-medium truncate">{nodeLabel(node)}</span>
        <Badge>{TYPE_LABEL[node.type]}</Badge>
        {node.type === "instance" && onEnterComponent ? <button type="button" onClick={() => onEnterComponent(String(node.props.component))} className="h-6 px-2 rounded-sm text-xs bg-accent-soft text-accent hover:brightness-110 whitespace-nowrap" title="Ouvrir le composant dans les calques pour modifier son contenu (toutes ses copies changent)">Modifier le composant</button> : null}
        {loc.parent ? (
          <div className="ml-auto flex items-center">
            <IconButton size="sm" label="Monter" icon={ArrowUp} disabled={loc.index === 0} onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index - 1 } }, { label: "Monter" })} />
            <IconButton size="sm" label="Descendre" icon={ArrowDown} disabled={loc.index >= siblings.length - 1} onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index + 1 } }, { label: "Descendre" })} />
            <IconButton size="sm" label="Dupliquer (⌘D)" icon={Copy} onClick={() => { const { node: copy } = cloneWithNewIds(node, newId); commit({ op: "node.insert", parent: loc.parent!.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); }} />
            <IconButton size="sm" label="Supprimer" icon={Trash2} tone="danger" onClick={() => { commit({ op: "node.remove", id: node.id }, { label: "Supprimer" }); onDeleted(); }} />
          </div>
        ) : null}
      </div>

      {editMode === "write" ? null : (<>
      <div className="flex items-center gap-2 px-3 h-9 border-b border-line">
        <span className="text-2xs uppercase tracking-wider text-dim">État</span>
        <Segmented className="flex-1" size="sm" value={state} options={["hover", "active", "focus"].map((st) => { const n = stateProps(st).length; return { value: st, label: n ? `${STATE_LABEL[st]} · ${n}` : STATE_LABEL[st]! }; })} onChange={(v) => setState(v)} />
      </div>
      {state ? (
        <div className="flex flex-col gap-1 px-3 py-1.5 text-xs border-b border-line bg-surface/60">
          {stateEntries(state).length ? (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-muted mr-1">Au {STATE_LABEL[state]?.toLowerCase()}, change :</span>
              {stateEntries(state).map((e) => (
                <button key={e.prop} type="button" onClick={() => revealProp(e.prop)} title={`${e.prop}${e.via ? ` · via le style partagé « ${e.via} »` : ""}. Cliquer pour voir le réglage.`} className={`h-5 px-1.5 rounded-xs text-2xs border ${e.via ? "border-violet-400/50 text-violet-300" : "border-accent/50 text-accent"} hover:bg-hover`}>{propLabel(e.prop)}{e.via ? " ◆" : ""}</button>
              ))}
              {stateProps(state).some((p) => !stateEntries(state).find((e) => e.prop === p)?.via) ? <button type="button" onClick={() => clearState(state)} className="ml-auto h-5 px-1.5 rounded-xs text-danger hover:bg-danger-soft whitespace-nowrap">Retirer mes réglages d&apos;état</button> : null}
            </div>
          ) : <span className="text-dim">Rien ne change encore au {STATE_LABEL[state]?.toLowerCase()} : ce que vous réglez maintenant ne s&apos;appliquera qu&apos;à cet état.</span>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={animate} className={`h-5 px-1.5 rounded-xs text-2xs border ${transitionValue ? "border-success/50 text-success" : "border-line-strong text-muted hover:text-ink"}`} title={transitionValue ? "Les changements d'état sont animés. Cliquer pour régler la durée et la courbe (section Effets)." : "Animer les changements d'état avec une transition de 200 ms, réglable ensuite dans Effets."}>{transitionValue ? "Animé ✓ · régler" : "Animer"}</button>
            <span className="text-dim truncate">◆ = vient d&apos;un style partagé</span>
          </div>
        </div>
      ) : null}
      </>)}
      {sharedDef ? (
        <div className="flex items-center gap-2 px-3 h-8 bg-violet-400/15 text-violet-300 text-xs border-b border-line">
          <span className="flex-1 truncate">Vous modifiez le style partagé <strong className="font-medium">« {sharedDef.name} »</strong> ({sharedStyleUsages(site, sharedDef.id).length} usages)</span>
          <button type="button" onClick={() => setEditingShared(null)} className="h-6 px-2 rounded-sm bg-panel text-ink hover:bg-hover">Retour à l&apos;élément</button>
        </div>
      ) : null}
      {activeBp !== BASE || state ? (
        <div className="px-3 py-1 bg-warning-soft text-warning text-xs leading-snug border-b border-line">
          Vous réglez <strong className="font-medium">{style.bpName(activeBp)}{state ? ` · ${STATE_LABEL[state] ?? state}` : ""}</strong>{activeBp !== BASE ? ", et les écrans plus petits héritent" : ""}{state ? " ; l'état est simulé dans l'aperçu" : ""}.
        </div>
      ) : null}
      </div>

      {editMode === "design" ? <Section title="Élément" defaultOpen={false} hint="Le nom sert à vous repérer dans les calques. La balise HTML dit au navigateur et aux moteurs de recherche ce qu'est l'élément (titre, paragraphe, section…) ; elle ne change pas son style.">
        <FieldGroup>
          <Field label="Nom" hint="Nom affiché dans les calques">
            <TextInput value={node.name ?? ""} placeholder={nodeLabel(node)} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: "name", value: v || undefined }, { coalesceKey: `name:${node.id}`, label: "Renommer" })} />
          </Field>
          {exportClass ? <Field label="Classe CSS" hint="Dans le code exporté ; déduite du nom et de l'emplacement"><span className="font-mono text-xs text-muted truncate" title={`.${exportClass}`}>.{exportClass}</span></Field> : null}
          <TagPanel node={node} commit={commit} />
        </FieldGroup>
      </Section> : null}

      {!sharedDef && boundPath ? (
        <Section title="Texte" hint="Ce texte est relié à une base de données.">
          <Hint>Le contenu vient du champ <span className="font-mono">{boundPath}</span> de la base de données. Pour le changer, modifiez l&apos;entrée dans la base .</Hint>
        </Section>
      ) : null}
      {canText && !sharedDef ? (
        <Section title="Texte" hint="Double-cliquez le texte dans l'aperçu pour le modifier sur place, ou éditez-le ici. Entrée valide, Échap annule.">
          {rich ? <Hint>Ce texte contient des mises en forme ou des liens : modifiez-le dans l&apos;aperçu (double-clic), où gras, italique et liens sont conservés.</Hint> : (
            <>
              <TextArea value={text} onValueChange={(v) => commit({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: v.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) }, { coalesceKey: `text:${node.id}`, label: "Modifier le texte" })} />
              {onEditInPreview ? <button type="button" onClick={onEditInPreview} className="self-start text-xs text-accent hover:underline">Modifier dans l&apos;aperçu</button> : null}
            </>
          )}
        </Section>
      ) : null}

      {!sharedDef && node.type === "image" ? <ImagePanel site={site} node={node} commit={commit} editMode={editMode} /> : null}
      {!sharedDef && node.type === "link" ? <LinkPanel site={site} node={node} commit={commit} /> : null}
      {!sharedDef && node.type === "collection" ? <CollectionPanel site={site} node={node} commit={commit} editMode={editMode} /> : null}
      {!sharedDef && node.type === "form" ? <FormPanel site={site} node={node} commit={commit} /> : null}
      {!sharedDef && node.type === "field" ? <FieldPanel site={site} node={node} commit={commit} editMode={editMode} /> : null}

      {!sharedDef && (node.type === "text" || node.type === "image" || node.type === "link") ? (dataSource ? <BindingPanel site={site} node={node} source={dataSource} commit={commit} /> : (
        <Section title="Données" defaultOpen={false} hint="Afficher ici un champ d'une base de données.">
          <Hint>Cet élément n&apos;a pas de données à portée : il n&apos;est ni dans une vue de base de données, ni dans un modèle de page. Pour lier son contenu à un champ (le titre d&apos;un projet, par exemple), placez-le dans la carte d&apos;une vue, ou faites de cette page un modèle : Pages → réglages de la page → Rôle.</Hint>
        </Section>
      )) : null}
      {editMode === "write" ? (
        <Section title="Mise en forme rapide" hint="L'essentiel pour écrire. Pour tout le reste, passez en mode Design sur cet élément.">
          {node.type === "text" ? (
            <PropRow label="Alignement" source={style.source("textAlign")} sourceTitle={style.title("textAlign")} onReset={() => style.reset("textAlign")} wide>
              <Segmented className="flex-1" value={typeof style.value("textAlign") === "string" ? String(style.value("textAlign")) : undefined} options={[{ value: "left", label: "À gauche" }, { value: "center", label: "Centré" }, { value: "right", label: "À droite" }]} onChange={(v) => style.set("textAlign", v, false)} />
            </PropRow>
          ) : null}
          {node.type === "text" ? (
            <PropRow label="Taille" source={style.source("fontSize")} sourceTitle={style.title("fontSize")} onReset={() => style.reset("fontSize")} wide>
              <Segmented className="flex-1" value={(() => { const v = style.value("fontSize"); return typeof v === "object" && v && "token" in v ? v.token.split(".")[1] : undefined; })()} options={[{ value: "sm", label: "Petit" }, { value: "md", label: "Normal" }, { value: "lg", label: "Grand" }, { value: "xl", label: "Très grand" }]} onChange={(v) => style.set("fontSize", v ? { token: `fontSize.${v}` } : undefined, false)} />
            </PropRow>
          ) : null}
          <Hint>Sélectionnez du texte dans l&apos;aperçu : une barre propose gras, italique, souligné, lien (⌘B, ⌘I, ⌘U, ⌘K). Entrée termine le bloc et en commence un nouveau ; Maj+Entrée va à la ligne dans le même bloc ; « / » insère un bloc ; la poignée ⋮⋮ à gauche d&apos;un bloc le déplace.</Hint>
          <button type="button" onClick={() => onSwitchMode?.("design")} className="self-start h-7 px-2.5 rounded-sm bg-accent text-accent-ink text-xs font-medium hover:brightness-110">Régler le style en détail</button>
        </Section>
      ) : (
        <>
      <LayoutPanel site={site} node={node} style={style} parentDisplay={parentDisplay} parentDirection={parentDirection} leaf={!sharedDef && ["text", "image", "video", "divider", "icon", "embed", "field", "code"].includes(node.type)} />
      <SpacingPanel site={site} style={style} />
      <SizePanel site={site} style={style} />
      <TypographyPanel site={site} style={style} mode={mode} />
      <AppearancePanel site={site} style={style} mode={mode} />
      <EffectsPanel site={site} style={style} />

        </>
      )}
      {!sharedDef && editMode === "design" ? <SharedStylesPanel site={site} node={node} commit={commit} onEdit={setEditingShared} /> : null}

      {editMode === "design" ? <ResponsivePanel site={site} node={node} activeBp={activeBp} onGoTo={onGoToBreakpoint} onReveal={(bp, prop) => { onGoToBreakpoint(bp); window.setTimeout(() => revealProp(prop), 50); }} /> : null}

      {editMode === "design" ? <Section title="CSS brut" defaultOpen={false} hint="Pour les développeurs : toutes les propriétés posées ici, telles que le navigateur les lit. Utile pour ce que les panneaux ne couvrent pas.">
        <FieldGroup>
          <Field label="Identifiant" hint="Identifiant technique de l'élément (classe CSS n-…)"><span className="font-mono text-xs text-dim">{node.id}</span></Field>
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
      </Section> : null}
    </div>
  );
}
