import { useEffect, useRef } from 'react';
import { useColor, useMatrix } from '../';
import { CONSTANTS_CONFIG } from '../configs/constants.config';

const GRID = CONSTANTS_CONFIG.GRID;

export function useCanvasDraw(size: number) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { matrix, pushMatrix } = useMatrix();
    const { currentColor, setColor } = useColor();
    const isDrawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, size, size);
        const cell = size / GRID;
        matrix.forEach((c, i) => {
            const col = i % GRID;
            const row = Math.floor(i / GRID);
            ctx.fillStyle = `#${c.toString(16).padStart(6, '0')}`;
            ctx.fillRect(col * cell, row * cell, cell, cell);
        });
    }, [matrix, size]);

    const start = (e?: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !e) return null;
        const rect = canvas.getBoundingClientRect();
        const cell = rect.width / GRID;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || y < 0 || x >= rect.width || y >= rect.height) return null;
        const i = Math.floor(y / cell) * GRID + Math.floor(x / cell);
        return { x, y, i, cell };
    };

    const paintAt = (e: React.MouseEvent, color: number) => {
        const pos = start(e);
        if (!pos) return;
        if (matrix[pos.i] === color) return;
        const next = [...matrix];
        next[pos.i] = color;
        pushMatrix(next)
    };

    const eyedropperAt = (e: React.MouseEvent) => {
        const pos = start(e);
        if (!pos) return;
        setColor(matrix[pos.i])
    }

    const toShaderAt = (e: React.MouseEvent, step: number) => {
        const pos = start(e);
        if (!pos) return;
        const oldColor = matrix[pos.i]
        let r = ((oldColor >> 16) & 0xff) + step
        let g = ((oldColor >> 8) & 0xff) + step
        let b = (oldColor & 0xff) + step
        if (r > 255) r = 255;
        if (r < 0) r = 0;
        if (g > 255) g = 255;
        if (g < 0) g = 0;
        if (b > 255) b = 255;
        if (b < 0) b = 0;
        const newColor = (r << 16) | (g << 8) | b
        const next = [...matrix]
        next[pos.i] = newColor
        pushMatrix(next)
    }

    const handlePaintStart = (e: React.MouseEvent, color: number) => {
        isDrawing.current = true;
        paintAt(e, color);
    };

    const handlePaintMove = (e: React.MouseEvent, color: number) => {
        if (isDrawing.current) paintAt(e, color);
    };

    const handlePaintEnd = () => {
        isDrawing.current = false;
    };

    return { canvasRef, currentColor, toShaderAt, eyedropperAt, handlePaintStart, handlePaintMove, handlePaintEnd };
}