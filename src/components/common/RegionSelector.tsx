import { ScrollView, Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";
import { colors, radius, spacing } from "@/constants/theme";
import { RegionName } from "@/domain/entities";
import { regionNames } from "@/mock/mockData";

interface RegionSelectorProps {
  value?: RegionName | "All";
  onChange: (value: RegionName | "All") => void;
}

export function RegionSelector({ value = "All", onChange }: RegionSelectorProps) {
  const options: (RegionName | "All")[] = ["All", ...regionNames];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((region) => {
        const selected = value === region;
        return (
          <Pressable key={region} onPress={() => onChange(region)} style={[styles.chip, selected && styles.selected]}>
            <AppText variant="caption" style={[styles.label, selected && styles.selectedLabel]}>
              {region}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingRight: spacing.lg
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  label: {
    fontWeight: "700"
  },
  selectedLabel: {
    color: "white"
  }
});
