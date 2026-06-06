# SmartCash Africa

Premium personal finance management (PFM) platform for African users — budgets, savings goals, financial health scoring, and AI-powered coaching.

This repository is a **monorepo** with separate front-end apps today and reserved folders for backend and mobile clients.

## Projects

| Folder                                        | Status  | Role                          | Dev URL               |
| --------------------------------------------- | ------- | ----------------------------- | --------------------- |
| [`smartcashafrica-lp`](./smartcashafrica-lp/) | Active  | Public marketing landing page | http://localhost:5174 |
| [`smartcashafrica-fe`](./smartcashafrica-fe/) | Active  | Authenticated web application | http://localhost:5173 |
| [`smartcashafrica-be`](./smartcashafrica-be/) | Planned | API / backend services        | —                     |
| [`smartcashafrica-mb`](./smartcashafrica-mb/) | Planned | Mobile app (Flutter)          | —                     |

## Quick start

Install dependencies in each active project, then run both apps from the repo root:

```bash
cd smartcashafrica-lp && npm install && cd ..
cd smartcashafrica-fe && npm install && cd ..
npm run dev
```

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Landing page + app (ports 5174 and 5173) |
| `npm run dev:lp`    | Landing page only                        |
| `npm run dev:app`   | App only                                 |
| `npm run build`     | Production build for both front-ends     |
| `npm run build:lp`  | Build landing page                       |
| `npm run build:app` | Build app                                |

## Architecture

```
Visitor
   │
   ▼
smartcashafrica-lp  ──CTA──►  smartcashafrica-fe
(marketing site)               (authenticated PFM app)
   ▲                                │
   └──────── logged-out / ──────────┘
```

- **Landing page** drives acquisition: hero, pricing, features, FAQ.
- **Web app** handles auth, onboarding, and day-to-day money management.
- Cross-links are configured via `VITE_APP_URL` (LP → app) and `VITE_LP_URL` (app → LP).

See [docs/LINKING.md](./docs/LINKING.md) for dev defaults and production env setup.  
See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for structure, data flow, and conventions.

## Tech stack (active projects)

| Layer   | Choice                                                    |
| ------- | --------------------------------------------------------- |
| UI      | React 19, TypeScript                                      |
| Build   | Vite 6–8                                                  |
| Styling | Tailwind CSS 4                                            |
| Routing | React Router 7 (app only)                                 |
| Charts  | Recharts (app only)                                       |
| Icons   | Lucide React                                              |
| i18n    | Custom context + locale files (`en`, `fr`; app also `wo`) |

Auth and financial data are **client-side mock implementations** today (`localStorage`). The backend project will replace these with real APIs.

## Design system

Shared brand tokens across LP and app:

| Token             | Value     |
| ----------------- | --------- |
| Primary (Emerald) | `#00A86B` |
| Navy              | `#0F172A` |
| Accent (Blue)     | `#2563EB` |
| Background        | `#F8FAFC` |
| Font              | Inter     |

## Repository layout

```
smart-cash-africa/
├── package.json          # Root scripts (dev, build)
├── docs/
│   ├── ARCHITECTURE.md   # System design & conventions
│   └── LINKING.md        # LP ↔ app URL configuration
├── smartcashafrica-lp/   # Marketing site
├── smartcashafrica-fe/   # Web application
├── smartcashafrica-be/   # Backend (placeholder)
└── smartcashafrica-mb/   # Mobile (placeholder)
```

## Documentation index

- [Landing page](./smartcashafrica-lp/README.md)
- [Web app](./smartcashafrica-fe/README.md)
- [Backend](./smartcashafrica-be/README.md) *(planned)*
- [Mobile](./smartcashafrica-mb/README.md) *(planned)*
- [LP ↔ App linking](./docs/LINKING.md)
- [Architecture](./docs/ARCHITECTURE.md)

## Production deployment

1. Build each front-end: `npm run build:lp` and `npm run build:app`.
2. Deploy `smartcashafrica-lp/dist` to the marketing domain (e.g. `smartcashafrica.com`).
3. Deploy `smartcashafrica-fe/dist` to the app domain (e.g. `app.smartcashafrica.com`).
4. Set environment variables per [docs/LINKING.md](./docs/LINKING.md).

## License

Private — all rights reserved.
