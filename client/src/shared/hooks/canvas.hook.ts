import { useCanvasPan } from './canvasPan.hook';
import { useCanvasDraw } from './canvasDraw.hook';
import { useCanvasActions } from './canvasActions';
import { useMode } from '../store/mode.store';

export function useCanvas() {
    const { currentMode } = useMode();
    const pan = useCanvasPan();
    const draw = useCanvasDraw(pan.size);
    const actions = useCanvasActions();

    const getCursor = (): string => {
        switch (currentMode) {
            case 'drag': return 'grab';
            case 'draw': return 'crosshair';
            case 'eyedropper': return 'pointer';
            case 'eraser': return 'cell';
            case 'filling': return 'cell';
            default: return 'default';
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        switch (currentMode) {
            case 'drag': pan.handlePanStart(e); break;
            case 'draw': draw.handlePaintStart(e, draw.currentColor); break;
            case 'eraser': draw.handlePaintStart(e, 0xffffff); break;
            case 'eyedropper': draw.eyedropperAt(e); break;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (currentMode === 'draw') draw.handlePaintMove(e, draw.currentColor);
        else if (currentMode === 'eraser') draw.handlePaintMove(e, 0xffffff);
    };

    const handleMouseUp = () => {
        draw.handlePaintEnd();
    };

    return { ...pan, ...draw, ...actions, getCursor, handleMouseDown, handleMouseMove, handleMouseUp, }
}