"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import type { Asset, CommitOptions, Op, Site } from "@atelier/model";
import { newId } from "@atelier/model";
import { Button, Dialog, Hint, TextInput } from "@/ui";
import { assetLabel, isImageFile, uploadImages } from "@/lib/upload";

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

/**
 * Bibliothèque des images du site : choisir, importer (fichier, glisser-déposer, adresse), renommer.
 * `onPick` reçoit l'identifiant choisi ; `value` est la ressource courante.
 */
export function MediaLibrary({ site, open, onClose, value, onPick, commit }: { site: Site; open: boolean; onClose: () => void; value?: string | null; onPick: (id: string | null) => void; commit: Commit }) {
  const locale = site.settings.defaultLocale;
  const { importFiles, busy, error } = useImageImport(site, commit);
  const [url, setUrl] = useState("");
  const [over, setOver] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const images = site.assets.filter((a) => a.kind === "image");

  const importAndPick = async (files: File[]) => { const added = await importFiles(files); if (added.length) { onPick(added[0]!.id); if (added.length === 1) onClose(); } };
  const addByUrl = () => {
    const u = url.trim();
    if (!/^https?:\/\//.test(u)) return;
    const asset: Asset = { id: newId(), kind: "image", url: u, name: u.split("/").pop()?.split("?")[0] || "Image" };
    commit({ op: "site.set", path: "assets", value: [...site.assets, asset] }, { label: "Ajouter une image par adresse" });
    setUrl(""); onPick(asset.id); onClose();
  };
  const rename = (a: Asset, name: string) => {
    setRenaming(null);
    const n = name.trim();
    if (!n || n === a.name) return;
    commit({ op: "site.set", path: "assets", value: site.assets.map((x) => (x.id === a.id ? { ...x, name: n } : x)) }, { label: "Renommer l'image" });
  };

  return (
    <Dialog open={open} onClose={onClose} title="Images du site" actions={<ImportButton onFiles={importAndPick} busy={busy} size="sm" />}>
      <div
        className={`p-3 flex flex-col gap-3 min-h-[320px] ${over ? "outline outline-2 outline-accent -outline-offset-4" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); const files = [...e.dataTransfer.files]; if (files.length) void importAndPick(files); }}
      >
        <form className="flex gap-1" onSubmit={(e) => { e.preventDefault(); addByUrl(); }}>
          <TextInput className="flex-1" value={url} placeholder="https://… (ajouter une image par son adresse)" onValueChange={setUrl} />
          <Button size="md" type="submit" disabled={!/^https?:\/\//.test(url.trim())}>Ajouter</Button>
        </form>
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {images.length === 0 ? <Hint>Aucune image pour l&apos;instant. Importez-en, ou déposez des fichiers ici.</Hint> : null}
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
          {images.map((a) => {
            const selected = value === a.id;
            const label = assetLabel(a, locale);
            return (
              <div key={a.id} className="flex flex-col gap-1 min-w-0">
                <button type="button" title={`${label}${a.width && a.height ? ` · ${a.width} × ${a.height}` : ""}`} onClick={() => { onPick(a.id); onClose(); }} className={`relative aspect-square rounded-xs overflow-hidden border ${selected ? "border-accent ring-2 ring-accent/40" : "border-line hover:border-line-strong"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.variants?.[0]?.url ?? a.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  {selected ? <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-accent text-accent-ink grid place-items-center"><Check size={12} strokeWidth={2.5} /></span> : null}
                </button>
                {renaming === a.id ? (
                  <input autoFocus defaultValue={label} className="h-6 px-1 text-xs bg-surface border border-line-strong rounded-xs text-ink" onBlur={(e) => rename(a, e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") setRenaming(null); }} />
                ) : (
                  <button type="button" className="text-left text-xs text-muted truncate hover:text-ink" title="Renommer (double-clic)" onDoubleClick={() => setRenaming(a.id)} onClick={() => { onPick(a.id); onClose(); }}>{label}</button>
                )}
              </div>
            );
          })}
        </div>
        <Hint>Glissez des fichiers dans cette fenêtre pour les importer. Les photos HEIC d&apos;iPhone sont converties, et chaque image reçoit des déclinaisons optimisées.</Hint>
        {value ? <div><Button size="sm" variant="ghost" onClick={() => { onPick(null); onClose(); }}>Retirer l&apos;image de cet élément</Button></div> : null}
      </div>
    </Dialog>
  );
}
