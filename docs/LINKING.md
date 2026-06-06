# Linking smartcashafrica-lp ↔ smartcashafrica-fe

## Architecture

| Project              | Role                  | Dev URL               |
| -------------------- | --------------------- | --------------------- |
| `smartcashafrica-lp` | Public marketing site | http://localhost:5174 |
| `smartcashafrica-fe` | Authenticated app     | http://localhost:5173 |

## Dev (works out of the box)

Defaults are baked in for local development — no `.env` required:

- LP CTAs → `http://localhost:5173/signup`, `/login`, `/terms`, `/privacy`
- App `/` → redirects to `http://localhost:5174` when logged out
- Auth pages logo → links back to the landing page

Run both together from the repo root:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:lp   # port 5174
npm run dev:app  # port 5173
```

## Production

Copy env examples and set your domains:

**smartcashafrica-lp/.env**

```env
VITE_APP_URL=https://app.smartcashafrica.com
```

**smartcashafrica-fe/.env**

```env
VITE_LP_URL=https://smartcashafrica.com
```

## Flow

```
Visitor → LP (5174) → Start Free → App /signup (5173)
Logged out → App / → redirect → LP (5174)
Auth pages → Logo → LP home
```
