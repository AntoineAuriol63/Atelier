// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { AnimationRun, Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { INTERACTION_SCRIPT, RenderPage, assetMap, memoryData, type RenderContext } from "../src";

/**
 * Le script du site tourne dans un DOM simulé : l'API Web Animations et l'observateur d'intersection sont remplacés par des
 * enregistreurs, ce qui permet de vérifier quels éléments sont animés, avec quel délai, et sur quel déclencheur.
 */
type Call = { el: Element; delay: number; duration: number };
const calls: Call[] = [];
type Observer = { cb: (entries: { target: Element; isIntersecting: boolean }[]) => void; observed: Element[] };
const ios: Observer[] = [];
const observed = () => ios.flatMap((o) => o.observed);
/** Fait entrer (ou sortir) un élément de l'écran pour tous les observateurs qui le suivent. */
const enter = (el: Element, isIntersecting = true) => ios.forEach((o) => { if (o.observed.includes(el)) o.cb([{ target: el, isIntersecting }]); });

const page = (children: Node[]): Site => ({ ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box", props: {}, children } }] });
const run = (id: string, patch: Partial<AnimationRun>): AnimationRun => ({ id, animation: { keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 100, style: { opacity: "1" } }] }, trigger: "load", duration: 500, easing: "linear", ...patch });
const text = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } } });

function mount(site: Site) {
  const ctx: RenderContext = { site, page: site.pages[0]!, params: {}, locale: "fr", data: memoryData([]), assets: assetMap(site), basePath: "" };
  document.body.innerHTML = renderToStaticMarkup(createElement(RenderPage, { ctx }));
  const w = window as unknown as Record<string, unknown>;
  delete w.__atelierIx;
  new Function(INTERACTION_SCRIPT)();
}

beforeEach(() => {
  calls.length = 0; ios.length = 0;
  const w = window as unknown as Record<string, unknown>;
  w.matchMedia = () => ({ matches: false });
  w.IntersectionObserver = class { observed: Element[] = []; constructor(cb: Observer["cb"]) { ios.push({ cb, observed: this.observed }); } observe(el: Element) { this.observed.push(el); } unobserve() { /* */ } disconnect() { /* */ } };
  (Element.prototype as unknown as { animate: unknown }).animate = function (this: Element, _kf: unknown, opts: { delay?: number; duration?: number }) {
    calls.push({ el: this, delay: opts.delay ?? 0, duration: opts.duration ?? 0 });
    return { pause() { /* */ }, play() { /* */ }, cancel() { /* */ }, reverse() { /* */ }, playState: "running", currentTime: 0 };
  };
});

describe("script du site : cibles et décalage", () => {
  it("entrée dans l'écran sur les enfants : un animate par enfant, délai croissant, l'hôte n'est pas animé", () => {
    mount(page([{ id: "p", type: "box", props: {}, animations: [run("r1", { trigger: "inView", delay: 100, target: { children: true }, stagger: { each: 80 } })], children: [text("a", "A"), text("b", "B"), text("c", "C")] }]));
    const host = document.querySelector(".n-p")!;
    expect(observed()).toContain(host);
    enter(host);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 100], ["n-b", 180], ["n-c", 260]]);
    expect((document.querySelector(".n-a") as HTMLElement).style.animation).toBe("none");
  });
  it("décalage depuis la fin et le centre", () => {
    mount(page([{ id: "p", type: "box", props: {}, animations: [run("r1", { trigger: "inView", target: { children: true }, stagger: { each: 10, from: "end" } })], children: [text("a", "A"), text("b", "B"), text("c", "C")] }, { id: "q", type: "box", props: {}, animations: [run("r2", { trigger: "inView", target: { children: true }, stagger: { each: 10, from: "center" } })], children: [text("d", "D"), text("e", "E"), text("f", "F")] }]));
    enter(document.querySelector(".n-p")!); enter(document.querySelector(".n-q")!);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 20], ["n-b", 10], ["n-c", 0], ["n-d", 10], ["n-e", 0], ["n-f", 10]]);
  });
  it("clic sur un bouton qui anime un autre élément, et un sélecteur libre", () => {
    mount(page([{ id: "btn", type: "box", props: {}, animations: [run("r1", { trigger: "click", target: { node: "panel" } }), run("r2", { trigger: "click", target: { selector: ".n-other" } })] }, { id: "panel", type: "box", props: {} }, { id: "other", type: "box", props: {} }]));
    (document.querySelector(".n-btn") as HTMLElement).click();
    expect(calls.map((c) => c.el.className).sort()).toEqual(["n-other", "n-panel"]);
  });
  it("morceaux d'un texte découpé : un animate par lettre, décalés", () => {
    mount(page([{ id: "t", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "ab cd" }] } }, animations: [run("r1", { trigger: "inView", split: "letters", stagger: { each: 30 } })] }]));
    enter(document.querySelector(".n-t")!);
    expect(calls.map((c) => [c.el.textContent, c.delay])).toEqual([["a", 0], ["b", 30], ["c", 60], ["d", 90]]);
  });
  it("survol d'une cible libre : joué par le script à l'entrée de la souris", () => {
    mount(page([{ id: "btn", type: "box", props: {}, animations: [run("r1", { trigger: "hover", target: { selector: ".n-far" } })] }, { id: "far", type: "box", props: {} }]));
    document.querySelector(".n-btn")!.dispatchEvent(new Event("mouseenter"));
    expect(calls.map((c) => c.el.className)).toEqual(["n-far"]);
  });
  it("« Jouer » de l'éditeur : __atelierPlay anime les cibles avec le décalage", () => {
    mount(page([{ id: "p", type: "box", props: {}, animations: [run("r1", { target: { children: true }, stagger: { each: 40 } })], children: [text("a", "A"), text("b", "B")] }]));
    const host = document.querySelector<HTMLElement>(".n-p")!;
    const a = (JSON.parse(host.getAttribute("data-anim")!) as { i: string }[])[0]!;
    const play = (window as unknown as { __atelierPlay: (el: Element, a: unknown, extra?: Record<string, unknown>) => unknown[] }).__atelierPlay;
    calls.length = 0;
    const out = play(host, a, { fill: "none" });
    expect(out).toHaveLength(2);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 0], ["n-b", 40]]);
  });
});
