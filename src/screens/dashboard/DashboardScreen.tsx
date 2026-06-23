
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Activity, AlertTriangle, Droplets, Gauge, RadioTower, ShieldCheck, Users, Waves, ChevronRight } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { RegionSelector } from "@/components/common/RegionSelector";
import { Screen } from "@/components/common/Screen";
import { MetricCard } from "@/components/cards/MetricCard";
import { InfoCard } from "@/components/cards/InfoCard";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { Skeleton } from "@/components/common/Skeleton";
import { colors, radius, spacing, shadow } from "@/constants/theme";
import { useDashboardData, useMoreData } from "@/hooks/useRepositories";
import { useFilterStore } from "@/store/filterStore";
import { compactNumber, formatDecimal, formatNumber } from "@/utils/format";
import { haptics } from "@/utils/haptics";

export function DashboardScreen() {
  const filter = useFilterStore((state) => state.filter);
  const setRegion = useFilterStore((state) => state.setRegion);
  const query = useDashboardData(filter);
  const moreQuery = useMoreData();
  
  const data = query.data;
  const alerts = moreQuery.data?.alerts ?? [];
  const activeAlertsCount = alerts.filter(a => !a.acknowledged).length;

  if (query.isLoading || moreQuery.isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.headerContainer}>
          <Skeleton width={140} height={28} borderRadius={radius.sm} style={{ marginBottom: spacing.xs }} />
          <Skeleton width="90%" height={16} borderRadius={radius.xs} />
        </View>

        <Skeleton width="100%" height={48} borderRadius={radius.lg} style={{ marginVertical: spacing.xs }} />

        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={[styles.action, { height: 90, flex: 0, width: "47%" }]}>
              <Skeleton width={24} height={24} borderRadius={radius.sm} style={{ alignSelf: "flex-start", marginBottom: spacing.xs }} />
              <Skeleton width="70%" height={16} borderRadius={radius.xs} style={{ alignSelf: "flex-start", marginBottom: spacing.xxs }} />
              <Skeleton width="40%" height={12} borderRadius={radius.xs} style={{ alignSelf: "flex-start" }} />
            </View>
          ))}
        </View>

        <View style={[styles.action, { gap: spacing.md, padding: spacing.lg, alignItems: "stretch" }]}>
          <Skeleton width={150} height={20} borderRadius={radius.xs} style={{ marginBottom: spacing.xs }} />
          <Skeleton width="100%" height={10} borderRadius={radius.pill} />
          <Skeleton width="100%" height={10} borderRadius={radius.pill} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen refreshing={query.isFetching || moreQuery.isFetching} onRefresh={() => { query.refetch(); moreQuery.refetch(); }}>
      <View style={styles.headerContainer}>
        <AppText variant="title">Dashboard</AppText>
        <AppText muted style={styles.subtitle}>Real-time water network status and compliance tracking.</AppText>
      </View>

      <RegionSelector value={filter.region} onChange={setRegion} />

      {activeAlertsCount > 0 ? (
        <Pressable 
          style={styles.alertBanner} 
          onPress={() => {
            haptics.selection();
            router.push("/(main)/alerts");
          }}
        >
          <View style={styles.alertBannerLeft}>
            <View style={styles.alertIconBg}>
              <AlertTriangle size={20} color={colors.critical} />
            </View>
            <View>
              <AppText style={styles.alertBannerTitle}>{activeAlertsCount} Critical Alerts</AppText>
              <AppText variant="caption" style={styles.alertBannerSub}>Action required in Kamptee Regional Scheme</AppText>
            </View>
          </View>
          <ChevronRight size={18} color={colors.critical} />
        </Pressable>
      ) : null}

      <View style={styles.grid}>
        <MetricCard label="Schemes" value={formatNumber(data?.totalSchemes ?? 0)} icon={Droplets} />
        <MetricCard label="Villages" value={formatNumber(data?.totalVillages ?? 0)} tone="green" icon={Users} />
        <MetricCard label="ESR Points" value={formatNumber(data?.totalEsr ?? 0)} tone="cyan" icon={Waves} />
        <MetricCard label="Population" value={compactNumber(data?.totalPopulation ?? 0)} tone="purple" icon={Users} />
        <MetricCard label="Avg LPCD" value={formatDecimal(data?.avgLpcd ?? 0)} tone="orange" icon={Gauge} />
        <MetricCard label="Sensors Online" value={formatNumber(data?.communicatingSensors ?? 0)} tone="green" icon={RadioTower} />
      </View>

      <InfoCard title="Compliance Summary">
        <ProgressBar label="LPCD above 55" value={data?.above55Count ?? 0} total={data?.totalVillages ?? 1} color={colors.good} />
        <ProgressBar label="LPCD below 55" value={data?.below55Count ?? 0} total={data?.totalVillages ?? 1} color={colors.warning} />
        <ProgressBar label="Zero supply villages" value={data?.zeroCount ?? 0} total={data?.totalVillages ?? 1} color={colors.critical} />
      </InfoCard>

      <InfoCard title="Water Quality & Pressure">
        <ProgressBar label="Optimal chlorine" value={data?.optimalChlorine ?? 0} total={data?.totalEsr ?? 1} color={colors.good} />
        <ProgressBar label="Low chlorine" value={data?.belowChlorine ?? 0} total={data?.totalEsr ?? 1} color={colors.critical} />
        <ProgressBar label="Optimal pressure" value={data?.optimalPressure ?? 0} total={data?.totalEsr ?? 1} color={colors.primary} />
      </InfoCard>

      <View style={styles.actions}>
        <QuickAction 
          label="Schemes" 
          icon={<Droplets size={20} color={colors.primary} />} 
          onPress={() => {
            haptics.selection();
            router.push("/(main)/dashboard/schemes");
          }} 
        />
        <QuickAction 
          label="Monitoring" 
          icon={<Activity size={20} color={colors.primary} />} 
          onPress={() => {
            haptics.selection();
            router.push("/(main)/monitoring");
          }} 
        />
        <QuickAction 
          label="Helpdesk" 
          icon={<ShieldCheck size={20} color={colors.primary} />} 
          onPress={() => {
            haptics.selection();
            router.push("/(main)/helpdesk");
          }} 
        />
      </View>
    </Screen>
  );
}

function QuickAction({ label, icon, onPress }: { label: string; icon: ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.action}>
      {icon}
      <AppText variant="caption" style={styles.actionText}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: spacing.xs
  },
  subtitle: {
    marginTop: spacing.xxs
  },
  alertBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.criticalLight,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: `${colors.critical}20`,
    marginVertical: spacing.xs,
    ...shadow.sm
  },
  alertBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  alertIconBg: {
    backgroundColor: `${colors.critical}15`,
    padding: spacing.sm,
    borderRadius: radius.md
  },
  alertBannerTitle: {
    color: colors.critical,
    fontWeight: "700",
    fontSize: 15
  },
  alertBannerSub: {
    color: colors.critical,
    opacity: 0.8
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginVertical: spacing.sm
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginVertical: spacing.sm
  },
  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderColor: colors.borderLight,
    borderWidth: 1,
    ...shadow.card
  },
  actionText: {
    color: colors.primary,
    fontWeight: "800"
  }
});
