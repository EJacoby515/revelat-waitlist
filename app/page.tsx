import WaitlistForm from "@/components/WaitlistForm";

function Wordmark() {
  return (
    <span className="font-display text-xl font-black tracking-[0.18em] text-white">
      REV<span className="text-gold">É</span>LAT
    </span>
  );
}

const STEPS = [
  {
    n: "01",
    t: "They put it on",
    d: "A seller models a piece live on camera — a jacket, a bag, a pair of boots.",
  },
  {
    n: "02",
    t: "AI opens the auction",
    d: "Vision recognition matches the item to their catalog and opens bidding automatically. No auctioneer.",
  },
  {
    n: "03",
    t: "You bid in real time",
    d: "Watch, bid, and win while the item is on screen. Bids update instantly across every viewer.",
  },
  {
    n: "04",
    t: "They move on, it closes",
    d: "The moment they take it off, the auction closes and the next piece begins. The show never stops.",
  },
];

const FAQ = [
  {
    q: "What is REVÉLAT?",
    a: "A live-auction app for fashion. Sellers model their clothing and accessories on camera; AI recognizes each item and opens bidding the instant it's worn. Think a live runway where everything on the model is for sale.",
  },
  {
    q: "How is this different from other live-shopping apps?",
    a: "No auctioneer and no manual product tagging. The seller just performs — vision recognition opens and closes each auction as items come on and off. The show is the storefront.",
  },
  {
    q: "Who is it for?",
    a: "Resellers, vintage curators, and boutique sellers who want to sell live without running an auction by hand — and buyers who want the thrill of a live drop with real bidding.",
  },
  {
    q: "When does it launch?",
    a: "We're onboarding founding sellers now and opening to buyers shortly after. Join the waitlist for first access and founding-seller perks.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Wordmark />
        <a
          href="#waitlist"
          className="rounded-full border border-gold/50 px-4 py-2 text-xs font-bold tracking-wide text-gold transition hover:bg-gold/10"
        >
          Get early access
        </a>
      </header>

      {/* Hero */}
      <section className="bg-aurora relative">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-16 text-center sm:pt-24">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Live fashion auctions · iOS, Android &amp; web
          </p>
          <h1 className="animate-fade-up mt-6 font-display text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-7xl">
            The fashion show where
            <br />
            <span className="gold-text animate-shimmer">everything is for sale.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-text2">
            Sellers model their pieces live. The moment an item goes on, AI opens
            the auction. You bid while it's on screen. When they move on, it
            closes. No auctioneer — just the performance.
          </p>

          <div
            id="waitlist"
            className="mx-auto mt-10 max-w-xl scroll-mt-24"
          >
            <WaitlistForm />
          </div>

          <p className="animate-fade-up mt-8 text-sm text-text3">
            Founding sellers get reduced fees for life. Limited spots.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Wear it. Watch it sell.
          </h2>
          <p className="mt-4 text-text2">
            The whole transaction happens inside the live stream — no listing
            forms mid-show, no waiting.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-border bg-surface/60 p-6 transition hover:border-gold/40"
            >
              <span className="font-display text-3xl font-black text-gold/80">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text3">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two audiences */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-transparent p-8 sm:p-10">
            <h3 className="font-display text-3xl font-bold text-white">
              For sellers
            </h3>
            <p className="mt-4 text-text2">
              Turn a live try-on into a sales channel. Upload your catalog once;
              every time you wear a piece on stream, its auction opens itself.
              Get paid on a rail built for marketplaces.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text2">
              <li>— No manual tagging or auctioneering during the show</li>
              <li>— Instant, race-free bidding across thousands of viewers</li>
              <li>— Founding-seller fee perks for the first cohort</li>
            </ul>
            <a
              href="#waitlist"
              className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-goldHi"
            >
              Become a founding seller
            </a>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-red/30 bg-gradient-to-br from-red/[0.10] to-transparent p-8 sm:p-10">
            <h3 className="font-display text-3xl font-bold text-white">
              For buyers
            </h3>
            <p className="mt-4 text-text2">
              The thrill of a live drop with the fairness of a real auction. See
              the piece worn, in motion, in real light — then bid while it's
              still on screen.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text2">
              <li>— Watch items modeled live before you bid</li>
              <li>— Real-time bids, anti-snipe, no fake countdowns</li>
              <li>— Win, pay, and ship from one place</li>
            </ul>
            <a
              href="#waitlist"
              className="mt-8 inline-block rounded-full border border-red/60 px-6 py-3 text-sm font-bold text-red transition hover:bg-red/10"
            >
              Get on the buyer list
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center font-display text-4xl font-bold text-white">
          Questions
        </h2>
        <div className="mt-10 divide-y divide-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-left text-lg font-semibold text-white">
                {f.q}
                <span className="ml-4 text-gold transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-text3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-aurora border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
            Be in the room when it opens.
          </h2>
          <p className="mt-4 text-text2">
            Join the waitlist for early access and founding-seller perks.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Wordmark />
          <p className="text-xs text-text4">
            © {new Date().getFullYear()} REVÉLAT. The fashion show where
            everything is for sale.
          </p>
        </div>
      </footer>
    </main>
  );
}
