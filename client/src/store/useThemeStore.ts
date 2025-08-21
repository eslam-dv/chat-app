import { create } from "zustand";

type ThemeStoreType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
