import { ColorUtils } from './color-utils.js';

// Цветокоррекция Teal & Orange
export function generateTealOrange(baseHex, colorCount = 5) {
    const palette = [];
    const tealH = 190;
    const orangeH = 30;
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;
        const isTeal = factor < 0.5;
        const targetH = isTeal ? tealH : orangeH;
        const targetS = isTeal ? lerp(40, 75, factor * 2) : lerp(70, 95, (factor - 0.5) * 2);
        const targetL = lerp(15, 80, factor);

        palette.push({ h: targetH, s: Math.round(targetS), l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}

// Квантовое Расталкивание Вороного
export function generateSpaceDisplacement(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const stepArc = 360 / colorCount;
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        const targetH = (h + (i * stepArc) + (i % 2 === 0 ? 15 : -15) + 360) % 360;
        const targetL = lerp(25, 75, i / (colorCount - 1 || 1));
        palette.push({ h: targetH, s, l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}
