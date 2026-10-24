import { useRef, useState } from 'react';

export function useCanvasPan() {
    const [size, setSize] = useState(512);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{ x: number; y: number } | null>(null);

    const handleWheel = (e: React.WheelEvent) => {
        const step = 64;
        const next = size + (e.deltaY < 0 ? step : -step);
        setSize(Math.min(2048, Math.max(128, next)));
    }

    const handlePanStart = (e: React.MouseEvent) => {
        dragRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            setOffset({
                x: ev.clientX - dragRef.current.x,
                y: ev.clientY - dragRef.current.y,
            })
        }

        const onUp = () => {
            dragRef.current = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        }
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }

    return { size, offset, handleWheel, handlePanStart };
}