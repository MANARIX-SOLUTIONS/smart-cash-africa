# SmartCash Africa — Landing Page

Premium fintech landing page for SmartCash Africa, built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the page.

## Build

```bash
npm run build
npm run preview
```

## Linked to smartcashafrica-fe

| LP (this project)     | App                   |
| --------------------- | --------------------- |
| http://localhost:5174 | http://localhost:5173 |

Dev defaults connect automatically. For production, copy `.env.example` → `.env` and set `VITE_APP_URL`.

Sign In, Start Free, Pricing, Terms, and Privacy link to the app. See [docs/LINKING.md](../docs/LINKING.md).

## Languages

French and English are supported. Use the globe switcher in the header to change language. The choice is saved in `localStorage` and defaults to French when the browser language is French.

Translation files:

- `src/lib/i18n/en.ts`
- `src/lib/i18n/fr.ts`

## Design System

| Token             | Value     |
| ----------------- | --------- |
| Primary (Emerald) | `#00A86B` |
| Navy              | `#0F172A` |
| Accent (Blue)     | `#2563EB` |
| Background        | `#F8FAFC` |
| Font              | Inter     |

## Sections

1. Header (sticky, glassmorphism)
2. Hero with dashboard mockup
3. Trust metrics with animated counters
4. Problem / Solution
5. Features grid
6. How It Works (3-step timeline)
7. AI Advisor showcase (dark section)
8. Financial Health Score widget
9. Testimonials carousel
10. Security
11. Pricing (Free + Premium)
12. Final CTA
13. Footer
