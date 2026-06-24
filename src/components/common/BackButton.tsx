import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { useTheme } from "@/constants/theme";
import { haptics } from "@/utils/haptics";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Back" }: BackButtonProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Pressable
      onPress={() => {
        haptics.selection();
        router.back();
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? colors.surfaceAlt : colors.surface,
          borderColor: colors.border,
          borderRadius: radius.lg,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        }
      ]}
    >
      <ArrowLeft size={18} color={colors.primary} strokeWidth={2.5} />
      <AppText style={[styles.label, { color: colors.primary }]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
  }
});
