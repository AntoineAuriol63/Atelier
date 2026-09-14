import { describe, it, expect } from "vitest";
import type { Animation, Keyframe, Node, Site } from "@atelier/model";
import { sampleSite } from "@atelier/model";
import { animatedNodes, animationLabel, canAddTrack, openTrigger, summarizeAnimation, formatMs, tickLabel, nextAnimationName, nextZoom, rulerTicks, snapTime, targetKindOf, targetKindOptions, trackLabel, triggerHosts, validOpenTimeline } from "../src/lib/timeline";

const text = (id: string, name?: string): Node => ({ id, type: "text", name, props: { tag: "p", content: { fr: [{ t: "text", v: id }] } } });
const root: Node = { id: "root", type: "box", props: {}, children: [{ id: "card", type: "box", name: "Carte", props: {}, children: [text("inner")] }, text("txt_b", "Titre")] };
const site: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root }], animations: [{ id: "an_1", name: "Arrivée", duration: 1000, tracks: [{ id: "t1", target: { trigger: true }, keyframes: [] }, { id: "t2", target: { node: "txt_b", split: "letters" }, keyframes: [] }, { id: "t3", target: { trigger: true, children: true }, keyframes: [] }, { id: "t4", target: { selector: ".x" }, keyframes: [] }] }, { id: "an_2", name: "Animation 2", duration: 500, tracks: [] }] };

describe("ligne de temps", () => {
  it("les graduations suivent la longueur : pas lisible, jamais plus d'une vingtaine", () => {
    expect(rulerTicks(600)).toEqual([0, 100, 200, 300, 400, 500, 600]);
    expect(rulerTicks(3000).length).toBeLessThanOrEqual(21);
    expect(rulerTicks(3000)[1]).toBe(250);
    expect(rulerTicks(12000)[1]).toBe(1000);
    expect(rulerTicks(0)).toEqual([0]);
    // Zoomée, la règle garde un pas lisible pour la part visible : ×4 sur 8 s, on voit 2 s à la fois, graduées tous les 250 ms.
    expect(rulerTicks(8000, 4)[1]).toBe(250);
    expect(rulerTicks(8000, 4).at(-1)).toBe(8000);
    expect(rulerTicks(8000)[1]).toBe(1000);
    // Avec la largeur réelle de la règle, les repères gardent au moins 36 px entre eux : pas de chevauchement des nombres.
    expect(rulerTicks(840, 1.5, 250)[1]).toBe(100);
    expect(rulerTicks(800, 1, 311)[1]).toBe(100);
    expect(rulerTicks(800, 1, 200)[1]).toBe(250);
  });
  it("niveaux de zoom de la ligne de temps : un cran à la fois, bornés", () => {
    expect(nextZoom(1, 1)).toBe(1.5);
    expect(nextZoom(1.5, -1)).toBe(1);
    expect(nextZoom(1, -1)).toBe(1);
    expect(nextZoom(8, 1)).toBe(8);
    expect(nextZoom(2.2, 1)).toBe(3);
  });
  it("une seule unité dans la ligne de temps : les millisecondes, groupées à la française", () => {
    expect(formatMs(0)).toBe("0 ms");
    expect(formatMs(420.4)).toBe("420 ms");
    expect(formatMs(1250)).toBe("1\u202f250 ms");
    expect(tickLabel(1000)).toBe("1\u202f000");
    expect(tickLabel(250)).toBe("250");
  });
  it("nomme la piste d'après sa cible résolue", () => {
    const a = site.animations[0]!;
    expect(trackLabel(a.tracks[0]!, "card", site)).toBe("Carte");
    expect(trackLabel(a.tracks[1]!, "card", site)).toBe("Titre · lettres");
    expect(trackLabel(a.tracks[2]!, "card", site)).toBe("Carte · enfants");
    expect(trackLabel(a.tracks[3]!, "card", site)).toBe(".x");
  });
  it("liste les éléments qu'une animation touche depuis un hôte, pour marquer les calques", () => {
    const a = site.animations[0]!;
    expect([...animatedNodes(a, "card")].sort()).toEqual(["card", "txt_b"]);
  });
  it("propose un nom libre pour une nouvelle animation", () => {
    expect(nextAnimationName(site)).toBe("Animation 3");
    expect(nextAnimationName({ ...site, animations: [] })).toBe("Animation 1");
    // Nommée d'après ce qui la lance : plus parlant qu'un compteur du site.
    expect(nextAnimationName(site, "Texte")).toBe("Animation · Texte");
    expect(nextAnimationName({ animations: [...site.animations, { id: "an_t", name: "Animation · Texte", duration: 1, tracks: [] }] }, "Texte")).toBe("Animation · Texte 2");
  });
  it("libellé d'une animation dans la bibliothèque : son nom, l'élément qui la lance et sa page, pour distinguer les homonymes", () => {
    const withUses: Site = { ...site, pages: [{ ...site.pages[0]!, triggers: [{ id: "pg1", on: "scroll", animation: "an_2" }], root: { ...root, children: [{ ...root.children![0]!, triggers: [{ id: "g1", on: "inView", animation: "an_1" }, { id: "g2", on: "hover", animation: "an_1" }] }, root.children![1]!] } }] };
    const pageName = withUses.pages[0]!.name.fr;
    expect(animationLabel(withUses, withUses.animations[0]!)).toBe(`Arrivée · Carte · ${pageName} (+1)`);
    expect(animationLabel(withUses, withUses.animations[1]!)).toBe(`Animation 2 · page ${pageName}`);
    expect(animationLabel(site, site.animations[0]!)).toBe("Arrivée · inutilisée");
  });
  it("liste les éléments qui portent un déclencheur, pour l'éclair des calques", () => {
    const tree: Node = { ...root, triggers: [{ id: "g0", on: "load", animation: "an_2" }], children: [{ ...root.children![0]!, triggers: [{ id: "g1", on: "inView", animation: "an_1" }] }, root.children![1]!] };
    expect([...triggerHosts(tree)].sort()).toEqual(["card", "root"]);
    expect(triggerHosts(root).size).toBe(0);
    expect([...triggerHosts(root, { triggers: [{ id: "pg1", on: "scroll", animation: "an_1" }] })]).toEqual(["root"]);
  });
  it("garde l'animation ouverte tant que son déclencheur existe encore sur l'hôte et la lance toujours", () => {
    const withTrigger: Site = { ...site, pages: [{ ...site.pages[0]!, root: { ...root, children: [{ ...root.children![0]!, triggers: [{ id: "g1", on: "inView", animation: "an_1" }] }, root.children![1]!] } }] };
    const open = { animationId: "an_1", hostId: "card", triggerId: "g1" };
    expect(validOpenTimeline(withTrigger, open)).toBe(open);
    expect(validOpenTimeline(withTrigger, null)).toBeNull();
    expect(validOpenTimeline(site, open)).toBeNull();
    expect(validOpenTimeline(withTrigger, { ...open, animationId: "an_2" })).toBeNull();
    expect(validOpenTimeline({ ...withTrigger, animations: [site.animations[1]!] }, open)).toBeNull();
    expect(validOpenTimeline(withTrigger, { ...open, hostId: "ailleurs" })).toBeNull();
    // Déclencheur de page : l'hôte est la racine de la page.
    const withPageTrigger: Site = { ...site, pages: [{ ...site.pages[0]!, triggers: [{ id: "pg1", on: "scroll", animation: "an_1" }] }] };
    const pageOpen = { animationId: "an_1", hostId: "root", triggerId: "pg1" };
    expect(validOpenTimeline(withPageTrigger, pageOpen)).toBe(pageOpen);
    expect(validOpenTimeline(site, pageOpen)).toBeNull();
    expect(openTrigger(withPageTrigger, pageOpen)).toEqual({ trigger: { id: "pg1", on: "scroll", animation: "an_1" }, page: withPageTrigger.pages[0] });
    expect(openTrigger(withTrigger, open)?.trigger.id).toBe("g1");
  });
  it("aligne un temps sur une grille de 10 ms, jamais avant 0", () => {
    expect(snapTime(423)).toBe(420);
    expect(snapTime(426)).toBe(430);
    expect(snapTime(-40)).toBe(0);
    expect(snapTime(437, 50)).toBe(450);
  });
  it("formes de cible d'une piste : l'élément, ses enfants s'il en a, ses mots ou lettres pour un texte", () => {
    expect(targetKindOf({ trigger: true })).toBe("element");
    expect(targetKindOf({ node: "x", children: true })).toBe("children");
    expect(targetKindOf({ node: "x", split: "letters" })).toBe("letters");
    expect(targetKindOf({ selector: ".x" })).toBe("selector");
    expect(targetKindOptions(root.children![0]).map((o) => o.value)).toEqual(["element", "children"]);
    expect(targetKindOptions(root.children![1]).map((o) => o.value)).toEqual(["element", "words", "letters"]);
    expect(targetKindOptions(undefined).map((o) => o.value)).toEqual(["element"]);
  });
  it("ajouter une piste : un élément de la même page que l'hôte, pas encore animé tel quel", () => {
    const other: Site = { ...site, pages: [...site.pages, { ...site.pages[0]!, id: "pg_2", path: "/autre", root: { id: "root2", type: "box", props: {}, children: [text("far")] } }] };
    const a: Animation = { id: "an_x", name: "X", duration: 600, tracks: [{ id: "t1", target: { trigger: true }, keyframes: [] }] };
    expect(canAddTrack(other, a, "card", "txt_b")).toEqual({ ok: true });
    expect(canAddTrack(other, a, "card", "card")).toEqual({ ok: false, reason: "« Carte » a déjà sa piste" });
    expect(canAddTrack(other, a, "card", "far")).toEqual({ ok: false, reason: "Choisissez un élément de la même page que l'animation" });
    expect(canAddTrack(other, a, "card", undefined)).toEqual({ ok: false, reason: "Sélectionnez un élément dans l'aperçu ou dans les calques" });
  });
});

describe("phrase de résumé d'une animation (audit n°5 · R2)", () => {
  const t = (id: string, v: string, tag = "p"): Node => ({ id, type: "text", props: { tag, content: { fr: [{ t: "text", v }] } } });
  const col: Node = { id: "col", type: "box", name: "Colonne", props: {}, children: [t("ttl", "Bonjour", "h1"), t("par", "Texte"), { id: "btns", type: "box", name: "Boutons", props: {}, children: [] }] };
  const card: Node = { id: "crd", type: "box", name: "Carte", props: {}, children: [] };
  const bar: Node = { id: "bar", type: "box", name: "Barre", props: {} };
  const kf = (a: number, b: number) => [{ at: a, style: { opacity: "0" } }, { at: b, style: { opacity: "1" } }];
  const s: Site = { ...sampleSite, pages: [{ ...sampleSite.pages[0]!, root: { id: "rt", type: "box", props: {}, children: [col, card, bar] } }], animations: [
    { id: "a_up", name: "Fondu en montant", preset: "fade-up", duration: 700, tracks: [{ id: "k1", target: { trigger: true }, keyframes: [{ at: 0, style: { opacity: "0", transform: "translateY(28px)" } }, { at: 700, style: { opacity: "1", transform: "none", filter: "none" }, easing: "cubic-bezier(.22,1,.36,1)" }] }] },
    { id: "a_comp", name: "Arrivée", duration: 1000, tracks: [{ id: "k2", target: { node: "ttl" }, keyframes: kf(0, 700) }, { id: "k3", target: { node: "par" }, keyframes: kf(150, 850) }, { id: "k4", target: { node: "btns", children: true }, stagger: { each: 80 }, keyframes: kf(300, 1000) }] },
    { id: "a_grow", name: "Grossir", preset: "grow", duration: 250, tracks: [{ id: "k5", target: { trigger: true }, keyframes: [{ at: 0, style: { transform: "scale(1)" } }, { at: 250, style: { transform: "scale(1.06)" }, easing: "ease-out" }] }] },
    { id: "a_bar", name: "Progression", duration: 1000, tracks: [{ id: "k6", target: { node: "bar" }, keyframes: kf(0, 1000) }] },
    { id: "a_float", name: "Flottement", duration: 3000, loop: "infinite", tracks: [{ id: "k7", target: { trigger: true }, keyframes: [{ at: 0, style: {} }, { at: 1500, style: { transform: "translateY(-10px)" } }, { at: 3000, style: {} }] }] },
    { id: "a_empty", name: "Vide", duration: 1000, tracks: [] },
  ] };

  it("une apparition simple sur l'élément lui-même : le mouvement, sa durée, sa fréquence", () => {
    expect(summarizeAnimation(s, { id: "g", on: "inView", animation: "a_up" }, "ttl")).toBe("Quand Titre 1 « Bonjour » entre dans l'écran : fondu en montant en 700 ms, une seule fois.");
    expect(summarizeAnimation(s, { id: "g", on: "inView", animation: "a_up", once: false, delay: 120 }, "ttl")).toBe("Quand Titre 1 « Bonjour » entre dans l'écran, après 120 ms : fondu en montant en 700 ms, à chaque passage.");
  });
  it("une composition : chaque élément, son moment, les décalages", () => {
    expect(summarizeAnimation(s, { id: "g", on: "inView", animation: "a_comp" }, "col")).toBe("Quand « Colonne » entre dans l'écran : Titre 1 « Bonjour » en 700 ms, Paragraphe « Texte » de 150 à 850 ms et les enfants de « Boutons » un à un (tous les 80 ms) de 300 à 1\u202f000 ms, une seule fois.");
  });
  it("un enchaînement : chaque élément avec son effet, « puis » quand il part après la fin du précédent", () => {
    const up = (from: number, to: number): Keyframe[] => [{ at: from, style: { opacity: "0", transform: "translateY(28px)" } }, { at: to, style: { opacity: "1", transform: "none", filter: "none" }, easing: "cubic-bezier(.22,1,.36,1)" }];
    const chain: Site = { ...s, animations: [...s.animations, { id: "a_chain", name: "Fondu en montant", preset: "fade-up", duration: 1400, tracks: [{ id: "c1", target: { trigger: true }, keyframes: up(0, 700) }, { id: "c2", target: { node: "par" }, keyframes: up(700, 1400) }, { id: "c3", target: { node: "crd" }, keyframes: kf(700, 1400) }] }] };
    expect(summarizeAnimation(chain, { id: "g", on: "load", animation: "a_chain" }, "ttl")).toBe("Au chargement de la page : Titre 1 « Bonjour » (fondu en montant) en 700 ms, puis Paragraphe « Texte » (fondu en montant) de 700 à 1 400 ms et « Carte » de 700 à 1 400 ms.");
  });
  it("des enfants visés sans décalage partent ensemble : la phrase ne dit pas « un à un »", () => {
    const together: Site = { ...s, animations: [...s.animations, { id: "a_kids", name: "Enfants", duration: 700, tracks: [{ id: "k8", target: { trigger: true, children: true }, keyframes: kf(0, 700) }] }] };
    expect(summarizeAnimation(together, { id: "g", on: "load", animation: "a_kids" }, "btns")).toBe("Au chargement de la page : les enfants de « Boutons » ensemble en 700 ms.");
  });
  it("survol, défilement de la page, boucle, et animation encore vide", () => {
    expect(summarizeAnimation(s, { id: "g", on: "hover", animation: "a_grow", reverseOnLeave: true }, "crd")).toBe("Au survol de « Carte » : grossir en 250 ms, puis retour quand la souris part.");
    expect(summarizeAnimation(s, { id: "g", on: "scroll", animation: "a_bar" }, "rt", true)).toBe("Pendant le défilement de la page (de 0 à 100 %) : « Barre » de 0 à 100 % du parcours.");
    expect(summarizeAnimation(s, { id: "g", on: "load", animation: "a_float" }, "crd")).toBe("Au chargement de la page : « Carte » en 3\u202f000 ms, en boucle.");
    expect(summarizeAnimation(s, { id: "g", on: "click", animation: "a_empty" }, "crd")).toBe("Au clic sur « Carte » : rien ne bouge encore.");
  });
});
