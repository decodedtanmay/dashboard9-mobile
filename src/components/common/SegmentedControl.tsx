import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { colors, radius, spacing } from "@/constants/theme";

interface SegmentedControlProps<T extends string> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable key={option} onPress={() => onChange(option)} style={[styles.option, selected && styles.selected]}>
            <AppText variant="caption" style={[styles.label, selected && styles.selectedLabel]} numberOfLines={1}>
              {option}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.xs,
    gap: spacing.xs
  },
  option: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    alignItems: "center"
  },
  selected: {
    backgroundColor: colors.surface
  },
  label: {
    color: colors.textMuted,
    fontWeight: "700"
  },
  selectedLabel: {
    color: colors.primary
  }
});
