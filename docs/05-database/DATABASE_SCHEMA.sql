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

-- RSVP schema (private planning data; no public SELECT/INSERT policies)
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

