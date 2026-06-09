import { ColorUtils } from './color-utils.js';

export function generateUiAccessible(baseHex, colorCount = 5) {
    const { h, s, l } = ColorUtils.hexToHsl(baseHex);
    const palette = [];

    const uiTemplates = [
        { s: 10, l: 98 },  // Canvas Background
        { s: 15, l: 15 },  // Pure Text Contrast
        { s: s,  l: l },   // Brand Core
        { s: Math.max(s - 20, 10), l: Math.max(10, Math.min(90, l + 15)) }, // Secondary Muted
        { h: h + 120, s: 85, l: 45 } // Accent CTA Action
    ];

    for (let i = 0; i < colorCount; i++) {
        const template = uiTemplates[i % uiTemplates.length];
        const targetH = template.h !== undefined ? template.h : h;
        palette.push({ h: (targetH + 360) % 360, s: template.s, l: template.l });
    }
    return palette.map(ColorUtils.hslToHex);
}

export function generateAmoledDark(baseHex, colorCount = 5) {
    const { h, s } = ColorUtils.hexToHsl(baseHex);
    const palette = [];
    const lerp = (start, end, amt) => start + (end - start) * amt;

    for (let i = 0; i < colorCount; i++) {
        const factor = colorCount > 1 ? i / (colorCount - 1) : 0.5;
        let targetL, targetS;

        if (i === colorCount - 1) {
            targetL = 60;
            targetS = Math.max(s, 75); // Pop Signal Light
        } else {
            targetL = lerp(4, 18, factor); // Ultra deep layout backing layers
            targetS = Math.min(s, 30);
        }
        palette.push({ h, s: Math.round(targetS), l: Math.round(targetL) });
    }
    return palette.map(ColorUtils.hslToHex);
}
