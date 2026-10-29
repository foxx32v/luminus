import { useRef, useState } from 'react';
import { useCanvasPresets, useMatrix } from '../';

export function usePanelPresets() {
    const { matrix } = useMatrix()
    const [ isOpenMenuAdding, setOpenMenuAdding] = useState(false)
    const { isLoading, data, save } = useCanvasPresets()
    const titleRef = useRef<HTMLInputElement>(null);
    const [posMenu, setPosMenu] = useState({ x: 300, y: 300 });

    const openAddingMenu = (e: React.MouseEvent) => {
        setPosMenu({ x: e.clientX, y: e.clientY });
        setOpenMenuAdding(!isOpenMenuAdding);
    }

    const savePreset = async () => {
        const title = titleRef.current?.value.trim();
        if (!title) return;
        await save(title, matrix);
        setOpenMenuAdding(false);
    }

    const menuLeave = () => {
        setOpenMenuAdding(false)
        if (titleRef.current) titleRef.current.value = '';
    }
    return { isOpenMenuAdding, posMenu, titleRef, isLoading, data, openAddingMenu, savePreset, menuLeave,}
}