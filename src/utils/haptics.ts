import { Platform } from "react-native";

let Haptics: any;
try {
  Haptics = require("expo-haptics");
} catch {
  Haptics = null;
}

export const haptics = {
  selection: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.selectionAsync().catch(() => {});
    }
  },
  impactLight: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  },
  impactMedium: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  },
  impactHeavy: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    }
  },
  notificationSuccess: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  },
  notificationWarning: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    }
  },
  notificationError: () => {
    if (Platform.OS !== "web" && Haptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  }
};
