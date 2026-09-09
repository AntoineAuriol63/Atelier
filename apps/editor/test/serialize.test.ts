// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { serialize, isEmptyText } from "@/components/preview/serialize";

const el = (html: string) => { const d = document.createElement("div"); d.innerHTML = html; return d; };

describe("sérialisation du texte édité", () => {
  it("fusionne les textes voisins et garde les marques", () => {
    expect(serialize(el("Bonjour <b>tout</b> le monde"))).toEqual([{ t: "text", v: "Bonjour " }, { t: "text", v: "tout", marks: ["bold"] }, { t: "text", v: " le monde" }]);
  });
  it("garde le texte d'un lien à l'intérieur du lien, jamais fusionné avec ce qui précède", () => {
    const out = serialize(el('avant <a href="/contact" data-link=\'{"kind":"url","url":"/contact"}\'>écrivez-moi</a> après'));
    expect(out).toEqual([{ t: "text", v: "avant " }, { t: "link", href: { kind: "url", url: "/contact" }, newTab: undefined, children: [{ t: "text", v: "écrivez-moi" }] }, { t: "text", v: " après" }]);
  });
  it("ignore un lien vide et traduit les retours à la ligne", () => {
    expect(serialize(el("a<a></a>b<br>c"))).toEqual([{ t: "text", v: "ab" }, { t: "break" }, { t: "text", v: "c" }]);
    expect(serialize(el("<div>un</div><div>deux</div>"))).toEqual([{ t: "text", v: "un" }, { t: "break" }, { t: "text", v: "deux" }]);
  });
  it("rend un texte vide pour un élément vide", () => {
    expect(serialize(el(""))).toEqual([{ t: "text", v: "" }]);
    expect(isEmptyText(el("  "))).toBe(true);
    expect(isEmptyText(el("x"))).toBe(false);
  });
});
