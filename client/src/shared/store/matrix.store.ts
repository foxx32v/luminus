import { create } from "zustand";
import { CONSTANTS_CONFIG, type MatrixStore } from "../";
const SIZE = CONSTANTS_CONFIG.SIZE_CANVAS

const LocalStorageSave = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
const LocalStorageGet = (key: string) => {
    const row = localStorage.getItem(key)
    if (row == null) return Array(SIZE).fill(0xffffff)
    try { return JSON.parse(row) as number[]
    } catch {return Array(SIZE).fill(0xffffff)}
}

const initMatrix = LocalStorageGet('matrix')

export const useMatrix = create<MatrixStore>((set,get) => (
    {
    matrix: initMatrix,
    isRemote: false,
    setRemote: (isRemote) => set({isRemote:isRemote}),
    setMatrix: (newMatrix) => {
        set({ matrix: newMatrix });
    },
    pushMatrix: (newMatrix) => {
        const history = [...get().history, newMatrix];
        set({ matrix: newMatrix, history, index: history.length - 1 });
        LocalStorageSave('matrix', newMatrix);
    },
    index: 0,
    goTo: (step) => {
        const { index, history } = get()
        const newIndex = index + step
        if (newIndex < 0 || newIndex >= history.length) return
        set({index: newIndex, matrix: history[newIndex]})
        LocalStorageSave('matrix', history[newIndex]);
    },
    history: [LocalStorageGet('matrix')],
}))