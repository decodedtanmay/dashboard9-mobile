import { StyleSheet, View } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { Activity, Bell, LayoutDashboard, MoreHorizontal } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";
import { useMenuStore } from "@/store/menuStore";
import { MoreBottomSheet } from "@/components/common/MoreBottomSheet";

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openMore = useMenuStore((state) => state.openMore);
  const { colors, isDark } = useTheme();

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            elevation: 0,
            height: 68,
            paddingBottom: 10,
            paddingTop: 8,
            backgroundColor: "transparent"
          },
          tabBarBackground: () => (
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={85}
              style={StyleSheet.absoluteFill}
            />
          )
        }}
      >
        <Tabs.Screen name="dashboard" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} /> }} />
        <Tabs.Screen name="alerts" options={{ title: "Alerts", tabBarIcon: ({ color }) => <Bell size={20} color={color} /> }} />
        <Tabs.Screen name="monitoring" options={{ title: "Monitoring", tabBarIcon: ({ color }) => <Activity size={20} color={color} /> }} />
        <Tabs.Screen 
          name="more" 
          options={{ 
            title: "More", 
            tabBarIcon: ({ color }) => <MoreHorizontal size={20} color={color} /> 
          }} 
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              openMore();
            }
          }}
        />
        <Tabs.Screen name="map" options={{ href: null }} />
        <Tabs.Screen name="helpdesk" options={{ href: null }} />
      </Tabs>
      <MoreBottomSheet />
    </View>
  );
}
