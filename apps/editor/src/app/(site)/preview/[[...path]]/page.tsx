import { notFound } from "next/navigation";
import { assetMap, fontsHref, matchPath, memoryData, pageTitle, type RenderContext } from "@atelier/renderer";
import { loadCurrentSite } from "@/lib/site";
import { LivePreview } from "@/components/LivePreview";

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  const { site, entries } = await loadCurrentSite();
  const data = memoryData(entries);
  const m = matchPath(site, data, "/" + (path ?? []).join("/"));
  if (!m) return { title: "Page introuvable" };
  const ctx: RenderContext = { site, page: m.page, entry: m.entry, params: m.params, locale: site.settings.defaultLocale, data, assets: assetMap(site) };
  return { title: pageTitle(ctx) };
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const { path } = await params;
  const sp = await searchParams;
  const { site, entries } = await loadCurrentSite();
  const urlPath = "/" + (path ?? []).join("/");
  if (!matchPath(site, memoryData(entries), urlPath)) notFound();
  const fonts = fontsHref(site.theme);
  const mode = typeof sp.mode === "string" ? sp.mode : undefined;
  return (
    <>
      {fonts ? <link rel="stylesheet" href={fonts} /> : null}
      <LivePreview initialSite={site} entries={entries} path={urlPath} mode={mode} editor={sp.editor === "1"} />
    </>
  );
}
