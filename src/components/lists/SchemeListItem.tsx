import { Pressable, StyleSheet, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { StatusBadge } from "@/components/common/StatusBadge";
import { colors, radius, shadow, spacing } from "@/constants/theme";
import { SchemeStatus } from "@/domain/entities";

interface SchemeListItemProps {
  scheme: SchemeStatus;
  onPress?: () => void;
}

export function SchemeListItem({ scheme, onPress }: SchemeListItemProps) {
  const tone = scheme.water_supply_status === "Full" ? "good" : scheme.water_supply_status === "Partial" ? "warning" : "critical";
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.main}>
        <AppText variant="subtitle">{scheme.scheme_name}</AppText>
        <AppText variant="caption" muted>
          {scheme.scheme_id} • {scheme.block} • {scheme.agency_type}
        </AppText>
        <View style={styles.row}>
          <StatusBadge label={scheme.water_supply_status} tone={tone} />
          <StatusBadge label={scheme.mjp_commissioned === "Yes" ? "Commissioned" : "Pending"} tone={scheme.mjp_commissioned === "Yes" ? "good" : "warning"} />
        </View>
        <AppText variant="caption" muted>
          {scheme.number_of_village} villages • {scheme.total_number_of_esr} ESR • {scheme.no_fully_completed_esr}/{scheme.total_esr_integrated} ESR complete
        </AppText>
      </View>
      <ChevronRight size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadow.card
  },
  main: {
    flex: 1,
    gap: spacing.sm
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
