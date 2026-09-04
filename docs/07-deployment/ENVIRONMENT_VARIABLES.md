# Environment Variables

## Required (Vercel Production / Preview / Development)

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

| Variable | Where it is read | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Server only (`src/lib/supabase/server.ts`) | Project URL, e.g. `https://xxxx.supabase.co`. Prefix `NEXT_PUBLIC_` because Next inlines it at **build** time. |
| `SUPABASE_SECRET_KEY` | Server only | Dashboard secret / service key. **Never** prefix with `NEXT_PUBLIC_`. |

## Unused by this app

```env
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Optional leftover from the Supabase dashboard. The guestbook does **not** create a browser Supabase client. Do not put the secret key in this variable.

Older local files may still have `NEXT_PUBLIC_SUPABASE_ANON_KEY`; it is also unused.

## Rules

- `.env.local` must never be committed.
- `.env.example` may contain empty placeholders only.
- Server-only secrets must only be read from server-side code.
- If a secret was ever committed or shared, rotate it in the Supabase dashboard immediately.
- After changing `NEXT_PUBLIC_SUPABASE_URL` on Vercel, redeploy so the build picks it up.
