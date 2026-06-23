import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, ViewStyle, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "@/constants/theme";

interface ScreenProps {
  scroll?: boolean;
  style?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function Screen({ children, scroll = true, style, refreshing, onRefresh }: PropsWithChildren<ScreenProps>) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, style]}
      refreshControl={onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.flex, style]}>{children}</View>
  );

  return <SafeAreaView style={styles.root}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg
  },
  flex: {
    flex: 1
  }
});
