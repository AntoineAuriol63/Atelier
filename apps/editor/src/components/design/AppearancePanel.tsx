"use client";

import { useRef, useState } from "react";
import { Images, Plus, Upload, X } from "lucide-react";
import { assetLabel } from "@/lib/upload";
import { useMediaLibrary } from "@/components/MediaLibrary";
import type { Asset, Gradient, Site, StyleValue } from "@atelier/model";
import { Button, Hint, NumberInput, Section, Select, TextInput } from "@/ui";
import { ColorInput, PropRow, Segmented, UnitInput, TokenSelect } from "@/ui/controls";
import { tokenOptions } from "@/lib/css-value";
import type { StyleApi } from "./useStyle";

const BORDER_STYLES = [{ value: "solid", label: "Plein" }, { value: "dashed", label: "Tirets" }, { value: "dotted", label: "Points" }, { value: "none", label: "Aucune" }];
const SIDES = ["Top", "Right", "Bottom", "Left"] as const;
const CORNERS = [["TopLeft", "Haut gauche"], ["TopRight", "Haut droit"], ["BottomRight", "Bas droit"], ["BottomLeft", "Bas gauche"]] as const;

function str(v: unknown): string | undefined { return typeof v === "string" ? v : undefined; }
function bgKind(v: StyleValue | undefined): "none" | "color" | "gradient" | "image" {
  if (v === undefined || v === "none" || v === "") return "none";
  if (typeof v === "object" && v) { if ("gradient" in v) return "gradient"; if ("image" in v) return "image"; }
  return "color";
}

function GradientEditor({ site, value, onChange, mode }: { site: Site; value: Gradient; onChange: (g: Gradient) => void; mode?: string }) {
  const stops = value.stops;
  const setStop = (i: number, patch: Partial<Gradient["stops"][number]>) => onChange({ ...value, stops: stops.map((s, j) => (j === i ? { ...s, ...patch } : s)) });
  return (
    <div className="flex flex-col gap-1.5 pl-[18px]">
      <div className="flex items-center gap-1">
        <Segmented value={value.type} options={[{ value: "linear", label: "Linéaire" }, { value: "radial", label: "Radial" }]} onChange={(t) => onChange({ ...value, type: (t as Gradient["type"]) ?? "linear" })} />
        {value.type === "linear" ? <NumberInput className="w-20" unit="°" min={0} max={360} step={15} value={value.angle ?? 180} onValueChange={(n) => onChange({ ...value, angle: n === "" ? 180 : n })} /> : null}
      </div>
      {stops.map((st, i) => (
        <div key={i} className="flex items-center gap-1">
          <ColorInput className="flex-1" site={site} mode={mode} value={st.color} onChange={(c) => setStop(i, { color: c ?? "transparent" })} />
          <UnitInput className="w-20" site={site} defaultUnit="%" value={st.at} onChange={(v) => setStop(i, { at: typeof v === "string" ? v : "0%" })} />
          <button type="button" aria-label="Retirer l'arrêt" disabled={stops.length <= 2} onClick={() => onChange({ ...value, stops: stops.filter((_, j) => j !== i) })} className="w-6 h-6 inline-flex items-center justify-center rounded-xs text-dim hover:text-danger disabled:opacity-30"><X size={12} /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange({ ...value, stops: [...stops, { color: "#ffffff", at: "100%" }] })} className="self-start inline-flex items-center gap-1 h-6 px-2 rounded-sm text-xs text-muted hover:bg-hover hover:text-ink"><Plus size={12} /> Ajouter un arrêt</button>
    </div>
  );
}

export function AssetPicker({ site, value, onChange, kind = "image", onImport, busy, onOpenLibrary }: { site: Site; value: string | null | undefined; onChange: (id: string | null) => void; kind?: Asset["kind"]; onImport?: (files: File[]) => void; busy?: string | null; onOpenLibrary?: () => void }) {
  const locale = site.settings.defaultLocale;
  const library = useMediaLibrary();
  const openLibrary = onOpenLibrary ?? (library ? () => library.open({ value: value ?? null, onPick: onChange }) : undefined);
  // Les huit plus récentes (et celle choisie) : pour le reste, la bibliothèque.
  const all = site.assets.filter((a) => a.kind === kind);
  const recent = [...all].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")).slice(0, 8);
  const assets = value && !recent.some((a) => a.id === value) ? [...recent, ...all.filter((a) => a.id === value)] : recent;
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-4 gap-1">
        {assets.map((a) => {
          const label = assetLabel(a, locale);
          return (
            <button key={a.id} type="button" title={label} onClick={() => onChange(a.id)} className={`flex flex-col gap-0.5 min-w-0 rounded-xs p-0.5 ${value === a.id ? "bg-accent-soft" : "hover:bg-hover"}`}>
              <span className={`block aspect-square w-full rounded-xs overflow-hidden border ${value === a.id ? "border-accent" : "border-line"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.variants?.[0]?.url ?? a.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </span>
              <span className="block text-2xs text-muted truncate w-full text-left">{label}</span>
            </button>
          );
        })}
        {onImport ? (
          <button type="button" title="Importer des images depuis l'ordinateur" aria-label="Importer des images depuis l'ordinateur" disabled={!!busy} onClick={() => input.current?.click()} className="aspect-square rounded-xs border border-dashed border-line-strong text-dim hover:text-ink hover:border-accent grid place-items-center disabled:opacity-50">
            <Upload size={14} strokeWidth={1.75} />
          </button>
        ) : null}
        <button type="button" title={`Aucune ${kind === "image" ? "image" : "ressource"}`} onClick={() => onChange(null)} className={`aspect-square rounded-xs border border-dashed text-2xs text-dim ${!value ? "border-accent" : "border-line-strong hover:border-line-strong hover:text-ink"}`}>Aucune</button>
      </div>
      {onImport ? <input ref={input} type="file" accept="image/*,.heic,.heif" multiple hidden onChange={(e) => { const files = [...(e.target.files ?? [])]; e.target.value = ""; if (files.length) onImport(files); }} /> : null}
      {busy ? <span className="text-2xs text-muted">{busy}</span> : null}
      {openLibrary ? <Button size="sm" variant="ghost" icon={Images} onClick={openLibrary}>{all.length > assets.length ? `Toutes les images (${all.length})…` : "Bibliothèque d'images…"}</Button> : null}
    </div>
  );
}

export function AppearancePanel({ site, style, mode }: { site: Site; style: StyleApi; mode?: string }) {
  const s = style;
  const row = (prop: string, label: string, children: React.ReactNode, wide?: boolean) => (
    <PropRow key={`${prop}:${label}`} prop={prop} label={label} source={s.source(prop)} sourceTitle={s.title(prop)} onReset={() => s.reset(prop)} wide={wide}>{children}</PropRow>
  );
  const bg = s.value("background");
  const kind = bgKind(bg);
  const [perCorner, setPerCorner] = useState(false);
  const shadowTokens = tokenOptions(site, "shadow");
  const shadowValue = (() => { const v = s.value("boxShadow"); if (typeof v === "object" && v && "token" in v) return `{${v.token}}`; return str(v) ?? ""; })();
  const opacity = (() => { const v = str(s.value("opacity")); if (!v) return ""; const n = Number(v); return Number.isFinite(n) ? Math.round(n * 100) : ""; })();

  return (
    <Section title="Apparence" defaultOpen={false} hint="Fond, bordure, arrondi, ombre et opacité de l'élément.">
      {row("background", "Fond", (
        <Segmented className="flex-1" value={kind === "none" ? undefined : kind} options={[{ value: "color", label: "Couleur" }, { value: "gradient", label: "Dégradé" }, { value: "image", label: "Image" }]} onChange={(k) => {
          if (!k) s.set("background", undefined, false);
          else if (k === "color") s.set("background", typeof bg === "string" ? bg : "#ffffff", false);
          else if (k === "gradient") s.set("background", { gradient: { type: "linear", angle: 180, stops: [{ color: typeof bg === "string" ? bg : "#ffffff", at: "0%" }, { color: "#000000", at: "100%" }] } }, false);
          else s.set("background", { image: site.assets.find((a) => a.kind === "image")?.id ?? "", size: "cover", position: "center" }, false);
        }} />
      ), true)}
      {kind === "color" ? row("background", "Couleur", <ColorInput className="flex-1" site={site} mode={mode} value={bg} onChange={(v) => s.set("background", v)} />) : null}
      {kind === "gradient" && typeof bg === "object" && bg && "gradient" in bg ? <GradientEditor site={site} mode={mode} value={bg.gradient} onChange={(g) => s.set("background", { gradient: g })} /> : null}
      {kind === "image" && typeof bg === "object" && bg && "image" in bg ? (
        <div className="flex flex-col gap-1.5 pl-[18px]">
          <AssetPicker site={site} value={bg.image} onChange={(id) => s.set("background", { ...bg, image: id ?? "" }, false)} />
          <div className="flex items-center gap-1">
            <Select className="flex-1" value={bg.size ?? "cover"} options={[{ value: "cover", label: "Couvrir" }, { value: "contain", label: "Contenir" }, { value: "auto", label: "Taille réelle" }]} onValueChange={(v) => s.set("background", { ...bg, size: v }, false)} />
            <Select className="flex-1" value={bg.position ?? "center"} options={[{ value: "center", label: "Centré" }, { value: "top", label: "Haut" }, { value: "bottom", label: "Bas" }, { value: "left", label: "Gauche" }, { value: "right", label: "Droite" }]} onValueChange={(v) => s.set("background", { ...bg, position: v }, false)} />
          </div>
        </div>
      ) : null}

      <div className="h-px bg-line my-1" />
      {row("borderWidth", "Bordure", (
        <div className="flex items-center gap-1 flex-1">
          <UnitInput prop="borderWidth" className="w-16" site={site} value={s.value("borderWidth")} onChange={(v) => { s.set("borderWidth", v); if (v && !s.value("borderStyle")) s.set("borderStyle", "solid", false); }} placeholder="0" />
          <Select className="w-20" value={str(s.value("borderStyle")) ?? ""} placeholder="Style" options={BORDER_STYLES} onValueChange={(v) => s.set("borderStyle", v || undefined, false)} />
          <ColorInput className="flex-1" site={site} mode={mode} value={s.value("borderColor")} onChange={(v) => s.set("borderColor", v)} />
        </div>
      ))}
      {SIDES.some((side) => s.value(`border${side}Width`) !== undefined) ? <Hint>Des bordures sont posées côté par côté (section CSS brut) ; elles priment sur la bordure globale.</Hint> : null}

      {row("borderRadius", "Arrondi", (
        <div className="flex items-center gap-1 flex-1">
          {perCorner ? null : <UnitInput prop="borderRadius" className="flex-1" site={site} tokenGroup="radius" value={s.value("borderRadius")} onChange={(v) => s.set("borderRadius", v)} placeholder="0" />}
          <button type="button" onClick={() => setPerCorner((p) => !p)} className={`h-7 px-2 rounded-sm text-2xs border ${perCorner ? "border-accent text-accent" : "border-line text-muted hover:text-ink"}`} title="Régler chaque coin">coins</button>
        </div>
      ))}
      {perCorner ? (
        <div className="grid grid-cols-2 gap-1.5 pl-[18px]">
          {CORNERS.map(([c, label]) => (
            <PropRow key={c} prop={`border${c}Radius`} label={label} source={s.source(`border${c}Radius`)} sourceTitle={s.title(`border${c}Radius`)} onReset={() => s.reset(`border${c}Radius`)}>
              <UnitInput className="flex-1" site={site} tokenGroup="radius" value={s.value(`border${c}Radius`)} onChange={(v) => s.set(`border${c}Radius`, v)} placeholder="0" />
            </PropRow>
          ))}
        </div>
      ) : null}

      {row("boxShadow", "Ombre", (
        <div className="flex items-center gap-1 flex-1">
          <Select className="w-24" value={shadowValue.startsWith("{") ? shadowValue : ""} placeholder={shadowValue ? "Perso." : "Aucune"} options={shadowTokens.map((t) => ({ value: `{${t.token}}`, label: t.label }))} onValueChange={(v) => { const m = v.match(/^\{(.+)\}$/); s.set("boxShadow", m ? { token: m[1]! } : undefined, false); }} />
          <div className="flex items-center gap-1 flex-1 min-w-0"><TextInput mono className="flex-1 min-w-0" value={shadowValue.startsWith("{") ? "" : shadowValue} placeholder="0 4px 12px rgba(0,0,0,.2)" onValueChange={(v) => s.set("boxShadow", v || undefined)} /><TokenSelect site={site} group="shadow" onPick={(t) => s.set("boxShadow", t)} /></div>
        </div>
      ))}
      {row("opacity", "Opacité", (
        <div className="flex items-center gap-2 flex-1">
          <input type="range" min={0} max={100} value={opacity === "" ? 100 : opacity} onChange={(e) => s.set("opacity", String(Number(e.target.value) / 100))} className="flex-1 accent-[var(--color-accent)]" aria-label="Opacité" />
          <NumberInput className="w-[68px]" unit="%" min={0} max={100} value={opacity} placeholder="100" onValueChange={(n) => s.set("opacity", n === "" ? undefined : String(n / 100))} />
        </div>
      ))}
    </Section>
  );
}
