import { ColorUtils } from './color-utils.js';

export function generateDesignSystemScale(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;
        const hueShift = h > 30 && h < 150 ? (factor - 0.5) * -10 : (factor - 0.5) * 10;
        const targetH = (h + hueShift + 360) % 360;
        const targetL = lerp(10, 92, factor);
        const targetS = s * (1 - Math.pow(factor - 0.5, 2) * 1.2);

        palette.push({
            h: targetH,
            s: Math.max(10, Math.min(100, Math.round(targetS))),
            l: Math.max(5, Math.min(95, Math.round(targetL)))
        });
    }
    return palette.map(ColorUtils.hslToHex);
}
