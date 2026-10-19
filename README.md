# Pulseboard — Personalized Content Dashboard

An interactive, preference-driven content dashboard built for the **SDE Intern – Frontend Development** assignment.

Users can browse a unified feed of **news**, **movie recommendations**, and **social posts**, customize categories, search with debounce, favorite items, reorder cards with drag-and-drop, and toggle dark mode. Preferences persist across reloads via **Redux Persist + localStorage**.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| State | Redux Toolkit + RTK Query + Redux Persist |
| Motion / DnD | Framer Motion, `@dnd-kit` |
| Testing | Vitest + React Testing Library, Playwright |
| APIs | NewsAPI, TMDB, mock social feed |

## Features

- **Personalized feed** from news + recommendations + social sources
- **Settings panel** for categories & display name (persisted)
- **Trending** and **Favorites** sections
- **Debounced search** across titles, descriptions, sources
- **Infinite scroll** pagination
- **Drag-and-drop** card reordering
- **Dark mode** via CSS variables + Tailwind
- **Loading / empty / error** UI states with Framer Motion transitions
- **API keys kept server-side** in Next.js route handlers

## Quick start

```bash
# from this folder
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The app works **out of the box with mock data**. Add API keys only if you want live NewsAPI / TMDB results.

### Optional live APIs

1. Copy `.env.example` → `.env.local`
2. Add keys:

```env
NEWS_API_KEY=your_newsapi_key
TMDB_API_KEY=your_tmdb_api_key
```

| Service | Free signup |
| --- | --- |
| NewsAPI | https://newsapi.org |
| TMDB | https://www.themoviedb.org/settings/api |

Social posts use a **mock API** (X/Twitter paid access is not required).

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # start production server
npm run lint         # ESLint
npm test             # unit + integration (Vitest)
npm run test:e2e     # Playwright E2E (starts dev server)
```

First-time Playwright setup:

```bash
npx playwright install chromium
```

## User flow

1. Land on **Personalized Feed** — mixed content cards load from `/api/content`.
2. Open **Settings** — pick categories (technology, sports, finance, …) and set your name.
3. Return to feed — content refreshes for your preferences.
4. Use the **search bar** — typing is debounced (~400ms) before querying.
5. Heart any card → view it under **Favorites**.
6. Drag cards by the grip handle to reorder the feed (order persisted).
7. Toggle **dark mode** from the header or settings.
8. Visit **Trending** for a short ranked list.

## Project structure

```text
src/
  app/                  # App Router pages + API routes
  components/           # UI (layout, feed, settings, …)
  store/                # Redux slices, RTK Query, persist
  lib/                  # constants, mock data, API fetchers
  hooks/                # useDebounce
  types/                # shared TypeScript types
  test/                 # Vitest setup + helpers
e2e/                    # Playwright specs
```

## Testing coverage

- **Unit**: preferences / favorites reducers, mock feed helpers, SearchBar debounce, ContentCard favorites, SettingsPanel
- **Integration**: ContentFeed success + empty API responses
- **E2E**: feed load, search, favorites, settings/dark mode, drag handles

## Security notes

- API keys are read only in server route handlers (`src/lib/api/fetchers.ts`)
- Never commit `.env.local`
- External links open with `rel="noopener noreferrer"`

## Deployment (optional live demo)

1. Push this folder to a public GitHub repo
2. Import into [Vercel](https://vercel.com)
3. Add `NEWS_API_KEY` / `TMDB_API_KEY` as project env vars (optional)
4. Deploy — share the production URL as your live demo

## Assignment checklist

- [x] Personalized feed + preferences
- [x] News + recommendations + social (mock) APIs
- [x] Interactive content cards + infinite scroll
- [x] Sidebar + header dashboard layout
- [x] Feed / Trending / Favorites sections
- [x] Debounced search
- [x] Drag-and-drop reordering
- [x] Dark mode
- [x] Animations / loading states
- [x] Redux Toolkit + RTK Query + persistence
- [x] Unit, integration, and E2E tests
- [x] README with setup + user flow

## License

MIT — created for internship evaluation.
