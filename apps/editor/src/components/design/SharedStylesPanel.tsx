"use client";

import { useState } from "react";
import { Pencil, Plus, Unlink2, X } from "lucide-react";
import type { CommitOptions, Node, Op, SharedStyle, Site, StyleSet } from "@atelier/model";
import { newId, resolveSharedStyleSet, sharedStyleUsages } from "@atelier/model";
import { Badge, Button, Hint, IconButton, Section, Select, TextInput } from "@/ui";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Copie les valeurs d'un jeu de styles dans les chemins locaux d'un nœud (détachement). */
function opsToInline(node: Node, set: Omit<StyleSet, "shared">): Op[] {
  const ops: Op[] = [];
  const put = (path: string, props?: Record<string, unknown>) => { for (const [p, v] of Object.entries(props ?? {})) if (!hasLocal(path, p)) ops.push({ op: "node.set", id: node.id, path: `${path}.${p}`, value: v }); };
  const hasLocal = (path: string, p: string): boolean => {
    const parts = path.split(".").slice(1); // sans "style"
    let cur: unknown = node.style;
    for (const k of parts) cur = (cur as Record<string, unknown> | undefined)?.[k];
    return (cur as Record<string, unknown> | undefined)?.[p] !== undefined;
  };
  put("style.base", set.base);
  for (const [bp, props] of Object.entries(set.breakpoints ?? {})) put(`style.breakpoints.${bp}`, props);
  for (const [st, props] of Object.entries(set.states ?? {})) put(`style.states.${st}`, props);
  for (const [st, byBp] of Object.entries(set.stateBreakpoints ?? {})) for (const [bp, props] of Object.entries(byBp)) put(`style.stateBreakpoints.${st}.${bp}`, props);
  return ops;
}

export function SharedStylesPanel({ site, node, commit, onEdit }: { site: Site; node: Node; commit: Commit; onEdit: (id: string) => void }) {
  const applied = node.style?.shared ?? [];
  const available = site.sharedStyles.filter((s) => !applied.includes(s.id));
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const hasLocal = !!(node.style?.base && Object.keys(node.style.base).length) || !!(node.style?.breakpoints && Object.values(node.style.breakpoints).some((b) => Object.keys(b).length));

  const setShared = (ids: string[], label: string) => commit({ op: "node.set", id: node.id, path: "style.shared", value: ids.length ? ids : undefined }, { label });
  const create = () => {
    const n = name.trim();
    if (!n) return;
    const st: SharedStyle = { id: newId(), name: n, style: { base: node.style?.base, breakpoints: node.style?.breakpoints, states: node.style?.states, stateBreakpoints: node.style?.stateBreakpoints } };
    commit({ op: "batch", label: `Créer le style « ${n} »`, ops: [
      { op: "site.set", path: "sharedStyles", value: [...site.sharedStyles, st] },
      { op: "node.set", id: node.id, path: "style", value: { shared: [...applied, st.id] } },
    ] });
    setCreating(false); setName("");
  };
  const detach = (id: string) => {
    const set = resolveSharedStyleSet(site, id);
    const ops: Op[] = set ? opsToInline(node, set) : [];
    ops.push({ op: "node.set", id: node.id, path: "style.shared", value: applied.filter((x) => x !== id).length ? applied.filter((x) => x !== id) : undefined });
    commit({ op: "batch", label: "Détacher le style", ops });
  };

  return (
    <Section title="Styles partagés" defaultOpen={applied.length > 0}>
      {applied.length ? (
        <ul className="flex flex-col gap-1">
          {applied.map((id) => {
            const s = site.sharedStyles.find((x) => x.id === id);
            const usages = sharedStyleUsages(site, id).length;
            return (
              <li key={id} className="flex items-center gap-1 h-7 pl-2 pr-0.5 rounded-sm bg-surface border border-line">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <span className="flex-1 text-xs truncate">{s?.name ?? id}</span>
                <Badge title={`${usages} élément${usages > 1 ? "s" : ""} utilise${usages > 1 ? "nt" : ""} ce style`}>{usages}</Badge>
                <IconButton size="sm" label="Modifier ce style (tous ses usages)" icon={Pencil} onClick={() => onEdit(id)} />
                <IconButton size="sm" label="Détacher : garder les valeurs sur cet élément" icon={Unlink2} onClick={() => detach(id)} />
                <IconButton size="sm" label="Retirer de cet élément" icon={X} tone="danger" onClick={() => setShared(applied.filter((x) => x !== id), "Retirer le style")} />
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="flex items-center gap-1">
        {available.length ? <Select className="flex-1" value="" placeholder="Appliquer un style…" options={available.map((s) => ({ value: s.id, label: s.name }))} onValueChange={(id) => { if (id) setShared([...applied, id], `Appliquer « ${site.sharedStyles.find((s) => s.id === id)?.name} »`); }} /> : null}
        <Button size="md" icon={Plus} onClick={() => setCreating((c) => !c)} title="Créer un style partagé à partir des réglages locaux de cet élément">Créer</Button>
      </div>
      {creating ? (
        <form className="flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); create(); }}>
          <TextInput className="flex-1" value={name} placeholder="Nom du style, ex. Carte" onValueChange={setName} autoFocus />
          <Button size="md" type="submit" variant="primary" disabled={!name.trim()}>OK</Button>
        </form>
      ) : null}
      {creating && !hasLocal ? <Hint>Cet élément n&apos;a pas de réglages locaux : le style sera créé vide, à remplir ensuite.</Hint> : null}
      {applied.length > 1 ? <Hint>Les styles s&apos;appliquent dans l&apos;ordre : le dernier de la liste l&apos;emporte.</Hint> : null}
    </Section>
  );
}
