import { ColorUtils } from './color-utils.js';

export function generateGoldenRatio(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const goldenAngle = 137.507764;

    for (let i = 0; i < colorCount; i++) {
        const targetH = (h + (i * goldenAngle) + 360) % 360;
        const targetL = Math.max(20, Math.min(80, l + ((i % 3) * 10 - 10)));
        palette.push({ h: targetH, s, l: targetL });
    }
    return palette.map(ColorUtils.hslToHex);
}

export function generateControlledChaos(baseHex, colorCount = 5) {
    const { h } = ColorUtils.hexToHsl(baseHex);
    const palette = [];

    for (let i = 0; i < colorCount; i++) {
        const seed = Math.sin(i + 4.13) * 10000;
        const randomOffset = (seed - Math.floor(seed)) * 360;

        palette.push({
            h: (h + randomOffset + 360) % 360,
            s: Math.round(55 + (seed * 10 % 35)),
            l: Math.round(40 + (seed * 100 % 30))
        });
    }
    return palette.map(ColorUtils.hslToHex);
}
