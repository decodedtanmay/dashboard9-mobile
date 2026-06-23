import { PropsWithChildren } from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme";

interface AppTextProps extends TextProps {
  variant?: "title" | "subtitle" | "body" | "caption" | "metric";
  muted?: boolean;
}

export function AppText({ children, style, variant = "body", muted, ...props }: PropsWithChildren<AppTextProps>) {
  const { colors, typography } = useTheme();

  return (
    <Text 
      {...props} 
      style={[
        styles.base,
        { color: colors.text, fontFamily: typography.fonts.body },
        styles[variant],
        variant === "caption" && { color: colors.textSecondary },
        muted && { color: colors.textMuted },
        style
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: "400" // Fallback fallback mapping
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34
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
    fontSize: 13,
    lineHeight: 16
  },
  metric: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900"
  }
});
