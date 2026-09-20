"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Sparkles, Trash2 } from "lucide-react";
import type { Animation, CommitOptions, Node, Op, Page, Site, Trigger, TriggerOn } from "@atelier/model";
import { ANIMATION_PRESETS, TRIGGER_LABELS, animationById, animationFromPreset, animationUsages, appearanceOf, describeAnimation, describeTrigger, duplicateQuickTriggers, indexSite, isSequence, newId, planAddAnimation, planAddPageTrigger, planAddTrigger, planAnimateElement, planRemovePageTriggerWithAnimation, planRemoveTriggerWithAnimation, planUpdatePageTrigger, planUpdateTrigger, presetById, triggerFromPreset } from "@atelier/model";
import { Badge, Button, Eyebrow, Hint, IconButton, PanelHeading, Section, Select } from "@/ui";
import { animationLabel, nextAnimationName, openTrigger, quoteLabel, type OpenTimeline } from "@/lib/timeline";
import { Timeline } from "./Timeline";
import { PAGE_ONS, TriggerSettings } from "./TriggerSettings";
import { arrivesWith } from "@/lib/appearance-options";
import { ContinuousEffects } from "./ContinuousEffects";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;

type Props = {
  site: Site; node: Node | null; commit: Commit;
  /** Page ouverte : ses déclencheurs (chargement, défilement, souris) sont portés par sa racine. */
  page: Page;
  /** Document courant, sans attendre le rendu (écritures d'images-clés successives). */
  getSite: () => Site;
  /** Point de rupture actif et mode clair/sombre de l'aperçu, pour les panneaux Design en mode image-clé. */
  bp: string; mode?: string;
  open: OpenTimeline; onOpen: (o: OpenTimeline) => void;
  /** Montre l'état à `time` ms dans l'aperçu (`null` : revenir au repos). */
  scrub: (time: number | null) => void;
  onSelect: (id: string) => void;
  /** Mode « pioche » de la ligne de temps (voir `Timeline`). */
  onPick?: (handler: ((id: string) => void) | null) => void;
  picking?: boolean;
  /** Repère des éléments de la piste active dans l'aperçu. */
  showTargets?: (ids: string[], label?: string) => void;
  /** Ouvre l'onglet Aperçu sur un élément (« Tester sur le site »). */
  onTestOnSite?: (nodeId?: string) => void;
};

/**
 * Panneau du mode Animation (cadrage § 4.1), à la place de l'inspecteur : les déclencheurs de l'élément sélectionné et ses effets continus,
 * les déclencheurs de la page (sans sélection ou sur sa racine), la bibliothèque, puis la ligne de temps de l'animation ouverte
 * (`Timeline` : pistes, images-clés, tête de lecture, édition par les panneaux Design).
 */
export function AnimationModePanel({ site, node, commit, page, getSite, bp, mode, open, onOpen, scrub, onSelect, onPick, picking, showTargets, onTestOnSite }: Props) {
  const anim = open ? animationById(site, open.animationId) : undefined;
  const opened = openTrigger(site, open);
  const run = (ops: Op[], label: string, coalesceKey?: string) => { if (ops.length) commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const onPageRoot = !node || node.id === page.root.id;
  const pageName = page.name[site.settings.defaultLocale] ?? page.path;
  // Déclencheur tout juste créé avec une animation vide : sa ligne de temps s'ouvre avec le nom prêt à être tapé.
  const [created, setCreated] = useState<string | null>(null);
  const timelineOpen = !!(anim && open && opened);
  const duplicates = node ? duplicateQuickTriggers(site, node) : new Set<string>();
  /** Les animations d'un autre élément : la sienne s'il en lance une, sinon celle qui le fait apparaître, sinon sa liste de déclencheurs (ligne de temps fermée). */
  const openElement = (id: string) => {
    const n = indexSite(site).get(id)?.node;
    const t = n?.triggers?.[0];
    const ap = appearanceOf(site, id);
    setCreated(null);
    if (t) onOpen({ animationId: t.animation, hostId: id, triggerId: t.id });
    else if (ap) { onOpen({ animationId: ap.animation.id, hostId: ap.hostId, triggerId: ap.trigger.id }); onSelect(id); }
    else onOpen(null);
  };

  // « Animer « X » » : le cas le plus courant en un geste, sa ligne de temps ouverte avec la piste de l'élément prête à remplir (audit n°5 · R3).
  const animateSelected = () => {
    if (!node) return;
    const animationId = newId(); const triggerId = newId();
    run(planAnimateElement(site, node, { name: nextAnimationName(site, nodeLabel(node)), animationId, triggerId }), `Animer ${nodeLabel(node)}`);
    setCreated(null);
    onOpen({ animationId, hostId: node.id, triggerId });
  };
  // L'élément arrive avec un autre (la carte d'une liste, un élément d'une scène) : on le dit ici aussi, avec le chemin vers cette animation (vague 3, § 5.4).
  const from = node ? arrivesWith(site, node.id) : undefined;
  const elementTriggers = node ? (
    <>
      {from ? (
        <div className="flex flex-col gap-1 rounded-sm border border-line bg-surface/60 p-1.5" role="status">
          <span className="text-xs text-ink">{from.label}</span>
          <Button size="sm" variant="ghost" className="self-start" onClick={() => { setCreated(null); onOpen({ animationId: from.animationId, hostId: from.hostId, triggerId: from.triggerId }); }} title="Ouvre la ligne de temps de l'animation qui fait arriver cet élément">Voir cette animation</Button>
        </div>
      ) : null}
      {!node.triggers?.length ? <Button variant="primary" size="sm" icon={Sparkles} className="self-start" onClick={animateSelected} title="Un déclencheur à l'entrée dans l'écran et une ligne de temps où l'élément est déjà une piste">{`Animer « ${nodeLabel(node).replace(/ « .*$/, "")} »`}</Button> : null}
      <TriggerList site={site} triggers={node.triggers ?? []} hostId={node.id} duplicates={duplicates} open={open} onOpen={onOpen} settings={!timelineOpen}
        onUpdate={(t, patch, label, key) => run(planUpdateTrigger(node, t.id, patch), label, key)}
        onRemove={(t) => { run(planRemoveTriggerWithAnimation(site, node, t.id), "Retirer le déclencheur"); if (open?.triggerId === t.id) onOpen(null); }} />
      <AddTrigger site={site} ons={Object.keys(TRIGGER_LABELS) as TriggerOn[]} hostLabel={nodeLabel(node)} title={`Lancer une animation depuis ${quoteLabel(nodeLabel(node))}`}
        explain={`${quoteLabel(nodeLabel(node))} lance l'animation ; vous choisirez ensuite ce qui bouge : lui, ou d'autres éléments (la section lance, le titre et le texte bougent).`}
        onAdd={(ops, trigger, label, fresh) => { run([...ops, ...planAddTrigger(node, trigger)], label); setCreated(fresh ? trigger.id : null); onOpen({ animationId: trigger.animation, hostId: node.id, triggerId: trigger.id }); }} />
    </>
  ) : null;
  const pageTriggers = (
    <>
      <TriggerList site={site} triggers={page.triggers ?? []} hostId={page.root.id} pageLevel open={open} onOpen={onOpen} settings={!timelineOpen}
        onUpdate={(t, patch, label, key) => run(planUpdatePageTrigger(getSite(), page.id, t.id, patch), label, key)}
        onRemove={(t) => { run(planRemovePageTriggerWithAnimation(site, page.id, t.id), "Retirer le déclencheur de la page"); if (open?.triggerId === t.id) onOpen(null); }} />
      <AddTrigger site={site} ons={PAGE_ONS} defaultOn="scroll" hostLabel={`page ${pageName}`} title="Lancer une animation depuis la page"
        explain="La page lance l'animation (à son chargement, pendant son défilement, quand la souris bouge) ; vous choisirez ensuite ce qui bouge."
        onAdd={(ops, trigger, label, fresh) => { run([...ops, ...planAddPageTrigger(site, page.id, trigger)], label); setCreated(fresh ? trigger.id : null); onOpen({ animationId: trigger.animation, hostId: page.root.id, triggerId: trigger.id }); }} />
      {!page.triggers?.length ? <Hint>Au défilement de la page, la progression de haut en bas parcourt la ligne de temps : ajoutez ensuite les éléments à animer (une barre de progression, un fond…).</Hint> : null}
    </>
  );

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Le mode dit aussi comment se lit la ligne de temps quand on y arrive directement depuis la rubrique d'un élément (tests simulés, constat 11). */}
      {timelineOpen ? null : <HowItWorks />}
      {/* Une animation ouverte passe devant : c'est la surface de travail ; choisir un autre élément ne la déplace plus. */}
      {timelineOpen ? <Timeline key={`${open!.triggerId}:${anim!.id}`} site={site} getSite={getSite} animation={anim!} hostId={open!.hostId} trigger={opened!.trigger} pageLevel={!!opened!.page} selected={node} bp={bp} mode={mode} commit={commit} scrub={scrub} onClose={() => { setCreated(null); onOpen(null); }} onSelect={onSelect} focusName={created === open!.triggerId} onPick={onPick} picking={picking} showTargets={showTargets} onTestOnSite={onTestOnSite ? () => onTestOnSite(open!.hostId) : undefined} onOpenElement={openElement} intro={<HowItWorks compact />}
        onUpdateTrigger={(patch, label, key) => { if (opened!.page) run(planUpdatePageTrigger(getSite(), opened!.page.id, opened!.trigger.id, patch), label, key); else { const host = indexSite(getSite()).get(open!.hostId)?.node; if (host) run(planUpdateTrigger(host, opened!.trigger.id, patch), label, key); } }} /> : null}

      {node ? (
        timelineOpen
          ? <Section title={`Animations lancées par ${quoteLabel(nodeLabel(node))}`} defaultOpen={false} className="-mx-3 border-t" hint="Ce que l'élément sélectionné lance : à l'entrée dans l'écran, au survol, au clic…">{<div className="flex flex-col gap-2">{elementTriggers}</div>}</Section>
          : <section className="flex flex-col gap-2" aria-label="Déclencheurs de l'élément"><PanelHeading className="px-0">{`Animations lancées par ${quoteLabel(nodeLabel(node))}`}</PanelHeading>{elementTriggers}</section>
      ) : !timelineOpen ? <Hint>Sélectionnez dans le canevas ou les calques l&apos;élément qui doit lancer une animation, ou ouvrez une animation du site ci-dessous.</Hint> : null}

      {node ? (
        <Section title="Effets continus" defaultOpen={false} className="-mx-3 border-t" hint="Parallaxe, bandeau, compteur, carrousel automatique : des propriétés de l'élément qui bougent en continu, sans ligne de temps.">
          <div className="flex flex-col gap-1.5"><ContinuousEffects node={node} commit={commit} /></div>
        </Section>
      ) : null}

      {onPageRoot ? (
        timelineOpen
          ? <Section title={`Animations lancées par la page · ${pageName}`} defaultOpen={false} className="-mx-3 border-t" hint="Ce que la page lance : à son chargement, pendant son défilement, quand la souris bouge.">{<div className="flex flex-col gap-2">{pageTriggers}</div>}</Section>
          : <section className="flex flex-col gap-2" aria-label="Déclencheurs de la page"><PanelHeading className="px-0">{`Animations lancées par la page · ${pageName}`}</PanelHeading>{pageTriggers}</section>
      ) : null}

      {!node && !timelineOpen && site.animations.length ? (
        <section className="flex flex-col gap-2" aria-label="Animations du site">
          <PanelHeading className="px-0">Animations du site</PanelHeading>
          {/* Rangées par page, la page ouverte d'abord (tests simulés, PR4 : une animation homonyme d'une autre page a été ouverte sans que le changement de page se voie). */}
          {animationGroups(site, page).map((g) => (
            <div key={g.key} className="flex flex-col gap-0.5">
              <Eyebrow as="span">{g.label}</Eyebrow>
              <ul className="flex flex-col gap-0.5">
                {g.animations.map((a) => {
                  const u = animationUsages(site, a.id)[0];
                  const hostId = u?.node?.id ?? u?.page?.root.id;
                  const label = animationLabel(site, a);
                  return <li key={a.id}><button type="button" disabled={!hostId} title={hostId ? `${label} · ${describeAnimation(a)}${g.current ? "" : " · s'ouvre sur son autre page"}` : "Aucun déclencheur ne la lance : ajoutez-en un sur un élément"} className="w-full text-left text-xs truncate rounded-sm px-1.5 py-1 hover:bg-surface disabled:opacity-50" onClick={() => u && hostId && onOpen({ animationId: a.id, hostId, triggerId: u.trigger.id })}>{label}</button></li>;
                })}
              </ul>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

/** Les animations du site rangées par ce qui les lance : la page ouverte, les autres pages, les composants, puis celles que rien ne lance. */
function animationGroups(site: Site, page: Page): { key: string; label: string; current: boolean; animations: Animation[] }[] {
  const locale = site.settings.defaultLocale;
  const groups = new Map<string, { key: string; label: string; current: boolean; animations: Animation[] }>();
  const add = (key: string, label: string, current: boolean, a: Animation) => { const g = groups.get(key) ?? { key, label, current, animations: [] }; g.animations.push(a); groups.set(key, g); };
  for (const a of site.animations) {
    const u = animationUsages(site, a.id)[0];
    if (!u) { add("none", "Lancées par rien", false, a); continue; }
    const p = site.pages.find((x) => x.id === u.owner);
    if (p) add(`p:${p.id}`, p.id === page.id ? `Sur cette page · ${p.name[locale] ?? p.path}` : `Page ${p.name[locale] ?? p.path}`, p.id === page.id, a);
    else add(`c:${u.owner}`, `Composant ${site.components.find((c) => c.id === u.owner)?.name ?? u.owner}`, false, a);
  }
  const order = (g: { key: string; current: boolean }) => (g.current ? 0 : g.key.startsWith("p:") ? 1 : g.key.startsWith("c:") ? 2 : 3);
  return [...groups.values()].sort((x, y) => order(x) - order(y));
}

/** Liste des déclencheurs d'un élément ou d'une page ; le déclencheur ouvert montre ses réglages. */
function TriggerList({ site, triggers, hostId, pageLevel, duplicates, open, onOpen, onUpdate, onRemove, settings = true }: { site: Site; triggers: Trigger[]; hostId: string; pageLevel?: boolean; duplicates?: Set<string>; open: OpenTimeline; settings?: boolean; onOpen: (o: OpenTimeline) => void; onUpdate: (t: Trigger, patch: Partial<Trigger>, label: string, coalesceKey?: string) => void; onRemove: (t: Trigger) => void }) {
  if (!triggers.length) return null;
  return (
    <ul className="flex flex-col gap-1">
      {triggers.map((t) => {
        const active = open?.triggerId === t.id;
        return (
          <li key={t.id} className={`flex flex-col gap-1.5 rounded-sm border p-1.5 ${active ? "border-accent bg-accent-soft/40" : "border-line bg-surface/60"}`}>
            <div className="flex items-center gap-1">
              {/* Toute la ligne ouvre la ligne de temps : chevron, libellé et « Modifier » au survol disent qu'elle se clique. */}
              <button type="button" className="group flex-1 min-w-0 min-h-7 flex items-center gap-1 rounded-xs px-1 text-left text-xs hover:bg-hover" title={active ? "Fermer la ligne de temps" : `Modifier la ligne de temps · ${describeTrigger(t, site)}`} onClick={() => onOpen(active ? null : { animationId: t.animation, hostId, triggerId: t.id })} aria-pressed={active} aria-expanded={active}>
                {active ? <ChevronDown size={13} className="shrink-0 text-accent" aria-hidden /> : <ChevronRight size={13} className="shrink-0 text-muted group-hover:text-accent" aria-hidden />}
                <span className={`flex-1 min-w-0 truncate ${active ? "text-ink font-medium" : "text-ink"}`}>{describeTrigger(t, site)}</span>
                {active ? null : <span className="shrink-0 text-2xs text-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">Modifier</span>}
              </button>
              {duplicates?.has(t.id) ? <Badge tone="warning" title="Une autre animation de la même famille (apparition, survol, continu) est déjà posée sur cet élément : les deux se jouent.">en double</Badge> : null}
              {(() => { const a = animationById(site, t.animation); const n = a && isSequence(a) ? a.tracks.filter((k) => !("trigger" in k.target)).length : 0; return <IconButton size="sm" label={n ? `Retirer le déclencheur : ${n} autre${n > 1 ? "s" : ""} élément${n > 1 ? "s" : ""} ne bouger${n > 1 ? "ont" : "a"} plus` : "Retirer le déclencheur"} icon={Trash2} tone="danger" onClick={() => onRemove(t)} />; })()}
            </div>
            {active && settings ? <TriggerSettings trigger={t} pageLevel={pageLevel} onUpdate={(patch, label, key) => onUpdate(t, patch, label, key)} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

/** Ajouter un déclencheur : quand, puis quoi (un préréglage, une animation du site, ou une animation vide à composer). */
function AddTrigger({ site, ons, defaultOn = "inView", hostLabel, title, explain, onAdd }: { site: Site; ons: TriggerOn[]; defaultOn?: TriggerOn; hostLabel?: string; title: string; explain: string; onAdd: (animationOps: Op[], trigger: Trigger, label: string, fresh?: boolean) => void }) {
  const [on, setOn] = useState<TriggerOn>(defaultOn);
  // En mode Animation, on vient composer : « Nouvelle animation » par défaut (les préréglages en un geste sont en Écriture et en Design).
  const [what, setWhat] = useState("new");
  // « Nouvelle animation » en tête : la bibliothèque du site peut compter des dizaines d'entrées.
  const options = [
    { value: "new", label: "Nouvelle animation (à composer)" },
    ...ANIMATION_PRESETS.map((p) => ({ value: `preset:${p.id}`, label: `Préréglage · ${p.group} · ${p.label}` })),
    ...site.animations.map((a) => ({ value: `anim:${a.id}`, label: `Du site · ${animationLabel(site, a)}` })),
  ];
  const add = () => {
    if (what.startsWith("preset:")) {
      const preset = presetById(what.slice(7)); if (!preset) return;
      const a = animationFromPreset(preset);
      onAdd(planAddAnimation(site, a), triggerFromPreset(preset, a.id, { on }), `Animation · ${preset.label}`);
    } else if (what.startsWith("anim:")) {
      onAdd([], { id: newId(), on, animation: what.slice(5) }, "Ajouter un déclencheur");
    } else {
      // Sans piste : on ajoute ensuite les éléments à animer (l'élément porteur compris, s'il doit bouger).
      const a: Animation = { id: newId(), name: nextAnimationName(site, hostLabel), duration: 1000, tracks: [] };
      onAdd(planAddAnimation(site, a), { id: newId(), on, animation: a.id }, "Nouvelle animation", true);
    }
  };
  return (
    <div className="flex flex-col gap-1 rounded-sm border border-dashed border-line p-1.5">
      <Eyebrow as="span">{title}</Eyebrow>
      <span className="text-2xs text-muted leading-snug">{explain}</span>
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <span className="text-xs text-muted">Quand</span><Select value={on} options={ons.map((value) => ({ value, label: TRIGGER_LABELS[value] }))} onValueChange={(v) => setOn(v as TriggerOn)} />
        <span className="text-xs text-muted">Animation</span><Select value={what} options={options} onValueChange={setWhat} />
      </div>
      <Button size="sm" icon={Plus} onClick={add} className="self-end">Ajouter</Button>
    </div>
  );
}

/**
 * Comment ça marche (audit n°5 · R3) : le modèle du mode Animation dit en trois temps, avant d'agir. Repliable ; le choix est mémorisé.
 * Avec une ligne de temps ouverte (`compact`), une seule ligne qui dit comment la lire : on y arrive souvent depuis la rubrique d'un élément.
 */
function HowItWorks({ compact = false }: { compact?: boolean }) {
  const [hidden, setHidden] = useState(() => { try { return localStorage.getItem("atelier:anim-howto-hidden") === "1"; } catch { return false; } });
  const toggle = (h: boolean) => { setHidden(h); try { localStorage.setItem("atelier:anim-howto-hidden", h ? "1" : "0"); } catch { /* stockage refusé */ } };
  if (hidden) return compact ? null : <button type="button" className="self-start text-2xs text-accent hover:underline" onClick={() => toggle(false)}>Comment ça marche ?</button>;
  if (compact) return (
    <p className="flex items-start gap-2 rounded-sm border border-line bg-surface/60 px-2 py-1.5 text-2xs text-muted leading-snug" aria-label="Comment lire la ligne de temps">
      <span className="flex-1"><span className="font-medium text-ink">Comment lire cet écran :</span> chaque ligne (une <em>piste</em>) est un élément qui bouge ; ses losanges (des <em>images-clés</em>) sont son état à un instant ; « Départ » dit quand il part. Pour un effet tout prêt, un délai ou « après tel élément », la rubrique Animation de l&apos;élément suffit.</span>
      <button type="button" className="shrink-0 text-muted hover:text-ink" onClick={() => toggle(true)}>Masquer</button>
    </p>
  );
  return (
    <section aria-label="Comment ça marche" className="flex flex-col gap-1.5 rounded-sm border border-line bg-surface/60 p-2.5 text-xs">
      <div className="flex items-center justify-between"><span className="font-medium text-ink">Comment ça marche</span><button type="button" className="text-2xs text-muted hover:text-ink" onClick={() => toggle(true)}>Masquer</button></div>
      <ol className="flex flex-col gap-1 text-muted leading-snug list-none">
        <li><span className="font-medium text-ink">1. Quand.</span> Un élément lance l&apos;animation : il entre dans l&apos;écran, on le survole, on clique dessus… La page aussi : chargement, défilement.</li>
        <li><span className="font-medium text-ink">2. Ce qui bouge.</span> Cet élément, ou d&apos;autres, choisis ensuite : la section lance, le titre puis le texte arrivent.</li>
        <li><span className="font-medium text-ink">3. Comment.</span> Un préréglage en un clic, ou vos propres images-clés sur la ligne de temps.</li>
      </ol>
    </section>
  );
}
