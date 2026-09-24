"use client";

import type { CommitOptions, Node, Op, Site, Track } from "@atelier/model";
import { AppearancePanel, EffectsPanel, SizePanel, SpacingPanel, TypographyPanel, useKeyframeStyle } from "../design";
import { MotionPanel } from "./MotionPanel";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Les panneaux Design de l'élément de la piste, en mode image-clé : ils lisent l'instant et écrivent dans l'image-clé. */
export function KeyframePanels({ site, getSite, node, bp, mode, animationId, track, at, commit }: { site: Site; getSite: () => Site; node: Node; bp: string; mode?: string; animationId: string; track: Track; at: number; commit: Commit }) {
  const style = useKeyframeStyle(site, getSite, node, bp, animationId, track, at, commit);
  return (
    <div className="flex flex-col border-t border-line" data-keyframe-panels="">
      <MotionPanel site={site} style={style} />
      <EffectsPanel site={site} style={style} defaultOpen={false} />
      <AppearancePanel site={site} style={style} mode={mode} defaultOpen={false} />
      <SizePanel site={site} style={style} defaultOpen={false} />
      <SpacingPanel site={site} style={style} defaultOpen={false} />
      {node.type === "text" || node.type === "link" ? <TypographyPanel site={site} style={style} mode={mode} defaultOpen={false} /> : null}
    </div>
  );
}
