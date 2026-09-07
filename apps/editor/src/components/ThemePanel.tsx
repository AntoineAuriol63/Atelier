"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { CommitOptions, Op, Site, Theme } from "@atelier/model";
import { walk } from "@atelier/model";
import { Button, Hint, IconButton, NumberInput, PanelHeading, Section, TextInput } from "@/ui";
import { ColorInput } from "@/ui/controls";

type Commit = (op: Op, opts?: CommitOptions) => void;

const GROUPS: { key: keyof Theme["tokens"]; label: string; hint: string }[] = [
  { key: "font", label: "Polices", hint: "Famille CSS complète, avec ses secours." },
  { key: "fontSize", label: "Tailles de texte", hint: "" },
  { key: "lineHeight", label: "Interlignes", hint: "" },
  { key: "space", label: "Espacements", hint: "Utilisés par les marges, remplissages et écarts." },
  { key: "radius", label: "Arrondis", hint: "" },
  { key: "shadow", label: "Ombres", hint: "" },
  { key: "width", label: "Largeurs", hint: "Largeurs de contenu." },
];

function TokenList({ site, group, commit }: { site: Site; group: keyof Theme["tokens"]; commit: Commit }) {
  const tokens = site.theme.tokens[group] ?? {};
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const set = (n: string, v: unknown, label: string, coalesce = true) => commit({ op: "site.set", path: `theme.tokens.${group}.${n}`, value: v }, { coalesceKey: coalesce ? `token:${group}:${n}` : undefined, label });
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(tokens).map(([n, v]) => (
        <div key={n} className="grid grid-cols-[64px_1fr_24px] items-center gap-1">
          <span className="font-mono text-xs text-muted truncate" title={`${group}.${n}`}>{n}</span>
          {group === "color" ? (
            <div className="flex gap-1">
              {site.theme.modes.map((m) => {
                const mv = typeof v === "string" ? v : v[m.id] ?? "";
                return <ColorInput key={m.id} className="flex-1" site={site} mode={m.id} value={mv} placeholder={m.name} onChange={(c) => set(n, typeof v === "string" ? { ...Object.fromEntries(site.theme.modes.map((x) => [x.id, v])), [m.id]: typeof c === "string" ? c : "" } : { ...v, [m.id]: typeof c === "string" ? c : "" }, `Couleur ${n}`)} />;
              })}
            </div>
          ) : (
            <TextInput mono value={typeof v === "string" ? v : Object.values(v)[0] ?? ""} onValueChange={(t) => set(n, t, `Valeur ${n}`)} />
          )}
          <IconButton size="sm" label={`Supprimer ${n}`} icon={Trash2} tone="danger" onClick={() => { if (window.confirm(`Supprimer la valeur ${group}.${n} ? Les éléments qui l'utilisent perdront cette valeur.`)) set(n, undefined, `Supprimer ${n}`, false); }} />
        </div>
      ))}
      {adding ? (
        <form className="grid grid-cols-[64px_1fr_auto] items-center gap-1" onSubmit={(e) => { e.preventDefault(); const k = name.trim().replace(/[^\w-]/g, ""); if (!k) return; set(k, group === "color" ? Object.fromEntries(site.theme.modes.map((m) => [m.id, value || "#888888"])) : value, `Ajouter ${k}`, false); setAdding(false); setName(""); setValue(""); }}>
          <TextInput mono value={name} placeholder="nom" onValueChange={setName} autoFocus />
          <TextInput mono value={value} placeholder={group === "color" ? "#8A5A2B" : "valeur"} onValueChange={setValue} />
          <Button size="md" type="submit" variant="primary" disabled={!name.trim()}>OK</Button>
        </form>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="self-start inline-flex items-center gap-1 h-6 px-1.5 rounded-sm text-xs text-muted hover:bg-hover hover:text-ink"><Plus size={12} /> Ajouter</button>
      )}
    </div>
  );
}

function breakpointInUse(site: Site, id: string): number {
  let n = 0;
  const roots = [...site.pages.map((p) => p.root), ...site.components.map((c) => c.root)];
  for (const r of roots) walk(r, (node) => { if (node.style?.breakpoints?.[id] && Object.keys(node.style.breakpoints[id]!).length) n++; });
  for (const s of site.sharedStyles) if (s.style.breakpoints?.[id]) n++;
  return n;
}

export function ThemePanel({ site, commit }: { site: Site; commit: Commit }) {
  const bps = [...site.settings.breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
  const setBps = (list: Site["settings"]["breakpoints"], label: string) => commit({ op: "site.set", path: "settings.breakpoints", value: list }, { label });
  const [newBp, setNewBp] = useState({ name: "", width: "" as number | "" });
  return (
    <div className="pb-6">
      <PanelHeading>Thème du site</PanelHeading>
      <p className="px-3 pb-2 text-xs text-dim leading-snug">Les valeurs du thème (couleurs, polices, espacements…) se réutilisent dans tout le site : un élément qui s&apos;y réfère suit chaque changement fait ici. Dans un champ, le losange ◇ permet d&apos;en choisir une.</p>
      <Section title="Couleurs" defaultOpen>
        <div className="grid grid-cols-[64px_1fr_24px] gap-1 text-2xs text-dim uppercase tracking-wider"><span /><div className="flex gap-1">{site.theme.modes.map((m) => <span key={m.id} className="flex-1">{m.name}</span>)}</div><span /></div>
        <TokenList site={site} group="color" commit={commit} />
      </Section>
      {GROUPS.map((g) => (
        <Section key={g.key} title={g.label} defaultOpen={false}>
          <TokenList site={site} group={g.key} commit={commit} />
          {g.hint ? <Hint>{g.hint}</Hint> : null}
        </Section>
      ))}
      <Section title="Points de rupture" defaultOpen={false}>
        <div className="grid grid-cols-[1fr_84px_24px] gap-1 text-2xs text-dim uppercase tracking-wider"><span>Nom</span><span>Jusqu&apos;à</span><span /></div>
        {bps.map((b) => {
          const uses = breakpointInUse(site, b.id);
          return (
            <div key={b.id} className="grid grid-cols-[1fr_84px_24px] items-center gap-1">
              <TextInput value={b.name} onValueChange={(v) => setBps(site.settings.breakpoints.map((x) => (x.id === b.id ? { ...x, name: v } : x)), "Renommer le point de rupture")} />
              <NumberInput unit="px" min={200} max={4000} step={1} value={b.maxWidth} onValueChange={(n) => { if (n !== "") setBps(site.settings.breakpoints.map((x) => (x.id === b.id ? { ...x, maxWidth: n } : x)), "Seuil du point de rupture"); }} />
              <IconButton size="sm" label={uses ? `Utilisé par ${uses} réglage${uses > 1 ? "s" : ""} : retirez-les d'abord` : "Supprimer"} icon={Trash2} tone="danger" disabled={uses > 0} onClick={() => setBps(site.settings.breakpoints.filter((x) => x.id !== b.id), "Supprimer le point de rupture")} />
            </div>
          );
        })}
        <form className="grid grid-cols-[1fr_84px_auto] items-center gap-1" onSubmit={(e) => { e.preventDefault(); if (!newBp.name.trim() || newBp.width === "") return; const id = newBp.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.round(newBp.width); setBps([...site.settings.breakpoints, { id, name: newBp.name.trim(), maxWidth: newBp.width }], "Ajouter un point de rupture"); setNewBp({ name: "", width: "" }); }}>
          <TextInput value={newBp.name} placeholder="Nouveau point" onValueChange={(v) => setNewBp((s) => ({ ...s, name: v }))} />
          <NumberInput unit="px" min={200} max={4000} value={newBp.width} placeholder="largeur" onValueChange={(n) => setNewBp((s) => ({ ...s, width: n }))} />
          <Button size="md" type="submit" icon={Plus} disabled={!newBp.name.trim() || newBp.width === ""}>Ajouter</Button>
        </form>
        <Hint>Cascade descendante : un réglage posé sur un point s&apos;applique à lui et aux plus étroits. Les grands écrans (largeur minimale) arrivent en v1.</Hint>
      </Section>
    </div>
  );
}
