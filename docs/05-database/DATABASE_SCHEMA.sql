-- Guestbook schema
-- Review and apply in Supabase SQL Editor / migration workflow.

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
