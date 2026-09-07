import { getPublished, getSiteIdBySub, publicUrl } from "@/lib/published";

export async function GET(_req: Request, { params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const id = await getSiteIdBySub(sub);
  const pub = id ? await getPublished(id) : null;
  const body = pub ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${publicUrl(pub.site)}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
