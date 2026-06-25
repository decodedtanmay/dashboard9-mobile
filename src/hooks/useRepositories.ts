import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "@/core/container";
import { GeoFilter } from "@/domain/entities";
import { useAuthStore } from "@/store/authStore";
import { AlertFilter } from "@/repositories/interfaces";

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

// ── Alert Management Hooks ────────────────────────────────────────────────────

/**
 * Fetch email_alert_logs with optional filters (type, scheme, region, date, pagination).
 * Data is fetched from the PostgreSQL backend via ApiAlertRepository.
 */
export function useAlerts(filters?: AlertFilter) {
  return useQuery({
    queryKey: ["alerts", filters],
    queryFn: () => container.alertRepository.getAlerts(filters),
    staleTime: 60_000 // 1 minute
  });
}

/**
 * Fetch a single alert log by ID.
 */
export function useAlertById(id: number | undefined) {
  return useQuery({
    queryKey: ["alert", id],
    queryFn: () => container.alertRepository.getAlertById?.(id!),
    enabled: id !== undefined
  });
}

/**
 * Fetch aggregate alert counts per type for a given date (defaults to today).
 */
export function useAlertSummary(date?: string) {
  return useQuery({
    queryKey: ["alert-summary", date],
    queryFn: () => container.alertRepository.getAlertSummary?.(date),
    staleTime: 60_000
  });
}

/**
 * Fetch the list of distinct sent_dates available in the alert logs table.
 * Useful for populating a date picker in the UI.
 */
export function useDistinctAlertDates() {
  return useQuery({
    queryKey: ["alert-distinct-dates"],
    queryFn: () => container.alertRepository.getDistinctDates?.(),
    staleTime: 300_000 // 5 minutes
  });
}

/**
 * Acknowledge an alert by ID (optimistically invalidates the alerts query).
 */
export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => container.alertRepository.acknowledgeAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["alert-summary"] });
    }
  });
}

/**
 * Fetch acknowledgements from email_acknowledgements with filters.
 */
export function useAcknowledgements(filters?: {
  scheme_id?: string;
  alert_type?: string;
  sent_date?: string;
  acknowledged?: "true" | "false" | "all";
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["acknowledgements", filters],
    queryFn: () => container.acknowledgementRepository.getAcknowledgements(filters),
    staleTime: 60_000
  });
}

/**
 * Fetch acknowledgement status for a specific scheme + alert type (with optional date).
 */
export function useAcknowledgementStatus(
  schemeId: string | undefined,
  alertType: string | undefined,
  date?: string
) {
  return useQuery({
    queryKey: ["ack-status", schemeId, alertType, date],
    queryFn: () => container.acknowledgementRepository.getStatus(schemeId!, alertType!, date),
    enabled: !!schemeId && !!alertType,
    staleTime: 30_000
  });
}

/**
 * Mark a single acknowledgement row as acknowledged (in-app).
 */
export function useMarkAcknowledged() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => container.acknowledgementRepository.markAcknowledged(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["acknowledgements"] });
      queryClient.invalidateQueries({ queryKey: ["ack-status"] });
    }
  });
}

