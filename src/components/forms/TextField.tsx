import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { colors, radius, spacing } from "@/constants/theme";

interface TextFieldProps extends TextInputProps {
  label: string;
}

export function TextField({ label, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <AppText variant="caption" muted style={styles.label}>
        {label}
      </AppText>
      <TextInput placeholderTextColor={colors.textMuted} style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  label: {
    fontWeight: "700"
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 15
  }
});
