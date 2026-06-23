import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { colors, radius, shadow, spacing } from "@/constants/theme";

interface InfoCardProps {
  title?: string;
}

export function InfoCard({ title, children }: PropsWithChildren<InfoCardProps>) {
  return (
    <View style={styles.card}>
      {title ? <AppText variant="subtitle">{title}</AppText> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadow.card
  }
});
