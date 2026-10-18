import { useRef, useState } from 'react';
import { useMode } from '../shared';

export const Canvas = () => {
    const [size, setSize] = useState(512);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{ x: number; y: number } | null>(null);
    const {currentMode} = useMode()

    const getCursor = (): string => {
        switch (currentMode) {
            case 'drag': return 'grab';
            case 'draw': return 'crosshair';
            case 'clear': return 'cell';
            case 'eyedropper': return 'copy';
            case 'line': return 'crosshair';
            case 'rect': return 'crosshair';
            case 'filling': return 'cell';
            default: return 'default';
        }
    }

    const handleWheel = (e: React.WheelEvent) => {
        const step = 64;
        const next = size + (e.deltaY < 0 ? step : -step);
        setSize(Math.min(2048, Math.max(128, next)));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (currentMode !== 'drag') return
        dragRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            let xv = ev.clientX-dragRef.current.x
            let yv = ev.clientY - dragRef.current.y
            setOffset({
                x: xv,
                y: yv,
            })}
        const onUp = () => {
            dragRef.current = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    return (
        <div id="canvasBox">
            <canvas
                id="canvas"
                style={{
                    width: size,
                    height: size,
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    cursor: getCursor(),
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};