import { useEffect } from 'react';
import { useMode, useColorMenu, useSocketStore, usePresetsBar, KEYS_CONFIG } from '../';

export function useHotkeys() {
    const { setMode } = useMode();
    const { isOpen, setOpen } = useColorMenu();
    const { isConnection, setIsConnection } = useSocketStore();
    const { isOpenSideBar, setOpenSideBar } = usePresetsBar();

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) return;
        switch (e.code) {
            case KEYS_CONFIG.MODES.DRAG: setMode('drag'); break;
            case KEYS_CONFIG.MODES.DRAW: setMode('draw'); break;
            case KEYS_CONFIG.MODES.PIE: setMode('eyedropper'); break;
            case KEYS_CONFIG.MODES.ERASER: setMode('eraser'); break;
            case KEYS_CONFIG.MODES.TO_LIGHTEN: setMode('toLighten'); break;
            case KEYS_CONFIG.MODES.TO_DARKEN: setMode('toDarken'); break;
            }
            if (e.code == KEYS_CONFIG.COLOR_MENU.CLOSE && isOpen) setOpen(false);
            else if (e.code == KEYS_CONFIG.PRESETS_BAR.CLOSE && isOpenSideBar) setOpenSideBar(false);
            // else if (e.code == KEYS_CONFIG.SOCKET.SET_IS_CONNECTION && isConnection) setIsConnection(false);
        }
        window.addEventListener('keydown', handleKeyDown)
        return (() => window.removeEventListener('keydown', handleKeyDown))
    },[setMode, setOpen, setOpenSideBar, setIsConnection, isOpen, isOpenSideBar, isConnection])
}