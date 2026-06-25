import {
  MockAlertRepository,
  MockAuthRepository,
  MockChlorineRepository,
  MockCommunicationRepository,
  MockHelpdeskRepository,
  MockLPCDRepository,
  MockPressureRepository,
  MockRegionRepository,
  MockReportRepository,
  MockSchemeRepository,
  MockVendorRepository,
  MockWaterConsumptionRepository
} from "@/repositories/mock/mockRepositories";
import { ApiAlertRepository } from "@/repositories/api/ApiAlertRepository";
import { ApiAcknowledgementRepository } from "@/repositories/api/ApiAcknowledgementRepository";
import { CacheManager } from "@/infrastructure/storage/CacheManager";
import { SyncQueue } from "@/infrastructure/storage/SyncQueue";
import { environment } from "@/infrastructure/config/environment";

const alertApiUrl = environment.alertApiBaseUrl;

// Alert repositories — swap between mock and real PostgreSQL-backed API
const alertRepository = environment.useMockRepositories
  ? new MockAlertRepository()
  : new ApiAlertRepository(alertApiUrl);

const acknowledgementRepository = new ApiAcknowledgementRepository(alertApiUrl);

export const container = {
  authRepository: new MockAuthRepository(),
  regionRepository: new MockRegionRepository(),
  schemeRepository: new MockSchemeRepository(),
  lpcdRepository: new MockLPCDRepository(),
  chlorineRepository: new MockChlorineRepository(),
  pressureRepository: new MockPressureRepository(),
  waterConsumptionRepository: new MockWaterConsumptionRepository(),
  communicationRepository: new MockCommunicationRepository(),
  helpdeskRepository: new MockHelpdeskRepository(),
  reportRepository: new MockReportRepository(),
  alertRepository,
  acknowledgementRepository,
  vendorRepository: new MockVendorRepository(),
  cacheManager: new CacheManager(),
  syncQueue: new SyncQueue()
};

