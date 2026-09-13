// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Animation, Node, Site, Track, Trigger } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { ANIMATION_PLAY_SCRIPT, RenderPage, assetMap, memoryData, type RenderContext } from "@atelier/renderer";
import { applyScrub } from "../src/lib/scrub";

/**
 * Mode Animation : l'aperçu montre l'état d'une animation à la tête de lecture. Les pistes du déclencheur sont jouées en pause
 * sur leurs cibles avec l'outil du site (`__atelierAnim`), puis mises au temps voulu. L'API Web Animations est remplacée par un enregistreur.
 */
type Handle = { el: Element; delay: number; fill?: string; easing?: string; iterations?: number; currentTime: number | null; paused: boolean; cancelled: boolean; effect: { target: Element }; pause(): void; cancel(): void };
const handles: Handle[] = [];

const text = (id: string, v: string): Node => ({ id, type: "text", props: { tag: "p", content: { fr: [{ t: "text", v }] } } });
const track = (id: string, extra: Partial<Track> = {}, keyframes: Track["keyframes"] = [{ at: 100, style: { opacity: "0" } }, { at: 600, style: { opacity: "1" } }]): Track => ({ id, target: { trigger: true }, keyframes, ...extra });
const trigger = (id: string, on: Trigger["on"], animation: string, extra: Partial<Trigger> = {}): Trigger => ({ id, on, animation, ...extra });

function mount(children: Node[], animations: Animation[]) {
  const site: Site = { ...sampleSite, animations, pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box", props: {}, children } }] };
  const ctx: RenderContext = { site, page: site.pages[0]!, params: {}, locale: "fr", data: memoryData([]), assets: assetMap(site), basePath: "", editor: true };
  document.body.innerHTML = renderToStaticMarkup(createElement(RenderPage, { ctx }));
}

beforeEach(() => {
  applyScrub(document, null);
  handles.length = 0;
  const w = window as unknown as Record<string, unknown>;
  if (!w.__atelierAnim) new Function(ANIMATION_PLAY_SCRIPT)();
  (Element.prototype as unknown as { animate: unknown }).animate = function (this: Element, _kf: unknown, o: { delay?: number; fill?: string; easing?: string; iterations?: number }) {
    const h: Handle = { el: this, delay: o.delay ?? 0, fill: o.fill, easing: o.easing, iterations: o.iterations, currentTime: null, paused: false, cancelled: false, effect: { target: this }, pause() { this.paused = true; }, cancel() { this.cancelled = true; } };
    handles.push(h);
    return h;
  };
});

describe("aperçu à la tête de lecture", () => {
  it("joue chaque cible en pause au temps demandé, décalage compris, sans le délai du déclencheur ni ses répétitions", () => {
    mount([{ id: "p", type: "box", props: {}, triggers: [trigger("r1", "inView", "an_c", { delay: 300 })], children: [text("a", "A"), text("b", "B")] }], [{ id: "an_c", name: "Cartes", duration: 600, loop: "infinite", tracks: [track("t", { target: { trigger: true, children: true }, stagger: { each: 80 } })] }]);
    applyScrub(document, { id: "p", trigger: "r1", time: 250 });
    expect(handles.map((h) => [(h.el as HTMLElement).dataset.node, h.delay])).toEqual([["a", 100], ["b", 180]]);
    expect(handles.every((h) => h.paused && h.currentTime === 250 && h.fill === "both" && h.iterations === 1)).toBe(true);
  });

  it("déplacer la tête réutilise les mêmes animations ; revenir au repos les annule", () => {
    mount([{ id: "h", type: "box", props: {}, triggers: [trigger("r1", "load", "an_h")] }], [{ id: "an_h", name: "Héros", duration: 600, tracks: [track("t")] }]);
    applyScrub(document, { id: "h", trigger: "r1", time: 0 });
    applyScrub(document, { id: "h", trigger: "r1", time: 420 });
    expect(handles).toHaveLength(1);
    expect(handles[0]!.currentTime).toBe(420);
    applyScrub(document, null);
    expect(handles[0]!.cancelled).toBe(true);
  });

  it("un élément recréé par un nouveau rendu reçoit de nouvelles animations", () => {
    const children: Node[] = [{ id: "h", type: "box", props: {}, triggers: [trigger("r1", "load", "an_h")] }];
    const animations: Animation[] = [{ id: "an_h", name: "Héros", duration: 600, tracks: [track("t")] }];
    mount(children, animations);
    applyScrub(document, { id: "h", trigger: "r1", time: 300 });
    mount(children, animations);
    applyScrub(document, { id: "h", trigger: "r1", time: 300 });
    expect(handles).toHaveLength(2);
    expect(handles[0]!.cancelled).toBe(true);
    expect(handles[1]!.el.isConnected).toBe(true);
  });

  it("changer de déclencheur annule l'animation précédente ; un déclencheur inconnu laisse l'aperçu au repos", () => {
    mount([{ id: "h", type: "box", props: {}, triggers: [trigger("r1", "load", "an_h"), trigger("r2", "click", "an_h")] }], [{ id: "an_h", name: "Héros", duration: 600, tracks: [track("t")] }]);
    applyScrub(document, { id: "h", trigger: "r1", time: 300 });
    applyScrub(document, { id: "h", trigger: "r2", time: 300 });
    expect(handles.map((h) => h.cancelled)).toEqual([true, false]);
    applyScrub(document, { id: "h", trigger: "inconnu", time: 300 });
    expect(handles.every((h) => h.cancelled)).toBe(true);
    expect(handles).toHaveLength(2);
  });
});
