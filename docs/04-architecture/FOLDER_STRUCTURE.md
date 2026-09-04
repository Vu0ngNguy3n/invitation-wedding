# Folder Structure

```text
.
├── CLAUDE.md
├── docs/
├── public/
│   ├── images/
│   └── textures/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── guestbook/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── decorative/
│   │   ├── hero/
│   │   ├── couple/
│   │   ├── save-the-date/
│   │   ├── countdown/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── guestbook/
│   │   ├── gifts/
│   │   └── thank-you/
│   ├── config/
│   │   └── weddingData.ts
│   ├── lib/
│   │   └── supabase/
│   ├── types/
│   │   └── wedding.ts
│   └── utils/
├── supabase/
│   └── migrations/
├── .env.example
└── package.json
```

Keep the structure pragmatic. Do not create folders that do not have a real
architectural purpose.
