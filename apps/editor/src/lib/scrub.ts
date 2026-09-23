/**
 * Outil Animation, dans l'aperçu : montre l'état d'une animation à un instant. Les pistes du déclencheur (lues dans `data-anim`)
 * sont jouées en pause sur leurs cibles avec l'outil du site (`window.__atelierAnim`, même moteur que « Jouer » et que le site publié),
 * puis mises au temps de la tête de lecture. Le temps 0 est le départ du déclencheur : son délai et les répétitions ne comptent pas.
 */

export type ScrubAt = { id: string; trigger: string; time: number };

type WireTrack = { d: number; s: number; k: unknown };
type WireTrigger = { i: string; dl: number; loop: number | "infinite"; alt: boolean; tr: WireTrack[] };
type AnimTools = {
  els: (host: Element, tr: WireTrack) => Element[];
  toKf: (k: unknown) => Keyframe[];
  delay: (run: WireTrigger, tr: WireTrack, i: number, n: number) => number;
  opts: (run: WireTrigger, tr: WireTrack, extra: KeyframeAnimationOptions) => KeyframeAnimationOptions;
};

// Un seul aperçu par fenêtre : les animations en pause de l'instant montré, et ce qui les a produites.
let store: { key: string; anims: Animation[] } | null = null;

const targetOf = (a: Animation) => (a.effect as KeyframeEffect | null)?.target ?? null;

function stop(): void {
  store?.anims.forEach((a) => a.cancel());
  store = null;
}

/**
 * L'élément qui porte les animations d'un nœud dans l'aperçu : lui-même, ou pour une instance de composant (enveloppe sans boîte),
 * la racine rendue du composant, qui porte ses déclencheurs.
 */
export function animationHost(doc: Document, id: string): Element | null {
  const el = doc.querySelector(`[data-node="${id}"]`);
  return el?.hasAttribute("data-instance") && el.firstElementChild ? el.firstElementChild : el;
}

/** Pose l'état de l'animation lancée par `at.trigger` sur l'élément `at.id` au temps `at.time` (ms) ; `null` rend l'aperçu au repos. */
export function applyScrub(doc: Document, at: ScrubAt | null): void {
  const tools = (doc.defaultView as unknown as { __atelierAnim?: AnimTools } | null)?.__atelierAnim;
  const host = at && tools ? animationHost(doc, at.id) : null;
  if (!at || !tools || !host) { stop(); return; }
  const raw = host.getAttribute("data-anim") ?? "";
  const key = `${at.id}\n${at.trigger}\n${raw}`;
  // Tant que le déclencheur, ses données et les éléments sont les mêmes, on déplace seulement le temps.
  let current = store && store.key === key && store.anims.every((a) => targetOf(a)?.isConnected) ? store : null;
  if (!current) {
    stop();
    let triggers: WireTrigger[] = [];
    try { triggers = JSON.parse(raw || "[]") as WireTrigger[]; } catch { triggers = []; }
    const run = triggers.find((r) => r.i === at.trigger);
    if (!run) return;
    const once: WireTrigger = { ...run, dl: 0, loop: 1, alt: false };
    const anims: Animation[] = [];
    for (const tr of run.tr) {
      const list = tools.els(host, tr);
      list.forEach((el, i) => {
        try {
          const a = el.animate(tools.toKf(tr.k), { ...tools.opts(once, tr, { fill: "both" }), delay: tools.delay(once, tr, i, list.length) });
          a.pause();
          anims.push(a);
        } catch { /* image-clé que le navigateur refuse : la piste reste au repos */ }
      });
    }
    current = store = { key, anims };
  }
  current.anims.forEach((a) => { a.currentTime = at.time; });
}
