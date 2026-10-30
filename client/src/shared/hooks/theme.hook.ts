import { useEffect } from 'react';
import { useThemeStore, type ThemeType } from '../';

export function useTheme() {
    const { currentTheme, setTheme } = useThemeStore();

    useEffect(() => {
        document.documentElement.classList.remove('theme-light', 'theme-dark');
        document.documentElement.classList.add(`theme-${currentTheme}`);
    },[currentTheme])

    const toggleTheme = () => {
        if (currentTheme == 'light') setTheme('dark')
        else if (currentTheme == 'dark') setTheme('light')
    }

    return { toggleTheme }
}