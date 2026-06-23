import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { useTheme } from "@/constants/theme";

interface InfoCardProps {
  title?: string;
}

export function InfoCard({ title, children }: PropsWithChildren<InfoCardProps>) {
  const { colors, radius, shadow, spacing } = useTheme();

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
      {title ? <AppText variant="subtitle">{title}</AppText> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1
  }
});
