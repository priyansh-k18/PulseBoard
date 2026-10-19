# Pulseboard — Personalized Content Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20%2B%20Playwright-brightgreen)](https://vitest.dev/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

An interactive, preference-driven content dashboard built for the **Software Development Engineer (SDE) Intern – Frontend Development** assignment.

Users can browse a unified, multi-source feed of **news**, **movie recommendations**, and **social posts**, customize content categories, search across sources with debounce, bookmark favorites, reorder cards interactively with drag-and-drop, stream real-time updates via **Server-Sent Events (SSE)**, switch between demo user personas, toggle languages (EN / ES / FR), and switch between dark and light themes.

---

## 🚀 Live Demo & Vercel Deployment

This project is pre-configured for zero-friction **Vercel deployment**.

### One-Click Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import**.
3. Select your repository.
4. Framework Preset will automatically detect **Next.js**.
5. *(Optional)* Add environment variables (the app works 100% out of the box with built-in mock fallback if omitted):
   - `NEWS_API_KEY`: *(Optional)* Your NewsAPI key
   - `TMDB_API_KEY`: *(Optional)* Your TMDB API key
6. Click **Deploy**.

> 💡 **No API keys needed to test**: The dashboard includes high-fidelity fallback mock data and a simulated real-time SSE event pipeline, ensuring reviewers can evaluate all features immediately without registering external accounts.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, Server Actions/Route Handlers) |
| **Library** | React 19 (Hooks, Concurrent Features, useSyncExternalStore) |
| **Language** | TypeScript 5 (Strict Mode) |
| **State Management** | Redux Toolkit, RTK Query, Redux Persist (localStorage engine) |
| **Styling & Tokens** | Tailwind CSS v4, CSS Custom Properties / Design Tokens |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| **Motion & Animation** | Framer Motion |
| **Real-Time Data** | Server-Sent Events (SSE) via `/api/realtime` |
| **Internationalization** | Multi-language engine (English, Spanish, French) |
| **Unit & Integration Testing** | Vitest, React Testing Library, JSDOM |
| **E2E Testing** | Playwright (Headless Chromium) |

---

## ✨ Features Checklist

### 1. Core Feed & Personalization
- [x] **Multi-source Unified Feed**: Merges news headlines, movie/entertainment recommendations, and social media posts into a chronological or curated feed.
- [x] **User Preferences**: Select favorite categories (*Technology, Sports, Finance, Entertainment, Health, Science*) from the Settings panel.
- [x] **Persistent State**: User preferences, custom order, dark mode, language, and saved favorites persist across browser reloads via Redux Persist.
- [x] **Infinite Scrolling**: Auto-fetches next pages using an optimized `IntersectionObserver` sentinel.
- [x] **Interactive Content Cards**: High-res media, category tags, timestamps, source badges, external CTA links ("Read More", "Play Now", "View Thread"), and favorite buttons.

### 2. User Dashboard Layout
- [x] **Responsive Shell**: Collapsible mobile drawer navigation + permanent desktop sidebar.
- [x] **Top Header**: Global search bar, language switcher, theme toggle, and account profile button.
- [x] **Dedicated Sections**:
  - **Personalized Feed**: Main content stream with real-time SSE integration.
  - **Trending Now**: Top-ranked items across active categories with numbered ranking badges (#1, #2, etc.).
  - **Your Favorites**: Saved cards with bulk clear functionality.
  - **Preferences & Settings**: Category toggles, display name editor, theme options, and language switcher.

### 3. Search Functionality
- [x] **Debounced Search**: 400ms debounce hook (`useDebounce`) to avoid excessive queries while the user types.
- [x] **Multi-field Filtering**: Matches titles, descriptions, categories, and source publishers.

### 4. Advanced UI/UX
- [x] **Drag-and-Drop Card Reordering**: Interactive reordering powered by `@dnd-kit` with keyboard and touch accessibility constraints. Reordered order persists across sessions.
- [x] **Dark Mode Toggle**: Instant switching using CSS custom properties (`--background`, `--surface`, `--accent`) with zero hydration flash.
- [x] **Smooth Transitions & Animations**: Section transitions, spinner loaders, empty state animations, and card hover lifts via Framer Motion.

### 5. Bonus Features
- [x] **Real-Time Live Updates (Server-Sent Events)**: `/api/realtime` route streams real-time updates. The UI shows a live connection badge with a pause/resume toggle and an interactive "✨ N new live posts arrived" banner that injects items into the feed.
- [x] **Mock Authentication & Profile Customization**: Multi-persona switcher (*Alex Morgan - AI Tech Lead*, *Sarah Chen - Media Curator*, *David Kim - Fintech Analyst*) plus custom profile editor and guest sign-in/out.
- [x] **Internationalization (i18n)**: One-click language switching between **English (EN)**, **Español (ES)**, and **Français (FR)** for all navigation and settings controls.

---

## 🏃 Quick Start (Local Development)

### Prerequisites
- Node.js `>= 18.18.0` (Recommended: Node 20 or Node 22)
- npm `>= 9.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/priyansh-k18/PulseBoard.git
cd personalized-content-dashboard

# Install dependencies (configured with .npmrc)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables (Optional)

Create a `.env.local` file in the root directory:

```env
# Optional: Add keys for live external API data
NEWS_API_KEY=your_newsapi_org_key
TMDB_API_KEY=your_tmdb_api_key
```

| Provider | Purpose | Free Key Link |
| :--- | :--- | :--- |
| **NewsAPI** | Live world & tech headlines | [newsapi.org](https://newsapi.org) |
| **TMDB** | Movie & entertainment recommendations | [themoviedb.org](https://www.themoviedb.org/settings/api) |

> When keys are omitted, the application automatically uses comprehensive mock fixtures from `src/lib/mock-data.ts`.

---

## 🧪 Testing Suite

### Unit & Integration Tests (Vitest + React Testing Library)

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch
```

Coverage includes:
- `authSlice.test.ts`: Persona switching, login/logout, profile updates
- `preferencesSlice.test.ts`: Category selection, normalization, default resets
- `favoritesSlice.test.ts`: Add, remove, toggle, clear favorites
- `mock-data.test.ts`: Feed filtering, search matching, pagination
- `SearchBar.test.tsx`: Typing, debouncing, clear button
- `ContentCard.test.tsx`: Card rendering, CTA links, favorite toggle
- `SettingsPanel.test.tsx`: Preference toggles, name changes
- `ContentFeed.integration.test.tsx`: API data fetching, loading and empty states

### End-to-End (E2E) Tests (Playwright)

```bash
# Install browsers (first time only)
npx playwright install chromium

# Run all E2E tests headless
npm run test:e2e

# Run with interactive Playwright UI
npm run test:e2e:ui
```

Playwright tests cover:
1. Personalized feed loading and card visibility
2. Debounced search input and filtering results
3. Favorites toggling and favorites view verification
4. Settings panel updates (display name, categories, dark mode)
5. Drag-and-drop sortable handles

### Linting & Type Checking

```bash
# ESLint check (0 errors, 0 warnings)
npm run lint

# TypeScript production build check
npm run build
```

---

## 📁 Project Architecture

```text
├── .npmrc                     # Peer dependency configuration for Vercel/CI
├── vercel.json                # Vercel deployment framework configuration
├── eslint.config.mjs          # Flat ESLint configuration (Next.js + TypeScript)
├── next.config.ts             # Next.js 16 configuration (Turbopack, image domains)
├── vitest.config.mts          # Vitest testing configuration
├── playwright.config.ts       # Playwright E2E configuration
├── e2e/
│   └── dashboard.spec.ts      # End-to-end user flow specifications
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── content/       # Unified multi-source content route
    │   │   ├── news/          # NewsAPI proxy route
    │   │   ├── realtime/      # Server-Sent Events (SSE) live updates route
    │   │   ├── recommendations/# TMDB proxy route
    │   │   └── social/        # Social feed proxy route
    │   ├── globals.css        # CSS variables & Tailwind v4 theme configuration
    │   ├── layout.tsx         # Root HTML layout with Google fonts & providers
    │   └── page.tsx           # Home page mounting the Dashboard shell
    ├── components/
    │   ├── auth/              # Mock authentication modal & persona switcher
    │   ├── favorites/         # Favorites section view
    │   ├── feed/              # ContentFeed, ContentCard, SortableFeed, RealtimeBanner
    │   ├── layout/            # DashboardShell, Header, Sidebar
    │   ├── search/            # Debounced SearchBar
    │   ├── settings/          # SettingsPanel with category and appearance controls
    │   ├── trending/          # Trending section with ranked items
    │   └── ui/                # LanguageSelector, ThemeToggle, LoadingSpinner, EmptyState
    ├── hooks/                 # Custom React hooks (useDebounce)
    ├── lib/                   # API fetchers, constants, i18n dictionaries, mock data
    ├── store/                 # Redux Toolkit store, RTK Query API, slices, persistence
    └── types/                 # Shared TypeScript interfaces and types
```

---

## 🔒 Security Best Practices

- **Zero Client-Side Leaks**: All third-party API keys (`NEWS_API_KEY`, `TMDB_API_KEY`) are read strictly in Next.js Server Route Handlers and never exposed to client bundles.
- **Safe External Navigation**: All outbound links use `target="_blank"` with `rel="noopener noreferrer"`.
- **Hydration Safe**: Store initialization uses `useSyncExternalStore` and deterministic server render passes to avoid hydration mismatch flashes.

---

## 📄 License

MIT — Created for SDE Intern Frontend Development Assignment.
