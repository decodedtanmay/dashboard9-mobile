import {
  ChlorineData,
  CommunicationStatus,
  DashboardSummary,
  EmailAcknowledgement,
  EmailAlertLog,
  GeoFilter,
  HelpdeskTicket,
  PressureData,
  Region,
  ReportFile,
  SchemeEngineerDetails,
  SchemeLpcd,
  SchemeStatus,
  User,
  Vendor,
  WaterConsumption,
  WaterSchemeData
} from "@/domain/entities";

export interface AuthResult {
  success: boolean;
  user?: User;
  isAdmin?: boolean;
  error?: string;
}

export interface IAuthRepository {
  login(username: string, password: string): Promise<AuthResult>;
  logout(): Promise<void>;
  getAuthStatus(): Promise<{ isAuthenticated: boolean; isAdmin: boolean; user?: User }>;
}

export interface IRegionRepository {
  getRegions(): Promise<Region[]>;
  getDashboardSummary(filter?: GeoFilter): Promise<DashboardSummary>;
}

export interface ISchemeRepository {
  getSchemes(filter?: GeoFilter): Promise<SchemeStatus[]>;
  getSchemeById(schemeId: string): Promise<SchemeStatus | undefined>;
  getSchemeVillages(schemeId: string): Promise<WaterSchemeData[]>;
  getSchemeEngineerDetails(schemeId: string): Promise<SchemeEngineerDetails | undefined>;
}

export interface ILPCDRepository {
  getVillageLPCD(filter?: GeoFilter): Promise<WaterSchemeData[]>;
  getSchemeLPCD(filter?: GeoFilter): Promise<SchemeLpcd[]>;
}

export interface IChlorineRepository {
  getChlorineData(filter?: GeoFilter): Promise<ChlorineData[]>;
}

export interface IPressureRepository {
  getPressureData(filter?: GeoFilter): Promise<PressureData[]>;
}

export interface IWaterConsumptionRepository {
  getConsumptionData(filter?: GeoFilter): Promise<WaterConsumption[]>;
}

export interface ICommunicationRepository {
  getCommunicationStatus(filter?: GeoFilter): Promise<CommunicationStatus[]>;
}

export interface IHelpdeskRepository {
  createTicket(input: Omit<HelpdeskTicket, "id" | "ticket_id" | "created_at" | "updated_at">): Promise<HelpdeskTicket>;
  getTickets(user: User): Promise<HelpdeskTicket[]>;
  getTicketById(id: number): Promise<HelpdeskTicket | undefined>;
  updateTicketStatus(id: number, status: HelpdeskTicket["status"], admin_comments?: string): Promise<HelpdeskTicket>;
}

export interface IReportRepository {
  getReports(): Promise<ReportFile[]>;
}

export interface AlertFilter {
  alert_type?: string;
  scheme_id?: string;
  region?: string;
  sent_date?: string;
  page?: number;
  limit?: number;
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

export interface IAlertRepository {
  getAlerts(filters?: AlertFilter): Promise<EmailAlertLog[]>;
  getAlertById?(id: number): Promise<EmailAlertLog | undefined>;
  getAlertSummary?(date?: string): Promise<{ date: string; summary: AlertSummaryItem[] }>;
  getDistinctDates?(): Promise<string[]>;
  acknowledgeAlert(id: number): Promise<void>;
}

export interface IAcknowledgementRepository {
  getAcknowledgements(filters?: {
    scheme_id?: string;
    alert_type?: string;
    sent_date?: string;
    acknowledged?: 'true' | 'false' | 'all';
    page?: number;
    limit?: number;
  }): Promise<EmailAcknowledgement[]>;
  getStatus(schemeId: string, alertType: string, date?: string): Promise<EmailAcknowledgement[]>;
  getByToken?(token: string): Promise<EmailAcknowledgement[]>;
  markAcknowledged(id: number): Promise<EmailAcknowledgement>;
  markTokenAcknowledged?(token: string): Promise<{ count: number }>;
}

export interface IVendorRepository {
  getVendors(region?: string): Promise<Vendor[]>;
}
