"use client";

import { useState } from "react";
import type { CommitOptions, Inline, Node, NodeLocation, Op, Site, StyleValue } from "@atelier/model";
import { cloneWithNewIds, newId } from "@atelier/model";

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
  const rich = list.some((s) => s.t !== "text" || (s.marks && s.marks.length > 0));
  return { text: list.map((s) => (s.t === "text" ? s.v : s.t === "break" ? "\n" : "")).join(""), rich };
}

/** Champ texte qui n'écrase pas la frappe en cours quand la valeur externe change. */
function TextField({ value, onChange, multiline, mono, placeholder }: { value: string; onChange: (v: string) => void; multiline?: boolean; mono?: boolean; placeholder?: string }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  // Valeur externe changée (annulation, autre panneau) : on la reprend sauf pendant la frappe.
  if (value !== prevValue) { setPrevValue(value); if (!focused) setLocal(value); }
  const cls = `w-full text-[12px] px-2 py-1 border border-neutral-200 rounded bg-white focus:outline-none focus:border-sky-500 ${mono ? "font-mono" : ""}`;
  const props = { value: local, placeholder, className: cls, onFocus: () => setFocused(true), onBlur: () => setFocused(false), onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setLocal(e.target.value); onChange(e.target.value); } };
  return multiline ? <textarea rows={4} {...props} /> : <input type="text" {...props} />;
}

export function NodeInspector({ site, loc, commit, onDeleted }: Props) {
  const node: Node = loc.node;
  const locale = site.settings.defaultLocale;
  const base = node.style?.base ?? {};
  const [newProp, setNewProp] = useState("");
  const siblings = loc.parent?.children ?? [];
  const canText = node.type === "text" && !node.bindings?.content;
  const { text, rich } = canText ? plainText(node.props.content, locale) : { text: "", rich: false };

  const setStyle = (prop: string, raw: string) => {
    commit({ op: "node.set", id: node.id, path: `style.base.${prop}`, value: parseValue(raw) }, { coalesceKey: `style:${node.id}:${prop}`, label: `Style ${prop}` });
  };

  return (
    <div className="px-3 pb-6 space-y-4 text-[13px]">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Nom</div>
        <TextField value={node.name ?? ""} placeholder={node.type} onChange={(v) => commit({ op: "node.set", id: node.id, path: "name", value: v || undefined }, { coalesceKey: `name:${node.id}`, label: "Renommer" })} />
        <div className="text-neutral-400 font-mono text-[11px] mt-1">{node.type} · {node.id}</div>
      </div>

      {canText ? (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Texte</div>
          {rich ? (
            <p className="text-neutral-500 text-[12px]">Ce texte contient des mises en forme ou des liens. L&apos;édition en place arrive avec le mode Écriture.</p>
          ) : (
            <TextField multiline value={text} onChange={(v) => commit({ op: "node.set", id: node.id, path: `props.content.${locale}`, value: v.split("\n").flatMap((line, i) => (i === 0 ? [{ t: "text", v: line }] : [{ t: "break" }, { t: "text", v: line }])) }, { coalesceKey: `text:${node.id}`, label: "Modifier le texte" })} />
          )}
        </div>
      ) : null}

      {node.style?.shared?.length ? (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Styles partagés</div>
          <div className="flex flex-wrap gap-1">{node.style.shared.map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-100 text-[11px]">{site.sharedStyles.find((x) => x.id === s)?.name ?? s}</span>)}</div>
        </div>
      ) : null}

      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Style local · base</div>
        <div className="space-y-1">
          {Object.entries(base).map(([prop, value]) => (
            <div key={prop} className="grid grid-cols-[1fr_1fr_20px] gap-1 items-center">
              <span className="font-mono text-[11px] text-neutral-600 truncate" title={prop}>{prop}</span>
              <TextField mono value={displayValue(value)} onChange={(v) => setStyle(prop, v)} />
              <button className="text-neutral-400 hover:text-red-600 text-[14px]" title="Retirer" onClick={() => commit({ op: "node.set", id: node.id, path: `style.base.${prop}`, value: undefined }, { label: `Retirer ${prop}` })}>×</button>
            </div>
          ))}
          <form className="grid grid-cols-[1fr_auto] gap-1 mt-1" onSubmit={(e) => { e.preventDefault(); const p = newProp.trim(); if (!p) return; commit({ op: "node.set", id: node.id, path: `style.base.${p}`, value: "" }, { label: `Ajouter ${p}` }); setNewProp(""); }}>
            <input list="atelier-props" value={newProp} onChange={(e) => setNewProp(e.target.value)} placeholder="Ajouter une propriété…" className="text-[12px] px-2 py-1 border border-dashed border-neutral-300 rounded font-mono focus:outline-none focus:border-sky-500" />
            <button className="text-[12px] px-2 rounded bg-neutral-100 hover:bg-neutral-200">+</button>
            <datalist id="atelier-props">{COMMON_PROPS.map((p) => <option key={p} value={p} />)}</datalist>
          </form>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1">Valeur CSS, ou un jeton du thème entre accolades : <code>{"{space.4}"}</code>.</p>
      </div>

      {loc.parent ? (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Actions</div>
          <div className="flex flex-wrap gap-1">
            <button disabled={loc.index === 0} className="btn" onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index - 1 } }, { label: "Monter" })}>Monter</button>
            <button disabled={loc.index >= siblings.length - 1} className="btn" onClick={() => commit({ op: "node.move", id: node.id, to: { parent: loc.parent!.id, index: loc.index + 1 } }, { label: "Descendre" })}>Descendre</button>
            <button className="btn" onClick={() => { const { node: copy } = cloneWithNewIds(node, newId); commit({ op: "node.insert", parent: loc.parent!.id, index: loc.index + 1, node: copy }, { label: "Dupliquer" }); }}>Dupliquer</button>
            <button className="btn text-red-700" onClick={() => { commit({ op: "node.remove", id: node.id }, { label: "Supprimer" }); onDeleted(); }}>Supprimer</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
