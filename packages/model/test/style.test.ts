import { describe, it, expect } from "vitest";
import { breakpointForWidth, cascadeChain, defaultLayoutGrid, findNode, layoutGridAt, overridesByBreakpoint, resolveNodeStyle, resolveSharedStyle, sampleSite, sharedStylePath, sharedStyleUsages, stylePath } from "../src";

const bps = sampleSite.settings.breakpoints;

describe("cascade", () => {
  it("chaîne de cascade descendante", () => {
    expect(cascadeChain(bps, "base")).toEqual(["base"]);
    expect(cascadeChain(bps, "tablet")).toEqual(["base", "tablet"]);
    expect(cascadeChain(bps, "small")).toEqual(["base", "tablet", "mobile", "small"]);
  });
  it("point actif selon la largeur", () => {
    expect(breakpointForWidth(bps, 1280)).toBe("base");
    expect(breakpointForWidth(bps, 991)).toBe("tablet");
    expect(breakpointForWidth(bps, 836)).toBe("tablet");
    expect(breakpointForWidth(bps, 767)).toBe("mobile");
    expect(breakpointForWidth(bps, 320)).toBe("small");
  });
  it("chemins d'écriture", () => {
    expect(stylePath("base", "gap")).toBe("style.base.gap");
    expect(stylePath("mobile", "gap")).toBe("style.breakpoints.mobile.gap");
    expect(stylePath("base", "opacity", "hover")).toBe("style.states.hover.opacity");
    expect(stylePath("tablet", "opacity", "hover")).toBe("style.stateBreakpoints.hover.tablet.opacity");
  });
});

describe("resolveNodeStyle", () => {
  const hero = findNode(sampleSite, "hero")!.node;
  it("à la base : local, partagé et sources", () => {
    const r = resolveNodeStyle(sampleSite, hero, "base");
    expect(r.display).toEqual({ value: "grid", source: { kind: "local" } });
    expect(r.gridTemplateColumns?.value).toBe("1.1fr 1fr");
    expect(r.paddingTop).toEqual({ value: { token: "space.12" }, source: { kind: "shared", style: "st_section", breakpoint: "base" } });
  });
  it("sur tablette : la surcharge locale gagne, le reste est hérité", () => {
    const r = resolveNodeStyle(sampleSite, hero, "tablet");
    expect(r.gridTemplateColumns).toEqual({ value: "1fr", source: { kind: "local" } });
    expect(r.display).toEqual({ value: "grid", source: { kind: "inherited", breakpoint: "base" } });
    expect(r.paddingTop?.source).toEqual({ kind: "shared", style: "st_section", breakpoint: "base" });
  });
  it("sur mobile : héritage de la tablette et surcharge partagée mobile", () => {
    const r = resolveNodeStyle(sampleSite, hero, "mobile");
    expect(r.gridTemplateColumns).toEqual({ value: "1fr", source: { kind: "inherited", breakpoint: "tablet" } });
    expect(r.paddingTop).toEqual({ value: { token: "space.8" }, source: { kind: "shared", style: "st_section", breakpoint: "mobile" } });
  });
  it("défauts du thème par balise, et héritage des styles partagés (extends)", () => {
    const h1 = findNode(sampleSite, "hero_h1")!.node;
    expect(resolveNodeStyle(sampleSite, h1, "base").fontSize).toEqual({ value: { token: "fontSize.3xl" }, source: { kind: "default", from: "h1" } });
    const b2 = findNode(sampleSite, "hero_b2")!.node;
    const r = resolveNodeStyle(sampleSite, b2, "base");
    expect(r.display?.value).toBe("inline-flex");           // hérité de Bouton via extends
    expect(r.background?.value).toBe("transparent");        // surchargé par Bouton / secondaire
    expect(r.background?.source).toEqual({ kind: "shared", style: "st_button_secondary", breakpoint: "base" });
  });
  it("surcharges par point de rupture", () => {
    expect(overridesByBreakpoint(sampleSite, hero)).toEqual({ base: ["display", "gridTemplateColumns", "gap", "alignItems", "maxWidth", "marginLeft", "marginRight"], tablet: ["gridTemplateColumns", "gap"], mobile: [], small: [] });
  });
});

describe("états et styles partagés", () => {
  it("résout un état : valeurs normales héritées, surcharge d'état locale ou partagée", () => {
    const b1 = findNode(sampleSite, "hero_b1")!.node;
    const r = resolveNodeStyle(sampleSite, b1, "base", "hover");
    expect(r.opacity).toEqual({ value: "0.85", source: { kind: "shared", style: "st_button", breakpoint: "base", state: "hover" } });
    expect(r.background?.source).toEqual({ kind: "shared", style: "st_button", breakpoint: "base" });
    const nav = findNode(sampleSite, "nav_1")!.node;
    const rn = resolveNodeStyle(sampleSite, nav, "base", "hover");
    expect(rn.color).toEqual({ value: { token: "color.accent" }, source: { kind: "local" } });
    expect(rn.textDecoration?.source).toEqual({ kind: "inherited", breakpoint: "base", fromState: null });
  });
  it("résout un style partagé seul, avec extends", () => {
    const r = resolveSharedStyle(sampleSite, "st_button_secondary", "base");
    expect(r.background).toEqual({ value: "transparent", source: { kind: "local" } });
    expect(r.display?.source).toEqual({ kind: "inherited", breakpoint: "base" });
    expect(resolveSharedStyle(sampleSite, "st_button", "base", "hover").opacity?.source).toEqual({ kind: "local" });
  });
  it("chemins et usages d'un style partagé", () => {
    expect(sharedStylePath(sampleSite, "st_button", "base", "gap")).toBe("sharedStyles.2.style.base.gap");
    expect(sharedStylePath(sampleSite, "st_button", "mobile", "gap", "hover")).toBe("sharedStyles.2.style.stateBreakpoints.hover.mobile.gap");
    expect(sharedStyleUsages(sampleSite, "st_button").map((u) => u.node.id)).toEqual(["hero_b1", "cta_b", "f_submit"]);
  });
});

describe("grille de mise en page", () => {
  it("cascade des colonnes par point de rupture", () => {
    expect(layoutGridAt(sampleSite, "base").columns).toBe(12);
    expect(layoutGridAt(sampleSite, "tablet").columns).toBe(8);
    expect(layoutGridAt(sampleSite, "mobile")).toMatchObject({ columns: 4, margin: { token: "space.4" } });
    expect(layoutGridAt(sampleSite, "small")).toMatchObject({ columns: 4, margin: { token: "space.4" }, gutter: { token: "space.5" } });
  });
  it("grille par défaut sans réglage", () => {
    const g = defaultLayoutGrid({ ...sampleSite, settings: { ...sampleSite.settings, layoutGrid: undefined } });
    expect(g.columns).toBe(12);
    expect(g.byBreakpoint?.tablet?.columns).toBe(8);
    expect(g.byBreakpoint?.mobile?.columns).toBe(4);
  });
});
