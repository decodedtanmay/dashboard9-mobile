import { PropsWithChildren } from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

interface AppTextProps extends TextProps {
  variant?: "title" | "subtitle" | "body" | "caption" | "metric";
  muted?: boolean;
}

export function AppText({ children, style, variant = "body", muted, ...props }: PropsWithChildren<AppTextProps>) {
  return (
    <Text {...props} style={[styles.base, styles[variant], muted && styles.muted, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24
  },
  body: {
    fontSize: 15,
    lineHeight: 22
  },
  caption: {
    fontSize: 12,
    lineHeight: 16
  },
  metric: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800"
  },
  muted: {
    color: colors.textMuted
  }
});
