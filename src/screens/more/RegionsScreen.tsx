import { View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { RegionSelector } from "@/components/common/RegionSelector";
import { Screen } from "@/components/common/Screen";
import { InfoCard } from "@/components/cards/InfoCard";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { colors } from "@/constants/theme";
import { useRegions } from "@/hooks/useRepositories";
import { useFilterStore } from "@/store/filterStore";

export function RegionsScreen() {
  const filter = useFilterStore((state) => state.filter);
  const setRegion = useFilterStore((state) => state.setRegion);
  const query = useRegions();

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <View>
        <AppText variant="title">Regions</AppText>
        <AppText muted>Region-level GIS-ready summary. Native polygon overlays can replace these cards when map credentials are available.</AppText>
      </View>
      <RegionSelector value={filter.region} onChange={setRegion} />
      {(query.data ?? []).map((region) => (
        <InfoCard key={region.region_id} title={region.region_name}>
          <ProgressBar label="Schemes completed" value={region.fully_completed_schemes} total={region.total_schemes_integrated} color={colors.primary} />
          <ProgressBar label="Villages completed" value={region.fully_completed_villages} total={region.total_villages_integrated} color={colors.good} />
          <ProgressBar label="ESR completed" value={region.fully_completed_esr} total={region.total_esr_integrated} color={colors.cyan} />
        </InfoCard>
      ))}
    </Screen>
  );
}
