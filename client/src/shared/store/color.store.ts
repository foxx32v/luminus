import { create } from "zustand";
import type { ColorStore } from "../";

export const useColor = create<ColorStore>((set) => ({
    currentColor: 0x000000,
    setColor: (color) => set({currentColor: color})
}))