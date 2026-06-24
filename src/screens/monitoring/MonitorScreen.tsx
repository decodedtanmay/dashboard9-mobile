import { useMemo, useState } from "react";
import { View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { RegionSelector } from "@/components/common/RegionSelector";
import { Screen } from "@/components/common/Screen";
import { SearchInput } from "@/components/common/SearchInput";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { InfoCard } from "@/components/cards/InfoCard";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { ReadingListItem } from "@/components/lists/ReadingListItem";
import { colors } from "@/constants/theme";
import { useMonitoringData } from "@/hooks/useRepositories";
import { useFilterStore } from "@/store/filterStore";
import { average, classifyChlorine, classifyLPCD, classifyPressure } from "@/services/classification";
import { formatDecimal } from "@/utils/format";

type MonitorTab = "LPCD" | "Chlorine" | "Pressure" | "Water" | "Comm";

export function MonitorScreen() {
  const [tab, setTab] = useState<MonitorTab>("LPCD");
  const [search, setSearch] = useState("");
  const filter = useFilterStore((state) => state.filter);
  const setRegion = useFilterStore((state) => state.setRegion);
  const query = useMonitoringData(filter);
  const term = search.trim().toLowerCase();

  const data = query.data;
  const filtered = useMemo(() => {
    const includes = (value: string) => value.toLowerCase().includes(term);
    return {
      lpcd: (data?.lpcd ?? []).filter((item) => !term || includes(`${item.scheme_name} ${item.village_name} ${item.block}`)),
      chlorine: (data?.chlorine ?? []).filter((item) => !term || includes(`${item.scheme_name} ${item.village_name} ${item.esr_name}`)),
      pressure: (data?.pressure ?? []).filter((item) => !term || includes(`${item.scheme_name} ${item.village_name} ${item.esr_name}`)),
      water: (data?.water ?? []).filter((item) => !term || includes(`${item.scheme_name} ${item.village_name} ${item.esr_name}`)),
      communication: (data?.communication ?? []).filter((item) => !term || includes(`${item.scheme_name} ${item.village_name} ${item.esr_name}`))
    };
  }, [data, term]);

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <View>
        <AppText variant="title">Monitoring</AppText>
        <AppText muted>Mobile-first operational view for field checks and compliance review.</AppText>
      </View>
      <RegionSelector value={filter.region} onChange={setRegion} />
      <SegmentedControl<MonitorTab> options={["LPCD", "Chlorine", "Pressure", "Water", "Comm"]} value={tab} onChange={setTab} />
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search scheme, village, ESR..." />

      {tab === "LPCD" ? (
        <>
          <InfoCard title="LPCD Status">
            <ProgressBar label="Above 55" value={filtered.lpcd.filter((item) => classifyLPCD(item.lpcd_value_day1) === "above_55").length} total={filtered.lpcd.length || 1} color={colors.good} />
            <ProgressBar label="Below 55" value={filtered.lpcd.filter((item) => classifyLPCD(item.lpcd_value_day1) === "below_55").length} total={filtered.lpcd.length || 1} color={colors.warning} />
            <ProgressBar label="Zero" value={filtered.lpcd.filter((item) => classifyLPCD(item.lpcd_value_day1) === "zero").length} total={filtered.lpcd.length || 1} color={colors.critical} />
          </InfoCard>
          {filtered.lpcd.map((item) => {
            const status = classifyLPCD(item.lpcd_value_day1);
            return (
              <ReadingListItem
                key={`${item.scheme_id}-${item.village_name}`}
                title={item.village_name}
                subtitle={`${item.scheme_name} • ${item.block}`}
                value={`${formatDecimal(item.lpcd_value_day1)} LPCD`}
                label={status === "above_55" ? "Above 55" : status === "below_55" ? "Below 55" : "Zero"}
                tone={status === "above_55" ? "good" : status === "below_55" ? "warning" : "critical"}
              />
            );
          })}
        </>
      ) : null}

      {tab === "Chlorine" ? (
        <>
          <InfoCard title={`Average chlorine ${formatDecimal(average(filtered.chlorine.map((item) => item.chlorine_value_1)), 2)} mg/L`}>
            <ProgressBar label="Optimal 0.2-0.5" value={filtered.chlorine.filter((item) => classifyChlorine(item.chlorine_value_1) === "optimal").length} total={filtered.chlorine.length || 1} color={colors.good} />
            <ProgressBar label="Below 0.2" value={filtered.chlorine.filter((item) => classifyChlorine(item.chlorine_value_1) === "below").length} total={filtered.chlorine.length || 1} color={colors.critical} />
            <ProgressBar label="Above 0.5" value={filtered.chlorine.filter((item) => classifyChlorine(item.chlorine_value_1) === "above").length} total={filtered.chlorine.length || 1} color={colors.warning} />
          </InfoCard>
          {filtered.chlorine.map((item) => {
            const status = classifyChlorine(item.chlorine_value_1);
            return (
              <ReadingListItem
                key={`${item.scheme_id}-${item.esr_name}`}
                title={item.esr_name}
                subtitle={`${item.village_name} • ${item.scheme_name}`}
                value={`${formatDecimal(item.chlorine_value_1, 2)} mg/L`}
                label={status}
                tone={status === "optimal" ? "good" : status === "below" ? "critical" : "warning"}
              />
            );
          })}
        </>
      ) : null}

      {tab === "Pressure" ? (
        <>
          <InfoCard title={`Average pressure ${formatDecimal(average(filtered.pressure.map((item) => item.pressure_value_1)), 2)} bar`}>
            <ProgressBar label="Optimal 0.2-0.7" value={filtered.pressure.filter((item) => classifyPressure(item.pressure_value_1) === "optimal").length} total={filtered.pressure.length || 1} color={colors.good} />
            <ProgressBar label="Low below 0.2" value={filtered.pressure.filter((item) => classifyPressure(item.pressure_value_1) === "low").length} total={filtered.pressure.length || 1} color={colors.critical} />
            <ProgressBar label="High above 0.7" value={filtered.pressure.filter((item) => classifyPressure(item.pressure_value_1) === "high").length} total={filtered.pressure.length || 1} color={colors.warning} />
          </InfoCard>
          {filtered.pressure.map((item) => {
            const status = classifyPressure(item.pressure_value_1);
            return (
              <ReadingListItem
                key={`${item.scheme_id}-${item.esr_name}`}
                title={item.esr_name}
                subtitle={`${item.village_name} • ${item.scheme_name}`}
                value={`${formatDecimal(item.pressure_value_1, 2)} bar`}
                label={status}
                tone={status === "optimal" ? "good" : status === "low" ? "critical" : "warning"}
              />
            );
          })}
        </>
      ) : null}

      {tab === "Water"
        ? filtered.water.map((item) => (
            <ReadingListItem
              key={`${item.scheme_id}-${item.esr_name}`}
              title={item.esr_name}
              subtitle={`${item.village_name} • ${item.online_status}`}
              value={`${formatDecimal(item.water_value_day1)} KL`}
              label={`${formatDecimal(item.flow_rate_m3)} m3/h`}
              tone={item.online_status === "Online" ? "good" : "critical"}
            />
          ))
        : null}

      {tab === "Comm"
        ? filtered.communication.map((item) => (
            <ReadingListItem
              key={`${item.scheme_id}-${item.esr_name}`}
              title={item.esr_name}
              subtitle={`${item.village_name} • Cl ${item.chlorine_status} • P ${item.pressure_status} • FM ${item.flow_meter_status}`}
              value={item.overall_status}
              label={item.overall_status === "Online" ? "Communicating" : "Check"}
              tone={item.overall_status === "Online" ? "good" : item.overall_status === "Partial" ? "warning" : "critical"}
            />
          ))
        : null}
    </Screen>
  );
}
