# SmartCash Africa — Landing Page

Premium fintech marketing site for SmartCash Africa. Single-page experience built with React, TypeScript, Vite, and Tailwind CSS.

Part of the [SmartCash Africa monorepo](../README.md). The authenticated app lives in [`smartcashafrica-fe`](../smartcashafrica-fe/).

## Stack

| Technology   | Version / notes          |
| ------------ | ------------------------ |
| React        | 19                       |
| Vite         | 8                        |
| TypeScript   | 6                        |
| Tailwind CSS | 4                        |
| Lucide React | Icons                    |
| ESLint       | Linting (`npm run lint`) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174).

Run **both** LP and app from the repo root:

```bash
cd .. && npm run dev
```

Web app: [http://localhost:5173](http://localhost:5173).

## Scripts

| Script            | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Dev server on port 5174                |
| `npm run build`   | Typecheck + production build → `dist/` |
| `npm run preview` | Preview production build               |
| `npm run lint`    | ESLint                                 |

## Environment

Copy `.env.example` → `.env` for production:

```env
VITE_APP_URL=https://app.smartcashafrica.com
```

Dev default: `http://localhost:5173` (no `.env` required).

CTAs (Sign In, Start Free, Pricing, Terms, Privacy) use `src/lib/links.ts` → `appLinks`.

## Project structure

```
src/
├── main.tsx              # I18nProvider, DemoProvider
├── App.tsx               # Section composition (single page)
├── components/
│   ├── layout/           # Header (sticky), Footer
│   ├── sections/         # Marketing sections (see below)
│   └── ui/               # Button, Reveal, counters, mockup
├── context/
│   ├── I18nContext.tsx   # en, fr
│   └── DemoContext.tsx   # Demo modal state
├── hooks/
│   ├── useInView.ts      # Scroll reveal triggers
│   ├── useAnimatedCounter.ts
│   └── useActiveSection.ts # Nav highlight on scroll
└── lib/
    ├── links.ts          # App URLs (signup, login, legal)
    ├── utils.ts          # cn() helper
    └── i18n/             # en.ts, fr.ts
```

See [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) for LP ↔ app flow.

## Page sections (scroll order)

| #   | Section                  | Component         |
| --- | ------------------------ | ----------------- |
| 1   | Hero + dashboard mockup  | `Hero`            |
| 2   | Partner logos            | `PartnerStrip`    |
| 3   | Trust metrics (animated) | `Trust`           |
| 4   | Problem / solution       | `ProblemSolution` |
| 5   | Features grid            | `Features`        |
| 6   | How it works (3 steps)   | `HowItWorks`      |
| 7   | AI advisor (dark)        | `AIAdvisor`       |
| 8   | Financial health widget  | `FinancialHealth` |
| 9   | Testimonials carousel    | `Testimonials`    |
| 10  | Security                 | `Security`        |
| 11  | Pricing (Free + Premium) | `Pricing`         |
| 12  | FAQ                      | `FAQ`             |
| 13  | Final CTA                | `FinalCTA`        |
| 14  | Footer                   | `Footer`          |

Global chrome: `Header` (glassmorphism, language switcher), `ScrollProgress`, skip link for a11y.

## Linked to smartcashafrica-fe

| LP (this project)     | App                   |
| --------------------- | --------------------- |
| http://localhost:5174 | http://localhost:5173 |

| LP action            | App destination |
| -------------------- | --------------- |
| Start Free / Sign up | `/signup`       |
| Sign In              | `/login`        |
| Terms                | `/terms`        |
| Privacy              | `/privacy`      |

Full linking guide: [docs/LINKING.md](../docs/LINKING.md).

## Languages

French and English. Header globe switcher; choice saved in `localStorage`.  
Defaults to French when the browser language is French.

Translation files:

- `src/lib/i18n/en.ts`
- `src/lib/i18n/fr.ts`

Add keys under nested objects; access via `useTranslation()` and `t('key.path')`.

## UX details

- **Scroll progress** — Top bar shows read progress
- **Reveal animations** — Sections animate in on scroll (`useInView`)
- **Animated counters** — Trust metrics count up when visible
- **Demo modal** — Interactive product preview (`DemoContext`)
- **Active nav** — Header links highlight current section

## Design system

| Token             | Value     |
| ----------------- | --------- |
| Primary (Emerald) | `#00A86B` |
| Navy              | `#0F172A` |
| Accent (Blue)     | `#2563EB` |
| Background        | `#F8FAFC` |
| Font              | Inter     |

Matches the web app for a consistent brand.

## Build & deploy

```bash
npm run build
```

Deploy `dist/` to the marketing host (e.g. `smartcashafrica.com`).  
Set `VITE_APP_URL` to the app domain at build time.

## Related docs

- [Monorepo overview](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [LP ↔ App linking](../docs/LINKING.md)
- [Web app](../smartcashafrica-fe/README.md)
