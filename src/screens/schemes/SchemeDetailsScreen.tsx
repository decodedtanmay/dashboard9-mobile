import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { ReadingListItem } from "@/components/lists/ReadingListItem";
import { colors, radius, spacing } from "@/constants/theme";
import { useSchemeDetails } from "@/hooks/useRepositories";
import { average, classifyChlorine, classifyLPCD, classifyPressure } from "@/services/classification";
import { formatDecimal, formatNumber } from "@/utils/format";

type Tab = "Overview" | "Villages" | "ESRs" | "Contacts";

export function SchemeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("Overview");
  const query = useSchemeDetails(id);
  const data = query.data;
  const scheme = data?.scheme;

  const summary = useMemo(() => {
    const villages = data?.villages ?? [];
    return {
      avgLpcd: average(villages.map((item) => item.lpcd_value_day1)),
      above: villages.filter((item) => classifyLPCD(item.lpcd_value_day1) === "above_55").length,
      below: villages.filter((item) => classifyLPCD(item.lpcd_value_day1) === "below_55").length,
      zero: villages.filter((item) => classifyLPCD(item.lpcd_value_day1) === "zero").length
    };
  }, [data]);

  if (!scheme) {
    return (
      <Screen>
        <BackButton />
        <AppText variant="title">Scheme Details</AppText>
        <AppText muted>{query.isLoading ? "Loading scheme..." : "Scheme not found."}</AppText>
      </Screen>
    );
  }

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <InfoCard>
        <AppText variant="title">{scheme.scheme_name}</AppText>
        <AppText muted>
          {scheme.scheme_id} • {scheme.region} • {scheme.block}
        </AppText>
        <View style={styles.badges}>
          <StatusBadge label={scheme.water_supply_status} tone={scheme.water_supply_status === "Full" ? "good" : "warning"} />
          <StatusBadge label={scheme.agency_type} tone="info" />
          <StatusBadge label={scheme.scheme_functional_status} tone="muted" />
        </View>
      </InfoCard>

      <SegmentedControl<Tab> options={["Overview", "Villages", "ESRs", "Contacts"]} value={tab} onChange={setTab} />

      {tab === "Overview" ? (
        <>
          <InfoCard title="Scheme Snapshot">
            <Row label="Villages" value={formatNumber(scheme.number_of_village)} />
            <Row label="ESR Integrated" value={`${scheme.total_esr_integrated}`} />
            <Row label="Flow Meters" value={`${scheme.flow_meters_connected}`} />
            <Row label="Avg LPCD" value={formatDecimal(summary.avgLpcd)} />
          </InfoCard>
          <InfoCard title="LPCD Breakdown">
            <ProgressBar label="Above 55" value={summary.above} total={data?.villages.length ?? 1} color={colors.good} />
            <ProgressBar label="Below 55" value={summary.below} total={data?.villages.length ?? 1} color={colors.warning} />
            <ProgressBar label="Zero supply" value={summary.zero} total={data?.villages.length ?? 1} color={colors.critical} />
          </InfoCard>
        </>
      ) : null}

      {tab === "Villages"
        ? data?.villages.map((village) => {
            const status = classifyLPCD(village.lpcd_value_day1);
            return (
              <ReadingListItem
                key={`${village.scheme_id}-${village.village_name}`}
                title={village.village_name}
                subtitle={`${formatNumber(village.population)} population • ${village.number_of_esr} ESR`}
                value={`${formatDecimal(village.lpcd_value_day1)} LPCD`}
                label={status === "above_55" ? "Above 55" : status === "below_55" ? "Below 55" : "Zero"}
                tone={status === "above_55" ? "good" : status === "below_55" ? "warning" : "critical"}
              />
            );
          })
        : null}

      {tab === "ESRs"
        ? data?.chlorine.map((item) => {
            const chlorine = classifyChlorine(item.chlorine_value_1);
            const pressure = data.pressure.find((entry) => entry.esr_name === item.esr_name);
            const pressureStatus = classifyPressure(pressure?.pressure_value_1);
            return (
              <InfoCard key={`${item.scheme_id}-${item.esr_name}`}>
                <AppText variant="subtitle">{item.esr_name}</AppText>
                <AppText muted>{item.village_name}</AppText>
                <View style={styles.badges}>
                  <StatusBadge label={`Cl ${item.chlorine_value_1} mg/L`} tone={chlorine === "optimal" ? "good" : chlorine === "below" ? "critical" : "warning"} />
                  <StatusBadge label={`P ${pressure?.pressure_value_1 ?? 0} bar`} tone={pressureStatus === "optimal" ? "good" : pressureStatus === "low" ? "critical" : "warning"} />
                  <StatusBadge label={data.communication.find((entry) => entry.esr_name === item.esr_name)?.overall_status ?? "Unknown"} tone="info" />
                </View>
              </InfoCard>
            );
          })
        : null}

      {tab === "Contacts" && data?.engineer ? (
        <InfoCard title="Engineer Contacts">
          <Contact label="Civil" name={data.engineer.civil_engineer_name} phone={data.engineer.civil_engineer_mobile} email={data.engineer.civil_engineer_email} />
          <Contact label="Mechanical" name={data.engineer.mechanical_engineer_name} phone={data.engineer.mechanical_engineer_mobile} email={data.engineer.mechanical_engineer_email} />
          <Contact label="Site" name={data.engineer.site_supervisor_name} phone={data.engineer.site_supervisor_mobile} email={data.engineer.site_supervisor_email} />
        </InfoCard>
      ) : null}
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <AppText muted>{label}</AppText>
      <AppText style={styles.rowValue}>{value}</AppText>
    </View>
  );
}

function Contact({ label, name, phone, email }: { label: string; name: string; phone: string; email: string }) {
  return (
    <View style={styles.contact}>
      <View style={{ flex: 1 }}>
        <AppText style={styles.rowValue}>{label}: {name}</AppText>
        <AppText variant="caption" muted>{email}</AppText>
      </View>
      <Pressable style={styles.call} onPress={() => Linking.openURL(`tel:${phone}`)}>
        <AppText variant="caption" style={styles.callText}>Call</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  rowValue: {
    fontWeight: "800"
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  call: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  callText: {
    color: colors.primary,
    fontWeight: "800"
  }
});
