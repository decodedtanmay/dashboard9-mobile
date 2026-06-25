# Seeding PostgreSQL from CSV Files

Use these instructions to load the provided CSV data into your fresh local PostgreSQL database.

---

## Prerequisites

1. PostgreSQL is installed and running locally.
2. You have run both SQL migration scripts:
   ```bash
   psql -U postgres -d alert_management -f server/sql/001_create_email_alert_logs.sql
   psql -U postgres -d alert_management -f server/sql/002_create_email_acknowledgements.sql
   ```
3. The CSV files are in the project root:
   - `email_alert_logs.csv`
   - `email_acknowledgements.csv`

---

## Step 1 — Create the database (if it doesn't exist yet)

```bash
psql -U postgres -c "CREATE DATABASE alert_management;"
```

---

## Step 2 — Seed `email_alert_logs`

```bash
psql -U postgres -d alert_management -c "\COPY email_alert_logs (id, scheme_id, scheme_name, region, village_name, esr_name, alert_type, alert_value, civil_engineer_name, civil_engineer_email, mechanical_engineer_name, mechanical_engineer_email, site_supervisor_name, site_supervisor_email, sent_date, sent_time, created_at, ticket_id) FROM 'C:/Users/aditi/OneDrive/Documents/Projects aditi/dashboard9-mobile/email_alert_logs.csv' CSV HEADER NULL 'NULL';"
```

---

## Step 3 — Seed `email_acknowledgements`

```bash
psql -U postgres -d alert_management -c "\COPY email_acknowledgements (id, token, scheme_id, alert_type, engineer_email, engineer_name, sent_date, acknowledged_at, created_at) FROM 'C:/Users/aditi/OneDrive/Documents/Projects aditi/dashboard9-mobile/email_acknowledgements.csv' CSV HEADER NULL 'NULL';"
```

---

## Step 4 — Reset sequences (important after seeding with explicit IDs)

After loading data with explicit `id` values, reset the auto-increment sequences so new rows don't conflict:

```sql
-- Run in psql or any SQL client connected to alert_management
SELECT setval('email_alert_logs_id_seq',        (SELECT MAX(id) FROM email_alert_logs));
SELECT setval('email_acknowledgements_id_seq',   (SELECT MAX(id) FROM email_acknowledgements));
```

Or run it via psql directly:
```bash
psql -U postgres -d alert_management -c "SELECT setval('email_alert_logs_id_seq', (SELECT MAX(id) FROM email_alert_logs)); SELECT setval('email_acknowledgements_id_seq', (SELECT MAX(id) FROM email_acknowledgements));"
```

---

## Step 5 — Verify

```bash
psql -U postgres -d alert_management -c "SELECT COUNT(*) FROM email_alert_logs;"
psql -U postgres -d alert_management -c "SELECT COUNT(*) FROM email_acknowledgements;"
```

Expected output:
- `email_alert_logs`: ~3993 rows
- `email_acknowledgements`: ~3956 rows

---

## Swapping in the Real Company Database

When you want to point this backend at the actual production database, simply update `DATABASE_URL` in `server/.env`:

```env
DATABASE_URL=postgresql://REAL_USER:REAL_PASSWORD@REAL_HOST:5432/REAL_DATABASE
```

No code changes needed — the backend is fully connection-string driven.
