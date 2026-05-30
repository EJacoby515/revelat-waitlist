"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm({ role }: { role?: "seller" | "buyer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Try again.");
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/[0.08] px-5 py-4"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
          ✓
        </span>
        <p className="text-sm text-text2">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="min-h-[52px] flex-1 rounded-full border border-border2 bg-surface px-5 text-base text-white outline-none transition focus:border-gold/70"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-[52px] rounded-full bg-gold px-7 text-[15px] font-bold tracking-wide text-black transition hover:bg-goldHi disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Request access"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-text4">
        No spam. Early access, founding-seller perks, and launch news only.
      </p>
    </form>
  );
}
