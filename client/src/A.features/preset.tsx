import { useEffect, useRef } from 'react'
import type { PresetProps } from '../shared'

const GRID = 16;
const PREVIEW = 64;

export const Preset = ({ id, title, content, onLoad }: PresetProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const cell = PREVIEW / GRID;
        content.forEach((color, i) => {
            const col = i % GRID;
            const row = Math.floor(i / GRID);
            ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
            ctx.fillRect(col * cell, row * cell, cell, cell);
        })
    }, [content]);

    return (
        <div className="presetBox" onClick={() => onLoad?.(id)}>
            <canvas
                ref={canvasRef}
                width={PREVIEW}
                height={PREVIEW}
                className="presetPreview"
            />
            <p className="presetTitle">{title ?? 'Без названия'}</p>
        </div>
    );
};