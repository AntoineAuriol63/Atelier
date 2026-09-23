import { describe, it, expect } from "vitest";
import { applyOps, checkup, checkupSummary, planQuickAnimation, planUpdateTrigger, restaurantSite, sampleSite, type Finding, type Node, type Site } from "../src";

/**
 * Bilan avant publication (23 septembre 2026) : ce que le document permet de vérifier sans rien d'externe, avec pour chaque constat
 * l'élément ou la page à corriger. Rien ne bloque la publication ; la fenêtre Publier compte « à corriger » et « à regarder ».
 */
const find = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };
const rules = (f: Finding[]) => f.map((x) => x.rule);
const of = (f: Finding[], rule: string) => f.filter((x) => x.rule === rule);

describe("bilan avant publication", () => {
  it("un site soigné passe presque sans remarque ; chaque constat porte un niveau, une phrase et une cible", () => {
    const f = checkup(restaurantSite);
    for (const x of f) { expect(["fix", "look"]).toContain(x.level); expect(x.message.length).toBeGreaterThan(10); expect(x.pageId || x.nodeId || x.rule.startsWith("settings-")).toBeTruthy(); }
    expect(of(f, "image-alt")).toHaveLength(0);
    expect(of(f, "page-title")).toHaveLength(0);
    expect(of(f, "page-h1")).toHaveLength(0);
    expect(of(f, "link-missing-page")).toHaveLength(0);
    expect(of(f, "image-priority").some((x) => x.pageId === "rp_home")).toBe(false);
  });

  it("images : sans texte alternatif (à corriger) ; hébergée ailleurs, sans déclinaisons (à regarder)", () => {
    const site = structuredClone(sampleSite);
    const img = find(site, "hero_img");
    delete img.props.alt;
    const asset = site.assets.find((a) => a.id === img.props.asset)!;
    delete asset.alt;
    const f = checkup(site);
    expect(of(f, "image-alt")).toEqual([expect.objectContaining({ level: "fix", nodeId: "hero_img", pageId: "p_home" })]);
    // Le site d'exemple utilise des photos externes : chacune est signalée une fois, par image, pas par page.
    expect(of(f, "image-external").length).toBeGreaterThan(0);
    expect(of(f, "image-external").every((x) => x.level === "look")).toBe(true);
  });

  it("la première image d'une page qui n'est pas prioritaire : à regarder ; marquée prioritaire : rien", () => {
    const site = structuredClone(sampleSite);
    delete find(site, "hero_img").props.priority;
    expect(of(checkup(site), "image-priority").some((x) => x.nodeId === "hero_img" && x.pageId === "p_home")).toBe(true);
    expect(of(checkup(sampleSite), "image-priority").some((x) => x.pageId === "p_home")).toBe(false);
    // Une image sous le premier écran n'est pas concernée : la priorité ne vaut que pour ce qui se voit d'abord.
    const gal = site.pages.find((p) => p.path === "/galeries")!;
    expect(of(checkup(site), "image-priority").some((x) => x.pageId === gal.id)).toBe(false);
  });

  it("pages : sans description (à regarder), deux pages au même titre (à regarder), pas de titre de niveau 1 ou plusieurs (à corriger)", () => {
    const site = structuredClone(sampleSite);
    const home = site.pages.find((p) => p.id === "p_home")!;
    delete home.seo?.description; delete site.settings.seo.description;
    const gal = site.pages.find((p) => p.path === "/galeries")!;
    gal.name = { fr: home.name.fr! }; delete gal.seo?.title;
    home.seo = { ...home.seo, title: undefined };
    const f = checkup(site);
    expect(of(f, "page-description").some((x) => x.pageId === "p_home")).toBe(true);
    expect(of(f, "page-title-duplicate").length).toBeGreaterThanOrEqual(1);
    const h1s = of(checkup(sampleSite), "page-h1");
    expect(h1s.every((x) => x.level === "fix")).toBe(true);
  });

  it("un lien vers une page qui n'existe plus : à corriger, sur le lien", () => {
    const site = structuredClone(sampleSite);
    site.pages = site.pages.filter((p) => p.path !== "/galeries");
    const f = checkup(site);
    const broken = of(f, "link-missing-page");
    expect(broken.length).toBeGreaterThan(0);
    expect(broken[0]).toMatchObject({ level: "fix" });
    expect(broken[0]!.nodeId).toBeTruthy();
  });

  it("polices : au-delà de cinq fichiers demandés à Google, à regarder", () => {
    const site = structuredClone(sampleSite);
    site.theme.fonts = [{ family: "Fraunces", provider: "google", weights: [400, 500, 600, 700], fallback: "serif" }, { family: "Manrope", provider: "google", weights: [400, 700], fallback: "sans-serif" }];
    expect(of(checkup(site), "fonts-weight")).toHaveLength(1);
    site.theme.fonts = [{ family: "Manrope", provider: "google", weights: [400, 700], fallback: "sans-serif" }];
    expect(of(checkup(site), "fonts-weight")).toHaveLength(0);
  });

  it("animation « au chargement » sur un élément sous le premier écran : à regarder, sur l'élément", () => {
    let site = structuredClone(restaurantSite);
    const p = find(site, "rh_about_p");
    site = applyOps(site, planQuickAnimation(site, p, "Apparition", "fade")).site;
    site = applyOps(site, planUpdateTrigger(find(site, "rh_about_p"), find(site, "rh_about_p").triggers![0]!.id, { on: "load" })).site;
    const f = checkup(site);
    expect(of(f, "anim-load-below").some((x) => x.nodeId === "rh_about_p" && x.level === "look")).toBe(true);
    // Le héros est dans le premier écran : ses « au chargement » ne sont pas signalés.
    expect(of(f, "anim-load-below").some((x) => x.nodeId === "rh_hero_h1")).toBe(false);
  });

  it("réglages : sous-domaine, favicon, image de partage absents", () => {
    const site = structuredClone(sampleSite);
    delete site.settings.subdomain; delete site.settings.seo.favicon; delete site.settings.seo.image;
    const r = rules(checkup(site));
    expect(r).toContain("settings-subdomain"); expect(r).toContain("settings-favicon"); expect(r).toContain("settings-share-image");
  });

  it("le résumé compte par niveau et se dit en une phrase", () => {
    const f: Finding[] = [{ rule: "image-alt", level: "fix", message: "a" }, { rule: "page-h1", level: "fix", message: "b" }, { rule: "fonts-weight", level: "look", message: "c" }];
    expect(checkupSummary(f)).toEqual({ fix: 2, look: 1, sentence: "2 points à corriger, 1 à regarder" });
    expect(checkupSummary([])).toEqual({ fix: 0, look: 0, sentence: "Rien à signaler" });
    expect(checkupSummary([f[2]!]).sentence).toBe("1 point à regarder");
  });
});
