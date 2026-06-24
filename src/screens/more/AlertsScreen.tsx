import { Pressable, StyleSheet, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { colors, radius, spacing, shadow, typography } from "@/constants/theme";
import { container } from "@/core/container";
import { queryClient } from "@/core/queryClient";
import { useMoreData } from "@/hooks/useRepositories";
import { haptics } from "@/utils/haptics";

export function AlertsScreen() {
  const query = useMoreData();
  const acknowledge = useMutation({
    mutationFn: (id: number) => container.alertRepository.acknowledgeAlert(id),
    onSuccess: () => {
      haptics.notificationSuccess();
      queryClient.invalidateQueries({ queryKey: ["more-data"] });
    }
  });

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <View style={styles.header}>
        <AppText variant="title">Alerts</AppText>
        <AppText muted style={styles.subtitle}>Critical alert logs mirror `email_alert_logs` and can later deep-link from push notifications.</AppText>
      </View>
      
      <View style={styles.list}>
        {(query.data?.alerts ?? []).map((alert) => (
          <InfoCard key={alert.id}>
            <View style={styles.cardHeader}>
              <StatusBadge label={alert.alert_type} tone={alert.alert_type === "Chlorine" || alert.alert_type === "Pressure" ? "critical" : "warning"} />
              {!alert.acknowledged ? <View style={styles.unreadDot} /> : null}
            </View>
            <View style={styles.cardBody}>
              <AppText variant="subtitle" style={styles.schemeName}>{alert.scheme_name}</AppText>
              <AppText muted style={styles.locationText}>{alert.village_name} {alert.esr_name ? `• ${alert.esr_name}` : ""}</AppText>
              <AppText style={styles.valueText}>{alert.alert_value}</AppText>
            </View>
            {!alert.acknowledged ? (
              <Pressable 
                style={styles.button} 
                onPress={() => {
                  haptics.selection();
                  acknowledge.mutate(alert.id);
                }}
              >
                <AppText variant="caption" style={styles.buttonText}>Acknowledge</AppText>
              </Pressable>
            ) : (
              <View style={styles.acknowledgedBadge}>
                <AppText variant="caption" style={styles.acknowledgedText}>Acknowledged</AppText>
              </View>
            )}
          </InfoCard>
        ))}
        {query.data?.alerts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <ShieldCheck size={48} color={colors.success} />
            </View>
            <AppText variant="subtitle" style={styles.emptyTitle}>
              All Systems Normal
            </AppText>
            <AppText muted style={styles.emptySub}>
              There are no active alerts at the moment. All monitored schemes are functioning within normal parameters.
            </AppText>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md
  },
  subtitle: {
    marginTop: spacing.xs
  },
  list: {
    gap: spacing.md
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.critical
  },
  cardBody: {
    gap: spacing.xs,
    marginVertical: spacing.xs
  },
  schemeName: {
    fontWeight: typography.weights.bold,
    fontSize: 16
  },
  locationText: {
    fontSize: 13
  },
  valueText: {
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary
  },
  button: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignSelf: "flex-start",
    marginTop: spacing.xs,
    ...shadow.sm
  },
  buttonText: {
    color: colors.primary,
    fontWeight: typography.weights.bold
  },
  acknowledgedBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignSelf: "flex-start",
    marginTop: spacing.xs
  },
  acknowledgedText: {
    color: colors.textMuted,
    fontWeight: typography.weights.semibold
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginTop: spacing.xl,
    ...shadow.card
  },
  emptyIconBg: {
    backgroundColor: colors.successLight,
    padding: spacing.xl,
    borderRadius: radius.pill,
    marginBottom: spacing.md
  },
  emptyTitle: {
    fontWeight: typography.weights.bold,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs
  },
  emptySub: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20
  }
});
