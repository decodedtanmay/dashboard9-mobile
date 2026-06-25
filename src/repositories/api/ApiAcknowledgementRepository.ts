import { IAcknowledgementRepository } from '@/repositories/interfaces';
import { EmailAcknowledgement } from '@/domain/entities';

export interface AcknowledgementFilter {
  scheme_id?: string;
  alert_type?: string;
  sent_date?: string;
  acknowledged?: 'true' | 'false' | 'all';
  page?: number;
  limit?: number;
}

export interface AcknowledgementsResponse {
  data: EmailAcknowledgement[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export class ApiAcknowledgementRepository implements IAcknowledgementRepository {
  constructor(private readonly baseUrl: string) {}

  /**
   * Get acknowledgement rows filtered by scheme/type/date and optional acknowledged state.
   * Implements IAcknowledgementRepository.getAcknowledgements().
   */
  async getAcknowledgements(filters?: AcknowledgementFilter): Promise<EmailAcknowledgement[]> {
    const url = new URL(`${this.baseUrl}/api/acknowledge`);

    if (filters?.scheme_id)    url.searchParams.set('scheme_id',    filters.scheme_id);
    if (filters?.alert_type)   url.searchParams.set('alert_type',   filters.alert_type);
    if (filters?.sent_date)    url.searchParams.set('sent_date',    filters.sent_date);
    if (filters?.acknowledged) url.searchParams.set('acknowledged', filters.acknowledged);
    if (filters?.page)         url.searchParams.set('page',         String(filters.page));
    if (filters?.limit)        url.searchParams.set('limit',        String(filters.limit));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch acknowledgements: ${response.status} ${await response.text()}`);
    }
    const json: AcknowledgementsResponse = await response.json();
    return json.data.map(this.mapRow);
  }

  /**
   * Get acknowledgement status for a specific scheme + alert type on a given date.
   * Implements IAcknowledgementRepository.getStatus().
   */
  async getStatus(
    schemeId: string,
    alertType: string,
    date?: string
  ): Promise<EmailAcknowledgement[]> {
    const url = new URL(`${this.baseUrl}/api/acknowledge/status`);
    url.searchParams.set('scheme_id', schemeId);
    url.searchParams.set('alert_type', alertType);
    if (date) url.searchParams.set('sent_date', date);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch ack status: ${response.status}`);
    }
    const rows: Record<string, unknown>[] = await response.json();
    return rows.map(this.mapRow);
  }

  /**
   * Fetch all acknowledgement rows for a given token.
   */
  async getByToken(token: string): Promise<EmailAcknowledgement[]> {
    const response = await fetch(`${this.baseUrl}/api/acknowledge/by-token/${encodeURIComponent(token)}`);
    if (response.status === 404) return [];
    if (!response.ok) {
      throw new Error(`Failed to fetch by token: ${response.status}`);
    }
    const rows: Record<string, unknown>[] = await response.json();
    return rows.map(this.mapRow);
  }

  /**
   * Mark a single acknowledgement record as acknowledged (in-app).
   * Implements IAcknowledgementRepository.markAcknowledged().
   */
  async markAcknowledged(id: number): Promise<EmailAcknowledgement> {
    const response = await fetch(`${this.baseUrl}/api/acknowledge/${id}/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to mark acknowledged: ${response.status}`);
    }
    const json = await response.json();
    return this.mapRow(json.data);
  }

  /**
   * Mark ALL pending acknowledgements for a token as acknowledged.
   */
  async markTokenAcknowledged(token: string): Promise<{ count: number }> {
    const response = await fetch(
      `${this.baseUrl}/api/acknowledge/by-token/${encodeURIComponent(token)}/mark`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } }
    );
    if (!response.ok) {
      throw new Error(`Failed to mark token acknowledged: ${response.status}`);
    }
    const json = await response.json();
    return { count: json.count ?? 0 };
  }

  /** Maps raw API row to EmailAcknowledgement entity */
  private mapRow(row: Record<string, unknown>): EmailAcknowledgement {
    return {
      id: Number(row.id),
      token: String(row.token ?? ''),
      scheme_id: String(row.scheme_id ?? ''),
      alert_type: String(row.alert_type ?? ''),
      engineer_email: String(row.engineer_email ?? ''),
      engineer_name: row.engineer_name ? String(row.engineer_name) : undefined,
      sent_date: String(row.sent_date ?? ''),
      acknowledged_at: row.acknowledged_at ? String(row.acknowledged_at) : undefined,
      created_at: String(row.created_at ?? ''),
    };
  }
}
