import { create } from "zustand";
import { User } from "@/domain/entities";
import { container } from "@/core/container";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: User;
  isLoading: boolean;
  error?: string;
  hydrate: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  hydrate: async () => {
    set({ isLoading: true });
    const status = await container.authRepository.getAuthStatus();
    set({
      isAuthenticated: status.isAuthenticated,
      isAdmin: status.isAdmin,
      user: status.user,
      isLoading: false
    });
  },
  login: async (username, password) => {
    set({ isLoading: true, error: undefined });
    const result = await container.authRepository.login(username, password);
    if (!result.success) {
      set({ isAuthenticated: false, isAdmin: false, user: undefined, isLoading: false, error: result.error });
      return false;
    }
    set({
      isAuthenticated: true,
      isAdmin: !!result.isAdmin,
      user: result.user,
      isLoading: false
    });
    return true;
  },
  logout: async () => {
    await container.authRepository.logout();
    set({ isAuthenticated: false, isAdmin: false, user: undefined });
  }
}));
