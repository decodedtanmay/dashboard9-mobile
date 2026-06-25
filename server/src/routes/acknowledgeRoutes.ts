import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * GET /api/acknowledge/status
 * Returns acknowledgement rows for a scheme/alert-type/date combination.
 *
 * Query params:
 *   scheme_id   — required
 *   alert_type  — required (e.g. 'Chlorine')
 *   sent_date   — optional YYYY-MM-DD (defaults to today)
 */
router.get('/status', async (req: Request, res: Response) => {
  const { scheme_id, alert_type, sent_date } = req.query;

  if (!scheme_id || !alert_type) {
    return res
      .status(400)
      .json({ error: 'scheme_id and alert_type are required query parameters.' });
  }

  const targetDate = sent_date
    ? String(sent_date)
    : new Date().toISOString().split('T')[0];

  try {
    const result = await pool.query(
      `SELECT
         id, token, scheme_id, alert_type,
         engineer_email, engineer_name,
         sent_date, acknowledged_at, created_at
       FROM email_acknowledgements
       WHERE scheme_id = $1
         AND alert_type = $2
         AND sent_date = $3::date
       ORDER BY acknowledged_at DESC NULLS LAST`,
      [scheme_id, alert_type, targetDate]
    );
    res.json(result.rows);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching acknowledgement status:', msg);
    res.status(500).json({ error: 'Failed to fetch acknowledgement status', detail: msg });
  }
});

/**
 * GET /api/acknowledge/by-token/:token
 * Returns all acknowledgement rows sharing the same token
 * (each token covers all alert types for that batch for that engineer).
 */
router.get('/by-token/:token', async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const result = await pool.query(
      `SELECT
         id, token, scheme_id, alert_type,
         engineer_email, engineer_name,
         sent_date, acknowledged_at, created_at
       FROM email_acknowledgements
       WHERE token = $1
       ORDER BY created_at ASC`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No acknowledgements found for this token.' });
    }

    res.json(result.rows);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching by token:', msg);
    res.status(500).json({ error: 'Failed to fetch acknowledgements', detail: msg });
  }
});

/**
 * GET /api/acknowledge
 * Fetch acknowledgements with optional filters.
 *
 * Query params:
 *   scheme_id   — filter by scheme
 *   alert_type  — filter by alert type
 *   sent_date   — filter by date
 *   acknowledged — 'true' | 'false' | 'all' (default: 'all')
 *   page, limit
 */
router.get('/', async (req: Request, res: Response) => {
  const {
    scheme_id,
    alert_type,
    sent_date,
    acknowledged = 'all',
    page = '1',
    limit = '50',
  } = req.query;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIdx = 1;

  if (scheme_id) {
    conditions.push(`scheme_id = $${paramIdx++}`);
    params.push(scheme_id);
  }
  if (alert_type && alert_type !== 'All') {
    conditions.push(`alert_type = $${paramIdx++}`);
    params.push(alert_type);
  }
  if (sent_date) {
    conditions.push(`sent_date = $${paramIdx++}::date`);
    params.push(sent_date);
  }
  if (acknowledged === 'true') {
    conditions.push(`acknowledged_at IS NOT NULL`);
  } else if (acknowledged === 'false') {
    conditions.push(`acknowledged_at IS NULL`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const pageNum = Math.max(1, parseInt(String(page), 10));
  const limitNum = Math.min(200, Math.max(1, parseInt(String(limit), 10)));
  const offset = (pageNum - 1) * limitNum;

  params.push(limitNum, offset);

  try {
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM email_acknowledgements ${whereClause}`,
      params.slice(0, -2)
    );
    const dataResult = await pool.query(
      `SELECT
         id, token, scheme_id, alert_type,
         engineer_email, engineer_name,
         sent_date, acknowledged_at, created_at
       FROM email_acknowledgements
       ${whereClause}
       ORDER BY sent_date DESC, created_at DESC
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      params
    );

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
    console.error('Error fetching acknowledgements:', msg);
    res.status(500).json({ error: 'Failed to fetch acknowledgements', detail: msg });
  }
});

/**
 * POST /api/acknowledge/:id/mark
 * Mark a single acknowledgement row as acknowledged (for in-app acknowledgement on mobile).
 * Body: { engineer_name?: string, engineer_email?: string }
 */
router.post('/:id/mark', async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number.' });
  }

  try {
    const find = await pool.query(
      `SELECT * FROM email_acknowledgements WHERE id = $1`,
      [id]
    );

    if (find.rows.length === 0) {
      return res.status(404).json({ error: 'Acknowledgement record not found.' });
    }

    if (find.rows[0].acknowledged_at !== null) {
      return res.json({
        message: 'Already acknowledged.',
        acknowledged_at: find.rows[0].acknowledged_at,
      });
    }

    const result = await pool.query(
      `UPDATE email_acknowledgements
       SET acknowledged_at = NOW()
       WHERE id = $1
       RETURNING id, scheme_id, alert_type, engineer_email, acknowledged_at`,
      [id]
    );

    res.json({ message: 'Acknowledged successfully.', data: result.rows[0] });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error marking acknowledgement:', msg);
    res.status(500).json({ error: 'Failed to acknowledge', detail: msg });
  }
});

/**
 * POST /api/acknowledge/by-token/:token/mark
 * Marks ALL pending acknowledgements for a token (mirrors the email-link behaviour).
 */
router.post('/by-token/:token/mark', async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const find = await pool.query(
      `SELECT * FROM email_acknowledgements WHERE token = $1`,
      [token]
    );

    if (find.rows.length === 0) {
      return res.status(404).json({ error: 'Token not found.' });
    }

    const allAcked = find.rows.every((r) => r.acknowledged_at !== null);
    if (allAcked) {
      return res.json({
        message: 'All records for this token are already acknowledged.',
        count: 0,
      });
    }

    const update = await pool.query(
      `UPDATE email_acknowledgements
       SET acknowledged_at = NOW()
       WHERE token = $1 AND acknowledged_at IS NULL
       RETURNING id`,
      [token]
    );

    res.json({
      message: `Acknowledged ${update.rows.length} record(s) successfully.`,
      count: update.rows.length,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error marking token acknowledgement:', msg);
    res.status(500).json({ error: 'Failed to acknowledge', detail: msg });
  }
});

export default router;
