# SmartCash Africa — Backend

> **Status: Planned** — This folder is reserved for the API and server-side services. No implementation yet.

## Purpose

The backend will power authentication, financial data, and AI features for both the web app (`smartcashafrica-fe`) and the future mobile app (`smartcashafrica-mb`).

## Planned responsibilities

| Domain            | Capabilities                                            |
| ----------------- | ------------------------------------------------------- |
| **Auth**          | Sign up, login, password reset, session/JWT management  |
| **Accounts**      | Connect bank and mobile-money providers, balances, sync |
| **Transactions**  | Import, categorize, search, export                      |
| **Budgets**       | Category limits, alerts, spending analytics             |
| **Savings**       | Goals, contributions, progress tracking                 |
| **Health score**  | Financial wellness metrics and trends                   |
| **AI advisor**    | Personalized tips and coaching                          |
| **Notifications** | Push/email for budgets, security, milestones            |
| **Reports**       | PDF/CSV generation and history                          |

## API contract reference

Front-end domain types are defined in:

```
smartcashafrica-fe/src/types/finance.ts
```

Use these as a starting point for request/response schemas when implementing endpoints.

## Suggested stack (TBD)

Stack choice is not finalized. Common options for a fintech API in this ecosystem:

- **Runtime**: Node.js (Nest/Fastify) or Go
- **Database**: PostgreSQL (e.g. Neon, Supabase)
- **Auth**: Firebase Auth, Clerk, or custom JWT
- **Jobs**: Transaction sync, report generation (queue/cron)

Document the chosen stack here once the project is initialized.

## Local development

Not available until the service is scaffolded. When ready, this README should include:

```bash
# Example — update when implemented
cp .env.example .env
npm install
npm run dev
```

## Related docs

- [Monorepo overview](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [Web app](../smartcashafrica-fe/README.md)
