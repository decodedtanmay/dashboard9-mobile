import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Droplets } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/forms/TextField";
import { colors, radius, shadow, spacing } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";

export function LoginScreen() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  async function onSubmit() {
    const ok = await login(username.trim(), password);
    if (ok) router.replace("/(main)/dashboard");
  }

  return (
    <Screen style={styles.root}>
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Droplets size={36} color="white" />
        </View>
        <AppText variant="title" style={styles.center}>
          MahaJal IoT
        </AppText>
        <AppText muted style={styles.center}>
          Maharashtra Water Infrastructure Management
        </AppText>
      </View>

      <View style={styles.card}>
        <TextField label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? (
          <AppText variant="caption" style={styles.error}>
            {error}
          </AppText>
        ) : null}
        <Pressable style={styles.button} onPress={onSubmit} disabled={isLoading}>
          <AppText style={styles.buttonText}>{isLoading ? "Signing in..." : "Sign In"}</AppText>
        </Pressable>
      </View>

      <AppText variant="caption" muted style={styles.center}>
        Mock credentials: admin/admin123 or nashik_user/user123
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  brand: {
    alignItems: "center",
    gap: spacing.sm
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card
  },
  center: {
    textAlign: "center"
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadow.card
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "800"
  },
  error: {
    color: colors.critical,
    fontWeight: "700"
  }
});
