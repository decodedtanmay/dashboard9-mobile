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
import { CacheManager } from "@/infrastructure/storage/CacheManager";
import { SyncQueue } from "@/infrastructure/storage/SyncQueue";

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
  alertRepository: new MockAlertRepository(),
  vendorRepository: new MockVendorRepository(),
  cacheManager: new CacheManager(),
  syncQueue: new SyncQueue()
};
