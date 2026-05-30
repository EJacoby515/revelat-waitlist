-- REVÉLAT waitlist table. Run once in the Supabase SQL Editor (same project as
-- the main app). This project's PostgREST exposes the `api` schema, so the table
-- MUST live in `api` for the REST endpoint (/rest/v1/waitlist) to find it.
--
-- RLS is ON with no policies, so anon/authenticated keys cannot touch it — only
-- the service-role key (used server-side by the waitlist API route) can, since
-- service_role bypasses RLS.

create table if not exists api.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text check (role in ('seller', 'buyer')),
  source     text,
  created_at timestamptz not null default now()
);

alter table api.waitlist enable row level security;
-- Intentionally NO policies: locks out anon + authenticated.

grant usage on schema api to service_role;
grant all privileges on api.waitlist to service_role;

-- Refresh PostgREST's schema cache so the new table is queryable immediately.
notify pgrst, 'reload schema';
