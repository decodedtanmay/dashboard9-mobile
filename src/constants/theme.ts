import { useColorScheme } from "react-native";
import { useThemeStore } from "@/store/themeStore";

export const lightColors = {
  primary: "#1565C0",
  primaryDark: "#0F4C9A",
  primaryLight: "#E8F2FF",
  primaryHover: "#1E88E5",
  
  // Semantic Colors
  success: "#059669",
  successLight: "#ECFDF5",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  critical: "#DC2626",
  criticalLight: "#FEF2F2",
  info: "#0284C7",
  infoLight: "#F0F9FF",
  
  // Neutral Colors
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",
  surfaceElevated: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  
  // Accents
  cyan: "#0891B2",
  purple: "#7C3AED",
  good: "#059669",
  
  chart: ["#1565C0", "#059669", "#D97706", "#7C3AED", "#DC2626"]
};

export const darkColors = {
  primary: "#3B82F6",
  primaryDark: "#1D4ED8",
  primaryLight: "#1E3A8A",
  primaryHover: "#60A5FA",
  
  // Semantic Colors
  success: "#10B981",
  successLight: "#064E3B",
  warning: "#F59E0B",
  warningLight: "#78350F",
  critical: "#EF4444",
  criticalLight: "#7F1D1D",
  info: "#06B6D4",
  infoLight: "#0C4A6E",
  
  // Neutral Colors
  background: "#090D16",
  surface: "#111827",
  surfaceAlt: "#1F2937",
  surfaceElevated: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#E5E7EB",
  textMuted: "#9CA3AF",
  border: "#374151",
  borderLight: "#1F2937",
  
  // Accents
  cyan: "#22D3EE",
  purple: "#A78BFA",
  good: "#10B981",
  
  chart: ["#3B82F6", "#10B981", "#F59E0B", "#A78BFA", "#EF4444"]
};

// Fallback legacy export
export const colors = lightColors;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  pill: 999
};

export const typography = {
  fonts: {
    body: "System",
    heading: "System",
    data: "System",
    mono: "Courier"
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    black: "900" as const
  }
};

export const shadow = {
  sm: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  card: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4
  },
  lg: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10
  }
} as const;

export function useTheme() {
  const scheme = useColorScheme();
  const themePreference = useThemeStore((state) => state.themePreference);
  
  const isDark = 
    themePreference === "dark" || 
    (themePreference === "system" && scheme === "dark");

  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    typography,
    shadow: isDark
      ? {
          sm: { ...shadow.sm, shadowColor: "#000000" },
          card: { ...shadow.card, shadowColor: "#000000", shadowOpacity: 0.2 },
          lg: { ...shadow.lg, shadowColor: "#000000", shadowOpacity: 0.3 }
        }
      : shadow
  };
}

