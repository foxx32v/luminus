import { describe, it, expect } from '@jest/globals';
import { colorHex, colorPack, updateColors } from './matrix';

describe('matrix', () => {
    it('colorPack конвертирует RGB в число', () => {
        expect(colorPack(255, 0, 0)).toBe(0xff0000);
    });

    it('updateColors осветляет', () => {
        expect(updateColors(20, 0x000000)).toBe(0x141414);
    })

    it('updateColors выходит ли за рамки', () => {
        expect(updateColors(1000, 0x000000)).toBe(0xffffff);
    });

    it('colorHex конвертирует число вида 0x000000 в строку', () => {
        expect(colorHex(0x0000ff)).toBe('#0000ff');
    })

    it('colorHex неверный параментр', () => {
        expect(colorHex(3000000000)).toBe('#b2d05e00');
    })
});