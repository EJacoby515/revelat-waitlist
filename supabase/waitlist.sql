-- REVÉLAT waitlist table. Run once in the Supabase SQL Editor (same project as
-- the main app). RLS is ON with no policies, so the anon/authenticated keys
-- cannot touch it — only the service-role key (used server-side by the waitlist
-- API route) can read/write. Service role bypasses RLS by design.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text check (role in ('seller', 'buyer')),
  source     text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;
-- Intentionally NO policies: locks out anon + authenticated. Server uses the
-- service-role key, which bypasses RLS.
