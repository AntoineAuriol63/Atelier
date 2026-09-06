import { describe, it, expect } from "vitest";
import { breakpointForWidth, cascadeChain, findNode, overridesByBreakpoint, resolveNodeStyle, sampleSite, stylePath } from "../src";

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
