import { ColorUtils } from './color-utils.js';

export type Mode = 'analogous'|'mono'|'complementary'|'triadic'|'tetradic';

export function generateClassicGeometric(baseHex, mode: Mode, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const clampHue = (h) => (h + 360) % 360;
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        let targetH = h, targetS = s, targetL = l;
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;

        if (mode === 'mono') {
            targetL = lerp(15, 85, factor);
        } else if (mode === 'analogous') {
            const span = colorCount > 1 ? (i / (colorCount - 1)) * 2 - 1 : 0;
            targetH = h + (span * 45);
        } else if (mode === 'complementary') {
            if (i >= Math.ceil(colorCount / 2)) {
                targetH = h + 180;
                targetL = lerp(30, 70, (i - Math.ceil(colorCount/2)) / (colorCount/2 || 1));
            } else {
                targetL = lerp(20, 80, i / (Math.ceil(colorCount/2) - 1 || 1));
            }
        } else if (mode === 'triadic') {
            targetH = h + ((i % 3) * 120);
            if (i >= 3) targetL = i % 2 === 0 ? Math.max(l - 20, 15) : Math.min(l + 20, 85);
        } else if (mode === 'tetradic') {
            const steps = [0, 90, 180, 270];
            targetH = h + steps[i % 4];
            if (i >= 4) targetL = i % 2 === 0 ? Math.max(l - 20, 15) : Math.min(l + 20, 85);
        }
        palette.push({ h: clampHue(targetH), s: Math.round(targetS), l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}

export function generateSplitComplementary(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const angles = [0, 150, 210];

    for (let i = 0; i < colorCount; i++) {
        const targetH = (h + angles[i % 3] + 360) % 360;
        const loop = Math.floor(i / 3);
        const targetL = loop === 0 ? l : (loop % 2 === 1 ? Math.max(15, Math.min(85, l - 20)) : Math.max(15, Math.min(85, l + 20)));
        palette.push({ h: targetH, s, l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}
