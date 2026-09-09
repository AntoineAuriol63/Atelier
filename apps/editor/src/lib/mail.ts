/**
 * Notification par email (D47), par l'API HTTP de Resend. Sans `RESEND_API_KEY`, rien n'est envoyé : l'envoi reste enregistré.
 * Variables : RESEND_API_KEY, FORM_NOTIFY_TO (destinataire par défaut ; un formulaire peut avoir le sien, `props.notifyTo`), MAIL_FROM (expéditeur, « Atelier <onboarding@resend.dev> » par défaut pour les essais).
 */
export async function sendMail({ subject, text, replyTo, to: toOverride }: { subject: string; text: string; replyTo?: string; /** Destinataire(s) propres au formulaire ; à défaut `FORM_NOTIFY_TO`. */ to?: string }): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY, to = toOverride?.trim() || process.env.FORM_NOTIFY_TO;
  if (!key || !to) return { sent: false, error: "Notification non configurée (RESEND_API_KEY, FORM_NOTIFY_TO ou destinataire du formulaire)" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from: process.env.MAIL_FROM ?? "Atelier <onboarding@resend.dev>", to: to.split(",").map((s) => s.trim()).filter(Boolean), subject, text, reply_to: replyTo }),
    });
    if (!res.ok) return { sent: false, error: `Resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : "Envoi impossible" };
  }
}
