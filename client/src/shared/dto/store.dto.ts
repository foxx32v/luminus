import type { modesType } from "./type.dto";


export interface ModeState {
    currentMode: modesType;
    setMode: (mode: modesType) => void;
}