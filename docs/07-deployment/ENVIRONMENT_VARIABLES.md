# Environment Variables

## Public / browser-safe

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (and the older `NEXT_PUBLIC_SUPABASE_ANON_KEY` alias) is not read by this app. The guestbook server client uses only the project URL plus the server secret.

## Server-only

```env
SUPABASE_SECRET_KEY=
```

The exact key naming may be adjusted to match the installed Supabase
integration, but any secret key MUST NOT start with `NEXT_PUBLIC_`.

## Rules

- `.env.local` must never be committed.
- `.env.example` may contain empty placeholders only.
- Server-only secrets must only be read from server-side code.
- If a secret was ever committed or shared, rotate it in the Supabase dashboard immediately.
