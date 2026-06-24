import { useMemo, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { RegionSelector } from "@/components/common/RegionSelector";
import { Screen } from "@/components/common/Screen";
import { SearchInput } from "@/components/common/SearchInput";
import { SchemeListItem } from "@/components/lists/SchemeListItem";
import { useSchemes } from "@/hooks/useRepositories";
import { useFilterStore } from "@/store/filterStore";

export function SchemesListScreen() {
  const [search, setSearch] = useState("");
  const filter = useFilterStore((state) => state.filter);
  const setRegion = useFilterStore((state) => state.setRegion);
  const query = useSchemes(filter);

  const schemes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (query.data ?? []).filter((scheme) => {
      if (!term) return true;
      return `${scheme.scheme_id} ${scheme.scheme_name} ${scheme.block} ${scheme.agency_type}`.toLowerCase().includes(term);
    });
  }, [query.data, search]);

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <View>
        <AppText variant="title">Schemes</AppText>
        <AppText muted>Search and inspect scheme status, village coverage, ESR integration, and agency ownership.</AppText>
      </View>
      <RegionSelector value={filter.region} onChange={setRegion} />
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search scheme, block, agency..." />
      {schemes.map((scheme) => (
        <SchemeListItem key={`${scheme.scheme_id}-${scheme.block}`} scheme={scheme} onPress={() => router.push(`/(main)/dashboard/scheme/${scheme.scheme_id}`)} />
      ))}
      {!schemes.length ? <AppText muted>No schemes match the selected filters.</AppText> : null}
    </Screen>
  );
}
