import { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { useTheme } from "@/constants/theme";

interface MetricCardProps {
  label: string;
  value: string;
  tone?: "blue" | "green" | "orange" | "red" | "purple" | "cyan";
  icon?: LucideIcon;
}

export function MetricCard({ label, value, tone = "blue", icon: Icon }: MetricCardProps) {
  const { colors, radius, shadow, spacing } = useTheme();

  const toneColors = {
    blue: colors.primary,
    green: colors.good,
    orange: colors.warning,
    red: colors.critical,
    purple: colors.purple,
    cyan: colors.cyan
  };

  const color = toneColors[tone];

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.surface, 
          borderRadius: radius.lg,
          padding: spacing.lg,
          gap: spacing.md,
          borderColor: colors.borderLight,
        },
        shadow.card
      ]}
    >
      <View style={[styles.icon, { backgroundColor: `${color}15`, borderRadius: radius.lg }]}>
        {Icon ? <Icon size={20} color={color} /> : null}
      </View>
      <View style={styles.content}>
        <AppText variant="metric" style={{ color: colors.text, fontWeight: "900" }}>{value}</AppText>
        <AppText variant="caption" muted style={{ color: colors.textSecondary, fontWeight: "600" }}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
    borderWidth: 1
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    gap: 2
  }
});
