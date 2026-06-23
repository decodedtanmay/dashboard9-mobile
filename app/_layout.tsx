import "react-native-reanimated";
import { Stack } from "expo-router";
import { AppProviders } from "@/core/providers/AppProviders";
import { initGlobalErrorTracking } from "@/utils/logger";

// Initialize global logger/error tracking
initGlobalErrorTracking();

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </AppProviders>
  );
}

