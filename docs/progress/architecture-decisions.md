# Architecture Decisions

## 2026-06-18

### React Native Foundation
- Created an Expo + TypeScript application inside `dashboard9-mobile/`.
- Used Expo Router for file-based navigation because the mobile implementation plan recommends deep-linkable native routes and the web platform is route-centric.
- Kept all new work inside `dashboard9-mobile/`; `dashboard9/` was used as read-only reference.

### Layering
- Implemented clean boundaries:
  - `src/domain/` for source-shaped entities.
  - `src/repositories/interfaces/` for data contracts.
  - `src/repositories/mock/` for current mock data access.
  - `src/infrastructure/api/` for future production API wiring.
  - `src/infrastructure/storage/` for cache and sync queue readiness.
  - `src/screens/` and `src/components/` for presentation.
- Screens consume hooks and repository contracts, not mock arrays directly.

### Data Model Fidelity
- The implementation plan used some simplified camelCase model examples.
- Actual `dashboard9/shared/schema.ts` uses snake_case column names, so mobile entities preserve production field names such as `scheme_id`, `village_name`, `lpcd_value_day1`, `chlorine_value_1`, `pressure_value_1`, `ticket_id`, `specific_issue`, and `agency_type`.
- This should reduce future mapping work when production APIs are available.

### State And Data Fetching
- Used Zustand for auth and geo filter state.
- Used TanStack Query for repository calls, mirroring the web platform's server-state pattern while allowing better mobile cache control later.

### UI Translation
- Large desktop tables were converted into mobile cards, progress summaries, segmented views, and searchable lists.
- Dashboard identity keeps the web palette: primary blue `#1565C0`, emerald success, amber warning, red critical, and card-based operational surfaces.

### Integration Readiness
- Production API, PostgreSQL, MQTT, push notifications, GIS polygon overlays, and file downloads are represented as service/repository seams only.
- No production credentials, URLs, or secrets were hardcoded.
