"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, History, UploadCloud } from "lucide-react";
import type { CommitOptions, Op, Site } from "@atelier/model";
import { Badge, Button, Dialog, Field, FieldGroup, Hint, TextInput } from "@/ui";
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
    if (!window.confirm(`Remettre en ligne la version ${v} ? Le site public affichera cet état, l'éditeur ne change pas.`)) return;
    setBusy("Retour arrière…");
    try {
      const res = await fetch(`/api/sites/${site.id}/publish/restore`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: v }) });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Retour arrière impossible");
      notify(`Version ${v} remise en ligne.`, "success"); await load();
    } catch (e) { notify(e instanceof Error ? e.message : "Retour arrière impossible"); } finally { setBusy(null); }
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
          <h3 className="text-2xs uppercase tracking-[0.12em] text-dim">Adresse et référencement du site</h3>
          <FieldGroup>
            <Field label="Sous-domaine" hint="Lettres, chiffres et tirets. L'adresse complète apparaît ci-dessus après publication."><TextInput mono value={site.settings.subdomain ?? ""} placeholder={site.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase()} onValueChange={(v) => { const s = v.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+/, ""); setSetting("settings.subdomain", s || undefined, "Sous-domaine"); }} /></Field>
            <Field label="Suffixe des titres" hint="Ajouté après le titre de chaque page, par exemple « · Marie Lambert »"><TextInput value={site.settings.seo.titleSuffix?.[locale] ?? ""} onValueChange={(v) => setSetting(`settings.seo.titleSuffix.${locale}`, v || undefined, "Suffixe des titres")} /></Field>
            <Field label="Description" hint="Utilisée par défaut pour les pages qui n'en ont pas"><TextInput value={site.settings.seo.description?.[locale] ?? ""} onValueChange={(v) => setSetting(`settings.seo.description.${locale}`, v || undefined, "Description du site")} /></Field>
            <Field label="Image sociale" hint="Image de partage par défaut (Open Graph)" inline={false}><AssetPicker site={site} value={site.settings.seo.image} onChange={(id) => setSetting("settings.seo.image", id ?? undefined, "Image sociale", false)} /></Field>
            <Field label="Favicon" inline={false}><AssetPicker site={site} value={site.settings.seo.favicon} onChange={(id) => setSetting("settings.seo.favicon", id ?? undefined, "Favicon", false)} /></Field>
          </FieldGroup>
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
