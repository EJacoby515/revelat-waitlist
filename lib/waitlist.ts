// Pluggable waitlist sink. Picks a destination based on which env vars are set,
// so the same code runs locally (no-op) and in production (real provider)
// without edits. Add a branch here to wire your provider of choice.

export type WaitlistEntry = {
  email: string;
  role?: "seller" | "buyer";
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

export type SinkResult = { ok: true; persisted: boolean } | { ok: false; error: string };

export async function saveEntry(entry: WaitlistEntry): Promise<SinkResult> {
  // 1) Resend Audiences (https://resend.com/docs/api-reference/contacts)
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    const res = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: entry.email, unsubscribed: false }),
      },
    );
    // Resend returns 201 on create; 409/422 when the contact already exists —
    // both are "on the list" from the user's perspective.
    if (res.ok || res.status === 409 || res.status === 422) {
      return { ok: true, persisted: true };
    }
    return { ok: false, error: `Resend error (${res.status})` };
  }

  // 2) Generic webhook (Zapier / n8n / your own endpoint)
  if (process.env.WAITLIST_WEBHOOK_URL) {
    const res = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, ts: Date.now() }),
    });
    if (res.ok) return { ok: true, persisted: true };
    return { ok: false, error: `Webhook error (${res.status})` };
  }

  // 3) Dev fallback — no provider configured. Accept the signup so the UX works
  // end-to-end locally, but make clear it is NOT persisted anywhere.
  console.warn(
    `[waitlist] no sink configured — entry accepted but NOT persisted: ${entry.email} (${entry.role ?? "any"})`,
  );
  return { ok: true, persisted: false };
}
