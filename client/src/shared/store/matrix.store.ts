import { create } from "zustand";
import { CONSTANTS_CONFIG, type MatrixStore } from "../";
const SIZE = CONSTANTS_CONFIG.SIZE

const LocalStorageSave = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
const LocalStorageGet = (key: string) => {
    const row = localStorage.getItem(key)
    if (row == null) return Array(SIZE).fill(0xffffff)
    try { return JSON.parse(row) as Number[]
    } catch {return Array(SIZE).fill(0x000000)}
}

export const useMatrix = create<MatrixStore>((set) => ({
    matrix: LocalStorageGet('matrix'),
    setMatrix: (newMatrix) => {set({matrix: newMatrix}); LocalStorageSave('matrix', newMatrix)}
}))