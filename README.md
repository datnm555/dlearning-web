# dlearning-web

Kid-facing Vietnamese alphabet app (ages 4-5): React 19, Vite, TypeScript, react-router 7, vitest, oxlint. UI language Vietnamese by default (en available). Login required (demo account `sam` / `1`). No audio, free.

Backend: [`dlearning-api`](../dlearning-api) (`/api/v1/...`, pictures at `/images/letters/<slug>.svg`). The old `dlearning-be` contract is retired.

## Run against dlearning-api

1. Start the API (from `../dlearning-api`): `dotnet run --project api/src/AppHost`, or whichever way exposes it on `http://localhost:58080`.
2. `npm install && npm run dev`. The dev server proxies `/api` and `/images` to `http://localhost:58080`. Use another API address with `VITE_API_PROXY_TARGET` (see `.env.example`; put it in `.env.local`).
3. Open the printed URL and sign in with `sam` / `1` (or register: password 8-128 chars with at least one letter and one digit).

The API client uses the relative base `/api/v1`, so the browser never talks to the API host directly (no CORS).

## Screens

- `/login`, `/register` - username + password.
- `/` - grid of the 29 letter tiles (upper + lower).
- `/letter/:id` - full-screen letter card: big "B b", example pictures (emoji fallback if an image fails), word with the initial letter highlighted, prev/next arrows, swipe, keyboard arrows.

Hidden (code kept, not routed or linked, because their dlearning-be endpoints no longer exist): Home catalog, Animals, Colors, Counting, and the old sidebar `AppLayout`/`SidebarMenu`. See the comment in `src/presentation/router.tsx`.

## Scripts

`npm run dev` / `npm run build` / `npm run lint` / `npm test`.

## Docker

`docker build -t dlearning-web .` serves the SPA with nginx and proxies `/api/` and `/images/` to the upstream `http://api:8080` (compose service name `api`), with SPA fallback to `index.html`. Run it in the same compose network as the API service named `api`; nginx fails to start if `api` does not resolve.
