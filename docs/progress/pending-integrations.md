# Pending Integrations

## Production API
- Implement API-backed repository classes under `src/repositories/api/` or `src/infrastructure/api/`.
- Map endpoints from the web platform:
  - `/api/auth/login`
  - `/api/auth/status`
  - `/api/water-scheme-data`
  - `/api/water-scheme-data/regional-stats`
  - `/api/chlorine`
  - `/api/pressure`
  - `/api/water-consumption`
  - `/api/communication-status`
  - `/api/helpdesk/tickets`
  - `/api/reports`
  - `/api/alerts-progress`

## Authentication
- Replace `MockAuthRepository` with an API implementation.
- Decide whether mobile will use session cookies, token auth, or a gateway-issued mobile token.
- Add secure storage for production auth tokens.

## PostgreSQL
- Keep PostgreSQL access behind the backend/API.
- Do not connect the mobile app directly to PostgreSQL.

## IoT / MQTT
- Add a live telemetry service only after backend support is confirmed.
- Mobile should subscribe to server-sent WebSocket or push channels, not raw MQTT broker credentials.

## GIS
- Replace the map readiness cards with `react-native-maps` polygons and scheme markers after map assets and API coordinates are finalized.
- Bundle Maharashtra GeoJSON for offline region boundaries.

## Offline Sync
- Wrap API repositories with cache-aware repositories.
- Process `SyncQueue` items for ticket creation, alert acknowledgement, and issue reports.

## Push Notifications
- Add Expo Notifications or FCM/APNs integration.
- Notification payloads should deep-link to:
  - Scheme details
  - Monitoring tab
  - Alert details
  - Ticket details

## Reports
- Add real download/share through `expo-file-system` and `expo-sharing`.
- Keep generation and heavy PDF/Excel processing server-side.
