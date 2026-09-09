import type { Inline, LinkTarget, Mark } from "@atelier/model";

/** Sérialise le DOM d'un texte édité en contenu en ligne (marques et liens). */
export function serialize(root: HTMLElement): Inline[] {
  // Chaque niveau (racine, intérieur d'un lien) a sa propre liste : un texte de lien ne doit pas fusionner avec le texte qui précède le lien.
  const push = (out: Inline[], seg: Inline) => {
    const last = out[out.length - 1];
    if (seg.t === "text" && last && last.t === "text" && JSON.stringify(last.marks ?? []) === JSON.stringify(seg.marks ?? [])) { last.v += seg.v; return; }
    out.push(seg);
  };
  const walk = (out: Inline[], node: Node, marks: Mark[], first: { v: boolean }) => {
    if (node.nodeType === Node.TEXT_NODE) { const v = node.textContent ?? ""; if (v) push(out, { t: "text", v, marks: marks.length ? [...marks] : undefined }); return; }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === "BR") { push(out, { t: "break" }); return; }
    if (tag === "A") {
      const raw = el.getAttribute("data-link");
      let href: LinkTarget = { kind: "url", url: el.getAttribute("href") ?? "#" };
      try { if (raw) href = JSON.parse(raw) as LinkTarget; } catch { /* lien saisi à la main */ }
      const children: Inline[] = [];
      el.childNodes.forEach((c) => walk(children, c, marks, first));
      if (children.length) out.push({ t: "link", href, newTab: el.getAttribute("target") === "_blank" || undefined, children });
      return;
    }
    const mark = tag === "B" || tag === "STRONG" ? "bold" : tag === "I" || tag === "EM" ? "italic" : tag === "U" ? "underline" : tag === "S" || tag === "STRIKE" || tag === "DEL" ? "strike" : tag === "CODE" ? "code" : null;
    if ((tag === "DIV" || tag === "P") && !first.v) push(out, { t: "break" });
    first.v = false;
    const next: Mark[] = mark && !marks.includes(mark) ? [...marks, mark] : marks;
    el.childNodes.forEach((c) => walk(out, c, next, first));
  };
  const out: Inline[] = [];
  // Un seul marqueur « premier bloc » pour toute la racine : sinon chaque <div> collé (copier-coller multi-paragraphes) perdait son retour à la ligne.
  const first = { v: true };
  root.childNodes.forEach((c) => walk(out, c, [], first));
  return out.length ? out : [{ t: "text", v: "" }];
}

/** Vrai si le texte édité ne contient rien de visible (espaces et caractères invisibles compris). */
export function isEmptyText(el: HTMLElement): boolean {
  return (el.innerText ?? "").replace(/​/g, "").trim() === "";
}
