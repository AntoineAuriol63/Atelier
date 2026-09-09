"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Download, ExternalLink, History, Plus, UploadCloud, X } from "lucide-react";
import type { CommitOptions, Op, Redirect, Site } from "@atelier/model";
import { NOT_FOUND_PATH, validRedirect } from "@atelier/model";
import { Badge, Button, Dialog, Field, FieldGroup, Hint, IconButton, TextArea, TextInput, Toggle, askConfirm } from "@/ui";
import { notFoundPage } from "@/components/PagesPanel";
import { AssetPicker } from "@/components/design/AppearancePanel";

type Commit = (op: Op, opts?: CommitOptions) => void;
type State = { publishedVersion: number | null; publishedAt: string | null; publications: { version: number; label?: string; createdAt: string }[]; url: string | null; version: number | null };

const when = (iso: string) => new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/** Publier, voir l'historique, revenir en arrière, régler l'adresse et le référencement du site (D34, D36, D38). */
export function PublishDialog({ site, version, dirty, broken, commit, onClose, notify }: { site: Site; version: number; dirty: boolean; /** L'enregistrement est bloqué (conflit) : il faut recharger avant de publier. */ broken?: boolean; commit: Commit; onClose: () => void; notify: (text: string, tone?: "danger" | "success" | "info") => void }) {
  const locale = site.settings.defaultLocale;
  const [state, setState] = useState<State | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [exported, setExported] = useState(false);
  const [newRedirect, setNewRedirect] = useState<Redirect>({ from: "", to: "", permanent: true });
  const redirectError = newRedirect.from || newRedirect.to ? validRedirect(newRedirect) : undefined;
  const notFound = site.pages.find((p) => p.kind === "static" && p.path === NOT_FOUND_PATH);
  const setRedirects = (value: Redirect[], lbl: string) => commit({ op: "site.set", path: "redirects", value }, { label: lbl });
  const addRedirect = () => { if (redirectError || !newRedirect.from || !newRedirect.to) return; setRedirects([...site.redirects, newRedirect], `Rediriger ${newRedirect.from}`); setNewRedirect({ from: "", to: "", permanent: true }); };
  const load = useCallback(async () => {
    const res = await fetch(`/api/sites/${site.id}/publish`);
    const body = (await res.json()) as State & { error?: string };
    if (!res.ok) { notify(body.error ?? "Impossible de lire l'état de publication"); return; }
    setState(body);
  }, [site.id, notify]);
  useEffect(() => { const t = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(t); }, [load]);

  const publish = async () => {
    setBusy("Publication…");
    try {
      const res = await fetch(`/api/sites/${site.id}/publish`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ label }) });
      const body = (await res.json()) as { version?: number; url?: string; error?: string };
      if (!res.ok) throw new Error(body.error ?? "Publication impossible");
      notify(`Site publié (version ${body.version}).`, "success"); setLabel(""); await load();
    } catch (e) { notify(e instanceof Error ? e.message : "Publication impossible"); } finally { setBusy(null); }
  };
  const restore = async (v: number) => {
    if (!(await askConfirm({ title: `Remettre en ligne la version ${v} ?`, message: "Le site public affichera cet état. L'éditeur ne change pas : vous continuez sur la version de travail.", action: "Remettre en ligne" }))) return;
    setBusy("Retour arrière…");
    try {
      const res = await fetch(`/api/sites/${site.id}/publish/restore`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: v }) });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Retour arrière impossible");
      notify(`Version ${v} remise en ligne.`, "success"); await load();
    } catch (e) { notify(e instanceof Error ? e.message : "Retour arrière impossible"); } finally { setBusy(null); }
  };
  const exportCode = async () => {
    setBusy("Préparation de l'archive…");
    try {
      const res = await fetch(`/api/sites/${site.id}/export`);
      if (!res.ok) { const body = (await res.json().catch(() => ({}))) as { error?: string }; throw new Error(body.error ?? "Export impossible"); }
      const blob = await res.blob();
      const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `${site.id}.zip`;
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      const pages = res.headers.get("x-atelier-pages"), assets = res.headers.get("x-atelier-assets");
      setExported(true); window.setTimeout(() => setExported(false), 4000);
      notify(`Archive téléchargée : ${pages ?? "?"} page${Number(pages) > 1 ? "s" : ""}, ${assets ?? "?"} média${Number(assets) > 1 ? "s" : ""}.`, "success");
    } catch (e) { notify(e instanceof Error ? e.message : "Export impossible"); } finally { setBusy(null); }
  };
  const setSetting = (path: string, value: unknown, lbl: string, coalesce = true) => commit({ op: "site.set", path, value }, { label: lbl, coalesceKey: coalesce ? path : undefined });
  const behind = state?.publishedVersion !== null && state?.publishedVersion !== undefined ? version - state.publishedVersion : null;
  const upToDate = behind === 0 && !dirty;

  return (
    <Dialog open onClose={onClose} title="Publier le site" width={640}>
      <div className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {state?.publishedVersion === null ? <Badge tone="warning">Jamais publié</Badge> : state ? <Badge tone={upToDate ? "success" : "accent"}>{upToDate ? "En ligne, à jour" : `En ligne : version ${state.publishedVersion}${behind ? ` · ${behind} changement${behind > 1 ? "s" : ""} depuis` : ""}`}</Badge> : <Badge>Lecture…</Badge>}
            {state?.publishedAt ? <span className="text-xs text-muted">publié le {when(state.publishedAt)}</span> : null}
            {broken ? <span className="text-xs text-danger">Enregistrement bloqué : rechargez la page avant de publier.</span> : dirty ? <span className="text-xs text-warning">Enregistrement en cours…</span> : null}
          </div>
          {state?.url ? <a href={state.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm text-accent hover:underline"><ExternalLink size={13} />{state.url}</a> : null}
          <div className="flex gap-1">
            <TextInput className="flex-1" value={label} placeholder="Note pour l'historique (facultatif) : « Nouvelle galerie mariages »" onValueChange={setLabel} />
            <Button variant="primary" icon={UploadCloud} disabled={!!busy || dirty || !!broken || !state} onClick={publish}>{busy ?? "Publier maintenant"}</Button>
          </div>
          <Hint>La publication fige le site et ses entrées tels qu&apos;ils sont maintenant. Continuer à travailler ne change rien en ligne tant que vous ne republiez pas.</Hint>
        </section>

        <section className="flex flex-col gap-2 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Site, adresse et référencement</h3>
          <FieldGroup>
            <Field label="Nom du site" hint="Nom de l'organisation ou de la personne : Open Graph, notifications, tableau de bord"><TextInput value={site.name} onValueChange={(v) => setSetting("name", v || "Site", "Nom du site")} /></Field>
            <Field label="Sous-domaine" hint="Lettres, chiffres et tirets. L'adresse complète apparaît ci-dessus après publication."><TextInput mono value={site.settings.subdomain ?? ""} placeholder={site.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase()} onValueChange={(v) => { const s = v.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+/, ""); setSetting("settings.subdomain", s || undefined, "Sous-domaine"); }} /></Field>
            <Field label="Suffixe des titres" hint="Ajouté après le titre de chaque page, par exemple « · Marie Lambert »"><TextInput value={site.settings.seo.titleSuffix?.[locale] ?? ""} onValueChange={(v) => setSetting(`settings.seo.titleSuffix.${locale}`, v || undefined, "Suffixe des titres")} /></Field>
            <Field label="Description" hint="Utilisée par défaut pour les pages qui n'en ont pas"><TextInput value={site.settings.seo.description?.[locale] ?? ""} onValueChange={(v) => setSetting(`settings.seo.description.${locale}`, v || undefined, "Description du site")} /></Field>
            <Field label="Image sociale" hint="Image de partage par défaut (Open Graph)" inline={false}><AssetPicker site={site} value={site.settings.seo.image} onChange={(id) => setSetting("settings.seo.image", id ?? undefined, "Image sociale", false)} /></Field>
            <Field label="Favicon" inline={false}><AssetPicker site={site} value={site.settings.seo.favicon} onChange={(id) => setSetting("settings.seo.favicon", id ?? undefined, "Favicon", false)} /></Field>
          </FieldGroup>
        </section>

        <section className="flex flex-col gap-2 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Page introuvable (404)</h3>
          {notFound ? <p className="text-sm text-muted">La page <strong className="font-medium text-ink">{notFound.name[locale] ?? notFound.path}</strong> (<span className="font-mono text-xs">{NOT_FOUND_PATH}</span>) s&apos;affiche quand une adresse n&apos;existe pas. Modifiez-la comme une autre page ; elle n&apos;est pas indexée.</p> : (
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" icon={Plus} onClick={() => commit({ op: "site.set", path: "pages", value: [...site.pages, notFoundPage(site)] }, { label: "Créer la page introuvable" })}>Créer la page introuvable</Button>
              <span className="text-xs text-muted">Sans elle, une adresse inconnue reçoit une page grise minimale. Toute page fixe à l&apos;adresse <span className="font-mono">{NOT_FOUND_PATH}</span> joue ce rôle.</span>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-2 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Redirections</h3>
          {site.redirects.length ? (
            <ul className="flex flex-col gap-1">
              {site.redirects.map((r, i) => (
                <li key={`${r.from}→${r.to}`} className="grid grid-cols-[1fr_1fr_auto_24px] items-center gap-1 text-xs">
                  <span className="font-mono truncate" title={r.from}>{r.from}</span>
                  <span className="font-mono truncate text-muted" title={r.to}>→ {r.to}</span>
                  <Toggle checked={r.permanent} label={r.permanent ? "définitive" : "temporaire"} title="Définitive (301) : les moteurs retiennent la nouvelle adresse. Temporaire (302) : ils gardent l'ancienne." onChange={(v) => setRedirects(site.redirects.map((x, k) => (k === i ? { ...x, permanent: v } : x)), "Type de redirection")} />
                  <IconButton size="sm" label="Retirer la redirection" icon={X} onClick={() => setRedirects(site.redirects.filter((_, k) => k !== i), "Retirer la redirection")} />
                </li>
              ))}
            </ul>
          ) : null}
          <form className="grid grid-cols-[1fr_1fr_auto] gap-1 items-center" onSubmit={(e) => { e.preventDefault(); addRedirect(); }}>
            <TextInput mono value={newRedirect.from} placeholder="/ancienne-adresse ou /blog/*" onValueChange={(v) => setNewRedirect((r) => ({ ...r, from: v.trim() }))} />
            <TextInput mono value={newRedirect.to} placeholder="/nouvelle-adresse, /actualites/* ou https://…" onValueChange={(v) => setNewRedirect((r) => ({ ...r, to: v.trim() }))} />
            <Button size="sm" icon={Plus} type="submit" disabled={!!redirectError || !newRedirect.from || !newRedirect.to}>Ajouter</Button>
          </form>
          {redirectError ? <span className="text-xs text-danger">{redirectError}</span> : <Hint>Quand une adresse change, redirigez l&apos;ancienne : les visiteurs et les moteurs suivent. <span className="font-mono">{"/*"}</span> à la fin redirige tout un dossier, <span className="font-mono">{"*"}</span> dans la destination reprend le reste de l&apos;adresse. Appliqué à la prochaine publication.</Hint>}
        </section>

        <section className="flex flex-col gap-2 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Code personnalisé</h3>
          <FieldGroup>
            <Field label="Dans <head>" hint="Balises meta, scripts d'analyse, polices tierces, vérification de domaine… inséré tel quel dans le head de chaque page publiée" inline={false}><TextArea className="font-mono text-xs min-h-[72px]" value={site.settings.head ?? ""} placeholder={'<script defer data-domain="exemple.fr" src="https://plausible.io/js/script.js"></script>'} onValueChange={(v) => setSetting("settings.head", v || undefined, "Code dans head")} spellCheck={false} /></Field>
            <Field label="Fin de <body>" hint="Scripts à charger après la page (chat, widgets)" inline={false}><TextArea className="font-mono text-xs min-h-[56px]" value={site.settings.bodyEnd ?? ""} onValueChange={(v) => setSetting("settings.bodyEnd", v || undefined, "Code en fin de body")} spellCheck={false} /></Field>
          </FieldGroup>
          <Hint>Ce code n&apos;est actif que sur le site publié et dans l&apos;export, jamais dans l&apos;éditeur. Un script mal formé peut casser l&apos;affichage : vérifiez la page publiée après coup.</Hint>
        </section>

        <section className="flex flex-col gap-2 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Exporter le code</h3>
          <div className="flex items-center gap-2">
            <Button variant={exported ? "primary" : "default"} icon={exported ? Check : Download} disabled={!!busy || !state} onClick={() => void exportCode()}>{exported ? "Téléchargé" : "Télécharger le site (.zip)"}</Button>
            <span className="text-xs text-muted">{state?.publishedVersion !== null && state?.publishedVersion !== undefined ? `Depuis la version publiée ${state.publishedVersion}` : "Depuis la version de travail (site jamais publié)"}</span>
          </div>
          <Hint>HTML complet page par page, feuille de style aux classes lisibles (les noms des calques), médias et données. À déposer tel quel sur n&apos;importe quel hébergement statique : le site vous appartient, sans Atelier.</Hint>
        </section>

        <section className="flex flex-col gap-1 border-t border-line pt-3">
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim flex items-center gap-1.5"><History size={12} />Historique</h3>
          {!state?.publications.length ? <p className="text-sm text-dim">Aucune publication pour l&apos;instant.</p> : (
            <ul className="flex flex-col">
              {state.publications.map((p) => {
                const live = p.version === state.publishedVersion;
                return (
                  <li key={p.version} className="flex items-center gap-2 h-8 text-sm">
                    <span className={`h-2 w-2 rounded-full ${live ? "bg-success" : "border border-line-strong"}`} title={live ? "En ligne" : undefined} />
                    <span className="font-mono text-xs text-muted w-16">v{p.version}</span>
                    <span className="text-xs text-muted w-32">{when(p.createdAt)}</span>
                    <span className="flex-1 truncate text-ink">{p.label ?? ""}</span>
                    {live ? <Badge tone="success">en ligne</Badge> : <Button size="sm" variant="ghost" disabled={!!busy} onClick={() => restore(p.version)}>Remettre en ligne</Button>}
                  </li>
                );
              })}
            </ul>
          )}
          <Hint>Remettre une version en ligne ne touche pas à l&apos;éditeur : vous continuez sur la version de travail, et vous republiez quand vous voulez.</Hint>
        </section>
      </div>
    </Dialog>
  );
}
