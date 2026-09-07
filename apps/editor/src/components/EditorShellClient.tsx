"use client";

import dynamic from "next/dynamic";
import type { Entry, Site } from "@atelier/model";

/**
 * La coquille de l'éditeur n'est rendue que dans le navigateur : elle dépend de réglages mémorisés
 * localement (mode, grille, largeur) et un pré-rendu côté serveur ferait diverger l'état et l'écran.
 */
const EditorShell = dynamic(() => import("./EditorShell").then((m) => m.EditorShell), {
  ssr: false,
  loading: () => <div className="h-full grid place-items-center text-sm text-dim">Ouverture de l&apos;éditeur…</div>,
});

export function EditorShellClient({ initialSite, initialVersion, initialEntries }: { initialSite: Site; initialVersion: number; initialEntries: Entry[] }) {
  return <EditorShell initialSite={initialSite} initialVersion={initialVersion} initialEntries={initialEntries} />;
}
