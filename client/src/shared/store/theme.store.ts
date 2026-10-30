import { create } from "zustand";
import type { ThemeStore, ThemeType } from '../';

const getTheme = () => (localStorage.getItem('theme') || 'light') as ThemeType
const setTheme = (theme: ThemeType) => localStorage.setItem('theme', theme)

export const useThemeStore = create<ThemeStore>((set) => ({
    currentTheme: getTheme(),
    setTheme: (theme) => {
        set({currentTheme: theme});
        setTheme(theme);
    },
}))