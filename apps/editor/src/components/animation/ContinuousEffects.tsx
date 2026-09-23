"use client";

import type { CommitOptions, Node, Op } from "@atelier/model";
import { marqueeOf } from "@atelier/renderer";
import { Hint, NumberInput, Select, Toggle } from "@/ui";
import { PropRow } from "@/ui/controls";

type Commit = (op: Op, opts?: CommitOptions) => void;
export type ContinuousEffect = "parallax" | "marquee" | "countUp" | "autoplay";
type Marquee = NonNullable<ReturnType<typeof marqueeOf>>;
type View = { layout?: string; autoplay?: number };

/**
 * Effets continus d'un élément (cadrage § 2 et § 4.1) : des propriétés, pas des animations, que le outil Animation montre au même endroit
 * que les déclencheurs ; la section Effets de Design garde la parallaxe et le bandeau, la section Animations le compteur, la vue son carrousel.
 * Bandeau pour une boîte, compteur pour un texte, défilement automatique pour une vue en carrousel.
 */
export function ContinuousEffects({ node, commit, only, hint = true }: { node: Node; commit: Commit; only?: ContinuousEffect[]; hint?: boolean }) {
  const show = (e: ContinuousEffect) => !only || only.includes(e);
  const set = (path: string, value: unknown, label: string, coalesceKey?: string) => commit({ op: "node.set", id: node.id, path, value }, { label, coalesceKey });
  const parallax = typeof node.props.parallax === "number" ? node.props.parallax : undefined;
  const mq = node.type === "box" ? marqueeOf(node) : null;
  const setMq = (patch: Partial<Marquee> | null, label: string) => set("props.marquee", patch === null ? undefined : { duration: 20, ...(mq ?? {}), ...patch }, label);
  const view = node.type === "collection" ? (node.props.view as View | undefined) : undefined;
  return (
    <>
      {show("parallax") ? (
        <PropRow label="Parallaxe" sourceTitle="Propriété de l'élément (props.parallax)" source={parallax !== undefined ? { kind: "local" } : undefined} onReset={parallax !== undefined ? () => set("props.parallax", undefined, "Parallaxe") : undefined}>
          <NumberInput className="w-24" step={0.05} min={-1} max={1} value={parallax ?? ""} placeholder="aucune" onValueChange={(n) => set("props.parallax", n === "" || n === 0 ? undefined : n, "Parallaxe", `parallax:${node.id}`)} />
        </PropRow>
      ) : null}
      {show("marquee") && node.type === "box" ? (
        <>
          <PropRow label="Bandeau" sourceTitle="Propriété de l'élément (props.marquee)" source={mq ? { kind: "local" } : undefined} onReset={mq ? () => setMq(null, "Bandeau défilant") : undefined}>
            <NumberInput className="w-24" unit="s" step={1} min={2} value={mq ? mq.duration : ""} placeholder="non" onValueChange={(n) => (n === "" || n === 0 ? setMq(null, "Bandeau défilant") : setMq({ duration: n }, "Bandeau défilant"))} />
          </PropRow>
          {mq ? <PropRow label="Sens" sourceTitle="Sens du défilement"><Select className="flex-1" value={mq.direction ?? "left"} options={[{ value: "left", label: "Vers la gauche" }, { value: "right", label: "Vers la droite" }, { value: "up", label: "Vers le haut" }, { value: "down", label: "Vers le bas" }]} onValueChange={(v) => setMq({ direction: v as Marquee["direction"] }, "Sens du bandeau")} /></PropRow> : null}
          {mq ? <PropRow label="Survol" sourceTitle="Pause au survol"><Toggle checked={!!mq.pauseOnHover} label={mq.pauseOnHover ? "en pause" : "continue"} onChange={(b) => setMq({ pauseOnHover: b || undefined }, "Pause du bandeau")} /></PropRow> : null}
        </>
      ) : null}
      {show("countUp") && node.type === "text" ? (
        <PropRow label="Compteur" sourceTitle="Le nombre du texte défile de 0 à sa valeur quand il entre dans l'écran (« 12 ans » compte jusqu'à 12)" source={node.props.countUp ? { kind: "local" } : undefined} onReset={node.props.countUp ? () => set("props.countUp", undefined, "Compteur fixe") : undefined}>
          <Toggle checked={!!node.props.countUp} label="compter jusqu'au nombre" onChange={(b) => set("props.countUp", b || undefined, b ? "Compteur animé" : "Compteur fixe")} />
        </PropRow>
      ) : null}
      {show("autoplay") && node.type === "collection" && view?.layout === "carousel" ? (
        <PropRow label="Défilement" sourceTitle="Carrousel : passe à la carte suivante toutes les N secondes ; vide = à la main. S'arrête au survol." source={view.autoplay ? { kind: "local" } : undefined} onReset={view.autoplay ? () => set("props.view.autoplay", undefined, "Défilement automatique") : undefined}>
          <NumberInput className="w-24" unit="s" min={1} step={1} value={view.autoplay ?? ""} placeholder="manuel" onValueChange={(n) => set("props.view.autoplay", n === "" ? undefined : n, "Défilement automatique")} />
        </PropRow>
      ) : null}
      {hint && (show("parallax") || (show("marquee") && node.type === "box")) ? <Hint>Parallaxe : l&apos;élément se déplace moins vite (0,1 léger, 0,3 marqué) ou plus vite (négatif) que la page au défilement.{node.type === "box" ? <> Bandeau : le contenu de la boîte défile en boucle (durée d&apos;un tour, sens, pause au survol) ; pour le haut et le bas, la hauteur de la boîte fait la fenêtre.</> : null} Ces effets se jouent sur le site publié et dans l&apos;onglet Aperçu (« Tester sur le site »), pas dans le canevas de l&apos;éditeur.</Hint> : null}
    </>
  );
}
