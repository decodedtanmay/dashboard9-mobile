import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Bell, FileText, LogOut, Settings, Shield } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { colors, radius, spacing } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";

export function MoreScreen() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const logout = useAuthStore((state) => state.logout);

  async function onLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <Screen>
      <View>
        <AppText variant="title">More</AppText>
        <AppText muted>Reports, alerts, preferences, and role-specific summaries.</AppText>
      </View>
      <MenuItem label="Alerts & Progress" icon={<Bell size={20} color={colors.primary} />} onPress={() => router.push("/(main)/more/alerts")} />
      <MenuItem label="Reports" icon={<FileText size={20} color={colors.primary} />} onPress={() => router.push("/(main)/more/reports")} />
      <MenuItem label="Settings" icon={<Settings size={20} color={colors.primary} />} onPress={() => router.push("/(main)/more/settings")} />
      {isAdmin ? <MenuItem label="Admin Summary" icon={<Shield size={20} color={colors.primary} />} onPress={() => router.push("/(main)/more/admin")} /> : null}
      <MenuItem label="Logout" icon={<LogOut size={20} color={colors.critical} />} onPress={onLogout} danger />
    </Screen>
  );
}

function MenuItem({ label, icon, onPress, danger }: { label: string; icon: ReactNode; onPress: () => void; danger?: boolean }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      {icon}
      <AppText style={[styles.itemText, danger && styles.danger]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg
  },
  itemText: {
    fontWeight: "800"
  },
  danger: {
    color: colors.critical
  }
});
