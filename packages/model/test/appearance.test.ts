import { describe, it, expect } from "vitest";
import {
  animationById, appearanceAnchors, appearanceOf, applyOps, planAppearanceDelay, planAppearanceDetail, planAppearancePreset, planAppearanceReplay,
  planAppearanceSpeed, planAppearanceStart, planQuickAnimation, planUpdateTrigger, presetById, sampleSite, schema, trackPresetMatch, trackSpan,
  type Node, type Site,
} from "../src";

/**
 * Apparition d'un élément (tests simulés du 14 septembre, lot 1) : ce qu'on règle à côté de l'effet (démarre après tel élément,
 * en même temps, délai, vitesse, rejouer) s'écrit dans une seule animation, comme un départ dans la ligne de temps (solution A).
 */
const text = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
const box = (id: string, name: string, children: Node[] = []): Node => ({ id, type: "box", name, props: {}, children });
const hero = box("hero", "Héros", [text("title", "Bonjour", "h1"), text("par", "Texte"), box("btns", "Boutons", [box("bt1", "Réserver"), box("bt2", "Voir")])]);
const about = box("about", "La maison", [box("photo", "Photo"), text("hh2", "Une cuisine", "h2"), text("pp2", "Aurèle et Nils")]);
const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [hero, about] } }] };

const find = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };
const run = (site: Site, ops: ReturnType<typeof planAppearanceStart>) => applyOps(site, ops).site;
const quick = (site: Site, id: string, preset: string, on?: "load") => {
  let s = run(site, planQuickAnimation(site, find(site, id), "Apparition", preset));
  if (on) s = run(s, planUpdateTrigger(find(s, id), find(s, id).triggers![0]!.id, { on }));
  return s;
};
/** Départ et fin de la piste d'un élément dans son animation. */
const span = (site: Site, id: string) => { const a = appearanceOf(site, id)!; return [a.start, a.end]; };
const valid = (site: Site) => expect(schema.site.safeParse(site).success).toBe(true);

describe("apparition : reconnaître un préréglage sur une piste", () => {
  it("un préréglage décalé dans le temps et mis à l'échelle reste reconnu ; retouché, il ne l'est plus", () => {
    const kfs = presetById("fade-up")!.keyframes;
    const track = { id: "t", target: { node: "bt1" }, keyframes: kfs.map((k) => ({ ...k, at: 700 + Math.round(k.at * 1.6) })) };
    expect(trackPresetMatch(track)).toMatchObject({ preset: { id: "fade-up" }, factor: 1.6 });
    expect(trackPresetMatch({ ...track, keyframes: [track.keyframes[0]!, { ...track.keyframes[1]!, style: { opacity: "0.5" } }] })).toBeUndefined();
    expect(trackPresetMatch({ ...track, keyframes: [track.keyframes[0]!] })).toBeUndefined();
  });
});

describe("apparition : lire ce qui est réglé sur un élément", () => {
  it("un choix rapide sur l'élément : il se lance lui-même, à l'entrée dans l'écran, sans délai, vitesse normale", () => {
    const site = quick(base, "title", "fade-up");
    expect(appearanceOf(site, "title")).toMatchObject({ own: true, hostId: "title", begin: { kind: "own", on: "inView" }, delay: 0, preset: { id: "fade-up" }, speed: "normal", start: 0, end: 700 });
    expect(appearanceOf(site, "par")).toBeUndefined();
  });
  it("le délai du déclencheur compte dans le délai lu", () => {
    let site = quick(base, "title", "fade-up", "load");
    site = run(site, planUpdateTrigger(find(site, "title"), find(site, "title").triggers![0]!.id, { delay: 150 }));
    expect(appearanceOf(site, "title")).toMatchObject({ begin: { kind: "own", on: "load" }, delay: 150 });
  });
  it("une boucle ou un survol ne sont pas des apparitions", () => {
    let site = run(base, planQuickAnimation(base, find(base, "bt1"), "Continue", "pulse"));
    site = run(site, planQuickAnimation(site, find(site, "bt1"), "Survol", "grow"));
    expect(appearanceOf(site, "bt1")).toBeUndefined();
  });
});

describe("apparition : démarrer après un autre élément (T3)", () => {
  it("le bouton démarre après le titre : sa piste rejoint l'animation du titre, au bout du titre ; son propre déclencheur part", () => {
    let site = quick(base, "title", "fade-up", "load");
    site = quick(site, "bt1", "fade-up", "load");
    site = run(site, planAppearanceStart(site, "bt1", { kind: "after", node: "title" }));
    const b1 = appearanceOf(site, "bt1")!;
    expect(b1).toMatchObject({ own: false, hostId: "title", begin: { kind: "after", node: "title" }, delay: 0, preset: { id: "fade-up" }, speed: "normal", start: 700, end: 1400 });
    expect(find(site, "bt1").triggers).toBeUndefined();
    expect(site.animations).toHaveLength(1);
    expect(b1.animation.tracks.map((t) => t.target)).toEqual([{ trigger: true }, { node: "bt1" }]);
    expect(b1.trigger.on).toBe("load");
    // Le titre, lui, reste un préréglage intact à sa vitesse.
    expect(appearanceOf(site, "title")).toMatchObject({ own: true, preset: { id: "fade-up" }, speed: "normal", begin: { kind: "own", on: "load" } });
    valid(site);
  });
  it("le second bouton en même temps que le premier, puis après lui", () => {
    let site = quick(quick(quick(base, "title", "fade-up", "load"), "bt1", "fade-up", "load"), "bt2", "zoom", "load");
    site = run(site, planAppearanceStart(site, "bt1", { kind: "after", node: "title" }));
    site = run(site, planAppearanceStart(site, "bt2", { kind: "with", node: "bt1" }));
    expect(appearanceOf(site, "bt2")).toMatchObject({ begin: { kind: "with", node: "bt1" }, delay: 0, start: 700, preset: { id: "zoom" } });
    site = run(site, planAppearanceStart(site, "bt2", { kind: "after", node: "bt1" }));
    expect(appearanceOf(site, "bt2")).toMatchObject({ begin: { kind: "after", node: "bt1" }, start: 1400, end: 2100 });
    expect(site.animations).toHaveLength(1);
    valid(site);
  });
  it("les options proposées : les éléments de la page qui ont une apparition, ceux de la même animation d'abord", () => {
    let site = quick(quick(quick(base, "photo", "slide-right"), "title", "fade-up", "load"), "bt1", "fade-up", "load");
    site = run(site, planAppearanceStart(site, "bt1", { kind: "after", node: "title" }));
    site = quick(site, "bt2", "fade", "load");
    expect(appearanceAnchors(site, "bt2")).toEqual(["title", "bt1", "photo"]);
    expect(appearanceAnchors(site, "bt1")).toEqual(["title", "bt2", "photo"]);
  });
});

describe("apparition : régler un élément enchaîné sans casser l'enchaînement", () => {
  const chain = () => {
    let site = quick(quick(quick(base, "title", "fade-up", "load"), "bt1", "fade-up", "load"), "bt2", "fade-up", "load");
    site = run(site, planAppearanceStart(site, "bt1", { kind: "after", node: "title" }));
    return run(site, planAppearanceStart(site, "bt2", { kind: "with", node: "bt1" }));
  };
  it("ralentir le titre décale ce qui vient après lui ; sa piste seule change d'échelle", () => {
    let site = chain();
    site = run(site, planAppearanceSpeed(site, "title", "slow"));
    expect(span(site, "title")).toEqual([0, 1120]);
    expect(span(site, "bt1")).toEqual([1120, 1820]);
    expect(span(site, "bt2")).toEqual([1120, 1820]);
    expect(appearanceOf(site, "title")).toMatchObject({ speed: "slow", preset: { id: "fade-up" } });
    expect(appearanceOf(site, "bt1")).toMatchObject({ begin: { kind: "after", node: "title" }, speed: "normal" });
    valid(site);
  });
  it("un délai sur un élément enchaîné : il part plus tard, et ce qui part avec lui ou après lui suit", () => {
    let site = chain();
    site = run(site, planAppearanceDelay(site, "bt1", 200));
    expect(appearanceOf(site, "bt1")).toMatchObject({ begin: { kind: "after", node: "title" }, delay: 200, start: 900 });
    expect(appearanceOf(site, "bt2")).toMatchObject({ begin: { kind: "with", node: "bt1" }, delay: 0, start: 900 });
  });
  it("un délai sur l'élément qui lance : le délai du déclencheur est replié dans la ligne de temps (un seul délai)", () => {
    let site = chain();
    site = run(site, planUpdateTrigger(find(site, "title"), find(site, "title").triggers![0]!.id, { delay: 150 }));
    site = run(site, planAppearanceDelay(site, "title", 300));
    expect(find(site, "title").triggers![0]!.delay).toBeUndefined();
    expect(appearanceOf(site, "title")).toMatchObject({ delay: 300, start: 300, end: 1000 });
    expect(span(site, "bt1")).toEqual([1000, 1700]);
  });
  it("changer l'effet d'un élément enchaîné garde son départ et sa vitesse", () => {
    const s0 = chain();
    let site = run(s0, planAppearanceSpeed(s0, "bt1", "fast"));
    site = run(site, planAppearancePreset(site, "bt1", "zoom"));
    expect(appearanceOf(site, "bt1")).toMatchObject({ preset: { id: "zoom" }, speed: "fast", start: 700, end: 1120 });
  });
  it("retirer l'apparition d'un élément enchaîné referme l'enchaînement", () => {
    let site = quick(quick(quick(base, "title", "fade-up", "load"), "bt1", "fade-up", "load"), "bt2", "fade-up", "load");
    site = run(site, planAppearanceStart(site, "bt1", { kind: "after", node: "title" }));
    site = run(site, planAppearanceStart(site, "bt2", { kind: "after", node: "bt1" }));
    site = run(site, planAppearancePreset(site, "bt1", ""));
    expect(appearanceOf(site, "bt1")).toBeUndefined();
    expect(appearanceOf(site, "bt2")).toMatchObject({ begin: { kind: "after", node: "title" }, start: 700 });
    // Retirer l'apparition de l'élément qui lance : ce qui suit reste lancé par lui.
    site = run(site, planAppearancePreset(site, "title", ""));
    expect(appearanceOf(site, "title")).toBeUndefined();
    expect(appearanceOf(site, "bt2")).toMatchObject({ hostId: "title", begin: { kind: "host", hostId: "title", on: "load" }, start: 0 });
    // Plus rien ne bouge : le déclencheur et l'animation partent.
    site = run(site, planAppearancePreset(site, "bt2", ""));
    expect(find(site, "title").triggers).toBeUndefined();
    expect(site.animations).toHaveLength(0);
    valid(site);
  });
  it("revenir à « quand il entre dans l'écran » : l'élément reprend son propre déclencheur, à sa vitesse", () => {
    const s0 = chain();
    let site = run(s0, planAppearanceSpeed(s0, "bt1", "slow"));
    site = run(site, planAppearanceStart(site, "bt1", { kind: "own", on: "inView" }));
    expect(appearanceOf(site, "bt1")).toMatchObject({ own: true, begin: { kind: "own", on: "inView" }, start: 0, end: 1120, speed: "slow", preset: { id: "fade-up" } });
    expect(appearanceOf(site, "bt2")).toMatchObject({ begin: { kind: "after", node: "title" }, start: 700 });
    valid(site);
  });
});

describe("apparition : composer une scène (T4)", () => {
  it("construite dans le désordre : un élément qui lance déjà une suite l'emmène avec lui", () => {
    let site = quick(quick(quick(base, "photo", "slide-right"), "hh2", "fade-up"), "pp2", "fade");
    site = run(site, planAppearanceStart(site, "pp2", { kind: "after", node: "hh2" }));
    site = run(site, planAppearanceStart(site, "hh2", { kind: "after", node: "photo" }));
    expect(site.animations).toHaveLength(1);
    expect(appearanceOf(site, "hh2")).toMatchObject({ hostId: "photo", begin: { kind: "after", node: "photo" }, start: 700, end: 1400 });
    expect(appearanceOf(site, "pp2")).toMatchObject({ hostId: "photo", begin: { kind: "after", node: "hh2" }, start: 1400, end: 2100 });
    expect(find(site, "hh2").triggers).toBeUndefined();
    valid(site);
  });
  it("réordonner dans la même animation : le paragraphe passe avant le titre", () => {
    let site = quick(quick(quick(base, "photo", "slide-right"), "hh2", "fade-up"), "pp2", "fade");
    site = run(site, planAppearanceStart(site, "hh2", { kind: "after", node: "photo" }));
    site = run(site, planAppearanceStart(site, "pp2", { kind: "after", node: "hh2" }));
    site = run(site, planAppearanceStart(site, "pp2", { kind: "after", node: "photo" }));
    site = run(site, planAppearanceStart(site, "hh2", { kind: "after", node: "pp2" }));
    expect(span(site, "pp2")).toEqual([700, 1400]);
    expect(span(site, "hh2")).toEqual([1400, 2100]);
    expect(appearanceOf(site, "hh2")!.begin).toEqual({ kind: "after", node: "pp2" });
  });
  it("rejouer à chaque passage se règle depuis n'importe quel élément de la scène, sur ce qui la lance", () => {
    let site = quick(quick(base, "photo", "slide-right"), "hh2", "fade-up");
    site = run(site, planAppearanceStart(site, "hh2", { kind: "after", node: "photo" }));
    site = run(site, planAppearanceReplay(site, "hh2", true));
    expect(find(site, "photo").triggers![0]!.once).toBe(false);
    expect(appearanceOf(site, "hh2")!.trigger.once).toBe(false);
    site = run(site, planAppearanceReplay(site, "photo", false));
    expect(find(site, "photo").triggers![0]!.once).toBeUndefined();
    // Au chargement, rejouer n'a pas de sens.
    const loaded = quick(base, "title", "fade", "load");
    expect(planAppearanceReplay(loaded, "title", true)).toEqual([]);
  });
  it("les enfants un à un sur un élément enchaîné : ce qui vient après attend le dernier enfant", () => {
    let site = quick(quick(base, "title", "fade-up", "load"), "btns", "fade", "load");
    site = quick(site, "par", "fade", "load");
    site = run(site, planAppearanceStart(site, "btns", { kind: "after", node: "title" }));
    site = run(site, planAppearanceStart(site, "par", { kind: "after", node: "btns" }));
    site = run(site, planAppearanceDetail(site, "btns", "children"));
    const btns = appearanceOf(site, "btns")!;
    expect(btns).toMatchObject({ detail: "children", start: 700, end: 1500 });
    expect(btns.track).toMatchObject({ target: { node: "btns", children: true }, stagger: { each: 100 } });
    expect(appearanceOf(site, "par")).toMatchObject({ begin: { kind: "after", node: "btns" }, start: 1500 });
    expect(trackSpan(animationById(site, btns.animation.id)!.tracks.find((t) => "node" in t.target && t.target.node === "par")!).start).toBe(1500);
  });
  it("on ne démarre pas après soi-même, ni après un élément d'une autre page", () => {
    const site = quick(base, "title", "fade-up");
    expect(planAppearanceStart(site, "title", { kind: "after", node: "title" })).toEqual([]);
    const two: Site = { ...site, pages: [...site.pages, { ...site.pages[0]!, id: "pg_2", path: "/autre", root: { id: "root2", type: "box", props: {}, children: [text("far", "Loin")] } }] };
    const withFar = quick(two, "far", "fade");
    expect(planAppearanceStart(withFar, "title", { kind: "after", node: "far" })).toEqual([]);
    expect(appearanceAnchors(withFar, "title")).toEqual([]);
  });
});
