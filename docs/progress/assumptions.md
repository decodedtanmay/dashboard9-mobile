# Assumptions

## Current Constraints
- PostgreSQL access is unavailable.
- Production API access is unavailable.
- Production credentials and environment variables are unavailable.
- MQTT broker credentials and production IoT access are intentionally not used.

## Implementation Assumptions
- The app should default to mock repositories until real APIs are explicitly provided.
- Existing web source code wins over planning docs when they conflict.
- Admin-only desktop workflows such as CSV import, report management, login logs, and MQTT topic configuration should remain omitted or view-only on mobile.
- The mobile app should preserve production schema field names internally, then expose user-friendly labels in the UI.
- Expo Router is acceptable as the initial production-grade foundation because the implementation plan recommends Expo and deep-linkable navigation.

## Discrepancies Found
- The implementation plan describes helpdesk tickets with a simplified `ticketNumber`; the actual schema uses `ticket_id`, `specific_issue`, `level`, contact fields, and direct attachment fields.
- The plan describes region stats with `totalSchemes`/`totalVillages`; the actual schema uses `total_schemes_integrated`, `total_villages_integrated`, `total_esr_integrated`, and completion counters.
- The plan describes `valueDayN` in several places; the actual schema uses domain-specific fields such as `lpcd_value_day1`, `chlorine_value_1`, and `pressure_value_1`.
- The web `App.tsx` contains duplicate `/monthly-reports` route declarations. Mobile keeps monthly reports out of initial scope and makes reports catalog-only.
- The web auth hook uses session cookies and `/api/auth/status`; mobile uses a repository contract with mock auth now and can later map to the same endpoint.
