"use client";

import type { Asset } from "@atelier/model";

const HEIC = (f: File) => /image\/hei[cf]/i.test(f.type) || /\.hei[cf]$/i.test(f.name);
const MAX_BYTES = 4_000_000;   // au-delà, on réduit avant l'envoi (limite des fonctions Vercel : 4,5 Mo par requête)
const MAX_SIDE = 3200;

async function toJpeg(bitmap: ImageBitmap | HTMLImageElement, name: string, side = MAX_SIDE, quality = 0.88): Promise<File> {
  const w = "naturalWidth" in bitmap ? bitmap.naturalWidth : bitmap.width, h = "naturalHeight" in bitmap ? bitmap.naturalHeight : bitmap.height;
  const scale = Math.min(1, side / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
  if (!blob) throw new Error("Conversion impossible");
  return new File([blob], name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

/** Conversion HEIC/HEIF (photos d'iPhone) en JPEG : voie native d'abord (Safari décode le HEIC), heic2any en secours. */
export async function prepareImage(file: File): Promise<File> {
  if (!HEIC(file)) return file;
  try { const bmp = await createImageBitmap(file); return await toJpeg(bmp, file.name); } catch { /* le navigateur ne lit pas le HEIC */ }
  const heic2any = (await import("heic2any")).default;
  const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
  const blob = Array.isArray(out) ? out[0]! : out;
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

/** Un fichier trop lourd est réduit dans le navigateur avant l'envoi (le serveur produit ensuite les déclinaisons). */
export async function shrinkIfHeavy(file: File): Promise<File> {
  if (file.size <= MAX_BYTES || file.type === "image/svg+xml" || file.type === "image/gif") return file;
  try { const bmp = await createImageBitmap(file); return await toJpeg(bmp, file.name); } catch { return file; }
}

export function isImageFile(f: File) { return f.type.startsWith("image/") || HEIC(f); }

/** Envoie des images au site et rend les `Asset` créés (à ajouter au document par l'appelant). */
export async function uploadImages(siteId: string, files: File[], onProgress?: (done: number, total: number) => void): Promise<Asset[]> {
  const prepared: File[] = [];
  for (const [i, f] of files.entries()) { prepared.push(await shrinkIfHeavy(await prepareImage(f))); onProgress?.(i, files.length); }
  const fd = new FormData();
  prepared.forEach((f) => fd.append("file", f, f.name));
  const res = await fetch(`/api/sites/${siteId}/assets`, { method: "POST", body: fd });
  const body = (await res.json().catch(() => ({}))) as { assets?: Asset[]; error?: string };
  if (!res.ok || !body.assets) throw new Error(body.error ?? `Échec de l'import (${res.status})`);
  onProgress?.(files.length, files.length);
  return body.assets;
}

/** Nom affiché d'une ressource. */
export function assetLabel(a: Asset, locale: string): string {
  return a.name ?? a.alt?.[locale] ?? (a.kind === "image" ? "Image" : a.kind === "video" ? "Vidéo" : "Fichier");
}
