import {
  ChlorineData,
  CommunicationStatus,
  DashboardSummary,
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

export interface IAlertRepository {
  getAlerts(): Promise<EmailAlertLog[]>;
  acknowledgeAlert(id: number): Promise<void>;
}

export interface IVendorRepository {
  getVendors(region?: string): Promise<Vendor[]>;
}
