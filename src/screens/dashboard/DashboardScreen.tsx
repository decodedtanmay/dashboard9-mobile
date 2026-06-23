import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Activity, Droplets, Gauge, RadioTower, ShieldCheck, Users, Waves } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { RegionSelector } from "@/components/common/RegionSelector";
import { Screen } from "@/components/common/Screen";
import { MetricCard } from "@/components/cards/MetricCard";
import { InfoCard } from "@/components/cards/InfoCard";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { colors, radius, spacing } from "@/constants/theme";
import { useDashboardData } from "@/hooks/useRepositories";
import { useFilterStore } from "@/store/filterStore";
import { compactNumber, formatDecimal, formatNumber } from "@/utils/format";

export function DashboardScreen() {
  const filter = useFilterStore((state) => state.filter);
  const setRegion = useFilterStore((state) => state.setRegion);
  const query = useDashboardData(filter);
  const data = query.data;

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <View>
        <AppText variant="title">Dashboard</AppText>
        <AppText muted>Last snapshot from repository layer. Ready for API replacement.</AppText>
      </View>

      <RegionSelector value={filter.region} onChange={setRegion} />

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
        <QuickAction label="Schemes" icon={<Droplets size={20} color={colors.primary} />} onPress={() => router.push("/(main)/dashboard/schemes")} />
        <QuickAction label="Monitor" icon={<Activity size={20} color={colors.primary} />} onPress={() => router.push("/(main)/monitor")} />
        <QuickAction label="Helpdesk" icon={<ShieldCheck size={20} color={colors.primary} />} onPress={() => router.push("/(main)/helpdesk")} />
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md
  },
  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderColor: colors.border,
    borderWidth: 1
  },
  actionText: {
    color: colors.primary,
    fontWeight: "800"
  }
});
