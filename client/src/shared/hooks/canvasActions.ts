import { CONSTANTS_CONFIG, useColor, useMatrix } from '../';

const GRID = CONSTANTS_CONFIG.GRID

export function useCanvasActions() {
    const { currentColor } = useColor()
    const { setMatrix } = useMatrix()
    const clear = () => setMatrix(Array(GRID*GRID).fill(0xffffff))
    const fill = () => setMatrix(Array(GRID*GRID).fill(currentColor))
    return { clear, fill }
}