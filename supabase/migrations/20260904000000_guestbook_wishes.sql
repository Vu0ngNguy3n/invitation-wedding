-- Guestbook schema
-- Apply in Supabase SQL Editor or via the project's migration workflow.
-- Inserts are performed by the Next.js server with SUPABASE_SECRET_KEY
-- (bypasses RLS). Do not add a public INSERT policy.

create extension if not exists pgcrypto;

create table if not exists public.guestbook_wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  message text not null check (char_length(trim(message)) between 1 and 1000),
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_wishes_created_at_idx
  on public.guestbook_wishes (created_at desc);

create index if not exists guestbook_wishes_approved_created_at_idx
  on public.guestbook_wishes (is_approved, created_at desc);

alter table public.guestbook_wishes enable row level security;

drop policy if exists "public can read approved wishes"
on public.guestbook_wishes;

create policy "public can read approved wishes"
on public.guestbook_wishes
for select
to anon, authenticated
using (is_approved = true);
