import { create } from "zustand";
import { MATRIX_CONFIG, type MatrixStore } from "../";
const GRID = MATRIX_CONFIG.GRID

const LocalStorageSave = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
const LocalStorageGet = (key: string) => {
    const row = localStorage.getItem(key)
    if (row == null) return Array(GRID*GRID).fill(0x000000)
    try { return JSON.parse(row) as Number[]
    } catch {return Array(GRID*GRID).fill(0x000000)}
}

export const useMatrix = create<MatrixStore>((set) => ({
    matrix: LocalStorageGet('matrix'),
    setMatrix: (newMatrix) => {set({matrix: newMatrix}); LocalStorageSave('matrix', newMatrix)}
}))