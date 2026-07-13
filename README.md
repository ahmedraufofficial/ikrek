# Ikrek

Learn Hungarian, 10 words a day. *Ikrek* means "twins" — every card is shown
twice: first with the question in English, then in Hungarian, both with the
same set of Hungarian responses.

**Live:** https://ahmedraufofficial.github.io/ikrek/

## Stack

- React 19 + TypeScript + Vite + Tailwind CSS v4
- Supabase (Postgres, Auth, RLS)
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Development

```sh
cp .env.example .env   # add your Supabase URL + anon key
npm install
npm run dev
```

## Database

Schema and seed content live in `supabase/migrations/`. Apply them in order
via the Supabase SQL Editor (or any Postgres client connected to the project).

Tables:

- `questions` — a prompt in both English and Hungarian
- `responses` — the ~5 Hungarian ways to answer a question
- `user_question_progress` — per-user state; `stage` starts at `introduced`
  so later stages (review, quiz) can be added without schema changes

## Learning model

- Max **10 new questions per day** (`NEW_PER_DAY` in `src/lib/types.ts`)
- Stage 1 (introduction): English card → Hungarian card → done
- Progress is per-user, enforced by row-level security
