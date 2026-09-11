import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sampleSite, type Node, type Site } from "@atelier/model";
import { RenderPage, assetMap, memoryData, type RenderContext } from "../src";

const hostile: Node[] = [
  { id: "html_hostile", type: "embed", props: { html: "<script>window.pwned=1</script>" } },
  { id: "svg_hostile", type: "icon", props: { svg: "<svg onload=\"window.pwned=1\"></svg>" } },
];

function html(editor: boolean) {
  const page = { ...sampleSite.pages[0]!, root: { id: "root_security", type: "box" as const, props: {}, children: hostile } };
  const site: Site = { ...sampleSite, pages: [page] };
  const ctx: RenderContext = { site, page, locale: site.settings.defaultLocale, params: {}, data: memoryData([]), assets: assetMap(site), basePath: "", editor };
  return renderToStaticMarkup(createElement(RenderPage, { ctx }));
}

describe("aperçu de l’éditeur", () => {
  it("n’exécute ni HTML intégré ni SVG fourni par le document", () => {
    const preview = html(true);
    expect(preview).not.toContain("<script>");
    expect(preview).not.toContain("onload=");
    expect(preview).toContain("Code intégré");
  });

  it("préserve le code explicitement demandé sur le site publié", () => {
    const published = html(false);
    expect(published).toContain("<script>window.pwned=1</script>");
    expect(published).toContain("onload=");
  });
});
