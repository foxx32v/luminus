import { CONSTANTS_CONFIG, useColor, useMatrix } from '../';

const GRID = CONSTANTS_CONFIG.GRID

export function useCanvasActions() {
    const { currentColor } = useColor()
    const { pushMatrix } = useMatrix()
    const clear = () => pushMatrix(Array(GRID*GRID).fill(0xffffff))
    const fill = () => pushMatrix(Array(GRID*GRID).fill(currentColor))
    return { clear, fill }
}