# Dashboard9 Mobile

React Native (Expo) companion app for a Maharashtra rural water-supply monitoring platform. It was built during an internship at CS TECH Ai (Ceinsys Tech Ltd), Geospatial Solutions BU, in June 2026.

## App

Expo Router app with an auth flow and these sections:

- **Dashboard:** summary KPIs, scheme list, scheme detail
- **Monitoring:** LPCD, chlorine, pressure and water-consumption readings
- **Alerts:** threshold alerts and their acknowledgement status
- **Helpdesk:** raise an issue, track tickets
- **More:** regions, map, reports, admin summary, settings

### Architecture

- `src/domain`: entities
- `src/repositories`: repository interfaces with **mock** and **API** implementations, wired through a small DI container (`src/core/container.ts`). Screens never know where data comes from.
- `src/infrastructure`: environment config, cache manager, offline sync queue
- TanStack Query for fetching and pull-to-refresh, Zustand for the theme store, `@gorhom/bottom-sheet` for sheets

### Alert backend (`server/`)

An Express + PostgreSQL service for email alerts and acknowledgements.
- `GET /api/alerts`, `/api/alerts/summary`, `/api/alerts/distinct-dates`, `/api/alerts/:id`
- `/api/acknowledge`: status, lookup by token, and mark-as-acknowledged (`POST /:id/mark`, `POST /by-token/:token/mark`) SQL migrations are in `server/sql/`.

## Run

```bash
npm install && npx expo start
cd server && npm install && cp .env.example .env && npm run dev
```

## Contributors

- **Tanmay Gawade:** initial app, architecture, UI refresh (bottom sheets, theme store)
- **Aditi Garud:** navigation refactor, back buttons, layout fixes, and the PostgreSQL alert/acknowledgement backend with API integration
