import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { StatusBadge } from "@/components/common/StatusBadge";
import { colors, radius, spacing } from "@/constants/theme";

interface ReadingListItemProps {
  title: string;
  subtitle: string;
  value: string;
  label: string;
  tone: "good" | "warning" | "critical" | "info" | "muted";
}

export function ReadingListItem({ title, subtitle, value, label, tone }: ReadingListItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.text}>
        <AppText variant="body" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="caption" muted>
          {subtitle}
        </AppText>
      </View>
      <View style={styles.value}>
        <AppText variant="subtitle">{value}</AppText>
        <StatusBadge label={label} tone={tone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md
  },
  text: {
    flex: 1
  },
  title: {
    fontWeight: "700"
  },
  value: {
    alignItems: "flex-end",
    gap: spacing.xs
  }
});
