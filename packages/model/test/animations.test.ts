import { describe, it, expect } from "vitest";
import { ANIMATION_PRESETS, animationTargetKind, animationUsages, applyOps, describeAnimation, keyframesOf, migrate, planAddAnimation, planDetachFromLibrary, planRemoveAnimation, planReveal, planSaveToLibrary, planUpdateAnimation, presetById, revealOf, runFromPreset, sampleSite, schema, staggerDelay, staggerRank, type Node, type Site } from "../src";
const siteSchema = schema.site;

const node = (site: Site, id: string): Node => { let out: Node | undefined; const dfs = (n: Node) => { if (n.id === id) out = n; n.children?.forEach(dfs); }; site.pages.forEach((p) => dfs(p.root)); return out!; };

describe("animations", () => {
  it("un préréglage donne un run complet, avec ses étapes en ligne", () => {
    const run = runFromPreset(presetById("float")!);
    expect(run.trigger).toBe("load"); expect(run.iterations).toBe("infinite");
    expect(keyframesOf(run, sampleSite)).toHaveLength(3);
    expect(ANIMATION_PRESETS.every((p) => p.keyframes.length >= 2 && p.keyframes[0]!.at === 0 && p.keyframes[p.keyframes.length - 1]!.at === 100)).toBe(true);
  });
  it("ajouter, modifier, retirer un run sur un nœud, sans toucher au style", () => {
    const n = node(sampleSite, "hero_h1");
    const run = runFromPreset(presetById("pulse")!);
    let { site } = applyOps(sampleSite, planAddAnimation(n, run));
    expect(node(site, "hero_h1").animations).toHaveLength(1);
    ({ site } = applyOps(site, planUpdateAnimation(node(site, "hero_h1"), run.id, { duration: 900, pauseOnHover: true })));
    expect(node(site, "hero_h1").animations![0]).toMatchObject({ duration: 900, pauseOnHover: true });
    expect(node(site, "hero_h1").style).toEqual(n.style);
    ({ site } = applyOps(site, planRemoveAnimation(node(site, "hero_h1"), run.id)));
    expect(node(site, "hero_h1").animations).toBeUndefined();
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
  it("une apparition est un run inView, remplacée sans doublon, et le style de base reste intact", () => {
    const n = node(sampleSite, "hero_p");
    let { site } = applyOps(sampleSite, planReveal(n, { kind: "fade-up", delay: 120 }));
    expect(revealOf(node(site, "hero_p"))?.options).toMatchObject({ kind: "fade-up", delay: 120, duration: 700 });
    expect(node(site, "hero_p").style?.base?.opacity).toBeUndefined();
    ({ site } = applyOps(site, planReveal(node(site, "hero_p"), { kind: "blur", repeat: true })));
    expect(node(site, "hero_p").animations).toHaveLength(1);
    expect(node(site, "hero_p").animations![0]).toMatchObject({ preset: "blur", once: false });
  });
  it("bibliothèque : enregistrer, retrouver les usages, détacher", () => {
    const n = node(sampleSite, "hero_h1");
    const run = runFromPreset(presetById("spin")!);
    let { site } = applyOps(sampleSite, planAddAnimation(n, run));
    ({ site } = applyOps(site, planSaveToLibrary(site, node(site, "hero_h1"), run.id, "Toupie")));
    expect(site.animations).toHaveLength(1);
    const def = site.animations![0]!;
    expect(node(site, "hero_h1").animations![0]!.animation).toBe(def.id);
    expect(animationUsages(site, def.id).map((u) => u.node.id)).toEqual(["hero_h1"]);
    expect(keyframesOf(node(site, "hero_h1").animations![0]!, site)).toHaveLength(2);
    expect(describeAnimation(node(site, "hero_h1").animations![0]!, site)).toContain("Toupie");
    ({ site } = applyOps(site, planDetachFromLibrary(site, node(site, "hero_h1"), run.id)));
    expect(typeof node(site, "hero_h1").animations![0]!.animation).toBe("object");
  });
  it("migration 1 → 2 : l'ancienne apparition devient une animation, le style de départ est retiré, marquee devient un objet", () => {
    const old = structuredClone(sampleSite) as unknown as Record<string, unknown> & { schemaVersion: number; pages: { root: Node }[] };
    old.schemaVersion = 1;
    const h1 = (function find(n: Node): Node | undefined { if (n.id === "hero_h1") return n; for (const c of n.children ?? []) { const f = find(c); if (f) return f; } return undefined; })(old.pages[0]!.root)!;
    h1.style = { base: { opacity: "0", transform: "translateY(28px)", color: "red" } };
    h1.interactions = [{ id: "ix1", trigger: { kind: "inView", options: { reveal: "fade-up", once: true } }, actions: [{ kind: "setStyle", target: { self: true }, style: { opacity: "1" }, transition: { duration: 650, delay: 90, easing: "ease-out" } }] }];
    h1.props = { ...h1.props, marquee: 20 };
    const site = migrate(old);
    const n = node(site, "hero_h1");
    expect(site.schemaVersion).toBe(2);
    expect(n.interactions).toBeUndefined();
    expect(n.animations![0]).toMatchObject({ id: "ix1", preset: "fade-up", trigger: "inView", duration: 650, delay: 90, easing: "ease-out", once: true });
    expect(n.style?.base).toEqual({ color: "red" });
    expect(n.props.marquee).toEqual({ duration: 20 });
    expect(siteSchema.safeParse(site).success).toBe(true);
  });
});

describe("animations : cible, découpage, décalage", () => {
  const base = () => runFromPreset(presetById("fade-up")!, { id: "run1" });
  it("le schéma accepte cible, découpage et décalage, et refuse les valeurs inconnues", () => {
    const withRun = (run: unknown) => ({ ...structuredClone(sampleSite), pages: [{ ...sampleSite.pages[0]!, root: { id: "root", type: "box", props: {}, children: [{ id: "txt", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "Bonjour" }] } }, animations: [run] }] } }] });
    expect(siteSchema.safeParse(withRun({ ...base(), target: { children: true }, stagger: { each: 80, from: "center" } })).success).toBe(true);
    expect(siteSchema.safeParse(withRun({ ...base(), target: { node: "hero_h1" } })).success).toBe(true);
    expect(siteSchema.safeParse(withRun({ ...base(), target: { selector: ".a" }, split: "letters" })).success).toBe(true);
    expect(siteSchema.safeParse(withRun({ ...base(), split: "chars" })).success).toBe(false);
    expect(siteSchema.safeParse(withRun({ ...base(), stagger: { each: 80, from: "middle" } })).success).toBe(false);
    expect(siteSchema.safeParse(withRun({ ...base(), target: { parent: true } })).success).toBe(false);
  });
  it("staggerRank : depuis le début, la fin, le centre", () => {
    expect([0, 1, 2, 3].map((i) => staggerRank(i, 4, "start"))).toEqual([0, 1, 2, 3]);
    expect([0, 1, 2, 3].map((i) => staggerRank(i, 4, "end"))).toEqual([3, 2, 1, 0]);
    expect([0, 1, 2, 3].map((i) => staggerRank(i, 4, "center"))).toEqual([1.5, 0.5, 0.5, 1.5]);
    expect([0, 1, 2].map((i) => staggerRank(i, 3, "center"))).toEqual([1, 0, 1]);
    expect(staggerRank(2, 5, undefined)).toBe(2);
  });
  it("staggerDelay ajoute le rang × each au délai, sans décalage il rend le délai", () => {
    expect(staggerDelay({ ...base(), delay: 100, stagger: { each: 50 } }, 3, 5)).toBe(250);
    expect(staggerDelay({ ...base(), delay: 100, stagger: { each: 50, from: "end" } }, 3, 5)).toBe(150);
    expect(staggerDelay({ ...base(), delay: 100 }, 3, 5)).toBe(100);
    expect(staggerDelay(base(), 3, 5)).toBe(0);
  });
  it("describeAnimation nomme la cible, le découpage et le décalage", () => {
    expect(describeAnimation({ ...base(), target: { children: true }, stagger: { each: 80 } }, sampleSite)).toContain("sur ses enfants · décalés de 80 ms");
    expect(describeAnimation({ ...base(), split: "letters", stagger: { each: 30, from: "center" } }, sampleSite)).toContain("lettre par lettre · décalées de 30 ms depuis le centre");
    expect(describeAnimation({ ...base(), split: "words" }, sampleSite)).toContain("mot par mot");
    expect(describeAnimation({ ...base(), target: { node: "hero_h1" } }, sampleSite)).toMatch(/sur « .+ »/);
    expect(describeAnimation({ ...base(), target: { selector: ".x" } }, sampleSite)).toContain("sur « .x »");
  });
  it("animationTargetKind : l'élément, ses enfants, ses morceaux, un autre élément, un sélecteur", () => {
    expect(animationTargetKind(base())).toBe("self");
    expect(animationTargetKind({ ...base(), target: { self: true } })).toBe("self");
    expect(animationTargetKind({ ...base(), target: { children: true } })).toBe("children");
    expect(animationTargetKind({ ...base(), split: "words" })).toBe("pieces");
    expect(animationTargetKind({ ...base(), split: "words", target: { children: true } })).toBe("pieces");
    expect(animationTargetKind({ ...base(), target: { node: "a" } })).toBe("node");
    expect(animationTargetKind({ ...base(), target: { selector: ".a" } })).toBe("selector");
  });
});
