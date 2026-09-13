/**
 * « Tester sur le site » (audit n°5 · R4) : l'éditeur ne joue rien de lui-même ; ce qui dépend du visiteur (entrée dans l'écran,
 * défilement, survol, clic) se vérifie dans l'onglet Aperçu, qui rend le vrai site. Ces aides y mènent et y montrent l'élément.
 */

/** Adresse de l'onglet Aperçu qui fera arriver l'élément `nodeId` à l'écran. */
export const testOnSiteUrl = (previewPath: string, nodeId?: string): string =>
  nodeId ? `${previewPath}${previewPath.includes("?") ? "&" : "?"}voir=${encodeURIComponent(nodeId)}` : previewPath;

/**
 * Dans l'onglet Aperçu : un élément plus bas dans la page est d'abord placé juste sous le bas de l'écran, puis amené au centre en
 * défilant, pour que ses animations d'entrée dans l'écran et de défilement se jouent sous les yeux ; un élément visible dès le chargement
 * ne bouge pas (son animation s'est jouée). Un bandeau dit quoi faire pour le survol et le clic. Rend `false` si l'élément n'existe pas.
 */
export function revealForTest(doc: Document, id: string, o: { delay?: number } = {}): boolean {
  const win = doc.defaultView;
  if (!win || !/^[\w-]+$/.test(id)) return false;
  const el = doc.querySelector<HTMLElement>(`.n-${id}`);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const top = rect.top + (win.scrollY || 0);
  const vh = win.innerHeight;
  if (top > vh) {
    win.scrollTo({ top: Math.max(0, Math.round(top - vh - 40)), behavior: "auto" });
    win.setTimeout(() => win.scrollTo({ top: Math.max(0, Math.round(top - vh / 2 + rect.height / 2)), behavior: "smooth" }), o.delay ?? 700);
  }
  showBanner(doc, "Test de l'animation : l'élément arrive à l'écran comme pour un visiteur. Survolez-le ou cliquez-le si c'est ainsi que son animation se lance.");
  return true;
}

function showBanner(doc: Document, text: string): void {
  doc.querySelector("[data-atelier-test]")?.remove();
  const banner = doc.createElement("div");
  banner.setAttribute("data-atelier-test", "");
  banner.setAttribute("role", "status");
  banner.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483647;max-width:min(560px,calc(100vw - 32px));display:flex;gap:10px;align-items:center;padding:10px 14px;border-radius:8px;background:#1f2430;color:#f3f4f6;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.35)";
  const span = doc.createElement("span");
  span.textContent = text;
  const close = doc.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Fermer");
  close.style.cssText = "background:none;border:0;color:inherit;font-size:18px;line-height:1;cursor:pointer;padding:0 2px";
  close.addEventListener("click", () => banner.remove());
  banner.append(span, close);
  doc.body.appendChild(banner);
  doc.defaultView?.setTimeout(() => banner.remove(), 9000);
}
