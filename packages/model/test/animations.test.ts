import { describe, it, expect } from "vitest";
import { ANIMATION_PRESETS, BASE, animationById, animationFromPreset, animationUsages, applyOps, describeAnimation, describeTrigger, easingCss, isPresetIntact, keyframeAt, keyframeStyleAt, migrate, parseSpring, planAddPageTrigger, planAddTrack, planAddTrigger, planApplyPreset, planRemoveAnimation, planRemoveKeyframe, planRemoveKeyframes, planRemovePageTriggerWithAnimation, planRemoveTrack, planQuickAnimation, planQuickDetail, planRemoveTrigger, planRemoveTriggerWithAnimation, planSetKeyframe, planSetKeyframeEasing, planShiftKeyframes, planUnsetKeyframeProp, planUpdateAnimation, planUpdatePageTrigger, planUpdateTrack, planUpdateTrigger, presetById, quickAnimation, resolveTrackTarget, sampleSite, schema, shiftDelta, springDuration, springEasing, springSamples, staggerDelay, staggerRank, trackSpan, trackTargetFor, withTargetKind, type Animation, type Node, type Site, type Trigger } from "../src";
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

describe("animations : édition dans le mode Animation", () => {
  const box: Node = { id: "kb", type: "box", props: {}, style: { base: { opacity: "0.9", color: "red" } } };
  const withTrack = (keyframes: Animation["tracks"][number]["keyframes"], extra: Partial<Animation["tracks"][number]> = {}): Site => ({ ...sampleSite, animations: [anim("an_e", [{ id: "tk_e", target: { trigger: true }, keyframes, ...extra }, { id: "tk_e2", target: { node: "hero_p" }, keyframes: [{ at: 0, style: {} }, { at: 400, style: { opacity: "0" } }] }])] });
  const track = (site: Site, id = "tk_e") => animationById(site, "an_e")!.tracks.find((t) => t.id === id)!;

  it("état d'un élément à un instant : l'image-clé posée là, sinon la précédente qui règle la propriété, sinon le repos", () => {
    const t = track(withTrack([{ at: 0, style: {} }, { at: 300, style: { opacity: "0.2", transform: "scale(1.1)" } }, { at: 600, style: { opacity: "1" } }]));
    const at300 = keyframeStyleAt(sampleSite, box, BASE, t, 300);
    expect(at300.opacity).toEqual({ value: "0.2", source: { kind: "keyframe", at: 300, exact: true } });
    expect(at300.color).toEqual({ value: "red", source: { kind: "rest", of: { kind: "local" } } });
    const at450 = keyframeStyleAt(sampleSite, box, BASE, t, 450);
    expect(at450.opacity).toEqual({ value: "0.2", source: { kind: "keyframe", at: 300, exact: false } });
    expect(at450.transform).toEqual({ value: "scale(1.1)", source: { kind: "keyframe", at: 300, exact: false } });
    expect(keyframeStyleAt(sampleSite, box, BASE, t, 100).opacity).toEqual({ value: "0.9", source: { kind: "rest", of: { kind: "local" } } });
    // Avant la portée, l'élément montre la première image (remplissage both).
    const late = track(withTrack([{ at: 200, style: { opacity: "0" } }, { at: 600, style: { opacity: "1" } }]));
    expect(keyframeStyleAt(sampleSite, box, BASE, late, 50).opacity).toEqual({ value: "0", source: { kind: "keyframe", at: 200, exact: false } });
  });

  it("retirer une propriété d'une image-clé ; changer la courbe d'un segment (ou revenir à la courbe par défaut)", () => {
    let site = withTrack([{ at: 0, style: {} }, { at: 300, style: { opacity: "0.2", transform: "scale(1.1)" }, easing: "ease-in" }]);
    ({ site } = applyOps(site, planUnsetKeyframeProp(site, "an_e", "tk_e", 300, "opacity")));
    expect(keyframeAt(track(site), 300)).toEqual({ at: 300, style: { transform: "scale(1.1)" }, easing: "ease-in" });
    ({ site } = applyOps(site, planSetKeyframeEasing(site, "an_e", "tk_e", 300, "spring(170, 26)")));
    expect(keyframeAt(track(site), 300)!.easing).toBe("spring(170, 26)");
    ({ site } = applyOps(site, planSetKeyframeEasing(site, "an_e", "tk_e", 300, undefined)));
    expect(keyframeAt(track(site), 300)).toEqual({ at: 300, style: { transform: "scale(1.1)" } });
    expect(planUnsetKeyframeProp(site, "an_e", "tk_e", 999, "opacity")).toEqual([]);
    ({ site } = applyOps(site, planRemoveKeyframes(site, "an_e", [{ track: "tk_e", at: 300 }, { track: "tk_e2", at: 400 }, { track: "tk_e", at: 0 }])));
    expect(track(site).keyframes).toEqual([]);
    expect(track(site, "tk_e2").keyframes.map((k) => k.at)).toEqual([0]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });

  it("déplacer des images-clés en groupe, jamais avant 0, en écrasant ce qui était à l'arrivée ; ⌥ duplique", () => {
    let site = withTrack([{ at: 0, style: {} }, { at: 300, style: { opacity: "0.2" } }, { at: 600, style: { opacity: "1" } }]);
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_e", [{ track: "tk_e", at: 300 }, { track: "tk_e2", at: 400 }], 300)));
    expect(track(site).keyframes).toEqual([{ at: 0, style: {} }, { at: 600, style: { opacity: "0.2" } }]);
    expect(track(site, "tk_e2").keyframes.map((k) => k.at)).toEqual([0, 700]);
    expect(animationById(site, "an_e")!.duration).toBe(1000);
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_e", [{ track: "tk_e2", at: 700 }], -900)));
    expect(track(site, "tk_e2").keyframes).toEqual([{ at: 0, style: { opacity: "0" } }]);
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_e", [{ track: "tk_e", at: 600 }], 200, { duplicate: true })));
    expect(track(site).keyframes.map((k) => k.at)).toEqual([0, 600, 800]);
    expect(keyframeAt(track(site), 800)!.style).toEqual({ opacity: "0.2" });
    expect(shiftDelta([{ at: 100 }, { at: 400 }], -250)).toBe(-100);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });

  it("régler une piste : cible (élément, enfants, mots, lettres) et décalage, sans perdre l'élément visé", () => {
    let site = withTrack([{ at: 0, style: {} }, { at: 300, style: { opacity: "1" } }]);
    expect(withTargetKind({ trigger: true }, "letters")).toEqual({ trigger: true, split: "letters" });
    expect(withTargetKind({ node: "hero_p", split: "words" }, "children")).toEqual({ node: "hero_p", children: true });
    expect(withTargetKind({ node: "hero_p", children: true }, "element")).toEqual({ node: "hero_p" });
    expect(withTargetKind({ selector: ".x" }, "children")).toEqual({ selector: ".x" });
    ({ site } = applyOps(site, planUpdateTrack(site, "an_e", "tk_e", { target: withTargetKind(track(site).target, "children"), stagger: { each: 80, from: "center" } })));
    expect(track(site)).toMatchObject({ target: { trigger: true, children: true }, stagger: { each: 80, from: "center" } });
    ({ site } = applyOps(site, planUpdateTrack(site, "an_e", "tk_e", { stagger: undefined })));
    expect("stagger" in track(site)).toBe(false);
    expect(trackTargetFor("host", "host")).toEqual({ trigger: true });
    expect(trackTargetFor("host", "other")).toEqual({ node: "other" });
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("animations : choix rapides (préréglages en un geste)", () => {
  const card: Node = { id: "qk_card", type: "box", props: {}, children: [{ id: "qk_a", type: "box", props: {} }, { id: "qk_b", type: "box", props: {} }] };
  const title: Node = { id: "qk_title", type: "text", props: { tag: "h2", content: { fr: [{ t: "text", v: "Bonjour" }] } } };
  const base: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "qk_root", type: "box", props: {}, children: [card, title] } }] };
  const find = (site: Site, id: string) => node(site, id);

  it("un préréglage intact est reconnu, même mis à l'échelle ; retouché à la main, il devient personnalisé", () => {
    const a = animationFromPreset(presetById("fade-up")!, { duration: 1400 });
    expect(isPresetIntact(a)).toBe(true);
    expect(isPresetIntact({ ...a, tracks: [{ ...a.tracks[0]!, target: { trigger: true, split: "letters" }, stagger: { each: 30 } }] })).toBe(true);
    expect(isPresetIntact({ ...a, tracks: [{ ...a.tracks[0]!, keyframes: [a.tracks[0]!.keyframes[0]!, { ...a.tracks[0]!.keyframes[1]!, style: { opacity: "0.5" } }] }] })).toBe(false);
    expect(isPresetIntact({ ...a, tracks: [...a.tracks, { ...a.tracks[0]!, id: "tk_other" }] })).toBe(false);
    expect(isPresetIntact({ ...a, loop: "infinite" })).toBe(false);
    expect(isPresetIntact({ ...a, preset: undefined })).toBe(false);
  });

  it("poser, remplacer et retirer un choix rapide par famille, en gardant le détail et le délai", () => {
    let site = base;
    ({ site } = applyOps(site, planQuickAnimation(site, find(site, "qk_title"), "Apparition", "fade-up")));
    let q = quickAnimation(site, find(site, "qk_title"), "Apparition")!;
    expect(q).toMatchObject({ preset: { id: "fade-up" }, intact: true, detail: "one" });
    ({ site } = applyOps(site, planQuickDetail(site, find(site, "qk_title"), "Apparition", "letters")));
    ({ site } = applyOps(site, planUpdateTrigger(find(site, "qk_title"), quickAnimation(site, find(site, "qk_title"), "Apparition")!.trigger.id, { delay: 150 })));
    ({ site } = applyOps(site, planQuickAnimation(site, find(site, "qk_title"), "Apparition", "zoom")));
    q = quickAnimation(site, find(site, "qk_title"), "Apparition")!;
    expect(q).toMatchObject({ preset: { id: "zoom" }, detail: "letters", trigger: { delay: 150 } });
    expect(animationById(site, q.trigger.animation)!.tracks[0]).toMatchObject({ target: { trigger: true, split: "letters" }, stagger: { each: 30 } });
    ({ site } = applyOps(site, planQuickAnimation(site, find(site, "qk_title"), "Survol", "grow")));
    expect(find(site, "qk_title").triggers).toHaveLength(2);
    expect(site.animations).toHaveLength(2);
    ({ site } = applyOps(site, planQuickAnimation(site, find(site, "qk_title"), "Apparition", "")));
    expect(find(site, "qk_title").triggers!.map((t) => t.on)).toEqual(["hover"]);
    expect(site.animations).toHaveLength(1);
    expect(quickAnimation(site, find(site, "qk_title"), "Apparition")).toBeUndefined();
    expect(siteSchema.safeParse(site).success).toBe(true);
  });

  it("les enfants un à un pour une boîte ; retirer un déclencheur retire aussi son animation si plus rien ne la lance", () => {
    let site = base;
    ({ site } = applyOps(site, planQuickAnimation(site, find(site, "qk_card"), "Apparition", "fade")));
    ({ site } = applyOps(site, planQuickDetail(site, find(site, "qk_card"), "Apparition", "children")));
    const q = quickAnimation(site, find(site, "qk_card"), "Apparition")!;
    expect(q.detail).toBe("children");
    expect(animationById(site, q.trigger.animation)!.tracks[0]).toMatchObject({ target: { trigger: true, children: true }, stagger: { each: 100 } });
    ({ site } = applyOps(site, planAddTrigger(find(site, "qk_title"), { id: "tr_share", on: "load", animation: q.trigger.animation })));
    ({ site } = applyOps(site, planRemoveTriggerWithAnimation(site, find(site, "qk_card"), q.trigger.id)));
    expect(site.animations).toHaveLength(1);
    ({ site } = applyOps(site, planRemoveTriggerWithAnimation(site, find(site, "qk_title"), "tr_share")));
    expect(site.animations).toHaveLength(0);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("animations : déclencheurs de page", () => {
  it("ajouter, régler et retirer un déclencheur de page ; son animation part avec lui si plus rien ne la lance", () => {
    const a = animationFromPreset(presetById("fade")!, { id: "an_page" });
    let site: Site = { ...sampleSite, animations: [a] };
    const pageId = site.pages[0]!.id;
    ({ site } = applyOps(site, planAddPageTrigger(site, pageId, { id: "pg_tr", on: "scroll", animation: "an_page" })));
    expect(site.pages[0]!.triggers).toEqual([{ id: "pg_tr", on: "scroll", animation: "an_page" }]);
    expect(animationUsages(site, "an_page").map((u) => u.page?.id)).toEqual([pageId]);
    ({ site } = applyOps(site, planUpdatePageTrigger(site, pageId, "pg_tr", { range: [0.2, 0.8] })));
    expect(site.pages[0]!.triggers![0]).toMatchObject({ range: [0.2, 0.8] });
    ({ site } = applyOps(site, planRemovePageTriggerWithAnimation(site, pageId, "pg_tr")));
    expect(site.pages[0]!.triggers).toBeUndefined();
    expect(site.animations).toEqual([]);
    expect(planUpdatePageTrigger(site, "inconnue", "pg_tr", {})).toEqual([]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});
