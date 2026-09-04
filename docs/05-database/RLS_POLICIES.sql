-- Enable RLS.
alter table public.guestbook_wishes enable row level security;

-- IMPORTANT:
-- If the application uses a server-only Supabase secret key through a
-- Next.js Route Handler, privileged database operations do not rely on
-- browser-side policies. Keep RLS enabled regardless.
--
-- If you later allow direct browser access with the publishable key,
-- create narrowly scoped SELECT/INSERT policies and never expose
-- unrestricted UPDATE/DELETE permissions.

-- Example public read policy for approved wishes only:
drop policy if exists "public can read approved wishes"
on public.guestbook_wishes;

create policy "public can read approved wishes"
on public.guestbook_wishes
for select
to anon, authenticated
using (is_approved = true);

-- Direct browser INSERT is intentionally not enabled by this baseline.
-- Prefer the Next.js API route so server-side validation and abuse
-- protection can be applied consistently.

-- Never create public UPDATE/DELETE policies for a public guestbook.
