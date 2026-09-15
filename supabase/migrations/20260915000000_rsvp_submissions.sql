-- RSVP / attendance confirmation schema
-- Apply in Supabase SQL Editor or via the project's migration workflow.
-- Inserts are performed by the Next.js server with SUPABASE_SECRET_KEY
-- (bypasses RLS). Do not add a public INSERT or SELECT policy.
-- RSVP records are private planning data, not public guestbook wishes.

create extension if not exists pgcrypto;

create table if not exists public.rsvp_submissions (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) between 1 and 80),
  attendance text not null check (attendance in ('attending', 'declined')),
  attendee_count integer not null,
  guest_of text not null check (guest_of in ('bride', 'groom', 'both')),
  message text check (
    message is null or char_length(trim(message)) between 1 and 1000
  ),
  created_at timestamptz not null default now(),
  constraint rsvp_attendee_count_matches_attendance check (
    (attendance = 'declined' and attendee_count = 0)
    or (attendance = 'attending' and attendee_count between 1 and 4)
  )
);

create index if not exists rsvp_submissions_created_at_idx
  on public.rsvp_submissions (created_at desc);

create index if not exists rsvp_submissions_attendance_created_at_idx
  on public.rsvp_submissions (attendance, created_at desc);

alter table public.rsvp_submissions enable row level security;
