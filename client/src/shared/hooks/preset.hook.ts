import { useEffect, useRef, useState } from 'react';
import { useCanvasPresets, useMatrix, type PresetProps } from '..';

export function usePreset({ id, content }: PresetProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { remove } = useCanvasPresets();
    const { setMatrix } = useMatrix();
    const [isOpenMenu, setOpenMenu] = useState(false);
    const [posMenu, setPosMenu] = useState<{ x: number; y: number }>({ x: 300, y: 300 });

    const removePreset = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!id) return;
        await remove(id);
    };

    const loadPreset = () => {
        setMatrix(content);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenMenu(!isOpenMenu);
        setPosMenu({ x: e.clientX, y: e.clientY });
    };

    const handleLeave = () => {
        setOpenMenu(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const cell = 64 / 16;
        content.forEach((color, i) => {
            const col = i % 16;
            const row = Math.floor(i / 16);
            ctx.fillStyle = `#${color.toString(16).padStart(6, 'ffffff')}`;
            ctx.fillRect(col * cell, row * cell, cell, cell);
        });
    }, [content]);

    return { canvasRef, removePreset, loadPreset, isOpenMenu, posMenu, handleClick, handleLeave };
}