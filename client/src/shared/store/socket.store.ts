import { create } from 'zustand';
import type { SocketStore } from '../';

export const useSocketStore = create<SocketStore>((set) => ({
    isConnection: false,
    status: null,
    error: null,
    setIsConnection: (isConnection) => set({ isConnection }),
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),
}));