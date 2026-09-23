"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import type { Finding, Site } from "@atelier/model";
import { checkup, checkupSummary, indexSite } from "@atelier/model";
import { Badge, Button, Eyebrow } from "@/ui";
import { nodeLabel } from "@/components/node-icons";

const localName = (v: Record<string, string> | undefined, locale: string) => v?.[locale] ?? (v ? Object.values(v)[0] : undefined) ?? "";

/**
 * Le bilan avant publication dans la fenêtre Publier (23 septembre 2026) : ce que le document permet de vérifier sans rien d'externe,
 * en une phrase de comptes, la liste derrière, chaque constat menant à sa page, son élément ou aux réglages. Rien ne bloque.
 */
export function CheckupSection({ site, onGoTo }: { site: Site; /** Aller à la cible d'un constat (page, élément, ou réglages du site). */ onGoTo: (f: Finding) => void }) {
  const [open, setOpen] = useState(false);
  const { findings, summary } = useMemo(() => {
    const all = checkup(site).sort((a, b) => (a.level === b.level ? 0 : a.level === "fix" ? -1 : 1));
    return { findings: all, summary: checkupSummary(all) };
  }, [site]);
  const index = useMemo(() => (open ? indexSite(site) : null), [open, site]);
  const locale = site.settings.defaultLocale;
  const targetLabel = (f: Finding): string => {
    if (f.nodeId) {
      const n = index?.get(f.nodeId)?.node;
      // Une image sans nom se reconnaît par celui de son fichier : « Image « Aurèle » » plutôt que « Image ».
      const asset = n?.type === "image" && !n.name && typeof n.props.asset === "string" ? site.assets.find((a) => a.id === n.props.asset) : undefined;
      if (n) return asset?.name ? `Image « ${asset.name} »` : nodeLabel(n);
    }
    if (f.pageId) { const p = site.pages.find((x) => x.id === f.pageId); if (p) return `Page « ${localName(p.name, locale) || p.path} »`; }
    return "Réglages du site";
  };
  return (
    <section className="flex flex-col gap-2 border-t border-line pt-3" data-checkup="">
      <Eyebrow as="h3" className="flex items-center gap-1.5"><ClipboardCheck size={12} />Bilan avant publication</Eyebrow>
      <div className="flex items-center gap-2 flex-wrap">
        {summary.fix ? <Badge tone="danger">{summary.fix} à corriger</Badge> : null}
        {summary.look ? <Badge tone="warning">{summary.look} à regarder</Badge> : null}
        <span className={`text-sm ${findings.length ? "text-ink" : "text-dim"}`}>{findings.length ? summary.sentence : "Rien à signaler : textes alternatifs, titres, liens, polices et réglages sont en ordre."}</span>
        {findings.length ? <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>{open ? "Masquer" : "Voir le détail"}</Button> : null}
      </div>
      {open ? (
        <ul className="flex flex-col gap-1.5" data-checkup-list="">
          {findings.map((f, i) => (
            <li key={`${f.rule}-${f.nodeId ?? f.pageId ?? i}`} data-checkup-item={f.level} className="flex items-start gap-2 text-sm">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${f.level === "fix" ? "bg-danger" : "bg-warning"}`} aria-hidden />
              <span className="flex-1 leading-snug text-ink">{f.message}</span>
              <button type="button" className="shrink-0 max-w-40 truncate text-xs text-accent hover:underline" title="Y aller" onClick={() => onGoTo(f)}>{targetLabel(f)}</button>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-xs text-muted">Un bilan calculé à partir du document, sans mesure en ligne. Rien n&apos;empêche de publier.</p>
    </section>
  );
}
