import { useEffect, useRef, useState } from 'react';
import { useColor, useColorMenu } from '../';

export function useButtonColor() {
    const [ colors, setColors] = useState<number[]>([]);
    const { currentColor } = useColor();
    const { isOpen, setOpen } = useColorMenu();
    const [pos, setPos] = useState({ x: 300, y: 0 });
    const dragRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const result: Set<number> = new Set();
        for (let w = 0; w < 256; w += 51) result.add((w << 16) | (w << 8) | w);
        for (let r = 6; r <= 256; r += 51)
            for (let g = 6; g <= 256; g += 51)
                for (let b = 6; b <= 256; b += 51)
                    result.add((r << 16) | (g << 8) | b);
        setColors(Array.from(result).slice(1));
    }, [])

    const handleButtonClick = (e: React.MouseEvent) => {
        setOpen(!isOpen);
        if (!isOpen) setPos({ x: e.clientX, y: e.clientY });
    };

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        dragRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            setPos({ x: ev.clientX - dragRef.current.x, y: ev.clientY - dragRef.current.y });
        };
        const onUp = () => {
            dragRef.current = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    return { colors, currentColor, isOpen, pos, handleButtonClick, handleDragStart };
}