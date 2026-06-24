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
  hasTabBar?: boolean;
}

export function Screen({ children, scroll = true, style, refreshing, onRefresh, hasTabBar = true }: PropsWithChildren<ScreenProps>) {
  const { colors, spacing } = useTheme();
  
  const handleRefresh = () => {
    if (onRefresh) {
      haptics.impactLight();
      onRefresh();
    }
  };

  const bottomPadding = hasTabBar ? 96 : spacing.lg;

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, { padding: spacing.lg, paddingBottom: bottomPadding, gap: spacing.lg }, style]}
      refreshControl={onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={handleRefresh} /> : undefined}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { padding: spacing.lg, paddingBottom: bottomPadding, gap: spacing.lg }, styles.flex, style]}>{children}</View>
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
