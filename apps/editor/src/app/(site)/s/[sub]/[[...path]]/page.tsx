import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createElement } from "react";
import { RenderPage, assetMap, fontsHref, matchPath, memoryData, pageTitle, siteCss, localized, type RenderContext } from "@atelier/renderer";
import { basePathFor, canServeHere, getPublished, getSiteIdBySub, publicUrl } from "@/lib/published";

type Props = { params: Promise<{ sub: string; path?: string[] }> };

async function resolve(sub: string, path?: string[]) {
  if (!(await canServeHere())) return null;
  const id = await getSiteIdBySub(sub);
  if (!id) return null;
  const pub = await getPublished(id);
  if (!pub) return { pub: null, id };
  const data = memoryData(pub.entries);
  const urlPath = "/" + (path ?? []).join("/");
  const m = matchPath(pub.site, data, urlPath);
  if (!m) return { pub, id, m: null };
  const basePath = await basePathFor(sub);
  const ctx: RenderContext = { site: pub.site, page: m.page, entry: m.entry, params: m.params, locale: pub.site.settings.defaultLocale, data, assets: assetMap(pub.site), basePath };
  return { pub, id, m, ctx, urlPath };
}

/** Référencement automatique (D38) : titre, description, canonique, Open Graph, indexation, favicon. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub, path } = await params;
  const r = await resolve(sub, path);
  if (!r?.pub || !r.m || !r.ctx) return { title: "Page introuvable", robots: { index: false } };
  const { site, page } = r.ctx;
  const base = publicUrl(site);
  const title = pageTitle(r.ctx);
  const description = localized<string>(page.seo?.description, r.ctx) ?? localized<string>(site.settings.seo.description, r.ctx);
  const imageId = page.seo?.image ?? site.settings.seo.image;
  const image = imageId ? r.ctx.assets.get(imageId) : undefined;
  const faviconId = site.settings.seo.favicon;
  const favicon = faviconId ? r.ctx.assets.get(faviconId) : undefined;
  const canonical = page.seo?.canonical ?? `${base}${r.urlPath === "/" ? "" : r.urlPath}`;
  return {
    title, description,
    alternates: { canonical },
    robots: page.seo?.index === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: site.name, type: r.m.entry ? "article" : "website", locale: site.settings.defaultLocale, images: image ? [{ url: image.url, width: image.width, height: image.height, alt: localized<string>(image.alt, r.ctx) ?? "" }] : undefined },
    twitter: { card: image ? "summary_large_image" : "summary", title, description },
    icons: favicon ? { icon: favicon.url } : undefined,
  };
}

export default async function PublishedPage({ params }: Props) {
  const { sub, path } = await params;
  const r = await resolve(sub, path);
  if (!r) notFound();
  if (!r.pub) return <main style={{ padding: 48, fontFamily: "system-ui", color: "#666" }}><h1 style={{ fontSize: 20 }}>Ce site n&apos;est pas encore publié.</h1><p>Ouvrez l&apos;éditeur et cliquez « Publier ».</p></main>;
  if (!r.m || !r.ctx) notFound();
  const { site } = r.ctx;
  const fonts = fontsHref(site.theme);
  const mode = site.theme.defaultMode;
  return (
    <>
      <meta name="color-scheme" content={site.theme.modes.some((m) => m.id === "dark") ? "light dark" : "light"} />
      {fonts ? <><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href={fonts} precedence="fonts" /></> : null}
      {/* React 19 remonte la feuille dans le head : il lui faut une priorité et une clé stable par version publiée. */}
      <style precedence="site" href={`site-${site.id}-v${r.pub.version}`} dangerouslySetInnerHTML={{ __html: siteCss(site, { pageId: r.ctx.page.id }) }} />
      {site.settings.head ? createElement("div", { hidden: true, dangerouslySetInnerHTML: { __html: site.settings.head } }) : null}
      <RenderPage ctx={r.ctx} mode={mode} />
      {site.settings.bodyEnd ? createElement("div", { dangerouslySetInnerHTML: { __html: site.settings.bodyEnd } }) : null}
    </>
  );
}
