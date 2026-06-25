import { IAlertRepository } from '@/repositories/interfaces';
import { EmailAlertLog } from '@/domain/entities';

export interface AlertFilter {
  alert_type?: string;
  scheme_id?: string;
  region?: string;
  sent_date?: string;
  page?: number;
  limit?: number;
}

export interface AlertsResponse {
  data: EmailAlertLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface AlertSummaryItem {
  alert_type: string;
  total_alerts: string;
  affected_schemes: string;
  affected_regions: string;
  min_value: string | null;
  max_value: string | null;
  avg_value: string | null;
}

export interface AlertSummaryResponse {
  date: string;
  summary: AlertSummaryItem[];
}

export class ApiAlertRepository implements IAlertRepository {
  constructor(private readonly baseUrl: string) {}

  /**
   * Fetches email_alert_logs with optional filters and pagination.
   * Implements IAlertRepository.getAlerts().
   */
  async getAlerts(filters?: AlertFilter): Promise<EmailAlertLog[]> {
    const url = new URL(`${this.baseUrl}/api/alerts`);

    if (filters?.alert_type && filters.alert_type !== 'All') {
      url.searchParams.set('alert_type', filters.alert_type);
    }
    if (filters?.scheme_id) url.searchParams.set('scheme_id', filters.scheme_id);
    if (filters?.region && filters.region !== 'All') {
      url.searchParams.set('region', filters.region);
    }
    if (filters?.sent_date) url.searchParams.set('sent_date', filters.sent_date);
    if (filters?.page)  url.searchParams.set('page',  String(filters.page));
    if (filters?.limit) url.searchParams.set('limit', String(filters.limit));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch alerts: ${response.status} ${await response.text()}`);
    }

    const json: AlertsResponse = await response.json();
    return json.data.map(this.mapRow);
  }

  /**
   * Fetches a single alert log by ID.
   */
  async getAlertById(id: number): Promise<EmailAlertLog | undefined> {
    const response = await fetch(`${this.baseUrl}/api/alerts/${id}`);
    if (response.status === 404) return undefined;
    if (!response.ok) {
      throw new Error(`Failed to fetch alert: ${response.status}`);
    }
    return this.mapRow(await response.json());
  }

  /**
   * Fetches aggregate alert counts per type for a given date.
   */
  async getAlertSummary(date?: string): Promise<AlertSummaryResponse> {
    const url = new URL(`${this.baseUrl}/api/alerts/summary`);
    if (date) url.searchParams.set('sent_date', date);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch alert summary: ${response.status}`);
    }
    return response.json();
  }

  /**
   * Returns a list of distinct sent_dates in the table (for date picker).
   */
  async getDistinctDates(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/api/alerts/distinct-dates`);
    if (!response.ok) {
      throw new Error(`Failed to fetch distinct dates: ${response.status}`);
    }
    return response.json();
  }

  /**
   * Legacy IAlertRepository.acknowledgeAlert — delegates to acknowledge API.
   */
  async acknowledgeAlert(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/acknowledge/${id}/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to acknowledge alert: ${response.status}`);
    }
  }

  /** Maps raw API row to EmailAlertLog entity */
  private mapRow(row: Record<string, unknown>): EmailAlertLog {
    return {
      id: Number(row.id),
      scheme_id: String(row.scheme_id ?? ''),
      scheme_name: String(row.scheme_name ?? ''),
      region: (row.region as EmailAlertLog['region']) ?? 'Nagpur',
      village_name: row.village_name ? String(row.village_name) : undefined,
      esr_name: row.esr_name ? String(row.esr_name) : undefined,
      alert_type: (row.alert_type as EmailAlertLog['alert_type']) ?? 'LPCD',
      alert_value: String(row.alert_value ?? ''),
      civil_engineer_name: row.civil_engineer_name ? String(row.civil_engineer_name) : undefined,
      civil_engineer_email: row.civil_engineer_email ? String(row.civil_engineer_email) : undefined,
      mechanical_engineer_name: row.mechanical_engineer_name
        ? String(row.mechanical_engineer_name)
        : undefined,
      mechanical_engineer_email: row.mechanical_engineer_email
        ? String(row.mechanical_engineer_email)
        : undefined,
      site_supervisor_name: row.site_supervisor_name ? String(row.site_supervisor_name) : undefined,
      site_supervisor_email: row.site_supervisor_email
        ? String(row.site_supervisor_email)
        : undefined,
      sent_date: String(row.sent_date ?? ''),
      sent_time: String(row.sent_time ?? ''),
      ticket_id: row.ticket_id ? String(row.ticket_id) : undefined,
      created_at: String(row.created_at ?? ''),
    };
  }
}
