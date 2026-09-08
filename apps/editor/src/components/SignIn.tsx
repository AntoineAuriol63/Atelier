"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { Button, Hint, TextInput } from "@/ui";
import { PRODUCT_NAME } from "@/lib/product";

const ERRORS: Record<string, string> = {
  "non-autorise": "Cette adresse n'est pas autorisée sur cet Atelier.",
  "lien-invalide": "Ce lien de connexion n'est plus valable. Demandez-en un nouveau.",
  "autre-navigateur": "Ce lien a été demandé depuis un autre navigateur. Demandez un nouveau lien ici, et ouvrez-le depuis ce même navigateur.",
};

/** Connexion par lien magique : on saisit son adresse, on reçoit un lien, on est connecté. */
export function SignIn() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(params.get("erreur") ? ERRORS[params.get("erreur")!] ?? params.get("erreur") : null);
  const submit = async () => {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/auth/otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, suite: params.get("suite") ?? "/" }) });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Envoi impossible");
      setSent(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Envoi impossible"); } finally { setBusy(false); }
  };
  return (
    <div className="min-h-full grid place-items-center bg-app text-ink p-6">
      <div className="w-full max-w-[380px] flex flex-col gap-4 p-6 rounded-md border border-line bg-panel">
        <div><div className="font-semibold text-lg tracking-tight">{PRODUCT_NAME}</div><div className="text-sm text-muted">Connexion à vos sites</div></div>
        {sent ? (
          <div className="flex flex-col gap-2"><p className="text-sm">Un lien de connexion vient de partir vers <strong>{email}</strong>. Ouvrez-le depuis ce même appareil.</p><Hint>Rien reçu ? Regardez les courriers indésirables, ou renvoyez un lien dans une minute.</Hint><Button variant="ghost" onClick={() => setSent(false)}>Autre adresse</Button></div>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
            <TextInput autoFocus type="email" value={email} placeholder="votre@adresse.fr" onValueChange={setEmail} />
            <Button variant="primary" type="submit" icon={Mail} disabled={busy || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}>{busy ? "Envoi…" : "Recevoir un lien de connexion"}</Button>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Hint>Pas de mot de passe : le lien reçu par email vous connecte.</Hint>
          </form>
        )}
      </div>
    </div>
  );
}
