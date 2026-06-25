-- ============================================================
-- 002_create_email_acknowledgements.sql
-- Alert Management System — email_acknowledgements table
--
-- Run AFTER 001_create_email_alert_logs.sql.
--
-- Usage:
--   psql -U postgres -d alert_management -f 002_create_email_acknowledgements.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS email_acknowledgements (
    id              SERIAL PRIMARY KEY,

    -- Unique token per alert-email-batch (shared across alert types for one engineer+scheme)
    token           VARCHAR(128)  NOT NULL,

    -- Which scheme/alert this acknowledgement covers
    scheme_id       VARCHAR(50)   NOT NULL,
    alert_type      VARCHAR(20)   NOT NULL,  -- 'LPCD' | 'Chlorine' | 'Pressure'

    -- Engineer who received and (optionally) acknowledged
    engineer_email  VARCHAR(255)  NOT NULL,
    engineer_name   VARCHAR(255),

    -- When the alert email was sent
    sent_date       DATE          NOT NULL DEFAULT CURRENT_DATE,

    -- NULL = not yet acknowledged; NOT NULL = acknowledged at this time
    acknowledged_at TIMESTAMP WITH TIME ZONE,

    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fast token lookups (used when engineer clicks acknowledgement link)
CREATE INDEX IF NOT EXISTS idx_ack_token  ON email_acknowledgements(token);

-- Dashboard/mobile queries: fetch ack status for a scheme on a date
CREATE INDEX IF NOT EXISTS idx_ack_scheme ON email_acknowledgements(scheme_id, alert_type, sent_date);

-- Filter unacknowledged records
CREATE INDEX IF NOT EXISTS idx_ack_pending ON email_acknowledgements(acknowledged_at) WHERE acknowledged_at IS NULL;
