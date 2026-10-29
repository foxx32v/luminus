import { create } from "zustand";
import type { PresetsBarStore } from '../'

export const usePresetsBar = create<PresetsBarStore>((set) => ({
    isOpenSideBar: false,
    setOpenSideBar: (isOpen) => set({isOpenSideBar:isOpen}),
}))