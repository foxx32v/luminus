import { useEffect, useRef, useState } from 'react';
import { colorHex, CONSTANTS_CONFIG, useCanvasPresets, useMatrix, useMatrixSocket, type PresetProps } from '..';

const STEP_ANIMATION = CONSTANTS_CONFIG.STEP_ANIMATION

export function usePreset({ id, content }: PresetProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { remove } = useCanvasPresets();
    const { matrix } = useMatrix();
    const { animate } = useMatrixSocket()
    const [isOpenMenu, setOpenMenu] = useState(false);
    const [posMenu, setPosMenu] = useState<{ x: number; y: number }>({ x: -100, y: 300 });

    const removePreset = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!id) return;
        await remove(id);
    };

    const loadPreset = () => {
        animate(matrix, content, STEP_ANIMATION)
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenMenu(!isOpenMenu);
        setPosMenu({ x: e.clientX, y: e.clientY });
    };

    const handleLeave = (e: React.MouseEvent) => {
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
            ctx.fillStyle = colorHex(color);
            ctx.fillRect(col * cell, row * cell, cell, cell);
        });
    }, [content]);

    return { canvasRef, removePreset, loadPreset, isOpenMenu, posMenu, handleClick, handleLeave };
}