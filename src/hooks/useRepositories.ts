import { useQuery } from "@tanstack/react-query";
import { container } from "@/core/container";
import { GeoFilter } from "@/domain/entities";
import { useAuthStore } from "@/store/authStore";

export function useDashboardData(filter?: GeoFilter) {
  return useQuery({
    queryKey: ["dashboard", filter],
    queryFn: () => container.regionRepository.getDashboardSummary(filter)
  });
}

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: () => container.regionRepository.getRegions()
  });
}

export function useSchemes(filter?: GeoFilter) {
  return useQuery({
    queryKey: ["schemes", filter],
    queryFn: () => container.schemeRepository.getSchemes(filter)
  });
}

export function useSchemeDetails(schemeId: string) {
  return useQuery({
    queryKey: ["scheme", schemeId],
    queryFn: async () => ({
      scheme: await container.schemeRepository.getSchemeById(schemeId),
      villages: await container.schemeRepository.getSchemeVillages(schemeId),
      engineer: await container.schemeRepository.getSchemeEngineerDetails(schemeId),
      chlorine: (await container.chlorineRepository.getChlorineData({ scheme_id: schemeId })).slice(0, 20),
      pressure: (await container.pressureRepository.getPressureData({ scheme_id: schemeId })).slice(0, 20),
      communication: (await container.communicationRepository.getCommunicationStatus({ scheme_id: schemeId })).slice(0, 20)
    })
  });
}

export function useMonitoringData(filter?: GeoFilter) {
  return useQuery({
    queryKey: ["monitoring", filter],
    queryFn: async () => ({
      lpcd: await container.lpcdRepository.getVillageLPCD(filter),
      chlorine: await container.chlorineRepository.getChlorineData(filter),
      pressure: await container.pressureRepository.getPressureData(filter),
      water: await container.waterConsumptionRepository.getConsumptionData(filter),
      communication: await container.communicationRepository.getCommunicationStatus(filter)
    })
  });
}

export function useTickets() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["tickets", user?.id],
    queryFn: () => (user ? container.helpdeskRepository.getTickets(user) : []),
    enabled: !!user
  });
}

export function useMoreData() {
  return useQuery({
    queryKey: ["more-data"],
    queryFn: async () => ({
      reports: await container.reportRepository.getReports(),
      alerts: await container.alertRepository.getAlerts()
    })
  });
}
