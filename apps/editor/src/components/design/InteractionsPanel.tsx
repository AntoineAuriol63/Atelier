"use client";

import { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";
import type { CommitOptions, Interaction, Node, Op, Site } from "@atelier/model";
import { describeInteraction, hiddenAtLoad, indexSite, instanceVariant, planHiddenAtLoad, toggleInteraction, variantInteraction, walk } from "@atelier/model";
import { Button, Field, FieldGroup, Hint, IconButton, Section, Select, Toggle, Eyebrow } from "@/ui";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Interactions déclaratives (D31) : afficher/masquer ou changer de variante au clic ou au survol, masqué au chargement. */
export function InteractionsPanel({ site, node, pageRoot, commit }: { site: Site; node: Node; pageRoot: Node; commit: Commit }) {
  const [kind, setKind] = useState<"toggle" | "variant">("toggle");
  const [trigger, setTrigger] = useState<"click" | "hover">("click");
  const [target, setTarget] = useState("");
  const [variant, setVariant] = useState("");
  const index = indexSite(site);
  const nameOf = (id: string) => { const n = index.get(id)?.node; return n ? (n.name ?? nodeLabel(n)) : id; };
  // Cibles : les éléments nommés de la page (hors celui-ci), et pour les variantes, les instances dont le composant en a.
  const candidates: { id: string; label: string; node: Node }[] = [];
  const parentKids = index.get(node.id)?.parent?.children ?? [];
  walk(pageRoot, (n) => { if (n.id !== node.id && (n.name || n.type === "instance" || parentKids.includes(n))) candidates.push({ id: n.id, label: parentKids.includes(n) && !n.name ? `${nameOf(n.id)} (voisin)` : nameOf(n.id), node: n }); });
  const variantTargets = candidates.filter((c) => { if (c.node.type !== "instance") return false; const cmp = site.components.find((x) => x.id === c.node.props.component); return !!cmp?.variants?.length; });
  const targetNode = candidates.find((c) => c.id === target)?.node;
  const targetCmp = targetNode?.type === "instance" ? site.components.find((x) => x.id === targetNode.props.component) : undefined;
  const variantOptions = (targetCmp?.variants ?? []).flatMap((a) => a.values.map((v) => ({ value: `${a.name}:${v}`, label: `${a.name} · ${v}` })));
  const setInteractions = (list: Interaction[], label: string) => commit({ op: "node.set", id: node.id, path: "interactions", value: list.length ? list : undefined }, { label });
  const hidden = hiddenAtLoad(node);
  const others = (node.interactions ?? []).filter((i) => i.id !== hidden?.id);
  const add = () => {
    if (!target) return;
    if (kind === "toggle") setInteractions([...(node.interactions ?? []), toggleInteraction(trigger, { node: target })], "Afficher ou masquer au clic");
    else { const [axis, value] = variant.split(":"); if (!axis || !value) return; const cur = targetCmp && targetNode ? instanceVariant(targetCmp, targetNode) : {}; setInteractions([...(node.interactions ?? []), variantInteraction(trigger, { node: target }, { ...cur, [axis]: value })], "Changer de variante"); }
    setTarget("");
  };
  return (
    <Section title="Interactions" defaultOpen={!!node.interactions?.length} hint="Au clic ou au survol : afficher ou masquer un autre élément, changer la variante d'une instance. Les apparitions et les mouvements sont dans « Animations ».">
      <FieldGroup>
        <Field label="Au chargement" hint="Masqué jusqu'à ce qu'une interaction l'affiche (réponse d'une question, panneau…)"><Toggle checked={!!hidden} label={hidden ? "masqué" : "visible"} onChange={(b) => { const ops = planHiddenAtLoad(node, b); if (ops.length) commit({ op: "batch", ops, label: b ? "Masquer au chargement" : "Visible au chargement" }); }} /></Field>
      </FieldGroup>
      {others.length ? (
        <ul className="flex flex-col gap-1">
          {others.map((ix) => (
            <li key={ix.id} className="flex items-center gap-1 text-xs"><Sparkles size={12} className="text-accent shrink-0" /><span className="flex-1 truncate" title={describeInteraction(ix, nameOf)}>{describeInteraction(ix, nameOf)}</span><IconButton size="sm" label="Retirer" icon={X} onClick={() => setInteractions((node.interactions ?? []).filter((i) => i.id !== ix.id), "Retirer l'interaction")} /></li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-col gap-1 border-t border-line pt-2">
        <Eyebrow as="span">Ajouter</Eyebrow>
        <div className="grid grid-cols-2 gap-1">
          <Select value={trigger} options={[{ value: "click", label: "Au clic" }, { value: "hover", label: "Au survol" }]} onValueChange={(v) => setTrigger(v as "click" | "hover")} />
          <Select value={kind} options={[{ value: "toggle", label: "Afficher / masquer…" }, { value: "variant", label: "Changer la variante de…" }]} onValueChange={(v) => { setKind(v as "toggle" | "variant"); setTarget(""); }} />
        </div>
        <Select value={target} placeholder={kind === "toggle" ? "Élément nommé de la page" : "Instance avec variantes"} options={(kind === "toggle" ? candidates : variantTargets).map((c) => ({ value: c.id, label: c.label }))} onValueChange={setTarget} />
        {kind === "variant" && target ? <Select value={variant} placeholder="Variante" options={variantOptions} onValueChange={setVariant} /> : null}
        <Button size="sm" icon={Plus} onClick={add} disabled={!target || (kind === "variant" && !variant)}>Ajouter l&apos;interaction</Button>
        {kind === "toggle" && !candidates.length ? <Hint>Nommez d&apos;abord l&apos;élément à afficher ou masquer (section Élément → Nom) pour pouvoir le choisir ici.</Hint> : null}
      </div>
    </Section>
  );
}
