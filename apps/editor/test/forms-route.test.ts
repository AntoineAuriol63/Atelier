import { describe, it, expect } from "vitest";
import { corsHeaders, returnUrl } from "../src/lib/forms";

/** La route des formulaires répond aussi à un site exporté sur un autre domaine (23 septembre 2026) : CORS ouvert, retour sans script vers la page d'origine. */
describe("route des formulaires depuis un autre domaine", () => {
  it("ouvre la route à toute origine, sans cookies, pour POST et la pré-vérification", () => {
    const h = corsHeaders();
    expect(h["access-control-allow-origin"]).toBe("*");
    expect(h["access-control-allow-methods"]).toContain("POST");
    expect(h["access-control-allow-headers"]!.toLowerCase()).toContain("accept");
    expect(h).not.toHaveProperty("access-control-allow-credentials");
  });

  it("sans script, revient à la page d'origine avec « envoye » : même origine en chemin relatif, autre origine en adresse complète", () => {
    expect(returnUrl("https://atelier.example/s/site/contact", "https://atelier.example/api/forms/s/f", "frm_1", "frm1")).toBe("/s/site/contact?envoye=frm_1#f-frm1");
    expect(returnUrl("https://monsite.fr/contact?x=1", "https://atelier.example/api/forms/s/f", "frm_1", "frm1")).toBe("https://monsite.fr/contact?x=1&envoye=frm_1#f-frm1");
    expect(returnUrl(null, "https://atelier.example/api/forms/s/f", "frm_1", "frm1")).toBeUndefined();
    expect(returnUrl("pas une adresse", "https://atelier.example/api/forms/s/f", "frm_1", "frm1")).toBeUndefined();
    // Seuls http et https : pas de retour vers un schéma exotique.
    expect(returnUrl("javascript:alert(1)", "https://atelier.example/api/forms/s/f", "frm_1", "frm1")).toBeUndefined();
  });
});
