"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { ExternalLink, Film, Play } from "lucide-react";
import type { AppearanceBegin, CommitOptions, Node, Op, QuickGroup, Site } from "@atelier/model";
import {
  ANIMATION_PRESETS, TRIGGER_LABELS, animationLength, appearanceAnchors, appearanceOf, appearanceStartOptions, componentUsages, indexSite, inheritedAppearance, planAppearanceDelay, planAppearanceMoveTo, planAppearanceDetail, planAppearancePreset,
  planAppearanceCascade, planAppearanceDuration, planAppearanceReplay, planChainInOrder, planAppearanceSpeed, planAppearanceStart, planGroupAppearance, planQuickAnimation, planQuickSpeed, quickAnimation, quickSpeed, siblingGroup, trackSpan, type QuickSpeed,
} from "@atelier/model";
import { Button, Field, FieldGroup, Hint, NumberInput, Select, Toggle } from "@/ui";
import { Segmented } from "@/ui/controls";
import { formatDuration, formatMs, quoteLabel, summarizeAnimation } from "@/lib/timeline";
import { appearanceOptions } from "@/lib/appearance-options";
import { sceneContainerFor, sceneOf } from "@/lib/scene";
import { SceneOverview } from "./SceneOverview";
import { nodeLabel } from "../node-icons";

type Commit = (op: Op, opts?: CommitOptions) => void;
/** Jouer un déclencheur dans le canevas, depuis l'élément qui le porte (`hostId`, l'élément sélectionné par défaut). */
type PlayFn = (triggerId: string, hostId?: string) => void;
type Run = (ops: Op[], label: string, group?: QuickGroup, coalesceKey?: string) => void;
const SPEEDS = [{ value: "fast", label: "Rapide" }, { value: "normal", label: "Normale" }, { value: "slow", label: "Lente" }];
const REPLAY = [{ value: "once", label: "une seule fois" }, { value: "every", label: "à chaque passage" }];

const QUICK: { group: QuickGroup; label: string; none: string; hint: string }[] = [
  { group: "Survol", label: "Quand la souris passe dessus", none: "Aucun", hint: "Réagit au passage de la souris et revient quand elle part" },
  { group: "Continue", label: "En continu", none: "Aucun", hint: "En boucle dès le chargement" },
];

/** Une ligne réglage : libellé à gauche, contrôle à droite. Pas de <label> autour d'un groupe de boutons : un clic dans la marge activerait le premier. */
function Row({ label, title, children }: { label: string; title?: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-2" title={title}>
      <span className="text-xs text-muted truncate">{label}</span>
      <div className="flex flex-col gap-0.5 min-w-0">{children}</div>
    </div>
  );
}

/**
 * Préréglages en un geste (cadrage § 4.2 et § 4.3), en Écriture comme en Design : apparition, survol, continu, sur l'élément.
 * L'apparition se règle entièrement ici (tests simulés du 14 septembre, lot 1) : effet, vitesse, ce qui la fait démarrer (l'élément
 * lui-même, ou la fin d'un autre élément : « après « Titre » »), délai, rejouer, détail ; un enchaînement est une seule animation.
 */
export function QuickAnimations({ site, node, commit, onOpenAnimation, onPlay, onTestOnSite, onSelectNode, variant = "full" }: { site: Site; node: Node; commit: Commit; onOpenAnimation?: () => void; onPlay?: PlayFn; onTestOnSite?: (nodeId?: string) => void; onSelectNode?: (id: string) => void; /** « timing » : seulement quand l'apparition part et si elle rejoue (le tiroir Animation) ; l'effet et la vitesse restent dans l'inspecteur. */ variant?: "full" | "timing" }) {
  // Aperçu immédiat : après un choix, ce qu'il lance est joué une fois dans le canevas (cadrage : « on doit voir ce qu'on règle »).
  const pending = useRef<QuickGroup | null>(null);
  const playRef = useRef(onPlay);
  useEffect(() => { playRef.current = onPlay; });
  useEffect(() => {
    const group = pending.current;
    if (!group) return;
    const ap = group === "Apparition" ? appearanceOf(site, node.id) : undefined;
    const q = group === "Apparition" ? undefined : quickAnimation(site, node, group);
    const triggerId = ap?.trigger.id ?? q?.trigger.id;
    if (!triggerId) return;
    pending.current = null;
    // L'éditeur envoie le site au canevas dans son propre effet, après celui-ci : on laisse passer ce message avant de jouer.
    const timer = window.setTimeout(() => playRef.current?.(triggerId, ap?.hostId ?? node.id), 120);
    return () => window.clearTimeout(timer);
  }, [site, node]);
  const run: Run = (ops, label, group, coalesceKey) => { if (!ops.length) return; if (group) pending.current = group; commit({ op: "batch", ops, label }, { label, coalesceKey }); };
  const appearance = appearanceOf(site, node.id);
  // Un élément du modèle d'un composant : ce qu'on y règle vaut pour toutes ses occurrences (tests simulés, PR11), on le dit avant.
  const owner = indexSite(site).get(node.id)?.owner;
  const cmp = owner && "component" in owner ? site.components.find((c) => c.id === owner.component) : undefined;
  const uses = cmp ? componentUsages(site, cmp.id).length : 0;
  // La scène de la section (lot 8) : sur un bloc qui contient plusieurs éléments animés, tout en une vue ; sur un élément, le chemin vers elle.
  const scene = node.children?.length ? sceneOf(site, node.id) : undefined;
  const sceneContainer = scene ? undefined : sceneContainerFor(site, node.id);
  const sceneContainerLabel = sceneContainer ? quoteLabel(nodeLabel(indexSite(site).get(sceneContainer)!.node)) : "";
  if (variant === "timing") return <FieldGroup><AppearanceFields site={site} node={node} run={run} onSelectNode={onSelectNode} timing /></FieldGroup>;
  return (
    <FieldGroup>
      {scene ? (
        <Field label="Scène" inline={false} hint="Tout ce qui bouge dans ce bloc, sur une même règle : le départ et la fin de chaque élément, la durée totale. Chaque élément se règle en le sélectionnant.">
          <SceneOverview scene={scene} onSelectNode={onSelectNode} onChain={planChainInOrder(site, node.id).length ? () => run(planChainInOrder(site, node.id), `Enchaîner ${quoteLabel(nodeLabel(node))} dans l'ordre`, "Apparition") : undefined} />
        </Field>
      ) : null}
      {sceneContainer && onSelectNode ? <Button size="sm" variant="ghost" className="self-start" onClick={() => onSelectNode(sceneContainer)} title="Sélectionne la section : sa rubrique Animation montre tous les éléments qui bougent, leur ordre et la durée totale">{`Voir la scène de ${sceneContainerLabel}`}</Button> : null}
      {cmp ? <Hint>{`Dans le composant « ${cmp.name} » : ce réglage vaudra pour ${uses > 1 ? `ses ${uses} occurrences` : "chacune de ses occurrences"}. Pour une seule, cliquez l'occurrence dans la page.`}</Hint> : null}
      <AppearanceFields site={site} node={node} run={run} onPlay={onPlay} onSelectNode={onSelectNode} />
      {QUICK.map(({ group, label, none, hint }) => {
        const q = quickAnimation(site, node, group);
        const options = [{ value: "", label: none }, ...(q && !q.intact ? [{ value: "custom", label: `Personnalisée (${q.preset.label})` }] : []), ...ANIMATION_PRESETS.filter((p) => p.group === group).map((p) => ({ value: p.id, label: p.label }))];
        return (
          <Fragment key={group}>
            <Field label={label} hint={q && !q.intact ? `${hint}. Retouchée dans l'outil Animation : choisir un préréglage la remplace.` : hint}>
              <div className="flex items-center gap-1 min-w-0">
                <Select className="flex-1 min-w-0" value={q ? (q.intact ? q.preset.id : "custom") : ""} options={options} onValueChange={(v) => { if (v !== "custom") run(planQuickAnimation(site, node, group, v), v ? `${label} · ${ANIMATION_PRESETS.find((p) => p.id === v)?.label ?? v}` : `${label} · ${none.toLowerCase()}`, v ? group : undefined); }} />
                {q && onPlay ? <Button size="sm" variant="ghost" icon={Play} title={`Joue « ${q.preset.label} » dans l'aperçu`} onClick={() => onPlay(q.trigger.id)}>Voir l&apos;effet</Button> : null}
              </div>
            </Field>
            {q ? (
              <Row label="Vitesse" title="Vitesse de l'animation, par rapport au préréglage">
                <Segmented size="sm" required label={`Vitesse · ${label}`} className="w-full" value={quickSpeed(q) === "custom" ? undefined : quickSpeed(q)} options={SPEEDS} onChange={(v) => { if (v) run(planQuickSpeed(site, node, group, v as QuickSpeed), `${label} · ${SPEEDS.find((o) => o.value === v)?.label.toLowerCase()}`, group); }} />
                {quickSpeed(q) === "custom" ? <span className="text-2xs text-muted">Sur mesure : {formatMs(animationLength(q.animation))}</span> : null}
              </Row>
            ) : null}
            {q ? <Field label=""><p className="text-2xs text-muted leading-snug" data-anim-summary="">{summarizeAnimation(site, q.trigger, node.id)}</p></Field> : null}
          </Fragment>
        );
      })}
      <div className="flex flex-wrap items-center gap-1">
        {/* Le canevas joue l'animation ; le vrai déclenchement (entrée dans l'écran, survol) se vérifie sur le site (audit n°5 · R4). */}
        {/* Avant même la première animation (vague 4, P5 : « il n'apparaît qu'une fois qu'on a déjà posé une animation, c'est-à-dire trop tard »). */}
        {onTestOnSite ? <Button size="sm" variant="ghost" icon={ExternalLink} onClick={() => onTestOnSite(appearance && !appearance.page && appearance.hostId !== node.id ? appearance.hostId : undefined)} title={node.triggers?.length || appearance ? "Ouvre l'onglet Aperçu : ce qui lance l'animation arrive à l'écran et elle se joue comme pour un visiteur" : "Ouvre l'onglet Aperçu sur cet élément : la page telle qu'un visiteur la voit, avec ses mouvements"}>Tester sur le site</Button> : null}
        {onOpenAnimation ? <Button size="sm" variant="ghost" icon={Film} onClick={onOpenAnimation}>Ouvrir la ligne de temps</Button> : null}
      </div>
    </FieldGroup>
  );
}


/** L'apparition de l'élément : effet, vitesse, démarrage, délai, rejouer, phrase de résumé et détail (lettres, enfants). */
function AppearanceFields({ site, node, run, onPlay, onSelectNode, timing = false }: { site: Site; node: Node; run: Run; onPlay?: PlayFn; onSelectNode?: (id: string) => void; timing?: boolean }) {
  const index = indexSite(site);
  const ap = appearanceOf(site, node.id, index);
  // Sans apparition propre, il arrive peut-être avec un autre élément (la carte d'une liste) : on le dit au lieu d'« Aucune » (tests simulés, PR3).
  const inherited = ap ? undefined : inheritedAppearance(site, node.id, index);
  const labelOf = (id: string) => { const n = index.get(id)?.node; return quoteLabel(n ? nodeLabel(n) : id); };
  // Le premier choix dit d'où vient l'apparition héritée, sans se laisser choisir (il n'écrirait rien) ; un préréglage s'applique à la liste pour une carte.
  const choice = appearanceOptions(site, node.id);
  const canLetters = node.type === "text";
  const canChildren = node.type === "collection" || (node.children?.length ?? 0) > 1;
  const anchors = ap ? appearanceAnchors(site, node.id) : [];
  // Les blocs qui le contiennent (la section) peuvent lancer toute la scène : « quand « La maison » entre dans l'écran ».
  const containers = ap ? appearanceStartOptions(site, node.id) : [];
  const beginValue = (b: AppearanceBegin) => (b.kind === "own" ? `own:${b.on}` : b.kind === "host" ? (containers.includes(b.hostId) ? `within:${b.hostId}` : "host") : `${b.kind}:${b.node}`);
  const beginOptions = ap ? [
    { value: "own:inView", label: "quand il entre dans l'écran" },
    { value: "own:load", label: "dès l'ouverture de la page" },
    ...containers.map((id) => ({ value: `within:${id}`, label: `quand ${labelOf(id)} entre dans l'écran` })),
    ...(ap.begin.kind === "host" && !containers.includes(ap.hostId) ? [{ value: "host", label: ap.page ? `avec la page (${TRIGGER_LABELS[ap.trigger.on].toLowerCase()})` : `avec ${labelOf(ap.hostId)} (${TRIGGER_LABELS[ap.trigger.on].toLowerCase()})` }] : []),
    ...anchors.map((id) => ({ value: `after:${id}`, label: `après ${labelOf(id)}` })),
    ...anchors.map((id) => ({ value: `with:${id}`, label: `en même temps que ${labelOf(id)}` })),
  ] : [];
  const setBegin = (v: string) => {
    if (!ap || v === "host" || v === beginValue(ap.begin)) return;
    const [kind, rest] = [v.slice(0, v.indexOf(":")), v.slice(v.indexOf(":") + 1)];
    const begin: AppearanceBegin = kind === "own" ? { kind: "own", on: rest as "load" | "inView" } : { kind: kind as "after" | "with" | "within", node: rest };
    run(planAppearanceStart(site, node.id, begin), `Apparition · démarre ${beginOptions.find((o) => o.value === v)?.label ?? ""}`, "Apparition");
  };
  const len = ap ? trackSpan(ap.track).end - ap.start : 0;
  return (
    <>
      {timing ? null : <Field label="Apparition" hint={ap && !ap.preset ? "L'élément arrive. Retouchée dans l'outil Animation : choisir un préréglage la remplace, en gardant son départ." : "L'élément arrive quand il entre dans l'écran, ou après un autre élément"}>
        <div className="flex items-center gap-1 min-w-0">
          <Select className="flex-1 min-w-0" value={choice.value} options={choice.options} onValueChange={(v) => {
            if (v === "custom" || v === choice.value) return;
            run(planAppearancePreset(site, choice.applyTo, v), v ? `Apparition · ${ANIMATION_PRESETS.find((p) => p.id === v)?.label ?? v}` : "Apparition · aucune", v ? "Apparition" : undefined);
          }} />
          {ap && onPlay ? <Button size="sm" variant="ghost" icon={Play} title="Joue l'apparition dans l'aperçu" onClick={() => onPlay(ap.trigger.id, ap.hostId)}>Voir l&apos;effet</Button> : null}
        </div>
      </Field>}
      {/* Une scène en un geste (lot 7 ; lot 8 : nommé et placé sous l'effet, personne ne l'avait trouvé) : les voisins qui suivent reçoivent la même apparition, l'un après l'autre. */}
      {ap && !timing ? (() => { const siblings = index.get(node.id)?.parent?.children ?? []; const following = siblings.slice(siblings.indexOf(node) + 1).filter((n) => !appearanceOf(site, n.id, index)); if (!following.length) return null;
        const names = following.map((n) => labelOf(n.id)); const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}` : names[0];
        return (
          <Field label="" hint="Copie l'effet de cet élément sur ceux qui le suivent">
            <Button size="sm" variant="ghost" className="self-start whitespace-normal text-left" onClick={() => run(planAppearanceCascade(site, node.id, 120), `Apparition · pareil pour ${following.length > 1 ? `les ${following.length} suivants` : "le suivant"}`, "Apparition")} title={`Le même effet (${ap.preset?.label ?? ap.origin?.label ?? "cette apparition"}) sur ${list}, chacun 120 ms après le précédent ; chacun se règle ensuite à part`}>{`Pareil pour ${list}`}</Button>
          </Field>
        ); })() : null}
      {/* Le groupe de l'élément (lot 8, vague 4 PR2) : depuis un chiffre ou une carte, on règle les trois d'un coup, sans avoir à atteindre le groupe. */}
      {timing ? null : (() => {
        const g = siblingGroup(site, node.id);
        if (!g) return null;
        const groupAp = appearanceOf(site, g.groupId, index);
        const value = groupAp && groupAp.detail === "children" ? (groupAp.preset?.id ?? "custom") : "";
        const options = [{ value: "", label: "Chacun à part" }, ...(value === "custom" ? [{ value: "custom", label: "Personnalisée" }] : []), ...ANIMATION_PRESETS.filter((p) => p.group === "Apparition").map((p) => ({ value: p.id, label: p.label }))];
        const what = g.kind === "cards" ? "les cartes" : `les ${g.members.length} éléments`;
        return (
          <Field label="Ses voisins" hint={`${quoteLabel(nodeLabel(node))} fait partie du groupe ${labelOf(g.groupId)} : un effet choisi ici fait arriver ${what} un à un, l'un après l'autre`}>
            <div className="flex flex-col gap-1 min-w-0">
              <Select value={value} options={options} onValueChange={(v) => { if (v === "custom" || v === value) return; run(planGroupAppearance(site, node.id, v), v ? `Apparition du groupe ${labelOf(g.groupId)} · ${ANIMATION_PRESETS.find((p) => p.id === v)?.label ?? v}` : `Apparition du groupe ${labelOf(g.groupId)} · aucune`, v ? "Apparition" : undefined); }} />
              <p className="text-2xs text-muted leading-snug">{`Avec ${g.members.filter((id) => id !== node.id).map(labelOf).join(", ")} dans le groupe ${labelOf(g.groupId)} : ${what} un à un.`}</p>
              {onSelectNode ? <Button size="sm" variant="ghost" className="self-start" onClick={() => onSelectNode(g.groupId)} title="Sélectionne le groupe, pour régler l'ordre, l'écart et le reste">{`Régler sur ${labelOf(g.groupId)}`}</Button> : null}
            </div>
          </Field>
        );
      })()}
      {inherited ? (
        <Field label="">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-2xs text-muted leading-snug" data-anim-summary="">{`Arrive avec ${labelOf(inherited.carrierId)}${inherited.viaChildren ? " : l'effet choisi ici vaut pour tous ses éléments" : ", d'un seul bloc"}. ${summarizeAnimation(site, inherited.appearance.trigger, inherited.appearance.hostId, !!inherited.appearance.page)}`}</p>
            {onSelectNode ? <Button size="sm" variant="ghost" className="self-start" onClick={() => onSelectNode(inherited.carrierId)} title="Sélectionne l'élément qui porte cette apparition, pour la régler">{`Régler sur ${labelOf(inherited.carrierId)}`}</Button> : null}
          </div>
        </Field>
      ) : null}
      {ap ? (
        <>
          {timing ? null : ap.preset || ap.origin ? (
            <Row label="Vitesse" title="Vitesse de l'apparition, par rapport au préréglage ; ce qui démarre après elle suit">
              <Segmented size="sm" required label="Vitesse · Apparition" className="w-full" value={ap.speed === "custom" ? undefined : ap.speed} options={SPEEDS} onChange={(v) => { if (v) run(planAppearanceSpeed(site, node.id, v as QuickSpeed), `Apparition · ${SPEEDS.find((o) => o.value === v)?.label.toLowerCase()}`, "Apparition"); }} />
              {/* La durée se tape aussi (vague 4, N-11 : « quand une maquette dit 400 ms, il me faut un champ où taper 400 »). */}
              <div className="flex items-center gap-1"><NumberInput className="w-[110px]" unit="ms" min={50} step={50} value={len} aria-label="Durée de l'apparition" title="Durée du mouvement, en millisecondes ; ce qui démarre après suit" onValueChange={(v) => { if (v !== "" && v !== len) run(planAppearanceDuration(site, node.id, v), `Apparition · ${formatMs(v)}`, "Apparition", `appear-dur:${node.id}`); }} />{len >= 1000 ? <span className="text-2xs text-muted">{formatDuration(len).replace(/^[^(]*/, "")}</span> : null}</div>
            </Row>
          ) : <Row label="Vitesse"><div className="flex items-center gap-1"><NumberInput className="w-[110px]" unit="ms" min={50} step={50} value={len} aria-label="Durée de l'apparition" title="Durée du mouvement, en millisecondes ; ce qui démarre après suit" onValueChange={(v) => { if (v !== "" && v !== len) run(planAppearanceDuration(site, node.id, v), `Apparition · ${formatMs(v)}`, "Apparition", `appear-dur:${node.id}`); }} /><span className="text-2xs text-muted">Sur mesure</span></div></Row>}
          <Field label="Démarre" hint="Ce qui fait partir l'apparition : l'élément lui-même, ou la fin (ou le début) de l'apparition d'un autre élément de la page">
            <Select value={beginValue(ap.begin)} options={beginOptions} onValueChange={setBegin} />
          </Field>
          <Field label="Délai" hint="Attente avant de partir, après ce qui la fait démarrer">
            {/* Un délai négatif sur un élément rattaché n'est pas refusé : la barre se place avant, « Démarre » s'adapte (en même temps que, ou détaché). */}
            <div className="flex items-center gap-1" data-appear-delay=""><NumberInput unit="ms" step={50} min={ap.begin.kind === "after" || ap.begin.kind === "with" ? undefined : 0} value={ap.delay} onValueChange={(v) => { const n = v === "" ? 0 : v; const b = ap.begin; if (n < 0 && (b.kind === "after" || b.kind === "with")) { const anchor = appearanceOf(site, b.node, index); const ref = (ap.trigger.delay ?? 0) + (anchor ? (b.kind === "after" ? anchor.end : anchor.start) : 0); run(planAppearanceMoveTo(site, node.id, ref + n), "Apparition · délai", undefined, `appear-delay:${node.id}`); } else run(planAppearanceDelay(site, node.id, Math.max(0, n)), "Apparition · délai", undefined, `appear-delay:${node.id}`); }} />{ap.delay >= 1000 ? <span className="text-2xs text-muted">{formatDuration(ap.delay).replace(/^[^(]*/, "")}</span> : null}</div>
          </Field>
          {ap.trigger.on === "inView" ? (
            <Row label="Rejouer" title={ap.own ? "Rejouer l'apparition chaque fois que l'élément revient à l'écran" : `Se règle sur ce qui lance l'apparition (${labelOf(ap.hostId)}), pour tout l'enchaînement`}>
              <Segmented size="sm" required label="Rejouer" className="w-full" value={ap.trigger.once === false ? "every" : "once"} options={REPLAY} onChange={(v) => { if (v) run(planAppearanceReplay(site, node.id, v === "every"), v === "every" ? "Apparition · à chaque passage" : "Apparition · une seule fois"); }} />
            </Row>
          ) : null}
          <Field label=""><p className="text-2xs text-muted leading-snug" data-anim-summary="">{summarizeAnimation(site, ap.trigger, ap.hostId, !!ap.page)}</p></Field>
          {(canLetters || canChildren) && !timing ? (
            <Field label="" hint="Faire arriver l'élément d'un bloc, ou ses morceaux un à un">
              {canLetters
                ? <Toggle checked={ap.detail === "letters"} label="lettre par lettre" onChange={(b) => run(planAppearanceDetail(site, node.id, b ? "letters" : "one"), b ? "Apparition lettre par lettre" : "Apparition d'un bloc", "Apparition")} />
                : <Toggle checked={ap.detail === "children"} label={node.type === "collection" ? "les cartes une à une" : `les ${node.children?.length ?? 0} éléments un à un`} onChange={(b) => run(planAppearanceDetail(site, node.id, b ? "children" : "one"), b ? "Apparition enfant par enfant" : "Apparition d'un bloc", "Apparition")} />}
            </Field>
          ) : null}
        </>
      ) : null}
    </>
  );
}
