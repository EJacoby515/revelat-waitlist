import { NextResponse } from "next/server";
import { isValidEmail, saveEntry } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { email, role } = (body ?? {}) as { email?: unknown; role?: unknown };

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const normalizedRole =
    role === "seller" || role === "buyer" ? role : undefined;

  try {
    const result = await saveEntry({
      email: email.trim().toLowerCase(),
      role: normalizedRole,
      source: "waitlist-landing",
    });
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Couldn't save right now. Try again shortly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, persisted: result.persisted });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Couldn't save right now. Try again shortly." },
      { status: 500 },
    );
  }
}
