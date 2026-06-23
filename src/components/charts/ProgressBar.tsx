import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";
import { AppText } from "@/components/common/AppText";

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color?: string;
}

export function ProgressBar({ label, value, total, color = colors.primary }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="caption" muted>
          {label}
        </AppText>
        <AppText variant="caption" style={styles.percent}>
          {pct}%
        </AppText>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  percent: {
    fontWeight: "800"
  },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill
  }
});
