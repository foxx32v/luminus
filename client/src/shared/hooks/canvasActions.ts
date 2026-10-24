import { MATRIX_CONFIG, useColor, useMatrix } from '../';

const GRID = MATRIX_CONFIG.GRID

export function useCanvasActions() {
    const { currentColor } = useColor()
    const { setMatrix } = useMatrix()
    const clear = () => setMatrix(Array(GRID*GRID).fill(0))
    const fill = () => setMatrix(Array(GRID*GRID).fill(currentColor))
    return { clear, fill }
}