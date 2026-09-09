import type { Interaction, Node, Target } from "@atelier/model";
import { variantClass } from "@atelier/model";
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

export function hasInteractions(n: Node): boolean { return !!n.interactions?.length || (n.children ?? []).some(hasInteractions); }

/**
 * Script des interactions du site (D31) : lit `data-ix`, joue apparitions (IntersectionObserver), clics, survols, chargement.
 * Dans l'éditeur (`.at-page[data-editor]`) et avec « réduire les animations », l'état d'arrivée est posé sans transition et les clics sont ignorés.
 */
export const INTERACTION_SCRIPT = `(function(){var root=document.querySelector(".at-page");var editor=!!(root&&root.hasAttribute("data-editor"));var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;var instant=editor||reduce;
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
});})();`;
