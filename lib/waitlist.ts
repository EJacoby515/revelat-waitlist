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

// Branded "you're in" email. Best-effort: any failure is swallowed so a flaky
// mail send never blocks a signup. Sends only when RESEND_API_KEY is present
// (and the revelat.live domain is verified in Resend). From/reply-to default to
// hello@revelat.live, which forwards to the team inbox via ImprovMX.
const FROM = process.env.RESEND_FROM || "REVÉLAT <hello@revelat.live>";
const REPLY_TO = process.env.RESEND_REPLY_TO || "hello@revelat.live";

function confirmationHtml(entry: WaitlistEntry): string {
  const seller = entry.role === "seller";
  const lead = seller
    ? "You're on the founding-seller list. The first cohort gets reduced fees for life — we'll reach out before launch to get your catalog ready."
    : "You're on the early-access list. We'll let you know the moment the first live shows open for bidding.";
  return `<!doctype html><html><body style="margin:0;background:#0D0D0D;font-family:Georgia,serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 0;">
    <tr><td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
        <tr><td style="padding:0 24px 24px;">
          <div style="font-size:22px;letter-spacing:6px;color:#D4AF37;font-weight:bold;">REV&Eacute;LAT</div>
        </td></tr>
        <tr><td style="padding:0 24px;">
          <h1 style="margin:0 0 16px;color:#ffffff;font-size:32px;line-height:1.1;">You're in.</h1>
          <p style="margin:0 0 20px;color:#CCCCCC;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;">${lead}</p>
          <p style="margin:0 0 28px;color:#999999;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;">The fashion show where everything is for sale. Sellers model their pieces live; the moment an item goes on, the auction opens. You bid while it's on screen.</p>
          <a href="https://revelat.live" style="display:inline-block;background:#D4AF37;color:#0D0D0D;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:999px;">Visit revelat.live</a>
        </td></tr>
        <tr><td style="padding:36px 24px 0;border-top:1px solid #1A1A1A;">
          <p style="margin:24px 0 0;color:#666666;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;">You're receiving this because you joined the REV&Eacute;LAT waitlist. Reply to this email to reach a human.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendConfirmation(entry: WaitlistEntry): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: entry.email,
        reply_to: REPLY_TO,
        subject: "You're on the REVÉLAT list.",
        html: confirmationHtml(entry),
      }),
    });
  } catch {
    // best-effort; signup already persisted
  }
}

export async function saveEntry(entry: WaitlistEntry): Promise<SinkResult> {
  // 1) Supabase table (shared with the main app). Writes via the service-role
  // key server-side; RLS blocks everyone else. Duplicate email is a no-op, not
  // an error — the signer is "on the list" either way.
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        // ignore-duplicates: rely on the UNIQUE(email) constraint; return=minimal
        // skips the row read-back so the service role needs no SELECT.
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({
        email: entry.email,
        role: entry.role ?? null,
        source: entry.source ?? null,
      }),
    });
    if (res.ok || res.status === 409) return { ok: true, persisted: true };
    return { ok: false, error: `Supabase error (${res.status})` };
  }

  // 2) Resend Audiences (https://resend.com/docs/api-reference/contacts)
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

  // 3) Generic webhook (Zapier / n8n / your own endpoint)
  if (process.env.WAITLIST_WEBHOOK_URL) {
    const res = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, ts: Date.now() }),
    });
    if (res.ok) return { ok: true, persisted: true };
    return { ok: false, error: `Webhook error (${res.status})` };
  }

  // 4) Dev fallback — no provider configured. Accept the signup so the UX works
  // end-to-end locally, but make clear it is NOT persisted anywhere.
  console.warn(
    `[waitlist] no sink configured — entry accepted but NOT persisted: ${entry.email} (${entry.role ?? "any"})`,
  );
  return { ok: true, persisted: false };
}
