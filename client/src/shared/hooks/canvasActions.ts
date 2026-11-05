import { colorPack, CONSTANTS_CONFIG, useColor, useMatrix } from '../';

const GRID = CONSTANTS_CONFIG.GRID

export function useCanvasActions() {
    const { currentColor } = useColor()
    const { pushMatrix } = useMatrix()
    const clear = () => pushMatrix(Array(GRID*GRID).fill(0xffffff))
    const fill = () => pushMatrix(Array(GRID*GRID).fill(currentColor))
    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        await img.decode();
        const canvas = document.createElement('canvas')
        canvas.width = GRID;
        canvas.height = GRID;
        const ctx = canvas.getContext('2d')!;
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth-size)/2;
        const sy = (img.naturalHeight-size)/2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, GRID, GRID);
        const data = ctx.getImageData(0,0,GRID,GRID).data
        const res = []
        for(let i=0;i<data.length;i+= 4) {
            res.push(colorPack(data[i],data[i+1],data[i+2]))
        }
        if (res.length > 0) pushMatrix(res)
        URL.revokeObjectURL(url);
    }
    const handleDropOver = (e: React.DragEvent) => {
        e.preventDefault()
    }
    return { clear, fill, handleDropOver, handleDrop }
}