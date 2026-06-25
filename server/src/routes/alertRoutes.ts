import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * GET /api/alerts
 * Fetches email_alert_logs with optional filters.
 *
 * Query params:
 *   alert_type  — 'LPCD' | 'Chlorine' | 'Pressure' | 'Water' | 'Communication'
 *   scheme_id   — filter by scheme ID
 *   region      — filter by region name
 *   sent_date   — filter by exact date (YYYY-MM-DD)
 *   page        — page number (default: 1)
 *   limit       — results per page (default: 50, max: 200)
 */
router.get('/', async (req: Request, res: Response) => {
  const { alert_type, scheme_id, region, sent_date, page = '1', limit = '50' } = req.query;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIdx = 1;

  if (alert_type && alert_type !== 'All') {
    conditions.push(`alert_type = $${paramIdx++}`);
    params.push(alert_type);
  }
  if (scheme_id) {
    conditions.push(`scheme_id = $${paramIdx++}`);
    params.push(scheme_id);
  }
  if (region && region !== 'All') {
    conditions.push(`region = $${paramIdx++}`);
    params.push(region);
  }
  if (sent_date) {
    conditions.push(`sent_date = $${paramIdx++}::date`);
    params.push(sent_date);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const pageNum = Math.max(1, parseInt(String(page), 10));
  const limitNum = Math.min(200, Math.max(1, parseInt(String(limit), 10)));
  const offset = (pageNum - 1) * limitNum;

  params.push(limitNum, offset);

  try {
    const countQuery = `SELECT COUNT(*) FROM email_alert_logs ${whereClause}`;
    const dataQuery = `
      SELECT
        id, scheme_id, scheme_name, region,
        village_name, esr_name, alert_type, alert_value,
        civil_engineer_name, civil_engineer_email,
        mechanical_engineer_name, mechanical_engineer_email,
        site_supervisor_name, site_supervisor_email,
        sent_date, sent_time, ticket_id, created_at
      FROM email_alert_logs
      ${whereClause}
      ORDER BY sent_date DESC, created_at DESC
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, params.slice(0, -2)),
      pool.query(dataQuery, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);

    res.json({
      data: dataResult.rows,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching alert logs:', msg);
    res.status(500).json({ error: 'Failed to fetch alert logs', detail: msg });
  }
});

/**
 * GET /api/alerts/summary
 * Returns aggregate counts grouped by alert_type for the current or a given date.
 *
 * Query params:
 *   sent_date — (optional) YYYY-MM-DD. Defaults to today.
 */
router.get('/summary', async (req: Request, res: Response) => {
  const { sent_date } = req.query;
  const targetDate = sent_date
    ? String(sent_date)
    : new Date().toISOString().split('T')[0];

  try {
    const result = await pool.query(
      `SELECT
        alert_type,
        COUNT(*) AS total_alerts,
        COUNT(DISTINCT scheme_id) AS affected_schemes,
        COUNT(DISTINCT region) AS affected_regions,
        MIN(alert_value::numeric) AS min_value,
        MAX(alert_value::numeric) AS max_value,
        AVG(alert_value::numeric) AS avg_value
       FROM email_alert_logs
       WHERE sent_date = $1::date
       GROUP BY alert_type
       ORDER BY alert_type`,
      [targetDate]
    );

    res.json({
      date: targetDate,
      summary: result.rows,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching alert summary:', msg);
    res.status(500).json({ error: 'Failed to fetch alert summary', detail: msg });
  }
});

/**
 * GET /api/alerts/distinct-dates
 * Returns a list of distinct sent_dates available in the table (for date picker in UI).
 */
router.get('/distinct-dates', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT sent_date FROM email_alert_logs ORDER BY sent_date DESC LIMIT 60`
    );
    res.json(result.rows.map((r) => r.sent_date));
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch distinct dates', detail: msg });
  }
});

/**
 * GET /api/alerts/:id
 * Fetch a single alert log by its numeric ID.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM email_alert_logs WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching alert by ID:', msg);
    res.status(500).json({ error: 'Failed to fetch alert', detail: msg });
  }
});

export default router;
