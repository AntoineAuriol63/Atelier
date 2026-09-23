import type { Database, Field, Node, Site } from "@atelier/model";
import { safePath } from "@/lib/safe-path";

export type FormInfo = { formId: string; node: Node; where: string };

/** Tous les formulaires du site, avec la page ou le composant qui les porte. */
export function findForms(site: Site): FormInfo[] {
  const out: FormInfo[] = [];
  const locale = site.settings.defaultLocale;
  const visit = (n: Node, where: string) => { if (n.type === "form") out.push({ formId: String(n.props.formId ?? n.id), node: n, where }); n.children?.forEach((c) => visit(c, where)); };
  site.pages.forEach((p) => visit(p.root, p.name[locale] ?? p.path));
  site.components.forEach((c) => visit(c.root, c.name));
  return out;
}

/** Identifiant de la base virtuelle qui reçoit les envois d'un formulaire. */
export const formDatabaseId = (formId: string) => `frm_${formId}`.slice(0, 32);

/** Base virtuelle des messages reçus par un formulaire : ses champs sont ceux du formulaire, plus la page d'origine. */
export function formDatabase(site: Site, form: FormInfo): Database {
  const locale = site.settings.defaultLocale;
  const fields: Field[] = [];
  const visit = (n: Node) => {
    if (n.type === "field") {
      const name = String(n.props.name ?? n.id);
      const type = String(n.props.fieldType ?? "text");
      fields.push({ name, label: (n.props.label as Record<string, string> | undefined) ?? { [locale]: name }, type: type === "checkbox" ? "boolean" : type === "number" ? "number" : type === "date" ? "date" : type === "textarea" ? "richtext" : "text" });
    }
    n.children?.forEach(visit);
  };
  visit(form.node);
  fields.push({ name: "_page", label: { [locale]: "Page" }, type: "text" }, { name: "createdAt", label: { [locale]: "Reçu le" }, type: "createdAt" });
  const title = fields.find((f) => f.name === "name" || f.name === "nom") ?? fields.find((f) => f.name === "email") ?? fields[0]!;
  return { id: formDatabaseId(form.formId), name: { [locale]: `Messages · ${form.node.name ?? form.where}` }, slug: formDatabaseId(form.formId), fields, titleField: title.name };
}

/** Clé unique d'un champ parmi ses voisins (`email`, `email-2`…), pour un champ ajouté ou dupliqué. */
export function uniqueFieldName(siblings: Node[], base: string, except?: string): string {
  const taken = new Set(siblings.filter((n) => n.type === "field" && n.id !== except).map((n) => String(n.props.name ?? "")));
  const root = (base || "champ").replace(/-\d+$/, "");
  let name = root, i = 2;
  while (taken.has(name)) name = `${root}-${i++}`;
  return name;
}

/** La route des formulaires répond à un site exporté sur n'importe quel domaine : origine ouverte, sans cookies (rien de privé n'y transite). */
export function corsHeaders(): Record<string, string> {
  return { "access-control-allow-origin": "*", "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "accept, content-type", "access-control-max-age": "86400" };
}

/**
 * Retour sans script après un envoi : la page d'origine avec `?envoye=<formulaire>` et l'ancre du formulaire.
 * Même origine que la route : un chemin relatif ; autre origine (site exporté) : l'adresse complète, http ou https seulement.
 */
export function returnUrl(referer: string | null, reqUrl: string, formId: string, nodeId: string): string | undefined {
  try {
    if (!referer) return undefined;
    const u = new URL(referer);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    u.searchParams.set("envoye", formId);
    u.hash = "";
    if (u.origin === new URL(reqUrl).origin) return safePath(u.pathname + u.search) + `#f-${nodeId}`;
    return `${u.href}#f-${nodeId}`;
  } catch { return undefined; }
}
