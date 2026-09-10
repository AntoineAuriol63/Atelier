"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

export type ConfirmOptions = { title: string; message?: ReactNode; /** Conséquences, une par ligne. */ consequences?: string[]; action: string; danger?: boolean; cancel?: string };
let opener: ((o: ConfirmOptions) => Promise<boolean>) | null = null;

/** Demande une confirmation dans un dialogue de l'éditeur (jamais celui du navigateur). Résout `false` si aucun fournisseur n'est monté. */
export function askConfirm(o: ConfirmOptions): Promise<boolean> { return opener ? opener(o) : Promise.resolve(false); }

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<{ o: ConfirmOptions; resolve: (v: boolean) => void } | null>(null);
  useEffect(() => {
    const open = (o: ConfirmOptions) => new Promise<boolean>((resolve) => setPending({ o, resolve }));
    opener = open;
    return () => { if (opener === open) opener = null; };
  }, []);
  const close = (v: boolean) => { pending?.resolve(v); setPending(null); };
  return (
    <>
      {children}
      {pending ? (
        <Dialog open onClose={() => close(false)} title={pending.o.title} width={460}>
          <div className="p-4 flex flex-col gap-3">
            {pending.o.message ? <p className="text-sm text-ink">{pending.o.message}</p> : null}
            {pending.o.consequences?.length ? <ul className="text-sm text-muted list-disc pl-5 flex flex-col gap-1">{pending.o.consequences.map((c, i) => <li key={i}>{c}</li>)}</ul> : null}
            <div className="flex justify-end gap-1 pt-1">
              {/* Une action dangereuse ne se déclenche pas par Entrée : le focus part sur Annuler. */}
              <Button variant="ghost" autoFocus={!!pending.o.danger} onClick={() => close(false)}>{pending.o.cancel ?? "Annuler"}</Button>
              <Button variant={pending.o.danger ? "danger" : "primary"} autoFocus={!pending.o.danger} onClick={() => close(true)}>{pending.o.action}</Button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}
