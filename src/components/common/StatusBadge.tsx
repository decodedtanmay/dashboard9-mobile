import { StyleSheet, View } from "react-native";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { AppText } from "@/components/common/AppText";

type Tone = "good" | "warning" | "critical" | "info" | "muted";

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
}

const toneColors: Record<Tone, { bg: string; fg: string }> = {
  good: { bg: colors.successLight, fg: colors.success },
  warning: { bg: colors.warningLight, fg: colors.warning },
  critical: { bg: colors.criticalLight, fg: colors.critical },
  info: { bg: colors.infoLight, fg: colors.info },
  muted: { bg: colors.surfaceAlt, fg: colors.textMuted }
};

export function StatusBadge({ label, tone = "muted" }: StatusBadgeProps) {
  const toneStyle = toneColors[tone];
  return (
    <View style={[styles.badge, { backgroundColor: toneStyle.bg }]}>
      <AppText variant="caption" style={{ color: toneStyle.fg, fontWeight: typography.weights.bold }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill
  }
});
