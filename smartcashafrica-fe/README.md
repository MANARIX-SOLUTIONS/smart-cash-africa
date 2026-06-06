# SmartCash Africa — Web App

Premium personal finance management (PFM) web application for African users.

Part of the [SmartCash Africa monorepo](../README.md). The public marketing site lives in [`smartcashafrica-lp`](../smartcashafrica-lp/).

## Stack

| Technology   | Version / notes |
| ------------ | --------------- |
| React        | 19              |
| Vite         | 6               |
| TypeScript   | 5.8             |
| Tailwind CSS | 4               |
| React Router | 7               |
| Recharts     | 2.x             |
| Lucide React | Icons           |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Run **both** LP and app from the repo root:

```bash
cd .. && npm run dev
```

Marketing site: [http://localhost:5174](http://localhost:5174).  
See [docs/LINKING.md](../docs/LINKING.md) for cross-project URLs.

## Scripts

| Script            | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Dev server on port 5173                |
| `npm run build`   | Typecheck + production build → `dist/` |
| `npm run preview` | Preview production build               |

## Environment

Copy `.env.example` → `.env` for production:

```env
VITE_LP_URL=https://smartcashafrica.com
```

Dev default: `http://localhost:5174` (no `.env` required).

## Project structure

```
src/
├── main.tsx              # App bootstrap & providers
├── App.tsx               # Route definitions (lazy-loaded)
├── components/
│   ├── auth/             # Layout, ProtectedRoute, PublicRoute
│   ├── layout/           # AppLayout, Sidebar, TopNav
│   ├── search/           # Command palette (⌘K)
│   ├── charts/           # Sparklines
│   └── ui/               # Shared UI primitives
├── context/
│   ├── AuthContext.tsx   # Session (localStorage)
│   ├── AppDataContext.tsx# Financial data (localStorage)
│   ├── ThemeContext.tsx  # light / dark / system
│   ├── I18nContext.tsx   # en, fr, wo
│   └── ToastContext.tsx  # Action toasts
├── pages/                # One folder per route screen
├── hooks/                # useChartTheme, etc.
├── lib/
│   ├── mock-data.ts      # Seed accounts & transactions
│   ├── data-helpers.ts   # Budgets, health score
│   ├── export.ts         # CSV export
│   ├── links.ts          # Landing page URLs
│   └── i18n/             # Translation catalogs
└── types/
    └── finance.ts        # Domain models
```

See [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) for data flow and conventions.

## Features

- **Authentication** — Login, signup, forgot password; protected routes
- **Demo mode** — One-click demo account (no password)
- **Onboarding** — 4-step wizard (welcome → connect → goals → complete)
- **Dashboard** — Overview charts, animated counters, AI insights
- **Accounts** — List, detail, connect bank / mobile money
- **Transactions** — Searchable table, detail view, CSV export
- **Budgets** — Category limits with weekly charts
- **Savings goals** — Create, track, contribute
- **Financial health** — Wellness score and breakdown
- **AI advisor** — Coaching interface
- **Reports** — Library and detail with export
- **Notifications** — Timeline with read/unread state
- **Settings** — Profile, security, accounts, notifications, language, theme
- **Command palette** — `⌘K` to jump to pages and records
- **Quick Add** — Income, expense, account, goal from anywhere
- **Themes** — Dark / light / system (persisted)
- **i18n** — English, French, Wolof

## Auth flow

```
/ (logged out)  →  redirect to LP (5174)
/login, /signup →  dashboard or /onboarding
Demo account    →  dashboard (skip onboarding optional)
Sign out        →  /login
```

1. Visit `/` → redirects to marketing site when logged out
2. Sign up or **Try Demo Account** → dashboard
3. New signups → `/onboarding` → `/dashboard`
4. Sign out via profile menu or Settings

## Routes

### Public

| Path               | Page             |
| ------------------ | ---------------- |
| `/`                | Home (redirect)  |
| `/login`           | Login            |
| `/signup`          | Sign up          |
| `/forgot-password` | Password reset   |
| `/terms`           | Terms of service |
| `/privacy`         | Privacy policy   |

### Protected (requires auth)

| Path                 | Page                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `/onboarding`        | New user wizard                                                           |
| `/dashboard`         | Financial overview                                                        |
| `/accounts`          | Account list                                                              |
| `/accounts/:id`      | Account detail                                                            |
| `/accounts/connect`  | Connect provider                                                          |
| `/transactions`      | Transaction list                                                          |
| `/transactions/:id`  | Transaction detail                                                        |
| `/budgets`           | Budget categories                                                         |
| `/budgets/:id`       | Category detail                                                           |
| `/savings`           | Savings goals                                                             |
| `/savings/new`       | Create goal                                                               |
| `/savings/:id`       | Goal detail                                                               |
| `/health`            | Financial wellness                                                        |
| `/advisor`           | AI coach                                                                  |
| `/reports`           | Report library                                                            |
| `/reports/:id`       | Report viewer                                                             |
| `/notifications`     | Notifications                                                             |
| `/help`              | FAQ & contact                                                             |
| `/settings/:section` | profile, security, accounts, notifications, language, theme, subscription |

## Data layer (current)

No backend yet. Persistence uses `localStorage`:

| Key                     | Data                                         |
| ----------------------- | -------------------------------------------- |
| `smartcash-user`        | Current user                                 |
| `smartcash-onboarded`   | Onboarding flag                              |
| `smartcash-app-data`    | Transactions, accounts, goals, notifications |
| `smartcash-preferences` | Language, theme, alerts                      |
| `smartcash-profile`     | Phone, country                               |

`AppDataContext` exposes CRUD helpers used by pages and Quick Add.

## Internationalization

Locales: `en`, `fr`, `wo`.  
Add or edit strings in `src/lib/i18n/{locale}.ts`.  
Use `useTranslation()` and dot-path keys (e.g. `dashboard.title`).

## Design system

| Token      | Value     |
| ---------- | --------- |
| Primary    | `#00A86B` |
| Navy       | `#0F172A` |
| Accent     | `#2563EB` |
| Background | `#F8FAFC` |
| Font       | Inter     |

## Build & deploy

```bash
npm run build
```

Deploy the `dist/` folder to your app host (e.g. `app.smartcashafrica.com`).  
Set `VITE_LP_URL` to the marketing domain at build time.

## Related docs

- [Monorepo overview](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [LP ↔ App linking](../docs/LINKING.md)
- [Landing page](../smartcashafrica-lp/README.md)
