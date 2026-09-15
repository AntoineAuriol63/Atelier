import { describe, it, expect } from "vitest";
import { applyOps, componentUsages, indexSite, instanceVariant, planDeleteComponent, planDetach, planMakeComponent, resolveVariantStyle, sampleSite, variantClasses, variantStylePath, type Node, type Site } from "../src";

let n = 0;
const ids = () => `t${++n}`;

describe("créer un composant", () => {
  it("remplace l'élément par une instance et ajoute la définition", () => {
    const index = indexSite(sampleSite);
    const plan = planMakeComponent(sampleSite, index.get("hero")!, "Héros", ids);
    expect(plan.ok).toBe(true);
    if (!plan.ok) return;
    const { site } = applyOps(sampleSite, plan.ops);
    const cmp = site.components.find((c) => c.name === "Héros")!;
    expect(cmp.root.id).toBe("hero");
    const after = indexSite(site);
    expect(after.get("hero")!.owner).toEqual({ component: cmp.id });
    const inst = after.get(plan.select!)!.node;
    expect(inst.type).toBe("instance");
    expect(inst.props.component).toBe(cmp.id);
    expect(componentUsages(site, cmp.id)).toHaveLength(1);
  });
  it("refuse la racine et une instance", () => {
    const index = indexSite(sampleSite);
    expect(planMakeComponent(sampleSite, index.get("home")!, "X").ok).toBe(false);
    expect(planMakeComponent(sampleSite, index.get("home_hdr")!, "X").ok).toBe(false);
  });
});

describe("détacher une instance", () => {
  it("remplace l'instance par une copie aux identifiants neufs, propriétés résolues", () => {
    const cmpId = "cmp_t";
    const site: Site = {
      ...sampleSite,
      components: [{ id: cmpId, name: "Carte", scope: "site", props: [{ name: "title", label: { fr: "Titre" }, type: "text", default: "Par défaut" }], variants: [{ name: "style", values: ["clair", "sombre"], default: "clair" }], variantStyles: { "style:sombre": { c_root: { base: { background: "#222" } }, c_t: { base: { color: "white" }, breakpoints: { mobile: { fontSize: "1rem" } } } } }, root: { id: "c_root", type: "box", props: { tag: "div" }, children: [{ id: "c_t", type: "text", props: { tag: "h3", content: { fr: [{ t: "text", v: "x" }] } }, bindings: { content: { source: "prop", path: "title" } } }, { id: "c_s", type: "slot", props: { name: "default" }, children: [] }] } }],
      pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box", props: { tag: "div" }, children: [{ id: "i1", type: "instance", props: { component: cmpId, variant: { style: "sombre" }, values: { title: "Bonjour" }, slots: { default: [{ id: "s1", type: "text", props: { tag: "p", content: { fr: [{ t: "text", v: "dans le slot" }] } } }] } } }] } }],
    };
    const plan = planDetach(site, indexSite(site).get("i1")!, ids);
    expect(plan.ok).toBe(true);
    if (!plan.ok) return;
    const { site: after } = applyOps(site, plan.ops);
    const root = after.pages[0]!.root.children![0]! as Node;
    expect(root.type).toBe("box");
    expect(root.id).not.toBe("c_root");
    const [title, slotted] = root.children!;
    expect(title!.bindings).toBeUndefined();
    expect(root.style?.base?.background).toBe("#222");
    expect(title!.style?.base?.color).toBe("white");
    expect(title!.style?.breakpoints?.mobile?.fontSize).toBe("1rem");
    expect(title!.props.content).toEqual({ fr: [{ t: "text", v: "Bonjour" }] });
    expect(slotted!.type).toBe("text");
    expect((slotted!.props.content as { fr: { v: string }[] }).fr[0]!.v).toBe("dans le slot");
    expect(after.components).toHaveLength(1);
    expect(planDeleteComponent(after, cmpId).ok).toBe(true);
  });
  it("une instance qui apparaît ou qui est visée par une piste : la copie reprend ses déclencheurs et les pistes qui la visaient", () => {
    const cmpId = "cmp_a";
    const anims = [
      { id: "an_own", name: "Fondu", preset: "fade", duration: 700, tracks: [{ id: "tk_o", target: { trigger: true as const }, keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 700, style: { opacity: "1" } }] }] },
      { id: "an_seq", name: "Suite", duration: 1400, tracks: [{ id: "tk_h", target: { trigger: true as const }, keyframes: [{ at: 0, style: { opacity: "0" } }, { at: 700, style: { opacity: "1" } }] }, { id: "tk_i", target: { node: "i2" }, start: { after: "tk_h" }, keyframes: [{ at: 700, style: { opacity: "0" } }, { at: 1400, style: { opacity: "1" } }] }] },
    ];
    const site: Site = {
      ...sampleSite, animations: anims,
      components: [{ id: cmpId, name: "Chiffre", scope: "site", props: [], root: { id: "k_root", type: "box", props: { tag: "div" }, children: [] } }],
      pages: [{ ...sampleSite.pages[0]!, root: { id: "r", type: "box", props: { tag: "div" }, children: [{ id: "hst", type: "box", props: {}, triggers: [{ id: "tr_s", on: "inView", animation: "an_seq" }] }, { id: "i1", type: "instance", props: { component: cmpId }, triggers: [{ id: "tr_o", on: "inView", animation: "an_own" }] }, { id: "i2", type: "instance", props: { component: cmpId } }] } }],
    };
    let after = site;
    for (const id of ["i1", "i2"]) { const plan = planDetach(after, indexSite(after).get(id)!, ids); expect(plan.ok).toBe(true); if (plan.ok) after = applyOps(after, plan.ops).site; }
    const [, c1, c2] = after.pages[0]!.root.children!;
    expect(c1!.triggers).toEqual([{ id: "tr_o", on: "inView", animation: "an_own" }]);
    expect(after.animations.find((a) => a.id === "an_seq")!.tracks[1]!.target).toEqual({ node: c2!.id });
    expect(JSON.stringify(after.animations)).not.toContain('"i2"');
    expect(planDeleteComponent(site, cmpId).ok).toBe(false);
  });
});

describe("variantes", () => {
  const cmp = { id: "c", name: "Bouton", scope: "site" as const, props: [], variants: [{ name: "style", values: ["primaire", "secondaire"], default: "primaire" }], root: { id: "b", type: "link" as const, props: {}, style: { base: { color: "red" } } }, variantStyles: { "style:secondaire": { b: { base: { color: "blue" }, breakpoints: { mobile: { color: "green" } } } } } };
  it("résout la valeur de chaque axe et les classes", () => {
    expect(instanceVariant(cmp, { id: "i", type: "instance", props: { component: "c" } })).toEqual({ style: "primaire" });
    expect(instanceVariant(cmp, { id: "i", type: "instance", props: { component: "c", variant: { style: "secondaire" } } })).toEqual({ style: "secondaire" });
    expect(instanceVariant(cmp, { id: "i", type: "instance", props: { component: "c", variant: { style: "inconnu" } } })).toEqual({ style: "primaire" });
    expect(variantClasses(cmp, { id: "i", type: "instance", props: { component: "c", variant: { style: "secondaire" } } })).toBe("v-style-secondaire");
  });
  it("résout le style sous une variante, normal hérité et variante locale", () => {
    const site: Site = { ...sampleSite, components: [cmp] };
    const r = resolveVariantStyle(site, cmp.root, cmp.variantStyles["style:secondaire"]!.b, "base");
    expect(r.color).toEqual({ value: "blue", source: { kind: "local" } });
    const m = resolveVariantStyle(site, cmp.root, cmp.variantStyles["style:secondaire"]!.b, "mobile");
    expect(m.color!.value).toBe("green");
    const none = resolveVariantStyle(site, cmp.root, undefined, "base");
    expect(none.color).toEqual({ value: "red", source: { kind: "inherited", breakpoint: "base" } });
  });
  it("donne le chemin d'écriture", () => {
    const site: Site = { ...sampleSite, components: [cmp] };
    expect(variantStylePath(site, "c", "style:secondaire", "b", "base", "color")).toBe("components.0.variantStyles.style:secondaire.b.base.color");
    expect(variantStylePath(site, "c", "style:secondaire", "b", "mobile", "color", "hover")).toBe("components.0.variantStyles.style:secondaire.b.stateBreakpoints.hover.mobile.color");
  });
});
