import { Pressable, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { colors, radius, spacing } from "@/constants/theme";
import { container } from "@/core/container";
import { queryClient } from "@/core/queryClient";
import { useMoreData } from "@/hooks/useRepositories";

export function AlertsScreen() {
  const query = useMoreData();
  const acknowledge = useMutation({
    mutationFn: (id: number) => container.alertRepository.acknowledgeAlert(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["more-data"] })
  });

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <AppText variant="title">Alerts</AppText>
      <AppText muted>Critical alert logs mirror `email_alert_logs` and can later deep-link from push notifications.</AppText>
      {(query.data?.alerts ?? []).map((alert) => (
        <InfoCard key={alert.id}>
          <StatusBadge label={alert.alert_type} tone={alert.alert_type === "Chlorine" || alert.alert_type === "Pressure" ? "critical" : "warning"} />
          <AppText variant="subtitle">{alert.scheme_name}</AppText>
          <AppText muted>{alert.village_name} {alert.esr_name ? `• ${alert.esr_name}` : ""}</AppText>
          <AppText>{alert.alert_value}</AppText>
          <Pressable style={styles.button} onPress={() => acknowledge.mutate(alert.id)}>
            <AppText variant="caption" style={styles.buttonText}>Acknowledge</AppText>
          </Pressable>
        </InfoCard>
      ))}
      {query.data?.alerts.length === 0 ? <AppText muted>No active alerts.</AppText> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "800"
  }
});
