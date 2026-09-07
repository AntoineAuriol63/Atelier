import sharp, { type Metadata } from "sharp";
import { newId, type Asset, type AssetVariant } from "@atelier/model";
import { getAssetStorage } from "@/lib/store";

/** Largeurs des déclinaisons (D37) ; seules celles plus petites que l'original sont produites, plus l'original en WebP. */
const WIDTHS = [480, 960, 1600, 2400];
const MAX_FILES = 20;
const EXT: Record<string, string> = { jpeg: "jpg", png: "png", webp: "webp", gif: "gif", avif: "avif", svg: "svg", tiff: "tif", heif: "heic" };

function baseName(name: string) { return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim() || "Image"; }

/** Import d'images : `POST` multipart, champ `file` (plusieurs possibles). Rend les `Asset` à ajouter au document. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: siteId } = await params;
  let form: FormData;
  try { form = await req.formData(); } catch { return Response.json({ error: "Envoi invalide" }, { status: 400 }); }
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (!files.length) return Response.json({ error: "Aucun fichier" }, { status: 400 });
  if (files.length > MAX_FILES) return Response.json({ error: `${MAX_FILES} fichiers au plus par envoi` }, { status: 400 });
  const storage = getAssetStorage();
  const assets: Asset[] = [];
  for (const file of files) {
    const bytes = Buffer.from(await file.arrayBuffer());
    let meta: Metadata;
    try { meta = await sharp(bytes, { failOn: "none" }).metadata(); } catch { return Response.json({ error: `« ${file.name} » n'est pas une image lisible` }, { status: 415 }); }
    if (!meta.width || !meta.height || !meta.format) return Response.json({ error: `« ${file.name} » n'est pas une image lisible` }, { status: 415 });
    // L'orientation EXIF est appliquée par le navigateur à l'affichage : les dimensions annoncées doivent être celles vues.
    const rotated = (meta.orientation ?? 1) >= 5;
    const width = rotated ? meta.height : meta.width, height = rotated ? meta.width : meta.height;
    const id = newId();
    const ext = EXT[meta.format] ?? meta.format;
    const mime = file.type || `image/${meta.format}`;
    const url = await storage.put(siteId, `${id}/original.${ext}`, bytes, mime);
    const variants: AssetVariant[] = [];
    // Pas de déclinaison pour le vectoriel ni les GIF (animation).
    if (meta.format !== "svg" && meta.format !== "gif") {
      const targets = [...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS[WIDTHS.length - 1]!)];
      for (const w of [...new Set(targets)].sort((a, b) => a - b)) {
        const buf = await sharp(bytes, { failOn: "none" }).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
        const vurl = await storage.put(siteId, `${id}/w${w}.webp`, buf.data, "image/webp");
        variants.push({ width: buf.info.width, height: buf.info.height, url: vurl, format: "webp" });
      }
    }
    assets.push({ id, kind: "image", url, width, height, mime, name: baseName(file.name), createdAt: new Date().toISOString(), variants });
  }
  return Response.json({ assets });
}
