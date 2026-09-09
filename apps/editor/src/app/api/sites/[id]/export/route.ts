import { guardSite } from "@/lib/site-access";
import { getStore } from "@/lib/store";
import { buildExport } from "@/lib/export-site";
import { zip } from "@/lib/zip";

/** Export du code (D15) : archive zip du site statique (HTML, CSS aux classes lisibles, médias, données), depuis la version publiée, sinon la version de travail. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const denied = await guardSite(id, "editor");
  if (denied) return denied;
  const store = getStore();
  const pub = await store.published(id);
  const src = pub ? { site: pub.site, entries: pub.entries, version: pub.version, publishedAt: pub.publishedAt } : await (async () => {
    const stored = await store.get(id);
    if (!stored) return null;
    return { site: stored.site, entries: await store.entries(id), version: null, publishedAt: null };
  })();
  if (!src) return Response.json({ error: "Site introuvable" }, { status: 404 });
  const result = await buildExport(src);
  const sub = src.site.settings.subdomain ?? src.site.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const name = `${sub}-${new Date().toISOString().slice(0, 10)}.zip`;
  const body = zip(result.files);
  return new Response(new Uint8Array(body), { headers: { "content-type": "application/zip", "content-disposition": `attachment; filename="${name}"`, "x-atelier-pages": String(result.pages), "x-atelier-assets": String(result.assets), "cache-control": "no-store" } });
}
