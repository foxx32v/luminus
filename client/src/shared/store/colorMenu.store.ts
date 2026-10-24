import { create } from 'zustand';
import type { ColorMenuStore } from '../';

export const useColorMenu = create<ColorMenuStore>((set) => ({
    isOpen: false,
    setOpen: (open) => set({ isOpen: open }),
}));