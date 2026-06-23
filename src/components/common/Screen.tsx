import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, ViewStyle, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/constants/theme";
import { haptics } from "@/utils/haptics";

interface ScreenProps {
  scroll?: boolean;
  style?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function Screen({ children, scroll = true, style, refreshing, onRefresh }: PropsWithChildren<ScreenProps>) {
  const { colors, spacing } = useTheme();
  
  const handleRefresh = () => {
    if (onRefresh) {
      haptics.impactLight();
      onRefresh();
    }
  };

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, { padding: spacing.lg, gap: spacing.lg }, style]}
      refreshControl={onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={handleRefresh} /> : undefined}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { padding: spacing.lg, gap: spacing.lg }, styles.flex, style]}>{children}</View>
  );

  return <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    // spacing layout dynamically configured in render
  },
  flex: {
    flex: 1
  }
});
