/**
 * Transformations et filtres des panneaux Effets : décomposés en réglages simples (rotation, échelle, décalage ; flou, luminosité…),
 * recomposés en CSS. Revenir à l'identité retire la valeur d'un style (`undefined`) ; sur une image-clé on passe `identity = "none"` :
 * une image-clé sans la propriété serait sautée par l'interpolation au lieu de revenir au neutre.
 */
/** Décompose une transformation simple (rotate, scale, translate, translateX, translateY en px) ; sinon, on édite le texte brut. */
export function parseTransform(v: string | undefined): { rotate: number; scale: number; x: number; y: number; raw: boolean } {
  const out = { rotate: 0, scale: 1, x: 0, y: 0, raw: false };
  if (!v || v === "none") return out;
  let rest = v;
  const take = (re: RegExp, fn: (m: RegExpMatchArray) => void) => { const m = rest.match(re); if (m) { fn(m); rest = rest.replace(m[0], ""); } };
  take(/rotate\((-?[\d.]+)deg\)/, (m) => { out.rotate = Number(m[1]); });
  take(/scale\((-?[\d.]+)\)/, (m) => { out.scale = Number(m[1]); });
  take(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/, (m) => { out.x = Number(m[1]); out.y = Number(m[2]); });
  take(/translateX\((-?[\d.]+)(?:px)?\)/, (m) => { out.x = Number(m[1]); });
  take(/translateY\((-?[\d.]+)(?:px)?\)/, (m) => { out.y = Number(m[1]); });
  if (rest.trim()) out.raw = true;
  return out;
}
export function composeTransform(t: { rotate: number; scale: number; x: number; y: number }, identity?: "none"): string | undefined {
  const parts: string[] = [];
  if (t.x || t.y) parts.push(`translate(${t.x}px, ${t.y}px)`);
  if (t.rotate) parts.push(`rotate(${t.rotate}deg)`);
  if (t.scale !== 1) parts.push(`scale(${t.scale})`);
  return parts.length ? parts.join(" ") : identity;
}
export type Filter = { blur: number; brightness: number; contrast: number; saturate: number; grayscale: number; raw: boolean };
export function parseFilter(v: string | undefined): Filter {
  const out: Filter = { blur: 0, brightness: 100, contrast: 100, saturate: 100, grayscale: 0, raw: false };
  if (!v || v === "none") return out;
  let rest = v;
  const take = (re: RegExp, fn: (m: RegExpMatchArray) => void) => { const m = rest.match(re); if (m) { fn(m); rest = rest.replace(m[0], ""); } };
  take(/blur\((\d*\.?\d+)px\)/, (m) => { out.blur = Number(m[1]); });
  take(/brightness\((\d*\.?\d+)%\)/, (m) => { out.brightness = Number(m[1]); });
  take(/contrast\((\d*\.?\d+)%\)/, (m) => { out.contrast = Number(m[1]); });
  take(/saturate\((\d*\.?\d+)%\)/, (m) => { out.saturate = Number(m[1]); });
  take(/grayscale\((\d*\.?\d+)%\)/, (m) => { out.grayscale = Number(m[1]); });
  if (rest.trim()) out.raw = true;
  return out;
}
export function composeFilter(f: Filter, identity?: "none"): string | undefined {
  const parts: string[] = [];
  if (f.blur) parts.push(`blur(${f.blur}px)`);
  if (f.brightness !== 100) parts.push(`brightness(${f.brightness}%)`);
  if (f.contrast !== 100) parts.push(`contrast(${f.contrast}%)`);
  if (f.saturate !== 100) parts.push(`saturate(${f.saturate}%)`);
  if (f.grayscale) parts.push(`grayscale(${f.grayscale}%)`);
  return parts.length ? parts.join(" ") : identity;
}
