# Technical Architecture

## Application

Next.js App Router.

## Rendering Strategy

Default:
- Server Components

Use Client Components for:
- countdown timer
- lightbox
- guestbook form
- clipboard interaction
- browser APIs
- interactive navigation where needed

## Suggested Layers

### Presentation
`src/components/`

### Page composition
`src/app/`

### Static domain data
`src/config/weddingData.ts`

Components must import wedding content only from `@/config/weddingData`.

### Application configuration
`src/config/`

### Shared types
`src/types/`

### Infrastructure
`src/lib/`

### API
`src/app/api/`

## Guestbook

Browser
→ `/api/guestbook`
→ validation
→ Supabase server client
→ PostgreSQL

Do not expose server secrets.

## Error Strategy

User-facing errors must be understandable.
Internal database details must be logged server-side only when appropriate.

## State Strategy

Do not add Redux or another global state library unless a concrete requirement
appears. Prefer:
- server data
- component state
- URL state where appropriate
