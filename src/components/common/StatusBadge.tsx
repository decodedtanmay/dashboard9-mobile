import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";
import { AppText } from "@/components/common/AppText";

type Tone = "good" | "warning" | "critical" | "info" | "muted";

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
}

const toneColors: Record<Tone, { bg: string; fg: string }> = {
  good: { bg: "#ECFDF5", fg: colors.good },
  warning: { bg: "#FFFBEB", fg: colors.warning },
  critical: { bg: "#FEF2F2", fg: colors.critical },
  info: { bg: colors.primaryLight, fg: colors.primary },
  muted: { bg: colors.surfaceAlt, fg: colors.textMuted }
};

export function StatusBadge({ label, tone = "muted" }: StatusBadgeProps) {
  const toneStyle = toneColors[tone];
  return (
    <View style={[styles.badge, { backgroundColor: toneStyle.bg }]}>
      <AppText variant="caption" style={{ color: toneStyle.fg, fontWeight: "700" }}>
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
