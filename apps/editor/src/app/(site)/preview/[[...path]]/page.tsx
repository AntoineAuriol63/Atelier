import { notFound } from "next/navigation";
import { RenderPage, assetMap, fontsHref, matchPath, pageTitle, siteCss, type RenderContext } from "@atelier/renderer";
import { getCurrentSite, getData } from "@/lib/site";

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function buildContext(pathSegments: string[] | undefined, editor: boolean): RenderContext | null {
  const site = getCurrentSite();
  const data = getData();
  const path = "/" + (pathSegments ?? []).join("/");
  const match = matchPath(site, data, path);
  if (!match) return null;
  return {
    site,
    page: match.page,
    entry: match.entry,
    params: match.params,
    locale: site.settings.defaultLocale,
    data,
    assets: assetMap(site),
    basePath: "/preview",
    editor,
  };
}

export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  const ctx = buildContext(path, false);
  return { title: ctx ? pageTitle(ctx) : "Page introuvable" };
}

/** Script minimal du mode éditeur : sélection au clic, surlignage, pas de navigation. */
const EDITOR_SCRIPT = `
(function(){
  var selected=null, hovered=null;
  function nodeOf(el){ return el && el.closest ? el.closest('[data-node]') : null; }
  function outline(el, kind){ if(!el) return; el.style.outline = kind==='selected' ? '2px solid #1F5F8B' : '1px dashed #1F5F8B'; el.style.outlineOffset='-1px'; }
  function clear(el){ if(el && el!==selected){ el.style.outline=''; } }
  document.addEventListener('click', function(e){
    var el = nodeOf(e.target); e.preventDefault();
    if(!el) return;
    if(selected) { selected.style.outline=''; }
    selected = el; outline(el,'selected');
    parent.postMessage({ type:'atelier:select', id: el.getAttribute('data-node') }, '*');
  }, true);
  document.addEventListener('mouseover', function(e){ var el=nodeOf(e.target); if(el!==hovered){ clear(hovered); hovered=el; if(el && el!==selected) outline(el,'hover'); } });
  document.addEventListener('mouseout', function(e){ if(!nodeOf(e.relatedTarget)) { clear(hovered); hovered=null; } });
  window.addEventListener('message', function(e){
    var m = e.data || {};
    if(m.type==='atelier:highlight'){
      if(selected) selected.style.outline='';
      selected = m.id ? document.querySelector('[data-node="'+m.id+'"]') : null;
      if(selected){ outline(selected,'selected'); selected.scrollIntoView({block:'nearest'}); }
    }
    if(m.type==='atelier:mode'){ var p=document.querySelector('.at-page'); if(p) p.setAttribute('data-mode', m.mode); }
  });
  parent.postMessage({ type:'atelier:ready' }, '*');
})();`;

export default async function PreviewPage({ params, searchParams }: Props) {
  const { path } = await params;
  const sp = await searchParams;
  const editor = sp.editor === "1";
  const ctx = buildContext(path, editor);
  if (!ctx) notFound();
  const fonts = fontsHref(ctx.site.theme);
  const mode = typeof sp.mode === "string" ? sp.mode : undefined;
  return (
    <>
      {fonts ? <link rel="stylesheet" href={fonts} /> : null}
      <style dangerouslySetInnerHTML={{ __html: siteCss(ctx.site) }} />
      <RenderPage ctx={ctx} mode={mode} />
      {editor ? <script dangerouslySetInnerHTML={{ __html: EDITOR_SCRIPT }} /> : null}
    </>
  );
}
