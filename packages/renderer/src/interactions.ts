import type { Interaction, Node, Target, Trigger } from "@atelier/model";
import { animationById, animationLength, easingCss, resolveTrackTarget, trackSpan, variantClass } from "@atelier/model";
import { resolveHref, type RenderContext } from "./context";
import { declarations } from "./css";

/** Forme compacte d'une interaction pour le script du site : déclencheur, options, actions avec sélecteurs résolus. */
type WireAction = { k: string; s?: string; css?: string; v?: [string, string][]; to?: string; tr?: string };
type WireInteraction = { t: string; o?: Record<string, unknown>; a: WireAction[] };

const selectorFor = (target: Target, ctx: RenderContext): string | undefined => {
  if ("self" in target) return undefined;
  if ("node" in target) return `.${ctx.classes?.node.get(target.node) ?? `n-${target.node}`}`;
  if ("component" in target) { const cmp = ctx.site.components.find((c) => c.id === target.component); return cmp ? `.${ctx.classes?.node.get(cmp.root.id) ?? `n-${cmp.root.id}`}` : undefined; }
  return target.selector;
};
const transitionCss = (t: { duration: number; delay?: number; easing: string } | undefined) => (t ? `${t.duration}ms ${t.easing} ${t.delay ?? 0}ms` : undefined);

/** Valeur de `data-ix` d'un nœud, ou `undefined` s'il n'a pas d'interaction rendable. */
export function interactionsAttr(node: Node, ctx: RenderContext): string | undefined {
  const list = node.interactions ?? [];
  if (!list.length) return undefined;
  const wire: WireInteraction[] = list.map((ix: Interaction) => ({
    t: ix.trigger.kind, o: ix.trigger.options,
    a: ix.actions.flatMap((a): WireAction[] => {
      switch (a.kind) {
        case "setStyle": return [{ k: "style", s: selectorFor(a.target, ctx), css: declarations(a.style, ctx.assets), tr: transitionCss(a.transition) }];
        case "toggle": case "show": case "hide": return [{ k: a.kind, s: selectorFor(a.target, ctx), tr: transitionCss(a.transition) }];
        case "setVariant": return [{ k: "variant", s: selectorFor(a.target, ctx), v: Object.entries(a.variant).map(([axis, value]) => [`v-${axis}`, variantClass(axis, value)]), tr: transitionCss(a.transition) }];
        case "navigate": return [{ k: "go", to: resolveHref(a.to, ctx) }];
        case "scrollTo": return [{ k: "scroll", s: selectorFor(a.target, ctx) }];
        default: return [];
      }
    }),
  })).filter((w) => w.a.length);
  return wire.length ? JSON.stringify(wire) : undefined;
}

/**
 * Dans l'éditeur, le script du site ne tourne pas (l'aperçu est rendu par React et se met à jour sans rechargement) :
 * cette fonction pose l'état d'arrivée des apparitions et des actions « au chargement », sans transition, après chaque rendu.
 */
export function applyInstantStates(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>("[data-ix]").forEach((el) => {
    let list: WireInteraction[];
    try { list = JSON.parse(el.getAttribute("data-ix") ?? "[]") as WireInteraction[]; } catch { return; }
    for (const ix of list) {
      if (ix.t !== "inView" && ix.t !== "load") continue;
      for (const a of ix.a) {
        const targets: HTMLElement[] = a.s ? Array.from(root.querySelectorAll<HTMLElement>(a.s)) : [el];
        for (const t of targets) {
          if (a.k === "style" && a.css) { t.style.transition = "none"; t.style.cssText += ";" + a.css; }
          else if (a.k === "hide") t.setAttribute("data-ix-hidden", "");
          else if (a.k === "show") t.removeAttribute("data-ix-hidden");
        }
      }
    }
  });
}

/** Réglage du bandeau défilant d'une boîte : `{ duration, direction, pauseOnHover }` (un nombre seul, ancienne forme, vaut la durée). */
export function marqueeOf(node: Node): { duration: number; direction?: "left" | "right" | "up" | "down"; pauseOnHover?: boolean } | null {
  const m = node.props.marquee;
  if (typeof m === "number") return m > 0 ? { duration: m } : null;
  if (m && typeof m === "object" && typeof (m as { duration?: unknown }).duration === "number" && (m as { duration: number }).duration > 0) return m as { duration: number; direction?: "left" | "right" | "up" | "down"; pauseOnHover?: boolean };
  return null;
}

/**
 * Valeur de `data-anim` : les déclencheurs du nœud avec leurs animations recopiées (pistes, images-clés en déclarations CSS résolues),
 * pour le script (entrée dans l'écran, clic, défilement, souris, retour, bascule, sélecteurs libres) et pour « Jouer » dans l'éditeur.
 * Piste : `tg` absent (l'élément), "children", "pieces", ou `{ s, m? }` (sélecteur, avec `m` enfants ou morceaux) ; `st` décalage ;
 * `s` début, `d` portée, `k` images `{ o, c, e }` (position 0-1, déclarations, courbe vers l'image suivante).
 * Déclencheur : `pg` quand il appartient à la page (au défilement, la progression de toute la page parcourt la ligne de temps).
 */
export function animationsAttr(node: Node, ctx: RenderContext, triggers: Trigger[] = node.triggers ?? []): string | undefined {
  if (!triggers.length) return undefined;
  const selOf = (id: string) => `.${ctx.classes?.node.get(id) ?? `n-${id}`}`;
  const wire = triggers.flatMap((t) => {
    const a = animationById(ctx.site, t.animation);
    if (!a) return [];
    let js = t.on === "hover" && t.reverseOnLeave ? 1 : undefined;
    const tr = a.tracks.filter((k) => k.keyframes.length >= 2).map((track) => {
      const r = resolveTrackTarget(track.target, node.id);
      let tg: unknown;
      if ("selector" in r) { tg = { s: r.selector }; js = 1; }
      else if (r.node === node.id) tg = r.children ? "children" : r.split ? "pieces" : undefined;
      else tg = { s: selOf(r.node), ...(r.children ? { m: "children" } : r.split ? { m: "pieces" } : {}) };
      const kfs = [...track.keyframes].sort((x, y) => x.at - y.at);
      const { start, end } = trackSpan(track);
      const span = end - start || 1;
      return { tg, st: track.stagger ? [track.stagger.each, track.stagger.from ?? "start"] : undefined, s: start, d: end - start, k: kfs.map((k, i) => ({ o: Number(((k.at - start) / span).toFixed(4)), c: declarations(k.style, ctx.assets), e: kfs[i + 1]?.easing ? easingCss(kfs[i + 1]!.easing, kfs[i + 1]!.at - k.at) : undefined })) };
    });
    // Déclencheur de page (porté par la racine) : au défilement, c'est la progression de toute la page qui parcourt la ligne de temps.
    const pg = node.id === ctx.page.root.id && ctx.page.triggers?.some((x) => x.id === t.id) ? 1 : undefined;
    return [{ i: t.id, t: t.on, pg, dl: t.delay ?? 0, once: t.once !== false, ph: !!t.pauseOnHover, rv: t.reverseOnLeave ? 1 : undefined, tog: t.toggle ? 1 : undefined, r: t.range ?? [0, 1], ax: t.axis ?? "y", dur: animationLength(a), loop: a.loop ?? 1, alt: !!a.alternate, tr, js }];
  });
  return wire.length ? JSON.stringify(wire) : undefined;
}

/** Vrai si la page contient un effet joué par le script (animations, parallaxe, compteur, carrousel automatique). */
export function hasMotion(n: Node): boolean {
  const own = !!n.triggers?.length || (typeof n.props.parallax === "number" && n.props.parallax !== 0) || !!n.props.countUp || (n.type === "collection" && !!(n.props.view as { autoplay?: number } | undefined)?.autoplay);
  return own || (n.children ?? []).some(hasMotion);
}

export function hasInteractions(n: Node): boolean { return !!n.interactions?.length || (n.children ?? []).some(hasInteractions); }

/**
 * Lecture d'une animation (section 8.4), partagée par le script du site et par le bouton « Jouer » de l'éditeur :
 * `window.__atelierPlay(el, a, extra)` anime les cibles du run `a` (données de `data-anim`) porté par `el` avec l'API Web
 * Animations et rend la liste des animations créées ; le décalage donne à chaque cible son délai selon son rang.
 * Courbes comme en CSS : une par segment, portée par l'image qui l'ouvre (`ease` par défaut), et une progression linéaire sur la piste.
 */
export const ANIMATION_PLAY_SCRIPT = `(function(){if(window.__atelierPlay)return;
var toKf=function(k){return k.map(function(s){var o={offset:s.o,easing:s.e||"ease"};s.c.split(";").forEach(function(d){var i=d.indexOf(":");if(i>0){var p=d.slice(0,i).trim().replace(/-([a-z])/g,function(_,c){return c.toUpperCase();});o[p]=d.slice(i+1).trim();}});return o;});};
var kids=function(el){return Array.prototype.slice.call(el.children).map(function(c){return c.hasAttribute("data-instance")&&c.firstElementChild?c.firstElementChild:c;});};
var pieces=function(el){return Array.prototype.slice.call(el.querySelectorAll(".at-piece"));};
var els=function(el,tr){var tg=tr.tg;if(!tg)return[el];if(tg==="children")return kids(el);if(tg==="pieces")return pieces(el);var base=Array.prototype.slice.call(document.querySelectorAll(tg.s));if(tg.m==="children")return base.reduce(function(o,b){return o.concat(kids(b));},[]);if(tg.m==="pieces")return base.reduce(function(o,b){return o.concat(pieces(b));},[]);return base;};
var rank=function(i,n,from){return from==="end"?n-1-i:from==="center"?Math.abs(i-(n-1)/2):i;};
var delay=function(a,tr,i,n){return a.dl+tr.s+(tr.st?rank(i,n,tr.st[1])*tr.st[0]:0);};
var opts=function(a,tr,extra){var o={duration:tr.d,easing:"linear",iterations:a.loop==="infinite"?Infinity:a.loop,direction:a.alt?"alternate":"normal",fill:"both"};for(var k in extra)o[k]=extra[k];return o;};
window.__atelierAnim={toKf:toKf,els:els,delay:delay,opts:opts};
window.__atelierPlay=function(el,a,extra){var out=[];a.tr.forEach(function(tr){var list=els(el,tr);list.forEach(function(t,i){try{var o=opts(a,tr,extra||{});o.delay=delay(a,tr,i,list.length);out.push(t.animate(toKf(tr.k),o));}catch(e){}});});return out;};
})();`;

/**
 * Script des interactions du site (D31) : lit `data-ix`, joue apparitions (IntersectionObserver), clics, survols, chargement.
 * Dans l'éditeur (`.at-page[data-editor]`) et avec « réduire les animations », l'état d'arrivée est posé sans transition et les clics sont ignorés.
 */
export const INTERACTION_SCRIPT = ANIMATION_PLAY_SCRIPT + `(function(){if(window.__atelierIx)return;window.__atelierIx=1;var root=document.querySelector(".at-page");var editor=!!(root&&root.hasAttribute("data-editor"));var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;var instant=editor||reduce;
function targets(el,s){return s?Array.prototype.slice.call(document.querySelectorAll(s)):[el];}
function setStyle(el,css,tr){if(tr&&!instant){el.style.transition=tr;}else{el.style.transition="none";}el.style.cssText+=";"+css;}
function run(el,a,revert){targets(el,a.s).forEach(function(t){
 if(a.k==="style"){if(revert){t.style.cssText=t.__ix0||"";}else{if(t.__ix0===undefined)t.__ix0=t.style.cssText;setStyle(t,a.css,a.tr);}}
 else if(a.k==="toggle"||a.k==="show"||a.k==="hide"){var hide=a.k==="hide"||(a.k==="toggle"&&!t.hasAttribute("data-ix-hidden"));if(revert)hide=!hide;if(hide){t.setAttribute("data-ix-hidden","");}else{t.removeAttribute("data-ix-hidden");}}
 else if(a.k==="variant"){if(a.tr&&!instant)t.style.transition=a.tr;a.v.forEach(function(p){var prefix=p[0]+"-";t.classList.forEach(function(c){if(c.indexOf(prefix)===0)t.classList.remove(c);});if(!revert)t.classList.add(p[1]);});}
 else if(a.k==="go"){if(!revert)location.href=a.to;}
 else if(a.k==="scroll"){if(!revert)t.scrollIntoView({behavior:instant?"auto":"smooth",block:"start"});}
});}
var io=("IntersectionObserver" in window)&&!instant?new IntersectionObserver(function(entries){entries.forEach(function(e){var el=e.target,list=el.__ixIn||[];if(e.isIntersecting){list.forEach(function(ix){ix.a.forEach(function(a){run(el,a,false);});});if(!list.some(function(ix){return ix.o&&ix.o.once===false}))io.unobserve(el);}else{list.forEach(function(ix){if(ix.o&&ix.o.once===false)ix.a.forEach(function(a){run(el,a,true);});});}});},{threshold:0.15,rootMargin:"0px 0px -8% 0px"}):null;
document.querySelectorAll("[data-ix]").forEach(function(el){var list;try{list=JSON.parse(el.getAttribute("data-ix"));}catch(e){return;}
 list.forEach(function(ix){
  if(ix.t==="inView"){if(io){el.__ixIn=(el.__ixIn||[]).concat([ix]);io.observe(el);}else{ix.a.forEach(function(a){run(el,a,false);});}}
  else if(ix.t==="load"){ix.a.forEach(function(a){run(el,a,false);});}
  else if(editor){return;}
  else if(ix.t==="click"){el.addEventListener("click",function(ev){if(el.tagName!=="A"&&el.tagName!=="BUTTON")ev.preventDefault();ix.a.forEach(function(a){run(el,a,false);});});}
  else if(ix.t==="hover"){el.addEventListener("mouseenter",function(){ix.a.forEach(function(a){run(el,a,false);});});el.addEventListener("mouseleave",function(){ix.a.forEach(function(a){run(el,a,true);});});}
 });
});
/* Parallaxe : l'élément se décale selon sa position dans l'écran, à la vitesse donnée (0.1 = léger, 0.5 = marqué). */
var px=Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
if(px.length&&!instant){var ticking=false;var move=function(){ticking=false;var vh=window.innerHeight;px.forEach(function(el){var r=el.getBoundingClientRect();var c=r.top+r.height/2-vh/2;el.style.transform="translate3d(0,"+Math.round(-c*parseFloat(el.getAttribute("data-parallax"))*100)/100+"px,0)";el.style.willChange="transform";});};window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(move);}},{passive:true});window.addEventListener("resize",move);move();}
/* Animations (section 8.4) : déclencheurs et pistes dans data-anim. CSS joue « chargement » et « survol » ; le script lance « entrée dans l'écran », « clic », « défilement », « souris », le retour, la bascule et les sélecteurs libres (js) avec l'API Web Animations. */
var A=window.__atelierAnim;
if(!instant){document.querySelectorAll("[data-anim]").forEach(function(el){var runs;try{runs=JSON.parse(el.getAttribute("data-anim"));}catch(e){return;}
 var scripted=runs.filter(function(a){return a.t==="inView"||a.t==="click"||a.t==="scroll"||a.t==="pointer"||a.js;});if(!scripted.length)return;
 var live={};var each=function(fn){for(var k in live)live[k].forEach(fn);};var pauseAll=function(){each(function(an){an.pause();});};var playAll=function(){each(function(an){if(an.playState==="paused"&&!an.__scrub)an.play();});};
 if(runs.some(function(a){return a.ph&&a.t!=="load"&&a.t!=="hover";})){el.addEventListener("mouseenter",pauseAll);el.addEventListener("mouseleave",playAll);}
 var cancel=function(a){(live[a.i]||[]).forEach(function(an){an.cancel();});delete live[a.i];};
 var scrub=function(a){var list=[];var once={dl:0,loop:1,alt:false};a.tr.forEach(function(tr){var ts=A.els(el,tr);ts.forEach(function(t,i){var o=A.opts(once,tr,{fill:"both"});o.delay=A.delay(once,tr,i,ts.length);var an=t.animate(A.toKf(tr.k),o);an.pause();an.__scrub=true;list.push(an);});});live[a.i]=list;return function(q){list.forEach(function(an){an.currentTime=Math.max(0,Math.min(1,q))*a.dur;});};};
 runs.forEach(function(a){
  if(a.t==="click"){el.addEventListener("click",function(){if(a.tog&&live[a.i]&&live[a.i].length){live[a.i].forEach(function(an){an.reverse();});}else{live[a.i]=window.__atelierPlay(el,a);}});}
  else if(a.t==="scroll"){var set=scrub(a);var tick=false;var upd=function(){tick=false;var vh=window.innerHeight,r=el.getBoundingClientRect(),de=document.documentElement;var p=a.pg?(window.scrollY||de.scrollTop||0)/Math.max(1,de.scrollHeight-vh):(vh-r.top)/(vh+r.height);var lo=a.r[0],hi=a.r[1];set(hi>lo?(p-lo)/(hi-lo):p);};var onS=function(){if(!tick){tick=true;requestAnimationFrame(upd);}};window.addEventListener("scroll",onS,{passive:true});window.addEventListener("resize",onS);upd();}
  else if(a.t==="pointer"){var setP=scrub(a);window.addEventListener("mousemove",function(ev){setP(a.ax==="x"?ev.clientX/window.innerWidth:ev.clientY/window.innerHeight);},{passive:true});}
  else if(a.js&&a.t==="load"){live[a.i]=window.__atelierPlay(el,a);}
  else if(a.js&&a.t==="hover"){el.addEventListener("mouseenter",function(){if(a.rv&&live[a.i]&&live[a.i].length){live[a.i].forEach(function(an){if(an.playbackRate<0)an.reverse();});}else{cancel(a);live[a.i]=window.__atelierPlay(el,a);}});el.addEventListener("mouseleave",function(){if(a.rv){(live[a.i]||[]).forEach(function(an){if(an.playbackRate>0)an.reverse();});}else{cancel(a);}});}
 });
 var inView=runs.filter(function(a){return a.t==="inView";});
 /* Entrée dans l'écran : jusqu'à l'entrée, le CSS tient les cibles à leur état de départ (animation en pause). À l'entrée, dans la même tâche, le script retire l'animation CSS et joue les pistes : pas d'éclair. Une boucle CSS au chargement sur les mêmes cibles est reprise au même temps ; à chaque passage, la sortie rend la main au CSS (retour à l'état de départ). */
 if(inView.length&&("IntersectionObserver" in window)){var inT=[];inView.forEach(function(a){a.tr.forEach(function(tr){A.els(el,tr).forEach(function(t){if(inT.indexOf(t)<0)inT.push(t);});});});
  var shared=runs.filter(function(a){return a.t==="load"&&!a.js&&a.tr.some(function(tr){return A.els(el,tr).some(function(t){return inT.indexOf(t)>=0;});});});
  var taken=false,played={};
  var take=function(){if(taken)return;taken=true;inT.forEach(function(t){t.style.animation="none";});var now=(document.timeline&&document.timeline.currentTime)||0;shared.forEach(function(a){cancel(a);live[a.i]=window.__atelierPlay(el,a);live[a.i].forEach(function(an){try{an.currentTime=now;}catch(e){}});});};
  var release=function(){if(!taken)return;taken=false;shared.forEach(cancel);inT.forEach(function(t){t.style.animation="";});};
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var todo=inView.filter(function(a){return !a.once||!played[a.i];});if(!todo.length)return;take();todo.forEach(function(a){played[a.i]=1;cancel(a);live[a.i]=window.__atelierPlay(el,a);});if(inView.every(function(a){return a.once;}))io.unobserve(el);}else if(inView.every(function(a){return !a.once;})){inView.forEach(cancel);release();}else{inView.forEach(function(a){if(!a.once)cancel(a);});}});},{threshold:0.15});io.observe(el);}
});}
/* Compteur : le nombre du texte défile de 0 à sa valeur quand il entre dans l'écran (la ponctuation autour est gardée). */
var counters=Array.prototype.slice.call(document.querySelectorAll("[data-countup]"));
if(counters.length){var runCount=function(el){var txt=el.textContent||"";var m=txt.match(/-?\d[\d\s\u00a0.,]*/);if(!m)return;var raw=m[0];var dec=(raw.match(/[.,](\d+)$/)||[])[1];var target=parseFloat(raw.replace(/[\s\u00a0]/g,"").replace(",","."));if(isNaN(target))return;var digits=dec?dec.length:0;var start=performance.now(),dur=1400;var fmt=function(v){var s=v.toFixed(digits);if(dec)s=s.replace(".",raw.indexOf(",")>=0?",":".");return raw.indexOf(" ")>=0||raw.indexOf("\u00a0")>=0?s.replace(/\B(?=(\d{3})+(?!\d))/g,"\u00a0"):s;};var step=function(now){var t=Math.min(1,(now-start)/dur);var e=1-Math.pow(1-t,3);el.textContent=txt.replace(raw,fmt(target*e));if(t<1)requestAnimationFrame(step);};if(instant){el.textContent=txt;return;}requestAnimationFrame(step);};
 if(("IntersectionObserver" in window)&&!instant){var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){runCount(e.target);cio.unobserve(e.target);}});},{threshold:0.4});counters.forEach(function(el){cio.observe(el);});}}
/* Carrousel automatique : passe à la carte suivante toutes les N secondes, s'arrête au survol ou au toucher. */
document.querySelectorAll("[data-autoplay]").forEach(function(track){var every=parseFloat(track.getAttribute("data-autoplay"))*1000;if(!(every>0)||instant)return;var paused=false;track.addEventListener("mouseenter",function(){paused=true;});track.addEventListener("mouseleave",function(){paused=false;});track.addEventListener("touchstart",function(){paused=true;},{passive:true});
 setInterval(function(){if(paused||!track.children.length)return;var w=track.children[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap||"0");var max=track.scrollWidth-track.clientWidth;var next=track.scrollLeft+w;track.scrollTo({left:next>max+1?0:next,behavior:"smooth"});},every);});
})();`;
