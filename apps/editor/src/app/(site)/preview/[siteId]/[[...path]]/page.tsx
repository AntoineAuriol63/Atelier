import { assetMap, matchPath, memoryData, pageTitle, type RenderContext } from "@atelier/renderer";
import { notFound } from "next/navigation";
import { loadSite } from "@/lib/site";
import { LivePreview } from "@/components/LivePreview";

type Props = {
  params: Promise<{ siteId: string; path?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { siteId, path } = await params;
  const loaded = await loadSite(siteId);
  if (!loaded) return { title: "Site introuvable" };
  const { site, entries } = loaded;
  const data = memoryData(entries);
  const m = matchPath(site, data, "/" + (path ?? []).join("/"));
  if (!m) return { title: "Page introuvable" };
  const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: site.settings.defaultLocale, data, assets: assetMap(site) };
  return { title: pageTitle(ctx) };
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const { siteId, path } = await params;
  const sp = await searchParams;
  const loaded = await loadSite(siteId);
  if (!loaded) notFound();
  const { site, entries } = loaded;
  const urlPath = "/" + (path ?? []).join("/");
  const editor = sp.editor === "1";
  // En mode éditeur, une page qui vient d'être créée peut ne pas être encore enregistrée : l'aperçu attend le document de l'éditeur.
  if (!editor && !matchPath(site, memoryData(entries), urlPath)) notFound();
  const mode = typeof sp.mode === "string" ? sp.mode : undefined;
  return (
    <>
      <LivePreview initialSite={site} entries={entries} path={urlPath} mode={mode} editor={editor} />
    </>
  );
}
