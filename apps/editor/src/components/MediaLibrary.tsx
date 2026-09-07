"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, Images, RefreshCw, Trash2, Upload } from "lucide-react";
import type { Asset, CommitOptions, Entry, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Dialog, Hint, Select, TextInput } from "@/ui";
import { assetLabel, isImageFile, uploadImages } from "@/lib/upload";
import { assetUsages, type AssetUsage } from "@/lib/asset-usage";

type Commit = (op: Op, opts?: CommitOptions) => void;

/** Import d'images partagé par le sélecteur et la bibliothèque : conversion, envoi, ajout au document. */
export function useImageImport(site: Site, commit: Commit) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const importFiles = useCallback(async (files: File[]): Promise<Asset[]> => {
    const images = files.filter(isImageFile);
    if (!images.length) { setError("Aucune image dans la sélection"); return []; }
    setError(null);
    setBusy(images.length > 1 ? `Import de ${images.length} images…` : "Import en cours…");
    try {
      const added = await uploadImages(site.id, images, (done, total) => { if (total > 1) setBusy(`Import ${Math.min(done + 1, total)} / ${total}…`); });
      commit({ op: "site.set", path: "assets", value: [...site.assets, ...added] }, { label: added.length > 1 ? `Importer ${added.length} images` : "Importer une image" });
      return added;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'import");
      return [];
    } finally { setBusy(null); }
  }, [site.id, site.assets, commit]);
  return { importFiles, busy, error };
}

const ACCEPT = "image/*,.heic,.heif";

/** Bouton « Importer » avec son champ fichier caché. */
export function ImportButton({ onFiles, busy, size = "md", label = "Importer…" }: { onFiles: (files: File[]) => void; busy?: string | null; size?: "sm" | "md"; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={input} type="file" accept={ACCEPT} multiple hidden onChange={(e) => { const files = [...(e.target.files ?? [])]; e.target.value = ""; if (files.length) onFiles(files); }} />
      <Button size={size} icon={Upload} disabled={!!busy} onClick={() => input.current?.click()} title="Importer des images depuis l'ordinateur (JPEG, PNG, WebP, HEIC…)">{busy ?? label}</Button>
    </>
  );
}

// ---------------------------------------------------------------- une seule bibliothèque pour tout l'éditeur
export type OpenOptions = { value?: string | null; onPick?: (id: string | null) => void };
export type MediaLibraryHandle = { open: (opts?: OpenOptions) => void };
const Ctx = createContext<MediaLibraryHandle | null>(null);
export const useMediaLibrary = () => useContext(Ctx);

// Le fournisseur enregistre son ouverture ici : la coquille de l'éditeur (qui le rend) peut l'appeler sans passer par une référence.
let opener: ((opts?: OpenOptions) => void) | null = null;
/** Ouvre la bibliothèque depuis n'importe où dans l'éditeur (barre, palette, aperçu). */
export function openMediaLibrary(opts?: OpenOptions) { opener?.(opts); }

/** Fournit la bibliothèque au reste de l'éditeur (`useMediaLibrary().open(...)` ou `openMediaLibrary(...)`). */
export function MediaLibraryProvider({ site, entries, commit, saveEntry, onGoTo, children }: { site: Site; entries: Entry[]; commit: Commit; saveEntry: (e: Entry) => void; onGoTo: (u: AssetUsage) => void; children: ReactNode }) {
  const [opts, setOpts] = useState<OpenOptions | null>(null);
  const api = useMemo<MediaLibraryHandle>(() => ({ open: (o) => setOpts(o ?? {}) }), []);
  useEffect(() => { opener = api.open; return () => { if (opener === api.open) opener = null; }; }, [api]);
  return (
    <Ctx.Provider value={api}>
      {children}
      {opts ? <MediaLibrary site={site} entries={entries} open onClose={() => setOpts(null)} value={opts.value} onPick={opts.onPick} commit={commit} saveEntry={saveEntry} onGoTo={(u) => { setOpts(null); onGoTo(u); }} /> : null}
    </Ctx.Provider>
  );
}

const USAGE_KIND: Record<AssetUsage["kind"], string> = { image: "Image", background: "Fond", seo: "Référencement", favicon: "Favicon", entry: "Entrée" };
const when = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—");

/**
 * Bibliothèque des images du site : chercher, trier, importer (fichier, glisser-déposer, adresse), voir où chaque image sert,
 * renommer, décrire (texte alternatif porté par l'image), remplacer le fichier partout, supprimer les inutilisées.
 * En mode choix (`onPick`), un double-clic ou « Utiliser » pose l'image sur l'élément.
 */
export function MediaLibrary({ site, entries, open, onClose, value, onPick, commit, saveEntry, onGoTo }: { site: Site; entries: Entry[]; open: boolean; onClose: () => void; value?: string | null; onPick?: (id: string | null) => void; commit: Commit; saveEntry?: (e: Entry) => void; onGoTo?: (u: AssetUsage) => void }) {
  const locale = site.settings.defaultLocale;
  const { importFiles, busy, error } = useImageImport(site, commit);
  const [url, setUrl] = useState("");
  const [over, setOver] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "name">("recent");
  const [onlyUnused, setOnlyUnused] = useState(false);
  const [current, setCurrent] = useState<string | null>(value ?? null);
  const [replaceBusy, setReplaceBusy] = useState(false);
  const replaceInput = useRef<HTMLInputElement>(null);
  const usages = useMemo(() => assetUsages(site, entries), [site, entries]);
  const images = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = site.assets.filter((a) => a.kind === "image");
    if (q) list = list.filter((a) => `${assetLabel(a, locale)} ${a.alt?.[locale] ?? ""}`.toLowerCase().includes(q));
    if (onlyUnused) list = list.filter((a) => !(usages.get(a.id)?.length));
    return [...list].sort((a, b) => (sort === "name" ? assetLabel(a, locale).localeCompare(assetLabel(b, locale), "fr") : (b.createdAt ?? "").localeCompare(a.createdAt ?? "")));
  }, [site.assets, query, onlyUnused, sort, usages, locale]);
  const selected = site.assets.find((a) => a.id === current);
  const selectedUsages = current ? usages.get(current) ?? [] : [];
  const unusedCount = site.assets.filter((a) => a.kind === "image" && !(usages.get(a.id)?.length)).length;
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) { setPrevValue(value); setCurrent(value ?? null); }

  const setAssets = (assets: Asset[], label: string, coalesceKey?: string) => commit({ op: "site.set", path: "assets", value: assets }, { label, coalesceKey });
  const patch = (a: Asset, p: Partial<Asset>, label: string, coalesceKey?: string) => setAssets(site.assets.map((x) => (x.id === a.id ? { ...x, ...p } : x)), label, coalesceKey);
  const pick = (id: string | null) => { onPick?.(id); onClose(); };
  const importHere = async (files: File[]) => { const added = await importFiles(files); if (added.length) { if (onPick && added.length === 1) pick(added[0]!.id); else setCurrent(added[0]!.id); } };
  const addByUrl = () => {
    const u = url.trim();
    if (!/^https?:\/\//.test(u)) return;
    const asset: Asset = { id: newId(), kind: "image", url: u, name: u.split("/").pop()?.split("?")[0] || "Image", createdAt: new Date().toISOString() };
    setAssets([...site.assets, asset], "Ajouter une image par adresse");
    setUrl(""); if (onPick) pick(asset.id); else setCurrent(asset.id);
  };
  /** Remplacer le fichier : la ressource garde son identifiant, tous ses usages suivent. */
  const replaceFile = async (a: Asset, files: File[]) => {
    const f = files.find(isImageFile);
    if (!f) return;
    setReplaceBusy(true);
    try {
      const [fresh] = await uploadImages(site.id, [f]);
      if (fresh) setAssets(site.assets.map((x) => (x.id === a.id ? { ...x, url: fresh.url, width: fresh.width, height: fresh.height, mime: fresh.mime, variants: fresh.variants, name: x.name ?? fresh.name } : x)), "Remplacer le fichier de l'image");
    } finally { setReplaceBusy(false); }
  };
  const removeAsset = (a: Asset) => {
    if (usages.get(a.id)?.length) return;
    if (!window.confirm(`Retirer « ${assetLabel(a, locale)} » de la bibliothèque ? Le fichier reste dans le stockage, l'entrée disparaît du site (⌘Z la ramène).`)) return;
    setAssets(site.assets.filter((x) => x.id !== a.id), "Retirer une image");
    if (current === a.id) setCurrent(null);
  };
  const removeUnused = () => {
    const ids = site.assets.filter((a) => a.kind === "image" && !(usages.get(a.id)?.length)).map((a) => a.id);
    if (!ids.length || !window.confirm(`Retirer ${ids.length} image${ids.length > 1 ? "s" : ""} inutilisée${ids.length > 1 ? "s" : ""} de la bibliothèque ? (⌘Z les ramène)`)) return;
    setAssets(site.assets.filter((a) => !ids.includes(a.id)), "Retirer les images inutilisées");
    if (current && ids.includes(current)) setCurrent(null);
  };
  /** Une entrée qui utilise l'image : on retire l'image du champ (ou de la galerie). */
  const detachFromEntry = (u: Extract<AssetUsage, { kind: "entry" }>) => {
    const e = entries.find((x) => x.id === u.entryId);
    if (!e || !saveEntry) return;
    const v = e.values[u.field];
    saveEntry({ ...e, values: { ...e.values, [u.field]: Array.isArray(v) ? v.filter((x) => x !== current) : undefined } });
  };

  return (
    <Dialog open={open} onClose={onClose} title={onPick ? "Choisir une image" : "Images du site"} width={980} actions={<div className="flex items-center gap-1">{unusedCount ? <Button size="sm" variant="ghost" icon={Trash2} onClick={removeUnused} title="Retirer de la bibliothèque toutes les images qui ne servent nulle part">{unusedCount} inutilisée{unusedCount > 1 ? "s" : ""}</Button> : null}<ImportButton onFiles={importHere} busy={busy} size="sm" /></div>}>
      <div className="grid min-h-[420px]" style={{ gridTemplateColumns: "1fr 300px" }}>
        <div
          className={`p-3 flex flex-col gap-3 min-w-0 ${over ? "outline outline-2 outline-accent -outline-offset-4" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); const files = [...e.dataTransfer.files]; if (files.length) void importHere(files); }}
        >
          <div className="flex gap-1 flex-wrap items-center">
            <TextInput className="flex-1 min-w-[160px]" value={query} placeholder="Chercher par nom ou description" onValueChange={setQuery} />
            <Select className="w-[150px]" value={sort} options={[{ value: "recent", label: "Plus récentes" }, { value: "name", label: "Par nom" }]} onValueChange={(v) => setSort(v as "recent" | "name")} />
            <label className="flex items-center gap-1 text-xs text-muted cursor-pointer"><input type="checkbox" checked={onlyUnused} onChange={(e) => setOnlyUnused(e.target.checked)} className="accent-[var(--color-accent)]" />Inutilisées</label>
          </div>
          <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); addByUrl(); }}>
            <TextInput className="flex-1" value={url} placeholder="https://… (ajouter une image par son adresse)" onValueChange={setUrl} />
            <Button size="md" type="submit" disabled={!/^https?:\/\//.test(url.trim())}>Ajouter</Button>
          </form>
          {error ? <p className="text-xs text-danger">{error}</p> : null}
          {images.length === 0 ? <Hint>{query || onlyUnused ? "Aucune image ne correspond." : "Aucune image pour l'instant. Importez-en, ou déposez des fichiers ici."}</Hint> : null}
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}>
            {images.map((a) => {
              const isCurrent = current === a.id;
              const n = usages.get(a.id)?.length ?? 0;
              const label = assetLabel(a, locale);
              return (
                <button key={a.id} type="button" title={`${label} · ${n ? `${n} usage${n > 1 ? "s" : ""}` : "inutilisée"}${onPick ? " · double-clic pour utiliser" : ""}`} onClick={() => setCurrent(a.id)} onDoubleClick={() => onPick && pick(a.id)} className={`flex flex-col gap-1 min-w-0 text-left rounded-xs p-0.5 ${isCurrent ? "bg-accent-soft" : "hover:bg-hover"}`}>
                  <span className={`relative block aspect-square w-full rounded-xs overflow-hidden border ${isCurrent ? "border-accent" : "border-line"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.variants?.[0]?.url ?? a.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    {value === a.id ? <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-accent text-accent-ink grid place-items-center"><Check size={12} strokeWidth={2.5} /></span> : null}
                    {!n ? <span className="absolute bottom-1 left-1 h-4 px-1 rounded-full bg-black/60 text-white text-2xs">inutilisée</span> : null}
                  </span>
                  <span className="block text-2xs text-muted truncate w-full">{label}</span>
                </button>
              );
            })}
          </div>
          <Hint>Glissez des fichiers ici pour les importer. Les photos HEIC sont converties, chaque image reçoit des déclinaisons optimisées.</Hint>
        </div>

        <aside className="border-l border-line p-3 flex flex-col gap-3 min-w-0 bg-surface/40">
          {!selected ? <p className="text-sm text-dim">Sélectionnez une image pour voir où elle sert, la décrire, la remplacer.</p> : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.variants?.[1]?.url ?? selected.url} alt="" className="w-full rounded-xs object-contain max-h-40 bg-black/20" />
              <div className="flex flex-col gap-1.5">
                <TextInput value={selected.name ?? ""} placeholder="Nom" onValueChange={(v) => patch(selected, { name: v || undefined }, "Renommer l'image", `asset-name:${selected.id}`)} />
                <TextInput value={selected.alt?.[locale] ?? ""} placeholder="Texte alternatif (décrit l'image aux moteurs et aux lecteurs d'écran)" onValueChange={(v) => patch(selected, { alt: v ? { ...selected.alt, [locale]: v } : undefined }, "Décrire l'image", `asset-alt:${selected.id}`)} />
                <p className="text-2xs text-dim">{selected.width && selected.height ? `${selected.width} × ${selected.height} · ` : ""}{selected.variants?.length ? `${selected.variants.length} déclinaisons · ` : ""}ajoutée le {when(selected.createdAt)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xs uppercase tracking-[0.12em] text-dim">{selectedUsages.length ? `Utilisée dans ${selectedUsages.length} endroit${selectedUsages.length > 1 ? "s" : ""}` : "Utilisée nulle part"}</span>
                <ul className="flex flex-col max-h-40 overflow-auto">
                  {selectedUsages.map((u, i) => (
                    <li key={i} className="flex items-center gap-1 h-6 text-xs">
                      <span className="text-dim w-[70px] shrink-0">{USAGE_KIND[u.kind]}</span>
                      <span className="flex-1 truncate text-ink">{u.label}</span>
                      {u.kind === "entry" ? (saveEntry ? <button type="button" className="text-2xs text-muted hover:text-danger" onClick={() => detachFromEntry(u)}>retirer</button> : null) : onGoTo ? <button type="button" className="text-2xs text-accent hover:underline" onClick={() => onGoTo(u)}>aller</button> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1 mt-auto">
                {onPick ? <Button variant="primary" icon={Check} onClick={() => pick(selected.id)}>Utiliser cette image</Button> : null}
                <input ref={replaceInput} type="file" accept={ACCEPT} hidden onChange={(e) => { const files = [...(e.target.files ?? [])]; e.target.value = ""; if (files.length) void replaceFile(selected, files); }} />
                <Button icon={RefreshCw} disabled={replaceBusy} onClick={() => replaceInput.current?.click()} title="Envoyer un autre fichier à la place : l'image change partout où elle sert">{replaceBusy ? "Remplacement…" : "Remplacer le fichier…"}</Button>
                <Button variant="danger" icon={Trash2} disabled={!!selectedUsages.length} title={selectedUsages.length ? "Retirez d'abord l'image des endroits où elle sert" : "Retirer de la bibliothèque"} onClick={() => removeAsset(selected)}>Retirer</Button>
              </div>
            </>
          )}
          {onPick && value ? <Button size="sm" variant="ghost" onClick={() => pick(null)}>Retirer l&apos;image de cet élément</Button> : null}
        </aside>
      </div>
    </Dialog>
  );
}

export { Images as ImagesIcon };
