export function colorPack(r: number, g: number, b: number): number {
    return (r << 16) | (g << 8) | b;
}

export function updateColors(step: number, color: number): number {
    const r = Math.min(255, Math.max(0, ((color >> 16) & 0xff) + step));
    const g = Math.min(255, Math.max(0, ((color >> 8) & 0xff) + step));
    const b = Math.min(255, Math.max(0, (color & 0xff) + step));
    return colorPack(r,g,b);
}

export function colorHex(color:number): string {
    return `#${color.toString(16).padStart(6, '0')}`;
}