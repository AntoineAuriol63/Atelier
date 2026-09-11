import { describe, it, expect } from "vitest";
import { ANIMATION_PRESETS, animationById, animationFromPreset, animationUsages, applyOps, describeAnimation, describeTrigger, easingCss, keyframeAt, migrate, parseSpring, planAddTrack, planAddTrigger, planApplyPreset, planRemoveAnimation, planRemoveKeyframe, planRemoveTrack, planRemoveTrigger, planSetKeyframe, planUpdateAnimation, planUpdateTrigger, presetById, resolveTrackTarget, sampleSite, schema, springDuration, springEasing, springSamples, staggerDelay, staggerRank, trackSpan, type Animation, type Node, type Site, type Trigger } from "../src";
const siteSchema = schema.site;

const node = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };
const anim = (id: string, tracks: Animation["tracks"], extra: Partial<Animation> = {}): Animation => ({ id, name: "Test", duration: 1000, tracks, ...extra });

describe("animations : préréglages, déclencheurs, lignes de temps", () => {
  it("un préréglage donne une animation complète à cible relative, mise à l'échelle sur la durée demandée", () => {
    const a = animationFromPreset(presetById("fade-up")!, { id: "an_1" });
    expect(a).toMatchObject({ id: "an_1", name: "Fondu en montant", preset: "fade-up", duration: 700 });
    expect(a.tracks[0]!.target).toEqual({ trigger: true });
    expect(a.tracks[0]!.keyframes.map((k) => k.at)).toEqual([0, 700]);
    const slow = animationFromPreset(presetById("fade-up")!, { duration: 1400 });
    expect(slow.tracks[0]!.keyframes.map((k) => k.at)).toEqual([0, 1400]);
    expect(ANIMATION_PRESETS.every((p) => p.keyframes.length >= 2 && p.keyframes[0]!.at === 0)).toBe(true);
    expect(presetById("float")!.loop).toBe("infinite");
  });
  it("appliquer un préréglage : une animation dans le site, un déclencheur sur l'élément, rien dans le style", () => {
    const n = node(sampleSite, "hero_h1");
    let { site } = applyOps(sampleSite, planApplyPreset(sampleSite, n, presetById("pulse")!, { animationId: "an_p", triggerId: "tr_p" }));
    expect(animationById(site, "an_p")?.loop).toBe("infinite");
    expect(node(site, "hero_h1").triggers).toEqual([{ id: "tr_p", on: "load", animation: "an_p" }]);
    expect(node(site, "hero_h1").style).toEqual(n.style);
    ({ site } = applyOps(site, planUpdateTrigger(node(site, "hero_h1"), "tr_p", { delay: 200, pauseOnHover: true })));
    expect(node(site, "hero_h1").triggers![0]).toMatchObject({ delay: 200, pauseOnHover: true });
    expect(animationUsages(site, "an_p").map((u) => u.node?.id)).toEqual(["hero_h1"]);
    ({ site } = applyOps(site, planRemoveTrigger(node(site, "hero_h1"), "tr_p")));
    expect(node(site, "hero_h1").triggers).toBeUndefined();
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("supprimer une animation retire aussi ses déclencheurs, sur les éléments et sur les pages", () => {
    const n = node(sampleSite, "hero_h1");
    let { site } = applyOps(sampleSite, planApplyPreset(sampleSite, n, presetById("spin")!, { animationId: "an_s", triggerId: "tr_s" }));
    site = { ...site, pages: site.pages.map((p, i) => (i === 0 ? { ...p, triggers: [{ id: "tr_page", on: "load", animation: "an_s" }] } : p)) };
    expect(animationUsages(site, "an_s")).toHaveLength(2);
    ({ site } = applyOps(site, planRemoveAnimation(site, "an_s")));
    expect(animationById(site, "an_s")).toBeUndefined();
    expect(node(site, "hero_h1").triggers).toBeUndefined();
    expect(site.pages[0]!.triggers).toBeUndefined();
  });
  it("images-clés : poser, fusionner, retirer ; pistes : ajouter, retirer ; portée d'une piste", () => {
    const a = anim("an_k", [{ id: "tk", target: { trigger: true }, keyframes: [{ at: 0, style: {} }, { at: 600, style: { opacity: "1" } }] }]);
    let site: Site = { ...sampleSite, animations: [a] };
    ({ site } = applyOps(site, planSetKeyframe(site, "an_k", "tk", 300, { opacity: "0.5" })));
    ({ site } = applyOps(site, planSetKeyframe(site, "an_k", "tk", 300, { transform: "scale(1.1)" }, "ease-in")));
    let track = animationById(site, "an_k")!.tracks[0]!;
    expect(track.keyframes.map((k) => k.at)).toEqual([0, 300, 600]);
    expect(keyframeAt(track, 300)).toEqual({ at: 300, style: { opacity: "0.5", transform: "scale(1.1)" }, easing: "ease-in" });
    ({ site } = applyOps(site, planSetKeyframe(site, "an_k", "tk", 1500, { opacity: "0" })));
    expect(animationById(site, "an_k")!.duration).toBe(1500);
    expect(trackSpan(animationById(site, "an_k")!.tracks[0]!)).toEqual({ start: 0, end: 1500 });
    ({ site } = applyOps(site, planRemoveKeyframe(site, "an_k", "tk", 300)));
    track = animationById(site, "an_k")!.tracks[0]!;
    expect(track.keyframes.map((k) => k.at)).toEqual([0, 600, 1500]);
    ({ site } = applyOps(site, planAddTrack(site, "an_k", { id: "tk2", target: { node: "hero_p" }, keyframes: [{ at: 200, style: {} }, { at: 800, style: { opacity: "0" } }] })));
    expect(animationById(site, "an_k")!.tracks).toHaveLength(2);
    ({ site } = applyOps(site, planRemoveTrack(site, "an_k", "tk")));
    expect(animationById(site, "an_k")!.tracks.map((t) => t.id)).toEqual(["tk2"]);
    ({ site } = applyOps(site, planUpdateAnimation(site, "an_k", { name: "Arrivée", loop: 2 })));
    expect(animationById(site, "an_k")).toMatchObject({ name: "Arrivée", loop: 2 });
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("le schéma refuse une cible ou un déclencheur inconnus", () => {
    const withAnim = (a: unknown, t: unknown) => ({ ...structuredClone(sampleSite), animations: [a], pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [{ id: "txt", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "Bonjour" }] } }, triggers: [t] }] } }] });
    const ok = anim("an_ok", [{ id: "tk_ok", target: { trigger: true, split: "letters" }, stagger: { each: 30, from: "center" }, keyframes: [{ at: 0, style: {} }, { at: 500, style: { opacity: "1" }, easing: "spring(170, 26)" }] }], { loop: "infinite", alternate: true });
    const tr: Trigger = { id: "tr_ok", on: "pointer", animation: "an_ok", axis: "x" };
    expect(siteSchema.safeParse(withAnim(ok, tr)).success).toBe(true);
    expect(siteSchema.safeParse(withAnim({ ...ok, tracks: [{ ...ok.tracks[0], target: { parent: true } }] }, tr)).success).toBe(false);
    expect(siteSchema.safeParse(withAnim(ok, { ...tr, on: "swipe" })).success).toBe(false);
    expect(siteSchema.safeParse(withAnim(ok, { ...tr, toggle: "oui" })).success).toBe(false);
  });
  it("résout une cible de piste par rapport à l'élément du déclencheur", () => {
    expect(resolveTrackTarget({ trigger: true }, "host")).toEqual({ node: "host" });
    expect(resolveTrackTarget({ trigger: true, children: true }, "host")).toEqual({ node: "host", children: true });
    expect(resolveTrackTarget({ node: "other", split: "words" }, "host")).toEqual({ node: "other", split: "words" });
    expect(resolveTrackTarget({ selector: ".x" }, "host")).toEqual({ selector: ".x" });
  });
  it("décrit un déclencheur et une animation en français", () => {
    const a = anim("an_d", [{ id: "t1", target: { trigger: true, split: "letters" }, stagger: { each: 30, from: "center" }, keyframes: [{ at: 0, style: {} }, { at: 700, style: {} }] }, { id: "t2", target: { node: "hero_p" }, keyframes: [{ at: 0, style: {} }, { at: 1200, style: {} }] }], { name: "Arrivée du héros", loop: "infinite" });
    const site: Site = { ...sampleSite, animations: [a] };
    expect(describeAnimation(a)).toBe("Arrivée du héros · 2 pistes · 1\u202f200 ms · en boucle");
    expect(describeTrigger({ id: "x", on: "inView", animation: "an_d", delay: 100 }, site)).toBe("À l'entrée dans l'écran · Arrivée du héros · +100 ms");
    expect(describeTrigger({ id: "x", on: "hover", animation: "an_d", reverseOnLeave: true }, site)).toBe("Au survol · Arrivée du héros · revient au départ de la souris");
    expect(describeTrigger({ id: "x", on: "click", animation: "an_d", toggle: true }, site)).toBe("Au clic · Arrivée du héros · bascule à chaque clic");
    expect(describeTrigger({ id: "x", on: "scroll", animation: "nope" }, site)).toBe("Au défilement · animation manquante");
  });
});

describe("animations : décalage et ressorts", () => {
  it("staggerRank et staggerDelay", () => {
    expect([0, 1, 2, 3].map((i) => staggerRank(i, 4, "end"))).toEqual([3, 2, 1, 0]);
    expect([0, 1, 2].map((i) => staggerRank(i, 3, "center"))).toEqual([1, 0, 1]);
    expect(staggerDelay({ each: 50 }, 100, 3, 5)).toBe(250);
    expect(staggerDelay(undefined, 100, 3, 5)).toBe(100);
  });
  it("ressort : lecture, réponse, durée de stabilisation, courbe CSS", () => {
    expect(parseSpring("spring(170, 26)")).toEqual({ stiffness: 170, damping: 26 });
    expect(parseSpring("ease")).toBeNull();
    expect(springEasing(80, 8)).toBe("spring(80, 8)");
    const soft = springSamples(170, 8, springDuration(170, 8), 60);
    expect(soft[0]).toBe(0); expect(soft[59]).toBe(1); expect(Math.max(...soft)).toBeGreaterThan(1.1);
    expect(springDuration(170, 8)).toBeGreaterThan(springDuration(170, 26));
    expect(easingCss("spring(170, 26)", 600)).toMatch(/^linear\(0(,-?[0-9.]+)+,1\)$/);
    expect(easingCss(undefined, 600)).toBe("ease");
  });
});

describe("migration 2 → 3", () => {
  const legacy = (runs: unknown[], defs: unknown[] = []) => {
    const old = structuredClone(sampleSite) as unknown as Record<string, unknown> & { schemaVersion: number; pages: { root: Node }[]; animations?: unknown[] };
    old.schemaVersion = 2; old.animations = defs;
    const h1 = (function find(n: Node): Node | undefined { if (n.id === "hero_h1") return n; for (const c of n.children ?? []) { const f = find(c); if (f) return f; } return undefined; })(old.pages[0]!.root)!;
    (h1 as unknown as { animations: unknown[] }).animations = runs;
    return old;
  };
  it("un run en ligne devient une animation du site et un déclencheur ; % → ms, courbe par segment, cible relative, options", () => {
    const site = migrate(legacy([{ id: "ix1", animation: { keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 50, style: { opacity: "0.5" } }, { at: 100, style: { opacity: "1" } }] }, preset: "fade", trigger: "inView", duration: 800, delay: 90, easing: "ease-out", once: false, target: { children: true }, stagger: { each: 80, from: "end" }, iterations: 3, direction: "alternate", pauseOnHover: true }]));
    expect(site.schemaVersion).toBe(3);
    const n = node(site, "hero_h1");
    expect((n as unknown as { animations?: unknown }).animations).toBeUndefined();
    expect(n.triggers).toEqual([{ id: "ix1", on: "inView", animation: "an_ix1", delay: 90, once: false, pauseOnHover: true }]);
    const a = animationById(site, "an_ix1")!;
    expect(a).toMatchObject({ name: "Fondu", preset: "fade", duration: 800, loop: 3, alternate: true });
    expect(a.tracks[0]!.target).toEqual({ trigger: true, children: true });
    expect(a.tracks[0]!.stagger).toEqual({ each: 80, from: "end" });
    expect(a.tracks[0]!.keyframes).toEqual([{ at: 0, style: { opacity: "0" } }, { at: 400, style: { opacity: "0.5" }, easing: "ease-out" }, { at: 800, style: { opacity: "1" }, easing: "ease-out" }]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("un run qui renvoyait à la bibliothèque reçoit sa copie nommée ; retour, bascule et découpage sont conservés", () => {
    const site = migrate(legacy([{ id: "ix2", animation: "lib1", trigger: "hover", duration: 300, reverseOnLeave: true, split: "letters" }, { id: "ix3", animation: { keyframes: [{ at: 0, style: {} }, { at: 100, style: { transform: "scale(1.1)" } }] }, trigger: "click", duration: 200, toggle: true, target: { selector: ".x" } }], [{ id: "lib1", name: "Toupie", keyframes: [{ at: 0, style: { transform: "rotate(0deg)" } }, { at: 100, style: { transform: "rotate(360deg)" } }] }]));
    const n = node(site, "hero_h1");
    expect(n.triggers).toEqual([{ id: "ix2", on: "hover", animation: "an_ix2", reverseOnLeave: true }, { id: "ix3", on: "click", animation: "an_ix3", toggle: true }]);
    expect(animationById(site, "an_ix2")).toMatchObject({ name: "Toupie", duration: 300 });
    expect(animationById(site, "an_ix2")!.tracks[0]!.target).toEqual({ trigger: true, split: "letters" });
    expect(animationById(site, "an_ix3")!.tracks[0]!.target).toEqual({ selector: ".x" });
    expect(site.animations.find((a) => a.id === "lib1")).toBeUndefined();
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("1 → 3 d'un coup : une apparition écrite en interaction finit en déclencheur et animation", () => {
    const old = structuredClone(sampleSite) as unknown as Record<string, unknown> & { schemaVersion: number; pages: { root: Node }[] };
    old.schemaVersion = 1; delete (old as { animations?: unknown }).animations;
    const h1 = (function find(n: Node): Node | undefined { if (n.id === "hero_h1") return n; for (const c of n.children ?? []) { const f = find(c); if (f) return f; } return undefined; })(old.pages[0]!.root)!;
    h1.style = { base: { opacity: "0", transform: "translateY(28px)", color: "red" } };
    h1.interactions = [{ id: "ix1", trigger: { kind: "inView", options: { reveal: "fade-up", once: true } }, actions: [{ kind: "setStyle", target: { self: true }, style: { opacity: "1" }, transition: { duration: 650, delay: 90, easing: "ease-out" } }] }];
    h1.props = { ...h1.props, marquee: 20 };
    const site = migrate(old);
    const n = node(site, "hero_h1");
    expect(site.schemaVersion).toBe(3);
    expect(n.interactions).toBeUndefined();
    expect(n.triggers).toEqual([{ id: "ix1", on: "inView", animation: "an_ix1", delay: 90 }]);
    expect(animationById(site, "an_ix1")).toMatchObject({ preset: "fade-up", duration: 650 });
    expect(n.style?.base).toEqual({ color: "red" });
    expect(n.props.marquee).toEqual({ duration: 20 });
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});
