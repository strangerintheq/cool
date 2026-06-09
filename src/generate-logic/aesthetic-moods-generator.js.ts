import { ColorUtils } from './color-utils.js';
// (Пастель, Киберпанк-неон и Земляные тона)
export function generatePastel(baseHex, colorCount = 5) {
    const { h } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    for (let i = 0; i < colorCount; i++) {
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;
        const targetH = (h + (factor * 90) - 45 + 360) % 360;
        palette.push({
            h: targetH,
            s: Math.max(0, Math.min(100, Math.round(75 + (factor * 13)))), // 75-88% soft lightness
            l: Math.max(0, Math.min(100, Math.round(25 + (factor * 15))))  // Muted saturation
        });
    }
    return palette.map(ColorUtils.hslToHex);
}

export function generateNeon(baseHex, colorCount = 5) {
    const { h } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const steps = [0, 180, 90, 240];

    for (let i = 0; i < colorCount; i++) {
        const targetH = (h + (steps[i % steps.length] || i * 45) + 360) % 360;
        palette.push({ h: targetH, s: 100, l: i % 2 === 0 ? 55 : 45 });
    }
    return palette.map(ColorUtils.hslToHex);
}

export function generateEarthTones(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;
        const targetH = (lerp(h, 40, 0.4) + (factor * 30 - 15) + 360) % 360; // Pull to browns
        const targetS = lerp(s, 30, 0.6);
        const targetL = lerp(25, 60, factor);

        palette.push({ h: targetH, s: Math.round(targetS), l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}
