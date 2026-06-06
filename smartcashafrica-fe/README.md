# SmartCash Africa

Premium Personal Finance Management (PFM) web application for African users.

## Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- React Router
- Recharts
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (app).

The public marketing site lives in `smartcashafrica-lp` on [http://localhost:5174](http://localhost:5174). Run both from the repo root with `npm run dev`. See [docs/LINKING.md](../docs/LINKING.md).

## Build

```bash
npm run build
npm run preview
```

## Features

- **Authentication** — Login, signup, forgot password with protected routes
- **Onboarding** — 4-step wizard (welcome, connect accounts, set goals, complete)
- **Demo mode** — Skip auth with one-click demo account
- Dark / light / system theme (persisted in localStorage)
- Collapsible sidebar + mobile drawer navigation
- Route-level code splitting with skeleton loaders
- Animated dashboard counters
- Quick Add modal (income, expense, account, goal)
- Full Settings sections (profile, security, accounts, notifications, language, theme)

## Auth Flow

1. Visit `/` → redirects to the marketing landing page (`smartcashafrica-lp`)
2. Sign up or **Try Demo Account** → dashboard
3. New signups → `/onboarding` → `/dashboard`
4. Sign out via profile menu or Settings

## UX Highlights

- **Command palette** — press `⌘K` to search pages, transactions, accounts
- **Quick Add** — record income/expense with real forms + toast feedback
- **Toast notifications** — success/error/info feedback on actions
- **Dark-mode charts** — Recharts tooltips and axes adapt to theme
- **Landing page** — external marketing site (`smartcashafrica-lp`)

## Pages

### Public
- **/** — Redirects to marketing landing page (when `VITE_LP_URL` is set)
- **/login**, **/signup**, **/forgot-password** — Authentication
- **/terms**, **/privacy** — Legal pages

### App (protected)
- **/dashboard** — Financial overview, charts, AI insights
- **/accounts** — Account list
- **/accounts/:id** — Account detail with activity
- **/accounts/connect** — Connect bank or mobile money
- **/transactions** — Searchable transaction table
- **/transactions/:id** — Transaction detail & receipt
- **/budgets** — Visual category budgeting
- **/budgets/:id** — Budget category detail & weekly chart
- **/savings** — Savings goals list
- **/savings/new** — Create new goal
- **/savings/:id** — Goal detail & contributions
- **/health** — Financial wellness score
- **/advisor** — AI financial coach
- **/reports** — Report library
- **/reports/:id** — Report viewer & export
- **/notifications** — Notification timeline
- **/help** — FAQ, resources, contact form
- **/settings/:section** — Profile, security, accounts, notifications, language, theme, subscription
- **/onboarding** — New user setup wizard

## Design System

| Token      | Value     |
| ---------- | --------- |
| Primary    | `#00A86B` |
| Navy       | `#0F172A` |
| Accent     | `#2563EB` |
| Background | `#F8FAFC` |
| Font       | Inter     |
