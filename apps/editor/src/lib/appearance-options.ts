import type { Site } from "@atelier/model";
import { ANIMATION_PRESETS, appearanceOf, indexSite, inheritedAppearance } from "@atelier/model";
import type { SelectOption } from "@/ui";
import { quoteLabel } from "@/lib/timeline";
import { nodeLabel } from "@/components/node-icons";

/**
 * Le sélecteur « Apparition » d'un élément (vague 3 des tests simulés, défaut 2) : ce qu'il affiche, ses choix, et l'élément sur lequel
 * un préréglage s'applique. Un élément qui arrive avec un autre (la carte d'une liste, le texte d'un bloc) le dit en premier choix,
 * avec l'effet, mais ce choix ne se sélectionne pas : il n'écrirait rien. Un préréglage choisi s'applique à la liste pour une carte
 * (l'effet vaut pour toutes), à l'élément lui-même sinon.
 */
export function appearanceOptions(site: Site, nodeId: string): { value: string; options: SelectOption[]; applyTo: string } {
  const index = indexSite(site);
  const ap = appearanceOf(site, nodeId, index);
  const inherited = ap ? undefined : inheritedAppearance(site, nodeId, index);
  const labelOf = (id: string) => { const n = index.get(id)?.node; return quoteLabel(n ? nodeLabel(n) : id); };
  const presets = ANIMATION_PRESETS.filter((p) => p.group === "Apparition").map((p) => ({ value: p.id, label: p.label }));
  if (inherited) {
    const effect = inherited.appearance.preset?.label ?? inherited.appearance.origin?.label;
    return { value: "", applyTo: inherited.viaChildren ? inherited.carrierId : nodeId, options: [{ value: "", label: `Avec ${labelOf(inherited.carrierId)}${effect ? ` · ${effect}` : ""}`, disabled: true }, ...presets] };
  }
  const custom = ap && !ap.preset ? [{ value: "custom", label: ap.origin ? `Personnalisée (${ap.origin.label})` : "Personnalisée" }] : [];
  return { value: ap ? ap.preset?.id ?? "custom" : "", applyTo: nodeId, options: [{ value: "", label: "Aucune" }, ...custom, ...presets] };
}

/** « Arrive avec « Plats » · Fondu en montant » : l'élément qui lance l'apparition d'un élément quand ce n'est pas lui-même (mode Animation, vague 3 § 5.4). */
export function arrivesWith(site: Site, nodeId: string): { hostId: string; triggerId: string; animationId: string; label: string } | undefined {
  const index = indexSite(site);
  const ap = appearanceOf(site, nodeId, index);
  const labelOf = (id: string) => { const n = index.get(id)?.node; return quoteLabel(n ? nodeLabel(n) : id); };
  if (ap) {
    if (ap.own) return undefined;
    const effect = ap.preset?.label ?? ap.origin?.label;
    return { hostId: ap.hostId, triggerId: ap.trigger.id, animationId: ap.animation.id, label: `Arrive avec ${ap.page ? "la page" : labelOf(ap.hostId)}${effect ? ` · ${effect}` : ""}` };
  }
  const inherited = inheritedAppearance(site, nodeId, index);
  if (!inherited) return undefined;
  const effect = inherited.appearance.preset?.label ?? inherited.appearance.origin?.label;
  return { hostId: inherited.appearance.hostId, triggerId: inherited.appearance.trigger.id, animationId: inherited.appearance.animation.id, label: `Arrive avec ${labelOf(inherited.carrierId)}${effect ? ` · ${effect}` : ""}` };
}
