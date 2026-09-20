import { describe, it, expect } from "vitest";
import { newId, cloneWithNewIds, planDuplicateTrack, ANIMATION_PRESETS, BASE, QUICK_SPEEDS, animationLength, layoutTracks, planMoveKeyframe, planAnimateElement, animationById, animationFromPreset, animationUsages, applyOps, describeAnimation, describeTrigger, duplicateQuickTriggers, easingCss, isPresetIntact, keyframeAt, keyframeStyleAt, migrate, parseSpring, planAddPageTrigger, planFillTrackFromPreset, planAddTrack, planAddTrigger, planApplyPreset, planRemoveAnimation, planRemoveKeyframe, planRemoveKeyframes, planRemovePageTriggerWithAnimation, planRemoveTrack, planQuickAnimation, planQuickDetail, planRemoveTrigger, planRemoveTriggerWithAnimation, planScaleAnimation, planQuickSpeed, planSetKeyframe, planSetKeyframeEasing, planShiftKeyframes, planUnsetKeyframeProp, planUpdateAnimation, planUpdatePageTrigger, planUpdateTrack, planUpdateTrigger, presetById, quickAnimation, quickSpeed, resolveTrackTarget, sampleSite, schema, shiftDelta, springDuration, springEasing, springSamples, staggerDelay, staggerRank, trackSpan, trackTargetFor, withTargetKind, type Animation, type Node, type Site, type Trigger } from "../src";
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
    expect(describeTrigger({ id: "x", on: "hover", animation: "an_d", reverseOnLeave: true }, site)).toBe("Quand la souris passe dessus · Arrivée du héros · revient au départ de la souris");
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

describe("animations : suites de l'audit d'usage", () => {
  it("remplir une piste avec un préréglage : ses images-clés posées à partir du départ de la piste, la durée suit", () => {
    const a = anim("an_fill", [{ id: "tk_fill", target: { node: "hero_p" }, keyframes: [{ at: 150, style: {} }] }], { duration: 600 });
    let site: Site = { ...sampleSite, animations: [a] };
    ({ site } = applyOps(site, planFillTrackFromPreset(site, "an_fill", "tk_fill", presetById("fade-up")!)));
    const t = animationById(site, "an_fill")!.tracks[0]!;
    expect(t.keyframes).toEqual([{ at: 150, style: { opacity: "0", transform: "translateY(28px)" } }, { at: 850, style: { opacity: "1", transform: "none", filter: "none" }, easing: "cubic-bezier(.22,1,.36,1)" }]);
    expect(t.target).toEqual({ node: "hero_p" });
    expect(animationById(site, "an_fill")!.duration).toBe(850);
    expect(planFillTrackFromPreset(site, "an_fill", "inconnue", presetById("zoom")!)).toEqual([]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("repère un deuxième choix rapide de la même famille sur un élément (posé par une autre voie)", () => {
    const a1 = animationFromPreset(presetById("fade")!, { id: "an_d1" });
    const a2 = animationFromPreset(presetById("zoom")!, { id: "an_d2" });
    const a3 = animationFromPreset(presetById("grow")!, { id: "an_d3" });
    const n: Node = { id: "dup_n", type: "box", props: {}, triggers: [{ id: "tr_d1", on: "inView", animation: "an_d1" }, { id: "tr_d3", on: "hover", animation: "an_d3" }, { id: "tr_d2", on: "inView", animation: "an_d2" }] };
    const site: Site = { ...sampleSite, animations: [a1, a2, a3] };
    expect([...duplicateQuickTriggers(site, n)]).toEqual(["tr_d2"]);
    expect(duplicateQuickTriggers(site, { ...n, triggers: n.triggers!.slice(0, 2) }).size).toBe(0);
  });
});

describe("animations : la durée est la vitesse (audit n°5 · R1)", () => {
  it("changer la durée met toute l'animation à l'échelle : images-clés, décalages ; le délai du déclencheur ne bouge pas", () => {
    const a = anim("an_sc", [
      { id: "tk_sc1", target: { trigger: true }, keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 400, style: { opacity: "1" } }] },
      { id: "tk_sc2", target: { node: "hero_p", children: true }, stagger: { each: 80 }, keyframes: [{ at: 200, style: {} }, { at: 800, style: { opacity: "1" }, easing: "ease-out" }] },
    ], { duration: 800 });
    let site: Site = { ...sampleSite, animations: [a] };
    ({ site } = applyOps(site, planScaleAnimation(site, "an_sc", 1600)));
    const b = animationById(site, "an_sc")!;
    expect(b.duration).toBe(1600);
    expect(b.tracks[0]!.keyframes.map((k) => k.at)).toEqual([0, 800]);
    expect(b.tracks[1]!.keyframes).toEqual([{ at: 400, style: {} }, { at: 1600, style: { opacity: "1" }, easing: "ease-out" }]);
    expect(b.tracks[1]!.stagger).toEqual({ each: 160 });
    // Une ligne de temps plus longue que ses pistes : l'échelle part de sa longueur réelle.
    ({ site } = applyOps(site, planScaleAnimation(site, "an_sc", 800)));
    expect(animationById(site, "an_sc")!.tracks[1]!.keyframes.map((k) => k.at)).toEqual([200, 800]);
    // Sans piste, la durée est seulement la longueur de la ligne de temps.
    const empty = { ...sampleSite, animations: [anim("an_empty", [], { duration: 1000 })] };
    expect(animationById(applyOps(empty, planScaleAnimation(empty, "an_empty", 2000)).site, "an_empty")!.duration).toBe(2000);
    expect(planScaleAnimation(site, "an_sc", 0)).toEqual([]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });

  it("vitesse d'un choix rapide : rapide, normale, lente, par rapport à la durée du préréglage, sans le rendre « personnalisé »", () => {
    const title: Node = { id: "sp_title", type: "text", props: { tag: "h2", content: { fr: [{ t: "text", v: "Titre" }] } } };
    let site: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "sp_root", type: "box", props: {}, children: [title] } }] };
    ({ site } = applyOps(site, planQuickAnimation(site, node(site, "sp_title"), "Apparition", "fade-up")));
    expect(quickSpeed(quickAnimation(site, node(site, "sp_title"), "Apparition")!)).toBe("normal");
    ({ site } = applyOps(site, planQuickSpeed(site, node(site, "sp_title"), "Apparition", "slow")));
    const q = quickAnimation(site, node(site, "sp_title"), "Apparition")!;
    expect(quickSpeed(q)).toBe("slow");
    expect(q.intact).toBe(true);
    expect(animationLength(q.animation)).toBe(Math.round(700 * QUICK_SPEEDS.slow));
    ({ site } = applyOps(site, planQuickSpeed(site, node(site, "sp_title"), "Apparition", "fast")));
    expect(quickSpeed(quickAnimation(site, node(site, "sp_title"), "Apparition")!)).toBe("fast");
    // Changer de préréglage garde la vitesse choisie.
    ({ site } = applyOps(site, planQuickAnimation(site, node(site, "sp_title"), "Apparition", "zoom")));
    expect(quickSpeed(quickAnimation(site, node(site, "sp_title"), "Apparition")!)).toBe("fast");
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("animations : pistes enchaînées (start)", () => {
  const kf = (a: number, b: number) => [{ at: a, style: { opacity: "0" } }, { at: b, style: { opacity: "1" } }];
  const t = (id: string, from: number, to: number, start?: Animation["tracks"][number]["start"]): Animation["tracks"][number] => ({ id, target: { node: `hero_${id}` }, keyframes: kf(from, to), ...(start ? { start } : {}) });
  const at = (site: Site, id: string) => { const tr = animationById(site, "an_ch")!.tracks.find((x) => x.id === id)!; return [trackSpan(tr).start, trackSpan(tr).end]; };
  const make = (tracks: Animation["tracks"], duration = 3000): Site => ({ ...sampleSite, animations: [anim("an_ch", tracks, { duration })] });

  it("une piste « after » part à la fin de sa référence, « with » à son départ, plus l'écart ; référence absente ou cycle : ses temps restent", () => {
    const site = make([t("tk_a", 0, 700), t("tk_b", 0, 700, { after: "tk_a", gap: 100 }), t("tk_c", 0, 500, { with: "tk_b" }), t("tk_d", 50, 450, { after: "tk_zz" }), t("tk_e", 10, 20, { after: "tk_f" }), t("tk_f", 30, 40, { after: "tk_e" })]);
    const laid = layoutTracks(site, animationById(site, "an_ch")!);
    expect(laid.map((x) => [x.id, trackSpan(x).start, trackSpan(x).end])).toEqual([["tk_a", 0, 700], ["tk_b", 800, 1500], ["tk_c", 800, 1300], ["tk_d", 50, 450], ["tk_e", 10, 20], ["tk_f", 30, 40]]);
    expect(siteSchema.safeParse(site).success).toBe(true);
    expect(siteSchema.safeParse(make([t("tk_a", 0, 700), { ...t("tk_b", 0, 700), start: { before: "tk_a" } as never }])).success).toBe(false);
  });
  it("modifier la référence replace ce qui la suit ; déplacer à la main une piste enchaînée change son écart, pas quand sa référence bouge avec elle", () => {
    let site = make([t("tk_a", 0, 700), t("tk_b", 700, 1400, { after: "tk_a" }), t("tk_c", 1400, 2100, { after: "tk_b" })]);
    ({ site } = applyOps(site, planMoveKeyframe(site, "an_ch", "tk_a", 700, 1000)));
    expect([at(site, "tk_b"), at(site, "tk_c")]).toEqual([[1000, 1700], [1700, 2400]]);
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_ch", [{ track: "tk_b", at: 1000 }, { track: "tk_b", at: 1700 }], 200)));
    expect(animationById(site, "an_ch")!.tracks[1]!.start).toEqual({ after: "tk_a", gap: 200 });
    expect([at(site, "tk_b"), at(site, "tk_c")]).toEqual([[1200, 1900], [1900, 2600]]);
    // La référence et la piste qui la suit, déplacées ensemble : l'écart ne change pas.
    const all = animationById(site, "an_ch")!.tracks.slice(0, 2).flatMap((x) => x.keyframes.map((k) => ({ track: x.id, at: k.at })));
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_ch", all, 100)));
    expect(animationById(site, "an_ch")!.tracks[1]!.start).toEqual({ after: "tk_a", gap: 200 });
    expect([at(site, "tk_a"), at(site, "tk_b"), at(site, "tk_c")]).toEqual([[100, 1100], [1300, 2000], [2000, 2700]]);
    // Avancer la piste avant sa référence : l'écart ne descend pas sous 0.
    ({ site } = applyOps(site, planShiftKeyframes(site, "an_ch", [{ track: "tk_c", at: 2000 }, { track: "tk_c", at: 2700 }], -1500)));
    expect(animationById(site, "an_ch")!.tracks[2]!.start).toEqual({ after: "tk_b" });
    expect(at(site, "tk_c")).toEqual([2000, 2700]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("changer la durée met les écarts à l'échelle ; retirer une piste : celles qui la suivaient prennent son départ, avec leur écart", () => {
    let site = make([t("tk_a", 0, 700), t("tk_b", 800, 1500, { after: "tk_a", gap: 100 }), t("tk_c", 1500, 2200, { after: "tk_b" }), t("tk_d", 850, 1350, { with: "tk_b", gap: 50 })], 2200);
    ({ site } = applyOps(site, planScaleAnimation(site, "an_ch", 4400)));
    expect(animationById(site, "an_ch")!.tracks[1]!.start).toEqual({ after: "tk_a", gap: 200 });
    expect(at(site, "tk_c")).toEqual([3000, 4400]);
    ({ site } = applyOps(site, planScaleAnimation(site, "an_ch", 2200)));
    ({ site } = applyOps(site, planRemoveTrack(site, "an_ch", "tk_b")));
    const tracks = animationById(site, "an_ch")!.tracks;
    expect(tracks.map((x) => [x.id, x.start])).toEqual([["tk_a", undefined], ["tk_c", { after: "tk_a" }], ["tk_d", { after: "tk_a", gap: 50 }]]);
    expect([at(site, "tk_c"), at(site, "tk_d")]).toEqual([[700, 1400], [750, 1250]]);
    // La référence de tête retirée : la suite repart de son départ.
    ({ site } = applyOps(site, planRemoveTrack(site, "an_ch", "tk_a")));
    expect(animationById(site, "an_ch")!.tracks.map((x) => [x.id, x.start, trackSpan(x).start])).toEqual([["tk_c", undefined, 0], ["tk_d", undefined, 50]]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("animations : animer un élément d'un geste (audit n°5 · R3)", () => {
  it("« Animer cet élément » : un déclencheur à l'entrée dans l'écran, une animation nommée d'après lui, et sa propre piste prête à régler", () => {
    const title: Node = { id: "ae_title", type: "text", props: { tag: "h2", content: { fr: [{ t: "text", v: "Titre" }] } } };
    let site: Site = { ...sampleSite, animations: [], pages: [{ ...sampleSite.pages[0]!, root: { id: "ae_root", type: "box", props: {}, children: [title] } }] };
    const plan = planAnimateElement(site, node(site, "ae_title"), { name: "Animation · Titre", animationId: "an_ae", triggerId: "tr_ae", trackId: "tk_ae" });
    ({ site } = applyOps(site, plan));
    expect(node(site, "ae_title").triggers).toEqual([{ id: "tr_ae", on: "inView", animation: "an_ae" }]);
    expect(animationById(site, "an_ae")).toEqual({ id: "an_ae", name: "Animation · Titre", duration: 1000, tracks: [{ id: "tk_ae", target: { trigger: true }, keyframes: [{ at: 0, style: {} }] }] });
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("copie d'un élément qui lance des animations", () => {
  it("la copie reçoit de nouveaux identifiants de déclencheur et lance les mêmes animations", () => {
    const original: Node = { id: "orig", type: "box", props: {}, triggers: [{ id: "trX", on: "inView", animation: "an_1" }], children: [{ id: "kid", type: "box", props: {}, triggers: [{ id: "trY", on: "hover", animation: "an_2" }] }] };
    const { node: copy } = cloneWithNewIds(original, newId);
    expect(copy.triggers![0]!.id).not.toBe("trX");
    expect(copy.triggers![0]!.animation).toBe("an_1");
    expect(copy.children![0]!.triggers![0]!.id).not.toBe("trY");
    expect(copy.children![0]!.triggers![0]!.animation).toBe("an_2");
    expect(original.triggers![0]!.id).toBe("trX");
  });
});

describe("dupliquer une piste pour un autre élément", () => {
  it("la copie garde images-clés, décalage et courbes, vise l'autre élément et part après la piste d'origine", () => {
    const src: Animation["tracks"][number] = { id: "t_src", target: { trigger: true }, stagger: { each: 30 }, keyframes: [{ at: 100, style: { opacity: "0" } }, { at: 600, style: { opacity: "1" }, easing: "ease-out" }] };
    let site: Site = { ...sampleSite, animations: [anim("an_d", [src], { duration: 600 })] };
    site = { ...site, pages: site.pages.map((p, i) => (i ? p : { ...p, root: { ...p.root, triggers: [{ id: "tr_d", on: "load", animation: "an_d" }] } })) };
    ({ site } = applyOps(site, planDuplicateTrack(site, "an_d", "t_src", "hero_p", { trackId: "t_copy" })));
    const a = animationById(site, "an_d")!;
    expect(a.tracks).toHaveLength(2);
    const copy = a.tracks[1]!;
    expect(copy).toMatchObject({ id: "t_copy", target: { node: "hero_p" }, stagger: { each: 30 }, start: { after: "t_src" } });
    expect(copy.keyframes.map((k) => k.at)).toEqual([600, 1100]);
    expect(copy.keyframes[1]!.easing).toBe("ease-out");
    expect(a.duration).toBe(1100);
    expect(planDuplicateTrack(site, "an_d", "nope", "hero_p")).toEqual([]);
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});
