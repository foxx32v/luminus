import type { SocketHookStatusType } from "./socket.dto";
import type { modesType, MatrixType } from "./type.dto";
export interface ModeState {
    currentMode: modesType;
    setMode: (mode: modesType) => void;
}

export interface ColorStore {
    currentColor: number
    setColor: (color: number) => void
}

export interface MatrixStore {
    matrix: MatrixType
    setMatrix: (newMatrix: number[]) => void
}

export interface ColorMenuStore {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export interface LoaderProps {
    isLoad: boolean;
    size?: number;
}

export interface LoaderElementProps {
    go: boolean;
    size: number;
}

export interface SocketStore {
    status: SocketHookStatusType;
    setStatus: (status: SocketHookStatusType) => void;
    error: unknown | null;
    setError: (error: unknown | null) => void;
    isConnection: boolean;
    setIsConnection: (connect: boolean) => void;
}