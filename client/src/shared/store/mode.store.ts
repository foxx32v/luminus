import { create } from 'zustand';
import type { ModeState, modesType } from '..';

const setMode = (mode:string) => localStorage.setItem('mode',mode)
const getMode = () => (localStorage.getItem('mode') || null) as modesType

export const useMode = create<ModeState>((set, get) => ({
    currentMode: getMode() || 'drag',
    setMode: (mode) => {set({ currentMode: mode }); setMode(`${get().currentMode}`)},
}));