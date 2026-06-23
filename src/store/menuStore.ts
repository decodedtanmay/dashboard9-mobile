import { create } from "zustand";

interface MenuState {
  isMoreOpen: boolean;
  openMore: () => void;
  closeMore: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isMoreOpen: false,
  openMore: () => set({ isMoreOpen: true }),
  closeMore: () => set({ isMoreOpen: false }),
}));
