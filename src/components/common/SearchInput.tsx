import { Search } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChangeText, placeholder }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Search size={18} color={colors.textMuted} />
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textMuted} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 15
  }
});
