import { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { colors, radius, shadow, spacing } from "@/constants/theme";

interface MetricCardProps {
  label: string;
  value: string;
  tone?: "blue" | "green" | "orange" | "red" | "purple" | "cyan";
  icon?: LucideIcon;
}

const toneColors = {
  blue: colors.primary,
  green: colors.good,
  orange: colors.warning,
  red: colors.critical,
  purple: colors.purple,
  cyan: colors.cyan
};

export function MetricCard({ label, value, tone = "blue", icon: Icon }: MetricCardProps) {
  const color = toneColors[tone];
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${color}18` }]}>{Icon ? <Icon size={20} color={color} /> : null}</View>
      <AppText variant="metric">{value}</AppText>
      <AppText variant="caption" muted>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadow.card
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center"
  }
});
