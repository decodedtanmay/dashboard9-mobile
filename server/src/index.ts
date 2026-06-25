import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load .env before importing db (which reads DATABASE_URL)
dotenv.config();

import { pool } from './db';
import alertRoutes from './routes/alertRoutes';
import acknowledgeRoutes from './routes/acknowledgeRoutes';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.use(express.json());

// ── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/alerts', alertRoutes);
app.use('/api/acknowledge', acknowledgeRoutes);

// ── 404 catch-all ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Auto-create tables on first run ─────────────────────────
async function ensureTables() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_alert_logs (
        id SERIAL PRIMARY KEY,
        scheme_id VARCHAR(100) NOT NULL,
        scheme_name VARCHAR(255) NOT NULL,
        region VARCHAR(100),
        village_name VARCHAR(255),
        esr_name VARCHAR(255),
        alert_type VARCHAR(50) NOT NULL,
        alert_value VARCHAR(100) NOT NULL,
        civil_engineer_name VARCHAR(255),
        civil_engineer_email VARCHAR(255),
        mechanical_engineer_name VARCHAR(255),
        mechanical_engineer_email VARCHAR(255),
        site_supervisor_name VARCHAR(255),
        site_supervisor_email VARCHAR(255),
        sent_date DATE NOT NULL DEFAULT CURRENT_DATE,
        sent_time TIME NOT NULL DEFAULT CURRENT_TIME,
        ticket_id VARCHAR(100) UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_alert_logs_scheme_id   ON email_alert_logs(scheme_id);
      CREATE INDEX IF NOT EXISTS idx_alert_logs_sent_date   ON email_alert_logs(sent_date);
      CREATE INDEX IF NOT EXISTS idx_alert_logs_alert_type  ON email_alert_logs(alert_type);
      CREATE INDEX IF NOT EXISTS idx_alert_logs_region      ON email_alert_logs(region);

      CREATE TABLE IF NOT EXISTS email_acknowledgements (
        id SERIAL PRIMARY KEY,
        token VARCHAR(128) NOT NULL,
        scheme_id VARCHAR(50) NOT NULL,
        alert_type VARCHAR(20) NOT NULL,
        engineer_email VARCHAR(255) NOT NULL,
        engineer_name VARCHAR(255),
        sent_date DATE NOT NULL DEFAULT CURRENT_DATE,
        acknowledged_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_ack_token  ON email_acknowledgements(token);
      CREATE INDEX IF NOT EXISTS idx_ack_scheme ON email_acknowledgements(scheme_id, alert_type, sent_date);
    `);
    console.log('✅ Tables verified / created: email_alert_logs, email_acknowledgements');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('⚠️  Table creation warning:', msg);
  } finally {
    client.release();
  }
}

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 Alert Backend running at http://localhost:${PORT}`);
  console.log(`   Health:        GET  http://localhost:${PORT}/health`);
  console.log(`   Alert logs:    GET  http://localhost:${PORT}/api/alerts`);
  console.log(`   Ack status:    GET  http://localhost:${PORT}/api/acknowledge/status`);
  await ensureTables();
});
