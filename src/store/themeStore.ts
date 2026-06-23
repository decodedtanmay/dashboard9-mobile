import { create } from "zustand";

export type ThemePreference = "light" | "dark" | "system";

interface ThemeState {
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themePreference: "light", // Default to light
  setThemePreference: (preference) => set({ themePreference: preference }),
}));
