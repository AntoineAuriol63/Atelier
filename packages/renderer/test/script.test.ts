// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { INTERACTION_SCRIPT, RenderPage, assetMap, memoryData, siteCss, type RenderContext } from "../src";

/**
 * Le script du site tourne dans un DOM simulé : l'API Web Animations et l'observateur d'intersection sont remplacés par des
 * enregistreurs, ce qui permet de vérifier quels éléments sont animés, avec quel délai, et sur quel déclencheur.
 */
type Call = { el: Element; delay: number; duration: number; easing?: string; kf: Keyframe[] };
type Handle = { playbackRate: number; reversed: number; playState: string; currentTime: number; pause(): void; play(): void; cancel(): void; reverse(): void };
const calls: Call[] = [];
const handles: Handle[] = [];
type Observer = { cb: (entries: { target: Element; isIntersecting: boolean }[]) => void; observed: Element[] };
const ios: Observer[] = [];
const observed = () => ios.flatMap((o) => o.observed);
/** Fait entrer (ou sortir) un élément de l'écran pour tous les observateurs qui le suivent. */
const enter = (el: Element, isIntersecting = true) => ios.forEach((o) => { if (o.observed.includes(el)) o.cb([{ target: el, isIntersecting }]); });

type Tr = import("@atelier/model").Trigger; type An = import("@atelier/model").Animation; type Tk = import("@atelier/model").Track;
const page = (children: Node[], animations: An[]): Site => ({ ...sampleSite, animations, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box", props: {}, children } }] });
const tk = (id: string, extra: Partial<Tk> = {}, keyframes: Tk["keyframes"] = [{ at: 0, style: { opacity: "0" } }, { at: 500, style: { opacity: "1" } }]): Tk => ({ id, target: { trigger: true }, keyframes, ...extra });
const an = (id: string, tracks: Tk[], extra: Partial<An> = {}): An => ({ id, name: id, duration: Math.max(...tracks.flatMap((t) => t.keyframes.map((k) => k.at))), tracks, ...extra });
const tr = (id: string, on: Tr["on"], animation: string, extra: Partial<Tr> = {}): Tr => ({ id, on, animation, ...extra });
const text = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } } });
const box = (id: string, triggers: Tr[], children?: Node[]): Node => ({ id, type: "box", props: {}, triggers, children });

function mount(site: Site) {
  const ctx: RenderContext = { site, page: site.pages[0]!, params: {}, locale: "fr", data: memoryData([]), assets: assetMap(site), basePath: "" };
  // Comme sur le site publié : la feuille du site, le HTML, puis le script.
  document.head.innerHTML = `<style>${siteCss(site)}</style>`;
  document.body.innerHTML = renderToStaticMarkup(createElement(RenderPage, { ctx }));
  // Avec le script actif, un navigateur ignore <noscript> ; le DOM simulé, lui, appliquerait sa règle `animation:none`.
  document.querySelectorAll("noscript").forEach((n) => n.remove());
  const w = window as unknown as Record<string, unknown>;
  delete w.__atelierIx;
  new Function(INTERACTION_SCRIPT)();
}

beforeEach(() => {
  calls.length = 0; ios.length = 0; handles.length = 0;
  const w = window as unknown as Record<string, unknown>;
  w.matchMedia = () => ({ matches: false });
  w.IntersectionObserver = class { observed: Element[] = []; constructor(cb: Observer["cb"]) { ios.push({ cb, observed: this.observed }); } observe(el: Element) { this.observed.push(el); } unobserve() { /* */ } disconnect() { /* */ } };
  (Element.prototype as unknown as { animate: unknown }).animate = function (this: Element, kf: Keyframe[], opts: { delay?: number; duration?: number; easing?: string }) {
    calls.push({ el: this, delay: opts.delay ?? 0, duration: opts.duration ?? 0, easing: opts.easing, kf });
    const h: Handle = { playbackRate: 1, reversed: 0, playState: "running", currentTime: 0, pause() { /* */ }, play() { /* */ }, cancel() { /* */ }, reverse() { this.playbackRate = -this.playbackRate; this.reversed += 1; } };
    handles.push(h);
    return h;
  };
});

describe("script du site : cibles et décalage", () => {
  it("entrée dans l'écran sur les enfants : un animate par enfant, délai croissant, l'hôte n'est pas animé", () => {
    mount(page([box("p", [tr("r1", "inView", "an_c", { delay: 100 })], [text("a", "A"), text("b", "B"), text("c", "C")])], [an("an_c", [tk("t", { target: { trigger: true, children: true }, stagger: { each: 80 } })])]));
    const host = document.querySelector(".n-p")!;
    expect(observed()).toContain(host);
    enter(host);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 100], ["n-b", 180], ["n-c", 260]]);
    expect((document.querySelector(".n-a") as HTMLElement).style.animationName).toBe("none");
  });
  it("décalage depuis la fin et le centre", () => {
    mount(page([box("p", [tr("r1", "inView", "an_e")], [text("a", "A"), text("b", "B"), text("c", "C")]), box("q", [tr("r2", "inView", "an_m")], [text("d", "D"), text("e", "E"), text("f", "F")])], [an("an_e", [tk("t", { target: { trigger: true, children: true }, stagger: { each: 10, from: "end" } })]), an("an_m", [tk("t", { target: { trigger: true, children: true }, stagger: { each: 10, from: "center" } })])]));
    enter(document.querySelector(".n-p")!); enter(document.querySelector(".n-q")!);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 20], ["n-b", 10], ["n-c", 0], ["n-d", 10], ["n-e", 0], ["n-f", 10]]);
  });
  it("une animation à deux pistes : chaque piste part à son début, un clic anime un autre élément et un sélecteur", () => {
    mount(page([box("btn", [tr("r1", "click", "an_two")]), box("panel", []), box("other", [])], [an("an_two", [tk("t1", { target: { node: "panel" } }), tk("t2", { target: { selector: ".n-other" } }, [{ at: 300, style: { opacity: "0" } }, { at: 900, style: { opacity: "1" } }])])]));
    (document.querySelector(".n-btn") as HTMLElement).click();
    expect(calls.map((c) => [c.el.className, c.delay, c.duration]).sort()).toEqual([["n-other", 300, 600], ["n-panel", 0, 500]]);
  });
  it("morceaux d'un texte découpé : un animate par lettre, décalés", () => {
    mount(page([{ id: "t", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "ab cd" }] } }, triggers: [tr("r1", "inView", "an_l")] }], [an("an_l", [tk("t", { target: { trigger: true, split: "letters" }, stagger: { each: 30 } })])]));
    enter(document.querySelector(".n-t")!);
    expect(calls.map((c) => [c.el.textContent, c.delay])).toEqual([["a", 0], ["b", 30], ["c", 60], ["d", 90]]);
  });
  it("survol d'une cible libre : joué par le script à l'entrée de la souris", () => {
    mount(page([box("btn", [tr("r1", "hover", "an_s")]), box("far", [])], [an("an_s", [tk("t", { target: { selector: ".n-far" } })])]));
    document.querySelector(".n-btn")!.dispatchEvent(new Event("mouseenter"));
    expect(calls.map((c) => c.el.className)).toEqual(["n-far"]);
  });
  it("« Jouer » de l'éditeur : __atelierPlay anime toutes les pistes avec le décalage", () => {
    mount(page([box("p", [tr("r1", "load", "an_p")], [text("a", "A"), text("b", "B")])], [an("an_p", [tk("t", { target: { trigger: true, children: true }, stagger: { each: 40 } })])]));
    const host = document.querySelector<HTMLElement>(".n-p")!;
    const a = (JSON.parse(host.getAttribute("data-anim")!) as { i: string }[])[0]!;
    const play = (window as unknown as { __atelierPlay: (el: Element, a: unknown, extra?: Record<string, unknown>) => unknown[] }).__atelierPlay;
    calls.length = 0;
    const out = play(host, a, { fill: "none" });
    expect(out).toHaveLength(2);
    expect(calls.map((c) => [c.el.className, c.delay])).toEqual([["n-a", 0], ["n-b", 40]]);
  });
  it("défilement : les pistes sont créées en pause et la position de défilement fixe le temps courant sur toute la ligne de temps", () => {
    (window as unknown as { innerHeight: number }).innerHeight = 800;
    mount(page([box("b", [tr("r1", "scroll", "an_sc")])], [an("an_sc", [tk("t1"), tk("t2", {}, [{ at: 500, style: { opacity: "1" } }, { at: 1500, style: { opacity: "0" } }])])]));
    expect(calls).toHaveLength(2);
    expect(handles.map((h) => h.currentTime)).toEqual([1500, 1500]);
  });
  it("défilement : courbes comme en CSS et décalage selon le rang réel (depuis la fin), sans délai de déclencheur", () => {
    (window as unknown as { innerHeight: number }).innerHeight = 800;
    mount(page([box("p", [tr("r1", "scroll", "an_st", { delay: 500 })], [text("a", "A"), text("b", "B"), text("c", "C")])], [an("an_st", [tk("t", { target: { trigger: true, children: true }, stagger: { each: 40, from: "end" } })])]));
    expect(calls.map((c) => [c.el.className, c.delay, c.easing])).toEqual([["n-a", 80, "linear"], ["n-b", 40, "linear"], ["n-c", 0, "linear"]]);
  });
  it("déclencheur de page au défilement : la progression du défilement de toute la page parcourt la ligne de temps", () => {
    (window as unknown as { innerHeight: number }).innerHeight = 800;
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, get: () => 2000 });
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => 600 });
    const site = page([box("bar", [])], [an("an_pg", [tk("t", { target: { node: "bar" } }, [{ at: 0, style: { transform: "scaleX(0)" } }, { at: 1000, style: { transform: "scaleX(1)" } }])])]);
    site.pages[0] = { ...site.pages[0]!, triggers: [tr("pg1", "scroll", "an_pg")] };
    mount(site);
    expect(calls.map((c) => c.el.className)).toEqual(["n-bar"]);
    expect(handles[0]!.currentTime).toBe(500);
    delete (document.documentElement as unknown as Record<string, unknown>).scrollHeight;
    delete (window as unknown as Record<string, unknown>).scrollY;
  });
  it("courbes : comme en CSS, une courbe par segment (ease par défaut) et une progression linéaire sur la piste", () => {
    const kfs = [{ at: 0, style: { opacity: "0" } }, { at: 250, style: { opacity: "0.5" }, easing: "ease-in" }, { at: 500, style: { opacity: "1" } }];
    mount(page([box("c", [tr("r1", "inView", "an_e")])], [an("an_e", [tk("t", {}, kfs)])]));
    enter(document.querySelector(".n-c")!);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.easing).toBe("linear");
    expect(calls[0]!.kf.map((k) => k.easing)).toEqual(["ease-in", "ease", "ease"]);
  });
});

describe("script du site : entrée dans l'écran sans éclair", () => {
  const cmp = (id: string, root: Node): import("@atelier/model").ComponentDef => ({ id, name: id, scope: "site", props: [], root });
  it("avant l'entrée, l'élément reste à son état de départ (animation CSS en pause) ; à l'entrée, seule son apparition est retirée du CSS et jouée", () => {
    mount(page([box("c", [tr("r1", "inView", "an_i")])], [an("an_i", [tk("t")])]));
    const el = document.querySelector<HTMLElement>(".n-c")!;
    expect(el.style.animationName).toBe("");
    expect(calls).toHaveLength(0);
    enter(el);
    expect(el.style.animationName).toBe("none");
    expect(calls).toHaveLength(1);
  });
  it("à chaque passage : à la sortie, l'élément reprend son état de départ, et l'apparition se rejoue à l'entrée suivante", () => {
    mount(page([box("c", [tr("r1", "inView", "an_i", { once: false })])], [an("an_i", [tk("t")])]));
    const el = document.querySelector<HTMLElement>(".n-c")!;
    enter(el);
    enter(el, false);
    expect(el.style.animationName).toBe("");
    enter(el);
    expect(el.style.animationName).toBe("none");
    expect(calls).toHaveLength(2);
  });
  it("une seule fois : une nouvelle entrée ne rejoue rien", () => {
    mount(page([box("c", [tr("r1", "inView", "an_i")])], [an("an_i", [tk("t")])]));
    const el = document.querySelector<HTMLElement>(".n-c")!;
    enter(el); enter(el, false); enter(el);
    expect(calls).toHaveLength(1);
  });
  it("une apparition et une boucle sur le même élément : la boucle continue en CSS, sans être relancée", () => {
    const loopKfs = [{ at: 0, style: { transform: "scale(1)" } }, { at: 1600, style: { transform: "scale(1.05)" } }];
    mount(page([box("c", [tr("r1", "inView", "an_i"), tr("r2", "load", "an_loop")])], [an("an_i", [tk("t")]), an("an_loop", [tk("t", {}, loopKfs)], { loop: "infinite" })]));
    const el = document.querySelector<HTMLElement>(".n-c")!;
    expect(calls).toHaveLength(0);
    enter(el);
    expect(el.style.animationName).toBe("none, at-an_loop-t");
    expect(calls.map((c) => c.duration)).toEqual([500]);
  });
  it("un élément enchaîné qui a sa propre boucle : une seule règle CSS porte les deux ; à l'entrée de l'élément qui lance, la boucle continue", () => {
    const loopKfs = [{ at: 0, style: { transform: "scale(1)" } }, { at: 1600, style: { transform: "scale(1.05)" } }];
    mount(page([box("hst", [tr("r1", "inView", "an_seq")]), box("btn", [tr("r2", "load", "an_loop")])], [an("an_seq", [tk("t_h"), tk("t_b", { target: { node: "btn" }, start: { after: "t_h" } }, [{ at: 500, style: { opacity: "0" } }, { at: 1000, style: { opacity: "1" } }])]), an("an_loop", [tk("t_l", {}, loopKfs)], { loop: "infinite" })]));
    const btn = document.querySelector<HTMLElement>(".n-btn")!;
    expect((document.head.textContent!.match(/\.n-btn\{animation:/g) ?? []).length).toBe(1);
    expect(btn.style.animationName).toBe("");
    enter(document.querySelector(".n-hst")!);
    expect(btn.style.animationName).toBe("none, at-an_loop-t_l");
  });
  it("deux apparitions sur un élément, l'une une seule fois, l'autre à chaque passage : la sortie ne rend que la seconde au CSS", () => {
    mount(page([box("c", [tr("r1", "inView", "an_a"), tr("r2", "inView", "an_b", { once: false })])], [an("an_a", [tk("ta")]), an("an_b", [tk("tb", {}, [{ at: 0, style: { transform: "scale(0.9)" } }, { at: 400, style: { transform: "none" } }])])]));
    const el = document.querySelector<HTMLElement>(".n-c")!;
    enter(el);
    expect(el.style.animationName).toBe("none, none");
    enter(el, false);
    expect(el.style.animationName).toBe("none, at-an_b-tb");
    enter(el);
    expect(calls).toHaveLength(3);
  });
  it("dans un composant, une piste qui vise un élément du composant ne joue que celui de la même occurrence", () => {
    const root: Node = { id: "k_root", type: "box", props: {}, children: [{ ...text("k_val", "12"), triggers: [tr("r1", "inView", "an_k")] }, text("k_lbl", "années")] };
    const site = { ...page([{ id: "i1", type: "instance", props: { component: "cmp_k" } }, { id: "i2", type: "instance", props: { component: "cmp_k" } }], [an("an_k", [tk("t_v"), tk("t_l", { target: { node: "k_lbl" }, start: { after: "t_v" } }, [{ at: 500, style: { opacity: "0" } }, { at: 1000, style: { opacity: "1" } }])])]), components: [cmp("cmp_k", root)] };
    mount(site);
    const vals = document.querySelectorAll(".n-k_val");
    const lbls = document.querySelectorAll(".n-k_lbl");
    enter(vals[0]!);
    expect(calls.map((c) => c.el)).toEqual([vals[0], lbls[0]]);
    expect((lbls[1] as HTMLElement).style.animationName).toBe("");
  });
});

describe("script du site : retour et bascule", () => {
  it("survol qui revient : joue à l'entrée, rembobine à la sortie, repart en avant à l'entrée suivante", () => {
    mount(page([box("b", [tr("r1", "hover", "an_h", { reverseOnLeave: true })])], [an("an_h", [tk("t")])]));
    const el = document.querySelector(".n-b")!;
    el.dispatchEvent(new Event("mouseenter"));
    expect(calls).toHaveLength(1);
    const h = handles[0]!;
    el.dispatchEvent(new Event("mouseleave"));
    expect(h.reversed).toBe(1); expect(h.playbackRate).toBe(-1);
    el.dispatchEvent(new Event("mouseenter"));
    expect(calls).toHaveLength(1); expect(h.reversed).toBe(2); expect(h.playbackRate).toBe(1);
  });
  it("clic qui bascule : un clic joue, le suivant rembobine, le troisième rejoue en avant ; sans bascule, chaque clic rejoue", () => {
    mount(page([box("b", [tr("r1", "click", "an_t", { toggle: true })]), box("c", [tr("r2", "click", "an_t")])], [an("an_t", [tk("t")])]));
    const el = document.querySelector<HTMLElement>(".n-b")!;
    el.click(); expect(calls).toHaveLength(1);
    el.click(); expect(calls).toHaveLength(1); expect(handles[0]!.reversed).toBe(1);
    el.click(); expect(handles[0]!.reversed).toBe(2); expect(handles[0]!.playbackRate).toBe(1);
    const c = document.querySelector<HTMLElement>(".n-c")!;
    c.click(); c.click();
    expect(calls).toHaveLength(3);
  });
});
