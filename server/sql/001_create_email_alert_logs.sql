-- ============================================================
-- 001_create_email_alert_logs.sql
-- Alert Management System — email_alert_logs table
--
-- Run this script against your PostgreSQL database BEFORE
-- starting the Express backend server for the first time.
-- (The server also auto-runs this on startup via IF NOT EXISTS.)
--
-- Usage:
--   psql -U postgres -d alert_management -f 001_create_email_alert_logs.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS email_alert_logs (
    id                        SERIAL PRIMARY KEY,

    -- Scheme identification
    scheme_id                 VARCHAR(100)  NOT NULL,
    scheme_name               VARCHAR(255)  NOT NULL,
    region                    VARCHAR(100),

    -- Location within scheme
    village_name              VARCHAR(255),
    esr_name                  VARCHAR(255),

    -- Alert details
    alert_type                VARCHAR(50)   NOT NULL,  -- 'LPCD' | 'Chlorine' | 'Pressure' | 'Water'
    alert_value               VARCHAR(100)  NOT NULL,  -- The failing sensor reading that triggered the alert

    -- Assigned engineers (denormalized for quick display)
    civil_engineer_name       VARCHAR(255),
    civil_engineer_email      VARCHAR(255),
    mechanical_engineer_name  VARCHAR(255),
    mechanical_engineer_email VARCHAR(255),
    site_supervisor_name      VARCHAR(255),
    site_supervisor_email     VARCHAR(255),

    -- Timing
    sent_date                 DATE          NOT NULL DEFAULT CURRENT_DATE,
    sent_time                 TIME          NOT NULL DEFAULT CURRENT_TIME,
    ticket_id                 VARCHAR(100)  UNIQUE,     -- Optional link to helpdesk ticket
    created_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast API queries used by the mobile app
CREATE INDEX IF NOT EXISTS idx_alert_logs_scheme_id   ON email_alert_logs(scheme_id);
CREATE INDEX IF NOT EXISTS idx_alert_logs_sent_date   ON email_alert_logs(sent_date);
CREATE INDEX IF NOT EXISTS idx_alert_logs_alert_type  ON email_alert_logs(alert_type);
CREATE INDEX IF NOT EXISTS idx_alert_logs_region      ON email_alert_logs(region);

-- Composite index for the most common combined filter (type + date)
CREATE INDEX IF NOT EXISTS idx_alert_logs_type_date   ON email_alert_logs(alert_type, sent_date);
