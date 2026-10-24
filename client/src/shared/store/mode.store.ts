import { create } from 'zustand';
import type { ModeState } from '..';

export const useMode = create<ModeState>((set) => ({
    currentMode: 'drag',
    setMode: (mode) => set({ currentMode: mode }),
}));