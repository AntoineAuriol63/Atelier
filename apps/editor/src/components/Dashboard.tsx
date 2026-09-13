"use client";
import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Plus, Trash2 } from "lucide-react";
import { Badge, Button, ConfirmProvider, Hint, IconButton, TextInput, askConfirm } from "@/ui";
import { PRODUCT_NAME } from "@/lib/product";

export type DashboardSite = { id: string; name: string; version: number; updatedAt: string; publishedVersion: number | null; subdomain: string | null; owner: string | null; url: string | null; role?: "owner" | "editor" | "writer" };
const when = (iso: string) => (iso ? new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");

/** Les sites d'un compte : ouvrir, créer (vierge ou exemple), supprimer, voir en ligne. */
const TEMPLATES: { id: "blank" | "sample" | "restaurant"; label: string; text: string; sketch: React.ReactNode }[] = [
  { id: "blank", label: "Site vierge", text: "Thème de base, en-tête, pied de page, une page d'accueil.", sketch: <><i className="h-1.5 w-10 bg-line-strong rounded-full" /><i className="h-6 w-full bg-surface rounded-xs" /><i className="h-1.5 w-full bg-line rounded-full" /></> },
  { id: "sample", label: "Exemple photographe", text: "Pages, base de projets, galeries, formulaire de contact.", sketch: <><i className="h-1.5 w-10 bg-line-strong rounded-full" /><span className="grid grid-cols-3 gap-1 w-full"><i className="aspect-square bg-accent/40 rounded-xs" /><i className="aspect-square bg-accent/25 rounded-xs" /><i className="aspect-square bg-accent/40 rounded-xs" /></span><i className="h-1.5 w-2/3 bg-line rounded-full" /></> },
  { id: "restaurant", label: "Exemple restaurant", text: "Carte en base de données, événements, réservation, animations.", sketch: <><i className="h-1.5 w-10 bg-line-strong rounded-full" /><span className="flex gap-1 w-full"><i className="h-8 flex-1 bg-warning/40 rounded-xs" /><span className="flex-1 flex flex-col gap-1"><i className="h-1.5 w-full bg-line rounded-full" /><i className="h-1.5 w-3/4 bg-line rounded-full" /><i className="h-3 w-10 bg-accent/60 rounded-full" /></span></span></> },
];

/** Choix du modèle de site : trois cartes esquissées, pas une liste aveugle. */
function TemplatePicker({ value, onChange }: { value: string; onChange: (t: "blank" | "sample" | "restaurant") => void }) {
  return (
    <div role="radiogroup" aria-label="Modèle de site" className="grid gap-2 w-full" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
      {TEMPLATES.map((t) => (
        <button key={t.id} type="button" role="radio" aria-checked={value === t.id} onClick={() => onChange(t.id)} className={`flex flex-col gap-2 p-3 rounded-md border text-left transition-colors ${value === t.id ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-line-strong"}`}>
          <span aria-hidden className="flex flex-col gap-1.5 p-2 rounded-xs bg-panel border border-line h-16 justify-start">{t.sketch}</span>
          <span className="text-sm font-medium text-ink">{t.label}</span>
          <span className="text-xs text-muted leading-snug">{t.text}</span>
        </button>
      ))}
    </div>
  );
}

export function Dashboard({ sites, user }: { sites: DashboardSite[]; user: string | null }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<"blank" | "sample" | "restaurant">("blank");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const create = async () => {
    const n = name.trim();
    if (!n) return;
    setBusy("Création…"); setError(null);
    try {
      const res = await fetch("/api/sites", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: n, template }) });
      const body = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !body.id) throw new Error(body.error ?? "Création impossible");
      router.push(`/sites/${body.id}`);
    } catch (e) { setError(e instanceof Error ? e.message : "Création impossible"); setBusy(null); }
  };
  const remove = async (s: DashboardSite) => {
    if (!(await askConfirm({ title: `Supprimer le site « ${s.name} » ?`, consequences: ["Son contenu, ses entrées et ses publications disparaissent.", "Cette action ne s'annule pas."], action: "Supprimer le site", danger: true }))) return;
    setBusy("Suppression…");
    try {
      const res = await fetch(`/api/sites/${s.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? "Suppression impossible");
      router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Suppression impossible"); } finally { setBusy(null); }
  };
  return (
    <ConfirmProvider><div className="min-h-full bg-app text-ink">
      <header className="flex items-center gap-3 h-14 px-6 border-b border-line bg-panel">
        <span className="font-semibold text-lg tracking-tight">{PRODUCT_NAME}</span>
        <span className="text-sm text-dim">Vos sites</span>
        <span className="flex-1" />
        {user ? <><span className="text-xs text-muted">{user}</span><form method="post" action="/auth/deconnexion"><IconButton label="Se déconnecter" icon={LogOut} type="submit" /></form></> : <Badge>accès local</Badge>}
      </header>
      <main className="max-w-[1180px] mx-auto p-6 lg:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{sites.length ? `${sites.length} site${sites.length > 1 ? "s" : ""}` : "Aucun site pour l'instant"}</h1>
          <span className="flex-1" />
          {!creating ? <Button variant="primary" icon={Plus} onClick={() => setCreating(true)}>Nouveau site</Button> : null}
        </div>
        {creating ? (
          <form className="flex flex-col gap-2 p-4 rounded-md border border-line bg-panel" onSubmit={(e) => { e.preventDefault(); void create(); }}>
            <TextInput autoFocus value={name} placeholder="Nom du site (Boulangerie Martin, Studio Rivière…)" onValueChange={setName} onKeyDown={(e) => { if (e.key === "Escape") setCreating(false); }} />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted">Partir de</span>
<TemplatePicker value={template} onChange={setTemplate} />
              <span className="flex-1" />
              <Button variant="ghost" type="button" onClick={() => setCreating(false)}>Annuler</Button>
              <Button variant="primary" type="submit" disabled={!name.trim() || !!busy}>{busy ?? "Créer et ouvrir"}</Button>
            </div>
            <Hint>Un site vierge a le thème de base, un en-tête, un pied de page et une page d&apos;accueil. L&apos;exemple photographe est complet : pages, base de projets, formulaire. L&apos;exemple restaurant va plus loin : carte et événements en bases, page par événement, réservation, composants avec variantes, apparitions au défilement.</Hint>
          </form>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <ul className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {sites.map((s) => (
            <li key={s.id} className="group rounded-md border border-line bg-panel p-5 min-h-[180px] flex flex-col gap-3 shadow-sm transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-lg">
              <div className="flex items-start gap-2">
                <Link href={`/sites/${s.id}`} className="flex-1 min-w-0 text-base font-semibold text-ink hover:text-accent truncate">{s.name}</Link>
                {s.role && s.role !== "owner" ? <Badge tone="accent" title={s.role === "writer" ? "Partagé avec vous : vous écrivez le contenu" : "Partagé avec vous : vous pouvez tout modifier sauf le partage"}>{s.role === "writer" ? "rédacteur" : "éditeur"}</Badge> : <IconButton label="Supprimer le site" icon={Trash2} tone="danger" size="sm" className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100" onClick={() => remove(s)} />}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                {s.publishedVersion !== null ? <Badge tone="success">en ligne{s.publishedVersion !== s.version ? ` · v${s.publishedVersion}` : ""}</Badge> : <Badge>non publié</Badge>}
                {s.publishedVersion !== null && s.publishedVersion !== s.version ? <span>{s.version - s.publishedVersion} changement{s.version - s.publishedVersion > 1 ? "s" : ""} à publier</span> : null}
              </div>
              <div className="flex items-center gap-2 text-2xs text-dim">
                <span>modifié le {when(s.updatedAt)}</span>
                <span className="flex-1" />
                {s.url ? <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-accent"><ExternalLink size={11} />voir le site</a> : null}
              </div>
              <Link href={`/sites/${s.id}`} className="mt-auto pt-1"><Button className="w-full">Ouvrir l&apos;éditeur</Button></Link>
            </li>
          ))}
        </ul>
        {!sites.length && !creating ? (
          <div className="flex flex-col items-center gap-4 py-10 rounded-md border border-dashed border-line-strong text-center">
            <p className="text-sm text-muted max-w-[46ch]">Aucun site pour l&apos;instant. Choisissez un point de départ : chaque modèle s&apos;ouvre dans l&apos;éditeur, prêt à être modifié.</p>
            <TemplatePicker value={template} onChange={(t) => { setTemplate(t); setCreating(true); }} />
          </div>
        ) : null}
      </main>
    </div></ConfirmProvider>
  );
}
