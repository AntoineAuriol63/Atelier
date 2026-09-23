"use client";

import { Columns2, Grid3x3, Maximize2, Minimize2, Moon, Sun } from "lucide-react";
import { Badge, Eyebrow, IconButton, NumberInput, Select, Separator } from "@/ui";

export type CanvasBarProps = {
  presets: { id: string; label: string; width: number | null }[];
  preset: string; customWidth: number | null;
  onPreset: (id: string) => void; onCustomWidth: (w: number | null) => void;
  /** Largeur réellement rendue, bornes de la largeur libre, taille d'écran active (« Tous les écrans », « Mobile »…), réduction pour tenir. */
  effective: number; minWidth: number; maxWidth: number; breakpoint: string; scale: number;
  editMode: "write" | "design" | "code";
  showGrid: boolean; onToggleGrid: () => void;
  compare: boolean; onCompare: () => void;
  modes: { id: string; name: string }[]; mode: string; onMode: (id: string) => void;
  focus: boolean; onFocus: () => void;
  /** Page par entrée : les entrées publiées et celle que l'aperçu montre. */
  entries?: { id: string; label: string }[]; entry?: string; onEntry?: (id: string) => void;
};

/**
 * La barre du canevas (23 septembre 2026) : tout ce qui règle la vue de l'aperçu, au-dessus de lui. Elle rétrécit avec le canevas ;
 * la barre du haut ne garde que le site, les modes et la publication. Ce qui ne tient pas reste dans la palette ⌘K et au clavier.
 */
export function CanvasBar({ presets, preset, customWidth, onPreset, onCustomWidth, effective, minWidth, maxWidth, breakpoint, scale, editMode, showGrid, onToggleGrid, compare, onCompare, modes, mode, onMode, focus, onFocus, entries, entry, onEntry }: CanvasBarProps) {
  const design = editMode === "design";
  return (
    <div className="@container shrink-0 flex items-center gap-1.5 h-9 px-2 border-b border-line bg-panel min-w-0 overflow-hidden" data-canvas-bar="" role="toolbar" aria-label="Vue de l'aperçu">
      {entries && onEntry ? (
        <div className="flex items-center gap-1 min-w-0" title="Modèle de page : quelle entrée afficher dans l'aperçu">
          <Eyebrow as="span">Entrée</Eyebrow>
          <Select className="max-w-[180px]" value={entry ?? ""} options={entries.map((e) => ({ value: e.id, label: e.label || "Sans titre" }))} onValueChange={onEntry} />
          <Separator vertical />
        </div>
      ) : null}
      <Select className="w-[104px] shrink-0" value={customWidth === null ? preset : ""} placeholder="Libre" options={presets.map((x) => ({ value: x.id, label: x.label }))} onValueChange={(id) => { onPreset(id); onCustomWidth(null); }} />
      <span className="hidden @[560px]:contents">
        <NumberInput className="w-[92px]" unit="px" min={minWidth} max={maxWidth} step={10} title="Largeur de l'aperçu (320 à 4000 px)" aria-label="Largeur de l'aperçu" value={Math.round(effective) || ""} onValueChange={(v) => onCustomWidth(v === "" ? null : v)} />
      </span>
      {design ? <Badge tone="accent" title="Les styles ajoutés maintenant s'appliquent à cette taille d'écran"><span className="hidden @[440px]:inline mr-1">Vous modifiez :</span>{breakpoint}</Badge> : null}
      {scale < 1 ? <Badge title="Aperçu réduit pour tenir dans la zone">{Math.round(scale * 100)} %</Badge> : null}
      <span className="ml-auto flex items-center gap-0.5 shrink-0">
        {design ? <IconButton size="sm" label={showGrid ? "Masquer la grille de mise en page (⌃G)" : "Afficher la grille de mise en page (⌃G)"} icon={Grid3x3} active={showGrid} onClick={onToggleGrid} /> : null}
        {design ? <IconButton size="sm" label={compare ? "Quitter la comparaison responsive" : "Comparer avec le mobile"} icon={Columns2} active={compare} onClick={onCompare} /> : null}
        {design ? <Separator vertical /> : null}
        {modes.map((m) => <IconButton key={m.id} size="sm" label={`Aperçu en mode ${m.name.toLowerCase()}`} icon={m.id === "dark" ? Moon : Sun} active={mode === m.id} onClick={() => onMode(m.id)} />)}
        <Separator vertical />
        <IconButton size="sm" label={focus ? "Quitter le mode concentration" : "Mode concentration : masquer les panneaux"} icon={focus ? Minimize2 : Maximize2} active={focus} onClick={onFocus} />
      </span>
    </div>
  );
}
