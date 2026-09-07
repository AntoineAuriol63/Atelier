"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Plus, Trash2 } from "lucide-react";
import { Badge, Button, Hint, IconButton, TextInput } from "@/ui";
import { Segmented } from "@/ui/controls";
import { PRODUCT_NAME } from "@/lib/product";

export type DashboardSite = { id: string; name: string; version: number; updatedAt: string; publishedVersion: number | null; subdomain: string | null; owner: string | null; url: string | null };
const when = (iso: string) => (iso ? new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");

/** Les sites d'un compte : ouvrir, créer (vierge ou exemple), supprimer, voir en ligne. */
export function Dashboard({ sites, user }: { sites: DashboardSite[]; user: string | null }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<"blank" | "sample">("blank");
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
    if (!window.confirm(`Supprimer le site « ${s.name} » ? Son contenu, ses entrées et ses publications disparaissent. Cette action ne s'annule pas.`)) return;
    setBusy("Suppression…");
    try {
      const res = await fetch(`/api/sites/${s.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? "Suppression impossible");
      router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Suppression impossible"); } finally { setBusy(null); }
  };
  return (
    <div className="min-h-full bg-app text-ink">
      <header className="flex items-center gap-3 h-12 px-5 border-b border-line">
        <span className="font-semibold text-base tracking-tight">{PRODUCT_NAME}</span>
        <span className="text-sm text-dim">Vos sites</span>
        <span className="flex-1" />
        {user ? <><span className="text-xs text-muted">{user}</span><form method="post" action="/auth/deconnexion"><IconButton label="Se déconnecter" icon={LogOut} type="submit" /></form></> : <Badge>accès local</Badge>}
      </header>
      <main className="max-w-[960px] mx-auto p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium">{sites.length ? `${sites.length} site${sites.length > 1 ? "s" : ""}` : "Aucun site pour l'instant"}</h1>
          <span className="flex-1" />
          {!creating ? <Button variant="primary" icon={Plus} onClick={() => setCreating(true)}>Nouveau site</Button> : null}
        </div>
        {creating ? (
          <form className="flex flex-col gap-2 p-4 rounded-md border border-line bg-panel" onSubmit={(e) => { e.preventDefault(); void create(); }}>
            <TextInput autoFocus value={name} placeholder="Nom du site (Boulangerie Martin, Studio Rivière…)" onValueChange={setName} onKeyDown={(e) => { if (e.key === "Escape") setCreating(false); }} />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted">Partir de</span>
              <Segmented value={template} options={[{ value: "blank", label: "Site vierge" }, { value: "sample", label: "Exemple photographe" }]} onChange={(v) => { if (v) setTemplate(v as "blank" | "sample"); }} />
              <span className="flex-1" />
              <Button variant="ghost" type="button" onClick={() => setCreating(false)}>Annuler</Button>
              <Button variant="primary" type="submit" disabled={!name.trim() || !!busy}>{busy ?? "Créer et ouvrir"}</Button>
            </div>
            <Hint>Un site vierge a le thème de base, un en-tête, un pied de page et une page d&apos;accueil. L&apos;exemple photographe est complet : pages, base de projets, formulaire.</Hint>
          </form>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {sites.map((s) => (
            <li key={s.id} className="group rounded-md border border-line bg-panel p-4 flex flex-col gap-2 hover:border-line-strong">
              <div className="flex items-start gap-2">
                <Link href={`/sites/${s.id}`} className="flex-1 min-w-0 text-base font-medium text-ink hover:text-accent truncate">{s.name}</Link>
                <IconButton label="Supprimer le site" icon={Trash2} tone="danger" size="sm" className="opacity-0 group-hover:opacity-100" onClick={() => remove(s)} />
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
              <Link href={`/sites/${s.id}`} className="mt-1"><Button className="w-full">Ouvrir l&apos;éditeur</Button></Link>
            </li>
          ))}
        </ul>
        {!sites.length ? <Hint>Créez votre premier site avec « Nouveau site ».</Hint> : null}
      </main>
    </div>
  );
}
