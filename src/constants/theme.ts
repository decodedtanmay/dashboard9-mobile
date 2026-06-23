export const colors = {
  primary: "#1565C0",
  primaryDark: "#0F4C9A",
  primaryLight: "#E8F2FF",
  background: "#F6F8FB",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",
  text: "#1F2937",
  textMuted: "#64748B",
  border: "#E2E8F0",
  good: "#059669",
  warning: "#D97706",
  critical: "#DC2626",
  cyan: "#0891B2",
  purple: "#7C3AED",
  chart: ["#1565C0", "#059669", "#D97706", "#7C3AED", "#DC2626"]
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999
};

export const typography = {
  body: "System",
  heading: "System",
  data: "System",
  mono: "Courier"
};

export const shadow = {
  card: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  }
} as const;
