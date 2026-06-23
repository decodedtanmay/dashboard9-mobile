import { Redirect, Tabs } from "expo-router";
import { Activity, CircleHelp, LayoutDashboard, Map, Menu } from "lucide-react-native";
import { colors } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { borderTopColor: colors.border, height: 62, paddingBottom: 8, paddingTop: 8 }
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} /> }} />
      <Tabs.Screen name="monitor" options={{ title: "Monitor", tabBarIcon: ({ color }) => <Activity size={20} color={color} /> }} />
      <Tabs.Screen name="map" options={{ title: "Map", tabBarIcon: ({ color }) => <Map size={20} color={color} /> }} />
      <Tabs.Screen name="helpdesk" options={{ title: "Helpdesk", tabBarIcon: ({ color }) => <CircleHelp size={20} color={color} /> }} />
      <Tabs.Screen name="more" options={{ title: "More", tabBarIcon: ({ color }) => <Menu size={20} color={color} /> }} />
    </Tabs>
  );
}
