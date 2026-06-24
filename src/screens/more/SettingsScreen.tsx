import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { InfoCard } from "@/components/cards/InfoCard";
import { colors, radius, spacing } from "@/constants/theme";
import { container } from "@/core/container";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";

export function SettingsScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { themePreference, setThemePreference } = useThemeStore();

  const toggleTheme = () => {
    setThemePreference(themePreference === "light" ? "dark" : "light");
  };

  async function onLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <Screen>
      <BackButton />
      <AppText variant="title">Settings</AppText>
      <InfoCard title="Profile">
        <AppText>{user?.name ?? user?.username}</AppText>
        <AppText muted>{user?.role} • {user?.region ?? "All Maharashtra"}</AppText>
      </InfoCard>
      <InfoCard title="Preferences">
        <View style={styles.row}><AppText>Language</AppText><AppText muted>English</AppText></View>
        <View style={styles.row}>
          <AppText>Theme</AppText>
          <Pressable onPress={toggleTheme}>
            <AppText muted style={{ textTransform: "capitalize" }}>{themePreference}</AppText>
          </Pressable>
        </View>
        <View style={styles.row}><AppText>Offline Queue</AppText><AppText muted>{container.syncQueue.pendingCount()} pending</AppText></View>
      </InfoCard>
      <Pressable style={styles.clear} onPress={() => container.cacheManager.clearAll()}>
        <AppText style={styles.clearText}>Clear Cached Data</AppText>
      </Pressable>
      <Pressable style={styles.logout} onPress={onLogout}>
        <AppText style={styles.logoutText}>Logout</AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  clear: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center"
  },
  clearText: {
    color: colors.primary,
    fontWeight: "800"
  },
  logout: {
    backgroundColor: "#FEF2F2",
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center"
  },
  logoutText: {
    color: colors.critical,
    fontWeight: "800"
  }
});
