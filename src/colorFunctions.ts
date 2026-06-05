import {Color} from "./CoolStore";

export function rgb2hsl(r, g, b): [number, number, number] {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min)
        return [0, 0, l];
    const d = max - min;
    const s = d / (l > 0.5 ? (2 - max - min) : (max + min));
    const h = max === r ? (g - b) / d + (g < b ? 6 : 0)
        : max === g ? (b - r) / d + 2
            : (r - g) / d + 4;
    return [h/6, s, l];
}

export function hsl2rgb(h, s, l): [number, number, number] {
    const k = n => (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return [0, 8, 4].map(n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))) as [number, number, number];
}

export function hex2rgb(hex: Color): [number,number,number] {
    const h = hex.replace('#', '');
    const len = h.length;

    const fullHex = len === 3
        ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
        : h;

    const num = parseInt(fullHex, 16);

    return [
        ((num >> 16) & 255) / 255,
        ((num >> 8) & 255) / 255,
        (num & 255) / 255
    ];
}

export function rgb2hex(r, g, b): Color {
    const toHex = val => {
        const hex = Math.round(val * 255).toString(16);
        return hex.padStart(2, '0');
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase() as Color;
}

export function isGray(r, g, b, tolerance = 0.03): boolean {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (max - min) <= tolerance;
}

export function isSameColor(color1, color2, tolerance = 0.03): boolean {
    const [r,g,b] = hex2rgb(color1)
    const [R,G,B] = hex2rgb(color2)
    const dr = r - R;
    const dg = g - G;
    const db = b - B;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    return distance <= tolerance;
}

export function getLuminance(r, g, b): number {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}