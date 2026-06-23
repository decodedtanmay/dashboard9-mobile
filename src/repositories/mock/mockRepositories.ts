import {
  AuthResult,
  IAlertRepository,
  IAuthRepository,
  IChlorineRepository,
  ICommunicationRepository,
  IHelpdeskRepository,
  ILPCDRepository,
  IPressureRepository,
  IRegionRepository,
  IReportRepository,
  ISchemeRepository,
  IVendorRepository,
  IWaterConsumptionRepository
} from "@/repositories/interfaces";
import {
  DashboardSummary,
  EmailAlertLog,
  GeoFilter,
  HelpdeskTicket,
  RegionName,
  SchemeStatus,
  User
} from "@/domain/entities";
import {
  latestAverageLpcd,
  mockAlerts,
  mockChlorineData,
  mockCommunicationStatus,
  mockEngineers,
  mockPressureData,
  mockRegions,
  mockReports,
  mockSchemeLpcd,
  mockSchemes,
  mockUsers,
  mockVendors,
  mockWaterConsumption,
  mockWaterSchemeData
} from "@/mock/mockData";
import { classifyChlorine, classifyLPCD, classifyPressure } from "@/services/classification";

function delay<T>(value: T, ms = 180): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function matchesFilter<T extends { region?: RegionName; circle?: string; division?: string; sub_division?: string; block?: string; scheme_id?: string; village_name?: string; esr_name?: string }>(
  item: T,
  filter?: GeoFilter
): boolean {
  if (!filter || filter.region === "All") return true;
  return Object.entries(filter).every(([key, value]) => {
    if (!value || value === "All") return true;
    return String(item[key as keyof T]) === String(value);
  });
}

let activeUser: User | undefined;
let ticketSequence = 4;

const tickets: HelpdeskTicket[] = [
  {
    id: 1,
    ticket_id: "HD-000001",
    title: "Chlorine level below acceptable range",
    category: "Water Quality",
    specific_issue: "Residual chlorine below 0.2 mg/L",
    description: "Field reading has remained below threshold for two consecutive checks.",
    level: "ESR",
    region: "Nashik",
    circle: "Nashik Circle",
    division: "Nashik Division A",
    sub_division: "Dindori Sub Division",
    block: "Dindori",
    scheme_id: "MH-NAS-001",
    scheme_name: "Dindori Regional Rural Water Supply Scheme Phase-1",
    village_name: "Dindori Village 1",
    esr_name: "Dindori Village 1 ESR-1",
    priority: "High",
    status: "Open",
    contact_name: "Nashik Region Officer",
    contact_phone: "9876543211",
    contact_email: "nashik@mahajaliot.in",
    created_by: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    ticket_id: "HD-000002",
    title: "Pressure transmitter offline",
    category: "Sensor Communication",
    specific_issue: "Pressure sensor not communicating",
    description: "Pressure data has not updated in more than 72 hours.",
    level: "ESR",
    region: "Pune",
    circle: "Pune Circle",
    division: "Pune Division B",
    sub_division: "Daund Sub Division",
    block: "Daund",
    scheme_id: "MH-PUN-002",
    scheme_name: "Daund Regional Rural Water Supply Scheme Phase-2",
    village_name: "Daund Village 3",
    esr_name: "Daund Village 3 ESR-1",
    priority: "Medium",
    status: "In-Progress",
    contact_name: "System Administrator",
    contact_email: "admin@mahajaliot.in",
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export class MockAuthRepository implements IAuthRepository {
  async login(username: string, password: string): Promise<AuthResult> {
    const user = mockUsers.find((candidate) => candidate.username === username && candidate.password === password);
    if (!user) return delay({ success: false, error: "Invalid username or password" });
    activeUser = user;
    return delay({ success: true, user, isAdmin: user.role === "admin" });
  }

  async logout() {
    activeUser = undefined;
    return delay(undefined);
  }

  async getAuthStatus() {
    return delay({
      isAuthenticated: !!activeUser,
      isAdmin: activeUser?.role === "admin",
      user: activeUser
    });
  }
}

export class MockRegionRepository implements IRegionRepository {
  async getRegions() {
    return delay(mockRegions);
  }

  async getDashboardSummary(filter?: GeoFilter): Promise<DashboardSummary> {
    const schemes = mockSchemes.filter((item) => matchesFilter(item, filter));
    const villages = mockWaterSchemeData.filter((item) => matchesFilter(item, filter));
    const chlorine = mockChlorineData.filter((item) => matchesFilter(item, filter));
    const pressure = mockPressureData.filter((item) => matchesFilter(item, filter));
    const communication = mockCommunicationStatus.filter((item) => matchesFilter(item, filter));
    const lpcdStatus = villages.map((item) => classifyLPCD(item.lpcd_value_day1));
    const chlorineStatus = chlorine.map((item) => classifyChlorine(item.chlorine_value_1));
    const pressureStatus = pressure.map((item) => classifyPressure(item.pressure_value_1));

    return delay({
      totalSchemes: schemes.length,
      totalVillages: villages.length,
      totalEsr: chlorine.length,
      totalPopulation: villages.reduce((sum, item) => sum + item.population, 0),
      avgLpcd: latestAverageLpcd(villages),
      above55Count: lpcdStatus.filter((status) => status === "above_55").length,
      below55Count: lpcdStatus.filter((status) => status === "below_55").length,
      zeroCount: lpcdStatus.filter((status) => status === "zero").length,
      optimalChlorine: chlorineStatus.filter((status) => status === "optimal").length,
      belowChlorine: chlorineStatus.filter((status) => status === "below").length,
      aboveChlorine: chlorineStatus.filter((status) => status === "above").length,
      optimalPressure: pressureStatus.filter((status) => status === "optimal").length,
      lowPressure: pressureStatus.filter((status) => status === "low").length,
      highPressure: pressureStatus.filter((status) => status === "high").length,
      communicatingSensors: communication.filter((item) => item.overall_status === "Online").length,
      nonCommunicatingSensors: communication.filter((item) => item.overall_status !== "Online").length,
      lastUpdated: new Date().toISOString()
    });
  }
}

export class MockSchemeRepository implements ISchemeRepository {
  async getSchemes(filter?: GeoFilter) {
    return delay(mockSchemes.filter((item) => matchesFilter(item, filter)));
  }

  async getSchemeById(schemeId: string): Promise<SchemeStatus | undefined> {
    return delay(mockSchemes.find((item) => item.scheme_id === schemeId));
  }

  async getSchemeVillages(schemeId: string) {
    return delay(mockWaterSchemeData.filter((item) => item.scheme_id === schemeId));
  }

  async getSchemeEngineerDetails(schemeId: string) {
    return delay(mockEngineers.find((item) => item.scheme_id === schemeId));
  }
}

export class MockLPCDRepository implements ILPCDRepository {
  async getVillageLPCD(filter?: GeoFilter) {
    return delay(mockWaterSchemeData.filter((item) => matchesFilter(item, filter)));
  }

  async getSchemeLPCD(filter?: GeoFilter) {
    return delay(mockSchemeLpcd.filter((item) => matchesFilter(item, filter)));
  }
}

export class MockChlorineRepository implements IChlorineRepository {
  async getChlorineData(filter?: GeoFilter) {
    return delay(mockChlorineData.filter((item) => matchesFilter(item, filter)));
  }
}

export class MockPressureRepository implements IPressureRepository {
  async getPressureData(filter?: GeoFilter) {
    return delay(mockPressureData.filter((item) => matchesFilter(item, filter)));
  }
}

export class MockWaterConsumptionRepository implements IWaterConsumptionRepository {
  async getConsumptionData(filter?: GeoFilter) {
    return delay(mockWaterConsumption.filter((item) => matchesFilter(item, filter)));
  }
}

export class MockCommunicationRepository implements ICommunicationRepository {
  async getCommunicationStatus(filter?: GeoFilter) {
    return delay(mockCommunicationStatus.filter((item) => matchesFilter(item, filter)));
  }
}

export class MockHelpdeskRepository implements IHelpdeskRepository {
  async createTicket(input: Omit<HelpdeskTicket, "id" | "ticket_id" | "created_at" | "updated_at">) {
    const now = new Date().toISOString();
    const ticket: HelpdeskTicket = {
      ...input,
      id: ticketSequence,
      ticket_id: `HD-${String(ticketSequence).padStart(6, "0")}`,
      created_at: now,
      updated_at: now
    };
    ticketSequence += 1;
    tickets.unshift(ticket);
    return delay(ticket);
  }

  async getTickets(user: User) {
    return delay(user.role === "admin" ? tickets : tickets.filter((ticket) => ticket.created_by === user.id));
  }

  async getTicketById(id: number) {
    return delay(tickets.find((ticket) => ticket.id === id));
  }

  async updateTicketStatus(id: number, status: HelpdeskTicket["status"], admin_comments?: string) {
    const ticket = tickets.find((item) => item.id === id);
    if (!ticket) throw new Error("Ticket not found");
    ticket.status = status;
    ticket.admin_comments = admin_comments;
    ticket.updated_at = new Date().toISOString();
    return delay(ticket);
  }
}

export class MockReportRepository implements IReportRepository {
  async getReports() {
    return delay(mockReports);
  }
}

export class MockAlertRepository implements IAlertRepository {
  private acknowledged = new Set<number>();

  async getAlerts(): Promise<EmailAlertLog[]> {
    return delay(mockAlerts.filter((alert) => !this.acknowledged.has(alert.id)));
  }

  async acknowledgeAlert(id: number) {
    this.acknowledged.add(id);
    return delay(undefined);
  }
}

export class MockVendorRepository implements IVendorRepository {
  async getVendors(region?: string) {
    return delay(region ? mockVendors.filter((vendor) => vendor.region === region) : mockVendors);
  }
}
